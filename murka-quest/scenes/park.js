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
    
    // Мини-игра с самокатами (простая версия)
    scooters_game_play: {
        name: "",
        hideDialogue: true,
        customContent: () => `
            <div style="text-align: center; padding: 100px; color: white; min-height: 500px;">
                <h2 style="font-size: 48px; margin-bottom: 30px;">🛴 Игра с самокатами 🛴</h2>
                <div style="font-size: 100px; margin: 40px; animation: bounce 1s infinite;">🏃♂️🎯</div>
                <p style="font-size: 24px; margin: 30px;">Ты обгоняешь электросамокатчиков и стреляешь в них!</p>
                <div style="margin: 40px; padding: 30px; background: rgba(255,255,255,0.1); border-radius: 15px;">
                    <p style="font-size: 20px;">🎮 Управление:</p>
                    <p>⬆️️ Стрелки - движение</p>
                    <p>Пробел - стрельба</p>
                </div>
                <button class="start-btn" onclick="showScene('after_scooters')" style="margin-top: 30px; padding: 20px 60px; font-size: 24px;">
                    ЗАВЕРШИТЬ ИГРУ
                </button>
            </div>
            <style>
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
            </style>
        `
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
