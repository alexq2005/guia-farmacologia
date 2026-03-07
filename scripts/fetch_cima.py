#!/usr/bin/env python3
"""
CIMA/AEMPS Drug Importer for Guía Farmacológica de Enfermería
=============================================================
Fetches all commercialized drugs from Spain's AEMPS CIMA REST API,
deduplicates by active ingredient, fetches clinical data from fichas
técnicas, and merges with existing drugs.json.

Usage:
  python scripts/fetch_cima.py                    # Full run (phases 1-4)
  python scripts/fetch_cima.py --phase 1          # Only fetch metadata
  python scripts/fetch_cima.py --phase 2          # Only fetch clinical docs
  python scripts/fetch_cima.py --phase 3          # Only merge
  python scripts/fetch_cima.py --resume            # Resume interrupted phase 2
"""

import json
import os
import re
import sys
import time
import argparse
import warnings
from html.parser import HTMLParser
from pathlib import Path
from typing import Optional

import requests

warnings.filterwarnings("ignore", message="Unverified HTTPS")

# ─── Config ───────────────────────────────────────────────────────────────────

BASE_URL = "https://cima.aemps.es/cima/rest"
PAGE_SIZE = 100
RATE_LIMIT = 0.35          # seconds between API calls (≈3/sec)
SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR.parent / "src" / "data"
CACHE_DIR = SCRIPT_DIR / "cima_cache"
METADATA_FILE = CACHE_DIR / "all_metadata.json"
UNIQUE_DRUGS_FILE = CACHE_DIR / "unique_drugs.json"
CLINICAL_DIR = CACHE_DIR / "clinical"
MERGED_FILE = CACHE_DIR / "drugs_merged.json"

# ATC Level 1 → Unit mapping
ATC_TO_UNIT = {
    "N": "u01",  # Nervous system → Sistema Nervioso
    "C": "u02",  # Cardiovascular → Sistema Cardiovascular
    "J": "u03",  # Anti-infectives → Antiinfecciosos
    "P": "u03",  # Antiparasitic → Antiinfecciosos
    "R": "u04",  # Respiratory → Sistema Respiratorio
    "A": "u05",  # Alimentary → Sistema Digestivo
    "H": "u06",  # Hormones → Sistema Endocrino
    "G": "u07",  # Genitourinary → Sistema Reproductor y Óseo
    "M": "u08",  # Musculoskeletal → Sistema Musculoesquelético
    "D": "u09",  # Dermatologicals → Dermatología
    "S": "u09",  # Sensory organs → Dermatología
    "B": "u10",  # Blood → Hematología
    "V": "u12",  # Various → Fármacos Hospitalarios
    "L": "u12",  # Antineoplastic → Fármacos Hospitalarios
}

# CIMA route names → our RouteOfAdministration type
ROUTE_MAP = {
    "VÍA ORAL": "oral",
    "VIA ORAL": "oral",
    "VÍA INTRAVENOSA": "IV",
    "VIA INTRAVENOSA": "IV",
    "VÍA INTRAMUSCULAR": "IM",
    "VIA INTRAMUSCULAR": "IM",
    "VÍA SUBCUTÁNEA": "SC",
    "VIA SUBCUTANEA": "SC",
    "VÍA SUBLINGUAL": "sublingual",
    "VIA SUBLINGUAL": "sublingual",
    "VÍA TÓPICA": "topica",
    "VIA TOPICA": "topica",
    "USO CUTÁNEO": "topica",
    "USO CUTANEO": "topica",
    "VÍA RECTAL": "rectal",
    "VIA RECTAL": "rectal",
    "VÍA INHALATORIA": "inhalatoria",
    "VIA INHALATORIA": "inhalatoria",
    "VÍA OFTÁLMICA": "oftalmica",
    "VIA OFTALMICA": "oftalmica",
    "VÍA ÓTICA": "otica",
    "VIA OTICA": "otica",
    "VÍA NASAL": "nasal",
    "VIA NASAL": "nasal",
    "VÍA TRANSDÉRMICA": "transdermica",
    "VIA TRANSDERMICA": "transdermica",
    "VÍA INTRATECAL": "intratecal",
    "VIA INTRATECAL": "intratecal",
    "VÍA EPIDURAL": "epidural",
    "VIA EPIDURAL": "epidural",
    "VÍA VAGINAL": "vaginal",
    "VIA VAGINAL": "vaginal",
    "VÍA INTRADÉRMICA": "intradermica",
    "VIA INTRADERMICA": "intradermica",
}

# Ficha Técnica sections we want
DOC_SECTIONS = {
    "4.1": "indicaciones",
    "4.2": "dosis",
    "4.3": "contraindicaciones",
    "4.5": "interacciones",
    "4.6": "embarazo_lactancia",
    "4.8": "efectosAdversos",
    "5.1": "mecanismoAccion",
    "5.2": "farmacocinetica",
    "6.4": "almacenamiento",
}


# ─── HTML Parser ──────────────────────────────────────────────────────────────

