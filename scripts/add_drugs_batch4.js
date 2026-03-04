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
  // ===== OPIOIDES =====
  {
    id: 'metadona', nombre: 'Metadona', nombreGenerico: 'Metadona clorhidrato',
    nombresComerciales: ['Metasedin', 'Dolophine'], familia: 'Analgésicos opioides',
    clasificacion: 'Agonista opioide mu + antagonista NMDA',
    mecanismoAccion: 'Agonista opioide mu con antagonismo NMDA y efecto inhibidor de recaptación de serotonina y noradrenalina. El antagonismo NMDA le confiere eficacia en dolor neuropático y previene tolerancia.',
    indicaciones: ['Dolor crónico severo', 'Dolor oncológico', 'Dolor neuropático refractario', 'Tratamiento de mantenimiento de dependencia a opioides', 'Rotación opioide'],
    contraindicaciones: ['Depresión respiratoria', 'QTc prolongado', 'Uso de IMAO', 'Íleo paralítico'],
    efectosAdversos: ['Depresión respiratoria (tardía)', 'Náuseas', 'Estreñimiento', 'Sudoración', '⚠️ Prolongación QTc y Torsade de Pointes', '⚠️ Acumulación por vida media larga: riesgo de sobredosis tardía (día 3-5)', '⚠️ Depresión respiratoria puede ocurrir días después del inicio'],
    interacciones: ['Benzodiacepinas: depresión respiratoria fatal', 'Eritromicina/fluconazol: prolongan QTc y aumentan niveles', 'Rifampicina: reduce niveles', 'ISRS: síndrome serotoninérgico'],
    viaAdministracion: ['oral', 'IV', 'SC'], dosis: { adulto: 'Dolor: inicio 2.5-5 mg cada 8-12h. Titular MUY lentamente. Mantenimiento opioides: 20-30 mg/día, titular', ajusteRenal: 'No requiere ajuste significativo', ajusteHepatico: 'Reducir dosis y aumentar intervalos' },
    presentaciones: ['Comprimidos 5, 10, 40 mg', 'Solución oral 5 mg/mL', 'Ampollas 10 mg/mL'],
    embarazo: 'C', lactancia: 'Compatible a dosis de mantenimiento (<20 mg/día). Monitorizar neonato.',
    cuidadosEnfermeria: ['ECG basal y a los 30 días (vigilar QTc)', 'Vida media muy larga (15-60h): acumulación en primeros 5 días', 'NO titular más frecuente que cada 5-7 días', 'Efecto analgésico dura menos que vida media: riesgo acumulación', 'Tener naloxona disponible', 'En programa de mantenimiento: dispensación supervisada diaria'],
    farmacocinetica: { absorcion: 'Oral, biodisponibilidad 80%', metabolismo: 'Hepático CYP3A4, CYP2B6', excrecion: 'Renal y fecal', vidaMedia: '15-60 horas (muy variable)', inicioAccion: 'Oral: 30-60 min', duracionAccion: '4-8h analgesia (pero vida media mucho más larga)' },
    almacenamiento: 'Estupefaciente: control estricto.', unidadId: 'u01', capituloId: 'c01_02'
  },
  {
    id: 'hidromorfona', nombre: 'Hidromorfona', nombreGenerico: 'Hidromorfona clorhidrato',
    nombresComerciales: ['Dilaudid', 'Jurnista', 'Palladone'], familia: 'Analgésicos opioides',
    clasificacion: 'Agonista opioide mu (derivado semisintético de morfina)',
    mecanismoAccion: 'Agonista puro de receptores mu. 5-7 veces más potente que morfina. Menos metabolitos activos neurotóxicos que morfina (no produce M3G).',
    indicaciones: ['Dolor severo agudo y crónico', 'Dolor oncológico', 'Dolor postoperatorio severo', 'Alternativa en insuficiencia renal (sin metabolitos neurotóxicos activos)'],
    contraindicaciones: ['Depresión respiratoria', 'Asma aguda', 'Íleo paralítico', 'TCE con HTE'],
    efectosAdversos: ['Depresión respiratoria', 'Náuseas', 'Estreñimiento', 'Prurito', 'Sedación', '⚠️ Dependencia', '⚠️ Sobredosis: coma y paro respiratorio'],
    interacciones: ['Benzodiacepinas: depresión respiratoria', 'Alcohol: depresión SNC fatal', 'IMAO: crisis', 'Otros depresores SNC: aditivo'],
    viaAdministracion: ['oral', 'IV', 'SC', 'IM', 'rectal'], dosis: { adulto: 'Oral: 2-4 mg cada 4-6h. IV: 0.2-1 mg cada 2-3h. SC: 1-2 mg cada 4-6h. LP (Jurnista): 4-64 mg cada 24h', pediatrico: '0.03-0.08 mg/kg cada 4-6h', ajusteRenal: 'Preferida sobre morfina en IRC (sin M3G/M6G)' },
    presentaciones: ['Comprimidos 2, 4, 8 mg', 'Comprimidos LP 4, 8, 16, 32, 64 mg', 'Ampollas 1, 2, 4 mg/mL', 'Supositorios 3 mg'],
    embarazo: 'C', lactancia: 'Se excreta. Precaución.',
    cuidadosEnfermeria: ['5-7x más potente que morfina: ¡cuidado con dosis!', 'Preferida en insuficiencia renal sobre morfina', 'Monitorizar FR (no dar si <12 rpm)', 'IV: administrar lentamente en 2-3 min', 'No triturar LP', 'Naloxona como antídoto'],
    farmacocinetica: { absorcion: 'Oral, biodisponibilidad 24%', metabolismo: 'Hepático glucuronidación (no CYP)', excrecion: 'Renal', vidaMedia: '2-3 horas', inicioAccion: 'Oral: 30 min. IV: 5 min', picoAccion: 'Oral: 1h. IV: 10-20 min', duracionAccion: '4-5 horas' },
    almacenamiento: 'Estupefaciente: bajo llave.', unidadId: 'u01', capituloId: 'c01_02'
  },
  // ===== ANTIBIÓTICOS =====
  {
    id: 'ceftazidima_avibactam', nombre: 'Ceftazidima/Avibactam', nombreGenerico: 'Ceftazidima + Avibactam',
    nombresComerciales: ['Zavicefta', 'Avycaz'], familia: 'Cefalosporinas + inhibidor de betalactamasa',
    clasificacion: 'Antibiótico betalactámico anti-KPC',
    mecanismoAccion: 'Ceftazidima inhibe síntesis de pared celular (PBP). Avibactam es un inhibidor de betalactamasas no betalactámico que inhibe clases A (KPC, BLEE), C (AmpC) y algunas D (OXA-48). Restaura actividad contra Enterobacterias productoras de carbapenemasas KPC.',
    indicaciones: ['Infecciones por Enterobacterias productoras de KPC', 'ITU complicada', 'Infección intraabdominal complicada (con metronidazol)', 'Neumonía nosocomial/asociada a ventilador'],
    contraindicaciones: ['Alergia a cefalosporinas con anafilaxia'],
    efectosAdversos: ['Diarrea', 'Náuseas', 'Vómitos', '⚠️ C. difficile', '⚠️ Convulsiones (en IRC sin ajuste de dosis)'],
    interacciones: ['Probenecid: aumenta niveles', 'No antagonismo con otros antibióticos'],
    viaAdministracion: ['IV'], dosis: { adulto: '2.5 g (2g/0.5g) cada 8h en infusión 2h', ajusteRenal: 'ClCr 31-50: 1.25g/8h. ClCr 16-30: 0.94g/12h. ClCr 6-15: 0.94g/24h' },
    presentaciones: ['Viales 2.5 g (2 g ceftazidima + 0.5 g avibactam)'],
    embarazo: 'B', lactancia: 'Precaución.',
    cuidadosEnfermeria: ['Infusión en 2 HORAS (no menos)', 'Reservar para bacterias productoras de KPC/BLEE confirmadas', 'Ajustar dosis renal estrictamente (riesgo convulsiones)', 'No activo contra metalo-betalactamasas (NDM, VIM)', 'IAb: siempre combinar con metronidazol'],
    farmacocinetica: { metabolismo: 'Mínimo', excrecion: 'Renal >90%', vidaMedia: 'Ceftazidima: 2.7h. Avibactam: 2.7h', inicioAccion: 'Inmediato', duracionAccion: '8 horas' },
    almacenamiento: 'Reconstituido: 12h a TA.', unidadId: 'u03', capituloId: 'c03_01'
  },
  {
    id: 'meropenem_vaborbactam', nombre: 'Meropenem/Vaborbactam', nombreGenerico: 'Meropenem + Vaborbactam',
    nombresComerciales: ['Vaborem', 'Vabomere'], familia: 'Carbapenémicos + inhibidor de betalactamasa',
    clasificacion: 'Antibiótico carbapenémico anti-KPC',
    mecanismoAccion: 'Meropenem inhibe síntesis de pared celular. Vaborbactam es un inhibidor de betalactamasas de ácido borónico que inhibe KPC y otras serina-betalactamasas (clase A). Restaura actividad de meropenem contra KPC.',
    indicaciones: ['Infecciones por Enterobacterias productoras de KPC resistentes a carbapenémicos', 'ITU complicada (pielonefritis)', 'Infección intraabdominal complicada', 'Neumonía nosocomial'],
    contraindicaciones: ['Alergia a carbapenémicos'],
    efectosAdversos: ['Cefalea', 'Diarrea', 'Flebitis', '⚠️ Convulsiones', '⚠️ C. difficile'],
    interacciones: ['Ácido valproico: reduce niveles significativamente (evitar)', 'Probenecid: aumenta niveles'],
    viaAdministracion: ['IV'], dosis: { adulto: '4 g (2g/2g) cada 8h en infusión 3h', ajusteRenal: 'ClCr 30-49: 2g/8h. ClCr 15-29: 2g/12h. ClCr <15: 1g/12h' },
    presentaciones: ['Viales 4 g (2 g meropenem + 2 g vaborbactam)'],
    embarazo: 'B', lactancia: 'Precaución.',
    cuidadosEnfermeria: ['Infusión en 3 HORAS', 'Reservar para KPC confirmada', 'No combinar con valproico', 'Ajuste renal obligatorio', 'Alternativa a ceftazidima/avibactam para KPC'],
    farmacocinetica: { metabolismo: 'Meropenem: hidrólisis renal. Vaborbactam: mínimo', excrecion: 'Renal >90%', vidaMedia: 'Meropenem: 1.2h. Vaborbactam: 1.7h', inicioAccion: 'Inmediato', duracionAccion: '8 horas' },
    almacenamiento: 'Reconstituido: 4h a TA.', unidadId: 'u03', capituloId: 'c03_03'
  },
  {
    id: 'plazomicina', nombre: 'Plazomicina', nombreGenerico: 'Plazomicina sulfato',
    nombresComerciales: ['Zemdri'], familia: 'Aminoglucósidos',
    clasificacion: 'Aminoglucósido de nueva generación (resistente a enzimas modificadoras)',
    mecanismoAccion: 'Inhibe síntesis proteica bacteriana uniéndose a la subunidad 30S ribosomal. Modificaciones moleculares le confieren resistencia a la mayoría de enzimas aminoglucósido-modificadoras (AAC, ANT, APH).',
    indicaciones: ['ITU complicada (pielonefritis) por Enterobacterias multirresistentes', 'Bacteriemia por gram-negativos resistentes a aminoglucósidos clásicos'],
    contraindicaciones: ['Hipersensibilidad a aminoglucósidos', 'Miastenia gravis'],
    efectosAdversos: ['Nefrotoxicidad', 'Ototoxicidad', 'Diarrea', '⚠️ Nefrotoxicidad acumulativa', '⚠️ Ototoxicidad irreversible (vestibular y coclear)'],
    interacciones: ['Otros nefrotóxicos: toxicidad aditiva', 'Diuréticos de asa: ototoxicidad', 'BNM: prolonga bloqueo neuromuscular'],
    viaAdministracion: ['IV'], dosis: { adulto: '15 mg/kg IV cada 24h (infusión 30 min). ITU: 5 días. Bacteriemia: 7-14 días', ajusteRenal: 'Ajustar según niveles valle (monitorización obligatoria)' },
    presentaciones: ['Viales 500 mg/10 mL'],
    embarazo: 'D', lactancia: 'Precaución.',
    cuidadosEnfermeria: ['Monitorizar niveles séricos valle OBLIGATORIO (<3 μg/mL)', 'Creatinina basal y cada 48-72h', 'Audiometría basal si tratamiento >5 días', 'Hidratación adecuada (protección renal)', 'Ventaja: activo contra cepas resistentes a gentamicina/amikacina', 'Dosis única diaria optimiza eficacia y reduce toxicidad'],
    farmacocinetica: { distribucion: 'Extracelular. Pobre penetración SNC', metabolismo: 'No metabolizado', excrecion: 'Renal >90% sin cambios', vidaMedia: '3.5 horas', inicioAccion: 'Inmediato', duracionAccion: '24 horas (efecto post-antibiótico)' },
    almacenamiento: 'Refrigerar. Diluido: 24h a TA.', unidadId: 'u03', capituloId: 'c03_03'
  },
  // ===== CARDIOVASCULAR =====
  {
    id: 'vernakalant', nombre: 'Vernakalant', nombreGenerico: 'Vernakalant clorhidrato',
    nombresComerciales: ['Brinavess'], familia: 'Antiarrítmicos',
    clasificacion: 'Antiarrítmico auricular selectivo (bloqueante multicanal)',
    mecanismoAccion: 'Bloquea selectivamente canales iónicos predominantes en aurículas (IKur, IKACh, INa auricular). Selectividad auricular minimiza efectos proarrítmicos ventriculares.',
    indicaciones: ['Cardioversión farmacológica rápida de FA reciente (<7 días)', 'FA postoperatoria (<3 días)'],
    contraindicaciones: ['FA >7 días', 'IC clase III-IV', 'QTc >440 ms', 'PAS <100 mmHg', 'Estenosis aórtica severa', 'SCA en últimos 30 días', 'Bradicardia <55 lpm'],
    efectosAdversos: ['Disgeusia (sabor alterado)', 'Estornudos', 'Parestesias', 'Hipotensión', 'Bradicardia', '⚠️ Flutter auricular con conducción 1:1 (raro)'],
    interacciones: ['Fármacos que prolongan QT: precaución', 'No usar dentro de 4h de antiarrítmicos IV clase I/III'],
    viaAdministracion: ['IV'], dosis: { adulto: '3 mg/kg IV en 10 min. Si no convierte en 15 min: segunda dosis 2 mg/kg en 10 min' },
    presentaciones: ['Viales 200 mg/20 mL'],
    embarazo: 'C', lactancia: 'Se desconoce.',
    cuidadosEnfermeria: ['Administrar SOLO bajo monitorización ECG continua', 'Infusión en exactamente 10 min', 'Conversión habitualmente en 8-14 min', 'FA reciente (<7 días) responde mejor', 'Si convierte: no dar segunda dosis', 'Monitorizar PA y ECG 2h post-infusión'],
    farmacocinetica: { metabolismo: 'Hepático CYP2D6', excrecion: 'Renal', vidaMedia: '3 horas', inicioAccion: '8-14 minutos', duracionAccion: '2-4 horas' },
    almacenamiento: 'Refrigerar.', unidadId: 'u02', capituloId: 'c02_02'
  },
  {
    id: 'dapagliflozina_cv', nombre: 'Dapagliflozina (IC/ERC)', nombreGenerico: 'Dapagliflozina',
    nombresComerciales: ['Forxiga', 'Farxiga'], familia: 'Cardio-nefroprotectores',
    clasificacion: 'Inhibidor de SGLT2 (gliflozina) — indicación cardiovascular y renal',
    mecanismoAccion: 'Inhibe cotransportador SGLT2 en túbulo proximal renal, reduciendo reabsorción de glucosa y sodio. Efectos pleotrópicos: natriuresis, reducción de precarga, mejora del metabolismo energético miocárdico (switch de glucosa a cetonas), reducción de presión intraglomerular.',
    indicaciones: ['Insuficiencia cardíaca con FE reducida (con o sin diabetes)', 'Insuficiencia cardíaca con FE preservada', 'Enfermedad renal crónica (con o sin diabetes)', 'Diabetes mellitus tipo 2'],
    contraindicaciones: ['Cetoacidosis diabética', 'ClCr <20 mL/min (para inicio; puede continuarse si ya está en tratamiento)'],
    efectosAdversos: ['Infección genital micótica (candidiasis)', 'ITU', 'Poliuria', 'Hipotensión', '⚠️ Cetoacidosis diabética euglucémica (rara)', '⚠️ Gangrena de Fournier (extremadamente rara)'],
    interacciones: ['Insulina/sulfonilureas: reducir dosis (hipoglucemia)', 'Diuréticos de asa: hipotensión y deshidratación aditiva'],
    viaAdministracion: ['oral'], dosis: { adulto: 'IC: 10 mg/día. ERC: 10 mg/día. DM2: 10 mg/día' },
    presentaciones: ['Comprimidos 5, 10 mg'],
    embarazo: 'C', lactancia: 'Se excreta. No recomendado.',
    cuidadosEnfermeria: ['Pilar del tratamiento moderno de IC (junto con ARNI, BB, ARM)', 'Beneficio en IC CON y SIN diabetes', 'DAPA-HF y DAPA-CKD: estudios pivotales', 'Vigilar síntomas de candidiasis genital', 'Educación: higiene genital, hidratación', 'Suspender 3 días antes de cirugía mayor (riesgo cetoacidosis)', 'Monitorizar función renal y PA'],
    farmacocinetica: { absorcion: 'Oral, biodisponibilidad 78%', metabolismo: 'Hepático UGT1A9', excrecion: 'Renal 75%, fecal 21%', vidaMedia: '12.9 horas', inicioAccion: 'Horas (diuresis), semanas (beneficio CV)', duracionAccion: '24 horas' },
    almacenamiento: 'Temperatura ambiente.', unidadId: 'u02', capituloId: 'c02_04'
  },
  // ===== DIGESTIVO =====
  {
    id: 'eluxadolina', nombre: 'Eluxadolina', nombreGenerico: 'Eluxadolina',
    nombresComerciales: ['Viberzi', 'Truberzi'], familia: 'Antidiarreicos',
    clasificacion: 'Agonista mu/kappa y antagonista delta opioide intestinal',
    mecanismoAccion: 'Agonista de receptores mu y kappa y antagonista de receptores delta opioides en el tracto GI. Reduce motilidad intestinal, secreción y dolor visceral sin efectos centrales ni estreñimiento severo.',
    indicaciones: ['Síndrome de intestino irritable con diarrea (SII-D)'],
    contraindicaciones: ['Ausencia de vesícula biliar (colecistectomizados)', 'Pancreatitis', 'Obstrucción biliar', 'Alcoholismo activo', 'Insuficiencia hepática grave'],
    efectosAdversos: ['Estreñimiento', 'Náuseas', 'Dolor abdominal', '⚠️ Espasmo del esfínter de Oddi (especialmente sin vesícula)', '⚠️ Pancreatitis'],
    interacciones: ['Inhibidores OATP1B1 (ciclosporina, gemfibrozil): contraindicado', 'Opioides: estreñimiento aditivo', 'Alosetron: no combinar'],
    viaAdministracion: ['oral'], dosis: { adulto: '100 mg cada 12h con alimentos. Sin vesícula o inhibidores OATP1B1: 75 mg/12h (contraindicado según guías)' },
    presentaciones: ['Comprimidos 75, 100 mg'],
    embarazo: 'C', lactancia: 'Se desconoce.',
    cuidadosEnfermeria: ['CONTRAINDICADO en colecistectomizados (riesgo espasmo Oddi)', 'Tomar con alimentos', 'Evaluar consumo de alcohol antes de prescribir', 'Suspender si dolor abdominal severo nuevo', 'No produce euforia ni dependencia (acción local)'],
    farmacocinetica: { absorcion: 'Oral, biodisponibilidad baja', metabolismo: 'Hepático CYP', excrecion: 'Fecal 82%', vidaMedia: '3.7-6 horas', inicioAccion: 'Horas a días', duracionAccion: '12 horas' },
    almacenamiento: 'Temperatura ambiente.', unidadId: 'u05', capituloId: 'c05_05'
  },
  {
    id: 'budesonida_enteral', nombre: 'Budesonida enteral', nombreGenerico: 'Budesonida (liberación ileal)',
    nombresComerciales: ['Entocort', 'Cortiment', 'Budenofalk'], familia: 'Antiinflamatorios intestinales',
    clasificacion: 'Corticoide tópico intestinal (alta actividad local, bajo efecto sistémico)',
    mecanismoAccion: 'Corticoide con alta afinidad por receptor glucocorticoide y extenso metabolismo de primer paso hepático (90%), lo que limita efectos sistémicos. Formulaciones de liberación controlada actúan en íleon terminal o colon.',
    indicaciones: ['Enfermedad de Crohn ileocecal leve a moderada', 'Colitis ulcerosa leve a moderada (Cortiment)', 'Colitis microscópica', 'Hepatitis autoinmune (budesonida oral estándar)'],
    contraindicaciones: ['Infección intestinal activa', 'Cirrosis hepática (pierde efecto de primer paso)'],
    efectosAdversos: ['Cefalea', 'Náuseas', 'Dispepsia', 'Acné', 'Menores efectos cushing que prednisona', '⚠️ Insuficiencia suprarrenal al suspender (reducir gradualmente)'],
    interacciones: ['Ketoconazol/itraconazol: aumentan niveles sistémicos 6x', 'Pomelo: aumenta exposición', 'CYP3A4 inhibidores: precaución'],
    viaAdministracion: ['oral'], dosis: { adulto: 'Crohn: 9 mg/día (3 mg cada 8h) x 8 sem, luego reducir 3 mg cada 2 sem. CU (Cortiment): 9 mg/día x 8 sem' },
    presentaciones: ['Cápsulas Entocort 3 mg (liberación ileal)', 'Comprimidos Cortiment 9 mg (liberación colónica)', 'Cápsulas Budenofalk 3 mg'],
    embarazo: 'C', lactancia: 'Se excreta. Probablemente seguro a dosis bajas.',
    cuidadosEnfermeria: ['Menores efectos sistémicos que prednisona: preferida en brotes leves-moderados', 'No triturar ni masticar (liberación controlada)', 'No tomar con pomelo', 'Reducir gradualmente al suspender (no abrupto)', 'En cirrosis pierde ventaja de primer paso'],
    farmacocinetica: { absorcion: 'Oral, biodisponibilidad 10% (alto primer paso)', metabolismo: 'Hepático CYP3A4 (90% primer paso)', excrecion: 'Renal 70%', vidaMedia: '2-3 horas', inicioAccion: 'Días', duracionAccion: '8-24 horas (según formulación)' },
    almacenamiento: 'Temperatura ambiente.', unidadId: 'u05', capituloId: 'c05_03'
  },
  // ===== ENDOCRINO =====
  {
    id: 'levotiroxina_iv', nombre: 'Levotiroxina IV', nombreGenerico: 'Levotiroxina sódica IV',
    nombresComerciales: ['Synthroid IV', 'Tirosint IV'], familia: 'Hormonas tiroideas',
    clasificacion: 'Hormona tiroidea (T4) intravenosa',
    mecanismoAccion: 'T4 sintética idéntica a la hormona endógena. Se convierte periféricamente a T3 (forma activa). Vía IV para emergencias cuando la oral no es posible.',
    indicaciones: ['Coma mixedematoso (emergencia endocrina)', 'Hipotiroidismo severo cuando vía oral imposible', 'Perioperatorio en pacientes hipotiroideos'],
    contraindicaciones: ['Insuficiencia suprarrenal no tratada (dar hidrocortisona primero)', 'IAM agudo sin hipotiroidismo', 'Tirotoxicosis'],
    efectosAdversos: ['Taquicardia', 'Arritmias', 'Angina', 'Diaforesis', '⚠️ IAM por aumento de demanda metabólica', '⚠️ Insuficiencia suprarrenal si no se corrige antes'],
    interacciones: ['Anticoagulantes orales: aumenta efecto (ajustar)', 'Insulina: puede necesitar ajuste', 'Colestiramina: no aplica IV'],
    viaAdministracion: ['IV'], dosis: { adulto: 'Coma mixedematoso: 200-500 mcg IV bolo inicial, luego 50-100 mcg/día IV. Sustitución: 50-80% de dosis oral IV' },
    presentaciones: ['Viales 100, 200, 500 mcg'],
    embarazo: 'A', lactancia: 'Compatible.',
    cuidadosEnfermeria: ['COMA MIXEDEMATOSO: emergencia con 30-60% mortalidad', 'SIEMPRE dar hidrocortisona 100 mg IV ANTES (insuficiencia suprarrenal concomitante)', 'Monitorización ECG continua', 'UCI obligatoria', 'Bolo IV directo lento', 'Dosis IV = 50-80% de dosis oral habitual'],
    farmacocinetica: { distribucion: 'Unión proteica 99%', metabolismo: 'Desyodación periférica a T3', excrecion: 'Renal y fecal', vidaMedia: '6-7 días', inicioAccion: 'IV: 6-8 horas', duracionAccion: 'Días' },
    almacenamiento: 'Refrigerar. Reconstituido: usar inmediatamente.', unidadId: 'u06', capituloId: 'c06_02'
  },
  // ===== HEMATOLOGÍA =====
  {
    id: 'romiplostim', nombre: 'Romiplostim', nombreGenerico: 'Romiplostim',
    nombresComerciales: ['Nplate'], familia: 'Estimulantes de trombopoyesis',
    clasificacion: 'Agonista del receptor de TPO (peptibody)',
    mecanismoAccion: 'Proteína de fusión Fc-péptido (peptibody) que se une al dominio extracelular del receptor de TPO (c-Mpl), activando vías JAK/STAT y estimulando producción de plaquetas. No compite con TPO endógena.',
    indicaciones: ['Trombocitopenia inmune (PTI) crónica refractaria a corticoides y/o esplenectomía', 'PTI de novo cuando otros tratamientos no son adecuados'],
    contraindicaciones: ['Hipersensibilidad'],
    efectosAdversos: ['Cefalea', 'Artralgias', 'Mareo', 'Insomnio', '⚠️ Trombosis/tromboembolismo', '⚠️ Fibrosis de médula ósea (uso prolongado)', '⚠️ Rebote de trombocitopenia al suspender'],
    interacciones: ['No interacciones farmacológicas significativas', 'Puede reducir necesidad de corticoides e inmunosupresores'],
    viaAdministracion: ['SC'], dosis: { adulto: 'Inicio: 1 mcg/kg SC semanal. Ajustar cada semana en 1 mcg/kg para mantener plaquetas ≥50,000. Máx: 10 mcg/kg/semana' },
    presentaciones: ['Viales 125, 250, 500 mcg (liofilizado)'],
    embarazo: 'C', lactancia: 'Se desconoce.',
    cuidadosEnfermeria: ['Plaquetas semanales hasta estabilizar, luego mensual', 'Objetivo: plaquetas ≥50,000 (no normalizar)', 'Titular semanalmente según respuesta', 'Frotis periférico anual (fibrosis MO)', 'Al suspender: plaquetas pueden caer debajo del basal (vigilar 2 semanas)', 'Solo SC, nunca IV'],
    farmacocinetica: { absorcion: 'SC', metabolismo: 'Degradación proteolítica', vidaMedia: '3.5 días', inicioAccion: '5-14 días', picoAccion: '12-16 días', duracionAccion: '7 días' },
    almacenamiento: 'Refrigerar 2-8°C. Reconstituido: usar en 24h refrigerado.', unidadId: 'u10', capituloId: 'c10_02'
  },
  // ===== RESPIRATORIO =====
  {
    id: 'pirfenidona', nombre: 'Pirfenidona', nombreGenerico: 'Pirfenidona',
    nombresComerciales: ['Esbriet', 'Pirespa'], familia: 'Antifibróticos pulmonares',
    clasificacion: 'Agente antifibrótico y antiinflamatorio',
    mecanismoAccion: 'Mecanismo no completamente elucidado. Inhibe TGF-β, reduce proliferación de fibroblastos, disminuye producción de colágeno y matriz extracelular. Efecto antiinflamatorio al reducir TNF-α e IL-1β.',
    indicaciones: ['Fibrosis pulmonar idiopática (FPI) leve a moderada'],
    contraindicaciones: ['Insuficiencia hepática grave', 'Uso con fluvoxamina (inhibidor CYP1A2 potente)'],
    efectosAdversos: ['Náuseas (muy frecuente)', 'Rash/fotosensibilidad', 'Fatiga', 'Diarrea', 'Anorexia', '⚠️ Hepatotoxicidad', '⚠️ Fotosensibilidad severa'],
    interacciones: ['Fluvoxamina: contraindicado (aumenta niveles 6x)', 'Ciprofloxacino: aumenta niveles', 'Omeprazol: puede aumentar niveles', 'Tabaco: reduce niveles (inductor CYP1A2)'],
    viaAdministracion: ['oral'], dosis: { adulto: 'Semana 1: 267 mg cada 8h. Semana 2: 534 mg cada 8h. Semana 3+: 801 mg cada 8h (dosis plena)' },
    presentaciones: ['Cápsulas 267 mg', 'Comprimidos 267, 801 mg'],
    embarazo: 'C', lactancia: 'Se desconoce.',
    cuidadosEnfermeria: ['Titular gradualmente en 2 semanas para mejorar tolerancia GI', 'Tomar CON alimentos (reduce náuseas)', 'Protección solar ESTRICTA: sombrero, manga larga, SPF 50+', 'Función hepática basal y mensual x 6 meses, luego trimestral', 'No detiene la FPI: enlentece la progresión', 'Si náuseas severas: reducir temporalmente a dosis previa tolerada'],
    farmacocinetica: { absorcion: 'Oral, aumenta con alimentos', metabolismo: 'Hepático CYP1A2 (70-80%)', excrecion: 'Renal 80%', vidaMedia: '3 horas', inicioAccion: 'Semanas a meses', duracionAccion: '8 horas' },
    almacenamiento: 'Temperatura ambiente.', unidadId: 'u04', capituloId: 'c04_05'
  },
  {
    id: 'nintedanib', nombre: 'Nintedanib', nombreGenerico: 'Nintedanib esilato',
    nombresComerciales: ['Ofev', 'Vargatef'], familia: 'Antifibróticos pulmonares',
    clasificacion: 'Inhibidor triple de tirosina quinasa (VEGFR, FGFR, PDGFR)',
    mecanismoAccion: 'Inhibe receptores de VEGF, FGF y PDGF, bloqueando vías de señalización implicadas en la proliferación de fibroblastos, migración y transformación en miofibroblastos. Reduce la fibrosis pulmonar.',
    indicaciones: ['Fibrosis pulmonar idiopática (FPI)', 'Enfermedad pulmonar intersticial asociada a esclerosis sistémica', 'Fibrosis pulmonar progresiva (no FPI)'],
    contraindicaciones: ['Insuficiencia hepática moderada-grave (Child-Pugh B/C)', 'Embarazo'],
    efectosAdversos: ['Diarrea (muy frecuente, 60%)', 'Náuseas', 'Vómitos', 'Dolor abdominal', 'Elevación de transaminasas', '⚠️ Hepatotoxicidad', '⚠️ Perforación GI (raro)', '⚠️ Sangrado'],
    interacciones: ['Ketoconazol: aumenta niveles', 'Rifampicina: reduce niveles', 'Anticoagulantes: mayor riesgo de sangrado'],
    viaAdministracion: ['oral'], dosis: { adulto: '150 mg cada 12h con alimentos. Si intolerancia: reducir a 100 mg/12h temporalmente' },
    presentaciones: ['Cápsulas 100, 150 mg'],
    embarazo: 'X', lactancia: 'Contraindicado.',
    cuidadosEnfermeria: ['Diarrea es el EA más frecuente: tratar con loperamida, hidratar', 'Tomar CON alimentos', 'Función hepática basal y mensual x 3 meses, luego periódicamente', 'Anticoncepción obligatoria en mujeres fértiles', 'Si diarrea severa: reducir a 100 mg/12h', 'Complementario con pirfenidona (ambos enlentecen FPI)'],
    farmacocinetica: { absorcion: 'Oral, biodisponibilidad 5% (aumenta con alimentos)', metabolismo: 'Hepático (hidrólisis por esterasas)', excrecion: 'Fecal 93%', vidaMedia: '10-15 horas', inicioAccion: 'Semanas', duracionAccion: '12 horas' },
    almacenamiento: 'Temperatura ambiente. Proteger de humedad.', unidadId: 'u04', capituloId: 'c04_05'
  },
  // ===== DERMATOLOGÍA =====
  {
    id: 'secukinumab', nombre: 'Secukinumab', nombreGenerico: 'Secukinumab',
    nombresComerciales: ['Cosentyx'], familia: 'Anticuerpos monoclonales',
    clasificacion: 'Anti-IL-17A (anticuerpo monoclonal humano)',
    mecanismoAccion: 'Se une selectivamente a IL-17A, citocina proinflamatoria clave en la vía Th17. Bloquea la activación de queratinocitos y la cascada inflamatoria en psoriasis.',
    indicaciones: ['Psoriasis en placas moderada a grave', 'Artritis psoriásica', 'Espondilitis anquilosante', 'Espondiloartritis axial no radiográfica'],
    contraindicaciones: ['Infección activa grave', 'Hipersensibilidad', 'Enfermedad de Crohn activa (puede empeorar)'],
    efectosAdversos: ['Infecciones respiratorias superiores', 'Nasofaringitis', 'Diarrea', 'Candidiasis mucocutánea', '⚠️ Enfermedad de Crohn: puede exacerbar o causar de novo'],
    interacciones: ['Vacunas vivas: evitar', 'CYP450: puede normalizar niveles de sustratos CYP al reducir inflamación'],
    viaAdministracion: ['SC'], dosis: { adulto: 'Psoriasis: 300 mg SC semanas 0,1,2,3,4, luego cada 4 semanas. APs/EA: 150 mg mismo esquema (puede aumentar a 300 mg)' },
    presentaciones: ['Jeringa precargada 150, 300 mg', 'Pluma precargada 150, 300 mg'],
    embarazo: 'B', lactancia: 'Probablemente seguro.',
    cuidadosEnfermeria: ['Screening TB antes de iniciar', 'Puede autoadministrarse', 'Inducción semanal x 5 semanas, luego mensual', 'Advertir: candidiasis oral/genital más frecuente', 'NO usar si enfermedad de Crohn activa', 'Alta tasa de aclaramiento PASI 90/100 en psoriasis'],
    farmacocinetica: { absorcion: 'SC, biodisponibilidad 73%', metabolismo: 'Degradación proteolítica', vidaMedia: '27 días', inicioAccion: '1-2 semanas', duracionAccion: '4 semanas' },
    almacenamiento: 'Refrigerar 2-8°C.', unidadId: 'u09', capituloId: 'c09_06'
  },
  // ===== NEUROLOGÍA =====
  {
    id: 'brivaracetam', nombre: 'Brivaracetam', nombreGenerico: 'Brivaracetam',
    nombresComerciales: ['Briviact'], familia: 'Anticonvulsivantes',
    clasificacion: 'Ligando selectivo de alta afinidad de SV2A',
    mecanismoAccion: 'Se une a la proteína vesicular sináptica SV2A con afinidad 15-30 veces mayor que levetiracetam. Modula la liberación de neurotransmisores excitatorios. Menor efecto sobre irritabilidad que levetiracetam.',
    indicaciones: ['Epilepsia focal (parcial) como adyuvante (≥4 años)', 'Alternativa a levetiracetam con mejor tolerabilidad conductual'],
    contraindicaciones: ['Hipersensibilidad'],
    efectosAdversos: ['Somnolencia', 'Mareo', 'Fatiga', 'Náuseas', 'Irritabilidad (menor que levetiracetam)'],
    interacciones: ['Rifampicina: reduce niveles 45%', 'Carbamazepina: aumenta metabolito tóxico de CBZ', 'Fenitoína: aumenta niveles de fenitoína'],
    viaAdministracion: ['oral', 'IV'], dosis: { adulto: '25-100 mg cada 12h. Inicio habitual: 50 mg/12h. IV: misma dosis', ajusteHepatico: '25 mg/12h en todas las categorías Child-Pugh. Máx: 75 mg/12h' },
    presentaciones: ['Comprimidos 10, 25, 50, 75, 100 mg', 'Solución oral 10 mg/mL', 'Solución IV 10 mg/mL'],
    embarazo: 'C', lactancia: 'Se excreta. Evaluar riesgo/beneficio.',
    cuidadosEnfermeria: ['Menos irritabilidad/agresividad que levetiracetam', 'No requiere titulación: dosis terapéutica desde día 1', 'Conversión IV-oral 1:1', 'Puede darse sin relación con alimentos', 'Monitorizar humor y comportamiento'],
    farmacocinetica: { absorcion: 'Oral rápida, biodisponibilidad ~100%', metabolismo: 'Hepático (hidrólisis + CYP2C19)', excrecion: 'Renal >95% (metabolitos)', vidaMedia: '9 horas', inicioAccion: '1 hora', picoAccion: '1 hora', duracionAccion: '12 horas' },
    almacenamiento: 'Temperatura ambiente.', unidadId: 'u01', capituloId: 'c01_04'
  },
  // ===== REUMATOLOGÍA =====
  {
    id: 'baricitinib', nombre: 'Baricitinib', nombreGenerico: 'Baricitinib',
    nombresComerciales: ['Olumiant'], familia: 'Inmunosupresores',
    clasificacion: 'Inhibidor selectivo de JAK1/JAK2',
    mecanismoAccion: 'Inhibe selectivamente JAK1 y JAK2, bloqueando señalización de múltiples citocinas proinflamatorias (IL-6, IL-12, IL-23, IFN-γ). Aprobado también para COVID-19 hospitalizado.',
    indicaciones: ['Artritis reumatoide moderada a severa', 'Dermatitis atópica moderada a severa', 'Alopecia areata', 'COVID-19 hospitalizado (con corticoides)'],
    contraindicaciones: ['Infección activa grave', 'Linfopenia <500', 'Neutropenia <1000', 'Hemoglobina <8 g/dL', 'Tuberculosis activa'],
    efectosAdversos: ['Infecciones respiratorias', 'Herpes zóster', 'Elevación de colesterol', 'Trombocitosis', '⚠️ TEV (especialmente a dosis altas)', '⚠️ Eventos CV mayores (FDA warning >65 años)', '⚠️ Neoplasias'],
    interacciones: ['Inhibidores CYP3A4 potentes: no requiere ajuste (metabolismo mínimo CYP)', 'Probenecid: duplica niveles (reducir dosis)', 'Vacunas vivas: contraindicadas', 'No combinar con biológicos'],
    viaAdministracion: ['oral'], dosis: { adulto: 'AR: 2-4 mg/día. DA: 2-4 mg/día. Alopecia: 2-4 mg/día. COVID: 4 mg/día x 14 días', ajusteRenal: '2 mg/día si ClCr 30-60. No recomendado <30', ajusteHepatico: 'No recomendado en grave' },
    presentaciones: ['Comprimidos 1, 2, 4 mg'],
    embarazo: 'C', lactancia: 'Se desconoce. No recomendado.',
    cuidadosEnfermeria: ['Screening TB y hepatitis B/C antes de iniciar', 'Hemograma y perfil lipídico basales y a las 12 semanas', 'Vacuna herpes zóster antes de iniciar', 'Primer JAKi aprobado para alopecia areata', 'FDA warning: riesgo CV y neoplásico en >65 con factores de riesgo'],
    farmacocinetica: { absorcion: 'Oral, biodisponibilidad 79%', metabolismo: 'Hepático CYP3A4 (<10%)', excrecion: 'Renal 75%', vidaMedia: '12 horas', inicioAccion: 'Semanas', picoAccion: '1 hora', duracionAccion: '24 horas' },
    almacenamiento: 'Temperatura ambiente.', unidadId: 'u08', capituloId: 'c08_04'
  },
  // ===== OBSTETRICIA =====
  {
    id: 'betametasona_prenatal', nombre: 'Betametasona prenatal', nombreGenerico: 'Betametasona fosfato/acetato',
    nombresComerciales: ['Celestone Cronodose', 'Betametasona Depot'], familia: 'Corticosteroides prenatales',
    clasificacion: 'Glucocorticoide para maduración pulmonar fetal',
    mecanismoAccion: 'Cruza la barrera placentaria estimulando la producción de surfactante pulmonar fetal por neumocitos tipo II. Acelera la maduración pulmonar reduciendo síndrome de distrés respiratorio neonatal.',
    indicaciones: ['Amenaza de parto prematuro (24-34 semanas)', 'Maduración pulmonar fetal antes de cesárea electiva <39 semanas', 'Rotura prematura de membranas pretérmino'],
    contraindicaciones: ['Corioamnionitis activa (relativa)', 'Parto inminente imposible de detener'],
    efectosAdversos: ['Hiperglucemia materna (transitoria)', 'Leucocitosis transitoria', 'Insomnio', 'Reducción de movimientos fetales (24-48h)', '⚠️ Riesgo de infección materna si RPM', '⚠️ Ciclos repetidos: menor peso al nacer'],
    interacciones: ['Tocolíticos: uso conjunto frecuente', 'Insulina: ajustar dosis en diabéticas'],
    viaAdministracion: ['IM'], dosis: { adulto: '12 mg IM cada 24h x 2 dosis (total 24 mg). Ciclo de rescate: considerar si >14 días desde primer ciclo y <34 sem' },
    presentaciones: ['Ampollas 6 mg fosfato + 6 mg acetato por mL (Cronodose)'],
    embarazo: 'C', lactancia: 'Compatible tras administración.',
    cuidadosEnfermeria: ['Administrar IM profunda en glúteo', 'Efecto máximo a las 48h de primera dosis', 'Beneficio significativo incluso con 1 sola dosis si parto inminente', 'Monitorizar glucemia en diabéticas cada 6h x 48h', 'NST: movimientos fetales pueden disminuir 24-48h (normal)', 'Máximo beneficio: 24-34 semanas. Considerar en 23 y 34-36 según caso', 'NO repetir ciclos rutinariamente (máx 1 ciclo de rescate)'],
    farmacocinetica: { absorcion: 'IM: fosfato rápido + acetato depot', metabolismo: 'Hepático', excrecion: 'Renal', vidaMedia: '35-54 horas', inicioAccion: '24-48 horas para maduración fetal', duracionAccion: '7 días (efecto pulmonar)' },
    almacenamiento: 'Temperatura ambiente. No congelar.', unidadId: 'u07', capituloId: 'c07_01'
  },
  // ===== HOSPITALARIOS =====
  {
    id: 'etomidato', nombre: 'Etomidato', nombreGenerico: 'Etomidato',
    nombresComerciales: ['Amidate', 'Hypnomidate'], familia: 'Anestésicos generales',
    clasificacion: 'Hipnótico imidazólico (inductor anestésico)',
    mecanismoAccion: 'Potencia la acción del GABA en receptor GABA-A. Produce hipnosis sin analgesia. Mínimo efecto cardiovascular, lo que lo hace ideal para inducción en pacientes hemodinámicamente inestables.',
    indicaciones: ['Inducción de secuencia rápida (ISR) en pacientes hemodinámicamente inestables', 'Inducción anestésica en cardiópatas', 'Cardioversión eléctrica (sedación breve)'],
    contraindicaciones: ['Insuficiencia suprarrenal', 'Sepsis (supresión adrenal)', 'Porfiria'],
    efectosAdversos: ['Mioclonías (30-60%)', 'Náuseas/vómitos postoperatorios', 'Dolor en sitio de inyección', '⚠️ Supresión adrenal (inhibe 11β-hidroxilasa): dosis única es segura, infusión prolongada NO', '⚠️ No usar en infusión continua'],
    interacciones: ['Opioides: reduce dosis necesaria de etomidato', 'Midazolam: sinergia hipnótica'],
    viaAdministracion: ['IV'], dosis: { adulto: '0.2-0.3 mg/kg IV en bolo (dosis única). ISR: 0.3 mg/kg', pediatrico: '>10 años: 0.2-0.3 mg/kg' },
    presentaciones: ['Ampollas 2 mg/mL (10, 20 mL)'],
    embarazo: 'C', lactancia: 'Uso único. Compatible.',
    cuidadosEnfermeria: ['DOSIS ÚNICA SOLAMENTE (no infusión)', 'Mínimo efecto sobre PA y FC: ideal en shock/trauma', 'Mioclonías son frecuentes: no confundir con convulsiones', 'No tiene efecto analgésico: combinar con opioide', 'Premedicar con midazolam reduce mioclonías', 'Supresión adrenal con dosis única es transitoria (6-12h) y clínicamente insignificante'],
    farmacocinetica: { distribucion: 'Unión proteica 76%', metabolismo: 'Hepático (hidrólisis por esterasas)', excrecion: 'Renal 78%', vidaMedia: '3-5 horas (redistribución: 2-5 min)', inicioAccion: '15-45 segundos', duracionAccion: '3-12 minutos' },
    almacenamiento: 'Temperatura ambiente.', unidadId: 'u12', capituloId: 'c12_01'
  },
  {
    id: 'cisatracurio_detalle', nombre: 'Atracurio', nombreGenerico: 'Atracurio besilato',
    nombresComerciales: ['Tracrium'], familia: 'Bloqueantes neuromusculares',
    clasificacion: 'BNM no despolarizante (bencilisoquinolina) de acción intermedia',
    mecanismoAccion: 'Antagonista competitivo de receptores nicotínicos en la placa motora. Eliminación por degradación de Hofmann (independiente de órganos), ideal en insuficiencia hepática y renal.',
    indicaciones: ['Relajación muscular para intubación endotraqueal', 'Relajación intraoperatoria', 'Facilitar ventilación mecánica en UCI'],
    contraindicaciones: ['Hipersensibilidad', 'Miastenia gravis (usar con extrema precaución)'],
    efectosAdversos: ['Hipotensión (liberación de histamina)', 'Broncoespasmo', 'Taquicardia', 'Rubor cutáneo', '⚠️ Liberación de histamina (más que cisatracurio)'],
    interacciones: ['Aminoglucósidos: prolonga bloqueo', 'Anestésicos inhalatorios: potencian efecto', 'Succinilcolina: administrar atracurio después de recuperación', 'Litio: prolonga bloqueo'],
    viaAdministracion: ['IV'], dosis: { adulto: 'Intubación: 0.4-0.5 mg/kg IV. Mantenimiento: 0.08-0.1 mg/kg bolos o 5-9 mcg/kg/min infusión', pediatrico: '0.3-0.5 mg/kg' },
    presentaciones: ['Ampollas 10 mg/mL (2.5, 5 mL)'],
    embarazo: 'C', lactancia: 'Uso quirúrgico.',
    cuidadosEnfermeria: ['NUNCA administrar sin vía aérea asegurada y ventilación', 'Administrar lentamente (evitar liberación histamina)', 'Monitor TOF (train-of-four) para evaluar bloqueo', 'Degradación Hofmann: no requiere ajuste renal ni hepático', 'Reversión: neostigmina + atropina o sugammadex', 'Refrigerar ampollas (pierde potencia a TA)'],
    farmacocinetica: { metabolismo: 'Degradación de Hofmann (pH/temperatura dependiente) + hidrólisis éster', excrecion: 'No depende de órganos', vidaMedia: '20 minutos', inicioAccion: '2-3 minutos', duracionAccion: '20-35 minutos' },
    almacenamiento: 'REFRIGERAR 2-8°C obligatorio. A TA: usar en 14 días.', unidadId: 'u12', capituloId: 'c12_01'
  },
  // ===== EMERGENCIAS =====
  {
    id: 'alteplasa_acv', nombre: 'Alteplasa (ACV)', nombreGenerico: 'Alteplasa',
    nombresComerciales: ['Activase', 'Actilyse'], familia: 'Trombolíticos',
    clasificacion: 'Activador tisular del plasminógeno recombinante (rt-PA)',
    mecanismoAccion: 'Se une a fibrina del trombo y convierte selectivamente plasminógeno unido a fibrina en plasmina, produciendo fibrinólisis local. Mayor selectividad por fibrina que estreptoquinasa.',
    indicaciones: ['ACV isquémico agudo (dentro de 4.5h desde inicio síntomas)', 'IAM con elevación ST (alternativa a angioplastia primaria)', 'TEP masivo con inestabilidad hemodinámica', 'Trombosis de catéter venoso central'],
    contraindicaciones: ['Sangrado activo', 'ACV hemorrágico', 'Cirugía intracraneal <3 meses', 'Neoplasia intracraneal', 'MAV', 'PA >185/110 (ACV)', 'Glucemia <50 mg/dL', 'Plaquetas <100,000', 'INR >1.7'],
    efectosAdversos: ['Sangrado', 'Hematoma en sitios de punción', '⚠️ Hemorragia intracraneal (6-7% en ACV)', '⚠️ Angioedema orolingual (especialmente con IECA)'],
    interacciones: ['Anticoagulantes: mayor sangrado', 'Antiplaquetarios: mayor sangrado', 'IECA: mayor riesgo de angioedema'],
    viaAdministracion: ['IV'], dosis: { adulto: 'ACV: 0.9 mg/kg (máx 90 mg): 10% en bolo 1 min + 90% en infusión 60 min. IAM: 15 mg bolo + 0.75 mg/kg en 30 min + 0.5 mg/kg en 60 min. TEP: 100 mg en 2h' },
    presentaciones: ['Viales 10, 20, 50, 100 mg'],
    embarazo: 'C', lactancia: 'Uso de emergencia.',
    cuidadosEnfermeria: ['ACV: tiempo puerta-aguja <60 min (ideal <45 min)', 'PA debe ser <185/110 antes de administrar', 'Neurológico cada 15 min durante infusión y 2h después', 'NO anticoagular ni antiagregar 24h post-trombólisis', 'TC de control a las 24h', 'Suspender inmediatamente si cefalea severa, deterioro neurológico o HTA severa', 'Evitar punciones arteriales, catéter urinario y sonda nasogástrica durante 24h'],
    farmacocinetica: { metabolismo: 'Hepático', vidaMedia: '4-5 minutos (aclaramiento rápido)', inicioAccion: 'Inmediato', duracionAccion: 'Minutos a horas' },
    almacenamiento: 'Refrigerar. Reconstituido: usar en 8h.', unidadId: 'u11', capituloId: 'c11_02'
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