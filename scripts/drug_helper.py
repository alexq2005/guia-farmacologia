#!/usr/bin/env python3
"""Helper functions for drug generation scripts."""

import json
import unicodedata
import re

def strip_accents(s):
    """Remove accents from string for searchText generation."""
    nfkd = unicodedata.normalize('NFKD', s)
    return ''.join(c for c in nfkd if not unicodedata.combining(c))

def make_search_text(drug):
    """Generate searchText from drug fields."""
    parts = [
        drug["nombre"],
        drug["nombreGenerico"],
        " ".join(drug["nombresComerciales"]),
        drug["familia"],
        drug["clasificacion"],
        " ".join(drug["indicaciones"]),
    ]
    text = " ".join(parts).lower()
    text = strip_accents(text)
    # Remove duplicate spaces
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def load_drugs(path="src/data/drugs.json"):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def save_drugs(drugs, path="src/data/drugs.json"):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(drugs, f, ensure_ascii=False, indent=2)

def load_categories(path="src/data/categories.json"):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def save_categories(cats, path="src/data/categories.json"):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(cats, f, ensure_ascii=False, indent=2)

def load_pathologies(path="src/data/pathologies.json"):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def save_pathologies(pats, path="src/data/pathologies.json"):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(pats, f, ensure_ascii=False, indent=2)

def add_drugs_to_file(new_drugs, drug_path="src/data/drugs.json"):
    """Add new drugs to drugs.json, skipping duplicates."""
    existing = load_drugs(drug_path)
    existing_ids = {d["id"] for d in existing}
    added = 0
    for drug in new_drugs:
        if drug["id"] in existing_ids:
            print(f"  SKIP (exists): {drug['id']}")
            continue
        drug["searchText"] = make_search_text(drug)
        existing.append(drug)
        existing_ids.add(drug["id"])
        added += 1
    save_drugs(existing, drug_path)
    print(f"  Added {added} new drugs (total: {len(existing)})")
    return added

def add_chapter(categories, unit_id, chapter):
    """Add a new chapter to a unit in categories, or update drugIds if chapter exists."""
    for unit in categories["unidades"]:
        if unit["id"] == unit_id:
            for existing_ch in unit["capitulos"]:
                if existing_ch["id"] == chapter["id"]:
                    # Merge drug IDs
                    existing_set = set(existing_ch["drugIds"])
                    for did in chapter["drugIds"]:
                        if did not in existing_set:
                            existing_ch["drugIds"].append(did)
                    return
            unit["capitulos"].append(chapter)
            return
    print(f"  WARNING: unit {unit_id} not found")

def add_drug_to_chapter(categories, chapter_id, drug_id):
    """Add a drug ID to an existing chapter."""
    for unit in categories["unidades"]:
        for ch in unit["capitulos"]:
            if ch["id"] == chapter_id:
                if drug_id not in ch["drugIds"]:
                    ch["drugIds"].append(drug_id)
                return
    print(f"  WARNING: chapter {chapter_id} not found for drug {drug_id}")

def add_drug_to_pathology(pathologies, pathology_id, drug_id):
    """Add a drug to a pathology's farmacosRelacionados."""
    for pat in pathologies:
        if pat["id"] == pathology_id:
            if drug_id not in pat["farmacosRelacionados"]:
                pat["farmacosRelacionados"].append(drug_id)
            return
