const fs = require('fs');
const path = require('path');

const drugsPath = path.join(__dirname, '..', 'src', 'data', 'drugs.json');
const catsPath = path.join(__dirname, '..', 'src', 'data', 'categories.json');
const drugs = JSON.parse(fs.readFileSync(drugsPath, 'utf8'));
const cats = JSON.parse(fs.readFileSync(catsPath, 'utf8'));

const existingIds = new Set(drugs.map(d => d.id));

const newDrugs = [
  // ============================================================
  // OFTALMOLOGÍA — completar sección
  // ============================================================
  {
    id: 'latanoprost', nombre: 'Latanoprost', nombreGenerico: 'Latanoprost',
    nombresComerciales: ['Xalatan', 'Monoprost'],
    familia: 'Análogos de prostaglandinas oftálmicos', clasificacion: 'Análogo de prostaglandina F2α para glaucoma',
    mecanismoAccion: 'Análogo de PGF2α que aumenta el flujo uveoescleral de humor acuoso, reduciendo la PIO de forma eficaz.',
    indicaciones: ['Glaucoma de ángulo abierto', 'Hipertensión ocular'],
    contraindicaciones: ['Hipersensibilidad', 'Queratitis herpética activa'],
    efectosAdversos: ['Hiperemia conjuntival', 'Hiperpigmentación del iris (irreversible)', 'Crecimiento de pestañas', 'Oscurecimiento palpebral', 'Edema macular (afáquicos)'],
    interacciones: ['Timolol: efecto aditivo hipotensor ocular', 'Tiacida tópica: compatible'],
    viaAdministracion: ['oftalmica'],
    dosis: { adulto: '1 gota en ojo afectado cada noche (mayor eficacia nocturna)' },
    presentaciones: ['Colirio 0.005% (50 mcg/mL)'],
    embarazo: 'C', lactancia: 'Precaución',
    cuidadosEnfermeria: ['Administrar por la NOCHE (mayor eficacia)', 'Informar sobre cambio de color del iris (irreversible)', 'Retirar lentes de contacto 15 min antes', 'Refrigerar hasta abrir, luego T ambiente 6 semanas'],
    unidadId: 'u09', capituloId: 'c09_08',
    grupoTerapeutico: 'Dermatología', grupoFarmacologico: 'Antisépticos y cicatrizantes',
  },
  {
    id: 'timolol_oftalm', nombre: 'Timolol (Oftálmico)', nombreGenerico: 'Timolol maleato oftálmico',
    nombresComerciales: ['Timoftol', 'Cusimolol', 'Timabak'],
    familia: 'Beta-bloqueantes oftálmicos', clasificacion: 'Beta-bloqueante no selectivo tópico ocular',
    mecanismoAccion: 'Bloquea receptores beta-adrenérgicos en procesos ciliares, reduciendo la producción de humor acuoso y disminuyendo la PIO.',
    indicaciones: ['Glaucoma de ángulo abierto', 'Hipertensión ocular', 'Glaucoma secundario'],
    contraindicaciones: ['Asma/EPOC', 'Bradicardia sinusal', 'Bloqueo AV de 2º-3er grado', 'IC descompensada', 'Shock cardiogénico'],
    efectosAdversos: ['Escozor ocular', 'Visión borrosa', 'Sequedad ocular', 'Sistémicos: bradicardia, broncoespasmo, hipotensión, fatiga'],
    interacciones: ['Beta-bloqueantes orales: efecto aditivo', 'Verapamilo/diltiazem: bradicardia', 'Adrenalina: antagonismo parcial'],
    viaAdministracion: ['oftalmica'],
    dosis: { adulto: '1 gota cada 12h. Gel: 1 aplicación diaria' },
    presentaciones: ['Colirio 0.25%', 'Colirio 0.5%', 'Gel oftálmico 0.1%'],
    embarazo: 'C', lactancia: 'Precaución (absorción sistémica)',
    cuidadosEnfermeria: ['Ocluir punto lagrimal 2 min tras instilación', 'CONTRAINDICADO en asmáticos', 'Vigilar FC y PA (absorción sistémica)', 'Puede enmascarar hipoglucemia en diabéticos'],
    unidadId: 'u09', capituloId: 'c09_08',
    grupoTerapeutico: 'Dermatología', grupoFarmacologico: 'Antisépticos y cicatrizantes',
  },

  // ============================================================
  // ANTIINFECCIOSOS - completar
  // ============================================================
  {
    id: 'tobramicina_oftalm', nombre: 'Tobramicina (Oftálmica)', nombreGenerico: 'Tobramicina oftálmica',
    nombresComerciales: ['Tobrex', 'Tobradex (con dexametasona)'],
    familia: 'Aminoglucósidos tópicos', clasificacion: 'Aminoglucósido oftálmico',
    mecanismoAccion: 'Aminoglucósido que inhibe la síntesis proteica bacteriana uniéndose a la subunidad 30S ribosomal. Bactericida contra gram-negativos.',
    indicaciones: ['Conjuntivitis bacteriana', 'Blefaritis', 'Queratitis bacteriana', 'Prevención de infección post-quirúrgica ocular'],
    contraindicaciones: ['Hipersensibilidad a aminoglucósidos'],
    efectosAdversos: ['Irritación ocular', 'Hiperemia conjuntival', 'Prurito', 'Edema palpebral', 'Sobreinfección fúngica (uso prolongado)'],
    interacciones: ['Corticoides tópicos: combinación frecuente (Tobradex)', 'Otros aminoglucósidos: toxicidad acumulativa (raro por vía tópica)'],
    viaAdministracion: ['oftalmica'],
    dosis: { adulto: 'Leve-moderado: 1-2 gotas cada 4h. Severo: 2 gotas cada hora, luego espaciar', pediatrico: '>1 año: misma dosis' },
    presentaciones: ['Colirio 0.3%', 'Pomada oftálmica 0.3%', 'Colirio tobramicina 0.3% + dexametasona 0.1%'],
    embarazo: 'B', lactancia: 'Compatible',
    cuidadosEnfermeria: ['No usar lentes de contacto durante tratamiento', 'Curso habitual: 7-10 días', 'Pomada: aplicar en saco conjuntival inferior, no tocar ojo con punta'],
    unidadId: 'u09', capituloId: 'c09_01',
    grupoTerapeutico: 'Dermatología', grupoFarmacologico: 'Antibióticos tópicos',
  },
  {
    id: 'moxifloxacino_oftalm', nombre: 'Moxifloxacino (Oftálmico)', nombreGenerico: 'Moxifloxacino oftálmico',
    nombresComerciales: ['Vigamox', 'Moxifloxacino colirio'],
    familia: 'Quinolonas tópicas', clasificacion: 'Fluoroquinolona de 4ª generación oftálmica',
    mecanismoAccion: 'Inhibe ADN girasa y topoisomerasa IV bacterianas. Amplio espectro contra gram+ y gram-. Excelente penetración ocular.',
    indicaciones: ['Conjuntivitis bacteriana', 'Profilaxis quirúrgica oftálmica (cataratas)', 'Queratitis bacteriana', 'Endoftalmitis (profilaxis)'],
    contraindicaciones: ['Hipersensibilidad a quinolonas'],
    efectosAdversos: ['Irritación ocular', 'Disgeusia (sabor alterado)', 'Sequedad ocular', 'Queratitis punctata'],
    interacciones: ['Mínimas por vía tópica'],
    viaAdministracion: ['oftalmica'],
    dosis: { adulto: '1 gota cada 8h durante 7 días. Profilaxis quirúrgica: según protocolo' },
    presentaciones: ['Colirio 0.5%'],
    embarazo: 'C', lactancia: 'Compatible',
    cuidadosEnfermeria: ['No requiere refrigeración', 'No usar con lentes de contacto', 'Desechar 4 semanas tras apertura'],
    unidadId: 'u09', capituloId: 'c09_01',
    grupoTerapeutico: 'Dermatología', grupoFarmacologico: 'Antibióticos tópicos',
  },

  // ============================================================
  // ANTINEOPLÁSICOS MODERNOS (terapias dirigidas Vademecum 2025)
  // ============================================================
  {
    id: 'osimertinib', nombre: 'Osimertinib', nombreGenerico: 'Osimertinib',
    nombresComerciales: ['Tagrisso'],
    familia: 'Inhibidores de tirosina quinasa', clasificacion: 'Inhibidor de EGFR de tercera generación (activo contra T790M)',
    mecanismoAccion: 'Inhibe irreversiblemente EGFR con mutaciones sensibilizantes (del19, L858R) y la mutación de resistencia T790M, con menor actividad sobre EGFR wild-type.',
    indicaciones: ['CPNM localmente avanzado o metastásico EGFR mutado', 'Adyuvante en CPNM estadio IB-IIIA EGFR mutado', 'CPNM con mutación T790M tras progresión a ITK de 1ª-2ª generación'],
    contraindicaciones: ['Enfermedad pulmonar intersticial', 'Prolongación QTc'],
    efectosAdversos: ['Diarrea', 'Rash acneiforme', 'Estomatitis', 'Paroniquia', 'Enfermedad pulmonar intersticial/neumonitis', 'Prolongación QTc', 'Cardiotoxicidad'],
    interacciones: ['Inhibidores CYP3A4 fuertes: precaución', 'Inductores CYP3A4: reducen eficacia'],
    viaAdministracion: ['oral'],
    dosis: { adulto: '80 mg/día (puede reducir a 40 mg si toxicidad)' },
    presentaciones: ['Comprimidos 40 mg', 'Comprimidos 80 mg'],
    embarazo: 'X', lactancia: 'Contraindicado',
    cuidadosEnfermeria: ['ECG basal y periódico (QTc)', 'Vigilar disnea/tos (neumonitis)', 'Cuidados de piel (rash acneiforme)', 'Se puede dispersar en agua si dificultad deglución'],
    unidadId: 'u12', capituloId: 'c12_05',
    grupoTerapeutico: 'Fármacos Hospitalarios y Antineoplásicos', grupoFarmacologico: 'Antineoplásicos',
  },
  {
    id: 'pembrolizumab', nombre: 'Pembrolizumab', nombreGenerico: 'Pembrolizumab',
    nombresComerciales: ['Keytruda'],
    familia: 'Inhibidores de checkpoint inmunitario', clasificacion: 'Anticuerpo monoclonal anti-PD-1',
    mecanismoAccion: 'Anticuerpo IgG4 humanizado que bloquea la interacción PD-1/PD-L1, reactivando la respuesta inmune antitumoral de los linfocitos T.',
    indicaciones: ['Melanoma avanzado', 'CPNM (PD-L1 ≥1%)', 'Carcinoma urotelial', 'Carcinoma de células renales', 'Linfoma de Hodgkin', 'Carcinoma de cabeza y cuello', 'Cáncer gástrico', 'Tumores MSI-H/dMMR'],
    contraindicaciones: ['Enfermedad autoinmune activa severa', 'Trasplante de órgano sólido'],
    efectosAdversos: ['Fatiga', 'Rash', 'Diarrea/colitis inmune', 'Hepatitis inmune', 'Neumonitis inmune', 'Endocrinopatías (tiroiditis, hipofisitis, DM1)', 'Nefritis', 'Miocarditis (raro pero grave)'],
    interacciones: ['Corticoides sistémicos: pueden reducir eficacia (evitar al inicio)', 'No interacciones farmacocinéticas significativas'],
    viaAdministracion: ['IV'],
    dosis: { adulto: '200 mg IV cada 3 semanas o 400 mg cada 6 semanas. Infundir en 30 min' },
    presentaciones: ['Vial 25 mg/mL (100 mg/4 mL)'],
    embarazo: 'X', lactancia: 'Contraindicado',
    cuidadosEnfermeria: ['Monitorizar reacciones infusionales', 'Pruebas tiroideas basales y periódicas', 'Educar al paciente sobre efectos inmunomediados', 'Ante cualquier efecto autoinmune: consulta urgente y posible corticoides', 'No agitar vial', 'La miocarditis es rara pero mortalidad >40%'],
    unidadId: 'u12', capituloId: 'c12_05',
    grupoTerapeutico: 'Fármacos Hospitalarios y Antineoplásicos', grupoFarmacologico: 'Antineoplásicos',
  },
  {
    id: 'nivolumab', nombre: 'Nivolumab', nombreGenerico: 'Nivolumab',
    nombresComerciales: ['Opdivo'],
    familia: 'Inhibidores de checkpoint inmunitario', clasificacion: 'Anticuerpo monoclonal anti-PD-1',
    mecanismoAccion: 'Anticuerpo IgG4 humano que bloquea el receptor PD-1 en linfocitos T, restaurando la inmunidad antitumoral.',
    indicaciones: ['Melanoma avanzado', 'CPNM', 'Carcinoma renal', 'Linfoma de Hodgkin', 'Carcinoma urotelial', 'Carcinoma hepatocelular', 'Mesotelioma pleural', 'Carcinoma esofágico'],
    contraindicaciones: ['Enfermedad autoinmune activa', 'Trasplante previo de órgano sólido'],
    efectosAdversos: ['Fatiga', 'Rash', 'Diarrea/colitis', 'Hepatitis', 'Neumonitis', 'Nefritis', 'Endocrinopatías (hipotiroidismo, hipofisitis)', 'Miocarditis'],
    interacciones: ['Similar a pembrolizumab. Evitar corticoides crónicos al inicio'],
    viaAdministracion: ['IV'],
    dosis: { adulto: '240 mg IV cada 2 semanas o 480 mg cada 4 semanas. Infundir en 30-60 min' },
    presentaciones: ['Vial 10 mg/mL (40 mg/4 mL, 100 mg/10 mL, 240 mg/24 mL)'],
    embarazo: 'X', lactancia: 'Contraindicado',
    cuidadosEnfermeria: ['Monitorizar efectos inmunomediados', 'Función tiroidea basal y periódica', 'Educar al paciente: consultar ante diarrea, disnea, rash, fatiga extrema'],
    unidadId: 'u12', capituloId: 'c12_05',
    grupoTerapeutico: 'Fármacos Hospitalarios y Antineoplásicos', grupoFarmacologico: 'Antineoplásicos',
  },
  {
    id: 'trastuzumab_deruxtecan', nombre: 'Trastuzumab Deruxtecan', nombreGenerico: 'Trastuzumab deruxtecan (T-DXd)',
    nombresComerciales: ['Enhertu'],
    familia: 'Conjugados anticuerpo-fármaco (ADC)', clasificacion: 'ADC anti-HER2 con inhibidor de topoisomerasa I',
    mecanismoAccion: 'Conjugado de trastuzumab (anti-HER2) con deruxtecan (inhibidor de topoisomerasa I). Se une a HER2, se internaliza y libera el citotóxico dentro de la célula tumoral. Efecto bystander en células vecinas HER2-low.',
    indicaciones: ['Cáncer de mama HER2+ pretratado', 'Cáncer de mama HER2-low (IHC 1+ o 2+/ISH-)', 'Cáncer gástrico HER2+', 'CPNM HER2 mutado'],
    contraindicaciones: ['Enfermedad pulmonar intersticial activa'],
    efectosAdversos: ['Enfermedad pulmonar intersticial/neumonitis (5-15%, puede ser fatal)', 'Neutropenia', 'Náuseas/vómitos', 'Alopecia', 'Fatiga', 'Anemia', 'Trombocitopenia'],
    interacciones: ['Inhibidores CYP3A4: no afectan significativamente', 'Otros mielosupresores: toxicidad aditiva'],
    viaAdministracion: ['IV'],
    dosis: { adulto: 'Mama: 5.4 mg/kg IV cada 3 semanas. Gástrico: 6.4 mg/kg cada 3 semanas. Infundir en 90 min (1ª), luego 30 min' },
    presentaciones: ['Vial 100 mg polvo liofilizado'],
    embarazo: 'X', lactancia: 'Contraindicado',
    cuidadosEnfermeria: ['VIGILAR NEUMONITIS: ante cualquier síntoma respiratorio nuevo → TAC urgente', 'Premedicación antiemética', 'Hemograma antes de cada ciclo', 'Si neumonitis grado 1: suspender. Grado 2+: suspender definitivamente', 'Anticoncepción durante y 7 meses después'],
    unidadId: 'u12', capituloId: 'c12_05',
    grupoTerapeutico: 'Fármacos Hospitalarios y Antineoplásicos', grupoFarmacologico: 'Antineoplásicos',
  },

  // ============================================================
  // HEMATOLOGÍA — completar anticoagulantes y antianémicos
  // ============================================================
  {
    id: 'citrato_potasico', nombre: 'Citrato de Potasio', nombreGenerico: 'Citrato potásico',
    nombresComerciales: ['Acalka', 'Urocit-K'],
    familia: 'Alcalinizantes urinarios', clasificacion: 'Sales de potasio alcalinizantes',
    mecanismoAccion: 'Se metaboliza a bicarbonato, alcalinizando la orina y aumentando el pH urinario. Reduce la formación de cálculos de ácido úrico y oxalato de calcio al aumentar el citrato urinario (inhibidor de cristalización).',
    indicaciones: ['Litiasis renal por ácido úrico', 'Litiasis de oxalato cálcico recurrente', 'Acidosis tubular renal', 'Hipocitraturia'],
    contraindicaciones: ['Hiperpotasemia', 'Insuficiencia renal severa', 'Infección urinaria por Proteus', 'Uso con diuréticos ahorradores de K'],
    efectosAdversos: ['Molestias GI (náuseas, diarrea)', 'Hiperpotasemia', 'Alcalosis metabólica'],
    interacciones: ['IECA/ARA-II: riesgo hiperpotasemia', 'Espironolactona: hiperpotasemia', 'Antiácidos con aluminio: alcalinización excesiva'],
    viaAdministracion: ['oral'],
    dosis: { adulto: '30-60 mEq/día divididos en 2-3 tomas con comidas. Ajustar según pH urinario (objetivo 6.5-7.0)' },
    presentaciones: ['Comprimidos 10 mEq', 'Comprimidos 15 mEq', 'Sobres 30 mEq'],
    embarazo: 'C', lactancia: 'Compatible',
    cuidadosEnfermeria: ['Administrar con comidas (reduce molestias GI)', 'Monitorizar K sérico y pH urinario', 'Educar sobre ingesta hídrica abundante (>2.5 L/día)', 'Tiras de pH urinario para autocontrol'],
    unidadId: 'u07', capituloId: 'c07_03',
    grupoTerapeutico: 'Sistema Genitourinario y Reproductor', grupoFarmacologico: 'Urológicos',
  },

  // ============================================================
  // BIOLÓGICOS / INMUNOTERAPIA — fármacos modernos
  // ============================================================
  {
    id: 'bevacizumab_oftalm', nombre: 'Bevacizumab (Intravítreo)', nombreGenerico: 'Bevacizumab (uso intravítreo off-label)',
    nombresComerciales: ['Avastin (formulación magistral intravítrea)'],
    familia: 'Anti-VEGF', clasificacion: 'Anticuerpo monoclonal anti-VEGF humanizado (uso off-label intravítreo)',
    mecanismoAccion: 'Anticuerpo que neutraliza todas las isoformas de VEGF-A, inhibiendo la neovascularización y reduciendo la permeabilidad vascular retiniana.',
    indicaciones: ['Degeneración macular asociada a la edad (DMAE) húmeda', 'Edema macular diabético', 'Oclusión venosa retiniana', 'Retinopatía del prematuro', 'Neovascularización coroidea'],
    contraindicaciones: ['Infección ocular o periocular activa', 'Inflamación intraocular activa'],
    efectosAdversos: ['Endoftalmitis (0.05%)', 'Desprendimiento de retina', 'Hemorragia vítrea', 'Aumento transitorio PIO', 'Dolor ocular', 'Flotadores'],
    interacciones: ['Ranibizumab/aflibercept: no combinar (misma diana)'],
    viaAdministracion: ['oftalmica'],
    dosis: { adulto: '1.25 mg/0.05 mL intravítreo cada 4-6 semanas según respuesta' },
    presentaciones: ['Vial 25 mg/mL (formulación magistral para uso intravítreo: 1.25 mg/0.05 mL)'],
    embarazo: 'X', lactancia: 'No recomendado',
    cuidadosEnfermeria: ['Procedimiento en condiciones de quirófano estéril', 'Profilaxis antibiótica tópica pre/post inyección', 'Vigilar signos de endoftalmitis post-inyección (dolor, enrojecimiento, visión borrosa)', 'Control de PIO tras inyección'],
    unidadId: 'u09', capituloId: 'c09_08',
    grupoTerapeutico: 'Dermatología', grupoFarmacologico: 'Antisépticos y cicatrizantes',
  },
  {
    id: 'ranibizumab', nombre: 'Ranibizumab', nombreGenerico: 'Ranibizumab',
    nombresComerciales: ['Lucentis', 'Byooviz'],
    familia: 'Anti-VEGF', clasificacion: 'Fragmento Fab de anticuerpo anti-VEGF-A humanizado',
    mecanismoAccion: 'Fragmento de anticuerpo que se une y neutraliza VEGF-A, inhibiendo la angiogénesis y permeabilidad vascular en la retina.',
    indicaciones: ['DMAE húmeda', 'Edema macular diabético', 'Edema macular por oclusión venosa', 'Neovascularización coroidea miópica', 'Retinopatía del prematuro'],
    contraindicaciones: ['Infección ocular activa', 'Inflamación intraocular'],
    efectosAdversos: ['Hemorragia conjuntival', 'Dolor ocular', 'Flotadores', 'Endoftalmitis', 'Aumento PIO', 'Catarata traumática'],
    interacciones: ['Otros anti-VEGF: no combinar'],
    viaAdministracion: ['oftalmica'],
    dosis: { adulto: 'DMAE: 0.5 mg intravítreo mensual (carga 3 dosis), luego PRN o treat-and-extend' },
    presentaciones: ['Vial 10 mg/mL (0.5 mg/0.05 mL)', 'Jeringa precargada 0.5 mg'],
    embarazo: 'X', lactancia: 'No recomendado',
    cuidadosEnfermeria: ['Inyección intravítrea en condiciones estériles', 'Profilaxis antibiótica tópica', 'Control PIO post-inyección', 'Educar al paciente sobre signos de alarma (dolor, pérdida de visión)'],
    unidadId: 'u09', capituloId: 'c09_08',
    grupoTerapeutico: 'Dermatología', grupoFarmacologico: 'Antisépticos y cicatrizantes',
  },
  {
    id: 'aflibercept', nombre: 'Aflibercept (Intravítreo)', nombreGenerico: 'Aflibercept',
    nombresComerciales: ['Eylea'],
    familia: 'Anti-VEGF', clasificacion: 'Proteína de fusión trampa de VEGF',
    mecanismoAccion: 'Proteína de fusión que actúa como receptor señuelo, uniéndose a VEGF-A, VEGF-B y PlGF con alta afinidad, inhibiendo la señalización angiogénica.',
    indicaciones: ['DMAE húmeda', 'Edema macular diabético', 'Edema macular por OVR', 'Neovascularización coroidea miópica', 'Retinopatía diabética proliferativa'],
    contraindicaciones: ['Infección ocular/periocular', 'Inflamación intraocular severa'],
    efectosAdversos: ['Hemorragia conjuntival', 'Dolor ocular', 'Desprendimiento vítreo', 'Catarata', 'Endoftalmitis', 'Aumento PIO'],
    interacciones: ['Anti-VEGF: no combinar'],
    viaAdministracion: ['oftalmica'],
    dosis: { adulto: 'DMAE: 2 mg intravítreo mensual × 3, luego cada 8 semanas. Formulación 8 mg (Eylea HD): cada 8-16 semanas' },
    presentaciones: ['Vial 40 mg/mL (2 mg/0.05 mL)', 'Jeringa precargada 2 mg', 'Eylea HD: 8 mg/0.07 mL'],
    embarazo: 'X', lactancia: 'No recomendado',
    cuidadosEnfermeria: ['Inyección intravítrea estéril', 'Monitorizar PIO', 'Intervalos de tratamiento según protocolo treat-and-extend', 'Eylea HD permite intervalos más largos'],
    unidadId: 'u09', capituloId: 'c09_08',
    grupoTerapeutico: 'Dermatología', grupoFarmacologico: 'Antisépticos y cicatrizantes',
  },

  // ============================================================
  // DERMATOLOGÍA — completar
  // ============================================================
  {
    id: 'dupilumab_derm', nombre: 'Dupilumab (Dermatitis)', nombreGenerico: 'Dupilumab',
    nombresComerciales: ['Dupixent'],
    familia: 'Anticuerpos monoclonales', clasificacion: 'Anticuerpo monoclonal anti-IL-4Rα',
    mecanismoAccion: 'Anticuerpo humano que bloquea la subunidad alfa del receptor de IL-4, inhibiendo la señalización de IL-4 e IL-13, citoquinas clave en la inflamación tipo 2.',
    indicaciones: ['Dermatitis atópica moderada-severa', 'Asma eosinofílica moderada-severa', 'Rinosinusitis crónica con pólipos nasales', 'Esofagitis eosinofílica', 'Prurigo nodular'],
    contraindicaciones: ['Hipersensibilidad', 'Helmintiasis activa no tratada'],
    efectosAdversos: ['Reacción en punto de inyección', 'Conjuntivitis', 'Blefaritis', 'Herpes oral', 'Eosinofilia transitoria', 'Artralgias'],
    interacciones: ['Vacunas vivas: evitar', 'CYP450: posible normalización (ajustar warfarina, teofilina al inicio)'],
    viaAdministracion: ['SC'],
    dosis: { adulto: 'Carga: 600 mg SC (2 inyecciones de 300 mg), luego 300 mg SC cada 2 semanas', pediatrico: '6-17 años: según peso. 15-30 kg: 600 mg carga, 300 mg cada 4 sem. 30-60 kg: 400 mg carga, 200 mg cada 2 sem. >60 kg: dosis adulto' },
    presentaciones: ['Jeringa precargada 200 mg', 'Jeringa precargada 300 mg', 'Pluma precargada 300 mg'],
    embarazo: 'B', lactancia: 'Probablemente compatible',
    cuidadosEnfermeria: ['Enseñar autoinyección SC', 'Rotar sitios de inyección', 'Refrigerar (2-8°C), sacar 45 min antes', 'Vigilar conjuntivitis (efecto frecuente)', 'No es un inmunosupresor clásico: no aumenta riesgo infeccioso significativo'],
    unidadId: 'u09', capituloId: 'c09_06',
    grupoTerapeutico: 'Dermatología', grupoFarmacologico: 'Inmunomoduladores tópicos y antipsoriásicos',
  },
  {
    id: 'secukinumab', nombre: 'Secukinumab', nombreGenerico: 'Secukinumab',
    nombresComerciales: ['Cosentyx'],
    familia: 'Anticuerpos monoclonales', clasificacion: 'Anticuerpo monoclonal anti-IL-17A',
    mecanismoAccion: 'Anticuerpo IgG1 humano que neutraliza selectivamente IL-17A, citoquina proinflamatoria clave en psoriasis y espondiloartritis.',
    indicaciones: ['Psoriasis en placas moderada-severa', 'Artritis psoriásica', 'Espondilitis anquilosante', 'Espondiloartritis axial no radiográfica', 'Hidradenitis supurativa'],
    contraindicaciones: ['Infección activa clínicamente relevante (especialmente TB)', 'Hipersensibilidad'],
    efectosAdversos: ['Infecciones respiratorias altas', 'Candidiasis oral/esofágica', 'Diarrea', 'Reacción en punto de inyección', 'Neutropenia'],
    interacciones: ['Vacunas vivas: contraindicadas', 'CYP450: posible normalización (monitorizar fármacos de estrecho margen)'],
    viaAdministracion: ['SC'],
    dosis: { adulto: 'Psoriasis: 300 mg SC semanas 0, 1, 2, 3, 4, luego cada 4 semanas. EA: 150 mg mismo esquema' },
    presentaciones: ['Jeringa precargada 150 mg', 'Pluma precargada 150 mg', 'Pluma 300 mg'],
    embarazo: 'B', lactancia: 'Probablemente compatible',
    cuidadosEnfermeria: ['Descartar TB latente antes de iniciar', 'Enseñar técnica de autoinyección', 'Vigilar candidiasis oral', 'Refrigerar, sacar 30 min antes de inyectar'],
    unidadId: 'u09', capituloId: 'c09_06',
    grupoTerapeutico: 'Dermatología', grupoFarmacologico: 'Inmunomoduladores tópicos y antipsoriásicos',
  },

  // ============================================================
  // FÁRMACOS ESPECIALES / HUÉRFANOS
  // ============================================================
  {
    id: 'nusinersen', nombre: 'Nusinersen', nombreGenerico: 'Nusinersen',
    nombresComerciales: ['Spinraza'],
    familia: 'Oligonucleótidos antisentido', clasificacion: 'Oligonucleótido antisentido modificador del splicing de SMN2',
    mecanismoAccion: 'Oligonucleótido antisentido que modifica el splicing del pre-mRNA del gen SMN2, aumentando la producción de proteína SMN funcional en pacientes con atrofia muscular espinal.',
    indicaciones: ['Atrofia muscular espinal (AME) 5q — todos los tipos'],
    contraindicaciones: ['Hipersensibilidad'],
    efectosAdversos: ['Trombocitopenia', 'Nefrotoxicidad (proteinuria)', 'Cefalea post-punción lumbar', 'Dolor lumbar', 'Vómitos', 'Infecciones respiratorias'],
    interacciones: ['Anticoagulantes: monitorizar (trombocitopenia)', 'Nefrotóxicos: vigilar función renal'],
    viaAdministracion: ['intratecal'],
    dosis: { adulto: 'Carga: 12 mg intratecal días 0, 14, 28, 63. Mantenimiento: 12 mg cada 4 meses', pediatrico: 'Misma dosis (no ajuste por peso)' },
    presentaciones: ['Vial 12 mg/5 mL'],
    embarazo: 'C', lactancia: 'No datos',
    cuidadosEnfermeria: ['Administración intratecal por especialista', 'Monitorizar plaquetas y orina (proteinuria)', 'Posición post-punción para reducir cefalea', 'Refrigerar viales (2-8°C), atemperar antes de administrar'],
    unidadId: 'u01', capituloId: 'c01_12',
    grupoTerapeutico: 'Sistema Nervioso', grupoFarmacologico: 'Neurofármacos especiales',
  },
  {
    id: 'onasemnogene', nombre: 'Onasemnogene Abeparvovec', nombreGenerico: 'Onasemnogene abeparvovec (terapia génica)',
    nombresComerciales: ['Zolgensma'],
    familia: 'Terapia génica', clasificacion: 'Vector AAV9 con gen SMN1 funcional',
    mecanismoAccion: 'Terapia génica basada en vector AAV9 que introduce una copia funcional del gen SMN1 en las neuronas motoras, restaurando la producción de proteína SMN de forma permanente.',
    indicaciones: ['Atrofia muscular espinal tipo 1 (AME)', 'Pacientes con hasta 2 copias de SMN2 y <21 kg'],
    contraindicaciones: ['Anticuerpos anti-AAV9 elevados', 'Insuficiencia hepática activa'],
    efectosAdversos: ['Hepatotoxicidad severa (elevación transaminasas)', 'Trombocitopenia', 'Vómitos', 'Microangiopatía trombótica', 'Elevación de troponina'],
    interacciones: ['Hepatotóxicos: evitar', 'Prednisolona: se administra como premedicación obligatoria'],
    viaAdministracion: ['IV'],
    dosis: { adulto: 'Dosis ÚNICA: 1.1 × 10¹⁴ vg/kg IV en ~60 min', pediatrico: 'Misma dosis. Peso máximo ~21 kg. Solo se administra UNA VEZ en la vida' },
    presentaciones: ['Kits de viales personalizados según peso del paciente'],
    embarazo: 'N/A', lactancia: 'N/A (uso pediátrico)',
    cuidadosEnfermeria: ['DOSIS ÚNICA EN LA VIDA — verificar identidad del paciente', 'Prednisolona 1 mg/kg/día desde 1 día antes y durante ≥30 días', 'Monitorizar transaminasas semanalmente ≥3 meses', 'Vigilar plaquetas y troponina', 'Fármaco más caro del mundo: manipulación extremadamente cuidadosa'],
    unidadId: 'u01', capituloId: 'c01_12',
    grupoTerapeutico: 'Sistema Nervioso', grupoFarmacologico: 'Neurofármacos especiales',
  },
];

let added = 0;
for (const drug of newDrugs) {
  if (existingIds.has(drug.id)) {
    console.log('SKIP (exists):', drug.nombre);
    continue;
  }
  drugs.push(drug);
  existingIds.add(drug.id);
  added++;
  console.log('ADD:', drug.nombre);

  for (const u of cats.unidades) {
    for (const c of u.capitulos) {
      if (c.id === drug.capituloId && !c.drugIds.includes(drug.id)) {
        c.drugIds.push(drug.id);
      }
    }
  }
}

fs.writeFileSync(drugsPath, JSON.stringify(drugs, null, 2), 'utf8');
fs.writeFileSync(catsPath, JSON.stringify(cats, null, 2), 'utf8');
console.log(`\nDone: ${added} drugs added. Total: ${drugs.length}`);
