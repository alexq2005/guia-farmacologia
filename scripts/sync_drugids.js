const fs = require('fs');
const path = require('path');
const drugsPath = path.join(__dirname, '..', 'src', 'data', 'drugs.json');
const catsPath = path.join(__dirname, '..', 'src', 'data', 'categories.json');
const drugs = JSON.parse(fs.readFileSync(drugsPath, 'utf8'));
const cats = JSON.parse(fs.readFileSync(catsPath, 'utf8'));

// Build map: capituloId -> [drugId, ...]
const chapterDrugs = new Map();
for (const drug of drugs) {
  if (!chapterDrugs.has(drug.capituloId)) chapterDrugs.set(drug.capituloId, []);
  chapterDrugs.get(drug.capituloId).push(drug.id);
}

let fixed = 0;
for (const u of cats.unidades) {
  for (const c of u.capitulos) {
    const actual = chapterDrugs.get(c.id) || [];
    const old = c.drugIds;
    if (JSON.stringify(old.sort()) !== JSON.stringify(actual.sort())) {
      console.log(`FIX ${c.id} (${c.nombre}): ${old.length} -> ${actual.length}`);
      c.drugIds = actual;
      fixed++;
    }
  }
}

fs.writeFileSync(catsPath, JSON.stringify(cats, null, 2), 'utf8');
console.log(`\nFixed ${fixed} chapters. Total drugs: ${drugs.length}`);

// Verify
let totalInCats = 0;
for (const u of cats.unidades)
  for (const c of u.capitulos)
    totalInCats += c.drugIds.length;
console.log(`Categories total drugIds: ${totalInCats}`);
