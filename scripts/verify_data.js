const drugs = require('../src/data/drugs.json');
const cats = require('../src/data/categories.json');

console.log('=== FINAL VERIFICATION ===');
console.log('Total drugs:', drugs.length);

let warnings = 0;
for (const d of drugs) {
  let found = false;
  for (const u of cats.unidades) {
    for (const c of u.capitulos) {
      if (c.drugIds.includes(d.id)) found = true;
    }
  }
  if (!found) { console.log('WARN: orphan drug', d.id); warnings++; }
}

let errors = 0;
let totalRefs = 0;
for (const u of cats.unidades) {
  for (const c of u.capitulos) {
    for (const did of c.drugIds) {
      totalRefs++;
      if (!drugs.find(d => d.id === did)) { console.log('ERROR: missing drug', did); errors++; }
    }
  }
}

console.log('Total drug refs in chapters:', totalRefs);
console.log('Warnings:', warnings, '| Errors:', errors);
console.log('');
console.log('=== FINAL DISTRIBUTION ===');
for (const u of cats.unidades) {
  let drugCount = 0;
  const chapInfo = [];
  for (const c of u.capitulos) {
    drugCount += c.drugIds.length;
    chapInfo.push(c.nombre + ' (' + c.drugIds.length + ')');
  }
  console.log(u.nombre + ': ' + drugCount + ' drugs');
  chapInfo.forEach(ci => console.log('  - ' + ci));
}
