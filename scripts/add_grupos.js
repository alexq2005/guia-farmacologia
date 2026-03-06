const fs = require('fs');
const path = require('path');

const drugsPath = path.join(__dirname, '..', 'src', 'data', 'drugs.json');
const catsPath = path.join(__dirname, '..', 'src', 'data', 'categories.json');
const drugs = JSON.parse(fs.readFileSync(drugsPath, 'utf8'));
const cats = JSON.parse(fs.readFileSync(catsPath, 'utf8'));

// Build chapter name lookup
const chapterNames = {};
const unitNames = {};
cats.unidades.forEach(u => {
  unitNames[u.id] = u.nombre;
  u.capitulos.forEach(c => {
    chapterNames[c.id] = c.nombre;
  });
});

// ============================================================
// grupoTerapeutico: unit system name (broad therapeutic area)
// Maps unidadId → ATC-style therapeutic group
// ============================================================
const GRUPO_TERAPEUTICO_MAP = {
  u01: 'Sistema Nervioso',
  u02: 'Sistema Cardiovascular',
  u03: 'Antiinfecciosos',
  u04: 'Sistema Respiratorio',
  u05: 'Aparato Digestivo',
  u06: 'Sistema Endocrino y Metabolismo',
  u07: 'Sistema Genitourinario y Reproductor',
  u08: 'Sistema Musculoesquelético',
  u09: 'Dermatología',
  u10: 'Sangre y Órganos Hematopoyéticos',
  u11: 'Antídotos y Emergencias',
  u12: 'Fármacos Hospitalarios y Antineoplásicos',
};

