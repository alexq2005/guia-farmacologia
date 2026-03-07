import json
import sys

with open('src/data/drugs.json', 'r', encoding='utf-8') as f:
    drugs = json.load(f)

# Comprehensive dilution + reconstitution rules based on official ficha tecnica
# Format: keyword -> { prep, sol, obs, recon (reconstitucion) }
DILUTION_DB = {
    'propofol': {
        'prep': 'Puede administrarse sin diluir (1% o 2%). Si se diluye, usar SOLO SG5%. Concentracion minima: 2 mg/mL. Usar dentro de 6h (sin conservantes).',
        'sol': ['SG5% (unico diluyente aprobado)', 'SF 0.9% (solo coadministracion en Y)', 'Lidocaina 1% sin conservantes (max 20 mg/200 mg propofol para reducir dolor)'],
        'obs': 'Emulsion lipidica: NO filtrar con filtros <5 micras. Aporta 1.1 kcal/mL (descontar en NPT). Monitorizar TG cada 24-48h. Cambiar equipo cada 12h. Tecnica aseptica estricta.',
        'recon': 'No requiere reconstitucion (emulsion lista para uso).'
    },
    'amiodarona': {
        'prep': 'Diluir SOLO en SG5% (dextrosa 5%). INCOMPATIBLE con SF 0.9% (precipita). Carga: 150 mg en 100 mL SG5%. Mantenimiento: 900 mg en 500 mL SG5%. Concentracion max: 2 mg/mL en via periferica.',
        'sol': ['SG5% (unico diluyente compatible)', 'INCOMPATIBLE con SF 0.9% (precipitacion)', 'INCOMPATIBLE con bicarbonato'],
        'obs': 'Usar envases de vidrio o poliolefina (no PVC, absorbe el farmaco). Via central preferible si >24h. Fotosensible: proteger de la luz durante infusion prolongada.',
        'recon': 'No requiere reconstitucion (solucion inyectable lista). Diluir directamente la ampolla en SG5%.'
    },
    'noradrenalina': {
        'prep': 'Diluir en SG5% exclusivamente. Dilucion estandar: 4 mg (4 mL) en 250 mL SG5% = 16 mcg/mL. Evitar SF 0.9% (puede acelerar oxidacion). pH acido necesario para estabilidad.',
        'sol': ['SG5% (diluyente de eleccion)', 'SF 0.9% (uso aceptable si SG5% no disponible, pero menor estabilidad)', 'INCOMPATIBLE con soluciones alcalinas'],
        'obs': 'Administrar por via central (riesgo de necrosis tisular por extravasacion). Si extravasa: infiltrar fentolamina 5-10 mg en 10-15 mL SF en la zona. Proteger de la luz.',
        'recon': 'No requiere reconstitucion (solucion concentrada lista). Diluir la ampolla directamente.'
    },
    'fenitoina': {
        'prep': 'Diluir SOLO en SF 0.9%. INCOMPATIBLE con SG5% (precipita por pH acido). Concentracion: 1-10 mg/mL. Velocidad max: 50 mg/min adultos, 1-3 mg/kg/min pediatrico.',
        'sol': ['SF 0.9% (unico diluyente compatible)', 'INCOMPATIBLE con SG5% (precipitacion inmediata)', 'INCOMPATIBLE con soluciones con pH >11.5'],
        'obs': 'Usar filtro en linea 0.22 micras (microparticulas). Administrar inmediatamente tras dilucion. No mezclar con otros farmacos. Monitorizar ECG durante infusion. Muy irritante: preferir via central.',
        'recon': 'No requiere reconstitucion (solucion inyectable). Diluir directamente en SF 0.9%.'
    },
    'nitroglicerina': {
        'prep': 'Diluir en SG5% preferentemente. Compatible con SF 0.9% pero puede perder potencia en envases PVC. Dilucion: 50 mg en 250-500 mL. Titular segun PA.',
        'sol': ['SG5% (preferente)', 'SF 0.9% (compatible)', 'Usar envases de VIDRIO o poliolefina (no PVC, absorbe 40-80% del farmaco)'],
        'obs': 'Usar sistemas de infusion sin PVC. Si se usan equipos PVC, la dosis real sera significativamente menor. No mezclar con otros farmacos.',
        'recon': 'No requiere reconstitucion (solucion concentrada). Diluir la ampolla en el volumen indicado.'
    },
    'nitroprusiato': {
        'prep': 'Reconstituir con SG5% exclusivamente. Diluir 50 mg en 250-1000 mL SG5%. INCOMPATIBLE con SF 0.9%. Concentracion habitual: 200 mcg/mL.',
        'sol': ['SG5% (unico diluyente)', 'INCOMPATIBLE con SF 0.9%', 'INCOMPATIBLE con soluciones alcalinas'],
        'obs': 'PROTEGER DE LA LUZ obligatorio (fotodegradacion a cianuro). Cubrir frasco y equipo con papel aluminio. Solucion estable 24h protegida. Color marron/azul = descartar. Monitorizar tiocianatos si >48h.',
        'recon': 'Reconstituir el vial con 2-3 mL de SG5%. Disolver completamente. Luego diluir en 250-1000 mL SG5%. Color resultante: marron claro. Descartar si azul, verde oscuro o muy turbio.'
    },
    'anfotericina b': {
        'prep': 'Reconstituir con agua esteril para inyeccion. Diluir SOLO en SG5%. INCOMPATIBLE con SF 0.9% y cualquier solucion con electrolitos (precipita). Convencional: 0.1 mg/mL. Liposomal: 1-2 mg/mL.',
        'sol': ['SG5% (unico diluyente)', 'INCOMPATIBLE con SF 0.9%', 'INCOMPATIBLE con soluciones con electrolitos', 'INCOMPATIBLE con la mayoria de farmacos IV'],
        'obs': 'Administrar dosis de prueba (1 mg en 20 min). Infundir en 2-6h. Usar filtro >1 micra (convencional). Premedicar: paracetamol + difenhidramina +/- hidrocortisona. Monitorizar K, Mg, creatinina.',
        'recon': 'Convencional: reconstituir 50 mg con 10 mL agua esteril (agitar hasta disolver, NO usar SF). Liposomal (AmBisome): reconstituir con 12 mL agua esteril, agitar vigorosamente 30 seg. Luego diluir en SG5%.'
    },
    'vancomicina': {
        'prep': 'Reconstituir con agua esteril (20 mL por vial de 1g). Diluir en minimo 200 mL (500 mg) o 500 mL (1g) de SF 0.9% o SG5%. Concentracion max: 5 mg/mL. Infundir en minimo 60 min (1g) para evitar sindrome del hombre rojo.',
        'sol': ['SF 0.9% (preferente)', 'SG5% (compatible)', 'Ringer Lactato (compatible)'],
        'obs': 'Velocidad maxima: 10 mg/min. Infundir en 60+ min para evitar sindrome del hombre rojo (liberacion histamina). Monitorizar niveles valle (15-20 mcg/mL en infecciones graves). Nefrotoxica: vigilar creatinina.',
        'recon': 'Reconstituir cada vial de 500 mg con 10 mL de agua esteril, o 1 g con 20 mL. Agitar hasta disolucion completa. Solucion resultante: 50 mg/mL. Luego diluir obligatoriamente antes de infundir.'
    },
    'diazepam': {
        'prep': 'NO DILUIR. Administrar IV directo lento (max 5 mg/min = 1 mL/min). Si es necesario diluir, solo con SF 0.9% en pequeno volumen y usar inmediatamente. Se absorbe en PVC.',
        'sol': ['Preferentemente sin diluir', 'SF 0.9% (si es necesario, usar inmediatamente)', 'INCOMPATIBLE con SG5% (precipita)', 'Se absorbe en tubos PVC'],
        'obs': 'Muy irritante venoso: usar vena grande. No mezclar con otros farmacos. Tener flumazenilo disponible. Depresion respiratoria potenciada con opioides.',
        'recon': 'No requiere reconstitucion (solucion inyectable lista para uso directo).'
    },
    'midazolam': {
        'prep': 'Puede administrarse sin diluir IM/IV directo. Para infusion continua: diluir en SF 0.9% o SG5%. Concentracion habitual UCI: 0.5-1 mg/mL.',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible)', 'Ringer Lactato (compatible)'],
        'obs': 'Estable 24h en SF/SG5. Compatible con opioides en misma jeringa. Tener flumazenilo disponible. Reducir dosis en ancianos e insuficiencia hepatica.',
        'recon': 'No requiere reconstitucion (solucion inyectable lista).'
    },
    'insulina': {
        'prep': 'Diluir en SF 0.9% (preferente). Dilucion habitual CAD: 50 UI en 50 mL SF = 1 UI/mL. Compatible con SG5% (usar cuando se necesita aporte glucemico). Purgar el equipo con 50 mL de la solucion (la insulina se adsorbe al PVC).',
        'sol': ['SF 0.9% (preferente para CAD/hiperpotasemia)', 'SG5% (para esquemas con aporte glucemico)', 'INCOMPATIBLE con bicarbonato sodico'],
        'obs': 'La insulina se adsorbe al plastico: purgar equipo 20-50 mL antes de conectar al paciente. Monitorizar glucemia horaria en infusion. K+ cada 2-4h. Usar bomba de infusion siempre.',
        'recon': 'No requiere reconstitucion (solucion lista). Diluir directamente del vial.'
    },
    'heparina': {
        'prep': 'Diluir en SF 0.9% o SG5%. Dilucion estandar: 25,000 UI en 250 mL SF = 100 UI/mL. Compatible con ambas soluciones. Usar bomba de infusion.',
        'sol': ['SF 0.9% (preferente)', 'SG5% (compatible)', 'INCOMPATIBLE con alteplasa, amiodarona, diazepam, fenitoina, vancomicina'],
        'obs': 'Ajustar segun TTPa cada 6h (objetivo 1.5-2.5x control). Monitorizar plaquetas (riesgo HIT). Antidoto: protamina 1 mg por cada 100 UI. No administrar IM.',
        'recon': 'No requiere reconstitucion (solucion lista para dilucion).'
    },
    'furosemida': {
        'prep': 'IV directo lento (max 4 mg/min = 0.5 mg/kg/min). Para infusion: diluir en SF 0.9% o SG5%. Concentracion: 1-2 mg/mL. pH alcalino: incompatible con soluciones acidas.',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible, pero usar inmediatamente)', 'INCOMPATIBLE con soluciones acidas (pH <5.5)'],
        'obs': 'Proteger de la luz (fotosensible). No mezclar con dobutamina, dopamina, milrinona. Monitorizar K+, Na+, Mg2+, Ca2+, acido urico. Ototoxica a velocidad >4 mg/min.',
        'recon': 'No requiere reconstitucion (solucion inyectable lista).'
    },
    'manitol': {
        'prep': 'NO DILUIR. Administrar la solucion comercial directamente (10%, 15% o 20%). Puede cristalizar a baja temperatura: calentar a 37 grados C y agitar. Usar filtro en linea.',
        'sol': ['No requiere dilucion', 'NO mezclar con otros farmacos', 'NO mezclar con sangre (causa aglutinacion)'],
        'obs': 'Usar filtro en linea (15-20 micras). Verificar ausencia de cristales antes de infundir. No administrar si solucion turbia. Monitorizar osmolalidad serica (suspender si >320 mOsm/kg), Na+, K+, balance hidrico.',
        'recon': 'No requiere reconstitucion (solucion lista para uso directo). Si cristaliza, calentar en bano maria a 37 grados C hasta disolucion completa.'
    },
    'dopamina': {
        'prep': 'Diluir en SF 0.9% o SG5%. Dilucion estandar: 400 mg en 250 mL = 1600 mcg/mL. Usar bomba de infusion obligatorio. Via central preferible a dosis >10 mcg/kg/min.',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible)', 'Ringer Lactato (compatible)', 'INCOMPATIBLE con bicarbonato, fenitoina, tiopental'],
        'obs': 'Extravasacion causa necrosis: antidoto fentolamina local. No mezclar con soluciones alcalinas. Inactivada por bicarbonato. Estable 24h tras dilucion.',
        'recon': 'No requiere reconstitucion (solucion concentrada en ampolla). Diluir directamente.'
    },
    'dobutamina': {
        'prep': 'Reconstituir si liofilizado con agua esteril. Diluir en SF 0.9% o SG5%. Dilucion habitual: 250 mg en 250 mL = 1000 mcg/mL. Concentracion max: 5 mg/mL.',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible)', 'Ringer Lactato (compatible)', 'INCOMPATIBLE con bicarbonato, fenitoina, heparina en alta concentracion'],
        'obs': 'Color rosado de la solucion es normal (oxidacion leve, no afecta potencia). Usar en 24h tras dilucion. Monitorizar FC, PA, ECG, diuresis continuamente.',
        'recon': 'Si liofilizado: reconstituir con 10 mL de agua esteril o SG5%. Agitar hasta disolucion. Si solucion concentrada: diluir directamente.'
    },
    'adrenalina': {
        'prep': 'PCR: 1 mg sin diluir IV/IO push. Infusion: diluir en SF 0.9% o SG5%. Dilucion: 1 mg en 250 mL = 4 mcg/mL. Anafilaxia: IM sin diluir en cara anterolateral del muslo.',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible)', 'INCOMPATIBLE con bicarbonato sodico (inactivacion)', 'INCOMPATIBLE con soluciones alcalinas'],
        'obs': 'Proteger de la luz. Descartar si color marron/rosado. Estable 24h en SF/SG5 protegida de luz. Extravasacion: fentolamina local. Via central si infusion continua.',
        'recon': 'No requiere reconstitucion (solucion inyectable lista 1 mg/mL). Diluir para infusion continua.'
    },
    'pantoprazol': {
        'prep': 'Reconstituir con 10 mL SF 0.9%. Para infusion: diluir en 100 mL SF 0.9%. INCOMPATIBLE con SG5% y Ringer Lactato. Administrar en 2-15 min (bolo) o 15-60 min (infusion).',
        'sol': ['SF 0.9% (unico diluyente compatible)', 'INCOMPATIBLE con SG5% (inestable)', 'INCOMPATIBLE con Ringer Lactato'],
        'obs': 'Usar dentro de 12h tras reconstitucion (6h a temperatura ambiente). No mezclar con otros farmacos en misma linea. Filtro en linea no necesario.',
        'recon': 'Reconstituir el vial liofilizado (40 mg) con 10 mL de SF 0.9%. Agitar suavemente hasta disolucion completa. Solucion resultante: 4 mg/mL. Aspecto: transparente e incoloro.'
    },
    'omeprazol': {
        'prep': 'Reconstituir con 10 mL del disolvente especial proporcionado o SF 0.9%. Administrar IV lento en 5+ min. Para infusion: diluir en 100 mL SF 0.9%. INCOMPATIBLE con SG5%.',
        'sol': ['SF 0.9% (diluyente de eleccion)', 'INCOMPATIBLE con SG5%', 'INCOMPATIBLE con Ringer Lactato'],
        'obs': 'Usar dentro de 4h tras reconstitucion. pH alcalino: incompatible con farmacos acidos. Proteger de la luz.',
        'recon': 'Reconstituir el vial (40 mg) con 10 mL de disolvente especifico (incluido) o SF 0.9%. No usar otros diluyentes para la reconstitucion. Agitar suavemente. Usar dentro de 4 horas.'
    },
    'aciclovir': {
        'prep': 'Reconstituir con agua esteril para inyeccion. Diluir en minimo 100 mL de SF 0.9% o SG5%. Concentracion max: 7 mg/mL. Infundir en minimo 1 hora.',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible)', 'INCOMPATIBLE con soluciones con pH >11'],
        'obs': 'Hidratacion adecuada obligatoria (riesgo de nefropatia cristalina). Infundir lentamente 1+ hora. Monitorizar funcion renal y diuresis. Ajustar dosis en IR.',
        'recon': 'Reconstituir vial de 250 mg con 10 mL de agua esteril, o vial de 500 mg con 20 mL. Agitar hasta disolucion completa (concentracion: 25 mg/mL). Luego diluir obligatoriamente en 100+ mL.'
    },
    'metronidazol': {
        'prep': 'La presentacion IV ya viene lista para infundir (5 mg/mL en 100 mL). No requiere dilucion adicional. Infundir en 20-60 min.',
        'sol': ['Ya preparado para infusion directa', 'Compatible con SF 0.9% (coadministracion en Y)', 'Compatible con SG5% (coadministracion en Y)'],
        'obs': 'Proteger de la luz. No refrigerar (puede cristalizar). Efecto antabus: evitar alcohol hasta 48h post-tratamiento.',
        'recon': 'No requiere reconstitucion. La presentacion IV viene lista en bolsa de 100 mL (500 mg/100 mL = 5 mg/mL).'
    },
    'ciprofloxacino': {
        'prep': 'La presentacion IV ya viene diluida lista para infundir (2 mg/mL en 100-200 mL). Si concentrado: diluir en SF 0.9% o SG5% hasta 1-2 mg/mL. Infundir en 60 min.',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible)', 'Ringer Lactato (compatible)', 'INCOMPATIBLE con soluciones alcalinas y bicarbonato'],
        'obs': 'Infundir en 60+ min (reduce riesgo de irritacion venosa y arritmias). Fotosensible: proteger de luz directa. No administrar con Mg, Ca, Fe oral (quelacion).',
        'recon': 'No requiere reconstitucion. Presentacion IV en bolsa lista para infusion. Si concentrado (10 mg/mL): diluir 200-400 mg en 100-200 mL de SF 0.9% o SG5%.'
    },
    'potasio': {
        'prep': 'NUNCA administrar sin diluir (mortal). Diluir en SF 0.9% o SG5%. Concentracion max periferica: 40 mEq/L. Concentracion max central: 60-80 mEq/L. Velocidad max: 10-20 mEq/h (40 mEq/h solo en emergencia con monitorizacion ECG).',
        'sol': ['SF 0.9% (preferente)', 'SG5% (compatible)', 'INCOMPATIBLE con manitol, anfotericina B, diazepam'],
        'obs': 'ALTO RIESGO: verificar dosis y concentracion antes de administrar. Usar bomba de infusion siempre. Monitorizar ECG continuo si >10 mEq/h. Dolor en vena periferica: considerar via central.',
        'recon': 'No requiere reconstitucion. La solucion concentrada (ampollas de KCl) debe diluirse OBLIGATORIAMENTE antes de administrar. Nunca en bolo directo.'
    },
    'magnesio sulfato': {
        'prep': 'Diluir en SF 0.9% o SG5%. Eclampsia: 4-6 g en 100 mL en 15-20 min. Infusion mantenimiento: 1-2 g/h. Torsade: 1-2 g en 50-100 mL en 5-60 min.',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible)', 'INCOMPATIBLE con calcio (misma linea), bicarbonato, fosfatos'],
        'obs': 'Monitorizar reflejo patelar (abolicion = sobredosis), FR (suspender si <12), diuresis. Antidoto: gluconato de calcio 1g IV. Tener preparado siempre durante infusion.',
        'recon': 'No requiere reconstitucion. Solucion concentrada en ampollas (10-50%). Diluir obligatoriamente antes de infusion IV.'
    },
    'calcio gluconato': {
        'prep': 'Puede administrarse IV directo lento (max 1.5-2 mL/min) o diluido en 50-100 mL SF 0.9% o SG5% en 30-60 min. Concentracion max periferica: 50 mg/mL.',
        'sol': ['SF 0.9% (preferente)', 'SG5% (compatible)', 'INCOMPATIBLE con bicarbonato sodico (precipita CaCO3)', 'INCOMPATIBLE con fosfatos, ceftriaxona'],
        'obs': 'NUNCA mezclar con bicarbonato ni ceftriaxona (precipitacion letal en neonatos). Verificar permeabilidad IV (necrosis si extravasa). Monitorizar ECG si administracion rapida.',
        'recon': 'No requiere reconstitucion (solucion inyectable lista al 10% = 100 mg/mL). Puede diluirse para infusion.'
    },
    'fenobarbital': {
        'prep': 'Diluir en SF 0.9% o SG5% hasta concentracion de 10-65 mg/mL para infusion. Velocidad max: 60 mg/min (adultos), 30 mg/min (pediatrico). IV directo lento tambien aceptable.',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible, menos estable)', 'Agua esteril para reconstitucion', 'INCOMPATIBLE con soluciones acidas'],
        'obs': 'pH muy alcalino (>9): irritante venoso, preferir vena grande. INCOMPATIBLE en mezcla con: vancomicina, insulina, opioides, clindamicina. Monitorizar FR y SatO2.',
        'recon': 'Si liofilizado: reconstituir con agua esteril para inyeccion (volumen segun presentacion). Agitar hasta disolucion. Si solucion inyectable: lista para uso directo o dilucion.'
    },
    'bicarbonato': {
        'prep': 'Puede administrarse sin diluir (concentrado 8.4% = 1 mEq/mL) en emergencias. Para infusion: diluir en SG5% (preferente). Acidosis: calcular deficit = 0.3 x peso x (24 - HCO3 actual).',
        'sol': ['SG5% (diluyente preferente)', 'Agua esteril (para dilucion)', 'INCOMPATIBLE con soluciones de calcio (precipita CaCO3)', 'INCOMPATIBLE con dopamina, adrenalina, noradrenalina'],
        'obs': 'No mezclar con calcio en misma linea (precipitacion). No mezclar con catecolaminas (inactivacion). Lavar linea entre farmacos incompatibles. Monitorizar gasometria, K+, Na+, Ca2+.',
        'recon': 'No requiere reconstitucion. Solucion lista al 8.4% (1 mEq/mL) o al 1/6 M. Diluir si se requiere concentracion menor.'
    },
    'tiopental': {
        'prep': 'Reconstituir SOLO con agua esteril para inyeccion (no SF, no SG5%). Concentracion: 2.5% (25 mg/mL). Administrar IV directo lento. INCOMPATIBLE con SF 0.9% y SG5% (precipita en soluciones acidas).',
        'sol': ['Agua esteril para inyeccion (unico reconstituyente)', 'INCOMPATIBLE con SF 0.9% (precipita)', 'INCOMPATIBLE con SG5%', 'INCOMPATIBLE con la mayoria de farmacos (pH muy alcalino ~10.5)'],
        'obs': 'Extremadamente alcalino: necrosis tisular si extravasa. Tener disponible: via aerea, ventilacion, atropina. No mezclar con succinilcolina en misma jeringa. Usar dentro de 24h.',
        'recon': 'Reconstituir vial de 500 mg con 20 mL de agua esteril para inyeccion (concentracion 25 mg/mL = 2.5%). Reconstituir vial de 1 g con 40 mL. Agitar suavemente. Solucion transparente. NO usar SF ni SG5% para reconstituir.'
    },
    'ondansetron': {
        'prep': 'Puede administrarse IV directo lento (30 seg-2 min) o diluido en 50 mL SF 0.9% o SG5% en 15 min.',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible)', 'Ringer Lactato (compatible)'],
        'obs': 'Estable 48h a temperatura ambiente tras dilucion. Puede prolongar QTc: monitorizar ECG en pacientes de riesgo. Dosis max IV: 16 mg (dosis unica).',
        'recon': 'No requiere reconstitucion (solucion inyectable lista 2 mg/mL).'
    },
    'metoclopramida': {
        'prep': 'IV directo lento (minimo 3-5 min para 10 mg). Para infusion: diluir en SF 0.9% o SG5%.',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible)', 'Ringer Lactato (compatible)'],
        'obs': 'Administracion rapida IV asociada a ansiedad, inquietud, somnolencia. Maximo 5 dias de tratamiento. Riesgo de distonia aguda (tratar con biperideno).',
        'recon': 'No requiere reconstitucion (solucion inyectable lista 5 mg/mL en ampolla de 2 mL).'
    },
    'esomeprazol': {
        'prep': 'Reconstituir con 5 mL SF 0.9%. Para infusion: diluir en 100 mL SF 0.9%. Administrar en 10-30 min. INCOMPATIBLE con SG5%.',
        'sol': ['SF 0.9% (unico diluyente compatible)', 'INCOMPATIBLE con SG5%', 'INCOMPATIBLE con Ringer Lactato'],
        'obs': 'Usar dentro de 12h tras reconstitucion a temperatura ambiente. No mezclar con otros farmacos.',
        'recon': 'Reconstituir el vial liofilizado (40 mg) con 5 mL de SF 0.9%. Agitar suavemente hasta disolucion completa (solucion 8 mg/mL). Luego diluir en 100 mL SF para infusion.'
    },
    'quinina': {
        'prep': 'Dosis de carga: 20 mg/kg diluidos en 500 mL SG5% a pasar en 4h. Mantenimiento: 10 mg/kg en 250 mL SG5% cada 8h. Usar SG5% preferentemente.',
        'sol': ['SG5% (preferente)', 'SF 0.9% (compatible)'],
        'obs': 'Monitorizar ECG continuo (QTc), glucemia (hiperinsulinemia), tinnitus. Reducir dosis si IR o IH. Velocidad lenta obligatoria (riesgo arritmia).',
        'recon': 'No requiere reconstitucion (solucion inyectable en ampolla). Diluir obligatoriamente antes de infundir.'
    },
    'ceftriaxona': {
        'prep': 'Reconstituir con agua esteril o lidocaina 1% (IM). Para IV: diluir en SF 0.9% o SG5%. Infundir en 30 min (intermitente).',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible)', 'INCOMPATIBLE con soluciones que contengan calcio (Ringer Lactato)', 'INCOMPATIBLE con calcio gluconato (precipitacion letal en neonatos)'],
        'obs': 'NUNCA administrar simultaneamente con soluciones de calcio IV (incluido Ringer). En neonatos: esperar 48h entre ceftriaxona y calcio IV. No mezclar con otros antibioticos en misma bolsa.',
        'recon': 'IV: reconstituir 1 g con 10 mL de agua esteril. IM: reconstituir 1 g con 3.5 mL de lidocaina 1% (reduce dolor). Agitar hasta disolucion completa. Color amarillento es normal.'
    },
    'meropenem': {
        'prep': 'Diluir en SF 0.9% o SG5%. Concentracion: 1-20 mg/mL. Infundir en 15-30 min (estandar) o 3h (infusion extendida para optimizar PK/PD).',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible, menos estable)', 'Ringer Lactato (compatible)'],
        'obs': 'Estable 4h a temperatura ambiente en SF, 1h en SG5%. Refrigerado: 24h en SF. No mezclar con otros farmacos. Ajustar en IR.',
        'recon': 'Reconstituir vial de 500 mg con 10 mL o 1 g con 20 mL de agua esteril o SF 0.9%. Agitar hasta disolucion. Luego diluir en 50-200 mL para infusion.'
    },
    'piperacilina': {
        'prep': 'Diluir en SF 0.9% o SG5%. Volumen minimo: 50 mL por vial. Infundir en 30 min (estandar) o 4h (infusion extendida).',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible)', 'INCOMPATIBLE con Ringer Lactato', 'INCOMPATIBLE con bicarbonato'],
        'obs': 'No mezclar con aminoglucosidos en misma linea (inactivacion). Administrar por separado. Ajustar en IR.',
        'recon': 'Reconstituir vial de 4.5 g con 20 mL de agua esteril o SF 0.9%. Agitar hasta disolucion. Luego diluir en 50-150 mL para infusion.'
    },
    'dexametasona': {
        'prep': 'Puede administrarse IV directo (bolo lento 1-2 min) o diluido en SF 0.9% o SG5% en 15-30 min.',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible)', 'Ringer Lactato (compatible)'],
        'obs': 'Estable 24h en SF/SG5 a temperatura ambiente. Compatible con la mayoria de farmacos comunes en Y.',
        'recon': 'No requiere reconstitucion (solucion inyectable lista 4 mg/mL o 8 mg/2mL).'
    },
    'hidrocortisona': {
        'prep': 'Puede administrarse IV directo (bolo en 1-2 min) o diluido en 100-250 mL SF 0.9% o SG5% en 20-30 min.',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible)'],
        'obs': 'Reconstituir inmediatamente antes de usar. Compatible con la mayoria de soluciones IV comunes.',
        'recon': 'Reconstituir el vial liofilizado (100 mg o 500 mg) con el disolvente incluido o con 2 mL de agua esteril. Agitar suavemente. Usar inmediatamente o diluir para infusion.'
    },
    'metilprednisolona': {
        'prep': 'Pulsos: diluir 500 mg-1 g en 250-500 mL SF 0.9% o SG5%. Infundir en 30-60 min minimo. Dosis menores: IV directo lento.',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible)'],
        'obs': 'Infusion rapida puede causar arritmias, hipotension, colapso cardiovascular. Monitorizar ECG en pulsos. Premedicar si historial de reaccion.',
        'recon': 'Reconstituir con el disolvente ACT-O-VIAL incluido o agua esteril. Vial 125 mg: 2 mL. Vial 500 mg: 8 mL. Vial 1 g: 16 mL. Agitar hasta disolucion.'
    },
    'tramadol': {
        'prep': 'IV directo lento (2-3 min) o diluir en 100 mL SF 0.9% o SG5% e infundir en 15-30 min. Infusion continua: 100-200 mg en 500 mL.',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible)', 'Ringer Lactato (compatible)'],
        'obs': 'Administracion IV rapida puede causar convulsiones. No mezclar con diclofenaco. Compatible con opioides en misma linea. Riesgo sindrome serotoninergico con ISRS.',
        'recon': 'No requiere reconstitucion (solucion inyectable lista 50 mg/mL en ampolla de 2 mL = 100 mg).'
    },
    'morfina': {
        'prep': 'IV directo lento (4-5 min por dosis). Infusion continua: diluir en SF 0.9% o SG5%. Concentracion PCA: 1-5 mg/mL. UCI: 1-10 mg/h segun necesidad.',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible)', 'INCOMPATIBLE con aminofilina, fenitoina, fenobarbital, bicarbonato'],
        'obs': 'Tener naloxona disponible. Monitorizar FR (suspender si <10), sedacion, SatO2. Tolerancia con uso prolongado. Constipacion casi universal: profilaxis con laxantes.',
        'recon': 'No requiere reconstitucion (solucion inyectable lista 10 mg/mL o 20 mg/mL).'
    },
    'fentanilo': {
        'prep': 'IV directo: administrar lentamente en 1-2 min. Infusion: diluir en SF 0.9% o SG5%. Concentracion habitual: 10 mcg/mL.',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible)', 'Ringer Lactato (compatible)'],
        'obs': 'Rigidez toracica (torax lenoso) con inyeccion rapida. Tener naloxona disponible. Monitorizar FR y SatO2. Potencia: 100x morfina.',
        'recon': 'No requiere reconstitucion (solucion inyectable lista 50 mcg/mL).'
    },
    'ketamina': {
        'prep': 'IV directo: diluir a 10-50 mg/mL. Infusion: diluir en SF 0.9% o SG5%. Sedacion disociativa: 1-2 mg/kg IV en 60 seg. Analgesia: 0.1-0.3 mg/kg IV.',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible)', 'Ringer Lactato (compatible)'],
        'obs': 'Emergencia psiquica al despertar (reducir con midazolam). Aumenta secreciones: considerar atropina. Contraindicada en HTA no controlada e hipertension intracraneal.',
        'recon': 'No requiere reconstitucion (solucion inyectable lista 50 mg/mL). Diluir para infusion continua.'
    },
    'clindamicina': {
        'prep': 'NUNCA administrar IV directo (paro cardiaco). Diluir en SF 0.9% o SG5%. Concentracion max: 18 mg/mL. Infundir 300 mg en 10 min, 600 mg en 20 min, 900 mg en 30 min, 1200 mg en 40 min.',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible)', 'Ringer Lactato (compatible)'],
        'obs': 'Velocidad max: 30 mg/min. Riesgo de colitis pseudomembranosa (C. difficile). Monitorizar funcion hepatica en uso prolongado.',
        'recon': 'No requiere reconstitucion (solucion inyectable 150 mg/mL). Diluir OBLIGATORIAMENTE antes de infusion IV.'
    },
    'gentamicina': {
        'prep': 'Diluir en SF 0.9% o SG5%. Volumen: 50-200 mL. Infundir en 30-60 min. Puede usarse dosis unica diaria (aminoglucosido).',
        'sol': ['SF 0.9% (compatible)', 'SG5% (compatible)', 'INCOMPATIBLE con penicilinas (inactivacion mutua: no mezclar en misma bolsa)'],
        'obs': 'Monitorizar niveles sericos (pico/valle). Nefrotoxica y ototoxica. Funcion renal y audiometria si >5 dias. No mezclar con betalactamicos en misma linea.',
        'recon': 'No requiere reconstitucion (solucion inyectable lista). Diluir para infusion IV.'
    },
    'linezolid': {
        'prep': 'Ya viene diluido listo para infundir (2 mg/mL en bolsa de 300 mL). Infundir en 30-120 min. No requiere dilucion adicional.',
        'sol': ['Viene preparado para infusion directa', 'Compatible con SF 0.9% en Y', 'Compatible con SG5% en Y', 'INCOMPATIBLE con ceftriaxona, anfotericina B'],
        'obs': 'IMAO debil: interaccion con alimentos ricos en tiramina y serotoninergicos. Monitorizar hemograma semanal (riesgo mielosupresion si >14 dias). Maximo 28 dias.',
        'recon': 'No requiere reconstitucion ni dilucion. Bolsa lista para infusion directa.'
    },
}

