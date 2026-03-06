#!/usr/bin/env node
// Add final batch of clinically important drugs
const fs = require('fs');
const path = require('path');

const drugsPath = path.join(__dirname, '..', 'src', 'data', 'drugs.json');
const catsPath = path.join(__dirname, '..', 'src', 'data', 'categories.json');

const drugs = JSON.parse(fs.readFileSync(drugsPath, 'utf8'));
const cats = JSON.parse(fs.readFileSync(catsPath, 'utf8'));
const existingIds = new Set(drugs.map(d => d.id));

const newDrugs = [
  // === SACUBITRIL/VALSARTAN - Heart Failure cornerstone ===
  {
    id: "sacubitril_valsartan",
    nombre: "Sacubitril/Valsartán",
    nombreGenerico: "Sacubitril/Valsartán",
    nombresComerciales: ["Entresto"],
    familia: "Inhibidores de neprilisina y receptor de angiotensina (ARNI)",
    clasificacion: "ARNI (Angiotensin Receptor-Neprilysin Inhibitor)",
    mecanismoAccion: "Combinación de sacubitril (profármaco inhibidor de neprilisina) y valsartán (antagonista del receptor AT1). Sacubitril inhibe la neprilisina, aumentando los niveles de péptidos natriuréticos (ANP, BNP, CNP) que promueven vasodilatación, natriuresis y reducción de fibrosis cardíaca. Valsartán bloquea el SRAA. Efecto sinérgico en insuficiencia cardíaca.",
    indicaciones: ["Insuficiencia cardíaca crónica con FEVI reducida (HFrEF)", "Insuficiencia cardíaca con FEVI preservada (HFpEF) — evidencia emergente", "Sustituto de IECA/ARA-II en IC estable"],
    contraindicaciones: ["Uso concomitante con IECA (esperar 36h de lavado)", "Angioedema previo con IECA/ARA-II", "Insuficiencia hepática grave (Child-Pugh C)", "Embarazo", "Estenosis bilateral de arteria renal"],
    efectosAdversos: ["Hipotensión", "Hiperpotasemia", "Insuficiencia renal", "Tos", "Mareo", "Angioedema (raro, más frecuente en raza negra)"],
    interacciones: ["IECA: CONTRAINDICADO (riesgo angioedema) — lavado 36h", "Espironolactona, suplementos K+: hiperpotasemia", "Litio: aumenta niveles", "AINEs: reducen efecto y empeoran función renal", "Aliskirén: contraindicado en diabetes"],
    viaAdministracion: ["Oral"],
    dosis: {
      adulto: "Inicio: 24/26 mg o 49/51 mg c/12h (según IECA/ARA previo). Titular cada 2-4 semanas. Objetivo: 97/103 mg c/12h.",
      pediatrico: "No aprobado en <18 años",
      geriatrico: "Iniciar con dosis baja 24/26 mg c/12h. Titular lentamente.",
      ajusteRenal: "ClCr <30: iniciar 24/26 mg c/12h con precaución.",
      ajusteHepatico: "Child-Pugh B: iniciar 24/26 mg c/12h. Child-Pugh C: contraindicado."
    },
    presentaciones: ["Comprimido 24/26 mg", "Comprimido 49/51 mg", "Comprimido 97/103 mg"],
    embarazo: "X",
    lactancia: "No recomendado. Se desconoce excreción.",
    cuidadosEnfermeria: ["NUNCA administrar junto con IECA — esperar mínimo 36h de lavado", "Monitorizar TA antes de cada toma en titulación", "Control de K+ y creatinina a 1-2 semanas del inicio y tras cada cambio de dosis", "Educar: si aparece hinchazón facial/labios → suspender y urgencias", "Puede causar hipotensión sintomática — titular gradualmente", "Fármaco de primera línea en IC con FEVI reducida (guías ESC/AHA)"],
    unidadId: "u02",
    capituloId: "c02_03"
  },

  // === CEFTAZIDIMA-AVIBACTAM - MDR gram-negative ===
  {
    id: "ceftazidima_avibactam",
    nombre: "Ceftazidima/Avibactam",
    nombreGenerico: "Ceftazidima/Avibactam",
    nombresComerciales: ["Zavicefta", "Avycaz"],
    familia: "Cefalosporinas + inhibidor de betalactamasa",
    clasificacion: "Antibiótico betalactámico combinado",
    mecanismoAccion: "Ceftazidima (cefalosporina de 3ª generación) inhibe la síntesis de pared celular bacteriana. Avibactam es un inhibidor de betalactamasas no betalactámico (diazabiciclano) que protege a ceftazidima de la inactivación por betalactamasas clase A (KPC), clase C (AmpC) y algunas clase D (OXA-48). NO cubre metalobetalactamasas (NDM, VIM, IMP).",
    indicaciones: ["Infecciones por enterobacterias productoras de KPC", "Infecciones por P. aeruginosa multirresistente", "Infección urinaria complicada", "Infección intraabdominal complicada (con metronidazol)", "Neumonía nosocomial/asociada a ventilación mecánica"],
    contraindicaciones: ["Hipersensibilidad a cefalosporinas", "Alergia grave a penicilinas (reacción cruzada)"],
    efectosAdversos: ["Diarrea", "Náuseas y vómitos", "Prueba de Coombs positiva", "Candidiasis", "Elevación de transaminasas", "Rash", "Colitis por C. difficile"],
    interacciones: ["Probenecid: reduce eliminación renal", "Cloranfenicol: antagonismo potencial", "Anticoagulantes orales: monitorizar INR"],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "2 g/0.5 g IV c/8h en infusión de 2h. Duración: 5-14 días según infección.",
      pediatrico: "≥3 meses: 50/12.5 mg/kg c/8h (máx 2/0.5 g). Infusión 2h.",
      geriatrico: "Ajustar según función renal",
      ajusteRenal: "ClCr 31-50: 1/0.25 g c/8h. ClCr 16-30: 0.75/0.1875 g c/12h. ClCr ≤15 o HD: 0.75/0.1875 g c/24h.",
      ajusteHepatico: "No requiere ajuste"
    },
    presentaciones: ["Vial polvo 2 g/0.5 g para reconstitución"],
    embarazo: "B",
    lactancia: "Precaución. Ceftazidima se excreta en leche.",
    cuidadosEnfermeria: ["Infundir en 2 HORAS (no menos — optimiza farmacocinética)", "Reconstituir con 10 mL de agua estéril, luego diluir en SSF o SG5%", "Estable 12h a temperatura ambiente, 24h refrigerado tras reconstitución", "Reservar para infecciones por gérmenes MDR confirmados (antibiograma)", "Monitorizar función renal en tratamiento prolongado", "Vigilar aparición de diarrea (C. difficile)"],
    unidadId: "u03",
    capituloId: "c03_01"
  },

  // === MEROPENEM-VABORBACTAM - Carbapenem-resistant ===
  {
    id: "meropenem_vaborbactam",
    nombre: "Meropenem/Vaborbactam",
    nombreGenerico: "Meropenem/Vaborbactam",
    nombresComerciales: ["Vaborem"],
    familia: "Carbapenems + inhibidor de betalactamasa",
    clasificacion: "Antibiótico carbapenémico combinado",
    mecanismoAccion: "Meropenem inhibe la síntesis de pared celular (unión a PBPs). Vaborbactam es un inhibidor cíclico de ácido borónico de betalactamasas serina clase A (KPC) y clase C. Restaura la actividad de meropenem frente a enterobacterias productoras de KPC. NO activo contra metalobetalactamasas.",
    indicaciones: ["Infecciones por enterobacterias productoras de carbapenemasas tipo KPC", "Infección urinaria complicada (incluyendo pielonefritis)", "Infección intraabdominal complicada", "Neumonía nosocomial", "Bacteriemia"],
    contraindicaciones: ["Hipersensibilidad a carbapenems", "Alergia grave a betalactámicos"],
    efectosAdversos: ["Cefalea", "Diarrea", "Náuseas", "Flebitis en sitio de infusión", "Hipopotasemia", "Elevación de transaminasas"],
    interacciones: ["Ácido valproico: reduce niveles (puede precipitar convulsiones)", "Probenecid: aumenta niveles de meropenem"],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "2 g/2 g IV c/8h en infusión de 3h.",
      pediatrico: "No aprobado en <18 años",
      geriatrico: "Ajustar según función renal",
      ajusteRenal: "ClCr 30-49: 1/1 g c/8h. ClCr 15-29: 1/1 g c/12h. ClCr <15: 0.5/0.5 g c/12h.",
      ajusteHepatico: "No requiere ajuste"
    },
    presentaciones: ["Vial polvo 2 g/2 g para reconstitución"],
    embarazo: "B",
    lactancia: "Precaución. Meropenem se excreta en leche en pequeñas cantidades.",
    cuidadosEnfermeria: ["Infusión en 3 HORAS (farmacocinética optimizada)", "Reservar para KPC confirmada — antibiótico de último recurso", "NO combinar con valproato (reduce niveles, riesgo convulsiones)", "Reconstituir con SSF, luego diluir a 250 mL", "Monitorizar función renal y hepática", "Vigilar signos de superinfección fúngica"],
    unidadId: "u03",
    capituloId: "c03_03"
  },

  // === ATEZOLIZUMAB - Immunotherapy ===
  {
    id: "atezolizumab",
    nombre: "Atezolizumab",
    nombreGenerico: "Atezolizumab",
    nombresComerciales: ["Tecentriq"],
    familia: "Inmunoterapia antineoplásica",
    clasificacion: "Anticuerpo monoclonal anti-PD-L1",
    mecanismoAccion: "Anticuerpo monoclonal humanizado IgG1 que se une a PD-L1 (ligando de muerte programada 1) expresado en células tumorales y células inmunes del microambiente tumoral. Bloquea la interacción PD-L1/PD-1 y PD-L1/B7.1, restaurando la actividad antitumoral de linfocitos T. A diferencia de anti-PD-1, no interfiere con la señalización PD-L2/PD-1.",
    indicaciones: ["Cáncer de pulmón no microcítico (CPNM) avanzado", "Cáncer de pulmón microcítico en estadio extenso", "Carcinoma urotelial avanzado", "Cáncer de mama triple negativo (con nab-paclitaxel)", "Carcinoma hepatocelular (con bevacizumab)", "Melanoma (combinación)"],
    contraindicaciones: ["Hipersensibilidad a atezolizumab", "Enfermedades autoinmunes activas graves", "Trasplante de órgano sólido (riesgo rechazo)", "Inmunosupresión crónica"],
    efectosAdversos: ["Fatiga", "Náuseas", "Diarrea", "Rash", "Prurito", "Neumonitis inmunomediada", "Hepatitis autoinmune", "Colitis", "Endocrinopatías (hipotiroidismo, hipofiisitis, diabetes tipo 1)", "Nefritis", "Miocarditis (raro pero grave)"],
    interacciones: ["Corticoides sistémicos: pueden reducir eficacia (evitar >10 mg/día prednisona salvo toxicidad inmune)", "No interacciones farmacocinéticas significativas"],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "840 mg c/2 semanas, 1200 mg c/3 semanas, o 1680 mg c/4 semanas según indicación y esquema de combinación.",
      pediatrico: "No aprobado en pediatría",
      geriatrico: "No requiere ajuste por edad",
      ajusteRenal: "No requiere ajuste en IR leve-moderada",
      ajusteHepatico: "No requiere ajuste en IH leve. No estudiado en IH moderada-grave."
    },
    presentaciones: ["Vial 840 mg/14 mL", "Vial 1200 mg/20 mL"],
    embarazo: "X",
    lactancia: "Contraindicado. IgG se excreta en leche.",
    cuidadosEnfermeria: ["Primera infusión: 60 min. Si tolera bien: siguientes en 30 min", "Premedicar solo si reacción infusional previa", "Vigilar SIEMPRE toxicidad inmunomediada: disnea (neumonitis), ictericia (hepatitis), diarrea >4/día (colitis), endocrinopatía (fatiga, poliuria)", "Monitorizar TSH cada 4-6 semanas", "Hepatograma antes de cada ciclo", "Si toxicidad grado 3-4: suspender y corticoides IV 1-2 mg/kg", "Educar: reportar cualquier síntoma nuevo (los efectos inmunes pueden aparecer meses después)"],
    unidadId: "u12",
    capituloId: "c12_05"
  },

  // === ALECTINIB - ALK+ Lung Cancer ===
  {
    id: "alectinib",
    nombre: "Alectinib",
    nombreGenerico: "Alectinib",
    nombresComerciales: ["Alecensa"],
    familia: "Antineoplásicos dirigidos",
    clasificacion: "Inhibidor de tirosina quinasa ALK",
    mecanismoAccion: "Inhibidor altamente selectivo de la quinasa del linfoma anaplásico (ALK). Bloquea ALK y sus variantes de fusión oncogénicas (EML4-ALK), inhibiendo la señalización proliferativa en cáncer de pulmón ALK-positivo. Cruza la barrera hematoencefálica con buena penetración en SNC. Activo contra mutaciones de resistencia a crizotinib.",
    indicaciones: ["CPNM avanzado ALK-positivo (primera línea)", "CPNM ALK-positivo tras progresión a crizotinib", "Metástasis cerebrales de CPNM ALK-positivo"],
    contraindicaciones: ["Hipersensibilidad a alectinib", "Insuficiencia hepática grave"],
    efectosAdversos: ["Estreñimiento", "Edema", "Mialgia", "Elevación de CPK", "Elevación de bilirrubina", "Hepatotoxicidad", "Bradicardia", "Fotosensibilidad", "Neumonitis intersticial"],
    interacciones: ["Inhibidores potentes CYP3A4 no afectan significativamente (metabolismo menor por CYP)", "Bradicardizantes: efecto aditivo", "Fototóxicos: aumentan fotosensibilidad"],
    viaAdministracion: ["Oral"],
    dosis: {
      adulto: "600 mg c/12h con alimentos. Continuar hasta progresión o toxicidad inaceptable.",
      pediatrico: "No aprobado en pediatría",
      geriatrico: "No requiere ajuste por edad",
      ajusteRenal: "IR leve-moderada: no ajuste. IR grave: no estudiado.",
      ajusteHepatico: "IH grave (Child-Pugh C): no recomendado"
    },
    presentaciones: ["Cápsula 150 mg"],
    embarazo: "D",
    lactancia: "Contraindicado.",
    cuidadosEnfermeria: ["SIEMPRE con alimentos (aumenta biodisponibilidad 3 veces)", "Monitorizar CPK: si elevación grado 3 → suspender hasta grado 1", "Hepatograma quincenal los primeros 3 meses, luego mensual", "Control ECG periódico (bradicardia)", "Protección solar estricta (fotosensibilidad)", "Las cápsulas pueden abrirse y mezclar con alimento blando si disfagia", "Excelente penetración en SNC — efectivo en metástasis cerebrales"],
    unidadId: "u12",
    capituloId: "c12_05"
  },

  // === ICATIBANT - Hereditary Angioedema ===
  {
    id: "icatibant",
    nombre: "Icatibant",
    nombreGenerico: "Icatibant",
    nombresComerciales: ["Firazyr"],
    familia: "Antagonistas de bradicinina",
    clasificacion: "Antagonista selectivo del receptor B2 de bradicinina",
    mecanismoAccion: "Péptido sintético antagonista competitivo y selectivo del receptor B2 de bradicinina. En el angioedema hereditario tipo I y II, la deficiencia de C1-inhibidor provoca activación excesiva de calicreína y generación de bradicinina, causando edema. Icatibant bloquea la acción de la bradicinina en su receptor, resolviendo los ataques agudos.",
    indicaciones: ["Tratamiento de ataques agudos de angioedema hereditario (AEH) en adultos", "Angioedema por IECA (uso off-label)"],
    contraindicaciones: ["Hipersensibilidad a icatibant"],
    efectosAdversos: ["Reacción en sitio de inyección (97%): eritema, dolor, hinchazón", "Náuseas", "Cefalea", "Mareo", "Fiebre", "Elevación de transaminasas"],
    interacciones: ["IECA: efecto teóricamente antagónico (ambos afectan vía bradicinina)", "No interacciones CYP significativas"],
    viaAdministracion: ["SC"],
    dosis: {
      adulto: "30 mg SC (jeringa precargada). Puede repetirse c/6h si síntomas persisten. Máximo 3 dosis en 24h.",
      pediatrico: "≥2 años y ≥12 kg: aprobado con dosis ajustada por peso. 12-25 kg: 10 mg. 26-40 kg: 15 mg. 41-50 kg: 20 mg. 51-65 kg: 25 mg. >65 kg: 30 mg.",
      geriatrico: "No requiere ajuste",
      ajusteRenal: "No requiere ajuste",
      ajusteHepatico: "No requiere ajuste"
    },
    presentaciones: ["Jeringa precargada 30 mg/3 mL"],
    embarazo: "C",
    lactancia: "Evitar. Datos insuficientes.",
    cuidadosEnfermeria: ["Administración SC en abdomen (zona periumbilical)", "Pacientes pueden autoadministrarse tras entrenamiento", "El alivio comienza en 30-60 min (más rápido que C1-INH concentrado)", "Reacción local casi universal — advertir al paciente", "Vigilar edema laríngeo: si compromiso de vía aérea → UCI", "Conservar a temperatura ambiente (no refrigerar)", "En angioedema por IECA: suspender el IECA definitivamente"],
    unidadId: "u11",
    capituloId: "c11_01"
  }
];

let added = 0;
for (const drug of newDrugs) {
  if (existingIds.has(drug.id)) {
    console.log(`SKIP: ${drug.id} already exists`);
    continue;
  }
  drugs.push(drug);
  existingIds.add(drug.id);
  added++;

  for (const u of cats.unidades) {
    for (const c of u.capitulos) {
      if (c.id === drug.capituloId && !c.drugIds.includes(drug.id)) {
        c.drugIds.push(drug.id);
      }
    }
  }
}

fs.writeFileSync(drugsPath, JSON.stringify(drugs, null, 2), 'utf8');
fs.writeFileSync(catsPath, JSON.stringify(cats, null, 2), 'utf8');
console.log(`Added ${added} new drugs. Total: ${drugs.length}`);
