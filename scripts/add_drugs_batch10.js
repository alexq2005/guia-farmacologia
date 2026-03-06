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

// ============================================================
// 22 NEW drugs (8 already exist: piperacilina_tazobactam,
// cefepime, aztreonam, trazodona, ivabradina, ranolazina,
// levosimendan, apixaban)
// ============================================================

const newDrugs = [

  // ===================== CNS — Opioid Antagonist =====================
  {
    id: "naltrexona",
    nombre: "Naltrexona",
    nombreGenerico: "Clorhidrato de naltrexona",
    nombresComerciales: ["Revia", "Vivitrol", "Antaxone", "Celupan"],
    familia: "Antagonistas opioides",
    clasificacion: "Antagonista competitivo de receptores opioides (mu, kappa, delta)",
    mecanismoAccion: "Antagonista competitivo puro de receptores opioides mu, kappa y delta. Bloquea los efectos euforizantes y de dependencia de los opioides exógenos. Reduce el craving de alcohol al modular el sistema opioide endógeno involucrado en el refuerzo del consumo de alcohol.",
    indicaciones: [
      "Dependencia de opioides (mantenimiento de abstinencia)",
      "Dependencia de alcohol (reducción del consumo)",
      "Prevención de recaídas en alcoholismo",
      "Trastorno por consumo de opioides (tras desintoxicación completa)"
    ],
    contraindicaciones: [
      "Uso actual de opioides o dependencia física activa (precipita síndrome de abstinencia agudo)",
      "Prueba de naloxona positiva (no superada)",
      "Insuficiencia hepática aguda o hepatitis aguda",
      "Hipersensibilidad a naltrexona"
    ],
    efectosAdversos: [
      "Náuseas (más frecuente, 10%)",
      "Cefalea",
      "Mareos",
      "Ansiedad e insomnio",
      "Hepatotoxicidad (dosis altas >300 mg/día)",
      "Dolor abdominal",
      "Artralgia y mialgia",
      "Reacción en sitio de inyección (forma IM depot)"
    ],
    interacciones: [
      "Opioides: bloquea completamente su efecto analgésico y euforizante",
      "Disulfiram: hepatotoxicidad aditiva",
      "Tioridazina: somnolencia aumentada",
      "Antitusígenos opioides (codeína, dextrometorfano): eficacia reducida"
    ],
    viaAdministracion: ["oral", "IM"],
    dosis: {
      adulto: "Oral: 50 mg/día (inicio 25 mg para evaluar tolerancia). IM depot (Vivitrol): 380 mg cada 4 semanas",
      pediatrico: "No establecida en <18 años",
      geriatrico: "Misma dosis, precaución con función hepática",
      ajusteRenal: "Leve-moderado: no requiere. Severo: precaución",
      ajusteHepatico: "Contraindicado en hepatitis aguda. Precaución si ALT/AST >3xULN"
    },
    presentaciones: [
      "Comprimidos 50 mg",
      "Suspensión inyectable IM de liberación prolongada 380 mg (Vivitrol)"
    ],
    embarazo: "C",
    lactancia: "Se excreta en leche. No recomendado.",
    cuidadosEnfermeria: [
      "Confirmar que el paciente lleva al menos 7-10 días sin opioides antes de iniciar (evitar abstinencia precipitada)",
      "Realizar prueba de naloxona antes de la primera dosis si hay duda sobre uso reciente de opioides",
      "Monitorizar función hepática (ALT, AST) basal y periódicamente",
      "Educar al paciente: si necesita analgesia de urgencia, los opioides no funcionarán; usar alternativas no opioides",
      "Administrar IM en glúteo con aguja incluida en kit; alternar glúteos cada mes",
      "Advertir que la pérdida de tolerancia a opioides puede causar sobredosis fatal si recae tras suspender naltrexona"
    ],
    farmacocinetica: {
      absorcion: "Oral: absorción rápida, biodisponibilidad 5-40% (primer paso hepático extenso)",
      distribucion: "Vd: 1350 L. Unión proteica 21%",
      metabolismo: "Hepático, metabolito activo: 6-beta-naltrexol",
      excrecion: "Renal (60%)",
      vidaMedia: "Naltrexona: 4 h. 6-beta-naltrexol: 12 h",
      inicioAccion: "Oral: 15-30 min. IM depot: gradual",
      picoAccion: "Oral: 1 h",
      duracionAccion: "Oral: 24-72 h (según dosis). IM: 30 días"
    },
    almacenamiento: "Temperatura ambiente. Vivitrol: refrigerar (2-8°C), sacar 45 min antes de inyectar.",
    unidadId: "u01",
    capituloId: "c01_02",
    searchText: ""
  },

  // ===================== CNS — Antipsicóticos =====================
  {
    id: "ziprasidona",
    nombre: "Ziprasidona",
    nombreGenerico: "Mesilato/clorhidrato de ziprasidona",
    nombresComerciales: ["Geodon", "Zeldox", "Ziprasidona Teva"],
    familia: "Antipsicóticos atípicos",
    clasificacion: "Antipsicótico de segunda generación (benzisotiazol)",
    mecanismoAccion: "Antagonista de receptores dopaminérgicos D2 y serotoninérgicos 5-HT2A. También antagoniza 5-HT1D, 5-HT2C, e inhibe recaptación de serotonina y noradrenalina. Menor afinidad por receptores histamínicos H1 y muscarínicos (bajo riesgo metabólico).",
    indicaciones: [
      "Esquizofrenia",
      "Trastorno bipolar (episodios maníacos/mixtos agudos)",
      "Agitación aguda en esquizofrenia (forma IM)",
      "Mantenimiento en trastorno bipolar I"
    ],
    contraindicaciones: [
      "Prolongación QTc conocida o QTc >500 ms",
      "Infarto de miocardio reciente",
      "Insuficiencia cardiaca descompensada",
      "Uso concomitante de fármacos que prolongan QT (antiarrítmicos clase IA/III, pimozida, sotalol)",
      "Hipersensibilidad a ziprasidona"
    ],
    efectosAdversos: [
      "Somnolencia",
      "Prolongación del intervalo QTc (vigilar ECG)",
      "Náuseas y dispepsia",
      "Acatisia",
      "Mareos",
      "Síntomas extrapiramidales (menor que típicos)",
      "Erupción cutánea",
      "Hipotensión ortostática (IM)"
    ],
    interacciones: [
      "Fármacos que prolongan QT (amiodarona, sotalol, eritromicina): riesgo aditivo de torsade de pointes",
      "Carbamazepina: reduce niveles de ziprasidona 35%",
      "Ketoconazol: aumenta niveles de ziprasidona",
      "Antihipertensivos: hipotensión aditiva"
    ],
    viaAdministracion: ["oral", "IM"],
    dosis: {
      adulto: "Oral: 20 mg 2 veces/día con alimentos, titular hasta 60-80 mg 2 veces/día. IM agitación: 10-20 mg, puede repetir 10 mg cada 2h o 20 mg cada 4h (máx 40 mg/día IM)",
      pediatrico: "No aprobado en <18 años",
      geriatrico: "Iniciar con dosis bajas. Mayor riesgo de hipotensión ortostática",
      ajusteRenal: "No requiere ajuste. IM: precaución (ciclodextrina excretada renalmente)",
      ajusteHepatico: "No requiere ajuste en leve-moderado. Severo: sin datos"
    },
    presentaciones: [
      "Cápsulas 20, 40, 60, 80 mg",
      "Polvo para inyección IM 20 mg/mL"
    ],
    embarazo: "C",
    lactancia: "Se excreta en leche. No recomendado.",
    cuidadosEnfermeria: [
      "Obtener ECG basal y monitorizar QTc (contraindicado si >500 ms)",
      "Administrar oral SIEMPRE con alimentos (biodisponibilidad duplica con comida)",
      "Monitorizar potasio y magnesio (hipocalemia/hipomagnesemia aumentan riesgo QTc)",
      "Valorar signos de síndrome neuroléptico maligno: fiebre, rigidez, inestabilidad autonómica",
      "Para IM: reconstituir con 1.2 mL de agua estéril, usar dentro de 24h",
      "Menor riesgo metabólico (peso, glucosa, lípidos) que otros atípicos — ventaja en pacientes con síndrome metabólico"
    ],
    farmacocinetica: {
      absorcion: "Oral con alimentos: biodisponibilidad 60% (sin alimentos: 30%)",
      distribucion: "Vd: 1.5 L/kg. Unión proteica >99%",
      metabolismo: "Hepático: aldehído oxidasa (2/3), CYP3A4 (1/3)",
      excrecion: "Fecal 66%, renal 20%",
      vidaMedia: "Oral: 6-7 h. IM: 2-5 h",
      inicioAccion: "IM: 15-30 min",
      picoAccion: "Oral: 6-8 h. IM: 60 min",
      duracionAccion: "12 h"
    },
    almacenamiento: "Temperatura ambiente (15-30°C). IM reconstituido: hasta 24h a TA o 7 días refrigerado.",
    unidadId: "u01",
    capituloId: "c01_06",
    searchText: ""
  },

  {
    id: "cariprazina",
    nombre: "Cariprazina",
    nombreGenerico: "Cariprazina",
    nombresComerciales: ["Reagila", "Vraylar"],
    familia: "Antipsicóticos atípicos",
    clasificacion: "Antipsicótico de tercera generación (agonista parcial D3/D2)",
    mecanismoAccion: "Agonista parcial de receptores dopaminérgicos D3 (alta afinidad) y D2, y agonista parcial de receptores 5-HT1A. Antagonista de 5-HT2A y 5-HT2B. La alta afinidad por D3 le confiere efectos sobre síntomas negativos y cognitivos de la esquizofrenia.",
    indicaciones: [
      "Esquizofrenia",
      "Episodios maníacos o mixtos del trastorno bipolar I",
      "Episodios depresivos del trastorno bipolar I (bipolar depression)",
      "Síntomas negativos predominantes de esquizofrenia"
    ],
    contraindicaciones: [
      "Hipersensibilidad a cariprazina",
      "Uso concomitante de inhibidores potentes de CYP3A4 (ketoconazol, itraconazol, claritromicina)",
      "Uso concomitante de inductores potentes de CYP3A4 (carbamazepina, rifampicina)"
    ],
    efectosAdversos: [
      "Acatisia (más frecuente, 9-15%)",
      "Síntomas extrapiramidales (parkinsonismo)",
      "Insomnio",
      "Náuseas y vómitos",
      "Aumento de peso (moderado)",
      "Somnolencia",
      "Inquietud"
    ],
    interacciones: [
      "Inhibidores potentes CYP3A4 (ketoconazol): contraindicado uso concomitante",
      "Inductores potentes CYP3A4 (rifampicina): contraindicado",
      "Depresores del SNC: sedación aditiva",
      "Antihipertensivos: hipotensión aditiva"
    ],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "Esquizofrenia: 1.5 mg/día, titular a 3-6 mg/día. Bipolar manía: 1.5 mg día 1, titular a 3-6 mg/día. Bipolar depresión: 1.5 mg/día, puede aumentar a 3 mg/día",
      pediatrico: "No establecida en <18 años",
      geriatrico: "No requiere ajuste, pero mayor riesgo de efectos extrapiramidales",
      ajusteRenal: "Leve-moderado: no ajuste. Severo (CrCl <30): no recomendado",
      ajusteHepatico: "Leve-moderado: no ajuste. Severo (Child-Pugh C): no recomendado"
    },
    presentaciones: [
      "Cápsulas 1.5 mg, 3 mg, 4.5 mg, 6 mg"
    ],
    embarazo: "N/A",
    lactancia: "Se desconoce excreción en leche. No recomendado.",
    cuidadosEnfermeria: [
      "Vigilar acatisia (efecto adverso más frecuente): inquietud, necesidad de moverse",
      "Vida media extremadamente larga (2-4 semanas incluyendo metabolitos activos): efectos adversos pueden persistir semanas tras suspensión",
      "Monitorizar glucemia, perfil lipídico y peso periódicamente",
      "No administrar con jugo de pomelo/toronja (inhibidor CYP3A4)",
      "Evaluar signos de discinesia tardía con uso prolongado",
      "Educar que el efecto terapéutico completo puede tardar varias semanas"
    ],
    farmacocinetica: {
      absorcion: "Oral: bien absorbido, biodisponibilidad ~50%",
      distribucion: "Vd: 91 L/kg. Unión proteica 91-97%",
      metabolismo: "Hepático CYP3A4 y CYP2D6. Metabolitos activos: DDCAR (t1/2 2-4 semanas) y DCAR",
      excrecion: "Renal 21%, fecal 64%",
      vidaMedia: "Cariprazina: 2-4 días. DDCAR: 1-3 semanas",
      inicioAccion: "1-2 semanas",
      picoAccion: "3-8 h",
      duracionAccion: "Semanas (por metabolitos activos de larga duración)"
    },
    almacenamiento: "Temperatura ambiente (15-30°C). Proteger de la luz.",
    unidadId: "u01",
    capituloId: "c01_06",
    searchText: ""
  },

  {
    id: "brexpiprazol",
    nombre: "Brexpiprazol",
    nombreGenerico: "Brexpiprazol",
    nombresComerciales: ["Rexulti", "Rxulti"],
    familia: "Antipsicóticos atípicos",
    clasificacion: "Antipsicótico de tercera generación (agonista parcial D2/5-HT1A)",
    mecanismoAccion: "Agonista parcial de receptores D2 y 5-HT1A, y antagonista de receptores 5-HT2A. Similar a aripiprazol pero con menor actividad intrínseca en D2 (menor riesgo de acatisia) y mayor antagonismo 5-HT2A (efecto ansiolítico/antidepresivo). Antagonista de receptores alfa-1B y alfa-2C adrenérgicos.",
    indicaciones: [
      "Esquizofrenia",
      "Trastorno depresivo mayor (adyuvante a antidepresivos)",
      "Agitación asociada a demencia por Alzheimer"
    ],
    contraindicaciones: [
      "Hipersensibilidad a brexpiprazol",
      "Demencia con psicosis (excepto indicación aprobada de agitación en Alzheimer)",
      "Uso concomitante de inhibidores potentes CYP2D6 + CYP3A4 simultáneamente"
    ],
    efectosAdversos: [
      "Aumento de peso (2-3 kg)",
      "Acatisia (menor que aripiprazol)",
      "Somnolencia",
      "Nasofaringitis",
      "Cefalea",
      "Temblor",
      "Elevación de triglicéridos y glucemia"
    ],
    interacciones: [
      "Inhibidores potentes CYP2D6 (paroxetina, fluoxetina): reducir dosis a la mitad",
      "Inhibidores potentes CYP3A4 (ketoconazol): reducir dosis a la mitad",
      "Inductores potentes CYP3A4 (rifampicina): duplicar dosis de brexpiprazol",
      "Depresores del SNC: sedación aditiva"
    ],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "Esquizofrenia: 1 mg/día los primeros 4 días, luego 2-4 mg/día. Depresión (adyuvante): 0.5-1 mg/día días 1-7, luego 1-3 mg/día. Agitación Alzheimer: 0.5 mg/día, titular a 1-2 mg/día",
      pediatrico: "No establecida en <18 años",
      geriatrico: "No requiere ajuste. Precaución en ancianos con demencia",
      ajusteRenal: "CrCl <60: máx 3 mg/día. CrCl <15: máx 2 mg/día",
      ajusteHepatico: "Moderado-severo: máx 2 mg/día (esquizofrenia), 2 mg/día (depresión)"
    },
    presentaciones: [
      "Comprimidos 0.25 mg, 0.5 mg, 1 mg, 2 mg, 3 mg, 4 mg"
    ],
    embarazo: "C",
    lactancia: "Se desconoce. Evaluar riesgo-beneficio.",
    cuidadosEnfermeria: [
      "Titular lentamente según esquema recomendado (evitar efectos adversos)",
      "Monitorizar peso, glucemia y perfil lipídico al inicio y cada 3 meses",
      "Reducir dosis si paciente toma inhibidores potentes de CYP2D6 o CYP3A4",
      "Valorar riesgo de suicidio especialmente en primeras semanas como adyuvante en depresión",
      "Evaluar signos de discinesia tardía con uso prolongado",
      "Puede tomarse con o sin alimentos"
    ],
    farmacocinetica: {
      absorcion: "Oral: bien absorbido, biodisponibilidad 95%",
      distribucion: "Vd: 1.56 L/kg. Unión proteica >99%",
      metabolismo: "Hepático CYP3A4 y CYP2D6. Metabolito activo: DM-3411",
      excrecion: "Fecal 46%, renal 25%",
      vidaMedia: "91 h (brexpiprazol y metabolito activo)",
      inicioAccion: "1-2 semanas para efecto completo",
      picoAccion: "4 h",
      duracionAccion: "24 h (dosificación diaria)"
    },
    almacenamiento: "Temperatura ambiente (15-30°C).",
    unidadId: "u01",
    capituloId: "c01_06",
    searchText: ""
  },

  // ===================== CNS — Antidepresivos =====================
  {
    id: "vortioxetina",
    nombre: "Vortioxetina",
    nombreGenerico: "Hidrobromuro de vortioxetina",
    nombresComerciales: ["Brintellix", "Trintellix"],
    familia: "Antidepresivos multimodales",
    clasificacion: "Modulador multimodal de serotonina (inhibidor de recaptación + agonista/antagonista de receptores 5-HT)",
    mecanismoAccion: "Inhibe el transportador de recaptación de serotonina (SERT). Agonista de 5-HT1A, agonista parcial de 5-HT1B, antagonista de 5-HT1D, 5-HT3 y 5-HT7. Este mecanismo multimodal mejora la neurotransmisión de serotonina, noradrenalina, dopamina, histamina, glutamato y acetilcolina. Efectos procognitivos únicos.",
    indicaciones: [
      "Trastorno depresivo mayor",
      "Disfunción cognitiva asociada a depresión",
      "Trastorno depresivo mayor con ansiedad comórbida"
    ],
    contraindicaciones: [
      "Hipersensibilidad a vortioxetina",
      "Uso concomitante o dentro de 14 días de IMAOs",
      "Inicio de linezolid IV o azul de metileno IV"
    ],
    efectosAdversos: [
      "Náuseas (más frecuente, 21-32%, suele disminuir con el tiempo)",
      "Diarrea",
      "Cefalea",
      "Mareos",
      "Boca seca",
      "Disfunción sexual (menor que ISRS tradicionales)",
      "Prurito"
    ],
    interacciones: [
      "IMAOs: riesgo de síndrome serotoninérgico (contraindicado)",
      "Inhibidores potentes CYP2D6 (bupropión, fluoxetina, paroxetina): reducir dosis a la mitad",
      "Inductores CYP (rifampicina, carbamazepina): considerar aumento de dosis",
      "Anticoagulantes/AINEs: mayor riesgo de sangrado"
    ],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "Inicio: 10 mg/día. Rango: 5-20 mg/día. Si tolera, titular a 20 mg/día para máximo beneficio cognitivo",
      pediatrico: "No aprobado en <18 años",
      geriatrico: "Misma dosis, no requiere ajuste",
      ajusteRenal: "No requiere ajuste",
      ajusteHepatico: "No requiere ajuste en leve-moderado. Severo: no estudiado"
    },
    presentaciones: [
      "Comprimidos recubiertos 5, 10, 15, 20 mg",
      "Gotas orales 20 mg/mL"
    ],
    embarazo: "C",
    lactancia: "Se excreta en leche en animales. Evaluar riesgo-beneficio.",
    cuidadosEnfermeria: [
      "Advertir que las náuseas son frecuentes al inicio pero disminuyen en 1-2 semanas; tomar con alimentos ayuda",
      "No suspender bruscamente: reducir gradualmente la dosis",
      "Vigilar signos de síndrome serotoninérgico: agitación, mioclonía, hipertermia, diaforesis",
      "Evaluar ideación suicida especialmente en primeras semanas y adultos jóvenes",
      "Perfil favorable en disfunción sexual vs otros ISRS — informar al paciente"
    ],
    farmacocinetica: {
      absorcion: "Oral: bien absorbido, biodisponibilidad 75%",
      distribucion: "Vd: 2600 L. Unión proteica 98%",
      metabolismo: "Hepático: CYP2D6 (principal), CYP3A4/5, CYP2C9, CYP2A6, y conjugación",
      excrecion: "Renal 59%, fecal 26%",
      vidaMedia: "66 h",
      inicioAccion: "1-2 semanas (efecto antidepresivo), hasta 8 semanas para efecto completo",
      picoAccion: "7-11 h",
      duracionAccion: "24 h (dosificación diaria)"
    },
    almacenamiento: "Temperatura ambiente (15-30°C).",
    unidadId: "u01",
    capituloId: "c01_07",
    searchText: ""
  },

  {
    id: "vilazodona",
    nombre: "Vilazodona",
    nombreGenerico: "Clorhidrato de vilazodona",
    nombresComerciales: ["Viibryd"],
    familia: "Antidepresivos ISRS / Agonistas parciales 5-HT1A",
    clasificacion: "Inhibidor selectivo de recaptación de serotonina + agonista parcial 5-HT1A (SPARI)",
    mecanismoAccion: "Inhibe el transportador de recaptación de serotonina (SERT) de forma potente y selectiva. Adicionalmente, es agonista parcial del receptor 5-HT1A presináptico (autorreceptor), lo que acelera el inicio de acción antidepresiva al desensibilizar los autorreceptores más rápidamente que un ISRS puro.",
    indicaciones: [
      "Trastorno depresivo mayor",
      "Trastorno de ansiedad generalizada (off-label)",
      "Trastorno obsesivo-compulsivo (off-label)"
    ],
    contraindicaciones: [
      "Hipersensibilidad a vilazodona",
      "Uso concomitante o dentro de 14 días de IMAOs",
      "Uso concomitante con linezolid IV o azul de metileno IV"
    ],
    efectosAdversos: [
      "Diarrea (más frecuente, 28%)",
      "Náuseas (23%)",
      "Cefalea",
      "Mareos",
      "Insomnio",
      "Boca seca",
      "Disfunción sexual (menor que ISRS tradicionales)"
    ],
    interacciones: [
      "IMAOs: síndrome serotoninérgico (contraindicado)",
      "Inhibidores potentes CYP3A4 (ketoconazol): no exceder 20 mg/día",
      "Inductores potentes CYP3A4 (carbamazepina): puede requerir aumento de dosis",
      "Anticoagulantes/AINEs/Aspirina: mayor riesgo de sangrado"
    ],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "Inicio: 10 mg/día por 7 días, luego 20 mg/día por 7 días, luego 40 mg/día. Tomar con alimentos",
      pediatrico: "No aprobado en <18 años",
      geriatrico: "No requiere ajuste de dosis",
      ajusteRenal: "No requiere ajuste",
      ajusteHepatico: "No requiere ajuste"
    },
    presentaciones: [
      "Comprimidos 10 mg, 20 mg, 40 mg"
    ],
    embarazo: "C",
    lactancia: "Se excreta en leche. Evaluar riesgo-beneficio.",
    cuidadosEnfermeria: [
      "DEBE tomarse con alimentos (biodisponibilidad aumenta 72% con comida)",
      "Titular gradualmente para minimizar efectos GI: 10→20→40 mg en intervalos de 7 días",
      "Advertir sobre diarrea frecuente al inicio; suele mejorar en 2 semanas",
      "Vigilar signos de síndrome serotoninérgico si se combina con otros serotoninérgicos",
      "No suspender abruptamente: reducir gradualmente",
      "Evaluar ideación suicida especialmente en adultos jóvenes (<25 años)"
    ],
    farmacocinetica: {
      absorcion: "Oral con alimentos: biodisponibilidad 72%. Sin alimentos: reducida significativamente",
      distribucion: "Unión proteica 96-99%",
      metabolismo: "Hepático: CYP3A4 (principal), CYP2C19 y CYP2D6",
      excrecion: "Fecal 2%, renal 1% (principalmente metabolitos)",
      vidaMedia: "25 h",
      inicioAccion: "1-2 semanas (puede ser más rápido que ISRS puros por mecanismo dual)",
      picoAccion: "4-5 h",
      duracionAccion: "24 h"
    },
    almacenamiento: "Temperatura ambiente (15-30°C).",
    unidadId: "u01",
    capituloId: "c01_07",
    searchText: ""
  },

  // ===================== CNS — Anticonvulsivantes =====================
  {
    id: "primidona",
    nombre: "Primidona",
    nombreGenerico: "Primidona",
    nombresComerciales: ["Mysoline", "Liskantin"],
    familia: "Anticonvulsivantes barbitúricos",
    clasificacion: "Antiepiléptico barbitúrico (profármaco de fenobarbital)",
    mecanismoAccion: "Se metaboliza a fenobarbital y feniletilmalonamida (PEMA). Tanto primidona como sus metabolitos potencian la acción inhibitoria del GABA al prolongar la apertura de canales de cloro asociados al receptor GABA-A. Reduce la excitabilidad neuronal y eleva el umbral convulsivo.",
    indicaciones: [
      "Epilepsia: crisis tónico-clónicas generalizadas",
      "Epilepsia: crisis parciales simples y complejas",
      "Temblor esencial (uso principal actual)",
      "Epilepsia refractaria como adyuvante"
    ],
    contraindicaciones: [
      "Porfiria aguda intermitente",
      "Hipersensibilidad a primidona o fenobarbital",
      "Insuficiencia hepática grave"
    ],
    efectosAdversos: [
      "Somnolencia y sedación (frecuentes al inicio)",
      "Ataxia y vértigo",
      "Náuseas y vómitos (primeras dosis)",
      "Fatiga crónica",
      "Déficit de folato y vitamina D (uso prolongado)",
      "Anemia megaloblástica",
      "Erupción cutánea"
    ],
    interacciones: [
      "Otros antiepilépticos: interacciones farmacocinéticas complejas (ej. fenitoína aumenta conversión a fenobarbital)",
      "Anticoagulantes orales (warfarina): reduce su eficacia por inducción enzimática",
      "Anticonceptivos orales: reduce eficacia (inductor CYP3A4 potente)",
      "Alcohol y depresores SNC: sedación aditiva"
    ],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "Inicio: 100-125 mg al acostarse. Titular: aumentar 50 mg cada 3 días. Mantenimiento: 250 mg 3-4 veces/día. Máx: 2 g/día. Temblor esencial: 25-62.5 mg al inicio, titular a 250 mg/día",
      pediatrico: "<8 años: 10-25 mg/kg/día dividido en 2-3 dosis",
      geriatrico: "Iniciar con dosis bajas (50 mg/noche). Mayor sensibilidad a sedación",
      ajusteRenal: "CrCl <50: reducir dosis 25-50%",
      ajusteHepatico: "Contraindicado en insuficiencia hepática grave. Reducir dosis en leve-moderada"
    },
    presentaciones: [
      "Comprimidos 250 mg"
    ],
    embarazo: "D",
    lactancia: "Se excreta en leche. Puede causar sedación neonatal. No recomendado.",
    cuidadosEnfermeria: [
      "Iniciar con dosis muy bajas y titular lentamente (náuseas y sedación severas al inicio)",
      "Monitorizar niveles séricos de fenobarbital (metabolito activo): rango terapéutico 15-40 mcg/mL",
      "Suplementar ácido fólico (1 mg/día) y vitamina D con uso prolongado",
      "No suspender abruptamente: riesgo de crisis epilépticas de rebote o status epiléptico",
      "Vigilar signos de intoxicación barbitúrica: nistagmo, ataxia, confusión",
      "Educar sobre reducción de eficacia de anticonceptivos orales"
    ],
    farmacocinetica: {
      absorcion: "Oral: rápida y completa (60-80%)",
      distribucion: "Unión proteica mínima (20%)",
      metabolismo: "Hepático: se convierte en fenobarbital (activo) y PEMA (activo menor)",
      excrecion: "Renal 40% inalterada, resto como metabolitos",
      vidaMedia: "Primidona: 5-15 h. Fenobarbital (metabolito): 53-140 h",
      inicioAccion: "3-7 días para efecto anticonvulsivante completo",
      picoAccion: "3 h",
      duracionAccion: "12-24 h (pero fenobarbital acumulado actúa por días)"
    },
    almacenamiento: "Temperatura ambiente. Proteger de la luz y humedad.",
    unidadId: "u01",
    capituloId: "c01_04",
    searchText: ""
  },

  {
    id: "clobazam",
    nombre: "Clobazam",
    nombreGenerico: "Clobazam",
    nombresComerciales: ["Onfi", "Frisium", "Urbanol", "Karidium"],
    familia: "Benzodiazepinas anticonvulsivantes",
    clasificacion: "1,5-benzodiazepina antiepiléptica",
    mecanismoAccion: "Agonista del receptor GABA-A (sitio benzodiazepínico). A diferencia de las 1,4-benzodiazepinas clásicas (diazepam, clonazepam), clobazam es una 1,5-benzodiazepina con menor sedación y menor tolerancia. Potencia la acción inhibitoria del GABA aumentando la frecuencia de apertura del canal de cloro.",
    indicaciones: [
      "Epilepsia: crisis asociadas al síndrome de Lennox-Gastaut (uso principal aprobado)",
      "Epilepsia refractaria como terapia adjunta",
      "Crisis parciales y generalizadas (adyuvante)",
      "Ansiedad severa (algunos países)"
    ],
    contraindicaciones: [
      "Miastenia gravis severa",
      "Insuficiencia respiratoria severa",
      "Síndrome de apnea del sueño no tratado",
      "Insuficiencia hepática grave",
      "Hipersensibilidad a benzodiazepinas"
    ],
    efectosAdversos: [
      "Somnolencia (25-33%)",
      "Infecciones de vías respiratorias superiores",
      "Fiebre",
      "Sialorrea (babeo)",
      "Irritabilidad y agresividad (paradójica, más en niños)",
      "Ataxia",
      "Estreñimiento",
      "Tolerancia con uso prolongado"
    ],
    interacciones: [
      "Inhibidores de CYP2C19 (fluconazol, omeprazol, fluvoxamina): aumentan niveles de N-desmetilclobazam (metabolito activo)",
      "Alcohol y depresores SNC: sedación aditiva potencialmente peligrosa",
      "Opioides: depresión respiratoria aditiva (precaución extrema)",
      "Ácido valproico: puede aumentar niveles de clobazam"
    ],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "Lennox-Gastaut ≥30 kg: inicio 5 mg 2 veces/día, titular semanalmente. Mantenimiento: 20-40 mg/día dividido en 2 dosis",
      pediatrico: "Lennox-Gastaut ≥2 años, ≤30 kg: 5 mg/día, titular a 10-20 mg/día dividido en 2 dosis",
      geriatrico: "Iniciar con 5 mg/día. Titular lentamente",
      ajusteRenal: "No requiere ajuste significativo",
      ajusteHepatico: "Leve-moderado: inicio 5 mg/día, titular lentamente. Severo: contraindicado"
    },
    presentaciones: [
      "Comprimidos 5 mg, 10 mg, 20 mg",
      "Suspensión oral 2.5 mg/mL"
    ],
    embarazo: "D",
    lactancia: "Se excreta en leche. Puede causar sedación neonatal. No recomendado.",
    cuidadosEnfermeria: [
      "Titular gradualmente (incrementos semanales) para minimizar sedación",
      "Monitorizar genotipo CYP2C19 si es posible (metabolizadores lentos tienen niveles 5 veces mayores del metabolito activo)",
      "Vigilar reacciones paradójicas especialmente en niños: agresividad, irritabilidad",
      "NO suspender abruptamente: reducir 5-10 mg/semana (riesgo de crisis de rebote)",
      "Menor desarrollo de tolerancia que otras benzodiazepinas, pero aún posible",
      "Para suspensión oral: usar jeringa dosificadora proporcionada"
    ],
    farmacocinetica: {
      absorcion: "Oral: rápida, biodisponibilidad ~87%",
      distribucion: "Vd: 100 L. Unión proteica 80-90%",
      metabolismo: "Hepático: CYP3A4 y CYP2C19. Metabolito activo: N-desmetilclobazam (vida media larga)",
      excrecion: "Renal 82% (como metabolitos)",
      vidaMedia: "Clobazam: 36-42 h. N-desmetilclobazam: 71-82 h",
      inicioAccion: "30-60 min",
      picoAccion: "0.5-4 h",
      duracionAccion: "12-24 h (dosificación 2 veces/día)"
    },
    almacenamiento: "Temperatura ambiente (20-25°C).",
    unidadId: "u01",
    capituloId: "c01_04",
    searchText: ""
  },

  // ===================== Oncología — Antineoplásicos (c12_05, u12) =====================
  {
    id: "nivolumab",
    nombre: "Nivolumab",
    nombreGenerico: "Nivolumab",
    nombresComerciales: ["Opdivo"],
    familia: "Inmunoterapia oncológica",
    clasificacion: "Anticuerpo monoclonal anti-PD-1 (inhibidor de checkpoint inmunológico)",
    mecanismoAccion: "Anticuerpo monoclonal IgG4 humano que se une al receptor PD-1 (Programmed Death-1) en los linfocitos T. Bloquea la interacción PD-1/PD-L1, restaurando la respuesta inmunitaria antitumoral de los linfocitos T citotóxicos contra las células cancerosas que expresan PD-L1.",
    indicaciones: [
      "Melanoma metastásico o irresecable",
      "Cáncer de pulmón no microcítico (CPNM)",
      "Carcinoma de células renales avanzado",
      "Linfoma de Hodgkin clásico",
      "Carcinoma urotelial",
      "Cáncer gástrico o de unión gastroesofágica",
      "Carcinoma hepatocelular"
    ],
    contraindicaciones: [
      "Hipersensibilidad a nivolumab",
      "Enfermedad autoinmune activa grave (lupus, colitis ulcerosa activa)",
      "Trasplante de órgano sólido previo (riesgo de rechazo)"
    ],
    efectosAdversos: [
      "Fatiga (25-35%)",
      "Efectos inmunomediados: colitis, hepatitis, neumonitis, nefritis, endocrinopatías",
      "Erupciones cutáneas y prurito",
      "Diarrea",
      "Hipotiroidismo (más frecuente) e hipertiroidismo",
      "Neumonitis inmunomediada (potencialmente fatal)",
      "Artralgia",
      "Elevación de transaminasas"
    ],
    interacciones: [
      "Corticosteroides sistémicos al inicio: pueden reducir eficacia (evitar en las primeras dosis; usar solo para toxicidad inmunomediada)",
      "Ipilimumab (combinación): mayor tasa de toxicidad inmunomediada",
      "Inmunosupresores: pueden disminuir eficacia de nivolumab"
    ],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "240 mg cada 2 semanas o 480 mg cada 4 semanas. Infusión IV en 30 min. Melanoma con ipilimumab: nivolumab 1 mg/kg + ipilimumab 3 mg/kg cada 3 semanas x 4 ciclos, luego nivolumab solo",
      pediatrico: "≥12 años (melanoma, Hodgkin): 3 mg/kg cada 2 semanas",
      geriatrico: "No requiere ajuste",
      ajusteRenal: "No requiere ajuste",
      ajusteHepatico: "Leve: no ajuste. Moderado-severo: sin datos suficientes"
    },
    presentaciones: [
      "Solución para infusión IV 10 mg/mL (4 mL, 10 mL, 24 mL)"
    ],
    embarazo: "D",
    lactancia: "Contraindicado durante tratamiento y 5 meses después.",
    cuidadosEnfermeria: [
      "Monitorizar signos vitales durante infusión y por 30 min post-infusión",
      "Educar al paciente sobre efectos inmunomediados: reportar inmediatamente diarrea persistente, disnea, ictericia, rash extenso, debilidad severa",
      "Obtener función tiroidea basal (TSH, T4L) y monitorizar cada 4-6 semanas",
      "Obtener función hepática y renal antes de cada ciclo",
      "Si toxicidad inmunomediada: iniciar corticosteroides según grado (prednisona 1-2 mg/kg/día)",
      "No premedicar rutinariamente (a diferencia de quimioterapia citotóxica)"
    ],
    farmacocinetica: {
      absorcion: "IV: 100%",
      distribucion: "Vd: 8.0 L",
      metabolismo: "Catabolismo proteico (como anticuerpo monoclonal)",
      excrecion: "No renal ni hepática (degradación proteolítica)",
      vidaMedia: "26.7 días",
      inicioAccion: "Semanas a meses (respuesta inmune gradual)",
      picoAccion: "Fin de infusión",
      duracionAccion: "Semanas (dosificación cada 2-4 semanas)"
    },
    almacenamiento: "Refrigerar 2-8°C. No congelar. Proteger de la luz. Diluido: hasta 24h refrigerado.",
    unidadId: "u12",
    capituloId: "c12_05",
    searchText: ""
  },

  {
    id: "pembrolizumab",
    nombre: "Pembrolizumab",
    nombreGenerico: "Pembrolizumab",
    nombresComerciales: ["Keytruda"],
    familia: "Inmunoterapia oncológica",
    clasificacion: "Anticuerpo monoclonal anti-PD-1 (inhibidor de checkpoint inmunológico)",
    mecanismoAccion: "Anticuerpo monoclonal IgG4 humanizado de alta afinidad contra PD-1. Bloquea la unión de PD-1 con sus ligandos PD-L1 y PD-L2, reactivando la respuesta inmunitaria antitumoral mediada por linfocitos T. Es el inhibidor de checkpoint más ampliamente aprobado.",
    indicaciones: [
      "Melanoma irresecable o metastásico",
      "Cáncer de pulmón no microcítico (primera línea con/sin quimio)",
      "Linfoma de Hodgkin clásico",
      "Cáncer de cabeza y cuello (escamoso)",
      "Carcinoma urotelial",
      "Tumores con MSI-H/dMMR (agnóstico de tumor)",
      "Cáncer de mama triple negativo",
      "Cáncer gástrico"
    ],
    contraindicaciones: [
      "Hipersensibilidad a pembrolizumab",
      "Enfermedad autoinmune activa que requiera terapia sistémica",
      "Neumitis intersticial activa"
    ],
    efectosAdversos: [
      "Fatiga (20-34%)",
      "Prurito y rash",
      "Diarrea",
      "Náuseas",
      "Hipotiroidismo (8-14%)",
      "Neumonitis inmunomediada",
      "Colitis inmunomediada",
      "Hepatitis inmunomediada",
      "Nefritis e insuficiencia suprarrenal"
    ],
    interacciones: [
      "Corticosteroides: pueden reducir eficacia (usar solo para toxicidad inmunomediada)",
      "Otros inmunosupresores: evitar uso concomitante",
      "Vacunas vivas: evitar durante tratamiento"
    ],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "200 mg cada 3 semanas o 400 mg cada 6 semanas. Infusión IV en 30 min. Máximo 2 años de tratamiento (o hasta progresión/toxicidad)",
      pediatrico: "≥2 años: 2 mg/kg cada 3 semanas (máx 200 mg)",
      geriatrico: "No requiere ajuste",
      ajusteRenal: "No requiere ajuste",
      ajusteHepatico: "Leve: no ajuste. Moderado-severo: datos limitados"
    },
    presentaciones: [
      "Solución para infusión IV 25 mg/mL (4 mL = 100 mg)"
    ],
    embarazo: "D",
    lactancia: "Contraindicado durante tratamiento y 4 meses después.",
    cuidadosEnfermeria: [
      "Infundir en 30 min usando filtro de 0.2-5 micrones en línea",
      "Monitorizar función tiroidea (TSH) cada 4-6 semanas — hipotiroidismo frecuente",
      "Obtener perfil hepático, renal y hemograma antes de cada ciclo",
      "Educar sobre efectos inmunomediados: cualquier síntoma nuevo debe reportarse (tos, diarrea, rash, fatiga severa)",
      "Documentar biomarcadores: PD-L1 (TPS o CPS), MSI/dMMR para elegibilidad",
      "Si toxicidad Grado ≥3: suspender e iniciar metilprednisolona 1-2 mg/kg/día IV"
    ],
    farmacocinetica: {
      absorcion: "IV: 100%",
      distribucion: "Vd: 6.0 L",
      metabolismo: "Catabolismo proteico",
      excrecion: "No significativa por vía renal/hepática",
      vidaMedia: "26 días",
      inicioAccion: "Semanas a meses",
      picoAccion: "Fin de infusión",
      duracionAccion: "3-6 semanas"
    },
    almacenamiento: "Refrigerar 2-8°C. No congelar. Proteger de la luz.",
    unidadId: "u12",
    capituloId: "c12_05",
    searchText: ""
  },

  {
    id: "trastuzumab",
    nombre: "Trastuzumab",
    nombreGenerico: "Trastuzumab",
    nombresComerciales: ["Herceptin", "Ogivri", "Kanjinti", "Trazimera"],
    familia: "Anticuerpos monoclonales antineoplásicos",
    clasificacion: "Anticuerpo monoclonal anti-HER2 (receptor 2 del factor de crecimiento epidérmico humano)",
    mecanismoAccion: "Anticuerpo monoclonal IgG1 humanizado que se une selectivamente al dominio extracelular del receptor HER2. Inhibe la señalización de HER2 (proliferación tumoral), induce citotoxicidad celular dependiente de anticuerpos (ADCC), e inhibe la angiogénesis tumoral. Previene el clivaje del dominio extracelular de HER2.",
    indicaciones: [
      "Cáncer de mama HER2 positivo (adyuvante y metastásico)",
      "Cáncer gástrico o de unión gastroesofágica HER2 positivo (metastásico)",
      "Cáncer de mama HER2+ temprano (neoadyuvante)",
      "Cáncer de mama metastásico HER2+ (combinación con quimioterapia)"
    ],
    contraindicaciones: [
      "Hipersensibilidad severa a trastuzumab o proteínas murinas",
      "Insuficiencia cardiaca severa (FEVI <40%) no controlada",
      "Disnea severa en reposo por complicaciones de cáncer avanzado"
    ],
    efectosAdversos: [
      "Cardiotoxicidad: disminución de FEVI, insuficiencia cardiaca (2-7%)",
      "Reacciones infusionales: fiebre, escalofríos (40% en primera dosis)",
      "Diarrea",
      "Fatiga",
      "Náuseas",
      "Cefalea",
      "Artralgia y mialgia",
      "Neutropenia (combinación con quimio)"
    ],
    interacciones: [
      "Antraciclinas (doxorrubicina): cardiotoxicidad sinérgica (evitar uso concurrente; secuenciar)",
      "Paclitaxel: combinación estándar (sinergismo antitumoral), pero mayor riesgo de neutropenia",
      "Otros cardiotóxicos: efecto aditivo sobre FEVI"
    ],
    viaAdministracion: ["IV", "SC"],
    dosis: {
      adulto: "IV: Carga 8 mg/kg, mantenimiento 6 mg/kg cada 3 semanas. O carga 4 mg/kg, mantenimiento 2 mg/kg semanal. SC: 600 mg cada 3 semanas (dosis fija). Duración adyuvante: 12 meses",
      pediatrico: "No indicado en pediatría",
      geriatrico: "No requiere ajuste. Mayor vigilancia cardiaca",
      ajusteRenal: "No requiere ajuste",
      ajusteHepatico: "No estudiado formalmente; precaución"
    },
    presentaciones: [
      "Polvo liofilizado para infusión IV 150 mg, 440 mg",
      "Solución SC 600 mg/5 mL (formulación con hialuronidasa)"
    ],
    embarazo: "D",
    lactancia: "Contraindicado. Suspender lactancia durante tratamiento y 7 meses después.",
    cuidadosEnfermeria: [
      "FEVI basal OBLIGATORIA antes de iniciar (ecocardiograma) y cada 3 meses durante tratamiento",
      "Primera infusión IV en 90 min con monitorización estrecha; si tolera, siguientes en 30 min",
      "Premedicar con paracetamol y difenhidramina si reacción infusional previa",
      "Suspender si FEVI cae >16% del basal o <40%: reevaluar en 3 semanas",
      "Reconstituir con agua bacteriostática (bencílica) — NO usar en neonatos",
      "Monitorizar signos de IC: disnea de esfuerzo, edema de extremidades, ganancia de peso"
    ],
    farmacocinetica: {
      absorcion: "IV: 100%. SC: biodisponibilidad ~77%",
      distribucion: "Vd: 2.95 L. No cruza barrera hematoencefálica significativamente",
      metabolismo: "Catabolismo proteico (IgG1)",
      excrecion: "No significativa por vía renal",
      vidaMedia: "28 días (estado estacionario con dosis cada 3 semanas)",
      inicioAccion: "Semanas",
      picoAccion: "SC: 3 días post-inyección. IV: fin de infusión",
      duracionAccion: "3 semanas"
    },
    almacenamiento: "Refrigerar 2-8°C. No congelar. Reconstituido: 28 días a 2-8°C (con agua bacteriostática) o 24h sin preservante.",
    unidadId: "u12",
    capituloId: "c12_05",
    searchText: ""
  },

  {
    id: "bevacizumab",
    nombre: "Bevacizumab",
    nombreGenerico: "Bevacizumab",
    nombresComerciales: ["Avastin", "Mvasi", "Zirabev", "Alymsys"],
    familia: "Anticuerpos monoclonales antineoplásicos",
    clasificacion: "Anticuerpo monoclonal anti-VEGF (inhibidor de angiogénesis)",
    mecanismoAccion: "Anticuerpo monoclonal IgG1 humanizado que se une al factor de crecimiento endotelial vascular A (VEGF-A), impidiendo su interacción con los receptores VEGFR-1 y VEGFR-2 en las células endoteliales. Inhibe la angiogénesis tumoral, reduce la permeabilidad vascular tumoral y normaliza la vasculatura, mejorando la entrega de quimioterapia concomitante.",
    indicaciones: [
      "Cáncer colorrectal metastásico (con quimioterapia)",
      "Cáncer de pulmón no microcítico (no escamoso, con quimio)",
      "Cáncer de mama metastásico (algunas regiones)",
      "Glioblastoma recurrente",
      "Cáncer de ovario avanzado",
      "Cáncer renal metastásico",
      "Cáncer cervicouterino metastásico"
    ],
    contraindicaciones: [
      "Hipersensibilidad a bevacizumab",
      "Cirugía mayor en las últimas 4 semanas o herida no cicatrizada",
      "Hemoptisis significativa reciente (>2.5 mL)",
      "Hipertensión no controlada"
    ],
    efectosAdversos: [
      "Hipertensión arterial (25-34%)",
      "Proteinuria",
      "Hemorragia (epistaxis frecuente; hemorragia GI, pulmonar grave rara)",
      "Perforación gastrointestinal (1-2%, potencialmente fatal)",
      "Tromboembolismo arterial",
      "Retraso en cicatrización de heridas",
      "Fatiga",
      "Síndrome de leucoencefalopatía posterior reversible (PRES, raro)"
    ],
    interacciones: [
      "Sunitinib: anemia hemolítica microangiopática (evitar combinación)",
      "Quimioterapia: potencia cardiotoxicidad de antraciclinas",
      "Anticoagulantes: mayor riesgo hemorrágico"
    ],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "5-15 mg/kg cada 2-3 semanas según indicación. Colorrectal: 5-10 mg/kg cada 2 semanas. Pulmón: 15 mg/kg cada 3 semanas. Ovario: 15 mg/kg cada 3 semanas",
      pediatrico: "No aprobado en pediatría",
      geriatrico: "No requiere ajuste, pero mayor riesgo de eventos arteriales",
      ajusteRenal: "No requiere ajuste",
      ajusteHepatico: "No requiere ajuste"
    },
    presentaciones: [
      "Solución para infusión IV 25 mg/mL (4 mL = 100 mg, 16 mL = 400 mg)"
    ],
    embarazo: "D",
    lactancia: "Contraindicado durante tratamiento y 6 meses después.",
    cuidadosEnfermeria: [
      "Primera infusión en 90 min; si tolera, segunda en 60 min, siguientes en 30 min",
      "Monitorizar presión arterial CADA ciclo: HTA frecuente, iniciar antihipertensivo si necesario",
      "Análisis de orina para proteinuria antes de cada ciclo (tira reactiva; si ≥2+: medir ratio proteína/creatinina)",
      "Suspender 4-6 semanas ANTES de cirugía electiva (retraso de cicatrización)",
      "Vigilar signos de perforación GI: dolor abdominal agudo, fiebre, peritonismo",
      "Educar sobre hemorragias: epistaxis frecuente; hemorragia severa requiere atención inmediata"
    ],
    farmacocinetica: {
      absorcion: "IV: 100%",
      distribucion: "Vd: 2.73 L",
      metabolismo: "Catabolismo proteico",
      excrecion: "No significativa por vía renal/hepática",
      vidaMedia: "20 días",
      inicioAccion: "Semanas",
      picoAccion: "Fin de infusión",
      duracionAccion: "2-3 semanas"
    },
    almacenamiento: "Refrigerar 2-8°C. No congelar. No agitar. Diluido en SF: 8h refrigerado.",
    unidadId: "u12",
    capituloId: "c12_05",
    searchText: ""
  },

  {
    id: "everolimus",
    nombre: "Everolimus",
    nombreGenerico: "Everolimus",
    nombresComerciales: ["Afinitor", "Certican", "Votubia"],
    familia: "Inhibidores mTOR",
    clasificacion: "Inhibidor de la serina/treonina quinasa mTOR (diana de rapamicina en mamíferos)",
    mecanismoAccion: "Se une a la proteína intracelular FKBP-12, formando un complejo que inhibe mTORC1 (complejo 1 de mTOR). Esto bloquea la señalización PI3K/AKT/mTOR, inhibiendo la proliferación celular, angiogénesis y metabolismo de las células tumorales. También tiene efecto inmunosupresor al inhibir la activación y proliferación de linfocitos T.",
    indicaciones: [
      "Cáncer renal avanzado (tras fallo de sunitinib/sorafenib)",
      "Tumores neuroendocrinos pancreáticos (pNET) avanzados",
      "Cáncer de mama HER2- HR+ avanzado (con exemestano)",
      "Angiomiolipoma renal asociado a esclerosis tuberosa",
      "Astrocitoma subependimario de células gigantes (SEGA)",
      "Prevención de rechazo de trasplante renal (Certican)"
    ],
    contraindicaciones: [
      "Hipersensibilidad a everolimus, sirolimus u otros análogos de rapamicina",
      "Insuficiencia hepática severa (Child-Pugh C) para indicaciones oncológicas",
      "Neumonitis no infecciosa activa Grado ≥3",
      "Infección activa severa no controlada"
    ],
    efectosAdversos: [
      "Estomatitis/mucositis oral (44-67%, a menudo limitante de dosis)",
      "Neumonitis no infecciosa (12-19%)",
      "Hiperglucemia",
      "Dislipidemia (hipercolesterolemia, hipertrigliceridemia)",
      "Diarrea",
      "Infecciones (inmunosupresión)",
      "Fatiga",
      "Erupción cutánea",
      "Trombocitopenia y anemia"
    ],
    interacciones: [
      "Inhibidores potentes CYP3A4 (ketoconazol, voriconazol, claritromicina): evitar o reducir dosis drásticamente",
      "Inductores potentes CYP3A4 (rifampicina, fenitoína): evitar o aumentar dosis",
      "Jugo de pomelo/toronja: aumenta niveles (evitar)",
      "Vacunas vivas: contraindicadas durante tratamiento"
    ],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "Oncología: 10 mg/día. Cáncer mama con exemestano: 10 mg/día. TSC (angiomiolipoma/SEGA): 4.5 mg/m²/día. Trasplante: 0.75-1 mg cada 12h (ajustar según niveles)",
      pediatrico: "SEGA ≥1 año: 4.5 mg/m²/día (ajustar por niveles plasmáticos 5-15 ng/mL)",
      geriatrico: "No requiere ajuste, pero mayor vigilancia",
      ajusteRenal: "No requiere ajuste",
      ajusteHepatico: "Leve (Child-Pugh A): 7.5 mg/día. Moderado (B): 5 mg/día. Severo (C): 2.5 mg/día (oncología)"
    },
    presentaciones: [
      "Comprimidos 2.5 mg, 5 mg, 10 mg",
      "Comprimidos dispersables 2 mg, 3 mg, 5 mg (SEGA pediátrico)"
    ],
    embarazo: "D",
    lactancia: "Contraindicado.",
    cuidadosEnfermeria: [
      "Educar sobre estomatitis: enjuagues con solución salina/bicarbonato; evitar alcohol y peróxido. Tratar con corticoides tópicos orales si Grado ≥2",
      "Monitorizar glucemia y perfil lipídico regularmente (hiperglucemia y dislipidemia frecuentes)",
      "Evaluar síntomas respiratorios cada visita: tos seca y disnea pueden indicar neumonitis (radiografía/TC si sospecha)",
      "Monitorizar hemograma completo antes de cada ciclo",
      "Tomar a la misma hora diariamente, con o sin alimentos (pero consistente)",
      "Evitar vacunas vivas y contacto con personas con infecciones activas"
    ],
    farmacocinetica: {
      absorcion: "Oral: biodisponibilidad ~30%. Afectada por alimentos grasos (reducen Cmax 54%)",
      distribucion: "Ratio sangre/plasma: 17-73%. Unión proteica 74%",
      metabolismo: "Hepático: CYP3A4 y P-glucoproteína (6 metabolitos, todos menos activos)",
      excrecion: "Fecal 80%, renal 5%",
      vidaMedia: "30 h",
      inicioAccion: "Días a semanas",
      picoAccion: "1-2 h",
      duracionAccion: "24 h (dosificación diaria)"
    },
    almacenamiento: "Temperatura ambiente (25°C, excursiones 15-30°C). Proteger de la luz y humedad. Dispersables: usar dentro de 60 min.",
    unidadId: "u12",
    capituloId: "c12_05",
    searchText: ""
  },

  {
    id: "sorafenib",
    nombre: "Sorafenib",
    nombreGenerico: "Tosilato de sorafenib",
    nombresComerciales: ["Nexavar"],
    familia: "Inhibidores de tirosina quinasa multikinasa",
    clasificacion: "Inhibidor multicinasa (RAF, VEGFR, PDGFR, c-KIT, FLT-3)",
    mecanismoAccion: "Inhibe múltiples quinasas intracelulares (C-RAF, B-RAF, B-RAF mutante) y receptores de superficie (VEGFR-1/2/3, PDGFR-beta, c-KIT, FLT-3, RET). Tiene doble mecanismo antitumoral: antiproliferativo directo (vía RAF/MEK/ERK) y antiangiogénico (vía VEGFR/PDGFR).",
    indicaciones: [
      "Carcinoma hepatocelular (HCC) irresecable",
      "Carcinoma renal avanzado",
      "Cáncer diferenciado de tiroides refractario a yodo radioactivo",
      "Angiosarcoma (off-label)"
    ],
    contraindicaciones: [
      "Hipersensibilidad a sorafenib",
      "Combinación con carboplatino y paclitaxel en cáncer de pulmón de células escamosas (mortalidad aumentada)",
      "Embarazo"
    ],
    efectosAdversos: [
      "Síndrome mano-pie (eritrodisestesia palmo-plantar) 21-62%",
      "Diarrea (39-55%)",
      "Hipertensión (17-40%)",
      "Fatiga",
      "Erupción cutánea y alopecia",
      "Anorexia y pérdida de peso",
      "Hemorragia (cualquier grado)",
      "Hipotiroidismo"
    ],
    interacciones: [
      "Warfarina: mayor riesgo de sangrado (monitorizar INR estrechamente)",
      "Inductores CYP3A4 (rifampicina, fenitoína): reducen niveles de sorafenib",
      "Neomicina oral: reduce biodisponibilidad 54%",
      "Doxorrubicina: aumenta AUC de doxorrubicina 21%"
    ],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "400 mg (2 comprimidos de 200 mg) 2 veces/día. Tomar en ayunas o con comida baja en grasa. Reducción de dosis: 400 mg/día, luego 400 mg cada 48h",
      pediatrico: "No aprobado en pediatría",
      geriatrico: "No requiere ajuste",
      ajusteRenal: "Leve-moderado: no ajuste. Diálisis: no estudiado",
      ajusteHepatico: "Leve-moderado (Child-Pugh A/B): no ajuste. Severo: sin datos"
    },
    presentaciones: [
      "Comprimidos recubiertos 200 mg"
    ],
    embarazo: "D",
    lactancia: "Contraindicado.",
    cuidadosEnfermeria: [
      "Educar sobre síndrome mano-pie: usar cremas hidratantes, evitar calzado ajustado, baños calientes; reportar dolor/ampollas",
      "Monitorizar PA cada visita: HTA frecuente, puede requerir antihipertensivo",
      "Tomar 1h antes o 2h después de las comidas (la comida grasa reduce absorción 29%)",
      "No triturar ni masticar comprimidos",
      "Monitorizar función tiroidea (TSH) periódicamente — hipotiroidismo frecuente",
      "Vigilar signos de hemorragia: epistaxis, hemoptisis, melena"
    ],
    farmacocinetica: {
      absorcion: "Oral: biodisponibilidad 38-49%. Comida grasa reduce absorción 29%",
      distribucion: "Unión proteica 99.5%",
      metabolismo: "Hepático: CYP3A4 (oxidación) y UGT1A9 (glucuronidación). Metabolito activo: N-óxido de piridina",
      excrecion: "Fecal 77%, renal 19%",
      vidaMedia: "25-48 h",
      inicioAccion: "Semanas",
      picoAccion: "3 h",
      duracionAccion: "12 h (dosificación 2 veces/día)"
    },
    almacenamiento: "Temperatura ambiente (25°C). Proteger de humedad.",
    unidadId: "u12",
    capituloId: "c12_05",
    searchText: ""
  },

  {
    id: "lenalidomida",
    nombre: "Lenalidomida",
    nombreGenerico: "Lenalidomida",
    nombresComerciales: ["Revlimid"],
    familia: "Inmunomoduladores antineoplásicos",
    clasificacion: "Análogo de talidomida (IMiD - immunomodulatory imide drug)",
    mecanismoAccion: "Agente inmunomodulador con múltiples mecanismos: se une a la proteína cereblón (CRBN), alterando la ubiquitinación y degradación de sustratos proteicos específicos (Ikaros, Aiolos). Tiene propiedades antiangiogénicas, antiproliferativas directas, y modula la respuesta inmune (estimula linfocitos T y NK, inhibe citocinas proinflamatorias).",
    indicaciones: [
      "Mieloma múltiple (primera línea y recaída, con dexametasona)",
      "Síndromes mielodisplásicos con deleción 5q",
      "Linfoma de células del manto en recaída",
      "Linfoma folicular en recaída",
      "Mantenimiento post-trasplante en mieloma múltiple"
    ],
    contraindicaciones: [
      "Embarazo (teratógeno absoluto — programa de prevención de embarazo obligatorio)",
      "Mujeres en edad fértil sin anticoncepción dual efectiva",
      "Hipersensibilidad a lenalidomida",
      "Lactancia"
    ],
    efectosAdversos: [
      "Neutropenia y trombocitopenia (dosis-limitante)",
      "Tromboembolismo venoso y arterial (requiere tromboprofilaxis)",
      "Diarrea (39%)",
      "Fatiga",
      "Erupción cutánea y prurito",
      "Calambres musculares",
      "Segundas neoplasias primarias (riesgo aumentado con melfalán)",
      "Neuropatía periférica (menos que talidomida)"
    ],
    interacciones: [
      "Dexametasona: combinación estándar (sinergismo), pero mayor riesgo de TEV",
      "Digoxina: aumenta niveles de digoxina 14%",
      "Eritropoyetina: puede aumentar riesgo trombótico",
      "Anticonceptivos hormonales: pueden ser afectados (usar métodos barrera adicionales)"
    ],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "Mieloma múltiple: 25 mg/día días 1-21 de ciclo de 28 días (con dexametasona). SMD 5q-: 10 mg/día. Mantenimiento: 10-15 mg/día. Ajustar según hematología",
      pediatrico: "No aprobado en pediatría",
      geriatrico: "Iniciar con dosis menores. Mayor riesgo de trombocitopenia",
      ajusteRenal: "CrCl 30-50: 10 mg/día. CrCl <30: 15 mg cada 48h. Diálisis: 5 mg/día (post-diálisis días de HD)",
      ajusteHepatico: "No requiere ajuste formal, pero precaución"
    },
    presentaciones: [
      "Cápsulas 2.5 mg, 5 mg, 10 mg, 15 mg, 20 mg, 25 mg"
    ],
    embarazo: "X",
    lactancia: "Contraindicado.",
    cuidadosEnfermeria: [
      "PROGRAMA DE PREVENCIÓN DE EMBARAZO OBLIGATORIO (REMS/RevAssist): verificar test de embarazo negativo antes de cada ciclo",
      "Hemograma completo semanal los primeros 2 ciclos, luego mensual (ajustar dosis según neutrófilos y plaquetas)",
      "Iniciar tromboprofilaxis (aspirina 100 mg/día o HBPM según riesgo) para prevenir TEV",
      "Las cápsulas NO deben abrirse ni triturarse: manipular con guantes",
      "Monitorizar función renal y ajustar dosis en insuficiencia renal",
      "Educar: anticoncepción dual obligatoria en mujeres fértiles (4 semanas antes, durante, y 4 semanas después)"
    ],
    farmacocinetica: {
      absorcion: "Oral: rápida, biodisponibilidad ~70%",
      distribucion: "Unión proteica ~30%",
      metabolismo: "Mínimo metabolismo hepático. No es sustrato de CYP450",
      excrecion: "Renal 82% (inalterada 70%)",
      vidaMedia: "3-5 h",
      inicioAccion: "Semanas",
      picoAccion: "0.5-6 h",
      duracionAccion: "24 h (dosificación diaria)"
    },
    almacenamiento: "Temperatura ambiente (15-30°C). Proteger de la luz.",
    unidadId: "u12",
    capituloId: "c12_05",
    searchText: ""
  },

  {
    id: "oxaliplatino",
    nombre: "Oxaliplatino",
    nombreGenerico: "Oxaliplatino",
    nombresComerciales: ["Eloxatin", "Oxaliplatino Hospira"],
    familia: "Antineoplásicos a base de platino",
    clasificacion: "Derivado del platino de tercera generación (diaminociclohexano-platino)",
    mecanismoAccion: "Forma aductos con el ADN (enlaces cruzados intra e intercatenarios) al unirse a las bases guanina. A diferencia de cisplatino, los aductos de oxaliplatino no son reconocidos eficientemente por el sistema de reparación por desapareamiento (MMR), lo que le confiere actividad en tumores resistentes a cisplatino.",
    indicaciones: [
      "Cáncer colorrectal metastásico (esquema FOLFOX con 5-FU/leucovorina)",
      "Cáncer colorrectal adyuvante (estadio III, FOLFOX)",
      "Cáncer gástrico y de unión gastroesofágica",
      "Cáncer de páncreas (FOLFIRINOX)",
      "Cáncer de ovario"
    ],
    contraindicaciones: [
      "Hipersensibilidad a oxaliplatino o compuestos de platino",
      "Neuropatía periférica sensitiva preexistente grado ≥2",
      "Insuficiencia renal severa (CrCl <30 mL/min)",
      "Embarazo y lactancia"
    ],
    efectosAdversos: [
      "Neuropatía periférica sensitiva (85-95%): aguda por frío y crónica acumulativa (dosis-limitante)",
      "Náuseas y vómitos (70%, moderadamente emetógeno)",
      "Diarrea",
      "Neutropenia",
      "Trombocitopenia",
      "Fatiga",
      "Reacciones de hipersensibilidad (ciclos tardíos, desde ciclo 6-8)",
      "Laringoespasmo agudo por frío"
    ],
    interacciones: [
      "5-Fluorouracilo/Leucovorina: combinación sinérgica estándar (FOLFOX)",
      "Nefrotóxicos: evitar combinación (aminoglucósidos, AINEs)",
      "Vacunas vivas: evitar"
    ],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "FOLFOX: 85 mg/m² IV en 2-6h día 1 cada 2 semanas (12 ciclos adyuvante, o hasta progresión en metastásico). FOLFIRINOX: 85 mg/m² cada 2 semanas",
      pediatrico: "No indicación estándar en pediatría",
      geriatrico: "No requiere ajuste, pero mayor vigilancia de neuropatía",
      ajusteRenal: "CrCl 30-60: reducir a 65 mg/m². CrCl <30: contraindicado",
      ajusteHepatico: "No requiere ajuste formal"
    },
    presentaciones: [
      "Solución para infusión IV 5 mg/mL (10 mL = 50 mg, 20 mL = 100 mg, 40 mL = 200 mg)"
    ],
    embarazo: "D",
    lactancia: "Contraindicado.",
    cuidadosEnfermeria: [
      "Educar sobre neuropatía aguda por frío: NO tocar objetos fríos, NO beber líquidos fríos 3-5 días tras infusión (puede causar espasmo laríngeo)",
      "Infundir en dextrosa 5% (NO en solución salina — causa degradación del fármaco)",
      "Premedicar con antieméticos (5-HT3 + dexametasona): moderadamente emetógeno",
      "Evaluar neuropatía en cada ciclo (test de discriminación térmica): suspender si persistente entre ciclos",
      "Vigilar reacciones de hipersensibilidad especialmente después del ciclo 6 (pueden ser severas)",
      "Monitorizar hemograma antes de cada ciclo: no administrar si neutrófilos <1500 o plaquetas <75,000"
    ],
    farmacocinetica: {
      absorcion: "IV: 100%",
      distribucion: "Vd: 440 L. Unión a proteínas plasmáticas: >90% (unión irreversible a eritrocitos)",
      metabolismo: "Biotransformación no enzimática a metabolitos reactivos de platino",
      excrecion: "Renal 54% (en 5 días)",
      vidaMedia: "Distribución: 0.4 h. Terminal (platino libre): 16.8 h. Platino en eritrocitos: ~252 días",
      inicioAccion: "Durante infusión",
      picoAccion: "Fin de infusión",
      duracionAccion: "14 días (esquema cada 2 semanas)"
    },
    almacenamiento: "Temperatura ambiente. No refrigerar solución concentrada. Proteger de la luz. Diluido en dextrosa 5%: 24h a TA.",
    unidadId: "u12",
    capituloId: "c12_05",
    searchText: ""
  },

  {
    id: "capecitabina",
    nombre: "Capecitabina",
    nombreGenerico: "Capecitabina",
    nombresComerciales: ["Xeloda"],
    familia: "Antineoplásicos antimetabolitos",
    clasificacion: "Fluoropirimidina oral (profármaco de 5-fluorouracilo)",
    mecanismoAccion: "Profármaco que se convierte en 5-fluorouracilo (5-FU) preferentemente en el tejido tumoral mediante la enzima timidina fosforilasa (TP), que está sobreexpresada en muchos tumores. El 5-FU resultante inhibe la timidilato sintasa (TS), bloqueando la síntesis de ADN, y se incorpora al ARN, interfiriendo con el procesamiento de ARN.",
    indicaciones: [
      "Cáncer colorrectal metastásico (monoterapia o con oxaliplatino: XELOX)",
      "Cáncer colorrectal adyuvante (estadio III, Dukes C)",
      "Cáncer de mama metastásico (tras antraciclinas y taxanos)",
      "Cáncer gástrico avanzado (con platino)"
    ],
    contraindicaciones: [
      "Deficiencia de dihidropirimidina deshidrogenasa (DPD) completa — toxicidad fatal",
      "Hipersensibilidad a capecitabina o 5-fluorouracilo",
      "Insuficiencia renal severa (CrCl <30 mL/min)",
      "Uso concomitante con brivudina o sorivudina (interacción fatal)"
    ],
    efectosAdversos: [
      "Síndrome mano-pie (eritrodisestesia palmo-plantar) 50-60%",
      "Diarrea (47%)",
      "Náuseas y vómitos",
      "Estomatitis/mucositis",
      "Hiperbilirrubinemia",
      "Fatiga",
      "Neutropenia",
      "Cardiotoxicidad (espasmo coronario, raro pero potencialmente fatal)"
    ],
    interacciones: [
      "Brivudina/Sorivudina: CONTRAINDICADO (inhibe DPD, toxicidad fatal por 5-FU acumulado)",
      "Warfarina: aumenta efecto anticoagulante significativamente (monitorizar INR cada 1-2 semanas)",
      "Fenitoína: aumenta niveles de fenitoína (toxicidad)",
      "Leucovorina: potencia toxicidad y eficacia del 5-FU generado"
    ],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "Monoterapia: 1250 mg/m² 2 veces/día por 14 días, descanso 7 días (ciclo de 21 días). Combinación: 1000 mg/m² 2 veces/día. Tomar dentro de 30 min después de comida, con agua",
      pediatrico: "No aprobado en pediatría",
      geriatrico: "Mayor riesgo de toxicidad GI. Considerar reducción de dosis",
      ajusteRenal: "CrCl 30-50: reducir a 75% de dosis. CrCl <30: contraindicado",
      ajusteHepatico: "No requiere ajuste en leve-moderado. Metástasis hepáticas: monitorización estrecha"
    },
    presentaciones: [
      "Comprimidos recubiertos 150 mg, 500 mg"
    ],
    embarazo: "D",
    lactancia: "Contraindicado.",
    cuidadosEnfermeria: [
      "Verificar estado de DPD ANTES de iniciar si disponible (deficiencia parcial/completa: riesgo de toxicidad fatal)",
      "Educar sobre síndrome mano-pie: hidratar manos/pies, evitar fricción, reportar enrojecimiento/dolor",
      "Tomar DENTRO DE 30 MIN después de comida con vaso lleno de agua (mañana y noche)",
      "Monitorizar INR semanalmente si paciente toma warfarina (interacción significativa)",
      "Instruir al paciente para suspender y consultar si: diarrea ≥4 deposiciones/día, vómitos ≥2 veces/día, estomatitis, fiebre >38°C, síndrome mano-pie Grado ≥2",
      "Vigilar signos de cardiotoxicidad: dolor torácico, cambios ECG (especialmente en pacientes con enfermedad coronaria previa)"
    ],
    farmacocinetica: {
      absorcion: "Oral: rápida, biodisponibilidad ~100%",
      distribucion: "Unión proteica <60%. Concentración tumoral del metabolito 5-FU: 3.2 veces mayor que tejido sano",
      metabolismo: "Hepático: carboxilesterasa → 5'-DFCR → 5'-DFUR → 5-FU (por timidina fosforilasa tumoral). Inactivado por DPD",
      excrecion: "Renal 95.5% (como metabolitos)",
      vidaMedia: "Capecitabina: 0.75 h. 5-FU generado: 0.75 h",
      inicioAccion: "2 h (conversión a 5-FU)",
      picoAccion: "Capecitabina: 1.5 h (retraso 1.5h con alimentos). 5-FU: 2 h",
      duracionAccion: "12 h (dosificación 2 veces/día)"
    },
    almacenamiento: "Temperatura ambiente (25°C, excursiones 15-30°C).",
    unidadId: "u12",
    capituloId: "c12_05",
    searchText: ""
  },

  {
    id: "exemestano",
    nombre: "Exemestano",
    nombreGenerico: "Exemestano",
    nombresComerciales: ["Aromasin", "Exemestano Teva", "Exemestano Accord"],
    familia: "Inhibidores de aromatasa",
    clasificacion: "Inhibidor esteroideo irreversible de aromatasa (tipo I, inactivador suicida)",
    mecanismoAccion: "Análogo esteroideo de androstenediona que se une irreversiblemente al sitio activo de la enzima aromatasa (CYP19), inactivándola permanentemente ('inhibición suicida'). Reduce la conversión periférica de andrógenos a estrógenos en un 97-98% en mujeres posmenopáusicas, reduciendo los niveles séricos de estrógeno que estimulan el crecimiento de tumores hormonodependientes.",
    indicaciones: [
      "Cáncer de mama temprano HR+ en mujeres posmenopáusicas (adyuvante, tras 2-3 años de tamoxifeno)",
      "Cáncer de mama avanzado HR+ en posmenopáusicas (tras fallo de tamoxifeno)",
      "Cáncer de mama metastásico HR+ posmenopáusico"
    ],
    contraindicaciones: [
      "Mujeres premenopáusicas",
      "Hipersensibilidad a exemestano",
      "Embarazo y lactancia"
    ],
    efectosAdversos: [
      "Sofocos (13-33%)",
      "Artralgia y dolor musculoesquelético (20-30%)",
      "Fatiga",
      "Insomnio",
      "Cefalea",
      "Osteoporosis y fracturas (pérdida de densidad mineral ósea)",
      "Hipercolesterolemia",
      "Sudoración excesiva"
    ],
    interacciones: [
      "Estrógenos: anulan el efecto de exemestano (contraindicado uso concomitante)",
      "Inductores potentes CYP3A4 (rifampicina): reducen niveles de exemestano 54%",
      "Inhibidores potentes CYP3A4: pueden aumentar niveles (efecto clínico modesto por inactivación irreversible)"
    ],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "25 mg/día tras comida. Duración adyuvante: completar 5 años de terapia endocrina total (ej. 2-3 años tamoxifeno + 2-3 años exemestano, o 5 años exemestano)",
      pediatrico: "No indicado",
      geriatrico: "No requiere ajuste",
      ajusteRenal: "No requiere ajuste",
      ajusteHepatico: "No requiere ajuste"
    },
    presentaciones: [
      "Comprimidos recubiertos 25 mg"
    ],
    embarazo: "X",
    lactancia: "Contraindicado.",
    cuidadosEnfermeria: [
      "Tomar siempre después de una comida (la comida aumenta absorción 40%)",
      "Realizar densitometría ósea basal y cada 1-2 años (riesgo de osteoporosis significativo)",
      "Suplementar calcio (1000-1200 mg/día) y vitamina D (800-1000 UI/día)",
      "Monitorizar perfil lipídico anualmente",
      "Evaluar dolor articular: frecuente, puede requerir analgesia con AINEs o cambio a otro IA",
      "Confirmar estado posmenopáusico antes de iniciar (verificar FSH/estradiol si dudas)"
    ],
    farmacocinetica: {
      absorcion: "Oral: rápida, biodisponibilidad ~42% (aumenta 40% con alimentos)",
      distribucion: "Vd: amplio. Unión proteica 90% (albúmina y alfa-1 glicoproteína)",
      metabolismo: "Hepático: CYP3A4 y aldoceto-reductasas",
      excrecion: "Renal y fecal (equitativo)",
      vidaMedia: "24 h",
      inicioAccion: "Reducción de estrógenos en 24h",
      picoAccion: "2.9 h",
      duracionAccion: "24 h (efecto persiste por inactivación enzimática irreversible; recuperación completa: 2-3 días por síntesis de nueva aromatasa)"
    },
    almacenamiento: "Temperatura ambiente (25°C).",
    unidadId: "u12",
    capituloId: "c12_05",
    searchText: ""
  },

  {
    id: "mercaptopurina",
    nombre: "Mercaptopurina (6-MP)",
    nombreGenerico: "Mercaptopurina",
    nombresComerciales: ["Purinethol", "Puri-Nethol", "Xaluprine"],
    familia: "Antineoplásicos antimetabolitos",
    clasificacion: "Análogo de purina (antimetabolito)",
    mecanismoAccion: "Análogo de hipoxantina que se convierte en nucleótidos de tioguanina (6-TGN) activos. Estos se incorporan al ADN y ARN, inhibiendo la síntesis de ácidos nucleicos. También inhibe la síntesis de novo de purinas al bloquear la PRPP amidotransferasa y otras enzimas de la vía de purinas. Tiene efecto inmunosupresor por depleción de linfocitos.",
    indicaciones: [
      "Leucemia linfoblástica aguda (LLA) — mantenimiento (uso principal)",
      "Leucemia mieloblástica aguda (inducción/consolidación)",
      "Enfermedad inflamatoria intestinal (Crohn, colitis ulcerosa — off-label/establecido)",
      "Hepatitis autoinmune (off-label)"
    ],
    contraindicaciones: [
      "Hipersensibilidad a mercaptopurina",
      "Uso concomitante con alopurinol a dosis plenas sin ajustar mercaptopurina (toxicidad severa)",
      "Deficiencia completa de TPMT o NUDT15 (toxicidad hematológica fatal)"
    ],
    efectosAdversos: [
      "Mielosupresión: leucopenia, trombocitopenia, anemia (dosis-dependiente)",
      "Hepatotoxicidad (elevación de transaminasas, ictericia colestática)",
      "Náuseas y vómitos",
      "Diarrea",
      "Hiperuricemia",
      "Mucositis oral",
      "Infecciones oportunistas (inmunosupresión)"
    ],
    interacciones: [
      "Alopurinol: inhibe xantina oxidasa que metaboliza 6-MP — REDUCIR DOSIS de mercaptopurina a 1/3 o 1/4 si se usa alopurinol",
      "Warfarina: efecto anticoagulante reducido",
      "Vacunas vivas: contraindicadas",
      "Aminosalicilatos (mesalazina, olsalazina): inhiben TPMT, aumentando toxicidad"
    ],
    viaAdministracion: ["oral"],
    dosis: {
      adulto: "LLA mantenimiento: 1.5-2.5 mg/kg/día (50-75 mg/m²/día). EII: 1-1.5 mg/kg/día. Si alopurinol concomitante: reducir a 1/3 o 1/4 de la dosis",
      pediatrico: "LLA mantenimiento: 1.5-2.5 mg/kg/día. Ajustar según genotipo TPMT/NUDT15 y hemograma",
      geriatrico: "Mayor sensibilidad a mielosupresión. Iniciar con dosis bajas",
      ajusteRenal: "Reducir dosis en insuficiencia renal. CrCl <50: comenzar con dosis bajas",
      ajusteHepatico: "Reducir dosis. Monitorizar función hepática estrechamente"
    },
    presentaciones: [
      "Comprimidos 50 mg",
      "Suspensión oral 20 mg/mL (Xaluprine)"
    ],
    embarazo: "D",
    lactancia: "Contraindicado.",
    cuidadosEnfermeria: [
      "Determinar genotipo TPMT y NUDT15 ANTES de iniciar (metabolizadores lentos: riesgo de mielosupresión fatal)",
      "Hemograma semanal las primeras 8 semanas, luego cada 2-4 semanas",
      "Monitorizar función hepática mensual (hepatotoxicidad frecuente)",
      "Tomar en ayunas a la misma hora (la comida reduce absorción variable e inconsistentemente)",
      "Si se combina con alopurinol: verificar que la dosis esté reducida a 25-33%",
      "Manipular comprimidos con guantes (citotóxico). Suspensión oral: agitar bien, medir con jeringa"
    ],
    farmacocinetica: {
      absorcion: "Oral: variable, biodisponibilidad 16-50%. Alimentos reducen absorción",
      distribucion: "No cruza BHE significativamente. Unión proteica 19%",
      metabolismo: "Hepático: TPMT (inactivación), xantina oxidasa (inactivación por alopurinol), y HGPRT (activación a 6-TGN)",
      excrecion: "Renal 46%",
      vidaMedia: "Adultos: 1-2 h (pediátricos: 0.9 h). 6-TGN intracelulares: días a semanas",
      inicioAccion: "Semanas (efecto antileucémico y antiinflamatorio)",
      picoAccion: "2 h",
      duracionAccion: "24 h (los 6-TGN intracelulares se acumulan con dosis diaria)"
    },
    almacenamiento: "Temperatura ambiente (15-25°C). Proteger de la luz y humedad.",
    unidadId: "u12",
    capituloId: "c12_05",
    searchText: ""
  },

  // ===================== Inmunosupresores (c08_04, u08) =====================
  {
    id: "tocilizumab",
    nombre: "Tocilizumab",
    nombreGenerico: "Tocilizumab",
    nombresComerciales: ["Actemra", "RoActemra"],
    familia: "Anticuerpos monoclonales inmunosupresores",
    clasificacion: "Anticuerpo monoclonal anti-receptor de IL-6 (anti-IL-6R)",
    mecanismoAccion: "Anticuerpo monoclonal IgG1 humanizado que se une específicamente a los receptores de interleucina-6 (IL-6R) tanto solubles como de membrana. Inhibe la señalización mediada por IL-6, una citocina proinflamatoria clave en la artritis reumatoide, artritis idiopática juvenil y el síndrome de liberación de citocinas. Reduce la producción hepática de PCR, fibrinógeno y SAA.",
    indicaciones: [
      "Artritis reumatoide moderada a severa (tras fallo de DMARD)",
      "Artritis idiopática juvenil sistémica",
      "Arteritis de células gigantes (temporal)",
      "Síndrome de liberación de citocinas (CRS) por terapia CAR-T",
      "COVID-19 severo (hospitalizado con hipoxia)"
    ],
    contraindicaciones: [
      "Hipersensibilidad a tocilizumab",
      "Infección activa severa (sepsis, tuberculosis activa)",
      "Neutrófilos <500/mm³ o plaquetas <50,000/mm³",
      "Elevación de transaminasas >5x ULN"
    ],
    efectosAdversos: [
      "Infecciones respiratorias superiores (7%)",
      "Nasofaringitis",
      "Elevación de transaminasas",
      "Hipercolesterolemia y dislipidemia",
      "Neutropenia",
      "Reacciones infusionales (IV) o en sitio de inyección (SC)",
      "Perforación gastrointestinal (especialmente en diverticulitis preexistente)",
      "Reactivación de tuberculosis latente"
    ],
    interacciones: [
      "Simvastatina, atorvastatina: IL-6 suprime CYP3A4; al bloquear IL-6, se recupera el metabolismo y los niveles de estatinas pueden bajar (ajustar dosis)",
      "Inmunosupresores (MTX): uso combinado estándar en AR, pero mayor riesgo infeccioso",
      "Vacunas vivas: evitar durante tratamiento",
      "Warfarina: puede reducir niveles (monitorizar INR al inicio)"
    ],
    viaAdministracion: ["IV", "SC"],
    dosis: {
      adulto: "AR: IV 8 mg/kg cada 4 semanas (mín 4 mg/kg). SC: 162 mg semanal (>100 kg) o cada 2 semanas (<100 kg). CRS: 8 mg/kg IV (máx 800 mg), puede repetir cada 8h (máx 3 dosis adicionales)",
      pediatrico: "AIJ sistémica ≥2 años: IV 12 mg/kg (<30 kg) o 8 mg/kg (≥30 kg) cada 2 semanas",
      geriatrico: "No requiere ajuste. Mayor vigilancia de infecciones",
      ajusteRenal: "Leve-moderado: no ajuste. Severo: no estudiado",
      ajusteHepatico: "No recomendado si ALT/AST >5x ULN"
    },
    presentaciones: [
      "Solución para infusión IV 20 mg/mL (4 mL, 10 mL, 20 mL)",
      "Solución SC en jeringa precargada 162 mg/0.9 mL"
    ],
    embarazo: "C",
    lactancia: "Se desconoce excreción. Evaluar riesgo-beneficio.",
    cuidadosEnfermeria: [
      "Realizar prueba de tuberculosis latente (PPD o IGRA) ANTES de iniciar tratamiento",
      "Monitorizar neutrófilos, plaquetas y transaminasas antes de cada infusión (criterios de suspensión según valores)",
      "Infusión IV en 60 min. NO administrar en bolo. Vigilar reacciones infusionales",
      "Monitorizar perfil lipídico a las 4-8 semanas y luego cada 6 meses",
      "Vigilar signos de perforación GI: dolor abdominal agudo, fiebre (especialmente si diverticulosis conocida)",
      "IL-6 es reactante de fase aguda: los marcadores de infección (PCR, fiebre) pueden estar suprimidos — estar alerta a infecciones subclínicas"
    ],
    farmacocinetica: {
      absorcion: "SC: biodisponibilidad 80%. IV: 100%",
      distribucion: "Vd: 6.4 L",
      metabolismo: "Catabolismo proteico no lineal (saturación del receptor)",
      excrecion: "No significativa por vía renal/hepática",
      vidaMedia: "Concentración-dependiente: 11-13 días (8 mg/kg IV)",
      inicioAccion: "Días (PCR disminuye en 24-48h)",
      picoAccion: "IV: fin de infusión. SC: 2.8 días",
      duracionAccion: "2-4 semanas"
    },
    almacenamiento: "Refrigerar 2-8°C. No congelar. SC: sacar 30 min antes de inyectar para atemperar.",
    unidadId: "u08",
    capituloId: "c08_04",
    searchText: ""
  },

  {
    id: "ixekizumab",
    nombre: "Ixekizumab",
    nombreGenerico: "Ixekizumab",
    nombresComerciales: ["Taltz"],
    familia: "Anticuerpos monoclonales inmunosupresores",
    clasificacion: "Anticuerpo monoclonal anti-IL-17A (interleucina-17A)",
    mecanismoAccion: "Anticuerpo monoclonal IgG4 humanizado que se une selectivamente y con alta afinidad a la interleucina-17A (IL-17A), tanto libre como unida al receptor IL-17RA. La IL-17A es una citocina proinflamatoria clave en la patogénesis de la psoriasis y la espondiloartritis, que promueve la proliferación de queratinocitos, reclutamiento de neutrófilos y producción de mediadores inflamatorios.",
    indicaciones: [
      "Psoriasis en placas moderada a severa",
      "Artritis psoriásica activa",
      "Espondilitis anquilosante activa (espondiloartritis axial)",
      "Espondiloartritis axial no radiográfica"
    ],
    contraindicaciones: [
      "Hipersensibilidad a ixekizumab",
      "Infección activa clínicamente significativa (tuberculosis, sepsis)",
      "Enfermedad inflamatoria intestinal activa (puede exacerbar)"
    ],
    efectosAdversos: [
      "Reacciones en sitio de inyección (17%): eritema, dolor, inflamación",
      "Infecciones respiratorias superiores",
      "Náuseas",
      "Candidiasis mucocutánea (oral, esofágica, vulvovaginal)",
      "Neutropenia",
      "Dolor orofaríngeo",
      "Conjuntivitis",
      "Exacerbación de enfermedad inflamatoria intestinal"
    ],
    interacciones: [
      "Vacunas vivas: evitar durante tratamiento",
      "Inmunosupresores: mayor riesgo de infecciones si se combinan",
      "Sustratos de CYP450: al resolver inflamación, los niveles de CYP pueden normalizarse (ajustar dosis de sustratos con índice terapéutico estrecho)"
    ],
    viaAdministracion: ["SC"],
    dosis: {
      adulto: "Psoriasis: 160 mg (2x80 mg) en semana 0, luego 80 mg semanas 2, 4, 6, 8, 10, 12, luego 80 mg cada 4 semanas. Artritis psoriásica: 160 mg semana 0, luego 80 mg cada 4 semanas (si psoriasis coexistente: seguir esquema de psoriasis). Espondilitis: 80 mg cada 4 semanas",
      pediatrico: "Psoriasis ≥6 años: según peso — 25-50 kg: 40 mg cada 4 semanas (tras carga). >50 kg: dosis adulto",
      geriatrico: "No requiere ajuste",
      ajusteRenal: "No requiere ajuste",
      ajusteHepatico: "No estudiado, pero no se espera necesidad de ajuste (anticuerpo monoclonal)"
    },
    presentaciones: [
      "Solución SC en jeringa precargada 80 mg/mL",
      "Solución SC en autoinyector (Taltz Sensoready) 80 mg/mL"
    ],
    embarazo: "C",
    lactancia: "Se desconoce excreción en leche humana. Evaluar riesgo-beneficio.",
    cuidadosEnfermeria: [
      "Realizar prueba de TB latente antes de iniciar tratamiento (PPD o IGRA)",
      "Dejar atemperar la jeringa/autoinyector 30 min a TA antes de inyectar",
      "Rotar sitios de inyección: abdomen, muslo, brazo (no en piel psoriásica activa)",
      "Educar sobre candidiasis: reportar placas blancas orales, síntomas vaginales",
      "Vigilar signos de enfermedad inflamatoria intestinal: diarrea crónica, dolor abdominal, sangre en heces",
      "Monitorizar hemograma si neutropenia previa o riesgo"
    ],
    farmacocinetica: {
      absorcion: "SC: biodisponibilidad 54-90%",
      distribucion: "Vd: 7.11 L",
      metabolismo: "Catabolismo proteico (como IgG4)",
      excrecion: "No significativa por vía renal/hepática",
      vidaMedia: "13 días",
      inicioAccion: "1-2 semanas (mejoría clínica visible)",
      picoAccion: "SC: 4 días",
      duracionAccion: "4 semanas (dosificación mensual en mantenimiento)"
    },
    almacenamiento: "Refrigerar 2-8°C. No congelar. Proteger de la luz. Puede mantenerse hasta 5 días a TA (≤30°C).",
    unidadId: "u08",
    capituloId: "c08_04",
    searchText: ""
  },

  // ===================== Hospitalarios — Anestésicos (c12_01, u12) =====================
  {
    id: "tiopental",
    nombre: "Tiopental",
    nombreGenerico: "Tiopental sódico",
    nombresComerciales: ["Pentothal", "Thiopental Inresa"],
    familia: "Barbitúricos anestésicos",
    clasificacion: "Barbitúrico de acción ultracorta (anestésico general intravenoso)",
    mecanismoAccion: "Agonista del receptor GABA-A: prolonga la apertura del canal de cloro y a dosis anestésicas activa directamente el canal sin necesidad de GABA (acción GABAmimética directa). Deprime el sistema reticular activador ascendente, produciendo inconsciencia rápida. Reduce la presión intracraneal (PIC), la tasa metabólica cerebral de oxígeno (CMRO2) y el flujo sanguíneo cerebral.",
    indicaciones: [
      "Inducción anestésica intravenosa",
      "Status epiléptico refractario (tercer escalón terapéutico)",
      "Reducción de presión intracraneal (neuroprotección en TCE grave)",
      "Sedación en neurocirugía (coma barbitúrico)"
    ],
    contraindicaciones: [
      "Porfiria aguda intermitente (contraindicación absoluta: puede desencadenar crisis fatal)",
      "Status asmático (broncoespasmo por liberación de histamina)",
      "Hipersensibilidad a barbitúricos",
      "Shock hipovolémico o inestabilidad hemodinámica severa"
    ],
    efectosAdversos: [
      "Depresión respiratoria y apnea (dosis-dependiente)",
      "Hipotensión (vasodilatación y depresión miocárdica)",
      "Laringoespasmo y broncoespasmo",
      "Dolor e irritación venosa en sitio de inyección",
      "Necrosis tisular si extravasación (pH 10.5, muy alcalino)",
      "Depresión cardiovascular en pacientes hipovolémicos",
      "Hipo",
      "Mioclonías"
    ],
    interacciones: [
      "Otros depresores SNC (opioides, benzodiazepinas): depresión respiratoria sinérgica",
      "Etanol: potenciación severa de efectos depresores",
      "Probenecid: prolonga efecto (inhibe metabolismo)",
      "Succinilcolina: arritmias (si se administra en misma línea IV — pH incompatible)"
    ],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "Inducción anestésica: 3-5 mg/kg IV en 20-30 seg (dosis test de 25-75 mg). Status epiléptico refractario: bolo 2-5 mg/kg, seguido de infusión 3-5 mg/kg/h (titular con EEG). Reducción PIC: 1.5-3 mg/kg bolo",
      pediatrico: "Inducción: 5-6 mg/kg IV. Neonatos: 3-4 mg/kg",
      geriatrico: "Reducir dosis 30-40%. Mayor sensibilidad hemodinámica",
      ajusteRenal: "Precaución: aumenta fracción libre en hipoalbuminemia urémica",
      ajusteHepatico: "Reducir dosis: metabolismo hepático reducido prolonga efecto"
    },
    presentaciones: [
      "Polvo liofilizado para inyección IV 500 mg, 1 g",
      "Reconstituir con agua estéril o SF a concentración de 25 mg/mL (2.5%)"
    ],
    embarazo: "C",
    lactancia: "Se excreta en leche en cantidades mínimas. Uso puntual (inducción): compatible.",
    cuidadosEnfermeria: [
      "SOLO administrar por vía IV — la inyección intraarterial accidental causa gangrena (vasoespasmo y cristalización)",
      "Reconstituir a 2.5% (25 mg/mL) con agua estéril. Verificar vía IV permeable antes de administrar",
      "Tener equipo de intubación y ventilación preparado ANTES de administrar (apnea frecuente)",
      "Monitorización continua: ECG, pulsioximetría, capnografía, PA invasiva si coma barbitúrico",
      "Extravasación: detener infusión inmediatamente, infiltrar zona con procaína 1% o hialuronidasa",
      "NUNCA mezclar con soluciones ácidas (pH 10.5): precipita con succinilcolina, vecuronio, atracurio"
    ],
    farmacocinetica: {
      absorcion: "IV: inmediato (100%)",
      distribucion: "Vd: 1.4 L/kg. Altamente lipofílico. Unión proteica 72-86%. Cruza BHE en 30 seg",
      metabolismo: "Hepático: oxidación por CYP2C19 y CYP2C9 (eliminación lenta: acumulación con infusiones prolongadas)",
      excrecion: "Renal (<1% inalterado). Metabolitos inactivos",
      vidaMedia: "Redistribución: 5-9 min (fin efecto clínico). Terminal: 3-12 h (acumulación)",
      inicioAccion: "10-20 segundos (un tiempo circulación brazo-cerebro)",
      picoAccion: "30-60 seg",
      duracionAccion: "Bolo único: 5-10 min (por redistribución, no por metabolismo)"
    },
    almacenamiento: "Polvo: temperatura ambiente. Reconstituido (2.5%): usar dentro de 24h a TA o refrigerado. Descartar si precipita.",
    unidadId: "u12",
    capituloId: "c12_01",
    searchText: ""
  }
];

