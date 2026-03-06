const fs = require('fs');
const path = require('path');

const drugsPath = path.join(__dirname, '..', 'src', 'data', 'drugs.json');
const catsPath = path.join(__dirname, '..', 'src', 'data', 'categories.json');

const drugs = JSON.parse(fs.readFileSync(drugsPath, 'utf8'));
const cats = JSON.parse(fs.readFileSync(catsPath, 'utf8'));

const newDrugs = [
  // ── TOCOLÍTICOS / OBSTETRICIA ──
  {
    id: "isoxuprina", nombre: "Isoxuprina", nombreGenerico: "Isoxuprina clorhidrato",
    nombresComerciales: ["Duvadilan", "Vasodilan"],
    familia: "Vasodilatadores periféricos", clasificacion: "Agonista β-adrenérgico / tocolítico (en desuso)",
    mecanismoAccion: "Estimula receptores β2-adrenérgicos del músculo liso uterino y vascular, produciendo relajación uterina y vasodilatación periférica. También tiene débil actividad β1. Nota: Isoxuprina ha sido reemplazada por nifedipino y atosibán como tocolíticos por su perfil de efectos adversos cardiovasculares (taquicardia, hipotensión) y menor evidencia de eficacia.",
    indicaciones: ["Amenaza de parto prematuro (uso histórico, actualmente no recomendado como primera línea)", "Insuficiencia vascular periférica (enfermedad de Raynaud)", "Insuficiencia cerebrovascular (uso obsoleto)"],
    contraindicaciones: ["Hemorragia posparto", "Hipotensión arterial", "Cardiopatía isquémica", "Desprendimiento prematuro de placenta"],
    efectosAdversos: ["Taquicardia materna", "Hipotensión", "Náuseas y vómitos", "Temblor", "Palpitaciones", "Edema pulmonar (raro pero grave)"],
    interacciones: ["Potencia hipotensión con antihipertensivos", "Riesgo arritmias con halotano", "Efecto aditivo con otros β-agonistas"],
    viaAdministracion: ["oral", "IM", "IV"],
    dosis: { adulto: "Oral: 10-20 mg cada 6-8h. IM: 5-10 mg cada 8-12h. IV: 0.2-0.5 mg/min en infusión", pediatrico: "No indicado en pediatría" },
    presentaciones: ["Tabletas 10 mg y 20 mg", "Ampolla 10 mg/2 mL"],
    embarazo: "C", lactancia: "Se excreta en leche materna. Evaluar riesgo/beneficio",
    cuidadosEnfermeria: ["Monitorizar FC materna (suspender si >120 lpm)", "Control de TA cada 15 min durante infusión IV", "Vigilar signos de edema pulmonar (disnea, estertores)", "Mantener paciente en decúbito lateral izquierdo", "Hidratación controlada (no exceder 2.5 L/24h)"],
    farmacocinetica: { absorcion: "Oral bien absorbida, biodisponibilidad variable", metabolismo: "Hepático por conjugación", excrecion: "Renal", vidaMedia: "1.5-3 horas", inicioAccion: "IV: inmediato. Oral: 30-60 min" },
    almacenamiento: "Temperatura ambiente, proteger de la luz",
    unidadId: "u07", capituloId: "c07_01"
  },
  {
    id: "atosiban", nombre: "Atosibán", nombreGenerico: "Atosibán acetato",
    nombresComerciales: ["Tractocile", "Atosiban Accord"],
    familia: "Antagonistas de oxitocina", clasificacion: "Tocolítico — antagonista competitivo de oxitocina",
    mecanismoAccion: "Antagonista competitivo de los receptores de oxitocina y vasopresina V1a en el miometrio. Reduce la frecuencia e intensidad de las contracciones uterinas sin efectos cardiovasculares significativos. Nota: Atosibán ha reemplazado a isoxuprina y ritodrina como tocolítico por su excelente perfil de seguridad materno-fetal y ausencia de efectos cardiovasculares.",
    indicaciones: ["Amenaza de parto prematuro entre semanas 24-33 de gestación", "Tocólisis aguda para ganar tiempo (48h) para maduración pulmonar fetal con corticoides"],
    contraindicaciones: ["Edad gestacional <24 o >33 semanas", "Rotura prematura de membranas", "Hemorragia anteparto que requiera parto inmediato", "Eclampsia o preeclampsia severa", "Muerte fetal intrauterina", "Infección intrauterina"],
    efectosAdversos: ["Náuseas (más frecuente)", "Cefalea", "Mareo", "Taquicardia leve", "Hiperglucemia (rara)", "Reacciones en sitio de inyección"],
    interacciones: ["No combinar con otros tocolíticos", "Precaución con sulfato de magnesio (efecto aditivo)", "No interacciones significativas con corticoides (betametasona)"],
    viaAdministracion: ["IV"],
    dosis: { adulto: "Bolo: 6.75 mg IV en 1 min. Luego infusión: 18 mg/h × 3h, seguido de 6 mg/h × hasta 45h. Dosis total máx: 330 mg" },
    presentaciones: ["Vial 6.75 mg/0.9 mL (bolo)", "Vial 37.5 mg/5 mL (infusión)"],
    embarazo: "N/A", lactancia: "No se recomienda lactancia durante tratamiento",
    cuidadosEnfermeria: ["Verificar edad gestacional (24-33 semanas)", "Administrar bolo lento en 1 minuto exacto", "No mezclar con otros fármacos en la misma vía", "Monitorizar contracciones uterinas y FCF continuamente", "Registrar balance hídrico estricto", "Coordinar con administración de betametasona para maduración pulmonar"],
    farmacocinetica: { absorcion: "IV: biodisponibilidad 100%", distribucion: "Vd: 18.3 L. Unión a proteínas: 46-48%", metabolismo: "Hidrolisis enzimática en plasma", excrecion: "Renal (principal)", vidaMedia: "1.7 horas", inicioAccion: "Rápido: reducción contracciones en 10 min", duracionAccion: "Efecto persiste durante infusión" },
    almacenamiento: "Refrigerar 2-8°C. No congelar. Proteger de la luz",
    unidadId: "u07", capituloId: "c07_01",
    preparacionParenteral: {
      reconstitucion: "Listo para usar (no requiere reconstitución)",
      dilucion: "Diluir en SSF o SG5% o Ringer Lactato para infusión",
      velocidadAdministracion: "Bolo: 6.75 mg en 1 min. Infusión alta: 24 mL/h (18 mg/h) × 3h. Infusión baja: 8 mL/h (6 mg/h) × hasta 45h",
      estabilidad: "24h a temperatura ambiente una vez diluido",
      solucionesCompatibles: { ssf: true, sg5: true, otras: "Ringer Lactato compatible" }
    }
  },
  // ── CARDIOVASCULAR ──
  {
    id: "levosimendan", nombre: "Levosimendán", nombreGenerico: "Levosimendán",
    nombresComerciales: ["Simdax"],
    familia: "Sensibilizadores al calcio", clasificacion: "Inotrópico — sensibilizador al calcio / vasodilatador",
    mecanismoAccion: "Sensibiliza la troponina C al calcio intracelular, aumentando la contractilidad miocárdica sin incrementar el consumo de oxígeno. Adicionalmente, abre canales de potasio ATP-dependientes en músculo liso vascular (vasodilatación) y mitocondrias cardíacas (cardioprotección). Su metabolito activo OR-1896 tiene vida media de 75-80h, prolongando el efecto inotrópico días después de finalizar la infusión.",
    indicaciones: ["Insuficiencia cardíaca aguda descompensada", "Shock cardiogénico (cuando dobutamina es insuficiente)", "Bajo gasto cardíaco postcirugía cardíaca", "IC aguda en contexto de IAM"],
    contraindicaciones: ["Hipotensión severa (TAS <85 mmHg)", "Taquicardia severa (>120 lpm)", "Obstrucción mecánica del llenado/vaciado ventricular", "Insuficiencia renal severa (ClCr <30 mL/min)", "Insuficiencia hepática severa"],
    efectosAdversos: ["Hipotensión", "Cefalea", "Taquicardia", "Fibrilación auricular", "Hipopotasemia", "Náuseas", "Mareo", "Extrasístoles ventriculares"],
    interacciones: ["Potencia hipotensión con vasodilatadores", "Precaución con otros inotrópicos (efecto aditivo)", "Monitorizar potasio con diuréticos"],
    viaAdministracion: ["IV"],
    dosis: { adulto: "Bolo opcional: 6-12 μg/kg en 10 min. Infusión: 0.05-0.2 μg/kg/min × 24h. No repetir antes de 5 días" },
    presentaciones: ["Vial concentrado 2.5 mg/mL × 5 mL (12.5 mg)", "Vial 2.5 mg/mL × 10 mL (25 mg)"],
    embarazo: "C", lactancia: "Contraindicado",
    cuidadosEnfermeria: ["Monitorización hemodinámica continua (TA, FC, PVC, gasto cardíaco)", "NO administrar sin monitorización invasiva", "Bolo opcional: omitir si TAS <100 mmHg", "Infusión por vía central preferible (irritante venoso)", "Vigilar potasio sérico (riesgo hipopotasemia)", "El efecto persiste 7-9 días post-infusión por metabolito activo", "Control estricto de diuresis (objetivo >0.5 mL/kg/h)"],
    farmacocinetica: { distribucion: "Vd: 0.2 L/kg. Unión proteínas: 97-98%", metabolismo: "Hepático. Metabolito activo OR-1896 (activo)", excrecion: "Renal 54%, fecal 44%", vidaMedia: "1 hora (levosimendán). 75-80 horas (OR-1896)", inicioAccion: "5-15 min", duracionAccion: "Efecto hemodinámico persiste 7-9 días" },
    almacenamiento: "Refrigerar 2-8°C. Proteger de la luz. Diluido: usar en 24h",
    unidadId: "u02", capituloId: "c02_07",
    preparacionParenteral: {
      dilucion: "Diluir en SG5%: 12.5 mg en 250 mL = 0.05 mg/mL",
      velocidadAdministracion: "Bolo: 6-12 μg/kg en 10 min. Infusión: 0.05-0.2 μg/kg/min × 24h",
      estabilidad: "24h a temperatura ambiente diluido. Proteger de la luz",
      solucionesCompatibles: { ssf: false, sg5: true, otras: "SOLO SG5%. Incompatible con SSF" },
      observaciones: "Color amarillo intenso es normal. No mezclar con otros fármacos."
    }
  },
  {
    id: "macitentán", nombre: "Macitentán", nombreGenerico: "Macitentán",
    nombresComerciales: ["Opsumit"],
    familia: "Antagonistas de endotelina", clasificacion: "Antagonista dual de receptores ETA/ETB de endotelina",
    mecanismoAccion: "Antagonista dual de receptores de endotelina (ETA y ETB) con alta afinidad tisular y disociación lenta. Bloquea los efectos vasoconstrictores y proliferativos de la endotelina-1 en la vasculatura pulmonar. Su metabolito activo ACT-132577 contribuye significativamente al efecto.",
    indicaciones: ["Hipertensión arterial pulmonar (grupo 1 OMS) clase funcional II-III", "En combinación con inhibidores de PDE5 o análogos de prostaciclina"],
    contraindicaciones: ["Embarazo (teratogénico)", "Lactancia", "Insuficiencia hepática severa (Child-Pugh C)", "ALT/AST >3× LSN basal", "Uso concomitante de ciclosporina"],
    efectosAdversos: ["Anemia (disminución Hb)", "Cefalea", "Nasofaringitis", "Bronquitis", "Edema/retención hídrica", "Elevación transaminasas", "Infección urinaria"],
    interacciones: ["Contraindicado con ciclosporina (aumenta niveles)", "Inductores potentes CYP3A4 (rifampicina) reducen eficacia", "Monitorizar con anticoagulantes orales"],
    viaAdministracion: ["oral"],
    dosis: { adulto: "10 mg una vez al día, con o sin alimentos" },
    presentaciones: ["Comprimidos recubiertos 10 mg"],
    embarazo: "X", lactancia: "Contraindicado",
    cuidadosEnfermeria: ["Prueba de embarazo mensual OBLIGATORIA en mujeres fértiles", "Anticoncepción doble durante tratamiento y 1 mes después", "Control hemograma mensual los primeros 4 meses (anemia)", "Monitorizar pruebas hepáticas mensuales", "Educar sobre signos de hepatotoxicidad (ictericia, coluria)"],
    farmacocinetica: { absorcion: "Oral: lenta, Tmáx 8h", distribucion: "Unión proteínas >99%", metabolismo: "Hepático CYP3A4/2C19. Metabolito activo ACT-132577", excrecion: "Fecal (principal)", vidaMedia: "16 horas (macitentán), 48 horas (metabolito activo)" },
    almacenamiento: "Temperatura ambiente. No requiere refrigeración",
    unidadId: "u02", capituloId: "c02_08"
  },
  {
    id: "mavacamten", nombre: "Mavacamten", nombreGenerico: "Mavacamten",
    nombresComerciales: ["Camzyos"],
    familia: "Inhibidores de miosina cardíaca", clasificacion: "Inhibidor selectivo alostérico de la miosina cardíaca",
    mecanismoAccion: "Inhibidor selectivo y reversible de la ATPasa de miosina cardíaca. Reduce el número de puentes cruzados actina-miosina, disminuyendo la hipercontractilidad y la obstrucción dinámica del tracto de salida del ventrículo izquierdo (TSVI) en la miocardiopatía hipertrófica obstructiva.",
    indicaciones: ["Miocardiopatía hipertrófica obstructiva (MHO) sintomática clase funcional NYHA II-III"],
    contraindicaciones: ["FEVI <55%", "Uso concomitante de inhibidores potentes CYP2D6 + CYP3A4", "Embarazo", "IC descompensada"],
    efectosAdversos: ["Mareo", "Síncope", "Disfunción sistólica (disminución FEVI)", "Fibrilación auricular", "Fatiga"],
    interacciones: ["Inhibidores CYP2D6 y CYP3A4 aumentan niveles significativamente", "Verapamilo y diltiazem: precaución (depresión miocárdica aditiva)", "Disopiramida: no combinar"],
    viaAdministracion: ["oral"],
    dosis: { adulto: "Inicio: 5 mg/día. Ajuste según gradiente TSVI y FEVI cada 4-12 semanas. Rango: 2.5-15 mg/día" },
    presentaciones: ["Cápsulas 2.5 mg, 5 mg, 10 mg, 15 mg"],
    embarazo: "X", lactancia: "Contraindicado",
    cuidadosEnfermeria: ["Ecocardiograma OBLIGATORIO antes de inicio y cada ajuste de dosis", "Monitorizar FEVI (suspender si <50%)", "Evaluar fenotipo CYP2D6 antes de iniciar", "Educación: no suspender abruptamente (riesgo rebote obstructivo)", "Vigilar signos de IC (disnea, edemas, ganancia ponderal)"],
    farmacocinetica: { absorcion: "Oral: buena, Tmáx 1h", metabolismo: "CYP2D6 (principal) y CYP3A4", excrecion: "Renal y fecal", vidaMedia: "6-9 días (metabolizadores rápidos), más larga en lentos" },
    almacenamiento: "Temperatura ambiente",
    unidadId: "u02", capituloId: "c02_11"
  },
  // ── ANTIEMÉTICOS ──
  {
    id: "palonosetron", nombre: "Palonosetrón", nombreGenerico: "Palonosetrón clorhidrato",
    nombresComerciales: ["Aloxi", "Onicit"],
    familia: "Antagonistas 5-HT3", clasificacion: "Antiemético — antagonista selectivo 5-HT3 de segunda generación",
    mecanismoAccion: "Antagonista altamente selectivo del receptor 5-HT3 con unión alostérica cooperativa que le confiere afinidad 100× mayor y vida media 5× más larga que ondansetrón. Inhibe la emesis aguda y tardía inducida por quimioterapia. Nota: Palonosetrón ha reemplazado a ondansetrón en quimioterapia altamente emetógena por su mayor duración de acción (cubre fase tardía sin redosificar).",
    indicaciones: ["Prevención de náuseas y vómitos inducidos por quimioterapia (agudos y tardíos)", "Prevención de náuseas y vómitos postoperatorios (NVPO)"],
    contraindicaciones: ["Hipersensibilidad a palonosetrón u otros setrones", "Precaución en prolongación QT"],
    efectosAdversos: ["Cefalea", "Estreñimiento", "Mareo", "Fatiga", "Prolongación QT (raro)", "Dolor abdominal"],
    interacciones: ["Precaución con fármacos que prolongan QT", "No interacciones significativas con quimioterápicos", "Aprepitant puede potenciar efecto"],
    viaAdministracion: ["IV", "oral"],
    dosis: { adulto: "IV: 0.25 mg dosis única 30 min pre-quimio. Oral: 0.5 mg 1h pre-quimio. NVPO: 0.075 mg IV pre-inducción" },
    presentaciones: ["Vial 0.25 mg/5 mL", "Cápsulas blandas 0.5 mg"],
    embarazo: "B", lactancia: "Precaución. Se desconoce excreción en leche",
    cuidadosEnfermeria: ["Administrar 30 min antes de quimioterapia", "Dosis ÚNICA (no repetir en 7 días por vida media larga)", "Bolo IV lento en 30 segundos", "No requiere dilución para IV", "ECG si factores de riesgo para QT largo", "Educar: cubre emesis aguda Y tardía con una sola dosis"],
    farmacocinetica: { distribucion: "Vd: 8.3 L/kg. Unión proteínas: 62%", metabolismo: "Hepático CYP2D6 (50%), CYP3A4, CYP1A2", excrecion: "Renal 80% (40% inalterado)", vidaMedia: "40 horas", inicioAccion: "30 min", duracionAccion: "Hasta 120 horas (5 días)" },
    almacenamiento: "Temperatura ambiente. No congelar. Proteger de la luz",
    unidadId: "u05", capituloId: "c05_02",
    preparacionParenteral: {
      reconstitucion: "Listo para uso IV directo (no requiere dilución)",
      velocidadAdministracion: "Bolo IV en 30 segundos",
      estabilidad: "Estable 48h a temperatura ambiente una vez abierto",
      solucionesCompatibles: { ssf: true, sg5: true }
    }
  },
  // ── NEUROLOGÍA ──
  {
    id: "ubrogepant", nombre: "Ubrogepant", nombreGenerico: "Ubrogepant",
    nombresComerciales: ["Ubrelvy"],
    familia: "Gepantes (antagonistas CGRP)", clasificacion: "Antagonista oral del receptor CGRP — tratamiento agudo de migraña",
    mecanismoAccion: "Antagonista competitivo del receptor del péptido relacionado con el gen de la calcitonina (CGRP). Bloquea la vasodilatación meníngea y la transmisión nociceptiva trigeminovascular mediadas por CGRP, abortando la crisis de migraña sin vasoconstricción (a diferencia de los triptanes).",
    indicaciones: ["Tratamiento agudo de migraña con o sin aura en adultos", "Alternativa en pacientes con contraindicación a triptanes (enfermedad cardiovascular)"],
    contraindicaciones: ["Uso concomitante con inhibidores potentes CYP3A4 (ketoconazol, claritromicina)", "Insuficiencia hepática severa (Child-Pugh C)", "Insuficiencia renal severa (ClCr <15 mL/min)"],
    efectosAdversos: ["Náuseas", "Somnolencia", "Sequedad bucal", "Fatiga"],
    interacciones: ["Inhibidores potentes CYP3A4: contraindicado", "Inhibidores moderados CYP3A4: reducir dosis a 50 mg", "Inductores CYP3A4: pueden reducir eficacia"],
    viaAdministracion: ["oral"],
    dosis: { adulto: "50-100 mg al inicio de la migraña. Puede repetir 1 dosis ≥2h después. Máx: 200 mg/24h" },
    presentaciones: ["Comprimidos 50 mg y 100 mg"],
    embarazo: "C", lactancia: "Precaución. Se desconoce excreción",
    cuidadosEnfermeria: ["Educar: tomar al inicio del dolor (no como preventivo)", "Puede tomarse con o sin alimentos", "No exceder 8 dosis/mes (cefalea por uso excesivo)", "Alternativa segura en pacientes cardiovasculares donde triptanes están contraindicados", "Evaluar frecuencia de uso: si >4 crisis/mes, considerar profilaxis"],
    farmacocinetica: { absorcion: "Oral: Tmáx 1.5h", metabolismo: "Hepático CYP3A4 (principal)", excrecion: "Fecal 42%, renal 6%", vidaMedia: "5-7 horas" },
    almacenamiento: "Temperatura ambiente",
    unidadId: "u01", capituloId: "c01_09"
  },
  {
    id: "brexanolona", nombre: "Brexanolona", nombreGenerico: "Brexanolona",
    nombresComerciales: ["Zulresso"],
    familia: "Neuroesteroides", clasificacion: "Modulador alostérico positivo del receptor GABA-A",
    mecanismoAccion: "Análogo sintético de la alopregnanolona (neuroesteroide endógeno). Modula positivamente los receptores GABA-A sinápticos y extrasinápticos, restaurando la función GABAérgica que se encuentra alterada en la depresión postparto por la caída brusca de progesterona/alopregnanolona tras el parto.",
    indicaciones: ["Depresión postparto moderada a severa en adultas"],
    contraindicaciones: ["Insuficiencia renal terminal (acumulación del solubilizante SBECD)", "No administrar fuera de programa REMS certificado"],
    efectosAdversos: ["Sedación excesiva", "Pérdida de consciencia (requiere monitorización)", "Mareo", "Cefalea", "Rubor", "Xerostomía", "Reacciones en sitio de infusión"],
    interacciones: ["Potencia sedación con benzodiacepinas, opioides, alcohol", "No interacciones farmacocinéticas significativas"],
    viaAdministracion: ["IV"],
    dosis: { adulto: "Infusión IV continua × 60 horas: 0-4h: 30 μg/kg/h → 4-24h: 60 μg/kg/h → 24-52h: 90 μg/kg/h → 52-56h: 60 μg/kg/h → 56-60h: 30 μg/kg/h" },
    presentaciones: ["Vial 100 mg/20 mL (5 mg/mL)"],
    embarazo: "N/A", lactancia: "Alopregnanolona es componente natural de leche materna. Se puede amamantar con monitorización del lactante",
    cuidadosEnfermeria: ["Administrar SOLO en centro sanitario certificado REMS", "Monitorización continua con pulsioximetría durante toda la infusión", "Acompañamiento permanente del bebé por otro adulto (no la paciente sola)", "Evaluar sedación cada 2h con escala validada", "Suspender infusión si sedación excesiva o SpO2 <95%", "Disponer de flumazenilo por si pérdida de consciencia", "Evaluar EPDS (Edinburgh) pre y post tratamiento"],
    farmacocinetica: { distribucion: "Vd: 3 L/kg. Unión proteínas: >99%", metabolismo: "Hepático por glucuronidación, sulfatación y cetorreducción", excrecion: "Renal 47%, fecal 42%", vidaMedia: "9 horas", inicioAccion: "24-48 horas de inicio de infusión", duracionAccion: "Efecto sostenido 30+ días post-infusión" },
    almacenamiento: "Refrigerar 2-8°C. Proteger de la luz. Diluido: usar en 12h",
    unidadId: "u01", capituloId: "c01_07",
    preparacionParenteral: {
      dilucion: "Diluir en SSF hasta concentración final de 1 mg/mL. Usar bolsa no PVC",
      velocidadAdministracion: "Infusión continua 60h con escalado y desescalado progresivo",
      estabilidad: "12h a temperatura ambiente una vez diluido",
      solucionesCompatibles: { ssf: true, sg5: false },
      observaciones: "Usar bolsas y líneas NO-PVC. El solubilizante SBECD interactúa con PVC."
    }
  },
  // ── OFTALMOLOGÍA ──
  {
    id: "ranibizumab", nombre: "Ranibizumab", nombreGenerico: "Ranibizumab",
    nombresComerciales: ["Lucentis", "Byooviz"],
    familia: "Anti-VEGF", clasificacion: "Fragmento de anticuerpo monoclonal anti-VEGF-A",
    mecanismoAccion: "Fragmento Fab humanizado que se une a todas las isoformas de VEGF-A, inhibiendo la unión a sus receptores VEGFR-1 y VEGFR-2. Reduce la neovascularización patológica y la permeabilidad vascular en la retina.",
    indicaciones: ["Degeneración macular asociada a edad (DMAE) neovascular", "Edema macular diabético (EMD)", "Oclusión venosa retiniana (OVR)", "Neovascularización coroidea miópica", "Retinopatía del prematuro (zona I, estadio 1+ a 3+)"],
    contraindicaciones: ["Infección ocular o periocular activa", "Inflamación intraocular severa", "Hipersensibilidad al ranibizumab"],
    efectosAdversos: ["Hemorragia conjuntival", "Dolor ocular", "Miodesopsias (moscas volantes)", "Aumento PIO transitorio", "Endoftalmitis (rara pero grave)", "Desprendimiento de retina (raro)", "Eventos tromboembólicos arteriales (raro)"],
    interacciones: ["No administrar con otros anti-VEGF intravítreos simultáneamente", "Precaución en pacientes anticoagulados (riesgo hemorragia)"],
    viaAdministracion: ["oftalmica"],
    dosis: { adulto: "0.5 mg (0.05 mL) inyección intravítrea mensual. DMAE: 3 dosis mensuales de carga, luego PRN o treat-and-extend" },
    presentaciones: ["Vial 10 mg/mL × 0.23 mL", "Jeringa precargada 0.5 mg/0.05 mL"],
    embarazo: "C", lactancia: "Precaución. Absorción sistémica mínima",
    cuidadosEnfermeria: ["Inyección intravítrea: procedimiento ESTÉRIL en quirófano/sala limpia", "Profilaxis antibiótica tópica pre y post inyección según protocolo", "Medir PIO antes y 30 min post-inyección", "Educar signos de alarma: dolor intenso, pérdida visual, ojo rojo → acudir urgencias", "Monitorizar agudeza visual en cada visita", "Conservar cadena de frío hasta momento de uso"],
    farmacocinetica: { absorcion: "Intravítrea: concentración máxima en humor vítreo inmediata", metabolismo: "Catabolismo proteolítico", vidaMedia: "Vítreo: 9 días. Sérica: 2 horas", inicioAccion: "Reducción del edema en 7 días" },
    almacenamiento: "Refrigerar 2-8°C. No congelar. Proteger de la luz",
    unidadId: "u12", capituloId: "c12_02"
  },
  {
    id: "aflibercept", nombre: "Aflibercept", nombreGenerico: "Aflibercept",
    nombresComerciales: ["Eylea", "Zaltrap (oncológico)"],
    familia: "Anti-VEGF", clasificacion: "Proteína de fusión recombinante anti-VEGF",
    mecanismoAccion: "Proteína de fusión que actúa como receptor señuelo (trampa de VEGF). Se une a VEGF-A, VEGF-B y PlGF con mayor afinidad que los receptores nativos, impidiendo la activación de la señalización angiogénica y vascular. Mayor afinidad por VEGF-A que ranibizumab.",
    indicaciones: ["DMAE neovascular", "Edema macular diabético", "Retinopatía diabética con EMD", "Edema macular por OVR", "Cáncer colorrectal metastásico (formulación IV)"],
    contraindicaciones: ["Infección ocular o periocular activa", "Inflamación intraocular severa", "Hipersensibilidad"],
    efectosAdversos: ["Hemorragia conjuntival", "Dolor ocular", "Catarata", "Desprendimiento vítreo", "Aumento PIO", "Endoftalmitis (rara)", "Eventos tromboembólicos (raro)"],
    interacciones: ["No combinar con otros anti-VEGF intravítreos", "Formulación IV: toxicidad aditiva con quimioterapia"],
    viaAdministracion: ["oftalmica", "IV"],
    dosis: { adulto: "Intravítrea: 2 mg (0.05 mL) cada 4-8 semanas según indicación. DMAE: 3 dosis mensuales carga, luego cada 8 semanas" },
    presentaciones: ["Vial intravítreo 40 mg/mL", "Jeringa precargada 2 mg/0.05 mL", "Vial IV 25 mg/mL (oncológico)"],
    embarazo: "C", lactancia: "Precaución",
    cuidadosEnfermeria: ["Técnica aséptica estricta para inyección intravítrea", "Medir PIO pre y post inyección", "Mantener cadena de frío", "Educar: NO frotar el ojo post-inyección", "Controles de agudeza visual periódicos", "Vigilar signos de endoftalmitis: dolor, visión borrosa, ojo rojo"],
    farmacocinetica: { absorcion: "Intravítrea: biodisponibilidad local completa", metabolismo: "Proteólisis", vidaMedia: "Vítreo: 11.4 días. Plasmática: 5-6 días (libre)", inicioAccion: "Reducción edema en 1-2 semanas" },
    almacenamiento: "Refrigerar 2-8°C. No congelar. Proteger de la luz",
    unidadId: "u12", capituloId: "c12_02"
  },
  {
    id: "faricimab", nombre: "Faricimab", nombreGenerico: "Faricimab",
    nombresComerciales: ["Vabysmo"],
    familia: "Anticuerpos biespecíficos", clasificacion: "Anticuerpo biespecífico anti-VEGF-A / anti-Ang-2",
    mecanismoAccion: "Primer anticuerpo biespecífico oftálmico. Se une simultáneamente a VEGF-A (antiangiogénico) y Angiopoyetina-2 (estabilizador vascular), abordando dos vías patológicas complementarias. La inhibición dual permite intervalos de dosificación más largos (hasta 16 semanas).",
    indicaciones: ["DMAE neovascular", "Edema macular diabético"],
    contraindicaciones: ["Infección ocular o periocular activa", "Inflamación intraocular activa", "Hipersensibilidad"],
    efectosAdversos: ["Hemorragia conjuntival", "Dolor ocular", "Catarata", "Miodesopsias", "Aumento PIO transitorio", "Vasculitis retiniana (rara)", "Endoftalmitis (rara)"],
    interacciones: ["No administrar con otros anti-VEGF intravítreos"],
    viaAdministracion: ["oftalmica"],
    dosis: { adulto: "6 mg (0.05 mL) intravítrea. DMAE: 4 dosis cada 4 sem, luego cada 8-16 sem. EMD: 6 dosis cada 4 sem, luego cada 8-16 sem" },
    presentaciones: ["Vial 120 mg/mL (6 mg/0.05 mL)", "Jeringa precargada 6 mg/0.05 mL"],
    embarazo: "C", lactancia: "Precaución",
    cuidadosEnfermeria: ["Técnica aséptica estricta", "Medir PIO pre y post inyección", "Ventaja clave: intervalos hasta 16 semanas (menos visitas)", "Educar paciente sobre menor frecuencia de inyecciones vs otros anti-VEGF", "Vigilar vasculitis retiniana (visión borrosa + dolor → urgencia)"],
    farmacocinetica: { absorcion: "Intravítrea: absorción sistémica mínima", metabolismo: "Catabolismo proteolítico", vidaMedia: "Vítreo: ~7.5 días", inicioAccion: "1-2 semanas" },
    almacenamiento: "Refrigerar 2-8°C. No congelar",
    unidadId: "u12", capituloId: "c12_02"
  },
  // ── NEFROLOGÍA ──
  {
    id: "patiromero", nombre: "Patirómero", nombreGenerico: "Patirómero sorbitex cálcico",
    nombresComerciales: ["Veltassa"],
    familia: "Quelantes de potasio", clasificacion: "Polímero quelante de potasio no absorbible",
    mecanismoAccion: "Polímero catiónico de intercambio no absorbible que se une al potasio en el lumen del colon (donde la concentración de K+ es mayor), intercambiándolo por calcio. Aumenta la excreción fecal de potasio, reduciendo los niveles séricos.",
    indicaciones: ["Hiperpotasemia en adultos", "Mantenimiento de normopotasemia en pacientes con IC o ERC que requieren IECA/ARA-II/ARM"],
    contraindicaciones: ["Hipersensibilidad", "Obstrucción intestinal"],
    efectosAdversos: ["Estreñimiento", "Diarrea", "Dolor abdominal", "Flatulencia", "Hipomagnesemia", "Hipopotasemia (sobredosis)"],
    interacciones: ["Separar 3 horas de otros medicamentos orales (puede reducir absorción)", "Monitorizar magnesio (puede quelar Mg²+)", "Puede reducir absorción de levotiroxina, quinolonas"],
    viaAdministracion: ["oral"],
    dosis: { adulto: "Inicio: 8.4 g/día en 1 toma. Ajustar cada 1-2 semanas. Rango: 8.4-25.2 g/día", pediatrico: "No establecida" },
    presentaciones: ["Sobres de 8.4 g, 16.8 g, 25.2 g de polvo para suspensión oral"],
    embarazo: "C", lactancia: "No absorbido sistémicamente. Probablemente seguro",
    cuidadosEnfermeria: ["Mezclar con agua (no caliente), agitar y beber inmediatamente", "Administrar con alimentos para mejorar tolerancia", "Separar 3 HORAS de otros medicamentos orales", "Control de potasio sérico semanal al inicio, luego mensual", "Vigilar magnesio sérico (suplementar si necesario)", "Educar: no calentar ni mezclar con alimentos calientes"],
    farmacocinetica: { absorcion: "No se absorbe (actúa localmente en colon)", excrecion: "Fecal (100%)", inicioAccion: "4-7 horas (reducción K+ sérico en 24-48h)" },
    almacenamiento: "Refrigerar. Una vez sacado: estable 3 meses a temperatura ambiente",
    unidadId: "u12", capituloId: "c12_07"
  },
  // ── TERAPIAS GENÉTICAS/RARAS ──
  {
    id: "nusinersen", nombre: "Nusinersen", nombreGenerico: "Nusinersen sódico",
    nombresComerciales: ["Spinraza"],
    familia: "Oligonucleótidos antisentido", clasificacion: "Terapia génica — oligonucleótido antisentido modificado",
    mecanismoAccion: "Oligonucleótido antisentido 2'-O-metoxietil que modifica el splicing del pre-ARNm del gen SMN2. Promueve la inclusión del exón 7, aumentando la producción de proteína SMN funcional completa, que es deficiente en la atrofia muscular espinal por mutación del gen SMN1.",
    indicaciones: ["Atrofia muscular espinal (AME) 5q — todos los tipos (I, II, III, presintomático)"],
    contraindicaciones: ["Hipersensibilidad", "Infección activa en sitio de punción lumbar", "Trombocitopenia severa o trastorno de coagulación no controlado"],
    efectosAdversos: ["Cefalea postpunción lumbar", "Dolor de espalda", "Vómitos", "Infección respiratoria", "Trombocitopenia", "Nefrotoxicidad (proteinuria)", "Estreñimiento"],
    interacciones: ["Precaución con anticoagulantes (punción lumbar)", "No interacciones farmacológicas significativas"],
    viaAdministracion: ["intratecal"],
    dosis: { adulto: "12 mg (5 mL) intratecal. Carga: días 0, 14, 28, 63. Mantenimiento: cada 4 meses", pediatrico: "Misma dosis en todos los grupos de edad (12 mg intratecal)" },
    presentaciones: ["Vial 12 mg/5 mL solución intratecal"],
    embarazo: "C", lactancia: "Se desconoce. Evaluar riesgo/beneficio",
    cuidadosEnfermeria: ["Administración INTRATECAL exclusivamente (punción lumbar)", "Técnica estéril absoluta, por especialista entrenado", "Guía por ecografía o fluoroscopia en pacientes con escoliosis severa", "Monitorizar plaquetas y función renal antes de cada dosis", "Observar mínimo 2h post-administración", "Registrar evaluación motora estandarizada (HFMSE, CHOP-INTEND) en cada visita"],
    farmacocinetica: { distribucion: "LCR → tejido SNC. Vida media en LCR: 135-177 días", metabolismo: "Hidrolisis por exonucleasas (lenta)", excrecion: "Renal", vidaMedia: "Plasmática: 63-87 días. LCR: 135-177 días" },
    almacenamiento: "Refrigerar 2-8°C. Proteger de la luz. Sacar 30 min antes de usar (atemperar)",
    unidadId: "u01", capituloId: "c01_12",
    preparacionParenteral: {
      reconstitucion: "Listo para uso. No requiere dilución",
      velocidadAdministracion: "Inyección intratecal lenta en 1-3 minutos",
      estabilidad: "14 días sin refrigerar. Usar inmediatamente una vez abierto",
      observaciones: "SOLO vía intratecal. Permitir que alcance temperatura ambiente antes de administrar."
    }
  },
  // ── ONCO ──
  {
    id: "crizotinib", nombre: "Crizotinib", nombreGenerico: "Crizotinib",
    nombresComerciales: ["Xalkori"],
    familia: "Inhibidores de tirosina quinasa", clasificacion: "Inhibidor de ALK / ROS1 / MET",
    mecanismoAccion: "Inhibidor selectivo de tirosina quinasas ALK (cinasa del linfoma anaplásico), ROS1 y MET/HGFR. Bloquea la proliferación y supervivencia celular tumoral dependiente de estas vías oncogénicas en cáncer de pulmón con reordenamientos genéticos.",
    indicaciones: ["CPNM ALK-positivo avanzado o metastásico", "CPNM ROS1-positivo avanzado"],
    contraindicaciones: ["Hipersensibilidad", "Prolongación QT congénita", "Insuficiencia hepática severa con ALT >5× LSN"],
    efectosAdversos: ["Trastornos visuales (destellos, visión borrosa)", "Náuseas y vómitos", "Diarrea", "Edema", "Bradicardia", "Prolongación QT", "Hepatotoxicidad (elevación transaminasas)", "Neumonitis intersticial (rara, potencialmente fatal)", "Neutropenia"],
    interacciones: ["Inhibidores potentes CYP3A4 aumentan niveles", "Inductores CYP3A4 disminuyen eficacia", "Precaución con fármacos bradicardizantes y que prolongan QT"],
    viaAdministracion: ["oral"],
    dosis: { adulto: "250 mg cada 12h, con o sin alimentos. Continuar hasta progresión o toxicidad inaceptable" },
    presentaciones: ["Cápsulas 200 mg y 250 mg"],
    embarazo: "D", lactancia: "Contraindicado",
    cuidadosEnfermeria: ["Confirmar ALK+ o ROS1+ por test molecular ANTES de iniciar", "ECG basal y periódico (QTc)", "Control hepático cada 2 semanas × 2 meses, luego mensual", "Hemograma con diferencial mensual", "Evaluar síntomas visuales en cada visita", "Educación: tos seca + disnea nueva → consultar inmediatamente (neumonitis)", "No triturar ni abrir cápsulas"],
    farmacocinetica: { absorcion: "Oral: 43% biodisponibilidad. Tmáx 4-6h", metabolismo: "Hepático CYP3A4/5", excrecion: "Fecal 63%, renal 22%", vidaMedia: "42 horas" },
    almacenamiento: "Temperatura ambiente",
    unidadId: "u12", capituloId: "c12_05"
  },
  {
    id: "niraparib", nombre: "Niraparib", nombreGenerico: "Niraparib tosilato",
    nombresComerciales: ["Zejula"],
    familia: "Inhibidores de PARP", clasificacion: "Inhibidor de poli-ADP-ribosa polimerasa (PARP) 1/2",
    mecanismoAccion: "Inhibe PARP-1 y PARP-2, enzimas clave en la reparación del ADN por escisión de bases. En células tumorales con deficiencia en la reparación por recombinación homóloga (ej: mutaciones BRCA), la inhibición de PARP produce letalidad sintética por acumulación de daño al ADN irreparable.",
    indicaciones: ["Mantenimiento en cáncer de ovario platino-sensible (recurrente o primera línea)", "Cáncer de ovario avanzado con mutación BRCA"],
    contraindicaciones: ["Hipersensibilidad", "Síndrome mielodisplásico o leucemia mieloide aguda"],
    efectosAdversos: ["Trombocitopenia (frecuente y a veces severa)", "Anemia", "Neutropenia", "Náuseas", "Fatiga", "Insomnio", "Hipertensión", "Cefalea", "SMD/LMA (raro pero grave)"],
    interacciones: ["No interacciones CYP significativas", "Precaución con otros mielotóxicos"],
    viaAdministracion: ["oral"],
    dosis: { adulto: "200-300 mg/día según peso y plaquetas basales. ≥77 kg Y plaquetas ≥150.000: 300 mg/día. <77 kg O plaquetas <150.000: 200 mg/día" },
    presentaciones: ["Cápsulas 100 mg"],
    embarazo: "X", lactancia: "Contraindicado",
    cuidadosEnfermeria: ["Hemograma SEMANAL el primer mes, luego mensual", "Ajustar dosis según plaquetas (suspender si <10.000)", "Monitorizar TA (hipertensión frecuente)", "Tomar a la misma hora cada día, al acostarse (reduce náuseas)", "Educación: moretones inusuales, sangrado → consultar inmediatamente", "Anticoncepción efectiva durante y 6 meses después"],
    farmacocinetica: { absorcion: "Oral: 73% biodisponibilidad", metabolismo: "Carboxilesterasas (principal), no CYP", excrecion: "Renal 48%, fecal 39%", vidaMedia: "36 horas" },
    almacenamiento: "Temperatura ambiente",
    unidadId: "u12", capituloId: "c12_05"
  },
  {
    id: "pomalidomida", nombre: "Pomalidomida", nombreGenerico: "Pomalidomida",
    nombresComerciales: ["Pomalyst", "Imnovid"],
    familia: "Inmunomoduladores (IMiDs)", clasificacion: "Agente inmunomodulador — análogo de talidomida de 3ra generación",
    mecanismoAccion: "Se une a cereblón (componente de la E3 ubiquitina ligasa), induciendo la degradación de factores de transcripción Ikaros y Aiolos esenciales para la supervivencia del mieloma. Efecto antiproliferativo directo, antiangiogénico e inmunomodulador (estimula células NK y T).",
    indicaciones: ["Mieloma múltiple recidivante/refractario (tras ≥2 líneas previas incluyendo lenalidomida y bortezomib)"],
    contraindicaciones: ["Embarazo (teratogénico severo — programa REMS obligatorio)", "Lactancia", "Neutropenia <1000 o plaquetas <75.000 al inicio"],
    efectosAdversos: ["Neutropenia (severa)", "Anemia", "Trombocitopenia", "Fatiga", "Neuropatía periférica", "Tromboembolismo venoso (TEV)", "Infecciones", "Rash", "Segunda neoplasia primaria (raro)"],
    interacciones: ["CYP1A2 parcialmente involucrado", "Requiere profilaxis antitrombótica concomitante", "No combinar con otros mielotóxicos sin ajuste"],
    viaAdministracion: ["oral"],
    dosis: { adulto: "4 mg/día × 21 días de ciclo de 28, con dexametasona 40 mg semanal. Ajustar según toxicidad hematológica" },
    presentaciones: ["Cápsulas 1 mg, 2 mg, 3 mg, 4 mg"],
    embarazo: "X", lactancia: "Contraindicado",
    cuidadosEnfermeria: ["Programa REMS: prueba embarazo semanal primer mes, luego mensual", "Anticoncepción DOBLE obligatoria (4 sem antes, durante y 4 sem después)", "Hemograma semanal las primeras 8 semanas", "Profilaxis antitrombótica (AAS o HBPM) durante todo el tratamiento", "No abrir ni triturar cápsulas (manipulación con guantes)", "Educar sobre señales TEV: dolor/hinchazón pierna, disnea súbita"],
    farmacocinetica: { absorcion: "Oral: 73%. Tmáx 2-3h", metabolismo: "Hepático CYP1A2, CYP3A4", excrecion: "Renal 73%, fecal 15%", vidaMedia: "7.5 horas" },
    almacenamiento: "Temperatura ambiente. No refrigerar",
    unidadId: "u12", capituloId: "c12_05"
  },
  {
    id: "acalabrutinib", nombre: "Acalabrutinib", nombreGenerico: "Acalabrutinib maleato",
    nombresComerciales: ["Calquence"],
    familia: "Inhibidores de BTK", clasificacion: "Inhibidor selectivo de segunda generación de tirosina quinasa de Bruton (BTK)",
    mecanismoAccion: "Se une covalentemente a Cys481 de BTK, inhibiendo irreversiblemente su actividad quinasa. Bloquea la señalización del receptor de células B (BCR), suprimiendo proliferación y supervivencia de linfocitos B malignos. Mayor selectividad para BTK que ibrutinib, con menor inhibición off-target de EGFR, ITK y TEC.",
    indicaciones: ["Leucemia linfocítica crónica (LLC) / linfoma linfocítico pequeño", "Linfoma de células del manto (LCM) recidivante"],
    contraindicaciones: ["Hipersensibilidad", "Uso con inhibidores potentes CYP3A4 durante >7 días"],
    efectosAdversos: ["Cefalea", "Diarrea", "Artralgias/mialgias", "Infecciones respiratorias", "Neutropenia", "Anemia", "Fibrilación auricular (menor que ibrutinib)", "Hemorragia", "Segunda neoplasia"],
    interacciones: ["Inhibidores CYP3A4 aumentan exposición", "Anticoagulantes/antiplaquetarios: mayor riesgo sangrado", "IBP reducen absorción (evitar; preferir anti-H2 separado 2h)"],
    viaAdministracion: ["oral"],
    dosis: { adulto: "100 mg cada 12h. Tragar entero con agua, con o sin alimentos" },
    presentaciones: ["Cápsulas 100 mg"],
    embarazo: "D", lactancia: "Contraindicado",
    cuidadosEnfermeria: ["Hemograma mensual los primeros 3 meses", "Evitar IBP (reducen absorción). Si necesario: anti-H2 separado 2h", "Suspender 3-7 días antes de cirugía (riesgo sangrado)", "Monitorizar signos fibrilación auricular (palpitaciones, mareo)", "Vigilar infecciones oportunistas", "No abrir, romper ni masticar cápsulas"],
    farmacocinetica: { absorcion: "Oral rápida. Tmáx 0.75h", metabolismo: "CYP3A4 (principal). Metabolito activo ACP-5862", excrecion: "Fecal 12%, renal 84%", vidaMedia: "1 hora (pero inhibición BTK irreversible)" },
    almacenamiento: "Temperatura ambiente",
    unidadId: "u12", capituloId: "c12_05"
  },
  // ── CONTRASTES RADIOLÓGICOS ──
  {
    id: "gadolinio_gadopentetato", nombre: "Gadolinio (Gadopentetato de dimeglumina)", nombreGenerico: "Gadopentetato de dimeglumina",
    nombresComerciales: ["Magnevist", "Gadovist", "Dotarem", "ProHance"],
    familia: "Medios de contraste paramagnéticos", clasificacion: "Contraste para resonancia magnética — quelato de gadolinio",
    mecanismoAccion: "El ion gadolinio (Gd³⁺) quelado tiene propiedades paramagnéticas que acortan los tiempos de relajación T1 y T2 de los protones de agua circundantes, aumentando la intensidad de señal en imágenes T1 de RM. Permite visualizar vascularización, permeabilidad de barrera hematoencefálica y realce de lesiones.",
    indicaciones: ["RM con contraste de SNC (tumores, inflamación, desmielinización)", "Angio-RM (vasos cerebrales, torácicos, abdominales)", "RM cardíaca (viabilidad miocárdica, fibrosis)", "RM hepática y de cuerpo entero"],
    contraindicaciones: ["TFGe <30 mL/min (riesgo fibrosis sistémica nefrogénica)", "Hipersensibilidad a gadolinio", "Embarazo (contraindicación relativa)"],
    efectosAdversos: ["Náuseas", "Cefalea", "Mareo", "Sensación de calor/frío en sitio de inyección", "Reacción alérgica/anafilactoide (rara)", "Fibrosis sistémica nefrogénica (FSN) en IRC severa", "Depósito cerebral de gadolinio (significado clínico incierto)"],
    interacciones: ["No interacciones farmacológicas significativas", "Metformina: no requiere suspensión (a diferencia del yodado)"],
    viaAdministracion: ["IV"],
    dosis: { adulto: "0.1-0.2 mmol/kg (0.2-0.4 mL/kg según formulación). Inyección IV en bolo o infusión rápida" },
    presentaciones: ["Viales y jeringas precargadas de 5, 10, 15, 20 mL según formulación"],
    embarazo: "C", lactancia: "Excreción mínima en leche (<0.04%). Se puede amamantar",
    cuidadosEnfermeria: ["Verificar función renal (creatinina/TFGe) ANTES de administrar", "Contraindicado si TFGe <30 (fibrosis sistémica nefrogénica)", "Tener equipo de reanimación disponible (anafilaxia)", "Preguntar alergias previas a gadolinio", "Canalizar vía IV de calibre adecuado (20G mínimo)", "Observar 30 min post-administración", "Hidratar adecuadamente para facilitar eliminación renal"],
    farmacocinetica: { distribucion: "Extracelular. No cruza BHE intacta", metabolismo: "No metabolizado", excrecion: "Renal 100% (>95% en 24h)", vidaMedia: "1.5-2 horas (función renal normal)", inicioAccion: "Realce visible en segundos" },
    almacenamiento: "Temperatura ambiente. Proteger de la luz. No congelar",
    unidadId: "u12", capituloId: "c12_02",
    preparacionParenteral: {
      reconstitucion: "Listo para uso. No diluir",
      velocidadAdministracion: "Bolo IV: 2-5 mL/segundo según protocolo de RM",
      solucionesCompatibles: { ssf: true, sg5: true },
      observaciones: "Administrar mediante inyector automático de RM para timing preciso"
    }
  },
  {
    id: "iohexol", nombre: "Iohexol", nombreGenerico: "Iohexol",
    nombresComerciales: ["Omnipaque", "Iohexol GE"],
    familia: "Medios de contraste yodados", clasificacion: "Contraste radiológico no iónico de baja osmolalidad",
    mecanismoAccion: "Compuesto yodado no iónico que atenúa los rayos X proporcionalmente a su concentración. Los átomos de yodo absorben fotones de rayos X, generando contraste radiológico en TC, angiografía y otros estudios. La formulación no iónica y de baja osmolalidad reduce significativamente las reacciones adversas.",
    indicaciones: ["TC con contraste (cráneo, tórax, abdomen, pelvis)", "Angiografía (coronaria, cerebral, periférica)", "Urografía excretora", "Mielografía (formulación intratecal)", "Artrografía"],
    contraindicaciones: ["Alergia severa previa a contrastes yodados", "Tirotoxicosis descompensada", "Mielografía: no usar formulaciones no aptas para vía intratecal"],
    efectosAdversos: ["Sensación de calor", "Náuseas", "Sabor metálico", "Nefropatía por contraste (NPC)", "Reacciones alérgicas/anafilactoides", "Extravasación (necrosis tisular)", "Tirotoxicosis inducida por yodo (pacientes susceptibles)"],
    interacciones: ["Metformina: suspender 48h pre y post (riesgo acidosis láctica si NPC)", "Nefrotóxicos (aminoglucósidos, AINE): mayor riesgo NPC", "Betabloqueantes: pueden dificultar tratamiento de anafilaxia"],
    viaAdministracion: ["IV", "intratecal"],
    dosis: { adulto: "TC: 1-2 mL/kg de solución al 300-350 mgI/mL. Angiografía coronaria: 5-8 mL por inyección. Varía según estudio y protocolo" },
    presentaciones: ["Frascos 50-200 mL en concentraciones 240, 300, 350 mgI/mL"],
    embarazo: "B", lactancia: "Excreción mínima. Se puede amamantar",
    cuidadosEnfermeria: ["Verificar función renal (creatinina/TFGe) previa", "Suspender metformina 48h antes y reiniciar solo con Cr normal post-48h", "Hidratación previa: SSF 1 mL/kg/h × 6-12h pre y 6-12h post", "Tener carro de paros accesible (reacciones anafilactoides)", "Preguntar: alergias a yodo/mariscos, asma, alergias previas a contraste", "Premedicación si alergia previa: prednisona 50 mg -13h, -7h, -1h + difenhidramina 50 mg -1h", "Vigilar extravasación: dolor, hinchazón en sitio IV → detener inmediatamente", "Control Cr a las 48-72h post-contraste en pacientes de riesgo"],
    farmacocinetica: { distribucion: "Extracelular. No cruza BHE intacta", metabolismo: "No metabolizado", excrecion: "Renal >90% en 24h (filtración glomerular)", vidaMedia: "2 horas (función renal normal)", inicioAccion: "Opacificación inmediata" },
    almacenamiento: "Temperatura ambiente. Proteger de la luz. No usar si cristalizado",
    unidadId: "u12", capituloId: "c12_02",
    preparacionParenteral: {
      reconstitucion: "Listo para uso. Atemperar antes de inyectar (reduce viscosidad y dolor)",
      velocidadAdministracion: "TC: 2-5 mL/s mediante inyector automático. Manual: según protocolo",
      observaciones: "Atemperar a 37°C en calentador de contraste antes de usar. NUNCA por vía intratecal a menos que sea formulación específica."
    }
  }
];

// Add drugs to main array
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

console.log(`\nDone: ${added} drugs added. Total: ${drugs.length}`);