# Curriculum coverage and language audit

Scope: all 18 PDF pages were visually inspected (page 1 is cover art; page 18 blank). Compared the 198 current repository records (197 active preview entries plus one rejected placeholder) with the original notes. This is a model-assisted review, not a fluent-speaker sign-off. The companion CSV preserves the current IDs and original fields, and adds proposed glosses/dispositions. It does not flip verified flags.

## Release findings

- 4 legitimate Hungarian entries lack evidence at the cited locations: diák (p5), időpont (p11), ágy (p12), gyógyszertár (p17). Keep their IDs; decide whether to exclude them or explicitly classify them as supplemental vocabulary.
- 4 page-16 entries have red X marks: gyógytorna, intenzív, gyermekosztály, fertőző osztály. They are valid terms but the annotation's curricular meaning is unknown.
- 2 exact Hungarian duplicate groups across modules: kardiológus (pp4,11), urológus (pp5,11). They are authentic repetitions, not errors. Do not delete stable IDs. Avoid duplicate questions when doing mixed practice and consider shared mastery.
- Same-meaning or overlapping terms must not be used as competing answers: Mi a neve?/Hogy hívják?, Mi a nemzetisége?/Milyen nemzetiségű?, Hány óra van?/Mennyi az idő?, Hánykor?/Hány órakor?, rendelés/rendelési idő, hőmérő/lázmérő, branül/kanül, beteg/páciens, ápoló/nővér, gyógyszertár/patika, Szia/Helló/Viszlát, Szívesen/Nincs mit. Existing slash-based quiz filtering does not capture every paraphrase; use explicit equivalence groups and context tags rather than only string equality.
- Source errors already corrected: kétezer (2000, p7 source incorrectly repeats kétszáz); infúzió (infusion, p12 incorrectly says infection); gyógyszerész (pharmacist, p16 incorrectly says pharmacy).
- Source p17 answers "A sebészet" for who works in surgery; correct answer is "A sebész." Source p16 handwriting appears to say "hallott" and gloss death: halott = dead/deceased, hallott = heard, halál = death. Hold this ambiguous line for review.
- Source p11 note labels szülés as midwife; szülés is childbirth, szülésznő is midwife, szülészorvos is obstetrician. Source p14 includes singular vesetál and infúziós állvány under plurals: vesetálak and infúziós állványok are the plural forms. These are source corrections, not evidence that the current app is wrong.
- Do not turn the example address, phone number, or personal identity in the source into published cards or audio. Use generic templates or fictional examples instead.
- The CSV includes all 198 current rows, including source-confirmed entries still marked provisional. No approval, audio asset or application code change in this audit.

## Missing material by PDF page

### 2–5: greetings, introductions and answers