class HTMLTextExtractor(HTMLParser):
    """Strip HTML tags and extract clean text."""

    def __init__(self):
        super().__init__()
        self._text = []
        self._skip = False

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style"):
            self._skip = True
        if tag in ("br", "p", "div", "li", "tr"):
            self._text.append("\n")

    def handle_endtag(self, tag):
        if tag in ("script", "style"):
            self._skip = False
        if tag in ("p", "div", "li", "tr"):
            self._text.append("\n")

    def handle_data(self, data):
        if not self._skip:
            self._text.append(data)

    def get_text(self) -> str:
        return "".join(self._text)


def html_to_text(html: str) -> str:
    """Convert HTML to clean text."""
    if not html:
        return ""
    parser = HTMLTextExtractor()
    parser.feed(html)
    text = parser.get_text()
    # Clean up: collapse whitespace, trim lines
    lines = [line.strip() for line in text.split("\n")]
    lines = [l for l in lines if l]
    return "\n".join(lines)


def text_to_list(text: str) -> list[str]:
    """Split text into a list of items (by lines, bullets, dashes, numbered)."""
    if not text:
        return []
    # Split on newlines
    items = []
    for line in text.split("\n"):
        line = line.strip()
        # Remove bullet/number prefixes
        line = re.sub(r"^[\-•·–—]\s*", "", line)
        line = re.sub(r"^\d+[\.\)]\s*", "", line)
        line = line.strip()
        if len(line) > 3:  # Skip very short fragments
            items.append(line)
    return items


# ─── API Client ───────────────────────────────────────────────────────────────

class CIMAClient:
    def __init__(self):
        self.session = requests.Session()
        self.session.verify = False
        self.session.headers["Accept"] = "application/json"
        self._last_call = 0.0
        self.calls = 0

    def _rate_limit(self):
        elapsed = time.time() - self._last_call
        if elapsed < RATE_LIMIT:
            time.sleep(RATE_LIMIT - elapsed)
        self._last_call = time.time()
        self.calls += 1

    def get(self, endpoint: str, params: dict = None) -> Optional[dict | list]:
        self._rate_limit()
        try:
            r = self.session.get(f"{BASE_URL}/{endpoint}", params=params, timeout=30)
            r.raise_for_status()
            return r.json()
        except Exception as e:
            print(f"  ERROR: {endpoint} {params} → {e}", file=sys.stderr)
            return None

    def get_all_drugs(self) -> list[dict]:
        """Fetch all commercialized drug metadata (paginated)."""
        first = self.get("medicamentos", {"comerc": 1, "pagesize": 1})
        if not first:
            return []
        total = first["totalFilas"]
        print(f"  Total commercialized drugs in CIMA: {total}")

        all_drugs = []
        pages = (total + PAGE_SIZE - 1) // PAGE_SIZE
        for page in range(1, pages + 1):
            data = self.get("medicamentos", {"comerc": 1, "pagesize": PAGE_SIZE, "pagina": page})
            if data and "resultados" in data:
                all_drugs.extend(data["resultados"])
            print(f"  Page {page}/{pages} — {len(all_drugs)} drugs fetched", end="\r")
        print()
        return all_drugs

    def get_drug_detail(self, nregistro: str) -> Optional[dict]:
        """Fetch full detail for a single drug."""
        return self.get("medicamento", {"nregistro": nregistro})

    def get_doc_section(self, nregistro: str, section: str) -> Optional[str]:
        """Fetch a ficha técnica section content (HTML)."""
        data = self.get("docSegmentado/contenido/1", {"nregistro": nregistro, "seccion": section})
        if data and isinstance(data, list) and len(data) > 0:
            return data[0].get("contenido", "")
        return None


# ─── Phase 1: Fetch all metadata ─────────────────────────────────────────────

def phase1_fetch_metadata(client: CIMAClient):
    """Download all commercialized drug metadata from CIMA."""
    print("\n═══ PHASE 1: Fetching all drug metadata from CIMA ═══")

    if METADATA_FILE.exists():
        print(f"  Cache found: {METADATA_FILE}")
        drugs = json.loads(METADATA_FILE.read_text("utf-8"))
        print(f"  Loaded {len(drugs)} cached drugs")
        return drugs

    drugs = client.get_all_drugs()
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    METADATA_FILE.write_text(json.dumps(drugs, ensure_ascii=False, indent=1), "utf-8")
    print(f"  Saved {len(drugs)} drugs to {METADATA_FILE}")
    return drugs


# ─── Phase 1b: Deduplicate by VTM ────────────────────────────────────────────

