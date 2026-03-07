// Глобальные переменные
let gameState = {
    playerName: '',
    currentScene: 'intro',
    backpackItems: [],
    quizScore: 0,
    hasSnack: false,
    frogDefeated: false
};

// Сценарий диалогов
const dialogues = {
    intro: {
        text: "Привет! У меня есть для тебя кое-что... Хочешь узнать что? Давай познакомимся!",
        input: true,
        placeholder: "Введите ваше имя",
        button: "НАЧАТЬ",
        onNext: (name) => {
            gameState.playerName = name;
            showScene('backpack');
        }
    },
    backpack: {
        name: "Мурка",
        text: `Так вот, "${gameState.playerName}", первым твоим заданием будет собрать рюкзак. Мы кое-куда пойдём. Что ты с собой возьмёшь из еды?`,
        choices: [
            { text: "а) Банка тушёнки", next: 'backpack_tushonka' },
            { text: "б) Сыр косичка", next: 'backpack_syr' },
            { text: "в) Макароны", next: 'backpack_macaroni' },
            { text: "г) Орешки", next: 'backpack_oreški' }
        ]
    },
    // ... остальные сцены
};

// Функция показа сцены
function showScene(sceneName) {
    const container = document.getElementById('game-container');
    const scene = dialogues[sceneName];
    
    let html = `
        <div class="scene">
            <div class="dialogue-box">
                ${scene.name ? `<div class="dialogue-name">${scene.name}</div>` : ''}
                <div class="dialogue-text">${scene.text}</div>
                
                ${scene.input ? `
                    <input type="text" class="name-input" placeholder="${scene.placeholder}" id="playerNameInput">
                    <button class="start-btn" onclick="handleNameInput()">${scene.button}</button>
                ` : ''}
                
                ${scene.choices ? `
                    <div class="choices">
                        ${scene.choices.map((choice, index) => `
                            <button class="choice-btn" onclick="makeChoice('${choice.next}')">
                                ${choice.text}
                            </button>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// Обработка ввода имени
function handleNameInput() {
    const name = document.getElementById('playerNameInput').value;
    if (name.trim()) {
        gameState.playerName = name;
        showScene('backpack');
    }
}

// Обработка выбора
function makeChoice(nextScene) {
    showScene(nextScene);
}

// Инициализация игры
window.onload = () => {
    showScene('intro');
};
