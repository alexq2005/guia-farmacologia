#!/usr/bin/env python3
"""Add new drugs to the database."""
import json
import os

BASE = os.path.join(os.path.dirname(__file__), '..', 'src', 'data')
DRUGS_PATH = os.path.join(BASE, 'drugs.json')
CATS_PATH = os.path.join(BASE, 'categories.json')

def search_text(d):
    parts = [
        d['nombre'].lower(), d['nombreGenerico'].lower(),
        ' '.join(d['nombresComerciales']).lower(),
        d['familia'].lower(), d['clasificacion'].lower(),
        ' '.join(d['indicaciones']).lower()
    ]
    import unicodedata
    t = ' '.join(parts)
    t = unicodedata.normalize('NFD', t)
    t = ''.join(c for c in t if unicodedata.category(c) != 'Mn')
    return t

NEW_DRUGS = [
    # ── u03 Antiinfecciosos ──
    {
        "id": "doripenem_nuevo",
        "nombre": "Cefiderocol",
        "nombreGenerico": "Cefiderocol",
        "nombresComerciales": ["Fetroja"],
        "familia": "Cefalosporinas sideróforas",
        "clasificacion": "Antibiótico cefalosporínico",
        "mecanismoAccion": "Cefalosporina siderófora que utiliza los canales de transporte de hierro bacterianos para penetrar la membrana externa. Inhibe la síntesis de pared celular uniéndose a PBPs.",
        "indicaciones": ["Infecciones urinarias complicadas por gramnegativos multirresistentes", "Neumonía nosocomial por patógenos resistentes a carbapenémicos", "Bacteriemia por gramnegativos difíciles de tratar"],
        "contraindicaciones": ["Hipersensibilidad a cefalosporinas o penicilinas (precaución)", "Antecedente de anafilaxia a betalactámicos"],
        "efectosAdversos": ["Diarrea", "Náuseas", "Elevación de transaminasas", "Erupción cutánea", "Candidiasis", "Hipocalemia"],
        "interacciones": ["Probenecid: aumenta niveles de cefiderocol", "No afecta significativamente CYP450"],
        "viaAdministracion": ["IV"],
        "dosis": {
            "adulto": "2 g IV cada 8h en infusión de 3h",
            "ajusteRenal": "CrCl 30-60: 1.5 g/8h. CrCl 15-30: 1 g/8h. Hemodiálisis: 0.75 g/12h"
        },
        "presentaciones": ["Polvo para solución para infusión 1 g/vial"],
        "embarazo": "B",
        "lactancia": "Se desconoce excreción en leche. Precaución.",
        "cuidadosEnfermeria": ["Infundir siempre en 3 horas (infusión extendida)", "Monitorizar función renal", "Vigilar signos de superinfección", "No mezclar con soluciones que contengan calcio"],
        "preparacionParenteral": {
            "reconstitucion": "Reconstituir 1 g con 10 mL de SF 0.9% o SG 5%.",
            "dilucion": "Diluir en 100 mL de SF 0.9% o SG 5%.",
            "volumenAdministracion": "100 mL",
            "velocidadAdministracion": "Infundir en 3 horas (infusión extendida obligatoria).",
            "estabilidad": "Reconstituido: 1h. Diluido: 6h a temp ambiente, 24h refrigerado."
        },
        "farmacocinetica": {
            "absorcion": "Solo IV",
            "distribucion": "Vd: 18 L. Unión proteica: 40-60%",
            "metabolismo": "Mínimo. Eliminación renal predominante",
            "excrecion": "Renal 60-70% sin cambios",
            "vidaMedia": "2-3 horas",
            "inicioAccion": "Inmediato IV",
            "duracionAccion": "8 horas"
        },
        "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
        "unidadId": "u03",
        "capituloId": "c03_01"
    },
    {
        "id": "ceftobiprol",
        "nombre": "Ceftobiprol medocaril",
        "nombreGenerico": "Ceftobiprol",
        "nombresComerciales": ["Zevtera", "Mabelio"],
        "familia": "Cefalosporinas de 5ª generación",
        "clasificacion": "Antibiótico cefalosporínico anti-MRSA",
        "mecanismoAccion": "Cefalosporina de amplio espectro con afinidad por PBP2a de MRSA. Actividad frente a grampositivos (incluyendo MRSA) y gramnegativos.",
        "indicaciones": ["Neumonía adquirida en la comunidad", "Neumonía nosocomial (no VAP)", "Infecciones de piel y tejidos blandos complicadas"],
        "contraindicaciones": ["Hipersensibilidad a cefalosporinas", "Anafilaxia previa a betalactámicos"],
        "efectosAdversos": ["Náuseas", "Diarrea", "Disgeusia", "Reacciones en sitio de infusión", "Elevación de transaminasas"],
        "interacciones": ["Probenecid: aumenta concentraciones", "No interacciones significativas con CYP"],
        "viaAdministracion": ["IV"],
        "dosis": {
            "adulto": "500 mg IV cada 8h",
            "ajusteRenal": "CrCl 30-50: 250 mg/8h. CrCl <30: 250 mg/12h"
        },
        "presentaciones": ["Polvo para infusión 500 mg/vial"],
        "embarazo": "B",
        "lactancia": "Precaución. Datos limitados.",
        "cuidadosEnfermeria": ["Infundir en 2 horas", "Monitorizar función renal", "Vigilar diarrea (C. difficile)", "Rotar sitios de venopunción"],
        "preparacionParenteral": {
            "reconstitucion": "Reconstituir 500 mg con 10 mL de agua estéril o SG 5%.",
            "dilucion": "Diluir en 250 mL de SF 0.9% o SG 5%.",
            "volumenAdministracion": "250 mL",
            "velocidadAdministracion": "Infundir en 2 horas.",
            "estabilidad": "Reconstituido: 24h refrigerado. Diluido: 24h a temp ambiente."
        },
        "unidadId": "u03",
        "capituloId": "c03_01"
    },
    {
        "id": "meropenem_nuevo",
        "nombre": "Imipenem/Cilastatina/Relebactam",
        "nombreGenerico": "Imipenem-Cilastatina-Relebactam",
        "nombresComerciales": ["Recarbrio"],
        "familia": "Carbapenémicos + inhibidor betalactamasa",
        "clasificacion": "Antibiótico carbapenémico con inhibidor",
        "mecanismoAccion": "Imipenem inhibe síntesis de pared celular. Cilastatina inhibe DHP-1 renal. Relebactam inhibe betalactamasas clase A y C (incluyendo KPC).",
        "indicaciones": ["Infecciones abdominales complicadas", "Infecciones urinarias complicadas", "Neumonía nosocomial/VAP", "Infecciones por gramnegativos resistentes a carbapenémicos (productores de KPC)"],
        "contraindicaciones": ["Hipersensibilidad a carbapenémicos", "Hipersensibilidad a componentes"],
        "efectosAdversos": ["Diarrea", "Náuseas", "Elevación de transaminasas", "Cefalea", "Convulsiones (raro)"],
        "interacciones": ["Ácido valproico: reduce niveles (evitar combinación)", "Ganciclovir: riesgo de convulsiones"],
        "viaAdministracion": ["IV"],
        "dosis": {
            "adulto": "1.25 g (imipenem 500/cilastatina 500/relebactam 250) IV cada 6h",
            "ajusteRenal": "CrCl 60-90: igual. CrCl 30-60: reducir. CrCl <30: contraindicado"
        },
        "presentaciones": ["Polvo para infusión 500/500/250 mg/vial"],
        "embarazo": "C",
        "lactancia": "Precaución. Imipenem se excreta en leche.",
        "cuidadosEnfermeria": ["Infundir en 30 minutos", "Monitorizar función renal y hepática", "Vigilar convulsiones (especialmente en pacientes con patología SNC)", "Monitorizar C. difficile"],
        "preparacionParenteral": {
            "reconstitucion": "Reconstituir vial con 20 mL de SF 0.9%.",
            "dilucion": "Diluir en 100 mL de SF 0.9%.",
            "volumenAdministracion": "100 mL",
            "velocidadAdministracion": "Infundir en 30 minutos.",
            "estabilidad": "Reconstituido: 2h. Diluido: 2h a temp ambiente, 24h refrigerado."
        },
        "unidadId": "u03",
        "capituloId": "c03_03"
    },
    # ── u11 Emergencias ──
    {
        "id": "amrinona",
        "nombre": "Levosimendán",
        "nombreGenerico": "Angiotensina II",
        "nombresComerciales": ["Giapreza"],
        "familia": "Vasopresores",
        "clasificacion": "Vasopresor peptídico",
        "mecanismoAccion": "Angiotensina II sintética que actúa sobre receptores AT1 causando vasoconstricción directa. Estimula liberación de aldosterona y vasopresina.",
        "indicaciones": ["Shock vasodilatador refractario a catecolaminas y vasopresina", "Hipotensión en shock séptico como vasopresor de rescate"],
        "contraindicaciones": ["Hipersensibilidad al fármaco"],
        "efectosAdversos": ["Trombosis venosa profunda", "Trombocitopenia", "Taquicardia", "Acidosis", "Hiperglucemia", "Delirio"],
        "interacciones": ["IECAs y ARA-II: antagonizan efecto", "Puede potenciar efecto de otros vasopresores"],
        "viaAdministracion": ["IV"],
        "dosis": {
            "adulto": "Iniciar 20 ng/kg/min IV. Titular 15 ng/kg/min cada 5 min hasta máx 80 ng/kg/min. Mantenimiento: 1.25-40 ng/kg/min."
        },
        "presentaciones": ["Solución para infusión 2.5 mg/mL, vial 1 mL y 2 mL"],
        "embarazo": "D",
        "lactancia": "No recomendado.",
        "cuidadosEnfermeria": ["Administrar SOLO por vía central", "Monitorización hemodinámica continua", "Profilaxis antitrombótica obligatoria", "Titular según PAM objetivo", "Vigilar signos de isquemia distal"],
        "preparacionParenteral": {
            "reconstitucion": "No requiere.",
            "dilucion": "Diluir en SF 0.9% o SG 5% hasta concentración de 5000-10000 ng/mL.",
            "volumenAdministracion": "250 mL",
            "velocidadAdministracion": "Iniciar 20 ng/kg/min. Bomba de infusión obligatoria. Vía central.",
            "estabilidad": "Diluida: 24h a temp ambiente."
        },
        "unidadId": "u11",
        "capituloId": "c11_02"
    },
    # ── u02 Cardiovascular ──
    {
        "id": "nitroprusiatosodico_nuevo",
        "nombre": "Fenoldopam",
        "nombreGenerico": "Fenoldopam mesilato",
        "nombresComerciales": ["Corlopam"],
        "familia": "Vasodilatadores",
        "clasificacion": "Agonista dopaminérgico D1 selectivo",
        "mecanismoAccion": "Agonista selectivo del receptor D1 de dopamina que causa vasodilatación arterial renal y sistémica. Aumenta flujo sanguíneo renal y natriuresis.",
        "indicaciones": ["Crisis hipertensiva en contexto hospitalario", "Hipertensión perioperatoria", "Protección renal en pacientes con riesgo de nefropatía por contraste"],
        "contraindicaciones": ["Hipersensibilidad al fenoldopam", "Glaucoma o hipertensión intraocular"],
        "efectosAdversos": ["Hipotensión", "Taquicardia refleja", "Cefalea", "Náuseas", "Rubor facial", "Hipocalemia"],
        "interacciones": ["Betabloqueadores: taquicardia refleja paradójica", "Otros antihipertensivos: efecto aditivo"],
        "viaAdministracion": ["IV"],
        "dosis": {
            "adulto": "Iniciar 0.1 mcg/kg/min IV. Titular cada 15 min hasta máx 1.6 mcg/kg/min.",
            "pediatrico": "0.2 mcg/kg/min, titular hasta 0.8 mcg/kg/min"
        },
        "presentaciones": ["Solución inyectable 10 mg/mL ampolla de 1 mL y 2 mL"],
        "embarazo": "B",
        "lactancia": "Se desconoce. Precaución.",
        "cuidadosEnfermeria": ["Monitorización continua de PA y FC", "Administrar por bomba de infusión", "Vigilar hipocalemia (controlar K+ cada 6h)", "Ajustar velocidad según PA objetivo", "No mezclar con otros fármacos en la misma línea"],
        "preparacionParenteral": {
            "reconstitucion": "No requiere.",
            "dilucion": "Diluir 10-20 mg en 250 mL de SF 0.9% o SG 5% (40-80 mcg/mL).",
            "volumenAdministracion": "250 mL",
            "velocidadAdministracion": "Iniciar 0.1 mcg/kg/min. Bomba de infusión. Titular cada 15 min.",
            "estabilidad": "Diluida: 24h a temperatura ambiente."
        },
        "unidadId": "u02",
        "capituloId": "c02_07"
    },
    # ── u12 Hospitalarios ──
    {
        "id": "ketamina_infusion",
        "nombre": "Ketamina (Infusión analgésica)",
        "nombreGenerico": "Ketamina subdisociativa",
        "nombresComerciales": ["Ketalar"],
        "familia": "Analgésicos no opioides IV",
        "clasificacion": "Antagonista NMDA - dosis analgésica",
        "mecanismoAccion": "A dosis subdisociativas (0.1-0.3 mg/kg), bloquea receptores NMDA reduciendo sensibilización central al dolor sin causar disociación ni anestesia.",
        "indicaciones": ["Dolor agudo severo refractario a opioides", "Analgesia multimodal perioperatoria", "Reducción de consumo de opioides", "Crisis de dolor neuropático"],
        "contraindicaciones": ["Hipertensión intracraneal no controlada", "Eclampsia", "Esquizofrenia activa", "Hipertensión severa no controlada"],
        "efectosAdversos": ["Mareo", "Náuseas", "Disforia leve", "Nistagmo", "Sialorrea", "Hipertensión leve"],
        "interacciones": ["Depresores SNC: efecto aditivo", "Teofilina: riesgo de convulsiones"],
        "viaAdministracion": ["IV"],
        "dosis": {
            "adulto": "Bolo: 0.1-0.3 mg/kg IV en 10 min. Infusión: 0.1-0.25 mg/kg/h (máx 24-48h)."
        },
        "presentaciones": ["Solución inyectable 50 mg/mL en viales de 10 mL y 50 mL"],
        "embarazo": "C",
        "lactancia": "Evitar durante infusión.",
        "cuidadosEnfermeria": ["Monitorizar PA, FC, SpO2 y nivel de consciencia", "Dosis mucho menores que anestésicas (NO confundir)", "Vigilar efectos psicomiméticos (disforia, alucinaciones)", "Puede añadir midazolam 1-2 mg si aparecen efectos psicomiméticos", "Duración máxima recomendada: 24-48h"],
        "preparacionParenteral": {
            "reconstitucion": "No requiere.",
            "dilucion": "Diluir 100-250 mg en 100-250 mL de SF 0.9% o SG 5% (1 mg/mL).",
            "volumenAdministracion": "100-250 mL",
            "velocidadAdministracion": "Bolo: 0.1-0.3 mg/kg en 10 min. Infusión: 0.1-0.25 mg/kg/h.",
            "estabilidad": "Diluida: 24h a temperatura ambiente."
        },
        "unidadId": "u12",
        "capituloId": "c12_02"
    },
    {
        "id": "dexmedetomidina_intranasal",
        "nombre": "Dexmedetomidina intranasal (Sedación pediátrica)",
        "nombreGenerico": "Dexmedetomidina",
        "nombresComerciales": ["Precedex", "Igalmi"],
        "familia": "Sedantes alfa-2 agonistas",
        "clasificacion": "Agonista alfa-2 adrenérgico - vía intranasal",
        "mecanismoAccion": "Agonista selectivo alfa-2 adrenérgico central que produce sedación, ansiolisis y analgesia leve sin depresión respiratoria significativa.",
        "indicaciones": ["Sedación procedural pediátrica (RM, EEG, ecocardiograma)", "Premedicación anestésica en niños", "Sedación para procedimientos dentales pediátricos"],
        "contraindicaciones": ["Bloqueo AV de 2º-3er grado", "Hipotensión grave", "Hipersensibilidad"],
        "efectosAdversos": ["Bradicardia", "Hipotensión", "Congestión nasal transitoria", "Sedación prolongada (raro)"],
        "interacciones": ["Betabloqueadores: bradicardia aditiva", "Opioides: sedación aditiva"],
        "viaAdministracion": ["nasal"],
        "dosis": {
            "adulto": "No aplica (uso principalmente pediátrico)",
            "pediatrico": "2-4 mcg/kg intranasal 30-45 min antes del procedimiento. Máx: 4 mcg/kg."
        },
        "presentaciones": ["Solución inyectable 100 mcg/mL (se usa por vía intranasal con atomizador MAD)"],
        "embarazo": "C",
        "lactancia": "Precaución.",
        "cuidadosEnfermeria": ["Usar atomizador MAD (Mucosal Atomization Device)", "Dividir volumen entre ambas narinas (máx 1 mL por narina)", "Monitorizar FC y SpO2", "Onset: 30-45 min. Pico: 60-90 min", "No requiere ayuno estricto para procedimientos no dolorosos"],
        "unidadId": "u12",
        "capituloId": "c12_01"
    },
    # ── u10 Hematología ──
    {
        "id": "andexanet_alfa_detalle",
        "nombre": "Andexanet alfa",
        "nombreGenerico": "Andexanet alfa",
        "nombresComerciales": ["Andexxa", "Ondexxya"],
        "familia": "Antídotos anticoagulantes",
        "clasificacion": "Agente reversor de inhibidores del factor Xa",
        "mecanismoAccion": "Proteína recombinante modificada del factor Xa que actúa como señuelo, uniéndose a los inhibidores del factor Xa (rivaroxabán, apixabán) y neutralizando su efecto anticoagulante.",
        "indicaciones": ["Reversión urgente de rivaroxabán en hemorragia mayor", "Reversión urgente de apixabán en hemorragia mayor"],
        "contraindicaciones": ["Hipersensibilidad al andexanet alfa", "Antecedente de trombosis con andexanet (riesgo trombótico)"],
        "efectosAdversos": ["Eventos tromboembólicos (12-18%)", "Reacciones infusionales", "Anticuerpos anti-factor Xa", "Elevación de dímero D"],
        "interacciones": ["Heparina: efecto neutralizado", "Reiniciar anticoagulación lo antes posible tras hemostasia"],
        "viaAdministracion": ["IV"],
        "dosis": {
            "adulto": "Dosis baja: bolo 400 mg IV + infusión 4 mg/min x 120 min. Dosis alta: bolo 800 mg IV + infusión 8 mg/min x 120 min."
        },
        "presentaciones": ["Polvo liofilizado 200 mg/vial"],
        "embarazo": "N/A",
        "lactancia": "No hay datos.",
        "cuidadosEnfermeria": ["Reconstituir y administrar rápidamente", "Monitorizar signos de trombosis post-administración", "Reiniciar anticoagulación tan pronto como sea clínicamente seguro", "Vigilar signos vitales y hemograma cada 4h", "Documentar hora exacta de administración"],
        "preparacionParenteral": {
            "reconstitucion": "Reconstituir cada vial de 200 mg con 20 mL de agua estéril. NO agitar.",
            "dilucion": "No diluir más. Transferir volumen necesario a bolsas de infusión.",
            "volumenAdministracion": "Dosis baja: 4 viales bolo + 4 viales infusión. Dosis alta: 8+8 viales.",
            "velocidadAdministracion": "Bolo: 30 mg/min. Infusión: 4-8 mg/min por 120 min. Usar filtro 0.2 micras.",
            "estabilidad": "Reconstituido: 8h refrigerado, 2h a temp ambiente."
        },
        "unidadId": "u10",
        "capituloId": "c10_02"
    },
    # ── u01 SNC ──
    {
        "id": "droperidol",
        "nombre": "Droperidol",
        "nombreGenerico": "Droperidol",
        "nombresComerciales": ["Inapsine", "Xomolix"],
        "familia": "Antieméticos / Neurolépticos",
        "clasificacion": "Butirofenona - Antagonista D2",
        "mecanismoAccion": "Antagonista dopaminérgico D2 con potente efecto antiemético y sedante. Actúa en zona quimiorreceptora del vómito y formación reticular.",
        "indicaciones": ["Profilaxis y tratamiento de náuseas/vómitos postoperatorios", "Sedación perioperatoria", "Agitación aguda en urgencias"],
        "contraindicaciones": ["QTc prolongado >440 ms", "Hipocalemia o hipomagnesemia", "Feocromocitoma", "Parkinson", "Hipersensibilidad"],
        "efectosAdversos": ["Prolongación QTc (dosis-dependiente)", "Somnolencia", "Distonía aguda", "Hipotensión", "Acatisia", "Torsade de pointes (raro)"],
        "interacciones": ["Fármacos que prolongan QTc: riesgo aditivo", "Opioides: sedación aditiva", "Metoclopramida: efectos extrapiramidales aditivos"],
        "viaAdministracion": ["IV", "IM"],
        "dosis": {
            "adulto": "Antiemético: 0.625-1.25 mg IV. Sedación: 2.5-5 mg IM.",
            "pediatrico": "0.01-0.03 mg/kg IV (máx 0.1 mg/kg)"
        },
        "presentaciones": ["Solución inyectable 2.5 mg/mL ampolla de 1 mL y 2 mL"],
        "embarazo": "C",
        "lactancia": "Precaución. Se excreta en leche.",
        "cuidadosEnfermeria": ["ECG basal obligatorio antes de administrar (descartar QTc largo)", "Dosis máxima 2.5 mg IV por administración", "Monitorizar ECG 2-3h post-dosis", "Vigilar signos extrapiramidales", "Tener disponible difenhidramina para distonía aguda"],
        "preparacionParenteral": {
            "reconstitucion": "No requiere.",
            "dilucion": "Puede diluir en 10 mL de SF 0.9% o SG 5%.",
            "volumenAdministracion": "Bolo: 0.5-1 mL. IM: 1-2 mL.",
            "velocidadAdministracion": "IV lento en 1-2 minutos.",
            "estabilidad": "Proteger de la luz. Conservar a temperatura ambiente."
        },
        "unidadId": "u01",
        "capituloId": "c01_03"
    },
    {
        "id": "quetiapina_im",
        "nombre": "Aripiprazol IM de liberación prolongada",
        "nombreGenerico": "Aripiprazol lauroxil",
        "nombresComerciales": ["Aristada", "Abilify Maintena"],
        "familia": "Antipsicóticos atípicos depot",
        "clasificacion": "Agonista parcial D2/5-HT1A depot",
        "mecanismoAccion": "Agonista parcial de receptores D2 y 5-HT1A y antagonista 5-HT2A. Formulación depot de liberación prolongada que mantiene niveles terapéuticos por 4-6 semanas.",
        "indicaciones": ["Esquizofrenia (tratamiento de mantenimiento)", "Trastorno bipolar I (mantenimiento)"],
        "contraindicaciones": ["Hipersensibilidad al aripiprazol", "Demencia con psicosis (aumenta mortalidad)"],
        "efectosAdversos": ["Dolor en sitio de inyección", "Acatisia", "Aumento de peso", "Cefalea", "Insomnio", "Reacciones en sitio de inyección"],
        "interacciones": ["Inhibidores CYP2D6/3A4: ajustar dosis", "Inductores CYP3A4: puede requerir dosis mayor"],
        "viaAdministracion": ["IM"],
        "dosis": {
            "adulto": "Abilify Maintena: 400 mg IM mensual (glúteo). Aristada: 441-882 mg IM mensual o bimensual."
        },
        "presentaciones": ["Polvo para suspensión IM 300 mg, 400 mg (Maintena)", "Suspensión IM 441 mg, 662 mg, 882 mg (Aristada)"],
        "embarazo": "C",
        "lactancia": "Se excreta en leche. Valorar riesgo-beneficio.",
        "cuidadosEnfermeria": ["Inyección IM glútea profunda (aguja 21G, 38 mm)", "No frotar zona de inyección", "Mantener al paciente 3h en observación tras primera dosis", "Verificar que no se inyecte en vaso sanguíneo", "Almacenar a temperatura ambiente"],
        "preparacionParenteral": {
            "reconstitucion": "Maintena: reconstituir 400 mg con 1.9 mL de agua estéril. Agitar vigorosamente 30 seg.",
            "dilucion": "No diluir. Administrar inmediatamente tras reconstitución.",
            "volumenAdministracion": "IM: 2 mL (400 mg)",
            "velocidadAdministracion": "IM profunda en glúteo. Inyectar lentamente.",
            "estabilidad": "Reconstituido: usar dentro de 4h a temperatura ambiente."
        },
        "unidadId": "u01",
        "capituloId": "c01_06"
    },
    # ── u08 Musculoesquelético ──
    {
        "id": "ketorolaco_iv",
        "nombre": "Ketorolaco IV/IM",
        "nombreGenerico": "Ketorolaco trometamol parenteral",
        "nombresComerciales": ["Toradol", "Dolac"],
        "familia": "AINEs parenterales",
        "clasificacion": "AINE - Inhibidor COX no selectivo parenteral",
        "mecanismoAccion": "Potente inhibidor de COX-1 y COX-2 con predominio analgésico. Equivalencia: 30 mg ketorolaco IV ≈ 10 mg morfina.",
        "indicaciones": ["Dolor agudo moderado-severo postoperatorio", "Cólico renal", "Dolor musculoesquelético agudo", "Analgesia multimodal (ahorro de opioides)"],
        "contraindicaciones": ["Uso >5 días", "Insuficiencia renal moderada-severa", "Hemorragia activa", "Úlcera péptica activa", "Tercer trimestre de embarazo", "Cirugía con alto riesgo de sangrado"],
        "efectosAdversos": ["Dolor epigástrico", "Náuseas", "Hemorragia GI", "Insuficiencia renal aguda", "Inhibición plaquetaria", "Reacciones en sitio de inyección"],
        "interacciones": ["Anticoagulantes: mayor riesgo sangrado", "IECAs/ARA-II: nefrotoxicidad", "Litio: aumenta niveles", "Metotrexato: toxicidad"],
        "viaAdministracion": ["IV", "IM"],
        "dosis": {
            "adulto": "30 mg IV/IM cada 6-8h. Máx: 120 mg/día. Máx 5 días de tratamiento.",
            "geriatrico": "15 mg IV/IM cada 6-8h. Máx: 60 mg/día.",
            "ajusteRenal": "15 mg cada 6h si CrCl <50 o >65 años"
        },
        "presentaciones": ["Solución inyectable 30 mg/mL ampolla de 1 mL"],
        "embarazo": "C",
        "lactancia": "Compatible en dosis única. Precaución uso prolongado.",
        "cuidadosEnfermeria": ["MÁXIMO 5 días por cualquier vía parenteral", "Verificar función renal antes y durante tratamiento", "Administrar con protección gástrica si >2 días", "IV: administrar en mínimo 15 seg", "Vigilar signos de sangrado (heces oscuras, hematomas)", "No usar en pacientes anticoagulados sin valoración"],
        "preparacionParenteral": {
            "reconstitucion": "No requiere.",
            "dilucion": "Puede diluir en 50 mL de SF 0.9% o SG 5% para infusión corta.",
            "volumenAdministracion": "Bolo: 1 mL (30 mg). Infusión: 50 mL.",
            "velocidadAdministracion": "Bolo IV en 15 seg mínimo. IM: inyección profunda glútea.",
            "estabilidad": "Proteger de la luz. No mezclar con morfina o meperidina en misma jeringa."
        },
        "unidadId": "u08",
        "capituloId": "c08_01"
    },
    # ── u06 Endocrino ──
    {
        "id": "tirzepatida_detalle",
        "nombre": "Tirzepatida",
        "nombreGenerico": "Tirzepatida",
        "nombresComerciales": ["Mounjaro", "Zepbound"],
        "familia": "Incretinas duales",
        "clasificacion": "Agonista dual GIP/GLP-1",
        "mecanismoAccion": "Agonista dual de receptores GIP y GLP-1. Estimula secreción de insulina glucosa-dependiente, suprime glucagón, enlentece vaciamiento gástrico y reduce apetito a nivel central.",
        "indicaciones": ["Diabetes mellitus tipo 2 (junto a dieta y ejercicio)", "Obesidad/sobrepeso con comorbilidades (IMC ≥27 con comorbilidad o ≥30)"],
        "contraindicaciones": ["Antecedente personal o familiar de carcinoma medular de tiroides", "Neoplasia endocrina múltiple tipo 2 (MEN2)", "Hipersensibilidad a tirzepatida"],
        "efectosAdversos": ["Náuseas (más frecuente al inicio)", "Diarrea", "Vómitos", "Dolor abdominal", "Hipoglucemia (con sulfonilureas/insulina)", "Pancreatitis (raro)"],
        "interacciones": ["Insulina/sulfonilureas: mayor riesgo hipoglucemia", "Anticonceptivos orales: absorción puede reducirse (usar barrera adicional)", "Fármacos que requieren vaciamiento gástrico rápido: absorción retardada"],
        "viaAdministracion": ["SC"],
        "dosis": {
            "adulto": "Inicio: 2.5 mg SC semanal x 4 sem. Escalado: 5 mg → 7.5 mg → 10 mg → 12.5 mg → 15 mg (cada 4 sem). DM2: máx 15 mg/sem. Obesidad: máx 15 mg/sem."
        },
        "presentaciones": ["Pluma precargada SC: 2.5, 5, 7.5, 10, 12.5, 15 mg"],
        "embarazo": "X",
        "lactancia": "No recomendado. Suspender 2 meses antes de planificar embarazo.",
        "cuidadosEnfermeria": ["Educar sobre técnica de inyección SC (abdomen, muslo, brazo)", "Administrar 1 vez/semana, mismo día cada semana", "Escalado gradual obligatorio para minimizar náuseas", "Vigilar signos de pancreatitis: dolor abdominal severo persistente", "Monitorizar glucemia si usa insulina concomitante", "Refrigerar plumas sin abrir. Temp ambiente hasta 21 días."],
        "preparacionParenteral": {
            "volumenAdministracion": "SC: 0.5 mL (pluma precargada)",
            "velocidadAdministracion": "SC 1 vez/semana. Rotar sitios de inyección.",
            "estabilidad": "Refrigerar sin abrir. Una vez fuera: 21 días a temp ambiente (máx 30°C)."
        },
        "farmacocinetica": {
            "absorcion": "SC: Tmáx 8-72h",
            "distribucion": "Vd: ~10 L. Unión proteica: 99%",
            "metabolismo": "Degradación proteolítica",
            "excrecion": "No se elimina intacto por vía renal",
            "vidaMedia": "5 días (permite dosificación semanal)",
            "inicioAccion": "Reducción de glucemia en 1-2 semanas",
            "duracionAccion": "7 días"
        },
        "unidadId": "u06",
        "capituloId": "c06_01"
    },
    # ── u04 Respiratorio ──
    {
        "id": "dupilumab_respiratorio",
        "nombre": "Dupilumab (asma)",
        "nombreGenerico": "Dupilumab",
        "nombresComerciales": ["Dupixent"],
        "familia": "Anticuerpos monoclonales anti-IL",
        "clasificacion": "Anticuerpo monoclonal anti-IL-4Rα",
        "mecanismoAccion": "Anticuerpo monoclonal que bloquea la señalización de IL-4 e IL-13 al inhibir su receptor compartido IL-4Rα. Reduce inflamación tipo 2 en asma eosinofílica.",
        "indicaciones": ["Asma eosinofílica moderada-grave (add-on)", "Dermatitis atópica moderada-grave", "Rinosinusitis crónica con pólipos nasales"],
        "contraindicaciones": ["Hipersensibilidad al dupilumab", "Infección helmíntica activa no tratada"],
        "efectosAdversos": ["Reacción en sitio de inyección", "Conjuntivitis/queratitis", "Eosinofilia transitoria", "Artralgias"],
        "interacciones": ["No interacciones significativas conocidas", "Evitar vacunas vivas durante tratamiento"],
        "viaAdministracion": ["SC"],
        "dosis": {
            "adulto": "Carga: 400-600 mg SC. Mantenimiento: 200-300 mg SC cada 2 semanas.",
            "pediatrico": "≥6 años: según peso. 15-30 kg: 100 mg/2sem. 30-60 kg: 200 mg/2sem. >60 kg: dosis adulto."
        },
        "presentaciones": ["Jeringa precargada 200 mg/1.14 mL", "Jeringa precargada 300 mg/2 mL", "Pluma precargada 200 mg y 300 mg"],
        "embarazo": "C",
        "lactancia": "Probablemente compatible (IgG en leche mínima). Valorar riesgo-beneficio.",
        "cuidadosEnfermeria": ["NO suspender corticoides inhalados abruptamente al iniciar", "Educar sobre auto-inyección SC", "Rotar sitios de inyección", "Derivar a oftalmología si síntomas oculares", "Monitorizar eosinófilos en primeras semanas", "Refrigerar. Sacar 45 min antes de inyectar."],
        "preparacionParenteral": {
            "volumenAdministracion": "SC: 1.14-2 mL según presentación",
            "velocidadAdministracion": "SC directo. Inyectar lentamente.",
            "estabilidad": "Refrigerar. Sin abrir: 14 días a temp ambiente (máx 25°C)."
        },
        "unidadId": "u04",
        "capituloId": "c04_05"
    },
    # ── u05 Digestivo ──
    {
        "id": "octreotida_hemorragia",
        "nombre": "Octreotida (hemorragia digestiva)",
        "nombreGenerico": "Octreotida acetato",
        "nombresComerciales": ["Sandostatin"],
        "familia": "Análogos de somatostatina",
        "clasificacion": "Análogo de somatostatina - uso GI",
        "mecanismoAccion": "Análogo de somatostatina que reduce flujo sanguíneo esplácnico, inhibe secreción de gastrina, VIP, secretina. Reduce presión portal y flujo en varices esofágicas.",
        "indicaciones": ["Hemorragia digestiva alta variceal", "Hemorragia digestiva alta no variceal (coadyuvante)", "Fístulas enterocutáneas", "Síndrome carcinoide"],
        "contraindicaciones": ["Hipersensibilidad a octreotida"],
        "efectosAdversos": ["Dolor abdominal", "Diarrea/esteatorrea", "Hiperglucemia", "Bradicardia", "Colelitiasis (uso prolongado)", "Dolor en sitio de inyección"],
        "interacciones": ["Ciclosporina: reduce absorción", "Insulina: puede requerir ajuste", "Betabloqueadores: bradicardia aditiva"],
        "viaAdministracion": ["IV", "SC"],
        "dosis": {
            "adulto": "Hemorragia variceal: bolo 50 mcg IV + infusión 25-50 mcg/h x 2-5 días. Carcinoide: 100-600 mcg/día SC dividido en 2-3 dosis."
        },
        "presentaciones": ["Solución inyectable 50 mcg/mL, 100 mcg/mL, 500 mcg/mL"],
        "embarazo": "B",
        "lactancia": "Precaución. Se desconoce excreción.",
        "cuidadosEnfermeria": ["Monitorizar glucemia cada 4-6h", "Vigilar bradicardia", "Administrar en bomba de infusión IV", "Control de gasto por sonda nasogástrica", "Puede causar dolor en sitio de inyección SC (rotar sitios)"],
        "preparacionParenteral": {
            "reconstitucion": "No requiere.",
            "dilucion": "Infusión: diluir dosis en 50-250 mL de SF 0.9%.",
            "volumenAdministracion": "Bolo: 1 mL. Infusión: 50-250 mL.",
            "velocidadAdministracion": "Bolo: 50 mcg IV en 3 min. Infusión: 25-50 mcg/h continua.",
            "estabilidad": "Diluido: 24h a temp ambiente. Refrigerar ampollas."
        },
        "unidadId": "u05",
        "capituloId": "c05_03"
    },
    # ── u07 Reproductor ──
    {
        "id": "carbetocina_detalle",
        "nombre": "Carbetocina",
        "nombreGenerico": "Carbetocina",
        "nombresComerciales": ["Duratocin", "Pabal"],
        "familia": "Oxitócicos de larga duración",
        "clasificacion": "Análogo sintético de oxitocina",
        "mecanismoAccion": "Análogo de oxitocina con vida media prolongada (40 min vs 3 min). Produce contracción uterina sostenida para prevención de hemorragia postparto.",
        "indicaciones": ["Prevención de hemorragia postparto tras cesárea", "Prevención de atonía uterina post-cesárea"],
        "contraindicaciones": ["Antes del alumbramiento", "Hipersensibilidad a carbetocina u oxitocina", "Eclampsia/preeclampsia severa", "Enfermedad cardiovascular grave"],
        "efectosAdversos": ["Náuseas", "Dolor abdominal", "Rubor facial", "Temblor", "Hipotensión (menos que oxitocina)", "Cefalea"],
        "interacciones": ["Ergometrina: contracciones uterinas excesivas", "Anestésicos: hipotensión aditiva"],
        "viaAdministracion": ["IV"],
        "dosis": {
            "adulto": "100 mcg (1 mL) IV dosis única tras cesárea. NO repetir dosis."
        },
        "presentaciones": ["Solución inyectable 100 mcg/mL ampolla 1 mL"],
        "embarazo": "N/A",
        "lactancia": "Compatible. Mínima excreción en leche.",
        "cuidadosEnfermeria": ["DOSIS ÚNICA — no repetir (vida media larga)", "Administrar DESPUÉS del alumbramiento de placenta", "Monitorizar tono uterino, sangrado y signos vitales", "Ventaja sobre oxitocina: no requiere infusión continua", "Vigilar náuseas y vómitos"],
        "preparacionParenteral": {
            "reconstitucion": "No requiere.",
            "dilucion": "No diluir. Administrar directo.",
            "volumenAdministracion": "1 mL (100 mcg)",
            "velocidadAdministracion": "Bolo IV lento en 1 minuto. Dosis única.",
            "estabilidad": "Refrigerado. Proteger de la luz."
        },
        "unidadId": "u07",
        "capituloId": "c07_01"
    },
    # ── u12 Antineoplásicos ──
    {
        "id": "irinotecan",
        "nombre": "Irinotecán",
        "nombreGenerico": "Irinotecán clorhidrato",
        "nombresComerciales": ["Camptosar", "Campto"],
        "familia": "Inhibidores de topoisomerasa I",
        "clasificacion": "Antineoplásico - Inhibidor topoisomerasa I",
        "mecanismoAccion": "Profármaco que se convierte en SN-38, inhibidor de topoisomerasa I. Produce rotura de cadena simple del ADN durante la replicación, causando muerte celular.",
        "indicaciones": ["Cáncer colorrectal metastásico (1ª y 2ª línea)", "Cáncer de pulmón microcítico", "Cáncer gástrico", "Cáncer de páncreas (en combinación)"],
        "contraindicaciones": ["Neutropenia severa basal", "Hipersensibilidad", "Insuficiencia hepática severa (bilirrubina >3x LSN)", "Enfermedad inflamatoria intestinal activa"],
        "efectosAdversos": ["Diarrea tardía severa (≥24h, puede ser letal)", "Diarrea aguda colinérgica (durante infusión)", "Neutropenia severa", "Náuseas/vómitos", "Alopecia", "Astenia"],
        "interacciones": ["Atazanavir/ketoconazol: aumenta toxicidad (inhibe UGT1A1)", "Rifampicina/fenitoína: reduce eficacia", "Laxantes: evitar durante diarrea por irinotecán"],
        "viaAdministracion": ["IV"],
        "dosis": {
            "adulto": "Semanal: 125 mg/m² IV cada semana x 4 sem, 2 sem descanso. Cada 2 sem: 180 mg/m² (FOLFIRI). Cada 3 sem: 350 mg/m²."
        },
        "presentaciones": ["Solución para infusión 20 mg/mL vial 2 mL, 5 mL, 15 mL"],
        "embarazo": "D",
        "lactancia": "Contraindicado.",
        "cuidadosEnfermeria": ["Educar EXTENSAMENTE sobre diarrea tardía (iniciar loperamida 4 mg al primer episodio, luego 2 mg/2h)", "Atropina 0.25-1 mg IV/SC para diarrea aguda colinérgica durante infusión", "Monitorizar hemograma semanal", "Vigilar deshidratación", "Genotipado UGT1A1 previo recomendado (*28/*28 = alto riesgo toxicidad)"],
        "preparacionParenteral": {
            "reconstitucion": "No requiere. Solución lista.",
            "dilucion": "Diluir en 250-500 mL de SF 0.9% o SG 5%.",
            "volumenAdministracion": "250-500 mL",
            "velocidadAdministracion": "Infundir en 30-90 minutos.",
            "estabilidad": "Diluido: 24h a temp ambiente, 48h refrigerado."
        },
        "unidadId": "u12",
        "capituloId": "c12_05"
    },
    {
        "id": "etoposido",
        "nombre": "Etopósido",
        "nombreGenerico": "Etopósido",
        "nombresComerciales": ["Vepesid", "Toposar"],
        "familia": "Inhibidores de topoisomerasa II",
        "clasificacion": "Antineoplásico - Inhibidor topoisomerasa II",
        "mecanismoAccion": "Derivado de podofilotoxina que inhibe topoisomerasa II, causando rotura de doble cadena de ADN. Actúa en fase S y G2 del ciclo celular.",
        "indicaciones": ["Cáncer de pulmón microcítico", "Cáncer testicular", "Linfoma no Hodgkin", "Leucemia aguda", "Sarcoma de Ewing"],
        "contraindicaciones": ["Hipersensibilidad al etopósido o polisorbato 80", "Neutropenia severa preexistente", "Insuficiencia hepática/renal severa"],
        "efectosAdversos": ["Mielosupresión (leucopenia, trombocitopenia)", "Alopecia", "Náuseas/vómitos", "Mucositis", "Hipotensión durante infusión rápida", "Leucemia secundaria (raro, tardío)"],
        "interacciones": ["Cisplatino: sinergia pero mayor mielotoxicidad", "Warfarina: mayor riesgo sangrado", "Ciclosporina: aumenta niveles de etopósido"],
        "viaAdministracion": ["IV", "oral"],
        "dosis": {
            "adulto": "IV: 50-100 mg/m²/día x 3-5 días cada 3-4 sem. Oral: el doble de dosis IV, redondeada a cápsula de 50 mg más cercana."
        },
        "presentaciones": ["Solución para infusión 20 mg/mL vial 5, 10, 25 mL", "Cápsulas 50 mg"],
        "embarazo": "D",
        "lactancia": "Contraindicado.",
        "cuidadosEnfermeria": ["NUNCA infundir en <30 min (hipotensión severa, broncoespasmo)", "Monitorizar PA durante infusión", "Hemograma antes de cada ciclo", "Vigilar signos de infección (nadir: día 10-14)", "Cápsulas: refrigerar y administrar en ayunas"],
        "preparacionParenteral": {
            "reconstitucion": "No requiere. Solución lista.",
            "dilucion": "Diluir en SF 0.9% o SG 5% a concentración 0.2-0.4 mg/mL (mín 200 mL para 100 mg).",
            "volumenAdministracion": "250-500 mL",
            "velocidadAdministracion": "Infundir en mínimo 30-60 minutos. Puede precipitar si concentración >0.4 mg/mL.",
            "estabilidad": "Diluido en SF: 24h. En SG 5%: 24h. Concentración >0.4 mg/mL puede precipitar."
        },
        "unidadId": "u12",
        "capituloId": "c12_05"
    },
    {
        "id": "metotrexato_alta_dosis",
        "nombre": "Metotrexato alta dosis (oncológico)",
        "nombreGenerico": "Metotrexato sódico IV",
        "nombresComerciales": ["Trexall", "Otrexup"],
        "familia": "Antimetabolitos",
        "clasificacion": "Antineoplásico - Antifolato",
        "mecanismoAccion": "Inhibe dihidrofolato reductasa, bloqueando síntesis de purinas y timidilato. A alta dosis (>500 mg/m²), penetra en SNC y requiere rescate con leucovorina.",
        "indicaciones": ["Leucemia linfoblástica aguda (profilaxis/tratamiento SNC)", "Osteosarcoma", "Linfoma SNC primario", "Coriocarcinoma", "Linfoma no Hodgkin agresivo"],
        "contraindicaciones": ["Insuficiencia renal (CrCl <60 para alta dosis)", "Derrame pleural o ascitis (acumulación)", "Embarazo", "Inmunodeficiencia severa"],
        "efectosAdversos": ["Mucositis severa", "Nefrotoxicidad (precipitación tubular)", "Mielosupresión", "Hepatotoxicidad", "Neurotoxicidad (alta dosis)", "Neumonitis intersticial"],
        "interacciones": ["AINEs: reducen excreción renal (toxicidad)", "Trimetoprima: efecto antifolato aditivo", "IBP: reducen excreción renal"],
        "viaAdministracion": ["IV", "intratecal"],
        "dosis": {
            "adulto": "Alta dosis: 1-12 g/m² según protocolo + rescate leucovorina. Intratecal: 12 mg dosis fija."
        },
        "presentaciones": ["Solución inyectable 25 mg/mL viales varios tamaños", "Polvo liofilizado 1 g"],
        "embarazo": "X",
        "lactancia": "Contraindicado.",
        "cuidadosEnfermeria": ["Hiperhidratación obligatoria (3 L/m²/día) + alcalinización urinaria (pH >7)", "Leucovorina: iniciar a las 24h y monitorizar niveles de MTX", "Niveles séricos de MTX a 24, 48 y 72h", "Creatinina y electrolitos cada 12h", "No administrar si pH urinario <7", "Intratecal: SOLO sin conservantes"],
        "preparacionParenteral": {
            "reconstitucion": "Polvo: reconstituir con SF 0.9% según concentración deseada.",
            "dilucion": "Alta dosis: diluir en 500-1000 mL de SG 5% con bicarbonato.",
            "volumenAdministracion": "500-1000 mL (con hidratación asociada de 3 L/m²/día)",
            "velocidadAdministracion": "Variable según protocolo: 4-24h. Intratecal: 1-2 min.",
            "estabilidad": "Diluido: 24h a temp ambiente. Proteger de la luz."
        },
        "unidadId": "u12",
        "capituloId": "c12_05"
    },
    # ── u11 Emergencias ──
    {
        "id": "acido_tranexamico_emergencia",
        "nombre": "Ácido tranexámico (trauma/hemorragia)",
        "nombreGenerico": "Ácido tranexámico",
        "nombresComerciales": ["Lysteda", "Cyklokapron"],
        "familia": "Antifibrinolíticos",
        "clasificacion": "Antifibrinolítico - Inhibidor de plasmina",
        "mecanismoAccion": "Análogo de lisina que bloquea reversiblemente los sitios de unión de lisina en el plasminógeno, inhibiendo la fibrinólisis. Estabiliza el coágulo formado.",
        "indicaciones": ["Hemorragia asociada a trauma (protocolo CRASH-2)", "Hemorragia postparto", "Hemorragia perioperatoria", "Menorragia severa"],
        "contraindicaciones": ["Trombosis activa (TVP, TEP, ACV isquémico agudo)", "Coagulación intravascular diseminada activa", "Hematuria de origen renal (riesgo de obstrucción ureteral)"],
        "efectosAdversos": ["Náuseas", "Diarrea", "Hipotensión (infusión rápida)", "Trombosis (raro)", "Convulsiones (dosis altas)"],
        "interacciones": ["Complejos protrombínicos: riesgo trombótico aditivo", "Anticonceptivos hormonales: riesgo trombótico aditivo"],
        "viaAdministracion": ["IV", "oral"],
        "dosis": {
            "adulto": "Trauma: 1 g IV en 10 min dentro de 3h del trauma + 1 g en 8h. Hemorragia postparto: 1 g IV en 10 min. Perioperatorio: 10-15 mg/kg IV."
        },
        "presentaciones": ["Solución inyectable 100 mg/mL ampolla 5 mL (500 mg)", "Comprimidos 500 mg y 650 mg"],
        "embarazo": "B",
        "lactancia": "Compatible. Mínima excreción en leche.",
        "cuidadosEnfermeria": ["TIEMPO CRÍTICO: administrar dentro de 3h del trauma (CRASH-2)", "Infundir 1 g en 10 min (no más rápido)", "Monitorizar signos de trombosis", "En hemorragia postparto: administrar antes de 3h", "Verificar que no haya CID antes de administrar"],
        "preparacionParenteral": {
            "reconstitucion": "No requiere.",
            "dilucion": "Diluir 1 g (10 mL) en 100 mL de SF 0.9% o SG 5%.",
            "volumenAdministracion": "100 mL",
            "velocidadAdministracion": "1ª dosis: 100 mL en 10 min. 2ª dosis: 100 mL en 8h.",
            "estabilidad": "Diluido estable 24h a temperatura ambiente."
        },
        "unidadId": "u11",
        "capituloId": "c11_02"
    },
    # ── u02 Cardiovascular ──
    {
        "id": "alteplasa_iam",
        "nombre": "Alteplasa (protocolo IAM)",
        "nombreGenerico": "Alteplasa",
        "nombresComerciales": ["Activase", "Actilyse"],
        "familia": "Trombolíticos",
        "clasificacion": "Activador tisular del plasminógeno recombinante",
        "mecanismoAccion": "Se une a la fibrina del trombo y convierte el plasminógeno en plasmina localmente, causando fibrinólisis del coágulo.",
        "indicaciones": ["IAM con elevación del ST (IAMCEST) cuando ICP no disponible en <120 min", "Tromboembolismo pulmonar masivo con inestabilidad hemodinámica"],
        "contraindicaciones": ["Hemorragia activa", "ACV hemorrágico previo", "ACV isquémico <3 meses", "Cirugía mayor <3 semanas", "Tumor intracraneal", "Disección aórtica"],
        "efectosAdversos": ["Hemorragia (cualquier sitio)", "Hemorragia intracraneal (0.5-1%)", "Arritmias de reperfusión", "Hipotensión", "Reacciones alérgicas (raro)"],
        "interacciones": ["Anticoagulantes/antiagregantes: mayor riesgo sangrado", "No administrar por misma vía que heparina"],
        "viaAdministracion": ["IV"],
        "dosis": {
            "adulto": "IAM (protocolo acelerado 90 min): 15 mg bolo + 0.75 mg/kg en 30 min (máx 50 mg) + 0.5 mg/kg en 60 min (máx 35 mg). Total máx: 100 mg. TEP: 100 mg en 2h."
        },
        "presentaciones": ["Polvo liofilizado 50 mg y 100 mg con diluyente"],
        "embarazo": "C",
        "lactancia": "Precaución.",
        "cuidadosEnfermeria": ["Verificar criterios y contraindicaciones antes de administrar", "Acceso IV dedicado exclusivo", "Monitorización ECG continua (arritmias de reperfusión)", "No punciones arteriales ni procedimientos invasivos durante 24h", "Tener disponible: ácido tranexámico, crioprecipitado, plaquetas", "Documentar hora exacta de inicio de síntomas y de trombolisis"],
        "preparacionParenteral": {
            "reconstitucion": "Reconstituir 50 mg con 50 mL o 100 mg con 100 mL de agua estéril (1 mg/mL).",
            "dilucion": "No requiere dilución adicional.",
            "volumenAdministracion": "15 mL bolo + 50 mL en 30 min + 35 mL en 60 min (protocolo IAM)",
            "velocidadAdministracion": "Bolo 15 mg en 1-2 min. Resto por bomba de infusión según protocolo.",
            "estabilidad": "Reconstituido: 8h a temp ambiente. No agitar."
        },
        "unidadId": "u10",
        "capituloId": "c10_02"
    },
    # Más nuevos del SNC
    {
        "id": "valproato_iv",
        "nombre": "Valproato sódico IV (estatus epiléptico)",
        "nombreGenerico": "Valproato sódico",
        "nombresComerciales": ["Depacon", "Convulex IV"],
        "familia": "Anticonvulsivantes IV",
        "clasificacion": "Antiepiléptico de amplio espectro IV",
        "mecanismoAccion": "Aumenta niveles de GABA, bloquea canales de sodio voltaje-dependientes y canales T de calcio. Acción anticonvulsivante de amplio espectro.",
        "indicaciones": ["Estatus epiléptico (2ª línea)", "Crisis convulsivas cuando no es posible vía oral", "Migraña aguda refractaria (off-label)"],
        "contraindicaciones": ["Hepatopatía activa", "Trastornos del ciclo de la urea", "Porfiria", "Embarazo (alto riesgo teratogénico)"],
        "efectosAdversos": ["Trombocitopenia", "Hepatotoxicidad", "Pancreatitis", "Hiperamonemia", "Náuseas", "Temblor"],
        "interacciones": ["Carbapenémicos: reducen niveles de valproato drásticamente (evitar combinación)", "Lamotrigina: aumenta sus niveles 2x", "Warfarina: desplaza de proteínas"],
        "viaAdministracion": ["IV"],
        "dosis": {
            "adulto": "Estatus: 20-40 mg/kg IV a 3-6 mg/kg/min. Mantenimiento: 1-2 mg/kg/h o pasar a oral.",
            "pediatrico": "20 mg/kg IV a 3 mg/kg/min. Mantenimiento: 1 mg/kg/h."
        },
        "presentaciones": ["Solución para infusión 100 mg/mL vial 5 mL (500 mg)"],
        "embarazo": "X",
        "lactancia": "Compatible con precaución. Monitorizar lactante.",
        "cuidadosEnfermeria": ["Velocidad de infusión ≤6 mg/kg/min (riesgo hipotensión)", "Monitorizar niveles plasmáticos (50-100 mcg/mL)", "Hemograma y función hepática basales y periódicos", "CONTRAINDICADO con carbapenémicos (meropenem, imipenem)", "Vigilar signos de hiperamonemia: letargia, vómitos"],
        "preparacionParenteral": {
            "reconstitucion": "No requiere.",
            "dilucion": "Diluir en 50-100 mL de SF 0.9% o SG 5% o Ringer Lactato.",
            "volumenAdministracion": "50-100 mL",
            "velocidadAdministracion": "Carga: 3-6 mg/kg/min (20 mg/kg en ~15-20 min). Mantenimiento: 1-2 mg/kg/h.",
            "estabilidad": "Diluido: estable 24h a temperatura ambiente."
        },
        "unidadId": "u01",
        "capituloId": "c01_04"
    },
    # Renal/electrolitos
    {
        "id": "fosfato_sodico_iv",
        "nombre": "Fosfato sódico IV",
        "nombreGenerico": "Fosfato de sodio",
        "nombresComerciales": ["Fosfato Na IV"],
        "familia": "Electrolitos de reposición",
        "clasificacion": "Suplemento de fósforo parenteral",
        "mecanismoAccion": "Reposición directa de fósforo inorgánico. El fosfato es esencial para metabolismo energético (ATP), estructura ósea y función celular.",
        "indicaciones": ["Hipofosfatemia moderada-severa (<1.5 mg/dL)", "Hipofosfatemia en nutrición parenteral", "Hipofosfatemia por síndrome de realimentación"],
        "contraindicaciones": ["Hiperfosfatemia", "Hipocalcemia severa (el fosfato quela calcio)", "Hipercalcemia (cuando se usa fosfato de calcio)", "Insuficiencia renal severa (CrCl <30)"],
        "efectosAdversos": ["Hipocalcemia (precipitación de fosfato cálcico)", "Hiperfosfatemia", "Hipotensión (infusión rápida)", "Hipernatremia/hipercalemia (según sal)", "Calcificación ectópica"],
        "interacciones": ["Calcio IV: precipita — NUNCA mezclar ni infundir por misma vía", "Sucralfato/antiácidos: reducen absorción oral"],
        "viaAdministracion": ["IV"],
        "dosis": {
            "adulto": "Leve (2-2.5 mg/dL): 0.08-0.16 mmol/kg en 4-6h. Severa (<1 mg/dL): 0.25-0.5 mmol/kg en 6-8h."
        },
        "presentaciones": ["Solución inyectable fosfato sódico 3 mmol/mL (ampolla 10 mL)"],
        "embarazo": "C",
        "lactancia": "Compatible a dosis de reposición.",
        "cuidadosEnfermeria": ["NUNCA mezclar con calcio (precipitación letal)", "Infundir lentamente en 4-8h", "Monitorizar calcio, fósforo y potasio cada 6h", "Vía central preferente para concentraciones altas", "Vigilar síndrome de realimentación (pacientes desnutridos)", "Verificar función renal antes"],
        "preparacionParenteral": {
            "reconstitucion": "No requiere.",
            "dilucion": "Diluir en 250-500 mL de SF 0.9% o SG 5%. NUNCA con soluciones que contengan calcio.",
            "volumenAdministracion": "250-500 mL",
            "velocidadAdministracion": "Infundir en 4-8 horas. Máx: 7 mmol/h (fosfato).",
            "estabilidad": "Diluido: 24h a temperatura ambiente. Verificar ausencia de precipitado."
        },
        "unidadId": "u12",
        "capituloId": "c12_02"
    },
    # Emergencia
    {
        "id": "glucosa50_emergencia",
        "nombre": "Glucosa 50% (hipoglucemia severa)",
        "nombreGenerico": "Dextrosa al 50%",
        "nombresComerciales": ["Glucosa 50%", "Dextrosa 50%"],
        "familia": "Soluciones de emergencia",
        "clasificacion": "Solución hipertónica de glucosa",
        "mecanismoAccion": "Aporte directo de glucosa al torrente sanguíneo para corrección rápida de hipoglucemia. 50 mL al 50% = 25 g de glucosa.",
        "indicaciones": ["Hipoglucemia severa con alteración de consciencia", "Hipoglucemia en paciente sin acceso oral", "Coma hipoglucémico"],
        "contraindicaciones": ["Hiperglucemia", "Edema cerebral con hiperglucemia", "Coma hiperosmolar"],
        "efectosAdversos": ["Hiperglucemia rebote", "Flebitis/tromboflebitis (solución hipertónica)", "Necrosis tisular por extravasación", "Edema"],
        "interacciones": ["Insulina: efecto antagonizado", "Corticoides: hiperglucemia aditiva"],
        "viaAdministracion": ["IV"],
        "dosis": {
            "adulto": "25-50 mL de SG 50% (12.5-25 g glucosa) IV. Seguir con SG 10% en infusión.",
            "pediatrico": "0.5-1 g/kg: SG 10% (5-10 mL/kg) o SG 25% (2-4 mL/kg). NO usar SG 50% en <2 años."
        },
        "presentaciones": ["Ampollas SG 50% x 50 mL", "Ampollas SG 25% x 10 mL", "Bolsas SG 10% x 500 mL"],
        "embarazo": "A",
        "lactancia": "Compatible.",
        "cuidadosEnfermeria": ["Verificar glucemia capilar antes de administrar", "Administrar por vía IV gruesa (periférica) o central", "Vigilar extravasación (solución vesicante al 50%)", "Controlar glucemia cada 15 min post-administración", "Iniciar SG 10% tras bolo para evitar re-hipoglucemia", "En pediatría: usar SG 10% (nunca SG 50% en neonatos)"],
        "preparacionParenteral": {
            "reconstitucion": "No requiere. Solución lista.",
            "dilucion": "No diluir para emergencia. Puede diluir al 10-25% para infusión.",
            "volumenAdministracion": "Emergencia: 50 mL (SG 50%). Mantenimiento: 500 mL (SG 10%).",
            "velocidadAdministracion": "SG 50%: 25-50 mL IV en 3-5 min. SG 10%: 80-125 mL/h mantenimiento.",
            "estabilidad": "Estable. 24h tras apertura."
        },
        "unidadId": "u11",
        "capituloId": "c11_02"
    },
]

def main():
    with open(DRUGS_PATH, 'r', encoding='utf-8') as f:
        drugs = json.load(f)
    with open(CATS_PATH, 'r', encoding='utf-8') as f:
        cats = json.load(f)

    existing_ids = {d['id'] for d in drugs}
    added = 0

    for nd in NEW_DRUGS:
        if nd['id'] in existing_ids:
            print(f"  SKIP duplicate: {nd['id']}")
            continue
        nd['searchText'] = search_text(nd)
        drugs.append(nd)
        existing_ids.add(nd['id'])
        # Add to categories
        cap_id = nd['capituloId']
        for u in cats['unidades']:
            for ch in u['capitulos']:
                if ch['id'] == cap_id:
                    if nd['id'] not in ch['drugIds']:
                        ch['drugIds'].append(nd['id'])
        added += 1

    with open(DRUGS_PATH, 'w', encoding='utf-8') as f:
        json.dump(drugs, f, ensure_ascii=False, indent=2)
    with open(CATS_PATH, 'w', encoding='utf-8') as f:
        json.dump(cats, f, ensure_ascii=False, indent=2)

    print(f"Added {added} new drugs. Total drugs: {len(drugs)}")

if __name__ == '__main__':
    main()