| Page | Proposed Hungarian | English / note |
|---|---|---|
| 2 | Viszlát! | Bye! |
| 2 | Bocsi! | Sorry! (informal; correct handwritten spelling) |
| 3–4 | Hogy van? | How are you? (formal, p4) |
| 3 | Tizennyolc éves vagyok. | I am eighteen years old. (correct compound spelling) |
| 3–4 | Burmai vagyok. | I am Burmese. |
| 3–4 | Burmából jövök. | I come from Burma/Myanmar. (correct source's place suffix) |
| 3–4 | Ápolóhallgató vagyok. | I am a nursing student. |
| 3–4 | A Semmelweis Egyetemen tanulok. | I study at Semmelweis University. |
| 3–4 | Beszélek angolul, burmaiul és egy kicsit magyarul. | I speak English, Burmese and a little Hungarian. |
| 3–4 | Most Budapesten, Magyarországon élek. | I currently live in Budapest, Hungary. |
| 3–4 | A nevem … / … vagyok. | My name is … / I am … (template; no source name) |
| 4 | Jól vagyok. | I am fine. (normalized source's unnatural "Én jó vagyok") |
| 4 | A címem … / A telefonszámom … | My address is … / My phone number is … (templates; do not record the ellipsis or publish private details) |

### 6: countries, adjectives, languages and origins

The entire printed table is missing from the current curriculum. Proposed normalized forms (each row may become a reference table and several targeted exercises; not every country has one exclusive language).

| Place | Adjective | Speak language | From |
|---|---|---|---|
| Magyarország | magyar | magyarul | Magyarországról |
| Olaszország | olasz | olaszul | Olaszországból |
| Oroszország | orosz | oroszul | Oroszországból |
| Franciaország | francia | franciául | Franciaországból |
| Spanyolország | spanyol | spanyolul | Spanyolországból |
| Németország | német | németül | Németországból |
| Szudán | szudáni | arabul | Szudánból |
| Kína | kínai | kínaiul | Kínából |
| Irán | iráni | perzsául / farsziul | Iránból |
| Nigéria | nigériai | angolul | Nigériából |
| Ghána | ghánai | angolul | Ghánából |
| Pakisztán | pakisztáni | urduul | Pakisztánból |
| Jemen | jemeni | arabul | Jemenből |
| Burma | burmai | burmaiul | Burmából |
| Anglia | angol | angolul | Angliából |
| USA | amerikai | angolul | USA-ból |
| Haiti | haiti | franciául / haiti kreolul | Haitiből |
| Indonézia | indonéz | indonézül (review source table variant indonézul) | Indonéziából |
| Japán | japán | japánul | Japánból |
| Kanada | kanadai | angolul / franciául | Kanadából |
| Ciprus | ciprusi | görögül / törökül | Ciprusról |
| Ausztria | osztrák | németül | Ausztriából |
| Szlovákia | szlovák | szlovákul | Szlovákiából |
| Tajvan | tajvani | kínaiul | Tajvanról |
| München | müncheni | németül | Münchenből |
| Madrid | madridi | spanyolul | Madridból |
| Athén | athéni | görögül | Athénból |

Grammar topics absent: back/front vowels, -ul/-ül, -ból/-ből and -ról/-ről, a/az article choice. Avoid the oversimplification that the last vowel alone always determines suffix choice. Pages use example languages rather than exhaustive national-language lists. Treat these as language-form exercises, not geography claims. Teach English place/adjective translations before assessing them.

### 7–11: numbers, telling time, schedule questions

Numbers on p7 are substantially covered. Missing source expressions and normalized answers:

| Page | Hungarian | English |
|---|---|---|
| 8 | Mikor van a magyaróra? | When is the Hungarian lesson? |
| 8 | Hány órakor van a magyaróra? | At what time is the Hungarian lesson? |
| 8 | Hány órától? | From what time? |
| 8 | Hány óráig? | Until what time? |
| 8 | szül / születés / születésnap | give birth / birth / birthday |
| 8 | Boldog születésnapot! | Happy birthday! |
| 9 | fél tizenegy | half past ten (10:30) |
| 9 | tíz óra harminc / tíz óra harminc perc | ten thirty (10:30) |
| 9 | délelőtt fél tizenegy / délelőtt tíz óra harminc perc | 10:30 a.m. |
| 9 | negyed tízkor | at quarter past nine (9:15) |
| 9 | kilenc tizenötkor / kilenc óra tizenötkor / kilenc óra tizenöt perckor | at 9:15 |
| 9 | reggel negyed tízkor / délelőtt kilenc óra tizenötkor | at 9:15 a.m. |
| 10 | Mikor? | When? |
| 10 | délben | at noon |
| 10 | tizenkettőkor / tizenkét órakor | at twelve |
| 10 | pontban tizenkettőkor | at exactly twelve |
| 10 | Hánytól van a reggeli? | From what time is breakfast? |
| 10 | Hány órától van az ebéd? | From what time is lunch? |
| 10 | Mikortól van a vacsora? | From when is dinner? |
| 10 | nyolctól / nyolc órától | from eight |
| 10 | Hányig van a látogatás? | Until what time is visiting? |
| 10 | Hány óráig van a vizit? | Until what time are rounds? |
| 10 | Meddig van a gyógyszerelés? | Until when does medication administration last? |
| 10 | hétig / este hétig / tizenkilenc óráig | until seven / until 7 p.m. / until 19:00 |
| 10 | reggeli / ebéd / vacsora | breakfast / lunch / dinner |
| 10 | gyógyszerelés | medication administration |
| 10 | vizit / látogatás | ward rounds / visit |
| 10 | éhes | hungry |
| 11 | boldog | happy |
| 11 | seb / bel / nő / szülés / gyermek | wound / interior / woman / childbirth / child (component vocabulary; bel is not a general standalone adjective meaning internal) |
| 11 | én rendelek; te rendelsz; Ön rendel; ő rendel | I/you (informal)/you (formal)/he or she hold consultations (clinical sense) |
| 11 | Hány órától hány óráig rendel a gyermekorvos? | From what time to what time does the pediatrician hold consultations? (complete source's elliptical question) |
| 11 | fél tizenkettő | 11:30 |
| 11 | délután negyed négy | 15:15 |
| 11 | délután fél hét | 18:30 |
| 11 | reggel háromnegyed hat | 05:45 |
| 11 | délelőtt negyed tíz | 09:15 |
| 11 | este háromnegyed tizenegy | 22:45 |
| 11 | Hogy van magyarul …? | How do you say … in Hungarian? |

Time expressions name the upcoming hour: negyed tíz=9:15, fél tíz=9:30, háromnegyed tíz=9:45. Treat same-time answers as equivalent, not distractors. Add explicit time exercises with digits or a clock; do not rely on memorizing one translation per equivalent form. Use contextual examples rather than implying the source's sample meals/ward schedules are real.

### 12–15: ward grammar and navigation

Page 12 singular equipment list is largely covered. Page 13 contains missing question/answer structures; page 14 contains missing plurals.

| Page | Hungarian | English |
|---|---|---|
| 13 | kép | picture |
| 13 | Mi van a képen? / Mik vannak a képen? | What is in the picture? / What things are in the picture? |
| 13 | Van egy vesetál a kórteremben. | There is an emesis basin in the patient room. |
| 13 | Nincs ampulla a kórteremben. | There is no ampoule in the patient room. |
| 13 | Van hőmérő a kórteremben? | Is there a thermometer in the patient room? |
| 13 | Igen. / Igen, van. / Van. | Yes. / Yes, there is. / There is. |
| 13 | Nem. / Nincs. / Sajnos nincs. | No. / There isn't. / Unfortunately, there isn't. |
| 15 | Hányadik emeleten van a labor? | On which floor is the lab? |
| 15 | Az elsőn. | On the first floor. |
| 15 | És a CT? | And the CT? |
| 15 | A másodikon. | On the second floor. |
| 15 | És hol a lift? | And where is the lift? |
| 15 | Ott balra. | Over there to the left. |
| 15 | lift / labor / balra | lift/elevator / lab / to the left (components) |

Plural forms from p14 (correcting the singular entries and normalizing accents; English is corresponding plural of the singular vocabulary): fonendoszkópok, vesetálak, injekciók, ampullák, vattapamacsok, érelszorítók, ragtapaszok, kukák, infúziók, infúziós állványok, sebhintőporok, ollók, gumikesztyűk, gyógyszeres kocsik, hőmérők, lázmérők, vérnyomásmérők, bőrfertőtlenítők, fecskendők, tűk, vérvételek, kémcsövek (source appears to use kémcsők; kémcsövek is standard plural), branülök, kanülök, infúziós szerelékek, gyógyszerek, kötözések, kötöző kocsik, kötszerek, gézek, kenőcsök, csipeszek, kórtermek. Use a dedicated singular/plural exercise. In Hungarian, "high/low vowels" in these notes refer to front/back vowel harmony rather than phonetic tongue height; linking vowels are not fully predictable.

### 16–17: departments and role-play

| Page | Hungarian | English / status |
|---|---|---|
| 16 | traumatológia | traumatology |
| 16 | ortopéd orvos / ortopéd szakorvos | orthopedic doctor / specialist (normalized proposed form; handwriting unclear) |
| 16 | pszichiáter | psychiatrist |
| 16 | hang | sound / voice |
| 16 | halott / halál / hallott | deceased / death / heard (source ambiguous; hold) |
| 17 | Ki dolgozik a sebészeten? | Who works in the surgery department? |
| 17 | A sebész. | The surgeon. (source answer wrongly names department) |
| 17 | Hol dolgozik …? | Where does … work? (generic template) |

Page 17 asks for department-to-profession matching, hospital-map directions and doctor/patient oral role-play. Proposed exercises should use previously learned terms: e.g. Ki dolgozik a kardiológián? A kardiológus. These are authored examples, not verbatim source lines. A map is referenced but not actually supplied in the notes; do not invent an institution-specific layout.

## Pronunciation QA

Piper generation and both voice playback are confirmed by the user's local tests. No WAV files were available for listening or inspection during this audit, so neither voice is certified. Keep each recording marked pending separately for Anna and Imre. Ask a fluent Hungarian speaker to check exact text, naturalness, vowel length (o/ó, ö/ő, u/ú, ü/ű), consonants (gy, ny, sz, s, cs, zs), initial word stress, question intonation and long compounds. Include CT (cé té), MR (em er), numbers and clock expressions; validate abbreviation reading with a speaker before choosing synthesis text. Review eight existing comparison samples plus tű, hőmérő, fecskendő, érelszorító, gyógyszeres kocsi, háromnegyed tizenegy, Magyarországról and the formal patient questions. For each approved clip record source/model hash, text, reviewer and redistribution terms; regenerate only changed/new text, and do not approve automatically on successful synthesis. For medical use this is educational vocabulary, not clinical interpretation or instructions.

## Selected external terminology references

- University of Debrecen: official English Health Visitor designation, https://etk.unideb.hu/szakvedono-mesterkepzesi-szak
- Hungarian training qualification terminology: mentőtiszt (Paramedic), szülésznő (Midwife), https://njt.jog.gov.hu/jogszabaly/2010-24-20-1W
- Semmelweis clinical titles including szülész-nőgyógyász: https://semmelweis.hu/noiklinika/baross/munkatarsak-baross/
- Hungarian medical standards terminology including infektológiai (fertőző) osztály: https://net.jogtar.hu/jogszabaly?docid=A0300060.ESC
- Hungarian language advice on ortopéd orvos: https://e-nyelv.hu/2021-11-03/ortoped-sebesz-orvos/

The sources support terminology distinctions; they do not establish presence in the handwritten PDF. Page references above are the PDF's physical page numbers. All additions remain proposals until checked against the course expectations and approved.
