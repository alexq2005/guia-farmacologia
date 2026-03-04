#!/usr/bin/env python3
"""Generate new drugs for u09 - Dermatología (6→23)."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from drug_helper import *

NEW_DRUGS = [
  {
    "id": "ketoconazol_topico", "nombre": "Ketoconazol Tópico", "nombreGenerico": "Ketoconazol",
    "nombresComerciales": ["Nizoral crema", "Ketomed", "Fungarest"],
    "familia": "Antifúngicos tópicos", "clasificacion": "Azol tópico",
    "mecanismoAccion": "Inhibe la 14-alfa-desmetilasa fúngica, bloqueando síntesis de ergosterol de la membrana celular del hongo. Activo contra dermatofitos, Candida y Malassezia.",
    "indicaciones": ["Dermatitis seborreica", "Pitiriasis versicolor", "Tiña corporis, pedis, cruris", "Candidiasis cutánea"],
    "contraindicaciones": ["Hipersensibilidad al ketoconazol"],
    "efectosAdversos": ["Irritación local", "Prurito", "Dermatitis de contacto", "Sequedad cutánea"],
    "interacciones": ["Tópico: sin interacciones sistémicas significativas"],
    "viaAdministracion": ["topica"],
    "dosis": {"adulto": "Crema: aplicar 1-2 veces/día x 2-4 semanas. Champú: 2 veces/semana"},
    "presentaciones": ["Crema 2%", "Champú 2%", "Gel 2%"],
    "embarazo": "C", "lactancia": "Compatible en uso tópico.",
    "cuidadosEnfermeria": ["Aplicar en piel limpia y seca", "Champú: dejar 3-5 min antes de enjuagar", "Continuar 2 semanas tras resolución clínica", "No ocluir con vendajes", "Evaluar respuesta a las 4 semanas"],
    "farmacocinetica": {"absorcion": "Tópica: absorción sistémica mínima", "metabolismo": "No significativo", "excrecion": "Local", "vidaMedia": "No aplica (tópico)"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u09", "capituloId": "c09_03"
  },
  {
    "id": "terbinafina_topica", "nombre": "Terbinafina Tópica", "nombreGenerico": "Clorhidrato de terbinafina",
    "nombresComerciales": ["Lamisil crema", "Terbinafina Gador"],
    "familia": "Antifúngicos tópicos", "clasificacion": "Alilamina antifúngica",
    "mecanismoAccion": "Inhibe la escualeno epoxidasa, enzima clave en la síntesis de ergosterol fúngico. Fungicida (vs fungistático de azoles). Alta actividad contra dermatofitos.",
    "indicaciones": ["Tiña pedis (pie de atleta)", "Tiña corporis", "Tiña cruris", "Onicomicosis leve (tópica)"],
    "contraindicaciones": ["Hipersensibilidad a terbinafina"],
    "efectosAdversos": ["Irritación local", "Eritema", "Prurito", "Sequedad"],
    "interacciones": ["Sin interacciones sistémicas en uso tópico"],
    "viaAdministracion": ["topica"],
    "dosis": {"adulto": "Crema: aplicar 1-2 veces/día x 1-4 semanas según localización"},
    "presentaciones": ["Crema 1%", "Spray 1%", "Gel 1%"],
    "embarazo": "B", "lactancia": "Compatible en uso tópico. No aplicar en pezones.",
    "cuidadosEnfermeria": ["Aplicar en piel limpia y seca", "Tiña pedis: mantener pies secos, usar calzado ventilado", "Fungicida: puede requerir menos tiempo que azoles", "Educar sobre higiene para prevenir reinfección"],
    "farmacocinetica": {"absorcion": "Tópica mínima (<5% sistémica)", "metabolismo": "No significativo", "excrecion": "Local"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u09", "capituloId": "c09_03"
  },
  {
    "id": "terbinafina_oral", "nombre": "Terbinafina Oral", "nombreGenerico": "Clorhidrato de terbinafina",
    "nombresComerciales": ["Lamisil comprimidos", "Terbinafina Gador oral"],
    "familia": "Antifúngicos sistémicos (dermatológicos)", "clasificacion": "Alilamina antifúngica oral",
    "mecanismoAccion": "Inhibe escualeno epoxidasa. Se concentra en piel, uñas y tejido adiposo. Fungicida contra dermatofitos. Menor actividad contra Candida.",
    "indicaciones": ["Onicomicosis (primera línea)", "Tiña capitis", "Dermatofitosis extensas o refractarias a tópicos"],
    "contraindicaciones": ["Hepatopatía activa", "Insuficiencia renal severa (CrCl <50)", "Lupus eritematoso"],
    "efectosAdversos": ["Cefalea", "Diarrea", "Dispepsia", "Erupción cutánea", "Hepatotoxicidad", "Pérdida del gusto (ageusia, reversible)", "Neutropenia (rara)"],
    "interacciones": ["Inhibidor CYP2D6", "Cimetidina: aumenta niveles", "Rifampicina: reduce niveles", "Cafeína: aumenta niveles de cafeína"],
    "viaAdministracion": ["oral"],
    "dosis": {"adulto": "Onicomicosis uñas manos: 250 mg/día x 6 semanas. Uñas pies: 250 mg/día x 12 semanas. Tiña capitis: 250 mg/día x 4-8 semanas", "pediatrico": "<20 kg: 62.5 mg/día. 20-40 kg: 125 mg/día. >40 kg: 250 mg/día"},
    "presentaciones": ["Comprimidos 250 mg"],
    "embarazo": "B", "lactancia": "Se excreta en leche. No recomendado.",
    "cuidadosEnfermeria": ["Hepatograma BASAL y mensual", "Informar sobre ageusia (reversible al suspender)", "Uñas: efecto visible tras crecimiento completo (3-6 meses manos, 6-12 meses pies)", "Hemograma si tratamiento >6 semanas"],
    "farmacocinetica": {"absorcion": "Oral buena, biodisponibilidad 70%", "distribucion": "Lipofílica. Alta concentración en piel, uñas y pelo", "metabolismo": "Hepático CYP2C9, 1A2, 3A4, 2C8", "excrecion": "Renal 80% (metabolitos)", "vidaMedia": "36 horas (200-400h terminal por tejidos)", "inicioAccion": "Semanas", "picoAccion": "2 horas", "duracionAccion": "Persiste en uñas meses"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u09", "capituloId": "c09_03"
  },
  {
    "id": "aciclovir_topico", "nombre": "Aciclovir Tópico", "nombreGenerico": "Aciclovir",
    "nombresComerciales": ["Zovirax crema", "Aciclovir Gador crema"],
    "familia": "Antivirales tópicos", "clasificacion": "Análogo nucleosídico tópico",
    "mecanismoAccion": "Análogo de guanosina que inhibe la ADN polimerasa del herpes virus tras fosforilación por la timidina quinasa viral. Uso tópico para lesiones cutáneas herpéticas.",
    "indicaciones": ["Herpes labial recurrente", "Herpes genital leve (coadyuvante)", "Herpes zóster cutáneo leve"],
    "contraindicaciones": ["Hipersensibilidad al aciclovir"],
    "efectosAdversos": ["Quemazón transitoria", "Prurito local", "Sequedad"],
    "interacciones": ["Sin interacciones sistémicas significativas"],
    "viaAdministracion": ["topica"],
    "dosis": {"adulto": "Aplicar cada 4 horas (5 veces/día) x 5-10 días. Iniciar al primer síntoma (pródromo)"},
    "presentaciones": ["Crema 5%"],
    "embarazo": "B", "lactancia": "Compatible en uso tópico.",
    "cuidadosEnfermeria": ["Iniciar al primer signo de pródromo (hormigueo, ardor)", "Aplicar con guantes o hisopo (evitar autoinoculación)", "Eficacia limitada si se inicia tarde", "No ocluir", "Lesiones genitales: derivar para tratamiento oral"],
    "farmacocinetica": {"absorcion": "Tópica: absorción sistémica mínima"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u09", "capituloId": "c09_05"
  },
  {
    "id": "clobetasol", "nombre": "Clobetasol", "nombreGenerico": "Propionato de clobetasol",
    "nombresComerciales": ["Dermovate", "Clobetasol Gador", "Clovate"],
    "familia": "Corticoides tópicos", "clasificacion": "Corticoide tópico superpotente (Clase I)",
    "mecanismoAccion": "Corticoide tópico de máxima potencia. Se une a receptores glucocorticoides intracelulares, inhibiendo fosfolipasa A2 y producción de prostaglandinas/leucotrienos. Efecto antiinflamatorio, antipruriginoso e inmunosupresor local.",
    "indicaciones": ["Psoriasis en placas (formas resistentes)", "Dermatitis atópica severa (corto plazo)", "Liquen plano", "Lupus discoide", "Alopecia areata"],
    "contraindicaciones": ["Infecciones cutáneas no tratadas", "Rosácea", "Acné vulgar", "Dermatitis perioral", "Niños <12 años (relativo)", "Cara y pliegues (evitar)"],
    "efectosAdversos": ["Atrofia cutánea", "Estrías", "Telangiectasias", "Foliculitis", "Hipopigmentación", "Dermatitis perioral", "Supresión adrenal (uso extenso/prolongado)"],
    "interacciones": ["No significativas en uso tópico correcto"],
    "viaAdministracion": ["topica"],
    "dosis": {"adulto": "Aplicar capa fina 1-2 veces/día. Máximo 2 semanas continuas. No >50 g/semana"},
    "presentaciones": ["Crema 0.05%", "Ungüento 0.05%", "Loción 0.05%", "Champú 0.05%"],
    "embarazo": "C", "lactancia": "No aplicar en mamas. Compatible con precaución.",
    "cuidadosEnfermeria": ["MÁXIMA potencia: uso corto plazo (<2 semanas)", "NO en cara, pliegues ni área del pañal", "No ocluir (aumenta absorción y efectos adversos)", "Enseñar la unidad de punta de dedo (FTU) para dosificar", "Evaluar atrofia cutánea periódicamente", "Reducir gradualmente (no suspender abruptamente en uso prolongado)"],
    "farmacocinetica": {"absorcion": "Tópica: variable según zona. Cara/pliegues: absorción alta", "metabolismo": "Hepático si se absorbe", "excrecion": "Renal"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u09", "capituloId": "c09_02"
  },
  {
    "id": "mometasona_topica", "nombre": "Mometasona Tópica", "nombreGenerico": "Furoato de mometasona",
    "nombresComerciales": ["Elocom", "Elocon", "Mometasona Gador"],
    "familia": "Corticoides tópicos", "clasificacion": "Corticoide tópico potente (Clase III-IV)",
    "mecanismoAccion": "Corticoide tópico de alta potencia con buen perfil de seguridad. Inhibe la cascada inflamatoria local con menor absorción sistémica que otros de igual potencia.",
    "indicaciones": ["Dermatitis atópica", "Psoriasis", "Dermatitis de contacto", "Eccema", "Prurito"],
    "contraindicaciones": ["Infecciones cutáneas sin tratar", "Rosácea", "Acné", "Dermatitis perioral"],
    "efectosAdversos": ["Ardor local", "Prurito", "Foliculitis", "Atrofia cutánea (uso prolongado)", "Estrías"],
    "interacciones": ["Sin interacciones sistémicas significativas en uso correcto"],
    "viaAdministracion": ["topica"],
    "dosis": {"adulto": "Aplicar capa fina 1 vez/día. Crema/ungüento: hasta 3 semanas. Loción capilar: 1 vez/día"},
    "presentaciones": ["Crema 0.1%", "Ungüento 0.1%", "Loción 0.1%"],
    "embarazo": "C", "lactancia": "Compatible. No aplicar en mamas.",
    "cuidadosEnfermeria": ["Una vez al día es suficiente (ventaja de adherencia)", "Puede usarse en cara breve tiempo (menos atrofia que otros potentes)", "Enseñar FTU para dosificar correctamente", "Evaluar respuesta a las 2 semanas"],
    "farmacocinetica": {"absorcion": "Tópica: absorción sistémica baja", "metabolismo": "Hepático si se absorbe"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u09", "capituloId": "c09_02"
  },
  {
    "id": "tacrolimus_topico", "nombre": "Tacrolimus Tópico", "nombreGenerico": "Tacrolimus monohidrato",
    "nombresComerciales": ["Protopic", "Tacrolimus Gador"],
    "familia": "Inmunomoduladores tópicos", "clasificacion": "Inhibidor de calcineurina tópico",
    "mecanismoAccion": "Se une a FKBP-12, inhibiendo calcineurina. Bloquea la transcripción de IL-2 y otras citoquinas proinflamatorias en linfocitos T. Efecto antiinflamatorio SIN atrofia cutánea (ventaja sobre corticoides).",
    "indicaciones": ["Dermatitis atópica moderada-severa (segunda línea)", "Dermatitis atópica en cara y pliegues (donde corticoides riesgosos)", "Vitíligo (off-label)", "Dermatitis perioral"],
    "contraindicaciones": ["Infecciones cutáneas activas", "Inmunodeficiencia", "Menores de 2 años"],
    "efectosAdversos": ["Ardor/quemazón inicial (frecuente, mejora en días)", "Prurito", "Eritema", "Foliculitis", "Riesgo teórico de linfoma (FDA black box, no confirmado)"],
    "interacciones": ["Inhibidores CYP3A4: precaución teórica si absorción aumentada", "Evitar exposición solar excesiva"],
    "viaAdministracion": ["topica"],
    "dosis": {"adulto": "0.1% aplicar 2 veces/día en áreas afectadas. Mantenimiento: 2 veces/semana en zonas propensas", "pediatrico": ">2 años: 0.03% 2 veces/día"},
    "presentaciones": ["Ungüento 0.03% (pediátrico)", "Ungüento 0.1% (adultos)"],
    "embarazo": "C", "lactancia": "No recomendado.",
    "cuidadosEnfermeria": ["Advertir sobre ardor inicial (primeros días, mejora)", "NO ocluir", "Ventaja sobre corticoides: NO produce atrofia cutánea", "Ideal para cara, párpados, pliegues", "Fotoprotección durante tratamiento", "No usar en piel infectada"],
    "farmacocinetica": {"absorcion": "Tópica: absorción mínima en piel intacta, mayor en piel dañada", "metabolismo": "Hepático CYP3A4 si se absorbe", "vidaMedia": "No relevante en uso tópico"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u09", "capituloId": "c09_06"
  },
  {
    "id": "isotretinoina", "nombre": "Isotretinoína", "nombreGenerico": "Isotretinoína",
    "nombresComerciales": ["Roaccutan", "Accutane", "Isotretinoína Gador", "Piplex"],
    "familia": "Retinoides", "clasificacion": "Retinoide sistémico (vitamina A sintética)",
    "mecanismoAccion": "Reduce la producción de sebo (70-90%), normaliza la queratinización folicular, reduce P. acnes y tiene efecto antiinflamatorio. Actúa sobre los 4 mecanismos patogénicos del acné.",
    "indicaciones": ["Acné severo noduloquístico", "Acné moderado refractario a tratamiento convencional", "Acné con cicatrización"],
    "contraindicaciones": ["Embarazo (TERATOGÉNICO ABSOLUTO)", "Lactancia", "Hipersensibilidad a retinoides", "Hipervitaminosis A", "Hepatopatía severa", "Hipertrigliceridemia severa"],
    "efectosAdversos": ["Sequedad mucocutánea (labios, piel, ojos) - universal", "Queilitis", "Epistaxis", "Xeroftalmia", "Artralgias/mialgias", "Elevación de triglicéridos y transaminasas", "Depresión/ideación suicida (controvertido)", "Teratogenicidad severa"],
    "interacciones": ["Vitamina A: hipervitaminosis (EVITAR)", "Tetraciclinas: pseudotumor cerebri (EVITAR)", "Metotrexato: hepatotoxicidad aditiva", "Fenitoína: reduce efecto de fenitoína"],
    "viaAdministracion": ["oral"],
    "dosis": {"adulto": "0.5-1 mg/kg/día x 16-24 semanas. Dosis acumulativa objetivo: 120-150 mg/kg total. Iniciar bajo (0.5 mg/kg) y aumentar"},
    "presentaciones": ["Cápsulas blandas 10, 20 mg"],
    "embarazo": "X", "lactancia": "Contraindicado.",
    "cuidadosEnfermeria": ["TERATOGÉNICO: anticoncepción doble OBLIGATORIA (1 mes antes, durante y 1 mes después)", "Test de embarazo negativo antes de CADA prescripción", "Hepatograma y perfil lipídico basal, al mes y cada 2 meses", "Bálsamo labial constante (queilitis universal)", "Lágrimas artificiales si xeroftalmia", "Fotoprotección estricta", "NO donar sangre durante y 1 mes después", "Empeoramiento inicial del acné posible (primeras 2-4 semanas)", "Evaluar estado anímico periódicamente"],
    "farmacocinetica": {"absorcion": "Oral: aumenta con alimentos grasos", "distribucion": "Unión proteica 99.9% (albúmina)", "metabolismo": "Hepático CYP2C8, 3A4, 2C9", "excrecion": "Renal y fecal", "vidaMedia": "21 horas", "inicioAccion": "Mejora visible: 4-8 semanas", "picoAccion": "1-4 horas", "duracionAccion": "Efecto sostenido meses post-tratamiento"},
    "almacenamiento": "Temperatura ambiente. Proteger de la luz.", "unidadId": "u09", "capituloId": "c09_07"
  },
  {
    "id": "adapaleno", "nombre": "Adapaleno", "nombreGenerico": "Adapaleno",
    "nombresComerciales": ["Differin", "Adapaleno Gador", "Epiduo (con peróxido de benzoílo)"],
    "familia": "Retinoides tópicos", "clasificacion": "Retinoide tópico de 3ra generación",
    "mecanismoAccion": "Se une selectivamente a receptores de ácido retinoico RAR-beta y RAR-gamma. Normaliza la diferenciación de queratinocitos foliculares, reduce la comedogénesis y tiene efecto antiinflamatorio. Mejor tolerado que tretinoína.",
    "indicaciones": ["Acné vulgar (comedónico y inflamatorio)", "Acné leve a moderado (primera línea tópica)"],
    "contraindicaciones": ["Embarazo", "Hipersensibilidad", "Eccema o dermatitis activa en zona de aplicación"],
    "efectosAdversos": ["Eritema", "Descamación", "Sequedad", "Ardor/picazón", "Fotosensibilidad"],
    "interacciones": ["Evitar otros irritantes tópicos simultáneos (peróxido de benzoílo mismo sitio)", "Puede combinarse con peróxido de benzoílo si se alternan horarios"],
    "viaAdministracion": ["topica"],
    "dosis": {"adulto": "Aplicar capa fina 1 vez/día por la NOCHE en piel limpia y seca"},
    "presentaciones": ["Gel 0.1%, 0.3%", "Crema 0.1%", "Gel adapaleno 0.1% + peróxido de benzoílo 2.5% (Epiduo)"],
    "embarazo": "C", "lactancia": "Compatible con precaución. No aplicar en mamas.",
    "cuidadosEnfermeria": ["Aplicar solo de NOCHE (fotosensibilidad)", "Fotoprotección diaria obligatoria", "Irritación inicial: reducir a día por medio las primeras 2 semanas", "Respuesta clínica: 8-12 semanas mínimo", "Puede empeorar al inicio (retinización)", "Evitar labios, ojos, mucosas"],
    "farmacocinetica": {"absorcion": "Tópica: absorción mínima (2-5%)", "metabolismo": "Si se absorbe: hepático"},
    "almacenamiento": "Temperatura ambiente. No exponer al calor.", "unidadId": "u09", "capituloId": "c09_07"
  },
  {
    "id": "peroxido_benzoilo", "nombre": "Peróxido de Benzoílo", "nombreGenerico": "Peróxido de benzoílo",
    "nombresComerciales": ["Benzac", "Peroxiben", "OXY"],
    "familia": "Antiacneicos tópicos", "clasificacion": "Agente oxidante antibacteriano tópico",
    "mecanismoAccion": "Agente oxidante que libera oxígeno libre, creando un ambiente adverso para P. acnes (anaerobio). Efecto bactericida sin generar resistencia. También comedolítico leve y queratolítico.",
    "indicaciones": ["Acné vulgar leve a moderado", "Acné inflamatorio (combinado con retinoides o antibióticos tópicos)"],
    "contraindicaciones": ["Hipersensibilidad al peróxido de benzoílo"],
    "efectosAdversos": ["Sequedad", "Eritema", "Descamación", "Dermatitis de contacto", "Blanquea ropa y ropa de cama"],
    "interacciones": ["Tretinoína tópica: se inactivan mutuamente (no aplicar juntos)", "Adapaleno: estable con peróxido de benzoílo (Epiduo)"],
    "viaAdministracion": ["topica"],
    "dosis": {"adulto": "Aplicar 1-2 veces/día. Iniciar con concentración baja (2.5%) para evaluar tolerancia"},
    "presentaciones": ["Gel 2.5%, 5%, 10%", "Crema 5%", "Loción 2.5%"],
    "embarazo": "C", "lactancia": "Compatible. No aplicar en mamas.",
    "cuidadosEnfermeria": ["No genera resistencia bacteriana (ventaja vs antibióticos tópicos)", "Iniciar con 2.5% (igual eficacia, menos irritación)", "Advertir que BLANQUEA ropa, toallas y sábanas", "Aplicar en piel seca", "Fotoprotección", "Puede combinarse con adapaleno (aplicar en distintos momentos)"],
    "farmacocinetica": {"absorcion": "Tópica: se convierte en ácido benzoico en la piel. Absorción sistémica 5%"},
    "almacenamiento": "Temperatura ambiente. Proteger del calor (>25°C se descompone).", "unidadId": "u09", "capituloId": "c09_07"
  },
  {
    "id": "calcipotriol", "nombre": "Calcipotriol", "nombreGenerico": "Calcipotriol (calcipotriene)",
    "nombresComerciales": ["Daivonex", "Daivobet (con betametasona)", "Psorcutan"],
    "familia": "Antipsoriásicos tópicos", "clasificacion": "Análogo de vitamina D3 tópico",
    "mecanismoAccion": "Análogo sintético de vitamina D3 que se une al receptor de vitamina D en queratinocitos. Inhibe la proliferación y promueve la diferenciación de queratinocitos. Efecto inmunomodulador local.",
    "indicaciones": ["Psoriasis en placas (leve a moderada)", "Psoriasis del cuero cabelludo"],
    "contraindicaciones": ["Hipercalcemia", "Trastornos del metabolismo del calcio", "Psoriasis pustulosa o eritrodérmica"],
    "efectosAdversos": ["Irritación local", "Eritema", "Prurito", "Ardor", "Hipercalcemia (uso excesivo >100 g/semana)"],
    "interacciones": ["Suplementos de calcio: hipercalcemia si uso excesivo", "No usar con ácido salicílico (lo inactiva)"],
    "viaAdministracion": ["topica"],
    "dosis": {"adulto": "Aplicar 2 veces/día. Máximo 100 g/semana (para evitar hipercalcemia)"},
    "presentaciones": ["Crema 50 mcg/g", "Ungüento 50 mcg/g", "Solución capilar 50 mcg/mL", "Ungüento calcipotriol + betametasona (Daivobet)"],
    "embarazo": "C", "lactancia": "No aplicar en mamas. Compatible con precaución.",
    "cuidadosEnfermeria": ["Máximo 100 g/semana (riesgo hipercalcemia)", "No usar en cara ni pliegues (irritante)", "Combinación con betametasona (Daivobet): mayor eficacia en inducción", "Lavarse manos tras aplicar", "Puede manchar la ropa", "Buena opción de mantenimiento (no produce atrofia)"],
    "farmacocinetica": {"absorcion": "Tópica: ~6% absorción sistémica", "metabolismo": "Hepático si se absorbe", "excrecion": "Biliar"},
    "almacenamiento": "Temperatura ambiente. No refrigerar.", "unidadId": "u09", "capituloId": "c09_06"
  },
  {
    "id": "acido_fusidico", "nombre": "Ácido Fusídico", "nombreGenerico": "Ácido fusídico",
    "nombresComerciales": ["Fucidine", "Fucidin", "Ácido Fusídico Gador"],
    "familia": "Antibióticos tópicos", "clasificacion": "Antibiótico esteroideo tópico",
    "mecanismoAccion": "Inhibe la síntesis proteica bacteriana al impedir la translocación del ribosoma, uniéndose al factor de elongación G. Bacteriostático. Alta actividad contra S. aureus (incluyendo SARM comunitario).",
    "indicaciones": ["Impétigo", "Foliculitis", "Infecciones cutáneas por S. aureus", "Sobreinfección de dermatitis", "Heridas infectadas superficiales"],
    "contraindicaciones": ["Hipersensibilidad al ácido fusídico"],
    "efectosAdversos": ["Irritación local leve", "Prurito", "Eritema", "Dermatitis de contacto (rara)"],
    "interacciones": ["Sin interacciones sistémicas en uso tópico"],
    "viaAdministracion": ["topica"],
    "dosis": {"adulto": "Aplicar 3-4 veces/día x 7-10 días. Máximo 2 semanas (resistencia)"},
    "presentaciones": ["Crema 2%", "Ungüento 2%", "Crema ácido fusídico + hidrocortisona"],
    "embarazo": "B", "lactancia": "Compatible. No aplicar en mamas.",
    "cuidadosEnfermeria": ["Limitar a 2 semanas máximo (prevenir resistencia)", "No ocluir extensamente", "Ideal para impétigo localizado", "Alternativa a mupirocina para descolonización SARM nasal (off-label)"],
    "farmacocinetica": {"absorcion": "Tópica: absorción mínima en piel intacta, mayor en piel dañada"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u09", "capituloId": "c09_01"
  },
  {
    "id": "minociclina_topica", "nombre": "Minociclina Tópica", "nombreGenerico": "Minociclina",
    "nombresComerciales": ["Minociclina Gador crema"],
    "familia": "Antibióticos tópicos (antiacné)", "clasificacion": "Tetraciclina tópica",
    "mecanismoAccion": "Inhibe la síntesis proteica bacteriana (subunidad 30S). Actividad contra Cutibacterium acnes (antes P. acnes). Efecto antiinflamatorio adicional.",
    "indicaciones": ["Acné inflamatorio moderado"],
    "contraindicaciones": ["Hipersensibilidad a tetraciclinas"],
    "efectosAdversos": ["Pigmentación cutánea (poco frecuente con tópico)", "Irritación local"],
    "interacciones": ["Sin interacciones sistémicas significativas"],
    "viaAdministracion": ["topica"],
    "dosis": {"adulto": "Aplicar 1 vez/día por la noche en áreas afectadas"},
    "presentaciones": ["Espuma/crema 4%"],
    "embarazo": "D", "lactancia": "No recomendado.",
    "cuidadosEnfermeria": ["Aplicar capa fina por la noche", "Menos resistencia que eritromicina/clindamicina tópica", "Puede pigmentar dientes si uso oral (no tópico)", "Combinar con peróxido de benzoílo para reducir resistencia"],
    "farmacocinetica": {"absorcion": "Tópica: absorción sistémica mínima"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u09", "capituloId": "c09_01"
  },
  {
    "id": "lindano", "nombre": "Lindano", "nombreGenerico": "Lindano (gamma-hexaclorociclohexano)",
    "nombresComerciales": ["Lindano loción"],
    "familia": "Antiparasitarios tópicos", "clasificacion": "Pediculicida/escabicida organoclorado",
    "mecanismoAccion": "Se absorbe por el exoesqueleto del parásito y estimula el sistema nervioso del artrópodo, causando convulsiones y muerte. Segunda línea por toxicidad potencial.",
    "indicaciones": ["Escabiosis (segunda línea)", "Pediculosis (segunda línea)"],
    "contraindicaciones": ["Embarazo y lactancia", "Niños <2 años", "Pacientes con convulsiones", "Piel con heridas extensas", "Prematuros"],
    "efectosAdversos": ["Irritación local", "Neurotoxicidad (convulsiones en sobredosis)", "Dermatitis de contacto", "Aplasia medular (raro, exposición repetida)"],
    "interacciones": ["Fármacos que reducen umbral convulsivo: mayor riesgo"],
    "viaAdministracion": ["topica"],
    "dosis": {"adulto": "Loción 1%: aplicar en todo el cuerpo (cuello hacia abajo), dejar 8-12h, lavar. Dosis ÚNICA. Champú: aplicar 4 min, enjuagar"},
    "presentaciones": ["Loción 1%", "Champú 1%"],
    "embarazo": "C", "lactancia": "Contraindicado.",
    "cuidadosEnfermeria": ["SEGUNDA línea: usar solo si permetrina falló", "Aplicación ÚNICA (no repetir)", "Piel SECA (no post-baño, aumenta absorción y toxicidad)", "No en niños <2 años", "No en pacientes con epilepsia", "Tratar todos los convivientes simultáneamente", "Lavar ropa y sábanas a >60°C"],
    "farmacocinetica": {"absorcion": "Tópica: absorción sistémica significativa (10-15%)", "metabolismo": "Hepático", "excrecion": "Renal y fecal", "vidaMedia": "18 horas"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u09", "capituloId": "c09_04"
  },
  {
    "id": "ivermectina_topica", "nombre": "Ivermectina Tópica", "nombreGenerico": "Ivermectina",
    "nombresComerciales": ["Soolantra", "Iver crema"],
    "familia": "Antiparasitarios tópicos", "clasificacion": "Avermectina tópica antiinflamatoria/antiparasitaria",
    "mecanismoAccion": "Antiparasitario que se une a canales de cloro glutamato-dependientes de invertebrados. En rosácea, tiene efecto antiinflamatorio directo reduciendo citoquinas proinflamatorias. Mata Demodex folliculorum.",
    "indicaciones": ["Rosácea inflamatoria (pápulas y pústulas)", "Rosácea por Demodex"],
    "contraindicaciones": ["Hipersensibilidad a ivermectina"],
    "efectosAdversos": ["Ardor/quemazón transitoria", "Sequedad", "Prurito leve"],
    "interacciones": ["Sin interacciones sistémicas significativas en uso tópico"],
    "viaAdministracion": ["topica"],
    "dosis": {"adulto": "Crema 1%: aplicar 1 vez/día en cara limpia. Mínimo 3 meses para evaluar eficacia"},
    "presentaciones": ["Crema 1%"],
    "embarazo": "C", "lactancia": "Compatible con precaución.",
    "cuidadosEnfermeria": ["Aplicar cantidad tamaño arveja en cada zona (frente, mentón, nariz, mejillas)", "Eficacia comparable a metronidazol tópico en rosácea", "Evaluar respuesta a las 12 semanas", "No confundir con ivermectina oral antiparasitaria"],
    "farmacocinetica": {"absorcion": "Tópica: absorción sistémica <1%"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u09", "capituloId": "c09_04"
  },
  {
    "id": "metronidazol_topico", "nombre": "Metronidazol Tópico", "nombreGenerico": "Metronidazol",
    "nombresComerciales": ["Rozex", "MetroGel", "Metronidazol Gador crema"],
    "familia": "Antibióticos tópicos", "clasificacion": "Nitroimidazol tópico",
    "mecanismoAccion": "Efecto antiinflamatorio y antimicrobiano en piel. Reduce las especies reactivas de oxígeno y la inflamación mediada por neutrófilos. Actividad contra microorganismos asociados a rosácea.",
    "indicaciones": ["Rosácea (primera línea tópica)", "Dermatitis perioral"],
    "contraindicaciones": ["Hipersensibilidad a metronidazol o nitroimidazoles"],
    "efectosAdversos": ["Sequedad local", "Eritema", "Ardor transitorio", "Prurito"],
    "interacciones": ["Sin interacciones sistémicas en uso tópico"],
    "viaAdministracion": ["topica"],
    "dosis": {"adulto": "Gel/crema 0.75%: aplicar 2 veces/día. Crema 1%: 1 vez/día. Mínimo 3 meses"},
    "presentaciones": ["Gel 0.75%", "Crema 0.75%", "Crema 1%"],
    "embarazo": "B", "lactancia": "Compatible.",
    "cuidadosEnfermeria": ["Primera línea en rosácea pápulo-pustulosa", "Resultado visible: 3-4 semanas mínimo", "Puede combinarse con ácido azelaico", "Evitar irritantes, alcohol y alimentos picantes (empeoran rosácea)", "Fotoprotección obligatoria en rosácea"],
    "farmacocinetica": {"absorcion": "Tópica: absorción sistémica mínima"},
    "almacenamiento": "Temperatura ambiente.", "unidadId": "u09", "capituloId": "c09_01"
  }
]

NEW_CHAPTERS = [
    {"id": "c09_05", "nombre": "Antivirales Tópicos", "unidadId": "u09", "drugIds": ["aciclovir_topico"]},
    {"id": "c09_06", "nombre": "Inmunomoduladores y Antipsoriásicos", "unidadId": "u09", "drugIds": ["tacrolimus_topico", "calcipotriol"]},
    {"id": "c09_07", "nombre": "Retinoides y Antiacneicos", "unidadId": "u09", "drugIds": ["isotretinoina", "adapaleno", "peroxido_benzoilo"]}
]

EXISTING_CHAPTER_ADDITIONS = {
    "c09_01": ["acido_fusidico", "minociclina_topica", "metronidazol_topico"],
    "c09_02": ["clobetasol", "mometasona_topica"],
    "c09_03": ["ketoconazol_topico", "terbinafina_topica", "terbinafina_oral"],
    "c09_04": ["lindano", "ivermectina_topica"],
}

PATHOLOGY_LINKS = {
    "pat_celulitis": ["acido_fusidico"],
}

def main():
    print("=== Generating u09 drugs ===")
    added = add_drugs_to_file(NEW_DRUGS)
    cats = load_categories()
    for ch in NEW_CHAPTERS:
        add_chapter(cats, "u09", ch)
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
