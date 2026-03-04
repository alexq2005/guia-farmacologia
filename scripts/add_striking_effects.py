#!/usr/bin/env python3
"""
Agrega efectos adversos llamativos y clínicamente memorables a los fármacos.
Cada efecto se marca con ⚠️ para resaltar su importancia clínica.
Solo agrega efectos que NO existan ya en el array efectosAdversos del fármaco.
"""

import json
import re

def normalize(s):
    """Normaliza texto para comparación (lowercase, sin acentos, sin puntuación extra)."""
    s = s.lower().strip()
    # Remove emoji/symbols at start
    s = re.sub(r'^[⚠️🔴⛔️❗]+\s*', '', s)
    return s

def already_has(existing_effects, keyword):
    """Chequea si algún efecto existente ya menciona la palabra clave."""
    keyword_lower = keyword.lower()
    for e in existing_effects:
        if keyword_lower in e.lower():
            return True
    return False

# ─────────────────────────────────────────────
# Diccionario: drug_id → lista de efectos nuevos a agregar
# Solo se agregan si no existe ya un efecto similar
# ─────────────────────────────────────────────

STRIKING_EFFECTS = {
    # ═══════════════════════════════════════════
    # u01 - SISTEMA NERVIOSO
    # ═══════════════════════════════════════════
    "paracetamol": [
        "⚠️ HEPATITIS FULMINANTE en sobredosis (>4g/día) — causa #1 de trasplante hepático de urgencia",
        "⚠️ Dosis tóxica: >150 mg/kg en niños; antídoto: N-acetilcisteína dentro de 8-10 h",
    ],
    "morfina": [
        "⚠️ DEPRESIÓN RESPIRATORIA FATAL — riesgo máximo en ancianos, EPOC, apnea del sueño",
        "⚠️ Tolerancia y dependencia física (síndrome de abstinencia: diarrea, piloerección, midriasis)",
        "⚠️ Retención urinaria aguda (especialmente postquirúrgica)",
    ],
    "tramadol": [
        "⚠️ CONVULSIONES (dosis >400 mg/día o combinado con ISRS)",
        "⚠️ Síndrome serotoninérgico (combinado con antidepresivos) — hipertermia, rigidez, coma",
        "⚠️ Dependencia y síndrome de abstinencia (infravalorado por considerarse 'opiode débil')",
    ],
    "fentanilo": [
        "⚠️ TÓRAX LEÑOSO (rigidez muscular torácica) — imposibilita la ventilación manual",
        "⚠️ Potencia 100x mayor que morfina: error de dosis = muerte",
        "⚠️ Parche transdérmico: NUNCA cortar ni exponer a calor (absorción masiva letal)",
    ],
    "codeina": [
        "⚠️ MUERTE EN METABOLIZADORES ULTRARRÁPIDOS CYP2D6 (se convierte toda a morfina)",
        "⚠️ CONTRAINDICADA en <12 años y post-amigdalectomía (muertes pediátricas documentadas)",
    ],
    "diazepam": [
        "⚠️ REACCIÓN PARADÓJICA en ancianos y niños: agitación, agresividad, delirium",
        "⚠️ Depresión respiratoria fatal si se combina con opioides o alcohol",
        "⚠️ Vida media >100h en ancianos (acumulación por metabolitos activos)",
    ],
    "midazolam": [
        "⚠️ PARO RESPIRATORIO si se administra IV rápido — tener flumazenilo disponible",
        "⚠️ Reacción paradójica: agitación psicomotriz (especialmente en ancianos y niños)",
    ],
    "clonazepam": [
        "⚠️ Dependencia severa — síndrome de abstinencia puede causar convulsiones y muerte",
        "⚠️ Reacción paradójica en ancianos: agresividad, desinhibición",
        "⚠️ NUNCA suspender abruptamente (reducir 25% cada 2 semanas mínimo)",
    ],
    "fenitoina": [
        "⚠️ SÍNDROME DE STEVENS-JOHNSON / Necrólisis epidérmica tóxica (potencialmente letal)",
        "⚠️ 'CARA DE FENITOÍNA': hiperplasia gingival + facies tosca + hirsutismo (uso crónico)",
        "⚠️ PURPLE GLOVE SYNDROME: necrosis por extravasación IV (pH 12 — muy alcalino)",
        "⚠️ Cinética de saturación: pequeños aumentos de dosis causan toxicidad desproporcionada",
    ],
    "carbamazepina": [
        "⚠️ SÍNDROME DE STEVENS-JOHNSON — riesgo 10x mayor en portadores HLA-B*1502 (asiáticos)",
        "⚠️ DRESS (reacción a fármacos con eosinofilia y síntomas sistémicos) — potencialmente fatal",
        "⚠️ Anemia aplásica y agranulocitosis (requiere hemograma periódico)",
        "⚠️ Hiponatremia severa (SIADH) — especialmente en ancianos",
    ],
    "acido_valproico": [
        "⚠️ HEPATOTOXICIDAD FATAL en <2 años (especialmente con politerapia anticonvulsiva)",
        "⚠️ TERATÓGENO MAYOR: espina bífida (1-2%), malformaciones craneofaciales, CI bajo",
        "⚠️ Pancreatitis hemorrágica (puede ser fulminante)",
        "⚠️ Síndrome de ovario poliquístico (uso prolongado en mujeres jóvenes)",
        "⚠️ Hiperamonemia encefálica (confusión, letargia) — incluso con niveles normales del fármaco",
    ],
    "lamotrigina": [
        "⚠️ SÍNDROME DE STEVENS-JOHNSON / NET — riesgo alto si se titula rápido o se combina con valproato",
        "⚠️ Rash severo: suspender inmediatamente ante cualquier erupción cutánea",
    ],
    "levetiracetam": [
        "⚠️ Cambios conductuales: irritabilidad, agresividad, psicosis (especialmente en niños)",
        "⚠️ Ideación suicida (monitorear estado anímico — alerta FDA/ANMAT)",
    ],
    "pregabalina": [
        "⚠️ Potencial de ABUSO y DEPENDENCIA — clasificada como sustancia controlada en varios países",
        "⚠️ Síndrome de abstinencia: insomnio, náuseas, ansiedad, convulsiones",
        "⚠️ Angioedema (edema facial, lengua, laringe) — puede comprometer vía aérea",
    ],
    "gabapentina": [
        "⚠️ DEPRESIÓN RESPIRATORIA cuando se combina con opioides (alerta FDA 2019)",
        "⚠️ Potencial de abuso (en aumento, especialmente en pacientes con antecedentes de adicción)",
    ],
    "levodopa": [
        "⚠️ DISCINESIAS INCAPACITANTES (movimientos involuntarios) con uso prolongado (>5 años)",
        "⚠️ Fenómeno ON-OFF: fluctuaciones motoras impredecibles (paciente 'se congela')",
        "⚠️ Alucinaciones y psicosis dopaminérgica (especialmente en ancianos)",
        "⚠️ Síndrome de desregulación dopaminérgica: ludopatía, hipersexualidad, compras compulsivas",
    ],
    "haloperidol": [
        "⚠️ MUERTE SÚBITA por torsades de pointes (QT prolongado) — ECG previo obligatorio",
        "⚠️ AUMENTO DE MORTALIDAD en ancianos con demencia (alerta de recuadro negro FDA)",
        "⚠️ Distonía aguda: tortícolis, crisis oculógira — tratar con biperideno IV",
        "⚠️ Discinesia tardía IRREVERSIBLE (movimientos oro-faciales) con uso crónico",
    ],
    "risperidona": [
        "⚠️ AUMENTO DE MORTALIDAD en ancianos con demencia (recuadro negro FDA)",
        "⚠️ Hiperprolactinemia severa: ginecomastia, galactorrea, amenorrea, osteoporosis",
        "⚠️ Síndrome metabólico: aumento de peso marcado, diabetes, dislipidemia",
    ],
    "quetiapina": [
        "⚠️ CETOACIDOSIS DIABÉTICA (debut diabético) — monitorear glucemia periódicamente",
        "⚠️ Aumento de peso severo (10-20 kg en meses)",
        "⚠️ Prolongación QT — ECG basal y periódico",
        "⚠️ Cataratas (reportes con uso prolongado — control oftalmológico anual)",
    ],
    "olanzapina": [
        "⚠️ SÍNDROME METABÓLICO SEVERO: aumento de peso promedio 6-10 kg en 6 meses",
        "⚠️ Cetoacidosis diabética (puede ser debut diabético sin antecedentes)",
        "⚠️ Post-inyección IM depot: SÍNDROME POST-INYECCIÓN (sedación profunda, delirium, coma) — observar 3h",
    ],
    "clozapina": [
        "⚠️ AGRANULOCITOSIS FATAL (1-2%) — hemograma semanal las primeras 18 semanas, luego mensual",
        "⚠️ Miocarditis y cardiomiopatía (primeras semanas) — monitorear troponina y PCR",
        "⚠️ Convulsiones dosis-dependientes (>600 mg/día)",
        "⚠️ Íleo paralítico (puede ser fatal) — monitorear función intestinal",
        "⚠️ Sialorrea nocturna profusa (babeo) — paradójica para un anticolinérgico",
    ],
    "litio": [
        "⚠️ MARGEN TERAPÉUTICO ESTRECHO: nivel terapéutico 0.6-1.2 mEq/L, tóxico >1.5 mEq/L",
        "⚠️ INTOXICACIÓN LETAL: temblor grueso → confusión → convulsiones → coma → muerte",
        "⚠️ Diabetes insípida nefrogénica (poliuria >3L/día) — puede ser irreversible",
        "⚠️ Hipotiroidismo (hasta 30% de pacientes) — bocio",
        "⚠️ Toxicidad precipitada por deshidratación, AINEs, IECA, diuréticos",
        "⚠️ Teratógeno: anomalía de Ebstein (malformación cardíaca)",
    ],
    "sertralina": [
        "⚠️ Ideación suicida en <25 años (primeras semanas — alerta recuadro negro FDA)",
        "⚠️ Síndrome serotoninérgico si se combina con IMAO, tramadol o triptanes",
        "⚠️ Síndrome de discontinuación: 'brain zaps' (descargas eléctricas cerebrales), mareo, irritabilidad",
        "⚠️ Hemorragia GI (inhibe función plaquetaria, riesgo con AINEs/anticoagulantes)",
    ],
    "fluoxetina": [
        "⚠️ Ideación suicida en <25 años (recuadro negro FDA — mayor riesgo semanas 1-4)",
        "⚠️ Vida media ultra larga (4-6 días) + metabolito activo (7-15 días) — interacciones prolongadas",
        "⚠️ NUNCA combinar con IMAO (esperar 5 semanas de washout por vida media larga)",
        "⚠️ Síndrome serotoninérgico: hipertermia >40°C, rigidez, mioclonías, puede ser fatal",
    ],
    "amitriptilina": [
        "⚠️ CARDIOTOXICIDAD en sobredosis: arritmias ventriculares, QRS ancho, bloqueo AV — letal",
        "⚠️ SOBREDOSIS LETAL con margen pequeño (10x la dosis terapéutica puede matar)",
        "⚠️ Retención urinaria aguda (especialmente en ancianos con hiperplasia prostática)",
        "⚠️ Glaucoma agudo de ángulo cerrado (efecto anticolinérgico)",
    ],
    "venlafaxina": [
        "⚠️ CRISIS HIPERTENSIVA con dosis altas (>225 mg/día) — monitorear TA",
        "⚠️ Síndrome de discontinuación SEVERO (peor que otros ISRS — nunca suspender bruscamente)",
        "⚠️ Cardiotoxicidad en sobredosis (similar a tricíclicos a dosis altas)",
    ],
    "duloxetina": [
        "⚠️ Hepatotoxicidad (no usar con insuficiencia hepática ni consumo excesivo de alcohol)",
        "⚠️ Síndrome de discontinuación severo — reducir gradualmente en semanas",
        "⚠️ SIADH e hiponatremia (especialmente en ancianos)",
    ],
    "biperideno": [
        "⚠️ Delirium anticolinérgico en ancianos (confusión, agitación, alucinaciones)",
        "⚠️ Potencial de abuso (euforizante en combinación con antipsicóticos)",
        "⚠️ Glaucoma agudo y retención urinaria (emergencias anticolinérgicas)",
    ],
    "ketamina": [
        "⚠️ ALUCINACIONES y experiencia disociativa ('viaje') — especialmente al despertar",
        "⚠️ Cistitis hemorrágica (uso crónico/abuso — destrucción vesical irreversible)",
        "⚠️ Laringoespasmo (más frecuente en niños)",
        "⚠️ Hipertensión intracraneal (contraindicada en TCE con HTE)",
    ],
    "propofol": [
        "⚠️ SÍNDROME DE INFUSIÓN DE PROPOFOL: rabdomiólisis + acidosis láctica + fallo multiorgánico + MUERTE",
        "⚠️ Se presenta en infusiones >48h a dosis >4 mg/kg/h (UCI pediátrica: mayor riesgo)",
        "⚠️ Apnea inmediata (tener equipo de vía aérea listo antes de administrar)",
        "⚠️ Dolor intenso a la inyección IV (mitigar con lidocaína previa)",
    ],
    "succinilcolina": [
        "⚠️ HIPERTERMIA MALIGNA: rigidez muscular + hipertermia >42°C + rabdomiólisis → MUERTE",
        "⚠️ Tratamiento: dantroleno IV inmediato (debe estar siempre disponible en quirófano)",
        "⚠️ HIPERPOTASEMIA LETAL en quemados, politraumatizados, denervación muscular",
        "⚠️ Paro cardíaco por K+ en miopatías ocultas (distrofia de Duchenne en niños)",
    ],
    "lidocaina": [
        "⚠️ TOXICIDAD SISTÉMICA: sabor metálico → acúfenos → convulsiones → paro cardíaco",
        "⚠️ Dosis máxima: 4.5 mg/kg sin adrenalina, 7 mg/kg con adrenalina — NUNCA exceder",
        "⚠️ Inyección intravascular accidental = convulsiones inmediatas",
    ],
    "oxcarbazepina": [
        "⚠️ Hiponatremia severa (mayor que carbamazepina) — especialmente en ancianos con diuréticos",
        "⚠️ Reacciones cutáneas graves (25% de alérgicos a carbamazepina también reaccionan)",
    ],
    "topiramato": [
        "⚠️ DETERIORO COGNITIVO: bradipsiquia, dificultad para encontrar palabras ('efecto estupidizante')",
        "⚠️ Glaucoma agudo de ángulo cerrado (dolor ocular + visión borrosa = urgencia)",
        "⚠️ Litiasis renal (inhibidor de anhidrasa carbónica — alcaliniza orina)",
        "⚠️ Teratogenicidad: labio leporino y paladar hendido",
    ],

    # ═══════════════════════════════════════════
    # u02 - SISTEMA CARDIOVASCULAR
    # ═══════════════════════════════════════════
    "enalapril": [
        "⚠️ ANGIOEDEMA (edema de lengua/laringe) — puede ser FATAL por obstrucción de vía aérea",
        "⚠️ TERATÓGENO ABSOLUTO: displasia renal fetal, oligohidramnios, muerte fetal (2do-3er trimestre)",
        "⚠️ Insuficiencia renal aguda bilateral si estenosis de arteria renal",
    ],
    "captopril": [
        "⚠️ ANGIOEDEMA potencialmente letal (edema de glotis)",
        "⚠️ TERATÓGENO: malformaciones renales fetales — CONTRAINDICADO en embarazo",
        "⚠️ Disgeusia (pérdida del gusto) y neutropenia",
    ],
    "losartan": [
        "⚠️ TERATÓGENO como los IECA — CONTRAINDICADO en embarazo (2do y 3er trimestre)",
        "⚠️ Hiperpotasemia severa si se combina con IECA + espironolactona ('triple bloqueo letal')",
    ],
    "amlodipino": [
        "⚠️ Hiperplasia gingival (similar a fenitoína, especialmente con ciclosporina)",
        "⚠️ Edema maleolar que NO responde a diuréticos (es vasodilatación, no retención)",
    ],
    "atenolol": [
        "⚠️ NUNCA suspender bruscamente: rebote simpático → crisis hipertensiva, angina, IAM",
        "⚠️ Enmascara signos de hipoglucemia en diabéticos (no hay taquicardia de alarma)",
        "⚠️ Broncoespasmo severo en asmáticos (contraindicación absoluta)",
    ],
    "carvedilol": [
        "⚠️ NUNCA suspender abruptamente — riesgo de IAM y muerte súbita por rebote",
        "⚠️ Descompensación aguda de IC al iniciar (empezar con dosis mínima y titular lento)",
    ],
    "propranolol": [
        "⚠️ BRONCOESPASMO FATAL en asmáticos — CONTRAINDICACIÓN ABSOLUTA",
        "⚠️ ENMASCARA HIPOGLUCEMIA: diabéticos no sienten taquicardia de alarma → coma hipoglucémico",
        "⚠️ Rebote simpático si se suspende bruscamente: crisis hipertensiva, angina, IAM",
    ],
    "amiodarona": [
        "⚠️ 'PULMÓN DE AMIODARONA': fibrosis pulmonar irreversible y potencialmente FATAL (2-5%)",
        "⚠️ PIEL AZUL-GRISÁCEA permanente (depósitos de yodo) con uso prolongado",
        "⚠️ Microdepósitos corneales (en casi 100% de pacientes — generalmente asintomáticos)",
        "⚠️ Vida media de 40-55 DÍAS: los efectos adversos persisten meses tras suspender",
        "⚠️ Contiene YODO: causa hipo o hipertiroidismo (control tiroideo cada 6 meses)",
        "⚠️ Hepatotoxicidad (hepatitis pseudoalcohólica, cirrosis)",
        "⚠️ Neuropatía óptica: puede causar CEGUERA",
    ],
    "digoxina": [
        "⚠️ MARGEN TERAPÉUTICO MUY ESTRECHO: terapéutico 0.5-2 ng/mL, tóxico >2 ng/mL",
        "⚠️ XANTOPSIA (visión amarilla) — signo clásico de intoxicación digitálica",
        "⚠️ ARRITMIAS LETALES: cualquier arritmia es posible (la más típica: taquicardia auricular con bloqueo)",
        "⚠️ Intoxicación precipitada por hipopotasemia (diuréticos) — controlar K+ siempre",
        "⚠️ Antídoto: fragmentos Fab antidigoxina (Digibind)",
    ],
    "warfarina": [
        "⚠️ HEMORRAGIA INTRACRANEAL espontánea (complicación más temida)",
        "⚠️ NECROSIS CUTÁNEA (primeros días) por trombosis en déficit de proteína C/S",
        "⚠️ SÍNDROME DEL DEDO AZUL: microembolias de colesterol (coloración violácea)",
        "⚠️ Teratógeno (1er trimestre): hipoplasia nasal, condrodisplasia punteada",
        "⚠️ >200 interacciones medicamentosas: SIEMPRE verificar antes de agregar otro fármaco",
        "⚠️ Antídoto: vitamina K (fitomenadiona) + plasma fresco congelado en urgencia",
    ],
    "nitroglicerina": [
        "⚠️ TOLERANCIA RÁPIDA (24-48h de uso continuo): dejar ventana libre de 10-12h/día",
        "⚠️ INTERACCIÓN LETAL con sildenafil/tadalafil: hipotensión refractaria → muerte",
    ],
    "furosemida": [
        "⚠️ HIPOPOTASEMIA SEVERA → arritmias letales (especialmente con digoxina)",
        "⚠️ OTOTOXICIDAD (sordera) con dosis altas IV o combinada con aminoglucósidos",
        "⚠️ Alcalosis metabólica hipoclorémica (puede causar encefalopatía hepática en cirróticos)",
    ],
    "espironolactona": [
        "⚠️ HIPERPOTASEMIA LETAL (especialmente con IECA/ARA-II + IRC)",
        "⚠️ Ginecomastia dolorosa en varones (hasta 10%) — efecto antiandrogénico",
    ],
    "hidroclorotiazida": [
        "⚠️ Hiponatremia severa (especialmente en ancianas delgadas) → confusión, convulsiones",
        "⚠️ Fotosensibilidad severa y riesgo aumentado de cáncer de piel (uso crónico)",
        "⚠️ Pancreatitis aguda (efecto idiosincrático)",
    ],
    "nitroprusiato": [
        "⚠️ INTOXICACIÓN POR CIANURO si infusión >48h o dosis >2 µg/kg/min",
        "⚠️ Tiocianato tóxico (confusión, convulsiones) en insuficiencia renal",
        "⚠️ Proteger de la luz (fotodegradación → mayor producción de cianuro)",
    ],
    "dopamina": [
        "⚠️ NECROSIS TISULAR SEVERA por extravasación → antídoto local: fentolamina",
        "⚠️ Taquiarritmias letales a dosis altas (>10 µg/kg/min: efecto alfa predominante)",
    ],
    "noradrenalina": [
        "⚠️ NECROSIS y GANGRENA por extravasación → antídoto: infiltración local de fentolamina",
        "⚠️ SIEMPRE administrar por vía central (acceso venoso central obligatorio)",
        "⚠️ Isquemia mesentérica y de extremidades con uso prolongado",
    ],
    "adrenalina": [
        "⚠️ ARRITMIAS VENTRICULARES y MUERTE SÚBITA (especialmente con halotano)",
        "⚠️ Edema pulmonar agudo (sobredosis o en pacientes cardíacos)",
        "⚠️ NECROSIS de dedos si se infiltra en falanges terminales",
    ],
    "dobutamina": [
        "⚠️ Aumento de mortalidad con uso prolongado en IC (>72h — usar solo como puente)",
        "⚠️ Taquifilaxia: pierde efecto tras 72h de infusión continua",
    ],
    "lidocaina_antiarritmico": [
        "⚠️ TOXICIDAD SNC: parestesias peribucales → confusión → convulsiones → paro cardíaco",
        "⚠️ Ventana terapéutica estrecha: 1.5-5 µg/mL (ajustar en hepatopatía e IC)",
    ],
    "flecainida": [
        "⚠️ EFECTO PROARRÍTMICO: puede CAUSAR arritmias letales (estudio CAST: aumento de mortalidad)",
        "⚠️ CONTRAINDICADA post-IAM y en cardiopatía estructural",
    ],
    "sotalol": [
        "⚠️ TORSADES DE POINTES (prolongación QT dosis-dependiente) — iniciar con monitoreo ECG 3 días",
        "⚠️ Bradicardia severa + broncoespasmo (tiene efecto beta-bloqueante)",
    ],
    "ivabradina": [
        "⚠️ FOSFENOS (destellos luminosos azulados) en 15% de pacientes — típico y benigno",
        "⚠️ Fibrilación auricular (3-5% más que placebo)",
    ],
    "rosuvastatina": [
        "⚠️ RABDOMIÓLISIS: dolor muscular severo + orina oscura + CPK >10x → fallo renal agudo",
        "⚠️ Riesgo multiplicado con fibratos (gemfibrozil), ciclosporina, macrólidos",
    ],
    "gemfibrozil": [
        "⚠️ RABDOMIÓLISIS si se combina con estatinas (especialmente simvastatina/lovastatina)",
        "⚠️ Colelitiasis (cálculos biliares por aumento de colesterol en bilis)",
    ],

    # ═══════════════════════════════════════════
    # u03 - ANTIINFECCIOSOS
    # ═══════════════════════════════════════════
    "amoxicilina": [
        "⚠️ RASH MONONUCLEÓSICO: erupción generalizada si se administra con mononucleosis (EBV) — no es alergia",
        "⚠️ Anafilaxia: siempre preguntar alergia a penicilinas antes de administrar",
        "⚠️ Colitis pseudomembranosa por C. difficile",
    ],
    "ampicilina": [
        "⚠️ Anafilaxia (reacción cruzada con alérgicos a penicilinas)",
        "⚠️ Rash no alérgico en mononucleosis infecciosa (90%)",
    ],
    "ciprofloxacino": [
        "⚠️ RUPTURA DEL TENDÓN DE AQUILES (especialmente >60 años, con corticoides, o trasplantados)",
        "⚠️ ANEURISMA y DISECCIÓN AÓRTICA (riesgo 2x — alerta FDA/EMA)",
        "⚠️ Neuropatía periférica IRREVERSIBLE (dolor, quemazón en extremidades)",
        "⚠️ Prolongación QT y torsades de pointes",
        "⚠️ Daño al cartílago en crecimiento: CONTRAINDICADA en <18 años (excepto infecciones graves)",
    ],
    "levofloxacino": [
        "⚠️ RUPTURA TENDINOSA (tendón de Aquiles) — mismo riesgo que ciprofloxacino",
        "⚠️ Aneurisma aórtico (alerta FDA/EMA 2018)",
        "⚠️ Hipoglucemia severa (especialmente en diabéticos con sulfonilureas)",
        "⚠️ Psicosis y convulsiones (neurotoxicidad central)",
    ],
    "gentamicina": [
        "⚠️ SORDERA IRREVERSIBLE (ototoxicidad coclear): ojo con dosis acumulada",
        "⚠️ NEFROTOXICIDAD: IRA no oligúrica → monitorear creatinina y niveles plasmáticos",
        "⚠️ Toxicidad vestibular: vértigo permanente (paciente no puede caminar sin tambalearse)",
        "⚠️ BLOQUEO NEUROMUSCULAR en combinación con relajantes musculares (apnea)",
    ],
    "amikacina": [
        "⚠️ SORDERA IRREVERSIBLE (más ototóxica que gentamicina a nivel coclear)",
        "⚠️ Nefrotoxicidad severa (monitorizar niveles valle <5 µg/mL y creatinina)",
        "⚠️ Potencia bloqueo neuromuscular: riesgo de apnea post-anestesia",
    ],
    "vancomicina": [
        "⚠️ 'SÍNDROME DEL HOMBRE ROJO': rubor, prurito, hipotensión si infusión <60 min (no es alergia)",
        "⚠️ Nefrotoxicidad (30%): monitorear niveles valle (15-20 µg/mL para infecciones graves)",
        "⚠️ Ototoxicidad irreversible (especialmente combinada con aminoglucósidos)",
    ],
    "linezolid": [
        "⚠️ SÍNDROME SEROTONINÉRGICO con ISRS/tramadol (es un IMAO débil)",
        "⚠️ Trombocitopenia severa (>14 días de uso: recuento plaquetario obligatorio)",
        "⚠️ Neuropatía óptica con CEGUERA si uso >28 días",
        "⚠️ Acidosis láctica (inhibición mitocondrial con uso prolongado)",
    ],
    "metronidazol": [
        "⚠️ EFECTO ANTABUSE (disulfiram): vómitos violentos si ingiere alcohol (incluso 48h después de suspender)",
        "⚠️ Neuropatía periférica IRREVERSIBLE con uso prolongado (>4 semanas)",
        "⚠️ Convulsiones (neurotoxicidad SNC con uso prolongado)",
    ],
    "trimetoprima_sulfametoxazol": [
        "⚠️ SÍNDROME DE STEVENS-JOHNSON / NET (más frecuente en VIH+)",
        "⚠️ Anemia hemolítica en déficit de G6PD (favismo)",
        "⚠️ Aplasia medular y agranulocitosis (uso prolongado)",
        "⚠️ Hiperpotasemia (trimetoprima bloquea canales de Na+ renales como amilorida)",
    ],
    "anfotericina_b": [
        "⚠️ 'ANFOTERRRIBLE': fiebre, escalofríos violentos (rigores) en CADA infusión",
        "⚠️ NEFROTOXICIDAD SEVERA (hasta 80% — a menudo irreversible) — la liposomal es menos tóxica",
        "⚠️ Hipopotasemia e hipomagnesemia severas (pérdida renal de electrolitos)",
        "⚠️ Anemia normocítica (supresión de eritropoyetina)",
    ],
    "fluconazol": [
        "⚠️ Hepatotoxicidad fatal (hepatitis colestásica — control de transaminasas)",
        "⚠️ Prolongación QT (riesgo de torsades con otros fármacos que prolongan QT)",
        "⚠️ TERATÓGENO a dosis altas (>150 mg) — malformaciones craneofaciales",
    ],
    "ketoconazol_topico": [
        "⚠️ La forma SISTÉMICA (oral) fue retirada/restringida por HEPATOTOXICIDAD FULMINANTE",
        "⚠️ Tópico: absorción sistémica mínima, pero evitar áreas extensas o piel dañada",
    ],
    "isoniazida": [
        "⚠️ HEPATOTOXICIDAD que puede ser FATAL (hepatitis tóxica, mayor riesgo >35 años y con alcohol)",
        "⚠️ Neuropatía periférica (prevenir con piridoxina/vitamina B6 — siempre prescribir juntos)",
        "⚠️ Convulsiones en sobredosis (antídoto: piridoxina IV dosis por dosis)",
        "⚠️ Lupus inducido por fármacos (acetiladores lentos)",
    ],
    "rifampicina": [
        "⚠️ TIÑE TODO DE NARANJA-ROJO: orina, lágrimas, sudor, saliva (avisar al paciente — no es sangre)",
        "⚠️ INDUCTOR ENZIMÁTICO MÁS POTENTE: reduce efecto de anticonceptivos, warfarina, antirretrovirales, etc.",
        "⚠️ Lentes de contacto blandos se tiñen de naranja permanentemente",
        "⚠️ Hepatotoxicidad (especialmente combinada con isoniacida)",
    ],
    "etambutol": [
        "⚠️ NEURITIS ÓPTICA RETROBULBAR: pérdida de visión de colores (rojo-verde) → CEGUERA si no se suspende",
        "⚠️ Control oftalmológico obligatorio mensual (agudeza visual + test de colores)",
    ],
    "pirazinamida": [
        "⚠️ HEPATOTOXICIDAD severa (la más hepatotóxica de los antituberculosos de primera línea)",
        "⚠️ Hiperuricemia severa → crisis de gota (inhibe excreción de ácido úrico)",
    ],
    "nitrofurantoina": [
        "⚠️ FIBROSIS PULMONAR con uso crónico (profilaxis >6 meses → Rx de tórax periódica)",
        "⚠️ Neuropatía periférica (irreversible si no se detecta temprano)",
        "⚠️ Hemólisis en déficit de G6PD",
    ],
    "aciclovir": [
        "⚠️ CRISTALURIA y fallo renal agudo (hidratación vigorosa + infusión lenta IV obligatorias)",
        "⚠️ Neurotoxicidad: temblor, alucinaciones, convulsiones (ajustar en insuficiencia renal)",
    ],
    "ganciclovir": [
        "⚠️ MIELOTOXICIDAD SEVERA: neutropenia (40%), trombocitopenia — hemograma 2-3 veces/semana",
        "⚠️ Teratógeno y carcinógeno (usar doble anticoncepción)",
    ],
    "colistina": [
        "⚠️ NEFROTOXICIDAD SEVERA (hasta 60% de pacientes) — monitoreo diario de función renal",
        "⚠️ Neurotoxicidad: parestesias periorales, mareo, debilidad muscular, apnea",
    ],
    "meropenem": [
        "⚠️ Convulsiones (menor riesgo que imipenem, pero posible en insuficiencia renal)",
        "⚠️ REDUCE niveles de ácido valproico (interacción clínicamente muy significativa → convulsiones)",
    ],
    "imipenem_cilastatina": [
        "⚠️ CONVULSIONES (3-5%, especialmente en IRC y patología SNC) — mayor riesgo que otros carbapenémicos",
        "⚠️ Reacción cruzada en alérgicos a penicilinas (precaución, no contraindicación absoluta)",
    ],

    # ═══════════════════════════════════════════
    # u04 - SISTEMA RESPIRATORIO
    # ═══════════════════════════════════════════
    "salbutamol": [
        "⚠️ HIPOPOTASEMIA severa (dosis repetidas en crisis asmática) → arritmias",
        "⚠️ Acidosis láctica (uso excesivo de nebulizaciones continuas)",
        "⚠️ Broncoespasmo paradójico (raro, por el propelente o excipientes)",
    ],
    "ipratropio": [
        "⚠️ Glaucoma agudo si el aerosol contacta los ojos (especialmente con nebulización en máscara)",
        "⚠️ Retención urinaria en ancianos con hiperplasia prostática",
    ],
    "teofilina": [
        "⚠️ MARGEN TERAPÉUTICO ESTRECHO: 10-20 µg/mL, tóxico >20 → convulsiones y arritmias",
        "⚠️ CONVULSIONES sin pródromos a niveles tóxicos (puede ser la primera manifestación)",
        "⚠️ Arritmias supraventriculares y ventriculares letales",
        "⚠️ Interacciones múltiples: ciprofloxacino, eritromicina, cimetidina DUPLICAN sus niveles",
    ],
    "montelukast": [
        "⚠️ ALTERACIONES NEUROPSIQUIÁTRICAS: agitación, agresividad, pesadillas, depresión, ideación suicida",
        "⚠️ Alerta de recuadro negro FDA (2020): evaluar riesgo/beneficio en cada paciente",
    ],
    "budesonida": [
        "⚠️ Candidiasis orofaríngea (enjuagar boca después de CADA inhalación — prevención clave)",
        "⚠️ Supresión adrenal con dosis altas crónicas (insuficiencia suprarrenal en estrés)",
        "⚠️ Retraso del crecimiento en niños (monitorizar talla anualmente)",
    ],
    "beclometasona": [
        "⚠️ Candidiasis oral (usar espaciador + enjuague bucal post-inhalación)",
        "⚠️ Disfonía (ronquera) por miopatía de cuerdas vocales",
    ],
    "acetilcisteina_mucolitico": [
        "⚠️ Broncoespasmo paradójico en asmáticos (puede empeorar crisis asmática)",
    ],
    "codeina_antitusivo": [
        "⚠️ DEPRESIÓN RESPIRATORIA FATAL en niños metabolizadores ultrarrápidos CYP2D6",
        "⚠️ CONTRAINDICADA en <12 años (muertes documentadas post-amigdalectomía)",
    ],

    # ═══════════════════════════════════════════
    # u05 - SISTEMA DIGESTIVO
    # ═══════════════════════════════════════════
    "omeprazol": [
        "⚠️ FRACTURAS ÓSEAS (cadera, muñeca, columna) con uso crónico >1 año",
        "⚠️ HIPOMAGNESEMIA severa (uso >3 meses) → arritmias, convulsiones, tetania",
        "⚠️ Déficit de vitamina B12 (uso >2 años → neuropatía, anemia megaloblástica)",
        "⚠️ Nefritis intersticial aguda (causa infradiagnosticada de IRA)",
        "⚠️ Infección por C. difficile (riesgo 1.7x mayor)",
        "⚠️ Reduce absorción de clopidogrel (interacción CYP2C19 clínicamente relevante)",
    ],
    "metoclopramida": [
        "⚠️ DETERIORO COGNITIVO en ancianos: parkinsonismo, confusión → 'PRO-ALZHEIMER' con uso crónico",
        "⚠️ DISCINESIA TARDÍA IRREVERSIBLE (movimientos orofaciales involuntarios) — riesgo acumulativo",
        "⚠️ MÁXIMO 5 DÍAS de uso (restricción EMA/ANMAT por riesgo neurológico)",
        "⚠️ Distonía aguda en jóvenes (tortícolis, trismus) — tratar con biperideno",
        "⚠️ Síndrome neuroléptico maligno (raro pero potencialmente fatal)",
    ],
    "ondansetron": [
        "⚠️ Prolongación QT dosis-dependiente → torsades de pointes (no exceder 16 mg IV)",
        "⚠️ Constipación severa (puede causar íleo en postquirúrgicos)",
        "⚠️ Síndrome serotoninérgico con ISRS/tramadol",
    ],
    "loperamida": [
        "⚠️ Sobredosis: ARRITMIAS CARDÍACAS LETALES (QT prolongado, torsades) — abuso en aumento",
        "⚠️ CONTRAINDICADA en disentería (retiene bacterias/toxinas → megacolon tóxico)",
        "⚠️ Megacolon tóxico en colitis ulcerosa activa",
    ],
    "bismuto_subsalicilato": [
        "⚠️ Lengua y heces NEGRAS (alarma al paciente — es inofensivo, avisar previamente)",
        "⚠️ Neurotoxicidad con uso prolongado (encefalopatía por bismuto)",
        "⚠️ Contiene salicilato: riesgo de síndrome de Reye en niños con varicela/gripe",
    ],
    "misoprostol": [
        "⚠️ ABORTIVO POTENTE: CONTRAINDICADO ABSOLUTAMENTE en embarazo (a menos que sea uso obstétrico)",
        "⚠️ SÍNDROME DE MOEBIUS en feto (parálisis facial bilateral) si se usa como abortivo fallido",
        "⚠️ Diarrea dosis-dependiente (hasta 30% de pacientes)",
    ],
    "lactulosa": [
        "⚠️ Distensión abdominal y flatulencia severa (poca tolerabilidad en algunos pacientes)",
    ],
    "sulfasalazina": [
        "⚠️ Oligospermia REVERSIBLE (reducción de fertilidad masculina durante tratamiento)",
        "⚠️ Anemia hemolítica en déficit de G6PD",
        "⚠️ Agranulocitosis y anemia aplásica (hemograma periódico)",
        "⚠️ Coloración naranja de orina y lágrimas (avisar al paciente)",
    ],
    "mesalazina": [
        "⚠️ Nefritis intersticial (monitorear función renal anualmente)",
        "⚠️ Pericarditis/miocarditis (reacción de hipersensibilidad — rara pero grave)",
    ],

    # ═══════════════════════════════════════════
    # u06 - SISTEMA ENDOCRINO
    # ═══════════════════════════════════════════
    "insulina_regular": [
        "⚠️ HIPOGLUCEMIA SEVERA: convulsiones, coma, daño cerebral, MUERTE si no se trata",
        "⚠️ Error de dosis (confusión de jeringas/concentraciones U-100 vs U-500) = letal",
        "⚠️ Lipodistrofia: rotar SIEMPRE los sitios de inyección",
    ],
    "insulina_glargina": [
        "⚠️ NUNCA mezclar con otras insulinas en la misma jeringa (pierde efecto prolongado)",
        "⚠️ Hipoglucemia nocturna (menor que NPH, pero posible)",
    ],
    "metformina": [
        "⚠️ ACIDOSIS LÁCTICA (rara pero MORTALIDAD 50%): suspender pre-contraste yodado y en IRC severa",
        "⚠️ Déficit de vitamina B12 (uso prolongado → neuropatía que se confunde con diabética)",
        "⚠️ SUSPENDER 48h antes de cirugía o procedimientos con contraste yodado",
    ],
    "glibenclamida": [
        "⚠️ HIPOGLUCEMIA PROLONGADA y SEVERA (vida media larga → puede durar 24-72h, especialmente en ancianos)",
        "⚠️ Aumento de mortalidad cardiovascular (controversia desde estudio UGDP)",
    ],
    "dapagliflozina": [
        "⚠️ CETOACIDOSIS DIABÉTICA EUGLUCÉMICA (glucemia normal pero cetoacidosis — diagnóstico difícil)",
        "⚠️ FASCITIS NECROTIZANTE PERINEAL (gangrena de Fournier) — rara pero devastadora",
        "⚠️ Infecciones genitales micóticas recurrentes (candidiasis vulvovaginal/balanitis)",
        "⚠️ Amputaciones de miembros inferiores (reportado con canagliflozina, precaución con clase)",
    ],
    "canagliflozina": [
        "⚠️ AMPUTACIONES de dedos y metatarso (riesgo 2x — alerta FDA)",
        "⚠️ Cetoacidosis diabética euglucémica (con glucemia aparentemente normal)",
        "⚠️ Fascitis necrotizante perineal (gangrena de Fournier)",
    ],
    "pioglitazona": [
        "⚠️ INSUFICIENCIA CARDÍACA (retención hídrica → contraindicada en IC clase III-IV)",
        "⚠️ FRACTURAS ÓSEAS en mujeres (pérdida de densidad ósea)",
        "⚠️ Cáncer de vejiga (riesgo aumentado con uso >2 años — controversia)",
        "⚠️ Edema macular (pérdida visual)",
    ],
    "levotiroxina": [
        "⚠️ Sobredosis: TIROTOXICOSIS → arritmias (FA), angina, IAM, insuficiencia cardíaca",
        "⚠️ Osteoporosis acelerada si sobredosis crónica (especialmente en mujeres postmenopáusicas)",
        "⚠️ Numerosas interacciones de absorción: hierro, calcio, IBP, colestiramina (dar en ayunas, sola)",
    ],
    "metimazol": [
        "⚠️ AGRANULOCITOSIS (0.1-0.5%): fiebre + odinofagia = SUSPENDER y hemograma URGENTE",
        "⚠️ APLASIA CUTIS fetal (defectos del cuero cabelludo en 1er trimestre) → preferir PTU en 1er trimestre",
        "⚠️ Hepatotoxicidad colestásica",
    ],
    "propiltiouracilo": [
        "⚠️ HEPATOTOXICIDAD FULMINANTE (necrosis hepática masiva → trasplante o muerte)",
        "⚠️ Solo usar en 1er trimestre de embarazo (luego cambiar a metimazol por menor riesgo hepático)",
        "⚠️ Vasculitis ANCA-positiva (uso prolongado)",
    ],
    "dexametasona": [
        "⚠️ SÍNDROME DE CUSHING IATROGÉNICO: cara de luna, giba dorsal, estrías violáceas, obesidad central",
        "⚠️ PSICOSIS ESTEROIDEA: manía, depresión, ideación suicida (dosis altas)",
        "⚠️ NECROSIS AVASCULAR de cabeza femoral (destrucción de la cadera → reemplazo articular)",
        "⚠️ Infecciones oportunistas (tuberculosis reactivada, candidiasis diseminada)",
        "⚠️ Insuficiencia suprarrenal aguda si se suspende bruscamente (crisis addisoniana)",
        "⚠️ Hiperglucemia severa / debut diabético (diabetes esteroidea)",
    ],
    "prednisona": [
        "⚠️ CUSHING IATROGÉNICO con uso >2 semanas a dosis >7.5 mg/día",
        "⚠️ NECROSIS AVASCULAR de cadera (puede requerir prótesis — 5-25% con uso crónico)",
        "⚠️ Psicosis esteroidea (dosis >40 mg/día: 18% riesgo de trastornos psiquiátricos)",
        "⚠️ NUNCA suspender bruscamente (insuficiencia suprarrenal aguda → shock → muerte)",
        "⚠️ Osteoporosis y fracturas vertebrales (iniciar bifosfonato si uso >3 meses)",
        "⚠️ Retraso de crecimiento en niños (uso crónico)",
    ],
    "hidrocortisona_sistemica": [
        "⚠️ Insuficiencia suprarrenal iatrogénica si se suspende bruscamente",
        "⚠️ Úlcera péptica (especialmente combinada con AINEs)",
    ],
    "betametasona_sistemica": [
        "⚠️ Supresión adrenal prolongada (alta potencia glucocorticoidea)",
        "⚠️ Miopatía esteroidea (debilidad proximal de miembros — subir escaleras)",
    ],

    # ═══════════════════════════════════════════
    # u07 - REPRODUCTOR / ÓSEO
    # ═══════════════════════════════════════════
    "oxitocina": [
        "⚠️ ROTURA UTERINA (hiperestimulación) — monitoreo tocográfico CONTINUO obligatorio",
        "⚠️ INTOXICACIÓN HÍDRICA: hiponatremia dilucional → convulsiones, coma (efecto antidiurético)",
        "⚠️ Sufrimiento fetal por taquisistolia (>5 contracciones en 10 min)",
    ],
    "sulfato_magnesio_obstetrico": [
        "⚠️ PARO CARDIORRESPIRATORIO por sobredosis — antidoto: gluconato de calcio 10% IV",
        "⚠️ Monitorear: reflejos rotulianos (si desaparecen = toxicidad) + FR >12/min + diuresis >25 mL/h",
        "⚠️ Depresion neonatal si se administra cerca del parto",
    ],
    "sulfato_magnesio_emergencia": [
        "⚠️ PARO CARDIORRESPIRATORIO por sobredosis — antidoto: gluconato de calcio 10% IV",
        "⚠️ Monitorear: reflejos rotulianos (si desaparecen = toxicidad) + FR >12/min + diuresis >25 mL/h",
    ],
    "labetalol": [
        "⚠️ Bradicardia neonatal y hipoglucemia neonatal (monitorear al RN las primeras 24h)",
        "⚠️ Broncoespasmo (tiene componente beta-bloqueante — precaución en asmáticas)",
    ],
    "nifedipino": [
        "⚠️ HIPOTENSIÓN SEVERA con cápsulas sublinguales (vía PROHIBIDA — solo VO de liberación prolongada)",
        "⚠️ Taquicardia refleja severa (riesgo de isquemia miocárdica)",
    ],
    "metildopa": [
        "⚠️ Hepatotoxicidad (hepatitis autoinmune-like — controlar transaminasas)",
        "⚠️ Anemia hemolítica Coombs-positiva (5-20% desarrollan Coombs positivo)",
        "⚠️ Depresión severa (efecto central)",
    ],
    "alendronato": [
        "⚠️ OSTEONECROSIS DE MAXILAR (especialmente con extracciones dentales — avisar al odontólogo)",
        "⚠️ FRACTURA ATÍPICA DE FÉMUR (uso >5 años — dolor en muslo = Rx urgente)",
        "⚠️ ESOFAGITIS SEVERA: tomar con vaso lleno de agua, de pie, 30 min antes de comer, NO acostarse",
    ],
    "acido_zoledronico": [
        "⚠️ OSTEONECROSIS DEL MAXILAR (evaluación dental obligatoria ANTES de iniciar)",
        "⚠️ Fractura atípica de fémur (uso prolongado — dolor en muslo prodrómico)",
        "⚠️ Síndrome gripal post-infusión (fiebre, mialgias, artralgias) — 24-72h, tratar con paracetamol",
        "⚠️ Hipocalcemia severa (corregir vitamina D ANTES de infundir)",
    ],
    "tamoxifeno": [
        "⚠️ CÁNCER DE ENDOMETRIO (riesgo 2-7x): sangrado vaginal anormal = biopsia urgente",
        "⚠️ TROMBOEMBOLISMO: TVP y TEP (riesgo 2-3x)",
        "⚠️ Cataratas y retinopatía (control oftalmológico anual)",
    ],
    "clomifeno": [
        "⚠️ EMBARAZO MÚLTIPLE (gemelos 5-10%, trillizos 1%) — ecografía para confirmar folículos",
        "⚠️ Síndrome de HIPERESTIMULACIÓN OVÁRICA: distensión, ascitis, insuficiencia renal",
        "⚠️ Trastornos visuales (fosfenos, visión borrosa) — suspender si aparecen",
    ],
    "medroxiprogesterona": [
        "⚠️ PÉRDIDA DE DENSIDAD ÓSEA (inyectable depot — máximo 2 años de uso)",
        "⚠️ Tromboembolismo (TVP, TEP, ACV)",
        "⚠️ Depresión severa",
    ],
    "levonorgestrel": [
        "⚠️ Embarazo ectópico: si falla la anticoncepción de emergencia, riesgo de ectópico",
    ],
    "calcitonina": [
        "⚠️ Riesgo aumentado de CÁNCER (uso prolongado >6 meses — restricción EMA)",
        "⚠️ Taquifilaxia: pierde efecto después de semanas-meses de uso (fenómeno de escape)",
    ],

    # ═══════════════════════════════════════════
    # u08 - MUSCULOESQUELÉTICO
    # ═══════════════════════════════════════════
    "ibuprofeno": [
        "⚠️ ÚLCERA GI PERFORADA y hemorragia digestiva masiva (especialmente >60 años, con corticoides)",
        "⚠️ INFARTO DE MIOCARDIO y ACV (riesgo cardiovascular aumentado, especialmente dosis altas crónicas)",
        "⚠️ IRA prerrenal (inhibe prostaglandinas renales — peligroso en deshidratados y ancianos)",
        "⚠️ Cierre prematuro del ductus arterioso fetal (3er trimestre = CONTRAINDICADO)",
    ],
    "diclofenaco": [
        "⚠️ RIESGO CARDIOVASCULAR MAYOR: IAM (riesgo 40% mayor que sin AINE según estudio CNT)",
        "⚠️ Hemorragia digestiva alta (riesgo relativo 3-4x)",
        "⚠️ IRA (especialmente combinado con IECA + diurético: 'triple whammy')",
        "⚠️ Hepatotoxicidad (controlar transaminasas en uso >4 semanas)",
    ],
    "ketorolaco": [
        "⚠️ MÁXIMO 5 DÍAS de uso (hemorragia GI e IRA con uso prolongado)",
        "⚠️ No usar preoperatorio (riesgo de sangrado quirúrgico — inhibe plaquetas)",
    ],
    "metotrexato": [
        "⚠️ ⛔ DOSIS SEMANAL (NUNCA diaria crónica) — error de 'diario en vez de semanal' = MUERTE por aplasia",
        "⚠️ PANCITOPENIA FATAL (aplasia medular) — hemograma periódico obligatorio",
        "⚠️ NEUMONITIS por metotrexato (tos seca + disnea + fiebre → Rx urgente)",
        "⚠️ TERATÓGENO ABSOLUTO: abortivo. Anticoncepción 3 meses post-suspensión (ambos sexos)",
        "⚠️ Fibrosis hepática (uso acumulado >1.5g → biopsia hepática)",
        "⚠️ Rescate con leucovorina (ácido folínico) en dosis altas oncológicas",
    ],
    "colchicina": [
        "⚠️ DIARREA como señal de TOXICIDAD (primer síntoma: si aparece, SUSPENDER inmediatamente)",
        "⚠️ SOBREDOSIS MORTAL (no hay antídoto): aplasia medular + fallo multiorgánico a las 24-72h",
        "⚠️ Margen terapéutico estrecho: dosis máxima primer día 1.5 mg (esquema actual)",
    ],
    "alopurinol": [
        "⚠️ DRESS / SÍNDROME DE STEVENS-JOHNSON (especialmente en portadores HLA-B*5801 — frecuente en asiáticos)",
        "⚠️ NUNCA iniciar durante una crisis de gota aguda (la empeora paradójicamente)",
        "⚠️ Rash severo: suspender y NUNCA reintroducir",
    ],
    "ciclobenzaprina": [
        "⚠️ Toxicidad anticolinérgica: retención urinaria, íleo paralítico, delirium (ancianos)",
        "⚠️ Arritmias y convulsiones en sobredosis (estructura similar a tricíclicos)",
    ],
    "leflunomida": [
        "⚠️ HEPATOTOXICIDAD SEVERA (hepatitis fatal reportada) — transaminasas mensuales",
        "⚠️ TERATÓGENO con vida media ultra larga (2 AÑOS sin washout con colestiramina)",
        "⚠️ Para eliminar: colestiramina 8g 3v/día x 11 días (protocolo de washout acelerado)",
    ],

    # ═══════════════════════════════════════════
    # u09 - DERMATOLOGÍA
    # ═══════════════════════════════════════════
    "isotretinoina": [
        "⚠️ TERATÓGENO CATEGORÍA X: malformaciones craneofaciales, cardíacas, SNC — DEVASTADORAS",
        "⚠️ Test de embarazo NEGATIVO obligatorio antes de cada receta + doble anticoncepción",
        "⚠️ DEPRESIÓN, ideación suicida, psicosis (controversia pero monitorear salud mental)",
        "⚠️ Pseudotumor cerebri (hipertensión intracraneal) especialmente con tetraciclinas",
        "⚠️ Pancreatitis por hipertrigliceridemia severa",
        "⚠️ NO donar sangre durante tratamiento ni 1 mes después",
    ],
    "clobetasol": [
        "⚠️ ATROFIA CUTÁNEA IRREVERSIBLE con uso >2 semanas continuas (piel de papel de cigarrillo)",
        "⚠️ SUPRESIÓN ADRENAL sistémica si se aplica en áreas extensas o con oclusión",
        "⚠️ Estrías violáceas permanentes (especialmente en pliegues e ingles)",
        "⚠️ Rebote severo al suspender (especialmente en psoriasis → eritrodermia)",
    ],
    "hidrocortisona_topica": [
        "⚠️ Atrofia cutánea con uso prolongado (>2 semanas en cara/pliegues)",
        "⚠️ Enmascaramiento de infecciones cutáneas (tiña incógnita — la empeora y 'oculta')",
    ],
    "lindano": [
        "⚠️ NEUROTOXICIDAD: convulsiones (especialmente en niños, ancianos, <50 kg)",
        "⚠️ RETIRADO en muchos países por toxicidad — solo si no hay alternativa",
    ],
    "tacrolimus_topico": [
        "⚠️ Alerta de recuadro negro FDA: riesgo teórico de linfoma y cáncer de piel (uso prolongado)",
        "⚠️ NO usar con oclusión ni en piel infectada",
    ],
    "minociclina_topica": [
        "⚠️ Pigmentación AZUL-GRISÁCEA permanente de piel, dientes, huesos (forma sistémica)",
    ],

    # ═══════════════════════════════════════════
    # u10 - HEMATOLOGÍA
    # ═══════════════════════════════════════════
    "heparina": [
        "⚠️ HIT TIPO II: trombocitopenia + TROMBOSIS paradójica (día 5-14) — suspender inmediatamente",
        "⚠️ La trombosis de HIT II puede ser catastrófica: TVP, TEP, ACV, gangrena de extremidades",
        "⚠️ Antídoto: protamina 1 mg por cada 100 UI de heparina",
    ],
    "enoxaparina": [
        "⚠️ NUNCA administrar IM (solo SC) — hematoma intramuscular severo",
        "⚠️ HIT tipo II (menor incidencia que heparina no fraccionada, pero posible)",
        "⚠️ Hematoma espinal/epidural: parálisis permanente si hay catéter epidural simultáneo",
    ],
    "clopidogrel": [
        "⚠️ PTT (Púrpura Trombocitopénica Trombótica): anemia hemolítica + trombocitopenia + fallo renal",
        "⚠️ NO FUNCIONA en metabolizadores lentos CYP2C19 (30% de asiáticos) — falla terapéutica",
        "⚠️ Suspender 5-7 días antes de cirugía (sangrado intraoperatorio)",
    ],
    "acido_tranexamico": [
        "⚠️ Convulsiones (dosis altas, especialmente en cirugía cardíaca)",
        "⚠️ Trombosis (contraindicado en CID y trombosis activa)",
    ],
    "hierro_parenteral": [
        "⚠️ REACCION ANAFILACTICA con hierro IV (tener equipo de reanimacion disponible)",
        "⚠️ Administrar dosis de prueba primero y observar 30 min",
    ],
    "hierro_polimaltosato": [
        "⚠️ INTOXICACION PEDIATRICA: la ingesta accidental de hierro es causa de muerte en ninos",
        "⚠️ Colorea heces de NEGRO (diferenciar de melena — avisar al paciente)",
    ],
    "hierro_carboximaltosa": [
        "⚠️ HIPOFOSFATEMIA severa (fracturas por osteomalacia con dosis repetidas)",
        "⚠️ Reaccion anafilactoide (monitoreo 30 min post-infusion)",
    ],
    "dabigatran": [
        "⚠️ Hemorragia severa: antídoto específico = idarucizumab (Praxbind) — disponibilidad limitada",
        "⚠️ NUNCA abrir la cápsula (absorción aumentada 75% → sobredosis)",
        "⚠️ Acumulación letal en IRC (contraindicado ClCr <30 mL/min)",
    ],
    "rivaroxaban": [
        "⚠️ Hemorragia digestiva (mayor que warfarina en estudios)",
        "⚠️ Antídoto: andexanet alfa (disponibilidad limitada y muy costoso)",
    ],

    # ═══════════════════════════════════════════
    # u11 - ANTÍDOTOS Y EMERGENCIAS
    # ═══════════════════════════════════════════
    "naloxona": [
        "⚠️ SÍNDROME DE ABSTINENCIA AGUDO violento en adictos a opioides (agitación, vómitos, diarrea)",
        "⚠️ Efecto más corto que la mayoría de opioides → RE-SEDACIÓN y paro respiratorio",
        "⚠️ Edema pulmonar no cardiogénico (raro, tras reversión brusca)",
    ],
    "flumazenilo": [
        "⚠️ CONVULSIONES en pacientes dependientes de benzodiazepinas o en intoxicaciones mixtas",
        "⚠️ CONTRAINDICADO si hay ingesta concomitante de tricíclicos (precipita arritmias y convulsiones)",
        "⚠️ Vida media corta: re-sedación tras 20-60 min (monitoreo prolongado obligatorio)",
    ],
    "n_acetilcisteina": [
        "⚠️ Reacción ANAFILACTOIDE con infusión IV rápida (no es alergia verdadera — reducir velocidad)",
        "⚠️ Eficaz si se da dentro de 8h post-ingesta de paracetamol (después, eficacia cae dramáticamente)",
    ],
    "atropina": [
        "⚠️ DELIRIUM ANTICOLINÉRGICO: 'caliente como una liebre, seco como un hueso, rojo como una remolacha, loco como un sombrerero'",
        "⚠️ Glaucoma agudo de ángulo cerrado (midriasis → bloqueo del ángulo)",
        "⚠️ Retención urinaria aguda (especialmente en ancianos con hiperplasia prostática)",
    ],
    "gluconato_calcio": [
        "⚠️ PARO CARDÍACO si inyección IV rápida (administrar lento en >10 min)",
        "⚠️ NECROSIS TISULAR si extravasación (calcio es extremadamente irritante)",
        "⚠️ INCOMPATIBLE con bicarbonato (precipita — no mezclar en misma vía)",
    ],
    "azul_metileno": [
        "⚠️ HEMÓLISIS en déficit de G6PD (paradójicamente empeora la metahemoglobinemia)",
        "⚠️ Tiñe orina y piel de AZUL (avisar al paciente — alarma innecesaria)",
        "⚠️ Síndrome serotoninérgico con ISRS (es un IMAO)",
    ],
    "dantroleno": [
        "⚠️ Hepatotoxicidad severa (especialmente con uso oral crónico >45 días)",
        "⚠️ Debilidad muscular generalizada (efecto terapéutico exagerado)",
    ],
    "pralidoxima": [
        "⚠️ Debe administrarse en las primeras 24-36h (después de 'envejecimiento' enzimático es INÚTIL)",
        "⚠️ Debilidad muscular transitoria, visión borrosa, taquicardia",
    ],
    "desferoxamina_antidoto": [
        "⚠️ ORINA COLOR VINO ROSADO ('vin rose') — indica que esta quelando hierro (normal)",
        "⚠️ Infecciones por Yersinia y mucormicosis (hierro libre favorece estos patogenos)",
        "⚠️ Toxicidad retiniana y auditiva (uso prolongado — control periodico)",
    ],
    "fisostigmina": [
        "⚠️ CRISIS COLINÉRGICA: bradicardia severa, broncoespasmo, convulsiones (antídoto de atropina listo)",
        "⚠️ Asistolia si se administra IV rápido",
    ],

    # ═══════════════════════════════════════════
    # u12 - FÁRMACOS HOSPITALARIOS
    # ═══════════════════════════════════════════
    "manitol": [
        "⚠️ EDEMA PULMONAR por sobrecarga de volumen inicial (extrae agua al intravascular antes de diuresis)",
        "⚠️ Efecto rebote: la osmolaridad baja tras efecto y el edema cerebral puede empeorar",
        "⚠️ IRA osmótica (dosis acumuladas altas → necrosis tubular)",
    ],
    "bicarbonato-sodio": [
        "⚠️ ALCALOSIS METABÓLICA: desplaza curva de oxígeno → menor entrega tisular de O2",
        "⚠️ Hipopotasemia aguda (el K+ entra a la célula → arritmias)",
        "⚠️ INCOMPATIBLE con calcio (precipita) — no mezclar en misma vía",
        "⚠️ Extravasación: necrosis tisular (muy alcalino)",
    ],
    "potasio_cloruro": [
        "⚠️ IV RAPIDO = PARO CARDIACO INMEDIATO (maximo 10 mEq/h por via periferica)",
        "⚠️ DOLOR INTENSO en vena periferica (diluir y pasar lento — considerar via central)",
        "⚠️ NUNCA administrar en bolo IV directo (muerte instantanea por fibrilacion ventricular)",
    ],
    "albumina_humana": [
        "⚠️ Sobrecarga de volumen -> edema pulmonar (monitorear PVC y diuresis)",
        "⚠️ Reacciones alergicas (producto hemoderivado — anafilaxia posible)",
    ],
    "glucosa_hipertonica": [
        "⚠️ FLEBITIS y NECROSIS TISULAR si extravasación de solución >10% (usar vía central para >12.5%)",
        "⚠️ Hiperglucemia severa en diabéticos (monitoreo frecuente de glucemia)",
    ],
}


