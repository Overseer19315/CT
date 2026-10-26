/* ==========================================
   EL MISTERI DE LES PARAULES
   Motor del joc · 104 nivells · 10 preguntes
   ========================================== */

"use strict";

(() => {
  const USERNAME = "vegalamejor";
  const PASSWORD = "hastaquenosaquesdiecesnotelacambio";
  const TOTAL_LEVELS = 104;
  const QUESTIONS_PER_LEVEL = 10;

  const SAVE_KEY = "misteri_paraules_progress_v1";

  const adventures = [
    {
      name: "Ortografia i sons",
      short: "Ortografia",
      icon: "✍️",
      color: "#a9dfff",
      description: "Escriu les paraules correctament.",
      bank: [
        ["Quina paraula està ben escrita?", ["avió", "abió", "havió", "aviò"], 0, "Avió s'escriu amb v i accent a la o."],
        ["Quina paraula està ben escrita?", ["platja", "plaja", "platga", "pladja"], 0, "La forma correcta és platja."],
        ["Com s'escriu correctament?", ["hivern", "ivern", "hivèrn", "ivèrn"], 0, "Hivern porta h inicial."],
        ["Quina paraula porta dièresi?", ["raïm", "raim", "raím", "raim̈"], 0, "Raïm porta dièresi."],
        ["Quina paraula porta accent greu?", ["cafè", "cafe", "café", "càfe"], 0, "Cafè s'escriu amb accent greu."],
        ["Quina paraula està ben escrita?", ["metge", "metje", "medge", "metgè"], 0, "La forma correcta és metge."],
        ["Quina paraula conté ny?", ["canya", "cana", "canha", "canyà"], 0, "Canya s'escriu amb ny."],
        ["Quina paraula porta ela geminada?", ["pel·lícula", "película", "pel-licula", "pèllicula"], 0, "Pel·lícula porta l·l."],
        ["Completa: L'___ és molt alt.", ["arbre", "arbret", "àrbree", "harbre"], 0, "Arbre comença amb vocal."],
        ["Quina paraula és aguda?", ["camió", "música", "pàgina", "màquina"], 0, "Camió té la síl·laba tònica al final."],
        ["Quina paraula és esdrúixola?", ["música", "paper", "camió", "animal"], 0, "Música és esdrúixola."],
        ["Quina és la forma correcta del plural de braç?", ["braços", "braçs", "braçes", "braçosos"], 0, "El plural de braç és braços."],
        ["Quina paraula s'escriu amb v?", ["avió", "abió", "abent", "baca"], 0, "Avió s'escriu amb v."],
        ["Completa: ___ escola és gran.", ["L'", "La", "El", "Les"], 0, "Davant de escola, la s'apostrofa."],
        ["Quina paraula està ben escrita?", ["conill", "coni", "cunill", "coniy"], 0, "La forma correcta és conill."],
        ["Quina paraula és correcta?", ["llibre", "libre", "lliuree", "llibrè"], 0, "Llibre s'escriu amb ll."],
        ["Quina paraula té accent?", ["pàgina", "pagina", "pagína", "paginà"], 0, "Pàgina porta accent."],
        ["Quina és la forma correcta?", ["cotxes", "cotxos", "cotxesos", "cotx"], 0, "El plural habitual és cotxes."],
        ["Quina paraula comença amb h?", ["història", "istòria", "istoria", "hestòria"], 0, "Història comença amb h."],
        ["Quina paraula està ben escrita?", ["formatge", "formadje", "formatje", "formache"], 0, "La forma correcta és formatge."]
      ]
    },
    {
      name: "Gramàtica",
      short: "Gramàtica",
      icon: "🧩",
      color: "#ffb8d8",
      description: "Descobreix com funcionen les frases.",
      bank: [
        ["A «La nena canta», quin és el nom?", ["nena", "canta", "la", "ràpid"], 0, "Nena és un nom."],
        ["A «El gat negre dorm», quin és l'adjectiu?", ["negre", "gat", "dorm", "el"], 0, "Negre descriu el gat."],
        ["Quina paraula és un verb?", ["córrer", "bonic", "taula", "ràpid"], 0, "Córrer expressa una acció."],
        ["Quin és el femení de content?", ["contenta", "contents", "contentar", "contentes"], 0, "El femení singular és contenta."],
        ["Quin és el plural de flor?", ["flors", "flores", "flor", "florses"], 0, "El plural és flors."],
        ["Quin pronom substitueix la Maria?", ["ella", "nosaltres", "vosaltres", "ells"], 0, "Ella pot substituir la Maria."],
        ["Quina frase està en passat?", ["Ahir vaig jugar", "Demà jugaré", "Ara jugo", "Jugo demà"], 0, "Ahir vaig jugar expressa passat."],
        ["Quina frase és interrogativa?", ["On vius?", "Avui plou.", "Tanca la porta!", "Que bé!"], 0, "Les preguntes són interrogatives."],
        ["Completa: Jo ___ un conte.", ["llegeixo", "llegeixes", "llegeix", "llegiu"], 0, "Amb jo, diem llegeixo."],
        ["Quin determinant indica possessió?", ["meu", "aquell", "tres", "aquesta"], 0, "Meu indica possessió."],
        ["Quina paraula és un nom?", ["muntanya", "saltar", "bonic", "lentament"], 0, "Muntanya és un nom."],
        ["Quina paraula és un adjectiu?", ["amable", "cantar", "taula", "ahir"], 0, "Amable descriu una qualitat."],
        ["Completa: Nosaltres ___ al parc.", ["juguem", "jugo", "juga", "jugueu"], 0, "Amb nosaltres, diem juguem."],
        ["Quina paraula és un determinant numeral?", ["quatre", "meu", "aquella", "aquest"], 0, "Quatre indica una quantitat exacta."],
        ["Quina frase té el subjecte plural?", ["Els ocells volen", "El gos borda", "Jo salto", "La nena llegeix"], 0, "Els ocells és plural."],
        ["Quin és el femení de petit?", ["petita", "petits", "petitet", "petites"], 0, "El femení singular és petita."],
        ["Quin signe acaba normalment una pregunta?", [ "?", ".", "!", ","], 0, "Les preguntes acaben amb interrogant."],
        ["A «La casa és gran», quin és l'adjectiu?", ["gran", "casa", "és", "la"], 0, "Gran descriu la casa."],
        ["Quina paraula indica lloc?", ["aquí", "demà", "lentament", "mai"], 0, "Aquí indica lloc."],
        ["Completa: Ahir ella ___ una carta.", ["va escriure", "escriurà", "escriu", "escriure"], 0, "Va escriure expressa una acció passada."]
      ]
    },
    {
      name: "Vocabulari",
      short: "Vocabulari",
      icon: "🔎",
      color: "#b8f0c6",
      description: "Descobreix paraules i significats.",
      bank: [
        ["Quin és un sinònim de content?", ["alegre", "trist", "enfadat", "cansat"], 0, "Alegre té un significat semblant a content."],
        ["Quin és l'antònim de fàcil?", ["difícil", "simple", "clar", "ràpid"], 0, "Difícil és el contrari de fàcil."],
        ["Quina paraula pertany a la família de flor?", ["florista", "flauta", "forat", "foc"], 0, "Florista comparteix l'arrel flor."],
        ["Quina paraula és composta?", ["rentaplats", "cadira", "poma", "gat"], 0, "Rentaplats uneix dues paraules."],
        ["Què vol dir «estar com un peix a l'aigua»?", ["Sentir-se molt còmode", "Tenir molta set", "Estar enfadat", "Tenir fred"], 0, "Vol dir sentir-se molt bé en un lloc."],
        ["Quin és un sinònim de petit?", ["menut", "enorme", "ample", "alt"], 0, "Menut pot voler dir petit."],
        ["Quin és l'antònim de començar?", ["acabar", "iniciar", "seguir", "obrir"], 0, "Acabar és el contrari de començar."],
        ["Quina paraula no pertany al grup?", ["cadira", "poma", "pera", "plàtan"], 0, "Cadira és un moble, no una fruita."],
        ["Com s'anomena un grup d'abelles?", ["eixam", "ramat", "equip", "bandada"], 0, "Un grup d'abelles és un eixam."],
        ["Què vol dir valent?", ["Que té coratge", "Que sempre dorm", "Que té gana", "Que parla fluix"], 0, "Una persona valenta té coratge."],
        ["Quina paraula pertany a la família de mar?", ["mariner", "màquina", "mare", "mà"], 0, "Mariner està relacionada amb mar."],
        ["Quin és l'antònim de ple?", ["buit", "complet", "farcit", "plegat"], 0, "Buit és el contrari de ple."],
        ["Quin és un sinònim de mirar?", ["observar", "amagar", "trencar", "dormir"], 0, "Observar vol dir mirar amb atenció."],
        ["Què vol dir «fer-ne cinc cèntims»?", ["Explicar-ho breument", "Comprar cinc coses", "Comptar monedes", "Pagar una factura"], 0, "Vol dir explicar una cosa breument."],
        ["Quin és l'antònim de sorollós?", ["silenciós", "fort", "alegre", "ràpid"], 0, "Silenciós és el contrari de sorollós."],
        ["Quina paraula no és un animal?", ["albercoc", "esquirol", "oreneta", "llúdriga"], 0, "Albercoc és una fruita."],
        ["Quina paraula pertany a la família de pa?", ["panet", "pati", "pala", "paret"], 0, "Panet deriva de pa."],
        ["Quin és un sinònim de bonic?", ["preciós", "lleig", "fosc", "dur"], 0, "Preciós vol dir molt bonic."],
        ["Què vol dir «anar de pressa»?", ["Anar ràpid", "Anar lentament", "Anar a dormir", "Anar lluny"], 0, "Vol dir anar ràpid."],
        ["Quina paraula és un antònim de valent?", ["poruc", "decidit", "atrevit", "coratjós"], 0, "Poruc descriu algú que té molta por."]
      ]
    },
    {
      name: "Comprensió i escriptura",
      short: "Lectura",
      icon: "📚",
      color: "#ffe09a",
      description: "Llegeix, interpreta i crea textos.",
      bank: [
        ["Llegeix: «La Júlia va trobar una clau sota una pedra.» Què va trobar?", ["Una clau", "Una moneda", "Una flor", "Una carta"], 0, "El text diu que va trobar una clau."],
        ["«En Biel va agafar el paraigua perquè plovia.» Quin temps feia?", ["Plovia", "Nevava", "Feia sol", "Feia calor"], 0, "Va agafar el paraigua perquè plovia."],
        ["Quin signe separa elements d'una llista?", ["La coma", "El punt final sempre", "L'interrogant", "Els parèntesis"], 0, "Les comes separen elements d'una enumeració."],
        ["Quina frase està puntuada correctament?", ["Hola, com estàs?", "Hola com estàs.", "Hola; com estàs?", "Hola com estàs"], 0, "La coma separa la salutació i la pregunta acaba amb ?."],
        ["«La tortuga va arribar abans que la llebre.» Qui va arribar abans?", ["La tortuga", "La llebre", "Totes dues", "No ho sabem"], 0, "El text diu que va arribar abans la tortuga."],
        ["On es poden consultar llibres?", ["A la biblioteca", "A la sabateria", "Al garatge", "A la piscina"], 0, "A la biblioteca hi ha llibres per llegir i consultar."],
        ["Quina paraula ajuda a ordenar fets després d'un altre?", ["Després", "Mai", "Potser", "Perquè"], 0, "Després indica ordre temporal."],
        ["Quina frase expressa una exclamació?", ["Quin dia més bonic!", "Quin dia és?", "Avui és dilluns.", "Potser vindré."], 0, "El signe ! expressa exclamació."],
        ["Quina és la finalitat d'un títol?", ["Presentar el tema del text", "Acabar cada frase", "Indicar el nombre de pàgines", "Substituir el text"], 0, "El títol presenta el tema principal."],
        ["«La Sara va estudiar i va aprovar.» Què va fer primer?", ["Va estudiar", "Va aprovar", "Va dormir", "Va jugar"], 0, "Primer va estudiar."],
        ["Quina frase està escrita en futur?", ["Demà aniré al parc", "Ahir vaig anar al parc", "Ara soc al parc", "Ahir plovia"], 0, "Aniré expressa una acció futura."],
        ["Quina paraula connecta dues idees?", ["però", "taula", "finestra", "ocell"], 0, "Però és un connector."],
        ["«En Pau tenia gana, així que va berenar.» Per què va berenar?", ["Perquè tenia gana", "Perquè tenia son", "Perquè plovia", "Perquè era tard"], 0, "El text explica que tenia gana."],
        ["Quina part d'un conte presenta els personatges i el lloc?", ["El començament", "El final sempre", "El títol sol", "La signatura"], 0, "El començament presenta la situació inicial."],
        ["Quina frase és una instrucció?", ["Obre el llibre per la pàgina deu", "Ahir vaig llegir", "M'agrada llegir", "Quin llibre tens?"], 0, "La frase indica què cal fer."],
        ["Quina paraula indica una causa?", ["perquè", "després", "finalment", "mentrestant"], 0, "Perquè pot introduir una causa."],
        ["«La nit era fosca i silenciosa.» Quines dues qualitats descriuen la nit?", ["Fosca i silenciosa", "Clara i sorollosa", "Calenta i ràpida", "Gran i rodona"], 0, "El text diu que era fosca i silenciosa."],
        ["Quin signe fem servir al final d'una frase afirmativa?", [".", "?", ",", ":"], 0, "El punt tanca una frase afirmativa."],
        ["Quina frase està en ordre lògic?", ["Em llevo, esmorzo i vaig a escola", "Vaig a escola abans de llevar-me", "Sopo abans de néixer", "Dormo abans de despertar-me sempre"], 0, "Les accions segueixen un ordre habitual."],
        ["Què és un resum?", ["Una explicació breu de les idees principals", "Una còpia de cada paraula", "Una llista de noms", "Un títol molt llarg"], 0, "Un resum recull les idees principals breument."]
      ]
    }
  ];

  let state = loadState();
  let currentLevel = 1;
  let currentQuestion = 0;
  let selectedAnswer = null;
  let answerChecked = false;
  let sessionAnswers = [];
  let activeAdventure = 0;

  const $ = id => document.getElementById(id);

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (saved && saved.grades && saved.unlocked) return saved;
    } catch (error) {
      console.warn("No s'ha pogut llegir el progrés guardat.", error);
    }

    return {
      grades: {},
      unlocked: 1,
      points: 0,
      username: USERNAME
    };
  }

  function saveState() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn("No s'ha pogut desar el progrés.", error);
    }
  }

  function showScreen(screenId) {
    ["loginScreen", "mainScreen", "quizScreen", "resultScreen"].forEach(id => {
      $(id).classList.toggle("hidden", id !== screenId);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function formatGrade(value) {
    return Number(value).toLocaleString("ca-ES", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    });
  }

  function averageGrade() {
    const grades = Object.values(state.grades);
    if (!grades.length) return null;
    return grades.reduce((sum, item) => sum + item.grade, 0) / grades.length;
  }

  function completedCount() {
    return Object.keys(state.grades).length;
  }

  function adventureForLevel(level) {
    return Math.floor((level - 1) / 26);
  }

  function levelInAdventure(level) {
    return ((level - 1) % 26) + 1;
  }

  function firstAvailableLevel() {
    return Math.min(state.unlocked, TOTAL_LEVELS);
  }

  function mascotMessage(grade) {
    if (grade >= 9) {
      return {
        icon: "🦉🌟",
        title: "Ets una estrella!",
        message: "Fantàstic! Has demostrat que saps molt. Continuem descobrint paraules!"
      };
    }
    if (grade >= 7) {
      return {
        icon: "🦉✨",
        title: "Molt bona feina!",
        message: "Ho estàs fent molt bé! Practicar una mica més t'ajudarà a millorar encara més."
      };
    }
    if (grade >= 5) {
      return {
        icon: "🦉💪",
        title: "Continua practicant!",
        message: "Ja has après coses noves. Repassem els errors i ho farem encara millor!"
      };
    }
    return {
      icon: "🦉💛",
      title: "No et rendeixis!",
      message: "Equivocar-se forma part d'aprendre. Torna-ho a provar: jo t'acompanyo!"
    };
  }

  function shuffle(array) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  /*
   * Genera un conjunt de 10 preguntes a partir del banc
   * de l'aventura. Les preguntes i l'ordre de les opcions
   * poden variar en cada intent.
   */
  function makeQuestions(level) {
    const adventure = adventures[adventureForLevel(level)];
    const selected = shuffle(adventure.bank).slice(0, QUESTIONS_PER_LEVEL);

    return selected.map(item => {
      const [q, options, correctIndex, explanation] = item;
      const correctText = options[correctIndex];
      const shuffledOptions = shuffle(options);

      return {
        q,
        options: shuffledOptions,
        answer: shuffledOptions.indexOf(correctText),
        explanation,
        topic: adventure.short
      };
    });
  }

  function renderHome() {
    const average = averageGrade();
    const completed = completedCount();
    const progress = (completed / TOTAL_LEVELS) * 100;

    $("playerName").textContent = state.username || USERNAME;
    $("totalPoints").textContent = state.points;
    $("completedLevels").textContent = `${completed} / ${TOTAL_LEVELS}`;
    $("averageGrade").textContent = average === null ? "—" : formatGrade(average);
    $("gradesAverage").textContent = average === null ? "—" : formatGrade(average);

    $("overallProgressText").textContent = `${completed} / ${TOTAL_LEVELS}`;
    $("overallProgressFill").style.width = `${progress}%`;
    $("overallProgressBar").setAttribute("aria-valuenow", completed);

    renderAdventures();
    renderLevelFilters();
    renderLevels();
    renderGrades();
    saveState();
  }

  function renderAdventures() {
    const container = $("adventuresGrid");
    container.replaceChildren();

    adventures.forEach((adventure, index) => {
      const start = index * 26 + 1;
      const end = start + 25;
      let completed = 0;

      for (let level = start; level <= end; level++) {
        if (state.grades[level]) completed++;
      }

      const card = document.createElement("article");
      card.className = "adventure-card";

      const icon = document.createElement("div");
      icon.className = "adventure-icon";
      icon.textContent = adventure.icon;
      icon.style.background = adventure.color + "22";

      const title = document.createElement("h3");
      title.textContent = adventure.name;

      const description = document.createElement("p");
      description.textContent = adventure.description;

      const progress = document.createElement("div");
      progress.className = "adventure-progress";

      const progressText = document.createElement("span");
      progressText.textContent = `${completed}/26 nivells`;

      const progressPct = document.createElement("strong");
      progressPct.textContent = `${Math.round(completed / 26 * 100)}%`;

      progress.append(progressText, progressPct);

      const track = document.createElement("div");
      track.className = "progress-track";

      const fill = document.createElement("div");
      fill.className = "progress-fill";
      fill.style.width = `${completed / 26 * 100}%`;

      track.appendChild(fill);
      card.append(icon, title, description, progress, track);

      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Obrir l'aventura ${adventure.name}`);

      const openAdventure = () => {
        activeAdventure = index;
        renderLevelFilters();
        renderLevels();

        const grid = $("levelsGrid");
        grid.scrollIntoView({ behavior: "smooth", block: "start" });
      };

      card.addEventListener("click", openAdventure);
      card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openAdventure();
        }
      });

      container.appendChild(card);
    });
  }

  function renderLevelFilters() {
    const container = $("levelFilters");
    container.replaceChildren();

    adventures.forEach((adventure, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "level-filter" + (index === activeAdventure ? " active" : "");
      button.textContent = `${adventure.icon} ${adventure.short}`;

      button.addEventListener("click", () => {
        activeAdventure = index;
        renderLevelFilters();
        renderLevels();
      });

      container.appendChild(button);
    });
  }

  function renderLevels() {
    const container = $("levelsGrid");
    container.replaceChildren();

    const first = activeAdventure * 26 + 1;
    const last = first + 25;

    for (let level = first; level <= last; level++) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "level-button";

      const completed = Boolean(state.grades[level]);
      const unlocked = level <= state.unlocked;

      if (completed) button.classList.add("completed");
      if (level === state.unlocked && !completed) button.classList.add("current");
      if (!unlocked) button.classList.add("locked");

      const number = document.createElement("strong");
      number.textContent = unlocked ? String(levelInAdventure(level)) : "🔒";

      const caption = document.createElement("span");
      caption.textContent = completed
        ? `${formatGrade(state.grades[level].grade)}/10`
        : `Nivell ${levelInAdventure(level)}`;

      button.append(number, caption);
      button.disabled = !unlocked;

      if (unlocked) {
        button.addEventListener("click", () => startLevel(level));
      }

      container.appendChild(button);
    }
  }

  function renderGrades() {
    const container = $("gradesHistory");
    container.replaceChildren();

    const entries = Object.entries(state.grades)
      .map(([level, data]) => ({ level: Number(level), ...data }))
      .sort((a, b) => b.level - a.level)
      .slice(0, 8);

    if (!entries.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "Quan completis el primer nivell, la teva nota apareixerà aquí.";
      container.appendChild(empty);
      return;
    }

    entries.forEach(entry => {
      const row = document.createElement("div");
      row.className = "grade-entry";

      const label = document.createElement("span");
      label.textContent =
        `Nivell ${entry.level} · ${adventures[adventureForLevel(entry.level)].short}`;

      const grade = document.createElement("strong");
      grade.textContent = `${formatGrade(entry.grade)}/10`;

      row.append(label, grade);
      container.appendChild(row);
    });
  }

  function startLevel(level) {
    if (level > state.unlocked || level < 1 || level > TOTAL_LEVELS) return;

    currentLevel = level;
    currentQuestion = 0;
    selectedAnswer = null;
    answerChecked = false;
    sessionAnswers = makeQuestions(level).map(question => ({
      ...question,
      selected: null,
      correct: false
    }));

    const adventure = adventures[adventureForLevel(level)];

    $("quizAdventureName").textContent = adventure.name.toUpperCase();
    $("quizLevelTitle").textContent = `Nivell ${levelInAdventure(level)}`;
    $("quizMascotMessage").textContent =
      "Llegeix amb calma i tria la resposta que et sembli correcta. Tu pots!";

    showScreen("quizScreen");
    renderQuestion();
  }

  function renderQuestion() {
    const question = sessionAnswers[currentQuestion];
    selectedAnswer = null;
    answerChecked = false;

    $("questionNumber").textContent =
      `${currentQuestion + 1} / ${QUESTIONS_PER_LEVEL}`;

    $("quizProgressFill").style.width =
      `${currentQuestion / QUESTIONS_PER_LEVEL * 100}%`;

    $("questionText").textContent = question.q;
    $("questionInstruction").textContent =
      "Tria una resposta. Després, comprova si has encertat.";

    $("questionTopic").textContent = question.topic.toUpperCase();

    $("answerFeedback").className = "answer-feedback hidden";
    $("answerFeedback").textContent = "";

    $("checkAnswerButton").classList.remove("hidden");
    $("nextQuestionButton").classList.add("hidden");
    $("checkAnswerButton").disabled = false;

    const container = $("answersContainer");
    container.replaceChildren();

    question.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-option";

      const letter = document.createElement("span");
      letter.className = "answer-letter";
      letter.textContent = String.fromCharCode(65 + index);

      const text = document.createElement("span");
      text.className = "answer-text";
      text.textContent = option;

      button.append(letter, text);

      button.addEventListener("click", () => {
        if (answerChecked) return;

        selectedAnswer = index;

        container.querySelectorAll(".answer-option").forEach(item => {
          item.classList.remove("selected");
        });

        button.classList.add("selected");
      });

      container.appendChild(button);
    });
  }

  function checkAnswer() {
    if (answerChecked) return;

    if (selectedAnswer === null) {
      $("answerFeedback").className = "answer-feedback error";
      $("answerFeedback").textContent = "Tria una resposta abans de continuar.";
      return;
    }

    const question = sessionAnswers[currentQuestion];
    const correct = selectedAnswer === question.answer;

    question.selected = selectedAnswer;
    question.correct = correct;
    answerChecked = true;

    const buttons = $("answersContainer").querySelectorAll(".answer-option");

    buttons.forEach((button, index) => {
      button.disabled = true;

      if (index === question.answer) button.classList.add("correct");
      else if (index === selectedAnswer) button.classList.add("incorrect");
    });

    const feedback = $("answerFeedback");
    feedback.className = "answer-feedback " + (correct ? "success" : "error");
    feedback.textContent = correct
      ? `Molt bé! ${question.explanation}`
      : `Encara pots aprendre! ${question.explanation}`;

    $("quizMascotMessage").textContent = correct
      ? "Molt bé! Has trobat la resposta correcta! 🌟"
      : "No passa res: ara ja saps una cosa nova. Continua! 💛";

    $("checkAnswerButton").classList.add("hidden");
    $("nextQuestionButton").classList.remove("hidden");

    $("nextQuestionButton").textContent =
      currentQuestion === QUESTIONS_PER_LEVEL - 1
        ? "Veure els resultats →"
        : "Següent pregunta →";
  }

  function nextQuestion() {
    if (!answerChecked) return;

    if (currentQuestion < QUESTIONS_PER_LEVEL - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      finishLevel();
    }
  }

  function finishLevel() {
    const correct = sessionAnswers.filter(question => question.correct).length;
    const grade = correct;
    const points = correct * 10;
    const previous = state.grades[currentLevel];

    /*
     * Una repetició no esborra una nota millor anterior.
     * El desbloqueig requereix com a mínim 5/10.
     */
    const savedGrade = previous
      ? Math.max(previous.grade, grade)
      : grade;

    state.grades[currentLevel] = {
      grade: savedGrade,
      lastGrade: grade,
      correct,
      date: new Date().toISOString()
    };

    state.points += points;

    if (grade >= 5 && currentLevel === state.unlocked && state.unlocked < TOTAL_LEVELS) {
      state.unlocked++;
    }

    saveState();
    renderResult(grade, correct, points);
  }

  function renderResult(grade, correct, points) {
    const reaction = mascotMessage(grade);
    const average = averageGrade();

    $("resultIcon").textContent =
      grade >= 9 ? "🏆" : grade >= 7 ? "🌟" : grade >= 5 ? "💪" : "🌱";

    $("resultTitle").textContent =
      grade >= 9 ? "Excel·lent!" :
      grade >= 7 ? "Molt bé!" :
      grade >= 5 ? "Bon treball!" :
      "Continuem aprenent!";

    $("resultLevelName").textContent =
      `${adventures[adventureForLevel(currentLevel)].name} · Nivell ${levelInAdventure(currentLevel)}`;

    $("resultGrade").textContent = formatGrade(grade);
    $("resultCorrectAnswers").textContent = `${correct}/10`;
    $("resultPointsEarned").textContent = `+${points}`;
    $("resultNewAverage").textContent = average === null ? "—" : formatGrade(average);

    $("resultMessage").textContent =
      grade >= 9 ? "Has resolt el repte d'una manera fantàstica!" :
      grade >= 7 ? "Estàs avançant molt bé. Continua així!" :
      grade >= 5 ? "Has superat el repte. Practicar t'ajudarà a millorar." :
      "Aquest nivell encara necessita una mica més de pràctica. Torna-ho a intentar!";

    $("resultMascot").textContent = reaction.icon;
    $("resultMascotTitle").textContent = reaction.title;
    $("resultMascotMessage").textContent = reaction.message;

    const nextLevel = currentLevel + 1;
    const canContinue = nextLevel <= state.unlocked && nextLevel <= TOTAL_LEVELS;

    $("continueLevelButton").textContent =
      currentLevel === TOTAL_LEVELS ? "Has arribat al final! 🎉" :
      canContinue ? `Continuar al nivell ${levelInAdventure(nextLevel)} →` :
      grade < 5 ? "Tornar-ho a intentar →" : "Tornar al mapa →";

    $("continueLevelButton").disabled =
      currentLevel === TOTAL_LEVELS;

    showScreen("resultScreen");
  }

  function returnHome() {
    renderHome();
    showScreen("mainScreen");
  }

  function login(event) {
    event.preventDefault();

    const username = $("username").value.trim();
    const password = $("password").value;

    if (username !== USERNAME || password !== PASSWORD) {
      $("loginError").textContent = "L'usuari o la contrasenya no són correctes.";
      return;
    }

    $("loginError").textContent = "";
    state.username = username;

    try {
      sessionStorage.setItem("misteri_logged_in", "true");
    } catch (_) {}

    renderHome();
    showScreen("mainScreen");
  }

  function logout() {
    try {
      sessionStorage.removeItem("misteri_logged_in");
    } catch (_) {}

    $("password").value = "";
    showScreen("loginScreen");
  }

  $("loginForm").addEventListener("submit", login);

  $("logoutButton").addEventListener("click", logout);

  $("backToMapButton").addEventListener("click", returnHome);

  $("checkAnswerButton").addEventListener("click", checkAnswer);

  $("nextQuestionButton").addEventListener("click", nextQuestion);

  $("resultMapButton").addEventListener("click", returnHome);

  $("retryLevelButton").addEventListener("click", () => {
    startLevel(currentLevel);
  });

  $("continueLevelButton").addEventListener("click", () => {
    const next = currentLevel + 1;

    if (next <= state.unlocked && next <= TOTAL_LEVELS) {
      startLevel(next);
    } else {
      returnHome();
    }
  });

  /*
   * Recupera la sessió actual, si existeix.
   * El progrés continua desat encara que es tanqui el navegador.
   */
  let loggedIn = false;

  try {
    loggedIn = sessionStorage.getItem("misteri_logged_in") === "true";
  } catch (_) {}

  if (loggedIn) {
    renderHome();
    showScreen("mainScreen");
  } else {
    showScreen("loginScreen");
  }
})();
