const fs = require('fs');
const path = require('path');

const drugsPath = path.join(__dirname, '..', 'src', 'data', 'drugs.json');
const catsPath = path.join(__dirname, '..', 'src', 'data', 'categories.json');

const drugs = JSON.parse(fs.readFileSync(drugsPath, 'utf8'));
const cats = JSON.parse(fs.readFileSync(catsPath, 'utf8'));

const newDrugs = [
  // ── ANESTESIA/SEDACIÓN ──
  {
    id: "remimazolam", nombre: "Remimazolam", nombreGenerico: "Remimazolam besilato",
    nombresComerciales: ["Byfavo"],
    familia: "Benzodiacepinas de acción ultracorta", clasificacion: "Sedante/hipnótico — benzodiacepina de acción ultracorta",
    mecanismoAccion: "Agonista del receptor GABA-A con metabolismo por esterasas tisulares (no CYP), lo que le confiere acción ultracorta y recuperación predecible independiente de función hepática/renal. Nota: Remimazolam ha reemplazado parcialmente a midazolam en sedación procedural por su recuperación más rápida y predecible, y es reversible con flumazenilo.",
    indicaciones: ["Sedación procedural (endoscopia, broncoscopia)", "Inducción y mantenimiento de anestesia general", "Sedación en UCI (uso emergente)"],
    contraindicaciones: ["Hipersensibilidad a benzodiacepinas", "Miastenia gravis severa", "Insuficiencia respiratoria severa sin ventilación mecánica"],
    efectosAdversos: ["Hipotensión", "Depresión respiratoria", "Náuseas", "Bradicardia", "Cefalea", "Hipo"],
    interacciones: ["Opioides: depresión respiratoria sinérgica (reducir dosis)", "No interacciones CYP (metabolismo por esterasas)", "Flumazenilo revierte efecto"],
    viaAdministracion: ["IV"],
    dosis: { adulto: "Sedación procedural: 5 mg bolo IV en 1 min, redosis 2.5 mg cada 2 min si necesario. Anestesia: inducción 6-12 mg/kg/h, mantenimiento 1-2 mg/kg/h" },
    presentaciones: ["Vial liofilizado 20 mg para reconstitución"],
    embarazo: "C", lactancia: "Precaución. Probablemente seguro por vida media ultracorta",
    cuidadosEnfermeria: ["Monitorización continua: SpO2, capnografía, TA, FC", "Tener flumazenilo disponible", "Equipos de vía aérea y reanimación accesibles", "No requiere ajuste en insuficiencia hepática o renal", "Recuperación rápida: paciente alerta en ~12 min post-última dosis", "No mezclar con Ringer Lactato (precipita)"],
    farmacocinetica: { metabolismo: "Esterasas tisulares (no CYP450)", excrecion: "Renal (metabolito inactivo)", vidaMedia: "7-11 minutos", inicioAccion: "1-3 minutos", duracionAccion: "10-15 minutos tras bolo único" },
    almacenamiento: "Temperatura ambiente. Reconstituido: usar en 24h",
    unidadId: "u12", capituloId: "c12_03",
    preparacionParenteral: {
      reconstitucion: "Reconstituir 20 mg con 8.2 mL SSF = 2.5 mg/mL",
      velocidadAdministracion: "Bolo IV en 1 minuto",
      estabilidad: "24h a temperatura ambiente reconstituido",
      solucionesCompatibles: { ssf: true, sg5: true, otras: "INCOMPATIBLE con Ringer Lactato" }
    }
  },
  // ── HEMODERIVADOS/BIOLÓGICOS HOSPITALARIOS ──
  {
    id: "inmunoglobulina_iv", nombre: "Inmunoglobulina Humana IV (IgIV)", nombreGenerico: "Inmunoglobulina humana normal intravenosa",
    nombresComerciales: ["Privigen", "Gamunex-C", "Octagam", "Flebogamma", "Kiovig"],
    familia: "Inmunoglobulinas", clasificacion: "Hemoderivado — inmunoglobulina policlonal IgG",
    mecanismoAccion: "Preparado de IgG policlonal purificada de plasma de miles de donantes. Múltiples mecanismos: neutralización de patógenos y toxinas, modulación inmune (bloqueo receptores Fc, regulación de citocinas, inhibición de complemento), reposición de anticuerpos en inmunodeficiencias. A dosis altas tiene efecto inmunomodulador/antiinflamatorio.",
    indicaciones: ["Inmunodeficiencias primarias (agammaglobulinemia, inmunodeficiencia común variable)", "Púrpura trombocitopénica inmune (PTI)", "Síndrome de Guillain-Barré", "Enfermedad de Kawasaki", "Polineuropatía desmielinizante inflamatoria crónica (CIDP)", "Prevención infecciones en trasplante", "Miastenia gravis (crisis)"],
    contraindicaciones: ["Deficiencia de IgA con anticuerpos anti-IgA (anafilaxia)", "Hipersensibilidad previa a inmunoglobulinas", "Intolerancia hereditaria a fructosa (formulaciones con sorbitol)"],
    efectosAdversos: ["Cefalea (frecuente)", "Fiebre y escalofríos", "Náuseas", "Mialgias", "Reacciones infusionales (flush, taquicardia)", "Meningitis aséptica", "Insuficiencia renal aguda (formulaciones con sacarosa)", "Eventos tromboembólicos (raro)", "Hemólisis (raro, pacientes grupo A/B/AB)"],
    interacciones: ["Vacunas vivas: esperar 3-11 meses post-IgIV (reduce eficacia vacunal)", "Puede interferir con determinaciones serológicas"],
    viaAdministracion: ["IV"],
    dosis: { adulto: "Reposición: 400-600 mg/kg cada 3-4 semanas. Inmunomodulación (PTI, Guillain-Barré): 1-2 g/kg dividido en 2-5 días. Kawasaki: 2 g/kg dosis única", pediatrico: "Kawasaki: 2 g/kg IV en 10-12h. Reposición: 400-600 mg/kg cada 3-4 semanas" },
    presentaciones: ["Solución al 5% (50 mg/mL) y 10% (100 mg/mL) en viales de 50-400 mL"],
    embarazo: "C", lactancia: "Se excreta en leche. Probablemente seguro",
    cuidadosEnfermeria: ["Premedicación: paracetamol + antihistamínico 30 min antes", "Iniciar infusión LENTA: 0.5 mL/kg/h × 30 min, luego escalar cada 15-30 min hasta máx 4-8 mL/kg/h", "Monitorizar signos vitales cada 15 min primera hora, luego cada 30 min", "Detener si fiebre >38.5°C, escalofríos severos, hipotensión, disnea", "Hidratación pre y post (prevención IRA)", "Vigilar cefalea severa post-infusión (meningitis aséptica)", "Registrar lote y marca para trazabilidad de hemoderivados", "No mezclar con otros fármacos o fluidos"],
    farmacocinetica: { distribucion: "Vd: 0.05-0.13 L/kg. Distribución intravascular → extravascular en 3-5 días", metabolismo: "Catabolismo en sistema reticuloendotelial", vidaMedia: "21-35 días (IgG endógena)", inicioAccion: "PTI: elevación plaquetas en 24-48h" },
    almacenamiento: "Refrigerar 2-8°C o según fabricante. No congelar. Atemperar antes de infundir",
    unidadId: "u12", capituloId: "c12_02",
    preparacionParenteral: {
      reconstitucion: "Lista para uso (solución al 5% o 10%)",
      velocidadAdministracion: "Iniciar 0.5 mL/kg/h, escalar cada 15-30 min hasta máx 4-8 mL/kg/h según tolerancia",
      estabilidad: "Usar inmediatamente tras apertura. No reutilizar sobrante",
      solucionesCompatibles: { ssf: false, sg5: false, otras: "NO diluir ni mezclar con ningún otro fluido o fármaco. Administrar pura por línea dedicada" },
      observaciones: "Requiere consentimiento informado en muchos centros (hemoderivado). Registrar lote obligatorio."
    }
  },
  {
    id: "suero_antiofidico", nombre: "Suero Antiofídico Polivalente", nombreGenerico: "Antiveneno polivalente (fragmentos F(ab')₂ equinos)",
    nombresComerciales: ["Antivipmyn", "CroFab", "Suero Antiofídico INS", "Polyvalent Snake Antivenom"],
    familia: "Antivenenos", clasificacion: "Antídoto — inmunoglobulina equina antiofídica",
    mecanismoAccion: "Fragmentos F(ab')₂ de inmunoglobulina equina purificada obtenidos por inmunización de caballos con venenos de serpientes. Los anticuerpos neutralizan las toxinas del veneno (fosfolipasas, metaloproteasas, neurotoxinas, hemotoxinas) impidiendo su unión a tejidos diana.",
    indicaciones: ["Envenenamiento por mordedura de serpiente con signos de toxicidad sistémica", "Coagulopatía por veneno ofídico", "Síndrome compartimental por envenenamiento"],
    contraindicaciones: ["No hay contraindicación absoluta en envenenamiento grave (beneficio > riesgo)", "Hipersensibilidad conocida a proteínas equinas (premedicar y vigilar)"],
    efectosAdversos: ["Reacción anafiláctica/anafilactoide (5-25%)", "Enfermedad del suero (5-7 días post: fiebre, artralgias, rash, adenopatías)", "Fiebre", "Urticaria", "Broncoespasmo", "Hipotensión"],
    interacciones: ["Adrenalina debe estar disponible para anafilaxia", "Corticoides y antihistamínicos como premedicación"],
    viaAdministracion: ["IV"],
    dosis: { adulto: "Según gravedad: Leve: 4-6 viales. Moderado: 8-12 viales. Grave: 15-25 viales. Diluir en 250-500 mL SSF e infundir en 1-2h. Puede repetirse según evolución clínica", pediatrico: "MISMA dosis que adultos (se neutraliza veneno, no se ajusta por peso)" },
    presentaciones: ["Viales liofilizados para reconstitución (contenido varía por fabricante y región)"],
    embarazo: "C", lactancia: "Administrar si indicado (emergencia vital)",
    cuidadosEnfermeria: ["EMERGENCIA: no retrasar administración por pruebas cutáneas", "Premedicación: hidrocortisona 200 mg IV + difenhidramina 50 mg IV + ranitidina 50 mg IV", "Iniciar infusión lenta (10 mL/h × 10 min) y escalar si tolera", "Tener ADRENALINA PREPARADA junto a la cama", "Monitorización continua: TA, FC, SpO2, FR", "NO aplicar torniquete, hielo, ni succionar la herida", "Inmovilizar miembro afectado por debajo del nivel del corazón", "Marcar borde del edema y hora para seguimiento de progresión", "Control de coagulación seriado (TP, TTPa, fibrinógeno, plaquetas) cada 6h", "Vigilar signos de enfermedad del suero 5-14 días post (tratar con prednisona)"],
    farmacocinetica: { distribucion: "Intravascular inicialmente, luego extravascular", vidaMedia: "F(ab')₂: 12-24 horas. Fab: 15-20 horas", inicioAccion: "Corrección coagulopatía en 6-12h" },
    almacenamiento: "Refrigerar 2-8°C. No congelar. Verificar fecha de caducidad",
    unidadId: "u11", capituloId: "c11_01",
    preparacionParenteral: {
      reconstitucion: "Reconstituir cada vial con diluyente provisto o 10 mL de agua estéril. Agitar suavemente (no sacudir)",
      dilucion: "Diluir la dosis total en 250-500 mL de SSF",
      velocidadAdministracion: "Iniciar 25-50 mL/h × 10 min, luego escalar a 250 mL/h si tolera",
      estabilidad: "Usar inmediatamente tras reconstitución",
      solucionesCompatibles: { ssf: true, sg5: false }
    }
  },
  // ── UROLOGÍA ──
  {
    id: "bcg_vesical", nombre: "BCG Vesical (Bacilo Calmette-Guérin)", nombreGenerico: "BCG liofilizado para instilación vesical",
    nombresComerciales: ["OncoTICE", "TheraCys", "BCG-medac"],
    familia: "Inmunoterapia vesical", clasificacion: "Inmunoestimulante — micobacteria atenuada para uso intravesical",
    mecanismoAccion: "Cepa atenuada de Mycobacterium bovis que al instilarse en vejiga provoca respuesta inmune local intensa: reclutamiento de linfocitos T CD4+, células NK, macrófagos y liberación de citocinas (IL-2, TNF-α, IFN-γ) que destruyen células tumorales uroteliales residuales. Mecanismo de inmunoterapia intravesical más eficaz para prevención de recurrencia tumoral.",
    indicaciones: ["Carcinoma urotelial de vejiga no músculo-invasivo (CIS, Ta, T1)", "Prevención de recurrencia post-resección transuretral de tumor vesical (RTUV)", "Carcinoma in situ (CIS) vesical"],
    contraindicaciones: ["Infección urinaria activa", "Hematuria macroscópica", "Traumatismo uretral reciente o cateterismo traumático", "Inmunosupresión severa (VIH con CD4 <200, quimioterapia sistémica)", "Tuberculosis activa", "Embarazo"],
    efectosAdversos: ["Cistitis por BCG (disuria, frecuencia, hematuria — muy frecuente)", "Síndrome gripal (fiebre, malestar, mialgias — frecuente)", "Fiebre >38.5°C persistente", "BCGosis (diseminación sistémica — rara pero grave)", "Prostatitis granulomatosa", "Epididimitis", "Neumonitis", "Hepatitis granulomatosa"],
    interacciones: ["Antibióticos: no administrar quinolonas 48h antes/después (inhiben BCG)", "Inmunosupresores reducen eficacia", "No usar con instilación vesical de otros agentes"],
    viaAdministracion: ["IV"],
    dosis: { adulto: "Inducción: 1 vial intravesical semanal × 6 semanas (inicio 2-4 sem post-RTUV). Mantenimiento: 1 vial semanal × 3 semanas a meses 3, 6, 12, 18, 24, 30, 36" },
    presentaciones: ["Vial liofilizado con 1-8 × 10⁸ UFC de M. bovis BCG para reconstitución"],
    embarazo: "X", lactancia: "Contraindicado",
    cuidadosEnfermeria: ["Administración INTRAVESICAL mediante sonda Foley (no confundir con IV)", "Verificar urocultivo negativo antes de cada instilación", "Si hematuria macroscópica o ITU: POSPONER instilación", "Técnica estéril. Personal con EPI (guantes, mascarilla, bata)", "Paciente retiene en vejiga 2 horas, rotando posición cada 15 min", "Tras micción: desinfectar inodoro con lejía durante 6h", "Educar: hidratación abundante post-instilación", "Fiebre >38.5°C que persiste >48h → sospechar BCGosis → contactar urología urgente", "BCGosis es emergencia: requiere triple terapia antituberculosa"],
    farmacocinetica: { absorcion: "Local vesical. Absorción sistémica mínima en mucosa intacta", inicioAccion: "Respuesta inmune local en 2-4 semanas" },
    almacenamiento: "Refrigerar 2-8°C. Proteger de la luz. Es MICROORGANISMO VIVO",
    unidadId: "u12", capituloId: "c12_05"
  },
  // ── CARDIO NUEVOS ──
  {
    id: "vericiguat", nombre: "Vericiguat", nombreGenerico: "Vericiguat",
    nombresComerciales: ["Verquvo"],
    familia: "Estimuladores de guanilato ciclasa", clasificacion: "Estimulador oral de la guanilato ciclasa soluble (sGC)",
    mecanismoAccion: "Estimula directamente la guanilato ciclasa soluble (sGC) e incrementa su sensibilidad al óxido nítrico endógeno. Aumenta la producción de GMPc, produciendo vasodilatación, efectos antiinflamatorios, antifibróticos y cardioprotectores. Aborda la disfunción de la vía NO-sGC-GMPc presente en la IC.",
    indicaciones: ["Insuficiencia cardíaca crónica sintomática con FEVI reducida tras descompensación reciente"],
    contraindicaciones: ["Uso concomitante con otros estimuladores de sGC (riociguat)", "Uso con inhibidores de PDE5 (sildenafilo, tadalafilo)", "Embarazo", "Hipotensión sintomática"],
    efectosAdversos: ["Hipotensión", "Anemia", "Mareo", "Síncope", "Náuseas"],
    interacciones: ["CONTRAINDICADO con riociguat y PDE5i (hipotensión severa)", "IBP y antiácidos pueden reducir absorción", "No ajuste por CYP significativo"],
    viaAdministracion: ["oral"],
    dosis: { adulto: "Inicio: 2.5 mg/día con alimentos. Titular cada 2 semanas: 2.5 → 5 → 10 mg/día (dosis objetivo)" },
    presentaciones: ["Comprimidos 2.5 mg, 5 mg, 10 mg"],
    embarazo: "X", lactancia: "Contraindicado",
    cuidadosEnfermeria: ["Tomar SIEMPRE con alimentos (mejora absorción 40%)", "Control TA antes de cada titulación", "No titular si TAS <100 mmHg", "Si síncope/hipotensión: reducir a dosis previa tolerada", "No combinar con sildenafilo ni riociguat", "Monitorizar hemoglobina (puede causar anemia)"],
    farmacocinetica: { absorcion: "Oral con alimentos: biodisponibilidad 93%", metabolismo: "Glucuronidación (UGT1A1, UGT1A9)", excrecion: "Renal 53%, fecal 45%", vidaMedia: "20 horas" },
    almacenamiento: "Temperatura ambiente",
    unidadId: "u02", capituloId: "c02_03"
  },
  {
    id: "inclisiran", nombre: "Inclisirán", nombreGenerico: "Inclisirán sódico",
    nombresComerciales: ["Leqvio"],
    familia: "Terapias de ARN interferente", clasificacion: "ARN de interferencia pequeño (siRNA) anti-PCSK9",
    mecanismoAccion: "Pequeño ARN interferente (siRNA) conjugado con N-acetilgalactosamina (GalNAc) que se dirige específicamente a hepatocitos. Silencia el ARNm de PCSK9 en el hígado, impidiendo su síntesis. Sin PCSK9, los receptores de LDL no se degradan y se reciclan a la superficie del hepatocito, aumentando la captación y eliminación de LDL-C plasmático.",
    indicaciones: ["Hipercolesterolemia primaria (heterocigota familiar y no familiar)", "Enfermedad aterosclerótica establecida", "Pacientes que no alcanzan objetivos con estatinas ± ezetimiba"],
    contraindicaciones: ["Hipersensibilidad", "Insuficiencia hepática severa (Child-Pugh C — no estudiado)"],
    efectosAdversos: ["Reacciones en sitio de inyección (eritema, dolor, prurito)", "Artralgias", "ITU", "Diarrea", "Bronquitis"],
    interacciones: ["No interacciones farmacológicas significativas (mecanismo siRNA no involucra CYP)", "Compatible con estatinas y ezetimiba"],
    viaAdministracion: ["SC"],
    dosis: { adulto: "284 mg SC. Esquema: dosis basal, a los 3 meses, y cada 6 meses después. Solo 2 inyecciones/año en mantenimiento" },
    presentaciones: ["Jeringa precargada 284 mg/1.5 mL"],
    embarazo: "X", lactancia: "Contraindicado",
    cuidadosEnfermeria: ["Administración SC en abdomen, muslo o brazo", "Solo 2 dosis al año en mantenimiento (excelente adherencia)", "Sacar de nevera 30 min antes de inyectar", "Control lipídico a los 3 meses de primera dosis", "Educar: este fármaco NO reemplaza a la estatina (complementa)", "Vigilar reacciones locales (generalmente leves y transitorias)"],
    farmacocinetica: { absorcion: "SC: biodisponibilidad ~85%", metabolismo: "Degradación por nucleasas a nucleótidos inactivos", excrecion: "Renal (metabolitos)", vidaMedia: "9 horas (plasmática). Efecto: 6 meses (silenciamiento hepático)", inicioAccion: "Reducción LDL-C en 14-30 días", duracionAccion: "6 meses" },
    almacenamiento: "Refrigerar 2-8°C. Fuera de nevera: estable 24h a TA",
    unidadId: "u02", capituloId: "c02_05"
  },
  {
    id: "finerenona", nombre: "Finerenona", nombreGenerico: "Finerenona",
    nombresComerciales: ["Kerendia"],
    familia: "Antagonistas del receptor mineralocorticoide", clasificacion: "ARM no esteroideo selectivo",
    mecanismoAccion: "Antagonista no esteroideo altamente selectivo del receptor mineralocorticoide (MR). A diferencia de espironolactona y eplerenona (esteroideos), finerenona tiene mayor selectividad por MR, distribución equilibrada corazón-riñón, y menor riesgo de ginecomastia e hiperpotasemia. Reduce inflamación y fibrosis cardíaca y renal mediadas por la sobreactivación del MR.",
    indicaciones: ["Enfermedad renal crónica asociada a diabetes tipo 2 (con albuminuria)", "Reducción de riesgo cardiovascular en ERC + DM2"],
    contraindicaciones: ["Hipersensibilidad", "Insuficiencia suprarrenal", "Uso con inhibidores potentes CYP3A4 + potasio >5 mEq/L", "Potasio >5.5 mEq/L al inicio"],
    efectosAdversos: ["Hiperpotasemia", "Hipotensión", "Hiponatremia", "Disminución de TFGe (transitoria al inicio)"],
    interacciones: ["Inhibidores potentes CYP3A4 (ketoconazol, claritromicina): contraindicado", "Inductores CYP3A4 (rifampicina): reducen eficacia", "Suplementos de potasio, IECA, ARA-II: mayor riesgo hiperpotasemia", "Pomelo: evitar"],
    viaAdministracion: ["oral"],
    dosis: { adulto: "Inicio según potasio: K+ ≤4.8: 20 mg/día. K+ 4.8-5.0: 10 mg/día. K+ >5: no iniciar. Titular a 10-20 mg/día según K+" },
    presentaciones: ["Comprimidos 10 mg y 20 mg"],
    embarazo: "X", lactancia: "Contraindicado",
    cuidadosEnfermeria: ["Verificar potasio sérico ANTES de iniciar (no iniciar si >5 mEq/L)", "Control de potasio a las 4 semanas, luego cada 4 meses", "Ajustar si K+ >5.5: reducir o suspender", "Puede tomarse con o sin alimentos", "Educar: evitar sustitutos de sal (cloruro de potasio)", "Vigilar TFGe (descenso inicial es esperado y no requiere suspensión)"],
    farmacocinetica: { absorcion: "Oral: biodisponibilidad 44%", metabolismo: "Hepático CYP3A4 (principal), CYP2C8", excrecion: "Renal 80%", vidaMedia: "2-3 horas", inicioAccion: "Reducción albuminuria en 1-4 meses" },
    almacenamiento: "Temperatura ambiente",
    unidadId: "u02", capituloId: "c02_04"
  },
  // ── HEMATOLOGÍA ──
  {
    id: "luspatercept", nombre: "Luspatercept", nombreGenerico: "Luspatercept",
    nombresComerciales: ["Reblozyl"],
    familia: "Agentes de maduración eritroide", clasificacion: "Proteína de fusión — trampa de ligandos de TGF-β",
    mecanismoAccion: "Proteína de fusión recombinante que se une a ligandos de la superfamilia TGF-β (GDF-11, GDF-8, activina B), impidiendo la señalización Smad2/3 aberrante que bloquea la eritropoyesis tardía. Restaura la maduración eritroide en la médula ósea, reduciendo la eritropoyesis ineficaz característica de los síndromes mielodisplásicos y beta-talasemia.",
    indicaciones: ["Anemia dependiente de transfusiones en síndromes mielodisplásicos (SMD) con sideroblastos en anillo", "Beta-talasemia dependiente de transfusiones en adultos", "Anemia en mielofibrosis (uso emergente)", "SMD de bajo riesgo primera línea (aprobación 2023)"],
    contraindicaciones: ["Hipersensibilidad", "Embarazo"],
    efectosAdversos: ["Fatiga", "Diarrea", "Astenia", "Náuseas", "Mareo", "Dolor óseo", "Artralgias", "Hipertensión", "Eventos tromboembólicos (raro)"],
    interacciones: ["No interacciones farmacológicas significativas", "Monitorizar si uso concomitante con EPO (no recomendado combinar)"],
    viaAdministracion: ["SC"],
    dosis: { adulto: "SMD: Inicio 1 mg/kg SC cada 3 semanas. Titular hasta 1.33-1.75 mg/kg según respuesta. Beta-talasemia: Inicio 1 mg/kg cada 3 sem, máx 1.25 mg/kg" },
    presentaciones: ["Vial liofilizado 25 mg y 75 mg"],
    embarazo: "X", lactancia: "Contraindicado. Anticoncepción 3 meses post última dosis",
    cuidadosEnfermeria: ["Administrar SC en abdomen, muslo o brazo", "Reconstituir con agua estéril. No agitar (espumar)", "Monitorizar hemoglobina pre-dosis (objetivo: independencia transfusional, NO Hb >12 g/dL)", "Si Hb >12 g/dL: reducir dosis o suspender", "Control TA en cada visita (riesgo HTA)", "Evaluar necesidad transfusional: registrar unidades recibidas por período", "Rotación de sitios de inyección SC"],
    farmacocinetica: { absorcion: "SC: Tmáx 7 días", vidaMedia: "11-14 días", inicioAccion: "Elevación Hb en 5-24 semanas" },
    almacenamiento: "Refrigerar 2-8°C. Reconstituido: usar en 8h. No congelar",
    unidadId: "u10", capituloId: "c10_03"
  },
  // ── PSIQUIATRÍA ──
  {
    id: "cariprazina", nombre: "Cariprazina", nombreGenerico: "Cariprazina clorhidrato",
    nombresComerciales: ["Vraylar", "Reagila"],
    familia: "Antipsicóticos atípicos", clasificacion: "Antipsicótico atípico — agonista parcial D3/D2/5-HT1A",
    mecanismoAccion: "Agonista parcial con alta afinidad preferencial por receptores D3 (10× mayor que D2), y también agonista parcial D2 y 5-HT1A. La selectividad por D3 puede explicar su eficacia única sobre síntomas negativos de esquizofrenia (abulia, aplanamiento afectivo) y en depresión bipolar, ya que los receptores D3 se concentran en circuitos mesolímbicos motivacionales.",
    indicaciones: ["Esquizofrenia en adultos", "Episodios maníacos/mixtos del trastorno bipolar I", "Depresión bipolar I", "Síntomas negativos predominantes de esquizofrenia"],
    contraindicaciones: ["Hipersensibilidad", "Uso con inhibidores potentes CYP3A4"],
    efectosAdversos: ["Acatisia (frecuente, dosis-dependiente)", "Extrapiramidalismo", "Insomnio", "Náuseas", "Mareo", "Ganancia ponderal (menor que olanzapina)", "Somnolencia", "Síndrome neuroléptico maligno (raro)"],
    interacciones: ["Inhibidores potentes CYP3A4: contraindicado", "Inductores CYP3A4: reducen eficacia", "Potencia sedación con depresores SNC"],
    viaAdministracion: ["oral"],
    dosis: { adulto: "Esquizofrenia: 1.5 mg/día, titular a 3-6 mg/día. Manía bipolar: 1.5 mg/día, titular a 3-6 mg/día. Depresión bipolar: 1.5 mg/día (dosis fija)" },
    presentaciones: ["Cápsulas 1.5 mg, 3 mg, 4.5 mg, 6 mg"],
    embarazo: "C", lactancia: "No recomendado",
    cuidadosEnfermeria: ["Evaluación basal: peso, glucemia, perfil lipídico, prolactina", "Vigilar acatisia (inquietud motora — efecto adverso más frecuente)", "Titular lentamente para minimizar EPS", "Controles metabólicos trimestrales (glucemia, lípidos, peso)", "Vida media activa muy larga (~2-4 semanas): efectos persisten semanas tras suspensión", "Educación: no suspender abruptamente sin consultar"],
    farmacocinetica: { absorcion: "Oral: bien absorbida", metabolismo: "CYP3A4, CYP2D6. Dos metabolitos activos (DDCAR y DCAR)", excrecion: "Renal y fecal", vidaMedia: "2-4 días (cariprazina). 1-3 semanas (metabolitos activos)", inicioAccion: "1-2 semanas" },
    almacenamiento: "Temperatura ambiente",
    unidadId: "u01", capituloId: "c01_06"
  },
  // ── DERMA BIOLÓGICOS ──
  {
    id: "risankizumab", nombre: "Risankizumab", nombreGenerico: "Risankizumab-rzaa",
    nombresComerciales: ["Skyrizi"],
    familia: "Anticuerpos anti-IL-23", clasificacion: "Anticuerpo monoclonal humanizado anti-subunidad p19 de IL-23",
    mecanismoAccion: "Se une selectivamente a la subunidad p19 de IL-23, bloqueando su interacción con el receptor IL-23R. Inhibe la diferenciación y activación de células Th17 sin afectar IL-12 (a diferencia de ustekinumab). Reduce la producción de IL-17A, IL-17F e IL-22 responsables de la inflamación y proliferación queratinocítica en psoriasis.",
    indicaciones: ["Psoriasis en placas moderada a severa en adultos", "Artritis psoriásica activa", "Enfermedad de Crohn moderada a severa"],
    contraindicaciones: ["Hipersensibilidad", "Infección activa clínicamente relevante (incluyendo TB activa)"],
    efectosAdversos: ["Infección respiratoria superior", "Cefalea", "Fatiga", "Reacciones en sitio de inyección", "Tiña (infecciones fúngicas superficiales)"],
    interacciones: ["No interacciones CYP significativas", "Evitar vacunas vivas durante tratamiento", "Descartar TB latente antes de iniciar (test IGRA/PPD)"],
    viaAdministracion: ["SC"],
    dosis: { adulto: "Psoriasis: 150 mg SC en semanas 0 y 4, luego cada 12 semanas. Crohn: inducción IV 600 mg sem 0, 4, 8, luego 360 mg SC cada 8 sem" },
    presentaciones: ["Jeringa/pluma precargada 75 mg/0.83 mL y 150 mg/mL"],
    embarazo: "B", lactancia: "Probablemente seguro (IgG monoclonal)",
    cuidadosEnfermeria: ["Descartar TB antes de iniciar (Quantiferón o PPD + Rx tórax)", "Enseñar autoadministración SC al paciente", "Sacar de nevera 30 min antes", "No inyectar en piel con placas activas, moretones o cicatrices", "Intervalo largo (cada 12 sem) favorece adherencia", "Vigilar infecciones, especialmente fúngicas superficiales"],
    farmacocinetica: { absorcion: "SC: biodisponibilidad 89%. Tmáx 3-14 días", metabolismo: "Catabolismo proteolítico", vidaMedia: "28 días", inicioAccion: "Mejoría PASI visible a semana 4" },
    almacenamiento: "Refrigerar 2-8°C. No congelar. Proteger de la luz",
    unidadId: "u09", capituloId: "c09_06"
  },
  // ── NEUMOLOGÍA ──
  {
    id: "tezepelumab", nombre: "Tezepelumab", nombreGenerico: "Tezepelumab-ekko",
    nombresComerciales: ["Tezspire"],
    familia: "Anticuerpos anti-TSLP", clasificacion: "Anticuerpo monoclonal humano anti-linfopoyetina estromal tímica (TSLP)",
    mecanismoAccion: "Se une a la linfopoyetina estromal tímica (TSLP), una citocina epitelial que actúa como alarma upstream iniciando la cascada inflamatoria asmática. Bloquea la activación de múltiples vías inflamatorias (Th2, eosinófilos, ILC2, mastocitos). Es el primer biológico eficaz en asma independientemente del fenotipo inflamatorio (eosinofílico y no eosinofílico).",
    indicaciones: ["Asma grave no controlada en adultos y adolescentes ≥12 años", "Asma grave independientemente de biomarcadores (eosinófilos, FeNO, IgE)"],
    contraindicaciones: ["Hipersensibilidad", "No usar para crisis asmáticas agudas"],
    efectosAdversos: ["Faringitis", "Artralgia", "Dolor de espalda", "Reacciones en sitio de inyección", "Reacciones alérgicas (raro)"],
    interacciones: ["No interacciones farmacológicas conocidas", "Evitar vacunas vivas", "No suspender corticoides inhalados abruptamente al iniciar"],
    viaAdministracion: ["SC"],
    dosis: { adulto: "210 mg SC cada 4 semanas", pediatrico: "≥12 años: 210 mg SC cada 4 semanas" },
    presentaciones: ["Jeringa/pluma precargada 210 mg/1.91 mL"],
    embarazo: "C", lactancia: "Precaución",
    cuidadosEnfermeria: ["Administrar SC en muslo, abdomen o brazo", "NO usar para alivio de crisis aguda", "Reducción gradual de corticoides orales (no suspender de golpe)", "Enseñar autoinyección al paciente", "Monitorizar función pulmonar (FEV1) y exacerbaciones", "Ventaja: eficaz en TODOS los fenotipos de asma grave"],
    farmacocinetica: { absorcion: "SC: biodisponibilidad 77%. Tmáx 3-10 días", metabolismo: "Catabolismo proteolítico", vidaMedia: "26 días", inicioAccion: "Reducción exacerbaciones desde semana 4" },
    almacenamiento: "Refrigerar 2-8°C. Fuera de nevera: 30 días máx a <30°C",
    unidadId: "u04", capituloId: "c04_05"
  },
  // ── GASTRO BIOLÓGICOS ──
  {
    id: "vedolizumab_new", nombre: "Vedolizumab", nombreGenerico: "Vedolizumab",
    nombresComerciales: ["Entyvio"],
    familia: "Anticuerpos anti-integrinas", clasificacion: "Anticuerpo monoclonal humanizado anti-integrina α4β7",
    mecanismoAccion: "Se une selectivamente a la integrina α4β7, bloqueando la interacción con MAdCAM-1 (molécula de adhesión endotelial intestinal). Impide la migración de linfocitos T al tejido intestinal inflamado. Es selectivo para el intestino (no afecta tráfico linfocitario cerebral como natalizumab), lo que elimina el riesgo de leucoencefalopatía multifocal progresiva.",
    indicaciones: ["Colitis ulcerosa moderada a severa refractaria a convencional o anti-TNF", "Enfermedad de Crohn moderada a severa refractaria", "Pouchitis crónica"],
    contraindicaciones: ["Hipersensibilidad", "Infección activa severa"],
    efectosAdversos: ["Nasofaringitis", "Cefalea", "Artralgia", "Náuseas", "Fiebre", "Infección respiratoria superior", "Fatiga", "Reacciones infusionales"],
    interacciones: ["No combinar con anti-TNF ni natalizumab", "Precaución con inmunosupresores (efecto aditivo)", "Vacunas vivas: administrar antes de iniciar si posible"],
    viaAdministracion: ["IV", "SC"],
    dosis: { adulto: "IV: 300 mg en semanas 0, 2, 6, luego cada 8 semanas. SC (mantenimiento): 108 mg cada 2 semanas tras inducción IV" },
    presentaciones: ["Vial 300 mg liofilizado para infusión IV", "Jeringa precargada 108 mg/0.68 mL SC"],
    embarazo: "B", lactancia: "Probablemente seguro",
    cuidadosEnfermeria: ["Descartar TB antes de iniciar", "Infusión IV en 30 min. Observar 1-2h post-infusión", "Premedicación no rutinaria (solo si reacciones previas)", "Si transición a SC: primera dosis SC a las 2 sem de última IV", "Evaluar respuesta: mejoría endoscópica y clínica a semana 14", "Enseñar autoinyección SC si mantenimiento subcutáneo"],
    farmacocinetica: { distribucion: "Principalmente intravascular", metabolismo: "Catabolismo proteolítico", vidaMedia: "IV: 25 días. SC: 26 días", inicioAccion: "Respuesta clínica: 6-14 semanas" },
    almacenamiento: "Refrigerar 2-8°C. No congelar",
    unidadId: "u05", capituloId: "c05_06",
    preparacionParenteral: {
      reconstitucion: "Reconstituir 300 mg con 4.8 mL agua estéril. Agitar suavemente 15 seg. Dejar reposar 20 min",
      dilucion: "Diluir en 250 mL SSF",
      velocidadAdministracion: "Infusión IV en 30 minutos",
      estabilidad: "12h refrigerado o 8h a temperatura ambiente una vez reconstituido",
      solucionesCompatibles: { ssf: true, sg5: false }
    }
  },
  // ── ENFERMEDADES RARAS ──
  {
    id: "migalastat", nombre: "Migalastat", nombreGenerico: "Migalastat clorhidrato",
    nombresComerciales: ["Galafold"],
    familia: "Chaperonas farmacológicas", clasificacion: "Chaperona farmacológica para α-galactosidasa A",
    mecanismoAccion: "Iminoazúcar análogo de galactosa que se une de forma reversible al sitio activo de la α-galactosidasa A (α-Gal A) mutante con mutaciones susceptibles. Estabiliza la enzima mal plegada en el retículo endoplásmico, facilitando su tránsito al lisosoma donde se disocia y permite que la enzima degrade su sustrato natural (globotriaosilceramida/Gb3). Solo funciona en mutaciones 'susceptibles' (~60% de las mutaciones).",
    indicaciones: ["Enfermedad de Fabry en adultos con mutación susceptible confirmada"],
    contraindicaciones: ["Hipersensibilidad", "Mutaciones de α-Gal A no susceptibles a migalastat"],
    efectosAdversos: ["Cefalea", "Nasofaringitis", "ITU", "Fiebre", "Náuseas", "Dolor abdominal"],
    interacciones: ["No interacciones CYP significativas", "No tomar con alimentos (reducen absorción 40%)"],
    viaAdministracion: ["oral"],
    dosis: { adulto: "123 mg (1 cápsula) en días alternos, en ayunas (2h antes o después de comida)" },
    presentaciones: ["Cápsulas 123 mg"],
    embarazo: "C", lactancia: "No recomendado",
    cuidadosEnfermeria: ["CONFIRMAR mutación susceptible antes de iniciar (test genético + consulta en galafoldamenabilitytable.com)", "Tomar en AYUNAS: 2h sin comida antes y después", "Días ALTERNOS (no diario) — establecer calendario", "Monitorizar función renal (TFGe) y cardíaca (eco, ECG) cada 6-12 meses", "Control de Gb3 en plasma y orina como biomarcador", "Educar: si olvida dosis, no compensar — seguir calendario normal"],
    farmacocinetica: { absorcion: "Oral en ayunas: rápida. Tmáx 3h. Alimentos reducen 40%", metabolismo: "No metabolizado significativamente", excrecion: "Renal (>50% inalterado)", vidaMedia: "3-5 horas (pero efecto chaperona persiste)" },
    almacenamiento: "Temperatura ambiente. No refrigerar",
    unidadId: "u06", capituloId: "c06_04"
  }
];

// Add drugs
const existingIds = new Set(drugs.map(d => d.id));
let added = 0;
newDrugs.forEach(d => {
  if (existingIds.has(d.id)) {
    console.log(`SKIP: ${d.nombre} (${d.id}) ya existe`);
    return;
  }
  drugs.push(d);
  existingIds.add(d.id);
  added++;
  console.log(`ADD: ${d.nombre} → ${d.capituloId}`);
});

// Update categories
newDrugs.forEach(d => {
  for (const u of cats.unidades) {
    for (const c of u.capitulos) {
      if (c.id === d.capituloId && !c.drugIds.includes(d.id)) {
        c.drugIds.push(d.id);
      }
    }
  }
});

fs.writeFileSync(drugsPath, JSON.stringify(drugs, null, 2), 'utf8');
fs.writeFileSync(catsPath, JSON.stringify(cats, null, 2), 'utf8');

console.log(`\nDone: ${added} added. Total: ${drugs.length}`);