def main():
    import os
    # Adjust path based on where we are
    drug_path = "src/data/drugs.json"
    if not os.path.exists(drug_path):
        drug_path = os.path.join("..", drug_path)

    with open(drug_path, "r", encoding="utf-8") as f:
        drugs = json.load(f)

    drug_map = {d["id"]: d for d in drugs}

    total_added = 0
    drugs_modified = 0

    for drug_id, new_effects in STRIKING_EFFECTS.items():
        if drug_id not in drug_map:
            print(f"  WARN: Farmaco '{drug_id}' no encontrado en drugs.json - SALTANDO")
            continue

        drug = drug_map[drug_id]
        existing = drug["efectosAdversos"]
        added_for_drug = 0

        for effect in new_effects:
            # Check if a similar effect already exists (compare core keywords)
            # Extract key words from the new effect (after ⚠️)
            clean_effect = re.sub(r'^⚠️\s*', '', effect)
            # Get first significant word (uppercase usually)
            first_words = clean_effect.split(':')[0].split('(')[0].strip().lower()

            # Check for duplicates using key phrases
            is_duplicate = False
            for existing_effect in existing:
                existing_lower = existing_effect.lower()
                # Check multiple matching strategies
                if first_words in existing_lower:
                    is_duplicate = True
                    break
                # Check for specific key terms
                key_terms = re.findall(r'[A-ZÁÉÍÓÚÑ]{3,}', effect)
                for term in key_terms:
                    if term.lower() in existing_lower and term.lower() not in ['uso', 'con', 'por', 'que', 'riesgo', 'especialmente']:
                        is_duplicate = True
                        break
                if is_duplicate:
                    break

            if not is_duplicate:
                existing.append(effect)
                added_for_drug += 1

        if added_for_drug > 0:
            drugs_modified += 1
            total_added += added_for_drug
            print(f"  + {drug['nombre']}: +{added_for_drug} efectos adversos llamativos")

    with open(drug_path, "w", encoding="utf-8") as f:
        json.dump(drugs, f, ensure_ascii=False, indent=2)

    print(f"\n{'='*60}")
    print(f"RESUMEN")
    print(f"{'='*60}")
    print(f"Fármacos modificados: {drugs_modified}")
    print(f"Efectos adversos agregados: {total_added}")
    print(f"Fármacos en diccionario: {len(STRIKING_EFFECTS)}")


if __name__ == "__main__":
    main()
