// === МИНИ-ИГРА: ПОИСК ЛАКОМСТВА ===
let puzzleGame = {
    pieces: [],
    snackFound: false
};

function startFindSnackGame() {
    const container = document.getElementById('game-container');
    
    container.innerHTML = `
        <div class="scene puzzle">
            <div style="text-align: center; color: white; margin: 20px;">
                <h2>Найди лакомство!</h2>
                <p>Перетаскивай фигуры, чтобы найти спрятанный предмет</p>
            </div>
            <div class="puzzle-container" id="puzzle-game">
                <div class="snack-hidden" id="snack"></div>
            </div>
        </div>
    `;
    
    const gameArea = document.getElementById('puzzle-game');
    const snack = document.getElementById('snack');
    
    // Позиция лакомства (скрыта под фигурами)
    snack.style.left = '270px';
    snack.style.top = '170px';
    
    // Создаём 6 геометрических фигур
    const shapes = [
        { width: 150, height: 100, left: 250, top: 150, color: '#E74C3C', borderRadius: '0' },
        { width: 120, height: 120, left: 280, top: 140, color: '#3498DB', borderRadius: '50%' },
        { width: 140, height: 100, left: 260, top: 160, color: '#2ECC71', borderRadius: '10px' },
        { width: 100, height: 100, left: 300, top: 180, color: '#F39C12', borderRadius: '5px' },
        { width: 160, height: 80, left: 240, top: 190, color: '#9B59B6', borderRadius: '40px' },
        { width: 130, height: 110, left: 270, top: 155, color: '#1ABC9C', borderRadius: '15px' }
    ];
    
    shapes.forEach((shape, index) => {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.style.width = shape.width + 'px';
        piece.style.height = shape.height + 'px';
        piece.style.left = shape.left + 'px';
        piece.style.top = shape.top + 'px';
        piece.style.background = shape.color;
        piece.style.borderRadius = shape.borderRadius;
        piece.style.zIndex = index;
        piece.dataset.index = index;
        
        // Drag functionality
        piece.addEventListener('mousedown', startDrag);
        
        gameArea.appendChild(piece);
        puzzleGame.pieces.push(piece);
    });
    
    function startDrag(e) {
        const piece = e.target;
        piece.classList.add('dragging');
        
        let shiftX = e.clientX - piece.getBoundingClientRect().left;
        let shiftY = e.clientY - piece.getBoundingClientRect().top;
        
        function moveAt(pageX, pageY) {
            piece.style.left = pageX - shiftX - gameArea.getBoundingClientRect().left + 'px';
            piece.style.top = pageY - shiftY - gameArea.getBoundingClientRect().top + 'px';
        }
        
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
            checkSnackFound();
        }
        
        document.addEventListener('mousemove', onMouseMove);
        
        piece.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            piece.classList.remove('dragging');
            piece.onmouseup = null;
        };
    }
    
    function checkSnackFound() {
        if (puzzleGame.snackFound) return;
        
        // Проверяем, открыто ли лакомство
        const snackRect = snack.getBoundingClientRect();
        let isVisible = true;
        
        puzzleGame.pieces.forEach(piece => {
            const pieceRect = piece.getBoundingClientRect();
            if (pieceRect.left < snackRect.right &&
                pieceRect.right > snackRect.left &&
                pieceRect.top < snackRect.bottom &&
                pieceRect.bottom > snackRect.top) {
                isVisible = false;
            }
        });
        
        if (isVisible) {
            puzzleGame.snackFound = true;
            snack.classList.add('found');
            gameState.hasSnack = true;
            
            setTimeout(() => {
                alert('Лакомство найдено!');
                showScene('after_find_snack');
            }, 500);
        }
    }
}