// ============================================================
// grupoFarmacologico: based on capituloId for specific subgroup
// Maps chapter IDs → pharmacological mechanism groups
// ============================================================
const GRUPO_FARMACOLOGICO_MAP = {
  // Sistema Nervioso
  c01_01: 'Analgésicos no opioides',
  c01_02: 'Analgésicos opioides',
  c01_03: 'Anestésicos',
  c01_04: 'Antiepilépticos',
  c01_05: 'Antiparkinsonianos',
  c01_06: 'Antipsicóticos',
  c01_07: 'Antidepresivos',
  c01_08: 'Psicoestimulantes y nootrópicos',
  c01_09: 'Antimigrañosos',
  c01_10: 'Inmunomoduladores del SNC',
  c01_11: 'Ansiolíticos e hipnóticos',
  c01_12: 'Neurofármacos especiales',
  c01_13: 'Fármacos para trastornos adictivos',
  // Sistema Cardiovascular
  c02_01: 'Antihipertensivos',
  c02_02: 'Antiarrítmicos',
  c02_03: 'Vasodilatadores',
  c02_04: 'Diuréticos',
  c02_05: 'Hipolipemiantes',
  c02_06: 'Antiagregantes plaquetarios y antianginosos',
  c02_07: 'Inotrópicos y vasopresores',
  c02_08: 'Vasodilatadores pulmonares',
  c02_09: 'Antianginosos',
  c02_10: 'Fármacos para shock y soporte hemodinámico',
  c02_11: 'Fármacos cardiovasculares pediátricos',
  // Antiinfecciosos
  c03_01: 'Betalactámicos',
  c03_02: 'Quinolonas y macrólidos',
  c03_03: 'Otros antibacterianos',
  c03_04: 'Antivirales y antifúngicos',
  c03_05: 'Antituberculosos',
  c03_06: 'Antiparasitarios',
  c03_07: 'Antirretrovirales',
  c03_08: 'Antivirales para hepatitis',
  c03_09: 'Antifúngicos sistémicos',
  c03_10: 'Antivirales de amplio espectro',
  // Sistema Respiratorio
  c04_01: 'Broncodilatadores',
  c04_02: 'Antiinflamatorios inhalados',
  c04_03: 'Mucolíticos y expectorantes',
  c04_04: 'Antihistamínicos',
  c04_05: 'Otros fármacos respiratorios',
  c04_06: 'Fármacos para fibrosis quística',
  c04_07: 'Antitusígenos y descongestionantes',
  c04_08: 'Antifibróticos pulmonares',
  c04_10: 'Antihipertensivos pulmonares',
  // Sistema Digestivo
  c05_01: 'Antiulcerosos y antisecretores',
  c05_02: 'Antieméticos',
  c05_03: 'Otros fármacos digestivos',
  c05_04: 'Hepatoprotectores y enzimas digestivas',
  c05_05: 'Laxantes y antidiarreicos',
  c05_06: 'Antiinflamatorios intestinales',
  c05_07: 'Fármacos pancreáticos y biliares',
  c05_08: 'Procinéticos y espasmolíticos',
  c05_09: 'Antidiarreicos y adsorbentes',
  // Sistema Endocrino
  c06_01: 'Antidiabéticos e insulinas',
  c06_02: 'Fármacos tiroideos',
  c06_03: 'Corticosteroides sistémicos',
  c06_04: 'Otros fármacos endocrinos',
  c06_05: 'Hormonas hipofisarias',
  c06_06: 'Fármacos suprarrenales',
  c06_07: 'Reguladores del metabolismo óseo-mineral',
  c06_08: 'Fármacos antiobesidad',
  c06_09: 'Análogos y antagonistas hormonales',
  // Sistema Reproductor y Óseo
  c07_01: 'Oxitócicos y tocolíticos',
  c07_02: 'Suplementos y fármacos óseos',
  c07_03: 'Urológicos',
  c07_04: 'Fármacos obstétricos',
  c07_05: 'Hormonas sexuales y anticonceptivos',
  c07_06: 'Antirresortivos óseos',
  c07_07: 'Fármacos para fertilidad',
  c07_08: 'Tratamiento de endometriosis',
  c07_09: 'Fármacos prostáticos y para disfunción eréctil',
  // Sistema Musculoesquelético
  c08_01: 'Antiinflamatorios no esteroideos (AINEs)',
  c08_02: 'Relajantes musculares',
  c08_03: 'Antigotosos',
  c08_04: 'Inmunosupresores y antirreumáticos',
  c08_05: 'Fármacos para osteoporosis y artrosis',
  c08_06: 'Fármacos para miopatías',
  c08_07: 'Analgésicos tópicos',
  // Dermatología
  c09_01: 'Antibióticos tópicos',
  c09_02: 'Corticoides tópicos',
  c09_03: 'Antifúngicos tópicos',
  c09_04: 'Antiparasitarios tópicos',
  c09_05: 'Antivirales tópicos',
  c09_06: 'Inmunomoduladores tópicos y antipsoriásicos',
  c09_07: 'Retinoides y antiacneicos',
  c09_08: 'Antisépticos y cicatrizantes',
  c09_09: 'Queratolíticos y emolientes',
  c09_10: 'Fotoprotectores y despigmentantes',
  c09_11: 'Fármacos para alopecia',
  // Hematología
  c10_01: 'Anticoagulantes y antiagregantes',
  c10_02: 'Hemostáticos y factores de coagulación',
  c10_03: 'Antianémicos',
  c10_04: 'Fármacos para coagulopatías hereditarias',
  c10_05: 'Fármacos para neoplasias mieloproliferativas',
  // Antídotos y Emergencias
  c11_01: 'Antídotos específicos',
  c11_02: 'Fármacos de emergencia',
  c11_03: 'Antídotos para síndromes tóxicos',
  c11_04: 'Fármacos para soporte vital avanzado',
  // Fármacos Hospitalarios
  c12_01: 'Anestésicos generales',
  c12_02: 'Fármacos hospitalarios especiales',
  c12_03: 'Sedantes y analgésicos en UCI',
  c12_04: 'Nutrición parenteral y suplementos IV',
  c12_05: 'Antineoplásicos',
  c12_06: 'Soporte oncológico',
  c12_07: 'Soluciones de fluidoterapia y electrolitos',
};

