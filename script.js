"use strict";

/* =========================================================
   LA CAÇA D'ANDRÉS
   Sistema de joc, preguntes, XP, guardians i professor.
   ========================================================= */

const CONFIG = {
  studentUser: "vegalamejor",
  studentPassword: "hastaquenosaquesdiecesnotelacambio",
  teacherUser: "Andresito",
  teacherPassword: "soysupersexy",
  copyPassword: "201322",
  storageKey: "cacaAndresSaveV1",
  questionsPerLevel: 10,
  xpPerCorrectAnswer: 10,
  guardianMinimumCorrect: 7
};

const KINGDOMS = {
  letters: {
    name: "El Regne de les Lletres",
    first: 1,
    last: 25,
    boss: 26,
    bossName: "El Guardià de les Lletres",
    key: "key26",
    status: "guardianStatus26",
    color: "#d7b779",
    topics: ["Ortografia", "Accentuació", "Apòstrofs", "Puntuació"]
  },
  stories: {
    name: "El Regne de les Històries",
    first: 27,
    last: 51,
    boss: 52,
    bossName: "El Senyor de les Històries",
    key: "key52",
    status: "guardianStatus52",
    color: "#b4c8ed",
    topics: ["Comprensió lectora", "Personatges", "Idees principals"]
  },
  grammar: {
    name: "El Regne de la Gramàtica",
    first: 53,
    last: 77,
    boss: 78,
    bossName: "El Mestre de la Gramàtica",
    key: "key78",
    status: "guardianStatus78",
    color: "#b7d3a5",
    topics: ["Noms", "Verbs", "Adjectius", "Frases"]
  },
  words: {
    name: "El Regne de les Paraules",
    first: 79,
    last: 103,
    boss: 104,
    bossName: "El Sobirà de les Paraules",
    key: "key104",
    status: "guardianStatus104",
    color: "#d1b0df",
    topics: ["Vocabulari", "Sinònims", "Antònims", "Expressió"]
  }
};

const BOSS_LEVELS = {
  26: "letters",
  52: "stories",
  78: "grammar",
  104: "words"
};

const COPY_TEXTS = [
  {
    title: "El bosc després de la pluja",
    text: "Després de la pluja, el bosc brillava sota la llum del sol. Les fulles tenien petites gotes d'aigua i els ocells tornaven a cantar. La Júlia va trobar un camí estret que conduïa fins a una font amagada entre les roques."
  },
  {
    title: "La biblioteca antiga",
    text: "A la plaça del poble hi havia una biblioteca molt antiga. Les seves finestres eren altes i les prestatgeries arribaven gairebé fins al sostre. En Pau hi anava cada dissabte per llegir històries d'aventures i descobrir paraules noves."
  },
  {
    title: "Un viatge inesperat",
    text: "La Martina i el seu germà van pujar al tren ben d'hora. Volien visitar un poble de muntanya, però una tempesta va obligar el tren a aturar-se. Mentre esperaven, una dona amable els va explicar una llegenda sobre un castell abandonat."
  },
  {
    title: "El mercat de dissabte",
    text: "Cada dissabte, el mercat s'omple de parades de fruita, pa i flors. Els venedors saluden els clients i expliquen d'on provenen els seus productes. La mare compra pomes, formatge i un ram de flors grogues per a la taula del menjador."
  }
];

/* ---------------------------------------------------------
   BANCS DE PREGUNTES
   Les preguntes s'adapten al tema i al tram de nivell.
   --------------------------------------------------------- */

