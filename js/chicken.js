// Interactive Mascot Pixel Sprite: Animated Legs Walking AI, Jump, Egg Poof & Feathers
const spriteData = {
  a: [
    ".....#####..",
    ".....##.##..",
    ".....######.",
    ".....#####..",
    "#...######..",
    "##.#######..",
    "##########..",
    ".########...",
    "..######....",
    "...#..#.....",
    "..##..##....",
    "......###..."
  ],
  b: [
    ".....#####..",
    ".....##.##..",
    ".....######.",
    ".....#####..",
    "#...######..",
    "##.#######..",
    "##########..",
    ".########...",
    "..######....",
    "....##......",
    "...##.##...."
  ]
};

const chickenSelectors = {
  wrapper: '[data-sprite="chicken"]',
  ground: '[data-chicken-ground]',
  feather: 'chicken-feather',
  egg: 'chicken-egg',
  maxEggs: 6,
  eggEvery: 4
};

const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)');

function createFrame(rows, frameName) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const g = document.createElementNS(svgNS, 'g');
  g.dataset.frame = frameName;
  rows.forEach((row, y) => {
    [...row].forEach((char, x) => {
      if (char === '#') {
        const rect = document.createElementNS(svgNS, 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', '1');
        rect.setAttribute('height', '1');
        g.appendChild(rect);
      }
    });
  });
  return g;
}

function spawnFeather(groundEl, x, y) {
  if (prefersReduced.matches || !groundEl) return;
  for (let i = 0; i < 5; i++) {
    const f = document.createElement('span');
    const ox = (Math.random() - 0.5) * 60;
    const oy = -15 - Math.random() * 35;
    f.className = chickenSelectors.feather;
    f.style.cssText = `
      position: absolute;
      left: ${x}px;
      bottom: ${y}px;
      width: 4px;
      height: 4px;
      background: var(--color--ink);
      border-radius: 50%;
      pointer-events: none;
      z-index: 2;
    `;
    groundEl.appendChild(f);
    f.animate([
      { transform: 'translate(0, 0)', opacity: 1 },
      { transform: `translate(${ox * 0.5}px, ${oy}px)`, opacity: 1, offset: 0.4 },
      { transform: `translate(${ox}px, ${oy + 25}px)`, opacity: 0 }
    ], {
      duration: 700 + Math.random() * 300,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
    }).finished.then(() => f.remove());
  }
}

function spawnEgg(groundEl, x) {
  if (!groundEl) return;
  const egg = document.createElement('span');
  egg.className = chickenSelectors.egg;
  egg.style.cssText = `
    position: absolute;
    left: ${x}px;
    bottom: 4px;
    width: 14px;
    height: 18px;
    background: #ffffff;
    border: 2px solid var(--color--ink);
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    pointer-events: none;
    z-index: 1;
  `;
  groundEl.appendChild(egg);
  const allEggs = groundEl.querySelectorAll('.' + chickenSelectors.egg);
  if (allEggs.length > chickenSelectors.maxEggs) {
    allEggs[0].remove();
  }
  if (!prefersReduced.matches) {
    egg.animate([
      { transform: 'scale(0)' },
      { transform: 'scale(1.2)', offset: 0.7 },
      { transform: 'scale(1)' }
    ], {
      duration: 320,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
    });
  }
}

function init() {
  const btn = document.querySelector(chickenSelectors.wrapper);
  if (!btn) return;

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 12 12');
  svg.appendChild(createFrame(spriteData.a, 'a'));
  svg.appendChild(createFrame(spriteData.b, 'b'));
  btn.replaceChildren(svg);
  btn.hidden = false;

  const ground = btn.closest(chickenSelectors.ground);
  let clickCount = 0;
  let isJumping = false;

  btn.addEventListener('click', () => {
    if (isJumping) return;
    clickCount++;
    const rect = btn.getBoundingClientRect();
    const groundRect = ground ? ground.getBoundingClientRect() : rect;
    const relX = rect.left - groundRect.left + rect.width / 2;

    spawnFeather(ground, relX, rect.height * 0.6);
    if (clickCount % chickenSelectors.eggEvery === 0) {
      spawnEgg(ground, relX - 7);
    }

    if (!prefersReduced.matches) {
      isJumping = true;
      btn.removeAttribute('data-walking');
      btn.animate([
        { transform: 'translate(0, 0)' },
        { transform: 'translate(0, -38px) scale(0.9, 1.1)', offset: 0.4 },
        { transform: 'translate(0, -42px) scale(1, 1)', offset: 0.5 },
        { transform: 'translate(0, 0) scale(1.15, 0.85)', offset: 0.88 },
        { transform: 'translate(0, 0) scale(1, 1)' }
      ], {
        duration: 520,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
      }).finished.then(() => {
        isJumping = false;
      });
    }
  });

  // Leg walking AI: actively steps legs while moving across the screen
  let posX = 60, dir = 1;
  let isWalking = true;
  let restTimer = 0;

  function walkLoop() {
    if (!isJumping && !prefersReduced.matches) {
      if (restTimer > 0) {
        restTimer--;
        btn.removeAttribute('data-walking');
      } else {
        btn.setAttribute('data-walking', '');
        btn.setAttribute('data-facing', dir < 0 ? 'left' : 'right');
        posX += dir * 0.35;
        if (posX > 82) {
          dir = -1;
          restTimer = 25; // brief rest before turning
        } else if (posX < 22) {
          dir = 1;
          restTimer = 25;
        }
        btn.style.insetInlineStart = `${posX}%`;
      }
    }
    requestAnimationFrame(walkLoop);
  }

  requestAnimationFrame(walkLoop);
}

const ChickenModule = { init };
window.chickenMascot = ChickenModule;
export default ChickenModule;
