const fs = require('fs');
const path = require('path');
const drugsPath = path.join(__dirname, '..', 'src', 'data', 'drugs.json');
const drugs = JSON.parse(fs.readFileSync(drugsPath, 'utf8'));

const overdoseData = {
  // Opioides
  morfina: {
    descripcion: "Opioide potente con estrecho margen terapéutico. Sobredosis potencialmente letal.",
    efectos: ["Depresión respiratoria (FR <8 rpm)", "Miosis puntiforme", "Hipotensión severa", "Bradicardia", "Coma", "Edema pulmonar no cardiogénico"],
    manejo: "Antídoto: Naloxona 0.4-2 mg IV cada 2-3 min (máx 10 mg). Soporte ventilatorio. Monitorización mínimo 4h post-naloxona.",
    alerta: "La naloxona tiene vida media más corta que la morfina: vigilar resedación"
  },
  fentanilo: {
    descripcion: "Opioide sintético 100x más potente que la morfina. Riesgo extremo de depresión respiratoria.",
    efectos: ["Depresión respiratoria rápida y profunda", "Rigidez torácica (tronco de madera)", "Bradicardia severa", "Apnea", "Coma"],
    manejo: "Antídoto: Naloxona 0.4-2 mg IV, puede requerir dosis mayores y repetidas. Ventilación asistida. Observación prolongada (parches: ≥24h).",
    alerta: "Los parches transdérmicos liberan fentanilo durante horas post-retirada: vigilancia prolongada obligatoria"
  },
  tramadol: {
    descripcion: "Opioide atípico con actividad serotoninérgica adicional. Riesgo de convulsiones en sobredosis.",
    efectos: ["Convulsiones (incluso a dosis terapéuticas altas)", "Depresión respiratoria", "Síndrome serotoninérgico", "Taquicardia", "Náuseas/vómitos", "Miosis"],
    manejo: "Naloxona para depresión respiratoria (puede aumentar riesgo convulsivo). Benzodiacepinas para convulsiones. NO usar en pacientes con umbral convulsivo bajo.",
    alerta: "Máximo 400 mg/día. Las convulsiones pueden ocurrir con dosis terapéuticas"
  },
  metadona: {
    descripcion: "Opioide de vida media prolongada e impredecible. Alto riesgo de acumulación.",
    efectos: ["Depresión respiratoria retardada (hasta 72h)", "Prolongación QTc → Torsade de Pointes", "Sedación progresiva", "Hipotensión", "Edema pulmonar"],
    manejo: "Naloxona en infusión continua (vida media de metadona >>naloxona). ECG seriados. Monitorización mínimo 72h.",
    alerta: "La acumulación es insidiosa: la depresión respiratoria puede aparecer días después del inicio"
  },
  // Anticoagulantes
  heparina_sodica: {
    descripcion: "Anticoagulante con estrecho margen terapéutico. Sobredosis causa hemorragia grave.",
    efectos: ["Hemorragia activa (cualquier localización)", "Hematomas extensos", "Hemorragia intracraneal", "Trombocitopenia inducida por heparina (TIH)"],
    manejo: "Antídoto: Protamina 1 mg por cada 100 UI de heparina administrada en la última hora. Infundir lento (máx 50 mg en 10 min). Controlar TTPa.",
    alerta: "La protamina puede causar hipotensión, bradicardia y anafilaxia. Administrar lentamente"
  },
  warfarina: {
    descripcion: "Anticoagulante oral con inicio lento y efecto prolongado. Múltiples interacciones.",
    efectos: ["Hemorragia (GI, intracraneal, genitourinaria)", "Hematuria", "Equimosis extensas", "Hematemesis", "INR >4-5"],
    manejo: "INR 4.5-10 sin sangrado: suspender y vitamina K 1-2.5 mg VO. Sangrado activo: Vitamina K 10 mg IV + CCP (complejo protrombínico) o PFC.",
    alerta: "El efecto de la warfarina persiste 3-5 días tras suspender. La vitamina K tarda 6-24h en actuar"
  },
  acenocumarol: {
    descripcion: "Anticoagulante oral antagonista de vitamina K, similar a warfarina pero con vida media más corta.",
    efectos: ["Hemorragia activa", "INR supraterapéutico", "Hematomas espontáneos", "Hemorragia intracraneal"],
    manejo: "Similar a warfarina: Vitamina K + CCP si sangrado grave. INR elevado sin sangrado: suspender, vitamina K oral 1-5 mg.",
    alerta: "Vida media más corta que warfarina (8-11h vs 36-42h): se estabiliza más rápido pero también se descontrola más fácilmente"
  },
  // Cardiotónicos
  digoxina: {
    descripcion: "Glucósido cardíaco con margen terapéutico extremadamente estrecho (0.5-2 ng/mL).",
    efectos: ["Arritmias (cualquier tipo, especialmente bigeminismo ventricular)", "Bloqueo AV", "Náuseas/vómitos", "Visión amarilla (xantopsia)", "Confusión", "Hiperpotasemia"],
    manejo: "Antídoto: Anticuerpos antidigoxina (Digibind/DigiFab). Corrección de hipopotasemia (potencia toxicidad). Atropina para bradicardia. NO cardiovertir (riesgo FV).",
    alerta: "La hipopotasemia, hipomagnesemia e hipercalcemia potencian la toxicidad digitálica. Controlar electrolitos siempre"
  },
  // Psiquiátricos
  litio: {
    descripcion: "Estabilizador del ánimo con margen terapéutico muy estrecho (0.6-1.2 mEq/L).",
    efectos: ["Temblor grueso", "Ataxia", "Disartria", "Hiperreflexia", "Convulsiones", "Insuficiencia renal aguda", "Coma", "Arritmias"],
    manejo: "Niveles >1.5 mEq/L: fluidoterapia agresiva con SSF. Niveles >2.5 mEq/L o síntomas severos: hemodiálisis. No hay antídoto específico.",
    alerta: "La deshidratación, AINEs, IECAs y diuréticos tiazídicos aumentan los niveles de litio. Litemia cada 6 meses mínimo"
  },
  // Insulinas
  insulina_regular: {
    descripcion: "Hipoglucemia es el principal riesgo. Puede ser fatal si no se detecta a tiempo.",
    efectos: ["Hipoglucemia severa (<54 mg/dL)", "Diaforesis", "Temblor", "Taquicardia", "Confusión", "Convulsiones", "Coma hipoglucémico", "Muerte"],
    manejo: "Consciente: glucosa oral 15-20g, repetir en 15 min. Inconsciente: Glucagón 1 mg IM/SC o Dextrosa 50% 25-50 mL IV. Monitorizar glucemia cada 15 min.",
    alerta: "NUNCA confundir unidades de insulina con mL. Una jeringa de insulina U-100 tiene 100 UI/mL. Error de 10x es frecuente y potencialmente letal"
  },
  insulina_glargina: {
    descripcion: "Insulina basal de acción prolongada. Hipoglucemia sostenida si sobredosis.",
    efectos: ["Hipoglucemia prolongada (hasta 24h)", "Diaforesis", "Confusión", "Convulsiones", "Coma"],
    manejo: "Infusión continua de dextrosa (la hipoglucemia puede recurrir durante 24h). Monitorización de glucemia horaria. Ingreso hospitalario obligatorio.",
    alerta: "Por su larga duración, una sobredosis de glargina puede causar hipoglucemia recurrente durante más de 24h"
  },
  // Aminoglucósidos
  gentamicina: {
    descripcion: "Aminoglucósido con nefrotoxicidad y ototoxicidad dosis-dependiente acumulativa.",
    efectos: ["Nefrotoxicidad (aumento creatinina)", "Ototoxicidad vestibular (vértigo, nistagmo)", "Ototoxicidad coclear (hipoacusia, tinnitus)", "Bloqueo neuromuscular"],
    manejo: "Monitorizar niveles séricos (pico y valle). Suspender si creatinina aumenta >0.5 mg/dL del basal. Hemodiálisis en intoxicación severa.",
    alerta: "La ototoxicidad puede ser IRREVERSIBLE. Monitorizar niveles valle (<2 mcg/mL) y ajustar intervalo según función renal"
  },
  amikacina: {
    descripcion: "Aminoglucósido con mayor potencial ototóxico que gentamicina.",
    efectos: ["Nefrotoxicidad", "Ototoxicidad coclear (pérdida auditiva frecuencias altas)", "Ototoxicidad vestibular", "Bloqueo neuromuscular"],
    manejo: "Monitorizar niveles séricos (valle <5 mcg/mL). Ajustar dosis según creatinina. Hemodiálisis si necesario.",
    alerta: "Mayor riesgo ototóxico que gentamicina. Audiometría basal y periódica en tratamientos prolongados"
  },
  // Metotrexato
  metotrexato: {
    descripcion: "Antimetabolito con toxicidad severa en sobredosis o acumulación renal.",
    efectos: ["Pancitopenia (nadir 7-14 días)", "Mucositis severa", "Insuficiencia renal aguda", "Hepatotoxicidad", "Neumonitis"],
    manejo: "Antídoto: Ácido folínico (Leucovorín) 15 mg/m² cada 6h hasta niveles MTX <0.05 µmol/L. Hiperhidratación alcalina. Glucarpidasa si insuficiencia renal.",
    alerta: "Error frecuente: confusión entre dosis SEMANAL (artritis) y DIARIA. Administración diaria de dosis semanal es potencialmente letal"
  },
  // Paracetamol
  paracetamol: {
    descripcion: "Hepatotóxico en sobredosis (>150 mg/kg o >7.5 g en adulto). Ventana de tratamiento limitada.",
    efectos: ["Necrosis hepática (24-72h post-ingesta)", "Insuficiencia hepática fulminante", "Coagulopatía", "Encefalopatía hepática", "Fallo multiorgánico"],
    manejo: "Antídoto: N-Acetilcisteína (NAC). Protocolo 21h IV: 150 mg/kg en 1h, luego 50 mg/kg en 4h, luego 100 mg/kg en 16h. Eficaz si se inicia antes de 8h post-ingesta.",
    alerta: "Los síntomas iniciales son inespecíficos (náuseas). La hepatotoxicidad se manifiesta a las 24-72h cuando ya puede ser irreversible. Carbón activado si <2h"
  },
  // Benzodiacepinas
  midazolam: {
    descripcion: "Benzodiacepina de acción corta. Riesgo de depresión respiratoria especialmente combinado con opioides.",
    efectos: ["Sedación excesiva", "Depresión respiratoria", "Hipotensión", "Amnesia anterógrada", "Apnea (IV rápido)"],
    manejo: "Antídoto: Flumazenilo 0.2 mg IV cada 60 seg (máx 3-5 mg). Soporte ventilatorio.",
    alerta: "Flumazenilo puede precipitar convulsiones en dependientes de benzodiacepinas o en intoxicación mixta con proconvulsivantes"
  },
  diazepam: {
    descripcion: "Benzodiacepina de acción prolongada. Acumulación en uso crónico.",
    efectos: ["Somnolencia excesiva", "Depresión respiratoria", "Hipotensión", "Ataxia", "Coma (en intoxicación mixta)"],
    manejo: "Flumazenilo 0.2 mg IV cada 60 seg. Observación prolongada (metabolitos activos de larga duración).",
    alerta: "El desmetildiazepam (metabolito activo) tiene vida media de 30-200h. No suspender bruscamente tras uso crónico (riesgo convulsiones)"
  },
};

let updated = 0;
for (const drug of drugs) {
  if (overdoseData[drug.id] && !drug.riesgosSobremedicacion) {
    drug.riesgosSobremedicacion = overdoseData[drug.id];
    updated++;
    console.log("ADD riesgo:", drug.nombre);
  }
}

fs.writeFileSync(drugsPath, JSON.stringify(drugs, null, 2), 'utf8');
console.log(`\nDone: ${updated} drugs updated with riesgosSobremedicacion`);