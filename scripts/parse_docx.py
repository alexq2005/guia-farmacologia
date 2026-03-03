#!/usr/bin/env python3
"""
Parser para extraer datos farmacológicos del documento .docx
"Guía Farmacológica Integral de Enfermería v4"

Genera 5 archivos JSON:
  - drugs.json          — 201+ fármacos completos
  - categories.json     — jerarquía unidades/capítulos
  - emergency_drugs.json — tabla de emergencia
  - antidotes.json      — antídotos
  - iv_compatibilities.json — compatibilidades IV

Uso:
  python scripts/parse_docx.py <ruta_al_documento.docx>

Requiere: pip install python-docx
"""

import sys
import os
import json
import re
import unicodedata
from pathlib import Path
from docx import Document

# ============================================================
# CONFIGURATION
# ============================================================

OUTPUT_DIR = Path(__file__).parent.parent / "src" / "data"

# Known unit names to detect document structure
UNIT_NAMES = {
    "sistema nervioso": "u01",
    "cardiovascular": "u02",
    "antiinfeccioso": "u03",
    "infeccion": "u03",
    "respiratorio": "u04",
    "digestivo": "u05",
    "endocrino": "u06",
    "reproductor": "u07",
    "musculoesquel": "u08",
    "dermatolog": "u09",
    "hematolog": "u10",
    "antídoto": "u11",
    "antidoto": "u11",
    "hospitalario": "u12",
    "psicofármaco": "u13",
    "psicofarmaco": "u13",
}

UNIT_FULL_NAMES = {
    "u01": "Sistema Nervioso",
    "u02": "Sistema Cardiovascular",
    "u03": "Antiinfecciosos",
    "u04": "Sistema Respiratorio",
    "u05": "Sistema Digestivo",
    "u06": "Sistema Endocrino",
    "u07": "Sistema Reproductor y Óseo",
    "u08": "Sistema Musculoesquelético",
    "u09": "Dermatología",
    "u10": "Hematología",
    "u11": "Antídotos y Emergencias",
    "u12": "Fármacos Hospitalarios",
    "u13": "Psicofármacos",
    "u14": "Otros",
}

UNIT_COLORS = {
    "u01": "#7C3AED",
    "u02": "#DC2626",
    "u03": "#059669",
    "u04": "#2563EB",
    "u05": "#EA580C",
    "u06": "#B45309",
    "u07": "#DB2777",
    "u08": "#0D9488",
    "u09": "#CA8A04",
    "u10": "#991B1B",
    "u11": "#EF4444",
    "u12": "#6B7280",
    "u13": "#7E22CE",
    "u14": "#0369A1",
}

# Drug table field names (expected row labels in tables)
FIELD_PATTERNS = {
    "nombre": r"(?:nombre|fármaco|farmaco|medicamento)",
    "nombreGenerico": r"(?:nombre\s*genérico|nombre\s*generico|genérico|generico|DCI)",
    "nombresComerciales": r"(?:nombre\s*comercial|marca|comercial)",
    "familia": r"(?:familia|grupo|clase\s*farmacol)",
    "clasificacion": r"(?:clasificaci[óo]n|tipo|subtipo)",
    "mecanismoAccion": r"(?:mecanismo|acci[óo]n\s*farmacol)",
    "indicaciones": r"(?:indicaci[oó]n|uso\s*cl[íi]nico|usos)",
    "contraindicaciones": r"(?:contraindicaci[oó]n)",
    "efectosAdversos": r"(?:efecto\s*(?:adverso|secundario|indeseable)|RAM|reacci[oó]n\s*adversa)",
    "interacciones": r"(?:interacci[oó]n)",
    "viaAdministracion": r"(?:v[íi]a|administraci[oó]n|ruta)",
    "dosis": r"(?:dosis|dosificaci[oó]n|posolog[íi]a)",
    "presentaciones": r"(?:presentaci[oó]n|forma\s*farmac[eé]utica)",
    "embarazo": r"(?:embarazo|categor[íi]a\s*(?:FDA|embarazo)|gestaci[oó]n)",
    "lactancia": r"(?:lactancia|amamantamiento)",
    "cuidadosEnfermeria": r"(?:cuidado|enfermer[íi]a|intervenci[oó]n\s*de\s*enfermer)",
    "farmacocinetica": r"(?:farmacocin[eé]tica|cin[eé]tica|ADME)",
    "almacenamiento": r"(?:almacenamiento|conservaci[oó]n|estabilidad)",
}

