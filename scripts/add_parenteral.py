#!/usr/bin/env python3
"""Add preparacionParenteral to existing drugs with IV/IM/SC routes."""
import json
import os

DRUGS_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'drugs.json')

# Clinically accurate parenteral preparation data keyed by drug ID
PARENTERAL_DATA = {
    # ── Analgésicos ──
    "paracetamol": {
        "reconstitucion": "No requiere. Solución lista para uso.",
        "dilucion": "No diluir. Administrar directamente del vial de 100 mL (10 mg/mL).",
        "volumenAdministracion": "100 mL (1 g) o 50 mL (500 mg)",
        "velocidadAdministracion": "Infundir en 15 minutos. No administrar en bolo.",
        "estabilidad": "No refrigerar. Usar dentro de las 6h tras apertura."
    },
    "morfina": {
        "reconstitucion": "No requiere para ampollas de solución.",
        "dilucion": "Diluir en 100 mL de SF 0.9% para infusión continua. Bolo: diluir hasta 1-2 mg/mL con SF.",
        "volumenAdministracion": "Bolo IV: 1-5 mL. Infusión: 100 mL.",
        "velocidadAdministracion": "Bolo IV lento en 4-5 min. Infusión: 1-5 mg/h según respuesta.",
        "estabilidad": "Solución diluida estable 24h a temperatura ambiente. Proteger de la luz."
    },
    "tramadol": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir 100 mg en 100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "Infundir en 20-30 minutos. No administrar en bolo IV rápido.",
        "estabilidad": "Usar inmediatamente tras dilución."
    },
    "fentanilo": {
        "reconstitucion": "No requiere.",
        "dilucion": "Bolo: sin diluir o diluir en 5 mL de SF. Infusión: diluir en 250 mL de SF 0.9%.",
        "volumenAdministracion": "Bolo: 1-2 mL. Infusión: 250 mL.",
        "velocidadAdministracion": "Bolo IV en 1-2 min. Infusión: 25-200 mcg/h.",
        "estabilidad": "Solución diluida estable 24h a temperatura ambiente."
    },
    "nalbufina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Puede administrarse sin diluir IV/IM/SC.",
        "volumenAdministracion": "1-2 mL por dosis",
        "velocidadAdministracion": "IV lento en 3-5 minutos.",
        "estabilidad": "Conservar a temperatura ambiente."
    },
    "metadona": {
        "reconstitucion": "No requiere para solución inyectable.",
        "dilucion": "Puede diluir en SF 0.9% para infusión.",
        "volumenAdministracion": "IM/SC: 1-2 mL",
        "velocidadAdministracion": "IM o SC. IV no recomendado rutinariamente.",
        "estabilidad": "Conservar a temperatura ambiente protegido de la luz."
    },
    "hidromorfona": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en 5 mL de SF 0.9% para bolo IV.",
        "volumenAdministracion": "Bolo: 5 mL. PCA: según protocolo.",
        "velocidadAdministracion": "IV lento en 2-3 minutos.",
        "estabilidad": "Solución estable 24h a temperatura ambiente."
    },
    "meperidina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir hasta 10 mg/mL con SF 0.9% para IV.",
        "volumenAdministracion": "5-10 mL",
        "velocidadAdministracion": "IV lento, no exceder 25 mg/min.",
        "estabilidad": "Usar inmediatamente tras dilución."
    },
    "sufentanilo": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en SF 0.9% según protocolo anestésico.",
        "volumenAdministracion": "Según dosis calculada",
        "velocidadAdministracion": "Bolo IV lento o infusión continua según anestesiólogo.",
        "estabilidad": "Estable 24h diluido en SF."
    },
    "alfentanilo": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en SF 0.9% o SG 5% para infusión.",
        "volumenAdministracion": "Según protocolo anestésico",
        "velocidadAdministracion": "Bolo IV en 90 segundos. Infusión: 0.5-3 mcg/kg/min.",
        "estabilidad": "Estable 24h a temperatura ambiente diluido."
    },
    # ── Anestésicos ──
    "lidocaina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Antiarrítmico: diluir en 250 mL de SG 5%. Anestesia local: sin diluir.",
        "volumenAdministracion": "Bolo: 5-10 mL. Infusión: 250 mL.",
        "velocidadAdministracion": "Bolo IV en 2 min (1-1.5 mg/kg). Infusión: 1-4 mg/min.",
        "estabilidad": "Solución estable 24h a temperatura ambiente."
    },
    "ketamina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en 100-250 mL de SF 0.9% o SG 5% para infusión.",
        "volumenAdministracion": "Bolo: 1-2 mL. Infusión: 100-250 mL.",
        "velocidadAdministracion": "Inducción: 1-2 mg/kg IV en 60 seg. Sedación: 0.1-0.5 mg/kg IV lento.",
        "estabilidad": "Diluida: 24h a temperatura ambiente. No mezclar con barbitúricos."
    },
    "midazolam": {
        "reconstitucion": "No requiere.",
        "dilucion": "Puede diluir en SF 0.9% o SG 5%. Concentración: 0.5 mg/mL para infusión.",
        "volumenAdministracion": "Bolo: 1-3 mL. Infusión: 50-100 mL.",
        "velocidadAdministracion": "Sedación: 0.5-2 mg IV en 2 min. Infusión: 0.02-0.1 mg/kg/h.",
        "estabilidad": "Diluido estable 24h. Proteger de la luz."
    },
    # ── Anticonvulsivantes ──
    "diazepam": {
        "reconstitucion": "No requiere.",
        "dilucion": "NO diluir (precipita). Administrar directamente.",
        "volumenAdministracion": "1-2 mL por dosis (5-10 mg)",
        "velocidadAdministracion": "IV lento: máx 5 mg/min en adultos, 1-2 mg/min en ancianos.",
        "estabilidad": "No mezclar con otros fármacos. Absorción en plástico PVC."
    },
    "fenitoina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir SOLO en SF 0.9% (precipita en SG 5%). Concentración máx: 6.7 mg/mL.",
        "volumenAdministracion": "250-500 mL de SF 0.9%",
        "velocidadAdministracion": "Máx 50 mg/min en adultos, 25 mg/min en ancianos. Monitorizar ECG.",
        "estabilidad": "Usar dentro de 1h tras dilución. Usar filtro en línea 0.22 micras."
    },
    "levetiracetam": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir dosis en 100 mL de SF 0.9%, SG 5% o Ringer Lactato.",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "Infundir en 15 minutos.",
        "estabilidad": "Diluido estable 24h a temperatura ambiente."
    },
    "acido_valproico": {
        "reconstitucion": "Reconstituir vial con el diluyente proporcionado.",
        "dilucion": "Diluir en 50-100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "50-100 mL",
        "velocidadAdministracion": "Infundir en 60 minutos. Máx: 20 mg/min.",
        "estabilidad": "Estable 24h tras reconstitución a temperatura ambiente."
    },
    "lacosamida": {
        "reconstitucion": "No requiere. Solución lista.",
        "dilucion": "Puede diluir en SF 0.9%, SG 5% o Ringer Lactato.",
        "volumenAdministracion": "Vial de 20 mL (200 mg) o diluido en 100 mL",
        "velocidadAdministracion": "Infundir en 15-60 minutos.",
        "estabilidad": "Diluido estable 24h a temperatura ambiente."
    },
    "fenobarbital": {
        "reconstitucion": "No requiere para solución inyectable.",
        "dilucion": "Puede diluir en SF 0.9% o SG 5%.",
        "volumenAdministracion": "Según dosis",
        "velocidadAdministracion": "IV lento: máx 60 mg/min en adultos, 30 mg/min en niños.",
        "estabilidad": "Usar inmediatamente tras apertura."
    },
    "lorazepam": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en igual volumen de SF 0.9% o agua estéril antes de IV.",
        "volumenAdministracion": "2-4 mL",
        "velocidadAdministracion": "IV lento: máx 2 mg/min.",
        "estabilidad": "Refrigerar ampollas. Usar dentro de 24h tras dilución."
    },
    # ── Antiparkinsonianos ──
    "apomorfina": {
        "reconstitucion": "No requiere.",
        "dilucion": "No diluir para SC. Para infusión SC: diluir en SF 0.9%.",
        "volumenAdministracion": "SC: 0.2-0.6 mL por dosis",
        "velocidadAdministracion": "SC: inyección rápida. Infusión SC: 1-4 mg/h.",
        "estabilidad": "Proteger de la luz. Descartar si cambia de color."
    },
    # ── Antipsicóticos ──
    "haloperidol": {
        "reconstitucion": "No requiere.",
        "dilucion": "Puede diluir en 30-50 mL de SF 0.9% para infusión intermitente.",
        "volumenAdministracion": "IM: 1-2 mL. IV: 30-50 mL.",
        "velocidadAdministracion": "IM directo. IV lento en 5 min (off-label, monitorizar QTc).",
        "estabilidad": "Proteger de la luz. Estable 24h tras dilución."
    },
    "ziprasidona": {
        "reconstitucion": "Reconstituir vial de 20 mg con 1.2 mL de agua estéril para inyección.",
        "dilucion": "No diluir más. Administrar IM directamente.",
        "volumenAdministracion": "1.2 mL (20 mg)",
        "velocidadAdministracion": "IM profunda únicamente. No administrar IV.",
        "estabilidad": "Usar inmediatamente tras reconstitución."
    },
    "olanzapina": {
        "reconstitucion": "Reconstituir vial IM con 2.1 mL de agua estéril (5 mg/mL).",
        "dilucion": "No requiere dilución adicional para IM.",
        "volumenAdministracion": "IM: 1-2 mL",
        "velocidadAdministracion": "IM profunda. No administrar IV.",
        "estabilidad": "Usar dentro de 1h tras reconstitución."
    },
    # ── Cardiovascular ──
    "enalapril": {
        "reconstitucion": "No requiere para presentación IV (enalaprilato).",
        "dilucion": "Puede diluir en 50 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "Directo: 1-2 mL. Infusión: 50 mL.",
        "velocidadAdministracion": "IV directo en 5 min o infusión en 15-30 min.",
        "estabilidad": "Estable 24h a temperatura ambiente tras dilución."
    },
    "amiodarona": {
        "reconstitucion": "No requiere.",
        "dilucion": "Carga: 300 mg en 100 mL de SG 5% (preferir bolsa de vidrio o poliolefina). Mantenimiento: 900 mg en 500 mL SG 5%.",
        "volumenAdministracion": "Carga: 100 mL. Mantenimiento: 500 mL.",
        "velocidadAdministracion": "Carga: 150-300 mg en 10-60 min. Mantenimiento: 0.5-1 mg/min (540-720 mg en 18h).",
        "estabilidad": "Usar en 24h. Solo en SG 5% (precipita en SF). Usar envase no-PVC."
    },
    "adenosina": {
        "reconstitucion": "No requiere.",
        "dilucion": "NO diluir. Administrar sin diluir.",
        "volumenAdministracion": "1-2 mL por dosis",
        "velocidadAdministracion": "Bolo IV ultrarrápido en 1-2 seg seguido de flush de 20 mL de SF rápido. Vía proximal.",
        "estabilidad": "Conservar a temperatura ambiente. No refrigerar."
    },
    "digoxina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir cada dosis en al menos 4 vol de SF 0.9%, SG 5% o agua estéril (mín 10 mL).",
        "volumenAdministracion": "10-20 mL",
        "velocidadAdministracion": "IV lento en al menos 5 minutos (preferible 10-20 min).",
        "estabilidad": "Usar inmediatamente tras dilución."
    },
    "nitroglicerina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en 250-500 mL de SG 5% o SF 0.9%. Usar envases de vidrio o poliolefina (NO PVC).",
        "volumenAdministracion": "250-500 mL",
        "velocidadAdministracion": "Iniciar 5 mcg/min, titular cada 3-5 min. Usar bomba de infusión.",
        "estabilidad": "Estable 48h. Proteger de la luz. No usar equipo de PVC."
    },
    "nitroprusiato": {
        "reconstitucion": "Reconstituir 50 mg en 2-3 mL de SG 5%.",
        "dilucion": "Diluir en 250-1000 mL de SG 5% exclusivamente.",
        "volumenAdministracion": "250-500 mL",
        "velocidadAdministracion": "Iniciar 0.3 mcg/kg/min, titular hasta máx 10 mcg/kg/min. Bomba de infusión obligatoria.",
        "estabilidad": "Proteger de la luz con papel aluminio. Estable 24h protegido. Descartar si cambia de color."
    },
    "furosemida": {
        "reconstitucion": "No requiere.",
        "dilucion": "Puede diluir en SF 0.9% o SG 5% para infusión.",
        "volumenAdministracion": "Bolo: 2-4 mL. Infusión: 50-100 mL.",
        "velocidadAdministracion": "Bolo IV lento: máx 4 mg/min (evitar ototoxicidad). Infusión: 0.1-0.4 mg/kg/h.",
        "estabilidad": "Proteger de la luz. Usar dentro de 24h. pH alcalino: no mezclar con fármacos ácidos."
    },
    "verapamilo": {
        "reconstitucion": "No requiere.",
        "dilucion": "Puede diluir en SF 0.9% o SG 5%.",
        "volumenAdministracion": "Bolo: 2-4 mL",
        "velocidadAdministracion": "Bolo IV en 2-3 min. Segunda dosis a los 15-30 min si necesario.",
        "estabilidad": "Usar inmediatamente. No mezclar con soluciones alcalinas."
    },
    "diltiazem": {
        "reconstitucion": "No requiere.",
        "dilucion": "Infusión: diluir en 100-250 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "Bolo: 4-5 mL. Infusión: 100-250 mL.",
        "velocidadAdministracion": "Bolo: 0.25 mg/kg en 2 min. Infusión: 5-15 mg/h.",
        "estabilidad": "Infusión estable 24h a temperatura ambiente."
    },
    "metoprolol": {
        "reconstitucion": "No requiere.",
        "dilucion": "No requiere dilución para bolo IV.",
        "volumenAdministracion": "1 mL por dosis (5 mg)",
        "velocidadAdministracion": "IV lento: 5 mg en 2 min. Repetir cada 5 min hasta 15 mg total.",
        "estabilidad": "Conservar a temperatura ambiente."
    },
    "esmolol": {
        "reconstitucion": "No requiere.",
        "dilucion": "Bolo: sin diluir. Infusión: vial premezclado 10 mg/mL o diluir en SF/SG 5%.",
        "volumenAdministracion": "Bolo: 1 mL (10 mg). Infusión: 250 mL.",
        "velocidadAdministracion": "Carga: 500 mcg/kg en 1 min. Mantenimiento: 50-300 mcg/kg/min.",
        "estabilidad": "Estable 24h a temperatura ambiente."
    },
    "nicardipino": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir 25 mg en 250 mL de SF 0.9% o SG 5% (0.1 mg/mL).",
        "volumenAdministracion": "250 mL",
        "velocidadAdministracion": "Iniciar 5 mg/h, titular 2.5 mg/h cada 5-15 min hasta máx 15 mg/h.",
        "estabilidad": "Estable 24h a temperatura ambiente. Proteger de la luz."
    },
    "milrinona": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en SF 0.9% o SG 5%. Concentración habitual: 200 mcg/mL.",
        "volumenAdministracion": "100-250 mL",
        "velocidadAdministracion": "Carga: 50 mcg/kg en 10 min. Mantenimiento: 0.375-0.75 mcg/kg/min.",
        "estabilidad": "Estable 72h a temperatura ambiente tras dilución."
    },
    "levosimendan": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en 250-500 mL de SG 5% (concentración 0.025 mg/mL).",
        "volumenAdministracion": "250-500 mL",
        "velocidadAdministracion": "Carga opcional: 6-12 mcg/kg en 10 min. Infusión: 0.05-0.2 mcg/kg/min por 24h.",
        "estabilidad": "Usar dentro de 24h tras dilución."
    },
    # ── Antibióticos ──
    "ampicilina": {
        "reconstitucion": "Reconstituir vial de 500 mg con 5 mL, 1 g con 10 mL de agua estéril.",
        "dilucion": "Para infusión IV: diluir en 50-100 mL de SF 0.9%.",
        "volumenAdministracion": "Bolo: 10-20 mL. Infusión: 50-100 mL.",
        "velocidadAdministracion": "Bolo IV en 3-5 min. Infusión en 15-30 min.",
        "estabilidad": "Reconstituido: usar en 1h. No mezclar con aminoglucósidos."
    },
    "ceftriaxona": {
        "reconstitucion": "IV: reconstituir 1 g con 10 mL de agua estéril. IM: reconstituir 1 g con 3.5 mL de lidocaína 1%.",
        "dilucion": "Para infusión: diluir en 50-100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "Bolo: 10 mL. Infusión: 50-100 mL.",
        "velocidadAdministracion": "Bolo IV en 2-4 min. Infusión en 30 min. IM profunda.",
        "estabilidad": "Reconstituido: 6h a temp ambiente, 24h refrigerado. NO mezclar con calcio ni Ringer."
    },
    "cefazolina": {
        "reconstitucion": "Reconstituir vial de 1 g con 10 mL de agua estéril.",
        "dilucion": "Diluir en 50-100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "50-100 mL",
        "velocidadAdministracion": "Infundir en 30 minutos. Bolo IV lento en 3-5 min.",
        "estabilidad": "Reconstituido: 24h a temp ambiente, 10 días refrigerado."
    },
    "ceftazidima": {
        "reconstitucion": "Reconstituir 1 g con 10 mL de agua estéril.",
        "dilucion": "Diluir en 50-100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "50-100 mL",
        "velocidadAdministracion": "Infundir en 15-30 min. IM: inyección profunda.",
        "estabilidad": "Reconstituido: 12h a temp ambiente, 7 días refrigerado."
    },
    "cefepime": {
        "reconstitucion": "Reconstituir 1 g con 10 mL de agua estéril o SF 0.9%.",
        "dilucion": "Diluir en 50-100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "50-100 mL",
        "velocidadAdministracion": "Infundir en 30 minutos.",
        "estabilidad": "Reconstituido: 24h a temp ambiente, 7 días refrigerado."
    },
    "piperacilina_tazobactam": {
        "reconstitucion": "Reconstituir vial de 4.5 g con 20 mL de SF 0.9% o agua estéril.",
        "dilucion": "Diluir en 50-150 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100-150 mL",
        "velocidadAdministracion": "Infusión en 30 min (estándar) o 4h (infusión extendida para mejor eficacia).",
        "estabilidad": "Reconstituido: 24h a temp ambiente, 48h refrigerado."
    },
    "vancomicina": {
        "reconstitucion": "Reconstituir 500 mg con 10 mL, 1 g con 20 mL de agua estéril.",
        "dilucion": "Diluir en 100-250 mL de SF 0.9% o SG 5%. Concentración máx: 5 mg/mL.",
        "volumenAdministracion": "200 mL (para 1 g)",
        "velocidadAdministracion": "Infundir en mínimo 60 min (máx 10 mg/min). Evitar 'síndrome del hombre rojo'.",
        "estabilidad": "Reconstituido: 14 días refrigerado. Diluido: 24h a temp ambiente."
    },
    "meropenem": {
        "reconstitucion": "Reconstituir 500 mg con 10 mL, 1 g con 20 mL de agua estéril.",
        "dilucion": "Diluir en 50-100 mL de SF 0.9%.",
        "volumenAdministracion": "Bolo: 20 mL. Infusión: 50-100 mL.",
        "velocidadAdministracion": "Bolo IV en 5 min. Infusión estándar: 15-30 min. Infusión extendida: 3h.",
        "estabilidad": "Reconstituido en SF: 2h a temp ambiente, 12h refrigerado."
    },
    "gentamicina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en 50-200 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "50-100 mL",
        "velocidadAdministracion": "Infundir en 30-60 minutos.",
        "estabilidad": "Diluido estable 24h a temperatura ambiente."
    },
    "amikacina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en 100-200 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100-200 mL",
        "velocidadAdministracion": "Infundir en 30-60 minutos.",
        "estabilidad": "Diluido estable 24h a temperatura ambiente."
    },
    "ciprofloxacino": {
        "reconstitucion": "No requiere. Solución premezclada lista.",
        "dilucion": "No requiere dilución adicional (200 mg/100 mL o 400 mg/200 mL).",
        "volumenAdministracion": "100-200 mL",
        "velocidadAdministracion": "Infundir en 60 minutos. No administrar en bolo.",
        "estabilidad": "Proteger de la luz. Estable a temperatura ambiente."
    },
    "levofloxacino": {
        "reconstitucion": "No requiere para bolsa premezclada.",
        "dilucion": "Si vial: diluir 500 mg en 100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100 mL (500 mg) o 150 mL (750 mg)",
        "velocidadAdministracion": "500 mg: infundir en 60 min. 750 mg: infundir en 90 min.",
        "estabilidad": "Diluido estable 72h a temp ambiente, 14 días refrigerado."
    },
    "metronidazol": {
        "reconstitucion": "No requiere. Bolsa premezclada.",
        "dilucion": "No requiere dilución (500 mg/100 mL).",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "Infundir en 30-60 minutos.",
        "estabilidad": "Proteger de la luz. Estable a temperatura ambiente."
    },
    "clindamicina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en 50-100 mL de SF 0.9% o SG 5%. No exceder 18 mg/mL.",
        "volumenAdministracion": "50-100 mL",
        "velocidadAdministracion": "Infundir en 10-60 min. Máx: 30 mg/min. NUNCA en bolo IV directo.",
        "estabilidad": "Diluido estable 24h a temperatura ambiente."
    },
    "linezolid": {
        "reconstitucion": "No requiere. Bolsa premezclada.",
        "dilucion": "No requiere dilución (600 mg/300 mL).",
        "volumenAdministracion": "300 mL",
        "velocidadAdministracion": "Infundir en 30-120 minutos.",
        "estabilidad": "Proteger de la luz. No mezclar con otros fármacos."
    },
    "azitromicina": {
        "reconstitucion": "Reconstituir 500 mg con 4.8 mL de agua estéril (100 mg/mL).",
        "dilucion": "Diluir en 250-500 mL de SF 0.9% o SG 5% (1-2 mg/mL).",
        "volumenAdministracion": "250-500 mL",
        "velocidadAdministracion": "Infundir en 60 min (2 mg/mL) o 3h (1 mg/mL). NUNCA en bolo.",
        "estabilidad": "Reconstituido: 24h a temp ambiente. Diluido: 24h a temp ambiente o 7 días refrigerado."
    },
    "imipenem_cilastatina": {
        "reconstitucion": "Reconstituir vial de 500 mg con 100 mL de SF 0.9% o SG 5%.",
        "dilucion": "Ya incluida en reconstitución.",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "Dosis ≤500 mg: infundir en 20-30 min. Dosis 750-1000 mg: infundir en 40-60 min.",
        "estabilidad": "Reconstituido: 4h a temp ambiente, 24h refrigerado."
    },
    "ertapenem": {
        "reconstitucion": "Reconstituir 1 g con 10 mL de agua estéril o SF 0.9%.",
        "dilucion": "Diluir en 50 mL de SF 0.9%. NO usar SG 5%.",
        "volumenAdministracion": "50 mL",
        "velocidadAdministracion": "Infundir en 30 minutos.",
        "estabilidad": "Reconstituido: 6h a temp ambiente, 24h refrigerado."
    },
    "colistina": {
        "reconstitucion": "Reconstituir vial con 2 mL de agua estéril.",
        "dilucion": "Diluir en 50-100 mL de SF 0.9%.",
        "volumenAdministracion": "50-100 mL",
        "velocidadAdministracion": "Infundir en 30-60 min.",
        "estabilidad": "Reconstituido: 24h refrigerado. Usar inmediatamente tras dilución."
    },
    "tigeciclina": {
        "reconstitucion": "Reconstituir 50 mg con 5.3 mL de SF 0.9% o SG 5% (10 mg/mL).",
        "dilucion": "Diluir en 100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "Infundir en 30-60 minutos.",
        "estabilidad": "Reconstituido: 6h a temp ambiente, 24h refrigerado."
    },
    "daptomicina": {
        "reconstitucion": "Reconstituir 500 mg con 10 mL de SF 0.9%.",
        "dilucion": "Diluir en 50 mL de SF 0.9%. NO usar SG.",
        "volumenAdministracion": "Bolo: 10 mL. Infusión: 50 mL.",
        "velocidadAdministracion": "Bolo IV en 2 min o infusión en 30 min.",
        "estabilidad": "Reconstituido: 12h a temp ambiente, 48h refrigerado."
    },
    "teicoplanina": {
        "reconstitucion": "Reconstituir 400 mg con 3 mL de agua estéril. Agitar suavemente (espuma).",
        "dilucion": "Puede diluir en SF 0.9% o SG 5% para infusión.",
        "volumenAdministracion": "Bolo: 3 mL. Infusión: 50-100 mL.",
        "velocidadAdministracion": "Bolo IV en 3-5 min. Infusión en 30 min. IM: profunda.",
        "estabilidad": "Reconstituido: 24h a temp ambiente, 72h refrigerado."
    },
    "aztreonam": {
        "reconstitucion": "Reconstituir 1 g con 10 mL de agua estéril.",
        "dilucion": "Diluir en 50-100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "50-100 mL",
        "velocidadAdministracion": "Bolo IV en 3-5 min. Infusión en 20-60 min.",
        "estabilidad": "Reconstituido: 48h a temp ambiente, 7 días refrigerado."
    },
    # ── Antifúngicos ──
    "fluconazol": {
        "reconstitucion": "No requiere. Bolsa premezclada.",
        "dilucion": "No requiere dilución (200 mg/100 mL o 400 mg/200 mL).",
        "volumenAdministracion": "100-200 mL",
        "velocidadAdministracion": "Infundir a máx 200 mg/h (10 mL/min).",
        "estabilidad": "Estable a temperatura ambiente."
    },
    "anfotericina_b": {
        "reconstitucion": "Convencional: reconstituir 50 mg con 10 mL de agua estéril. Liposomal: reconstituir con 12 mL de agua estéril.",
        "dilucion": "Diluir SOLO en SG 5% (precipita en SF). Concentración: 0.1 mg/mL (convencional), 1-2 mg/mL (liposomal).",
        "volumenAdministracion": "250-500 mL de SG 5%",
        "velocidadAdministracion": "Convencional: infundir en 4-6h. Liposomal: infundir en 2h. Dosis de prueba: 1 mg en 20 min.",
        "estabilidad": "Reconstituido: 24h refrigerado, 6h a temp ambiente. Proteger de la luz."
    },
    "voriconazol": {
        "reconstitucion": "Reconstituir 200 mg con 19 mL de agua estéril (10 mg/mL).",
        "dilucion": "Diluir en SF 0.9% o SG 5% hasta concentración máx 5 mg/mL.",
        "volumenAdministracion": "100-250 mL",
        "velocidadAdministracion": "Infundir a máx 3 mg/kg/h (mínimo 1-2h).",
        "estabilidad": "Reconstituido: usar inmediatamente. Diluido: 24h refrigerado."
    },
    "caspofungina": {
        "reconstitucion": "Reconstituir 50 mg con 10.8 mL o 70 mg con 10.8 mL de agua estéril.",
        "dilucion": "Diluir en 250 mL de SF 0.9% o Ringer Lactato. NO usar SG 5%.",
        "volumenAdministracion": "250 mL",
        "velocidadAdministracion": "Infundir lentamente en 60 minutos.",
        "estabilidad": "Reconstituido: 24h refrigerado. Diluido: 24h a temp ambiente."
    },
    "micafungina": {
        "reconstitucion": "Reconstituir 50 mg con 5 mL, 100 mg con 5 mL de SF 0.9%.",
        "dilucion": "Diluir en 100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "Infundir en 60 minutos.",
        "estabilidad": "Reconstituido: 24h refrigerado. Proteger de la luz."
    },
    "anidulafungina": {
        "reconstitucion": "Reconstituir 100 mg con 30 mL de agua estéril (3.33 mg/mL).",
        "dilucion": "Diluir en SF 0.9% o SG 5%. Concentración final ≤0.77 mg/mL.",
        "volumenAdministracion": "250 mL",
        "velocidadAdministracion": "Infundir a máx 1.1 mg/min (aprox 90 min para 200 mg).",
        "estabilidad": "Reconstituido: 24h a temp ambiente."
    },
    # ── Antivirales ──
    "aciclovir": {
        "reconstitucion": "Reconstituir 250 mg con 10 mL, 500 mg con 20 mL de agua estéril.",
        "dilucion": "Diluir en 50-100 mL de SF 0.9% o SG 5%. Concentración máx: 7 mg/mL.",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "Infundir en mínimo 60 minutos. Hidratación adecuada para prevenir nefrotoxicidad.",
        "estabilidad": "Reconstituido: 12h a temp ambiente. Diluido: 24h a temp ambiente."
    },
    "ganciclovir": {
        "reconstitucion": "Reconstituir 500 mg con 10 mL de agua estéril (50 mg/mL).",
        "dilucion": "Diluir en 100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "Infundir en 60 minutos. NUNCA en bolo (toxicidad renal).",
        "estabilidad": "Reconstituido: 12h a temp ambiente. No refrigerar."
    },
    "remdesivir": {
        "reconstitucion": "Reconstituir 100 mg con 19 mL de agua estéril.",
        "dilucion": "Diluir en 100-250 mL de SF 0.9%.",
        "volumenAdministracion": "100-250 mL",
        "velocidadAdministracion": "Infundir en 30-120 minutos.",
        "estabilidad": "Reconstituido: 4h a temp ambiente, 24h refrigerado."
    },
    # ── Corticosteroides ──
    "dexametasona": {
        "reconstitucion": "No requiere.",
        "dilucion": "Puede diluir en 50-100 mL de SF 0.9% o SG 5% para infusión.",
        "volumenAdministracion": "Bolo: 1-5 mL. Infusión: 50-100 mL.",
        "velocidadAdministracion": "Bolo IV en 1-4 min. Infusión en 15-30 min.",
        "estabilidad": "Estable 24h a temperatura ambiente tras dilución."
    },
    "hidrocortisona_sistemica": {
        "reconstitucion": "Reconstituir 100 mg con 2 mL de agua estéril o SF 0.9%.",
        "dilucion": "Bolo: sin dilución adicional. Infusión: diluir en 100-250 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "Bolo: 2 mL. Infusión: 100-250 mL.",
        "velocidadAdministracion": "Bolo IV en 1-3 min. Infusión en 20-30 min.",
        "estabilidad": "Reconstituido: 3 días a temp ambiente. Proteger de la luz."
    },
    "metilprednisolona": {
        "reconstitucion": "Reconstituir con el diluyente proporcionado (Act-O-Vial).",
        "dilucion": "Dosis altas (≥250 mg): diluir en 50-100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "Bolo: 2-8 mL. Pulso: 100-250 mL.",
        "velocidadAdministracion": "Dosis bajas: bolo IV en 1-3 min. Pulsos (500-1000 mg): infundir en 30-60 min.",
        "estabilidad": "Reconstituido: 48h a temp ambiente."
    },
    "hidrocortisona": {
        "reconstitucion": "Reconstituir 100 mg con 2 mL de agua estéril.",
        "dilucion": "Para infusión: diluir en 100-250 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "Bolo: 2 mL. Infusión: 100-250 mL.",
        "velocidadAdministracion": "Bolo IV directo en 1-3 min. Infusión en 20-30 min.",
        "estabilidad": "Reconstituido: usar en 3 días. Proteger de la luz."
    },
    # ── Gastrointestinal ──
    "metoclopramida": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en 50 mL de SF 0.9% o SG 5% para infusión.",
        "volumenAdministracion": "Bolo: 1-2 mL. Infusión: 50 mL.",
        "velocidadAdministracion": "Bolo IV lento en 3-5 min. Infusión en 15 min.",
        "estabilidad": "Diluido estable 24h a temperatura ambiente. Proteger de la luz."
    },
    "ondansetron": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en 50 mL de SF 0.9% o SG 5% para infusión.",
        "volumenAdministracion": "Bolo: 2-4 mL. Infusión: 50 mL.",
        "velocidadAdministracion": "Bolo IV en 2-5 min. Infusión en 15 min.",
        "estabilidad": "Diluido estable 48h a temperatura ambiente."
    },
    "pantoprazol_iv": {
        "reconstitucion": "Reconstituir 40 mg con 10 mL de SF 0.9%.",
        "dilucion": "Para infusión: diluir en 100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "Bolo: 10 mL. Infusión: 100 mL.",
        "velocidadAdministracion": "Bolo IV en 2-5 min. Infusión en 15 min.",
        "estabilidad": "Reconstituido: 12h a temp ambiente."
    },
    "somatostatina": {
        "reconstitucion": "Reconstituir 3 mg con 3 mL de SF 0.9%.",
        "dilucion": "Diluir en 500 mL de SF 0.9% para infusión continua.",
        "volumenAdministracion": "Bolo: 3 mL. Infusión: 500 mL.",
        "velocidadAdministracion": "Bolo: 3.5 mcg/kg IV. Infusión: 3.5 mcg/kg/h continua.",
        "estabilidad": "Reconstituido: usar inmediatamente. Preparar nueva bolsa cada 12h."
    },
    # ── Endocrino ──
    "insulina_regular": {
        "reconstitucion": "No requiere.",
        "dilucion": "Infusión: diluir 50 UI en 50 mL de SF 0.9% (1 UI/mL) o 100 UI en 100 mL.",
        "volumenAdministracion": "50-100 mL para infusión. SC: 0.1-1 mL.",
        "velocidadAdministracion": "Infusión: 0.5-10 UI/h según glucemia. SC: efecto en 30 min.",
        "estabilidad": "Infusión: estable 24h. Purgar sistema con 50 mL antes (absorción en PVC)."
    },
    "glucagon": {
        "reconstitucion": "Reconstituir 1 mg con 1 mL del diluyente proporcionado.",
        "dilucion": "No requiere dilución adicional.",
        "volumenAdministracion": "1 mL (1 mg)",
        "velocidadAdministracion": "IM, SC o IV directo. Puede repetir en 15 min.",
        "estabilidad": "Usar inmediatamente tras reconstitución. No mezclar con otras soluciones."
    },
    "octreotida": {
        "reconstitucion": "SC/IV: no requiere. LAR (IM mensual): reconstituir con diluyente proporcionado.",
        "dilucion": "Infusión: diluir en 50-200 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "SC: 0.5-1 mL. Infusión: 50-200 mL.",
        "velocidadAdministracion": "SC directo. IV: infusión en 15-30 min o continua 25-50 mcg/h.",
        "estabilidad": "Ampollas: refrigerar. Diluido: 24h a temperatura ambiente."
    },
    "terlipresina": {
        "reconstitucion": "No requiere para solución. Polvo: reconstituir con 5 mL de SF 0.9%.",
        "dilucion": "Puede diluir en 10-20 mL de SF 0.9%.",
        "volumenAdministracion": "5-20 mL",
        "velocidadAdministracion": "Bolo IV lento en 1-2 minutos cada 4-6h.",
        "estabilidad": "Reconstituido: usar inmediatamente."
    },
    # ── Electrolitos y fluidos ──
    "potasio_cloruro": {
        "reconstitucion": "No requiere.",
        "dilucion": "NUNCA administrar sin diluir. Diluir en 500-1000 mL de SF 0.9% o SG 5%. Concentración máx periférica: 40 mEq/L. Central: hasta 80 mEq/L.",
        "volumenAdministracion": "500-1000 mL",
        "velocidadAdministracion": "Máx 10-20 mEq/h por vía periférica. Monitorizar ECG si >10 mEq/h.",
        "estabilidad": "Estable tras dilución. Mezclar bien para evitar capas de concentración."
    },
    "cloruro_potasio": {
        "reconstitucion": "No requiere.",
        "dilucion": "NUNCA administrar sin diluir. Diluir en 500-1000 mL de SF 0.9%. Máx periférica: 40 mEq/L.",
        "volumenAdministracion": "500-1000 mL",
        "velocidadAdministracion": "Máx 10-20 mEq/h. Monitorizar ECG continuo si velocidad >10 mEq/h.",
        "estabilidad": "Estable tras dilución."
    },
    "calcio_cloruro": {
        "reconstitucion": "No requiere.",
        "dilucion": "Puede diluir en 50-100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "Bolo: 10 mL (ampolla). Infusión: 50-100 mL.",
        "velocidadAdministracion": "Bolo: 10 mL (1 g) en 5-10 min. SOLO por vía central preferente (vesicante).",
        "estabilidad": "Estable a temperatura ambiente. No mezclar con bicarbonato."
    },
    "gluconato_calcio": {
        "reconstitucion": "No requiere.",
        "dilucion": "Puede diluir en 50-100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "Bolo: 10 mL. Infusión: 50-100 mL.",
        "velocidadAdministracion": "Bolo IV en 5-10 min (máx 1.5 mL/min). Monitorizar ECG.",
        "estabilidad": "Estable a temperatura ambiente. No mezclar con bicarbonato ni fosfato."
    },
    "sulfato_magnesio_emergencia": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en 100-250 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100-250 mL",
        "velocidadAdministracion": "Eclampsia: 4-6 g en 15-20 min. Torsade: 2 g en 2-5 min. Mantenimiento: 1-2 g/h.",
        "estabilidad": "Estable 24h tras dilución."
    },
    "bicarbonato-sodio": {
        "reconstitucion": "No requiere.",
        "dilucion": "Puede diluir en SG 5% para infusión. No mezclar con calcio ni catecolaminas.",
        "volumenAdministracion": "Bolo: 50 mL (ampolla 8.4%). Infusión: 250-500 mL.",
        "velocidadAdministracion": "PCR: 50 mEq (50 mL al 8.4%) en bolo. Acidosis: infundir según déficit calculado.",
        "estabilidad": "Estable a temperatura ambiente. Incompatible con muchos fármacos."
    },
    "solucion_fisiologica": {
        "dilucion": "Solución lista para uso. SF 0.9% (154 mEq/L Na+, 154 mEq/L Cl-).",
        "volumenAdministracion": "250, 500 o 1000 mL según indicación",
        "velocidadAdministracion": "Mantenimiento: 80-125 mL/h. Resucitación: 500-1000 mL en 15-30 min.",
        "estabilidad": "24h tras apertura."
    },
    "ringer_lactato": {
        "dilucion": "Solución lista para uso (Na 130, K 4, Ca 3, Cl 109, Lactato 28 mEq/L).",
        "volumenAdministracion": "500-1000 mL",
        "velocidadAdministracion": "Mantenimiento: 80-125 mL/h. Resucitación: 500-1000 mL en 15-30 min.",
        "estabilidad": "24h tras apertura. No agregar bicarbonato ni sangre con calcio."
    },
    "albumina_humana": {
        "reconstitucion": "No requiere.",
        "dilucion": "No diluir la al 20-25%. La al 5% se administra directamente.",
        "volumenAdministracion": "5%: 250-500 mL. 20%: 50-100 mL.",
        "velocidadAdministracion": "5%: 2-4 mL/min. 20-25%: 1-2 mL/min. No exceder 5 mL/min.",
        "estabilidad": "Usar dentro de 4h tras apertura. No congelar."
    },
    "manitol": {
        "reconstitucion": "No requiere. Calentar si hay cristales (baño maría 70°C).",
        "dilucion": "No diluir. Usar filtro en línea (cristales).",
        "volumenAdministracion": "250-500 mL (solución al 20%)",
        "velocidadAdministracion": "Edema cerebral: 0.25-1 g/kg en 15-30 min. Usar filtro de 5 micras.",
        "estabilidad": "No refrigerar (cristaliza). Verificar ausencia de cristales antes de usar."
    },
    # ── Emergencia / UCI ──
    "adrenalina": {
        "reconstitucion": "No requiere.",
        "dilucion": "PCR: sin diluir (1 mg/mL). Infusión: diluir 5 mg en 250 mL de SF/SG 5% (20 mcg/mL).",
        "volumenAdministracion": "PCR: 1 mL (1:1000) o 10 mL (1:10.000). Infusión: 250 mL.",
        "velocidadAdministracion": "PCR: bolo IV cada 3-5 min. Infusión: 0.01-0.5 mcg/kg/min. Anafilaxia: 0.3-0.5 mg IM.",
        "estabilidad": "Diluida: 24h a temp ambiente. Proteger de la luz. Descartar si rosada/marrón."
    },
    "noradrenalina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir 4-8 mg en 250 mL de SG 5% o SF 0.9% (16-32 mcg/mL).",
        "volumenAdministracion": "250 mL",
        "velocidadAdministracion": "Iniciar 0.05-0.1 mcg/kg/min. Titular según PAM objetivo. Vía central obligatoria.",
        "estabilidad": "Diluida: 24h a temp ambiente. Proteger de la luz."
    },
    "dopamina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir 400-800 mg en 250 mL de SG 5% o SF 0.9%.",
        "volumenAdministracion": "250 mL",
        "velocidadAdministracion": "Renal: 1-3 mcg/kg/min. Inotrópico: 3-10 mcg/kg/min. Vasopresor: 10-20 mcg/kg/min.",
        "estabilidad": "Diluida: 24h. Proteger de la luz. Preferir vía central."
    },
    "dobutamina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir 250-500 mg en 250 mL de SG 5% o SF 0.9% (1-2 mg/mL).",
        "volumenAdministracion": "250 mL",
        "velocidadAdministracion": "2.5-20 mcg/kg/min. Titular según respuesta hemodinámica.",
        "estabilidad": "Diluida: 24h. Proteger de la luz. Solución rosada es normal."
    },
    "vasopresina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir 20-40 UI en 100-250 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100-250 mL",
        "velocidadAdministracion": "Shock séptico: 0.03-0.04 UI/min (dosis fija, no titular).",
        "estabilidad": "Diluida estable 24h a temperatura ambiente."
    },
    "atropina": {
        "reconstitucion": "No requiere.",
        "dilucion": "No requiere dilución para bolo.",
        "volumenAdministracion": "1 mL (0.5-1 mg)",
        "velocidadAdministracion": "Bradicardia: 0.5-1 mg IV rápido. Repetir cada 3-5 min hasta máx 3 mg.",
        "estabilidad": "Conservar a temperatura ambiente."
    },
    "fenilefrina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Bolo: diluir 0.1-0.5 mg en 10 mL SF. Infusión: 10-50 mg en 250 mL SG 5%.",
        "volumenAdministracion": "Bolo: 10 mL. Infusión: 250 mL.",
        "velocidadAdministracion": "Bolo: 0.1-0.5 mg IV cada 10-15 min. Infusión: 40-180 mcg/min.",
        "estabilidad": "Diluida estable 24h."
    },
    # ── Antídotos ──
    "naloxona": {
        "reconstitucion": "No requiere.",
        "dilucion": "Puede diluir en SF 0.9% o SG 5%. Infusión: 2 mg en 250 mL.",
        "volumenAdministracion": "Bolo: 1 mL (0.4 mg). Infusión: 250 mL.",
        "velocidadAdministracion": "Bolo IV en 30 seg. Repetir cada 2-3 min si necesario. Infusión: 0.4-2 mg/h.",
        "estabilidad": "Diluida: 24h a temperatura ambiente."
    },
    "flumazenilo": {
        "reconstitucion": "No requiere.",
        "dilucion": "Puede diluir en SF 0.9% o SG 5%.",
        "volumenAdministracion": "1-5 mL",
        "velocidadAdministracion": "0.2 mg IV en 15 seg. Repetir 0.1 mg cada 60 seg hasta máx 1 mg.",
        "estabilidad": "Diluido: 24h a temperatura ambiente."
    },
    "n_acetilcisteina": {
        "reconstitucion": "No requiere.",
        "dilucion": "1ª bolsa: 150 mg/kg en 200 mL SG 5% (1h). 2ª: 50 mg/kg en 500 mL (4h). 3ª: 100 mg/kg en 1000 mL (16h).",
        "volumenAdministracion": "200, 500 y 1000 mL (protocolo de 3 bolsas en 21h)",
        "velocidadAdministracion": "Bolsa 1: en 1h. Bolsa 2: en 4h. Bolsa 3: en 16h.",
        "estabilidad": "Diluido en SG 5%: estable 24h a temp ambiente."
    },
    "dantroleno": {
        "reconstitucion": "Reconstituir cada vial de 20 mg con 60 mL de agua estéril (sin bacteriostático). Agitar vigorosamente.",
        "dilucion": "No requiere dilución adicional.",
        "volumenAdministracion": "60 mL por vial. Múltiples viales necesarios (2.5 mg/kg = 7-10 viales para 70 kg).",
        "velocidadAdministracion": "Bolo IV rápido: 2.5 mg/kg. Repetir cada 5-10 min hasta 10 mg/kg total.",
        "estabilidad": "Reconstituido: usar dentro de 6h. Proteger de la luz."
    },
    "azul_metileno": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en 50 mL de SF 0.9%.",
        "volumenAdministracion": "50 mL",
        "velocidadAdministracion": "1-2 mg/kg IV en 5-10 minutos.",
        "estabilidad": "Conservar a temperatura ambiente. Mancha la piel y la orina azul."
    },
    "idarucizumab": {
        "reconstitucion": "No requiere. Solución lista.",
        "dilucion": "No diluir.",
        "volumenAdministracion": "2 viales de 50 mL cada uno (5 g total)",
        "velocidadAdministracion": "2.5 g (50 mL) IV en bolo o infusión en 5-10 min. Repetir segundo vial.",
        "estabilidad": "Refrigerado: 48h fuera del envase original. No congelar."
    },
    "sugammadex_emergencia": {
        "reconstitucion": "No requiere. Solución lista.",
        "dilucion": "No diluir.",
        "volumenAdministracion": "Según peso: 16 mg/kg = ~22 mL para 70 kg",
        "velocidadAdministracion": "Bolo IV rápido en 10 segundos.",
        "estabilidad": "Conservar a temperatura ambiente. Usar dentro de 24h tras apertura."
    },
    # ── Anestésicos generales / UCI ──
    "propofol": {
        "reconstitucion": "No requiere. Emulsión lipídica lista.",
        "dilucion": "Puede diluir SOLO en SG 5% (concentración mín 2 mg/mL).",
        "volumenAdministracion": "Jeringa de 20-50 mL",
        "velocidadAdministracion": "Inducción: 1-2.5 mg/kg en 20-40 seg. Sedación: 0.3-4 mg/kg/h.",
        "estabilidad": "Usar dentro de 12h tras apertura (riesgo contaminación bacteriana). No refrigerar."
    },
    "rocuronio": {
        "reconstitucion": "No requiere.",
        "dilucion": "Puede diluir en SF 0.9%, SG 5% o Ringer para infusión.",
        "volumenAdministracion": "Bolo: 2-7 mL. Infusión según protocolo.",
        "velocidadAdministracion": "Intubación: 0.6-1.2 mg/kg IV rápido. Mantenimiento: 0.3-0.6 mg/kg o infusión 5-12 mcg/kg/min.",
        "estabilidad": "Diluido: 24h a temp ambiente."
    },
    "succinilcolina": {
        "reconstitucion": "No requiere.",
        "dilucion": "No diluir para bolo. Infusión: diluir en SF 0.9% o SG 5%.",
        "volumenAdministracion": "Bolo: 2-5 mL",
        "velocidadAdministracion": "ISR: 1-1.5 mg/kg IV rápido. Efecto en 60 seg.",
        "estabilidad": "Refrigerar. Estable 14 días a temperatura ambiente."
    },
    "sugammadex": {
        "reconstitucion": "No requiere.",
        "dilucion": "No diluir.",
        "volumenAdministracion": "Según peso (2-16 mg/kg)",
        "velocidadAdministracion": "Bolo IV rápido en 10 segundos.",
        "estabilidad": "Conservar a temperatura ambiente."
    },
    "etomidato": {
        "reconstitucion": "No requiere.",
        "dilucion": "No diluir.",
        "volumenAdministracion": "5-10 mL (0.2-0.6 mg/kg)",
        "velocidadAdministracion": "Bolo IV en 30-60 segundos.",
        "estabilidad": "Conservar a temperatura ambiente."
    },
    "cisatracurio": {
        "reconstitucion": "No requiere.",
        "dilucion": "Infusión: diluir en SF 0.9% o SG 5% (0.1-0.4 mg/mL).",
        "volumenAdministracion": "Bolo: 2-5 mL. Infusión: 250 mL.",
        "velocidadAdministracion": "Bolo: 0.15-0.2 mg/kg. Infusión: 1-3 mcg/kg/min.",
        "estabilidad": "Refrigerar. Diluido: 24h a temp ambiente."
    },
    "cisatracurio_detalle": {
        "reconstitucion": "No requiere.",
        "dilucion": "Infusión: diluir en SF 0.9% o SG 5% (0.1-0.4 mg/mL).",
        "volumenAdministracion": "Bolo: 2-5 mL. Infusión: 250 mL.",
        "velocidadAdministracion": "Bolo: 0.15-0.2 mg/kg. Infusión: 1-3 mcg/kg/min.",
        "estabilidad": "Refrigerar. Diluido: 24h a temp ambiente."
    },
    "dexmedetomidina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir 200 mcg (2 mL) en 48 mL de SF 0.9% (4 mcg/mL).",
        "volumenAdministracion": "50 mL en jeringa",
        "velocidadAdministracion": "Carga: 1 mcg/kg en 10 min (opcional). Mantenimiento: 0.2-1.4 mcg/kg/h.",
        "estabilidad": "Diluida: 24h a temperatura ambiente."
    },
    "remifentanilo": {
        "reconstitucion": "Reconstituir 1 mg con 1 mL de diluyente.",
        "dilucion": "Diluir hasta 20-50 mcg/mL en SF 0.9% o SG 5%.",
        "volumenAdministracion": "50 mL en jeringa o 250 mL en bolsa.",
        "velocidadAdministracion": "Analgesia: 0.05-0.2 mcg/kg/min. Anestesia: 0.5-1 mcg/kg/min.",
        "estabilidad": "Reconstituido: 24h a temp ambiente. NO reutilizar."
    },
    "tiopental": {
        "reconstitucion": "Reconstituir 500 mg con 20 mL de agua estéril (25 mg/mL).",
        "dilucion": "Puede diluir más en SF 0.9% o agua estéril.",
        "volumenAdministracion": "10-20 mL por dosis",
        "velocidadAdministracion": "Inducción: 3-5 mg/kg IV en 10-15 seg. Dosis prueba 25-75 mg.",
        "estabilidad": "Reconstituido: 24h a temp ambiente, 7 días refrigerado. Solución alcalina: cuidado extravasación."
    },
    "bupivacaina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Epidural/intratecal: puede diluir con SF según protocolo.",
        "volumenAdministracion": "Epidural: 10-20 mL. Intratecal: 1-4 mL.",
        "velocidadAdministracion": "Epidural: inyectar lentamente con aspiración frecuente.",
        "estabilidad": "Conservar a temperatura ambiente."
    },
    "ropivacaina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Infusión epidural: solución al 0.2% lista o diluir según protocolo.",
        "volumenAdministracion": "Bloqueo: 10-40 mL. Infusión epidural: 6-14 mL/h.",
        "velocidadAdministracion": "Epidural: 6-14 mL/h (0.2%). Bloqueo nervioso: según técnica.",
        "estabilidad": "Conservar a temperatura ambiente. Usar dentro de 24h tras apertura."
    },
    # ── Hematología ──
    "heparina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Infusión: 25.000 UI en 250 mL de SF 0.9% (100 UI/mL).",
        "volumenAdministracion": "Bolo: 1-5 mL. Infusión: 250 mL.",
        "velocidadAdministracion": "Bolo: 80 UI/kg IV. Infusión: 18 UI/kg/h, titular según TTPa.",
        "estabilidad": "Diluida estable 24h a temperatura ambiente."
    },
    "enoxaparina": {
        "reconstitucion": "No requiere. Jeringa precargada.",
        "dilucion": "No diluir. Administrar SC directamente.",
        "volumenAdministracion": "0.2-0.8 mL según dosis/peso",
        "velocidadAdministracion": "SC: inyectar lentamente en pliegue abdominal. Alternar sitios.",
        "estabilidad": "Conservar a temperatura ambiente."
    },
    "alteplasa": {
        "reconstitucion": "Reconstituir 50 mg con 50 mL de agua estéril (1 mg/mL).",
        "dilucion": "Puede diluir más en SF 0.9% hasta 0.5 mg/mL.",
        "volumenAdministracion": "IAM: 100 mL (100 mg). ACV: hasta 90 mg.",
        "velocidadAdministracion": "IAM: 15 mg bolo + 50 mg en 30 min + 35 mg en 60 min. ACV: 10% bolo en 1 min, resto en 60 min.",
        "estabilidad": "Reconstituido: 8h a temp ambiente. No agitar."
    },
    "acido_tranexamico": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en 50-100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "50-100 mL",
        "velocidadAdministracion": "Infundir en 10-20 min. Máx 100 mg/min. Trauma: 1 g en 10 min.",
        "estabilidad": "Diluido estable 24h a temperatura ambiente."
    },
    "vitamina_k": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en 50 mL de SF 0.9% o SG 5% para IV.",
        "volumenAdministracion": "Bolo: 1 mL IM/SC. Infusión: 50 mL.",
        "velocidadAdministracion": "IV: infundir lentamente en 15-30 min (riesgo anafilaxia). Preferir IM/SC si posible.",
        "estabilidad": "Proteger de la luz."
    },
    "hierro_parenteral": {
        "reconstitucion": "No requiere.",
        "dilucion": "Hierro sacarosa: diluir 100-200 mg en 100 mL de SF 0.9% exclusivamente.",
        "volumenAdministracion": "100-250 mL",
        "velocidadAdministracion": "Infundir en 15-60 min según producto. Dosis prueba recomendada.",
        "estabilidad": "Diluido: usar inmediatamente."
    },
    "hierro_carboximaltosa": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en 100-250 mL de SF 0.9% exclusivamente. Concentración mín: 2 mg/mL.",
        "volumenAdministracion": "100-250 mL. Puede dar hasta 1000 mg en una sesión.",
        "velocidadAdministracion": "≤200 mg: bolo IV en 1-2 min. 200-500 mg: en 6 min. 500-1000 mg: en 15 min.",
        "estabilidad": "Diluido en SF 0.9%: 24h a temperatura ambiente."
    },
    "hierro_sacarosa": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir cada 100 mg en 100 mL de SF 0.9% exclusivamente.",
        "volumenAdministracion": "100-250 mL",
        "velocidadAdministracion": "200 mg: infundir en 30 min. 500 mg: infundir en 3.5h.",
        "estabilidad": "Diluido: usar inmediatamente. NO usar SG 5%."
    },
    "protamina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Puede diluir en SF 0.9% o SG 5%.",
        "volumenAdministracion": "5-10 mL",
        "velocidadAdministracion": "IV lento: máx 5 mg/min (50 mg en 10 min). Demasiado rápido causa hipotensión.",
        "estabilidad": "Refrigerar. Estable a temp ambiente por 72h."
    },
    "filgrastim": {
        "reconstitucion": "No requiere. Jeringa precargada.",
        "dilucion": "Si IV: diluir en 50-100 mL de SG 5%. Concentración mín: 5 mcg/mL.",
        "volumenAdministracion": "SC: 0.5-1 mL. IV: 50-100 mL.",
        "velocidadAdministracion": "SC directo. IV: infundir en 15-30 min.",
        "estabilidad": "Refrigerar. No congelar. Estable 24h a temp ambiente."
    },
    "eritropoyetina": {
        "reconstitucion": "No requiere. Jeringa precargada.",
        "dilucion": "No diluir.",
        "volumenAdministracion": "SC: 0.3-1 mL. IV: directamente.",
        "velocidadAdministracion": "SC directo. IV: bolo lento en 1-5 min.",
        "estabilidad": "Refrigerar. No congelar. No agitar."
    },
    # ── Respiratorio ──
    "aminofilina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en 100-250 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100-250 mL",
        "velocidadAdministracion": "Carga: 5-6 mg/kg en 20-30 min. Mantenimiento: 0.5-0.7 mg/kg/h.",
        "estabilidad": "Diluido estable 24h a temperatura ambiente."
    },
    "salbutamol": {
        "reconstitucion": "No requiere para nebulización. IV: no requiere.",
        "dilucion": "Nebulización: 0.5-1 mL en 3 mL de SF. IV: diluir en SG 5%.",
        "volumenAdministracion": "Nebulización: 4 mL total. IV: 50-250 mL.",
        "velocidadAdministracion": "Nebulización: 6-8 L/min O2 en 10-15 min. IV: 5-20 mcg/min.",
        "estabilidad": "Nebulización: usar inmediatamente."
    },
    # ── Antineoplásicos (datos básicos de preparación) ──
    "ciclofosfamida": {
        "reconstitucion": "Reconstituir 500 mg con 25 mL, 1 g con 50 mL de SF 0.9%.",
        "dilucion": "Diluir en 250-500 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "250-500 mL",
        "velocidadAdministracion": "Infundir en 1-2 horas según protocolo.",
        "estabilidad": "Reconstituido: 24h a temp ambiente, 6 días refrigerado."
    },
    "doxorrubicina": {
        "reconstitucion": "Reconstituir con SF 0.9% (2 mg/mL).",
        "dilucion": "Diluir en 100-250 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100-250 mL",
        "velocidadAdministracion": "Infundir en 15-60 min por vía central. VESICANTE: verificar retorno venoso.",
        "estabilidad": "Reconstituido: 24h refrigerado. Proteger de la luz."
    },
    "cisplatino": {
        "reconstitucion": "Reconstituir con SF 0.9%.",
        "dilucion": "Diluir en 1000 mL de SF 0.9% + manitol. NO usar SG 5%.",
        "volumenAdministracion": "1000-2000 mL (con hidratación)",
        "velocidadAdministracion": "Infundir en 1-8h según protocolo. Pre-hidratación obligatoria.",
        "estabilidad": "Reconstituido: 24h a temp ambiente. NO refrigerar. NO usar aluminio."
    },
    "paclitaxel": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en 250-500 mL de SF 0.9% o SG 5% (0.3-1.2 mg/mL). Usar equipo no-PVC.",
        "volumenAdministracion": "250-500 mL",
        "velocidadAdministracion": "Infundir en 3h (estándar). Premedicación obligatoria (dexa + antiH1 + antiH2).",
        "estabilidad": "Diluido: 27h a temp ambiente. Usar filtro 0.22 micras."
    },
    "fluorouracilo": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en 250-1000 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "Bolo: sin diluir. Infusión: 250-1000 mL.",
        "velocidadAdministracion": "Bolo: IV en 1-5 min. Infusión continua: 24-120h según protocolo.",
        "estabilidad": "Diluido: 24h a temp ambiente. Proteger de la luz."
    },
    "vincristina": {
        "reconstitucion": "No requiere si solución lista.",
        "dilucion": "Diluir en 25-50 mL de SF 0.9%.",
        "volumenAdministracion": "25-50 mL",
        "velocidadAdministracion": "Infundir en 5-10 min. VESICANTE. SOLO IV — INTRATECAL ES LETAL.",
        "estabilidad": "Refrigerado. Proteger de la luz."
    },
    "carboplatino": {
        "reconstitucion": "Reconstituir con SG 5%, agua estéril o SF 0.9%.",
        "dilucion": "Diluir en 250-500 mL de SG 5% o SF 0.9%.",
        "volumenAdministracion": "250-500 mL",
        "velocidadAdministracion": "Infundir en 15-60 min.",
        "estabilidad": "Reconstituido: 8h a temp ambiente. NO usar agujas de aluminio."
    },
    "gemcitabina": {
        "reconstitucion": "Reconstituir 200 mg con 5 mL, 1 g con 25 mL de SF 0.9%.",
        "dilucion": "Diluir en 50-250 mL de SF 0.9%.",
        "volumenAdministracion": "250 mL",
        "velocidadAdministracion": "Infundir en 30 minutos (no exceder 10 mg/m²/min).",
        "estabilidad": "Reconstituido: 24h a temp ambiente. No refrigerar."
    },
    "oxaliplatino": {
        "reconstitucion": "Reconstituir con SG 5% o agua estéril.",
        "dilucion": "Diluir en 250-500 mL de SG 5% EXCLUSIVAMENTE. NO usar SF ni cloruro.",
        "volumenAdministracion": "250-500 mL de SG 5%",
        "velocidadAdministracion": "Infundir en 2-6h.",
        "estabilidad": "Reconstituido: 24h refrigerado. NO usar aluminio."
    },
    "trastuzumab": {
        "reconstitucion": "Reconstituir 440 mg con 20 mL de agua bacteriostática.",
        "dilucion": "Diluir en 250 mL de SF 0.9%. NO usar SG 5%.",
        "volumenAdministracion": "250 mL",
        "velocidadAdministracion": "1ª dosis: 90 min. Siguientes: 30 min si tolerado.",
        "estabilidad": "Reconstituido: 28 días refrigerado con agua bacteriostática."
    },
    "bevacizumab": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en 100 mL de SF 0.9%. Volumen final 100 mL.",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "1ª dosis: 90 min. 2ª: 60 min. Siguientes: 30 min si tolerado.",
        "estabilidad": "Diluido: 8h refrigerado."
    },
    "nivolumab": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en 100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "Infundir en 30 minutos.",
        "estabilidad": "Diluido: 24h refrigerado. Usar filtro 0.2-1.2 micras."
    },
    "pembrolizumab": {
        "reconstitucion": "No requiere para solución. Polvo: reconstituir 50 mg con 2.3 mL de agua estéril.",
        "dilucion": "Diluir en 100 mL de SF 0.9%.",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "Infundir en 30 minutos. Usar filtro 0.2-5 micras.",
        "estabilidad": "Diluido: 24h refrigerado, 6h a temp ambiente."
    },
    "rituximab": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en SF 0.9% o SG 5% hasta 1-4 mg/mL.",
        "volumenAdministracion": "250-500 mL",
        "velocidadAdministracion": "1ª infusión: iniciar 50 mg/h, escalar 50 mg/h cada 30 min hasta 400 mg/h. Siguientes: iniciar 100 mg/h.",
        "estabilidad": "Diluido: 24h refrigerado, 12h a temp ambiente."
    },
    "infliximab": {
        "reconstitucion": "Reconstituir 100 mg con 10 mL de agua estéril. No agitar.",
        "dilucion": "Diluir en 250 mL de SF 0.9%.",
        "volumenAdministracion": "250 mL",
        "velocidadAdministracion": "Infundir en mínimo 2h. Usar filtro en línea 1.2 micras.",
        "estabilidad": "Diluido: usar dentro de 3h."
    },
    "tocilizumab": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en 100 mL de SF 0.9% (para dosis <60 mL añadir SF hasta 100 mL).",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "Infundir en 60 minutos.",
        "estabilidad": "Diluido: 24h refrigerado."
    },
    # ── Sedación ──
    "neostigmina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Puede diluir en 10 mL de SF 0.9%.",
        "volumenAdministracion": "1-5 mL",
        "velocidadAdministracion": "IV lento en 1-3 min. Siempre con atropina (0.6-1.2 mg).",
        "estabilidad": "Conservar a temperatura ambiente."
    },
    # ── Nitroglicerina infusión ──
    "nitroglicerina_infusion": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir 50 mg en 250 mL de SG 5% (200 mcg/mL). Usar envase de vidrio o poliolefina.",
        "volumenAdministracion": "250 mL",
        "velocidadAdministracion": "Iniciar 5-10 mcg/min. Titular cada 5 min hasta respuesta. Bomba de infusión.",
        "estabilidad": "Estable 48h. NO usar equipo de PVC."
    },
    # ── Obstétrico ──
    "oxitocina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Inducción: 10-20 UI en 1000 mL de SF 0.9% o Ringer. Hemorragia: 20-40 UI en 1000 mL.",
        "volumenAdministracion": "1000 mL",
        "velocidadAdministracion": "Inducción: iniciar 1-2 mUI/min, escalar cada 30 min. Hemorragia: 125-250 mL/h.",
        "estabilidad": "Diluida estable 24h. Refrigerar ampollas."
    },
    "sulfato_magnesio_obstetrico": {
        "reconstitucion": "No requiere.",
        "dilucion": "Carga: 4-6 g en 100 mL de SF 0.9%. Mantenimiento: 20 g en 500 mL SF.",
        "volumenAdministracion": "Carga: 100 mL. Mantenimiento: 500 mL.",
        "velocidadAdministracion": "Carga: 4-6 g en 15-20 min. Mantenimiento: 1-2 g/h. Monitorizar reflejos y FR.",
        "estabilidad": "Diluido estable 24h."
    },
    "labetalol": {
        "reconstitucion": "No requiere.",
        "dilucion": "Infusión: 200 mg en 200 mL de SF 0.9% o SG 5% (1 mg/mL).",
        "volumenAdministracion": "Bolo: 4 mL (20 mg). Infusión: 200 mL.",
        "velocidadAdministracion": "Bolo: 20 mg IV en 2 min, repetir cada 10 min. Infusión: 1-2 mg/min.",
        "estabilidad": "Diluido estable 24h a temperatura ambiente."
    },
    # ── Nutrición parenteral ──
    "aminoacidos_parenterales": {
        "dilucion": "Preparación de farmacia según requerimientos individuales.",
        "volumenAdministracion": "1000-2000 mL en bolsa multilumen",
        "velocidadAdministracion": "Infusión continua en 12-24h. Vía central.",
        "estabilidad": "Refrigerado: 24-48h según formulación. Proteger de la luz."
    },
    "lipidos_parenterales": {
        "dilucion": "Emulsión lista para uso. No diluir.",
        "volumenAdministracion": "250-500 mL",
        "velocidadAdministracion": "Infundir en 12-24h. No exceder 0.15 g/kg/h. Usar línea con filtro 1.2 micras.",
        "estabilidad": "24h tras apertura. No refrigerar emulsión."
    },
    "glucosa_parenteral": {
        "dilucion": "Soluciones al 5%, 10%, 20%, 50% listas para uso.",
        "volumenAdministracion": "SG 5-10%: 500-1000 mL. SG 50%: 50 mL.",
        "velocidadAdministracion": "SG 5%: 80-125 mL/h. SG 50%: 25-50 mL IV en 3-5 min (hipoglucemia).",
        "estabilidad": "24h tras apertura."
    },
    "glucosa_hipertonica": {
        "dilucion": "Solución al 50% lista para uso. Ampollas de 50 mL.",
        "volumenAdministracion": "25-50 mL (12.5-25 g de glucosa)",
        "velocidadAdministracion": "IV lento en 3-5 min por vía central o periférica gruesa. Seguir con SG 10%.",
        "estabilidad": "24h tras apertura."
    },
    # ── Biológicos ──
    "adalimumab": {
        "reconstitucion": "No requiere. Jeringa/pluma precargada.",
        "dilucion": "No diluir. Administrar SC directamente.",
        "volumenAdministracion": "0.4-0.8 mL SC",
        "velocidadAdministracion": "SC: inyección lenta. Rotar sitios de inyección.",
        "estabilidad": "Refrigerar. No congelar. Proteger de la luz."
    },
    "etanercept": {
        "reconstitucion": "Polvo: reconstituir con 1 mL de agua bacteriostática. Jeringa: lista.",
        "dilucion": "No diluir.",
        "volumenAdministracion": "SC: 0.5-1 mL",
        "velocidadAdministracion": "SC directo. Rotar sitios.",
        "estabilidad": "Refrigerar. Reconstituido: 14 días refrigerado."
    },
    # ── Anticoagulantes/Trombolíticos ──
    "tenecteplasa": {
        "reconstitucion": "Reconstituir con agua estéril proporcionada.",
        "dilucion": "No diluir más.",
        "volumenAdministracion": "Según peso: 6-10 mL",
        "velocidadAdministracion": "Bolo IV único en 5-10 segundos.",
        "estabilidad": "Reconstituido: usar inmediatamente (máx 8h refrigerado)."
    },
    "fondaparinux": {
        "reconstitucion": "No requiere. Jeringa precargada.",
        "dilucion": "No diluir.",
        "volumenAdministracion": "SC: 0.5 mL (2.5 mg) o 0.6 mL (7.5 mg)",
        "velocidadAdministracion": "SC: inyección en pliegue abdominal.",
        "estabilidad": "Conservar a temperatura ambiente."
    },
    "bivalirudina": {
        "reconstitucion": "Reconstituir 250 mg con 5 mL de agua estéril.",
        "dilucion": "Diluir en 50 mL de SG 5% o SF 0.9% (5 mg/mL).",
        "volumenAdministracion": "50 mL para infusión",
        "velocidadAdministracion": "Bolo: 0.75 mg/kg IV. Infusión: 1.75 mg/kg/h durante procedimiento.",
        "estabilidad": "Reconstituido: 24h refrigerado. Diluido: 24h a temp ambiente."
    },
    # ── Renal/Electrolitos ──
    "acetazolamida": {
        "reconstitucion": "Reconstituir 500 mg con 5 mL de agua estéril.",
        "dilucion": "Puede diluir en SF 0.9%.",
        "volumenAdministracion": "5 mL",
        "velocidadAdministracion": "IV directo en 1-2 min o IM.",
        "estabilidad": "Reconstituido: 24h refrigerado."
    },
    "clevidipino": {
        "reconstitucion": "No requiere. Emulsión lipídica lista.",
        "dilucion": "No diluir.",
        "volumenAdministracion": "50-100 mL",
        "velocidadAdministracion": "Iniciar 1-2 mg/h. Titular cada 90 seg duplicando. Máx 32 mg/h.",
        "estabilidad": "Usar dentro de 12h tras perforación. No refrigerar durante infusión."
    },
    # Lidocaína antiarrítmico
    "lidocaina_antiarritmico": {
        "reconstitucion": "No requiere.",
        "dilucion": "Infusión: diluir en 250-500 mL de SG 5%.",
        "volumenAdministracion": "Bolo: 5-10 mL. Infusión: 250-500 mL.",
        "velocidadAdministracion": "Bolo: 1-1.5 mg/kg IV en 2 min. Infusión: 1-4 mg/min.",
        "estabilidad": "Diluido estable 24h."
    },
    # Procainamida
    "procainamida": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir 1 g en 50-250 mL de SG 5%.",
        "volumenAdministracion": "50-250 mL",
        "velocidadAdministracion": "Carga: 20-50 mg/min hasta máx 17 mg/kg. Mantenimiento: 1-4 mg/min.",
        "estabilidad": "Diluido estable 24h."
    },
    # Ibutilida
    "ibutilida": {
        "reconstitucion": "No requiere.",
        "dilucion": "Puede diluir en 50 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "10-50 mL",
        "velocidadAdministracion": "Infundir 1 mg en 10 minutos. Puede repetir 1 dosis a los 10 min.",
        "estabilidad": "Diluido estable 24h."
    },
    # Fentolamina
    "fentolamina": {
        "reconstitucion": "Reconstituir 5 mg con 1 mL de agua estéril.",
        "dilucion": "Puede diluir en 10 mL de SF 0.9%.",
        "volumenAdministracion": "1-10 mL",
        "velocidadAdministracion": "Bolo IV: 5 mg en 1-2 min. Extravasación local: infiltrar zona.",
        "estabilidad": "Usar inmediatamente tras reconstitución."
    },
    # Isoprenalina
    "isoprenalina": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir 1-2 mg en 250-500 mL de SG 5%.",
        "volumenAdministracion": "250-500 mL",
        "velocidadAdministracion": "Infusión: 2-20 mcg/min. Titular según FC.",
        "estabilidad": "Proteger de la luz. Descartar si rosada."
    },
    # Urapidilo
    "urapidilo": {
        "reconstitucion": "No requiere.",
        "dilucion": "Infusión: diluir en SF 0.9% o SG 5%.",
        "volumenAdministracion": "Bolo: 2-5 mL. Infusión: 50-250 mL.",
        "velocidadAdministracion": "Bolo: 25 mg IV en 20 seg. Infusión: 9-30 mg/h.",
        "estabilidad": "Diluido estable 24h."
    },
    # ── Inmunosupresores IV ──
    "ciclosporina": {
        "reconstitucion": "No requiere para concentrado.",
        "dilucion": "Diluir en 100-250 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100-250 mL",
        "velocidadAdministracion": "Infundir en 2-6h. Monitorizar por anafilaxia (vehículo Cremophor).",
        "estabilidad": "Diluido: 24h. Usar envase de vidrio preferente."
    },
    "tacrolimus": {
        "reconstitucion": "No requiere para concentrado.",
        "dilucion": "Diluir en 250-500 mL de SF 0.9% o SG 5% (0.004-0.02 mg/mL).",
        "volumenAdministracion": "250-500 mL",
        "velocidadAdministracion": "Infusión continua en 24h. Monitorizar niveles.",
        "estabilidad": "Diluido: 24h. Usar envase no-PVC."
    },
    "micofenolato": {
        "reconstitucion": "Reconstituir 500 mg con 14 mL de SG 5%.",
        "dilucion": "Diluir en 140 mL de SG 5% (concentración 6 mg/mL).",
        "volumenAdministracion": "140-210 mL",
        "velocidadAdministracion": "Infundir en mínimo 2h. NUNCA en bolo.",
        "estabilidad": "Reconstituido: 4h a temperatura ambiente."
    },
    "vedolizumab": {
        "reconstitucion": "Reconstituir 300 mg con 4.8 mL de agua estéril.",
        "dilucion": "Diluir en 250 mL de SF 0.9%.",
        "volumenAdministracion": "250 mL",
        "velocidadAdministracion": "Infundir en 30 minutos.",
        "estabilidad": "Reconstituido: 8h refrigerado."
    },
    # Ácido zoledrónico
    "acido_zoledronico": {
        "reconstitucion": "Solución lista 4 mg/5 mL o reconstituir.",
        "dilucion": "Diluir en 100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "Infundir en mínimo 15 minutos. Hidratación previa.",
        "estabilidad": "Diluido: 24h refrigerado."
    },
    "denosumab": {
        "reconstitucion": "No requiere. Jeringa precargada.",
        "dilucion": "No diluir.",
        "volumenAdministracion": "SC: 1 mL (60 mg) o 1.7 mL (120 mg)",
        "velocidadAdministracion": "SC directo. Muslo, abdomen o brazo.",
        "estabilidad": "Refrigerar. Estable 14 días a temp ambiente."
    },
    # Omalizumab y otros biológicos respiratorios
    "omalizumab": {
        "reconstitucion": "Reconstituir 150 mg con 1.4 mL de agua estéril. Dejar reposar 15-20 min.",
        "dilucion": "No diluir.",
        "volumenAdministracion": "SC: 0.6-1.2 mL por sitio",
        "velocidadAdministracion": "SC. Observar 2h tras primera dosis (anafilaxia).",
        "estabilidad": "Reconstituido: 8h refrigerado, 4h a temp ambiente."
    },
    "mepolizumab": {
        "reconstitucion": "Reconstituir 100 mg con 1.2 mL de agua estéril.",
        "dilucion": "No diluir.",
        "volumenAdministracion": "SC: 1 mL",
        "velocidadAdministracion": "SC directo en brazo, muslo o abdomen.",
        "estabilidad": "Reconstituido: 8h a temp ambiente."
    },
    "benralizumab": {
        "reconstitucion": "No requiere. Jeringa precargada.",
        "dilucion": "No diluir.",
        "volumenAdministracion": "SC: 1 mL",
        "velocidadAdministracion": "SC directo.",
        "estabilidad": "Refrigerar. No congelar."
    },
    # Insulinas SC
    "insulina_nph": {
        "volumenAdministracion": "SC: 0.1-1 mL según dosis",
        "velocidadAdministracion": "SC únicamente. Rotar sitios de inyección.",
        "estabilidad": "Refrigerar viales sin abrir. Abierto: 28 días a temp ambiente."
    },
    "insulina_glargina": {
        "volumenAdministracion": "SC: 0.1-1 mL según dosis",
        "velocidadAdministracion": "SC 1 vez al día a la misma hora. NO administrar IV.",
        "estabilidad": "Refrigerar sin abrir. Abierto: 28 días a temp ambiente."
    },
    "insulina_lispro": {
        "volumenAdministracion": "SC: 0.1-1 mL según dosis. IV: según protocolo.",
        "velocidadAdministracion": "SC: 15 min antes de comida. IV: solo en protocolo de cetoacidosis.",
        "estabilidad": "Refrigerar sin abrir. Abierto: 28 días a temp ambiente."
    },
    "semaglutida": {
        "volumenAdministracion": "SC: pluma precargada, dosis ajustable",
        "velocidadAdministracion": "SC 1 vez/semana. Abdomen, muslo o brazo.",
        "estabilidad": "Refrigerar antes de 1er uso. Abierto: 56 días a temp ambiente."
    },
    "liraglutida": {
        "volumenAdministracion": "SC: pluma precargada",
        "velocidadAdministracion": "SC 1 vez/día. Abdomen, muslo o brazo.",
        "estabilidad": "Refrigerar antes de 1er uso. Abierto: 30 días a temp ambiente."
    },
    "dulaglutida": {
        "volumenAdministracion": "SC: 0.5 mL (pluma precargada)",
        "velocidadAdministracion": "SC 1 vez/semana.",
        "estabilidad": "Refrigerar. No congelar."
    },
    # HBPM
    "bemiparina": {
        "volumenAdministracion": "SC: 0.2-0.4 mL según dosis",
        "velocidadAdministracion": "SC en pliegue abdominal. Alternar sitios.",
        "estabilidad": "Conservar a temperatura ambiente."
    },
    # EPO
    "darbepoetina": {
        "volumenAdministracion": "SC/IV: 0.3-1 mL",
        "velocidadAdministracion": "SC directo o IV bolo lento.",
        "estabilidad": "Refrigerar. No congelar. No agitar."
    },
    # Alteplasa ACV
    "alteplasa_acv": {
        "reconstitucion": "Reconstituir con agua estéril proporcionada (1 mg/mL).",
        "dilucion": "Puede diluir en SF 0.9%.",
        "volumenAdministracion": "Según peso: 0.9 mg/kg (máx 90 mg)",
        "velocidadAdministracion": "10% en bolo IV en 1 min. Resto en infusión en 60 min.",
        "estabilidad": "Reconstituido: 8h a temp ambiente. No agitar."
    },
    # Inmunoglobulinas / Otros
    "complejo_protrombinico": {
        "reconstitucion": "Reconstituir con el diluyente proporcionado.",
        "dilucion": "No diluir más.",
        "volumenAdministracion": "20-40 mL según dosis",
        "velocidadAdministracion": "IV: máx 3 mL/min. Infundir lentamente.",
        "estabilidad": "Reconstituido: usar dentro de 4h. No refrigerar tras reconstitución."
    },
    # Sulfato de magnesio genérico
    "sulfato-magnesio": {
        "reconstitucion": "No requiere.",
        "dilucion": "Diluir en 100-250 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100-250 mL",
        "velocidadAdministracion": "1-2 g/h en infusión. Emergencia (torsade): 2 g en 2-5 min.",
        "estabilidad": "Diluido estable 24h."
    },
}

def main():
    with open(DRUGS_PATH, 'r', encoding='utf-8') as f:
        drugs = json.load(f)

    parenteral_routes = {'IV', 'IM', 'SC', 'intratecal', 'epidural'}
    updated = 0
    for drug in drugs:
        did = drug['id']
        if did in PARENTERAL_DATA:
            drug['preparacionParenteral'] = PARENTERAL_DATA[did]
            updated += 1

    with open(DRUGS_PATH, 'w', encoding='utf-8') as f:
        json.dump(drugs, f, ensure_ascii=False, indent=2)

    print(f"Updated {updated} drugs with preparacionParenteral data.")
    # Count drugs with parenteral routes but no data yet
    missing = 0
    for drug in drugs:
        has_parenteral = any(v in parenteral_routes for v in drug.get('viaAdministracion', []))
        if has_parenteral and 'preparacionParenteral' not in drug:
            missing += 1
    print(f"Drugs with parenteral routes but no prep data yet: {missing}")

if __name__ == '__main__':
    main()