def phase1b_deduplicate(all_drugs: list[dict]) -> list[dict]:
    """Group drugs by VTM (active ingredient) and pick one representative per group."""
    print("\n═══ PHASE 1b: Deduplicating by active ingredient (VTM) ═══")

    if UNIQUE_DRUGS_FILE.exists():
        unique = json.loads(UNIQUE_DRUGS_FILE.read_text("utf-8"))
        print(f"  Loaded {len(unique)} cached unique drugs")
        return unique

    # Group by VTM id (or by drug name if no VTM)
    vtm_groups: dict[str, list[dict]] = {}
    no_vtm = []

    for drug in all_drugs:
        vtm = drug.get("vtm")
        if vtm and vtm.get("id"):
            key = str(vtm["id"])
            if key not in vtm_groups:
                vtm_groups[key] = []
            vtm_groups[key].append(drug)
        else:
            no_vtm.append(drug)

    print(f"  VTM groups: {len(vtm_groups)}")
    print(f"  Drugs without VTM: {len(no_vtm)}")

    # Pick one representative per VTM: prefer the one with docs available
    unique = []
    for vtm_id, group in vtm_groups.items():
        # Prefer drug with ficha técnica available
        best = None
        for d in group:
            docs = d.get("docs", [])
            has_ft = any(doc.get("tipo") == 1 and doc.get("secc") for doc in docs)
            if has_ft:
                best = d
                break
        if not best:
            best = group[0]
        # Store VTM name on the representative
        best["_vtm_name"] = best.get("vtm", {}).get("nombre", "")
        best["_group_size"] = len(group)
        unique.append(best)

    # Add no-VTM drugs (deduplicate by nregistro)
    seen_nreg = {d["nregistro"] for d in unique}
    for d in no_vtm:
        if d["nregistro"] not in seen_nreg:
            d["_vtm_name"] = d.get("nombre", "").split(" ")[0]
            d["_group_size"] = 1
            unique.append(d)
            seen_nreg.add(d["nregistro"])

    # Sort by VTM name
    unique.sort(key=lambda d: d.get("_vtm_name", "").lower())

    UNIQUE_DRUGS_FILE.write_text(json.dumps(unique, ensure_ascii=False, indent=1), "utf-8")
    print(f"  Unique drugs: {len(unique)} (from {len(all_drugs)} total)")
    return unique


# ─── Phase 2: Fetch clinical data ────────────────────────────────────────────

def phase2_fetch_clinical(client: CIMAClient, unique_drugs: list[dict], resume: bool = False):
    """Fetch ficha técnica sections for each unique drug."""
    print("\n═══ PHASE 2: Fetching clinical data (ficha técnica) ═══")

    CLINICAL_DIR.mkdir(parents=True, exist_ok=True)

    total = len(unique_drugs)
    fetched = 0
    skipped = 0
    errors = 0

    for i, drug in enumerate(unique_drugs):
        nreg = drug["nregistro"]
        cache_file = CLINICAL_DIR / f"{nreg}.json"

        # Skip if already cached
        if cache_file.exists():
            skipped += 1
            if (i + 1) % 500 == 0:
                print(f"  Progress: {i+1}/{total} (skipped: {skipped}, fetched: {fetched}, errors: {errors})")
            continue

        # Check if drug has ficha técnica with sections
        docs = drug.get("docs", [])
        has_ft = any(doc.get("tipo") == 1 and doc.get("secc") for doc in docs)
        if not has_ft:
            cache_file.write_text("{}", "utf-8")
            skipped += 1
            continue

        # Fetch each section
        clinical = {}
        for sec_id, sec_name in DOC_SECTIONS.items():
            html = client.get_doc_section(nreg, sec_id)
            if html:
                clinical[sec_name] = html_to_text(html)

        if clinical:
            cache_file.write_text(json.dumps(clinical, ensure_ascii=False, indent=1), "utf-8")
            fetched += 1
        else:
            cache_file.write_text("{}", "utf-8")
            errors += 1

        if (i + 1) % 100 == 0:
            print(f"  Progress: {i+1}/{total} (fetched: {fetched}, skipped: {skipped}, errors: {errors}) — API calls: {client.calls}")

    print(f"\n  Done! Fetched: {fetched}, Skipped: {skipped}, Errors: {errors}")
    print(f"  Total API calls: {client.calls}")


# ─── Phase 3: Merge and generate ─────────────────────────────────────────────

def make_drug_id(name: str, nregistro: str) -> str:
    """Generate a clean drug ID from the generic/VTM name."""
    # Use VTM name or clean the commercial name
    name = name.lower().strip()
    # Remove dosage info
    name = re.sub(r"\d+\s*(mg|g|ml|mcg|ui|%|mg/ml).*", "", name).strip()
    # Normalize
    name = name.replace("á", "a").replace("é", "e").replace("í", "i")
    name = name.replace("ó", "o").replace("ú", "u").replace("ñ", "n")
    name = re.sub(r"[^a-z0-9 +/]", "", name)
    name = name.strip()
    name = re.sub(r"\s+", "_", name)
    name = re.sub(r"[/+]", "_", name)
    if not name:
        name = f"cima_{nregistro}"
    return f"cima_{name}"


def map_routes(vias: list[dict]) -> list[str]:
    """Map CIMA route names to our RouteOfAdministration literals."""
    routes = []
    for via in vias:
        nombre = via.get("nombre", "").upper().strip()
        mapped = ROUTE_MAP.get(nombre)
        if mapped and mapped not in routes:
            routes.append(mapped)
    return routes if routes else ["oral"]  # Default to oral if unknown


def extract_pregnancy_category(text: str) -> str:
    """Try to extract FDA pregnancy category from text."""
    if not text:
        return "N/A"
    text_upper = text.upper()
    if "CONTRAINDICADO DURANTE EL EMBARAZO" in text_upper or "NO DEBE UTILIZARSE DURANTE EL EMBARAZO" in text_upper:
        return "X"
    if "NO SE RECOMIENDA" in text_upper or "NO DEBERÍA UTILIZARSE" in text_upper:
        return "D"
    if "PRECAUCIÓN" in text_upper or "VALORAR BENEFICIO/RIESGO" in text_upper:
        return "C"
    if "PUEDE UTILIZARSE" in text_upper or "NO HAY DATOS" in text_upper:
        return "B"
    return "N/A"


