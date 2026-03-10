const mazeScenes = {
    maze_intro: {
        name: "Аноним",
        text: "Короче, нам надо пройти лабиринт... Парк строили дурачки.",
        choices: [{ text: "НАЧАТЬ ЛАБИРИНТ", next: 'after_maze' }]
        // Можно добавить onEnter: () => startMazeGame()
    },
    
    after_maze: {
        name: "Аноним",
        text: "Ого, я думал ты не справишься... Чтож, тогда тебе мы почти у цели. Поговоришь с моим другом?",
        choices: [
            { text: "а) Да", next: 'meet_murka' },
            { text: "б) Нет", next: 'quiz_loop_intro' }
        ]
    },
    
    // === ВСТРЕЧА С МУРКОЙ ===
    meet_murka: {
        name: "Мурка",
        text: (state) => `Привет, я Мурка. Мой друг сказал тебя зовут ${state.playerName}.\nДаже мне как Мурке странно. Ну ладно. Короче, я заигралась, поэтому кое-что для тебя потерялось.\nУ тебя есть лакомства? Не могу говорить на голодный желудок.`,
        choices: [
            { text: "а) Есть", next: 'murka_snack_yes' },
            { text: "б) Нету", next: 'murka_snack_no' }
        ]
    },
    
    murka_snack_no: {
        name: "Мурка",
        text: "Ну, так найди!",
        choices: [{ text: "НАЧАТЬ ПОИСК", next: 'after_puzzle' }]
        // onEnter: () => startPuzzleGame()
    },
    
    after_puzzle: {
        name: "Мурка",
        text: "Супер!\nТогда я скажу что это всё было ради этого, кое-что... Не существует. Это наша мошенническая схема.",
        choices: [
            { text: "а) Ах вы! Закончу игру!", next: 'ending_angry' },
            { text: "б) И что? Это всё?", next: 'ending_calm' }
        ]
    },
    
    murka_snack_yes: {
        name: "Мурка",
        text: "Супер!\nТогда я скажу что это всё было ради этого, кое-что... Не существует. Это наша мошенническая схема.",
        choices: [
            { text: "а) Ах вы! Закончу игру!", next: 'ending_angry' },
            { text: "б) И что? Это всё?", next: 'ending_calm' }
        ]
    },
    
    // === ЦИКЛ ВИКТОРИНЫ (пока не выберет поговорить с Муркой) ===
    quiz_loop_intro: {
        name: "Аноним",
        text: "Ой, зря... Очень зря. Я наказываю тех, кто не любит Мурку. За это тебе надо правильно ответить на вопросы.",
        choices: [{ text: "НАЧАТЬ ВИКТОРИНУ", next: 'quiz_start' }]
    },
    
    quiz_start: {
        name: "Аноним",
        text: "Викторина: 10 вопросов из школьной программы. Поехали!",
        onEnter: () => {
            gameState.quizScore = 0;
            gameState.askedQuestions = [];
            startQuizRound(0);
        }
    },
    
    quiz_after: {
        name: "Аноним",
        text: (state) => `Ладно, ты прощён. Твой счёт: ${state.quizScore}/10.`,
        choices: [
            { text: "а) Поговорить с Муркой", next: 'meet_murka' },
            { text: "б) Не говорить с Муркой", next: 'quiz_loop_intro' }
        ]
    }
};

// === ВИКТОРИНА С РАНДОМНЫМИ ВОПРОСАМИ ===
let currentQuizQuestions = [];

function startQuizRound(index) {
    if (index >= 10) {
        showScene('quiz_after');
        return;
    }
    
    // Берём 10 случайных вопросов при старте
    if (index === 0) {
        currentQuizQuestions = getRandomQuestions(10);
    }
    
    const q = currentQuizQuestions[index];
    const container = document.getElementById('game-container');
    
    container.innerHTML = `
        <div class="scene quiz">
            <div class="dialogue-box">
                <div class="dialogue-name">Викторина</div>
                <div class="dialogue-text"><strong>Вопрос ${index+1}/10:</strong><br>${q.q}</div>
                <div class="choices">
                    ${q.a.map((ans, i) => `
                        <button class="choice-btn" onclick="answerQuiz(${i}, ${i===q.correct}, ${index+1})">
                            ${ans}
                        </button>
                    `).join('')}
                </div>
                <div style="margin-top:20px;font-size:18px">Счёт: <span id="qscore">${gameState.quizScore}</span>/10</div>
            </div>
        </div>
    `;
}

function answerQuiz(selected, isCorrect, nextIndex) {
    if (isCorrect) {
        gameState.quizScore++;
        document.getElementById('qscore').textContent = gameState.quizScore;
    }
    setTimeout(() => startQuizRound(nextIndex), 300);
}
