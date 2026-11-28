// Secret Level Arcade Breakout Game: Web Audio Synth, Konami Code, Paddle & Physics
const gameConfig = {
  dialog: '[data-game]',
  canvas: '[data-game-canvas]',
  lives: '[data-game-lives]',
  score: '[data-game-score]',
  sound: '[data-game-sound]',
  close: '[data-game-close]',
  screen: '[data-game-screen]',
  kicker: '[data-game-kicker]',
  title: '[data-game-title]',
  text: '[data-game-text]',
  start: '[data-game-start]',
  contact: '[data-game-contact]',
  live: '[data-game-live]',
  copy: '[data-game-copy]',
  prompt: '[data-game-prompt]',
  open: '[data-game-open]',
  code: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
  palette: ['signal', 'blue', 'red', 'yellow', 'green'],
  storage: 'nexus:hiscore',
  startLives: 3,
  points: 10
};

// Web Audio synthesizer for retro bleeps
let audioCtx = null;
function playSound(type) {
  if (!gameState.sound) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    if (type === 'hit') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'brick') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(540 + Math.random() * 200, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.12);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'powerup') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'over') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.4);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'win') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(554.37, now + 0.1);
      osc.frequency.setValueAtTime(659.25, now + 0.2);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    }
  } catch (e) {}
}

const ui = {};
let gameCopy = {};
let ctx = null;

const gameState = {
  state: 'idle', // idle, ready, playing, over, won
  W: 0,
  H: 0,
  dpr: 1,
  paddle: { x: 0, target: 0, y: 0, w: 100, h: 14 },
  ball: { x: 0, y: 0, vx: 0, vy: 0, r: 8 },
  bricks: [],
  remaining: 0,
  sparks: [],
  drops: [],
  score: 0,
  best: 0,
  lives: gameConfig.startLives,
  sound: true,
  keys: { left: false, right: false },
  raf: 0,
  last: 0
};

function formatScore(n) {
  return String(n).padStart(6, '0');
}

function resizeCanvas() {
  if (!ui.canvas) return;
  const rect = ui.canvas.getBoundingClientRect();
  gameState.dpr = Math.min(window.devicePixelRatio || 1, 2);
  gameState.W = rect.width;
  gameState.H = rect.height;
  ui.canvas.width = Math.round(rect.width * gameState.dpr);
  ui.canvas.height = Math.round(rect.height * gameState.dpr);
  ctx.scale(gameState.dpr, gameState.dpr);

  gameState.paddle.y = gameState.H - 42;
  gameState.paddle.target = gameState.W / 2;
  gameState.paddle.x = gameState.W / 2;
}

function initBricks() {
  gameState.bricks = [];
  const rows = 5;
  const cols = 8;
  const padding = 10;
  const totalW = gameState.W - 60;
  const brickW = (totalW - (cols - 1) * padding) / cols;
  const brickH = 22;
  const startY = 70;

  const colors = ['#ff4f2b', '#3d6bff', '#ff3d5a', '#ffc61a', '#10c48a'];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      gameState.bricks.push({
        x: 30 + c * (brickW + padding),
        y: startY + r * (brickH + padding),
        w: brickW,
        h: brickH,
        alive: true,
        color: colors[r % colors.length],
        points: (rows - r) * 10
      });
    }
  }
  gameState.remaining = gameState.bricks.length;
}

function resetBall() {
  gameState.ball.x = gameState.paddle.x;
  gameState.ball.y = gameState.paddle.y - 18;
  const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.8;
  const speed = 6.5;
  gameState.ball.vx = Math.cos(angle) * speed;
  gameState.ball.vy = Math.sin(angle) * speed;
  gameState.ball.r = 7;
}

function showScreen(mode) {
  if (!ui.screen) return;
  const texts = gameCopy.screens ? gameCopy.screens[mode] : null;
  if (!texts) return;

  ui.screen.hidden = false;
  if (ui.kicker) ui.kicker.textContent = texts.kicker || '';
  if (ui.title) ui.title.textContent = texts.title || '';
  if (ui.text) {
    let txt = texts.text || '';
    txt = txt.replace('{score}', gameState.score).replace('{best}', gameState.best);
    ui.text.textContent = txt;
  }
  if (ui.start) ui.start.textContent = texts.start || 'Start';
  if (ui.contact) ui.contact.hidden = (mode !== 'won');
  if (ui.prompt) ui.prompt.hidden = false;
}

function hideScreen() {
  if (ui.screen) ui.screen.hidden = true;
  if (ui.prompt) ui.prompt.hidden = true;
}