# ─── Nursing Care Generator ───────────────────────────────────────────────────

# Cuidados estándar por vía de administración
ROUTE_CARE = {
    "IV": [
        "Verificar permeabilidad del acceso venoso antes de administrar",
        "Controlar velocidad de infusión según pauta médica",
        "Vigilar signos de flebitis (dolor, enrojecimiento, induración en punto de punción)",
        "Observar reacciones durante los primeros 15 min de infusión",
    ],
    "IM": [
        "Seleccionar zona de inyección adecuada (deltoides, vasto lateral, glúteo) y rotar sitios",
        "Aspirar antes de inyectar para descartar punción vascular",
        "Observar zona de inyección tras administración (hematoma, induración)",
    ],
    "SC": [
        "Rotar zonas de inyección (abdomen, muslos, brazos)",
        "Pellizcar la piel e inyectar en ángulo de 45-90° según aguja",
        "No masajear la zona tras la inyección",
    ],
    "oral": [
        "Verificar capacidad de deglución del paciente",
        "Administrar con agua suficiente salvo indicación contraria",
    ],
    "inhalatoria": [
        "Enseñar técnica correcta de inhalación al paciente",
        "Indicar enjuague bucal tras inhalación (especialmente corticoides)",
        "Verificar coordinación mano-pulmón; valorar uso de cámara espaciadora",
    ],
    "sublingual": [
        "Colocar el comprimido bajo la lengua sin masticar ni tragar",
        "Indicar al paciente no comer ni beber hasta disolución completa",
    ],
    "topica": [
        "Limpiar y secar la zona antes de aplicar",
        "Usar guantes para la aplicación",
        "No aplicar sobre heridas abiertas salvo indicación",
    ],
    "transdermica": [
        "Aplicar sobre piel intacta, limpia y seca, sin vello",
        "Rotar zona de aplicación para evitar irritación cutánea",
        "Retirar parche anterior antes de colocar uno nuevo",
    ],
    "rectal": [
        "Comprobar que no existen contraindicaciones rectales (hemorroides graves, cirugía rectal)",
        "Lubricar el supositorio antes de insertar",
        "Indicar al paciente permanecer en decúbito lateral 15-20 min",
    ],
    "oftalmica": [
        "Lavarse las manos antes de administrar",
        "Inclinar la cabeza hacia atrás y aplicar en saco conjuntival inferior",
        "Presionar el conducto lagrimal 1-2 min tras instilación",
    ],
    "nasal": [
        "Limpiar fosas nasales antes de administrar",
        "Agitar el envase si es suspensión",
    ],
    "otica": [
        "Templar las gotas a temperatura corporal antes de instilar",
        "Tirar del pabellón auricular hacia arriba y atrás (adultos)",
    ],
    "vaginal": [
        "Administrar preferiblemente al acostarse para mejor absorción",
        "Usar aplicador si se proporciona y desecharlo tras uso",
    ],
}

