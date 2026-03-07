// ============================================
// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
// ============================================
let gameState = {
    playerName: '',
    currentScene: 'intro',
    backpackItem: '',
    quizScore: 0,
    hasSnack: false,
    frogDefeated: false,
    metMurka: false
};

// ============================================
// СЦЕНАРИЙ ДИАЛОГОВ
// ============================================
const dialogues = {
    // === ВСТУПЛЕНИЕ ===
    intro: {
        text: "Привет! У меня есть для тебя кое-что... Хочешь узнать что? Давай познакомимся",
        input: true,
        placeholder: "Введите ваше имя",
        button: "НАЧАТЬ",
        onNext: (name) => {
            gameState.playerName = name;
            showScene('intro_reaction');
        }
    },
    
    intro_reaction: {
        name: "",
        text: (state) => `Какое странное имя... ${state.playerName}... Ты из космоса или Австралии? Ладно, не суть.`,
        choices: [
            { text: "Продолжить", next: 'backpack_intro' }
        ]
    },
    
    // === СБОР РЮКЗАКА ===
    backpack_intro: {
        name: "Мурка",
        text: (state) => `Так вот, "${state.playerName}", первым твоим заданием будет собрать рюкзак, мы кое-куда пойдём. Что ты с собой возьмёшь из еды?`,
        choices: [
            { text: "а) Банка тушёнки", next: 'backpack_tushonka' },
            { text: "б) Сыр косичка", next: 'backpack_syr' },
            { text: "в) Макароны", next: 'backpack_macaroni' },
            { text: "г) Орешки", next: 'backpack_orehki' }
        ]
    },
    
    backpack_tushonka: {
        name: "Мурка",
        text: (state) => `А зачем она тебе? Нам идти-то минут 30. ${state.playerName}, ты реально из космоса? Ладно, пошли, идём в парк.`,
        choices: [
            { text: "Идти в парк", next: 'scooters_choice' }
        ]
    },
    
    backpack_syr: {
        name: "Мурка",
        text: "Одобряю. Ладно, пошли, идём в парк.",
        choices: [
            { text: "Идти в парк", next: 'scooters_choice' }
        ]
    },
    
    backpack_macaroni: {
        name: "Мурка",
        text: "А варить-то их где будешь? Ладно, пошли, идём в парк.",
        choices: [
            { text: "Идти в парк", next: 'scooters_choice' }
        ]
    },
    
    backpack_orehki: {
        name: "Мурка",
        text: "Одобряю. Ладно, пошли, идём в парк.",
        choices: [
            { text: "Идти в парк", next: 'scooters_choice' }
        ]
    },
    
    // === ПУТЬ В ПАРК - ВЫБОР ===
    scooters_choice: {
        name: "Мурка",
        text: "По пути в парк много электросамокатчиков... Закажем такси или поиграем?",
        choices: [
            { text: "а) Поиграем!", next: 'scooters_game_intro' },
            { text: "б) Такси", next: 'taxi_reaction' }
        ]
    },
    
    taxi_reaction: {
        name: "Мурка",
        text: "Ну ничего себе, закрывшиеся люди. Я денег не дам, у тебя есть? Пошли пешком обгонять электросамокатчиков.",
        choices: [
            { text: "Ладно, играем", next: 'scooters_game_intro' }
        ]
    },
    
    scooters_game_intro: {
        name: "Мурка",
        text: "Пф... Нищеброды... Ладно, давай играть.",
        choices: [
            { text: "НАЧАТЬ ИГРУ", next: 'scooters_game', action: 'startScootersGame' }
        ]
    },
    
    // === ПОСЛЕ ИГРЫ С САМОКАТАМИ ===
    after_scooters: {
        name: "Мурка",
        text: "Чпок... Всё не так безнадёжно. И вот мы в парке. Как тебе тут?",
        choices: [
            { text: "а) Хочу домой", next: 'park_reaction_sad' },
            { text: "б) Ну норм", next: 'park_reaction_sad' },
            { text: "в) Обожаю парки!", next: 'optimist_test' }
        ]
    },
    
    park_reaction_sad: {
        name: "Мурка",
        text: "Обидно... Я так долго выбирал парк...",
        choices: [
            { text: "Далее", next: 'maze_intro' }
        ]
    },
    
    optimist_test: {
        name: "Мурка",
        text: "Оптимистов никто не любит... Пройди-ка тест: https://duck643.github.io/testnormis/",
        choices: [
            { text: "Прошёл тест. Далее", next: 'maze_intro' }
        ]
    },
    
    // === ЛАБИРИНТ ===
    maze_intro: {
        name: "Мурка",
        text: "Короче, нам надо пройти лабиринт... Парк строили дурачки.",
        choices: [
            { text: "НАЧАТЬ ЛАБИРИНТ", next: 'maze_game', action: 'startMazeGame' }
        ]
    },
    
    after_maze: {
        name: "Мурка",
        text: "Ого, я думал ты не справишься... Чпок, тогда тебе мы почти у цели. Поговоришь с моим другом?",
        choices: [
            { text: "а) Да", next: 'meet_murka' },
            { text: "б) Нет", next: 'no_murka_reaction' }
        ]
    },
    
    no_murka_reaction: {
        name: "Мурка",
        text: "Ой, зря... Очень зря.",
        choices: [
            { text: "Всё равно поговорить", next: 'meet_murka' }
        ]
    },
    
    // === ВСТРЕЧА С МУРКОЙ ===
    meet_murka: {
        name: "Мурка",
        text: (state) => `Привет, я Мурка. Мой друг сказал тебя зовут ${state.playerName}. Даже мне как Мурке странно. Ну ладно. Короче, я заигралась, поэтому кое-что для тебя потерялось. У тебя есть лакомства? Не могу говорить на голодный желудок.`,
        choices: [
            { text: "а) Есть", next: 'quiz_intro' },
            { text: "б) Нету", next: 'find_snack_intro' }
        ]
    },
    
    // === ПОИСК ЛАКОМСТВА ===
    find_snack_intro: {
        name: "Мурка",
        text: "Ну, так найди!",
        choices: [
            { text: "НАЧАТЬ ПОИСК", next: 'find_snack_game', action: 'startFindSnackGame' }
        ]
    },
    
    after_find_snack: {
        name: "Мурка",
        text: "Нашёл! Теперь у тебя есть лакомства.",
        choices: [
            { text: "Продолжить", next: 'quiz_intro' }
        ]
    },
    
    // === ВИКТОРИНА ===
    quiz_intro: {
        name: "Мурка",
        text: "Я наказываю тех, кто не любит Мурку. За это тебе надо правильно ответить на вопросы! (5 вопросов из школьной программы, особенно по математике)",
        choices: [
            { text: "НАЧАТЬ ВИКТОРИНУ", next: 'quiz_question_1', action: 'startQuiz' }
        ]
    },
    
    quiz_question_1: {
        name: "Викторина",
        text: "Вопрос 1: Сколько будет 2 + 2 × 2?",
        quiz: true,
        correctAnswer: 6,
        choices: [
            { text: "а) 6", correct: true, next: 'quiz_question_2' },
            { text: "б) 8", correct: false, next: 'quiz_question_2' },
            { text: "в) 4", correct: false, next: 'quiz_question_2' }
        ]
    },
    
    quiz_question_2: {
        name: "Викторина",
        text: "Вопрос 2: Сколько граней у куба?",
        quiz: true,
        choices: [
            { text: "а) 4", correct: false, next: 'quiz_question_3' },
            { text: "б) 6", correct: true, next: 'quiz_question_3' },
            { text: "в) 8", correct: false, next: 'quiz_question_3' }
        ]
    },
    
    quiz_question_3: {
        name: "Викторина",
        text: "Вопрос 3: Сколько будет 15% от 200?",
        quiz: true,
        choices: [
            { text: "а) 20", correct: false, next: 'quiz_question_4' },
            { text: "б) 25", correct: false, next: 'quiz_question_4' },
            { text: "в) 30", correct: true, next: 'quiz_question_4' }
        ]
    },
    
    quiz_question_4: {
        name: "Викторина",
        text: "Вопрос 4: Какой угол у равностороннего треугольника?",
        quiz: true,
        choices: [
            { text: "а) 45°", correct: false, next: 'quiz_question_5' },
            { text: "б) 60°", correct: true, next: 'quiz_question_5' },
            { text: "в) 90°", correct: false, next: 'quiz_question_5' }
        ]
    },
    
    quiz_question_5: {
        name: "Викторина",
        text: "Вопрос 5: Сколько будет √144?",
        quiz: true,
        choices: [
            { text: "а) 10", correct: false, next: 'quiz_end' },
            { text: "б) 12", correct: true, next: 'quiz_end' },
            { text: "в) 14", correct: false, next: 'quiz_end' }
        ]
    },
    
    quiz_end: {
        name: "Мурка",
        text: "Ладно, ты прощен.",
        choices: [
            { text: "а) Поговорить с Муркой", next: 'final_talk' },
            { text: "б) Не говорить с Муркой", next: 'final_no_talk' }
        ]
    },
    
    final_talk: {
        name: "Мурка",
        text: "Супер! Тогда я скажу что это всё было ради этого, кое-что... Не существует. Это наша мошенническая схема.",
        choices: [
            { text: "а) Ах вы! Закончу игру!", next: 'ending_angry' },
            { text: "б) И что? Это всё?", next: 'ending_calm_question' }
        ]
    },
    
    final_no_talk: {
        name: "Мурка",
        text: "Супер! Тогда я скажу что это всё было ради этого, кое-что... Не существует. Это наша мошенническая схема.",
        choices: [
            { text: "а) Ах вы! Закончу игру!", next: 'ending_angry' },
            { text: "б) И что? Это всё?", next: 'ending_calm_question' }
        ]
    },
    
    ending_calm_question: {
        name: "Мурка",
        text: "Да, это всё. А что тебе ещё что-то надо?",
        choices: [
            { text: "Да", next: 'ending_stalker' },
            { text: "Нет, я закончу игру", next: 'ending_normal' }
        ]
    },
    
    // === КОНЦОВКИ ===
    ending_angry: {
        name: "КОНЕЦ",
        text: "Ну и ладно! Игра окончена.",
        ending: true,
        choices: [
            { text: "НАЧАТЬ ЗАНОВО", next: 'intro', action: 'resetGame' }
        ]
    },
    
    ending_stalker: {
        name: "Мурка",
        text: "Какой-то сталкеринг... Пока.",
        ending: true,
        choices: [
            { text: "НАЧАТЬ ЗАНОВО", next: 'intro', action: 'resetGame' }
        ]
    },
    
    ending_normal: {
        name: "КОНЕЦ",
        text: "Спасибо за игру! Надеюсь, тебе понравилось!",
        ending: true,
        choices: [
            { text: "НАЧАТЬ ЗАНОВО", next: 'intro', action: 'resetGame' }
        ]
    }
};

