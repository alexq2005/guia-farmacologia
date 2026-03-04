#!/usr/bin/env python3
"""
Agrega ~120 términos de terminología médica latinoamericana al glosario.
Categorías: abreviatura, general, anatomia
Detecta duplicados por normalización (lowercase, sin acentos).
Ordena resultado final alfabéticamente por 'termino'.
"""

import json
import unicodedata
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
GLOSSARY_PATH = os.path.join(SCRIPT_DIR, '..', 'src', 'data', 'glossary.json')

def normalize(text: str) -> str:
    """Normaliza texto: lowercase, sin acentos, sin espacios extra."""
    text = text.lower().strip()
    text = unicodedata.normalize('NFD', text)
    text = ''.join(c for c in text if unicodedata.category(c) != 'Mn')
    return text

# ─── Nuevos términos ───────────────────────────────────────────────────────────

NUEVOS_TERMINOS = [
    # ══════════════════════════════════════════════════════════════════════════
    # A) ABREVIATURAS HOSPITALARIAS (~40)
    # ══════════════════════════════════════════════════════════════════════════
    {"termino": "SAE", "definicion": "Síndrome Ascítico Edematoso. Acumulación de líquido en cavidad peritoneal (ascitis) acompañada de edema periférico. Frecuente en cirrosis hepática descompensada.", "abreviatura": "SAE", "categoria": "abreviatura"},
    {"termino": "SCA", "definicion": "Síndrome Coronario Agudo. Conjunto de cuadros clínicos por isquemia miocárdica aguda: angina inestable, IAM sin elevación del ST (SCASEST) e IAM con elevación del ST (SCACEST).", "abreviatura": "SCA", "categoria": "abreviatura"},
    {"termino": "SIRS", "definicion": "Síndrome de Respuesta Inflamatoria Sistémica. Requiere ≥2 de: temperatura >38°C o <36°C, FC >90 lpm, FR >20 rpm o PaCO₂ <32 mmHg, leucocitos >12.000 o <4.000/mm³.", "abreviatura": "SIRS", "categoria": "abreviatura"},
    {"termino": "BOTE", "definicion": "Balance, Oxigenación, Termorregulación, Eliminación. Nemotecnia de enfermería para prioridades de valoración del paciente crítico.", "abreviatura": "BOTE", "categoria": "abreviatura"},
    {"termino": "ARM", "definicion": "Asistencia Respiratoria Mecánica. Soporte ventilatorio mediante respirador mecánico. Modalidades: VMC, SIMV, PSV, CPAP.", "abreviatura": "ARM", "categoria": "abreviatura"},
    {"termino": "SVP", "definicion": "Solución de Vía Parenteral. Solución intravenosa de mantenimiento. Puede referirse también a la vía venosa periférica canalizada.", "abreviatura": "SVP", "categoria": "abreviatura"},
    {"termino": "ACV", "definicion": "Accidente Cerebrovascular. Interrupción del flujo sanguíneo cerebral (isquémico 85%) o hemorragia intracerebral (hemorrágico 15%). Emergencia neurológica tiempo-dependiente.", "abreviatura": "ACV", "categoria": "abreviatura"},
    {"termino": "DBT", "definicion": "Diabetes. Abreviatura hospitalaria frecuente en Argentina y LATAM para referirse a diabetes mellitus en registros clínicos.", "abreviatura": "DBT", "categoria": "abreviatura"},
    {"termino": "HTA", "definicion": "Hipertensión Arterial. Presión arterial sostenida ≥140/90 mmHg. Principal factor de riesgo cardiovascular modificable.", "abreviatura": "HTA", "categoria": "abreviatura"},
    {"termino": "IRC", "definicion": "Insuficiencia Renal Crónica. Deterioro progresivo e irreversible de la función renal. Se clasifica en estadios 1-5 según la TFG. Requiere ajuste de dosis de múltiples fármacos.", "abreviatura": "IRC", "categoria": "abreviatura"},
    {"termino": "EPOC", "definicion": "Enfermedad Pulmonar Obstructiva Crónica. Limitación crónica al flujo aéreo no completamente reversible. Incluye enfisema y bronquitis crónica. Causa principal: tabaquismo.", "abreviatura": "EPOC", "categoria": "abreviatura"},
    {"termino": "TEP", "definicion": "Tromboembolismo Pulmonar. Obstrucción de arterias pulmonares por trombos (usualmente de TVP de miembros inferiores). Causa de muerte prevenible más frecuente en pacientes hospitalizados.", "abreviatura": "TEP", "categoria": "abreviatura"},
    {"termino": "TVP", "definicion": "Trombosis Venosa Profunda. Formación de trombo en venas profundas, generalmente de miembros inferiores. Riesgo de TEP. Tratar con anticoagulación.", "abreviatura": "TVP", "categoria": "abreviatura"},
    {"termino": "IAM", "definicion": "Infarto Agudo de Miocardio. Necrosis del músculo cardíaco por isquemia prolongada. Dolor torácico opresivo, cambios ECG (elevación ST) y elevación de troponinas.", "abreviatura": "IAM", "categoria": "abreviatura"},
    {"termino": "EAP", "definicion": "Edema Agudo de Pulmón. Acumulación de líquido en alvéolos por falla ventricular izquierda aguda. Disnea severa, crepitantes bilaterales, esputo rosado espumoso. Emergencia.", "abreviatura": "EAP", "categoria": "abreviatura"},
    {"termino": "PCR", "definicion": "Paro Cardiorrespiratorio. Cese súbito de la actividad cardíaca y respiratoria. Requiere inicio inmediato de RCP y desfibrilación si ritmo desfibrilable.", "abreviatura": "PCR", "categoria": "abreviatura"},
    {"termino": "RCP", "definicion": "Reanimación Cardiopulmonar. Conjunto de maniobras para restaurar la circulación y ventilación: compresiones torácicas 100-120/min, relación 30:2 con ventilaciones.", "abreviatura": "RCP", "categoria": "abreviatura"},
    {"termino": "SatO₂", "definicion": "Saturación de Oxígeno. Porcentaje de hemoglobina unida a oxígeno. Normal: 95-100%. Medida por oximetría de pulso. <90% indica hipoxemia significativa.", "abreviatura": "SatO2", "categoria": "abreviatura"},
    {"termino": "TAS/TAD", "definicion": "Tensión Arterial Sistólica / Tensión Arterial Diastólica. Valores de la presión arterial en mmHg. Normal: <120/80 mmHg.", "abreviatura": "TAS/TAD", "categoria": "abreviatura"},
    {"termino": "FC", "definicion": "Frecuencia Cardíaca. Número de latidos por minuto. Normal adulto en reposo: 60-100 lpm. Se evalúa ritmo, frecuencia y regularidad.", "abreviatura": "FC", "categoria": "abreviatura"},
    {"termino": "FR", "definicion": "Frecuencia Respiratoria. Número de respiraciones por minuto. Normal adulto: 12-20 rpm. Parámetro vital que indica trabajo respiratorio.", "abreviatura": "FR", "categoria": "abreviatura"},
    {"termino": "CSV", "definicion": "Control de Signos Vitales. Registro periódico de FC, FR, TA, temperatura, SatO₂ y dolor. Frecuencia según estado del paciente y indicación médica.", "abreviatura": "CSV", "categoria": "abreviatura"},
    {"termino": "BH", "definicion": "Balance Hídrico. Diferencia entre ingresos (oral, IV, enteral) y egresos (diuresis, débito SNG, drenajes, pérdidas insensibles). Balance positivo = retención; negativo = depleción.", "abreviatura": "BH", "categoria": "abreviatura"},
    {"termino": "GCS", "definicion": "Glasgow Coma Scale (Escala de Coma de Glasgow). Evalúa nivel de conciencia: apertura ocular (1-4), respuesta verbal (1-5) y motora (1-6). Total 3-15. ≤8 = coma.", "abreviatura": "GCS", "categoria": "abreviatura"},
    {"termino": "LAB", "definicion": "Laboratorio. Abreviatura hospitalaria para análisis de laboratorio clínico. Incluye hemograma, bioquímica, coagulograma y otros estudios.", "abreviatura": "LAB", "categoria": "abreviatura"},
    {"termino": "HMG", "definicion": "Hemograma. Análisis de sangre que evalúa glóbulos rojos, blancos, plaquetas, hemoglobina y hematocrito. Estudio de laboratorio más solicitado.", "abreviatura": "HMG", "categoria": "abreviatura"},
    {"termino": "ELP", "definicion": "Electrolitos Plasmáticos. Determinación de Na⁺, K⁺, Cl⁻, Ca²⁺ y Mg²⁺ en sangre. Esencial para monitorizar terapia con diuréticos, fluidoterapia y función renal.", "abreviatura": "ELP", "categoria": "abreviatura"},
    {"termino": "RIN", "definicion": "Razón Internacional Normalizada. Sinónimo de INR. Monitoriza efecto de anticoagulantes orales antivitamina K (warfarina, acenocumarol). Rango terapéutico habitual: 2-3.", "abreviatura": "RIN", "categoria": "abreviatura"},
    {"termino": "GOT/GPT", "definicion": "Transaminasas hepáticas. GOT (AST): aspartato aminotransferasa. GPT (ALT): alanina aminotransferasa. Su elevación indica daño hepatocelular. GPT es más específica del hígado.", "abreviatura": "GOT/GPT", "categoria": "abreviatura"},
    {"termino": "KPTT", "definicion": "Tiempo de Tromboplastina Parcial Activado con Kaolín. Evalúa la vía intrínseca de la coagulación. Usado para monitorizar heparina no fraccionada. Normal: 25-35 segundos.", "abreviatura": "KPTT", "categoria": "abreviatura"},
    {"termino": "FAL", "definicion": "Fosfatasa Alcalina. Enzima presente en hígado, hueso y placenta. Su elevación sugiere colestasis, enfermedad ósea o embarazo. Se interpreta junto con GGT.", "abreviatura": "FAL", "categoria": "abreviatura"},
    {"termino": "LDH", "definicion": "Lactato Deshidrogenasa. Enzima intracelular que se eleva por daño tisular: hemólisis, IAM, hepatopatía, neoplasias. Marcador inespecífico de destrucción celular.", "abreviatura": "LDH", "categoria": "abreviatura"},
    {"termino": "VSG", "definicion": "Velocidad de Sedimentación Globular (eritrosedimentación). Marcador inespecífico de inflamación. Se eleva en infecciones, enfermedades autoinmunes y neoplasias.", "abreviatura": "VSG", "categoria": "abreviatura"},
    {"termino": "LCR", "definicion": "Líquido Cefalorraquídeo. Se obtiene por punción lumbar. Su análisis (citoquímico, cultivo, tinción de Gram) es clave para diagnosticar meningitis y otras patologías del SNC.", "abreviatura": "LCR", "categoria": "abreviatura"},
    {"termino": "BAL", "definicion": "Lavado Broncoalveolar. Procedimiento diagnóstico mediante broncoscopía que obtiene muestras del tracto respiratorio inferior para cultivo, citología y estudios especiales.", "abreviatura": "BAL", "categoria": "abreviatura"},
    {"termino": "ECG", "definicion": "Electrocardiograma. Registro de la actividad eléctrica cardíaca mediante 12 derivaciones. Detecta arritmias, isquemia, infarto, alteraciones electrolíticas y efectos farmacológicos.", "abreviatura": "ECG", "categoria": "abreviatura"},
    {"termino": "Rx", "definicion": "Radiografía. Estudio de imagen por rayos X. Rx de tórax es el estudio complementario más solicitado en internación. Evalúa silueta cardíaca, campos pulmonares y estructuras óseas.", "abreviatura": "Rx", "categoria": "abreviatura"},
    {"termino": "TAC/TC", "definicion": "Tomografía Axial Computada / Tomografía Computada. Estudio de imagen seccional con rayos X. Indicaciones frecuentes: ACV, TEP, abdomen agudo, traumatismo.", "abreviatura": "TAC/TC", "categoria": "abreviatura"},
    {"termino": "RMN", "definicion": "Resonancia Magnética Nuclear. Estudio de imagen sin radiación ionizante. Superior para tejidos blandos, SNC, articulaciones. Contraindicada con implantes metálicos ferromagnéticos.", "abreviatura": "RMN", "categoria": "abreviatura"},
    {"termino": "PPD", "definicion": "Prueba de Tuberculina (derivado proteico purificado). Intradermorreacción de Mantoux. Lectura a las 48-72 h. Positiva si induración ≥10 mm (≥5 mm en inmunodeprimidos).", "abreviatura": "PPD", "categoria": "abreviatura"},

    # ══════════════════════════════════════════════════════════════════════════
    # B) ABREVIATURAS OBSTÉTRICAS (~6)
    # ══════════════════════════════════════════════════════════════════════════
    {"termino": "RCIU", "definicion": "Restricción del Crecimiento Intrauterino. Feto con peso estimado por debajo del percentil 10 para la edad gestacional. Requiere vigilancia fetal estricta.", "abreviatura": "RCIU", "categoria": "abreviatura"},
    {"termino": "APGAR", "definicion": "Score de valoración neonatal al minuto 1 y 5 de vida. Evalúa: Apariencia, Pulso, Gesticulación, Actividad, Respiración. Puntuación 0-10. ≥7 normal.", "abreviatura": "APGAR", "categoria": "abreviatura"},
    {"termino": "LME", "definicion": "Lactancia Materna Exclusiva. Alimentación exclusiva con leche materna sin complementos hasta los 6 meses. Considerar fármacos compatibles con lactancia.", "abreviatura": "LME", "categoria": "abreviatura"},
    {"termino": "RPM", "definicion": "Rotura Prematura de Membranas. Rotura de membranas ovulares antes del inicio del trabajo de parto. Si ocurre antes de las 37 semanas: RPM pretérmino.", "abreviatura": "RPM", "categoria": "abreviatura"},
    {"termino": "DPP", "definicion": "Desprendimiento Prematuro de Placenta. Separación de la placenta normalmente insertada antes del parto. Cursa con dolor abdominal, sangrado oscuro e hipertonía uterina. Emergencia obstétrica.", "abreviatura": "DPP", "categoria": "abreviatura"},
    {"termino": "APP", "definicion": "Amenaza de Parto Prematuro. Contracciones uterinas regulares con modificación cervical entre las 22 y 36.6 semanas. Tratamiento: tocolíticos (nifedipino, atosibán) y maduración pulmonar fetal.", "abreviatura": "APP", "categoria": "abreviatura"},

    # ══════════════════════════════════════════════════════════════════════════
    # C) SÍNDROMES Y SEMIOLOGÍA CLÍNICA (~50)
    # ══════════════════════════════════════════════════════════════════════════
    {"termino": "Síndrome Ascítico Edematoso", "definicion": "Cuadro clínico caracterizado por ascitis (acumulación de líquido en peritoneo) y edema periférico. Causa más frecuente: cirrosis hepática con hipertensión portal. Tratamiento: restricción de sodio, diuréticos (espironolactona + furosemida), paracentesis.", "categoria": "general"},
    {"termino": "Síndrome Nefrótico", "definicion": "Proteinuria masiva (>3.5 g/24h), hipoalbuminemia (<3 g/dL), edema generalizado e hiperlipidemia. Causas: glomerulopatía membranosa, nefropatía diabética, lupus. Riesgo de trombosis y peritonitis espontánea.", "categoria": "general"},
    {"termino": "Síndrome Nefrítico", "definicion": "Hematuria (macro o microscópica), hipertensión arterial, oliguria y edema. Causado por inflamación glomerular (glomerulonefritis). Causa clásica: post-estreptocócica en niños.", "categoria": "general"},
    {"termino": "Síndrome Urémico Hemolítico", "definicion": "Tríada: anemia hemolítica microangiopática, trombocitopenia e insuficiencia renal aguda. Causa principal en Argentina: E. coli productora de toxina Shiga (O157:H7). País con mayor incidencia mundial.", "abreviatura": "SUH", "categoria": "general"},
    {"termino": "Síndrome Febril Prolongado", "definicion": "Fiebre >38.3°C por más de 3 semanas sin diagnóstico tras evaluación inicial. Causas principales: infecciones (tuberculosis, endocarditis), neoplasias y enfermedades autoinmunes.", "categoria": "general"},
    {"termino": "Síndrome de Abstinencia Alcohólica", "definicion": "Cuadro clínico por cese o reducción brusca del consumo de alcohol en pacientes con dependencia. Desde temblor y ansiedad (6-24h) hasta convulsiones (24-48h) y delirium tremens (48-72h). Tratamiento: benzodiacepinas.", "categoria": "general"},
    {"termino": "Síndrome de Realimentación", "definicion": "Alteraciones metabólicas graves al reintroducir alimentación en pacientes desnutridos o con ayuno prolongado. Hipofosfatemia, hipopotasemia, hipomagnesemia. Puede causar falla cardíaca y muerte. Prevención: inicio lento con suplementación de tiamina, fósforo, potasio y magnesio.", "categoria": "general"},
    {"termino": "Síndrome Compartimental", "definicion": "Aumento de presión dentro de un compartimiento muscular cerrado que compromete la perfusión tisular. Causa: fracturas, vendajes apretados, quemaduras. Signos: dolor desproporcionado, parestesias, palidez. Emergencia quirúrgica: fasciotomía.", "categoria": "general"},
    {"termino": "Estado Ácido-Base", "definicion": "Evaluación del equilibrio ácido-base mediante gasometría arterial. Parámetros: pH (7.35-7.45), PaCO₂ (35-45 mmHg), HCO₃⁻ (22-26 mEq/L), BE (±2). Permite identificar acidosis/alcalosis respiratoria o metabólica.", "abreviatura": "EAB", "categoria": "general"},
    {"termino": "Tercer Espacio", "definicion": "Acumulación patológica de líquido en compartimientos donde normalmente hay poco (peritoneo, pleura, intersticio). No contribuye al volumen circulante efectivo. Causas: sepsis, quemaduras, posquirúrgico, hipoalbuminemia.", "categoria": "general"},
    {"termino": "Anasarca", "definicion": "Edema generalizado y severo que afecta todo el cuerpo, incluyendo tejido subcutáneo, cavidades serosas y vísceras. Causas: ICC severa, síndrome nefrótico, cirrosis avanzada, desnutrición grave.", "categoria": "general"},
    {"termino": "Edema en Godet", "definicion": "Edema que al presionar con el dedo deja una depresión (fóvea) que persiste varios segundos. Se clasifica de 1+ a 4+ según profundidad y tiempo de recuperación. Indica acumulación de líquido intersticial.", "categoria": "general"},
    {"termino": "Signo de Blumberg", "definicion": "Dolor a la descompresión abdominal (rebote positivo). Indica irritación peritoneal. Se explora comprimiendo lentamente el abdomen y soltando bruscamente. Positivo en apendicitis, peritonitis.", "categoria": "general"},
    {"termino": "Signo de Murphy", "definicion": "Detención de la inspiración profunda al palpar el punto cístico (reborde costal derecho, línea medioclavicular). Positivo en colecistitis aguda.", "categoria": "general"},
    {"termino": "Signo de Trousseau", "definicion": "Espasmo carpopedal (mano de partero) al inflar el manguito de tensión por encima de la presión sistólica durante 3 minutos. Indica hipocalcemia (Ca²⁺ <7.5 mg/dL).", "categoria": "general"},
    {"termino": "Signo de Chvostek", "definicion": "Contracción involuntaria de músculos faciales al percutir el nervio facial delante del trago de la oreja. Indica hipocalcemia o hipomagnesemia. Menos específico que Trousseau.", "categoria": "general"},
    {"termino": "Crepitantes", "definicion": "Ruidos respiratorios anormales (estertores crepitantes): sonidos discontinuos, finos, inspiratorios. Indican líquido alveolar (edema pulmonar, neumonía) o fibrosis. Se auscultan mejor en bases pulmonares.", "categoria": "general"},
    {"termino": "Estertores", "definicion": "Ruidos respiratorios patológicos. Incluyen crepitantes (finos, alveolares), subcrepitantes (medianos, bronquiolares) y roncus (gruesos, bronquiales). Su presencia, tipo y localización orientan el diagnóstico.", "categoria": "general"},
    {"termino": "Ritmo de galope", "definicion": "Tercer ruido cardíaco (S3) audible en insuficiencia cardíaca, que genera un ritmo de tres tiempos semejante al galope de un caballo. Indica sobrecarga de volumen y disfunción ventricular.", "categoria": "general"},
    {"termino": "Ingurgitación yugular", "definicion": "Distensión visible de las venas yugulares externas con el paciente a 45°. Indica aumento de la presión venosa central. Presente en ICC derecha, taponamiento cardíaco, TEP masivo.", "categoria": "general"},
    {"termino": "Globo vesical", "definicion": "Retención urinaria aguda con distensión palpable y dolorosa de la vejiga por encima del pubis. Causas: hiperplasia prostática, posquirúrgico, fármacos anticolinérgicos, lesión medular. Tratamiento: cateterismo vesical.", "categoria": "general"},
    {"termino": "Poliuria", "definicion": "Diuresis >3 litros/24h. Causas: diabetes mellitus (glucosuria), diabetes insípida, diuréticos, fase poliúrica de IRA, hipercalcemia. Requiere reposición hídrica.", "categoria": "general"},
    {"termino": "Oliguria", "definicion": "Diuresis <400 mL/24h o <0.5 mL/kg/h. Indicador temprano de disfunción renal o hipoperfusión. Requiere evaluación de volemia, función renal y obstrucción urinaria.", "categoria": "general"},
    {"termino": "Anuria", "definicion": "Diuresis <100 mL/24h. Indica falla renal severa o obstrucción completa del tracto urinario. Emergencia nefrológica que puede requerir diálisis.", "categoria": "general"},
    {"termino": "Disuria", "definicion": "Dolor o ardor al orinar. Síntoma cardinal de infección urinaria baja (cistitis). También presente en uretritis, prostatitis y litiasis vesical.", "categoria": "general"},
    {"termino": "Hematuria", "definicion": "Presencia de sangre en orina. Macroscópica (visible) o microscópica (>5 hematíes/campo). Causas: ITU, litiasis, glomerulonefritis, neoplasias, traumatismo.", "categoria": "general"},
    {"termino": "Proteinuria", "definicion": "Presencia anormal de proteínas en orina (>150 mg/24h). Marcador de daño glomerular. >3.5 g/24h = rango nefrótico. Se detecta con tira reactiva o relación proteína/creatinina.", "categoria": "general"},
    {"termino": "Hemoptisis", "definicion": "Expectoración de sangre proveniente del tracto respiratorio inferior. Causas: tuberculosis, bronquiectasias, cáncer de pulmón, TEP. Hemoptisis masiva (>600 mL/24h): emergencia.", "categoria": "general"},
    {"termino": "Melena", "definicion": "Deposiciones negras, brillantes y malolientes (aspecto de alquitrán) por sangre digerida. Indica hemorragia digestiva alta (proximal al ángulo de Treitz). Requiere >60 mL de sangre.", "categoria": "general"},
    {"termino": "Hematemesis", "definicion": "Vómito de sangre roja (fresca) o en borra de café (digerida). Indica hemorragia digestiva alta. Causas: úlcera péptica, várices esofágicas, gastritis erosiva.", "categoria": "general"},
    {"termino": "Epistaxis", "definicion": "Sangrado nasal. Anterior (90%, plexo de Kiesselbach): generalmente autolimitado. Posterior (10%): más grave, requiere taponamiento. Asociado a HTA, anticoagulantes, coagulopatías.", "categoria": "general"},
    {"termino": "Disnea", "definicion": "Sensación subjetiva de dificultad respiratoria. Se clasifica según la NYHA (I-IV) o mMRC (0-4). Causas cardíacas, pulmonares, metabólicas o psicógenas.", "categoria": "general"},
    {"termino": "Ortopnea", "definicion": "Disnea que aparece en decúbito supino y mejora al sentarse o con almohadas. Indica congestión pulmonar por insuficiencia cardíaca izquierda. Se cuantifica por número de almohadas necesarias.", "categoria": "general"},
    {"termino": "Disnea Paroxística Nocturna", "definicion": "Episodio súbito de disnea que despierta al paciente 1-3 horas después de acostarse. Indica insuficiencia cardíaca izquierda. Diferencia con ortopnea: aparición tardía y carácter paroxístico.", "abreviatura": "DPN", "categoria": "general"},
    {"termino": "Ascitis", "definicion": "Acumulación de líquido libre en cavidad peritoneal. Diagnóstico: matidez desplazable, oleada ascítica, ecografía. Paracentesis diagnóstica: GASA ≥1.1 = hipertensión portal. Causa más frecuente: cirrosis.", "categoria": "general"},
    {"termino": "Derrame pleural", "definicion": "Acumulación de líquido en espacio pleural. Trasudado (ICC, cirrosis) vs exudado (infección, neoplasia). Diagnóstico: Rx tórax, ecografía. Toracocentesis según criterios de Light.", "categoria": "general"},
    {"termino": "Neumotórax", "definicion": "Presencia de aire en espacio pleural que colapsa el pulmón. Espontáneo (primario o secundario) o traumático. A tensión: emergencia con desviación traqueal. Tratamiento: tubo de drenaje torácico.", "categoria": "general"},
    {"termino": "Taponamiento cardíaco", "definicion": "Acumulación de líquido pericárdico que comprime las cavidades cardíacas e impide el llenado. Tríada de Beck: hipotensión, ingurgitación yugular, ruidos cardíacos apagados. Emergencia: pericardiocentesis.", "categoria": "general"},
    {"termino": "Shock hipovolémico", "definicion": "Falla circulatoria por pérdida de volumen intravascular (hemorragia, deshidratación severa). Taquicardia, hipotensión, oliguria, piel fría. Tratamiento: reposición de volumen, control de la hemorragia.", "categoria": "general"},
    {"termino": "Shock cardiogénico", "definicion": "Falla circulatoria por incapacidad del corazón de bombear sangre adecuadamente. Causa principal: IAM extenso. Hipotensión con signos de congestión (crepitantes, ingurgitación yugular). Alta mortalidad.", "categoria": "general"},
    {"termino": "Shock distributivo", "definicion": "Falla circulatoria por vasodilatación patológica con mala distribución del flujo sanguíneo. Incluye: shock séptico (más frecuente), anafiláctico y neurogénico. Piel caliente inicialmente.", "categoria": "general"},
    {"termino": "Shock obstructivo", "definicion": "Falla circulatoria por obstrucción mecánica al flujo sanguíneo. Causas: TEP masivo, taponamiento cardíaco, neumotórax a tensión. Tratamiento: resolver la causa obstructiva.", "categoria": "general"},
    {"termino": "Escala de Glasgow", "definicion": "Escala de Coma de Glasgow. Evalúa nivel de conciencia: apertura ocular (1-4), respuesta verbal (1-5), respuesta motora (1-6). Puntaje 3-15. ≤8: coma, indicación de intubación. Predictor pronóstico en TEC.", "categoria": "general"},
    {"termino": "Escala de Norton", "definicion": "Evalúa riesgo de úlceras por presión. Valora: estado físico, mental, actividad, movilidad e incontinencia. Puntaje 5-20. ≤14: riesgo. ≤12: alto riesgo. Guía medidas preventivas de enfermería.", "categoria": "general"},
    {"termino": "Escala de Braden", "definicion": "Evalúa riesgo de lesiones por presión. 6 subescalas: percepción sensorial, humedad, actividad, movilidad, nutrición, fricción. Puntaje 6-23. ≤18: riesgo. ≤12: alto riesgo. Más utilizada internacionalmente.", "categoria": "general"},
    {"termino": "Score APACHE II", "definicion": "Acute Physiology and Chronic Health Evaluation. Sistema de puntuación de gravedad en UCI. Evalúa 12 variables fisiológicas, edad y enfermedad crónica. Predice mortalidad hospitalaria.", "abreviatura": "APACHE II", "categoria": "general"},
    {"termino": "Score SOFA", "definicion": "Sequential Organ Failure Assessment. Evalúa disfunción orgánica en pacientes críticos. 6 sistemas: respiratorio, coagulación, hepático, cardiovascular, neurológico, renal. ≥2 puntos de aumento = sepsis.", "abreviatura": "SOFA", "categoria": "general"},
    {"termino": "Score de Wells", "definicion": "Escala de probabilidad clínica para TEP y TVP. Evalúa factores de riesgo, signos clínicos y diagnósticos diferenciales. Orienta la solicitud de estudios complementarios (dímero D, angioTC).", "categoria": "general"},
    {"termino": "Escala Visual Analógica", "definicion": "Escala de evaluación del dolor. Línea de 10 cm donde el paciente marca su nivel de dolor: 0 (sin dolor) a 10 (peor dolor imaginable). Permite objetivar y monitorizar el tratamiento analgésico.", "abreviatura": "EVA", "categoria": "general"},

    # ══════════════════════════════════════════════════════════════════════════
    # D) TÉRMINOS ANATÓMICOS (~15)
    # ══════════════════════════════════════════════════════════════════════════
    {"termino": "Peritoneo", "definicion": "Membrana serosa que recubre la cavidad abdominal (peritoneo parietal) y las vísceras (peritoneo visceral). El espacio entre ambas hojas puede acumular líquido (ascitis) o infectarse (peritonitis).", "categoria": "anatomia"},
    {"termino": "Espacio pleural", "definicion": "Espacio virtual entre la pleura visceral (pulmón) y parietal (pared torácica). Contiene una fina capa de líquido lubricante. Su ocupación por líquido (derrame) o aire (neumotórax) compromete la ventilación.", "categoria": "anatomia"},
    {"termino": "Barrera hematoencefálica", "definicion": "Barrera selectiva entre la sangre y el sistema nervioso central formada por uniones estrechas endoteliales. Limita el paso de fármacos al SNC. Relevante para antibióticos en meningitis y quimioterapia.", "abreviatura": "BHE", "categoria": "anatomia"},
    {"termino": "Nefrón", "definicion": "Unidad funcional del riñón (~1 millón por riñón). Componentes: glomérulo, túbulo proximal, asa de Henle, túbulo distal, conducto colector. Sitio de acción de diuréticos según segmento.", "categoria": "anatomia"},
    {"termino": "Islotes de Langerhans", "definicion": "Agrupaciones celulares endocrinas del páncreas. Células β: producen insulina. Células α: producen glucagón. Células δ: producen somatostatina. Su destrucción autoinmune causa diabetes tipo 1.", "categoria": "anatomia"},
    {"termino": "Sistema Renina-Angiotensina-Aldosterona", "definicion": "Eje hormonal que regula la presión arterial y el balance hidroelectrolítico. La renina convierte angiotensinógeno en angiotensina I, que la ECA convierte en angiotensina II (vasoconstrictora). Diana de IECA y ARA-II.", "abreviatura": "SRAA", "categoria": "anatomia"},
    {"termino": "Nodo sinoauricular", "definicion": "Marcapasos natural del corazón, ubicado en la aurícula derecha. Genera impulsos eléctricos a 60-100 lpm. Su automatismo es modulado por el sistema nervioso autónomo y fármacos (betabloqueantes, digoxina, ivabradina).", "abreviatura": "NSA", "categoria": "anatomia"},
    {"termino": "Espacio epidural", "definicion": "Espacio entre la duramadre y el ligamento amarillo/periostio vertebral. Contiene grasa y plexos venosos. Vía de administración de anestésicos y analgésicos (analgesia peridural, especialmente en obstetricia).", "categoria": "anatomia"},
    {"termino": "Médula ósea", "definicion": "Tejido hematopoyético dentro de los huesos que produce células sanguíneas (glóbulos rojos, blancos y plaquetas). Médula roja: activa. Médula amarilla: grasa. Diana de quimioterapia (mielotoxicidad).", "categoria": "anatomia"},
    {"termino": "Sinapsis", "definicion": "Unión funcional entre dos neuronas o entre neurona y célula efectora. La transmisión puede ser química (neurotransmisores) o eléctrica. Diana de psicofármacos, anestésicos y relajantes musculares.", "categoria": "anatomia"},
    {"termino": "Hepatocito", "definicion": "Célula principal del hígado, responsable del metabolismo de fármacos (sistema CYP450), síntesis de proteínas (albúmina, factores de coagulación), metabolismo de bilirrubina y detoxificación.", "categoria": "anatomia"},
    {"termino": "Glomérulo renal", "definicion": "Red de capilares dentro de la cápsula de Bowman donde ocurre la filtración glomerular. Filtra ~180 L/día de plasma. Su daño causa proteinuria y hematuria (glomerulonefritis, nefropatía diabética).", "categoria": "anatomia"},
    {"termino": "Alvéolo pulmonar", "definicion": "Estructura sacular terminal del pulmón donde ocurre el intercambio gaseoso (O₂/CO₂). ~300 millones por pulmón. Su ocupación por líquido (edema), pus (neumonía) o colapso (atelectasia) altera la oxigenación.", "categoria": "anatomia"},
    {"termino": "Unión neuromuscular", "definicion": "Sinapsis entre la neurona motora y la fibra muscular esquelética. El neurotransmisor es la acetilcolina (ACh). Diana de bloqueantes neuromusculares (rocuronio, succinilcolina) y anticolinesterásicos (neostigmina).", "categoria": "anatomia"},
    {"termino": "Placa motora", "definicion": "Región especializada de la fibra muscular en la unión neuromuscular donde se concentran los receptores nicotínicos de acetilcolina. Su bloqueo produce parálisis muscular (uso en anestesia).", "categoria": "anatomia"},
]

