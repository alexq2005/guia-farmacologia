const fs = require('fs');
const path = require('path');

const DRUGS_PATH = path.join(__dirname, '..', 'src', 'data', 'drugs.json');
const CATS_PATH = path.join(__dirname, '..', 'src', 'data', 'categories.json');

const drugs = JSON.parse(fs.readFileSync(DRUGS_PATH, 'utf8'));
const cats = JSON.parse(fs.readFileSync(CATS_PATH, 'utf8'));

const beforeCount = drugs.length;
console.log('Drug count BEFORE:', beforeCount);

function mkSearch(d) {
  const parts = [
    d.nombre, d.nombreGenerico,
    ...d.nombresComerciales,
    d.familia, d.clasificacion,
    ...d.indicaciones
  ];
  return parts.join(' ').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const newDrugs = [
  // ===== c02_01 Antihipertensivos =====
  {
    id: "olmesartan",
    nombre: "Olmesartán",
    nombreGenerico: "Olmesartán medoxomilo",
    nombresComerciales: ["Olmetec", "Benicar", "Openvas"],
    familia: "ARA-II",
    clasificacion: "Antagonista del receptor de angiotensina II",
    mecanismoAccion: "Bloquea selectivamente el receptor AT1 de la angiotensina II, impidiendo la vasoconstricción y la liberación de aldosterona, reduciendo la presión arterial.",
    indicaciones: ["Hipertensión arterial esencial", "Hipertensión en pacientes intolerantes a IECA"],
    contraindicaciones: ["Embarazo y lactancia", "Estenosis bilateral de arterias renales", "Hiperpotasemia grave", "Hipersensibilidad a olmesartán"],
    efectosAdversos: ["Mareos", "Cefalea", "Hiperpotasemia", "Hipotensión", "Diarrea", "Enteropatía sprue-like (raro pero característico)", "⚠️ Enteropatía grave con diarrea crónica y pérdida de peso: considerar suspender"],
    interacciones: ["AINEs: reducen efecto antihipertensivo y riesgo renal", "Suplementos de potasio/espironolactona: hiperpotasemia", "Litio: aumenta niveles séricos de litio", "Diuréticos: hipotensión aditiva"],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "Inicio: 10-20 mg/día en dosis única. Mantenimiento: 20-40 mg/día. Máximo: 40 mg/día",
      pediatrico: "6-16 años, ≥20 kg: 10 mg/día, máx 20 mg. ≥35 kg: 20 mg/día, máx 40 mg",
      ajusteRenal: "No requiere ajuste en IR leve-moderada. Precaución si ClCr <20 mL/min",
      ajusteHepatico: "No exceder 20 mg/día en insuficiencia hepática moderada"
    },
    presentaciones: ["Comprimidos recubiertos 10 mg, 20 mg, 40 mg"],
    embarazo: "X",
    lactancia: "Contraindicado. Se desconoce excreción en leche materna.",
    cuidadosEnfermeria: ["Monitorizar PA regularmente, especialmente al inicio", "Controlar potasio sérico y función renal periódicamente", "Vigilar diarrea crónica severa: posible enteropatía sprue-like", "Administrar con o sin alimentos a la misma hora", "Educar sobre signos de hipotensión: mareos al levantarse", "Contraindicado en embarazo: verificar test negativo antes de iniciar"],
    farmacocinetica: {
      absorcion: "Biodisponibilidad oral 26%, no afectada significativamente por alimentos",
      distribucion: "Unión a proteínas plasmáticas >99%",
      metabolismo: "Hidrólisis en tracto GI a olmesartán (forma activa). No metabolismo CYP significativo",
      excrecion: "Renal 35-50%, biliar/fecal 50-65%",
      vidaMedia: "13 horas",
      inicioAccion: "1-2 horas",
      picoAccion: "1-2 horas",
      duracionAccion: "24 horas"
    },
    almacenamiento: "Conservar a temperatura ambiente (15-30°C), proteger de la humedad.",
    unidadId: "u02",
    capituloId: "c02_01"
  },
  {
    id: "benazepril",
    nombre: "Benazepril",
    nombreGenerico: "Clorhidrato de benazepril",
    nombresComerciales: ["Lotensin", "Cibacen", "Briem"],
    familia: "IECA",
    clasificacion: "Inhibidor de la enzima convertidora de angiotensina",
    mecanismoAccion: "Profármaco que se hidroliza a benazeprilato, inhibiendo la ECA. Reduce la conversión de angiotensina I a II, disminuye aldosterona y la resistencia vascular periférica.",
    indicaciones: ["Hipertensión arterial", "Insuficiencia cardíaca congestiva (coadyuvante)", "Nefropatía diabética incipiente"],
    contraindicaciones: ["Embarazo", "Angioedema previo por IECA", "Estenosis bilateral de arterias renales", "Uso concomitante con aliskiren en diabéticos"],
    efectosAdversos: ["Tos seca (10%)", "Mareos", "Cefalea", "Hiperpotasemia", "Hipotensión (primera dosis)", "Angioedema (raro)", "Deterioro función renal", "⚠️ TERATÓGENO: categoría X en 2do-3er trimestre"],
    interacciones: ["AINEs: reducen efecto antihipertensivo", "Diuréticos ahorradores de K+: hiperpotasemia", "Litio: aumento de niveles de litio", "Antidiabéticos: potenciación de hipoglucemia"],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "Inicio: 10 mg/día. Mantenimiento: 20-40 mg/día en 1-2 tomas. Máximo: 80 mg/día",
      pediatrico: "≥6 años: 0.2 mg/kg/día, máx 0.6 mg/kg/día (hasta 40 mg)",
      ajusteRenal: "ClCr <30 mL/min: inicio 5 mg/día. Hemodiálisis: dosis posdiálisis",
      ajusteHepatico: "No requiere ajuste específico"
    },
    presentaciones: ["Comprimidos 5 mg, 10 mg, 20 mg, 40 mg"],
    embarazo: "X",
    lactancia: "Mínima excreción en leche. Compatible con precaución.",
    cuidadosEnfermeria: ["Controlar PA antes de cada dosis, sobre todo primera toma", "Monitorizar potasio y creatinina periódicamente", "Vigilar aparición de tos seca persistente", "Educar sobre signos de angioedema: hinchazón facial/lengua → urgencia", "Verificar test de embarazo negativo antes de iniciar", "Puede tomarse con o sin alimentos"],
    farmacocinetica: {
      absorcion: "Oral: 37%, parcialmente afectada por alimentos",
      distribucion: "Unión a proteínas >96%",
      metabolismo: "Hepático: hidrólisis a benazeprilato (metabolito activo)",
      excrecion: "Renal 20%, biliar 80% (como benazeprilato)",
      vidaMedia: "10-11 horas (benazeprilato)",
      inicioAccion: "1 hora",
      picoAccion: "2-4 horas",
      duracionAccion: "24 horas"
    },
    almacenamiento: "Conservar a temperatura ambiente (15-30°C), proteger de la humedad y la luz.",
    unidadId: "u02",
    capituloId: "c02_01"
  },
  {
    id: "fosinopril",
    nombre: "Fosinopril",
    nombreGenerico: "Fosinopril sódico",
    nombresComerciales: ["Monopril", "Fositens", "Fositen"],
    familia: "IECA",
    clasificacion: "Inhibidor de la enzima convertidora de angiotensina",
    mecanismoAccion: "Profármaco que se hidroliza a fosinoprilato. Inhibe la ECA, bloqueando la conversión de angiotensina I a II. Único IECA con doble vía de eliminación (renal y hepática).",
    indicaciones: ["Hipertensión arterial", "Insuficiencia cardíaca (coadyuvante con diuréticos)", "Protección cardiovascular post-IAM"],
    contraindicaciones: ["Embarazo", "Angioedema previo por IECA", "Estenosis bilateral de arterias renales", "Hipersensibilidad a fosinopril"],
    efectosAdversos: ["Tos seca", "Mareos", "Hiperpotasemia", "Hipotensión", "Náuseas", "Diarrea", "Angioedema (raro)", "⚠️ Ventaja: no requiere ajuste renal significativo por doble eliminación"],
    interacciones: ["AINEs: reducen eficacia antihipertensiva", "Suplementos de K+: riesgo de hiperpotasemia", "Litio: toxicidad por litio", "Antiácidos: reducen absorción de fosinopril"],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "HTA: inicio 10 mg/día, mantenimiento 20-40 mg/día. IC: inicio 5-10 mg/día, máx 40 mg/día",
      ajusteRenal: "No requiere ajuste significativo (doble vía eliminación renal/hepática)",
      ajusteHepatico: "Precaución en insuficiencia hepática grave"
    },
    presentaciones: ["Comprimidos 10 mg, 20 mg"],
    embarazo: "X",
    lactancia: "Se excreta en leche materna. No recomendado.",
    cuidadosEnfermeria: ["Monitorizar PA especialmente al inicio del tratamiento", "Controlar función renal y potasio sérico", "Vigilar tos seca persistente: puede requerir cambio a ARA-II", "Ventaja clínica: no necesita ajuste en IR por eliminación dual", "Educar sobre riesgo en embarazo", "Separar de antiácidos al menos 2 horas"],
    farmacocinetica: {
      absorcion: "Oral: 30-40%, se enlentece (no reduce) con alimentos",
      distribucion: "Unión a proteínas >95%",
      metabolismo: "Hepático: hidrólisis a fosinoprilato (activo)",
      excrecion: "Renal 50%, hepática/biliar 50% (ventaja única entre IECA)",
      vidaMedia: "11.5 horas",
      inicioAccion: "1 hora",
      picoAccion: "3 horas",
      duracionAccion: "24 horas"
    },
    almacenamiento: "Conservar a temperatura ambiente (15-30°C). Proteger de la humedad.",
    unidadId: "u02",
    capituloId: "c02_01"
  },
  {
    id: "perindopril",
    nombre: "Perindopril",
    nombreGenerico: "Perindopril arginina",
    nombresComerciales: ["Coversyl", "Acertil", "Perineva"],
    familia: "IECA",
    clasificacion: "Inhibidor de la enzima convertidora de angiotensina",
    mecanismoAccion: "Profármaco que se convierte en perindoprilato, inhibidor potente y específico de la ECA. Reduce la angiotensina II plasmática, aumenta la actividad de renina y reduce la aldosterona.",
    indicaciones: ["Hipertensión arterial", "Insuficiencia cardíaca estable", "Enfermedad coronaria estable (reducción de eventos CV)", "Prevención secundaria de ACV (con indapamida)"],
    contraindicaciones: ["Embarazo", "Angioedema hereditario o previo por IECA", "Estenosis bilateral de arterias renales", "Uso con sacubitril/valsartán (esperar 36h de lavado)"],
    efectosAdversos: ["Tos seca (3-12%)", "Cefalea", "Astenia", "Mareos", "Hiperpotasemia", "Hipotensión", "Disgeusia", "Angioedema (<1%)", "⚠️ Evidencia sólida en EUROPA trial para reducción de mortalidad CV"],
    interacciones: ["AINEs: reducen efecto antihipertensivo y riesgo renal", "Diuréticos ahorradores de K+: hiperpotasemia", "Litio: aumenta niveles tóxicos", "Cotrimoxazol: hiperpotasemia severa"],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "HTA: inicio 4 mg/día (2 mg en ancianos), mantenimiento 4-8 mg/día. IC: inicio 2 mg/día, máx 4 mg/día",
      pediatrico: "No establecido en menores de 18 años",
      ajusteRenal: "ClCr 30-60: 2 mg/día. ClCr 15-30: 2 mg cada 48h. Diálisis: 2 mg día de diálisis",
      ajusteHepatico: "No requiere ajuste. Metabolismo hepático de activación"
    },
    presentaciones: ["Comprimidos 2 mg (argininato), 4 mg, 8 mg, 10 mg"],
    embarazo: "X",
    lactancia: "No recomendado. Se desconoce excreción en leche.",
    cuidadosEnfermeria: ["Administrar por la mañana antes del desayuno", "Monitorizar PA y FC al inicio y ajustes de dosis", "Controlar función renal y potasio cada 1-3 meses", "Vigilar tos seca y angioedema", "En ancianos iniciar con dosis bajas (2 mg)", "Evidencia fuerte en prevención cardiovascular: reforzar adherencia"],
    farmacocinetica: {
      absorcion: "Oral: 65-70%, reducida 35% con alimentos (tomar en ayunas)",
      distribucion: "Unión a proteínas <30% (baja)",
      metabolismo: "Hepático: hidrólisis a perindoprilato (activo)",
      excrecion: "Renal (principal)",
      vidaMedia: "3-5 h (perindopril), 17 h (perindoprilato)",
      inicioAccion: "1-2 horas",
      picoAccion: "3-4 horas",
      duracionAccion: "24 horas"
    },
    almacenamiento: "Conservar a temperatura ambiente, en envase original. Proteger de la humedad.",
    unidadId: "u02",
    capituloId: "c02_01"
  },
  {
    id: "felodipino",
    nombre: "Felodipino",
    nombreGenerico: "Felodipino",
    nombresComerciales: ["Plendil", "Munobal", "Feloday"],
    familia: "Calcioantagonistas dihidropiridínicos",
    clasificacion: "Bloqueador de canales de calcio dihidropiridínico",
    mecanismoAccion: "Bloquea selectivamente los canales de calcio tipo L en el músculo liso vascular, produciendo vasodilatación arterial periférica. Mayor selectividad vascular que cardíaca.",
    indicaciones: ["Hipertensión arterial", "Angina de pecho estable crónica", "Fenómeno de Raynaud"],
    contraindicaciones: ["Shock cardiogénico", "Estenosis aórtica severa", "Insuficiencia cardíaca descompensada", "Embarazo y lactancia", "Hipersensibilidad a dihidropiridinas"],
    efectosAdversos: ["Edema periférico (dosis-dependiente)", "Cefalea", "Rubor facial", "Palpitaciones", "Mareos", "Hiperplasia gingival", "⚠️ Evitar zumo de pomelo: aumenta niveles plasmáticos 2-3 veces"],
    interacciones: ["Zumo de pomelo: aumenta biodisponibilidad 2-3x (CYP3A4)", "Fenitoína/carbamazepina: reducen niveles de felodipino", "Eritromicina/itraconazol: aumentan niveles", "Betabloqueantes: efecto aditivo (generalmente beneficioso)"],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "Inicio: 5 mg/día. Mantenimiento: 5-10 mg/día. Máximo: 20 mg/día. Ancianos: inicio 2.5 mg/día",
      ajusteRenal: "No requiere ajuste",
      ajusteHepatico: "Inicio 2.5 mg/día. No exceder 10 mg/día en hepatopatía"
    },
    presentaciones: ["Comprimidos de liberación prolongada 2.5 mg, 5 mg, 10 mg"],
    embarazo: "C",
    lactancia: "Se excreta en leche materna. No recomendado.",
    cuidadosEnfermeria: ["Administrar comprimidos enteros, no triturar ni masticar (liberación prolongada)", "Monitorizar PA y FC regularmente", "Vigilar edema periférico: frecuente y dosis-dependiente", "Advertir sobre evitar zumo de pomelo", "Revisar encías: posible hiperplasia gingival", "Tomar por la mañana, con o sin alimentos ligeros"],
    farmacocinetica: {
      absorcion: "Oral completa, biodisponibilidad 15% (alto primer paso hepático)",
      distribucion: "Unión a proteínas >99%",
      metabolismo: "Hepático extenso por CYP3A4",
      excrecion: "Renal 70% (metabolitos), fecal 10%",
      vidaMedia: "11-16 horas",
      inicioAccion: "2-5 horas",
      picoAccion: "2.5-5 horas",
      duracionAccion: "24 horas"
    },
    almacenamiento: "Conservar a temperatura ambiente (15-25°C). Proteger de la luz y la humedad.",
    unidadId: "u02",
    capituloId: "c02_01"
  },
  {
    id: "nicardipino",
    nombre: "Nicardipino",
    nombreGenerico: "Clorhidrato de nicardipino",
    nombresComerciales: ["Cardene", "Nicardal", "Loxen"],
    familia: "Calcioantagonistas dihidropiridínicos",
    clasificacion: "Bloqueador de canales de calcio dihidropiridínico (uso IV)",
    mecanismoAccion: "Bloquea los canales de calcio tipo L vasculares con alta selectividad cerebrovascular y coronaria. Produce vasodilatación arterial potente sin depresión miocárdica significativa.",
    indicaciones: ["Emergencias hipertensivas", "Hipertensión perioperatoria", "Vasoespasmo cerebral post-hemorragia subaracnoidea", "Angina de pecho"],
    contraindicaciones: ["Estenosis aórtica avanzada", "Shock cardiogénico", "Hipersensibilidad a dihidropiridinas", "Infusión en mismo catéter con bicarbonato o soluciones alcalinas"],
    efectosAdversos: ["Hipotensión", "Taquicardia refleja", "Cefalea", "Náuseas", "Flebitis en sitio de infusión IV", "Edema periférico (uso oral)", "⚠️ Cambiar sitio de infusión IV cada 12h para evitar flebitis"],
    interacciones: ["Betabloqueantes: precaución por bradicardia aditiva rara", "Ciclosporina: aumenta niveles de ciclosporina", "Cimetidina: aumenta niveles de nicardipino", "Fenitoína: reduce niveles de nicardipino"],
    viaAdministracion: ["IV", "oral"],
    dosis: {
      adulto: "IV: inicio 5 mg/h, titular cada 5-15 min en 2.5 mg/h, máx 15 mg/h. Oral: 20-40 mg TID",
      ajusteRenal: "Oral: iniciar con dosis bajas (20 mg TID)",
      ajusteHepatico: "Oral: inicio 20 mg BID. IV: inicio 3 mg/h"
    },
    presentaciones: ["Ampollas 25 mg/10 mL (2.5 mg/mL) para infusión IV", "Cápsulas 20 mg, 30 mg"],
    embarazo: "C",
    lactancia: "Se excreta en leche. Uso con precaución.",
    cuidadosEnfermeria: ["Infusión IV: diluir en SG5% o SF. NO usar con bicarbonato", "Monitorización continua de PA y FC durante infusión", "Cambiar sitio de venopunción cada 12h (riesgo flebitis)", "Titular gradualmente, no suspender bruscamente", "Usar bomba de infusión para control preciso", "Verificar compatibilidad IV antes de coadministrar"],
    farmacocinetica: {
      absorcion: "Oral: completa, biodisponibilidad 35% (primer paso hepático)",
      distribucion: "Unión a proteínas >95%. Buena penetración cerebral",
      metabolismo: "Hepático extenso por CYP3A4",
      excrecion: "Renal 60%, fecal 35%",
      vidaMedia: "8.6 horas (oral), 40 min fase alfa IV",
      inicioAccion: "IV: 1-5 min. Oral: 30 min",
      picoAccion: "IV: inmediato. Oral: 1-2 horas",
      duracionAccion: "IV: 15-30 min tras suspender. Oral: 8 horas"
    },
    almacenamiento: "Ampollas: temperatura ambiente, proteger de la luz. Solución diluida: estable 24h a T° ambiente.",
    unidadId: "u02",
    capituloId: "c02_01"
  },
  {
    id: "nitrendipino",
    nombre: "Nitrendipino",
    nombreGenerico: "Nitrendipino",
    nombresComerciales: ["Baypress", "Nitrepin", "Trendinol"],
    familia: "Calcioantagonistas dihidropiridínicos",
    clasificacion: "Bloqueador de canales de calcio dihidropiridínico",
    mecanismoAccion: "Bloquea los canales de calcio tipo L del músculo liso vascular, produciendo vasodilatación arteriolar y reducción de la resistencia vascular periférica. Evidencia en prevención de ACV en ancianos (estudio Syst-Eur).",
    indicaciones: ["Hipertensión arterial", "Hipertensión sistólica aislada en ancianos", "Prevención de ACV en hipertensos añosos"],
    contraindicaciones: ["Shock cardiogénico", "Estenosis aórtica severa", "IAM reciente (primeras 4 semanas)", "Hipersensibilidad a dihidropiridinas"],
    efectosAdversos: ["Cefalea", "Edema periférico", "Rubor facial", "Mareos", "Taquicardia refleja", "Hipotensión", "⚠️ Especialmente útil en ancianos con HTA sistólica aislada"],
    interacciones: ["Zumo de pomelo: aumenta biodisponibilidad", "Rifampicina: reduce niveles de nitrendipino", "Betabloqueantes: efecto hipotensor aditivo", "Digoxina: puede aumentar niveles de digoxina"],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "Inicio: 10 mg/día (5 mg en ancianos). Mantenimiento: 10-20 mg/día en 1-2 tomas",
      ajusteRenal: "No requiere ajuste significativo",
      ajusteHepatico: "Reducir dosis. Inicio 5 mg/día"
    },
    presentaciones: ["Comprimidos 10 mg, 20 mg"],
    embarazo: "C",
    lactancia: "Se excreta en leche materna. No recomendado.",
    cuidadosEnfermeria: ["Monitorizar PA especialmente en ancianos", "Vigilar edema maleolar", "Administrar con alimentos para mejorar tolerancia", "No triturar comprimidos", "Ideal para ancianos con HTA sistólica aislada", "Evitar zumo de pomelo"],
    farmacocinetica: {
      absorcion: "Oral: 80-100%, biodisponibilidad 10-30% (primer paso hepático)",
      distribucion: "Unión a proteínas 96-98%",
      metabolismo: "Hepático por CYP3A4",
      excrecion: "Renal 80% (metabolitos), fecal 20%",
      vidaMedia: "8-12 horas",
      inicioAccion: "1-2 horas",
      picoAccion: "1-3 horas",
      duracionAccion: "12-24 horas"
    },
    almacenamiento: "Conservar a temperatura ambiente (15-25°C). Proteger de la luz.",
    unidadId: "u02",
    capituloId: "c02_01"
  },

  // ===== c02_02 Antiarrítmicos =====
  {
    id: "mexiletina",
    nombre: "Mexiletina",
    nombreGenerico: "Clorhidrato de mexiletina",
    nombresComerciales: ["Mexitil", "Namuscla"],
    familia: "Antiarrítmicos clase IB",
    clasificacion: "Antiarrítmico clase IB (bloqueador de canales de sodio)",
    mecanismoAccion: "Bloquea los canales de sodio dependientes de voltaje en fase 0 del potencial de acción cardíaco. Acorta la duración del potencial de acción y el período refractario. También tiene acción analgésica en dolor neuropático.",
    indicaciones: ["Arritmias ventriculares (taquicardia ventricular)", "Alternativa oral a lidocaína IV", "Dolor neuropático refractario (uso off-label)", "Miotonía (síndrome de canalopatía de sodio)"],
    contraindicaciones: ["Bloqueo AV de 2do o 3er grado sin marcapasos", "Shock cardiogénico", "IAM reciente", "Insuficiencia hepática grave"],
    efectosAdversos: ["Náuseas y vómitos (frecuentes)", "Temblor", "Mareos", "Ataxia", "Visión borrosa", "Bradicardia", "Proarritmia", "⚠️ Administrar con alimentos para reducir GI adversos"],
    interacciones: ["Fenitoína: disminuye niveles de mexiletina", "Teofilina: mexiletina aumenta niveles de teofilina", "Inhibidores CYP1A2 (fluvoxamina): aumentan niveles", "Opioides: puede potenciar analgesia"],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "Arritmias: inicio 200 mg/8h con alimentos. Mantenimiento: 200-400 mg/8h. Máx: 1200 mg/día",
      ajusteRenal: "No requiere ajuste significativo",
      ajusteHepatico: "Reducir dosis 25-50% en insuficiencia hepática"
    },
    presentaciones: ["Cápsulas 100 mg, 150 mg, 200 mg"],
    embarazo: "C",
    lactancia: "Se excreta en leche materna. No recomendado.",
    cuidadosEnfermeria: ["Administrar CON alimentos para minimizar náuseas", "Monitorizar ECG continuo al inicio", "Vigilar signos neurológicos: temblor, ataxia, visión borrosa", "Controlar niveles plasmáticos (rango terapéutico 0.5-2 mcg/mL)", "Evitar suspensión brusca", "Reportar proarritmia: empeoramiento de arritmias"],
    farmacocinetica: {
      absorcion: "Oral: >90%, retraso con alimentos pero mejora tolerancia GI",
      distribucion: "Unión a proteínas 50-70%. Volumen distribución 5-7 L/kg",
      metabolismo: "Hepático por CYP1A2 y CYP2D6",
      excrecion: "Renal 10-20% sin cambios, pH-dependiente",
      vidaMedia: "10-12 horas",
      inicioAccion: "0.5-2 horas",
      picoAccion: "2-3 horas",
      duracionAccion: "8-12 horas"
    },
    almacenamiento: "Conservar a temperatura ambiente (15-30°C).",
    unidadId: "u02",
    capituloId: "c02_02"
  },
  {
    id: "dofetilida",
    nombre: "Dofetilida",
    nombreGenerico: "Dofetilida",
    nombresComerciales: ["Tikosyn"],
    familia: "Antiarrítmicos clase III",
    clasificacion: "Antiarrítmico clase III (bloqueador de canales de potasio IKr)",
    mecanismoAccion: "Bloquea selectivamente el componente rápido de la corriente rectificadora tardía de potasio (IKr), prolongando la duración del potencial de acción y el período refractario efectivo sin afectar la conducción.",
    indicaciones: ["Conversión y mantenimiento de ritmo sinusal en fibrilación/flutter auricular", "Fibrilación auricular con cardiopatía estructural"],
    contraindicaciones: ["QTc >440 ms (>500 ms con conducción ventricular alterada)", "Hipopotasemia o hipomagnesemia no corregida", "ClCr <20 mL/min", "Uso concomitante con inhibidores CYP3A4 o cimetidina", "Síndrome de QT largo congénito"],
    efectosAdversos: ["Torsade de pointes (3-4%)", "Prolongación QT", "Cefalea", "Dolor torácico", "Mareos", "⚠️ RIESGO ALTO de Torsade de Pointes: iniciar SOLO en hospitalización con monitorización ECG 3 días", "⚠️ Disponibilidad restringida: solo prescriptores certificados (REMS en EEUU)"],
    interacciones: ["Verapamilo: contraindicado (aumenta niveles de dofetilida)", "Cimetidina: contraindicado (inhibe secreción tubular)", "Ketoconazol, itraconazol: contraindicados (CYP3A4)", "Trimetoprima: contraindicado (inhibe secreción renal)", "Metformina: precaución (competencia secreción tubular)"],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "Según ClCr: >60 mL/min: 500 mcg BID; 40-60: 250 mcg BID; 20-40: 125 mcg BID; <20: contraindicado",
      ajusteRenal: "Obligatorio ajustar según ClCr. Contraindicado si ClCr <20 mL/min",
      ajusteHepatico: "No requiere ajuste (eliminación renal predominante)"
    },
    presentaciones: ["Cápsulas 125 mcg, 250 mcg, 500 mcg"],
    embarazo: "C",
    lactancia: "Se desconoce excreción. No recomendado.",
    cuidadosEnfermeria: ["OBLIGATORIO: iniciar en hospital con monitorización ECG continua x3 días", "Medir QTc basal y cada 2-3h durante carga", "Si QTc >500 ms o aumenta >15%: suspender inmediatamente", "Corregir K+ y Mg2+ ANTES de iniciar", "Controlar ClCr antes y durante tratamiento", "Verificar lista de interacciones medicamentosas: múltiples contraindicaciones absolutas"],
    farmacocinetica: {
      absorcion: "Oral: >90%, no afectada por alimentos",
      distribucion: "Unión a proteínas 60-70%",
      metabolismo: "Hepático parcial por CYP3A4 (metabolitos inactivos)",
      excrecion: "Renal 80% (50% sin cambios). Secreción tubular activa",
      vidaMedia: "10 horas",
      inicioAccion: "1-3 horas",
      picoAccion: "2-3 horas",
      duracionAccion: "12 horas"
    },
    almacenamiento: "Conservar a temperatura ambiente (15-30°C). Proteger de la humedad.",
    unidadId: "u02",
    capituloId: "c02_02"
  },
  {
    id: "ibutilida",
    nombre: "Ibutilida",
    nombreGenerico: "Fumarato de ibutilida",
    nombresComerciales: ["Corvert"],
    familia: "Antiarrítmicos clase III",
    clasificacion: "Antiarrítmico clase III (uso IV exclusivo para cardioversión farmacológica)",
    mecanismoAccion: "Prolonga la duración del potencial de acción activando una corriente lenta de sodio entrante y bloqueando la corriente rectificadora tardía de potasio (IKr). Prolonga el período refractario auricular.",
    indicaciones: ["Cardioversión farmacológica de fibrilación auricular reciente (<48h o anticoagulado)", "Cardioversión de flutter auricular", "Alternativa a cardioversión eléctrica"],
    contraindicaciones: ["QTc >440 ms basal", "Hipopotasemia o hipomagnesemia no corregida", "Antecedente de Torsade de pointes", "Uso concomitante con otros fármacos que prolongan QT"],
    efectosAdversos: ["Torsade de pointes (4-8%)", "Prolongación QT", "Taquicardia ventricular no sostenida", "Hipotensión", "Bradicardia", "⚠️ ALTO RIESGO Torsade: monitorización ECG obligatoria 4-6h post-infusión", "⚠️ Más eficaz en flutter (60-70%) que en FA (30-50%)"],
    interacciones: ["Amiodarona, sotalol: no usar simultáneamente (prolongación QT aditiva)", "Antidepresivos tricíclicos: riesgo QT prolongado", "Fenotiacinas: prolongación QT aditiva", "Antihistamínicos (terfenadina): prolongación QT"],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "≥60 kg: 1 mg IV en 10 min. <60 kg: 0.01 mg/kg IV en 10 min. Puede repetir 1 dosis tras 10 min si no hay respuesta",
      ajusteRenal: "No requiere ajuste",
      ajusteHepatico: "No requiere ajuste"
    },
    presentaciones: ["Solución inyectable 0.1 mg/mL, vial 10 mL (1 mg)"],
    embarazo: "C",
    lactancia: "Se desconoce excreción. No recomendado.",
    cuidadosEnfermeria: ["Administrar SOLO en UCI o unidad con monitorización continua", "Corregir K+ (>4 mEq/L) y Mg2+ antes de infundir", "Infundir en 10 min, no en bolo", "Monitorización ECG continua durante y 4-6h después", "Tener desfibrilador y sulfato de magnesio disponibles", "Si Torsade de pointes: Mg2+ IV 1-2g y cardioversión si inestable"],
    farmacocinetica: {
      absorcion: "No aplica (solo IV)",
      distribucion: "Volumen distribución 11 L/kg. Unión a proteínas 40%",
      metabolismo: "Hepático extenso (metabolitos inactivos)",
      excrecion: "Renal 82%, fecal 19%",
      vidaMedia: "6 horas (rango 2-12h)",
      inicioAccion: "Inmediato (minutos)",
      picoAccion: "Durante la infusión",
      duracionAccion: "Efecto sobre QT persiste 2-4 horas"
    },
    almacenamiento: "Refrigerar 2-8°C. Estable 24h a temperatura ambiente tras dilución.",
    unidadId: "u02",
    capituloId: "c02_02"
  },

  // ===== c02_03 Vasodilatadores =====
  {
    id: "alprostadil",
    nombre: "Alprostadil",
    nombreGenerico: "Alprostadil (Prostaglandina E1)",
    nombresComerciales: ["Prostin VR", "Caverject", "Muse"],
    familia: "Prostaglandinas",
    clasificacion: "Prostaglandina E1 vasodilatadora",
    mecanismoAccion: "Actúa sobre receptores de PGE1 en músculo liso vascular produciendo vasodilatación directa. Mantiene la permeabilidad del conducto arterioso en neonatos. Inhibe la agregación plaquetaria.",
    indicaciones: ["Mantenimiento del conducto arterioso permeable en cardiopatías congénitas ductus-dependientes", "Enfermedad arterial periférica severa (Buerger, aterosclerosis)", "Disfunción eréctil (uso intracavernoso)", "Diagnóstico de disfunción eréctil"],
    contraindicaciones: ["Síndrome de dificultad respiratoria neonatal", "Coagulopatía severa", "Hipersensibilidad a alprostadil", "Enfermedad de Peyronie (uso intracavernoso)"],
    efectosAdversos: ["Apnea neonatal (10-12%) — principal riesgo", "Fiebre", "Hipotensión", "Bradicardia", "Rubor facial", "Dolor en sitio de infusión", "⚠️ NEONATOS: vigilancia respiratoria continua, tener equipo de intubación disponible", "⚠️ Puede causar proliferación cortical ósea con uso prolongado >120h"],
    interacciones: ["Anticoagulantes: aumento de riesgo de sangrado", "Antihipertensivos: hipotensión aditiva", "Vasodilatadores: efecto aditivo", "Sildenafilo (uso intracavernoso): priapismo"],
    viaAdministracion: ["IV", "intracavernosa", "intrauretral"],
    dosis: {
      adulto: "EAP: 40-60 mcg IV en 2h, 1-2 veces/día por 2-4 semanas. Intracavernoso: 2.5-40 mcg",
      pediatrico: "Ductus arterioso: inicio 0.05-0.1 mcg/kg/min IV. Mantenimiento: 0.01-0.05 mcg/kg/min. Titular a dosis mínima efectiva"
    },
    presentaciones: ["Ampollas 500 mcg para infusión IV", "Ampollas 10, 20, 40 mcg (intracavernoso)", "Dispositivo intrauretral 125, 250, 500, 1000 mcg"],
    embarazo: "X",
    lactancia: "No aplica (uso predominante en neonatos y varones).",
    cuidadosEnfermeria: ["NEONATOS: monitorización respiratoria continua — apnea en 10-12%", "Tener equipo de intubación preparado en neonatos", "Infundir por vía venosa central o arteria umbilical", "Controlar PA, FC, T° y saturación O2 continuamente", "No mezclar con otras soluciones en misma vía", "Uso >120h: vigilar proliferación cortical ósea en huesos largos"],
    farmacocinetica: {
      absorcion: "No aplica (uso parenteral)",
      distribucion: "Rápida. Unión a proteínas albumina 80%",
      metabolismo: "Pulmón (90% en primer paso pulmonar) y hepático. Metabolismo muy rápido",
      excrecion: "Renal (90% como metabolitos en 24h)",
      vidaMedia: "5-10 minutos",
      inicioAccion: "Minutos (IV)",
      picoAccion: "15-30 minutos",
      duracionAccion: "1-3 horas tras suspender infusión"
    },
    almacenamiento: "Refrigerar 2-8°C. Solución diluida: usar dentro de 24h.",
    unidadId: "u02",
    capituloId: "c02_03"
  },
  {
    id: "bosentan",
    nombre: "Bosentán",
    nombreGenerico: "Bosentán",
    nombresComerciales: ["Tracleer", "Stayveer"],
    familia: "Antagonistas de endotelina",
    clasificacion: "Antagonista dual de receptores de endotelina (ETA/ETB)",
    mecanismoAccion: "Bloquea de forma competitiva los receptores de endotelina ETA y ETB, inhibiendo la vasoconstricción pulmonar y sistémica mediada por endotelina-1. Reduce la presión arterial pulmonar y la resistencia vascular pulmonar.",
    indicaciones: ["Hipertensión arterial pulmonar (HAP) clase funcional II-IV OMS", "HAP idiopática, asociada a conectivopatías o cardiopatías congénitas", "Prevención de úlceras digitales en esclerosis sistémica"],
    contraindicaciones: ["Embarazo (teratógeno)", "Insuficiencia hepática moderada-grave (Child-Pugh B o C)", "Transaminasas basales >3x LSN", "Uso concomitante con ciclosporina A o gliburida"],
    efectosAdversos: ["Hepatotoxicidad (elevación transaminasas 10-14%)", "Edema periférico", "Cefalea", "Anemia (disminución Hb)", "Rubor facial", "Teratogenicidad", "⚠️ CONTROL MENSUAL OBLIGATORIO de transaminasas hepáticas", "⚠️ Programa de acceso restringido en muchos países por teratogenicidad"],
    interacciones: ["Ciclosporina: contraindicado (aumenta niveles de bosentán 30x)", "Gliburida: contraindicado (hepatotoxicidad aditiva)", "Sildenafilo: bosentán reduce niveles de sildenafilo 50%", "Anticonceptivos hormonales: reduce eficacia (usar doble método)", "Warfarina: puede reducir INR"],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "Inicio: 62.5 mg BID x4 semanas. Mantenimiento: 125 mg BID. >40 kg",
      pediatrico: "10-20 kg: 31.25 mg BID. 20-40 kg: 62.5 mg BID",
      ajusteRenal: "No requiere ajuste",
      ajusteHepatico: "Contraindicado en Child-Pugh B y C"
    },
    presentaciones: ["Comprimidos recubiertos 62.5 mg, 125 mg", "Comprimidos dispersables 32 mg (pediátrico)"],
    embarazo: "X",
    lactancia: "Contraindicado. Se desconoce excreción.",
    cuidadosEnfermeria: ["Monitorizar transaminasas hepáticas MENSUALMENTE sin excepción", "Si ALT/AST >3x LSN: reducir dosis o suspender", "Verificar test de embarazo negativo MENSUAL en mujeres fértiles", "Asegurar anticoncepción doble (bosentán reduce eficacia de hormonales)", "Controlar hemoglobina cada 1-3 meses (riesgo anemia)", "Educar sobre signos de hepatotoxicidad: ictericia, dolor abdominal, fatiga"],
    farmacocinetica: {
      absorcion: "Oral: 50%, no afectada por alimentos",
      distribucion: "Unión a proteínas >98% (albumina)",
      metabolismo: "Hepático por CYP2C9 y CYP3A4. Inductor de su propio metabolismo",
      excrecion: "Biliar/fecal (principal), renal <3%",
      vidaMedia: "5 horas",
      inicioAccion: "3-5 horas",
      picoAccion: "3-5 horas",
      duracionAccion: "12 horas"
    },
    almacenamiento: "Conservar a temperatura ambiente (15-30°C).",
    unidadId: "u02",
    capituloId: "c02_03"
  },
  {
    id: "macitentan",
    nombre: "Macitentán",
    nombreGenerico: "Macitentán",
    nombresComerciales: ["Opsumit"],
    familia: "Antagonistas de endotelina",
    clasificacion: "Antagonista dual de receptores de endotelina (ETA/ETB) de segunda generación",
    mecanismoAccion: "Bloquea los receptores de endotelina ETA y ETB con alta afinidad tisular. Diseñado para penetración sostenida en tejido pulmonar. Reduce la resistencia vascular pulmonar y mejora la capacidad de ejercicio.",
    indicaciones: ["Hipertensión arterial pulmonar (HAP) clase funcional II-III OMS", "HAP para retrasar progresión de enfermedad (reducción de morbilidad/mortalidad: estudio SERAPHIN)"],
    contraindicaciones: ["Embarazo (teratógeno potente)", "Lactancia", "Insuficiencia hepática severa (Child-Pugh C)", "Transaminasas >3x LSN al inicio"],
    efectosAdversos: ["Anemia/disminución de hemoglobina (frecuente)", "Cefalea", "Nasofaringitis", "Bronquitis", "Edema/retención de líquidos", "Hepatotoxicidad (menos frecuente que bosentán)", "⚠️ Ventaja sobre bosentán: menor hepatotoxicidad y no necesita monitorización mensual obligatoria de transaminasas"],
    interacciones: ["Inhibidores potentes CYP3A4 (ketoconazol, ritonavir): duplican niveles", "Inductores potentes CYP3A4 (rifampicina): reducen niveles 79%", "Anticonceptivos hormonales: no interacción significativa (ventaja vs bosentán)", "Warfarina: no interacción significativa"],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "10 mg una vez al día, con o sin alimentos. No requiere titulación",
      ajusteRenal: "No requiere ajuste",
      ajusteHepatico: "No recomendado en Child-Pugh C. No requiere ajuste en leve-moderada"
    },
    presentaciones: ["Comprimidos recubiertos 10 mg"],
    embarazo: "X",
    lactancia: "Contraindicado.",
    cuidadosEnfermeria: ["Verificar test de embarazo negativo antes de iniciar y mensualmente", "Asegurar anticoncepción eficaz en mujeres fértiles", "Monitorizar hemoglobina basal y periódicamente (riesgo anemia)", "Controlar función hepática antes de iniciar y según clínica", "Ventaja: dosis única diaria fija sin titulación", "Evaluar signos de retención de líquidos y edema"],
    farmacocinetica: {
      absorcion: "Oral: absorción lenta, no afectada por alimentos",
      distribucion: "Unión a proteínas >99%. Alta penetración tisular pulmonar",
      metabolismo: "Hepático por CYP3A4 y CYP2C19. Metabolito activo (ACT-132577)",
      excrecion: "Fecal 50%, renal 24%",
      vidaMedia: "16 horas (macitentán), 48 horas (metabolito activo)",
      inicioAccion: "Efecto clínico gradual (semanas)",
      picoAccion: "8 horas",
      duracionAccion: "24 horas (dosificación)"
    },
    almacenamiento: "Conservar a temperatura ambiente (15-30°C).",
    unidadId: "u02",
    capituloId: "c02_03"
  },

  // ===== c02_04 Diuréticos =====
  {
    id: "metolazona",
    nombre: "Metolazona",
    nombreGenerico: "Metolazona",
    nombresComerciales: ["Zaroxolyn", "Mykrox", "Metenix"],
    familia: "Diuréticos tiazida-like",
    clasificacion: "Diurético tiazida-like (quinazolina sulfonamida)",
    mecanismoAccion: "Inhibe la reabsorción de sodio y cloro en el túbulo contorneado distal (similar a tiazidas) pero también actúa en el túbulo proximal. Mantiene eficacia en insuficiencia renal avanzada, a diferencia de tiazidas clásicas.",
    indicaciones: ["Edema refractario en IC (en combinación con furosemida)", "Hipertensión arterial", "Edema en síndrome nefrótico", "Resistencia a diuréticos de asa"],
    contraindicaciones: ["Anuria", "Coma hepático", "Hipersensibilidad a sulfonamidas", "Depleción severa de electrolitos"],
    efectosAdversos: ["Hipopotasemia severa", "Hiponatremia", "Hipomagnesemia", "Hipotensión", "Hiperuricemia", "Hiperglucemia", "Deshidratación", "⚠️ POTENCIA SINÉRGICA con furosemida: puede causar diuresis masiva y shock hipovolémico", "⚠️ Iniciar con dosis muy bajas y monitorizar electrolitos diariamente"],
    interacciones: ["Furosemida: sinergia potente (bloqueo secuencial del nefrón)", "Digoxina: mayor toxicidad por hipopotasemia", "Litio: aumenta niveles de litio", "AINEs: reducen efecto diurético", "Corticosteroides: hipopotasemia aditiva"],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "IC con furosemida: 2.5-5 mg/día (30 min antes de furosemida). HTA: 2.5-5 mg/día. Máx: 10 mg/día",
      ajusteRenal: "Eficaz incluso con ClCr <20 mL/min (ventaja sobre HCTZ)",
      ajusteHepatico: "Precaución en cirrosis. Puede precipitar encefalopatía"
    },
    presentaciones: ["Comprimidos 2.5 mg, 5 mg, 10 mg"],
    embarazo: "D",
    lactancia: "Se excreta en leche. No recomendado.",
    cuidadosEnfermeria: ["Administrar 30 min ANTES de furosemida para efecto sinérgico", "Monitorizar K+, Na+, Mg2+, creatinina DIARIAMENTE al inicio", "Pesar al paciente diariamente: diuresis puede ser masiva", "Vigilar signos de deshidratación: sed, hipotensión, oliguria", "Administrar por la mañana para evitar nicturia", "Suplementar potasio según niveles"],
    farmacocinetica: {
      absorcion: "Oral: 65%, absorción lenta",
      distribucion: "Unión a proteínas 50-70%. Concentración en eritrocitos",
      metabolismo: "Mínimo metabolismo hepático",
      excrecion: "Renal 80% (forma inalterada)",
      vidaMedia: "14 horas (rango 6-20h)",
      inicioAccion: "1 hora",
      picoAccion: "2-8 horas",
      duracionAccion: "12-24 horas"
    },
    almacenamiento: "Conservar a temperatura ambiente (15-30°C). Proteger de la luz.",
    unidadId: "u02",
    capituloId: "c02_04"
  },
  {
    id: "clorotiazida",
    nombre: "Clorotiazida",
    nombreGenerico: "Clorotiazida sódica",
    nombresComerciales: ["Diuril", "Chlotride"],
    familia: "Diuréticos tiazídicos",
    clasificacion: "Diurético tiazídico (prototipo histórico)",
    mecanismoAccion: "Inhibe el cotransportador Na+/Cl- en el túbulo contorneado distal, aumentando la excreción renal de sodio, cloro y agua. Primera tiazida desarrollada. Disponible en formulación IV (única tiazida IV).",
    indicaciones: ["Edema asociado a insuficiencia cardíaca", "Hipertensión arterial", "Edema refractario (IV, en combinación con diuréticos de asa)", "Diabetes insípida nefrogénica (paradójicamente reduce diuresis)"],
    contraindicaciones: ["Anuria", "Hipersensibilidad a sulfonamidas", "Insuficiencia renal severa (ClCr <30 mL/min para uso crónico oral)", "Depleción electrolítica grave"],
    efectosAdversos: ["Hipopotasemia", "Hiponatremia", "Hipercalcemia leve", "Hiperuricemia", "Hiperglucemia", "Alcalosis hipoclorémica", "Fotosensibilidad", "⚠️ Única tiazida disponible IV: útil en pacientes sin vía oral"],
    interacciones: ["Digoxina: toxicidad por hipopotasemia", "Litio: reducción de excreción renal", "AINEs: antagonizan efecto diurético", "Corticosteroides: hipopotasemia aditiva", "Antidiabéticos: puede requerir ajuste de dosis"],
    viaAdministracion: ["oral", "IV"],
    dosis: {
      adulto: "Oral: 250-500 mg/día en 1-2 tomas. Máx: 1000 mg/día. IV: 250-500 mg cada 12-24h",
      pediatrico: "Oral: 10-20 mg/kg/día dividido en 2 tomas. Máx: 375 mg/día (<2 años), 1 g/día (>2 años)",
      ajusteRenal: "Ineficaz si ClCr <30 mL/min (a diferencia de metolazona)",
      ajusteHepatico: "Precaución: puede precipitar encefalopatía hepática"
    },
    presentaciones: ["Comprimidos 250 mg, 500 mg", "Polvo para inyección 500 mg (reconstituir con agua estéril)"],
    embarazo: "D",
    lactancia: "Se excreta en leche materna. Compatible con precaución.",
    cuidadosEnfermeria: ["Monitorizar electrolitos: K+, Na+, Cl-, Ca2+, Mg2+", "Administrar por la mañana para evitar nicturia", "IV: reconstituir con 18 mL de agua estéril, nunca IM o SC", "Administrar IV lento, evitar extravasación (alcalino, irritante)", "Vigilar glucemia en diabéticos: puede causar hiperglucemia", "Educar sobre protección solar: fotosensibilidad"],
    farmacocinetica: {
      absorcion: "Oral: 10-20% (baja biodisponibilidad, la peor de las tiazidas)",
      distribucion: "Unión a proteínas 40-60%",
      metabolismo: "No se metaboliza significativamente",
      excrecion: "Renal (forma inalterada)",
      vidaMedia: "1-2 horas (corta)",
      inicioAccion: "Oral: 2h. IV: 15 min",
      picoAccion: "Oral: 4h. IV: 30 min",
      duracionAccion: "6-12 horas"
    },
    almacenamiento: "Comprimidos: temperatura ambiente. Polvo IV: temperatura ambiente, reconstituido usar inmediatamente.",
    unidadId: "u02",
    capituloId: "c02_04"
  },

  // ===== c02_05 Antilipémicos =====
  {
    id: "pravastatina",
    nombre: "Pravastatina",
    nombreGenerico: "Pravastatina sódica",
    nombresComerciales: ["Pravacol", "Lipemol", "Prasterol"],
    familia: "Estatinas",
    clasificacion: "Inhibidor de HMG-CoA reductasa (estatina hidrofílica)",
    mecanismoAccion: "Inhibe competitivamente la HMG-CoA reductasa, enzima limitante en la síntesis hepática de colesterol. Aumenta la expresión de receptores LDL hepáticos. Estatina hidrofílica con menor penetración muscular (menor riesgo de miopatía).",
    indicaciones: ["Hipercolesterolemia primaria", "Prevención primaria y secundaria cardiovascular", "Dislipidemia mixta", "Pacientes con alto riesgo de miopatía por estatinas"],
    contraindicaciones: ["Enfermedad hepática activa o transaminasas persistentemente elevadas", "Embarazo y lactancia", "Hipersensibilidad a pravastatina"],
    efectosAdversos: ["Mialgias (menos frecuentes que estatinas lipofílicas)", "Cefalea", "Náuseas", "Diarrea", "Elevación de transaminasas", "Rabdomiólisis (muy raro)", "⚠️ Menor riesgo de miopatía que atorvastatina/simvastatina: preferida en pacientes con intolerancia muscular"],
    interacciones: ["Fibratos (gemfibrozil): riesgo de rabdomiólisis", "Ciclosporina: aumenta niveles de pravastatina", "Warfarina: monitorizar INR al iniciar", "NO interacción significativa con CYP3A4 (ventaja): compatible con azólicos, macrólidos, zumo pomelo"],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "Inicio: 20-40 mg/día por la noche. Máximo: 80 mg/día",
      pediatrico: "8-13 años: 20 mg/día. 14-18 años: 40 mg/día",
      ajusteRenal: "Inicio 10 mg/día en IR significativa",
      ajusteHepatico: "Contraindicado en hepatopatía activa"
    },
    presentaciones: ["Comprimidos 10 mg, 20 mg, 40 mg, 80 mg"],
    embarazo: "X",
    lactancia: "Contraindicado.",
    cuidadosEnfermeria: ["Administrar por la noche (síntesis de colesterol es nocturna)", "Controlar perfil lipídico a las 4-6 semanas", "Monitorizar transaminasas basal y periódicamente", "Vigilar mialgias: CK si síntomas musculares", "Ventaja: menor riesgo de interacciones por no usar CYP3A4", "Puede tomarse con o sin alimentos"],
    farmacocinetica: {
      absorcion: "Oral: 34%, reducida 30% con alimentos (no clínicamente significativo)",
      distribucion: "Unión a proteínas 50%. Hidrofílica: menor penetración muscular",
      metabolismo: "Hepático (primer paso), NO por CYP3A4 (ventaja)",
      excrecion: "Fecal 70%, renal 20%",
      vidaMedia: "1.5-2 horas",
      inicioAccion: "1-2 semanas (efecto lipídico)",
      picoAccion: "1-1.5 horas",
      duracionAccion: "24 horas (efecto farmacológico)"
    },
    almacenamiento: "Conservar a temperatura ambiente (15-30°C). Proteger de la luz y la humedad.",
    unidadId: "u02",
    capituloId: "c02_05"
  },
  {
    id: "alirocumab",
    nombre: "Alirocumab",
    nombreGenerico: "Alirocumab",
    nombresComerciales: ["Praluent"],
    familia: "Inhibidores de PCSK9",
    clasificacion: "Anticuerpo monoclonal inhibidor de PCSK9",
    mecanismoAccion: "Anticuerpo monoclonal humano IgG1 que se une a la proproteína convertasa subtilisina/kexina tipo 9 (PCSK9), impidiendo su unión al receptor LDL hepático. Esto aumenta el reciclaje de receptores LDL en la superficie del hepatocito, incrementando la captación y eliminación del LDL-colesterol.",
    indicaciones: ["Hipercolesterolemia familiar heterocigota", "Enfermedad cardiovascular aterosclerótica con LDL no controlado con estatinas a dosis máximas", "Intolerancia a estatinas con alto riesgo CV"],
    contraindicaciones: ["Hipersensibilidad a alirocumab", "No contraindicaciones absolutas adicionales conocidas"],
    efectosAdversos: ["Reacciones en sitio de inyección (eritema, dolor, prurito)", "Nasofaringitis", "Síntomas gripales", "Mialgias", "Prurito", "⚠️ Reduce LDL hasta 50-60% adicional sobre estatinas", "⚠️ Alto costo: reservar para pacientes de muy alto riesgo CV"],
    interacciones: ["Estatinas: efecto aditivo sobre LDL (combinación habitual)", "No interacciones farmacológicas significativas conocidas", "No afecta CYP450"],
    viaAdministracion: ["SC"],
    dosis: {
      adulto: "75 mg SC cada 2 semanas o 300 mg SC cada 4 semanas. Máx: 150 mg cada 2 semanas",
      ajusteRenal: "No requiere ajuste en IR leve-moderada",
      ajusteHepatico: "No requiere ajuste en IH leve-moderada. Sin datos en IH grave"
    },
    presentaciones: ["Jeringa precargada 75 mg/mL", "Jeringa precargada 150 mg/mL", "Pluma autoinyectable 75 mg, 150 mg"],
    embarazo: "C",
    lactancia: "Se desconoce excreción. Evaluar riesgo/beneficio.",
    cuidadosEnfermeria: ["Enseñar técnica de autoinyección SC: abdomen, muslo o brazo", "Rotar sitios de inyección", "Sacar de refrigerador 30-40 min antes (atemperrar)", "Controlar perfil lipídico a las 4-8 semanas de inicio", "Vigilar reacciones locales en sitio de inyección", "Almacenar en refrigerador hasta uso"],
    farmacocinetica: {
      absorcion: "SC: biodisponibilidad 85%",
      distribucion: "Volumen distribución 0.04-0.05 L/kg",
      metabolismo: "Degradación proteolítica a péptidos (como otros anticuerpos)",
      excrecion: "No renal. Eliminación mediada por receptor (saturable)",
      vidaMedia: "17-20 días",
      inicioAccion: "4-8 horas (supresión PCSK9)",
      picoAccion: "3-7 días",
      duracionAccion: "14-28 días según dosis"
    },
    almacenamiento: "Refrigerar 2-8°C. No congelar. Proteger de la luz. Estable 30 días a T° ambiente (hasta 25°C).",
    unidadId: "u02",
    capituloId: "c02_05"
  },
  {
    id: "evolocumab",
    nombre: "Evolocumab",
    nombreGenerico: "Evolocumab",
    nombresComerciales: ["Repatha"],
    familia: "Inhibidores de PCSK9",
    clasificacion: "Anticuerpo monoclonal inhibidor de PCSK9",
    mecanismoAccion: "Anticuerpo monoclonal humano IgG2 que se une a PCSK9 libre circulante, impidiendo la degradación del receptor LDL hepático. Aumenta la densidad de receptores LDL en hepatocitos, reduciendo LDL-colesterol hasta 60%.",
    indicaciones: ["Hipercolesterolemia familiar homocigota y heterocigota", "Enfermedad cardiovascular aterosclerótica establecida", "Pacientes con LDL no controlado con estatinas máximas ± ezetimibe", "Reducción de eventos CV (estudio FOURIER)"],
    contraindicaciones: ["Hipersensibilidad grave a evolocumab"],
    efectosAdversos: ["Reacciones en sitio de inyección", "Nasofaringitis", "Infección respiratoria alta", "Artralgias", "Dorsalgia", "Cefalea", "⚠️ Evidencia robusta de reducción de eventos CV (FOURIER): -15% eventos CV mayores", "⚠️ Eficaz incluso en hipercolesterolemia familiar homocigota"],
    interacciones: ["Sin interacciones farmacológicas significativas", "Estatinas: uso concomitante habitual y recomendado", "No afecta CYP450 ni transportadores"],
    viaAdministracion: ["SC"],
    dosis: {
      adulto: "140 mg SC cada 2 semanas o 420 mg SC cada 4 semanas (3 inyecciones de 140 mg). HoFH: 420 mg SC mensuales",
      pediatrico: "HoFH ≥12 años: 420 mg SC cada 4 semanas",
      ajusteRenal: "No requiere ajuste",
      ajusteHepatico: "No requiere ajuste en IH leve-moderada"
    },
    presentaciones: ["Jeringa precargada 140 mg/mL", "Pluma autoinyectable (SureClick) 140 mg/mL", "Cartucho para Pushtronex 420 mg/3.5 mL"],
    embarazo: "C",
    lactancia: "Se desconoce excreción. Evaluar riesgo/beneficio.",
    cuidadosEnfermeria: ["Instruir autoinyección SC: abdomen, muslo o brazo superior", "Rotar sitios de inyección en cada aplicación", "Atemperrar 30 min fuera del refrigerador antes de inyectar", "Si dosis 420 mg: administrar 3 inyecciones de 140 mg consecutivas en sitios diferentes", "Controlar perfil lipídico a las 4-8 semanas", "Almacenar refrigerado; estable 30 días a T° ambiente"],
    farmacocinetica: {
      absorcion: "SC: biodisponibilidad 72%",
      distribucion: "Volumen distribución 3.3 L (estado estable)",
      metabolismo: "Degradación proteolítica (no hepática)",
      excrecion: "Eliminación mediada por receptor saturable (no renal)",
      vidaMedia: "11-17 días",
      inicioAccion: "4 horas (reducción PCSK9 libre)",
      picoAccion: "3-4 días",
      duracionAccion: "14-28 días según dosis"
    },
    almacenamiento: "Refrigerar 2-8°C. No congelar. Proteger de la luz. Estable hasta 30 días a ≤25°C.",
    unidadId: "u02",
    capituloId: "c02_05"
  },
  {
    id: "acido_bempedoico",
    nombre: "Ácido Bempedoico",
    nombreGenerico: "Ácido bempedoico",
    nombresComerciales: ["Nexletol", "Nilemdo"],
    familia: "Inhibidores de ACL",
    clasificacion: "Inhibidor de la ATP-citrato liasa (ACL)",
    mecanismoAccion: "Profármaco que se activa en el hígado por la ACSVL1. Inhibe la ATP-citrato liasa (ACL), enzima upstream de HMG-CoA reductasa en la síntesis de colesterol. Al activarse solo en hígado (no en músculo), tiene menor riesgo de miopatía.",
    indicaciones: ["Hipercolesterolemia en adultos que no toleran estatinas", "Reducción adicional de LDL en pacientes con estatinas máximas + ezetimibe", "Enfermedad cardiovascular aterosclerótica o hipercolesterolemia familiar"],
    contraindicaciones: ["Embarazo y lactancia", "Hipersensibilidad al ácido bempedoico"],
    efectosAdversos: ["Hiperuricemia/gota", "Dolor en extremidades", "Anemia", "Elevación de transaminasas", "Elevación de creatinina", "Rotura tendinosa (raro)", "⚠️ NO causa miopatía: activación solo hepática (no en músculo)", "⚠️ Alternativa clave para pacientes intolerantes a estatinas"],
    interacciones: ["Simvastatina: no exceder 20 mg de simvastatina (aumenta exposición)", "Pravastatina: no exceder 40 mg de pravastatina", "Probenecid: puede aumentar niveles de ácido bempedoico", "Atorvastatina/rosuvastatina: sin interacción significativa"],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "180 mg una vez al día, con o sin alimentos",
      ajusteRenal: "No requiere ajuste en IR leve-moderada. Sin datos en IR grave",
      ajusteHepatico: "No requiere ajuste en IH leve. No recomendado en IH moderada-grave"
    },
    presentaciones: ["Comprimidos 180 mg"],
    embarazo: "X",
    lactancia: "Contraindicado.",
    cuidadosEnfermeria: ["Monitorizar ácido úrico: riesgo de hiperuricemia y gota", "Controlar perfil lipídico a las 8-12 semanas", "Vigilar transaminasas periódicamente", "Verificar creatinina basal y de seguimiento", "Ideal para pacientes con intolerancia muscular a estatinas", "Puede combinarse con ezetimibe para efecto aditivo"],
    farmacocinetica: {
      absorcion: "Oral: bien absorbido, Tmax 3.5h",
      distribucion: "Unión a proteínas >99%",
      metabolismo: "Hepático: activación por ACSVL1 a metabolito activo (ESP15228)",
      excrecion: "Fecal 70%, renal 30%",
      vidaMedia: "21 horas (metabolito activo ~120h)",
      inicioAccion: "2-4 semanas (efecto lipídico)",
      picoAccion: "3.5 horas (plasmático)",
      duracionAccion: "24 horas (dosificación diaria)"
    },
    almacenamiento: "Conservar a temperatura ambiente (20-25°C).",
    unidadId: "u02",
    capituloId: "c02_05"
  },

  // ===== c02_06 Antiagregantes =====
  {
    id: "cilostazol",
    nombre: "Cilostazol",
    nombreGenerico: "Cilostazol",
    nombresComerciales: ["Pletal", "Cilostamol", "Ekistol"],
    familia: "Inhibidores de PDE3",
    clasificacion: "Inhibidor de fosfodiesterasa III / Antiagregante plaquetario",
    mecanismoAccion: "Inhibe selectivamente la fosfodiesterasa III, aumentando AMPc en plaquetas y músculo liso vascular. Produce inhibición de agregación plaquetaria, vasodilatación y mejora del flujo sanguíneo periférico. También inhibe proliferación de músculo liso.",
    indicaciones: ["Claudicación intermitente en enfermedad arterial periférica", "Prevención secundaria de ACV (en algunos países)", "Mejora de la distancia de marcha en EAP"],
    contraindicaciones: ["Insuficiencia cardíaca de cualquier grado (aumenta mortalidad)", "Sangrado activo patológico", "Diátesis hemorrágica", "Embarazo"],
    efectosAdversos: ["Cefalea (34%, dosis-dependiente)", "Diarrea", "Deposiciones anormales", "Palpitaciones", "Taquicardia", "Mareos", "⚠️ CONTRAINDICADO en IC: otros inhibidores PDE3 (milrinona) aumentaron mortalidad en IC crónica", "⚠️ Cefalea muy frecuente: disminuye con uso continuado"],
    interacciones: ["Inhibidores CYP3A4 (ketoconazol, eritromicina): aumentan niveles", "Inhibidores CYP2C19 (omeprazol): aumentan niveles del metabolito activo", "Anticoagulantes/antiagregantes: riesgo de sangrado aditivo", "Zumo de pomelo: aumenta niveles"],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "100 mg BID, 30 min antes o 2h después de alimentos. Evaluar respuesta a 2-4 semanas. Con inhibidores CYP3A4: reducir a 50 mg BID",
      ajusteRenal: "No requiere ajuste",
      ajusteHepatico: "No datos en IH grave. Precaución"
    },
    presentaciones: ["Comprimidos 50 mg, 100 mg"],
    embarazo: "C",
    lactancia: "Se excreta en leche en animales. No recomendado.",
    cuidadosEnfermeria: ["Administrar 30 min antes de desayuno y cena (con el estómago vacío)", "CONTRAINDICADO en ICC: verificar ausencia de IC antes de prescribir", "Advertir sobre cefalea frecuente: suele mejorar con continuidad", "Evaluar distancia de marcha como indicador de eficacia", "Suspender 5 días antes de cirugía", "Vigilar signos de sangrado si usa anticoagulantes concomitantes"],
    farmacocinetica: {
      absorcion: "Oral: 95% en ayunas, reducida 20% con alimentos grasos",
      distribucion: "Unión a proteínas 95-98% (albumina)",
      metabolismo: "Hepático por CYP3A4 y CYP2C19. Metabolitos activos",
      excrecion: "Renal 74%, fecal 20%",
      vidaMedia: "11-13 horas",
      inicioAccion: "2-4 semanas (efecto clínico)",
      picoAccion: "2-4 horas (plasmático)",
      duracionAccion: "12 horas (dosificación)"
    },
    almacenamiento: "Conservar a temperatura ambiente (15-30°C).",
    unidadId: "u02",
    capituloId: "c02_06"
  },
  {
    id: "vorapaxar",
    nombre: "Vorapaxar",
    nombreGenerico: "Sulfato de vorapaxar",
    nombresComerciales: ["Zontivity"],
    familia: "Antagonistas PAR-1",
    clasificacion: "Antagonista del receptor activado por proteasa-1 (PAR-1)",
    mecanismoAccion: "Antagonista selectivo y reversible del receptor PAR-1 (receptor de trombina) en plaquetas. Inhibe la activación plaquetaria mediada por trombina sin afectar la cascada de coagulación. Se usa en combinación con aspirina y/o clopidogrel.",
    indicaciones: ["Reducción de eventos trombóticos CV en pacientes con antecedente de IAM o enfermedad arterial periférica", "Prevención secundaria en combinación con terapia antiagregante estándar"],
    contraindicaciones: ["ACV o AIT previo (aumenta hemorragia intracraneal)", "Hemorragia activa patológica", "Insuficiencia hepática grave", "Uso concomitante con inhibidores potentes de CYP3A4"],
    efectosAdversos: ["Sangrado (principal riesgo)", "Anemia", "Equimosis", "Depresión", "Erupción cutánea", "⚠️ ABSOLUTAMENTE CONTRAINDICADO si antecedente de ACV/AIT: riesgo hemorragia intracraneal", "⚠️ Efecto antiagregante persiste semanas tras suspender por vida media prolongada"],
    interacciones: ["Aspirina/clopidogrel: sangrado aditivo (pero es la combinación indicada)", "Anticoagulantes: riesgo hemorrágico aumentado", "Inhibidores potentes CYP3A4: contraindicados", "Inductores CYP3A4 (rifampicina): reducen eficacia"],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "2.08 mg (equivale a 2.5 mg de sulfato) una vez al día, con o sin alimentos. En combinación con aspirina y/o clopidogrel",
      ajusteRenal: "No requiere ajuste",
      ajusteHepatico: "Contraindicado en IH grave. No requiere ajuste en leve-moderada"
    },
    presentaciones: ["Comprimidos 2.08 mg"],
    embarazo: "B",
    lactancia: "Se desconoce excreción. No recomendado.",
    cuidadosEnfermeria: ["VERIFICAR ausencia de antecedente de ACV/AIT antes de administrar", "Monitorizar signos de sangrado: equimosis, melena, hematuria", "Educar al paciente: informar a cualquier médico/dentista sobre este fármaco", "Efecto persiste 4+ semanas tras suspender: planificar cirugías con anticipación", "No hay antídoto específico: transfusión plaquetaria si sangrado grave", "Administrar con aspirina ± clopidogrel según indicación"],
    farmacocinetica: {
      absorcion: "Oral: >95%, biodisponibilidad ~100%",
      distribucion: "Unión a proteínas >99%",
      metabolismo: "Hepático por CYP3A4 y CYP2J2",
      excrecion: "Fecal 58%, renal 25%",
      vidaMedia: "Efectiva: 3-4 días. Terminal: 8 días (hasta 13 días)",
      inicioAccion: "1 semana (inhibición plaquetaria >80%)",
      picoAccion: "1-2 horas (plasmático)",
      duracionAccion: "Semanas (por vida media prolongada y unión irreversible)"
    },
    almacenamiento: "Conservar a temperatura ambiente (20-25°C).",
    unidadId: "u02",
    capituloId: "c02_06"
  },

  // ===== c02_07 Inotrópicos =====
  {
    id: "isoprenalina",
    nombre: "Isoprenalina (Isoproterenol)",
    nombreGenerico: "Clorhidrato de isoprenalina",
    nombresComerciales: ["Isuprel", "Aleudrina"],
    familia: "Agonistas beta-adrenérgicos",
    clasificacion: "Agonista beta-1 y beta-2 adrenérgico no selectivo",
    mecanismoAccion: "Agonista potente no selectivo de receptores beta-1 (cronotropismo e inotropismo positivo) y beta-2 (vasodilatación y broncodilatación). Aumenta FC, contractilidad y gasto cardíaco. Reduce resistencia vascular periférica.",
    indicaciones: ["Bradicardia sintomática refractaria a atropina (puente a marcapasos)", "Bloqueo AV completo", "Torsade de pointes", "Shock cardiogénico (temporal)", "Broncoespasmo severo (uso histórico, reemplazado)"],
    contraindicaciones: ["Taquiarritmias", "Intoxicación digitálica", "Angina de pecho", "Feocromocitoma", "Uso con halotano u otros anestésicos halogenados"],
    efectosAdversos: ["Taquicardia", "Palpitaciones", "Arritmias ventriculares", "Temblor", "Cefalea", "Rubor facial", "Hipotensión (por vasodilatación beta-2)", "Angina", "⚠️ TAQUICARDIA SEVERA: nunca usar sin monitorización ECG continua", "⚠️ Aumento consumo miocárdico de O2: peligroso en isquemia"],
    interacciones: ["Halotano/anestésicos halogenados: arritmias ventriculares graves", "Betabloqueantes: antagonismo directo", "Digoxina: arritmias aditivas", "IMAO: potenciación de efectos simpáticos"],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "Infusión IV: 2-10 mcg/min (0.5-5 mcg/min en bradicardia). Titular según FC y PA. Bolo: 20-60 mcg IV si emergencia",
      pediatrico: "0.05-2 mcg/kg/min en infusión continua"
    },
    presentaciones: ["Ampollas 0.2 mg/mL (1 mL)", "Ampollas 1 mg/5 mL"],
    embarazo: "C",
    lactancia: "Se desconoce excreción. Uso solo en emergencia.",
    cuidadosEnfermeria: ["Monitorización ECG y PA CONTINUA obligatoria", "Administrar por bomba de infusión en vía central preferentemente", "Titular hasta FC objetivo (60-80 lpm), no exceder", "Vigilar arritmias ventriculares: suspender si aparecen", "Uso temporal como puente a marcapasos, no tratamiento definitivo", "Diluir en SG5% o SF. Proteger de la luz"],
    farmacocinetica: {
      absorcion: "No aplica (uso IV exclusivo en la práctica actual)",
      distribucion: "Rápida distribución tisular",
      metabolismo: "Hepático y pulmonar por COMT y MAO",
      excrecion: "Renal (metabolitos)",
      vidaMedia: "2-5 minutos",
      inicioAccion: "Inmediato (IV)",
      picoAccion: "Inmediato",
      duracionAccion: "Minutos tras suspender infusión"
    },
    almacenamiento: "Proteger de la luz. Refrigerar 2-8°C. Soluciones diluidas: usar dentro de 24h.",
    unidadId: "u02",
    capituloId: "c02_07"
  },
  {
    id: "midodrina",
    nombre: "Midodrina",
    nombreGenerico: "Clorhidrato de midodrina",
    nombresComerciales: ["Gutron", "ProAmatine", "Bramox"],
    familia: "Agonistas alfa-1 adrenérgicos",
    clasificacion: "Agonista selectivo alfa-1 adrenérgico oral",
    mecanismoAccion: "Profármaco que se convierte en desglimidodrina, agonista selectivo de receptores alfa-1 adrenérgicos. Produce vasoconstricción arteriolar y venosa, aumentando la resistencia vascular periférica y elevando la presión arterial.",
    indicaciones: ["Hipotensión ortostática sintomática", "Hipotensión asociada a hemodiálisis", "Síncope vasovagal recurrente", "Disfunción autonómica"],
    contraindicaciones: ["Hipertensión arterial no controlada", "Enfermedad cardíaca orgánica grave", "Retención urinaria", "Feocromocitoma", "Tirotoxicosis", "Glaucoma de ángulo cerrado"],
    efectosAdversos: ["Hipertensión supina (principal riesgo)", "Piloerección (piel de gallina)", "Parestesias del cuero cabelludo", "Retención urinaria", "Bradicardia refleja", "⚠️ HIPERTENSIÓN SUPINA: no administrar <4h antes de acostarse", "⚠️ Última dosis NO después de las 18:00h"],
    interacciones: ["Betabloqueantes: bradicardia potenciada", "Digoxina: bradicardia aditiva", "Alfa-bloqueantes (prazosina): antagonismo", "Vasoconstrictores: hipertensión aditiva", "IMAO: potenciación presora"],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "2.5-10 mg TID (al despertar, mediodía y media tarde). Máx: 30 mg/día. NO dar antes de acostarse",
      ajusteRenal: "Inicio 2.5 mg. Ajustar según respuesta. Precaución en IR",
      ajusteHepatico: "Precaución en insuficiencia hepática"
    },
    presentaciones: ["Comprimidos 2.5 mg, 5 mg, 10 mg", "Gotas orales 2.5 mg/mL"],
    embarazo: "C",
    lactancia: "Se desconoce excreción. No recomendado.",
    cuidadosEnfermeria: ["Administrar al despertar, mediodía y media tarde (NUNCA antes de dormir)", "Monitorizar PA en supino y bipedestación", "Vigilar hipertensión supina: medir PA acostado", "Elevar cabecera de cama 15-20° para minimizar HTA supina", "Controlar diuresis: riesgo retención urinaria", "Última dosis al menos 4h antes de acostarse"],
    farmacocinetica: {
      absorcion: "Oral: rápida, biodisponibilidad 93%",
      distribucion: "Unión a proteínas baja (desglimidodrina)",
      metabolismo: "Hidrólisis enzimática a desglimidodrina (metabolito activo)",
      excrecion: "Renal (80% como metabolitos)",
      vidaMedia: "3-4 horas (desglimidodrina)",
      inicioAccion: "30-60 minutos",
      picoAccion: "1-2 horas",
      duracionAccion: "4-6 horas"
    },
    almacenamiento: "Conservar a temperatura ambiente (15-30°C).",
    unidadId: "u02",
    capituloId: "c02_07"
  },

  // ===== c04_01 Broncodilatadores =====
  {
    id: "indacaterol",
    nombre: "Indacaterol",
    nombreGenerico: "Maleato de indacaterol",
    nombresComerciales: ["Onbrez Breezhaler", "Arcapta Neohaler"],
    familia: "Beta-2 agonistas de acción prolongada (LABA)",
    clasificacion: "Agonista beta-2 adrenérgico de acción ultra-prolongada inhalado",
    mecanismoAccion: "Agonista selectivo beta-2 adrenérgico de acción ultra-prolongada. Se une al receptor beta-2 en músculo liso bronquial, activando la adenilato ciclasa y aumentando AMPc, produciendo broncodilatación sostenida durante 24h con dosis única diaria.",
    indicaciones: ["EPOC (tratamiento de mantenimiento)", "Broncodilatación sostenida en EPOC estable"],
    contraindicaciones: ["Asma (como monoterapia sin corticoide inhalado)", "Hipersensibilidad a indacaterol", "Taquiarritmias no controladas"],
    efectosAdversos: ["Nasofaringitis", "Tos post-inhalación", "Infección respiratoria alta", "Cefalea", "Temblor", "Taquicardia", "Hipopotasemia", "⚠️ NO usar como rescate: es mantenimiento de 24h", "⚠️ La tos post-inhalación es transitoria y no indica reacción adversa"],
    interacciones: ["Betabloqueantes: antagonismo (evitar no cardioselectivos)", "Diuréticos no ahorradores de K+: hipopotasemia aditiva", "Inhibidores MAO/tricíclicos: prolongan efecto cardiovascular", "Corticosteroides: hipopotasemia aditiva"],
    viaAdministracion: ["inhalada"],
    dosis: {
      adulto: "150 mcg inhalado una vez al día (Breezhaler). Máx: 300 mcg/día en algunos mercados",
      ajusteRenal: "No requiere ajuste",
      ajusteHepatico: "No requiere ajuste en IH leve-moderada"
    },
    presentaciones: ["Cápsulas para inhalación 150 mcg, 300 mcg (Breezhaler/Neohaler)"],
    embarazo: "C",
    lactancia: "Se desconoce excreción. Evaluar riesgo/beneficio.",
    cuidadosEnfermeria: ["Instruir uso correcto del dispositivo Breezhaler: insertar cápsula, perforar, inhalar profundamente", "NO tragar las cápsulas: solo para inhalación", "Verificar que la cápsula quede vacía tras inhalación (repetir si necesario)", "Administrar a la misma hora cada día", "No usar como rescate: tener salbutamol disponible", "Enjuagar boca tras inhalación (aunque no es corticoide)"],
    farmacocinetica: {
      absorcion: "Inhalada: alcanza niveles sistémicos en 15 min",
      distribucion: "Volumen distribución 2557 L. Unión a proteínas 95%",
      metabolismo: "Hepático por CYP3A4 y UGT1A1. Hidrólisis",
      excrecion: "Fecal 54%, renal 24%",
      vidaMedia: "40-56 horas",
      inicioAccion: "5 minutos",
      picoAccion: "15 minutos",
      duracionAccion: "24 horas (dosis única diaria)"
    },
    almacenamiento: "Conservar a temperatura ambiente. No extraer cápsulas del blíster hasta momento de uso. Proteger de la humedad.",
    unidadId: "u04",
    capituloId: "c04_01"
  },
  {
    id: "glicopirronio",
    nombre: "Glicopirronio",
    nombreGenerico: "Bromuro de glicopirronio",
    nombresComerciales: ["Seebri Breezhaler", "Tuvada"],
    familia: "Anticolinérgicos de acción prolongada (LAMA)",
    clasificacion: "Antagonista muscarínico de acción prolongada inhalado",
    mecanismoAccion: "Antagonista competitivo de los receptores muscarínicos M3 en músculo liso bronquial. Bloquea la acción broncoconstrictora de la acetilcolina, produciendo broncodilatación sostenida. Mayor selectividad por M3 que por M2.",
    indicaciones: ["EPOC (tratamiento de mantenimiento)", "Broncodilatación de mantenimiento en pacientes con EPOC estable"],
    contraindicaciones: ["Hipersensibilidad a glicopirronio", "Precaución en glaucoma de ángulo cerrado", "Retención urinaria por hiperplasia prostática"],
    efectosAdversos: ["Sequedad bucal", "Nasofaringitis", "Insomnio", "Infección urinaria", "Gastroenteritis", "Retención urinaria (raro)", "⚠️ Inicio de acción más rápido que tiotropio: efecto a los 5 min"],
    interacciones: ["Otros anticolinérgicos: efectos aditivos (evitar)", "Ipratropio: no usar simultáneamente", "Sin interacciones CYP significativas"],
    viaAdministracion: ["inhalada"],
    dosis: {
      adulto: "50 mcg inhalado una vez al día (Breezhaler). Mejor por la mañana",
      ajusteRenal: "No requiere ajuste en IR leve-moderada. ClCr <30: usar con precaución",
      ajusteHepatico: "No requiere ajuste"
    },
    presentaciones: ["Cápsulas para inhalación 50 mcg (Breezhaler)"],
    embarazo: "C",
    lactancia: "Se desconoce excreción en humanos. No recomendado.",
    cuidadosEnfermeria: ["Instruir uso correcto del Breezhaler: insertar cápsula, perforar, inhalar", "NO tragar cápsulas: solo para inhalación", "Administrar por la mañana a la misma hora", "Vigilar retención urinaria en varones con HPB", "No usar como medicación de rescate", "Monitorizar sequedad bucal: ofrecer hidratación frecuente"],
    farmacocinetica: {
      absorcion: "Inhalada: biodisponibilidad pulmonar ~40%. Deglutido: 5%",
      distribucion: "Volumen distribución 83 L. Unión a proteínas 38-41%",
      metabolismo: "Hidrólisis y conjugación. No CYP dependiente",
      excrecion: "Renal 60-70% (inalterado), fecal 23%",
      vidaMedia: "33-57 horas",
      inicioAccion: "5 minutos (más rápido que tiotropio)",
      picoAccion: "2 horas",
      duracionAccion: "24 horas"
    },
    almacenamiento: "Conservar a temperatura ambiente (≤25°C). No extraer cápsulas del blíster hasta uso. Proteger de la humedad.",
    unidadId: "u04",
    capituloId: "c04_01"
  },
  {
    id: "umeclidinio_vilanterol",
    nombre: "Umeclidinio/Vilanterol",
    nombreGenerico: "Umeclidinio/vilanterol",
    nombresComerciales: ["Anoro Ellipta", "Laventair"],
    familia: "LAMA/LABA combinación",
    clasificacion: "Anticolinérgico de acción prolongada + agonista beta-2 de acción prolongada inhalado",
    mecanismoAccion: "Combinación de umeclidinio (antagonista M3 de acción prolongada) y vilanterol (agonista beta-2 de acción ultra-prolongada). Doble broncodilatación por mecanismos complementarios: anticolinérgico y adrenérgico, con mayor eficacia que monoterapia.",
    indicaciones: ["EPOC (tratamiento de mantenimiento)", "Pacientes con EPOC que requieren doble broncodilatación", "EPOC con síntomas persistentes pese a monoterapia LAMA o LABA"],
    contraindicaciones: ["Asma (como monoterapia)", "Hipersensibilidad a umeclidinio, vilanterol o lactosa", "Alergia a proteínas de leche"],
    efectosAdversos: ["Nasofaringitis", "Infección respiratoria alta", "Cefalea", "Tos", "Dolor orofaríngeo", "Sequedad bucal", "Estreñimiento", "Taquicardia", "Retención urinaria", "⚠️ Dispositivo Ellipta: una sola inhalación diaria, muy simple de usar"],
    interacciones: ["Betabloqueantes no selectivos: antagonismo beta-2", "Otros anticolinérgicos: efectos aditivos adversos", "Inhibidores CYP3A4/P-gp: pueden aumentar exposición sistémica a vilanterol", "Diuréticos: hipopotasemia aditiva"],
    viaAdministracion: ["inhalada"],
    dosis: {
      adulto: "62.5/25 mcg (umeclidinio/vilanterol) una inhalación diaria. Dosis fija",
      ajusteRenal: "No requiere ajuste",
      ajusteHepatico: "No requiere ajuste en IH leve-moderada. Precaución en grave"
    },
    presentaciones: ["Polvo para inhalación Ellipta 62.5 mcg/25 mcg (30 dosis)"],
    embarazo: "C",
    lactancia: "Se desconoce excreción. Evaluar riesgo/beneficio.",
    cuidadosEnfermeria: ["Instruir uso del Ellipta: abrir tapa, inhalar, cerrar. Una sola inhalación", "Dispositivo con contador de dosis: verificar dosis restantes", "Administrar a la misma hora cada día", "NO usar como rescate para crisis aguda", "Vigilar retención urinaria en pacientes con HPB", "Monitorizar FC en pacientes con arritmias o cardiopatía"],
    farmacocinetica: {
      absorcion: "Inhalada: umeclidinio Cmax 5-15 min, vilanterol 10 min",
      distribucion: "Umeclidinio: VD 86L, UP 89%. Vilanterol: VD 165L, UP 94%",
      metabolismo: "Umeclidinio: CYP2D6. Vilanterol: CYP3A4 y via O-desalquilación",
      excrecion: "Umeclidinio: fecal 92%. Vilanterol: renal 70%, fecal 30%",
      vidaMedia: "Umeclidinio: 11h. Vilanterol: 11h",
      inicioAccion: "5-15 minutos",
      picoAccion: "15 min - 3 horas",
      duracionAccion: "24 horas"
    },
    almacenamiento: "Conservar a temperatura ambiente (≤30°C). No refrigerar. Usar dentro de 6 semanas de abrir la bandeja.",
    unidadId: "u04",
    capituloId: "c04_01"
  },

  // ===== c04_02 Antiinflamatorios Inhalados =====
  {
    id: "ciclesonida",
    nombre: "Ciclesonida",
    nombreGenerico: "Ciclesonida",
    nombresComerciales: ["Alvesco", "Omnaris"],
    familia: "Corticosteroides inhalados",
    clasificacion: "Corticoide inhalado (profármaco activado en pulmón)",
    mecanismoAccion: "Profármaco inactivo que se activa por esterasas en el epitelio bronquial a desisobutiril-ciclesonida (des-CIC), metabolito activo con alta afinidad por el receptor glucocorticoide. Alta lipofilia permite conjugación con ácidos grasos y liberación lenta en pulmón.",
    indicaciones: ["Asma persistente (mantenimiento)", "Rinitis alérgica (formulación nasal)"],
    contraindicaciones: ["Hipersensibilidad a ciclesonida", "Estado asmático agudo o broncoespasmo agudo", "Tuberculosis pulmonar activa", "Infecciones fúngicas sistémicas"],
    efectosAdversos: ["Nasofaringitis", "Cefalea", "Disfonía (menos que otros CI)", "Candidiasis orofaríngea (menor incidencia que otros CI)", "Broncoespasmo paradójico (raro)", "⚠️ VENTAJA: menor candidiasis oral y disfonía que budesonida/fluticasona por activación pulmonar (no orofaríngea)", "⚠️ No requiere enjuague bucal obligatorio (pero se recomienda)"],
    interacciones: ["Ketoconazol, itraconazol: aumentan niveles de des-CIC", "Ritonavir: aumenta exposición sistémica", "Sin interacciones clínicamente relevantes con broncodilatadores"],
    viaAdministracion: ["inhalada", "intranasal"],
    dosis: {
      adulto: "Asma leve: 80 mcg/día. Moderada: 160-320 mcg/día. Grave: 320-640 mcg/día. Dosis única o dividida",
      pediatrico: "≥12 años: 80-160 mcg/día. 6-11 años: 80 mcg/día (algunos mercados)",
      ajusteRenal: "No requiere ajuste",
      ajusteHepatico: "No requiere ajuste en IH leve-moderada"
    },
    presentaciones: ["Aerosol presurizado 80 mcg/dosis, 160 mcg/dosis", "Spray nasal 50 mcg/dosis (rinitis)"],
    embarazo: "C",
    lactancia: "Se desconoce excreción. Usar con precaución.",
    cuidadosEnfermeria: ["Instruir técnica correcta de inhalación con MDI", "Menos necesidad de enjuague bucal (profármaco inactivo en boca)", "No usar como rescate en crisis asmática", "Monitorizar crecimiento en niños en uso prolongado", "Agitar inhalador antes de cada uso", "Ventaja educativa: menor riesgo de candidiasis oral vs otros CI"],
    farmacocinetica: {
      absorcion: "Inhalada: depósito pulmonar 52%. Ciclesonida inactiva en orofaringe",
      distribucion: "Des-CIC: unión a proteínas 99%. Volumen distribución 12 L/kg",
      metabolismo: "Activación pulmonar por esterasas → des-CIC. Posterior metabolismo hepático CYP3A4",
      excrecion: "Fecal 67%, renal 20%",
      vidaMedia: "Des-CIC: 6-7 horas (efectiva 25h por conjugación lipídica)",
      inicioAccion: "24-48 horas (efecto clínico)",
      picoAccion: "1-2 semanas (efecto antiinflamatorio máximo)",
      duracionAccion: "24 horas"
    },
    almacenamiento: "Conservar a temperatura ambiente (15-30°C). No perforar ni exponer a temperaturas >50°C.",
    unidadId: "u04",
    capituloId: "c04_02"
  },
  {
    id: "mometasona_inhalada",
    nombre: "Mometasona Inhalada",
    nombreGenerico: "Furoato de mometasona inhalado",
    nombresComerciales: ["Asmanex Twisthaler", "Asmanex HFA"],
    familia: "Corticosteroides inhalados",
    clasificacion: "Corticoide inhalado de alta potencia",
    mecanismoAccion: "Corticoide sintético con alta afinidad por el receptor glucocorticoide pulmonar. Suprime la inflamación bronquial reduciendo citoquinas, infiltrado eosinofílico y mediadores inflamatorios. Alta relación potencia tópica/efectos sistémicos.",
    indicaciones: ["Asma persistente (mantenimiento y profilaxis)", "Reducción de corticoides orales en asma corticodependiente"],
    contraindicaciones: ["Estado asmático agudo", "Hipersensibilidad a mometasona", "Tuberculosis pulmonar activa", "Infecciones respiratorias no tratadas"],
    efectosAdversos: ["Candidiasis orofaríngea", "Disfonía", "Cefalea", "Sinusitis", "Faringitis", "Artralgia", "Supresión adrenal (dosis altas prolongadas)", "⚠️ Dispositivo Twisthaler: activado por giro de tapa (sin coordinación mano-inhalación)", "⚠️ Enjuagar boca después de cada inhalación"],
    interacciones: ["Ketoconazol, ritonavir: aumentan exposición sistémica a mometasona", "Sin interacciones significativas con broncodilatadores inhalados"],
    viaAdministracion: ["inhalada"],
    dosis: {
      adulto: "Asma leve: 200 mcg/día (1 inh PM). Moderada: 400 mcg/día (2 inh o 400 mcg). Grave: 800 mcg/día dividido",
      pediatrico: "4-11 años: 110 mcg/día (1 inh PM). ≥12 años: dosis de adulto",
      ajusteRenal: "No requiere ajuste",
      ajusteHepatico: "No requiere ajuste"
    },
    presentaciones: ["Polvo para inhalación Twisthaler 110 mcg, 220 mcg (30 y 60 dosis)", "Aerosol HFA 100 mcg, 200 mcg"],
    embarazo: "C",
    lactancia: "Se desconoce excreción. Usar solo si beneficio supera riesgo.",
    cuidadosEnfermeria: ["Instruir uso del Twisthaler: girar tapa para cargar dosis, inhalar profundamente", "Enjuagar boca y garganta tras cada inhalación (prevenir candidiasis)", "Administrar preferentemente por la noche (dosis única)", "No usar como rescate en crisis aguda", "Monitorizar crecimiento en niños", "Verificar contador de dosis del dispositivo"],
    farmacocinetica: {
      absorcion: "Inhalada: biodisponibilidad sistémica <1% (mínima absorción oral del fármaco deglutido)",
      distribucion: "Unión a proteínas 98-99%",
      metabolismo: "Hepático por CYP3A4",
      excrecion: "Fecal 74%, renal 8%",
      vidaMedia: "5 horas",
      inicioAccion: "24-48 horas (inicio de mejoría)",
      picoAccion: "1-2 semanas (efecto máximo)",
      duracionAccion: "24 horas (dosificación)"
    },
    almacenamiento: "Conservar a temperatura ambiente (15-30°C). Mantener Twisthaler con tapa cerrada cuando no se usa.",
    unidadId: "u04",
    capituloId: "c04_02"
  },

  // ===== c04_04 Antihistamínicos =====
  {
    id: "bilastina",
    nombre: "Bilastina",
    nombreGenerico: "Bilastina",
    nombresComerciales: ["Bilaxten", "Ibis", "Bilaz"],
    familia: "Antihistamínicos de segunda generación",
    clasificacion: "Antagonista selectivo del receptor H1 de segunda generación",
    mecanismoAccion: "Antagonista altamente selectivo y potente del receptor H1 periférico. No cruza barrera hematoencefálica significativamente (no sedante). Sin afinidad por receptores muscarínicos, adrenérgicos ni serotoninérgicos.",
    indicaciones: ["Rinitis alérgica estacional y perenne", "Urticaria crónica espontánea", "Conjuntivitis alérgica"],
    contraindicaciones: ["Hipersensibilidad a bilastina", "Insuficiencia renal grave con uso concomitante de inhibidores P-gp"],
    efectosAdversos: ["Cefalea", "Somnolencia (similar a placebo)", "Mareos (raro)", "Fatiga", "Dolor abdominal", "⚠️ NO sedante: no afecta la capacidad de conducir (comprobado)", "⚠️ No interacciona con alcohol (a diferencia de antiH1 de 1ra gen)"],
    interacciones: ["Ketoconazol, eritromicina: aumentan niveles de bilastina (P-gp)", "Zumo de pomelo/naranja: reducen absorción 30%", "Alimentos: reducen biodisponibilidad (tomar en ayunas)", "Alcohol: sin potenciación (ventaja)"],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "20 mg una vez al día en ayunas (1h antes o 2h después de alimentos/zumos)",
      pediatrico: "6-11 años: 10 mg/día. ≥12 años: 20 mg/día",
      ajusteRenal: "No requiere ajuste en leve-moderada. Precaución en grave con inhibidores P-gp",
      ajusteHepatico: "No requiere ajuste"
    },
    presentaciones: ["Comprimidos 20 mg", "Comprimidos bucodispersables 10 mg (pediátrico)", "Solución oral 2.5 mg/mL"],
    embarazo: "B",
    lactancia: "Se desconoce excreción. Evaluar riesgo/beneficio.",
    cuidadosEnfermeria: ["Administrar en AYUNAS: 1h antes o 2h después de comer", "No tomar con zumo de pomelo ni naranja (reducen absorción)", "Ventaja: no produce somnolencia, no afecta conducción", "No interacciona con alcohol: puede informar al paciente", "Dosis única diaria: buena adherencia", "Monitorizar respuesta clínica a los 3-5 días"],
    farmacocinetica: {
      absorcion: "Oral: rápida, reducida por alimentos y zumos (tomar en ayunas)",
      distribucion: "Unión a proteínas 84-90%. No cruza BHE significativamente",
      metabolismo: "Mínimo (<5%). No metabolismo CYP significativo",
      excrecion: "Fecal 67% (inalterada), renal 29% (inalterada)",
      vidaMedia: "14.5 horas",
      inicioAccion: "1 hora",
      picoAccion: "1.3 horas",
      duracionAccion: "24 horas"
    },
    almacenamiento: "Conservar a temperatura ambiente (≤30°C). No requiere condiciones especiales.",
    unidadId: "u04",
    capituloId: "c04_04"
  },
  {
    id: "rupatadina",
    nombre: "Rupatadina",
    nombreGenerico: "Fumarato de rupatadina",
    nombresComerciales: ["Rupafin", "Alerfix", "Rinialer"],
    familia: "Antihistamínicos de segunda generación",
    clasificacion: "Antagonista del receptor H1 y antagonista PAF",
    mecanismoAccion: "Antagonista dual: bloquea el receptor histamínico H1 periférico y también antagoniza el factor activador de plaquetas (PAF). Esta doble acción le confiere propiedades antiinflamatorias adicionales sobre la respuesta alérgica temprana y tardía.",
    indicaciones: ["Rinitis alérgica estacional y perenne", "Urticaria crónica espontánea", "Conjuntivitis alérgica"],
    contraindicaciones: ["Hipersensibilidad a rupatadina", "Insuficiencia hepática o renal grave", "Uso con inhibidores potentes de CYP3A4 (ketoconazol, eritromicina a dosis altas)"],
    efectosAdversos: ["Somnolencia leve (9%)", "Cefalea", "Fatiga", "Astenia", "Sequedad bucal", "⚠️ Leve somnolencia posible: mayor que bilastina pero menor que difenhidramina", "⚠️ Acción dual antiH1 + anti-PAF: ventaja antiinflamatoria"],
    interacciones: ["Ketoconazol, eritromicina: aumentan niveles (CYP3A4)", "Zumo de pomelo: aumenta biodisponibilidad", "Alcohol: puede potenciar somnolencia levemente", "Depresores del SNC: precaución"],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "10 mg una vez al día, con o sin alimentos",
      pediatrico: "2-11 años y >25 kg: 5 mg/día (solución oral). ≥12 años: 10 mg/día",
      ajusteRenal: "No recomendado en IR grave",
      ajusteHepatico: "No recomendado en IH grave"
    },
    presentaciones: ["Comprimidos 10 mg", "Solución oral 1 mg/mL"],
    embarazo: "B",
    lactancia: "Se desconoce excreción. No recomendado.",
    cuidadosEnfermeria: ["Puede tomarse con o sin alimentos", "Advertir sobre posible somnolencia leve al inicio", "Precaución al conducir durante los primeros días", "No combinar con zumo de pomelo en exceso", "Ventaja sobre otros antiH1: acción anti-PAF adicional", "Monitorizar respuesta a los 3-5 días de tratamiento"],
    farmacocinetica: {
      absorcion: "Oral: rápida, no afectada significativamente por alimentos",
      distribucion: "Unión a proteínas 98-99%",
      metabolismo: "Hepático extenso por CYP3A4. Metabolito activo: desloratadina",
      excrecion: "Fecal 60%, renal 35%",
      vidaMedia: "5.9 horas (metabolitos activos mayor)",
      inicioAccion: "1-2 horas",
      picoAccion: "0.75-1 hora",
      duracionAccion: "24 horas"
    },
    almacenamiento: "Conservar a temperatura ambiente (≤30°C). Proteger de la luz.",
    unidadId: "u04",
    capituloId: "c04_04"
  }
];

