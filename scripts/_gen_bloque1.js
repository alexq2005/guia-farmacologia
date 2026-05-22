// Regenera docs/clinical_review/bloque_1.md desde drugs.json. Idempotente —
// puede correrse después de cualquier cambio de contenido para re-snapshot
// el estado de los 50 drugs del Bloque 1 de revisión clínica.
//   Uso: node scripts/_gen_bloque1.js
const fs = require('fs');
const path = require('path');

const drugs = require(path.join(__dirname, '..', 'src', 'data', 'drugs.json'));

const bloque1 = {
  Anticoagulantes: [
    'heparina sodica',
    'enoxaparina',
    'dalteparina',
    'tinzaparina',
    'warfarina',
    'acenocumarol',
    'apixaban',
    'rivaroxaban',
    'dabigatran',
    'edoxaban',
  ],
  Insulinas: [
    'insulina regular',
    'insulina NPH',
    'insulina glargina',
    'insulina detemir',
    'insulina lispro',
    'insulina aspart',
    'insulina glulisina',
    'insulina degludec',
  ],
  Opioides: [
    'morfina',
    'fentanilo',
    'oxicodona',
    'metadona',
    'tramadol',
    'remifentanilo',
    'sufentanilo',
  ],
  'Sedantes/anestesicos IV': [
    'propofol',
    'midazolam',
    'ketamina',
    'etomidato',
    'dexmedetomidina',
    'succinilcolina',
    'rocuronio',
    'cisatracurio',
  ],
  Vasoactivos: [
    'noradrenalina',
    'adrenalina',
    'dopamina',
    'dobutamina',
    'nitroprusiato',
    'vasopresina',
    'levosimendan',
  ],
  Antiarritmicos: ['amiodarona', 'lidocaina', 'adenosina', 'digoxina'],
  'Electrolitos concentrados': [
    'potasio cloruro',
    'sulfato magnesio',
    'bicarbonato sodico',
    'gluconato calcio',
  ],
};

const STOPWORDS = new Set(['de', 'la', 'el', 'del']);

