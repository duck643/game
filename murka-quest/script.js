// ============================================
// ГЛОБАЛЬНОЕ СОСТОЯНИЕ ИГРЫ
// ============================================
let gameState = {
    playerName: '',
    currentScene: 'intro',
    backpackItem: '',
    quizScore: 0,
    hasSnack: false,
    metMurka: false,
    askedQuestions: []
};

// ============================================
// БАНК ВОПРОСОВ ДЛЯ ВИКТОРИНЫ (~60 вопросов)
// ============================================
const questionBank = [
    { q: "Сколько будет 2 + 2 × 2?", a: ["а) 6", "б) 8", "в) 4"], correct: 0 },
    { q: "Сколько граней у куба?", a: ["а) 4", "б) 6", "в) 8"], correct: 1 },
    { q: "Сколько будет 15% от 200?", a: ["а) 20", "б) 25", "в) 30"], correct: 2 },
    { q: "Какой угол у равностороннего треугольника?", a: ["а) 45°", "б) 60°", "в) 90°"], correct: 1 },
    { q: "Сколько будет √144?", a: ["а) 10", "б) 12", "в) 14"], correct: 1 },
    { q: "Сколько будет 7 × 8?", a: ["а) 54", "б) 56", "в) 64"], correct: 1 },
    { q: "Чему равен периметр квадрата со стороной 5?", a: ["а) 20", "б) 25", "в) 10"], correct: 0 },
    { q: "Сколько будет 100 ÷ 4?", a: ["а) 20", "б) 25", "в) 30"], correct: 1 },
    { q: "Какая дробь больше: 1/2 или 1/3?", a: ["а) 1/2", "б) 1/3", "в) Одинаковые"], correct: 0 },
    { q: "Сколько сантиметров в метре?", a: ["а) 10", "б) 100", "в) 1000"], correct: 1 },
    { q: "Сколько будет 9²?", a: ["а) 18", "б) 81", "в) 72"], correct: 1 },
    { q: "Чему равно 3³?", a: ["а) 9", "б) 27", "в) 6"], correct: 1 },
    { q: "Сколько будет 12 + 18?", a: ["а) 28", "б) 30", "в) 32"], correct: 1 },
    { q: "Сколько будет 50 - 27?", a: ["а) 21", "б) 23", "в) 25"], correct: 1 },
    { q: "Сколько минут в часе?", a: ["а) 50", "б) 60", "в) 100"], correct: 1 },
    { q: "Сколько будет ½ от 80?", a: ["а) 30", "б) 40", "в) 50"], correct: 1 },
    { q: "Какое число делится на 2 и на 5?", a: ["а) 12", "б) 15", "в) 20"], correct: 2 },
    { q: "Сколько будет 3,5 + 2,5?", a: ["а) 5", "б) 6", "в) 7"], correct: 1 },
    { q: "Чему равен диаметр круга, если радиус 7?", a: ["а) 7", "б) 14", "в) 21"], correct: 1 },
    { q: "Сколько будет 11 × 11?", a: ["а) 111", "б) 121", "в) 131"], correct: 1 },
    { q: "Сколько букв в русском алфавите?", a: ["а) 30", "б) 33", "в) 36"], correct: 1 },
    { q: "Какая часть речи обозначает действие?", a: ["а) Существительное", "б) Глагол", "в) Прилагательное"], correct: 1 },
    { q: "Сколько падежей в русском языке?", a: ["а) 4", "б) 6", "в) 8"], correct: 1 },
    { q: "Какое слово лишнее: стол, стул, бежать, шкаф?", a: ["а) стол", "б) бежать", "в) шкаф"], correct: 1 },
    { q: "Сколько гласных букв в русском алфавите?", a: ["а) 6", "б) 10", "в) 33"], correct: 1 },
    { q: "Сколько планет в Солнечной системе?", a: ["а) 7", "б) 8", "в) 9"], correct: 1 },
    { q: "Какая планета ближе всего к Солнцу?", a: ["а) Венера", "б) Земля", "в) Меркурий"], correct: 2 },
    { q: "Сколько дней в високосном году?", a: ["а) 365", "б) 366", "в) 367"], correct: 1 },
    { q: "Какой газ мы вдыхаем?", a: ["а) Кислород", "б) Азот", "в) Углекислый"], correct: 0 },
    { q: "Сколько ног у паука?", a: ["а) 6", "б) 8", "в) 10"], correct: 1 },
    { q: "Что тяжелее: килограмм пуха или килограмм железа?", a: ["а) Пух", "б) Железо", "в) Одинаково"], correct: 2 },
    { q: "Если сегодня вторник, какой день будет через 3 дня?", a: ["а) Четверг", "б) Пятница", "в) Суббота"], correct: 1 },
    { q: "Какое число следующее: 2, 4, 6, ...?", a: ["а) 7", "б) 8", "в) 10"], correct: 1 },
    { q: "Сколько углов у пятиугольника?", a: ["а) 4", "б) 5", "в) 6"], correct: 1 },
    { q: "Если 3 кошки ловят 3 мышки за 3 минуты, сколько времени нужно 1 кошке?", a: ["а) 1 мин", "б) 3 мин", "в) 9 мин"], correct: 1 },
    { q: "Сколько будет 25% от 80?", a: ["а) 15", "б) 20", "в) 25"], correct: 1 },
    { q: "Чему равна сумма углов треугольника?", a: ["а) 90°", "б) 180°", "в) 360°"], correct: 1 },
    { q: "Сколько будет 15 × 4?", a: ["а) 50", "б) 60", "в) 70"], correct: 1 },
    { q: "Какое число нечётное?", a: ["а) 24", "б) 37", "в) 50"], correct: 1 },
    { q: "Сколько будет 1000 ÷ 8?", a: ["а) 125", "б) 150", "в) 200"], correct: 0 },
    { q: "Чему равно 5! (факториал)?", a: ["а) 60", "б) 120", "в) 24"], correct: 1 },
    { q: "Сколько будет ⅓ от 90?", a: ["а) 20", "б) 30", "в) 40"], correct: 1 },
    { q: "Какое число кратно 3 и 4?", a: ["а) 10", "б) 12", "в) 14"], correct: 1 },
    { q: "Сколько будет 0,5 × 40?", a: ["а) 15", "б) 20", "в) 25"], correct: 1 },
    { q: "Чему равен радиус, если диаметр 10?", a: ["а) 5", "б) 10", "в) 20"], correct: 0 },
    { q: "Сколько будет 13 + 17?", a: ["а) 28", "б) 30", "в) 32"], correct: 1 },
    { q: "Сколько будет 45 - 19?", a: ["а) 24", "б) 26", "в) 28"], correct: 1 },
    { q: "Сколько секунд в минуте?", a: ["а) 50", "б) 60", "в) 100"], correct: 1 },
    { q: "Сколько будет 8 × 7?", a: ["а) 54", "б) 56", "в) 64"], correct: 1 },
    { q: "Чему равен периметр прямоугольника 4×6?", a: ["а) 10", "б) 20", "в) 24"], correct: 1 },
    { q: "Сколько будет 2⁴?", a: ["а) 8", "б) 16", "в) 32"], correct: 1 },
    { q: "Какое число простое?", a: ["а) 9", "б) 11", "в) 15"], correct: 1 },
    { q: "Сколько будет 144 ÷ 12?", a: ["а) 10", "б) 12", "в) 14"], correct: 1 }
];

