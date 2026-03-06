const fs = require('fs');
const path = require('path');
const drugs = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'drugs.json'), 'utf8'));
const all = drugs.map(d => (d.nombre + ' ' + d.nombreGenerico + ' ' + (d.nombresComerciales || []).join(' ')).toLowerCase());

const check = [
  ['agua esteril', 'Agua estéril inyección'],
  ['suero glucosalino', 'Glucosalino'],
  ['povidona yodada', 'Betadine'],
  ['clorhexidina', 'Clorhexidina'],
  ['peroxido hidrogeno', 'Agua oxigenada'],
  ['dimenhidrinato', 'Biodramina'],
  ['loperamida', 'Fortasec'],
  ['lactulosa', 'Duphalac'],
  ['bisacodilo', 'Dulcolax'],
  ['polietilenglicol', 'Movicol'],
  ['sucralfato', 'Urbal'],
  ['simeticona', 'Aerored'],
  ['domperidona', 'Motilium'],
  ['cromoglicato', 'Intal'],
  ['carbocisteina', 'Mucofluid'],
  ['codeina', 'Codeisan'],
  ['metadona', 'Metasedin'],
  ['buprenorfina', 'Transtec'],
  ['naltrexona', 'Revia'],
  ['celecoxib', 'Celebrex'],
  ['etoricoxib', 'Arcoxia'],
  ['topiramato', 'Topamax'],
  ['zolpidem', 'Stilnox'],
  ['venlafaxina', 'Vandral'],
  ['duloxetina', 'Cymbalta'],
  ['mirtazapina', 'Rexer'],
  ['trazodona', 'Deprax'],
  ['aripiprazol', 'Abilify'],
  ['metilfenidato', 'Concerta'],
  ['pramipexol', 'Mirapexin'],
  ['donepezilo', 'Aricept'],
  ['memantina', 'Axura'],
  ['rivastigmina', 'Exelon'],
  ['tizanidina', 'Sirdalud'],
  ['toxina botulinica', 'Botox'],
  ['ciclobenzaprina', 'Yurelax'],
  ['febuxostat', 'Adenuric'],
  ['etanercept', 'Enbrel'],
  ['calcitriol', 'Rocaltrol'],
  ['teriparatida', 'Forsteo'],
  ['ciproterona', 'Androcur'],
  ['finasterida', 'Proscar'],
  ['sildenafilo', 'Viagra'],
  ['tamsulosina', 'Omnic'],
  ['prasugrel', 'Efient'],
  ['indapamida', 'Tertensif'],
  ['torasemida', 'Sutril'],
  ['sacubitril', 'Entresto'],
  ['ivabradina', 'Corlentor'],
  ['ezetimiba', 'Ezetrol'],
  ['gliclazida', 'Diamicron'],
  ['sitagliptina', 'Januvia'],
];

let missing = 0;
check.forEach(([term, brand]) => {
  const found = all.some(n => n.includes(term));
  if (!found) { console.log('FALTA:', term, '(' + brand + ')'); missing++; }
});
console.log('\nTotal faltantes:', missing);
