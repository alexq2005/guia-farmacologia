#!/usr/bin/env python3
"""
Drug family templates — shared defaults for common drug classes.
Each template provides contraindicaciones, efectosAdversos, interacciones,
cuidadosEnfermeria, and embarazo defaults so individual drugs only need unique fields.
"""

TEMPLATES = {
    # ── U01 SISTEMA NERVIOSO ──
    "opioide": {
        "familia": "Analgésicos opioides",
        "ci": ["Depresión respiratoria severa", "Íleo paralítico", "Hipersensibilidad al fármaco", "Uso concurrente de IMAO"],
        "ea": ["Depresión respiratoria", "Náuseas y vómitos", "Estreñimiento", "Sedación", "Prurito", "Retención urinaria"],
        "ix": ["Depresores del SNC: potencian sedación", "IMAO: crisis hipertensiva", "Benzodiazepinas: mayor depresión respiratoria"],
        "ce": ["Monitorizar FR, SatO2 y nivel de conciencia", "Tener naloxona disponible", "Valorar dolor con EVA pre/post", "No administrar si FR <12 rpm", "Vigilar estreñimiento"],
        "emb": "C"
    },
    "anestesico_local": {
        "familia": "Anestésicos locales",
        "ci": ["Hipersensibilidad al fármaco o grupo amida/éster", "Bloqueo cardíaco severo", "Infección en sitio de inyección"],
        "ea": ["Toxicidad sistémica (convulsiones, arritmias)", "Hipotensión", "Bradicardia", "Parestesias prolongadas", "Reacción alérgica"],
        "ix": ["Otros anestésicos locales: toxicidad aditiva", "Betabloqueantes: mayor riesgo cardiotoxicidad", "Vasoconstrictores: prolongan efecto"],
        "ce": ["Monitorizar signos de toxicidad sistémica (sabor metálico, acúfenos, convulsiones)", "Tener emulsión lipídica 20% disponible", "Aspirar antes de inyectar para evitar inyección IV", "Vigilar bloqueo motor y sensitivo"],
        "emb": "C"
    },
    "anticonvulsivante": {
        "familia": "Anticonvulsivantes",
        "ci": ["Hipersensibilidad al fármaco", "Porfiria aguda (según fármaco)"],
        "ea": ["Somnolencia", "Mareo", "Ataxia", "Diplopia", "Náuseas", "Elevación de transaminasas"],
        "ix": ["Otros antiepilépticos: interacciones farmacocinéticas", "Anticonceptivos orales: posible reducción de eficacia", "Warfarina: alteración del INR"],
        "ce": ["Monitorizar niveles plasmáticos si disponible", "No suspender bruscamente (riesgo de crisis)", "Vigilar función hepática y hemograma", "Educar sobre adherencia estricta"],
        "emb": "D"
    },
    "antiparkinsoniano": {
        "familia": "Antiparkinsonianos",
        "ci": ["Hipersensibilidad al fármaco", "Glaucoma de ángulo cerrado (anticolinérgicos)"],
        "ea": ["Náuseas", "Hipotensión ortostática", "Discinesias", "Alucinaciones", "Somnolencia diurna"],
        "ix": ["Antipsicóticos: antagonizan efecto", "IMAO: crisis hipertensiva con levodopa", "Antieméticos antidopaminérgicos: reducen eficacia"],
        "ce": ["Administrar con alimentos para reducir náuseas (excepto levodopa)", "Vigilar hipotensión ortostática", "Monitorizar discinesias y fluctuaciones motoras", "No suspender bruscamente"],
        "emb": "C"
    },
    "antipsicotico": {
        "familia": "Antipsicóticos",
        "ci": ["Hipersensibilidad", "Depresión grave del SNC", "Feocromocitoma (algunos)"],
        "ea": ["Sedación", "Aumento de peso", "Síntomas extrapiramidales", "Hipotensión ortostática", "Prolongación QT", "Síndrome metabólico"],
        "ix": ["Depresores del SNC: potencian sedación", "Antiparkinsonianos: antagonismo mutuo", "Fármacos que prolongan QT: mayor riesgo arritmia"],
        "ce": ["Monitorizar peso, glucemia y perfil lipídico", "Vigilar síntomas extrapiramidales (acatisia, distonía)", "ECG basal y periódico", "Educar sobre efectos metabólicos a largo plazo"],
        "emb": "C"
    },
    "antidepresivo_isrs": {
        "familia": "Antidepresivos ISRS/ISRSN",
        "ci": ["Hipersensibilidad", "Uso concurrente de IMAO (14 días)", "Síndrome serotoninérgico previo"],
        "ea": ["Náuseas", "Cefalea", "Insomnio o somnolencia", "Disfunción sexual", "Aumento o pérdida de peso", "Síndrome serotoninérgico (raro)"],
        "ix": ["IMAO: síndrome serotoninérgico", "Triptanes: riesgo serotoninérgico", "Warfarina: mayor riesgo sangrado", "AINEs: mayor riesgo hemorragia GI"],
        "ce": ["Evaluar riesgo suicida especialmente al inicio", "Efecto terapéutico tarda 2-4 semanas", "No suspender bruscamente (síndrome de discontinuación)", "Vigilar signos de síndrome serotoninérgico"],
        "emb": "C"
    },
    "antidepresivo_triciclico": {
        "familia": "Antidepresivos tricíclicos",
        "ci": ["Hipersensibilidad", "IAM reciente", "Uso de IMAO (14 días)", "Glaucoma de ángulo cerrado", "Retención urinaria"],
        "ea": ["Sedación", "Boca seca", "Estreñimiento", "Retención urinaria", "Hipotensión ortostática", "Prolongación QT", "Aumento de peso"],
        "ix": ["IMAO: crisis hipertensiva", "Depresores del SNC: sedación aditiva", "Anticolinérgicos: efectos aditivos", "Simpaticomiméticos: hipertensión"],
        "ce": ["ECG basal (riesgo arritmias)", "Vigilar retención urinaria y estreñimiento", "Riesgo letal en sobredosis (cardiotoxicidad)", "Evaluar riesgo suicida", "Levantar lentamente por hipotensión ortostática"],
        "emb": "C"
    },
    "triptan": {
        "familia": "Triptanos (agonistas 5-HT1)",
        "ci": ["Cardiopatía isquémica", "HTA no controlada", "ACV o AIT previo", "Uso de IMAO o ergotamínicos", "Insuficiencia hepática grave"],
        "ea": ["Sensación de opresión torácica", "Parestesias", "Mareo", "Somnolencia", "Náuseas", "Astenia"],
        "ix": ["ISRS/ISRSN: riesgo síndrome serotoninérgico", "Ergotamínicos: vasospasmo (esperar 24h)", "IMAO: aumenta niveles del triptán"],
        "ce": ["Administrar al inicio de la cefalea", "No usar como profilaxis", "Vigilar signos de vasospasmo coronario", "Máx 2-3 dosis en 24h según fármaco"],
        "emb": "C"
    },
    "esclerosis_multiple": {
        "familia": "Fármacos para Esclerosis Múltiple",
        "ci": ["Hipersensibilidad", "Inmunosupresión severa", "Infección activa grave"],
        "ea": ["Linfopenia", "Elevación transaminasas", "Cefalea", "Infecciones oportunistas", "Fatiga"],
        "ix": ["Inmunosupresores: mayor riesgo infección", "Vacunas vivas: contraindicadas", "Fingolimod: bradicardia con betabloqueantes"],
        "ce": ["Hemograma y función hepática periódicos", "Vigilar signos de infección", "Verificar vacunación antes de iniciar", "Educar sobre inyección SC si aplica"],
        "emb": "X"
    },
    "benzodiacepina": {
        "familia": "Benzodiazepinas",
        "ci": ["Hipersensibilidad", "Miastenia gravis", "Insuficiencia respiratoria grave", "Apnea del sueño", "Insuficiencia hepática grave"],
        "ea": ["Somnolencia", "Mareo", "Ataxia", "Amnesia anterógrada", "Dependencia y tolerancia", "Depresión respiratoria"],
        "ix": ["Depresores del SNC/opioides: depresión respiratoria", "Alcohol: potenciación sedante", "Inhibidores CYP3A4: aumentan niveles"],
        "ce": ["Monitorizar nivel de sedación", "No suspender bruscamente (riesgo convulsiones)", "Tener flumazenilo disponible", "Usar menor dosis y tiempo posible", "Vigilar en ancianos (riesgo caídas)"],
        "emb": "D"
    },
    "adiccion": {
        "familia": "Fármacos para trastornos adictivos",
        "ci": ["Hipersensibilidad", "Uso activo de opioides (para naltrexona)", "Insuficiencia hepática grave"],
        "ea": ["Náuseas", "Cefalea", "Mareo", "Insomnio", "Hepatotoxicidad (raro)"],
        "ix": ["Opioides: naltrexona bloquea efecto analgésico", "Alcohol: efecto disulfiram con disulfiram"],
        "ce": ["Verificar abstinencia previa según fármaco", "Monitorizar función hepática", "Apoyo psicológico complementario es esencial", "Evaluar adherencia al tratamiento"],
        "emb": "C"
    },
    # ── U02 CARDIOVASCULAR ──
    "ieca": {
        "familia": "Inhibidores de la ECA",
        "ci": ["Hipersensibilidad a IECA", "Angioedema previo", "Embarazo", "Estenosis bilateral arteria renal", "Hiperpotasemia severa"],
        "ea": ["Tos seca persistente", "Hipotensión", "Hiperpotasemia", "Mareo", "Angioedema (raro)", "Deterioro función renal"],
        "ix": ["AINEs: reducen efecto antihipertensivo", "Potasio/espironolactona: hiperpotasemia", "Litio: aumenta niveles de litio", "ARA-II: hiperpotasemia y daño renal"],
        "ce": ["Control de TA antes y después", "Vigilar función renal y potasio", "Tos seca es efecto esperado", "Primera dosis en decúbito (hipotensión)"],
        "emb": "D"
    },
    "ara2": {
        "familia": "Antagonistas del receptor de angiotensina II",
        "ci": ["Hipersensibilidad", "Embarazo", "Estenosis bilateral arteria renal", "Hiperpotasemia"],
        "ea": ["Hipotensión", "Hiperpotasemia", "Mareo", "Cefalea", "Deterioro renal"],
        "ix": ["AINEs: reducen efecto", "Potasio: hiperpotasemia", "Litio: aumenta niveles", "IECA: no combinar"],
        "ce": ["Control de TA pre/post", "Vigilar creatinina y potasio", "Alternativa a IECA si tos", "No usar en embarazo"],
        "emb": "D"
    },
    "betabloqueante": {
        "familia": "Betabloqueantes",
        "ci": ["Bradicardia severa", "Bloqueo AV 2°-3°", "Asma bronquial (no selectivos)", "Shock cardiogénico", "Feocromocitoma no tratado"],
        "ea": ["Bradicardia", "Hipotensión", "Fatiga", "Broncoespasmo", "Extremidades frías", "Depresión", "Disfunción eréctil"],
        "ix": ["Calcioantagonistas no DHP: bradicardia aditiva", "Insulina: enmascara hipoglucemia", "Digoxina: bradicardia aditiva"],
        "ce": ["Monitorizar FC y TA", "No suspender bruscamente (rebote simpático)", "Vigilar signos de broncoespasmo", "Precaución en diabéticos (enmascara hipoglucemia)"],
        "emb": "C"
    },
    "calcioantagonista": {
        "familia": "Calcioantagonistas",
        "ci": ["Hipersensibilidad", "Hipotensión severa", "Shock cardiogénico", "Estenosis aórtica severa (DHP)"],
        "ea": ["Edema periférico", "Cefalea", "Rubor facial", "Mareo", "Estreñimiento (verapamilo)", "Bradicardia (no DHP)"],
        "ix": ["Betabloqueantes: bradicardia con no-DHP", "Digoxina: aumenta niveles", "Simvastatina: aumento niveles con diltiazem/verapamilo"],
        "ce": ["Control de TA y FC", "Vigilar edema periférico", "No triturar comprimidos de liberación prolongada", "Precaución en IC sistólica (no-DHP)"],
        "emb": "C"
    },
    "diuretico": {
        "familia": "Diuréticos",
        "ci": ["Hipersensibilidad", "Anuria", "Depleción severa de volumen", "Hipopotasemia severa (tiazidas/asa)"],
        "ea": ["Hipovolemia", "Hipopotasemia (asa/tiazidas)", "Hiperpotasemia (ahorradores)", "Hiponatremia", "Hiperuricemia", "Hipotensión"],
        "ix": ["IECA/ARA-II: hipotensión aditiva", "AINEs: reducen efecto diurético", "Digoxina: hipopotasemia aumenta toxicidad", "Litio: aumenta niveles"],
        "ce": ["Monitorizar electrolitos (K+, Na+, Mg2+)", "Control de peso diario e ingesta/excreta", "Administrar por la mañana para evitar nicturia", "Vigilar signos de deshidratación"],
        "emb": "C"
    },
    "estatina": {
        "familia": "Estatinas (inhibidores HMG-CoA reductasa)",
        "ci": ["Hipersensibilidad", "Enfermedad hepática activa", "Embarazo y lactancia", "Elevación persistente de transaminasas"],
        "ea": ["Mialgias", "Elevación de CPK", "Hepatotoxicidad", "Rabdomiólisis (raro)", "Cefalea", "Molestias GI"],
        "ix": ["Fibratos: mayor riesgo miopatía", "Ciclosporina: aumenta niveles de estatina", "Warfarina: puede aumentar INR", "Jugo de pomelo: inhibe CYP3A4"],
        "ce": ["Monitorizar perfil hepático y CPK", "Educar sobre dolor muscular inexplicable", "Tomar por la noche (mayor síntesis colesterol)", "Dieta y ejercicio complementarios"],
        "emb": "X"
    },
    # ── U03 ANTIINFECCIOSOS ──
    "penicilina": {
        "familia": "Penicilinas",
        "ci": ["Hipersensibilidad a penicilinas", "Alergia severa a cefalosporinas (reacción cruzada)"],
        "ea": ["Reacciones alérgicas (urticaria, anafilaxia)", "Diarrea", "Náuseas", "Candidiasis oral/vaginal", "Colitis pseudomembranosa"],
        "ix": ["Metotrexato: aumenta toxicidad", "Anticoagulantes: mayor riesgo sangrado", "Probenecid: aumenta niveles de penicilina"],
        "ce": ["Preguntar SIEMPRE por alergias antes de administrar", "Tener adrenalina disponible para anafilaxia", "Vigilar signos de alergia por 30 min post-IV", "Completar esquema antibiótico completo"],
        "emb": "B"
    },
    "cefalosporina": {
        "familia": "Cefalosporinas",
        "ci": ["Hipersensibilidad a cefalosporinas", "Alergia severa a penicilinas (reacción cruzada ~1-2%)"],
        "ea": ["Diarrea", "Náuseas", "Reacciones alérgicas", "Flebitis en sitio IV", "Colitis por C. difficile", "Eosinofilia"],
        "ix": ["Aminoglucósidos: nefrotoxicidad aditiva", "Probenecid: aumenta niveles", "Anticoagulantes: algunas cefalosporinas aumentan INR"],
        "ce": ["Verificar alergias a betalactámicos", "Vigilar función renal", "Administrar IV lentamente", "Monitorizar signos de superinfección"],
        "emb": "B"
    },
    "quinolona": {
        "familia": "Quinolonas (fluoroquinolonas)",
        "ci": ["Hipersensibilidad a quinolonas", "Menores de 18 años (daño cartílago)", "Embarazo y lactancia", "Antecedente de tendinopatía por quinolonas", "Déficit G6PD"],
        "ea": ["Náuseas", "Diarrea", "Cefalea", "Tendinitis/rotura tendinosa", "Prolongación QT", "Fotosensibilidad", "Neuropatía periférica"],
        "ix": ["Antiácidos/hierro/calcio: reducen absorción", "Warfarina: aumenta INR", "Teofilina: aumenta niveles", "Corticoides: mayor riesgo tendinitis"],
        "ce": ["No administrar con antiácidos (separar 2h)", "Educar sobre riesgo de tendinitis (suspender si dolor)", "Hidratación adecuada", "Fotoprotección durante tratamiento"],
        "emb": "C"
    },
    "macrolido": {
        "familia": "Macrólidos",
        "ci": ["Hipersensibilidad a macrólidos", "Insuficiencia hepática grave", "Uso con ergotamínicos"],
        "ea": ["Náuseas", "Dolor abdominal", "Diarrea", "Prolongación QT", "Hepatotoxicidad", "Ototoxicidad (dosis altas)"],
        "ix": ["Estatinas: mayor riesgo miopatía", "Warfarina: aumenta INR", "Digoxina: aumenta niveles", "Carbamazepina: aumenta niveles"],
        "ce": ["Vigilar función hepática", "ECG si uso con otros fármacos que prolongan QT", "Azitromicina: tomar en ayunas", "Claritromicina: puede tomarse con alimentos"],
        "emb": "B"
    },
    "antirretroviral": {
        "familia": "Antirretrovirales",
        "ci": ["Hipersensibilidad al fármaco", "Insuficiencia hepática grave (según fármaco)"],
        "ea": ["Náuseas", "Diarrea", "Cefalea", "Fatiga", "Lipodistrofia", "Hepatotoxicidad", "Síndrome de reconstitución inmune"],
        "ix": ["Múltiples interacciones por CYP3A4", "Rifampicina: reduce niveles de muchos ARV", "Consultar SIEMPRE base de interacciones ARV"],
        "ce": ["Adherencia estricta (>95%) es crítica", "Monitorizar carga viral y CD4", "Vigilar función hepática y renal", "Educar sobre importancia de no omitir dosis", "Verificar interacciones con TODA la medicación"],
        "emb": "B"
    },
    "antifungico_sistemico": {
        "familia": "Antifúngicos sistémicos",
        "ci": ["Hipersensibilidad", "Insuficiencia hepática grave", "Uso con fármacos que prolongan QT (azoles)"],
        "ea": ["Hepatotoxicidad", "Náuseas", "Cefalea", "Alteraciones visuales (voriconazol)", "Nefrotoxicidad (anfotericina)"],
        "ix": ["Warfarina: azoles aumentan INR", "Ciclosporina: aumenta niveles", "Fenitoína: interacción bidireccional", "Estatinas: riesgo miopatía"],
        "ce": ["Monitorizar función hepática y renal", "Vigilar niveles plasmáticos si disponible", "Hidratación pre-infusión (anfotericina)", "Tratamientos prolongados requieren seguimiento estrecho"],
        "emb": "C"
    },
    "antituberculoso": {
        "familia": "Antituberculosos",
        "ci": ["Hipersensibilidad", "Insuficiencia hepática grave (según fármaco)"],
        "ea": ["Hepatotoxicidad", "Náuseas", "Neuropatía periférica (isoniazida)", "Hiperuricemia (pirazinamida)", "Coloración roja de fluidos (rifampicina)"],
        "ix": ["Rifampicina: inductor potente CYP450", "Isoniazida: inhibe metabolismo de fenitoína", "Pirazinamida: antagoniza alopurinol"],
        "ce": ["Función hepática mensual durante tratamiento", "Tratamiento supervisado (DOTS/TAES)", "Educar sobre duración mínima 6 meses", "Vigilar signos hepatotoxicidad: ictericia, dolor abdominal"],
        "emb": "C"
    },
    "antiparasitario": {
        "familia": "Antiparasitarios",
        "ci": ["Hipersensibilidad", "Embarazo primer trimestre (muchos)"],
        "ea": ["Náuseas", "Dolor abdominal", "Cefalea", "Mareo", "Elevación transaminasas"],
        "ix": ["Cimetidina: aumenta niveles de albendazol", "Carbamazepina: reduce niveles"],
        "ce": ["Administrar con alimentos grasos (albendazol)", "Hemograma en tratamientos prolongados", "Tratar contactos si indicado", "Verificar curación parasitológica post-tratamiento"],
        "emb": "C"
    },
    # ── U04 RESPIRATORIO ──
    "broncodilatador_beta2": {
        "familia": "Broncodilatadores beta-2 agonistas",
        "ci": ["Hipersensibilidad", "Taquiarritmias", "Cardiopatía isquémica inestable"],
        "ea": ["Temblor", "Taquicardia", "Palpitaciones", "Cefalea", "Hipopotasemia", "Calambres musculares"],
        "ix": ["Betabloqueantes: antagonismo", "Diuréticos: mayor hipopotasemia", "Corticoides: mayor hipopotasemia"],
        "ce": ["Enseñar técnica inhalatoria correcta", "Enjuagar boca después de cada uso", "Diferenciar rescate vs mantenimiento", "Monitorizar FC y K+ en uso frecuente"],
        "emb": "C"
    },
    "anticolinergico_inhalado": {
        "familia": "Anticolinérgicos inhalados",
        "ci": ["Hipersensibilidad a atropina o derivados", "Glaucoma de ángulo cerrado", "Obstrucción urinaria"],
        "ea": ["Boca seca", "Retención urinaria", "Estreñimiento", "Cefalea", "Glaucoma agudo (si contacto ocular)"],
        "ix": ["Otros anticolinérgicos: efectos aditivos", "Betabloqueantes: precaución"],
        "ce": ["Técnica inhalatoria correcta", "Evitar contacto con ojos", "Enjuagar boca post-uso", "Vigilar retención urinaria en pacientes prostáticos"],
        "emb": "B"
    },
    "corticoide_inhalado": {
        "familia": "Corticosteroides inhalados",
        "ci": ["Hipersensibilidad", "Tuberculosis pulmonar activa no tratada", "Infecciones fúngicas sistémicas"],
        "ea": ["Candidiasis orofaríngea", "Disfonía", "Tos", "Supresión adrenal (dosis altas)", "Osteoporosis (uso prolongado dosis altas)"],
        "ix": ["Inhibidores CYP3A4: aumentan niveles sistémicos", "Ritonavir: precaución con fluticasona"],
        "ce": ["Enjuagar boca con agua después de CADA uso", "Usar espaciador con MDI", "No es rescate: uso regular programado", "Vigilar candidiasis oral"],
        "emb": "C"
    },
    # ── U05 DIGESTIVO ──
    "ibp": {
        "familia": "Inhibidores de bomba de protones",
        "ci": ["Hipersensibilidad a IBP", "Uso con rilpivirina o nelfinavir"],
        "ea": ["Cefalea", "Diarrea", "Dolor abdominal", "Hipomagnesemia (uso prolongado)", "Déficit B12 (largo plazo)", "Mayor riesgo C. difficile", "Osteoporosis (uso >1 año)"],
        "ix": ["Clopidogrel: omeprazol reduce activación", "Metotrexato: aumenta niveles", "Ketoconazol: reduce absorción"],
        "ce": ["Administrar 30-60 min antes del desayuno", "Reevaluar necesidad periódicamente", "Vigilar magnesio en uso prolongado", "No triturar cápsulas de liberación retardada"],
        "emb": "B"
    },
    "antiemetico": {
        "familia": "Antieméticos",
        "ci": ["Hipersensibilidad", "Obstrucción GI mecánica (procinéticos)", "Feocromocitoma (metoclopramida)"],
        "ea": ["Cefalea", "Estreñimiento", "Somnolencia", "Síntomas extrapiramidales (metoclopramida)", "Prolongación QT"],
        "ix": ["Depresores SNC: mayor sedación", "Fármacos que prolongan QT: riesgo arritmia"],
        "ce": ["Administrar 30 min antes de quimioterapia si profilaxis", "Vigilar síntomas extrapiramidales", "Valorar hidratación del paciente", "Monitorizar QT si factores de riesgo"],
        "emb": "B"
    },
    # ── U06 ENDOCRINO ──
    "insulina": {
        "familia": "Insulinas",
        "ci": ["Hipersensibilidad", "Hipoglucemia"],
        "ea": ["Hipoglucemia", "Lipodistrofia en sitio de inyección", "Aumento de peso", "Edema", "Reacción local"],
        "ix": ["Betabloqueantes: enmascaran hipoglucemia", "Corticoides: antagonizan efecto", "Tiazolidinedionas: mayor retención líquidos"],
        "ce": ["Rotar sitios de inyección", "Monitorizar glucemia capilar", "Educar sobre signos de hipoglucemia", "Conservar en refrigeración (2-8°C), no congelar", "Insulina en uso: temperatura ambiente máx 28 días"],
        "emb": "B"
    },
    "antidiabetico_oral": {
        "familia": "Antidiabéticos orales",
        "ci": ["Hipersensibilidad", "Diabetes tipo 1", "Cetoacidosis diabética"],
        "ea": ["Hipoglucemia (sulfonilureas)", "Molestias GI (metformina)", "Aumento de peso (sulfonilureas)", "Infección genitourinaria (iSGLT2)"],
        "ix": ["Betabloqueantes: enmascaran hipoglucemia", "Corticoides: hiperglucemia", "Alcohol: hipoglucemia con sulfonilureas"],
        "ce": ["Monitorizar glucemia y HbA1c", "Educar sobre dieta y ejercicio", "Metformina con alimentos", "Vigilar función renal periódicamente"],
        "emb": "B"
    },
    "corticoide_sistemico": {
        "familia": "Corticosteroides sistémicos",
        "ci": ["Infecciones sistémicas no tratadas", "Vacunas vivas", "Úlcera péptica activa (relativa)"],
        "ea": ["Hiperglucemia", "Osteoporosis", "Síndrome de Cushing", "Inmunosupresión", "HTA", "Miopatía", "Trastornos psiquiátricos", "Úlcera péptica"],
        "ix": ["AINEs: mayor riesgo ulcus", "Antidiabéticos: antagonismo", "Diuréticos: mayor hipopotasemia", "Vacunas vivas: contraindicadas"],
        "ce": ["No suspender bruscamente (insuficiencia adrenal)", "Monitorizar glucemia", "Protección gástrica si uso prolongado", "Vigilar signos de infección", "Suplementar calcio/vitamina D"],
        "emb": "C"
    },
    # ── U07 REPRODUCTOR ──
    "anticonceptivo_hormonal": {
        "familia": "Anticonceptivos hormonales",
        "ci": ["Tromboembolismo activo o antecedente", "Cáncer de mama", "Hepatopatía activa", "Tabaquismo >35 años", "Migraña con aura"],
        "ea": ["Cefalea", "Náuseas", "Sangrado irregular", "Tensión mamaria", "Cambios de humor", "Tromboembolismo (raro)"],
        "ix": ["Rifampicina: reduce eficacia", "Anticonvulsivantes inductores: reducen eficacia", "Antibióticos: posible reducción eficacia"],
        "ce": ["Tomar a la misma hora cada día", "Educar sobre qué hacer ante olvido", "Vigilar signos de TEV (dolor pierna, disnea)", "No fumar durante uso"],
        "emb": "X"
    },
    # ── U08 MUSCULOESQUELÉTICO ──
    "aine": {
        "familia": "Antiinflamatorios no esteroideos",
        "ci": ["Hipersensibilidad a AINEs", "Úlcera GI activa", "Insuficiencia renal grave", "Tercer trimestre embarazo", "Asma por AINEs"],
        "ea": ["Dolor epigástrico", "Náuseas", "Úlcera GI", "Hemorragia digestiva", "Nefrotoxicidad", "HTA", "Edema", "Riesgo cardiovascular"],
        "ix": ["Anticoagulantes: mayor riesgo sangrado", "IECA/ARA-II: reducen efecto y nefrotoxicidad", "Litio: aumenta niveles", "Metotrexato: aumenta toxicidad", "Corticoides: mayor riesgo ulcus"],
        "ce": ["Administrar con alimentos", "Usar menor dosis y tiempo posible", "Vigilar función renal", "Educación sobre signos de sangrado GI", "Protección gástrica en pacientes de riesgo"],
        "emb": "C"
    },
    "inmunosupresor": {
        "familia": "Inmunosupresores/Biológicos",
        "ci": ["Hipersensibilidad", "Infección activa grave", "Tuberculosis latente no tratada (biológicos)", "Inmunodeficiencia severa"],
        "ea": ["Mayor riesgo infecciones", "Hepatotoxicidad", "Mielosupresión", "Reacciones infusionales (biológicos)", "Reactivación infecciones latentes"],
        "ix": ["Vacunas vivas: contraindicadas", "Otros inmunosupresores: infección aditiva", "AINEs: nefrotoxicidad con metotrexato"],
        "ce": ["Hemograma y función hepática periódicos", "Cribado TB antes de biológicos", "Vigilar signos de infección", "Verificar vacunación completa antes de iniciar"],
        "emb": "X"
    },
    # ── U09 DERMATOLOGÍA ──
    "corticoide_topico": {
        "familia": "Corticosteroides tópicos",
        "ci": ["Infecciones cutáneas no tratadas", "Rosácea", "Dermatitis perioral", "Hipersensibilidad"],
        "ea": ["Atrofia cutánea", "Estrías", "Telangiectasias", "Dermatitis de rebote", "Hipopigmentación", "Foliculitis"],
        "ix": ["Mínimas interacciones sistémicas en uso tópico", "En áreas extensas: absorción sistémica significativa"],
        "ce": ["Aplicar capa fina", "No ocluir salvo indicación", "Usar mínimo tiempo necesario", "No aplicar en cara con potencia alta", "Descenso gradual en uso prolongado"],
        "emb": "C"
    },
    # ── U10 HEMATOLOGÍA ──
    "anticoagulante_oral": {
        "familia": "Anticoagulantes orales directos",
        "ci": ["Hemorragia activa", "Prótesis valvular mecánica", "Insuficiencia hepática con coagulopatía", "Embarazo"],
        "ea": ["Hemorragia", "Anemia", "Hematomas", "Epistaxis", "Hematuria", "Hemorragia GI"],
        "ix": ["Antiagregantes: mayor sangrado", "AINEs: mayor sangrado", "Inhibidores P-gp/CYP3A4: aumentan niveles", "Inductores: reducen niveles"],
        "ce": ["Vigilar signos de sangrado", "Función renal periódica (dabigatrán)", "Conocer antídoto específico", "No se monitoriza con INR", "Educar sobre riesgo de sangrado"],
        "emb": "X"
    },
    "heparina": {
        "familia": "Heparinas",
        "ci": ["Hemorragia activa", "Trombocitopenia inducida por heparina (HIT)", "Coagulopatía severa"],
        "ea": ["Hemorragia", "Trombocitopenia (HIT)", "Osteoporosis (uso prolongado)", "Hematoma en sitio inyección", "Hiperpotasemia"],
        "ix": ["Antiagregantes: mayor sangrado", "AINEs: mayor sangrado", "Trombolíticos: mayor riesgo hemorragia"],
        "ce": ["No administrar IM", "Rotar sitios SC", "Monitorizar plaquetas (HIT)", "Protamina es antídoto de HNF", "TTPa para HNF, anti-Xa para HBPM si indicado"],
        "emb": "C"
    },
    # ── U11 ANTÍDOTOS ──
    "antidoto": {
        "familia": "Antídotos",
        "ci": ["Hipersensibilidad al fármaco"],
        "ea": ["Variables según antídoto específico", "Náuseas", "Cefalea"],
        "ix": ["Pueden revertir efecto del fármaco original"],
        "ce": ["Administración urgente: no demorar por dudas", "Monitorización continua post-administración", "Repetir dosis si recurrencia de síntomas", "Documentar hora y dosis exacta"],
        "emb": "C"
    },
    # ── U12 HOSPITALARIOS ──
    "anestesico_general": {
        "familia": "Anestésicos generales",
        "ci": ["Hipersensibilidad", "Hipertermia maligna (succinilcolina/halogenados)", "Vía aérea difícil no anticipada (relajantes sin plan)"],
        "ea": ["Hipotensión", "Depresión respiratoria", "Náuseas/vómitos postoperatorios", "Bradicardia", "Hipertermia maligna (raro)"],
        "ix": ["Opioides: potencian depresión respiratoria", "Benzodiazepinas: sedación aditiva", "Anticolinesterásicos: prolongan bloqueo con succinilcolina"],
        "ce": ["Monitorización continua (ECG, SatO2, ETCO2, TA)", "Equipo de vía aérea disponible", "Vigilar termorregulación", "Valorar nivel de consciencia post-anestesia (Aldrete)"],
        "emb": "C"
    },
    "antineoplasico": {
        "familia": "Antineoplásicos",
        "ci": ["Hipersensibilidad", "Mielosupresión severa preexistente", "Embarazo", "Infección activa no controlada"],
        "ea": ["Mielosupresión (neutropenia, anemia, trombocitopenia)", "Náuseas y vómitos", "Alopecia", "Mucositis", "Hepatotoxicidad", "Nefrotoxicidad"],
        "ix": ["Vacunas vivas: contraindicadas", "Otros citotóxicos: mielosupresión aditiva", "Inmunosupresores: mayor riesgo infección"],
        "ce": ["Uso de EPP en preparación y administración", "Verificar hemograma previo a cada ciclo", "Protocolo de extravasación disponible", "Premedicación antiemética según protocolo", "Vigilar signos de neutropenia febril"],
        "emb": "X"
    },
    "vasopressor": {
        "familia": "Vasopresores e inotrópicos",
        "ci": ["Taquiarritmias no controladas (según fármaco)", "Feocromocitoma (simpaticomiméticos)", "Hipersensibilidad"],
        "ea": ["Taquicardia", "Arritmias", "Isquemia periférica", "HTA", "Necrosis tisular por extravasación"],
        "ix": ["IMAO: crisis hipertensiva con simpaticomiméticos", "Betabloqueantes: antagonismo", "Halogenados: mayor riesgo arritmia"],
        "ce": ["Administrar SIEMPRE por vía central preferentemente", "Monitorización hemodinámica continua", "Vigilar extravasación (necrosis)", "Titular según respuesta de TA/FC", "Fentolamina como antídoto de extravasación"],
        "emb": "C"
    },
}

