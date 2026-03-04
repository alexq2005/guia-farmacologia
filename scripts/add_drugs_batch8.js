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
    id: "cisplatino",
    nombre: "Cisplatino",
    nombreGenerico: "Cisplatino",
    nombresComerciales: ["Platinol"],
    familia: "Antineoplásicos",
    clasificacion: "Compuesto de platino (alquilante)",
    mecanismoAccion: "Forma enlaces cruzados intra e intercatenarios con el ADN, uniéndose a guanina y adenina. Impide la replicación y transcripción del ADN. Altamente nefrotóxico. Emetogénico grado 5 (máximo).",
    indicaciones: ["Cáncer de testículo", "Cáncer de ovario", "Cáncer de vejiga", "Cáncer de pulmón", "Cáncer de cabeza y cuello", "Cáncer de esófago", "Cáncer gástrico"],
    contraindicaciones: ["Insuficiencia renal (ClCr <60)", "Mielosupresión preexistente", "Hipoacusia preexistente", "Deshidratación", "Hipersensibilidad a platinos"],
    efectosAdversos: ["Nefrotoxicidad (dosis-limitante)", "Náuseas/vómitos severos (altamente emetogénico)", "Ototoxicidad (irreversible, frecuencias altas)", "Neurotoxicidad periférica", "Mielosupresión", "Hipomagnesemia", "Hipopotasemia", "Anemia hemolítica (rara)"],
    interacciones: ["Aminoglucósidos (nefro y ototoxicidad aditivas)", "Furosemida (ototoxicidad aditiva)", "Ifosfamida (mayor nefrotoxicidad)", "Fenitoína (disminuye absorción)"],
    viaAdministracion: ["intravenosa"],
    dosis: { adultos: "Variable: 50-120 mg/m² cada 3-4 semanas, o 15-20 mg/m²/día x5 días. Dosis total acumulativa: sin límite definido pero monitorizar toxicidades", pediatria: "Según protocolo: 60-100 mg/m²" },
    presentaciones: ["Solución inyectable 1 mg/mL (50 mL)", "Solución inyectable 1 mg/mL (100 mL)"],
    embarazo: "Categoría D - Contraindicado",
    lactancia: "Contraindicado",
    cuidadosEnfermeria: ["HIDRATACIÓN MASIVA pre y post (1-2 L SS 0.9% antes, durante y después)", "SS 0.9% OBLIGATORIO (NO dextrosa, el cloruro estabiliza cisplatino)", "Antiemético triple profiláctico: NK1 + ondansetrón + dexametasona", "Suplementar Mg++ y K+ profiláctico", "Monitorizar creatinina, electrolitos, audiometría", "NO usar agujas ni equipos de aluminio (inactiva cisplatino)", "Diuresis forzada ≥100 mL/h durante 6-8h post-infusión", "Proteger de la luz durante infusión"],
    farmacocinetica: { absorcion: "IV: 100%", distribucion: "Amplia, unión a proteínas >90% a las 24h", metabolismo: "Activación no enzimática por acuación", eliminacion: "Renal 15-50% en 24h", vidaMedia: "Bifásica: alfa 20-30 min, beta 60-90 min, terminal >24h" },
    almacenamiento: "Temperatura ambiente. Proteger de la luz. NO refrigerar (precipita)",
    unidadId: "u11", capituloId: "c1102",
    searchText: "",
    riesgosSobremedicacion: { sintomas: "Insuficiencia renal aguda, ototoxicidad irreversible, mielosupresión profunda, convulsiones", manejo: "Hidratación masiva, diálisis si IRA, soporte hematológico" }
  },
  {
    id: "paclitaxel",
    nombre: "Paclitaxel",
    nombreGenerico: "Paclitaxel",
    nombresComerciales: ["Taxol", "Abraxane"],
    familia: "Antineoplásicos",
    clasificacion: "Taxano (estabilizador de microtúbulos)",
    mecanismoAccion: "Se une a la subunidad beta de tubulina, promoviendo el ensamblaje y estabilización de microtúbulos, impidiendo su despolimerización. Bloquea la mitosis en fase G2/M. Efecto opuesto a los alcaloides de la vinca.",
    indicaciones: ["Cáncer de mama", "Cáncer de ovario", "Cáncer de pulmón no microcítico", "Sarcoma de Kaposi", "Cáncer de páncreas (Abraxane)", "Cáncer de vejiga"],
    contraindicaciones: ["Neutrófilos <1500/mm³", "Hipersensibilidad al cremophor EL (convencional)", "Neuropatía periférica grado 3-4"],
    efectosAdversos: ["Neutropenia (nadir día 8-10)", "Neuropatía periférica (dosis-limitante)", "Alopecia", "Mialgias/artralgias (3-5 días post)", "Reacciones de hipersensibilidad (cremophor)", "Bradicardia", "Mucositis", "Náuseas/vómitos (moderado)"],
    interacciones: ["Cisplatino (dar paclitaxel ANTES de cisplatino)", "Doxorrubicina (aumenta niveles si administrado antes)", "Inhibidores CYP3A4 y CYP2C8 (aumentan niveles)", "Ketoconazol (precaución)"],
    viaAdministracion: ["intravenosa"],
    dosis: { adultos: "Convencional: 135-175 mg/m² IV cada 3 semanas, o 80 mg/m² semanal. Abraxane: 260 mg/m² cada 3 sem, o 100-125 mg/m² semanal. Infundir convencional en 3h (o 24h)", pediatria: "Según protocolo" },
    presentaciones: ["Solución concentrada 6 mg/mL (convencional con cremophor)", "Polvo para suspensión nab-paclitaxel 100 mg (Abraxane)"],
    embarazo: "Categoría D - Contraindicado",
    lactancia: "Contraindicado",
    cuidadosEnfermeria: ["PREMEDICACIÓN obligatoria (convencional): dexametasona 20 mg oral 12h y 6h antes + difenhidramina 50 mg IV + ranitidina 50 mg IV, 30 min antes", "Abraxane: NO requiere premedicación con antihistamínicos (sin cremophor)", "Usar equipo SIN PVC ni DEHP (cremophor lixivia plastificante): set con poliolefina", "Filtro en línea 0.22 μm para convencional", "Monitorizar ECG (bradicardia transitoria)", "Evaluar neuropatía antes de cada ciclo (escala NCI-CTCAE)", "Abraxane y convencional NO son intercambiables"],
    farmacocinetica: { absorcion: "IV: 100%", distribucion: "Amplia, unión a proteínas 89-98%", metabolismo: "Hepático CYP2C8 y CYP3A4", eliminacion: "Biliar/fecal principalmente, renal 14%", vidaMedia: "Bifásica: 3-52 horas según dosis" },
    almacenamiento: "Temperatura ambiente. Diluido convencional: 27h a TA. Abraxane reconstituido: 8h refrigerado",
    unidadId: "u11", capituloId: "c1102",
    searchText: "",
    riesgosSobremedicacion: { sintomas: "Mielosupresión profunda, neuropatía severa, mucositis", manejo: "G-CSF si neutropenia, soporte general, no dializable" }
  },
  {
    id: "fluorouracilo",
    nombre: "Fluorouracilo (5-FU)",
    nombreGenerico: "Fluorouracilo",
    nombresComerciales: ["Efudex", "Adrucil"],
    familia: "Antineoplásicos",
    clasificacion: "Antimetabolito (análogo de pirimidina)",
    mecanismoAccion: "Se convierte intracelularmente a FdUMP que inhibe la timidilato sintasa, bloqueando la síntesis de timidina y por tanto de ADN. También se incorpora al ARN causando disfunción. Fase S-específico.",
    indicaciones: ["Cáncer colorrectal", "Cáncer gástrico", "Cáncer de mama", "Cáncer de páncreas", "Cáncer de cabeza y cuello", "Queratosis actínicas (tópico)", "Carcinoma basocelular superficial (tópico)"],
    contraindicaciones: ["Mielosupresión severa", "Infección activa grave", "Deficiencia de DPD (dihidropirimidina deshidrogenasa)", "Embarazo"],
    efectosAdversos: ["Mucositis/estomatitis (dosis-limitante)", "Diarrea", "Mielosupresión (nadir 9-14 días)", "Síndrome mano-pie (eritrodisestesia palmoplantar)", "Náuseas", "Alopecia", "Cardiotoxicidad (espasmo coronario, hasta 18%)", "Dermatitis (tópico)"],
    interacciones: ["Leucovorina/ácido folínico (potencia efecto antitumoral: combinación estándar)", "Metronidazol (aumenta toxicidad)", "Fenitoína (aumenta toxicidad de fenitoína)", "Warfarina (aumenta INR significativamente)"],
    viaAdministracion: ["intravenosa", "topica"],
    dosis: { adultos: "IV bolo: 400-600 mg/m² (con leucovorina). Infusión continua: 200-300 mg/m²/día o 2400-3000 mg/m² en 46h (FOLFOX/FOLFIRI). Tópico: crema 5% 1-2 veces/día x 2-6 semanas", pediatria: "Raramente usado en pediatría" },
    presentaciones: ["Solución inyectable 50 mg/mL (10 mL, 20 mL, 50 mL, 100 mL)", "Crema tópica 5%"],
    embarazo: "Categoría X - Contraindicado",
    lactancia: "Contraindicado",
    cuidadosEnfermeria: ["Evaluar DPD ANTES del primer ciclo (test genético/fenotípico): deficiencia = toxicidad letal", "Vesicante moderado: verificar permeabilidad IV", "Infusión continua: bomba elastomérica ambulatoria requiere educación al paciente", "Monitorizar mucositis con escala WHO antes de cada ciclo", "Vigilar síntomas cardíacos: dolor torácico, cambios ECG (espasmo coronario)", "Educar sobre síndrome mano-pie: crema emoliente, evitar fricción", "Protección solar (fotosensibilidad)"],
    farmacocinetica: { absorcion: "IV: 100%. Tópico: mínima absorción sistémica", distribucion: "Amplia, cruza BHE", metabolismo: "Hepático por DPD (80% catabolizado)", eliminacion: "Renal 15%, pulmonar (CO2)", vidaMedia: "8-20 minutos (eliminación rápida)" },
    almacenamiento: "Temperatura ambiente. Proteger de la luz. Puede precipitar con frío (calentar a 60°C para redisolver)",
    unidadId: "u11", capituloId: "c1102",
    searchText: "",
    riesgosSobremedicacion: { sintomas: "Mielosupresión letal si deficiencia DPD, mucositis severa, cardiotoxicidad, sepsis", manejo: "Uridina triacetato (Vistogard) dentro de 96h como antídoto, soporte hematológico, G-CSF" }
  },
  {
    id: "vincristina",
    nombre: "Vincristina",
    nombreGenerico: "Vincristina sulfato",
    nombresComerciales: ["Oncovin", "Vincristina"],
    familia: "Antineoplásicos",
    clasificacion: "Alcaloide de la vinca (inhibidor de microtúbulos)",
    mecanismoAccion: "Se une a tubulina impidiendo el ensamblaje de microtúbulos del huso mitótico. Detiene la mitosis en metafase. Efecto contrario a los taxanos. Principalmente neurotóxico.",
    indicaciones: ["Leucemia linfoblástica aguda (LLA)", "Linfoma de Hodgkin", "Linfoma no Hodgkin", "Neuroblastoma", "Tumor de Wilms", "Rabdomiosarcoma", "PTI refractaria"],
    contraindicaciones: ["Enfermedad desmielinizante preexistente (Charcot-Marie-Tooth)", "NUNCA por vía intratecal (FATAL)", "Neuropatía severa preexistente"],
    efectosAdversos: ["Neurotoxicidad periférica (dosis-limitante)", "Estreñimiento/íleo paralítico (neuropatía autonómica)", "Alopecia", "SIADH", "Dolor mandibular", "Mielosupresión (leve)", "Ptosis palpebral"],
    interacciones: ["Itraconazol/CYP3A4 inhibidores (aumentan neurotoxicidad)", "L-asparaginasa (dar vincristina antes)", "Fenitoína (reduce niveles)"],
    viaAdministracion: ["intravenosa"],
    dosis: { adultos: "1.4 mg/m² IV (dosis máxima absoluta: 2 mg por dosis) semanal o según protocolo", pediatria: "1.5 mg/m² IV semanal (máx 2 mg). <10 kg: 0.05 mg/kg" },
    presentaciones: ["Solución inyectable 1 mg/mL (1 mL, 2 mL)"],
    embarazo: "Categoría D - Contraindicado",
    lactancia: "Contraindicado",
    cuidadosEnfermeria: ["⚠️ NUNCA NUNCA INTRATECAL = MUERTE (etiqueta OBLIGATORIA 'SOLO IV')", "Dosis máxima 2 mg independiente de superficie corporal", "Administrar en minibag IV (NO en jeringa, para evitar confusión con intratecal)", "Vesicante: verificar permeabilidad IV, si extravasación: hialuronidasa + calor", "Evaluar neuropatía antes de cada dosis: fuerza, ROT, parestesias", "Profilaxis de estreñimiento desde día 1 (laxantes osmóticos)", "Monitorizar Na+ (riesgo SIADH)"],
    farmacocinetica: { absorcion: "IV: 100%", distribucion: "Amplia, unión a proteínas 75%, NO cruza BHE", metabolismo: "Hepático CYP3A4", eliminacion: "Biliar/fecal 70%, renal 10-20%", vidaMedia: "Trifásica: terminal 85 horas" },
    almacenamiento: "Refrigerar. Proteger de la luz",
    unidadId: "u11", capituloId: "c1102",
    searchText: "",
    riesgosSobremedicacion: { sintomas: "Neurotoxicidad severa: parálisis, íleo paralítico, SIADH, convulsiones", manejo: "Ácido folínico 100 mg IV cada 3h x 24h + infusión, soporte neurológico, enemas si íleo" }
  },
  {
    id: "carboplatino",
    nombre: "Carboplatino",
    nombreGenerico: "Carboplatino",
    nombresComerciales: ["Paraplatin"],
    familia: "Antineoplásicos",
    clasificacion: "Compuesto de platino de segunda generación",
    mecanismoAccion: "Similar a cisplatino: forma enlaces cruzados con ADN. Menos nefrotóxico y emetogénico que cisplatino pero más mielotóxico. Dosis calculada por AUC según fórmula de Calvert.",
    indicaciones: ["Cáncer de ovario", "Cáncer de pulmón no microcítico", "Cáncer de pulmón microcítico", "Cáncer de testículo", "Cáncer de cabeza y cuello", "Cáncer de endometrio"],
    contraindicaciones: ["Mielosupresión severa", "Hipersensibilidad a platinos", "Hemorragia significativa"],
    efectosAdversos: ["Mielosupresión (PRINCIPAL, nadir día 21)", "Trombocitopenia (más que cisplatino)", "Náuseas/vómitos (moderado, menos que cisplatino)", "Nefrotoxicidad (leve, mucho menos que cisplatino)", "Neuropatía periférica (menos)", "Reacciones de hipersensibilidad (especialmente tras >6 ciclos)"],
    interacciones: ["Aminoglucósidos (nefro/ototoxicidad)", "Fenitoína (reduce niveles)", "Otras mielotóxicas (mielosupresión aditiva)"],
    viaAdministracion: ["intravenosa"],
    dosis: { adultos: "Fórmula de Calvert: Dosis (mg) = AUC × (GFR + 25). AUC objetivo: 5-7 según protocolo. GFR máximo usar: 125 mL/min", pediatria: "Según protocolo, generalmente 400-600 mg/m²" },
    presentaciones: ["Solución inyectable 10 mg/mL (5 mL, 15 mL, 45 mL, 60 mL)"],
    embarazo: "Categoría D - Contraindicado",
    lactancia: "Contraindicado",
    cuidadosEnfermeria: ["Dosis por fórmula de Calvert (NO mg/m² como cisplatino)", "GFR precisa es CRÍTICA (verificar clearance de creatinina o GFR isotópico)", "No requiere hiperhidratación masiva (a diferencia de cisplatino)", "Hemograma antes de cada ciclo: plaquetas nadir día 21", "Antiemético moderado: ondansetrón + dexametasona", "Vigilar reacciones de hipersensibilidad tardía (>6 ciclos: desensibilización puede ser necesaria)", "Infundir en 15-60 min en D5W o SS 0.9%"],
    farmacocinetica: { absorcion: "IV: 100%", distribucion: "Baja unión a proteínas inicialmente, aumenta con el tiempo", metabolismo: "Acuación (similar a cisplatino)", eliminacion: "Renal 60-70% en 24h", vidaMedia: "Bifásica: alfa 1.6h, beta 3-6h" },
    almacenamiento: "Temperatura ambiente. Diluido: 8h a TA (o 24h refrigerado en SS 0.9%)",
    unidadId: "u11", capituloId: "c1102",
    searchText: "",
    riesgosSobremedicacion: { sintomas: "Mielosupresión severa (trombocitopenia profunda), insuficiencia renal", manejo: "Soporte transfusional, G-CSF, hidratación, hemodiálisis parcialmente efectiva" }
  },
  {
    id: "gemcitabina",
    nombre: "Gemcitabina",
    nombreGenerico: "Gemcitabina clorhidrato",
    nombresComerciales: ["Gemzar"],
    familia: "Antineoplásicos",
    clasificacion: "Antimetabolito (análogo de pirimidina/nucleósido)",
    mecanismoAccion: "Análogo de deoxicitidina. Se fosforila intracelularmente y se incorpora al ADN causando terminación de cadena. Inhibe la ribonucleótido reductasa (reducción de dNTPs). Inhibe su propia desaminación (auto-potenciación).",
    indicaciones: ["Cáncer de páncreas", "Cáncer de pulmón no microcítico", "Cáncer de vejiga", "Cáncer de mama metastásico", "Cáncer de ovario recurrente", "Sarcomas de tejidos blandos"],
    contraindicaciones: ["Mielosupresión severa", "Hipersensibilidad", "Radioterapia concomitante (toxicidad pulmonar severa)"],
    efectosAdversos: ["Mielosupresión", "Síndrome pseudogripal (fiebre, mialgias)", "Náuseas/vómitos (leve-moderado)", "Elevación de transaminasas", "Edema periférico", "Disnea", "Erupción cutánea", "Síndrome hemolítico-urémico (raro)"],
    interacciones: ["Radioterapia (toxicidad severa, no combinar)", "Warfarina (monitorizar INR)", "Cisplatino (sinergia terapéutica)"],
    viaAdministracion: ["intravenosa"],
    dosis: { adultos: "1000-1250 mg/m² IV en 30 min, días 1, 8 y 15 de ciclo 28 días (según protocolo). Páncreas: 1000 mg/m² semanal x7, luego semanal x3 de cada 4", pediatria: "Datos limitados" },
    presentaciones: ["Polvo para inyección 200 mg", "Polvo para inyección 1 g", "Polvo para inyección 2 g"],
    embarazo: "Categoría D - Contraindicado",
    lactancia: "Contraindicado",
    cuidadosEnfermeria: ["Infundir en EXACTAMENTE 30 minutos (infusiones más largas aumentan toxicidad)", "Hemograma antes de cada dosis (omitir si neutrófilos <500 o plaquetas <50,000)", "Monitorizar función hepática y renal", "Síndrome gripal frecuente 6-12h post: paracetamol profiláctico", "Vigilar disnea (neumonitis por radiación recall si RT previa)", "Antiemético leve-moderado"],
    farmacocinetica: { absorcion: "IV: 100%", distribucion: "Amplia, depende de infusión", metabolismo: "Desaminación intracelular por citidina desaminasa", eliminacion: "Renal 92-98%", vidaMedia: "Infusión corta: 42-94 min. Infusión larga: 4-10h" },
    almacenamiento: "Temperatura ambiente. Reconstituido: 24h a TA (no refrigerar, precipita)",
    unidadId: "u11", capituloId: "c1102",
    searchText: "",
    riesgosSobremedicacion: { sintomas: "Mielosupresión profunda, toxicidad hepática y renal", manejo: "Soporte hematológico, no antídoto específico" }
  },
  {
    id: "etanercept",
    nombre: "Etanercept",
    nombreGenerico: "Etanercept",
    nombresComerciales: ["Enbrel"],
    familia: "Anticuerpos monoclonales",
    clasificacion: "Anti-TNFα (proteína de fusión receptor-Fc)",
    mecanismoAccion: "Proteína de fusión del dominio extracelular del receptor p75 de TNF con la porción Fc de IgG1. Se une competitivamente a TNF-α y TNF-β solubles, impidiendo su unión a receptores celulares. Diferente de los anticuerpos anti-TNF: no lisa células.",
    indicaciones: ["Artritis reumatoide", "Artritis psoriásica", "Espondilitis anquilosante", "Psoriasis en placas", "Artritis idiopática juvenil"],
    contraindicaciones: ["Sepsis activa", "Infección activa grave", "TB activa no tratada", "Hipersensibilidad"],
    efectosAdversos: ["Reacción en sitio de inyección", "Infecciones respiratorias", "Cefalea", "Reactivación de TB (menos que anticuerpos anti-TNF)", "Enfermedades desmielinizantes (raro)", "Pancitopenia (rara)", "ICC empeoramiento"],
    interacciones: ["Vacunas vivas (contraindicadas)", "Anakinra (no combinar, infecciones serias)", "Otros biológicos (no combinar)", "Ciclofosfamida (no combinar: mayor malignidad)"],
    viaAdministracion: ["subcutanea"],
    dosis: { adultos: "50 mg SC semanal (o 25 mg 2 veces/semana)", pediatria: "AIJ ≥2 años: 0.8 mg/kg SC semanal (máx 50 mg)" },
    presentaciones: ["Jeringa prellenada 25 mg/0.5 mL", "Jeringa prellenada 50 mg/mL", "Autoinyector 50 mg/mL", "Polvo para reconstitución 25 mg"],
    embarazo: "Categoría B - Datos limitados pero generalmente continuado si necesario",
    lactancia: "Compatible (mínima excreción en leche)",
    cuidadosEnfermeria: ["Screening TB antes de iniciar (PPD/IGRA + Rx)", "Autoadministración SC tras entrenamiento", "Rotar sitios de inyección", "Refrigerar, sacar 15-30 min antes de inyectar", "Menos riesgo de TB que otros anti-TNF (no lisa macrófagos)", "Vigilar signos de infección, desmielinización, ICC", "Suspender si cirugía mayor (vida media 4 días)"],
    farmacocinetica: { absorcion: "SC: biodisponibilidad 76%, Tmax 48-69h", distribucion: "Vd 7.6 L", metabolismo: "Reticuloendotelial", eliminacion: "Proteólisis", vidaMedia: "102 horas (~4.3 días)" },
    almacenamiento: "Refrigerar 2-8°C. No congelar. Proteger de la luz",
    unidadId: "u09", capituloId: "c0901",
    searchText: "",
    riesgosSobremedicacion: { sintomas: "Inmunosupresión, infecciones oportunistas", manejo: "Soporte antimicrobiano, observación (vida media ~4 días)" }
  },
  {
    id: "cloruro_potasio",
    nombre: "Cloruro de Potasio",
    nombreGenerico: "Cloruro de potasio",
    nombresComerciales: ["KCl", "Kalium"],
    familia: "Electrolitos",
    clasificacion: "Suplemento de potasio",
    mecanismoAccion: "Aporta iones potasio y cloruro para corregir déficit. El potasio es el principal catión intracelular, esencial para conducción nerviosa, contracción muscular, función cardíaca y equilibrio ácido-base.",
    indicaciones: ["Hipopotasemia", "Prevención de hipopotasemia (con diuréticos)", "Reposición de potasio en líquidos IV", "Cetoacidosis diabética (con insulina)", "Alcalosis metabólica hipoclorémica"],
    contraindicaciones: ["Hiperpotasemia", "Insuficiencia renal anúrica", "Enfermedad de Addison no tratada", "Crush syndrome", "Uso concomitante de diuréticos ahorradores de K+ sin monitorización"],
    efectosAdversos: ["Dolor y flebitis en sitio IV", "Náuseas/vómitos (oral)", "Úlceras GI (comprimidos)", "Hiperpotasemia (dosis excesiva)", "Arritmias cardíacas (si rápido o concentrado)", "Paro cardíaco (sobredosis)"],
    interacciones: ["IECA/ARA-II (hiperpotasemia)", "Espironolactona/triamtereno (hiperpotasemia)", "Digoxina (el K+ modifica respuesta a digoxina)", "Insulina (desplaza K+ al intracelular)"],
    viaAdministracion: ["oral", "intravenosa"],
    dosis: { adultos: "IV: 10-40 mEq/h (máx 40 mEq/h por vía central, 10 mEq/h periférica). Concentración máx periférica: 40 mEq/L. Central: 60-80 mEq/L. Oral: 20-100 mEq/día dividido", pediatria: "IV: 0.5-1 mEq/kg/h (máx 40 mEq/h). Concentración similar" },
    presentaciones: ["Ampolla 10% (1.34 mEq/mL) 10 mL = 13.4 mEq", "Ampolla 20% (2.68 mEq/mL) 10 mL = 26.8 mEq", "Comprimidos 600 mg (8 mEq)", "Solución oral 20 mEq/15 mL"],
    embarazo: "Categoría C - Compatible si necesario",
    lactancia: "Compatible",
    cuidadosEnfermeria: ["⚠️ NUNCA EN BOLO IV DIRECTO (paro cardíaco)", "SIEMPRE diluir antes de administrar IV", "Velocidad máx periférica: 10 mEq/h. Central: 20-40 mEq/h", "Concentración máx periférica: 40 mEq/L", "K+ sérico cada 2-4h durante reposición agresiva", "ECG continuo si K+ <2.5 o reposición >20 mEq/h", "Dolor en vena periférica: diluir más, reducir velocidad", "Verificar diuresis antes de reponer (>0.5 mL/kg/h)", "Oral con alimentos y abundante agua (previene úlceras GI)"],
    farmacocinetica: { absorcion: "Oral: absorción GI rápida. IV: inmediata", distribucion: "98% intracelular", metabolismo: "No se metaboliza", eliminacion: "Renal 90%, fecal 10%", vidaMedia: "No aplicable (electrolito)" },
    almacenamiento: "Temperatura ambiente",
    unidadId: "u10", capituloId: "c1001",
    searchText: "",
    riesgosSobremedicacion: { sintomas: "Hiperpotasemia: parestesias, debilidad, parálisis, bradicardia, ondas T picudas, FV, paro cardíaco", manejo: "Gluconato de calcio 10% IV (estabiliza membrana), insulina + glucosa, bicarbonato, salbutamol nebulizado, resinas (kayexalate), diálisis si severo" }
  },
  {
    id: "anastrozol",
    nombre: "Anastrozol",
    nombreGenerico: "Anastrozol",
    nombresComerciales: ["Arimidex"],
    familia: "Antineoplásicos",
    clasificacion: "Inhibidor de aromatasa no esteroideo (3ra generación)",
    mecanismoAccion: "Inhibe selectivamente la aromatasa (CYP19), enzima que convierte andrógenos a estrógenos en tejidos periféricos. Reduce los niveles de estrógenos circulantes >80% en mujeres posmenopáusicas. No tiene actividad estrogénica ni progestágena.",
    indicaciones: ["Cáncer de mama hormonosensible en posmenopáusicas (adyuvante)", "Cáncer de mama metastásico", "Quimioprevención de cáncer de mama en alto riesgo"],
    contraindicaciones: ["Premenopausia (salvo con supresión ovárica)", "Embarazo", "Lactancia", "Hipersensibilidad"],
    efectosAdversos: ["Sofocos/bochornos", "Artralgias/mialgias (frecuente)", "Osteoporosis/fracturas", "Sequedad vaginal", "Fatiga", "Cefalea", "Hipercolesterolemia", "Síndrome del túnel carpiano"],
    interacciones: ["Tamoxifeno (reduce niveles de anastrozol, no combinar)", "Estrógenos (antagonismo directo)"],
    viaAdministracion: ["oral"],
    dosis: { adultos: "1 mg cada 24h por 5 años (adyuvante) o 7-10 años en alto riesgo", pediatria: "No aplicable" },
    presentaciones: ["Comprimidos 1 mg"],
    embarazo: "Categoría X - Contraindicado",
    lactancia: "Contraindicado",
    cuidadosEnfermeria: ["Densitometría ósea basal y cada 1-2 años", "Suplementar calcio + vitamina D", "Perfil lipídico anual", "Manejo de artralgias: ejercicio regular, AINE si necesario", "Puede tomarse a cualquier hora, con o sin alimentos", "Adherencia clave: tratamiento prolongado (5-10 años)", "Monitorizar síntomas musculoesqueléticos (principal causa de abandono)"],
    farmacocinetica: { absorcion: "Oral: rápida, no afectada por alimentos", distribucion: "Unión a proteínas 40%", metabolismo: "Hepático (N-dealquilación, hidroxilación, glucuronidación)", eliminacion: "Renal 10% sin cambios, hepático", vidaMedia: "40-50 horas" },
    almacenamiento: "Temperatura ambiente",
    unidadId: "u11", capituloId: "c1102",
    searchText: "",
    riesgosSobremedicacion: { sintomas: "No toxicidad aguda significativa. Dosis hasta 60 mg toleradas", manejo: "Soporte sintomático" }
  },
  {
    id: "somatostatina",
    nombre: "Somatostatina",
    nombreGenerico: "Somatostatina",
    nombresComerciales: ["Stilamin", "Somatostatina"],
    familia: "Hormonas",
    clasificacion: "Hormona peptídica inhibitoria (análogo natural)",
    mecanismoAccion: "Péptido de 14 aminoácidos que inhibe la secreción de múltiples hormonas (GH, TSH, insulina, glucagón, gastrina, secretina, VIP). Reduce el flujo sanguíneo esplácnico. Inhibe la motilidad y secreción gastrointestinal.",
    indicaciones: ["Hemorragia variceal aguda (alternativa a octreotida)", "Hemorragia digestiva alta severa", "Fístulas pancreáticas y GI", "Pancreatitis aguda severa (evidencia limitada)"],
    contraindicaciones: ["Hipersensibilidad", "Embarazo (a menos que sea vital)"],
    efectosAdversos: ["Náuseas", "Dolor abdominal", "Hiperglucemia", "Bradicardia (bolo rápido)", "Rubor facial", "Hiperglucemia seguida de hipoglucemia (rebote)", "Hipotensión"],
    interacciones: ["Insulina/ADO (efecto glucémico variable)", "Ciclosporina (disminuye absorción)", "Betabloqueantes (bradicardia aditiva)"],
    viaAdministracion: ["intravenosa"],
    dosis: { adultos: "Hemorragia variceal: bolo 250 mcg IV en 3-5 min, luego infusión 250 mcg/h (3.5 mcg/kg/h) x 2-5 días. Fístula: 250 mcg/h infusión continua", pediatria: "3.5 mcg/kg/h infusión continua" },
    presentaciones: ["Ampolla 250 mcg/mL (3 mL)", "Ampolla 3 mg/mL (1 mL)"],
    embarazo: "Categoría B - Solo si estrictamente necesario",
    lactancia: "Precaución",
    cuidadosEnfermeria: ["Infusión continua obligatoria (vida media 1-3 min)", "Administrar con bomba de infusión", "Diluir en SS 0.9%", "Monitorizar glucemia cada 4-6h", "Vigilar bradicardia durante bolo (administrar lentamente)", "No suspender abruptamente (efecto rebote)", "Monitorizar sangrado, signos vitales, hemoglobina"],
    farmacocinetica: { absorcion: "IV: inmediata", distribucion: "Vd 15 L, unión a proteínas 65%", metabolismo: "Degradación enzimática rápida", eliminacion: "Renal y hepática", vidaMedia: "1-3 minutos (requiere infusión continua)" },
    almacenamiento: "Refrigerar. Diluido: usar en 24h",
    unidadId: "u07", capituloId: "c0701",
    searchText: "",
    riesgosSobremedicacion: { sintomas: "Bradicardia, hipoglucemia/hiperglucemia, hipotensión", manejo: "Suspender infusión (vida media 1-3 min, recuperación rápida), atropina si bradicardia, glucosa si hipoglucemia" }
  },
  {
    id: "andexanet",
    nombre: "Andexanet Alfa",
    nombreGenerico: "Andexanet alfa",
    nombresComerciales: ["Andexxa", "Ondexxya"],
    familia: "Antídotos",
    clasificacion: "Factor Xa inactivo recombinante (señuelo)",
    mecanismoAccion: "Proteína recombinante del factor Xa humano modificada, catalíticamente inactiva. Actúa como señuelo: se une competitivamente a los inhibidores directos del factor Xa (rivaroxabán, apixabán, edoxabán) y a HBPM/fondaparinux, secuestrándolos y restaurando la actividad del Xa endógeno.",
    indicaciones: ["Reversión de anticoagulación por inhibidores directos del factor Xa en hemorragia mayor que amenaza la vida", "Reversión de apixabán", "Reversión de rivaroxabán"],
    contraindicaciones: ["Hipersensibilidad"],
    efectosAdversos: ["Eventos tromboembólicos (18%: trombosis venosa/arterial)", "Reacciones a la infusión", "Infecciones urinarias", "Neumonía", "Ictus", "TVP/TEP"],
    interacciones: ["Heparina/HBPM (las revierte parcialmente)", "Puede interferir con ensayos de laboratorio de actividad anti-Xa"],
    viaAdministracion: ["intravenosa"],
    dosis: { adultos: "Dosis baja (apixabán ≤5mg o rivaroxabán >7h): bolo 400 mg a 30 mg/min, seguido de infusión 4 mg/min x120 min (480 mg). Dosis alta (rivaroxabán ≤7h o apixabán >5mg): bolo 800 mg, infusión 8 mg/min x 120 min (960 mg)", pediatria: "No aprobado" },
    presentaciones: ["Polvo para reconstitución 200 mg/vial"],
    embarazo: "Sin datos, usar si amenaza vital",
    lactancia: "Sin datos",
    cuidadosEnfermeria: ["Reconstituir cada vial con 20 mL agua estéril (requiere múltiples viales)", "Administrar bolo IV a 30 mg/min usando filtro 0.2 μm", "Monitorizar signos de trombosis post-administración", "Reiniciar anticoagulación lo antes posible post-hemostasia", "La actividad anti-Xa puede elevarse nuevamente 1-2h post (efecto transitorio)", "Costo muy elevado: ~$50,000 USD por tratamiento", "Alternativa: CCP 4 factores (más económico, ampliamente disponible)"],
    farmacocinetica: { absorcion: "IV: inmediata", distribucion: "Vd aproximado al plasma", metabolismo: "Proteólisis", eliminacion: "Catabolismo", vidaMedia: "5-7 horas" },
    almacenamiento: "Refrigerar. Reconstituido: usar en 8h a TA o 24h refrigerado",
    unidadId: "u05", capituloId: "c0502",
    searchText: "",
    riesgosSobremedicacion: { sintomas: "Trombosis (reversión excesiva de anticoagulación)", manejo: "Reiniciar anticoagulación, antitrombóticos si evento trombótico, soporte" }
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