function updateHUD() {
  if (ui.score) ui.score.textContent = formatScore(gameState.score);
  if (ui.lives) {
    ui.lives.innerHTML = '';
    for (let i = 0; i < gameState.lives; i++) {
      const dot = document.createElement('span');
      dot.className = 'game__life-dot';
      ui.lives.appendChild(dot);
    }
  }
}

function updatePhysics(dt) {
  if (gameState.state !== 'playing') return;

  // Paddle movement
  if (gameState.keys.left) gameState.paddle.target -= 12;
  if (gameState.keys.right) gameState.paddle.target += 12;
  gameState.paddle.target = Math.max(gameState.paddle.w / 2, Math.min(gameState.W - gameState.paddle.w / 2, gameState.paddle.target));
  gameState.paddle.x += (gameState.paddle.target - gameState.paddle.x) * 0.25;

  // Ball movement
  gameState.ball.x += gameState.ball.vx;
  gameState.ball.y += gameState.ball.vy;

  // Wall collisions
  if (gameState.ball.x - gameState.ball.r <= 0) {
    gameState.ball.x = gameState.ball.r;
    gameState.ball.vx *= -1;
    playSound('hit');
  }
  if (gameState.ball.x + gameState.ball.r >= gameState.W) {
    gameState.ball.x = gameState.W - gameState.ball.r;
    gameState.ball.vx *= -1;
    playSound('hit');
  }
  if (gameState.ball.y - gameState.ball.r <= 0) {
    gameState.ball.y = gameState.ball.r;
    gameState.ball.vy *= -1;
    playSound('hit');
  }

  // Paddle collision
  const p = gameState.paddle;
  if (
    gameState.ball.y + gameState.ball.r >= p.y &&
    gameState.ball.y - gameState.ball.r <= p.y + p.h &&
    gameState.ball.x >= p.x - p.w / 2 &&
    gameState.ball.x <= p.x + p.w / 2 &&
    gameState.ball.vy > 0
  ) {
    gameState.ball.y = p.y - gameState.ball.r;
    const offset = (gameState.ball.x - p.x) / (p.w / 2);
    const speed = Math.hypot(gameState.ball.vx, gameState.ball.vy);
    const angle = -Math.PI / 2 + offset * (Math.PI / 3);
    gameState.ball.vx = Math.cos(angle) * speed;
    gameState.ball.vy = Math.sin(angle) * speed;
    playSound('hit');
  }

  // Brick collisions
  for (const b of gameState.bricks) {
    if (!b.alive) continue;
    if (
      gameState.ball.x + gameState.ball.r >= b.x &&
      gameState.ball.x - gameState.ball.r <= b.x + b.w &&
      gameState.ball.y + gameState.ball.r >= b.y &&
      gameState.ball.y - gameState.ball.r <= b.y + b.h
    ) {
      b.alive = false;
      gameState.remaining--;
      gameState.score += b.points;
      gameState.best = Math.max(gameState.best, gameState.score);
      updateHUD();
      playSound('brick');

      // Spark particles
      for (let i = 0; i < 6; i++) {
        gameState.sparks.push({
          x: b.x + b.w / 2,
          y: b.y + b.h / 2,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          color: b.color,
          life: 1
        });
      }

      gameState.ball.vy *= -1;
      break;
    }
  }

  // Sparks update
  for (let i = gameState.sparks.length - 1; i >= 0; i--) {
    const s = gameState.sparks[i];
    s.x += s.vx;
    s.y += s.vy;
    s.life -= 0.04;
    if (s.life <= 0) gameState.sparks.splice(i, 1);
  }

  // Ball fell past paddle
  if (gameState.ball.y - gameState.ball.r > gameState.H) {
    gameState.lives--;
    updateHUD();
    playSound('over');
    if (gameState.lives <= 0) {
      gameState.state = 'over';
      showScreen('over');
    } else {
      resetBall();
    }
  }

  // Victory check
  if (gameState.remaining <= 0) {
    gameState.state = 'won';
    playSound('win');
    showScreen('won');
  }
}

