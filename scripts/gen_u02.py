#!/usr/bin/env python3
"""Generate new drugs for u02 - Sistema Cardiovascular (26→55+)."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from drug_helper import *

NEW_DRUGS = [
  {
    "id": "lidocaina_antiarritmico",
    "nombre": "Lidocaína (Antiarrítmica)",
    "nombreGenerico": "Clorhidrato de lidocaína",
    "nombresComerciales": ["Lidocaína Northia", "Xylocaína IV"],
    "familia": "Antiarrítmicos",
    "clasificacion": "Antiarrítmico clase IB",
    "mecanismoAccion": "Bloquea canales de sodio en su estado inactivo, acortando el período refractario y la duración del potencial de acción en tejido ventricular. Mayor afinidad por tejido isquémico. Suprime automatismo anormal sin afectar significativamente la conducción en tejido normal.",
    "indicaciones": ["Arritmias ventriculares asociadas a IAM", "Taquicardia ventricular", "Fibrilación ventricular refractaria a desfibrilación", "Profilaxis arrítmica post-IAM (uso restringido)"],
    "contraindicaciones": ["Bloqueo AV 2do-3er grado", "Síndrome de Stokes-Adams", "Síndrome de Wolff-Parkinson-White", "Hipersensibilidad a anestésicos locales tipo amida", "Bradicardia sinusal severa"],
    "efectosAdversos": ["Mareo", "Parestesias peribucales", "Temblor", "Confusión", "Convulsiones (toxicidad)", "Bradicardia", "Hipotensión", "Paro cardíaco (sobredosis)"],
    "interacciones": ["Betabloqueantes: reducen clearance hepático", "Cimetidina: aumenta niveles", "Fenitoína: depresión cardíaca aditiva", "Amiodarona: aumenta niveles de lidocaína"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "Bolo: 1-1.5 mg/kg IV en 2-3 min, puede repetir 0.5-0.75 mg/kg cada 5-10 min (máx 3 mg/kg). Infusión: 1-4 mg/min",
      "geriatrico": "Reducir dosis de carga y mantenimiento 50%",
      "ajusteRenal": "No requiere ajuste significativo",
      "ajusteHepatico": "Reducir dosis 50%. Metabolismo hepático extenso"
    },
    "presentaciones": ["Ampolla 1% (10 mg/mL) 5 mL", "Ampolla 2% (20 mg/mL) 5 mL", "Frasco 2% para infusión 50 mL"],
    "embarazo": "B",
    "lactancia": "Compatible. Excreción mínima en leche materna.",
    "cuidadosEnfermeria": [
      "Monitorización ECG continua obligatoria durante infusión",
      "Vigilar signos de toxicidad neurológica: parestesias peribucales, tinnitus, confusión",
      "No exceder 4 mg/min en infusión continua",
      "Reducir velocidad si aparece bradicardia o hipotensión",
      "Preparar en bomba de infusión: 2 g en 500 mL D5% (4 mg/mL)",
      "Suspender gradualmente tras 24h de estabilidad"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata",
      "distribucion": "Vd 1.1 L/kg. Unión proteica 60-80%",
      "metabolismo": "Hepático 90% (CYP3A4, CYP1A2). Metabolitos activos",
      "excrecion": "Renal <10% inalterada",
      "vidaMedia": "1.5-2 horas (aumenta en IC e insuficiencia hepática)",
      "inicioAccion": "45-90 segundos IV",
      "picoAccion": "Inmediato",
      "duracionAccion": "10-20 min tras bolo, continuo en infusión"
    },
    "almacenamiento": "Temperatura ambiente. No requiere refrigeración.",
    "unidadId": "u02",
    "capituloId": "c02_02"
  },
  {
    "id": "flecainida",
    "nombre": "Flecainida",
    "nombreGenerico": "Acetato de flecainida",
    "nombresComerciales": ["Apocard", "Flecainida Gador"],
    "familia": "Antiarrítmicos",
    "clasificacion": "Antiarrítmico clase IC",
    "mecanismoAccion": "Bloquea canales de sodio con cinética de disociación lenta, enlenteciendo marcadamente la conducción en todo el sistema His-Purkinje y miocardio ventricular. Prolonga los intervalos PR, QRS y HV. No afecta significativamente la repolarización.",
    "indicaciones": ["Fibrilación auricular paroxística (pill-in-the-pocket)", "Flutter auricular", "Taquicardia supraventricular", "Arritmias ventriculares sin cardiopatía estructural"],
    "contraindicaciones": ["Cardiopatía isquémica", "Insuficiencia cardíaca", "Bloqueo de rama izquierda", "Bloqueo bifascicular", "Post-IAM", "Shock cardiogénico", "Síndrome de Brugada"],
    "efectosAdversos": ["Mareo", "Visión borrosa", "Ensanchamiento QRS", "Proarritmia ventricular", "Insuficiencia cardíaca", "Bradicardia", "Bloqueo AV"],
    "interacciones": ["Amiodarona: aumenta niveles de flecainida 50%", "Digoxina: aumenta niveles de digoxina", "Betabloqueantes: efectos inotrópicos negativos aditivos", "Verapamilo: riesgo de asistolia"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Oral: inicio 50-100 mg/12h, titular cada 4 días. Máx 400 mg/día. Pill-in-the-pocket: 200-300 mg dosis única",
      "ajusteRenal": "CrCl <35: reducir dosis 50%. Monitorizar niveles",
      "ajusteHepatico": "Reducir dosis. Monitorizar niveles plasmáticos"
    },
    "presentaciones": ["Comprimidos 100, 150 mg"],
    "embarazo": "C",
    "lactancia": "Se excreta en leche. Evitar o usar con precaución.",
    "cuidadosEnfermeria": [
      "Obtener ECG basal antes de iniciar (descartar QRS ancho, bloqueos)",
      "CONTRAINDICADO en pacientes con cardiopatía estructural",
      "Monitorizar ECG: si QRS aumenta >25% suspender",
      "Administrar con alimentos para mejorar tolerancia",
      "En pill-in-the-pocket: instruir al paciente sobre uso correcto",
      "Controlar electrolitos: hipopotasemia potencia proarritmia"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: biodisponibilidad 90-95%",
      "distribucion": "Vd 5-13 L/kg. Unión proteica 40%",
      "metabolismo": "Hepático (CYP2D6)",
      "excrecion": "Renal 30% inalterada",
      "vidaMedia": "12-27 horas (media 20h)",
      "inicioAccion": "1-3 horas",
      "picoAccion": "2-3 horas",
      "duracionAccion": "12-24 horas"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u02",
    "capituloId": "c02_02"
  },
  {
    "id": "propafenona",
    "nombre": "Propafenona",
    "nombreGenerico": "Clorhidrato de propafenona",
    "nombresComerciales": ["Actarit", "Propafenona Gador", "Rytmonorm"],
    "familia": "Antiarrítmicos",
    "clasificacion": "Antiarrítmico clase IC con actividad betabloqueante leve",
    "mecanismoAccion": "Bloquea canales de sodio (clase IC) con cinética intermedia. Posee actividad betabloqueante débil y leve efecto calcioantagonista. Enlentece la conducción AV, His-Purkinje y miocárdica. Prolonga PR y QRS.",
    "indicaciones": ["Fibrilación auricular paroxística", "Flutter auricular", "Taquicardia supraventricular paroxística", "Arritmias ventriculares sin cardiopatía estructural"],
    "contraindicaciones": ["Insuficiencia cardíaca", "Cardiopatía isquémica", "Asma bronquial (efecto beta)", "Bloqueo de rama", "Bradicardia severa", "Hipotensión", "Síndrome de Brugada"],
    "efectosAdversos": ["Disgeusia (sabor metálico)", "Náuseas", "Mareo", "Visión borrosa", "Bradicardia", "Proarritmia", "Ensanchamiento QRS", "Broncoespasmo"],
    "interacciones": ["Digoxina: aumenta niveles 35-85%", "Warfarina: aumenta efecto anticoagulante", "Metoprolol: aumenta niveles de metoprolol", "Rifampicina: reduce niveles de propafenona"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Inicio 150 mg/8h, titular hasta 300 mg/8h según respuesta y ECG",
      "ajusteHepatico": "Reducir dosis 50-75%. Metabolismo hepático extenso"
    },
    "presentaciones": ["Comprimidos 150, 300 mg"],
    "embarazo": "C",
    "lactancia": "Se excreta en leche. No recomendado.",
    "cuidadosEnfermeria": [
      "ECG basal obligatorio y control tras cada ajuste de dosis",
      "Administrar con alimentos para reducir gusto metálico",
      "Vigilar ensanchamiento QRS >25% (suspender)",
      "Contraindicado en pacientes con asma o EPOC severo",
      "Monitorizar PA por efecto betabloqueante",
      "No suspender abruptamente"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: biodisponibilidad 3-40% (metabolismo primer paso variable)",
      "distribucion": "Vd 3-4 L/kg. Unión proteica 95%",
      "metabolismo": "Hepático extenso (CYP2D6, CYP3A4). Metabolizadores lentos: mayor biodisponibilidad",
      "excrecion": "Renal y fecal",
      "vidaMedia": "2-10h (metabolizadores rápidos) a 10-32h (lentos)",
      "inicioAccion": "1-3 horas",
      "picoAccion": "2-3 horas",
      "duracionAccion": "8-12 horas"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u02",
    "capituloId": "c02_02"
  },
  {
    "id": "sotalol",
    "nombre": "Sotalol",
    "nombreGenerico": "Clorhidrato de sotalol",
    "nombresComerciales": ["Sotapor", "Darob", "Sotalol Gador"],
    "familia": "Antiarrítmicos",
    "clasificacion": "Antiarrítmico clase III con actividad betabloqueante no selectiva",
    "mecanismoAccion": "Mezcla racémica con doble mecanismo: l-sotalol bloquea receptores beta (clase II), d-sotalol prolonga la duración del potencial de acción y período refractario bloqueando corrientes de potasio IKr (clase III). Prolonga el intervalo QT de forma dosis-dependiente.",
    "indicaciones": ["Fibrilación auricular (mantenimiento del ritmo sinusal)", "Flutter auricular", "Taquicardia ventricular", "Prevención de arritmias ventriculares recurrentes"],
    "contraindicaciones": ["QT prolongado basal (>450 ms)", "Hipopotasemia o hipomagnesemia no corregida", "Insuficiencia cardíaca descompensada", "Bradicardia <50 lpm", "Asma bronquial", "CrCl <40 mL/min (relativo)", "Síndrome de QT largo congénito"],
    "efectosAdversos": ["Bradicardia", "Fatiga", "Mareo", "Disnea", "Torsade de pointes (2-4%)", "Prolongación QT", "Hipotensión", "Broncoespasmo", "Depresión"],
    "interacciones": ["Amiodarona: prolongación QT aditiva peligrosa", "Diuréticos: hipopotasemia aumenta riesgo de TdP", "Insulina: enmascara hipoglucemia", "Clozapina: prolongación QT", "Antidepresivos tricíclicos: prolongación QT"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Inicio 80 mg/12h. Titular cada 3 días hasta 160 mg/12h. Máx: 320 mg/12h (arritmias ventriculares amenazantes)",
      "ajusteRenal": "CrCl 30-60: cada 24h. CrCl 10-29: cada 36-48h. CrCl <10: contraindicado"
    },
    "presentaciones": ["Comprimidos 80, 160 mg"],
    "embarazo": "B",
    "lactancia": "Se excreta en leche en concentraciones significativas. Evitar.",
    "cuidadosEnfermeria": [
      "Inicio OBLIGATORIO con monitorización ECG continua 3 días (hospitalario)",
      "Medir QTc antes de cada aumento de dosis: si QTc >500 ms SUSPENDER",
      "Controlar potasio y magnesio antes de iniciar y periódicamente",
      "Administrar alejado de antiácidos con aluminio/magnesio (2h)",
      "Vigilar bradicardia y signos de insuficiencia cardíaca",
      "Educación: no suspender abruptamente"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: biodisponibilidad >90%. Reducida por alimentos (administrar en ayunas)",
      "distribucion": "No se une a proteínas. No cruza BHE significativamente",
      "metabolismo": "No se metaboliza (excreción renal inalterada)",
      "excrecion": "Renal 80-90% inalterado",
      "vidaMedia": "12 horas (aumenta en IR)",
      "inicioAccion": "1-2 horas",
      "picoAccion": "2.5-4 horas",
      "duracionAccion": "12-24 horas"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u02",
    "capituloId": "c02_02"
  },
  {
    "id": "hidralazina",
    "nombre": "Hidralazina",
    "nombreGenerico": "Clorhidrato de hidralazina",
    "nombresComerciales": ["Hydrapres", "Hidralazina Northia"],
    "familia": "Vasodilatadores",
    "clasificacion": "Vasodilatador arteriolar directo",
    "mecanismoAccion": "Relaja directamente el músculo liso arteriolar por mecanismo no completamente elucidado, posiblemente interfiriendo con la liberación de calcio intracelular y generando óxido nítrico. No afecta el tono venoso. Produce taquicardia refleja y aumento del gasto cardíaco.",
    "indicaciones": ["Hipertensión arterial (combinada con betabloqueante y diurético)", "Crisis hipertensiva en embarazo", "Insuficiencia cardíaca (combinada con dinitrato de isosorbide)", "Hipertensión refractaria"],
    "contraindicaciones": ["Lupus eritematoso sistémico", "Taquicardia severa", "Aneurisma aórtico disecante", "Cardiopatía isquémica (monoterapia)", "Insuficiencia cardíaca de alto gasto"],
    "efectosAdversos": ["Taquicardia refleja", "Cefalea", "Rubor facial", "Retención hidrosalina", "Síndrome lupus-like (dosis >200 mg/día)", "Hipotensión", "Náuseas", "Neuropatía periférica"],
    "interacciones": ["Betabloqueantes: combinación beneficiosa (atenúa taquicardia refleja)", "AINE: reducen efecto hipotensor", "Diazóxido: hipotensión severa", "IMAO: potencian hipotensión"],
    "viaAdministracion": ["oral", "IV", "IM"],
    "dosis": {
      "adulto": "Oral: inicio 25 mg/8-12h, titular hasta 75 mg/8h. Máx: 300 mg/día. IV crisis: 5-10 mg cada 20 min (máx 40 mg)",
      "ajusteRenal": "CrCl 10-50: cada 8h. CrCl <10: cada 8-16h"
    },
    "presentaciones": ["Comprimidos 25, 50 mg", "Ampolla 20 mg/mL"],
    "embarazo": "C",
    "lactancia": "Compatible. Excreción baja en leche.",
    "cuidadosEnfermeria": [
      "Controlar PA y FC antes y 30 min después de cada dosis",
      "Administrar con alimentos para mejorar absorción",
      "Vigilar síndrome lupus-like: artralgias, fiebre, eritema (uso prolongado >6 meses)",
      "Solicitar ANA si tratamiento prolongado a dosis altas",
      "En IV: administrar lentamente, monitorizar ECG",
      "Combinación obligatoria con betabloqueante para evitar taquicardia refleja"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: biodisponibilidad 25-50% (acetiladores rápidos) a 50-90% (lentos)",
      "distribucion": "Unión proteica 87%",
      "metabolismo": "Hepático por acetilación (polimorfismo genético NAT2)",
      "excrecion": "Renal 80%",
      "vidaMedia": "2-8 horas (variable según fenotipo acetilador)",
      "inicioAccion": "Oral 20-30 min, IV 5-20 min",
      "picoAccion": "Oral 1-2h, IV 10-80 min",
      "duracionAccion": "Oral 6-12h, IV 2-6h"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u02",
    "capituloId": "c02_03"
  },
  {
    "id": "minoxidil_oral",
    "nombre": "Minoxidil (Oral)",
    "nombreGenerico": "Minoxidil",
    "nombresComerciales": ["Loniten"],
    "familia": "Vasodilatadores",
    "clasificacion": "Vasodilatador arteriolar directo - Apertor de canales de potasio",
    "mecanismoAccion": "Su metabolito activo (sulfato de minoxidil) abre canales de potasio ATP-dependientes en el músculo liso arteriolar, produciendo hiperpolarización y relajación. Es el vasodilatador directo más potente disponible por vía oral. Produce retención de sodio y taquicardia refleja marcadas.",
    "indicaciones": ["Hipertensión arterial severa refractaria a triple terapia", "Crisis hipertensiva (cuando otras opciones fallan)"],
    "contraindicaciones": ["Feocromocitoma", "Derrame pericárdico", "Hipertensión pulmonar", "Insuficiencia cardíaca severa no tratada", "Estenosis aórtica severa"],
    "efectosAdversos": ["Hipertricosis (80%)", "Retención hidrosalina severa", "Taquicardia refleja", "Derrame pericárdico", "Edema", "Cambios en onda T del ECG", "Cefalea"],
    "interacciones": ["Betabloqueantes: necesarios para controlar taquicardia refleja", "Diuréticos de asa: necesarios para controlar retención de líquidos", "Guanetidina: hipotensión ortostática severa"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Inicio 5 mg/día en 1-2 tomas. Titular cada 3 días. Dosis habitual: 10-40 mg/día. Máx: 100 mg/día",
      "pediatrico": "Inicio 0.2 mg/kg/día. Máx 50 mg/día",
      "ajusteRenal": "Titular cuidadosamente. Aumenta retención de líquidos en IR"
    },
    "presentaciones": ["Comprimidos 5, 10 mg"],
    "embarazo": "C",
    "lactancia": "Se excreta en leche. Contraindicado.",
    "cuidadosEnfermeria": [
      "USO RESERVADO a HTA refractaria: siempre con betabloqueante + diurético de asa",
      "Control de peso diario: aumento >1.5 kg en 3 días = retención de líquidos",
      "Monitorizar PA acostado y de pie (hipotensión ortostática)",
      "Informar al paciente sobre hipertricosis (reversible al suspender)",
      "Ecocardiograma basal y periódico para descartar derrame pericárdico",
      "No suspender abruptamente (efecto rebote hipertensivo)"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: biodisponibilidad >90%",
      "distribucion": "No se une a proteínas plasmáticas",
      "metabolismo": "Hepático: conjugación con glucurónido, sulfatación (metabolito activo)",
      "excrecion": "Renal 97% (12% inalterado)",
      "vidaMedia": "4.2 horas (efecto dura más por metabolito activo)",
      "inicioAccion": "30 minutos",
      "picoAccion": "2-3 horas",
      "duracionAccion": "24-75 horas (efecto prolongado)"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u02",
    "capituloId": "c02_03"
  },
  {
    "id": "iloprost",
    "nombre": "Iloprost",
    "nombreGenerico": "Iloprost",
    "nombresComerciales": ["Ventavis", "Ilomedin"],
    "familia": "Vasodilatadores",
    "clasificacion": "Análogo de prostaciclina (PGI2)",
    "mecanismoAccion": "Análogo estable de la prostaciclina. Activa receptores IP de prostaciclina, estimulando adenilato ciclasa y aumentando AMPc. Produce vasodilatación pulmonar y sistémica, inhibe la agregación plaquetaria, posee efecto antiproliferativo sobre músculo liso vascular y citoprotector endotelial.",
    "indicaciones": ["Hipertensión pulmonar arterial (clase funcional III-IV)", "Enfermedad arterial periférica severa (isquemia crítica)", "Fenómeno de Raynaud severo"],
    "contraindicaciones": ["Sangrado activo", "Hipertensión pulmonar por enfermedad venooclusiva", "Inestabilidad hemodinámica severa", "Embarazo"],
    "efectosAdversos": ["Cefalea", "Rubor facial", "Tos (inhalatorio)", "Dolor mandibular", "Hipotensión", "Náuseas", "Dolor en sitio de infusión IV", "Trismus"],
    "interacciones": ["Anticoagulantes: potencia efecto (riesgo de sangrado)", "Antihipertensivos: hipotensión aditiva", "Antiagregantes: sinergismo en inhibición plaquetaria"],
    "viaAdministracion": ["inhalatoria", "IV"],
    "dosis": {
      "adulto": "Inhalatorio: 2.5-5 mcg/inhalación, 6-9 veces/día (nebulizador específico). IV: 0.5-2 ng/kg/min en infusión continua"
    },
    "presentaciones": ["Ampolla para nebulización 10 mcg/mL 1 mL", "Ampolla para infusión IV 20 mcg/mL"],
    "embarazo": "X",
    "lactancia": "Datos insuficientes. Contraindicado.",
    "cuidadosEnfermeria": [
      "Inhalatorio: usar nebulizador específico (Breelib o I-Neb), no nebulizador convencional",
      "Monitorizar PA antes y después de cada inhalación",
      "Vigilar signos de hipotensión: mareo, síncope",
      "En infusión IV: bomba de infusión obligatoria, vía exclusiva",
      "Educación al paciente: técnica correcta de inhalación",
      "No mezclar con otros medicamentos en el nebulizador"
    ],
    "farmacocinetica": {
      "absorcion": "Inhalatoria: rápida, biodisponibilidad pulmonar alta",
      "distribucion": "Unión proteica 60%",
      "metabolismo": "Hepático: beta-oxidación de cadena lateral",
      "excrecion": "Renal 68%, fecal 12%",
      "vidaMedia": "20-30 minutos",
      "inicioAccion": "Inhalatorio: minutos",
      "picoAccion": "5 minutos post-inhalación",
      "duracionAccion": "30-60 minutos por inhalación"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz. No refrigerar ampolla abierta.",
    "unidadId": "u02",
    "capituloId": "c02_03"
  },
  {
    "id": "indapamida",
    "nombre": "Indapamida",
    "nombreGenerico": "Indapamida",
    "nombresComerciales": ["Natrilix", "Natrilix SR", "Indapamida Gador"],
    "familia": "Diuréticos",
    "clasificacion": "Diurético tiazídico-like (indolina)",
    "mecanismoAccion": "Inhibe la reabsorción de sodio y cloro en el segmento cortical del asa de Henle y en el túbulo contorneado distal (co-transportador Na-Cl). A dosis terapéuticas posee efecto vasodilatador directo predominante sobre el efecto diurético, lo que la diferencia de las tiazidas clásicas.",
    "indicaciones": ["Hipertensión arterial esencial", "Hipertensión arterial en paciente anciano", "Insuficiencia cardíaca con edema leve"],
    "contraindicaciones": ["Insuficiencia renal severa (CrCl <30)", "Encefalopatía hepática", "Hipopotasemia severa", "Alergia a sulfonamidas", "Hiponatremia severa"],
    "efectosAdversos": ["Hipopotasemia", "Hiponatremia", "Hiperuricemia", "Hipotensión ortostática", "Astenia", "Cefalea", "Hiperglucemia", "Alcalosis metabólica"],
    "interacciones": ["Litio: aumenta niveles (riesgo de toxicidad)", "AINE: reducen efecto diurético e hipotensor", "Digital: hipopotasemia potencia toxicidad digitálica", "IECA/ARA II: hipotensión primera dosis, hiperpotasemia"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "1.25-2.5 mg/día en dosis única matutina (liberación prolongada: 1.5 mg/día)"
    },
    "presentaciones": ["Comprimidos 2.5 mg", "Comprimidos de liberación prolongada 1.5 mg"],
    "embarazo": "D",
    "lactancia": "Se excreta en leche. No recomendado.",
    "cuidadosEnfermeria": [
      "Administrar por la mañana para evitar nicturia",
      "Control periódico de electrolitos: potasio, sodio, magnesio",
      "Monitorizar ácido úrico y glucemia (especialmente en diabéticos)",
      "Educar sobre ingesta adecuada de potasio (frutas, verduras)",
      "Vigilar signos de hiponatremia en ancianos: confusión, somnolencia",
      "Control de PA de pie (hipotensión ortostática)"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: biodisponibilidad 93%",
      "distribucion": "Unión proteica 79%. Alta fijación a eritrocitos",
      "metabolismo": "Hepático extenso",
      "excrecion": "Renal 60-70%, fecal 23%",
      "vidaMedia": "14-24 horas",
      "inicioAccion": "1-2 horas",
      "picoAccion": "2 horas",
      "duracionAccion": "24 horas (36h liberación prolongada)"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u02",
    "capituloId": "c02_04"
  },
  {
    "id": "clortalidona",
    "nombre": "Clortalidona",
    "nombreGenerico": "Clortalidona",
    "nombresComerciales": ["Higroton", "Clortalidona Northia"],
    "familia": "Diuréticos",
    "clasificacion": "Diurético tiazídico-like (ftalimidina)",
    "mecanismoAccion": "Inhibe la reabsorción de sodio y cloro en el túbulo contorneado distal. Posee vida media prolongada y mayor potencia antihipertensiva que hidroclorotiazida en estudios comparativos. Mayor evidencia de reducción de eventos cardiovasculares (estudio ALLHAT).",
    "indicaciones": ["Hipertensión arterial (primera línea)", "Insuficiencia cardíaca congestiva leve", "Edema", "Diabetes insípida nefrogénica", "Nefrolitiasis cálcica recurrente"],
    "contraindicaciones": ["Anuria", "Insuficiencia renal severa", "Insuficiencia hepática severa", "Hipopotasemia refractaria", "Hiponatremia sintomática", "Hipersensibilidad a sulfonamidas"],
    "efectosAdversos": ["Hipopotasemia", "Hiponatremia", "Hiperuricemia", "Hiperglucemia", "Hiperlipidemia", "Hipotensión ortostática", "Fotosensibilidad", "Disfunción eréctil"],
    "interacciones": ["Digital: hipopotasemia aumenta toxicidad", "Litio: reduce excreción renal", "AINE: antagonizan efecto diurético", "Corticoides: hipopotasemia aditiva", "Antidiabéticos: reduce eficacia"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "HTA: 12.5-25 mg/día. ICC: 25-50 mg/día. Máx: 100 mg/día",
      "geriatrico": "Inicio 6.25-12.5 mg/día"
    },
    "presentaciones": ["Comprimidos 25, 50 mg"],
    "embarazo": "D",
    "lactancia": "Se excreta en leche. No recomendado.",
    "cuidadosEnfermeria": [
      "Administrar por la mañana en dosis única",
      "Control de electrolitos cada 2-4 semanas al inicio, luego cada 3-6 meses",
      "Mayor riesgo de hiponatremia que HCTZ por vida media larga",
      "Monitorizar glucemia en prediabéticos/diabéticos",
      "Vigilar hiperuricemia y crisis gotosa",
      "Pesar al paciente regularmente para control de edema",
      "Protección solar por fotosensibilidad"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: biodisponibilidad 65%",
      "distribucion": "Unión proteica 75%. Se acumula en eritrocitos",
      "metabolismo": "Mínimo. Se excreta mayormente inalterada",
      "excrecion": "Renal 65% inalterada",
      "vidaMedia": "40-60 horas (permite dosificación cada 48h)",
      "inicioAccion": "2-6 horas",
      "picoAccion": "2-6 horas",
      "duracionAccion": "48-72 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u02",
    "capituloId": "c02_04"
  },
  {
    "id": "acetazolamida",
    "nombre": "Acetazolamida",
    "nombreGenerico": "Acetazolamida",
    "nombresComerciales": ["Diamox", "Acetazolamida Northia"],
    "familia": "Diuréticos",
    "clasificacion": "Inhibidor de la anhidrasa carbónica",
    "mecanismoAccion": "Inhibe la anhidrasa carbónica en el túbulo proximal renal, reduciendo la reabsorción de bicarbonato de sodio y generando diuresis alcalina. También actúa en ojo (reduce producción de humor acuoso), cerebro (reduce producción de LCR) y eritrocitos.",
    "indicaciones": ["Glaucoma de ángulo abierto", "Mal de altura (profilaxis y tratamiento)", "Epilepsia (coadyuvante, especialmente ausencias)", "Hipertensión endocraneana idiopática", "Alcalosis metabólica", "Edema por insuficiencia cardíaca (coadyuvante)"],
    "contraindicaciones": ["Insuficiencia hepática severa (riesgo de encefalopatía)", "Insuficiencia renal severa", "Hiponatremia/hipopotasemia", "Acidosis metabólica hiperclorémica", "Litiasis renal por cálculos de calcio", "Alergia a sulfonamidas"],
    "efectosAdversos": ["Parestesias en extremidades", "Disgeusia", "Acidosis metabólica", "Poliuria", "Nefrolitiasis", "Anorexia", "Somnolencia", "Miopía transitoria"],
    "interacciones": ["Salicilatos: toxicidad por salicilatos aumentada", "Litio: aumenta excreción renal de litio", "Fenitoína: aumenta osteomalacia", "Ciclosporina: aumenta niveles"],
    "viaAdministracion": ["oral", "IV"],
    "dosis": {
      "adulto": "Glaucoma: 250 mg/6-12h oral. Mal de altura: 125-250 mg/12h inicio 24-48h antes. Edema: 250-375 mg/día",
      "pediatrico": "5-10 mg/kg/día en 2-3 tomas",
      "ajusteRenal": "CrCl 10-50: cada 12h. CrCl <10: evitar (ineficaz y riesgo de acidosis)"
    },
    "presentaciones": ["Comprimidos 250 mg", "Frasco ampolla 500 mg"],
    "embarazo": "C",
    "lactancia": "Se excreta en leche en mínimas cantidades. Compatible con precaución.",
    "cuidadosEnfermeria": [
      "Fomentar ingesta hídrica abundante para prevenir nefrolitiasis",
      "Monitorizar gasometría: riesgo de acidosis metabólica",
      "Control de electrolitos: potasio, sodio, bicarbonato",
      "Informar que parestesias son efecto esperado y generalmente transitorias",
      "Tolerancia diurética aparece en 2-3 días (uso intermitente en ICC)",
      "Contraindicada en cirrosis hepática (precipita encefalopatía)"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: bien absorbida",
      "distribucion": "Unión proteica 90%. Cruza BHE",
      "metabolismo": "No se metaboliza",
      "excrecion": "Renal 100% inalterada",
      "vidaMedia": "6-9 horas",
      "inicioAccion": "Oral 1-1.5h, IV 2 min",
      "picoAccion": "Oral 2-4h, IV 15 min",
      "duracionAccion": "8-12 horas"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u02",
    "capituloId": "c02_04"
  },
  {
    "id": "tolvaptan",
    "nombre": "Tolvaptán",
    "nombreGenerico": "Tolvaptán",
    "nombresComerciales": ["Samsca"],
    "familia": "Diuréticos",
    "clasificacion": "Antagonista selectivo del receptor V2 de vasopresina (vaptán / acuarético)",
    "mecanismoAccion": "Bloquea selectivamente los receptores V2 de vasopresina (ADH) en el túbulo colector renal, impidiendo la inserción de acuaporina-2 y la reabsorción de agua libre. Produce acuaresis (eliminación de agua sin electrolitos), aumentando la natremia sin deplecionar sodio ni potasio.",
    "indicaciones": ["Hiponatremia euvolémica o hipervolémica (SIADH)", "Insuficiencia cardíaca con hiponatremia", "Poliquistosis renal autosómica dominante"],
    "contraindicaciones": ["Hiponatremia hipovolémica", "Anuria", "Paciente que no puede percibir sed", "Hipernatremia", "Uso concomitante de inhibidores potentes de CYP3A4", "Hepatopatía severa"],
    "efectosAdversos": ["Sed intensa", "Poliuria", "Boca seca", "Hipernatremia (corrección excesiva)", "Deshidratación", "Hepatotoxicidad", "Hiperglucemia"],
    "interacciones": ["Inhibidores CYP3A4 (ketoconazol, claritromicina): aumentan niveles - EVITAR", "Inductores CYP3A4 (rifampicina): reducen eficacia", "Digoxina: aumenta niveles de digoxina 25%", "Desmopresina: antagonismo"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Hiponatremia: inicio 15 mg/día, titular a 30 mg y luego 60 mg/día según natremia. PQRAD: 60-120 mg/día en dosis divididas",
      "ajusteHepatico": "Contraindicado en daño hepático severo"
    },
    "presentaciones": ["Comprimidos 15, 30, 60 mg"],
    "embarazo": "C",
    "lactancia": "Datos insuficientes. No recomendado.",
    "cuidadosEnfermeria": [
      "INICIO OBLIGATORIO HOSPITALARIO con monitorización de natremia cada 6-8h",
      "Velocidad de corrección: NO exceder 10-12 mEq/L en 24h (riesgo de mielinolisis pontina)",
      "Asegurar acceso libre al agua: NO restringir líquidos las primeras 24h",
      "Monitorizar diuresis horaria y balance hídrico estricto",
      "Control de función hepática mensual (hepatotoxicidad)",
      "Limitar tratamiento a 30 días (hiponatremia)"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: biodisponibilidad 56%",
      "distribucion": "Unión proteica 99%",
      "metabolismo": "Hepático extenso (CYP3A4)",
      "excrecion": "Fecal (mayoría), renal <1%",
      "vidaMedia": "12 horas",
      "inicioAccion": "2-4 horas",
      "picoAccion": "2-4 horas",
      "duracionAccion": "24 horas"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u02",
    "capituloId": "c02_04"
  },
  {
    "id": "bumetanida",
    "nombre": "Bumetanida",
    "nombreGenerico": "Bumetanida",
    "nombresComerciales": ["Bumelex", "Bumetanida Northia"],
    "familia": "Diuréticos",
    "clasificacion": "Diurético de asa",
    "mecanismoAccion": "Inhibe el co-transportador Na-K-2Cl (NKCC2) en la rama ascendente gruesa del asa de Henle, bloqueando la reabsorción de sodio, potasio y cloro. 40 veces más potente que furosemida en base miligramo. Produce vasodilatación venosa precoz (efecto pre-diurético).",
    "indicaciones": ["Edema refractario a furosemida", "Insuficiencia cardíaca congestiva", "Edema pulmonar agudo", "Síndrome nefrótico", "Insuficiencia renal con sobrecarga de volumen"],
    "contraindicaciones": ["Anuria", "Depleción severa de electrolitos", "Coma hepático", "Hipersensibilidad a sulfonamidas"],
    "efectosAdversos": ["Hipopotasemia", "Hiponatremia", "Alcalosis metabólica", "Ototoxicidad (menos que furosemida)", "Hiperuricemia", "Hiperglucemia", "Calambres", "Hipotensión"],
    "interacciones": ["Aminoglucósidos: ototoxicidad aditiva", "Digital: hipopotasemia potencia toxicidad", "Litio: reduce excreción renal", "AINE: reducen efecto diurético", "Corticoides: hipopotasemia aditiva"],
    "viaAdministracion": ["oral", "IV", "IM"],
    "dosis": {
      "adulto": "Oral: 0.5-2 mg/día en 1-2 tomas. IV: 0.5-1 mg, puede repetir cada 2-3h. Máx: 10 mg/día. Equivalencia: 1 mg bumetanida = 40 mg furosemida",
      "ajusteRenal": "Puede necesitar dosis mayores en IR severa. No se dializa"
    },
    "presentaciones": ["Comprimidos 0.5, 1 mg", "Ampolla 0.5 mg/2 mL"],
    "embarazo": "C",
    "lactancia": "No se sabe si se excreta en leche. Precaución.",
    "cuidadosEnfermeria": [
      "Equivalencia de potencia: 1 mg bumetanida = 40 mg furosemida",
      "Alternativa cuando hay resistencia a furosemida (mejor absorción oral en ICC)",
      "Control estricto de electrolitos: potasio, sodio, magnesio, calcio",
      "Monitorizar peso diario y balance hídrico",
      "Vigilar signos de deshidratación y ototoxicidad",
      "Administrar IV lentamente en 1-2 min"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: biodisponibilidad 80-95% (superior a furosemida 50%)",
      "distribucion": "Unión proteica 97%",
      "metabolismo": "Hepático 50%",
      "excrecion": "Renal 50% inalterada",
      "vidaMedia": "1-1.5 horas",
      "inicioAccion": "Oral 30-60 min, IV 2-3 min",
      "picoAccion": "Oral 1-2h, IV 15-30 min",
      "duracionAccion": "4-6 horas"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.",
    "unidadId": "u02",
    "capituloId": "c02_04"
  },
  {
    "id": "amilorida",
    "nombre": "Amilorida",
    "nombreGenerico": "Clorhidrato de amilorida",
    "nombresComerciales": ["Moduretic (combinación)", "Amilorida/HCTZ Northia"],
    "familia": "Diuréticos",
    "clasificacion": "Diurético ahorrador de potasio (bloqueante de canales de sodio epiteliales)",
    "mecanismoAccion": "Bloquea los canales de sodio epiteliales (ENaC) en el túbulo colector cortical, inhibiendo la reabsorción de sodio e indirectamente reduciendo la secreción de potasio e hidrógeno. Efecto diurético débil, se usa principalmente como ahorrador de potasio en combinación con tiazidas.",
    "indicaciones": ["Hipertensión arterial (combinada con tiazida)", "Prevención de hipopotasemia por diuréticos", "Insuficiencia cardíaca (coadyuvante)", "Síndrome de Liddle", "Litio-inducida diabetes insípida nefrogénica"],
    "contraindicaciones": ["Hiperpotasemia (K >5.5 mEq/L)", "Insuficiencia renal severa (CrCl <30)", "Uso concomitante de otros ahorradores de potasio", "Suplementos de potasio (relativo)", "Anuria"],
    "efectosAdversos": ["Hiperpotasemia", "Náuseas", "Cefalea", "Mareo", "Debilidad", "Calambres", "Hiponatremia (rara)"],
    "interacciones": ["IECA/ARA II: hiperpotasemia severa", "Espironolactona/eplerenona: hiperpotasemia", "Suplementos de potasio: contraindicado", "AINE: aumentan riesgo de hiperpotasemia e IR", "Litio: reduce excreción renal"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "5-10 mg/día (generalmente combinada con HCTZ 25-50 mg). Máx: 20 mg/día",
      "ajusteRenal": "CrCl 30-50: reducir dosis 50%. CrCl <30: contraindicado"
    },
    "presentaciones": ["Comprimidos 5 mg (combinación con HCTZ 50 mg: Moduretic)"],
    "embarazo": "D",
    "lactancia": "Datos limitados. No recomendado.",
    "cuidadosEnfermeria": [
      "Control de potasio sérico antes de iniciar y cada 1-2 semanas al inicio",
      "NUNCA combinar con suplementos de potasio sin indicación estricta",
      "Vigilar signos de hiperpotasemia: debilidad muscular, parestesias, bradicardia",
      "Administrar con alimentos para reducir GI upset",
      "Precaución extrema si se combina con IECA/ARA II",
      "Monitorizar creatinina y función renal"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: biodisponibilidad 50%. Aumenta con alimentos",
      "distribucion": "No se une significativamente a proteínas",
      "metabolismo": "No se metaboliza",
      "excrecion": "Renal 50% inalterada, fecal 40%",
      "vidaMedia": "6-9 horas",
      "inicioAccion": "2 horas",
      "picoAccion": "6-10 horas",
      "duracionAccion": "24 horas"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u02",
    "capituloId": "c02_04"
  },
  {
    "id": "rosuvastatina",
    "nombre": "Rosuvastatina",
    "nombreGenerico": "Rosuvastatina cálcica",
    "nombresComerciales": ["Crestor", "Rosuvastatina Gador", "Lipemol"],
    "familia": "Antilipémicos",
    "clasificacion": "Inhibidor de HMG-CoA reductasa (estatina de alta potencia)",
    "mecanismoAccion": "Inhibe competitivamente la HMG-CoA reductasa, enzima limitante de la síntesis hepática de colesterol. Esto estimula la expresión de receptores de LDL hepáticos, aumentando la captación y clearance de LDL-c plasmático. Es la estatina más potente: reduce LDL-c hasta 55-63% a dosis máximas.",
    "indicaciones": ["Hipercolesterolemia primaria", "Dislipidemia mixta", "Prevención cardiovascular primaria y secundaria", "Hipercolesterolemia familiar homocigota", "Hipertrigliceridemia severa (coadyuvante)"],
    "contraindicaciones": ["Enfermedad hepática activa", "Elevación persistente de transaminasas >3x LSN", "Embarazo y lactancia", "Miopatía activa", "Uso concomitante con ciclosporina"],
    "efectosAdversos": ["Mialgia (5-10%)", "Cefalea", "Elevación de CPK", "Elevación de transaminasas", "Rabdomiólisis (rara)", "Diabetes mellitus de novo", "Dispepsia", "Proteinuria (dosis altas)"],
    "interacciones": ["Ciclosporina: aumenta niveles de rosuvastatina 7x (contraindicado)", "Gemfibrozil: aumenta riesgo de miopatía (evitar)", "Warfarina: aumenta INR", "Antiácidos: reducen absorción (dar 2h después)", "Inhibidores de proteasa: aumentan niveles"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Inicio: 5-10 mg/día. Habitual: 10-20 mg/día. Máx: 40 mg/día (uso restringido)",
      "geriatrico": "Inicio 5 mg/día",
      "ajusteRenal": "CrCl <30: inicio 5 mg/día, máx 10 mg/día"
    },
    "presentaciones": ["Comprimidos 5, 10, 20, 40 mg"],
    "embarazo": "X",
    "lactancia": "Contraindicada.",
    "cuidadosEnfermeria": [
      "Puede administrarse a cualquier hora del día (vida media larga)",
      "Solicitar perfil lipídico y hepatograma basal, repetir a las 4-12 semanas",
      "Educar sobre síntomas de miopatía: dolor muscular inexplicable, debilidad",
      "Si CPK >10x LSN con síntomas: suspender inmediatamente",
      "Monitorizar glucemia en pacientes con factores de riesgo de diabetes",
      "Anticoncepción efectiva obligatoria en mujeres fértiles"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: biodisponibilidad 20%. No afectada por alimentos",
      "distribucion": "Unión proteica 88%. Selectividad hepática alta",
      "metabolismo": "Hepático mínimo (10%). CYP2C9",
      "excrecion": "Fecal 90%, renal 10%",
      "vidaMedia": "19 horas",
      "inicioAccion": "1 semana (efecto máximo 4 semanas)",
      "picoAccion": "3-5 horas",
      "duracionAccion": "Efecto sostenido con administración diaria"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la humedad.",
    "unidadId": "u02",
    "capituloId": "c02_05"
  },
  {
    "id": "ezetimibe",
    "nombre": "Ezetimibe",
    "nombreGenerico": "Ezetimibe",
    "nombresComerciales": ["Zetia", "Ezetrol", "Ezetimibe Gador"],
    "familia": "Antilipémicos",
    "clasificacion": "Inhibidor selectivo de la absorción intestinal de colesterol",
    "mecanismoAccion": "Inhibe selectivamente la proteína NPC1L1 (Niemann-Pick C1-Like 1) en el borde en cepillo del enterocito, bloqueando la absorción intestinal de colesterol dietario y biliar. Reduce el aporte hepático de colesterol, estimulando la expresión de receptores LDL. Reduce LDL-c un 15-20% adicional cuando se combina con estatinas.",
    "indicaciones": ["Hipercolesterolemia primaria (combinada con estatina)", "Hipercolesterolemia familiar homocigota (coadyuvante)", "Sitosterolemia", "Intolerancia a estatinas (monoterapia)"],
    "contraindicaciones": ["Hipersensibilidad al fármaco", "Enfermedad hepática activa (si se combina con estatina)", "Embarazo y lactancia (combinación con estatina)"],
    "efectosAdversos": ["Diarrea", "Dolor abdominal", "Fatiga", "Cefalea", "Mialgia (rara en monoterapia)", "Elevación de transaminasas (combinación)"],
    "interacciones": ["Estatinas: efecto aditivo beneficioso en reducción de LDL", "Colestiramina: reduce absorción de ezetimibe (dar 2h antes o 4h después)", "Fibratos: aumentan excreción biliar de ezetimibe", "Ciclosporina: aumenta niveles de ezetimibe"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "10 mg/día en dosis única (puede administrarse solo o con estatina)"
    },
    "presentaciones": ["Comprimidos 10 mg", "Combinación con simvastatina (10/20, 10/40 mg)", "Combinación con rosuvastatina (10/10, 10/20 mg)"],
    "embarazo": "X",
    "lactancia": "No recomendado.",
    "cuidadosEnfermeria": [
      "Puede administrarse a cualquier hora, con o sin alimentos",
      "Hepatograma basal y periódico si se combina con estatina",
      "No requiere monitorización especial en monoterapia",
      "Educar que el efecto óptimo es en combinación con estatina",
      "Si se usa con colestiramina: dar ezetimibe 2h antes o 4h después",
      "Perfil lipídico de control a las 4-6 semanas"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: bien absorbido. Circulación enterohepática activa",
      "distribucion": "Unión proteica 99.7%",
      "metabolismo": "Intestinal y hepático por glucuronización (no CYP450)",
      "excrecion": "Fecal 78%, renal 11%",
      "vidaMedia": "22 horas (incluyendo metabolito activo glucurónido)",
      "inicioAccion": "Días (efecto máximo 2-4 semanas)",
      "picoAccion": "4-12 horas",
      "duracionAccion": "Efecto sostenido con administración diaria"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u02",
    "capituloId": "c02_05"
  },
  {
    "id": "fenofibrato",
    "nombre": "Fenofibrato",
    "nombreGenerico": "Fenofibrato",
    "nombresComerciales": ["Lipidil", "Fenofibrato Gador", "Secalip"],
    "familia": "Antilipémicos",
    "clasificacion": "Derivado del ácido fíbrico (fibrato)",
    "mecanismoAccion": "Agonista de PPARalfa (receptor activado por proliferador de peroxisomas alfa). Aumenta la oxidación de ácidos grasos, estimula la actividad de lipoproteín lipasa y reduce la síntesis hepática de VLDL. Reduce triglicéridos 30-50%, aumenta HDL-c 10-20% y reduce LDL-c 10-25% (partículas densas).",
    "indicaciones": ["Hipertrigliceridemia severa (>500 mg/dL)", "Dislipidemia mixta", "Hipercolesterolemia (coadyuvante)", "Prevención de pancreatitis por hipertrigliceridemia", "Dislipidemia diabética (triglicéridos altos + HDL bajo)"],
    "contraindicaciones": ["Insuficiencia hepática severa", "Insuficiencia renal severa (CrCl <30)", "Litiasis vesicular", "Uso concomitante con gemfibrozil", "Enfermedad de la vesícula biliar"],
    "efectosAdversos": ["Dispepsia", "Dolor abdominal", "Elevación de transaminasas", "Miopatía (especialmente con estatinas)", "Elevación de creatinina (reversible)", "Colelitiasis", "Pancreatitis (rara)"],
    "interacciones": ["Estatinas: riesgo de miopatía aumentado (menor que con gemfibrozil)", "Warfarina: potencia efecto anticoagulante", "Ciclosporina: riesgo de nefrotoxicidad y miopatía", "Colestiramina: reducción de absorción (dar 1h antes o 4-6h después)"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Micronizado: 200 mg/día con la cena. Nanoparticulado: 145 mg/día con o sin alimentos",
      "ajusteRenal": "CrCl 30-59: iniciar 48 mg/día. CrCl <30: contraindicado"
    },
    "presentaciones": ["Cápsulas 200 mg (micronizado)", "Comprimidos 145 mg (nanoparticulado)", "Comprimidos 160 mg"],
    "embarazo": "C",
    "lactancia": "No recomendado.",
    "cuidadosEnfermeria": [
      "Formulación micronizada: administrar con la comida principal para mejorar absorción",
      "Formulación nanoparticulada: puede darse con o sin alimentos",
      "Hepatograma basal y cada 3-6 meses el primer año",
      "Monitorizar CPK si se combina con estatina",
      "Controlar función renal: puede elevar creatinina reversiblemente",
      "Vigilar síntomas biliares: dolor en hipocondrio derecho"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: aumenta 35% con alimentos (micronizado)",
      "distribucion": "Unión proteica 99%",
      "metabolismo": "Rápida hidrólisis a ácido fenofíbrico (metabolito activo). Glucuronización",
      "excrecion": "Renal 60%, fecal 25%",
      "vidaMedia": "20 horas (ácido fenofíbrico)",
      "inicioAccion": "Días (efecto máximo 6-8 semanas)",
      "picoAccion": "6-8 horas",
      "duracionAccion": "Efecto sostenido con administración diaria"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la humedad.",
    "unidadId": "u02",
    "capituloId": "c02_05"
  },
  {
    "id": "gemfibrozil",
    "nombre": "Gemfibrozil",
    "nombreGenerico": "Gemfibrozil",
    "nombresComerciales": ["Lopid", "Gemfibrozil Northia"],
    "familia": "Antilipémicos",
    "clasificacion": "Derivado del ácido fíbrico (fibrato)",
    "mecanismoAccion": "Agonista de PPARalfa. Reduce la síntesis hepática de VLDL y aumenta el catabolismo de triglicéridos mediante estimulación de lipoproteín lipasa. Reduce triglicéridos 40-55%, aumenta HDL-c 10-25%. Inhibe la glucuronización de estatinas (CYP2C8), aumentando significativamente el riesgo de miopatía combinada.",
    "indicaciones": ["Hipertrigliceridemia severa", "Prevención de pancreatitis por hipertrigliceridemia", "Dislipidemia tipo IIb y IV"],
    "contraindicaciones": ["Enfermedad hepática severa", "Insuficiencia renal severa", "Litiasis biliar", "Uso concomitante con estatinas (especialmente simvastatina y lovastatina)", "Uso concomitante con repaglinida"],
    "efectosAdversos": ["Dispepsia", "Dolor abdominal", "Diarrea", "Miopatía/rabdomiólisis (especialmente con estatinas)", "Elevación de transaminasas", "Colelitiasis", "Anemia"],
    "interacciones": ["Estatinas: riesgo muy alto de rabdomiólisis (EVITAR combinación)", "Warfarina: potencia anticoagulación significativamente", "Repaglinida: hipoglucemia severa (CONTRAINDICADO)", "Ciclosporina: nefrotoxicidad"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "600 mg/12h, 30 minutos antes del desayuno y cena"
    },
    "presentaciones": ["Comprimidos 600, 900 mg"],
    "embarazo": "C",
    "lactancia": "Datos insuficientes. No recomendado.",
    "cuidadosEnfermeria": [
      "Administrar 30 min antes de las comidas (desayuno y cena)",
      "EVITAR combinación con estatinas: riesgo alto de rabdomiólisis",
      "Si debe combinarse con estatina: SOLO con rosuvastatina o pravastatina a dosis bajas",
      "Hepatograma y perfil lipídico basal, luego cada 3-6 meses",
      "Vigilar síntomas musculares: dolor, debilidad, orina oscura",
      "Control de función renal periódico"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: biodisponibilidad 97%. Absorción completa",
      "distribucion": "Unión proteica 97%",
      "metabolismo": "Hepático por oxidación y glucuronización. Inhibe CYP2C8",
      "excrecion": "Renal 70% (como metabolitos), fecal 6%",
      "vidaMedia": "1.5 horas (pero efecto prolongado)",
      "inicioAccion": "Días",
      "picoAccion": "1-2 horas",
      "duracionAccion": "Efecto sostenido con administración continua"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u02",
    "capituloId": "c02_05"
  },
  {
    "id": "colestiramina",
    "nombre": "Colestiramina",
    "nombreGenerico": "Colestiramina (resina de intercambio aniónico)",
    "nombresComerciales": ["Questran", "Colestiramina Bagó"],
    "familia": "Antilipémicos",
    "clasificacion": "Secuestrador de ácidos biliares (resina)",
    "mecanismoAccion": "Resina de intercambio aniónico no absorbible que se une a ácidos biliares en el intestino formando un complejo insoluble que se excreta por heces. Al interrumpir la circulación enterohepática, el hígado convierte más colesterol en ácidos biliares, aumentando la expresión de receptores LDL. Reduce LDL-c 15-30%.",
    "indicaciones": ["Hipercolesterolemia primaria (coadyuvante o alternativa a estatinas)", "Prurito por colestasis", "Diarrea por malabsorción de ácidos biliares", "Intoxicación por digitálicos o tiroxina"],
    "contraindicaciones": ["Obstrucción biliar completa", "Hipertrigliceridemia >400 mg/dL (puede empeorar)", "Constipación severa", "Fenilcetonuria (contiene aspartamo)"],
    "efectosAdversos": ["Constipación (más frecuente)", "Distensión abdominal", "Flatulencia", "Náuseas", "Esteatorrea", "Deficiencia de vitaminas liposolubles (A, D, E, K)", "Acidosis hiperclorémica (rara)"],
    "interacciones": ["TODOS los medicamentos orales: reducción de absorción (dar otros fármacos 1h antes o 4-6h después)", "Warfarina: reduce absorción", "Digoxina: reduce absorción", "Tiroxina: reduce absorción", "Vitaminas liposolubles: reduce absorción"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Inicio: 4 g/día, titular cada 1-2 semanas. Habitual: 8-16 g/día en 2 tomas. Máx: 24 g/día"
    },
    "presentaciones": ["Polvo para suspensión 4 g/sobre"],
    "embarazo": "C",
    "lactancia": "No se absorbe. Compatible (vigilar vitaminas liposolubles).",
    "cuidadosEnfermeria": [
      "Mezclar el polvo en 120-180 mL de agua o jugo (NUNCA en seco)",
      "REGLA CRÍTICA: dar todos los demás medicamentos 1h ANTES o 4-6h DESPUÉS",
      "Administrar con las comidas para mejorar tolerancia",
      "Recomendar ingesta de fibra y líquidos para prevenir constipación",
      "Suplementar vitaminas A, D, E, K si uso prolongado",
      "Monitorizar INR si el paciente usa anticoagulantes orales"
    ],
    "farmacocinetica": {
      "absorcion": "No se absorbe. Actúa localmente en intestino",
      "distribucion": "No aplicable",
      "metabolismo": "No se metaboliza",
      "excrecion": "Fecal 100% como complejo con ácidos biliares",
      "vidaMedia": "No aplicable",
      "inicioAccion": "24-48 horas (efecto pleno: 2-4 semanas)",
      "picoAccion": "No aplicable",
      "duracionAccion": "Mientras se administre"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la humedad.",
    "unidadId": "u02",
    "capituloId": "c02_05"
  },
  {
    "id": "ticagrelor",
    "nombre": "Ticagrelor",
    "nombreGenerico": "Ticagrelor",
    "nombresComerciales": ["Brilinta", "Brilique"],
    "familia": "Antiagregantes plaquetarios",
    "clasificacion": "Inhibidor reversible del receptor P2Y12 de ADP (ciclopentiltriazolopirimidina)",
    "mecanismoAccion": "Se une reversiblemente al receptor P2Y12 de ADP en la plaqueta sin necesidad de activación metabólica (a diferencia de clopidogrel). Inhibe la agregación plaquetaria mediada por ADP de forma más potente, más rápida y más predecible que clopidogrel. Adicionalmente inhibe la recaptación de adenosina por eritrocitos.",
    "indicaciones": ["Síndrome coronario agudo (con aspirina)", "Post-angioplastia con stent (doble antiagregación)", "Prevención secundaria post-IAM (hasta 12 meses)", "Reducción de eventos aterotrombóticos en pacientes de alto riesgo"],
    "contraindicaciones": ["Sangrado activo", "Antecedente de hemorragia intracraneal", "Insuficiencia hepática severa", "Uso concomitante de inhibidores potentes de CYP3A4", "Bradicardia sintomática sin marcapasos"],
    "efectosAdversos": ["Disnea (14%)", "Sangrado", "Cefalea", "Bradicardia", "Hiperuricemia", "Elevación de creatinina", "Pausas ventriculares (primera semana)"],
    "interacciones": ["Aspirina >300 mg/día: reduce eficacia de ticagrelor", "Inhibidores potentes CYP3A4 (ketoconazol): CONTRAINDICADO", "Inductores potentes CYP3A4 (rifampicina): reduce eficacia", "Digoxina: aumenta niveles 25%", "Simvastatina: aumenta niveles"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Carga: 180 mg. Mantenimiento: 90 mg/12h (con aspirina 75-100 mg/día). Post-IAM >1 año: 60 mg/12h"
    },
    "presentaciones": ["Comprimidos 60, 90 mg"],
    "embarazo": "C",
    "lactancia": "Datos insuficientes. No recomendado.",
    "cuidadosEnfermeria": [
      "Administrar con aspirina 75-100 mg/día (NO más de 100 mg: reduce eficacia)",
      "Suspender 5 días antes de cirugía programada (vs 7 días clopidogrel)",
      "Vigilar disnea: es frecuente y generalmente autolimitada (no suspender)",
      "Monitorizar signos de sangrado: hematomas, melena, hematuria",
      "Puede triturarse y mezclarse con agua para SNG",
      "Educación: no omitir dosis (riesgo de trombosis de stent)"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: biodisponibilidad 36%. No afectada por alimentos",
      "distribucion": "Unión proteica >99%",
      "metabolismo": "Hepático (CYP3A4/5). Metabolito activo (AR-C124910XX) equipotente",
      "excrecion": "Fecal 58%, renal 26%",
      "vidaMedia": "7 horas (metabolito activo 9h)",
      "inicioAccion": "30 minutos",
      "picoAccion": "1.5-3 horas",
      "duracionAccion": "12 horas (reversible, recuperación plaquetaria en 3-5 días)"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u02",
    "capituloId": "c02_06"
  },
  {
    "id": "prasugrel",
    "nombre": "Prasugrel",
    "nombreGenerico": "Clorhidrato de prasugrel",
    "nombresComerciales": ["Effient", "Prasugrel Gador"],
    "familia": "Antiagregantes plaquetarios",
    "clasificacion": "Inhibidor irreversible del receptor P2Y12 de ADP (tienopiridina de 3ra generación)",
    "mecanismoAccion": "Profármaco que requiere un solo paso de activación hepática (CYP3A4 y CYP2B6). Su metabolito activo se une irreversiblemente al receptor P2Y12 de ADP plaquetario, inhibiendo la agregación plaquetaria de forma más potente, rápida y consistente que clopidogrel. No presenta resistencia por polimorfismo CYP2C19.",
    "indicaciones": ["Síndrome coronario agudo con angioplastia planificada (con aspirina)", "Post-angioplastia con stent (doble antiagregación)", "Pacientes con resistencia a clopidogrel"],
    "contraindicaciones": ["Sangrado activo", "Antecedente de ACV/AIT", "Edad >75 años (relativa)", "Peso <60 kg (relativa)", "Insuficiencia hepática severa"],
    "efectosAdversos": ["Sangrado (mayor que clopidogrel)", "Hematomas", "Epistaxis", "Anemia", "Trombocitopenia", "Erupción cutánea"],
    "interacciones": ["AINE: aumentan riesgo de sangrado GI", "Warfarina: sangrado aditivo", "Opioides: pueden retrasar absorción (en contexto de SCA)"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Carga: 60 mg dosis única. Mantenimiento: 10 mg/día (con aspirina 75-100 mg/día). Peso <60 kg: considerar 5 mg/día"
    },
    "presentaciones": ["Comprimidos 5, 10 mg"],
    "embarazo": "B",
    "lactancia": "Datos insuficientes. No recomendado.",
    "cuidadosEnfermeria": [
      "CONTRAINDICADO si antecedente de ACV/AIT (exceso de sangrado intracraneal)",
      "Precaución en >75 años y <60 kg: evaluar riesgo-beneficio",
      "Suspender 7 días antes de cirugía programada",
      "Monitorizar signos de sangrado mayor",
      "Administrar con aspirina 75-100 mg/día",
      "No se afecta por polimorfismo CYP2C19 (ventaja sobre clopidogrel)"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: rápida. Biodisponibilidad >79%",
      "distribucion": "Metabolito activo: unión proteica 98%",
      "metabolismo": "Hepático: un solo paso de activación (CYP3A4, CYP2B6). No afectado por CYP2C19",
      "excrecion": "Renal 68%, fecal 27%",
      "vidaMedia": "7 horas (metabolito activo 30 min, pero unión irreversible)",
      "inicioAccion": "30 minutos",
      "picoAccion": "30 minutos",
      "duracionAccion": "5-10 días (vida plaquetaria, unión irreversible)"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u02",
    "capituloId": "c02_06"
  },
  {
    "id": "ivabradina",
    "nombre": "Ivabradina",
    "nombreGenerico": "Clorhidrato de ivabradina",
    "nombresComerciales": ["Procoralan", "Ivabradina Gador"],
    "familia": "Antianginosos",
    "clasificacion": "Inhibidor selectivo de la corriente If del nodo sinusal",
    "mecanismoAccion": "Inhibe selectivamente la corriente marcapaso If (funny current) en el nodo sinusal, que es la corriente catiónica mixta (Na/K) responsable de la despolarización diastólica lenta. Reduce la frecuencia cardíaca sin afectar la contractilidad, la conducción AV ni la presión arterial. Reduce la demanda miocárdica de oxígeno.",
    "indicaciones": ["Angina estable crónica (FC >70 lpm con intolerancia o contraindicación a betabloqueantes)", "Insuficiencia cardíaca crónica estable con FEVI ≤35% y FC ≥70 lpm (con tratamiento óptimo incluyendo betabloqueante o si contraindicado)"],
    "contraindicaciones": ["FC basal <70 lpm", "Hipotensión severa (<90/50 mmHg)", "Shock cardiogénico", "Bloqueo AV 3er grado o enfermedad del nodo sinusal", "Insuficiencia hepática severa", "QT largo", "Uso concomitante de inhibidores potentes CYP3A4"],
    "efectosAdversos": ["Fosfenos (fenómenos luminosos 15%)", "Bradicardia", "Cefalea", "Mareo", "Fibrilación auricular", "Visión borrosa", "Bloqueo AV 1er grado"],
    "interacciones": ["Inhibidores potentes CYP3A4 (ketoconazol, diltiazem, verapamilo): CONTRAINDICADO", "Betabloqueantes: bradicardia aditiva (monitorizar)", "QT prolongadores: evitar combinación", "Jugo de pomelo: aumenta niveles 2x"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Inicio: 5 mg/12h con las comidas. Ajustar cada 2 semanas según FC. Objetivo: FC 50-60 lpm. Máx: 7.5 mg/12h. Si FC <50: reducir a 2.5 mg/12h",
      "geriatrico": "Inicio 2.5 mg/12h"
    },
    "presentaciones": ["Comprimidos 5, 7.5 mg"],
    "embarazo": "X",
    "lactancia": "Se excreta en leche en animales. Contraindicada.",
    "cuidadosEnfermeria": [
      "Administrar con las comidas (mejora biodisponibilidad)",
      "Controlar FC antes de cada ajuste de dosis. Objetivo: 50-60 lpm",
      "Si FC <50 lpm: reducir dosis. Si persiste: suspender",
      "Informar sobre fosfenos: transitorios, no peligrosos, disminuyen con el tiempo",
      "Evitar jugo de pomelo durante el tratamiento",
      "No combinar con verapamilo ni diltiazem"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: rápida. Biodisponibilidad 40% (primer paso)",
      "distribucion": "Unión proteica 70%",
      "metabolismo": "Hepático extenso (CYP3A4). Metabolito activo N-demetilado",
      "excrecion": "Renal y fecal 50/50",
      "vidaMedia": "6 horas (efectiva 11h)",
      "inicioAccion": "1 hora",
      "picoAccion": "1-2 horas",
      "duracionAccion": "12 horas"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u02",
    "capituloId": "c02_06"
  },
  {
    "id": "ranolazina",
    "nombre": "Ranolazina",
    "nombreGenerico": "Ranolazina",
    "nombresComerciales": ["Ranexa"],
    "familia": "Antianginosos",
    "clasificacion": "Inhibidor de la corriente tardía de sodio",
    "mecanismoAccion": "Inhibe la corriente tardía de sodio (INaL) que está aumentada en el miocardio isquémico. Al reducir la entrada excesiva de sodio, disminuye la sobrecarga intracelular de calcio (vía intercambiador Na/Ca), mejorando la relajación diastólica y reduciendo la tensión parietal. No afecta FC ni PA significativamente.",
    "indicaciones": ["Angina crónica estable (terapia adicional cuando betabloqueantes, calcioantagonistas o nitratos son insuficientes)", "Angina refractaria"],
    "contraindicaciones": ["Insuficiencia hepática severa (Child-Pugh C)", "QT prolongado", "Uso concomitante de inhibidores potentes CYP3A4", "Insuficiencia renal severa"],
    "efectosAdversos": ["Mareo", "Náuseas", "Constipación", "Cefalea", "Prolongación leve del QTc", "Astenia"],
    "interacciones": ["Inhibidores potentes CYP3A4 (ketoconazol): CONTRAINDICADO", "Diltiazem, verapamilo: aumentan niveles (reducir dosis de ranolazina)", "Digoxina: aumenta niveles 1.5x", "Simvastatina: aumenta niveles (limitar a 20 mg)", "Metformina: aumenta niveles"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Inicio: 375-500 mg/12h. Titular a 500-750 mg/12h. Máx: 1000 mg/12h"
    },
    "presentaciones": ["Comprimidos de liberación prolongada 375, 500, 750 mg"],
    "embarazo": "C",
    "lactancia": "Datos insuficientes. No recomendado.",
    "cuidadosEnfermeria": [
      "Los comprimidos de LP no deben triturarse ni masticarse",
      "Puede administrarse con o sin alimentos",
      "ECG basal: medir QTc antes de iniciar",
      "Monitorizar QTc si se combina con fármacos que prolongan QT",
      "Advertir sobre mareo: precaución al conducir",
      "Limitar simvastatina a 20 mg/día si se combina"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: variable. Biodisponibilidad 35-50%",
      "distribucion": "Unión proteica 62%",
      "metabolismo": "Hepático extenso (CYP3A4, CYP2D6)",
      "excrecion": "Renal 73%, fecal 25%",
      "vidaMedia": "7 horas",
      "inicioAccion": "2 horas",
      "picoAccion": "2-5 horas",
      "duracionAccion": "12 horas"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u02",
    "capituloId": "c02_06"
  },
  {
    "id": "trimetazidina",
    "nombre": "Trimetazidina",
    "nombreGenerico": "Diclorhidrato de trimetazidina",
    "nombresComerciales": ["Vastarel MR", "Trimetazidina Gador", "Metazidina"],
    "familia": "Antianginosos",
    "clasificacion": "Agente metabólico antiisquémico - Inhibidor de la 3-KAT",
    "mecanismoAccion": "Inhibe la enzima 3-cetoacil-CoA tiolasa (3-KAT) mitocondrial, desviando el metabolismo cardíaco de la beta-oxidación de ácidos grasos hacia la oxidación de glucosa, que es más eficiente en consumo de oxígeno. Genera más ATP por molécula de O2 consumida, mejorando la eficiencia energética miocárdica sin efecto hemodinámico.",
    "indicaciones": ["Angina estable crónica (terapia complementaria)", "Cardiopatía isquémica (optimización metabólica)", "Vértigo de origen vascular (uso off-label en algunos países)"],
    "contraindicaciones": ["Enfermedad de Parkinson o síntomas parkinsonianos", "Temblor", "Síndrome de piernas inquietas", "Insuficiencia renal severa (CrCl <30)"],
    "efectosAdversos": ["Molestias gastrointestinales", "Náuseas", "Mareo", "Cefalea", "Parkinsonismo (raro pero grave)", "Temblor", "Alteraciones de la marcha"],
    "interacciones": ["No tiene interacciones farmacológicas significativas conocidas", "Compatible con todos los fármacos cardiovasculares habituales"],
    "viaAdministracion": ["oral"],
    "dosis": {
      "adulto": "Liberación modificada: 35 mg/12h con las comidas",
      "ajusteRenal": "CrCl 15-30: 35 mg/día (1 dosis). CrCl <15: contraindicado"
    },
    "presentaciones": ["Comprimidos de liberación modificada 35 mg"],
    "embarazo": "N/A",
    "lactancia": "Datos insuficientes. No recomendado.",
    "cuidadosEnfermeria": [
      "Administrar con las comidas",
      "Los comprimidos MR no deben triturarse",
      "Vigilar aparición de temblor o rigidez (parkinsonismo): suspender inmediatamente",
      "Preguntar activamente por trastornos de la marcha en cada consulta",
      "No es fármaco de emergencia: beneficio progresivo en semanas",
      "Ajustar dosis en insuficiencia renal moderada"
    ],
    "farmacocinetica": {
      "absorcion": "Oral: biodisponibilidad 90%",
      "distribucion": "Unión proteica 16%",
      "metabolismo": "Hepático",
      "excrecion": "Renal 60% inalterada",
      "vidaMedia": "6 horas",
      "inicioAccion": "Efecto clínico progresivo (semanas)",
      "picoAccion": "2-5 horas",
      "duracionAccion": "12 horas"
    },
    "almacenamiento": "Temperatura ambiente.",
    "unidadId": "u02",
    "capituloId": "c02_06"
  },
  {
    "id": "milrinona",
    "nombre": "Milrinona",
    "nombreGenerico": "Lactato de milrinona",
    "nombresComerciales": ["Corotrope", "Milrinona Northia"],
    "familia": "Inotrópicos",
    "clasificacion": "Inhibidor de la fosfodiesterasa III (inodilatador)",
    "mecanismoAccion": "Inhibe la fosfodiesterasa III en miocardio y músculo liso vascular, aumentando el AMPc intracelular. En el miocardio: aumenta la contractilidad (inotrópico positivo) y mejora la relajación (lusitrópico positivo). En vasos: produce vasodilatación arterial y venosa. No actúa sobre receptores adrenérgicos (útil en pacientes con betabloqueantes).",
    "indicaciones": ["Insuficiencia cardíaca aguda descompensada (soporte a corto plazo)", "Shock cardiogénico", "Bajo gasto post-cirugía cardíaca", "Puente a trasplante cardíaco", "IC refractaria a dobutamina (down-regulation de receptores beta)"],
    "contraindicaciones": ["Estenosis aórtica o subaórtica severa", "Miocardiopatía hipertrófica obstructiva", "Hipotensión severa", "IAM agudo (fase hiperaguda)"],
    "efectosAdversos": ["Hipotensión (más frecuente)", "Arritmias ventriculares", "Taquicardia supraventricular", "Cefalea", "Trombocitopenia", "Hipopotasemia"],
    "interacciones": ["Digoxina: efecto inotrópico aditivo", "Diuréticos: hipotensión y depleción de volumen", "Vasodilatadores: hipotensión aditiva"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "Carga: 50 mcg/kg IV en 10 min (omitir si hipotensión). Mantenimiento: 0.375-0.75 mcg/kg/min en infusión continua",
      "ajusteRenal": "CrCl 5-40: reducir mantenimiento 50-75%"
    },
    "presentaciones": ["Ampolla 1 mg/mL 10 mL", "Ampolla 1 mg/mL 20 mL"],
    "embarazo": "C",
    "lactancia": "Datos insuficientes. Uso solo en emergencia.",
    "cuidadosEnfermeria": [
      "SOLO en Unidad de Cuidados Intensivos con monitorización hemodinámica",
      "Bomba de infusión obligatoria. Vía IV exclusiva",
      "Monitorizar PA continua: suspender carga si PAS <90 mmHg",
      "Controlar plaquetas diariamente (riesgo de trombocitopenia)",
      "Monitorizar potasio (corregir hipopotasemia antes de iniciar)",
      "Vigilar arritmias: monitoreo ECG continuo",
      "Uso a corto plazo (48-72h). Uso prolongado aumenta mortalidad"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata",
      "distribucion": "Unión proteica 70%",
      "metabolismo": "Hepático 12% (glucuronización)",
      "excrecion": "Renal 83% (60% inalterada)",
      "vidaMedia": "2.3 horas (aumenta a 3h en ICC)",
      "inicioAccion": "5-15 minutos",
      "picoAccion": "10 minutos post-carga",
      "duracionAccion": "3-6 horas post-suspensión"
    },
    "almacenamiento": "Temperatura ambiente. Proteger de la luz. Diluido: estable 72h.",
    "unidadId": "u02",
    "capituloId": "c02_07"
  },
  {
    "id": "levosimendan",
    "nombre": "Levosimendán",
    "nombreGenerico": "Levosimendán",
    "nombresComerciales": ["Simdax"],
    "familia": "Inotrópicos",
    "clasificacion": "Sensibilizador al calcio / Apertor de canales de potasio ATP-dependientes",
    "mecanismoAccion": "Mecanismo triple: 1) Se une a troponina C cardíaca estabilizando la conformación unida a calcio, aumentando la sensibilidad de las miofibrillas al calcio sin aumentar el calcio intracelular (inotrópico sin aumento de consumo de O2). 2) Abre canales de K-ATP en músculo liso vascular produciendo vasodilatación. 3) Abre canales de K-ATP mitocondriales (efecto cardioprotector).",
    "indicaciones": ["Insuficiencia cardíaca aguda descompensada con bajo gasto", "Shock cardiogénico (especialmente si usa betabloqueantes)", "IC aguda post-IAM", "Descompensación de IC crónica avanzada", "Bajo gasto post-cirugía cardíaca"],
    "contraindicaciones": ["Hipotensión severa (PAS <85 mmHg)", "Taquicardia severa >120 lpm", "Obstrucción mecánica al llenado/vaciado ventricular", "Insuficiencia renal severa (CrCl <30)", "Insuficiencia hepática severa"],
    "efectosAdversos": ["Hipotensión", "Cefalea", "Taquicardia", "Hipopotasemia", "Fibrilación auricular", "Extrasístoles ventriculares", "Náuseas"],
    "interacciones": ["Vasodilatadores: hipotensión aditiva", "Inotrópicos: efectos aditivos", "Diuréticos: hipotensión y depleción de volumen"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "Carga opcional: 6-12 mcg/kg IV en 10 min (omitir si PAS <90). Mantenimiento: 0.05-0.2 mcg/kg/min durante 24h. NO exceder 24h de infusión (metabolito activo tiene vida media 75-80h)"
    },
    "presentaciones": ["Frasco ampolla 2.5 mg/5 mL"],
    "embarazo": "C",
    "lactancia": "Datos insuficientes. Uso solo en emergencia.",
    "cuidadosEnfermeria": [
      "SOLO en UCI con monitorización hemodinámica invasiva",
      "Diluir en D5% (NO en SF). Concentración: 0.025 mg/mL",
      "Duración de infusión: 24 horas (efecto persiste 7-9 días por metabolito activo)",
      "Monitorizar PA continua: si PAS <90, reducir velocidad o suspender carga",
      "Controlar potasio antes y durante infusión",
      "Compatible con uso simultáneo de betabloqueantes (ventaja única)",
      "Vigilar arritmias: monitoreo ECG continuo",
      "No es necesario repetir antes de 7-10 días (efecto prolongado)"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata",
      "distribucion": "Unión proteica 97-98%",
      "metabolismo": "Hepático: conjugación y reducción a OR-1896 (metabolito activo con t1/2 75-80h)",
      "excrecion": "Renal 54%, fecal 44%",
      "vidaMedia": "1 hora (fármaco madre). Metabolito activo: 75-80 horas",
      "inicioAccion": "5 minutos",
      "picoAccion": "Durante la infusión",
      "duracionAccion": "7-9 días (efecto del metabolito activo OR-1896)"
    },
    "almacenamiento": "Refrigerado 2-8°C. Diluido: estable 24h a temperatura ambiente.",
    "unidadId": "u02",
    "capituloId": "c02_07"
  },
  {
    "id": "fenoldopam",
    "nombre": "Fenoldopam",
    "nombreGenerico": "Mesilato de fenoldopam",
    "nombresComerciales": ["Corlopam"],
    "familia": "Vasopresores y vasodilatadores",
    "clasificacion": "Agonista selectivo del receptor dopaminérgico D1",
    "mecanismoAccion": "Agonista selectivo de receptores D1 en vasos periféricos (renales, mesentéricos, coronarios). Produce vasodilatación con reducción de la presión arterial y aumento del flujo sanguíneo renal y la diuresis/natriuresis. Es 10 veces más potente que la dopamina en receptores D1. No tiene efecto sobre receptores D2, alfa o beta adrenérgicos.",
    "indicaciones": ["Crisis hipertensiva hospitalaria (alternativa a nitroprusiato)", "Emergencia hipertensiva con compromiso renal", "Hipertensión severa perioperatoria"],
    "contraindicaciones": ["Hipersensibilidad al fármaco o sulfitos", "Glaucoma o hipertensión intraocular"],
    "efectosAdversos": ["Taquicardia refleja", "Cefalea", "Rubor facial", "Hipotensión", "Náuseas", "Aumento de presión intraocular", "Hipopotasemia"],
    "interacciones": ["Betabloqueantes: pueden atenuar taquicardia refleja (uso concomitante aceptable)", "No tiene interacción con tiocianato (ventaja sobre nitroprusiato)"],
    "viaAdministracion": ["IV"],
    "dosis": {
      "adulto": "Inicio: 0.1 mcg/kg/min en infusión continua. Titular cada 15 min en incrementos de 0.05-0.1 mcg/kg/min. Máx: 1.6 mcg/kg/min. Uso máximo: 48h",
      "pediatrico": "0.2 mcg/kg/min, titular según respuesta"
    },
    "presentaciones": ["Ampolla 10 mg/mL 1 mL"],
    "embarazo": "B",
    "lactancia": "Datos insuficientes. Uso solo en emergencia.",
    "cuidadosEnfermeria": [
      "Infusión IV continua en bomba. Monitorización PA continua",
      "Titular cada 15 min según presión arterial objetivo",
      "Ventaja sobre nitroprusiato: no toxicidad por cianuro, nefroprotector",
      "Monitorizar potasio (produce caliuresis)",
      "Precaución en glaucoma: aumenta presión intraocular",
      "No requiere protección de la luz (ventaja sobre nitroprusiato)",
      "Uso máximo 48h (no datos de seguridad a largo plazo)"
    ],
    "farmacocinetica": {
      "absorcion": "IV: inmediata",
      "distribucion": "Estado estable en 20 min de infusión",
      "metabolismo": "Hepático: conjugación (glucuronización, sulfatación, metilación)",
      "excrecion": "Renal 90%",
      "vidaMedia": "5 minutos",
      "inicioAccion": "5 minutos",
      "picoAccion": "15 minutos",
      "duracionAccion": "30-60 minutos post-suspensión"
    },
    "almacenamiento": "Temperatura ambiente. Diluido: estable 24h.",
    "unidadId": "u02",
    "capituloId": "c02_07"
  }
]

# New chapters to create for u02
NEW_CHAPTERS = [
    {
        "id": "c02_06",
        "nombre": "Antiagregantes y Antianginosos",
        "unidadId": "u02",
        "drugIds": ["ticagrelor", "prasugrel", "ivabradina", "ranolazina", "trimetazidina"]
    },
    {
        "id": "c02_07",
        "nombre": "Inotrópicos y Vasopresores",
        "unidadId": "u02",
        "drugIds": ["milrinona", "levosimendan", "fenoldopam"]
    }
]

# Drugs to add to EXISTING chapters
EXISTING_CHAPTER_ADDITIONS = {
    "c02_02": ["lidocaina_antiarritmico", "flecainida", "propafenona", "sotalol"],
    "c02_03": ["hidralazina", "minoxidil_oral", "iloprost"],
    "c02_04": ["indapamida", "clortalidona", "acetazolamida", "tolvaptan", "bumetanida", "amilorida"],
    "c02_05": ["rosuvastatina", "ezetimibe", "fenofibrato", "gemfibrozil", "colestiramina"],
}

# Pathology links
PATHOLOGY_LINKS = {
    "pat_hta": ["hidralazina", "minoxidil_oral", "indapamida", "clortalidona", "fenoldopam", "ivabradina"],
    "pat_icc": ["milrinona", "levosimendan", "bumetanida", "ivabradina", "tolvaptan", "amilorida"],
    "pat_iam": ["ticagrelor", "prasugrel", "lidocaina_antiarritmico", "ranolazina", "trimetazidina"],
    "pat_fa": ["flecainida", "propafenona", "sotalol"],
    "pat_tvp": ["ticagrelor", "prasugrel"],
    "pat_crisis_hipertensiva": ["fenoldopam", "hidralazina"],
    "pat_edema_pulmonar": ["bumetanida", "milrinona", "levosimendan"],
}

def main():
    print("=== Generating u02 drugs ===")
    added = add_drugs_to_file(NEW_DRUGS)

    cats = load_categories()
    for ch in NEW_CHAPTERS:
        add_chapter(cats, "u02", ch)
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
