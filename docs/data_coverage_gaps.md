# Data Coverage Gaps — Farmacocinética

> Generado automáticamente el 2026-05-21 por audit de `drugs.json`.
> Criterio de "incompleto": el objeto `farmacocinetica` está ausente, o tiene menos de 3 subcampos populados (de los 8 posibles: absorcion, distribucion, metabolismo, excrecion, vidaMedia, inicioAccion, picoAccion, duracionAccion).

## Resumen

| Métrica                    | Valor          |
| -------------------------- | -------------- |
| Total fármacos en dataset  | 2974           |
| Con FC útil (3+ subcampos) | 740 (25%)      |
| **Sin FC útil (gap)**      | **2234 (75%)** |

## Priorización sugerida

Fármacos sin FC útil **agrupados por grupo terapéutico** (ordenados por cantidad). Los grupos con más gaps son candidatos prioritarios para el Bloque 1 de revisión clínica (v1.1).

| #   | Grupo Terapéutico                                                                                        | Entradas sin FC |
| --- | -------------------------------------------------------------------------------------------------------- | --------------- |
| 1   | (sin grupo terapéutico)                                                                                  | 193             |
| 2   | Antiinfecciosos                                                                                          | 151             |
| 3   | Sistema Nervioso                                                                                         | 106             |
| 4   | Fármacos Hospitalarios y Antineoplásicos                                                                 | 101             |
| 5   | Dermatología                                                                                             | 96              |
| 6   | Aparato Digestivo                                                                                        | 83              |
| 7   | Sistema Endocrino y Metabolismo                                                                          | 79              |
| 8   | Sistema Cardiovascular                                                                                   | 77              |
| 9   | Sistema Respiratorio                                                                                     | 75              |
| 10  | Sistema Genitourinario y Reproductor                                                                     | 75              |
| 11  | Antídotos y Emergencias                                                                                  | 66              |
| 12  | Sistema Musculoesquelético                                                                               | 65              |
| 13  | Sangre y Órganos Hematopoyéticos                                                                         | 64              |
| 14  | OTROS PREPARADOS PARA EL RESFRIADO                                                                       | 14              |
| 15  | Combinaciones                                                                                            | 14              |
| 16  | Factor VIII de la coagulacion                                                                            | 10              |
| 17  | Paracetamol, combinaciones excluyendo psicolepticos                                                      | 9               |
| 18  | Timolol, combinaciones con                                                                               | 7               |
| 19  | Dexametasona y antiinfecciosos                                                                           | 6               |
| 20  | Factor IX de la coagulacion                                                                              | 5               |
| 21  | Varios                                                                                                   | 5               |
| 22  | Electrolitos                                                                                             | 5               |
| 23  | Betametasona                                                                                             | 4               |
| 24  | Lagrimas artificiales y otros preparados inertes                                                         | 4               |
| 25  | Eritropoyetina                                                                                           | 4               |
| 26  | Hidrocortisona                                                                                           | 4               |
| 27  | Otros productos urologicos                                                                               | 3               |
| 28  | Aminoacidos y derivados                                                                                  | 3               |
| 29  | Antisepticos                                                                                             | 3               |
| 30  | Hemofiltrados                                                                                            | 3               |
| 31  | Laxantes de contacto                                                                                     | 3               |
| 32  | Derivados del opio y expectorantes                                                                       | 3               |
| 33  | Otros hipnoticos y sedantes                                                                              | 3               |
| 34  | Electrolitos con carbohidratos                                                                           | 3               |
| 35  | Macrogol, combinaciones con                                                                              | 3               |
| 36  | Codeina y paracetamol                                                                                    | 3               |
| 37  | Preparados anti-verrugas y callicidas                                                                    | 3               |
| 38  | Emulsiones grasas                                                                                        | 2               |
| 39  | Otros agentes contra padecimientos funcionales del estomago                                              | 2               |
| 40  | Clorhexidina, combinaciones con                                                                          | 2               |
| 41  | Acido diatrizoico                                                                                        | 2               |
| 42  | Nafazolina, combinaciones con                                                                            | 2               |
| 43  | Ciproheptadina, combinaciones con                                                                        | 2               |
| 44  | Otros productos topicos para el dolor articular y muscular                                               | 2               |
| 45  | Bencidamina                                                                                              | 2               |
| 46  | Tecnecio (99mTc) mertiatida                                                                              | 2               |
| 47  | Xilometazolina                                                                                           | 2               |
| 48  | Pseudoefedrina, combinaciones con                                                                        | 2               |
| 49  | Ciproterona y estrogeno                                                                                  | 2               |
| 50  | Clindamicina, combinaciones con                                                                          | 2               |
| 51  | Otros preparados para el corazon                                                                         | 2               |
| 52  | Terapia hepatica                                                                                         | 2               |
| 53  | Diazepam, combinaciones con                                                                              | 2               |
| 54  | Fosfato de sodio                                                                                         | 2               |
| 55  | Otros inmunoestimulantes                                                                                 | 2               |
| 56  | Ergotamina, combinaciones excluyendo psicolepticos                                                       | 2               |
| 57  | Fluocinolona con antibioticos                                                                            | 2               |
| 58  | Otros agentes diagnosticos                                                                               | 2               |
| 59  | Hidrocortisona con antibioticos                                                                          | 2               |
| 60  | Vitaminas del complejo B, otras combinaciones                                                            | 2               |
| 61  | Lactobacilo, fermento                                                                                    | 2               |
| 62  | Lidocaina, combinaciones con                                                                             | 2               |
| 63  | Macrogol                                                                                                 | 2               |
| 64  | Manitol                                                                                                  | 2               |
| 65  | Monoxido de carbono, combinaciones con                                                                   | 2               |
| 66  | Oxido nitroso                                                                                            | 2               |
| 67  | Polen de plantas                                                                                         | 2               |
| 68  | Poliestireno, sulfonato de                                                                               | 2               |
| 69  | Ramipril y diureticos                                                                                    | 2               |
| 70  | Sulfonamidas asociadas a mucolitico y/o expectorante                                                     | 2               |
| 71  | Expectorantes                                                                                            | 2               |
| 72  | Vitamina B1 en combinacion con vitamina B6 y/o vitamina B12                                              | 2               |
| 73  | Triamcinolona con antibioticos                                                                           | 2               |
| 74  | Tropicamida, combinaciones con                                                                           | 2               |
| 75  | Insectos                                                                                                 | 2               |
| 76  | Productos con zinc                                                                                       | 2               |
| 77  | Codeina y acido acetilsalicilico                                                                         | 2               |
| 78  | Sales minerales en combinacion                                                                           | 2               |
| 79  | Lamivudina y abacavir                                                                                    | 1               |
| 80  | Abemaciclib                                                                                              | 1               |
| 81  | Aceite de ricino                                                                                         | 1               |
| 82  | Acetilcisteina                                                                                           | 1               |
| 83  | Acetilcolina                                                                                             | 1               |
| 84  | Acido acetilsalicilico                                                                                   | 1               |
| 85  | Aciclovir, combinaciones con                                                                             | 1               |
| 86  | Acoramidis                                                                                               | 1               |
| 87  | Adapaleno, combinaciones con                                                                             | 1               |
| 88  | Afatinib                                                                                                 | 1               |
| 89  | Agalsidasa alfa                                                                                          | 1               |
| 90  | Agalsidasa beta                                                                                          | 1               |
| 91  | Agua para preparaciones inyectables                                                                      | 1               |
| 92  | Tecnecio (99mTc) macrosalb                                                                               | 1               |
| 93  | Tecnecio (99mTc) nanocoloidal                                                                            | 1               |
| 94  | Alcohol diclorobencilico                                                                                 | 1               |
| 95  | Otros antisepticos y desinfectantes                                                                      | 1               |
| 96  | Cetilpiridinio, cloruro de                                                                               | 1               |
| 97  | ANTISEPTICOS Y DESINFECTANTES                                                                            | 1               |
| 98  | Aldesleukina                                                                                             | 1               |
| 99  | Alemtuzumab                                                                                              | 1               |
| 100 | Alfa1 antitripsina                                                                                       | 1               |
| 101 | Alglucosidasa alfa                                                                                       | 1               |
| 102 | Alimemazina                                                                                              | 1               |
| 103 | Alitretinoina                                                                                            | 1               |
| 104 | Cascara, combinaciones con                                                                               | 1               |
| 105 | Alpelisib                                                                                                | 1               |
| 106 | Hidroclorotiazida y agentes ahorradores de potasio                                                       | 1               |
| 107 | Aminolevulinato de metilo                                                                                | 1               |
| 108 | Amisulprida                                                                                              | 1               |
| 109 | Amitriptilina y psicolepticos                                                                            | 1               |
| 110 | Amivantamab                                                                                              | 1               |
| 111 | Amorolfina                                                                                               | 1               |
| 112 | Anakinra                                                                                                 | 1               |
| 113 | Meglumina, antimoniato de                                                                                | 1               |
| 114 | Antitrombina III                                                                                         | 1               |
| 115 | Apraclonidina                                                                                            | 1               |
| 116 | Vasopresina (argipresina)                                                                                | 1               |
| 117 | Arsenico, trioxido de                                                                                    | 1               |
| 118 | Articaina, combinaciones con                                                                             | 1               |
| 119 | Asciminib                                                                                                | 1               |
| 120 | Atazanavir y cobicistat                                                                                  | 1               |
| 121 | Atenolol y otros diureticos                                                                              | 1               |
| 122 | Atidarsagen autotemcel                                                                                   | 1               |
| 123 | Atogepant                                                                                                | 1               |
| 124 | Atorvastatina y amlodipino                                                                               | 1               |
| 125 | Atorvastatina y ezetimiba                                                                                | 1               |
| 126 | Atorvastatina, acido acetilsalicilico y ramipril                                                         | 1               |
| 127 | Atropina                                                                                                 | 1               |
| 128 | Avacopan                                                                                                 | 1               |
| 129 | Avalglucosidasa alfa                                                                                     | 1               |
| 130 | Avapritinib                                                                                              | 1               |
| 131 | Avelumab                                                                                                 | 1               |
| 132 | Axitinib                                                                                                 | 1               |
| 133 | Sulfato de bario con agentes en suspension                                                               | 1               |
| 134 | Basiliximab                                                                                              | 1               |
| 135 | Beclometasona                                                                                            | 1               |
| 136 | Corticosteroides potentes, otras combinaciones                                                           | 1               |
| 137 | Formoterol, glicopirronio, bromuro de y beclometasona                                                    | 1               |
| 138 | Beclometasona con antibioticos                                                                           | 1               |
| 139 | Belatacept                                                                                               | 1               |
| 140 | Bendamustina                                                                                             | 1               |
| 141 | Benzocaina                                                                                               | 1               |
| 142 | Berotralstat                                                                                             | 1               |
| 143 | Betametasona con antibioticos                                                                            | 1               |
| 144 | Betaxolol                                                                                                | 1               |
| 145 | Betaina                                                                                                  | 1               |
| 146 | Abedul, corteza                                                                                          | 1               |
| 147 | Bexaroteno                                                                                               | 1               |
| 148 | Bibrocatol                                                                                               | 1               |
| 149 | Bicalutamida                                                                                             | 1               |
| 150 | Tecnecio (99mTc), bicisato de                                                                            | 1               |
| 151 | Bifonazol                                                                                                | 1               |
| 152 | Binimetinib                                                                                              | 1               |
| 153 | Biotina                                                                                                  | 1               |
| 154 | Bisoprolol y tiazidas                                                                                    | 1               |
| 155 | Bleomicina                                                                                               | 1               |
| 156 | Blinatumomab                                                                                             | 1               |
| 157 | Bosutinib                                                                                                | 1               |
| 158 | Brexucabtagen autoleucel                                                                                 | 1               |
| 159 | Brigatinib                                                                                               | 1               |
| 160 | Brinzolamida                                                                                             | 1               |
| 161 | Brinzolamida, combinaciones                                                                              | 1               |
| 162 | Brivudina                                                                                                | 1               |
| 163 | Brolucizumab                                                                                             | 1               |
| 164 | Bromelaina                                                                                               | 1               |
| 165 | Bromfenaco                                                                                               | 1               |
| 166 | Ipratropio, bromuro de                                                                                   | 1               |
| 167 | Umeclidinio bromuro                                                                                      | 1               |
| 168 | Brotizolam                                                                                               | 1               |
| 169 | Formoterol y budesonida                                                                                  | 1               |
| 170 | Bulevirtida                                                                                              | 1               |
| 171 | Bupivacaina, combinaciones con                                                                           | 1               |
| 172 | Bupivacaina                                                                                              | 1               |
| 173 | Buserelina                                                                                               | 1               |
| 174 | Busulfano                                                                                                | 1               |
| 175 | Butilescopolamina y analgesicos                                                                          | 1               |
| 176 | Tul con balsamo de Peru, combinaciones con                                                               | 1               |
| 177 | Cabazitaxel                                                                                              | 1               |
| 178 | Cabozantinib                                                                                             | 1               |
| 179 | Cafeina                                                                                                  | 1               |
| 180 | Calcio acetato                                                                                           | 1               |
| 181 | Acetato anhidro de calcio y carbonato de magnesio                                                        | 1               |
| 182 | Carbonato de calcio                                                                                      | 1               |
| 183 | Calcio, combinaciones con, vitamina D y/o otros farmacos                                                 | 1               |
| 184 | Combinaciones de sales simples                                                                           | 1               |
| 185 | Otros agentes contra la ulcera peptica y el reflujo gastroesofagico (RGE/GORD)                           | 1               |
| 186 | Cloruro de calcio                                                                                        | 1               |
| 187 | Dobesilato de calcio                                                                                     | 1               |
| 188 | Fosfato de calcio                                                                                        | 1               |
| 189 | Gluconato de calcio                                                                                      | 1               |
| 190 | Calcio pidolato y colecalciferol, combinaciones con                                                      | 1               |
| 191 | Calcipotriol, combinaciones con                                                                          | 1               |
| 192 | Sinecatechines                                                                                           | 1               |
| 193 | Canakinumab                                                                                              | 1               |
| 194 | Candesartan y amlodipino                                                                                 | 1               |
| 195 | Candesartan, amlodipino e hidroclorotiazida                                                              | 1               |
| 196 | Candesartan y diureticos                                                                                 | 1               |
| 197 | Capmatinib                                                                                               | 1               |
| 198 | Tecnecio (99mTc) tecnegas                                                                                | 1               |
| 199 | Carmustina                                                                                               | 1               |
| 200 | Levocarnitina                                                                                            | 1               |
| 201 | Estimulantes del apetito                                                                                 | 1               |
| 202 | Carteolol                                                                                                | 1               |
| 203 | Glicosidos de sena, combinaciones con                                                                    | 1               |
| 204 | Otros laxantes                                                                                           | 1               |
| 205 | Catridecacog                                                                                             | 1               |
| 206 | Cefepima e inihibidores de la betalactamasa                                                              | 1               |
| 207 | Cemiplimab                                                                                               | 1               |
| 208 | Antagonistas de la vasopresina                                                                           | 1               |
| 209 | Centella asiatica planta medicinal                                                                       | 1               |
| 210 | Ceritinib                                                                                                | 1               |
| 211 | Cerliponasa alfa                                                                                         | 1               |
| 212 | Cianocobalamina, combinaciones con                                                                       | 1               |
| 213 | Ciclosilicato de sodio y zirconio                                                                        | 1               |
| 214 | Ciltacabtagen autoleucel                                                                                 | 1               |
| 215 | Rizoma de Cimicifuga                                                                                     | 1               |
| 216 | Cinarizina, combinaciones con                                                                            | 1               |
| 217 | cipaglucosidasa alfa                                                                                     | 1               |
| 218 | Citicolina                                                                                               | 1               |
| 219 | Citisiniclina                                                                                            | 1               |
| 220 | Erbio (169Er) citrato coloidal                                                                           | 1               |
| 221 | Cleboprida                                                                                               | 1               |
| 222 | Clocinizina en asociacion                                                                                | 1               |
| 223 | Clofarabina                                                                                              | 1               |
| 224 | Clometiazol                                                                                              | 1               |
| 225 | Clonixinato de lisina                                                                                    | 1               |
| 226 | Clorambucilo                                                                                             | 1               |
| 227 | Clordiazepoxido                                                                                          | 1               |
| 228 | Simpaticomimeticos, combinaciones excluyendo corticosteroides                                            | 1               |
| 229 | Clormadinona y etinilestradiol                                                                           | 1               |
| 230 | Clormetina                                                                                               | 1               |
| 231 | Cloroprocaina                                                                                            | 1               |
| 232 | Clortetraciclina                                                                                         | 1               |
| 233 | Cloruro de metiltioninio                                                                                 | 1               |
| 234 | Clotiapina                                                                                               | 1               |
| 235 | Alquitranes                                                                                              | 1               |
| 236 | Cobimetinib                                                                                              | 1               |
| 237 | Tecnecio (99mTc) sestamibi                                                                               | 1               |
| 238 | Colchicina combinaciones con                                                                             | 1               |
| 239 | Colistina                                                                                                | 1               |
| 240 | CALCIO                                                                                                   | 1               |
| 241 | Otros agentes antirreumaticos especificos                                                                | 1               |
| 242 | Coriogonadotropina alfa                                                                                  | 1               |
| 243 | Asparaginasa                                                                                             | 1               |
| 244 | Acido cromoglicico                                                                                       | 1               |
| 245 | Crovalimab                                                                                               | 1               |
| 246 | Dabrafenib                                                                                               | 1               |
| 247 | Dacarbazina                                                                                              | 1               |
| 248 | Dacomitinib                                                                                              | 1               |
| 249 | Danaparoid                                                                                               | 1               |
| 250 | Danicopan                                                                                                | 1               |
| 251 | Metformina y dapagliflozina                                                                              | 1               |
| 252 | Dapoxetina                                                                                               | 1               |
| 253 | Daratumumab                                                                                              | 1               |
| 254 | Daridorexant                                                                                             | 1               |
| 255 | Darunavir y cobicistat                                                                                   | 1               |
| 256 | Emtricitabina, tenofovir alafenamida, darunavir y cobicistat                                             | 1               |
| 257 | Daunorubicina                                                                                            | 1               |
| 258 | Citarabina y daunorubicina                                                                               | 1               |
| 259 | Decitabina                                                                                               | 1               |
| 260 | Decitabina, combinaciones con                                                                            | 1               |
| 261 | Decualinio, cloruro                                                                                      | 1               |
| 262 | Delapril y manidipino                                                                                    | 1               |
| 263 | Delgocitinib                                                                                             | 1               |
| 264 | Acaros de polvo ambiental                                                                                | 1               |
| 265 | Desfesoterodina                                                                                          | 1               |
| 266 | Desogestrel y estrogeno                                                                                  | 1               |
| 267 | Dexanfetamina                                                                                            | 1               |
| 268 | Dexclorfeniramina                                                                                        | 1               |
| 269 | Antihistaminicos para uso topico                                                                         | 1               |
| 270 | Dexibuprofeno                                                                                            | 1               |
| 271 | Supresores de la tos y expectorantes                                                                     | 1               |
| 272 | BMP-2                                                                                                    | 1               |
| 273 | Diclofenaco, combinaciones con                                                                           | 1               |
| 274 | Dienogest y estrogeno                                                                                    | 1               |
| 275 | Dienogest y etinilestradiol                                                                              | 1               |
| 276 | Difelicefalina                                                                                           | 1               |
| 277 | Diflucortolona                                                                                           | 1               |
| 278 | Dihidrocodeina                                                                                           | 1               |
| 279 | Dihidroergocristina                                                                                      | 1               |
| 280 | Difenhidramina, combinaciones con                                                                        | 1               |
| 281 | Dimetindeno                                                                                              | 1               |
| 282 | Dinutuximab beta                                                                                         | 1               |
| 283 | Diosmina                                                                                                 | 1               |
| 284 | Diosmina, combinaciones con                                                                              | 1               |
| 285 | Diprofilina, combinaciones con                                                                           | 1               |
| 286 | Dioxido de carbono                                                                                       | 1               |
| 287 | Lamivudina y dolutegravir                                                                                | 1               |
| 288 | Dolutegravir y Rilpivirina                                                                               | 1               |
| 289 | Donepezilo y memantina                                                                                   | 1               |
| 290 | Dostarlimab                                                                                              | 1               |
| 291 | Doxilamina                                                                                               | 1               |
| 292 | Doxilamina, combinaciones con                                                                            | 1               |
| 293 | Cannabinoides                                                                                            | 1               |
| 294 | Drospirenona y estetrol                                                                                  | 1               |
| 295 | Progestagenos y estrogenos, combinaciones                                                                | 1               |
| 296 | Drospirenona y estrogeno                                                                                 | 1               |
| 297 | Tamsulosina y dutasterida                                                                                | 1               |
| 298 | Eberconazol                                                                                              | 1               |
| 299 | Otros preparados para la garganta                                                                        | 1               |
| 300 | galio (68Ga) edoteotrida                                                                                 | 1               |
| 301 | Emtricitabina, tenofovir disoproxilo y efavirenz                                                         | 1               |
| 302 | Efgartigimod alfa                                                                                        | 1               |
| 303 | Eliglustat                                                                                               | 1               |
| 304 | Elosulfasa alfa                                                                                          | 1               |
| 305 | Elotuzumab                                                                                               | 1               |
| 306 | Elranatamab                                                                                              | 1               |
| 307 | Emtricitabina, tenofovir disoproxilo, elvitegravir y cobicistat                                          | 1               |
| 308 | Emtricitabina, tenofovir alafenamida, elvitegravir y cobicistat                                          | 1               |
| 309 | Emedastina                                                                                               | 1               |
| 310 | Metformina y empagliflozina                                                                              | 1               |
| 311 | Emtricitabina, tenofovir disoproxilo y rilpivirina                                                       | 1               |
| 312 | Emtricitabina, tenofovir alafenamida y rilpivirina                                                       | 1               |
| 313 | Tenofovir disoproxilo y emtricitabina                                                                    | 1               |
| 314 | Emtricitabina y tenofovir alafenamida                                                                    | 1               |
| 315 | Emtricitabina, tenofovir alafenamida y bictegravir                                                       | 1               |
| 316 | Enalapril y diureticos                                                                                   | 1               |
| 317 | Enalapril y lercanidipino                                                                                | 1               |
| 318 | Enalapril y nitrendipino                                                                                 | 1               |
| 319 | Encorafenib                                                                                              | 1               |
| 320 | Entrectinib                                                                                              | 1               |
| 321 | Epcoritamab                                                                                              | 1               |
| 322 | Epirubicina                                                                                              | 1               |
| 323 | Eplontersen                                                                                              | 1               |
| 324 | Metoxi propilenglicol epoetina beta                                                                      | 1               |
| 325 | Eprosartan y diureticos                                                                                  | 1               |
| 326 | Factor VIIa de la coagulacion                                                                            | 1               |
| 327 | Eptinezumab                                                                                              | 1               |
| 328 | Otros agentes ahorradores de potasio                                                                     | 1               |
| 329 | Erdafitinib                                                                                              | 1               |
| 330 | Eribulina                                                                                                | 1               |
| 331 | Eritromicina, combinaciones con                                                                          | 1               |
| 332 | Erlotinib                                                                                                | 1               |
| 333 | Metformina y ertugliflozina                                                                              | 1               |
| 334 | Escina                                                                                                   | 1               |
| 335 | Otros agentes esclerosantes                                                                              | 1               |
| 336 | Lavandulae aetheroleum                                                                                   | 1               |
| 337 | Espesolimab                                                                                              | 1               |
| 338 | Espiramicina, combinacion con otros antibacterianos                                                      | 1               |
| 339 | Altizida y agentes ahorradores de potasio                                                                | 1               |
| 340 | Clortalidona y agentes ahorradores de potasio                                                            | 1               |
| 341 | Estreptoquinasa                                                                                          | 1               |
| 342 | Estriol                                                                                                  | 1               |
| 343 | Estrogenos conjugados y bazedoxifeno                                                                     | 1               |
| 344 | Etofenamato                                                                                              | 1               |
| 345 | Anillo vaginal con progestageno y estrogeno                                                              | 1               |
| 346 | Etranacogen dezaparvovec                                                                                 | 1               |
| 347 | Etrasimod                                                                                                | 1               |
| 348 | Etravirina                                                                                               | 1               |
| 349 | Evinacumab                                                                                               | 1               |
| 350 | Tecnecio (99mTc) exametazima                                                                             | 1               |
| 351 | Factor Von Willebrand y factor VIII de la coagulacion en combinacion                                     | 1               |
| 352 | Factor Von Willebrand                                                                                    | 1               |
| 353 | Factor X de la coagulacion                                                                               | 1               |
| 354 | Fampridina                                                                                               | 1               |
| 355 | Glicerol, fenilbutirato de                                                                               | 1               |
| 356 | Fenilbutirato de sodio                                                                                   | 1               |
| 357 | Fenilefrina, combinaciones con                                                                           | 1               |
| 358 | Fenticonazol                                                                                             | 1               |
| 359 | Hierro trivalente, preparados orales                                                                     | 1               |
| 360 | Ferroso glicina sulfato                                                                                  | 1               |
| 361 | Fezolinetant                                                                                             | 1               |
| 362 | Finasterida y tadalafilo                                                                                 | 1               |
| 363 | Flavoxato                                                                                                | 1               |
| 364 | florbetaben (18F)                                                                                        | 1               |
| 365 | Fludarabina                                                                                              | 1               |
| 366 | Fluodesoxiglucosa (18F)                                                                                  | 1               |
| 367 | Fluocinolona, acetonido y antiinfecciosos                                                                | 1               |
| 368 | Fluocinonida con antibioticos                                                                            | 1               |
| 369 | Fluocinonida                                                                                             | 1               |
| 370 | Fluoresceina                                                                                             | 1               |
| 371 | Fluorodopa 18F                                                                                           | 1               |
| 372 | Fluorocolina (18F)                                                                                       | 1               |
| 373 | Fluorometolona                                                                                           | 1               |
| 374 | Fluorouracilo, combinaciones con                                                                         | 1               |
| 375 | Flurazepam                                                                                               | 1               |
| 376 | Flutamida                                                                                                | 1               |
| 377 | Flutemetamol (18F)                                                                                       | 1               |
| 378 | Fluticasona, combinaciones con                                                                           | 1               |
| 379 | Formoterol y fluticasona                                                                                 | 1               |
| 380 | Vilanterol, umeclidinio, bromuro de y fluticasona, furoato de                                            | 1               |
| 381 | Vilanterol y furoato de fluticasona                                                                      | 1               |
| 382 | Flutrimazol                                                                                              | 1               |
| 383 | Fluvastatina                                                                                             | 1               |
| 384 | Folitropina delta                                                                                        | 1               |
| 385 | Fostamatinib                                                                                             | 1               |
| 386 | Fruquintinib                                                                                             | 1               |
| 387 | Fulvestrant                                                                                              | 1               |
| 388 | Fumarato de diroximel                                                                                    | 1               |
| 389 | Furosemida y agentes ahorradores de potasio                                                              | 1               |
| 390 | Futibatinib                                                                                              | 1               |
| 391 | Otros psicoestimulantes y nootropicos                                                                    | 1               |
| 392 | Gadopiclenol                                                                                             | 1               |
| 393 | Acido gadoxetico                                                                                         | 1               |
| 394 | Galio (67Ga), citrato de                                                                                 | 1               |
| 395 | Enzimas                                                                                                  | 1               |
| 396 | gefapixant                                                                                               | 1               |
| 397 | Gefitinib                                                                                                | 1               |
| 398 | Gemtuzumab ozogamicina                                                                                   | 1               |
| 399 | OTROS PRODUCTOS RADIOFARMACEUTICOS PARA DIAGNOSTICO                                                      | 1               |
| 400 | Gilteritinib                                                                                             | 1               |
| 401 | Ginkgo folium                                                                                            | 1               |
| 402 | Givinostat                                                                                               | 1               |
| 403 | Givosiran                                                                                                | 1               |
| 404 | Glicerofosfato de sodio                                                                                  | 1               |
| 405 | Glicerol                                                                                                 | 1               |
| 406 | Glimepirida y pioglitazona                                                                               | 1               |
| 407 | Glipizida                                                                                                | 1               |
| 408 | Glofitamab                                                                                               | 1               |
| 409 | Carbohidratos                                                                                            | 1               |
| 410 | Sales para rehidratacion oral                                                                            | 1               |
| 411 | Gonadotrofina corionica                                                                                  | 1               |
| 412 | Galio (68Ga) gozetotida                                                                                  | 1               |
| 413 | Combinaciones de diferentes antibioticos                                                                 | 1               |
| 414 | Otros farmacos para desordenes del sistema musculoesqueletico                                            | 1               |
| 415 | Hederae helicis folium                                                                                   | 1               |
| 416 | Hematina                                                                                                 | 1               |
| 417 | Heparina                                                                                                 | 1               |
| 418 | Hexafluoruro de azufre                                                                                   | 1               |
| 419 | Hexaminolevulinato                                                                                       | 1               |
| 420 | Miconazol, combinaciones con                                                                             | 1               |
| 421 | Hidroquinidina                                                                                           | 1               |
| 422 | Hidrosmina                                                                                               | 1               |
| 423 | Fumarato ferroso y acido folico                                                                          | 1               |
| 424 | Ferroso gluconato                                                                                        | 1               |
| 425 | Proteinsuccinilato ferrico                                                                               | 1               |
| 426 | Ferroso sulfato                                                                                          | 1               |
| 427 | Otros antidepresivos                                                                                     | 1               |
| 428 | Ibritumomab tiuxetan (90y)                                                                               | 1               |
| 429 | Codeina e ibuprofeno                                                                                     | 1               |
| 430 | Icatibanto                                                                                               | 1               |
| 431 | Trigliceridos omega-3, incluidos otros esteres y acidos                                                  | 1               |
| 432 | Idarubicina                                                                                              | 1               |
| 433 | Idecabtagen vicleucel                                                                                    | 1               |
| 434 | Idelalisib                                                                                               | 1               |
| 435 | Idursulfasa                                                                                              | 1               |
| 436 | Ifosfamida                                                                                               | 1               |
| 437 | Imidapril                                                                                                | 1               |
| 438 | Imiglucerasa                                                                                             | 1               |
| 439 | Imlifidasa                                                                                               | 1               |
| 440 | Indacaterol, glicopirronio, bromuro de y mometasona                                                      | 1               |
| 441 | Indacaterol y mometasona                                                                                 | 1               |
| 442 | Compuestos con Indio (111In)                                                                             | 1               |
| 443 | Indio (111In) pentetreotida                                                                              | 1               |
| 444 | Indio (111In), oxinato de, celulas marcadas con                                                          | 1               |
| 445 | Indio (111In), pentetato de                                                                              | 1               |
| 446 | Inebilizumab                                                                                             | 1               |
| 447 | Inhibidor de C1, derivado del plasma                                                                     | 1               |
| 448 | Inmunoglobulina antihepatitis B                                                                          | 1               |
| 449 | Inmunoglobulina anticitomegalovirus                                                                      | 1               |
| 450 | Inmunoglobulina antirrabica                                                                              | 1               |
| 451 | Inmunoglobulina antitetanica                                                                             | 1               |
| 452 | Inmunoglobulina antitimocitica (conejo)                                                                  | 1               |
| 453 | Inotersen                                                                                                | 1               |
| 454 | Inotuzumab ozogamicina                                                                                   | 1               |
| 455 | Insulina asparta                                                                                         | 1               |
| 456 | Insulina (humana)                                                                                        | 1               |
| 457 | Interferon beta-1a                                                                                       | 1               |
| 458 | Interferon beta-1b                                                                                       | 1               |
| 459 | Interferon gamma                                                                                         | 1               |
| 460 | Iobenguano (123I)                                                                                        | 1               |
| 461 | Iobitridol                                                                                               | 1               |
| 462 | Iodixanol                                                                                                | 1               |
| 463 | Yodo                                                                                                     | 1               |
| 464 | Iodo (131I) norcolesterol                                                                                | 1               |
| 465 | Iodo (123I) ioflupano                                                                                    | 1               |
| 466 | Iomeprol                                                                                                 | 1               |
| 467 | Iopamidol                                                                                                | 1               |
| 468 | Iopromida                                                                                                | 1               |
| 469 | Ioversol                                                                                                 | 1               |
| 470 | Irbesartan y amlodipino                                                                                  | 1               |
| 471 | Irbesartan y diureticos                                                                                  | 1               |
| 472 | Isatuximab                                                                                               | 1               |
| 473 | Isoniazida, combinaciones con                                                                            | 1               |
| 474 | Ivosidenib                                                                                               | 1               |
| 475 | Ketazolam                                                                                                | 1               |
| 476 | Zidovudina y lamivudina                                                                                  | 1               |
| 477 | Lanadelumab                                                                                              | 1               |
| 478 | Landiolol                                                                                                | 1               |
| 479 | Lapatinib                                                                                                | 1               |
| 480 | Laronidase                                                                                               | 1               |
| 481 | Larotrectinib                                                                                            | 1               |
| 482 | Latanoprost y netarsudil                                                                                 | 1               |
| 483 | Sodio lauril sulfoacetato, incluyendo combinaciones                                                      | 1               |
| 484 | Polidocanol                                                                                              | 1               |
| 485 | Lazertinib                                                                                               | 1               |
| 486 | Levocabastina                                                                                            | 1               |
| 487 | Levodopa                                                                                                 | 1               |
| 488 | Levodopa con inhibidor de la descarboxilasa e inhibidor de la COMT                                       | 1               |
| 489 | Levofolinato de calcio                                                                                   | 1               |
| 490 | Levometadona                                                                                             | 1               |
| 491 | Levonorgestrel y estrogeno                                                                               | 1               |
| 492 | Levosimendan                                                                                             | 1               |
| 493 | Levosulpirida                                                                                            | 1               |
| 494 | Lidocaina                                                                                                | 1               |
| 495 | Linagliptina y empagliflozina                                                                            | 1               |
| 496 | Metformina y linagliptina                                                                                | 1               |
| 497 | Lincomicina                                                                                              | 1               |
| 498 | Linzagolix                                                                                               | 1               |
| 499 | Lipegfilgrastim                                                                                          | 1               |
| 500 | Lisinopril y diureticos                                                                                  | 1               |
| 501 | Lisocabtagen maraleucel                                                                                  | 1               |
| 502 | Lomitapida                                                                                               | 1               |
| 503 | Loperamida, combinaciones con                                                                            | 1               |
| 504 | Loprazolam                                                                                               | 1               |
| 505 | Lovastatina                                                                                              | 1               |
| 506 | LUMASIRAN                                                                                                | 1               |
| 507 | Lutecio (177Lu) oxodotreotida                                                                            | 1               |
| 508 | Lutecio (177Lu) vipivotida tetraxetan                                                                    | 1               |
| 509 | Macimorelina                                                                                             | 1               |
| 510 | Macitentan y tadalafilo                                                                                  | 1               |
| 511 | Magnesio (combinacion de diferentes sales)                                                               | 1               |
| 512 | Hidroxido de magnesio                                                                                    | 1               |
| 513 | Lactato de magnesio                                                                                      | 1               |
| 514 | Pidolato de magnesio                                                                                     | 1               |
| 515 | Sulfato de magnesio                                                                                      | 1               |
| 516 | Productos varios para el tracto alimentario y el metabolismo                                             | 1               |
| 517 | cloruro de maralixibat                                                                                   | 1               |
| 518 | Marstacimab                                                                                              | 1               |
| 519 | Meclozina                                                                                                | 1               |
| 520 | Medroxiprogesterona y estrogeno                                                                          | 1               |
| 521 | Melatonina                                                                                               | 1               |
| 522 | Melfalan                                                                                                 | 1               |
| 523 | Melfalan flufenamida                                                                                     | 1               |
| 524 | Hipnoticos y sedantes en combinacion, excluyendo barbituricos                                            | 1               |
| 525 | Melitraceno y psicolepticos                                                                              | 1               |
| 526 | Menta piperita, aceite esencial de                                                                       | 1               |
| 527 | Mepiramina teofilinacetato                                                                               | 1               |
| 528 | Mepivacaina, combinaciones con                                                                           | 1               |
| 529 | Merbromina                                                                                               | 1               |
| 530 | Mercaptamina                                                                                             | 1               |
| 531 | Mesalazina                                                                                               | 1               |
| 532 | Mesterolona                                                                                              | 1               |
| 533 | Metacolina                                                                                               | 1               |
| 534 | Metamizol sodico                                                                                         | 1               |
| 535 | Metenolona                                                                                               | 1               |
| 536 | Metformina y alogliptina                                                                                 | 1               |
| 537 | Metformina y canagliflozina                                                                              | 1               |
| 538 | Metoprolol y felodipino                                                                                  | 1               |
| 539 | Mianserina                                                                                               | 1               |
| 540 | Midostaurina                                                                                             | 1               |
| 541 | Mifamurtida                                                                                              | 1               |
| 542 | Miglustat                                                                                                | 1               |
| 543 | Mitomicina                                                                                               | 1               |
| 544 | Mogamulizumab                                                                                            | 1               |
| 545 | Tecnecio (99mTc), pertecnetato de                                                                        | 1               |
| 546 | Momelotinib                                                                                              | 1               |
| 547 | Mometasona                                                                                               | 1               |
| 548 | Mometasona, combinaciones con                                                                            | 1               |
| 549 | Mononitrato de isosorbida                                                                                | 1               |
| 550 | Mosunetuzumab                                                                                            | 1               |
| 551 | Moxonidina                                                                                               | 1               |
| 552 | Vitaminas del complejo B con vitamina C                                                                  | 1               |
| 553 | Nabumetona                                                                                               | 1               |
| 554 | Nadifloxacino                                                                                            | 1               |
| 555 | Nafazolina                                                                                               | 1               |
| 556 | Nalmefeno                                                                                                | 1               |
| 557 | Naloxegol                                                                                                | 1               |
| 558 | Naproxeno                                                                                                | 1               |
| 559 | Nedocromil                                                                                               | 1               |
| 560 | Nelarabina                                                                                               | 1               |
| 561 | Nepafenaco                                                                                               | 1               |
| 562 | Neratinib                                                                                                | 1               |
| 563 | Nicotina                                                                                                 | 1               |
| 564 | Niraparib y abiraterona                                                                                  | 1               |
| 565 | Nitisinona                                                                                               | 1               |
| 566 | Trinitrato de glicerilo, combinaciones con                                                               | 1               |
| 567 | Nomegestrol y estrogeno                                                                                  | 1               |
| 568 | Norelgestromina y estrogeno                                                                              | 1               |
| 569 | Noretisterona y estrogeno                                                                                | 1               |
| 570 | Norgestimato y estrogeno                                                                                 | 1               |
| 571 | Norgestrel y estrogeno                                                                                   | 1               |
| 572 | L01FA03- Obinutuzumab                                                                                    | 1               |
| 573 | Olipudasa alfa                                                                                           | 1               |
| 574 | Olmesartan medoxomilo y amlodipino                                                                       | 1               |
| 575 | Olmesartan medoxomilo, amlodipino e hidroclorotiazida                                                    | 1               |
| 576 | Olmesartan medoxomilo y diureticos                                                                       | 1               |
| 577 | Omaveloxolona                                                                                            | 1               |
| 578 | Ospemifeno                                                                                               | 1               |
| 579 | Oxibato de sodio                                                                                         | 1               |
| 580 | Oxido nitrico                                                                                            | 1               |
| 581 | Tecnecio (99mTc) acido oxidronico                                                                        | 1               |
| 582 | Aire medicinal                                                                                           | 1               |
| 583 | Oxihidroxido sucroferrico                                                                                | 1               |
| 584 | Oximetazolina                                                                                            | 1               |
| 585 | Oxido nitroso, combinaciones con                                                                         | 1               |
| 586 | Pruebas para enfermedades alergicas                                                                      | 1               |
| 587 | Palopegteriparatida                                                                                      | 1               |
| 588 | Panitumumab                                                                                              | 1               |
| 589 | Tiocolchicosido, combinaciones con                                                                       | 1               |
| 590 | Parafina blanda y productos con grasa                                                                    | 1               |
| 591 | Parafina liquida                                                                                         | 1               |
| 592 | Parafina blanda, combinaciones con                                                                       | 1               |
| 593 | Patisiran                                                                                                | 1               |
| 594 | Pazopanib                                                                                                | 1               |
| 595 | Pegaspargasa                                                                                             | 1               |
| 596 | Pegcetacoplan                                                                                            | 1               |
| 597 | Peginterferon alfa-2a                                                                                    | 1               |
| 598 | Peginterferon beta-1a                                                                                    | 1               |
| 599 | Pegunigalsidasa alfa                                                                                     | 1               |
| 600 | Pegzilarginasa                                                                                           | 1               |
| 601 | PREPARADOS PARA LA TOS Y EL RESFRIADO                                                                    | 1               |
| 602 | Pemetrexed                                                                                               | 1               |
| 603 | Pemigatinib                                                                                              | 1               |
| 604 | Tecnecio (99mTc) acido pentetico                                                                         | 1               |
| 605 | Pentosan polisulfato de sodio                                                                            | 1               |
| 606 | Pentostatina                                                                                             | 1               |
| 607 | Albumina humana, microesferas de                                                                         | 1               |
| 608 | Periciazina                                                                                              | 1               |
| 609 | Perindopril y amlodipino                                                                                 | 1               |
| 610 | Perindopril, amlodipino e indapamida                                                                     | 1               |
| 611 | Perindopril y diureticos                                                                                 | 1               |
| 612 | Pertuzumab y trastuzumab                                                                                 | 1               |
| 613 | Picosulfato de sodio, combinaciones con                                                                  | 1               |
| 614 | Piflufolastat (18F)                                                                                      | 1               |
| 615 | Piketoprofeno                                                                                            | 1               |
| 616 | Pilocarpina                                                                                              | 1               |
| 617 | Pioglitazona y alogliptina                                                                               | 1               |
| 618 | Metformina y pioglitazona                                                                                | 1               |
| 619 | Artemisinina y derivados, combinaciones                                                                  | 1               |
| 620 | Piracetam                                                                                                | 1               |
| 621 | Piridostigmina                                                                                           | 1               |
| 622 | Tecnecio (99mTc), pirofosfato de                                                                         | 1               |
| 623 | Pirtobrutinib                                                                                            | 1               |
| 624 | Pitavastatina                                                                                            | 1               |
| 625 | Pizotifeno                                                                                               | 1               |
| 626 | Ispaghula (semillas de psyllium)                                                                         | 1               |
| 627 | Nitrato de plata                                                                                         | 1               |
| 628 | Podofilotoxina                                                                                           | 1               |
| 629 | polatuzumab vedotina                                                                                     | 1               |
| 630 | Polihexanida                                                                                             | 1               |
| 631 | Otros productos dermatologicos                                                                           | 1               |
| 632 | Acetato de potasio                                                                                       | 1               |
| 633 | Cloruro de potasio                                                                                       | 1               |
| 634 | Fosfato de potasio, incluyendo combinaciones con otras sales de potasio                                  | 1               |
| 635 | Bicarbonato de potasio                                                                                   | 1               |
| 636 | potasio (combinacion de diferentes sales)                                                                | 1               |
| 637 | Povidona iodada                                                                                          | 1               |
| 638 | Prasterona                                                                                               | 1               |
| 639 | Pravastatina y fenofibrato                                                                               | 1               |
| 640 | Prednisona asoc. a antiinfecciosos                                                                       | 1               |
| 641 | Procarbazina                                                                                             | 1               |
| 642 | Factor XIII de la coagulacion                                                                            | 1               |
| 643 | Progesterona y estrogeno                                                                                 | 1               |
| 644 | Promestrieno                                                                                             | 1               |
| 645 | Propifenazona, combinaciones excluyendo psicolepticos                                                    | 1               |
| 646 | Codeina, combinaciones con psicolepticos                                                                 | 1               |
| 647 | Propiverina                                                                                              | 1               |
| 648 | Proteina C                                                                                               | 1               |
| 649 | Sustitutos de la sangre y fracciones proteicas del plasma                                                | 1               |
| 650 | PSMA-1007 (18F)                                                                                          | 1               |
| 651 | Subcitrato de bismuto                                                                                    | 1               |
| 652 | Quinapril y diureticos                                                                                   | 1               |
| 653 | Quizartinib                                                                                              | 1               |
| 654 | Radio 223 dicloruro (223Ra)                                                                              | 1               |
| 655 | Raltitrexed                                                                                              | 1               |
| 656 | Ramipril y amlodipino                                                                                    | 1               |
| 657 | Ramipril, amlodipino e hidroclorotiazida                                                                 | 1               |
| 658 | Ramipril y bisoprolol                                                                                    | 1               |
| 659 | Ramipril y felodipino                                                                                    | 1               |
| 660 | Ramucirumab                                                                                              | 1               |
| 661 | Agentes para el diagnostico de tuberculosis                                                              | 1               |
| 662 | Regadenoson                                                                                              | 1               |
| 663 | Regorafenib                                                                                              | 1               |
| 664 | Relugolix, estradiol y norestisterona                                                                    | 1               |
| 665 | Renio (185Re) sulfuro coloidal                                                                           | 1               |
| 666 | Retinol (vit A)                                                                                          | 1               |
| 667 | Combinaciones de vitaminas                                                                               | 1               |
| 668 | Vitaminas                                                                                                | 1               |
| 669 | Cascara                                                                                                  | 1               |
| 670 | TONICOS                                                                                                  | 1               |
| 671 | Ribociclib                                                                                               | 1               |
| 672 | Rifamicina                                                                                               | 1               |
| 673 | Rifampicina e isoniazida                                                                                 | 1               |
| 674 | Rifampicina, pirazinamida e isoniazida                                                                   | 1               |
| 675 | Rifampicina, pirazinamida, etambutol e isoniazida                                                        | 1               |
| 676 | Rimegepant                                                                                               | 1               |
| 677 | Ripretinib                                                                                               | 1               |
| 678 | Rosuvastatina y ezetimiba                                                                                | 1               |
| 679 | Rosuvastatina y valsartan                                                                                | 1               |
| 680 | Rosuvastatina y acido acetilsalicilico                                                                   | 1               |
| 681 | Rozanolixizumab                                                                                          | 1               |
| 682 | Rucaparib                                                                                                | 1               |
| 683 | Rutosido, combinaciones con                                                                              | 1               |
| 684 | Sacituzumab govitecan                                                                                    | 1               |
| 685 | Tecnecio (99mTc) acido butedronico                                                                       | 1               |
| 686 | Salbutamol                                                                                               | 1               |
| 687 | Salbutamol y beclometasona                                                                               | 1               |
| 688 | Salbutamol e Ipratropio, bromuro de                                                                      | 1               |
| 689 | Salicilico acido combinaciones con                                                                       | 1               |
| 690 | Preparados con acido salicilico y derivados                                                              | 1               |
| 691 | Salmeterol y fluticasona                                                                                 | 1               |
| 692 | Otros productos terapeuticos                                                                             | 1               |
| 693 | Samario (153Sm) lexidronam                                                                               | 1               |
| 694 | Sapropterina                                                                                             | 1               |
| 695 | SATRALIZUMAB                                                                                             | 1               |
| 696 | Sebelipasa alfa                                                                                          | 1               |
| 697 | Selinexor                                                                                                | 1               |
| 698 | Selpercatinib                                                                                            | 1               |
| 699 | Selumetinib                                                                                              | 1               |
| 700 | Glicosidos de sena                                                                                       | 1               |
| 701 | Sabalis serrulatae fructus                                                                               | 1               |
| 702 | Serplulimab                                                                                              | 1               |
| 703 | Sertindol                                                                                                | 1               |
| 704 | Siltuximab                                                                                               | 1               |
| 705 | Simvastatina y ezetimiba                                                                                 | 1               |
| 706 | Sirolimus                                                                                                | 1               |
| 707 | Metformina y sitagliptina                                                                                | 1               |
| 708 | Antiacidos con bicarbonato de sodio                                                                      | 1               |
| 709 | Ioduro (123I) de sodio                                                                                   | 1               |
| 710 | Ioduro de sodio (131I)                                                                                   | 1               |
| 711 | Sofosbuvir, velpatasvir y voxilaprevir                                                                   | 1               |
| 712 | Albumina                                                                                                 | 1               |
| 713 | Somatrogon                                                                                               | 1               |
| 714 | Sonidegib                                                                                                | 1               |
| 715 | Sotatercept                                                                                              | 1               |
| 716 | Sotorasib                                                                                                | 1               |
| 717 | Subcitrato de bismuto, tetraciclina y metronidazol                                                       | 1               |
| 718 | Sulbutiamina                                                                                             | 1               |
| 719 | Sulfadiazina                                                                                             | 1               |
| 720 | Sulfametoxazol y trimetoprima                                                                            | 1               |
| 721 | Sumatriptan y naproxeno                                                                                  | 1               |
| 722 | Combinaciones de electrolitos                                                                            | 1               |
| 723 | Suxametonio, cloruro de                                                                                  | 1               |
| 724 | Tafamidis                                                                                                | 1               |
| 725 | Tafasitamab                                                                                              | 1               |
| 726 | Tafluprost                                                                                               | 1               |
| 727 | Talazoparib                                                                                              | 1               |
| 728 | Talidomida                                                                                               | 1               |
| 729 | Talio (201TL), cloruro de                                                                                | 1               |
| 730 | Talquetamab                                                                                              | 1               |
| 731 | Tamsulosina y solifenacina                                                                               | 1               |
| 732 | Tanato de albumina                                                                                       | 1               |
| 733 | Tasonermina                                                                                              | 1               |
| 734 | Tebentafusp                                                                                              | 1               |
| 735 | Teclistamab                                                                                              | 1               |
| 736 | Teduglutida                                                                                              | 1               |
| 737 | Tegafur                                                                                                  | 1               |
| 738 | Telmisartan y amlodipino                                                                                 | 1               |
| 739 | Telmisartan y diureticos                                                                                 | 1               |
| 740 | Telotristat                                                                                              | 1               |
| 741 | Temsirolimus                                                                                             | 1               |
| 742 | Tenofovir disoproxilo                                                                                    | 1               |
| 743 | Tepotinib                                                                                                | 1               |
| 744 | Terbutalina, combinaciones con                                                                           | 1               |
| 745 | Testosterona                                                                                             | 1               |
| 746 | Tetrizolina                                                                                              | 1               |
| 747 | Tecnecio (99mTc) tetrofosmina                                                                            | 1               |
| 748 | Tecnecio (99m Tc) hinio-octreotida                                                                       | 1               |
| 749 | Tiamazol                                                                                                 | 1               |
| 750 | Tildrakizumab                                                                                            | 1               |
| 751 | Tioconazol                                                                                               | 1               |
| 752 | Tioguanina                                                                                               | 1               |
| 753 | Tiopental sodico                                                                                         | 1               |
| 754 | Tiotepa                                                                                                  | 1               |
| 755 | Tirbanibulina                                                                                            | 1               |
| 756 | Tirofiban                                                                                                | 1               |
| 757 | Tirotropina                                                                                              | 1               |
| 758 | Tislelizumab                                                                                             | 1               |
| 759 | tivozanib                                                                                                | 1               |
| 760 | Tocoferol (vit E)                                                                                        | 1               |
| 761 | Tocofersolan                                                                                             | 1               |
| 762 | Tofersen                                                                                                 | 1               |
| 763 | Topotecan                                                                                                | 1               |
| 764 | Trabectedina                                                                                             | 1               |
| 765 | Tramadol y celecoxib                                                                                     | 1               |
| 766 | Tramadol y dexketoprofeno                                                                                | 1               |
| 767 | Tramadol y paracetamol                                                                                   | 1               |
| 768 | Tramazolina                                                                                              | 1               |
| 769 | Trametinib                                                                                               | 1               |
| 770 | Trandolapril y verapamilo                                                                                | 1               |
| 771 | Trastuzumab emtansina                                                                                    | 1               |
| 772 | Travoprost                                                                                               | 1               |
| 773 | Tremelimumab                                                                                             | 1               |
| 774 | Treosulfano                                                                                              | 1               |
| 775 | Treprostinilo                                                                                            | 1               |
| 776 | Triamcinolona                                                                                            | 1               |
| 777 | Otras preparaciones, combinaciones                                                                       | 1               |
| 778 | Triazolam                                                                                                | 1               |
| 779 | Trientina                                                                                                | 1               |
| 780 | Trifluridina, combinaciones con                                                                          | 1               |
| 781 | Triflusal                                                                                                | 1               |
| 782 | Trimipramina                                                                                             | 1               |
| 783 | Tripelenamina                                                                                            | 1               |
| 784 | Trospio, cloruro de                                                                                      | 1               |
| 785 | Troxerutina                                                                                              | 1               |
| 786 | Tuberculina                                                                                              | 1               |
| 787 | Tucatinib                                                                                                | 1               |
| 788 | Ublituximab                                                                                              | 1               |
| 789 | Vilanterol y Umeclidinio, bromuro de                                                                     | 1               |
| 790 | Urapidil                                                                                                 | 1               |
| 791 | 13C-urea                                                                                                 | 1               |
| 792 | Urofolitropina                                                                                           | 1               |
| 793 | Uroquinasa                                                                                               | 1               |
| 794 | Tuberculosis, micobacteria viva atenuada                                                                 | 1               |
| 795 | vacunas de subunidad proteica frente a COVID-19                                                          | 1               |
| 796 | Otras vacunas antivirales                                                                                | 1               |
| 797 | Colera, celula entera inactivada                                                                         | 1               |
| 798 | Vacunas frente al Dengue                                                                                 | 1               |
| 799 | Tetanico, toxoide, combinaciones con toxoide difterico                                                   | 1               |
| 800 | Pertussis, antigeno purificado, combinacion con toxoides                                                 | 1               |
| 801 | Difteria-pertussis-poliomielitis-tetanos                                                                 | 1               |
| 802 | Encefalitis japonesa, virus entero inactivado                                                            | 1               |
| 803 | Fiebre amarilla, virus vivo atenuado                                                                     | 1               |
| 804 | Influenza, antigeno purificado                                                                           | 1               |
| 805 | Haemophilus influenzae B, antigeno purificado conjugado                                                  | 1               |
| 806 | Hepatitis A, virus entero inactivado                                                                     | 1               |
| 807 | Hepatitis B, antigeno purificado de                                                                      | 1               |
| 808 | Difteria-Haemophilus influenzae B- pertussis-poliomielitis- tetanos-hepatitis B                          | 1               |
| 809 | zoster, antigeno purificado de                                                                           | 1               |
| 810 | Meningococo A, C, Y, W-135, antigeno conjugado tetravalente, constituido por polisacaridos purificados   | 1               |
| 811 | Meningococo B, vacuna multicomponente de                                                                 | 1               |
| 812 | Vacunas frente al meningococo                                                                            | 1               |
| 813 | Neumococo, antigeno constituido por polisacaridos purificados                                            | 1               |
| 814 | Poliomielitis, inactivado, virus entero, trivalente                                                      | 1               |
| 815 | Rabia, virus entero inactivado                                                                           | 1               |
| 816 | Rotavirus, virus vivo atenuado                                                                           | 1               |
| 817 | Sarampion, virus vivo atenuado combinado con la vacuna frente a la parotiditis y la rubeola              | 1               |
| 818 | Sarampion, virus vivo atenuado combinado con la vacuna frente a la parotiditis, la varicela y la rubeola | 1               |
| 819 | Tifoidea, antigeno constituido por polisacarido purificado                                               | 1               |
| 820 | Varicela, virus vivo atenuado                                                                            | 1               |
| 821 | Chikunguña, virus vivo atenuado                                                                          | 1               |
| 822 | Papilomavirus (tipos humanos 16, 18)                                                                     | 1               |
| 823 | Vacunas frente al virus respiratorio sincitial                                                           | 1               |
| 824 | Valerianae radix                                                                                         | 1               |
| 825 | Valsartan y amlodipino                                                                                   | 1               |
| 826 | Valsartan, amlodipino e hidroclorotiazida                                                                | 1               |
| 827 | Valsartan y diureticos                                                                                   | 1               |
| 828 | Vandetanib                                                                                               | 1               |
| 829 | Velaglucerasa Alfa                                                                                       | 1               |
| 830 | Velmanasa alfa                                                                                           | 1               |
| 831 | Vemurafenib                                                                                              | 1               |
| 832 | Verde de indocianina                                                                                     | 1               |
| 833 | Verteporfina                                                                                             | 1               |
| 834 | Vestronidasa alfa                                                                                        | 1               |
| 835 | Metformina y vildagliptina                                                                               | 1               |
| 836 | Vinblastina                                                                                              | 1               |
| 837 | Otros vasodilatadores perifericos                                                                        | 1               |
| 838 | Vinflunina                                                                                               | 1               |
| 839 | Vinorelbina                                                                                              | 1               |
| 840 | Vinpocetina                                                                                              | 1               |
| 841 | Vismodegib                                                                                               | 1               |
| 842 | Vitex agnus castus fruto                                                                                 | 1               |
| 843 | Otros agentes estabilizadores de capilares                                                               | 1               |
| 844 | Voclosporina                                                                                             | 1               |
| 845 | Volanesorsen                                                                                             | 1               |
| 846 | Voretigen neparvovec                                                                                     | 1               |
| 847 | Vosoritida                                                                                               | 1               |
| 848 | Vutrisiran                                                                                               | 1               |
| 849 | Xipamida                                                                                                 | 1               |
| 850 | Itrio (90Y) citrato coloidal                                                                             | 1               |
| 851 | Productos radiofarmaceuticos terapeuticos, varios                                                        | 1               |
| 852 | Zanubrutinib                                                                                             | 1               |
| 853 | Ziconotida                                                                                               | 1               |
| 854 | Zilucoplan                                                                                               | 1               |
| 855 | Acetato de zinc                                                                                          | 1               |
| 856 | Zinc acexamato                                                                                           | 1               |
| 857 | Zopiclona                                                                                                | 1               |
| 858 | Zuclopentixol                                                                                            | 1               |
| 859 | Acido aminolevulinico                                                                                    | 1               |
| 860 | Acido acetilsalicilico, combinaciones excluyendo psicolepticos                                           | 1               |
| 861 | Acido alendronico                                                                                        | 1               |
| 862 | Acido alendronico y colecalciferol                                                                       | 1               |
| 863 | Acido bempedoico y ezetimiba                                                                             | 1               |
| 864 | Acido carglumico                                                                                         | 1               |
| 865 | Acido colico                                                                                             | 1               |
| 866 | Tecnecio (99mTc) succimero                                                                               | 1               |
| 867 | Acido espaglumico                                                                                        | 1               |
| 868 | Acido gadobenico                                                                                         | 1               |
| 869 | Acido gadoterico                                                                                         | 1               |
| 870 | Acido ibandronico                                                                                        | 1               |
| 871 | Acido mefenamico                                                                                         | 1               |
| 872 | Acido micofenolico                                                                                       | 1               |
| 873 | Acido niflumico                                                                                          | 1               |
| 874 | Champues medicinales                                                                                     | 1               |
| 875 | Selenio (75Se) acido tauroselcolico                                                                      | 1               |

## Detalle por grupo

### (sin grupo terapéutico) — 193 entradas

| ID         | Nombre                                   | Familia                                             | Origen       |
| ---------- | ---------------------------------------- | --------------------------------------------------- | ------------ |
| `drug2785` | Sertindol                                | Antipsicóticos atípicos                             | hand-curated |
| `drug2786` | Zotepina                                 | Antipsicóticos atípicos                             | hand-curated |
| `drug2787` | Clorprotixeno                            | Antipsicóticos típicos                              | hand-curated |
| `drug2788` | Tioridazina                              | Antipsicóticos típicos                              | hand-curated |
| `drug2789` | Molindona                                | Antipsicóticos típicos                              | hand-curated |
| `drug2790` | Moclobemida                              | Antidepresivos IMAO                                 | hand-curated |
| `drug2791` | Tranilcipromina                          | Antidepresivos IMAO                                 | hand-curated |
| `drug2792` | Levomilnacipran                          | Antidepresivos IRSN                                 | hand-curated |
| `drug2793` | Escitalopram depot                       | Antidepresivos ISRS                                 | hand-curated |
| `drug2794` | Ketamina oral                            | Antidepresivos de accion rapida                     | hand-curated |
| `drug2795` | Clobazam                                 | Benzodiacepinas                                     | hand-curated |
| `drug2796` | Clorazepato                              | Benzodiacepinas                                     | hand-curated |
| `drug2797` | Oxazepam                                 | Benzodiacepinas                                     | hand-curated |
| `drug2798` | Pregabalina (ansiolitico)                | Analogos del GABA                                   | hand-curated |
| `drug2799` | Zolpidem                                 | Hipnoticos no benzodiazepinico                      | hand-curated |
| `drug2800` | Zaleplon                                 | Hipnoticos no benzodiazepinico                      | hand-curated |
| `drug2801` | Zopiclona                                | Hipnoticos no benzodiazepinico                      | hand-curated |
| `drug2802` | Lemborexant                              | Antagonistas duales de orexina                      | hand-curated |
| `drug2803` | Suvorexant                               | Antagonistas duales de orexina                      | hand-curated |
| `drug2804` | Acamprosato                              | Farmacos para deshabituacion alcoholica             | hand-curated |
| `drug2805` | Disulfiram                               | Farmacos aversivos para alcoholismo                 | hand-curated |
| `drug2806` | Nalmefeno                                | Antagonistas opioides                               | hand-curated |
| `drug2807` | Vareniclina                              | Farmacos para deshabituacion tabaquica              | hand-curated |
| `drug2808` | Lofexidina                               | Agonistas alfa-2 adrenergicos                       | hand-curated |
| `drug2809` | Citicolina                               | Neuroprotectores                                    | hand-curated |
| `drug2810` | Milrinona                                | Inotropicos positivos                               | hand-curated |
| `drug2811` | Levosimendan                             | Inotropicos positivos                               | hand-curated |
| `drug2812` | Fenilefrina                              | Vasopresores                                        | hand-curated |
| `drug2813` | Isoproterenol                            | Agonistas beta adrenergicos                         | hand-curated |
| `drug2814` | Efedrina                                 | Simpaticomimeticos mixtos                           | hand-curated |
| `drug2815` | Vasopresina                              | Vasopresores                                        | hand-curated |
| `drug2816` | Terlipresina                             | Analogos de vasopresina                             | hand-curated |
| `drug2817` | Azul de metileno                         | Antidotos y vasopresores                            | hand-curated |
| `drug2818` | Angiotensina II                          | Vasopresores                                        | hand-curated |
| `drug2819` | Hidrocortisona (shock)                   | Corticosteroides                                    | hand-curated |
| `drug2820` | Prostaglandina E1 (Alprostadil)          | Prostaglandinas                                     | hand-curated |
| `drug2821` | Indometacina (DAP)                       | AINEs                                               | hand-curated |
| `drug2822` | Ibuprofeno (DAP)                         | AINEs                                               | hand-curated |
| `drug2823` | Sildenafilo (neonatal)                   | Inhibidores de la fosfodiesterasa-5                 | hand-curated |
| `drug2824` | Bosentan (pediatrico)                    | Antagonistas de receptores de endotelina            | hand-curated |
| `drug2825` | Pirfenidona                              | Antifibroticos pulmonares                           | hand-curated |
| `drug2826` | Nintedanib                               | Antifibroticos pulmonares                           | hand-curated |
| `drug2827` | Pamrevlumab                              | Anticuerpos monoclonales antifibroticos             | hand-curated |
| `drug2828` | Pentraxina-2 (PRM-151)                   | Proteinas antifibroticas recombinantes              | hand-curated |
| `drug2829` | Epoprostenol                             | Prostanoides                                        | hand-curated |
| `drug2830` | Treprostinil                             | Prostanoides                                        | hand-curated |
| `drug2831` | Iloprost                                 | Prostanoides                                        | hand-curated |
| `drug2832` | Selexipag                                | Agonistas de receptores de prostaciclina            | hand-curated |
| `drug2833` | Macitentan                               | Antagonistas de receptores de endotelina            | hand-curated |
| `drug2834` | Ambrisentan                              | Antagonistas de receptores de endotelina            | hand-curated |
| `drug2835` | Riociguat                                | Estimuladores de la guanilato ciclasa soluble       | hand-curated |
| `drug2836` | Penciclovir                              | Antivirales topicos                                 | hand-curated |
| `drug2837` | Docosanol                                | Antivirales topicos                                 | hand-curated |
| `drug2838` | Cidofovir topico                         | Antivirales topicos                                 | hand-curated |
| `drug2839` | Foscarnet topico                         | Antivirales topicos                                 | hand-curated |
| `drug2840` | Imiquimod                                | Inmunomoduladores topicos                           | hand-curated |
| `drug2841` | Podofilotoxina                           | Antimitoticos topicos                               | hand-curated |
| `drug2842` | Atropina (SVA)                           | Anticolinergicos                                    | hand-curated |
| `drug2843` | Amiodarona (SVA)                         | Antiarritmicos                                      | hand-curated |
| `drug2844` | Lidocaina (SVA)                          | Antiarritmicos                                      | hand-curated |
| `drug2845` | Magnesio (SVA)                           | Electrolitos                                        | hand-curated |
| `drug2846` | Calcio (SVA)                             | Electrolitos                                        | hand-curated |
| `drug2847` | Bicarbonato sodico                       | Alcalinizantes                                      | hand-curated |
| `drug2848` | Dextrosa (SVA)                           | Soluciones glucosadas                               | hand-curated |
| `drug2849` | Dantroleno                               | Relajantes musculares de accion directa             | hand-curated |
| `drug2850` | Ciproheptadina                           | Antihistaminicos/Antiserotoninergicos               | hand-curated |
| `drug2851` | Fisostigmina                             | Inhibidores de la colinesterasa                     | hand-curated |
| `drug2852` | Pralidoxima (mejorado)                   | Reactivadores de colinesterasa                      | hand-curated |
| `drug2853` | Glucagon (toxicologia)                   | Hormonas contrarreguladores                         | hand-curated |
| `drug2854` | Hidroxocobalamina                        | Antidotos                                           | hand-curated |
| `drug2855` | Fomepizol                                | Antidotos                                           | hand-curated |
| `drug2856` | Halazepam                                | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug2857` | Prazepam                                 | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug2858` | Medazepam                                | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug2859` | Camazepam                                | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug2860` | Loprazolam                               | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug2861` | Flunitrazepam                            | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug2862` | Nitrazepam                               | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug2863` | Quazepam                                 | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug2864` | Estazolam                                | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug2865` | Flurazepam                               | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug2866` | Temazepam                                | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug2867` | Tasimelteon                              | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug2868` | Lisdexanfetamina                         | Psicoestimulantes y fármacos para TDAH              | hand-curated |
| `drug2869` | Guanfacina                               | Psicoestimulantes y fármacos para TDAH              | hand-curated |
| `drug2870` | Clonidina (TDAH)                         | Psicoestimulantes y fármacos para TDAH              | hand-curated |
| `drug2871` | Pitolisant                               | Psicoestimulantes y fármacos para TDAH              | hand-curated |
| `drug2872` | Solriamfetol                             | Psicoestimulantes y fármacos para TDAH              | hand-curated |
| `drug2873` | Lisdexanfetamina (TCA)                   | Fármacos para trastornos de la conducta alimentaria | hand-curated |
| `drug2874` | Metadona                                 | Fármacos para adicciones                            | hand-curated |
| `drug2875` | Naltrexona depot IM                      | Fármacos para adicciones                            | hand-curated |
| `drug2876` | Acamprosato                              | Fármacos para adicciones                            | hand-curated |
| `drug2877` | Citisinina                               | Fármacos para adicciones                            | hand-curated |
| `drug3000` | Litio (Carbonato)                        | Estabilizadores del ánimo                           | hand-curated |
| `drug3001` | Ácido Valproico (uso psiquiátrico)       | Estabilizadores del ánimo                           | hand-curated |
| `drug3002` | Lamotrigina (uso psiquiátrico)           | Estabilizadores del ánimo                           | hand-curated |
| `drug3003` | Carbamazepina (uso psiquiátrico)         | Estabilizadores del ánimo                           | hand-curated |
| `drug3004` | Oxcarbazepina (uso psiquiátrico)         | Estabilizadores del ánimo                           | hand-curated |
| `drug3005` | Topiramato (uso psiquiátrico)            | Estabilizadores del ánimo                           | hand-curated |
| `drug3006` | Gabapentina (uso psiquiátrico)           | Estabilizadores del ánimo                           | hand-curated |
| `drug3007` | Mianserina                               | Antidepresivos                                      | hand-curated |
| `drug3008` | Setiptilina                              | Antidepresivos                                      | hand-curated |
| `drug3009` | Milnaciprán (detallado)                  | Antidepresivos                                      | hand-curated |
| `drug3010` | Levomilnaciprán                          | Antidepresivos                                      | hand-curated |
| `drug3011` | Viloxazina                               | Antidepresivos                                      | hand-curated |
| `drug3012` | Opipramol                                | Antidepresivos                                      | hand-curated |
| `drug3013` | Dosulepin (Dotiepina)                    | Antidepresivos                                      | hand-curated |
| `drug3014` | Ludiomil (Maprotilina detallado)         | Antidepresivos                                      | hand-curated |
| `drug3015` | Trimipramina                             | Antidepresivos                                      | hand-curated |
| `drug3016` | Amineptina                               | Antidepresivos                                      | hand-curated |
| `drug3017` | Pipofezina                               | Antidepresivos                                      | hand-curated |
| `drug3018` | Minaprina                                | Antidepresivos                                      | hand-curated |
| `drug3019` | Medifoxamina                             | Antidepresivos                                      | hand-curated |
| `drug3020` | Pivagabina                               | Antidepresivos                                      | hand-curated |
| `drug3021` | Desvenlafaxina (detallado)               | Antidepresivos                                      | hand-curated |
| `drug3022` | Duloxetina (dolor neuropático detallado) | Antidepresivos                                      | hand-curated |
| `drug3023` | Vortioxetina (detallado)                 | Antidepresivos                                      | hand-curated |
| `drug3024` | Esketamina intranasal (detallado)        | Antidepresivos                                      | hand-curated |
| `drug3025` | Amisulprida                              | Antipsicóticos                                      | hand-curated |
| `drug3026` | Sertindol                                | Antipsicóticos                                      | hand-curated |
| `drug3027` | Zotepina                                 | Antipsicóticos                                      | hand-curated |
| `drug3028` | Clorprotixeno                            | Antipsicóticos                                      | hand-curated |
| `drug3029` | Zuclopentixol                            | Antipsicóticos                                      | hand-curated |
| `drug3030` | Zuclopentixol decanoato (depot)          | Antipsicóticos                                      | hand-curated |
| `drug3031` | Flupentixol                              | Antipsicóticos                                      | hand-curated |
| `drug3032` | Flupentixol decanoato (depot)            | Antipsicóticos                                      | hand-curated |
| `drug3033` | Penfluridol                              | Antipsicóticos                                      | hand-curated |
| `drug3034` | Pipotiazina                              | Antipsicóticos                                      | hand-curated |
| `drug3035` | Pipotiazina palmitato (depot)            | Antipsicóticos                                      | hand-curated |
| `drug3036` | Paliperidona palmitato (depot mensual)   | Antipsicóticos                                      | hand-curated |
| `drug3037` | Paliperidona palmitato trimestral        | Antipsicóticos                                      | hand-curated |
| `drug3038` | Risperidona depot (IM)                   | Antipsicóticos                                      | hand-curated |
| `drug3039` | Olanzapina pamoato (depot)               | Antipsicóticos                                      | hand-curated |
| `drug3040` | Aripiprazol lauroxil (depot)             | Antipsicóticos                                      | hand-curated |
| `drug3041` | Clotiapina                               | Antipsicóticos                                      | hand-curated |
| `drug3042` | Propericiazina                           | Antipsicóticos                                      | hand-curated |
| `drug3043` | Tioproperazina                           | Antipsicóticos                                      | hand-curated |
| `drug3044` | Proclorperazina (uso psiquiátrico)       | Antipsicóticos                                      | hand-curated |
| `drug3045` | Clobazam                                 | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3046` | Clorazepato dipotásico                   | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3047` | Oxazepam                                 | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3048` | Ketazolam                                | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3049` | Bentazepam                               | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3050` | Halazepam                                | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3051` | Prazepam                                 | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3052` | Medazepam                                | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3053` | Camazepam                                | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3054` | Loprazolam                               | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3055` | Flunitrazepam                            | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3056` | Lormetazepam                             | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3057` | Nitrazepam                               | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3058` | Quazepam                                 | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3059` | Estazolam                                | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3060` | Triazolam                                | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3061` | Flurazepam                               | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3062` | Temazepam                                | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3063` | Zolpidem                                 | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3064` | Zaleplon                                 | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3065` | Zopiclona                                | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3066` | Eszopiclona                              | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3067` | Suvorexant                               | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3068` | Lemborexant                              | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3069` | Daridorexant                             | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3070` | Ramelteon                                | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3071` | Tasimelteon                              | Ansiolíticos e hipnóticos                           | hand-curated |
| `drug3072` | Metilfenidato (detallado)                | Psicoestimulantes y fármacos para TDAH              | hand-curated |
| `drug3073` | Lisdexanfetamina                         | Psicoestimulantes y fármacos para TDAH              | hand-curated |
| `drug3074` | Atomoxetina                              | Psicoestimulantes y fármacos para TDAH              | hand-curated |
| `drug3075` | Guanfacina                               | Psicoestimulantes y fármacos para TDAH              | hand-curated |
| `drug3076` | Clonidina (TDAH)                         | Psicoestimulantes y fármacos para TDAH              | hand-curated |
| `drug3077` | Modafinilo                               | Psicoestimulantes y fármacos para TDAH              | hand-curated |
| `drug3078` | Armodafinilo                             | Psicoestimulantes y fármacos para TDAH              | hand-curated |
| `drug3079` | Pitolisant                               | Psicoestimulantes y fármacos para TDAH              | hand-curated |
| `drug3080` | Solriamfetol                             | Psicoestimulantes y fármacos para TDAH              | hand-curated |
| `drug3081` | Fluoxetina (bulimia)                     | Fármacos para trastornos de la conducta alimentaria | hand-curated |
| `drug3082` | Topiramato (TCA)                         | Fármacos para trastornos de la conducta alimentaria | hand-curated |
| `drug3083` | Naltrexona (TCA)                         | Fármacos para trastornos de la conducta alimentaria | hand-curated |
| `drug3084` | Lisdexanfetamina (TCA)                   | Fármacos para trastornos de la conducta alimentaria | hand-curated |
| `drug3085` | Olanzapina (anorexia)                    | Fármacos para trastornos de la conducta alimentaria | hand-curated |
| `drug3086` | Metadona                                 | Fármacos para adicciones                            | hand-curated |
| `drug3087` | Buprenorfina (adicciones)                | Fármacos para adicciones                            | hand-curated |
| `drug3088` | Buprenorfina/Naloxona (Suboxone)         | Fármacos para adicciones                            | hand-curated |
| `drug3089` | Naltrexona oral                          | Fármacos para adicciones                            | hand-curated |
| `drug3090` | Naltrexona depot IM                      | Fármacos para adicciones                            | hand-curated |
| `drug3091` | Acamprosato                              | Fármacos para adicciones                            | hand-curated |
| `drug3092` | Disulfiram                               | Fármacos para adicciones                            | hand-curated |
| `drug3093` | Nalmefeno                                | Fármacos para adicciones                            | hand-curated |
| `drug3094` | Vareniclina                              | Fármacos para adicciones                            | hand-curated |
| `drug3095` | Bupropión (tabaquismo)                   | Fármacos para adicciones                            | hand-curated |
| `drug3096` | Citisinina                               | Fármacos para adicciones                            | hand-curated |
| `drug3097` | Lofexidina                               | Fármacos para adicciones                            | hand-curated |
| `drug3098` | Clonidina (abstinencia opioides)         | Fármacos para adicciones                            | hand-curated |
| `drug3099` | Dexmedetomidina (delirium)               | Fármacos para adicciones                            | hand-curated |

### Antiinfecciosos — 151 entradas

| ID                                | Nombre                                      | Familia                                      | Origen       |
| --------------------------------- | ------------------------------------------- | -------------------------------------------- | ------------ |
| `ceftobiprol`                     | Ceftobiprol medocaril                       | Cefalosporinas de 5ª generación              | hand-curated |
| `imipenem_cilastatina_relebactam` | Imipenem/Cilastatina/Relebactam             | Carbapenémicos + inhibidor betalactamasa     | hand-curated |
| `nafcilina`                       | Nafcilina                                   | Penicilinas                                  | hand-curated |
| `oxacilina`                       | Oxacilina                                   | Penicilinas                                  | hand-curated |
| `cefaclor`                        | Cefaclor                                    | Cefalosporinas                               | hand-curated |
| `cefoxitina`                      | Cefoxitina                                  | Cefalosporinas                               | hand-curated |
| `ticarcilina_clavulanico`         | Ticarcilina/Clavulánico                     | Penicilinas                                  | hand-curated |
| `cefiderocol`                     | Cefiderocol                                 | Cefalosporinas                               | hand-curated |
| `cefmetazol`                      | Cefmetazol                                  | Cefalosporinas                               | hand-curated |
| `mecilinam`                       | Mecilinam (Pivmecilinam)                    | Penicilinas                                  | hand-curated |
| `ofloxacino`                      | Ofloxacino                                  | Quinolonas (fluoroquinolonas)                | hand-curated |
| `delafloxacino`                   | Delafloxacino                               | Quinolonas (fluoroquinolonas)                | hand-curated |
| `espiramicina`                    | Espiramicina                                | Macrólidos                                   | hand-curated |
| `roxitromicina`                   | Roxitromicina                               | Macrólidos                                   | hand-curated |
| `gemifloxacino`                   | Gemifloxacino                               | Quinolonas (fluoroquinolonas)                | hand-curated |
| `telitromicina`                   | Telitromicina                               | Macrólidos                                   | hand-curated |
| `minociclina_oral`                | Minociclina oral                            | Tetraciclinas                                | hand-curated |
| `estreptomicina`                  | Estreptomicina                              | Aminoglucósidos                              | hand-curated |
| `dalvabancina`                    | Dalbavancina                                | Glucopéptidos                                | hand-curated |
| `oritavancina`                    | Oritavancina                                | Glucopéptidos                                | hand-curated |
| `omadaciclina`                    | Omadaciclina                                | Tetraciclinas modernas                       | hand-curated |
| `lefamulina`                      | Lefamulina                                  | Pleuromutilinas                              | hand-curated |
| `eravaciclina`                    | Eravaciclina                                | Tetraciclinas modernas                       | hand-curated |
| `netilmicina`                     | Netilmicina                                 | Aminoglucósidos                              | hand-curated |
| `zidovudina`                      | Zidovudina (AZT)                            | Antirretrovirales                            | hand-curated |
| `estavudina`                      | Estavudina (d4T)                            | Antirretrovirales                            | hand-curated |
| `nevirapina`                      | Nevirapina                                  | Antirretrovirales                            | hand-curated |
| `lopinavir_ritonavir`             | Lopinavir/Ritonavir                         | Antirretrovirales                            | hand-curated |
| `darunavir`                       | Darunavir                                   | Antirretrovirales                            | hand-curated |
| `raltegravir`                     | Raltegravir                                 | Antirretrovirales                            | hand-curated |
| `maraviroc`                       | Maraviroc                                   | Antirretrovirales                            | hand-curated |
| `bictegravir`                     | Bictegravir                                 | Antirretrovirales                            | hand-curated |
| `cabotegravir`                    | Cabotegravir                                | Antirretrovirales                            | hand-curated |
| `doravirina`                      | Doravirina                                  | Antirretrovirales                            | hand-curated |
| `rilpivirina`                     | Rilpivirina                                 | Antirretrovirales                            | hand-curated |
| `emtricitabina`                   | Emtricitabina (FTC)                         | Antirretrovirales                            | hand-curated |
| `tenofovir_alafenamida`           | Tenofovir alafenamida (TAF)                 | Antirretrovirales                            | hand-curated |
| `cobicistat`                      | Cobicistat                                  | Antirretrovirales                            | hand-curated |
| `fostemsavir`                     | Fostemsavir                                 | Antirretrovirales                            | hand-curated |
| `lenacapavir`                     | Lenacapavir                                 | Antirretrovirales                            | hand-curated |
| `adefovir`                        | Adefovir dipivoxilo                         | Antivirales hepatitis B                      | hand-curated |
| `telbivudina`                     | Telbivudina                                 | Antivirales hepatitis B                      | hand-curated |
| `ledipasvir_sofosbuvir`           | Ledipasvir/Sofosbuvir                       | Antivirales acción directa (AAD) hepatitis C | hand-curated |
| `glecaprevir_pibrentasvir`        | Glecaprevir/Pibrentasvir                    | Antivirales acción directa (AAD) hepatitis C | hand-curated |
| `velpatasvir_sofosbuvir`          | Velpatasvir/Sofosbuvir                      | Antivirales acción directa (AAD) hepatitis C | hand-curated |
| `elbasvir_grazoprevir`            | Elbasvir/Grazoprevir                        | Antivirales acción directa (AAD) hepatitis C | hand-curated |
| `daclatasvir`                     | Daclatasvir                                 | Antivirales acción directa (AAD) hepatitis C | hand-curated |
| `simeprevir`                      | Simeprevir                                  | Antivirales acción directa (AAD) hepatitis C | hand-curated |
| `boceprevir`                      | Boceprevir                                  | Antivirales acción directa (AAD) hepatitis C | hand-curated |
| `griseofulvina`                   | Griseofulvina                               | Antifúngicos sistémicos                      | hand-curated |
| `terbinafina_sistemica`           | Terbinafina (Sistémica - Micosis profundas) | Antifúngicos sistémicos                      | hand-curated |
| `ketoconazol_oral`                | Ketoconazol (Oral)                          | Antifúngicos sistémicos                      | hand-curated |
| `miconazol_oral`                  | Miconazol (Gel oral)                        | Antifúngicos sistémicos                      | hand-curated |
| `natamicina`                      | Natamicina                                  | Antifúngicos sistémicos                      | hand-curated |
| `oteseconazol`                    | Oteseconazol                                | Antifúngicos sistémicos                      | hand-curated |
| `ibrexafungerp`                   | Ibrexafungerp                               | Antifúngicos sistémicos                      | hand-curated |
| `tavaborol`                       | Tavaborol                                   | Antifúngicos sistémicos                      | hand-curated |
| `delamanid`                       | Delamanid                                   | Antituberculosos                             | hand-curated |
| `pretomanid`                      | Pretomanid                                  | Antituberculosos                             | hand-curated |
| `clofazimina`                     | Clofazimina                                 | Antituberculosos                             | hand-curated |
| `acido_paraaminosalicilico`       | Ácido para-aminosalicílico (PAS)            | Antituberculosos                             | hand-curated |
| `linezolid_tb`                    | Linezolid (Uso antituberculoso)             | Antituberculosos                             | hand-curated |
| `artesunato`                      | Artesunato                                  | Antiparasitarios                             | hand-curated |
| `artemeter_lumefantrina`          | Arteméter/Lumefantrina                      | Antiparasitarios                             | hand-curated |
| `mefloquina`                      | Mefloquina                                  | Antiparasitarios                             | hand-curated |
| `quinina`                         | Quinina                                     | Antiparasitarios                             | hand-curated |
| `pirantel`                        | Pirantel                                    | Antiparasitarios                             | hand-curated |
| `niclosamida`                     | Niclosamida                                 | Antiparasitarios                             | hand-curated |
| `proguanil_atovacuona`            | Atovacuona/Proguanil                        | Antiparasitarios                             | hand-curated |
| `amodiaquina`                     | Amodiaquina                                 | Antiparasitarios                             | hand-curated |
| `piperacilina_tazobactam_det`     | Piperacilina/Tazobactam (detalle)           | Penicilinas                                  | hand-curated |
| `sultamicilina`                   | Sultamicilina                               | Penicilinas                                  | hand-curated |
| `ampicilina_sulbactam_det`        | Ampicilina/Sulbactam (detalle)              | Penicilinas                                  | hand-curated |
| `penicilina_v`                    | Penicilina V (Fenoximetilpenicilina)        | Penicilinas                                  | hand-curated |
| `penicilina_g_benzatinica`        | Penicilina G Benzatínica                    | Penicilinas                                  | hand-curated |
| `penicilina_g_procainica`         | Penicilina G Procaínica                     | Penicilinas                                  | hand-curated |
| `ceftarolina_det`                 | Ceftarolina (detalle)                       | Cefalosporinas                               | hand-curated |
| `cefepima_det`                    | Cefepima (detalle)                          | Cefalosporinas                               | hand-curated |
| `ceftolozano_tazobactam_det`      | Ceftolozano/Tazobactam (detalle)            | Cefalosporinas                               | hand-curated |
| `cefazolina_det`                  | Cefazolina (detalle)                        | Cefalosporinas                               | hand-curated |
| `cefalexina_det`                  | Cefalexina (detalle)                        | Cefalosporinas                               | hand-curated |
| `cefuroxima_det`                  | Cefuroxima (detalle)                        | Cefalosporinas                               | hand-curated |
| `tobramicina_sist`                | Tobramicina sistémica                       | Aminoglucósidos                              | hand-curated |
| `kanamicina`                      | Kanamicina                                  | Aminoglucósidos                              | hand-curated |
| `plazomicina_det`                 | Plazomicina (detalle)                       | Aminoglucósidos                              | hand-curated |
| `sisomicina`                      | Sisomicina                                  | Aminoglucósidos                              | hand-curated |
| `espectinomicina`                 | Espectinomicina                             | Aminociclitoles                              | hand-curated |
| `norfloxacino_det`                | Norfloxacino (detalle)                      | Quinolonas (fluoroquinolonas)                | hand-curated |
| `prulifloxacino`                  | Prulifloxacino                              | Quinolonas (fluoroquinolonas)                | hand-curated |
| `acido_nalidíxico`                | Ácido Nalidíxico                            | Quinolonas (fluoroquinolonas)                | hand-curated |
| `acido_pipemidico`                | Ácido Pipemídico                            | Quinolonas (fluoroquinolonas)                | hand-curated |
| `bedaquilina_det`                 | Bedaquilina (detalle)                       | Antituberculosos                             | hand-curated |
| `capreomicina_det`                | Capreomicina (detalle)                      | Antituberculosos                             | hand-curated |
| `cicloserina_det`                 | Cicloserina (detalle)                       | Antituberculosos                             | hand-curated |
| `acido_paraaminosalicilico_det`   | Ácido Paraaminosalicílico (PAS)             | Antituberculosos                             | hand-curated |
| `nitazoxanida_det`                | Nitazoxanida (detalle)                      | Antiparasitarios                             | hand-curated |
| `benznidazol_det`                 | Benznidazol (detalle)                       | Antiparasitarios                             | hand-curated |
| `nifurtimox`                      | Nifurtimox                                  | Antiparasitarios                             | hand-curated |
| `tinidazol_det`                   | Tinidazol (detalle)                         | Antiparasitarios                             | hand-curated |
| `secnidazol_det`                  | Secnidazol (detalle)                        | Antiparasitarios                             | hand-curated |
| `oseltamivir_det`                 | Oseltamivir (detalle)                       | Antivirales antigripales                     | hand-curated |
| `zanamivir`                       | Zanamivir                                   | Antivirales antigripales                     | hand-curated |
| `baloxavir`                       | Baloxavir marboxil                          | Antivirales antigripales                     | hand-curated |
| `peramivir`                       | Peramivir                                   | Antivirales antigripales                     | hand-curated |
| `tecovirimat`                     | Tecovirimat                                 | Antivirales (orthopoxvirus)                  | hand-curated |
| `cidofovir`                       | Cidofovir                                   | Antivirales (CMV y ADN virus)                | hand-curated |
| `brincidofovir`                   | Brincidofovir                               | Antivirales (ADN virus)                      | hand-curated |
| `nirmatrelvir_ritonavir_det`      | Nirmatrelvir/Ritonavir (detalle)            | Antivirales (SARS-CoV-2)                     | hand-curated |
| `molnupiravir`                    | Molnupiravir                                | Antivirales (SARS-CoV-2)                     | hand-curated |
| `remdesivir_det`                  | Remdesivir (detalle)                        | Antivirales (amplio espectro ARN)            | hand-curated |
| `abacavir_det`                    | Abacavir (detalle)                          | Antirretrovirales                            | hand-curated |
| `didanosina`                      | Didanosina (ddI)                            | Antirretrovirales                            | hand-curated |
| `efavirenz_det`                   | Efavirenz (detalle)                         | Antirretrovirales                            | hand-curated |
| `dolutegravir_det`                | Dolutegravir (detalle)                      | Antirretrovirales                            | hand-curated |
| `atazanavir_det`                  | Atazanavir (detalle)                        | Antirretrovirales                            | hand-curated |
| `caspofungina_det`                | Caspofungina (detalle)                      | Antifúngicos sistémicos                      | hand-curated |
| `micafungina_det`                 | Micafungina (detalle)                       | Antifúngicos sistémicos                      | hand-curated |
| `anidulafungina_det`              | Anidulafungina (detalle)                    | Antifúngicos sistémicos                      | hand-curated |
| `posaconazol_det`                 | Posaconazol (detalle)                       | Antifúngicos sistémicos                      | hand-curated |
| `isavuconazol_det`                | Isavuconazol (detalle)                      | Antifúngicos sistémicos                      | hand-curated |
| `penicilina_benzatinica`          | Penicilina Benzatínica                      | Penicilinas                                  | hand-curated |
| `penicilina_procainica`           | Penicilina Procaínica                       | Penicilinas                                  | hand-curated |
| `cefprozil`                       | Cefprozil                                   | Cefalosporinas                               | hand-curated |
| `ceftibuten`                      | Ceftibuten                                  | Cefalosporinas                               | hand-curated |
| `cefditoren`                      | Cefditoren                                  | Cefalosporinas                               | hand-curated |
| `cefoperazona_sulbactam`          | Cefoperazona/Sulbactam                      | Cefalosporinas                               | hand-curated |
| `imipenem_relebactam`             | Imipenem/Cilastatina/Relebactam             | Carbapenémicos + inhibidor betalactamasa     | hand-curated |
| `aztreonam_avibactam`             | Aztreonam/Avibactam                         | Monobactam + inhibidor betalactamasa         | hand-curated |
| `amikacina_inhalada`              | Amikacina Inhalada                          | Aminoglucósidos inhalados                    | hand-curated |
| `spectinomicina`                  | Espectinomicina                             | Aminociclitoles                              | hand-curated |
| `rifabutina`                      | Rifabutina                                  | Rifamicinas                                  | hand-curated |
| `rifapentina`                     | Rifapentina                                 | Rifamicinas                                  | hand-curated |
| `dapsona_lepra`                   | Dapsona                                     | Sulfonas                                     | hand-curated |
| `famciclovir`                     | Famciclovir                                 | Antivirales antiherpéticos                   | hand-curated |
| `valaciclovir`                    | Valaciclovir                                | Antivirales antiherpéticos                   | hand-curated |
| `baloxavir_marboxil`              | Baloxavir Marboxil                          | Antivirales antiinfluenza                    | hand-curated |
| `foscarnet`                       | Foscarnet                                   | Antivirales anti-CMV                         | hand-curated |
| `maribavir`                       | Maribavir                                   | Antivirales anti-CMV                         | hand-curated |
| `ribavirina`                      | Ribavirina                                  | Antivirales de amplio espectro               | hand-curated |
| `palivizumab`                     | Palivizumab                                 | Anticuerpos monoclonales antivirales         | hand-curated |
| `nirsevimab`                      | Nirsevimab                                  | Anticuerpos monoclonales antivirales         | hand-curated |
| `paromomicina`                    | Paromomicina                                | Antiparasitarios                             | hand-curated |
| `estibogluconato_sodico`          | Estibogluconato Sódico                      | Antiparasitarios                             | hand-curated |
| `suramin`                         | Suramina                                    | Antiparasitarios                             | hand-curated |
| `eflornitina`                     | Eflornitina                                 | Antiparasitarios                             | hand-curated |
| `tafenoquina`                     | Tafenoquina                                 | Antiparasitarios                             | hand-curated |
| `dietilcarbamazina`               | Dietilcarbamazina                           | Antiparasitarios                             | hand-curated |
| `triclabendazol`                  | Triclabendazol                              | Antiparasitarios                             | hand-curated |
| `furazolidona`                    | Furazolidona                                | Antiparasitarios                             | hand-curated |
| `anfotericina_liposomal`          | Anfotericina B Liposomal                    | Antifúngicos sistémicos                      | hand-curated |
| `rezafungina`                     | Rezafungina                                 | Antifúngicos sistémicos                      | hand-curated |

### Sistema Nervioso — 106 entradas

| ID                         | Nombre                                   | Familia                                    | Origen       |
| -------------------------- | ---------------------------------------- | ------------------------------------------ | ------------ |
| `midazolam`                | Midazolam                                | Benzodiacepinas                            | hand-curated |
| `droperidol`               | Droperidol                               | Antieméticos / Neurolépticos               | hand-curated |
| `quetiapina_im`            | Aripiprazol IM de liberación prolongada  | Antipsicóticos atípicos depot              | hand-curated |
| `valproato_iv`             | Valproato sódico IV (estatus epiléptico) | Anticonvulsivantes IV                      | hand-curated |
| `oximorfona`               | Oximorfona                               | Analgésicos opioides                       | hand-curated |
| `dihidrocodeina`           | Dihidrocodeína                           | Analgésicos opioides                       | hand-curated |
| `pentazocina`              | Pentazocina                              | Analgésicos opioides                       | hand-curated |
| `levorfanol`               | Levorfanol                               | Analgésicos opioides                       | hand-curated |
| `butorfanol`               | Butorfanol                               | Analgésicos opioides                       | hand-curated |
| `levobupivacaina`          | Levobupivacaína                          | Anestésicos locales                        | hand-curated |
| `articaina`                | Articaína                                | Anestésicos locales                        | hand-curated |
| `prilocaina`               | Prilocaína                               | Anestésicos locales                        | hand-curated |
| `cloroprocaina`            | Cloroprocaína                            | Anestésicos locales                        | hand-curated |
| `mepivacaina`              | Mepivacaína                              | Anestésicos locales                        | hand-curated |
| `tetracaina`               | Tetracaína                               | Anestésicos locales                        | hand-curated |
| `benzocaina`               | Benzocaína                               | Anestésicos locales                        | hand-curated |
| `procaina`                 | Procaína                                 | Anestésicos locales                        | hand-curated |
| `eslicarbazepina`          | Eslicarbazepina                          | Anticonvulsivantes                         | hand-curated |
| `cenobamato`               | Cenobamato                               | Anticonvulsivantes                         | hand-curated |
| `felbamato`                | Felbamato                                | Anticonvulsivantes                         | hand-curated |
| `tiagabina`                | Tiagabina                                | Anticonvulsivantes                         | hand-curated |
| `etosuximida`              | Etosuximida                              | Anticonvulsivantes                         | hand-curated |
| `fenfluramina_antiepi`     | Fenfluramina (antiepiléptico)            | Anticonvulsivantes                         | hand-curated |
| `opicapona`                | Opicapona                                | Antiparkinsonianos                         | hand-curated |
| `istradefilina`            | Istradefilina                            | Antiparkinsonianos                         | hand-curated |
| `tolcapona`                | Tolcapona                                | Antiparkinsonianos                         | hand-curated |
| `trihexifenidilo`          | Trihexifenidilo                          | Antiparkinsonianos                         | hand-curated |
| `carbidopa_levodopa_ec`    | Carbidopa/Levodopa EC                    | Antiparkinsonianos                         | hand-curated |
| `prociclidina`             | Prociclidina                             | Antiparkinsonianos                         | hand-curated |
| `sulpirida`                | Sulpirida                                | Antipsicóticos                             | hand-curated |
| `tiaprida`                 | Tiaprida                                 | Antipsicóticos                             | hand-curated |
| `levomepromazina`          | Levomepromazina                          | Antipsicóticos                             | hand-curated |
| `iloperidona`              | Iloperidona                              | Antipsicóticos                             | hand-curated |
| `loxapina_inhalada`        | Loxapina inhalada                        | Antipsicóticos                             | hand-curated |
| `perfenazina`              | Perfenazina                              | Antipsicóticos                             | hand-curated |
| `flufenazina`              | Flufenazina                              | Antipsicóticos                             | hand-curated |
| `trifluoperazina`          | Trifluoperazina                          | Antipsicóticos                             | hand-curated |
| `doxepina`                 | Doxepina                                 | Antidepresivos tricíclicos                 | hand-curated |
| `maprotilina`              | Maprotilina                              | Antidepresivos tricíclicos                 | hand-curated |
| `tianeptina`               | Tianeptina                               | Antidepresivos ISRS/ISRSN                  | hand-curated |
| `reboxetina`               | Reboxetina                               | Antidepresivos ISRS/ISRSN                  | hand-curated |
| `milnacipran`              | Milnaciprán                              | Antidepresivos ISRS/ISRSN                  | hand-curated |
| `fenelzina`                | Fenelzina                                | Antidepresivos ISRS/ISRSN                  | hand-curated |
| `dextroanfetamina`         | Dextroanfetamina                         | Psicoestimulantes                          | hand-curated |
| `solriamfetol`             | Solriamfetol                             | Promotores de vigilia                      | hand-curated |
| `armodafinilo`             | Armodafinilo                             | Promotores de vigilia                      | hand-curated |
| `rizatriptan`              | Rizatriptán                              | Triptanos (agonistas 5-HT1)                | hand-curated |
| `zolmitriptan`             | Zolmitriptán                             | Triptanos (agonistas 5-HT1)                | hand-curated |
| `naratriptan`              | Naratriptán                              | Triptanos (agonistas 5-HT1)                | hand-curated |
| `almotriptan`              | Almotriptán                              | Triptanos (agonistas 5-HT1)                | hand-curated |
| `eletriptan`               | Eletriptán                               | Triptanos (agonistas 5-HT1)                | hand-curated |
| `frovatriptan`             | Frovatriptán                             | Triptanos (agonistas 5-HT1)                | hand-curated |
| `lasmiditan`               | Lasmiditán                               | Triptanos (agonistas 5-HT1)                | hand-curated |
| `erenumab`                 | Erenumab                                 | Anticuerpos anti-CGRP                      | hand-curated |
| `galcanezumab`             | Galcanezumab                             | Anticuerpos anti-CGRP                      | hand-curated |
| `fremanezumab`             | Fremanezumab                             | Anticuerpos anti-CGRP                      | hand-curated |
| `fingolimod`               | Fingolimod                               | Fármacos para Esclerosis Múltiple          | hand-curated |
| `dimetilfumarato`          | Dimetilfumarato                          | Fármacos para Esclerosis Múltiple          | hand-curated |
| `natalizumab`              | Natalizumab                              | Fármacos para Esclerosis Múltiple          | hand-curated |
| `ocrelizumab`              | Ocrelizumab                              | Fármacos para Esclerosis Múltiple          | hand-curated |
| `teriflunomida`            | Teriflunomida                            | Fármacos para Esclerosis Múltiple          | hand-curated |
| `glatiramer`               | Glatirámero                              | Fármacos para Esclerosis Múltiple          | hand-curated |
| `siponimod`                | Siponimod                                | Fármacos para Esclerosis Múltiple          | hand-curated |
| `cladribina_oral`          | Cladribina oral                          | Fármacos para Esclerosis Múltiple          | hand-curated |
| `clorazepato`              | Clorazepato                              | Benzodiazepinas                            | hand-curated |
| `bromazepam`               | Bromazepam                               | Benzodiazepinas                            | hand-curated |
| `lormetazepam`             | Lormetazepam                             | Benzodiazepinas                            | hand-curated |
| `eszopiclona`              | Eszopiclona                              | Hipnóticos Z                               | hand-curated |
| `ramelteon`                | Ramelteon                                | Agonistas melatoninérgicos                 | hand-curated |
| `suvorexant`               | Suvorexant                               | Antagonistas de orexina                    | hand-curated |
| `lemborexant`              | Lemborexant                              | Antagonistas de orexina                    | hand-curated |
| `zaleplon`                 | Zaleplon                                 | Hipnóticos Z                               | hand-curated |
| `riluzol`                  | Riluzol                                  | Neuroprotectores                           | hand-curated |
| `tetrabenazina`            | Tetrabenazina                            | Fármacos para movimientos involuntarios    | hand-curated |
| `valbenazina`              | Valbenazina                              | Fármacos para movimientos involuntarios    | hand-curated |
| `toxina_botulinica_a`      | Toxina Botulínica tipo A                 | Toxinas terapéuticas                       | hand-curated |
| `edaravona`                | Edaravona                                | Neuroprotectores                           | hand-curated |
| `nusinersen`               | Nusinersén                               | Terapias génicas/antisentido               | hand-curated |
| `betahistina`              | Betahistina                              | Fármacos para vértigo                      | hand-curated |
| `flunarizina`              | Flunarizina                              | Profilácticos de migraña                   | hand-curated |
| `acamprosato`              | Acamprosato                              | Fármacos para trastornos adictivos         | hand-curated |
| `disulfiram`               | Disulfiram                               | Fármacos para trastornos adictivos         | hand-curated |
| `vareniclina`              | Vareniclina                              | Fármacos para trastornos adictivos         | hand-curated |
| `buprenorfina_naloxona`    | Buprenorfina/Naloxona                    | Fármacos para trastornos adictivos         | hand-curated |
| `naloxona_nasal`           | Naloxona nasal                           | Fármacos para trastornos adictivos         | hand-curated |
| `lofexidina`               | Lofexidina                               | Fármacos para trastornos adictivos         | hand-curated |
| `ropinirol`                | Ropinirol                                |                                            | hand-curated |
| `cannabidiol`              | Cannabidiol (CBD)                        |                                            | hand-curated |
| `esketamina`               | Esketamina                               |                                            | hand-curated |
| `oxicodona_naloxona`       | Oxicodona/Naloxona                       | Analgésicos opioides                       | hand-curated |
| `buprenorfina_parche`      | Buprenorfina Transdérmica                | Analgésicos opioides                       | hand-curated |
| `stiripentol`              | Estiripentol detallado                   | Anticonvulsivantes                         | hand-curated |
| `everolimus_epilepsia`     | Everolimús (Epilepsia)                   | Inhibidores de mTOR                        | hand-curated |
| `brexpiprazol_detalle`     | Brexpiprazol detallado                   | Antipsicóticos                             | hand-curated |
| `pimavanserin`             | Pimavanserin                             | Antipsicóticos                             | hand-curated |
| `venlafaxina_xr`           | Venlafaxina XR detallado                 | Antidepresivos ISRS/ISRSN                  | hand-curated |
| `clobazam_detalle`         | Clobazam detallado                       | Benzodiazepinas                            | hand-curated |
| `opicapona_detalle`        | Opicapona detallado                      | Antiparkinsonianos                         | hand-curated |
| `foslevodopa_foscarbidopa` | Foslevodopa/Foscarbidopa                 | Antiparkinsonianos de infusión continua    | hand-curated |
| `ofatumumab_em`            | Ofatumumab (EM)                          | Fármacos para Esclerosis Múltiple          | hand-curated |
| `ponesimod`                | Ponesimod                                | Fármacos para Esclerosis Múltiple          | hand-curated |
| `ganaxolona`               | Ganaxolona                               | Neuroesteroides anticonvulsivantes         | hand-curated |
| `naldemedina`              | Naldemedina                              | Antagonistas opioides periféricos (PAMORA) | hand-curated |
| `metilnaltrexona`          | Metilnaltrexona                          | Antagonistas opioides periféricos (PAMORA) | hand-curated |
| `tiapride`                 | Tiapride                                 | Benzamidas                                 | hand-curated |
| `onasemnogene`             | Onasemnogene Abeparvovec                 | Terapia génica                             | hand-curated |

### Fármacos Hospitalarios y Antineoplásicos — 101 entradas

| ID                           | Nombre                                           | Familia                         | Origen       |
| ---------------------------- | ------------------------------------------------ | ------------------------------- | ------------ |
| `noradrenalina`              | Noradrenalina (Norepinefrina)                    | Catecolaminas / Vasopresores    | hand-curated |
| `dopamina`                   | Dopamina                                         | Catecolaminas                   | hand-curated |
| `sulfato-magnesio`           | Sulfato de Magnesio                              | Electrolitos                    | hand-curated |
| `dobutamina`                 | Dobutamina                                       | Catecolaminas / Inotropico      | hand-curated |
| `ketamina_infusion`          | Ketamina (Infusión analgésica)                   | Analgésicos no opioides IV      | hand-curated |
| `dexmedetomidina_intranasal` | Dexmedetomidina intranasal (Sedación pediátrica) | Sedantes alfa-2 agonistas       | hand-curated |
| `irinotecan`                 | Irinotecán                                       | Inhibidores de topoisomerasa I  | hand-curated |
| `etoposido`                  | Etopósido                                        | Inhibidores de topoisomerasa II | hand-curated |
| `metotrexato_alta_dosis`     | Metotrexato alta dosis (oncológico)              | Antimetabolitos                 | hand-curated |
| `fosfato_sodico_iv`          | Fosfato sódico IV                                | Electrolitos de reposición      | hand-curated |
| `midazolam_anestesia`        | Midazolam (anestesia)                            | Anestésicos generales           | hand-curated |
| `fentanilo_anestesia`        | Fentanilo (anestesia)                            | Anestésicos generales           | hand-curated |
| `halotano`                   | Halotano                                         | Anestésicos generales           | hand-curated |
| `pancuronio`                 | Pancuronio                                       | Anestésicos generales           | hand-curated |
| `atracurio`                  | Atracurio                                        | Anestésicos generales           | hand-curated |
| `mivacurio`                  | Mivacurio                                        | Anestésicos generales           | hand-curated |
| `nicardipino_infusion`       | Nicardipino infusión                             |                                 | hand-curated |
| `octreotida_infusion`        | Octreótida infusión                              |                                 | hand-curated |
| `heparina_infusion`          | Heparina infusión continua                       |                                 | hand-curated |
| `insulina_infusion`          | Insulina infusión                                |                                 | hand-curated |
| `furosemida_infusion`        | Furosemida infusión                              |                                 | hand-curated |
| `vasopresina_infusion`       | Vasopresina infusión                             | Vasopresores e inotrópicos      | hand-curated |
| `hidralazina_iv`             | Hidralazina IV                                   |                                 | hand-curated |
| `amiodarona_infusion`        | Amiodarona infusión                              |                                 | hand-curated |
| `propofol_infusion`          | Propofol infusión UCI                            |                                 | hand-curated |
| `midazolam_infusion`         | Midazolam infusión UCI                           |                                 | hand-curated |
| `dexmedetomidina_infusion`   | Dexmedetomidina infusión                         |                                 | hand-curated |
| `ketamina_sedacion`          | Ketamina sedación                                |                                 | hand-curated |
| `fentanilo_infusion`         | Fentanilo infusión UCI                           |                                 | hand-curated |
| `morfina_infusion`           | Morfina infusión UCI                             |                                 | hand-curated |
| `clonidina_sedacion`         | Clonidina sedación                               |                                 | hand-curated |
| `remifentanilo_infusion`     | Remifentanilo infusión                           |                                 | hand-curated |
| `lipidos_mct_lct`            | Lípidos MCT/LCT                                  |                                 | hand-curated |
| `lipidos_omega3`             | Lípidos omega-3                                  |                                 | hand-curated |
| `smof_lipidos`               | SMOF Lípidos                                     |                                 | hand-curated |
| `glutamina_iv`               | Glutamina IV                                     |                                 | hand-curated |
| `multivitaminico_iv`         | Multivitamínico IV                               |                                 | hand-curated |
| `oligoelementos_iv`          | Oligoelementos IV                                |                                 | hand-curated |
| `fosfato_potasio_iv`         | Fosfato de potasio IV                            |                                 | hand-curated |
| `lipidos_oliva`              | Lípidos base oliva                               |                                 | hand-curated |
| `bortezomib`                 | Bortezomib                                       | Antineoplásicos                 | hand-curated |
| `venetoclax`                 | Venetoclax                                       | Antineoplásicos                 | hand-curated |
| `azacitidina`                | Azacitidina                                      | Antineoplásicos                 | hand-curated |
| `citarabina`                 | Citarabina                                       | Antineoplásicos                 | hand-curated |
| `temozolomida`               | Temozolomida                                     | Antineoplásicos                 | hand-curated |
| `cetuximab`                  | Cetuximab                                        | Antineoplásicos                 | hand-curated |
| `osimertinib`                | Osimertinib                                      | Antineoplásicos                 | hand-curated |
| `durvalumab`                 | Durvalumab                                       | Antineoplásicos                 | hand-curated |
| `ipilimumab`                 | Ipilimumab                                       | Antineoplásicos                 | hand-curated |
| `sunitinib`                  | Sunitinib                                        | Antineoplásicos                 | hand-curated |
| `palbociclib`                | Palbociclib                                      | Antineoplásicos                 | hand-curated |
| `pertuzumab`                 | Pertuzumab                                       | Antineoplásicos                 | hand-curated |
| `brentuximab`                | Brentuximab vedotina                             | Antineoplásicos                 | hand-curated |
| `mesna`                      | Mesna                                            |                                 | hand-curated |
| `dexrazoxano`                | Dexrazoxano                                      |                                 | hand-curated |
| `filgrastim_onco`            | Filgrastim (oncológico)                          |                                 | hand-curated |
| `zoledronic_onco`            | Ácido zoledrónico (oncológico)                   |                                 | hand-curated |
| `denosumab_onco`             | Denosumab (oncológico)                           |                                 | hand-curated |
| `salina_hipertonica`         | Solución salina hipertónica 3%                   |                                 | hand-curated |
| `dextrosa_5`                 | Dextrosa 5%                                      |                                 | hand-curated |
| `bicarbonato_infusion`       | Bicarbonato de sodio infusión                    |                                 | hand-curated |
| `cloruro_potasio_iv`         | Cloruro de potasio IV                            |                                 | hand-curated |
| `gluconato_calcio_iv`        | Gluconato de calcio IV                           |                                 | hand-curated |
| `sulfato_magnesio_iv`        | Sulfato de magnesio IV                           |                                 | hand-curated |
| `plasmalyte`                 | PlasmaLyte                                       |                                 | hand-curated |
| `gelatina_succinilada`       | Gelatina succinilada                             |                                 | hand-curated |
| `solucion_hartmann`          | Solución de Hartmann                             |                                 | hand-curated |
| `dextrosa_10`                | Dextrosa 10%                                     |                                 | hand-curated |
| `bupivacaina_epidural`       | Bupivacaína Epidural                             | Anestésicos locales             | hand-curated |
| `levobupivacaina_epidural`   | Levobupivacaína                                  | Anestésicos locales             | hand-curated |
| `clorprocaina_epidural`      | Clorprocaína                                     | Anestésicos locales             | hand-curated |
| `cisatracurio_detalle2`      | Cisatracurio (Infusión UCI)                      | Anestésicos generales           | hand-curated |
| `angiotensina_ii_synth`      | Angiotensina II Sintética                        | Vasopresores e inotrópicos      | hand-curated |
| `isoproterenol_infusion`     | Isoproterenol Infusión                           | Vasopresores e inotrópicos      | hand-curated |
| `levosimendan_infusion`      | Levosimendán Infusión                            | Inodilatadores                  | hand-curated |
| `nitroprusiato_infusion`     | Nitroprusiato de Sodio                           | Vasodilatadores directos        | hand-curated |
| `baclofeno_intratecal`       | Baclofeno Intratecal                             | Antiespasmódicos intratecales   | hand-curated |
| `dipeptiven`                 | Alanil-Glutamina                                 | Suplementos parenterales        | hand-curated |
| `selenio_iv`                 | Selenio IV                                       | Oligoelementos parenterales     | hand-curated |
| `vitamina_c_iv`              | Vitamina C Intravenosa                           | Vitaminas parenterales          | hand-curated |
| `carfilzomib`                | Carfilzomib                                      | Antineoplásicos                 | hand-curated |
| `lenvatinib`                 | Lenvatinib                                       | Antineoplásicos                 | hand-curated |
| `abiraterona_onco`           | Abiraterona (Oncología)                          | Antineoplásicos                 | hand-curated |
| `ibrutinib`                  | Ibrutinib                                        | Antineoplásicos                 | hand-curated |
| `olaparib`                   | Olaparib                                         | Antineoplásicos                 | hand-curated |
| `lorlatinib`                 | Lorlatinib                                       | Antineoplásicos                 | hand-curated |
| `enfortumab_vedotin`         | Enfortumab Vedotina                              | Antineoplásicos                 | hand-curated |
| `trastuzumab_deruxtecan`     | Trastuzumab Deruxtecán                           | Antineoplásicos                 | hand-curated |
| `albumina_5`                 | Albúmina 5%                                      | Soluciones coloides             | hand-curated |
| `hidroxietilalmidon`         | Hidroxietilalmidón                               | Soluciones coloides             | hand-curated |
| `manitol_cerebral`           | Manitol (Neurología)                             | Diuréticos osmóticos            | hand-curated |
| `solucion_salina_3`          | Solución Salina Hipertónica 3%                   | Soluciones hipertónicas         | hand-curated |
| `metadona_iv`                | Metadona IV                                      | Analgésicos opioides            | hand-curated |
| `oxido_nitroso_analg`        | Óxido Nitroso 50%/O2 50%                         | Analgesia inhalatoria           | hand-curated |
| `crioprecipitado`            | Crioprecipitado                                  | Hemoderivados                   | hand-curated |
| `concentrado_fibrinogeno`    | Concentrado de Fibrinógeno                       | Factores de coagulación         | hand-curated |
| `atezolizumab`               | Atezolizumab                                     | Inmunoterapia antineoplásica    | hand-curated |
| `alectinib`                  | Alectinib                                        | Antineoplásicos dirigidos       | hand-curated |
| `bcg_vesical`                | BCG Vesical (Bacilo Calmette-Guérin)             | Inmunoterapia vesical           | hand-curated |
| `agua_esteril_inyeccion`     | Agua Estéril para Inyección                      | Solventes y diluyentes          | hand-curated |
| `amifostina`                 | Amifostina                                       | Citoprotectores                 | hand-curated |

### Dermatología — 96 entradas

| ID                         | Nombre                                 | Familia                                     | Origen       |
| -------------------------- | -------------------------------------- | ------------------------------------------- | ------------ |
| `mupirocina`               | Mupirocina                             | Antibióticos tópicos                        | hand-curated |
| `aciclovir_topico`         | Aciclovir Tópico                       | Antivirales tópicos                         | hand-curated |
| `mometasona_topica`        | Mometasona Tópica                      | Corticoides tópicos                         | hand-curated |
| `adapaleno`                | Adapaleno                              | Retinoides tópicos                          | hand-curated |
| `peroxido_benzoilo`        | Peróxido de Benzoílo                   | Antiacneicos tópicos                        | hand-curated |
| `acido_fusidico`           | Ácido Fusídico                         | Antibióticos tópicos                        | hand-curated |
| `minociclina_topica`       | Minociclina Tópica                     | Antibióticos tópicos (antiacné)             | hand-curated |
| `ivermectina_topica`       | Ivermectina Tópica                     | Antiparasitarios tópicos                    | hand-curated |
| `metronidazol_topico`      | Metronidazol Tópico                    | Antibióticos tópicos                        | hand-curated |
| `dapsona_topica`           | Dapsona tópica                         | Antiacneicos tópicos                        | hand-curated |
| `bacitracina`              | Bacitracina                            | Antibióticos tópicos                        | hand-curated |
| `neomicina_topica`         | Neomicina Tópica                       | Antibióticos tópicos                        | hand-curated |
| `retapamulina`             | Retapamulina                           | Antibióticos tópicos                        | hand-curated |
| `ozenoxacino`              | Ozenoxacino                            | Antibióticos tópicos                        | hand-curated |
| `gentamicina_topica`       | Gentamicina Tópica                     | Antibióticos tópicos                        | hand-curated |
| `fluocinolona`             | Fluocinolona                           | Corticosteroides tópicos                    | hand-curated |
| `fluocinonida`             | Fluocinonida                           | Corticosteroides tópicos                    | hand-curated |
| `halcinonida`              | Halcinonida                            | Corticosteroides tópicos                    | hand-curated |
| `diflorasona`              | Diflorasona                            | Corticosteroides tópicos                    | hand-curated |
| `triamcinolona_topica`     | Triamcinolona Tópica                   | Corticosteroides tópicos                    | hand-curated |
| `prednicarbato`            | Prednicarbato                          | Corticosteroides tópicos                    | hand-curated |
| `alclometasona`            | Alclometasona                          | Corticosteroides tópicos                    | hand-curated |
| `desoximetasona`           | Desoximetasona                         | Corticosteroides tópicos                    | hand-curated |
| `econazol`                 | Econazol                               | Antifúngicos tópicos                        | hand-curated |
| `sertaconazol`             | Sertaconazol                           | Antifúngicos tópicos                        | hand-curated |
| `luliconazol`              | Luliconazol                            | Antifúngicos tópicos                        | hand-curated |
| `efinaconazol`             | Efinaconazol                           | Antifúngicos tópicos                        | hand-curated |
| `ciclopirox`               | Ciclopirox                             | Antifúngicos tópicos                        | hand-curated |
| `benzoato_bencilo`         | Benzoato de Bencilo                    | Antiparasitarios tópicos                    | hand-curated |
| `crotamiton`               | Crotamitón                             | Antiparasitarios tópicos                    | hand-curated |
| `spinosad`                 | Spinosad                               | Antiparasitarios tópicos                    | hand-curated |
| `penciclovir`              | Penciclovir                            | Antivirales tópicos                         | hand-curated |
| `docosanol`                | Docosanol                              | Antivirales tópicos                         | hand-curated |
| `imiquimod`                | Imiquimod                              | Inmunomoduladores tópicos                   | hand-curated |
| `ruxolitinib_topico`       | Ruxolitinib Tópico                     | Inhibidores JAK tópicos                     | hand-curated |
| `abrocitinib`              | Abrocitinib                            | Inhibidores JAK orales                      | hand-curated |
| `tralokinumab`             | Tralokinumab                           | Anticuerpos monoclonales anti-IL-13         | hand-curated |
| `nemolizumab`              | Nemolizumab                            | Anticuerpos monoclonales anti-IL-31         | hand-curated |
| `lebrikizumab`             | Lebrikizumab                           | Anticuerpos monoclonales anti-IL-13         | hand-curated |
| `bimekizumab`              | Bimekizumab                            | Anticuerpos monoclonales anti-IL-17         | hand-curated |
| `tazaroteno`               | Tazaroteno                             | Retinoides tópicos                          | hand-curated |
| `trifaroteno`              | Trifaroteno                            | Retinoides tópicos                          | hand-curated |
| `sarecycline_acne`         | Sareciclina                            | Tetraciclinas                               | hand-curated |
| `clascoterone`             | Clascoterone                           | Antiandrógenos tópicos                      | hand-curated |
| `clorhexidina_topica`      | Clorhexidina Tópica                    | Antisépticos tópicos                        | hand-curated |
| `povidona_yodada`          | Povidona Yodada                        | Antisépticos tópicos                        | hand-curated |
| `nitrato_plata`            | Nitrato de Plata                       | Antisépticos y cauterizantes                | hand-curated |
| `colagenasa`               | Colagenasa                             | Desbridantes enzimáticos                    | hand-curated |
| `acido_hialuronico_topico` | Ácido Hialurónico Tópico               | Cicatrizantes tópicos                       | hand-curated |
| `alantoina`                | Alantoína                              | Cicatrizantes tópicos                       | hand-curated |
| `dexpantenol`              | Dexpantenol                            | Cicatrizantes tópicos                       | hand-curated |
| `centella_asiatica`        | Extracto de Centella Asiática          | Cicatrizantes fitoterapéuticos              | hand-curated |
| `acido_salicilico_topico`  | Ácido Salicílico Tópico                | Queratolíticos tópicos                      | hand-curated |
| `urea_topica`              | Urea Tópica                            | Queratolíticos e hidratantes                | hand-curated |
| `acido_lactico_topico`     | Ácido Láctico Tópico                   | Queratolíticos e hidratantes                | hand-curated |
| `vaselina_medicinal`       | Vaselina Medicinal                     | Emolientes oclusivos                        | hand-curated |
| `parafina_liquida`         | Parafina Líquida                       | Emolientes oclusivos                        | hand-curated |
| `ceramidas`                | Ceramidas                              | Emolientes reparadores de barrera           | hand-curated |
| `petrolato`                | Petrolato Amarillo                     | Emolientes oclusivos                        | hand-curated |
| `coal_tar`                 | Alquitrán de Hulla                     | Antipsoriásicos tópicos clásicos            | hand-curated |
| `hidroquinona`             | Hidroquinona                           | Despigmentantes tópicos                     | hand-curated |
| `acido_azelaico`           | Ácido Azelaico                         | Despigmentantes y antiacneicos tópicos      | hand-curated |
| `acido_kojico`             | Ácido Kójico                           | Despigmentantes tópicos                     | hand-curated |
| `acido_tranexamico_topico` | Ácido Tranexámico Tópico               | Despigmentantes tópicos                     | hand-curated |
| `arbutina`                 | Arbutina                               | Despigmentantes tópicos naturales           | hand-curated |
| `niacinamida_topica`       | Niacinamida Tópica                     | Despigmentantes y protectores cutáneos      | hand-curated |
| `filtro_solar_octocrileno` | Octocrileno                            | Filtros solares químicos                    | hand-curated |
| `filtro_solar_oxibenzona`  | Oxibenzona                             | Filtros solares químicos                    | hand-curated |
| `finasteride_topico`       | Finasteride Tópico                     | Antiandrógenos tópicos                      | hand-curated |
| `dutasteride_alopecia`     | Dutasteride para Alopecia              | Inhibidores de 5-alfa-reductasa             | hand-curated |
| `baricitinib_alopecia`     | Baricitinib para Alopecia              | Inhibidores JAK orales                      | hand-curated |
| `ritlecitinib`             | Ritlecitinib                           | Inhibidores JAK/TEC orales                  | hand-curated |
| `deuruxolitinib`           | Deuruxolitinib                         | Inhibidores JAK orales                      | hand-curated |
| `bimatoprost_pestanas`     | Bimatoprost Pestañas                   | Análogos de prostaglandinas (dermatológico) | hand-curated |
| `latanoprost_alopecia`     | Latanoprost para Alopecia              | Análogos de prostaglandinas (dermatológico) | hand-curated |
| `acitretina`               | Acitretina                             |                                             | hand-curated |
| `halobetasol_topico`       | Halobetasol Tópico                     | Corticosteroides tópicos                    | hand-curated |
| `mometasona_topica_det`    | Mometasona Tópica detallado            | Corticosteroides tópicos                    | hand-curated |
| `dupilumab_det`            | Dupilumab detallado                    | Inmunosupresores/Biológicos                 | hand-curated |
| `tralokinumab_det`         | Tralokinumab detallado                 | Inmunosupresores/Biológicos                 | hand-curated |
| `nemolizumab_det`          | Nemolizumab detallado                  | Anti-IL-31                                  | hand-curated |
| `roflumilast_topico`       | Roflumilast Tópico                     | Inhibidores PDE4 tópicos                    | hand-curated |
| `tapinarof`                | Tapinarof                              | Agonistas AhR tópicos                       | hand-curated |
| `bimekizumab_det`          | Bimekizumab detallado                  | Inmunosupresores/Biológicos                 | hand-curated |
| `ritlecitinib_det`         | Ritlecitinib detallado                 | Inhibidores JAK para alopecia               | hand-curated |
| `abrocitinib_det`          | Abrocitinib detallado                  | Inmunosupresores/Biológicos                 | hand-curated |
| `peroxido_hidrogeno`       | Peróxido de Hidrógeno (Agua Oxigenada) | Antisépticos oxidantes                      | hand-curated |
| `brimonidina`              | Brimonidina                            | Agonistas alfa-2 adrenérgicos oftálmicos    | hand-curated |
| `dorzolamida`              | Dorzolamida                            | Inhibidores de anhidrasa carbónica tópicos  | hand-curated |
| `tropicamida`              | Tropicamida                            | Midriáticos y ciclopléjicos                 | hand-curated |
| `ciclopentolato`           | Ciclopentolato                         | Midriáticos y ciclopléjicos                 | hand-curated |
| `atropina_oftalmica`       | Atropina (Oftálmica)                   | Midriáticos y ciclopléjicos                 | hand-curated |
| `tobramicina_oftalm`       | Tobramicina (Oftálmica)                | Aminoglucósidos tópicos                     | hand-curated |
| `moxifloxacino_oftalm`     | Moxifloxacino (Oftálmico)              | Quinolonas tópicas                          | hand-curated |
| `bevacizumab_oftalm`       | Bevacizumab (Intravítreo)              | Anti-VEGF                                   | hand-curated |
| `dupilumab_derm`           | Dupilumab (Dermatitis)                 | Anticuerpos monoclonales                    | hand-curated |

### Aparato Digestivo — 83 entradas

| ID                                 | Nombre                              | Familia                                             | Origen       |
| ---------------------------------- | ----------------------------------- | --------------------------------------------------- | ------------ |
| `octreotida_hemorragia`            | Octreotida (hemorragia digestiva)   | Análogos de somatostatina                           | hand-curated |
| `famotidina_iv`                    | Famotidina IV                       | Antagonistas H2                                     | hand-curated |
| `sucralfato_susp`                  | Sucralfato suspensión               | Citoprotectores gástricos                           | hand-curated |
| `misoprostol_gastrico`             | Misoprostol (gastroprotector)       | Análogos de prostaglandinas                         | hand-curated |
| `almagato`                         | Almagato                            | Antiácidos                                          | hand-curated |
| `magaldrato`                       | Magaldrato                          | Antiácidos                                          | hand-curated |
| `hidroxido_aluminio_magnesio`      | Hidróxido de Al y Mg                | Antiácidos                                          | hand-curated |
| `pirenzepina`                      | Pirenzepina                         | Anticolinérgicos selectivos gástricos               | hand-curated |
| `tegoprazan`                       | Tegoprazan                          | P-CAB (bloqueadores ácidos competitivos de potasio) | hand-curated |
| `fosaprepitant`                    | Fosaprepitant                       | Antieméticos                                        | hand-curated |
| `netupitant_palonos`               | Netupitant/Palonosetrón             | Antieméticos                                        | hand-curated |
| `rolapitant`                       | Rolapitant                          | Antieméticos                                        | hand-curated |
| `trimethobenzamida`                | Trimetobenzamida                    | Antieméticos                                        | hand-curated |
| `dronabinol`                       | Dronabinol                          | Antieméticos                                        | hand-curated |
| `nabilona`                         | Nabilona                            | Antieméticos                                        | hand-curated |
| `prometazina_antiemetica`          | Prometazina (antiemética)           | Antieméticos                                        | hand-curated |
| `ciclizina`                        | Ciclizina                           | Antieméticos                                        | hand-curated |
| `infliximab_eii`                   | Infliximab (EII)                    | Inmunosupresores/Biológicos                         | hand-curated |
| `adalimumab_eii`                   | Adalimumab (EII)                    | Inmunosupresores/Biológicos                         | hand-curated |
| `ustekinumab_eii`                  | Ustekinumab (EII)                   | Inmunosupresores/Biológicos                         | hand-curated |
| `tofacitinib_eii`                  | Tofacitinib (EII)                   | Inmunosupresores/Biológicos                         | hand-curated |
| `ozanimod`                         | Ozanimod                            | Inmunosupresores/Biológicos                         | hand-curated |
| `filgotinib`                       | Filgotinib                          | Inmunosupresores/Biológicos                         | hand-curated |
| `obeticholic_acid`                 | Ácido obeticólico                   | Agonistas FXR                                       | hand-curated |
| `elafibranor`                      | Elafibranor                         | Agonistas PPAR                                      | hand-curated |
| `seladelpar`                       | Seladelpar                          | Agonistas PPAR selectivos                           | hand-curated |
| `acido_ursodeoxicolico_colestasis` | AUDC (colestasis)                   | Ácidos biliares                                     | hand-curated |
| `colestiramina_prurito`            | Colestiramina (prurito colestásico) | Resinas secuestradoras de ácidos biliares           | hand-curated |
| `naltrexona_prurito`               | Naltrexona (prurito colestásico)    | Antagonistas opioides                               | hand-curated |
| `lactitol`                         | Lactitol                            | Laxantes osmóticos                                  | hand-curated |
| `macrogol_electrolitos`            | Macrogol con electrolitos           | Laxantes osmóticos                                  | hand-curated |
| `metilcelulosa`                    | Metilcelulosa                       | Laxantes formadores de masa                         | hand-curated |
| `docusato`                         | Docusato sódico                     | Laxantes emolientes                                 | hand-curated |
| `prucaloprida_detalle`             | Prucaloprida (detalle)              | Procinéticos serotoninérgicos                       | hand-curated |
| `balsalazida`                      | Balsalazida                         | Aminosalicilatos (5-ASA)                            | hand-curated |
| `olsalazina`                       | Olsalazina                          | Aminosalicilatos (5-ASA)                            | hand-curated |
| `azatioprina_eii`                  | Azatioprina (EII)                   | Inmunosupresores/Biológicos                         | hand-curated |
| `mercaptopurina_eii`               | 6-Mercaptopurina (EII)              | Inmunosupresores/Biológicos                         | hand-curated |
| `certolizumab_eii`                 | Certolizumab pegol (EII)            | Inmunosupresores/Biológicos                         | hand-curated |
| `golimumab_eii`                    | Golimumab (EII)                     | Inmunosupresores/Biológicos                         | hand-curated |
| `risankizumab_eii`                 | Risankizumab (EII)                  | Inmunosupresores/Biológicos                         | hand-curated |
| `mirikizumab`                      | Mirikizumab                         | Inmunosupresores/Biológicos                         | hand-curated |
| `pancrelipasa`                     | Pancrelipasa                        | Enzimas pancreáticas                                | hand-curated |
| `creon`                            | Creon                               | Enzimas pancreáticas                                | hand-curated |
| `acido_quenodesoxicolico`          | Ácido quenodesoxicólico             | Ácidos biliares                                     | hand-curated |
| `fenofibrato_colestasis`           | Fenofibrato (colestasis)            | Fibratos                                            | hand-curated |
| `colesevelam_prurito`              | Colesevelam (colestasis)            | Resinas secuestradoras de ácidos biliares           | hand-curated |
| `bezafibrato_colestasis`           | Bezafibrato (colestasis)            | Fibratos                                            | hand-curated |
| `cinitaprida`                      | Cinitaprida                         | Procinéticos                                        | hand-curated |
| `mosapride`                        | Mosapride                           | Procinéticos                                        | hand-curated |
| `itopride`                         | Itopride                            | Procinéticos                                        | hand-curated |
| `trimebutina`                      | Trimebutina                         | Reguladores de motilidad GI                         | hand-curated |
| `mebeverina`                       | Mebeverina                          | Antiespasmódicos musculotrópicos                    | hand-curated |
| `otilonio`                         | Otilonio bromuro                    | Antiespasmódicos                                    | hand-curated |
| `pinaverio`                        | Pinaverio bromuro                   | Antiespasmódicos bloqueadores de calcio selectivos  | hand-curated |
| `hioscina_butilbromuro`            | Hioscina butilbromuro               | Anticolinérgicos antiespasmódicos                   | hand-curated |
| `dicyclomine`                      | Diciclomina (Dicicloverina)         | Anticolinérgicos antiespasmódicos                   | hand-curated |
| `alverine`                         | Alverina                            | Antiespasmódicos musculotrópicos                    | hand-curated |
| `diosmectita`                      | Diosmectita                         | Adsorbentes intestinales                            | hand-curated |
| `caolin_pectina`                   | Caolín + Pectina                    | Adsorbentes intestinales                            | hand-curated |
| `colestiramina_diarrea`            | Colestiramina (diarrea biliar)      | Resinas secuestradoras de ácidos biliares           | hand-curated |
| `sales_rehidratacion`              | Sales de Rehidratación Oral         | Soluciones de rehidratación oral                    | hand-curated |
| `probioticos_saccharomyces`        | Saccharomyces boulardii             | Probióticos                                         | hand-curated |
| `tintura_opio`                     | Tintura de opio                     | Antidiarreicos opioides                             | hand-curated |
| `difenoxilato_atropina`            | Difenoxilato/Atropina               | Antidiarreicos opioides                             | hand-curated |
| `crofelemer`                       | Crofelemer                          | Antisecretores intestinales                         | hand-curated |
| `ácido_ursodeoxicólico`            | Ácido ursodeoxicólico               |                                                     | hand-curated |
| `vonoprazan_detalle`               | Vonoprazán detallado                | Inhibidores de bomba de protones                    | hand-curated |
| `alizaprida`                       | Alizaprida                          | Antieméticos benzamidas                             | hand-curated |
| `tenatoprazol`                     | Tenatoprazol                        | Inhibidores de bomba de protones                    | hand-curated |
| `netupitant_palonos_detalle`       | Netupitant/Palonosetrón detallado   | Antieméticos                                        | hand-curated |
| `ilaprazol`                        | Ilaprazol                           | Inhibidores de bomba de protones                    | hand-curated |
| `rolapitant_detalle`               | Rolapitant detallado                | Antieméticos                                        | hand-curated |
| `esomeprazol_iv_detalle`           | Esomeprazol IV                      | Inhibidores de bomba de protones                    | hand-curated |
| `trimethobenzamida_detalle`        | Trimetobenzamida detallado          | Antieméticos                                        | hand-curated |
| `pantoprazol_iv_detalle`           | Pantoprazol IV detallado            | Inhibidores de bomba de protones                    | hand-curated |
| `scopolamina_transdermica`         | Escopolamina Transdérmica           | Anticolinérgicos transdérmicos                      | hand-curated |
| `olanzapina_antiemetica`           | Olanzapina Antiemética              | Antieméticos atípicos                               | hand-curated |
| `tegoprazan_detalle`               | Tegoprazán detallado                | Inhibidores de bomba de protones                    | hand-curated |
| `alverino`                         | Alverina                            | Antiespasmódicos                                    | hand-curated |
| `lubiprostone`                     | Lubiprostona                        | Activadores de canales de cloro                     | hand-curated |
| `pancrealipasa`                    | Pancrealipasa                       | Enzimas pancreáticas                                | hand-curated |
| `odevixibat`                       | Odevixibat                          | Inhibidores IBAT                                    | hand-curated |

### Sistema Endocrino y Metabolismo — 79 entradas

| ID                               | Nombre                                        | Familia                                      | Origen       |
| -------------------------------- | --------------------------------------------- | -------------------------------------------- | ------------ |
| `glucagon`                       | Glucagon                                      | Hormonas                                     | hand-curated |
| `insulina_glulisina`             | Insulina Glulisina                            | Insulinas                                    | hand-curated |
| `insulina_degludec_liraglutida`  | Insulina Degludec/Liraglutida                 | Insulinas                                    | hand-curated |
| `semaglutida_oral`               | Semaglutida Oral                              | Antidiabéticos orales                        | hand-curated |
| `exenatida`                      | Exenatida                                     | Agonistas GLP-1                              | hand-curated |
| `exenatida_semanal`              | Exenatida semanal                             | Agonistas GLP-1                              | hand-curated |
| `pramlintida`                    | Pramlintida                                   | Análogos de amilina                          | hand-curated |
| `miglitol`                       | Miglitol                                      | Antidiabéticos orales                        | hand-curated |
| `tolbutamida`                    | Tolbutamida                                   | Antidiabéticos orales                        | hand-curated |
| `clorpropamida`                  | Clorpropamida                                 | Antidiabéticos orales                        | hand-curated |
| `rosiglitazona`                  | Rosiglitazona                                 | Antidiabéticos orales                        | hand-curated |
| `alogliptina`                    | Alogliptina                                   | Antidiabéticos orales                        | hand-curated |
| `sotagliflozina_endo`            | Sotagliflozina                                | Antidiabéticos orales                        | hand-curated |
| `teplizumab`                     | Teplizumab                                    | Inmunomoduladores para diabetes              | hand-curated |
| `diazoxido_hipoglucemia`         | Diazóxido                                     | Fármacos para hiperinsulinismo               | hand-curated |
| `tiroglobulina`                  | Tiroglobulina (extracto tiroideo)             | Hormonas tiroideas naturales                 | hand-curated |
| `yodo_131`                       | Yodo-131 (I-131)                              | Radiofármacos tiroideos                      | hand-curated |
| `perclorato_potasio`             | Perclorato de Potasio                         | Antitiroideos                                | hand-curated |
| `selenio_tiroide`                | Selenio (suplemento tiroideo)                 | Suplementos tiroideos                        | hand-curated |
| `colestiramina_tiroide`          | Colestiramina (uso tiroideo)                  | Resinas secuestrantes (uso tiroideo)         | hand-curated |
| `budesonida_sistemica`           | Budesonida sistémica oral                     | Corticosteroides sistémicos                  | hand-curated |
| `triamcinolona_sistemica`        | Triamcinolona sistémica                       | Corticosteroides sistémicos                  | hand-curated |
| `parametasona`                   | Parametasona                                  | Corticosteroides sistémicos                  | hand-curated |
| `rimexolona`                     | Rimexolona                                    | Corticosteroides oftálmicos                  | hand-curated |
| `meprednisona`                   | Meprednisona                                  | Corticosteroides sistémicos                  | hand-curated |
| `paricalcitol`                   | Paricalcitol                                  | Análogos de vitamina D                       | hand-curated |
| `etelcalcetida`                  | Etelcalcetida                                 | Calcimiméticos                               | hand-curated |
| `liraglutida_obesidad`           | Liraglutida (obesidad)                        | Agonistas GLP-1 para obesidad                | hand-curated |
| `semaglutida_obesidad`           | Semaglutida (obesidad)                        | Agonistas GLP-1 para obesidad                | hand-curated |
| `orlistat`                       | Orlistat                                      | Inhibidores de absorción de grasas           | hand-curated |
| `ketoconazol_cushing`            | Ketoconazol (uso endocrino)                   | Inhibidores de esteroidogénesis              | hand-curated |
| `metirapona`                     | Metirapona                                    | Inhibidores de esteroidogénesis              | hand-curated |
| `osilodrostat`                   | Osilodrostat                                  | Inhibidores de esteroidogénesis              | hand-curated |
| `levoketoconazol`                | Levoketoconazol                               | Inhibidores de esteroidogénesis              | hand-curated |
| `pasireotida`                    | Pasireotida                                   | Análogos de somatostatina                    | hand-curated |
| `mifepristona_cushing`           | Mifepristona (Cushing)                        | Antagonistas de receptor de glucocorticoides | hand-curated |
| `cosintropina`                   | Cosintropina (ACTH sintética)                 | Hormonas adrenocorticotrópicas               | hand-curated |
| `etelcalcetida_detalle`          | Etelcalcetida (detalle clínico)               | Calcimiméticos                               | hand-curated |
| `paratormona_recombinante`       | Teriparatida (PTH 1-34)                       | Agentes anabólicos óseos                     | hand-curated |
| `abaloparatida`                  | Abaloparatida                                 | Agentes anabólicos óseos                     | hand-curated |
| `romosozumab`                    | Romosozumab                                   | Anticuerpos anti-esclerostina                | hand-curated |
| `burosumab`                      | Burosumab                                     | Anticuerpos anti-FGF23                       | hand-curated |
| `fosfato_oral`                   | Fosfato oral                                  | Suplementos minerales                        | hand-curated |
| `carbonato_lantano`              | Carbonato de Lantano                          | Quelantes de fósforo                         | hand-curated |
| `sevelamer_carbonato`            | Sevelámero carbonato                          | Quelantes de fósforo                         | hand-curated |
| `naltrexona_bupropion`           | Naltrexona/Bupropión                          | Fármacos para obesidad                       | hand-curated |
| `fentermina`                     | Fentermina                                    | Simpaticomiméticos anorexígenos              | hand-curated |
| `fentermina_topiramato`          | Fentermina/Topiramato LP                      | Fármacos combinados para obesidad            | hand-curated |
| `lisdexanfetamina_ta`            | Lisdexanfetamina (trastorno atracones)        | Anfetaminas (trastorno alimentario)          | hand-curated |
| `cellulose_mcp`                  | Carboximetilcelulosa/Ácido Cítrico (hidrogel) | Dispositivos médicos ingeribles              | hand-curated |
| `setmelanotida`                  | Setmelanotida                                 | Agonistas de melanocortina                   | hand-curated |
| `gelesis`                        | Gelesis100 (hidrogel oral)                    | Dispositivos médicos ingeribles              | hand-curated |
| `pegvisomant`                    | Pegvisomant                                   | Antagonistas del receptor de GH              | hand-curated |
| `cabergolina_prolactinoma`       | Cabergolina (prolactinoma)                    | Agonistas dopaminérgicos                     | hand-curated |
| `leuprolida`                     | Leuprolida (Leuprorelina)                     | Agonistas GnRH                               | hand-curated |
| `goserelina`                     | Goserelina                                    | Agonistas GnRH                               | hand-curated |
| `triptorelina`                   | Triptorelina                                  | Agonistas GnRH                               | hand-curated |
| `nafarelina`                     | Nafarelina                                    | Agonistas GnRH                               | hand-curated |
| `degarelix`                      | Degarelix                                     | Antagonistas GnRH                            | hand-curated |
| `cetrorelix`                     | Cetrorelix                                    | Antagonistas GnRH                            | hand-curated |
| `ganirelix`                      | Ganirelix                                     | Antagonistas GnRH                            | hand-curated |
| `abiraterona`                    | Abiraterona                                   | Inhibidores de biosíntesis de andrógenos     | hand-curated |
| `enzalutamida`                   | Enzalutamida                                  | Antiandrógenos de nueva generación           | hand-curated |
| `octreótida`                     | Octreótida                                    |                                              | hand-curated |
| `insulina_icodec`                | Insulina Icodec                               | Insulinas                                    | hand-curated |
| `imeglimina`                     | Imeglimina                                    | Gliminas                                     | hand-curated |
| `osilodrostat_detalle`           | Osilodrostat detallado                        | Inhibidores de síntesis de cortisol          | hand-curated |
| `sotagliflozina`                 | Sotagliflozina                                | Inhibidores SGLT1/SGLT2                      | hand-curated |
| `pasireotida_detalle`            | Pasireótida detallado                         | Análogos de somatostatina                    | hand-curated |
| `lenzilumab`                     | Relacorilant                                  | Antagonistas del receptor glucocorticoide    | hand-curated |
| `tirzepatida_detalle2`           | Tirzepatida (Obesidad)                        | Agonistas duales GIP/GLP-1                   | hand-curated |
| `semaglutida_oral_detalle`       | Semaglutida Oral detallado                    | Agonistas GLP-1 orales                       | hand-curated |
| `pegvisomant_detalle`            | Pegvisomant detallado                         | Antagonistas del receptor GH                 | hand-curated |
| `bexagliflozina`                 | Bexagliflozina                                | Antidiabéticos orales                        | hand-curated |
| `insulina_glargina_lixisenatida` | Insulina Glargina/Lixisenatida                | Combinación insulina/GLP-1                   | hand-curated |
| `alfacalcidol`                   | Alfacalcidol                                  | Análogos de vitamina D                       | hand-curated |
| `calcifediol`                    | Calcifediol                                   | Análogos de vitamina D                       | hand-curated |
| `dapagliflozina_dm`              | Dapagliflozina (DM2)                          | Inhibidores SGLT2                            | hand-curated |
| `mecasermina`                    | Mecasermina                                   | Factor de crecimiento                        | hand-curated |

### Sistema Cardiovascular — 77 entradas

| ID                           | Nombre                                       | Familia                                       | Origen       |
| ---------------------------- | -------------------------------------------- | --------------------------------------------- | ------------ |
| `adenosina`                  | Adenosina                                    | Antiarritmicos                                | hand-curated |
| `lisinopril`                 | Lisinopril                                   | Inhibidores de la ECA                         | hand-curated |
| `quinapril`                  | Quinapril                                    | Inhibidores de la ECA                         | hand-curated |
| `eprosartan`                 | Eprosartán                                   | Antagonistas del receptor de angiotensina II  | hand-curated |
| `labetalol_cv`               | Labetalol (cardiovascular)                   | Betabloqueantes                               | hand-curated |
| `isradipino`                 | Isradipino                                   | Calcioantagonistas                            | hand-curated |
| `acebutolol`                 | Acebutolol                                   | Betabloqueantes                               | hand-curated |
| `aliskireno`                 | Aliskirén                                    | Inhibidores directos de renina                | hand-curated |
| `lacidipino`                 | Lacidipino                                   | Calcioantagonistas                            | hand-curated |
| `eplerenona`                 | Eplerenona                                   | Antagonistas de aldosterona                   | hand-curated |
| `celiprolol`                 | Celiprolol                                   | Betabloqueantes                               | hand-curated |
| `azilsartan`                 | Azilsartán                                   | Antagonistas del receptor de angiotensina II  | hand-curated |
| `barnidipino`                | Barnidipino                                  | Calcioantagonistas                            | hand-curated |
| `quinidina`                  | Quinidina                                    | Antiarrítmicos                                | hand-curated |
| `disopiramida`               | Disopiramida                                 | Antiarrítmicos                                | hand-curated |
| `ajmalina`                   | Ajmalina                                     | Antiarrítmicos                                | hand-curated |
| `pilsicainida`               | Pilsicainida                                 | Antiarrítmicos                                | hand-curated |
| `vernakalant_oral`           | Vernakalant oral                             | Antiarrítmicos                                | hand-curated |
| `treprostinil`               | Treprostinil                                 | Fármacos para hipertensión pulmonar           | hand-curated |
| `epoprostenol`               | Epoprostenol                                 | Fármacos para hipertensión pulmonar           | hand-curated |
| `selexipag`                  | Selexipag                                    | Fármacos para hipertensión pulmonar           | hand-curated |
| `ambrisentan`                | Ambrisentán                                  | Antagonistas de endotelina                    | hand-curated |
| `riociguat`                  | Riociguat                                    | Estimuladores de sGC                          | hand-curated |
| `tadalafilo_hp`              | Tadalafilo (HAP)                             | Inhibidores de PDE5                           | hand-curated |
| `sildenafilo_hp`             | Sildenafilo (HAP)                            | Inhibidores de PDE5                           | hand-curated |
| `beraprost`                  | Beraprost                                    | Fármacos para hipertensión pulmonar           | hand-curated |
| `sitaxentan_hist`            | Sitaxentán (histórico)                       | Antagonistas de endotelina (histórico)        | hand-curated |
| `nicorandil`                 | Nicorandil                                   | Antianginosos                                 | hand-curated |
| `molsidomina`                | Molsidomina                                  | Vasodilatadores nitroderivados                | hand-curated |
| `dinitrato_isosorbide`       | Dinitrato de isosorbide                      | Nitratos                                      | hand-curated |
| `mononitrato_isosorbide`     | Mononitrato de isosorbide                    | Nitratos                                      | hand-curated |
| `nimodipino_cv`              | Nimodipino                                   | Calcioantagonistas cerebrovasculares          | hand-curated |
| `pentoxifilina`              | Pentoxifilina                                | Hemorreológicos                               | hand-curated |
| `perhexilina`                | Perhexilina                                  | Antianginosos metabólicos                     | hand-curated |
| `fasudil`                    | Fasudil                                      | Inhibidores de Rho-kinasa                     | hand-curated |
| `angiotensina_ii`            | Angiotensina II sintética                    | Vasopresores e inotrópicos                    | hand-curated |
| `metaraminol`                | Metaraminol                                  | Vasopresores e inotrópicos                    | hand-curated |
| `fenilefrina_infusion`       | Fenilefrina infusión                         | Vasopresores e inotrópicos                    | hand-curated |
| `terlipresina_shock`         | Terlipresina (shock)                         | Vasopresores e inotrópicos                    | hand-curated |
| `noradrenalina_titulable`    | Noradrenalina (protocolo de titulación)      | Vasopresores e inotrópicos                    | hand-curated |
| `nebivolol_cv`               | Nebivolol                                    | Betabloqueantes                               | hand-curated |
| `adenosina_arritmia`         | Adenosina (antiarrítmico)                    | Antiarrítmicos                                | hand-curated |
| `ivabradina_ic`              | Ivabradina (IC)                              | Inhibidores de corriente If                   | hand-curated |
| `hidralazina_ic`             | Hidralazina (IC)                             | Vasodilatadores directos                      | hand-curated |
| `dinitrato_isosorbide_ic`    | Dinitrato de isosorbide (IC)                 | Nitratos                                      | hand-curated |
| `vericiguat`                 | Vericiguat                                   | Estimuladores de sGC                          | hand-curated |
| `omecamtiv`                  | Omecamtiv mecarbil                           | Activadores de miosina cardíaca               | hand-curated |
| `empagliflozina_ic`          | Empagliflozina (IC)                          | Inhibidores SGLT2 (uso cardiovascular)        | hand-curated |
| `ezetimiba`                  | Ezetimiba                                    | Inhibidores de absorción de colesterol        | hand-curated |
| `gemfibrozilo`               | Gemfibrozilo                                 | Fibratos                                      | hand-curated |
| `acido_nicotinico`           | Ácido nicotínico (Niacina)                   | Ácido nicotínico y derivados                  | hand-curated |
| `colestiramina_lip`          | Colestiramina                                | Resinas de intercambio iónico                 | hand-curated |
| `inclisiran`                 | Inclisirán                                   | Silenciadores de ARN (siRNA)                  | hand-curated |
| `alprostadil_ductus`         | Alprostadil (ductus)                         | Prostaglandinas (uso cardiovascular neonatal) | hand-curated |
| `indometacina_ductus`        | Indometacina (cierre ductus)                 | AINEs (uso cardiovascular neonatal)           | hand-curated |
| `ibuprofeno_ductus`          | Ibuprofeno IV (cierre ductus)                | AINEs (uso cardiovascular neonatal)           | hand-curated |
| `sildenafilo_neonatal`       | Sildenafilo (hipertensión pulmonar neonatal) | Inhibidores de PDE5 (uso neonatal)            | hand-curated |
| `bosentan_congenita`         | Bosentán (cardiopatía congénita)             | Antagonistas de endotelina                    | hand-curated |
| `iloprost_congenita`         | Iloprost inhalado                            | Fármacos para hipertensión pulmonar           | hand-curated |
| `ivabradina_angina`          | Ivabradina (angina)                          | Inhibidores de corriente If                   | hand-curated |
| `isosorbide_mononitrato_det` | Mononitrato de isosorbide retard             | Nitratos orgánicos                            | hand-curated |
| `dipiridamol_cv`             | Dipiridamol                                  | Vasodilatadores coronarios/Antiagregantes     | hand-curated |
| `papaverina`                 | Papaverina                                   | Vasodilatadores directos                      | hand-curated |
| `cilostazol_cv`              | Cilostazol                                   | Inhibidores de PDE3 (vascular)                | hand-curated |
| `buflomedil`                 | Buflomedilo                                  | Vasodilatadores periféricos                   | hand-curated |
| `naftidrofurilo`             | Naftidrofurilo                               | Vasodilatadores periféricos                   | hand-curated |
| `pentoxifilina_cv`           | Pentoxifilina (vascular)                     | Hemorreológicos                               | hand-curated |
| `ginkgo_biloba`              | Extracto de Ginkgo biloba                    | Fitoterapéuticos vasculares                   | hand-curated |
| `digitoxina`                 | Digitoxina                                   | Glucósidos cardíacos                          | hand-curated |
| `metildigoxina`              | Metildigoxina                                | Glucósidos cardíacos                          | hand-curated |
| `angiotensina_ii_shock`      | Angiotensina II (shock refractario)          | Vasopresores e inotrópicos                    | hand-curated |
| `milrinona_shock`            | Milrinona (soporte hemodinámico)             | Vasopresores e inotrópicos                    | hand-curated |
| `fenilefrina_shock`          | Fenilefrina (shock)                          | Vasopresores e inotrópicos                    | hand-curated |
| `trandolapril`               | Trandolapril                                 | IECA                                          | hand-curated |
| `manidipino`                 | Manidipino                                   | Calcioantagonistas dihidropiridínicos         | hand-curated |
| `cilazapril`                 | Cilazapril                                   | IECA                                          | hand-curated |
| `finerenona_dm`              | Finerenona                                   | Antagonistas del receptor mineralocorticoide  | hand-curated |

### Sistema Respiratorio — 75 entradas

| ID                          | Nombre                               | Familia                                                   | Origen       |
| --------------------------- | ------------------------------------ | --------------------------------------------------------- | ------------ |
| `dupilumab_respiratorio`    | Dupilumab (asma)                     | Anticuerpos monoclonales anti-IL                          | hand-curated |
| `guaifenesina`              | Guaifenesina                         | Expectorantes                                             | hand-curated |
| `levodropropizina`          | Levodropropizina                     | Antitusígenos periféricos                                 | hand-curated |
| `oxolamina`                 | Oxolamina                            | Antitusígenos                                             | hand-curated |
| `benzonatato`               | Benzonatato                          | Antitusígenos periféricos                                 | hand-curated |
| `levocetirizina`            | Levocetirizina                       | Antihistamínicos H1 de segunda/tercera generación         | hand-curated |
| `ebastina`                  | Ebastina                             | Antihistamínicos H1 de segunda generación                 | hand-curated |
| `azelastina`                | Azelastina                           | Antihistamínicos H1 tópicos                               | hand-curated |
| `olopatadina`               | Olopatadina                          | Antihistamínicos H1 tópicos/estabilizadores de mastocitos | hand-curated |
| `ketotifeno`                | Ketotifeno                           | Antihistamínicos/estabilizadores de mastocitos            | hand-curated |
| `clemastina`                | Clemastina                           | Antihistamínicos H1 de primera generación                 | hand-curated |
| `meclizina`                 | Meclizina                            | Antihistamínicos/antieméticos                             | hand-curated |
| `dimenhidrinato`            | Dimenhidrinato                       | Antihistamínicos/antieméticos                             | hand-curated |
| `heliox`                    | Heliox                               | Gases medicinales                                         | hand-curated |
| `fenilefrina_oral`          | Fenilefrina oral (descongestionante) | Descongestionantes orales                                 | hand-curated |
| `pseudoefedrina`            | Pseudoefedrina                       | Descongestionantes orales                                 | hand-curated |
| `noscapina`                 | Noscapina                            | Antitusígenos centrales no opioides                       | hand-curated |
| `butamirato`                | Butamirato                           | Antitusígenos centrales no opioides                       | hand-curated |
| `cloperastina`              | Cloperastina                         | Antitusígenos centrales/antihistamínicos                  | hand-curated |
| `difenhidramina_jarabe`     | Difenhidramina jarabe (antitusígeno) | Antihistamínicos/antitusígenos                            | hand-curated |
| `oxymetazolina`             | Oximetazolina                        | Descongestionantes nasales tópicos                        | hand-curated |
| `xilometazolina`            | Xilometazolina                       | Descongestionantes nasales tópicos                        | hand-curated |
| `formoterol_det`            | Formoterol (detalle)                 | Broncodilatadores beta-2 agonistas                        | hand-curated |
| `indacaterol_det`           | Indacaterol (detalle)                | Broncodilatadores beta-2 agonistas                        | hand-curated |
| `vilanterol_det`            | Vilanterol (detalle)                 | Broncodilatadores beta-2 agonistas                        | hand-curated |
| `olodaterol_det`            | Olodaterol (detalle)                 | Broncodilatadores beta-2 agonistas                        | hand-curated |
| `terbutalina_inh`           | Terbutalina inhalatoria              | Broncodilatadores beta-2 agonistas                        | hand-curated |
| `fenoterol_inh`             | Fenoterol inhalatorio                | Broncodilatadores beta-2 agonistas                        | hand-curated |
| `aclidinio_det`             | Aclidinio (detalle)                  | Anticolinérgicos inhalados                                | hand-curated |
| `glicopirronio_inh_det`     | Glicopirronio inhalado (detalle)     | Anticolinérgicos inhalados                                | hand-curated |
| `umeclidinio`               | Umeclidinio                          | Anticolinérgicos inhalados                                | hand-curated |
| `revefenacina_det`          | Revefenacina (detalle)               | Anticolinérgicos inhalados                                | hand-curated |
| `mometasona_inh`            | Mometasona inhalada                  | Corticosteroides inhalados                                | hand-curated |
| `ciclesonida_det`           | Ciclesonida (detalle)                | Corticosteroides inhalados                                | hand-curated |
| `beclometasona_inh`         | Beclometasona inhalada               | Corticosteroides inhalados                                | hand-curated |
| `triamcinolona_inh`         | Triamcinolona inhalada               | Corticosteroides inhalados                                | hand-curated |
| `mepolizumab_det`           | Mepolizumab (detalle)                | Inmunosupresores/Biológicos                               | hand-curated |
| `benralizumab_det`          | Benralizumab (detalle)               | Inmunosupresores/Biológicos                               | hand-curated |
| `dupilumab_asma`            | Dupilumab (asma)                     | Inmunosupresores/Biológicos                               | hand-curated |
| `tezepelumab_det`           | Tezepelumab (detalle)                | Inmunosupresores/Biológicos                               | hand-curated |
| `fevipiprant`               | Fevipiprant                          | Antagonistas de prostaglandinas                           | hand-curated |
| `zileuton`                  | Zileuton                             | Inhibidores de leucotrienos                               | hand-curated |
| `erdosteina_det`            | Erdosteína (detalle)                 | Mucolíticos                                               | hand-curated |
| `bromhexina_det`            | Bromhexina (detalle)                 | Mucolíticos                                               | hand-curated |
| `sobrerrol`                 | Sobrerrol                            | Mucolíticos                                               | hand-curated |
| `pirfenidona_det`           | Pirfenidona (detalle)                | Antifibróticos pulmonares                                 | hand-curated |
| `nintedanib_det`            | Nintedanib (detalle)                 | Antifibróticos pulmonares                                 | hand-curated |
| `pentraxina`                | Pentraxina 2 recombinante            | Antifibróticos pulmonares biológicos                      | hand-curated |
| `pamrevlumab`               | Pamrevlumab                          | Antifibróticos pulmonares biológicos                      | hand-curated |
| `levodropropizina_det`      | Levodropropizina (detalle)           | Antitusígenos periféricos                                 | hand-curated |
| `butamirato_det`            | Butamirato (detalle)                 | Antitusígenos centrales no opioides                       | hand-curated |
| `cloperastina_det`          | Cloperastina (detalle)               | Antitusígenos centrales                                   | hand-curated |
| `bosentan_pulmonar`         | Bosentán                             | Antagonistas de endotelina                                | hand-curated |
| `sildenafilo_pulmonar`      | Sildenafilo (HAP)                    | Inhibidores de PDE-5 pulmonar                             | hand-curated |
| `tadalafilo_pulmonar`       | Tadalafilo (HAP)                     | Inhibidores de PDE-5 pulmonar                             | hand-curated |
| `salbutamol_ipratropio`     | Salbutamol/Ipratropio                | Combinación broncodilatadora                              | hand-curated |
| `fenoterol_ipratropio`      | Fenoterol/Ipratropio                 | Combinación broncodilatadora                              | hand-curated |
| `fluticasona_vilanterol`    | Fluticasona Furoato/Vilanterol       | Combinación ICS/LABA                                      | hand-curated |
| `indacaterol_glicopirronio` | Indacaterol/Glicopirronio            | Combinación LABA/LAMA                                     | hand-curated |
| `aclidinio_formoterol`      | Aclidinio/Formoterol                 | Combinación LAMA/LABA                                     | hand-curated |
| `tiotropio_olodaterol`      | Tiotropio/Olodaterol                 | Combinación LAMA/LABA                                     | hand-curated |
| `zafirlukast`               | Zafirlukast                          | Antileucotrienos                                          | hand-curated |
| `nedocromil`                | Nedocromil                           | Estabilizadores de mastocitos                             | hand-curated |
| `ensifentrine`              | Ensifentrina                         | Inhibidores duales PDE3/PDE4                              | hand-curated |
| `depemokimab`               | Depemokimab                          | Anticuerpos anti-IL-5                                     | hand-curated |
| `doxapram`                  | Doxapram                             | Analépticos respiratorios                                 | hand-curated |
| `almitrina`                 | Almitrina                            | Analépticos respiratorios                                 | hand-curated |
| `alfa1_antitripsina`        | Alfa-1 Antitripsina Humana           | Terapia de reemplazo                                      | hand-curated |
| `nafazolina`                | Nafazolina                           | Descongestionantes nasales                                | hand-curated |
| `cromoglicato_nasal`        | Cromoglicato Nasal                   | Estabilizadores de mastocitos nasales                     | hand-curated |
| `surfactante_poractant`     | Poractant Alfa                       | Surfactantes pulmonares                                   | hand-curated |
| `calfactant`                | Calfactant                           | Surfactantes pulmonares                                   | hand-curated |
| `caramifeno`                | Caramifeno                           | Antitusivos no narcóticos                                 | hand-curated |
| `pranlukast`                | Pranlukast                           | Antileucotrienos                                          | hand-curated |
| `alfa_dornasa`              | Dornasa Alfa                         | Mucolíticos enzimáticos                                   | hand-curated |

### Sistema Genitourinario y Reproductor — 75 entradas

| ID                            | Nombre                                | Familia                                           | Origen       |
| ----------------------------- | ------------------------------------- | ------------------------------------------------- | ------------ |
| `carbetocina_detalle`         | Carbetocina                           | Oxitócicos de larga duración                      | hand-curated |
| `indometacina_tocolitico`     | Indometacina (tocolítico)             | Tocolíticos (AINE)                                | hand-curated |
| `nifedipino_tocolitico`       | Nifedipino (tocolítico)               | Tocolíticos (calcioantagonista)                   | hand-curated |
| `terbutalina_tocolitica`      | Terbutalina (tocolítica)              | Tocolíticos (betamimético)                        | hand-curated |
| `prostaglandina_e1`           | Misoprostol (uso obstétrico cervical) | Prostaglandinas obstétricas                       | hand-curated |
| `methylergonovine`            | Metilergonovina                       | Oxitócicos (ergóticos)                            | hand-curated |
| `hierro_dextrano`             | Hierro Dextrano IV                    | Suplementos de hierro parenterales                | hand-curated |
| `hierro_isomaltosido`         | Hierro Isomaltósido                   | Suplementos de hierro parenterales                | hand-curated |
| `piridoxina_embarazo`         | Piridoxina (embarazo)                 | Vitaminas del complejo B                          | hand-curated |
| `cianocobalamina_embarazo`    | Cianocobalamina (embarazo)            | Vitaminas del complejo B                          | hand-curated |
| `vitamina_e_gestacional`      | Vitamina E (gestacional)              | Vitaminas liposolubles                            | hand-curated |
| `solifenacina`                | Solifenacina                          | Antimuscarínicos vesicales                        | hand-curated |
| `darifenacina`                | Darifenacina                          | Antimuscarínicos vesicales                        | hand-curated |
| `tolterodina`                 | Tolterodina                           | Antimuscarínicos vesicales                        | hand-curated |
| `oxibutinina`                 | Oxibutinina                           | Antimuscarínicos vesicales                        | hand-curated |
| `fesoterodina`                | Fesoterodina                          | Antimuscarínicos vesicales                        | hand-curated |
| `vibegron`                    | Vibegron                              | Agonistas beta-3 vesicales                        | hand-curated |
| `alfuzosina`                  | Alfuzosina                            | Alfabloqueantes uroselectivos                     | hand-curated |
| `silodosina`                  | Silodosina                            | Alfabloqueantes uroselectivos                     | hand-curated |
| `hidralazina_preeclampsia`    | Hidralazina (preeclampsia)            | Antihipertensivos en obstetricia                  | hand-curated |
| `diazepam_eclampsia`          | Diazepam (eclampsia)                  | Anticonvulsivantes en obstetricia                 | hand-curated |
| `dexametasona_prenatal`       | Dexametasona (prenatal)               | Corticosteroides sistémicos                       | hand-curated |
| `drospirenona`                | Drospirenona                          | Anticonceptivos hormonales                        | hand-curated |
| `gestodeno`                   | Gestodeno                             | Anticonceptivos hormonales                        | hand-curated |
| `ciproterona`                 | Ciproterona                           | Anticonceptivos hormonales                        | hand-curated |
| `desogestrel`                 | Desogestrel (solo)                    | Anticonceptivos hormonales                        | hand-curated |
| `norgestimato`                | Norgestimato                          | Anticonceptivos hormonales                        | hand-curated |
| `megestrol`                   | Megestrol                             | Progestágenos antineoplásicos                     | hand-curated |
| `danazol`                     | Danazol                               | Andrógenos sintéticos                             | hand-curated |
| `tibolona`                    | Tibolona                              | Terapia hormonal de menopausia                    | hand-curated |
| `pamidronato`                 | Pamidronato                           | Bifosfonatos                                      | hand-curated |
| `etidronato`                  | Etidronato                            | Bifosfonatos                                      | hand-curated |
| `abaloparatida_oseo`          | Abaloparatida                         | Anabólicos óseos                                  | hand-curated |
| `romosozumab_oseo`            | Romosozumab                           | Anabólicos óseos                                  | hand-curated |
| `bazedoxifeno`                | Bazedoxifeno                          | Moduladores selectivos de receptor estrogénico    | hand-curated |
| `gonadotropina_corionica`     | Gonadotropina Coriónica Humana (hCG)  | Gonadotropinas                                    | hand-curated |
| `menotropinas`                | Menotropinas (hMG)                    | Gonadotropinas                                    | hand-curated |
| `folitropina_alfa`            | Folitropina alfa                      | Gonadotropinas recombinantes                      | hand-curated |
| `folitropina_beta`            | Folitropina beta                      | Gonadotropinas recombinantes                      | hand-curated |
| `lutropina`                   | Lutropina alfa                        | Gonadotropinas recombinantes                      | hand-curated |
| `corifolitropina`             | Corifolitropina alfa                  | Gonadotropinas recombinantes de acción prolongada | hand-curated |
| `ganirelix_fert`              | Ganirelix                             | Antagonistas de GnRH                              | hand-curated |
| `cetrorelix_fert`             | Cetrorelix                            | Antagonistas de GnRH                              | hand-curated |
| `progesterona_micronizada`    | Progesterona Micronizada              | Progestágenos naturales                           | hand-curated |
| `dydrogesterona`              | Dydrogesterona                        | Progestágenos retro-esteroides                    | hand-curated |
| `elagolix`                    | Elagolix                              | Antagonistas orales de GnRH                       | hand-curated |
| `relugolix`                   | Relugolix                             | Antagonistas orales de GnRH                       | hand-curated |
| `dienogest_endo`              | Dienogest (endometriosis)             | Progestágenos antiendometriósicos                 | hand-curated |
| `leuprolida_endo`             | Leuprolida (endometriosis)            | Agonistas de GnRH                                 | hand-curated |
| `goserelina_endo`             | Goserelina (endometriosis)            | Agonistas de GnRH                                 | hand-curated |
| `nafarelina_endo`             | Nafarelina (endometriosis)            | Agonistas de GnRH                                 | hand-curated |
| `danazol_endo`                | Danazol (endometriosis)               | Andrógenos sintéticos (endometriosis)             | hand-curated |
| `tadalafilo_de`               | Tadalafilo                            | Inhibidores de PDE5                               | hand-curated |
| `vardenafilo`                 | Vardenafilo                           | Inhibidores de PDE5                               | hand-curated |
| `avanafilo`                   | Avanafilo                             | Inhibidores de PDE5                               | hand-curated |
| `alprostadil_de`              | Alprostadil (disfunción eréctil)      | Prostaglandinas (uso urológico)                   | hand-curated |
| `enzalutamida_prost`          | Enzalutamida                          | Antiandrógenos no esteroideos                     | hand-curated |
| `abiraterona_prost`           | Abiraterona                           | Inhibidores de CYP17                              | hand-curated |
| `apalutamida`                 | Apalutamida                           | Antiandrógenos no esteroideos                     | hand-curated |
| `darolutamida`                | Darolutamida                          | Antiandrógenos no esteroideos                     | hand-curated |
| `segesterona_etinilestradiol` | Anillo Vaginal Segesterona/EE         | Anticonceptivos hormonales                        | hand-curated |
| `drospirenona_sola`           | Drospirenona Sola                     | Anticonceptivos hormonales                        | hand-curated |
| `etonogestrel_implante_det`   | Etonogestrel Implante detallado       | Anticonceptivos hormonales                        | hand-curated |
| `diu_levonorgestrel_52`       | DIU-LNG 52 mg                         | Anticonceptivos hormonales                        | hand-curated |
| `ulipristal_anticoncepcion`   | Ulipristal Anticoncepción Emergencia  | Anticonceptivos hormonales                        | hand-curated |
| `romosozumab_detalle`         | Romosozumab detallado                 | Anticuerpos anti-esclerostina                     | hand-curated |
| `denosumab_osteo`             | Denosumab (Osteoporosis)              | Anticuerpos anti-RANKL                            | hand-curated |
| `cetrorelix_detalle`          | Cetrorelix detallado                  | Anticonceptivos hormonales                        | hand-curated |
| `acido_zoledronico_anual`     | Ácido Zoledrónico Anual               | Bisfosfonatos IV                                  | hand-curated |
| `vibegron_detalle`            | Vibegrón detallado                    | Agonistas beta-3 vesicales                        | hand-curated |
| `mirabegron_detalle`          | Mirabegrón detallado                  | Agonistas beta-3 vesicales                        | hand-curated |
| `dutasterida`                 | Dutasterida                           | Inhibidores de 5-alfa-reductasa                   | hand-curated |
| `terazosina`                  | Terazosina                            | Alfa-bloqueantes                                  | hand-curated |
| `zoledronato`                 | Ácido Zoledrónico                     | Bifosfonatos                                      | hand-curated |
| `citrato_potasico`            | Citrato de Potasio                    | Alcalinizantes urinarios                          | hand-curated |

### Antídotos y Emergencias — 66 entradas

| ID                             | Nombre                                   | Familia                          | Origen       |
| ------------------------------ | ---------------------------------------- | -------------------------------- | ------------ |
| `adrenalina`                   | Adrenalina (Epinefrina)                  | Catecolaminas                    | hand-curated |
| `atropina`                     | Atropina                                 | Anticolinergicos                 | hand-curated |
| `bicarbonato-sodio`            | Bicarbonato de Sodio                     | Electrolitos                     | hand-curated |
| `acido_tranexamico_emergencia` | Ácido tranexámico (trauma/hemorragia)    | Antifibrinolíticos               | hand-curated |
| `glucosa50_emergencia`         | Glucosa 50% (hipoglucemia severa)        | Soluciones de emergencia         | hand-curated |
| `succimero`                    | Succímero (DMSA)                         | Antídotos                        | hand-curated |
| `penicilamina_antidoto`        | Penicilamina (antídoto)                  | Antídotos                        | hand-curated |
| `deferasirox_antidoto`         | Deferasirox (antídoto)                   | Antídotos                        | hand-curated |
| `deferiprone`                  | Deferiprona                              | Antídotos                        | hand-curated |
| `leucovorina`                  | Leucovorina (ácido folínico)             | Antídotos                        | hand-curated |
| `glucarpidasa`                 | Glucarpidasa                             | Antídotos                        | hand-curated |
| `levocarnitina_antidoto`       | Levocarnitina (antídoto)                 | Antídotos                        | hand-curated |
| `digibind`                     | Anticuerpos anti-digoxina                | Antídotos                        | hand-curated |
| `octreotida_antidoto`          | Octreótida (antídoto)                    | Antídotos                        | hand-curated |
| `lipidos_iv_antidoto`          | Emulsión lipídica 20% (antídoto)         | Antídotos                        | hand-curated |
| `obidoxima`                    | Obidoxima                                | Antídotos                        | hand-curated |
| `silibinina`                   | Silibinina                               | Antídotos                        | hand-curated |
| `antiveneno_polivalente`       | Antiveneno polivalente                   | Antídotos                        | hand-curated |
| `antitoxina_botulinica`        | Antitoxina botulínica                    | Antídotos                        | hand-curated |
| `nitrito_sodio`                | Nitrito de sodio                         | Antídotos                        | hand-curated |
| `tiosulfato_sodio`             | Tiosulfato de sodio                      | Antídotos                        | hand-curated |
| `folinato_calcico`             | Folinato cálcico                         | Antídotos                        | hand-curated |
| `deferoxamina_aguda`           | Deferoxamina (aguda)                     | Antídotos                        | hand-curated |
| `amiodarona_emergencia`        | Amiodarona (emergencia)                  |                                  | hand-curated |
| `lidocaina_emergencia`         | Lidocaína (emergencia)                   |                                  | hand-curated |
| `glucagon_emergencia`          | Glucagón (emergencia)                    |                                  | hand-curated |
| `hidrocortisona_emergencia`    | Hidrocortisona (emergencia)              |                                  | hand-curated |
| `terbutalina_emergencia`       | Terbutalina (emergencia)                 |                                  | hand-curated |
| `aminofilina_emergencia`       | Aminofilina (emergencia)                 |                                  | hand-curated |
| `dopamina_emergencia`          | Dopamina (emergencia)                    |                                  | hand-curated |
| `fentolamina_emergencia`       | Fentolamina (emergencia)                 |                                  | hand-curated |
| `labetalol_emergencia`         | Labetalol (emergencia)                   |                                  | hand-curated |
| `noradrenalina_emergencia`     | Noradrenalina (emergencia)               |                                  | hand-curated |
| `ciproheptadina`               | Ciproheptadina                           | Antídotos                        | hand-curated |
| `bromocriptina_snm`            | Bromocriptina (SNM)                      | Antídotos                        | hand-curated |
| `dantroleno_snm`               | Dantroleno (SNM/HM)                      | Antídotos                        | hand-curated |
| `diazepam_emergencia`          | Diazepam (emergencia)                    | Antídotos                        | hand-curated |
| `fenobarbital_emergencia`      | Fenobarbital (emergencia)                | Antídotos                        | hand-curated |
| `clonidina_abstinencia`        | Clonidina (abstinencia)                  | Antídotos                        | hand-curated |
| `lorazepam_emergencia`         | Lorazepam (emergencia)                   | Antídotos                        | hand-curated |
| `naltrexona_emergencia`        | Naltrexona (emergencia)                  | Antídotos                        | hand-curated |
| `adrenalina_autoinyector`      | Adrenalina autoinyector                  |                                  | hand-curated |
| `vasopresina_rcp`              | Vasopresina RCP                          |                                  | hand-curated |
| `calcio_cloruro_rcp`           | Cloruro de calcio RCP                    |                                  | hand-curated |
| `alteplasa_masivo`             | Alteplasa TEP masivo                     |                                  | hand-curated |
| `efedrina_anestesia`           | Efedrina (anestesia)                     |                                  | hand-curated |
| `etilefrina`                   | Etilefrina                               |                                  | hand-curated |
| `bicarbonato_rcp`              | Bicarbonato de sodio RCP                 |                                  | hand-curated |
| `sugammadex_detalle`           | Sugammadex detallado                     | Antídotos                        | hand-curated |
| `idarucizumab_detalle`         | Idarucizumab detallado                   | Antídotos                        | hand-curated |
| `andexanet_detalle`            | Andexanet Alfa detallado                 | Antídotos                        | hand-curated |
| `acido_folínico_rescue`        | Ácido Folínico (Rescate)                 | Antídotos                        | hand-curated |
| `fomepizol_detalle`            | Fomepizol detallado                      | Antídotos                        | hand-curated |
| `hidroxocobalamina_detalle`    | Hidroxocobalamina (Antídoto)             | Antídotos                        | hand-curated |
| `emulsion_lipidica_20`         | Emulsión Lipídica 20% (Antídoto)         | Antídotos                        | hand-curated |
| `glucosa_50_detalle`           | Glucosa 50% (Emergencia)                 | Antídotos                        | hand-curated |
| `diazepam_status`              | Diazepam Status Epilepticus              | Anticonvulsivantes de emergencia | hand-curated |
| `midazolam_emergencia`         | Midazolam Emergencia                     | Anticonvulsivantes de emergencia | hand-curated |
| `tiamina_iv_emergencia`        | Tiamina IV (Emergencia)                  | Vitaminas de emergencia          | hand-curated |
| `octreotida_hipoglucemia`      | Octreótida para Hipoglucemia             | Antídotos                        | hand-curated |
| `dantroleno_hipertermia`       | Dantroleno IV (Hipertermia Maligna)      | Antídotos                        | hand-curated |
| `flumazenilo_detalle`          | Flumazenilo detallado                    | Antídotos                        | hand-curated |
| `acido_tranexamico_masivo`     | Ácido Tranexámico (Hemorragia Masiva)    | Antifibrinolíticos de emergencia | hand-curated |
| `epinefrina_anafilaxia`        | Epinefrina Autoinyector (Anafilaxia)     | Antídotos                        | hand-curated |
| `atropina_organofosforado`     | Atropina (Intoxicación Organofosforados) | Antídotos                        | hand-curated |
| `icatibant`                    | Icatibant                                | Antagonistas de bradicinina      | hand-curated |

### Sistema Musculoesquelético — 65 entradas

| ID                      | Nombre                           | Familia                                       | Origen       |
| ----------------------- | -------------------------------- | --------------------------------------------- | ------------ |
| `ketorolaco_iv`         | Ketorolaco IV/IM                 | AINEs parenterales                            | hand-curated |
| `flurbiprofeno`         | Flurbiprofeno                    | Antiinflamatorios no esteroideos              | hand-curated |
| `sulindaco`             | Sulindaco                        | Antiinflamatorios no esteroideos              | hand-curated |
| `diflunisal`            | Diflunisal                       | Antiinflamatorios no esteroideos              | hand-curated |
| `meclofenato`           | Meclofenato                      | Antiinflamatorios no esteroideos              | hand-curated |
| `tolmetina`             | Tolmetina                        | Antiinflamatorios no esteroideos              | hand-curated |
| `nimesulida`            | Nimesulida                       | Antiinflamatorios no esteroideos              | hand-curated |
| `parecoxib`             | Parecoxib                        | Antiinflamatorios no esteroideos              | hand-curated |
| `tenoxicam`             | Tenoxicam                        | Antiinflamatorios no esteroideos              | hand-curated |
| `oxaprozina`            | Oxaprozina                       | Antiinflamatorios no esteroideos              | hand-curated |
| `fenbufen`              | Fenbufen                         | Antiinflamatorios no esteroideos              | hand-curated |
| `clorzoxazona`          | Clorzoxazona                     | Relajantes musculares                         | hand-curated |
| `carisoprodol`          | Carisoprodol                     | Relajantes musculares                         | hand-curated |
| `metaxalona`            | Metaxalona                       | Relajantes musculares                         | hand-curated |
| `pridinol_muscular`     | Pridinol                         | Relajantes musculares                         | hand-curated |
| `eperisona`             | Eperisona                        | Relajantes musculares                         | hand-curated |
| `tiocolchicosido`       | Tiocolchicósido                  | Relajantes musculares                         | hand-curated |
| `probenecid`            | Probenecid                       | Antigotosos (uricosúricos)                    | hand-curated |
| `rasburicasa`           | Rasburicasa                      | Antigotosos (urato oxidasa)                   | hand-curated |
| `pegloticase`           | Pegloticasa                      | Antigotosos (uricasa pegilada)                | hand-curated |
| `benzbromarona`         | Benzbromarona                    | Antigotosos (uricosúricos)                    | hand-curated |
| `lesinurad`             | Lesinurad                        | Antigotosos (uricosúricos selectivos)         | hand-curated |
| `sulfinpirazona`        | Sulfinpirazona                   | Antigotosos (uricosúricos)                    | hand-curated |
| `sarilumab`             | Sarilumab                        | Inmunosupresores/Biológicos                   | hand-curated |
| `guselkumab`            | Guselkumab                       | Inmunosupresores/Biológicos                   | hand-curated |
| `risankizumab_reum`     | Risankizumab                     | Inmunosupresores/Biológicos                   | hand-curated |
| `brodalumab`            | Brodalumab                       | Inmunosupresores/Biológicos                   | hand-curated |
| `filgotinib_reum`       | Filgotinib                       | Inmunosupresores/Biológicos                   | hand-curated |
| `upadacitinib`          | Upadacitinib                     | Inmunosupresores/Biológicos                   | hand-curated |
| `deucravacitinib`       | Deucravacitinib                  | Inmunosupresores/Biológicos                   | hand-curated |
| `anifrolumab`           | Anifrolumab                      | Inmunosupresores/Biológicos                   | hand-curated |
| `tanezumab`             | Tanezumab                        | Anticuerpos anti-NGF                          | hand-curated |
| `diacereina`            | Diacereína                       | SYSADOA (fármacos de acción lenta para OA)    | hand-curated |
| `condroitin_sulfato`    | Condroitín Sulfato               | SYSADOA (fármacos de acción lenta para OA)    | hand-curated |
| `glucosamina`           | Glucosamina                      | SYSADOA (fármacos de acción lenta para OA)    | hand-curated |
| `acido_hialuronico_ia`  | Ácido Hialurónico Intraarticular | Viscosuplementación                           | hand-curated |
| `plasma_rico_plaquetas` | Plasma Rico en Plaquetas (PRP)   | Terapias biológicas autólogas                 | hand-curated |
| `ranelato_estroncio`    | Ranelato de Estroncio            | Fármacos para osteoporosis                    | hand-curated |
| `romosozumab_musculo`   | Romosozumab                      | Inmunosupresores/Biológicos                   | hand-curated |
| `ataluren`              | Ataluren                         | Terapia de lectura de codones de parada (DMD) | hand-curated |
| `eteplirsen`            | Eteplirsen                       | Terapia antisentido para distrofinopatías     | hand-curated |
| `golodirsen`            | Golodirsen                       | Terapia antisentido para distrofinopatías     | hand-curated |
| `casimersen`            | Casimersen                       | Terapia antisentido para distrofinopatías     | hand-curated |
| `viltolarsen`           | Viltolarsen                      | Terapia antisentido para distrofinopatías     | hand-curated |
| `risdiplam`             | Risdiplam                        | Modificadores del splicing de SMN2            | hand-curated |
| `deflazacort_dmd`       | Deflazacort                      | Corticosteroides sistémicos                   | hand-curated |
| `prednisona_dmd`        | Prednisona (DMD)                 | Corticosteroides sistémicos                   | hand-curated |
| `diclofenaco_topico`    | Diclofenaco Tópico               | AINEs tópicos                                 | hand-curated |
| `ketoprofeno_topico`    | Ketoprofeno Tópico               | AINEs tópicos                                 | hand-curated |
| `capsaicina_topica`     | Capsaicina Tópica                | Analgésicos tópicos vanilloides               | hand-curated |
| `lidocaina_parche`      | Lidocaína Parche Tópico          | Anestésicos locales tópicos                   | hand-curated |
| `metilsalicilato`       | Metilsalicilato                  | Rubefacientes y contrairritantes              | hand-curated |
| `mentol_topico`         | Mentol Tópico                    | Rubefacientes y contrairritantes              | hand-curated |
| `piroxicam_topico`      | Piroxicam Tópico                 | AINEs tópicos                                 | hand-curated |
| `flurbiprofeno_topico`  | Flurbiprofeno Tópico             | AINEs tópicos                                 | hand-curated |
| `etoricoxib_detalle`    | Etoricoxib detallado             | Antiinflamatorios no esteroideos              | hand-curated |
| `secukinumab_reum`      | Secukinumab (Reumatología)       | Inmunosupresores/Biológicos                   | hand-curated |
| `ixekizumab_reum`       | Ixekizumab (Reumatología)        | Inmunosupresores/Biológicos                   | hand-curated |
| `apremilast_reum`       | Apremilast (Reumatología)        | Inhibidores de PDE4                           | hand-curated |
| `deucravacitinib_reum`  | Deucravacitinib detallado        | Inhibidores de TYK2                           | hand-curated |
| `naproxeno_esomeprazol` | Naproxeno/Esomeprazol            | AINE + gastroprotector                        | hand-curated |
| `anifrolumab_detalle`   | Anifrolumab detallado            | Inmunosupresores/Biológicos                   | hand-curated |
| `diflunisal_detalle`    | Diflunisal detallado             | Antiinflamatorios no esteroideos              | hand-curated |
| `tofacitinib_detalle`   | Tofacitinib detallado            | Inmunosupresores/Biológicos                   | hand-curated |
| `belimumab_reum`        | Belimumab                        | Inmunosupresores/Biológicos                   | hand-curated |

### Sangre y Órganos Hematopoyéticos — 64 entradas

| ID                            | Nombre                                     | Familia                         | Origen       |
| ----------------------------- | ------------------------------------------ | ------------------------------- | ------------ |
| `alteplasa_iam`               | Alteplasa (protocolo IAM)                  | Trombolíticos                   | hand-curated |
| `tinzaparina`                 | Tinzaparina                                | Heparinas                       | hand-curated |
| `nadroparina`                 | Nadroparina                                | Heparinas                       | hand-curated |
| `dalteparina`                 | Dalteparina                                | Heparinas                       | hand-curated |
| `cangrelor`                   | Cangrelor                                  |                                 | hand-curated |
| `sulodexida`                  | Sulodexida                                 |                                 | hand-curated |
| `defibrotida`                 | Defibrotida                                |                                 | hand-curated |
| `danaparoide`                 | Danaparoide                                |                                 | hand-curated |
| `caplacizumab`                | Caplacizumab                               |                                 | hand-curated |
| `iloprost_iv`                 | Iloprost IV                                |                                 | hand-curated |
| `pentosano_polisulfato`       | Pentosano polisulfato sódico               |                                 | hand-curated |
| `factor_viii_rec`             | Factor VIII recombinante                   |                                 | hand-curated |
| `factor_ix_rec`               | Factor IX recombinante                     |                                 | hand-curated |
| `factor_viia_rec`             | Factor VIIa recombinante                   |                                 | hand-curated |
| `fibrinogeno_concentrado`     | Fibrinógeno concentrado                    |                                 | hand-curated |
| `desmopresina_hemat`          | Desmopresina (hematológica)                |                                 | hand-curated |
| `complejo_coag_activado`      | FEIBA (complejo coagulante anti-inhibidor) |                                 | hand-curated |
| `fitomenadiona_iv`            | Fitomenadiona IV (Vitamina K1)             |                                 | hand-curated |
| `etamsilato`                  | Etamsilato                                 |                                 | hand-curated |
| `acido_epsilon_aminocaproico` | Ácido epsilon-aminocaproico                |                                 | hand-curated |
| `trombina_topica`             | Trombina tópica                            |                                 | hand-curated |
| `plasma_fresco`               | Plasma fresco congelado                    |                                 | hand-curated |
| `concentrado_plaquetas`       | Concentrado de plaquetas                   |                                 | hand-curated |
| `hierro_isomaltoside`         | Hierro isomaltósido                        |                                 | hand-curated |
| `ferumoxitol`                 | Ferumoxitol                                |                                 | hand-curated |
| `luspatercept`                | Luspatercept                               |                                 | hand-curated |
| `avatrombopag`                | Avatrombopag                               |                                 | hand-curated |
| `pegfilgrastim`               | Pegfilgrastim                              |                                 | hand-curated |
| `sargramostim`                | Sargramostim (GM-CSF)                      |                                 | hand-curated |
| `plerixafor`                  | Plerixafor                                 |                                 | hand-curated |
| `emicizumab_profilaxis`       | Emicizumab profilaxis                      |                                 | hand-curated |
| `fitusiran`                   | Fitusiran                                  |                                 | hand-curated |
| `concizumab`                  | Concizumab                                 |                                 | hand-curated |
| `sutimlimab`                  | Sutimlimab                                 |                                 | hand-curated |
| `ravulizumab`                 | Ravulizumab                                |                                 | hand-curated |
| `eculizumab_hemat`            | Eculizumab (hematológico)                  |                                 | hand-curated |
| `iptacopan`                   | Iptacopan                                  |                                 | hand-curated |
| `ruxolitinib_hemat`           | Ruxolitinib (hematológico)                 |                                 | hand-curated |
| `fedratinib`                  | Fedratinib                                 |                                 | hand-curated |
| `anagrelida`                  | Anagrelida                                 |                                 | hand-curated |
| `dasatinib`                   | Dasatinib                                  |                                 | hand-curated |
| `nilotinib`                   | Nilotinib                                  |                                 | hand-curated |
| `ponatinib`                   | Ponatinib                                  |                                 | hand-curated |
| `interferón_alfa_mpn`         | Interferón alfa (NMP)                      |                                 | hand-curated |
| `ropeginterferon`             | Ropeginterferón alfa-2b                    |                                 | hand-curated |
| `apixaban_detalle`            | Apixabán Tromboprofilaxis                  | Anticoagulantes orales directos | hand-curated |
| `heparina_bajo_peso`          | Heparina bajo peso molecular genérica      | Heparinas                       | hand-curated |
| `rivaroxaban_profilaxis`      | Rivaroxabán Tromboprofilaxis               | Anticoagulantes orales directos | hand-curated |
| `alteplasa_tvp`               | Alteplasa para TEP masivo                  | Trombolíticos                   | hand-curated |
| `ticlopidina`                 | Ticlopidina                                | Antiagregantes plaquetarios     | hand-curated |
| `trombopoietina_romiplostim`  | Romiplostim detallado                      | Agonistas de trombopoyetina     | hand-curated |
| `luspatercept_detalle`        | Luspatercept detallado                     | Agentes de maduración eritroide | hand-curated |
| `eltrombopag_detalle`         | Eltrombopag detallado                      | Agonistas de trombopoyetina     | hand-curated |
| `acido_aminocaproico_iv`      | Ácido Aminocaproico IV                     | Antifibrinolíticos              | hand-curated |
| `trombina_recombinante`       | Trombina Recombinante Tópica               | Hemostáticos tópicos            | hand-curated |
| `sellador_fibrina`            | Sellador de Fibrina                        | Adhesivos tisulares             | hand-curated |
| `abelacimab`                  | Abelacimab                                 | Anticuerpos anti-factor XI      | hand-curated |
| `milvexian`                   | Milvexián                                  | Inhibidores de factor XIa       | hand-curated |
| `tisagenlecleucel`            | Tisagenlecleucel                           | Terapia celular CAR-T           | hand-curated |
| `axicabtagene_ciloleucel`     | Axicabtagén Ciloleucel                     | Terapia celular CAR-T           | hand-curated |
| `voxelotor`                   | Voxelotor                                  | Anti-falciformación             | hand-curated |
| `crizanlizumab`               | Crizanlizumab                              | Anti-adhesión celular           | hand-curated |
| `hidroxiurea_falciforme`      | Hidroxiurea (Falciforme)                   | Inductores de HbF               | hand-curated |
| `protamina_detalle`           | Protamina detallado                        | Antídotos                       | hand-curated |

### OTROS PREPARADOS PARA EL RESFRIADO — 14 entradas

| ID                                                                                           | Nombre                                                                                | Familia                            | Origen |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------- | ------ |
| `cima_alcanfor___mentol`                                                                     | Alcanfor + Mentol                                                                     | OTROS PREPARADOS PARA EL RESFRIADO | CIMA   |
| `cima_echinacea_purpurea`                                                                    | Echinacea Purpurea                                                                    | OTROS PREPARADOS PARA EL RESFRIADO | CIMA   |
| `cima_gentiana_lutea___primula_veris___rumex_crispus___sambucus_nigra___verbena_officinalis` | Gentiana Lutea + Primula Veris + Rumex Crispus + Sambucus Nigra + Verbena Officinalis | OTROS PREPARADOS PARA EL RESFRIADO | CIMA   |
| `cima_ibuprofeno___clorfenamina___fenilefrina`                                               | Ibuprofeno + Clorfenamina + Fenilefrina                                               | OTROS PREPARADOS PARA EL RESFRIADO | CIMA   |
| `cima_ibuprofeno___pseudoefedrina`                                                           | Ibuprofeno + Pseudoefedrina                                                           | OTROS PREPARADOS PARA EL RESFRIADO | CIMA   |
| `cima_paracetamol___bromfeniramina___cafeina`                                                | Paracetamol + Bromfeniramina + Cafeína                                                | OTROS PREPARADOS PARA EL RESFRIADO | CIMA   |
| `cima_paracetamol___cafeina___clorfenamina`                                                  | Paracetamol + Cafeína + Clorfenamina                                                  | OTROS PREPARADOS PARA EL RESFRIADO | CIMA   |
| `cima_paracetamol___cafeina___clorfenamina___salicilamida`                                   | Paracetamol + Cafeína + Clorfenamina + Salicilamida                                   | OTROS PREPARADOS PARA EL RESFRIADO | CIMA   |
| `cima_paracetamol___cafeina___fenilefrina`                                                   | Paracetamol + Cafeína + Fenilefrina                                                   | OTROS PREPARADOS PARA EL RESFRIADO | CIMA   |
| `cima_paracetamol___clorfenamina___dextrometorfano`                                          | Paracetamol + Clorfenamina + Dextrometorfano                                          | OTROS PREPARADOS PARA EL RESFRIADO | CIMA   |
| `cima_paracetamol___dextrometorfano___doxilamina`                                            | Paracetamol + Dextrometorfano + Doxilamina                                            | OTROS PREPARADOS PARA EL RESFRIADO | CIMA   |
| `cima_paracetamol___dextrometorfano___pseudoefedrina`                                        | Paracetamol + Dextrometorfano + Pseudoefedrina                                        | OTROS PREPARADOS PARA EL RESFRIADO | CIMA   |
| `cima_paracetamol___pseudoefedrina`                                                          | Paracetamol + Pseudoefedrina                                                          | OTROS PREPARADOS PARA EL RESFRIADO | CIMA   |
| `cima_acido_acetilsalicilico___clorfenamina___cafeina___acido_ascorbico`                     | Ácido Acetilsalicílico + Clorfenamina + Cafeína + Ácido Ascórbico                     | OTROS PREPARADOS PARA EL RESFRIADO | CIMA   |

### Combinaciones — 14 entradas

| ID                                                                        | Nombre                                                             | Familia       | Origen |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------- | ------ |
| `cima_althaea_officinalis___tilia_sp___plantago_lanceolata`               | Althaea Officinalis + Tilia Sp + Plantago Lanceolata               | Combinaciones | CIMA   |
| `cima_carbocisteina___prometazina`                                        | Carbocisteína + Prometazina                                        | Combinaciones | CIMA   |
| `cima_clopidogrel___acido_acetilsalicilico`                               | Clopidogrel + Ácido Acetilsalicílico                               | Combinaciones | CIMA   |
| `cima_dextrometorfano___pseudoefedrina___triprolidina`                    | Dextrometorfano + Pseudoefedrina + Triprolidina                    | Combinaciones | CIMA   |
| `cima_fibrinogeno_humano___aprotinina___trombina_humana___calcio_cloruro` | Fibrinógeno Humano + Aprotinina + Trombina Humana + Calcio Cloruro | Combinaciones | CIMA   |
| `cima_fibrinogeno_humano___trombina_humana`                               | Fibrinógeno Humano + Trombina Humana                               | Combinaciones | CIMA   |
| `cima_folitropina_alfa___lutropina_alfa`                                  | Folitropina Alfa + Lutropina Alfa                                  | Combinaciones | CIMA   |
| `cima_guaifenesina___pseudoefedrina`                                      | Guaifenesina + Pseudoefedrina                                      | Combinaciones | CIMA   |
| `cima_lidocaina___prilocaina`                                             | Lidocaína + Prilocaína                                             | Combinaciones | CIMA   |
| `cima_nafazolina___tetracaina`                                            | Nafazolina + Tetracaína                                            | Combinaciones | CIMA   |
| `cima_oxibuprocaina___tetracaina`                                         | Oxibuprocaína + Tetracaína                                         | Combinaciones | CIMA   |
| `cima_primula_veris_elatior___thymus_vulgaris_zygis`                      | Primula Veris/Elatior + Thymus Vulgaris/Zygis                      | Combinaciones | CIMA   |
| `cima_thymus_vulgaris___hedera_helix`                                     | Thymus Vulgaris + Hedera Helix                                     | Combinaciones | CIMA   |
| `cima_vacuna_anti_hepatitis_a_b`                                          | Vacuna Anti Hepatitis A/B                                          | Combinaciones | CIMA   |

### Factor VIII de la coagulacion — 10 entradas

| ID                            | Nombre                 | Familia                       | Origen |
| ----------------------------- | ---------------------- | ----------------------------- | ------ |
| `cima_damoctocog_alfa_pegol`  | Damoctocog Alfa Pegol  | Factor VIII de la coagulacion | CIMA   |
| `cima_efanesoctocog_alfa`     | Efanesoctocog Alfa     | Factor VIII de la coagulacion | CIMA   |
| `cima_efmoroctocog_alfa`      | Efmoroctocog Alfa      | Factor VIII de la coagulacion | CIMA   |
| `cima_factor_viii_purificado` | Factor Viii Purificado | Factor VIII de la coagulacion | CIMA   |
| `cima_lonoctocog_alfa`        | Lonoctocog Alfa        | Factor VIII de la coagulacion | CIMA   |
| `cima_moroctocog_alfa`        | Moroctocog Alfa        | Factor VIII de la coagulacion | CIMA   |
| `cima_rurioctocog_alfa_pegol` | Rurioctocog Alfa Pegol | Factor VIII de la coagulacion | CIMA   |
| `cima_simoctocog_alfa`        | Simoctocog Alfa        | Factor VIII de la coagulacion | CIMA   |
| `cima_turoctocog_alfa`        | Turoctocog Alfa        | Factor VIII de la coagulacion | CIMA   |
| `cima_turoctocog_alfa_pegol`  | Turoctocog Alfa Pegol  | Factor VIII de la coagulacion | CIMA   |

### Paracetamol, combinaciones excluyendo psicolepticos — 9 entradas

| ID                                                                   | Nombre                                                        | Familia                                             | Origen |
| -------------------------------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------- | ------ |
| `cima_paracetamol___cafeina`                                         | Paracetamol + Cafeína                                         | Paracetamol, combinaciones excluyendo psicolepticos | CIMA   |
| `cima_paracetamol___cafeina___propifenazona`                         | Paracetamol + Cafeína + Propifenazona                         | Paracetamol, combinaciones excluyendo psicolepticos | CIMA   |
| `cima_paracetamol___clorfenamina___dextrometorfano___pseudoefedrina` | Paracetamol + Clorfenamina + Dextrometorfano + Pseudoefedrina | Paracetamol, combinaciones excluyendo psicolepticos | CIMA   |
| `cima_paracetamol___clorfenamina___fenilefrina`                      | Paracetamol + Clorfenamina + Fenilefrina                      | Paracetamol, combinaciones excluyendo psicolepticos | CIMA   |
| `cima_paracetamol___clorfenamina___pseudoefedrina`                   | Paracetamol + Clorfenamina + Pseudoefedrina                   | Paracetamol, combinaciones excluyendo psicolepticos | CIMA   |
| `cima_paracetamol___fenilefrina`                                     | Paracetamol + Fenilefrina                                     | Paracetamol, combinaciones excluyendo psicolepticos | CIMA   |
| `cima_paracetamol___fenilefrina___guaifenesina`                      | Paracetamol + Fenilefrina + Guaifenesina                      | Paracetamol, combinaciones excluyendo psicolepticos | CIMA   |
| `cima_paracetamol___ibuprofeno`                                      | Paracetamol + Ibuprofeno                                      | Paracetamol, combinaciones excluyendo psicolepticos | CIMA   |
| `cima_paracetamol___acido_ascorbico`                                 | Paracetamol + Ácido Ascórbico                                 | Paracetamol, combinaciones excluyendo psicolepticos | CIMA   |

### Timolol, combinaciones con — 7 entradas

| ID                            | Nombre                 | Familia                    | Origen |
| ----------------------------- | ---------------------- | -------------------------- | ------ |
| `cima_bimatoprost___timolol`  | Bimatoprost + Timolol  | Timolol, combinaciones con | CIMA   |
| `cima_brimonidina___timolol`  | Brimonidina + Timolol  | Timolol, combinaciones con | CIMA   |
| `cima_brinzolamida___timolol` | Brinzolamida + Timolol | Timolol, combinaciones con | CIMA   |
| `cima_dorzolamida___timolol`  | Dorzolamida + Timolol  | Timolol, combinaciones con | CIMA   |
| `cima_latanoprost___timolol`  | Latanoprost + Timolol  | Timolol, combinaciones con | CIMA   |
| `cima_tafluprost___timolol`   | Tafluprost + Timolol   | Timolol, combinaciones con | CIMA   |
| `cima_travoprost___timolol`   | Travoprost + Timolol   | Timolol, combinaciones con | CIMA   |

### Dexametasona y antiinfecciosos — 6 entradas

| ID                                                | Nombre                                     | Familia                        | Origen |
| ------------------------------------------------- | ------------------------------------------ | ------------------------------ | ------ |
| `cima_dexametasona___levofloxacino`               | Dexametasona + Levofloxacino               | Dexametasona y antiinfecciosos | CIMA   |
| `cima_dexametasona___neomicina___polimixina_b`    | Dexametasona + Neomicina + Polimixina B    | Dexametasona y antiinfecciosos | CIMA   |
| `cima_dexametasona___netilmicina`                 | Dexametasona + Netilmicina                 | Dexametasona y antiinfecciosos | CIMA   |
| `cima_dexametasona___polimixina_b___trimetoprima` | Dexametasona + Polimixina B + Trimetoprima | Dexametasona y antiinfecciosos | CIMA   |
| `cima_dexametasona___tobramicina`                 | Dexametasona + Tobramicina                 | Dexametasona y antiinfecciosos | CIMA   |
| `cima_gentamicina___dexametasona___tetrizolina`   | Gentamicina + Dexametasona + Tetrizolina   | Dexametasona y antiinfecciosos | CIMA   |

### Factor IX de la coagulacion — 5 entradas

| ID                           | Nombre                | Familia                     | Origen |
| ---------------------------- | --------------------- | --------------------------- | ------ |
| `cima_albutrepenonacog_alfa` | Albutrepenonacog Alfa | Factor IX de la coagulacion | CIMA   |
| `cima_eftrenonacog_alfa`     | Eftrenonacog Alfa     | Factor IX de la coagulacion | CIMA   |
| `cima_factor_ix_purificado`  | Factor Ix Purificado  | Factor IX de la coagulacion | CIMA   |
| `cima_nonacog_beta_pegol`    | Nonacog Beta Pegol    | Factor IX de la coagulacion | CIMA   |
| `cima_nonacog_gamma`         | Nonacog Gamma         | Factor IX de la coagulacion | CIMA   |

### Varios — 5 entradas

| ID                                                                   | Nombre                                                        | Familia | Origen |
| -------------------------------------------------------------------- | ------------------------------------------------------------- | ------- | ------ |
| `cima_alcohol_diclorobencilico___amilmetacresol`                     | Alcohol Diclorobencílico + Amilmetacresol                     | Varios  | CIMA   |
| `cima_alcohol_diclorobencilico___amilmetacresol___lidocaina`         | Alcohol Diclorobencílico + Amilmetacresol + Lidocaína         | Varios  | CIMA   |
| `cima_salicilato_de_metilo___alcanfor___esencia_trementina___mentol` | Salicilato De Metilo + Alcanfor + Esencia Trementina + Mentol | Varios  | CIMA   |
| `cima_salicilato_de_metilo___alcanfor___mentol`                      | Salicilato De Metilo + Alcanfor + Mentol                      | Varios  | CIMA   |
| `cima_acido_salicilico___rheum_officinale`                           | Ácido Salicílico + Rheum Officinale                           | Varios  | CIMA   |

### Electrolitos — 5 entradas

| ID                                           | Nombre                                | Familia      | Origen |
| -------------------------------------------- | ------------------------------------- | ------------ | ------ |
| `cima_sodio_acetato`                         | Sodio Acetato                         | Electrolitos | CIMA   |
| `cima_sodio_cloruro`                         | Sodio Cloruro                         | Electrolitos | CIMA   |
| `cima_sodio_cloruro___potasio_cloruro`       | Sodio Cloruro + Potasio Cloruro       | Electrolitos | CIMA   |
| `cima_solucion_de_ringer`                    | Solución De Ringer                    | Electrolitos | CIMA   |
| `cima_solucion_de_ringer_lactato___dextrosa` | Solución De Ringer Lactato + Dextrosa | Electrolitos | CIMA   |

### Betametasona — 4 entradas

| ID                                                          | Nombre                                               | Familia      | Origen |
| ----------------------------------------------------------- | ---------------------------------------------------- | ------------ | ------ |
| `cima_betametasona`                                         | Betametasona                                         | Betametasona | CIMA   |
| `cima_betametasona___fluocinolona`                          | Betametasona + Fluocinolona                          | Betametasona | CIMA   |
| `cima_betametasona___acido_salicilico`                      | Betametasona + Ácido Salicílico                      | Betametasona | CIMA   |
| `cima_gentamicina___betametasona___clioquinol___tolnaftato` | Gentamicina + Betametasona + Clioquinol + Tolnaftato | Betametasona | CIMA   |

### Lagrimas artificiales y otros preparados inertes — 4 entradas

| ID                                 | Nombre                      | Familia                                          | Origen |
| ---------------------------------- | --------------------------- | ------------------------------------------------ | ------ |
| `cima_carbomero`                   | Carbomero                   | Lagrimas artificiales y otros preparados inertes | CIMA   |
| `cima_carmelosa`                   | Carmelosa                   | Lagrimas artificiales y otros preparados inertes | CIMA   |
| `cima_hipromelosa`                 | Hipromelosa                 | Lagrimas artificiales y otros preparados inertes | CIMA   |
| `cima_hipromelosa___sodio_cloruro` | Hipromelosa + Sodio Cloruro | Lagrimas artificiales y otros preparados inertes | CIMA   |

### Eritropoyetina — 4 entradas

| ID                    | Nombre         | Familia        | Origen |
| --------------------- | -------------- | -------------- | ------ |
| `cima_epoetina_alfa`  | Epoetina Alfa  | Eritropoyetina | CIMA   |
| `cima_epoetina_beta`  | Epoetina Beta  | Eritropoyetina | CIMA   |
| `cima_epoetina_dseta` | Epoetina Dseta | Eritropoyetina | CIMA   |
| `cima_epoetina_zeta`  | Epoetina Zeta  | Eritropoyetina | CIMA   |

### Hidrocortisona — 4 entradas

| ID                                                            | Nombre                                                 | Familia        | Origen |
| ------------------------------------------------------------- | ------------------------------------------------------ | -------------- | ------ |
| `cima_hidrocortisona___benzalconio_cloruro`                   | Hidrocortisona + Benzalconio Cloruro                   | Hidrocortisona | CIMA   |
| `cima_hidrocortisona___benzocaina___neomicina___acido_tanico` | Hidrocortisona + Benzocaína + Neomicina + Ácido Tánico | Hidrocortisona | CIMA   |
| `cima_hidrocortisona___cincocaina`                            | Hidrocortisona + Cincocaína                            | Hidrocortisona | CIMA   |
| `cima_hidrocortisona___propanocaina`                          | Hidrocortisona + Propanocaína                          | Hidrocortisona | CIMA   |

### Otros productos urologicos — 3 entradas

| ID                                                            | Nombre                                                  | Familia                    | Origen |
| ------------------------------------------------------------- | ------------------------------------------------------- | -------------------------- | ------ |
| `cima_arctostaphylos_uvaursi`                                 | Arctostaphylos Uva-Ursi                                 | Otros productos urologicos | CIMA   |
| `cima_arctostaphylos_uvaursi___betula_sp___solidago_gigantea` | Arctostaphylos Uva-Ursi + Betula Sp + Solidago Gigantea | Otros productos urologicos | CIMA   |
| `cima_vaccinium_macrocarpon`                                  | Vaccinium Macrocarpon                                   | Otros productos urologicos | CIMA   |

### Aminoacidos y derivados — 3 entradas

| ID                        | Nombre             | Familia                 | Origen |
| ------------------------- | ------------------ | ----------------------- | ------ |
| `cima_arginina_aspartato` | Arginina Aspartato | Aminoacidos y derivados | CIMA   |
| `cima_cistina`            | Cistina            | Aminoacidos y derivados | CIMA   |
| `cima_citrulina`          | Citrulina          | Aminoacidos y derivados | CIMA   |

### Antisepticos — 3 entradas

| ID                                             | Nombre                                  | Familia      | Origen |
| ---------------------------------------------- | --------------------------------------- | ------------ | ------ |
| `cima_benzocaina___clorhexidina___enoxolona`   | Benzocaína + Clorhexidina + Enoxolona   | Antisepticos | CIMA   |
| `cima_benzocaina___clorhexidina___tirotricina` | Benzocaína + Clorhexidina + Tirotricina | Antisepticos | CIMA   |
| `cima_clorhexidina___benzocaina`               | Clorhexidina + Benzocaína               | Antisepticos | CIMA   |

### Hemofiltrados — 3 entradas

| ID                                                                           | Nombre                                                                | Familia       | Origen |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------- | ------ |
| `cima_calcio_cloruro___magnesio_cloruro___sodio_cloruro___sodio_bicarbonato` | Calcio Cloruro + Magnesio Cloruro + Sodio Cloruro + Sodio Bicarbonato | Hemofiltrados | CIMA   |
| `cima_citrato_de_sodio`                                                      | Citrato De Sodio                                                      | Hemofiltrados | CIMA   |
| `cima_sodio_cloruro___sodio_citrato`                                         | Sodio Cloruro + Sodio Citrato                                         | Hemofiltrados | CIMA   |

### Laxantes de contacto — 3 entradas

| ID                                                                  | Nombre                                                       | Familia              | Origen |
| ------------------------------------------------------------------- | ------------------------------------------------------------ | -------------------- | ------ |
| `cima_cassia_angustifolia___fucus_vesiculosus`                      | Cassia Angustifolia + Fucus Vesiculosus                      | Laxantes de contacto | CIMA   |
| `cima_cassia_angustifolia___linum_usitatissimum___rhamnus_frangula` | Cassia Angustifolia + Linum Usitatissimum + Rhamnus Frangula | Laxantes de contacto | CIMA   |
| `cima_fucus_vesiculosus___rhamnus_frangula___rhamnus_purshiana`     | Fucus Vesiculosus + Rhamnus Frangula + Rhamnus Purshiana     | Laxantes de contacto | CIMA   |

### Derivados del opio y expectorantes — 3 entradas

| ID                                                   | Nombre                                        | Familia                            | Origen |
| ---------------------------------------------------- | --------------------------------------------- | ---------------------------------- | ------ |
| `cima_codeina___efedrina___sulfoguayacolato_potasio` | Codeína + Efedrina + Sulfoguayacolato Potasio | Derivados del opio y expectorantes | CIMA   |
| `cima_dextrometorfano___guaifenesina`                | Dextrometorfano + Guaifenesina                | Derivados del opio y expectorantes | CIMA   |
| `cima_dextrometorfano___sulfoguayacolato_potasio`    | Dextrometorfano + Sulfoguayacolato Potasio    | Derivados del opio y expectorantes | CIMA   |

### Otros hipnoticos y sedantes — 3 entradas

| ID                                             | Nombre                                  | Familia                     | Origen |
| ---------------------------------------------- | --------------------------------------- | --------------------------- | ------ |
| `cima_eschscholtzia_californica`               | Eschscholtzia Californica               | Otros hipnoticos y sedantes | CIMA   |
| `cima_humulus_lupulus___valeriana_officinalis` | Humulus Lupulus + Valeriana Officinalis | Otros hipnoticos y sedantes | CIMA   |
| `cima_passiflora_incarnata`                    | Passiflora Incarnata                    | Otros hipnoticos y sedantes | CIMA   |

### Electrolitos con carbohidratos — 3 entradas

| ID                                               | Nombre                                    | Familia                        | Origen |
| ------------------------------------------------ | ----------------------------------------- | ------------------------------ | ------ |
| `cima_glucosa___potasio_cloruro`                 | Glucosa + Potasio Cloruro                 | Electrolitos con carbohidratos | CIMA   |
| `cima_glucosa___sodio_cloruro`                   | Glucosa + Sodio Cloruro                   | Electrolitos con carbohidratos | CIMA   |
| `cima_glucosa___sodio_cloruro___potasio_cloruro` | Glucosa + Sodio Cloruro + Potasio Cloruro | Electrolitos con carbohidratos | CIMA   |

### Macrogol, combinaciones con — 3 entradas

| ID                                                              | Nombre                                                   | Familia                     | Origen |
| --------------------------------------------------------------- | -------------------------------------------------------- | --------------------------- | ------ |
| `cima_macrogol_3350___electrolitos`                             | Macrogol 3350 + Electrolitos                             | Macrogol, combinaciones con | CIMA   |
| `cima_macrogol_3350___acido_ascorbico_ascorbato___electrolitos` | Macrogol 3350 + Ácido Ascórbico/Ascorbato + Electrolitos | Macrogol, combinaciones con | CIMA   |
| `cima_macrogol_4000___electrolitos`                             | Macrogol 4000 + Electrolitos                             | Macrogol, combinaciones con | CIMA   |

### Codeina y paracetamol — 3 entradas

| ID                                        | Nombre                             | Familia               | Origen |
| ----------------------------------------- | ---------------------------------- | --------------------- | ------ |
| `cima_paracetamol___cafeina___codeina`    | Paracetamol + Cafeína + Codeína    | Codeina y paracetamol | CIMA   |
| `cima_paracetamol___codeina`              | Paracetamol + Codeína              | Codeina y paracetamol | CIMA   |
| `cima_paracetamol___vitamina_c___codeina` | Paracetamol + Vitamina C + Codeína | Codeina y paracetamol | CIMA   |

### Preparados anti-verrugas y callicidas — 3 entradas

| ID                                      | Nombre                           | Familia                               | Origen |
| --------------------------------------- | -------------------------------- | ------------------------------------- | ------ |
| `cima_acido_acetico___acido_salicilico` | Ácido Acético + Ácido Salicílico | Preparados anti-verrugas y callicidas | CIMA   |
| `cima_acido_lactico___acido_salicilico` | Ácido Láctico + Ácido Salicílico | Preparados anti-verrugas y callicidas | CIMA   |
| `cima_acido_salicilico___benzocaina`    | Ácido Salicílico + Benzocaína    | Preparados anti-verrugas y callicidas | CIMA   |

### Emulsiones grasas — 2 entradas

| ID                                                                                                      | Nombre                                                                                            | Familia           | Origen |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ----------------- | ------ |
| `cima_aceite_de_soja_purificado___trigliceridos_de_cadena_media`                                        | Aceite De Soja Purificado + Triglicéridos De Cadena Media                                         | Emulsiones grasas | CIMA   |
| `cima_aceite_de_soja_refinado___trigliceridos_de_cadena_media___trigliceridos_con_acidos_grasos_omega3` | Aceite De Soja Refinado + Triglicéridos De Cadena Media + Triglicéridos Con Ácidos Grasos Omega-3 | Emulsiones grasas | CIMA   |

### Otros agentes contra padecimientos funcionales del estomago — 2 entradas

| ID                                                                      | Nombre                                                           | Familia                                                     | Origen |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------- | ------ |
| `cima_aceite_esencial_de_menta_piperita___aceite_esencial_de_alcaravea` | Aceite Esencial De Menta Piperita + Aceite Esencial De Alcaravea | Otros agentes contra padecimientos funcionales del estomago | CIMA   |
| `cima_mentha_piperita___pimpinella_anisum___glycyrrhiza_glabra`         | Mentha Piperita + Pimpinella Anisum + Glycyrrhiza Glabra         | Otros agentes contra padecimientos funcionales del estomago | CIMA   |

### Clorhexidina, combinaciones con — 2 entradas

| ID                                         | Nombre                              | Familia                         | Origen |
| ------------------------------------------ | ----------------------------------- | ------------------------------- | ------ |
| `cima_alcohol_etilico___clorhexidina`      | Alcohol Etílico + Clorhexidina      | Clorhexidina, combinaciones con | CIMA   |
| `cima_clorhexidina___alcohol_isopropilico` | Clorhexidina + Alcohol Isopropílico | Clorhexidina, combinaciones con | CIMA   |

### Acido diatrizoico — 2 entradas

| ID                                              | Nombre                                   | Familia           | Origen |
| ----------------------------------------------- | ---------------------------------------- | ----------------- | ------ |
| `cima_amidotrizoato_sodio___meglumina`          | Amidotrizoato Sodio + Meglumina          | Acido diatrizoico | CIMA   |
| `cima_amidotrizoato_sodio___meglumina___calcio` | Amidotrizoato Sodio + Meglumina + Calcio | Acido diatrizoico | CIMA   |

### Nafazolina, combinaciones con — 2 entradas

| ID                                       | Nombre                            | Familia                       | Origen |
| ---------------------------------------- | --------------------------------- | ----------------------------- | ------ |
| `cima_antazolina___nafazolina`           | Antazolina + Nafazolina           | Nafazolina, combinaciones con | CIMA   |
| `cima_nafazolina___hamamelis_virginiana` | Nafazolina + Hamamelis Virginiana | Nafazolina, combinaciones con | CIMA   |

### Ciproheptadina, combinaciones con — 2 entradas

| ID                                           | Nombre                                | Familia                           | Origen |
| -------------------------------------------- | ------------------------------------- | --------------------------------- | ------ |
| `cima_arginina___ciproheptadina`             | Arginina + Ciproheptadina             | Ciproheptadina, combinaciones con | CIMA   |
| `cima_carnitina___arginina___ciproheptadina` | Carnitina + Arginina + Ciproheptadina | Ciproheptadina, combinaciones con | CIMA   |

### Otros productos topicos para el dolor articular y muscular — 2 entradas

| ID                            | Nombre                 | Familia                                                    | Origen |
| ----------------------------- | ---------------------- | ---------------------------------------------------------- | ------ |
| `cima_arnica_montana`         | Arnica Montana         | Otros productos topicos para el dolor articular y muscular | CIMA   |
| `cima_rosmarinus_officinalis` | Rosmarinus Officinalis | Otros productos topicos para el dolor articular y muscular | CIMA   |

### Bencidamina — 2 entradas

| ID                                  | Nombre                       | Familia     | Origen |
| ----------------------------------- | ---------------------------- | ----------- | ------ |
| `cima_bencidamina`                  | Bencidamina                  | Bencidamina | CIMA   |
| `cima_bencidamina___cetilpiridinio` | Bencidamina + Cetilpiridinio | Bencidamina | CIMA   |

### Tecnecio (99mTc) mertiatida — 2 entradas

| ID                | Nombre     | Familia                     | Origen |
| ----------------- | ---------- | --------------------------- | ------ |
| `cima_betiatida`  | Betiatida  | Tecnecio (99mTc) mertiatida | CIMA   |
| `cima_mertiatida` | Mertiatida | Tecnecio (99mTc) mertiatida | CIMA   |

### Xilometazolina — 2 entradas

| ID                                         | Nombre                              | Familia        | Origen |
| ------------------------------------------ | ----------------------------------- | -------------- | ------ |
| `cima_bromuro_ipratropio___xilometazolina` | Bromuro Ipratropio + Xilometazolina | Xilometazolina | CIMA   |
| `cima_xilometazolina___dexpantenol`        | Xilometazolina + Dexpantenol        | Xilometazolina | CIMA   |

### Pseudoefedrina, combinaciones con — 2 entradas

| ID                                 | Nombre                      | Familia                           | Origen |
| ---------------------------------- | --------------------------- | --------------------------------- | ------ |
| `cima_cetirizina___pseudoefedrina` | Cetirizina + Pseudoefedrina | Pseudoefedrina, combinaciones con | CIMA   |
| `cima_pseudoefedrina___ebastina`   | Pseudoefedrina + Ebastina   | Pseudoefedrina, combinaciones con | CIMA   |

### Ciproterona y estrogeno — 2 entradas

| ID                                   | Nombre                        | Familia                 | Origen |
| ------------------------------------ | ----------------------------- | ----------------------- | ------ |
| `cima_ciproterona___estradiol`       | Ciproterona + Estradiol       | Ciproterona y estrogeno | CIMA   |
| `cima_ciproterona___etinilestradiol` | Ciproterona + Etinilestradiol | Ciproterona y estrogeno | CIMA   |

### Clindamicina, combinaciones con — 2 entradas

| ID                                         | Nombre                              | Familia                         | Origen |
| ------------------------------------------ | ----------------------------------- | ------------------------------- | ------ |
| `cima_clindamicina___peroxido_de_benzoilo` | Clindamicina + Peróxido De Benzoilo | Clindamicina, combinaciones con | CIMA   |
| `cima_clindamicina___tretinoina`           | Clindamicina + Tretinoína           | Clindamicina, combinaciones con | CIMA   |

### Otros preparados para el corazon — 2 entradas

| ID                          | Nombre               | Familia                          | Origen |
| --------------------------- | -------------------- | -------------------------------- | ------ |
| `cima_crataegus_monogyna`   | Crataegus Monogyna   | Otros preparados para el corazon | CIMA   |
| `cima_crataegus_oxyacantha` | Crataegus Oxyacantha | Otros preparados para el corazon | CIMA   |

### Terapia hepatica — 2 entradas

| ID                                                                               | Nombre                                                                    | Familia          | Origen |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------- | ------ |
| `cima_cynara_scolymus__tarazacum_officinalis___peamus_boldus___sylibum_marianum` | Cynara Scolymus +Tarazacum Officinalis + Peamus Boldus + Sylibum Marianum | Terapia hepatica | CIMA   |
| `cima_silybum_marianum`                                                          | Silybum Marianum                                                          | Terapia hepatica | CIMA   |

### Diazepam, combinaciones con — 2 entradas

| ID                                       | Nombre                            | Familia                     | Origen |
| ---------------------------------------- | --------------------------------- | --------------------------- | ------ |
| `cima_diazepam___piridoxina___sulpirida` | Diazepam + Piridoxina + Sulpirida | Diazepam, combinaciones con | CIMA   |
| `cima_diazepam___sulpirida`              | Diazepam + Sulpirida              | Diazepam, combinaciones con | CIMA   |

### Fosfato de sodio — 2 entradas

| ID                                                         | Nombre                                              | Familia          | Origen |
| ---------------------------------------------------------- | --------------------------------------------------- | ---------------- | ------ |
| `cima_dihidrogenofosfato_sodio`                            | Dihidrógenofosfato Sodio                            | Fosfato de sodio | CIMA   |
| `cima_dihidrogenofosfato_sodio___hidrogenofosfato_disodio` | Dihidrógenofosfato Sodio + Hidrógenofosfato Disodio | Fosfato de sodio | CIMA   |

### Otros inmunoestimulantes — 2 entradas

| ID                            | Nombre                 | Familia                  | Origen |
| ----------------------------- | ---------------------- | ------------------------ | ------ |
| `cima_echinacea_angustifolia` | Echinacea Angustifolia | Otros inmunoestimulantes | CIMA   |
| `cima_metoxaleno`             | Metoxaleno             | Otros inmunoestimulantes | CIMA   |

### Ergotamina, combinaciones excluyendo psicolepticos — 2 entradas

| ID                                        | Nombre                             | Familia                                            | Origen |
| ----------------------------------------- | ---------------------------------- | -------------------------------------------------- | ------ |
| `cima_ergotamina___cafeina`               | Ergotamina + Cafeína               | Ergotamina, combinaciones excluyendo psicolepticos | CIMA   |
| `cima_ergotamina___cafeina___paracetamol` | Ergotamina + Cafeína + Paracetamol | Ergotamina, combinaciones excluyendo psicolepticos | CIMA   |

### Fluocinolona con antibioticos — 2 entradas

| ID                                            | Nombre                                 | Familia                       | Origen |
| --------------------------------------------- | -------------------------------------- | ----------------------------- | ------ |
| `cima_fluocinolona___framicetina`             | Fluocinolona + Framicetina             | Fluocinolona con antibioticos | CIMA   |
| `cima_fluocinolona___gramicidina___neomicina` | Fluocinolona + Gramicidina + Neomicina | Fluocinolona con antibioticos | CIMA   |

### Otros agentes diagnosticos — 2 entradas

| ID              | Nombre   | Familia                    | Origen |
| --------------- | -------- | -------------------------- | ------ |
| `cima_gaxilosa` | Gaxilosa | Otros agentes diagnosticos | CIMA   |
| `cima_helio`    | Helio    | Otros agentes diagnosticos | CIMA   |

### Hidrocortisona con antibioticos — 2 entradas

| ID                                              | Nombre                                   | Familia                         | Origen |
| ----------------------------------------------- | ---------------------------------------- | ------------------------------- | ------ |
| `cima_hidrocortisona___bacitracina___neomicina` | Hidrocortisona + Bacitracina + Neomicina | Hidrocortisona con antibioticos | CIMA   |
| `cima_hidrocortisona___cloranfenicol`           | Hidrocortisona + Cloranfenicol           | Hidrocortisona con antibioticos | CIMA   |

### Vitaminas del complejo B, otras combinaciones — 2 entradas

| ID                                                     | Nombre                                          | Familia                                       | Origen |
| ------------------------------------------------------ | ----------------------------------------------- | --------------------------------------------- | ------ |
| `cima_iodo___acido_folico___cianocobalamina`           | Iodo + Ácido Fólico + Cianocobalamina           | Vitaminas del complejo B, otras combinaciones | CIMA   |
| `cima_potasio_ioduro___acido_folico___cianocobalamina` | Potasio Ioduro + Ácido Fólico + Cianocobalamina | Vitaminas del complejo B, otras combinaciones | CIMA   |

### Lactobacilo, fermento — 2 entradas

| ID                                                     | Nombre                                          | Familia               | Origen |
| ------------------------------------------------------ | ----------------------------------------------- | --------------------- | ------ |
| `cima_lactobacillus_gasseri___lactobacillus_rhamnosus` | Lactobacillus Gasseri + Lactobacillus Rhamnosus | Lactobacilo, fermento | CIMA   |
| `cima_lactobacillus_plantarum`                         | Lactobacillus Plantarum                         | Lactobacilo, fermento | CIMA   |

### Lidocaina, combinaciones con — 2 entradas

| ID                            | Nombre                 | Familia                      | Origen |
| ----------------------------- | ---------------------- | ---------------------------- | ------ |
| `cima_lidocaina___cetrimida`  | Lidocaína + Cetrimida  | Lidocaina, combinaciones con | CIMA   |
| `cima_lidocaina___epinefrina` | Lidocaína + Epinefrina | Lidocaina, combinaciones con | CIMA   |

### Macrogol — 2 entradas

| ID                   | Nombre        | Familia  | Origen |
| -------------------- | ------------- | -------- | ------ |
| `cima_macrogol`      | Macrogol      | Macrogol | CIMA   |
| `cima_macrogol_4000` | Macrogol 4000 | Macrogol | CIMA   |

### Manitol — 2 entradas

| ID                                               | Nombre                                    | Familia | Origen |
| ------------------------------------------------ | ----------------------------------------- | ------- | ------ |
| `cima_manitol___glucosa___potasio_cloruro`       | Manitol + Glucosa + Potasio Cloruro       | Manitol | CIMA   |
| `cima_manitol___sodio_cloruro___potasio_cloruro` | Manitol + Sodio Cloruro + Potasio Cloruro | Manitol | CIMA   |

### Monoxido de carbono, combinaciones con — 2 entradas

| ID                                              | Nombre                                   | Familia                                | Origen |
| ----------------------------------------------- | ---------------------------------------- | -------------------------------------- | ------ |
| `cima_monoxido_de_carbono___helio`              | Monóxido De Carbono + Helio              | Monoxido de carbono, combinaciones con | CIMA   |
| `cima_monoxido_de_carbono___metano___acetileno` | Monóxido De Carbono + Metano + Acetileno | Monoxido de carbono, combinaciones con | CIMA   |

### Oxido nitroso — 2 entradas

| ID                       | Nombre            | Familia       | Origen |
| ------------------------ | ----------------- | ------------- | ------ |
| `cima_oxido_nitroso`     | Oxido Nitroso     | Oxido nitroso | CIMA   |
| `cima_protoxido_nitroso` | Protóxido Nitroso | Oxido nitroso | CIMA   |

### Polen de plantas — 2 entradas

| ID                        | Nombre             | Familia          | Origen |
| ------------------------- | ------------------ | ---------------- | ------ |
| `cima_phleum_pratense`    | Phleum Pratense    | Polen de plantas | CIMA   |
| `cima_polen_de_gramineas` | Polen De Gramíneas | Polen de plantas | CIMA   |

### Poliestireno, sulfonato de — 2 entradas

| ID                                   | Nombre                        | Familia                    | Origen |
| ------------------------------------ | ----------------------------- | -------------------------- | ------ |
| `cima_poliestireno_sulfonato_calcio` | Poliestireno Sulfonato Calcio | Poliestireno, sulfonato de | CIMA   |
| `cima_poliestireno_sulfonato_sodio`  | Poliestireno Sulfonato Sodio  | Poliestireno, sulfonato de | CIMA   |

### Ramipril y diureticos — 2 entradas

| ID                                  | Nombre                       | Familia               | Origen |
| ----------------------------------- | ---------------------------- | --------------------- | ------ |
| `cima_ramipril___hidroclorotiazida` | Ramipril + Hidroclorotiazida | Ramipril y diureticos | CIMA   |
| `cima_ramipril___indapamida`        | Ramipril + Indapamida        | Ramipril y diureticos | CIMA   |

### Sulfonamidas asociadas a mucolitico y/o expectorante — 2 entradas

| ID                                                      | Nombre                                           | Familia                                              | Origen |
| ------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------- | ------ |
| `cima_sulfametoxazol___trimetoprima___bromhexina`       | Sulfametoxazol + Trimetoprima + Bromhexina       | Sulfonamidas asociadas a mucolitico y/o expectorante | CIMA   |
| `cima_sulfametoxazol___trimetoprima___sulfoguayacolato` | Sulfametoxazol + Trimetoprima + Sulfoguayacolato | Sulfonamidas asociadas a mucolitico y/o expectorante | CIMA   |

### Expectorantes — 2 entradas

| ID                                           | Nombre                                | Familia       | Origen |
| -------------------------------------------- | ------------------------------------- | ------------- | ------ |
| `cima_thymus_vulgaris`                       | Thymus Vulgaris                       | Expectorantes | CIMA   |
| `cima_thymus_vulgaris___althaea_officinalis` | Thymus Vulgaris + Althaea Officinalis | Expectorantes | CIMA   |

### Vitamina B1 en combinacion con vitamina B6 y/o vitamina B12 — 2 entradas

| ID                                              | Nombre                                   | Familia                                                     | Origen |
| ----------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------- | ------ |
| `cima_tiamina___piridoxina___cianocobalamina`   | Tiamina + Piridoxina + Cianocobalamina   | Vitamina B1 en combinacion con vitamina B6 y/o vitamina B12 | CIMA   |
| `cima_tiamina___piridoxina___hidroxocobalamina` | Tiamina + Piridoxina + Hidroxocobalamina | Vitamina B1 en combinacion con vitamina B6 y/o vitamina B12 | CIMA   |

### Triamcinolona con antibioticos — 2 entradas

| ID                                             | Nombre                                  | Familia                        | Origen |
| ---------------------------------------------- | --------------------------------------- | ------------------------------ | ------ |
| `cima_triamcinolona___framicetina`             | Triamcinolona + Framicetina             | Triamcinolona con antibioticos | CIMA   |
| `cima_triamcinolona___gentamicina___nistatina` | Triamcinolona + Gentamicina + Nistatina | Triamcinolona con antibioticos | CIMA   |

### Tropicamida, combinaciones con — 2 entradas

| ID                                           | Nombre                                | Familia                        | Origen |
| -------------------------------------------- | ------------------------------------- | ------------------------------ | ------ |
| `cima_tropicamida___fenilefrina`             | Tropicamida + Fenilefrina             | Tropicamida, combinaciones con | CIMA   |
| `cima_tropicamida___fenilefrina___lidocaina` | Tropicamida + Fenilefrina + Lidocaína | Tropicamida, combinaciones con | CIMA   |

### Insectos — 2 entradas

| ID                      | Nombre           | Familia  | Origen |
| ----------------------- | ---------------- | -------- | ------ |
| `cima_veneno_de_abeja`  | Veneno De Abeja  | Insectos | CIMA   |
| `cima_veneno_de_avispa` | Veneno De Avispa | Insectos | CIMA   |

### Productos con zinc — 2 entradas

| ID                               | Nombre                    | Familia            | Origen |
| -------------------------------- | ------------------------- | ------------------ | ------ |
| `cima_zinc_oxido`                | Zinc Óxido                | Productos con zinc | CIMA   |
| `cima_zinc_oxido___almidon_maiz` | Zinc Óxido + Almidón Maíz | Productos con zinc | CIMA   |

### Codeina y acido acetilsalicilico — 2 entradas

| ID                                                        | Nombre                                             | Familia                          | Origen |
| --------------------------------------------------------- | -------------------------------------------------- | -------------------------------- | ------ |
| `cima_acido_acetilsalicilico___cafeina___codeina`         | Ácido Acetilsalicílico + Cafeína + Codeína         | Codeina y acido acetilsalicilico | CIMA   |
| `cima_acido_acetilsalicilico___acido_ascorbico___codeina` | Ácido Acetilsalicílico + Ácido Ascórbico + Codeína | Codeina y acido acetilsalicilico | CIMA   |

### Sales minerales en combinacion — 2 entradas

| ID                                                                           | Nombre                                                                | Familia                        | Origen |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------ | ------ |
| `cima_acido_tartarico___electrolitos_laxante_osmotico`                       | Ácido Tartárico + Electrolitos (Laxante Osmótico)                     | Sales minerales en combinacion | CIMA   |
| `cima_acido_tartarico___potasio_sulfato___sodio_bicarbonato___sodio_sulfato` | Ácido Tartárico + Potasio Sulfato + Sodio Bicarbonato + Sodio Sulfato | Sales minerales en combinacion | CIMA   |

### Lamivudina y abacavir — 1 entradas

| ID                           | Nombre                | Familia               | Origen |
| ---------------------------- | --------------------- | --------------------- | ------ |
| `cima_abacavir___lamivudina` | Abacavir + Lamivudina | Lamivudina y abacavir | CIMA   |

### Abemaciclib — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_abemaciclib` | Abemaciclib | Abemaciclib | CIMA   |

### Aceite de ricino — 1 entradas

| ID                      | Nombre           | Familia          | Origen |
| ----------------------- | ---------------- | ---------------- | ------ |
| `cima_aceite_de_ricino` | Aceite De Ricino | Aceite de ricino | CIMA   |

### Acetilcisteina — 1 entradas

| ID                    | Nombre         | Familia        | Origen |
| --------------------- | -------------- | -------------- | ------ |
| `cima_acetilcisteina` | Acetilcisteína | Acetilcisteina | CIMA   |

### Acetilcolina — 1 entradas

| ID                          | Nombre               | Familia      | Origen |
| --------------------------- | -------------------- | ------------ | ------ |
| `cima_acetilcolina_cloruro` | Acetilcolina Cloruro | Acetilcolina | CIMA   |

### Acido acetilsalicilico — 1 entradas

| ID                                | Nombre                     | Familia                | Origen |
| --------------------------------- | -------------------------- | ---------------------- | ------ |
| `cima_acetilsalicilato_de_lisina` | Acetilsalicilato De Lisina | Acido acetilsalicilico | CIMA   |

### Aciclovir, combinaciones con — 1 entradas

| ID                                | Nombre                     | Familia                      | Origen |
| --------------------------------- | -------------------------- | ---------------------------- | ------ |
| `cima_aciclovir___hidrocortisona` | Aciclovir + Hidrocortisona | Aciclovir, combinaciones con | CIMA   |

### Acoramidis — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_acoramidis` | Acoramidis | Acoramidis | CIMA   |

### Adapaleno, combinaciones con — 1 entradas

| ID                                      | Nombre                           | Familia                      | Origen |
| --------------------------------------- | -------------------------------- | ---------------------------- | ------ |
| `cima_adapaleno___peroxido_de_benzoilo` | Adapaleno + Peróxido De Benzoilo | Adapaleno, combinaciones con | CIMA   |

### Afatinib — 1 entradas

| ID              | Nombre   | Familia  | Origen |
| --------------- | -------- | -------- | ------ |
| `cima_afatinib` | Afatinib | Afatinib | CIMA   |

### Agalsidasa alfa — 1 entradas

| ID                     | Nombre          | Familia         | Origen |
| ---------------------- | --------------- | --------------- | ------ |
| `cima_agalsidasa_alfa` | Agalsidasa Alfa | Agalsidasa alfa | CIMA   |

### Agalsidasa beta — 1 entradas

| ID                     | Nombre          | Familia         | Origen |
| ---------------------- | --------------- | --------------- | ------ |
| `cima_agalsidasa_beta` | Agalsidasa Beta | Agalsidasa beta | CIMA   |

### Agua para preparaciones inyectables — 1 entradas

| ID                                                 | Nombre                                      | Familia                             | Origen |
| -------------------------------------------------- | ------------------------------------------- | ----------------------------------- | ------ |
| `cima_agua_esteril_para_preparaciones_inyectables` | Agua Estéril Para Preparaciones Inyectables | Agua para preparaciones inyectables | CIMA   |

### Tecnecio (99mTc) macrosalb — 1 entradas

| ID                                                 | Nombre                                        | Familia                    | Origen |
| -------------------------------------------------- | --------------------------------------------- | -------------------------- | ------ |
| `cima_albumina_macroagregados_para_tecnecio_99mtc` | Albúmina Macroagregados Para Tecnecio (99Mtc) | Tecnecio (99mTc) macrosalb | CIMA   |

### Tecnecio (99mTc) nanocoloidal — 1 entradas

| ID                                               | Nombre                                      | Familia                       | Origen |
| ------------------------------------------------ | ------------------------------------------- | ----------------------------- | ------ |
| `cima_albumina_nanocoloides_para_tecnecio_99mtc` | Albúmina Nanocoloides Para Tecnecio (99Mtc) | Tecnecio (99mTc) nanocoloidal | CIMA   |

### Alcohol diclorobencilico — 1 entradas

| ID                                                                                   | Nombre                                                                        | Familia                  | Origen |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- | ------------------------ | ------ |
| `cima_alcohol_diclorobencilico___amilmetacresol___acido_ascorbico___ascorbato_sodio` | Alcohol Diclorobencílico + Amilmetacresol + Ácido Ascórbico + Ascorbato Sodio | Alcohol diclorobencilico | CIMA   |

### Otros antisepticos y desinfectantes — 1 entradas

| ID                     | Nombre          | Familia                             | Origen |
| ---------------------- | --------------- | ----------------------------------- | ------ |
| `cima_alcohol_etilico` | Alcohol Etílico | Otros antisepticos y desinfectantes | CIMA   |

### Cetilpiridinio, cloruro de — 1 entradas

| ID                                              | Nombre                                   | Familia                    | Origen |
| ----------------------------------------------- | ---------------------------------------- | -------------------------- | ------ |
| `cima_alcohol_etilico___cetilpiridinio_cloruro` | Alcohol Etílico + Cetilpiridinio Cloruro | Cetilpiridinio, cloruro de | CIMA   |

### ANTISEPTICOS Y DESINFECTANTES — 1 entradas

| ID                                 | Nombre                      | Familia                       | Origen |
| ---------------------------------- | --------------------------- | ----------------------------- | ------ |
| `cima_alcohol_isopropilico___iodo` | Alcohol Isopropílico + Iodo | ANTISEPTICOS Y DESINFECTANTES | CIMA   |

### Aldesleukina — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_aldesleukina` | Aldesleukina | Aldesleukina | CIMA   |

### Alemtuzumab — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_alemtuzumab` | Alemtuzumab | Alemtuzumab | CIMA   |

### Alfa1 antitripsina — 1 entradas

| ID                       | Nombre              | Familia            | Origen |
| ------------------------ | ------------------- | ------------------ | ------ |
| `cima_alfa1antitripsina` | Alfa-1-Antitripsina | Alfa1 antitripsina | CIMA   |

### Alglucosidasa alfa — 1 entradas

| ID                        | Nombre             | Familia            | Origen |
| ------------------------- | ------------------ | ------------------ | ------ |
| `cima_alglucosidasa_alfa` | Alglucosidasa Alfa | Alglucosidasa alfa | CIMA   |

### Alimemazina — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_alimemazina` | Alimemazina | Alimemazina | CIMA   |

### Alitretinoina — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_alitretinoina` | Alitretinoína | Alitretinoina | CIMA   |

### Cascara, combinaciones con — 1 entradas

| ID                                     | Nombre                          | Familia                    | Origen |
| -------------------------------------- | ------------------------------- | -------------------------- | ------ |
| `cima_aloe_ferox___rhamnus_purshianus` | Aloe Ferox + Rhamnus Purshianus | Cascara, combinaciones con | CIMA   |

### Alpelisib — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_alpelisib` | Alpelisib | Alpelisib | CIMA   |

### Hidroclorotiazida y agentes ahorradores de potasio — 1 entradas

| ID                                   | Nombre                        | Familia                                            | Origen |
| ------------------------------------ | ----------------------------- | -------------------------------------------------- | ------ |
| `cima_amilorida___hidroclorotiazida` | Amilorida + Hidroclorotiazida | Hidroclorotiazida y agentes ahorradores de potasio | CIMA   |

### Aminolevulinato de metilo — 1 entradas

| ID                               | Nombre                    | Familia                   | Origen |
| -------------------------------- | ------------------------- | ------------------------- | ------ |
| `cima_aminolevulinato_de_metilo` | Aminolevulinato De Metilo | Aminolevulinato de metilo | CIMA   |

### Amisulprida — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_amisulprida` | Amisulprida | Amisulprida | CIMA   |

### Amitriptilina y psicolepticos — 1 entradas

| ID                               | Nombre                    | Familia                       | Origen |
| -------------------------------- | ------------------------- | ----------------------------- | ------ |
| `cima_amitriptilina___medazepam` | Amitriptilina + Medazepam | Amitriptilina y psicolepticos | CIMA   |

### Amivantamab — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_amivantamab` | Amivantamab | Amivantamab | CIMA   |

### Amorolfina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_amorolfina` | Amorolfina | Amorolfina | CIMA   |

### Anakinra — 1 entradas

| ID              | Nombre   | Familia  | Origen |
| --------------- | -------- | -------- | ------ |
| `cima_anakinra` | Anakinra | Anakinra | CIMA   |

### Meglumina, antimoniato de — 1 entradas

| ID                              | Nombre                   | Familia                   | Origen |
| ------------------------------- | ------------------------ | ------------------------- | ------ |
| `cima_antimoniato_de_meglumina` | Antimoniato De Meglumina | Meglumina, antimoniato de | CIMA   |

### Antitrombina III — 1 entradas

| ID                      | Nombre           | Familia          | Origen |
| ----------------------- | ---------------- | ---------------- | ------ |
| `cima_antitrombina_iii` | Antitrombina Iii | Antitrombina III | CIMA   |

### Apraclonidina — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_apraclonidina` | Apraclonidina | Apraclonidina | CIMA   |

### Vasopresina (argipresina) — 1 entradas

| ID                 | Nombre      | Familia                   | Origen |
| ------------------ | ----------- | ------------------------- | ------ |
| `cima_argipresina` | Argipresina | Vasopresina (argipresina) | CIMA   |

### Arsenico, trioxido de — 1 entradas

| ID                       | Nombre            | Familia               | Origen |
| ------------------------ | ----------------- | --------------------- | ------ |
| `cima_arsenico_trioxido` | Arsénico Trióxido | Arsenico, trioxido de | CIMA   |

### Articaina, combinaciones con — 1 entradas

| ID                            | Nombre                 | Familia                      | Origen |
| ----------------------------- | ---------------------- | ---------------------------- | ------ |
| `cima_articaina___epinefrina` | Articaína + Epinefrina | Articaina, combinaciones con | CIMA   |

### Asciminib — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_asciminib` | Asciminib | Asciminib | CIMA   |

### Atazanavir y cobicistat — 1 entradas

| ID                             | Nombre                  | Familia                 | Origen |
| ------------------------------ | ----------------------- | ----------------------- | ------ |
| `cima_atazanavir___cobicistat` | Atazanavir + Cobicistat | Atazanavir y cobicistat | CIMA   |

### Atenolol y otros diureticos — 1 entradas

| ID                             | Nombre                  | Familia                     | Origen |
| ------------------------------ | ----------------------- | --------------------------- | ------ |
| `cima_atenolol___clortalidona` | Atenolol + Clortalidona | Atenolol y otros diureticos | CIMA   |

### Atidarsagen autotemcel — 1 entradas

| ID                            | Nombre                 | Familia                | Origen |
| ----------------------------- | ---------------------- | ---------------------- | ------ |
| `cima_atidarsagen_autotemcel` | Atidarsagén Autotemcel | Atidarsagen autotemcel | CIMA   |

### Atogepant — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_atogepant` | Atogepant | Atogepant | CIMA   |

### Atorvastatina y amlodipino — 1 entradas

| ID                                | Nombre                     | Familia                    | Origen |
| --------------------------------- | -------------------------- | -------------------------- | ------ |
| `cima_atorvastatina___amlodipino` | Atorvastatina + Amlodipino | Atorvastatina y amlodipino | CIMA   |

### Atorvastatina y ezetimiba — 1 entradas

| ID                               | Nombre                    | Familia                   | Origen |
| -------------------------------- | ------------------------- | ------------------------- | ------ |
| `cima_atorvastatina___ezetimiba` | Atorvastatina + Ezetimiba | Atorvastatina y ezetimiba | CIMA   |

### Atorvastatina, acido acetilsalicilico y ramipril — 1 entradas

| ID                                                       | Nombre                                            | Familia                                          | Origen |
| -------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------ | ------ |
| `cima_atorvastatina___acido_acetilsalicilico___ramipril` | Atorvastatina + Ácido Acetilsalicílico + Ramipril | Atorvastatina, acido acetilsalicilico y ramipril | CIMA   |

### Atropina — 1 entradas

| ID                      | Nombre           | Familia  | Origen |
| ----------------------- | ---------------- | -------- | ------ |
| `cima_atropina_sulfato` | Atropina Sulfato | Atropina | CIMA   |

### Avacopan — 1 entradas

| ID              | Nombre   | Familia  | Origen |
| --------------- | -------- | -------- | ------ |
| `cima_avacopan` | Avacopán | Avacopan | CIMA   |

### Avalglucosidasa alfa — 1 entradas

| ID                          | Nombre               | Familia              | Origen |
| --------------------------- | -------------------- | -------------------- | ------ |
| `cima_avalglucosidasa_alfa` | Avalglucosidasa Alfa | Avalglucosidasa alfa | CIMA   |

### Avapritinib — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_avapritinib` | Avapritinib | Avapritinib | CIMA   |

### Avelumab — 1 entradas

| ID              | Nombre   | Familia  | Origen |
| --------------- | -------- | -------- | ------ |
| `cima_avelumab` | Avelumab | Avelumab | CIMA   |

### Axitinib — 1 entradas

| ID              | Nombre   | Familia  | Origen |
| --------------- | -------- | -------- | ------ |
| `cima_axitinib` | Axitinib | Axitinib | CIMA   |

### Sulfato de bario con agentes en suspension — 1 entradas

| ID                   | Nombre        | Familia                                    | Origen |
| -------------------- | ------------- | ------------------------------------------ | ------ |
| `cima_bario_sulfato` | Bario Sulfato | Sulfato de bario con agentes en suspension | CIMA   |

### Basiliximab — 1 entradas

| ID                | Nombre     | Familia     | Origen |
| ----------------- | ---------- | ----------- | ------ |
| `cima_basilixmab` | Basilixmab | Basiliximab | CIMA   |

### Beclometasona — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_beclometasona` | Beclometasona | Beclometasona | CIMA   |

### Corticosteroides potentes, otras combinaciones — 1 entradas

| ID                                | Nombre                     | Familia                                        | Origen |
| --------------------------------- | -------------------------- | ---------------------------------------------- | ------ |
| `cima_beclometasona___clioquinol` | Beclometasona + Clioquinol | Corticosteroides potentes, otras combinaciones | CIMA   |

### Formoterol, glicopirronio, bromuro de y beclometasona — 1 entradas

| ID                                                | Nombre                                     | Familia                                               | Origen |
| ------------------------------------------------- | ------------------------------------------ | ----------------------------------------------------- | ------ |
| `cima_beclometasona___formoterol___glicopirronio` | Beclometasona + Formoterol + Glicopirronio | Formoterol, glicopirronio, bromuro de y beclometasona | CIMA   |

### Beclometasona con antibioticos — 1 entradas

| ID                               | Nombre                    | Familia                        | Origen |
| -------------------------------- | ------------------------- | ------------------------------ | ------ |
| `cima_beclometasona___neomicina` | Beclometasona + Neomicina | Beclometasona con antibioticos | CIMA   |

### Belatacept — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_belatacept` | Belatacept | Belatacept | CIMA   |

### Bendamustina — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_bendamustina` | Bendamustina | Bendamustina | CIMA   |

### Benzocaina — 1 entradas

| ID                           | Nombre                | Familia    | Origen |
| ---------------------------- | --------------------- | ---------- | ------ |
| `cima_benzocaina___efedrina` | Benzocaína + Efedrina | Benzocaina | CIMA   |

### Berotralstat — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_berotralstat` | Berotralstat | Berotralstat | CIMA   |

### Betametasona con antibioticos — 1 entradas

| ID                                   | Nombre                        | Familia                       | Origen |
| ------------------------------------ | ----------------------------- | ----------------------------- | ------ |
| `cima_betametasona___acido_fusidico` | Betametasona + Ácido Fusídico | Betametasona con antibioticos | CIMA   |

### Betaxolol — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_betaxolol` | Betaxolol | Betaxolol | CIMA   |

### Betaina — 1 entradas

| ID                     | Nombre          | Familia | Origen |
| ---------------------- | --------------- | ------- | ------ |
| `cima_betaina_anhidra` | Betaína Anhidra | Betaina | CIMA   |

### Abedul, corteza — 1 entradas

| ID                                       | Nombre                            | Familia         | Origen |
| ---------------------------------------- | --------------------------------- | --------------- | ------ |
| `cima_betula_pendula___betula_pubescens` | Betula Pendula + Betula Pubescens | Abedul, corteza | CIMA   |

### Bexaroteno — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_bexaroteno` | Bexaroteno | Bexaroteno | CIMA   |

### Bibrocatol — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_bibrocatol` | Bibrocatol | Bibrocatol | CIMA   |

### Bicalutamida — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_bicalutamida` | Bicalutamida | Bicalutamida | CIMA   |

### Tecnecio (99mTc), bicisato de — 1 entradas

| ID                                                       | Nombre                                            | Familia                       | Origen |
| -------------------------------------------------------- | ------------------------------------------------- | ----------------------------- | ------ |
| `cima_bicisato_diclorhidrato___estano_cloruro_dihidrato` | Bicisato Diclorhidrato + Estaño Cloruro Dihidrato | Tecnecio (99mTc), bicisato de | CIMA   |

### Bifonazol — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_bifonazol` | Bifonazol | Bifonazol | CIMA   |

### Binimetinib — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_binimetinib` | Binimetinib | Binimetinib | CIMA   |

### Biotina — 1 entradas

| ID             | Nombre  | Familia | Origen |
| -------------- | ------- | ------- | ------ |
| `cima_biotina` | Biotina | Biotina | CIMA   |

### Bisoprolol y tiazidas — 1 entradas

| ID                                    | Nombre                         | Familia               | Origen |
| ------------------------------------- | ------------------------------ | --------------------- | ------ |
| `cima_bisoprolol___hidroclorotiazida` | Bisoprolol + Hidroclorotiazida | Bisoprolol y tiazidas | CIMA   |

### Bleomicina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_bleomicina` | Bleomicina | Bleomicina | CIMA   |

### Blinatumomab — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_blinatumomab` | Blinatumomab | Blinatumomab | CIMA   |

### Bosutinib — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_bosutinib` | Bosutinib | Bosutinib | CIMA   |

### Brexucabtagen autoleucel — 1 entradas

| ID                              | Nombre                   | Familia                  | Origen |
| ------------------------------- | ------------------------ | ------------------------ | ------ |
| `cima_brexucabtagen_autoleucel` | Brexucabtagén Autoleucel | Brexucabtagen autoleucel | CIMA   |

### Brigatinib — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_brigatinib` | Brigatinib | Brigatinib | CIMA   |

### Brinzolamida — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_brinzolamida` | Brinzolamida | Brinzolamida | CIMA   |

### Brinzolamida, combinaciones — 1 entradas

| ID                                | Nombre                     | Familia                     | Origen |
| --------------------------------- | -------------------------- | --------------------------- | ------ |
| `cima_brinzolamida___brimonidina` | Brinzolamida + Brimonidina | Brinzolamida, combinaciones | CIMA   |

### Brivudina — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_brivudina` | Brivudina | Brivudina | CIMA   |

### Brolucizumab — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_brolucizumab` | Brolucizumab | Brolucizumab | CIMA   |

### Bromelaina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_bromelaina` | Bromelaína | Bromelaina | CIMA   |

### Bromfenaco — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_bromfenaco` | Bromfenaco | Bromfenaco | CIMA   |

### Ipratropio, bromuro de — 1 entradas

| ID                        | Nombre             | Familia                | Origen |
| ------------------------- | ------------------ | ---------------------- | ------ |
| `cima_bromuro_ipratropio` | Bromuro Ipratropio | Ipratropio, bromuro de | CIMA   |

### Umeclidinio bromuro — 1 entradas

| ID                         | Nombre              | Familia             | Origen |
| -------------------------- | ------------------- | ------------------- | ------ |
| `cima_bromuro_umeclidinio` | Bromuro Umeclidinio | Umeclidinio bromuro | CIMA   |

### Brotizolam — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_brotizolam` | Brotizolam | Brotizolam | CIMA   |

### Formoterol y budesonida — 1 entradas

| ID                             | Nombre                  | Familia                 | Origen |
| ------------------------------ | ----------------------- | ----------------------- | ------ |
| `cima_budesonida___formoterol` | Budesonida + Formoterol | Formoterol y budesonida | CIMA   |

### Bulevirtida — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_bulevirtida` | Bulevirtida | Bulevirtida | CIMA   |

### Bupivacaina, combinaciones con — 1 entradas

| ID                              | Nombre                   | Familia                        | Origen |
| ------------------------------- | ------------------------ | ------------------------------ | ------ |
| `cima_bupivacaina___epinefrina` | Bupivacaína + Epinefrina | Bupivacaina, combinaciones con | CIMA   |

### Bupivacaina — 1 entradas

| ID                           | Nombre                | Familia     | Origen |
| ---------------------------- | --------------------- | ----------- | ------ |
| `cima_bupivacaina___glucosa` | Bupivacaína + Glucosa | Bupivacaina | CIMA   |

### Buserelina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_buserelina` | Buserelina | Buserelina | CIMA   |

### Busulfano — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_busulfano` | Busulfano | Busulfano | CIMA   |

### Butilescopolamina y analgesicos — 1 entradas

| ID                                           | Nombre                                | Familia                         | Origen |
| -------------------------------------------- | ------------------------------------- | ------------------------------- | ------ |
| `cima_butilescopolamina_bromuro___metamizol` | Butilescopolamina Bromuro + Metamizol | Butilescopolamina y analgesicos | CIMA   |

### Tul con balsamo de Peru, combinaciones con — 1 entradas

| ID                                        | Nombre                             | Familia                                    | Origen |
| ----------------------------------------- | ---------------------------------- | ------------------------------------------ | ------ |
| `cima_balsamo_de_peru___aceite_de_ricino` | Bálsamo De Perú + Aceite De Ricino | Tul con balsamo de Peru, combinaciones con | CIMA   |

### Cabazitaxel — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_cabazitaxel` | Cabazitaxel | Cabazitaxel | CIMA   |

### Cabozantinib — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_cabozantinib` | Cabozantinib | Cabozantinib | CIMA   |

### Cafeina — 1 entradas

| ID             | Nombre  | Familia | Origen |
| -------------- | ------- | ------- | ------ |
| `cima_cafeina` | Cafeína | Cafeina | CIMA   |

### Calcio acetato — 1 entradas

| ID                    | Nombre         | Familia        | Origen |
| --------------------- | -------------- | -------------- | ------ |
| `cima_calcio_acetato` | Calcio Acetato | Calcio acetato | CIMA   |

### Acetato anhidro de calcio y carbonato de magnesio — 1 entradas

| ID                                         | Nombre                              | Familia                                           | Origen |
| ------------------------------------------ | ----------------------------------- | ------------------------------------------------- | ------ |
| `cima_calcio_acetato___magnesio_carbonato` | Calcio Acetato + Magnesio Carbonato | Acetato anhidro de calcio y carbonato de magnesio | CIMA   |

### Carbonato de calcio — 1 entradas

| ID                      | Nombre           | Familia             | Origen |
| ----------------------- | ---------------- | ------------------- | ------ |
| `cima_calcio_carbonato` | Calcio Carbonato | Carbonato de calcio | CIMA   |

### Calcio, combinaciones con, vitamina D y/o otros farmacos — 1 entradas

| ID                                       | Nombre                            | Familia                                                  | Origen |
| ---------------------------------------- | --------------------------------- | -------------------------------------------------------- | ------ |
| `cima_calcio_carbonato___colecalciferol` | Calcio Carbonato + Colecalciferol | Calcio, combinaciones con, vitamina D y/o otros farmacos | CIMA   |

### Combinaciones de sales simples — 1 entradas

| ID                                           | Nombre                                | Familia                        | Origen |
| -------------------------------------------- | ------------------------------------- | ------------------------------ | ------ |
| `cima_calcio_carbonato___magnesio_carbonato` | Calcio Carbonato + Magnesio Carbonato | Combinaciones de sales simples | CIMA   |

### Otros agentes contra la ulcera peptica y el reflujo gastroesofagico (RGE/GORD) — 1 entradas

| ID                                                           | Nombre                                                | Familia                                                                        | Origen |
| ------------------------------------------------------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------ | ------ |
| `cima_calcio_carbonato___sodio_alginato___sodio_bicarbonato` | Calcio Carbonato + Sodio Alginato + Sodio Bicarbonato | Otros agentes contra la ulcera peptica y el reflujo gastroesofagico (RGE/GORD) | CIMA   |

### Cloruro de calcio — 1 entradas

| ID                    | Nombre         | Familia           | Origen |
| --------------------- | -------------- | ----------------- | ------ |
| `cima_calcio_cloruro` | Calcio Cloruro | Cloruro de calcio | CIMA   |

### Dobesilato de calcio — 1 entradas

| ID                       | Nombre            | Familia              | Origen |
| ------------------------ | ----------------- | -------------------- | ------ |
| `cima_calcio_dobesilato` | Calcio Dobesilato | Dobesilato de calcio | CIMA   |

### Fosfato de calcio — 1 entradas

| ID                    | Nombre         | Familia           | Origen |
| --------------------- | -------------- | ----------------- | ------ |
| `cima_calcio_fosfato` | Calcio Fosfato | Fosfato de calcio | CIMA   |

### Gluconato de calcio — 1 entradas

| ID                      | Nombre           | Familia             | Origen |
| ----------------------- | ---------------- | ------------------- | ------ |
| `cima_calcio_gluconato` | Calcio Gluconato | Gluconato de calcio | CIMA   |

### Calcio pidolato y colecalciferol, combinaciones con — 1 entradas

| ID                                      | Nombre                           | Familia                                             | Origen |
| --------------------------------------- | -------------------------------- | --------------------------------------------------- | ------ |
| `cima_calcio_pidolato___colecalciferol` | Calcio Pidolato + Colecalciferol | Calcio pidolato y colecalciferol, combinaciones con | CIMA   |

### Calcipotriol, combinaciones con — 1 entradas

| ID                                 | Nombre                      | Familia                         | Origen |
| ---------------------------------- | --------------------------- | ------------------------------- | ------ |
| `cima_calcipotriol___betametasona` | Calcipotriol + Betametasona | Calcipotriol, combinaciones con | CIMA   |

### Sinecatechines — 1 entradas

| ID                       | Nombre            | Familia        | Origen |
| ------------------------ | ----------------- | -------------- | ------ |
| `cima_camellia_sinensis` | Camellia Sinensis | Sinecatechines | CIMA   |

### Canakinumab — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_canakinumab` | Canakinumab | Canakinumab | CIMA   |

### Candesartan y amlodipino — 1 entradas

| ID                              | Nombre                   | Familia                  | Origen |
| ------------------------------- | ------------------------ | ------------------------ | ------ |
| `cima_candesartan___amlodipino` | Candesartán + Amlodipino | Candesartan y amlodipino | CIMA   |

### Candesartan, amlodipino e hidroclorotiazida — 1 entradas

| ID                                                  | Nombre                                       | Familia                                     | Origen |
| --------------------------------------------------- | -------------------------------------------- | ------------------------------------------- | ------ |
| `cima_candesartan___amlodipino___hidroclorotiazida` | Candesartán + Amlodipino + Hidroclorotiazida | Candesartan, amlodipino e hidroclorotiazida | CIMA   |

### Candesartan y diureticos — 1 entradas

| ID                                     | Nombre                          | Familia                  | Origen |
| -------------------------------------- | ------------------------------- | ------------------------ | ------ |
| `cima_candesartan___hidroclorotiazida` | Candesartán + Hidroclorotiazida | Candesartan y diureticos | CIMA   |

### Capmatinib — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_capmatinib` | Capmatinib | Capmatinib | CIMA   |

### Tecnecio (99mTc) tecnegas — 1 entradas

| ID                                        | Nombre                               | Familia                   | Origen |
| ----------------------------------------- | ------------------------------------ | ------------------------- | ------ |
| `cima_carbono_marcado_con_tecnecio_99mtc` | Carbono Marcado Con Tecnecio (99Mtc) | Tecnecio (99mTc) tecnegas | CIMA   |

### Carmustina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_carmustina` | Carmustina | Carmustina | CIMA   |

### Levocarnitina — 1 entradas

| ID               | Nombre    | Familia       | Origen |
| ---------------- | --------- | ------------- | ------ |
| `cima_carnitina` | Carnitina | Levocarnitina | CIMA   |

### Estimulantes del apetito — 1 entradas

| ID                                         | Nombre                              | Familia                  | Origen |
| ------------------------------------------ | ----------------------------------- | ------------------------ | ------ |
| `cima_carnitina___lisina___ciproheptadina` | Carnitina + Lisina + Ciproheptadina | Estimulantes del apetito | CIMA   |

### Carteolol — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_carteolol` | Carteolol | Carteolol | CIMA   |

### Glicosidos de sena, combinaciones con — 1 entradas

| ID                                                           | Nombre                                                | Familia                               | Origen |
| ------------------------------------------------------------ | ----------------------------------------------------- | ------------------------------------- | ------ |
| `cima_cassia_angustifolia___coriandro_sativum___pyrus_malus` | Cassia Angustifolia + Coriandro Sativum + Pyrus Malus | Glicosidos de sena, combinaciones con | CIMA   |

### Otros laxantes — 1 entradas

| ID                                            | Nombre                                 | Familia        | Origen |
| --------------------------------------------- | -------------------------------------- | -------------- | ------ |
| `cima_cassia_angustifolia___rhamnus_frangula` | Cassia Angustifolia + Rhamnus Frangula | Otros laxantes | CIMA   |

### Catridecacog — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_catridecacog` | Catridecacog | Catridecacog | CIMA   |

### Cefepima e inihibidores de la betalactamasa — 1 entradas

| ID                               | Nombre                    | Familia                                     | Origen |
| -------------------------------- | ------------------------- | ------------------------------------------- | ------ |
| `cima_cefepima___enmetazobactam` | Cefepima + Enmetazobactam | Cefepima e inihibidores de la betalactamasa | CIMA   |

### Cemiplimab — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_cemiplimab` | Cemiplimab | Cemiplimab | CIMA   |

### Antagonistas de la vasopresina — 1 entradas

| ID                                                                           | Nombre                                                                | Familia                        | Origen |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------ | ------ |
| `cima_centaurium_erythraea___levisticum_officinale___rosmarinus_officinalis` | Centaurium Erythraea + Levisticum Officinale + Rosmarinus Officinalis | Antagonistas de la vasopresina | CIMA   |

### Centella asiatica planta medicinal — 1 entradas

| ID                       | Nombre            | Familia                            | Origen |
| ------------------------ | ----------------- | ---------------------------------- | ------ |
| `cima_centella_asiatica` | Centella Asiática | Centella asiatica planta medicinal | CIMA   |

### Ceritinib — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_ceritinib` | Ceritinib | Ceritinib | CIMA   |

### Cerliponasa alfa — 1 entradas

| ID                      | Nombre           | Familia          | Origen |
| ----------------------- | ---------------- | ---------------- | ------ |
| `cima_cerliponasa_alfa` | Cerliponasa Alfa | Cerliponasa alfa | CIMA   |

### Cianocobalamina, combinaciones con — 1 entradas

| ID                                    | Nombre                         | Familia                            | Origen |
| ------------------------------------- | ------------------------------ | ---------------------------------- | ------ |
| `cima_cianocobalamina___acido_folico` | Cianocobalamina + Ácido Fólico | Cianocobalamina, combinaciones con | CIMA   |

### Ciclosilicato de sodio y zirconio — 1 entradas

| ID                                    | Nombre                         | Familia                           | Origen |
| ------------------------------------- | ------------------------------ | --------------------------------- | ------ |
| `cima_ciclosilicato_sodio_y_zirconio` | Ciclosilicato Sodio Y Zirconio | Ciclosilicato de sodio y zirconio | CIMA   |

### Ciltacabtagen autoleucel — 1 entradas

| ID                              | Nombre                   | Familia                  | Origen |
| ------------------------------- | ------------------------ | ------------------------ | ------ |
| `cima_ciltacabtagen_autoleucel` | Ciltacabtagén Autoleucel | Ciltacabtagen autoleucel | CIMA   |

### Rizoma de Cimicifuga — 1 entradas

| ID                         | Nombre              | Familia              | Origen |
| -------------------------- | ------------------- | -------------------- | ------ |
| `cima_cimicifuga_racemosa` | Cimicifuga Racemosa | Rizoma de Cimicifuga | CIMA   |

### Cinarizina, combinaciones con — 1 entradas

| ID                                 | Nombre                      | Familia                       | Origen |
| ---------------------------------- | --------------------------- | ----------------------------- | ------ |
| `cima_cinarizina___dimenhidrinato` | Cinarizina + Dimenhidrinato | Cinarizina, combinaciones con | CIMA   |

### cipaglucosidasa alfa — 1 entradas

| ID                          | Nombre               | Familia              | Origen |
| --------------------------- | -------------------- | -------------------- | ------ |
| `cima_cipaglucosidasa_alfa` | Cipaglucosidasa Alfa | cipaglucosidasa alfa | CIMA   |

### Citicolina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_citicolina` | Citicolina | Citicolina | CIMA   |

### Citisiniclina — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_citisiniclina` | Citisiniclina | Citisiniclina | CIMA   |

### Erbio (169Er) citrato coloidal — 1 entradas

| ID                            | Nombre                   | Familia                        | Origen |
| ----------------------------- | ------------------------ | ------------------------------ | ------ |
| `cima_citrato_de_erbio_169er` | Citrato De Erbio (169Er) | Erbio (169Er) citrato coloidal | CIMA   |

### Cleboprida — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_cleboprida` | Cleboprida | Cleboprida | CIMA   |

### Clocinizina en asociacion — 1 entradas

| ID                                      | Nombre                           | Familia                   | Origen |
| --------------------------------------- | -------------------------------- | ------------------------- | ------ |
| `cima_clocinizina___fenilpropanolamina` | Clocinizina + Fenilpropanolamina | Clocinizina en asociacion | CIMA   |

### Clofarabina — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_clofarabina` | Clofarabina | Clofarabina | CIMA   |

### Clometiazol — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_clometiazol` | Clometiazol | Clometiazol | CIMA   |

### Clonixinato de lisina — 1 entradas

| ID                      | Nombre           | Familia               | Origen |
| ----------------------- | ---------------- | --------------------- | ------ |
| `cima_clonixino_lisina` | Clonixino Lisina | Clonixinato de lisina | CIMA   |

### Clorambucilo — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_clorambucilo` | Clorambucilo | Clorambucilo | CIMA   |

### Clordiazepoxido — 1 entradas

| ID                     | Nombre          | Familia         | Origen |
| ---------------------- | --------------- | --------------- | ------ |
| `cima_clordiazepoxido` | Clordiazepóxido | Clordiazepoxido | CIMA   |

### Simpaticomimeticos, combinaciones excluyendo corticosteroides — 1 entradas

| ID                                | Nombre                     | Familia                                                       | Origen |
| --------------------------------- | -------------------------- | ------------------------------------------------------------- | ------ |
| `cima_clorfenamina___tramazolina` | Clorfenamina + Tramazolina | Simpaticomimeticos, combinaciones excluyendo corticosteroides | CIMA   |

### Clormadinona y etinilestradiol — 1 entradas

| ID                                    | Nombre                         | Familia                        | Origen |
| ------------------------------------- | ------------------------------ | ------------------------------ | ------ |
| `cima_clormadinona___etinilestradiol` | Clormadinona + Etinilestradiol | Clormadinona y etinilestradiol | CIMA   |

### Clormetina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_clormetina` | Clormetina | Clormetina | CIMA   |

### Cloroprocaina — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_cloroprocaina` | Cloroprocaina | Cloroprocaina | CIMA   |

### Clortetraciclina — 1 entradas

| ID                      | Nombre           | Familia          | Origen |
| ----------------------- | ---------------- | ---------------- | ------ |
| `cima_clortetraciclina` | Clortetraciclina | Clortetraciclina | CIMA   |

### Cloruro de metiltioninio — 1 entradas

| ID                           | Nombre                | Familia                  | Origen |
| ---------------------------- | --------------------- | ------------------------ | ------ |
| `cima_cloruro_metiltioninio` | Cloruro Metiltioninio | Cloruro de metiltioninio | CIMA   |

### Clotiapina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_clotiapina` | Clotiapina | Clotiapina | CIMA   |

### Alquitranes — 1 entradas

| ID                           | Nombre                  | Familia     | Origen |
| ---------------------------- | ----------------------- | ----------- | ------ |
| `cima_coaltar_brea_de_hulla` | Coaltar (Brea De Hulla) | Alquitranes | CIMA   |

### Cobimetinib — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_cobimetinib` | Cobimetinib | Cobimetinib | CIMA   |

### Tecnecio (99mTc) sestamibi — 1 entradas

| ID                    | Nombre         | Familia                    | Origen |
| --------------------- | -------------- | -------------------------- | ------ |
| `cima_cobre_tetrakis` | Cobre Tetrakis | Tecnecio (99mTc) sestamibi | CIMA   |

### Colchicina combinaciones con — 1 entradas

| ID                                | Nombre                     | Familia                      | Origen |
| --------------------------------- | -------------------------- | ---------------------------- | ------ |
| `cima_colchicina___dicicloverina` | Colchicina + Dicicloverina | Colchicina combinaciones con | CIMA   |

### Colistina — 1 entradas

| ID                            | Nombre                 | Familia   | Origen |
| ----------------------------- | ---------------------- | --------- | ------ |
| `cima_colistimetato_de_sodio` | Colistimetato De Sodio | Colistina | CIMA   |

### CALCIO — 1 entradas

| ID                                      | Nombre                            | Familia | Origen |
| --------------------------------------- | --------------------------------- | ------- | ------ |
| `cima_complejo_de_oseinahidroxiapatita` | Complejo De Oseína-Hidroxiapatita | CALCIO  | CIMA   |

### Otros agentes antirreumaticos especificos — 1 entradas

| ID                                      | Nombre                           | Familia                                   | Origen |
| --------------------------------------- | -------------------------------- | ----------------------------------------- | ------ |
| `cima_condroitin_sulfato___glucosamina` | Condroitín Sulfato + Glucosamina | Otros agentes antirreumaticos especificos | CIMA   |

### Coriogonadotropina alfa — 1 entradas

| ID                             | Nombre                  | Familia                 | Origen |
| ------------------------------ | ----------------------- | ----------------------- | ------ |
| `cima_coriogonadotrofina_alfa` | Coriogonadotrofina Alfa | Coriogonadotropina alfa | CIMA   |

### Asparaginasa — 1 entradas

| ID                   | Nombre        | Familia      | Origen |
| -------------------- | ------------- | ------------ | ------ |
| `cima_crisantaspasa` | Crisantaspasa | Asparaginasa | CIMA   |

### Acido cromoglicico — 1 entradas

| ID                        | Nombre             | Familia            | Origen |
| ------------------------- | ------------------ | ------------------ | ------ |
| `cima_cromoglicato_sodio` | Cromoglicato Sodio | Acido cromoglicico | CIMA   |

### Crovalimab — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_crovalimab` | Crovalimab | Crovalimab | CIMA   |

### Dabrafenib — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_dabrafenib` | Dabrafenib | Dabrafenib | CIMA   |

### Dacarbazina — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_dacarbazina` | Dacarbazina | Dacarbazina | CIMA   |

### Dacomitinib — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_dacomitinib` | Dacomitinib | Dacomitinib | CIMA   |

### Danaparoid — 1 entradas

| ID                       | Nombre            | Familia    | Origen |
| ------------------------ | ----------------- | ---------- | ------ |
| `cima_danaparoide_sodio` | Danaparoide Sodio | Danaparoid | CIMA   |

### Danicopan — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_danicopan` | Danicopán | Danicopan | CIMA   |

### Metformina y dapagliflozina — 1 entradas

| ID                                 | Nombre                      | Familia                     | Origen |
| ---------------------------------- | --------------------------- | --------------------------- | ------ |
| `cima_dapagliflozina___metformina` | Dapagliflozina + Metformina | Metformina y dapagliflozina | CIMA   |

### Dapoxetina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_dapoxetina` | Dapoxetina | Dapoxetina | CIMA   |

### Daratumumab — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_daratumumab` | Daratumumab | Daratumumab | CIMA   |

### Daridorexant — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_daridorexant` | Daridorexant | Daridorexant | CIMA   |

### Darunavir y cobicistat — 1 entradas

| ID                            | Nombre                 | Familia                | Origen |
| ----------------------------- | ---------------------- | ---------------------- | ------ |
| `cima_darunavir___cobicistat` | Darunavir + Cobicistat | Darunavir y cobicistat | CIMA   |

### Emtricitabina, tenofovir alafenamida, darunavir y cobicistat — 1 entradas

| ID                                                                    | Nombre                                                         | Familia                                                      | Origen |
| --------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------ | ------ |
| `cima_darunavir___cobicistat___emtricitabina___tenofovir_alafenamida` | Darunavir + Cobicistat + Emtricitabina + Tenofovir Alafenamida | Emtricitabina, tenofovir alafenamida, darunavir y cobicistat | CIMA   |

### Daunorubicina — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_daunorubicina` | Daunorubicina | Daunorubicina | CIMA   |

### Citarabina y daunorubicina — 1 entradas

| ID                                | Nombre                     | Familia                    | Origen |
| --------------------------------- | -------------------------- | -------------------------- | ------ |
| `cima_daunorubicina___citarabina` | Daunorubicina + Citarabina | Citarabina y daunorubicina | CIMA   |

### Decitabina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_decitabina` | Decitabina | Decitabina | CIMA   |

### Decitabina, combinaciones con — 1 entradas

| ID                               | Nombre                    | Familia                       | Origen |
| -------------------------------- | ------------------------- | ----------------------------- | ------ |
| `cima_decitabina___cedazuridina` | Decitabina + Cedazuridina | Decitabina, combinaciones con | CIMA   |

### Decualinio, cloruro — 1 entradas

| ID                        | Nombre             | Familia             | Origen |
| ------------------------- | ------------------ | ------------------- | ------ |
| `cima_decualinio_cloruro` | Decualinio Cloruro | Decualinio, cloruro | CIMA   |

### Delapril y manidipino — 1 entradas

| ID                           | Nombre                | Familia               | Origen |
| ---------------------------- | --------------------- | --------------------- | ------ |
| `cima_delapril___manidipino` | Delapril + Manidipino | Delapril y manidipino | CIMA   |

### Delgocitinib — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_delgocitinib` | Delgocitinib | Delgocitinib | CIMA   |

### Acaros de polvo ambiental — 1 entradas

| ID                                                               | Nombre                                                    | Familia                   | Origen |
| ---------------------------------------------------------------- | --------------------------------------------------------- | ------------------------- | ------ |
| `cima_dermatophagoides_pteronyssinus___dermatophagoides_farinae` | Dermatophagoides Pteronyssinus + Dermatophagoides Farinae | Acaros de polvo ambiental | CIMA   |

### Desfesoterodina — 1 entradas

| ID                     | Nombre          | Familia         | Origen |
| ---------------------- | --------------- | --------------- | ------ |
| `cima_desfesoterodina` | Desfesoterodina | Desfesoterodina | CIMA   |

### Desogestrel y estrogeno — 1 entradas

| ID                                   | Nombre                        | Familia                 | Origen |
| ------------------------------------ | ----------------------------- | ----------------------- | ------ |
| `cima_desogestrel___etinilestradiol` | Desogestrel + Etinilestradiol | Desogestrel y estrogeno | CIMA   |

### Dexanfetamina — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_dexanfetamina` | Dexanfetamina | Dexanfetamina | CIMA   |

### Dexclorfeniramina — 1 entradas

| ID                       | Nombre            | Familia           | Origen |
| ------------------------ | ----------------- | ----------------- | ------ |
| `cima_dexclorfeniramina` | Dexclorfeniramina | Dexclorfeniramina | CIMA   |

### Antihistaminicos para uso topico — 1 entradas

| ID                                   | Nombre                        | Familia                          | Origen |
| ------------------------------------ | ----------------------------- | -------------------------------- | ------ |
| `cima_dexclorfeniramina___alantoina` | Dexclorfeniramina + Alantoína | Antihistaminicos para uso topico | CIMA   |

### Dexibuprofeno — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_dexibuprofeno` | Dexibuprofeno | Dexibuprofeno | CIMA   |

### Supresores de la tos y expectorantes — 1 entradas

| ID                                   | Nombre                        | Familia                              | Origen |
| ------------------------------------ | ----------------------------- | ------------------------------------ | ------ |
| `cima_dextrometorfano___fenilefrina` | Dextrometorfano + Fenilefrina | Supresores de la tos y expectorantes | CIMA   |

### BMP-2 — 1 entradas

| ID                      | Nombre           | Familia | Origen |
| ----------------------- | ---------------- | ------- | ------ |
| `cima_dibotermina_alfa` | Dibotermina Alfa | BMP-2   | CIMA   |

### Diclofenaco, combinaciones con — 1 entradas

| ID                               | Nombre                    | Familia                        | Origen |
| -------------------------------- | ------------------------- | ------------------------------ | ------ |
| `cima_diclofenaco___misoprostol` | Diclofenaco + Misoprostol | Diclofenaco, combinaciones con | CIMA   |

### Dienogest y estrogeno — 1 entradas

| ID                           | Nombre                | Familia               | Origen |
| ---------------------------- | --------------------- | --------------------- | ------ |
| `cima_dienogest___estradiol` | Dienogest + Estradiol | Dienogest y estrogeno | CIMA   |

### Dienogest y etinilestradiol — 1 entradas

| ID                                 | Nombre                      | Familia                     | Origen |
| ---------------------------------- | --------------------------- | --------------------------- | ------ |
| `cima_dienogest___etinilestradiol` | Dienogest + Etinilestradiol | Dienogest y etinilestradiol | CIMA   |

### Difelicefalina — 1 entradas

| ID                    | Nombre         | Familia        | Origen |
| --------------------- | -------------- | -------------- | ------ |
| `cima_difelicefalina` | Difelicefalina | Difelicefalina | CIMA   |

### Diflucortolona — 1 entradas

| ID                    | Nombre         | Familia        | Origen |
| --------------------- | -------------- | -------------- | ------ |
| `cima_diflucortolona` | Diflucortolona | Diflucortolona | CIMA   |

### Dihidrocodeina — 1 entradas

| ID                    | Nombre         | Familia        | Origen |
| --------------------- | -------------- | -------------- | ------ |
| `cima_dihidrocodeina` | Dihidrocodeina | Dihidrocodeina | CIMA   |

### Dihidroergocristina — 1 entradas

| ID                         | Nombre              | Familia             | Origen |
| -------------------------- | ------------------- | ------------------- | ------ |
| `cima_dihidroergocristina` | Dihidroergocristina | Dihidroergocristina | CIMA   |

### Difenhidramina, combinaciones con — 1 entradas

| ID                              | Nombre                   | Familia                           | Origen |
| ------------------------------- | ------------------------ | --------------------------------- | ------ |
| `cima_dimenhidrinato___cafeina` | Dimenhidrinato + Cafeína | Difenhidramina, combinaciones con | CIMA   |

### Dimetindeno — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_dimetindeno` | Dimetindeno | Dimetindeno | CIMA   |

### Dinutuximab beta — 1 entradas

| ID                      | Nombre           | Familia          | Origen |
| ----------------------- | ---------------- | ---------------- | ------ |
| `cima_dinutuximab_beta` | Dinutuximab Beta | Dinutuximab beta | CIMA   |

### Diosmina — 1 entradas

| ID              | Nombre   | Familia  | Origen |
| --------------- | -------- | -------- | ------ |
| `cima_diosmina` | Diosmina | Diosmina | CIMA   |

### Diosmina, combinaciones con — 1 entradas

| ID                            | Nombre                 | Familia                     | Origen |
| ----------------------------- | ---------------------- | --------------------------- | ------ |
| `cima_diosmina___hesperidina` | Diosmina + Hesperidina | Diosmina, combinaciones con | CIMA   |

### Diprofilina, combinaciones con — 1 entradas

| ID                                               | Nombre                                    | Familia                        | Origen |
| ------------------------------------------------ | ----------------------------------------- | ------------------------------ | ------ |
| `cima_diprofilina___betametasona___guaifenesina` | Diprofilina + Betametasona + Guaifenesina | Diprofilina, combinaciones con | CIMA   |

### Dioxido de carbono — 1 entradas

| ID                        | Nombre             | Familia            | Origen |
| ------------------------- | ------------------ | ------------------ | ------ |
| `cima_dioxido_de_carbono` | Dióxido De Carbono | Dioxido de carbono | CIMA   |

### Lamivudina y dolutegravir — 1 entradas

| ID                               | Nombre                    | Familia                   | Origen |
| -------------------------------- | ------------------------- | ------------------------- | ------ |
| `cima_dolutegravir___lamivudina` | Dolutegravir + Lamivudina | Lamivudina y dolutegravir | CIMA   |

### Dolutegravir y Rilpivirina — 1 entradas

| ID                                | Nombre                     | Familia                    | Origen |
| --------------------------------- | -------------------------- | -------------------------- | ------ |
| `cima_dolutegravir___rilpivirina` | Dolutegravir + Rilpivirina | Dolutegravir y Rilpivirina | CIMA   |

### Donepezilo y memantina — 1 entradas

| ID                            | Nombre                 | Familia                | Origen |
| ----------------------------- | ---------------------- | ---------------------- | ------ |
| `cima_donepezilo___memantina` | Donepezilo + Memantina | Donepezilo y memantina | CIMA   |

### Dostarlimab — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_dostarlimab` | Dostarlimab | Dostarlimab | CIMA   |

### Doxilamina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_doxilamina` | Doxilamina | Doxilamina | CIMA   |

### Doxilamina, combinaciones con — 1 entradas

| ID                             | Nombre                  | Familia                       | Origen |
| ------------------------------ | ----------------------- | ----------------------------- | ------ |
| `cima_doxilamina___piridoxina` | Doxilamina + Piridoxina | Doxilamina, combinaciones con | CIMA   |

### Cannabinoides — 1 entradas

| ID                              | Nombre                   | Familia       | Origen |
| ------------------------------- | ------------------------ | ------------- | ------ |
| `cima_dronabinol___cannabidiol` | Dronabinol + Cannabidiol | Cannabinoides | CIMA   |

### Drospirenona y estetrol — 1 entradas

| ID                             | Nombre                  | Familia                 | Origen |
| ------------------------------ | ----------------------- | ----------------------- | ------ |
| `cima_drospirenona___estetrol` | Drospirenona + Estetrol | Drospirenona y estetrol | CIMA   |

### Progestagenos y estrogenos, combinaciones — 1 entradas

| ID                              | Nombre                   | Familia                                   | Origen |
| ------------------------------- | ------------------------ | ----------------------------------------- | ------ |
| `cima_drospirenona___estradiol` | Drospirenona + Estradiol | Progestagenos y estrogenos, combinaciones | CIMA   |

### Drospirenona y estrogeno — 1 entradas

| ID                                    | Nombre                         | Familia                  | Origen |
| ------------------------------------- | ------------------------------ | ------------------------ | ------ |
| `cima_drospirenona___etinilestradiol` | Drospirenona + Etinilestradiol | Drospirenona y estrogeno | CIMA   |

### Tamsulosina y dutasterida — 1 entradas

| ID                               | Nombre                    | Familia                   | Origen |
| -------------------------------- | ------------------------- | ------------------------- | ------ |
| `cima_dutasterida___tamsulosina` | Dutasterida + Tamsulosina | Tamsulosina y dutasterida | CIMA   |

### Eberconazol — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_eberconazol` | Eberconazol | Eberconazol | CIMA   |

### Otros preparados para la garganta — 1 entradas

| ID                                             | Nombre                                  | Familia                           | Origen |
| ---------------------------------------------- | --------------------------------------- | --------------------------------- | ------ |
| `cima_echinacea_purpurea___salvia_officinalis` | Echinacea Purpurea + Salvia Officinalis | Otros preparados para la garganta | CIMA   |

### galio (68Ga) edoteotrida — 1 entradas

| ID                 | Nombre      | Familia                  | Origen |
| ------------------ | ----------- | ------------------------ | ------ |
| `cima_edotreotida` | Edotreotida | galio (68Ga) edoteotrida | CIMA   |

### Emtricitabina, tenofovir disoproxilo y efavirenz — 1 entradas

| ID                                           | Nombre                                | Familia                                          | Origen |
| -------------------------------------------- | ------------------------------------- | ------------------------------------------------ | ------ |
| `cima_efavirenz___emtricitabina___tenofovir` | Efavirenz + Emtricitabina + Tenofovir | Emtricitabina, tenofovir disoproxilo y efavirenz | CIMA   |

### Efgartigimod alfa — 1 entradas

| ID                       | Nombre            | Familia           | Origen |
| ------------------------ | ----------------- | ----------------- | ------ |
| `cima_efgartigimod_alfa` | Efgartigimod Alfa | Efgartigimod alfa | CIMA   |

### Eliglustat — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_eliglustat` | Eliglustat | Eliglustat | CIMA   |

### Elosulfasa alfa — 1 entradas

| ID                     | Nombre          | Familia         | Origen |
| ---------------------- | --------------- | --------------- | ------ |
| `cima_elosulfasa_alfa` | Elosulfasa Alfa | Elosulfasa alfa | CIMA   |

### Elotuzumab — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_elotuzumab` | Elotuzumab | Elotuzumab | CIMA   |

### Elranatamab — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_elranatamab` | Elranatamab | Elranatamab | CIMA   |

### Emtricitabina, tenofovir disoproxilo, elvitegravir y cobicistat — 1 entradas

| ID                                                           | Nombre                                                | Familia                                                         | Origen |
| ------------------------------------------------------------ | ----------------------------------------------------- | --------------------------------------------------------------- | ------ |
| `cima_elvitegravir___cobicistat___emtricitabina___tenofovir` | Elvitegravir + Cobicistat + Emtricitabina + Tenofovir | Emtricitabina, tenofovir disoproxilo, elvitegravir y cobicistat | CIMA   |

### Emtricitabina, tenofovir alafenamida, elvitegravir y cobicistat — 1 entradas

| ID                                                                       | Nombre                                                            | Familia                                                         | Origen |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------- | --------------------------------------------------------------- | ------ |
| `cima_elvitegravir___cobicistat___emtricitabina___tenofovir_alafenamida` | Elvitegravir + Cobicistat + Emtricitabina + Tenofovir Alafenamida | Emtricitabina, tenofovir alafenamida, elvitegravir y cobicistat | CIMA   |

### Emedastina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_emedastina` | Emedastina | Emedastina | CIMA   |

### Metformina y empagliflozina — 1 entradas

| ID                                 | Nombre                      | Familia                     | Origen |
| ---------------------------------- | --------------------------- | --------------------------- | ------ |
| `cima_empagliflozina___metformina` | Empagliflozina + Metformina | Metformina y empagliflozina | CIMA   |

### Emtricitabina, tenofovir disoproxilo y rilpivirina — 1 entradas

| ID                                             | Nombre                                  | Familia                                            | Origen |
| ---------------------------------------------- | --------------------------------------- | -------------------------------------------------- | ------ |
| `cima_emtricitabina___rilpivirina___tenofovir` | Emtricitabina + Rilpivirina + Tenofovir | Emtricitabina, tenofovir disoproxilo y rilpivirina | CIMA   |

### Emtricitabina, tenofovir alafenamida y rilpivirina — 1 entradas

| ID                                                         | Nombre                                              | Familia                                            | Origen |
| ---------------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------- | ------ |
| `cima_emtricitabina___rilpivirina___tenofovir_alafenamida` | Emtricitabina + Rilpivirina + Tenofovir Alafenamida | Emtricitabina, tenofovir alafenamida y rilpivirina | CIMA   |

### Tenofovir disoproxilo y emtricitabina — 1 entradas

| ID                               | Nombre                    | Familia                               | Origen |
| -------------------------------- | ------------------------- | ------------------------------------- | ------ |
| `cima_emtricitabina___tenofovir` | Emtricitabina + Tenofovir | Tenofovir disoproxilo y emtricitabina | CIMA   |

### Emtricitabina y tenofovir alafenamida — 1 entradas

| ID                                           | Nombre                                | Familia                               | Origen |
| -------------------------------------------- | ------------------------------------- | ------------------------------------- | ------ |
| `cima_emtricitabina___tenofovir_alafenamida` | Emtricitabina + Tenofovir Alafenamida | Emtricitabina y tenofovir alafenamida | CIMA   |

### Emtricitabina, tenofovir alafenamida y bictegravir — 1 entradas

| ID                                                         | Nombre                                              | Familia                                            | Origen |
| ---------------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------- | ------ |
| `cima_emtricitabina___tenofovir_alafenamida___bictegravir` | Emtricitabina + Tenofovir Alafenamida + Bictegravir | Emtricitabina, tenofovir alafenamida y bictegravir | CIMA   |

### Enalapril y diureticos — 1 entradas

| ID                                   | Nombre                        | Familia                | Origen |
| ------------------------------------ | ----------------------------- | ---------------------- | ------ |
| `cima_enalapril___hidroclorotiazida` | Enalapril + Hidroclorotiazida | Enalapril y diureticos | CIMA   |

### Enalapril y lercanidipino — 1 entradas

| ID                               | Nombre                    | Familia                   | Origen |
| -------------------------------- | ------------------------- | ------------------------- | ------ |
| `cima_enalapril___lercanidipino` | Enalapril + Lercanidipino | Enalapril y lercanidipino | CIMA   |

### Enalapril y nitrendipino — 1 entradas

| ID                              | Nombre                   | Familia                  | Origen |
| ------------------------------- | ------------------------ | ------------------------ | ------ |
| `cima_enalapril___nitrendipino` | Enalapril + Nitrendipino | Enalapril y nitrendipino | CIMA   |

### Encorafenib — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_encorafenib` | Encorafenib | Encorafenib | CIMA   |

### Entrectinib — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_entrectinib` | Entrectinib | Entrectinib | CIMA   |

### Epcoritamab — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_epcoritamab` | Epcoritamab | Epcoritamab | CIMA   |

### Epirubicina — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_epirubicina` | Epirubicina | Epirubicina | CIMA   |

### Eplontersen — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_eplontersen` | Eplontersén | Eplontersen | CIMA   |

### Metoxi propilenglicol epoetina beta — 1 entradas

| ID                                          | Nombre                               | Familia                             | Origen |
| ------------------------------------------- | ------------------------------------ | ----------------------------------- | ------ |
| `cima_epoetina_beta_metoxipolietilenglicol` | Epoetina Beta Metoxipolietilenglicol | Metoxi propilenglicol epoetina beta | CIMA   |

### Eprosartan y diureticos — 1 entradas

| ID                                    | Nombre                         | Familia                 | Origen |
| ------------------------------------- | ------------------------------ | ----------------------- | ------ |
| `cima_eprosartan___hidroclorotiazida` | Eprosartán + Hidroclorotiazida | Eprosartan y diureticos | CIMA   |

### Factor VIIa de la coagulacion — 1 entradas

| ID                  | Nombre       | Familia                       | Origen |
| ------------------- | ------------ | ----------------------------- | ------ |
| `cima_eptacog_beta` | Eptacog Beta | Factor VIIa de la coagulacion | CIMA   |

### Eptinezumab — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_eptinezumab` | Eptinezumab | Eptinezumab | CIMA   |

### Otros agentes ahorradores de potasio — 1 entradas

| ID                       | Nombre            | Familia                              | Origen |
| ------------------------ | ----------------- | ------------------------------------ | ------ |
| `cima_equisetum_arvense` | Equisetum Arvense | Otros agentes ahorradores de potasio | CIMA   |

### Erdafitinib — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_erdafitinib` | Erdafitinib | Erdafitinib | CIMA   |

### Eribulina — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_eribulina` | Eribulina | Eribulina | CIMA   |

### Eritromicina, combinaciones con — 1 entradas

| ID                                 | Nombre                      | Familia                         | Origen |
| ---------------------------------- | --------------------------- | ------------------------------- | ------ |
| `cima_eritromicina___zinc_acetato` | Eritromicina + Zinc Acetato | Eritromicina, combinaciones con | CIMA   |

### Erlotinib — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_erlotinib` | Erlotinib | Erlotinib | CIMA   |

### Metformina y ertugliflozina — 1 entradas

| ID                                 | Nombre                      | Familia                     | Origen |
| ---------------------------------- | --------------------------- | --------------------------- | ------ |
| `cima_ertugliflozina___metformina` | Ertugliflozina + Metformina | Metformina y ertugliflozina | CIMA   |

### Escina — 1 entradas

| ID            | Nombre | Familia | Origen |
| ------------- | ------ | ------- | ------ |
| `cima_escina` | Escina | Escina  | CIMA   |

### Otros agentes esclerosantes — 1 entradas

| ID                                     | Nombre                          | Familia                     | Origen |
| -------------------------------------- | ------------------------------- | --------------------------- | ------ |
| `cima_escina___salicilato_dietilamina` | Escina + Salicilato Dietilamina | Otros agentes esclerosantes | CIMA   |

### Lavandulae aetheroleum — 1 entradas

| ID                        | Nombre             | Familia                | Origen |
| ------------------------- | ------------------ | ---------------------- | ------ |
| `cima_esencia_de_lavanda` | Esencia De Lavanda | Lavandulae aetheroleum | CIMA   |

### Espesolimab — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_espesolimab` | Espesolimab | Espesolimab | CIMA   |

### Espiramicina, combinacion con otros antibacterianos — 1 entradas

| ID                                 | Nombre                      | Familia                                             | Origen |
| ---------------------------------- | --------------------------- | --------------------------------------------------- | ------ |
| `cima_espiramicina___metronidazol` | Espiramicina + Metronidazol | Espiramicina, combinacion con otros antibacterianos | CIMA   |

### Altizida y agentes ahorradores de potasio — 1 entradas

| ID                                | Nombre                     | Familia                                   | Origen |
| --------------------------------- | -------------------------- | ----------------------------------------- | ------ |
| `cima_espironolactona___altizida` | Espironolactona + Altizida | Altizida y agentes ahorradores de potasio | CIMA   |

### Clortalidona y agentes ahorradores de potasio — 1 entradas

| ID                                    | Nombre                         | Familia                                       | Origen |
| ------------------------------------- | ------------------------------ | --------------------------------------------- | ------ |
| `cima_espironolactona___clortalidona` | Espironolactona + Clortalidona | Clortalidona y agentes ahorradores de potasio | CIMA   |

### Estreptoquinasa — 1 entradas

| ID                                       | Nombre                            | Familia         | Origen |
| ---------------------------------------- | --------------------------------- | --------------- | ------ |
| `cima_estreptoquinasa___estreptodornasa` | Estreptoquinasa + Estreptodornasa | Estreptoquinasa | CIMA   |

### Estriol — 1 entradas

| ID             | Nombre  | Familia | Origen |
| -------------- | ------- | ------- | ------ |
| `cima_estriol` | Estriol | Estriol | CIMA   |

### Estrogenos conjugados y bazedoxifeno — 1 entradas

| ID                                          | Nombre                               | Familia                              | Origen |
| ------------------------------------------- | ------------------------------------ | ------------------------------------ | ------ |
| `cima_estrogenos_conjugados___bazedoxifeno` | Estrogenos Conjugados + Bazedoxifeno | Estrogenos conjugados y bazedoxifeno | CIMA   |

### Etofenamato — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_etofenamato` | Etofenamato | Etofenamato | CIMA   |

### Anillo vaginal con progestageno y estrogeno — 1 entradas

| ID                                    | Nombre                         | Familia                                     | Origen |
| ------------------------------------- | ------------------------------ | ------------------------------------------- | ------ |
| `cima_etonogestrel___etinilestradiol` | Etonogestrel + Etinilestradiol | Anillo vaginal con progestageno y estrogeno | CIMA   |

### Etranacogen dezaparvovec — 1 entradas

| ID                              | Nombre                   | Familia                  | Origen |
| ------------------------------- | ------------------------ | ------------------------ | ------ |
| `cima_etranacogen_dezaparvovec` | Etranacogén Dezaparvovec | Etranacogen dezaparvovec | CIMA   |

### Etrasimod — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_etrasimod` | Etrasimod | Etrasimod | CIMA   |

### Etravirina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_etravirina` | Etravirina | Etravirina | CIMA   |

### Evinacumab — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_evinacumab` | Evinacumab | Evinacumab | CIMA   |

### Tecnecio (99mTc) exametazima — 1 entradas

| ID                 | Nombre      | Familia                      | Origen |
| ------------------ | ----------- | ---------------------------- | ------ |
| `cima_exametazima` | Exametazima | Tecnecio (99mTc) exametazima | CIMA   |

### Factor Von Willebrand y factor VIII de la coagulacion en combinacion — 1 entradas

| ID                                         | Nombre                              | Familia                                                              | Origen |
| ------------------------------------------ | ----------------------------------- | -------------------------------------------------------------------- | ------ |
| `cima_factor_con_willebrand___factor_viii` | Factor Con Willebrand + Factor Viii | Factor Von Willebrand y factor VIII de la coagulacion en combinacion | CIMA   |

### Factor Von Willebrand — 1 entradas

| ID                           | Nombre                | Familia               | Origen |
| ---------------------------- | --------------------- | --------------------- | ------ |
| `cima_factor_von_willebrand` | Factor Von Willebrand | Factor Von Willebrand | CIMA   |

### Factor X de la coagulacion — 1 entradas

| ID              | Nombre   | Familia                    | Origen |
| --------------- | -------- | -------------------------- | ------ |
| `cima_factor_x` | Factor X | Factor X de la coagulacion | CIMA   |

### Fampridina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_fampridina` | Fampridina | Fampridina | CIMA   |

### Glicerol, fenilbutirato de — 1 entradas

| ID                                | Nombre                     | Familia                    | Origen |
| --------------------------------- | -------------------------- | -------------------------- | ------ |
| `cima_fenilbutirato_de_glicerilo` | Fenilbutirato De Glicerilo | Glicerol, fenilbutirato de | CIMA   |

### Fenilbutirato de sodio — 1 entradas

| ID                            | Nombre                 | Familia                | Origen |
| ----------------------------- | ---------------------- | ---------------------- | ------ |
| `cima_fenilbutirato_de_sodio` | Fenilbutirato De Sodio | Fenilbutirato de sodio | CIMA   |

### Fenilefrina, combinaciones con — 1 entradas

| ID                                                 | Nombre                                      | Familia                        | Origen |
| -------------------------------------------------- | ------------------------------------------- | ------------------------------ | ------ |
| `cima_fenilefrina___clorfenamina___difenhidramina` | Fenilefrina + Clorfenamina + Difenhidramina | Fenilefrina, combinaciones con | CIMA   |

### Fenticonazol — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_fenticonazol` | Fenticonazol | Fenticonazol | CIMA   |

### Hierro trivalente, preparados orales — 1 entradas

| ID                              | Nombre                   | Familia                              | Origen |
| ------------------------------- | ------------------------ | ------------------------------------ | ------ |
| `cima_ferrimanitol_ovoalbumina` | Ferrimanitol Ovoalbúmina | Hierro trivalente, preparados orales | CIMA   |

### Ferroso glicina sulfato — 1 entradas

| ID                          | Nombre               | Familia                 | Origen |
| --------------------------- | -------------------- | ----------------------- | ------ |
| `cima_ferroglicina_sulfato` | Ferroglicina Sulfato | Ferroso glicina sulfato | CIMA   |

### Fezolinetant — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_fezolinetant` | Fezolinetant | Fezolinetant | CIMA   |

### Finasterida y tadalafilo — 1 entradas

| ID                              | Nombre                   | Familia                  | Origen |
| ------------------------------- | ------------------------ | ------------------------ | ------ |
| `cima_finasterida___tadalafilo` | Finasterida + Tadalafilo | Finasterida y tadalafilo | CIMA   |

### Flavoxato — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_flavoxato` | Flavoxato | Flavoxato | CIMA   |

### florbetaben (18F) — 1 entradas

| ID                     | Nombre            | Familia           | Origen |
| ---------------------- | ----------------- | ----------------- | ------ |
| `cima_florbetaben_18f` | Florbetaben (18F) | florbetaben (18F) | CIMA   |

### Fludarabina — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_fludarabina` | Fludarabina | Fludarabina | CIMA   |

### Fluodesoxiglucosa (18F) — 1 entradas

| ID                          | Nombre                 | Familia                 | Origen |
| --------------------------- | ---------------------- | ----------------------- | ------ |
| `cima_fludesoxiglucosa_18f` | Fludesoxiglucosa (18F) | Fluodesoxiglucosa (18F) | CIMA   |

### Fluocinolona, acetonido y antiinfecciosos — 1 entradas

| ID                                   | Nombre                        | Familia                                   | Origen |
| ------------------------------------ | ----------------------------- | ----------------------------------------- | ------ |
| `cima_fluocinolona___ciprofloxacino` | Fluocinolona + Ciprofloxacino | Fluocinolona, acetonido y antiinfecciosos | CIMA   |

### Fluocinonida con antibioticos — 1 entradas

| ID                                | Nombre                     | Familia                       | Origen |
| --------------------------------- | -------------------------- | ----------------------------- | ------ |
| `cima_fluocinonida___gentamicina` | Fluocinonida + Gentamicina | Fluocinonida con antibioticos | CIMA   |

### Fluocinonida — 1 entradas

| ID                                             | Nombre                                  | Familia      | Origen |
| ---------------------------------------------- | --------------------------------------- | ------------ | ------ |
| `cima_fluocinonida___hexetidina___ruscogenina` | Fluocinonida + Hexetidina + Ruscogenina | Fluocinonida | CIMA   |

### Fluoresceina — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_fluoresceina` | Fluoresceina | Fluoresceina | CIMA   |

### Fluorodopa 18F — 1 entradas

| ID                    | Nombre           | Familia        | Origen |
| --------------------- | ---------------- | -------------- | ------ |
| `cima_fluorodopa_18f` | Fluorodopa (18F) | Fluorodopa 18F | CIMA   |

### Fluorocolina (18F) — 1 entradas

| ID                           | Nombre                  | Familia            | Origen |
| ---------------------------- | ----------------------- | ------------------ | ------ |
| `cima_fluorometilcolina_18f` | Fluorometilcolina (18F) | Fluorocolina (18F) | CIMA   |

### Fluorometolona — 1 entradas

| ID                    | Nombre         | Familia        | Origen |
| --------------------- | -------------- | -------------- | ------ |
| `cima_fluorometolona` | Fluorometolona | Fluorometolona | CIMA   |

### Fluorouracilo, combinaciones con — 1 entradas

| ID                                      | Nombre                           | Familia                          | Origen |
| --------------------------------------- | -------------------------------- | -------------------------------- | ------ |
| `cima_fluorouracilo___acido_salicilico` | Fluorouracilo + Ácido Salicílico | Fluorouracilo, combinaciones con | CIMA   |

### Flurazepam — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_flurazepam` | Flurazepam | Flurazepam | CIMA   |

### Flutamida — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_flutamida` | Flutamida | Flutamida | CIMA   |

### Flutemetamol (18F) — 1 entradas

| ID                      | Nombre             | Familia            | Origen |
| ----------------------- | ------------------ | ------------------ | ------ |
| `cima_flutemetamol_18f` | Flutemetamol (18F) | Flutemetamol (18F) | CIMA   |

### Fluticasona, combinaciones con — 1 entradas

| ID                              | Nombre                   | Familia                        | Origen |
| ------------------------------- | ------------------------ | ------------------------------ | ------ |
| `cima_fluticasona___azelastina` | Fluticasona + Azelastina | Fluticasona, combinaciones con | CIMA   |

### Formoterol y fluticasona — 1 entradas

| ID                              | Nombre                   | Familia                  | Origen |
| ------------------------------- | ------------------------ | ------------------------ | ------ |
| `cima_fluticasona___formoterol` | Fluticasona + Formoterol | Formoterol y fluticasona | CIMA   |

### Vilanterol, umeclidinio, bromuro de y fluticasona, furoato de — 1 entradas

| ID                                            | Nombre                                 | Familia                                                       | Origen |
| --------------------------------------------- | -------------------------------------- | ------------------------------------------------------------- | ------ |
| `cima_fluticasona___umeclidinio___vilanterol` | Fluticasona + Umeclidinio + Vilanterol | Vilanterol, umeclidinio, bromuro de y fluticasona, furoato de | CIMA   |

### Vilanterol y furoato de fluticasona — 1 entradas

| ID                              | Nombre                   | Familia                             | Origen |
| ------------------------------- | ------------------------ | ----------------------------------- | ------ |
| `cima_fluticasona___vilanterol` | Fluticasona + Vilanterol | Vilanterol y furoato de fluticasona | CIMA   |

### Flutrimazol — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_flutrimazol` | Flutrimazol | Flutrimazol | CIMA   |

### Fluvastatina — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_fluvastatina` | Fluvastatina | Fluvastatina | CIMA   |

### Folitropina delta — 1 entradas

| ID                       | Nombre            | Familia           | Origen |
| ------------------------ | ----------------- | ----------------- | ------ |
| `cima_folitropina_delta` | Folitropina Delta | Folitropina delta | CIMA   |

### Fostamatinib — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_fostamatinib` | Fostamatinib | Fostamatinib | CIMA   |

### Fruquintinib — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_fruquintinib` | Fruquintinib | Fruquintinib | CIMA   |

### Fulvestrant — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_fulvestrant` | Fulvestrant | Fulvestrant | CIMA   |

### Fumarato de diroximel — 1 entradas

| ID                           | Nombre                | Familia               | Origen |
| ---------------------------- | --------------------- | --------------------- | ------ |
| `cima_fumarato_de_diroximel` | Fumarato De Diroximel | Fumarato de diroximel | CIMA   |

### Furosemida y agentes ahorradores de potasio — 1 entradas

| ID                              | Nombre                   | Familia                                     | Origen |
| ------------------------------- | ------------------------ | ------------------------------------------- | ------ |
| `cima_furosemida___triamtereno` | Furosemida + Triamtereno | Furosemida y agentes ahorradores de potasio | CIMA   |

### Futibatinib — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_futibatinib` | Futibatinib | Futibatinib | CIMA   |

### Otros psicoestimulantes y nootropicos — 1 entradas

| ID                                                       | Nombre                                            | Familia                               | Origen |
| -------------------------------------------------------- | ------------------------------------------------- | ------------------------------------- | ------ |
| `cima_gaba___glutamato_de_magnesio___gabob___piridoxina` | Gaba + Glutamato De Magnesio + Gabob + Piridoxina | Otros psicoestimulantes y nootropicos | CIMA   |

### Gadopiclenol — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_gadopiclenol` | Gadopiclenol | Gadopiclenol | CIMA   |

### Acido gadoxetico — 1 entradas

| ID                        | Nombre             | Familia          | Origen |
| ------------------------- | ------------------ | ---------------- | ------ |
| `cima_gadoxetato_disodio` | Gadoxetato Disodio | Acido gadoxetico | CIMA   |

### Galio (67Ga), citrato de — 1 entradas

| ID                   | Nombre               | Familia                  | Origen |
| -------------------- | -------------------- | ------------------------ | ------ |
| `cima_galio_citrato` | Galio Citrato (67Ga) | Galio (67Ga), citrato de | CIMA   |

### Enzimas — 1 entradas

| ID                | Nombre     | Familia | Origen |
| ----------------- | ---------- | ------- | ------ |
| `cima_galsulfasa` | Galsulfasa | Enzimas | CIMA   |

### gefapixant — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_gefapixant` | Gefapixant | gefapixant | CIMA   |

### Gefitinib — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_gefitinib` | Gefitinib | Gefitinib | CIMA   |

### Gemtuzumab ozogamicina — 1 entradas

| ID                            | Nombre                 | Familia                | Origen |
| ----------------------------- | ---------------------- | ---------------------- | ------ |
| `cima_gemtuzumab_ozogamicina` | Gemtuzumab Ozogamicina | Gemtuzumab ozogamicina | CIMA   |

### OTROS PRODUCTOS RADIOFARMACEUTICOS PARA DIAGNOSTICO — 1 entradas

| ID              | Nombre                  | Familia                                             | Origen |
| --------------- | ----------------------- | --------------------------------------------------- | ------ |
| `cima_germanio` | Germanio (68Ge) Cloruro | OTROS PRODUCTOS RADIOFARMACEUTICOS PARA DIAGNOSTICO | CIMA   |

### Gilteritinib — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_gilteritinib` | Gilteritinib | Gilteritinib | CIMA   |

### Ginkgo folium — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_ginkgo_biloba` | Ginkgo Biloba | Ginkgo folium | CIMA   |

### Givinostat — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_givinostat` | Givinostat | Givinostat | CIMA   |

### Givosiran — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_givosiran` | Givosiran | Givosiran | CIMA   |

### Glicerofosfato de sodio — 1 entradas

| ID                          | Nombre               | Familia                 | Origen |
| --------------------------- | -------------------- | ----------------------- | ------ |
| `cima_glicerofosfato_sodio` | Glicerofosfato Sodio | Glicerofosfato de sodio | CIMA   |

### Glicerol — 1 entradas

| ID              | Nombre   | Familia  | Origen |
| --------------- | -------- | -------- | ------ |
| `cima_glicerol` | Glicerol | Glicerol | CIMA   |

### Glimepirida y pioglitazona — 1 entradas

| ID                                | Nombre                     | Familia                    | Origen |
| --------------------------------- | -------------------------- | -------------------------- | ------ |
| `cima_glimepirida___pioglitazona` | Glimepirida + Pioglitazona | Glimepirida y pioglitazona | CIMA   |

### Glipizida — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_glipizida` | Glipizida | Glipizida | CIMA   |

### Glofitamab — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_glofitamab` | Glofitamab | Glofitamab | CIMA   |

### Carbohidratos — 1 entradas

| ID             | Nombre  | Familia       | Origen |
| -------------- | ------- | ------------- | ------ |
| `cima_glucosa` | Glucosa | Carbohidratos | CIMA   |

### Sales para rehidratacion oral — 1 entradas

| ID                                                               | Nombre                                                    | Familia                       | Origen |
| ---------------------------------------------------------------- | --------------------------------------------------------- | ----------------------------- | ------ |
| `cima_glucosa___potasio_cloruro___sodio_cloruro___sodio_citrato` | Glucosa + Potasio Cloruro + Sodio Cloruro + Sodio Citrato | Sales para rehidratacion oral | CIMA   |

### Gonadotrofina corionica — 1 entradas

| ID                             | Nombre                  | Familia                 | Origen |
| ------------------------------ | ----------------------- | ----------------------- | ------ |
| `cima_gonadotropina_corionica` | Gonadotropina Coriónica | Gonadotrofina corionica | CIMA   |

### Galio (68Ga) gozetotida — 1 entradas

| ID                | Nombre     | Familia                 | Origen |
| ----------------- | ---------- | ----------------------- | ------ |
| `cima_gozetotida` | Gozetotida | Galio (68Ga) gozetotida | CIMA   |

### Combinaciones de diferentes antibioticos — 1 entradas

| ID                                            | Nombre                                 | Familia                                  | Origen |
| --------------------------------------------- | -------------------------------------- | ---------------------------------------- | ------ |
| `cima_gramicidina___neomicina___polimixina_b` | Gramicidina + Neomicina + Polimixina B | Combinaciones de diferentes antibioticos | CIMA   |

### Otros farmacos para desordenes del sistema musculoesqueletico — 1 entradas

| ID                              | Nombre                   | Familia                                                       | Origen |
| ------------------------------- | ------------------------ | ------------------------------------------------------------- | ------ |
| `cima_harpagophytum_procumbens` | Harpagophytum Procumbens | Otros farmacos para desordenes del sistema musculoesqueletico | CIMA   |

### Hederae helicis folium — 1 entradas

| ID                  | Nombre       | Familia                | Origen |
| ------------------- | ------------ | ---------------------- | ------ |
| `cima_hedera_helix` | Hedera Helix | Hederae helicis folium | CIMA   |

### Hematina — 1 entradas

| ID            | Nombre | Familia  | Origen |
| ------------- | ------ | -------- | ------ |
| `cima_hemina` | Hemina | Hematina | CIMA   |

### Heparina — 1 entradas

| ID              | Nombre   | Familia  | Origen |
| --------------- | -------- | -------- | ------ |
| `cima_heparina` | Heparina | Heparina | CIMA   |

### Hexafluoruro de azufre — 1 entradas

| ID                            | Nombre                 | Familia                | Origen |
| ----------------------------- | ---------------------- | ---------------------- | ------ |
| `cima_hexafluoruro_de_azufre` | Hexafluoruro De Azufre | Hexafluoruro de azufre | CIMA   |

### Hexaminolevulinato — 1 entradas

| ID                        | Nombre             | Familia            | Origen |
| ------------------------- | ------------------ | ------------------ | ------ |
| `cima_hexaminolevulinato` | Hexaminolevulinato | Hexaminolevulinato | CIMA   |

### Miconazol, combinaciones con — 1 entradas

| ID                              | Nombre                   | Familia                      | Origen |
| ------------------------------- | ------------------------ | ---------------------------- | ------ |
| `cima_hidrocortisona_miconazol` | Hidrocortisona+Miconazol | Miconazol, combinaciones con | CIMA   |

### Hidroquinidina — 1 entradas

| ID                    | Nombre         | Familia        | Origen |
| --------------------- | -------------- | -------------- | ------ |
| `cima_hidroquinidina` | Hidroquinidina | Hidroquinidina | CIMA   |

### Hidrosmina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_hidrosmina` | Hidrosmina | Hidrosmina | CIMA   |

### Fumarato ferroso y acido folico — 1 entradas

| ID                                    | Nombre                         | Familia                         | Origen |
| ------------------------------------- | ------------------------------ | ------------------------------- | ------ |
| `cima_hierro_fumarato___acido_folico` | Hierro Fumarato + Ácido Fólico | Fumarato ferroso y acido folico | CIMA   |

### Ferroso gluconato — 1 entradas

| ID                      | Nombre           | Familia           | Origen |
| ----------------------- | ---------------- | ----------------- | ------ |
| `cima_hierro_gluconato` | Hierro Gluconato | Ferroso gluconato | CIMA   |

### Proteinsuccinilato ferrico — 1 entradas

| ID                               | Nombre                    | Familia                    | Origen |
| -------------------------------- | ------------------------- | -------------------------- | ------ |
| `cima_hierro_proteinsuccinilato` | Hierro Proteinsuccinilato | Proteinsuccinilato ferrico | CIMA   |

### Ferroso sulfato — 1 entradas

| ID                    | Nombre         | Familia         | Origen |
| --------------------- | -------------- | --------------- | ------ |
| `cima_hierro_sulfato` | Hierro Sulfato | Ferroso sulfato | CIMA   |

### Otros antidepresivos — 1 entradas

| ID                          | Nombre               | Familia              | Origen |
| --------------------------- | -------------------- | -------------------- | ------ |
| `cima_hypericum_perforatum` | Hypericum Perforatum | Otros antidepresivos | CIMA   |

### Ibritumomab tiuxetan (90y) — 1 entradas

| ID                 | Nombre      | Familia                    | Origen |
| ------------------ | ----------- | -------------------------- | ------ |
| `cima_ibritumomab` | Ibritumomab | Ibritumomab tiuxetan (90y) | CIMA   |

### Codeina e ibuprofeno — 1 entradas

| ID                          | Nombre               | Familia              | Origen |
| --------------------------- | -------------------- | -------------------- | ------ |
| `cima_ibuprofeno___codeina` | Ibuprofeno + Codeína | Codeina e ibuprofeno | CIMA   |

### Icatibanto — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_icatibanto` | Icatibanto | Icatibanto | CIMA   |

### Trigliceridos omega-3, incluidos otros esteres y acidos — 1 entradas

| ID                | Nombre     | Familia                                                 | Origen |
| ----------------- | ---------- | ------------------------------------------------------- | ------ |
| `cima_icosapento` | Icosapento | Trigliceridos omega-3, incluidos otros esteres y acidos | CIMA   |

### Idarubicina — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_idarubicina` | Idarubicina | Idarubicina | CIMA   |

### Idecabtagen vicleucel — 1 entradas

| ID                           | Nombre                | Familia               | Origen |
| ---------------------------- | --------------------- | --------------------- | ------ |
| `cima_idecabtagen_vicleucel` | Idecabtagén Vicleucel | Idecabtagen vicleucel | CIMA   |

### Idelalisib — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_idelalisib` | Idelalisib | Idelalisib | CIMA   |

### Idursulfasa — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_idursulfasa` | Idursulfasa | Idursulfasa | CIMA   |

### Ifosfamida — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_ifosfamida` | Ifosfamida | Ifosfamida | CIMA   |

### Imidapril — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_imidapril` | Imidapril | Imidapril | CIMA   |

### Imiglucerasa — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_imiglucerasa` | Imiglucerasa | Imiglucerasa | CIMA   |

### Imlifidasa — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_imlifidasa` | Imlifidasa | Imlifidasa | CIMA   |

### Indacaterol, glicopirronio, bromuro de y mometasona — 1 entradas

| ID                                              | Nombre                                   | Familia                                             | Origen |
| ----------------------------------------------- | ---------------------------------------- | --------------------------------------------------- | ------ |
| `cima_indacaterol___glicopirronio___mometasona` | Indacaterol + Glicopirronio + Mometasona | Indacaterol, glicopirronio, bromuro de y mometasona | CIMA   |

### Indacaterol y mometasona — 1 entradas

| ID                              | Nombre                   | Familia                  | Origen |
| ------------------------------- | ------------------------ | ------------------------ | ------ |
| `cima_indacaterol___mometasona` | Indacaterol + Mometasona | Indacaterol y mometasona | CIMA   |

### Compuestos con Indio (111In) — 1 entradas

| ID                         | Nombre                | Familia                      | Origen |
| -------------------------- | --------------------- | ---------------------------- | ------ |
| `cima_indio_cloruro_111in` | Indio Cloruro (111In) | Compuestos con Indio (111In) | CIMA   |

### Indio (111In) pentetreotida — 1 entradas

| ID                                         | Nombre                                | Familia                     | Origen |
| ------------------------------------------ | ------------------------------------- | --------------------------- | ------ |
| `cima_indio_cloruro_111in___pentetreotida` | Indio Cloruro (111In) + Pentetreotida | Indio (111In) pentetreotida | CIMA   |

### Indio (111In), oxinato de, celulas marcadas con — 1 entradas

| ID                       | Nombre              | Familia                                         | Origen |
| ------------------------ | ------------------- | ----------------------------------------------- | ------ |
| `cima_indio_oxina_111in` | Indio Oxina (111In) | Indio (111In), oxinato de, celulas marcadas con | CIMA   |

### Indio (111In), pentetato de — 1 entradas

| ID                           | Nombre                  | Familia                     | Origen |
| ---------------------------- | ----------------------- | --------------------------- | ------ |
| `cima_indio_pentetato_111in` | Indio Pentetato (111In) | Indio (111In), pentetato de | CIMA   |

### Inebilizumab — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_inebilizumab` | Inebilizumab | Inebilizumab | CIMA   |

### Inhibidor de C1, derivado del plasma — 1 entradas

| ID                           | Nombre                | Familia                              | Origen |
| ---------------------------- | --------------------- | ------------------------------------ | ------ |
| `cima_inhibidor_c1_esterasa` | Inhibidor C1 Esterasa | Inhibidor de C1, derivado del plasma | CIMA   |

### Inmunoglobulina antihepatitis B — 1 entradas

| ID                                             | Nombre                                  | Familia                         | Origen |
| ---------------------------------------------- | --------------------------------------- | ------------------------------- | ------ |
| `cima_inmunoglobulina_anti_hepatitis_b_humana` | Inmunoglobulina Anti Hepatitis B Humana | Inmunoglobulina antihepatitis B | CIMA   |

### Inmunoglobulina anticitomegalovirus — 1 entradas

| ID                                         | Nombre                               | Familia                             | Origen |
| ------------------------------------------ | ------------------------------------ | ----------------------------------- | ------ |
| `cima_inmunoglobulina_anticitomegalovirus` | Inmunoglobulina Anti-Citomegalovirus | Inmunoglobulina anticitomegalovirus | CIMA   |

### Inmunoglobulina antirrabica — 1 entradas

| ID                                        | Nombre                             | Familia                     | Origen |
| ----------------------------------------- | ---------------------------------- | --------------------------- | ------ |
| `cima_inmunoglobulina_antirrabica_humana` | Inmunoglobulina Antirrábica Humana | Inmunoglobulina antirrabica | CIMA   |

### Inmunoglobulina antitetanica — 1 entradas

| ID                                         | Nombre                              | Familia                      | Origen |
| ------------------------------------------ | ----------------------------------- | ---------------------------- | ------ |
| `cima_inmunoglobulina_antitetanica_humana` | Inmunoglobulina Antitetánica Humana | Inmunoglobulina antitetanica | CIMA   |

### Inmunoglobulina antitimocitica (conejo) — 1 entradas

| ID                                              | Nombre                                   | Familia                                 | Origen |
| ----------------------------------------------- | ---------------------------------------- | --------------------------------------- | ------ |
| `cima_inmunoglobulina_antitimocitica_de_conejo` | Inmunoglobulina Antitimocítica De Conejo | Inmunoglobulina antitimocitica (conejo) | CIMA   |

### Inotersen — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_inotersen` | Inotersen | Inotersen | CIMA   |

### Inotuzumab ozogamicina — 1 entradas

| ID                            | Nombre                 | Familia                | Origen |
| ----------------------------- | ---------------------- | ---------------------- | ------ |
| `cima_inotuzumab_ozogamicina` | Inotuzumab Ozogamicina | Inotuzumab ozogamicina | CIMA   |

### Insulina asparta — 1 entradas

| ID                               | Nombre                    | Familia          | Origen |
| -------------------------------- | ------------------------- | ---------------- | ------ |
| `cima_insulina_asparta_bifasica` | Insulina Asparta Bifásica | Insulina asparta | CIMA   |

### Insulina (humana) — 1 entradas

| ID                               | Nombre                    | Familia           | Origen |
| -------------------------------- | ------------------------- | ----------------- | ------ |
| `cima_insulina_isofana_bifasica` | Insulina Isófana Bifásica | Insulina (humana) | CIMA   |

### Interferon beta-1a — 1 entradas

| ID                       | Nombre             | Familia            | Origen |
| ------------------------ | ------------------ | ------------------ | ------ |
| `cima_interferon_beta1a` | Interferon Beta-1A | Interferon beta-1a | CIMA   |

### Interferon beta-1b — 1 entradas

| ID                       | Nombre             | Familia            | Origen |
| ------------------------ | ------------------ | ------------------ | ------ |
| `cima_interferon_beta1b` | Interferon Beta-1B | Interferon beta-1b | CIMA   |

### Interferon gamma — 1 entradas

| ID                        | Nombre              | Familia          | Origen |
| ------------------------- | ------------------- | ---------------- | ------ |
| `cima_interferon_gamma1b` | Interferon Gamma-1B | Interferon gamma | CIMA   |

### Iobenguano (123I) — 1 entradas

| ID                     | Nombre            | Familia           | Origen |
| ---------------------- | ----------------- | ----------------- | ------ |
| `cima_iobenguano_123i` | Iobenguano [123I] | Iobenguano (123I) | CIMA   |

### Iobitridol — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_iobitridol` | Iobitridol | Iobitridol | CIMA   |

### Iodixanol — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_iodixanol` | Iodixanol | Iodixanol | CIMA   |

### Yodo — 1 entradas

| ID          | Nombre | Familia | Origen |
| ----------- | ------ | ------- | ------ |
| `cima_iodo` | Iodo   | Yodo    | CIMA   |

### Iodo (131I) norcolesterol — 1 entradas

| ID                                 | Nombre                        | Familia                   | Origen |
| ---------------------------------- | ----------------------------- | ------------------------- | ------ |
| `cima_iodometilnorcolesterol_131i` | Iodometilnorcolesterol (131I) | Iodo (131I) norcolesterol | CIMA   |

### Iodo (123I) ioflupano — 1 entradas

| ID                    | Nombre           | Familia               | Origen |
| --------------------- | ---------------- | --------------------- | ------ |
| `cima_ioflupano_123i` | Ioflupano (123I) | Iodo (123I) ioflupano | CIMA   |

### Iomeprol — 1 entradas

| ID              | Nombre   | Familia  | Origen |
| --------------- | -------- | -------- | ------ |
| `cima_iomeprol` | Iomeprol | Iomeprol | CIMA   |

### Iopamidol — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_iopamidol` | Iopamidol | Iopamidol | CIMA   |

### Iopromida — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_iopromida` | Iopromida | Iopromida | CIMA   |

### Ioversol — 1 entradas

| ID              | Nombre   | Familia  | Origen |
| --------------- | -------- | -------- | ------ |
| `cima_ioversol` | Ioversol | Ioversol | CIMA   |

### Irbesartan y amlodipino — 1 entradas

| ID                             | Nombre                  | Familia                 | Origen |
| ------------------------------ | ----------------------- | ----------------------- | ------ |
| `cima_irbesartan___amlodipino` | Irbesartán + Amlodipino | Irbesartan y amlodipino | CIMA   |

### Irbesartan y diureticos — 1 entradas

| ID                                    | Nombre                         | Familia                 | Origen |
| ------------------------------------- | ------------------------------ | ----------------------- | ------ |
| `cima_irbesartan___hidroclorotiazida` | Irbesartán + Hidroclorotiazida | Irbesartan y diureticos | CIMA   |

### Isatuximab — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_isatuximab` | Isatuximab | Isatuximab | CIMA   |

### Isoniazida, combinaciones con — 1 entradas

| ID                             | Nombre                  | Familia                       | Origen |
| ------------------------------ | ----------------------- | ----------------------------- | ------ |
| `cima_isoniazida___piridoxina` | Isoniazida + Piridoxina | Isoniazida, combinaciones con | CIMA   |

### Ivosidenib — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_ivosidenib` | Ivosidenib | Ivosidenib | CIMA   |

### Ketazolam — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_ketazolam` | Ketazolam | Ketazolam | CIMA   |

### Zidovudina y lamivudina — 1 entradas

| ID                             | Nombre                  | Familia                 | Origen |
| ------------------------------ | ----------------------- | ----------------------- | ------ |
| `cima_lamivudina___zidovudina` | Lamivudina + Zidovudina | Zidovudina y lamivudina | CIMA   |

### Lanadelumab — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_lanadelumab` | Lanadelumab | Lanadelumab | CIMA   |

### Landiolol — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_landiolol` | Landiolol | Landiolol | CIMA   |

### Lapatinib — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_lapatinib` | Lapatinib | Lapatinib | CIMA   |

### Laronidase — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_laronidasa` | Laronidasa | Laronidase | CIMA   |

### Larotrectinib — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_larotrectinib` | Larotrectinib | Larotrectinib | CIMA   |

### Latanoprost y netarsudil — 1 entradas

| ID                              | Nombre                   | Familia                  | Origen |
| ------------------------------- | ------------------------ | ------------------------ | ------ |
| `cima_latanoprost___netarsudil` | Latanoprost + Netarsudil | Latanoprost y netarsudil | CIMA   |

### Sodio lauril sulfoacetato, incluyendo combinaciones — 1 entradas

| ID                                         | Nombre                              | Familia                                             | Origen |
| ------------------------------------------ | ----------------------------------- | --------------------------------------------------- | ------ |
| `cima_laurilsulfato_sodio___sodio_citrato` | Laurilsulfato Sodio + Sodio Citrato | Sodio lauril sulfoacetato, incluyendo combinaciones | CIMA   |

### Polidocanol — 1 entradas

| ID                       | Nombre            | Familia     | Origen |
| ------------------------ | ----------------- | ----------- | ------ |
| `cima_lauromacrogol_400` | Lauromacrogol 400 | Polidocanol | CIMA   |

### Lazertinib — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_lazertinib` | Lazertinib | Lazertinib | CIMA   |

### Levocabastina — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_levocabastina` | Levocabastina | Levocabastina | CIMA   |

### Levodopa — 1 entradas

| ID              | Nombre   | Familia  | Origen |
| --------------- | -------- | -------- | ------ |
| `cima_levodopa` | Levodopa | Levodopa | CIMA   |

### Levodopa con inhibidor de la descarboxilasa e inhibidor de la COMT — 1 entradas

| ID                                       | Nombre                            | Familia                                                            | Origen |
| ---------------------------------------- | --------------------------------- | ------------------------------------------------------------------ | ------ |
| `cima_levodopa___carbidopa___entacapona` | Levodopa + Carbidopa + Entacapona | Levodopa con inhibidor de la descarboxilasa e inhibidor de la COMT | CIMA   |

### Levofolinato de calcio — 1 entradas

| ID                         | Nombre              | Familia                | Origen |
| -------------------------- | ------------------- | ---------------------- | ------ |
| `cima_levofolinato_calcio` | Levofolinato Calcio | Levofolinato de calcio | CIMA   |

### Levometadona — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_levometadona` | Levometadona | Levometadona | CIMA   |

### Levonorgestrel y estrogeno — 1 entradas

| ID                                      | Nombre                           | Familia                    | Origen |
| --------------------------------------- | -------------------------------- | -------------------------- | ------ |
| `cima_levonorgestrel___etinilestradiol` | Levonorgestrel + Etinilestradiol | Levonorgestrel y estrogeno | CIMA   |

### Levosimendan — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_levosimendan` | Levosimendan | Levosimendan | CIMA   |

### Levosulpirida — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_levosulpirida` | Levosulpirida | Levosulpirida | CIMA   |

### Lidocaina — 1 entradas

| ID                                             | Nombre                                  | Familia   | Origen |
| ---------------------------------------------- | --------------------------------------- | --------- | ------ |
| `cima_lidocaina___dioxido_titanio___rodoficea` | Lidocaína + Dióxido Titanio + Rodoficea | Lidocaina | CIMA   |

### Linagliptina y empagliflozina — 1 entradas

| ID                                   | Nombre                        | Familia                       | Origen |
| ------------------------------------ | ----------------------------- | ----------------------------- | ------ |
| `cima_linagliptina___empagliflozina` | Linagliptina + Empagliflozina | Linagliptina y empagliflozina | CIMA   |

### Metformina y linagliptina — 1 entradas

| ID                               | Nombre                    | Familia                   | Origen |
| -------------------------------- | ------------------------- | ------------------------- | ------ |
| `cima_linagliptina___metformina` | Linagliptina + Metformina | Metformina y linagliptina | CIMA   |

### Lincomicina — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_lincomicina` | Lincomicina | Lincomicina | CIMA   |

### Linzagolix — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_linzagolix` | Linzagolix | Linzagolix | CIMA   |

### Lipegfilgrastim — 1 entradas

| ID                     | Nombre          | Familia         | Origen |
| ---------------------- | --------------- | --------------- | ------ |
| `cima_lipegfilgrastim` | Lipegfilgrastim | Lipegfilgrastim | CIMA   |

### Lisinopril y diureticos — 1 entradas

| ID                                    | Nombre                         | Familia                 | Origen |
| ------------------------------------- | ------------------------------ | ----------------------- | ------ |
| `cima_lisinopril___hidroclorotiazida` | Lisinopril + Hidroclorotiazida | Lisinopril y diureticos | CIMA   |

### Lisocabtagen maraleucel — 1 entradas

| ID                             | Nombre                  | Familia                 | Origen |
| ------------------------------ | ----------------------- | ----------------------- | ------ |
| `cima_lisocabtagen_maraleucel` | Lisocabtagén Maraleucel | Lisocabtagen maraleucel | CIMA   |

### Lomitapida — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_lomitapida` | Lomitapida | Lomitapida | CIMA   |

### Loperamida, combinaciones con — 1 entradas

| ID                             | Nombre                  | Familia                       | Origen |
| ------------------------------ | ----------------------- | ----------------------------- | ------ |
| `cima_loperamida___simeticona` | Loperamida + Simeticona | Loperamida, combinaciones con | CIMA   |

### Loprazolam — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_loprazolam` | Loprazolam | Loprazolam | CIMA   |

### Lovastatina — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_lovastatina` | Lovastatina | Lovastatina | CIMA   |

### LUMASIRAN — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_lumasiran` | Lumasirán | LUMASIRAN | CIMA   |

### Lutecio (177Lu) oxodotreotida — 1 entradas

| ID                                 | Nombre                        | Familia                       | Origen |
| ---------------------------------- | ----------------------------- | ----------------------------- | ------ |
| `cima_lutecio_177lu_oxodotreotida` | Lutecio (177Lu) Oxodotreotida | Lutecio (177Lu) oxodotreotida | CIMA   |

### Lutecio (177Lu) vipivotida tetraxetan — 1 entradas

| ID                                         | Nombre                                | Familia                               | Origen |
| ------------------------------------------ | ------------------------------------- | ------------------------------------- | ------ |
| `cima_lutecio_177lu_vipivotida_tetraxetan` | Lutecio (177Lu) Vipivotida Tetraxetán | Lutecio (177Lu) vipivotida tetraxetan | CIMA   |

### Macimorelina — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_macimorelina` | Macimorelina | Macimorelina | CIMA   |

### Macitentan y tadalafilo — 1 entradas

| ID                             | Nombre                  | Familia                 | Origen |
| ------------------------------ | ----------------------- | ----------------------- | ------ |
| `cima_macitentan___tadalafilo` | Macitentán + Tadalafilo | Macitentan y tadalafilo | CIMA   |

### Magnesio (combinacion de diferentes sales) — 1 entradas

| ID              | Nombre   | Familia                                    | Origen |
| --------------- | -------- | ------------------------------------------ | ------ |
| `cima_magnesio` | Magnesio | Magnesio (combinacion de diferentes sales) | CIMA   |

### Hidroxido de magnesio — 1 entradas

| ID                        | Nombre             | Familia               | Origen |
| ------------------------- | ------------------ | --------------------- | ------ |
| `cima_magnesio_hidroxido` | Magnesio Hidróxido | Hidroxido de magnesio | CIMA   |

### Lactato de magnesio — 1 entradas

| ID                      | Nombre           | Familia             | Origen |
| ----------------------- | ---------------- | ------------------- | ------ |
| `cima_magnesio_lactato` | Magnesio Lactato | Lactato de magnesio | CIMA   |

### Pidolato de magnesio — 1 entradas

| ID                       | Nombre            | Familia              | Origen |
| ------------------------ | ----------------- | -------------------- | ------ |
| `cima_magnesio_pidolato` | Magnesio Pidolato | Pidolato de magnesio | CIMA   |

### Sulfato de magnesio — 1 entradas

| ID                      | Nombre           | Familia             | Origen |
| ----------------------- | ---------------- | ------------------- | ------ |
| `cima_magnesio_sulfato` | Magnesio Sulfato | Sulfato de magnesio | CIMA   |

### Productos varios para el tracto alimentario y el metabolismo — 1 entradas

| ID                                                                          | Nombre                                                               | Familia                                                      | Origen |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------ | ------ |
| `cima_magnesio_sulfato___sodio_bicarbonato___sodio_fosfato___sodio_sulfato` | Magnesio Sulfato + Sodio Bicarbonato + Sodio Fosfato + Sodio Sulfato | Productos varios para el tracto alimentario y el metabolismo | CIMA   |

### cloruro de maralixibat — 1 entradas

| ID                 | Nombre      | Familia                | Origen |
| ------------------ | ----------- | ---------------------- | ------ |
| `cima_maralixibat` | Maralixibat | cloruro de maralixibat | CIMA   |

### Marstacimab — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_marstacimab` | Marstacimab | Marstacimab | CIMA   |

### Meclozina — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_meclozina` | Meclozina | Meclozina | CIMA   |

### Medroxiprogesterona y estrogeno — 1 entradas

| ID                                     | Nombre                          | Familia                         | Origen |
| -------------------------------------- | ------------------------------- | ------------------------------- | ------ |
| `cima_medroxiprogesterona___estradiol` | Medroxiprogesterona + Estradiol | Medroxiprogesterona y estrogeno | CIMA   |

### Melatonina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_melatonina` | Melatonina | Melatonina | CIMA   |

### Melfalan — 1 entradas

| ID              | Nombre   | Familia  | Origen |
| --------------- | -------- | -------- | ------ |
| `cima_melfalan` | Melfalán | Melfalan | CIMA   |

### Melfalan flufenamida — 1 entradas

| ID                          | Nombre               | Familia              | Origen |
| --------------------------- | -------------------- | -------------------- | ------ |
| `cima_melfalan_flufenamida` | Melfalán Flufenamida | Melfalan flufenamida | CIMA   |

### Hipnoticos y sedantes en combinacion, excluyendo barbituricos — 1 entradas

| ID                                                 | Nombre                                      | Familia                                                       | Origen |
| -------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------- | ------ |
| `cima_melissa_officinalis___valeriana_officinalis` | Melissa Officinalis + Valeriana Officinalis | Hipnoticos y sedantes en combinacion, excluyendo barbituricos | CIMA   |

### Melitraceno y psicolepticos — 1 entradas

| ID                               | Nombre                    | Familia                     | Origen |
| -------------------------------- | ------------------------- | --------------------------- | ------ |
| `cima_melitraceno___flupentixol` | Melitraceno + Flupentixol | Melitraceno y psicolepticos | CIMA   |

### Menta piperita, aceite esencial de — 1 entradas

| ID                     | Nombre          | Familia                            | Origen |
| ---------------------- | --------------- | ---------------------------------- | ------ |
| `cima_mentha_piperita` | Mentha Piperita | Menta piperita, aceite esencial de | CIMA   |

### Mepiramina teofilinacetato — 1 entradas

| ID                | Nombre     | Familia                    | Origen |
| ----------------- | ---------- | -------------------------- | ------ |
| `cima_mepiramina` | Mepiramina | Mepiramina teofilinacetato | CIMA   |

### Mepivacaina, combinaciones con — 1 entradas

| ID                              | Nombre                   | Familia                        | Origen |
| ------------------------------- | ------------------------ | ------------------------------ | ------ |
| `cima_mepivacaina___epinefrina` | Mepivacaína + Epinefrina | Mepivacaina, combinaciones con | CIMA   |

### Merbromina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_merbromina` | Merbromina | Merbromina | CIMA   |

### Mercaptamina — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_mercaptamina` | Mercaptamina | Mercaptamina | CIMA   |

### Mesalazina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_mesalazina` | Mesalazina | Mesalazina | CIMA   |

### Mesterolona — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_mesterolona` | Mesterolona | Mesterolona | CIMA   |

### Metacolina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_metacolina` | Metacolina | Metacolina | CIMA   |

### Metamizol sodico — 1 entradas

| ID               | Nombre    | Familia          | Origen |
| ---------------- | --------- | ---------------- | ------ |
| `cima_metamizol` | Metamizol | Metamizol sodico | CIMA   |

### Metenolona — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_metenolona` | Metenolona | Metenolona | CIMA   |

### Metformina y alogliptina — 1 entradas

| ID                              | Nombre                   | Familia                  | Origen |
| ------------------------------- | ------------------------ | ------------------------ | ------ |
| `cima_metformina___alogliptina` | Metformina + Alogliptina | Metformina y alogliptina | CIMA   |

### Metformina y canagliflozina — 1 entradas

| ID                                 | Nombre                      | Familia                     | Origen |
| ---------------------------------- | --------------------------- | --------------------------- | ------ |
| `cima_metformina___canagliflozina` | Metformina + Canagliflozina | Metformina y canagliflozina | CIMA   |

### Metoprolol y felodipino — 1 entradas

| ID                             | Nombre                  | Familia                 | Origen |
| ------------------------------ | ----------------------- | ----------------------- | ------ |
| `cima_metoprolol___felodipino` | Metoprolol + Felodipino | Metoprolol y felodipino | CIMA   |

### Mianserina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_mianserina` | Mianserina | Mianserina | CIMA   |

### Midostaurina — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_midostaurina` | Midostaurina | Midostaurina | CIMA   |

### Mifamurtida — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_mifamurtida` | Mifamurtida | Mifamurtida | CIMA   |

### Miglustat — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_miglustat` | Miglustat | Miglustat | CIMA   |

### Mitomicina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_mitomicina` | Mitomicina | Mitomicina | CIMA   |

### Mogamulizumab — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_mogamulizumab` | Mogamulizumab | Mogamulizumab | CIMA   |

### Tecnecio (99mTc), pertecnetato de — 1 entradas

| ID                                                           | Nombre                                                    | Familia                           | Origen |
| ------------------------------------------------------------ | --------------------------------------------------------- | --------------------------------- | ------ |
| `cima_molibdato_99mo_de_sodio___pertecnetato_99mtc_de_sodio` | Molibdato (99Mo) De Sodio + Pertecnetato (99Mtc) De Sodio | Tecnecio (99mTc), pertecnetato de | CIMA   |

### Momelotinib — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_momelotinib` | Momelotinib | Momelotinib | CIMA   |

### Mometasona — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_mometasona` | Mometasona | Mometasona | CIMA   |

### Mometasona, combinaciones con — 1 entradas

| ID                              | Nombre                   | Familia                       | Origen |
| ------------------------------- | ------------------------ | ----------------------------- | ------ |
| `cima_mometasona___olopatadina` | Mometasona + Olopatadina | Mometasona, combinaciones con | CIMA   |

### Mononitrato de isosorbida — 1 entradas

| ID                               | Nombre                    | Familia                   | Origen |
| -------------------------------- | ------------------------- | ------------------------- | ------ |
| `cima_mononitrato_de_isosorbida` | Mononitrato De Isosorbida | Mononitrato de isosorbida | CIMA   |

### Mosunetuzumab — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_mosunetuzumab` | Mosunetuzumab | Mosunetuzumab | CIMA   |

### Moxonidina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_moxonidina` | Moxonidina | Moxonidina | CIMA   |

### Vitaminas del complejo B con vitamina C — 1 entradas

| ID                     | Nombre          | Familia                                 | Origen |
| ---------------------- | --------------- | --------------------------------------- | ------ |
| `cima_multicomponente` | Multicomponente | Vitaminas del complejo B con vitamina C | CIMA   |

### Nabumetona — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_nabumetona` | Nabumetona | Nabumetona | CIMA   |

### Nadifloxacino — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_nadifloxacino` | Nadifloxacino | Nadifloxacino | CIMA   |

### Nafazolina — 1 entradas

| ID                                | Nombre                     | Familia    | Origen |
| --------------------------------- | -------------------------- | ---------- | ------ |
| `cima_nafazolina___metiltioninio` | Nafazolina + Metiltioninio | Nafazolina | CIMA   |

### Nalmefeno — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_nalmefeno` | Nalmefeno | Nalmefeno | CIMA   |

### Naloxegol — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_naloxegol` | Naloxegol | Naloxegol | CIMA   |

### Naproxeno — 1 entradas

| ID                      | Nombre           | Familia   | Origen |
| ----------------------- | ---------------- | --------- | ------ |
| `cima_naproxeno_sodico` | Naproxeno Sodico | Naproxeno | CIMA   |

### Nedocromil — 1 entradas

| ID                 | Nombre      | Familia    | Origen |
| ------------------ | ----------- | ---------- | ------ |
| `cima_nedocromilo` | Nedocromilo | Nedocromil | CIMA   |

### Nelarabina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_nelarabina` | Nelarabina | Nelarabina | CIMA   |

### Nepafenaco — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_nepafenaco` | Nepafenaco | Nepafenaco | CIMA   |

### Neratinib — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_neratinib` | Neratinib | Neratinib | CIMA   |

### Nicotina — 1 entradas

| ID              | Nombre   | Familia  | Origen |
| --------------- | -------- | -------- | ------ |
| `cima_nicotina` | Nicotina | Nicotina | CIMA   |

### Niraparib y abiraterona — 1 entradas

| ID                             | Nombre                  | Familia                 | Origen |
| ------------------------------ | ----------------------- | ----------------------- | ------ |
| `cima_niraparib___abiraterona` | Niraparib + Abiraterona | Niraparib y abiraterona | CIMA   |

### Nitisinona — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_nitisinona` | Nitisinona | Nitisinona | CIMA   |

### Trinitrato de glicerilo, combinaciones con — 1 entradas

| ID                              | Nombre                   | Familia                                    | Origen |
| ------------------------------- | ------------------------ | ------------------------------------------ | ------ |
| `cima_nitroglicerina___cafeina` | Nitroglicerina + Cafeína | Trinitrato de glicerilo, combinaciones con | CIMA   |

### Nomegestrol y estrogeno — 1 entradas

| ID                             | Nombre                  | Familia                 | Origen |
| ------------------------------ | ----------------------- | ----------------------- | ------ |
| `cima_nomegestrol___estradiol` | Nomegestrol + Estradiol | Nomegestrol y estrogeno | CIMA   |

### Norelgestromina y estrogeno — 1 entradas

| ID                                       | Nombre                            | Familia                     | Origen |
| ---------------------------------------- | --------------------------------- | --------------------------- | ------ |
| `cima_norelgestromina___etinilestradiol` | Norelgestromina + Etinilestradiol | Norelgestromina y estrogeno | CIMA   |

### Noretisterona y estrogeno — 1 entradas

| ID                               | Nombre                    | Familia                   | Origen |
| -------------------------------- | ------------------------- | ------------------------- | ------ |
| `cima_noretisterona___estradiol` | Noretisterona + Estradiol | Noretisterona y estrogeno | CIMA   |

### Norgestimato y estrogeno — 1 entradas

| ID                                    | Nombre                         | Familia                  | Origen |
| ------------------------------------- | ------------------------------ | ------------------------ | ------ |
| `cima_norgestimato___etinilestradiol` | Norgestimato + Etinilestradiol | Norgestimato y estrogeno | CIMA   |

### Norgestrel y estrogeno — 1 entradas

| ID                            | Nombre                 | Familia                | Origen |
| ----------------------------- | ---------------------- | ---------------------- | ------ |
| `cima_norgestrel___estradiol` | Norgestrel + Estradiol | Norgestrel y estrogeno | CIMA   |

### L01FA03- Obinutuzumab — 1 entradas

| ID                  | Nombre       | Familia               | Origen |
| ------------------- | ------------ | --------------------- | ------ |
| `cima_obinutuzumab` | Obinutuzumab | L01FA03- Obinutuzumab | CIMA   |

### Olipudasa alfa — 1 entradas

| ID                    | Nombre         | Familia        | Origen |
| --------------------- | -------------- | -------------- | ------ |
| `cima_olipudasa_alfa` | Olipudasa Alfa | Olipudasa alfa | CIMA   |

### Olmesartan medoxomilo y amlodipino — 1 entradas

| ID                             | Nombre                  | Familia                            | Origen |
| ------------------------------ | ----------------------- | ---------------------------------- | ------ |
| `cima_olmesartan___amlodipino` | Olmesartán + Amlodipino | Olmesartan medoxomilo y amlodipino | CIMA   |

### Olmesartan medoxomilo, amlodipino e hidroclorotiazida — 1 entradas

| ID                                                 | Nombre                                      | Familia                                               | Origen |
| -------------------------------------------------- | ------------------------------------------- | ----------------------------------------------------- | ------ |
| `cima_olmesartan___amlodipino___hidroclorotiazida` | Olmesartán + Amlodipino + Hidroclorotiazida | Olmesartan medoxomilo, amlodipino e hidroclorotiazida | CIMA   |

### Olmesartan medoxomilo y diureticos — 1 entradas

| ID                                    | Nombre                         | Familia                            | Origen |
| ------------------------------------- | ------------------------------ | ---------------------------------- | ------ |
| `cima_olmesartan___hidroclorotiazida` | Olmesartán + Hidroclorotiazida | Olmesartan medoxomilo y diureticos | CIMA   |

### Omaveloxolona — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_omaveloxolona` | Omaveloxolona | Omaveloxolona | CIMA   |

### Ospemifeno — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_ospemifeno` | Ospemifeno | Ospemifeno | CIMA   |

### Oxibato de sodio — 1 entradas

| ID                   | Nombre        | Familia          | Origen |
| -------------------- | ------------- | ---------------- | ------ |
| `cima_oxibato_sodio` | Oxibato Sodio | Oxibato de sodio | CIMA   |

### Oxido nitrico — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_oxido_nitrico` | Oxido Nitrico | Oxido nitrico | CIMA   |

### Tecnecio (99mTc) acido oxidronico — 1 entradas

| ID                      | Nombre           | Familia                           | Origen |
| ----------------------- | ---------------- | --------------------------------- | ------ |
| `cima_oxidronato_sodio` | Oxidronato Sodio | Tecnecio (99mTc) acido oxidronico | CIMA   |

### Aire medicinal — 1 entradas

| ID                     | Nombre          | Familia        | Origen |
| ---------------------- | --------------- | -------------- | ------ |
| `cima_oxigeno_gaseoso` | Oxigeno Gaseoso | Aire medicinal | CIMA   |

### Oxihidroxido sucroferrico — 1 entradas

| ID                               | Nombre                    | Familia                   | Origen |
| -------------------------------- | ------------------------- | ------------------------- | ------ |
| `cima_oxihidroxido_sucroferrico` | Oxihidróxido Sucroférrico | Oxihidroxido sucroferrico | CIMA   |

### Oximetazolina — 1 entradas

| ID                                  | Nombre                       | Familia       | Origen |
| ----------------------------------- | ---------------------------- | ------------- | ------ |
| `cima_oximetazolina___clorfenamina` | Oximetazolina + Clorfenamina | Oximetazolina | CIMA   |

### Oxido nitroso, combinaciones con — 1 entradas

| ID                             | Nombre                  | Familia                          | Origen |
| ------------------------------ | ----------------------- | -------------------------------- | ------ |
| `cima_oxigeno___oxido_nitroso` | Oxígeno + Óxido Nitroso | Oxido nitroso, combinaciones con | CIMA   |

### Pruebas para enfermedades alergicas — 1 entradas

| ID                    | Nombre          | Familia                             | Origen |
| --------------------- | --------------- | ----------------------------------- | ------ |
| `cima_ptoluendiamina` | P-Toluendiamina | Pruebas para enfermedades alergicas | CIMA   |

### Palopegteriparatida — 1 entradas

| ID                         | Nombre              | Familia             | Origen |
| -------------------------- | ------------------- | ------------------- | ------ |
| `cima_palopegteriparatida` | Palopegteriparatida | Palopegteriparatida | CIMA   |

### Panitumumab — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_panitumumab` | Panitumumab | Panitumumab | CIMA   |

### Tiocolchicosido, combinaciones con — 1 entradas

| ID                                   | Nombre                        | Familia                            | Origen |
| ------------------------------------ | ----------------------------- | ---------------------------------- | ------ |
| `cima_paracetamol___tiocolchicosido` | Paracetamol + Tiocolchicósido | Tiocolchicosido, combinaciones con | CIMA   |

### Parafina blanda y productos con grasa — 1 entradas

| ID                                      | Nombre                             | Familia                               | Origen |
| --------------------------------------- | ---------------------------------- | ------------------------------------- | ------ |
| `cima_parafina_blanda_vaselina_filante` | Parafina Blanda (Vaselina Filante) | Parafina blanda y productos con grasa | CIMA   |

### Parafina liquida — 1 entradas

| ID                      | Nombre           | Familia          | Origen |
| ----------------------- | ---------------- | ---------------- | ------ |
| `cima_parafina_liquida` | Parafina Liquida | Parafina liquida | CIMA   |

### Parafina blanda, combinaciones con — 1 entradas

| ID                                          | Nombre                               | Familia                            | Origen |
| ------------------------------------------- | ------------------------------------ | ---------------------------------- | ------ |
| `cima_parafina_liquida___picosulfato_sodio` | Parafina Líquida + Picosulfato Sodio | Parafina blanda, combinaciones con | CIMA   |

### Patisiran — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_patisiran` | Patisirán | Patisiran | CIMA   |

### Pazopanib — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_pazopanib` | Pazopanib | Pazopanib | CIMA   |

### Pegaspargasa — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_pegaspargasa` | Pegaspargasa | Pegaspargasa | CIMA   |

### Pegcetacoplan — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_pegcetacoplan` | Pegcetacoplán | Pegcetacoplan | CIMA   |

### Peginterferon alfa-2a — 1 entradas

| ID                          | Nombre                | Familia               | Origen |
| --------------------------- | --------------------- | --------------------- | ------ |
| `cima_peginterferon_alfa2a` | Peginterferón Alfa-2A | Peginterferon alfa-2a | CIMA   |

### Peginterferon beta-1a — 1 entradas

| ID                          | Nombre                | Familia               | Origen |
| --------------------------- | --------------------- | --------------------- | ------ |
| `cima_peginterferon_beta1a` | Peginterferón Beta-1A | Peginterferon beta-1a | CIMA   |

### Pegunigalsidasa alfa — 1 entradas

| ID                          | Nombre               | Familia              | Origen |
| --------------------------- | -------------------- | -------------------- | ------ |
| `cima_pegunigalsidasa_alfa` | Pegunigalsidasa Alfa | Pegunigalsidasa alfa | CIMA   |

### Pegzilarginasa — 1 entradas

| ID                    | Nombre         | Familia        | Origen |
| --------------------- | -------------- | -------------- | ------ |
| `cima_pegzilarginasa` | Pegzilarginasa | Pegzilarginasa | CIMA   |

### PREPARADOS PARA LA TOS Y EL RESFRIADO — 1 entradas

| ID                          | Nombre               | Familia                               | Origen |
| --------------------------- | -------------------- | ------------------------------------- | ------ |
| `cima_pelargonium_sidoides` | Pelargonium Sidoides | PREPARADOS PARA LA TOS Y EL RESFRIADO | CIMA   |

### Pemetrexed — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_pemetrexed` | Pemetrexed | Pemetrexed | CIMA   |

### Pemigatinib — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_pemigatinib` | Pemigatinib | Pemigatinib | CIMA   |

### Tecnecio (99mTc) acido pentetico — 1 entradas

| ID                                    | Nombre                         | Familia                          | Origen |
| ------------------------------------- | ------------------------------ | -------------------------------- | ------ |
| `cima_pentetato_de_calcio_y_trisodio` | Pentetato De Calcio Y Trisodio | Tecnecio (99mTc) acido pentetico | CIMA   |

### Pentosan polisulfato de sodio — 1 entradas

| ID                                    | Nombre                         | Familia                       | Origen |
| ------------------------------------- | ------------------------------ | ----------------------------- | ------ |
| `cima_pentosano_polisulfato_de_sodio` | Pentosano Polisulfato De Sodio | Pentosan polisulfato de sodio | CIMA   |

### Pentostatina — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_pentostatina` | Pentostatina | Pentostatina | CIMA   |

### Albumina humana, microesferas de — 1 entradas

| ID                 | Nombre      | Familia                          | Origen |
| ------------------ | ----------- | -------------------------------- | ------ |
| `cima_perflutreno` | Perflutreno | Albumina humana, microesferas de | CIMA   |

### Periciazina — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_periciazina` | Periciazina | Periciazina | CIMA   |

### Perindopril y amlodipino — 1 entradas

| ID                              | Nombre                   | Familia                  | Origen |
| ------------------------------- | ------------------------ | ------------------------ | ------ |
| `cima_perindopril___amlodipino` | Perindopril + Amlodipino | Perindopril y amlodipino | CIMA   |

### Perindopril, amlodipino e indapamida — 1 entradas

| ID                                           | Nombre                                | Familia                              | Origen |
| -------------------------------------------- | ------------------------------------- | ------------------------------------ | ------ |
| `cima_perindopril___amlodipino___indapamida` | Perindopril + Amlodipino + Indapamida | Perindopril, amlodipino e indapamida | CIMA   |

### Perindopril y diureticos — 1 entradas

| ID                              | Nombre                   | Familia                  | Origen |
| ------------------------------- | ------------------------ | ------------------------ | ------ |
| `cima_perindopril___indapamida` | Perindopril + Indapamida | Perindopril y diureticos | CIMA   |

### Pertuzumab y trastuzumab — 1 entradas

| ID                              | Nombre                   | Familia                  | Origen |
| ------------------------------- | ------------------------ | ------------------------ | ------ |
| `cima_pertuzumab___trastuzumab` | Pertuzumab + Trastuzumab | Pertuzumab y trastuzumab | CIMA   |

### Picosulfato de sodio, combinaciones con — 1 entradas

| ID                                                        | Nombre                                             | Familia                                 | Origen |
| --------------------------------------------------------- | -------------------------------------------------- | --------------------------------------- | ------ |
| `cima_picosulfato_sodio___acido_citrico___magnesio_oxido` | Picosulfato Sodio + Ácido Cítrico + Magnesio Óxido | Picosulfato de sodio, combinaciones con | CIMA   |

### Piflufolastat (18F) — 1 entradas

| ID                       | Nombre              | Familia             | Origen |
| ------------------------ | ------------------- | ------------------- | ------ |
| `cima_piflufolastat_18f` | Piflufolastat (18F) | Piflufolastat (18F) | CIMA   |

### Piketoprofeno — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_piketoprofeno` | Piketoprofeno | Piketoprofeno | CIMA   |

### Pilocarpina — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_pilocarpina` | Pilocarpina | Pilocarpina | CIMA   |

### Pioglitazona y alogliptina — 1 entradas

| ID                                | Nombre                     | Familia                    | Origen |
| --------------------------------- | -------------------------- | -------------------------- | ------ |
| `cima_pioglitazona___alogliptina` | Pioglitazona + Alogliptina | Pioglitazona y alogliptina | CIMA   |

### Metformina y pioglitazona — 1 entradas

| ID                               | Nombre                    | Familia                   | Origen |
| -------------------------------- | ------------------------- | ------------------------- | ------ |
| `cima_pioglitazona___metformina` | Pioglitazona + Metformina | Metformina y pioglitazona | CIMA   |

### Artemisinina y derivados, combinaciones — 1 entradas

| ID                                                    | Nombre                                         | Familia                                 | Origen |
| ----------------------------------------------------- | ---------------------------------------------- | --------------------------------------- | ------ |
| `cima_piperaquina_tetrafosfato___dihidroartemisinina` | Piperaquina Tetrafosfato + Dihidroartemisinina | Artemisinina y derivados, combinaciones | CIMA   |

### Piracetam — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_piracetam` | Piracetam | Piracetam | CIMA   |

### Piridostigmina — 1 entradas

| ID                    | Nombre         | Familia        | Origen |
| --------------------- | -------------- | -------------- | ------ |
| `cima_piridostigmina` | Piridostigmina | Piridostigmina | CIMA   |

### Tecnecio (99mTc), pirofosfato de — 1 entradas

| ID                          | Nombre               | Familia                          | Origen |
| --------------------------- | -------------------- | -------------------------------- | ------ |
| `cima_pirofosfato_de_sodio` | Pirofosfato De Sodio | Tecnecio (99mTc), pirofosfato de | CIMA   |

### Pirtobrutinib — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_pirtobrutinib` | Pirtobrutinib | Pirtobrutinib | CIMA   |

### Pitavastatina — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_pitavastatina` | Pitavastatina | Pitavastatina | CIMA   |

### Pizotifeno — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_pizotifeno` | Pizotifeno | Pizotifeno | CIMA   |

### Ispaghula (semillas de psyllium) — 1 entradas

| ID                    | Nombre         | Familia                          | Origen |
| --------------------- | -------------- | -------------------------------- | ------ |
| `cima_plantago_ovata` | Plantago Ovata | Ispaghula (semillas de psyllium) | CIMA   |

### Nitrato de plata — 1 entradas

| ID                   | Nombre        | Familia          | Origen |
| -------------------- | ------------- | ---------------- | ------ |
| `cima_plata_nitrato` | Plata Nitrato | Nitrato de plata | CIMA   |

### Podofilotoxina — 1 entradas

| ID                    | Nombre         | Familia        | Origen |
| --------------------- | -------------- | -------------- | ------ |
| `cima_podofilotoxina` | Podofilotoxina | Podofilotoxina | CIMA   |

### polatuzumab vedotina — 1 entradas

| ID                          | Nombre               | Familia              | Origen |
| --------------------------- | -------------------- | -------------------- | ------ |
| `cima_polatuzumab_vedotina` | Polatuzumab Vedotina | polatuzumab vedotina | CIMA   |

### Polihexanida — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_polihexanida` | Polihexanida | Polihexanida | CIMA   |

### Otros productos dermatologicos — 1 entradas

| ID                           | Nombre                | Familia                        | Origen |
| ---------------------------- | --------------------- | ------------------------------ | ------ |
| `cima_polypodium_leucotomos` | Polypodium Leucotomos | Otros productos dermatologicos | CIMA   |

### Acetato de potasio — 1 entradas

| ID                     | Nombre          | Familia            | Origen |
| ---------------------- | --------------- | ------------------ | ------ |
| `cima_potasio_acetato` | Potasio Acetato | Acetato de potasio | CIMA   |

### Cloruro de potasio — 1 entradas

| ID                     | Nombre          | Familia            | Origen |
| ---------------------- | --------------- | ------------------ | ------ |
| `cima_potasio_cloruro` | Potasio Cloruro | Cloruro de potasio | CIMA   |

### Fosfato de potasio, incluyendo combinaciones con otras sales de potasio — 1 entradas

| ID                              | Nombre                   | Familia                                                                 | Origen |
| ------------------------------- | ------------------------ | ----------------------------------------------------------------------- | ------ |
| `cima_potasio_fosfato_dibasico` | Potasio Fosfato Dibásico | Fosfato de potasio, incluyendo combinaciones con otras sales de potasio | CIMA   |

### Bicarbonato de potasio — 1 entradas

| ID                                                  | Nombre                                       | Familia                | Origen |
| --------------------------------------------------- | -------------------------------------------- | ---------------------- | ------ |
| `cima_potasio_hidrogenocarbonato___acido_ascorbico` | Potasio Hidrogenocarbonato + Ácido Ascórbico | Bicarbonato de potasio | CIMA   |

### potasio (combinacion de diferentes sales) — 1 entradas

| ID                                                                    | Nombre                                                         | Familia                                   | Origen |
| --------------------------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------- | ------ |
| `cima_potasio_hidrogenocarbonato___acido_ascorbico___acido_aspartico` | Potasio Hidrogenocarbonato + Ácido Ascórbico + Ácido Aspártico | potasio (combinacion de diferentes sales) | CIMA   |

### Povidona iodada — 1 entradas

| ID                     | Nombre          | Familia         | Origen |
| ---------------------- | --------------- | --------------- | ------ |
| `cima_povidona_iodada` | Povidona Iodada | Povidona iodada | CIMA   |

### Prasterona — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_prasterona` | Prasterona | Prasterona | CIMA   |

### Pravastatina y fenofibrato — 1 entradas

| ID                                | Nombre                     | Familia                    | Origen |
| --------------------------------- | -------------------------- | -------------------------- | ------ |
| `cima_pravastatina___fenofibrato` | Pravastatina + Fenofibrato | Pravastatina y fenofibrato | CIMA   |

### Prednisona asoc. a antiinfecciosos — 1 entradas

| ID                            | Nombre                 | Familia                            | Origen |
| ----------------------------- | ---------------------- | ---------------------------------- | ------ |
| `cima_prednisona___neomicina` | Prednisona + Neomicina | Prednisona asoc. a antiinfecciosos | CIMA   |

### Procarbazina — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_procarbazina` | Procarbazina | Procarbazina | CIMA   |

### Factor XIII de la coagulacion — 1 entradas

| ID                              | Nombre                   | Familia                       | Origen |
| ------------------------------- | ------------------------ | ----------------------------- | ------ |
| `cima_producto_con_factor_xiii` | Producto Con Factor Xiii | Factor XIII de la coagulacion | CIMA   |

### Progesterona y estrogeno — 1 entradas

| ID                              | Nombre                   | Familia                  | Origen |
| ------------------------------- | ------------------------ | ------------------------ | ------ |
| `cima_progesterona___estradiol` | Progesterona + Estradiol | Progesterona y estrogeno | CIMA   |

### Promestrieno — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_promestrieno` | Promestrieno | Promestrieno | CIMA   |

### Propifenazona, combinaciones excluyendo psicolepticos — 1 entradas

| ID                             | Nombre                  | Familia                                               | Origen |
| ------------------------------ | ----------------------- | ----------------------------------------------------- | ------ |
| `cima_propifenazona___cafeina` | Propifenazona + Cafeína | Propifenazona, combinaciones excluyendo psicolepticos | CIMA   |

### Codeina, combinaciones con psicolepticos — 1 entradas

| ID                                           | Nombre                                | Familia                                  | Origen |
| -------------------------------------------- | ------------------------------------- | ---------------------------------------- | ------ |
| `cima_propifenazona___codeina___hidroxicina` | Propifenazona + Codeína + Hidroxicina | Codeina, combinaciones con psicolepticos | CIMA   |

### Propiverina — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_propiverina` | Propiverina | Propiverina | CIMA   |

### Proteina C — 1 entradas

| ID                       | Nombre            | Familia    | Origen |
| ------------------------ | ----------------- | ---------- | ------ |
| `cima_proteina_c_humana` | Proteína C Humana | Proteina C | CIMA   |

### Sustitutos de la sangre y fracciones proteicas del plasma — 1 entradas

| ID                            | Nombre                 | Familia                                                   | Origen |
| ----------------------------- | ---------------------- | --------------------------------------------------------- | ------ |
| `cima_proteina_plasma_humano` | Proteína Plasma Humano | Sustitutos de la sangre y fracciones proteicas del plasma | CIMA   |

### PSMA-1007 (18F) — 1 entradas

| ID                  | Nombre          | Familia         | Origen |
| ------------------- | --------------- | --------------- | ------ |
| `cima_psma1007_18f` | Psma-1007 (18F) | PSMA-1007 (18F) | CIMA   |

### Subcitrato de bismuto — 1 entradas

| ID                        | Nombre             | Familia               | Origen |
| ------------------------- | ------------------ | --------------------- | ------ |
| `cima_quelato_de_bismuto` | Quelato De Bismuto | Subcitrato de bismuto | CIMA   |

### Quinapril y diureticos — 1 entradas

| ID                                   | Nombre                        | Familia                | Origen |
| ------------------------------------ | ----------------------------- | ---------------------- | ------ |
| `cima_quinapril___hidroclorotiazida` | Quinapril + Hidroclorotiazida | Quinapril y diureticos | CIMA   |

### Quizartinib — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_quizartinib` | Quizartinib | Quizartinib | CIMA   |

### Radio 223 dicloruro (223Ra) — 1 entradas

| ID                           | Nombre                  | Familia                     | Origen |
| ---------------------------- | ----------------------- | --------------------------- | ------ |
| `cima_radio_dicloruro_223ra` | Radio Dicloruro (223Ra) | Radio 223 dicloruro (223Ra) | CIMA   |

### Raltitrexed — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_raltitrexed` | Raltitrexed | Raltitrexed | CIMA   |

### Ramipril y amlodipino — 1 entradas

| ID                           | Nombre                | Familia               | Origen |
| ---------------------------- | --------------------- | --------------------- | ------ |
| `cima_ramipril___amlodipino` | Ramipril + Amlodipino | Ramipril y amlodipino | CIMA   |

### Ramipril, amlodipino e hidroclorotiazida — 1 entradas

| ID                                               | Nombre                                    | Familia                                  | Origen |
| ------------------------------------------------ | ----------------------------------------- | ---------------------------------------- | ------ |
| `cima_ramipril___amlodipino___hidroclorotiazida` | Ramipril + Amlodipino + Hidroclorotiazida | Ramipril, amlodipino e hidroclorotiazida | CIMA   |

### Ramipril y bisoprolol — 1 entradas

| ID                           | Nombre                | Familia               | Origen |
| ---------------------------- | --------------------- | --------------------- | ------ |
| `cima_ramipril___bisoprolol` | Ramipril + Bisoprolol | Ramipril y bisoprolol | CIMA   |

### Ramipril y felodipino — 1 entradas

| ID                           | Nombre                | Familia               | Origen |
| ---------------------------- | --------------------- | --------------------- | ------ |
| `cima_ramipril___felodipino` | Ramipril + Felodipino | Ramipril y felodipino | CIMA   |

### Ramucirumab — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_ramucirumab` | Ramucirumab | Ramucirumab | CIMA   |

### Agentes para el diagnostico de tuberculosis — 1 entradas

| ID                      | Nombre             | Familia                                     | Origen |
| ----------------------- | ------------------ | ------------------------------------------- | ------ |
| `cima_rdesat6___rcfp10` | Rdesat-6 + Rcfp-10 | Agentes para el diagnostico de tuberculosis | CIMA   |

### Regadenoson — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_regadenoson` | Regadenosón | Regadenoson | CIMA   |

### Regorafenib — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_regorafenib` | Regorafenib | Regorafenib | CIMA   |

### Relugolix, estradiol y norestisterona — 1 entradas

| ID                                           | Nombre                                | Familia                               | Origen |
| -------------------------------------------- | ------------------------------------- | ------------------------------------- | ------ |
| `cima_relugolix___estradiol___noretisterona` | Relugolix + Estradiol + Noretisterona | Relugolix, estradiol y norestisterona | CIMA   |

### Renio (185Re) sulfuro coloidal — 1 entradas

| ID                         | Nombre                | Familia                        | Origen |
| -------------------------- | --------------------- | ------------------------------ | ------ |
| `cima_renio_sulfuro_186re` | Renio Sulfuro (186Re) | Renio (185Re) sulfuro coloidal | CIMA   |

### Retinol (vit A) — 1 entradas

| ID             | Nombre  | Familia         | Origen |
| -------------- | ------- | --------------- | ------ |
| `cima_retinol` | Retinol | Retinol (vit A) | CIMA   |

### Combinaciones de vitaminas — 1 entradas

| ID                         | Nombre              | Familia                    | Origen |
| -------------------------- | ------------------- | -------------------------- | ------ |
| `cima_retinol___tocoferol` | Retinol + Tocoferol | Combinaciones de vitaminas | CIMA   |

### Vitaminas — 1 entradas

| ID                                                                            | Nombre                                                                   | Familia   | Origen |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------ | --------- | ------ |
| `cima_retinol_palmitato___ergocalciferol___fitomenadiona___todoalfatocoferol` | Retinol Palmitato + Ergocalciferol + Fitomenadiona + Todo-Alfa-Tocoferol | Vitaminas | CIMA   |

### Cascara — 1 entradas

| ID                        | Nombre             | Familia | Origen |
| ------------------------- | ------------------ | ------- | ------ |
| `cima_rhamnus_purshianus` | Rhamnus Purshianus | Cascara | CIMA   |

### TONICOS — 1 entradas

| ID                    | Nombre         | Familia | Origen |
| --------------------- | -------------- | ------- | ------ |
| `cima_rhodiola_rosea` | Rhodiola Rosea | TONICOS | CIMA   |

### Ribociclib — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_ribociclib` | Ribociclib | Ribociclib | CIMA   |

### Rifamicina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_rifamicina` | Rifamicina | Rifamicina | CIMA   |

### Rifampicina e isoniazida — 1 entradas

| ID                              | Nombre                   | Familia                  | Origen |
| ------------------------------- | ------------------------ | ------------------------ | ------ |
| `cima_rifampicina___isoniazida` | Rifampicina + Isoniazida | Rifampicina e isoniazida | CIMA   |

### Rifampicina, pirazinamida e isoniazida — 1 entradas

| ID                                             | Nombre                                  | Familia                                | Origen |
| ---------------------------------------------- | --------------------------------------- | -------------------------------------- | ------ |
| `cima_rifampicina___isoniazida___pirazinamida` | Rifampicina + Isoniazida + Pirazinamida | Rifampicina, pirazinamida e isoniazida | CIMA   |

### Rifampicina, pirazinamida, etambutol e isoniazida — 1 entradas

| ID                                                         | Nombre                                              | Familia                                           | Origen |
| ---------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------- | ------ |
| `cima_rifampicina___isoniazida___pirazinamida___etambutol` | Rifampicina + Isoniazida + Pirazinamida + Etambutol | Rifampicina, pirazinamida, etambutol e isoniazida | CIMA   |

### Rimegepant — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_rimegepant` | Rimegepant | Rimegepant | CIMA   |

### Ripretinib — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_ripretinib` | Ripretinib | Ripretinib | CIMA   |

### Rosuvastatina y ezetimiba — 1 entradas

| ID                               | Nombre                    | Familia                   | Origen |
| -------------------------------- | ------------------------- | ------------------------- | ------ |
| `cima_rosuvastatina___ezetimiba` | Rosuvastatina + Ezetimiba | Rosuvastatina y ezetimiba | CIMA   |

### Rosuvastatina y valsartan — 1 entradas

| ID                               | Nombre                    | Familia                   | Origen |
| -------------------------------- | ------------------------- | ------------------------- | ------ |
| `cima_rosuvastatina___valsartan` | Rosuvastatina + Valsartán | Rosuvastatina y valsartan | CIMA   |

### Rosuvastatina y acido acetilsalicilico — 1 entradas

| ID                                            | Nombre                                 | Familia                                | Origen |
| --------------------------------------------- | -------------------------------------- | -------------------------------------- | ------ |
| `cima_rosuvastatina___acido_acetilsalicilico` | Rosuvastatina + Ácido Acetilsalicílico | Rosuvastatina y acido acetilsalicilico | CIMA   |

### Rozanolixizumab — 1 entradas

| ID                     | Nombre          | Familia         | Origen |
| ---------------------- | --------------- | --------------- | ------ |
| `cima_rozanolixizumab` | Rozanolixizumab | Rozanolixizumab | CIMA   |

### Rucaparib — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_rucaparib` | Rucaparib | Rucaparib | CIMA   |

### Rutosido, combinaciones con — 1 entradas

| ID                                                      | Nombre                                           | Familia                     | Origen |
| ------------------------------------------------------- | ------------------------------------------------ | --------------------------- | ------ |
| `cima_ruscus_aculeatus___hesperidina___acido_ascorbico` | Ruscus Aculeatus + Hesperidina + Ácido Ascórbico | Rutosido, combinaciones con | CIMA   |

### Sacituzumab govitecan — 1 entradas

| ID                           | Nombre                | Familia               | Origen |
| ---------------------------- | --------------------- | --------------------- | ------ |
| `cima_sacituzumab_govitecan` | Sacituzumab Govitecán | Sacituzumab govitecan | CIMA   |

### Tecnecio (99mTc) acido butedronico — 1 entradas

| ID                                                                 | Nombre                                                           | Familia                            | Origen |
| ------------------------------------------------------------------ | ---------------------------------------------------------------- | ---------------------------------- | ------ |
| `cima_sal_tetrasodica_del_acido_33difosfono12propanodicarboxilico` | Sal Tetrasódica Del Ácido 3,3-Difosfono-1,2-Propanodicarboxílico | Tecnecio (99mTc) acido butedronico | CIMA   |

### Salbutamol — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_salbutamol` | Salbutamol | Salbutamol | CIMA   |

### Salbutamol y beclometasona — 1 entradas

| ID                                | Nombre                     | Familia                    | Origen |
| --------------------------------- | -------------------------- | -------------------------- | ------ |
| `cima_salbutamol___beclometasona` | Salbutamol + Beclometasona | Salbutamol y beclometasona | CIMA   |

### Salbutamol e Ipratropio, bromuro de — 1 entradas

| ID                                     | Nombre                          | Familia                             | Origen |
| -------------------------------------- | ------------------------------- | ----------------------------------- | ------ |
| `cima_salbutamol___bromuro_ipratropio` | Salbutamol + Bromuro Ipratropio | Salbutamol e Ipratropio, bromuro de | CIMA   |

### Salicilico acido combinaciones con — 1 entradas

| ID                                            | Nombre                                 | Familia                            | Origen |
| --------------------------------------------- | -------------------------------------- | ---------------------------------- | ------ |
| `cima_salicilato_de_dietilamina___mirtecaina` | Salicilato De Dietilamina + Mirtecaína | Salicilico acido combinaciones con | CIMA   |

### Preparados con acido salicilico y derivados — 1 entradas

| ID                             | Nombre                  | Familia                                     | Origen |
| ------------------------------ | ----------------------- | ------------------------------------------- | ------ |
| `cima_salicilato_de_trolamina` | Salicilato De Trolamina | Preparados con acido salicilico y derivados | CIMA   |

### Salmeterol y fluticasona — 1 entradas

| ID                              | Nombre                   | Familia                  | Origen |
| ------------------------------- | ------------------------ | ------------------------ | ------ |
| `cima_salmeterol___fluticasona` | Salmeterol + Fluticasona | Salmeterol y fluticasona | CIMA   |

### Otros productos terapeuticos — 1 entradas

| ID                        | Nombre             | Familia                      | Origen |
| ------------------------- | ------------------ | ---------------------------- | ------ |
| `cima_salvia_officinalis` | Salvia Officinalis | Otros productos terapeuticos | CIMA   |

### Samario (153Sm) lexidronam — 1 entradas

| ID                             | Nombre                      | Familia                    | Origen |
| ------------------------------ | --------------------------- | -------------------------- | ------ |
| `cima_samariolexidronam_sm153` | Samario-Lexidronam (Sm-153) | Samario (153Sm) lexidronam | CIMA   |

### Sapropterina — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_sapropterina` | Sapropterina | Sapropterina | CIMA   |

### SATRALIZUMAB — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_satralizumab` | Satralizumab | SATRALIZUMAB | CIMA   |

### Sebelipasa alfa — 1 entradas

| ID                     | Nombre          | Familia         | Origen |
| ---------------------- | --------------- | --------------- | ------ |
| `cima_sebelipasa_alfa` | Sebelipasa Alfa | Sebelipasa alfa | CIMA   |

### Selinexor — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_selinexor` | Selinexor | Selinexor | CIMA   |

### Selpercatinib — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_selpercatinib` | Selpercatinib | Selpercatinib | CIMA   |

### Selumetinib — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_selumetinib` | Selumetinib | Selumetinib | CIMA   |

### Glicosidos de sena — 1 entradas

| ID                  | Nombre        | Familia            | Origen |
| ------------------- | ------------- | ------------------ | ------ |
| `cima_senosidos_ab` | Senósidos A-B | Glicosidos de sena | CIMA   |

### Sabalis serrulatae fructus — 1 entradas

| ID                    | Nombre         | Familia                    | Origen |
| --------------------- | -------------- | -------------------------- | ------ |
| `cima_serenoa_repens` | Serenoa Repens | Sabalis serrulatae fructus | CIMA   |

### Serplulimab — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_serplulimab` | Serplulimab | Serplulimab | CIMA   |

### Sertindol — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_sertindol` | Sertindol | Sertindol | CIMA   |

### Siltuximab — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_siltuximab` | Siltuximab | Siltuximab | CIMA   |

### Simvastatina y ezetimiba — 1 entradas

| ID                              | Nombre                   | Familia                  | Origen |
| ------------------------------- | ------------------------ | ------------------------ | ------ |
| `cima_simvastatina___ezetimiba` | Simvastatina + Ezetimiba | Simvastatina y ezetimiba | CIMA   |

### Sirolimus — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_sirolimus` | Sirolimus | Sirolimus | CIMA   |

### Metformina y sitagliptina — 1 entradas

| ID                               | Nombre                    | Familia                   | Origen |
| -------------------------------- | ------------------------- | ------------------------- | ------ |
| `cima_sitagliptina___metformina` | Sitagliptina + Metformina | Metformina y sitagliptina | CIMA   |

### Antiacidos con bicarbonato de sodio — 1 entradas

| ID                       | Nombre            | Familia                             | Origen |
| ------------------------ | ----------------- | ----------------------------------- | ------ |
| `cima_sodio_bicarbonato` | Sodio Bicarbonato | Antiacidos con bicarbonato de sodio | CIMA   |

### Ioduro (123I) de sodio — 1 entradas

| ID                       | Nombre              | Familia                | Origen |
| ------------------------ | ------------------- | ---------------------- | ------ |
| `cima_sodio_ioduro_123i` | Sodio Ioduro (123I) | Ioduro (123I) de sodio | CIMA   |

### Ioduro de sodio (131I) — 1 entradas

| ID                       | Nombre              | Familia                | Origen |
| ------------------------ | ------------------- | ---------------------- | ------ |
| `cima_sodio_ioduro_131i` | Sodio Ioduro (131I) | Ioduro de sodio (131I) | CIMA   |

### Sofosbuvir, velpatasvir y voxilaprevir — 1 entradas

| ID                                             | Nombre                                  | Familia                                | Origen |
| ---------------------------------------------- | --------------------------------------- | -------------------------------------- | ------ |
| `cima_sofosbuvir___velpatasvir___voxilaprevir` | Sofosbuvir + Velpatasvir + Voxilaprevir | Sofosbuvir, velpatasvir y voxilaprevir | CIMA   |

### Albumina — 1 entradas

| ID                           | Nombre                | Familia  | Origen |
| ---------------------------- | --------------------- | -------- | ------ |
| `cima_solucion_con_albumina` | Solución Con Albúmina | Albumina | CIMA   |

### Somatrogon — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_somatrogon` | Somatrogón | Somatrogon | CIMA   |

### Sonidegib — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_sonidegib` | Sonidegib | Sonidegib | CIMA   |

### Sotatercept — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_sotatercept` | Sotatercept | Sotatercept | CIMA   |

### Sotorasib — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_sotorasib` | Sotorasib | Sotorasib | CIMA   |

### Subcitrato de bismuto, tetraciclina y metronidazol — 1 entradas

| ID                                                      | Nombre                                           | Familia                                            | Origen |
| ------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------- | ------ |
| `cima_subcitrato_bismuto___tetraciclina___metronidazol` | Subcitrato Bismuto + Tetraciclina + Metronidazol | Subcitrato de bismuto, tetraciclina y metronidazol | CIMA   |

### Sulbutiamina — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_sulbutiamina` | Sulbutiamina | Sulbutiamina | CIMA   |

### Sulfadiazina — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_sulfadiazina` | Sulfadiazina | Sulfadiazina | CIMA   |

### Sulfametoxazol y trimetoprima — 1 entradas

| ID                                   | Nombre                        | Familia                       | Origen |
| ------------------------------------ | ----------------------------- | ----------------------------- | ------ |
| `cima_sulfametoxazol___trimetoprima` | Sulfametoxazol + Trimetoprima | Sulfametoxazol y trimetoprima | CIMA   |

### Sumatriptan y naproxeno — 1 entradas

| ID                             | Nombre                  | Familia                 | Origen |
| ------------------------------ | ----------------------- | ----------------------- | ------ |
| `cima_sumatriptan___naproxeno` | Sumatriptán + Naproxeno | Sumatriptan y naproxeno | CIMA   |

### Combinaciones de electrolitos — 1 entradas

| ID                                             | Nombre                                  | Familia                       | Origen |
| ---------------------------------------------- | --------------------------------------- | ----------------------------- | ------ |
| `cima_suplemento_parenteral_de_oligoelementos` | Suplemento Parenteral De Oligoelementos | Combinaciones de electrolitos | CIMA   |

### Suxametonio, cloruro de — 1 entradas

| ID                 | Nombre      | Familia                 | Origen |
| ------------------ | ----------- | ----------------------- | ------ |
| `cima_suxametonio` | Suxametonio | Suxametonio, cloruro de | CIMA   |

### Tafamidis — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_tafamidis` | Tafamidis | Tafamidis | CIMA   |

### Tafasitamab — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_tafasitamab` | Tafasitamab | Tafasitamab | CIMA   |

### Tafluprost — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_tafluprost` | Tafluprost | Tafluprost | CIMA   |

### Talazoparib — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_talazoparib` | Talazoparib | Talazoparib | CIMA   |

### Talidomida — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_talidomida` | Talidomida | Talidomida | CIMA   |

### Talio (201TL), cloruro de — 1 entradas

| ID                         | Nombre                | Familia                   | Origen |
| -------------------------- | --------------------- | ------------------------- | ------ |
| `cima_talio_cloruro_201tl` | Talio Cloruro (201Tl) | Talio (201TL), cloruro de | CIMA   |

### Talquetamab — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_talquetamab` | Talquetamab | Talquetamab | CIMA   |

### Tamsulosina y solifenacina — 1 entradas

| ID                                | Nombre                     | Familia                    | Origen |
| --------------------------------- | -------------------------- | -------------------------- | ------ |
| `cima_tamsulosina___solifenacina` | Tamsulosina + Solifenacina | Tamsulosina y solifenacina | CIMA   |

### Tanato de albumina — 1 entradas

| ID                        | Nombre             | Familia            | Origen |
| ------------------------- | ------------------ | ------------------ | ------ |
| `cima_tanato_de_gelatina` | Tanato De Gelatina | Tanato de albumina | CIMA   |

### Tasonermina — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_tasonermina` | Tasonermina | Tasonermina | CIMA   |

### Tebentafusp — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_tebentafusp` | Tebentafusp | Tebentafusp | CIMA   |

### Teclistamab — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_teclistamab` | Teclistamab | Teclistamab | CIMA   |

### Teduglutida — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_teduglutida` | Teduglutida | Teduglutida | CIMA   |

### Tegafur — 1 entradas

| ID             | Nombre  | Familia | Origen |
| -------------- | ------- | ------- | ------ |
| `cima_tegafur` | Tegafur | Tegafur | CIMA   |

### Telmisartan y amlodipino — 1 entradas

| ID                              | Nombre                   | Familia                  | Origen |
| ------------------------------- | ------------------------ | ------------------------ | ------ |
| `cima_telmisartan___amlodipino` | Telmisartán + Amlodipino | Telmisartan y amlodipino | CIMA   |

### Telmisartan y diureticos — 1 entradas

| ID                                     | Nombre                          | Familia                  | Origen |
| -------------------------------------- | ------------------------------- | ------------------------ | ------ |
| `cima_telmisartan___hidroclorotiazida` | Telmisartán + Hidroclorotiazida | Telmisartan y diureticos | CIMA   |

### Telotristat — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_telotristat` | Telotristat | Telotristat | CIMA   |

### Temsirolimus — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_temsirolimus` | Temsirolimus | Temsirolimus | CIMA   |

### Tenofovir disoproxilo — 1 entradas

| ID               | Nombre    | Familia               | Origen |
| ---------------- | --------- | --------------------- | ------ |
| `cima_tenofovir` | Tenofovir | Tenofovir disoproxilo | CIMA   |

### Tepotinib — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_tepotinib` | Tepotinib | Tepotinib | CIMA   |

### Terbutalina, combinaciones con — 1 entradas

| ID                                | Nombre                     | Familia                        | Origen |
| --------------------------------- | -------------------------- | ------------------------------ | ------ |
| `cima_terbutalina___guaifenesina` | Terbutalina + Guaifenesina | Terbutalina, combinaciones con | CIMA   |

### Testosterona — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_testosterona` | Testosterona | Testosterona | CIMA   |

### Tetrizolina — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_tetrizolina` | Tetrizolina | Tetrizolina | CIMA   |

### Tecnecio (99mTc) tetrofosmina — 1 entradas

| ID                  | Nombre       | Familia                       | Origen |
| ------------------- | ------------ | ----------------------------- | ------ |
| `cima_tetrofosmina` | Tetrofosmina | Tecnecio (99mTc) tetrofosmina | CIMA   |

### Tecnecio (99m Tc) hinio-octreotida — 1 entradas

| ID                                   | Nombre                              | Familia                            | Origen |
| ------------------------------------ | ----------------------------------- | ---------------------------------- | ------ |
| `cima_tfa_hynicdphe1_tyr3octreotida` | Tfa Hynic-[D-Phe1, Tyr3-Octreotida] | Tecnecio (99m Tc) hinio-octreotida | CIMA   |

### Tiamazol — 1 entradas

| ID              | Nombre   | Familia  | Origen |
| --------------- | -------- | -------- | ------ |
| `cima_tiamazol` | Tiamazol | Tiamazol | CIMA   |

### Tildrakizumab — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_tildrakizumab` | Tildrakizumab | Tildrakizumab | CIMA   |

### Tioconazol — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_tioconazol` | Tioconazol | Tioconazol | CIMA   |

### Tioguanina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_tioguanina` | Tioguanina | Tioguanina | CIMA   |

### Tiopental sodico — 1 entradas

| ID                     | Nombre          | Familia          | Origen |
| ---------------------- | --------------- | ---------------- | ------ |
| `cima_tiopental_sodio` | Tiopental Sodio | Tiopental sodico | CIMA   |

### Tiotepa — 1 entradas

| ID             | Nombre  | Familia | Origen |
| -------------- | ------- | ------- | ------ |
| `cima_tiotepa` | Tiotepa | Tiotepa | CIMA   |

### Tirbanibulina — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_tirbanibulina` | Tirbanibulina | Tirbanibulina | CIMA   |

### Tirofiban — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_tirofiban` | Tirofiban | Tirofiban | CIMA   |

### Tirotropina — 1 entradas

| ID                      | Nombre           | Familia     | Origen |
| ----------------------- | ---------------- | ----------- | ------ |
| `cima_tirotrofina_alfa` | Tirotrofina Alfa | Tirotropina | CIMA   |

### Tislelizumab — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_tislelizumab` | Tislelizumab | Tislelizumab | CIMA   |

### tivozanib — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_tivozanib` | Tivozanib | tivozanib | CIMA   |

### Tocoferol (vit E) — 1 entradas

| ID               | Nombre    | Familia           | Origen |
| ---------------- | --------- | ----------------- | ------ |
| `cima_tocoferol` | Tocoferol | Tocoferol (vit E) | CIMA   |

### Tocofersolan — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_tocofersolan` | Tocofersolán | Tocofersolan | CIMA   |

### Tofersen — 1 entradas

| ID              | Nombre   | Familia  | Origen |
| --------------- | -------- | -------- | ------ |
| `cima_tofersen` | Tofersén | Tofersen | CIMA   |

### Topotecan — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_topotecan` | Topotecán | Topotecan | CIMA   |

### Trabectedina — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_trabectedina` | Trabectedina | Trabectedina | CIMA   |

### Tramadol y celecoxib — 1 entradas

| ID                          | Nombre               | Familia              | Origen |
| --------------------------- | -------------------- | -------------------- | ------ |
| `cima_tramadol___celecoxib` | Tramadol + Celecoxib | Tramadol y celecoxib | CIMA   |

### Tramadol y dexketoprofeno — 1 entradas

| ID                               | Nombre                    | Familia                   | Origen |
| -------------------------------- | ------------------------- | ------------------------- | ------ |
| `cima_tramadol___dexketoprofeno` | Tramadol + Dexketoprofeno | Tramadol y dexketoprofeno | CIMA   |

### Tramadol y paracetamol — 1 entradas

| ID                            | Nombre                 | Familia                | Origen |
| ----------------------------- | ---------------------- | ---------------------- | ------ |
| `cima_tramadol___paracetamol` | Tramadol + Paracetamol | Tramadol y paracetamol | CIMA   |

### Tramazolina — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_tramazolina` | Tramazolina | Tramazolina | CIMA   |

### Trametinib — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_trametinib` | Trametinib | Trametinib | CIMA   |

### Trandolapril y verapamilo — 1 entradas

| ID                               | Nombre                    | Familia                   | Origen |
| -------------------------------- | ------------------------- | ------------------------- | ------ |
| `cima_trandolapril___verapamilo` | Trandolapril + Verapamilo | Trandolapril y verapamilo | CIMA   |

### Trastuzumab emtansina — 1 entradas

| ID                           | Nombre                | Familia               | Origen |
| ---------------------------- | --------------------- | --------------------- | ------ |
| `cima_trastuzumab_emtansina` | Trastuzumab Emtansina | Trastuzumab emtansina | CIMA   |

### Travoprost — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_travoprost` | Travoprost | Travoprost | CIMA   |

### Tremelimumab — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_tremelimumab` | Tremelimumab | Tremelimumab | CIMA   |

### Treosulfano — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_treosulfano` | Treosulfano | Treosulfano | CIMA   |

### Treprostinilo — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_treprostinilo` | Treprostinilo | Treprostinilo | CIMA   |

### Triamcinolona — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_triamcinolona` | Triamcinolona | Triamcinolona | CIMA   |

### Otras preparaciones, combinaciones — 1 entradas

| ID                                                             | Nombre                                                  | Familia                            | Origen |
| -------------------------------------------------------------- | ------------------------------------------------------- | ---------------------------------- | ------ |
| `cima_triamcinolona___lidocaina___pentosano_polisulfato_sodio` | Triamcinolona + Lidocaína + Pentosano Polisulfato Sodio | Otras preparaciones, combinaciones | CIMA   |

### Triazolam — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_triazolam` | Triazolam | Triazolam | CIMA   |

### Trientina — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_trientina` | Trientina | Trientina | CIMA   |

### Trifluridina, combinaciones con — 1 entradas

| ID                               | Nombre                    | Familia                         | Origen |
| -------------------------------- | ------------------------- | ------------------------------- | ------ |
| `cima_trifluridina___tipiracilo` | Trifluridina + Tipiracilo | Trifluridina, combinaciones con | CIMA   |

### Triflusal — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_triflusal` | Triflusal | Triflusal | CIMA   |

### Trimipramina — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_trimipramina` | Trimipramina | Trimipramina | CIMA   |

### Tripelenamina — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_tripelenamina` | Tripelenamina | Tripelenamina | CIMA   |

### Trospio, cloruro de — 1 entradas

| ID                     | Nombre          | Familia             | Origen |
| ---------------------- | --------------- | ------------------- | ------ |
| `cima_trospio_cloruro` | Trospio Cloruro | Trospio, cloruro de | CIMA   |

### Troxerutina — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_troxerutina` | Troxerutina | Troxerutina | CIMA   |

### Tuberculina — 1 entradas

| ID                     | Nombre          | Familia     | Origen |
| ---------------------- | --------------- | ----------- | ------ |
| `cima_tuberculina_ppd` | Tuberculina Ppd | Tuberculina | CIMA   |

### Tucatinib — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_tucatinib` | Tucatinib | Tucatinib | CIMA   |

### Ublituximab — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_ublituximab` | Ublituximab | Ublituximab | CIMA   |

### Vilanterol y Umeclidinio, bromuro de — 1 entradas

| ID                              | Nombre                   | Familia                              | Origen |
| ------------------------------- | ------------------------ | ------------------------------------ | ------ |
| `cima_umeclidinio___vilanterol` | Umeclidinio + Vilanterol | Vilanterol y Umeclidinio, bromuro de | CIMA   |

### Urapidil — 1 entradas

| ID              | Nombre   | Familia  | Origen |
| --------------- | -------- | -------- | ------ |
| `cima_urapidil` | Urapidil | Urapidil | CIMA   |

### 13C-urea — 1 entradas

| ID             | Nombre    | Familia  | Origen |
| -------------- | --------- | -------- | ------ |
| `cima_urea13c` | Urea(13C) | 13C-urea | CIMA   |

### Urofolitropina — 1 entradas

| ID                    | Nombre         | Familia        | Origen |
| --------------------- | -------------- | -------------- | ------ |
| `cima_urofolitropina` | Urofolitropina | Urofolitropina | CIMA   |

### Uroquinasa — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_uroquinasa` | Uroquinasa | Uroquinasa | CIMA   |

### Tuberculosis, micobacteria viva atenuada — 1 entradas

| ID                     | Nombre          | Familia                                  | Origen |
| ---------------------- | --------------- | ---------------------------------------- | ------ |
| `cima_vacuna_anti_bcg` | Vacuna Anti Bcg | Tuberculosis, micobacteria viva atenuada | CIMA   |

### vacunas de subunidad proteica frente a COVID-19 — 1 entradas

| ID                                                                  | Nombre                                                              | Familia                                         | Origen |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------- | ------ |
| `cima_vacuna_anti_covid19_hipra_recombinante_para_lp81_provisional` | Vacuna Anti Covid-19 (Hipra) Recombinante Para Lp.8.1 (Provisional) | vacunas de subunidad proteica frente a COVID-19 | CIMA   |

### Otras vacunas antivirales — 1 entradas

| ID                                                                    | Nombre                                                                | Familia                   | Origen |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------- | ------ |
| `cima_vacuna_anti_covid19_pfizer_biontech_arnm_para_lp81_provisional` | Vacuna Anti Covid-19 (Pfizer/Biontech) Arnm Para Lp.8.1 (Provisional) | Otras vacunas antivirales | CIMA   |

### Colera, celula entera inactivada — 1 entradas

| ID                        | Nombre             | Familia                          | Origen |
| ------------------------- | ------------------ | -------------------------------- | ------ |
| `cima_vacuna_anti_colera` | Vacuna Anti Cólera | Colera, celula entera inactivada | CIMA   |

### Vacunas frente al Dengue — 1 entradas

| ID                        | Nombre             | Familia                  | Origen |
| ------------------------- | ------------------ | ------------------------ | ------ |
| `cima_vacuna_anti_dengue` | Vacuna Anti Dengue | Vacunas frente al Dengue | CIMA   |

### Tetanico, toxoide, combinaciones con toxoide difterico — 1 entradas

| ID                                    | Nombre                         | Familia                                                | Origen |
| ------------------------------------- | ------------------------------ | ------------------------------------------------------ | ------ |
| `cima_vacuna_anti_difteria___tetanos` | Vacuna Anti Difteria + Tétanos | Tetanico, toxoide, combinaciones con toxoide difterico | CIMA   |

### Pertussis, antigeno purificado, combinacion con toxoides — 1 entradas

| ID                                                 | Nombre                                      | Familia                                                  | Origen |
| -------------------------------------------------- | ------------------------------------------- | -------------------------------------------------------- | ------ |
| `cima_vacuna_anti_difteria___tetanos___tos_ferina` | Vacuna Anti Difteria + Tétanos + Tos Ferina | Pertussis, antigeno purificado, combinacion con toxoides | CIMA   |

### Difteria-pertussis-poliomielitis-tetanos — 1 entradas

| ID                                                         | Nombre                                              | Familia                                  | Origen |
| ---------------------------------------------------------- | --------------------------------------------------- | ---------------------------------------- | ------ |
| `cima_vacuna_anti_difteria___tetanos___tos_ferina___polio` | Vacuna Anti Difteria + Tétanos + Tos Ferina + Polio | Difteria-pertussis-poliomielitis-tetanos | CIMA   |

### Encefalitis japonesa, virus entero inactivado — 1 entradas

| ID                                      | Nombre                           | Familia                                       | Origen |
| --------------------------------------- | -------------------------------- | --------------------------------------------- | ------ |
| `cima_vacuna_anti_encefalitis_japonesa` | Vacuna Anti Encefalitis Japonesa | Encefalitis japonesa, virus entero inactivado | CIMA   |

### Fiebre amarilla, virus vivo atenuado — 1 entradas

| ID                                 | Nombre                      | Familia                              | Origen |
| ---------------------------------- | --------------------------- | ------------------------------------ | ------ |
| `cima_vacuna_anti_fiebre_amarilla` | Vacuna Anti Fiebre Amarilla | Fiebre amarilla, virus vivo atenuado | CIMA   |

### Influenza, antigeno purificado — 1 entradas

| ID                        | Nombre             | Familia                        | Origen |
| ------------------------- | ------------------ | ------------------------------ | ------ |
| `cima_vacuna_anti_gripal` | Vacuna Anti Gripal | Influenza, antigeno purificado | CIMA   |

### Haemophilus influenzae B, antigeno purificado conjugado — 1 entradas

| ID                               | Nombre                     | Familia                                                 | Origen |
| -------------------------------- | -------------------------- | ------------------------------------------------------- | ------ |
| `cima_vacuna_anti_hinfluenzae_b` | Vacuna Anti H.Influenzae B | Haemophilus influenzae B, antigeno purificado conjugado | CIMA   |

### Hepatitis A, virus entero inactivado — 1 entradas

| ID                             | Nombre                  | Familia                              | Origen |
| ------------------------------ | ----------------------- | ------------------------------------ | ------ |
| `cima_vacuna_anti_hepatitis_a` | Vacuna Anti Hepatitis A | Hepatitis A, virus entero inactivado | CIMA   |

### Hepatitis B, antigeno purificado de — 1 entradas

| ID                             | Nombre                  | Familia                             | Origen |
| ------------------------------ | ----------------------- | ----------------------------------- | ------ |
| `cima_vacuna_anti_hepatitis_b` | Vacuna Anti Hepatitis B | Hepatitis B, antigeno purificado de | CIMA   |

### Difteria-Haemophilus influenzae B- pertussis-poliomielitis- tetanos-hepatitis B — 1 entradas

| ID                                                                                       | Nombre                                                                             | Familia                                                                         | Origen |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------ |
| `cima_vacuna_anti_hepatitis_b___hinfluenzae_b___difteria___tetanos___tos_ferina___polio` | Vacuna Anti Hepatitis B + H.Influenzae B + Difteria + Tétanos + Tos Ferina + Polio | Difteria-Haemophilus influenzae B- pertussis-poliomielitis- tetanos-hepatitis B | CIMA   |

### zoster, antigeno purificado de — 1 entradas

| ID                               | Nombre                    | Familia                        | Origen |
| -------------------------------- | ------------------------- | ------------------------------ | ------ |
| `cima_vacuna_anti_herpes_zoster` | Vacuna Anti Herpes Zóster | zoster, antigeno purificado de | CIMA   |

### Meningococo A, C, Y, W-135, antigeno conjugado tetravalente, constituido por polisacaridos purificados — 1 entradas

| ID                                        | Nombre                             | Familia                                                                                                | Origen |
| ----------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------ | ------ |
| `cima_vacuna_anti_meningococo_a_c_w135_y` | Vacuna Anti Meningococo A/C/W135/Y | Meningococo A, C, Y, W-135, antigeno conjugado tetravalente, constituido por polisacaridos purificados | CIMA   |

### Meningococo B, vacuna multicomponente de — 1 entradas

| ID                               | Nombre                    | Familia                                  | Origen |
| -------------------------------- | ------------------------- | ---------------------------------------- | ------ |
| `cima_vacuna_anti_meningococo_b` | Vacuna Anti Meningococo B | Meningococo B, vacuna multicomponente de | CIMA   |

### Vacunas frente al meningococo — 1 entradas

| ID                               | Nombre                    | Familia                       | Origen |
| -------------------------------- | ------------------------- | ----------------------------- | ------ |
| `cima_vacuna_anti_meningococo_c` | Vacuna Anti Meningococo C | Vacunas frente al meningococo | CIMA   |

### Neumococo, antigeno constituido por polisacaridos purificados — 1 entradas

| ID                           | Nombre                | Familia                                                       | Origen |
| ---------------------------- | --------------------- | ------------------------------------------------------------- | ------ |
| `cima_vacuna_anti_neumococo` | Vacuna Anti Neumococo | Neumococo, antigeno constituido por polisacaridos purificados | CIMA   |

### Poliomielitis, inactivado, virus entero, trivalente — 1 entradas

| ID                       | Nombre            | Familia                                             | Origen |
| ------------------------ | ----------------- | --------------------------------------------------- | ------ |
| `cima_vacuna_anti_polio` | Vacuna Anti Polio | Poliomielitis, inactivado, virus entero, trivalente | CIMA   |

### Rabia, virus entero inactivado — 1 entradas

| ID                       | Nombre            | Familia                        | Origen |
| ------------------------ | ----------------- | ------------------------------ | ------ |
| `cima_vacuna_anti_rabia` | Vacuna Anti Rabia | Rabia, virus entero inactivado | CIMA   |

### Rotavirus, virus vivo atenuado — 1 entradas

| ID                           | Nombre                | Familia                        | Origen |
| ---------------------------- | --------------------- | ------------------------------ | ------ |
| `cima_vacuna_anti_rotavirus` | Vacuna Anti Rotavirus | Rotavirus, virus vivo atenuado | CIMA   |

### Sarampion, virus vivo atenuado combinado con la vacuna frente a la parotiditis y la rubeola — 1 entradas

| ID                                                   | Nombre                                        | Familia                                                                                     | Origen |
| ---------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------- | ------ |
| `cima_vacuna_anti_rubeola___sarampion___parotiditis` | Vacuna Anti Rubeola + Sarampión + Parotiditis | Sarampion, virus vivo atenuado combinado con la vacuna frente a la parotiditis y la rubeola | CIMA   |

### Sarampion, virus vivo atenuado combinado con la vacuna frente a la parotiditis, la varicela y la rubeola — 1 entradas

| ID                                                              | Nombre                                                   | Familia                                                                                                  | Origen |
| --------------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------ |
| `cima_vacuna_anti_rubeola___sarampion___parotiditis___varicela` | Vacuna Anti Rubeola + Sarampión + Parotiditis + Varicela | Sarampion, virus vivo atenuado combinado con la vacuna frente a la parotiditis, la varicela y la rubeola | CIMA   |

### Tifoidea, antigeno constituido por polisacarido purificado — 1 entradas

| ID                          | Nombre               | Familia                                                    | Origen |
| --------------------------- | -------------------- | ---------------------------------------------------------- | ------ |
| `cima_vacuna_anti_tifoidea` | Vacuna Anti Tifoidea | Tifoidea, antigeno constituido por polisacarido purificado | CIMA   |

### Varicela, virus vivo atenuado — 1 entradas

| ID                          | Nombre               | Familia                       | Origen |
| --------------------------- | -------------------- | ----------------------------- | ------ |
| `cima_vacuna_anti_varicela` | Vacuna Anti Varicela | Varicela, virus vivo atenuado | CIMA   |

### Chikunguña, virus vivo atenuado — 1 entradas

| ID                                   | Nombre                        | Familia                         | Origen |
| ------------------------------------ | ----------------------------- | ------------------------------- | ------ |
| `cima_vacuna_anti_virus_chikungunya` | Vacuna Anti Virus Chikungunya | Chikunguña, virus vivo atenuado | CIMA   |

### Papilomavirus (tipos humanos 16, 18) — 1 entradas

| ID                                       | Nombre                            | Familia                              | Origen |
| ---------------------------------------- | --------------------------------- | ------------------------------------ | ------ |
| `cima_vacuna_anti_virus_papiloma_humano` | Vacuna Anti Virus Papiloma Humano | Papilomavirus (tipos humanos 16, 18) | CIMA   |

### Vacunas frente al virus respiratorio sincitial — 1 entradas

| ID                                              | Nombre                                   | Familia                                        | Origen |
| ----------------------------------------------- | ---------------------------------------- | ---------------------------------------------- | ------ |
| `cima_vacuna_anti_virus_respiratorio_sincitial` | Vacuna Anti Virus Respiratorio Sincitial | Vacunas frente al virus respiratorio sincitial | CIMA   |

### Valerianae radix — 1 entradas

| ID                           | Nombre                | Familia          | Origen |
| ---------------------------- | --------------------- | ---------------- | ------ |
| `cima_valeriana_officinalis` | Valeriana Officinalis | Valerianae radix | CIMA   |

### Valsartan y amlodipino — 1 entradas

| ID                            | Nombre                 | Familia                | Origen |
| ----------------------------- | ---------------------- | ---------------------- | ------ |
| `cima_valsartan___amlodipino` | Valsartán + Amlodipino | Valsartan y amlodipino | CIMA   |

### Valsartan, amlodipino e hidroclorotiazida — 1 entradas

| ID                                                | Nombre                                     | Familia                                   | Origen |
| ------------------------------------------------- | ------------------------------------------ | ----------------------------------------- | ------ |
| `cima_valsartan___amlodipino___hidroclorotiazida` | Valsartán + Amlodipino + Hidroclorotiazida | Valsartan, amlodipino e hidroclorotiazida | CIMA   |

### Valsartan y diureticos — 1 entradas

| ID                                   | Nombre                        | Familia                | Origen |
| ------------------------------------ | ----------------------------- | ---------------------- | ------ |
| `cima_valsartan___hidroclorotiazida` | Valsartán + Hidroclorotiazida | Valsartan y diureticos | CIMA   |

### Vandetanib — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_vandetanib` | Vandetanib | Vandetanib | CIMA   |

### Velaglucerasa Alfa — 1 entradas

| ID                        | Nombre             | Familia            | Origen |
| ------------------------- | ------------------ | ------------------ | ------ |
| `cima_velaglucerasa_alfa` | Velaglucerasa Alfa | Velaglucerasa Alfa | CIMA   |

### Velmanasa alfa — 1 entradas

| ID                    | Nombre         | Familia        | Origen |
| --------------------- | -------------- | -------------- | ------ |
| `cima_velmanasa_alfa` | Velmanasa Alfa | Velmanasa alfa | CIMA   |

### Vemurafenib — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_vemurafenib` | Vemurafenib | Vemurafenib | CIMA   |

### Verde de indocianina — 1 entradas

| ID                          | Nombre               | Familia              | Origen |
| --------------------------- | -------------------- | -------------------- | ------ |
| `cima_verde_de_indocianina` | Verde De Indocianina | Verde de indocianina | CIMA   |

### Verteporfina — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_verteporfina` | Verteporfina | Verteporfina | CIMA   |

### Vestronidasa alfa — 1 entradas

| ID                       | Nombre            | Familia           | Origen |
| ------------------------ | ----------------- | ----------------- | ------ |
| `cima_vestronidasa_alfa` | Vestronidasa Alfa | Vestronidasa alfa | CIMA   |

### Metformina y vildagliptina — 1 entradas

| ID                                | Nombre                     | Familia                    | Origen |
| --------------------------------- | -------------------------- | -------------------------- | ------ |
| `cima_vildagliptina___metformina` | Vildagliptina + Metformina | Metformina y vildagliptina | CIMA   |

### Vinblastina — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_vinblastina` | Vinblastina | Vinblastina | CIMA   |

### Otros vasodilatadores perifericos — 1 entradas

| ID                           | Nombre                | Familia                           | Origen |
| ---------------------------- | --------------------- | --------------------------------- | ------ |
| `cima_vincamina___piracetam` | Vincamina + Piracetam | Otros vasodilatadores perifericos | CIMA   |

### Vinflunina — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_vinflunina` | Vinflunina | Vinflunina | CIMA   |

### Vinorelbina — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_vinorelbina` | Vinorelbina | Vinorelbina | CIMA   |

### Vinpocetina — 1 entradas

| ID                 | Nombre      | Familia     | Origen |
| ------------------ | ----------- | ----------- | ------ |
| `cima_vinpocetina` | Vinpocetina | Vinpocetina | CIMA   |

### Vismodegib — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_vismodegib` | Vismodegib | Vismodegib | CIMA   |

### Vitex agnus castus fruto — 1 entradas

| ID                        | Nombre             | Familia                  | Origen |
| ------------------------- | ------------------ | ------------------------ | ------ |
| `cima_vitex_agnus_castus` | Vitex Agnus Castus | Vitex agnus castus fruto | CIMA   |

### Otros agentes estabilizadores de capilares — 1 entradas

| ID                    | Nombre         | Familia                                    | Origen |
| --------------------- | -------------- | ------------------------------------------ | ------ |
| `cima_vitis_vinifera` | Vitis Vinifera | Otros agentes estabilizadores de capilares | CIMA   |

### Voclosporina — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_voclosporina` | Voclosporina | Voclosporina | CIMA   |

### Volanesorsen — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_volanesorsen` | Volanesorsen | Volanesorsen | CIMA   |

### Voretigen neparvovec — 1 entradas

| ID                          | Nombre               | Familia              | Origen |
| --------------------------- | -------------------- | -------------------- | ------ |
| `cima_voretigen_neparvovec` | Voretigén Neparvovec | Voretigen neparvovec | CIMA   |

### Vosoritida — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_vosoritida` | Vosoritida | Vosoritida | CIMA   |

### Vutrisiran — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_vutrisiran` | Vutrisirán | Vutrisiran | CIMA   |

### Xipamida — 1 entradas

| ID              | Nombre   | Familia  | Origen |
| --------------- | -------- | -------- | ------ |
| `cima_xipamida` | Xipamida | Xipamida | CIMA   |

### Itrio (90Y) citrato coloidal — 1 entradas

| ID                       | Nombre              | Familia                      | Origen |
| ------------------------ | ------------------- | ---------------------------- | ------ |
| `cima_ytrio_citrato_90y` | Ytrio Citrato (90Y) | Itrio (90Y) citrato coloidal | CIMA   |

### Productos radiofarmaceuticos terapeuticos, varios — 1 entradas

| ID                       | Nombre              | Familia                                           | Origen |
| ------------------------ | ------------------- | ------------------------------------------------- | ------ |
| `cima_ytrio_cloruro_90y` | Ytrio Cloruro (90Y) | Productos radiofarmaceuticos terapeuticos, varios | CIMA   |

### Zanubrutinib — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_zanubrutinib` | Zanubrutinib | Zanubrutinib | CIMA   |

### Ziconotida — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_ziconotida` | Ziconotida | Ziconotida | CIMA   |

### Zilucoplan — 1 entradas

| ID                | Nombre     | Familia    | Origen |
| ----------------- | ---------- | ---------- | ------ |
| `cima_zilucoplan` | Zilucoplán | Zilucoplan | CIMA   |

### Acetato de zinc — 1 entradas

| ID                  | Nombre       | Familia         | Origen |
| ------------------- | ------------ | --------------- | ------ |
| `cima_zinc_acetato` | Zinc Acetato | Acetato de zinc | CIMA   |

### Zinc acexamato — 1 entradas

| ID                    | Nombre         | Familia        | Origen |
| --------------------- | -------------- | -------------- | ------ |
| `cima_zinc_acexamato` | Zinc Acexamato | Zinc acexamato | CIMA   |

### Zopiclona — 1 entradas

| ID               | Nombre    | Familia   | Origen |
| ---------------- | --------- | --------- | ------ |
| `cima_zopiclona` | Zopiclona | Zopiclona | CIMA   |

### Zuclopentixol — 1 entradas

| ID                   | Nombre        | Familia       | Origen |
| -------------------- | ------------- | ------------- | ------ |
| `cima_zuclopentixol` | Zuclopentixol | Zuclopentixol | CIMA   |

### Acido aminolevulinico — 1 entradas

| ID                            | Nombre                  | Familia               | Origen |
| ----------------------------- | ----------------------- | --------------------- | ------ |
| `cima_acido_5aminolevulinico` | Ácido 5-Aminolevulínico | Acido aminolevulinico | CIMA   |

### Acido acetilsalicilico, combinaciones excluyendo psicolepticos — 1 entradas

| ID                                                | Nombre                                     | Familia                                                        | Origen |
| ------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------- | ------ |
| `cima_acido_acetilsalicilico___cafeina___tiamina` | Ácido Acetilsalicílico + Cafeína + Tiamina | Acido acetilsalicilico, combinaciones excluyendo psicolepticos | CIMA   |

### Acido alendronico — 1 entradas

| ID                       | Nombre            | Familia           | Origen |
| ------------------------ | ----------------- | ----------------- | ------ |
| `cima_acido_alendronico` | Ácido Alendrónico | Acido alendronico | CIMA   |

### Acido alendronico y colecalciferol — 1 entradas

| ID                                        | Nombre                             | Familia                            | Origen |
| ----------------------------------------- | ---------------------------------- | ---------------------------------- | ------ |
| `cima_acido_alendronico___colecalciferol` | Ácido Alendrónico + Colecalciferol | Acido alendronico y colecalciferol | CIMA   |

### Acido bempedoico y ezetimiba — 1 entradas

| ID                                  | Nombre                       | Familia                      | Origen |
| ----------------------------------- | ---------------------------- | ---------------------------- | ------ |
| `cima_acido_bempedoico___ezetimiba` | Ácido Bempedoico + Ezetimiba | Acido bempedoico y ezetimiba | CIMA   |

### Acido carglumico — 1 entradas

| ID                      | Nombre           | Familia          | Origen |
| ----------------------- | ---------------- | ---------------- | ------ |
| `cima_acido_carglumico` | Ácido Carglúmico | Acido carglumico | CIMA   |

### Acido colico — 1 entradas

| ID                  | Nombre       | Familia      | Origen |
| ------------------- | ------------ | ------------ | ------ |
| `cima_acido_colico` | Ácido Cólico | Acido colico | CIMA   |

### Tecnecio (99mTc) succimero — 1 entradas

| ID                                    | Nombre                           | Familia                    | Origen |
| ------------------------------------- | -------------------------------- | -------------------------- | ------ |
| `cima_acido_dimercaptosuccinico_dmsa` | Ácido Dimercaptosuccinico (Dmsa) | Tecnecio (99mTc) succimero | CIMA   |

### Acido espaglumico — 1 entradas

| ID                       | Nombre            | Familia           | Origen |
| ------------------------ | ----------------- | ----------------- | ------ |
| `cima_acido_espaglumico` | Ácido Espaglúmico | Acido espaglumico | CIMA   |

### Acido gadobenico — 1 entradas

| ID                      | Nombre           | Familia          | Origen |
| ----------------------- | ---------------- | ---------------- | ------ |
| `cima_acido_gadobenico` | Ácido Gadobénico | Acido gadobenico | CIMA   |

### Acido gadoterico — 1 entradas

| ID                      | Nombre           | Familia          | Origen |
| ----------------------- | ---------------- | ---------------- | ------ |
| `cima_acido_gadoterico` | Ácido Gadotérico | Acido gadoterico | CIMA   |

### Acido ibandronico — 1 entradas

| ID                       | Nombre            | Familia           | Origen |
| ------------------------ | ----------------- | ----------------- | ------ |
| `cima_acido_ibandronico` | Ácido Ibandrónico | Acido ibandronico | CIMA   |

### Acido mefenamico — 1 entradas

| ID                      | Nombre           | Familia          | Origen |
| ----------------------- | ---------------- | ---------------- | ------ |
| `cima_acido_mefenamico` | Ácido Mefenámico | Acido mefenamico | CIMA   |

### Acido micofenolico — 1 entradas

| ID                        | Nombre             | Familia            | Origen |
| ------------------------- | ------------------ | ------------------ | ------ |
| `cima_acido_micofenolico` | Ácido Micofenólico | Acido micofenolico | CIMA   |

### Acido niflumico — 1 entradas

| ID                     | Nombre          | Familia         | Origen |
| ---------------------- | --------------- | --------------- | ------ |
| `cima_acido_niflumico` | Ácido Niflúmico | Acido niflumico | CIMA   |

### Champues medicinales — 1 entradas

| ID                                              | Nombre                                     | Familia              | Origen |
| ----------------------------------------------- | ------------------------------------------ | -------------------- | ------ |
| `cima_acido_salicilico___coaltar_brea_de_hulla` | Ácido Salicílico + Coaltar (Brea De Hulla) | Champues medicinales | CIMA   |

### Selenio (75Se) acido tauroselcolico — 1 entradas

| ID                               | Nombre                      | Familia                             | Origen |
| -------------------------------- | --------------------------- | ----------------------------------- | ------ |
| `cima_acido_tauroselcolico_75se` | Ácido Tauroselcólico (75Se) | Selenio (75Se) acido tauroselcolico | CIMA   |