// Add searchText to each drug
newDrugs.forEach(d => { d.searchText = mkSearch(d); });

// Check for duplicates
const existingIds = new Set(drugs.map(d => d.id));
const dupes = newDrugs.filter(d => existingIds.has(d.id));
if (dupes.length > 0) {
  console.error('ERROR: Duplicate IDs found:', dupes.map(d => d.id));
  process.exit(1);
}

// Add to drugs array
drugs.push(...newDrugs);

// Add drug IDs to categories
const chapterMap = {};
newDrugs.forEach(d => {
  if (!chapterMap[d.capituloId]) chapterMap[d.capituloId] = [];
  chapterMap[d.capituloId].push(d.id);
});

for (const unidad of cats.unidades) {
  for (const cap of unidad.capitulos) {
    if (chapterMap[cap.id]) {
      cap.drugIds.push(...chapterMap[cap.id]);
      console.log(`  Added ${chapterMap[cap.id].length} drugs to ${cap.id} (${cap.nombre})`);
    }
  }
}

// Write files
fs.writeFileSync(DRUGS_PATH, JSON.stringify(drugs, null, 2), 'utf8');
fs.writeFileSync(CATS_PATH, JSON.stringify(cats, null, 2), 'utf8');

console.log('\nDrug count AFTER:', drugs.length);
console.log('Added:', drugs.length - beforeCount, 'new drugs');
console.log('Done!');
