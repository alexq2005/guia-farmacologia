#!/usr/bin/env python3
"""Generate new drugs for u01 - Sistema Nervioso (43→58)."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from drug_helper import *

NEW_DRUGS = [
  {
    "id": "pramipexol", "nombre": "Pramipexol", "nombreGenerico": "Diclorhidrato de pramipexol",
    "nombresComerciales": ["Sifrol", "Pramipexol Gador", "Mirapex"],
    "familia": "Antiparkinsonianos", "clasificacion": "Agonista dopaminérgico D2/D3 no ergotamínico",
    "mecanismoAccion": "Agonista selectivo de receptores dopaminérgicos D2 y D3 en el estriado. Estimula directamente los receptores postsinápticos, compensando el déficit dopaminérgico. Efecto adicional antidepresivo y sobre síndrome de piernas inquietas.",
    "indicaciones": ["Enfermedad de Parkinson (monoterapia precoz o coadyuvante)", "Síndrome de piernas inquietas"],
    "contraindicaciones": ["Hipersensibilidad"],
    "efectosAdversos": ["Náuseas", "Somnolencia diurna/ataques de sueño", "Hipotensión ortostática", "Discinesias (con levodopa)", "Trastornos del control de impulsos (ludopatía, hipersexualidad, compras compulsivas)", "Alucinaciones", "Edema periférico"],
    "interacciones": ["Antipsicóticos: antagonismo (evitar)", "Cimetidina: aumenta niveles", "Amantadina: puede potenciar efectos"],
    "viaAdministracion": ["oral"],
    "dosis": {"adulto": "Parkinson: iniciar 0.125 mg/8h, titular semanalmente. Mantenimiento 0.5-1.5 mg/8h. Piernas inquietas: 0.125-0.5 mg 2-3h antes de acostarse", "ajusteRenal": "CrCl 20-50: iniciar 0.125 mg/12h. CrCl <20: 0.125 mg/día"},
    "presentaciones": ["Comprimidos 0.25, 0.5, 1, 1.5 mg", "Comprimidos liberación prolongada 0.375, 0.75, 1.5, 3, 4.5 mg"],
    "embarazo": "C", "lactancia": "Inhibe lactancia (agonista dopaminérgico). No recomendado.",
    "cuidadosEnfermeria": ["Titular LENTAMENTE (cada semana)", "Advertir sobre somnolencia diurna y ataques de sueño (no conducir)", "Vigilar trastornos del control de impulsos (preguntar activamente)", "PA ortostática al inicio y cambios de dosis", "No suspender abruptamente (síndrome de retirada)"],
    "farmacocinetica": {"absorcion": "Oral: biodisponibilidad >90%", "distribucion": "Unión proteica <20%", "metabolismo": "Mínimo hepático", "excrecion": "Renal 90% inalterado", "vidaMedia": "8-12 horas", "inicioAccion": "1-3 horas", "picoAccion": "2 horas", "duracionAccion": "8-12 horas"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u01", "capituloId": "c01_05"
  },
  {
    "id": "rotigotina", "nombre": "Rotigotina", "nombreGenerico": "Rotigotina",
    "nombresComerciales": ["Neupro"],
    "familia": "Antiparkinsonianos", "clasificacion": "Agonista dopaminérgico transdérmico",
    "mecanismoAccion": "Agonista dopaminérgico no ergotamínico con afinidad por receptores D1-D5, con preferencia D3. Administración transdérmica proporciona niveles plasmáticos estables durante 24h.",
    "indicaciones": ["Enfermedad de Parkinson (todas las fases)", "Síndrome de piernas inquietas"],
    "contraindicaciones": ["Hipersensibilidad", "IRM (retirar parche, contiene aluminio)"],
    "efectosAdversos": ["Reacciones en sitio de aplicación", "Náuseas", "Somnolencia", "Mareo", "Trastornos del control de impulsos", "Hipotensión ortostática"],
    "interacciones": ["Antipsicóticos: antagonismo", "Sedantes: somnolencia aditiva"],
    "viaAdministracion": ["transdermica"],
    "dosis": {"adulto": "Parkinson precoz: iniciar 2 mg/24h, aumentar 2 mg/semana hasta 6-8 mg/24h. Piernas inquietas: 1-3 mg/24h"},
    "presentaciones": ["Parche transdérmico 1, 2, 3, 4, 6, 8 mg/24h"],
    "embarazo": "C", "lactancia": "Inhibe prolactina. No recomendado.",
    "cuidadosEnfermeria": ["Rotar sitio de aplicación diariamente (no repetir sitio en 14 días)", "Retirar parche antes de IRM (aluminio)", "Cortar parche si necesita dosis intermedia: NO (compromete liberación)", "Aplicar en piel limpia, seca, sin vello, sin cremas", "Ventaja: liberación continua reduce fluctuaciones motoras"],
    "farmacocinetica": {"absorcion": "Transdérmica: liberación continua 24h", "distribucion": "Unión proteica 92%", "metabolismo": "Hepático CYP múltiples y conjugación", "excrecion": "Renal 71%, fecal 23%", "vidaMedia": "5-7 horas tras retirar parche", "inicioAccion": "1-3 horas", "duracionAccion": "24 horas"},
    "almacenamiento": "Refrigerar 2-8°C.", "unidadId": "u01", "capituloId": "c01_05"
  },
  {
    "id": "entacapona", "nombre": "Entacapona", "nombreGenerico": "Entacapona",
    "nombresComerciales": ["Comtan", "Stalevo (combinado con levodopa/carbidopa)"],
    "familia": "Antiparkinsonianos", "clasificacion": "Inhibidor de COMT (catecol-O-metiltransferasa)",
    "mecanismoAccion": "Inhibe la COMT periférica, enzima que degrada levodopa a 3-O-metildopa. Aumenta la biodisponibilidad y vida media de levodopa, prolongando su efecto y reduciendo fluctuaciones motoras (wearing-off).",
    "indicaciones": ["Enfermedad de Parkinson: complemento de levodopa cuando hay fluctuaciones de fin de dosis (wearing-off)"],
    "contraindicaciones": ["Feocromocitoma", "Uso con IMAO no selectivos", "Hepatopatía", "Antecedente de síndrome neuroléptico maligno/rabdomiolisis"],
    "efectosAdversos": ["Discinesias (por mayor disponibilidad de levodopa)", "Diarrea", "Coloración naranja de orina", "Náuseas", "Dolor abdominal", "Hepatotoxicidad (rara)"],
    "interacciones": ["IMAO no selectivos: contraindicados", "Hierro: puede reducir absorción de entacapona", "Warfarina: monitorizar INR"],
    "viaAdministracion": ["oral"],
    "dosis": {"adulto": "200 mg con CADA dosis de levodopa. Máx: 8 veces/día (1600 mg)"},
    "presentaciones": ["Comprimidos 200 mg", "Combinado: levodopa/carbidopa/entacapona (Stalevo)"],
    "embarazo": "C", "lactancia": "No recomendado.",
    "cuidadosEnfermeria": ["Administrar SIEMPRE junto con levodopa (sin efecto solo)", "Informar sobre coloración naranja de orina (normal)", "Puede requerir reducir dosis de levodopa si discinesias", "Monitorizar hepatograma", "NO suspender abruptamente"],
    "farmacocinetica": {"absorcion": "Oral: biodisponibilidad 35%", "distribucion": "Unión proteica 98%", "metabolismo": "Hepático (glucuronidación)", "excrecion": "Fecal 90%, renal 10%", "vidaMedia": "0.4-0.7 horas (pero efecto clínico prolonga levodopa)", "inicioAccion": "30-45 minutos", "picoAccion": "1 hora", "duracionAccion": "Hasta próxima dosis de levodopa"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u01", "capituloId": "c01_05"
  },
  {
    "id": "selegilina", "nombre": "Selegilina", "nombreGenerico": "Clorhidrato de selegilina",
    "nombresComerciales": ["Jumex", "Niar", "Selegilina Gador"],
    "familia": "Antiparkinsonianos", "clasificacion": "Inhibidor selectivo de MAO-B",
    "mecanismoAccion": "Inhibe selectivamente la monoamino oxidasa B (MAO-B) que degrada dopamina en el estriado. Aumenta la disponibilidad de dopamina cerebral. En dosis altas pierde selectividad. Posible efecto neuroprotector (discutido).",
    "indicaciones": ["Enfermedad de Parkinson precoz (monoterapia)", "Coadyuvante de levodopa en fluctuaciones"],
    "contraindicaciones": ["Uso con meperidina, tramadol, metadona", "Uso con ISRS/ISRN (síndrome serotoninérgico)", "Feocromocitoma"],
    "efectosAdversos": ["Insomnio", "Náuseas", "Mareo", "Hipotensión ortostática", "Discinesias (con levodopa)", "Confusión en ancianos"],
    "interacciones": ["ISRS: síndrome serotoninérgico (EVITAR)", "Meperidina: reacción severa (contraindicada)", "Levodopa: potencia efecto y toxicidad", "Tiramina en alimentos: crisis hipertensiva en dosis altas (pierde selectividad)"],
    "viaAdministracion": ["oral"],
    "dosis": {"adulto": "5 mg con desayuno y 5 mg con almuerzo. NO dosis nocturna (insomnio). Máx: 10 mg/día"},
    "presentaciones": ["Comprimidos 5 mg"],
    "embarazo": "C", "lactancia": "No recomendado.",
    "cuidadosEnfermeria": ["Administrar con desayuno y almuerzo (NO noche: insomnio)", "No superar 10 mg/día (pierde selectividad MAO-B → riesgo de crisis tiramínica)", "Evitar ISRS y opioides (síndrome serotoninérgico)", "Revisar interacciones farmacológicas exhaustivamente", "Puede potenciar discinesias por levodopa"],
    "farmacocinetica": {"absorcion": "Oral buena", "distribucion": "Amplia, cruza BHE", "metabolismo": "Hepático CYP2B6 a anfetamina y metanfetamina (metabolitos)", "excrecion": "Renal", "vidaMedia": "1.5 horas (pero inhibición MAO-B irreversible: efecto dura días)", "inicioAccion": "1 hora", "picoAccion": "0.5-2 horas", "duracionAccion": "24-72 horas (inhibición irreversible)"},
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.", "unidadId": "u01", "capituloId": "c01_05"
  },
  {
    "id": "rasagilina", "nombre": "Rasagilina", "nombreGenerico": "Mesilato de rasagilina",
    "nombresComerciales": ["Azilect", "Rasagilina Gador"],
    "familia": "Antiparkinsonianos", "clasificacion": "Inhibidor selectivo de MAO-B (segunda generación)",
    "mecanismoAccion": "Inhibidor irreversible y selectivo de MAO-B, más potente que selegilina. NO se metaboliza a anfetaminas (ventaja). Aumenta dopamina estriatal. Posible efecto neuroprotector (estudio ADAGIO).",
    "indicaciones": ["Enfermedad de Parkinson (monoterapia o coadyuvante de levodopa)"],
    "contraindicaciones": ["Uso con IMAO", "Uso con meperidina", "Feocromocitoma", "Hepatopatía severa"],
    "efectosAdversos": ["Cefalea", "Artralgias", "Dispepsia", "Depresión", "Caídas", "Discinesias (con levodopa)"],
    "interacciones": ["ISRS/ISRN: precaución (menor riesgo que selegilina)", "Meperidina: contraindicada", "Ciprofloxacino: aumenta niveles (CYP1A2)", "Levodopa: puede requerir reducir dosis"],
    "viaAdministracion": ["oral"],
    "dosis": {"adulto": "1 mg/día en dosis única, con o sin alimentos"},
    "presentaciones": ["Comprimidos 0.5, 1 mg"],
    "embarazo": "C", "lactancia": "No recomendado.",
    "cuidadosEnfermeria": ["Dosis única diaria (buena adherencia)", "NO se metaboliza a anfetaminas (mejor que selegilina)", "Menor restricción dietética que selegilina", "Puede darse a cualquier hora del día", "Revisar interacciones (menos que selegilina pero existen)"],
    "farmacocinetica": {"absorcion": "Oral: biodisponibilidad 36%", "distribucion": "Unión proteica 60-70%", "metabolismo": "Hepático CYP1A2 (NO a anfetaminas)", "excrecion": "Renal 62%, fecal 7%", "vidaMedia": "0.6-2 horas (inhibición MAO-B irreversible)", "inicioAccion": "1 hora", "picoAccion": "0.5-1 hora", "duracionAccion": "Días (inhibición irreversible)"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u01", "capituloId": "c01_05"
  },
  {
    "id": "paroxetina", "nombre": "Paroxetina", "nombreGenerico": "Clorhidrato de paroxetina",
    "nombresComerciales": ["Paxil", "Aropax", "Paroxetina Gador"],
    "familia": "Antidepresivos", "clasificacion": "Inhibidor selectivo de recaptación de serotonina (ISRS)",
    "mecanismoAccion": "ISRS más potente en inhibir la recaptación de serotonina. Efecto anticolinérgico leve (más que otros ISRS). Efecto ansiolítico marcado.",
    "indicaciones": ["Trastorno depresivo mayor", "Trastorno de ansiedad generalizada", "Trastorno de pánico", "Trastorno de ansiedad social", "Trastorno obsesivo-compulsivo", "TEPT"],
    "contraindicaciones": ["Uso con IMAO (esperar 14 días)", "Uso con pimozida o tioridazina", "Menores de 18 años (riesgo suicida aumentado)"],
    "efectosAdversos": ["Náuseas", "Disfunción sexual (más frecuente de ISRS)", "Aumento de peso", "Somnolencia", "Sequedad bucal", "Síndrome de discontinuación severo", "Sudoración"],
    "interacciones": ["Inhibidor potente CYP2D6", "Tamoxifeno: CONTRAINDICADA (reduce metabolito activo)", "IMAO: síndrome serotoninérgico", "Tramadol: riesgo convulsivo y serotoninérgico", "Anticoagulantes: aumenta riesgo hemorrágico"],
    "viaAdministracion": ["oral"],
    "dosis": {"adulto": "Depresión: 20 mg/día, puede aumentar a 40-60 mg. Pánico: iniciar 10 mg/día. TOC: hasta 60 mg/día", "geriatrico": "Iniciar 10 mg/día. Máx: 40 mg/día"},
    "presentaciones": ["Comprimidos 20, 30 mg", "Comprimidos liberación controlada 12.5, 25 mg"],
    "embarazo": "D", "lactancia": "Se excreta en leche. Precaución.",
    "cuidadosEnfermeria": ["Síndrome de discontinuación SEVERO: NUNCA suspender abruptamente", "Reducir gradualmente en semanas", "Mayor disfunción sexual que otros ISRS", "NO usar con tamoxifeno (inhibe CYP2D6 → reduce eficacia)", "Vigilar ideación suicida al inicio (especialmente jóvenes)", "Tomar por la mañana (puede causar somnolencia o insomnio)"],
    "farmacocinetica": {"absorcion": "Oral: completamente absorbida", "distribucion": "Unión proteica 95%", "metabolismo": "Hepático CYP2D6 (auto-inhibición)", "excrecion": "Renal 64%, fecal 36%", "vidaMedia": "21 horas (se prolonga con uso prolongado por auto-inhibición CYP2D6)", "inicioAccion": "2-4 semanas (efecto antidepresivo)", "picoAccion": "5-8 horas", "duracionAccion": "24 horas"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u01", "capituloId": "c01_07"
  },
  {
    "id": "citalopram", "nombre": "Citalopram", "nombreGenerico": "Bromhidrato de citalopram",
    "nombresComerciales": ["Celexa", "Seropram", "Citalopram Gador"],
    "familia": "Antidepresivos", "clasificacion": "Inhibidor selectivo de recaptación de serotonina (ISRS)",
    "mecanismoAccion": "ISRS más selectivo (menos interacciones CYP450). Inhibe la recaptación de serotonina con mínimos efectos sobre noradrenalina y dopamina. Mezcla racémica (el S-enantiómero es escitalopram).",
    "indicaciones": ["Trastorno depresivo mayor", "Trastorno de pánico", "Trastorno de ansiedad generalizada"],
    "contraindicaciones": ["QT prolongado", "Uso con IMAO", "Uso con pimozida", "QTc >500 ms"],
    "efectosAdversos": ["Náuseas", "Insomnio o somnolencia", "Disfunción sexual", "Prolongación QT (dosis-dependiente)", "Cefalea", "Sudoración"],
    "interacciones": ["Menos interacciones CYP que otros ISRS (ventaja)", "Fármacos que prolongan QT: riesgo aditivo", "IMAO: síndrome serotoninérgico", "Omeprazol: aumenta niveles de citalopram"],
    "viaAdministracion": ["oral"],
    "dosis": {"adulto": "20 mg/día, puede aumentar a 40 mg. Máximo: 40 mg/día (20 mg en >60 años por QT)", "geriatrico": "Máximo 20 mg/día"},
    "presentaciones": ["Comprimidos 20, 40 mg", "Gotas 40 mg/mL"],
    "embarazo": "C", "lactancia": "Se excreta en leche. Compatible con precaución.",
    "cuidadosEnfermeria": ["ECG basal si factores de riesgo de QT largo", "Máximo 20 mg/día en >60 años (riesgo QT)", "Menos interacciones que fluoxetina/paroxetina (ventaja)", "No suspender abruptamente", "Efecto antidepresivo: 2-4 semanas"],
    "farmacocinetica": {"absorcion": "Oral: biodisponibilidad 80%", "distribucion": "Unión proteica 80%", "metabolismo": "Hepático CYP3A4, CYP2C19", "excrecion": "Renal 20%, fecal 65%", "vidaMedia": "35 horas", "inicioAccion": "2-4 semanas", "picoAccion": "4 horas", "duracionAccion": "24 horas"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u01", "capituloId": "c01_07"
  },
  {
    "id": "desvenlafaxina", "nombre": "Desvenlafaxina", "nombreGenerico": "Succinato de desvenlafaxina",
    "nombresComerciales": ["Pristiq", "Desvenlafaxina Gador"],
    "familia": "Antidepresivos", "clasificacion": "Inhibidor de recaptación de serotonina y noradrenalina (IRSN)",
    "mecanismoAccion": "Metabolito activo de venlafaxina. Inhibe la recaptación de serotonina y noradrenalina. Ventaja: no requiere metabolismo CYP2D6 (menos variabilidad interindividual que venlafaxina).",
    "indicaciones": ["Trastorno depresivo mayor", "Síntomas vasomotores de la menopausia (off-label)"],
    "contraindicaciones": ["Uso con IMAO", "Glaucoma de ángulo estrecho no tratado", "HTA no controlada"],
    "efectosAdversos": ["Náuseas", "Mareo", "Insomnio", "Sudoración", "Estreñimiento", "Hipertensión (dosis-dependiente)", "Disfunción sexual"],
    "interacciones": ["IMAO: síndrome serotoninérgico", "Menos interacciones CYP que venlafaxina", "Midazolam: puede aumentar niveles"],
    "viaAdministracion": ["oral"],
    "dosis": {"adulto": "50 mg/día (dosis fija efectiva). Puede aumentar hasta 100 mg/día si necesario. Máx: 200 mg (sin beneficio adicional)", "ajusteRenal": "CrCl <30: 50 mg/día o cada 48h"},
    "presentaciones": ["Comprimidos liberación prolongada 50, 100 mg"],
    "embarazo": "C", "lactancia": "Se excreta en leche. Precaución.",
    "cuidadosEnfermeria": ["Dosis fija de 50 mg es efectiva (no siempre necesario titular)", "NO triturar ni masticar (liberación prolongada)", "Monitorizar PA (efecto hipertensivo dosis-dependiente)", "No suspender abruptamente (discontinuación)", "Menos variabilidad por CYP2D6 que venlafaxina"],
    "farmacocinetica": {"absorcion": "Oral: biodisponibilidad 80%", "distribucion": "Unión proteica 30%", "metabolismo": "Hepático (glucuronidación, mínimo CYP3A4)", "excrecion": "Renal 45% inalterada", "vidaMedia": "11 horas", "inicioAccion": "2-4 semanas", "picoAccion": "7.5 horas", "duracionAccion": "24 horas"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u01", "capituloId": "c01_07"
  },
  {
    "id": "zolpidem", "nombre": "Zolpidem", "nombreGenerico": "Hemitartrato de zolpidem",
    "nombresComerciales": ["Stilnox", "Somit", "Zolpidem Gador"],
    "familia": "Hipnóticos", "clasificacion": "Agonista selectivo del receptor GABA-A (subunidad alfa-1) - hipnótico Z",
    "mecanismoAccion": "Se une selectivamente a la subunidad alfa-1 del receptor GABA-A, que media el efecto sedante/hipnótico. A diferencia de las benzodiazepinas, tiene mínimo efecto ansiolítico, miorrelajante o anticonvulsivante.",
    "indicaciones": ["Insomnio de conciliación (corto plazo)", "Insomnio transitorio"],
    "contraindicaciones": ["Apnea del sueño", "Insuficiencia respiratoria severa", "Miastenia gravis", "Insuficiencia hepática severa", "Menores de 18 años"],
    "efectosAdversos": ["Somnolencia residual matutina", "Mareo", "Cefalea", "Amnesia anterógrada", "Sonambulismo/conductas complejas durante el sueño", "Dependencia (menor que BZD, pero existe)"],
    "interacciones": ["Depresores del SNC: sedación aditiva", "Alcohol: potenciación severa", "Rifampicina: reduce niveles", "ISRS: puede aumentar alucinaciones"],
    "viaAdministracion": ["oral", "sublingual"],
    "dosis": {"adulto": "5-10 mg al acostarse (inmediatamente antes). Mujeres y ancianos: 5 mg. Máximo: 10 mg/día", "geriatrico": "5 mg. No exceder"},
    "presentaciones": ["Comprimidos 10 mg", "Comprimidos liberación modificada 6.25, 12.5 mg", "Comprimidos sublinguales 1.75, 3.5 mg"],
    "embarazo": "C", "lactancia": "Se excreta en leche. No recomendado.",
    "cuidadosEnfermeria": ["Tomar inmediatamente antes de acostarse (inicio rápido)", "Asegurar 7-8h disponibles para dormir", "Advertir sobre conductas complejas dormido (conducir, comer, llamar)", "NO con alcohol", "Usar el menor tiempo posible (<4 semanas)", "Mujeres metabolizan más lento: dosis menor"],
    "farmacocinetica": {"absorcion": "Oral rápida, biodisponibilidad 70%", "distribucion": "Unión proteica 92%", "metabolismo": "Hepático CYP3A4 (principal)", "excrecion": "Renal 48-67%", "vidaMedia": "2.5 horas (acción ultracorta)", "inicioAccion": "15-30 minutos", "picoAccion": "1.6 horas", "duracionAccion": "6-8 horas"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u01", "capituloId": "c01_04"
  },
  {
    "id": "metilfenidato", "nombre": "Metilfenidato", "nombreGenerico": "Clorhidrato de metilfenidato",
    "nombresComerciales": ["Ritalin", "Concerta", "Rubifen"],
    "familia": "Psicoestimulantes", "clasificacion": "Estimulante del SNC (inhibidor recaptación de dopamina/noradrenalina)",
    "mecanismoAccion": "Bloquea el transportador de dopamina (DAT) y de noradrenalina (NET) en la corteza prefrontal y estriado. Aumenta la concentración sináptica de dopamina y noradrenalina, mejorando la atención y el control de impulsos.",
    "indicaciones": ["TDAH (trastorno por déficit de atención e hiperactividad)", "Narcolepsia"],
    "contraindicaciones": ["Ansiedad severa", "Glaucoma", "Tics motores o síndrome de Tourette", "Uso de IMAO (14 días)", "Enfermedad cardiovascular significativa", "Hipertiroidismo"],
    "efectosAdversos": ["Insomnio", "Anorexia/pérdida de peso", "Cefalea", "Dolor abdominal", "Taquicardia", "Nerviosismo", "Retraso del crecimiento (uso prolongado en niños)", "Potencial de abuso"],
    "interacciones": ["IMAO: crisis hipertensiva (contraindicado)", "Antihipertensivos: reduce eficacia", "Anticoagulantes cumarínicos: puede aumentar niveles", "Fenitoína: puede aumentar niveles"],
    "viaAdministracion": ["oral"],
    "dosis": {"adulto": "Liberación inmediata: 10-20 mg/8-12h. Liberación prolongada: 18-54 mg/día (Concerta)", "pediatrico": ">6 años: iniciar 5 mg/12h. Titular hasta 1 mg/kg/día o 60 mg/día"},
    "presentaciones": ["Comprimidos 10 mg", "Comprimidos liberación prolongada 18, 27, 36, 54 mg (Concerta)"],
    "embarazo": "C", "lactancia": "Se excreta en leche. No recomendado.",
    "cuidadosEnfermeria": ["Sustancia controlada (psicotrópico): receta especial", "Administrar por la MAÑANA (evitar insomnio)", "Concerta: tragar entero, NO masticar", "Monitorizar peso y talla en niños cada 3 meses", "PA y FC basal y periódica", "Vacaciones terapéuticas en escolares (discutido)"],
    "farmacocinetica": {"absorcion": "Oral buena. Alimentos retrasan pero no reducen absorción", "distribucion": "Unión proteica 15%", "metabolismo": "Hepático por desesterificación a ácido ritalínico (inactivo)", "excrecion": "Renal 90%", "vidaMedia": "LI: 2-3 horas. LP: efecto 10-12 horas", "inicioAccion": "LI: 20-30 min. LP: 1-2h", "picoAccion": "LI: 1-2h. LP: 6-8h", "duracionAccion": "LI: 3-5h. LP: 10-12h"},
    "almacenamiento": "Temperatura ambiente. Mantener en envase original.", "unidadId": "u01", "capituloId": "c01_08"
  },
  {
    "id": "atomoxetina", "nombre": "Atomoxetina", "nombreGenerico": "Clorhidrato de atomoxetina",
    "nombresComerciales": ["Strattera", "Atomoxetina Gador"],
    "familia": "Tratamiento TDAH no estimulante", "clasificacion": "Inhibidor selectivo de recaptación de noradrenalina",
    "mecanismoAccion": "Inhibe selectivamente el transportador de noradrenalina (NET) en corteza prefrontal. Aumenta dopamina y noradrenalina prefrontal sin efecto sobre el sistema de recompensa estriatal (no adictiva).",
    "indicaciones": ["TDAH en niños ≥6 años, adolescentes y adultos", "TDAH con comorbilidad de tics o abuso de sustancias (alternativa a estimulantes)"],
    "contraindicaciones": ["Uso con IMAO", "Glaucoma de ángulo estrecho", "Feocromocitoma", "Enfermedad cardiovascular severa"],
    "efectosAdversos": ["Náuseas", "Dolor abdominal", "Disminución del apetito", "Insomnio o somnolencia", "Sequedad bucal", "Aumento de PA y FC", "Hepatotoxicidad (rara pero grave)", "Ideación suicida en niños (FDA warning)"],
    "interacciones": ["IMAO: contraindicado", "Fluoxetina/paroxetina (inhibidores CYP2D6): aumentan niveles", "Salbutamol: taquicardia aditiva"],
    "viaAdministracion": ["oral"],
    "dosis": {"adulto": "Iniciar 40 mg/día, aumentar a 80 mg/día tras 3 días. Máx: 100 mg/día", "pediatrico": ">6 años <70 kg: iniciar 0.5 mg/kg/día, titular a 1.2 mg/kg/día (máx 1.4)"},
    "presentaciones": ["Cápsulas 10, 18, 25, 40, 60, 80 mg"],
    "embarazo": "C", "lactancia": "Se desconoce. No recomendado.",
    "cuidadosEnfermeria": ["NO es sustancia controlada (ventaja vs metilfenidato)", "Efecto pleno: 4-6 semanas (no inmediato como estimulantes)", "NO abrir cápsulas (irritante ocular)", "Vigilar hepatotoxicidad: ictericia, orina oscura", "Monitorizar PA, FC, peso", "Evaluar ideación suicida (FDA black box en menores)"],
    "farmacocinetica": {"absorcion": "Oral buena", "distribucion": "Unión proteica 98%", "metabolismo": "Hepático CYP2D6 (metabolizadores lentos: niveles más altos)", "excrecion": "Renal 80%", "vidaMedia": "5 horas (21h en metabolizadores lentos CYP2D6)", "inicioAccion": "Efecto clínico: 4-6 semanas", "picoAccion": "1-2 horas", "duracionAccion": "24 horas"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u01", "capituloId": "c01_08"
  },
  {
    "id": "memantina", "nombre": "Memantina", "nombreGenerico": "Clorhidrato de memantina",
    "nombresComerciales": ["Ebixa", "Memantina Gador", "Akatinol"],
    "familia": "Antialzheimer", "clasificacion": "Antagonista no competitivo del receptor NMDA",
    "mecanismoAccion": "Bloquea los receptores NMDA de glutamato de forma no competitiva y voltaje-dependiente. Reduce la excitotoxicidad glutamatérgica que contribuye a la neurodegeneración en Alzheimer, sin impedir la señalización fisiológica.",
    "indicaciones": ["Enfermedad de Alzheimer moderada a severa", "Demencia mixta"],
    "contraindicaciones": ["Hipersensibilidad", "Epilepsia (precaución)"],
    "efectosAdversos": ["Mareo", "Cefalea", "Estreñimiento", "Somnolencia", "Hipertensión", "Confusión"],
    "interacciones": ["Amantadina: potenciación (mismo mecanismo)", "Dextrometorfano: riesgo de efectos NMDA aditivos", "Alcalinizantes urinarios: reducen excreción"],
    "viaAdministracion": ["oral"],
    "dosis": {"adulto": "Iniciar 5 mg/día, aumentar 5 mg/semana hasta 20 mg/día (10 mg/12h)", "ajusteRenal": "CrCl 5-29: máx 10 mg/día"},
    "presentaciones": ["Comprimidos 10 mg", "Solución oral 10 mg/mL"],
    "embarazo": "C", "lactancia": "No recomendado.",
    "cuidadosEnfermeria": ["Titular lentamente: 5 mg/semana", "Puede combinarse con donepezilo (sinergia)", "No produce mejora, sino enlentecimiento del deterioro", "Educar al cuidador sobre expectativas realistas", "No requiere monitoreo de laboratorio rutinario"],
    "farmacocinetica": {"absorcion": "Oral: biodisponibilidad 100%", "distribucion": "Unión proteica 45%", "metabolismo": "Hepático parcial", "excrecion": "Renal 48% inalterada", "vidaMedia": "60-80 horas", "inicioAccion": "Semanas", "picoAccion": "3-7 horas", "duracionAccion": "24 horas"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u01", "capituloId": "c01_08"
  },
  {
    "id": "donepezilo", "nombre": "Donepezilo", "nombreGenerico": "Clorhidrato de donepezilo",
    "nombresComerciales": ["Aricept", "Donepezilo Gador", "Eranz"],
    "familia": "Antialzheimer", "clasificacion": "Inhibidor reversible de acetilcolinesterasa (IAChE)",
    "mecanismoAccion": "Inhibe reversiblemente la acetilcolinesterasa en el SNC, aumentando la concentración de acetilcolina en la hendidura sináptica. Compensa parcialmente el déficit colinérgico en corteza e hipocampo del Alzheimer.",
    "indicaciones": ["Enfermedad de Alzheimer leve a moderada", "Demencia por cuerpos de Lewy"],
    "contraindicaciones": ["Hipersensibilidad", "Bloqueo sinoauricular o AV"],
    "efectosAdversos": ["Náuseas", "Diarrea", "Insomnio", "Calambres musculares", "Bradicardia", "Anorexia", "Vómitos"],
    "interacciones": ["Betabloqueantes: bradicardia aditiva", "Anticolinérgicos: antagonismo (evitar)", "Succinilcolina: prolonga bloqueo neuromuscular", "AINE: mayor riesgo GI"],
    "viaAdministracion": ["oral"],
    "dosis": {"adulto": "Iniciar 5 mg/día al acostarse. Aumentar a 10 mg/día tras 4-6 semanas. Máx: 23 mg/día (formulación especial)"},
    "presentaciones": ["Comprimidos 5, 10 mg", "Comprimidos bucodispersables 5, 10 mg"],
    "embarazo": "C", "lactancia": "No recomendado.",
    "cuidadosEnfermeria": ["Administrar al acostarse (reduce náuseas)", "Titular cada 4-6 semanas", "Vigilar bradicardia (especialmente con betabloqueantes)", "Monitorizar peso (anorexia)", "Educar al cuidador: mejora modesta o estabilización, no curación", "Puede combinarse con memantina"],
    "farmacocinetica": {"absorcion": "Oral: biodisponibilidad 100%", "distribucion": "Unión proteica 96%", "metabolismo": "Hepático CYP2D6, CYP3A4", "excrecion": "Renal 57%, fecal 15%", "vidaMedia": "70 horas", "inicioAccion": "Semanas", "picoAccion": "3-4 horas", "duracionAccion": "24 horas"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u01", "capituloId": "c01_08"
  },
  {
    "id": "fluvoxamina", "nombre": "Fluvoxamina", "nombreGenerico": "Maleato de fluvoxamina",
    "nombresComerciales": ["Luvox", "Dumirox"],
    "familia": "Antidepresivos", "clasificacion": "Inhibidor selectivo de recaptación de serotonina (ISRS)",
    "mecanismoAccion": "ISRS con afinidad adicional por receptor sigma-1 (posible efecto ansiolítico). Potente inhibidor CYP1A2 y CYP2C19. Eficacia particular en TOC.",
    "indicaciones": ["Trastorno obsesivo-compulsivo (primera línea)", "Trastorno de ansiedad social", "Depresión mayor"],
    "contraindicaciones": ["Uso con IMAO", "Uso con tizanidina", "Uso con pimozida/tioridazina"],
    "efectosAdversos": ["Náuseas (frecuente)", "Insomnio o somnolencia", "Cefalea", "Diarrea", "Disfunción sexual (menos que paroxetina)", "Agitación"],
    "interacciones": ["Potente inhibidor CYP1A2: teofilina (contraindicado), clozapina (reducir dosis 2/3), cafeína", "CYP2C19: omeprazol, diazepam", "Warfarina: aumenta INR"],
    "viaAdministracion": ["oral"],
    "dosis": {"adulto": "TOC: iniciar 50 mg/noche, titular hasta 100-300 mg/día. Depresión: 50-200 mg/día", "pediatrico": "TOC ≥8 años: iniciar 25 mg/noche"},
    "presentaciones": ["Comprimidos 50, 100 mg"],
    "embarazo": "C", "lactancia": "Se excreta en leche. Compatible con precaución.",
    "cuidadosEnfermeria": ["Administrar por la noche (sedante)", "MÚLTIPLES interacciones CYP1A2: revisar toda la medicación", "No usar con teofilina (toxicidad severa)", "Dosis altas: dividir en 2 tomas", "Efecto sobre TOC: 4-6 semanas mínimo"],
    "farmacocinetica": {"absorcion": "Oral completa", "distribucion": "Unión proteica 77%", "metabolismo": "Hepático CYP2D6 (oxidativo)", "excrecion": "Renal 94%", "vidaMedia": "15.6 horas", "inicioAccion": "2-4 semanas", "picoAccion": "3-8 horas", "duracionAccion": "24 horas"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u01", "capituloId": "c01_07"
  },
  {
    "id": "oxcarbazepina", "nombre": "Oxcarbazepina", "nombreGenerico": "Oxcarbazepina",
    "nombresComerciales": ["Trileptal", "Oxcarbazepina Gador"],
    "familia": "Anticonvulsivantes", "clasificacion": "Análogo de carbamazepina (bloqueante canales de sodio)",
    "mecanismoAccion": "Profármaco que se convierte en licarbazepina (metabolito activo). Bloquea canales de sodio voltaje-dependientes, estabilizando membranas neuronales hiperexcitadas. Mejor perfil de interacciones y tolerabilidad que carbamazepina.",
    "indicaciones": ["Epilepsia focal (parcial) con o sin generalización", "Neuralgia del trigémino (alternativa a carbamazepina)", "Trastorno bipolar (off-label)"],
    "contraindicaciones": ["Hipersensibilidad a oxcarbazepina o eslicarbazepina", "Bloqueo AV"],
    "efectosAdversos": ["Mareo", "Somnolencia", "Cefalea", "Náuseas", "Hiponatremia (más que carbamazepina)", "Diplopía", "Ataxia", "Erupción cutánea (reactividad cruzada con carbamazepina 25-30%)"],
    "interacciones": ["Menos inductor enzimático que carbamazepina", "Anticonceptivos orales: reduce eficacia (inductor leve CYP3A4)", "Fenitoína: interacción bidireccional", "Litio: puede potenciar neurotoxicidad"],
    "viaAdministracion": ["oral"],
    "dosis": {"adulto": "Iniciar 300 mg/12h, aumentar 300 mg/semana. Mantenimiento: 600-1200 mg/12h", "pediatrico": ">6 años: 8-10 mg/kg/día dividido en 2 dosis"},
    "presentaciones": ["Comprimidos 300, 600 mg", "Suspensión 60 mg/mL"],
    "embarazo": "D", "lactancia": "Se excreta en leche. Precaución.",
    "cuidadosEnfermeria": ["Monitorizar sodio sérico (riesgo de hiponatremia)", "Síntomas de hiponatremia: confusión, náuseas, cefalea, convulsiones", "Reactividad cruzada con carbamazepina en 25-30% (precaución si alergia)", "Anticonceptivos: informar sobre reducción de eficacia", "Menos interacciones que carbamazepina (ventaja)"],
    "farmacocinetica": {"absorcion": "Oral completa", "distribucion": "Licarbazepina: unión proteica 40%", "metabolismo": "Conversión a licarbazepina (activa) por reducción citosólica", "excrecion": "Renal 95%", "vidaMedia": "Licarbazepina: 9-11 horas", "inicioAccion": "Días", "picoAccion": "4.5 horas (licarbazepina)", "duracionAccion": "12 horas"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u01", "capituloId": "c01_04"
  }
]

NEW_CHAPTERS = [
    {"id": "c01_08", "nombre": "Psicoestimulantes y Antialzheimer", "unidadId": "u01",
     "drugIds": ["metilfenidato", "atomoxetina", "memantina", "donepezilo"]}
]

EXISTING_CHAPTER_ADDITIONS = {
    "c01_04": ["zolpidem", "oxcarbazepina"],
    "c01_05": ["pramipexol", "rotigotina", "entacapona", "selegilina", "rasagilina"],
    "c01_07": ["paroxetina", "citalopram", "desvenlafaxina", "fluvoxamina"],
}

PATHOLOGY_LINKS = {
    "pat_parkinson": ["pramipexol", "rotigotina", "entacapona", "selegilina", "rasagilina"],
    "pat_epilepsia": ["oxcarbazepina"],
    "pat_depresion": ["paroxetina", "citalopram", "desvenlafaxina", "fluvoxamina"],
    "pat_ansiedad": ["paroxetina", "citalopram", "desvenlafaxina"],
}

def main():
    print("=== Generating u01 drugs ===")
    added = add_drugs_to_file(NEW_DRUGS)
    cats = load_categories()
    for ch in NEW_CHAPTERS:
        add_chapter(cats, "u01", ch)
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
