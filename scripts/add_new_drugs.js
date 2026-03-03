const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const drugsPath = path.join(DATA_DIR, 'drugs.json');
const catsPath = path.join(DATA_DIR, 'categories.json');

function generateSearchText(drug) {
  const parts = [
    drug.nombre, drug.nombreGenerico,
    ...drug.nombresComerciales,
    drug.familia, drug.clasificacion,
    ...drug.indicaciones
  ].map(s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
  return parts.join(' ');
}

function loadNewDrugs() {
  const files = fs.readdirSync(path.join(__dirname, 'drug_batches'))
    .filter(f => f.endsWith('.json'))
    .sort();
  let allNew = [];
  for (const f of files) {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'drug_batches', f), 'utf8'));
    allNew = allNew.concat(data);
  }
  return allNew;
}

// Category updates: { chapterId: [drugIds to add] } and new chapters
const categoryUpdates = {
  addToChapter: {
    // Batch 1
    'c01_02': ['fentanilo'],
    'c01_03': ['ketamina'],
    'c01_04': ['carbamazepina', 'gabapentina', 'lorazepam', 'clonazepam', 'fenobarbital'],
    'c02_01': ['captopril', 'propranolol', 'verapamilo', 'metoprolol', 'nifedipino', 'metildopa'],
    'c02_02': ['digoxina'],
    'c02_03': ['nifedipino'],
    'c02_04': ['hidroclorotiazida', 'espironolactona'],
    'c03_01': ['ampicilina', 'ceftriaxona', 'cefalexina', 'piperacilina_tazobactam'],
    'c03_03': ['clindamicina', 'gentamicina', 'meropenem', 'linezolid', 'trimetoprima_sulfametoxazol'],
    'c03_04': ['fluconazol', 'aciclovir', 'oseltamivir', 'anfotericina_b', 'nistatina'],
    'c04_01': ['ipratropio'],
    'c04_02': ['beclometasona', 'montelukast'],
    'c05_01': ['ranitidina', 'pantoprazol'],
    'c05_03': ['loperamida', 'lactulosa', 'sucralfato'],
    'c06_01': ['insulina_nph', 'glibenclamida'],
    'c06_02': ['metimazol'],
    'c06_03': ['prednisona', 'hidrocortisona_sistemica', 'metilprednisolona'],
    'c07_01': ['misoprostol'],
    'c07_02': ['calcio_carbonato', 'acido_folico', 'sulfato_ferroso', 'alendronato'],
    'c08_01': ['diclofenaco', 'ketorolaco', 'naproxeno'],
    'c08_02': ['ciclobenzaprina', 'baclofeno'],
    'c09_01': ['sulfadiazina_plata'],
    'c10_01': ['aspirina', 'clopidogrel', 'rivaroxaban'],
    'c10_02': ['vitamina_k', 'hierro_parenteral'],
    'c11_01': ['carbon_activado'],
    'c11_02': ['vasopresina'],
    'c12_01': ['succinilcolina', 'rocuronio'],
    // Batch 2
    'c01_06': ['risperidona', 'quetiapina', 'olanzapina', 'aripiprazol'],
    // Batch 3
    'c01_02': ['codeina', 'oxicodona', 'buprenorfina'],
    'c01_04': ['levetiracetam', 'lamotrigina', 'topiramato', 'alprazolam'],
    'c01_05': ['biperideno'],
    'c01_07': ['duloxetina', 'venlafaxina', 'mirtazapina', 'escitalopram', 'trazodona'],
    'c02_01': ['carvedilol', 'clonidina', 'diltiazem'],
    'c02_03': ['nitroprusiato'],
    'c02_05': ['simvastatina'],
    'c03_02': ['levofloxacino'],
    'c03_03': ['doxiciclina', 'amikacina', 'nitrofurantoina', 'colistina'],
    'c04_01': ['aminofilina'],
    'c04_02': ['fluticasona'],
    'c04_03': ['dextrometorfano'],
    'c05_02': ['domperidona'],
    'c05_03': ['bismuto_subsalicilato', 'polietilenglicol'],
    'c06_01': ['insulina_glargina', 'sitagliptina', 'empagliflozina'],
    'c07_01': ['progesterona', 'ergometrina'],
    'c09_02': ['betametasona_topica'],
    'c10_01': ['dabigatran'],
    'c10_02': ['filgrastim', 'eritropoyetina'],
    'c11_01': ['dantroleno'],
    'c11_02': ['calcio_cloruro'],
    'c12_02': ['dexmedetomidina'],
    // Batch 4
    'c01_02': ['sumatriptan'],
    'c01_04': ['acido_valproico'],
    'c01_06': ['clozapina', 'clorpromazina'],
    'c01_07': ['litio', 'bupropion'],
    'c02_01': ['prazosina'],
    'c02_03': ['sildenafilo'],
    'c06_01': ['insulina_lispro'],
    'c06_04': ['calcitriol'],
    'c07_02': ['tiamina'],
    'c08_04': ['hidroxicloroquina', 'azatioprina'],
    'c11_02': ['potasio_cloruro', 'fenilefrina'],
    'c12_01': ['sugammadex', 'neostigmina']
  },
  newChapters: [
    { id: 'c01_06', nombre: 'Antipsicóticos', unidadId: 'u01', drugIds: ['haloperidol'] },
    { id: 'c01_07', nombre: 'Antidepresivos', unidadId: 'u01', drugIds: ['sertralina', 'fluoxetina', 'amitriptilina'] },
    { id: 'c02_05', nombre: 'Antilipémicos', unidadId: 'u02', drugIds: ['atorvastatina'] },
    { id: 'c03_05', nombre: 'Antituberculosos', unidadId: 'u03', drugIds: ['isoniazida', 'rifampicina'] },
    { id: 'c03_06', nombre: 'Antiparasitarios', unidadId: 'u03', drugIds: ['albendazol', 'ivermectina'] },
    { id: 'c04_03', nombre: 'Mucolíticos y Antitusivos', unidadId: 'u04', drugIds: ['acetilcisteina_mucolitico'] },
    { id: 'c06_04', nombre: 'Otros Endocrinos', unidadId: 'u06', drugIds: ['desmopresina'] },
    { id: 'c08_03', nombre: 'Antigotosos', unidadId: 'u08', drugIds: ['colchicina', 'alopurinol'] },
    { id: 'c08_04', nombre: 'Inmunosupresores', unidadId: 'u08', drugIds: ['metotrexato'] },
    { id: 'c09_03', nombre: 'Antifúngicos Tópicos', unidadId: 'u09', drugIds: ['clotrimazol_topico'] },
    { id: 'c09_04', nombre: 'Antiparasitarios Tópicos', unidadId: 'u09', drugIds: ['permetrina'] },
    { id: 'c12_03', nombre: 'Sedación en UCI', unidadId: 'u12', drugIds: ['remifentanilo', 'cisatracurio'] },
    { id: 'c04_04', nombre: 'Antihistamínicos', unidadId: 'u04', drugIds: ['loratadina', 'cetirizina', 'difenhidramina'] },
    { id: 'c07_03', nombre: 'Urológicos', unidadId: 'u07', drugIds: ['tamsulosina'] }
  ]
};

