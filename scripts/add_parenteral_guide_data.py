#!/usr/bin/env python3
"""
Enrich drugs.json with Guía Son Espases parenteral administration fields.

Adds to each drug with preparacionParenteral:
  - solucionesCompatibles: inferred from dilucion text
  - medicamentoPeligroso: true for antineoplastics / hazardous drugs
  - proteccionPersonal: safety instructions for hazardous drugs
  - observaciones: extracted from existing fields if relevant

Usage:
    python scripts/add_parenteral_guide_data.py
"""

import json
import re
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DRUGS_PATH = os.path.join(SCRIPT_DIR, '..', 'src', 'data', 'drugs.json')

# Chapters / families that indicate hazardous drugs
HAZARDOUS_CHAPTERS = {'c12_05', 'c12_06'}
HAZARDOUS_FAMILY_KEYWORDS = [
    'antineopl', 'citotóx', 'citotox', 'antitumor',
]

# Standard protection instructions for hazardous drugs
STANDARD_PROTECTION = [
    "Usar doble guante de quimioterapia (cambiar cada 30 min)",
    "Bata desechable impermeable de manga larga con puños elásticos",
    "Protección ocular si riesgo de salpicadura",
    "Preparar en Cabina de Seguridad Biológica clase II tipo B2",
    "Usar sistemas cerrados de transferencia (CSTD)",
    "Purgar línea con solución compatible antes de conectar al paciente",
    "Desechar en contenedores específicos para citotóxicos",
]


def is_hazardous(drug):
    """Determine if a drug is hazardous based on chapter and family."""
    cap = drug.get('capituloId', '')
    if cap in HAZARDOUS_CHAPTERS:
        return True
    familia = drug.get('familia', '').lower()
    return any(kw in familia for kw in HAZARDOUS_FAMILY_KEYWORDS)


def infer_ssf_compatibility(dilucion):
    """Infer SSF (NaCl 0.9%) compatibility from dilucion text."""
    if not dilucion:
        return None
    text = dilucion.lower()

    # Negative patterns first (more specific)
    neg_patterns = [
        r'no\s+(en\s+)?sf', r'no\s+(en\s+)?ssf', r'no\s+(en\s+)?nacl',
        r'no\s+diluir\s+en\s+s(s)?f', r'no\s+diluir\s+en\s+nacl',
        r'no\s+(en\s+)?salino', r'no\s+(en\s+)?fisiológ',
        r'incompatible\s+con\s+s(s)?f', r'incompatible\s+con\s+nacl',
        r'precipita\s+en\s+s(s)?f', r'precipita\s+en\s+nacl',
        r'no\s+usar\s+s(s)?f', r'no\s+usar\s+nacl',
        r'evitar\s+s(s)?f',
    ]
    for pat in neg_patterns:
        if re.search(pat, text):
            return False

    # Conditional patterns
    cond_patterns = [
        (r'solo\s+en\s+s(s)?f', 'Solo en SSF'),
        (r'solo\s+s(s)?f', 'Solo en SSF'),
        (r'únicamente\s+.*s(s)?f', 'Únicamente en SSF'),
        (r'preferiblemente\s+.*s(s)?f', 'Preferiblemente en SSF'),
    ]
    for pat, label in cond_patterns:
        if re.search(pat, text):
            return label

    # Positive patterns
    pos_patterns = [
        r'\bsf\b', r'\bssf\b', r'\bnacl\b', r'salino', r'fisiológ',
        r'suero\s+fisiológ', r'cloruro\s+de?\s+sodio', r'cloruro\s+sódico',
    ]
    for pat in pos_patterns:
        if re.search(pat, text):
            return True

    return None


def infer_sg5_compatibility(dilucion):
    """Infer SG5% (dextrose 5%) compatibility from dilucion text."""
    if not dilucion:
        return None
    text = dilucion.lower()

    # Negative patterns
    neg_patterns = [
        r'no\s+(en\s+)?sg', r'no\s+(en\s+)?glucosa', r'no\s+(en\s+)?dextrosa',
        r'no\s+(en\s+)?glucosado', r'no\s+diluir\s+en\s+sg',
        r'incompatible\s+con\s+sg', r'incompatible\s+con\s+glucosa',
        r'precipita\s+en\s+sg', r'precipita\s+en\s+glucosa',
        r'no\s+usar\s+sg', r'evitar\s+sg', r'evitar\s+glucosa',
        r'evitar\s+dextrosa', r'evitar.*soluciones?\s+glucosada',
    ]
    for pat in neg_patterns:
        if re.search(pat, text):
            return False

    # Conditional
    cond_patterns = [
        (r'solo\s+en\s+sg', 'Solo en SG5%'),
        (r'solo\s+sg', 'Solo en SG5%'),
        (r'solo\s+(en\s+)?glucosa', 'Solo en glucosa'),
        (r'preferiblemente\s+.*sg', 'Preferiblemente en SG5%'),
        (r'preferiblemente\s+.*glucosa', 'Preferiblemente en glucosa'),
    ]
    for pat, label in cond_patterns:
        if re.search(pat, text):
            return label

    # Positive
    pos_patterns = [
        r'\bsg\s*5\b', r'\bsg5\b', r'glucosa\s*5', r'dextrosa\s*5',
        r'glucosado', r'suero\s+glucosado',
    ]
    for pat in pos_patterns:
        if re.search(pat, text):
            return True

    return None


