#!/usr/bin/env python3
"""Generate new drugs for u04 - Sistema Respiratorio (12→28)."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from drug_helper import *

NEW_DRUGS = [
  {
    "id": "tiotropio",
    "nombre": "Tiotropio",
    "nombreGenerico": "Bromuro de tiotropio monohidrato",
    "nombresComerciales": ["Spiriva", "Braltus", "Tiova"],
    "familia": "Broncodilatadores",
    "clasificacion": "Anticolinérgico inhalado de acción prolongada (LAMA)",
    "mecanismoAccion": "Antagonista selectivo de receptores muscarínicos M1 y M3 de acción prolongada. Bloquea la broncoconstricción mediada por acetilcolina en el músculo liso bronquial, con disociación lenta del receptor M3 que le confiere duración de 24 horas.",
    "indicaciones": ["EPOC mantenimiento (1ra línea)", "Asma persistente (add-on a ICS/LABA)", "Prevención de exacerbaciones de EPOC"],
    "contraindicaciones": ["Hipersensibilidad a atropina o derivados", "Hipersensibilidad a proteínas de leche (cápsulas con lactosa)", "Glaucoma de ángulo cerrado no controlado"],
    "efectosAdversos": ["Sequedad bucal", "Estreñimiento", "Infección urinaria", "Faringitis", "Sinusitis", "Retención urinaria (especialmente en HPB)", "Taquicardia (raro)"],
    "interacciones": ["Otros anticolinérgicos: efectos aditivos (evitar)", "Ipratropio: no combinar (mismo mecanismo)", "Beta-2 agonistas: sinergia terapéutica"],
    "viaAdministracion": ["inhalatoria"],
    "dosis": {
      "adulto": "HandiHaler: 18 mcg (1 cápsula)/día. Respimat: 5 mcg (2 puffs)/día",
      "ajusteRenal": "No requiere ajuste",
      "ajusteHepatico": "No requiere ajuste"
    },
    "presentaciones": ["Cápsulas para inhalación 18 mcg + HandiHaler", "Solución para inhalación Respimat 2.5 mcg/puff"],
    "embarazo": "C",
    "lactancia": "No se conoce excreción en leche. Usar con precaución.",
    "cuidadosEnfermeria": [
      "Administrar siempre a la misma hora del día",
      "Cápsulas solo para inhalación (NO tragar)",
      "Enseñar técnica HandiHaler: perforar cápsula, inhalar profundo",
      "Enjuagar boca tras inhalación para reducir sequedad",
      "No es fármaco de rescate: no usar en crisis aguda",
      "Vigilar retención urinaria en pacientes con HPB",
      "Evitar contacto con ojos (riesgo de glaucoma agudo)"
    ],
    "farmacocinetica": {
      "absorcion": "Inhalatoria: biodisponibilidad 19.5% (polvo), 33% (Respimat)",
      "distribucion": "Unión proteica 72%. No cruza BHE significativamente",
      "metabolismo": "Hepático mínimo vía CYP2D6 y CYP3A4",
      "excrecion": "Renal 74% (inalterado 14%)",
      "vidaMedia": "25-36 horas",
      "inicioAccion": "30 minutos",
      "picoAccion": "1-3 horas",
      "duracionAccion": "24 horas"
    },
    "almacenamiento": "Temperatura ambiente. Las cápsulas solo retirar del blíster inmediatamente antes de usar.",
    "unidadId": "u04",
    "capituloId": "c04_01"
  },
  {
    "id": "formoterol",
    "nombre": "Formoterol",
    "nombreGenerico": "Fumarato de formoterol dihidratado",
    "nombresComerciales": ["Oxis", "Foradil", "Broncoral"],
    "familia": "Broncodilatadores",
    "clasificacion": "Agonista beta-2 adrenérgico de acción prolongada (LABA)",
    "mecanismoAccion": "Estimula selectivamente receptores beta-2 adrenérgicos del músculo liso bronquial, aumentando AMPc intracelular. Inicio rápido (1-3 min) con duración prolongada (12h). Posee mayor lipofilicidad que salbutamol, permitiendo anclaje prolongado en la membrana celular.",
    "indicaciones": ["EPOC mantenimiento", "Asma persistente (siempre con corticoide inhalado)", "Prevención de broncoespasmo por ejercicio", "Broncoespasmo agudo (por inicio rápido)"],
    "contraindicaciones": ["Hipersensibilidad", "Asma sin corticoide inhalado (riesgo de muerte)", "Taquiarritmias", "Tirotoxicosis no controlada"],
    "efectosAdversos": ["Temblor", "Cefalea", "Palpitaciones", "Taquicardia", "Calambres musculares", "Hipopotasemia", "Prolongación QTc (dosis altas)"],
    "interacciones": ["Beta-bloqueantes: antagonizan efecto broncodilatador", "Diuréticos de asa/tiazidas: potencian hipopotasemia", "IMAO/tricíclicos: riesgo cardiovascular", "Corticoides: potencian hipopotasemia"],
    "viaAdministracion": ["inhalatoria"],
    "dosis": {
      "adulto": "Mantenimiento: 12 mcg (1 cápsula) cada 12h. Máximo: 24 mcg cada 12h. Prevención ejercicio: 12 mcg 15 min antes"
    },
    "presentaciones": ["Cápsulas para inhalación 12 mcg", "Polvo para inhalación 12 mcg/dosis (Turbuhaler)"],
    "embarazo": "C",
    "lactancia": "Se excreta en leche en animales. Usar solo si beneficio supera riesgo.",
    "cuidadosEnfermeria": [
      "NUNCA usar como monoterapia en asma (siempre con ICS)",
      "Enseñar diferencia entre medicación de mantenimiento y rescate",
      "Cápsulas solo para inhalación (NO tragar)",
      "Técnica Aerolizer: perforar cápsula, inhalar vigorosamente",
      "Si se necesita rescate >2 veces/semana: asma mal controlada",
      "Monitorizar FC y potasio en uso crónico",
      "Puede combinarse con budesonida en mismo dispositivo"
    ],
    "farmacocinetica": {
      "absorcion": "Inhalatoria: rápida absorción pulmonar",
      "distribucion": "Unión proteica 61-64%",
      "metabolismo": "Hepático por glucuronidación y O-desmetilación",
      "excrecion": "Renal 59-62%, fecal 32-34%",
      "vidaMedia": "10 horas",
      "inicioAccion": "1-3 minutos (inicio rápido)",
      "picoAccion": "30-60 minutos",
      "duracionAccion": "12 horas"
    },
    "almacenamiento": "Temperatura ambiente. Cápsulas proteger de humedad. No retirar del blíster hasta uso.",
    "unidadId": "u04",
    "capituloId": "c04_01"
  },
  {
    "id": "salmeterol",
    "nombre": "Salmeterol",
    "nombreGenerico": "Xinafoato de salmeterol",
    "nombresComerciales": ["Serevent", "Salmeter"],
    "familia": "Broncodilatadores",
    "clasificacion": "Agonista beta-2 adrenérgico de acción prolongada (LABA)",
    "mecanismoAccion": "Agonista parcial altamente selectivo del receptor beta-2 adrenérgico. Su larga cadena lateral lipofílica se ancla en un exositio adyacente al receptor, manteniéndolo activo durante 12 horas. No tiene inicio rápido como formoterol.",
    "indicaciones": ["Asma persistente (siempre con corticoide inhalado)", "EPOC mantenimiento", "Prevención de broncoespasmo por ejercicio"],
    "contraindicaciones": ["Hipersensibilidad", "Asma sin corticoide inhalado concomitante", "Tratamiento de broncoespasmo agudo", "Status asmático"],
    "efectosAdversos": ["Cefalea", "Temblor", "Palpitaciones", "Calambres musculares", "Artralgia", "Candidiasis orofaríngea (combinado con ICS)", "Broncoespasmo paradójico (raro)"],
    "interacciones": ["Beta-bloqueantes: antagonizan efecto", "Ketoconazol/inhibidores CYP3A4: aumentan niveles plasmáticos", "IMAO: riesgo cardiovascular", "Diuréticos: potencian hipopotasemia"],
    "viaAdministracion": ["inhalatoria"],
    "dosis": {
      "adulto": "50 mcg (1 inhalación) cada 12h. No exceder 100 mcg/día"
    },
    "presentaciones": ["Polvo para inhalación 50 mcg/dosis (Diskus/Accuhaler)", "MDI 25 mcg/puff"],
    "embarazo": "C",
    "lactancia": "Datos limitados. Probablemente compatible por mínima absorción sistémica.",
    "cuidadosEnfermeria": [
      "NO es fármaco de rescate: no usar en crisis aguda",
      "Siempre combinar con corticoide inhalado en asma",
      "Enseñar técnica Diskus: abrir, deslizar, exhalar, inhalar profundo",
      "Administrar cada 12h a horarios fijos",
      "Enjuagar boca después de cada uso",
      "Si empeoran síntomas: no aumentar dosis, consultar médico",
      "Diferenciarlo claramente del salbutamol de rescate"
    ],
    "farmacocinetica": {
      "absorcion": "Inhalatoria: absorción sistémica mínima",
      "distribucion": "Unión proteica 96%",
      "metabolismo": "Hepático por hidroxilación vía CYP3A4",
      "excrecion": "Fecal 60%, renal 25%",
      "vidaMedia": "5.5 horas",
      "inicioAccion": "10-20 minutos (lento vs formoterol)",
      "picoAccion": "2-4 horas",
      "duracionAccion": "12 horas"
    },
    "almacenamiento": "Temperatura ambiente. Diskus: mantener en lugar seco. No refrigerar.",
    "unidadId": "u04",
    "capituloId": "c04_01"
  },
  {
    "id": "teofilina",
    "nombre": "Teofilina",
    "nombreGenerico": "Teofilina anhidra",
    "nombresComerciales": ["Theo-Dur", "Uniphyl", "Teofilina Northia"],
    "familia": "Broncodilatadores",
    "clasificacion": "Metilxantina",
    "mecanismoAccion": "Inhibe fosfodiesterasas (PDE III y IV), aumentando AMPc y GMPc intracelular. Antagoniza receptores de adenosina A1 y A2. Produce broncodilatación, estimulación del centro respiratorio, efecto antiinflamatorio leve y mejora de la contractilidad diafragmática.",
    "indicaciones": ["EPOC (alternativa o add-on)", "Asma persistente (tercera línea)", "Apnea neonatal del prematuro"],
    "contraindicaciones": ["Arritmias taquicárdicas no controladas", "Epilepsia no controlada", "Úlcera péptica activa", "Porfiria", "Hipersensibilidad a xantinas"],
    "efectosAdversos": ["Náuseas y vómitos (primeros signos de toxicidad)", "Cefalea", "Insomnio", "Taquicardia", "Convulsiones (toxicidad)", "Arritmias (toxicidad)", "Temblor"],
    "interacciones": ["Eritromicina/claritromicina: aumentan niveles de teofilina", "Ciprofloxacino: aumenta niveles de teofilina", "Fenitoína: disminuye niveles de teofilina", "Rifampicina: disminuye niveles de teofilina", "Cimetidina: aumenta niveles de teofilina", "Tabaco: disminuye niveles (inductor CYP1A2)"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Liberación prolongada: 200-400 mg cada 12h. Rango terapéutico sérico: 5-15 mcg/mL. Titular según niveles",
      "ajusteHepatico": "Reducir dosis 50%. Mayor riesgo de toxicidad"
    },
    "presentaciones": ["Comprimidos liberación prolongada 100, 200, 300 mg", "Cápsulas liberación prolongada 200, 400 mg"],
    "embarazo": "C",
    "lactancia": "Se excreta en leche. Puede causar irritabilidad neonatal. Precaución.",
    "cuidadosEnfermeria": [
      "RANGO TERAPÉUTICO ESTRECHO: monitorizar niveles séricos (5-15 mcg/mL)",
      "Primeros signos de toxicidad: náuseas, vómitos, taquicardia",
      "No triturar comprimidos de liberación prolongada",
      "Administrar con alimentos para reducir molestias GI",
      "Preguntar sobre tabaquismo (modifica metabolismo)",
      "Múltiples interacciones medicamentosas: revisar siempre",
      "Niveles séricos: pico 4-6h post-dosis oral, valle pre-dosis",
      "Signos de toxicidad severa: convulsiones, arritmias"
    ],
    "farmacocinetica": {
      "absorcion": "Oral completa. Liberación prolongada: absorción lenta y sostenida",
      "distribucion": "Unión proteica 40%. Vd: 0.45 L/kg. Cruza placenta",
      "metabolismo": "Hepático CYP1A2 (principal), CYP2E1, CYP3A4",
      "excrecion": "Renal 10% inalterada, 90% metabolitos",
      "vidaMedia": "No fumadores: 6-12h. Fumadores: 4-5h. ICC/cirrosis: 24h",
      "inicioAccion": "Liberación prolongada: 4-6 horas",
      "picoAccion": "Liberación prolongada: 4-8 horas",
      "duracionAccion": "12-24 horas según formulación"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la humedad.",
    "unidadId": "u04",
    "capituloId": "c04_01"
  },
  {
    "id": "fenoterol",
    "nombre": "Fenoterol",
    "nombreGenerico": "Bromhidrato de fenoterol",
    "nombresComerciales": ["Berotec", "Fenoterol Klonal"],
    "familia": "Broncodilatadores",
    "clasificacion": "Agonista beta-2 adrenérgico de acción corta (SABA)",
    "mecanismoAccion": "Estimula selectivamente receptores beta-2 adrenérgicos del músculo liso bronquial, activando adenilato ciclasa e incrementando AMPc, lo que produce relajación del músculo liso bronquial. Mayor potencia que salbutamol pero menor selectividad beta-2.",
    "indicaciones": ["Broncoespasmo agudo", "Asma aguda (rescate)", "EPOC exacerbaciones", "Prevención de broncoespasmo por ejercicio"],
    "contraindicaciones": ["Hipersensibilidad", "Miocardiopatía hipertrófica obstructiva", "Taquiarritmias", "Estenosis aórtica severa"],
    "efectosAdversos": ["Temblor fino de manos", "Taquicardia", "Palpitaciones", "Cefalea", "Nerviosismo", "Hipopotasemia", "Arritmias (sobredosis)"],
    "interacciones": ["Beta-bloqueantes: antagonizan efecto", "Xantinas: potencian efectos adversos", "Diuréticos: potencian hipopotasemia", "IMAO/tricíclicos: riesgo cardiovascular"],
    "viaAdministracion": ["inhalatoria"],
    "dosis": {
      "adulto": "MDI: 100-200 mcg (1-2 puffs) cada 4-6h PRN. Nebulización: 0.5-1 mg cada 6-8h. Crisis: repetir cada 20 min x3"
    },
    "presentaciones": ["MDI 100 mcg/puff (200 dosis)", "Solución para nebulización 0.5% (5 mg/mL)"],
    "embarazo": "C",
    "lactancia": "Datos limitados. Usar con precaución.",
    "cuidadosEnfermeria": [
      "Enseñar técnica inhalatoria correcta",
      "Usar aerocámara para mejorar depósito pulmonar",
      "Frecuentemente combinado con ipratropio en nebulización",
      "Monitorizar FC: mayor efecto taquicardizante que salbutamol",
      "Si necesita uso frecuente: derivar para evaluar control del asma",
      "En nebulización: flujo 6-8 L/min por 10-15 min"
    ],
    "farmacocinetica": {
      "absorcion": "Inhalatoria: 10-30% llega a pulmones",
      "distribucion": "Distribución pulmonar local",
      "metabolismo": "Hepático por sulfatación y glucuronidación",
      "excrecion": "Renal 60%, fecal 40%",
      "vidaMedia": "3-7 horas",
      "inicioAccion": "3-5 minutos",
      "picoAccion": "30-60 minutos",
      "duracionAccion": "4-6 horas"
    },
    "almacenamiento": "Temperatura ambiente. No exponer a calor extremo. No perforar envase.",
    "unidadId": "u04",
    "capituloId": "c04_01"
  },
  {
    "id": "fluticasona_salmeterol",
    "nombre": "Fluticasona/Salmeterol (Combinado)",
    "nombreGenerico": "Propionato de fluticasona + xinafoato de salmeterol",
    "nombresComerciales": ["Seretide", "Advair", "Brexovent"],
    "familia": "Antiinflamatorios y Broncodilatadores combinados",
    "clasificacion": "Corticoide inhalado (ICS) + Agonista beta-2 de acción prolongada (LABA)",
    "mecanismoAccion": "Fluticasona: potente antiinflamatorio que reduce infiltrado eosinofílico, edema y secreciones bronquiales al modular transcripción génica. Salmeterol: broncodilatador de acción prolongada que relaja músculo liso bronquial. Sinergia: los corticoides aumentan expresión de receptores beta-2 y los LABA potencian la translocación nuclear del receptor de glucocorticoides.",
    "indicaciones": ["Asma persistente moderada a severa", "EPOC con exacerbaciones frecuentes", "Asma no controlada con ICS solo"],
    "contraindicaciones": ["Hipersensibilidad", "Status asmático o broncoespasmo agudo (no es rescate)", "Tuberculosis pulmonar activa", "Infecciones fúngicas sistémicas"],
    "efectosAdversos": ["Candidiasis orofaríngea", "Disfonía", "Cefalea", "Infecciones respiratorias altas", "Temblor", "Palpitaciones", "Supresión adrenal (dosis altas crónicas)", "Neumonía (en EPOC)"],
    "interacciones": ["Ketoconazol/ritonavir (inhibidores CYP3A4): aumentan niveles de fluticasona", "Beta-bloqueantes: antagonizan salmeterol", "IMAO: riesgo cardiovascular con salmeterol", "Macrólidos: pueden aumentar niveles de fluticasona"],
    "viaAdministracion": ["inhalatoria"],
    "dosis": {
      "adulto": "Asma: Diskus 100/50, 250/50 o 500/50 mcg, 1 inhalación cada 12h. EPOC: 250/50 o 500/50 cada 12h"
    },
    "presentaciones": ["Diskus 100/50, 250/50, 500/50 mcg/dosis", "MDI 25/50, 25/125, 25/250 mcg/puff"],
    "embarazo": "C",
    "lactancia": "Fluticasona inhalada: absorción sistémica mínima. Probablemente compatible.",
    "cuidadosEnfermeria": [
      "NO es fármaco de rescate: tener siempre SABA disponible",
      "Enjuagar boca con agua después de CADA inhalación (previene candidiasis)",
      "Enseñar técnica Diskus: abrir, deslizar palanca, exhalar, inhalar rápido y profundo",
      "Dosis fija cada 12h: no modificar según síntomas",
      "Vigilar signos de candidiasis oral (placas blancas, dolor)",
      "Controlar talla en niños (riesgo de retraso del crecimiento)",
      "Evaluar necesidad de salbutamol rescate como indicador de control"
    ],
    "farmacocinetica": {
      "absorcion": "Fluticasona: biodisponibilidad inhalada 13.5%. Salmeterol: absorción sistémica mínima",
      "distribucion": "Fluticasona: unión proteica 99%, Vd 4.2 L/kg. Salmeterol: unión proteica 96%",
      "metabolismo": "Fluticasona: hepático CYP3A4. Salmeterol: hepático CYP3A4",
      "excrecion": "Fluticasona: fecal 87-100%. Salmeterol: fecal 60%, renal 25%",
      "vidaMedia": "Fluticasona: 7.8h. Salmeterol: 5.5h",
      "inicioAccion": "Salmeterol: 10-20 min. Fluticasona antiinflamatoria: días-semanas",
      "picoAccion": "Salmeterol: 2-4h. Fluticasona: 1-2 semanas para efecto máximo",
      "duracionAccion": "12 horas por dosis"
    },
    "almacenamiento": "Temperatura ambiente. Diskus: mantener seco. No refrigerar. Desechar 1 mes después de abrir.",
    "unidadId": "u04",
    "capituloId": "c04_02"
  },
  {
    "id": "budesonida_formoterol",
    "nombre": "Budesonida/Formoterol (Combinado)",
    "nombreGenerico": "Budesonida + fumarato de formoterol dihidratado",
    "nombresComerciales": ["Symbicort", "DuoResp", "Vannair"],
    "familia": "Antiinflamatorios y Broncodilatadores combinados",
    "clasificacion": "Corticoide inhalado (ICS) + Agonista beta-2 de acción prolongada (LABA)",
    "mecanismoAccion": "Budesonida: corticoide con alta afinidad por receptor glucocorticoide, reduce inflamación eosinofílica y edema bronquial. Formoterol: LABA de inicio rápido que relaja músculo liso bronquial en 1-3 min. La combinación permite terapia MART (Maintenance And Reliever Therapy) gracias al inicio rápido del formoterol.",
    "indicaciones": ["Asma persistente (mantenimiento y rescate - MART)", "EPOC mantenimiento", "Asma no controlada con ICS solo", "Prevención de exacerbaciones"],
    "contraindicaciones": ["Hipersensibilidad", "Tuberculosis pulmonar activa", "Infecciones fúngicas o virales no tratadas de vías respiratorias"],
    "efectosAdversos": ["Candidiasis orofaríngea", "Cefalea", "Temblor", "Palpitaciones", "Disfonía", "Tos tras inhalación", "Irritación faríngea", "Supresión adrenal (dosis altas crónicas)"],
    "interacciones": ["Ketoconazol/itraconazol: aumentan niveles de budesonida", "Beta-bloqueantes: antagonizan formoterol", "Diuréticos: potencian hipopotasemia del formoterol", "CYP3A4 inhibidores: aumentan exposición a budesonida"],
    "viaAdministracion": ["inhalatoria"],
    "dosis": {
      "adulto": "Mantenimiento: 160/4.5 mcg, 1-2 inhalaciones cada 12h. MART: 160/4.5, 1 inh/12h mantenimiento + 1 inh PRN rescate (máx 8 inh/día)"
    },
    "presentaciones": ["Turbuhaler 80/4.5, 160/4.5, 320/9 mcg/dosis", "MDI 80/4.5, 160/4.5 mcg/puff"],
    "embarazo": "C",
    "lactancia": "Budesonida compatible con lactancia. Formoterol: datos limitados.",
    "cuidadosEnfermeria": [
      "Puede usarse como mantenimiento Y rescate (MART) en asma",
      "Enjuagar boca con agua tras CADA inhalación",
      "Técnica Turbuhaler: girar base roja, exhalar, inhalar rápido y profundo",
      "Verificar dosis restantes en ventana del Turbuhaler",
      "No agitar el Turbuhaler (polvo seco)",
      "Ventaja sobre fluticasona/salmeterol: puede usarse como rescate",
      "Vigilar signos de candidiasis oral",
      "Educar sobre diferencia entre uso mantenimiento y rescate MART"
    ],
    "farmacocinetica": {
      "absorcion": "Budesonida: biodisponibilidad inhalada 39%. Formoterol: absorción rápida pulmonar",
      "distribucion": "Budesonida: unión proteica 85-90%, Vd 3 L/kg. Formoterol: unión proteica 61-64%",
      "metabolismo": "Budesonida: hepático CYP3A4. Formoterol: glucuronidación y O-desmetilación",
      "excrecion": "Budesonida: renal 60%, fecal. Formoterol: renal 59-62%",
      "vidaMedia": "Budesonida: 2.8h. Formoterol: 10h",
      "inicioAccion": "Formoterol: 1-3 min. Budesonida antiinflamatoria: días-semanas",
      "picoAccion": "Formoterol: 30-60 min. Budesonida: 1-2 semanas",
      "duracionAccion": "12 horas por dosis"
    },
    "almacenamiento": "Temperatura ambiente. Mantener Turbuhaler en posición vertical. Proteger de humedad.",
    "unidadId": "u04",
    "capituloId": "c04_02"
  },
  {
    "id": "cromoglicato",
    "nombre": "Cromoglicato de Sodio",
    "nombreGenerico": "Cromoglicato disódico",
    "nombresComerciales": ["Intal", "Cromolyn", "Cromosol"],
    "familia": "Antiinflamatorios Inhalados",
    "clasificacion": "Estabilizador de mastocitos",
    "mecanismoAccion": "Estabiliza la membrana de los mastocitos impidiendo su degranulación y la liberación de histamina, leucotrienos y otros mediadores inflamatorios. Inhibe la activación de células inflamatorias (eosinófilos, neutrófilos). Previene la respuesta asmática temprana y tardía ante alérgenos.",
    "indicaciones": ["Asma alérgica leve (profilaxis)", "Prevención de broncoespasmo por ejercicio", "Asma inducida por alérgenos (profilaxis)", "Rinitis alérgica (spray nasal)"],
    "contraindicaciones": ["Hipersensibilidad", "Broncoespasmo agudo (no tiene efecto inmediato)"],
    "efectosAdversos": ["Tos tras inhalación", "Irritación faríngea", "Broncoespasmo paradójico (raro)", "Sabor desagradable", "Cefalea", "Náuseas (raro)"],
    "interacciones": ["No tiene interacciones clínicamente significativas conocidas", "Compatible con broncodilatadores y corticoides inhalados"],
    "viaAdministracion": ["inhalatoria", "nasal"],
    "dosis": {
      "adulto": "Inhalación: 20 mg (1 cápsula nebulizada o 2 puffs MDI) 4 veces al día. Nasal: 1 spray en cada fosa nasal 4-6 veces/día"
    },
    "presentaciones": ["Cápsulas para nebulización 20 mg", "MDI 5 mg/puff", "Spray nasal 2% o 4%"],
    "embarazo": "B",
    "lactancia": "No se conoce excreción en leche. Absorción sistémica mínima. Probablemente compatible.",
    "cuidadosEnfermeria": [
      "Es PREVENTIVO: no usar en crisis aguda",
      "Efecto máximo tras 2-4 semanas de uso regular",
      "Educar al paciente: debe usarse TODOS los días, no solo con síntomas",
      "Si causa tos: puede premedicar con salbutamol antes de la dosis",
      "Alternativa segura en embarazo y niños",
      "No suspender abruptamente tras uso prolongado",
      "Menos efectivo que corticoides inhalados pero mejor perfil de seguridad"
    ],
    "farmacocinetica": {
      "absorcion": "Inhalatoria: solo 8-10% alcanza pulmones, absorción sistémica <1%",
      "distribucion": "No se une significativamente a proteínas",
      "metabolismo": "No se metaboliza",
      "excrecion": "Renal y biliar (inalterado)",
      "vidaMedia": "80-90 minutos",
      "inicioAccion": "Efecto preventivo: 2-4 semanas de uso regular",
      "picoAccion": "2-4 semanas",
      "duracionAccion": "4-6 horas por dosis"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz y la humedad.",
    "unidadId": "u04",
    "capituloId": "c04_02"
  },
  {
    "id": "bromhexina",
    "nombre": "Bromhexina",
    "nombreGenerico": "Clorhidrato de bromhexina",
    "nombresComerciales": ["Bisolvon", "Bromhexina Fabra", "Mucospas"],
    "familia": "Mucolíticos",
    "clasificacion": "Mucolítico derivado de la vasicina",
    "mecanismoAccion": "Despolimeriza las mucoproteínas y mucopolisacáridos ácidos de las secreciones bronquiales, reduciendo la viscosidad del moco. Estimula la producción de surfactante pulmonar y activa el sistema mucociliar. Es profármaco del ambroxol.",
    "indicaciones": ["Enfermedades respiratorias agudas y crónicas con mucosidad espesa", "Bronquitis aguda y crónica", "EPOC con hipersecreción", "Facilitación de la expectoración"],
    "contraindicaciones": ["Hipersensibilidad", "Úlcera gástrica activa", "Primer trimestre del embarazo"],
    "efectosAdversos": ["Náuseas", "Molestias gastrointestinales", "Diarrea", "Cefalea", "Mareo", "Reacciones cutáneas (raro)", "Elevación transitoria de transaminasas (raro)"],
    "interacciones": ["Antibióticos (amoxicilina, eritromicina): aumenta su penetración en secreciones bronquiales", "Antitusivos: efecto contradictorio (evitar)", "Mucolíticos: efecto aditivo"],
    "viaAdministracion": ["oral", "IV", "inhalatoria"],
    "dosis": {
      "adulto": "Oral: 8-16 mg cada 8h. Jarabe: 8-16 mg cada 8h. IV: 8-16 mg cada 8-12h",
      "pediatrico": "2-6 años: 4 mg cada 8h. 6-12 años: 8 mg cada 8h"
    },
    "presentaciones": ["Comprimidos 8 mg", "Jarabe 4 mg/5 mL, 8 mg/5 mL", "Gotas pediátricas 2 mg/mL", "Ampolla 4 mg/2 mL"],
    "embarazo": "C",
    "lactancia": "Se excreta en leche. Usar con precaución.",
    "cuidadosEnfermeria": [
      "Administrar con abundante líquido para facilitar fluidificación del moco",
      "No combinar con antitusivos (efecto contradictorio)",
      "Efecto se evidencia en 2-5 días de tratamiento regular",
      "Preferir administración con alimentos para reducir molestias GI",
      "Enseñar técnicas de drenaje postural complementarias",
      "Profármaco del ambroxol: efecto similar"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: buena absorción, biodisponibilidad 80%",
      "distribucion": "Amplia distribución en tejido pulmonar",
      "metabolismo": "Hepático extenso. Se convierte en ambroxol (metabolito activo)",
      "excrecion": "Renal 85-90%",
      "vidaMedia": "6.5 horas",
      "inicioAccion": "30 minutos",
      "picoAccion": "1-2 horas",
      "duracionAccion": "6-8 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u04",
    "capituloId": "c04_03"
  },
  {
    "id": "ambroxol",
    "nombre": "Ambroxol",
    "nombreGenerico": "Clorhidrato de ambroxol",
    "nombresComerciales": ["Mucosolvan", "Ambrodox", "Mucosan"],
    "familia": "Mucolíticos",
    "clasificacion": "Mucolítico y secretolítico",
    "mecanismoAccion": "Metabolito activo de la bromhexina. Estimula la producción de surfactante pulmonar por neumocitos tipo II. Aumenta la actividad ciliar y reduce la viscosidad del moco al despolimerizar mucopolisacáridos. Posee propiedades antiinflamatorias y antioxidantes leves.",
    "indicaciones": ["Enfermedades respiratorias con moco viscoso", "Bronquitis aguda y crónica", "EPOC con hipersecreción bronquial", "Facilitación de la expectoración", "Síndrome de distrés respiratorio neonatal (estimula surfactante)"],
    "contraindicaciones": ["Hipersensibilidad", "Úlcera gástrica activa", "Primer trimestre del embarazo"],
    "efectosAdversos": ["Náuseas", "Diarrea", "Dispepsia", "Reacciones cutáneas (raro)", "Reacciones anafilácticas (muy raro)", "Síndrome Stevens-Johnson (muy raro)", "Disgeusia"],
    "interacciones": ["Antibióticos (amoxicilina, cefuroxima): aumenta concentración en secreciones bronquiales", "Antitusivos: efecto contradictorio (evitar combinación)", "No interacciones clínicamente significativas con otros fármacos"],
    "viaAdministracion": ["oral", "IV", "inhalatoria"],
    "dosis": {
      "adulto": "Oral: 30 mg cada 8h o 75 mg retard cada 24h. IV: 30 mg cada 8-12h. Nebulización: 15-22.5 mg cada 12h",
      "pediatrico": "2-5 años: 7.5 mg cada 8h. 5-12 años: 15 mg cada 8h"
    },
    "presentaciones": ["Comprimidos 30 mg", "Cápsulas retard 75 mg", "Jarabe 15 mg/5 mL, 30 mg/5 mL", "Gotas pediátricas 7.5 mg/mL", "Solución para nebulización 7.5 mg/mL", "Ampolla 15 mg/2 mL"],
    "embarazo": "C",
    "lactancia": "Se excreta en leche. Usar con precaución.",
    "cuidadosEnfermeria": [
      "Fomentar abundante ingesta de líquidos (mínimo 2 L/día)",
      "No combinar con antitusivos centrales",
      "Administrar con o sin alimentos",
      "Nebulización: puede combinarse con broncodilatadores",
      "Más potente que bromhexina con mejor perfil de tolerancia",
      "En neonatos: usado para estimular producción de surfactante",
      "Advertir al paciente que la tos productiva es esperable y beneficiosa"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: biodisponibilidad 70-80%",
      "distribucion": "Alta concentración en tejido pulmonar. Unión proteica 90%",
      "metabolismo": "Hepático por glucuronidación y CYP3A4",
      "excrecion": "Renal 90% como metabolitos",
      "vidaMedia": "7-12 horas",
      "inicioAccion": "30 minutos",
      "picoAccion": "1-3 horas",
      "duracionAccion": "8-12 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u04",
    "capituloId": "c04_03"
  },
  {
    "id": "codeina_antitusivo",
    "nombre": "Codeína (Antitusivo)",
    "nombreGenerico": "Fosfato de codeína",
    "nombresComerciales": ["Codeisan", "Toseína", "Bisoltus con codeína"],
    "familia": "Antitusivos",
    "clasificacion": "Antitusivo central opiáceo",
    "mecanismoAccion": "Agonista débil de receptores opioides mu en el centro de la tos del bulbo raquídeo, suprimiendo el reflejo tusígeno. Es profármaco de la morfina (10% se convierte vía CYP2D6). A dosis antitusivas, efecto analgésico mínimo.",
    "indicaciones": ["Tos seca persistente no productiva", "Tos irritativa que interfiere con el sueño", "Tos post-infecciosa refractaria"],
    "contraindicaciones": ["Menores de 12 años", "Adolescentes post-amigdalectomía/adenoidectomía", "Insuficiencia respiratoria", "Asma aguda", "Metabolizadores ultrarrápidos CYP2D6", "Íleo paralítico", "Lactancia (contraindicada)"],
    "efectosAdversos": ["Estreñimiento", "Somnolencia", "Náuseas", "Mareo", "Sequedad bucal", "Dependencia (uso prolongado)", "Depresión respiratoria (sobredosis o metabolizadores ultrarrápidos)"],
    "interacciones": ["Depresores del SNC/alcohol: potenciación de sedación", "IMAO: riesgo de síndrome serotoninérgico", "CYP2D6 inhibidores (fluoxetina, paroxetina): reducen conversión a morfina", "Benzodiazepinas: depresión respiratoria aditiva"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "10-20 mg cada 4-6h PRN. Máximo: 120 mg/día. Antitusivo: dosis menores que analgésicas",
      "ajusteRenal": "CrCl <30: reducir dosis 50%",
      "ajusteHepatico": "Reducir dosis. Evitar en insuficiencia hepática severa"
    },
    "presentaciones": ["Comprimidos 15, 30 mg", "Jarabe 10 mg/5 mL", "Solución oral con asociaciones"],
    "embarazo": "C",
    "lactancia": "CONTRAINDICADA. Se excreta como morfina en leche. Riesgo de depresión respiratoria neonatal.",
    "cuidadosEnfermeria": [
      "Evaluar tipo de tos: NO usar si es productiva",
      "Contraindicada en menores de 12 años (riesgo de depresión respiratoria)",
      "Valorar riesgo de dependencia en uso >7-10 días",
      "Recomendar medidas no farmacológicas (hidratación, humedad ambiental)",
      "Vigilar patrón respiratorio (FR >12/min)",
      "Puede causar estreñimiento: recomendar fibra e hidratación",
      "Preguntar sobre otros medicamentos depresores del SNC",
      "Variabilidad genética CYP2D6: efecto impredecible en algunos pacientes"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: biodisponibilidad 53%",
      "distribucion": "Cruza BHE. Unión proteica 7-25%",
      "metabolismo": "Hepático: CYP2D6 (a morfina 10%), CYP3A4 (a norcodeína), glucuronidación",
      "excrecion": "Renal 90% como metabolitos",
      "vidaMedia": "2.5-4 horas",
      "inicioAccion": "30-60 minutos",
      "picoAccion": "1-2 horas",
      "duracionAccion": "4-6 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz. Almacenamiento controlado (estupefaciente en algunos países).",
    "unidadId": "u04",
    "capituloId": "c04_03"
  },
  {
    "id": "fexofenadina",
    "nombre": "Fexofenadina",
    "nombreGenerico": "Clorhidrato de fexofenadina",
    "nombresComerciales": ["Allegra", "Telfast", "Fexofast"],
    "familia": "Antihistamínicos",
    "clasificacion": "Antihistamínico H1 de segunda generación (no sedante)",
    "mecanismoAccion": "Antagonista selectivo y competitivo de receptores histamínicos H1 periféricos. Metabolito activo de la terfenadina. No cruza barrera hematoencefálica significativamente, por lo que carece de efecto sedante. No tiene efectos anticolinérgicos.",
    "indicaciones": ["Rinitis alérgica estacional y perenne", "Urticaria crónica idiopática", "Conjuntivitis alérgica", "Prurigo alérgico"],
    "contraindicaciones": ["Hipersensibilidad"],
    "efectosAdversos": ["Cefalea", "Somnolencia (raro, similar a placebo)", "Náuseas", "Dismenorrea", "Dispepsia", "Fatiga (infrecuente)"],
    "interacciones": ["Antiácidos con aluminio/magnesio: reducen absorción (separar 2h)", "Eritromicina: aumenta niveles de fexofenadina", "Ketoconazol: aumenta niveles de fexofenadina", "Zumo de pomelo/naranja/manzana: reducen absorción"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "120 mg cada 24h (rinitis) o 180 mg cada 24h (urticaria)",
      "pediatrico": "6-11 años: 30 mg cada 12h"
    },
    "presentaciones": ["Comprimidos 30, 120, 180 mg", "Suspensión 6 mg/mL"],
    "embarazo": "C",
    "lactancia": "Se excreta en leche animal. Usar con precaución.",
    "cuidadosEnfermeria": [
      "Administrar con agua (no con zumo de frutas que reduce absorción)",
      "No sedante: puede tomar sin restricción de actividades",
      "Separar 2h de antiácidos",
      "No requiere ajuste en insuficiencia hepática",
      "Alternativa ideal cuando se necesita evitar somnolencia",
      "No tiene efectos anticolinérgicos (ventaja en ancianos)"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: rápida, biodisponibilidad 33%",
      "distribucion": "Unión proteica 60-70%. No cruza BHE significativamente",
      "metabolismo": "Hepático mínimo (<5%). Se elimina mayormente inalterada",
      "excrecion": "Fecal 80%, renal 11%",
      "vidaMedia": "14.4 horas",
      "inicioAccion": "1-3 horas",
      "picoAccion": "2-3 horas",
      "duracionAccion": "24 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la humedad.",
    "unidadId": "u04",
    "capituloId": "c04_04"
  },
  {
    "id": "desloratadina",
    "nombre": "Desloratadina",
    "nombreGenerico": "Desloratadina",
    "nombresComerciales": ["Aerius", "Clarinex", "Desloran"],
    "familia": "Antihistamínicos",
    "clasificacion": "Antihistamínico H1 de segunda generación (no sedante)",
    "mecanismoAccion": "Metabolito activo principal de la loratadina. Antagonista selectivo de receptores H1 periféricos con mayor afinidad y potencia que loratadina. Posee actividad antiinflamatoria adicional: inhibe liberación de IL-4, IL-6, IL-8, IL-13, PGD2, tromboxano y LTC4 de mastocitos y basófilos.",
    "indicaciones": ["Rinitis alérgica estacional y perenne", "Urticaria crónica idiopática", "Prurigo alérgico"],
    "contraindicaciones": ["Hipersensibilidad a desloratadina o loratadina"],
    "efectosAdversos": ["Cefalea", "Sequedad bucal (raro)", "Fatiga (raro)", "Somnolencia (raro, <2%)", "Faringitis", "Mialgias (raro)"],
    "interacciones": ["Ketoconazol: aumenta niveles de desloratadina (sin significancia clínica)", "Eritromicina: aumenta niveles (sin significancia clínica)", "Cimetidina: aumenta niveles levemente", "Alimentos: no afectan absorción significativamente"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "5 mg cada 24h",
      "pediatrico": "6-11 meses: 1 mg/día. 1-5 años: 1.25 mg/día. 6-11 años: 2.5 mg/día"
    },
    "presentaciones": ["Comprimidos 5 mg", "Jarabe 0.5 mg/mL", "Comprimidos bucodispersables 2.5, 5 mg"],
    "embarazo": "C",
    "lactancia": "Se excreta en leche. Usar con precaución.",
    "cuidadosEnfermeria": [
      "Puede administrarse con o sin alimentos",
      "No sedante: no afecta actividades diarias ni conducción",
      "Dosis única diaria: facilita adherencia",
      "Bucodispersables: colocar en lengua, se disuelve sin agua",
      "Mayor potencia que loratadina (su profármaco)",
      "Ajustar dosis según edad en pediatría"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: buena absorción, no afectada por alimentos",
      "distribucion": "Unión proteica 82-87%. No cruza BHE",
      "metabolismo": "Hepático: CYP3A4 y UGT a 3-OH-desloratadina",
      "excrecion": "Renal 40%, fecal 42%",
      "vidaMedia": "27 horas",
      "inicioAccion": "1-3 horas",
      "picoAccion": "3 horas",
      "duracionAccion": "24 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la humedad.",
    "unidadId": "u04",
    "capituloId": "c04_04"
  },
  {
    "id": "hidroxizina",
    "nombre": "Hidroxizina",
    "nombreGenerico": "Clorhidrato de hidroxizina",
    "nombresComerciales": ["Atarax", "Hiderax", "Hidroxizina Northia"],
    "familia": "Antihistamínicos",
    "clasificacion": "Antihistamínico H1 de primera generación (sedante) / Ansiolítico",
    "mecanismoAccion": "Antagonista competitivo de receptores histamínicos H1 con importante acción anticolinérgica y sedante central. Cruza ampliamente la BHE. Posee efecto ansiolítico por depresión de la actividad subcortical. Es profármaco de la cetirizina.",
    "indicaciones": ["Urticaria y prurito", "Ansiedad (tratamiento a corto plazo)", "Premedicación anestésica", "Dermatitis atópica (control del prurito)", "Sedación"],
    "contraindicaciones": ["Hipersensibilidad", "Prolongación QT conocida", "Porfiria", "Embarazo (primer trimestre)", "Lactancia"],
    "efectosAdversos": ["Somnolencia (frecuente)", "Sequedad bucal", "Mareo", "Visión borrosa", "Retención urinaria", "Estreñimiento", "Prolongación QT (raro, dosis altas)", "Cefalea"],
    "interacciones": ["Depresores del SNC/alcohol: potenciación de sedación", "Anticolinérgicos: efectos aditivos", "Inhibidores CYP3A4: aumentan niveles", "Fármacos que prolongan QT: riesgo de arritmias"],
    "viaAdministracion": ["oral", "IM"],
    "dosis": {
      "adulto": "Prurito/urticaria: 25 mg cada 6-8h. Ansiedad: 25-50 mg cada 6-8h. Premedicación: 50-100 mg IM",
      "pediatrico": ">6 años: 1 mg/kg/día dividido cada 6-8h",
      "ajusteHepatico": "Reducir dosis 50% en insuficiencia hepática"
    },
    "presentaciones": ["Comprimidos 10, 25 mg", "Jarabe 10 mg/5 mL", "Ampolla 100 mg/2 mL (solo IM)"],
    "embarazo": "C",
    "lactancia": "Se excreta en leche como cetirizina. No recomendada.",
    "cuidadosEnfermeria": [
      "PRODUCE SOMNOLENCIA: advertir sobre conducción y maquinaria",
      "Vía IM profunda en glúteo (NO IV: riesgo de hemólisis y trombosis)",
      "Útil como ansiolítico en pacientes donde se evitan benzodiazepinas",
      "Evaluar efectos anticolinérgicos en ancianos (confusión, retención urinaria)",
      "No usar como hipnótico crónico (solo corto plazo)",
      "Es profármaco de la cetirizina (antihistamínico no sedante)",
      "Vigilar intervalo QT en pacientes con factores de riesgo"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: rápida y completa",
      "distribucion": "Amplia, cruza BHE. Concentración mayor en piel",
      "metabolismo": "Hepático: CYP3A4 a cetirizina (metabolito activo principal)",
      "excrecion": "Renal como metabolitos",
      "vidaMedia": "14-25 horas (cetirizina: 8-11h)",
      "inicioAccion": "15-30 minutos oral, 20-30 min IM",
      "picoAccion": "2 horas oral",
      "duracionAccion": "4-6 horas (efecto antihistamínico mayor)"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u04",
    "capituloId": "c04_04"
  },
  {
    "id": "oxigeno_medicinal",
    "nombre": "Oxígeno Medicinal",
    "nombreGenerico": "Oxígeno (O₂)",
    "nombresComerciales": ["Oxígeno medicinal", "O₂ comprimido"],
    "familia": "Gases medicinales",
    "clasificacion": "Gas medicinal / Terapia respiratoria",
    "mecanismoAccion": "Incrementa la presión parcial de oxígeno (PaO₂) alveolar e arterial, aumentando la saturación de hemoglobina y el contenido arterial de oxígeno. Revierte la hipoxemia y asegura la entrega adecuada de O₂ a los tejidos para el metabolismo aeróbico celular.",
    "indicaciones": ["Hipoxemia (SpO₂ <90% o PaO₂ <60 mmHg)", "Insuficiencia respiratoria aguda y crónica agudizada", "Shock (cualquier etiología)", "Intoxicación por CO", "EPOC agudizado (con precaución)", "Perioperatorio", "Reanimación cardiopulmonar"],
    "contraindicaciones": ["Relativas en EPOC con retención crónica de CO₂ (usar FiO₂ controlada)"],
    "efectosAdversos": ["Toxicidad por oxígeno (FiO₂ >60% prolongada): daño alveolar difuso", "Atelectasias por reabsorción (FiO₂ alta)", "Retinopatía del prematuro (neonatos)", "Sequedad de mucosas", "Narcosis por CO₂ (en EPOC retenedores de CO₂)", "Fibroplasia retrolental (neonatos)"],
    "interacciones": ["Bleomicina: aumenta toxicidad pulmonar por O₂", "Amiodarona: mayor riesgo de toxicidad pulmonar por O₂", "Paraquat: potencia toxicidad pulmonar"],
    "viaAdministracion": ["inhalatoria"],
    "dosis": {
      "adulto": "Cánula nasal: 1-6 L/min (FiO₂ 24-44%). Máscara simple: 5-10 L/min (FiO₂ 40-60%). Máscara Venturi: FiO₂ regulable 24-50%. Máscara con reservorio: 10-15 L/min (FiO₂ 60-95%). EPOC: FiO₂ 24-28% (Venturi), objetivo SpO₂ 88-92%"
    },
    "presentaciones": ["Balón de O₂ comprimido", "Concentrador de oxígeno", "O₂ líquido (hospitalario)", "Red central hospitalaria"],
    "embarazo": "A",
    "lactancia": "Seguro. Sin restricciones.",
    "cuidadosEnfermeria": [
      "OBJETIVOS SpO₂: general 94-98%, EPOC retenedor CO₂: 88-92%",
      "En EPOC: usar FiO₂ baja y controlada (Venturi 24-28%)",
      "Monitorizar SpO₂ continuamente con pulsioximetría",
      "Humidificar el O₂ cuando flujo >4 L/min (frasco humidificador)",
      "Verificar permeabilidad de cánula/máscara frecuentemente",
      "Cuidados de piel: proteger orejas y narina de úlceras por presión",
      "NUNCA acercar a llamas o fuentes de calor (comburente)",
      "Registrar: dispositivo, flujo, FiO₂, SpO₂ y estado clínico",
      "Gasometría arterial para evaluación precisa si hay duda",
      "No suspender abruptamente en pacientes crónicos"
    ],
    "farmacocinetica": {
      "absorcion": "Inhalatoria: difusión alveolar inmediata según gradiente de presión",
      "distribucion": "Unido a hemoglobina (97%) y disuelto en plasma (3%)",
      "metabolismo": "Consumido en fosforilación oxidativa mitocondrial",
      "excrecion": "Como CO₂ por vía respiratoria",
      "vidaMedia": "No aplica (consumo continuo)",
      "inicioAccion": "Segundos",
      "picoAccion": "Inmediato",
      "duracionAccion": "Mientras se administra"
    },
    "almacenamiento": "Balones en posición vertical, fijos y encadenados. Lugar ventilado, alejado de fuentes de calor. No lubricar válvulas con grasa.",
    "unidadId": "u04",
    "capituloId": "c04_05"
  },
  {
    "id": "surfactante_pulmonar",
    "nombre": "Surfactante Pulmonar Exógeno",
    "nombreGenerico": "Beractant / Poractant alfa / Calfactant",
    "nombresComerciales": ["Survanta (beractant)", "Curosurf (poractant alfa)", "Infasurf (calfactant)"],
    "familia": "Agentes pulmonares",
    "clasificacion": "Surfactante pulmonar de reemplazo",
    "mecanismoAccion": "Reemplaza el surfactante pulmonar endógeno deficiente. Reduce la tensión superficial alveolar en la interfaz aire-líquido, previniendo el colapso alveolar durante la espiración (atelectasia). Contiene fosfolípidos (dipalmitoilfosfatidilcolina), proteínas surfactantes y lípidos neutros que restauran la compliance pulmonar.",
    "indicaciones": ["Síndrome de distrés respiratorio neonatal (enfermedad de membrana hialina)", "Profilaxis en prematuros <28 semanas", "SDRA en adultos (uso compasivo/investigación)", "Déficit de surfactante secundario (aspiración meconial)"],
    "contraindicaciones": ["Hipersensibilidad a componentes", "Hemorragia pulmonar activa severa"],
    "efectosAdversos": ["Bradicardia transitoria durante administración", "Desaturación transitoria", "Reflujo del surfactante por tubo endotraqueal", "Hemorragia pulmonar (raro)", "Neumotórax", "Obstrucción transitoria de vía aérea"],
    "interacciones": ["No tiene interacciones medicamentosas significativas", "Requiere ventilación mecánica para su administración"],
    "viaAdministracion": ["inhalatoria"],
    "dosis": {
      "adulto": "Neonatal - Poractant alfa: 200 mg/kg (2.5 mL/kg) primera dosis intratraqueal, luego 100 mg/kg cada 12h si necesario (máx 3 dosis). Beractant: 100 mg/kg (4 mL/kg) intratraqueal, hasta 4 dosis cada 6h"
    },
    "presentaciones": ["Curosurf: vial 1.5 mL (120 mg) o 3 mL (240 mg)", "Survanta: vial 8 mL (200 mg)", "Infasurf: vial 6 mL (210 mg)"],
    "embarazo": "N/A",
    "lactancia": "No aplica (uso neonatal).",
    "cuidadosEnfermeria": [
      "Administración intratraqueal por personal entrenado en UCIN",
      "Atemperar el vial (temperatura ambiente o en mano) antes de usar",
      "NO agitar: voltear suavemente para homogeneizar",
      "Verificar posición correcta del tubo endotraqueal antes de instilar",
      "Administrar en 4 alícuotas con cambio de posición (decúbitos)",
      "Monitorizar SpO₂ y FC continuamente durante y post-administración",
      "Ajustar parámetros del respirador rápidamente post-dosis (mejora compliance)",
      "No aspirar tubo endotraqueal hasta 1-2h post-administración",
      "Vigilar signos de neumotórax post-administración",
      "Registrar hora, dosis, respuesta clínica y gasométrica"
    ],
    "farmacocinetica": {
      "absorcion": "Intratraqueal: distribución directa en alvéolos",
      "distribucion": "Se distribuye por la superficie alveolar formando monocapa",
      "metabolismo": "Reciclado por neumocitos tipo II. Catabolismo local pulmonar",
      "excrecion": "Reciclaje endógeno pulmonar",
      "vidaMedia": "Variable, horas (dependiendo de reciclaje por neumocitos)",
      "inicioAccion": "Minutos (mejora inmediata de oxigenación)",
      "picoAccion": "1-2 horas",
      "duracionAccion": "6-12 horas por dosis"
    },
    "almacenamiento": "Refrigerar (2-8°C). No congelar. Proteger de la luz. Una vez abierto, usar inmediatamente.",
    "unidadId": "u04",
    "capituloId": "c04_05"
  }
]

# New chapters to create for u04
NEW_CHAPTERS = [
    {
        "id": "c04_05",
        "nombre": "Otros Respiratorios",
        "unidadId": "u04",
        "drugIds": ["oxigeno_medicinal", "surfactante_pulmonar"]
    }
]

# Drugs to add to EXISTING chapters
EXISTING_CHAPTER_ADDITIONS = {
    "c04_01": ["tiotropio", "formoterol", "salmeterol", "teofilina", "fenoterol"],
    "c04_02": ["fluticasona_salmeterol", "budesonida_formoterol", "cromoglicato"],
    "c04_03": ["bromhexina", "ambroxol", "codeina_antitusivo"],
    "c04_04": ["fexofenadina", "desloratadina", "hidroxizina"],
}

# Pathology links
PATHOLOGY_LINKS = {
    "pat_epoc": ["tiotropio", "formoterol", "salmeterol", "teofilina", "fenoterol", "fluticasona_salmeterol", "budesonida_formoterol", "bromhexina", "ambroxol", "oxigeno_medicinal"],
    "pat_asma": ["tiotropio", "formoterol", "salmeterol", "fenoterol", "fluticasona_salmeterol", "budesonida_formoterol", "cromoglicato", "fexofenadina", "desloratadina"],
}

def main():
    print("=== Generating u04 drugs ===")
    added = add_drugs_to_file(NEW_DRUGS)

    cats = load_categories()
    for ch in NEW_CHAPTERS:
        add_chapter(cats, "u04", ch)
    for ch_id, drug_ids in EXISTING_CHAPTER_ADDITIONS.items():
        for did in drug_ids:
            add_drug_to_chapter(cats, ch_id, did)
    save_categories(cats)
    print("  Updated categories.json")

    pats = load_pathologies()
    for pat_id, drug_ids in PATHOLOGY_LINKS.items():
        for did in drug_ids:
            add_drug_to_pathology(pats, pat_id, did)
    save_pathologies(pats)
    print("  Updated pathologies.json")

if __name__ == "__main__":
    main()
