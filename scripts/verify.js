const drugs = require('../src/data/drugs.json');
const cats = require('../src/data/categories.json');
console.log('=== VERIFICATION ===');
console.log('Total drugs:', drugs.length);

const ids = drugs.map(d => d.id);
const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
console.log('Duplicate IDs:', dupIds.length === 0 ? 'NONE' : dupIds);

const names = drugs.map(d => d.nombre);
const dupNames = names.filter((n, i) => names.indexOf(n) !== i);
console.log('Duplicate names:', dupNames.length === 0 ? 'NONE' : dupNames);

const allChapterIds = new Set();
cats.unidades.forEach(u => u.capitulos.forEach(c => allChapterIds.add(c.id)));
const orphans = drugs.filter(d => !allChapterIds.has(d.capituloId));
console.log('Orphaned drugs:', orphans.length);
if (orphans.length) orphans.forEach(d => console.log('  ', d.id, d.capituloId));

let missingRefs = 0;
cats.unidades.forEach(u => u.capitulos.forEach(c => {
  c.drugIds.forEach(id => {
    if (!drugs.some(d => d.id === id)) { missingRefs++; console.log('Missing ref:', id, 'in', c.id); }
  });
}));
console.log('Missing refs in chapters:', missingRefs);

let missingFields = 0;
const required = ['id','nombre','nombreGenerico','familia','clasificacion','mecanismoAccion','indicaciones','contraindicaciones','efectosAdversos','viaAdministracion','dosis','presentaciones','embarazo','lactancia','cuidadosEnfermeria','unidadId','capituloId','searchText'];
drugs.forEach(d => {
  required.forEach(f => {
    if (d[f] === undefined || d[f] === null) { missingFields++; console.log('Missing field', f, 'in', d.id); }
  });
});
console.log('Missing required fields:', missingFields);

console.log('\n=== DISTRIBUTION ===');
cats.unidades.forEach(u => {
  const count = drugs.filter(d => d.unidadId === u.id).length;
  console.log(u.id, u.nombre + ':', count);
});
