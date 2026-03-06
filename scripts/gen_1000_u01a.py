#!/usr/bin/env python3
"""Add 50 new drugs for U01 Sistema Nervioso (part A)."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from drug_helper import add_drugs_to_file, load_categories, save_categories, add_chapter, add_drug_to_chapter
from drug_templates import make_drug as M

DRUGS = [
# ── c01_02 Opioides (+5) ──
M("opioide","oximorfona","Oximorfona","Oximorfona",["Opana","Numorphan"],"Agonista opioide mu potente",
  "Agonista puro de receptores mu con potencia 3-5x mayor que morfina",
  ["Dolor severo agudo","Dolor crónico severo","Dolor oncológico"],["IV","IM","SC","rectal"],
  {"adulto":"1-1.5 mg IV c/4-6h o 5-10 mg rectal c/4-6h","pediatrico":"No recomendado <18 años"},
  ["Amp 1 mg/mL","Supositorios 5 mg"],"Evitar durante lactancia","u01","c01_02",
  pp={"reconstitucion":"No requiere","dilucion":"Puede diluir en SF","velocidadAdministracion":"IV lenta en 2-3 min","estabilidad":"24h a TA"}),

M("opioide","dihidrocodeina","Dihidrocodeína","Dihidrocodeína",["DHC Continus","Paracodin"],"Agonista opioide débil",
  "Agonista opioide semisintético derivado de codeína, 1.5-2x más potente que codeína",
  ["Dolor moderado","Tos severa refractaria"],["oral"],
  {"adulto":"60-120 mg c/12h liberación prolongada. Máx 240 mg/día","pediatrico":">12 años: 30 mg c/6h"},
  ["Comp LP 60, 90, 120 mg","Jarabe 10 mg/5mL"],"Evitar durante lactancia","u01","c01_02"),

M("opioide","pentazocina","Pentazocina","Pentazocina",["Talwin","Sosegon"],"Agonista-antagonista opioide mixto",
  "Agonista kappa y antagonista parcial mu. Efecto techo para depresión respiratoria",
  ["Dolor moderado a severo","Analgesia preoperatoria"],["oral","IV","IM","SC"],
  {"adulto":"50-100 mg oral c/3-4h (máx 600 mg/día) o 30 mg IV/IM c/3-4h"},
  ["Comp 50 mg","Amp 30 mg/mL"],"Evitar durante lactancia","u01","c01_02"),

M("opioide","levorfanol","Levorfanol","Levorfanol",["Levo-Dromoran"],"Agonista opioide mu de larga duración",
  "Agonista opioide sintético con acción en receptores mu, delta, kappa y antagonista NMDA",
  ["Dolor severo crónico","Dolor oncológico refractario"],["oral"],
  {"adulto":"2 mg c/6-8h. Ajustar según respuesta. Acumulación con dosis repetidas"},
  ["Comp 2 mg"],"Evitar durante lactancia","u01","c01_02"),

M("opioide","butorfanol","Butorfanol","Butorfanol",["Stadol","Monarc"],"Agonista-antagonista opioide nasal",
  "Agonista kappa y antagonista parcial mu. Vía nasal para absorción rápida",
  ["Migraña severa","Dolor agudo moderado-severo","Analgesia obstétrica"],["nasal","IV","IM"],
  {"adulto":"1 spray (1 mg) nasal, repetir en 60-90 min. IV: 1-2 mg c/3-4h"},
  ["Spray nasal 10 mg/mL","Amp 1 mg/mL, 2 mg/mL"],"Precaución, se excreta en leche","u01","c01_02"),

# ── c01_03 Anestésicos (+8) ──
M("anestesico_local","levobupivacaina","Levobupivacaína","Levobupivacaína",["Chirocaine"],"Anestésico local enantiómero S",
  "Enantiómero S de bupivacaína. Bloquea canales de sodio. Menor cardiotoxicidad que bupivacaína racémica",
  ["Anestesia epidural","Bloqueo nervioso periférico","Infiltración local","Analgesia postoperatoria"],["epidural","SC","intradermica"],
  {"adulto":"Epidural: 50-150 mg (0.5-0.75%). Bloqueo: según sitio y procedimiento"},
  ["Amp 2.5 mg/mL, 5 mg/mL, 7.5 mg/mL"],"Compatible en dosis única","u01","c01_03"),

M("anestesico_local","articaina","Articaína","Articaína",["Septocaine","Ultracain"],"Anestésico local tipo amida",
  "Anestésico local con grupo éster que permite metabolismo plasmático rápido por esterasas. Alta difusión tisular",
  ["Anestesia dental","Infiltración local","Bloqueo nervioso menor"],["SC","intradermica"],
  {"adulto":"Dental: 1-2 cartuchos (1.7 mL al 4%) con epinefrina. Máx 7 mg/kg"},
  ["Cartucho dental 4% con epinefrina 1:100.000","Amp 4%"],"Compatible en dosis única","u01","c01_03"),

M("anestesico_local","prilocaina","Prilocaína","Prilocaína",["Citanest","EMLA (con lidocaína)"],"Anestésico local tipo amida",
  "Bloquea canales de sodio. Metabolito o-toluidina puede causar metahemoglobinemia en dosis altas",
  ["Anestesia dental","Bloqueo nervioso","Anestesia tópica (EMLA)","Anestesia regional IV (Bier)"],["SC","topica","IV","intradermica"],
  {"adulto":"Infiltración: hasta 6 mg/kg sin epinefrina, 8 mg/kg con epinefrina"},
  ["Amp 1%, 2%, 3%","Crema EMLA (lidocaína 2.5% + prilocaína 2.5%)"],"Compatible en dosis única","u01","c01_03",
  ea=["Metahemoglobinemia (dosis >600 mg)","Mareo","Parestesias prolongadas","Bradicardia"]),

M("anestesico_local","cloroprocaina","Cloroprocaína","Cloroprocaína",["Nesacaine"],"Anestésico local tipo éster",
  "Éster de acción ultracorta. Hidrolizado rápidamente por pseudocolinesterasa plasmática",
  ["Anestesia epidural de corta duración","Infiltración local","Bloqueo nervioso"],["epidural","SC","intradermica"],
  {"adulto":"Epidural: 15-25 mL al 2-3%. Duración: 30-60 min"},
  ["Vial 1%, 2%, 3%"],"Compatible por rápido metabolismo","u01","c01_03"),

M("anestesico_local","mepivacaina","Mepivacaína","Mepivacaína",["Carbocaine","Scandicaine"],"Anestésico local tipo amida",
  "Similar a lidocaína pero con menor vasodilatación intrínseca. No requiere vasoconstrictor en muchos casos",
  ["Anestesia dental","Infiltración local","Bloqueo nervioso periférico","Anestesia epidural"],["SC","epidural","intradermica"],
  {"adulto":"Infiltración: hasta 4.4 mg/kg sin epinefrina. Dental: 1-2 cartuchos al 3%"},
  ["Cartucho dental 3%","Amp 1%, 1.5%, 2%"],"Compatible en dosis única","u01","c01_03"),

M("anestesico_local","tetracaina","Tetracaína","Tetracaína",["Pontocaine","Ametop"],"Anestésico local tipo éster potente",
  "Éster de alta potencia y larga duración. 10x más potente que procaína. Uso principal en anestesia espinal y tópica",
  ["Anestesia espinal","Anestesia tópica oftálmica","Anestesia tópica de mucosas"],["intratecal","topica","oftalmica"],
  {"adulto":"Espinal: 5-20 mg según nivel deseado. Oftálmica: 1-2 gotas al 0.5%"},
  ["Amp 1% para espinal","Sol oftálmica 0.5%","Gel tópico 4%"],"Compatible en dosis tópica","u01","c01_03"),

M("anestesico_local","benzocaina","Benzocaína","Benzocaína",["Hurricaine","Orajel"],"Anestésico local tipo éster tópico",
  "Éster de uso exclusivamente tópico. Bloquea canales de sodio en terminaciones nerviosas superficiales",
  ["Dolor orofaríngeo","Dolor dental localizado","Procedimientos endoscópicos (spray)","Dolor de mucosas"],["topica"],
  {"adulto":"Aplicar en zona afectada c/4-6h según necesidad. No exceder 4 aplicaciones/día"},
  ["Gel oral 10%, 20%","Spray 14%, 20%","Pastillas 5-15 mg"],"Compatible en uso tópico","u01","c01_03",
  ea=["Metahemoglobinemia (riesgo principal)","Reacción alérgica local","Sabor desagradable"],
  ci=["Metahemoglobinemia","Hipersensibilidad a ésteres","Menores de 2 años"]),

M("anestesico_local","procaina","Procaína","Procaína",["Novocain"],"Anestésico local tipo éster clásico",
  "Primer anestésico local sintético tipo éster. Metabolizado por pseudocolinesterasa. Baja potencia, corta duración",
  ["Infiltración local","Bloqueo nervioso menor","Terapia neural"],["SC","IM","intradermica"],
  {"adulto":"Infiltración: 350-600 mg al 0.25-0.5%. Máx 14 mg/kg con epinefrina"},
  ["Amp 1%, 2%","Vial 10%"],"Compatible por rápido metabolismo","u01","c01_03"),

# ── c01_04 Anticonvulsivantes (+6) ──
M("anticonvulsivante","eslicarbazepina","Eslicarbazepina","Acetato de eslicarbazepina",["Zebinix","Aptiom"],"Bloqueador de canales de sodio (3ª gen)",
  "Profármaco que se convierte en eslicarbazepina. Bloquea canales de sodio voltaje-dependientes en estado inactivo",
  ["Epilepsia focal con/sin generalización secundaria (adyuvante y monoterapia)"],["oral"],
  {"adulto":"Inicio 400 mg/día, incrementar a 800-1200 mg/día en dosis única","ajusteRenal":"400-600 mg/día si ClCr 30-60 mL/min"},
  ["Comp 200, 400, 600, 800 mg"],"Evitar, se excreta en leche","u01","c01_04"),

M("anticonvulsivante","cenobamato","Cenobamato","Cenobamato",["Xcopri"],"Modulador de canales de sodio y GABA-A",
  "Doble mecanismo: bloquea canales de sodio voltaje-dependientes y modula positivamente receptores GABA-A",
  ["Epilepsia focal refractaria (adyuvante)"],["oral"],
  {"adulto":"Inicio 12.5 mg/día, titular lentamente cada 2 sem hasta 200-400 mg/día"},
  ["Comp 12.5, 25, 50, 100, 150, 200 mg"],"No recomendado","u01","c01_04",
  ea=["Somnolencia","Mareo","Fatiga","Diplopia","DRESS (titulación rápida)"],
  ce=["Titulación MUY lenta obligatoria (riesgo DRESS)","Monitorizar somnolencia","Vigilar reacciones cutáneas","Ajustar otros antiepilépticos al añadir"]),

M("anticonvulsivante","felbamato","Felbamato","Felbamato",["Felbatol"],"Anticonvulsivante de amplio espectro",
  "Bloquea receptores NMDA y potencia efecto GABA. Reservado para epilepsia refractaria por toxicidad",
  ["Síndrome de Lennox-Gastaut","Epilepsia focal refractaria a otros tratamientos"],["oral"],
  {"adulto":"Inicio 1200 mg/día en 3-4 tomas, incrementar hasta 2400-3600 mg/día","pediatrico":">2 años: 15-45 mg/kg/día"},
  ["Comp 400, 600 mg","Suspensión 600 mg/5mL"],"Contraindicado","u01","c01_04",
  ea=["⚠️ Anemia aplásica (riesgo 1:5000)","⚠️ Hepatotoxicidad fulminante","Insomnio","Anorexia","Náuseas","Cefalea"],
  ci=["Hipersensibilidad","Antecedente de discrasias sanguíneas","Hepatopatía"],
  ce=["Hemograma y función hepática cada 2 semanas","Consentimiento informado obligatorio","Reservar para epilepsia refractaria","Vigilar signos de aplasia medular"]),

M("anticonvulsivante","tiagabina","Tiagabina","Tiagabina",["Gabitril"],"Inhibidor de recaptación de GABA",
  "Inhibe selectivamente el transportador GAT-1, aumentando la concentración sináptica de GABA",
  ["Epilepsia focal como terapia adyuvante"],["oral"],
  {"adulto":"Inicio 4 mg/día, incrementar 4-8 mg/sem hasta 32-56 mg/día en 2-4 tomas"},
  ["Comp 2, 4, 12, 16 mg"],"No recomendado","u01","c01_04"),

M("anticonvulsivante","etosuximida","Etosuximida","Etosuximida",["Zarontin"],"Bloqueador de corrientes T de calcio",
  "Bloquea corrientes de calcio tipo T en neuronas talámicas, suprimiendo descargas de punta-onda 3 Hz",
  ["Epilepsia de ausencias típicas (primera línea)","Crisis de ausencia infantil"],["oral"],
  {"adulto":"500 mg/día inicio, incrementar 250 mg/sem. Mantener 750-1500 mg/día","pediatrico":"3-6 años: 250 mg/día inicio. >6 años: igual que adulto"},
  ["Cáps 250 mg","Jarabe 250 mg/5mL"],"Compatible con precaución","u01","c01_04",
  ea=["Náuseas y vómitos (frecuente al inicio)","Somnolencia","Cefalea","Hipo","Leucopenia","Lupus inducido (raro)"],
  ce=["Fármaco de elección en ausencias puras","Monitorizar niveles plasmáticos (40-100 mcg/mL)","Hemograma periódico","Tomar con alimentos para reducir náuseas"]),

M("anticonvulsivante","fenfluramina_antiepi","Fenfluramina (antiepiléptico)","Fenfluramina",["Fintepla"],"Modulador serotoninérgico anticonvulsivante",
  "Libera serotonina y actúa como agonista de receptores sigma-1. Reformulado como antiepiléptico a dosis bajas",
  ["Síndrome de Dravet (adyuvante)","Síndrome de Lennox-Gastaut"],["oral"],
  {"adulto":"No aprobado en adultos","pediatrico":"≥2 años: 0.1 mg/kg c/12h, titular hasta 0.35 mg/kg c/12h. Máx 26 mg/día"},
  ["Sol oral 2.2 mg/mL"],"Contraindicado","u01","c01_04",
  ci=["Valvulopatía cardíaca","Hipertensión pulmonar","Uso de IMAO","Hipersensibilidad"],
  ea=["Disminución del apetito","Somnolencia","Diarrea","Riesgo valvulopatía cardíaca (ecocardiograma obligatorio)"],
  ce=["Ecocardiograma antes de iniciar y c/6 meses","Programa REMS obligatorio","Solo para Dravet/LGS","Monitorizar peso en pediatría"]),

# ── c01_05 Antiparkinsonianos (+6) ──
M("antiparkinsoniano","opicapona","Opicapona","Opicapona",["Ongentys"],"Inhibidor COMT de tercera generación",
  "Inhibidor potente y selectivo de COMT periférica, una sola toma diaria. Prolonga efecto de levodopa",
  ["Parkinson con fluctuaciones de fin de dosis (adyuvante a levodopa)"],["oral"],
  {"adulto":"50 mg una vez al día, al acostarse. Tomar >1h antes o después de levodopa"},
  ["Cáps 50 mg"],"Evitar durante lactancia","u01","c01_05"),

M("antiparkinsoniano","istradefilina","Istradefilina","Istradefilina",["Nourianz"],"Antagonista de receptores de adenosina A2A",
  "Bloquea receptores A2A en ganglios basales, modulando vía indirecta estriatopálida. Mecanismo no dopaminérgico",
  ["Parkinson con episodios OFF (adyuvante a levodopa)"],["oral"],
  {"adulto":"20 mg/día, puede aumentar a 40 mg/día"},
  ["Comp 20, 40 mg"],"No recomendado","u01","c01_05"),

M("antiparkinsoniano","tolcapona","Tolcapona","Tolcapona",["Tasmar"],"Inhibidor COMT central y periférico",
  "Inhibe COMT tanto periférica como central. Más potente que entacapona pero con riesgo hepatotóxico",
  ["Parkinson con fluctuaciones refractarias a entacapona"],["oral"],
  {"adulto":"100 mg c/8h. Máx 200 mg c/8h. Siempre con levodopa"},
  ["Comp 100, 200 mg"],"Contraindicado","u01","c01_05",
  ea=["⚠️ Hepatotoxicidad fulminante (casos fatales)","Discinesias","Náuseas","Diarrea","Coloración naranja de orina"],
  ce=["Función hepática antes de iniciar y c/2 sem x 12 meses","Consentimiento informado por hepatotoxicidad","Solo si falla entacapona","Suspender si ALT >2x LSN"]),

M("antiparkinsoniano","trihexifenidilo","Trihexifenidilo","Trihexifenidilo",["Artane"],"Anticolinérgico antiparkinsoniano",
  "Bloquea receptores muscarínicos centrales, reduciendo hiperactividad colinérgica en ganglios basales",
  ["Parkinson (temblor predominante)","Síntomas extrapiramidales por antipsicóticos","Distonía aguda"],["oral"],
  {"adulto":"1 mg/día inicio, incrementar 2 mg c/3-5 días hasta 6-10 mg/día en 3 tomas","geriatrico":"Mayor sensibilidad, usar dosis menores"},
  ["Comp 2, 5 mg","Elixir 2 mg/5mL"],"Evitar durante lactancia","u01","c01_05",
  ci=["Glaucoma de ángulo cerrado","Retención urinaria","Obstrucción GI","Demencia"],
  ea=["Boca seca","Visión borrosa","Estreñimiento","Retención urinaria","Confusión (ancianos)","Taquicardia","Alucinaciones"],
  ce=["Contraindicado en demencia por Lewy","Vigilar retención urinaria","Hidratación adecuada por boca seca","Evitar en >65 años si posible"]),

M("antiparkinsoniano","carbidopa_levodopa_ec","Carbidopa/Levodopa EC","Carbidopa + Levodopa enteral",["Duodopa"],"Gel intestinal de levodopa/carbidopa",
  "Gel de infusión intestinal continua vía PEG-J. Absorción constante evita fluctuaciones plasmáticas",
  ["Parkinson avanzado con fluctuaciones severas refractarias a tratamiento oral"],["oral"],
  {"adulto":"Infusión continua 20-200 mg/h levodopa vía PEG-J. Titular individualmente"},
  ["Casetes gel intestinal 2000 mg levodopa/500 mg carbidopa por 100 mL"],"No recomendado","u01","c01_05",
  ea=["Complicaciones del estoma (infección, desplazamiento)","Discinesias","Náuseas","Neuropatía periférica (déficit B12)"],
  ce=["Cuidados de PEG-J: vigilar sitio de inserción","Monitorizar vitamina B12 y ácido fólico","Titular según respuesta motora","Paciente requiere entrenamiento en manejo de bomba"]),

M("antiparkinsoniano","prociclidina","Prociclidina","Prociclidina",["Kemadrin"],"Anticolinérgico antiparkinsoniano",
  "Antimuscarínico que reduce temblor y rigidez parkinsoniana. Menos potente que trihexifenidilo",
  ["Parkinson leve (temblor)","Efectos extrapiramidales por antipsicóticos"],["oral","IM"],
  {"adulto":"2.5 mg c/8h, incrementar gradualmente hasta 20-30 mg/día"},
  ["Comp 5 mg","Amp 5 mg/mL"],"Evitar durante lactancia","u01","c01_05"),

# ── c01_06 Antipsicóticos (+8) ──
M("antipsicotico","sulpirida","Sulpirida","Sulpirida",["Dogmatil","Modal"],"Antipsicótico atípico (benzamida)",
  "Antagonista selectivo D2/D3. A dosis bajas bloquea autorreceptores presinápticos (efecto activador)",
  ["Esquizofrenia","Depresión con inhibición","Vértigo","Trastornos de conducta"],["oral","IM"],
  {"adulto":"Psicosis: 400-800 mg/día. Depresión: 150-300 mg/día. Máx 1200 mg/día"},
  ["Comp 50, 200 mg","Cáps 50 mg","Amp 100 mg/2mL"],"Evitar, se excreta en leche","u01","c01_06"),

M("antipsicotico","tiaprida","Tiaprida","Tiaprida",["Tiaprizal"],"Antipsicótico atípico (benzamida)",
  "Antagonista D2/D3 selectivo con efecto antidiscinético. Menor efecto antipsicótico que otros neurolépticos",
  ["Discinesias","Agitación en ancianos","Corea","Síndrome abstinencia alcohólica","Trastornos conducta en demencia"],["oral","IM"],
  {"adulto":"300-600 mg/día en 2-3 tomas. Abstinencia OH: 400-1200 mg/día","geriatrico":"100-300 mg/día"},
  ["Comp 100 mg","Amp 100 mg/2mL"],"Evitar durante lactancia","u01","c01_06"),

M("antipsicotico","levomepromazina","Levomepromazina","Levomepromazina",["Sinogan","Nozinan"],"Antipsicótico típico sedante (fenotiazina)",
  "Fenotiazina con potente acción sedante, ansiolítica y analgésica. Bloquea D2, 5-HT2, H1, alfa-1, muscarínicos",
  ["Psicosis con agitación","Dolor oncológico refractario","Sedación paliativa","Insomnio severo psicótico"],["oral","IM","SC"],
  {"adulto":"Psicosis: 25-200 mg/día. Sedación: 12.5-50 mg. Paliativo SC: 6.25-25 mg/24h"},
  ["Comp 25, 100 mg","Gotas 40 mg/mL","Amp 25 mg/mL"],"Evitar durante lactancia","u01","c01_06"),

M("antipsicotico","iloperidona","Iloperidona","Iloperidona",["Fanapt"],"Antipsicótico atípico",
  "Antagonista D2/5-HT2A con alta afinidad por alfa-1 adrenérgico. Requiere titulación lenta por hipotensión",
  ["Esquizofrenia"],["oral"],
  {"adulto":"Inicio 1 mg c/12h, titular gradualmente hasta 6-12 mg c/12h"},
  ["Comp 1, 2, 4, 6, 8, 10, 12 mg"],"No recomendado","u01","c01_06",
  ea=["Hipotensión ortostática (significativa)","Mareo","Somnolencia","Taquicardia","Prolongación QT","Aumento peso"],
  ce=["Titulación lenta obligatoria por hipotensión","ECG basal recomendado","Primera dosis bajo supervisión","Metabolizador lento CYP2D6: reducir dosis 50%"]),

M("antipsicotico","loxapina_inhalada","Loxapina inhalada","Loxapina",["Adasuve"],"Antipsicótico inhalado de acción rápida",
  "Antagonista D2/5-HT2A administrado por inhalación para absorción pulmonar ultra-rápida (2 min)",
  ["Agitación aguda en esquizofrenia o trastorno bipolar (adultos)"],["inhalatoria"],
  {"adulto":"10 mg inhalado, dosis única. Máx 1 dosis en 24h"},
  ["Inhalador dosis única 10 mg"],"Contraindicado","u01","c01_06",
  ci=["Enfermedad pulmonar activa (EPOC, asma)","Hipersensibilidad"],
  ea=["Broncoespasmo (⚠️ riesgo principal)","Sedación","Disgeusia","Mareo"],
  ce=["SOLO uso hospitalario con monitorización respiratoria","Tener broncodilatador de rescate disponible","Programa REMS en algunos países","Observar 1h post-administración"]),

M("antipsicotico","perfenazina","Perfenazina","Perfenazina",["Trilafon"],"Antipsicótico típico de potencia media (fenotiazina)",
  "Fenotiazina piperazínica. Bloquea receptores D2 con potencia intermedia. Usado en estudio CATIE",
  ["Esquizofrenia","Náuseas y vómitos severos","Trastorno bipolar (adyuvante)"],["oral","IM"],
  {"adulto":"Psicosis: 4-24 mg/día en 2-3 tomas. Máx 64 mg/día. Antiemético: 8-16 mg/día"},
  ["Comp 2, 4, 8, 16 mg","Amp 5 mg/mL"],"Evitar durante lactancia","u01","c01_06"),

M("antipsicotico","flufenazina","Flufenazina","Flufenazina",["Prolixin","Modecate"],"Antipsicótico típico depot (fenotiazina)",
  "Fenotiazina piperazínica de alta potencia. Disponible en decanoato IM para administración cada 2-4 semanas",
  ["Esquizofrenia (mantenimiento)","Psicosis crónicas con mala adherencia oral"],["oral","IM"],
  {"adulto":"Oral: 2.5-10 mg/día. Decanoato IM: 12.5-50 mg c/2-4 sem"},
  ["Comp 1, 2.5, 5 mg","Amp decanoato 25 mg/mL"],"Evitar durante lactancia","u01","c01_06",
  ea=["Síntomas extrapiramidales (alta incidencia)","Acatisia","Distonía aguda","Discinesia tardía","Síndrome neuroléptico maligno","Sedación"],
  ce=["Alta incidencia de extrapiramidalismos","Depot: anotar fecha y sitio de inyección","Vigilar discinesia tardía con AIMS","Tener biperideno disponible"]),

M("antipsicotico","trifluoperazina","Trifluoperazina","Trifluoperazina",["Stelazine"],"Antipsicótico típico de alta potencia (fenotiazina)",
  "Fenotiazina piperazínica de alta potencia antipsicótica. Menor sedación que clorpromazina, más extrapiramidalismos",
  ["Esquizofrenia","Ansiedad severa (corto plazo)","Agitación psicótica"],["oral","IM"],
  {"adulto":"Psicosis: 2-10 mg c/12h. Ansiedad: 1-2 mg c/12h por máx 12 sem. Máx 40 mg/día"},
  ["Comp 1, 2, 5, 10 mg","Amp 2 mg/mL"],"Evitar durante lactancia","u01","c01_06"),

# ── c01_07 Antidepresivos (+6) ──
M("antidepresivo_triciclico","doxepina","Doxepina","Doxepina",["Sinequan","Silenor"],"Antidepresivo tricíclico / hipnótico",
  "Tricíclico con potente acción antihistamínica H1. A dosis bajas (3-6 mg) actúa como hipnótico selectivo",
  ["Depresión","Insomnio de mantenimiento (dosis bajas)","Prurito crónico","Ansiedad"],["oral","topica"],
  {"adulto":"Depresión: 75-150 mg/día. Insomnio: 3-6 mg antes de dormir. Máx 300 mg/día","geriatrico":"3 mg para insomnio"},
  ["Cáps 10, 25, 50, 75, 100, 150 mg","Comp 3, 6 mg (Silenor)","Crema 5%"],"Evitar durante lactancia","u01","c01_07"),

M("antidepresivo_triciclico","maprotilina","Maprotilina","Maprotilina",["Ludiomil"],"Antidepresivo tetracíclico",
  "Inhibidor selectivo de recaptación de noradrenalina. Estructura tetracíclica. Umbral convulsivo más bajo que otros",
  ["Depresión con ansiedad","Depresión con inhibición psicomotora"],["oral"],
  {"adulto":"75 mg/día inicio, incrementar a 150-225 mg/día. Máx 225 mg/día"},
  ["Comp 10, 25, 50, 75 mg"],"Evitar durante lactancia","u01","c01_07",
  ci=["Epilepsia o umbral convulsivo bajo","IAM reciente","Glaucoma ángulo cerrado","Uso de IMAO"],
  ea=["⚠️ Mayor riesgo de convulsiones que otros AD","Sedación","Boca seca","Estreñimiento","Erupción cutánea","Hipotensión ortostática"]),

M("antidepresivo_isrs","tianeptina","Tianeptina","Tianeptina",["Stablon"],"Antidepresivo atípico (modulador glutamatérgico)",
  "Mecanismo único: modula sistema glutamatérgico y neuroplasticidad. No inhibe recaptación monoaminas",
  ["Depresión mayor","Depresión con ansiedad somática"],["oral"],
  {"adulto":"12.5 mg c/8h (3 veces al día). No modificar dosis","geriatrico":"12.5 mg c/12h (2 veces al día)"},
  ["Comp 12.5 mg"],"Evitar durante lactancia","u01","c01_07",
  ea=["Boca seca","Dolor abdominal","Náuseas","Estreñimiento","Mareo","Insomnio","⚠️ Potencial de abuso a dosis altas"],
  ce=["Posología estricta: 3 tomas/día","No tiene interacciones con IMAO","Potencial de abuso: vigilar","Sin disfunción sexual significativa"]),

M("antidepresivo_isrs","reboxetina","Reboxetina","Reboxetina",["Norebox","Edronax"],"Inhibidor selectivo recaptación de noradrenalina (ISRN)",
  "Inhibidor selectivo de recaptación de noradrenalina sin efecto significativo sobre serotonina o dopamina",
  ["Depresión mayor con inhibición y apatía","Depresión con fatiga predominante"],["oral"],
  {"adulto":"4 mg c/12h. Puede incrementar a 10 mg/día. Máx 12 mg/día","geriatrico":"2 mg c/12h"},
  ["Comp 4 mg"],"Evitar durante lactancia","u01","c01_07",
  ea=["Insomnio","Boca seca","Estreñimiento","Taquicardia","Sudoración","Retención urinaria","Hipotensión ortostática"],
  ce=["Activante: tomar por la mañana y mediodía","Vigilar retención urinaria","Útil en depresión con apatía/fatiga","No combinar con IMAO"]),

M("antidepresivo_isrs","milnacipran","Milnaciprán","Milnaciprán",["Ixel","Savella"],"Inhibidor recaptación serotonina y noradrenalina (ISRSN)",
  "ISRSN con mayor potencia noradrenérgica que serotoninérgica. Aprobado también para fibromialgia",
  ["Depresión mayor","Fibromialgia (EE.UU.)"],["oral"],
  {"adulto":"Depresión: 50 mg c/12h. Fibromialgia: titular desde 12.5 mg hasta 50-100 mg c/12h"},
  ["Comp 25, 50, 100 mg"],"Evitar durante lactancia","u01","c01_07"),

M("antidepresivo_isrs","fenelzina","Fenelzina","Fenelzina",["Nardil"],"Inhibidor irreversible de MAO (IMAO)",
  "Inhibidor irreversible no selectivo de MAO-A y MAO-B. Alta eficacia pero requiere dieta restrictiva",
  ["Depresión atípica refractaria","Fobia social severa","Depresión resistente a otros tratamientos"],["oral"],
  {"adulto":"15 mg c/8h, incrementar hasta 60-90 mg/día según respuesta"},
  ["Comp 15 mg"],"Contraindicado","u01","c01_07",
  ci=["Feocromocitoma","ICC","Hepatopatía","Uso de ISRS/ISRSN/triptanes/opioides","Alimentos ricos en tiramina"],
  ea=["⚠️ Crisis hipertensiva con tiramina","Hipotensión ortostática","Insomnio","Aumento de peso","Disfunción sexual","Edema","Hepatotoxicidad"],
  ix=["⚠️ ISRS/ISRSN: síndrome serotoninérgico fatal","Tiramina: crisis hipertensiva","Opioides (meperidina): reacción fatal","Simpaticomiméticos: crisis hipertensiva"],
  ce=["Dieta estricta sin tiramina (quesos curados, vino, embutidos)","Tarjeta de alerta IMAO para el paciente","Washout 14 días antes/después de ISRS","Washout 5 sem después de fluoxetina","Educar extensamente sobre dieta y fármacos prohibidos"]),
]

# ── New chapters to create ──
NEW_CHAPTERS = {
    "c01_09": {"id":"c01_09","nombre":"Fármacos para Migraña","unidadId":"u01","drugIds":[]},
}

if __name__ == "__main__":
    print("=== U01a: Sistema Nervioso (part A) ===")
    count = add_drugs_to_file(DRUGS)
    cats = load_categories()
    for ch_id, ch_data in NEW_CHAPTERS.items():
        add_chapter(cats, "u01", ch_data)
    for d in DRUGS:
        add_drug_to_chapter(cats, d["capituloId"], d["id"])
    save_categories(cats)
    print(f"Done. {count} drugs added.")