const QUESTION_BANKS = {
  letters: [
    {
      difficulty: 1,
      topic: "Ortografia",
      q: "Quina paraula està escrita correctament?",
      a: ["Casa", "Caza", "Kasa", "Cassa"],
      correct: 0,
      why: "La forma correcta és «casa»."
    },
    {
      difficulty: 1,
      topic: "Ortografia",
      q: "Completa: «La ___ és blava».",
      a: ["mar", "marr", "maar", "màr"],
      correct: 0,
      why: "S'escriu «mar»."
    },
    {
      difficulty: 1,
      topic: "Accentuació",
      q: "Quina paraula porta accent gràfic?",
      a: ["Camio", "Camió", "Camioo", "Camioh"],
      correct: 1,
      why: "«Camió» porta accent a la o."
    },
    {
      difficulty: 1,
      topic: "Accentuació",
      q: "Quina és la forma correcta?",
      a: ["Escola", "Ésc ola", "Es cóla", "Escolà"],
      correct: 0,
      why: "«Escola» no porta accent gràfic."
    },
    {
      difficulty: 1,
      topic: "Puntuació",
      q: "Quin signe posem al final d'una pregunta?",
      a: [".", "!", "?", ","],
      correct: 2,
      why: "Les preguntes acaben amb un signe d'interrogació."
    },
    {
      difficulty: 1,
      topic: "Apòstrofs",
      q: "Completa: «___ arbre és alt».",
      a: ["El", "L'", "La", "Els"],
      correct: 1,
      why: "Davant de «arbre», escrivim «l'arbre»."
    },
    {
      difficulty: 1,
      topic: "Ortografia",
      q: "Quina paraula està ben escrita?",
      a: ["Germà", "Germá", "Jermà", "Germàn"],
      correct: 0,
      why: "La forma correcta és «germà»."
    },
    {
      difficulty: 1,
      topic: "Puntuació",
      q: "Quin signe expressa sorpresa?",
      a: [",", ":", "!", ";"],
      correct: 2,
      why: "El signe d'exclamació expressa sorpresa o emoció."
    },
    {
      difficulty: 2,
      topic: "Accentuació",
      q: "Quina paraula està ben accentuada?",
      a: ["Pèsol", "Pesól", "Pésol", "Pesol"],
      correct: 0,
      why: "S'escriu «pèsol», amb accent obert."
    },
    {
      difficulty: 2,
      topic: "Apòstrofs",
      q: "Quina opció és correcta?",
      a: ["La amiga", "L'amiga", "L amiga", "L'amigà"],
      correct: 1,
      why: "S'apostrofa l'article femení davant de «amiga»."
    },
    {
      difficulty: 2,
      topic: "Accentuació",
      q: "Quina paraula és aguda i porta accent?",
      a: ["Música", "Fàcil", "Cançó", "Casa"],
      correct: 2,
      why: "«Cançó» és aguda i acaba en vocal."
    },
    {
      difficulty: 2,
      topic: "Puntuació",
      q: "Quina frase està puntuada correctament?",
      a: [
        "Hola com estàs.",
        "Hola, com estàs?",
        "Hola com, estàs?",
        "Hola? com estàs,"
      ],
      correct: 1,
      why: "La coma separa la salutació i la pregunta acaba amb «?»."
    },
    {
      difficulty: 2,
      topic: "Ortografia",
      q: "Quina paraula conté una dièresi?",
      a: ["Raïm", "Raim", "Ràim", "Raiím"],
      correct: 0,
      why: "«Raïm» porta dièresi sobre la i."
    },
    {
      difficulty: 2,
      topic: "Ortografia",
      q: "Completa correctament: «Els ___ juguen al pati».",
      a: ["nens", "nenss", "nensh", "nenssos"],
      correct: 0,
      why: "El plural de «nen» és «nens»."
    },
    {
      difficulty: 2,
      topic: "Accentuació",
      q: "Quina paraula porta accent obert?",
      a: ["Més", "Mésa", "Mesa", "Mesó"],
      correct: 0,
      why: "«Més» s'escriu amb accent obert."
    },
    {
      difficulty: 3,
      topic: "Ortografia",
      q: "Quina frase està escrita correctament?",
      a: [
        "Ahir vam anar al parc.",
        "Ayer vam anar al parc.",
        "Ahir ban anar al parc.",
        "Ahir vam anà al parc."
      ],
      correct: 0,
      why: "La frase correcta és «Ahir vam anar al parc»."
    },
    {
      difficulty: 3,
      topic: "Accentuació",
      q: "Quina paraula és esdrúixola?",
      a: ["Camió", "Música", "Paper", "Carrer"],
      correct: 1,
      why: "«Música» és esdrúixola i sempre porta accent."
    },
    {
      difficulty: 3,
      topic: "Apòstrofs",
      q: "Quina opció és correcta?",
      a: ["La universitat", "L'universitat", "L universitat", "L'universitát"],
      correct: 0,
      why: "Davant de «universitat», el femení «la» no s'apostrofa."
    },
    {
      difficulty: 3,
      topic: "Puntuació",
      q: "Quina frase utilitza bé els dos punts?",
      a: [
        "He comprat: pa, llet i fruita.",
        "He comprat pa: llet i fruita.",
        "He comprat pa, llet: i fruita.",
        "He: comprat pa, llet i fruita."
      ],
      correct: 0,
      why: "Els dos punts poden introduir una enumeració."
    },
    {
      difficulty: 3,
      topic: "Accentuació",
      q: "Quina paraula està escrita correctament?",
      a: ["Anglès", "Angles", "Anglés", "Àngles"],
      correct: 0,
      why: "La forma correcta és «anglès»."
    }
  ],

  stories: [
    {
      difficulty: 1,
      topic: "Comprensió lectora",
      q: "Llegeix: «La Berta va anar al parc amb el seu gos». On va anar la Berta?",
      a: ["A la platja", "Al parc", "A l'escola", "A la muntanya"],
      correct: 1,
      why: "El text diu que va anar al parc."
    },
    {
      difficulty: 1,
      topic: "Comprensió lectora",
      q: "«En Marc es va posar l'abric perquè feia fred». Per què se'l va posar?",
      a: ["Perquè plovia", "Perquè feia fred", "Per jugar", "Per dormir"],
      correct: 1,
      why: "El text indica que feia fred."
    },
    {
      difficulty: 1,
      topic: "Personatges",
      q: "Qui és el protagonista d'una història?",
      a: ["El personatge principal", "El títol", "El lloc", "L'última frase"],
      correct: 0,
      why: "El protagonista és el personatge principal."
    },
    {
      difficulty: 1,
      topic: "Comprensió lectora",
      q: "«La Jana va plantar una llavor. Cada dia la regava i, al cap d'un temps, va créixer una flor». Què va créixer?",
      a: ["Un arbre", "Una flor", "Una fruita", "Una pedra"],
      correct: 1,
      why: "La llavor va acabar convertint-se en una flor."
    },
    {
      difficulty: 1,
      topic: "Idees principals",
      q: "Què explica principalment un conte?",
      a: ["Una història", "Una llista de números", "Una recepta sempre", "Un diccionari"],
      correct: 0,
      why: "Un conte narra una història."
    },
    {
      difficulty: 1,
      topic: "Comprensió lectora",
      q: "«En Biel va obrir el paraigua quan va començar a ploure». Quin objecte va obrir?",
      a: ["Una finestra", "Una motxilla", "Un paraigua", "Un llibre"],
      correct: 2,
      why: "Va obrir el paraigua per protegir-se de la pluja."
    },
    {
      difficulty: 2,
      topic: "Comprensió lectora",
      q: "«La Laia va arribar tard perquè l'autobús s'havia avariat». Quina va ser la causa del retard?",
      a: ["Es va perdre", "L'autobús es va avariar", "Va dormir al parc", "Va ploure molt"],
      correct: 1,
      why: "El text explica que l'autobús s'havia avariat."
    },
    {
      difficulty: 2,
      topic: "Idees principals",
      q: "«Els arbres donen ombra, serveixen de refugi als animals i ajuden a mantenir l'aire net». Quina és la idea principal?",
      a: ["Els arbres són útils", "Tots els arbres són iguals", "Els animals no necessiten refugi", "L'ombra és fosca"],
      correct: 0,
      why: "La frase presenta diversos beneficis dels arbres."
    },
    {
      difficulty: 2,
      topic: "Personatges",
      q: "«En Nil va compartir el berenar amb un company que no en tenia». Quin valor demostra en Nil?",
      a: ["Egoisme", "Generositat", "Impaciència", "Por"],
      correct: 1,
      why: "Compartir amb algú que ho necessita és un gest generós."
    },
    {
      difficulty: 2,
      topic: "Comprensió lectora",
      q: "«La botiga tancava a les sis. A les sis i deu, la porta ja era tancada». La botiga era oberta a les sis i deu?",
      a: ["Sí", "No", "Només al matí", "El text no parla de cap botiga"],
      correct: 1,
      why: "El text diu que la porta ja era tancada."
    },
    {
      difficulty: 2,
      topic: "Seqüència",
      q: "Què acostuma a aparèixer al començament d'un conte?",
      a: ["La presentació dels personatges i del lloc", "Només la solució", "La llista de pàgines", "La biografia de l'autor sempre"],
      correct: 0,
      why: "Al començament se solen presentar els personatges i la situació."
    },
    {
      difficulty: 2,
      topic: "Vocabulari del text",
      q: "En una història, si un personatge està «amoïnat», com se sent?",
      a: ["Preocupat", "Adormit", "Famolenc sempre", "Molt alt"],
      correct: 0,
      why: "«Amoïnat» vol dir preocupat o intranquil."
    },
    {
      difficulty: 3,
      topic: "Inferències",
      q: "«En arribar a casa, la Mar tenia les sabates plenes de fang i duia un paraigua mullat». Què podem deduir?",
      a: ["Probablement ha plogut", "Ha estat tot el dia al llit", "No ha sortit de casa", "Ha estat a la neu segur"],
      correct: 0,
      why: "El fang i el paraigua mullat fan pensar que ha plogut."
    },
    {
      difficulty: 3,
      topic: "Idees principals",
      q: "Què és un resum?",
      a: ["Una còpia exacta de cada frase", "Una explicació breu de les idees principals", "Una opinió sense relació", "Una llista de paraules difícils"],
      correct: 1,
      why: "Un resum presenta breument la informació essencial."
    },
    {
      difficulty: 3,
      topic: "Comprensió lectora",
      q: "«En Roc va estudiar tota la setmana i va revisar els exercicis abans de l'examen». Quina conclusió és més raonable?",
      a: ["S'ha preparat per a l'examen", "No sabia que hi havia examen", "No va fer cap exercici", "Va perdre tots els llibres"],
      correct: 0,
      why: "Estudiar i revisar exercicis són formes de preparar-se."
    },
    {
      difficulty: 3,
      topic: "Narració",
      q: "Quina part d'una narració sol explicar com es resol el problema?",
      a: ["El desenllaç", "El títol sempre", "La portada", "L'índex"],
      correct: 0,
      why: "El desenllaç presenta la resolució final de la història."
    },
    {
      difficulty: 3,
      topic: "Inferències",
      q: "«La nena va mirar el pastís, va encendre les espelmes i va cridar els seus amics». Quina situació és probable?",
      a: ["Una celebració d'aniversari", "Un entrenament de natació", "Una classe de matemàtiques", "Una excursió nocturna segur"],
      correct: 0,
      why: "El pastís, les espelmes i els amics suggereixen una celebració."
    },
    {
      difficulty: 3,
      topic: "Comprensió lectora",
      q: "Quina pregunta ajuda a identificar la causa d'un fet?",
      a: ["Per què ha passat?", "De quin color és el títol?", "Quantes lletres té el nom?", "Quina és l'última paraula?"],
      correct: 0,
      why: "«Per què?» ens ajuda a trobar la causa."
    },
    {
      difficulty: 3,
      topic: "Narració",
      q: "Què és el narrador?",
      a: ["La veu que explica la història", "El lector que compra el llibre", "El títol del conte", "Sempre el personatge més jove"],
      correct: 0,
      why: "El narrador és qui explica els fets."
    },
    {
      difficulty: 3,
      topic: "Vocabulari del text",
      q: "Si el camí era «estret», com era?",
      a: ["Poc ample", "Molt llarg necessàriament", "Ple de flors segur", "Sempre fosc"],
      correct: 0,
      why: "«Estret» vol dir que té poca amplada."
    }
  ],

  grammar: [
    {
      difficulty: 1,
      topic: "Noms",
      q: "Quina d'aquestes paraules és un nom?",
      a: ["Córrer", "Taula", "Ràpid", "Bonica"],
      correct: 1,
      why: "«Taula» és un nom que designa una cosa."
    },
    {
      difficulty: 1,
      topic: "Verbs",
      q: "Quina paraula és un verb?",
      a: ["Casa", "Verd", "Saltar", "Gran"],
      correct: 2,
      why: "«Saltar» expressa una acció."
    },
    {
      difficulty: 1,
      topic: "Adjectius",
      q: "A «un gat petit», quin mot és l'adjectiu?",
      a: ["Un", "Gat", "Petit", "Cap"],
      correct: 2,
      why: "«Petit» descriu com és el gat."
    },
    {
      difficulty: 1,
      topic: "Frases",
      q: "Quina frase està completa?",
      a: ["El nen", "Demà al", "La nena canta.", "Perquè sí"],
      correct: 2,
      why: "«La nena canta» expressa una idea completa."
    },
    {
      difficulty: 1,
      topic: "Noms",
      q: "Quin és un nom propi?",
      a: ["Ciutat", "Mallorca", "Muntanya", "Escola"],
      correct: 1,
      why: "«Mallorca» és un nom propi de lloc."
    },
    {
      difficulty: 1,
      topic: "Verbs",
      q: "Completa: «Ahir nosaltres ___ al parc».",
      a: ["juguem", "jugar", "vam jugar", "jugarem"],
      correct: 2,
      why: "«Vam jugar» expressa una acció passada."
    },
    {
      difficulty: 2,
      topic: "Noms",
      q: "Quin és el plural de «flor»?",
      a: ["Flors", "Flores", "Florses", "Flor"],
      correct: 0,
      why: "El plural de «flor» és «flors»."
    },
    {
      difficulty: 2,
      topic: "Adjectius",
      q: "Completa: «Les cases ___ són altes».",
      a: ["blanc", "blanques", "blanca", "blancs"],
      correct: 1,
      why: "L'adjectiu concorda en femení plural amb «cases»."
    },
    {
      difficulty: 2,
      topic: "Verbs",
      q: "Quina frase està en futur?",
      a: ["Ahir vaig llegir", "Ara llegeixo", "Demà llegiré", "Abans llegia"],
      correct: 2,
      why: "«Llegiré» expressa una acció futura."
    },
    {
      difficulty: 2,
      topic: "Frases",
      q: "Quin és el subjecte de «La meva germana dibuixa un ocell»?",
      a: ["Dibuixa", "Un ocell", "La meva germana", "Ocell"],
      correct: 2,
      why: "«La meva germana» és qui fa l'acció."
    },
    {
      difficulty: 2,
      topic: "Pronoms",
      q: "Quina paraula pot substituir «en Marc» en «En Marc corre»?",
      a: ["Ell", "Nosaltres", "Vosaltres", "Elles"],
      correct: 0,
      why: "«Ell» pot substituir el nom d'en Marc."
    },
    {
      difficulty: 2,
      topic: "Determinants",
      q: "Quin és un article definit?",
      a: ["Aquest", "El", "Tres", "Meu"],
      correct: 1,
      why: "«El» és un article definit."
    },
    {
      difficulty: 3,
      topic: "Verbs",
      q: "Quina frase està en passat?",
      a: ["Demà vindré", "Ara vinc", "Ahir vaig venir", "Vinc cada dia"],
      correct: 2,
      why: "«Ahir vaig venir» indica una acció passada."
    },
    {
      difficulty: 3,
      topic: "Frases",
      q: "Quin és el predicat de «Els ocells canten al matí»?",
      a: ["Els ocells", "Canten al matí", "Al matí", "Ocells canten"],
      correct: 1,
      why: "El predicat explica què fa el subjecte."
    },
    {
      difficulty: 3,
      topic: "Adjectius",
      q: "A «Els gossos juganers corren», quin mot descriu els gossos?",
      a: ["Els", "Gossos", "Jug aners", "Corren"],
      correct: 2,
      why: "«Jug aners» vol representar «juganers», l'adjectiu que descriu els gossos."
    },
    {
      difficulty: 3,
      topic: "Concordança",
      q: "Quina frase té la concordança correcta?",
      a: [
        "Les nenes està contenta.",
        "Els nens estan contents.",
        "La nenes estan content.",
        "El nen estan content."
      ],
      correct: 1,
      why: "«Els nens» és plural i concorda amb «estan contents»."
    },
    {
      difficulty: 3,
      topic: "Verbs",
      q: "Quin verb completa la frase? «La setmana passada nosaltres ___ una excursió».",
      a: ["farem", "fem", "vam fer", "fer"],
      correct: 2,
      why: "«Vam fer» expressa una acció passada."
    },
    {
      difficulty: 3,
      topic: "Frases",
      q: "Quina paraula és una conjunció?",
      a: ["Però", "Cadira", "Blau", "Cantar"],
      correct: 0,
      why: "«Però» uneix idees i expressa oposició."
    },
    {
      difficulty: 3,
      topic: "Pronoms",
      q: "Completa: «La Maria i jo ___ amigues».",
      a: ["sou", "som", "són", "és"],
      correct: 1,
      why: "«La Maria i jo» equival a «nosaltres»: «som amigues»."
    },
    {
      difficulty: 3,
      topic: "Frases",
      q: "Quina frase és negativa?",
      a: ["M'agrada llegir.", "Avui fa sol.", "No vull sortir.", "Demà vindré."],
      correct: 2,
      why: "La paraula «no» nega l'acció."
    }
  ],

  words: [
    {
      difficulty: 1,
      topic: "Sinònims",
      q: "Quin és un sinònim de «content»?",
      a: ["Trist", "Alegre", "Enfadat", "Cansat"],
      correct: 1,
      why: "«Alegre» té un significat semblant a «content»."
    },
    {
      difficulty: 1,
      topic: "Antònims",
      q: "Quin és l'antònim de «gran»?",
      a: ["Enorme", "Alt", "Petit", "Llarg"],
      correct: 2,
      why: "«Petit» expressa el contrari de «gran»."
    },
    {
      difficulty: 1,
      topic: "Vocabulari",
      q: "Quina paraula pertany al camp semàntic dels animals?",
      a: ["Taula", "Gat", "Finestra", "Llapis"],
      correct: 1,
      why: "Un gat és un animal."
    },
    {
      difficulty: 1,
      topic: "Sinònims",
      q: "Quina paraula significa gairebé el mateix que «ràpid»?",
      a: ["Lent", "Veloç", "Quiet", "Feble"],
      correct: 1,
      why: "«Veloç» és un sinònim de «ràpid»."
    },
    {
      difficulty: 1,
      topic: "Antònims",
      q: "Quin és l'antònim de «fred»?",
      a: ["Gelat", "Fresc", "Calent", "Hivernal"],
      correct: 2,
      why: "«Calent» és el contrari de «fred»."
    },
    {
      difficulty: 1,
      topic: "Vocabulari",
      q: "Quin objecte serveix per escriure?",
      a: ["Llapis", "Plat", "Coixí", "Sabata"],
      correct: 0,
      why: "El llapis serveix per escriure o dibuixar."
    },
    {
      difficulty: 2,
      topic: "Sinònims",
      q: "Quin és un sinònim de «començar»?",
      a: ["Acabar", "Iniciar", "Oblidar", "Trencar"],
      correct: 1,
      why: "«Iniciar» vol dir començar."
    },
    {
      difficulty: 2,
      topic: "Antònims",
      q: "Quin és el contrari de «generós»?",
      a: ["Amable", "Egoista", "Alegre", "Valent"],
      correct: 1,
      why: "«Egoista» descriu algú que pensa sobretot en ell mateix."
    },
    {
      difficulty: 2,
      topic: "Expressions",
      q: "Què vol dir «anar de pressa»?",
      a: ["Anar lentament", "Anar ràpid", "Anar a dormir", "Anar a peu sempre"],
      correct: 1,
      why: "«Anar de pressa» vol dir fer una cosa ràpidament."
    },
    {
      difficulty: 2,
      topic: "Vocabulari",
      q: "Quina paraula no pertany al grup?",
      a: ["Poma", "Pera", "Plàtan", "Martell"],
      correct: 3,
      why: "El martell és una eina, no una fruita."
    },
    {
      difficulty: 2,
      topic: "Sinònims",
      q: "Quin és un sinònim de «bonic»?",
      a: ["Bell", "Lleig", "Brut", "Trencat"],
      correct: 0,
      why: "«Bell» té un significat semblant a «bonic»."
    },
    {
      difficulty: 2,
      topic: "Antònims",
      q: "Quin és l'antònim de «silenciós»?",
      a: ["Callat", "Sorollós", "Tranquil", "Suau"],
      correct: 1,
      why: "«Sorollós» és el contrari de «silenciós»."
    },
    {
      difficulty: 3,
      topic: "Expressió",
      q: "Quina frase és més precisa?",
      a: [
        "El gos va fer una cosa.",
        "El gos va córrer fins a la porta.",
        "El gos va estar allò.",
        "El gos cosa porta."
      ],
      correct: 1,
      why: "La frase concreta explica clarament què va fer el gos."
    },
    {
      difficulty: 3,
      topic: "Sinònims",
      q: "Quin és un sinònim de «observar»?",
      a: ["Mirar atentament", "Oblidar", "Amagar", "Destruir"],
      correct: 0,
      why: "«Observar» vol dir mirar amb atenció."
    },
    {
      difficulty: 3,
      topic: "Antònims",
      q: "Quin és l'antònim de «abundant»?",
      a: ["Nomb rós", "Escàs", "Múltiple", "Ple"],
      correct: 1,
      why: "«Escàs» vol dir que n'hi ha poca quantitat."
    },
    {
      difficulty: 3,
      topic: "Expressions",
      q: "Què significa «tenir molta cura d'alguna cosa»?",
      a: ["Tractar-la amb atenció", "Perdre-la expressament", "Ignorar-la", "Fer-la malbé"],
      correct: 0,
      why: "Tenir cura significa tractar una cosa amb atenció."
    },
    {
      difficulty: 3,
      topic: "Vocabulari",
      q: "Quina paraula descriu algú que ajuda els altres?",
      a: ["Solidari", "Desordenat", "Descuidat", "Impacient"],
      correct: 0,
      why: "Una persona solidària ajuda els altres."
    },
    {
      difficulty: 3,
      topic: "Expressió",
      q: "Quin connector indica una causa?",
      a: ["Perquè", "Després", "Finalment", "Tanmateix"],
      correct: 0,
      why: "«Perquè» pot introduir la causa d'un fet."
    },
    {
      difficulty: 3,
      topic: "Expressió",
      q: "Quin connector indica ordre temporal?",
      a: ["Però", "Després", "Encara que", "Perquè"],
      correct: 1,
      why: "«Després» indica que una cosa passa més tard."
    },
    {
      difficulty: 3,
      topic: "Vocabulari",
      q: "Què vol dir «una decisió encertada»?",
      a: ["Una decisió adequada", "Una decisió impossible", "Una decisió oblidada", "Una decisió sense pensar"],
      correct: 0,
      why: "«Encertada» vol dir adequada o correcta."
    }
  ]
};