# Cuidados por grupo ATC (nivel 1-2)
ATC_GROUP_CARE: dict[str, list[str]] = {
    # ── Cardiovascular (C) ──
    "C01": ["Monitorizar FC y ritmo cardíaco; disponer de ECG", "Controlar signos de insuficiencia cardíaca"],
    "C02": ["Medir TA antes y después de administrar", "Valorar hipotensión ortostática (indicar levantarse lentamente)"],
    "C03": ["Control de diuresis (balance hídrico)", "Vigilar electrolitos (K⁺, Na⁺, Mg²⁺)", "Pesar al paciente diariamente"],
    "C07": ["Medir FC antes de administrar (suspender si <60 lpm)", "Medir TA; no suspender bruscamente (riesgo rebote)"],
    "C08": ["Medir TA y FC antes de administrar", "Vigilar edemas periféricos y cefalea"],
    "C09": ["Medir TA antes de cada dosis", "Vigilar hiperpotasemia y función renal", "Control de tos seca (IECA)"],
    "C10": ["Vigilar mialgias y debilidad muscular (rabdomiólisis)", "Monitorizar perfil lipídico y función hepática periódicamente"],
    # ── Nervioso (N) ──
    "N01": ["Monitorizar constantes vitales durante anestesia", "Disponer de equipo de reanimación"],
    "N02": ["Evaluar dolor con escala EVA antes y después", "Vigilar nivel de consciencia y FR (opioides: FR <12 alertar)"],
    "N03": ["Monitorizar niveles plasmáticos si procede", "Vigilar signos de toxicidad (ataxia, nistagmo, somnolencia)"],
    "N04": ["Vigilar hipotensión ortostática", "Valorar discinesias y fluctuaciones motoras"],
    "N05": ["Vigilar nivel de sedación y riesgo de caídas", "No suspender bruscamente (riesgo de abstinencia/rebote)"],
    "N06": ["Vigilar cambios de humor y riesgo suicida (primeras semanas)", "Evaluar efectos anticolinérgicos (boca seca, retención urinaria)"],
    "N07": ["Monitorizar respuesta terapéutica y efectos adversos"],
    # ── Antiinfecciosos (J) ──
    "J01": ["Obtener cultivo ANTES de iniciar antibioterapia", "Verificar alergias (especialmente penicilinas/cefalosporinas)", "Administrar a intervalos regulares para mantener niveles terapéuticos"],
    "J02": ["Monitorizar función hepática y renal", "Vigilar interacciones farmacológicas (azoles son inhibidores CYP)"],
    "J04": ["Controlar función hepática (hepatotoxicidad frecuente)", "Vigilar adherencia al tratamiento (tuberculosis: DOTS)"],
    "J05": ["Monitorizar carga viral y CD4 si procede", "Vigilar efectos metabólicos (lipodistrofia, dislipemia)"],
    # ── Respiratorio (R) ──
    "R03": ["Evaluar función respiratoria (FR, SatO₂, peak flow)", "Enseñar uso correcto del inhalador"],
    "R05": ["Valorar características de la tos (productiva/seca)", "Fomentar hidratación para fluidificar secreciones"],
    "R06": ["Advertir sobre somnolencia y riesgo de caídas", "Precaución con la conducción"],
    # ── Digestivo (A) ──
    "A02": ["Administrar IBP 30 min antes del desayuno", "Evaluar síntomas dispépticos y respuesta al tratamiento"],
    "A03": ["Vigilar efectos anticolinérgicos (sequedad oral, estreñimiento, retención urinaria)"],
    "A04": ["Administrar antieméticos 30 min antes de quimioterapia si indicado"],
    "A06": ["Valorar patrón intestinal; fomentar hidratación y fibra"],
    "A10": ["Monitorizar glucemia capilar según pauta", "Vigilar signos de hipoglucemia (temblor, sudoración, confusión)", "Educar al paciente sobre autocontrol glucémico"],
    "A11": ["Valorar estado nutricional", "Administrar según indicaciones (ayunas/con comida)"],
    # ── Endocrino (H) ──
    "H01": ["Monitorizar respuesta hormonal según eje tratado"],
    "H02": ["No suspender bruscamente (insuficiencia suprarrenal)", "Vigilar glucemia, TA, retención de líquidos", "Administrar preferiblemente por la mañana (mimetizar ritmo circadiano)"],
    "H03": ["Monitorizar TSH y T4 libre periódicamente", "Administrar levotiroxina en ayunas, 30-60 min antes del desayuno"],
    # ── Genitourinario (G) ──
    "G03": ["Vigilar signos tromboembólicos (dolor en pantorrilla, disnea)", "Controlar TA periódicamente"],
    "G04": ["Valorar patrón miccional y síntomas prostáticos"],
    # ── Musculoesquelético (M) ──
    "M01": ["Administrar con alimento para reducir irritación gástrica", "Vigilar signos de sangrado GI (melenas, hematemesis)", "Monitorizar función renal en tratamientos prolongados"],
    "M03": ["Advertir sobre somnolencia y disminución de reflejos", "Valorar fuerza muscular y rango de movimiento"],
    "M04": ["Fomentar hidratación abundante (prevenir cristaluria)", "Monitorizar niveles de ácido úrico"],
    "M05": ["Administrar bifosfonatos en ayunas con agua, sin recostarse 30 min", "Valorar salud dental (osteonecrosis mandibular)"],
    # ── Dermatología (D) ──
    "D01": ["Aplicar en piel limpia y seca", "Completar el tratamiento aunque mejoren los síntomas"],
    "D06": ["Vigilar signos de sensibilización local"],
    "D07": ["No aplicar corticoides tópicos en zonas infectadas", "Limitar duración; vigilar atrofia cutánea"],
    # ── Sangre (B) ──
    "B01": ["Vigilar signos de sangrado (epistaxis, hematuria, equimosis, melenas)", "Controlar INR/APTT según anticoagulante", "Educar sobre interacciones alimentarias (vitamina K con acenocumarol/warfarina)"],
    "B02": ["Vigilar signos trombóticos"],
    "B03": ["Valorar hemograma y niveles de hierro/B12/folato", "Hierro oral: administrar en ayunas con vitamina C; advertir de heces oscuras"],
    "B05": ["Controlar balance hídrico y electrolitos", "Vigilar signos de sobrecarga de volumen"],
    # ── Antineoplásicos (L) ──
    "L01": ["Verificar hemograma antes de cada ciclo (neutropenia, trombocitopenia)", "Usar EPI para manipulación (medicamento peligroso)", "Vigilar signos de infección (fiebre neutropénica: urgencia)", "Monitorizar mucositis, náuseas y estado nutricional"],
    "L02": ["Vigilar efectos hormonales (sofocos, osteoporosis)", "Monitorizar función hepática"],
    "L03": ["Vigilar síntomas pseudogripales", "Monitorizar hemograma y función hepática"],
    "L04": ["Vigilar signos de infección (inmunosupresión)", "Monitorizar función renal y hepática", "Control de hemograma periódico"],
    # ── Varios (V) ──
    "V03": ["Verificar indicación y dosis de antídoto según protocolo"],
    "V08": ["Valorar alergias al contraste/yodo", "Asegurar hidratación pre y post-contraste", "Vigilar reacción anafiláctica durante administración"],
}