# Emergency table detection keywords
EMERGENCY_KEYWORDS = [
    "emergencia", "paro", "reanimación", "RCP", "urgencia",
    "fármacos de emergencia", "carro de paro"
]

ANTIDOTE_KEYWORDS = [
    "antídoto", "antidoto", "intoxicación", "toxicología",
    "tóxico", "toxico"
]

IV_COMPAT_KEYWORDS = [
    "compatibilidad", "incompatibilidad", "mezcla", "infusión"
]


# ============================================================
# HELPERS
# ============================================================

def normalize_text(text: str) -> str:
    """Remove accents and lowercase for search/matching."""
    nfkd = unicodedata.normalize('NFKD', text)
    return ''.join(c for c in nfkd if not unicodedata.combining(c)).lower().strip()


def clean_cell(cell) -> str:
    """Extract clean text from a table cell."""
    return cell.text.strip()


def split_list(text: str) -> list:
    """Split text into list items by common delimiters."""
    if not text:
        return []
    # Split by newlines, bullets, dashes, semicolons, numbered lists
    items = re.split(r'\n|[•●○]\s*|[-–—]\s+|\d+[.)]\s*|;\s*', text)
    return [item.strip() for item in items if item.strip()]


def detect_unit(text: str) -> str:
    """Detect which unit a heading belongs to."""
    normalized = normalize_text(text)
    for pattern, unit_id in UNIT_NAMES.items():
        if pattern in normalized:
            return unit_id
    return "u14"  # Default to "Otros"


def make_drug_id(name: str) -> str:
    """Create a URL-safe drug ID from name."""
    normalized = normalize_text(name)
    return re.sub(r'[^a-z0-9]+', '_', normalized).strip('_')


def build_search_text(drug: dict) -> str:
    """Build precalculated search text for a drug."""
    parts = [
        drug.get("nombre", ""),
        drug.get("nombreGenerico", ""),
        " ".join(drug.get("nombresComerciales", [])),
        drug.get("familia", ""),
        drug.get("clasificacion", ""),
        " ".join(drug.get("indicaciones", [])),
    ]
    return normalize_text(" ".join(parts))


def detect_pregnancy_category(text: str) -> str:
    """Extract FDA pregnancy category from text."""
    text_upper = text.strip().upper()
    for cat in ["A", "B", "C", "D", "X"]:
        if f"CATEGORÍA {cat}" in text_upper or f"CATEGORIA {cat}" in text_upper or text_upper == cat:
            return cat
    if re.match(r'^[ABCDX]$', text_upper):
        return text_upper
    return "N/A"


def detect_routes(text: str) -> list:
    """Extract administration routes from text."""
    routes = []
    route_map = {
        "oral": ["oral", "VO", "v.o.", "por boca"],
        "IV": ["intravenosa", "IV", "EV", "endovenosa", "i.v."],
        "IM": ["intramuscular", "IM", "i.m."],
        "SC": ["subcutánea", "subcutanea", "SC", "s.c."],
        "sublingual": ["sublingual", "SL"],
        "topica": ["tópica", "topica", "cutánea", "cutanea", "crema", "pomada"],
        "rectal": ["rectal", "supositorio"],
        "inhalatoria": ["inhalatoria", "inhalación", "inhalacion", "nebulización", "IDM"],
        "oftalmica": ["oftálmica", "oftalmica", "colirio", "ocular"],
        "otica": ["ótica", "otica", "auricular"],
        "nasal": ["nasal", "intranasal"],
        "transdermica": ["transdérmica", "transdermica", "parche"],
        "intratecal": ["intratecal"],
        "epidural": ["epidural", "peridural"],
        "vaginal": ["vaginal", "óvulo", "ovulo"],
        "intradermica": ["intradérmica", "intradermica", "ID"],
    }

    text_lower = text.lower()
    for route, keywords in route_map.items():
        for keyword in keywords:
            if keyword.lower() in text_lower:
                if route not in routes:
                    routes.append(route)
                break

    return routes if routes else ["oral"]  # Default to oral


