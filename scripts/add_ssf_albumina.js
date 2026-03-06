const fs = require('fs');
const path = require('path');
const drugsPath = path.join(__dirname, '..', 'src', 'data', 'drugs.json');
const catsPath = path.join(__dirname, '..', 'src', 'data', 'categories.json');
const drugs = JSON.parse(fs.readFileSync(drugsPath, 'utf8'));
const cats = JSON.parse(fs.readFileSync(catsPath, 'utf8'));

const newDrugs = [
  {
    id: "cloruro_sodio", nombre: "Cloruro de Sodio (Solución Salina)", nombreGenerico: "Cloruro de sodio",
    nombresComerciales: ["SSF 0.9%", "NaCl 0.9%", "Solución Salina 3% (hipertónica)", "NaCl 0.45% (hipotónica)"],
    familia: "Soluciones cristaloides", clasificacion: "Solución de reposición hidroelectrolítica",
    mecanismoAccion: "Solución isotónica (0.9%) con osmolaridad de 308 mOsm/L, similar al plasma. Expande el volumen del líquido extracelular. Por cada litro infundido, ~250 mL permanecen intravascular y ~750 mL pasan al intersticio. La solución hipertónica (3%) genera gradiente osmótico que moviliza agua del espacio intracelular al extracelular, útil en hiponatremia severa y edema cerebral.",
    indicaciones: ["Reposición de volumen en deshidratación", "Diluyente universal para medicamentos IV", "Lavado de heridas y vías intravenosas", "Hiponatremia sintomática severa (SSF 3%)", "Shock hipovolémico (resucitación inicial)", "Alcalosis hipoclorémica"],
    contraindicaciones: ["Hipernatremia", "Retención hídrica/edema severo", "Insuficiencia cardíaca descompensada (precaución)", "SSF 3%: no por vía periférica prolongada"],
    efectosAdversos: ["Acidosis hiperclorémica (uso excesivo)", "Sobrecarga hídrica/edema pulmonar", "Hipernatremia (con SSF 3%)", "Edema periférico", "Hipopotasemia dilucional"],
    interacciones: ["Compatible con la mayoría de medicamentos IV", "Incompatible con anfotericina B (usar SG5%)", "Incompatible con levosimendán (usar SG5%)", "No mezclar con sangre en misma línea"],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "Mantenimiento: 1500-2500 mL/24h. Resucitación: bolos 250-500 mL rápidos. Hiponatremia severa (3%): 100-150 mL en 10-20 min. Máx corrección Na+: 8-10 mEq/L en 24h",
      pediatrico: "Mantenimiento: Holliday-Segar (4-2-1 mL/kg/h). Resucitación: bolos 20 mL/kg en 15-20 min"
    },
    presentaciones: ["Bolsa SSF 0.9% 100, 250, 500, 1000 mL", "Ampolla NaCl 20% 10 mL", "Bolsa SSF 3% 250-500 mL", "Bolsa NaCl 0.45% 500-1000 mL", "Ampollas SSF 0.9% 5-10 mL (lavado)"],
    embarazo: "A", lactancia: "Seguro",
    cuidadosEnfermeria: ["SSF 0.9% = diluyente más usado: verificar compatibilidad con cada fármaco", "Balance hídrico estricto: registrar ingresos y egresos", "Vigilar signos de sobrecarga: disnea, crepitantes, edema, ingurgitación yugular", "SSF 3%: preferiblemente por vía CENTRAL", "En hiponatremia: control Na+ sérico cada 2-4h (riesgo mielinólisis si corrección >10 mEq/L/24h)", "Uso excesivo de SSF 0.9% causa acidosis hiperclorémica → considerar Ringer Lactato", "No calentar en microondas"],
    farmacocinetica: { distribucion: "LEC: 75% intersticial, 25% intravascular", excrecion: "Renal", inicioAccion: "Expansión de volumen inmediata" },
    almacenamiento: "Temperatura ambiente. Desechar sobrante de bolsa abierta en 24h",
    unidadId: "u12", capituloId: "c12_07"
  },
  {
    id: "albumina_humana", nombre: "Albúmina Humana", nombreGenerico: "Albúmina humana sérica",
    nombresComerciales: ["Albumina Grifols", "Albunorm", "Flexbumin", "Alburex"],
    familia: "Hemoderivados coloidales", clasificacion: "Expansor plasmático coloidal — hemoderivado",
    mecanismoAccion: "Proteína plasmática responsable del 80% de la presión oncótica intravascular. Genera gradiente osmótico coloidal que atrae agua del espacio intersticial al intravascular, expandiendo el volumen plasmático de forma más sostenida que cristaloides. También transporta fármacos, bilirrubina y ácidos grasos.",
    indicaciones: ["Paracentesis de gran volumen (>5L) en cirrosis", "Síndrome hepatorrenal", "Peritonitis bacteriana espontánea", "Resucitación en quemados graves (>24h)", "Hipoalbuminemia severa sintomática (<2 g/dL)", "Plasmaféresis (líquido de reposición)"],
    contraindicaciones: ["Hipersensibilidad", "Insuficiencia cardíaca severa", "Anemia severa"],
    efectosAdversos: ["Escalofríos", "Fiebre", "Náuseas", "Urticaria", "Sobrecarga circulatoria", "Edema pulmonar", "Reacción anafiláctica (rara)"],
    interacciones: ["No mezclar con otros fármacos ni hemoderivados", "No mezclar con aminoácidos ni emulsiones lipídicas"],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "Hipoalbuminemia: 25 g IV, repetir según niveles. Paracentesis: 6-8 g por litro de ascitis extraído (>5L). PBE: 1.5 g/kg día 1, 1 g/kg día 3",
      pediatrico: "0.5-1 g/kg/dosis"
    },
    presentaciones: ["Frasco 20% (200 mg/mL) 50-100 mL", "Frasco 5% (50 mg/mL) 250-500 mL", "Frasco 25% (250 mg/mL) 50-100 mL"],
    embarazo: "C", lactancia: "Seguro",
    cuidadosEnfermeria: ["Al 5%: isooncótica. Al 20-25%: hiperoncótica (atrae agua del intersticio)", "Infundir al 20-25% LENTA: 1-2 mL/min", "Monitorizar TA, FC, PVC, diuresis", "Registrar lote y marca (trazabilidad hemoderivado)", "No diluir al 20-25% con agua estéril (hemólisis)", "En paracentesis: calcular g según litros extraídos (6-8g/L)", "Desechar sobrante (no reutilizar frasco abierto)"],
    farmacocinetica: { distribucion: "Intravascular 60%, intersticial 40%", vidaMedia: "15-20 días", inicioAccion: "Expansión volumen en 15-30 min (al 25%)" },
    almacenamiento: "Temperatura ambiente o refrigerar. No congelar",
    unidadId: "u12", capituloId: "c12_07",
    preparacionParenteral: {
      reconstitucion: "Lista para uso. NUNCA diluir con agua estéril (hemólisis)",
      velocidadAdministracion: "Al 5%: 5 mL/min. Al 20-25%: 1-2 mL/min",
      estabilidad: "Usar dentro de 4h de apertura",
      solucionesCompatibles: { ssf: true, sg5: true, otras: "NUNCA diluir con agua estéril para inyección" }
    }
  }
];

const existingIds = new Set(drugs.map(d => d.id));
let added = 0;
newDrugs.forEach(d => {
  if (existingIds.has(d.id)) { console.log("SKIP:", d.nombre); return; }
  drugs.push(d);
  existingIds.add(d.id);
  for (const u of cats.unidades)
    for (const c of u.capitulos)
      if (c.id === d.capituloId && !c.drugIds.includes(d.id)) c.drugIds.push(d.id);
  added++;
  console.log("ADD:", d.nombre);
});

fs.writeFileSync(drugsPath, JSON.stringify(drugs, null, 2), "utf8");
fs.writeFileSync(catsPath, JSON.stringify(cats, null, 2), "utf8");
console.log("\nDone:", added, "added. Total:", drugs.length);