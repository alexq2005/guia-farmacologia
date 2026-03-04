#!/usr/bin/env python3
"""
Agrega ~10 patologías de alta relevancia LATAM/Argentina a pathologies.json.
Valida que todos los drug IDs en farmacosRelacionados existan en drugs.json.
"""

import json
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PATHOLOGIES_PATH = os.path.join(SCRIPT_DIR, '..', 'src', 'data', 'pathologies.json')
DRUGS_PATH = os.path.join(SCRIPT_DIR, '..', 'src', 'data', 'drugs.json')

NUEVAS_PATOLOGIAS = [
    {
        "id": "pat_sae",
        "nombre": "Síndrome Ascítico Edematoso",
        "definicion": "Cuadro clínico caracterizado por la acumulación de líquido en la cavidad peritoneal (ascitis) y edema periférico. Es la complicación más frecuente de la cirrosis hepática descompensada, resultado de la hipertensión portal y la retención de sodio y agua.",
        "fisiopatologiaBreve": "La hipertensión portal genera vasodilatación esplácnica con reducción del volumen arterial efectivo. Se activan mecanismos compensadores (SRAA, SNS, ADH) que producen retención renal de sodio y agua. La hipoalbuminemia por falla hepática reduce la presión oncótica, favoreciendo la trasudación hacia el peritoneo y el intersticio.",
        "signosSintomas": [
            "Distensión abdominal progresiva",
            "Matidez desplazable y oleada ascítica",
            "Edema en miembros inferiores (bilateral, en godet)",
            "Aumento de peso rápido",
            "Disnea por elevación diafragmática",
            "Hernia umbilical por aumento de presión intraabdominal",
            "Circulación colateral visible (cabeza de medusa)",
            "Ictericia y signos de hepatopatía crónica"
        ],
        "farmacosRelacionados": [
            "furosemida",
            "espironolactona",
            "albumina_humana",
            "propranolol",
            "lactulosa",
            "ciprofloxacino"
        ],
        "cuidadosEnfermeria": [
            "Peso diario en ayunas (mismo horario y balanza)",
            "Medición de perímetro abdominal diario a nivel umbilical",
            "Balance hídrico estricto (ingesta y diuresis)",
            "Restricción de sodio (<2 g/día) y líquidos (1-1.5 L/día si Na⁺ <125)",
            "Monitorizar electrolitos (Na⁺, K⁺) y función renal",
            "Cuidados de piel edematizada: hidratación, cambios de posición, prevenir lesiones",
            "Asistir en paracentesis: posición, monitorizar TA durante y después, reponer albúmina si >5L",
            "Vigilar signos de peritonitis bacteriana espontánea: fiebre, dolor abdominal, deterioro del sensorio"
        ],
        "criteriosAlarma": [
            "Fiebre o dolor abdominal espontáneo (peritonitis bacteriana espontánea)",
            "Deterioro rápido del sensorio (encefalopatía hepática)",
            "Hemorragia digestiva (várices esofágicas)",
            "Creatinina en ascenso rápido (síndrome hepatorrenal)",
            "Na⁺ sérico <120 mEq/L",
            "Ascitis refractaria a diuréticos"
        ],
        "categoria": "gastrointestinal"
    },
    {
        "id": "pat_sindrome_nefrotico",
        "nombre": "Síndrome Nefrótico",
        "definicion": "Conjunto de manifestaciones clínicas derivadas del aumento masivo de la permeabilidad glomerular a las proteínas. Se define por proteinuria >3.5 g/24h, hipoalbuminemia <3 g/dL, edema e hiperlipidemia.",
        "fisiopatologiaBreve": "El daño glomerular (podocitario) aumenta la permeabilidad de la membrana basal a las proteínas plasmáticas. La pérdida masiva de albúmina reduce la presión oncótica plasmática, causando trasudación de líquido al intersticio (edema). El hígado compensa aumentando la síntesis de lipoproteínas (hiperlipidemia). La pérdida de antitrombina III y proteínas anticoagulantes genera un estado protrombótico.",
        "signosSintomas": [
            "Edema periférico progresivo (inicialmente palpebral matutino)",
            "Edema generalizado (anasarca en casos severos)",
            "Orina espumosa (proteinuria)",
            "Aumento de peso por retención hídrica",
            "Ascitis y derrame pleural",
            "Hiperlipidemia (colesterol y triglicéridos elevados)",
            "Mayor susceptibilidad a infecciones",
            "Riesgo aumentado de trombosis venosa y arterial"
        ],
        "farmacosRelacionados": [
            "prednisona",
            "furosemida",
            "espironolactona",
            "enalapril",
            "losartan",
            "enoxaparina"
        ],
        "cuidadosEnfermeria": [
            "Peso diario y medición de edema (escala de godet)",
            "Control de diuresis y proteinuria (tira reactiva)",
            "Balance hídrico estricto",
            "Dieta hiposódica e hipolipemiante con aporte proteico adecuado",
            "Monitorizar signos de trombosis (TVP, TEP): dolor/edema asimétrico en miembros, disnea súbita",
            "Cuidados de piel edematizada: evitar lesiones, hidratar, movilizar",
            "Vigilar signos de infección (inmunosupresión por pérdida de inmunoglobulinas y uso de corticoides)",
            "Educar sobre efectos adversos de corticoides: hiperglucemia, osteoporosis, facies cushingoide"
        ],
        "criteriosAlarma": [
            "Edema pulmonar o derrame pleural masivo",
            "Signos de TVP o TEP (disnea súbita, dolor torácico)",
            "Infección grave (peritonitis espontánea, celulitis)",
            "Deterioro rápido de función renal (creatinina en ascenso)",
            "Albúmina sérica <1.5 g/dL",
            "Anasarca con compromiso respiratorio"
        ],
        "categoria": "renal"
    },
    {
        "id": "pat_sindrome_nefritico",
        "nombre": "Síndrome Nefrítico",
        "definicion": "Cuadro clínico de inicio agudo causado por inflamación glomerular (glomerulonefritis), caracterizado por hematuria, proteinuria moderada, hipertensión arterial y oliguria con retención de líquidos.",
        "fisiopatologiaBreve": "La inflamación glomerular (depósito de inmunocomplejos, activación del complemento) daña los capilares glomerulares, permitiendo el paso de eritrocitos (hematuria) y reduciendo la filtración glomerular. La caída de la TFG causa retención de sodio y agua con hipertensión y edema. La causa clásica en niños es la glomerulonefritis post-estreptocócica (1-3 semanas después de faringitis o impétigo).",
        "signosSintomas": [
            "Hematuria macroscópica (orina color cola o té)",
            "Edema facial y palpebral (predominio matutino)",
            "Hipertensión arterial",
            "Oliguria",
            "Proteinuria moderada (generalmente <3.5 g/24h)",
            "Cefalea (por HTA)",
            "Dolor lumbar bilateral leve"
        ],
        "farmacosRelacionados": [
            "furosemida",
            "enalapril",
            "amlodipino",
            "prednisona"
        ],
        "cuidadosEnfermeria": [
            "Control estricto de presión arterial (c/4-6h según severidad)",
            "Balance hídrico con control de diuresis horaria",
            "Restricción de sodio y líquidos durante fase aguda",
            "Monitorizar color y aspecto de orina (hematuria)",
            "Control de peso diario",
            "Reposo relativo durante la fase aguda",
            "Monitorizar función renal y electrolitos",
            "En niños: pesquisa de antecedente de infección estreptocócica reciente"
        ],
        "criteriosAlarma": [
            "HTA severa o encefalopatía hipertensiva (cefalea intensa, convulsiones, visión borrosa)",
            "Oliguria severa o anuria",
            "Edema pulmonar por sobrecarga de volumen",
            "Hiperpotasemia (K⁺ >6 mEq/L)",
            "Deterioro rápido de la función renal (insuficiencia renal rápidamente progresiva)",
            "Hematuria macroscópica persistente"
        ],
        "categoria": "renal"
    },
    {
        "id": "pat_suh",
        "nombre": "Síndrome Urémico Hemolítico",
        "definicion": "Microangiopatía trombótica caracterizada por la tríada de anemia hemolítica microangiopática, trombocitopenia e insuficiencia renal aguda. Argentina tiene la mayor incidencia mundial de SUH típico, principalmente en menores de 5 años.",
        "fisiopatologiaBreve": "La toxina Shiga producida por E. coli O157:H7 (y otras cepas STEC) daña el endotelio vascular, especialmente el renal. Esto genera activación plaquetaria, formación de microtrombos en arteriolas y capilares glomerulares, hemólisis mecánica de eritrocitos al pasar por vasos dañados (esquistocitos) y consumo de plaquetas. El daño endotelial renal causa IRA oligoanúrica.",
        "signosSintomas": [
            "Diarrea sanguinolenta previa (pródromo, 5-10 días antes)",
            "Palidez intensa (anemia hemolítica)",
            "Petequias y equimosis (trombocitopenia)",
            "Oliguria o anuria",
            "Edema",
            "Hipertensión arterial",
            "Irritabilidad o letargia",
            "Ictericia leve",
            "Esquistocitos en frotis de sangre periférica"
        ],
        "farmacosRelacionados": [
            "furosemida",
            "gluconato_calcio",
            "insulina_regular",
            "bicarbonato-sodio"
        ],
        "cuidadosEnfermeria": [
            "Balance hídrico estricto con control de diuresis horaria (sondaje vesical)",
            "Peso diario (mismo horario, misma balanza)",
            "Monitorización continua de TA y FC",
            "Control de laboratorio seriado: hemograma, reticulocitos, LDH, haptoglobina, creatinina, urea, K⁺",
            "NO administrar antibióticos (pueden aumentar liberación de toxina Shiga)",
            "NO administrar antidiarreicos ni AINEs",
            "Cuidados de accesos vasculares para eventual diálisis",
            "Soporte transfusional según indicación médica (glóbulos rojos lavados)",
            "Educación familiar: prevención (cocción completa de carne, higiene, agua segura)"
        ],
        "criteriosAlarma": [
            "Anuria >24 horas (indicación de diálisis)",
            "Hiperpotasemia >6.5 mEq/L (riesgo de arritmia)",
            "Convulsiones o signos neurológicos (compromiso de SNC)",
            "Hemoglobina <7 g/dL con inestabilidad hemodinámica",
            "HTA severa no controlada",
            "Acidosis metabólica severa (pH <7.2)",
            "Sobrecarga de volumen con edema pulmonar"
        ],
        "categoria": "renal"
    },
    {
        "id": "pat_dengue",
        "nombre": "Dengue",
        "definicion": "Enfermedad viral transmitida por el mosquito Aedes aegypti, endémica en regiones tropicales y subtropicales de América Latina. Cuatro serotipos (DENV 1-4). La infección por un segundo serotipo aumenta el riesgo de dengue grave.",
        "fisiopatologiaBreve": "El virus del dengue infecta monocitos y células dendríticas. La respuesta inmune genera producción masiva de citoquinas (tormenta de citoquinas) que aumentan la permeabilidad vascular, causando extravasación plasmática, hemoconcentración y potencialmente shock. La trombocitopenia resulta de destrucción plaquetaria mediada por anticuerpos y supresión medular transitoria.",
        "signosSintomas": [
            "Fiebre alta de inicio abrupto (40°C, 2-7 días)",
            "Cefalea intensa retroocular",
            "Mialgias y artralgias severas (fiebre quebrantahuesos)",
            "Exantema maculopapular",
            "Náuseas, vómitos y dolor abdominal",
            "Trombocitopenia (plaquetas <100.000/mm³)",
            "Leucopenia",
            "Petequias, prueba del torniquete positiva",
            "Signos de alarma: dolor abdominal intenso, vómitos persistentes, acumulación de líquidos, sangrado de mucosas, letargia"
        ],
        "farmacosRelacionados": [
            "paracetamol"
        ],
        "cuidadosEnfermeria": [
            "Hidratación oral abundante (suero de rehidratación oral)",
            "Antitérmico SOLO paracetamol — CONTRAINDICADOS AINEs (ibuprofeno, aspirina, diclofenac) y dipirona por riesgo hemorrágico",
            "Control de signos vitales c/4-6h (c/1-2h si signos de alarma)",
            "Monitorizar diuresis (meta: ≥0.5 mL/kg/h)",
            "Hemograma y hematocrito seriado (hemoconcentración = extravasación)",
            "Vigilar signos de alarma: dolor abdominal, vómitos, sangrado, letargia, derrame pleural/ascitis",
            "Reposo en cama con mosquitero (evitar transmisión durante viremia)",
            "Fase crítica: días 3-7 de enfermedad (al caer la fiebre — máximo riesgo de shock)",
            "NO colocar vías IM ni realizar procedimientos invasivos innecesarios"
        ],
        "criteriosAlarma": [
            "Dolor abdominal intenso y sostenido",
            "Vómitos persistentes (≥3 en 1 hora o ≥5 en 6 horas)",
            "Sangrado de mucosas (gingivorragia, epistaxis, metrorragia)",
            "Acumulación de líquidos (derrame pleural, ascitis)",
            "Letargia o irritabilidad",
            "Hepatomegalia dolorosa >2 cm",
            "Hematocrito en ascenso con plaquetas en descenso rápido",
            "Hipotensión, taquicardia, pulso débil (shock por dengue)"
        ],
        "categoria": "infeccioso"
    },
    {
        "id": "pat_chagas",
        "nombre": "Enfermedad de Chagas",
        "definicion": "Enfermedad parasitaria causada por Trypanosoma cruzi, transmitida principalmente por vinchucas (triatominos). Endémica en América Latina con ~6 millones de infectados. Causa principal de miocardiopatía en la región.",
        "fisiopatologiaBreve": "T. cruzi infecta células del sistema reticuloendotelial, músculo cardíaco y músculo liso del tubo digestivo. La fase aguda cursa con parasitemia elevada y puede pasar inadvertida. Tras décadas de infección crónica (fase indeterminada), 30-40% desarrolla miocardiopatía chagásica (fibrosis, dilatación ventricular, trastornos de conducción, arritmias) y/o megavísceras (megaesófago, megacolon) por destrucción de plexos nerviosos autonómicos.",
        "signosSintomas": [
            "Fase aguda: chagoma de inoculación o signo de Romaña (edema bipalpebral unilateral)",
            "Fiebre prolongada, hepatoesplenomegalia, linfadenopatías",
            "Fase crónica indeterminada: asintomática (puede durar décadas)",
            "Miocardiopatía chagásica: disnea, palpitaciones, síncope, ICC",
            "Trastornos de conducción: bloqueo de rama derecha, hemibloqueo anterior izquierdo",
            "Arritmias ventriculares (riesgo de muerte súbita)",
            "Megaesófago: disfagia, regurgitación",
            "Megacolon: constipación crónica severa, fecaloma"
        ],
        "farmacosRelacionados": [
            "benznidazol",
            "amiodarona",
            "enalapril",
            "carvedilol",
            "furosemida"
        ],
        "cuidadosEnfermeria": [
            "Administración correcta de benznidazol: con alimentos, dosis según peso, duración 60 días",
            "Vigilar efectos adversos de benznidazol: dermatitis alérgica (más frecuente), neuropatía periférica, leucopenia",
            "Control de hemograma semanal durante tratamiento tripanocida",
            "Monitorización de ECG periódico en miocardiopatía chagásica",
            "Control de peso, diuresis y signos de ICC en cardiopatía",
            "Educación sobre prevención: mejoramiento de vivienda, control de vinchucas, uso de insecticidas",
            "Screening en embarazadas de zonas endémicas (transmisión vertical)",
            "Derivar a cardiología ante hallazgos ECG anormales en paciente seropositivo"
        ],
        "criteriosAlarma": [
            "Síncope o palpitaciones sostenidas (arritmias ventriculares)",
            "Signos de ICC descompensada (disnea, edema, ingurgitación yugular)",
            "Bloqueo AV completo (bradicardia severa)",
            "Dermatitis severa o leucopenia con benznidazol (suspender tratamiento)",
            "Fenómenos tromboembólicos (ACV, TEP)",
            "Reactivación en paciente inmunodeprimido (HIV, trasplantado)"
        ],
        "categoria": "infeccioso"
    },
    {
        "id": "pat_sca",
        "nombre": "Síndrome Coronario Agudo",
        "definicion": "Conjunto de manifestaciones clínicas producidas por la isquemia miocárdica aguda. Incluye angina inestable (AI), infarto sin elevación del ST (SCASEST/IAMSEST) e infarto con elevación del ST (SCACEST/IAMCEST). Emergencia cardiovascular tiempo-dependiente.",
        "fisiopatologiaBreve": "La rotura o erosión de una placa aterosclerótica coronaria expone el contenido lipídico subendotelial, activando la cascada de coagulación y la agregación plaquetaria. Se forma un trombo que ocluye parcial (AI/SCASEST) o totalmente (SCACEST) la arteria coronaria. La isquemia prolongada >20 minutos produce necrosis miocárdica irreversible. La extensión del infarto depende del tiempo de isquemia y la presencia de circulación colateral.",
        "signosSintomas": [
            "Dolor torácico opresivo, retroesternal, >20 minutos",
            "Irradiación a brazo izquierdo, mandíbula, espalda o epigastrio",
            "No cede con reposo ni nitroglicerina sublingual (en IAM)",
            "Diaforesis fría",
            "Disnea, náuseas, vómitos",
            "Sensación de muerte inminente",
            "Presentación atípica frecuente en diabéticos, mujeres y ancianos",
            "Cambios ECG: elevación/depresión del ST, ondas T invertidas, ondas Q",
            "Elevación de troponinas (marcadores de necrosis miocárdica)"
        ],
        "farmacosRelacionados": [
            "aspirina",
            "clopidogrel",
            "heparina",
            "enoxaparina",
            "morfina",
            "nitroglicerina",
            "atenolol",
            "atorvastatina"
        ],
        "cuidadosEnfermeria": [
            "MONA: Morfina, Oxígeno (si SatO₂ <90%), Nitroglicerina, Aspirina — priorizar AAS masticable",
            "ECG de 12 derivaciones en <10 minutos desde el contacto",
            "Monitorización continua: ECG, TA, SatO₂, FC",
            "Dos accesos venosos periféricos de grueso calibre",
            "Reposo absoluto en cama, posición semifowler",
            "Calmar la ansiedad del paciente (contribuye a la demanda de O₂)",
            "Administrar antiagregantes y anticoagulantes según protocolo",
            "Tiempo puerta-balón <90 min (angioplastia) o puerta-aguja <30 min (fibrinólisis)",
            "Vigilar complicaciones: arritmias, ICC, shock cardiogénico, rotura cardíaca",
            "Control seriado de troponinas y enzimas cardíacas"
        ],
        "criteriosAlarma": [
            "Dolor torácico persistente a pesar del tratamiento",
            "Arritmias ventriculares (TV/FV) — tener desfibrilador preparado",
            "Hipotensión <90/60 mmHg o shock cardiogénico",
            "Edema agudo de pulmón",
            "Nuevo soplo cardíaco (rotura de músculo papilar, CIV)",
            "Bradicardia severa o bloqueo AV completo",
            "Re-elevación del ST (reoclusión coronaria)"
        ],
        "categoria": "cardiovascular"
    },
    {
        "id": "pat_abstinencia_oh",
        "nombre": "Síndrome de Abstinencia Alcohólica",
        "definicion": "Conjunto de síntomas que aparecen al reducir o suspender abruptamente el consumo de alcohol en personas con dependencia. Espectro desde temblor leve hasta delirium tremens con alta mortalidad si no se trata.",
        "fisiopatologiaBreve": "El alcohol potencia la inhibición GABAérgica y suprime la excitación glutamatérgica (NMDA). Con el consumo crónico, el SNC se adapta aumentando la actividad excitatoria y reduciendo la inhibitoria. Al suspender el alcohol, se produce hiperexcitabilidad neuronal descontrolada: hiperactividad simpática, convulsiones y potencialmente delirium tremens.",
        "signosSintomas": [
            "Temblor de manos (6-24h post-última ingesta)",
            "Ansiedad, irritabilidad, insomnio",
            "Diaforesis, taquicardia, hipertensión",
            "Náuseas, vómitos",
            "Alucinaciones (visuales, tactiles — 12-48h)",
            "Convulsiones tónico-clónicas (24-48h, pueden ser el debut)",
            "Delirium tremens (48-72h): confusión severa, agitación extrema, alucinaciones vívidas, fiebre, inestabilidad hemodinámica",
            "Hipertermia y deshidratación severa"
        ],
        "farmacosRelacionados": [
            "diazepam",
            "lorazepam",
            "tiamina",
            "haloperidol"
        ],
        "cuidadosEnfermeria": [
            "Evaluación con escala CIWA-Ar (Clinical Institute Withdrawal Assessment) cada 1-4h",
            "Tiamina IV/IM ANTES de administrar glucosa (prevenir encefalopatía de Wernicke)",
            "Benzodiacepinas según protocolo por puntaje CIWA-Ar (generalmente diazepam VO o lorazepam IV)",
            "Ambiente tranquilo, bien iluminado, evitar estímulos excesivos",
            "Monitorización continua: CSV c/1-2h, nivel de conciencia, temperatura",
            "Hidratación IV (solución fisiológica con electrolitos), balance hídrico",
            "Corrección de alteraciones electrolíticas: Mg²⁺, K⁺, fosfato",
            "Prevención de caídas y lesiones (barandas, contención si es necesario)",
            "Vigilar estado de conciencia: escala de Glasgow"
        ],
        "criteriosAlarma": [
            "Convulsiones (especialmente si son nuevas o recurrentes)",
            "Fiebre >38.5°C (delirium tremens o infección concomitante)",
            "Confusión severa o delirium (delirium tremens — mortalidad 5-15% sin tratamiento)",
            "Inestabilidad hemodinámica (taquicardia >120, HTA severa o hipotensión)",
            "Hipoglucemia",
            "Rabdomiólisis (CPK elevada, orina oscura)",
            "Depresión respiratoria por sobredosis de benzodiacepinas"
        ],
        "categoria": "psiquiatrico"
    },
    {
        "id": "pat_intox_organofosforados",
        "nombre": "Intoxicación por Organofosforados",
        "definicion": "Envenenamiento por compuestos organofosforados (insecticidas agrícolas: paratión, malatión, clorpirifós). Causa frecuente de intoxicación aguda en áreas rurales de LATAM, tanto accidental como intencional. Inhiben la acetilcolinesterasa de forma irreversible.",
        "fisiopatologiaBreve": "Los organofosforados fosforilan e inhiben irreversiblemente la acetilcolinesterasa, provocando acumulación de acetilcolina en sinapsis muscarínicas (glándulas, músculo liso, corazón), nicotínicas (músculo esquelético, ganglios) y centrales. El exceso colinérgico produce la crisis colinérgica. Sin tratamiento, la unión enzima-tóxico envejece (aging), volviéndose permanente en 24-48h.",
        "signosSintomas": [
            "Síndrome muscarínico (DUMBELS): Diarrea, Urinación, Miosis, Broncoespasmo/Broncorrea, Emesis, Lagrimeo, Salivación",
            "Bradicardia e hipotensión",
            "Síndrome nicotínico: fasciculaciones musculares, debilidad, parálisis",
            "Taquicardia (por efecto nicotínico ganglionar)",
            "Síntomas centrales: ansiedad, convulsiones, coma",
            "Insuficiencia respiratoria (broncorrea + broncoespasmo + parálisis diafragmática)",
            "Olor a ajo/solvente orgánico",
            "Pupilas puntiformes (miosis) — signo clave"
        ],
        "farmacosRelacionados": [
            "atropina",
            "pralidoxima",
            "diazepam"
        ],
        "cuidadosEnfermeria": [
            "PROTECCIÓN DEL PERSONAL: guantes de nitrilo, bata impermeable, barbijo — el tóxico se absorbe por piel",
            "Descontaminación: retirar toda la ropa, lavar piel con agua y jabón abundante",
            "Vía aérea permeable: aspirar secreciones frecuentemente (broncorrea profusa)",
            "Atropina IV en dosis progresivas hasta atropinización: sequedad de secreciones bronquiales como endpoint (NO midriasis)",
            "Pralidoxima IV dentro de las primeras 24-48h (antes del envejecimiento del complejo)",
            "Diazepam IV si convulsiones",
            "Monitorización continua: FC, TA, SatO₂, FR, tamaño pupilar, secreciones bronquiales",
            "NO inducir vómito ni realizar lavado gástrico sin protección de vía aérea",
            "Mantener atropinización: puede requerirse infusión continua durante días",
            "Monitorizar colinesterasa sérica y eritrocitaria como marcador de severidad"
        ],
        "criteriosAlarma": [
            "Insuficiencia respiratoria (SatO₂ <90%, broncorrea masiva)",
            "Necesidad de intubación y ARM",
            "Convulsiones",
            "Bradicardia severa o asistolia",
            "Síndrome intermedio (debilidad proximal y respiratoria 24-96h post-exposición)",
            "Neuropatía tardía (2-4 semanas post-exposición)",
            "Recaída por absorción cutánea o depósitos grasos del tóxico"
        ],
        "categoria": "emergencia"
    },
    {
        "id": "pat_sindrome_realimentacion",
        "nombre": "Síndrome de Realimentación",
        "definicion": "Conjunto de alteraciones metabólicas potencialmente letales que ocurren al reintroducir nutrición en pacientes severamente desnutridos o con ayuno prolongado (>7-10 días). Causa principal de muerte prevenible en reinicio de alimentación.",
        "fisiopatologiaBreve": "Durante el ayuno prolongado, el organismo se adapta al catabolismo graso como fuente energética, con depleción intracelular de fósforo, potasio y magnesio (aunque los niveles séricos pueden ser normales). Al reintroducir carbohidratos, la secreción de insulina aumenta bruscamente, provocando entrada masiva de glucosa, fósforo, potasio y magnesio al espacio intracelular. La hipofosfatemia resultante compromete la producción de ATP y 2,3-DPG, causando disfunción cardíaca, respiratoria y neurológica.",
        "signosSintomas": [
            "Hipofosfatemia severa (hallazgo cardinal, <1 mg/dL es crítico)",
            "Hipopotasemia e hipomagnesemia",
            "Retención hidrosalina y edema",
            "Taquicardia, arritmias, insuficiencia cardíaca",
            "Insuficiencia respiratoria (debilidad muscular diafragmática)",
            "Confusión, convulsiones, coma",
            "Debilidad muscular generalizada",
            "Rabdomiólisis",
            "Déficit de tiamina (encefalopatía de Wernicke)"
        ],
        "farmacosRelacionados": [
            "potasio_cloruro",
            "sulfato_magnesio_emergencia",
            "tiamina",
            "gluconato_calcio"
        ],
        "cuidadosEnfermeria": [
            "IDENTIFICAR pacientes en riesgo: ayuno >7 días, anorexia nerviosa, alcoholismo, posquirúrgico prolongado, oncológicos, sin techo",
            "Administrar tiamina 200-300 mg IV ANTES de iniciar alimentación (previene Wernicke)",
            "Iniciar alimentación al 25% de los requerimientos calóricos y aumentar gradualmente en 5-7 días",
            "Suplementar fósforo, potasio y magnesio desde el inicio ANTES de que desciendan",
            "Monitorizar electrolitos c/12h los primeros 3 días: fósforo, K⁺, Mg²⁺, Ca²⁺, Na⁺",
            "Balance hídrico estricto (restringir sodio y líquidos para evitar sobrecarga)",
            "Peso diario (aumento >0.5 kg/día sugiere retención hídrica)",
            "Monitorización cardíaca continua (arritmias por alteraciones electrolíticas)",
            "Control de glucemia capilar c/6h (la hiperinsulinemia puede causar hipoglucemia)"
        ],
        "criteriosAlarma": [
            "Fósforo sérico <1 mg/dL (riesgo de paro cardíaco)",
            "Potasio sérico <2.5 mEq/L o >6 mEq/L",
            "Arritmias en el ECG (prolongación QT, ondas U, ondas T picudas)",
            "Insuficiencia cardíaca aguda (taquicardia, disnea, edema pulmonar)",
            "Insuficiencia respiratoria (debilidad diafragmática)",
            "Confusión, convulsiones (hipofosfatemia severa o Wernicke)",
            "Rabdomiólisis (CPK elevada, mioglobinuria)"
        ],
        "categoria": "emergencia"
    }
]

