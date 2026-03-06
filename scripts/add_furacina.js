const fs = require('fs');
const path = require('path');
const drugsPath = path.join(__dirname, '..', 'src', 'data', 'drugs.json');
const catsPath = path.join(__dirname, '..', 'src', 'data', 'categories.json');
const drugs = JSON.parse(fs.readFileSync(drugsPath, 'utf8'));
const cats = JSON.parse(fs.readFileSync(catsPath, 'utf8'));

const newDrugs = [
  {
    id: "nitrofurazona", nombre: "Nitrofurazona (Furacina)", nombreGenerico: "Nitrofurazona",
    nombresComerciales: ["Furacina", "Furacin", "Nitrofural"],
    familia: "Antibacterianos tópicos", clasificacion: "Antiséptico/antibacteriano tópico — derivado nitrofurano",
    mecanismoAccion: "Derivado nitrofurano con acción bactericida de amplio espectro. Inhibe enzimas bacterianas implicadas en el metabolismo aeróbico y anaeróbico del piruvato y en la degradación de la glucosa. Activo contra Staphylococcus aureus, Streptococcus, E. coli, Proteus, Clostridium y Enterobacter. Menor desarrollo de resistencias que otros antibacterianos tópicos.",
    indicaciones: ["Quemaduras de 2° y 3° grado (prevención y tratamiento de infección)", "Heridas infectadas o con riesgo de infección", "Úlceras cutáneas infectadas", "Injertos cutáneos (prevención de infección)", "Heridas quirúrgicas abiertas"],
    contraindicaciones: ["Hipersensibilidad a nitrofurazona o nitrofuranos", "Insuficiencia renal (absorción sistémica en grandes superficies)"],
    efectosAdversos: ["Dermatitis de contacto alérgica", "Irritación local", "Prurito", "Eritema", "Sensibilización cutánea (uso prolongado)", "Nefrotoxicidad (absorción en quemaduras extensas — raro)"],
    interacciones: ["No se conocen interacciones tópicas significativas", "En quemaduras extensas: precaución con otros nefrotóxicos por absorción sistémica"],
    viaAdministracion: ["Tópica"],
    dosis: {
      adulto: "Aplicar directamente sobre la herida o sobre gasa/apósito 1-2 veces al día. En quemaduras: aplicar capa fina con cada cambio de cura",
      pediatrico: "Misma posología que adulto"
    },
    presentaciones: ["Crema 0.2% tubo 30-60 g", "Pomada soluble 0.2% tubo 30-100 g", "Gasa impregnada (Furacin gasa)", "Solución tópica 0.2%"],
    embarazo: "C", lactancia: "Precaución (uso en áreas limitadas)",
    cuidadosEnfermeria: ["Limpiar la herida con SSF antes de aplicar", "Aplicar capa fina uniforme directamente o sobre gasa estéril", "Cambiar apósito cada 12-24h según exudado", "Si aparece dermatitis de contacto: suspender y cambiar a otro tópico", "En quemaduras extensas (>20% SCQ): vigilar función renal (absorción sistémica)", "Las gasas impregnadas facilitan la aplicación y reducen dolor al retirar", "No usar en heridas limpias en granulación avanzada (puede retrasar cierre)", "Almacenar protegido de la luz (se degrada)"],
    farmacocinetica: { inicioAccion: "Efecto antibacteriano local inmediato", distribucion: "Tópico local. Absorción sistémica mínima (excepto en quemaduras extensas)", excrecion: "Renal (si absorción sistémica)" },
    almacenamiento: "Temperatura ambiente. Proteger de la luz (se oscurece pero no pierde eficacia si leve)",
    unidadId: "u09", capituloId: "c09_04"
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
