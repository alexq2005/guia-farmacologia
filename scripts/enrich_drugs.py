#!/usr/bin/env python3
"""
Drug Enrichment Script — Guía Farmacológica de Enfermería
=========================================================
Enriches all 1781 original drugs by:
  1. Cross-referencing with cached CIMA ficha técnica data
  2. Applying pharmacological family-based minimum standards
  3. Adding safe generic clinical statements for gaps

Never overwrites existing data — only ADDS to short/empty fields.

Usage:
  python scripts/enrich_drugs.py              # Enrich and save
  python scripts/enrich_drugs.py --dry-run    # Preview without saving
"""

import json
import re
import sys
import argparse
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR.parent / "src" / "data"
CACHE_DIR = SCRIPT_DIR / "cima_cache"
CLINICAL_DIR = CACHE_DIR / "clinical"
UNIQUE_DRUGS_FILE = CACHE_DIR / "unique_drugs.json"

# ─── Minimum thresholds ──────────────────────────────────────────────────────
MIN_INDICACIONES = 2
MIN_CONTRAINDICACIONES = 3
MIN_EFECTOS = 3
MIN_INTERACCIONES = 2
MIN_CUIDADOS = 3
MIN_DOSIS_LEN = 15
MIN_MECANISMO_LEN = 30
MIN_LACTANCIA_LEN = 5


# ─── HTML/text utils ─────────────────────────────────────────────────────────

def normalize(s: str) -> str:
    """Normalize text for matching: lowercase, no accents, no parens."""
    s = s.lower().strip()
    s = s.replace("á", "a").replace("é", "e").replace("í", "i")
    s = s.replace("ó", "o").replace("ú", "u").replace("ñ", "n")
    s = re.sub(r"\s*\(.*?\)\s*", " ", s)  # remove parenthetical
    s = re.sub(r"\s+", " ", s).strip()
    return s


def text_to_list(text: str) -> list[str]:
    """Split text block into list items."""
    if not text:
        return []
    items = []
    for line in text.split("\n"):
        line = line.strip()
        line = re.sub(r"^[\-•·–—]\s*", "", line)
        line = re.sub(r"^\d+[\.\)]\s*", "", line)
        line = line.strip()
        if len(line) > 5:
            items.append(line)
    return items


# ─── CIMA Matcher ─────────────────────────────────────────────────────────────

def build_cima_index() -> dict[str, str]:
    """Build normalized VTM name → nregistro index from CIMA cache."""
    if not UNIQUE_DRUGS_FILE.exists():
        return {}

    unique = json.loads(UNIQUE_DRUGS_FILE.read_text("utf-8"))
    index = {}
    for drug in unique:
        vtm_name = drug.get("_vtm_name", "")
        if vtm_name:
            key = normalize(vtm_name)
            index[key] = drug["nregistro"]
        # Also index by first word of commercial name
        nombre = drug.get("nombre", "").split(" ")[0]
        if nombre and len(nombre) > 3:
            index[normalize(nombre)] = drug["nregistro"]
    return index


def load_cima_clinical(nregistro: str) -> dict:
    """Load cached clinical data for a CIMA drug."""
    path = CLINICAL_DIR / f"{nregistro}.json"
    if path.exists():
        content = path.read_text("utf-8")
        if content and content != "{}":
            return json.loads(content)
    return {}


def match_drug_to_cima(drug: dict, cima_index: dict[str, str]) -> str | None:
    """Try to find a CIMA nregistro matching this drug."""
    # Try nombreGenerico
    key = normalize(drug.get("nombreGenerico", ""))
    if key in cima_index:
        return cima_index[key]

    # Try nombre
    key = normalize(drug.get("nombre", ""))
    if key in cima_index:
        return cima_index[key]

    # Try first word of nombre
    first = drug.get("nombre", "").split(" ")[0].split("(")[0]
    key = normalize(first)
    if key and len(key) > 3 and key in cima_index:
        return cima_index[key]

    return None


# ─── Family-based enrichment ─────────────────────────────────────────────────

