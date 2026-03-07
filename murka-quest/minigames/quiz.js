// === ВИКТОРИНА ===
let quizGame = {
    currentQuestion: 0,
    score: 0,
    questions: []
};

const quizQuestions = [
    {
        question: "Сколько будет 2 + 2 × 2?",
        answers: [
            { text: "а) 6", correct: true },
            { text: "б) 8", correct: false },
            { text: "в) 4", correct: false }
        ]
    },
    {
        question: "Сколько граней у куба?",
        answers: [
            { text: "а) 4", correct: false },
            { text: "б) 6", correct: true },
            { text: "в) 8", correct: false }
        ]
    },
    {
        question: "Сколько будет 15% от 200?",
        answers: [
            { text: "а) 20", correct: false },
            { text: "б) 25", correct: false },
            { text: "в) 30", correct: true }
        ]
    },
    {
        question: "Какой угол у равностороннего треугольника?",
        answers: [
            { text: "а) 45°", correct: false },
            { text: "б) 60°", correct: true },
            { text: "в) 90°", correct: false }
        ]
    },
    {
        question: "Сколько будет √144?",
        answers: [
            { text: "а) 10", correct: false },
            { text: "б) 12", correct: true },
            { text: "в) 14", correct: false }
        ]
    }
];

function startQuiz() {
    quizGame.currentQuestion = 0;
    quizGame.score = 0;
    showQuizQuestion(0);
}

function showQuizQuestion(index) {
    if (index >= quizQuestions.length) {
        endQuiz();
        return;
    }
    
    const q = quizQuestions[index];
    const container = document.getElementById('game-container');
    
    container.innerHTML = `
        <div class="scene quiz">
            <div class="quiz-container">
                <div class="quiz-score">Вопрос ${index + 1}/5 | Счёт: ${quizGame.score}</div>
                <div class="quiz-question">${q.question}</div>
                <div class="choices">
                    ${q.answers.map((answer, i) => `
                        <button class="choice-btn" onclick="answerQuiz(${i}, ${answer.correct})">
                            ${answer.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function answerQuiz(answerIndex, isCorrect) {
    if (isCorrect) {
        quizGame.score++;
    }
    
    quizGame.currentQuestion++;
    showQuizQuestion(quizGame.currentQuestion);
}

function endQuiz() {
    gameState.quizScore = quizGame.score;
    
    // После викторины идём на финальные диалоги
    setTimeout(() => {
        showScene('quiz_end');
    }, 500);
}

// Добавляем сцену конца викторины в maze.js
// (нужно добавить в scenes/maze.js)
