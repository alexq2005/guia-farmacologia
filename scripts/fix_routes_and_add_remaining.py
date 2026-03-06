#!/usr/bin/env python3
"""Fix non-standard route names and add remaining 8 parenteral preparations."""
import json, os

BASE = os.path.join(os.path.dirname(__file__), '..', 'src', 'data')

# Route name mapping: non-standard -> standard (matching RouteOfAdministration type)
ROUTE_FIX = {
    "intravenosa": "IV",
    "intramuscular": "IM",
    "subcutanea": "SC",
    "subcutánea": "SC",
}

# Remaining 8 drugs that need parenteral data
REMAINING_PARENTERAL = {
    "carboprost": {
        "volumenAdministracion": "1 mL (250 mcg/mL)",
        "velocidadAdministracion": "IM profunda. No administrar IV. Dosis: 250 mcg cada 15-90 min. Máx 8 dosis.",
        "estabilidad": "Refrigerar 2-8°C. Dejar alcanzar temperatura ambiente antes de inyectar."
    },
    "etonogestrel_implante": {
        "volumenAdministracion": "Implante subdérmico (68 mg en varilla de 4 cm)",
        "velocidadAdministracion": "SC subdérmica: insertar en cara interna del brazo no dominante con aplicador específico.",
        "estabilidad": "Almacenar a temperatura ambiente. Efectivo por 3 años."
    },
    "ibandronato": {
        "dilucion": "Administrar sin diluir (jeringa precargada de 3 mg/3 mL).",
        "volumenAdministracion": "3 mL",
        "velocidadAdministracion": "IV en 15-30 segundos. Cada 3 meses. Asegurar hidratación adecuada.",
        "estabilidad": "Almacenar a temperatura ambiente. Proteger de la luz."
    },
    "orfenadrina": {
        "dilucion": "IV: diluir en 50-100 mL de SF 0.9%. IM: sin dilución.",
        "volumenAdministracion": "2 mL (IM) o 50-100 mL (IV)",
        "velocidadAdministracion": "IV lenta: infundir en 5-10 min. IM profunda.",
        "estabilidad": "Almacenar a temperatura ambiente. No mezclar con otros fármacos."
    },
    "certolizumab": {
        "volumenAdministracion": "Jeringa precargada: 1 mL (200 mg)",
        "velocidadAdministracion": "SC: inyectar en muslo o abdomen. Rotar sitios. Dejar temperar 30 min.",
        "estabilidad": "Refrigerar 2-8°C. No congelar. Proteger de la luz."
    },
    "golimumab": {
        "dilucion": "IV: diluir en 100 mL de SF 0.9%. SC: sin dilución (pluma precargada).",
        "volumenAdministracion": "100 mL (IV) o 0.5-1 mL (SC)",
        "velocidadAdministracion": "IV: infundir en 30 min. SC: autoinyector en abdomen o muslo.",
        "estabilidad": "Refrigerar 2-8°C. No congelar. A temp ambiente: 30 min antes de administrar."
    },
    "abatacept": {
        "reconstitucion": "Reconstituir con 10 mL de agua estéril usando jeringa sin silicona.",
        "dilucion": "Diluir en 100 mL de SF 0.9%.",
        "volumenAdministracion": "100 mL (IV) o 1 mL (SC precargada)",
        "velocidadAdministracion": "IV: infundir en 30 min con filtro 0.2-1.2 micras. SC: semanal.",
        "estabilidad": "Reconstituido: 24h refrigerado. Diluido: usar dentro de 24h."
    },
    "piridoxina_antidoto": {
        "dilucion": "Diluir en 50-100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "50-100 mL",
        "velocidadAdministracion": "IV: infundir en 15-30 min. Para intoxicación por isoniazida: 1 g por cada g de isoniazida ingerida.",
        "estabilidad": "Diluido: usar dentro de 24h. Proteger de la luz."
    }
}

# Load drugs
with open(os.path.join(BASE, 'drugs.json'), 'r', encoding='utf-8') as f:
    drugs = json.load(f)

# Fix route names
routes_fixed = 0
drugs_fixed = 0
for drug in drugs:
    changed = False
    new_routes = []
    for r in drug.get('viaAdministracion', []):
        if r in ROUTE_FIX:
            new_routes.append(ROUTE_FIX[r])
            routes_fixed += 1
            changed = True
        else:
            new_routes.append(r)
    if changed:
        drug['viaAdministracion'] = new_routes
        drugs_fixed += 1

# Add remaining parenteral data
pp_added = 0
for drug in drugs:
    if drug['id'] in REMAINING_PARENTERAL and 'preparacionParenteral' not in drug:
        drug['preparacionParenteral'] = REMAINING_PARENTERAL[drug['id']]
        pp_added += 1

# Save
with open(os.path.join(BASE, 'drugs.json'), 'w', encoding='utf-8') as f:
    json.dump(drugs, f, ensure_ascii=False, indent=2)

print(f"Fixed {routes_fixed} route names across {drugs_fixed} drugs")
print(f"Added preparacionParenteral to {pp_added} remaining drugs")

# Final verification
parenteral_routes = {'IV', 'IM', 'SC', 'intratecal', 'epidural'}
total_parenteral = sum(1 for d in drugs if set(d.get('viaAdministracion', [])) & parenteral_routes)
has_pp = sum(1 for d in drugs if 'preparacionParenteral' in d)
missing = sum(1 for d in drugs if set(d.get('viaAdministracion', [])) & parenteral_routes and 'preparacionParenteral' not in d)
print(f"\n=== FINAL STATS ===")
print(f"Total drugs: {len(drugs)}")
print(f"Drugs with parenteral routes: {total_parenteral}")
print(f"Drugs with preparacionParenteral: {has_pp}")
print(f"Still missing: {missing}")
print(f"Coverage: {has_pp}/{total_parenteral} = {has_pp/total_parenteral*100:.1f}%")
