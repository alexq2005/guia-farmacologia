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
  // ===== ANALGÉSICOS / SNC =====
  {
    id: 'tapentadol', nombre: 'Tapentadol', nombreGenerico: 'Tapentadol',
    nombresComerciales: ['Nucynta', 'Palexia', 'Yantil'],
    familia: 'Analgésicos opioides', clasificacion: 'Agonista mu + inhibidor de recaptación de noradrenalina (MOR-NRI)',
    mecanismoAccion: 'Mecanismo dual: agonismo opioide mu y inhibición de recaptación de noradrenalina. Menor efecto sobre serotonina que tramadol, lo que reduce riesgo de síndrome serotoninérgico.',
    indicaciones: ['Dolor moderado a severo', 'Dolor neuropático diabético', 'Dolor crónico (forma LP)', 'Dolor oncológico'],
    contraindicaciones: ['Depresión respiratoria', 'Íleo paralítico', 'Uso de IMAO en últimos 14 días', 'Insuficiencia hepática grave'],
    efectosAdversos: ['Náuseas', 'Mareo', 'Somnolencia', 'Estreñimiento (menor que morfina)', 'Cefalea', '⚠️ Depresión respiratoria', '⚠️ Dependencia y tolerancia'],
    interacciones: ['IMAO: contraindicado', 'Benzodiacepinas: depresión respiratoria', 'ISRS/IRSN: riesgo de síndrome serotoninérgico (menor que tramadol)', 'Alcohol: depresión SNC'],
    viaAdministracion: ['oral'], dosis: { adulto: 'IR: 50-100 mg cada 4-6h. Máx: 600 mg/día. LP: 50 mg cada 12h, titular hasta 250 mg/12h', ajusteHepatico: 'Moderada: 50 mg cada 8h. Grave: contraindicado' },
    presentaciones: ['Comprimidos 50, 75, 100 mg', 'Comprimidos LP 50, 100, 150, 200, 250 mg'],
    embarazo: 'C', lactancia: 'Se excreta. No recomendado.',
    cuidadosEnfermeria: ['Menor estreñimiento que otros opioides (ventaja)', 'Monitorizar FR antes de cada dosis', 'No triturar forma LP', 'Menos interacciones serotoninérgicas que tramadol', 'Tener naloxona disponible', 'No combinar con IMAO'],
    farmacocinetica: { absorcion: 'Oral, biodisponibilidad 32%', metabolismo: 'Hepático glucuronidación (no CYP significativo)', excrecion: 'Renal 99%', vidaMedia: '4 horas (IR), 5-6h (LP)', inicioAccion: '30 min', picoAccion: '1.25h', duracionAccion: '4-6h (IR), 12h (LP)' },
    almacenamiento: 'Temperatura ambiente. Estupefaciente: control especial.', unidadId: 'u01', capituloId: 'c01_02'
  },
  {
    id: 'nalbufina', nombre: 'Nalbufina', nombreGenerico: 'Nalbufina clorhidrato',
    nombresComerciales: ['Nubain', 'Nalbuphine'],
    familia: 'Analgésicos opioides', clasificacion: 'Agonista kappa / antagonista mu (opioide mixto)',
    mecanismoAccion: 'Agonista de receptores kappa (analgesia) y antagonista de receptores mu. Tiene efecto techo para depresión respiratoria, lo que la hace más segura que los agonistas puros.',
    indicaciones: ['Dolor moderado a severo', 'Analgesia obstétrica (trabajo de parto)', 'Dolor postoperatorio', 'Coadyuvante de anestesia', 'Prurito inducido por opioides mu'],
    contraindicaciones: ['Hipersensibilidad', 'Dependencia a opioides mu (puede precipitar abstinencia)'],
    efectosAdversos: ['Sedación', 'Náuseas', 'Mareo', 'Diaforesis', 'Disforia (efecto kappa)', '⚠️ Puede precipitar abstinencia en dependientes a opioides mu'],
    interacciones: ['Opioides mu puros (morfina): puede revertir parcialmente su efecto', 'Depresores SNC: sedación aditiva', 'Alcohol: potencia efectos'],
    viaAdministracion: ['IV', 'IM', 'SC'], dosis: { adulto: '10-20 mg cada 3-6h IV/IM/SC. Máx: 160 mg/día', pediatrico: '0.1-0.2 mg/kg cada 3-6h' },
    presentaciones: ['Ampollas 10 mg/mL (1 mL)', 'Ampollas 20 mg/mL (1 mL)'],
    embarazo: 'B', lactancia: 'Se excreta en mínimas cantidades. Uso con precaución.',
    cuidadosEnfermeria: ['Efecto techo para depresión respiratoria: más segura que morfina', 'NO dar a pacientes dependientes de opioides (precipita abstinencia)', 'Muy usada en obstetricia por seguridad', 'Puede revertir parcialmente analgesia de morfina si se dan juntas', 'Evaluar dolor con EVA antes y después'],
    farmacocinetica: { metabolismo: 'Hepático', excrecion: 'Renal y fecal', vidaMedia: '5 horas', inicioAccion: 'IV: 2-3 min. IM: 15 min', picoAccion: 'IV: 5-15 min. IM: 30-60 min', duracionAccion: '3-6 horas' },
    almacenamiento: 'Temperatura ambiente. Proteger de la luz.', unidadId: 'u01', capituloId: 'c01_02'
  },
  {
    id: 'dexketoprofeno', nombre: 'Dexketoprofeno', nombreGenerico: 'Dexketoprofeno trometamol',
    nombresComerciales: ['Enantyum', 'Keral', 'Stadium'],
    familia: 'AINEs', clasificacion: 'Enantiómero S(+) de ketoprofeno',
    mecanismoAccion: 'Enantiómero activo de ketoprofeno. Inhibe COX-1/COX-2 con el doble de potencia que el racemato, permitiendo menor dosis y menor toxicidad GI.',
    indicaciones: ['Dolor agudo moderado a severo', 'Dolor postoperatorio', 'Cólico renal', 'Dismenorrea', 'Dolor dental', 'Dolor musculoesquelético agudo'],
    contraindicaciones: ['Úlcera GI activa', 'Insuficiencia renal grave', 'IC severa', 'Tercer trimestre embarazo'],
    efectosAdversos: ['Náuseas', 'Dispepsia', 'Dolor abdominal', 'Cefalea', '⚠️ Hemorragia GI', '⚠️ IRA'],
    interacciones: ['Anticoagulantes: sangrado', 'Metotrexato: toxicidad', 'IECA: reduce efecto', 'Litio: aumenta niveles'],
    viaAdministracion: ['oral', 'IV', 'IM'], dosis: { adulto: 'Oral: 12.5-25 mg cada 8h. IV/IM: 50 mg cada 8-12h. Máx oral: 75 mg/día. Máx parenteral: 150 mg/día. No más de 2 días parenteral' },
    presentaciones: ['Comprimidos 12.5, 25 mg', 'Granulado 25 mg', 'Ampollas 50 mg/2 mL'],
    embarazo: 'C', lactancia: 'Evitar.',
    cuidadosEnfermeria: ['Más potente que ketoprofeno racémico a menor dosis', 'IV: diluir en 30-100 mL SF, pasar en 10-30 min', 'Máximo 2 días por vía parenteral', 'Muy usado en urgencias y postoperatorio', 'Oral: tomar con alimentos'],
    farmacocinetica: { absorcion: 'Oral rápida, Tmax 30 min', metabolismo: 'Hepático glucuronidación', excrecion: 'Renal 80%', vidaMedia: '1.65 horas', inicioAccion: 'Oral: 15-30 min. IV: 5-10 min', picoAccion: '30 min oral', duracionAccion: '4-6 horas' },
    almacenamiento: 'Temperatura ambiente.', unidadId: 'u08', capituloId: 'c08_01'
  },
  // ===== CARDIOVASCULAR =====
  {
    id: 'candesartan', nombre: 'Candesartán', nombreGenerico: 'Candesartán cilexetilo',
    nombresComerciales: ['Atacand', 'Blopress', 'Candesartán Gador'],
    familia: 'Antihipertensivos', clasificacion: 'ARA-II',
    mecanismoAccion: 'Profármaco convertido a candesartán activo. Bloqueo selectivo AT1 con la mayor afinidad de unión al receptor de todos los ARA-II.',
    indicaciones: ['Hipertensión arterial', 'Insuficiencia cardíaca (NYHA II-IV) cuando IECA no tolerados', 'Nefropatía diabética'],
    contraindicaciones: ['Embarazo', 'Estenosis bilateral renal', 'Hiperpotasemia'],
    efectosAdversos: ['Mareo', 'Hipotensión', 'Hiperpotasemia', 'Cefalea', 'Dolor de espalda'],
    interacciones: ['IECA: evitar doble bloqueo', 'Suplementos de K+: hiperpotasemia', 'AINEs: reduce eficacia', 'Litio: toxicidad'],
    viaAdministracion: ['oral'], dosis: { adulto: 'HTA: 8-32 mg/día. IC: inicio 4 mg/día, meta 32 mg/día', ajusteRenal: 'Inicio 4 mg si ClCr <30', ajusteHepatico: 'Inicio 8 mg' },
    presentaciones: ['Comprimidos 4, 8, 16, 32 mg'],
    embarazo: 'D', lactancia: 'No recomendado.',
    cuidadosEnfermeria: ['Mayor afinidad AT1 de todos los ARA-II', 'Monitorizar PA, K+ y creatinina', 'Puede tomarse con o sin alimentos', 'Titular en IC cada 2 semanas'],
    farmacocinetica: { absorcion: 'Oral, biodisponibilidad 15% (profármaco)', metabolismo: 'Esterasas intestinales activan profármaco', excrecion: 'Renal 33%, fecal 67%', vidaMedia: '9 horas', inicioAccion: '2 horas', duracionAccion: '24 horas' },
    almacenamiento: 'Temperatura ambiente.', unidadId: 'u02', capituloId: 'c02_01'
  },
  {
    id: 'lercanidipino', nombre: 'Lercanidipino', nombreGenerico: 'Lercanidipino clorhidrato',
    nombresComerciales: ['Zanidip', 'Lercanil', 'Lercanidipino Gador'],
    familia: 'Antihipertensivos', clasificacion: 'Bloqueante de canales de calcio dihidropiridínico (3ª generación)',
    mecanismoAccion: 'Alta lipofilia le permite acumularse en la membrana celular vascular, produciendo vasodilatación gradual y sostenida con menor taquicardia refleja y edema que amlodipino.',
    indicaciones: ['Hipertensión arterial esencial'],
    contraindicaciones: ['Estenosis aórtica severa', 'IC no tratada', 'Insuficiencia hepática o renal grave', 'Uso con inhibidores potentes CYP3A4'],
    efectosAdversos: ['Cefalea', 'Rubor facial', 'Edema maleolar (menor que amlodipino)', 'Palpitaciones', 'Mareo'],
    interacciones: ['Ketoconazol/itraconazol: contraindicado', 'Ciclosporina: ajustar dosis', 'Pomelo: aumenta niveles', 'Metoprolol: efecto aditivo'],
    viaAdministracion: ['oral'], dosis: { adulto: '10 mg/día, puede aumentar a 20 mg/día' },
    presentaciones: ['Comprimidos 10, 20 mg'],
    embarazo: 'C', lactancia: 'No recomendado.',
    cuidadosEnfermeria: ['Tomar 15 min antes del desayuno', 'Menor edema periférico que amlodipino (ventaja)', 'No tomar con pomelo', 'Efecto gradual: menos taquicardia refleja', 'Monitorizar PA'],
    farmacocinetica: { absorcion: 'Oral, biodisponibilidad 10% (primer paso extenso)', metabolismo: 'Hepático CYP3A4', excrecion: 'Renal 50%, fecal 50%', vidaMedia: '8-10 horas (efecto >24h por acumulación en membrana)', inicioAccion: '1-2 horas', duracionAccion: '24 horas' },
    almacenamiento: 'Temperatura ambiente.', unidadId: 'u02', capituloId: 'c02_01'
  },
  {
    id: 'dronedarona', nombre: 'Dronedarona', nombreGenerico: 'Dronedarona',
    nombresComerciales: ['Multaq'],
    familia: 'Antiarrítmicos', clasificacion: 'Antiarrítmico multicanal (similar a amiodarona sin yodo)',
    mecanismoAccion: 'Bloquea canales de K+, Na+, Ca2+ y receptores β-adrenérgicos (clase I, II, III y IV de Vaughan-Williams). Análogo de amiodarona sin grupo yodado, lo que elimina toxicidad tiroidea y pulmonar.',
    indicaciones: ['Fibrilación auricular paroxística o persistente (mantenimiento ritmo sinusal)', 'Reducción de hospitalización por FA'],
    contraindicaciones: ['FA permanente', 'IC clase IV o descompensada', 'Bloqueo AV 2°-3° grado', 'Bradicardia <50 lpm', 'QTc >500 ms', 'Uso con inhibidores potentes CYP3A4', 'Insuficiencia hepática grave'],
    efectosAdversos: ['Diarrea', 'Náuseas', 'Rash', 'Bradicardia', 'Prolongación QT', '⚠️ Hepatotoxicidad (monitorizar)', '⚠️ NO usar en IC: aumenta mortalidad'],
    interacciones: ['Digoxina: duplica niveles (reducir digoxina 50%)', 'Dabigatrán: aumenta niveles', 'Estatinas: aumenta niveles (riesgo miopatía)', 'Ketoconazol: contraindicado'],
    viaAdministracion: ['oral'], dosis: { adulto: '400 mg cada 12h con las comidas' },
    presentaciones: ['Comprimidos 400 mg'],
    embarazo: 'X', lactancia: 'Contraindicado.',
    cuidadosEnfermeria: ['TOMAR CON COMIDAS (aumenta absorción 2-3x)', 'ECG basal y periódico', 'Función hepática cada 3 meses', 'NUNCA en IC descompensada o FA permanente', 'Ventaja sobre amiodarona: sin toxicidad tiroidea ni pulmonar', 'Reducir digoxina 50% si se usa juntas'],
    farmacocinetica: { absorcion: 'Oral, biodisponibilidad 15% (aumenta con comida)', metabolismo: 'Hepático CYP3A4', excrecion: 'Fecal 84%, renal 6%', vidaMedia: '13-19 horas', inicioAccion: 'Días a semanas', duracionAccion: '12 horas' },
    almacenamiento: 'Temperatura ambiente.', unidadId: 'u02', capituloId: 'c02_02'
  },
  // ===== ANTIINFECCIOSOS =====
  {
    id: 'anidulafungina', nombre: 'Anidulafungina', nombreGenerico: 'Anidulafungina',
    nombresComerciales: ['Eraxis', 'Ecalta'],
    familia: 'Equinocandinas', clasificacion: 'Antifúngico (inhibidor β-1,3-glucano sintetasa)',
    mecanismoAccion: 'Inhibe síntesis de β-1,3-D-glucano de pared fúngica. A diferencia de caspofungina y micafungina, se degrada por biotransformación química (no hepática), sin ajuste en insuficiencia hepática.',
    indicaciones: ['Candidemia', 'Candidiasis invasiva', 'Candidiasis esofágica', 'Peritonitis por Candida'],
    contraindicaciones: ['Hipersensibilidad a equinocandinas'],
    efectosAdversos: ['Diarrea', 'Hipopotasemia', 'Elevación de transaminasas', 'Cefalea', 'Rash'],
    interacciones: ['No interacciones significativas (no usa CYP450)', 'Ciclosporina: sin interacción (a diferencia de caspofungina)'],
    viaAdministracion: ['IV'], dosis: { adulto: 'Candidemia: 200 mg día 1, luego 100 mg/día. Esofágica: 100 mg día 1, luego 50 mg/día' },
    presentaciones: ['Viales 100 mg'],
    embarazo: 'C', lactancia: 'Precaución.',
    cuidadosEnfermeria: ['Infusión máxima 1.1 mg/min (evitar reacciones histaminérgicas)', 'NO requiere ajuste hepático ni renal', 'Menor interacciones que caspofungina', 'Reconstituir con agua estéril, luego diluir en SF o Dex5%', 'Proteger de la luz'],
    farmacocinetica: { distribucion: 'Unión proteica 84%', metabolismo: 'Degradación química lenta (no hepática)', excrecion: 'Fecal 30%, renal <1%', vidaMedia: '27 horas', inicioAccion: 'Inmediato', duracionAccion: '24 horas' },
    almacenamiento: 'Refrigerar. Reconstituido: 24h a TA.', unidadId: 'u03', capituloId: 'c03_04'
  },
  {
    id: 'letermovir', nombre: 'Letermovir', nombreGenerico: 'Letermovir',
    nombresComerciales: ['Prevymis'],
    familia: 'Antivirales', clasificacion: 'Inhibidor del complejo terminasa de CMV',
    mecanismoAccion: 'Primer antiviral con mecanismo único contra CMV: inhibe el complejo terminasa viral (pUL56), bloqueando el empaquetamiento y clivaje del ADN viral. No afecta ADN polimerasa humana.',
    indicaciones: ['Profilaxis de reactivación de CMV en trasplante alogénico de células madre hematopoyéticas seropositivos para CMV'],
    contraindicaciones: ['Uso con pimozida o alcaloides del ergot', 'Uso con ciclosporina + tacrolimus simultáneamente'],
    efectosAdversos: ['Náuseas', 'Diarrea', 'Vómitos', 'Edema periférico', 'Tos', 'Fatiga'],
    interacciones: ['Ciclosporina: duplica niveles de letermovir (ajustar)', 'Tacrolimus: aumenta niveles de tacrolimus', 'Voriconazol: reduce niveles de voriconazol', 'Estatinas: aumenta niveles (precaución)'],
    viaAdministracion: ['oral', 'IV'], dosis: { adulto: '480 mg/día (240 mg si usa ciclosporina). Iniciar del día 0 al 28 post-trasplante, continuar hasta día 100' },
    presentaciones: ['Comprimidos 240, 480 mg', 'Viales 240, 480 mg'],
    embarazo: 'C', lactancia: 'Se desconoce.',
    cuidadosEnfermeria: ['No es tratamiento: es PROFILAXIS de CMV', 'Reducir a 240 mg si usa ciclosporina', 'Monitorizar carga viral CMV durante y después', 'IV: infusión en 1 hora, vía periférica aceptable', 'Mecanismo único: no resistencia cruzada con ganciclovir'],
    farmacocinetica: { absorcion: 'Oral, biodisponibilidad variable', metabolismo: 'Hepático CYP3A4, UGT1A1/1A3', excrecion: 'Fecal 93%', vidaMedia: '12 horas', inicioAccion: 'Días', duracionAccion: '24 horas' },
    almacenamiento: 'Temperatura ambiente.', unidadId: 'u03', capituloId: 'c03_04'
  },
  {
    id: 'bedaquilina', nombre: 'Bedaquilina', nombreGenerico: 'Bedaquilina fumarato',
    nombresComerciales: ['Sirturo'],
    familia: 'Antituberculosos', clasificacion: 'Inhibidor de ATP sintetasa micobacteriana',
    mecanismoAccion: 'Primer fármaco con mecanismo completamente nuevo contra TB en 50 años. Inhibe la ATP sintetasa de micobacterias (subunidad c del rotor F0F1), bloqueando la generación de energía bacteriana.',
    indicaciones: ['Tuberculosis multirresistente (MDR-TB) como parte de terapia combinada', 'TB extensamente resistente (XDR-TB)'],
    contraindicaciones: ['QTc >500 ms', 'Arritmias ventriculares', 'Insuficiencia hepática grave'],
    efectosAdversos: ['Náuseas', 'Artralgias', 'Cefalea', 'Elevación de transaminasas', '⚠️ Prolongación del QTc', '⚠️ Hepatotoxicidad', '⚠️ Mayor mortalidad observada en ensayos (vigilancia)'],
    interacciones: ['Rifampicina: CONTRAINDICADO (reduce niveles 50%)', 'Ketoconazol: aumenta niveles', 'Fármacos que prolongan QT: riesgo aditivo', 'Lopinavir/ritonavir: aumenta niveles'],
    viaAdministracion: ['oral'], dosis: { adulto: 'Semanas 1-2: 400 mg/día. Semanas 3-24: 200 mg 3 veces/semana (L-Mi-V). Siempre con ≥3 fármacos activos' },
    presentaciones: ['Comprimidos 100 mg'],
    embarazo: 'B', lactancia: 'Se desconoce. No recomendado.',
    cuidadosEnfermeria: ['SIEMPRE con alimentos (aumenta absorción 2x)', 'ECG basal, mensual y ante síntomas', 'Función hepática basal y mensual', 'NUNCA con rifampicina', 'Tratamiento supervisado directamente (DOTS)', 'Primer mecanismo nuevo anti-TB en 50 años'],
    farmacocinetica: { absorcion: 'Oral, aumenta 2x con alimentos', metabolismo: 'Hepático CYP3A4', excrecion: 'Fecal >85%', vidaMedia: '5.5 meses (extremadamente larga)', inicioAccion: 'Semanas', duracionAccion: 'Días' },
    almacenamiento: 'Temperatura ambiente. Proteger de la luz.', unidadId: 'u03', capituloId: 'c03_05'
  },
  // ===== DIGESTIVO =====
  {
    id: 'vonoprazan', nombre: 'Vonoprazán', nombreGenerico: 'Vonoprazán fumarato',
    nombresComerciales: ['Voquezna', 'Takecab'],
    familia: 'Antisecretores gástricos', clasificacion: 'Bloqueante ácido competitivo de potasio (P-CAB)',
    mecanismoAccion: 'Nuevo mecanismo: inhibe competitivamente la bomba H+/K+-ATPasa uniéndose al sitio del potasio. A diferencia de IBP: no requiere activación ácida, efecto inmediato, no depende de CYP2C19.',
    indicaciones: ['ERGE erosiva', 'Erradicación de H. pylori (en combinación)', 'Úlcera gástrica y duodenal', 'Síndrome de Zollinger-Ellison'],
    contraindicaciones: ['Hipersensibilidad', 'Uso con rilpivirina o atazanavir'],
    efectosAdversos: ['Diarrea', 'Dolor abdominal', 'Náuseas', 'Cefalea', 'Hipergastrinemia'],
    interacciones: ['Rilpivirina/atazanavir: reduce absorción (contraindicado)', 'Metotrexato: puede aumentar niveles', 'Ketoconazol: reduce absorción'],
    viaAdministracion: ['oral'], dosis: { adulto: 'ERGE: 20 mg/día x 4-8 sem. H. pylori: 20 mg/12h + amoxicilina + claritromicina x 14 días. Mantenimiento: 10 mg/día' },
    presentaciones: ['Comprimidos 10, 20 mg'],
    embarazo: 'C', lactancia: 'Se desconoce.',
    cuidadosEnfermeria: ['No requiere activación ácida (ventaja sobre IBP)', 'Efecto en primera dosis (no necesita acumularse)', 'No depende de CYP2C19: eficacia consistente', 'Puede tomarse con o sin alimentos', 'Mayor tasa de erradicación de H. pylori que IBP'],
    farmacocinetica: { absorcion: 'Oral rápida, biodisponibilidad alta', metabolismo: 'Hepático CYP3A4', excrecion: 'Renal 67%', vidaMedia: '7.7 horas', inicioAccion: '1-2 horas (inmediato vs IBP)', duracionAccion: '24 horas' },
    almacenamiento: 'Temperatura ambiente.', unidadId: 'u05', capituloId: 'c05_01'
  },
  {
    id: 'rifaximina', nombre: 'Rifaximina', nombreGenerico: 'Rifaximina',
    nombresComerciales: ['Xifaxan', 'Spiraxin', 'Rifaximina Gador'],
    familia: 'Antibióticos intestinales', clasificacion: 'Antibiótico no absorbible (derivado de rifamicina)',
    mecanismoAccion: 'Inhibe la ARN polimerasa bacteriana dependiente de ADN. Prácticamente no se absorbe (<0.4%), actuando exclusivamente en la luz intestinal.',
    indicaciones: ['Encefalopatía hepática (prevención de recurrencia)', 'Diarrea del viajero', 'Síndrome de intestino irritable con diarrea (SII-D)', 'Sobrecrecimiento bacteriano intestinal (SIBO)'],
    contraindicaciones: ['Hipersensibilidad a rifamicinas', 'Obstrucción intestinal'],
    efectosAdversos: ['Flatulencia', 'Cefalea', 'Dolor abdominal', 'Estreñimiento', 'Náuseas'],
    interacciones: ['Warfarina: puede reducir INR levemente', 'Ciclosporina: aumenta niveles de rifaximina (pero absorción mínima)', 'No induce CYP sistémico por no absorberse'],
    viaAdministracion: ['oral'], dosis: { adulto: 'Encefalopatía hepática: 550 mg cada 12h (crónico). Diarrea viajero: 200 mg cada 8h x 3 días. SII-D: 550 mg cada 8h x 14 días. SIBO: 550 mg cada 8h x 14 días' },
    presentaciones: ['Comprimidos 200, 550 mg'],
    embarazo: 'C', lactancia: 'Absorción mínima. Probablemente seguro.',
    cuidadosEnfermeria: ['No se absorbe: actúa solo en intestino', 'Para encefalopatía hepática: uso crónico con lactulosa', 'No requiere monitorización hepática ni renal', 'Eficaz para SIBO: puede repetir ciclos', 'Diarrea del viajero: no usar si fiebre o sangre en heces (necesita antibiótico sistémico)'],
    farmacocinetica: { absorcion: 'Oral <0.4% (prácticamente no absorbible)', metabolismo: 'No aplica (local intestinal)', excrecion: 'Fecal 97% sin cambios', vidaMedia: 'No aplica sistémicamente', inicioAccion: 'Horas a días', duracionAccion: '8 horas' },
    almacenamiento: 'Temperatura ambiente.', unidadId: 'u05', capituloId: 'c05_03'
  },
  // ===== ENDOCRINO =====
  {
    id: 'dapagliflozina_ic', nombre: 'Finerenona', nombreGenerico: 'Finerenona',
    nombresComerciales: ['Kerendia'],
    familia: 'Nefroprotectores', clasificacion: 'Antagonista selectivo no esteroideo del receptor de mineralocorticoides (ARM-NE)',
    mecanismoAccion: 'Primer ARM no esteroideo. Bloquea el receptor de mineralocorticoides con selectividad mayor que espironolactona, sin afinidad por receptores androgénicos ni progesterona. Reduce inflamación y fibrosis renal y cardíaca.',
    indicaciones: ['Enfermedad renal crónica asociada a DM2 (reducción de progresión)', 'Reducción de eventos cardiovasculares en ERC diabética'],
    contraindicaciones: ['Uso con inhibidores potentes CYP3A4 (ketoconazol, itraconazol)', 'K+ sérico >5.0 mEq/L', 'Insuficiencia suprarrenal'],
    efectosAdversos: ['Hiperpotasemia (principal riesgo)', 'Hipotensión', 'Hiponatremia'],
    interacciones: ['Ketoconazol/itraconazol: contraindicado', 'Eritromicina/verapamilo: reducir dosis', 'Rifampicina: reduce eficacia', 'IECA/ARA-II: hiperpotasemia (monitorizar)'],
    viaAdministracion: ['oral'], dosis: { adulto: 'K+ ≤4.8: 20 mg/día. K+ 4.8-5.0: 10 mg/día. K+ >5.0: no iniciar. Titular según potasio a las 4 semanas' },
    presentaciones: ['Comprimidos 10, 20 mg'],
    embarazo: 'X', lactancia: 'Contraindicado.',
    cuidadosEnfermeria: ['Medir potasio ANTES de iniciar y a las 4 semanas', 'No iniciar si K+ >5.0', 'Suspender temporalmente si K+ >5.5', 'Ventaja sobre espironolactona: sin ginecomastia ni alteraciones menstruales', 'Complementa IECA/ARA-II + iSGLT2 en ERC diabética', 'Estudios FIDELIO/FIGARO demostraron nefro y cardioprotección'],
    farmacocinetica: { absorcion: 'Oral, biodisponibilidad 44%', metabolismo: 'Hepático CYP3A4 (90%)', excrecion: 'Renal 80%', vidaMedia: '2-3 horas', inicioAccion: '0.5-1.5 horas', duracionAccion: '24 horas' },
    almacenamiento: 'Temperatura ambiente.', unidadId: 'u06', capituloId: 'c06_04'
  },
  // ===== HEMATOLOGÍA =====
  {
    id: 'eltrombopag', nombre: 'Eltrombopag', nombreGenerico: 'Eltrombopag olamina',
    nombresComerciales: ['Revolade', 'Promacta'],
    familia: 'Estimulantes de trombopoyesis', clasificacion: 'Agonista del receptor de trombopoyetina (TPO) oral',
    mecanismoAccion: 'Se une al dominio transmembrana del receptor de TPO (c-Mpl) en un sitio diferente a la TPO endógena, activando la vía JAK/STAT y estimulando la proliferación y diferenciación de megacariocitos.',
    indicaciones: ['Trombocitopenia inmune (PTI) crónica refractaria', 'Trombocitopenia por hepatitis C (para permitir tratamiento antiviral)', 'Anemia aplásica severa (primera línea con inmunosupresores)'],
    contraindicaciones: ['Insuficiencia hepática grave'],
    efectosAdversos: ['Cefalea', 'Náuseas', 'Diarrea', 'Elevación transaminasas', '⚠️ Trombosis (al aumentar plaquetas excesivamente)', '⚠️ Hepatotoxicidad', '⚠️ Fibrosis de médula ósea (uso prolongado)'],
    interacciones: ['Antiácidos/calcio/hierro: reducen absorción (separar 4h)', 'Estatinas: puede aumentar niveles de rosuvastatina', 'Sustratos OATP1B1: interacción'],
    viaAdministracion: ['oral'], dosis: { adulto: 'PTI: inicio 50 mg/día, ajustar cada 2 sem (rango 25-75 mg). Hepatitis C: 25 mg/día. Anemia aplásica: 150 mg/día', ajusteHepatico: 'Inicio 25 mg/día en insuficiencia' },
    presentaciones: ['Comprimidos 12.5, 25, 50, 75 mg'],
    embarazo: 'C', lactancia: 'Se desconoce. No recomendado.',
    cuidadosEnfermeria: ['Tomar en AYUNAS (2h antes o 4h después de lácteos/antiácidos/hierro)', 'Hemograma semanal hasta estabilizar, luego mensual', 'Objetivo: plaquetas >50,000 (no normalizar)', 'Función hepática cada 2 semanas al inicio', 'Al suspender: recuento puede caer debajo del basal (vigilar)', 'Frotis de sangre periférica si uso >1 año (fibrosis MO)'],
    farmacocinetica: { absorcion: 'Oral, disminuida por cationes divalentes', metabolismo: 'Hepático CYP1A2, CYP2C8, UGT1A1/1A3', excrecion: 'Fecal 59%, renal 31%', vidaMedia: '21-32 horas', inicioAccion: '1-2 semanas', picoAccion: '2-6 horas', duracionAccion: '24 horas' },
    almacenamiento: 'Temperatura ambiente.', unidadId: 'u10', capituloId: 'c10_02'
  },
  // ===== RESPIRATORIO =====
  {
    id: 'benralizumab', nombre: 'Benralizumab', nombreGenerico: 'Benralizumab',
    nombresComerciales: ['Fasenra'],
    familia: 'Anticuerpos monoclonales', clasificacion: 'Anti-receptor IL-5 (anti-IL-5Rα)',
    mecanismoAccion: 'Anticuerpo monoclonal que se une al receptor alfa de IL-5 en eosinófilos y basófilos. A diferencia de mepolizumab (anti-IL-5), induce apoptosis directa de eosinófilos por ADCC (citotoxicidad celular dependiente de anticuerpo), logrando depleción casi completa.',
    indicaciones: ['Asma eosinofílica grave (≥12 años) como complemento', 'Granulomatosis eosinofílica con poliangeítis (GEPA)'],
    contraindicaciones: ['Hipersensibilidad'],
    efectosAdversos: ['Cefalea', 'Faringitis', 'Reacción en sitio de inyección', 'Fiebre', '⚠️ Anafilaxia (rara)'],
    interacciones: ['No interacciones significativas'],
    viaAdministracion: ['SC'], dosis: { adulto: '30 mg SC cada 4 semanas x 3 dosis, luego cada 8 semanas' },
    presentaciones: ['Jeringa precargada 30 mg/mL', 'Autoinyector 30 mg'],
    embarazo: 'B', lactancia: 'Probablemente seguro (IgG).',
    cuidadosEnfermeria: ['Eosinófilos ≥300/µL para indicación', 'Después de 3 dosis mensuales: espaciar a cada 8 semanas', 'NO para crisis aguda', 'Depleción de eosinófilos casi completa (vs parcial con mepolizumab)', 'Puede autoadministrarse tras entrenamiento', 'No suspender corticoides inhalados abruptamente'],
    farmacocinetica: { absorcion: 'SC, biodisponibilidad 59%', vidaMedia: '15.5 días', inicioAccion: '24h (depleción eosinófilos)', picoAccion: 'Semanas para efecto clínico', duracionAccion: '8 semanas' },
    almacenamiento: 'Refrigerar 2-8°C. No congelar.', unidadId: 'u04', capituloId: 'c04_05'
  },
  // ===== DERMATOLOGÍA =====
  {
    id: 'dupilumab', nombre: 'Dupilumab', nombreGenerico: 'Dupilumab',
    nombresComerciales: ['Dupixent'],
    familia: 'Anticuerpos monoclonales', clasificacion: 'Inhibidor dual IL-4/IL-13 (anticuerpo anti-IL-4Rα)',
    mecanismoAccion: 'Anticuerpo monoclonal que bloquea la subunidad alfa del receptor de IL-4, inhibiendo la señalización de IL-4 e IL-13, citocinas Th2 clave en la inflamación atópica.',
    indicaciones: ['Dermatitis atópica moderada a grave (≥6 años)', 'Asma eosinofílica moderada a grave', 'Rinosinusitis crónica con pólipos nasales', 'Esofagitis eosinofílica', 'Prurigo nodular'],
    contraindicaciones: ['Hipersensibilidad'],
    efectosAdversos: ['Reacción en sitio de inyección', 'Conjuntivitis (frecuente en DA)', 'Herpes oral', 'Eosinofilia transitoria', 'Artralgias'],
    interacciones: ['Vacunas vivas: evitar durante tratamiento', 'No interacciones CYP significativas'],
    viaAdministracion: ['SC'], dosis: { adulto: 'DA: carga 600 mg (2x300), luego 300 mg cada 2 semanas. Asma: 200-300 mg cada 2 semanas', pediatrico: '6-17 años: según peso' },
    presentaciones: ['Jeringa precargada 200, 300 mg', 'Pluma precargada 200, 300 mg'],
    embarazo: 'B', lactancia: 'Probablemente compatible (IgG).',
    cuidadosEnfermeria: ['Puede autoadministrarse tras entrenamiento', 'Rotar sitios de inyección', 'Mejoría visible en 2-4 semanas', 'Conjuntivitis: común en DA, tratar con lágrimas artificiales', 'No es inmunosupresor: menor riesgo infeccioso', 'Primer biológico aprobado para DA'],
    farmacocinetica: { absorcion: 'SC, biodisponibilidad 64%', metabolismo: 'Degradación proteolítica', vidaMedia: '13 días', inicioAccion: '2-4 semanas', duracionAccion: '2 semanas' },
    almacenamiento: 'Refrigerar 2-8°C. A TA: máximo 14 días.', unidadId: 'u09', capituloId: 'c09_06'
  },
  // ===== UROLOGÍA =====
  {
    id: 'mirabegron', nombre: 'Mirabegrón', nombreGenerico: 'Mirabegrón',
    nombresComerciales: ['Myrbetriq', 'Betmiga'],
    familia: 'Urológicos', clasificacion: 'Agonista β3-adrenérgico vesical',
    mecanismoAccion: 'Agonista selectivo de receptores β3-adrenérgicos del músculo detrusor vesical, produciendo relajación durante la fase de llenado sin afectar la contracción durante la micción.',
    indicaciones: ['Vejiga hiperactiva (urgencia, frecuencia, incontinencia de urgencia)'],
    contraindicaciones: ['HTA severa no controlada (>180/110)', 'Insuficiencia hepática grave', 'Insuficiencia renal terminal'],
    efectosAdversos: ['Infección urinaria', 'Cefalea', 'Nasofaringitis', 'HTA', 'Taquicardia', 'Estreñimiento'],
    interacciones: ['Digoxina: aumenta niveles (monitorizar)', 'Metoprolol: aumenta niveles de metoprolol', 'Warfarina: monitorizar INR'],
    viaAdministracion: ['oral'], dosis: { adulto: '25-50 mg/día', ajusteRenal: '25 mg/día si ClCr 15-29', ajusteHepatico: '25 mg/día en moderada. Contraindicado en grave' },
    presentaciones: ['Comprimidos LP 25, 50 mg'],
    embarazo: 'C', lactancia: 'Se excreta en leche animal. No recomendado.',
    cuidadosEnfermeria: ['Alternativa a anticolinérgicos sin efectos antimuscarínicos (boca seca, estreñimiento, confusión)', 'Monitorizar PA (puede elevarla)', 'No triturar ni masticar (LP)', 'Ideal para pacientes que no toleran oxibutinina/tolterodina', 'Puede combinarse con solifenacina si monoterapia insuficiente'],
    farmacocinetica: { absorcion: 'Oral, biodisponibilidad 29-35%', metabolismo: 'Hepático CYP3A4, CYP2D6', excrecion: 'Renal 55%, fecal 34%', vidaMedia: '50 horas', inicioAccion: '1-2 semanas', duracionAccion: '24 horas' },
    almacenamiento: 'Temperatura ambiente.', unidadId: 'u07', capituloId: 'c07_03'
  },
  // ===== HOSPITALARIOS =====
  {
    id: 'fentolamina', nombre: 'Fentolamina', nombreGenerico: 'Fentolamina mesilato',
    nombresComerciales: ['Regitine', 'OraVerse'],
    familia: 'Bloqueantes alfa-adrenérgicos', clasificacion: 'Antagonista α1/α2 adrenérgico no selectivo',
    mecanismoAccion: 'Bloquea competitivamente receptores α1 y α2 adrenérgicos, produciendo vasodilatación potente. Aumenta gasto cardíaco por reducción de postcarga y taquicardia refleja.',
    indicaciones: ['Crisis hipertensiva por feocromocitoma', 'Extravasación de vasopresores (noradrenalina, dopamina)', 'Diagnóstico de feocromocitoma', 'Reversión de anestesia dental local (OraVerse)'],
    contraindicaciones: ['Hipotensión', 'Enfermedad coronaria', 'IAM reciente'],
    efectosAdversos: ['Taquicardia refleja', 'Hipotensión', 'Arritmias', 'Dolor abdominal', 'Congestión nasal', '⚠️ IAM y ACV en pacientes con enfermedad CV'],
    interacciones: ['Sildenafilo: hipotensión severa', 'Betabloqueantes: se pueden combinar para controlar taquicardia refleja', 'Vasopresores: antagonismo'],
    viaAdministracion: ['IV', 'IM', 'SC'], dosis: { adulto: 'Crisis por feocromocitoma: 5 mg IV (repetir cada 5 min según PA). Extravasación: 5-10 mg en 10 mL SF infiltrados localmente. Prequirúrgico: 5 mg IV 1-2h antes' },
    presentaciones: ['Ampollas 5 mg/mL', 'Cartucho dental 0.4 mg (OraVerse)'],
    embarazo: 'C', lactancia: 'Se desconoce.',
    cuidadosEnfermeria: ['Monitorización continua de PA y FC', 'Para extravasación: infiltrar subcutáneamente ALREDEDOR del área (no directamente)', 'Tener preparado BB para controlar taquicardia refleja si necesario', 'Efecto breve: puede repetirse cada 5-10 min', 'En feocromocitoma: SIEMPRE alfa-bloqueo ANTES de beta-bloqueo'],
    farmacocinetica: { metabolismo: 'Hepático', excrecion: 'Renal 13% sin cambios', vidaMedia: '19 minutos', inicioAccion: 'IV: 1-2 min. IM: 10-15 min', duracionAccion: 'IV: 10-15 min. IM: 30-45 min' },
    almacenamiento: 'Temperatura ambiente. Proteger de la luz. Reconstituido: usar inmediatamente.', unidadId: 'u12', capituloId: 'c12_02'
  },
  {
    id: 'pantoprazol_iv', nombre: 'Pantoprazol IV', nombreGenerico: 'Pantoprazol sódico IV',
    nombresComerciales: ['Protonix IV', 'Pantoprazol IV Richet'],
    familia: 'Antisecretores gástricos', clasificacion: 'Inhibidor de bomba de protones IV',
    mecanismoAccion: 'Inhibe irreversiblemente la H+/K+-ATPasa gástrica por vía intravenosa cuando la vía oral no es posible.',
    indicaciones: ['Hemorragia digestiva alta por úlcera (post-endoscopía)', 'Profilaxis de úlcera de estrés en UCI', 'ERGE cuando vía oral imposible', 'Síndrome de Zollinger-Ellison'],
    contraindicaciones: ['Hipersensibilidad a IBP'],
    efectosAdversos: ['Cefalea', 'Diarrea', 'Flatulencia', 'Flebitis', '⚠️ Hipomagnesemia (uso prolongado)'],
    interacciones: ['Clopidogrel: pantoprazol tiene menor interacción que omeprazol (preferido)', 'Metotrexato: puede aumentar niveles'],
    viaAdministracion: ['IV'], dosis: { adulto: 'Úlcera sangrante: bolo 80 mg IV + infusión 8 mg/h x 72h. Profilaxis estrés: 40 mg IV cada 12-24h. Estándar: 40 mg IV cada 24h' },
    presentaciones: ['Viales 40 mg'],
    embarazo: 'B', lactancia: 'Se excreta. Precaución.',
    cuidadosEnfermeria: ['Bolo IV: pasar en 2-15 min', 'Infusión continua: 8 mg/h (estable 12h en SF)', 'No mezclar con otros fármacos en la línea', 'Hemorragia digestiva: bolo + infusión continua es estándar post-endoscopía', 'Pasar a vía oral tan pronto como sea posible', 'Filtro en línea de 0.22 μm recomendado'],
    farmacocinetica: { distribucion: 'Unión proteica 98%', metabolismo: 'Hepático CYP2C19, CYP3A4', excrecion: 'Renal 71%', vidaMedia: '1 hora (pero efecto dura 24h por unión irreversible)', inicioAccion: 'IV: 15-30 min', duracionAccion: '24 horas' },
    almacenamiento: 'Viales: temperatura ambiente. Reconstituido: usar en 12h.', unidadId: 'u05', capituloId: 'c05_01'
  },
  // ===== EMERGENCIAS =====
  {
    id: 'sugammadex_emergencia', nombre: 'Lipid Rescue (Emulsión lipídica 20%)', nombreGenerico: 'Emulsión lipídica intravenosa 20%',
    nombresComerciales: ['Intralipid 20%', 'ClinOleic', 'SMOFlipid'],
    familia: 'Antídotos', clasificacion: 'Antídoto lipofílico (lipid sink/sumidero lipídico)',
    mecanismoAccion: 'Crea un compartimento lipídico intravascular que secuestra fármacos lipofílicos cardiotóxicos, alejándolos de sus sitios de acción en el corazón y SNC. También mejora el metabolismo energético cardíaco.',
    indicaciones: ['Toxicidad sistémica por anestésicos locales (LAST)', 'Intoxicación por fármacos lipofílicos cardiotóxicos (verapamilo, propranolol, amitriptilina)', 'Paro cardíaco refractario por intoxicación'],
    contraindicaciones: ['Alergia a huevo o soja (relativa en emergencia)', 'Hiperlipidemia severa'],
    efectosAdversos: ['Hipertrigliceridemia', 'Pancreatitis (uso prolongado)', 'Lipemia interferente con laboratorio', 'Embolia grasa (teórica)'],
    interacciones: ['Propofol: contiene lípidos, sumar a carga lipídica total'],
    viaAdministracion: ['IV'], dosis: { adulto: 'Bolo 1.5 mL/kg en 1 min. Infusión: 0.25 mL/kg/min. Si no hay respuesta: repetir bolo (máx 2 bolos). Máx total: 12 mL/kg' },
    presentaciones: ['Frascos 100, 250, 500 mL de emulsión lipídica 20%'],
    embarazo: 'C', lactancia: 'Uso de emergencia.',
    cuidadosEnfermeria: ['Debe estar disponible en TODO quirófano y área de anestesia regional', 'Bolo rápido 1.5 mL/kg seguido de infusión continua', 'Continuar RCP mientras se administra', 'Monitorizar triglicéridos post-administración', 'Protocolo en www.lipidrescue.org', 'En LAST: es PRIMERA LÍNEA junto con RCP'],
    farmacocinetica: { metabolismo: 'Lipólisis por lipoproteín lipasa', excrecion: 'Metabolismo normal de lípidos', vidaMedia: 'Variable (depende de la capacidad metabólica)', inicioAccion: 'Minutos', duracionAccion: 'Variable' },
    almacenamiento: 'Temperatura ambiente. No congelar.', unidadId: 'u11', capituloId: 'c11_01'
  },
  // ===== INMUNO/REUMATOLOGÍA =====
  {
    id: 'adalimumab', nombre: 'Adalimumab', nombreGenerico: 'Adalimumab',
    nombresComerciales: ['Humira', 'Hadlima', 'Hyrimoz'],
    familia: 'Inmunosupresores', clasificacion: 'Anti-TNFα (anticuerpo monoclonal humano)',
    mecanismoAccion: 'Anticuerpo monoclonal IgG1 completamente humano que se une al TNFα soluble y de membrana, bloqueando su interacción con receptores p55 y p75, reduciendo la cascada inflamatoria.',
    indicaciones: ['Artritis reumatoide', 'Artritis psoriásica', 'Espondilitis anquilosante', 'Enfermedad de Crohn', 'Colitis ulcerosa', 'Psoriasis en placas', 'Uveítis no infecciosa', 'Hidradenitis supurativa'],
    contraindicaciones: ['Infección activa grave (TB, sepsis)', 'IC moderada-grave (NYHA III-IV)', 'Hipersensibilidad'],
    efectosAdversos: ['Infección respiratoria superior', 'Reacción en sitio de inyección', 'Cefalea', 'Rash', '⚠️ Reactivación de TB latente', '⚠️ Infecciones oportunistas', '⚠️ Linfoma (riesgo ligeramente aumentado)', '⚠️ Insuficiencia cardíaca'],
    interacciones: ['Metotrexato: combinación habitual (reduce anticuerpos anti-adalimumab)', 'Vacunas vivas: contraindicadas', 'Otros biológicos: no combinar (inmunosupresión excesiva)', 'Abatacept/anakinra: no combinar'],
    viaAdministracion: ['SC'], dosis: { adulto: 'AR: 40 mg SC cada 2 semanas. Crohn/CU: inducción 160 mg, luego 80 mg semana 2, luego 40 mg cada 2 semanas. Psoriasis: 80 mg, luego 40 mg cada 2 semanas' },
    presentaciones: ['Jeringa precargada 20, 40 mg', 'Pluma precargada 40 mg'],
    embarazo: 'B', lactancia: 'Se excreta en mínimas cantidades. Compatible probablemente.',
    cuidadosEnfermeria: ['Screening TB obligatorio antes de iniciar (PPD o IGRA + Rx tórax)', 'Screening hepatitis B y C', 'Vacunar contra influenza y neumococo antes de iniciar', 'Se puede autoadministrar', 'Rotar sitios de inyección', 'Consultar ante fiebre o signos de infección', 'Biológico más prescrito del mundo'],
    farmacocinetica: { absorcion: 'SC, biodisponibilidad 64%', metabolismo: 'Degradación proteolítica', vidaMedia: '14 días', inicioAccion: 'Semanas', duracionAccion: '2 semanas' },
    almacenamiento: 'Refrigerar 2-8°C. No congelar. A TA: máx 14 días.', unidadId: 'u08', capituloId: 'c08_04'
  },
  {
    id: 'ciclosporina', nombre: 'Ciclosporina', nombreGenerico: 'Ciclosporina A',
    nombresComerciales: ['Sandimmun', 'Neoral', 'Restasis (oftálmica)'],
    familia: 'Inmunosupresores', clasificacion: 'Inhibidor de calcineurina',
    mecanismoAccion: 'Se une a ciclofilina formando complejo que inhibe calcineurina, bloqueando la transcripción de IL-2 y la activación de linfocitos T. Piedra angular de la inmunosupresión en trasplante.',
    indicaciones: ['Prevención de rechazo en trasplante (riñón, hígado, corazón)', 'Artritis reumatoide severa', 'Psoriasis severa', 'Síndrome nefrótico', 'Dermatitis atópica severa', 'Uveítis autoinmune'],
    contraindicaciones: ['Hipersensibilidad', 'HTA no controlada (en indicaciones no trasplante)', 'Infecciones activas no controladas', 'Neoplasias (excepto en trasplante)'],
    efectosAdversos: ['Nefrotoxicidad (dosis-dependiente)', 'HTA', 'Hipertricosis', 'Hiperplasia gingival', 'Temblor', 'Hiperlipidemia', '⚠️ Nefrotoxicidad crónica irreversible', '⚠️ Mayor riesgo de infecciones y neoplasias', '⚠️ Síndrome hemolítico urémico (raro)'],
    interacciones: ['Ketoconazol/eritromicina/diltiazem: aumentan niveles', 'Rifampicina/fenitoína: reducen niveles', 'AINEs: nefrotoxicidad aditiva', 'Aminoglucósidos: nefrotoxicidad sinérgica', 'Estatinas: riesgo de miopatía (preferir pravastatina)', 'Pomelo: aumenta niveles'],
    viaAdministracion: ['oral', 'IV'], dosis: { adulto: 'Trasplante: 5-15 mg/kg/día oral dividido en 2 tomas. AR: 2.5-4 mg/kg/día. Psoriasis: 2.5-5 mg/kg/día. IV: 1/3 de dosis oral en infusión 2-6h' },
    presentaciones: ['Cápsulas 25, 50, 100 mg (Neoral)', 'Solución oral 100 mg/mL', 'Ampollas 50 mg/mL', 'Emulsión oftálmica 0.05%'],
    embarazo: 'C', lactancia: 'Se excreta. Contraindicado.',
    cuidadosEnfermeria: ['Monitorizar niveles séricos (C0 o C2) estrictamente', 'Función renal basal y semanal al inicio', 'PA cada visita (HTA frecuente)', 'Neoral y Sandimmun NO son intercambiables', 'Tomar a la misma hora cada día, consistentemente con/sin alimentos', 'No tomar con pomelo', 'Higiene dental estricta (prevenir hiperplasia gingival)', 'IV: infusión lenta 2-6h por riesgo anafiláctico (Cremophor EL)'],
    farmacocinetica: { absorcion: 'Oral variable, Neoral biodisponibilidad ~30-40%', distribucion: 'Amplia, acumula en grasa', metabolismo: 'Hepático CYP3A4', excrecion: 'Fecal 90%, renal 6%', vidaMedia: '6-27 horas', inicioAccion: 'Días a semanas', duracionAccion: '12 horas' },
    almacenamiento: 'Temperatura ambiente. No refrigerar solución oral (gelifica).', unidadId: 'u08', capituloId: 'c08_04'
  },
  // ===== ANESTESIA =====
  {
    id: 'bupivacaina', nombre: 'Bupivacaína', nombreGenerico: 'Bupivacaína clorhidrato',
    nombresComerciales: ['Marcaine', 'Sensorcaine', 'Bupivacaína Braun'],
    familia: 'Anestésicos locales', clasificacion: 'Anestésico local amídico de larga duración',
    mecanismoAccion: 'Bloquea canales de sodio voltaje-dependientes en nervios periféricos, impidiendo la conducción del impulso nervioso. Mayor potencia y duración que lidocaína, pero mayor cardiotoxicidad.',
    indicaciones: ['Anestesia epidural (trabajo de parto, cirugía)', 'Bloqueo nervioso periférico', 'Anestesia raquídea/espinal', 'Infiltración local para cirugía', 'Bloqueo intercostal'],
    contraindicaciones: ['Hipersensibilidad a amidas', 'Bloqueo IV regional (Bier) — CONTRAINDICADO por cardiotoxicidad', 'Shock', 'Bloqueo cardíaco'],
    efectosAdversos: ['Hipotensión', 'Bradicardia', 'Temblor', 'Náuseas', 'Retención urinaria (epidural)', '⚠️ Cardiotoxicidad severa (arritmias, paro) si inyección intravascular', '⚠️ Toxicidad SNC: convulsiones, coma'],
    interacciones: ['Otros anestésicos locales: toxicidad aditiva', 'Betabloqueantes: bradicardia', 'Oxitocina: potencia hipotensión'],
    viaAdministracion: ['epidural', 'intratecal', 'SC'], dosis: { adulto: 'Epidural: 10-20 mL de 0.25-0.5%. Espinal: 1-3 mL de 0.5% hiperbárica. Infiltración: hasta 2 mg/kg (sin adrenalina), 3 mg/kg (con adrenalina). CON ADRENALINA: duración aumenta 50%' },
    presentaciones: ['Ampollas 0.25%, 0.5% (10, 20 mL)', 'Ampollas 0.5% hiperbárica (4 mL, espinal)', 'Con adrenalina 1:200,000'],
    embarazo: 'C', lactancia: 'Se excreta en mínimas cantidades. Compatible.',
    cuidadosEnfermeria: ['ASPIRAR siempre antes de inyectar (evitar inyección intravascular)', 'Monitorización ECG continua durante procedimiento', 'Tener emulsión lipídica 20% disponible (antídoto LAST)', 'NUNCA usar para bloqueo IV regional (Bier)', 'Espinal: nivel sensitivo esperado según dosis y posición', 'Vigilar hipotensión post-raquídea: efedrina/fenilefrina disponibles', 'Signos de toxicidad: sabor metálico, tinnitus, hormigueo perioral, convulsiones'],
    farmacocinetica: { absorcion: 'Depende del sitio y vascularidad', distribucion: 'Unión proteica 95%', metabolismo: 'Hepático CYP3A4', excrecion: 'Renal 5% sin cambios', vidaMedia: '2.7 horas (adulto), hasta 8h (neonato)', inicioAccion: 'Epidural: 10-20 min. Espinal: 1-3 min', duracionAccion: 'Epidural: 2-6h. Espinal: 1.5-3.5h' },
    almacenamiento: 'Temperatura ambiente. No autoclavar con adrenalina.', unidadId: 'u12', capituloId: 'c12_01'
  },
  {
    id: 'ropivacaina', nombre: 'Ropivacaína', nombreGenerico: 'Ropivacaína clorhidrato',
    nombresComerciales: ['Naropin'],
    familia: 'Anestésicos locales', clasificacion: 'Anestésico local amídico (enantiómero S puro)',
    mecanismoAccion: 'Enantiómero S puro de propivacaína. Bloquea canales de sodio con menor afinidad cardíaca que bupivacaína. Produce bloqueo diferencial motor/sensitivo: a bajas dosis bloquea más fibras sensitivas que motoras.',
    indicaciones: ['Anestesia epidural (trabajo de parto, cirugía)', 'Bloqueo nervioso periférico', 'Infiltración local', 'Analgesia postoperatoria continua'],
    contraindicaciones: ['Hipersensibilidad a amidas', 'Bloqueo IV regional', 'Anestesia espinal en obstetricia (no aprobado en todos los países)'],
    efectosAdversos: ['Hipotensión', 'Bradicardia', 'Náuseas', 'Parestesias', '⚠️ Menor cardiotoxicidad que bupivacaína (ventaja)'],
    interacciones: ['Otros anestésicos locales: toxicidad aditiva', 'Fluvoxamina: aumenta niveles (CYP1A2)'],
    viaAdministracion: ['epidural', 'SC'], dosis: { adulto: 'Epidural analgesia: 10-20 mL de 0.2%. Epidural quirúrgica: 15-25 mL de 0.75%. Bloqueo nervioso: 10-40 mL de 0.5-0.75%. Infiltración: hasta 3 mg/kg' },
    presentaciones: ['Ampollas 0.2%, 0.5%, 0.75%, 1% (10, 20 mL)', 'Bolsas para infusión 0.2% (100, 200 mL)'],
    embarazo: 'B', lactancia: 'Se excreta en mínimas cantidades. Compatible.',
    cuidadosEnfermeria: ['MENOS cardiotóxica que bupivacaína: preferida en epidural obstétrica', 'Bloqueo diferencial: a 0.2% analgesia sin bloqueo motor (ideal parto)', 'Aspirar antes de inyectar', 'Tener lipid rescue disponible', 'Monitorización ECG durante procedimiento', 'Paciente puede deambular con epidural a dosis bajas (walking epidural)'],
    farmacocinetica: { absorcion: 'Depende del sitio', distribucion: 'Unión proteica 94%', metabolismo: 'Hepático CYP1A2, CYP3A4', excrecion: 'Renal 86% (metabolitos)', vidaMedia: '1.8 horas', inicioAccion: 'Epidural: 10-20 min', duracionAccion: 'Epidural: 2-6h' },
    almacenamiento: 'Temperatura ambiente.', unidadId: 'u12', capituloId: 'c12_01'
  }
];

let added = 0;
for (const d of newDrugs) {
  if (existingIds.has(d.id)) { console.log('SKIP:', d.id); continue; }
  d.searchText = mkSearch(d);
  drugs.push(d);
  existingIds.add(d.id);
  for (const u of cats.unidades) {
    for (const c of u.capitulos) {
      if (c.id === d.capituloId && !c.drugIds.includes(d.id)) {
        c.drugIds.push(d.id);
      }
    }
  }
  added++;
}

fs.writeFileSync(drugsPath, JSON.stringify(drugs, null, 2), 'utf8');
fs.writeFileSync(catsPath, JSON.stringify(cats, null, 2), 'utf8');
console.log('Added: ' + added + '. Total drugs: ' + drugs.length);