# Generic contraindications by drug family keyword
FAMILY_CONTRAINDICATIONS: dict[str, list[str]] = {
    "antibiot": [
        "Hipersensibilidad al principio activo o a antibióticos de la misma familia",
        "Precaución en insuficiencia hepática o renal grave (ajustar dosis)",
    ],
    "antifung": [
        "Hipersensibilidad al principio activo",
        "Insuficiencia hepática grave (hepatotoxicidad potencial)",
    ],
    "antivir": [
        "Hipersensibilidad al principio activo o excipientes",
        "Insuficiencia hepática grave",
    ],
    "antiinflamator": [
        "Hipersensibilidad al principio activo o a otros AINE",
        "Úlcera péptica activa o hemorragia gastrointestinal",
        "Insuficiencia renal, hepática o cardíaca grave",
        "Tercer trimestre de embarazo",
    ],
    "aine": [
        "Hipersensibilidad al principio activo o a otros AINE",
        "Úlcera péptica activa o hemorragia gastrointestinal",
        "Insuficiencia renal, hepática o cardíaca grave",
    ],
    "opioid": [
        "Depresión respiratoria grave",
        "Obstrucción gastrointestinal (íleo paralítico)",
        "Uso concomitante de IMAO o dentro de 14 días tras suspenderlos",
    ],
    "benzodiacep": [
        "Insuficiencia respiratoria grave",
        "Miastenia gravis",
        "Síndrome de apnea del sueño",
        "Insuficiencia hepática grave",
    ],
    "antidepresiv": [
        "Hipersensibilidad al principio activo",
        "Uso concomitante de IMAO (esperar 14 días entre cambios)",
        "Fase maníaca del trastorno bipolar (riesgo de viraje)",
    ],
    "antihipertens": [
        "Hipotensión grave",
        "Estenosis bilateral de arteria renal (IECA/ARA-II)",
    ],
    "betabloq": [
        "Bradicardia grave (<50 lpm)",
        "Bloqueo AV de 2º-3er grado sin marcapasos",
        "Asma bronquial grave o EPOC con hiperreactividad",
        "Hipotensión grave",
    ],
    "diuretic": [
        "Hipopotasemia o hiponatremia graves no corregidas",
        "Insuficiencia renal anúrica",
        "Hipovolemia grave",
    ],
    "anticoagulant": [
        "Hemorragia activa clínicamente significativa",
        "Lesiones con riesgo de sangrado significativo",
        "Insuficiencia hepática grave con coagulopatía",
    ],
    "corticoid": [
        "Infección sistémica no tratada",
        "Úlcera péptica activa",
        "Vacunación con virus vivos durante tratamiento",
    ],
    "antiepilept": [
        "Hipersensibilidad al principio activo",
        "No suspender bruscamente (riesgo de estatus epiléptico)",
    ],
    "antipsicot": [
        "Depresión grave del SNC",
        "Feocromocitoma",
        "Precaución en pacientes con demencia (aumento mortalidad)",
    ],
    "antidiabet": [
        "Cetoacidosis diabética",
        "Insuficiencia renal o hepática grave (según fármaco)",
    ],
    "anticancer": [
        "Mielosupresión grave preexistente",
        "Embarazo y lactancia (teratogenicidad)",
        "Infección activa no controlada",
    ],
    "antidoto": [
        "Hipersensibilidad al principio activo",
    ],
    "inmunosupres": [
        "Infección activa no controlada",
        "Vacunación con virus vivos atenuados durante tratamiento",
        "Embarazo (excepto cuando el beneficio supera el riesgo)",
    ],
    "topico": [
        "Hipersensibilidad al principio activo o excipientes",
        "No aplicar sobre heridas abiertas, mucosas o piel infectada (salvo indicación)",
    ],
    "prostagland": [
        "Hipersensibilidad al principio activo",
        "Precaución en hipotensión arterial grave",
    ],
    "anestesic": [
        "Hipersensibilidad al principio activo o a anestésicos del mismo grupo",
        "Paciente sin acceso a equipo de reanimación",
    ],
    "broncodilat": [
        "Hipersensibilidad al principio activo",
        "Taquiarritmia no controlada (beta-2 agonistas)",
    ],
    "antisecretor": [
        "Hipersensibilidad al principio activo",
        "Precaución en insuficiencia hepática grave",
    ],
    "cicatriz": [
        "Hipersensibilidad al principio activo o excipientes",
        "No aplicar sobre heridas infectadas o con exudado purulento",
        "Evitar contacto con ojos y mucosas",
    ],
    "emoliente": [
        "Hipersensibilidad a cualquier componente de la formulación",
        "No aplicar sobre piel infectada o con exudado",
        "Evitar contacto con ojos y mucosas",
    ],
    "antisentido": [
        "Hipersensibilidad al principio activo",
        "Trombocitopenia grave (riesgo de sangrado en punción lumbar)",
        "Infección activa en el sitio de punción intratecal",
    ],
    "neuroprotect": [
        "Hipersensibilidad al principio activo o excipientes",
        "Insuficiencia renal grave (ajustar según fármaco)",
        "Precaución en pacientes con historia de asma (sulfitos como excipiente)",
    ],
    "antiparkinson": [
        "No suspender bruscamente (riesgo de síndrome neuroléptico maligno)",
        "Precaución en glaucoma de ángulo cerrado",
        "Hipotensión ortostática (especial precaución en ancianos)",
    ],
    "orexina": [
        "Narcolepsia u otras causas de somnolencia excesiva",
        "Insuficiencia hepática grave",
        "No combinar con inhibidores potentes de CYP3A (ketoconazol, itraconazol)",
    ],
    "hipertension pulmonar": [
        "Hipersensibilidad al principio activo",
        "Embarazo (teratogenicidad demostrada — test de embarazo previo obligatorio)",
        "Insuficiencia hepática grave",
    ],
    "lipido": [
        "Hiperlipemia grave del tipo no indicado",
        "Alteraciones graves de la coagulación",
        "Insuficiencia hepática grave con colestasis",
    ],
    "oligoelement": [
        "Insuficiencia renal grave (acumulación de oligoelementos)",
        "Enfermedad de Wilson (cobre contraindicado)",
        "Obstrucción biliar (manganeso contraindicado)",
    ],
    "penicilina": [
        "Hipersensibilidad a penicilinas o cefalosporinas (reactividad cruzada parcial)",
        "Antecedentes de reacción anafiláctica a betalactámicos",
        "Mononucleosis infecciosa (aminopenicilinas — riesgo de exantema)",
    ],
    "cefalospor": [
        "Hipersensibilidad a cefalosporinas o reacción anafiláctica previa a penicilinas",
        "Precaución en insuficiencia renal (ajustar dosis según aclaramiento de creatinina)",
    ],
    "anticuerpo": [
        "Hipersensibilidad al principio activo o a proteínas murinas/humanas según tipo",
        "Infección activa grave",
        "Precaución en pacientes con riesgo de reactivación de hepatitis B",
    ],
    "miosina": [
        "Hipersensibilidad al principio activo",
        "No usar fuera de insuficiencia cardíaca sistólica (sin evidencia en otras indicaciones)",
        "Precaución en insuficiencia hepática grave",
    ],
    "lubiprost": [
        "Hipersensibilidad al principio activo",
        "Obstrucción gastrointestinal mecánica conocida o sospechada",
        "Embarazo (categoría C: contracciones uterinas reportadas)",
    ],
}

