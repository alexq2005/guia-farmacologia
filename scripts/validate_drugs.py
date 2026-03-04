#!/usr/bin/env python3
"""Validate drugs.json, categories.json, and pathologies.json for consistency."""

import json
import sys

VALID_ROUTES = {
    "oral", "IV", "IM", "SC", "sublingual", "topica", "rectal",
    "inhalatoria", "oftalmica", "otica", "nasal", "transdermica",
    "intratecal", "epidural", "vaginal", "intradermica"
}

VALID_PREGNANCY = {"A", "B", "C", "D", "X", "N/A"}

REQUIRED_DRUG_FIELDS = [
    "id", "nombre", "nombreGenerico", "nombresComerciales",
    "familia", "clasificacion", "mecanismoAccion",
    "indicaciones", "contraindicaciones", "efectosAdversos", "interacciones",
    "viaAdministracion", "dosis", "presentaciones",
    "embarazo", "lactancia", "cuidadosEnfermeria",
    "unidadId", "capituloId", "searchText"
]

def validate(drugs_path="src/data/drugs.json",
             categories_path="src/data/categories.json",
             pathologies_path="src/data/pathologies.json"):
    errors = []
    warnings = []

    with open(drugs_path, "r", encoding="utf-8") as f:
        drugs = json.load(f)
    with open(categories_path, "r", encoding="utf-8") as f:
        categories = json.load(f)
    with open(pathologies_path, "r", encoding="utf-8") as f:
        pathologies = json.load(f)

    drug_ids = set()
    drug_map = {}

    # --- Validate drugs ---
    print(f"Validating {len(drugs)} drugs...")
    for i, drug in enumerate(drugs):
        did = drug.get("id", f"<missing_id_at_index_{i}>")

        # Unique IDs
        if did in drug_ids:
            errors.append(f"Duplicate drug ID: '{did}'")
        drug_ids.add(did)
        drug_map[did] = drug

        # Required fields
        for field in REQUIRED_DRUG_FIELDS:
            if field not in drug:
                errors.append(f"Drug '{did}' missing required field: {field}")

        # Route validation
        for route in drug.get("viaAdministracion", []):
            if route not in VALID_ROUTES:
                errors.append(f"Drug '{did}' has invalid route: '{route}'")

        # Pregnancy validation
        emb = drug.get("embarazo")
        if emb and emb not in VALID_PREGNANCY:
            errors.append(f"Drug '{did}' has invalid embarazo: '{emb}'")

        # searchText non-empty
        st = drug.get("searchText", "")
        if not st or len(st.strip()) < 10:
            warnings.append(f"Drug '{did}' has empty/short searchText")

        # Dosis must have adulto
        dosis = drug.get("dosis", {})
        if not dosis.get("adulto"):
            warnings.append(f"Drug '{did}' missing dosis.adulto")

        # Arrays must be non-empty
        for arr_field in ["indicaciones", "contraindicaciones", "efectosAdversos",
                          "cuidadosEnfermeria", "presentaciones", "nombresComerciales"]:
            arr = drug.get(arr_field, [])
            if not arr:
                warnings.append(f"Drug '{did}' has empty {arr_field}")

    # --- Validate categories ---
    print(f"Validating categories...")
    cat_unit_ids = set()
    cat_chapter_ids = set()
    cat_drug_ids = set()

    for unit in categories.get("unidades", []):
        uid = unit["id"]
        cat_unit_ids.add(uid)
        for chapter in unit.get("capitulos", []):
            cid = chapter["id"]
            if cid in cat_chapter_ids:
                errors.append(f"Duplicate chapter ID: '{cid}'")
            cat_chapter_ids.add(cid)

            if chapter.get("unidadId") != uid:
                errors.append(f"Chapter '{cid}' has unidadId '{chapter.get('unidadId')}' but is in unit '{uid}'")

            for did in chapter.get("drugIds", []):
                cat_drug_ids.add(did)
                if did not in drug_ids:
                    errors.append(f"Chapter '{cid}' references non-existent drug: '{did}'")

    # Check drug unidadId/capituloId references
    for drug in drugs:
        did = drug.get("id", "?")
        uid = drug.get("unidadId", "")
        cid = drug.get("capituloId", "")
        if uid and uid not in cat_unit_ids:
            errors.append(f"Drug '{did}' references non-existent unit: '{uid}'")
        if cid and cid not in cat_chapter_ids:
            errors.append(f"Drug '{did}' references non-existent chapter: '{cid}'")

    # Check all drugs are in categories
    for did in drug_ids:
        if did not in cat_drug_ids:
            errors.append(f"Drug '{did}' is not referenced in any chapter in categories.json")

    # Check for drugs in categories that are NOT in their declared chapter
    for unit in categories.get("unidades", []):
        for chapter in unit.get("capitulos", []):
            for did in chapter.get("drugIds", []):
                if did in drug_map:
                    drug = drug_map[did]
                    if drug.get("capituloId") != chapter["id"]:
                        warnings.append(
                            f"Drug '{did}' is in chapter '{chapter['id']}' drugIds but has capituloId='{drug.get('capituloId')}'"
                        )

    # --- Validate pathologies ---
    print(f"Validating {len(pathologies)} pathologies...")
    for path in pathologies:
        pid = path.get("id", "?")
        for did in path.get("farmacosRelacionados", []):
            if did not in drug_ids:
                warnings.append(f"Pathology '{pid}' references non-existent drug: '{did}'")

    # --- Summary ---
    print(f"\n{'='*60}")
    print(f"VALIDATION RESULTS")
    print(f"{'='*60}")
    print(f"Total drugs: {len(drugs)}")
    print(f"Total units: {len(cat_unit_ids)}")
    print(f"Total chapters: {len(cat_chapter_ids)}")
    print(f"Total pathologies: {len(pathologies)}")
    print(f"")

    # Per-unit breakdown
    print("Per-unit drug counts:")
    for unit in categories.get("unidades", []):
        count = sum(len(ch.get("drugIds", [])) for ch in unit.get("capitulos", []))
        chapters = len(unit.get("capitulos", []))
        print(f"  {unit['id']} {unit['nombre']}: {count} drugs in {chapters} chapters")

    print(f"\nErrors: {len(errors)}")
    for e in errors:
        print(f"  ERROR: {e}")

    print(f"\nWarnings: {len(warnings)}")
    for w in warnings[:50]:  # Limit warning output
        print(f"  WARN: {w}")
    if len(warnings) > 50:
        print(f"  ... and {len(warnings) - 50} more warnings")

    return len(errors)

if __name__ == "__main__":
    err_count = validate()
    sys.exit(1 if err_count > 0 else 0)
