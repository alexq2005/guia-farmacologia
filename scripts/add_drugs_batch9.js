const fs = require('fs');
const path = require('path');

const drugsPath = path.join(__dirname, '..', 'src', 'data', 'drugs.json');
const catsPath  = path.join(__dirname, '..', 'src', 'data', 'categories.json');

const drugs = JSON.parse(fs.readFileSync(drugsPath, 'utf8'));
const cats  = JSON.parse(fs.readFileSync(catsPath, 'utf8'));

const existingIds = new Set(drugs.map(d => d.id));

function mkSearch(d) {
  return [d.nombre, d.nombreGenerico, ...d.nombresComerciales, d.familia, d.clasificacion, ...d.indicaciones]
    .join(' ').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const newDrugs = [
  {
    id: "docetaxel",
    nombre: "Docetaxel",
    nombreGenerico: "Docetaxel",
    nombresComerciales: ["Taxotere", "Docefrez"],
    familia: "Antineoplásicos",
    clasificacion: "Taxano (estabilizador de microtúbulos)",
    mecanismoAccion: "Se une a tubulina promoviendo el ensamblaje de microtúbulos y estabilizándolos, impidiendo la despolimerización. Bloquea la mitosis en G2/M. 1.3-2 veces más potente que paclitaxel in vitro.",
    indicaciones: ["Cáncer de mama", "Cáncer de pulmón no microcítico", "Cáncer de próstata metastásico", "Cáncer gástrico", "Cáncer de cabeza y cuello", "Cáncer de ovario"],
    contraindicaciones: ["Neutrófilos <1500/mm³", "Insuficiencia hepática severa (bilirrubina >ULN o AST/ALT >1.5xULN con FA >2.5xULN)", "Hipersensibilidad a polisorbato 80"],
    efectosAdversos: ["Neutropenia (dosis-limitante, nadir día 7)", "Retención hídrica acumulativa", "Alopecia", "Neuropatía periférica", "Reacciones de hipersensibilidad", "Onicólisis (daño ungueal)", "Astenia", "Mucositis", "Diarrea", "Epífora (lagrimeo)"],
    interacciones: ["Inhibidores CYP3A4 (ketoconazol: aumenta niveles 49%)", "Inductores CYP3A4 (reducen eficacia)", "Otros mielotóxicos"],
    viaAdministracion: ["intravenosa"],
    dosis: { adultos: "60-100 mg/m² IV cada 3 semanas. Semanal: 35-40 mg/m². Próstata: 75 mg/m² cada 3 semanas + prednisona", pediatria: "Datos limitados" },
    presentaciones: ["Concentrado 20 mg/mL (1 mL)", "Concentrado 20 mg/mL (4 mL)", "Concentrado 80 mg/4 mL"],
    embarazo: "Categoría D - Contraindicado",
    lactancia: "Contraindicado",
    cuidadosEnfermeria: ["PREMEDICACIÓN: dexametasona 8 mg oral 2 veces/día por 3 días (inicio 1 día antes)", "Premedicación reduce retención hídrica e hipersensibilidad", "Infundir en 1 hora", "Función hepática OBLIGATORIA antes de cada ciclo", "Monitorizar peso (retención hídrica acumulativa desde ciclo 4-5)", "Vigilar cambios ungueales (cubrir uñas con hielo durante infusión)", "NO administrar si bilirrubina elevada"],
    farmacocinetica: { absorcion: "IV: 100%", distribucion: "Unión a proteínas >94%", metabolismo: "Hepático CYP3A4", eliminacion: "Fecal 75%, renal 6%", vidaMedia: "Trifásica: terminal 11.1 horas" },
    almacenamiento: "Temperatura ambiente (formulaciones sin polisorbato) o refrigerar. Proteger de la luz",
    unidadId: "u11", capituloId: "c1102",
    searchText: "",
    riesgosSobremedicacion: { sintomas: "Neutropenia profunda, mucositis severa, neuropatía", manejo: "G-CSF, soporte general, no antídoto" }
  },
  {
    id: "bismuto",
    nombre: "Subsalicilato de Bismuto",
    nombreGenerico: "Subsalicilato de bismuto",
    nombresComerciales: ["Pepto-Bismol", "Bismutol"],
    familia: "Antiulcerosos/Antidiarreicos",
    clasificacion: "Protector de mucosa gástrica / Antidiarreico",
    mecanismoAccion: "Cubre la mucosa gástrica formando una barrera protectora. Tiene efecto antibacteriano (contra H. pylori), antisecretor leve, y antiinflamatorio. El salicilato tiene efecto antiprostaglandínico local.",
    indicaciones: ["Diarrea aguda no complicada", "Dispepsia", "Erradicación de H. pylori (terapia cuádruple con bismuto)", "Diarrea del viajero (profilaxis y tratamiento)", "Náuseas"],
    contraindicaciones: ["Alergia a salicilatos/aspirina", "Niños con varicela o influenza (riesgo de Reye)", "Uso de anticoagulantes", "Úlcera sangrante activa", "Insuficiencia renal severa"],
    efectosAdversos: ["Coloración negra de lengua y heces (normal, inofensivo)", "Estreñimiento", "Náuseas", "Tinnitus (por componente salicilato, dosis altas)", "Neurotoxicidad por bismuto (uso prolongado/dosis altas)"],
    interacciones: ["Anticoagulantes (componente salicilato)", "Tetraciclinas (reduce absorción: separar 2h)", "Metotrexato (aumenta toxicidad por salicilato)", "Otros salicilatos (toxicidad aditiva)"],
    viaAdministracion: ["oral"],
    dosis: { adultos: "Diarrea: 524 mg cada 30-60 min según necesidad (máx 4.2 g/día). H. pylori: 524 mg cada 6h por 14 días (con IBP, tetraciclina y metronidazol)", pediatria: "≥12 años: dosis adulto. Menores de 12: no recomendado (salicilato)" },
    presentaciones: ["Comprimidos masticables 262 mg", "Suspensión 262 mg/15 mL", "Suspensión 524 mg/15 mL"],
    embarazo: "Evitar (contiene salicilato, riesgo especialmente en 3er trimestre)",
    lactancia: "Evitar (salicilato se excreta en leche)",
    cuidadosEnfermeria: ["Informar sobre coloración NEGRA de heces y lengua (normal, no es sangrado)", "Agitar bien la suspensión", "No usar en <12 años (riesgo Reye por salicilato)", "Limitar uso a 2 días para diarrea aguda (si persiste, evaluar causa)", "Separar 2h de tetraciclinas y fluoroquinolonas", "Monitorizar tinnitus con uso prolongado"],
    farmacocinetica: { absorcion: "Bismuto: mínima (<1%). Salicilato: absorción significativa", distribucion: "Salicilato: unión a proteínas 80-90%", metabolismo: "Salicilato: hepático", eliminacion: "Bismuto: fecal. Salicilato: renal", vidaMedia: "Bismuto >21 días (acumulación tisular). Salicilato: 2-5h" },
    almacenamiento: "Temperatura ambiente",
    unidadId: "u07", capituloId: "c0701",
    searchText: "",
    riesgosSobremedicacion: { sintomas: "Toxicidad por salicilato: tinnitus, alcalosis respiratoria, acidosis metabólica. Bismuto crónico: encefalopatía", manejo: "Lavado gástrico si reciente, alcalinización urinaria para salicilato, quelación con dimercaprol si encefalopatía por bismuto" }
  },
  {
    id: "abciximab",
    nombre: "Abciximab",
    nombreGenerico: "Abciximab",
    nombresComerciales: ["ReoPro"],
    familia: "Antiagregantes plaquetarios",
    clasificacion: "Antagonista del receptor GP IIb/IIIa (anticuerpo monoclonal Fab)",
    mecanismoAccion: "Fragmento Fab de anticuerpo monoclonal quimérico que bloquea el receptor de glicoproteína IIb/IIIa en plaquetas, impidiendo la unión de fibrinógeno y la agregación plaquetaria. Inhibición plaquetaria >80% a los 10 min.",
    indicaciones: ["ICP (angioplastia/stent) de alto riesgo", "SCA con ICP planificada", "ICP de rescate"],
    contraindicaciones: ["Hemorragia activa", "ACV en últimas 2 semanas", "Cirugía mayor en últimos 2 meses", "Trombocitopenia <100,000", "HTA severa no controlada", "Aneurisma intracraneal"],
    efectosAdversos: ["Hemorragia (principal)", "Trombocitopenia (2-4%, puede ser severa y aguda)", "Náuseas", "Hipotensión", "Dolor de espalda", "Dolor torácico"],
    interacciones: ["Heparina (efecto aditivo)", "Otros antiagregantes (sangrado aditivo)", "Trombolíticos (sangrado severo)", "AINE"],
    viaAdministracion: ["intravenosa"],
    dosis: { adultos: "ICP: bolo 0.25 mg/kg IV 10-60 min antes, seguido de infusión 0.125 mcg/kg/min (máx 10 mcg/min) por 12h", pediatria: "No aprobado en pediatría" },
    presentaciones: ["Solución inyectable 2 mg/mL (5 mL)"],
    embarazo: "Categoría C",
    lactancia: "Precaución",
    cuidadosEnfermeria: ["Filtro en línea 0.2-0.22 μm OBLIGATORIO", "Recuento plaquetario basal, a las 2-4h post-bolo, y a las 24h", "Si plaquetas <100,000: suspender inmediatamente", "Mantener TCA 200-300 seg durante ICP", "Vigilar sitios de punción arterial meticulosamente", "Hemostasia cuidadosa al retirar introductor femoral (esperar TCA <175 seg)", "No readministrar (anticuerpos humanos anti-quiméricos)"],
    farmacocinetica: { absorcion: "IV: inmediata", distribucion: "Se une a receptores plaquetarios", metabolismo: "Proteólisis", eliminacion: "Reticuloendotelial", vidaMedia: "Vida media plasmática 30 min, pero función plaquetaria se recupera en 24-48h" },
    almacenamiento: "Refrigerar 2-8°C. No congelar",
    unidadId: "u05", capituloId: "c0502",
    searchText: "",
    riesgosSobremedicacion: { sintomas: "Hemorragia severa, trombocitopenia profunda", manejo: "Suspender, transfusión plaquetaria (plaquetas frescas superan el bloqueo), soporte transfusional" }
  },
  {
    id: "eptifibatida",
    nombre: "Eptifibatida",
    nombreGenerico: "Eptifibatida",
    nombresComerciales: ["Integrilin"],
    familia: "Antiagregantes plaquetarios",
    clasificacion: "Antagonista del receptor GP IIb/IIIa (péptido cíclico sintético)",
    mecanismoAccion: "Péptido cíclico sintético que bloquea reversiblemente el receptor GP IIb/IIIa, impidiendo la unión de fibrinógeno. Más selectivo y reversible que abciximab. Función plaquetaria se normaliza 4h post-suspensión.",
    indicaciones: ["SCA sin elevación ST (NSTEMI, angina inestable)", "ICP", "SCA con tratamiento médico"],
    contraindicaciones: ["Hemorragia activa", "ACV hemorrágico previo", "Cirugía mayor en 6 semanas", "Trombocitopenia", "Insuficiencia renal severa (ClCr <30: ajustar)", "PA >200/110"],
    efectosAdversos: ["Hemorragia", "Trombocitopenia (rara)", "Hipotensión"],
    interacciones: ["Heparina (combinación estándar, ajustar TCA)", "Anticoagulantes orales", "Otros GP IIb/IIIa (no combinar)", "Trombolíticos"],
    viaAdministracion: ["intravenosa"],
    dosis: { adultos: "SCA: bolo 180 mcg/kg IV, infusión 2 mcg/kg/min hasta 72h. ICP: bolo 180 mcg/kg, segundo bolo 180 mcg/kg a los 10 min, infusión 2 mcg/kg/min hasta 18-24h post-ICP. ClCr <50: infusión 1 mcg/kg/min", pediatria: "No aprobado" },
    presentaciones: ["Solución inyectable 0.75 mg/mL (100 mL)", "Solución inyectable 2 mg/mL (10 mL, 100 mL)"],
    embarazo: "Categoría B",
    lactancia: "Precaución",
    cuidadosEnfermeria: ["Recuento plaquetario a las 6h post-inicio, luego diario", "Mantener TTPa 50-70 seg con heparina concomitante", "Ajustar dosis si ClCr <50 mL/min", "Ventaja sobre abciximab: reversible en 4h", "Vigilar sitios de acceso vascular", "Minimizar punciones venosas y arteriales innecesarias"],
    farmacocinetica: { absorcion: "IV: inmediata", distribucion: "Unión a proteínas 25%", metabolismo: "Desaminación y proteólisis", eliminacion: "Renal 50% sin cambios", vidaMedia: "2.5 horas" },
    almacenamiento: "Refrigerar. Puede mantenerse a TA hasta 2 meses",
    unidadId: "u05", capituloId: "c0502",
    searchText: "",
    riesgosSobremedicacion: { sintomas: "Hemorragia severa", manejo: "Suspender (reversible en 4h), transfusión plaquetaria, soporte" }
  },
  {
    id: "tirofiban",
    nombre: "Tirofibán",
    nombreGenerico: "Tirofibán clorhidrato",
    nombresComerciales: ["Aggrastat"],
    familia: "Antiagregantes plaquetarios",
    clasificacion: "Antagonista del receptor GP IIb/IIIa (no peptídico sintético)",
    mecanismoAccion: "Molécula no peptídica que bloquea reversiblemente el receptor GP IIb/IIIa. Similar a eptifibatida en reversibilidad. Función plaquetaria se normaliza en 4-8h post-suspensión.",
    indicaciones: ["SCA sin elevación ST", "ICP", "Prevención de eventos isquémicos en SCA"],
    contraindicaciones: ["Hemorragia activa", "ACV en 30 días", "Trombocitopenia", "Diátesis hemorrágica", "HTA severa no controlada"],
    efectosAdversos: ["Hemorragia", "Trombocitopenia (0.5-1.5%)", "Náuseas", "Cefalea", "Fiebre"],
    interacciones: ["Heparina (uso combinado estándar)", "Anticoagulantes", "Trombolíticos", "AINE"],
    viaAdministracion: ["intravenosa"],
    dosis: { adultos: "Bolo alta dosis: 25 mcg/kg IV en 3 min, luego infusión 0.15 mcg/kg/min por 18-48h. ClCr <60: reducir infusión 50%", pediatria: "No aprobado" },
    presentaciones: ["Solución premezclada 50 mcg/mL (250 mL)", "Solución concentrada 250 mcg/mL"],
    embarazo: "Categoría B",
    lactancia: "Precaución",
    cuidadosEnfermeria: ["Recuento plaquetario antes, 6h post-inicio, luego diario", "Ajustar si ClCr <60 mL/min", "Vigilar sangrado", "Reversible en 4-8h post-suspensión", "Compatible con heparina en misma línea IV"],
    farmacocinetica: { absorcion: "IV: inmediata", distribucion: "Unión a proteínas 65%", metabolismo: "Mínimo", eliminacion: "Renal 65% sin cambios, fecal 25%", vidaMedia: "2 horas" },
    almacenamiento: "Temperatura ambiente. Premezclado: proteger de la luz",
    unidadId: "u05", capituloId: "c0502",
    searchText: "",
    riesgosSobremedicacion: { sintomas: "Hemorragia", manejo: "Suspender, plaquetas, soporte" }
  },
  {
    id: "estreptoquinasa",
    nombre: "Estreptoquinasa",
    nombreGenerico: "Estreptoquinasa",
    nombresComerciales: ["Streptase"],
    familia: "Trombolíticos",
    clasificacion: "Activador indirecto del plasminógeno (no fibrinoespecífico)",
    mecanismoAccion: "Proteína de estreptococo que forma un complejo activador con el plasminógeno, convirtiendo plasminógeno a plasmina. No fibrinoespecífico: degrada tanto fibrina del trombo como fibrinógeno circulante (estado lítico sistémico).",
    indicaciones: ["IAM con elevación ST (si no disponible alteplasa)", "TEP masiva", "TVP iliofemoral extensa", "Trombosis de catéter"],
    contraindicaciones: ["ACV hemorrágico previo", "Cirugía/trauma mayor en 3 semanas", "Hemorragia activa", "Disección aórtica", "Neoplasia intracraneal", "Uso previo de estreptoquinasa (anticuerpos: efectividad reducida)"],
    efectosAdversos: ["Hemorragia", "Hipotensión (frecuente, por activación de calicreína)", "Reacciones alérgicas (es proteína bacteriana)", "Fiebre", "Arritmias de reperfusión", "ACV hemorrágico"],
    interacciones: ["Anticoagulantes (sangrado aditivo)", "Antiagregantes (sangrado aditivo)", "No readministrar >5 días después (anticuerpos neutralizantes persisten meses)"],
    viaAdministracion: ["intravenosa"],
    dosis: { adultos: "IAM: 1.5 millones UI IV en 60 min. TEP: 250,000 UI carga en 30 min, luego 100,000 UI/h x 24-72h", pediatria: "Datos limitados" },
    presentaciones: ["Polvo liofilizado 750,000 UI", "Polvo liofilizado 1,500,000 UI"],
    embarazo: "Categoría C - Solo si amenaza vital (cruza placenta mínimamente)",
    lactancia: "Precaución",
    cuidadosEnfermeria: ["VENTANA TERAPÉUTICA: IAM <12h desde inicio de síntomas", "Premedicar con hidrocortisona 100 mg IV si disponible", "Monitorizar PA (hipotensión frecuente: reducir velocidad, volumen)", "ECG continuo (arritmias de reperfusión = signo de éxito)", "Minimizar punciones y procedimientos invasivos", "NO readministrar si se usó en últimos 6-12 meses (anticuerpos)", "Heparina IV tras completar (inicio 4-6h post, según TTPa)"],
    farmacocinetica: { absorcion: "IV: inmediata", distribucion: "Intravascular", metabolismo: "Inactivación por anticuerpos, proteólisis", eliminacion: "Reticuloendotelial, hepática", vidaMedia: "Complejo activador: 23 min. Estado lítico persiste 12-24h" },
    almacenamiento: "Refrigerar. Reconstituido: usar en 24h",
    unidadId: "u05", capituloId: "c0502",
    searchText: "",
    riesgosSobremedicacion: { sintomas: "Hemorragia masiva, ACV hemorrágico", manejo: "Suspender, ácido tranexámico/aminocaproico como antifibrinolítico, crioprecipitado, PFC, soporte transfusional" }
  },
  {
    id: "procainamida",
    nombre: "Procainamida",
    nombreGenerico: "Procainamida clorhidrato",
    nombresComerciales: ["Pronestyl", "Procanbid"],
    familia: "Antiarrítmicos",
    clasificacion: "Antiarrítmico clase IA (bloqueador de canales de sodio)",
    mecanismoAccion: "Bloquea canales de sodio con cinética intermedia, prolongando la duración del potencial de acción y el período refractario. Deprime la automaticidad y la velocidad de conducción. Su metabolito NAPA tiene actividad clase III (bloqueo de potasio).",
    indicaciones: ["Taquicardia ventricular sostenida estable", "Fibrilación auricular pre-excitada (Wolff-Parkinson-White)", "Taquicardia de complejo ancho de origen incierto", "Conversión de FA/flutter (menos común actualmente)"],
    contraindicaciones: ["Bloqueo AV completo", "Lupus eritematoso sistémico", "Torsades de pointes", "Miastenia gravis", "QT prolongado", "ICC severa"],
    efectosAdversos: ["Hipotensión (especialmente IV rápida)", "Prolongación QT/QRS", "Lupus inducido por fármaco (hasta 30% con uso crónico)", "Agranulocitosis", "Náuseas", "Torsades de pointes"],
    interacciones: ["Amiodarona (prolonga QT aditivo)", "Otros antiarrítmicos (toxicidad aditiva)", "Trimetoprima (aumenta niveles de procainamida)", "Cimetidina (aumenta niveles)"],
    viaAdministracion: ["intravenosa", "oral"],
    dosis: { adultos: "TV estable: 20-50 mg/min IV (máx 17 mg/kg total), luego infusión 1-4 mg/min. Parar si: QRS se ensancha >50%, hipotensión, o dosis máxima alcanzada", pediatria: "Carga: 15 mg/kg IV en 30-60 min" },
    presentaciones: ["Ampolla 100 mg/mL (10 mL)", "Comprimidos 250 mg", "Comprimidos 500 mg", "Comprimidos LP 500 mg"],
    embarazo: "Categoría C",
    lactancia: "Compatible con precaución",
    cuidadosEnfermeria: ["Infusión IV LENTA: máx 50 mg/min (generalmente 20 mg/min)", "ECG CONTINUO durante carga", "DETENER si: QRS >50% basal, hipotensión, dosis máxima, ritmo suprimido", "PA cada 5 min durante carga IV", "Monitorizar niveles: procainamida 4-10 mcg/mL + NAPA <30 mcg/mL", "ANA cada 6-12 meses con uso crónico (lupus inducido)", "Hemograma cada 2 semanas los primeros 3 meses (agranulocitosis)"],
    farmacocinetica: { absorcion: "Oral: biodisponibilidad 75-95%", distribucion: "Vd 2 L/kg, unión a proteínas 15-20%", metabolismo: "Hepático N-acetilación a NAPA (activo, clase III). Acetiladores rápidos/lentos influyen", eliminacion: "Renal 50-70% sin cambios", vidaMedia: "Procainamida: 2.5-5h. NAPA: 6-8h (prolonga en IR)" },
    almacenamiento: "Temperatura ambiente. Proteger de la luz",
    unidadId: "u03", capituloId: "c0301",
    searchText: "",
    riesgosSobremedicacion: { sintomas: "Hipotensión severa, ensanchamiento QRS, torsades de pointes, asistolia", manejo: "Bicarbonato de sodio IV (para ensanchamiento QRS), vasopresores, marcapasos temporal, magnesio si torsades, hemodiálisis efectiva" }
  },
  {
    id: "reteplasa",
    nombre: "Reteplasa",
    nombreGenerico: "Reteplasa",
    nombresComerciales: ["Retavase"],
    familia: "Trombolíticos",
    clasificacion: "Activador tisular del plasminógeno recombinante (rtPA modificado)",
    mecanismoAccion: "Forma delecionada de alteplasa (sin dominio finger, EGF y kringle 1). Menor afinidad por fibrina pero mayor vida media. Convierte plasminógeno a plasmina preferentemente en la superficie del trombo.",
    indicaciones: ["IAM con elevación ST"],
    contraindicaciones: ["ACV hemorrágico", "Hemorragia activa", "Cirugía intracraneal en 3 meses", "Neoplasia intracraneal", "Disección aórtica"],
    efectosAdversos: ["Hemorragia", "ACV hemorrágico", "Arritmias de reperfusión", "Hipotensión", "Reacciones alérgicas (raras)"],
    interacciones: ["Anticoagulantes (sangrado aditivo)", "Antiagregantes (sangrado aditivo)"],
    viaAdministracion: ["intravenosa"],
    dosis: { adultos: "10 U + 10 U IV en bolo (doble bolo): primera dosis 10 U en 2 min, segunda dosis 10 U a los 30 min", pediatria: "No aprobado" },
    presentaciones: ["Kit: 2 viales de 10 U cada uno + jeringas"],
    embarazo: "Categoría C - Solo si amenaza vital",
    lactancia: "Precaución",
    cuidadosEnfermeria: ["Esquema de DOBLE BOLO: simple y rápido", "1er bolo: 10 U IV en 2 min", "2do bolo: 10 U IV en 2 min, exactamente 30 min después", "NO administrar por línea con heparina (incompatible)", "Heparina: iniciar tras segundo bolo", "ECG continuo, monitorizar sangrado", "Ventaja: administración más simple que alteplasa (no requiere infusión)"],
    farmacocinetica: { absorcion: "IV: inmediata", distribucion: "Intravascular", metabolismo: "Hepático", eliminacion: "Renal", vidaMedia: "13-16 minutos (mayor que alteplasa)" },
    almacenamiento: "Refrigerar. Reconstituido: usar en 4h",
    unidadId: "u05", capituloId: "c0502",
    searchText: "",
    riesgosSobremedicacion: { sintomas: "Hemorragia severa, ACV hemorrágico", manejo: "Antifibrinolíticos (ácido tranexámico), crioprecipitado, PFC, soporte" }
  },
  {
    id: "albumina",
    nombre: "Albúmina Humana",
    nombreGenerico: "Albúmina sérica humana",
    nombresComerciales: ["Albuminar", "Albunorm", "Vialebex"],
    familia: "Expansores plasmáticos",
    clasificacion: "Coloide natural derivado de plasma humano",
    mecanismoAccion: "Proteína plasmática que contribuye al 75-80% de la presión oncótica del plasma. Atrae agua al espacio intravascular por efecto osmótico coloidal. 1 g de albúmina retiene ~18 mL de agua en el intravascular.",
    indicaciones: ["Hipovolemia (shock, quemados)", "Hipoalbuminemia severa sintomática", "Paracentesis de gran volumen (>5 L)", "Síndrome hepatorrenal (con terlipresina)", "Peritonitis bacteriana espontánea", "Plasmaféresis (reemplazo)", "Síndrome nefrótico severo (edema refractario)"],
    contraindicaciones: ["ICC severa descompensada", "Edema pulmonar", "Anemia severa", "Hipersensibilidad a albúmina"],
    efectosAdversos: ["Sobrecarga hídrica/edema pulmonar", "Reacciones alérgicas/anafilactoides (raras)", "Náuseas", "Fiebre", "Hipotensión (infusión rápida)", "Hipernatremia (preparación al 25%)"],
    interacciones: ["Diuréticos (efecto complementario: albúmina + furosemida en síndrome nefrótico)", "Medicamentos unidos a albúmina (la administración puede alterar niveles libres transitoriamente)"],
    viaAdministracion: ["intravenosa"],
    dosis: { adultos: "Hipovolemia: 25 g (500 mL al 5% o 100 mL al 25%), repetir según respuesta. Paracentesis: 6-8 g por litro drenado (>5 L). SHR: 1 g/kg el día 1, luego 20-40 g/día. PBE: 1.5 g/kg día 1, 1 g/kg día 3", pediatria: "0.5-1 g/kg IV" },
    presentaciones: ["Solución 5% (50 mg/mL) 250 mL y 500 mL", "Solución 20% (200 mg/mL) 50 mL y 100 mL", "Solución 25% (250 mg/mL) 50 mL y 100 mL"],
    embarazo: "Compatible si necesario",
    lactancia: "Compatible",
    cuidadosEnfermeria: ["5% = iso-oncótica (expande 1:1). 20-25% = hiper-oncótica (atrae 3-4x su volumen)", "Al 5%: puede infundirse rápida en shock (hasta 5 mL/min)", "Al 20-25%: infundir lentamente (1-2 mL/min) por riesgo de sobrecarga", "Monitorizar PA, FC, PVC, diuresis", "Vigilar signos de sobrecarga hídrica (disnea, crepitantes)", "NO mezclar con aminoácidos ni hidrolizados de proteínas", "Usar línea de infusión dedicada", "En paracentesis: administrar DURANTE o inmediatamente después"],
    farmacocinetica: { absorcion: "IV: inmediata", distribucion: "80% intravascular, 20% extravascular (recirculación transcapilar)", metabolismo: "Catabolismo tisular", eliminacion: "No significativa por vía renal (normal)", vidaMedia: "15-20 días" },
    almacenamiento: "Temperatura ambiente (hasta 25°C). No congelar. Una vez abierto: usar dentro de 4h",
    unidadId: "u10", capituloId: "c1001",
    searchText: "",
    riesgosSobremedicacion: { sintomas: "Sobrecarga circulatoria, edema pulmonar, hipernatremia (con 25%)", manejo: "Diuréticos (furosemida), soporte respiratorio, suspender infusión" }
  },
  {
    id: "urokinasa",
    nombre: "Urokinasa",
    nombreGenerico: "Urokinasa",
    nombresComerciales: ["Abbokinase"],
    familia: "Trombolíticos",
    clasificacion: "Activador directo del plasminógeno (no fibrinoespecífico)",
    mecanismoAccion: "Serina proteasa que convierte directamente el plasminógeno a plasmina (sin necesidad de cofactores). No fibrinoespecífico: produce fibrinolisis sistémica. Derivada originalmente de orina humana o cultivos celulares renales.",
    indicaciones: ["Trombosis de catéter venoso central", "TEP masiva (menos usada actualmente)", "Trombosis arterial periférica aguda (catéter dirigido)", "Oclusión de fístula arteriovenosa para diálisis"],
    contraindicaciones: ["Hemorragia activa", "ACV reciente", "Cirugía intracraneal reciente", "Diátesis hemorrágica"],
    efectosAdversos: ["Hemorragia", "Fiebre", "Reacciones alérgicas (menos que estreptoquinasa)", "Hematoma en sitio de punción"],
    interacciones: ["Anticoagulantes (sangrado aditivo)", "Antiagregantes (sangrado aditivo)"],
    viaAdministracion: ["intravenosa"],
    dosis: { adultos: "Trombosis de catéter: 5000 UI/mL instilación en catéter, esperar 30-60 min, aspirar. TEP: 4400 UI/kg/h x12h (tras carga 4400 UI/kg en 10 min). Trombolisis dirigida: 60,000-250,000 UI/h vía catéter", pediatria: "Similar ajustado por peso" },
    presentaciones: ["Polvo liofilizado 5,000 UI", "Polvo liofilizado 250,000 UI"],
    embarazo: "Categoría B - Solo si amenaza vital",
    lactancia: "Precaución",
    cuidadosEnfermeria: ["Para catéter: técnica estéril, instilar volumen del catéter, esperar y aspirar", "Para TEP/trombosis sistémica: ECG y monitorización continua", "Ventaja sobre estreptoquinasa: no antigénica (puede readministrarse)", "Monitorizar fibrinógeno, TTPa, recuento plaquetario", "Minimizar procedimientos invasivos durante tratamiento"],
    farmacocinetica: { absorcion: "IV: inmediata", distribucion: "Intravascular", metabolismo: "Hepático", eliminacion: "Hepática", vidaMedia: "10-20 minutos" },
    almacenamiento: "Refrigerar. Reconstituido: usar inmediatamente",
    unidadId: "u05", capituloId: "c0502",
    searchText: "",
    riesgosSobremedicacion: { sintomas: "Hemorragia severa", manejo: "Suspender, ácido tranexámico/aminocaproico, PFC, crioprecipitado, soporte" }
  }
];

let added = 0;
for (const d of newDrugs) {
  if (existingIds.has(d.id)) continue;
  d.searchText = mkSearch(d);
  drugs.push(d);
  existingIds.add(d.id);
  for (const u of cats.unidades) {
    if (u.id === d.unidadId) {
      const cap = u.capitulos.find(c => c.id === d.capituloId);
      if (cap && !cap.drugIds.includes(d.id)) cap.drugIds.push(d.id);
    }
  }
  added++;
}

fs.writeFileSync(drugsPath, JSON.stringify(drugs, null, 2), 'utf8');
fs.writeFileSync(catsPath, JSON.stringify(cats, null, 2), 'utf8');
console.log(`Added: ${added}. Total drugs: ${drugs.length}`);