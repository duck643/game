// scenes/park.js
export default {
  name: "Парк",
  scenes: [
    {
      name: "Мурка",
      text: "Ого, сколько самокатов! А что это за кнопка?",
      background: "park",
      character: "murka",
      buttons: [
        {
          text: "НАЖАТЬ КНОПКУ",
          next: "scooters_game_intro"
        }
      ]
    },
    {
      name: "Мурка",
      text: "Так, это какой-то игровой автомат с самокатами. Хочешь попробовать?",
      background: "park",
      character: "murka",
      buttons: [
        {
          text: "НАЧАТЬ ИГРУ",
          next: "scooters_game_play"  // Обратите внимание на правильное имя сцены
        }
      ]
    },
    {
      name: "Мурка",
      text: "🎮 МИНИ-ИГРА: ГОНКИ НА САМОКАТАХ 🎮\n\nУправление:\n← → - движение\nПробел - прыжок\n\nЦель: пройти трассу за 60 секунд!",
      background: "park",
      character: "murka",
      buttons: [
        {
          text: "ЗАВЕРШИТЬ ИГРУ",
          next: "after_scooters"
        }
      ]
    },
    {
      name: "Мурка",
      text: "Фух, было весело! Но я уже устала кататься. Пойдём дальше?",
      background: "park",
      character: "murka",
      buttons: [
        {
          text: "ДАЛЕЕ",
          next: "next_scene"  // Замените на имя следующей сцены
        }
      ]
    }
  ]
};
