const introScenes = {
    // === ПРИВЕТСТВИЕ ===
    intro: {
        text: "Привет! У меня есть для тебя кое-что... Хочешь узнать что? Давай познакомимся",
        input: true,
        placeholder: "Введите ваше имя",
        button: "НАЧАТЬ",
        onNext: (name) => {
            gameState.playerName = name;
            showScene('intro_reaction');
        }
    },
    
    intro_reaction: {
        name: "",
        text: (state) => `Какое странное имя... ${state.playerName}... Ты из космоса или Австралии? Ладно, не суть.`,
        choices: [
            { text: "Продолжить", next: 'backpack_intro' }
        ]
    }
};