def main():
    # Cargar glosario existente
    with open(GLOSSARY_PATH, 'r', encoding='utf-8') as f:
        glosario = json.load(f)

    print(f"Glosario actual: {len(glosario)} términos")

    # Construir set de duplicados (normalizado)
    existing_keys = set()
    for entry in glosario:
        existing_keys.add(normalize(entry['termino']))
        if entry.get('abreviatura'):
            existing_keys.add(normalize(entry['abreviatura']))

    # Agregar nuevos términos, detectando duplicados
    added = 0
    skipped = 0
    for nuevo in NUEVOS_TERMINOS:
        key_term = normalize(nuevo['termino'])
        key_abbr = normalize(nuevo.get('abreviatura', '')) if nuevo.get('abreviatura') else None

        if key_term in existing_keys or (key_abbr and key_abbr in existing_keys):
            print(f"  DUPLICADO: {nuevo['termino']}" + (f" ({nuevo['abreviatura']})" if nuevo.get('abreviatura') else ''))
            skipped += 1
            continue

        glosario.append(nuevo)
        existing_keys.add(key_term)
        if key_abbr:
            existing_keys.add(key_abbr)
        added += 1

    # Ordenar alfabéticamente por termino (case-insensitive)
    glosario.sort(key=lambda x: normalize(x['termino']))

    # Guardar
    with open(GLOSSARY_PATH, 'w', encoding='utf-8') as f:
        json.dump(glosario, f, ensure_ascii=False, indent=2)

    print(f"\nResultado:")
    print(f"  Agregados: {added}")
    print(f"  Duplicados omitidos: {skipped}")
    print(f"  Total glosario: {len(glosario)} términos")

    # Conteo por categoría
    cats = {}
    for g in glosario:
        c = g['categoria']
        cats[c] = cats.get(c, 0) + 1
    print(f"\nPor categoría:")
    for c in sorted(cats.keys()):
        print(f"  {c}: {cats[c]}")

if __name__ == '__main__':
    main()