// Refine grupoFarmacologico further based on familia for specificity
function refineGrupoFarmacologico(drug, baseGrupo) {
  const fam = (drug.familia || '').toLowerCase().trim();

  // Normalized rules: [pattern (lowercase), result]
  const rules = [
    // Antihipertensivos
    [/^ieca[s]?$|^inhibidores? de la eca$/i, 'Inhibidores de la enzima convertidora de angiotensina (IECA)'],
    [/^ara[- ]?ii$|^antagonistas? del receptor de angiotensina/i, 'Antagonistas del receptor de angiotensina II (ARA-II)'],
    [/^beta[- ]?bloqueantes?$|^betabloqueantes?$/i, 'Bloqueadores beta-adrenérgicos'],
    [/^calcioantagonistas? dihidropirid/i, 'Antagonistas del calcio dihidropiridínicos'],
    [/^calcioantagonistas? no dihidropirid/i, 'Antagonistas del calcio no dihidropiridínicos'],
    [/^calcioantagonistas?$/i, 'Antagonistas del calcio'],
    [/^alfa[- ]?bloqueantes?$/i, 'Bloqueadores alfa-adrenérgicos'],
    [/^antihipertensivos? centrales?$/i, 'Antihipertensivos de acción central'],
    [/^inhibidores? directos? de renina$/i, 'Inhibidores directos de renina'],
    [/^antagonistas? de aldosterona$/i, 'Antagonistas de la aldosterona'],
    // Antidiabéticos
    [/^insulinas? ultrarrápidas?$/i, 'Insulinas de acción ultrarrápida'],
    [/^insulinas? rápidas?$/i, 'Insulinas de acción rápida'],
    [/^insulinas? intermedias?$/i, 'Insulinas de acción intermedia'],
    [/^insulinas? prolongadas?$/i, 'Insulinas de acción prolongada'],
    [/^insulinas? premezcladas?$/i, 'Insulinas premezcladas'],
    [/^insulinas?$/i, 'Insulinas'],
    [/^biguanidas?$/i, 'Biguanidas (Metformina)'],
    [/^sulfonilureas?$/i, 'Sulfonilureas'],
    [/^inhibidores? dpp[- ]?4$/i, 'Inhibidores de la dipeptidil peptidasa 4 (iDPP-4)'],
    [/^inhibidores? sglt[- ]?2$/i, 'Inhibidores del cotransportador sodio-glucosa tipo 2 (iSGLT2)'],
    [/^agonistas? glp[- ]?1$/i, 'Agonistas del receptor GLP-1'],
    [/^glitazonas?$|^tiazolidinedionas?$/i, 'Tiazolidinedionas'],
    [/^meglitinidas?$/i, 'Meglitinidas'],
    [/^inhibidores? de alfa[- ]?glucosidasa$/i, 'Inhibidores de la alfa-glucosidasa'],
    // Anticoagulantes
    [/^heparinas? de bajo peso/i, 'Heparinas de bajo peso molecular (HBPM)'],
    [/^heparinas? no fraccionadas?$/i, 'Heparinas no fraccionadas (HNF)'],
    [/^acod[s]?$|^anticoagulantes? orales? directos?$/i, 'Anticoagulantes orales directos (ACOD)'],
    [/^antagonistas? de vitamina k/i, 'Antagonistas de la vitamina K'],
    [/^antiagregantes? plaquetarios?$/i, 'Antiagregantes plaquetarios'],
    // Antibióticos
    [/^penicilinas?$/i, 'Penicilinas'],
    [/^cefalosporinas?$/i, 'Cefalosporinas'],
    [/^carbapenems?$|^carbapenémicos?$/i, 'Carbapenémicos'],
    [/^quinolonas?$|^fluoroquinolonas?$/i, 'Fluoroquinolonas'],
    [/^macrólidos?$/i, 'Macrólidos'],
    [/^aminoglucósidos?$/i, 'Aminoglucósidos'],
    [/^tetraciclinas?$/i, 'Tetraciclinas'],
    [/^glucopéptidos?$/i, 'Glucopéptidos'],
    [/^lincosamidas?$/i, 'Lincosamidas'],
    [/^oxazolidinonas?$/i, 'Oxazolidinonas'],
    [/^nitroimidazoles?$/i, 'Nitroimidazoles'],
    [/^sulfonamidas?$/i, 'Sulfonamidas'],
    [/^polimixinas?$/i, 'Polimixinas'],
    // Antidepresivos
    [/^isrs$/i, 'Inhibidores selectivos de recaptación de serotonina (ISRS)'],
    [/^irsn$/i, 'Inhibidores de recaptación de serotonina-noradrenalina (IRSN)'],
    [/^tricíclicos?$|^antidepresivos? tricíclicos?$/i, 'Antidepresivos tricíclicos'],
    [/^imao$/i, 'Inhibidores de la monoaminooxidasa (IMAO)'],
    // Antipsicóticos
    [/^antipsicóticos? típicos?$/i, 'Antipsicóticos de primera generación (típicos)'],
    [/^antipsicóticos? atípicos?$/i, 'Antipsicóticos de segunda generación (atípicos)'],
    // Diuréticos
    [/^diuréticos? de asa$/i, 'Diuréticos de asa'],
    [/^tiazidas?$|^diuréticos? tiazídicos?$/i, 'Diuréticos tiazídicos'],
    [/^diuréticos? ahorradores? de potasio$/i, 'Diuréticos ahorradores de potasio'],
    [/^diuréticos? osmóticos?$/i, 'Diuréticos osmóticos'],
    // Opioides
    [/^opioides? fuertes?$/i, 'Agonistas opioides potentes'],
    [/^opioides? débiles?$/i, 'Agonistas opioides débiles'],
    [/^agonistas?[- ]?antagonistas? opioides?$/i, 'Agonistas-antagonistas opioides mixtos'],
    // Corticoides
    [/^corticosteroides? sistémicos?$/i, 'Glucocorticoides sistémicos'],
    [/^corticoides? tópicos?$|^corticosteroides? tópicos?$/i, 'Glucocorticoides tópicos'],
    [/^corticosteroides? inhalados?$/i, 'Glucocorticoides inhalados'],
    // Broncodilatadores
    [/^beta[- ]?2 agonistas? de acción corta$/i, 'Agonistas beta-2 adrenérgicos de acción corta (SABA)'],
    [/^beta[- ]?2 agonistas? de acción larga$/i, 'Agonistas beta-2 adrenérgicos de acción prolongada (LABA)'],
    [/^anticolinérgicos? inhalados? de acción larga$/i, 'Antimuscarínicos de acción prolongada (LAMA)'],
    [/^anticolinérgicos? inhalados?$/i, 'Antimuscarínicos inhalados'],
    [/^xantinas?$|^metilxantinas?$/i, 'Metilxantinas'],
    // AINEs
    [/^aines?$/i, 'Antiinflamatorios no esteroideos (AINEs)'],
    [/^aines? tópicos?$/i, 'AINEs tópicos'],
    [/^aines? parenterales?$/i, 'AINEs parenterales'],
    [/^coxibs?$|^inhibidores? cox[- ]?2$/i, 'Inhibidores selectivos de COX-2 (Coxibs)'],
    // IBP
    [/^ibp$|^inhibidores? de la bomba de protones$/i, 'Inhibidores de la bomba de protones (IBP)'],
    [/^antiácidos?$/i, 'Antiácidos'],
    [/^anti[- ]?h2$|^antagonistas? h2$/i, 'Antagonistas de receptores H2'],
    // Antihistamínicos
    [/^antihistamínicos? h1 de primera/i, 'Antihistamínicos H1 de primera generación (sedantes)'],
    [/^antihistamínicos? h1 de segunda/i, 'Antihistamínicos H1 de segunda generación (no sedantes)'],
    // Estatinas
    [/^estatinas?$/i, 'Inhibidores de la HMG-CoA reductasa (estatinas)'],
    [/^fibratos?$/i, 'Derivados del ácido fíbrico (fibratos)'],
    // Antifúngicos
    [/^azoles?$|^triazoles?$/i, 'Antifúngicos azólicos'],
    [/^equinocandinas?$/i, 'Equinocandinas'],
    [/^polienos?$/i, 'Antifúngicos poliénicos'],
    // Antivirales
    [/^análogos? de nucleós/i, 'Análogos de nucleósidos/nucleótidos'],
    [/^inhibidores? de proteasa$/i, 'Inhibidores de proteasa'],
    [/^inhibidores? de neuraminidasa$/i, 'Inhibidores de neuraminidasa'],
    // Inmunosupresores
    [/^inhibidores? de calcineurina$/i, 'Inhibidores de calcineurina'],
    [/^antimetabolitos?$/i, 'Antimetabolitos'],
    [/^anticuerpos? monoclonales?$/i, 'Anticuerpos monoclonales'],
    [/^biológicos?$/i, 'Terapia biológica'],
    // Antiepilépticos
    [/^antiepilépticos?$|^anticonvulsivantes?$/i, 'Antiepilépticos'],
    [/^benzodiacepinas?$/i, 'Benzodiacepinas'],
    // Insuficiencia cardíaca
    [/^insuficiencia card/i, 'Fármacos para insuficiencia cardíaca'],
  ];

  const orig = drug.familia || '';
  for (const [pattern, result] of rules) {
    if (pattern.test(orig)) {
      return result;
    }
  }

  return baseGrupo;
}