/* ---------------------------------------------------------
   ESTAT I DESAT AUTOMÀTIC
   --------------------------------------------------------- */

function createInitialState() {
  return {
    studentName: "vegalamejor",
    xp: 0,
    completed: [],
    grades: [],
    keys: [],
    defeatedBosses: [],
    rewards: [],
    xpHistory: [],
    audit: [],
    introSeen: false,
    unlocked: {
      letters: 1,
      stories: 27,
      grammar: 53,
      words: 79
    },
    copyIndex: 0,
    copySubmitted: false,
    lastLogin: null
  };
}

function loadState() {
  try {
    const saved = localStorage.getItem(CONFIG.storageKey);
    if (!saved) return createInitialState();

    const parsed = JSON.parse(saved);
    const initial = createInitialState();

    return {
      ...initial,
      ...parsed,
      unlocked: { ...initial.unlocked, ...(parsed.unlocked || {}) },
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      grades: Array.isArray(parsed.grades) ? parsed.grades : [],
      keys: Array.isArray(parsed.keys) ? parsed.keys : [],
      defeatedBosses: Array.isArray(parsed.defeatedBosses)
        ? parsed.defeatedBosses
        : [],
      rewards: Array.isArray(parsed.rewards) ? parsed.rewards : [],
      xpHistory: Array.isArray(parsed.xpHistory) ? parsed.xpHistory : [],
      audit: Array.isArray(parsed.audit) ? parsed.audit : []
    };
  } catch (error) {
    console.error("No s'ha pogut carregar el progrés:", error);
    return createInitialState();
  }
}

