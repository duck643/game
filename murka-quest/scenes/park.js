const parkScenes = {
    // === ВЫБОР: САМОКАТЫ ИЛИ ТАКСИ ===
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
        text: "Ну ничего себе, зажравшиеся люди. Я денег не дам, у тебя есть? Пошли пешком обгонять электросамокатчиков.",
        choices: [
            { text: "Ладно, играем", next: 'scooters_game_intro' }
        ]
    },
    
    scooters_game_intro: {
        name: "Мурка",
        text: "Пф... Нищеброды... Ладно, давай играть.",
        choices: [
            { text: "НАЧАТЬ ИГРУ", next: 'scooters_game_play' }
        ]
    },
    
    // === РАБОЧАЯ МИНИ-ИГРА ===
    scooters_game_play: {
        name: "",
        hideDialogue: true,
        customContent: () => `
            <div style="text-align: center; color: white; padding: 20px;">
                <h2 style="margin-bottom: 10px;">🛴 Обгоняй самокаты! 🎯</h2>
                <p style="margin-bottom: 20px;">Стрелки ⬆️️ - движение, Пробел - стрельба</p>
                <div style="font-size: 20px; margin-bottom: 10px;">Счёт: <span id="game-score">0</span> | Жизни: <span id="game-lives">3</span></div>
                <div id="scooters-game-area" style="
                    width: 800px; 
                    height: 400px; 
                    background: linear-gradient(to bottom, #1a1a2e 0%, #16213e 100%);
                    margin: 0 auto;
                    border-radius: 10px;
                    position: relative;
                    overflow: hidden;
                    border: 3px solid #0f3460;
                ">
                    <div id="player" style="
                        width: 50px;
                        height: 50px;
                        background: #00d9ff;
                        border-radius: 50%;
                        position: absolute;
                        left: 50px;
                        top: 175px;
                        box-shadow: 0 0 20px #00d9ff;
                        transition: transform 0.1s;
                    ">🏃</div>
                </div>
                <button id="finish-game-btn" class="start-btn" style="margin-top: 20px; display: none;" onclick="showScene('after_scooters')">
                    ПРОДОЛЖИТЬ
                </button>
            </div>
        `,
        onEnter: () => {
            setTimeout(initScootersMiniGame, 100);
        }
    },
    
    // === ПОСЛЕ ИГРЫ ===
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
        customContent: () => `
            <div style="text-align: center; margin: 100px 0;">
                <a href="https://duck643.github.io/testnormis/" target="_blank" class="start-btn" style="display: inline-block; padding: 20px 40px; font-size: 24px; background: #9B59B6; color: white; text-decoration: none; border-radius: 10px;">
                    ОТКРЫТЬ ТЕСТ ↗
                </a>
            </div>
        `,
        choices: [
            { text: "Прошёл тест. Далее", next: 'maze_intro' }
        ]
    }
};

// === РАБОЧАЯ МИНИ-ИГРА ===
let gameInterval;
let spawnInterval;
let playerY = 175;
let score = 0;
let lives = 3;
let gameActive = false;
let obstacles = [];
let projectiles = [];

function initScootersMiniGame() {
    const gameArea = document.getElementById('scooters-game-area');
    const player = document.getElementById('player');
    if (!gameArea || !player) return;
    
    gameActive = true;
    playerY = 175;
    score = 0;
    lives = 3;
    obstacles = [];
    projectiles = [];
    
    updateGameUI();
    
    // Управление
    document.addEventListener('keydown', handleGameInput);
    
    // Спавн самокатов
    spawnInterval = setInterval(() => {
        if (!gameActive) return;
        spawnScooter();
    }, 1500);
    
    // Игровой цикл
    gameInterval = setInterval(() => {
        if (!gameActive) return;
        updateGame();
    }, 50);
    
    // Автозавершение через 15 секунд
    setTimeout(() => {
        endMiniGame();
    }, 15000);
}