let updated = 0;
for (const drug of drugs) {
  const gt = GRUPO_TERAPEUTICO_MAP[drug.unidadId] || '';
  const gfBase = GRUPO_FARMACOLOGICO_MAP[drug.capituloId] || '';
  const gf = refineGrupoFarmacologico(drug, gfBase);

  if (gt) {
    drug.grupoTerapeutico = gt;
  }
  if (gf) {
    drug.grupoFarmacologico = gf;
    updated++;
  }
}

fs.writeFileSync(drugsPath, JSON.stringify(drugs, null, 2), 'utf8');
console.log(`Done: ${updated} drugs updated with grupoTerapeutico + grupoFarmacologico`);

// Verify
const check = JSON.parse(fs.readFileSync(drugsPath, 'utf8'));
const withGT = check.filter(d => d.grupoTerapeutico);
const withGF = check.filter(d => d.grupoFarmacologico);
console.log(`grupoTerapeutico: ${withGT.length}/${check.length}`);
console.log(`grupoFarmacologico: ${withGF.length}/${check.length}`);

// Sample
const samples = ['paracetamol', 'enalapril', 'omeprazol', 'metformina', 'amoxicilina', 'salbutamol', 'diazepam', 'warfarina', 'insulina_regular', 'prednisona'];
console.log('\nSamples:');
for (const id of samples) {
  const d = check.find(x => x.id === id);
  if (d) console.log(`  ${d.nombre}: GT="${d.grupoTerapeutico}" | GF="${d.grupoFarmacologico}"`);
}