# ============================================================
# TABLE PARSERS
# ============================================================

def is_emergency_table(table) -> bool:
    """Check if a table is the emergency drugs table."""
    first_row_text = normalize_text(" ".join(clean_cell(c) for c in table.rows[0].cells))
    return any(kw in first_row_text for kw in EMERGENCY_KEYWORDS)


def is_antidote_table(table) -> bool:
    """Check if a table is the antidotes table."""
    first_row_text = normalize_text(" ".join(clean_cell(c) for c in table.rows[0].cells))
    return any(kw in first_row_text for kw in ANTIDOTE_KEYWORDS)


def is_iv_compat_table(table) -> bool:
    """Check if a table is the IV compatibility table."""
    first_row_text = normalize_text(" ".join(clean_cell(c) for c in table.rows[0].cells))
    return any(kw in first_row_text for kw in IV_COMPAT_KEYWORDS)


def parse_emergency_table(table) -> list:
    """Parse the emergency drugs table."""
    drugs = []
    headers = [normalize_text(clean_cell(c)) for c in table.rows[0].cells]

    for i, row in enumerate(table.rows[1:], 1):
        cells = [clean_cell(c) for c in row.cells]
        if not any(cells):
            continue

        drug = {
            "id": f"em_{i:03d}",
            "nombre": cells[0] if len(cells) > 0 else "",
            "indicacion": cells[1] if len(cells) > 1 else "",
            "dosis": cells[2] if len(cells) > 2 else "",
            "via": cells[3] if len(cells) > 3 else "",
            "velocidadAdmin": cells[4] if len(cells) > 4 else "",
            "presentacion": cells[5] if len(cells) > 5 else "",
            "efectosAdversos": cells[6] if len(cells) > 6 else "",
            "notas": cells[7] if len(cells) > 7 else "",
        }
        drugs.append(drug)

    return drugs


def parse_antidote_table(table) -> list:
    """Parse the antidotes table."""
    antidotes = []
    for i, row in enumerate(table.rows[1:], 1):
        cells = [clean_cell(c) for c in row.cells]
        if not any(cells):
            continue

        antidote = {
            "id": f"ant_{i:03d}",
            "toxico": cells[0] if len(cells) > 0 else "",
            "antidoto": cells[1] if len(cells) > 1 else "",
            "dosis": cells[2] if len(cells) > 2 else "",
            "via": cells[3] if len(cells) > 3 else "",
            "inicio": cells[4] if len(cells) > 4 else "",
            "notas": cells[5] if len(cells) > 5 else "",
        }
        antidotes.append(antidote)

    return antidotes


def parse_iv_compat_table(table) -> dict:
    """Parse the IV compatibility table."""
    farmacos = []
    compatibilidades = []

    # Detect format — could be matrix or list format
    headers = [clean_cell(c) for c in table.rows[0].cells]

    if len(headers) >= 3 and len(table.rows) > 1:
        # List format: drug1 | drug2 | compatibility | notes
        for row in table.rows[1:]:
            cells = [clean_cell(c) for c in row.cells]
            if len(cells) >= 3 and cells[0] and cells[1]:
                f1, f2 = cells[0], cells[1]
                if f1 not in farmacos:
                    farmacos.append(f1)
                if f2 not in farmacos:
                    farmacos.append(f2)

                compat_text = normalize_text(cells[2])
                if "compatible" in compat_text and "incompatible" not in compat_text:
                    compat = "compatible"
                elif "incompatible" in compat_text:
                    compat = "incompatible"
                elif "variable" in compat_text:
                    compat = "variable"
                else:
                    compat = "desconocido"

                compatibilidades.append({
                    "farmaco1": f1,
                    "farmaco2": f2,
                    "compatibilidad": compat,
                    "notas": cells[3] if len(cells) > 3 else "",
                })

    return {"farmacos": sorted(farmacos), "compatibilidades": compatibilidades}