# Palabras clave en efectos adversos → cuidado de monitorización
ADVERSE_EFFECT_MONITORS: list[tuple[list[str], str]] = [
    (["hepato", "hígado", "transaminasa", "ictericia", "GOT", "GPT", "ALT", "AST"],
     "Monitorizar función hepática (GOT, GPT, bilirrubina) periódicamente"),
    (["nefro", "riñón", "renal", "creatinina", "oliguria", "anuria"],
     "Monitorizar función renal (creatinina, aclaramiento, diuresis)"),
    (["neutropenia", "leucopenia", "trombocitopenia", "pancitopenia", "agranulocitosis", "anemia"],
     "Controlar hemograma periódicamente; vigilar signos de infección o sangrado"),
    (["hipotensión", "hipotension"],
     "Medir TA regularmente; precaución con cambios posturales"),
    (["hiperglucemia", "hipoglucemia", "glucemia", "diabetes"],
     "Monitorizar glucemia capilar"),
    (["arritmia", "QT", "taquicardia", "bradicardia", "fibrilación"],
     "Monitorizar ECG; vigilar FC y ritmo cardíaco"),
    (["convuls", "epilep"],
     "Extremar precauciones en pacientes epilépticos; tener diazepam disponible"),
    (["anafilax", "anafilac", "angioedema", "hipersensibilidad grave"],
     "Disponer de adrenalina y equipo de reanimación; vigilar reacciones alérgicas"),
    (["ototoxic", "audición", "acúfeno", "tinnitus"],
     "Vigilar cambios en audición; informar al médico ante acúfenos"),
    (["sangrado", "hemorrag", "hematemesis", "melena", "epistaxis"],
     "Vigilar signos de sangrado activo; controlar tiempos de coagulación"),
    (["hiperpotasemia", "hipopotasemia", "hipocalcemia", "hiponatremia", "electrolito"],
     "Monitorizar electrolitos séricos periódicamente"),
]


def generate_nursing_care(
    routes: list[str],
    atc_codes: list[dict],
    adverse_effects: list[str],
    contraindications: list[str],
    pregnancy: str,
    driving: bool,
    triangle: bool,
    hazardous: bool,
    nregistro: str,
) -> list[str]:
    """Generate nursing care points from clinical data."""
    cuidados: list[str] = []
    seen: set[str] = set()

    def add(text: str):
        key = text[:60].lower()
        if key not in seen:
            seen.add(key)
            cuidados.append(text)

    # 1) Cuidados por vía de administración (máx 2 más relevantes por vía)
    for route in routes:
        route_cares = ROUTE_CARE.get(route, [])
        for care in route_cares[:2]:
            add(care)

    # 2) Cuidados por grupo ATC (más específicos)
    atc_matched = False
    for atc in atc_codes:
        codigo = atc.get("codigo", "")
        # Try most specific first (3 chars), then 2, then 1
        for length in [3, 2, 1]:
            prefix = codigo[:length]
            if prefix in ATC_GROUP_CARE:
                for care in ATC_GROUP_CARE[prefix][:3]:
                    add(care)
                atc_matched = True
                break
        if atc_matched:
            break

    # 3) Cuidados derivados de efectos adversos
    if adverse_effects:
        joined = " ".join(adverse_effects).lower()
        for keywords, care_text in ADVERSE_EFFECT_MONITORS:
            if any(kw.lower() in joined for kw in keywords):
                add(care_text)

    # 4) Alertas especiales
    if pregnancy in ("D", "X"):
        add(f"⚠️ Embarazo categoría {pregnancy}: {'Contraindicado' if pregnancy == 'X' else 'Riesgo fetal demostrado'}. Verificar test de embarazo si procede")

    if driving:
        add("Advertir al paciente que puede afectar a la capacidad de conducción")

    if triangle:
        add("▲ Medicamento sujeto a seguimiento adicional (triángulo negro): notificar cualquier sospecha de reacción adversa")

    if hazardous:
        add("⚠️ Medicamento peligroso: usar EPI para manipulación (guantes, bata, mascarilla si aerosol)")

    # 5) Cuidado genérico siempre presente
    add("Verificar alergias del paciente antes de administrar")
    add("Registrar administración: hora, dosis, vía, respuesta del paciente")

    # Limitar a 8 cuidados máximo para no saturar
    return cuidados[:8]


def extract_lactancia(text: str) -> str:
    """Extract lactation info from section 4.6 text."""
    if not text:
        return "Consultar ficha técnica"
    # Try to find lactation-specific paragraph
    lower = text.lower()
    idx = lower.find("lactancia")
    if idx != -1:
        # Get text from "lactancia" onwards, up to 300 chars
        snippet = text[idx:idx+300].strip()
        # Take first sentence
        end = snippet.find(".")
        if end != -1:
            return snippet[:end+1]
        return snippet[:200]
    return "Consultar ficha técnica"