def extract_observations(drug):
    """Extract additional observations from existing fields."""
    pp = drug.get('preparacionParenteral', {})
    obs_parts = []

    # Check for light protection hints
    for field in ['estabilidad', 'dilucion', 'reconstitucion']:
        text = pp.get(field, '').lower()
        if 'luz' in text and 'proteger' in text:
            obs_parts.append('Proteger de la luz durante preparación y administración.')
            break

    # Check for filter requirements
    for field in ['velocidadAdministracion', 'dilucion']:
        text = pp.get(field, '').lower()
        if 'filtro' in text:
            obs_parts.append('Requiere filtro en línea (ver detalles en dilución/administración).')
            break

    # Check for PVC incompatibility
    for field in ['estabilidad', 'dilucion']:
        text = pp.get(field, '').lower()
        if 'pvc' in text or 'plástico' in text:
            obs_parts.append('Posible interacción con materiales plásticos (PVC). Consultar compatibilidad de equipo.')
            break

    return ' '.join(obs_parts) if obs_parts else None


def enrich_drug(drug):
    """Add Son Espases guide fields to a drug's preparacionParenteral."""
    pp = drug.get('preparacionParenteral')
    if not pp:
        return False

    modified = False
    dilucion = pp.get('dilucion', '')

    # 1. Soluciones compatibles
    if 'solucionesCompatibles' not in pp:
        ssf = infer_ssf_compatibility(dilucion)
        sg5 = infer_sg5_compatibility(dilucion)
        if ssf is not None or sg5 is not None:
            compat = {}
            if ssf is not None:
                compat['ssf'] = ssf
            if sg5 is not None:
                compat['sg5'] = sg5
            pp['solucionesCompatibles'] = compat
            modified = True

    # 2. Medicamento peligroso
    if 'medicamentoPeligroso' not in pp:
        if is_hazardous(drug):
            pp['medicamentoPeligroso'] = True
            modified = True

    # 3. Protección personal (for hazardous drugs)
    if 'proteccionPersonal' not in pp:
        if pp.get('medicamentoPeligroso') or is_hazardous(drug):
            pp['proteccionPersonal'] = STANDARD_PROTECTION
            pp['medicamentoPeligroso'] = True  # ensure flag is set
            modified = True

    # 4. Observaciones
    if 'observaciones' not in pp:
        obs = extract_observations(drug)
        if obs:
            pp['observaciones'] = obs
            modified = True

    return modified


def main():
    print(f"Loading drugs from: {os.path.abspath(DRUGS_PATH)}")
    with open(DRUGS_PATH, 'r', encoding='utf-8') as f:
        drugs = json.load(f)

    total = len(drugs)
    with_pp = sum(1 for d in drugs if d.get('preparacionParenteral'))
    modified_count = 0
    hazardous_count = 0
    ssf_count = 0
    sg5_count = 0

    for drug in drugs:
        if enrich_drug(drug):
            modified_count += 1

        pp = drug.get('preparacionParenteral', {})
        if pp.get('medicamentoPeligroso'):
            hazardous_count += 1
        sc = pp.get('solucionesCompatibles', {})
        if sc.get('ssf') is not None:
            ssf_count += 1
        if sc.get('sg5') is not None:
            sg5_count += 1

    with open(DRUGS_PATH, 'w', encoding='utf-8') as f:
        json.dump(drugs, f, ensure_ascii=False, indent=2)

    print(f"\n=== Enrichment Summary ===")
    print(f"Total drugs:                {total}")
    print(f"With preparacionParenteral: {with_pp}")
    print(f"Modified:                   {modified_count}")
    print(f"Hazardous flagged:          {hazardous_count}")
    print(f"SSF compatibility inferred: {ssf_count}")
    print(f"SG5% compatibility inferred:{sg5_count}")
    print(f"\nDone! File saved to: {os.path.abspath(DRUGS_PATH)}")


if __name__ == '__main__':
    main()