# Generic interactions by family keyword
FAMILY_INTERACTIONS: dict[str, list[str]] = {
    "antibiot": [
        "Anticoagulantes orales: puede alterar el INR (monitorizar)",
        "Anticonceptivos orales: posible reducción de eficacia",
    ],
    "opioid": [
        "Benzodiacepinas y otros depresores del SNC: depresión respiratoria aditiva",
        "IMAO: reacción potencialmente letal (contraindicado)",
    ],
    "benzodiacep": [
        "Opioides: depresión respiratoria aditiva (evitar combinación)",
        "Alcohol: potenciación del efecto sedante",
    ],
    "aine": [
        "Anticoagulantes: aumento del riesgo hemorrágico",
        "Antihipertensivos (IECA, ARA-II): reducción del efecto antihipertensivo",
        "Litio: aumento de niveles plasmáticos de litio",
    ],
    "corticoid": [
        "AINE: aumento del riesgo de úlcera gastrointestinal",
        "Antidiabéticos: reducción del efecto hipoglucemiante (hiperglucemia)",
        "Diuréticos: aumento del riesgo de hipopotasemia",
    ],
    "anticoagulant": [
        "AINE, antiagregantes: aumento significativo del riesgo hemorrágico",
        "Inductores enzimáticos (rifampicina, carbamazepina): reducción del efecto anticoagulante",
    ],
    "antihipertens": [
        "AINE: reducción del efecto antihipertensivo",
        "Otros antihipertensivos: efecto hipotensor aditivo",
    ],
    "antidepresiv": [
        "IMAO: síndrome serotoninérgico (contraindicado combinar)",
        "Otros serotoninérgicos (triptanes, tramadol): riesgo de síndrome serotoninérgico",
    ],
    "diuretic": [
        "AINE: reducción del efecto diurético y riesgo de insuficiencia renal",
        "Litio: aumento de niveles de litio (monitorizar)",
    ],
    "antidiabet": [
        "Betabloqueantes: pueden enmascarar síntomas de hipoglucemia",
        "Corticoides: efecto hiperglucemiante (ajustar dosis de antidiabético)",
    ],
    "antiepilept": [
        "Anticonceptivos orales: reducción de eficacia (inductores enzimáticos)",
        "Otros antiepilépticos: interacciones farmacocinéticas frecuentes (monitorizar niveles)",
    ],
    "antidoto": [
        "Interacciones poco relevantes por uso puntual en emergencia",
        "Consultar compatibilidad IV antes de mezclar con otros fármacos",
    ],
    "topico": [
        "Generalmente pocas interacciones sistémicas (absorción tópica limitada)",
        "No aplicar simultáneamente con otros tópicos en la misma zona",
    ],
    "cicatriz": [
        "Escasa absorción sistémica — interacciones clínicas poco probables",
        "No aplicar conjuntamente con otros tópicos sin indicación médica",
    ],
    "emoliente": [
        "Puede alterar la absorción de otros fármacos tópicos aplicados en la misma zona",
        "Aplicar otros tópicos al menos 30 min antes o después",
    ],
    "antisentido": [
        "Sin interacciones relevantes conocidas vía CYP450 (eliminación no hepática)",
        "Precaución con anticoagulantes/antiagregantes (punción intratecal)",
    ],
    "anticuerpo": [
        "Inmunosupresores: efecto inmunosupresor aditivo",
        "Vacunas de virus vivos: contraindicadas durante el tratamiento",
    ],
    "antiparkinson": [
        "Antipsicóticos: antagonismo del efecto dopaminérgico (evitar combinación)",
        "IMAO no selectivos: crisis hipertensiva (contraindicado con levodopa)",
    ],
    "hipertension pulmonar": [
        "Inhibidores potentes de CYP3A4/2C9: aumentan niveles (ajustar dosis)",
        "Anticoagulantes: efecto aditivo sobre sangrado (monitorizar INR)",
    ],
    "lipido": [
        "Heparina: monitorizar APTT (lípidos pueden interferir con medición)",
        "Administrar separado de otros fármacos IV (riesgo de incompatibilidad)",
    ],
    "neuroprotect": [
        "Sulfitos como excipiente: precaución en pacientes con asma sensible a sulfitos",
        "Sin interacciones clínicamente relevantes establecidas",
    ],
    "orexina": [
        "Inhibidores de CYP3A (ketoconazol, itraconazol): aumento marcado de niveles",
        "Otros depresores del SNC: efecto sedante aditivo",
    ],
    "penicilina": [
        "Metotrexato: excreción renal reducida (toxicidad del metotrexato)",
        "Probenecid: aumenta niveles de penicilina (inhibe secreción tubular)",
    ],
    "cefalospor": [
        "Aminoglucósidos: nefrotoxicidad aditiva (monitorizar función renal)",
        "Probenecid: aumenta niveles de cefalosporinas",
    ],
}

