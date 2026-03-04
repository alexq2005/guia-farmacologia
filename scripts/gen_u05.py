#!/usr/bin/env python3
"""Generate new drugs for u05 - Sistema Digestivo (11→28)."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from drug_helper import *

NEW_DRUGS = [
  {
    "id": "esomeprazol",
    "nombre": "Esomeprazol",
    "nombreGenerico": "Esomeprazol magnésico",
    "nombresComerciales": ["Nexium", "Esomeprazol Roemmers", "Emanera"],
    "familia": "Inhibidores de bomba de protones",
    "clasificacion": "IBP - antisecretor gástrico (isómero S del omeprazol)",
    "mecanismoAccion": "Isómero S del omeprazol. Inhibe irreversiblemente la bomba H+/K+ ATPasa en la célula parietal gástrica. Mayor biodisponibilidad y menor variabilidad interindividual que omeprazol racémico por metabolismo preferencial por CYP3A4 sobre CYP2C19.",
    "indicaciones": ["ERGE", "Úlcera gástrica y duodenal", "Erradicación de H. pylori (triple terapia)", "Esofagitis erosiva", "Profilaxis de úlcera por AINEs", "Síndrome de Zollinger-Ellison"],
    "contraindicaciones": ["Hipersensibilidad a IBP", "Uso concomitante con nelfinavir", "Uso concomitante con rilpivirina"],
    "efectosAdversos": ["Cefalea", "Diarrea", "Náuseas", "Dolor abdominal", "Flatulencia", "Deficiencia de magnesio y B12 (uso crónico)", "Mayor riesgo de C. difficile", "Osteoporosis (uso prolongado)"],
    "interacciones": ["Clopidogrel: menor interacción que omeprazol pero precaución", "Metotrexato: aumenta niveles", "Ketoconazol/itraconazol: reduce absorción", "Diazepam: puede aumentar niveles", "Cilostazol: aumenta niveles"],
    "viaAdministracion": ["oral", "IV"],
    "dosis": {
      "adulto": "ERGE/úlcera: 20-40 mg/día. Esofagitis erosiva: 40 mg/día x 4-8 semanas. H. pylori: 40 mg BID + 2 ATB. HDA: 80 mg bolo IV + 8 mg/h infusión x 72h",
      "pediatrico": "1-11 años: 10 mg/día. >12 años: 20-40 mg/día",
      "ajusteHepatico": "Child-Pugh C: no exceder 20 mg/día"
    },
    "presentaciones": ["Cápsulas 20, 40 mg", "Comprimidos MUPS 20, 40 mg", "Polvo para inyección IV 40 mg", "Granulado para suspensión 10 mg"],
    "embarazo": "C",
    "lactancia": "Se excreta en leche. Evaluar riesgo/beneficio.",
    "cuidadosEnfermeria": [
      "Administrar 30-60 min antes del desayuno",
      "Comprimidos MUPS: pueden dispersarse en agua (ventaja en SNG)",
      "No triturar ni masticar cápsulas",
      "IV: infundir en 10-30 min. No mezclar con otros fármacos",
      "Reevaluar necesidad cada 4-8 semanas",
      "Monitorizar magnesemia en uso >3 meses"
    ],
    "farmacocinetica": {
      "absorcion": "Oral rápida, biodisponibilidad 64% (primera dosis), 89% (dosis repetidas)",
      "distribucion": "Unión proteica 97%",
      "metabolismo": "Hepático CYP2C19 (menor que omeprazol) y CYP3A4",
      "excrecion": "Renal 80% como metabolitos",
      "vidaMedia": "1-1.5 horas",
      "inicioAccion": "1 hora",
      "picoAccion": "1.5-2 horas",
      "duracionAccion": "72 horas (inhibición irreversible de bomba)"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de humedad.",
    "unidadId": "u05",
    "capituloId": "c05_01"
  },
  {
    "id": "lansoprazol",
    "nombre": "Lansoprazol",
    "nombreGenerico": "Lansoprazol",
    "nombresComerciales": ["Lancid", "Ogastro", "Lansoprazol Roemmers"],
    "familia": "Inhibidores de bomba de protones",
    "clasificacion": "IBP - antisecretor gástrico",
    "mecanismoAccion": "Profármaco benzimidazólico que se activa en medio ácido del canalículo secretor de la célula parietal. Se une covalentemente a residuos de cisteína de la H+/K+ ATPasa, inhibiéndola irreversiblemente. Inicio de acción ligeramente más rápido que omeprazol.",
    "indicaciones": ["Úlcera gástrica y duodenal", "ERGE", "Esofagitis erosiva", "Erradicación de H. pylori", "Síndrome de Zollinger-Ellison", "Profilaxis de úlcera por AINEs"],
    "contraindicaciones": ["Hipersensibilidad a IBP", "Uso concomitante con rilpivirina", "Uso con atazanavir (reduce absorción)"],
    "efectosAdversos": ["Diarrea", "Dolor abdominal", "Náuseas", "Cefalea", "Hipomagnesemia (uso crónico)", "Deficiencia de B12 (uso prolongado)", "Colitis microscópica (raro)"],
    "interacciones": ["Sucralfato: administrar lansoprazol 30 min antes", "Teofilina: puede reducir niveles", "Ketoconazol: reduce absorción", "Metotrexato: aumenta niveles", "Tacrolimus: puede aumentar niveles"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Úlcera duodenal: 15-30 mg/día x 4 semanas. Úlcera gástrica: 30 mg/día x 8 semanas. ERGE: 15-30 mg/día. H. pylori: 30 mg BID + 2 ATB x 14 días",
      "pediatrico": "1-11 años <30 kg: 15 mg/día. >30 kg: 30 mg/día",
      "ajusteHepatico": "Hepatopatía severa: reducir a 15 mg/día"
    },
    "presentaciones": ["Cápsulas 15, 30 mg", "Comprimidos bucodispersables 15, 30 mg"],
    "embarazo": "B",
    "lactancia": "Se desconoce excreción en leche. Usar con precaución.",
    "cuidadosEnfermeria": [
      "Administrar 30 min antes de las comidas",
      "Cápsulas: no abrir ni masticar",
      "Bucodispersables: colocar en lengua, disolver y tragar con o sin agua",
      "Útil en pacientes con dificultad deglutoria (bucodispersable)",
      "Separar de sucralfato al menos 30 minutos",
      "Reevaluar indicación periódicamente en uso crónico"
    ],
    "farmacocinetica": {
      "absorcion": "Oral rápida, biodisponibilidad 80-90%. Alimentos retrasan absorción",
      "distribucion": "Unión proteica 97%",
      "metabolismo": "Hepático CYP2C19 y CYP3A4",
      "excrecion": "Fecal 67%, renal 33%",
      "vidaMedia": "1.5 horas",
      "inicioAccion": "1-2 horas",
      "picoAccion": "1.5-2 horas",
      "duracionAccion": "24+ horas (inhibición irreversible)"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de humedad y luz.",
    "unidadId": "u05",
    "capituloId": "c05_01"
  },
  {
    "id": "famotidina",
    "nombre": "Famotidina",
    "nombreGenerico": "Famotidina",
    "nombresComerciales": ["Pepcid", "Famotidina Northia", "Famodil"],
    "familia": "Antagonistas de receptores H2",
    "clasificacion": "Anti-H2 - antisecretor gástrico",
    "mecanismoAccion": "Bloquea competitivamente los receptores H2 de histamina en la célula parietal gástrica, inhibiendo la secreción ácida basal y estimulada. Potencia 20-50 veces mayor que cimetidina y 3-20 veces mayor que ranitidina.",
    "indicaciones": ["Úlcera gástrica y duodenal", "ERGE leve-moderada", "Síndrome de Zollinger-Ellison", "Profilaxis de úlcera de estrés", "Dispepsia funcional"],
    "contraindicaciones": ["Hipersensibilidad a anti-H2", "Insuficiencia renal severa sin ajuste de dosis"],
    "efectosAdversos": ["Cefalea", "Mareo", "Estreñimiento", "Diarrea", "Trombocitopenia (raro)", "Elevación transitoria de transaminasas"],
    "interacciones": ["Ketoconazol/itraconazol: reduce absorción (requieren medio ácido)", "Atazanavir: reduce absorción (evitar)", "Sucralfato: puede reducir absorción de famotidina"],
    "viaAdministracion": ["oral", "IV"],
    "dosis": {
      "adulto": "Úlcera: 40 mg/noche o 20 mg/12h x 4-8 semanas. ERGE: 20 mg/12h. Zollinger-Ellison: 20 mg/6h. Profilaxis estrés: 20 mg IV/12h",
      "pediatrico": "0.5 mg/kg/día en 1-2 dosis (máx 40 mg/día)",
      "ajusteRenal": "CrCl <50: reducir 50% de dosis o duplicar intervalo"
    },
    "presentaciones": ["Comprimidos 20, 40 mg", "Ampolla 20 mg/2 mL", "Suspensión oral 40 mg/5 mL"],
    "embarazo": "B",
    "lactancia": "Se excreta en leche. Compatible en dosis habituales.",
    "cuidadosEnfermeria": [
      "Puede administrarse con o sin alimentos",
      "IV: diluir en 50-100 mL SF, infundir en 15-30 min",
      "Alternativa a IBP en pacientes con intolerancia",
      "Preferido sobre ranitidina (retirada por NDMA)",
      "Ajustar dosis en insuficiencia renal",
      "Menor interacción con CYP450 que cimetidina/ranitidina"
    ],
    "farmacocinetica": {
      "absorcion": "Oral biodisponibilidad 40-45%. No afectada por alimentos",
      "distribucion": "Unión proteica 15-20%",
      "metabolismo": "Hepático parcial (70% se excreta inalterado)",
      "excrecion": "Renal 65-70% inalterado",
      "vidaMedia": "2.5-3.5 horas",
      "inicioAccion": "Oral: 1h. IV: 30 min",
      "picoAccion": "1-3 horas oral",
      "duracionAccion": "10-12 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de humedad.",
    "unidadId": "u05",
    "capituloId": "c05_01"
  },
  {
    "id": "granisetron",
    "nombre": "Granisetrón",
    "nombreGenerico": "Clorhidrato de granisetrón",
    "nombresComerciales": ["Kytril", "Granisetrón Kemex", "Sancuso"],
    "familia": "Antieméticos",
    "clasificacion": "Antagonista selectivo de receptores 5-HT3",
    "mecanismoAccion": "Bloquea selectivamente los receptores de serotonina 5-HT3 en las terminaciones vagales aferentes del tracto GI y en la zona quimiorreceptora gatillo del área postrema. Previene la emesis inducida por liberación masiva de serotonina durante quimioterapia y radioterapia.",
    "indicaciones": ["Prevención de náuseas y vómitos por quimioterapia (alta y moderadamente emetogénica)", "Prevención de emesis por radioterapia", "Prevención de náuseas y vómitos postoperatorios"],
    "contraindicaciones": ["Hipersensibilidad a antagonistas 5-HT3", "QT prolongado (precaución)", "Uso concomitante con apomorfina"],
    "efectosAdversos": ["Cefalea", "Estreñimiento", "Astenia", "Prolongación del QT (raro)", "Elevación transitoria de transaminasas", "Dolor abdominal"],
    "interacciones": ["Fármacos que prolongan QT: efecto aditivo", "Inductores CYP3A4 (fenitoína, rifampicina): pueden reducir niveles", "Apomorfina: hipotensión severa (contraindicado)"],
    "viaAdministracion": ["oral", "IV", "transdermica"],
    "dosis": {
      "adulto": "QT emetogénica: 2 mg VO dosis única 1h antes o 1 mg IV 30 min antes. Parche transdérmico: 3.1 mg/24h, aplicar 24-48h antes de QT",
      "pediatrico": ">2 años: 10-40 mcg/kg IV (máx 1 mg)"
    },
    "presentaciones": ["Comprimidos 1, 2 mg", "Ampolla 1 mg/mL (1 y 3 mL)", "Parche transdérmico 3.1 mg/24h"],
    "embarazo": "B",
    "lactancia": "Se desconoce excreción en leche. Usar con precaución.",
    "cuidadosEnfermeria": [
      "Administrar 30-60 min antes de quimioterapia",
      "IV: puede administrarse en bolo lento (30 seg) o diluido en 20-50 mL SF en 5 min",
      "Parche: aplicar en brazo superior, piel limpia y seca. Retirar 24h post-QT",
      "ECG basal en pacientes con riesgo de QT prolongado",
      "Monitorizar constipación (frecuente con antagonistas 5-HT3)",
      "Puede administrarse junto con dexametasona para mayor eficacia antiemética"
    ],
    "farmacocinetica": {
      "absorcion": "Oral biodisponibilidad 60%",
      "distribucion": "Amplia. Unión proteica 65%",
      "metabolismo": "Hepático CYP3A4",
      "excrecion": "Renal 48%, fecal 38%",
      "vidaMedia": "4-6 horas (IV), 5-8 horas (oral)",
      "inicioAccion": "IV: 1-3 min. Oral: 30 min",
      "picoAccion": "Oral: 1-2 horas",
      "duracionAccion": "24 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz. Parche: conservar en sobre sellado.",
    "unidadId": "u05",
    "capituloId": "c05_02"
  },
  {
    "id": "aprepitant",
    "nombre": "Aprepitant",
    "nombreGenerico": "Aprepitant",
    "nombresComerciales": ["Emend", "Aprepitant Glenmark"],
    "familia": "Antieméticos",
    "clasificacion": "Antagonista del receptor NK1 (neurocinina 1)",
    "mecanismoAccion": "Bloquea selectivamente el receptor de neurocinina 1 (NK1) en el SNC, impidiendo la unión de sustancia P. Actúa sinérgicamente con antagonistas 5-HT3 y corticoides. Especialmente eficaz contra la emesis tardía por quimioterapia.",
    "indicaciones": ["Prevención de náuseas y vómitos por quimioterapia altamente emetogénica (en esquema triple)", "Prevención de emesis tardía por QT", "Prevención de náuseas y vómitos postoperatorios"],
    "contraindicaciones": ["Hipersensibilidad", "Uso concomitante con pimozida, terfenadina, astemizol, cisaprida (inhibición CYP3A4)"],
    "efectosAdversos": ["Fatiga", "Hipo", "Anorexia", "Estreñimiento", "Cefalea", "Mareo", "Elevación de transaminasas (leve)"],
    "interacciones": ["Dexametasona oral: reducir dosis 50% (inhibición CYP3A4)", "Warfarina: reduce INR (inductor CYP2C9). Monitorizar", "ACO hormonales: puede reducir eficacia (usar método adicional)", "Fenitoína, rifampicina: reducen niveles de aprepitant"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Día 1: 125 mg VO 1h antes de QT. Días 2-3: 80 mg VO por la mañana. Esquema triple: aprepitant + ondansetrón + dexametasona"
    },
    "presentaciones": ["Cápsulas 80, 125 mg", "Kit de 3 días (1x125 mg + 2x80 mg)"],
    "embarazo": "B",
    "lactancia": "Se desconoce excreción en leche. No recomendado.",
    "cuidadosEnfermeria": [
      "Administrar 1 hora antes de quimioterapia el día 1",
      "Días 2 y 3: administrar por la mañana (sin relación con QT)",
      "Recordar reducir dexametasona oral al 50% cuando se usa con aprepitant",
      "Monitorizar INR si la paciente usa warfarina",
      "Informar sobre posible reducción de eficacia de anticonceptivos orales",
      "Esquema triple es estándar para QT altamente emetogénica"
    ],
    "farmacocinetica": {
      "absorcion": "Oral biodisponibilidad 60-65%",
      "distribucion": "Unión proteica >95%. Cruza BHE",
      "metabolismo": "Hepático CYP3A4 (sustrato, inhibidor moderado e inductor débil) y CYP2C9 (inductor)",
      "excrecion": "Fecal 86%, renal 5%",
      "vidaMedia": "9-13 horas",
      "inicioAccion": "1 hora",
      "picoAccion": "4 horas",
      "duracionAccion": "24+ horas por dosis"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u05",
    "capituloId": "c05_02"
  },
  {
    "id": "escopolamina",
    "nombre": "Escopolamina (Buscapina)",
    "nombreGenerico": "Butilbromuro de escopolamina",
    "nombresComerciales": ["Buscapina", "Scopinal", "Escopolamina Elea"],
    "familia": "Antieméticos / Antiespasmódicos",
    "clasificacion": "Anticolinérgico (antimuscarínico cuaternario)",
    "mecanismoAccion": "Antagonista competitivo de receptores muscarínicos (M1-M5) en músculo liso GI, urinario y biliar. El butilbromuro es un amonio cuaternario que no cruza BHE, por lo que su efecto es periférico: relaja músculo liso y reduce secreciones GI sin efectos centrales significativos.",
    "indicaciones": ["Cólico biliar", "Cólico renal", "Espasmo gastrointestinal", "Dolor abdominal espasmódico", "Náuseas y vómitos por espasmo", "Dismenorrea espasmódica"],
    "contraindicaciones": ["Glaucoma de ángulo cerrado", "Megacolon/íleo paralítico", "Obstrucción intestinal mecánica", "Miastenia gravis", "Estenosis pilórica", "Taquiarritmias"],
    "efectosAdversos": ["Sequedad bucal", "Taquicardia", "Retención urinaria", "Visión borrosa", "Estreñimiento", "Midriasis", "Reacción en sitio de inyección"],
    "interacciones": ["Otros anticolinérgicos: efectos aditivos", "Metoclopramida/domperidona: antagonismo mutuo (reducen efecto procinético)", "Antidepresivos tricíclicos: potencian efecto anticolinérgico", "Antihistamínicos sedantes: potencian efectos"],
    "viaAdministracion": ["oral", "IV", "IM", "rectal"],
    "dosis": {
      "adulto": "Oral: 10-20 mg/6-8h. IV/IM: 20 mg (1 ampolla), repetir cada 6-8h si necesario. Máx: 100 mg/día",
      "pediatrico": ">6 años: 10 mg/8h oral"
    },
    "presentaciones": ["Comprimidos 10 mg", "Grageas 10 mg", "Ampolla 20 mg/mL", "Supositorios 10 mg", "Gotas 10 mg/mL"],
    "embarazo": "B",
    "lactancia": "Mínima excreción en leche (amonio cuaternario). Compatible.",
    "cuidadosEnfermeria": [
      "IV: administrar lentamente (riesgo de hipotensión si rápido)",
      "Distinguir butilbromuro de escopolamina (periférico) de escopolamina base (central)",
      "No atraviesa BHE: no produce somnolencia significativa",
      "Monitorizar diuresis en pacientes con hiperplasia prostática",
      "En dolor abdominal agudo: descartar abdomen quirúrgico antes de administrar",
      "Puede combinarse con analgésicos (metamizol + buscapina: combinación frecuente)"
    ],
    "farmacocinetica": {
      "absorcion": "Oral baja biodisponibilidad (8%, amonio cuaternario)",
      "distribucion": "No cruza BHE. Unión proteica baja",
      "metabolismo": "Hidrólisis parcial",
      "excrecion": "Renal 50%, fecal 30%",
      "vidaMedia": "5-6 horas",
      "inicioAccion": "Oral: 15-30 min. IV: 1-3 min",
      "picoAccion": "Oral: 1-2 horas. IV: inmediato",
      "duracionAccion": "4-6 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u05",
    "capituloId": "c05_02"
  },
  {
    "id": "mesalazina",
    "nombre": "Mesalazina (5-ASA)",
    "nombreGenerico": "Ácido 5-aminosalicílico (mesalazina)",
    "nombresComerciales": ["Salofalk", "Pentasa", "Mesasal"],
    "familia": "Antiinflamatorios intestinales",
    "clasificacion": "Aminosalicilato",
    "mecanismoAccion": "Actúa localmente en la mucosa intestinal inhibiendo la producción de prostaglandinas y leucotrienos (vía COX y LOX), atrapando radicales libres de oxígeno e inhibiendo la migración de neutrófilos. Efecto antiinflamatorio tópico en la pared intestinal.",
    "indicaciones": ["Colitis ulcerosa (inducción y mantenimiento de remisión)", "Enfermedad de Crohn leve (colónica)", "Proctitis ulcerosa", "Proctosigmoiditis"],
    "contraindicaciones": ["Hipersensibilidad a salicilatos", "Insuficiencia renal severa", "Insuficiencia hepática severa", "Úlcera gástrica activa", "Diátesis hemorrágica"],
    "efectosAdversos": ["Cefalea", "Náuseas", "Diarrea (paradójica)", "Dolor abdominal", "Nefritis intersticial (raro)", "Pancreatitis (raro)", "Hepatitis (raro)", "Miocarditis/pericarditis (muy raro)"],
    "interacciones": ["Azatioprina/6-mercaptopurina: aumenta mielosupresión (inhibición de TPMT)", "AINEs: mayor riesgo de nefrotoxicidad", "Warfarina: puede reducir efecto anticoagulante", "Digoxina: reduce absorción"],
    "viaAdministracion": ["oral", "rectal"],
    "dosis": {
      "adulto": "Inducción CU: 2-4.8 g/día VO en 2-3 dosis. Mantenimiento: 1.5-3 g/día. Rectal: supositorios 500 mg-1 g/día o enemas 1-4 g/día",
      "ajusteRenal": "Contraindicado si CrCl <20 mL/min. Monitorizar función renal"
    },
    "presentaciones": ["Comprimidos de liberación retardada 500 mg, 1 g", "Granulado de liberación prolongada 1 g, 2 g", "Supositorios 250, 500 mg, 1 g", "Enema 1 g, 2 g, 4 g"],
    "embarazo": "B",
    "lactancia": "Se excreta en leche en baja concentración. Compatible con precaución (vigilar diarrea en lactante).",
    "cuidadosEnfermeria": [
      "No triturar ni masticar comprimidos (liberación retardada/controlada)",
      "Supositorios: retener al menos 1 hora para máxima absorción local",
      "Enemas: administrar al acostarse, retener toda la noche si es posible",
      "Monitorizar creatinina sérica cada 3-6 meses",
      "Hemograma periódico (raro: mielosupresión)",
      "Informar que puede colorear la orina (amarillo-naranja)"
    ],
    "farmacocinetica": {
      "absorcion": "Oral 20-30% (diseñado para liberación intestinal local)",
      "distribucion": "Concentración local intestinal >> sistémica. Unión proteica 43%",
      "metabolismo": "Intestinal y hepático: N-acetilación a Ac-5-ASA",
      "excrecion": "Renal 20-35%, fecal 60-75%",
      "vidaMedia": "5-ASA: 0.5-2h. Ac-5-ASA: 5-10h",
      "inicioAccion": "2-4 semanas para efecto clínico pleno",
      "picoAccion": "Oral: 3-12h según formulación",
      "duracionAccion": "Efecto local continuo con dosis diaria"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de humedad.",
    "unidadId": "u05",
    "capituloId": "c05_03"
  },
  {
    "id": "sulfasalazina",
    "nombre": "Sulfasalazina",
    "nombreGenerico": "Sulfasalazina",
    "nombresComerciales": ["Azulfidine", "Salazopyrin", "Sulfasalazina Elea"],
    "familia": "Antiinflamatorios intestinales",
    "clasificacion": "Aminosalicilato / FARME",
    "mecanismoAccion": "Profármaco compuesto por 5-ASA unido a sulfapiridina por enlace azo. Las bacterias colónicas escinden el enlace liberando 5-ASA (efecto antiinflamatorio local intestinal) y sulfapiridina (absorción sistémica, efecto inmunomodulador). La fracción 5-ASA inhibe COX y LOX localmente.",
    "indicaciones": ["Colitis ulcerosa (inducción y mantenimiento)", "Enfermedad de Crohn colónica", "Artritis reumatoidea (FARME)", "Espondilitis anquilosante"],
    "contraindicaciones": ["Alergia a sulfonamidas o salicilatos", "Porfiria", "Obstrucción intestinal o urinaria", "Déficit de G6PD", "Insuficiencia hepática o renal severa"],
    "efectosAdversos": ["Náuseas y vómitos (frecuente)", "Cefalea", "Anorexia", "Oligospermia reversible", "Rash cutáneo", "Hepatotoxicidad", "Agranulocitosis (raro)", "Síndrome de Stevens-Johnson (raro)", "Coloración naranja de orina/lágrimas"],
    "interacciones": ["Digoxina: reduce absorción", "Metotrexato: desplaza de proteínas (aumenta toxicidad)", "Ácido fólico: reduce absorción (suplementar)", "Azatioprina: aumenta mielosupresión", "Warfarina: desplaza de proteínas"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "EII inducción: 1 g/6h (inicio gradual: 500 mg/12h, aumentar en 1 semana). Mantenimiento: 2 g/día. AR: 500 mg/12h, aumentar a 1 g/12h"
    },
    "presentaciones": ["Comprimidos 500 mg", "Comprimidos con cubierta entérica 500 mg"],
    "embarazo": "B",
    "lactancia": "Se excreta en leche. Compatible con precaución (riesgo de ictericia neonatal en prematuros).",
    "cuidadosEnfermeria": [
      "Iniciar con dosis baja y aumentar gradualmente (minimiza intolerancia GI)",
      "Administrar con alimentos o después de comidas",
      "Suplementar ácido fólico 1 mg/día (interfiere absorción)",
      "Hemograma completo cada 2-4 semanas al inicio, luego trimestral",
      "Informar que colorea orina y lágrimas (naranja, mancha lentes de contacto)",
      "Abundante hidratación (previene cristaluria)",
      "Informar a varones sobre oligospermia reversible"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: sulfasalazina 10-15% (absorción mínima intacta). Flora colónica libera 5-ASA + sulfapiridina",
      "distribucion": "Sulfapiridina: unión proteica 50%. 5-ASA: unión 43%",
      "metabolismo": "Colónico (azo-reducción). Sulfapiridina: hepático (acetilación, hidroxilación)",
      "excrecion": "Renal (sulfapiridina y metabolitos). Fecal (5-ASA)",
      "vidaMedia": "Sulfasalazina: 5-10h. Sulfapiridina: 6-14h (acetiladores lentos: mayor)",
      "inicioAccion": "EII: 2-4 semanas. AR: 4-12 semanas",
      "picoAccion": "Sulfapiridina: 3-6 horas",
      "duracionAccion": "Efecto mantenido con dosis diaria"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u05",
    "capituloId": "c05_03"
  },
  {
    "id": "budesonida_oral",
    "nombre": "Budesonida (Oral/Ileal)",
    "nombreGenerico": "Budesonida de liberación ileal",
    "nombresComerciales": ["Entocort", "Budenofalk", "Cortiment"],
    "familia": "Antiinflamatorios intestinales",
    "clasificacion": "Corticoide de acción local intestinal",
    "mecanismoAccion": "Corticosteroide con alta potencia tópica y bajo efecto sistémico. Formulaciones de liberación ileal (Entocort) o colónica (Budenofalk/Cortiment) liberan budesonida localmente. Alto primer paso hepático (90%) limita efectos sistémicos. Inhibe NF-κB, reduce citoquinas proinflamatorias y migración leucocitaria en pared intestinal.",
    "indicaciones": ["Enfermedad de Crohn ileocecal leve-moderada", "Colitis ulcerosa leve-moderada (formulación colónica)", "Colitis microscópica (colágena/linfocítica)", "Hepatitis autoinmune (alternativa)"],
    "contraindicaciones": ["Infección GI activa (tuberculosis, micosis)", "Cirrosis hepática severa (pierde selectividad local)", "Hipersensibilidad a budesonida"],
    "efectosAdversos": ["Cefalea", "Náuseas", "Dispepsia", "Síntomas cushingoides (menor que prednisona)", "Acné", "Insomnio", "Infecciones oportunistas (raro)", "Insuficiencia suprarrenal al suspender"],
    "interacciones": ["Inhibidores CYP3A4 (ketoconazol, itraconazol, ritonavir): aumentan niveles sistémicos hasta 6-8x", "Jugo de pomelo: aumenta niveles", "Omeprazol: no afecta significativamente"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Crohn inducción: 9 mg/día (3 mg/8h o 9 mg/mañana) x 8 semanas. Descenso: 6 mg/día x 2 semanas, luego 3 mg/día x 2 semanas. CU (Cortiment): 9 mg/día x 8 semanas"
    },
    "presentaciones": ["Cápsulas liberación ileal 3 mg (Entocort)", "Cápsulas liberación colónica 3 mg (Budenofalk)", "Comprimidos liberación colónica 9 mg (Cortiment)"],
    "embarazo": "C",
    "lactancia": "Se excreta en leche en baja proporción. Compatible con precaución.",
    "cuidadosEnfermeria": [
      "No abrir, masticar ni triturar cápsulas (liberación programada)",
      "Administrar por la mañana (menor supresión suprarrenal)",
      "Descenso gradual obligatorio (no suspender abruptamente)",
      "Menor efecto sistémico que prednisona: preferir en Crohn leve-moderado",
      "Informar que NO es intercambiable con budesonida inhalatoria",
      "En cirrosis: pierde selectividad local (biodisponibilidad sistémica aumentada)"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: liberación intestinal programada. Biodisponibilidad sistémica 10% (alto primer paso hepático 90%)",
      "distribucion": "Volumen de distribución 3 L/kg. Unión proteica 85-90%",
      "metabolismo": "Hepático CYP3A4 a metabolitos de baja actividad (16-alfa-hidroxiprednisolona)",
      "excrecion": "Renal 60%, fecal 30%",
      "vidaMedia": "2-3.6 horas",
      "inicioAccion": "2-4 semanas para efecto clínico",
      "picoAccion": "Ileal: 5-7h (Entocort). Colónico: variable",
      "duracionAccion": "24 horas con dosis diaria"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de humedad.",
    "unidadId": "u05",
    "capituloId": "c05_03"
  },
  {
    "id": "acido_ursodeoxicolico",
    "nombre": "Ácido Ursodeoxicólico",
    "nombreGenerico": "Ácido ursodeoxicólico (UDCA)",
    "nombresComerciales": ["Ursofalk", "Ursacol", "Ursodeoxicólico Northia"],
    "familia": "Hepatoprotectores",
    "clasificacion": "Ácido biliar hidrofílico",
    "mecanismoAccion": "Ácido biliar terciario hidrofílico que desplaza ácidos biliares tóxicos hidrofóbicos de la circulación enterohepática. Estabiliza membranas de hepatocitos y colangiocitos, tiene efecto citoprotector, inmunomodulador (reduce expresión de HLA-I) y colerético. Reduce la saturación de colesterol en bilis.",
    "indicaciones": ["Colestasis intrahepática del embarazo", "Cirrosis biliar primaria (colangitis biliar primaria)", "Colangitis esclerosante primaria", "Disolución de cálculos biliares de colesterol", "Hepatopatía colestásica crónica", "Fibrosis quística (hepatopatía asociada)"],
    "contraindicaciones": ["Cálculos biliares calcificados o radiopácos", "Vesícula no funcionante", "Colecistitis aguda", "Obstrucción biliar completa", "Enfermedad inflamatoria intestinal activa (altera recirculación)"],
    "efectosAdversos": ["Diarrea (dosis-dependiente)", "Prurito (transitorio, puede empeorar al inicio)", "Dolor abdominal", "Calcificación de cálculos (raro)", "Urticaria (raro)"],
    "interacciones": ["Colestiramina/colestipol: reduce absorción de UDCA (separar 2-5h)", "Antiácidos con aluminio: reducen absorción", "Ciprofloxacino: puede reducir niveles de UDCA", "Ciclosporina: UDCA puede aumentar absorción de ciclosporina"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "CBP: 13-15 mg/kg/día en 2-4 dosis. Cálculos biliares: 8-10 mg/kg/día. Colestasis del embarazo: 10-15 mg/kg/día en 2-3 dosis"
    },
    "presentaciones": ["Cápsulas 250, 300 mg", "Comprimidos 150, 300, 500 mg", "Suspensión oral 250 mg/5 mL"],
    "embarazo": "B",
    "lactancia": "Se desconoce excreción en leche. Usar con precaución.",
    "cuidadosEnfermeria": [
      "Administrar con alimentos o después de comer (mejora absorción)",
      "Para disolución de cálculos: ecografía cada 6 meses para evaluar progreso",
      "Monitorizar hepatograma cada 1-3 meses al inicio",
      "Prurito puede empeorar las primeras semanas (transitorio)",
      "En CBP: tratamiento a largo plazo (años)",
      "En colestasis del embarazo: suspender post-parto"
    ],
    "farmacocinetica": {
      "absorcion": "Oral 90% (requiere sales biliares para absorción). Mejora con alimentos",
      "distribucion": "Circulación enterohepática extensa. Unión proteica 70%",
      "metabolismo": "Hepático: conjugación con glicina y taurina. Bacterias colónicas: 7-deshidroxilación a ácido litocólico",
      "excrecion": "Fecal (principal), renal mínima",
      "vidaMedia": "3.5-5.8 días",
      "inicioAccion": "Efecto colerético: días. Disolución de cálculos: 6-24 meses",
      "picoAccion": "1-3 horas (nivel plasmático)",
      "duracionAccion": "Efecto mantenido con dosis diaria"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u05",
    "capituloId": "c05_04"
  },
  {
    "id": "silimarina",
    "nombre": "Silimarina",
    "nombreGenerico": "Silimarina (extracto de Silybum marianum)",
    "nombresComerciales": ["Legalon", "Silimarina Elea", "Hepatalgina Silimarina"],
    "familia": "Hepatoprotectores",
    "clasificacion": "Flavonolignano hepatoprotector",
    "mecanismoAccion": "Complejo de flavonolignanos (silibinina, silicristina, silidianina). La silibinina es el compuesto más activo: estabiliza membranas hepatocitarias, estimula la síntesis de proteínas por activación de RNA polimerasa I, inhibe la peroxidación lipídica (antioxidante), reduce inflamación hepática y estimula la regeneración hepatocitaria.",
    "indicaciones": ["Hepatopatía crónica (adjunto)", "Hepatitis tóxica y alcohólica", "Cirrosis hepática (esteatosis, esteatohepatitis)", "Intoxicación por Amanita phalloides (silibinina IV)", "Esteatosis hepática no alcohólica"],
    "contraindicaciones": ["Hipersensibilidad a plantas de la familia Asteraceae", "Obstrucción biliar completa"],
    "efectosAdversos": ["Diarrea leve", "Distensión abdominal", "Náuseas", "Prurito (raro)", "Efecto laxante a dosis altas", "Reacciones alérgicas (raro)"],
    "interacciones": ["Puede reducir niveles de algunos fármacos metabolizados por CYP3A4 y CYP2C9 (efecto leve)", "Metformina: puede potenciar efecto hipoglucemiante", "Warfarina: puede alterar efecto (monitorizar)"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "140-420 mg/día de silimarina (equivalente a 70-210 mg de silibinina) dividido en 2-3 dosis. Intoxicación por Amanita: silibinina IV 20-50 mg/kg/día"
    },
    "presentaciones": ["Comprimidos/cápsulas 150 mg de silimarina", "Comprimidos 70, 140 mg de silibinina", "Grageas 35 mg de silimarina"],
    "embarazo": "C",
    "lactancia": "Tradicionalmente se ha usado como galactogogo. Datos insuficientes. Precaución.",
    "cuidadosEnfermeria": [
      "Administrar con las comidas (mejora tolerancia y absorción)",
      "Coadyuvante: no reemplaza el tratamiento específico de la hepatopatía",
      "Control periódico de hepatograma",
      "Informar que no es curativo sino protector/coadyuvante",
      "Efecto máximo requiere uso continuo de al menos 8-12 semanas",
      "En intoxicación por hongos: silibinina IV es tratamiento específico"
    ],
    "farmacocinetica": {
      "absorcion": "Oral baja (23-47%). Mejora con formulaciones fosfolipídicas",
      "distribucion": "Concentración hepática >> plasmática. Unión proteica >80%",
      "metabolismo": "Hepático: conjugación (glucuronidación y sulfatación). Circulación enterohepática",
      "excrecion": "Fecal 80% (como conjugados biliares), renal 5%",
      "vidaMedia": "6 horas",
      "inicioAccion": "Efecto hepatoprotector: 2-4 semanas",
      "picoAccion": "2-4 horas",
      "duracionAccion": "8-12 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de humedad y luz.",
    "unidadId": "u05",
    "capituloId": "c05_04"
  },
  {
    "id": "pancreatina",
    "nombre": "Pancreatina",
    "nombreGenerico": "Pancreatina (enzimas pancreáticas: lipasa, amilasa, proteasa)",
    "nombresComerciales": ["Creon", "Pankreoflat", "Pancreatina Elea"],
    "familia": "Enzimas digestivas",
    "clasificacion": "Suplemento enzimático pancreático",
    "mecanismoAccion": "Provee enzimas pancreáticas exógenas (lipasa, amilasa, proteasa) que sustituyen la función exocrina deficiente del páncreas. La lipasa hidroliza triglicéridos a ácidos grasos y glicerol; la amilasa digiere almidón; la proteasa degrada proteínas. Las formulaciones modernas usan minimicrospheras con cubierta entérica que resisten el ácido gástrico y se liberan en duodeno.",
    "indicaciones": ["Insuficiencia pancreática exocrina (pancreatitis crónica)", "Fibrosis quística", "Post-pancreatectomía", "Obstrucción del conducto pancreático", "Esteatorrea por insuficiencia pancreática"],
    "contraindicaciones": ["Hipersensibilidad a proteínas porcinas", "Pancreatitis aguda (fase inicial)"],
    "efectosAdversos": ["Dolor abdominal", "Náuseas", "Diarrea/estreñimiento", "Hiperuricemia/hiperuricosuria (dosis altas)", "Colonopatía fibrosante (dosis muy altas, especialmente en FQ)"],
    "interacciones": ["Antiácidos con Ca o Mg: pueden reducir eficacia de la cubierta entérica", "IBP: mejoran eficacia (reducen inactivación ácida)", "Acarbosa: enzimas pancreáticas reducen su efecto", "Hierro oral: puede reducir absorción"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Según unidades de lipasa: 25.000-75.000 U de lipasa por comida principal. 10.000-25.000 U por colación. Ajustar según respuesta clínica (esteatorrea). FQ: hasta 10.000 U lipasa/kg/día",
      "pediatrico": "1-4 años: 1.000 U lipasa/kg/comida. >4 años: 500 U lipasa/kg/comida. Máx: 2.500 U/kg/comida"
    },
    "presentaciones": ["Cápsulas con minimicrospheras 10.000, 25.000, 40.000 U lipasa", "Cápsulas 150 mg pancreatina (equivalente lipasa variable)"],
    "embarazo": "C",
    "lactancia": "No se absorben sistémicamente. Compatible.",
    "cuidadosEnfermeria": [
      "Administrar al INICIO de cada comida o colación (no entre comidas)",
      "No triturar ni masticar cápsulas (destruye cubierta entérica)",
      "Si no puede tragar: abrir cápsula y mezclar minimicrospheras con alimento ácido blando (compota) sin masticar",
      "Dosis debe ajustarse según contenido graso de la comida",
      "Monitorizar peso, esteatorrea y estado nutricional",
      "No exceder 10.000 U lipasa/kg/día (riesgo de colonopatía fibrosante)"
    ],
    "farmacocinetica": {
      "absorcion": "No se absorbe sistémicamente (acción local intraluminal)",
      "distribucion": "Acción en lumen duodenal y yeyunal",
      "metabolismo": "Digestión enzimática en intestino",
      "excrecion": "Fecal (como péptidos)",
      "vidaMedia": "No aplica (acción local)",
      "inicioAccion": "15-30 min post-ingesta (en duodeno)",
      "picoAccion": "30-60 min",
      "duracionAccion": "Durante el tránsito intestinal de la comida"
    },
    "almacenamiento": "Temperatura ambiente. No superar 25°C. Proteger de humedad (enzimas sensibles).",
    "unidadId": "u05",
    "capituloId": "c05_04"
  },
  {
    "id": "senosidos",
    "nombre": "Senósidos A+B",
    "nombreGenerico": "Senósidos A y B (glucósidos de senidina)",
    "nombresComerciales": ["Ciruelax", "Senokot", "Agiolax"],
    "familia": "Laxantes estimulantes",
    "clasificacion": "Laxante antraquinónico",
    "mecanismoAccion": "Profármacos glucosídicos que son hidrolizados por las beta-glucosidasas de la flora colónica liberando reinantrona activa. Esta estimula el plexo nervioso de Auerbach, aumenta la motilidad colónica, inhibe la absorción de agua y electrolitos y estimula la secreción intestinal (efecto secretagogo).",
    "indicaciones": ["Estreñimiento ocasional", "Preparación para estudios diagnósticos (colonoscopía)", "Estreñimiento por opioides (segunda línea)", "Estreñimiento en pacientes encamados"],
    "contraindicaciones": ["Obstrucción intestinal", "Íleo paralítico", "Dolor abdominal de causa no diagnosticada", "Enfermedad inflamatoria intestinal activa", "Embarazo (primer trimestre)", "Deshidratación severa"],
    "efectosAdversos": ["Dolor abdominal tipo cólico", "Diarrea", "Náuseas", "Coloración marrón de orina (normal)", "Melanosis coli (uso crónico)", "Hipopotasemia (uso prolongado)", "Dependencia/inercia colónica (uso crónico)"],
    "interacciones": ["Diuréticos: hipopotasemia aditiva", "Digoxina: hipopotasemia aumenta toxicidad", "Corticoides: hipopotasemia aditiva", "Anticoagulantes orales: diarrea puede alterar absorción"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "12-36 mg de senósidos al acostarse. Preparación colonoscopía: según protocolo (dosis altas)",
      "pediatrico": ">6 años: 6-12 mg/día al acostarse"
    },
    "presentaciones": ["Comprimidos 8.6, 12 mg de senósidos", "Jarabe 8.8 mg/5 mL", "Granulado con fibra (Agiolax)"],
    "embarazo": "C",
    "lactancia": "No se excretan cantidades significativas en leche. Compatible en uso breve.",
    "cuidadosEnfermeria": [
      "Administrar al acostarse (efecto en 6-12h: evacuación matutina)",
      "NO usar por más de 1-2 semanas sin supervisión médica",
      "Educar que el uso crónico produce dependencia colónica",
      "Mantener hidratación adecuada",
      "Informar que puede colorear orina (marrón-rojizo: normal)",
      "Preferir medidas no farmacológicas primero: fibra, líquidos, actividad física"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: senósidos no se absorben (profármaco inactivo). Reinantrona activa: acción local colónica",
      "distribucion": "Acción local en colon",
      "metabolismo": "Colónico: hidrólisis por beta-glucosidasas bacterianas a reinantrona",
      "excrecion": "Fecal (principal). Renal mínima (metabolitos pueden colorear orina)",
      "vidaMedia": "No aplica (acción local colónica)",
      "inicioAccion": "6-12 horas (oral)",
      "picoAccion": "8-10 horas",
      "duracionAccion": "12-24 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de humedad.",
    "unidadId": "u05",
    "capituloId": "c05_05"
  },
  {
    "id": "psyllium",
    "nombre": "Psyllium (Plantago ovata)",
    "nombreGenerico": "Cáscara de semilla de Plantago ovata (ispágula)",
    "nombresComerciales": ["Metamucil", "Konsyl", "Fybogel"],
    "familia": "Laxantes formadores de masa",
    "clasificacion": "Fibra soluble / laxante de volumen",
    "mecanismoAccion": "Polisacárido hidrocoloide mucilaginoso que absorbe agua en intestino formando un gel viscoso. Aumenta el volumen y peso de la materia fecal, estimulando el peristaltismo por distensión. También tiene efecto prebiótico (fermenta parcialmente en colon) y reduce colesterol LDL por unión a ácidos biliares.",
    "indicaciones": ["Estreñimiento crónico", "Síndrome de intestino irritable (SII)", "Diarrea (efecto regulador)", "Reducción de colesterol LDL (coadyuvante)", "Diverticulosis (mantenimiento)", "Regulación de heces en colostomías"],
    "contraindicaciones": ["Obstrucción intestinal", "Estenosis esofágica o GI", "Disfagia", "Impactación fecal", "Hipersensibilidad a Plantago"],
    "efectosAdversos": ["Distensión abdominal", "Flatulencia", "Borborigmos", "Obstrucción esofágica (si toma sin suficiente agua)", "Reacciones alérgicas (raro, polvo inhalado)"],
    "interacciones": ["Separar 2h de otros medicamentos (puede reducir absorción)", "Warfarina: puede reducir absorción", "Litio: puede reducir absorción", "Digoxina: puede reducir absorción", "Insulina/hipoglucemiantes: puede requerir ajuste (mejora control glucémico)"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "5-10 g/día (1-2 cucharadas) en 1-3 dosis, con al menos 240 mL de agua por dosis. Colesterol: 10-25 g/día",
      "pediatrico": ">6 años: 2.5-5 g/día con agua abundante"
    },
    "presentaciones": ["Polvo para suspensión 3.4 g/dosis", "Granulado efervescente", "Cápsulas 500 mg"],
    "embarazo": "A",
    "lactancia": "Compatible. No se absorbe sistémicamente.",
    "cuidadosEnfermeria": [
      "SIEMPRE administrar con abundante agua (mínimo 240 mL por dosis)",
      "Sin agua suficiente: riesgo de obstrucción esofágica/intestinal",
      "Iniciar con dosis baja y aumentar gradualmente (minimiza flatulencia)",
      "Efecto pleno en 2-3 días de uso regular",
      "Separar de otros fármacos orales al menos 2 horas",
      "Informar que es regulador intestinal: útil tanto en estreñimiento como diarrea leve"
    ],
    "farmacocinetica": {
      "absorcion": "No se absorbe (acción local intestinal)",
      "distribucion": "Acción intraluminal en todo el intestino",
      "metabolismo": "Fermentación parcial por bacterias colónicas",
      "excrecion": "Fecal 100%",
      "vidaMedia": "No aplica",
      "inicioAccion": "12-24 horas (primera dosis). Efecto óptimo: 2-3 días",
      "picoAccion": "48-72 horas de uso regular",
      "duracionAccion": "Mientras se mantenga la administración"
    },
    "almacenamiento": "Temperatura ambiente. Mantener en envase cerrado (absorbe humedad).",
    "unidadId": "u05",
    "capituloId": "c05_05"
  },
  {
    "id": "racecadotrilo",
    "nombre": "Racecadotrilo",
    "nombreGenerico": "Racecadotrilo (acetorfán)",
    "nombresComerciales": ["Hidrasec", "Tiorfan", "Racecadotrilo Montpellier"],
    "familia": "Antidiarreicos antisecretores",
    "clasificacion": "Inhibidor de encefalinasa (antisecretor intestinal)",
    "mecanismoAccion": "Profármaco que se convierte en tiorfán, un inhibidor selectivo de la encefalinasa (NEP, neprilisina) en la mucosa intestinal. Al inhibir la degradación de encefalinas endógenas, potencia su efecto antisecretor sobre los receptores delta-opioides intestinales, reduciendo la hipersecreción de agua y electrolitos sin afectar la motilidad intestinal.",
    "indicaciones": ["Diarrea aguda en adultos y niños", "Diarrea acuosa aguda (como complemento a rehidratación oral)"],
    "contraindicaciones": ["Hipersensibilidad", "Uso concomitante con IECA (potencia efectos de encefalinas y bradicininas)", "Intolerancia a lactosa/fructosa (según excipientes)"],
    "efectosAdversos": ["Cefalea", "Vértigo", "Náuseas", "Estreñimiento (raro)", "Rash cutáneo", "Angioedema (muy raro, especialmente con IECA)"],
    "interacciones": ["IECA (enalapril, ramipril): riesgo de angioedema (ambos inhiben degradación de bradicinina)", "Loperamida: no combinar (mecanismos diferentes pero riesgo de estreñimiento severo)"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "100 mg/8h (primera dosis: 100 mg independientemente del horario, luego cada 8h). Máximo: 7 días",
      "pediatrico": "1.5 mg/kg/dosis cada 8h (granulado). Sobres: <9 kg: 10 mg/8h. 9-13 kg: 20 mg/8h. 13-27 kg: 30 mg/8h. >27 kg: 60 mg/8h"
    },
    "presentaciones": ["Cápsulas 100 mg", "Granulado pediátrico 10, 30 mg"],
    "embarazo": "C",
    "lactancia": "Se desconoce excreción en leche. No recomendado.",
    "cuidadosEnfermeria": [
      "Administrar antes de las comidas principales",
      "NO reemplaza la rehidratación oral (siempre complementar con SRO)",
      "Ventaja sobre loperamida: no inhibe motilidad (no produce estreñimiento rebote ni íleo)",
      "Seguro en pediatría (ampliamente usado en lactantes)",
      "No superar 7 días de tratamiento",
      "Evitar en pacientes que toman IECA (riesgo de angioedema)"
    ],
    "farmacocinetica": {
      "absorcion": "Oral rápida. Se convierte a tiorfán (metabolito activo)",
      "distribucion": "Unión proteica 90%. Tiorfán: concentración intestinal alta",
      "metabolismo": "Hidrólisis a tiorfán (activo), luego a ácido tiorfánico (inactivo)",
      "excrecion": "Renal 81%, fecal 8%",
      "vidaMedia": "Tiorfán: 3 horas",
      "inicioAccion": "30 minutos",
      "picoAccion": "1-2 horas",
      "duracionAccion": "8 horas"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u05",
    "capituloId": "c05_05"
  }
]

# New chapters to create for u05
NEW_CHAPTERS = [
    {
        "id": "c05_04",
        "nombre": "Hepatoprotectores y Enzimas",
        "unidadId": "u05",
        "drugIds": ["acido_ursodeoxicolico", "silimarina", "pancreatina"]
    },
    {
        "id": "c05_05",
        "nombre": "Laxantes y Antidiarreicos",
        "unidadId": "u05",
        "drugIds": ["senosidos", "psyllium", "racecadotrilo"]
    }
]

# Drugs to add to EXISTING chapters
EXISTING_CHAPTER_ADDITIONS = {
    "c05_01": ["esomeprazol", "lansoprazol", "famotidina"],
    "c05_02": ["granisetron", "aprepitant", "escopolamina"],
    "c05_03": ["mesalazina", "sulfasalazina", "budesonida_oral"],
}

# Pathology links
PATHOLOGY_LINKS = {
    "pat_ulcera_peptica": ["esomeprazol", "lansoprazol", "famotidina"],
    "pat_cirrosis": ["acido_ursodeoxicolico", "silimarina"],
    "pat_pancreatitis": ["pancreatina"],
    "pat_eii": ["mesalazina", "sulfasalazina", "budesonida_oral"],
    "pat_hemorragia_digestiva": ["esomeprazol", "lansoprazol", "famotidina"],
}

def main():
    print("=== Generating u05 drugs ===")
    added = add_drugs_to_file(NEW_DRUGS)

    cats = load_categories()
    for ch in NEW_CHAPTERS:
        add_chapter(cats, "u05", ch)
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