let state = loadState();
let currentUserRole = null;
let currentKingdom = "letters";
let currentLevel = 1;
let currentQuestions = [];
let currentQuestionIndex = 0;
let selectedAnswer = null;
let correctAnswers = 0;
let earnedXP = 0;
let answered = false;
let practiceMode = false;
let isBossFight = false;
let copyPasswordAccepted = false;
let currentCopyText = null;
let introPage = 0;

function saveState() {
  try {
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(state));
  } catch (error) {
    console.error("No s'ha pogut desar el progrés:", error);
  }
}

/* ---------------------------------------------------------
   FUNCIONS GENERALS
   --------------------------------------------------------- */

const $ = (id) => document.getElementById(id);

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.add("hidden");
  });

  const target = $(id);
  if (target) target.classList.remove("hidden");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function shuffle(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function formatGrade(value) {
  return Number(value).toLocaleString("ca-ES", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function addAudit(message) {
  state.audit.unshift({
    id: Date.now() + Math.random(),
    date: new Date().toLocaleString("ca-ES"),
    message
  });

  state.audit = state.audit.slice(0, 100);
}

function getAverageGrade() {
  if (!state.grades.length) return null;

  const total = state.grades.reduce((sum, grade) => sum + grade.value, 0);
  return total / state.grades.length;
}

function getStudentLevel() {
  return Math.floor(Math.max(0, state.xp) / 100) + 1;
}

function xpIntoLevel() {
  return Math.max(0, state.xp) % 100;
}

function kingdomForLevel(level) {
  if (level >= 1 && level <= 26) return "letters";
  if (level >= 27 && level <= 52) return "stories";
  if (level >= 53 && level <= 78) return "grammar";
  if (level >= 79 && level <= 104) return "words";
  return null;
}

function getKingdomLevelIndex(level, kingdomKey) {
  const kingdom = KINGDOMS[kingdomKey];
  return level - kingdom.first + 1;
}

function isCompleted(level) {
  return state.completed.includes(level);
}

function isBoss(level) {
  return Object.prototype.hasOwnProperty.call(BOSS_LEVELS, level);
}

function isBossDefeated(level) {
  return state.defeatedBosses.includes(level);
}

function levelTitle(level) {
  if (isBoss(level)) {
    const kingdom = KINGDOMS[BOSS_LEVELS[level]];
    return `Cap de guardià: ${kingdom.bossName}`;
  }

  const kingdomKey = kingdomForLevel(level);
  const kingdom = KINGDOMS[kingdomKey];
  const index = getKingdomLevelIndex(level, kingdomKey);

  const titles = [
    "Els primers passos",
    "El repte del camí",
    "La prova del coneixement",
    "El repte del vell pergamí",
    "La cambra dels enigmes"
  ];

  return `${titles[(index - 1) % titles.length]} · Nivell ${level}`;
}

function getDifficulty(level, kingdomKey) {
  const index = getKingdomLevelIndex(level, kingdomKey);

  if (index <= 8) return 1;
  if (index <= 17) return 2;
  return 3;
}

/* ---------------------------------------------------------
   INICI DE SESSIÓ
   --------------------------------------------------------- */

$("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const username = $("username").value.trim();
  const password = $("password").value;
  const error = $("loginError");

  error.textContent = "";

  if (
    username === CONFIG.teacherUser &&
    password === CONFIG.teacherPassword
  ) {
    currentUserRole = "teacher";
    state.lastLogin = new Date().toISOString();
    saveState();
    addAudit("El professor ha iniciat sessió.");
    saveState();
    renderTeacherPanel();
    showScreen("teacherScreen");
    return;
  }

  if (
    username === CONFIG.studentUser &&
    password === CONFIG.studentPassword
  ) {
    currentUserRole = "student";
    state.lastLogin = new Date().toISOString();
    saveState();

    if (!state.introSeen) {
      introPage = 0;
      updateIntro();
      showScreen("introScreen");
    } else {
      enterStudentGame();
    }

    return;
  }

  error.textContent = "Usuari o contrasenya incorrectes.";
});

$("logoutButton").addEventListener("click", logout);
$("teacherLogoutButton").addEventListener("click", logout);

function logout() {
  currentUserRole = null;
  $("password").value = "";
  $("loginError").textContent = "";
  showScreen("loginScreen");
}

const INTRO_PAGES = [
  {
    title: "Una petició inesperada",
    text: "— Si us plau, necessitem la teva ajuda. Andrés s'ha apoderat de la fortalesa i només algú que domini el català podrà desafiar-lo. Hauràs de recórrer quatre regnes, aprendre les seves lliçons i derrotar els guardians. Estàs preparat?"
  },
  {
    title: "Els quatre regnes",
    text: "— El Regne de les Lletres t'ensenyarà a escriure correctament. El Regne de les Històries posarà a prova la teva comprensió. Al Regne de la Gramàtica estudiaràs com funcionen les frases, i al Regne de les Paraules ampliaràs el teu vocabulari."
  },
  {
    title: "Experiència i guardians",
    text: "— Cada resposta correcta et donarà experiència. Com més avancis, més exigents seran els reptes. Al nivell 26, 52, 78 i 104 t'espera un guardià. Si el vences, obtindràs una de les quatre claus antigues."
  },
  {
    title: "La porta d'Andrés",
    text: "— Pots visitar els regnes en l'ordre que vulguis; no cal completar-ne un per entrar als altres. Quan tinguis les quatre claus, podràs obrir la porta d'Andrés. Ningú no diu que sigui fàcil. Bona sort!"
  }
];

function updateIntro() {
  const page = INTRO_PAGES[introPage];

  $("introTitle").textContent = page.title;
  $("introDialogue").textContent = page.text;

  $("introNextButton").textContent =
    introPage === INTRO_PAGES.length - 1 ? "COMENÇAR L'AVENTURA" : "CONTINUAR";
}

$("introNextButton").addEventListener("click", () => {
  if (introPage < INTRO_PAGES.length - 1) {
    introPage++;
    updateIntro();
  } else {
    state.introSeen = true;
    saveState();
    enterStudentGame();
  }
});

$("skipIntroButton").addEventListener("click", () => {
  state.introSeen = true;
  saveState();
  enterStudentGame();
});

function enterStudentGame() {
  currentUserRole = "student";
  $("playerWelcome").textContent = state.studentName.toUpperCase();
  renderMainScreen();
  showScreen("mainScreen");
}

/* ---------------------------------------------------------
   PANTALLA PRINCIPAL I REGNES
   --------------------------------------------------------- */

document.querySelectorAll(".kingdom-button").forEach((button) => {
  button.addEventListener("click", () => {
    openKingdom(button.dataset.kingdom);
  });
});

$("backToKingdomsButton").addEventListener("click", () => {
  $("levelsSection").classList.add("hidden");
  $("kingdomsSection").classList.remove("hidden");
  window.scrollTo({ top: $("kingdomsSection").offsetTop - 15, behavior: "smooth" });
});

function renderMainScreen() {
  $("playerWelcome").textContent = state.studentName.toUpperCase();
  $("playerLevel").textContent = getStudentLevel();
  $("totalXP").textContent = state.xp;
  $("xpProgressText").textContent = `${xpIntoLevel()} / 100 XP`;
  $("xpProgressFill").style.width = `${xpIntoLevel()}%`;
  $("xpProgressBar").setAttribute("aria-valuenow", xpIntoLevel());

  const completedCount = state.completed.filter((level) => !isBoss(level)).length;
  $("completedLevels").textContent = completedCount;

  const average = getAverageGrade();
  $("averageGrade").textContent = average === null ? "—" : formatGrade(average);

  $("keysCount").textContent = `${state.keys.length}/4`;
  $("guardiansProgress").textContent = `${state.defeatedBosses.length}/4`;

  $("playerNarrative").textContent =
    state.keys.length === 4
      ? "Les quatre claus són teves. La fortalesa d'Andrés t'espera."
      : "Continua aprenent, guanya experiència i troba les quatre claus antigues.";

  renderGuardians();
  renderGrades();
  renderFinalGate();
  renderRewardsOnStudentScreen();
}

function openKingdom(key) {
  if (!KINGDOMS[key]) return;

  currentKingdom = key;
  const kingdom = KINGDOMS[key];

  $("kingdomsSection").classList.add("hidden");
  $("levelsSection").classList.remove("hidden");
  $("selectedKingdomLabel").textContent = kingdom.name.toUpperCase();
  $("selectedKingdomTitle").textContent = "Tria un nivell";

  renderLevels(key);

  window.scrollTo({
    top: $("levelsSection").offsetTop - 10,
    behavior: "smooth"
  });
}

function renderLevels(key) {
  const kingdom = KINGDOMS[key];
  const grid = $("levelsGrid");
  grid.innerHTML = "";

  for (let level = kingdom.first; level <= kingdom.last; level++) {
    const unlocked = level <= state.unlocked[key];
    const completed = isCompleted(level);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "level-card";
    if (completed) button.classList.add("completed");
    if (!unlocked) button.classList.add("locked");

    button.disabled = !unlocked;
    button.innerHTML = `
      <strong>${level}</strong>
      <span>${completed ? "SUPERAT" : unlocked ? "DISPONIBLE" : "BLOQUEJAT"}</span>
    `;

    button.addEventListener("click", () => startLevel(level, false));
    grid.appendChild(button);
  }

  const bossLevel = kingdom.boss;
  const bossUnlocked = state.unlocked[key] > kingdom.last;

  const bossButton = document.createElement("button");
  bossButton.type = "button";
  bossButton.className = "level-card boss-level";
  bossButton.disabled = !bossUnlocked && !isBossDefeated(bossLevel);
  bossButton.innerHTML = `
    <strong>⚔ ${bossLevel}</strong>
    <span>${isBossDefeated(bossLevel) ? "GUARDIÀ VENÇUT" : bossUnlocked ? "COMBAT DE GUARDIÀ" : "BLOQUEJAT"}</span>
  `;
  bossButton.addEventListener("click", () => startLevel(bossLevel, false));
  grid.appendChild(bossButton);

  const practiceButton = document.createElement("button");
  practiceButton.type = "button";
  practiceButton.className = "level-card";
  practiceButton.innerHTML = `
    <strong>✎</strong>
    <span>PRÀCTICA LLIURE · SENSE XP</span>
  `;
  practiceButton.addEventListener("click", () => startLevel(kingdom.last, true));
  grid.appendChild(practiceButton);
}

function renderGuardians() {
  Object.entries(KINGDOMS).forEach(([key, kingdom]) => {
    const defeated = isBossDefeated(kingdom.boss);
    const status = $(kingdom.status);
    const keySlot = $(kingdom.key);

    if (status) {
      status.textContent = defeated ? "VENÇUT" : "PENDENT";
      status.classList.toggle("defeated", defeated);
    }

    if (keySlot) {
      keySlot.textContent = defeated ? "🔑 CLAU OBTINGUDA" : `CLAU ${key.toUpperCase()}`;
      keySlot.classList.toggle("obtained", defeated);
    }
  });
}

function renderFinalGate() {
  const count = state.keys.length;
  $("finalGateStatus").textContent =
    count === 4
      ? "Les quatre claus han obert la porta. Pots desafiar Andrés."
      : `Quatre claus necessàries: ${count}/4.`;

  $("finalBossButton").disabled = count < 4;
}

$("finalBossButton").addEventListener("click", () => {
  if (state.keys.length < 4) return;
  startFinalBoss();
});

/* ---------------------------------------------------------
   PREGUNTES I COMBAT
   --------------------------------------------------------- */

function makeQuestionSet(level, kingdomKey, practice) {
  const bank = QUESTION_BANKS[kingdomKey];
  const difficulty = practice ? 3 : getDifficulty(level, kingdomKey);

  let eligible = bank.filter((question) => question.difficulty <= difficulty);

  if (eligible.length < CONFIG.questionsPerLevel) {
    eligible = bank;
  }

  return shuffle(eligible).slice(0, CONFIG.questionsPerLevel);
}

function startLevel(level, isPractice) {
  const kingdomKey = kingdomForLevel(level);
  if (!kingdomKey || !KINGDOMS[kingdomKey]) return;

  const kingdom = KINGDOMS[kingdomKey];

  if (isBoss(level)) {
    if (state.unlocked[kingdomKey] <= kingdom.last && !isBossDefeated(level)) {
      return;
    }
  } else if (!isPractice && level > state.unlocked[kingdomKey]) {
    return;
  }

  currentKingdom = kingdomKey;
  currentLevel = level;
  practiceMode = isPractice;
  isBossFight = isBoss(level);
  currentQuestionIndex = 0;
  correctAnswers = 0;
  earnedXP = 0;
  selectedAnswer = null;
  answered = false;

  currentQuestions = makeQuestionSet(level, kingdomKey, isPractice);
  if (isBossFight && isBossDefeated(level)) {
    // Els guardians derrotats es poden tornar a desafiar.
  }

  $("quizLevelLabel").textContent = isPractice
    ? `PRÀCTICA LLIURE · ${kingdom.name.toUpperCase()}`
    : `NIVELL ${level}`;

  $("bossArena").classList.toggle("hidden", !isBossFight);

  if (isBossFight) {
    $("bossName").textContent = kingdom.bossName;
    $("bossPortraitPlaceholder").textContent = kingdom.bossName.toUpperCase();
    $("bossHealthFill").style.width = "100%";
    $("bossHealthText").textContent = "100%";
  }

  showScreen("quizScreen");
  renderQuestion();
}

function startFinalBoss() {
  currentKingdom = "words";
  currentLevel = 105;
  practiceMode = false;
  isBossFight = true;
  currentQuestionIndex = 0;
  correctAnswers = 0;
  earnedXP = 0;
  selectedAnswer = null;
  answered = false;

  currentQuestions = shuffle([
    ...QUESTION_BANKS.letters.filter((q) => q.difficulty === 3),
    ...QUESTION_BANKS.stories.filter((q) => q.difficulty === 3),
    ...QUESTION_BANKS.grammar.filter((q) => q.difficulty === 3),
    ...QUESTION_BANKS.words.filter((q) => q.difficulty === 3)
  ]).slice(0, CONFIG.questionsPerLevel);

  $("quizLevelLabel").textContent = "CAP FINAL · ANDRÉS";
  $("bossName").textContent = "ANDRÉS";
  $("bossPortraitPlaceholder").textContent = "ANDRÉS";
  $("bossArena").classList.remove("hidden");
  $("bossHealthFill").style.width = "100%";
  $("bossHealthText").textContent = "100%";

  showScreen("quizScreen");
  renderQuestion();
}

function renderQuestion() {
  const question = currentQuestions[currentQuestionIndex];

  if (!question) {
    finishLevel();
    return;
  }

  selectedAnswer = null;
  answered = false;

  $("questionCounter").textContent =
    `PREGUNTA ${currentQuestionIndex + 1}/${currentQuestions.length}`;

  $("questionXP").textContent = practiceMode ? "0 XP · PRÀCTICA" : `+${CONFIG.xpPerCorrectAnswer} XP`;
  $("quizProgressFill").style.width =
    `${(currentQuestionIndex / currentQuestions.length) * 100}%`;

  $("questionTopic").textContent = question.topic.toUpperCase();
  $("questionText").textContent = question.q;
  $("questionInstruction").textContent =
    "Tria la resposta correcta. Cada encert t'ajudarà a superar el repte.";

  $("answerFeedback").textContent = "";
  $("answerFeedback").className = "answer-feedback";

  $("checkAnswerButton").classList.remove("hidden");
  $("checkAnswerButton").disabled = true;
  $("nextQuestionButton").classList.add("hidden");

  const answersContainer = $("answersContainer");
  answersContainer.innerHTML = "";

  question.a.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";
    button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;

    button.addEventListener("click", () => {
      if (answered) return;

      selectedAnswer = index;
      answersContainer.querySelectorAll(".answer-option").forEach((option) => {
        option.classList.remove("selected");
      });

      button.classList.add("selected");
      $("checkAnswerButton").disabled = false;
    });

    answersContainer.appendChild(button);
  });
}