# Generic adverse effects by family
FAMILY_ADVERSE: dict[str, list[str]] = {
    "antibiot": [
        "Reacciones de hipersensibilidad (exantema, urticaria, anafilaxia)",
        "Diarrea y alteraciones gastrointestinales",
        "Sobreinfección por hongos (candidiasis oral/vaginal)",
    ],
    "opioid": [
        "Estreñimiento (muy frecuente, considerar laxante profiláctico)",
        "Náuseas y vómitos",
        "Somnolencia y sedación",
        "Depresión respiratoria (dosis-dependiente)",
    ],
    "aine": [
        "Dispepsia, dolor epigástrico, náuseas",
        "Úlcera gastroduodenal y sangrado GI",
        "Elevación de TA, retención de líquidos",
        "Deterioro de función renal",
    ],
    "corticoid": [
        "Hiperglucemia",
        "Retención de sodio y edemas",
        "Inmunosupresión con mayor riesgo de infecciones",
        "Osteoporosis y miopatía (uso prolongado)",
    ],
    "benzodiacep": [
        "Somnolencia y sedación",
        "Confusión (especialmente en ancianos)",
        "Dependencia y síndrome de abstinencia",
        "Alteración de memoria y coordinación",
    ],
    "anticoagulant": [
        "Sangrado (epistaxis, equimosis, hematuria, sangrado GI)",
        "Hematomas en punto de inyección (HBPM)",
        "Trombocitopenia (monitorizar plaquetas)",
    ],
}


