const backpackScenes = {
    // === СБОР РЮКЗАКА ===
    backpack_intro: {
        name: "Мурка",
        text: (state) => `Так вот, "${state.playerName}", первым твоим заданием будет собрать рюкзак, мы кое-куда пойдём. Что ты с собой возьмёшь из еды?`,
        choices: [
            { text: "а) Банка тушёнки", next: 'backpack_tushonka' },
            { text: "б) Сыр косичка", next: 'backpack_syr' },
            { text: "в) Макароны", next: 'backpack_macaroni' },
            { text: "г) Орешки", next: 'backpack_orehki' }
        ]
    },
    
    backpack_tushonka: {
        name: "Мурка",
        text: (state) => `А зачем она тебе? Нам идти-то минут 30. ${state.playerName}, ты реально из космоса? Ладно, пошли, идём в парк.`,
        choices: [
            { text: "Идти в парк", next: 'scooters_choice' }
        ]
    },
    
    backpack_syr: {
        name: "Мурка",
        text: "Одобряю. Ладно, пошли, идём в парк.",
        choices: [
            { text: "Идти в парк", next: 'scooters_choice' }
        ]
    },
    
    backpack_macaroni: {
        name: "Мурка",
        text: "А варить-то их где будешь? Ладно, пошли, идём в парк.",
        choices: [
            { text: "Идти в парк", next: 'scooters_choice' }
        ]
    },
    
    backpack_orehki: {
        name: "Мурка",
        text: "Одобряю. Ладно, пошли, идём в парк.",
        choices: [
            { text: "Идти в парк", next: 'scooters_choice' }
        ]
    }
};