$("checkAnswerButton").addEventListener("click", checkAnswer);
$("nextQuestionButton").addEventListener("click", nextQuestion);

function checkAnswer() {
  if (answered || selectedAnswer === null) return;

  const question = currentQuestions[currentQuestionIndex];
  answered = true;

  const options = $("answersContainer").querySelectorAll(".answer-option");
  options.forEach((option) => {
    option.disabled = true;
  });

  const correct = selectedAnswer === question.correct;

  if (correct) {
    correctAnswers++;

    if (!practiceMode) {
      earnedXP += CONFIG.xpPerCorrectAnswer;
    }

    options[selectedAnswer].classList.add("correct");
    $("answerFeedback").textContent = practiceMode
      ? `Correcte! ${question.why}`
      : `Correcte! +${CONFIG.xpPerCorrectAnswer} XP. ${question.why}`;
    $("answerFeedback").classList.add("correct");
  } else {
    options[selectedAnswer].classList.add("incorrect");
    options[question.correct].classList.add("correct");
    $("answerFeedback").textContent = `No exactament. ${question.why}`;
    $("answerFeedback").classList.add("incorrect");
  }

  if (isBossFight) {
    const health = Math.max(
      0,
      100 - Math.round((correctAnswers / currentQuestions.length) * 100)
    );

    $("bossHealthFill").style.width = `${health}%`;
    $("bossHealthText").textContent = `${health}%`;
  }

  $("checkAnswerButton").classList.add("hidden");
  $("nextQuestionButton").classList.remove("hidden");

  $("nextQuestionButton").textContent =
    currentQuestionIndex === currentQuestions.length - 1
      ? "ACABAR EL COMBAT"
      : "SEGÜENT PREGUNTA";
}

