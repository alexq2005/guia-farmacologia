#!/usr/bin/env python3
"""Add preparacionParenteral to the final 13 drugs."""
import json, os

BASE = os.path.join(os.path.dirname(__file__), '..', 'src', 'data')

FINAL_PARENTERAL = {
    "ustekinumab": {
        "dilucion": "IV: diluir en 250 mL de SF 0.9%. SC: sin dilución (jeringa precargada).",
        "volumenAdministracion": "250 mL (IV) o 0.5-1 mL (SC)",
        "velocidadAdministracion": "IV: infundir en al menos 1 hora. SC: inyectar en muslo, abdomen o brazo.",
        "estabilidad": "Refrigerar 2-8°C. Diluido IV: 4h a temperatura ambiente. No congelar."
    },
    "isavuconazol": {
        "reconstitucion": "Reconstituir con 5 mL de agua estéril.",
        "dilucion": "Diluir en 250 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "250 mL",
        "velocidadAdministracion": "Infundir en al menos 1 hora. No administrar en bolo. Usar filtro en línea 0.2-1.2 micras.",
        "estabilidad": "Reconstituido: 1h. Diluido: 6h a temperatura ambiente, 24h refrigerado."
    },
    "paliperidona": {
        "volumenAdministracion": "Jeringa precargada: variable según dosis (deltoides: aguja 1 pulgada, glúteo: 1.5 pulgadas)",
        "velocidadAdministracion": "IM profunda. Inicio: 150 mg deltoides día 1 + 100 mg deltoides día 8. Luego mensual en deltoides o glúteo.",
        "estabilidad": "Almacenar a temperatura ambiente. Agitar vigorosamente 10 seg antes de inyectar."
    },
    "efedrina": {
        "dilucion": "Puede administrarse sin diluir o diluir en 10 mL de SF 0.9%.",
        "volumenAdministracion": "1-2 mL (bolo)",
        "velocidadAdministracion": "IV lenta: 5-10 mg en bolo, puede repetir cada 3-5 min. Máx 50 mg. Monitorizar PA y FC.",
        "estabilidad": "Almacenar a temperatura ambiente. Proteger de la luz."
    },
    "dipiridamol": {
        "dilucion": "Diluir en 20-50 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "20-50 mL",
        "velocidadAdministracion": "Infundir en 4 min (test de estrés farmacológico). Tener aminofilina disponible como antídoto.",
        "estabilidad": "Diluido: usar dentro de 24h. No mezclar con otros fármacos."
    },
    "andexanet": {
        "reconstitucion": "Reconstituir cada vial de 200 mg con 20 mL de agua estéril.",
        "dilucion": "No requiere dilución adicional tras reconstitución.",
        "volumenAdministracion": "Dosis baja: 400 mg bolo + 480 mg infusión. Dosis alta: 800 mg bolo + 960 mg infusión.",
        "velocidadAdministracion": "Bolo IV: 15-30 mg/min. Infusión: 4-8 mg/min durante 120 min.",
        "estabilidad": "Reconstituido: 8h refrigerado o 2h a temperatura ambiente."
    },
    "docetaxel": {
        "dilucion": "Diluir en 250-500 mL de SF 0.9% o SG 5%. Concentración final <0.74 mg/mL.",
        "volumenAdministracion": "250-500 mL",
        "velocidadAdministracion": "Infundir en 1 hora. Premedicación con corticoides obligatoria. No usar envases PVC.",
        "estabilidad": "Diluido: 6h a temperatura ambiente (incluido tiempo de infusión). Proteger de la luz."
    },
    "abciximab": {
        "dilucion": "Para infusión: diluir en 250 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "Bolo: 5 mL, Infusión: 250 mL",
        "velocidadAdministracion": "Bolo IV: 0.25 mg/kg en 1 min. Infusión: 0.125 mcg/kg/min (máx 10 mcg/min) por 12h.",
        "estabilidad": "Diluido: 24h refrigerado. Usar filtro 0.2-0.22 micras."
    },
    "eptifibatida": {
        "dilucion": "Solución lista para infusión (0.75 mg/mL o 2 mg/mL). No requiere dilución.",
        "volumenAdministracion": "Bolo: 10 mL. Infusión: 100 mL vial.",
        "velocidadAdministracion": "Bolo IV: 180 mcg/kg en 1-2 min. Infusión: 2 mcg/kg/min hasta 72h.",
        "estabilidad": "Almacenar refrigerado. A temperatura ambiente: estable. Proteger de la luz."
    },
    "tirofiban": {
        "dilucion": "Solución premezclada lista para infusión (50 mcg/mL). No requiere dilución.",
        "volumenAdministracion": "250-500 mL (bolsa premezclada)",
        "velocidadAdministracion": "Carga: 25 mcg/kg en 3 min. Mantenimiento: 0.15 mcg/kg/min hasta 18-24h post-procedimiento.",
        "estabilidad": "Almacenar a temperatura ambiente. Proteger de la luz y congelación."
    },
    "estreptoquinasa": {
        "reconstitucion": "Reconstituir 1.5 MUI con 5 mL de SF 0.9% (rotar suavemente, no agitar).",
        "dilucion": "Diluir en 100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "IAM: 1.5 MUI en 60 min. TEP: 250,000 UI en 30 min, luego 100,000 UI/h por 24h.",
        "estabilidad": "Reconstituido: 8h refrigerado. Espumoso al inicio, dejar reposar."
    },
    "reteplasa": {
        "reconstitucion": "Reconstituir 10 U con 10 mL de agua estéril (usar aguja incluida).",
        "volumenAdministracion": "10 mL por bolo",
        "velocidadAdministracion": "Bolo IV doble: 10 U en 2 min, repetir segunda dosis de 10 U a los 30 min.",
        "estabilidad": "Reconstituido: usar inmediatamente. No agitar."
    },
    "urokinasa": {
        "reconstitucion": "Reconstituir con 5 mL de agua estéril sin conservantes.",
        "dilucion": "Diluir en SF 0.9% según protocolo.",
        "volumenAdministracion": "Variable según indicación",
        "velocidadAdministracion": "TEP: 4,400 UI/kg en 10 min, luego 4,400 UI/kg/h por 12h. Catéter ocluido: instilación local.",
        "estabilidad": "Reconstituido: 24h refrigerado."
    }
}

