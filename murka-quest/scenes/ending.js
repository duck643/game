const endingScenes = {
    ending_angry: {
        name: "Мурка",
        text: "Пока.",
        choices: [{ text: "НАЧАТЬ ЗАНОВО", next: 'intro', action: () => resetGame() }]
    },
    
    ending_calm: {
        name: "Аноним",
        text: "Да, это всё. А что тебе ещё что-то надо? Ничего нет, пока.",
        choices: [{ text: "НАЧАТЬ ЗАНОВО", next: 'intro', action: () => resetGame() }]
    }
};