def phase3_merge(unique_drugs: list[dict]):
    """Merge CIMA data with existing drugs and generate output files."""
    print("\n═══ PHASE 3: Merging with existing drugs ═══")

    # Load existing drugs
    existing_file = DATA_DIR / "drugs.json"
    existing_drugs = json.loads(existing_file.read_text("utf-8"))
    existing_ids = {d["id"] for d in existing_drugs}
    existing_names = {d["nombreGenerico"].lower().strip() for d in existing_drugs}
    # Also index by common commercial names
    for d in existing_drugs:
        existing_names.add(d["nombre"].lower().strip())
        for nc in d.get("nombresComerciales", []):
            existing_names.add(nc.lower().strip())

    print(f"  Existing drugs: {len(existing_drugs)} (IDs: {len(existing_ids)})")

    # Load categories
    cats_file = DATA_DIR / "categories.json"
    categories = json.loads(cats_file.read_text("utf-8"))

    # Build new chapter map for CIMA drugs per unit
    cima_chapters: dict[str, list[str]] = {}  # unit_id → [drug_ids]

    new_drugs = []
    skipped_existing = 0
    skipped_no_data = 0

    for drug in unique_drugs:
        nreg = drug["nregistro"]
        vtm_name = drug.get("_vtm_name", "")

        # Skip if we already have this drug
        vtm_lower = vtm_name.lower().strip() if vtm_name else ""
        commercial_name = drug.get("nombre", "").split(" ")[0].lower()
        if vtm_lower in existing_names or commercial_name in existing_names:
            skipped_existing += 1
            continue

        # Load clinical data
        clinical_file = CLINICAL_DIR / f"{nreg}.json"
        clinical = {}
        if clinical_file.exists():
            content = clinical_file.read_text("utf-8")
            if content and content != "{}":
                clinical = json.loads(content)

        # Build drug entry
        drug_id = make_drug_id(vtm_name or drug.get("nombre", ""), nreg)

        # Skip duplicate IDs
        if drug_id in existing_ids:
            drug_id = f"{drug_id}_{nreg}"

        # Determine unit from ATC
        atcs = drug.get("atcs", [])
        # Get ATC from detail if not in list result (list results may not have atcs)
        atc_letter = ""
        atc_name = ""
        atc_subgroup = ""
        if atcs:
            atc_letter = atcs[0].get("codigo", "")[0:1] if atcs[0].get("codigo") else ""
            atc_name = atcs[-1].get("nombre", "") if atcs else ""
            if len(atcs) > 1:
                atc_subgroup = atcs[-2].get("nombre", "") if len(atcs) >= 2 else ""

        unit_id = ATC_TO_UNIT.get(atc_letter, "u12")

        # Map routes
        routes = map_routes(drug.get("viasAdministracion", []))

        # Parse clinical sections
        indicaciones = text_to_list(clinical.get("indicaciones", ""))
        contraindicaciones = text_to_list(clinical.get("contraindicaciones", ""))
        efectos = text_to_list(clinical.get("efectosAdversos", ""))
        interacciones = text_to_list(clinical.get("interacciones", ""))
        mecanismo = clinical.get("mecanismoAccion", "")
        dosis_text = clinical.get("dosis", "")
        embarazo_text = clinical.get("embarazo_lactancia", "")
        farmaco_text = clinical.get("farmacocinetica", "")
        almac_text = clinical.get("almacenamiento", "")

        # Skip drugs with absolutely no useful data
        if not indicaciones and not mecanismo and not dosis_text:
            skipped_no_data += 1
            continue

        # Build the Drug object
        nombre_display = vtm_name.title() if vtm_name else drug.get("nombre", "").split(" ")[0].title()
        nombre_generico = vtm_name if vtm_name else nombre_display

        # Extract first sentence of mecanismo as summary
        meca_summary = ""
        if mecanismo:
            lines = mecanismo.split("\n")
            meca_summary = lines[0][:300] if lines else mecanismo[:300]

        new_drug = {
            "id": drug_id,
            "nombre": nombre_display,
            "nombreGenerico": nombre_generico,
            "nombresComerciales": [drug.get("nombre", "")],
            "familia": atc_name or "Sin clasificar",
            "clasificacion": atc_subgroup or atc_name or "Sin clasificar",
            "mecanismoAccion": meca_summary,
            "indicaciones": indicaciones[:10],  # Cap at 10
            "contraindicaciones": contraindicaciones[:10],
            "efectosAdversos": efectos[:10],
            "interacciones": interacciones[:8],
            "viaAdministracion": routes,
            "dosis": {
                "adulto": dosis_text[:500] if dosis_text else "Consultar ficha técnica",
            },
            "presentaciones": [
                p.get("nombre", "") for p in drug.get("presentaciones", [])[:5]
            ],
            "embarazo": extract_pregnancy_category(embarazo_text),
            "lactancia": extract_lactancia(embarazo_text),
            "cuidadosEnfermeria": generate_nursing_care(
                routes=routes,
                atc_codes=drug.get("atcs", []),
                adverse_effects=efectos,
                contraindications=contraindicaciones,
                pregnancy=extract_pregnancy_category(embarazo_text),
                driving=drug.get("conduc", False),
                triangle=drug.get("triangulo", False),
                hazardous=False,  # Solo nuestros 1781 originales tienen este dato
                nregistro=nreg,
            ),
            "unidadId": unit_id,
            "capituloId": f"{unit_id.replace('u', 'c')}_cima",
        }

        # Optional farmacocinética
        if farmaco_text:
            new_drug["farmacocinetica"] = {
                "absorcion": farmaco_text[:400],
            }

        # Optional almacenamiento
        if almac_text:
            new_drug["almacenamiento"] = almac_text[:200]

        # Grupo terapéutico/farmacológico from ATC
        if atc_name:
            new_drug["grupoTerapeutico"] = atc_name
        if atc_subgroup:
            new_drug["grupoFarmacologico"] = atc_subgroup

        new_drugs.append(new_drug)
        existing_ids.add(drug_id)
        existing_names.add(vtm_lower)

        # Track for categories
        if unit_id not in cima_chapters:
            cima_chapters[unit_id] = []
        cima_chapters[unit_id].append(drug_id)

    print(f"  New drugs to add: {len(new_drugs)}")
    print(f"  Skipped (already exist): {skipped_existing}")
    print(f"  Skipped (no data): {skipped_no_data}")

    # Merge drug lists
    merged_drugs = existing_drugs + new_drugs
    print(f"  Total after merge: {len(merged_drugs)}")

    # Update categories — add CIMA chapters
    for unit in categories["unidades"]:
        uid = unit["id"]
        if uid in cima_chapters:
            chapter_id = f"{uid.replace('u', 'c')}_cima"
            # Check if chapter already exists
            existing_ch = [c for c in unit["capitulos"] if c["id"] == chapter_id]
            if existing_ch:
                existing_ch[0]["drugIds"] = cima_chapters[uid]
            else:
                unit["capitulos"].append({
                    "id": chapter_id,
                    "nombre": "Otros Fármacos (CIMA/AEMPS)",
                    "unidadId": uid,
                    "drugIds": cima_chapters[uid],
                })

    # Save merged drugs
    output_drugs = DATA_DIR / "drugs.json"
    output_drugs.write_text(json.dumps(merged_drugs, ensure_ascii=False, indent=2), "utf-8")
    size_mb = output_drugs.stat().st_size / (1024 * 1024)
    print(f"  Saved drugs.json: {len(merged_drugs)} drugs ({size_mb:.1f} MB)")

    # Save updated categories
    output_cats = DATA_DIR / "categories.json"
    output_cats.write_text(json.dumps(categories, ensure_ascii=False, indent=2), "utf-8")
    print(f"  Saved categories.json")

    # Summary per unit
    print("\n  Drugs per unit (CIMA):")
    for uid, drug_ids in sorted(cima_chapters.items()):
        unit_name = next((u["nombre"] for u in categories["unidades"] if u["id"] == uid), uid)
        print(f"    {uid} {unit_name}: +{len(drug_ids)} new drugs")


