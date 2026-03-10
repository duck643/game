const backpackScenes = {
    backpack_intro: {
        name: "Аноним",
        text: (state) => `Так вот, "${state.playerName}", первым твоим заданием будет собрать рюкзак, мы кое-куда пойдём. Что ты с собой возьмёшь из еды?`,
        choices: [
            { text: "а) Банка тушёнки", next: 'backpack_tushonka' },
            { text: "б) Сыр косичка", next: 'backpack_syr' },
            { text: "в) Макароны", next: 'backpack_macaroni' },
            { text: "г) Орешки", next: 'backpack_orehki' }
        ]
    },
    
    backpack_tushonka: {
        name: "Аноним",
        text: (state) => `А зачем она тебе? Нам идти-то минут 30.\n${state.playerName}, ты реально из космоса?`,
        choices: [{ text: "Ладно, идём в парк", next: 'scooters_choice' }]
    },
    
    backpack_syr: {
        name: "Аноним",
        text: "Одобряю.",
        choices: [{ text: "Ладно, идём в парк", next: 'scooters_choice' }]
    },
    
    backpack_macaroni: {
        name: "Аноним",
        text: "А варить-то их где будешь?",
        choices: [{ text: "Ладно, идём в парк", next: 'scooters_choice' }]
    },
    
    backpack_orehki: {
        name: "Аноним",
        text: "Одобряю.",
        choices: [{ text: "Ладно, идём в парк", next: 'scooters_choice' }]
    }
};
