const mazeScenes = {
    // === ЛАБИРИНТ ===
    maze_intro: {
        name: "Мурка",
        text: "Короче, нам надо пройти лабиринт... Парк строили дурачки.",
        choices: [
            { text: "НАЧАТЬ ЛАБИРИНТ", next: 'after_maze', action: () => startMazeGame() }
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
            { text: "НАЧАТЬ ПОИСК", next: 'after_find_snack', action: () => startFindSnackGame() }
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
            { text: "НАЧАТЬ ВИКТОРИНУ", next: 'quiz_question_1', action: () => startQuiz() }
        ]
    }
};
