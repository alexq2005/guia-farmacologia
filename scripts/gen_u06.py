#!/usr/bin/env python3
"""Generate new drugs for u06 - Sistema Endocrino (17→38)."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from drug_helper import *

NEW_DRUGS = [
  {
    "id": "dapagliflozina",
    "nombre": "Dapagliflozina",
    "nombreGenerico": "Dapagliflozina",
    "nombresComerciales": ["Forxiga", "Farxiga", "Dapagliflozina Elea"],
    "familia": "Antidiabéticos orales",
    "clasificacion": "Inhibidor del SGLT2",
    "mecanismoAccion": "Inhibe selectivamente el cotransportador sodio-glucosa tipo 2 (SGLT2) en el túbulo proximal renal, reduciendo la reabsorción de glucosa filtrada y provocando glucosuria. Esto reduce la glucemia de forma independiente de insulina. Además produce natriuresis y diuresis osmótica con beneficios cardiorrenal.",
    "indicaciones": ["Diabetes mellitus tipo 2", "Insuficiencia cardíaca con fracción de eyección reducida", "Enfermedad renal crónica", "Reducción de riesgo cardiovascular en DM2"],
    "contraindicaciones": ["Diabetes mellitus tipo 1", "Cetoacidosis diabética", "Insuficiencia renal severa (TFGe <25 para inicio)", "Hipersensibilidad"],
    "efectosAdversos": ["Infecciones genitourinarias (candidiasis)", "Infección urinaria", "Poliuria", "Hipotensión", "Cetoacidosis diabética euglucémica (rara)", "Deshidratación", "Gangrena de Fournier (muy rara)"],
    "interacciones": ["Diuréticos de asa: deshidratación e hipotensión aditiva", "Insulina/sulfonilureas: riesgo de hipoglucemia (reducir dosis)", "Litio: puede alterar excreción renal"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "DM2: 10 mg/día. IC/ERC: 10 mg/día. No requiere titulación",
      "ajusteRenal": "No iniciar si TFGe <25. Continuar hasta diálisis si ya iniciado",
      "ajusteHepatico": "Precaución en insuficiencia hepática severa"
    },
    "presentaciones": ["Comprimidos 5 mg", "Comprimidos 10 mg"],
    "embarazo": "D",
    "lactancia": "No recomendado. Se desconoce excreción en leche.",
    "cuidadosEnfermeria": [
      "Evaluar función renal antes de iniciar y periódicamente",
      "Educar sobre signos de infección genital (prurito, flujo)",
      "Monitorizar PA (efecto diurético/natriurético)",
      "Asegurar hidratación adecuada, especialmente en ancianos",
      "Vigilar signos de cetoacidosis incluso con glucemia normal",
      "Suspender temporalmente ante cirugía, ayuno prolongado o enfermedad intercurrente",
      "No usar para DM1"
    ],
    "farmacocinetica": {
      "absorcion": "Oral rápida, biodisponibilidad 78%",
      "distribucion": "Unión proteica 91%",
      "metabolismo": "Hepático por UGT1A9 (glucuronidación)",
      "excrecion": "Renal 75%, fecal 21%",
      "vidaMedia": "12.9 horas",
      "inicioAccion": "2 horas",
      "picoAccion": "2 horas",
      "duracionAccion": "24 horas"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u06",
    "capituloId": "c06_01"
  },
  {
    "id": "liraglutida",
    "nombre": "Liraglutida",
    "nombreGenerico": "Liraglutida",
    "nombresComerciales": ["Victoza", "Saxenda"],
    "familia": "Antidiabéticos inyectables",
    "clasificacion": "Agonista del receptor de GLP-1",
    "mecanismoAccion": "Análogo de GLP-1 humano con 97% de homología. Se une al receptor de GLP-1 estimulando la secreción de insulina y suprimiendo glucagón de forma glucosa-dependiente. Retarda el vaciamiento gástrico, aumenta la saciedad central y reduce la ingesta calórica.",
    "indicaciones": ["Diabetes mellitus tipo 2 (control glucémico)", "Obesidad/sobrepeso con comorbilidades (Saxenda)", "Reducción de riesgo cardiovascular en DM2"],
    "contraindicaciones": ["Antecedente personal o familiar de carcinoma medular de tiroides", "Neoplasia endocrina múltiple tipo 2", "Pancreatitis aguda", "Hipersensibilidad"],
    "efectosAdversos": ["Náuseas (frecuente, transitoria)", "Vómitos", "Diarrea", "Cefalea", "Pancreatitis (rara)", "Colelitiasis", "Hipoglucemia (con sulfonilureas)", "Reacciones en sitio de inyección"],
    "interacciones": ["Insulina/sulfonilureas: mayor riesgo hipoglucemia (reducir dosis)", "Anticoagulantes orales: controlar INR (retardo vaciamiento gástrico)", "Medicamentos orales: retardo de absorción por enlentecimiento gástrico"],
    "viaAdministracion": ["SC"],
    "dosis": {
      "adulto": "DM2: inicio 0.6 mg/día SC x 1 semana, luego 1.2 mg/día. Máx: 1.8 mg/día. Obesidad (Saxenda): inicio 0.6 mg/día, titular semanalmente hasta 3 mg/día"
    },
    "presentaciones": ["Pluma prellenada 6 mg/mL (Victoza)", "Pluma prellenada 6 mg/mL (Saxenda, 3 mL)"],
    "embarazo": "C",
    "lactancia": "No recomendado. Se desconoce excreción en leche humana.",
    "cuidadosEnfermeria": [
      "Enseñar técnica de inyección SC (abdomen, muslo, brazo)",
      "Titular gradualmente para minimizar náuseas",
      "Administrar a cualquier hora del día, independiente de comidas",
      "Rotar sitios de inyección",
      "Educar sobre signos de pancreatitis: dolor abdominal intenso persistente",
      "Control de HbA1c cada 3 meses",
      "Monitorizar pérdida de peso y estado nutricional"
    ],
    "farmacocinetica": {
      "absorcion": "SC: biodisponibilidad 55%",
      "distribucion": "Unión proteica >98%. Volumen distribución 0.07 L/kg",
      "metabolismo": "Degradación endógena similar a proteínas grandes (DPP-4, NEP)",
      "excrecion": "Renal 6%, fecal 5% (como metabolitos)",
      "vidaMedia": "13 horas",
      "inicioAccion": "1-2 horas",
      "picoAccion": "8-12 horas",
      "duracionAccion": "24 horas"
    },
    "almacenamiento": "Refrigerar 2-8°C antes de abrir. En uso: TA hasta 30 días.",
    "unidadId": "u06",
    "capituloId": "c06_01"
  },
  {
    "id": "semaglutida",
    "nombre": "Semaglutida",
    "nombreGenerico": "Semaglutida",
    "nombresComerciales": ["Ozempic", "Rybelsus", "Wegovy"],
    "familia": "Antidiabéticos",
    "clasificacion": "Agonista del receptor de GLP-1",
    "mecanismoAccion": "Análogo de GLP-1 con modificación estructural que le confiere resistencia a la degradación por DPP-4 y unión a albúmina, prolongando su vida media. Estimula secreción de insulina, suprime glucagón (glucosa-dependiente), retarda vaciamiento gástrico y reduce apetito central.",
    "indicaciones": ["Diabetes mellitus tipo 2", "Obesidad/sobrepeso con comorbilidades (Wegovy)", "Reducción de riesgo cardiovascular en DM2"],
    "contraindicaciones": ["Antecedente personal/familiar de carcinoma medular de tiroides", "Neoplasia endocrina múltiple tipo 2", "Pancreatitis", "Hipersensibilidad"],
    "efectosAdversos": ["Náuseas", "Vómitos", "Diarrea", "Estreñimiento", "Dolor abdominal", "Pancreatitis (rara)", "Retinopatía diabética (empeoramiento transitorio)", "Colelitiasis"],
    "interacciones": ["Insulina/sulfonilureas: reducir dosis (riesgo hipoglucemia)", "Warfarina: monitorizar INR", "Fármacos orales de absorción dependiente de velocidad: enlentecimiento gástrico"],
    "viaAdministracion": ["SC", "oral"],
    "dosis": {
      "adulto": "SC: inicio 0.25 mg/semana x 4 sem, luego 0.5 mg/semana. Máx: 2 mg/semana (Ozempic). Oral: inicio 3 mg/día x 30 días, luego 7 mg/día. Máx: 14 mg/día. Obesidad: titular hasta 2.4 mg SC/semana (Wegovy)"
    },
    "presentaciones": ["Pluma prellenada 0.25/0.5 mg (Ozempic)", "Pluma prellenada 1 mg (Ozempic)", "Comprimidos 3, 7, 14 mg (Rybelsus)", "Pluma prellenada 2.4 mg (Wegovy)"],
    "embarazo": "X",
    "lactancia": "No recomendado.",
    "cuidadosEnfermeria": [
      "SC: administrar una vez por semana, el mismo día de la semana",
      "Oral: tomar en ayunas con máx 120 mL de agua, 30 min antes de cualquier alimento o medicación",
      "Titular gradualmente para minimizar efectos GI",
      "Enseñar técnica de inyección SC y rotación de sitios",
      "Vigilar signos de pancreatitis y colelitiasis",
      "Control oftalmológico en pacientes con retinopatía preexistente",
      "Suspender al menos 2 meses antes de embarazo planificado"
    ],
    "farmacocinetica": {
      "absorcion": "SC: biodisponibilidad 89%. Oral: 0.4-1% (con potenciador SNAC)",
      "distribucion": "Unión proteica >99% (albúmina). Volumen distribución 0.07 L/kg",
      "metabolismo": "Proteolisis y beta-oxidación del ácido graso",
      "excrecion": "Renal 36%, fecal 48%",
      "vidaMedia": "Aproximadamente 1 semana (168 horas)",
      "inicioAccion": "SC: 1-3 días",
      "picoAccion": "SC: 1-3 días",
      "duracionAccion": "7 días (SC)"
    },
    "almacenamiento": "Refrigerar 2-8°C. En uso: TA hasta 56 días (pluma).",
    "unidadId": "u06",
    "capituloId": "c06_01"
  },
  {
    "id": "pioglitazona",
    "nombre": "Pioglitazona",
    "nombreGenerico": "Clorhidrato de pioglitazona",
    "nombresComerciales": ["Actos", "Pioglitazona Gador", "Zactos"],
    "familia": "Antidiabéticos orales",
    "clasificacion": "Tiazolidinediona (agonista PPARγ)",
    "mecanismoAccion": "Agonista selectivo del receptor nuclear PPARγ (receptor activado por proliferadores de peroxisomas gamma). Aumenta la sensibilidad a la insulina en tejido adiposo, músculo esquelético e hígado, mejorando la captación y utilización de glucosa. Reduce la resistencia a la insulina periférica y hepática.",
    "indicaciones": ["Diabetes mellitus tipo 2 (monoterapia o combinación)", "Resistencia a la insulina"],
    "contraindicaciones": ["Insuficiencia cardíaca clase III-IV NYHA", "Hepatopatía activa (transaminasas >2.5x LSN)", "Cáncer de vejiga activo o antecedente", "Embarazo"],
    "efectosAdversos": ["Aumento de peso", "Edema periférico", "Retención hídrica", "Insuficiencia cardíaca (agravamiento)", "Fracturas distales en mujeres", "Anemia dilucional", "Hepatotoxicidad (rara)", "Aumento de riesgo de cáncer de vejiga (debatido)"],
    "interacciones": ["Insulina: mayor riesgo de edema e IC", "Inhibidores CYP2C8 (gemfibrozilo): aumentan niveles de pioglitazona", "Inductores CYP2C8 (rifampicina): reducen efecto"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Inicio: 15-30 mg/día. Máx: 45 mg/día. Con insulina: 15-30 mg/día (reducir insulina si hipoglucemia)"
    },
    "presentaciones": ["Comprimidos 15, 30, 45 mg"],
    "embarazo": "C",
    "lactancia": "No recomendado. Se excreta en leche en modelos animales.",
    "cuidadosEnfermeria": [
      "Evaluar función hepática antes de iniciar y periódicamente",
      "Controlar peso y signos de retención hídrica (edemas, disnea)",
      "Contraindicado en IC clase III-IV NYHA",
      "El efecto máximo tarda 8-12 semanas (no aumentar dosis precozmente)",
      "Vigilar signos de hematuria (riesgo de cáncer vesical)",
      "Monitorizar densidad ósea en mujeres posmenopáusicas",
      "Administrar con o sin alimentos"
    ],
    "farmacocinetica": {
      "absorcion": "Oral rápida, biodisponibilidad >80%",
      "distribucion": "Unión proteica >99% (albúmina)",
      "metabolismo": "Hepático CYP2C8 y CYP3A4. Metabolitos M-III y M-IV activos",
      "excrecion": "Fecal 55%, renal 45%",
      "vidaMedia": "3-7 horas (pioglitazona). Metabolitos activos: 16-24 horas",
      "inicioAccion": "Días-semanas",
      "picoAccion": "2 horas (nivel plasmático)",
      "duracionAccion": "24 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de humedad.",
    "unidadId": "u06",
    "capituloId": "c06_01"
  },
  {
    "id": "acarbosa",
    "nombre": "Acarbosa",
    "nombreGenerico": "Acarbosa",
    "nombresComerciales": ["Glucobay", "Acarbosa Roemmers"],
    "familia": "Antidiabéticos orales",
    "clasificacion": "Inhibidor de alfa-glucosidasas intestinales",
    "mecanismoAccion": "Inhibe competitiva y reversiblemente las alfa-glucosidasas del borde en cepillo del intestino delgado (maltasa, sacarasa, glucoamilasa). Retarda la digestión de carbohidratos complejos a monosacáridos, reduciendo la hiperglucemia postprandial sin estimular secreción de insulina.",
    "indicaciones": ["Diabetes mellitus tipo 2 (hiperglucemia postprandial)", "Prediabetes (prevención de DM2)", "Síndrome de dumping"],
    "contraindicaciones": ["Enfermedad inflamatoria intestinal", "Obstrucción intestinal", "Cirrosis hepática", "Insuficiencia renal severa (CrCl <25)", "Cetoacidosis diabética"],
    "efectosAdversos": ["Flatulencia (frecuente)", "Distensión abdominal", "Diarrea", "Dolor abdominal", "Elevación de transaminasas (dosis altas)", "Hipoglucemia rara en monoterapia"],
    "interacciones": ["Enzimas digestivas (pancreatina): reducen eficacia de acarbosa", "Carbón activado: reduce eficacia", "Insulina/sulfonilureas: si hipoglucemia, tratar con GLUCOSA (no sacarosa)"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Inicio: 25 mg con primer bocado de cada comida principal. Titular cada 4-8 semanas. Mantenimiento: 50-100 mg/3 veces al día. Máx: 100 mg/3 veces al día"
    },
    "presentaciones": ["Comprimidos 50 mg", "Comprimidos 100 mg"],
    "embarazo": "B",
    "lactancia": "No recomendado. Datos insuficientes.",
    "cuidadosEnfermeria": [
      "Tomar con el PRIMER BOCADO de cada comida principal",
      "Titular lentamente para reducir flatulencia",
      "IMPORTANTE: si hipoglucemia (con insulina/SU), tratar con GLUCOSA PURA, no sacarosa",
      "Educar sobre efectos GI: son frecuentes pero mejoran con el tiempo",
      "Control de glucemia postprandial para evaluar eficacia",
      "Hepatograma basal y cada 3 meses el primer año"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: 1-2% como molécula intacta. Metabolitos absorbidos 35%",
      "distribucion": "Actúa localmente en luz intestinal",
      "metabolismo": "Intestinal (bacterias) y amilasa pancreática",
      "excrecion": "Fecal 51% (inalterada), renal 34%",
      "vidaMedia": "2 horas",
      "inicioAccion": "Con la comida",
      "picoAccion": "1 hora",
      "duracionAccion": "Durante la digestión del bolo alimenticio"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de humedad.",
    "unidadId": "u06",
    "capituloId": "c06_01"
  },
  {
    "id": "glimepirida",
    "nombre": "Glimepirida",
    "nombreGenerico": "Glimepirida",
    "nombresComerciales": ["Amaryl", "Glimepirida Gador", "Endial"],
    "familia": "Antidiabéticos orales",
    "clasificacion": "Sulfonilurea de tercera generación",
    "mecanismoAccion": "Se une a la subunidad SUR1 del canal de potasio dependiente de ATP (KATP) en las células beta pancreáticas, provocando su cierre. Esto despolariza la célula, abre canales de calcio y estimula la exocitosis de insulina. Menor riesgo de hipoglucemia y menor aumento de peso que glibenclamida.",
    "indicaciones": ["Diabetes mellitus tipo 2 (cuando dieta y ejercicio son insuficientes)", "DM2 en combinación con metformina o insulina"],
    "contraindicaciones": ["Diabetes tipo 1", "Cetoacidosis diabética", "Insuficiencia renal o hepática severa", "Embarazo y lactancia", "Hipersensibilidad a sulfonamidas"],
    "efectosAdversos": ["Hipoglucemia", "Aumento de peso", "Náuseas", "Mareo", "Reacciones cutáneas", "Hiponatremia (rara)", "Alteraciones hematológicas (raras)"],
    "interacciones": ["AINEs, fibratos, fluconazol: potencian hipoglucemia", "Rifampicina, fenitoína: reducen efecto hipoglucemiante", "Betabloqueantes: enmascaran síntomas de hipoglucemia", "Alcohol: potencia hipoglucemia"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Inicio: 1 mg/día con desayuno. Titular cada 1-2 semanas. Mantenimiento: 1-4 mg/día. Máx: 6 mg/día (según país, hasta 8 mg)",
      "ajusteRenal": "Inicio con 1 mg. Contraindicada en severa",
      "ajusteHepatico": "Inicio con 1 mg. Contraindicada en severa"
    },
    "presentaciones": ["Comprimidos 1, 2, 4 mg"],
    "embarazo": "C",
    "lactancia": "Contraindicado. Se excreta en leche.",
    "cuidadosEnfermeria": [
      "Tomar con el desayuno o primera comida principal",
      "Educar sobre signos de hipoglucemia: sudoración, temblor, confusión",
      "Siempre llevar fuente de glucosa rápida",
      "Monitorizar glucemia capilar regularmente",
      "No omitir comidas durante el tratamiento",
      "Precaución con actividad física intensa (riesgo de hipoglucemia)"
    ],
    "farmacocinetica": {
      "absorcion": "Oral completa, biodisponibilidad 100%",
      "distribucion": "Unión proteica >99.5%",
      "metabolismo": "Hepático CYP2C9 a metabolito hidroxi (activo) y carboxi (inactivo)",
      "excrecion": "Renal 58%, fecal 35%",
      "vidaMedia": "5-8 horas",
      "inicioAccion": "1 hora",
      "picoAccion": "2-3 horas",
      "duracionAccion": "24 horas"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u06",
    "capituloId": "c06_01"
  },
  {
    "id": "gliclazida",
    "nombre": "Gliclazida",
    "nombreGenerico": "Gliclazida",
    "nombresComerciales": ["Diamicron", "Diamicron MR", "Gliclazida Northia"],
    "familia": "Antidiabéticos orales",
    "clasificacion": "Sulfonilurea de segunda generación",
    "mecanismoAccion": "Se une a receptores SUR1 de canales KATP en células beta pancreáticas con selectividad por los canales pancreáticos (menor afinidad por los cardiovasculares). Estimula la secreción de insulina. Presenta propiedades antioxidantes y antiagregantes plaquetarias adicionales.",
    "indicaciones": ["Diabetes mellitus tipo 2", "DM2 en combinación con metformina"],
    "contraindicaciones": ["Diabetes tipo 1", "Cetoacidosis diabética", "Insuficiencia hepática severa", "Insuficiencia renal severa", "Hipersensibilidad a sulfonamidas"],
    "efectosAdversos": ["Hipoglucemia (menor que glibenclamida)", "Aumento de peso (moderado)", "Trastornos GI", "Reacciones cutáneas (raras)", "Alteraciones hematológicas (raras)"],
    "interacciones": ["Miconazol: hipoglucemia severa (contraindicado)", "Fenilbutazona: potencia efecto", "Alcohol: potencia hipoglucemia", "Fluconazol: aumenta niveles de gliclazida"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Liberación estándar: 40-80 mg con desayuno, máx 320 mg/día en 2 tomas. Liberación modificada (MR): 30 mg/día con desayuno, máx 120 mg/día"
    },
    "presentaciones": ["Comprimidos 80 mg", "Comprimidos liberación modificada 30, 60 mg (MR)"],
    "embarazo": "C",
    "lactancia": "No recomendado.",
    "cuidadosEnfermeria": [
      "MR: tragar entero, no partir ni triturar",
      "Tomar con el desayuno",
      "Educar sobre hipoglucemia: signos y tratamiento",
      "Control glucémico regular y HbA1c cada 3 meses",
      "Menor riesgo de hipoglucemia que glibenclamida (preferida en ancianos)",
      "No combinar con miconazol oral"
    ],
    "farmacocinetica": {
      "absorcion": "Oral completa. MR: absorción prolongada",
      "distribucion": "Unión proteica 85-97%",
      "metabolismo": "Hepático CYP2C9 (metabolitos inactivos)",
      "excrecion": "Renal 60-70%, fecal 10-20%",
      "vidaMedia": "10-12 horas. MR: 16 horas",
      "inicioAccion": "Estándar: 30-60 min. MR: 2-3 horas",
      "picoAccion": "Estándar: 2-6h. MR: 6-12h",
      "duracionAccion": "Estándar: 12-24h. MR: 24h"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u06",
    "capituloId": "c06_01"
  },
  {
    "id": "canagliflozina",
    "nombre": "Canagliflozina",
    "nombreGenerico": "Canagliflozina",
    "nombresComerciales": ["Invokana", "Sulisent"],
    "familia": "Antidiabéticos orales",
    "clasificacion": "Inhibidor del SGLT2",
    "mecanismoAccion": "Inhibe el cotransportador sodio-glucosa tipo 2 (SGLT2) en el túbulo proximal renal, reduciendo la reabsorción renal de glucosa. También tiene cierta inhibición de SGLT1 intestinal a dosis altas. Produce glucosuria, diuresis osmótica y natriuresis con beneficios cardiovasculares y renales.",
    "indicaciones": ["Diabetes mellitus tipo 2", "Reducción de riesgo cardiovascular en DM2 con enfermedad CV establecida", "Nefropatía diabética"],
    "contraindicaciones": ["Diabetes tipo 1", "Cetoacidosis diabética", "TFGe <30 mL/min (para inicio en DM2)", "Hipersensibilidad"],
    "efectosAdversos": ["Infecciones genitourinarias micóticas", "Poliuria", "Hipotensión/deshidratación", "Cetoacidosis euglucémica (rara)", "Amputaciones de miembros inferiores (riesgo aumentado)", "Fracturas (en riesgo)", "Gangrena de Fournier (muy rara)"],
    "interacciones": ["Diuréticos: hipotensión y deshidratación aditiva", "Insulina/sulfonilureas: reducir dosis (hipoglucemia)", "Digoxina: aumento leve de niveles", "Rifampicina: reduce niveles de canagliflozina"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Inicio: 100 mg/día antes del desayuno. Puede aumentar a 300 mg/día si tolera y TFGe ≥60",
      "ajusteRenal": "TFGe 30-60: limitar a 100 mg/día. TFGe <30: no iniciar"
    },
    "presentaciones": ["Comprimidos 100, 300 mg"],
    "embarazo": "D",
    "lactancia": "No recomendado.",
    "cuidadosEnfermeria": [
      "Evaluar función renal y estado de hidratación antes de iniciar",
      "Tomar antes del desayuno",
      "Educar sobre higiene genital para prevenir infecciones micóticas",
      "Evaluar pies regularmente (riesgo de amputación, especialmente con neuropatía)",
      "Suspender ante cirugía mayor o enfermedad aguda (cetoacidosis)",
      "Monitorizar PA y electrolitos",
      "Asegurar ingesta hídrica adecuada"
    ],
    "farmacocinetica": {
      "absorcion": "Oral, biodisponibilidad 65%",
      "distribucion": "Unión proteica 99% (albúmina)",
      "metabolismo": "Hepático por UGT1A9, UGT2B4 (glucuronidación) y CYP3A4 (menor)",
      "excrecion": "Fecal 41.5%, renal 33%",
      "vidaMedia": "10.6-13.1 horas",
      "inicioAccion": "1-2 horas",
      "picoAccion": "1-2 horas",
      "duracionAccion": "24 horas"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u06",
    "capituloId": "c06_01"
  },
  {
    "id": "linagliptina",
    "nombre": "Linagliptina",
    "nombreGenerico": "Linagliptina",
    "nombresComerciales": ["Tradjenta", "Trayenta"],
    "familia": "Antidiabéticos orales",
    "clasificacion": "Inhibidor de la DPP-4 (gliptina)",
    "mecanismoAccion": "Inhibe de forma reversible la enzima dipeptidil peptidasa-4 (DPP-4), que degrada las incretinas GLP-1 y GIP. Al aumentar los niveles de incretinas intactas, se estimula la secreción de insulina y se suprime el glucagón de forma glucosa-dependiente. Eliminación no renal (ventaja en ERC).",
    "indicaciones": ["Diabetes mellitus tipo 2 (monoterapia o combinación)", "DM2 con enfermedad renal crónica (cualquier estadio)"],
    "contraindicaciones": ["Hipersensibilidad", "Diabetes tipo 1", "Cetoacidosis diabética", "Antecedente de pancreatitis con DPP-4i"],
    "efectosAdversos": ["Nasofaringitis", "Hipoglucemia (con sulfonilureas)", "Artralgia", "Pancreatitis (rara)", "Reacciones de hipersensibilidad (raras)", "Penfigoide ampolloso (raro)"],
    "interacciones": ["Rifampicina: reduce eficacia de linagliptina", "Sulfonilureas/insulina: reducir dosis (riesgo hipoglucemia)", "No interacciones significativas con otros antidiabéticos orales"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "5 mg/día. No requiere ajuste renal ni hepático"
    },
    "presentaciones": ["Comprimidos 5 mg"],
    "embarazo": "B",
    "lactancia": "No recomendado. Se desconoce excreción en leche.",
    "cuidadosEnfermeria": [
      "Puede tomarse con o sin alimentos, a cualquier hora",
      "No requiere ajuste de dosis en insuficiencia renal (única gliptina)",
      "Vigilar signos de pancreatitis: dolor abdominal persistente",
      "Bajo riesgo de hipoglucemia en monoterapia",
      "Control de HbA1c cada 3 meses",
      "Informar sobre reacciones cutáneas (penfigoide: ampollas)"
    ],
    "farmacocinetica": {
      "absorcion": "Oral, biodisponibilidad aproximadamente 30%",
      "distribucion": "Unión proteica 70-80% (concentración-dependiente)",
      "metabolismo": "Mínimo. CYP3A4 (vía menor)",
      "excrecion": "Fecal 80%, renal 5% (eliminación NO renal)",
      "vidaMedia": "Terminal >100 horas (acumulación efectiva 12h)",
      "inicioAccion": "1-2 horas",
      "picoAccion": "1.5 horas",
      "duracionAccion": "24 horas"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u06",
    "capituloId": "c06_01"
  },
  {
    "id": "vildagliptina",
    "nombre": "Vildagliptina",
    "nombreGenerico": "Vildagliptina",
    "nombresComerciales": ["Galvus", "Jalra"],
    "familia": "Antidiabéticos orales",
    "clasificacion": "Inhibidor de la DPP-4 (gliptina)",
    "mecanismoAccion": "Inhibe la enzima DPP-4 de forma selectiva y reversible, aumentando las concentraciones de GLP-1 y GIP activos. Esto mejora la sensibilidad de las células beta al estímulo de glucosa, aumenta la secreción de insulina y reduce la liberación de glucagón de forma glucosa-dependiente.",
    "indicaciones": ["Diabetes mellitus tipo 2 (monoterapia o combinación con metformina, SU, TZD o insulina)"],
    "contraindicaciones": ["Hipersensibilidad", "Insuficiencia hepática (incluye ALT o AST >3x LSN)", "Diabetes tipo 1", "Cetoacidosis diabética"],
    "efectosAdversos": ["Cefalea", "Mareo", "Temblor", "Nasofaringitis", "Elevación de transaminasas", "Edema periférico (con TZD)", "Pancreatitis (rara)", "Angioedema (raro)"],
    "interacciones": ["IECA (enalapril, ramipril): mayor riesgo de angioedema", "Sulfonilureas: reducir dosis de SU", "No interacciones farmacocinéticas significativas"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "50 mg cada 12h (con metformina) o 50 mg/día (con SU o insulina). Máx: 100 mg/día",
      "ajusteRenal": "CrCl <50: 50 mg/día. No recomendado en diálisis",
      "ajusteHepatico": "Contraindicada si ALT/AST >3x LSN"
    },
    "presentaciones": ["Comprimidos 50 mg"],
    "embarazo": "C",
    "lactancia": "No recomendado.",
    "cuidadosEnfermeria": [
      "Hepatograma antes de iniciar, cada 3 meses el primer año, luego periódico",
      "Suspender si ALT/AST >3x LSN confirmado",
      "Puede tomarse con o sin alimentos",
      "Bajo riesgo de hipoglucemia en monoterapia",
      "Informar sobre signos de disfunción hepática: ictericia, coluria",
      "No combinar con sitagliptina u otra gliptina"
    ],
    "farmacocinetica": {
      "absorcion": "Oral rápida, biodisponibilidad 85%",
      "distribucion": "Unión proteica 9.3% (baja)",
      "metabolismo": "Hepático por hidrólisis (no CYP). Metabolito principal inactivo",
      "excrecion": "Renal 85% (23% inalterada)",
      "vidaMedia": "2-3 horas (pero inhibición DPP-4 >24h)",
      "inicioAccion": "1 hora",
      "picoAccion": "1.7 horas",
      "duracionAccion": "12-24 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de humedad.",
    "unidadId": "u06",
    "capituloId": "c06_01"
  },
  {
    "id": "insulina_detemir",
    "nombre": "Insulina Detemir",
    "nombreGenerico": "Insulina detemir (ADN recombinante)",
    "nombresComerciales": ["Levemir", "Levemir FlexPen"],
    "familia": "Insulinas",
    "clasificacion": "Insulina de acción prolongada (análogo basal)",
    "mecanismoAccion": "Análogo de insulina humana con ácido mirístico unido a Lys B29 y deleción de Thr B30. Se une reversiblemente a albúmina en SC y en sangre, prolongando su absorción y acción. Imita la secreción basal de insulina. Menor variabilidad intra-individual y menor ganancia ponderal que NPH.",
    "indicaciones": ["Diabetes mellitus tipo 1", "Diabetes mellitus tipo 2 (insulina basal)", "Diabetes gestacional (si se requiere insulina basal)"],
    "contraindicaciones": ["Hipoglucemia", "Hipersensibilidad"],
    "efectosAdversos": ["Hipoglucemia", "Reacciones en sitio de inyección", "Lipodistrofia", "Alergia (rara)", "Edema (inicio de insulina)", "Menor ganancia de peso que NPH"],
    "interacciones": ["Betabloqueantes: enmascaran hipoglucemia", "Corticoides: aumentan glucemia (ajustar dosis)", "Tiazolidinedionas: mayor riesgo de edema e IC", "Alcohol: potencia hipoglucemia"],
    "viaAdministracion": ["SC"],
    "dosis": {
      "adulto": "DM1: Basal-bolo: 50% de dosis total como detemir 1-2 veces/día. DM2: inicio 10 UI/día o 0.1-0.2 UI/kg/día, titular según glucemia en ayunas",
      "pediatrico": "Desde 1 año. Misma dosificación individualizada"
    },
    "presentaciones": ["FlexPen 100 UI/mL (3 mL)", "Vial 100 UI/mL (10 mL)"],
    "embarazo": "B",
    "lactancia": "Compatible. No se absorbe oralmente por el lactante.",
    "cuidadosEnfermeria": [
      "Administrar SC en muslo, abdomen o deltoides",
      "Puede requerir 1-2 inyecciones diarias (según respuesta)",
      "NO mezclar con otras insulinas en la misma jeringa",
      "Rotar sitios de inyección (prevenir lipodistrofia)",
      "Menor riesgo de hipoglucemia nocturna que NPH",
      "Aspecto transparente (no agitar, a diferencia de NPH)",
      "Enseñar automonitoreo glucémico"
    ],
    "farmacocinetica": {
      "absorcion": "SC lenta, unión a albúmina prolonga absorción",
      "distribucion": "Unión a albúmina >98%",
      "metabolismo": "Similar a insulina endógena (proteasas)",
      "excrecion": "Renal",
      "vidaMedia": "5-7 horas (pero duración clínica mayor por unión a albúmina)",
      "inicioAccion": "1-2 horas",
      "picoAccion": "6-8 horas (relativamente plano)",
      "duracionAccion": "Hasta 24 horas (dosis-dependiente)"
    },
    "almacenamiento": "Refrigerar 2-8°C. En uso: TA máx 42 días.",
    "unidadId": "u06",
    "capituloId": "c06_01"
  },
  {
    "id": "insulina_aspart",
    "nombre": "Insulina Aspart",
    "nombreGenerico": "Insulina aspart (ADN recombinante)",
    "nombresComerciales": ["NovoRapid", "NovoRapid FlexPen", "Fiasp"],
    "familia": "Insulinas",
    "clasificacion": "Insulina de acción ultrarrápida (análogo prandial)",
    "mecanismoAccion": "Análogo de insulina humana con sustitución de Pro B28 por Asp. Esto reduce la tendencia a la autoasociación, acelerando la absorción SC. Reproduce el pico fisiológico de insulina prandial. La formulación Fiasp contiene niacinamida para absorción aún más rápida.",
    "indicaciones": ["Diabetes mellitus tipo 1 (componente prandial)", "Diabetes mellitus tipo 2 (con insulina basal)", "Cetoacidosis diabética (IV)", "Bombas de insulina"],
    "contraindicaciones": ["Hipoglucemia", "Hipersensibilidad"],
    "efectosAdversos": ["Hipoglucemia", "Reacciones en sitio de inyección", "Lipodistrofia", "Hipopotasemia", "Alergia sistémica (rara)"],
    "interacciones": ["Betabloqueantes: enmascaran hipoglucemia", "Corticoides: aumentan glucemia", "IECA: pueden potenciar efecto hipoglucemiante", "Alcohol: potencia hipoglucemia"],
    "viaAdministracion": ["SC", "IV"],
    "dosis": {
      "adulto": "SC: 0.05-0.1 UI/kg por comida, ajustar según conteo de carbohidratos y glucemia preprandial. Administrar 0-15 min antes de comer. IV (CAD): según protocolo",
      "pediatrico": "Desde 1 año. Dosis individualizada"
    },
    "presentaciones": ["FlexPen 100 UI/mL (3 mL)", "Vial 100 UI/mL (10 mL)", "Penfill 100 UI/mL (3 mL)"],
    "embarazo": "B",
    "lactancia": "Compatible. No se absorbe oralmente por el lactante.",
    "cuidadosEnfermeria": [
      "Administrar inmediatamente antes de las comidas (0-15 min)",
      "Aspecto TRANSPARENTE: no usar si turbio o con partículas",
      "Puede usarse en bombas de infusión continua",
      "No mezclar con otras insulinas excepto NPH (en jeringa convencional, aspirar aspart primero)",
      "Monitorear glucemia pre y 2h postprandial",
      "Rotar sitios de inyección",
      "Enseñar conteo de carbohidratos para ajuste de dosis"
    ],
    "farmacocinetica": {
      "absorcion": "SC rápida por menor formación de hexámeros",
      "distribucion": "Baja unión proteica",
      "metabolismo": "Similar a insulina endógena",
      "excrecion": "Renal",
      "vidaMedia": "81 minutos",
      "inicioAccion": "10-20 minutos",
      "picoAccion": "1-3 horas",
      "duracionAccion": "3-5 horas"
    },
    "almacenamiento": "Refrigerar 2-8°C. En uso: TA máx 28 días.",
    "unidadId": "u06",
    "capituloId": "c06_01"
  },
  {
    "id": "propiltiouracilo",
    "nombre": "Propiltiouracilo",
    "nombreGenerico": "Propiltiouracilo (PTU)",
    "nombresComerciales": ["Propycil", "PTU"],
    "familia": "Antitiroideos",
    "clasificacion": "Tionamida antitiroidea",
    "mecanismoAccion": "Inhibe la enzima tiroperoxidasa (TPO), bloqueando la organificación del yodo y el acoplamiento de yodotirosinas para formar T3 y T4. Adicionalmente, inhibe la conversión periférica de T4 a T3 por inhibición de la desyodasa tipo 1 (ventaja en tormenta tiroidea).",
    "indicaciones": ["Hipertiroidismo (primer trimestre de embarazo)", "Tormenta tiroidea", "Enfermedad de Graves (alternativa a metimazol)", "Preparación prequirúrgica de tiroidectomía"],
    "contraindicaciones": ["Hepatotoxicidad previa por PTU", "Insuficiencia hepática", "Hipersensibilidad"],
    "efectosAdversos": ["Agranulocitosis (0.2-0.5%, potencialmente fatal)", "Hepatotoxicidad severa (incluso fulminante)", "Rash cutáneo", "Artralgia", "Vasculitis ANCA-positiva", "Fiebre farmacológica", "Alteración del gusto"],
    "interacciones": ["Anticoagulantes orales: PTU puede potenciar efecto anticoagulante", "Betabloqueantes: efecto aditivo en control de síntomas", "Yodo radioactivo: PTU reduce captación (suspender antes)"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Hipertiroidismo: 100-150 mg cada 8h (300-450 mg/día). Tormenta tiroidea: 200-400 mg cada 4-6h. Mantenimiento: 50-150 mg/día",
      "pediatrico": "5-10 mg/kg/día dividido en 3 tomas"
    },
    "presentaciones": ["Comprimidos 50, 100 mg"],
    "embarazo": "D",
    "lactancia": "Compatible en dosis bajas (<300 mg/día). Menor excreción en leche que metimazol.",
    "cuidadosEnfermeria": [
      "PREFERIDO en primer trimestre de embarazo (metimazol es teratogénico en T1)",
      "Hemograma BASAL y ante fiebre/odinofagia (descartar agranulocitosis)",
      "Hepatograma basal y periódico (riesgo de hepatitis fulminante)",
      "Educar: ante fiebre o dolor de garganta, suspender y consultar URGENTE",
      "Administrar cada 8h (vida media corta)",
      "En tormenta tiroidea: puede darse por SNG si no tolera oral",
      "Cambiar a metimazol después del primer trimestre de embarazo"
    ],
    "farmacocinetica": {
      "absorcion": "Oral rápida, biodisponibilidad 80-95%",
      "distribucion": "Concentración en tiroides. Unión proteica 75-80%",
      "metabolismo": "Hepático (glucuronidación)",
      "excrecion": "Renal 35%",
      "vidaMedia": "1-2 horas (pero efecto intratiroideo prolongado)",
      "inicioAccion": "Reducción de síntomas: 1-3 semanas",
      "picoAccion": "1-1.5 horas",
      "duracionAccion": "8-12 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u06",
    "capituloId": "c06_02"
  },
  {
    "id": "betametasona_sistemica",
    "nombre": "Betametasona (Sistémica)",
    "nombreGenerico": "Betametasona fosfato/acetato",
    "nombresComerciales": ["Celestone Cronodose", "Celestone Soluspan", "Betametasona Northia"],
    "familia": "Corticosteroides sistémicos",
    "clasificacion": "Glucocorticoide de alta potencia",
    "mecanismoAccion": "Se une al receptor de glucocorticoides intracelular, modulando la transcripción génica. Suprime mediadores inflamatorios (prostaglandinas, leucotrienos, citoquinas), inhibe la migración leucocitaria y estabiliza membranas lisosomales. Potencia 25 veces mayor que cortisol. Indicación clave obstétrica: maduración pulmonar fetal.",
    "indicaciones": ["Maduración pulmonar fetal (24-34 semanas)", "Enfermedades inflamatorias/autoinmunes", "Reacciones alérgicas severas", "Artritis inflamatoria (infiltración)", "Insuficiencia suprarrenal (no primera línea)"],
    "contraindicaciones": ["Infecciones sistémicas no tratadas", "Hipersensibilidad", "Administración intratecal (formulaciones depot)"],
    "efectosAdversos": ["Hiperglucemia", "Retención hídrica", "HTA", "Supresión del eje HPA", "Osteoporosis", "Miopatía", "Úlcera péptica", "Infecciones", "Alteraciones psiquiátricas"],
    "interacciones": ["AINEs: mayor riesgo GI", "Hipoglucemiantes: reducción de eficacia", "Vacunas vivas: contraindicadas en inmunosupresión", "Diuréticos: hipopotasemia aditiva"],
    "viaAdministracion": ["IM", "IV"],
    "dosis": {
      "adulto": "Maduración pulmonar fetal: 12 mg IM cada 24h x 2 dosis. Antiinflamatorio: 4-8 mg IM. Infiltración articular: 1.5-6 mg según articulación"
    },
    "presentaciones": ["Ampolla 4 mg/mL (fosfato)", "Ampolla depot 6 mg/mL (fosfato 3 mg + acetato 3 mg = Cronodose)"],
    "embarazo": "C",
    "lactancia": "Compatible en dosis habituales. Mínima excreción en leche.",
    "cuidadosEnfermeria": [
      "Maduración pulmonar fetal: 2 dosis IM separadas por 24h (entre 24-34 semanas EG)",
      "Esquema de rescate: evaluar si >14 días de primera dosis y <34 semanas",
      "Monitorizar glucemia (especialmente en diabéticas gestacionales)",
      "IM profundo en glúteo, no frotar",
      "No usar formulación depot por vía IV",
      "Informar que el efecto sobre maduración pulmonar fetal es máximo 48h post-primera dosis"
    ],
    "farmacocinetica": {
      "absorcion": "IM: rápida (fosfato), lenta (acetato depot)",
      "distribucion": "Unión proteica alta. Cruza placenta",
      "metabolismo": "Hepático",
      "excrecion": "Renal",
      "vidaMedia": "35-54 horas (biológica)",
      "inicioAccion": "Fosfato IM: 1-3 horas",
      "picoAccion": "Variable según formulación",
      "duracionAccion": "Fosfato: 3 días. Depot: 1-4 semanas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u06",
    "capituloId": "c06_03"
  },
  {
    "id": "deflazacort",
    "nombre": "Deflazacort",
    "nombreGenerico": "Deflazacort",
    "nombresComerciales": ["Calcort", "Dezacor", "Deflazacort Denver Farma"],
    "familia": "Corticosteroides sistémicos",
    "clasificacion": "Glucocorticoide con menor efecto osteometabólico",
    "mecanismoAccion": "Profármaco que se convierte en el metabolito activo 21-desacetildeflazacort. Se une al receptor de glucocorticoides, modulando la transcripción génica con efecto antiinflamatorio e inmunosupresor. Presenta menor impacto sobre el metabolismo óseo y del calcio comparado con prednisona a dosis equipotentes.",
    "indicaciones": ["Distrofia muscular de Duchenne", "Enfermedades autoinmunes", "Artritis reumatoide", "Asma severa corticodependiente", "Vasculitis", "Rechazo de trasplante"],
    "contraindicaciones": ["Infecciones sistémicas no tratadas", "Hipersensibilidad", "Vacunación con vacunas vivas en inmunosupresión"],
    "efectosAdversos": ["Aumento de peso (síndrome cushingoide)", "Hiperglucemia", "Osteoporosis (menor que prednisona)", "Cataratas", "Supresión del eje HPA", "Miopatía", "Retraso del crecimiento (niños)"],
    "interacciones": ["Rifampicina, fenitoína, fenobarbital: reducen efecto (inductores CYP3A4)", "AINEs: mayor riesgo de úlcera GI", "Vacunas vivas: contraindicadas", "Hipoglucemiantes: menor eficacia"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Inicio: 6-90 mg/día según patología. Equivalencia: 6 mg deflazacort ≈ 5 mg prednisona. Duchenne: 0.9 mg/kg/día",
      "pediatrico": "0.25-1.5 mg/kg/día según indicación"
    },
    "presentaciones": ["Comprimidos 6, 30 mg", "Gotas 22.75 mg/mL"],
    "embarazo": "C",
    "lactancia": "Precaución. Se excreta en leche.",
    "cuidadosEnfermeria": [
      "Tomar por la mañana (simula ritmo circadiano de cortisol)",
      "Equivalencia: 6 mg deflazacort = 5 mg prednisona",
      "Menor efecto sobre hueso: preferido en tratamientos prolongados",
      "Suplementar calcio y vitamina D en uso crónico",
      "No suspender abruptamente (supresión HPA): descenso gradual",
      "Monitorizar glucemia, PA, densidad ósea y talla en niños",
      "Evaluar riesgo de infecciones oportunistas"
    ],
    "farmacocinetica": {
      "absorcion": "Oral rápida y completa",
      "distribucion": "Unión proteica 40% (menor que otros GC)",
      "metabolismo": "Hepático: conversión rápida a 21-desacetildeflazacort (activo). CYP3A4",
      "excrecion": "Renal 70%",
      "vidaMedia": "1.5-2 horas (metabolito activo). Biológica: 36-54h",
      "inicioAccion": "1-2 horas",
      "picoAccion": "1.5-2 horas",
      "duracionAccion": "36 horas (biológica)"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u06",
    "capituloId": "c06_03"
  },
  {
    "id": "fludrocortisona",
    "nombre": "Fludrocortisona",
    "nombreGenerico": "Acetato de fludrocortisona",
    "nombresComerciales": ["Florinef", "Astonin"],
    "familia": "Corticosteroides sistémicos",
    "clasificacion": "Mineralocorticoide sintético",
    "mecanismoAccion": "Potente agonista del receptor de mineralocorticoides con actividad glucocorticoide moderada. Aumenta la reabsorción de sodio y la secreción de potasio e hidrógeno en el túbulo colector renal, expandiendo el volumen extracelular y elevando la presión arterial.",
    "indicaciones": ["Insuficiencia suprarrenal primaria (enfermedad de Addison)", "Hipotensión ortostática severa", "Síndrome adrenogenital (hiperplasia suprarrenal congénita)", "Hipoaldosteronismo"],
    "contraindicaciones": ["Hipersensibilidad", "Infecciones sistémicas no tratadas", "HTA no controlada", "ICC descompensada"],
    "efectosAdversos": ["HTA", "Edema", "Hipopotasemia", "Alcalosis metabólica", "Insuficiencia cardíaca (sobredosis)", "Cefalea", "Debilidad muscular (por hipopotasemia)"],
    "interacciones": ["Diuréticos ahorradores de potasio: antagonismo", "AINEs: retención de sodio aditiva", "Anfotericina B: hipopotasemia aditiva", "Digital: hipopotasemia aumenta toxicidad digitálica"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Addison: 0.05-0.2 mg/día (generalmente 0.1 mg/día). Hipotensión ortostática: 0.1-0.3 mg/día"
    },
    "presentaciones": ["Comprimidos 0.1 mg"],
    "embarazo": "C",
    "lactancia": "Se excreta en leche. Usar con precaución.",
    "cuidadosEnfermeria": [
      "Monitorizar PA regularmente (ajustar dosis según PA)",
      "Controlar electrolitos: sodio y POTASIO (riesgo de hipopotasemia)",
      "Pesar diariamente (detectar retención hídrica)",
      "Educar sobre dieta normosódica (no restringir sal en Addison)",
      "Siempre acompañar con hidrocortisona en Addison (no usar solo)",
      "Ajustar dosis en estrés/enfermedad (aumentar temporalmente)",
      "Vigilar signos de edema, ICC"
    ],
    "farmacocinetica": {
      "absorcion": "Oral buena",
      "distribucion": "Unión proteica alta. Vida media plasmática corta pero efecto prolongado",
      "metabolismo": "Hepático",
      "excrecion": "Renal",
      "vidaMedia": "3.5 horas (plasmática). Biológica: 18-36 horas",
      "inicioAccion": "Horas",
      "picoAccion": "1.5-2 horas",
      "duracionAccion": "24-48 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u06",
    "capituloId": "c06_03"
  },
  {
    "id": "octreotida",
    "nombre": "Octreotida",
    "nombreGenerico": "Octreotida acetato",
    "nombresComerciales": ["Sandostatin", "Sandostatin LAR", "Octreotida Northia"],
    "familia": "Hormonas hipofisarias y análogos",
    "clasificacion": "Análogo de somatostatina",
    "mecanismoAccion": "Análogo octapéptido sintético de la somatostatina con vida media prolongada. Se une a los receptores de somatostatina (SSTR2 y SSTR5). Inhibe la secreción de GH, insulina, glucagón, VIP, serotonina, gastrina y secretina. Reduce el flujo sanguíneo esplácnico y la secreción pancreática exocrina.",
    "indicaciones": ["Acromegalia", "Tumores neuroendocrinos (carcinoide, VIPoma, glucagonoma)", "Hemorragia variceal esofágica (aguda)", "Fístulas pancreáticas y enterocutáneas", "Diarrea secretora refractaria"],
    "contraindicaciones": ["Hipersensibilidad"],
    "efectosAdversos": ["Dolor abdominal", "Diarrea o esteatorrea", "Náuseas", "Colelitiasis (uso prolongado, 15-30%)", "Hiperglucemia o hipoglucemia", "Bradicardia", "Hipotiroidismo (uso prolongado)", "Dolor en sitio de inyección"],
    "interacciones": ["Ciclosporina: reduce absorción de ciclosporina", "Insulina/antidiabéticos: ajustar dosis (altera glucemia)", "Betabloqueantes: bradicardia aditiva", "Bromocriptina: aumenta biodisponibilidad de bromocriptina"],
    "viaAdministracion": ["SC", "IV", "IM"],
    "dosis": {
      "adulto": "Acromegalia SC: 100-200 mcg/8h. LAR (mensual): 20-30 mg IM cada 28 días. Hemorragia variceal: 25-50 mcg/h IV en infusión continua (hasta 5 días). Tumores NE: 100-600 mcg/día SC en 2-4 dosis"
    },
    "presentaciones": ["Ampolla 50, 100, 500 mcg/mL", "Vial LAR 10, 20, 30 mg (depot mensual)"],
    "embarazo": "B",
    "lactancia": "No recomendado. Se desconoce excreción en leche.",
    "cuidadosEnfermeria": [
      "SC: administrar entre comidas o al acostarse (reducir efectos GI)",
      "LAR IM: glúteo profundo, NUNCA deltoides. Alternar glúteos",
      "Ecografía de vesícula biliar basal y cada 6-12 meses (colelitiasis)",
      "Monitorizar glucemia (puede causar hipo o hiperglucemia)",
      "Control de función tiroidea en uso prolongado",
      "En hemorragia variceal: administrar en infusión IV continua con bomba",
      "Refrigerar ampollas. LAR: preparar inmediatamente antes de inyectar"
    ],
    "farmacocinetica": {
      "absorcion": "SC rápida y completa. LAR IM: liberación bifásica",
      "distribucion": "Unión proteica 65%. Volumen distribución 0.27 L/kg",
      "metabolismo": "Hepático",
      "excrecion": "Renal 32%",
      "vidaMedia": "SC: 1.5 horas. LAR: 28 días (aparente)",
      "inicioAccion": "SC: 30 minutos. IV: inmediato",
      "picoAccion": "SC: 30-60 minutos. LAR: día 14",
      "duracionAccion": "SC: 8-12 horas. LAR: 28 días"
    },
    "almacenamiento": "Refrigerar 2-8°C. Proteger de la luz.",
    "unidadId": "u06",
    "capituloId": "c06_05"
  },
  {
    "id": "lanreotida",
    "nombre": "Lanreotida",
    "nombreGenerico": "Lanreotida acetato",
    "nombresComerciales": ["Somatuline Autogel", "Somatuline Depot"],
    "familia": "Hormonas hipofisarias y análogos",
    "clasificacion": "Análogo de somatostatina de liberación prolongada",
    "mecanismoAccion": "Análogo octapéptido de somatostatina con alta afinidad por receptores SSTR2, SSTR3 y SSTR5. Inhibe la secreción de GH y reduce IGF-1. Suprime secreción de péptidos gastrointestinales (gastrina, VIP, secretina). Efecto antiproliferativo en tumores neuroendocrinos.",
    "indicaciones": ["Acromegalia (control de GH e IGF-1)", "Tumores neuroendocrinos gastroenteropancreáticos (GEP-NET)", "Síndrome carcinoide"],
    "contraindicaciones": ["Hipersensibilidad a lanreotida o somatostatina"],
    "efectosAdversos": ["Diarrea o esteatorrea", "Dolor abdominal", "Colelitiasis (15-20%)", "Bradicardia sinusal", "Hiperglucemia o hipoglucemia", "Reacción en sitio de inyección (induración)", "Hipotiroidismo"],
    "interacciones": ["Ciclosporina: reduce absorción", "Insulina/antidiabéticos: ajustar dosis", "Betabloqueantes, calcioantagonistas: bradicardia aditiva", "Fármacos que prolongan QT: precaución"],
    "viaAdministracion": ["SC"],
    "dosis": {
      "adulto": "Acromegalia: 60-120 mg SC profundo cada 28 días. Tumores NE: 120 mg SC cada 28 días. Ajustar según GH, IGF-1 y respuesta clínica"
    },
    "presentaciones": ["Jeringa prellenada Autogel 60, 90, 120 mg"],
    "embarazo": "C",
    "lactancia": "No recomendado.",
    "cuidadosEnfermeria": [
      "Inyección SC profunda en glúteo superior externo",
      "Rotar sitios de inyección entre ambos glúteos",
      "No necesita reconstitución (jeringa prellenada lista)",
      "Ecografía vesicular basal y periódica (colelitiasis)",
      "Control de glucemia, función tiroidea e IGF-1",
      "Sacar de heladera 30 min antes de inyectar",
      "Administrar cada 28 días (no demorar)"
    ],
    "farmacocinetica": {
      "absorcion": "SC profunda: liberación lenta y sostenida desde depósito",
      "distribucion": "Unión proteica 78%",
      "metabolismo": "Proteolisis periférica",
      "excrecion": "Renal (principal), fecal",
      "vidaMedia": "Terminal: 23-30 días",
      "inicioAccion": "Horas post-inyección",
      "picoAccion": "Día 1-3 post-inyección",
      "duracionAccion": "28 días"
    },
    "almacenamiento": "Refrigerar 2-8°C. No congelar.",
    "unidadId": "u06",
    "capituloId": "c06_05"
  },
  {
    "id": "somatropina",
    "nombre": "Somatropina",
    "nombreGenerico": "Somatropina (GH recombinante)",
    "nombresComerciales": ["Genotropin", "Humatrope", "Norditropin", "Saizen"],
    "familia": "Hormonas hipofisarias y análogos",
    "clasificacion": "Hormona de crecimiento humana recombinante",
    "mecanismoAccion": "Idéntica a la GH humana endógena (191 aminoácidos). Se une al receptor de GH activando la vía JAK2/STAT5, estimulando la producción hepática y local de IGF-1. Promueve el crecimiento longitudinal óseo (epífisis abiertas), la síntesis proteica, la lipólisis y el anabolismo muscular.",
    "indicaciones": ["Déficit de GH en niños", "Déficit de GH en adultos", "Síndrome de Turner", "Insuficiencia renal crónica en niños", "Pequeño para edad gestacional (PEG) sin catch-up", "Síndrome de Prader-Willi"],
    "contraindicaciones": ["Neoplasia activa", "Proliferación tumoral activa", "Epífisis cerradas (para indicación de crecimiento)", "Enfermedad aguda grave (post-cirugía cardíaca, politrauma)", "Retinopatía diabética proliferativa"],
    "efectosAdversos": ["Cefalea", "Artralgias y mialgias", "Edema periférico", "Síndrome del túnel carpiano (adultos)", "Hiperglucemia", "Hipotiroidismo", "Hipertensión intracraneal benigna (niños)", "Escoliosis (progresión en niños)"],
    "interacciones": ["Corticoides: antagonizan efecto de GH (reducir dosis de corticoides)", "Insulina: puede requerir aumento de dosis", "Estrógenos orales: reducen eficacia de GH (preferir transdérmicos)", "Ciclosporina: aumento de aclaramiento"],
    "viaAdministracion": ["SC"],
    "dosis": {
      "adulto": "Déficit de GH adulto: inicio 0.15-0.3 mg/día SC, titular según IGF-1 (máx ~1 mg/día). Mujeres requieren dosis mayores",
      "pediatrico": "Déficit de GH: 0.025-0.05 mg/kg/día SC. Turner: 0.045-0.05 mg/kg/día. PEG: 0.035 mg/kg/día"
    },
    "presentaciones": ["Pluma prellenada 5.3, 12 mg (Genotropin)", "Cartuchos 6, 12, 24 mg (Norditropin)", "Vial liofilizado 5, 10 mg"],
    "embarazo": "C",
    "lactancia": "No recomendado. Se desconoce si se excreta en leche.",
    "cuidadosEnfermeria": [
      "Administrar SC preferentemente al acostarse (simula pico nocturno fisiológico)",
      "Rotar sitios de inyección (abdomen, muslo, brazo)",
      "Control de IGF-1 cada 1-2 meses durante titulación",
      "Monitorizar función tiroidea (puede desenmascarar hipotiroidismo)",
      "Evaluar escoliosis en niños y talla periódicamente",
      "Controlar glucemia (efecto diabetogénico)",
      "Edad ósea anual en niños. Suspender al cierre de epífisis"
    ],
    "farmacocinetica": {
      "absorcion": "SC: biodisponibilidad 70-90%",
      "distribucion": "Unión a GHBP (proteína de unión a GH)",
      "metabolismo": "Hepático y renal",
      "excrecion": "Renal (metabolitos)",
      "vidaMedia": "3-5 horas (SC). Efecto biológico: 24h",
      "inicioAccion": "Horas (aumento de IGF-1)",
      "picoAccion": "3-6 horas",
      "duracionAccion": "24 horas (efecto biológico)"
    },
    "almacenamiento": "Refrigerar 2-8°C. No congelar. En uso según presentación.",
    "unidadId": "u06",
    "capituloId": "c06_05"
  },
  {
    "id": "terlipresina",
    "nombre": "Terlipresina",
    "nombreGenerico": "Terlipresina acetato",
    "nombresComerciales": ["Glypressin", "Terlivaz"],
    "familia": "Hormonas hipofisarias y análogos",
    "clasificacion": "Análogo sintético de vasopresina (agonista V1)",
    "mecanismoAccion": "Profármaco que se convierte lentamente en lisina-vasopresina por escisión enzimática. Agonista selectivo de receptores V1 vasculares, produciendo vasoconstricción esplácnica potente. Reduce el flujo portal y la presión variceal. Menor efecto antidiurético que vasopresina.",
    "indicaciones": ["Hemorragia variceal esofágica (tratamiento agudo)", "Síndrome hepatorrenal tipo 1", "Hemorragia digestiva alta por hipertensión portal"],
    "contraindicaciones": ["Embarazo", "Shock séptico descompensado", "Enfermedad coronaria severa no revascularizada", "Arritmias no controladas", "Vasculopatía periférica severa"],
    "efectosAdversos": ["Dolor abdominal tipo cólico", "Bradicardia", "HTA transitoria", "Isquemia periférica (dedos, piel)", "Hiponatremia", "Diarrea", "Isquemia miocárdica (rara)"],
    "interacciones": ["Betabloqueantes: bradicardia aditiva (pero combinación terapéutica habitual)", "Fármacos que prolongan QT: precaución", "Drogas vasoactivas: vasoconstricción aditiva"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "Hemorragia variceal: 2 mg IV bolo, luego 1-2 mg IV cada 4-6h hasta 72h. Síndrome hepatorrenal: 0.5-1 mg IV cada 4-6h (con albúmina), titular según respuesta (máx 2 mg cada 4h)"
    },
    "presentaciones": ["Ampolla 0.1 mg/mL (10 mL)", "Ampolla 1 mg liofilizado"],
    "embarazo": "X",
    "lactancia": "No aplica (uso hospitalario de urgencia).",
    "cuidadosEnfermeria": [
      "Administrar IV lento en bolo (1-2 minutos)",
      "Monitorización ECG continua (bradicardia, isquemia)",
      "Controlar PA frecuentemente",
      "Vigilar extremidades: palidez, cianosis (isquemia periférica)",
      "En SHR: combinar siempre con albúmina IV",
      "Controlar natremia diariamente",
      "Uso exclusivamente hospitalario"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata",
      "distribucion": "Rápida",
      "metabolismo": "Conversión enzimática a lisina-vasopresina (liberación lenta)",
      "excrecion": "Renal",
      "vidaMedia": "Terlipresina: 24 min. Lisina-vasopresina liberada: 50-100 min",
      "inicioAccion": "1-2 minutos",
      "picoAccion": "30-60 minutos",
      "duracionAccion": "4-6 horas"
    },
    "almacenamiento": "Refrigerar 2-8°C. Reconstituido: usar inmediatamente.",
    "unidadId": "u06",
    "capituloId": "c06_05"
  },
  {
    "id": "cinacalcet",
    "nombre": "Cinacalcet",
    "nombreGenerico": "Clorhidrato de cinacalcet",
    "nombresComerciales": ["Mimpara", "Sensipar"],
    "familia": "Otros endocrinos",
    "clasificacion": "Calcimimético (modulador alostérico del receptor sensor de calcio)",
    "mecanismoAccion": "Se une al receptor sensor de calcio (CaSR) en las células principales de la paratiroides, aumentando su sensibilidad al calcio extracelular. Esto suprime la secreción de PTH de forma dependiente de la calcemia. Reduce PTH, calcio y fósforo séricos sin aportar calcio exógeno.",
    "indicaciones": ["Hiperparatiroidismo secundario en ERC en diálisis", "Hipercalcemia en carcinoma paratiroideo", "Hiperparatiroidismo primario (cuando paratiroidectomía no es posible)"],
    "contraindicaciones": ["Hipocalcemia (<8.4 mg/dL)", "Hipersensibilidad"],
    "efectosAdversos": ["Náuseas y vómitos (frecuentes)", "Hipocalcemia (puede ser severa)", "Mialgias y parestesias", "Mareo", "Diarrea", "Prolongación de QT (por hipocalcemia)", "Fracturas dinámicas en enfermedad ósea adinámica"],
    "interacciones": ["Inhibidores CYP3A4 (ketoconazol): aumentan niveles de cinacalcet", "Inhibidores CYP2D6: cinacalcet es inhibidor de CYP2D6", "Fármacos metabolizados por CYP2D6 (flecainida, metoprolol, desipramina): aumento de niveles"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "HPT secundario en diálisis: inicio 30 mg/día con la comida. Titular cada 2-4 semanas: 30→60→90→120→180 mg/día. Carcinoma paratiroideo: inicio 30 mg cada 12h, máx 90 mg cada 6-8h",
      "ajusteHepatico": "Precaución en moderada. No datos en severa"
    },
    "presentaciones": ["Comprimidos 30, 60, 90 mg"],
    "embarazo": "C",
    "lactancia": "No recomendado. Se desconoce excreción en leche.",
    "cuidadosEnfermeria": [
      "Tomar con alimentos o inmediatamente después (mejora absorción)",
      "Tragar entero, no partir ni triturar",
      "Monitorizar calcio sérico 1 semana después de cada ajuste de dosis",
      "Controlar PTH mensual hasta estabilizar (objetivo PTH 150-300 pg/mL en diálisis)",
      "ALERTA: si calcio <7.5 mg/dL o síntomas de hipocalcemia (parestesias, espasmos, convulsiones): suspender y tratar",
      "Suplementar calcio y vitamina D según necesidad",
      "Controlar fósforo y producto calcio-fósforo"
    ],
    "farmacocinetica": {
      "absorcion": "Oral, aumenta con alimentos. Biodisponibilidad ~20-25%",
      "distribucion": "Unión proteica 93-97%",
      "metabolismo": "Hepático CYP3A4, CYP2D6, CYP1A2",
      "excrecion": "Renal 80% (metabolitos), fecal 15%",
      "vidaMedia": "30-40 horas",
      "inicioAccion": "Reducción de PTH: 2-6 horas",
      "picoAccion": "2-6 horas",
      "duracionAccion": "24 horas"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u06",
    "capituloId": "c06_04"
  }
]

# New chapter to create for u06
NEW_CHAPTERS = [
    {
        "id": "c06_05",
        "nombre": "Hormonas Hipofisarias y Análogos",
        "unidadId": "u06",
        "drugIds": ["octreotida", "lanreotida", "somatropina", "terlipresina"]
    }
]

# Drugs to add to EXISTING chapters
EXISTING_CHAPTER_ADDITIONS = {
    "c06_01": ["dapagliflozina", "liraglutida", "semaglutida", "pioglitazona", "acarbosa", "glimepirida", "gliclazida", "canagliflozina", "linagliptina", "vildagliptina", "insulina_detemir", "insulina_aspart"],
    "c06_02": ["propiltiouracilo"],
    "c06_03": ["betametasona_sistemica", "deflazacort", "fludrocortisona"],
    "c06_04": ["cinacalcet"],
}

# Pathology links
PATHOLOGY_LINKS = {
    "pat_dm1": ["insulina_detemir", "insulina_aspart"],
    "pat_dm2": ["dapagliflozina", "liraglutida", "semaglutida", "pioglitazona", "acarbosa", "glimepirida", "gliclazida", "canagliflozina", "linagliptina", "vildagliptina"],
    "pat_hipotiroidismo": ["propiltiouracilo"],
    "pat_hipertiroidismo": ["propiltiouracilo"],
    "pat_cad": ["dapagliflozina", "semaglutida", "liraglutida"],
}

def main():
    print("=== Generating u06 drugs ===")
    added = add_drugs_to_file(NEW_DRUGS)

    cats = load_categories()
    for ch in NEW_CHAPTERS:
        add_chapter(cats, "u06", ch)
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