function run() {
  // Load existing
  const existingDrugs = JSON.parse(fs.readFileSync(drugsPath, 'utf8'));
  const categories = JSON.parse(fs.readFileSync(catsPath, 'utf8'));
  const existingIds = new Set(existingDrugs.map(d => d.id));

  // Load new drugs
  const newDrugs = loadNewDrugs();

  // Add searchText and merge
  let added = 0;
  for (const drug of newDrugs) {
    if (existingIds.has(drug.id)) {
      console.log(`  SKIP: ${drug.id} (already exists)`);
      continue;
    }
    drug.searchText = generateSearchText(drug);
    existingDrugs.push(drug);
    added++;
    console.log(`  ADD: ${drug.id} -> ${drug.nombre}`);
  }

  // Update categories - add drugs to existing chapters
  for (const [chapId, drugIds] of Object.entries(categoryUpdates.addToChapter)) {
    for (const unit of categories.unidades) {
      for (const chap of unit.capitulos) {
        if (chap.id === chapId) {
          for (const did of drugIds) {
            if (!chap.drugIds.includes(did)) {
              chap.drugIds.push(did);
            }
          }
        }
      }
    }
  }

  // Add new chapters
  for (const newChap of categoryUpdates.newChapters) {
    for (const unit of categories.unidades) {
      if (unit.id === newChap.unidadId) {
        const exists = unit.capitulos.some(c => c.id === newChap.id);
        if (!exists) {
          unit.capitulos.push(newChap);
          console.log(`  NEW CHAPTER: ${newChap.id} - ${newChap.nombre}`);
        }
      }
    }
  }

  // Write files
  fs.writeFileSync(drugsPath, JSON.stringify(existingDrugs, null, 2), 'utf8');
  fs.writeFileSync(catsPath, JSON.stringify(categories, null, 2), 'utf8');

  console.log(`\nDone! Added ${added} drugs. Total: ${existingDrugs.length}`);
}

run();
