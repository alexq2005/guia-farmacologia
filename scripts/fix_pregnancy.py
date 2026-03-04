#!/usr/bin/env python3
"""Fix invalid embarazo values in drugs.json.
Extracts the primary (most restrictive) category letter and moves
descriptive notes to cuidadosEnfermeria."""

import json
import re

# Map specific known values to their correct category
PREGNANCY_FIX = {
    "C (1er-2do trimestre), D (3er trimestre)": ("D", "Embarazo: categoría C en 1er-2do trimestre, D en 3er trimestre. Evitar en tercer trimestre"),
    "C (dosis bajas 1er-2do trimestre), D (3er trimestre)": ("D", "Embarazo: categoría C en dosis bajas 1er-2do trimestre, D en 3er trimestre"),
    "B (evitar a término)": ("B", "Embarazo: categoría B, evitar a término"),
    "C (D en primer trimestre y a término)": ("D", "Embarazo: categoría C general, D en primer trimestre y a término"),
    "A (tópica), B (oral)": ("A", "Embarazo: categoría A tópica, B oral"),
    "D (primer trimestre: teratogénico. Preferir propiltiouracilo en 1er trimestre)": ("D", "Embarazo: teratogénico en primer trimestre. Preferir propiltiouracilo en 1er trimestre"),
    "B (2do-3er trimestre)": ("B", "Embarazo: categoría B en 2do-3er trimestre"),
    "B (contraindicado a término)": ("B", "Embarazo: categoría B, contraindicado a término"),
    "C (evitar)": ("C", None),
    "D (tercer trimestre)": ("D", "Embarazo: categoría D en tercer trimestre"),
    "D (evitar en 2°-3° trimestre)": ("D", "Embarazo: categoría D, evitar en 2°-3° trimestre"),
    "B (en indicaciones obstétricas)": ("B", None),
    "X (antes del alumbramiento)": ("X", "Embarazo: categoría X antes del alumbramiento"),
    "A (dosis fisiológicas)": ("A", None),
    "Compatible (segura en LES, CONTINUAR en embarazo)": ("B", "Embarazo: compatible, segura en LES. Continuar en embarazo"),
    "D (pero se usa en trasplante si necesario)": ("D", "Embarazo: categoría D, pero se usa en trasplante si necesario"),
    "No aplica (uso masculino)": ("N/A", None),
    "No hay datos suficientes": ("N/A", None),
}

VALID = {"A", "B", "C", "D", "X", "N/A"}

def fix(drugs):
    fixes = 0
    for drug in drugs:
        emb = drug.get("embarazo", "")
        if emb in VALID:
            continue
        if emb in PREGNANCY_FIX:
            cat, note = PREGNANCY_FIX[emb]
            drug["embarazo"] = cat
            if note:
                cuidados = drug.get("cuidadosEnfermeria", [])
                if note not in cuidados:
                    cuidados.append(note)
                    drug["cuidadosEnfermeria"] = cuidados
            fixes += 1
            print(f"  Fixed {drug['id']}: '{emb}' -> '{cat}'")
        else:
            print(f"  UNKNOWN: {drug['id']}: '{emb}'")
    return fixes

def main():
    path = "src/data/drugs.json"
    with open(path, "r", encoding="utf-8") as f:
        drugs = json.load(f)
    fixes = fix(drugs)
    print(f"\nFixed {fixes} invalid embarazo values")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(drugs, f, ensure_ascii=False, indent=2)
    print("Saved.")

if __name__ == "__main__":
    main()
