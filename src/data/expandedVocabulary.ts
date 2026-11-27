import type { VocabularyItem } from '../types'

// Proposals from docs/curriculum-coverage-audit.md; not human-approved.
export const COUNTRY_FORMS = [
  [
    "hungary",
    "Magyarország",
    "Hungary",
    "magyar",
    "Hungarian",
    "magyarul",
    "Magyarországról"
  ],
  [
    "italy",
    "Olaszország",
    "Italy",
    "olasz",
    "Italian",
    "olaszul",
    "Olaszországból"
  ],
  [
    "russia",
    "Oroszország",
    "Russia",
    "orosz",
    "Russian",
    "oroszul",
    "Oroszországból"
  ],
  [
    "france",
    "Franciaország",
    "France",
    "francia",
    "French",
    "franciául",
    "Franciaországból"
  ],
  [
    "spain",
    "Spanyolország",
    "Spain",
    "spanyol",
    "Spanish",
    "spanyolul",
    "Spanyolországból"
  ],
  [
    "germany",
    "Németország",
    "Germany",
    "német",
    "German",
    "németül",
    "Németországból"
  ],
  [
    "sudan",
    "Szudán",
    "Sudan",
    "szudáni",
    "Sudanese",
    "arabul",
    "Szudánból"
  ],
  [
    "china",
    "Kína",
    "China",
    "kínai",
    "Chinese",
    "kínaiul",
    "Kínából"
  ],
  [
    "iran",
    "Irán",
    "Iran",
    "iráni",
    "Iranian",
    "perzsául",
    "Iránból"
  ],
  [
    "nigeria",
    "Nigéria",
    "Nigeria",
    "nigériai",
    "Nigerian",
    "angolul",
    "Nigériából"
  ],
  [
    "ghana",
    "Ghána",
    "Ghana",
    "ghánai",
    "Ghanaian",
    "angolul",
    "Ghánából"
  ],
  [
    "pakistan",
    "Pakisztán",
    "Pakistan",
    "pakisztáni",
    "Pakistani",
    "urduul",
    "Pakisztánból"
  ],
  [
    "yemen",
    "Jemen",
    "Yemen",
    "jemeni",
    "Yemeni",
    "arabul",
    "Jemenből"
  ],
  [
    "burma",
    "Burma",
    "Myanmar / Burma",
    "burmai",
    "Burmese",
    "burmaiul",
    "Burmából"
  ],
  [
    "england",
    "Anglia",
    "England",
    "angol",
    "English",
    "angolul",
    "Angliából"
  ],
  [
    "usa",
    "USA",
    "United States",
    "amerikai",
    "American",
    "angolul",
    "USA-ból"
  ],
  [
    "haiti",
    "Haiti",
    "Haiti",
    "haiti",
    "Haitian",
    "franciául",
    "Haitiből"
  ],
  [
    "indonesia",
    "Indonézia",
    "Indonesia",
    "indonéz",
    "Indonesian",
    "indonézül",
    "Indonéziából"
  ],
  [
    "japan",
    "Japán",
    "Japan",
    "japán",
    "Japanese",
    "japánul",
    "Japánból"
  ],
  [
    "canada",
    "Kanada",
    "Canada",
    "kanadai",
    "Canadian",
    "angolul / franciául",
    "Kanadából"
  ],
  [
    "cyprus",
    "Ciprus",
    "Cyprus",
    "ciprusi",
    "Cypriot",
    "görögül / törökül",
    "Ciprusról"
  ],
  [
    "austria",
    "Ausztria",
    "Austria",
    "osztrák",
    "Austrian",
    "németül",
    "Ausztriából"
  ],
  [
    "slovakia",
    "Szlovákia",
    "Slovakia",
    "szlovák",
    "Slovak",
    "szlovákul",
    "Szlovákiából"
  ],
  [
    "taiwan",
    "Tajvan",
    "Taiwan",
    "tajvani",
    "Taiwanese",
    "kínaiul",
    "Tajvanról"
  ],
  [
    "munich",
    "München",
    "Munich",
    "müncheni",
    "from Munich",
    "németül",
    "Münchenből"
  ],
  [
    "madrid",
    "Madrid",
    "Madrid",
    "madridi",
    "from Madrid",
    "spanyolul",
    "Madridból"
  ],
  [
    "athens",
    "Athén",
    "Athens",
    "athéni",
    "from Athens",
    "görögül",
    "Athénból"
  ]
] as const
export const PLURAL_FORMS = [
  [
    "fonendoszkop",
    "fonendoszkóp",
    "fonendoszkópok",
    "phonendoscopes / stethoscopes"
  ],
  [
    "vesetal",
    "vesetál",
    "vesetálak",
    "kidney dishes"
  ],
  [
    "injekcio",
    "injekció",
    "injekciók",
    "injections"
  ],
  [
    "ampulla",
    "ampulla",
    "ampullák",
    "ampoules"
  ],
  [
    "vattapamacs",
    "vattapamacs",
    "vattapamacsok",
    "cotton balls"
  ],
  [
    "erelszorito",
    "érelszorító",
    "érelszorítók",
    "tourniquets"
  ],
  [
    "ragtapasz",
    "ragtapasz",
    "ragtapaszok",
    "adhesive tapes"
  ],
  [
    "kuka",
    "kuka",
    "kukák",
    "bins"
  ],
  [
    "infuzio",
    "infúzió",
    "infúziók",
    "infusions"
  ],
  [
    "infuzios-allvany",
    "infúziós állvány",
    "infúziós állványok",
    "infusion stands"
  ],
  [
    "sebhintopor",
    "sebhintőpor",
    "sebhintőporok",
    "wound powders"
  ],
  [
    "ollo",
    "olló",
    "ollók",
    "pairs of scissors"
  ],
  [
    "gumikesztyu",
    "gumikesztyű",
    "gumikesztyűk",
    "rubber gloves"
  ],
  [
    "gyogyszeres-kocsi",
    "gyógyszeres kocsi",
    "gyógyszeres kocsik",
    "medicine trolleys"
  ],
  [
    "homero",
    "hőmérő",
    "hőmérők",
    "thermometers"
  ],
  [
    "lazmero",
    "lázmérő",
    "lázmérők",
    "clinical thermometers"
  ],
  [
    "vernyomasmero",
    "vérnyomásmérő",
    "vérnyomásmérők",
    "blood pressure monitors"
  ],
  [
    "borfertotlenito",
    "bőrfertőtlenítő",
    "bőrfertőtlenítők",
    "skin antiseptics"
  ],
  [
    "fecskendo",
    "fecskendő",
    "fecskendők",
    "syringes"
  ],
  [
    "tu",
    "tű",
    "tűk",
    "needles"
  ],
  [
    "vervetel",
    "vérvétel",
    "vérvételek",
    "blood draws"
  ],
  [
    "kemcso",
    "kémcső",
    "kémcsövek",
    "test tubes"
  ],
  [
    "branul",
    "branül",
    "branülök",
    "peripheral IV cannulas"
  ],
  [
    "kanul",
    "kanül",
    "kanülök",
    "cannulas"
  ],
  [
    "infuzios-szerelek",
    "infúziós szerelék",
    "infúziós szerelékek",
    "infusion sets"
  ],
  [
    "gyogyszer",
    "gyógyszer",
    "gyógyszerek",
    "medications"
  ],
  [
    "kotozes",
    "kötözés",
    "kötözések",
    "dressing procedures"
  ],
  [
    "kotozo-kocsi",
    "kötöző kocsi",
    "kötöző kocsik",
    "dressing trolleys"
  ],
  [
    "kotszer",
    "kötszer",
    "kötszerek",
    "dressings"
  ],
  [
    "gez",
    "géz",
    "gézek",
    "gauze materials"
  ],
  [
    "kenocs",
    "kenőcs",
    "kenőcsök",
    "ointments"
  ],
  [
    "csipesz",
    "csipesz",
    "csipeszek",
    "forceps / tweezers (plural)"
  ],
  [
    "korterem",
    "kórterem",
    "kórtermek",
    "patient rooms"
  ]
] as const
export const EXPANDED_VOCABULARY: VocabularyItem[] = [
  {
    "id": "greetings-extra-viszlat",
    "moduleId": "greetings",
    "hungarian": "Viszlát!",
    "english": "Bye! (informal)",
    "kind": "word",
    "sourcePages": [
      2
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "greetings-extra-bocsi",
    "moduleId": "greetings",
    "hungarian": "Bocsi!",
    "english": "Sorry! (informal)",
    "kind": "word",
    "sourcePages": [
      2
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "introductions-extra-hogy-van",
    "moduleId": "introductions",
    "hungarian": "Hogy van?",
    "english": "How are you? (formal)",
    "kind": "phrase",
    "sourcePages": [
      4
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "introductions-extra-age-example",
    "moduleId": "introductions",
    "hungarian": "Tizennyolc éves vagyok.",
    "english": "I am eighteen years old.",
    "kind": "phrase",
    "sourcePages": [
      3
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "introductions-extra-nationality-example",
    "moduleId": "introductions",
    "hungarian": "Burmai vagyok.",
    "english": "I am Burmese.",
    "kind": "phrase",
    "sourcePages": [
      3
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "introductions-extra-origin-example",
    "moduleId": "introductions",
    "hungarian": "Burmából jövök.",
    "english": "I come from Myanmar / Burma.",
    "kind": "phrase",
    "sourcePages": [
      3
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "introductions-extra-nursing-student",
    "moduleId": "introductions",
    "hungarian": "Ápolóhallgató vagyok.",
    "english": "I am a nursing student.",
    "kind": "phrase",
    "sourcePages": [
      4
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "introductions-extra-study-example",
    "moduleId": "introductions",
    "hungarian": "A Semmelweis Egyetemen tanulok.",
    "english": "I study at Semmelweis University.",
    "kind": "phrase",
    "sourcePages": [
      4
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "introductions-extra-language-example",
    "moduleId": "introductions",
    "hungarian": "Beszélek angolul, burmaiul és egy kicsit magyarul.",
    "english": "I speak English, Burmese and a little Hungarian.",
    "kind": "phrase",
    "sourcePages": [
      4
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "introductions-extra-location-example",
    "moduleId": "introductions",
    "hungarian": "Most Budapesten, Magyarországon élek.",
    "english": "I currently live in Budapest, Hungary.",
    "kind": "phrase",
    "sourcePages": [
      4
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "introductions-extra-jol-vagyok",
    "moduleId": "introductions",
    "hungarian": "Jól vagyok.",
    "english": "I am fine.",
    "kind": "phrase",
    "sourcePages": [
      4
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-mikor-magyarora",
    "moduleId": "numbers-time",
    "hungarian": "Mikor van a magyaróra?",
    "english": "When is the Hungarian lesson?",
    "kind": "phrase",
    "sourcePages": [
      8
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-hany-orakor-magyarora",
    "moduleId": "numbers-time",
    "hungarian": "Hány órakor van a magyaróra?",
    "english": "At what time is the Hungarian lesson?",
    "kind": "phrase",
    "sourcePages": [
      8
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-hany-oratol",
    "moduleId": "numbers-time",
    "hungarian": "Hány órától?",
    "english": "From what time?",
    "kind": "phrase",
    "sourcePages": [
      8
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-hany-oraig",
    "moduleId": "numbers-time",
    "hungarian": "Hány óráig?",
    "english": "Until what time?",
    "kind": "phrase",
    "sourcePages": [
      8
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-szul",
    "moduleId": "numbers-time",
    "hungarian": "szül",
    "english": "give birth",
    "kind": "word",
    "sourcePages": [
      8
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-szuletes",
    "moduleId": "numbers-time",
    "hungarian": "születés",
    "english": "birth",
    "kind": "word",
    "sourcePages": [
      8
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-szuletesnap",
    "moduleId": "numbers-time",
    "hungarian": "születésnap",
    "english": "birthday",
    "kind": "word",
    "sourcePages": [
      8
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-boldog-szuletesnapot",
    "moduleId": "numbers-time",
    "hungarian": "Boldog születésnapot!",
    "english": "Happy birthday!",
    "kind": "phrase",
    "sourcePages": [
      8
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-fel-tizenegy",
    "moduleId": "numbers-time",
    "hungarian": "fél tizenegy",
    "english": "10:30 (half past ten)",
    "kind": "phrase",
    "sourcePages": [
      9
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-tiz-ora-harminc",
    "moduleId": "numbers-time",
    "hungarian": "tíz óra harminc",
    "english": "10:30 (ten thirty)",
    "kind": "phrase",
    "sourcePages": [
      9
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-tiz-ora-harminc-perc",
    "moduleId": "numbers-time",
    "hungarian": "tíz óra harminc perc",
    "english": "10:30 (ten hours thirty minutes)",
    "kind": "phrase",
    "sourcePages": [
      9
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-delelott-fel-tizenegy",
    "moduleId": "numbers-time",
    "hungarian": "délelőtt fél tizenegy",
    "english": "10:30 a.m.",
    "kind": "phrase",
    "sourcePages": [
      9
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-delelott-tiz-ora-harminc-perc",
    "moduleId": "numbers-time",
    "hungarian": "délelőtt tíz óra harminc perc",
    "english": "10:30 a.m.",
    "kind": "phrase",
    "sourcePages": [
      9
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-negyed-tizkor",
    "moduleId": "numbers-time",
    "hungarian": "negyed tízkor",
    "english": "at 9:15 (quarter past nine)",
    "kind": "phrase",
    "sourcePages": [
      9
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-kilenc-tizenotkor",
    "moduleId": "numbers-time",
    "hungarian": "kilenc tizenötkor",
    "english": "at 9:15",
    "kind": "phrase",
    "sourcePages": [
      9
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-kilenc-ora-tizenotkor",
    "moduleId": "numbers-time",
    "hungarian": "kilenc óra tizenötkor",
    "english": "at 9:15",
    "kind": "phrase",
    "sourcePages": [
      9
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-kilenc-ora-tizenot-perckor",
    "moduleId": "numbers-time",
    "hungarian": "kilenc óra tizenöt perckor",
    "english": "at 9:15",
    "kind": "phrase",
    "sourcePages": [
      9
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-reggel-negyed-tizkor",
    "moduleId": "numbers-time",
    "hungarian": "reggel negyed tízkor",
    "english": "at 9:15 a.m.",
    "kind": "phrase",
    "sourcePages": [
      9
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-delelott-kilenc-ora-tizenotkor",
    "moduleId": "numbers-time",
    "hungarian": "délelőtt kilenc óra tizenötkor",
    "english": "at 9:15 a.m.",
    "kind": "phrase",
    "sourcePages": [
      9
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-mikor",
    "moduleId": "numbers-time",
    "hungarian": "Mikor?",
    "english": "When?",
    "kind": "word",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-delben",
    "moduleId": "numbers-time",
    "hungarian": "délben",
    "english": "at noon",
    "kind": "word",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-tizenkettokor",
    "moduleId": "numbers-time",
    "hungarian": "tizenkettőkor",
    "english": "at twelve",
    "kind": "word",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-tizenket-orakor",
    "moduleId": "numbers-time",
    "hungarian": "tizenkét órakor",
    "english": "at twelve",
    "kind": "phrase",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-pontban-tizenkettokor",
    "moduleId": "numbers-time",
    "hungarian": "pontban tizenkettőkor",
    "english": "at exactly twelve",
    "kind": "phrase",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-hanytol-reggeli",
    "moduleId": "numbers-time",
    "hungarian": "Hánytól van a reggeli?",
    "english": "From what time is breakfast?",
    "kind": "phrase",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-hany-oratol-ebed",
    "moduleId": "numbers-time",
    "hungarian": "Hány órától van az ebéd?",
    "english": "From what time is lunch?",
    "kind": "phrase",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-mikortol-vacsora",
    "moduleId": "numbers-time",
    "hungarian": "Mikortól van a vacsora?",
    "english": "From when is dinner?",
    "kind": "phrase",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-nyolctol",
    "moduleId": "numbers-time",
    "hungarian": "nyolctól",
    "english": "from eight",
    "kind": "word",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-nyolc-oratol",
    "moduleId": "numbers-time",
    "hungarian": "nyolc órától",
    "english": "from eight",
    "kind": "phrase",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-hanyig-latogatas",
    "moduleId": "numbers-time",
    "hungarian": "Hányig van a látogatás?",
    "english": "Until what time is visiting?",
    "kind": "phrase",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-hany-oraig-vizit",
    "moduleId": "numbers-time",
    "hungarian": "Hány óráig van a vizit?",
    "english": "Until what time are rounds?",
    "kind": "phrase",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-meddig-gyogyszereles",
    "moduleId": "numbers-time",
    "hungarian": "Meddig van a gyógyszerelés?",
    "english": "Until when does medication administration last?",
    "kind": "phrase",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-hetig",
    "moduleId": "numbers-time",
    "hungarian": "hétig",
    "english": "until seven",
    "kind": "word",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-este-hetig",
    "moduleId": "numbers-time",
    "hungarian": "este hétig",
    "english": "until 7 p.m.",
    "kind": "phrase",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-tizenkilenc-oraig",
    "moduleId": "numbers-time",
    "hungarian": "tizenkilenc óráig",
    "english": "until 19:00",
    "kind": "phrase",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-reggeli",
    "moduleId": "numbers-time",
    "hungarian": "reggeli",
    "english": "breakfast",
    "kind": "word",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-ebed",
    "moduleId": "numbers-time",
    "hungarian": "ebéd",
    "english": "lunch",
    "kind": "word",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-vacsora",
    "moduleId": "numbers-time",
    "hungarian": "vacsora",
    "english": "dinner",
    "kind": "word",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-gyogyszereles",
    "moduleId": "numbers-time",
    "hungarian": "gyógyszerelés",
    "english": "medication administration",
    "kind": "word",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-vizit",
    "moduleId": "numbers-time",
    "hungarian": "vizit",
    "english": "ward rounds",
    "kind": "word",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-latogatas",
    "moduleId": "numbers-time",
    "hungarian": "látogatás",
    "english": "visit / visiting",
    "kind": "word",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-ehes",
    "moduleId": "numbers-time",
    "hungarian": "éhes",
    "english": "hungry",
    "kind": "word",
    "sourcePages": [
      10
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-fel-tizenketto",
    "moduleId": "numbers-time",
    "hungarian": "fél tizenkettő",
    "english": "11:30",
    "kind": "phrase",
    "sourcePages": [
      11
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-delutan-negyed-negy",
    "moduleId": "numbers-time",
    "hungarian": "délután negyed négy",
    "english": "15:15",
    "kind": "phrase",
    "sourcePages": [
      11
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-delutan-fel-het",
    "moduleId": "numbers-time",
    "hungarian": "délután fél hét",
    "english": "18:30",
    "kind": "phrase",
    "sourcePages": [
      11
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-reggel-haromnegyed-hat",
    "moduleId": "numbers-time",
    "hungarian": "reggel háromnegyed hat",
    "english": "05:45",
    "kind": "phrase",
    "sourcePages": [
      11
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-delelott-negyed-tiz",
    "moduleId": "numbers-time",
    "hungarian": "délelőtt negyed tíz",
    "english": "09:15",
    "kind": "phrase",
    "sourcePages": [
      11
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "numbers-time-extra-este-haromnegyed-tizenegy",
    "moduleId": "numbers-time",
    "hungarian": "este háromnegyed tizenegy",
    "english": "22:45",
    "kind": "phrase",
    "sourcePages": [
      11
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "appointments-extra-boldog",
    "moduleId": "appointments",
    "hungarian": "boldog",
    "english": "happy",
    "kind": "word",
    "sourcePages": [
      11
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "appointments-extra-seb",
    "moduleId": "appointments",
    "hungarian": "seb",
    "english": "wound",
    "kind": "word",
    "sourcePages": [
      11
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "appointments-extra-no",
    "moduleId": "appointments",
    "hungarian": "nő",
    "english": "woman",
    "kind": "word",
    "sourcePages": [
      11
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "appointments-extra-szules",
    "moduleId": "appointments",
    "hungarian": "szülés",
    "english": "childbirth",
    "kind": "word",
    "sourcePages": [
      11
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "appointments-extra-gyermek",
    "moduleId": "appointments",
    "hungarian": "gyermek",
    "english": "child",
    "kind": "word",
    "sourcePages": [
      11
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "appointments-extra-en-rendelek",
    "moduleId": "appointments",
    "hungarian": "én rendelek",
    "english": "I hold consultations",
    "kind": "phrase",
    "sourcePages": [
      11
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "appointments-extra-te-rendelsz",
    "moduleId": "appointments",
    "hungarian": "te rendelsz",
    "english": "you hold consultations (informal)",
    "kind": "phrase",
    "sourcePages": [
      11
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "appointments-extra-on-rendel",
    "moduleId": "appointments",
    "hungarian": "Ön rendel",
    "english": "you hold consultations (formal)",
    "kind": "phrase",
    "sourcePages": [
      11
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "appointments-extra-o-rendel",
    "moduleId": "appointments",
    "hungarian": "ő rendel",
    "english": "he / she holds consultations",
    "kind": "phrase",
    "sourcePages": [
      11
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "appointments-extra-gyermekorvos-schedule",
    "moduleId": "appointments",
    "hungarian": "Hány órától hány óráig rendel a gyermekorvos?",
    "english": "From what time to what time does the pediatrician hold consultations?",
    "kind": "phrase",
    "sourcePages": [
      11
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "hospital-objects-extra-kep",
    "moduleId": "hospital-objects",
    "hungarian": "kép",
    "english": "picture",
    "kind": "word",
    "sourcePages": [
      13
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "hospital-objects-extra-mi-van-kepen",
    "moduleId": "hospital-objects",
    "hungarian": "Mi van a képen?",
    "english": "What is in the picture? (singular)",
    "kind": "phrase",
    "sourcePages": [
      13
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "hospital-objects-extra-mik-vannak-kepen",
    "moduleId": "hospital-objects",
    "hungarian": "Mik vannak a képen?",
    "english": "What things are in the picture? (plural)",
    "kind": "phrase",
    "sourcePages": [
      13
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "hospital-objects-extra-van-vesetal",
    "moduleId": "hospital-objects",
    "hungarian": "Van egy vesetál a kórteremben.",
    "english": "There is an emesis basin in the patient room.",
    "kind": "phrase",
    "sourcePages": [
      13
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "hospital-objects-extra-nincs-ampulla",
    "moduleId": "hospital-objects",
    "hungarian": "Nincs ampulla a kórteremben.",
    "english": "There is no ampoule in the patient room.",
    "kind": "phrase",
    "sourcePages": [
      13
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "hospital-objects-extra-van-homero",
    "moduleId": "hospital-objects",
    "hungarian": "Van hőmérő a kórteremben?",
    "english": "Is there a thermometer in the patient room?",
    "kind": "phrase",
    "sourcePages": [
      13
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "hospital-objects-extra-igen",
    "moduleId": "hospital-objects",
    "hungarian": "Igen.",
    "english": "Yes.",
    "kind": "word",
    "sourcePages": [
      13
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "hospital-objects-extra-igen-van",
    "moduleId": "hospital-objects",
    "hungarian": "Igen, van.",
    "english": "Yes, there is.",
    "kind": "phrase",
    "sourcePages": [
      13
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "hospital-objects-extra-van",
    "moduleId": "hospital-objects",
    "hungarian": "Van.",
    "english": "There is.",
    "kind": "word",
    "sourcePages": [
      13
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "hospital-objects-extra-nem",
    "moduleId": "hospital-objects",
    "hungarian": "Nem.",
    "english": "No.",
    "kind": "word",
    "sourcePages": [
      13
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "hospital-objects-extra-nincs",
    "moduleId": "hospital-objects",
    "hungarian": "Nincs.",
    "english": "There isn't.",
    "kind": "word",
    "sourcePages": [
      13
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "hospital-objects-extra-sajnos-nincs",
    "moduleId": "hospital-objects",
    "hungarian": "Sajnos nincs.",
    "english": "Unfortunately, there isn't.",
    "kind": "phrase",
    "sourcePages": [
      13
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "hospital-objects-extra-hanyadik-emelet",
    "moduleId": "hospital-objects",
    "hungarian": "Hányadik emeleten van a labor?",
    "english": "On which floor is the lab?",
    "kind": "phrase",
    "sourcePages": [
      15
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "hospital-objects-extra-az-elson",
    "moduleId": "hospital-objects",
    "hungarian": "Az elsőn.",
    "english": "On the first floor.",
    "kind": "phrase",
    "sourcePages": [
      15
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "hospital-objects-extra-es-ct",
    "moduleId": "hospital-objects",
    "hungarian": "És a CT?",
    "english": "And the CT?",
    "kind": "phrase",
    "sourcePages": [
      15
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "hospital-objects-extra-a-masodikon",
    "moduleId": "hospital-objects",
    "hungarian": "A másodikon.",
    "english": "On the second floor.",
    "kind": "phrase",
    "sourcePages": [
      15
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "hospital-objects-extra-hol-lift",
    "moduleId": "hospital-objects",
    "hungarian": "És hol a lift?",
    "english": "And where is the lift?",
    "kind": "phrase",
    "sourcePages": [
      15
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "hospital-objects-extra-ott-balra",
    "moduleId": "hospital-objects",
    "hungarian": "Ott balra.",
    "english": "Over there to the left.",
    "kind": "phrase",
    "sourcePages": [
      15
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "hospital-objects-extra-lift",
    "moduleId": "hospital-objects",
    "hungarian": "lift",
    "english": "lift / elevator",
    "kind": "word",
    "sourcePages": [
      15
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "hospital-objects-extra-labor",
    "moduleId": "hospital-objects",
    "hungarian": "labor",
    "english": "laboratory",
    "kind": "word",
    "sourcePages": [
      15
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "hospital-objects-extra-balra",
    "moduleId": "hospital-objects",
    "hungarian": "balra",
    "english": "to the left",
    "kind": "word",
    "sourcePages": [
      15
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "departments-extra-traumatologia",
    "moduleId": "departments",
    "hungarian": "traumatológia",
    "english": "traumatology",
    "kind": "word",
    "sourcePages": [
      16
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "departments-extra-pszichiater",
    "moduleId": "departments",
    "hungarian": "pszichiáter",
    "english": "psychiatrist",
    "kind": "word",
    "sourcePages": [
      16
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "departments-extra-hang",
    "moduleId": "departments",
    "hungarian": "hang",
    "english": "sound / voice",
    "kind": "word",
    "sourcePages": [
      16
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "departments-extra-ki-sebeszet",
    "moduleId": "departments",
    "hungarian": "Ki dolgozik a sebészeten?",
    "english": "Who works in the surgery department?",
    "kind": "phrase",
    "sourcePages": [
      17
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "departments-extra-a-sebesz",
    "moduleId": "departments",
    "hungarian": "A sebész.",
    "english": "The surgeon.",
    "kind": "phrase",
    "sourcePages": [
      17
    ],
    "verified": false,
    "notes": "Normalized proposal from curriculum coverage audit; pending human review."
  },
  {
    "id": "introductions-country-hungary",
    "moduleId": "introductions",
    "hungarian": "Magyarország",
    "english": "Hungary",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-hungary",
    "moduleId": "introductions",
    "hungarian": "magyar",
    "english": "Hungarian (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-hungary",
    "moduleId": "introductions",
    "hungarian": "Magyarországról",
    "english": "from Hungary",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-italy",
    "moduleId": "introductions",
    "hungarian": "Olaszország",
    "english": "Italy",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-italy",
    "moduleId": "introductions",
    "hungarian": "olasz",
    "english": "Italian (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-italy",
    "moduleId": "introductions",
    "hungarian": "Olaszországból",
    "english": "from Italy",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-russia",
    "moduleId": "introductions",
    "hungarian": "Oroszország",
    "english": "Russia",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-russia",
    "moduleId": "introductions",
    "hungarian": "orosz",
    "english": "Russian (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-russia",
    "moduleId": "introductions",
    "hungarian": "Oroszországból",
    "english": "from Russia",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-france",
    "moduleId": "introductions",
    "hungarian": "Franciaország",
    "english": "France",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-france",
    "moduleId": "introductions",
    "hungarian": "francia",
    "english": "French (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-france",
    "moduleId": "introductions",
    "hungarian": "Franciaországból",
    "english": "from France",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-spain",
    "moduleId": "introductions",
    "hungarian": "Spanyolország",
    "english": "Spain",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-spain",
    "moduleId": "introductions",
    "hungarian": "spanyol",
    "english": "Spanish (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-spain",
    "moduleId": "introductions",
    "hungarian": "Spanyolországból",
    "english": "from Spain",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-germany",
    "moduleId": "introductions",
    "hungarian": "Németország",
    "english": "Germany",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-germany",
    "moduleId": "introductions",
    "hungarian": "német",
    "english": "German (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-germany",
    "moduleId": "introductions",
    "hungarian": "Németországból",
    "english": "from Germany",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-sudan",
    "moduleId": "introductions",
    "hungarian": "Szudán",
    "english": "Sudan",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-sudan",
    "moduleId": "introductions",
    "hungarian": "szudáni",
    "english": "Sudanese (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-sudan",
    "moduleId": "introductions",
    "hungarian": "Szudánból",
    "english": "from Sudan",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-china",
    "moduleId": "introductions",
    "hungarian": "Kína",
    "english": "China",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-china",
    "moduleId": "introductions",
    "hungarian": "kínai",
    "english": "Chinese (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-china",
    "moduleId": "introductions",
    "hungarian": "Kínából",
    "english": "from China",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-iran",
    "moduleId": "introductions",
    "hungarian": "Irán",
    "english": "Iran",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-iran",
    "moduleId": "introductions",
    "hungarian": "iráni",
    "english": "Iranian (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-iran",
    "moduleId": "introductions",
    "hungarian": "Iránból",
    "english": "from Iran",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-nigeria",
    "moduleId": "introductions",
    "hungarian": "Nigéria",
    "english": "Nigeria",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-nigeria",
    "moduleId": "introductions",
    "hungarian": "nigériai",
    "english": "Nigerian (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-nigeria",
    "moduleId": "introductions",
    "hungarian": "Nigériából",
    "english": "from Nigeria",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-ghana",
    "moduleId": "introductions",
    "hungarian": "Ghána",
    "english": "Ghana",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-ghana",
    "moduleId": "introductions",
    "hungarian": "ghánai",
    "english": "Ghanaian (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-ghana",
    "moduleId": "introductions",
    "hungarian": "Ghánából",
    "english": "from Ghana",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-pakistan",
    "moduleId": "introductions",
    "hungarian": "Pakisztán",
    "english": "Pakistan",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-pakistan",
    "moduleId": "introductions",
    "hungarian": "pakisztáni",
    "english": "Pakistani (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-pakistan",
    "moduleId": "introductions",
    "hungarian": "Pakisztánból",
    "english": "from Pakistan",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-yemen",
    "moduleId": "introductions",
    "hungarian": "Jemen",
    "english": "Yemen",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-yemen",
    "moduleId": "introductions",
    "hungarian": "jemeni",
    "english": "Yemeni (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-yemen",
    "moduleId": "introductions",
    "hungarian": "Jemenből",
    "english": "from Yemen",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-burma",
    "moduleId": "introductions",
    "hungarian": "Burma",
    "english": "Myanmar / Burma",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-burma",
    "moduleId": "introductions",
    "hungarian": "burmai",
    "english": "Burmese (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-burma",
    "moduleId": "introductions",
    "hungarian": "Burmából",
    "english": "from Myanmar / Burma",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-england",
    "moduleId": "introductions",
    "hungarian": "Anglia",
    "english": "England",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-england",
    "moduleId": "introductions",
    "hungarian": "angol",
    "english": "English (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-england",
    "moduleId": "introductions",
    "hungarian": "Angliából",
    "english": "from England",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-usa",
    "moduleId": "introductions",
    "hungarian": "USA",
    "english": "United States",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-usa",
    "moduleId": "introductions",
    "hungarian": "amerikai",
    "english": "American (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-usa",
    "moduleId": "introductions",
    "hungarian": "USA-ból",
    "english": "from United States",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-haiti",
    "moduleId": "introductions",
    "hungarian": "Haiti",
    "english": "Haiti",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-haiti",
    "moduleId": "introductions",
    "hungarian": "haiti",
    "english": "Haitian (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-haiti",
    "moduleId": "introductions",
    "hungarian": "Haitiből",
    "english": "from Haiti",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-indonesia",
    "moduleId": "introductions",
    "hungarian": "Indonézia",
    "english": "Indonesia",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-indonesia",
    "moduleId": "introductions",
    "hungarian": "indonéz",
    "english": "Indonesian (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-indonesia",
    "moduleId": "introductions",
    "hungarian": "Indonéziából",
    "english": "from Indonesia",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-japan",
    "moduleId": "introductions",
    "hungarian": "Japán",
    "english": "Japan",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-japan",
    "moduleId": "introductions",
    "hungarian": "japán",
    "english": "Japanese (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-japan",
    "moduleId": "introductions",
    "hungarian": "Japánból",
    "english": "from Japan",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-canada",
    "moduleId": "introductions",
    "hungarian": "Kanada",
    "english": "Canada",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-canada",
    "moduleId": "introductions",
    "hungarian": "kanadai",
    "english": "Canadian (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-canada",
    "moduleId": "introductions",
    "hungarian": "Kanadából",
    "english": "from Canada",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-cyprus",
    "moduleId": "introductions",
    "hungarian": "Ciprus",
    "english": "Cyprus",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-cyprus",
    "moduleId": "introductions",
    "hungarian": "ciprusi",
    "english": "Cypriot (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-cyprus",
    "moduleId": "introductions",
    "hungarian": "Ciprusról",
    "english": "from Cyprus",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-austria",
    "moduleId": "introductions",
    "hungarian": "Ausztria",
    "english": "Austria",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-austria",
    "moduleId": "introductions",
    "hungarian": "osztrák",
    "english": "Austrian (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-austria",
    "moduleId": "introductions",
    "hungarian": "Ausztriából",
    "english": "from Austria",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-slovakia",
    "moduleId": "introductions",
    "hungarian": "Szlovákia",
    "english": "Slovakia",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-slovakia",
    "moduleId": "introductions",
    "hungarian": "szlovák",
    "english": "Slovak (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-slovakia",
    "moduleId": "introductions",
    "hungarian": "Szlovákiából",
    "english": "from Slovakia",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-taiwan",
    "moduleId": "introductions",
    "hungarian": "Tajvan",
    "english": "Taiwan",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-taiwan",
    "moduleId": "introductions",
    "hungarian": "tajvani",
    "english": "Taiwanese (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-taiwan",
    "moduleId": "introductions",
    "hungarian": "Tajvanról",
    "english": "from Taiwan",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-munich",
    "moduleId": "introductions",
    "hungarian": "München",
    "english": "Munich",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-munich",
    "moduleId": "introductions",
    "hungarian": "müncheni",
    "english": "from Munich (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-munich",
    "moduleId": "introductions",
    "hungarian": "Münchenből",
    "english": "from Munich",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-madrid",
    "moduleId": "introductions",
    "hungarian": "Madrid",
    "english": "Madrid",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-madrid",
    "moduleId": "introductions",
    "hungarian": "madridi",
    "english": "from Madrid (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-madrid",
    "moduleId": "introductions",
    "hungarian": "Madridból",
    "english": "from Madrid",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-country-athens",
    "moduleId": "introductions",
    "hungarian": "Athén",
    "english": "Athens",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Country/city form; audit proposal."
  },
  {
    "id": "introductions-adjective-athens",
    "moduleId": "introductions",
    "hungarian": "athéni",
    "english": "from Athens (adjective)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Nationality or place adjective; audit proposal."
  },
  {
    "id": "introductions-origin-athens",
    "moduleId": "introductions",
    "hungarian": "Athénból",
    "english": "from Athens",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Origin suffix; audit proposal."
  },
  {
    "id": "introductions-language-hungarian",
    "moduleId": "introductions",
    "hungarian": "magyarul",
    "english": "in Hungarian (language)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Language adverb, e.g. beszélek magyarul; audit proposal."
  },
  {
    "id": "introductions-language-italian",
    "moduleId": "introductions",
    "hungarian": "olaszul",
    "english": "in Italian (language)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Language adverb, e.g. beszélek magyarul; audit proposal."
  },
  {
    "id": "introductions-language-russian",
    "moduleId": "introductions",
    "hungarian": "oroszul",
    "english": "in Russian (language)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Language adverb, e.g. beszélek magyarul; audit proposal."
  },
  {
    "id": "introductions-language-french",
    "moduleId": "introductions",
    "hungarian": "franciául",
    "english": "in French (language)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Language adverb, e.g. beszélek magyarul; audit proposal."
  },
  {
    "id": "introductions-language-spanish",
    "moduleId": "introductions",
    "hungarian": "spanyolul",
    "english": "in Spanish (language)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Language adverb, e.g. beszélek magyarul; audit proposal."
  },
  {
    "id": "introductions-language-german",
    "moduleId": "introductions",
    "hungarian": "németül",
    "english": "in German (language)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Language adverb, e.g. beszélek magyarul; audit proposal."
  },
  {
    "id": "introductions-language-arabic",
    "moduleId": "introductions",
    "hungarian": "arabul",
    "english": "in Arabic (language)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Language adverb, e.g. beszélek magyarul; audit proposal."
  },
  {
    "id": "introductions-language-chinese",
    "moduleId": "introductions",
    "hungarian": "kínaiul",
    "english": "in Chinese (language)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Language adverb, e.g. beszélek magyarul; audit proposal."
  },
  {
    "id": "introductions-language-persian",
    "moduleId": "introductions",
    "hungarian": "perzsául",
    "english": "in Persian (language)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Language adverb, e.g. beszélek magyarul; audit proposal."
  },
  {
    "id": "introductions-language-english",
    "moduleId": "introductions",
    "hungarian": "angolul",
    "english": "in English (language)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Language adverb, e.g. beszélek magyarul; audit proposal."
  },
  {
    "id": "introductions-language-urdu",
    "moduleId": "introductions",
    "hungarian": "urduul",
    "english": "in Urdu (language)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Language adverb, e.g. beszélek magyarul; audit proposal."
  },
  {
    "id": "introductions-language-burmese",
    "moduleId": "introductions",
    "hungarian": "burmaiul",
    "english": "in Burmese (language)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Language adverb, e.g. beszélek magyarul; audit proposal."
  },
  {
    "id": "introductions-language-indonesian",
    "moduleId": "introductions",
    "hungarian": "indonézül",
    "english": "in Indonesian (language)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Language adverb, e.g. beszélek magyarul; audit proposal."
  },
  {
    "id": "introductions-language-japanese",
    "moduleId": "introductions",
    "hungarian": "japánul",
    "english": "in Japanese (language)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Language adverb, e.g. beszélek magyarul; audit proposal."
  },
  {
    "id": "introductions-language-greek",
    "moduleId": "introductions",
    "hungarian": "görögül",
    "english": "in Greek (language)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Language adverb, e.g. beszélek magyarul; audit proposal."
  },
  {
    "id": "introductions-language-turkish",
    "moduleId": "introductions",
    "hungarian": "törökül",
    "english": "in Turkish (language)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Language adverb, e.g. beszélek magyarul; audit proposal."
  },
  {
    "id": "introductions-language-slovak",
    "moduleId": "introductions",
    "hungarian": "szlovákul",
    "english": "in Slovak (language)",
    "kind": "word",
    "sourcePages": [
      6
    ],
    "verified": false,
    "notes": "Language adverb, e.g. beszélek magyarul; audit proposal."
  },
  {
    "id": "hospital-objects-plural-fonendoszkop",
    "moduleId": "hospital-objects",
    "hungarian": "fonendoszkópok",
    "english": "phonendoscopes / stethoscopes",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of fonendoszkóp; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-vesetal",
    "moduleId": "hospital-objects",
    "hungarian": "vesetálak",
    "english": "kidney dishes",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of vesetál; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-injekcio",
    "moduleId": "hospital-objects",
    "hungarian": "injekciók",
    "english": "injections",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of injekció; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-ampulla",
    "moduleId": "hospital-objects",
    "hungarian": "ampullák",
    "english": "ampoules",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of ampulla; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-vattapamacs",
    "moduleId": "hospital-objects",
    "hungarian": "vattapamacsok",
    "english": "cotton balls",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of vattapamacs; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-erelszorito",
    "moduleId": "hospital-objects",
    "hungarian": "érelszorítók",
    "english": "tourniquets",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of érelszorító; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-ragtapasz",
    "moduleId": "hospital-objects",
    "hungarian": "ragtapaszok",
    "english": "adhesive tapes",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of ragtapasz; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-kuka",
    "moduleId": "hospital-objects",
    "hungarian": "kukák",
    "english": "bins",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of kuka; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-infuzio",
    "moduleId": "hospital-objects",
    "hungarian": "infúziók",
    "english": "infusions",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of infúzió; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-infuzios-allvany",
    "moduleId": "hospital-objects",
    "hungarian": "infúziós állványok",
    "english": "infusion stands",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of infúziós állvány; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-sebhintopor",
    "moduleId": "hospital-objects",
    "hungarian": "sebhintőporok",
    "english": "wound powders",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of sebhintőpor; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-ollo",
    "moduleId": "hospital-objects",
    "hungarian": "ollók",
    "english": "pairs of scissors",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of olló; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-gumikesztyu",
    "moduleId": "hospital-objects",
    "hungarian": "gumikesztyűk",
    "english": "rubber gloves",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of gumikesztyű; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-gyogyszeres-kocsi",
    "moduleId": "hospital-objects",
    "hungarian": "gyógyszeres kocsik",
    "english": "medicine trolleys",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of gyógyszeres kocsi; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-homero",
    "moduleId": "hospital-objects",
    "hungarian": "hőmérők",
    "english": "thermometers",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of hőmérő; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-lazmero",
    "moduleId": "hospital-objects",
    "hungarian": "lázmérők",
    "english": "clinical thermometers",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of lázmérő; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-vernyomasmero",
    "moduleId": "hospital-objects",
    "hungarian": "vérnyomásmérők",
    "english": "blood pressure monitors",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of vérnyomásmérő; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-borfertotlenito",
    "moduleId": "hospital-objects",
    "hungarian": "bőrfertőtlenítők",
    "english": "skin antiseptics",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of bőrfertőtlenítő; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-fecskendo",
    "moduleId": "hospital-objects",
    "hungarian": "fecskendők",
    "english": "syringes",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of fecskendő; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-tu",
    "moduleId": "hospital-objects",
    "hungarian": "tűk",
    "english": "needles",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of tű; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-vervetel",
    "moduleId": "hospital-objects",
    "hungarian": "vérvételek",
    "english": "blood draws",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of vérvétel; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-kemcso",
    "moduleId": "hospital-objects",
    "hungarian": "kémcsövek",
    "english": "test tubes",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of kémcső; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-branul",
    "moduleId": "hospital-objects",
    "hungarian": "branülök",
    "english": "peripheral IV cannulas",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of branül; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-kanul",
    "moduleId": "hospital-objects",
    "hungarian": "kanülök",
    "english": "cannulas",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of kanül; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-infuzios-szerelek",
    "moduleId": "hospital-objects",
    "hungarian": "infúziós szerelékek",
    "english": "infusion sets",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of infúziós szerelék; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-gyogyszer",
    "moduleId": "hospital-objects",
    "hungarian": "gyógyszerek",
    "english": "medications",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of gyógyszer; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-kotozes",
    "moduleId": "hospital-objects",
    "hungarian": "kötözések",
    "english": "dressing procedures",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of kötözés; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-kotozo-kocsi",
    "moduleId": "hospital-objects",
    "hungarian": "kötöző kocsik",
    "english": "dressing trolleys",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of kötöző kocsi; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-kotszer",
    "moduleId": "hospital-objects",
    "hungarian": "kötszerek",
    "english": "dressings",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of kötszer; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-gez",
    "moduleId": "hospital-objects",
    "hungarian": "gézek",
    "english": "gauze materials",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of géz; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-kenocs",
    "moduleId": "hospital-objects",
    "hungarian": "kenőcsök",
    "english": "ointments",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of kenőcs; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-csipesz",
    "moduleId": "hospital-objects",
    "hungarian": "csipeszek",
    "english": "forceps / tweezers (plural)",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of csipesz; normalized audit proposal."
  },
  {
    "id": "hospital-objects-plural-korterem",
    "moduleId": "hospital-objects",
    "hungarian": "kórtermek",
    "english": "patient rooms",
    "kind": "word",
    "sourcePages": [
      14
    ],
    "verified": false,
    "notes": "Plural of kórterem; normalized audit proposal."
  }
]
