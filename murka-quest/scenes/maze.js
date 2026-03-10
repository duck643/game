const mazeScenes = {
    maze_intro: {
        name: "Аноним",
        text: "Короче, нам надо пройти лабиринт... Парк строили дурачки.",
        choices: [{ text: "НАЧАТЬ ЛАБИРИНТ", next: 'maze_game' }]
    },
    
    // === ИГРА С ЛАБИРИНТОМ ===
    maze_game: {
        name: "",
        hideDialogue: true,
        customContent: () => `
            <div style="text-align:center;color:white;padding:20px">
                <h2>🌀 Пройди лабиринт! 🎯</h2>
                <p>Стрелки ⬆️⬇️⬅️➡️ - движение. Доберись до зелёного выхода!</p>
                <div id="maze-area" style="width:600px;height:400px;background:#1a1a2e;margin:0 auto;border-radius:10px;position:relative;overflow:hidden;border:3px solid #0f3460">
                    <div id="maze-player" style="width:25px;height:25px;background:#00d9ff;border-radius:50%;position:absolute;left:10px;top:187px;box-shadow:0 0 15px #00d9ff;z-index:10">🏃</div>
                    <div id="maze-exit" style="width:40px;height:40px;background:#2ecc71;position:absolute;right:10px;top:180px;border-radius:5px;box-shadow:0 0 20px #2ecc71">🎯</div>
                </div>
                <button id="maze-finish" class="start-btn" style="margin-top:20px;display:none" onclick="showScene('after_maze')">ПРОДОЛЖИТЬ</button>
            </div>
        `,
        onEnter: () => setTimeout(initMazeGame, 100)
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
    
    // === ЦИКЛ ВИКТОРИНЫ ===
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

// === ИГРА С ЛАБИРИНТОМ ===
let mazePlayerX = 10, mazePlayerY = 187, mazeInterval, mazeActive = false;
const mazeWalls = [
    {x: 50, y: 0, w: 20, h: 150},
    {x: 100, y: 100, w: 20, h: 200},
    {x: 150, y: 0, w: 20, h: 180},
    {x: 200, y: 220, w: 20, h: 180},
    {x: 250, y: 50, w: 20, h: 200},
    {x: 300, y: 0, w: 20, h: 120},
    {x: 350, y: 150, w: 20, h: 250},
    {x: 400, y: 0, w: 20, h: 200},
    {x: 450, y: 250, w: 20, h: 150},
    {x: 500, y: 80, w: 20, h: 200}
];

function initMazeGame() {
    const area = document.getElementById('maze-area');
    const player = document.getElementById('maze-player');
    if (!area || !player) return;
    
    mazeActive = true;
    mazePlayerX = 10;
    mazePlayerY = 187;
    player.style.left = mazePlayerX + 'px';
    player.style.top = mazePlayerY + 'px';
    
    // Создаём стены
    mazeWalls.forEach(wall => {
        const wallEl = document.createElement('div');
        wallEl.className = 'maze-wall';
        wallEl.style.cssText = `position:absolute;left:${wall.x}px;top:${wall.y}px;width:${wall.w}px;height:${wall.h}px;background:#e94560;border-radius:5px;box-shadow:0 0 10px #e94560`;
        area.appendChild(wallEl);
    });
    
    document.addEventListener('keydown', handleMazeInput);
    
    // Проверка победы каждые 100мс
    mazeInterval = setInterval(() => {
        if (mazePlayerX > 550 && mazePlayerY > 180 && mazePlayerY < 220) {
            endMazeGame();
        }
    }, 100);
}

function handleMazeInput(e) {
    const player = document.getElementById('maze-player');
    if (!player || !mazeActive) return;
    
    let newX = mazePlayerX;
    let newY = mazePlayerY;
    const speed = 5;
    
    if (e.key === 'ArrowUp') newY -= speed;
    if (e.key === 'ArrowDown') newY += speed;
    if (e.key === 'ArrowLeft') newX -= speed;
    if (e.key === 'ArrowRight') newX += speed;
    
    // Проверка границ
    if (newX < 0) newX = 0;
    if (newX > 575) newX = 575;
    if (newY < 0) newY = 0;
    if (newY > 375) newY = 375;
    
    // Проверка столкновений со стенами
    const playerRect = {left: newX, right: newX + 25, top: newY, bottom: newY + 25};
    let collision = false;
    
    mazeWalls.forEach(wall => {
        const wallRect = {left: wall.x, right: wall.x + wall.w, top: wall.y, bottom: wall.y + wall.h};
        if (playerRect.left < wallRect.right && playerRect.right > wallRect.left &&
            playerRect.top < wallRect.bottom && playerRect.bottom > wallRect.top) {
            collision = true;
        }
    });
    
    if (!collision) {
        mazePlayerX = newX;
        mazePlayerY = newY;
        player.style.left = mazePlayerX + 'px';
        player.style.top = mazePlayerY + 'px';
    }
}

function endMazeGame() {
    mazeActive = false;
    clearInterval(mazeInterval);
    document.removeEventListener('keydown', handleMazeInput);
    
    const btn = document.getElementById('maze-finish');
    if (btn) btn.style.display = 'inline-block';
    
    // Удаляем стены
    document.querySelectorAll('.maze-wall').forEach(w => w.remove());
}

// === ВИКТОРИНА ===
let currentQuizQuestions = [];

function startQuizRound(index) {
    if (index >= 10) {
        showScene('quiz_after');
        return;
    }
    
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
    }
    setTimeout(() => startQuizRound(nextIndex), 300);
}
