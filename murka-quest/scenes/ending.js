const endingScenes = {
    // === КОНЦОВКИ ===
    ending_angry: {
        name: "КОНЕЦ",
        text: "Ну и ладно! Игра окончена.",
        ending: true,
        hideDialogue: true,
        customContent: () => `
            <div class="ending-scene">
                <h1 class="ending-title">КОНЕЦ</h1>
                <div class="dialogue-box">
                    <div class="dialogue-text">Ну и ладно! Игра окончена.</div>
                    <button class="start-btn" onclick="resetGame(); showScene('intro');">НАЧАТЬ ЗАНОВО</button>
                </div>
            </div>
        `
    },
    
    ending_stalker: {
        name: "Мурка",
        text: "Какой-то сталкеринг... Пока.",
        ending: true,
        hideDialogue: true,
        customContent: () => `
            <div class="ending-scene">
                <h1 class="ending-title">КОНЕЦ</h1>
                <div class="dialogue-box">
                    <div class="dialogue-text">Какой-то сталкеринг... Пока.</div>
                    <button class="start-btn" onclick="resetGame(); showScene('intro');">НАЧАТЬ ЗАНОВО</button>
                </div>
            </div>
        `
    },
    
    ending_normal: {
        name: "КОНЕЦ",
        text: "Спасибо за игру! Надеюсь, тебе понравилось!",
        ending: true,
        hideDialogue: true,
        customContent: () => `
            <div class="ending-scene">
                <h1 class="ending-title">СПАСИБО!</h1>
                <div class="dialogue-box">
                    <div class="dialogue-text">Спасибо за игру! Надеюсь, тебе понравилось!</div>
                    <div class="quiz-score">Твой счёт в викторине: ${gameState.quizScore}/5</div>
                    <button class="start-btn" onclick="resetGame(); showScene('intro');">НАЧАТЬ ЗАНОВО</button>
                </div>
            </div>
        `
    },
    
    // === ФИНАЛЬНЫЕ ДИАЛОГИ ===
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
    }
};