with open(os.path.join(BASE, 'drugs.json'), 'r', encoding='utf-8') as f:
    drugs = json.load(f)

count = 0
for drug in drugs:
    if drug['id'] in FINAL_PARENTERAL and 'preparacionParenteral' not in drug:
        drug['preparacionParenteral'] = FINAL_PARENTERAL[drug['id']]
        count += 1

with open(os.path.join(BASE, 'drugs.json'), 'w', encoding='utf-8') as f:
    json.dump(drugs, f, ensure_ascii=False, indent=2)

print(f"Datos parenterales agregados a {count} fármacos.")

# Verificación final
parenteral_routes = {'IV', 'IM', 'SC', 'intratecal', 'epidural'}
total_parenteral = sum(1 for d in drugs if set(d.get('viaAdministracion', [])) & parenteral_routes)
has_pp = sum(1 for d in drugs if 'preparacionParenteral' in d)
missing = sum(1 for d in drugs if set(d.get('viaAdministracion', [])) & parenteral_routes and 'preparacionParenteral' not in d)
print(f"\n=== ESTADÍSTICAS FINALES ===")
print(f"Total fármacos: {len(drugs)}")
print(f"Fármacos con rutas parenterales: {total_parenteral}")
print(f"Fármacos con preparaciónParenteral: {has_pp}")
print(f"Sin datos aún: {missing}")
print(f"Cobertura: {has_pp}/{total_parenteral} = {has_pp/total_parenteral*100:.1f}%")