def make_drug(template_key, id, nombre, generico, comerciales, clasificacion, mecanismo,
              indicaciones, vias, dosis, presentaciones, lactancia, unidad_id, capitulo_id, **overrides):
    """
    Create a drug dict from a template + individual fields.
    Template provides: familia, ci, ea, ix, ce, emb.
    Overrides can replace any template field.
    Extra kwargs: fk (farmacocinetica), pp (preparacionParenteral), alm (almacenamiento),
                  ci, ea, ix, ce, emb, familia, pediatrico, geriatrico, ajusteRenal, ajusteHepatico.
    """
    tmpl = TEMPLATES.get(template_key, {})

    # Build dosis dict
    if isinstance(dosis, str):
        dosis_dict = {"adulto": dosis}
    else:
        dosis_dict = dosis
    # Add optional dosis fields from overrides
    for dk in ("pediatrico", "geriatrico", "ajusteRenal", "ajusteHepatico"):
        if dk in overrides:
            dosis_dict[dk] = overrides.pop(dk)

    drug = {
        "id": id,
        "nombre": nombre,
        "nombreGenerico": generico,
        "nombresComerciales": comerciales,
        "familia": overrides.pop("familia", tmpl.get("familia", "")),
        "clasificacion": clasificacion,
        "mecanismoAccion": mecanismo,
        "indicaciones": indicaciones,
        "contraindicaciones": overrides.pop("ci", tmpl.get("ci", [])),
        "efectosAdversos": overrides.pop("ea", tmpl.get("ea", [])),
        "interacciones": overrides.pop("ix", tmpl.get("ix", [])),
        "viaAdministracion": vias,
        "dosis": dosis_dict,
        "presentaciones": presentaciones,
        "embarazo": overrides.pop("emb", tmpl.get("emb", "C")),
        "lactancia": lactancia,
        "cuidadosEnfermeria": overrides.pop("ce", tmpl.get("ce", [])),
        "unidadId": unidad_id,
        "capituloId": capitulo_id,
    }
    # Optional fields
    if "fk" in overrides:
        drug["farmacocinetica"] = overrides.pop("fk")
    if "pp" in overrides:
        drug["preparacionParenteral"] = overrides.pop("pp")
    if "alm" in overrides:
        drug["almacenamiento"] = overrides.pop("alm")
    return drug