// ============================================
// ФУНКЦИИ ОТОБРАЖЕНИЯ
// ============================================

function showScene(sceneName) {
    const container = document.getElementById('game-container');
    const scene = dialogues[sceneName];
    
    if (!scene) {
        console.error(`Scene "${sceneName}" not found!`);
        return;
    }
    
    gameState.currentScene = sceneName;
    
    // Получаем текст (может быть функцией)
    let text = typeof scene.text === 'function' ? scene.text(gameState) : scene.text;
    
    // Получаем имя говорящего
    let name = typeof scene.name === 'function' ? scene.name(gameState) : scene.name;
    
    let html = `
        <div class="scene ${sceneName}">
            <div class="dialogue-box">
                ${name ? `<div class="dialogue-name">${name}</div>` : ''}
                <div class="dialogue-text">${text}</div>
                
                ${scene.input ? `
                    <input type="text" class="name-input" placeholder="${scene.placeholder}" id="playerNameInput">
                    <button class="start-btn" onclick="handleNameInput()">${scene.button}</button>
                ` : ''}
                
                ${scene.choices ? `
                    <div class="choices">
                        ${scene.choices.map((choice, index) => `
                            <button class="choice-btn ${choice.correct !== undefined ? 'quiz-btn' : ''}" 
                                    onclick="makeChoice('${choice.next}', ${choice.correct})">
                                ${choice.text}
                            </button>
                        `).join('')}
                    </div>
                ` : ''}
                
                ${scene.action ? `
                    <script>
                        window.onload = function() {
                            setTimeout(() => ${scene.action}(), 100);
                        };
                    <\/script>
                ` : ''}
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    
    // Если это концовка, добавляем специальный стиль
    if (scene.ending) {
        container.classList.add('ending-scene');
    }
}

// ============================================
// ОБРАБОТЧИКИ СОБЫТИЙ
// ============================================

function handleNameInput() {
    const input = document.getElementById('playerNameInput');
    const name = input.value.trim();
    
    if (name) {
        const scene = dialogues[gameState.currentScene];
        if (scene.onNext) {
            scene.onNext(name);
        }
    } else {
        alert('Пожалуйста, введите имя!');
    }
}

function makeChoice(nextScene, isCorrect = null) {
    // Если это вопрос викторины, считаем очки
    if (isCorrect !== null) {
        const currentSceneData = dialogues[gameState.currentScene];
        if (currentSceneData.quiz) {
            if (isCorrect) {
                gameState.quizScore++;
            }
        }
    }
    
    // Выполняем действие если есть
    const scene = dialogues[nextScene];
    if (scene && scene.action) {
        // Действие выполнится автоматически при загрузке сцены
    }
    
    showScene(nextScene);
}

function resetGame() {
    gameState = {
        playerName: '',
        currentScene: 'intro',
        backpackItem: '',
        quizScore: 0,
        hasSnack: false,
        frogDefeated: false,
        metMurka: false
    };
}

// ============================================
// МИНИ-ИГРЫ (ЗАГОТОВКИ)
// ============================================

function startScootersGame() {
    // Здесь будет логика игры с самокатами
    alert('Игра с самокатами: обгоняй и стреляй! (В разработке)');
    setTimeout(() => {
        showScene('after_scooters');
    }, 1000);
}

function startMazeGame() {
    // Здесь будет логика лабиринта
    alert('Лабиринт с движущимися стенами! (В разработке)');
    setTimeout(() => {
        showScene('after_maze');
    }, 1000);
}

function startFindSnackGame() {
    // Здесь будет логика поиска лакомства
    alert('Найди лакомство среди фигур! (В разработке)');
    setTimeout(() => {
        showScene('after_find_snack');
    }, 1000);
}

function startQuiz() {
    gameState.quizScore = 0;
    // Викторина начнётся автоматически
}

// ============================================
// ИНИЦИАЛИЗАЦИЯ ИГРЫ
// ============================================

window.onload = () => {
    showScene('intro');
    
    // Добавляем обработку Enter в поле ввода
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && document.getElementById('playerNameInput')) {
            handleNameInput();
        }
    });
};

// ============================================
// ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ
// ============================================

function saveGame() {
    localStorage.setItem('murkaQuestSave', JSON.stringify(gameState));
    alert('Игра сохранена!');
}

function loadGame() {
    const saved = localStorage.getItem('murkaQuestSave');
    if (saved) {
        gameState = JSON.parse(saved);
        showScene(gameState.currentScene);
        alert('Игра загружена!');
    } else {
        alert('Нет сохранённой игры!');
    }
}