updated = 0
for d in drugs:
    nombre = d.get('nombre', '').lower()
    vias = d.get('viaAdministracion', [])
    if 'IV' not in vias:
        continue

    for key, rules in DILUTION_DB.items():
        if key in nombre:
            changed = False
            # Update preparacionDilucion
            if not d.get('preparacionDilucion') or len(d.get('preparacionDilucion', '')) < len(rules['prep']):
                d['preparacionDilucion'] = rules['prep']
                changed = True
            # Update solucionesCompatibles
            if not d.get('solucionesCompatibles') or len(d.get('solucionesCompatibles', [])) < len(rules['sol']):
                d['solucionesCompatibles'] = rules['sol']
                changed = True
            # Update observaciones
            if rules.get('obs') and (not d.get('observaciones') or len(d.get('observaciones', '')) < len(rules['obs'])):
                d['observaciones'] = rules['obs']
                changed = True
            # Add reconstitucion
            if rules.get('recon') and not d.get('reconstitucion'):
                d['reconstitucion'] = rules['recon']
                changed = True
            if changed:
                updated += 1
                sys.stdout.buffer.write(f"  + {d['nombre']}\n".encode('utf-8'))
            break

with open('src/data/drugs.json', 'w', encoding='utf-8') as f:
    json.dump(drugs, f, ensure_ascii=False, indent=2)

sys.stdout.buffer.write(f"\nTotal farmacos actualizados: {updated}\n".encode('utf-8'))
