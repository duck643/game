const parkScenes = {
    scooters_choice: {
        name: "Аноним",
        text: "По пути в парк много электросамокатчиков... Закажем такси или поиграем?",
        choices: [
            { text: "а) Поиграем!", next: 'scooters_play_intro' },
            { text: "б) Такси", next: 'taxi_reaction' }
        ]
    },
    
    taxi_reaction: {
        name: "Аноним",
        text: "Ну ничего себе, зажравшиеся люди. Я денег не дам, у тебя есть?\nПошли пешком обгонять электросамокатчиков.",
        choices: [{ text: "НАЧАТЬ ИГРУ", next: 'scooters_game' }]
    },
    
    scooters_play_intro: {
        name: "Аноним",
        text: "Пф... Нищеброды... Ладно, давай играть.",
        choices: [{ text: "НАЧАТЬ ИГРУ", next: 'scooters_game' }]
    },
    
    scooters_game: {
        name: "",
        hideDialogue: true,
        customContent: () => `
            <div style="text-align:center;color:white;padding:20px">
                <h2>🛴 Обгоняй самокаты! 🎯</h2>
                <p>Стрелки ⬆️⬇️ - движение, Пробел - стрельба</p>
                <div style="font-size:20px;margin:10px">Счёт: <span id="gscore">0</span> | Жизни: <span id="glives">3</span></div>
                <div id="garea" style="width:800px;height:400px;background:linear-gradient(to bottom,#1a1a2e,#16213e);margin:0 auto;border-radius:10px;position:relative;overflow:hidden;border:3px solid #0f3460">
                    <div id="gplayer" style="width:50px;height:50px;background:#00d9ff;border-radius:50%;position:absolute;left:50px;top:175px;box-shadow:0 0 20px #00d9ff">🏃</div>
                </div>
                <button id="gfinish" class="start-btn" style="margin-top:20px;display:none" onclick="showScene('after_scooters')">ПРОДОЛЖИТЬ</button>
            </div>
        `,
        onEnter: () => setTimeout(initScootersGame, 100)
    },
    
    after_scooters: {
        name: "Аноним",
        text: "Чтож... Всё не так безнадежно. И вот мы в парке. Как тебе тут?",
        choices: [
            { text: "а) Хочу домой", next: 'park_sad' },
            { text: "б) Ну норм", next: 'park_sad' },
            { text: "в) Обожаю парки!", next: 'park_optimist' }
        ]
    },
    
    park_sad: {
        name: "Аноним",
        text: "Обидно... Я так долго выбирал парк...",
        choices: [{ text: "Далее", next: 'maze_intro' }]
    },
    
    park_optimist: {
        name: "Аноним",
        text: "Оптимистов никто не любит... Пройди-ка тест:\nhttps://duck643.github.io/testnormis/",
        customContent: () => `
            <div style="text-align:center;margin:50px 0">
                <a href="https://duck643.github.io/testnormis/" target="_blank" class="start-btn" style="display:inline-block;padding:20px 40px;font-size:24px;background:#9B59B6;color:white;text-decoration:none;border-radius:10px;margin-bottom:20px">
                    ОТКРЫТЬ ТЕСТ ↗
                </a>
            </div>
        `,
        choices: [{ text: "Далее", next: 'maze_intro' }]
    }
};

// === МИНИ-ИГРА С САМОКАТАМИ ===
let gInterval, gSpawn, gY=175, gScore=0, gLives=3, gActive=false, gObs=[], gProj=[];

function initScootersGame() {
    const area = document.getElementById('garea'), player = document.getElementById('gplayer');
    if (!area || !player) return;
    gActive = true; gY=175; gScore=0; gLives=3; gObs=[]; gProj=[];
    updateGameUI();
    document.addEventListener('keydown', handleGameInput);
    gSpawn = setInterval(() => { if(gActive) spawnObstacle(); }, 1500);
    gInterval = setInterval(updateGame, 50);
    setTimeout(endGame, 15000);
}

function handleGameInput(e) {
    const p = document.getElementById('gplayer');
    if (!p || !gActive) return;
    if (e.key==='ArrowUp' && gY>0) { gY-=30; p.style.top=gY+'px'; }
    if (e.key==='ArrowDown' && gY<350) { gY+=30; p.style.top=gY+'px'; }
    if (e.key===' ' || e.key==='Spacebar') shoot();
}

function spawnObstacle() {
    const area = document.getElementById('garea');
    const obs = document.createElement('div');
    obs.style.cssText = `width:60px;height:60px;background:#ff6b6b;position:absolute;right:0;top:${Math.random()*300}px;border-radius:10px;font-size:40px;display:flex;align-items:center;justify-content:center;box-shadow:0 0 15px #ff6b6b`;
    obs.textContent = '🛴';
    area.appendChild(obs);
    gObs.push({el:obs, x:800, y:parseFloat(obs.style.top)});
}

function shoot() {
    const area = document.getElementById('garea');
    const proj = document.createElement('div');
    proj.style.cssText = `width:30px;height:10px;background:#ffd93d;position:absolute;left:100px;top:${gY+20}px;border-radius:5px;box-shadow:0 0 10px #ffd93d`;
    area.appendChild(proj);
    gProj.push({el:proj, x:100, y:gY+20});
}

function updateGame() {
    const p = document.getElementById('gplayer'), pr = p?.getBoundingClientRect();
    gObs.forEach((o,i) => {
        o.x -= 5; o.el.style.right = (800-o.x)+'px';
        const or = o.el.getBoundingClientRect();
        if (pr?.left<or.right && pr?.right>or.left && pr?.top<or.bottom && pr?.bottom>or.top) {
            o.el.remove(); gObs.splice(i,1); gLives--; updateGameUI();
            if (gLives<=0) endGame();
        }
        if (o.x<-100) { o.el.remove(); gObs.splice(i,1); gScore++; updateGameUI(); }
    });
    gProj.forEach((p,i) => {
        p.x += 15; p.el.style.left = p.x+'px';
        gObs.forEach((o,oi) => {
            const pr=p.el.getBoundingClientRect(), or=o.el.getBoundingClientRect();
            if (pr.left<or.right && pr.right>or.left && pr.top<or.bottom && pr.bottom>or.top) {
                p.el.remove(); o.el.remove(); gProj.splice(i,1); gObs.splice(oi,1); gScore+=2; updateGameUI();
            }
        });
        if (p.x>800) { p.el.remove(); gProj.splice(i,1); }
    });
}

function updateGameUI() {
    const s=document.getElementById('gscore'), l=document.getElementById('glives');
    if(s) s.textContent=gScore; if(l) l.textContent=gLives;
}

function endGame() {
    gActive=false; clearInterval(gInterval); clearInterval(gSpawn);
    document.removeEventListener('keydown', handleGameInput);
    const btn=document.getElementById('gfinish'); if(btn) btn.style.display='inline-block';
    gObs.forEach(o=>o.el.remove()); gProj.forEach(p=>p.el.remove());
}
