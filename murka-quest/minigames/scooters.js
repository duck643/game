// === МИНИ-ИГРА: ЭЛЕКТРОСАМОКАТЫ ===
let scootersGame = {
    player: null,
    obstacles: [],
    projectiles: [],
    score: 0,
    gameLoop: null,
    isRunning: false
};

function startScootersGame() {
    const container = document.getElementById('game-container');
    
    container.innerHTML = `
        <div class="scene scooters">
            <div class="minigame-container" id="scooters-game">
                <div class="player" id="player"></div>
            </div>
            <div style="text-align: center; color: white; font-size: 24px; margin: 20px;">
                Счёт: <span id="scooter-score">0</span>
                <br>
                <small>Стрелки - движение, Пробел - стрельба</small>
            </div>
        </div>
    `;
    
    scootersGame.isRunning = true;
    scootersGame.score = 0;
    scootersGame.obstacles = [];
    scootersGame.projectiles = [];
    
    const player = document.getElementById('player');
    const gameArea = document.getElementById('scooters-game');
    
    let playerX = 100;
    let playerY = 225;
    
    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';
    
    // Управление
    document.addEventListener('keydown', handleScootersInput);
    
    // Спавн препятствий
    scootersGame.gameLoop = setInterval(() => {
        if (!scootersGame.isRunning) return;
        
        // Создаём самокат
        const obstacle = document.createElement('div');
        obstacle.className = 'obstacle';
        obstacle.style.left = '800px';
        obstacle.style.top = Math.random() * 400 + 'px';
        gameArea.appendChild(obstacle);
        scootersGame.obstacles.push(obstacle);
        
        // Двигаем препятствия
        scootersGame.obstacles.forEach((obs, index) => {
            let x = parseFloat(obs.style.left);
            x -= 5;
            obs.style.left = x + 'px';
            
            // Удаляем если ушёл за экран
            if (x < -100) {
                obs.remove();
                scootersGame.obstacles.splice(index, 1);
                scootersGame.score++;
                document.getElementById('scooter-score').textContent = scootersGame.score;
            }
            
            // Проверка столкновения
            if (checkCollision(player, obs)) {
                endScootersGame();
            }
        });
        
        // Двигаем снаряды
        scootersGame.projectiles.forEach((proj, index) => {
            let x = parseFloat(proj.style.left);
            x += 10;
            proj.style.left = x + 'px';
            
            if (x > 800) {
                proj.remove();
                scootersGame.projectiles.splice(index, 1);
            }
        });
        
    }, 50);
    
    // Завершаем через 10 секунд
    setTimeout(() => {
        endScootersGame();
    }, 10000);
}

function handleScootersInput(e) {
    const player = document.getElementById('player');
    if (!player) return;
    
    let y = parseFloat(player.style.top);
    let x = parseFloat(player.style.left);
    
    if (e.key === 'ArrowUp' && y > 0) {
        player.style.top = (y - 20) + 'px';
    }
    if (e.key === 'ArrowDown' && y < 450) {
        player.style.top = (y + 20) + 'px';
    }
    if (e.key === ' ' || e.key === 'Spacebar') {
        shootProjectile();
    }
}

function shootProjectile() {
    const gameArea = document.getElementById('scooters-game');
    const player = document.getElementById('player');
    
    const projectile = document.createElement('div');
    projectile.className = 'projectile';
    projectile.style.left = (parseFloat(player.style.left) + 50) + 'px';
    projectile.style.top = (parseFloat(player.style.top) + 20) + 'px';
    gameArea.appendChild(projectile);
    scootersGame.projectiles.push(projectile);
}

function checkCollision(el1, el2) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();
    
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

function endScootersGame() {
    scootersGame.isRunning = false;
    clearInterval(scootersGame.gameLoop);
    document.removeEventListener('keydown', handleScootersInput);
    
    setTimeout(() => {
        showScene('after_scooters');
    }, 500);
}
