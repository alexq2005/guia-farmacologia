#!/usr/bin/env python3
"""Add preparacionParenteral data to remaining 134 drugs with parenteral routes."""
import json, os

BASE = os.path.join(os.path.dirname(__file__), '..', 'src', 'data')

PARENTERAL_DATA = {
    "omeprazol": {
        "reconstitucion": "Reconstituir vial de 40 mg con 10 mL de SF 0.9%.",
        "dilucion": "Diluir en 100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "Infundir en 20-30 min. No administrar en bolo rápido.",
        "estabilidad": "Reconstituido: usar dentro de 4h. Proteger de la luz."
    },
    "levotiroxina": {
        "reconstitucion": "Reconstituir con 5 mL de SF 0.9% (no usar soluciones con conservantes).",
        "dilucion": "No requiere dilución adicional. Administrar directamente.",
        "volumenAdministracion": "5 mL",
        "velocidadAdministracion": "Inyección IV lenta en 2-3 min.",
        "estabilidad": "Usar inmediatamente tras reconstitución. No almacenar."
    },
    "ibuprofeno": {
        "dilucion": "Diluir 800 mg en al menos 200 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "200 mL",
        "velocidadAdministracion": "Infundir en 30 min (dosis ≤800 mg).",
        "estabilidad": "Diluido: 24h a temperatura ambiente."
    },
    "propranolol": {
        "dilucion": "Puede administrarse sin diluir o diluir en 10-50 mL de SG 5%.",
        "volumenAdministracion": "10-50 mL",
        "velocidadAdministracion": "Inyección IV lenta: no exceder 1 mg/min. Monitorizar ECG continuo.",
        "estabilidad": "Diluido: usar dentro de 4h."
    },
    "ranitidina": {
        "dilucion": "IV: Diluir 50 mg en 20 mL de SF 0.9% o SG 5%. IM: sin dilución.",
        "volumenAdministracion": "20 mL (IV), 2 mL (IM)",
        "velocidadAdministracion": "IV directa: administrar en al menos 5 min. Infusión: 15-20 min.",
        "estabilidad": "Diluido: 48h a temperatura ambiente."
    },
    "acido_folico": {
        "dilucion": "Puede administrarse sin diluir (IM) o diluir en SF 0.9% (IV).",
        "volumenAdministracion": "1-2 mL",
        "velocidadAdministracion": "IM: inyección profunda. IV: lenta en 1-2 min.",
        "estabilidad": "Proteger de la luz. Usar inmediatamente."
    },
    "diclofenaco": {
        "dilucion": "Uso exclusivamente IM. No administrar IV (excepto formulaciones específicas IV).",
        "volumenAdministracion": "3 mL (75 mg/3 mL ampolla)",
        "velocidadAdministracion": "IM profunda en cuadrante superior externo del glúteo. Alternar lados.",
        "estabilidad": "No mezclar con otros fármacos en la misma jeringa."
    },
    "ketorolaco": {
        "dilucion": "IV: Puede administrarse sin diluir. IM: sin dilución.",
        "volumenAdministracion": "1-2 mL",
        "velocidadAdministracion": "IV directa: administrar en al menos 15 segundos. IM: inyección profunda.",
        "estabilidad": "Proteger de la luz. No mezclar con morfina, meperidina o prometazina."
    },
    "baclofeno": {
        "dilucion": "Intratecal: usar solución específica intratecal sin conservantes.",
        "volumenAdministracion": "1-2 mL según concentración",
        "velocidadAdministracion": "Administrar mediante bomba intratecal implantable. Dosis test: bolo único.",
        "estabilidad": "Ampollas intratecales: no reutilizar. Verificar integridad del sistema."
    },
    "risperidona": {
        "reconstitucion": "Reconstituir con el diluyente proporcionado. Agitar vigorosamente por 10 seg.",
        "volumenAdministracion": "2 mL",
        "velocidadAdministracion": "IM profunda en deltoides o glúteo. No administrar IV. Rotar sitios.",
        "estabilidad": "Reconstituido: usar dentro de 6h. Mantener a temperatura ambiente."
    },
    "trimetoprima_sulfametoxazol": {
        "dilucion": "Diluir cada 5 mL (80/400 mg) en 125 mL de SG 5%. No usar SF si hay restricción de Na.",
        "volumenAdministracion": "125-500 mL según dosis",
        "velocidadAdministracion": "Infundir en 60-90 min. No administrar en bolo.",
        "estabilidad": "Diluido en SG 5%: 6h. No refrigerar (cristaliza)."
    },
    "pantoprazol": {
        "reconstitucion": "Reconstituir vial de 40 mg con 10 mL de SF 0.9%.",
        "dilucion": "Para infusión: diluir en 100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "10 mL (bolo) o 100 mL (infusión)",
        "velocidadAdministracion": "Bolo IV: administrar en al menos 2 min. Infusión: 15 min.",
        "estabilidad": "Reconstituido: 12h a temperatura ambiente. Proteger de la luz."
    },
    "metildopa": {
        "dilucion": "Diluir en 100 mL de SG 5%.",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "Infundir en 30-60 min.",
        "estabilidad": "Diluido: usar dentro de 24h. Puede oscurecerse sin pérdida de potencia."
    },
    "aripiprazol": {
        "volumenAdministracion": "IM agudo: 1.3 mL (9.75 mg). Depot: según presentación.",
        "velocidadAdministracion": "IM: inyección lenta en deltoides o glúteo. No administrar IV.",
        "estabilidad": "Solución IM: usar inmediatamente. No mezclar con otros fármacos."
    },
    "biperideno": {
        "dilucion": "Puede administrarse sin diluir (IM/IV lenta).",
        "volumenAdministracion": "1 mL (5 mg/mL)",
        "velocidadAdministracion": "IV muy lenta: administrar en al menos 3 min. IM: inyección profunda.",
        "estabilidad": "Proteger de la luz. Usar inmediatamente tras abrir ampolla."
    },
    "buprenorfina": {
        "dilucion": "IV: puede diluir en 50-100 mL de SF 0.9%. IM: sin dilución.",
        "volumenAdministracion": "1 mL (IM) o 50-100 mL (infusión IV)",
        "velocidadAdministracion": "IV lenta: administrar en al menos 2 min. IM: profunda.",
        "estabilidad": "Diluido: 24h a temperatura ambiente. Proteger de la luz."
    },
    "clonidina": {
        "dilucion": "Epidural: diluir en SF 0.9% sin conservantes a concentración 100 mcg/mL.",
        "volumenAdministracion": "Variable según protocolo epidural",
        "velocidadAdministracion": "Infusión epidural continua según protocolo de dolor.",
        "estabilidad": "Solución epidural: 14 días refrigerada."
    },
    "doxiciclina": {
        "reconstitucion": "Reconstituir 100 mg con 10 mL de agua estéril o SF 0.9%.",
        "dilucion": "Diluir en 100-1000 mL de SF 0.9% o SG 5%. Concentración: 0.1-1 mg/mL.",
        "volumenAdministracion": "100-1000 mL",
        "velocidadAdministracion": "Infundir 100 mg en 1-4 horas. Evitar infusión rápida.",
        "estabilidad": "Diluido en SF: 72h refrigerado. Proteger de luz directa."
    },
    "isoniazida": {
        "volumenAdministracion": "Según presentación IM",
        "velocidadAdministracion": "IM profunda. Vía IV no recomendada de rutina.",
        "estabilidad": "Proteger de la luz. Descartar si cambia de color."
    },
    "rifampicina": {
        "reconstitucion": "Reconstituir vial de 600 mg con 10 mL de agua estéril.",
        "dilucion": "Diluir en 250-500 mL de SG 5% (preferido) o SF 0.9%.",
        "volumenAdministracion": "500 mL",
        "velocidadAdministracion": "Infundir en 2-3 horas. No administrar en bolo.",
        "estabilidad": "Diluido en SG 5%: 8h. En SF: 24h a temperatura ambiente."
    },
    "desmopresina": {
        "dilucion": "IV: Diluir en 10-50 mL de SF 0.9%. SC: sin dilución.",
        "volumenAdministracion": "10-50 mL (IV) o 1 mL (SC)",
        "velocidadAdministracion": "IV: infundir en 15-30 min. SC: inyección subcutánea directa.",
        "estabilidad": "Diluido: usar inmediatamente. Refrigerar ampollas sin abrir."
    },
    "progesterona": {
        "dilucion": "IM: Administrar sin diluir (solución oleosa).",
        "volumenAdministracion": "1-2 mL",
        "velocidadAdministracion": "IM profunda en glúteo. Calentar ampolla a temperatura corporal antes de inyectar.",
        "estabilidad": "Almacenar a temperatura ambiente. Proteger de la luz."
    },
    "ergometrina": {
        "dilucion": "IV: Diluir en 5 mL de SF 0.9%. IM: sin dilución.",
        "volumenAdministracion": "1 mL (IM) o 5 mL (IV)",
        "velocidadAdministracion": "IV lenta: administrar en al menos 1 min. Solo en emergencias. IM preferida.",
        "estabilidad": "Refrigerar 2-8°C. Proteger de la luz. Descartar si descolorada."
    },
    "alopurinol": {
        "reconstitucion": "Reconstituir 500 mg con 25 mL de agua estéril.",
        "dilucion": "Diluir en 50-100 mL de SF 0.9% o SG 5%. Concentración máx: 6 mg/mL.",
        "volumenAdministracion": "50-100 mL",
        "velocidadAdministracion": "Infundir como dosis única diaria en 30-60 min.",
        "estabilidad": "Reconstituido: 10h a temperatura ambiente. No refrigerar."
    },
    "metotrexato": {
        "reconstitucion": "Reconstituir con SF 0.9% sin conservantes (intratecal: exclusivamente).",
        "dilucion": "IV: diluir en 100-500 mL de SG 5% o SF 0.9%. Intratecal: sin conservantes.",
        "volumenAdministracion": "Variable según protocolo (bolo: 10-20 mL, infusión: 100-500 mL, intratecal: 5-15 mL)",
        "velocidadAdministracion": "Bolo: 1-5 min. Infusión alta dosis: 4-36h según protocolo. Monitorizar función renal.",
        "estabilidad": "Reconstituido: 24h a temperatura ambiente. Intratecal: usar inmediatamente."
    },
    "clorpromazina": {
        "dilucion": "IM: sin dilución. IV: diluir 25 mg en 25 mL de SF 0.9%.",
        "volumenAdministracion": "1-2 mL (IM) o 25 mL (IV)",
        "velocidadAdministracion": "IM profunda (no SC, causa necrosis). IV: administrar a ≤1 mg/min.",
        "estabilidad": "Proteger de la luz (fotosensible). Descartar si marcadamente descolorada."
    },
    "sumatriptan": {
        "volumenAdministracion": "0.5 mL (6 mg/0.5 mL)",
        "velocidadAdministracion": "SC: inyección subcutánea en brazo o muslo. No administrar IV.",
        "estabilidad": "Proteger de la luz y calor. Almacenar a temperatura ambiente."
    },
    "difenhidramina": {
        "dilucion": "IV: diluir en 10-20 mL de SF 0.9%. IM: sin dilución.",
        "volumenAdministracion": "1 mL (IM) o 10-20 mL (IV)",
        "velocidadAdministracion": "IV: administrar a ≤25 mg/min. IM: inyección profunda en músculo grande.",
        "estabilidad": "Proteger de la luz. Compatible con la mayoría de soluciones IV comunes."
    },
    "sildenafilo": {
        "dilucion": "Administrar sin diluir (solución inyectable de 10 mg/12.5 mL).",
        "volumenAdministracion": "12.5 mL para 10 mg",
        "velocidadAdministracion": "Bolo IV directo. Para hipertensión pulmonar: 3 veces/día.",
        "estabilidad": "Almacenar a temperatura ambiente. No refrigerar."
    },
    "calcitriol": {
        "dilucion": "Administrar sin diluir (bolo IV directo).",
        "volumenAdministracion": "1 mL",
        "velocidadAdministracion": "Bolo IV directo al final de la hemodiálisis a través de la línea.",
        "estabilidad": "Proteger de la luz. Refrigerar ampollas."
    },
    "tiamina": {
        "dilucion": "IV: diluir en 100 mL de SF 0.9% o SG 5%. IM: sin dilución.",
        "volumenAdministracion": "100 mL (IV) o 1-2 mL (IM)",
        "velocidadAdministracion": "IV: infundir en 30 min. Tener adrenalina disponible (riesgo anafilaxia). IM: profunda.",
        "estabilidad": "Diluido: usar dentro de 24h. Proteger de la luz."
    },
    "azatioprina": {
        "reconstitucion": "Reconstituir 50 mg con 5-15 mL de agua estéril.",
        "dilucion": "Diluir en 20-200 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "20-200 mL",
        "velocidadAdministracion": "Infusión: 30-60 min. Bolo: 1-5 min. pH alcalino (irritante).",
        "estabilidad": "Reconstituido: 24h a temperatura ambiente. Proteger de la luz."
    },
    "carbetocina": {
        "dilucion": "Administrar sin diluir o diluir en SF 0.9%.",
        "volumenAdministracion": "1 mL (100 mcg)",
        "velocidadAdministracion": "IV bolo lento en 1 min. IM: dosis única tras alumbramiento.",
        "estabilidad": "Refrigerar 2-8°C. Dosis única, no reutilizar."
    },
    "atosiban": {
        "dilucion": "Bolo: sin diluir. Infusión: diluir en 100-500 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "0.9 mL (bolo) + 100-500 mL (infusión)",
        "velocidadAdministracion": "Bolo: 6.75 mg en 1 min. Luego infusión: 18 mg/h x 3h, después 6 mg/h hasta 45h.",
        "estabilidad": "Diluido: 24h a temperatura ambiente."
    },
    "medroxiprogesterona": {
        "volumenAdministracion": "1 mL (150 mg/mL)",
        "velocidadAdministracion": "IM profunda en glúteo o deltoides. Agitar bien antes de usar.",
        "estabilidad": "Almacenar a temperatura ambiente. No congelar."
    },
    "calcitonina": {
        "dilucion": "IM/SC: sin dilución.",
        "volumenAdministracion": "0.5-1 mL",
        "velocidadAdministracion": "SC preferida (menor dolor). IM para volúmenes >2 mL. Rotar sitios.",
        "estabilidad": "Refrigerar 2-8°C. Dejar alcanzar temperatura ambiente antes de inyectar."
    },
    "teriparatida": {
        "volumenAdministracion": "Pluma precargada: 0.04 mL por dosis (20 mcg)",
        "velocidadAdministracion": "SC en muslo o abdomen. Rotar sitios de inyección.",
        "estabilidad": "Refrigerar. En uso: máximo 28 días refrigerado. No congelar."
    },
    "ritodrina": {
        "dilucion": "Diluir 50 mg (1 ampolla) en 500 mL de SF 0.9% (concentración: 0.1 mg/mL).",
        "volumenAdministracion": "500 mL",
        "velocidadAdministracion": "Iniciar 0.05 mg/min (50 mcg/min), incrementar cada 10 min. Máx 0.35 mg/min. Monitorizar FC materna.",
        "estabilidad": "Diluido: 48h a temperatura ambiente. No usar si cambia de color."
    },
    "claritromicina": {
        "reconstitucion": "Reconstituir 500 mg con 10 mL de agua estéril.",
        "dilucion": "Diluir en 250 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "250 mL",
        "velocidadAdministracion": "Infundir en 60 min. No administrar en bolo.",
        "estabilidad": "Reconstituido: 24h a temperatura ambiente o 48h refrigerado."
    },
    "eritromicina": {
        "reconstitucion": "Reconstituir con 10 mL de agua estéril.",
        "dilucion": "Diluir en 100-250 mL de SF 0.9%. Concentración: 1-5 mg/mL.",
        "volumenAdministracion": "100-250 mL",
        "velocidadAdministracion": "Infundir en 20-60 min. Infusión lenta para evitar flebitis y arritmias.",
        "estabilidad": "Diluido en SF: 8h a temperatura ambiente. Incompatible con SG 5% ácida."
    },
    "moxifloxacino": {
        "dilucion": "Solución lista para infusión (400 mg/250 mL). No requiere dilución.",
        "volumenAdministracion": "250 mL",
        "velocidadAdministracion": "Infundir en 60 min. No administrar en bolo. Evitar administración rápida.",
        "estabilidad": "No refrigerar. Proteger de la luz. Usar tras abrir."
    },
    "cloxacilina": {
        "reconstitucion": "Reconstituir 1-2 g con 10 mL de agua estéril.",
        "dilucion": "Diluir en 100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "Bolo IV: administrar en 3-5 min. Infusión: 30-60 min.",
        "estabilidad": "Reconstituido: 6h a temperatura ambiente. Refrigerado: 48h."
    },
    "penicilina_g": {
        "reconstitucion": "Reconstituir con agua estéril: 1 MUI en 5 mL.",
        "dilucion": "IV: diluir en 50-100 mL de SF 0.9% o SG 5%. IM: usar procaína o benzatínica.",
        "volumenAdministracion": "50-100 mL (IV) o 3-5 mL (IM)",
        "velocidadAdministracion": "IV intermitente: 15-30 min. IV continua: según protocolo. IM profunda en glúteo.",
        "estabilidad": "Reconstituido: 24h refrigerado. Potásica: cuidado con hiperpotasemia a dosis altas IV."
    },
    "cefuroxima": {
        "reconstitucion": "Reconstituir 750 mg con 8 mL de agua estéril.",
        "dilucion": "IV: diluir en 50-100 mL de SF 0.9% o SG 5%. IM: sin dilución adicional.",
        "volumenAdministracion": "50-100 mL (IV) o 3 mL (IM)",
        "velocidadAdministracion": "Bolo IV: 3-5 min. Infusión: 15-30 min. IM profunda.",
        "estabilidad": "Reconstituido: 24h a temperatura ambiente. Color ámbar es normal."
    },
    "amoxicilina_clavulanico": {
        "reconstitucion": "Reconstituir vial 1g/200mg con 20 mL de agua estéril.",
        "dilucion": "Diluir en 100 mL de SF 0.9%. No usar SG 5% (inestable).",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "Infundir en 30-40 min. Iniciar dentro de 20 min tras reconstitución.",
        "estabilidad": "Reconstituido: usar dentro de 20 min. Muy inestable en solución."
    },
    "hidralazina": {
        "dilucion": "IV: diluir 20 mg en 20 mL de SF 0.9%. IM: sin dilución.",
        "volumenAdministracion": "1 mL (IM) o 20 mL (IV)",
        "velocidadAdministracion": "IV lenta: administrar en 1-2 min. Monitorizar PA cada 5 min.",
        "estabilidad": "Diluido: usar inmediatamente (cambia de color rápidamente). Fotosensible."
    },
    "iloprost": {
        "dilucion": "Diluir en SF 0.9% o SG 5% a concentración 0.2-2 mcg/mL.",
        "volumenAdministracion": "50-250 mL según concentración",
        "velocidadAdministracion": "Infusión IV continua: iniciar 0.5 ng/kg/min, titular hasta 2 ng/kg/min.",
        "estabilidad": "Diluido: 24h a temperatura ambiente. Proteger de la luz."
    },
    "bumetanida": {
        "dilucion": "IV: puede administrarse sin diluir o en 50 mL de SF 0.9%.",
        "volumenAdministracion": "2-4 mL (bolo) o 50 mL (infusión)",
        "velocidadAdministracion": "IV directa: 1-2 min. Infusión continua: 0.5-2 mg/h.",
        "estabilidad": "Diluido: 24h a temperatura ambiente. Proteger de la luz."
    },
    "fenoldopam": {
        "dilucion": "Diluir 10 mg en 250 mL de SF 0.9% o SG 5% (concentración 40 mcg/mL).",
        "volumenAdministracion": "250 mL",
        "velocidadAdministracion": "Infusión continua: iniciar 0.1 mcg/kg/min, titular cada 15 min. Máx 1.6 mcg/kg/min.",
        "estabilidad": "Diluido: 24h a temperatura ambiente. No usar si descolorada."
    },
    "insulina_detemir": {
        "volumenAdministracion": "Variable según dosis (pluma precargada)",
        "velocidadAdministracion": "SC: inyectar en abdomen, muslo o deltoides. No administrar IV.",
        "estabilidad": "Sin abrir: refrigerar. En uso: 42 días a temperatura ambiente."
    },
    "insulina_aspart": {
        "dilucion": "IV: diluir en SF 0.9% a concentración 0.05-1 UI/mL.",
        "volumenAdministracion": "SC: variable. IV: 50-100 mL",
        "velocidadAdministracion": "SC: inmediatamente antes de comida. IV: infusión continua con monitorización glucemia horaria.",
        "estabilidad": "SC: 28 días a temperatura ambiente. IV diluido: 24h en SF a temperatura ambiente."
    },
    "betametasona_sistemica": {
        "dilucion": "IV: puede diluir en SF 0.9% o SG 5%. IM: sin dilución (suspensión).",
        "volumenAdministracion": "1-2 mL",
        "velocidadAdministracion": "IV lenta directa o infusión corta. IM profunda en glúteo.",
        "estabilidad": "Almacenar a temperatura ambiente. No congelar suspensión."
    },
    "lanreotida": {
        "volumenAdministracion": "Jeringa precargada (60, 90 o 120 mg)",
        "velocidadAdministracion": "SC profunda en glúteo. Alternar lados cada mes.",
        "estabilidad": "Refrigerar 2-8°C. Sacar 30 min antes de inyectar."
    },
    "somatropina": {
        "reconstitucion": "Reconstituir con el diluyente proporcionado. No agitar, rotar suavemente.",
        "volumenAdministracion": "Variable según presentación y dosis",
        "velocidadAdministracion": "SC: inyectar en abdomen, muslo o brazo. Rotar sitios. Administrar por la noche.",
        "estabilidad": "Reconstituido: 14-28 días refrigerado según presentación. No congelar."
    },
    "esomeprazol": {
        "reconstitucion": "Reconstituir 40 mg con 5 mL de SF 0.9%.",
        "dilucion": "Para infusión: diluir en 100 mL de SF 0.9%.",
        "volumenAdministracion": "5 mL (bolo) o 100 mL (infusión)",
        "velocidadAdministracion": "Bolo: 3 min mínimo. Infusión: 10-30 min.",
        "estabilidad": "Reconstituido: 12h a temperatura ambiente."
    },
    "famotidina": {
        "dilucion": "IV push: diluir 20 mg en 10 mL de SF 0.9%. Infusión: en 100 mL.",
        "volumenAdministracion": "10 mL (push) o 100 mL (infusión)",
        "velocidadAdministracion": "IV push: administrar en al menos 2 min. Infusión: 15-30 min.",
        "estabilidad": "Diluido: 48h a temperatura ambiente. Compatible con NPT."
    },
    "granisetron": {
        "dilucion": "Diluir en 20-50 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "20-50 mL",
        "velocidadAdministracion": "IV: infundir en 5 min. Administrar 30 min antes de quimioterapia.",
        "estabilidad": "Diluido: 24h a temperatura ambiente."
    },
    "escopolamina": {
        "dilucion": "IV: diluir en 10 mL de SF 0.9%. IM: sin dilución.",
        "volumenAdministracion": "1 mL (IM) o 10 mL (IV)",
        "velocidadAdministracion": "IV lenta: administrar en 2-3 min. IM: inyección profunda.",
        "estabilidad": "Proteger de la luz. Almacenar a temperatura ambiente."
    },
    "bromhexina": {
        "dilucion": "Diluir en 100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "Infundir lentamente en 15-30 min.",
        "estabilidad": "Diluido: usar dentro de 24h."
    },
    "ambroxol": {
        "dilucion": "Diluir en 100-500 mL de SF 0.9%, Ringer o SG 5%.",
        "volumenAdministracion": "100-500 mL",
        "velocidadAdministracion": "Infusión lenta. Para SDR neonatal: según protocolo específico.",
        "estabilidad": "Diluido: 24h a temperatura ambiente. pH <6.3 puede precipitar."
    },
    "hidroxizina": {
        "dilucion": "IM exclusivamente. No administrar IV ni SC (trombosis, necrosis).",
        "volumenAdministracion": "1-2 mL",
        "velocidadAdministracion": "IM profunda en músculo grande (glúteo). No inyectar en nervios.",
        "estabilidad": "Almacenar a temperatura ambiente. Proteger de la luz."
    },
    "acido_aminocaproico": {
        "dilucion": "Diluir en SF 0.9%, SG 5% o Ringer. Típico: 5 g en 250 mL.",
        "volumenAdministracion": "250 mL para dosis de carga",
        "velocidadAdministracion": "Carga: 5 g en 1 hora. Mantenimiento: 1-1.25 g/h. No exceder 5 g en 1 hora.",
        "estabilidad": "Diluido: 24h a temperatura ambiente."
    },
    "cianocobalamina": {
        "dilucion": "IM/SC: administrar sin diluir.",
        "volumenAdministracion": "1 mL (1000 mcg/mL)",
        "velocidadAdministracion": "IM profunda o SC. Para anemia perniciosa: esquema de mantenimiento mensual.",
        "estabilidad": "Proteger de la luz. Almacenar a temperatura ambiente."
    },
    "deferoxamina": {
        "reconstitucion": "Reconstituir 500 mg con 5 mL de agua estéril.",
        "dilucion": "IV: diluir en SF 0.9%, SG 5% o Ringer. SC: puede usar sin diluir.",
        "volumenAdministracion": "Variable según vía (SC: 5-10 mL, IV: 100-500 mL)",
        "velocidadAdministracion": "IV: no exceder 15 mg/kg/h. SC: infusión lenta 8-12h con bomba portátil.",
        "estabilidad": "Reconstituido: 24h a temperatura ambiente."
    },
    "acido_folico_hematologico": {
        "dilucion": "IV/IM: administrar sin diluir o diluir en SF 0.9%.",
        "volumenAdministracion": "1-5 mL",
        "velocidadAdministracion": "IV lenta o IM profunda. Para megaloblástica: esquema de carga.",
        "estabilidad": "Proteger de la luz. Almacenar a temperatura ambiente."
    },
    "dimercaprol": {
        "volumenAdministracion": "Según peso: 2.5-5 mg/kg por inyección",
        "velocidadAdministracion": "IM profunda exclusivamente. Muy doloroso. No administrar IV.",
        "estabilidad": "Almacenar a temperatura ambiente. Solución oleosa de cacahuete."
    },
    "edetato_calcico": {
        "dilucion": "IV: diluir en 250-500 mL de SF 0.9% o SG 5%. IM: mezclar con procaína 1%.",
        "volumenAdministracion": "250-500 mL (IV) o 3-5 mL (IM)",
        "velocidadAdministracion": "IV: infundir en al menos 1 hora (preferible 2-4h). No dar en bolo.",
        "estabilidad": "Diluido: 24h a temperatura ambiente."
    },
    "pralidoxima": {
        "reconstitucion": "Reconstituir 1 g con 20 mL de agua estéril.",
        "dilucion": "Diluir en 100 mL de SF 0.9%.",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "IV: infundir en 15-30 min. No exceder 200 mg/min (fasciculaciones, rigidez).",
        "estabilidad": "Reconstituido: usar inmediatamente. Descartar si turbio."
    },
    "fisostigmina": {
        "dilucion": "Puede administrarse sin diluir.",
        "volumenAdministracion": "2 mL (1 mg/mL)",
        "velocidadAdministracion": "IV muy lenta: no exceder 1 mg/min en adultos, 0.5 mg/min en niños. Monitorizar ECG.",
        "estabilidad": "Proteger de la luz. Refrigerar."
    },
    "fomepizol": {
        "dilucion": "Diluir en al menos 100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100-250 mL",
        "velocidadAdministracion": "Infundir en 30 min. Dosis carga: 15 mg/kg, luego 10 mg/kg cada 12h.",
        "estabilidad": "Diluido: 24h a temperatura ambiente. Solidifica a <25°C, calentar antes."
    },
    "hidroxocobalamina_antidoto": {
        "reconstitucion": "Reconstituir 5 g con 200 mL de SF 0.9% (no usar Ringer ni SG).",
        "volumenAdministracion": "200 mL por vial de 5 g",
        "velocidadAdministracion": "Infundir 5 g en 15 min. Segunda dosis (5 g) en 15 min-2h según gravedad.",
        "estabilidad": "Reconstituido: 6h a temperatura ambiente. Color rojo oscuro es normal."
    },
    "desferoxamina_antidoto": {
        "reconstitucion": "Reconstituir 500 mg con 5 mL de agua estéril.",
        "dilucion": "IV: diluir en SF 0.9%, SG 5% o Ringer.",
        "volumenAdministracion": "100-500 mL para infusión IV",
        "velocidadAdministracion": "IV: no exceder 15 mg/kg/h. Típico: 1-2 g en 4-6h. IM: si acceso IV no disponible.",
        "estabilidad": "Reconstituido: 24h a temperatura ambiente. Solución transparente a ligeramente amarilla."
    },
    "vecuronio": {
        "reconstitucion": "Reconstituir 10 mg con 10 mL de agua estéril (1 mg/mL).",
        "dilucion": "Para infusión: diluir en SF 0.9% o SG 5%.",
        "volumenAdministracion": "10 mL (bolo) o 50-100 mL (infusión)",
        "velocidadAdministracion": "Bolo: 0.08-0.1 mg/kg en 60 seg. Infusión: 0.8-1.2 mcg/kg/min.",
        "estabilidad": "Reconstituido: 24h refrigerado. 48h a temperatura ambiente según fabricante."
    },
    "meloxicam": {
        "volumenAdministracion": "1.5 mL (15 mg/1.5 mL)",
        "velocidadAdministracion": "IM profunda en glúteo. No administrar IV. Máximo 1-2 días IM.",
        "estabilidad": "Almacenar a temperatura ambiente. Proteger de la luz."
    },
    "indometacina": {
        "reconstitucion": "Reconstituir 1 mg con 1-2 mL de SF 0.9% sin conservantes.",
        "dilucion": "No requiere dilución adicional para cierre de ductus.",
        "volumenAdministracion": "1-2 mL",
        "velocidadAdministracion": "IV: administrar en 20-30 min. Uso neonatal para cierre de ductus arterioso.",
        "estabilidad": "Reconstituido: usar inmediatamente. No contiene conservantes."
    },
    "cefotaxima": {
        "reconstitucion": "Reconstituir 1 g con 10 mL de agua estéril.",
        "dilucion": "IV: diluir en 50-100 mL de SF 0.9% o SG 5%. IM: sin dilución.",
        "volumenAdministracion": "50-100 mL (IV) o 3-4 mL (IM)",
        "velocidadAdministracion": "Bolo IV: 3-5 min. Infusión: 20-30 min. IM profunda.",
        "estabilidad": "Reconstituido: 24h refrigerado. Color amarillo pálido es normal."
    },
    "doripenem": {
        "reconstitucion": "Reconstituir 500 mg con 10 mL de agua estéril.",
        "dilucion": "Diluir en 100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "Infundir en 1 hora (estándar) o 4 horas (infusión extendida para gravedad).",
        "estabilidad": "En SF: 12h a temperatura ambiente, 72h refrigerado. En SG: 4h a temp. ambiente."
    },
    "tirzepatida": {
        "volumenAdministracion": "Pluma precargada (0.5 mL)",
        "velocidadAdministracion": "SC en abdomen, muslo o brazo. Rotar sitios. Una vez por semana, mismo día.",
        "estabilidad": "Refrigerar 2-8°C. En uso a temp. ambiente: 21 días. No congelar."
    },
    "metamizol": {
        "dilucion": "IV: diluir 1 ampolla (2.5 g/5 mL) en 100 mL de SF 0.9%. IM: sin dilución.",
        "volumenAdministracion": "5 mL (IM) o 100 mL (IV)",
        "velocidadAdministracion": "IV muy lenta: 1 mL/min (500 mg/min máx) por riesgo de hipotensión severa. Paciente acostado.",
        "estabilidad": "Diluido: usar dentro de 4h. No mezclar con otros fármacos."
    },
    "albiglutida": {
        "volumenAdministracion": "Pluma precargada: variable según dosis (5-20 mcg)",
        "velocidadAdministracion": "SC en abdomen, muslo o brazo. Rotar sitios.",
        "estabilidad": "Refrigerar. Pluma en uso: 30 días a temperatura ambiente."
    },
    "tedizolid": {
        "dilucion": "Reconstituir 200 mg con 4 mL de agua estéril, luego diluir en 250 mL de SF 0.9%.",
        "volumenAdministracion": "250 mL",
        "velocidadAdministracion": "Infundir en 1 hora. No administrar en bolo.",
        "estabilidad": "Reconstituido: 24h a temperatura ambiente. Diluido: 24h."
    },
    "andexanet_alfa": {
        "reconstitucion": "Reconstituir cada vial de 200 mg con 20 mL de agua estéril.",
        "dilucion": "No requiere dilución adicional tras reconstitución.",
        "volumenAdministracion": "Bolo: variable (400-800 mg). Infusión: según protocolo.",
        "velocidadAdministracion": "Bolo IV: 15-30 mg/min. Seguido de infusión: 4-8 mg/min por 120 min.",
        "estabilidad": "Reconstituido: usar dentro de 8h refrigerado o 2h a temperatura ambiente."
    },
    "noretisterona": {
        "volumenAdministracion": "1 mL (200 mg/mL)",
        "velocidadAdministracion": "IM profunda en glúteo. Solución oleosa, inyectar lentamente.",
        "estabilidad": "Almacenar a temperatura ambiente. Proteger de la luz."
    },
    "dexmedetomidina_nasal": {
        "dilucion": "Diluir 200 mcg/2 mL (1 ampolla) en 48 mL de SF 0.9% (concentración 4 mcg/mL).",
        "volumenAdministracion": "50 mL (para infusión IV de angiotensina II)",
        "velocidadAdministracion": "Infusión continua: iniciar 20 ng/kg/min, titular cada 5 min. Rango: 1.25-80 ng/kg/min.",
        "estabilidad": "Diluido: 24h a temperatura ambiente o refrigerado."
    },
    "acetilcisteina_inhalada": {
        "dilucion": "IV (antídoto paracetamol): diluir en SG 5% según peso. No usar SF si posible.",
        "volumenAdministracion": "Esquema 3 bolsas: 200 mL + 500 mL + 1000 mL",
        "velocidadAdministracion": "Protocolo 21h: 150 mg/kg en 1h, luego 50 mg/kg en 4h, luego 100 mg/kg en 16h.",
        "estabilidad": "Diluido: 24h a temperatura ambiente."
    },
    "ampicilina_sulbactam": {
        "reconstitucion": "Reconstituir 1.5 g (1g/0.5g) con 3.2 mL de agua estéril (IM) o 10 mL (IV).",
        "dilucion": "IV: diluir en 50-100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "50-100 mL (IV) o 3.2 mL (IM)",
        "velocidadAdministracion": "Bolo IV: 10-15 min. Infusión: 15-30 min. IM profunda.",
        "estabilidad": "En SF: 8h a temperatura ambiente, 48h refrigerado. En SG: 4h."
    },
    "ketoprofeno": {
        "dilucion": "IV: diluir 100 mg en 100-150 mL de SF 0.9%. IM: sin dilución.",
        "volumenAdministracion": "2 mL (IM) o 100-150 mL (IV)",
        "velocidadAdministracion": "IV: infundir en 20 min mínimo. IM profunda en glúteo.",
        "estabilidad": "Diluido: usar dentro de 24h. Proteger de la luz."
    },
    "lornoxicam": {
        "reconstitucion": "Reconstituir 8 mg con 2 mL de agua estéril.",
        "dilucion": "IV: puede administrar sin dilución adicional.",
        "volumenAdministracion": "2 mL",
        "velocidadAdministracion": "IV: administrar en al menos 15 segundos. IM: inyección profunda.",
        "estabilidad": "Reconstituido: usar inmediatamente. Color amarillo claro."
    },
    "ceftolozano_tazobactam": {
        "reconstitucion": "Reconstituir con 10 mL de SF 0.9% o agua estéril.",
        "dilucion": "Diluir en 100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "Infundir en 1 hora.",
        "estabilidad": "Reconstituido: 1h. Diluido: 24h a temperatura ambiente, 7 días refrigerado."
    },
    "ceftarolina": {
        "reconstitucion": "Reconstituir 600 mg con 20 mL de agua estéril.",
        "dilucion": "Diluir en 250 mL de SF 0.9%, SG 5% o Ringer.",
        "volumenAdministracion": "250 mL",
        "velocidadAdministracion": "Infundir en 60 min (5-120 min aceptable).",
        "estabilidad": "Reconstituido: 6h a temperatura ambiente. Diluido: 6h temp ambiente, 24h refrigerado."
    },
    "torasemida": {
        "dilucion": "Puede administrarse sin diluir (bolo) o en 50-100 mL de SF 0.9%.",
        "volumenAdministracion": "2-4 mL (bolo) o 50-100 mL (infusión)",
        "velocidadAdministracion": "IV lenta: administrar en 2-3 min. Infusión: 15-30 min.",
        "estabilidad": "Almacenar a temperatura ambiente. Proteger de la luz."
    },
    "metocarbamol": {
        "dilucion": "IV: puede diluir en SF 0.9% o SG 5%. No diluir más de 250 mg en 250 mL.",
        "volumenAdministracion": "10 mL (bolo) o 250 mL (infusión)",
        "velocidadAdministracion": "IV: máximo 3 mL/min (300 mg/min). IM: máximo 5 mL por sitio.",
        "estabilidad": "Diluido: 24h a temperatura ambiente. No refrigerar."
    },
    "dexketoprofeno": {
        "dilucion": "IV: diluir 50 mg en 30-100 mL de SF 0.9% o SG 5%. IM: sin dilución.",
        "volumenAdministracion": "2 mL (IM) o 30-100 mL (IV)",
        "velocidadAdministracion": "Bolo IV lento: 15 seg-5 min. Infusión: 10-30 min. IM profunda.",
        "estabilidad": "Diluido: 24h a temperatura ambiente. Proteger de la luz."
    },
    "letermovir": {
        "dilucion": "Diluir en 250 mL de SF 0.9% o SG 5% (no en Ringer).",
        "volumenAdministracion": "250 mL",
        "velocidadAdministracion": "Infundir en 1 hora mediante bomba. No administrar en bolo.",
        "estabilidad": "Diluido: 24h a temperatura ambiente + 48h refrigerado."
    },
    "dupilumab": {
        "volumenAdministracion": "Jeringa precargada: 1.14 mL (300 mg) o 2 mL (200 mg)",
        "velocidadAdministracion": "SC: inyectar en muslo, abdomen o brazo. Rotar sitios. No inyectar en piel lesionada.",
        "estabilidad": "Refrigerar 2-8°C. A temperatura ambiente: 14 días. No congelar."
    },
    "ceftazidima_avibactam": {
        "reconstitucion": "Reconstituir con 10 mL de agua estéril. Agitar para disolver.",
        "dilucion": "Diluir en 100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "Infundir en 2 horas.",
        "estabilidad": "Reconstituido: 12h refrigerado. Diluido: 12h temp ambiente, 24h refrigerado."
    },
    "meropenem_vaborbactam": {
        "reconstitucion": "Reconstituir cada vial con 20 mL de SF 0.9%.",
        "dilucion": "Diluir dosis en 250 mL de SF 0.9%.",
        "volumenAdministracion": "250 mL",
        "velocidadAdministracion": "Infundir en 3 horas (infusión prolongada).",
        "estabilidad": "Reconstituido: 1h. Diluido: 4h a temperatura ambiente, 22h refrigerado."
    },
    "plazomicina": {
        "dilucion": "Diluir en 50-100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "50-100 mL",
        "velocidadAdministracion": "Infundir en 30 min. Monitorizar niveles séricos (aminoglucósido).",
        "estabilidad": "Diluido: 24h a temperatura ambiente."
    },
    "vernakalant": {
        "dilucion": "Diluir en 100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "100 mL",
        "velocidadAdministracion": "Infundir 3 mg/kg en 10 min. Segunda dosis (2 mg/kg) tras 15 min si necesario.",
        "estabilidad": "Diluido: 24h a temperatura ambiente."
    },
    "levotiroxina_iv": {
        "reconstitucion": "Reconstituir con 5 mL de SF 0.9% sin conservantes.",
        "dilucion": "No requiere dilución adicional.",
        "volumenAdministracion": "5 mL",
        "velocidadAdministracion": "IV directa lenta en 2-3 min. Para coma mixedematoso: 200-500 mcg inicial.",
        "estabilidad": "Reconstituido: usar inmediatamente. No almacenar."
    },
    "romiplostim": {
        "reconstitucion": "Reconstituir con agua estéril: 250 mcg en 0.72 mL, 500 mcg en 1.2 mL.",
        "volumenAdministracion": "≤1.2 mL",
        "velocidadAdministracion": "SC: inyección subcutánea una vez por semana. No administrar IV.",
        "estabilidad": "Reconstituido: 24h refrigerado. Proteger de la luz."
    },
    "secukinumab": {
        "volumenAdministracion": "Pluma/jeringa precargada: 1 mL (150 mg)",
        "velocidadAdministracion": "SC: inyectar en muslo, abdomen o brazo. Rotar sitios.",
        "estabilidad": "Refrigerar 2-8°C. A temperatura ambiente: 4 días. No congelar."
    },
    "brivaracetam": {
        "dilucion": "Puede administrarse sin diluir o en 100 mL de SF 0.9%, SG 5% o Ringer.",
        "volumenAdministracion": "5 mL (bolo) o 100 mL (infusión)",
        "velocidadAdministracion": "Bolo IV: administrar en 2 min. Infusión: 15 min.",
        "estabilidad": "Diluido: 24h almacenado en bolsa PVC a temperatura ambiente."
    },
    "betametasona_prenatal": {
        "volumenAdministracion": "1 mL (6 mg/mL fosfato + acetato)",
        "velocidadAdministracion": "IM profunda en glúteo. 2 dosis de 12 mg separadas por 24h para maduración pulmonar fetal.",
        "estabilidad": "Almacenar a temperatura ambiente. No congelar. Proteger de la luz."
    },
    "naltrexona": {
        "reconstitucion": "Reconstituir con diluyente proporcionado (depot IM).",
        "volumenAdministracion": "3.4 mL (380 mg depot)",
        "velocidadAdministracion": "IM profunda en glúteo, alternando lados cada mes. No administrar IV ni SC.",
        "estabilidad": "Kit sin abrir: refrigerar. Reconstituido: usar inmediatamente."
    },
    "ixekizumab": {
        "volumenAdministracion": "Pluma/jeringa precargada: 1 mL (80 mg)",
        "velocidadAdministracion": "SC: inyectar en muslo, abdomen o brazo. Rotar sitios. No inyectar en placas de psoriasis.",
        "estabilidad": "Refrigerar 2-8°C. A temperatura ambiente: 5 días. No congelar."
    },
    "alprostadil": {
        "dilucion": "Diluir 500 mcg en 250 mL de SF 0.9% o SG 5% (2 mcg/mL).",
        "volumenAdministracion": "250 mL",
        "velocidadAdministracion": "Neonatos (ductus): 0.05-0.1 mcg/kg/min. Adultos (enfermedad vascular): 1-3h.",
        "estabilidad": "Diluido: 24h a temperatura ambiente. Proteger de la luz."
    },
    "clorotiazida": {
        "reconstitucion": "Reconstituir 500 mg con 18 mL de agua estéril.",
        "dilucion": "Puede administrarse sin dilución adicional.",
        "volumenAdministracion": "18 mL para 500 mg",
        "velocidadAdministracion": "IV directa en 3-5 min. Evitar extravasación (muy alcalina, pH 9.4).",
        "estabilidad": "Reconstituido: 24h a temperatura ambiente."
    },
    "alirocumab": {
        "volumenAdministracion": "Pluma precargada: 1 mL (75 o 150 mg)",
        "velocidadAdministracion": "SC: inyectar en muslo, abdomen o brazo. Dejar temperar 30-40 min antes.",
        "estabilidad": "Refrigerar 2-8°C. A temperatura ambiente: 30 días. No congelar."
    },
    "evolocumab": {
        "volumenAdministracion": "Autoinyector: 1 mL (140 mg)",
        "velocidadAdministracion": "SC: inyectar en muslo, abdomen o brazo. Para 420 mg: usar 3 inyecciones en 30 min.",
        "estabilidad": "Refrigerar 2-8°C. A temperatura ambiente: 30 días. No congelar."
    },
    "nefopam": {
        "dilucion": "IV: diluir 20 mg en 100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "2 mL (IM) o 100 mL (IV)",
        "velocidadAdministracion": "IV: infundir en al menos 15-20 min. No en bolo (taquicardia, sudoración). IM: profunda.",
        "estabilidad": "Diluido: usar dentro de 24h."
    },
    "clomipramina": {
        "dilucion": "Diluir 25-50 mg en 250-500 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "250-500 mL",
        "velocidadAdministracion": "Infusión IV lenta: 1.5-3 horas. Monitorizar ECG y PA.",
        "estabilidad": "Diluido: usar dentro de 24h. Proteger de la luz."
    },
    "cloranfenicol": {
        "reconstitucion": "Reconstituir 1 g con 10 mL de agua estéril.",
        "dilucion": "Diluir en 50-100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "50-100 mL",
        "velocidadAdministracion": "Infundir en 15-30 min. Monitorizar hemograma (aplasia medular).",
        "estabilidad": "Reconstituido: 30 días refrigerado."
    },
    "polimixina_b": {
        "dilucion": "IV: diluir en 300-500 mL de SG 5%. Intratecal: diluir en 2-5 mL de SF sin conservantes.",
        "volumenAdministracion": "300-500 mL (IV) o 2-5 mL (intratecal)",
        "velocidadAdministracion": "IV: infundir en 60-90 min. Intratecal: administración lenta directa.",
        "estabilidad": "Diluido: 72h refrigerado. Nefrotóxico: monitorizar función renal."
    },
    "tobramicina": {
        "dilucion": "Diluir en 50-100 mL de SF 0.9% o SG 5%.",
        "volumenAdministracion": "50-100 mL",
        "velocidadAdministracion": "Infundir en 20-60 min. Monitorizar niveles valle y pico (nefro/ototóxico).",
        "estabilidad": "Diluido: 24h a temperatura ambiente, 96h refrigerado."
    },
    "posaconazol": {
        "dilucion": "Diluir 300 mg en 150 mL de SF 0.9%, SG 5% o Ringer.",
        "volumenAdministracion": "150 mL",
        "velocidadAdministracion": "Infundir en 90 min a través de catéter central o vía periférica gruesa.",
        "estabilidad": "Diluido: 24h refrigerado."
    },
    "flucitosina": {
        "dilucion": "Solución lista para infusión (2.5 g/250 mL). No requiere dilución.",
        "volumenAdministracion": "250 mL por 2.5 g",
        "velocidadAdministracion": "Infundir en 20-40 min. Monitorizar niveles séricos (nefrotóxica/hepatotóxica).",
        "estabilidad": "Almacenar a temperatura ambiente. Proteger de la luz."
    },
    "capreomicina": {
        "reconstitucion": "Reconstituir 1 g con 2 mL de SF 0.9%. Esperar 2-3 min para disolución completa.",
        "volumenAdministracion": "2-3 mL",
        "velocidadAdministracion": "IM profunda. Monitorizar audiometría y función renal (oto/nefrotóxico).",
        "estabilidad": "Reconstituido: 24h refrigerado. Color puede oscurecer sin pérdida de potencia."
    },
    "cloroquina": {
        "dilucion": "IM: sin dilución (solo emergencia, no disponible oral).",
        "volumenAdministracion": "5 mL (200 mg base)",
        "velocidadAdministracion": "IM: inyección profunda. Precaución: arritmias con administración parenteral.",
        "estabilidad": "Almacenar a temperatura ambiente. Proteger de la luz."
    },
    "pentamidina": {
        "reconstitucion": "Reconstituir 300 mg con 3 mL de agua estéril.",
        "dilucion": "IV: diluir en 50-250 mL de SG 5%. No usar SF (precipita).",
        "volumenAdministracion": "50-250 mL (IV) o 3 mL (IM)",
        "velocidadAdministracion": "IV: infundir en 60-120 min. Monitorizar PA (hipotensión severa). Paciente acostado.",
        "estabilidad": "Reconstituido: 48h a temperatura ambiente. Proteger de la luz."
    },
    "insulina_degludec": {
        "volumenAdministracion": "Pluma precargada: variable según dosis",
        "velocidadAdministracion": "SC: inyectar en muslo, abdomen o deltoides. Rotar sitios. No administrar IV.",
        "estabilidad": "Sin abrir: refrigerar. En uso: 8 semanas a temperatura ambiente."
    },
    "liotironina": {
        "reconstitucion": "No requiere reconstitución (solución inyectable).",
        "dilucion": "Puede administrarse sin diluir.",
        "volumenAdministracion": "1 mL (10 mcg/mL)",
        "velocidadAdministracion": "IV directa en bolo. Para coma mixedematoso: 25-50 mcg inicial.",
        "estabilidad": "Refrigerar 2-8°C. Proteger de la luz."
    },
    "palonosetron": {
        "dilucion": "Puede administrarse sin diluir o diluir en 50 mL de SF 0.9%.",
        "volumenAdministracion": "1.5 mL (0.25 mg) o 50 mL (infusión)",
        "velocidadAdministracion": "IV: administrar en 30 segundos. 30 min antes de quimioterapia.",
        "estabilidad": "Almacenar a temperatura ambiente. Proteger de la luz. 24h diluido."
    },
    "argatroban": {
        "dilucion": "Diluir en 250 mL de SF 0.9%, SG 5% o Ringer (concentración 1 mg/mL).",
        "volumenAdministracion": "250 mL",
        "velocidadAdministracion": "Infusión continua: 2 mcg/kg/min. Ajustar según TTPa (1.5-3x basal).",
        "estabilidad": "Diluido: 24h a temperatura ambiente. 96h en bolsa de PVC oscura."
    },
    "emicizumab": {
        "volumenAdministracion": "Variable según concentración y dosis (pluma/jeringa precargada)",
        "velocidadAdministracion": "SC: inyectar en abdomen o muslo. No administrar IV. Rotar sitios.",
        "estabilidad": "Refrigerar 2-8°C. A temperatura ambiente: 7 días. No congelar."
    },
    "metilergometrina": {
        "dilucion": "IV: diluir en 5 mL de SF 0.9%. IM: sin dilución.",
        "volumenAdministracion": "1 mL (0.2 mg)",
        "velocidadAdministracion": "IV lenta: administrar en al menos 1 min. Solo en emergencia hemorragia. IM preferida.",
        "estabilidad": "Refrigerar 2-8°C. Proteger de la luz. Descartar si descolorada."
    }
}

# Load drugs
with open(os.path.join(BASE, 'drugs.json'), 'r', encoding='utf-8') as f:
    drugs = json.load(f)

# Add parenteral data
count = 0
for drug in drugs:
    if drug['id'] in PARENTERAL_DATA and 'preparacionParenteral' not in drug:
        drug['preparacionParenteral'] = PARENTERAL_DATA[drug['id']]
        count += 1

# Save
with open(os.path.join(BASE, 'drugs.json'), 'w', encoding='utf-8') as f:
    json.dump(drugs, f, ensure_ascii=False, indent=2)

print(f"Added preparacionParenteral to {count} drugs.")

# Verify totals
parenteral_routes = {'IV', 'IM', 'SC', 'intratecal', 'epidural'}
total_parenteral = sum(1 for d in drugs if set(d.get('viaAdministracion', [])) & parenteral_routes)
has_pp = sum(1 for d in drugs if 'preparacionParenteral' in d)
missing = sum(1 for d in drugs if set(d.get('viaAdministracion', [])) & parenteral_routes and 'preparacionParenteral' not in d)
print(f"Total drugs with parenteral routes: {total_parenteral}")
print(f"Total drugs with preparacionParenteral: {has_pp}")
print(f"Still missing: {missing}")