def parse_drug_table(table, unit_id: str, chapter_id: str) -> dict | None:
    """Parse a standard drug information table (2-column: field name | value)."""
    if len(table.columns) < 2:
        return None

    drug = {
        "id": "",
        "nombre": "",
        "nombreGenerico": "",
        "nombresComerciales": [],
        "familia": "",
        "clasificacion": "",
        "mecanismoAccion": "",
        "indicaciones": [],
        "contraindicaciones": [],
        "efectosAdversos": [],
        "interacciones": [],
        "viaAdministracion": [],
        "dosis": {"adulto": ""},
        "presentaciones": [],
        "embarazo": "N/A",
        "lactancia": "",
        "cuidadosEnfermeria": [],
        "farmacocinetica": {},
        "almacenamiento": "",
        "unidadId": unit_id,
        "capituloId": chapter_id,
        "searchText": "",
    }

    for row in table.rows:
        cells = [clean_cell(c) for c in row.cells]
        if len(cells) < 2:
            continue

        label = normalize_text(cells[0])
        value = cells[1] if len(cells) > 1 else ""

        for field, pattern in FIELD_PATTERNS.items():
            if re.search(pattern, label, re.IGNORECASE):
                if field == "nombre":
                    drug["nombre"] = value
                    drug["id"] = make_drug_id(value)
                elif field == "nombreGenerico":
                    drug["nombreGenerico"] = value
                elif field == "nombresComerciales":
                    drug["nombresComerciales"] = split_list(value)
                elif field == "familia":
                    drug["familia"] = value
                elif field == "clasificacion":
                    drug["clasificacion"] = value
                elif field == "mecanismoAccion":
                    drug["mecanismoAccion"] = value
                elif field == "indicaciones":
                    drug["indicaciones"] = split_list(value)
                elif field == "contraindicaciones":
                    drug["contraindicaciones"] = split_list(value)
                elif field == "efectosAdversos":
                    drug["efectosAdversos"] = split_list(value)
                elif field == "interacciones":
                    drug["interacciones"] = split_list(value)
                elif field == "viaAdministracion":
                    drug["viaAdministracion"] = detect_routes(value)
                elif field == "dosis":
                    drug["dosis"]["adulto"] = value
                elif field == "presentaciones":
                    drug["presentaciones"] = split_list(value)
                elif field == "embarazo":
                    drug["embarazo"] = detect_pregnancy_category(value)
                elif field == "lactancia":
                    drug["lactancia"] = value
                elif field == "cuidadosEnfermeria":
                    drug["cuidadosEnfermeria"] = split_list(value)
                elif field == "farmacocinetica":
                    drug["farmacocinetica"] = {"absorcion": value}
                elif field == "almacenamiento":
                    drug["almacenamiento"] = value
                break

    # Skip if no name found
    if not drug["nombre"]:
        return None

    drug["searchText"] = build_search_text(drug)
    return drug


# ============================================================
# DOCUMENT PARSER
# ============================================================

