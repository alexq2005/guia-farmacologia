#!/usr/bin/env python3
"""Generate new drugs for u07 - Sistema Reproductor y Óseo (10→35)."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from drug_helper import *

NEW_DRUGS = [
  {
    "id": "labetalol",
    "nombre": "Labetalol",
    "nombreGenerico": "Clorhidrato de labetalol",
    "nombresComerciales": ["Trandate", "Labetalol Northia"],
    "familia": "Antihipertensivos en obstetricia",
    "clasificacion": "Bloqueante alfa y beta adrenérgico",
    "mecanismoAccion": "Bloquea receptores alfa-1 (vasodilatación) y beta-1/beta-2 (reduce FC y contractilidad). Relación beta:alfa 7:1 oral, 3:1 IV. Reduce resistencia vascular periférica sin comprometer flujo uteroplacentario.",
    "indicaciones": ["Hipertensión en embarazo", "Preeclampsia", "Crisis hipertensiva en embarazo", "Hipertensión crónica en gestante"],
    "contraindicaciones": ["Asma bronquial", "Bloqueo AV 2do-3er grado", "Bradicardia severa", "Shock cardiogénico", "Feocromocitoma no tratado"],
    "efectosAdversos": ["Hipotensión ortostática", "Bradicardia", "Mareo", "Fatiga", "Náuseas", "Broncoespasmo", "Bradicardia neonatal"],
    "interacciones": ["Calcioantagonistas: bradicardia aditiva", "Insulina: enmascara hipoglucemia", "Halotano: hipotensión severa", "Cimetidina: aumenta biodisponibilidad"],
    "viaAdministracion": ["oral", "IV"],
    "dosis": {
      "adulto": "Oral: 100 mg/12h, titular hasta 400 mg/12h. IV crisis: bolos de 20 mg, luego 40-80 mg cada 10 min (máx 300 mg) o infusión 1-2 mg/min",
      "ajusteRenal": "No requiere ajuste significativo",
      "ajusteHepatico": "Reducir dosis. Metabolismo hepático extenso"
    },
    "presentaciones": ["Comprimidos 100, 200 mg", "Ampolla 100 mg/20 mL (5 mg/mL)"],
    "embarazo": "C",
    "lactancia": "Se excreta en leche en pequeñas cantidades. Usar con precaución.",
    "cuidadosEnfermeria": [
      "En IV: mantener paciente en decúbito durante y 3h post-infusión",
      "Monitorizar PA cada 5 min durante infusión IV",
      "Controlar FCF (frecuencia cardíaca fetal) durante administración",
      "No suspender abruptamente (efecto rebote)",
      "Vigilar bradicardia neonatal post-parto",
      "Compatibilidad IV: SF, Ringer Lactato"
    ],
    "farmacocinetica": {
      "absorcion": "Oral completa pero biodisponibilidad 25% (primer paso hepático)",
      "distribucion": "Cruza barrera placentaria. Unión proteica 50%",
      "metabolismo": "Hepático por conjugación",
      "excrecion": "Renal 55-60%, fecal",
      "vidaMedia": "6-8 horas",
      "inicioAccion": "Oral 20 min-2h, IV 2-5 min",
      "picoAccion": "Oral 1-4h, IV 5-15 min",
      "duracionAccion": "Oral 8-12h, IV 2-4h"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u07",
    "capituloId": "c07_04"
  },
  {
    "id": "sulfato_magnesio_obstetrico",
    "nombre": "Sulfato de Magnesio (Obstétrico)",
    "nombreGenerico": "Sulfato de magnesio heptahidratado",
    "nombresComerciales": ["Sulfato de Magnesio Northia", "MgSO4"],
    "familia": "Anticonvulsivantes en obstetricia",
    "clasificacion": "Estabilizador de membrana / tocolítico",
    "mecanismoAccion": "Antagonista fisiológico del calcio. Reduce la excitabilidad neuronal bloqueando receptores NMDA, disminuye la liberación de acetilcolina en la unión neuromuscular y produce vasodilatación cerebral. En útero, reduce la contractilidad miometrial.",
    "indicaciones": ["Prevención y tratamiento de convulsiones en eclampsia", "Preeclampsia severa (neuroprotección)", "Neuroprotección fetal <32 semanas", "Tocolisis (segunda línea)"],
    "contraindicaciones": ["Miastenia gravis", "Bloqueo cardíaco", "Insuficiencia renal severa (CrCl <20)", "Hipocalcemia severa"],
    "efectosAdversos": ["Rubor facial", "Sensación de calor", "Náuseas", "Hipotensión", "Depresión respiratoria (toxicidad)", "Arreflexia (toxicidad)", "Paro cardíaco (sobredosis)"],
    "interacciones": ["Bloqueantes neuromusculares: potenciación extrema", "Nifedipino: hipotensión y bloqueo neuromuscular", "Calcioantagonistas: evitar combinación", "Aminoglucósidos: potencia bloqueo neuromuscular"],
    "viaAdministracion": ["IV", "IM"],
    "dosis": {
      "adulto": "Eclampsia esquema Zuspan: carga 4-6 g IV en 15-20 min, mantenimiento 1-2 g/h en infusión continua. IM: 10 g (5 g en cada glúteo) carga, luego 5 g/4h",
      "ajusteRenal": "CrCl <30: reducir infusión a 0.5-1 g/h. Monitorizar magnesemia"
    },
    "presentaciones": ["Ampolla 25% (5 mL = 1.25 g)", "Ampolla 50% (10 mL = 5 g)"],
    "embarazo": "B",
    "lactancia": "Compatible. Se excreta en leche pero pobre absorción oral neonatal.",
    "cuidadosEnfermeria": [
      "MONITOREO OBLIGATORIO cada 1h: reflejos rotulianos, FR, diuresis",
      "Suspender si: FR <12/min, ROT abolidos, diuresis <30 mL/h",
      "ANTÍDOTO: gluconato de calcio 1 g IV lento (tener siempre disponible)",
      "Magnesemia terapéutica: 4-7 mEq/L. >7 = pérdida de reflejos. >10 = paro respiratorio",
      "Mantener sonda vesical para control estricto de diuresis",
      "Continuar 24h postparto o post-última convulsión",
      "No administrar con calcioantagonistas simultáneamente"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata. IM: absorción completa",
      "distribucion": "Cruza placenta. Niveles fetales = niveles maternos",
      "metabolismo": "No se metaboliza",
      "excrecion": "Renal 100%",
      "vidaMedia": "4 horas (función renal normal)",
      "inicioAccion": "IV inmediato, IM 60 min",
      "picoAccion": "IV 30 min, IM 4h",
      "duracionAccion": "30 min post-suspensión IV"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u07",
    "capituloId": "c07_04"
  },
  {
    "id": "nifedipino_obstetrico",
    "nombre": "Nifedipino (Uso Obstétrico)",
    "nombreGenerico": "Nifedipino",
    "nombresComerciales": ["Adalat", "Adalat Oros", "Nifedipino Gador"],
    "familia": "Tocolíticos / Antihipertensivos en obstetricia",
    "clasificacion": "Calcioantagonista dihidropiridínico",
    "mecanismoAccion": "Bloquea canales de calcio tipo L en músculo liso vascular y miometrial. Produce vasodilatación arteriolar y relajación uterina al impedir la entrada de calcio necesaria para la contracción.",
    "indicaciones": ["Tocólisis (amenaza de parto prematuro)", "Hipertensión en embarazo", "Preeclampsia (control de PA)"],
    "contraindicaciones": ["Estenosis aórtica severa", "Hipotensión (<90/60 mmHg)", "Uso concomitante con sulfato de magnesio IV (riesgo de colapso)", "Taquicardia materna >120 lpm"],
    "efectosAdversos": ["Cefalea", "Rubor facial", "Taquicardia refleja", "Hipotensión", "Mareo", "Edema periférico", "Náuseas"],
    "interacciones": ["Sulfato de magnesio: hipotensión severa y bloqueo neuromuscular (EVITAR)", "Betabloqueantes: bradicardia e hipotensión", "Rifampicina: reduce efecto"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Tocólisis: 20 mg VO, repetir 20 mg a los 30 min si persisten contracciones (máx 60 mg en 1ra hora), luego 20 mg/6-8h. HTA: 10-20 mg/8h"
    },
    "presentaciones": ["Comprimidos 10, 20 mg", "Comprimidos liberación prolongada 30, 60 mg (Oros)"],
    "embarazo": "C",
    "lactancia": "Se excreta en leche. Compatible en dosis habituales.",
    "cuidadosEnfermeria": [
      "NO usar vía sublingual (hipotensión impredecible)",
      "Controlar PA cada 15 min en primera hora de tocólisis",
      "Monitorizar FCF continuamente durante tocólisis",
      "NO combinar con sulfato de magnesio IV",
      "Registrar actividad uterina (frecuencia, duración, intensidad)",
      "Hidratación IV concomitante para prevenir hipotensión"
    ],
    "farmacocinetica": {
      "absorcion": "Oral rápida, biodisponibilidad 45-70%",
      "distribucion": "Unión proteica 92-98%. Cruza placenta",
      "metabolismo": "Hepático CYP3A4",
      "excrecion": "Renal 80% como metabolitos",
      "vidaMedia": "2-5 horas",
      "inicioAccion": "20 minutos oral",
      "picoAccion": "30-60 minutos",
      "duracionAccion": "6-8 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u07",
    "capituloId": "c07_04"
  },
  {
    "id": "metildopa_obstetrico",
    "nombre": "Metildopa (Uso Obstétrico)",
    "nombreGenerico": "Alfa-metildopa",
    "nombresComerciales": ["Aldomet", "Metildopa Denver Farma"],
    "familia": "Antihipertensivos en obstetricia",
    "clasificacion": "Agonista alfa-2 central",
    "mecanismoAccion": "Se convierte en alfa-metilnoradrenalina en el SNC, que estimula receptores alfa-2 presinápticos centrales, reduciendo el tono simpático. Disminuye resistencia vascular periférica sin afectar flujo uteroplacentario.",
    "indicaciones": ["Hipertensión crónica en embarazo (1ra línea)", "Preeclampsia leve", "HTA gestacional"],
    "contraindicaciones": ["Hepatopatía activa", "Feocromocitoma", "Depresión severa", "Anemia hemolítica activa"],
    "efectosAdversos": ["Somnolencia", "Sequedad bucal", "Depresión", "Hepatitis (rara)", "Anemia hemolítica (Coombs +)", "Hipotensión ortostática", "Congestión nasal"],
    "interacciones": ["IMAO: crisis hipertensiva", "Hierro oral: reduce absorción de metildopa", "Litio: aumenta toxicidad de litio", "Levodopa: antagonismo"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "250 mg/8-12h inicio. Titular hasta 500 mg/8h. Máx: 3 g/día"
    },
    "presentaciones": ["Comprimidos 250, 500 mg"],
    "embarazo": "B",
    "lactancia": "Se excreta en leche. Compatible con lactancia.",
    "cuidadosEnfermeria": [
      "Fármaco de primera elección en HTA crónica en embarazo",
      "Control de PA cada 4h en inicio de tratamiento",
      "Solicitar Coombs directo basal y periódico",
      "Controlar hepatograma mensual",
      "Educar que produce somnolencia (especialmente primeros días)",
      "No suspender abruptamente"
    ],
    "farmacocinetica": {
      "absorcion": "Oral variable, biodisponibilidad 25-50%",
      "distribucion": "Cruza barrera placentaria y BHE",
      "metabolismo": "Hepático y en SNC a alfa-metilnoradrenalina",
      "excrecion": "Renal 70%",
      "vidaMedia": "1.5-2 horas (efecto dura más por mecanismo central)",
      "inicioAccion": "4-6 horas",
      "picoAccion": "6-8 horas",
      "duracionAccion": "12-24 horas"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u07",
    "capituloId": "c07_04"
  },
  {
    "id": "carbetocina",
    "nombre": "Carbetocina",
    "nombreGenerico": "Carbetocina",
    "nombresComerciales": ["Duratocin", "Pabal"],
    "familia": "Oxitócicos",
    "clasificacion": "Análogo sintético de oxitocina de acción prolongada",
    "mecanismoAccion": "Agonista selectivo del receptor de oxitocina miometrial. Produce contracciones uterinas rítmicas sostenidas. Mayor vida media que oxitocina, permitiendo dosis única.",
    "indicaciones": ["Prevención de hemorragia postparto por atonía uterina (cesárea)", "Prevención HPP en parto vaginal (OMS)"],
    "contraindicaciones": ["Hipersensibilidad", "Embarazo (antes del parto)", "Preeclampsia/eclampsia", "Enfermedad cardiovascular severa", "Epilepsia"],
    "efectosAdversos": ["Náuseas", "Dolor abdominal", "Prurito", "Rubor", "Temblor", "Hipotensión", "Cefalea"],
    "interacciones": ["No administrar con oxitocina simultáneamente", "Prostaglandinas: efecto uterotónico aditivo", "Anestésicos epidurales: hipotensión aditiva"],
    "viaAdministracion": ["IV", "IM"],
    "dosis": {
      "adulto": "100 mcg (1 ampolla) IV lento en 1 min o IM dosis única post-alumbramiento"
    },
    "presentaciones": ["Ampolla 100 mcg/mL"],
    "embarazo": "X",
    "lactancia": "Compatible. Favorece la lactancia (efecto oxitócico).",
    "cuidadosEnfermeria": [
      "Administrar DESPUÉS del alumbramiento (no antes)",
      "Dosis ÚNICA: no repetir (vida media prolongada)",
      "Monitorizar tono uterino y sangrado post-administración",
      "Controlar PA (riesgo de hipotensión)",
      "Ventaja vs oxitocina: no requiere infusión continua",
      "Conservar refrigerado hasta uso"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata. IM: rápida",
      "distribucion": "Unión a receptores miometriales",
      "metabolismo": "Enzimático (peptidasas)",
      "excrecion": "Renal",
      "vidaMedia": "40 minutos (vs 3-5 min oxitocina)",
      "inicioAccion": "IV: 2 min. IM: 5-10 min",
      "picoAccion": "IV: 5-10 min",
      "duracionAccion": "60-120 minutos"
    },
    "almacenamiento": "Refrigerar 2-8°C. Proteger de la luz.",
    "unidadId": "u07",
    "capituloId": "c07_01"
  },
  {
    "id": "dinoprostona",
    "nombre": "Dinoprostona",
    "nombreGenerico": "Dinoprostona (Prostaglandina E2)",
    "nombresComerciales": ["Prepidil", "Cervidil", "Propess"],
    "familia": "Oxitócicos / Inductores del parto",
    "clasificacion": "Prostaglandina E2",
    "mecanismoAccion": "Actúa sobre receptores EP en cérvix y miometrio. Produce maduración cervical (ablandamiento, borramiento, dilatación) y contracciones uterinas al aumentar calcio intracelular en miometrio.",
    "indicaciones": ["Maduración cervical pre-inducción", "Inducción del parto a término", "Aborto terapéutico (2do trimestre)", "Evacuación de mola hidatiforme"],
    "contraindicaciones": ["Cesárea previa o cirugía uterina", "Desproporción cefalopélvica", "Placenta previa", "Sufrimiento fetal", "Gran multípara (≥5 partos)", "Infección pélvica activa"],
    "efectosAdversos": ["Taquisistolia uterina", "Hipertonía uterina", "Náuseas y vómitos", "Diarrea", "Fiebre", "Broncoespasmo (raro)"],
    "interacciones": ["Oxitocina: esperar 6h tras dinoprostona antes de iniciar oxitocina", "Otros uterotónicos: riesgo de rotura uterina"],
    "viaAdministracion": ["vaginal"],
    "dosis": {
      "adulto": "Gel endocervical 0.5 mg, repetir a las 6h si necesario (máx 1.5 mg/24h). Inserto vaginal 10 mg liberación prolongada (retirar al inicio del trabajo de parto)"
    },
    "presentaciones": ["Gel endocervical 0.5 mg/3 g", "Inserto vaginal 10 mg (liberación 0.3 mg/h)"],
    "embarazo": "X",
    "lactancia": "No aplica (uso periparto).",
    "cuidadosEnfermeria": [
      "Monitorización fetal continua durante y 2h post-aplicación",
      "Paciente en decúbito 30 min post-inserción gel",
      "Registrar score de Bishop antes y después",
      "Inserto vaginal: puede retirarse si hiperestimulación",
      "NO iniciar oxitocina hasta 6h después del gel",
      "Tener tocolíticos disponibles (ante taquisistolia)"
    ],
    "farmacocinetica": {
      "absorcion": "Vaginal: absorción local y sistémica",
      "metabolismo": "Pulmonar y hepático (rápido)",
      "excrecion": "Renal",
      "vidaMedia": "2.5-5 minutos (plasma)",
      "inicioAccion": "Gel: 30-60 min. Inserto: 30 min",
      "duracionAccion": "Gel: 6-12h. Inserto: hasta 24h (retirable)"
    },
    "almacenamiento": "Refrigerar 2-8°C. No congelar.",
    "unidadId": "u07",
    "capituloId": "c07_01"
  },
  {
    "id": "atosiban",
    "nombre": "Atosiban",
    "nombreGenerico": "Atosiban",
    "nombresComerciales": ["Tractocile", "Atosiban Elea"],
    "familia": "Tocolíticos",
    "clasificacion": "Antagonista de receptores de oxitocina",
    "mecanismoAccion": "Antagonista competitivo de receptores de oxitocina y vasopresina V1a en miometrio. Inhibe las contracciones uterinas prematuras sin efectos cardiovasculares significativos.",
    "indicaciones": ["Amenaza de parto prematuro (24-33 semanas)", "Tocólisis aguda"],
    "contraindicaciones": ["<24 o >33 semanas de gestación", "RPM con sospecha de infección", "Desprendimiento de placenta", "Sufrimiento fetal", "Eclampsia/preeclampsia severa", "Muerte fetal intrauterina"],
    "efectosAdversos": ["Náuseas", "Cefalea", "Mareo", "Rubor", "Taquicardia (leve)", "Hiperglucemia (leve)", "Reacción en sitio de inyección"],
    "interacciones": ["No combinar con otros tocolíticos", "Betamiméticos: efectos aditivos (evitar)"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "Bolo: 6.75 mg IV en 1 min, luego infusión 18 mg/h por 3h, luego 6 mg/h hasta 45h. Máximo tratamiento: 48h"
    },
    "presentaciones": ["Ampolla 6.75 mg/0.9 mL (bolo)", "Vial 37.5 mg/5 mL (infusión)"],
    "embarazo": "N/A",
    "lactancia": "No aplica (uso anteparto).",
    "cuidadosEnfermeria": [
      "Verificar edad gestacional (solo 24-33 semanas)",
      "Monitorización fetal y uterina continua",
      "Preparar tres etapas: bolo + infusión rápida + infusión lenta",
      "Administrar corticoides para maduración pulmonar simultáneamente",
      "Controlar glucemia (puede elevar levemente)",
      "Ventaja: menos efectos cardiovasculares que ritodrina"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata",
      "distribucion": "Unión proteica 46-48%",
      "metabolismo": "Peptidasa plasmática",
      "excrecion": "Renal",
      "vidaMedia": "1.7 horas",
      "inicioAccion": "Inmediato",
      "picoAccion": "30 minutos",
      "duracionAccion": "Efecto durante infusión"
    },
    "almacenamiento": "Refrigerar 2-8°C. No congelar.",
    "unidadId": "u07",
    "capituloId": "c07_01"
  },
  {
    "id": "cabergolina",
    "nombre": "Cabergolina",
    "nombreGenerico": "Cabergolina",
    "nombresComerciales": ["Dostinex", "Cabergolina Gador", "Cabertrix"],
    "familia": "Inhibidores de la prolactina",
    "clasificacion": "Agonista dopaminérgico D2",
    "mecanismoAccion": "Agonista selectivo de receptores D2 de dopamina en células lactotropas de la hipófisis anterior. Inhibe la secreción de prolactina de forma potente y prolongada.",
    "indicaciones": ["Hiperprolactinemia", "Prolactinomas (micro y macro)", "Inhibición de la lactancia", "Síndrome de hiperestimulación ovárica (prevención)"],
    "contraindicaciones": ["Hipersensibilidad a ergotamínicos", "Hipertensión no controlada", "Valvulopatía cardíaca", "Fibrosis pulmonar/retroperitoneal", "Preeclampsia/eclampsia"],
    "efectosAdversos": ["Náuseas", "Cefalea", "Mareo", "Hipotensión ortostática", "Somnolencia", "Fibrosis valvular (uso prolongado, dosis altas)", "Trastornos del control de impulsos"],
    "interacciones": ["Antipsicóticos (antagonistas D2): reducen eficacia", "Macrólidos: aumentan niveles", "Metoclopramida/domperidona: antagonismo"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Hiperprolactinemia: 0.25 mg 2 veces/semana, titular según prolactina (máx 4.5 mg/semana). Inhibición lactancia: 1 mg dosis única (2 comp de 0.5 mg)"
    },
    "presentaciones": ["Comprimidos 0.5 mg"],
    "embarazo": "C",
    "lactancia": "Contraindicada (suprime la lactancia).",
    "cuidadosEnfermeria": [
      "Administrar con alimentos para reducir náuseas",
      "Control de prolactina sérica mensual al inicio",
      "PA ortostática al inicio del tratamiento",
      "Ecocardiograma basal y anual si uso prolongado (fibrosis valvular)",
      "Para inhibición de lactancia: dosis única, no repetir",
      "Informar sobre somnolencia (precaución al conducir)"
    ],
    "farmacocinetica": {
      "absorcion": "Oral buena, no afectada por alimentos",
      "distribucion": "Unión proteica 40%",
      "metabolismo": "Hepático por hidrólisis",
      "excrecion": "Renal 22%, fecal 60%",
      "vidaMedia": "63-69 horas",
      "inicioAccion": "3 horas (supresión prolactina)",
      "picoAccion": "0.5-4 horas",
      "duracionAccion": "7-14 días (prolactina)"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de humedad.",
    "unidadId": "u07",
    "capituloId": "c07_05"
  },
  {
    "id": "levonorgestrel",
    "nombre": "Levonorgestrel",
    "nombreGenerico": "Levonorgestrel",
    "nombresComerciales": ["Norplant", "Mirena (DIU)", "Segurite", "Escapel"],
    "familia": "Anticonceptivos",
    "clasificacion": "Progestágeno sintético",
    "mecanismoAccion": "Inhibe la ovulación suprimiendo el pico de LH, espesa el moco cervical impidiendo el paso espermático, y modifica el endometrio. En anticoncepción de emergencia, retrasa o inhibe la ovulación.",
    "indicaciones": ["Anticoncepción hormonal", "Anticoncepción de emergencia (hasta 72h postcoito)", "Endometriosis (DIU)", "Sangrado uterino disfuncional (DIU)"],
    "contraindicaciones": ["Embarazo confirmado", "Cáncer de mama hormonodependiente", "Hepatopatía activa", "Tromboembolismo activo", "Sangrado genital no diagnosticado"],
    "efectosAdversos": ["Irregularidades menstruales", "Cefalea", "Náuseas", "Mastalgia", "Cambios de humor", "Acné", "Amenorrea (DIU)"],
    "interacciones": ["Rifampicina, carbamazepina, fenitoína: reducen eficacia (inductores CYP3A4)", "Antiretrovirales: pueden reducir eficacia", "Hierba de San Juan: reduce eficacia"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Anticoncepción de emergencia: 1.5 mg dosis única o 0.75 mg cada 12h (2 dosis). Anticonceptivo regular: según presentación combinada"
    },
    "presentaciones": ["Comprimidos 1.5 mg (emergencia)", "Comprimidos 0.75 mg", "Comprimidos 0.03 mg (minipíldora)", "DIU liberación prolongada 52 mg (Mirena)"],
    "embarazo": "X",
    "lactancia": "Compatible en dosis de minipíldora. Emergencia: esperar 8h para amamantar.",
    "cuidadosEnfermeria": [
      "Anticoncepción emergencia: eficacia máxima dentro de 12h postcoito",
      "No es abortivo: no afecta embarazo establecido",
      "Informar que puede alterar la siguiente menstruación",
      "No reemplaza anticoncepción regular",
      "Si vómito dentro de 2h: repetir dosis",
      "DIU: verificar hilos mensualmente por la paciente"
    ],
    "farmacocinetica": {
      "absorcion": "Oral rápida y completa",
      "distribucion": "Unión proteica 55% (SHBG), 47.5% (albúmina)",
      "metabolismo": "Hepático CYP3A4",
      "excrecion": "Renal 45%, fecal 32%",
      "vidaMedia": "24-32 horas",
      "inicioAccion": "2-4 horas",
      "picoAccion": "1.5-2 horas",
      "duracionAccion": "Variable según presentación"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u07",
    "capituloId": "c07_05"
  },
  {
    "id": "estradiol",
    "nombre": "Estradiol",
    "nombreGenerico": "17-beta estradiol",
    "nombresComerciales": ["Primaquin", "Estreva", "Estradot", "Estradiol Elea"],
    "familia": "Hormonas sexuales femeninas",
    "clasificacion": "Estrógeno natural",
    "mecanismoAccion": "Se une a receptores estrogénicos intracelulares (ERα y ERβ), modulando la transcripción génica. Produce proliferación endometrial, mantiene densidad ósea, protección cardiovascular y efectos tróficos en tejidos urogenitales.",
    "indicaciones": ["Terapia hormonal en menopausia (síntomas vasomotores)", "Prevención de osteoporosis posmenopáusica", "Atrofia urogenital", "Hipogonadismo femenino", "Insuficiencia ovárica prematura"],
    "contraindicaciones": ["Cáncer de mama o endometrio", "TEP/TVP activa o antecedente", "Hepatopatía activa", "Sangrado genital no diagnosticado", "Porfiria"],
    "efectosAdversos": ["Mastalgia", "Sangrado vaginal", "Cefalea", "Retención hídrica", "Náuseas", "Aumento de riesgo tromboembólico", "Aumento de riesgo de cáncer de mama (uso prolongado)"],
    "interacciones": ["Rifampicina, carbamazepina: reducen eficacia", "Tamoxifeno: antagonismo", "Inhibidores CYP3A4: aumentan niveles", "Corticoides: aumenta efecto de corticoides"],
    "viaAdministracion": ["oral", "transdermica", "vaginal"],
    "dosis": {
      "adulto": "Oral: 1-2 mg/día. Parches: 25-100 mcg/día (cambio 1-2 veces/semana). Vaginal: crema 0.5-1 g/día o anillo vaginal"
    },
    "presentaciones": ["Comprimidos 1, 2 mg", "Parche transdérmico 25, 50, 100 mcg/día", "Gel 0.06%", "Crema vaginal 0.01%"],
    "embarazo": "X",
    "lactancia": "Puede reducir producción de leche. Evitar.",
    "cuidadosEnfermeria": [
      "Siempre asociar progestágeno si útero intacto (protección endometrial)",
      "Parches: rotar sitio de aplicación, no aplicar en mamas",
      "Vía transdérmica: menor riesgo tromboembólico que oral",
      "Mamografía anual y examen pélvico antes y durante TRH",
      "Usar la menor dosis eficaz por el menor tiempo",
      "Evaluar riesgo-beneficio individualizado"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: primer paso hepático significativo. Transdérmica: absorción sostenida",
      "distribucion": "Unión proteica 97% (SHBG y albúmina)",
      "metabolismo": "Hepático CYP3A4 a estrona y estriol",
      "excrecion": "Renal (conjugados)",
      "vidaMedia": "Oral: 13-20h. Parche: vida media aparente según liberación",
      "inicioAccion": "Oral: horas. Parche: 4-8h",
      "picoAccion": "Oral: 6-8h. Parche: 24-48h",
      "duracionAccion": "Parche: 3-4 días"
    },
    "almacenamiento": "Temperatura ambiente. Parches: mantener en sobre hasta uso.",
    "unidadId": "u07",
    "capituloId": "c07_05"
  },
  {
    "id": "medroxiprogesterona",
    "nombre": "Medroxiprogesterona",
    "nombreGenerico": "Acetato de medroxiprogesterona",
    "nombresComerciales": ["Depo-Provera", "Provera", "Medroxiprogesterona Elea"],
    "familia": "Hormonas sexuales femeninas",
    "clasificacion": "Progestágeno sintético",
    "mecanismoAccion": "Agonista del receptor de progesterona. Transforma endometrio proliferativo en secretor, inhibe ovulación a dosis altas, suprime LH. Efectos antiestrogénicos en endometrio.",
    "indicaciones": ["Anticoncepción inyectable (depot)", "Terapia hormonal menopáusica (asociada a estrógenos)", "Endometriosis", "Sangrado uterino disfuncional", "Amenorrea secundaria"],
    "contraindicaciones": ["Embarazo", "Cáncer de mama", "TEP/TVP activa", "Hepatopatía activa", "Sangrado genital no diagnosticado", "ACV o IAM reciente"],
    "efectosAdversos": ["Irregularidades menstruales", "Amenorrea (frecuente con depot)", "Aumento de peso", "Cefalea", "Depresión", "Disminución de densidad ósea (depot prolongado)", "Acné"],
    "interacciones": ["Aminoglutetimida: reduce niveles de medroxiprogesterona", "Inductores CYP3A4: pueden reducir eficacia"],
    "viaAdministracion": ["oral", "IM"],
    "dosis": {
      "adulto": "Anticoncepción depot: 150 mg IM cada 12 semanas. TRH: 2.5-5 mg/día VO (con estrógenos). Sangrado disfuncional: 5-10 mg/día x 10-14 días"
    },
    "presentaciones": ["Comprimidos 5, 10 mg", "Suspensión inyectable 150 mg/mL (depot)"],
    "embarazo": "X",
    "lactancia": "Compatible con lactancia después de 6 semanas postparto.",
    "cuidadosEnfermeria": [
      "IM depot: inyectar en glúteo o deltoides profundo. NO masajear",
      "Verificar que no esté embarazada antes de cada inyección",
      "Citar cada 12 semanas (tolerancia ±2 semanas)",
      "Informar que fertilidad puede tardar 6-12 meses en recuperarse",
      "Densitometría ósea si uso >2 años (pérdida ósea)",
      "Registrar fecha de cada inyección"
    ],
    "farmacocinetica": {
      "absorcion": "IM depot: absorción lenta y sostenida",
      "distribucion": "Unión proteica 86-90%",
      "metabolismo": "Hepático",
      "excrecion": "Renal",
      "vidaMedia": "Oral: 12-17h. IM depot: 50 días",
      "inicioAccion": "IM: efecto anticonceptivo en 24h si se aplica en día 1-5 del ciclo",
      "picoAccion": "IM: 3 semanas",
      "duracionAccion": "IM depot: 12-14 semanas"
    },
    "almacenamiento": "Temperatura ambiente. No congelar suspensión.",
    "unidadId": "u07",
    "capituloId": "c07_05"
  },
  {
    "id": "clomifeno",
    "nombre": "Clomifeno",
    "nombreGenerico": "Citrato de clomifeno",
    "nombresComerciales": ["Clomid", "Serophene", "Genozym"],
    "familia": "Inductores de ovulación",
    "clasificacion": "Modulador selectivo del receptor de estrógenos (SERM)",
    "mecanismoAccion": "Bloquea receptores de estrógenos en hipotálamo, eliminando retroalimentación negativa. Esto aumenta la secreción de GnRH, FSH y LH, estimulando el desarrollo folicular y la ovulación.",
    "indicaciones": ["Inducción de ovulación en anovulación", "Síndrome de ovario poliquístico (infertilidad)", "Infertilidad masculina (off-label)"],
    "contraindicaciones": ["Embarazo", "Quistes ováricos (excepto SOP)", "Hepatopatía activa", "Sangrado uterino anormal no diagnosticado", "Tumor dependiente de estrógenos"],
    "efectosAdversos": ["Sofocos", "Distensión abdominal", "Mastalgia", "Visión borrosa", "Cefalea", "Síndrome de hiperestimulación ovárica", "Embarazo múltiple (8-10%)"],
    "interacciones": ["No interacciones clínicamente significativas relevantes"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "50 mg/día x 5 días, iniciando día 3-5 del ciclo. Si no ovula: aumentar a 100 mg/día. Máx: 150 mg/día. No más de 6 ciclos"
    },
    "presentaciones": ["Comprimidos 50 mg"],
    "embarazo": "X",
    "lactancia": "Puede suprimir lactancia. Contraindicado.",
    "cuidadosEnfermeria": [
      "Confirmar que no está embarazada antes de cada ciclo",
      "Ecografía folicular para monitorizar respuesta",
      "Informar signos de hiperestimulación: distensión abdominal, dolor pélvico",
      "Tasa de embarazo múltiple: advertir a la paciente",
      "Relaciones programadas 24-48h post-pico de LH",
      "No más de 6 ciclos (riesgo de cáncer ovárico con uso prolongado)"
    ],
    "farmacocinetica": {
      "absorcion": "Oral buena",
      "distribucion": "Circulación enterohepática significativa",
      "metabolismo": "Hepático",
      "excrecion": "Fecal 42%, renal 8%",
      "vidaMedia": "5-7 días",
      "inicioAccion": "Elevación FSH a los 2-3 días",
      "picoAccion": "Ovulación 5-10 días post-tratamiento",
      "duracionAccion": "Efecto en ciclo tratado"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u07",
    "capituloId": "c07_05"
  },
  {
    "id": "tamoxifeno",
    "nombre": "Tamoxifeno",
    "nombreGenerico": "Citrato de tamoxifeno",
    "nombresComerciales": ["Nolvadex", "Tamoxifeno Elea", "Tadex"],
    "familia": "Antineoplásicos hormonales",
    "clasificacion": "Modulador selectivo del receptor de estrógenos (SERM)",
    "mecanismoAccion": "Antagonista competitivo de estrógenos en mama (bloquea proliferación tumoral). Agonista parcial en endometrio (riesgo de hiperplasia) y hueso (efecto protector). Inhibe crecimiento de tumores RE+.",
    "indicaciones": ["Cáncer de mama RE+ (adyuvante)", "Cáncer de mama metastásico RE+", "Prevención de cáncer de mama en alto riesgo", "Ginecomastia (off-label)"],
    "contraindicaciones": ["Embarazo", "Lactancia", "Antecedente de TEP/TVP", "Uso concomitante de anticoagulantes cumarínicos (relativo)", "Hiperplasia endometrial"],
    "efectosAdversos": ["Sofocos", "Náuseas", "Tromboembolismo (TEP/TVP)", "Cáncer de endometrio (riesgo aumentado)", "Sangrado vaginal", "Cataratas", "Hepatotoxicidad (rara)"],
    "interacciones": ["Warfarina: potencia anticoagulación", "Inhibidores CYP2D6 (fluoxetina, paroxetina): reducen eficacia (EVITAR)", "ISRS: preferir venlafaxina o escitalopram", "Inhibidores de aromatasa: no usar simultáneamente"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Adyuvante: 20 mg/día por 5-10 años. Prevención: 20 mg/día por 5 años"
    },
    "presentaciones": ["Comprimidos 10, 20 mg"],
    "embarazo": "D",
    "lactancia": "Contraindicado. Puede inhibir lactancia.",
    "cuidadosEnfermeria": [
      "Anticoncepción eficaz obligatoria durante tratamiento (teratogénico)",
      "Control ginecológico anual (riesgo de cáncer endometrial)",
      "Informar sobre sangrado vaginal anormal (urgente comunicar)",
      "Vigilar signos de TEP: disnea, dolor torácico, edema de pierna",
      "No usar con paroxetina/fluoxetina (reducen metabolito activo)",
      "Examen oftalmológico si síntomas visuales",
      "Adherencia a largo plazo: educación y motivación"
    ],
    "farmacocinetica": {
      "absorcion": "Oral buena",
      "distribucion": "Unión proteica >99% (albúmina)",
      "metabolismo": "Hepático CYP2D6/3A4 a endoxifeno (metabolito activo principal)",
      "excrecion": "Fecal (principal), renal mínima",
      "vidaMedia": "5-7 días. Endoxifeno: 14 días",
      "inicioAccion": "4-10 semanas para efecto antitumoral",
      "picoAccion": "4-7 horas (nivel plasmático)",
      "duracionAccion": "Semanas post-suspensión"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u07",
    "capituloId": "c07_05"
  },
  {
    "id": "raloxifeno",
    "nombre": "Raloxifeno",
    "nombreGenerico": "Clorhidrato de raloxifeno",
    "nombresComerciales": ["Evista", "Raloxifeno Gador"],
    "familia": "Antirresortivos óseos",
    "clasificacion": "Modulador selectivo del receptor de estrógenos (SERM)",
    "mecanismoAccion": "Agonista estrogénico en hueso (inhibe resorción ósea) y metabolismo lipídico. Antagonista en mama y endometrio. Aumenta densidad mineral ósea sin estimular endometrio.",
    "indicaciones": ["Osteoporosis posmenopáusica (prevención y tratamiento)", "Reducción de riesgo de cáncer de mama invasivo en posmenopáusicas"],
    "contraindicaciones": ["Premenopáusicas", "Embarazo/lactancia", "Antecedente de TEV", "Inmovilización prolongada", "Hepatopatía severa"],
    "efectosAdversos": ["Sofocos", "Calambres en piernas", "Tromboembolismo venoso", "Edema periférico", "Artralgias"],
    "interacciones": ["Colestiramina: reduce absorción 60%", "Warfarina: reducción de efecto (monitorizar INR)", "Estrógenos: no usar juntos"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "60 mg/día, independiente de alimentos"
    },
    "presentaciones": ["Comprimidos 60 mg"],
    "embarazo": "X",
    "lactancia": "Contraindicado.",
    "cuidadosEnfermeria": [
      "Solo en mujeres posmenopáusicas",
      "Suspender 72h antes de cirugía o inmovilización prolongada (riesgo TEV)",
      "Suplementar calcio y vitamina D concomitante",
      "Monitorizar signos de TEP/TVP",
      "Densitometría ósea cada 2 años",
      "No combinar con terapia hormonal sustitutiva"
    ],
    "farmacocinetica": {
      "absorcion": "Oral 60%, primer paso hepático extenso",
      "distribucion": "Unión proteica >95%",
      "metabolismo": "Hepático (glucuronidación)",
      "excrecion": "Fecal (principal)",
      "vidaMedia": "27.7 horas",
      "inicioAccion": "Efecto óseo: semanas-meses",
      "picoAccion": "6 horas (nivel plasmático)",
      "duracionAccion": "24 horas"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u07",
    "capituloId": "c07_06"
  },
  {
    "id": "risedronato",
    "nombre": "Risedronato",
    "nombreGenerico": "Risedronato sódico",
    "nombresComerciales": ["Actonel", "Ostenel", "Risedronato Gador"],
    "familia": "Antirresortivos óseos",
    "clasificacion": "Bifosfonato",
    "mecanismoAccion": "Se une a hidroxiapatita ósea e inhibe la farnesil pirofosfato sintasa en osteoclastos, induciendo apoptosis osteoclástica. Reduce la resorción ósea y aumenta la densidad mineral ósea.",
    "indicaciones": ["Osteoporosis posmenopáusica", "Osteoporosis inducida por corticoides", "Enfermedad de Paget"],
    "contraindicaciones": ["Hipocalcemia no corregida", "Estenosis o acalasia esofágica", "Incapacidad de permanecer erguido 30 min", "Insuficiencia renal severa (CrCl <30)"],
    "efectosAdversos": ["Dolor abdominal", "Dispepsia", "Esofagitis", "Dolor musculoesquelético", "Osteonecrosis mandibular (raro)", "Fractura atípica de fémur (uso prolongado)"],
    "interacciones": ["Calcio, antiácidos, hierro: reducen absorción (separar 30 min)", "AINEs: mayor irritación GI"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "35 mg/semana o 150 mg/mes o 5 mg/día. Paget: 30 mg/día x 2 meses"
    },
    "presentaciones": ["Comprimidos 5, 35, 150 mg"],
    "embarazo": "C",
    "lactancia": "No recomendado.",
    "cuidadosEnfermeria": [
      "Tomar en AYUNAS con vaso lleno de agua (no mineral)",
      "No recostarse ni comer durante 30 minutos post-toma",
      "Suplementar calcio 1000-1200 mg/día + vitamina D",
      "Evaluación dental antes de iniciar (osteonecrosis mandibular)",
      "Densitometría ósea cada 2 años",
      "Reevaluar necesidad tras 5 años de tratamiento"
    ],
    "farmacocinetica": {
      "absorcion": "Oral 0.63% (ayunas). Alimentos la anulan",
      "distribucion": "50% se une a hueso",
      "metabolismo": "No se metaboliza",
      "excrecion": "Renal 50%, resto en hueso",
      "vidaMedia": "Terminal ósea: 480 horas",
      "inicioAccion": "Reducción de resorción en 1 mes",
      "picoAccion": "1-3 horas (nivel plasmático)",
      "duracionAccion": "Efecto óseo persiste meses"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u07",
    "capituloId": "c07_06"
  },
  {
    "id": "acido_zoledronico",
    "nombre": "Ácido Zoledrónico",
    "nombreGenerico": "Ácido zoledrónico",
    "nombresComerciales": ["Zometa", "Aclasta", "Zoledronato Varifarma"],
    "familia": "Antirresortivos óseos",
    "clasificacion": "Bifosfonato IV",
    "mecanismoAccion": "Bifosfonato nitrogenado de tercera generación. Inhibidor potente de la farnesil pirofosfato sintasa en osteoclastos. Se une ávidamente a hidroxiapatita ósea. Potencia 100-1000 veces mayor que otros bifosfonatos.",
    "indicaciones": ["Osteoporosis posmenopáusica", "Metástasis óseas (hipercalcemia tumoral)", "Enfermedad de Paget", "Osteoporosis inducida por corticoides", "Prevención fracturas en cáncer de mama/próstata"],
    "contraindicaciones": ["Hipocalcemia no corregida", "Insuficiencia renal severa (CrCl <35)", "Embarazo y lactancia"],
    "efectosAdversos": ["Síndrome gripal post-infusión (fiebre, mialgias, artralgias)", "Hipocalcemia", "Insuficiencia renal aguda", "Osteonecrosis mandibular", "Fractura atípica de fémur", "Uveítis (rara)"],
    "interacciones": ["Aminoglucósidos: hipocalcemia aditiva", "Diuréticos de asa: hipocalcemia", "Nefrotóxicos: mayor riesgo renal"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "Osteoporosis: 5 mg IV en infusión ≥15 min, una vez al año. Hipercalcemia tumoral: 4 mg IV en 15 min. Metástasis óseas: 4 mg IV cada 3-4 semanas",
      "ajusteRenal": "CrCl 30-60: ajustar según indicación. CrCl <35: contraindicado en osteoporosis"
    },
    "presentaciones": ["Vial 4 mg/5 mL (oncología)", "Vial 5 mg/100 mL (osteoporosis)"],
    "embarazo": "D",
    "lactancia": "Contraindicado.",
    "cuidadosEnfermeria": [
      "Infusión IV en ≥15 min (NUNCA bolo directo)",
      "Hidratación adecuada antes de la infusión",
      "Monitorizar creatinina sérica antes de cada dosis",
      "Suplementar calcio y vitamina D",
      "Advertir sobre síndrome gripal post-infusión (tratar con paracetamol)",
      "Evaluación dental previa (riesgo de ONM)",
      "Controlar calcio sérico 10 días post-infusión"
    ],
    "farmacocinetica": {
      "absorcion": "IV: 100% biodisponibilidad",
      "distribucion": "Se une a hueso preferentemente en sitios de remodelación",
      "metabolismo": "No se metaboliza",
      "excrecion": "Renal 39-46% inalterado. Resto en hueso",
      "vidaMedia": "Terminal: 146 horas (plasmática). Ósea: años",
      "inicioAccion": "Efecto hipocalcémico: 24-48h",
      "picoAccion": "Variable",
      "duracionAccion": "Efecto óseo: 12+ meses"
    },
    "almacenamiento": "Temperatura ambiente. Solución reconstituida: usar en 24h.",
    "unidadId": "u07",
    "capituloId": "c07_06"
  },
  {
    "id": "denosumab",
    "nombre": "Denosumab",
    "nombreGenerico": "Denosumab",
    "nombresComerciales": ["Prolia", "Xgeva"],
    "familia": "Antirresortivos óseos",
    "clasificacion": "Anticuerpo monoclonal anti-RANKL",
    "mecanismoAccion": "Anticuerpo monoclonal humano IgG2 que se une al RANKL (ligando del receptor activador de NF-κB), impidiendo la activación, maduración y supervivencia de los osteoclastos. Reduce la resorción ósea de forma potente y reversible.",
    "indicaciones": ["Osteoporosis posmenopáusica con alto riesgo de fractura", "Pérdida ósea por tratamiento hormonal (cáncer de mama/próstata)", "Metástasis óseas (Xgeva)", "Tumor de células gigantes de hueso"],
    "contraindicaciones": ["Hipocalcemia no corregida", "Hipersensibilidad al denosumab"],
    "efectosAdversos": ["Dolor musculoesquelético", "Infecciones (celulitis, ITU)", "Hipocalcemia", "Osteonecrosis mandibular (raro)", "Fractura atípica de fémur (raro)", "Efecto rebote al suspender (fracturas vertebrales múltiples)"],
    "interacciones": ["Otros antirresortivos: no combinar", "Inmunosupresores: mayor riesgo infeccioso"],
    "viaAdministracion": ["SC"],
    "dosis": {
      "adulto": "Osteoporosis (Prolia): 60 mg SC cada 6 meses. Metástasis óseas (Xgeva): 120 mg SC cada 4 semanas"
    },
    "presentaciones": ["Jeringa prellenada 60 mg/mL (Prolia)", "Vial 120 mg/1.7 mL (Xgeva)"],
    "embarazo": "X",
    "lactancia": "No recomendado.",
    "cuidadosEnfermeria": [
      "Inyección SC en abdomen, muslo o brazo",
      "Suplementar calcio ≥1000 mg/día + vitamina D ≥400 UI/día",
      "NO suspender sin indicación médica (efecto rebote severo)",
      "Si se suspende: considerar bifosfonato de transición",
      "Evaluación dental antes de iniciar",
      "Controlar calcio sérico 2 semanas post primera dosis",
      "Citar estrictamente cada 6 meses (no demorar)"
    ],
    "farmacocinetica": {
      "absorcion": "SC biodisponibilidad 62%",
      "distribucion": "Suero y tejidos",
      "metabolismo": "Catabolismo a péptidos y aminoácidos",
      "excrecion": "No renal",
      "vidaMedia": "25-28 días",
      "inicioAccion": "Reducción de marcadores de resorción en 24h",
      "picoAccion": "10 días (nivel plasmático)",
      "duracionAccion": "6 meses"
    },
    "almacenamiento": "Refrigerar 2-8°C. No congelar. Sacar 30 min antes de inyectar.",
    "unidadId": "u07",
    "capituloId": "c07_06"
  },
  {
    "id": "calcitonina",
    "nombre": "Calcitonina",
    "nombreGenerico": "Calcitonina de salmón",
    "nombresComerciales": ["Miacalcic", "Calcitonina Sandoz"],
    "familia": "Antirresortivos óseos",
    "clasificacion": "Hormona reguladora del calcio",
    "mecanismoAccion": "Se une a receptores de calcitonina en osteoclastos, inhibiendo la resorción ósea. Reduce el calcio sérico al disminuir la actividad osteoclástica y aumentar la excreción renal de calcio. Efecto analgésico central sobre dolor óseo.",
    "indicaciones": ["Hipercalcemia aguda (coadyuvante)", "Enfermedad de Paget", "Dolor por fractura vertebral osteoporótica", "Osteoporosis (segunda línea)"],
    "contraindicaciones": ["Hipersensibilidad a calcitonina de salmón", "Hipocalcemia"],
    "efectosAdversos": ["Náuseas", "Rubor facial", "Diarrea", "Rinitis (nasal)", "Reacciones en sitio de inyección", "Aumento de riesgo de cáncer (uso prolongado, FDA 2013)"],
    "interacciones": ["Bifosfonatos: efecto aditivo sobre calcio", "Litio: calcitonina puede reducir niveles de litio"],
    "viaAdministracion": ["SC", "IM", "nasal"],
    "dosis": {
      "adulto": "Hipercalcemia: 4-8 UI/kg SC/IM cada 6-12h. Paget: 100 UI SC/IM/día. Osteoporosis nasal: 200 UI/día (una fosa nasal, alternar)"
    },
    "presentaciones": ["Ampolla 100 UI/mL", "Spray nasal 200 UI/dosis"],
    "embarazo": "C",
    "lactancia": "Se desconoce excreción en leche. No recomendado.",
    "cuidadosEnfermeria": [
      "Prueba de sensibilidad antes de primera dosis (riesgo alérgico)",
      "Spray nasal: alternar fosas nasales diariamente",
      "Controlar calcio sérico durante tratamiento de hipercalcemia",
      "Efecto analgésico útil en fracturas vertebrales agudas",
      "No usar como primera línea en osteoporosis (riesgo oncológico)",
      "Administrar SC preferentemente antes de acostarse (reduce náuseas)"
    ],
    "farmacocinetica": {
      "absorcion": "SC/IM buena. Nasal: biodisponibilidad 3-5%",
      "distribucion": "Rápida",
      "metabolismo": "Renal, sanguíneo y tejidos periféricos",
      "excrecion": "Renal",
      "vidaMedia": "SC/IM: 60-90 min. Nasal: 43 min",
      "inicioAccion": "Hipocalcémico: 2h",
      "picoAccion": "SC: 30-40 min",
      "duracionAccion": "6-8 horas"
    },
    "almacenamiento": "Refrigerar 2-8°C. Spray nasal abierto: TA hasta 30 días.",
    "unidadId": "u07",
    "capituloId": "c07_06"
  },
  {
    "id": "colecalciferol",
    "nombre": "Colecalciferol (Vitamina D3)",
    "nombreGenerico": "Colecalciferol",
    "nombresComerciales": ["D3 Base", "Detritin", "Vitamina D3 Elea", "Osteovit D3"],
    "familia": "Suplementos óseos",
    "clasificacion": "Vitamina D3",
    "mecanismoAccion": "Se convierte en 25-OH-vitamina D (hígado) y luego en 1,25-dihidroxi-vitamina D (calcitriol, riñón). Aumenta absorción intestinal de calcio y fósforo, promueve mineralización ósea y modula inmunidad.",
    "indicaciones": ["Déficit de vitamina D", "Prevención y tratamiento de osteoporosis (con calcio)", "Raquitismo/osteomalacia", "Hipoparatiroidismo (coadyuvante)", "Prevención de caídas en ancianos"],
    "contraindicaciones": ["Hipercalcemia", "Hipervitaminosis D", "Hipercalciuria severa", "Sarcoidosis (metabolismo ectópico de vitamina D)"],
    "efectosAdversos": ["Hipercalcemia (sobredosis)", "Hipercalciuria", "Náuseas", "Estreñimiento", "Nefrolitiasis (raro)"],
    "interacciones": ["Tiazidas: hipercalcemia aditiva", "Digoxina: hipercalcemia aumenta toxicidad", "Colestiramina: reduce absorción", "Anticonvulsivantes: aumentan catabolismo de vitamina D"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Déficit: 50.000 UI/semana x 8 semanas (repleción), luego 1000-2000 UI/día. Mantenimiento: 800-2000 UI/día. Ancianos: 800-1000 UI/día",
      "pediatrico": "400-1000 UI/día según edad"
    },
    "presentaciones": ["Gotas 400 UI/gota", "Cápsulas blandas 1000, 2000, 5000, 50000 UI", "Comprimidos 1000 UI", "Ampolla bebible 100.000 UI"],
    "embarazo": "A",
    "lactancia": "Compatible. Suplementación recomendada en lactancia.",
    "cuidadosEnfermeria": [
      "Solicitar 25-OH-vitamina D sérica antes de tratar",
      "Objetivo terapéutico: 25-OH-vitamina D >30 ng/mL",
      "Administrar con alimentos grasos para mejor absorción",
      "Controlar calcemia y calciuria en dosis altas",
      "No exceder 4000 UI/día sin monitoreo médico",
      "Asociar siempre con calcio en osteoporosis"
    ],
    "farmacocinetica": {
      "absorcion": "Oral buena, requiere bilis (liposoluble)",
      "distribucion": "Se almacena en tejido adiposo. Unión proteica (DBP) 99%",
      "metabolismo": "Hepático (25-hidroxilación) y renal (1-alfa-hidroxilación)",
      "excrecion": "Fecal (principal), renal mínima",
      "vidaMedia": "25-OH-D: 15 días. 1,25-OH-D: 4-6 horas",
      "inicioAccion": "Semanas (normalización de niveles)",
      "picoAccion": "Variable",
      "duracionAccion": "Almacenamiento prolongado en tejido adiposo"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u07",
    "capituloId": "c07_02"
  },
  {
    "id": "finasteride",
    "nombre": "Finasteride",
    "nombreGenerico": "Finasteride",
    "nombresComerciales": ["Proscar", "Propecia", "Finasteride Gador"],
    "familia": "Urológicos",
    "clasificacion": "Inhibidor de la 5-alfa-reductasa tipo II",
    "mecanismoAccion": "Inhibe la enzima 5-alfa-reductasa tipo II que convierte testosterona en dihidrotestosterona (DHT). Reduce los niveles de DHT ~70%, disminuyendo el volumen prostático y la caída del cabello androgenética.",
    "indicaciones": ["Hiperplasia prostática benigna (HPB)", "Alopecia androgenética masculina", "Retención urinaria por HPB (prevención)"],
    "contraindicaciones": ["Mujeres (especialmente embarazadas)", "Hipersensibilidad", "Hepatopatía severa"],
    "efectosAdversos": ["Disfunción eréctil (2-4%)", "Disminución de libido", "Ginecomastia", "Disminución de PSA 50%", "Depresión (raro)", "Síndrome post-finasteride (controvertido)"],
    "interacciones": ["No interacciones significativas conocidas", "Reduce PSA 50%: multiplicar x2 para interpretar"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "HPB: 5 mg/día. Alopecia: 1 mg/día"
    },
    "presentaciones": ["Comprimidos 1 mg (alopecia)", "Comprimidos 5 mg (HPB)"],
    "embarazo": "X",
    "lactancia": "No aplica (uso masculino). Mujeres no deben manipular comprimidos rotos.",
    "cuidadosEnfermeria": [
      "Mujeres embarazadas NO deben manipular comprimidos rotos (teratogénico por absorción cutánea)",
      "Efecto sobre HPB: 6-12 meses para efecto máximo",
      "Reduce PSA 50%: informar al urólogo para screening de cáncer prostático",
      "Informar sobre posibles efectos sexuales (reversibles al suspender)",
      "No donar sangre durante tratamiento ni 1 mes después"
    ],
    "farmacocinetica": {
      "absorcion": "Oral buena, biodisponibilidad 63%",
      "distribucion": "Cruza BHE. Unión proteica 90%",
      "metabolismo": "Hepático CYP3A4",
      "excrecion": "Fecal 57%, renal 39%",
      "vidaMedia": "5-6 horas (jóvenes), 8h (ancianos)",
      "inicioAccion": "Reducción de DHT en 24h. Efecto clínico: meses",
      "picoAccion": "1-2 horas",
      "duracionAccion": "24 horas"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u07",
    "capituloId": "c07_03"
  },
  {
    "id": "dutasteride",
    "nombre": "Dutasteride",
    "nombreGenerico": "Dutasteride",
    "nombresComerciales": ["Avodart", "Dutasteride Gador"],
    "familia": "Urológicos",
    "clasificacion": "Inhibidor dual de la 5-alfa-reductasa (tipo I y II)",
    "mecanismoAccion": "Inhibe ambas isoformas de la 5-alfa-reductasa (tipo I y tipo II). Reduce DHT sérica >90% (vs 70% de finasteride). Mayor reducción del volumen prostático.",
    "indicaciones": ["Hiperplasia prostática benigna", "HPB + tamsulosina (terapia combinada)"],
    "contraindicaciones": ["Mujeres", "Hepatopatía severa", "Hipersensibilidad"],
    "efectosAdversos": ["Disfunción eréctil", "Disminución de libido", "Ginecomastia/mastalgia", "Trastornos eyaculatorios", "Reduce PSA ~50%"],
    "interacciones": ["Inhibidores CYP3A4 (ketoconazol, ritonavir): aumentan niveles", "No interacciones clínicamente significativas en general"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "0.5 mg/día. Combinado: 0.5 mg dutasteride + 0.4 mg tamsulosina/día"
    },
    "presentaciones": ["Cápsulas blandas 0.5 mg"],
    "embarazo": "X",
    "lactancia": "No aplica (uso masculino).",
    "cuidadosEnfermeria": [
      "NO abrir cápsulas (contenido irrita mucosas)",
      "Mujeres embarazadas no deben manipular cápsulas dañadas",
      "Efecto clínico pleno: 3-6 meses",
      "Reduce PSA: informar para screening prostático",
      "No donar sangre hasta 6 meses después de suspender (vida media larga)"
    ],
    "farmacocinetica": {
      "absorcion": "Oral biodisponibilidad 60%",
      "distribucion": "Gran volumen. Unión proteica 99%",
      "metabolismo": "Hepático CYP3A4",
      "excrecion": "Fecal 40%, renal 5%",
      "vidaMedia": "3-5 semanas",
      "inicioAccion": "Reducción DHT: 24h",
      "picoAccion": "2-3 horas",
      "duracionAccion": "Semanas post-suspensión"
    },
    "almacenamiento": "Temperatura ambiente. No refrigerar.",
    "unidadId": "u07",
    "capituloId": "c07_03"
  },
  {
    "id": "teriparatida",
    "nombre": "Teriparatida",
    "nombreGenerico": "Teriparatida (PTH 1-34)",
    "nombresComerciales": ["Forteo", "Teribone"],
    "familia": "Formadores de hueso",
    "clasificacion": "Análogo de hormona paratiroidea (osteoformador)",
    "mecanismoAccion": "Fragmento recombinante de PTH (aminoácidos 1-34). En administración intermitente (pulsos diarios), estimula preferentemente osteoblastos sobre osteoclastos, aumentando la formación ósea neta, grosor cortical y conectividad trabecular.",
    "indicaciones": ["Osteoporosis severa con alto riesgo de fractura", "Osteoporosis con fracturas vertebrales múltiples", "Osteoporosis inducida por corticoides", "Fallo a bifosfonatos"],
    "contraindicaciones": ["Hipercalcemia preexistente", "Enfermedad de Paget", "Osteosarcoma o riesgo elevado", "Radioterapia ósea previa", "Metástasis óseas", "Niños con epífisis abiertas"],
    "efectosAdversos": ["Mareo", "Calambres en piernas", "Náuseas", "Cefalea", "Hipercalcemia transitoria", "Hipotensión ortostática", "Artralgia"],
    "interacciones": ["Digoxina: hipercalcemia puede potenciar toxicidad digitálica", "Suplementos de calcio: ajustar según calcemia"],
    "viaAdministracion": ["SC"],
    "dosis": {
      "adulto": "20 mcg SC/día en muslo o abdomen. Duración máxima: 24 meses"
    },
    "presentaciones": ["Pluma prellenada 250 mcg/mL (28 dosis de 20 mcg)"],
    "embarazo": "C",
    "lactancia": "No recomendado.",
    "cuidadosEnfermeria": [
      "Enseñar técnica de autoinyección SC (rotar sitios)",
      "Administrar sentada o acostada (riesgo de hipotensión ortostática primeras dosis)",
      "Duración MÁXIMA 24 meses (luego seguir con antirresortivo)",
      "Monitorizar calcio sérico mensual al inicio",
      "Almacenar pluma refrigerada, usar dentro de 28 días",
      "Tras completar: transicionar a bifosfonato (para mantener ganancia ósea)"
    ],
    "farmacocinetica": {
      "absorcion": "SC biodisponibilidad 95%",
      "distribucion": "Rápida",
      "metabolismo": "Hepático (proteasas)",
      "excrecion": "Renal",
      "vidaMedia": "1 hora SC",
      "inicioAccion": "Aumento de marcadores de formación: 1 mes",
      "picoAccion": "SC: 30 min",
      "duracionAccion": "Efecto anabólico durante tratamiento"
    },
    "almacenamiento": "Refrigerar 2-8°C. En uso: refrigerar, usar en 28 días.",
    "unidadId": "u07",
    "capituloId": "c07_06"
  },
  {
    "id": "etinilestradiol_desogestrel",
    "nombre": "Etinilestradiol + Desogestrel",
    "nombreGenerico": "Etinilestradiol / Desogestrel",
    "nombresComerciales": ["Marvelon", "Mercilon", "Femelle 20"],
    "familia": "Anticonceptivos combinados",
    "clasificacion": "Anticonceptivo hormonal combinado oral",
    "mecanismoAccion": "El estrógeno (etinilestradiol) y el progestágeno (desogestrel) suprimen sinérgicamente la ovulación inhibiendo GnRH, FSH y LH. Adicionalmente, espesan el moco cervical e inducen atrofia endometrial.",
    "indicaciones": ["Anticoncepción", "Regulación del ciclo menstrual", "Dismenorrea", "Acné moderado", "Síndrome de ovario poliquístico (control de síntomas)"],
    "contraindicaciones": ["Tromboembolismo venoso/arterial actual o previo", "Cáncer de mama", "Hepatopatía activa", "Migraña con aura", "HTA no controlada", "Fumadora >35 años", "Diabetes con complicaciones vasculares"],
    "efectosAdversos": ["Náuseas", "Cefalea", "Mastalgia", "Sangrado intermenstrual", "Tromboembolismo venoso", "Cambios de humor", "Aumento de peso leve"],
    "interacciones": ["Rifampicina, carbamazepina, fenitoína: reducen eficacia", "Antibióticos de amplio espectro: eficacia puede reducirse", "Hierba de San Juan: reduce eficacia", "Lamotrigina: los ACO reducen sus niveles"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "1 comprimido diario x 21 días, 7 días de descanso (o placebo). Iniciar día 1 del ciclo"
    },
    "presentaciones": ["Comprimidos EE 0.02 mg + desogestrel 0.15 mg (x21)", "Comprimidos EE 0.03 mg + desogestrel 0.15 mg (x21)"],
    "embarazo": "X",
    "lactancia": "No recomendado en lactancia (reduce producción de leche). Usar progestágeno solo.",
    "cuidadosEnfermeria": [
      "Tomar a la misma hora todos los días",
      "Si olvido <12h: tomar y continuar. Si >12h: anticoncepción adicional 7 días",
      "Evaluar factores de riesgo TEV antes de prescribir (criterios OMS)",
      "No fumar (especialmente >35 años: contraindicado)",
      "Control de PA cada 6 meses",
      "Informar sobre signos de alarma: dolor en pierna, disnea, cefalea intensa súbita"
    ],
    "farmacocinetica": {
      "absorcion": "EE: rápida, biodisponibilidad 40%. Desogestrel: rápida, se convierte en etonogestrel",
      "distribucion": "EE: unión proteica 97%. Etonogestrel: 66% (SHBG)",
      "metabolismo": "Hepático CYP3A4",
      "excrecion": "Renal y fecal",
      "vidaMedia": "EE: 24h. Etonogestrel: 30h",
      "inicioAccion": "Efecto anticonceptivo: 7 días",
      "picoAccion": "EE: 1-2h. Desogestrel: 1.5h",
      "duracionAccion": "24 horas"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u07",
    "capituloId": "c07_05"
  },
  {
    "id": "ritodrina",
    "nombre": "Ritodrina",
    "nombreGenerico": "Clorhidrato de ritodrina",
    "nombresComerciales": ["Pre-Par", "Yutopar"],
    "familia": "Tocolíticos",
    "clasificacion": "Agonista beta-2 adrenérgico selectivo",
    "mecanismoAccion": "Estimula receptores beta-2 adrenérgicos en el miometrio, activando adenilato ciclasa y aumentando AMPc intracelular. Esto reduce el calcio libre citoplásmico y relaja la musculatura uterina, inhibiendo las contracciones.",
    "indicaciones": ["Amenaza de parto prematuro (24-34 semanas)", "Tocólisis aguda"],
    "contraindicaciones": ["Cardiopatía materna", "Hipertiroidismo", "Diabetes descompensada", "Hemorragia anteparto", "Corioamnionitis", "RPM con infección", "Preeclampsia severa"],
    "efectosAdversos": ["Taquicardia materna", "Palpitaciones", "Temblor", "Hipopotasemia", "Hiperglucemia", "Edema pulmonar (raro pero grave)", "Taquicardia fetal"],
    "interacciones": ["Corticoides: aumentan riesgo de edema pulmonar (limitar líquidos)", "Betabloqueantes: antagonismo", "Sulfato de magnesio: efectos cardiovasculares aditivos"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "Infusión IV: iniciar 50-100 mcg/min, aumentar 50 mcg/min cada 10 min hasta cese de contracciones. Máx: 350 mcg/min"
    },
    "presentaciones": ["Ampolla 50 mg/5 mL"],
    "embarazo": "B",
    "lactancia": "No aplica (uso anteparto).",
    "cuidadosEnfermeria": [
      "Monitorización ECG materna continua (riesgo de edema pulmonar)",
      "Control de FC materna (mantener <120 lpm)",
      "Balance hídrico estricto (máx 2500 mL/24h total)",
      "Monitorizar glucemia y potasio cada 6h",
      "FCF continua",
      "Posición decúbito lateral izquierdo",
      "Suspender si FC materna >130, dolor torácico o disnea",
      "Administrar corticoides para maduración pulmonar simultáneamente"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata",
      "distribucion": "Cruza placenta. Unión proteica 56%",
      "metabolismo": "Hepático (conjugación)",
      "excrecion": "Renal 90%",
      "vidaMedia": "1.7-2.6 horas",
      "inicioAccion": "IV: 5-10 minutos",
      "picoAccion": "Durante infusión",
      "duracionAccion": "Minutos post-suspensión"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u07",
    "capituloId": "c07_01"
  },
  {
    "id": "hierro_polimaltosato",
    "nombre": "Hierro Polimaltosato",
    "nombreGenerico": "Complejo de hidróxido de hierro (III) polimaltosato",
    "nombresComerciales": ["Maltofer", "Ferranina", "Hierro Polimaltosato Elea"],
    "familia": "Suplementos de hierro",
    "clasificacion": "Hierro no iónico",
    "mecanismoAccion": "Libera hierro férrico (Fe3+) de forma controlada en el intestino, que es absorbido activamente por la mucosa duodenal y transferido a la transferrina sérica. La estructura polimaltosato reduce irritación gástrica y toxicidad respecto al hierro iónico.",
    "indicaciones": ["Anemia ferropénica", "Profilaxis de déficit de hierro en embarazo", "Deficiencia de hierro latente", "Suplementación peri-quirúrgica"],
    "contraindicaciones": ["Sobrecarga de hierro (hemocromatosis, hemosiderosis)", "Anemia no ferropénica", "Hipersensibilidad"],
    "efectosAdversos": ["Heces oscuras (normal)", "Náuseas leves", "Estreñimiento o diarrea", "Mejor tolerancia que sales ferrosas"],
    "interacciones": ["No requiere separación con alimentos (ventaja vs ferroso)", "Tetraciclinas: puede reducir absorción mutua si tomas simultáneas"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Tratamiento: 100-200 mg de hierro elemental/día. Profilaxis embarazo: 100 mg/día",
      "pediatrico": "Gotas: 3-5 mg Fe/kg/día"
    },
    "presentaciones": ["Comprimidos masticables 100 mg Fe", "Gotas 50 mg Fe/mL", "Jarabe 50 mg Fe/5 mL"],
    "embarazo": "A",
    "lactancia": "Compatible. Recomendado en lactancia si deficiencia de hierro.",
    "cuidadosEnfermeria": [
      "Puede tomarse con o sin alimentos (ventaja vs sulfato ferroso)",
      "Informar que heces oscuras son normales",
      "Control de hemoglobina y ferritina a las 4-8 semanas",
      "Continuar 3 meses después de normalizar Hb (replecionar depósitos)",
      "Mejor tolerancia GI que sulfato ferroso",
      "No tiñe dientes (ventaja en gotas pediátricas)"
    ],
    "farmacocinetica": {
      "absorcion": "Intestinal activa, controlada. Biodisponibilidad similar a ferroso",
      "distribucion": "Unido a transferrina. Depósito en ferritina",
      "metabolismo": "Incorporación a hemoglobina y ferritina",
      "excrecion": "Mínima (hierro se recicla)",
      "vidaMedia": "No aplica (se incorpora a pools de hierro)",
      "inicioAccion": "Aumento de reticulocitos: 5-10 días",
      "picoAccion": "Ferritina normaliza: 8-12 semanas",
      "duracionAccion": "Durante suplementación"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u07",
    "capituloId": "c07_02"
  }
]

# New chapters to create for u07
NEW_CHAPTERS = [
    {
        "id": "c07_04",
        "nombre": "Fármacos en Obstetricia",
        "unidadId": "u07",
        "drugIds": ["labetalol", "sulfato_magnesio_obstetrico", "nifedipino_obstetrico", "metildopa_obstetrico"]
    },
    {
        "id": "c07_05",
        "nombre": "Hormonas y Anticonceptivos",
        "unidadId": "u07",
        "drugIds": ["cabergolina", "levonorgestrel", "estradiol", "medroxiprogesterona", "clomifeno", "tamoxifeno", "etinilestradiol_desogestrel"]
    },
    {
        "id": "c07_06",
        "nombre": "Antirresortivos y Formadores Óseos",
        "unidadId": "u07",
        "drugIds": ["raloxifeno", "risedronato", "acido_zoledronico", "denosumab", "calcitonina", "teriparatida"]
    }
]

# Drugs to add to EXISTING chapters
EXISTING_CHAPTER_ADDITIONS = {
    "c07_01": ["carbetocina", "dinoprostona", "atosiban", "ritodrina"],
    "c07_02": ["colecalciferol", "hierro_polimaltosato"],
    "c07_03": ["finasteride", "dutasteride"],
}

# Pathology links
PATHOLOGY_LINKS = {
    "pat_preeclampsia": ["labetalol", "sulfato_magnesio_obstetrico", "nifedipino_obstetrico", "metildopa_obstetrico"],
    "pat_eclampsia": ["sulfato_magnesio_obstetrico", "labetalol"],
    "pat_hemorragia_postparto": ["carbetocina", "ergometrina", "dinoprostona"],
    "pat_hta": ["labetalol", "metildopa_obstetrico"],
    "pat_anemia_ferropenica": ["hierro_polimaltosato"],
}

def main():
    print("=== Generating u07 drugs ===")
    added = add_drugs_to_file(NEW_DRUGS)

    cats = load_categories()
    for ch in NEW_CHAPTERS:
        add_chapter(cats, "u07", ch)
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
