#!/usr/bin/env python3
"""Generate new drugs for u11 - Antídotos y Emergencias (12→23)."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from drug_helper import *

NEW_DRUGS = [
  {
    "id": "dimercaprol",
    "nombre": "Dimercaprol (BAL)",
    "nombreGenerico": "Dimercaprol (British Anti-Lewisite)",
    "nombresComerciales": ["BAL in Oil", "Dimercaprol Pharma"],
    "familia": "Antídotos - Quelantes de metales",
    "clasificacion": "Quelante de metales pesados",
    "mecanismoAccion": "Agente ditiólico que forma complejos quelados estables y solubles con metales pesados (arsénico, mercurio, oro, plomo). Los grupos sulfhidrilo del dimercaprol se unen al metal, desplazándolo de las enzimas inhibidas y permitiendo su excreción renal.",
    "indicaciones": ["Intoxicación por arsénico", "Intoxicación por mercurio inorgánico", "Intoxicación por oro", "Encefalopatía por plomo (con EDTA cálcico)", "Intoxicación por antimonio"],
    "contraindicaciones": ["Insuficiencia hepática (excepto intoxicación por arsénico)", "Intoxicación por hierro, cadmio o selenio (complejos más tóxicos)", "Insuficiencia renal (excreción comprometida)", "Alergia al maní (vehículo oleoso)"],
    "efectosAdversos": ["Hipertensión (dosis-dependiente)", "Taquicardia", "Náuseas y vómitos", "Dolor en sitio de inyección", "Sensación de ardor en labios/boca/ojos", "Lagrimeo", "Sialorrea", "Nefrotoxicidad (a pH alcalino)"],
    "interacciones": ["Hierro: complejo tóxico (NO usar en intoxicación por hierro)", "Suplementos de hierro: suspender durante tratamiento", "Alcalinización urinaria: aumenta nefrotoxicidad del complejo"],
    "viaAdministracion": ["IM"],
    "dosis": {
      "adulto": "Intoxicación severa: 3-5 mg/kg IM cada 4h x 2 días, luego cada 6h x 1 día, luego cada 12h x 10 días. Intoxicación leve-moderada: 2.5 mg/kg IM cada 6h x 2 días, luego cada 12h x 7 días"
    },
    "presentaciones": ["Ampolla 100 mg/mL en aceite de maní (1 mL)"],
    "embarazo": "C",
    "lactancia": "Contraindicado. Se desconoce excreción.",
    "cuidadosEnfermeria": [
      "Administrar SOLO vía IM profunda (gluteal). Muy doloroso",
      "Mantener pH urinario ácido durante tratamiento (protege riñón)",
      "Monitorizar PA y FC (hipertensión frecuente)",
      "Controlar función renal y hepática diariamente",
      "Mantener al paciente bien hidratado",
      "Los efectos adversos son dosis-dependientes y aparecen en minutos",
      "Contraindicado en intoxicación por hierro (empeora toxicidad)"
    ],
    "farmacocinetica": {
      "absorcion": "IM: rápida (vehículo oleoso)",
      "distribucion": "Amplia, incluyendo espacio intracelular",
      "metabolismo": "Hepático, se oxida y conjuga",
      "excrecion": "Renal (complejo metal-dimercaprol) y fecal",
      "vidaMedia": "Corta: quelación máxima en 1-2h",
      "inicioAccion": "30 minutos",
      "picoAccion": "1-2 horas",
      "duracionAccion": "4-6 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u11",
    "capituloId": "c11_01"
  },
  {
    "id": "edetato_calcico",
    "nombre": "EDTA Cálcico",
    "nombreGenerico": "Edetato cálcico disódico (CaNa2EDTA)",
    "nombresComerciales": ["Calcium Disodium Versenate", "EDTA Cálcico"],
    "familia": "Antídotos - Quelantes de metales",
    "clasificacion": "Quelante de plomo",
    "mecanismoAccion": "Ácido aminopolicarboxílico que intercambia su calcio por plomo (mayor afinidad), formando un quelato plomo-EDTA hidrosoluble y estable que se excreta rápidamente por filtración glomerular. No penetra a las células: quelata el plomo extracelular.",
    "indicaciones": ["Intoxicación por plomo (plombemia >45 mcg/dL en niños, >70 mcg/dL en adultos)", "Encefalopatía plúmbica (con dimercaprol)", "Intoxicación por zinc, manganeso, cromo"],
    "contraindicaciones": ["Anuria/insuficiencia renal severa", "Hepatitis activa", "Uso de forma disódica (sin calcio): produce hipocalcemia fatal"],
    "efectosAdversos": ["Nefrotoxicidad (dosis-dependiente, reversible)", "Dolor en sitio de infusión", "Fiebre", "Hipocalcemia (si se usa forma disódica incorrectamente)", "Zinc depletion (uso prolongado)", "Cefalea"],
    "interacciones": ["Dimercaprol: usar primero dimercaprol en encefalopatía (sinergia)", "Glucocorticoides: pueden ser necesarios si edema cerebral", "No usar con EDTA disódico (diferente fármaco, causa hipocalcemia)"],
    "viaAdministracion": ["IV", "IM"],
    "dosis": {
      "adulto": "1000-1500 mg/m2/día (máx 3 g/día) en infusión IV continua o dividida en 2 dosis. Curso: 5 días, descanso 2-4 semanas, repetir si necesario. IM: diluir con procaína al 1%",
      "pediatrico": "1000-1500 mg/m2/día IV en infusión continua x 5 días"
    },
    "presentaciones": ["Ampolla 200 mg/mL (5 mL = 1 g)"],
    "embarazo": "B",
    "lactancia": "Se desconoce excreción. No recomendado.",
    "cuidadosEnfermeria": [
      "CONFIRMAR que es edetato CÁLCICO (CaNa2EDTA), NO edetato disódico (Na2EDTA)",
      "Diluir en SF o D5% para infusión IV (concentración ≤0.5%)",
      "Monitorizar función renal diariamente (creatinina, sedimento urinario)",
      "Asegurar diuresis adecuada antes de iniciar",
      "En encefalopatía: iniciar dimercaprol IM 4h ANTES del EDTA",
      "Controlar plombemia y plomburia de 24h para evaluar respuesta",
      "Suplementar zinc tras ciclos prolongados"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata. IM: buena",
      "distribucion": "Extracelular. No penetra al SNC significativamente",
      "metabolismo": "No se metaboliza",
      "excrecion": "Renal 95% en 24h (quelato plomo-EDTA)",
      "vidaMedia": "20-60 minutos IV",
      "inicioAccion": "Excreción de plomo comienza en 1h",
      "picoAccion": "24-48 horas (excreción máxima)",
      "duracionAccion": "Durante infusión"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u11",
    "capituloId": "c11_01"
  },
  {
    "id": "azul_metileno",
    "nombre": "Azul de Metileno",
    "nombreGenerico": "Cloruro de metiltioninio (Azul de metileno)",
    "nombresComerciales": ["Azul de Metileno Pharma", "Methylene Blue"],
    "familia": "Antídotos específicos",
    "clasificacion": "Agente reductor/oxidante",
    "mecanismoAccion": "A dosis bajas (1-2 mg/kg), actúa como aceptor de electrones, siendo reducido por NADPH-metahemoglobina reductasa a leucoazul de metileno, que a su vez reduce la metahemoglobina (Fe3+) a hemoglobina funcional (Fe2+). A dosis altas, paradójicamente causa metahemoglobinemia.",
    "indicaciones": ["Metahemoglobinemia tóxica (dapsona, nitritos, anestésicos locales)", "Metahemoglobinemia >20-30% o sintomática", "Encefalopatía por ifosfamida (off-label)", "Vasoplejia en cirugía cardíaca (inhibidor de óxido nítrico/GMPc)"],
    "contraindicaciones": ["Déficit de G6PD (no funciona y puede empeorar hemólisis)", "Insuficiencia renal severa", "Metahemoglobinemia por cianuro (usar hidroxocobalamina)", "Uso con ISRS (riesgo de síndrome serotoninérgico)"],
    "efectosAdversos": ["Coloración azul de piel y orina (esperado)", "Náuseas y vómitos", "Dolor torácico", "Disnea", "Hemólisis (en déficit de G6PD)", "Síndrome serotoninérgico (inhibidor de MAO-A)"],
    "interacciones": ["ISRS, IMAO, tramadol: riesgo de síndrome serotoninérgico (azul de metileno es inhibidor de MAO-A)", "Agentes reductores: efecto aditivo", "Dapsona: causa habitual de metahemoglobinemia"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "1-2 mg/kg IV lento en 5 minutos. Puede repetirse a los 30-60 min si metaHb persiste >20% (máx dosis total 7 mg/kg)"
    },
    "presentaciones": ["Ampolla 1% (10 mg/mL) x 10 mL"],
    "embarazo": "C",
    "lactancia": "Se desconoce. No recomendado.",
    "cuidadosEnfermeria": [
      "Administrar IV lento en 5 min (irritante si extravasación)",
      "Informar al paciente que piel y orina se tornarán azul/verde (normal)",
      "Controlar metahemoglobinemia con cooximetría (no pulsioximetría convencional, que es falsa)",
      "Pulsioximetría convencional NO es confiable en metahemoglobinemia",
      "No usar en déficit de G6PD: alternativa es ácido ascórbico IV",
      "Si usa ISRS: evaluar riesgo/beneficio (riesgo de síndrome serotoninérgico)",
      "Repetir dosis si metaHb persiste >20% a los 30-60 min"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata",
      "distribucion": "Amplia, se concentra en tejidos",
      "metabolismo": "Reducción tisular a leucoazul de metileno (forma activa)",
      "excrecion": "Renal (orina azul) y fecal",
      "vidaMedia": "5-6 horas",
      "inicioAccion": "IV: 30-60 minutos para reducir metaHb",
      "picoAccion": "1 hora",
      "duracionAccion": "Variable, puede requerir dosis repetidas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u11",
    "capituloId": "c11_01"
  },
  {
    "id": "glucosa_hipertonica",
    "nombre": "Glucosa Hipertónica",
    "nombreGenerico": "Dextrosa al 25-50%",
    "nombresComerciales": ["Dextrosa 25%", "Dextrosa 50%", "Glucosa Hipertónica Rivero"],
    "familia": "Antídotos / Soluciones de emergencia",
    "clasificacion": "Solución hipertónica de glucosa",
    "mecanismoAccion": "Aporta glucosa directamente al torrente sanguíneo, revirtiendo rápidamente la hipoglucemia. Cada ampolla de dextrosa al 50% (50 mL) aporta 25 g de glucosa. El efecto es inmediato por elevación directa de la glucemia.",
    "indicaciones": ["Hipoglucemia severa (con alteración de conciencia)", "Hipoglucemia por insulina o hipoglucemiantes orales", "Coma hipoglucémico", "Administración junto con insulina para hiperpotasemia"],
    "contraindicaciones": ["Hiperglucemia", "Coma hiperosmolar", "Hemorragia intracraneal (puede empeorar edema)", "Deshidratación hipotónica severa"],
    "efectosAdversos": ["Hiperglucemia de rebote", "Tromboflebitis (soluciones >10%)", "Necrosis tisular si extravasación", "Hipokalemia (estimula captación celular de K)", "Sobrecarga hídrica"],
    "interacciones": ["Insulina: se administran juntas en hiperpotasemia", "Tiamina: administrar ANTES de glucosa en alcohólicos/desnutridos (prevenir encefalopatía de Wernicke)"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "Hipoglucemia: 25-50 mL de dextrosa 50% (12.5-25 g) IV en bolo lento. Repetir según glucemia. Hiperpotasemia: 25 g dextrosa + 10 UI insulina regular IV"
    },
    "presentaciones": ["Ampolla dextrosa 50% x 20 mL", "Ampolla dextrosa 25% x 20 mL", "Frasco dextrosa 10% x 500 mL"],
    "embarazo": "A",
    "lactancia": "Compatible.",
    "cuidadosEnfermeria": [
      "Administrar por vía venosa central si >10% (riesgo de flebitis periférica)",
      "En periférica: dextrosa al 25% es más segura que al 50%",
      "En alcohólicos/desnutridos: administrar tiamina 100 mg IV ANTES de la glucosa",
      "Control de glucemia capilar cada 15 min post-administración",
      "Si extravasación: riesgo de necrosis tisular (elevar miembro, compresas tibias)",
      "Tras corrección aguda: iniciar infusión de mantenimiento (dextrosa 10%)",
      "Buscar y tratar causa subyacente de hipoglucemia"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata",
      "distribucion": "Espacio extracelular, luego intracelular por GLUT",
      "metabolismo": "Glucólisis y ciclo de Krebs",
      "excrecion": "CO2 y H2O. Renal si supera umbral (>180 mg/dL)",
      "vidaMedia": "Variable según estado metabólico",
      "inicioAccion": "Inmediato (1-3 minutos)",
      "picoAccion": "5-10 minutos",
      "duracionAccion": "30-60 minutos (puede recurrir hipoglucemia)"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u11",
    "capituloId": "c11_01"
  },
  {
    "id": "pralidoxima",
    "nombre": "Pralidoxima",
    "nombreGenerico": "Cloruro de pralidoxima (2-PAM)",
    "nombresComerciales": ["Protopam", "Pralidoxima"],
    "familia": "Antídotos específicos",
    "clasificacion": "Reactivador de colinesterasa",
    "mecanismoAccion": "Oxima que reactiva la acetilcolinesterasa fosforilada por organofosforados, desplazando el grupo fosforilo de la enzima. Debe administrarse antes del 'envejecimiento' (aging) de la unión fosforilo-enzima, que se vuelve irreversible tras horas-días.",
    "indicaciones": ["Intoxicación por organofosforados (insecticidas, agentes nerviosos)", "Siempre junto con atropina en intoxicación por organofosforados"],
    "contraindicaciones": ["Intoxicación por carbamatos (se resuelve sola, pralidoxima no indicada o controversial)", "Hipersensibilidad"],
    "efectosAdversos": ["Mareo", "Visión borrosa", "Cefalea", "Náuseas", "Taquicardia", "Debilidad muscular (dosis altas)", "Laringoespasmo (IV rápida)"],
    "interacciones": ["Atropina: SIEMPRE usar juntas (pralidoxima revierte efecto nicotínico, atropina el muscarínico)", "Barbitúricos: potenciados por organofosforados", "Succinilcolina: contraindicada (metabolismo por colinesterasa inhibida)"],
    "viaAdministracion": ["IV", "IM"],
    "dosis": {
      "adulto": "1-2 g IV en 15-30 min, luego 500 mg/h en infusión continua o repetir 1 g cada 1h según necesidad. IM: 600 mg (autoinyector). Máx: 12 g/día"
    },
    "presentaciones": ["Vial liofilizado 1 g + solvente", "Autoinyector IM 600 mg"],
    "embarazo": "C",
    "lactancia": "Se desconoce excreción. Uso solo en emergencia.",
    "cuidadosEnfermeria": [
      "Administrar lo antes posible (antes del 'envejecimiento' de la unión OF-enzima)",
      "SIEMPRE con atropina (pralidoxima sola es insuficiente)",
      "IV lenta en 15-30 min (infusión rápida causa rigidez muscular, laringoespasmo)",
      "Monitorizar colinesterasa sérica para evaluar reactivación",
      "Continuar tratamiento mientras persistan síntomas colinérgicos",
      "Descontaminación del paciente es prioritaria (ropa, piel, gástrica)",
      "Tener ventilación mecánica disponible"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata. IM: rápida",
      "distribucion": "No cruza BHE significativamente (solo efectos periféricos)",
      "metabolismo": "Hepático parcial",
      "excrecion": "Renal 80-90% en 12h",
      "vidaMedia": "1-3 horas",
      "inicioAccion": "IV: minutos",
      "picoAccion": "5-15 minutos IV",
      "duracionAccion": "Variable (depende de re-inhibición por organofosforado)"
    },
    "almacenamiento": "Temperatura ambiente. Reconstituido: usar inmediatamente.",
    "unidadId": "u11",
    "capituloId": "c11_01"
  },
  {
    "id": "fisostigmina",
    "nombre": "Fisostigmina",
    "nombreGenerico": "Salicilato de fisostigmina",
    "nombresComerciales": ["Antilirium", "Fisostigmina"],
    "familia": "Antídotos específicos",
    "clasificacion": "Inhibidor reversible de acetilcolinesterasa",
    "mecanismoAccion": "Carbamato que inhibe reversiblemente la acetilcolinesterasa central y periférica, aumentando acetilcolina en sinapsis. Revierte el síndrome anticolinérgico central (delirium, agitación, alucinaciones) por su capacidad de cruzar la barrera hematoencefálica.",
    "indicaciones": ["Síndrome anticolinérgico central (delirium anticolinérgico)", "Intoxicación por anticolinérgicos (atropina, escopolamina, difenhidramina)", "Intoxicación por plantas anticolinérgicas (Datura, Brugmansia)"],
    "contraindicaciones": ["Intoxicación por antidepresivos tricíclicos (riesgo de asistolia/convulsiones)", "Bloqueo cardíaco", "Asma", "Obstrucción intestinal/urinaria", "Gangrena"],
    "efectosAdversos": ["Bradicardia (puede ser severa)", "Convulsiones", "Sialorrea", "Broncoespasmo", "Náuseas y vómitos", "Diaforesis", "Fasciculaciones"],
    "interacciones": ["Antidepresivos tricíclicos: CONTRAINDICADO (asistolia)", "Succinilcolina: efecto prolongado", "Otros colinérgicos: efecto aditivo"],
    "viaAdministracion": ["IV", "IM"],
    "dosis": {
      "adulto": "0.5-2 mg IV lento en 5 min (no más de 1 mg/min). Repetir cada 20-30 min si recurrencia. Duración de acción corta: puede ser necesario repetir"
    },
    "presentaciones": ["Ampolla 1 mg/mL (2 mL)"],
    "embarazo": "C",
    "lactancia": "Se desconoce excreción. No recomendado.",
    "cuidadosEnfermeria": [
      "Administración IV MUY LENTA (máx 1 mg/min) para evitar convulsiones",
      "Tener atropina disponible como antídoto de sobredosis de fisostigmina",
      "Monitorización ECG continua OBLIGATORIA",
      "NO usar en sospecha de intoxicación por tricíclicos (QRS ancho)",
      "Efecto dura 30-60 min: estar preparado para repetir dosis",
      "Si bradicardia severa: atropina 0.5 mg IV"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata. IM: rápida",
      "distribucion": "Cruza BHE (ventaja sobre neostigmina). Lipofílica",
      "metabolismo": "Hidrólisis por colinesterasas (rápida)",
      "excrecion": "Renal (metabolitos)",
      "vidaMedia": "20-30 minutos",
      "inicioAccion": "IV: 3-5 minutos",
      "picoAccion": "5-10 minutos",
      "duracionAccion": "30-60 minutos"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u11",
    "capituloId": "c11_01"
  },
  {
    "id": "fomepizol",
    "nombre": "Fomepizol",
    "nombreGenerico": "Fomepizol (4-metilpirazol)",
    "nombresComerciales": ["Antizol", "Fomepizole"],
    "familia": "Antídotos específicos",
    "clasificacion": "Inhibidor de alcohol deshidrogenasa",
    "mecanismoAccion": "Inhibe competitivamente la alcohol deshidrogenasa hepática, enzima responsable del primer paso en el metabolismo de metanol y etilenglicol. Bloquea la formación de metabolitos tóxicos (ácido fórmico del metanol; ácido glicólico y oxálico del etilenglicol).",
    "indicaciones": ["Intoxicación por metanol", "Intoxicación por etilenglicol", "Sospecha de intoxicación por alcoholes tóxicos (osmol gap elevado sin causa clara)"],
    "contraindicaciones": ["Hipersensibilidad a fomepizol o pirazoles"],
    "efectosAdversos": ["Cefalea", "Náuseas", "Mareo", "Eosinofilia", "Rash", "Reacción en sitio de infusión", "Elevación transitoria de transaminasas"],
    "interacciones": ["Etanol: compite por alcohol deshidrogenasa (no usar simultáneamente si se usa fomepizol)", "Hemodiálisis: se elimina por diálisis (ajustar dosis durante HD)"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "Carga: 15 mg/kg IV. Mantenimiento: 10 mg/kg cada 12h x 4 dosis, luego 15 mg/kg cada 12h hasta metanol/etilenglicol <20 mg/dL. Durante hemodiálisis: cada 4h"
    },
    "presentaciones": ["Vial 1 g/mL (1.5 mL)"],
    "embarazo": "C",
    "lactancia": "Se desconoce excreción. Uso solo en emergencia.",
    "cuidadosEnfermeria": [
      "Diluir en 100 mL de SF o D5%, infundir en 30 min",
      "Mantener tratamiento hasta que nivel del tóxico sea <20 mg/dL y paciente asintomático",
      "Más seguro y fácil de usar que etanol IV (alternativa clásica)",
      "Ajustar intervalo a cada 4h si el paciente está en hemodiálisis",
      "Monitorizar gases arteriales, electrolitos, osmolalidad, anion gap",
      "Solicitar niveles de metanol/etilenglicol para guiar duración del tratamiento"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata",
      "distribucion": "Volumen distribución 0.6-0.8 L/kg",
      "metabolismo": "Hepático (CYP2E1, autoinduce su metabolismo tras 30-40h)",
      "excrecion": "Renal 1-3.5% inalterado. Eliminada por hemodiálisis",
      "vidaMedia": "Varía: 3h inicialmente, se prolonga con dosis repetidas",
      "inicioAccion": "Inhibición inmediata de alcohol deshidrogenasa",
      "picoAccion": "1-2 horas",
      "duracionAccion": "12 horas (requiere dosificación regular)"
    },
    "almacenamiento": "Temperatura ambiente. Puede solidificar <25°C (calentar a 30°C para redisolver).",
    "unidadId": "u11",
    "capituloId": "c11_01"
  },
  {
    "id": "hidroxocobalamina_antidoto",
    "nombre": "Hidroxocobalamina (Antídoto)",
    "nombreGenerico": "Hidroxocobalamina",
    "nombresComerciales": ["Cyanokit"],
    "familia": "Antídotos específicos",
    "clasificacion": "Antídoto para intoxicación por cianuro",
    "mecanismoAccion": "Precursor de vitamina B12 con alta afinidad por el ion cianuro. Se une al cianuro libre e intracelular formando cianocobalamina (vitamina B12), compuesto no tóxico que se excreta por vía renal. Cada molécula de hidroxocobalamina neutraliza un ion cianuro.",
    "indicaciones": ["Intoxicación por cianuro (inhalación de humo de incendios)", "Intoxicación por cianuros (industrial, suicida)", "Sospecha de intoxicación por cianuro (acidosis láctica + exposición a humo)"],
    "contraindicaciones": ["No hay contraindicaciones absolutas en intoxicación por cianuro (beneficio supera riesgo)"],
    "efectosAdversos": ["Coloración roja de piel, mucosas y orina (hasta 2-3 semanas)", "Hipertensión transitoria", "Cefalea", "Náuseas", "Interferencia con pruebas de laboratorio colorimétricas", "Reacciones alérgicas (raras)"],
    "interacciones": ["Tiosulfato de sodio: no mezclar en misma vía (formación de complejo). Se pueden usar secuencialmente", "Interfiere con determinaciones de laboratorio por color rojo (glucemia, creatinina, bilirrubina)"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "5 g IV en 15 min (puede repetir 5 g si persistencia de síntomas). Administrar lo antes posible",
      "pediatrico": "70 mg/kg IV (máx 5 g)"
    },
    "presentaciones": ["Kit con vial liofilizado 5 g + 200 mL diluyente (SF)"],
    "embarazo": "C",
    "lactancia": "Uso en emergencia justificado independientemente de lactancia.",
    "cuidadosEnfermeria": [
      "Reconstituir el vial de 5 g con 200 mL de SF, agitar/rotar 60 seg",
      "Infundir en 15 min por vía IV dedicada (color rojo oscuro)",
      "Coloración roja de piel y orina es NORMAL (dura hasta 15 días)",
      "Alertar al laboratorio: interfiere con múltiples determinaciones colorimétricas",
      "Preferido sobre el kit clásico (nitrito de amilo + nitrito de sodio + tiosulfato) en inhalación de humo",
      "Puede usarse en presencia de intoxicación simultánea por CO (no produce metahemoglobinemia)",
      "Uso prehospitalario posible (bomberos)"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata",
      "distribucion": "Se une al cianuro extracelular e intracelular",
      "metabolismo": "Se convierte en cianocobalamina (vitamina B12) al unirse al cianuro",
      "excrecion": "Renal (como cianocobalamina, orina roja)",
      "vidaMedia": "26-31 horas",
      "inicioAccion": "Inmediato (unión al cianuro)",
      "picoAccion": "Final de la infusión",
      "duracionAccion": "Prolongada (quelación irreversible)"
    },
    "almacenamiento": "Temperatura ambiente (hasta 25°C). Proteger de la luz. Reconstituido: usar en 6h.",
    "unidadId": "u11",
    "capituloId": "c11_01"
  },
  {
    "id": "gluconato_calcio",
    "nombre": "Gluconato de Calcio",
    "nombreGenerico": "Gluconato de calcio",
    "nombresComerciales": ["Gluconato de Calcio Northia", "Calcium Gluconate"],
    "familia": "Fármacos de emergencia",
    "clasificacion": "Electrolito / Antídoto",
    "mecanismoAccion": "Aporta calcio iónico que estabiliza el potencial de membrana cardíaca (antagonista del efecto del potasio en el corazón), trata la hipocalcemia y antagoniza los efectos del sulfato de magnesio en sobredosis. Contiene 9.3 mg de calcio elemental por mL (93 mg por ampolla de 10 mL al 10%).",
    "indicaciones": ["Hiperpotasemia severa (estabilización cardíaca)", "Hipocalcemia sintomática (tetania, Chvostek/Trousseau+)", "Sobredosis de sulfato de magnesio", "Intoxicación por bloqueantes de calcio", "Intoxicación por ácido fluorhídrico", "Prevención de hipotensión en transfusión masiva (citrato)"],
    "contraindicaciones": ["Hipercalcemia", "Intoxicación digitálica (riesgo de arritmias)", "Sarcoidosis", "Litiasis renal cálcica recurrente"],
    "efectosAdversos": ["Bradicardia (IV rápida)", "Hipotensión", "Sensación de calor", "Necrosis tisular (extravasación)", "Arritmias (con digoxina)", "Calcinosis (uso prolongado excesivo)"],
    "interacciones": ["Digoxina: el calcio potencia toxicidad digitálica (administrar con extrema precaución)", "Ceftriaxona: NO mezclar (precipitado cálcico potencialmente fatal en neonatos)", "Bicarbonato: incompatible en misma línea (precipita)"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "Hiperpotasemia: 10-20 mL al 10% IV en 2-5 min (puede repetir en 5 min). Hipocalcemia: 10-20 mL al 10% IV en 10 min, luego infusión según calcemia. Antídoto MgSO4: 10 mL al 10% IV lento",
      "pediatrico": "0.5-1 mL/kg IV lento (máx 20 mL)"
    },
    "presentaciones": ["Ampolla 10% x 10 mL (93 mg Ca elemental)", "Ampolla 10% x 5 mL"],
    "embarazo": "C",
    "lactancia": "Compatible. Calcio es componente normal de la leche.",
    "cuidadosEnfermeria": [
      "Administrar IV LENTO (1-2 mL/min) para evitar bradicardia/paro",
      "Preferir gluconato sobre cloruro de calcio en vía periférica (menos irritante)",
      "Si extravasación: DETENER inmediatamente (riesgo de necrosis tisular)",
      "Monitorización ECG durante administración en hiperpotasemia",
      "NO mezclar con bicarbonato ni ceftriaxona en la misma línea",
      "En intoxicación digitálica: usar con extrema precaución o evitar",
      "Verificar permeabilidad de vía venosa antes de cada administración"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata",
      "distribucion": "50% ionizado (activo), 40% unido a proteínas, 10% formando complejos",
      "metabolismo": "No aplica",
      "excrecion": "Renal (filtrado y parcialmente reabsorbido), fecal",
      "vidaMedia": "No aplica (se incorpora al pool de calcio)",
      "inicioAccion": "Inmediato (estabilización cardíaca en 1-3 min)",
      "picoAccion": "Inmediato",
      "duracionAccion": "30-60 minutos (hiperpotasemia)"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u11",
    "capituloId": "c11_02"
  },
  {
    "id": "sulfato_magnesio_emergencia",
    "nombre": "Sulfato de Magnesio (Emergencia)",
    "nombreGenerico": "Sulfato de magnesio heptahidratado",
    "nombresComerciales": ["Sulfato de Magnesio Northia", "MgSO4"],
    "familia": "Fármacos de emergencia",
    "clasificacion": "Electrolito / Antiarrítmico",
    "mecanismoAccion": "Catión divalente que estabiliza membranas excitables, antagoniza calcio en canales de membrana, inhibe la liberación de acetilcolina y reduce la excitabilidad neuromuscular. En torsade de pointes, suprime posdespolarizaciones precoces. En asma, relaja músculo liso bronquial.",
    "indicaciones": ["Torsade de pointes / Taquicardia ventricular polimórfica", "Hipomagnesemia severa sintomática", "Asma severa refractaria (coadyuvante)", "Arritmias asociadas a hipomagnesemia", "Preeclampsia/eclampsia (ver ficha obstétrica aparte)"],
    "contraindicaciones": ["Bloqueo cardíaco", "Miastenia gravis", "Insuficiencia renal severa (excreción comprometida)", "Hipocalcemia severa no corregida"],
    "efectosAdversos": ["Hipotensión (dosis altas/rápidas)", "Bradicardia", "Rubor facial", "Náuseas", "Depresión respiratoria (niveles >7 mEq/L)", "Arreflexia (niveles >10 mEq/L)", "Paro cardíaco (niveles >15 mEq/L)"],
    "interacciones": ["Bloqueantes neuromusculares: potenciación marcada", "Calcioantagonistas: hipotensión y bloqueo neuromuscular aditivos", "Aminoglucósidos: potencia bloqueo neuromuscular", "Digoxina: puede alterar conducción cardíaca"],
    "viaAdministracion": ["IV", "IM"],
    "dosis": {
      "adulto": "Torsade: 1-2 g IV en 1-2 min (emergencia), seguido de 1-2 g/h en infusión. Hipomagnesemia severa: 1-2 g IV en 15-60 min, luego 6 g en 24h. Asma: 2 g IV en 20 min",
      "ajusteRenal": "Reducir dosis y monitorizar magnesemia frecuentemente en IR"
    },
    "presentaciones": ["Ampolla 25% (1 mL = 0.25 g)", "Ampolla 50% (10 mL = 5 g)"],
    "embarazo": "B",
    "lactancia": "Compatible. Se excreta en leche pero pobre absorción oral.",
    "cuidadosEnfermeria": [
      "En torsade: 1-2 g IV en bolo directo (emergencia vital)",
      "Monitorización ECG continua durante administración",
      "ANTÍDOTO: gluconato de calcio 10 mL al 10% IV (tener siempre disponible)",
      "Controlar reflejos rotulianos, FR y diuresis cada hora",
      "Suspender si: FR <12/min, ROT abolidos, diuresis <30 mL/h",
      "Magnesemia terapéutica: 4-7 mEq/L (emergencia), 2-4 mEq/L (reposición)",
      "No mezclar con bicarbonato o fosfatos en misma línea"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata. IM: lenta",
      "distribucion": "50% intracelular, 50% extracelular. No unido a proteínas",
      "metabolismo": "No se metaboliza",
      "excrecion": "Renal 100%",
      "vidaMedia": "Depende de función renal. Normal: horas",
      "inicioAccion": "IV: inmediato. IM: 60 min",
      "picoAccion": "IV: inmediato",
      "duracionAccion": "30 min post-suspensión IV"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u11",
    "capituloId": "c11_02"
  },
  {
    "id": "desferoxamina_antidoto",
    "nombre": "Deferoxamina (Antídoto de Hierro)",
    "nombreGenerico": "Mesilato de deferoxamina",
    "nombresComerciales": ["Desferal"],
    "familia": "Antídotos específicos",
    "clasificacion": "Quelante de hierro (uso como antídoto)",
    "mecanismoAccion": "Sideróforo que se une selectivamente al hierro férrico (Fe3+) libre circulante tras intoxicación aguda por hierro, formando ferrioxamina no tóxica excretada por vía renal. Impide que el hierro libre cause daño oxidativo a mucosa GI, hígado y miocardio.",
    "indicaciones": ["Intoxicación aguda por hierro (hierro sérico >500 mcg/dL o síntomas sistémicos)", "Sospecha de intoxicación severa por hierro con signos de toxicidad sistémica"],
    "contraindicaciones": ["Insuficiencia renal severa con anuria", "Hipersensibilidad"],
    "efectosAdversos": ["Hipotensión (infusión rápida)", "Orina color rosado-rojizo (ferrioxamina, esperado)", "Taquicardia", "Reacciones alérgicas", "SDRA (infusiones prolongadas >24h a dosis altas)"],
    "interacciones": ["Vitamina C: puede aumentar toxicidad del hierro en fase aguda (no administrar)", "Proclorperazina: riesgo de coma"],
    "viaAdministracion": ["IV", "IM"],
    "dosis": {
      "adulto": "15 mg/kg/h IV en infusión continua (máx 6-8 g/día). IM: 1-2 g si no hay acceso IV. Continuar hasta que hierro sérico <350 mcg/dL y orina pierda color rosado"
    },
    "presentaciones": ["Vial liofilizado 500 mg", "Vial liofilizado 2 g"],
    "embarazo": "C",
    "lactancia": "No recomendado. Uso solo en emergencia.",
    "cuidadosEnfermeria": [
      "Infusión IV continua (NUNCA bolo). Velocidad máx 15 mg/kg/h",
      "La orina rosada-rojiza confirma quelación efectiva",
      "No continuar infusión >24h si es posible (riesgo de SDRA)",
      "Monitorizar PA durante infusión (hipotensión)",
      "Radiografía abdominal: las tabletas de hierro son radioopacas",
      "Considerar lavado intestinal total con PEG si tabletas visibles en Rx"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata. IM: buena absorción",
      "distribucion": "Se une al hierro libre circulante",
      "metabolismo": "Formación de ferrioxamina",
      "excrecion": "Renal (ferrioxamina) y biliar",
      "vidaMedia": "20-30 minutos",
      "inicioAccion": "Inmediato (quelación del hierro libre)",
      "picoAccion": "Durante infusión",
      "duracionAccion": "Durante infusión"
    },
    "almacenamiento": "Temperatura ambiente. Reconstituido: usar dentro de 24h.",
    "unidadId": "u11",
    "capituloId": "c11_01"
  }
]

# No new chapters needed for u11
NEW_CHAPTERS = []

# Drugs to add to EXISTING chapters
EXISTING_CHAPTER_ADDITIONS = {
    "c11_01": ["dimercaprol", "edetato_calcico", "azul_metileno", "glucosa_hipertonica", "pralidoxima", "fisostigmina", "fomepizol", "hidroxocobalamina_antidoto", "desferoxamina_antidoto"],
    "c11_02": ["gluconato_calcio", "sulfato_magnesio_emergencia"],
}

# Pathology links
PATHOLOGY_LINKS = {
    "pat_shock_anafilactico": ["gluconato_calcio", "glucosa_hipertonica"],
    "pat_status_epileptico": ["sulfato_magnesio_emergencia", "glucosa_hipertonica"],
}

def main():
    print("=== Generating u11 drugs ===")
    added = add_drugs_to_file(NEW_DRUGS)

    cats = load_categories()
    for ch in NEW_CHAPTERS:
        add_chapter(cats, "u11", ch)
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
