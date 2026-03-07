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
            { 
                text: "НАЧАТЬ ИГРУ", 
                next: 'after_scooters',
                onClick: () => {
                    if (typeof startScootersGame === 'function') {
                        startScootersGame();
                    }
                }
            }
        ]
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
                <a href="https://duck643.github.io/testnormis/" target="_blank" class="start-btn">
                    ОТКРЫТЬ ТЕСТ
                </a>
            </div>
        `,
        choices: [
            { text: "Прошёл тест. Далее", next: 'maze_intro' }
        ]
    }
};