def parse_document(docx_path: str) -> tuple:
    """Parse the entire document and extract all data."""
    print(f"Abriendo documento: {docx_path}")
    doc = Document(docx_path)

    drugs = []
    emergency_drugs = []
    antidotes = []
    iv_compat = {"farmacos": [], "compatibilidades": []}
    categories = {"unidades": []}

    # Track current position in document structure
    current_unit = "u14"
    current_chapter = "c14_01"
    chapter_counter = {}
    unit_chapters = {}
    drug_ids_by_chapter = {}

    # First pass: detect headings to build unit/chapter structure
    print("Analizando estructura del documento...")
    for para in doc.paragraphs:
        text = para.text.strip()
        if not text:
            continue

        style_name = (para.style.name or "").lower()

        # Detect unit headings (Heading 1 or styled as such)
        if "heading 1" in style_name or (para.runs and para.runs[0].bold and len(text) < 80):
            detected_unit = detect_unit(text)
            if detected_unit != "u14" or "unidad" in normalize_text(text):
                current_unit = detected_unit
                if current_unit not in chapter_counter:
                    chapter_counter[current_unit] = 0
                    unit_chapters[current_unit] = []

        # Detect chapter headings (Heading 2)
        if "heading 2" in style_name:
            if current_unit not in chapter_counter:
                chapter_counter[current_unit] = 0
                unit_chapters[current_unit] = []

            chapter_counter[current_unit] += 1
            num = chapter_counter[current_unit]
            unit_num = current_unit.replace("u", "")
            current_chapter = f"c{unit_num}_{num:02d}"

            unit_chapters[current_unit].append({
                "id": current_chapter,
                "nombre": text,
                "unidadId": current_unit,
                "drugIds": [],
            })
            drug_ids_by_chapter[current_chapter] = unit_chapters[current_unit][-1]["drugIds"]

    # Second pass: parse tables
    print(f"Procesando {len(doc.tables)} tablas...")
    table_unit = "u14"
    table_chapter = "c14_01"

    for i, table in enumerate(doc.tables):
        # Try to detect special tables first
        if is_emergency_table(table):
            print(f"  → Tabla {i+1}: EMERGENCIAS detectada")
            emergency_drugs = parse_emergency_table(table)
            continue

        if is_antidote_table(table):
            print(f"  → Tabla {i+1}: ANTÍDOTOS detectada")
            antidotes = parse_antidote_table(table)
            continue

        if is_iv_compat_table(table):
            print(f"  → Tabla {i+1}: COMPATIBILIDADES IV detectada")
            iv_compat = parse_iv_compat_table(table)
            continue

        # Try to parse as drug table
        drug = parse_drug_table(table, table_unit, table_chapter)
        if drug:
            drugs.append(drug)
            if table_chapter in drug_ids_by_chapter:
                drug_ids_by_chapter[table_chapter].append(drug["id"])
            print(f"  → Tabla {i+1}: Fármaco '{drug['nombre']}' extraído")

    # Build categories structure
    for unit_id in sorted(unit_chapters.keys()):
        unit_num = int(unit_id.replace("u", ""))
        categories["unidades"].append({
            "id": unit_id,
            "nombre": UNIT_FULL_NAMES.get(unit_id, f"Unidad {unit_num}"),
            "numero": unit_num,
            "color": UNIT_COLORS.get(unit_id, "#6B7280"),
            "icon": "brain",
            "capitulos": unit_chapters[unit_id],
        })

    return drugs, categories, emergency_drugs, antidotes, iv_compat


# ============================================================
# MAIN
# ============================================================

def main():
    if len(sys.argv) < 2:
        print("Uso: python scripts/parse_docx.py <ruta_al_documento.docx>")
        print("")
        print("Si no tienes el documento .docx, la app usará los datos")
        print("de ejemplo incluidos en src/data/")
        sys.exit(1)

    docx_path = sys.argv[1]
    if not os.path.exists(docx_path):
        print(f"Error: No se encontró el archivo '{docx_path}'")
        sys.exit(1)

    drugs, categories, emergency_drugs, antidotes, iv_compat = parse_document(docx_path)

    # Ensure output directory exists
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Write output files
    files = {
        "drugs.json": drugs,
        "categories.json": categories,
        "emergency_drugs.json": emergency_drugs,
        "antidotes.json": antidotes,
        "iv_compatibilities.json": iv_compat,
    }

    for filename, data in files.items():
        output_path = OUTPUT_DIR / filename
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        if isinstance(data, list):
            count = len(data)
        elif isinstance(data, dict) and "unidades" in data:
            count = sum(len(u["capitulos"]) for u in data["unidades"])
        elif isinstance(data, dict) and "compatibilidades" in data:
            count = len(data["compatibilidades"])
        else:
            count = "?"

        print(f"✓ {filename}: {count} elementos → {output_path}")

    print(f"\n✅ Extracción completada:")
    print(f"   {len(drugs)} fármacos")
    print(f"   {len(categories['unidades'])} unidades")
    print(f"   {len(emergency_drugs)} fármacos de emergencia")
    print(f"   {len(antidotes)} antídotos")
    print(f"   {len(iv_compat.get('compatibilidades', []))} compatibilidades IV")


if __name__ == "__main__":
    main()
