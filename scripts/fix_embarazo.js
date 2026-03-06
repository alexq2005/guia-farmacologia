const fs = require('fs');
const drugs = JSON.parse(fs.readFileSync('src/data/drugs.json', 'utf8'));
const valid = new Set(['A','B','C','D','X','N/A']);
let fixed = 0;
drugs.forEach(d => {
  if (!valid.has(d.embarazo)) {
    const orig = d.embarazo;
    let cat = 'N/A';
    if (/categor[ií]a\s*X|CONTRAINDICADO.*X|fetot[oó]xico/i.test(orig)) cat = 'X';
    else if (/categor[ií]a\s*D|CONTRAINDICADO.*D|anticoncepci[oó]n/i.test(orig)) cat = 'D';
    else if (/categor[ií]a\s*C/i.test(orig)) cat = 'C';
    else if (/categor[ií]a\s*B|compatible.*2do|compatible.*trimestre/i.test(orig)) cat = 'B';
    else if (/categor[ií]a\s*A/i.test(orig)) cat = 'A';
    else if (/no aplica|uso neonatal|uso t[oó]pico/i.test(orig)) cat = 'N/A';
    else if (/contraindicado|evitar|prohibido/i.test(orig)) cat = 'X';
    else if (/precauci[oó]n|valorar|riesgo/i.test(orig)) cat = 'C';
    else if (/compatible|seguro/i.test(orig)) cat = 'B';

    if (orig.length > 5) {
      d.embarazoNota = orig;
    }
    d.embarazo = cat;
    fixed++;
    console.log(d.id + ': "' + orig.substring(0,70) + '" -> ' + cat);
  }
});
fs.writeFileSync('src/data/drugs.json', JSON.stringify(drugs, null, 2), 'utf8');
console.log('\nFixed ' + fixed + ' drugs');
