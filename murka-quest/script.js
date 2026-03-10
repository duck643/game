// ============================================
// ГЛОБАЛЬНОЕ СОСТОЯНИЕ ИГРЫ
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

// Реестр всех сцен
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
    
    // Если есть кастомный контент
    if (scene.customContent) {
        container.innerHTML = scene.customContent(gameState);
        if (scene.onEnter) {
            setTimeout(() => scene.onEnter(gameState), 100);
        }
        return;
    }
    
    // Получаем текст (может быть функцией)
    let text = typeof scene.text === 'function' ? scene.text(gameState) : scene.text;
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
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    
    // Если есть действие при входе
    if (scene.onEnter) {
        setTimeout(() => scene.onEnter(gameState), 100);
    }
}

// ============================================
// ОБРАБОТЧИКИ
// ============================================
function handleNameInput() {
    const input = document.getElementById('playerNameInput');
    const name = input.value.trim();
    
    if (name) {
        const scene = scenes[gameState.currentScene];
        if (scene.onNext) {
            scene.onNext(name);
        }
    } else {
        alert('Пожалуйста, введите имя!');
    }
}

function makeChoice(nextScene, isCorrect = null) {
    // Обработка викторины
    if (isCorrect !== null) {
        const currentSceneData = scenes[gameState.currentScene];
        if (currentSceneData && currentSceneData.quiz) {
            if (isCorrect) {
                gameState.quizScore++;
            }
        }
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
