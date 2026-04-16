#!/usr/bin/env node
/**
 * Merge new_drugs.json into drugs.json and update categories.json
 * Usage: node scripts/merge_drugs.js
 */

const fs = require('fs');
const path = require('path');

const DRUGS_PATH = path.join(__dirname, '..', 'src', 'data', 'drugs.json');
const NEW_DRUGS_PATH = path.join(__dirname, '..', 'src', 'data', 'new_drugs.json');
const CATEGORIES_PATH = path.join(__dirname, '..', 'src', 'data', 'categories.json');

// Load files
const drugs = JSON.parse(fs.readFileSync(DRUGS_PATH, 'utf8'));
const newDrugs = JSON.parse(fs.readFileSync(NEW_DRUGS_PATH, 'utf8'));
const categories = JSON.parse(fs.readFileSync(CATEGORIES_PATH, 'utf8'));

console.log(`Existing drugs: ${drugs.length}`);
console.log(`New drugs to add: ${newDrugs.length}`);

// Check for duplicate IDs
const existingIds = new Set(drugs.map(d => d.id));
const duplicates = newDrugs.filter(d => existingIds.has(d.id));
if (duplicates.length > 0) {
  console.warn(`WARNING: ${duplicates.length} duplicate IDs found, re-assigning...`);
  let nextId = drugs.length + 1;
  duplicates.forEach(d => {
    d.id = `drug${String(nextId++).padStart(4, '0')}`;
  });
}

// Check for duplicate names
const existingNames = new Set(drugs.map(d => d.nombreGenerico.toLowerCase()));
const nameDups = newDrugs.filter(d => existingNames.has(d.nombreGenerico.toLowerCase()));
if (nameDups.length > 0) {
  console.warn(`WARNING: ${nameDups.length} drugs already exist by name, skipping:`);
  nameDups.forEach(d => console.warn(`  - ${d.nombre} (${d.nombreGenerico})`));
}

// Filter out name duplicates
const uniqueNewDrugs = newDrugs.filter(d => !existingNames.has(d.nombreGenerico.toLowerCase()));
console.log(`Unique new drugs: ${uniqueNewDrugs.length}`);

// Merge drugs
const mergedDrugs = [...drugs, ...uniqueNewDrugs];

// Update categories — add drug IDs to their chapters
let chaptersUpdated = 0;
uniqueNewDrugs.forEach(drug => {
  const unit = categories.unidades.find(u => u.id === drug.unidadId);
  if (!unit) {
    console.warn(`Unit ${drug.unidadId} not found for ${drug.nombre}`);
    return;
  }
  let chapter = unit.capitulos.find(c => c.id === drug.capituloId);
  if (!chapter) {
    // Create chapter if it doesn't exist
    chapter = { id: drug.capituloId, nombre: drug.capituloId, drugIds: [] };
    unit.capitulos.push(chapter);
    console.log(`Created new chapter ${drug.capituloId} in ${unit.nombre}`);
  }
  if (!chapter.drugIds.includes(drug.id)) {
    chapter.drugIds.push(drug.id);
    chaptersUpdated++;
  }
});

// Save
fs.writeFileSync(DRUGS_PATH, JSON.stringify(mergedDrugs, null, 2), 'utf8');
fs.writeFileSync(CATEGORIES_PATH, JSON.stringify(categories, null, 2), 'utf8');

console.log(`\nDone!`);
console.log(`  Total drugs: ${mergedDrugs.length}`);
console.log(`  New drugs added: ${uniqueNewDrugs.length}`);
console.log(`  Chapters updated: ${chaptersUpdated}`);