function renderGame() {
  ctx.clearRect(0, 0, gameState.W, gameState.H);

  // Draw bricks
  for (const b of gameState.bricks) {
    if (!b.alive) continue;
    ctx.fillStyle = b.color;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(b.x, b.y, b.w, b.h, 4);
    } else {
      ctx.rect(b.x, b.y, b.w, b.h);
    }
    ctx.fill();
  }

  // Draw paddle
  const p = gameState.paddle;
  ctx.fillStyle = '#ff4f2b';
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(p.x - p.w / 2, p.y, p.w, p.h, p.h / 2);
  } else {
    ctx.rect(p.x - p.w / 2, p.y, p.w, p.h);
  }
  ctx.fill();

  // Draw ball
  if (gameState.state === 'playing') {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(gameState.ball.x, gameState.ball.y, gameState.ball.r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw sparks
  for (const s of gameState.sparks) {
    ctx.fillStyle = s.color;
    ctx.globalAlpha = Math.max(0, s.life);
    ctx.fillRect(s.x, s.y, 3, 3);
  }
  ctx.globalAlpha = 1;
}

function gameLoop(now) {
  const dt = Math.min((now - gameState.last) / 1000, 1 / 30);
  gameState.last = now;
  updatePhysics(dt);
  renderGame();
  gameState.raf = requestAnimationFrame(gameLoop);
}

function startGame() {
  hideScreen();
  gameState.state = 'playing';
  gameState.score = 0;
  gameState.lives = gameConfig.startLives;
  updateHUD();
  initBricks();
  resetBall();
}

function openGame() {
  if (!ui.dialog) return;
  resizeCanvas();
  gameState.state = 'ready';
  gameState.score = 0;
  updateHUD();
  showScreen('ready');
  if (typeof ui.dialog.showModal === 'function') {
    ui.dialog.showModal();
  }
  cancelAnimationFrame(gameState.raf);
  gameState.last = performance.now();
  gameState.raf = requestAnimationFrame(gameLoop);
}

function closeGame() {
  if (!ui.dialog) return;
  cancelAnimationFrame(gameState.raf);
  gameState.state = 'idle';
  if (ui.dialog.open) ui.dialog.close();
}

function init() {
  ui.dialog = document.querySelector(gameConfig.dialog);
  if (!ui.dialog) return;

  const fields = ['canvas', 'lives', 'score', 'sound', 'close', 'screen', 'kicker', 'title', 'text', 'start', 'contact', 'live', 'prompt'];
  fields.forEach(f => {
    ui[f] = ui.dialog.querySelector(gameConfig[f]);
  });

  const copyEl = ui.dialog.querySelector(gameConfig.copy);
  if (copyEl) {
    try { gameCopy = JSON.parse(copyEl.textContent); } catch (e) {}
  }

  if (ui.canvas) ctx = ui.canvas.getContext('2d');

  // Event handlers
  ui.start?.addEventListener('click', () => {
    if (audioCtx?.state === 'suspended') audioCtx.resume();
    startGame();
  });

  ui.close?.addEventListener('click', closeGame);
  ui.contact?.addEventListener('click', closeGame);
  ui.dialog.addEventListener('close', closeGame);

  ui.sound?.addEventListener('click', () => {
    gameState.sound = !gameState.sound;
    ui.sound.setAttribute('aria-pressed', gameState.sound);
  });

  // Pointer controls
  ui.dialog.addEventListener('pointermove', e => {
    const rect = ui.canvas?.getBoundingClientRect();
    if (rect) gameState.paddle.target = e.clientX - rect.left;
  });

  ui.canvas?.addEventListener('pointerdown', e => {
    if (gameState.state === 'ready' || gameState.state === 'over' || gameState.state === 'won') {
      startGame();
    }
  });

  // Keyboard controls
  window.addEventListener('keydown', e => {
    if (ui.dialog.open) {
      if (e.key === 'ArrowLeft') gameState.keys.left = true;
      if (e.key === 'ArrowRight') gameState.keys.right = true;
      if (e.key === ' ' && gameState.state !== 'playing') {
        e.preventDefault();
        startGame();
      }
      return;
    }

    // Konami code detection outside dialog
    checkKonami(e.key);
  });

  window.addEventListener('keyup', e => {
    if (e.key === 'ArrowLeft') gameState.keys.left = false;
    if (e.key === 'ArrowRight') gameState.keys.right = false;
  });

  // Click triggers on footer play button
  document.querySelectorAll(gameConfig.open).forEach(btn => {
    btn.addEventListener('click', openGame);
  });

  window.addEventListener('resize', () => {
    if (ui.dialog.open) resizeCanvas();
  });
}

// Konami code tracker
let konamiIdx = 0;
function checkKonami(key) {
  const code = gameConfig.code;
  const match = key.toLowerCase() === code[konamiIdx].toLowerCase();
  konamiIdx = match ? konamiIdx + 1 : (key.toLowerCase() === code[0].toLowerCase() ? 1 : 0);
  if (konamiIdx === code.length) {
    konamiIdx = 0;
    openGame();
  }
}

const GameModule = { init, open: openGame, close: closeGame };
window.breakoutGame = GameModule;
export default GameModule;
