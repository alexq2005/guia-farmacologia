const fs = require('fs');
const path = require('path');

const drugsPath = path.join(__dirname, '..', 'src', 'data', 'drugs.json');
const catsPath = path.join(__dirname, '..', 'src', 'data', 'categories.json');

const drugs = JSON.parse(fs.readFileSync(drugsPath, 'utf8'));
const cats = JSON.parse(fs.readFileSync(catsPath, 'utf8'));
const existingIds = new Set(drugs.map(d => d.id));

function mkSearch(d) {
  return [d.nombre, d.nombreGenerico, ...d.nombresComerciales, d.familia, d.clasificacion, ...d.indicaciones]
    .join(' ').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const newDrugs = [
  // ========== U01 - Sistema Nervioso ==========
  {
    id: "buspirona", nombre: "Buspirona", nombreGenerico: "Buspirona",
    nombresComerciales: ["Buspar", "Ansial"], familia: "Ansiolíticos no benzodiacepínicos",
    clasificacion: "Agonista parcial 5-HT1A", mecanismoAccion: "Agonista parcial de receptores serotoninérgicos 5-HT1A. No actúa sobre receptores GABA ni produce dependencia.",
    indicaciones: ["Trastorno de ansiedad generalizada", "Ansiedad crónica", "Complemento en depresión (off-label)"],
    contraindicaciones: ["Hipersensibilidad", "Uso concomitante de IMAO", "Insuficiencia hepática o renal grave"],
    efectosAdversos: ["Mareo", "Cefalea", "Náuseas", "Nerviosismo inicial", "Insomnio"],
    interacciones: ["IMAO: riesgo de síndrome serotoninérgico", "Eritromicina/ketoconazol: aumentan niveles", "Rifampicina: disminuye efecto"],
    viaAdministracion: ["oral"], dosis: { adulto: "5 mg cada 8h. Aumentar 5 mg cada 2-3 días. Máx: 60 mg/día", pediatrico: "No establecido en <18 años", ajusteHepatico: "Contraindicado en insuficiencia grave" },
    presentaciones: ["Comprimidos 5, 10 mg"], embarazo: "B",
    lactancia: "Se desconoce excreción. Evitar.", cuidadosEnfermeria: ["Efecto terapéutico tarda 2-4 semanas", "No produce sedación significativa ni dependencia", "No administrar con jugo de pomelo", "Evaluar ansiedad con escala de Hamilton"],
    farmacocinetica: { absorcion: "Oral rápida, primer paso extenso", metabolismo: "Hepático CYP3A4", excrecion: "Renal 29-63%", vidaMedia: "2-3 horas", inicioAccion: "2-4 semanas", duracionAccion: "8 horas" },
    almacenamiento: "Temperatura ambiente.", unidadId: "u01", capituloId: "c01_04"
  },
  {
    id: "modafinilo", nombre: "Modafinilo", nombreGenerico: "Modafinilo",
    nombresComerciales: ["Provigil", "Modiodal", "Vigicer"], familia: "Psicoestimulantes",
    clasificacion: "Agente promotor de vigilia", mecanismoAccion: "Mecanismo no completamente elucidado. Aumenta dopamina extracelular bloqueando su recaptación. Activa neuronas orexinérgicas del hipotálamo.",
    indicaciones: ["Narcolepsia", "Apnea obstructiva del sueño (somnolencia residual)", "Trastorno del sueño por trabajo en turnos"],
    contraindicaciones: ["Hipersensibilidad", "Arritmias cardíacas", "Hipertrofia ventricular izquierda", "Prolapso de válvula mitral"],
    efectosAdversos: ["Cefalea", "Náuseas", "Insomnio", "Nerviosismo", "⚠️ Síndrome de Stevens-Johnson (raro pero grave)", "⚠️ Riesgo de dependencia psicológica"],
    interacciones: ["Anticonceptivos orales: reduce eficacia", "Warfarina: monitorizar INR", "Ciclosporina: reduce niveles", "CYP3A4 inductores/inhibidores"],
    viaAdministracion: ["oral"], dosis: { adulto: "200 mg por la mañana. Máx: 400 mg/día", ajusteHepatico: "Reducir a 100 mg/día" },
    presentaciones: ["Comprimidos 100, 200 mg"], embarazo: "C",
    lactancia: "Se desconoce. No recomendado.", cuidadosEnfermeria: ["Administrar por la mañana para evitar insomnio", "Monitorizar PA y FC", "Evaluar patrón de sueño", "No reemplaza higiene del sueño adecuada", "Vigilar signos de reacciones cutáneas graves"],
    farmacocinetica: { absorcion: "Oral rápida", metabolismo: "Hepático (hidrólisis amídica, CYP3A4)", excrecion: "Renal 80%", vidaMedia: "12-15 horas", inicioAccion: "1-2 horas", picoAccion: "2-4 horas", duracionAccion: "12-15 horas" },
    almacenamiento: "Temperatura ambiente.", unidadId: "u01", capituloId: "c01_08"
  },
  {
    id: "rivastigmina", nombre: "Rivastigmina", nombreGenerico: "Rivastigmina",
    nombresComerciales: ["Exelon", "Prometax"], familia: "Antialzheimer",
    clasificacion: "Inhibidor de colinesterasa (dual: AChE y BuChE)", mecanismoAccion: "Inhibe acetilcolinesterasa y butirilcolinesterasa en SNC, aumentando la disponibilidad de acetilcolina en la hendidura sináptica.",
    indicaciones: ["Demencia leve a moderada por Alzheimer", "Demencia asociada a enfermedad de Parkinson"],
    contraindicaciones: ["Hipersensibilidad", "Reacción previa en sitio de aplicación del parche (severa)"],
    efectosAdversos: ["Náuseas y vómitos (frecuentes)", "Diarrea", "Anorexia", "Pérdida de peso", "Mareo", "⚠️ Bradicardia severa en pacientes susceptibles"],
    interacciones: ["Betabloqueantes: riesgo de bradicardia", "Succinilcolina: potencia bloqueo neuromuscular", "Anticolinérgicos: antagonismo farmacológico"],
    viaAdministracion: ["oral", "transdermica"], dosis: { adulto: "Oral: inicio 1.5 mg/12h, aumentar cada 2 sem. Máx: 6 mg/12h. Parche: 4.6 mg/24h, aumentar a 9.5 mg/24h", ajusteHepatico: "Titular con precaución", ajusteRenal: "No requiere ajuste" },
    presentaciones: ["Cápsulas 1.5, 3, 4.5, 6 mg", "Solución oral 2 mg/mL", "Parche transdérmico 4.6, 9.5, 13.3 mg/24h"], embarazo: "B",
    lactancia: "Se desconoce. No recomendado.", cuidadosEnfermeria: ["Administrar con alimentos para reducir náuseas", "Parche: rotar sitio de aplicación diariamente", "Monitorizar peso corporal semanalmente", "Evaluar función cognitiva con MMSE periódicamente", "Titular dosis gradualmente para mejorar tolerancia"],
    farmacocinetica: { absorcion: "Oral: rápida, biodisponibilidad 36%", metabolismo: "Hidrólisis por colinesterasas (no hepático)", excrecion: "Renal >90%", vidaMedia: "1.5h oral, 3h transdérmica", inicioAccion: "Semanas", duracionAccion: "12h oral, 24h parche" },
    almacenamiento: "Cápsulas: temperatura ambiente. Parches: refrigerar antes de abrir.", unidadId: "u01", capituloId: "c01_08"
  },
  {
    id: "galantamina", nombre: "Galantamina", nombreGenerico: "Galantamina",
    nombresComerciales: ["Reminyl", "Razadyne"], familia: "Antialzheimer",
    clasificacion: "Inhibidor de colinesterasa y modulador alostérico nicotínico", mecanismoAccion: "Inhibe reversiblemente la acetilcolinesterasa y modula alostéricamente los receptores nicotínicos de acetilcolina, potenciando la neurotransmisión colinérgica.",
    indicaciones: ["Demencia leve a moderada por Alzheimer", "Demencia mixta (Alzheimer + vascular)"],
    contraindicaciones: ["Hipersensibilidad", "Insuficiencia hepática o renal grave (ClCr <9 mL/min)"],
    efectosAdversos: ["Náuseas", "Vómitos", "Diarrea", "Bradicardia", "Anorexia", "Pérdida de peso"],
    interacciones: ["Digoxina: riesgo de bradicardia", "Paroxetina/fluoxetina: aumentan niveles de galantamina", "Anticolinérgicos: antagonismo"],
    viaAdministracion: ["oral"], dosis: { adulto: "Inicio: 4 mg/12h por 4 semanas, luego 8 mg/12h. Liberación prolongada: 8 mg/día, aumentar a 16-24 mg/día", ajusteRenal: "Máx 16 mg/día si ClCr 9-59 mL/min", ajusteHepatico: "Máx 16 mg/día en moderada. Contraindicado en grave" },
    presentaciones: ["Comprimidos 4, 8, 12 mg", "Cápsulas LP 8, 16, 24 mg", "Solución oral 4 mg/mL"], embarazo: "C",
    lactancia: "Se desconoce. No recomendado.", cuidadosEnfermeria: ["Administrar con alimentos", "Titular gradualmente cada 4 semanas", "Monitorizar FC (riesgo bradicardia)", "LP: administrar 1 vez al día por la mañana", "Evaluar función cognitiva periódicamente"],
    farmacocinetica: { absorcion: "Oral rápida, biodisponibilidad 90%", metabolismo: "Hepático CYP2D6, CYP3A4", excrecion: "Renal 20-25% sin cambios", vidaMedia: "7 horas", inicioAccion: "Semanas", picoAccion: "1h (liberación inmediata)" },
    almacenamiento: "Temperatura ambiente.", unidadId: "u01", capituloId: "c01_08"
  },
  // ========== U02 - Cardiovascular ==========
  {
    id: "valsartan", nombre: "Valsartán", nombreGenerico: "Valsartán",
    nombresComerciales: ["Diovan", "Valtan", "Tareg"], familia: "Antihipertensivos",
    clasificacion: "Antagonista del receptor de angiotensina II (ARA-II)", mecanismoAccion: "Bloquea selectivamente el receptor AT1 de angiotensina II, produciendo vasodilatación, reducción de aldosterona y disminución de la presión arterial.",
    indicaciones: ["Hipertensión arterial", "Insuficiencia cardíaca (NYHA II-IV)", "Post-infarto de miocardio con disfunción ventricular"],
    contraindicaciones: ["Hipersensibilidad", "Embarazo (2do y 3er trimestre)", "Estenosis bilateral de arteria renal", "Uso concomitante con aliskiren en diabéticos"],
    efectosAdversos: ["Mareo", "Hipotensión", "Hiperpotasemia", "Cefalea", "Fatiga", "⚠️ Insuficiencia renal aguda en estenosis renal bilateral"],
    interacciones: ["IECA: hiperpotasemia y daño renal (evitar doble bloqueo)", "Espironolactona: hiperpotasemia", "AINEs: reducen efecto antihipertensivo", "Litio: aumenta niveles de litio"],
    viaAdministracion: ["oral"], dosis: { adulto: "HTA: 80-160 mg/día. IC: inicio 40 mg/12h, máx 160 mg/12h. Post-IAM: inicio 20 mg/12h", ajusteRenal: "No requiere ajuste si ClCr >10 mL/min", ajusteHepatico: "Máx 80 mg/día en insuficiencia hepática" },
    presentaciones: ["Comprimidos 40, 80, 160, 320 mg", "Comprimidos combinados con HCTZ"], embarazo: "D",
    lactancia: "No recomendado.", cuidadosEnfermeria: ["Monitorizar PA y potasio sérico", "Vigilar función renal (creatinina, BUN)", "No administrar con suplementos de potasio sin indicación", "Educar sobre signos de hipotensión ortostática", "Contraindicado en embarazo: test previo en mujeres fértiles"],
    farmacocinetica: { absorcion: "Oral, biodisponibilidad 25%", metabolismo: "Hepático mínimo (no CYP significativo)", excrecion: "Fecal 83%, renal 13%", vidaMedia: "6 horas", inicioAccion: "2 horas", picoAccion: "2-4 horas", duracionAccion: "24 horas" },
    almacenamiento: "Temperatura ambiente. Proteger de humedad.", unidadId: "u02", capituloId: "c02_01"
  },
  {
    id: "irbesartan", nombre: "Irbesartán", nombreGenerico: "Irbesartán",
    nombresComerciales: ["Avapro", "Aprovel", "Irbesartán Gador"], familia: "Antihipertensivos",
    clasificacion: "Antagonista del receptor de angiotensina II (ARA-II)", mecanismoAccion: "Bloqueo selectivo del receptor AT1 de angiotensina II. Reduce la presión arterial y tiene efecto nefroprotector en nefropatía diabética.",
    indicaciones: ["Hipertensión arterial", "Nefropatía diabética en DM tipo 2 con hipertensión"],
    contraindicaciones: ["Hipersensibilidad", "Embarazo", "Uso concomitante con aliskiren en diabéticos"],
    efectosAdversos: ["Mareo", "Fatiga", "Hiperpotasemia", "Diarrea", "Hipotensión ortostática"],
    interacciones: ["Suplementos de potasio: hiperpotasemia", "AINEs: reducen eficacia", "Litio: toxicidad por litio"],
    viaAdministracion: ["oral"], dosis: { adulto: "150-300 mg/día en una toma", ajusteRenal: "No requiere ajuste", ajusteHepatico: "No requiere ajuste" },
    presentaciones: ["Comprimidos 75, 150, 300 mg"], embarazo: "D",
    lactancia: "No recomendado.", cuidadosEnfermeria: ["Monitorizar PA, potasio y función renal", "Puede tomarse con o sin alimentos", "Efecto máximo a las 4-6 semanas de tratamiento", "Educar sobre no suspender abruptamente"],
    farmacocinetica: { absorcion: "Oral, biodisponibilidad 60-80%", metabolismo: "Hepático CYP2C9 (mínimo)", excrecion: "Fecal 80%, renal 20%", vidaMedia: "11-15 horas", inicioAccion: "1-2 horas", picoAccion: "1.5-2 horas", duracionAccion: "24 horas" },
    almacenamiento: "Temperatura ambiente.", unidadId: "u02", capituloId: "c02_01"
  },
  {
    id: "bisoprolol", nombre: "Bisoprolol", nombreGenerico: "Bisoprolol",
    nombresComerciales: ["Concor", "Emcor", "Bisoprolol Gador"], familia: "Antihipertensivos",
    clasificacion: "Betabloqueante cardioselectivo (β1)", mecanismoAccion: "Bloqueo selectivo de receptores β1-adrenérgicos cardíacos, reduciendo frecuencia cardíaca, gasto cardíaco y liberación de renina.",
    indicaciones: ["Hipertensión arterial", "Insuficiencia cardíaca crónica estable (NYHA II-IV)", "Angina de pecho estable", "Arritmias supraventriculares"],
    contraindicaciones: ["Asma bronquial grave", "Bradicardia severa (<50 lpm)", "Bloqueo AV de 2° o 3° grado sin marcapasos", "Shock cardiogénico", "Feocromocitoma no tratado"],
    efectosAdversos: ["Bradicardia", "Hipotensión", "Fatiga", "Extremidades frías", "Broncoespasmo (dosis altas)", "⚠️ No suspender abruptamente: riesgo de angina de rebote"],
    interacciones: ["Verapamilo/diltiazem: bradicardia severa y bloqueo AV", "Insulina: enmascara hipoglucemia", "Clonidina: crisis hipertensiva al suspender", "AINEs: reducen efecto antihipertensivo"],
    viaAdministracion: ["oral"], dosis: { adulto: "HTA: 5-10 mg/día. IC: inicio 1.25 mg/día, titular cada 2 sem hasta 10 mg/día", ajusteRenal: "Máx 10 mg/día si ClCr <20 mL/min", ajusteHepatico: "Máx 10 mg/día en insuficiencia hepática grave" },
    presentaciones: ["Comprimidos 1.25, 2.5, 5, 10 mg"], embarazo: "C",
    lactancia: "Se excreta en leche. Precaución.", cuidadosEnfermeria: ["Medir FC antes de cada dosis (no dar si FC <50 lpm)", "Titular lentamente en IC: duplicar dosis cada 2 semanas", "No suspender abruptamente: reducir gradualmente en 1-2 semanas", "Monitorizar glucemia en diabéticos (enmascara hipoglucemia)", "Pesar diariamente en pacientes con IC"],
    farmacocinetica: { absorcion: "Oral >90%, biodisponibilidad 80%", metabolismo: "Hepático 50% (CYP2D6, CYP3A4)", excrecion: "Renal 50% sin cambios", vidaMedia: "10-12 horas", inicioAccion: "1-2 horas", picoAccion: "2-4 horas", duracionAccion: "24 horas" },
    almacenamiento: "Temperatura ambiente. Proteger de la luz.", unidadId: "u02", capituloId: "c02_01"
  },
  {
    id: "nebivolol", nombre: "Nebivolol", nombreGenerico: "Nebivolol",
    nombresComerciales: ["Bystolic", "Nebilet", "Lobivon"], familia: "Antihipertensivos",
    clasificacion: "Betabloqueante cardioselectivo β1 con acción vasodilatadora (NO)", mecanismoAccion: "Bloquea selectivamente receptores β1 cardíacos y estimula la liberación de óxido nítrico endotelial, produciendo vasodilatación periférica.",
    indicaciones: ["Hipertensión arterial", "Insuficiencia cardíaca crónica estable (≥70 años)"],
    contraindicaciones: ["Bradicardia severa", "Bloqueo AV 2°-3° grado", "IC descompensada", "Asma grave", "Insuficiencia hepática grave"],
    efectosAdversos: ["Cefalea", "Fatiga", "Mareo", "Bradicardia", "Diarrea", "Parestesias"],
    interacciones: ["Verapamilo/diltiazem: bradicardia severa", "Fluoxetina/paroxetina (CYP2D6): aumentan niveles", "Clonidina: no suspender simultáneamente"],
    viaAdministracion: ["oral"], dosis: { adulto: "5 mg/día, puede aumentarse a 10-40 mg/día", ajusteRenal: "Inicio 2.5 mg/día si ClCr <30 mL/min", ajusteHepatico: "Inicio 2.5 mg/día. Contraindicado en grave" },
    presentaciones: ["Comprimidos 2.5, 5, 10, 20 mg"], embarazo: "C",
    lactancia: "Se excreta en leche. No recomendado.", cuidadosEnfermeria: ["Medir FC y PA antes de administrar", "Puede tomarse con o sin alimentos", "No suspender abruptamente", "Ventaja sobre otros BB: no produce disfunción eréctil frecuentemente"],
    farmacocinetica: { absorcion: "Oral, biodisponibilidad 12-96% (según CYP2D6)", metabolismo: "Hepático CYP2D6", excrecion: "Renal 38%, fecal 44%", vidaMedia: "12-19 horas", inicioAccion: "1-2 horas", duracionAccion: "24 horas" },
    almacenamiento: "Temperatura ambiente.", unidadId: "u02", capituloId: "c02_01"
  },
  {
    id: "espironolactona_ic", nombre: "Sacubitrilo/Valsartán", nombreGenerico: "Sacubitrilo/Valsartán",
    nombresComerciales: ["Entresto"], familia: "Insuficiencia Cardíaca",
    clasificacion: "Inhibidor de neprilisina y antagonista del receptor de angiotensina (ARNI)", mecanismoAccion: "Sacubitrilo inhibe neprilisina aumentando péptidos natriuréticos (vasodilatación, natriuresis). Valsartán bloquea receptor AT1. Efecto sinérgico en IC.",
    indicaciones: ["Insuficiencia cardíaca crónica con fracción de eyección reducida (ICFEr)", "Reemplaza IECA/ARA-II en IC sintomática"],
    contraindicaciones: ["Uso concomitante con IECA (esperar 36h)", "Antecedente de angioedema", "Embarazo", "Insuficiencia hepática grave"],
    efectosAdversos: ["Hipotensión", "Hiperpotasemia", "Mareo", "Insuficiencia renal", "⚠️ Angioedema (raro pero grave)"],
    interacciones: ["IECA: angioedema (contraindicado, esperar 36h de washout)", "Espironolactona: hiperpotasemia", "AINEs: daño renal", "Aliskiren: contraindicado en diabéticos"],
    viaAdministracion: ["oral"], dosis: { adulto: "Inicio: 49/51 mg cada 12h (24/26 mg si PA baja o naive). Meta: 97/103 mg cada 12h", ajusteRenal: "Inicio 24/26 mg/12h si ClCr <30 mL/min", ajusteHepatico: "Inicio 24/26 mg/12h en moderada. Contraindicado en grave" },
    presentaciones: ["Comprimidos 24/26 mg, 49/51 mg, 97/103 mg"], embarazo: "D",
    lactancia: "No recomendado.", cuidadosEnfermeria: ["NUNCA combinar con IECA (esperar mínimo 36h tras suspender IECA)", "Monitorizar PA, potasio y función renal", "Titular cada 2-4 semanas según tolerancia", "Vigilar signos de angioedema (edema facial, disnea)", "Pilar del tratamiento moderno de ICFEr según guías ESC/AHA"],
    farmacocinetica: { absorcion: "Oral, sacubitrilo biodisponibilidad >60%", metabolismo: "Sacubitrilo: prodroga activada por esterasas. Valsartán: mínimo", excrecion: "Renal y fecal", vidaMedia: "Sacubitrilo: 1.4h (metabolito activo: 11.5h). Valsartán: 9.9h", inicioAccion: "1 hora", duracionAccion: "12 horas" },
    almacenamiento: "Temperatura ambiente. Proteger de humedad.", unidadId: "u02", capituloId: "c02_01"
  },
  // ========== U03 - Antiinfecciosos ==========
  {
    id: "cefotaxima", nombre: "Cefotaxima", nombreGenerico: "Cefotaxima",
    nombresComerciales: ["Claforan", "Cefotaxima Richet"], familia: "Cefalosporinas de 3ª generación",
    clasificacion: "Antibiótico betalactámico", mecanismoAccion: "Inhibe la síntesis de pared celular bacteriana uniéndose a PBP (proteínas fijadoras de penicilina). Amplio espectro contra gram-negativos.",
    indicaciones: ["Meningitis bacteriana", "Sepsis neonatal", "Neumonía adquirida en comunidad grave", "Infecciones urinarias complicadas", "Peritonitis"],
    contraindicaciones: ["Alergia a cefalosporinas", "Alergia severa a penicilinas (anafilaxia)"],
    efectosAdversos: ["Diarrea", "Rash cutáneo", "Flebitis en sitio IV", "Eosinofilia", "⚠️ Colitis por C. difficile"],
    interacciones: ["Aminoglucósidos: sinergismo (pero nefrotoxicidad aditiva)", "Probenecid: aumenta niveles de cefotaxima", "Furosemida: nefrotoxicidad aditiva"],
    viaAdministracion: ["IV", "IM"], dosis: { adulto: "1-2 g cada 6-8h IV/IM. Meningitis: 2 g cada 4-6h", pediatrico: "50-200 mg/kg/día dividido cada 6-8h. Meningitis: 200-300 mg/kg/día", ajusteRenal: "Reducir frecuencia si ClCr <20 mL/min" },
    presentaciones: ["Viales 500 mg, 1 g, 2 g"], embarazo: "B",
    lactancia: "Se excreta en pequeñas cantidades. Compatible.", cuidadosEnfermeria: ["Reconstituir con agua estéril o SF", "IV directa: administrar en 3-5 min", "Infusión: diluir en 50-100 mL SF y pasar en 20-30 min", "Vigilar signos de superinfección", "Monitorizar función renal en tratamientos prolongados"],
    farmacocinetica: { absorcion: "No se absorbe por vía oral", metabolismo: "Hepático parcial a desacetilcefotaxima (activa)", excrecion: "Renal 40-60%", vidaMedia: "1 hora (metabolito: 1.5h)", inicioAccion: "IV: inmediato, IM: 30 min", duracionAccion: "6-8 horas" },
    almacenamiento: "Viales: temperatura ambiente. Reconstituido: refrigerar, usar en 24h.", unidadId: "u03", capituloId: "c03_01"
  },
  {
    id: "cefixima", nombre: "Cefixima", nombreGenerico: "Cefixima",
    nombresComerciales: ["Suprax", "Denvar", "Cefixima LPH"], familia: "Cefalosporinas de 3ª generación",
    clasificacion: "Antibiótico betalactámico oral", mecanismoAccion: "Inhibe síntesis de pared celular bacteriana. Cefalosporina oral de 3ª generación con actividad contra gram-negativos.",
    indicaciones: ["Infección urinaria no complicada", "Otitis media aguda", "Faringitis estreptocócica", "Gonorrea no complicada (dosis única)", "Bronquitis bacteriana"],
    contraindicaciones: ["Alergia a cefalosporinas", "Alergia severa a penicilinas"],
    efectosAdversos: ["Diarrea (frecuente)", "Dolor abdominal", "Náuseas", "Cefalea", "Rash"],
    interacciones: ["Probenecid: aumenta niveles", "Anticoagulantes orales: puede aumentar efecto", "Carbamazepina: aumenta niveles de carbamazepina"],
    viaAdministracion: ["oral"], dosis: { adulto: "400 mg/día en 1-2 tomas. Gonorrea: 400 mg dosis única", pediatrico: "8 mg/kg/día en 1-2 tomas. Máx: 400 mg/día", ajusteRenal: "200 mg/día si ClCr 21-60 mL/min. 100 mg/día si ClCr <20" },
    presentaciones: ["Comprimidos 400 mg", "Suspensión 100 mg/5 mL"], embarazo: "B",
    lactancia: "Se desconoce. Usar con precaución.", cuidadosEnfermeria: ["Puede tomarse con o sin alimentos", "Suspensión: agitar bien antes de usar", "Completar tratamiento completo aunque mejore", "Vigilar diarrea (frecuente con cefalosporinas orales)"],
    farmacocinetica: { absorcion: "Oral 40-50%", metabolismo: "Mínimo", excrecion: "Renal 50%, biliar 10%", vidaMedia: "3-4 horas", inicioAccion: "2-6 horas", duracionAccion: "24 horas" },
    almacenamiento: "Temperatura ambiente. Suspensión reconstituida: refrigerar 14 días.", unidadId: "u03", capituloId: "c03_01"
  },
  {
    id: "doripenem", nombre: "Doripenem", nombreGenerico: "Doripenem",
    nombresComerciales: ["Doribax", "Finibax"], familia: "Carbapenémicos",
    clasificacion: "Antibiótico betalactámico de amplio espectro", mecanismoAccion: "Se une a PBP (PBP2, PBP3, PBP4) inhibiendo la síntesis de pared celular. Estable frente a la mayoría de betalactamasas incluyendo BLEE.",
    indicaciones: ["Neumonía nosocomial/asociada a ventilador", "Infección intraabdominal complicada", "Infección urinaria complicada (pielonefritis)"],
    contraindicaciones: ["Alergia a carbapenémicos", "Alergia severa a betalactámicos"],
    efectosAdversos: ["Cefalea", "Náuseas", "Diarrea", "Rash", "Flebitis", "⚠️ Convulsiones (raro, más frecuente con dosis altas o insuficiencia renal)"],
    interacciones: ["Ácido valproico: reduce niveles de valproico significativamente (evitar)", "Probenecid: aumenta niveles de doripenem"],
    viaAdministracion: ["IV"], dosis: { adulto: "500 mg cada 8h en infusión de 1-4h", ajusteRenal: "250 mg cada 8h si ClCr 10-30 mL/min" },
    presentaciones: ["Viales 250, 500 mg"], embarazo: "B",
    lactancia: "Se desconoce. Precaución.", cuidadosEnfermeria: ["Infusión IV en 1 hora (puede extenderse a 4h para optimizar PK/PD)", "No mezclar con otros fármacos en la misma línea", "Vigilar función renal y hepática", "Monitorizar signos de convulsiones", "Infusión prolongada (4h) mejora eficacia en patógenos resistentes"],
    farmacocinetica: { metabolismo: "Hidrólisis renal del anillo betalactámico", excrecion: "Renal 70% sin cambios", vidaMedia: "1 hora", inicioAccion: "Inmediato", duracionAccion: "8 horas" },
    almacenamiento: "Viales: temperatura ambiente. Reconstituido: estable 12h a TA, 72h refrigerado.", unidadId: "u03", capituloId: "c03_03"
  },
  {
    id: "daptomicina", nombre: "Daptomicina", nombreGenerico: "Daptomicina",
    nombresComerciales: ["Cubicin", "Daptomicina Sandoz"], familia: "Lipopéptidos cíclicos",
    clasificacion: "Antibiótico lipopéptido", mecanismoAccion: "Se inserta en la membrana celular bacteriana dependiente de calcio, formando canales iónicos que causan despolarización y muerte celular. Bactericida contra gram-positivos.",
    indicaciones: ["Bacteriemia por S. aureus (incluyendo MRSA)", "Endocarditis derecha por S. aureus", "Infecciones complicadas de piel y tejidos blandos"],
    contraindicaciones: ["Hipersensibilidad", "Neumonía (surfactante inactiva la daptomicina)"],
    efectosAdversos: ["Elevación de CPK", "Diarrea", "Cefalea", "Rash", "⚠️ Rabdomiólisis (suspender si CPK >10x LSN)", "⚠️ Neumonía eosinofílica (rara)"],
    interacciones: ["Estatinas: mayor riesgo de miopatía (suspender durante tratamiento)", "Warfarina: monitorizar INR"],
    viaAdministracion: ["IV"], dosis: { adulto: "Piel: 4 mg/kg/día IV. Bacteriemia/endocarditis: 6-10 mg/kg/día IV", ajusteRenal: "Mismo mg/kg cada 48h si ClCr <30 mL/min o hemodiálisis" },
    presentaciones: ["Viales 350, 500 mg"], embarazo: "B",
    lactancia: "Se excreta en mínimas cantidades. Compatible probablemente.", cuidadosEnfermeria: ["Medir CPK basal y semanalmente", "Suspender estatinas durante tratamiento", "Infusión IV en 30 min (o inyección IV en 2 min)", "NO usar para neumonía (inactivada por surfactante)", "Vigilar signos de miopatía: dolor muscular, debilidad"],
    farmacocinetica: { distribucion: "Unión a proteínas 90-93%", metabolismo: "Mínimo", excrecion: "Renal 78%", vidaMedia: "8-9 horas", inicioAccion: "Inmediato", duracionAccion: "24 horas" },
    almacenamiento: "Refrigerar 2-8°C. Reconstituido: estable 12h a TA.", unidadId: "u03", capituloId: "c03_03"
  },
  // ========== U04 - Respiratorio ==========
  {
    id: "roflumilast", nombre: "Roflumilast", nombreGenerico: "Roflumilast",
    nombresComerciales: ["Daxas", "Daliresp"], familia: "Antiinflamatorios respiratorios",
    clasificacion: "Inhibidor selectivo de fosfodiesterasa-4 (PDE4)", mecanismoAccion: "Inhibe PDE4, aumentando AMPc intracelular en células inflamatorias, lo que reduce la liberación de mediadores inflamatorios en las vías aéreas.",
    indicaciones: ["EPOC grave con fenotipo exacerbador frecuente", "EPOC con bronquitis crónica y exacerbaciones recurrentes"],
    contraindicaciones: ["Insuficiencia hepática moderada-grave", "Depresión severa con ideación suicida"],
    efectosAdversos: ["Diarrea (frecuente, suele remitir)", "Pérdida de peso", "Náuseas", "Cefalea", "⚠️ Trastornos psiquiátricos: insomnio, ansiedad, depresión"],
    interacciones: ["Rifampicina: reduce eficacia significativamente", "Fluvoxamina/cimetidina: aumentan niveles", "Teofilina: no combinar (no beneficio adicional)"],
    viaAdministracion: ["oral"], dosis: { adulto: "500 mcg/día en una toma", ajusteHepatico: "Contraindicado en moderada-grave" },
    presentaciones: ["Comprimidos 500 mcg"], embarazo: "C",
    lactancia: "Se excreta en leche. Contraindicado.", cuidadosEnfermeria: ["No es broncodilatador: no usar para alivio agudo", "Monitorizar peso corporal", "Evaluar estado de ánimo y signos de depresión", "La diarrea suele mejorar en las primeras semanas", "Complementa terapia inhalatoria, no la reemplaza"],
    farmacocinetica: { absorcion: "Oral ~80%", metabolismo: "Hepático CYP3A4/CYP1A2 a N-óxido (activo)", excrecion: "Renal 70%", vidaMedia: "17h (metabolito activo: 30h)", inicioAccion: "Semanas", duracionAccion: "24 horas" },
    almacenamiento: "Temperatura ambiente.", unidadId: "u04", capituloId: "c04_05"
  },
  {
    id: "omalizumab", nombre: "Omalizumab", nombreGenerico: "Omalizumab",
    nombresComerciales: ["Xolair"], familia: "Anticuerpos monoclonales",
    clasificacion: "Anti-IgE (anticuerpo monoclonal humanizado)", mecanismoAccion: "Se une a la IgE libre circulante, impidiendo su unión al receptor FcεRI en mastocitos y basófilos, reduciendo la cascada alérgica e inflamatoria.",
    indicaciones: ["Asma alérgica grave persistente no controlada con corticoides inhalados", "Urticaria crónica espontánea refractaria a antihistamínicos"],
    contraindicaciones: ["Hipersensibilidad", "Menores de 6 años (asma) o 12 años (urticaria)"],
    efectosAdversos: ["Dolor en sitio de inyección", "Cefalea", "Artralgias", "⚠️ Anafilaxia (puede ocurrir hasta 24h post-inyección, incluso tras dosis previas toleradas)", "Infecciones parasitarias (al reducir IgE)"],
    interacciones: ["No interacciones significativas conocidas", "Inmunoterapia: puede usarse conjuntamente"],
    viaAdministracion: ["SC"], dosis: { adulto: "Asma: 150-375 mg SC cada 2-4 semanas (según IgE basal y peso). Urticaria: 150-300 mg SC cada 4 semanas" },
    presentaciones: ["Jeringa precargada 75, 150 mg", "Vial 150 mg"], embarazo: "B",
    lactancia: "Probablemente se excreta. Usar con precaución.", cuidadosEnfermeria: ["Administrar SOLO en centro con capacidad de tratar anafilaxia", "Observar al paciente mínimo 2 horas tras primeras 3 dosis", "Medir IgE basal ANTES de iniciar (determina dosis)", "Mantener epinefrina disponible", "Efecto terapéutico en 12-16 semanas"],
    farmacocinetica: { absorcion: "SC, biodisponibilidad 62%", metabolismo: "Degradación por sistema reticuloendotelial", excrecion: "Hepática (degradación IgG)", vidaMedia: "26 días", inicioAccion: "Semanas a meses", duracionAccion: "2-4 semanas" },
    almacenamiento: "Refrigerar 2-8°C. No congelar.", unidadId: "u04", capituloId: "c04_05"
  },
  // ========== U05 - Digestivo ==========
  {
    id: "rabeprazol", nombre: "Rabeprazol", nombreGenerico: "Rabeprazol sódico",
    nombresComerciales: ["Pariet", "Aciphex", "Rabec"], familia: "Inhibidores de bomba de protones",
    clasificacion: "Antiulceroso (IBP)", mecanismoAccion: "Inhibe irreversiblemente la bomba H+/K+-ATPasa en la célula parietal gástrica, suprimiendo la secreción ácida basal y estimulada.",
    indicaciones: ["Úlcera gástrica y duodenal", "ERGE", "Síndrome de Zollinger-Ellison", "Erradicación de H. pylori (en combinación)", "Prevención de úlcera por AINEs"],
    contraindicaciones: ["Hipersensibilidad a IBP"],
    efectosAdversos: ["Cefalea", "Diarrea", "Dolor abdominal", "Flatulencia", "⚠️ Uso prolongado: hipomagnesemia, fracturas óseas, déficit B12, C. difficile"],
    interacciones: ["Clopidogrel: menor interacción que omeprazol (preferido)", "Metotrexato: aumenta niveles", "Ketoconazol: reduce absorción"],
    viaAdministracion: ["oral"], dosis: { adulto: "20 mg/día. Zollinger-Ellison: 60-120 mg/día. H. pylori: 20 mg/12h + antibióticos x 14 días", ajusteHepatico: "Precaución en insuficiencia grave" },
    presentaciones: ["Comprimidos gastrorresistentes 10, 20 mg"], embarazo: "B",
    lactancia: "Se desconoce. Precaución.", cuidadosEnfermeria: ["Administrar 30 min antes del desayuno", "No triturar ni masticar (gastrorresistente)", "Ventaja en pacientes con clopidogrel (menor interacción CYP2C19)", "En uso >8 semanas: monitorizar magnesio", "Evaluar necesidad de continuar IBP periódicamente"],
    farmacocinetica: { absorcion: "Oral, biodisponibilidad 52%", metabolismo: "Hepático CYP2C19, CYP3A4", excrecion: "Renal 90%", vidaMedia: "1-2 horas", inicioAccion: "1 hora", duracionAccion: "24 horas" },
    almacenamiento: "Temperatura ambiente. Proteger de humedad.", unidadId: "u05", capituloId: "c05_01"
  },
  {
    id: "prucaloprida", nombre: "Prucaloprida", nombreGenerico: "Prucaloprida",
    nombresComerciales: ["Resolor", "Motegrity"], familia: "Procinéticos",
    clasificacion: "Agonista selectivo del receptor 5-HT4", mecanismoAccion: "Agonista de alta afinidad del receptor serotoninérgico 5-HT4 en el plexo mientérico. Estimula la motilidad colónica y el reflejo peristáltico.",
    indicaciones: ["Estreñimiento crónico en adultos que no responden a laxantes"],
    contraindicaciones: ["Obstrucción intestinal", "Perforación intestinal", "Enfermedad de Crohn o colitis ulcerosa activa", "Insuficiencia renal grave que requiera diálisis"],
    efectosAdversos: ["Cefalea (frecuente, primer día)", "Náuseas", "Dolor abdominal", "Diarrea", "Mareo"],
    interacciones: ["No interacciones clínicamente significativas", "No afecta CYP450"],
    viaAdministracion: ["oral"], dosis: { adulto: "2 mg/día. Mayores de 65 años: inicio 1 mg/día", ajusteRenal: "1 mg/día si ClCr <30 mL/min" },
    presentaciones: ["Comprimidos 1, 2 mg"], embarazo: "C",
    lactancia: "Se excreta en leche. No recomendado.", cuidadosEnfermeria: ["Puede tomarse con o sin alimentos", "Evaluar respuesta en 4 semanas", "La cefalea del primer día suele ser transitoria", "No usar como laxante de rescate", "Registrar frecuencia y consistencia de deposiciones"],
    farmacocinetica: { absorcion: "Oral >90%", metabolismo: "Hepático mínimo (CYP3A4)", excrecion: "Renal 60% sin cambios", vidaMedia: "24 horas", inicioAccion: "Horas a días", duracionAccion: "24 horas" },
    almacenamiento: "Temperatura ambiente.", unidadId: "u05", capituloId: "c05_03"
  },
  // ========== U06 - Endocrino ==========
  {
    id: "dulaglutida", nombre: "Dulaglutida", nombreGenerico: "Dulaglutida",
    nombresComerciales: ["Trulicity"], familia: "Antidiabéticos",
    clasificacion: "Agonista del receptor GLP-1 (semanal)", mecanismoAccion: "Análogo de GLP-1 de acción prolongada. Estimula secreción de insulina glucosa-dependiente, suprime glucagón, enlentece vaciamiento gástrico y promueve saciedad.",
    indicaciones: ["Diabetes mellitus tipo 2 (monoterapia o combinación)", "Reducción de riesgo cardiovascular en DM2 con enfermedad CV establecida"],
    contraindicaciones: ["Antecedente personal/familiar de carcinoma medular de tiroides", "Neoplasia endocrina múltiple tipo 2", "Pancreatitis aguda"],
    efectosAdversos: ["Náuseas (frecuente, disminuye con el tiempo)", "Diarrea", "Vómitos", "Dolor abdominal", "Disminución del apetito", "⚠️ Pancreatitis aguda (rara)", "⚠️ Tumores tiroideos de células C (en roedores)"],
    interacciones: ["Insulina/sulfonilureas: mayor riesgo de hipoglucemia (reducir dosis)", "Anticoagulantes orales: retraso en absorción", "Paracetamol: retraso en absorción por vaciamiento gástrico lento"],
    viaAdministracion: ["SC"], dosis: { adulto: "0.75 mg SC semanal. Puede aumentarse a 1.5 mg, luego 3 mg y máx 4.5 mg semanal" },
    presentaciones: ["Pluma precargada 0.75, 1.5, 3, 4.5 mg"], embarazo: "C",
    lactancia: "Se desconoce. No recomendado.", cuidadosEnfermeria: ["Inyección SC en abdomen, muslo o brazo. Rotar sitios", "Administrar el mismo día de la semana (cualquier hora)", "No requiere ajuste por comidas", "Educar sobre signos de pancreatitis: dolor abdominal severo persistente", "Monitorizar HbA1c cada 3 meses", "Almacenar en refrigerador antes de usar; a TA máximo 14 días"],
    farmacocinetica: { absorcion: "SC, biodisponibilidad 47-65%", metabolismo: "Degradación proteolítica", excrecion: "No renal ni hepática específica", vidaMedia: "5 días", inicioAccion: "Horas", picoAccion: "24-72 horas", duracionAccion: "7 días" },
    almacenamiento: "Refrigerar 2-8°C. No congelar. Fuera de refrigerador: máx 14 días.", unidadId: "u06", capituloId: "c06_01"
  },
  {
    id: "tirzepatida", nombre: "Tirzepatida", nombreGenerico: "Tirzepatida",
    nombresComerciales: ["Mounjaro", "Zepbound"], familia: "Antidiabéticos",
    clasificacion: "Agonista dual GIP/GLP-1", mecanismoAccion: "Primer agonista dual de receptores GIP y GLP-1. Estimula secreción de insulina, suprime glucagón, enlentece vaciamiento gástrico y reduce ingesta calórica con mayor potencia que agonistas GLP-1 puros.",
    indicaciones: ["Diabetes mellitus tipo 2", "Obesidad/sobrepeso con comorbilidades (IMC ≥27)"],
    contraindicaciones: ["Antecedente personal/familiar de carcinoma medular de tiroides", "Neoplasia endocrina múltiple tipo 2", "Pancreatitis aguda"],
    efectosAdversos: ["Náuseas (frecuente)", "Diarrea", "Vómitos", "Estreñimiento", "Dolor abdominal", "⚠️ Pancreatitis aguda", "⚠️ Gastroparesia"],
    interacciones: ["Insulina/sulfonilureas: reducir dosis (riesgo hipoglucemia)", "Anticonceptivos orales: puede reducir absorción (usar método adicional primer mes)"],
    viaAdministracion: ["SC"], dosis: { adulto: "Inicio: 2.5 mg SC semanal x 4 sem. Luego 5 mg. Titular cada 4 sem: 7.5, 10, 12.5, 15 mg", ajusteRenal: "No requiere ajuste", ajusteHepatico: "No requiere ajuste" },
    presentaciones: ["Pluma precargada 2.5, 5, 7.5, 10, 12.5, 15 mg"], embarazo: "C",
    lactancia: "Se desconoce. No recomendado.", cuidadosEnfermeria: ["Titular gradualmente cada 4 semanas para minimizar náuseas", "Administrar mismo día cada semana, cualquier hora", "Monitorizar glucemia, HbA1c y peso", "Informar sobre signos de pancreatitis", "Mayor reducción de peso que otros agonistas GLP-1", "Suspender 2 semanas antes de cirugía (riesgo aspiración por gastroparesia)"],
    farmacocinetica: { absorcion: "SC, biodisponibilidad ~80%", metabolismo: "Proteólisis", excrecion: "Renal (metabolitos)", vidaMedia: "5 días", inicioAccion: "Horas", picoAccion: "8-72 horas", duracionAccion: "7 días" },
    almacenamiento: "Refrigerar 2-8°C. No congelar. A TA: máx 21 días.", unidadId: "u06", capituloId: "c06_01"
  },
  // ========== U08 - Musculoesquelético ==========
  {
    id: "etoricoxib", nombre: "Etoricoxib", nombreGenerico: "Etoricoxib",
    nombresComerciales: ["Arcoxia", "Etoricoxib Gador"], familia: "AINEs",
    clasificacion: "Inhibidor selectivo de COX-2", mecanismoAccion: "Inhibe selectivamente la ciclooxigenasa-2 (COX-2), reduciendo la síntesis de prostaglandinas proinflamatorias con menor efecto sobre COX-1 gástrica.",
    indicaciones: ["Artrosis", "Artritis reumatoide", "Artritis gotosa aguda", "Espondilitis anquilosante", "Dolor dental postoperatorio"],
    contraindicaciones: ["Enfermedad cardiovascular activa (IAM, ACV, IC NYHA II-IV)", "HTA no controlada (>140/90)", "Insuficiencia hepática o renal grave", "Enfermedad inflamatoria intestinal activa", "Embarazo 3er trimestre"],
    efectosAdversos: ["Cefalea", "Mareo", "Edema", "HTA", "Dispepsia", "⚠️ Riesgo cardiovascular aumentado (IAM, ACV) con uso prolongado", "⚠️ Riesgo GI menor que AINEs no selectivos pero presente"],
    interacciones: ["Warfarina: aumenta INR", "Metotrexato: aumenta toxicidad", "IECA/ARA-II: reduce efecto antihipertensivo", "Litio: aumenta niveles"],
    viaAdministracion: ["oral"], dosis: { adulto: "Artrosis: 30-60 mg/día. AR: 60-90 mg/día. Gota aguda: 120 mg/día (máx 8 días). Dolor agudo: 90-120 mg/día (máx 8 días)" },
    presentaciones: ["Comprimidos 30, 60, 90, 120 mg"], embarazo: "C",
    lactancia: "Se desconoce. No recomendado.", cuidadosEnfermeria: ["Monitorizar PA (puede elevarla)", "Usar la menor dosis por el menor tiempo posible", "No usar en pacientes con enfermedad CV establecida", "Evaluar función renal y hepática periódicamente", "No requiere protección gástrica rutinaria pero valorar en pacientes de riesgo"],
    farmacocinetica: { absorcion: "Oral, biodisponibilidad 100%", metabolismo: "Hepático CYP3A4", excrecion: "Renal 70%", vidaMedia: "22 horas", inicioAccion: "30 min", picoAccion: "1 hora", duracionAccion: "24 horas" },
    almacenamiento: "Temperatura ambiente.", unidadId: "u08", capituloId: "c08_01"
  },
  {
    id: "metamizol", nombre: "Metamizol (Dipirona)", nombreGenerico: "Metamizol sódico",
    nombresComerciales: ["Novalcina", "Novalgina", "Lisalgil", "Dipirona"], familia: "Analgésicos no opioides",
    clasificacion: "Analgésico-antipirético-antiespasmódico (derivado pirazolónico)", mecanismoAccion: "Inhibe COX-1 y COX-2 centralmente. Activa vía óxido nítrico-GMPc y canales de potasio. Efecto antiespasmódico sobre músculo liso.",
    indicaciones: ["Dolor moderado a severo", "Fiebre refractaria a otros antipiréticos", "Cólico renal y biliar", "Dolor postoperatorio", "Dolor oncológico (coadyuvante)"],
    contraindicaciones: ["Antecedente de agranulocitosis", "Porfiria aguda intermitente", "Déficit de G6PD", "Hipersensibilidad a pirazolonas", "Primer y tercer trimestre de embarazo"],
    efectosAdversos: ["Hipotensión (IV rápida)", "Náuseas", "Reacciones alérgicas cutáneas", "⚠️ Agranulocitosis (rara pero potencialmente fatal: 1/million)", "⚠️ Shock anafiláctico (IV)", "⚠️ Orina rojiza (normal, no alarmar al paciente)"],
    interacciones: ["Metotrexato: aumenta toxicidad hematológica", "Ciclosporina: reduce niveles", "Anticoagulantes orales: potencia efecto", "Clorpromazina: hipotermia severa"],
    viaAdministracion: ["oral", "IV", "IM", "rectal"], dosis: { adulto: "Oral: 500-1000 mg cada 6-8h. IV: 1-2.5 g lento (máx 5 g/día). IM: 1-2.5 g", pediatrico: "10-15 mg/kg/dosis cada 6-8h", ajusteRenal: "Evitar en insuficiencia grave", ajusteHepatico: "Evitar en insuficiencia grave" },
    presentaciones: ["Comprimidos 500 mg", "Gotas 500 mg/mL", "Ampollas 1 g/2 mL, 2.5 g/5 mL", "Supositorios 300, 1000 mg"], embarazo: "C",
    lactancia: "Se excreta en leche. Evitar lactancia por 48h tras la dosis.", cuidadosEnfermeria: ["IV: administrar MUY lentamente (máx 1 mL/min) — riesgo de shock hipotensivo", "Paciente acostado durante administración IV", "Monitorizar PA durante y 30 min después de IV", "Educar: orina rojiza es normal, no es sangre", "Vigilar signos de agranulocitosis: fiebre, odinofagia, úlceras bucales", "Prohibido en varios países (EE.UU., UK) pero ampliamente usado en Latinoamérica y Europa"],
    farmacocinetica: { absorcion: "Oral rápida y completa", metabolismo: "Hepático: hidrólisis a 4-metilaminoantipirina (activo)", excrecion: "Renal", vidaMedia: "2-4 horas (metabolitos: 6-8h)", inicioAccion: "Oral: 30 min, IV: 5-10 min", picoAccion: "1-2h oral", duracionAccion: "4-6 horas" },
    almacenamiento: "Temperatura ambiente. Proteger de la luz.", unidadId: "u01", capituloId: "c01_01"
  },
  // ========== U10 - Hematología ==========
  {
    id: "edoxaban", nombre: "Edoxabán", nombreGenerico: "Edoxabán",
    nombresComerciales: ["Lixiana", "Savaysa"], familia: "Anticoagulantes orales directos",
    clasificacion: "Inhibidor directo del factor Xa", mecanismoAccion: "Inhibe selectiva y reversiblemente el factor Xa libre y unido al complejo protrombinasa, interrumpiendo la vía común de la coagulación.",
    indicaciones: ["Prevención de ACV en fibrilación auricular no valvular", "Tratamiento y prevención de TVP y TEP"],
    contraindicaciones: ["Sangrado activo", "Hepatopatía con coagulopatía", "Embarazo y lactancia", "ClCr >95 mL/min en FA (menor eficacia)"],
    efectosAdversos: ["Sangrado (cualquier localización)", "Anemia", "Rash", "Elevación de transaminasas", "⚠️ Hemorragia mayor (GI más frecuente que con warfarina)"],
    interacciones: ["Rifampicina: reduce eficacia", "Ciclosporina/dronedarona/ketoconazol: reducir dosis a 30 mg", "AINEs/antiplaquetarios: mayor riesgo de sangrado"],
    viaAdministracion: ["oral"], dosis: { adulto: "FA: 60 mg/día. TVP/TEP: 60 mg/día tras 5-10 días de anticoagulante parenteral. Reducir a 30 mg si: peso ≤60 kg, ClCr 15-50, o uso de inhibidores P-gp" },
    presentaciones: ["Comprimidos 15, 30, 60 mg"], embarazo: "X",
    lactancia: "Contraindicado.", cuidadosEnfermeria: ["No usar si ClCr >95 mL/min (menor eficacia demostrada)", "No requiere monitorización de INR", "Sin antídoto específico aprobado (andexanet alfa en estudio)", "Puede tomarse con o sin alimentos", "Educar sobre signos de sangrado: hematomas, sangre en orina/heces, sangrado de encías"],
    farmacocinetica: { absorcion: "Oral, biodisponibilidad 62%", metabolismo: "Mínimo (hidrólisis, CYP3A4 <4%)", excrecion: "Renal 50%, fecal 50%", vidaMedia: "10-14 horas", inicioAccion: "1-2 horas", picoAccion: "1-2 horas", duracionAccion: "24 horas" },
    almacenamiento: "Temperatura ambiente.", unidadId: "u10", capituloId: "c10_01"
  },
  {
    id: "betrixaban", nombre: "Betrixabán", nombreGenerico: "Betrixabán",
    nombresComerciales: ["Bevyxxa"], familia: "Anticoagulantes orales directos",
    clasificacion: "Inhibidor directo del factor Xa", mecanismoAccion: "Inhibidor selectivo del factor Xa con la vida media más larga de su clase, diseñado para tromboprofilaxis extendida.",
    indicaciones: ["Profilaxis de TEV en pacientes hospitalizados con movilidad reducida y factores de riesgo tromboembólico"],
    contraindicaciones: ["Sangrado activo", "Hipersensibilidad"],
    efectosAdversos: ["Sangrado", "Hipertensión", "Cefalea", "Estreñimiento", "Infección urinaria"],
    interacciones: ["Inhibidores P-gp (ketoconazol, amiodarona): reducir dosis", "Rifampicina: evitar combinación", "Anticoagulantes/antiplaquetarios: riesgo hemorrágico aditivo"],
    viaAdministracion: ["oral"], dosis: { adulto: "Dosis inicial: 160 mg día 1, luego 80 mg/día. Con inhibidores P-gp: 80 mg día 1, luego 40 mg/día", ajusteRenal: "80 mg día 1, 40 mg/día si ClCr 15-29 mL/min" },
    presentaciones: ["Cápsulas 40, 80 mg"], embarazo: "C",
    lactancia: "Se desconoce. No recomendado.", cuidadosEnfermeria: ["Administrar con alimentos", "Indicado para tromboprofilaxis hospitalaria extendida (35-42 días)", "Vida media más larga que otros anti-Xa (19-27h)", "Vigilar signos de sangrado"],
    farmacocinetica: { absorcion: "Oral, biodisponibilidad baja", metabolismo: "Hepático mínimo (hidrólisis)", excrecion: "Fecal >80%", vidaMedia: "19-27 horas", inicioAccion: "3-4 horas", duracionAccion: "24+ horas" },
    almacenamiento: "Temperatura ambiente.", unidadId: "u10", capituloId: "c10_01"
  },
  // ========== U06 - Endocrino ==========
  {
    id: "albiglutida", nombre: "Exenatida", nombreGenerico: "Exenatida",
    nombresComerciales: ["Byetta", "Bydureon"], familia: "Antidiabéticos",
    clasificacion: "Agonista del receptor GLP-1", mecanismoAccion: "Mimético de incretina que se une al receptor de GLP-1. Estimula secreción de insulina dependiente de glucosa, suprime glucagón postprandial, retrasa vaciamiento gástrico y reduce apetito.",
    indicaciones: ["Diabetes mellitus tipo 2 (combinación con metformina, sulfonilureas o insulina basal)"],
    contraindicaciones: ["Antecedente de carcinoma medular de tiroides", "Neoplasia endocrina múltiple tipo 2", "Pancreatitis", "ClCr <30 mL/min (Byetta)"],
    efectosAdversos: ["Náuseas (muy frecuente, especialmente al inicio)", "Vómitos", "Diarrea", "Hipoglucemia (con sulfonilureas)", "⚠️ Pancreatitis aguda", "Anticuerpos anti-exenatida"],
    interacciones: ["Sulfonilureas/insulina: mayor riesgo hipoglucemia", "Antibióticos orales: administrar 1h antes de exenatida", "Warfarina: monitorizar INR al inicio"],
    viaAdministracion: ["SC"], dosis: { adulto: "Byetta: 5 mcg SC 2 veces/día (antes desayuno y cena), aumentar a 10 mcg/12h tras 1 mes. Bydureon: 2 mg SC semanal" },
    presentaciones: ["Pluma precargada 5, 10 mcg (Byetta)", "Kit 2 mg semanal (Bydureon)"], embarazo: "C",
    lactancia: "Se desconoce. No recomendado.", cuidadosEnfermeria: ["Byetta: administrar 60 min antes de las comidas principales", "Bydureon: cualquier momento, mismo día cada semana", "Las náuseas mejoran tras 2-4 semanas", "Educar técnica de inyección SC", "Monitorizar glucemia y HbA1c"],
    farmacocinetica: { absorcion: "SC", metabolismo: "Degradación proteolítica renal", excrecion: "Renal (filtración glomerular y proteólisis)", vidaMedia: "Byetta: 2.4h. Bydureon: liberación prolongada", inicioAccion: "Byetta: 30 min. Bydureon: semanas", duracionAccion: "Byetta: 8-10h. Bydureon: 7 días" },
    almacenamiento: "Refrigerar 2-8°C antes de abrir. En uso: Byetta TA 30 días, Bydureon TA 4 semanas.", unidadId: "u06", capituloId: "c06_01"
  },
  // ========== U02 - Cardiovascular extras ==========
  {
    id: "doxazosina", nombre: "Doxazosina", nombreGenerico: "Doxazosina mesilato",
    nombresComerciales: ["Cardura", "Carduran", "Doxazosina Gador"], familia: "Antihipertensivos",
    clasificacion: "Bloqueante alfa-1 adrenérgico selectivo", mecanismoAccion: "Bloquea selectivamente receptores alfa-1 adrenérgicos en músculo liso vascular y prostático, produciendo vasodilatación y relajación del cuello vesical.",
    indicaciones: ["Hipertensión arterial (terapia combinada)", "Hiperplasia prostática benigna (HPB)"],
    contraindicaciones: ["Hipersensibilidad", "Hipotensión", "Antecedente de hipotensión ortostática", "Insuficiencia hepática grave"],
    efectosAdversos: ["Hipotensión ortostática (especialmente primera dosis)", "Mareo", "Cefalea", "Fatiga", "Edema", "⚠️ Síndrome de iris fláccido intraoperatorio (informar al oftalmólogo antes de cirugía de catarata)"],
    interacciones: ["Otros antihipertensivos: hipotensión aditiva", "Inhibidores PDE5 (sildenafilo): hipotensión severa", "AINEs: reducen efecto antihipertensivo"],
    viaAdministracion: ["oral"], dosis: { adulto: "HTA: inicio 1 mg/día, titular hasta 16 mg/día. HPB: inicio 1 mg/día, titular hasta 8 mg/día", ajusteHepatico: "Precaución, metabolismo hepático" },
    presentaciones: ["Comprimidos 1, 2, 4 mg", "Comprimidos LP 4, 8 mg"], embarazo: "C",
    lactancia: "Se excreta en leche. Precaución.", cuidadosEnfermeria: ["Primera dosis al acostarse (riesgo de hipotensión ortostática)", "Titular lentamente cada 1-2 semanas", "Educar: levantarse lentamente de la cama", "Informar al oftalmólogo antes de cirugía ocular", "Monitorizar PA en posición supina y de pie"],
    farmacocinetica: { absorcion: "Oral, biodisponibilidad 65%", metabolismo: "Hepático extenso (CYP3A4)", excrecion: "Fecal 63%, renal 9%", vidaMedia: "22 horas", inicioAccion: "1-2 horas", picoAccion: "2-3 horas", duracionAccion: "24 horas" },
    almacenamiento: "Temperatura ambiente.", unidadId: "u02", capituloId: "c02_01"
  },
  {
    id: "espironolactona_ic2", nombre: "Eplerenona", nombreGenerico: "Eplerenona",
    nombresComerciales: ["Inspra", "Eplerenona Gador"], familia: "Diuréticos",
    clasificacion: "Antagonista selectivo del receptor de mineralocorticoides", mecanismoAccion: "Bloquea selectivamente el receptor de aldosterona sin afinidad significativa por receptores androgénicos o progesterona (a diferencia de espironolactona).",
    indicaciones: ["Insuficiencia cardíaca post-IAM con disfunción ventricular", "Insuficiencia cardíaca con FE reducida (NYHA II-IV)", "Hipertensión arterial"],
    contraindicaciones: ["Potasio sérico >5.0 mEq/L", "ClCr <30 mL/min", "Uso con inhibidores potentes de CYP3A4 (ketoconazol, itraconazol)", "Insuficiencia hepática grave"],
    efectosAdversos: ["Hiperpotasemia", "Mareo", "Diarrea", "Hipotensión", "Elevación de creatinina"],
    interacciones: ["IECA/ARA-II: hiperpotasemia (monitorizar estrechamente)", "Ketoconazol/itraconazol: contraindicados (duplican niveles)", "AINEs: riesgo de hiperpotasemia e IRA", "Suplementos de potasio: evitar"],
    viaAdministracion: ["oral"], dosis: { adulto: "IC post-IAM: 25 mg/día, aumentar a 50 mg/día a las 4 sem. HTA: 50 mg/día", ajusteRenal: "Contraindicado si ClCr <30 mL/min" },
    presentaciones: ["Comprimidos 25, 50 mg"], embarazo: "B",
    lactancia: "Se desconoce. Precaución.", cuidadosEnfermeria: ["Monitorizar potasio sérico a las 48h, 1 semana, 1 mes y luego periódicamente", "Ventaja sobre espironolactona: no ginecomastia ni alteraciones menstruales", "Suspender si K+ >5.5 mEq/L", "Puede tomarse con o sin alimentos", "Evaluar función renal antes y durante tratamiento"],
    farmacocinetica: { absorcion: "Oral, biodisponibilidad 69%", metabolismo: "Hepático CYP3A4", excrecion: "Renal 67%, fecal 32%", vidaMedia: "4-6 horas", inicioAccion: "2 horas", duracionAccion: "24 horas" },
    almacenamiento: "Temperatura ambiente.", unidadId: "u02", capituloId: "c02_04"
  },
  // ========== U03 - Más antiinfecciosos ==========
  {
    id: "aztreonam", nombre: "Aztreonam", nombreGenerico: "Aztreonam",
    nombresComerciales: ["Azactam", "Cayston"], familia: "Monobactámicos",
    clasificacion: "Antibiótico betalactámico monobactámico", mecanismoAccion: "Se une selectivamente a PBP3 de bacterias gram-negativas aerobias. No tiene actividad contra gram-positivos ni anaerobios. Resistente a la mayoría de betalactamasas.",
    indicaciones: ["Infecciones graves por gram-negativos aerobios", "Alternativa en alérgicos a penicilina (sin reacción cruzada significativa)", "Infecciones en fibrosis quística (inhalado)"],
    contraindicaciones: ["Hipersensibilidad a aztreonam"],
    efectosAdversos: ["Diarrea", "Náuseas", "Rash", "Flebitis", "Elevación de transaminasas"],
    interacciones: ["No interacciones significativas", "Seguro en alérgicos a penicilinas/cefalosporinas (estructura diferente)"],
    viaAdministracion: ["IV", "IM", "inhalatoria"], dosis: { adulto: "1-2 g cada 6-8h IV/IM. Infecciones graves: 2 g cada 6h. Inhalado (FQ): 75 mg 3 veces/día", pediatrico: "30 mg/kg cada 6-8h. Máx: 120 mg/kg/día", ajusteRenal: "Reducir 50% si ClCr <10 mL/min" },
    presentaciones: ["Viales 500 mg, 1 g, 2 g", "Solución para nebulización 75 mg"], embarazo: "B",
    lactancia: "Excreción mínima. Compatible.", cuidadosEnfermeria: ["SOLO activo contra gram-negativos aerobios (no cubrir gram+ ni anaerobios)", "Seguro en alérgicos a penicilinas: NO hay reacción cruzada", "IV: diluir y pasar en 20-60 min", "Solución inhalada: usar nebulizador Altera específico", "Monitorizar función renal en tratamientos prolongados"],
    farmacocinetica: { distribucion: "Amplia, penetra LCR con meninges inflamadas", metabolismo: "Mínimo", excrecion: "Renal 60-70% sin cambios", vidaMedia: "1.7 horas", inicioAccion: "IV inmediato, IM 30-60 min", duracionAccion: "6-8 horas" },
    almacenamiento: "Viales: temperatura ambiente. Reconstituido: usar en 48h refrigerado.", unidadId: "u03", capituloId: "c03_03"
  },
  {
    id: "tedizolid", nombre: "Tedizolid", nombreGenerico: "Tedizolid fosfato",
    nombresComerciales: ["Sivextro"], familia: "Oxazolidinonas",
    clasificacion: "Antibiótico oxazolidinona de nueva generación", mecanismoAccion: "Inhibe la síntesis proteica bacteriana al unirse a la subunidad 23S del ribosoma 50S. Más potente que linezolid con mejor perfil de seguridad.",
    indicaciones: ["Infecciones agudas de piel y tejidos blandos por gram-positivos (incluyendo MRSA)"],
    contraindicaciones: ["Hipersensibilidad a oxazolidinonas"],
    efectosAdversos: ["Náuseas", "Cefalea", "Diarrea", "Vómitos", "Menor riesgo de trombocitopenia y neuropatía que linezolid"],
    interacciones: ["IMAO: precaución (inhibición MAO débil, menor que linezolid)", "Serotonínérgicos: menor riesgo de síndrome serotoninérgico que linezolid"],
    viaAdministracion: ["oral", "IV"], dosis: { adulto: "200 mg/día por 6 días (oral o IV)" },
    presentaciones: ["Comprimidos 200 mg", "Viales 200 mg"], embarazo: "C",
    lactancia: "Se desconoce. Precaución.", cuidadosEnfermeria: ["Tratamiento corto: solo 6 días", "IV: infusión en 1 hora", "Menor toxicidad hematológica que linezolid", "No requiere monitorización de hemograma rutinaria (a diferencia de linezolid)", "Puede tomarse con o sin alimentos"],
    farmacocinetica: { absorcion: "Oral ~91%", metabolismo: "Fosfatasa convierte prodroga a forma activa", excrecion: "Fecal 82%, renal 18%", vidaMedia: "12 horas", inicioAccion: "2-3 horas", duracionAccion: "24 horas" },
    almacenamiento: "Temperatura ambiente.", unidadId: "u03", capituloId: "c03_03"
  },
  // ========== U09 - Dermatología ==========
  {
    id: "dapsona_topica", nombre: "Dapsona tópica", nombreGenerico: "Dapsona",
    nombresComerciales: ["Aczone"], familia: "Antiacneicos tópicos",
    clasificacion: "Antibacteriano y antiinflamatorio tópico", mecanismoAccion: "Inhibe la síntesis de folato bacteriano (como sulfonamida). Efecto antiinflamatorio al inhibir la mieloperoxidasa de neutrófilos y la quimiotaxis.",
    indicaciones: ["Acné vulgar (leve a moderado)", "Dermatitis herpetiforme (sistémico)"],
    contraindicaciones: ["Hipersensibilidad a dapsona o sulfonamidas", "Déficit severo de G6PD"],
    efectosAdversos: ["Sequedad cutánea", "Eritema local", "Prurito", "Descamación"],
    interacciones: ["Peróxido de benzoilo: puede colorear la piel temporalmente (amarillo/anaranjado)", "Trimetoprima: aumenta niveles de dapsona sistémica"],
    viaAdministracion: ["topica"], dosis: { adulto: "Gel 5-7.5%: aplicar capa fina en área afectada 1-2 veces/día" },
    presentaciones: ["Gel 5%, 7.5%"], embarazo: "C",
    lactancia: "Absorción sistémica mínima. Probablemente seguro.", cuidadosEnfermeria: ["Aplicar sobre piel limpia y seca", "Esperar que seque antes de aplicar otros productos", "Si se usa con peróxido de benzoilo, aplicar en horarios diferentes", "Puede usarse junto con retinoides tópicos", "Resultados visibles en 4-12 semanas"],
    almacenamiento: "Temperatura ambiente.", unidadId: "u09", capituloId: "c09_07"
  },
  {
    id: "minoxidil_topico", nombre: "Minoxidil tópico", nombreGenerico: "Minoxidil",
    nombresComerciales: ["Rogaine", "Regaine", "Kirkland Minoxidil"], familia: "Estimulantes capilares",
    clasificacion: "Vasodilatador tópico (promotor de crecimiento capilar)", mecanismoAccion: "Abre canales de potasio ATP-dependientes en músculo liso vascular. Tópicamente aumenta el flujo sanguíneo al folículo piloso y prolonga la fase anágena del ciclo capilar.",
    indicaciones: ["Alopecia androgénica masculina y femenina", "Alopecia areata (off-label)"],
    contraindicaciones: ["Hipersensibilidad", "Dermatitis del cuero cabelludo", "Feocromocitoma"],
    efectosAdversos: ["Hipertricosis en zonas no deseadas", "Irritación local", "Dermatitis de contacto", "Cefalea", "⚠️ Taquicardia/hipotensión (si absorción sistémica excesiva)"],
    interacciones: ["Guanetidina: puede potenciar hipotensión ortostática", "Retinoides tópicos: aumentan absorción de minoxidil"],
    viaAdministracion: ["topica"], dosis: { adulto: "Solución/espuma 5% (hombres): 1 mL 2 veces/día en cuero cabelludo. Solución 2% (mujeres): 1 mL 2 veces/día" },
    presentaciones: ["Solución 2%, 5%", "Espuma 5%"], embarazo: "C",
    lactancia: "Se excreta en leche. Contraindicado.", cuidadosEnfermeria: ["Aplicar en cuero cabelludo SECO", "Lavar manos tras aplicación", "Resultados visibles en 4-6 meses. Caída inicial es normal (recambio)", "Suspender si aparecen síntomas cardiovasculares", "Tratamiento de por vida: al suspender, el pelo ganado se pierde en 3-6 meses"],
    farmacocinetica: { absorcion: "Tópica: 1-2% absorción sistémica", metabolismo: "Hepático (glucuronidación)", excrecion: "Renal 97%", vidaMedia: "4.2 horas (tópico)", inicioAccion: "4-6 meses para resultados visibles", duracionAccion: "Mientras se use" },
    almacenamiento: "Temperatura ambiente. Inflamable: alejar de fuentes de calor.", unidadId: "u09", capituloId: "c09_07"
  },
  // ========== U05 - Digestivo ==========
  {
    id: "linaclotida", nombre: "Linaclotida", nombreGenerico: "Linaclotida",
    nombresComerciales: ["Linzess", "Constella"], familia: "Secretagogos intestinales",
    clasificacion: "Agonista del receptor de guanilato ciclasa-C", mecanismoAccion: "Activa receptores GC-C en el epitelio intestinal, aumentando GMPc intracelular y extracelular. Esto estimula secreción de cloruro y bicarbonato, aumenta fluido intestinal y acelera tránsito. El GMPc extracelular reduce dolor visceral.",
    indicaciones: ["Síndrome de intestino irritable con estreñimiento (SII-E)", "Estreñimiento crónico idiopático"],
    contraindicaciones: ["Obstrucción intestinal mecánica", "Menores de 6 años (contraindicado)", "6-17 años (evitar)"],
    efectosAdversos: ["Diarrea (frecuente, puede ser severa)", "Dolor abdominal", "Flatulencia", "Distensión abdominal"],
    interacciones: ["No interacciones sistémicas significativas (acción local)"],
    viaAdministracion: ["oral"], dosis: { adulto: "SII-E: 290 mcg/día. Estreñimiento crónico: 145 mcg/día" },
    presentaciones: ["Cápsulas 72, 145, 290 mcg"], embarazo: "C",
    lactancia: "No se absorbe sistémicamente. Probablemente compatible.", cuidadosEnfermeria: ["Administrar en ayunas, 30 min antes del desayuno", "No abrir ni triturar cápsulas", "Si diarrea severa: suspender temporalmente", "Acción local intestinal: mínima absorción sistémica", "Evaluar respuesta en 4 semanas"],
    farmacocinetica: { absorcion: "No se absorbe sistémicamente (acción local)", metabolismo: "Degradación en luz intestinal", excrecion: "Fecal (como metabolitos)", vidaMedia: "No aplica (local)", inicioAccion: "Horas a días", duracionAccion: "24 horas" },
    almacenamiento: "Temperatura ambiente. Mantener en blíster original hasta uso.", unidadId: "u05", capituloId: "c05_05"
  },
  // ========== U11 - Emergencias ==========
  {
    id: "idarucizumab", nombre: "Idarucizumab", nombreGenerico: "Idarucizumab",
    nombresComerciales: ["Praxbind"], familia: "Antídotos específicos",
    clasificacion: "Fragmento de anticuerpo monoclonal humanizado anti-dabigatrán", mecanismoAccion: "Fragmento Fab de anticuerpo que se une al dabigatrán libre y unido a trombina con afinidad 350 veces mayor que la trombina, neutralizando completamente su efecto anticoagulante en minutos.",
    indicaciones: ["Reversión urgente del efecto de dabigatrán en cirugía de emergencia", "Sangrado mayor no controlado en pacientes con dabigatrán"],
    contraindicaciones: ["Hipersensibilidad a idarucizumab"],
    efectosAdversos: ["Cefalea", "Hipopotasemia", "Delirium", "Constipación", "Eventos trombóticos (al revertir anticoagulación)"],
    interacciones: ["Específico para dabigatrán. No revierte otros anticoagulantes"],
    viaAdministracion: ["IV"], dosis: { adulto: "5 g IV (2 viales de 2.5 g) en infusión consecutiva de 5-10 min cada uno, o bolo" },
    presentaciones: ["Viales 2.5 g/50 mL (2 viales = dosis completa)"], embarazo: "C",
    lactancia: "Se desconoce. Uso de emergencia justifica riesgo.", cuidadosEnfermeria: ["Administrar los 2 viales consecutivamente (dosis completa: 5 g)", "Efecto en minutos: medir TT o dTT antes y después", "No diluir: administrar directo", "Puede readministrarse si reaparece sangrado", "Reiniciar dabigatrán 24h después si indicación persiste", "SOLO revierte dabigatrán, no otros ACODs"],
    farmacocinetica: { distribucion: "Intravascular", metabolismo: "Proteólisis", excrecion: "Renal", vidaMedia: "47 minutos (inicial)", inicioAccion: "Minutos", duracionAccion: "24 horas" },
    almacenamiento: "Refrigerar 2-8°C. No congelar. A TA: usar en 6 horas.", unidadId: "u11", capituloId: "c11_01"
  },
  {
    id: "andexanet_alfa", nombre: "Andexanet alfa", nombreGenerico: "Andexanet alfa",
    nombresComerciales: ["Andexxa", "Ondexxya"], familia: "Antídotos específicos",
    clasificacion: "Factor Xa recombinante modificado (inactivo, señuelo)", mecanismoAccion: "Factor Xa humano recombinante modificado que actúa como señuelo: se une a los inhibidores del factor Xa (rivaroxabán, apixabán) y a HBPM-antitrombina, secuestrándolos y restaurando la actividad del factor Xa endógeno.",
    indicaciones: ["Reversión urgente de rivaroxabán o apixabán en sangrado mayor no controlado"],
    contraindicaciones: ["Hipersensibilidad"],
    efectosAdversos: ["Eventos tromboembólicos (al revertir anticoagulación)", "Infusión: reacciones infusionales", "⚠️ Riesgo trombótico significativo: TVP, TEP, IAM, ACV"],
    interacciones: ["Específico para anti-Xa: rivaroxabán, apixabán (y parcialmente edoxabán, enoxaparina)"],
    viaAdministracion: ["IV"], dosis: { adulto: "Dosis baja (rivaroxabán >7h o apixabán): bolo 400 mg en 15 min + infusión 480 mg en 2h. Dosis alta (rivaroxabán <7h): bolo 800 mg en 30 min + infusión 960 mg en 2h" },
    presentaciones: ["Viales 200 mg polvo para reconstituir"], embarazo: "C",
    lactancia: "Uso de emergencia.", cuidadosEnfermeria: ["Reconstituir cada vial con 20 mL de agua estéril", "Dosis depende de cuál anti-Xa y hace cuánto se tomó la última dosis", "Monitorizar actividad anti-Xa antes y después", "Vigilar signos de trombosis post-reversión", "Evaluar necesidad de reiniciar anticoagulación tan pronto como sea seguro"],
    farmacocinetica: { distribucion: "Intravascular", metabolismo: "No aplica", vidaMedia: "5-7 horas", inicioAccion: "2-5 minutos", duracionAccion: "1-2 horas (puede requerir infusión continua)" },
    almacenamiento: "Refrigerar 2-8°C.", unidadId: "u11", capituloId: "c11_01"
  },
  // ========== U07 - Reproductor ==========
  {
    id: "letrozol", nombre: "Letrozol", nombreGenerico: "Letrozol",
    nombresComerciales: ["Femara", "Letrozol Gador"], familia: "Hormonas y Anticonceptivos",
    clasificacion: "Inhibidor de aromatasa no esteroideo", mecanismoAccion: "Inhibe competitivamente la aromatasa (CYP19), enzima que convierte andrógenos en estrógenos, reduciendo los niveles de estrógeno circulante en >95%.",
    indicaciones: ["Cáncer de mama hormonodependiente en postmenopáusicas", "Inducción de ovulación en SOP (off-label, alternativa a clomifeno)", "Terapia adyuvante extendida tras tamoxifeno"],
    contraindicaciones: ["Premenopáusicas (salvo uso off-label controlado)", "Embarazo", "Hipersensibilidad"],
    efectosAdversos: ["Sofocos", "Artralgias y mialgias (frecuentes)", "Osteoporosis acelerada", "Cefalea", "Fatiga", "⚠️ Mayor riesgo de fracturas óseas"],
    interacciones: ["Tamoxifeno: no usar simultáneamente", "Estrógenos: antagonismo (contraindicado)"],
    viaAdministracion: ["oral"], dosis: { adulto: "Cáncer de mama: 2.5 mg/día (5-10 años). Inducción ovulación: 2.5-7.5 mg/día x 5 días (día 3-7 del ciclo)" },
    presentaciones: ["Comprimidos 2.5 mg"], embarazo: "X",
    lactancia: "Contraindicado.", cuidadosEnfermeria: ["Monitorizar densidad ósea (DEXA) anualmente", "Suplementar calcio y vitamina D", "Evaluar artralgias: frecuente causa de abandono", "En inducción de ovulación: ecografía folicular de control", "Puede tomarse a cualquier hora, con o sin alimentos"],
    farmacocinetica: { absorcion: "Oral rápida y completa", metabolismo: "Hepático CYP3A4, CYP2A6", excrecion: "Renal 90%", vidaMedia: "48 horas", inicioAccion: "Días", duracionAccion: "48+ horas" },
    almacenamiento: "Temperatura ambiente.", unidadId: "u07", capituloId: "c07_05"
  },
  {
    id: "noretisterona", nombre: "Noretisterona", nombreGenerico: "Noretisterona (Noretindrona)",
    nombresComerciales: ["Primolut Nor", "Aygestin", "Noretisterona Gador"], familia: "Hormonas y Anticonceptivos",
    clasificacion: "Progestágeno sintético (derivado de 19-nortestosterona)", mecanismoAccion: "Progestágeno con actividad sobre el endometrio. Transforma endometrio proliferativo en secretor, suprime el eje hipotálamo-hipófisis-ovario y modifica moco cervical.",
    indicaciones: ["Sangrado uterino anormal", "Endometriosis", "Síndrome premenstrual", "Retraso de menstruación", "Anticoncepción (minipíldora)"],
    contraindicaciones: ["Embarazo", "Tromboembolismo activo", "Cáncer de mama hormonodependiente", "Sangrado vaginal no diagnosticado", "Insuficiencia hepática grave"],
    efectosAdversos: ["Cefalea", "Náuseas", "Sangrado intermenstrual", "Sensibilidad mamaria", "Cambios de humor", "Acné"],
    interacciones: ["Rifampicina/carbamazepina: reducen eficacia", "Ciclosporina: aumenta niveles de ciclosporina", "Anticoagulantes: puede alterar efecto"],
    viaAdministracion: ["oral", "IM"], dosis: { adulto: "Sangrado uterino: 5 mg/8h por 10 días. Endometriosis: 5 mg/12h por 4-6 meses. Anticoncepción: 0.35 mg/día continuo. Retraso menstrual: 5 mg/8h desde 3 días antes" },
    presentaciones: ["Comprimidos 5 mg", "Comprimidos 0.35 mg (minipíldora)"], embarazo: "X",
    lactancia: "Compatible en dosis anticonceptivas (0.35 mg). Precaución en dosis altas.", cuidadosEnfermeria: ["Anticoncepción: tomar a la misma hora cada día (margen de 3h)", "Para retrasar menstruación: iniciar 3 días antes de fecha esperada", "Sangrado irregular es esperado al inicio del tratamiento", "No confundir dosis de anticoncepción (0.35 mg) con dosis terapéutica (5 mg)"],
    farmacocinetica: { absorcion: "Oral rápida, biodisponibilidad 64%", metabolismo: "Hepático (reducción, conjugación)", excrecion: "Renal 50%, fecal 40%", vidaMedia: "8 horas", inicioAccion: "Horas", duracionAccion: "24 horas" },
    almacenamiento: "Temperatura ambiente. Proteger de la luz.", unidadId: "u07", capituloId: "c07_05"
  },
  // ========== U12 - Hospitalarios ==========
  {
    id: "clevidipino", nombre: "Clevidipino", nombreGenerico: "Clevidipino butirato",
    nombresComerciales: ["Cleviprex"], familia: "Antihipertensivos IV",
    clasificacion: "Bloqueante de canales de calcio dihidropiridínico IV de acción ultracorta", mecanismoAccion: "Bloquea selectivamente canales de calcio tipo L en músculo liso arteriolar, produciendo vasodilatación arterial sin venodilatación. Metabolismo por esterasas plasmáticas permite titulación precisa.",
    indicaciones: ["Crisis hipertensiva", "Hipertensión perioperatoria", "Control de PA en UCI cuando se requiere titulación precisa"],
    contraindicaciones: ["Alergia a soja, huevo o productos derivados (emulsión lipídica)", "Estenosis aórtica severa", "Pancreatitis aguda por hipertrigliceridemia", "Defectos del metabolismo lipídico"],
    efectosAdversos: ["Taquicardia refleja", "Cefalea", "Náuseas", "Hipotensión", "⚠️ Hipertrigliceridemia con infusiones prolongadas (>72h)"],
    interacciones: ["Otros antihipertensivos: efecto aditivo", "Betabloqueantes: pueden atenuar taquicardia refleja (combinación útil)"],
    viaAdministracion: ["IV"], dosis: { adulto: "Inicio: 1-2 mg/h. Titular duplicando cada 90 seg. Mantenimiento: 4-6 mg/h. Máx: 32 mg/h (no más de 1000 mL/24h)" },
    presentaciones: ["Emulsión IV 0.5 mg/mL (50, 100 mL)"], embarazo: "C",
    lactancia: "Se desconoce. Uso hospitalario.", cuidadosEnfermeria: ["NO diluir: usar directo de la emulsión", "Invertir vial suavemente antes de usar", "Cambiar línea de infusión cada 12h", "Monitorización continua de PA (línea arterial ideal)", "No usar por más de 72h (riesgo hipertrigliceridemia)", "Contar lípidos de la emulsión en el aporte calórico total"],
    farmacocinetica: { metabolismo: "Esterasas plasmáticas y tisulares (no hepático)", excrecion: "Renal 63-74%, fecal 7-22%", vidaMedia: "1 minuto (inicial)", inicioAccion: "2-4 minutos", duracionAccion: "5-15 minutos tras suspender" },
    almacenamiento: "Refrigerar 2-8°C. No congelar. Una vez abierto: usar en 12h.", unidadId: "u12", capituloId: "c12_02"
  },
  {
    id: "dexmedetomidina_nasal", nombre: "Angiotensina II", nombreGenerico: "Angiotensina II sintética",
    nombresComerciales: ["Giapreza"], familia: "Vasopresores",
    clasificacion: "Vasopresor endógeno sintético (agonista del receptor AT1)", mecanismoAccion: "Péptido vasoactivo endógeno sintético. Activa directamente receptores AT1 en músculo liso vascular produciendo vasoconstricción potente. Estimula liberación de aldosterona y vasopresina.",
    indicaciones: ["Shock vasodilatador refractario a catecolaminas y vasopresina"],
    contraindicaciones: ["Hipersensibilidad"],
    efectosAdversos: ["Trombosis (arterial y venosa)", "Taquicardia", "Acidosis", "Hiperglucemia", "⚠️ Tromboembolismo: profilaxis obligatoria"],
    interacciones: ["IECA/ARA-II: pueden reducir respuesta", "Otros vasopresores: efecto aditivo"],
    viaAdministracion: ["IV"], dosis: { adulto: "Inicio: 20 ng/kg/min. Titular cada 5 min hasta 80 ng/kg/min según PAM objetivo. Rango: 1.25-80 ng/kg/min" },
    presentaciones: ["Viales 2.5 mg/mL (1 mL, 2 mL)"], embarazo: "C",
    lactancia: "Uso de UCI.", cuidadosEnfermeria: ["Diluir en SF o dextrosa 5% antes de infusión", "SIEMPRE con profilaxis antitrombótica", "Monitorización hemodinámica continua (PAM, PVC)", "Usar por vía central preferentemente", "Titular según PAM objetivo (usualmente ≥65 mmHg)", "Reservado para shock refractario a primera línea"],
    farmacocinetica: { metabolismo: "Aminopeptidasas plasmáticas", vidaMedia: "<1 minuto", inicioAccion: "Minutos", duracionAccion: "Minutos tras suspender" },
    almacenamiento: "Refrigerar 2-8°C.", unidadId: "u12", capituloId: "c12_02"
  },
  // ========== U08 - Musculoesquelético ==========
  {
    id: "metotrexato_ar", nombre: "Leflunomida", nombreGenerico: "Leflunomida",
    nombresComerciales: ["Arava", "Leflunomida Gador"], familia: "Inmunosupresores",
    clasificacion: "FAME (Fármaco modificador de enfermedad) - inhibidor de dihidroorotato deshidrogenasa", mecanismoAccion: "Inhibe la enzima dihidroorotato deshidrogenasa (DHODH), bloqueando la síntesis de novo de pirimidinas en linfocitos T activados. Reduce la proliferación linfocitaria y la respuesta autoinmune.",
    indicaciones: ["Artritis reumatoide (FAME)", "Artritis psoriásica"],
    contraindicaciones: ["Embarazo (teratógeno severo)", "Mujeres en edad fértil sin anticoncepción fiable", "Insuficiencia hepática", "Inmunodeficiencia severa", "Infecciones graves activas"],
    efectosAdversos: ["Diarrea", "Náuseas", "Alopecia", "Elevación de transaminasas", "HTA", "⚠️ Hepatotoxicidad", "⚠️ Teratogenicidad severa (washout con colestiramina necesario)"],
    interacciones: ["Metotrexato: hepatotoxicidad aditiva (monitorizar)", "Warfarina: aumenta INR", "Rifampicina: aumenta metabolito activo", "Vacunas vivas: contraindicadas"],
    viaAdministracion: ["oral"], dosis: { adulto: "Carga: 100 mg/día x 3 días. Mantenimiento: 20 mg/día (reducir a 10 mg si intolerancia)" },
    presentaciones: ["Comprimidos 10, 20, 100 mg"], embarazo: "X",
    lactancia: "Contraindicado.", cuidadosEnfermeria: ["Hemograma y transaminasas basales y mensuales los primeros 6 meses", "Test de embarazo antes de iniciar. Anticoncepción OBLIGATORIA", "Si desea embarazo: washout con colestiramina 8 g/8h x 11 días + verificar niveles <0.02 mg/L", "Vida media del metabolito activo: 2 semanas (sin washout: hasta 2 años en el cuerpo)", "Vacunas vivas contraindicadas durante tratamiento"],
    farmacocinetica: { absorcion: "Oral, biodisponibilidad 80%", metabolismo: "Hepático y pared intestinal a teriflunomida (metabolito activo)", excrecion: "Renal 43%, fecal 48%", vidaMedia: "Teriflunomida: 14-18 días", inicioAccion: "4-6 semanas", duracionAccion: "Semanas (vida media larga)" },
    almacenamiento: "Temperatura ambiente. Proteger de la luz.", unidadId: "u08", capituloId: "c08_04"
  },
  // More drugs for various categories
  {
    id: "tofacitinib", nombre: "Tofacitinib", nombreGenerico: "Tofacitinib citrato",
    nombresComerciales: ["Xeljanz"], familia: "Inmunosupresores",
    clasificacion: "Inhibidor de JAK (Janus quinasa) 1 y 3", mecanismoAccion: "Inhibe selectivamente JAK1 y JAK3, bloqueando la señalización de múltiples citocinas (IL-2, IL-4, IL-6, IL-7, IL-15, IL-21, IFN-γ). Reduce activación y proliferación de linfocitos T y B.",
    indicaciones: ["Artritis reumatoide moderada a severa (tras fallo de metotrexato)", "Artritis psoriásica", "Colitis ulcerosa moderada a severa"],
    contraindicaciones: ["Infección activa grave", "Tuberculosis activa", "Linfopenia <500/mm³", "Neutropenia <1000/mm³", "Hemoglobina <9 g/dL"],
    efectosAdversos: ["Infecciones del tracto respiratorio superior", "Cefalea", "Diarrea", "Elevación de colesterol", "⚠️ Mayor riesgo de infecciones oportunistas (herpes zóster)", "⚠️ Eventos cardiovasculares y neoplasias (FDA box warning en >65 años)"],
    interacciones: ["Ketoconazol/fluconazol: reducir dosis a 5 mg/día", "Rifampicina: reduce eficacia", "Vacunas vivas: contraindicadas", "Inmunosupresores biológicos: no combinar"],
    viaAdministracion: ["oral"], dosis: { adulto: "AR/APs: 5 mg/12h. CU: inducción 10 mg/12h x 8 sem, luego 5-10 mg/12h", ajusteRenal: "5 mg/12h si ClCr <30 mL/min", ajusteHepatico: "5 mg/12h en insuficiencia moderada. Evitar en grave" },
    presentaciones: ["Comprimidos 5, 10 mg", "Comprimidos LP 11 mg"], embarazo: "C",
    lactancia: "Contraindicado.", cuidadosEnfermeria: ["Screening de TB y hepatitis B/C antes de iniciar", "Hemograma basal y a las 4-8 semanas", "Perfil lipídico a las 4-8 semanas", "Vacuna contra herpes zóster antes de iniciar si es posible", "No combinar con biológicos (adalimumab, tocilizumab, etc.)", "FDA advierte mayor riesgo CV y cáncer en >65 años con factores de riesgo"],
    farmacocinetica: { absorcion: "Oral, biodisponibilidad 74%", metabolismo: "Hepático CYP3A4 (70%), CYP2C19 (30%)", excrecion: "Renal 30% sin cambios", vidaMedia: "3 horas", inicioAccion: "Semanas", picoAccion: "0.5-1 hora", duracionAccion: "12 horas" },
    almacenamiento: "Temperatura ambiente.", unidadId: "u08", capituloId: "c08_04"
  },
  // ========== U04 - Respiratorio ==========
  {
    id: "acetilcisteina_inhalada", nombre: "N-Acetilcisteína inhalada", nombreGenerico: "N-Acetilcisteína",
    nombresComerciales: ["Mucomyst", "Fluimucil inhalatorio"], familia: "Mucolíticos",
    clasificacion: "Mucolítico (ruptura de puentes disulfuro)", mecanismoAccion: "Rompe los puentes disulfuro de las mucoproteínas del esputo, reduciendo su viscosidad. Por vía inhalada, actúa directamente sobre las secreciones bronquiales.",
    indicaciones: ["Fibrosis quística (adyuvante)", "Bronquiectasias con esputo espeso", "Atelectasia por tapón mucoso", "Preparación para broncoscopía"],
    contraindicaciones: ["Asma activa (puede provocar broncoespasmo)", "Hipersensibilidad"],
    efectosAdversos: ["Broncoespasmo (premedicar con broncodilatador)", "Náuseas", "Rinorrea", "Olor desagradable (azufre)", "Estomatitis"],
    interacciones: ["Antibióticos inhalados: administrar por separado (inactiva aminoglucósidos)", "Carbón activado: reduce eficacia oral"],
    viaAdministracion: ["inhalatoria", "oral", "IV"], dosis: { adulto: "Inhalada: 3-5 mL de solución 20% cada 6-8h por nebulización. Instilación directa: 1-2 mL de solución 20%", pediatrico: "Similar a adulto ajustando volumen" },
    presentaciones: ["Solución para nebulización 10%, 20% (4, 10, 30 mL)"], embarazo: "B",
    lactancia: "Probablemente compatible.", cuidadosEnfermeria: ["SIEMPRE premedicar con broncodilatador (salbutamol) 15 min antes", "Olor a huevo podrido: advertir al paciente", "No mezclar con antibióticos en el nebulizador", "Aspirar secreciones si el paciente no puede expectorar", "Monitorizar saturación durante nebulización"],
    farmacocinetica: { absorcion: "Inhalada: acción local directa", metabolismo: "Desacetilación a cisteína", excrecion: "Renal", vidaMedia: "5.6 horas (sistémica)", inicioAccion: "1 minuto (inhalada)", duracionAccion: "2-4 horas" },
    almacenamiento: "Refrigerar una vez abierto. Usar dentro de 96h. Solución abierta puede tornarse púrpura (no afecta eficacia).", unidadId: "u04", capituloId: "c04_03"
  },
  // ========== U06 - Endocrino ==========
  {
    id: "carbimazol", nombre: "Carbimazol", nombreGenerico: "Carbimazol",
    nombresComerciales: ["Neo-Mercazole", "Carbimazol"], familia: "Antitiroideos",
    clasificacion: "Profármaco de metimazol (tionamida)", mecanismoAccion: "Profármaco convertido a metimazol in vivo. Inhibe la enzima tiroperoxidasa (TPO), bloqueando la organificación del yodo y el acoplamiento de yodotironinas, reduciendo la síntesis de T3 y T4.",
    indicaciones: ["Hipertiroidismo (enfermedad de Graves)", "Preparación preoperatoria para tiroidectomía", "Crisis tirotóxica (adyuvante)"],
    contraindicaciones: ["Hipersensibilidad a tionamidas", "Agranulocitosis previa por tionamidas"],
    efectosAdversos: ["Rash cutáneo", "Artralgias", "Molestias GI", "⚠️ Agranulocitosis (0.1-0.5%, potencialmente fatal)", "⚠️ Hepatotoxicidad (ictericia colestásica)"],
    interacciones: ["Warfarina: el hipertiroidismo aumenta metabolismo de warfarina; al corregirlo, ajustar dosis", "Betabloqueantes: ajustar dosis al normalizar tiroides"],
    viaAdministracion: ["oral"], dosis: { adulto: "Inicio: 15-40 mg/día en 2-3 tomas. Mantenimiento: 5-15 mg/día. Crisis tirotóxica: 60-80 mg/día" },
    presentaciones: ["Comprimidos 5, 10, 20 mg"], embarazo: "D",
    lactancia: "Se excreta en leche. Usar dosis bajas (<15 mg/día) y monitorizar función tiroidea neonatal.", cuidadosEnfermeria: ["Hemograma basal y ante fiebre/odinofagia (descartar agranulocitosis)", "Instruir: consultar URGENTE si fiebre >38°C, dolor de garganta o úlceras bucales", "Monitorizar TSH y T4 libre cada 4-6 semanas al inicio", "Efecto clínico tarda 1-3 semanas (las hormonas preformadas deben depletarse)", "En embarazo: propiltiouracilo es preferido en 1er trimestre"],
    farmacocinetica: { absorcion: "Oral rápida y completa", metabolismo: "Hepático: conversión a metimazol (activo)", excrecion: "Renal", vidaMedia: "Metimazol: 4-6 horas (pero efecto dura 24h por acumulación intratiroidea)", inicioAccion: "1-3 semanas", duracionAccion: "24 horas" },
    almacenamiento: "Temperatura ambiente. Proteger de la luz.", unidadId: "u06", capituloId: "c06_02"
  },
  // U05 - Digestivo
  {
    id: "alvimopan", nombre: "Alvimopán", nombreGenerico: "Alvimopán",
    nombresComerciales: ["Entereg"], familia: "Procinéticos hospitalarios",
    clasificacion: "Antagonista periférico de receptores opioides mu", mecanismoAccion: "Bloquea selectivamente receptores opioides mu en el tracto GI sin cruzar la barrera hematoencefálica, contrarrestando el íleo inducido por opioides sin afectar la analgesia central.",
    indicaciones: ["Recuperación acelerada del íleo postoperatorio tras resección intestinal parcial con anastomosis primaria"],
    contraindicaciones: ["Uso de opioides por más de 7 días consecutivos antes de cirugía", "Obstrucción mecánica completa"],
    efectosAdversos: ["Dispepsia", "Flatulencia", "Hipopotasemia", "Anemia", "Retención urinaria"],
    interacciones: ["Opioides: antagoniza efecto GI sin afectar analgesia central", "No usar si el paciente recibió opioides >7 días previos"],
    viaAdministracion: ["oral"], dosis: { adulto: "12 mg oral 30 min-5h antes de cirugía. Luego 12 mg/12h postoperatorio. Máx: 7 días (15 dosis)" },
    presentaciones: ["Cápsulas 12 mg"], embarazo: "B",
    lactancia: "Se desconoce. Uso hospitalario corto.", cuidadosEnfermeria: ["Solo uso intrahospitalario (programa REMS en EE.UU.)", "Máximo 15 dosis (7 días)", "Monitorizar retorno de función intestinal: peristaltismo, gases, deposición", "No usar en pacientes con uso crónico de opioides", "Administrar primera dosis 30 min a 5h antes de la cirugía"],
    farmacocinetica: { absorcion: "Oral, biodisponibilidad 6%", metabolismo: "Flora intestinal y hepático", excrecion: "Fecal 80%, renal 20%", vidaMedia: "10-17 horas", inicioAccion: "Horas", duracionAccion: "12 horas" },
    almacenamiento: "Temperatura ambiente.", unidadId: "u05", capituloId: "c05_03"
  }
];

// Add searchText and filter duplicates
const toAdd = [];
for (const d of newDrugs) {
  if (existingIds.has(d.id)) {
    console.log(`SKIP (duplicate): ${d.id}`);
    continue;
  }
  d.searchText = mkSearch(d);
  toAdd.push(d);
}

// Add to drugs array
drugs.push(...toAdd);
fs.writeFileSync(drugsPath, JSON.stringify(drugs, null, 2), 'utf8');
console.log(`Added ${toAdd.length} new drugs. Total: ${drugs.length}`);

// Update categories.json
const catMap = {};
for (const d of toAdd) {
  const key = d.capituloId;
  if (!catMap[key]) catMap[key] = [];
  catMap[key].push(d.id);
}

for (const unidad of cats.unidades) {
  for (const cap of unidad.capitulos) {
    if (catMap[cap.id]) {
      const existing = new Set(cap.drugIds);
      for (const id of catMap[cap.id]) {
        if (!existing.has(id)) {
          cap.drugIds.push(id);
        }
      }
    }
  }
}

fs.writeFileSync(catsPath, JSON.stringify(cats, null, 2), 'utf8');
console.log('Categories updated.');
console.log('New drugs by chapter:');
for (const [k, v] of Object.entries(catMap)) {
  console.log(`  ${k}: ${v.join(', ')}`);
}
