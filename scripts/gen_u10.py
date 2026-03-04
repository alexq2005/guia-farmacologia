#!/usr/bin/env python3
"""Generate new drugs for u10 - Hematología (12→25)."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from drug_helper import *

NEW_DRUGS = [
  {
    "id": "apixaban",
    "nombre": "Apixaban",
    "nombreGenerico": "Apixaban",
    "nombresComerciales": ["Eliquis", "Apixaban Gador"],
    "familia": "Anticoagulantes orales directos",
    "clasificacion": "Inhibidor directo del factor Xa",
    "mecanismoAccion": "Inhibe selectiva y reversiblemente el factor Xa libre y unido al complejo protrombinasa, interrumpiendo la cascada de coagulación intrínseca y extrínseca. Reduce la generación de trombina sin efecto directo sobre las plaquetas.",
    "indicaciones": ["Prevención de ACV en fibrilación auricular no valvular", "Tratamiento de TVP y TEP", "Prevención de TVP post-cirugía ortopédica", "Prevención de recurrencia de TVP/TEP"],
    "contraindicaciones": ["Sangrado activo clínicamente significativo", "Hepatopatía con coagulopatía", "Hipersensibilidad", "Prótesis valvular cardíaca mecánica"],
    "efectosAdversos": ["Hemorragia", "Anemia", "Náuseas", "Hematomas", "Epistaxis", "Hematuria", "Elevación de transaminasas"],
    "interacciones": ["Inhibidores CYP3A4 y P-gp (ketoconazol, ritonavir): aumentan niveles", "Inductores CYP3A4 (rifampicina, carbamazepina): reducen eficacia", "Otros anticoagulantes/antiplaquetarios: mayor riesgo hemorrágico", "AINEs: mayor riesgo de sangrado"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "FA: 5 mg/12h (2.5 mg/12h si ≥2 criterios: edad ≥80, peso ≤60 kg, creatinina ≥1.5). TVP/TEP: 10 mg/12h x 7 días, luego 5 mg/12h",
      "ajusteRenal": "CrCl 15-29: 2.5 mg/12h en FA. CrCl <15: no recomendado"
    },
    "presentaciones": ["Comprimidos recubiertos 2.5, 5 mg"],
    "embarazo": "C",
    "lactancia": "Se desconoce excreción en leche. No recomendado.",
    "cuidadosEnfermeria": [
      "No requiere monitorización rutinaria de coagulación",
      "Antídoto específico: andexanet alfa (disponibilidad limitada)",
      "No triturar comprimidos (puede administrarse por SNG en suspensión)",
      "Valorar función renal basal y periódicamente",
      "Educar sobre signos de sangrado: hematuria, melena, epistaxis prolongada",
      "Suspender 48h antes de cirugía de alto riesgo hemorrágico"
    ],
    "farmacocinetica": {
      "absorcion": "Oral, biodisponibilidad 50%",
      "distribucion": "Unión proteica 87%",
      "metabolismo": "Hepático CYP3A4/5, también P-gp",
      "excrecion": "Renal 27%, fecal (biliar e intestinal)",
      "vidaMedia": "12 horas",
      "inicioAccion": "3-4 horas",
      "picoAccion": "3-4 horas",
      "duracionAccion": "24 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de humedad.",
    "unidadId": "u10",
    "capituloId": "c10_01"
  },
  {
    "id": "fondaparinux",
    "nombre": "Fondaparinux",
    "nombreGenerico": "Fondaparinux sódico",
    "nombresComerciales": ["Arixtra", "Fondaparinux Varifarma"],
    "familia": "Anticoagulantes parenterales",
    "clasificacion": "Inhibidor selectivo del factor Xa (pentasacárido sintético)",
    "mecanismoAccion": "Pentasacárido sintético que se une selectivamente a antitrombina III, potenciando ~300 veces su inhibición del factor Xa. No inhibe trombina directamente ni afecta plaquetas (no causa HIT).",
    "indicaciones": ["Profilaxis de TVP en cirugía ortopédica", "Tratamiento de TVP y TEP", "Síndrome coronario agudo", "Trombocitopenia inducida por heparina (alternativa)"],
    "contraindicaciones": ["Sangrado activo", "Endocarditis bacteriana", "Insuficiencia renal severa (CrCl <20)", "Peso <50 kg (en profilaxis)", "Trombocitopenia por fondaparinux"],
    "efectosAdversos": ["Hemorragia", "Anemia", "Trombocitopenia", "Elevación de transaminasas", "Edema", "Hematoma en sitio de inyección"],
    "interacciones": ["Otros anticoagulantes/antiagregantes: riesgo hemorrágico aditivo", "AINEs: mayor riesgo de sangrado", "No interactúa con plaquetas: no causa HIT"],
    "viaAdministracion": ["SC"],
    "dosis": {
      "adulto": "Profilaxis TVP: 2.5 mg SC/día inicio 6-8h postquirúrgico. Tratamiento TVP/TEP: <50 kg: 5 mg, 50-100 kg: 7.5 mg, >100 kg: 10 mg SC/día",
      "ajusteRenal": "CrCl 20-50: precaución y monitorizar anti-Xa. CrCl <20: contraindicado"
    },
    "presentaciones": ["Jeringa prellenada 2.5 mg/0.5 mL", "Jeringa prellenada 5 mg/0.4 mL", "Jeringa prellenada 7.5 mg/0.6 mL"],
    "embarazo": "B",
    "lactancia": "Se excreta en leche en ratas. Uso con precaución.",
    "cuidadosEnfermeria": [
      "Inyección SC en abdomen (alternar lados), NO IM",
      "No expulsar burbuja de aire de la jeringa (diseño predosificado)",
      "Monitorizar anti-Xa si insuficiencia renal o peso extremo",
      "Controlar hemograma y función renal periódicamente",
      "No tiene antídoto específico aprobado",
      "Iniciar profilaxis 6-8h después de cierre quirúrgico",
      "Ventaja: no produce trombocitopenia inducida por heparina"
    ],
    "farmacocinetica": {
      "absorcion": "SC biodisponibilidad 100%",
      "distribucion": "Unión a antitrombina III selectivamente. Volumen distribución 7-11 L",
      "metabolismo": "No se metaboliza",
      "excrecion": "Renal 77% inalterado",
      "vidaMedia": "17-21 horas",
      "inicioAccion": "Rápido (anti-Xa detectable en 25 min)",
      "picoAccion": "2-3 horas",
      "duracionAccion": "24 horas"
    },
    "almacenamiento": "Temperatura ambiente. No congelar.",
    "unidadId": "u10",
    "capituloId": "c10_01"
  },
  {
    "id": "acenocumarol",
    "nombre": "Acenocumarol",
    "nombreGenerico": "Acenocumarol",
    "nombresComerciales": ["Sintrom", "Acenocumarol Denver Farma"],
    "familia": "Anticoagulantes orales",
    "clasificacion": "Antagonista de la vitamina K (cumarínico)",
    "mecanismoAccion": "Inhibe la enzima vitamina K epóxido reductasa (VKORC1), impidiendo la regeneración de vitamina K reducida. Sin vitamina K activa, no se pueden gamma-carboxilar los factores II, VII, IX y X ni las proteínas C y S.",
    "indicaciones": ["Fibrilación auricular (prevención de ACV)", "Prótesis valvulares mecánicas", "TVP/TEP (tratamiento y prevención)", "Síndrome antifosfolipídico"],
    "contraindicaciones": ["Embarazo (teratogénico)", "Sangrado activo", "HTA severa no controlada", "Cirugía reciente en SNC/ocular", "Hepatopatía grave", "Úlcera péptica activa"],
    "efectosAdversos": ["Hemorragia (principal)", "Necrosis cutánea (rara, inicio)", "Alopecia", "Hepatotoxicidad", "Síndrome del dedo púrpura (raro)"],
    "interacciones": ["AINEs, ASA: mayor riesgo hemorrágico", "Amiodarona, fluconazol, metronidazol: potencian efecto (aumentan INR)", "Rifampicina, carbamazepina, barbitúricos: reducen efecto", "Vitamina K dietaria: antagoniza efecto", "Paracetamol a dosis altas: aumenta INR"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Inicio: 2-4 mg/día, ajustar según INR cada 2-3 días. Mantenimiento habitual: 1-8 mg/día. INR objetivo según indicación (2-3 generalmente, 2.5-3.5 válvulas mecánicas)"
    },
    "presentaciones": ["Comprimidos 4 mg (ranurados en cuartos)"],
    "embarazo": "X",
    "lactancia": "Se excreta en leche en mínimas cantidades. Compatible con precaución (monitorizar lactante).",
    "cuidadosEnfermeria": [
      "Control de INR estricto: cada 2-3 días al inicio, luego semanal, luego mensual",
      "Educar al paciente sobre dieta consistente en vitamina K (no eliminar, mantener estable)",
      "Siempre a la misma hora del día (preferiblemente tarde/noche)",
      "Antídoto: vitamina K (fitomenadiona) IV/oral",
      "Advertir sobre múltiples interacciones medicamentosas (consultar siempre)",
      "Identificación de anticoagulado (pulsera/tarjeta)",
      "Vida media más corta que warfarina: más usado en Argentina/España"
    ],
    "farmacocinetica": {
      "absorcion": "Oral rápida y completa",
      "distribucion": "Unión proteica 98.7% (albúmina)",
      "metabolismo": "Hepático CYP2C9 (principal), CYP1A2, CYP2C19",
      "excrecion": "Renal 60% como metabolitos, fecal 29%",
      "vidaMedia": "8-11 horas (más corta que warfarina)",
      "inicioAccion": "36-72 horas (efecto anticoagulante completo)",
      "picoAccion": "2-3 horas (nivel plasmático)",
      "duracionAccion": "48-96 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u10",
    "capituloId": "c10_01"
  },
  {
    "id": "protamina",
    "nombre": "Protamina",
    "nombreGenerico": "Sulfato de protamina",
    "nombresComerciales": ["Protamina Roux-Ocefa", "Protamine Sulfate"],
    "familia": "Antídotos hematológicos",
    "clasificacion": "Antagonista de heparina",
    "mecanismoAccion": "Proteína catiónica derivada del esperma de salmón que forma complejo estable iónico con la heparina (polianión), neutralizando completamente su actividad anticoagulante. Neutraliza parcialmente HBPM (~60% de actividad anti-Xa).",
    "indicaciones": ["Reversión de heparina no fraccionada (sobredosis o pre-cirugía)", "Reversión parcial de HBPM", "Post-circulación extracorpórea", "Hemorragia por sobredosis de heparina"],
    "contraindicaciones": ["Hipersensibilidad a protamina o pescado", "Alergia al salmón (precaución)", "Vasectomizados con anticuerpos anti-protamina (precaución)"],
    "efectosAdversos": ["Hipotensión (infusión rápida)", "Bradicardia", "Disnea", "Anafilaxia", "Hipertensión pulmonar", "Efecto rebote de heparina (4-6h después)"],
    "interacciones": ["Heparina: neutralización 1 mg protamina por cada 100 UI de heparina", "HBPM: neutralización parcial (~60% anti-Xa)"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "1 mg por cada 100 UI de heparina administrada en últimas 2-3h. Máx 50 mg por dosis. IV lento en 10 min (máx 5 mg/min). Para HBPM: 1 mg por cada 1 mg de enoxaparina (últimas 8h)"
    },
    "presentaciones": ["Ampolla 50 mg/5 mL (10 mg/mL)"],
    "embarazo": "C",
    "lactancia": "Se desconoce excreción. Uso solo si beneficio supera riesgo.",
    "cuidadosEnfermeria": [
      "Administrar IV LENTO (máx 5 mg/min) para evitar hipotensión",
      "Tener equipo de reanimación disponible (riesgo anafilaxia)",
      "Monitorizar aPTT 5-15 min después de la administración",
      "Precaución en alérgicos al pescado o pacientes diabéticos con insulina NPH (contiene protamina)",
      "Vigilar efecto rebote de heparina 4-6h post-administración",
      "El exceso de protamina tiene efecto anticoagulante propio"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata",
      "distribucion": "Se une a heparina en sangre",
      "metabolismo": "Degradación enzimática del complejo heparina-protamina",
      "excrecion": "No bien definida",
      "vidaMedia": "7 minutos",
      "inicioAccion": "Inmediato (1-5 minutos)",
      "picoAccion": "5 minutos",
      "duracionAccion": "2 horas (vida media de heparina puede excederla)"
    },
    "almacenamiento": "Refrigerar 2-8°C. No congelar.",
    "unidadId": "u10",
    "capituloId": "c10_01"
  },
  {
    "id": "alteplasa",
    "nombre": "Alteplasa (rt-PA)",
    "nombreGenerico": "Alteplasa (activador tisular del plasminógeno recombinante)",
    "nombresComerciales": ["Actilyse", "Activase"],
    "familia": "Trombolíticos",
    "clasificacion": "Activador tisular del plasminógeno recombinante",
    "mecanismoAccion": "Serina proteasa que se une a la fibrina del trombo y convierte selectivamente el plasminógeno unido al trombo en plasmina, produciendo fibrinólisis localizada. Afinidad preferente por fibrina (fibrinoespecífico) vs fibrinolíticos de primera generación.",
    "indicaciones": ["ACV isquémico agudo (ventana 4.5h)", "IAM con elevación ST (si no disponible ICP)", "TEP masivo con inestabilidad hemodinámica", "Trombosis de catéter venoso central"],
    "contraindicaciones": ["Hemorragia activa", "ACV hemorrágico previo", "Cirugía mayor o trauma <14 días", "Neoplasia intracraneal", "Hipertensión severa no controlada (>185/110)", "Plaquetas <100.000", "INR >1.7 o aPTT prolongado"],
    "efectosAdversos": ["Hemorragia (principal riesgo)", "Hemorragia intracraneal (6-7% en ACV)", "Sangrado en sitios de punción", "Arritmias de reperfusión", "Angioedema orolingual (raro)", "Hipotensión"],
    "interacciones": ["Anticoagulantes, antiagregantes: aumento de riesgo hemorrágico", "Heparina: se administra después según protocolo (no simultáneamente en ACV)"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "ACV isquémico: 0.9 mg/kg (máx 90 mg), 10% en bolo en 1 min + 90% en infusión 60 min. IAM: 15 mg bolo + 50 mg en 30 min + 35 mg en 60 min (total 100 mg). TEP masivo: 100 mg en 2h"
    },
    "presentaciones": ["Vial 50 mg + solvente", "Vial 20 mg + solvente"],
    "embarazo": "C",
    "lactancia": "Se desconoce excreción. No recomendado.",
    "cuidadosEnfermeria": [
      "VENTANA TERAPÉUTICA ESTRICTA: ACV <4.5h desde inicio síntomas",
      "Controlar PA: mantener <185/110 antes y durante, <180/105 post-trombólisis",
      "NO administrar anticoagulantes/antiplaquetarios durante 24h post-trombólisis en ACV",
      "TC sin contraste OBLIGATORIA antes de administrar (descartar hemorragia)",
      "Monitorización neurológica cada 15 min (escala NIHSS)",
      "Evitar punciones arteriales, sondaje vesical y SNG durante las primeras horas",
      "Reconstituir con agua estéril, NO agitar (rotar suavemente)"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata",
      "distribucion": "Rápidamente depurada del plasma",
      "metabolismo": "Hepático (rápido)",
      "excrecion": "Hepática",
      "vidaMedia": "4-5 minutos (vida media alfa), 40 min (funcional)",
      "inicioAccion": "Inmediato (inicio de fibrinólisis)",
      "picoAccion": "Durante infusión",
      "duracionAccion": "Efecto fibrinolítico persiste horas"
    },
    "almacenamiento": "Refrigerar 2-8°C o temperatura ambiente hasta 25°C. Reconstituida: usar en 8h.",
    "unidadId": "u10",
    "capituloId": "c10_01"
  },
  {
    "id": "darbepoetina",
    "nombre": "Darbepoetina Alfa",
    "nombreGenerico": "Darbepoetina alfa",
    "nombresComerciales": ["Aranesp", "Darbepoetina Biosidus"],
    "familia": "Estimulantes de eritropoyesis",
    "clasificacion": "Eritropoyetina de acción prolongada (hiperglicosilada)",
    "mecanismoAccion": "Análogo hiperglicosilado de eritropoyetina humana con dos cadenas de carbohidratos adicionales. Estimula la proliferación y diferenciación de progenitores eritroides en médula ósea, aumentando la producción de glóbulos rojos. Vida media 3 veces mayor que EPO.",
    "indicaciones": ["Anemia por enfermedad renal crónica (prediálisis y diálisis)", "Anemia por quimioterapia (tumores sólidos, linfomas)", "Síndromes mielodisplásicos (seleccionados)"],
    "contraindicaciones": ["Hipertensión no controlada", "Hipersensibilidad", "Aplasia pura de serie roja por anti-EPO", "Hb >12 g/dL (no iniciar)"],
    "efectosAdversos": ["Hipertensión", "Cefalea", "Artralgia", "Eventos tromboembólicos (TVP, ACV, IAM)", "Aplasia pura de serie roja (rara)", "Progresión tumoral (controversial)"],
    "interacciones": ["Hierro: administrar suplemento para respuesta óptima", "Antihipertensivos: puede requerir ajuste por aumento de PA"],
    "viaAdministracion": ["SC", "IV"],
    "dosis": {
      "adulto": "ERC: 0.45 mcg/kg SC/IV cada semana o 0.75 mcg/kg cada 2 semanas. Quimioterapia: 2.25 mcg/kg SC/semana o 500 mcg cada 3 semanas. Titular según Hb (objetivo 10-12 g/dL)",
      "ajusteRenal": "No requiere ajuste de dosis, pero ajustar según respuesta de Hb"
    },
    "presentaciones": ["Jeringa prellenada 10, 20, 30, 40, 60, 100, 150, 300, 500 mcg"],
    "embarazo": "C",
    "lactancia": "Se desconoce excreción. Uso con precaución.",
    "cuidadosEnfermeria": [
      "Objetivo Hb: 10-12 g/dL. NO superar 12 g/dL (riesgo cardiovascular)",
      "Asegurar depósitos de hierro adecuados antes y durante tratamiento (ferritina >100, IST >20%)",
      "Control semanal de Hb al inicio, luego mensual",
      "Monitorizar PA (frecuente hipertensión al subir Hb)",
      "Ventaja vs EPO: administración cada 1-2 semanas (vs 3/semana)",
      "Rotar sitios de inyección SC"
    ],
    "farmacocinetica": {
      "absorcion": "SC biodisponibilidad 37%",
      "distribucion": "Principalmente intravascular",
      "metabolismo": "Degradación proteolítica",
      "excrecion": "Renal mínima",
      "vidaMedia": "SC: 49 horas. IV: 21 horas (3x mayor que EPO)",
      "inicioAccion": "Aumento de reticulocitos en 7-10 días",
      "picoAccion": "SC: 34-58 horas",
      "duracionAccion": "1-2 semanas"
    },
    "almacenamiento": "Refrigerar 2-8°C. No congelar. No agitar.",
    "unidadId": "u10",
    "capituloId": "c10_02"
  },
  {
    "id": "acido_aminocaproico",
    "nombre": "Ácido Aminocaproico",
    "nombreGenerico": "Ácido épsilon-aminocaproico",
    "nombresComerciales": ["Ipsilon", "Amicar"],
    "familia": "Hemostáticos",
    "clasificacion": "Antifibrinolítico",
    "mecanismoAccion": "Análogo de lisina que inhibe competitivamente la activación de plasminógeno a plasmina. Bloquea la unión del plasminógeno y la plasmina a la fibrina, previniendo la fibrinólisis y estabilizando el coágulo formado.",
    "indicaciones": ["Hemorragia por hiperfibrinólisis", "Profilaxis de sangrado en cirugía cardíaca", "Hemorragia post-trombólisis", "Sangrado dental en pacientes anticoagulados", "Angioedema hereditario (off-label)"],
    "contraindicaciones": ["CID activa (sin heparina concomitante)", "Hematuria de origen renal superior", "Trombosis activa o riesgo trombótico alto"],
    "efectosAdversos": ["Náuseas y vómitos", "Diarrea", "Hipotensión (IV rápida)", "Miopatía (uso prolongado)", "Trombosis", "Rabdomiólisis (rara, dosis altas prolongadas)"],
    "interacciones": ["Concentrados de complejo protrombínico: riesgo trombótico aditivo", "Factor IX: no administrar simultáneamente", "Anticoagulantes: efecto antagonista"],
    "viaAdministracion": ["oral", "IV"],
    "dosis": {
      "adulto": "IV: carga 4-5 g en 1h, luego 1 g/h en infusión continua (máx 30 g/día). Oral: 2-4 g cada 4-6h. Dental: enjuague con solución al 25% cada 6h"
    },
    "presentaciones": ["Comprimidos 500 mg", "Ampolla 5 g/20 mL", "Jarabe 250 mg/mL"],
    "embarazo": "C",
    "lactancia": "Se desconoce excreción. Uso con precaución.",
    "cuidadosEnfermeria": [
      "Infusión IV lenta (máx 1 g en 10 min) para evitar hipotensión",
      "Monitorizar CPK si uso >5 días (riesgo de miopatía)",
      "Contraindicado en hematuria del tracto superior (riesgo de obstrucción por coágulos)",
      "Vigilar signos de trombosis durante tratamiento",
      "Diferenciar de ácido tranexámico (éste es 10x menos potente)",
      "Control de función renal durante tratamiento"
    ],
    "farmacocinetica": {
      "absorcion": "Oral rápida y completa",
      "distribucion": "Amplia, penetra espacio extracelular",
      "metabolismo": "Mínimo",
      "excrecion": "Renal 65% inalterado en 12h",
      "vidaMedia": "2 horas",
      "inicioAccion": "IV: inmediato. Oral: 1-2 horas",
      "picoAccion": "Oral: 2 horas",
      "duracionAccion": "3-4 horas (requiere dosificación frecuente)"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u10",
    "capituloId": "c10_02"
  },
  {
    "id": "complejo_protrombinico",
    "nombre": "Complejo Protrombínico",
    "nombreGenerico": "Complejo de protrombina humana (factores II, VII, IX, X)",
    "nombresComerciales": ["Beriplex", "Octaplex", "Kcentra"],
    "familia": "Hemostáticos",
    "clasificacion": "Concentrado de factores de coagulación dependientes de vitamina K",
    "mecanismoAccion": "Aporta factores de coagulación II (protrombina), VII, IX y X, más proteínas C y S. Revierte rápidamente el efecto de antagonistas de vitamina K al restaurar los factores de coagulación deplecidos.",
    "indicaciones": ["Reversión urgente de antagonistas de vitamina K (warfarina, acenocumarol)", "Hemorragia grave en pacientes con AVK", "Cirugía urgente en pacientes anticoagulados con AVK", "Deficiencias congénitas de factores cuando no hay concentrado específico"],
    "contraindicaciones": ["CID", "Trombocitopenia inducida por heparina (contiene heparina algunos)", "Hipersensibilidad"],
    "efectosAdversos": ["Tromboembolismo (TEP, TVP, IAM, ACV)", "CID", "Reacciones alérgicas", "Cefalea", "Transmisión teórica de agentes infecciosos"],
    "interacciones": ["Antagonistas de vitamina K: antagonismo (es el objetivo terapéutico)", "Anticoagulantes: ajustar dosis según INR objetivo"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "Según INR inicial y peso: INR 2-4: 25 UI/kg, INR 4-6: 35 UI/kg, INR >6: 50 UI/kg. Máx 5000 UI. Infusión lenta (2-3 mL/min)"
    },
    "presentaciones": ["Vial liofilizado 500 UI + solvente", "Vial liofilizado 1000 UI + solvente"],
    "embarazo": "C",
    "lactancia": "Se desconoce seguridad. Uso solo en emergencia.",
    "cuidadosEnfermeria": [
      "Administrar junto con vitamina K IV para efecto sostenido (CCP corrige rápido pero transitorio)",
      "Reconstituir según instrucciones (no agitar, disolver suavemente)",
      "Controlar INR a los 30 min post-infusión y cada 6-12h",
      "Vigilar signos de tromboembolismo durante y post-administración",
      "Infusión IV lenta (velocidad según producto, generalmente 2-3 mL/min)",
      "Ventaja vs PFC: menor volumen, más rápido, sin tipificación sanguínea"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata",
      "distribucion": "Intravascular",
      "metabolismo": "Catabolismo normal de factores de coagulación",
      "excrecion": "No aplica",
      "vidaMedia": "Factor VII: 6h, Factor IX: 24h, Factor X: 30h, Factor II: 60h",
      "inicioAccion": "10-30 minutos (corrección de INR)",
      "picoAccion": "30 minutos",
      "duracionAccion": "6-72 horas (variable según factor)"
    },
    "almacenamiento": "Refrigerar 2-8°C. Reconstituido: usar inmediatamente (máx 3h).",
    "unidadId": "u10",
    "capituloId": "c10_02"
  },
  {
    "id": "hierro_carboximaltosa",
    "nombre": "Hierro Carboximaltosa",
    "nombreGenerico": "Carboximaltosa férrica",
    "nombresComerciales": ["Ferinject", "Injectafer"],
    "familia": "Antianémicos parenterales",
    "clasificacion": "Hierro IV de nueva generación",
    "mecanismoAccion": "Complejo coloidal de hierro férrico (Fe3+) con carboximaltosa como envoltura de carbohidrato. Permite administración de altas dosis de hierro IV en infusión rápida. El hierro es captado por el sistema reticuloendotelial y transferido a transferrina para eritropoyesis.",
    "indicaciones": ["Anemia ferropénica cuando hierro oral no es tolerado/eficaz", "Anemia en enfermedad renal crónica", "Anemia en insuficiencia cardíaca", "Anemia en enfermedad inflamatoria intestinal", "Anemia perioperatoria"],
    "contraindicaciones": ["Hipersensibilidad", "Sobrecarga de hierro (hemocromatosis)", "Anemia no ferropénica", "Primer trimestre de embarazo"],
    "efectosAdversos": ["Hipofosfatemia (frecuente, puede ser severa)", "Cefalea", "Náuseas", "Reacciones en sitio de inyección", "Erupción cutánea", "Hipotensión", "Anafilaxia (rara)"],
    "interacciones": ["Hierro oral: suspender al menos 5 días antes de hierro IV", "Dimercaprol: no combinar (complejo nefrotóxico)"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "Dosis según déficit calculado (fórmula de Ganzoni) o peso: <70 kg y Hb <10: 1000 mg; ≥70 kg y Hb <10: 1500 mg. Máx 1000 mg/infusión (15 mg/kg). Infusión en 15-30 min (diluido en SF)",
      "ajusteRenal": "No requiere ajuste. Seguro en ERC"
    },
    "presentaciones": ["Vial 500 mg/10 mL", "Vial 100 mg/2 mL"],
    "embarazo": "C",
    "lactancia": "Se excreta mínimamente en leche. Compatible.",
    "cuidadosEnfermeria": [
      "Infusión IV: diluir en 250 mL SF (100-200 mL mínimo), administrar en 15-30 min",
      "Observación post-infusión 30 min (riesgo de reacción anafiláctica)",
      "Controlar fósforo sérico (hipofosfatemia frecuente, puede requerir suplementación)",
      "No administrar IM (necrosis tisular) ni por vía SC",
      "Ventaja vs hierro dextrano: menor riesgo anafiláctico, dosis altas en una sesión",
      "Controlar ferritina y saturación de transferrina a las 4-8 semanas",
      "Si extravasación: riesgo de tinción cutánea permanente"
    ],
    "farmacocinetica": {
      "absorcion": "IV: 100% biodisponibilidad",
      "distribucion": "Captado por sistema reticuloendotelial (hígado, bazo, médula)",
      "metabolismo": "Liberación lenta de hierro desde el complejo al pool de transferrina",
      "excrecion": "El hierro no se excreta activamente. Pérdidas mínimas",
      "vidaMedia": "7-12 horas (complejo intacto)",
      "inicioAccion": "Aumento de reticulocitos en 5-7 días",
      "picoAccion": "Ferritina pico: 7-9 días post-infusión",
      "duracionAccion": "Semanas-meses (repleta depósitos)"
    },
    "almacenamiento": "Temperatura ambiente. No congelar. Proteger de la luz.",
    "unidadId": "u10",
    "capituloId": "c10_02"
  },
  {
    "id": "cianocobalamina",
    "nombre": "Cianocobalamina (Vitamina B12)",
    "nombreGenerico": "Cianocobalamina",
    "nombresComerciales": ["Optovite B12", "Cianocobalamina Elea", "Bagó B12"],
    "familia": "Antianémicos",
    "clasificacion": "Vitamina B12",
    "mecanismoAccion": "Coenzima esencial para la metionina sintasa (conversión de homocisteína a metionina) y la metilmalonil-CoA mutasa. Necesaria para la síntesis de ADN, maduración eritrocitaria normal y mantenimiento de la mielina del sistema nervioso.",
    "indicaciones": ["Anemia megaloblástica por déficit de B12", "Anemia perniciosa", "Neuropatía por déficit de B12", "Post-gastrectomía/resección ileal", "Deficiencia nutricional (veganos estrictos)"],
    "contraindicaciones": ["Hipersensibilidad", "Enfermedad de Leber (atrofia óptica hereditaria)"],
    "efectosAdversos": ["Dolor en sitio de inyección", "Diarrea transitoria", "Prurito", "Erupción cutánea", "Hipopotasemia transitoria (al inicio)", "Policitemia (sobredosis)"],
    "interacciones": ["Cloranfenicol: puede reducir respuesta hematológica a B12", "Colchicina, metformina, IBP: reducen absorción oral de B12", "Ácido fólico: corrige anemia megaloblástica pero no la neuropatía (no enmascarar déficit de B12)"],
    "viaAdministracion": ["IM", "SC", "oral"],
    "dosis": {
      "adulto": "Deficiencia severa/anemia perniciosa: 1000 mcg IM/día x 7 días, luego 1000 mcg/semana x 4 semanas, luego 1000 mcg/mes de por vida. Oral (deficiencia leve/suplementación): 1000-2000 mcg/día"
    },
    "presentaciones": ["Ampolla 1000 mcg/mL (1 mL)", "Comprimidos 500, 1000, 5000 mcg"],
    "embarazo": "A",
    "lactancia": "Compatible. Se excreta en leche, esencial para el lactante.",
    "cuidadosEnfermeria": [
      "En anemia perniciosa: tratamiento IM de por vida (no se absorbe oral por falta de FI)",
      "Controlar potasio al inicio del tratamiento (riesgo de hipopotasemia por captación celular)",
      "Solicitar reticulocitos a los 5-7 días (pico reticulocitario = respuesta)",
      "Hemograma completo basal y a las 8 semanas",
      "Evaluar neuropatía: el daño neurológico puede ser irreversible si tardío",
      "No administrar ácido fólico solo sin descartar déficit de B12"
    ],
    "farmacocinetica": {
      "absorcion": "IM: completa. Oral: requiere factor intrínseco (1-2% se absorbe por difusión pasiva a dosis altas)",
      "distribucion": "Unida a transcobalamina II. Depósito hepático (2-5 mg)",
      "metabolismo": "Conversión a metilcobalamina y adenosilcobalamina (formas activas)",
      "excrecion": "Renal (cantidad excesiva)",
      "vidaMedia": "6 días (plasmática). Depósitos hepáticos: 3-5 años",
      "inicioAccion": "Reticulocitosis en 3-5 días",
      "picoAccion": "IM: 1 hora",
      "duracionAccion": "Depósitos mantienen niveles por meses"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u10",
    "capituloId": "c10_03"
  },
  {
    "id": "deferoxamina",
    "nombre": "Deferoxamina",
    "nombreGenerico": "Mesilato de deferoxamina",
    "nombresComerciales": ["Desferal", "Deferoxamina Northia"],
    "familia": "Quelantes de hierro / Antídotos",
    "clasificacion": "Quelante de hierro",
    "mecanismoAccion": "Sideróforo que se une específicamente al hierro férrico (Fe3+) libre y al hierro de ferritina y hemosiderina, formando ferrioxamina (complejo hidrosoluble no tóxico), que se excreta por riñón (orina color rojizo) y bilis.",
    "indicaciones": ["Intoxicación aguda por hierro", "Sobrecarga crónica de hierro (transfusiones múltiples)", "Hemocromatosis secundaria (talasemia mayor, mielodisplasia)", "Prueba diagnóstica de sobrecarga de hierro"],
    "contraindicaciones": ["Insuficiencia renal severa (anuria)", "Hipersensibilidad"],
    "efectosAdversos": ["Dolor e induración en sitio de infusión SC", "Orina rojiza (normal)", "Hipotensión (IV rápida)", "Reacciones alérgicas", "Toxicidad visual y auditiva (uso prolongado)", "Infecciones por Yersinia y Mucor (uso crónico)"],
    "interacciones": ["Vitamina C: 200 mg/día aumenta excreción de hierro (solo después de 1 mes de quelación)", "Proclorperazina: mayor riesgo de pérdida de conciencia"],
    "viaAdministracion": ["SC", "IM", "IV"],
    "dosis": {
      "adulto": "Intoxicación aguda: 15 mg/kg/h IV (máx 80 mg/kg/día o 6 g/día). Crónica: 20-60 mg/kg/día SC en infusión 8-12h (bomba portátil) 5-7 noches/semana",
      "pediatrico": "Similar al adulto ajustado por peso. No exceder 40 mg/kg/día en niños <3 años"
    },
    "presentaciones": ["Vial liofilizado 500 mg", "Vial liofilizado 2 g"],
    "embarazo": "C",
    "lactancia": "Se desconoce excreción. No recomendado.",
    "cuidadosEnfermeria": [
      "En intoxicación aguda: infusión IV continua (NO bolo directo)",
      "Orina rosada-rojiza indica quelación efectiva (informar al paciente)",
      "SC crónica: bomba portátil 8-12h/noche, rotar sitios (abdomen, muslos)",
      "Examen oftalmológico y audiometría cada 6-12 meses (toxicidad sensorial)",
      "No exceder velocidad de infusión IV recomendada (hipotensión)",
      "Controlar ferritina sérica cada 3 meses para ajustar dosis"
    ],
    "farmacocinetica": {
      "absorcion": "No se absorbe oral. SC/IM: buena absorción",
      "distribucion": "Amplia, se une al hierro libre y de depósitos",
      "metabolismo": "Plasmático y hepático, formando ferrioxamina",
      "excrecion": "Renal (33% ferrioxamina) y fecal (biliar)",
      "vidaMedia": "20-30 minutos (rápida). Ferrioxamina: 5.5 horas",
      "inicioAccion": "Quelación inmediata",
      "picoAccion": "Excreción máxima urinaria: 4-6 horas post-inicio",
      "duracionAccion": "Durante infusión"
    },
    "almacenamiento": "Temperatura ambiente. Reconstituido: usar en 24h.",
    "unidadId": "u10",
    "capituloId": "c10_03"
  },
  {
    "id": "hidroxiurea",
    "nombre": "Hidroxiurea",
    "nombreGenerico": "Hidroxiurea (Hidroxicarbamida)",
    "nombresComerciales": ["Hydrea", "Droxia", "Hidroxiurea Varifarma"],
    "familia": "Antianémicos / Citorreductores",
    "clasificacion": "Inhibidor de la ribonucleótido reductasa",
    "mecanismoAccion": "Inhibe la enzima ribonucleótido reductasa, bloqueando la conversión de ribonucleótidos a desoxirribonucleótidos y la síntesis de ADN. En anemia falciforme, aumenta la producción de hemoglobina fetal (HbF) que inhibe la polimerización de HbS.",
    "indicaciones": ["Anemia de células falciformes (reducción de crisis vasooclusivas)", "Leucemia mieloide crónica", "Policitemia vera", "Trombocitemia esencial", "Síndromes mieloproliferativos"],
    "contraindicaciones": ["Mielosupresión severa", "Embarazo y lactancia", "Insuficiencia renal severa", "Hipersensibilidad"],
    "efectosAdversos": ["Mielosupresión (leucopenia, trombocitopenia, anemia)", "Macrocitosis (esperada)", "Náuseas", "Úlceras cutáneas (uso prolongado)", "Melanoniquia", "Carcinogenicidad teórica"],
    "interacciones": ["Otros mielosupresores: toxicidad hematológica aditiva", "Antiretrovirales (didanosina, estavudina): mayor riesgo de neuropatía/pancreatitis", "Vacunas vivas: contraindicadas"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Falciforme: inicio 15 mg/kg/día, titular cada 12 semanas según respuesta (máx 35 mg/kg/día). Mieloproliferativo: 15-30 mg/kg/día. Redondear a cápsula más cercana"
    },
    "presentaciones": ["Cápsulas 500 mg"],
    "embarazo": "D",
    "lactancia": "Contraindicada. Se excreta en leche.",
    "cuidadosEnfermeria": [
      "Hemograma OBLIGATORIO cada 2 semanas al inicio, luego mensual",
      "Suspender si neutrófilos <2000 o plaquetas <80.000",
      "Manipular con guantes (citotóxico): no abrir cápsulas",
      "Anticoncepción eficaz obligatoria (hombres y mujeres)",
      "En falciforme: efecto terapéutico pleno en 3-6 meses (aumento de HbF)",
      "Hidratación adecuada durante tratamiento",
      "Monitorizar función renal y hepática mensualmente"
    ],
    "farmacocinetica": {
      "absorcion": "Oral rápida y casi completa",
      "distribucion": "Amplia, cruza BHE. Volumen distribución similar al agua corporal",
      "metabolismo": "Hepático parcial",
      "excrecion": "Renal 80% (40% inalterada)",
      "vidaMedia": "3-4 horas",
      "inicioAccion": "Mielosupresor: días. HbF en falciforme: semanas-meses",
      "picoAccion": "1-4 horas",
      "duracionAccion": "24 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de humedad.",
    "unidadId": "u10",
    "capituloId": "c10_03"
  },
  {
    "id": "acido_folico_hematologico",
    "nombre": "Ácido Fólico (Dosis Hematológica)",
    "nombreGenerico": "Ácido fólico (Vitamina B9)",
    "nombresComerciales": ["Acfol", "Ácido Fólico Bagó", "Folacín"],
    "familia": "Antianémicos",
    "clasificacion": "Vitamina B9 (folato)",
    "mecanismoAccion": "Se reduce a tetrahidrofolato (THF), coenzima esencial en la transferencia de unidades de un carbono en la síntesis de purinas y timidilato (ADN). Su deficiencia produce eritropoyesis megaloblástica por alteración en la síntesis de ADN.",
    "indicaciones": ["Anemia megaloblástica por déficit de folato", "Profilaxis en embarazo (defectos del tubo neural)", "Suplementación en anemia hemolítica crónica (mayor demanda)", "Deficiencia por fármacos antifolato (metotrexato, fenitoína)", "Suplemento en diálisis"],
    "contraindicaciones": ["Anemia perniciosa no tratada con B12 (no usar folato solo)", "Tumores dependientes de folato"],
    "efectosAdversos": ["Muy raros: reacciones alérgicas", "Irritabilidad (dosis altas)", "Puede enmascarar déficit de B12 (corrige anemia pero no neuropatía)"],
    "interacciones": ["Metotrexato: antagonismo (leucovorina es el rescate, no ácido fólico)", "Fenitoína, fenobarbital: reducen absorción de folato", "Sulfasalazina: reduce absorción", "Trimetoprima: antagonismo antifolato"],
    "viaAdministracion": ["oral", "IM", "IV"],
    "dosis": {
      "adulto": "Deficiencia: 1-5 mg/día VO durante 1-4 meses. Profilaxis embarazo: 0.4-4 mg/día (4 mg si antecedente de DTN). Hemólisis crónica: 5 mg/día",
      "pediatrico": "0.1-0.4 mg/día según edad"
    },
    "presentaciones": ["Comprimidos 1, 5 mg", "Ampolla 5 mg/mL (uso IM/IV)"],
    "embarazo": "A",
    "lactancia": "Compatible. Esencial durante lactancia.",
    "cuidadosEnfermeria": [
      "SIEMPRE descartar déficit de B12 antes de tratar con folato solo",
      "Si se administra solo folato en déficit de B12: la anemia mejora pero la neuropatía progresa",
      "Reticulocitosis esperada a los 5-7 días de inicio",
      "Hemograma control a las 8 semanas",
      "En embarazo: idealmente iniciar 1-3 meses pre-concepción",
      "Diferenciar leucovorina (ácido folínico) del ácido fólico en rescate de MTX"
    ],
    "farmacocinetica": {
      "absorcion": "Oral rápida, biodisponibilidad 100% (superior a folatos dietarios)",
      "distribucion": "Se concentra en hígado. Depósitos: 5-20 mg. Unión proteica 60-70%",
      "metabolismo": "Hepático: reducción a THF por dihidrofolato reductasa",
      "excrecion": "Renal (exceso sobre necesidades)",
      "vidaMedia": "Eliminación bifásica. Depósitos: 3-6 meses",
      "inicioAccion": "Reticulocitosis en 3-5 días",
      "picoAccion": "Oral: 1 hora",
      "duracionAccion": "Depósitos mantienen niveles semanas-meses"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u10",
    "capituloId": "c10_03"
  }
]

# New chapters to create for u10
NEW_CHAPTERS = [
    {
        "id": "c10_03",
        "nombre": "Antianémicos",
        "unidadId": "u10",
        "drugIds": ["cianocobalamina", "acido_folico_hematologico", "deferoxamina", "hidroxiurea"]
    }
]

# Drugs to add to EXISTING chapters
EXISTING_CHAPTER_ADDITIONS = {
    "c10_01": ["apixaban", "fondaparinux", "acenocumarol", "protamina", "alteplasa"],
    "c10_02": ["darbepoetina", "acido_aminocaproico", "complejo_protrombinico", "hierro_carboximaltosa"],
}

# Pathology links
PATHOLOGY_LINKS = {
    "pat_tvp": ["apixaban", "fondaparinux", "acenocumarol", "alteplasa"],
    "pat_tep": ["apixaban", "fondaparinux", "alteplasa", "acenocumarol"],
    "pat_cid": ["complejo_protrombinico", "acido_aminocaproico"],
    "pat_anemia_ferropenica": ["hierro_carboximaltosa", "cianocobalamina", "acido_folico_hematologico"],
    "pat_iam": ["alteplasa", "apixaban"],
}

def main():
    print("=== Generating u10 drugs ===")
    added = add_drugs_to_file(NEW_DRUGS)

    cats = load_categories()
    for ch in NEW_CHAPTERS:
        add_chapter(cats, "u10", ch)
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