// Функция получения 10 случайных уникальных вопросов
function getRandomQuestions(count = 10) {
    const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// ============================================
// РЕЕСТР СЦЕН
// ============================================
const scenes = {};

// ============================================
// ФУНКЦИЯ ПОКАЗА СЦЕНЫ
// ============================================
function showScene(sceneName) {
    const container = document.getElementById('game-container');
    const scene = scenes[sceneName];
    
    if (!scene) {
        console.error(`Scene "${sceneName}" not found!`);
        console.log('Available scenes:', Object.keys(scenes));
        return;
    }
    
    gameState.currentScene = sceneName;
    
    // Кастомный контент
    if (scene.customContent) {
        container.innerHTML = scene.customContent(gameState);
        if (scene.onEnter) setTimeout(() => scene.onEnter(gameState), 100);
        return;
    }
    
    // Текст и имя (могут быть функциями)
    let text = typeof scene.text === 'function' ? scene.text(gameState) : scene.text;
    let name = typeof scene.name === 'function' ? scene.name(gameState) : scene.name;
    
    // Генерация HTML
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
                                    onclick="makeChoice('${choice.next}', ${choice.correct !== undefined ? choice.correct : 'null'})">
                                ${choice.text}
                            </button>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    
    if (scene.onEnter) setTimeout(() => scene.onEnter(gameState), 100);
    if (scene.ending) container.classList.add('ending-scene');
}

// ============================================
// ОБРАБОТЧИКИ
// ============================================
function handleNameInput() {
    const input = document.getElementById('playerNameInput');
    const name = input?.value.trim();
    if (name) {
        const scene = scenes[gameState.currentScene];
        if (scene.onNext) scene.onNext(name);
    } else {
        alert('Пожалуйста, введите имя!');
    }
}

function makeChoice(nextScene, isCorrect) {
    // Обработка викторины
    if (isCorrect !== 'null') {
        if (isCorrect === 'true') gameState.quizScore++;
    }
    showScene(nextScene);
}

function resetGame() {
    gameState = {
        playerName: '', currentScene: 'intro', backpackItem: '',
        quizScore: 0, hasSnack: false, metMurka: false, askedQuestions: []
    };
}

// ============================================
// ИНИЦИАЛИЗАЦИЯ
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Регистрируем все сцены
    Object.assign(scenes, introScenes);
    Object.assign(scenes, backpackScenes);
    Object.assign(scenes, parkScenes);
    Object.assign(scenes, mazeScenes);
    Object.assign(scenes, endingScenes);
    
    // Запускаем игру
    showScene('intro');
    
    // Обработка Enter
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && document.getElementById('playerNameInput')) {
            handleNameInput();
        }
    });
});
