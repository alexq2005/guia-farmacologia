const drugs = require('../src/data/drugs.json');
const ids = new Set(drugs.map(d => d.id));

function exists(name) {
  const normalized = name.toLowerCase().replace(/[_]/g, ' ');
  return ids.has(name) || ids.has(name.replace(/ /g, '_')) ||
    drugs.some(d =>
      d.nombreGenerico.toLowerCase().includes(normalized) ||
      d.nombre.toLowerCase().includes(normalized) ||
      d.id.includes(name.replace(/ /g, '_'))
    );
}

const extendedDrugs = [
  // Cardiovascular adicionales
  'barnidipino', 'manidipino', 'nitrendipino', 'lacidipino',
  'celiprolol', 'acebutolol',
  'fosinopril', 'benazepril', 'cilazapril', 'trandolapril',
  'eprosartan', 'azilsartan',
  'hidralazina', 'nitroprusiato',
  'ranolazina', 'trimetazidina',
  'bosentan', 'ambrisentan', 'macitentan',
  'sacubitril_valsartan',
  // Antiinfecciosos adicionales
  'cefadroxilo', 'cefalexina', 'cefaclor', 'cefixima', 'cefpodoxima', 'cefditoren',
  'aztreonam', 'fosfomicina',
  'nitrofurantoina', 'norfloxacino',
  'fidaxomicina', 'tedizolid',
  'caspofungina', 'micafungina', 'anidulafungina',
  'voriconazol', 'posaconazol', 'isavuconazol',
  'oseltamivir', 'zanamivir', 'baloxavir',
  'entecavir', 'tenofovir', 'sofosbuvir',
  'bedaquilina', 'delamanid', 'pretomanid',
  // SNC adicionales
  'brivaracetam', 'perampanel', 'lacosamida', 'eslicarbazepina',
  'clobazam', 'estiripentol', 'rufinamida', 'vigabatrina',
  'pimozida', 'sulpirida', 'tiapride', 'asenapina', 'cariprazina', 'brexpiprazol',
  'agomelatina', 'vortioxetina', 'esketamina',
  'donepezilo', 'rivastigmina', 'galantamina', 'memantina',
  'sumatriptan', 'rizatriptan', 'zolmitriptan', 'eletriptan',
  'erenumab', 'fremanezumab', 'galcanezumab',
  'baclofeno', 'tizanidina', 'dantroleno',
  // Digestivo adicionales
  'sucralfato', 'misoprostol', 'bismuto',
  'alverino', 'mebeverina', 'otilonio', 'pinaverio',
  'prucaloprida', 'linaclotida', 'lubiprostone',
  'vedolizumab', 'ustekinumab',
  'pancreatina', 'pancrealipasa',
  'ursodeoxicolico',
  // Endocrino adicionales
  'desmopresina', 'octreotida', 'lanreotida', 'pegvisomant',
  'bromocriptina', 'cabergolina',
  'fludrocortisona',
  'calcitriol', 'alfacalcidol', 'colecalciferol', 'calcifediol',
  'teriparatida', 'denosumab', 'romosozumab',
  'cinacalcet', 'etelcalcetida',
  'somatropina', 'mecasermina',
  // Respiratorio adicionales
  'umeclidinio', 'glicopirronio', 'aclidinio',
  'vilanterol', 'olodaterol',
  'roflumilast', 'mepolizumab', 'benralizumab', 'dupilumab',
  'pirfenidona', 'nintedanib',
  'alfa_dornasa',
  'cromoglicato', 'nedocromil',
  // Urología
  'alfuzosina', 'terazosina', 'solifenacina', 'mirabegron',
  'oxibutinina', 'tolterodina', 'fesoterodina', 'dutasterida',
  'citrato_potasico',
  // Oftalmología
  'latanoprost', 'timolol_oftal', 'brimonidina', 'dorzolamida',
  'tropicamida', 'ciclopentolato', 'atropina_oftal',
  'tobramicina_oftal', 'moxifloxacino_oftal',
  'ranibizumab', 'aflibercept', 'bevacizumab_oftal',
  // Oncología soporte
  'filgrastim', 'pegfilgrastim', 'darbepoetin',
  'palonosetron', 'aprepitant', 'netupitant',
  'zoledronato', 'pamidronato',
  'leucovorin', 'mesna', 'amifostina',
  // Psiquiatría adicionales
  'naltrexona', 'acamprosato', 'disulfiram',
  'vareniclina',
  'lisdexanfetamina',
];

let missing = 0;
const missingList = [];
for (const name of extendedDrugs) {
  if (exists(name)) continue;
  missing++;
  missingList.push(name);
}

console.log('Missing from extended list:', missing + '/' + extendedDrugs.length);
console.log('\nMissing drugs:');
missingList.forEach(d => console.log('  - ' + d));
