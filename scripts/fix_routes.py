#!/usr/bin/env python3
"""Fix invalid viaAdministracion values in drugs.json."""

import json
import sys

ROUTE_MAP = {
    "intravenoso": "IV",
    "intramuscular": "IM",
    "subcutánea": "SC",
    "subcutanea": "SC",
    "transdérmico": "transdermica",
    "transdermico": "transdermica",
    "nebulizado": "inhalatoria",
    "intranasal": "nasal",
    "tópica": "topica",
    "oftálmica": "oftalmica",
}

def fix_routes(drugs):
    fixes = 0
    for drug in drugs:
        new_routes = []
        for route in drug.get("viaAdministracion", []):
            if route in ROUTE_MAP:
                new_routes.append(ROUTE_MAP[route])
                fixes += 1
                print(f"  Fixed {drug['id']}: '{route}' -> '{ROUTE_MAP[route]}'")
            else:
                new_routes.append(route)
        drug["viaAdministracion"] = new_routes
    return fixes

def main():
    path = "src/data/drugs.json"
    with open(path, "r", encoding="utf-8") as f:
        drugs = json.load(f)

    print(f"Loaded {len(drugs)} drugs")
    fixes = fix_routes(drugs)
    print(f"\nFixed {fixes} invalid route values")

    with open(path, "w", encoding="utf-8") as f:
        json.dump(drugs, f, ensure_ascii=False, indent=2)
    print("Saved updated drugs.json")

if __name__ == "__main__":
    main()
