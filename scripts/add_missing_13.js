#!/usr/bin/env node
// Add 13 clinically important missing drugs
const fs = require('fs');
const path = require('path');

const drugsPath = path.join(__dirname, '..', 'src', 'data', 'drugs.json');
const catsPath = path.join(__dirname, '..', 'src', 'data', 'categories.json');

const drugs = JSON.parse(fs.readFileSync(drugsPath, 'utf8'));
const cats = JSON.parse(fs.readFileSync(catsPath, 'utf8'));

const existingIds = new Set(drugs.map(d => d.id));

const newDrugs = [
  // === LOCAL ANESTHETICS (c01_03 - Anestésicos, u01) ===
  {
    id: "bupivacaina",
    nombre: "Bupivacaína",
    nombreGenerico: "Bupivacaína",
    nombresComerciales: ["Marcaine", "Sensorcaine", "Bupinest"],
    familia: "Anestésicos locales",
    clasificacion: "Anestésico local tipo amida",
    mecanismoAccion: "Bloquea los canales de sodio dependientes de voltaje en las fibras nerviosas, impidiendo la generación y conducción del impulso nervioso. Es de larga duración de acción. Tiene mayor cardiotoxicidad que otros anestésicos locales.",
    indicaciones: ["Anestesia epidural", "Anestesia espinal/intratecal", "Bloqueo de nervios periféricos", "Infiltración local", "Analgesia postoperatoria continua"],
    contraindicaciones: ["Hipersensibilidad a anestésicos tipo amida", "Infección en zona de inyección", "Hipovolemia severa", "Bloqueo cardíaco completo", "Anestesia IV regional (riesgo cardiotoxicidad)"],
    efectosAdversos: ["Cardiotoxicidad (arritmias, paro cardíaco)", "Neurotoxicidad (convulsiones, parestesias)", "Hipotensión", "Bradicardia", "Retención urinaria (epidural)", "Cefalea post-punción"],
    interacciones: ["Otros anestésicos locales (toxicidad aditiva)", "Betabloqueantes (aumentan cardiotoxicidad)", "Antiarrítmicos clase III"],
    viaAdministracion: ["Epidural", "Intratecal", "Infiltración", "Bloqueo nervioso"],
    dosis: {
      adulto: "Epidural: 15-30 mL de 0.25-0.5%. Intratecal: 1-3 mL de 0.5% hiperbárica. Bloqueo: según técnica.",
      pediatrico: "Máximo 2 mg/kg sin epinefrina, 3 mg/kg con epinefrina",
      geriatrico: "Reducir dosis 30-50%. Mayor sensibilidad a efectos adversos.",
      ajusteRenal: "No requiere ajuste significativo",
      ajusteHepatico: "Reducir dosis en insuficiencia hepática grave (metabolismo hepático)"
    },
    presentaciones: ["Ampolla 0.25% 20 mL", "Ampolla 0.5% 20 mL", "Ampolla 0.5% hiperbárica 4 mL", "Ampolla 0.75% 20 mL"],
    embarazo: "C",
    lactancia: "Compatible. Excreción mínima en leche materna.",
    cuidadosEnfermeria: ["Monitorizar ECG continuo durante administración", "Tener disponible emulsión lipídica 20% (antídoto cardiotoxicidad)", "Aspirar antes de inyectar para evitar inyección intravascular", "Vigilar signos de toxicidad sistémica: acúfenos, sabor metálico, convulsiones", "Control de TA y FC post-administración", "En epidural: vigilar nivel sensitivo y motor"],
    unidadId: "u01",
    capituloId: "c01_03",
    nombresComerciales: ["Marcaine", "Sensorcaine", "Bupinest"]
  },
  {
    id: "ropivacaina",
    nombre: "Ropivacaína",
    nombreGenerico: "Ropivacaína",
    nombresComerciales: ["Naropin", "Ropinest"],
    familia: "Anestésicos locales",
    clasificacion: "Anestésico local tipo amida",
    mecanismoAccion: "Bloquea canales de sodio dependientes de voltaje. Enantiómero S puro con menor cardiotoxicidad y neurotoxicidad que bupivacaína. A concentraciones bajas produce bloqueo sensitivo diferencial (menos bloqueo motor).",
    indicaciones: ["Anestesia epidural (cirugía y analgesia obstétrica)", "Bloqueo de nervios periféricos", "Infiltración local", "Analgesia postoperatoria", "Bloqueo del plano transverso abdominal (TAP)"],
    contraindicaciones: ["Hipersensibilidad a anestésicos tipo amida", "Anestesia IV regional", "Bloqueo paracervical obstétrico", "Hipovolemia"],
    efectosAdversos: ["Hipotensión", "Bradicardia", "Náuseas", "Parestesias", "Retención urinaria", "Cardiotoxicidad (menor que bupivacaína)"],
    interacciones: ["Otros anestésicos locales (toxicidad aditiva)", "Fluvoxamina (inhibe CYP1A2, aumenta niveles)", "Betabloqueantes"],
    viaAdministracion: ["Epidural", "Infiltración", "Bloqueo nervioso"],
    dosis: {
      adulto: "Epidural cirugía: 15-25 mL de 0.75-1%. Epidural analgesia: 10-20 mL de 0.2%. Bloqueo nervioso: 10-40 mL de 0.5-0.75%.",
      pediatrico: "Epidural caudal: 1 mL/kg de 0.2%. Máximo 3 mg/kg",
      geriatrico: "Reducir dosis. Inicio más rápido por cambios en espacio epidural.",
      ajusteRenal: "No requiere ajuste",
      ajusteHepatico: "Precaución en insuficiencia hepática grave"
    },
    presentaciones: ["Ampolla 0.2% 20 mL", "Ampolla 0.5% 20 mL", "Ampolla 0.75% 20 mL", "Ampolla 1% 20 mL", "Bolsa infusión 0.2% 200 mL"],
    embarazo: "B",
    lactancia: "Compatible. Menor paso a leche materna que bupivacaína.",
    cuidadosEnfermeria: ["Menor riesgo cardiotóxico que bupivacaína — preferida en muchos centros", "Vigilar bloqueo motor (a dosis bajas predomina bloqueo sensitivo)", "Monitorizar signos vitales cada 5 min durante administración", "Aspirar antes de cada inyección", "Tener emulsión lipídica disponible", "En epidural obstétrica: vigilar dinámica uterina y FCF"],
    unidadId: "u01",
    capituloId: "c01_03"
  },
  {
    id: "levobupivacaina",
    nombre: "Levobupivacaína",
    nombreGenerico: "Levobupivacaína",
    nombresComerciales: ["Chirocaine"],
    familia: "Anestésicos locales",
    clasificacion: "Anestésico local tipo amida",
    mecanismoAccion: "Enantiómero S(-) de bupivacaína. Bloquea canales de sodio. Perfil farmacológico similar a bupivacaína pero con menor cardiotoxicidad y neurotoxicidad. Potencia anestésica equivalente.",
    indicaciones: ["Anestesia epidural", "Anestesia intratecal", "Bloqueo de nervios periféricos", "Infiltración local", "Analgesia obstétrica"],
    contraindicaciones: ["Hipersensibilidad a anestésicos amida", "Anestesia IV regional", "Hipovolemia severa"],
    efectosAdversos: ["Hipotensión", "Náuseas y vómitos", "Bradicardia", "Parestesias", "Cefalea", "Mareo"],
    interacciones: ["Otros anestésicos locales", "CYP3A4 e CYP1A2 inhibidores", "Betabloqueantes"],
    viaAdministracion: ["Epidural", "Intratecal", "Infiltración", "Bloqueo nervioso"],
    dosis: {
      adulto: "Epidural: 15-30 mL de 0.25-0.5%. Intratecal: 3 mL de 0.5%. Similar a bupivacaína.",
      pediatrico: "Similar a bupivacaína. Máximo 2 mg/kg.",
      geriatrico: "Reducir dosis 30-50%",
      ajusteRenal: "No requiere ajuste significativo",
      ajusteHepatico: "Reducir dosis en insuficiencia hepática"
    },
    presentaciones: ["Ampolla 0.25% 10 mL", "Ampolla 0.5% 10 mL", "Ampolla 0.75% 10 mL"],
    embarazo: "B",
    lactancia: "Probablemente compatible. Datos limitados.",
    cuidadosEnfermeria: ["Perfil de seguridad cardíaco superior a bupivacaína racémica", "Mismo protocolo de vigilancia que bupivacaína", "Tener emulsión lipídica 20% disponible", "Aspirar antes de inyectar", "Monitorizar ECG y signos vitales"],
    unidadId: "u01",
    capituloId: "c01_03"
  },

  // === ANTICOAGULANTS (c10_01 - Anticoagulantes y Antiagregantes, u10) ===
  {
    id: "tirofiban",
    nombre: "Tirofibán",
    nombreGenerico: "Tirofibán",
    nombresComerciales: ["Aggrastat"],
    familia: "Antiagregantes plaquetarios",
    clasificacion: "Inhibidor de GP IIb/IIIa",
    mecanismoAccion: "Antagonista reversible no peptídico del receptor de glucoproteína IIb/IIIa plaquetario. Bloquea la vía final común de agregación plaquetaria al impedir la unión del fibrinógeno al receptor activado.",
    indicaciones: ["Síndrome coronario agudo sin elevación del ST", "Intervencionismo coronario percutáneo de alto riesgo", "Trombosis aguda durante angioplastia"],
    contraindicaciones: ["Sangrado activo o diátesis hemorrágica", "ACV en últimos 30 días", "Cirugía mayor reciente (6 semanas)", "Trombocitopenia", "Hipertensión severa no controlada", "Aneurisma intracraneal"],
    efectosAdversos: ["Sangrado (mayor y menor)", "Trombocitopenia", "Náuseas", "Cefalea", "Fiebre", "Reacción en sitio de infusión"],
    interacciones: ["Anticoagulantes (aumenta riesgo sangrado)", "AINEs", "Trombolíticos", "Otros antiagregantes"],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "Bolo: 25 mcg/kg en 5 min. Infusión: 0.15 mcg/kg/min durante 18-24h.",
      pediatrico: "No establecida en pediatría",
      geriatrico: "Mismo régimen. Mayor vigilancia de sangrado.",
      ajusteRenal: "ClCr <60: reducir infusión a 0.075 mcg/kg/min",
      ajusteHepatico: "Precaución en insuficiencia hepática grave"
    },
    presentaciones: ["Solución para infusión 0.05 mg/mL 250 mL", "Concentrado 0.25 mg/mL 50 mL"],
    embarazo: "B",
    lactancia: "Evitar. No hay datos en humanos.",
    cuidadosEnfermeria: ["Administrar SOLO por vía IV con bomba de infusión", "Monitorizar plaquetas a las 6h del inicio y diariamente", "Vigilar signos de sangrado: hematuria, melena, equimosis", "No mezclar con diazepam en la misma línea", "Mantener accesos venosos mínimos", "Controlar ACT/TTPa según protocolo"],
    unidadId: "u10",
    capituloId: "c10_01"
  },
  {
    id: "dabigatran",
    nombre: "Dabigatrán",
    nombreGenerico: "Dabigatrán etexilato",
    nombresComerciales: ["Pradaxa"],
    familia: "Anticoagulantes orales directos",
    clasificacion: "Inhibidor directo de trombina",
    mecanismoAccion: "Profármaco que se convierte en dabigatrán, un inhibidor directo, competitivo y reversible de la trombina (factor IIa) libre y unida al coágulo. No requiere monitorización rutinaria de INR.",
    indicaciones: ["Prevención de ictus en fibrilación auricular no valvular", "Tratamiento y prevención de TVP/TEP", "Profilaxis de TVP tras artroplastia de rodilla/cadera"],
    contraindicaciones: ["Sangrado activo", "Insuficiencia renal grave (ClCr <30)", "Prótesis valvulares mecánicas", "Lesiones con riesgo de sangrado significativo", "Tratamiento concomitante con ketoconazol sistémico, ciclosporina, itraconazol o dronedarona"],
    efectosAdversos: ["Sangrado (mayor y menor)", "Dispepsia", "Dolor abdominal", "Diarrea", "Náuseas", "Gastritis"],
    interacciones: ["Inhibidores P-gp (ketoconazol, verapamilo, amiodarona): aumentan niveles", "Inductores P-gp (rifampicina): reducen niveles", "Antiagregantes y AINEs: aumentan riesgo sangrado"],
    viaAdministracion: ["Oral"],
    dosis: {
      adulto: "FA: 150 mg c/12h. TVP profilaxis: 220 mg/día (110 mg el primer día). TVP tratamiento: 150 mg c/12h.",
      pediatrico: "No aprobado en <18 años para la mayoría de indicaciones",
      geriatrico: ">80 años: 110 mg c/12h. 75-80 años: valorar 110 mg c/12h.",
      ajusteRenal: "ClCr 30-50: 110-150 mg c/12h según indicación. ClCr <30: contraindicado.",
      ajusteHepatico: "Contraindicado en hepatopatía con coagulopatía"
    },
    presentaciones: ["Cápsula 75 mg", "Cápsula 110 mg", "Cápsula 150 mg"],
    embarazo: "C",
    lactancia: "Evitar. Se desconoce excreción en leche.",
    cuidadosEnfermeria: ["Las cápsulas NO deben abrirse ni triturarse (altera biodisponibilidad)", "No requiere monitorización rutinaria de INR", "Antídoto específico: idarucizumab (Praxbind) 5 g IV", "Vigilar función renal periódicamente (cada 6-12 meses)", "Educar al paciente sobre signos de sangrado", "Suspender 24-48h antes de cirugía según ClCr"],
    unidadId: "u10",
    capituloId: "c10_01"
  },
  {
    id: "rivaroxaban",
    nombre: "Rivaroxabán",
    nombreGenerico: "Rivaroxabán",
    nombresComerciales: ["Xarelto"],
    familia: "Anticoagulantes orales directos",
    clasificacion: "Inhibidor directo del factor Xa",
    mecanismoAccion: "Inhibidor directo, selectivo y reversible del factor Xa, tanto libre como unido al complejo protrombinasa. Interrumpe la vía intrínseca y extrínseca de la cascada de coagulación, inhibiendo la formación de trombina y desarrollo del trombo.",
    indicaciones: ["Prevención de ictus en FA no valvular", "Tratamiento y prevención de TVP/TEP", "Profilaxis de TVP tras cirugía ortopédica", "Prevención de eventos aterotrombóticos post-SCA", "Enfermedad arterial coronaria/periférica (dosis vascular)"],
    contraindicaciones: ["Sangrado activo clínicamente significativo", "Hepatopatía con coagulopatía y riesgo de sangrado", "Embarazo y lactancia", "Lesiones con alto riesgo de sangrado"],
    efectosAdversos: ["Sangrado", "Anemia", "Náuseas", "Elevación de transaminasas", "Mareo", "Cefalea", "Estreñimiento"],
    interacciones: ["Inhibidores potentes CYP3A4/P-gp (azoles, ritonavir): aumentan niveles", "Rifampicina, fenitoína, carbamazepina: reducen niveles", "AINEs, antiagregantes: aumentan riesgo sangrado"],
    viaAdministracion: ["Oral"],
    dosis: {
      adulto: "FA: 20 mg/día con comida. TVP/TEP: 15 mg c/12h x 21 días, luego 20 mg/día. Profilaxis ortopédica: 10 mg/día. Dosis vascular: 2.5 mg c/12h + AAS.",
      pediatrico: "Aprobado en >2 años para TVP/TEP (dosis según peso)",
      geriatrico: "No requiere ajuste por edad per se. Valorar función renal.",
      ajusteRenal: "ClCr 15-49: FA 15 mg/día. ClCr <15: no recomendado.",
      ajusteHepatico: "Contraindicado en Child-Pugh B-C con coagulopatía"
    },
    presentaciones: ["Comprimido 2.5 mg", "Comprimido 10 mg", "Comprimido 15 mg", "Comprimido 20 mg", "Suspensión oral 1 mg/mL"],
    embarazo: "X",
    lactancia: "Contraindicado. Se excreta en leche en animales.",
    cuidadosEnfermeria: ["Dosis de 15 y 20 mg DEBEN tomarse CON COMIDA (biodisponibilidad)", "Comprimidos pueden triturarse y mezclar con alimento", "No hay antídoto específico aprobado universalmente (andexanet alfa en algunos países)", "Monitorizar función renal al inicio y periódicamente", "Educar sobre interacciones con alimentos y otros fármacos", "En cirugía: suspender 24h antes (>48h si ClCr <30)"],
    unidadId: "u10",
    capituloId: "c10_01"
  },
  {
    id: "edoxaban",
    nombre: "Edoxabán",
    nombreGenerico: "Edoxabán",
    nombresComerciales: ["Lixiana", "Savaysa"],
    familia: "Anticoagulantes orales directos",
    clasificacion: "Inhibidor directo del factor Xa",
    mecanismoAccion: "Inhibidor directo, selectivo y reversible del factor Xa libre y unido al complejo protrombinasa. Una sola toma diaria. Menor interacción con CYP450 que rivaroxabán.",
    indicaciones: ["Prevención de ictus en FA no valvular", "Tratamiento y prevención de TVP/TEP (tras 5 días de anticoagulante parenteral)"],
    contraindicaciones: ["Sangrado activo", "Hepatopatía con coagulopatía", "Hipertensión no controlada", "Prótesis valvulares mecánicas"],
    efectosAdversos: ["Sangrado", "Anemia", "Erupción cutánea", "Prurito", "Cefalea", "Náuseas", "Elevación de bilirrubina"],
    interacciones: ["Inhibidores P-gp (ciclosporina, dronedarona, eritromicina, ketoconazol): reducir dosis", "Rifampicina: reduce eficacia", "Antiagregantes, AINEs: aumentan sangrado"],
    viaAdministracion: ["Oral"],
    dosis: {
      adulto: "60 mg una vez al día. Reducir a 30 mg/día si: peso ≤60 kg, ClCr 15-50, o uso concomitante de inhibidores P-gp.",
      pediatrico: "No aprobado en pediatría",
      geriatrico: "No ajuste por edad. Valorar peso y función renal.",
      ajusteRenal: "ClCr 15-50: 30 mg/día. ClCr <15: no recomendado.",
      ajusteHepatico: "No recomendado en Child-Pugh B-C"
    },
    presentaciones: ["Comprimido 15 mg", "Comprimido 30 mg", "Comprimido 60 mg"],
    embarazo: "C",
    lactancia: "Evitar. Datos insuficientes.",
    cuidadosEnfermeria: ["Puede tomarse con o sin alimentos (ventaja sobre rivaroxabán)", "Dosis única diaria mejora adherencia", "Vigilar función renal y peso para ajuste de dosis", "Educar sobre signos de alarma de sangrado", "En FA: NO usar si ClCr >95 mL/min (menor eficacia vs warfarina)", "Suspender al menos 24h antes de cirugía"],
    unidadId: "u10",
    capituloId: "c10_01"
  },

  // === CARDIOVASCULAR (c02_07 - Inotrópicos y Vasopresores, u02) ===
  {
    id: "levosimendan",
    nombre: "Levosimendán",
    nombreGenerico: "Levosimendán",
    nombresComerciales: ["Simdax"],
    familia: "Inotrópicos",
    clasificacion: "Sensibilizador al calcio / Inodilatador",
    mecanismoAccion: "Mecanismo triple: (1) Sensibiliza la troponina C al calcio intracelular, aumentando la contractilidad sin incrementar el consumo de oxígeno miocárdico. (2) Abre canales de K-ATP en músculo liso vascular (vasodilatación). (3) Abre canales de K-ATP mitocondriales (cardioprotección). Metabolito activo OR-1896 con vida media de 80h prolonga el efecto hasta 7-9 días.",
    indicaciones: ["Insuficiencia cardíaca aguda descompensada", "Shock cardiogénico (cuando dobutamina es insuficiente)", "Síndrome de bajo gasto cardíaco postcirugía cardíaca", "Destete difícil de soporte inotrópico"],
    contraindicaciones: ["Hipotensión severa (TAS <85 mmHg)", "Taquicardia severa (>120 lpm)", "Obstrucción mecánica al llenado/vaciado ventricular", "Insuficiencia renal grave (ClCr <30)", "Insuficiencia hepática grave"],
    efectosAdversos: ["Hipotensión", "Taquicardia", "Cefalea", "Fibrilación auricular", "Hipopotasemia", "Náuseas", "Insomnio"],
    interacciones: ["Vasodilatadores (hipotensión aditiva)", "Inotrópicos (efecto aditivo)", "No interacciones significativas con digoxina, warfarina o carvedilol"],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "Bolo opcional: 6-12 mcg/kg en 10 min. Infusión: 0.05-0.2 mcg/kg/min durante 24h. El efecto persiste 7-9 días.",
      pediatrico: "Experiencia limitada. Dosis similares al adulto ajustadas por peso.",
      geriatrico: "Mayor precaución por hipotensión. Iniciar sin bolo.",
      ajusteRenal: "ClCr <30: no recomendado. 30-60: precaución.",
      ajusteHepatico: "Reducir dosis en insuficiencia hepática"
    },
    presentaciones: ["Concentrado para infusión 2.5 mg/mL 5 mL"],
    embarazo: "C",
    lactancia: "Evitar. No hay datos.",
    cuidadosEnfermeria: ["SIEMPRE en UCI con monitorización hemodinámica invasiva", "Diluir en SG5% (NO en SSF — incompatible)", "El bolo puede causar hipotensión — omitir si TAS <100", "Efecto persiste 7-9 días tras infusión de 24h (metabolito activo)", "Monitorizar K+ (causa hipopotasemia)", "Vigilar TA continua, FC, ritmo cardíaco, diuresis", "Proteger de la luz durante infusión"],
    unidadId: "u02",
    capituloId: "c02_07"
  },

  // === HEMATOLOGY ===
  {
    id: "eritropoyetina",
    nombre: "Eritropoyetina (EPO)",
    nombreGenerico: "Eritropoyetina alfa",
    nombresComerciales: ["Eprex", "Epogen", "Procrit"],
    familia: "Factores estimulantes de eritropoyesis",
    clasificacion: "Agente estimulante de eritropoyesis (AEE)",
    mecanismoAccion: "Glucoproteína recombinante idéntica a la eritropoyetina humana endógena. Se une al receptor de EPO en progenitores eritroides de médula ósea, estimulando su proliferación, diferenciación y maduración a eritrocitos. Aumenta hemoglobina en 2-6 semanas.",
    indicaciones: ["Anemia asociada a insuficiencia renal crónica (diálisis y prediálisis)", "Anemia inducida por quimioterapia", "Programa de autodonación preoperatoria", "Anemia del prematuro"],
    contraindicaciones: ["Hipertensión no controlada", "Aplasia pura de células rojas (PRCA)", "Hipersensibilidad al producto", "Tromboembolismo no tratado"],
    efectosAdversos: ["Hipertensión", "Eventos tromboembólicos (TVP, TEP, ictus)", "Cefalea", "Artralgias", "Síndrome gripal", "Aplasia pura de células rojas (raro)", "Convulsiones"],
    interacciones: ["Puede requerir aumento de dosis de anticoagulantes", "El hierro es necesario para respuesta óptima", "ACE inhibidores pueden atenuar respuesta"],
    viaAdministracion: ["SC", "IV"],
    dosis: {
      adulto: "IRC: 50-100 UI/kg 3 veces/semana SC/IV. Quimioterapia: 150 UI/kg 3 veces/semana o 40.000 UI/semana SC. Objetivo: Hb 10-12 g/dL.",
      pediatrico: "IRC: 50 UI/kg 3 veces/semana. Prematuros: 250 UI/kg 3 veces/semana SC.",
      geriatrico: "Misma dosis. Mayor riesgo tromboembólico.",
      ajusteRenal: "Es la indicación principal. Ajustar según respuesta Hb.",
      ajusteHepatico: "No requiere ajuste"
    },
    presentaciones: ["Jeringa precargada 1000 UI", "Jeringa precargada 2000 UI", "Jeringa precargada 4000 UI", "Jeringa precargada 10000 UI", "Jeringa precargada 40000 UI"],
    embarazo: "C",
    lactancia: "Probablemente compatible. Uso con precaución.",
    cuidadosEnfermeria: ["NO agitar el vial (desnaturaliza la proteína)", "SC es preferida (menor variabilidad, mayor comodidad)", "Monitorizar Hb semanal al inicio, luego mensual", "Objetivo Hb 10-12 g/dL — NO superar 12 g/dL (riesgo tromboembólico)", "Asegurar depósitos de hierro adecuados (ferritina >100, IST >20%)", "Vigilar TA en cada visita (hipertensión frecuente)", "Conservar refrigerado 2-8°C, no congelar"],
    unidadId: "u10",
    capituloId: "c10_03"
  },
  {
    id: "acido_tranexamico",
    nombre: "Ácido Tranexámico",
    nombreGenerico: "Ácido tranexámico",
    nombresComerciales: ["Amchafibrin", "Espercil", "Lysteda", "Cyklokapron"],
    familia: "Antifibrinolíticos",
    clasificacion: "Inhibidor de la fibrinólisis",
    mecanismoAccion: "Análogo sintético de la lisina. Se une reversiblemente a los sitios de unión de lisina del plasminógeno, impidiendo su unión a la fibrina y su activación a plasmina. Estabiliza el coágulo al inhibir la fibrinólisis. 10 veces más potente que ácido aminocaproico.",
    indicaciones: ["Hemorragia asociada a fibrinólisis (CID, cirugía cardíaca)", "Menorragia", "Hemorragia postparto", "Hemorragia post-extracción dental en anticoagulados", "Epistaxis severa", "Trauma con hemorragia significativa (protocolo CRASH-2)", "Hemofilia (profilaxis de sangrado oral)"],
    contraindicaciones: ["Enfermedad tromboembólica activa", "Hemorragia subaracnoidea", "CID con predominio trombótico", "Insuficiencia renal grave (ajustar dosis)", "Hematuria de vías altas"],
    efectosAdversos: ["Náuseas y vómitos", "Diarrea", "Tromboembolismo (raro)", "Convulsiones (dosis altas IV)", "Alteraciones visuales (uso prolongado)", "Hipotensión (IV rápida)"],
    interacciones: ["Anticoagulantes: efecto antagónico parcial", "Factor IX concentrado: riesgo trombótico", "Anticonceptivos orales: aumentan riesgo tromboembólico"],
    viaAdministracion: ["IV", "Oral", "Tópica"],
    dosis: {
      adulto: "IV: 1 g en 10 min, luego 1 g en 8h (CRASH-2). Oral: 1-1.5 g c/8-12h. Menorragia: 1 g c/6-8h durante menstruación.",
      pediatrico: "IV: 10-15 mg/kg c/8h. Oral: 15-25 mg/kg c/8h.",
      geriatrico: "Ajustar según función renal. Mayor riesgo tromboembólico.",
      ajusteRenal: "ClCr 20-50: reducir 50%. ClCr <20: reducir 75%.",
      ajusteHepatico: "No requiere ajuste"
    },
    presentaciones: ["Ampolla 500 mg/5 mL", "Comprimido 500 mg", "Comprimido 650 mg"],
    embarazo: "B",
    lactancia: "Compatible. Se excreta en leche en concentración muy baja.",
    cuidadosEnfermeria: ["IV lento: máximo 100 mg/min (hipotensión si rápida)", "En trauma: iniciar en las primeras 3h (CRASH-2)", "NO mezclar con sangre/soluciones con penicilina", "Vigilar signos de trombosis: dolor en extremidad, disnea, dolor torácico", "En cirugía cardíaca: dosis altas pueden causar convulsiones", "Monitorizar creatinina en uso prolongado", "Eficaz como colutorio al 5% post-extracción dental"],
    unidadId: "u10",
    capituloId: "c10_02"
  },
  {
    id: "acido_folico",
    nombre: "Ácido Fólico",
    nombreGenerico: "Ácido fólico",
    nombresComerciales: ["Acfol", "Aspol", "Folvite", "Zolico"],
    familia: "Vitaminas del complejo B",
    clasificacion: "Vitamina B9 / Suplemento antianémico",
    mecanismoAccion: "Vitamina hidrosoluble esencial. Se convierte en ácido tetrahidrofólico, cofactor necesario para la síntesis de purinas, pirimidinas y aminoácidos. Imprescindible para la eritropoyesis normal, síntesis de ADN y desarrollo del tubo neural fetal.",
    indicaciones: ["Anemia megaloblástica por déficit de folato", "Prevención de defectos del tubo neural en embarazo", "Suplemento en embarazo y lactancia", "Anemia hemolítica crónica", "Suplemento con metotrexato", "Alcoholismo crónico"],
    contraindicaciones: ["Anemia perniciosa no diagnosticada (enmascara déficit B12)", "Hipersensibilidad al ácido fólico"],
    efectosAdversos: ["Muy bien tolerado", "Raramente: reacciones alérgicas", "Alteraciones del sueño", "Irritabilidad", "Flatulencia"],
    interacciones: ["Metotrexato: el ácido fólico reduce toxicidad (pero ácido folínico es más eficaz como rescate)", "Fenitoína, carbamazepina: reducen niveles de folato", "Sulfasalazina: reduce absorción de folato"],
    viaAdministracion: ["Oral", "IM", "IV", "SC"],
    dosis: {
      adulto: "Déficit: 5 mg/día durante 4 meses. Prevención embarazo: 0.4-0.8 mg/día. Con metotrexato: 5 mg semanal.",
      pediatrico: "<1 año: 0.5 mg/día. 1-10 años: 1 mg/día. >10 años: 5 mg/día.",
      geriatrico: "Misma dosis. Considerar déficit combinado B12+folato.",
      ajusteRenal: "En diálisis: suplementar 1 mg/día (se pierde con diálisis).",
      ajusteHepatico: "No requiere ajuste"
    },
    presentaciones: ["Comprimido 0.4 mg", "Comprimido 1 mg", "Comprimido 5 mg", "Ampolla 5 mg/mL"],
    embarazo: "A",
    lactancia: "Compatible. Requerimientos aumentados durante lactancia.",
    cuidadosEnfermeria: ["SIEMPRE descartar déficit de B12 antes de tratar con folato solo (enmascara anemia perniciosa y progresa daño neurológico)", "Iniciar suplementación preconcepcional (al menos 1 mes antes)", "En antecedente de DTN previo: dosis alta 4 mg/día preconcepcional", "Monitorizar hemograma y reticulocitos a las 2 semanas", "Educar sobre fuentes alimentarias: verduras verdes, legumbres, hígado", "Compatible con hierro oral (frecuente déficit combinado)"],
    unidadId: "u10",
    capituloId: "c10_03"
  },

  // === HOSPITAL (c12_07 - Fluidoterapia y Electrolitos, u12) ===
  {
    id: "albumina_humana",
    nombre: "Albúmina Humana",
    nombreGenerico: "Albúmina humana",
    nombresComerciales: ["Albunorm", "Albutein", "Grifols Albumina", "Flexbumin"],
    familia: "Expansores plasmáticos",
    clasificacion: "Derivado plasmático / Coloide",
    mecanismoAccion: "Proteína plasmática que mantiene el 75-80% de la presión oncótica intravascular. Expande el volumen plasmático al atraer agua del espacio intersticial al intravascular. 1 g de albúmina retiene aproximadamente 18 mL de agua. También transporta fármacos, bilirrubina, ácidos grasos y hormonas.",
    indicaciones: ["Hipoalbuminemia con edema o ascitis refractaria", "Síndrome nefrótico (peritonitis bacteriana espontánea)", "Paracentesis de gran volumen (>5L)", "Quemaduras extensas (>24h)", "Shock hipovolémico cuando cristaloides son insuficientes", "Plasmaféresis como líquido de reposición"],
    contraindicaciones: ["Insuficiencia cardíaca descompensada", "Alergia a proteínas plasmáticas", "Anemia grave"],
    efectosAdversos: ["Sobrecarga de volumen/edema pulmonar", "Reacciones alérgicas", "Náuseas", "Fiebre", "Escalofríos", "Urticaria", "Hipotensión (infusión rápida)"],
    interacciones: ["No mezclar con otros fármacos en la misma línea", "IECA: mayor riesgo de reacciones anafilactoides"],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "Hipovolemia: 25 g (500 mL al 5% o 100 mL al 25%). Paracentesis: 6-8 g por litro extraído >5L. PBE: 1.5 g/kg día 1 + 1 g/kg día 3.",
      pediatrico: "0.5-1 g/kg/dosis. Máximo velocidad 5 mL/min (5%) o 2 mL/min (20-25%)",
      geriatrico: "Precaución con velocidad de infusión. Riesgo de sobrecarga.",
      ajusteRenal: "Precaución en insuficiencia renal (riesgo sobrecarga)",
      ajusteHepatico: "Principal indicación en cirrosis. Ajustar según protocolo."
    },
    presentaciones: ["Frasco 5% 250 mL", "Frasco 5% 500 mL", "Frasco 20% 50 mL", "Frasco 20% 100 mL", "Frasco 25% 50 mL"],
    embarazo: "C",
    lactancia: "Compatible. Proteína endógena.",
    cuidadosEnfermeria: ["Al 5%: se puede infundir más rápido (expansión 1:1)", "Al 20-25%: infundir lento (máx 2 mL/min), atrae líquido intersticial (expansión 1:4)", "NO calentar (desnaturaliza proteína) — atemperar a ambiente", "Vigilar signos de sobrecarga: disnea, crepitantes, ingurgitación yugular", "Usar dentro de 4h tras abrir (sin conservantes)", "NO mezclar con otros fármacos", "Monitorizar PVC/TA durante infusión en críticos"],
    unidadId: "u12",
    capituloId: "c12_07"
  },

  // === ANTICONVULSANTS (c01_04, u01) ===
  {
    id: "fenitoina",
    nombre: "Fenitoína",
    nombreGenerico: "Fenitoína",
    nombresComerciales: ["Dilantin", "Epamin", "Sinergina"],
    familia: "Anticonvulsivantes",
    clasificacion: "Antiepiléptico (hidantoína)",
    mecanismoAccion: "Estabiliza las membranas neuronales bloqueando canales de sodio dependientes de voltaje en estado inactivado. Reduce la propagación de descargas epileptiformes sin afectar el foco. Cinética no lineal (saturación enzimática) — pequeños cambios de dosis producen grandes cambios en niveles plasmáticos. Nota: fármaco clásico con margen terapéutico estrecho, progresivamente sustituido por antiepilépticos más modernos (levetiracetam, lacosamida).",
    indicaciones: ["Crisis convulsivas tónico-clónicas generalizadas", "Status epilepticus (segunda línea tras benzodiacepinas)", "Crisis parciales complejas", "Convulsiones post-neurocirugía", "Arritmias por intoxicación digitálica"],
    contraindicaciones: ["Bradicardia sinusal/bloqueo AV", "Síndrome de Stokes-Adams", "Porfiria", "Hipersensibilidad a hidantoínas"],
    efectosAdversos: ["Nistagmo", "Ataxia", "Hiperplasia gingival", "Hirsutismo", "Acné", "Neuropatía periférica", "Osteomalacia", "Síndrome de Stevens-Johnson (raro)", "Anemia megaloblástica", "Arritmias (IV rápida)", "Síndrome del guante púrpura (extravasación IV)"],
    interacciones: ["Múltiples interacciones CYP2C9/CYP2C19: warfarina, fluconazol, omeprazol aumentan niveles", "Rifampicina, carbamazepina reducen niveles", "Reduce eficacia de: anticonceptivos, corticoides, ciclosporina", "Ácido valproico: interacción compleja bidireccional"],
    viaAdministracion: ["IV", "Oral"],
    dosis: {
      adulto: "Oral: 300-400 mg/día (dividido o dosis única). Carga IV: 15-20 mg/kg a máx 50 mg/min. Nivel terapéutico: 10-20 mcg/mL.",
      pediatrico: "Oral: 5-8 mg/kg/día dividido en 2-3 tomas. IV carga: 15-20 mg/kg a máx 1-3 mg/kg/min.",
      geriatrico: "Reducir dosis. Mayor sensibilidad. Niveles más frecuentes.",
      ajusteRenal: "Fracción libre aumenta en uremia. Monitorizar niveles libres.",
      ajusteHepatico: "Reducir dosis. Metabolismo hepático. Monitorizar niveles."
    },
    presentaciones: ["Cápsula 100 mg", "Suspensión oral 125 mg/5 mL", "Ampolla 250 mg/5 mL (50 mg/mL)"],
    embarazo: "D",
    lactancia: "Compatible con precaución. Se excreta en leche. Monitorizar lactante.",
    cuidadosEnfermeria: ["IV: máximo 50 mg/min adulto, 1-3 mg/kg/min niño (RIESGO ARRITMIA/HIPOTENSIÓN)", "IV: diluir SOLO en SSF (precipita en SG5%)", "Monitorizar ECG continuo durante administración IV", "NUNCA por vía IM (cristaliza, necrosis muscular)", "Vigilar sitio IV: extravasación causa 'síndrome del guante púrpura'", "Niveles séricos periódicos (cinética no lineal)", "Higiene bucal estricta (hiperplasia gingival)", "Educación: no suspender bruscamente"],
    unidadId: "u01",
    capituloId: "c01_04"
  }
];

// Add drugs and update categories
let added = 0;
for (const drug of newDrugs) {
  if (existingIds.has(drug.id)) {
    console.log(`SKIP: ${drug.id} already exists`);
    continue;
  }
  drugs.push(drug);
  existingIds.add(drug.id);
  added++;

  // Update categories
  for (const u of cats.unidades) {
    for (const c of u.capitulos) {
      if (c.id === drug.capituloId) {
        if (!c.drugIds.includes(drug.id)) {
          c.drugIds.push(drug.id);
        }
      }
    }
  }
}

// Save
fs.writeFileSync(drugsPath, JSON.stringify(drugs, null, 2), 'utf8');
fs.writeFileSync(catsPath, JSON.stringify(cats, null, 2), 'utf8');

console.log(`Added ${added} new drugs. Total: ${drugs.length}`);