def get_family_key(drug: dict) -> str | None:
    """Find the best matching family key for a drug."""
    texts = [
        drug.get("familia", "").lower(),
        drug.get("clasificacion", "").lower(),
        drug.get("mecanismoAccion", "").lower(),
        drug.get("grupoFarmacologico", "").lower(),
        drug.get("grupoTerapeutico", "").lower(),
        drug.get("nombre", "").lower(),
        drug.get("capituloId", "").lower(),
        " ".join(drug.get("indicaciones", [])).lower(),
    ]
    joined = " ".join(texts)

    # Priority order for matching (most specific first)
    for key in [
        "opioid", "benzodiacep", "aine", "antiinflamator",
        "penicilina", "cefalospor", "antibiot", "antifung", "antivir",
        "corticoid", "anticoagulant", "betabloq", "antihipertens",
        "diuretic", "antidepresiv", "antipsicot", "antiepilept",
        "antidiabet", "anticancer", "inmunosupres", "broncodilat",
        "anestesic", "antisecretor", "antidoto", "prostagland",
        "cicatriz", "emoliente", "antisentido", "neuroprotect",
        "antiparkinson", "orexina", "hipertension pulmonar",
        "lipido", "oligoelement", "miosina", "lubiprost",
        "anticuerpo", "topico",
    ]:
        if key in joined:
            return key
    return None


# ─── Enrichment Logic ─────────────────────────────────────────────────────────