function nextQuestion() {
  if (!answered) return;

  currentQuestionIndex++;

  if (currentQuestionIndex >= currentQuestions.length) {
    finishLevel();
  } else {
    renderQuestion();
  }
}

function finishLevel() {
  const total = currentQuestions.length;
  const grade = Math.round((correctAnswers / total) * 100) / 10;
  const passed = grade >= 5;
  const kingdom = KINGDOMS[currentKingdom];

  if (!practiceMode) {
    state.xp += earnedXP;

    if (!isBossFight && passed) {
      if (!state.completed.includes(currentLevel)) {
        state.completed.push(currentLevel);
      }

      if (currentLevel < kingdom.last) {
        state.unlocked[currentKingdom] = Math.max(
          state.unlocked[currentKingdom],
          currentLevel + 1
        );
      } else if (currentLevel === kingdom.last) {
        state.unlocked[currentKingdom] = kingdom.boss;
      }

      addGrade(
        `Nivell ${currentLevel} · ${kingdom.name}`,
        grade,
        `${correctAnswers}/${total} respostes correctes`
      );
    }

    if (isBossFight) {
      const defeated = correctAnswers >= CONFIG.guardianMinimumCorrect;

      if (defeated) {
        if (!state.defeatedBosses.includes(currentLevel)) {
          state.defeatedBosses.push(currentLevel);
        }

        if (!state.keys.includes(currentLevel)) {
          state.keys.push(currentLevel);
        }

        state.completed = [...new Set([...state.completed, currentLevel])];

        addGrade(
          `Guardià · Nivell ${currentLevel}`,
          grade,
          "Guardià derrotat"
        );

        addAudit(`La jugadora ha derrotat el guardià del nivell ${currentLevel} i ha obtingut una clau.`);
      } else {
        addAudit(`Intent de combat contra el guardià del nivell ${currentLevel}: ${correctAnswers}/${total}.`);
      }
    } else {
      addAudit(`Nivell ${currentLevel}: nota ${formatGrade(grade)}.`);
    }

    saveState();
  }

  $("resultTitle").textContent = practiceMode
    ? "Pràctica acabada"
    : isBossFight
      ? correctAnswers >= CONFIG.guardianMinimumCorrect
        ? "GUARDIÀ DERROTAT"
        : "EL GUARDIÀ RESISTEIX"
      : passed
        ? "Nivell superat"
        : "Cal practicar una mica més";

  $("resultLevelName").textContent = practiceMode
    ? "Pràctica lliure · Sense XP ni nota"
    : currentLevel === 105
      ? "Combat final contra Andrés"
      : levelTitle(currentLevel);

  $("resultGrade").textContent = formatGrade(grade);
  $("resultCorrectAnswers").textContent = `${correctAnswers}/${total}`;
  $("resultXP").textContent = practiceMode ? "0" : earnedXP;

  const defeatedGuardian = isBossFight &&
    correctAnswers >= CONFIG.guardianMinimumCorrect;

  if (defeatedGuardian && currentLevel !== 105) {
    $("keyRewardMessage").textContent =
      "Has derrotat el guardià i has obtingut una clau antiga!";
    $("keyRewardMessage").classList.remove("hidden");
  } else if (currentLevel === 105 && correctAnswers >= CONFIG.guardianMinimumCorrect) {
    $("keyRewardMessage").textContent =
      "Has superat el repte final d'Andrés. La llegenda parlarà de tu!";
    $("keyRewardMessage").classList.remove("hidden");
  } else {
    $("keyRewardMessage").textContent = "";
    $("keyRewardMessage").classList.add("hidden");
  }

  if (practiceMode) {
    $("resultMessage").textContent =
      "Has practicat sense guanyar XP ni registrar una nota. Pots tornar-ho a provar tantes vegades com vulguis.";
  } else if (currentLevel === 105) {
    $("resultMessage").textContent =
      correctAnswers >= CONFIG.guardianMinimumCorrect
        ? "Has superat el repte final. Victòria!"
        : "Andrés encara no ha estat vençut. Repassa els quatre regnes i torna-ho a intentar.";
  } else if (isBossFight) {
    $("resultMessage").textContent =
      defeatedGuardian
        ? "El guardià ha caigut. La clau és teva!"
        : `Necessites almenys ${CONFIG.guardianMinimumCorrect} respostes correctes per obtenir la clau.`;
  } else {
    $("resultMessage").textContent =
      passed
        ? "Bon treball! Has superat el nivell i pots continuar pel teu regne."
        : "Necessites una nota mínima de 5 per superar aquest nivell. Pots repetir-lo.";
  }

  if (!practiceMode) renderMainScreen();

  showScreen("resultScreen");
}

