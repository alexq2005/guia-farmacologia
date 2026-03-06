const fs = require('fs');
const path = require('path');
const drugsPath = path.join(__dirname, '..', 'src', 'data', 'drugs.json');
const catsPath = path.join(__dirname, '..', 'src', 'data', 'categories.json');
const drugs = JSON.parse(fs.readFileSync(drugsPath, 'utf8'));
const cats = JSON.parse(fs.readFileSync(catsPath, 'utf8'));

const newDrugs = [
  {
    id: "acido_tranexamico", nombre: "Ácido Tranexámico", nombreGenerico: "Ácido tranexámico",
    nombresComerciales: ["Amchafibrin", "Espercil", "Tranexam"],
    familia: "Antifibrinolíticos", clasificacion: "Antihemorrágico — inhibidor de la fibrinólisis",
    mecanismoAccion: "Análogo sintético de la lisina que inhibe competitivamente la activación del plasminógeno a plasmina, bloqueando la fibrinólisis. Estabiliza el coágulo ya formado, reduciendo el sangrado. No promueve la formación de nuevos coágulos.",
    indicaciones: ["Hemorragia postparto", "Hemorragia traumática (protocolo CRASH-2: <3h del trauma)", "Menorragia/sangrado menstrual abundante", "Cirugía cardíaca y ortopédica (reducción sangrado)", "Sangrado asociado a fibrinólisis", "Epistaxis refractaria", "Hemorragia digestiva (uso selectivo)", "Angioedema hereditario (profilaxis)"],
    contraindicaciones: ["Enfermedad tromboembólica activa (TEP, TVP, ACV)", "Antecedente de convulsiones", "Coagulación intravascular diseminada (CID)", "Insuficiencia renal severa (ajustar dosis)", "Hematuria de origen renal superior (riesgo obstrucción ureteral)"],
    efectosAdversos: ["Náuseas y vómitos", "Diarrea", "Cefalea", "Hipotensión (IV rápida)", "Convulsiones (dosis altas)", "Trombosis (raro)", "Alteraciones visuales (uso prolongado)"],
    interacciones: ["Anticoagulantes: puede reducir su efecto", "Anticonceptivos orales: mayor riesgo trombótico", "Factor IX: riesgo de trombosis", "Concentrado de complejo protrombínico: mayor riesgo trombótico"],
    viaAdministracion: ["IV", "VO"],
    dosis: {
      adulto: "Hemorragia: 1 g IV en 10 min, luego 1 g en 8h. Menorragia: 1-1.5 g VO c/8h (3-4 días). Trauma (CRASH-2): 1 g IV en 10 min + 1 g en 8h. Cirugía: 10-15 mg/kg IV pre-incisión",
      pediatrico: "15-25 mg/kg/dosis IV c/8h. VO: 25 mg/kg/dosis c/8h"
    },
    presentaciones: ["Ampolla 500 mg/5 mL", "Ampolla 1 g/10 mL", "Comprimidos 500 mg", "Comprimidos 650 mg"],
    embarazo: "B", lactancia: "Compatible",
    cuidadosEnfermeria: ["IV lenta: mínimo 10 minutos (riesgo hipotensión y mareo si rápida)", "NO mezclar con sangre ni soluciones con penicilina", "En trauma: administrar antes de 3h del evento (protocolo CRASH-2)", "Monitorizar signos de trombosis: dolor/edema en piernas, disnea, dolor torácico", "En hemorragia postparto: primera línea junto con oxitocina", "Vigilar convulsiones en dosis altas o insuficiencia renal", "Compatible con SSF y SG5%"],
    farmacocinetica: { biodisponibilidad: "34% VO", vidaMedia: "2-3h", excrecion: "Renal (95% sin metabolizar)", inicioAccion: "IV: inmediato. VO: 2-3h" },
    almacenamiento: "Temperatura ambiente. Proteger de la luz",
    unidadId: "u10", capituloId: "c10_03"
  },
  {
    id: "lidocaina_antiarritmico", nombre: "Lidocaína (Antiarrítmico/Anestésico)", nombreGenerico: "Lidocaína clorhidrato",
    nombresComerciales: ["Xylocaína", "Lidocaína Braun", "Xilocaína"],
    familia: "Antiarrítmicos clase Ib / Anestésicos locales", clasificacion: "Antiarrítmico clase Ib — Anestésico local tipo amida",
    mecanismoAccion: "Bloquea los canales de sodio voltaje-dependientes en estado inactivado, suprimiendo la automaticidad ventricular y elevando el umbral de fibrilación. Como anestésico local, bloquea la conducción nerviosa de forma reversible impidiendo la despolarización.",
    indicaciones: ["Taquicardia ventricular con pulso (si amiodarona no disponible)", "Fibrilación ventricular refractaria (alternativa a amiodarona)", "Anestesia local infiltrativa", "Bloqueo nervioso periférico", "Anestesia tópica de mucosas", "Analgesia IV perioperatoria (infusión continua)"],
    contraindicaciones: ["Alergia a anestésicos tipo amida", "Bloqueo AV de 2° o 3° grado (sin marcapasos)", "Síndrome de Stokes-Adams", "Shock cardiogénico", "Porfiria aguda"],
    efectosAdversos: ["Mareo, somnolencia", "Parestesias peribucales", "Tinnitus", "Temblor, convulsiones (toxicidad)", "Bradicardia", "Hipotensión", "Paro cardíaco (sobredosis)", "Sabor metálico"],
    interacciones: ["Betabloqueantes: aumentan niveles de lidocaína", "Cimetidina: aumenta niveles de lidocaína", "Fenitoína: efectos cardíacos aditivos", "Succinilcolina: potencia el bloqueo neuromuscular", "Antiarrítmicos clase I: efectos aditivos"],
    viaAdministracion: ["IV", "SC", "Tópica", "Infiltración"],
    dosis: {
      adulto: "Antiarrítmico: 1-1.5 mg/kg IV bolo, luego infusión 1-4 mg/min. Infiltración: máx 4.5 mg/kg (sin adrenalina), 7 mg/kg (con adrenalina). Tópica: gel 2%, spray 10%",
      pediatrico: "Antiarrítmico: 1 mg/kg IV bolo, infusión 20-50 mcg/kg/min. Infiltración: máx 4.5 mg/kg"
    },
    presentaciones: ["Ampolla 1% (10 mg/mL) 5-10 mL", "Ampolla 2% (20 mg/mL) 5-20 mL", "Ampolla 2% con epinefrina", "Frasco 2% para infusión 50 mL", "Gel 2% tubo 30 g", "Spray 10% frasco 50 mL", "Parche 5% (Versatis)"],
    embarazo: "B", lactancia: "Compatible",
    cuidadosEnfermeria: ["NUNCA inyectar la presentación con epinefrina IV", "Antídoto para toxicidad sistémica: Intralipid 20% (emulsión lipídica)", "Monitorización ECG continua durante uso IV antiarrítmico", "Vigilar signos de toxicidad: sabor metálico → tinnitus → temblor → convulsiones → paro", "Dosis máxima infiltración: 4.5 mg/kg sin adrenalina, 7 mg/kg con adrenalina", "Rotular claramente: CON o SIN epinefrina", "En RCP: alternativa a amiodarona si esta no disponible"],
    farmacocinetica: { vidaMedia: "1.5-2h", metabolismo: "Hepático (CYP1A2, CYP3A4)", excrecion: "Renal (metabolitos)", inicioAccion: "IV: 1-2 min. Infiltración: 2-5 min. Tópica: 5-15 min", duracion: "IV: 10-20 min (bolo). Infiltración: 1-2h (sin epi), 2-6h (con epi)" },
    almacenamiento: "Temperatura ambiente. Proteger de la luz",
    unidadId: "u02", capituloId: "c02_05"
  },
  {
    id: "acido_folico", nombre: "Ácido Fólico (Vitamina B9)", nombreGenerico: "Ácido fólico",
    nombresComerciales: ["Acfol", "Folidoce", "Zolico", "Aspol"],
    familia: "Vitaminas del complejo B", clasificacion: "Vitamina hidrosoluble — cofactor hematopoyético",
    mecanismoAccion: "Cofactor esencial para la síntesis de ADN y ARN (transferencia de grupos monocarbono). Necesario para la eritropoyesis, síntesis de purinas y pirimidinas, y el metabolismo de aminoácidos (homocisteína → metionina). Su déficit causa anemia megaloblástica y defectos del tubo neural en el feto.",
    indicaciones: ["Anemia megaloblástica por déficit de folato", "Prevención de defectos del tubo neural (preconcepcional y embarazo)", "Suplementación en embarazo y lactancia", "Tratamiento con metotrexato (rescate con ácido folínico)", "Anemia hemolítica crónica", "Diálisis crónica", "Alcoholismo crónico", "Hiperhomocisteinemia"],
    contraindicaciones: ["Anemia perniciosa no tratada (enmascara déficit B12)", "Hipersensibilidad"],
    efectosAdversos: ["Generalmente bien tolerado", "Reacciones alérgicas (raras)", "Molestias GI leves", "Puede enmascarar anemia por déficit de B12"],
    interacciones: ["Metotrexato: el folato reduce su toxicidad (pero también su eficacia antineoplásica)", "Fenitoína: el folato reduce niveles de fenitoína", "Sulfasalazina: reduce absorción de folato", "Trimetoprima: antagoniza el efecto del folato"],
    viaAdministracion: ["VO", "IM", "IV", "SC"],
    dosis: {
      adulto: "Déficit: 5 mg/día VO durante 4 meses. Prevención embarazo: 0.4-0.8 mg/día (desde 1-3 meses preconcepcional). Alto riesgo DTN: 4-5 mg/día. Mantenimiento: 0.4 mg/día",
      pediatrico: "Lactantes: 0.1 mg/día. 1-10 años: 0.4 mg/día. >10 años: como adulto"
    },
    presentaciones: ["Comprimidos 5 mg", "Comprimidos 0.4 mg (400 mcg)", "Ampolla 5 mg/mL", "Comprimidos 10 mg"],
    embarazo: "A", lactancia: "Seguro",
    cuidadosEnfermeria: ["SIEMPRE descartar déficit de B12 antes de tratar con folato solo", "Si déficit B12 + folato: tratar B12 primero (el folato solo enmascara la anemia pero la neuropatía progresa)", "En embarazo: iniciar 1-3 meses ANTES de la concepción", "Con metotrexato: usar ácido folínico (leucovorín), no ácido fólico", "Educación: alimentos ricos en folato (verduras verdes, legumbres, hígado)", "Administrar con o sin alimentos"],
    farmacocinetica: { biodisponibilidad: "~100% VO", vidaMedia: "No aplica (se incorpora a tejidos)", excrecion: "Renal", inicioAccion: "Respuesta hematológica en 3-5 días, corrección completa en 1-2 meses" },
    almacenamiento: "Temperatura ambiente. Proteger de la luz y humedad",
    unidadId: "u10", capituloId: "c10_01"
  },
  {
    id: "acido_tranexamico_topico", nombre: "Ácido Ascórbico (Vitamina C)", nombreGenerico: "Ácido ascórbico",
    nombresComerciales: ["Redoxon", "Cebión", "Cevalin"],
    familia: "Vitaminas", clasificacion: "Vitamina hidrosoluble — antioxidante",
    mecanismoAccion: "Cofactor en múltiples reacciones enzimáticas: síntesis de colágeno (hidroxilación de prolina y lisina), biosíntesis de carnitina y catecolaminas, y absorción de hierro no hemo. Potente antioxidante que neutraliza radicales libres. Su déficit causa escorbuto.",
    indicaciones: ["Escorbuto (déficit severo de vitamina C)", "Suplementación en pacientes críticos/quemados", "Mejora absorción de hierro oral", "Metahemoglobinemia (coadyuvante)", "Déficit nutricional en alcohólicos", "Cicatrización de heridas"],
    contraindicaciones: ["Litiasis renal por oxalato (dosis altas)", "Hemocromatosis", "Déficit de G6PD (dosis altas IV)"],
    efectosAdversos: ["Diarrea (dosis altas)", "Dolor abdominal", "Náuseas", "Cálculos renales de oxalato (>2 g/día)", "Hemólisis en déficit G6PD"],
    interacciones: ["Hierro oral: aumenta absorción (administrar juntos)", "Warfarina: dosis altas pueden reducir efecto anticoagulante", "Deferoxamina: no administrar simultáneamente (toxicidad cardíaca)"],
    viaAdministracion: ["VO", "IV", "IM"],
    dosis: {
      adulto: "Déficit: 100-250 mg VO c/12h. Escorbuto: 1-2 g/día. Sepsis (protocolo): 1.5 g IV c/6h. Suplemento: 60-100 mg/día",
      pediatrico: "Déficit: 100-300 mg/día divididos c/8h. Suplemento: 25-45 mg/día"
    },
    presentaciones: ["Comprimidos 500 mg", "Comprimidos efervescentes 1 g", "Ampolla 500 mg/5 mL", "Ampolla 1 g/5 mL", "Gotas orales 100 mg/mL"],
    embarazo: "A", lactancia: "Seguro",
    cuidadosEnfermeria: ["IV: diluir en SSF o SG5%, administrar lento", "Administrar junto con hierro oral para mejorar su absorción", "Dosis >1 g/día: vigilar función renal y riesgo de litiasis", "Puede interferir con glucómetros (lecturas falsamente elevadas)", "Conservar protegido de la luz (se oxida fácilmente)", "En pacientes críticos: existe evidencia de beneficio en sepsis y quemados"],
    farmacocinetica: { biodisponibilidad: "70-90% VO (se reduce con dosis altas)", excrecion: "Renal", vidaMedia: "10h" },
    almacenamiento: "Temperatura ambiente. Proteger de la luz. Desechar si oscurece",
    unidadId: "u06", capituloId: "c06_05"
  },
  {
    id: "complejo_protrombinico", nombre: "Complejo Protrombínico (CCP)", nombreGenerico: "Concentrado de complejo protrombínico",
    nombresComerciales: ["Octaplex", "Beriplex", "Prothromplex", "Kcentra"],
    familia: "Hemoderivados", clasificacion: "Factor de coagulación — hemoderivado",
    mecanismoAccion: "Contiene factores de coagulación dependientes de vitamina K: II (protrombina), VII, IX y X, además de proteínas C y S. Revierte rápidamente el efecto anticoagulante de los antagonistas de vitamina K (acenocumarol, warfarina) al restablecer los niveles de factores de coagulación.",
    indicaciones: ["Reversión urgente de anticoagulantes anti-vitamina K (hemorragia grave)", "Preparación quirúrgica urgente en pacientes anticoagulados", "Déficit congénito de factores II, VII, IX o X", "Hemorragia intracraneal en pacientes con ACOs", "Coagulopatía en trauma severo"],
    contraindicaciones: ["Hipersensibilidad a los componentes", "CID activa (contraindicación relativa)", "Trombocitopenia inducida por heparina (TIH) tipo II", "Antecedente de TIH"],
    efectosAdversos: ["Tromboembolismo (TVP, TEP, ACV, IAM)", "Reacciones alérgicas", "CID", "Fiebre", "Cefalea"],
    interacciones: ["Heparina: puede contener trazas de heparina", "Ácido tranexámico: precaución (riesgo trombótico aditivo)", "Se administra CON vitamina K IV para efecto sostenido"],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "Según INR: INR 2-4: 25 UI/kg. INR 4-6: 35 UI/kg. INR >6: 50 UI/kg. Máx: 3000 UI. Administrar junto con vitamina K 10 mg IV",
      pediatrico: "Misma dosis por peso que adulto. Uso excepcional"
    },
    presentaciones: ["Vial liofilizado 500 UI + solvente", "Vial liofilizado 1000 UI + solvente"],
    embarazo: "C", lactancia: "Precaución",
    cuidadosEnfermeria: ["Reconstituir según instrucciones del fabricante (no agitar)", "Infundir IV lenta: máx 3 mL/min (ajustar según producto)", "SIEMPRE administrar junto con vitamina K IV (10 mg) para efecto sostenido", "Controlar INR antes y 30 min post-infusión", "Registrar lote y marca (trazabilidad hemoderivado)", "Monitorizar signos de trombosis post-administración", "Mantener refrigerado hasta uso. Usar dentro de 8h de reconstitución"],
    farmacocinetica: { inicioAccion: "10-30 minutos (normalización INR)", vidaMedia: "Variable según factor: II (60h), VII (4-6h), IX (24h), X (30h)", distribucion: "Intravascular" },
    almacenamiento: "Refrigerar 2-8°C. No congelar. Proteger de la luz",
    unidadId: "u10", capituloId: "c10_03"
  },
  {
    id: "inmunoglobulina_anti_d", nombre: "Inmunoglobulina Anti-D", nombreGenerico: "Inmunoglobulina anti-D (Rh)",
    nombresComerciales: ["RhoGAM", "Rhophylac", "Inmunoglobulina Anti-D Grifols", "WinRho"],
    familia: "Inmunoglobulinas específicas", clasificacion: "Inmunoglobulina — prevención de isoinmunización Rh",
    mecanismoAccion: "Anticuerpos IgG anti-D que se unen a los hematíes Rh(D) positivos fetales que hayan pasado a la circulación materna, promoviendo su eliminación antes de que el sistema inmune materno los reconozca y genere anticuerpos propios. Previene la enfermedad hemolítica del recién nacido (EHRN) en embarazos futuros.",
    indicaciones: ["Prevención isoinmunización Rh en madre Rh negativa (semana 28)", "Post-parto si recién nacido Rh positivo (dentro de 72h)", "Post-aborto (espontáneo o provocado)", "Post-amniocentesis o procedimiento invasivo fetal", "Post-embarazo ectópico o molar", "Traumatismo abdominal en embarazo", "Post-transfusión incompatible Rh"],
    contraindicaciones: ["Paciente Rh(D) positiva", "Paciente ya sensibilizada (anti-D positivo)", "Déficit conocido de IgA con anticuerpos anti-IgA"],
    efectosAdversos: ["Dolor en sitio de inyección", "Febrícula", "Malestar general", "Reacción alérgica (rara)", "Anemia hemolítica leve"],
    interacciones: ["Vacunas de virus vivos (sarampión, rubéola, varicela): esperar 3 meses post-anti-D", "No interfiere con vacunas inactivadas"],
    viaAdministracion: ["IM", "IV"],
    dosis: {
      adulto: "Profilaxis prenatal (28 sem): 300 mcg (1500 UI) IM. Post-parto: 300 mcg IM dentro de 72h. Aborto <12 sem: 50-120 mcg. Aborto >12 sem: 300 mcg. Transfusión incompatible: 20 mcg por mL de sangre Rh+ transfundida",
      pediatrico: "No aplicable (uso materno)"
    },
    presentaciones: ["Jeringa precargada 300 mcg (1500 UI)", "Jeringa precargada 50 mcg (250 UI)", "Vial 300 mcg"],
    embarazo: "C", lactancia: "Seguro",
    cuidadosEnfermeria: ["Verificar SIEMPRE: madre Rh NEGATIVA + Coombs indirecto NEGATIVO", "Administrar antes de 72h post-parto/evento (ideal <24h)", "Vía IM: deltoides o glúteo (NUNCA IV con preparados IM)", "Registrar lote en historia clínica de la madre Y del recién nacido", "En parto: enviar sangre de cordón para grupo y Coombs del RN", "Realizar test de Kleihauer-Betke si hemorragia feto-materna significativa", "Conservar refrigerado (2-8°C). No congelar"],
    farmacocinetica: { inicioAccion: "Aclaramiento de hematíes Rh+ en 24-48h", vidaMedia: "23-26 días", distribucion: "Intravascular inicialmente, luego redistribución" },
    almacenamiento: "Refrigerar 2-8°C. No congelar. Proteger de la luz",
    unidadId: "u07", capituloId: "c07_01"
  },
  {
    id: "gelatina_succinilada", nombre: "Gelatina Succinilada", nombreGenerico: "Gelatina fluida modificada",
    nombresComerciales: ["Gelafundina", "Geloplasma", "Gelofusine"],
    familia: "Soluciones coloidales", clasificacion: "Expansor plasmático coloidal — sintético",
    mecanismoAccion: "Coloide sintético derivado de gelatina bovina. Genera presión oncótica que mantiene el volumen intravascular de forma más prolongada que los cristaloides. Su efecto expansor es aproximadamente 1:1 (cada litro infundido expande ~800 mL intravascular). Menor riesgo de alteración de coagulación que los almidones.",
    indicaciones: ["Resucitación con volumen en hipovolemia aguda", "Shock hemorrágico (expansión inicial)", "Reposición de volumen perioperatoria", "Quemaduras (reposición inicial)"],
    contraindicaciones: ["Hipersensibilidad a gelatinas", "Hipervolemia", "Insuficiencia cardíaca severa", "Alteraciones de coagulación severas", "Insuficiencia renal con oliguria/anuria"],
    efectosAdversos: ["Reacción anafilactoide (más frecuente que con cristaloides)", "Prurito", "Urticaria", "Sobrecarga circulatoria", "Hemodilución", "Interferencia con pruebas de grupo sanguíneo (aglutinación)"],
    interacciones: ["Puede interferir con pruebas cruzadas sanguíneas", "Glucósidos cardíacos: la hemodilución reduce efecto", "Aminoglucósidos: mayor nefrotoxicidad por hemodilución"],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "Hipovolemia: 500-1000 mL según respuesta hemodinámica. Máx: 1500-2000 mL/día (20-30 mL/kg)",
      pediatrico: "10-20 mL/kg en bolo. Repetir según respuesta"
    },
    presentaciones: ["Bolsa 500 mL al 4%", "Bolsa 1000 mL al 4%"],
    embarazo: "C", lactancia: "Precaución",
    cuidadosEnfermeria: ["Tener preparado equipo de ANAFILAXIA (mayor incidencia que cristaloides)", "Iniciar infusión lenta los primeros 20 mL (vigilar reacción)", "No utilizar como sustituto de sangre en anemia", "Obtener muestras para grupo sanguíneo ANTES de infundir (interfiere con pruebas cruzadas)", "Monitorizar: TA, FC, PVC, diuresis", "Calentar a temperatura corporal si infusión rápida", "No mezclar con sangre en misma línea"],
    farmacocinetica: { vidaMedia: "Intravascular: 4-5h", excrecion: "Renal (90%)", inicioAccion: "Expansión inmediata", duracion: "3-5 horas" },
    almacenamiento: "Temperatura ambiente. No usar si turbio o con partículas",
    unidadId: "u12", capituloId: "c12_07"
  },
  {
    id: "hidroxietilalmidon", nombre: "Hidroxietilalmidón (HEA/HES)", nombreGenerico: "Hidroxietilalmidón",
    nombresComerciales: ["Voluven", "Volulyte", "Tetraspan"],
    familia: "Soluciones coloidales", clasificacion: "Expansor plasmático coloidal — sintético",
    mecanismoAccion: "Coloide sintético derivado de almidón de maíz. Genera presión oncótica intravascular con efecto expansor 1:1-1.4. Nota: Uso restringido/suspendido en muchos países (EMA 2022, AEMPS) por mayor riesgo de lesión renal aguda y mortalidad en pacientes críticos, especialmente sépticos.",
    indicaciones: ["Hipovolemia aguda cuando cristaloides no son suficientes (uso restringido)", "Resucitación perioperatoria (contexto muy seleccionado)"],
    contraindicaciones: ["Sepsis", "Paciente crítico/UCI", "Insuficiencia renal o diálisis", "Coagulopatía severa", "Hemorragia intracraneal", "Quemados", "Hipervolemia", "Hipersensibilidad", "Trasplante de órgano"],
    efectosAdversos: ["Lesión renal aguda (riesgo aumentado)", "Coagulopatía (altera función plaquetaria y von Willebrand)", "Prurito intenso y prolongado", "Reacciones anafilactoides", "Hemodilución", "Aumento de amilasa sérica (sin significación clínica)"],
    interacciones: ["Aminoglucósidos: mayor nefrotoxicidad", "Anticoagulantes: efecto aditivo en coagulopatía"],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "Máx: 30 mL/kg/día (Voluven 6%). Infundir según necesidad hemodinámica",
      pediatrico: "10-15 mL/kg. Mismo límite de 30 mL/kg/día"
    },
    presentaciones: ["Bolsa 6% 500 mL (Voluven)", "Bolsa 6% 500 mL (Volulyte — en Ringer)"],
    embarazo: "C", lactancia: "No recomendado",
    cuidadosEnfermeria: ["⚠️ USO RESTRINGIDO: prohibido en sepsis, UCI, quemados, insuficiencia renal", "Monitorizar creatinina y diuresis estrechamente", "Máximo 30 mL/kg/día — no usar >24h", "Vigilar sangrado (altera coagulación)", "Obtener grupo sanguíneo ANTES de infundir", "Preferir cristaloides o albúmina como primera línea", "En España: requiere consentimiento informado específico (alerta AEMPS)", "Si disponible: preferir gelatinas o albúmina como coloide alternativo"],
    farmacocinetica: { vidaMedia: "Intravascular: 4-6h. Tisular: semanas-meses (acumulación)", excrecion: "Renal", inicioAccion: "Expansión inmediata", duracion: "4-8 horas" },
    almacenamiento: "Temperatura ambiente. No congelar",
    unidadId: "u12", capituloId: "c12_07"
  },
  {
    id: "concentrado_hematies", nombre: "Concentrado de Hematíes", nombreGenerico: "Concentrado de glóbulos rojos",
    nombresComerciales: ["Concentrado de Hematíes", "Packed Red Blood Cells (pRBC)"],
    familia: "Hemoderivados", clasificacion: "Componente sanguíneo — hemoderivado",
    mecanismoAccion: "Aporta eritrocitos para restaurar la capacidad de transporte de oxígeno. Cada unidad (~300 mL, Hto 55-65%) eleva la hemoglobina aproximadamente 1 g/dL y el hematocrito 3% en un adulto de 70 kg.",
    indicaciones: ["Anemia aguda sintomática (hemorragia)", "Anemia crónica con Hb <7 g/dL (umbral restrictivo)", "Hb <8 g/dL en cardiopatía isquémica o inestabilidad hemodinámica", "Shock hemorrágico", "Exanguinotransfusión neonatal"],
    contraindicaciones: ["Transfusión no indicada clínicamente (Hb >10 g/dL generalmente no requiere)", "Incompatibilidad ABO confirmada"],
    efectosAdversos: ["Reacción transfusional hemolítica aguda (incompatibilidad ABO — GRAVE)", "Reacción febril no hemolítica", "Reacción alérgica/urticarial", "TRALI (lesión pulmonar aguda)", "TACO (sobrecarga circulatoria)", "Infección transmitida por transfusión (muy raro)", "Hiperpotasemia (sangre almacenada)", "Hipocalcemia (citrato)"],
    interacciones: ["NUNCA mezclar con medicamentos en misma línea", "NUNCA infundir con Ringer Lactato (el calcio causa coagulación)", "Solo compatible con SSF 0.9% en misma línea"],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "1 unidad eleva Hb ~1 g/dL. Transfundir según clínica, no solo por cifra. Hemorragia masiva: protocolo de transfusión masiva (1:1:1 con plasma y plaquetas)",
      pediatrico: "10-15 mL/kg por transfusión"
    },
    presentaciones: ["Bolsa ~280-350 mL por unidad", "Concentrado irradiado", "Concentrado leucodepletado", "Concentrado lavado"],
    embarazo: "Compatible cuando indicado", lactancia: "Seguro",
    cuidadosEnfermeria: ["VERIFICACIÓN DE IDENTIDAD: doble check paciente-bolsa-grupo sanguíneo AL PIE DE CAMA", "Registrar: lote, hora inicio/fin, signos vitales pre-intra-post", "Iniciar lento (primeros 15 min a goteo lento) y vigilar reacción", "Controles: TA, FC, Tª a los 0, 15, 30 min y al finalizar", "Si reacción: PARAR inmediatamente, mantener vía con SSF, avisar médico, enviar bolsa a banco de sangre", "Completar transfusión en máximo 4 HORAS (riesgo contaminación bacteriana)", "NO calentar en microondas ni baño maría >37°C", "Usar filtro estándar de 170-200 micras", "Vía exclusiva o solo con SSF 0.9%", "Conservar en banco de sangre hasta momento de uso (2-6°C). Una vez fuera, no devolver si >30 min"],
    farmacocinetica: { inicioAccion: "Aumento de Hb en 15-30 min post-transfusión", vidaMedia: "Hematíes: 120 días (propios), ~25-35 días (transfundidos)", distribucion: "Intravascular" },
    almacenamiento: "Banco de sangre: 2-6°C hasta 42 días (según conservante). No congelar",
    unidadId: "u10", capituloId: "c10_03"
  },
  {
    id: "plasma_fresco_congelado", nombre: "Plasma Fresco Congelado (PFC)", nombreGenerico: "Plasma fresco congelado",
    nombresComerciales: ["PFC", "Fresh Frozen Plasma (FFP)"],
    familia: "Hemoderivados", clasificacion: "Componente sanguíneo — hemoderivado",
    mecanismoAccion: "Contiene todos los factores de coagulación, albúmina, inmunoglobulinas y proteínas plasmáticas. Repone factores de coagulación deficientes, corrigiendo coagulopatías. Cada unidad aporta ~200-250 mL con niveles fisiológicos de todos los factores.",
    indicaciones: ["Hemorragia activa con coagulopatía (INR >1.5)", "Transfusión masiva (protocolo 1:1:1 con CH y plaquetas)", "CID con sangrado activo", "Reversión de ACOs cuando CCP no disponible", "PTT/SHU (plasmaféresis terapéutica)", "Déficit de múltiples factores de coagulación", "Cirugía urgente con coagulopatía"],
    contraindicaciones: ["Corrección de INR sin sangrado activo", "Expansión de volumen (usar cristaloides/coloides)", "Como aporte nutricional", "Coagulopatía corregible con vitamina K (no urgente)", "Incompatibilidad ABO"],
    efectosAdversos: ["TRALI (lesión pulmonar)", "TACO (sobrecarga)", "Reacciones alérgicas", "Reacción febril", "Transmisión infecciosa (muy raro)", "Hipocalcemia (citrato)", "Hipotermia (si no se calienta)"],
    interacciones: ["NUNCA mezclar con medicamentos", "Solo compatible con SSF 0.9% en misma línea"],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "10-15 mL/kg. Habitualmente 2-4 unidades. Transfusión masiva: ratio 1:1:1 (PFC:CH:Plaquetas)",
      pediatrico: "10-15 mL/kg"
    },
    presentaciones: ["Bolsa ~200-250 mL por unidad"],
    embarazo: "Compatible cuando indicado", lactancia: "Seguro",
    cuidadosEnfermeria: ["Descongelar en baño a 30-37°C o dispositivo aprobado (20-30 min)", "Una vez descongelado: transfundir ANTES DE 4-6 HORAS", "Verificar compatibilidad ABO (no requiere Rh)", "Mismos controles que concentrado de hematíes: identidad, signos vitales", "Usar filtro estándar 170-200 micras", "Velocidad: 10-20 mL/min (o según tolerancia hemodinámica)", "Si reacción: parar, SSF, avisar, enviar muestra", "NO recongelar una vez descongelado", "Registrar trazabilidad: lote, hora, volumen"],
    farmacocinetica: { inicioAccion: "Corrección de INR en 30-60 min", distribucion: "Intravascular", vidaMedia: "Variable según factor (VII: 4-6h es el más corto)" },
    almacenamiento: "Congelado a -18°C o menos (hasta 36 meses). Una vez descongelado: 2-6°C máx 24h",
    unidadId: "u10", capituloId: "c10_03"
  },
  {
    id: "concentrado_plaquetas", nombre: "Concentrado de Plaquetas", nombreGenerico: "Concentrado plaquetario",
    nombresComerciales: ["Pool de plaquetas", "Plaquetas de aféresis", "Plaquetaféresis"],
    familia: "Hemoderivados", clasificacion: "Componente sanguíneo — hemoderivado",
    mecanismoAccion: "Aporta plaquetas funcionales para restaurar la hemostasia primaria. Una unidad de aféresis (~200-300 mL) o un pool de buffy-coat (4-6 donantes) eleva el recuento plaquetario en ~30,000-50,000/mcL en un adulto.",
    indicaciones: ["Trombocitopenia severa con sangrado activo", "Profilaxis si plaquetas <10,000/mcL (umbral profiláctico)", "Profilaxis si plaquetas <50,000/mcL antes de procedimiento invasivo", "Profilaxis si plaquetas <100,000/mcL antes de neurocirugía/cirugía ocular", "Transfusión masiva (protocolo 1:1:1)", "Disfunción plaquetaria con sangrado (aunque recuento normal)"],
    contraindicaciones: ["PTT (púrpura trombocitopénica trombótica) — puede empeorar", "Trombocitopenia inducida por heparina (TIH)", "Trombocitopenia inmune (PTI) — generalmente ineficaz"],
    efectosAdversos: ["Reacción febril no hemolítica (más frecuente que con CH)", "Reacciones alérgicas", "Contaminación bacteriana (más frecuente que otros componentes)", "TRALI", "TACO", "Refractariedad plaquetaria (aloinmunización)"],
    interacciones: ["NUNCA mezclar con medicamentos en misma línea", "Solo compatible con SSF 0.9%"],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "1 pool (4-6 unidades) o 1 aféresis. Incremento esperado: 30,000-50,000/mcL. Control plaquetas 1h post-transfusión",
      pediatrico: "10-15 mL/kg"
    },
    presentaciones: ["Bolsa de aféresis ~200-300 mL", "Pool de buffy-coat (4-6 donantes) ~300 mL"],
    embarazo: "Compatible cuando indicado", lactancia: "Seguro",
    cuidadosEnfermeria: ["Conservar a 20-24°C en agitación continua en banco de sangre", "NUNCA refrigerar (destruye función plaquetaria)", "Transfundir en 20-30 minutos (máx 4h)", "Mayor riesgo de contaminación bacteriana que CH (almacenamiento a Tª ambiente)", "Si fiebre/escalofríos durante transfusión: sospechar contaminación bacteriana", "No requiere compatibilidad Rh (pero preferible Rh compatible en mujeres en edad fértil)", "Verificar identidad y grupo ABO", "Control: recuento plaquetario 1h y 24h post-transfusión", "Registrar trazabilidad"],
    farmacocinetica: { inicioAccion: "Aumento de plaquetas en 10-60 min", vidaMedia: "Plaquetas transfundidas: 3-5 días", distribucion: "Intravascular (inicialmente), luego 1/3 al bazo" },
    almacenamiento: "20-24°C en agitación continua. Caducidad: 5-7 días desde extracción",
    unidadId: "u10", capituloId: "c10_03"
  },
  {
    id: "oxigeno_medicinal", nombre: "Oxígeno Medicinal", nombreGenerico: "Oxígeno",
    nombresComerciales: ["Oxígeno medicinal", "O2"],
    familia: "Gases medicinales", clasificacion: "Gas medicinal — soporte vital",
    mecanismoAccion: "Gas esencial para el metabolismo aeróbico celular. La oxigenoterapia aumenta la presión parcial de oxígeno alveolar (PAO2) y la saturación de hemoglobina, mejorando el aporte tisular de O2. En concentraciones al 100%, desplaza el nitrógeno alveolar, útil en neumotórax y embolismo aéreo.",
    indicaciones: ["Hipoxemia (SpO2 <92% o PaO2 <60 mmHg)", "Insuficiencia respiratoria aguda/crónica agudizada", "Shock (cualquier etiología)", "Parada cardiorrespiratoria", "Intoxicación por CO (al 100%)", "Neumotórax (acelera reabsorción)", "Crisis asmática severa", "Periodo perioperatorio"],
    contraindicaciones: ["No hay contraindicación absoluta en emergencia", "Precaución: EPOC retenedores de CO2 (titular SpO2 88-92%)", "Intoxicación por paraquat (empeora daño pulmonar)"],
    efectosAdversos: ["Toxicidad por O2 (FiO2 >60% prolongada): daño alveolar", "Atelectasias por reabsorción (FiO2 100% prolongada)", "Retinopatía del prematuro (neonatos)", "Sequedad de mucosas", "Depresión respiratoria en EPOC retenedores de CO2", "Riesgo de incendio"],
    interacciones: ["Bleomicina: mayor riesgo de toxicidad pulmonar", "Amiodarona: mayor toxicidad pulmonar con FiO2 alta"],
    viaAdministracion: ["Inhalatoria"],
    dosis: {
      adulto: "Titular según SpO2 objetivo: General: 94-98%. EPOC: 88-92%. Emergencia/RCP: 100% inicialmente. Dispositivos: Gafas nasales 1-6 L/min (FiO2 24-44%), Mascarilla Venturi 24-50%, Mascarilla con reservorio 60-90%, Alto flujo nasal hasta 60 L/min",
      pediatrico: "Mismo objetivo SpO2. Neonatos prematuros: SpO2 90-95%. Dispositivos adaptados por edad"
    },
    presentaciones: ["Bala/cilindro de O2 (varios tamaños)", "Toma de pared central", "Concentrador de oxígeno portátil", "Oxígeno líquido"],
    embarazo: "A", lactancia: "Seguro",
    cuidadosEnfermeria: ["TITULAR siempre: objetivo SpO2, no administrar a ciegas", "EPOC retenedores: SpO2 88-92% (no hipeoxigenar → depresión respiratoria)", "Humidificar siempre si flujo >4 L/min (prevenir sequedad de mucosas)", "Verificar flujo real vs. prescrito (caudalímetro)", "NO fumar ni llamas cerca (riesgo de combustión)", "Verificar conexiones y fugas", "En gafas nasales: >6 L/min no aumenta FiO2 significativamente → cambiar dispositivo", "Vigilar piel detrás de orejas y en nariz (lesiones por presión del dispositivo)", "Gasometría arterial para evaluación precisa (SpO2 no es suficiente en todos los casos)", "Anotar: dispositivo, flujo (L/min), FiO2 y SpO2 alcanzada"],
    farmacocinetica: { inicioAccion: "Segundos (aumento de SpO2)", distribucion: "Alveolar → sangre → tejidos", excrecion: "Espiración como CO2 (tras metabolismo)" },
    almacenamiento: "Cilindros en posición vertical, alejados de fuentes de calor. Zona ventilada",
    unidadId: "u04", capituloId: "c04_06"
  }
];

// Fix the vitamin C id
newDrugs[3].id = "acido_ascorbico";

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
