const fs = require('fs');
const path = require('path');
const drugsPath = path.join(__dirname, '..', 'src', 'data', 'drugs.json');
const catsPath = path.join(__dirname, '..', 'src', 'data', 'categories.json');
const drugs = JSON.parse(fs.readFileSync(drugsPath, 'utf8'));
const cats = JSON.parse(fs.readFileSync(catsPath, 'utf8'));

const newDrugs = [
  {
    id: "agua_esteril_inyeccion", nombre: "Agua Estéril para Inyección", nombreGenerico: "Agua para inyección",
    nombresComerciales: ["Agua estéril", "Water for Injection (WFI)"],
    familia: "Solventes y diluyentes", clasificacion: "Vehículo farmacéutico — solvente para reconstitución",
    mecanismoAccion: "Agua purificada, estéril y apirógena, utilizada exclusivamente como diluyente o solvente para la reconstitución de medicamentos liofilizados. No contiene electrolitos ni solutos. Es hipotónica (osmolaridad 0 mOsm/L), por lo que NUNCA debe administrarse IV directamente sin soluto añadido, ya que causa hemólisis y edema celular.",
    indicaciones: ["Reconstitución de medicamentos liofilizados (antibióticos, electrolitos concentrados)", "Diluyente para preparaciones parenterales", "Irrigación estéril de heridas (uso limitado)", "Preparación de soluciones magistrales"],
    contraindicaciones: ["NUNCA administrar IV pura (causa hemólisis masiva)", "No usar como fluido de reposición de volumen", "No usar para diluir albúmina concentrada"],
    efectosAdversos: ["Hemólisis aguda (si se administra IV pura)", "Hiponatremia severa (si se administra sin soluto)", "Edema cerebral (por hipotonicidad)"],
    interacciones: ["Verificar compatibilidad con cada medicamento a reconstituir", "Algunos fármacos requieren SSF como diluyente, NO agua estéril"],
    viaAdministracion: ["IV (solo como vehículo, NUNCA sola)"],
    dosis: {
      adulto: "Según medicamento a reconstituir. Habitualmente 5-20 mL por vial",
      pediatrico: "Según medicamento a reconstituir"
    },
    presentaciones: ["Ampolla 5 mL", "Ampolla 10 mL", "Ampolla 20 mL", "Frasco 100-500 mL (irrigación)"],
    embarazo: "A", lactancia: "Seguro",
    cuidadosEnfermeria: ["⚠️ NUNCA infundir IV pura — causa HEMÓLISIS FATAL", "Rotular claramente: 'NO ADMINISTRAR DIRECTAMENTE'", "Usar solo para reconstitución de medicamentos liofilizados", "NO confundir con SSF 0.9% (la SSF sí puede infundirse sola)", "NO usar para diluir albúmina al 20-25% (hemólisis)", "Desechar sobrante de ampolla abierta (no conservar)", "Verificar que el medicamento requiere agua estéril y no SSF como diluyente"],
    farmacocinetica: { distribucion: "Se distribuye según el soluto añadido", excrecion: "Renal" },
    almacenamiento: "Temperatura ambiente. Ampolla de un solo uso",
    unidadId: "u12", capituloId: "c12_07"
  },
  {
    id: "suero_glucosalino", nombre: "Suero Glucosalino", nombreGenerico: "Glucosa 5% + Cloruro de sodio 0.9%",
    nombresComerciales: ["Glucosalino", "Suero glucosalino 1/3", "Suero glucosalino 1/5", "Isofundin glucosado"],
    familia: "Soluciones cristaloides", clasificacion: "Solución de mantenimiento hidroelectrolítico",
    mecanismoAccion: "Solución combinada que aporta simultáneamente agua libre (glucosa), sodio y cloro. La glucosa se metaboliza rápidamente, dejando agua libre que se distribuye al espacio intracelular, mientras que el NaCl mantiene el volumen extracelular. Existen varias proporciones: 1/3 (glucosa 3.3% + NaCl 0.3%), 1/5 (glucosa 4% + NaCl 0.18%), e isotónico (glucosa 5% + NaCl 0.9%).",
    indicaciones: ["Fluidoterapia de mantenimiento", "Prevención de deshidratación en ayuno", "Aporte basal de agua y electrolitos en postoperatorio", "Vehículo para medicación IV continua", "Prevención de cetosis de ayuno (aporte calórico mínimo)"],
    contraindicaciones: ["Diabetes mellitus descompensada (precaución)", "Edema cerebral", "Hipernatremia (glucosalino isotónico)", "Hiponatremia (glucosalino hipotónico)"],
    efectosAdversos: ["Hiperglucemia", "Hiponatremia (con formulaciones hipotónicas)", "Sobrecarga hídrica", "Flebitis (por glucosa)"],
    interacciones: ["Compatible con la mayoría de medicamentos IV", "Incompatible con anfotericina B", "Incompatible con fenitoína (precipita)"],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "Mantenimiento: 1500-2500 mL/24h según peso y pérdidas. Ajustar según glucemia y natremia",
      pediatrico: "Según fórmula Holliday-Segar: 4-2-1 mL/kg/h. Preferir glucosalino 1/3 o isotónico en pediatría"
    },
    presentaciones: ["Bolsa glucosalino isotónico 500-1000 mL", "Bolsa glucosalino 1/3 500-1000 mL", "Bolsa glucosalino 1/5 500-1000 mL"],
    embarazo: "A", lactancia: "Seguro",
    cuidadosEnfermeria: ["Control de glucemia en diabéticos y pacientes críticos", "El glucosalino 1/3 y 1/5 son HIPOTÓNICOS: riesgo de hiponatremia", "En pediatría: las guías actuales prefieren cristaloides isotónicos", "Registrar en balance hídrico como ingreso IV", "Verificar tipo exacto prescrito: isotónico vs 1/3 vs 1/5 (muy diferente osmolaridad)", "No calentar en microondas"],
    farmacocinetica: { distribucion: "LEC (NaCl) + LIC (agua libre de glucosa)", excrecion: "Renal", inicioAccion: "Expansión de volumen inmediata" },
    almacenamiento: "Temperatura ambiente. Desechar sobrante en 24h",
    unidadId: "u12", capituloId: "c12_07"
  },
  {
    id: "peroxido_hidrogeno", nombre: "Peróxido de Hidrógeno (Agua Oxigenada)", nombreGenerico: "Peróxido de hidrógeno",
    nombresComerciales: ["Agua oxigenada", "Hydrogen Peroxide", "Cristalmina Oxigenada"],
    familia: "Antisépticos oxidantes", clasificacion: "Antiséptico — agente oxidante",
    mecanismoAccion: "Agente oxidante que libera oxígeno naciente al contacto con la catalasa tisular, generando efecto efervescente que arrastra mecánicamente detritos y bacterias. Efecto antiséptico de corta duración. Activo contra bacterias anaerobias (por el oxígeno liberado). También tiene efecto hemostático leve en sangrados capilares.",
    indicaciones: ["Limpieza de heridas contaminadas (arrastre mecánico)", "Desbridamiento de tejido necrótico (efecto efervescente)", "Sangrado capilar menor (efecto hemostático)", "Limpieza de úlceras con tejido desvitalizado", "Enjuague bucal diluido (estomatitis, gingivitis)"],
    contraindicaciones: ["Heridas profundas o cavidades cerradas (riesgo embolia gaseosa)", "Irrigación de cavidades corporales (abdomen, vejiga)", "Heridas limpias en fase de granulación (citotóxico para fibroblastos)", "No inyectar"],
    efectosAdversos: ["Irritación local", "Dolor/escozor", "Retraso en cicatrización (uso prolongado)", "Embolia gaseosa (si se usa en cavidades cerradas)", "Quemadura química (concentraciones >3%)"],
    interacciones: ["Se inactiva rápidamente por materia orgánica", "No mezclar con permanganato (reacción violenta)", "Incompatible con yodados"],
    viaAdministracion: ["Tópica"],
    dosis: {
      adulto: "Solución 3% (10 vol): aplicar directamente sobre herida. Enjuague bucal: diluir 1:1 con agua",
      pediatrico: "Misma concentración con precaución"
    },
    presentaciones: ["Frasco 3% (10 vol) 250-500 mL", "Frasco 10% (uso profesional)", "Spray 3%"],
    embarazo: "A", lactancia: "Seguro (uso tópico)",
    cuidadosEnfermeria: ["NO usar en heridas limpias en granulación (destruye tejido nuevo)", "NO irrigar cavidades cerradas ni heridas profundas (riesgo embolia gaseosa)", "Uso limitado a limpieza INICIAL de heridas sucias", "Efecto antiséptico MUY breve — no es sustituto de clorhexidina/povidona", "Utilidad principal: arrastre mecánico por efervescencia", "Concentraciones >3%: solo uso profesional supervisado", "Las guías actuales prefieren SSF para lavado de heridas y clorhexidina como antiséptico"],
    farmacocinetica: { inicioAccion: "Inmediato (efervescencia al contacto)", duracion: "Segundos-minutos" },
    almacenamiento: "Temperatura ambiente, frasco oscuro. Proteger de la luz y calor",
    unidadId: "u09", capituloId: "c09_04"
  },
  {
    id: "simeticona", nombre: "Simeticona (Dimeticona)", nombreGenerico: "Simeticona",
    nombresComerciales: ["Aerored", "Flatoril", "Imonogas", "Gaseovet"],
    familia: "Antiflatulentos", clasificacion: "Agente antiflatulento — tensioactivo",
    mecanismoAccion: "Polímero de silicona inerte que reduce la tensión superficial de las burbujas de gas en el tracto GI, provocando su coalescencia y facilitando su eliminación por eructo o flatulencia. No se absorbe ni se metaboliza; actúa de forma puramente física.",
    indicaciones: ["Meteorismo y flatulencia", "Distensión abdominal por gases", "Cólico del lactante", "Preparación para ecografía/endoscopia abdominal (reducir gas)", "Postoperatorio abdominal (íleo)"],
    contraindicaciones: ["Hipersensibilidad", "Obstrucción intestinal mecánica"],
    efectosAdversos: ["Prácticamente ninguno (no se absorbe)", "Muy rara: reacción alérgica cutánea"],
    interacciones: ["Puede reducir absorción de levotiroxina (separar 2h)", "No interacciones sistémicas significativas (no se absorbe)"],
    viaAdministracion: ["VO"],
    dosis: {
      adulto: "40-125 mg después de cada comida y al acostarse. Máx: 500 mg/día",
      pediatrico: "Lactantes: 20 mg (0.5 mL) antes de cada toma. Niños: 40 mg c/8h"
    },
    presentaciones: ["Comprimidos masticables 40-120 mg", "Gotas orales 40 mg/mL (frasco 30 mL)", "Cápsulas 120 mg", "Comprimidos 240 mg"],
    embarazo: "C", lactancia: "Seguro (no se absorbe)",
    cuidadosEnfermeria: ["Administrar DESPUÉS de las comidas", "Comprimidos masticables: masticar completamente antes de tragar", "Gotas: agitar bien antes de usar, medir con cuentagotas", "Seguro en lactantes (no se absorbe)", "No confundir con antiácidos — la simeticona NO reduce acidez", "Útil como preparación previa a ecografía abdominal", "Si persisten síntomas: descartar causa orgánica"],
    farmacocinetica: { biodisponibilidad: "0% (no se absorbe)", excrecion: "Heces (inalterada)", inicioAccion: "15-30 min" },
    almacenamiento: "Temperatura ambiente",
    unidadId: "u05", capituloId: "c05_04"
  },
  {
    id: "carbocisteina", nombre: "Carbocisteína", nombreGenerico: "Carbocisteína",
    nombresComerciales: ["Mucodyne", "Mucosan", "Pectox", "Lisomucil"],
    familia: "Mucolíticos", clasificacion: "Mucolítico — mucoregulador",
    mecanismoAccion: "Mucoregulador que normaliza la viscosidad y elasticidad del moco bronquial actuando sobre las células caliciformes. Reduce la producción de mucinas ácidas (sialomucinas) y aumenta las neutras (fucomucinas), restaurando el ratio normal. A diferencia de la acetilcisteína, no rompe puentes disulfuro sino que regula la secreción glandular.",
    indicaciones: ["Bronquitis aguda y crónica con hipersecreción mucosa", "EPOC con expectoración abundante", "Sinusitis con moco espeso", "Otitis media secretora"],
    contraindicaciones: ["Úlcera gastroduodenal activa", "Cistitis hemorrágica", "Hipersensibilidad", "Menores de 2 años"],
    efectosAdversos: ["Molestias gastrointestinales", "Náuseas", "Diarrea", "Epigastralgia", "Cefalea", "Erupciones cutáneas (raro)"],
    interacciones: ["Antitusivos: no combinar (la tos es necesaria para expulsar el moco fluidificado)", "Potencia el efecto de antibióticos en infecciones respiratorias (mejor penetración en moco)"],
    viaAdministracion: ["VO"],
    dosis: {
      adulto: "750 mg c/8h. Máx: 2.25 g/día",
      pediatrico: "2-5 años: 125-250 mg c/8h. 5-12 años: 250 mg c/8h"
    },
    presentaciones: ["Cápsulas 375 mg", "Jarabe 250 mg/5 mL", "Jarabe 50 mg/mL (pediátrico)", "Sobres 2.7 g"],
    embarazo: "B", lactancia: "Compatible",
    cuidadosEnfermeria: ["Administrar preferiblemente después de las comidas (reducir molestia gástrica)", "NO combinar con antitusivos (contraproducente)", "Recomendar ingesta abundante de líquidos (potencia efecto)", "Diferencia con acetilcisteína: la carbocisteína regula el moco, no lo rompe directamente", "Educación: se espera aumento temporal de expectoración (es el efecto deseado)", "Contraindicado en <2 años"],
    farmacocinetica: { biodisponibilidad: "~10% VO", vidaMedia: "1.5-3h", excrecion: "Renal (30-60%)", inicioAccion: "Efecto clínico en 24-48h" },
    almacenamiento: "Temperatura ambiente",
    unidadId: "u04", capituloId: "c04_05"
  },
  {
    id: "codeina", nombre: "Codeína", nombreGenerico: "Codeína fosfato",
    nombresComerciales: ["Codeisan", "Toseína", "Bisoltus"],
    familia: "Opiáceos menores", clasificacion: "Antitusivo central — analgésico opioide débil",
    mecanismoAccion: "Profármaco que se convierte en morfina (10%) por el CYP2D6 hepático. Actúa sobre receptores opioides mu en el centro tusígeno del bulbo raquídeo, suprimiendo el reflejo de la tos. Como analgésico, potencia ~1/10 de la morfina. El efecto depende del fenotipo CYP2D6 del paciente (metabolizadores ultrarrápidos tienen mayor riesgo de toxicidad).",
    indicaciones: ["Tos seca irritativa no productiva", "Dolor leve-moderado (combinada con paracetamol)", "Diarrea (segundo escalón tras loperamida)"],
    contraindicaciones: ["Menores de 12 años", "Adolescentes post-amigdalectomía/adenoidectomía", "Insuficiencia respiratoria", "Asma aguda", "Metabolizadores ultrarrápidos CYP2D6 conocidos", "Lactancia materna", "Íleo paralítico"],
    efectosAdversos: ["Estreñimiento", "Náuseas y vómitos", "Somnolencia", "Mareo", "Depresión respiratoria (metabolizadores ultrarrápidos)", "Dependencia (uso prolongado)", "Retención urinaria"],
    interacciones: ["Depresores del SNC (benzodiacepinas, alcohol): efecto aditivo", "IMAO: crisis hipertensiva — contraindicado", "Inhibidores CYP2D6 (fluoxetina, paroxetina): reducen conversión a morfina (menos efecto)", "Naloxona: revierte efectos"],
    viaAdministracion: ["VO"],
    dosis: {
      adulto: "Antitusivo: 10-20 mg c/4-6h. Máx: 120 mg/día. Analgesia: 30-60 mg c/4-6h (habitualmente con paracetamol). Máx: 240 mg/día",
      pediatrico: "CONTRAINDICADA en <12 años. 12-18 años: 15-30 mg c/6h (máx 60 mg/dosis)"
    },
    presentaciones: ["Comprimidos 28.7 mg", "Jarabe 6.33 mg/5 mL", "Solución oral 10 mg/5 mL", "Combinada: Paracetamol 500 mg + Codeína 30 mg"],
    embarazo: "C", lactancia: "Contraindicada (riesgo neonatal por paso a leche)",
    cuidadosEnfermeria: ["⚠️ CONTRAINDICADA en menores de 12 años (riesgo depresión respiratoria fatal)", "NO usar en tos productiva (la tos es necesaria para eliminar secreciones)", "Vigilar signos de depresión respiratoria: FR <12, somnolencia excesiva", "Advertir sobre somnolencia: no conducir", "Recomendar dieta rica en fibra y líquidos (estreñimiento frecuente)", "Antídoto: naloxona", "Informar que es un opioide: potencial de dependencia", "No combinar con alcohol ni sedantes"],
    farmacocinetica: { biodisponibilidad: "50% VO", vidaMedia: "3-4h", metabolismo: "Hepático: CYP2D6 → morfina (10%), CYP3A4 → norcodeína", excrecion: "Renal", inicioAccion: "30-60 min VO" },
    almacenamiento: "Temperatura ambiente. Estupefaciente (control especial en algunos países)",
    unidadId: "u01", capituloId: "c01_05"
  },
  {
    id: "toxina_botulinica", nombre: "Toxina Botulínica Tipo A", nombreGenerico: "Toxina botulínica tipo A",
    nombresComerciales: ["Botox", "Dysport", "Xeomin", "Bocouture"],
    familia: "Relajantes musculares", clasificacion: "Neurotoxina — bloqueante de unión neuromuscular",
    mecanismoAccion: "Neurotoxina producida por Clostridium botulinum que bloquea la liberación de acetilcolina en la unión neuromuscular al escindir la proteína SNAP-25 del complejo SNARE. Produce parálisis muscular flácida localizada y reversible. También bloquea fibras autonómicas colinérgicas (efecto en hiperhidrosis y vejiga).",
    indicaciones: ["Espasticidad focal (post-ACV, parálisis cerebral)", "Distonía cervical (tortícolis espasmódica)", "Blefaroespasmo", "Espasmo hemifacial", "Hiperhidrosis axilar/palmar severa", "Migraña crónica (>15 días/mes)", "Vejiga hiperactiva refractaria", "Estrabismo", "Uso estético (arrugas de expresión)"],
    contraindicaciones: ["Infección en sitio de inyección", "Miastenia gravis", "Síndrome de Lambert-Eaton", "Hipersensibilidad a albúmina humana o toxina", "Embarazo y lactancia"],
    efectosAdversos: ["Debilidad muscular excesiva local", "Dolor en sitio de inyección", "Disfagia (inyección cervical)", "Ptosis palpebral", "Sequedad bucal", "Cefalea", "Síntomas pseudogripales", "Diseminación a distancia (raro, grave)"],
    interacciones: ["Aminoglucósidos: potencian bloqueo neuromuscular", "Relajantes musculares: efecto aditivo", "Anticoagulantes: mayor riesgo de hematoma en sitio de inyección"],
    viaAdministracion: ["IM (inyección local)"],
    dosis: {
      adulto: "Varía según indicación y músculo. Espasticidad: 75-400 U por sesión (Botox). Migraña: 155-195 U distribuidas en 31-39 puntos. Intervalo mínimo entre sesiones: 12 semanas",
      pediatrico: "Espasticidad: 4-8 U/kg por sesión (máx 200 U). Solo >2 años"
    },
    presentaciones: ["Vial liofilizado Botox 50, 100, 200 U", "Vial Dysport 300, 500 U", "Vial Xeomin 50, 100, 200 U"],
    embarazo: "X", lactancia: "Contraindicada",
    cuidadosEnfermeria: ["Las unidades NO son intercambiables entre marcas (Botox ≠ Dysport ≠ Xeomin)", "Reconstituir con SSF 0.9% SIN conservantes. No agitar (desnaturaliza)", "Conservar reconstituido en refrigerador, usar en 24h", "Administración SOLO por profesional entrenado y con conocimiento anatómico", "Vigilar disfagia/disfonía post-inyección cervical (tener protocolo de aspiración)", "Inicio de efecto: 2-7 días. Máximo efecto: 2-6 semanas", "No repetir antes de 12 semanas (riesgo anticuerpos neutralizantes)", "Educación al paciente: el efecto es TEMPORAL (3-6 meses)"],
    farmacocinetica: { inicioAccion: "2-7 días", duracion: "3-6 meses", distribucion: "Local (difusión limitada desde sitio de inyección)", metabolismo: "Degradación proteolítica local" },
    almacenamiento: "Refrigerar 2-8°C (Botox, Dysport). Xeomin: temperatura ambiente. Reconstituido: refrigerar, usar en 24h",
    unidadId: "u08", capituloId: "c08_03"
  },
  {
    id: "finasterida", nombre: "Finasterida", nombreGenerico: "Finasterida",
    nombresComerciales: ["Proscar", "Propecia", "Finasterida Kern"],
    familia: "Inhibidores de 5-alfa-reductasa", clasificacion: "Antiandrógeno selectivo",
    mecanismoAccion: "Inhibe selectivamente la 5-alfa-reductasa tipo II, enzima que convierte testosterona en dihidrotestosterona (DHT) en próstata, piel y folículo piloso. Reduce los niveles de DHT sérica en un 70%. En hiperplasia prostática, disminuye el volumen prostático un 20-30% en 6-12 meses. En alopecia, revierte la miniaturización folicular.",
    indicaciones: ["Hiperplasia benigna de próstata (HBP) sintomática", "Alopecia androgénica masculina", "Reducción de sangrado prostático preoperatorio", "Reducción de riesgo de retención aguda de orina en HBP"],
    contraindicaciones: ["Mujeres (especialmente embarazadas — teratogénico)", "Niños", "Hipersensibilidad", "Cáncer de próstata (puede enmascarar PSA)"],
    efectosAdversos: ["Disfunción eréctil (3-4%)", "Disminución de libido", "Disminución del volumen eyaculado", "Ginecomastia/mastalgia", "Depresión (reportes post-comercialización)", "Reduce PSA un 50% (ajustar en cribado de cáncer)"],
    interacciones: ["No interacciones farmacológicas clínicamente significativas", "PSA: multiplicar x2 el valor obtenido para interpretar correctamente"],
    viaAdministracion: ["VO"],
    dosis: {
      adulto: "HBP: 5 mg/día. Alopecia: 1 mg/día. Efecto máximo: 6-12 meses de tratamiento continuado",
      pediatrico: "No indicado"
    },
    presentaciones: ["Comprimidos recubiertos 5 mg (Proscar)", "Comprimidos recubiertos 1 mg (Propecia)"],
    embarazo: "X (teratogénico — feminización de feto masculino)", lactancia: "No aplica (uso masculino)",
    cuidadosEnfermeria: ["⚠️ Mujeres embarazadas NO deben manipular comprimidos rotos/triturados (absorción transcutánea → teratógeno)", "Efecto terapéutico tarda 3-6 meses (informar al paciente para adherencia)", "Reduce PSA un 50%: si PSA se solicita, avisar al laboratorio del uso de finasterida", "Educación: si se suspende, los síntomas prostáticos vuelven en 6-8 meses", "Monitorizar: síntomas prostáticos (IPSS), flujo urinario", "Puede donar sangre solo 1 mes después de suspender (riesgo para embarazadas receptoras)"],
    farmacocinetica: { biodisponibilidad: "63% VO", vidaMedia: "6-8h (jóvenes), hasta 14h (>70 años)", metabolismo: "Hepático (CYP3A4)", excrecion: "Heces (57%) y orina (39%)", inicioAccion: "Reducción DHT en 24h. Efecto clínico: 3-6 meses" },
    almacenamiento: "Temperatura ambiente. Proteger de la humedad",
    unidadId: "u07", capituloId: "c07_02"
  },
  {
    id: "dantroleno", nombre: "Dantroleno", nombreGenerico: "Dantroleno sódico",
    nombresComerciales: ["Dantrium", "Dantrolene", "Revonto", "Ryanodex"],
    familia: "Relajantes musculares de acción directa", clasificacion: "Relajante muscular esquelético — antídoto hipertermia maligna",
    mecanismoAccion: "Actúa directamente sobre el músculo esquelético bloqueando el receptor de rianodina (RyR1) en el retículo sarcoplásmico, inhibiendo la liberación de calcio. Reduce la contracción muscular sin afectar la transmisión neuromuscular. En hipertermia maligna, detiene la liberación masiva y descontrolada de calcio que causa la crisis.",
    indicaciones: ["Hipertermia maligna (tratamiento de urgencia)", "Espasticidad severa (lesión medular, esclerosis múltiple, parálisis cerebral)", "Síndrome neuroléptico maligno", "Prevención de hipertermia maligna en pacientes susceptibles"],
    contraindicaciones: ["Hepatopatía activa (VO)", "Espasticidad necesaria para función motora (mantener postura/equilibrio)", "Hipersensibilidad"],
    efectosAdversos: ["Debilidad muscular generalizada", "Somnolencia", "Mareo", "Hepatotoxicidad (uso crónico VO — monitorizar enzimas)", "Diarrea", "Flebitis (IV — pH alcalino)", "Fotosensibilidad"],
    interacciones: ["Verapamilo: combinación puede causar colapso cardiovascular — EVITAR", "Depresores del SNC: efecto aditivo", "Estrógenos: mayor riesgo hepatotoxicidad"],
    viaAdministracion: ["IV", "VO"],
    dosis: {
      adulto: "Hipertermia maligna: 2.5 mg/kg IV bolo, repetir cada 5-10 min hasta control (máx ~10 mg/kg). Espasticidad VO: iniciar 25 mg/día, titular hasta 100 mg c/6h",
      pediatrico: "Hipertermia maligna: misma dosis que adulto (2.5 mg/kg IV). Espasticidad: 0.5 mg/kg c/6h, titular"
    },
    presentaciones: ["Vial liofilizado 20 mg + solvente (3 g manitol por vial)", "Vial Ryanodex 250 mg (reconstitución en 5 mL)", "Cápsulas 25, 50, 100 mg"],
    embarazo: "C", lactancia: "No recomendado",
    cuidadosEnfermeria: ["⚠️ DEBE estar disponible en TODO quirófano (antídoto de hipertermia maligna)", "Reconstitución difícil: requiere 60 mL de agua estéril por vial de 20 mg → agitar vigorosamente", "Para crisis de HM: preparar 36 viales para paciente de 70 kg (costoso y lento)", "Ryanodex: más concentrado, reconstitución más rápida (250 mg en 5 mL)", "IV: usar vena grande (pH 9.5, muy irritante → flebitis)", "NO usar SSF ni SG5% para reconstitución (solo agua estéril)", "Uso crónico VO: función hepática basal y cada 4-8 semanas", "La debilidad muscular es efecto esperado — ajustar para equilibrar espasticidad vs función"],
    farmacocinetica: { biodisponibilidad: "35% VO", vidaMedia: "8-9h", metabolismo: "Hepático", excrecion: "Renal", inicioAccion: "IV: minutos. VO: días-semanas para efecto completo" },
    almacenamiento: "Temperatura ambiente. Proteger de la luz. Reconstituido: usar en 6h",
    unidadId: "u11", capituloId: "c11_01"
  },
  {
    id: "octreotida", nombre: "Octreotida", nombreGenerico: "Octreotida acetato",
    nombresComerciales: ["Sandostatin", "Sandostatin LAR", "Octreotida Genérico"],
    familia: "Análogos de somatostatina", clasificacion: "Análogo de somatostatina — antisecretor",
    mecanismoAccion: "Análogo sintético de la somatostatina con vida media más prolongada. Inhibe la secreción de hormona de crecimiento (GH), insulina, glucagón, péptido vasoactivo intestinal (VIP), gastrina y serotonina. Reduce el flujo sanguíneo esplácnico (vasoconstricción selectiva), útil en hemorragia varicosa. Reduce la secreción de líquidos intestinales.",
    indicaciones: ["Hemorragia digestiva por varices esofágicas", "Acromegalia", "Tumores neuroendocrinos (carcinoide, VIPoma, glucagonoma)", "Diarrea secretora refractaria", "Fístulas pancreáticas/intestinales", "Prevención de complicaciones post-cirugía pancreática", "Crisis carcinoide"],
    contraindicaciones: ["Hipersensibilidad"],
    efectosAdversos: ["Dolor abdominal", "Diarrea/esteatorrea", "Náuseas", "Colelitiasis (uso prolongado — 20-30%)", "Hiperglucemia o hipoglucemia", "Bradicardia", "Dolor en sitio de inyección SC", "Hipotiroidismo (uso prolongado)"],
    interacciones: ["Insulina/antidiabéticos: ajustar dosis (altera glucemia)", "Ciclosporina: reduce absorción", "Betabloqueantes: bradicardia aditiva", "Bromocriptina: aumenta biodisponibilidad"],
    viaAdministracion: ["SC", "IV", "IM (LAR)"],
    dosis: {
      adulto: "Hemorragia varicosa: 25-50 mcg/h IV continua (72h). Acromegalia: 100-200 mcg SC c/8h. Tumores: 50-200 mcg SC c/8-12h. LAR: 20-30 mg IM c/28 días",
      pediatrico: "1-10 mcg/kg/día dividido c/8-12h"
    },
    presentaciones: ["Ampolla 50 mcg/mL (1 mL)", "Ampolla 100 mcg/mL (1 mL)", "Ampolla 500 mcg/mL (1 mL)", "Vial LAR 10, 20, 30 mg (liberación prolongada)"],
    embarazo: "B", lactancia: "Precaución",
    cuidadosEnfermeria: ["En hemorragia varicosa: infusión IV continua con bomba (25-50 mcg/h durante 3-5 días)", "SC: rotar sitios de inyección (abdomen, muslo), no inyectar frío", "Monitorizar glucemia (puede causar hipo o hiperglucemia)", "LAR (mensual): SOLO vía IM glútea profunda, NUNCA IV", "Uso crónico: ecografía vesicular cada 6-12 meses (colelitiasis 20-30%)", "Puede requerir suplemento de enzimas pancreáticas (esteatorrea)", "Conservar ampollas en refrigerador; sacar 30 min antes de inyectar SC"],
    farmacocinetica: { biodisponibilidad: "100% SC", vidaMedia: "1.5-2h (SC/IV). LAR: 28 días", excrecion: "Renal (32%)", inicioAccion: "SC: 30 min. IV: minutos" },
    almacenamiento: "Refrigerar 2-8°C. Proteger de la luz. Ampollas abiertas: usar inmediatamente",
    unidadId: "u06", capituloId: "c06_04"
  },
  {
    id: "hierro_sacarosa_iv", nombre: "Hierro Sacarosa IV", nombreGenerico: "Hierro sacarosa (complejo de hidróxido férrico-sacarosa)",
    nombresComerciales: ["Venofer", "Feriv", "Iron Sucrose"],
    familia: "Antianémicos — hierro parenteral", clasificacion: "Hierro intravenoso — antianémico",
    mecanismoAccion: "Complejo de hidróxido de hierro (III) con sacarosa que libera hierro de forma controlada al sistema reticuloendotelial, donde se incorpora a la ferritina y transferrina para su transporte a la médula ósea. Se utiliza cuando el hierro oral es insuficiente, no tolerado o se necesita reposición rápida de depósitos.",
    indicaciones: ["Anemia ferropénica con intolerancia al hierro oral", "Anemia en insuficiencia renal crónica (hemodiálisis/diálisis peritoneal)", "Déficit de hierro funcional en tratamiento con EPO", "Anemia ferropénica en enfermedad inflamatoria intestinal", "Anemia perioperatoria (reposición rápida)", "Anemia del embarazo (2°-3° trimestre) con intolerancia oral"],
    contraindicaciones: ["Hipersensibilidad a hierro parenteral", "Sobrecarga de hierro (hemocromatosis, hemosiderosis)", "Anemia no ferropénica", "Primer trimestre de embarazo", "Infección activa no controlada"],
    efectosAdversos: ["Reacción anafilactoide (rara pero grave)", "Hipotensión (infusión rápida)", "Náuseas", "Cefalea", "Sabor metálico", "Dolor/flebitis en sitio de inyección", "Artralgia/mialgia", "Tinción marrón de piel (extravasación)"],
    interacciones: ["No administrar con hierro oral simultáneamente (suspender oral 24-48h antes)", "Inhibidores de la ECA: mayor incidencia de reacciones sistémicas (hipotensión)"],
    viaAdministracion: ["IV"],
    dosis: {
      adulto: "200 mg (2 ampollas) diluidas en 200 mL SSF, infundir en 30 min. Dosis total según fórmula de Ganzoni: Fe (mg) = peso × (Hb objetivo - Hb actual) × 2.4 + 500. Máx: 200 mg por sesión, 3 sesiones/semana",
      pediatrico: ">3 años: 3 mg/kg por sesión (máx 200 mg). Infundir en 30-60 min"
    },
    presentaciones: ["Ampolla 100 mg/5 mL (20 mg Fe/mL)", "Ampolla 200 mg/10 mL"],
    embarazo: "B (2°-3° trimestre)", lactancia: "Compatible",
    cuidadosEnfermeria: ["⚠️ Tener preparado equipo de ANAFILAXIA (adrenalina, corticoides, O2)", "Dosis de prueba NO requerida con hierro sacarosa (sí con hierro dextrano)", "Infundir en mínimo 15 min por 100 mg (ideal 30 min para 200 mg)", "Diluir SOLO en SSF 0.9% (no SG5%, no agua estéril)", "Monitorizar TA, FC durante infusión y 30 min post", "Si extravasación: dolor y tinción marrón permanente de la piel", "Vigilar signos de reacción: rubor, disnea, dolor torácico, hipotensión", "Suspender hierro oral 24-48h antes de la infusión", "La ferritina se eleva transitoriamente post-infusión — medir a las 2 semanas"],
    farmacocinetica: { vidaMedia: "6h (eliminación del complejo)", distribucion: "Sistema reticuloendotelial → ferritina/transferrina", excrecion: "Mínima urinaria (<5%)", inicioAccion: "Aumento de reticulocitos en 3-5 días. Hb sube en 2-4 semanas" },
    almacenamiento: "Temperatura ambiente. No congelar. Proteger de la luz",
    unidadId: "u10", capituloId: "c10_01"
  },
  {
    id: "eritropoyetina", nombre: "Eritropoyetina (EPO)", nombreGenerico: "Epoetina alfa/beta/zeta",
    nombresComerciales: ["Eprex", "NeoRecormon", "Retacrit", "Binocrit"],
    familia: "Factores estimulantes de eritropoyesis", clasificacion: "Agente estimulante de eritropoyesis (AEE)",
    mecanismoAccion: "Glicoproteína recombinante idéntica a la eritropoyetina humana. Se une al receptor de EPO en progenitores eritroides de médula ósea, estimulando su proliferación, diferenciación y maduración a eritrocitos. Aumenta la producción de glóbulos rojos en 7-14 días.",
    indicaciones: ["Anemia en insuficiencia renal crónica (hemodiálisis y pre-diálisis)", "Anemia por quimioterapia (Hb <10 g/dL)", "Programa de autodonación preoperatoria", "Anemia en VIH (por zidovudina)", "Anemia del prematuro"],
    contraindicaciones: ["Hipertensión arterial no controlada", "Hipersensibilidad", "Aplasia pura de células rojas (PRCA)", "Incapacidad de recibir profilaxis antitrombótica"],
    efectosAdversos: ["Hipertensión arterial (frecuente)", "Cefalea", "Eventos tromboembólicos (TVP, TEP, ACV, IAM)", "Síntomas gripales", "Dolor en sitio de inyección", "Aplasia pura de células rojas (muy raro, por anticuerpos anti-EPO)", "Convulsiones"],
    interacciones: ["Hierro: NECESARIO suplementar (la EPO no funciona sin hierro disponible)", "Antihipertensivos: puede requerir ajuste de dosis", "Heparina: puede necesitar aumento de dosis en hemodiálisis"],
    viaAdministracion: ["SC", "IV"],
    dosis: {
      adulto: "IRC: 50-100 UI/kg 3 veces/semana (SC o IV). Objetivo Hb: 10-12 g/dL (NO >13 g/dL). Quimioterapia: 150 UI/kg SC 3 veces/semana o 40,000 UI SC semanal",
      pediatrico: "IRC: 50 UI/kg 3 veces/semana. Prematuros: 250 UI/kg 3 veces/semana"
    },
    presentaciones: ["Jeringa precargada 1000-40,000 UI", "Vial 2000-10,000 UI"],
    embarazo: "C", lactancia: "Precaución",
    cuidadosEnfermeria: ["⚠️ Objetivo Hb 10-12 g/dL — NUNCA normalizar (>13 g/dL aumenta mortalidad y riesgo trombótico)", "Verificar depósitos de hierro ANTES de iniciar (ferritina >100 ng/mL, IST >20%)", "Si no responde: buscar déficit de hierro, infección, sangrado oculto", "SC: rotar sitios, no agitar vial/jeringa (desnaturaliza)", "Monitorizar: Hb cada 2-4 semanas, hierro, ferritina, TA", "En hemodiálisis: administrar IV al final de la sesión", "Conservar refrigerado (2-8°C). Sacar 15 min antes de inyectar", "Si HTA: reducir dosis o suspender temporalmente"],
    farmacocinetica: { vidaMedia: "SC: 24h. IV: 4-13h", inicioAccion: "Reticulocitos aumentan en 7-10 días. Hb sube en 2-6 semanas", excrecion: "Mínima (degradación endosomal)" },
    almacenamiento: "Refrigerar 2-8°C. No congelar. No agitar. Proteger de la luz",
    unidadId: "u10", capituloId: "c10_01"
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
