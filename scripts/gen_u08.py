#!/usr/bin/env python3
"""Generate new drugs for u08 - Sistema Musculoesquelético (11→19)."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from drug_helper import *

NEW_DRUGS = [
  {
    "id": "meloxicam",
    "nombre": "Meloxicam",
    "nombreGenerico": "Meloxicam",
    "nombresComerciales": ["Mobic", "Meloxicam Gador", "Mobifen"],
    "familia": "AINEs",
    "clasificacion": "Inhibidor preferencial de COX-2 (oxicam)",
    "mecanismoAccion": "Oxicam que inhibe preferentemente la ciclooxigenasa-2 (COX-2) sobre la COX-1, reduciendo la síntesis de prostaglandinas proinflamatorias (PGE2, PGI2) con menor efecto sobre la citoprotección gástrica y la función plaquetaria que los AINEs no selectivos.",
    "indicaciones": ["Artrosis", "Artritis reumatoide", "Espondilitis anquilosante", "Dolor musculoesquelético agudo"],
    "contraindicaciones": ["Úlcera péptica activa", "Insuficiencia renal severa (CrCl <15)", "Insuficiencia cardíaca severa (NYHA III-IV)", "Tercer trimestre de embarazo", "Sangrado GI activo", "Alergia a AINEs/aspirina"],
    "efectosAdversos": ["Dispepsia", "Dolor abdominal", "Diarrea", "Náuseas", "Cefalea", "Edema periférico", "Elevación de transaminasas", "Riesgo cardiovascular (menor que COX-2 selectivos)"],
    "interacciones": ["Anticoagulantes: mayor riesgo hemorrágico", "Litio: aumenta niveles de litio", "Metotrexato: reduce excreción (toxicidad)", "Diuréticos/IECA: reduce eficacia antihipertensiva", "Corticoides: mayor riesgo GI"],
    "viaAdministracion": ["oral", "IM"],
    "dosis": {
      "adulto": "7.5-15 mg/día en una toma. Dosis máxima: 15 mg/día. Iniciar con 7.5 mg en ancianos y riesgo GI"
    },
    "presentaciones": ["Comprimidos 7.5, 15 mg", "Ampolla 15 mg/1.5 mL (IM)"],
    "embarazo": "C",
    "lactancia": "Se excreta en leche. No recomendado.",
    "cuidadosEnfermeria": [
      "Tomar con alimentos para reducir irritación gástrica",
      "Dosis única diaria (ventaja de adherencia)",
      "Menor riesgo GI que indometacina o piroxicam (preferencial COX-2)",
      "Controlar PA en hipertensos (retención de sodio)",
      "Monitorizar función renal en ancianos y con diuréticos",
      "No combinar con otros AINEs simultáneamente"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: biodisponibilidad 89%",
      "distribucion": "Unión proteica >99% (albúmina). Líquido sinovial: 50% del plasma",
      "metabolismo": "Hepático CYP2C9 (principal) y CYP3A4",
      "excrecion": "Renal 50%, fecal 50% (como metabolitos)",
      "vidaMedia": "20 horas (permite dosis única diaria)",
      "inicioAccion": "1-2 horas",
      "picoAccion": "5-6 horas",
      "duracionAccion": "24 horas"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u08",
    "capituloId": "c08_01"
  },
  {
    "id": "piroxicam",
    "nombre": "Piroxicam",
    "nombreGenerico": "Piroxicam",
    "nombresComerciales": ["Feldene", "Piroxicam Gador", "Truxa"],
    "familia": "AINEs",
    "clasificacion": "Inhibidor no selectivo de COX (oxicam)",
    "mecanismoAccion": "Oxicam que inhibe ambas isoformas de ciclooxigenasa (COX-1 y COX-2), reduciendo la síntesis de prostaglandinas y tromboxanos. Vida media muy prolongada permite dosis única diaria. Mayor riesgo GI que otros AINEs por inhibición sostenida de COX-1.",
    "indicaciones": ["Artrosis", "Artritis reumatoide", "Espondilitis anquilosante", "Gota aguda (segunda línea)", "Dolor postoperatorio"],
    "contraindicaciones": ["Úlcera péptica activa o antecedente", "Insuficiencia renal/hepática severa", "Insuficiencia cardíaca severa", "Tercer trimestre de embarazo", "Antecedente de sangrado GI con AINEs"],
    "efectosAdversos": ["Úlcera/sangrado GI (mayor que otros AINEs)", "Dispepsia", "Edema", "Reacciones cutáneas graves (Stevens-Johnson, raro)", "Elevación de transaminasas", "Nefrotoxicidad", "Riesgo cardiovascular"],
    "interacciones": ["Anticoagulantes orales: riesgo hemorrágico severo", "Litio: aumenta niveles", "Metotrexato: toxicidad aumentada", "Otros AINEs: no combinar", "Corticoides: riesgo GI aditivo"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "10-20 mg/día en una toma. Gota aguda: 40 mg/día inicial, luego 20 mg/día. Máx: 20 mg/día (crónico)"
    },
    "presentaciones": ["Cápsulas 10, 20 mg", "Comprimidos dispersables 20 mg"],
    "embarazo": "C",
    "lactancia": "Se excreta en leche (1% de dosis materna). No recomendado.",
    "cuidadosEnfermeria": [
      "Mayor riesgo GI que otros AINEs: considerar gastroprotección con IBP",
      "Dosis única diaria por vida media prolongada",
      "Solicitar hemograma y función renal/hepática basal y periódica",
      "Alertar sobre reacciones cutáneas: suspender inmediatamente si erupción",
      "No es primera línea: preferir AINEs con menor riesgo GI",
      "Tomar con alimentos"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: biodisponibilidad completa",
      "distribucion": "Unión proteica 99%. Penetra líquido sinovial",
      "metabolismo": "Hepático CYP2C9",
      "excrecion": "Renal 65%, fecal 35%",
      "vidaMedia": "50 horas (una de las más largas entre AINEs)",
      "inicioAccion": "1-2 horas",
      "picoAccion": "3-5 horas",
      "duracionAccion": "24-48 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de humedad.",
    "unidadId": "u08",
    "capituloId": "c08_01"
  },
  {
    "id": "celecoxib",
    "nombre": "Celecoxib",
    "nombreGenerico": "Celecoxib",
    "nombresComerciales": ["Celebrex", "Celecoxib Gador", "Articox"],
    "familia": "AINEs",
    "clasificacion": "Inhibidor selectivo de COX-2 (coxib)",
    "mecanismoAccion": "Inhibidor altamente selectivo de la ciclooxigenasa-2 (COX-2) sin efecto significativo sobre COX-1 a dosis terapéuticas. Reduce prostaglandinas proinflamatorias preservando la citoprotección gástrica mediada por COX-1 y sin afectar la función plaquetaria.",
    "indicaciones": ["Artrosis", "Artritis reumatoide", "Espondilitis anquilosante", "Dolor agudo", "Dismenorrea primaria", "Poliposis adenomatosa familiar (prevención)"],
    "contraindicaciones": ["Alergia a sulfonamidas", "Enfermedad cardiovascular establecida (IAM previo, ACV, enfermedad arterial periférica)", "Insuficiencia cardíaca NYHA II-IV", "Enfermedad coronaria", "Úlcera péptica activa", "Insuficiencia hepática severa"],
    "efectosAdversos": ["Cefalea", "Dispepsia", "Diarrea", "Edema periférico", "Hipertensión", "Riesgo cardiovascular aumentado (IAM, ACV)", "Riesgo GI menor que AINEs no selectivos"],
    "interacciones": ["Warfarina/acenocumarol: monitorizar INR", "Fluconazol: duplica niveles de celecoxib (inhibidor CYP2C9)", "Litio: aumenta niveles", "IECA/ARA-II: reduce eficacia antihipertensiva", "Aspirina baja dosis: anula ventaja GI"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Artrosis: 200 mg/día (una o dos tomas). AR: 200-400 mg/día en dos tomas. Dolor agudo: 400 mg inicial, luego 200 mg/12h. Máx: 400 mg/día"
    },
    "presentaciones": ["Cápsulas 100, 200 mg"],
    "embarazo": "C",
    "lactancia": "Se excreta en leche. No recomendado.",
    "cuidadosEnfermeria": [
      "Contraindicado en enfermedad cardiovascular establecida",
      "Menor riesgo GI que AINEs no selectivos (ventaja principal)",
      "No afecta función plaquetaria: no sustituye aspirina en prevención CV",
      "Si se combina con aspirina baja dosis: pierde ventaja GI (agregar IBP)",
      "Evaluar riesgo CV basal antes de prescribir (Score de riesgo)",
      "Usar la menor dosis eficaz por el menor tiempo posible"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: biodisponibilidad desconocida exacta. Absorción con alimentos",
      "distribucion": "Unión proteica 97%. Alto volumen de distribución",
      "metabolismo": "Hepático CYP2C9 (polimorfismo genético afecta niveles)",
      "excrecion": "Fecal 57%, renal 27% como metabolitos",
      "vidaMedia": "11 horas",
      "inicioAccion": "1-3 horas",
      "picoAccion": "3 horas",
      "duracionAccion": "12-24 horas"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u08",
    "capituloId": "c08_01"
  },
  {
    "id": "indometacina",
    "nombre": "Indometacina",
    "nombreGenerico": "Indometacina",
    "nombresComerciales": ["Indocid", "IM-75", "Indometacina Northia"],
    "familia": "AINEs",
    "clasificacion": "Inhibidor no selectivo de COX (ácido indolacético)",
    "mecanismoAccion": "Potente inhibidor no selectivo de COX-1 y COX-2. Reduce síntesis de prostaglandinas de forma muy eficaz, pero con alto perfil de efectos adversos GI y renales. Inhibe también fosfolipasa A2 y migración leucocitaria. En neonatos, cierra el conducto arterioso por inhibición de PGE2.",
    "indicaciones": ["Gota aguda", "Espondilitis anquilosante", "Artritis reumatoide (refractaria)", "Cierre del conducto arterioso permeable (neonatos)", "Dolor severo musculoesquelético", "Periartritis de hombro"],
    "contraindicaciones": ["Úlcera péptica activa", "Insuficiencia renal severa", "Antecedente de sangrado GI con AINEs", "Epilepsia/Parkinson (empeora)", "Neonatos con infección activa, NEC o sangrado activo", "Depresión severa"],
    "efectosAdversos": ["Cefalea (muy frecuente, 10-25%)", "Mareo, vértigo", "Dispepsia severa", "Úlcera GI y sangrado", "Depresión", "Confusión (ancianos)", "Nefrotoxicidad", "Agranulocitosis (rara)"],
    "interacciones": ["Anticoagulantes: riesgo hemorrágico alto", "Litio: aumenta niveles significativamente", "Diuréticos: antagonismo", "Metotrexato: toxicidad aumentada", "Triamtereno: insuficiencia renal aguda", "Probenecid: aumenta niveles de indometacina"],
    "viaAdministracion": ["oral", "rectal", "IV"],
    "dosis": {
      "adulto": "25-50 mg/8h oral o rectal. Gota aguda: 50 mg/8h x 3 días, luego 25 mg/8h. Máx: 200 mg/día. Neonatos (conducto arterioso): 0.2 mg/kg IV"
    },
    "presentaciones": ["Cápsulas 25, 50 mg", "Supositorios 100 mg", "Vial IV 1 mg (neonatal)"],
    "embarazo": "C",
    "lactancia": "Se excreta en leche. Usar con precaución.",
    "cuidadosEnfermeria": [
      "Uno de los AINEs más potentes pero con más efectos adversos",
      "Alta incidencia de cefalea: advertir al paciente (puede mejorar con el tiempo)",
      "Gastroprotección con IBP recomendada en uso >5 días",
      "Evitar en ancianos (alto riesgo de confusión, caídas)",
      "En gota aguda: muy eficaz pero preferir colchicina o corticoides como primera línea",
      "Tomar con alimentos o leche",
      "Control de función renal en tratamientos prolongados"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: rápida y casi completa. Rectal: biodisponibilidad 80-90%",
      "distribucion": "Unión proteica 99%. Cruza BHE (causa efectos centrales)",
      "metabolismo": "Hepático CYP2C9. Circulación enterohepática (prolonga efecto)",
      "excrecion": "Renal 60%, fecal 33%",
      "vidaMedia": "4.5 horas (circulación enterohepática extiende efecto)",
      "inicioAccion": "Oral: 30 min. Rectal: 15-30 min",
      "picoAccion": "Oral: 2 horas. Rectal: 1-4 horas",
      "duracionAccion": "4-6 horas"
    },
    "almacenamiento": "Temperatura ambiente. Supositorios: refrigerar si >25°C.",
    "unidadId": "u08",
    "capituloId": "c08_01"
  },
  {
    "id": "tizanidina",
    "nombre": "Tizanidina",
    "nombreGenerico": "Clorhidrato de tizanidina",
    "nombresComerciales": ["Sirdalud", "Zanaflex", "Tizanidina Gador"],
    "familia": "Relajantes musculares",
    "clasificacion": "Agonista alfa-2 adrenérgico central",
    "mecanismoAccion": "Agonista de receptores alfa-2 adrenérgicos en interneuronas espinales, reduciendo la liberación de aminoácidos excitatorios que facilitan la espasticidad. Inhibe reflejos polisinápticos espinales. Efecto relajante muscular sin depresión significativa de la fuerza muscular.",
    "indicaciones": ["Espasticidad por esclerosis múltiple", "Espasticidad post-ACV", "Espasticidad por lesión medular", "Espasmo muscular doloroso agudo", "Contracturas musculares"],
    "contraindicaciones": ["Uso concomitante con fluvoxamina o ciprofloxacino (inhibidores CYP1A2)", "Insuficiencia hepática", "Hipersensibilidad"],
    "efectosAdversos": ["Somnolencia (muy frecuente)", "Sequedad bucal", "Mareo", "Hipotensión", "Bradicardia", "Hepatotoxicidad (monitorizar)", "Astenia", "Alucinaciones (sobredosis)"],
    "interacciones": ["Fluvoxamina: CONTRAINDICADO (aumenta AUC 33 veces por inhibición CYP1A2)", "Ciprofloxacino: CONTRAINDICADO (aumenta AUC 10 veces)", "Otros inhibidores CYP1A2: aumento significativo de niveles", "Antihipertensivos: hipotensión aditiva", "Alcohol, BZD: sedación aditiva"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Inicio: 2 mg/8h. Titular gradualmente cada 4-7 días. Máx: 36 mg/día (12 mg/8h). Uso agudo en espasmo: 2-4 mg/8h por períodos cortos"
    },
    "presentaciones": ["Comprimidos 2, 4 mg"],
    "embarazo": "C",
    "lactancia": "Se desconoce excreción. No recomendado.",
    "cuidadosEnfermeria": [
      "Titular lentamente para minimizar somnolencia e hipotensión",
      "CONTRAINDICADO con fluvoxamina y ciprofloxacino (interacción severa)",
      "Controlar hepatograma basal y cada 1-3 meses durante primeros 6 meses",
      "Monitorizar PA (puede causar hipotensión significativa)",
      "Puede producir dependencia: no suspender abruptamente (rebote)",
      "Tomar a la misma hora: los alimentos afectan la absorción de forma variable"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: biodisponibilidad 40% (primer paso hepático significativo)",
      "distribucion": "Unión proteica 30%",
      "metabolismo": "Hepático extenso CYP1A2 (>95%)",
      "excrecion": "Renal 60%, fecal 20%",
      "vidaMedia": "2.5 horas (requiere 3 dosis/día)",
      "inicioAccion": "1-2 horas",
      "picoAccion": "1-2 horas",
      "duracionAccion": "3-6 horas"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u08",
    "capituloId": "c08_02"
  },
  {
    "id": "dantroleno_oral",
    "nombre": "Dantroleno Oral",
    "nombreGenerico": "Dantroleno sódico",
    "nombresComerciales": ["Dantrium Oral", "Dantroleno"],
    "familia": "Relajantes musculares",
    "clasificacion": "Relajante muscular de acción directa (oral)",
    "mecanismoAccion": "Actúa directamente sobre el músculo esquelético inhibiendo la liberación de calcio desde el retículo sarcoplásmico a través del receptor de rianodina (RyR1). Reduce la contracción muscular sin afectar la transmisión neuromuscular ni el SNC.",
    "indicaciones": ["Espasticidad crónica por lesión medular", "Espasticidad por esclerosis múltiple", "Espasticidad por ACV (crónica)", "Parálisis cerebral (espasticidad)"],
    "contraindicaciones": ["Hepatopatía activa", "Espasticidad que se utiliza para mantener postura o función (la relajación empeoraría función)", "Mujeres >35 años con uso concomitante de estrógenos (mayor riesgo hepático)"],
    "efectosAdversos": ["Hepatotoxicidad (potencialmente fatal, mayor riesgo >45 días y dosis >400 mg)", "Debilidad muscular (dosis-dependiente)", "Somnolencia", "Diarrea", "Mareo", "Náuseas", "Fotosensibilidad"],
    "interacciones": ["Calcioantagonistas (verapamilo): riesgo de colapso cardiovascular", "Estrógenos: mayor riesgo de hepatotoxicidad", "Otros depresores del SNC: sedación aditiva", "Warfarina: puede alterar unión proteica"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Inicio: 25 mg/día. Titular: 25 mg/6-8h cada 7 días. Mantenimiento: 25-100 mg/6-8h. Máx: 400 mg/día"
    },
    "presentaciones": ["Cápsulas 25, 50, 100 mg"],
    "embarazo": "C",
    "lactancia": "Se desconoce excreción. No recomendado.",
    "cuidadosEnfermeria": [
      "Hepatograma OBLIGATORIO basal y cada 2 semanas durante primeros 3 meses, luego mensual",
      "Suspender INMEDIATAMENTE si transaminasas >3 veces el límite normal",
      "Mayor riesgo hepático: mujeres, >35 años, uso >45 días, dosis altas, estrógenos",
      "Titular lentamente para evaluar relación debilidad vs beneficio en espasticidad",
      "Diferente del dantroleno IV (que se usa en hipertermia maligna)",
      "No suspender abruptamente"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: biodisponibilidad 70%. Absorción lenta e incompleta",
      "distribucion": "Unión proteica 80%. Cruza placenta",
      "metabolismo": "Hepático (metabolito activo: 5-hidroxidantroleno)",
      "excrecion": "Renal 25%, fecal (biliar) 45-50%",
      "vidaMedia": "8-9 horas",
      "inicioAccion": "Puede tardar 1 semana en mostrar efecto clínico pleno",
      "picoAccion": "5 horas",
      "duracionAccion": "8-12 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u08",
    "capituloId": "c08_02"
  },
  {
    "id": "febuxostat",
    "nombre": "Febuxostat",
    "nombreGenerico": "Febuxostat",
    "nombresComerciales": ["Uloric", "Adenuric", "Febuxostat Gador"],
    "familia": "Antigotosos",
    "clasificacion": "Inhibidor selectivo no purínico de xantina oxidasa",
    "mecanismoAccion": "Inhibe selectivamente la xantina oxidasa (forma oxidada y reducida) sin ser análogo de purinas, bloqueando la conversión de hipoxantina a xantina y de xantina a ácido úrico. Reduce producción de ácido úrico más potentemente que alopurinol en muchos pacientes.",
    "indicaciones": ["Hiperuricemia crónica con gota (cuando alopurinol no se tolera o es ineficaz)", "Gota tofácea", "Hiperuricemia con insuficiencia renal leve-moderada"],
    "contraindicaciones": ["Uso concomitante con azatioprina o mercaptopurina", "Enfermedad cardiovascular severa (precaución, estudio CARES)", "Hipersensibilidad"],
    "efectosAdversos": ["Artralgia (flare gotoso al inicio)", "Náuseas", "Erupción cutánea", "Alteración de pruebas hepáticas", "Eventos cardiovasculares (mayor tasa vs alopurinol en estudio CARES)", "Diarrea"],
    "interacciones": ["Azatioprina, mercaptopurina: CONTRAINDICADO (inhibe xantina oxidasa que metaboliza estos fármacos, toxicidad severa)", "Teofilina: puede aumentar niveles", "Colchicina: no interacción significativa (puede combinarse para profilaxis de flare)"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Inicio: 40 mg/día. Si uricemia no alcanza <6 mg/dL en 2 semanas: aumentar a 80 mg/día. Máx: 120 mg/día",
      "ajusteRenal": "CrCl 15-30: máx 40 mg/día. No requiere ajuste en IR leve-moderada (ventaja vs alopurinol)"
    },
    "presentaciones": ["Comprimidos 40, 80, 120 mg"],
    "embarazo": "C",
    "lactancia": "Se desconoce excreción. No recomendado.",
    "cuidadosEnfermeria": [
      "Profilaxis de flare gotoso obligatoria al iniciar: colchicina 0.5 mg/día o AINE por 3-6 meses",
      "No iniciar durante crisis de gota aguda",
      "Precaución en enfermedad cardiovascular (estudio CARES: mayor mortalidad CV vs alopurinol)",
      "Ventaja en insuficiencia renal: no requiere ajuste significativo",
      "Controlar uricemia a las 2 semanas para titular",
      "Hepatograma periódico",
      "Objetivo: uricemia <6 mg/dL (<5 mg/dL si gota tofácea)"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: bien absorbido, no afectado significativamente por alimentos",
      "distribucion": "Unión proteica 99%",
      "metabolismo": "Hepático: conjugación (UGT) y oxidación (CYP1A2, 2C8, 2C9)",
      "excrecion": "Renal 49%, fecal 45%",
      "vidaMedia": "5-8 horas",
      "inicioAccion": "Reducción de uricemia en 24-48h",
      "picoAccion": "1-1.5 horas",
      "duracionAccion": "24 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u08",
    "capituloId": "c08_03"
  },
  {
    "id": "leflunomida",
    "nombre": "Leflunomida",
    "nombreGenerico": "Leflunomida",
    "nombresComerciales": ["Arava", "Leflunomida Gador", "Lefluart"],
    "familia": "Inmunosupresores / DMARDs",
    "clasificacion": "Inhibidor de la síntesis de pirimidinas (DMARD sintético)",
    "mecanismoAccion": "Se convierte en su metabolito activo teriflunomida, que inhibe la enzima dihidroorotato deshidrogenasa (DHODH) mitocondrial, bloqueando la síntesis de novo de pirimidinas. Los linfocitos T activados dependen de esta vía, por lo que se inhibe su proliferación.",
    "indicaciones": ["Artritis reumatoide (monoterapia o combinada con MTX)", "Artritis psoriásica", "Alternativa a metotrexato cuando éste no se tolera"],
    "contraindicaciones": ["Embarazo (teratogénico categoría X)", "Lactancia", "Insuficiencia hepática o transaminasas >2x LSN", "Inmunodeficiencia severa", "Insuficiencia medular", "Infección activa severa"],
    "efectosAdversos": ["Diarrea (frecuente)", "Elevación de transaminasas", "Alopecia", "Hipertensión", "Neuropatía periférica", "Leucopenia", "Infecciones", "Enfermedad pulmonar intersticial (rara, grave)"],
    "interacciones": ["Metotrexato: hepatotoxicidad aditiva (monitorizar hepatograma estrictamente)", "Warfarina: aumenta efecto anticoagulante", "Rifampicina: aumenta niveles del metabolito activo", "Vacunas vivas: contraindicadas", "Colestiramina: acelera eliminación (usado como 'washout')"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Carga: 100 mg/día x 3 días (opcional, puede omitirse). Mantenimiento: 20 mg/día (10 mg/día si intolerancia)"
    },
    "presentaciones": ["Comprimidos 10, 20, 100 mg"],
    "embarazo": "X",
    "lactancia": "Contraindicada. Metabolito activo se excreta en leche.",
    "cuidadosEnfermeria": [
      "Anticoncepción OBLIGATORIA en mujeres en edad fértil (teratogénico)",
      "Hepatograma MENSUAL durante primeros 6 meses, luego cada 6-8 semanas",
      "Si se planifica embarazo: procedimiento de 'washout' con colestiramina 8 g/8h x 11 días",
      "Verificar niveles de metabolito <0.02 mg/L antes de concepción",
      "Hemograma completo cada mes al inicio",
      "Monitorizar PA (hipertensión es frecuente)",
      "Vida media del metabolito: 2 semanas (sin washout puede persistir 2 años)"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: biodisponibilidad 80%. Se convierte rápidamente en teriflunomida (metabolito activo)",
      "distribucion": "Unión proteica >99% (albúmina). No penetra SNC",
      "metabolismo": "Pared intestinal e hígado: conversión a teriflunomida. Circulación enterohepática",
      "excrecion": "Renal 43%, fecal 48%. Sin washout: eliminación completa puede tardar 2 años",
      "vidaMedia": "Teriflunomida: 14-18 días (circulación enterohepática)",
      "inicioAccion": "Efecto clínico: 4-6 semanas",
      "picoAccion": "6-12 horas (nivel plasmático del metabolito)",
      "duracionAccion": "Efecto persiste semanas tras suspensión (vida media larga)"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz y humedad.",
    "unidadId": "u08",
    "capituloId": "c08_04"
  }
]

# No new chapters needed for u08
NEW_CHAPTERS = []

# Drugs to add to EXISTING chapters
EXISTING_CHAPTER_ADDITIONS = {
    "c08_01": ["meloxicam", "piroxicam", "celecoxib", "indometacina"],
    "c08_02": ["tizanidina", "dantroleno_oral"],
    "c08_03": ["febuxostat"],
    "c08_04": ["leflunomida"],
}

# Pathology links
PATHOLOGY_LINKS = {
    "pat_gota": ["meloxicam", "piroxicam", "indometacina", "febuxostat"],
    "pat_artritis_reumatoide": ["meloxicam", "celecoxib", "leflunomida"],
}

def main():
    print("=== Generating u08 drugs ===")
    added = add_drugs_to_file(NEW_DRUGS)

    cats = load_categories()
    for ch in NEW_CHAPTERS:
        add_chapter(cats, "u08", ch)
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