def main():
    # Cargar datos existentes
    with open(PATHOLOGIES_PATH, 'r', encoding='utf-8') as f:
        patologias = json.load(f)

    with open(DRUGS_PATH, 'r', encoding='utf-8') as f:
        drugs = json.load(f)

    drug_ids = {d['id'] for d in drugs}
    existing_ids = {p['id'] for p in patologias}

    print(f"Patologías actuales: {len(patologias)}")
    print(f"Fármacos disponibles: {len(drug_ids)}")

    # Validar y agregar
    added = 0
    errors = 0
    for nueva in NUEVAS_PATOLOGIAS:
        # Verificar ID duplicado
        if nueva['id'] in existing_ids:
            print(f"  DUPLICADO: {nueva['id']} ({nueva['nombre']})")
            continue

        # Validar drug IDs
        missing_drugs = []
        for drug_id in nueva['farmacosRelacionados']:
            if drug_id not in drug_ids:
                missing_drugs.append(drug_id)

        if missing_drugs:
            print(f"  ERROR en {nueva['id']}: drug IDs no encontrados: {missing_drugs}")
            errors += 1
            continue

        patologias.append(nueva)
        existing_ids.add(nueva['id'])
        added += 1
        print(f"  + {nueva['id']}: {nueva['nombre']} ({len(nueva['farmacosRelacionados'])} fármacos)")

    if errors > 0:
        print(f"\n¡{errors} patologías NO se agregaron por drug IDs inválidos!")
        return

    # Guardar
    with open(PATHOLOGIES_PATH, 'w', encoding='utf-8') as f:
        json.dump(patologias, f, ensure_ascii=False, indent=2)

    print(f"\nResultado:")
    print(f"  Agregadas: {added}")
    print(f"  Total patologías: {len(patologias)}")

    # Conteo por categoría
    cats = {}
    for p in patologias:
        c = p['categoria']
        cats[c] = cats.get(c, 0) + 1
    print(f"\nPor categoría:")
    for c in sorted(cats.keys()):
        print(f"  {c}: {cats[c]}")

if __name__ == '__main__':
    main()