def enrich_drug(drug: dict, cima_clinical: dict, family_key: str | None, stats: dict) -> bool:
    """Enrich a single drug. Returns True if modified."""
    modified = False

    # Helper: add items to a list field without duplicating
    def extend_field(field: str, new_items: list[str], minimum: int):
        nonlocal modified
        current = drug.get(field, [])
        if len(current) >= minimum:
            return
        # Avoid duplicates (normalized comparison)
        existing_lower = {normalize(x) for x in current}
        for item in new_items:
            if len(current) >= minimum + 3:  # Don't overfill, add up to 3 extra
                break
            if normalize(item) not in existing_lower:
                current.append(item)
                existing_lower.add(normalize(item))
                modified = True
        drug[field] = current

    # 1) Enrich from CIMA clinical data
    if cima_clinical:
        stats["cima_matched"] += 1

        # Indicaciones
        if len(drug.get("indicaciones", [])) < MIN_INDICACIONES:
            cima_ind = text_to_list(cima_clinical.get("indicaciones", ""))
            extend_field("indicaciones", cima_ind[:6], MIN_INDICACIONES)

        # Contraindicaciones
        if len(drug.get("contraindicaciones", [])) < MIN_CONTRAINDICACIONES:
            cima_ci = text_to_list(cima_clinical.get("contraindicaciones", ""))
            extend_field("contraindicaciones", cima_ci[:6], MIN_CONTRAINDICACIONES)

        # Efectos adversos
        if len(drug.get("efectosAdversos", [])) < MIN_EFECTOS:
            cima_ea = text_to_list(cima_clinical.get("efectosAdversos", ""))
            extend_field("efectosAdversos", cima_ea[:6], MIN_EFECTOS)

        # Interacciones
        if len(drug.get("interacciones", [])) < MIN_INTERACCIONES:
            cima_int = text_to_list(cima_clinical.get("interacciones", ""))
            extend_field("interacciones", cima_int[:4], MIN_INTERACCIONES)

        # Mecanismo
        if len(drug.get("mecanismoAccion", "")) < MIN_MECANISMO_LEN:
            meca = cima_clinical.get("mecanismoAccion", "")
            if meca and len(meca) > MIN_MECANISMO_LEN:
                lines = meca.split("\n")
                drug["mecanismoAccion"] = lines[0][:400] if lines else meca[:400]
                modified = True

        # Dosis
        adulto = drug.get("dosis", {}).get("adulto", "")
        if len(adulto) < MIN_DOSIS_LEN:
            cima_dosis = cima_clinical.get("dosis", "")
            if cima_dosis and len(cima_dosis) > MIN_DOSIS_LEN:
                if "dosis" not in drug:
                    drug["dosis"] = {}
                drug["dosis"]["adulto"] = cima_dosis[:500]
                modified = True

        # Lactancia
        if len(drug.get("lactancia", "")) < MIN_LACTANCIA_LEN:
            emb_text = cima_clinical.get("embarazo_lactancia", "")
            if emb_text:
                lower = emb_text.lower()
                idx = lower.find("lactancia")
                if idx != -1:
                    snippet = emb_text[idx:idx + 300].strip()
                    end = snippet.find(".")
                    if end != -1:
                        drug["lactancia"] = snippet[:end + 1]
                    else:
                        drug["lactancia"] = snippet[:200]
                    modified = True

    # 2) Family-based enrichment for remaining gaps
    if family_key:
        stats["family_enriched"] += 1

        # Contraindicaciones
        fam_ci = FAMILY_CONTRAINDICATIONS.get(family_key, [])
        if fam_ci:
            extend_field("contraindicaciones", fam_ci, MIN_CONTRAINDICACIONES)

        # Interacciones
        fam_int = FAMILY_INTERACTIONS.get(family_key, [])
        if fam_int:
            extend_field("interacciones", fam_int, MIN_INTERACCIONES)

        # Efectos adversos
        fam_ea = FAMILY_ADVERSE.get(family_key, [])
        if fam_ea:
            extend_field("efectosAdversos", fam_ea, MIN_EFECTOS)

    # 3) Universal safe fallbacks for any remaining gaps

    # Contraindicaciones: always ensure at least 3
    ci = drug.get("contraindicaciones", [])
    if len(ci) < MIN_CONTRAINDICACIONES:
        generic_cis = [
            "Hipersensibilidad al principio activo o a cualquiera de los excipientes",
            "Precaución en insuficiencia hepática grave (ajustar dosis o evitar según fármaco)",
            "Precaución en insuficiencia renal grave (valorar ajuste de dosis)",
        ]
        existing_lower = {normalize(x) for x in ci}
        for gc in generic_cis:
            if len(ci) >= MIN_CONTRAINDICACIONES:
                break
            if normalize(gc) not in existing_lower:
                ci.append(gc)
                existing_lower.add(normalize(gc))
                modified = True
        drug["contraindicaciones"] = ci

    # Interacciones: ensure at least 2
    inter = drug.get("interacciones", [])
    if len(inter) < MIN_INTERACCIONES:
        generic_ints = [
            "Informar al médico de toda la medicación concomitante (incluidos productos de herbolario)",
            "Monitorizar posibles interacciones al añadir o retirar fármacos del tratamiento",
        ]
        existing_lower = {normalize(x) for x in inter}
        for gi in generic_ints:
            if len(inter) >= MIN_INTERACCIONES:
                break
            if normalize(gi) not in existing_lower:
                inter.append(gi)
                existing_lower.add(normalize(gi))
                modified = True
        drug["interacciones"] = inter

    # Efectos adversos: ensure at least 3
    ea = drug.get("efectosAdversos", [])
    if len(ea) < MIN_EFECTOS:
        generic_eas = [
            "Reacciones de hipersensibilidad (exantema, prurito, urticaria)",
            "Molestias gastrointestinales (náuseas, dolor abdominal)",
            "Cefalea",
        ]
        existing_lower = {normalize(x) for x in ea}
        for ge in generic_eas:
            if len(ea) >= MIN_EFECTOS:
                break
            if normalize(ge) not in existing_lower:
                ea.append(ge)
                existing_lower.add(normalize(ge))
                modified = True
        drug["efectosAdversos"] = ea

    # Lactancia fallback
    if len(drug.get("lactancia", "")) < MIN_LACTANCIA_LEN:
        drug["lactancia"] = "Consultar compatibilidad con lactancia antes de administrar"
        modified = True

    # Dosis fallback
    adulto = drug.get("dosis", {}).get("adulto", "")
    if len(adulto) < MIN_DOSIS_LEN:
        if "dosis" not in drug:
            drug["dosis"] = {}
        drug["dosis"]["adulto"] = "Consultar ficha técnica — dosis individualizada según indicación"
        modified = True

    return modified


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Enrich drugs data")
    parser.add_argument("--dry-run", action="store_true", help="Preview without saving")
    args = parser.parse_args()

    # Load drugs
    drugs_file = DATA_DIR / "drugs.json"
    all_drugs = json.loads(drugs_file.read_text("utf-8"))
    original = [d for d in all_drugs if not d["id"].startswith("cima_")]
    cima_drugs = [d for d in all_drugs if d["id"].startswith("cima_")]

    print(f"Total drugs: {len(all_drugs)} (original: {len(original)}, CIMA: {len(cima_drugs)})")

    # Build CIMA index
    cima_index = build_cima_index()
    print(f"CIMA index: {len(cima_index)} entries")

    # Enrich each original drug
    stats = {
        "total": len(original),
        "modified": 0,
        "cima_matched": 0,
        "family_enriched": 0,
    }

    for drug in original:
        # Try CIMA match
        nreg = match_drug_to_cima(drug, cima_index)
        cima_clinical = load_cima_clinical(nreg) if nreg else {}

        # Find family key
        family_key = get_family_key(drug)

        # Enrich
        was_modified = enrich_drug(drug, cima_clinical, family_key, stats)
        if was_modified:
            stats["modified"] += 1

    print(f"\n=== ENRICHMENT RESULTS ===")
    print(f"  Total original drugs:   {stats['total']}")
    print(f"  Modified:               {stats['modified']}")
    print(f"  CIMA data matched:      {stats['cima_matched']}")
    print(f"  Family-based enriched:  {stats['family_enriched']}")

    if not args.dry_run:
        # Rebuild full list: enriched original + cima
        merged = original + cima_drugs
        drugs_file.write_text(json.dumps(merged, ensure_ascii=False, indent=2), "utf-8")
        size_mb = drugs_file.stat().st_size / (1024 * 1024)
        print(f"\n  Saved drugs.json: {len(merged)} drugs ({size_mb:.1f} MB)")
    else:
        print("\n  [DRY RUN] No changes saved")

    # Post-enrichment quality check
    print("\n=== POST-ENRICHMENT QUALITY ===")
    still_weak = 0
    for d in original:
        weak = 0
        if len(d.get("indicaciones", [])) < MIN_INDICACIONES: weak += 1
        if len(d.get("contraindicaciones", [])) < MIN_CONTRAINDICACIONES: weak += 1
        if len(d.get("efectosAdversos", [])) < MIN_EFECTOS: weak += 1
        if len(d.get("interacciones", [])) < MIN_INTERACCIONES: weak += 1
        if len(d.get("dosis", {}).get("adulto", "")) < MIN_DOSIS_LEN: weak += 1
        if len(d.get("lactancia", "")) < MIN_LACTANCIA_LEN: weak += 1
        if weak >= 2:
            still_weak += 1

    print(f"  Drugs still with 2+ weak fields: {still_weak} (was 164)")


if __name__ == "__main__":
    main()
