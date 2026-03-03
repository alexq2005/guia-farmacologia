const fs = require('fs');
const path = require('path');
const drugs = require('../src/data/drugs.json');

// Add riesgosSobremedicacion to existing drugs
const risks = {
  'metoclopramida': {
    descripcion: 'El uso prolongado o dosis altas de metoclopramida causa efectos extrapiramidales graves y se ha asociado con deterioro cognitivo similar al Alzheimer (efecto "pro-Alzheimer").',
    efectos: [
      'Discinesia tardia IRREVERSIBLE (movimientos involuntarios de cara y lengua)',
      'Sindrome extrapiramidal: rigidez, temblor, acatisia',
      'Deterioro cognitivo progresivo con uso cronico (efecto pro-Alzheimer)',
      'Sindrome neuroleptico maligno (raro pero mortal)',
      'Hiperprolactinemia: galactorrea, amenorrea, ginecomastia',
      'Depression y ansiedad'
    ],
    manejo: 'Suspender inmediatamente. Difenhidramina IV para reacciones agudas. La discinesia tardia puede ser irreversible. Limite: no usar mas de 12 semanas.',
    alerta: 'La FDA limita el uso a maximo 12 semanas por riesgo de discinesia tardia irreversible.'
  },
  'omeprazol': {
    descripcion: 'El uso prolongado de IBP (>8 semanas sin indicacion clara) se asocia con multiples riesgos incluyendo deficit de nutrientes y mayor riesgo de infecciones.',
    efectos: [
      'Deficit de vitamina B12 y magnesio (uso >1 ano)',
      'Mayor riesgo de fracturas osteoporoticas (cadera, columna)',
      'Infecciones por Clostridioides difficile',
      'Nefritis intersticial aguda',
      'Demencia (asociacion epidemiologica con uso prolongado)',
      'Hipomagnesemia severa con arritmias',
      'Efecto rebote: hipersecrecion acida al suspender abruptamente'
    ],
    manejo: 'Reduccion gradual de dosis. Suplementar B12 y magnesio si uso prolongado. Reevaluar indicacion periodicamente.',
    alerta: 'Desprescribir si no hay indicacion clara. No usar como "protector gastrico" de rutina.'
  },
  'diazepam': {
    descripcion: 'Las benzodiacepinas de accion larga como diazepam causan dependencia rapida y deterioro cognitivo, especialmente en ancianos. Se asocian con mayor riesgo de caidas y demencia.',
    efectos: [
      'Dependencia fisica y psicologica (desde 2-4 semanas de uso continuo)',
      'Sindrome de abstinencia severo: convulsiones, psicosis, delirium',
      'Deterioro cognitivo y memoria con uso cronico',
      'Mayor riesgo de demencia en ancianos (uso >3 meses)',
      'Caidas y fracturas (especialmente ancianos)',
      'Depresion respiratoria (potenciada con opioides/alcohol)',
      'Somnolencia diurna residual (vida media larga: 20-100h)'
    ],
    manejo: 'Reduccion MUY gradual (10-25% cada 2-4 semanas). NUNCA suspender abruptamente. Antidoto: flumazenilo (precaucion en dependientes).',
    alerta: 'Criterios de Beers: EVITAR en mayores de 65 anos. Preferir alternativas no benzodiazepinicas.'
  },
  'morfina': {
    descripcion: 'Los opioides causan tolerancia, dependencia y riesgo de depresion respiratoria fatal. La epidemia de opioides es una crisis de salud publica.',
    efectos: [
      'Depresion respiratoria potencialmente mortal',
      'Tolerancia: necesidad de dosis crecientes',
      'Dependencia fisica: sindrome de abstinencia severo',
      'Adiccion (trastorno por uso de opioides)',
      'Estrenimiento cronico severo (tolerancia NO se desarrolla)',
      'Hiperalgesia inducida por opioides (el dolor empeora con uso cronico)',
      'Inmunosupresion',
      'Hipogonadismo y disfuncion sexual'
    ],
    manejo: 'Naloxona 0.4mg IV como antidoto. Reduccion gradual 10% semanal. Equipo multidisciplinario para deshabituacion.',
    alerta: 'Nunca combinar con benzodiacepinas sin supervision estrecha. Prescribir naloxona de rescate a pacientes con opioides cronicos.'
  },
  'warfarina': {
    descripcion: 'La sobredosis de warfarina causa hemorragias potencialmente mortales. El rango terapeutico es estrecho y multiples factores alteran su efecto.',
    efectos: [
      'Hemorragia mayor: GI, intracraneal, retroperitoneal',
      'Hematomas extensos',
      'Hematuria',
      'Necrosis cutanea por warfarina (raro, inicio de tratamiento)',
      'Sindrome del dedo azul (microembolias de colesterol)',
      'Hemorragia fetal/teratogenicidad (embarazo)'
    ],
    manejo: 'INR >5 sin sangrado: suspender warfarina, vitamina K oral 1-2.5mg. INR >9 o sangrado activo: vitamina K IV 5-10mg + plasma fresco o complejo protrombinico.',
    alerta: 'Alimentos ricos en vitamina K alteran efecto. Multiples interacciones farmacologicas. Monitorizar INR minimo mensual.'
  },
  'insulina-regular': {
    descripcion: 'La hipoglucemia por sobredosis de insulina puede causar dano cerebral permanente o muerte si no se trata rapidamente.',
    efectos: [
      'Hipoglucemia severa: confusion, convulsiones, coma',
      'Dano cerebral irreversible por neuroglucopenia prolongada',
      'Arritmias cardiacas por hipopotasemia secundaria',
      'Edema cerebral (correccion rapida de hiperglucemia)',
      'Lipodistrofia en sitios de inyeccion (uso cronico)',
      'Hipopotasemia (insulina desplaza K+ al intracelular)'
    ],
    manejo: 'Glucosa IV inmediata: dextrosa 50% 25-50ml. Si no hay acceso IV: glucagon 1mg IM. Monitorizar glucemia cada 15 min y K+ serico.',
    alerta: 'DOBLE VERIFICACION obligatoria. Nunca confundir unidades de insulina con ml. 1ml = 100 UI en concentracion estandar.'
  },
  'heparina-no-fraccionada': {
    descripcion: 'La sobredosis de heparina causa sangrado incontrolable. La trombocitopenia inducida por heparina (HIT) es una complicacion paradojica grave.',
    efectos: [
      'Hemorragia mayor en cualquier localizacion',
      'Trombocitopenia inducida por heparina (HIT) - paradojicamente causa trombosis',
      'Osteoporosis con uso prolongado',
      'Hiperpotasemia (supresion de aldosterona)',
      'Alopecia reversible',
      'Reacciones de hipersensibilidad'
    ],
    manejo: 'Protamina IV: 1mg neutraliza 100 UI de heparina (max 50mg). Administrar lento (riesgo de hipotension y anafilaxia).',
    alerta: 'Monitorizar plaquetas basales y cada 2-3 dias. Si plaquetas caen >50%: sospechar HIT, suspender TODA heparina.'
  },
  'amiodarona': {
    descripcion: 'La amiodarona tiene toxicidad multiorganica significativa con uso cronico. Su vida media extremadamente larga (40-55 dias) prolonga los efectos adversos.',
    efectos: [
      'Toxicidad pulmonar: neumonitis, fibrosis pulmonar (puede ser fatal)',
      'Disfuncion tiroidea: hipo o hipertiroidismo (contiene yodo)',
      'Hepatotoxicidad: desde elevacion de transaminasas hasta hepatitis fulminante',
      'Toxicidad ocular: microdepositoscorneales (casi 100%), neuropatia optica',
      'Neuropatia periferica',
      'Fotosensibilidad severa y coloracion gris-azulada de la piel',
      'Bradicardia y prolongacion del QT (proarritmia paradojica)'
    ],
    manejo: 'Reduccion de dosis o suspension gradual. Monitorizacion: funcion tiroidea y hepatica cada 3-6 meses, Rx torax anual, examen oftalmologico.',
    alerta: 'Los efectos adversos pueden persistir MESES despues de suspender por su vida media extremadamente larga.'
  }
};

// Map drug names to their IDs for matching
const nameToId = {
  'metoclopramida': 'Metoclopramida',
  'omeprazol': 'Omeprazol',
  'diazepam': 'Diazepam',
  'morfina': 'Morfina',
  'warfarina': 'Warfarina',
  'insulina-regular': 'Insulina Regular (Cristalina)',
  'heparina-no-fraccionada': 'Heparina No Fraccionada',
  'amiodarona': 'Amiodarona'
};

let updated = 0;
for (const [key, risk] of Object.entries(risks)) {
  const drugName = nameToId[key];
  const drug = drugs.find(d => d.nombre === drugName);
  if (drug) {
    drug.riesgosSobremedicacion = risk;
    updated++;
    console.log(`Added risks to: ${drug.nombre}`);
  } else {
    console.log(`NOT FOUND: ${drugName}`);
  }
}

console.log(`\nUpdated ${updated} drugs with overdose risks`);
fs.writeFileSync(path.join(__dirname, '../src/data/drugs.json'), JSON.stringify(drugs, null, 2));
console.log('drugs.json saved!');