function addGrade(name, value, comment) {
  state.grades.unshift({
    id: Date.now() + Math.random(),
    name,
    value,
    comment: comment || "",
    date: new Date().toLocaleDateString("ca-ES"),
    source: "joc"
  });
}

$("returnToMapButton").addEventListener("click", () => {
  if (currentUserRole === "teacher") {
    renderTeacherPanel();
    showScreen("teacherScreen");
    return;
  }

  renderMainScreen();
  showScreen("mainScreen");

  if (currentKingdom) {
    openKingdom(currentKingdom);
  }
});

$("retryLevelButton").addEventListener("click", () => {
  if (currentLevel === 105) {
    startFinalBoss();
  } else {
    startLevel(currentLevel, practiceMode);
  }
});

$("exitQuizButton").addEventListener("click", () => {
  renderMainScreen();
  showScreen("mainScreen");
  openKingdom(currentKingdom);
});

/* ---------------------------------------------------------
   HISTORIAL DE NOTES
   --------------------------------------------------------- */

function renderGrades() {
  const container = $("gradesHistory");

  if (!state.grades.length) {
    container.innerHTML = "<p>Encara no hi ha notes registrades.</p>";
    return;
  }

  container.innerHTML = state.grades.map((grade) => `
    <div class="grade-entry">
      <div>
        <strong>${escapeHTML(grade.name)}</strong>
        <p>${escapeHTML(grade.date)}${grade.comment ? " · " + escapeHTML(grade.comment) : ""}</p>
      </div>
      <strong>${formatGrade(grade.value)}/10</strong>
    </div>
  `).join("");
}

/* ---------------------------------------------------------
   SCRIPTORIUM: COPIAT MANUAL
   --------------------------------------------------------- */

$("openCopyButton").addEventListener("click", openCopyScreen);
$("closeCopyButton").addEventListener("click", () => {
  renderMainScreen();
  showScreen("mainScreen");
});

function openCopyScreen() {
  currentCopyText = COPY_TEXTS[state.copyIndex % COPY_TEXTS.length];
  copyPasswordAccepted = false;

  $("copyTextTitle").textContent = currentCopyText.title;
  $("copyTextContent").textContent = currentCopyText.text;

  $("copyCodeForm").classList.add("hidden");
  $("copyGradeForm").classList.add("hidden");
  $("copyCode").value = "";
  $("copyGrade").value = "";
  $("copyTeacherComment").value = "";
  $("copyCodeError").textContent = "";

  showScreen("copyScreen");
}

$("copyFinishedButton").addEventListener("click", () => {
  $("copyCodeForm").classList.remove("hidden");
  $("copyCode").focus();
});

$("copyCodeForm").addEventListener("submit", (event) => {
  event.preventDefault();

  if ($("copyCode").value !== CONFIG.copyPassword) {
    $("copyCodeError").textContent = "Contrasenya incorrecta.";
    return;
  }

  copyPasswordAccepted = true;
  $("copyCodeError").textContent = "";
  $("copyGradeForm").classList.remove("hidden");
  $("copyGrade").focus();
});

$("copyGradeForm").addEventListener("submit", (event) => {
  event.preventDefault();

  if (!copyPasswordAccepted) return;

  const grade = Number($("copyGrade").value);
  if (!Number.isFinite(grade) || grade < 0 || grade > 10) return;

  const comment = $("copyTeacherComment").value.trim();

  addGrade(`Copiat · ${currentCopyText.title}`, grade, comment);
  addAudit(`Nota de copiat registrada: ${currentCopyText.title}, ${formatGrade(grade)}/10.`);
  state.copyIndex++;
  state.copySubmitted = true;
  saveState();

  $("copyGradeForm").classList.add("hidden");
  $("copyCodeForm").classList.add("hidden");
  $("copyFinishedButton").classList.add("hidden");

  const message = document.createElement("p");
  message.className = "answer-feedback correct";
  message.textContent = `Nota registrada: ${formatGrade(grade)}/10.`;
  $("copyGradeForm").after(message);

  renderMainScreen();
});

/* ---------------------------------------------------------
   COMPTE DEL PROFESSOR
   --------------------------------------------------------- */

document.querySelectorAll(".teacher-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.teacherTab;

    document.querySelectorAll(".teacher-tab").forEach((item) => {
      item.classList.toggle("active", item === tab);
    });

    const panels = {
      grades: "teacherGradesPanel",
      xp: "teacherXPPanel",
      rewards: "teacherRewardsPanel",
      progress: "teacherProgressPanel"
    };

    Object.entries(panels).forEach(([key, id]) => {
      $(id).classList.toggle("hidden", key !== target);
    });
  });
});