function handleGameInput(e) {
    const player = document.getElementById('player');
    if (!player || !gameActive) return;
    
    if (e.key === 'ArrowUp' && playerY > 0) {
        playerY -= 30;
        player.style.top = playerY + 'px';
    }
    if (e.key === 'ArrowDown' && playerY < 350) {
        playerY += 30;
        player.style.top = playerY + 'px';
    }
    if (e.key === ' ' || e.key === 'Spacebar') {
        shootProjectile();
    }
}

function spawnScooter() {
    const gameArea = document.getElementById('scooters-game-area');
    const scooter = document.createElement('div');
    scooter.className = 'scooter-obstacle';
    scooter.style.cssText = `
        width: 60px;
        height: 60px;
        background: #ff6b6b;
        position: absolute;
        right: 0;
        top: ${Math.random() * 300}px;
        border-radius: 10px;
        font-size: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 15px #ff6b6b;
    `;
    scooter.textContent = '🛴';
    gameArea.appendChild(scooter);
    obstacles.push({ element: scooter, x: 800, y: parseFloat(scooter.style.top) });
}

function shootProjectile() {
    const gameArea = document.getElementById('scooters-game-area');
    const player = document.getElementById('player');
    const projectile = document.createElement('div');
    projectile.className = 'projectile';
    projectile.style.cssText = `
        width: 30px;
        height: 10px;
        background: #ffd93d;
        position: absolute;
        left: 100px;
        top: ${playerY + 20}px;
        border-radius: 5px;
        box-shadow: 0 0 10px #ffd93d;
    `;
    gameArea.appendChild(projectile);
    projectiles.push({ element: projectile, x: 100, y: playerY + 20 });
}

function updateGame() {
    const player = document.getElementById('player');
    const playerRect = player.getBoundingClientRect();
    
    // Двигаем самокаты
    obstacles.forEach((obs, index) => {
        obs.x -= 5;
        obs.element.style.right = (800 - obs.x) + 'px';
        
        // Проверка столкновения с игроком
        const obsRect = obs.element.getBoundingClientRect();
        if (playerRect.left < obsRect.right &&
            playerRect.right > obsRect.left &&
            playerRect.top < obsRect.bottom &&
            playerRect.bottom > obsRect.top) {
            // Столкновение!
            obs.element.remove();
            obstacles.splice(index, 1);
            lives--;
            updateGameUI();
            
            if (lives <= 0) {
                endMiniGame();
            }
        }
        
        // Удаление если ушёл за экран
        if (obs.x < -100) {
            obs.element.remove();
            obstacles.splice(index, 1);
            score++;
            updateGameUI();
        }
    });
    
    // Двигаем снаряды
    projectiles.forEach((proj, pIndex) => {
        proj.x += 15;
        proj.element.style.left = proj.x + 'px';
        
        // Проверка попадания в самокаты
        obstacles.forEach((obs, obsIndex) => {
            const projRect = proj.element.getBoundingClientRect();
            const obsRect = obs.element.getBoundingClientRect();
            
            if (projRect.left < obsRect.right &&
                projRect.right > obsRect.left &&
                projRect.top < obsRect.bottom &&
                projRect.bottom > obsRect.top) {
                // Попадание!
                proj.element.remove();
                obs.element.remove();
                projectiles.splice(pIndex, 1);
                obstacles.splice(obsIndex, 1);
                score += 2;
                updateGameUI();
            }
        });
        
        // Удаление снаряда если ушёл за экран
        if (proj.x > 800) {
            proj.element.remove();
            projectiles.splice(pIndex, 1);
        }
    });
}

function updateGameUI() {
    const scoreEl = document.getElementById('game-score');
    const livesEl = document.getElementById('game-lives');
    if (scoreEl) scoreEl.textContent = score;
    if (livesEl) livesEl.textContent = lives;
}

function endMiniGame() {
    gameActive = false;
    clearInterval(gameInterval);
    clearInterval(spawnInterval);
    document.removeEventListener('keydown', handleGameInput);
    
    // Показываем кнопку "Продолжить"
    const finishBtn = document.getElementById('finish-game-btn');
    if (finishBtn) {
        finishBtn.style.display = 'inline-block';
    }
    
    // Очищаем игровое поле
    obstacles.forEach(obs => obs.element.remove());
    projectiles.forEach(proj => proj.element.remove());
}