// ============================================================
// Add drugs and update categories
// ============================================================

let addedCount = 0;
let skippedCount = 0;
const addedNames = [];
const skippedNames = [];

for (const drug of newDrugs) {
  if (existingIds.has(drug.id)) {
    skippedCount++;
    skippedNames.push(drug.id);
    continue;
  }

  // Generate searchText
  drug.searchText = mkSearch(drug);

  drugs.push(drug);
  existingIds.add(drug.id);
  addedCount++;
  addedNames.push(drug.id);

  // Add to categories
  let found = false;
  for (const unidad of cats.unidades) {
    for (const cap of unidad.capitulos) {
      if (cap.id === drug.capituloId) {
        if (!cap.drugIds.includes(drug.id)) {
          cap.drugIds.push(drug.id);
        }
        found = true;
        break;
      }
    }
    if (found) break;
  }

  if (!found) {
    console.warn(`WARNING: Chapter ${drug.capituloId} not found for drug ${drug.id}`);
  }
}

// Save files
fs.writeFileSync(drugsPath, JSON.stringify(drugs, null, 2), 'utf8');
fs.writeFileSync(catsPath, JSON.stringify(cats, null, 2), 'utf8');

console.log('=== Drug Addition Summary ===');
console.log(`Total drugs in database: ${drugs.length}`);
console.log(`Added: ${addedCount} new drugs`);
console.log(`Skipped: ${skippedCount} (already exist)`);
if (addedCount > 0) {
  console.log('\nAdded drugs:');
  addedNames.forEach(n => console.log(`  + ${n}`));
}
if (skippedCount > 0) {
  console.log('\nSkipped (already exist):');
  skippedNames.forEach(n => console.log(`  - ${n}`));
}
console.log('\nFiles saved successfully.');