# ─── Phase 2b: Fetch drug detail for ATC codes ───────────────────────────────

def phase2b_fetch_atc(client: CIMAClient, unique_drugs: list[dict]):
    """Fetch full drug details to get ATC codes (not in list results)."""
    print("\n═══ PHASE 2b: Fetching ATC codes from drug details ═══")

    detail_dir = CACHE_DIR / "details"
    detail_dir.mkdir(parents=True, exist_ok=True)

    total = len(unique_drugs)
    fetched = 0

    for i, drug in enumerate(unique_drugs):
        nreg = drug["nregistro"]
        cache_file = detail_dir / f"{nreg}.json"

        if cache_file.exists():
            detail = json.loads(cache_file.read_text("utf-8"))
            if "atcs" in detail:
                drug["atcs"] = detail["atcs"]
                drug["principiosActivos"] = detail.get("principiosActivos", [])
            continue

        detail = client.get_drug_detail(nreg)
        if detail:
            cache_file.write_text(json.dumps(detail, ensure_ascii=False), "utf-8")
            drug["atcs"] = detail.get("atcs", [])
            drug["principiosActivos"] = detail.get("principiosActivos", [])
            fetched += 1

        if (i + 1) % 200 == 0:
            print(f"  Progress: {i+1}/{total} (fetched: {fetched}) — API calls: {client.calls}")

    print(f"  Done! Fetched details: {fetched}")


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="CIMA/AEMPS Drug Importer")
    parser.add_argument("--phase", type=int, default=0, help="Run specific phase (1-3)")
    parser.add_argument("--resume", action="store_true", help="Resume interrupted phase 2")
    args = parser.parse_args()

    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    client = CIMAClient()

    start = time.time()
    print("╔═══════════════════════════════════════════════════════════╗")
    print("║   CIMA/AEMPS Drug Importer — Guía Farmacológica         ║")
    print("╚═══════════════════════════════════════════════════════════╝")

    if args.phase == 0 or args.phase == 1:
        all_drugs = phase1_fetch_metadata(client)
        unique_drugs = phase1b_deduplicate(all_drugs)
    else:
        unique_drugs = json.loads(UNIQUE_DRUGS_FILE.read_text("utf-8"))

    if args.phase == 0 or args.phase == 2:
        phase2b_fetch_atc(client, unique_drugs)
        phase2_fetch_clinical(client, unique_drugs)
        # Re-save unique with ATC data
        UNIQUE_DRUGS_FILE.write_text(json.dumps(unique_drugs, ensure_ascii=False, indent=1), "utf-8")

    if args.phase == 0 or args.phase == 3:
        phase3_merge(unique_drugs)

    elapsed = time.time() - start
    print(f"\n✓ Completed in {elapsed/60:.1f} minutes ({client.calls} API calls)")


if __name__ == "__main__":
    main()