function renderTeacherPanel() {
  $("teacherCurrentXP").textContent = state.xp;
  $("teacherPlayerLevel").textContent = getStudentLevel();
  $("teacherPlayerXP").textContent = `${state.xp} XP`;
  $("teacherCompletedLevels").textContent =
    state.completed.filter((level) => !isBoss(level)).length;

  const average = getAverageGrade();
  $("teacherAverageGrade").textContent =
    average === null ? "—" : `${formatGrade(average)}/10`;

  $("teacherGuardiansDefeated").textContent = `${state.defeatedBosses.length}/4`;
  $("teacherKeysCount").textContent = `${state.keys.length}/4`;

  renderTeacherGrades();
  renderTeacherXPHistory();
  renderTeacherRewards();
  renderTeacherAudit();
}

function renderTeacherGrades() {
  const container = $("teacherGradesHistory");

  if (!state.grades.length) {
    container.innerHTML = "<p>Encara no hi ha notes registrades.</p>";
    return;
  }

  container.innerHTML = state.grades.map((grade) => `
    <article class="teacher-history-entry">
      <strong>${escapeHTML(grade.name)} — ${formatGrade(grade.value)}/10</strong>
      <p>${escapeHTML(grade.date)}${grade.comment ? " · " + escapeHTML(grade.comment) : ""}</p>
      <button type="button" class="secondary-button"
              data-delete-grade="${grade.id}">
        ELIMINAR NOTA
      </button>
    </article>
  `).join("");

  container.querySelectorAll("[data-delete-grade]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.deleteGrade);
      const grade = state.grades.find((item) => item.id === id);
      if (!grade) return;

      if (!window.confirm(`Vols eliminar la nota «${grade.name}»?`)) return;

      state.grades = state.grades.filter((item) => item.id !== id);
      addAudit(`El professor ha eliminat la nota: ${grade.name}.`);
      saveState();
      renderTeacherPanel();
      renderMainScreen();
    });
  });
}

$("teacherAddGradeForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (currentUserRole !== "teacher") return;

  const name = $("teacherGradeName").value.trim();
  const value = Number($("teacherGradeValue").value);
  const comment = $("teacherGradeComment").value.trim();

  if (!name || !Number.isFinite(value) || value < 0 || value > 10) return;

  addGrade(name, value, comment);
  addAudit(`El professor ha registrat una nota manual: ${name}, ${formatGrade(value)}/10.`);
  saveState();

  $("teacherAddGradeForm").reset();
  renderTeacherPanel();
  renderMainScreen();
});

$("teacherXPForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (currentUserRole !== "teacher") return;

  const amount = Math.floor(Number($("teacherXPAmount").value));
  const action = $("teacherXPAction").value;
  const reason = $("teacherXPReason").value.trim();

  if (!Number.isFinite(amount) || amount <= 0 || !reason) return;

  const change = action === "add" ? amount : -amount;
  const previousXP = state.xp;
  state.xp = Math.max(0, state.xp + change);
  const actualChange = state.xp - previousXP;

  state.xpHistory.unshift({
    id: Date.now() + Math.random(),
    date: new Date().toLocaleString("ca-ES"),
    amount: actualChange,
    reason
  });

  addAudit(`Canvi de XP del professor: ${actualChange > 0 ? "+" : ""}${actualChange} XP. Motiu: ${reason}`);
  saveState();

  $("teacherXPForm").reset();
  renderTeacherPanel();
  renderMainScreen();
});

function renderTeacherXPHistory() {
  const container = $("teacherXPHistory");

  if (!state.xpHistory.length) {
    container.innerHTML = "<p>Encara no hi ha canvis de XP.</p>";
    return;
  }

  container.innerHTML = state.xpHistory.map((entry) => `
    <article class="teacher-history-entry">
      <strong>${entry.amount > 0 ? "+" : ""}${entry.amount} XP</strong>
      <p>${escapeHTML(entry.date)} · ${escapeHTML(entry.reason)}</p>
    </article>
  `).join("");
}

$("teacherRewardForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (currentUserRole !== "teacher") return;

  const name = $("teacherRewardName").value.trim();
  const description = $("teacherRewardDescription").value.trim();
  const action = $("teacherRewardAction").value;

  if (!name) return;

  const existingIndex = state.rewards.findIndex(
    (reward) => reward.name.toLowerCase() === name.toLowerCase()
  );

  if (action === "grant") {
    if (existingIndex === -1) {
      state.rewards.push({
        id: Date.now() + Math.random(),
        name,
        description,
        date: new Date().toLocaleDateString("ca-ES")
      });
      addAudit(`Premi concedit: ${name}.`);
    } else {
      state.rewards[existingIndex].description = description;
      addAudit(`Premi actualitzat: ${name}.`);
    }
  } else {
    if (existingIndex !== -1) {
      state.rewards.splice(existingIndex, 1);
      addAudit(`Premi retirat: ${name}.`);
    } else {
      addAudit(`Intent de retirar un premi inexistent: ${name}.`);
    }
  }

  saveState();
  $("teacherRewardForm").reset();
  renderTeacherPanel();
  renderMainScreen();
});

function renderTeacherRewards() {
  const container = $("teacherRewardsList");

  if (!state.rewards.length) {
    container.innerHTML = "<p>No hi ha premis especials actius.</p>";
    return;
  }

  container.innerHTML = state.rewards.map((reward) => `
    <article class="teacher-history-entry">
      <strong>🏅 ${escapeHTML(reward.name)}</strong>
      <p>${escapeHTML(reward.description || "Sense descripció")}</p>
      <p>Concedit el ${escapeHTML(reward.date)}</p>
      <button type="button" class="secondary-button"
              data-revoke-reward="${reward.id}">
        RETIRAR PREMI
      </button>
    </article>
  `).join("");

  container.querySelectorAll("[data-revoke-reward]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.revokeReward);
      const reward = state.rewards.find((item) => item.id === id);
      if (!reward) return;

      state.rewards = state.rewards.filter((item) => item.id !== id);
      addAudit(`Premi retirat: ${reward.name}.`);
      saveState();
      renderTeacherPanel();
      renderMainScreen();
    });
  });
}

function renderRewardsOnStudentScreen() {
  const section = $("gradesSection");
  if (!section) return;

  let panel = $("studentRewardsPanel");

  if (!panel) {
    panel = document.createElement("section");
    panel.id = "studentRewardsPanel";
    panel.className = "grades-section";
    panel.innerHTML = `
      <div class="section-heading">
        <div>
          <p class="eyebrow">RECOMPENSES</p>
          <h2>Premis especials</h2>
        </div>
      </div>
      <div id="studentRewardsList"></div>
    `;
    section.after(panel);
  }

  const container = $("studentRewardsList");

  if (!state.rewards.length) {
    container.innerHTML = "<p>Encara no tens premis especials.</p>";
    return;
  }

  container.innerHTML = state.rewards.map((reward) => `
    <div class="grade-entry">
      <div>
        <strong>🏅 ${escapeHTML(reward.name)}</strong>
        <p>${escapeHTML(reward.description || "Premi especial")}</p>
      </div>
    </div>
  `).join("");
}

function renderTeacherAudit() {
  const container = $("teacherAuditHistory");

  if (!state.audit.length) {
    container.innerHTML = "<p>Encara no hi ha activitat registrada.</p>";
    return;
  }

  container.innerHTML = state.audit.slice(0, 50).map((entry) => `
    <article class="teacher-history-entry">
      <strong>${escapeHTML(entry.message)}</strong>
      <p>${escapeHTML(entry.date)}</p>
    </article>
  `).join("");
}

/* ---------------------------------------------------------
   INICIALITZACIÓ
   --------------------------------------------------------- */

function initialise() {
  // Garanteix que hi hagi dades vàlides si el desat és antic.
  if (!state.unlocked) {
    state.unlocked = createInitialState().unlocked;
  }

  saveState();

  $("playerLevel").textContent = getStudentLevel();
  $("totalXP").textContent = state.xp;
  $("teacherGreeting").textContent = "Hola, súper sexy señor Andrés.";

  // Si el navegador no té desat cap inici anterior, es mostra el login.
  showScreen("loginScreen");
}

initialise();
