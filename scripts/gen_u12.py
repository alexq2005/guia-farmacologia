#!/usr/bin/env python3
"""Generate new drugs for u12 - Fármacos Hospitalarios (13→23)."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from drug_helper import *

NEW_DRUGS = [
  {
    "id": "sevoflurano",
    "nombre": "Sevoflurano",
    "nombreGenerico": "Sevoflurano",
    "nombresComerciales": ["Sevorane", "Sevoflurano Baxter"],
    "familia": "Anestésicos inhalatorios",
    "clasificacion": "Anestésico general halogenado",
    "mecanismoAccion": "Éter fluorado que produce anestesia general al potenciar la neurotransmisión inhibitoria (GABA-A, glicina) y bloquear la excitatoria (NMDA, nicotínicos). Deprime el SNC de forma dosis-dependiente, produciendo inconsciencia, amnesia, analgesia y relajación muscular.",
    "indicaciones": ["Inducción y mantenimiento de anestesia general", "Inducción inhalatoria (preferido en pediatría)", "Anestesia ambulatoria (recuperación rápida)"],
    "contraindicaciones": ["Hipertermia maligna (antecedente personal o familiar)", "Hipersensibilidad a halogenados", "Hepatitis por halogenados previa"],
    "efectosAdversos": ["Hipotensión", "Depresión respiratoria", "Náuseas y vómitos postoperatorios", "Agitación al despertar (frecuente en niños)", "Bradicardia", "Hipertermia maligna (rara)", "Nefrotoxicidad teórica (compuesto A con absorbentes CO2)"],
    "interacciones": ["Relajantes neuromusculares: potencia efecto (reducir dosis)", "Opioides: reduce CAM de sevoflurano", "Benzodiazepinas: efecto aditivo", "Adrenalina: menor sensibilización miocárdica que halotano"],
    "viaAdministracion": ["inhalatoria"],
    "dosis": {
      "adulto": "Inducción: 0.5-1% incrementando 0.5% cada 2-3 respiraciones hasta 8%. Mantenimiento: 0.5-3% (CAM 2% en adultos). CAM es edad-dependiente (mayor en niños)"
    },
    "presentaciones": ["Frasco 250 mL líquido volátil para vaporizador"],
    "embarazo": "B",
    "lactancia": "Se desconoce excreción. Anestesia única, riesgo bajo.",
    "cuidadosEnfermeria": [
      "Uso exclusivo con vaporizador calibrado para sevoflurano",
      "Inducción suave: preferido en pediatría por olor no irritante",
      "Monitorizar: ECG, SatO2, EtCO2, temperatura, presión arterial",
      "Tener dantroleno disponible (hipertermia maligna)",
      "Flujo de gas fresco ≥2 L/min para minimizar compuesto A",
      "Vigilar agitación al despertar en niños (considerar propofol/fentanilo previo)"
    ],
    "farmacocinetica": {
      "absorcion": "Inhalatoria: rápida (coeficiente sangre/gas 0.65, bajo = rápido)",
      "distribucion": "SNC, grasa, músculo. Coeficiente partición bajo permite control rápido",
      "metabolismo": "Hepático 3-5% (CYP2E1) a fluoruro inorgánico y compuesto A",
      "excrecion": "Pulmonar 95% inalterado",
      "vidaMedia": "Lavado pulmonar: minutos",
      "inicioAccion": "Inducción en 1-3 minutos",
      "picoAccion": "Variable según concentración",
      "duracionAccion": "Despertar en 5-10 min tras suspensión"
    },
    "almacenamiento": "Temperatura ambiente. Frasco bien cerrado (volátil).",
    "unidadId": "u12",
    "capituloId": "c12_01"
  },
  {
    "id": "desflurano",
    "nombre": "Desflurano",
    "nombreGenerico": "Desflurano",
    "nombresComerciales": ["Suprane"],
    "familia": "Anestésicos inhalatorios",
    "clasificacion": "Anestésico general halogenado",
    "mecanismoAccion": "Éter metílico fluorado con el menor coeficiente de partición sangre/gas (0.42) entre los halogenados. Potencia GABA-A y bloquea NMDA. La rápida equilibración permite control preciso de la profundidad anestésica y despertar ultrarápido.",
    "indicaciones": ["Mantenimiento de anestesia general", "Anestesia ambulatoria de corta duración", "Procedimientos donde se desea despertar rápido"],
    "contraindicaciones": ["Hipertermia maligna", "Inducción inhalatoria (irrita vías aéreas, causa tos/laringoespasmo)", "Hipersensibilidad a halogenados"],
    "efectosAdversos": ["Tos y laringoespasmo (si usado en inducción)", "Taquicardia (incrementos rápidos de concentración)", "Hipotensión", "Náuseas postoperatorias", "Hipertermia maligna (rara)", "Activación simpática (aumentos rápidos)"],
    "interacciones": ["Relajantes neuromusculares: potencia efecto", "Opioides: reduce CAM", "N2O: efecto aditivo", "Requiere vaporizador calentado especial (punto ebullición 23°C)"],
    "viaAdministracion": ["inhalatoria"],
    "dosis": {
      "adulto": "Mantenimiento: 2-8.5% en O2 o O2/N2O. CAM: 6-7% (mayor que otros halogenados). Reducir con opioides y N2O"
    },
    "presentaciones": ["Frasco 240 mL líquido volátil para vaporizador TEC 6"],
    "embarazo": "B",
    "lactancia": "Se desconoce. Uso único, riesgo bajo.",
    "cuidadosEnfermeria": [
      "SOLO vaporizador calentado específico (Tec 6) - punto ebullición 23°C",
      "NO usar para inducción inhalatoria (irritante de vía aérea)",
      "Incrementar concentración gradualmente (evitar activación simpática)",
      "Despertar muy rápido: tener analgesia planificada antes de extubación",
      "Monitorización estándar de anestesia general",
      "Tener dantroleno disponible"
    ],
    "farmacocinetica": {
      "absorcion": "Inhalatoria: la más rápida (coeficiente sangre/gas 0.42)",
      "distribucion": "Rápida equilibración SNC. Mínima en grasa",
      "metabolismo": "Hepático <0.02% (el más bajo, seguro en hepatopatía)",
      "excrecion": "Pulmonar >99% inalterado",
      "vidaMedia": "Lavado pulmonar: 2-5 minutos",
      "inicioAccion": "Rápido (2-3 minutos a concentración objetivo)",
      "picoAccion": "Variable según concentración",
      "duracionAccion": "Despertar en 3-5 min tras suspensión (el más rápido)"
    },
    "almacenamiento": "Temperatura ambiente. Frasco bien cerrado.",
    "unidadId": "u12",
    "capituloId": "c12_01"
  },
  {
    "id": "vecuronio",
    "nombre": "Vecuronio",
    "nombreGenerico": "Bromuro de vecuronio",
    "nombresComerciales": ["Norcuron", "Vecuronio Northia"],
    "familia": "Bloqueantes neuromusculares",
    "clasificacion": "Bloqueante neuromuscular no despolarizante (aminoesteroideo)",
    "mecanismoAccion": "Antagonista competitivo de los receptores nicotínicos de acetilcolina en la placa motora. Impide la unión de ACh, bloqueando la transmisión neuromuscular sin despolarización previa. Duración intermedia, sin efectos cardiovasculares significativos.",
    "indicaciones": ["Relajación muscular para intubación orotraqueal", "Relajación durante cirugía", "Facilitación de ventilación mecánica en UCI"],
    "contraindicaciones": ["Hipersensibilidad", "Miastenia gravis (sensibilidad extrema)"],
    "efectosAdversos": ["Parálisis prolongada (sobredosis o interacciones)", "Broncoespasmo (raro)", "Sin liberación de histamina (ventaja)", "Sin efectos cardiovasculares significativos (ventaja)"],
    "interacciones": ["Aminoglucósidos: potencian bloqueo neuromuscular", "Anestésicos inhalatorios: potencian efecto (reducir dosis 15-25%)", "Magnesio: potencia bloqueo", "Sugammadex: revierte bloqueo inmediatamente", "Neostigmina: revierte bloqueo (si TOF ≥2)"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "Intubación: 0.08-0.1 mg/kg IV. Mantenimiento: 0.01-0.015 mg/kg cada 12-15 min o infusión 0.8-1.2 mcg/kg/min",
      "ajusteRenal": "Precaución: metabolito activo 3-desacetilvecuronio se acumula",
      "ajusteHepatico": "Duración prolongada. Reducir dosis"
    },
    "presentaciones": ["Vial liofilizado 4 mg", "Vial liofilizado 10 mg"],
    "embarazo": "C",
    "lactancia": "Se desconoce excreción. Uso quirúrgico único.",
    "cuidadosEnfermeria": [
      "Monitorización con TOF (train-of-four) OBLIGATORIA",
      "El paciente está CONSCIENTE pero paralizado: asegurar hipnosis/analgesia",
      "Reversión: sugammadex (inmediata) o neostigmina + atropina (si TOF ≥2)",
      "Ventilación mecánica asegurada antes de administrar",
      "No libera histamina: más estable hemodinámicamente que atracurio",
      "Reconstituir con agua estéril o SF"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata",
      "distribucion": "Volumen distribución 0.3-0.4 L/kg. Unión proteica 60-90%",
      "metabolismo": "Hepático: 3-desacetilvecuronio (metabolito activo, 50% potencia)",
      "excrecion": "Biliar 40-75%, renal 15-25%",
      "vidaMedia": "65-75 minutos",
      "inicioAccion": "2-3 minutos (dosis de intubación)",
      "picoAccion": "3-5 minutos",
      "duracionAccion": "25-40 minutos (duración intermedia)"
    },
    "almacenamiento": "Refrigerar 2-8°C. Reconstituido: 24h a TA.",
    "unidadId": "u12",
    "capituloId": "c12_01"
  },
  {
    "id": "nitroglicerina_infusion",
    "nombre": "Nitroglicerina IV (Infusión)",
    "nombreGenerico": "Nitroglicerina (trinitrato de glicerilo)",
    "nombresComerciales": ["Nitroglicerina IV Elea", "Tridil"],
    "familia": "Vasodilatadores IV",
    "clasificacion": "Nitrato orgánico (uso IV hospitalario)",
    "mecanismoAccion": "Libera óxido nítrico que activa guanilato ciclasa, aumentando GMPc en músculo liso vascular. A dosis bajas: predomina venodilatación (reduce precarga). A dosis altas: vasodilatación arterial (reduce poscarga). Dilata arterias coronarias epicárdicas y colaterales.",
    "indicaciones": ["Angina inestable / SCA", "Insuficiencia cardíaca aguda con congestión pulmonar", "Edema agudo de pulmón", "Crisis hipertensiva perioperatoria", "Espasmo coronario"],
    "contraindicaciones": ["Hipotensión (PAS <90 mmHg)", "Uso de inhibidores de PDE5 (sildenafilo, tadalafilo) en últimas 24-48h", "Taponamiento cardíaco", "Pericarditis constrictiva", "Miocardiopatía hipertrófica obstructiva", "Hipertensión endocraneana"],
    "efectosAdversos": ["Cefalea (muy frecuente)", "Hipotensión", "Taquicardia refleja", "Rubor facial", "Metahemoglobinemia (dosis altas prolongadas)", "Tolerancia (>24-48h de infusión continua)"],
    "interacciones": ["Sildenafilo/tadalafilo: hipotensión potencialmente fatal (CONTRAINDICADO)", "Antihipertensivos: hipotensión aditiva", "Heparina: la NTG IV puede reducir efecto de heparina", "Alteplasa: se puede usar concomitantemente"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "Inicio: 5 mcg/min, titular cada 3-5 min en incrementos de 5-10 mcg/min. Rango habitual: 10-200 mcg/min. Titular según PA (no reducir PAS >25%)",
      "ajusteRenal": "No requiere ajuste",
      "ajusteHepatico": "Precaución en hepatopatía severa"
    },
    "presentaciones": ["Ampolla 5 mg/mL x 10 mL (50 mg)", "Ampolla 5 mg/mL x 5 mL (25 mg)"],
    "embarazo": "C",
    "lactancia": "Se desconoce excreción. Uso hospitalario supervisado.",
    "cuidadosEnfermeria": [
      "Usar set de infusión SIN PVC (la NTG se adsorbe al PVC, reduciendo dosis entregada)",
      "Monitorización hemodinámica continua (PA invasiva o PANI cada 5 min)",
      "Titular según objetivo de PA y síntomas (no reducir PAS >25%)",
      "Preguntar SIEMPRE por uso de sildenafilo/tadalafilo (contraindicado)",
      "Desarrolla tolerancia tras 24-48h: considerar intervalos libres",
      "Cefalea frecuente: tratar con paracetamol",
      "Bomba de infusión obligatoria para dosificación precisa"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata",
      "distribucion": "Volumen distribución 3 L/kg. Unión proteica 60%",
      "metabolismo": "Hepático rápido y en pared vascular (metabolismo de primer paso alto)",
      "excrecion": "Renal (metabolitos)",
      "vidaMedia": "1-4 minutos",
      "inicioAccion": "IV: 1-2 minutos",
      "picoAccion": "Inmediato, titulable",
      "duracionAccion": "3-5 minutos post-suspensión"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz. Set sin PVC.",
    "unidadId": "u12",
    "capituloId": "c12_02"
  },
  {
    "id": "solucion_fisiologica",
    "nombre": "Solución Fisiológica (NaCl 0.9%)",
    "nombreGenerico": "Cloruro de sodio 0.9%",
    "nombresComerciales": ["Solución Fisiológica Rivero", "NaCl 0.9% Baxter", "Solución Salina Normal"],
    "familia": "Soluciones IV de reposición",
    "clasificacion": "Cristaloide isotónico",
    "mecanismoAccion": "Solución isotónica con el plasma (308 mOsm/L) que expande el volumen del espacio extracelular. Contiene Na+ 154 mEq/L y Cl- 154 mEq/L (hiperclorémica respecto al plasma). Aproximadamente el 25% permanece intravascular a los 30 min.",
    "indicaciones": ["Reposición de volumen / Resucitación con fluidos", "Deshidratación isotónica", "Diluyente universal para medicación IV", "Lavado de heridas y vías venosas", "Hipotensión / shock (expansión inicial)", "Hiponatremia (con precaución)"],
    "contraindicaciones": ["Hipernatremia", "Hipercloremia severa", "Sobrecarga de volumen / ICC descompensada", "Edema pulmonar (relativo)"],
    "efectosAdversos": ["Acidosis hiperclorémica (grandes volúmenes)", "Sobrecarga de volumen", "Edema periférico", "Dilución de factores de coagulación (volúmenes masivos)", "Injuria renal aguda (hipercloremia)"],
    "interacciones": ["Verificar compatibilidad con cada fármaco antes de diluir", "Ceftriaxona + calcio: no diluir en Ringer Lactato con ceftriaxona"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "Mantenimiento: 1-2 mL/kg/h. Reposición: según déficit calculado. Resucitación: 500-1000 mL bolo IV rápido, reevaluar. No hay dosis máxima fija, guiar por clínica"
    },
    "presentaciones": ["Frasco 100, 250, 500, 1000 mL", "Ampolla 10 mL (dilución)", "Bolsa 250, 500, 1000 mL"],
    "embarazo": "A",
    "lactancia": "Compatible.",
    "cuidadosEnfermeria": [
      "Cristaloide más utilizado en la práctica clínica",
      "En resucitación: preferir Ringer Lactato si grandes volúmenes (menor riesgo de acidosis hiperclorémica)",
      "Monitorizar sodio, cloro, pH y función renal en uso prolongado",
      "Balance hídrico estricto en cardiópatas y nefróticos",
      "Verificar compatibilidad antes de usar como diluyente",
      "Calentar solución si transfusión masiva (prevenir hipotermia)"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata",
      "distribucion": "Espacio extracelular. ~25% permanece intravascular a 30 min",
      "metabolismo": "No aplica",
      "excrecion": "Renal (regulación por ADH y aldosterona)",
      "vidaMedia": "Intravascular: 20-30 minutos",
      "inicioAccion": "Inmediato",
      "picoAccion": "Durante infusión",
      "duracionAccion": "Efecto de volumen: 30-60 min intravascular"
    },
    "almacenamiento": "Temperatura ambiente. No exponer a temperaturas extremas.",
    "unidadId": "u12",
    "capituloId": "c12_02"
  },
  {
    "id": "ringer_lactato",
    "nombre": "Ringer Lactato (Solución de Hartmann)",
    "nombreGenerico": "Solución de Ringer Lactato",
    "nombresComerciales": ["Ringer Lactato Rivero", "Hartmann Baxter", "Ringer Lactato Fresenius"],
    "familia": "Soluciones IV de reposición",
    "clasificacion": "Cristaloide isotónico balanceado",
    "mecanismoAccion": "Solución isotónica balanceada (273 mOsm/L) con composición más similar al plasma que la SF. Contiene Na+ 130, K+ 4, Ca2+ 3, Cl- 109 mEq/L y lactato 28 mEq/L (metabolizado a bicarbonato en hígado). Menor riesgo de acidosis hiperclorémica.",
    "indicaciones": ["Resucitación con fluidos (preferido sobre SF en grandes volúmenes)", "Deshidratación", "Reposición intraoperatoria", "Shock hipovolémico (expansión inicial)", "Quemados (fórmula de Parkland)"],
    "contraindicaciones": ["Hiperpotasemia", "Insuficiencia hepática severa (no metaboliza lactato)", "Alcalosis metabólica", "No usar con sangre citratada en misma línea (calcio quela citrato)"],
    "efectosAdversos": ["Hiperpotasemia (contiene K+)", "Alcalosis metabólica (con grandes volúmenes, por metabolismo del lactato)", "Sobrecarga de volumen", "Hipocalcemia relativa (quela citrato si con hemoderivados)"],
    "interacciones": ["Ceftriaxona: NO administrar en misma línea (precipitado con calcio)", "Sangre citratada: el calcio del RL puede quelar citrato (precaución)", "Compatible con la mayoría de medicamentos IV"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "Mantenimiento: 1-2 mL/kg/h. Resucitación: bolos de 500-1000 mL según respuesta. Quemados (Parkland): 4 mL x kg x %SCQ en 24h (50% primeras 8h)"
    },
    "presentaciones": ["Frasco 500, 1000 mL", "Bolsa 500, 1000 mL"],
    "embarazo": "A",
    "lactancia": "Compatible.",
    "cuidadosEnfermeria": [
      "Preferido sobre SF en resucitación con grandes volúmenes (menor acidosis hiperclorémica)",
      "NO administrar con ceftriaxona (precipitado con calcio)",
      "Precaución en hiperpotasemia (contiene K+ 4 mEq/L)",
      "Balance hídrico estricto",
      "Precaución en insuficiencia hepática (metabolismo del lactato comprometido)",
      "El lactato NO es ácido láctico: se metaboliza a bicarbonato",
      "Fórmula de Parkland en quemados: calcular y administrar estrictamente"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata",
      "distribucion": "Espacio extracelular. ~25% permanece intravascular a 30 min",
      "metabolismo": "Lactato se convierte a bicarbonato en hígado (ciclo de Cori)",
      "excrecion": "Renal",
      "vidaMedia": "Intravascular: 20-30 minutos",
      "inicioAccion": "Inmediato",
      "picoAccion": "Durante infusión",
      "duracionAccion": "Efecto de volumen: 30-60 min intravascular"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u12",
    "capituloId": "c12_02"
  },
  {
    "id": "albumina_humana",
    "nombre": "Albúmina Humana",
    "nombreGenerico": "Albúmina sérica humana",
    "nombresComerciales": ["Albúmina Grifols 20%", "Albúmina UNC 20%", "Human Albumin Baxter"],
    "familia": "Expansores plasmáticos",
    "clasificacion": "Coloide natural",
    "mecanismoAccion": "Proteína plasmática más abundante (60% de las proteínas totales). Ejerce el 80% de la presión oncótica intravascular. Administrada IV, expande el volumen plasmático al atraer agua del intersticio al espacio intravascular (1 g de albúmina retiene 18 mL de agua).",
    "indicaciones": ["Paracentesis de gran volumen en cirrosis (>5L)", "Síndrome hepatorrenal (con terlipresina)", "Peritonitis bacteriana espontánea (prevención de SHR)", "Shock refractario a cristaloides", "Quemados extensos (>24h)", "Hipoalbuminemia severa con edema refractario"],
    "contraindicaciones": ["Insuficiencia cardíaca severa (riesgo de sobrecarga)", "Alergia a albúmina humana", "Anemia severa"],
    "efectosAdversos": ["Sobrecarga de volumen", "Edema pulmonar", "Escalofríos y fiebre", "Náuseas", "Reacciones alérgicas (raras)", "Alteración de electrolitos"],
    "interacciones": ["No mezclar con otros fármacos en la misma solución", "Diuréticos: efecto sinérgico en movilización de edema"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "Paracentesis: 8 g por litro de ascitis extraída (>5L). SHR: 1 g/kg día 1, luego 20-40 g/día. PBE: 1.5 g/kg día 1 + 1 g/kg día 3. Al 20%: 50-100 mL. Al 5%: 250-500 mL"
    },
    "presentaciones": ["Frasco 20% x 50 mL (10 g)", "Frasco 20% x 100 mL (20 g)", "Frasco 5% x 250 mL (12.5 g)"],
    "embarazo": "C",
    "lactancia": "Compatible. Es proteína fisiológica.",
    "cuidadosEnfermeria": [
      "Al 20% (hiperonótica): expande 4-5 veces el volumen infundido. Precaución en ICC",
      "Al 5% (isooncótica): para reposición de volumen",
      "Velocidad de infusión: 20% a 1-2 mL/min, 5% más rápido",
      "En paracentesis: calcular g de albúmina según litros extraídos (8g/L >5L)",
      "Monitorizar PA, FC, PVC y signos de sobrecarga",
      "No calentar excesivamente (desnaturaliza proteína)",
      "Producto derivado de sangre: registrar lote y donante"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata",
      "distribucion": "80% intravascular, 20% intersticial. Presión oncótica: 20 mmHg",
      "metabolismo": "Catabolismo hepático y tisular",
      "excrecion": "Reciclaje permanente. Vida media prolongada",
      "vidaMedia": "16-21 días",
      "inicioAccion": "Inmediato (expansión de volumen)",
      "picoAccion": "Al 20%: 30-60 min post-infusión",
      "duracionAccion": "Horas a días (según nivel sérico de albúmina)"
    },
    "almacenamiento": "Temperatura ambiente hasta 30°C. No congelar. Usar dentro de 4h tras apertura.",
    "unidadId": "u12",
    "capituloId": "c12_02"
  },
  {
    "id": "aminoacidos_parenterales",
    "nombre": "Aminoácidos Parenterales",
    "nombreGenerico": "Solución de aminoácidos para nutrición parenteral",
    "nombresComerciales": ["Aminoplasmal", "Travasol", "Aminoven"],
    "familia": "Nutrición parenteral",
    "clasificacion": "Solución de aminoácidos cristalinos",
    "mecanismoAccion": "Mezcla de aminoácidos esenciales y no esenciales que aporta el sustrato proteico para la síntesis de proteínas corporales, enzimas, hormonas y proteínas de fase aguda. Imprescindible en nutrición parenteral para mantener balance nitrogenado positivo.",
    "indicaciones": ["Nutrición parenteral total o parcial", "Paciente con tracto GI no funcionante >5-7 días", "Fístulas GI de alto débito", "Síndrome de intestino corto", "Grandes quemados", "Politraumatismo severo"],
    "contraindicaciones": ["Errores innatos del metabolismo de aminoácidos (fenilcetonuria, enfermedad de arce)", "Insuficiencia hepática severa (encefalopatía hepática)", "Acidosis metabólica severa no corregida"],
    "efectosAdversos": ["Hiperamonemia", "Acidosis metabólica", "Alteración de pruebas hepáticas", "Colestasis (NPT prolongada)", "Azotemia prerrenal (exceso proteico)", "Reacciones febriles"],
    "interacciones": ["Deben formularse en mezcla con glucosa y lípidos (bolsa ternaria)", "Insulina: frecuentemente requerida en bolsa de NPT", "Electrolitos: añadir según necesidad diaria"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "1-2 g de proteínas/kg/día (estado catabólico: hasta 2 g/kg/día). Concentraciones habituales: 8.5-15% de aminoácidos. Infusión en 16-24h"
    },
    "presentaciones": ["Frasco 10% x 500 mL", "Frasco 15% x 500 mL", "Bolsa ternaria premezclada (aminoácidos + glucosa + lípidos)"],
    "embarazo": "C",
    "lactancia": "Compatible bajo supervisión médica.",
    "cuidadosEnfermeria": [
      "Administrar por vía venosa CENTRAL (osmolaridad alta)",
      "Infusión en 16-24h con bomba de infusión",
      "Control diario: glucemia, electrolitos, balance nitrogenado",
      "Control semanal: hepatograma, triglicéridos, prealbúmina",
      "Técnica aséptica estricta en preparación y administración",
      "Proteger mezcla de la luz (degradación de vitaminas)",
      "No agregar fármacos a la bolsa sin verificar compatibilidad"
    ],
    "farmacocinetica": {
      "absorcion": "IV: 100%",
      "distribucion": "Pool de aminoácidos libre, luego incorporación a proteínas tisulares",
      "metabolismo": "Hepático: síntesis proteica, desaminación, transaminación",
      "excrecion": "Renal (urea del catabolismo aminoacídico)",
      "vidaMedia": "Variable según aminoácido individual",
      "inicioAccion": "Inmediato (disponibilidad para síntesis proteica)",
      "picoAccion": "Durante infusión",
      "duracionAccion": "Según tasa de recambio proteico"
    },
    "almacenamiento": "Temperatura ambiente. Bolsa preparada: refrigerar hasta 24h, usar en 24h a TA.",
    "unidadId": "u12",
    "capituloId": "c12_04"
  },
  {
    "id": "lipidos_parenterales",
    "nombre": "Lípidos Parenterales",
    "nombreGenerico": "Emulsión lipídica IV",
    "nombresComerciales": ["Lipofundin", "Intralipid", "SMOFlipid", "ClinOleic"],
    "familia": "Nutrición parenteral",
    "clasificacion": "Emulsión lipídica intravenosa",
    "mecanismoAccion": "Emulsión de triglicéridos de cadena larga (aceite de soja, oliva, pescado) y/o cadena media (aceite de coco), estabilizada con fosfolípidos de huevo. Aporta ácidos grasos esenciales (linoleico, linolénico) y calorías densas (9 kcal/g). SMOFlipid incluye omega-3 con efecto antiinflamatorio.",
    "indicaciones": ["Nutrición parenteral (aporte calórico lipídico)", "Prevención de deficiencia de ácidos grasos esenciales", "Vehículo para propofol (Intralipid)", "Emulsión lipídica como antídoto de intoxicación por anestésicos locales (ILE rescue)"],
    "contraindicaciones": ["Hipertrigliceridemia severa (>400 mg/dL)", "Alergia a huevo o soja (según formulación)", "Shock agudo no resuelto", "Coagulopatía severa"],
    "efectosAdversos": ["Hipertrigliceridemia", "Disfunción hepática (colestasis)", "Pancreatitis (si triglicéridos elevados)", "Síndrome de sobrecarga lipídica (raro)", "Reacciones febriles", "Infección asociada a catéter"],
    "interacciones": ["Heparina: puede liberar lipasa, aclarando triglicéridos", "Ciclosporina: se vehiculiza en partículas lipídicas", "Fármacos liposolubles: pueden adsorberse a la emulsión"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "0.7-1.5 g de lípidos/kg/día (máx 2.5 g/kg/día). Al 20%: 250-500 mL/día. Infusión en 12-24h. No exceder 0.11 g/kg/h. ILE rescue: 1.5 mL/kg bolo de Intralipid 20% en intox por AL"
    },
    "presentaciones": ["Frasco 20% x 250, 500 mL", "Frasco 10% x 500 mL", "SMOFlipid 20% x 250, 500 mL"],
    "embarazo": "C",
    "lactancia": "Compatible bajo supervisión.",
    "cuidadosEnfermeria": [
      "Infusión lenta: iniciar a velocidad baja e incrementar gradualmente",
      "Controlar triglicéridos séricos antes y durante NPT (suspender si >400 mg/dL)",
      "Proteger de la luz (si contiene vitaminas liposolubles)",
      "No filtrar con filtros de 0.22 mcm (emulsión no pasa). Usar filtro 1.2 mcm",
      "Técnica aséptica estricta (medio de cultivo bacteriano)",
      "En ILE rescue para intoxicación por AL: protocolo estandarizado (ver ASRA)",
      "Hepatograma semanal durante NPT prolongada"
    ],
    "farmacocinetica": {
      "absorcion": "IV: 100%",
      "distribucion": "Partículas lipídicas similares a quilomicrones circulantes",
      "metabolismo": "Lipólisis por lipoproteín lipasa, oxidación tisular",
      "excrecion": "Mínima excreción directa",
      "vidaMedia": "Aclaramiento plasmático: 30-60 min",
      "inicioAccion": "Disponibilidad calórica inmediata",
      "picoAccion": "Durante infusión",
      "duracionAccion": "Según tasa de utilización metabólica"
    },
    "almacenamiento": "Temperatura ambiente. No congelar. Proteger de la luz si contiene vitaminas.",
    "unidadId": "u12",
    "capituloId": "c12_04"
  },
  {
    "id": "glucosa_parenteral",
    "nombre": "Glucosa Parenteral (Dextrosa 5-50%)",
    "nombreGenerico": "Dextrosa (glucosa anhidra)",
    "nombresComerciales": ["Dextrosa 5% Rivero", "Dextrosa 10% Baxter", "Dextrosa 50%"],
    "familia": "Nutrición parenteral / Soluciones IV",
    "clasificacion": "Solución glucosada para aporte calórico",
    "mecanismoAccion": "Aporta glucosa como sustrato energético principal para el metabolismo celular. Cada gramo de glucosa aporta 3.4 kcal. La dextrosa al 5% es isotónica, al 10% o más es hipertónica. Es el componente energético principal de la nutrición parenteral.",
    "indicaciones": ["Aporte calórico en nutrición parenteral", "Dextrosa 5%: vehículo de dilución / mantenimiento hídrico", "Dextrosa 10%: prevención de hipoglucemia (neonatos, postoperatorio)", "Dextrosa 50%: tratamiento de hipoglucemia severa", "Vehículo para infusiones de insulina + potasio en hiperpotasemia"],
    "contraindicaciones": ["Hiperglucemia no controlada", "Coma hiperosmolar", "Dextrosa al 50%: no administrar por vía periférica (flebitis)"],
    "efectosAdversos": ["Hiperglucemia", "Hiperosmolaridad (soluciones concentradas)", "Tromboflebitis (concentraciones >10% en vía periférica)", "Hiponatremia dilucional", "Esteatosis hepática (NPT prolongada)", "Síndrome de realimentación"],
    "interacciones": ["Insulina: frecuentemente requerida en NPT", "Tiamina: administrar ANTES de glucosa en desnutridos (prevenir Wernicke)", "Potasio: frecuentemente se agrega KCl a la solución"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "NPT: 3-5 g glucosa/kg/día (no exceder tasa de oxidación 4-5 mg/kg/min). D5%: 500-2000 mL/día mantenimiento. D50%: 25-50 mL bolo IV para hipoglucemia"
    },
    "presentaciones": ["Frasco D5% x 500, 1000 mL", "Frasco D10% x 500 mL", "Ampolla D25% x 20 mL", "Ampolla D50% x 20 mL"],
    "embarazo": "A",
    "lactancia": "Compatible.",
    "cuidadosEnfermeria": [
      "D5%: periférica o central. D10%: preferir central. D>10%: vía central OBLIGATORIA",
      "Monitorizar glucemia cada 4-6h en NPT (ajustar insulina según necesidad)",
      "En desnutridos: síndrome de realimentación posible (monitorizar fosfato, magnesio, potasio)",
      "Administrar tiamina ANTES de glucosa en alcohólicos/desnutridos",
      "No exceder tasa de infusión de glucosa de 4-5 mg/kg/min",
      "D50% solo por vía central o en emergencia por periférica gruesa",
      "Balance hídrico estricto"
    ],
    "farmacocinetica": {
      "absorcion": "IV: 100%",
      "distribucion": "Espacio extracelular, luego intracelular por transportadores GLUT",
      "metabolismo": "Glucólisis, ciclo de Krebs, glucogénesis, lipogénesis",
      "excrecion": "CO2 y H2O. Glucosuria si >180 mg/dL",
      "vidaMedia": "Variable según estado metabólico e insulina",
      "inicioAccion": "Inmediato",
      "picoAccion": "Durante infusión",
      "duracionAccion": "Según tasa de utilización"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u12",
    "capituloId": "c12_04"
  }
]

# New chapters to create for u12
NEW_CHAPTERS = [
    {
        "id": "c12_04",
        "nombre": "Nutrición Parenteral",
        "unidadId": "u12",
        "drugIds": ["aminoacidos_parenterales", "lipidos_parenterales", "glucosa_parenteral"]
    }
]

# Drugs to add to EXISTING chapters
EXISTING_CHAPTER_ADDITIONS = {
    "c12_01": ["sevoflurano", "desflurano", "vecuronio"],
    "c12_02": ["nitroglicerina_infusion", "solucion_fisiologica", "ringer_lactato", "albumina_humana"],
}

# Pathology links
PATHOLOGY_LINKS = {
    "pat_sdra": ["solucion_fisiologica", "ringer_lactato", "albumina_humana"],
    "pat_shock_septico": ["noradrenalina", "solucion_fisiologica", "ringer_lactato", "albumina_humana"],
    "pat_edema_pulmonar": ["nitroglicerina_infusion", "albumina_humana"],
}

def main():
    print("=== Generating u12 drugs ===")
    added = add_drugs_to_file(NEW_DRUGS)

    cats = load_categories()
    for ch in NEW_CHAPTERS:
        add_chapter(cats, "u12", ch)
    for ch_id, drug_ids in EXISTING_CHAPTER_ADDITIONS.items():
        for did in drug_ids:
            add_drug_to_chapter(cats, ch_id, did)
    save_categories(cats)
    print("  Updated categories.json")

    pats = load_pathologies()
    for pat_id, drug_ids in PATHOLOGY_LINKS.items():
        for did in drug_ids:
            add_drug_to_pathology(pats, pat_id, did)
    save_pathologies(pats)
    print("  Updated pathologies.json")

if __name__ == "__main__":
    main()