function normalize(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const drugIndex = drugs.map(d => ({
  id: d.id,
  nombre: d.nombre,
  searchKey: normalize(d.nombre + ' ' + d.nombreGenerico)
    .split(' ')
    .filter(w => !STOPWORDS.has(w))
    .join(' '),
  obj: d,
}));

function findMatches(query) {
  const nq = normalize(query)
    .split(' ')
    .filter(w => !STOPWORDS.has(w));
  if (nq.length === 0) return [];
  return drugIndex
    .filter(d => nq.every(w => d.searchKey.includes(w)))
    .slice(0, 5);
}

function fcCount(d) {
  if (!d.farmacocinetica) return 0;
  return Object.values(d.farmacocinetica).filter(
    v => typeof v === 'string' && v.trim().length > 0,
  ).length;
}

const today = new Date().toISOString().slice(0, 10);

let md =
  '# Bloque 1 — Revisión Clínica Pendiente (50 fármacos alto-riesgo)\n\n';
md +=
  '> Lista priorizada según [docs/CLINICAL_REVIEW.md](../CLINICAL_REVIEW.md) sección "Bloque 1".\n';
md +=
  '> Auto-generada el ' +
  today +
  ' por `scripts/_gen_bloque1.js`. Refleja estado actual de cada fármaco en el dataset.\n\n';
md += '## Cómo usar este documento\n\n';
md +=
  '1. Para cada categoría, abrí la ficha del fármaco en la app (o leé el JSON directo).\n';
md +=
  '2. Compará contra la fuente canónica (CIMA / Vademécum ANMAT / Goodman & Gilman).\n';
md +=
  '3. Cuando hayas terminado la revisión de un fármaco, marcá ☑ en la columna "Revisado".\n';
md +=
  '4. Cuando hayas terminado todo el bloque, seguí el procedimiento en `docs/CLINICAL_REVIEW.md` sección "Cómo firmar la revisión".\n\n';
md += '## Estado actual de campos clínicos críticos\n\n';
md += 'Leyenda de columnas:\n';
md +=
  '- **FC**: subcampos populados en `farmacocinetica` (de 8 posibles). ≥3 = ✓ útil, <3 = ⚠ parcial.\n';
md += '- **AR**: `dosis.ajusteRenal` presente.\n';
md += '- **AH**: `dosis.ajusteHepatico` presente.\n';
md += '- **Ped**: `dosis.pediatrico` presente.\n';
md += '- **PP**: `preparacionParenteral` presente (vía IV/IM/SC).\n';
md += '- **Almac**: `almacenamiento` presente.\n\n';

let totalFound = 0;
let totalSearched = 0;
const notFound = [];
const allFoundDrugs = [];

for (const [cat, names] of Object.entries(bloque1)) {
  md += '### ' + cat + '\n\n';
  md +=
    '| Drug | ID | Nombre completo | FC | AR | AH | Ped | PP | Almac | Revisado |\n';
  md += '|---|---|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|\n';
  for (const name of names) {
    totalSearched++;
    const matches = findMatches(name);
    if (matches.length === 0) {
      notFound.push(cat + ': ' + name);
      md +=
        '| ' +
        name +
        ' | _(no encontrado)_ | — | — | — | — | — | — | — | ❌ |\n';
      continue;
    }
    totalFound++;
    const best = matches[0];
    const d = best.obj;
    allFoundDrugs.push(d);
    const fc = fcCount(d);
    const fcStr = fc >= 3 ? '✓' + fc : '⚠' + fc;
    const ar = d.dosis && d.dosis.ajusteRenal ? '✓' : '✗';
    const ah = d.dosis && d.dosis.ajusteHepatico ? '✓' : '✗';
    const ped = d.dosis && d.dosis.pediatrico ? '✓' : '✗';
    const pp = d.preparacionParenteral ? '✓' : '—';
    const almac = d.almacenamiento ? '✓' : '✗';
    md +=
      '| ' +
      name +
      ' | `' +
      d.id +
      '` | ' +
      d.nombre +
      ' | ' +
      fcStr +
      ' | ' +
      ar +
      ' | ' +
      ah +
      ' | ' +
      ped +
      ' | ' +
      pp +
      ' | ' +
      almac +
      ' | ☐ |\n';
    if (matches.length > 1) {
      const alts = matches
        .slice(1, 4)
        .map(m => '`' + m.obj.id + '` (' + m.obj.nombre + ')')
        .join(', ');
      md +=
        '|  | _alternativas en dataset_ | ' +
        alts +
        ' | — | — | — | — | — | — | — |\n';
    }
  }
  md += '\n';
}

let arDone = 0,
  ahDone = 0,
  pedDone = 0,
  fcDone = 0,
  ppDone = 0;
for (const d of allFoundDrugs) {
  if (d.dosis && d.dosis.ajusteRenal) arDone++;
  if (d.dosis && d.dosis.ajusteHepatico) ahDone++;
  if (d.dosis && d.dosis.pediatrico) pedDone++;
  if (fcCount(d) >= 3) fcDone++;
  if (d.preparacionParenteral) ppDone++;
}

md += '## Resumen ejecutivo\n\n';
md += '| Métrica | Valor |\n|---|---|\n';
md += '| Drugs en lista Bloque 1 | **' + totalSearched + '** |\n';
md +=
  '| Encontrados en dataset | **' +
  totalFound +
  '** (' +
  Math.round((100 * totalFound) / totalSearched) +
  '%) |\n';
md += '| No encontrados | ' + (totalSearched - totalFound) + ' |\n';
md +=
  '| Con FC útil (≥3 subs) | ' +
  fcDone +
  ' / ' +
  totalFound +
  ' (' +
  Math.round((100 * fcDone) / totalFound) +
  '%) |\n';
md +=
  '| Con ajusteRenal | ' +
  arDone +
  ' / ' +
  totalFound +
  ' (' +
  Math.round((100 * arDone) / totalFound) +
  '%) |\n';
md +=
  '| Con ajusteHepatico | ' +
  ahDone +
  ' / ' +
  totalFound +
  ' (' +
  Math.round((100 * ahDone) / totalFound) +
  '%) |\n';
md +=
  '| Con dosis.pediatrico | ' +
  pedDone +
  ' / ' +
  totalFound +
  ' (' +
  Math.round((100 * pedDone) / totalFound) +
  '%) |\n';
md +=
  '| Con preparacionParenteral | ' +
  ppDone +
  ' / ' +
  totalFound +
  ' (' +
  Math.round((100 * ppDone) / totalFound) +
  '%) |\n\n';

if (notFound.length > 0) {
  md += '## Drugs no encontrados\n\n';
  md +=
    'Pueden estar bajo otro nombre, faltar genuinamente, o ser variantes del mismo principio activo ya cubiertas.\n\n';
  for (const nf of notFound) md += '- ' + nf + '\n';
  md += '\n';
}

md += '## Próximo paso\n\n';
md += '1. Revisar ítem por ítem con tu credencial profesional al lado.\n';
md +=
  '2. Cualquier fix técnico (typo, dosis desactualizada, contraindicación faltante) → commit normal con `fix(data): <fármaco>`.\n';
md +=
  '3. Si una entrada tiene **alternativas** listadas, decidir cuál es la canónica y mergear/eliminar duplicados.\n';
md +=
  '4. Cuando todos los ☐ pasen a ☑, firmar la revisión per `docs/CLINICAL_REVIEW.md` sección "Cómo firmar la revisión":\n';
md +=
  '   - Editar `_meta.json drugs.lastClinicalReview`, `reviewedBy`, `reviewerCredential`\n';
md += '   - Editar `_meta.responsible` (top-level) si está null\n';
md += '   - Commit + `npm run version:patch` → release a Play Store\n\n';

md += '## Regenerar este documento\n\n';
md += 'Si querés re-snapshot del estado tras cambios en `drugs.json`:\n\n';
md += '```bash\nnode scripts/_gen_bloque1.js\n```\n';

fs.writeFileSync(
  path.join(__dirname, '..', 'docs', 'clinical_review', 'bloque_1.md'),
  md,
);
console.log('Generated docs/clinical_review/bloque_1.md');
console.log('Lines:', md.split('\n').length);
console.log('Drugs found:', totalFound, '/', totalSearched);
console.log(
  'Stats: AR=' +
    arDone +
    ' AH=' +
    ahDone +
    ' Ped=' +
    pedDone +
    ' FC=' +
    fcDone +
    ' PP=' +
    ppDone,
);
