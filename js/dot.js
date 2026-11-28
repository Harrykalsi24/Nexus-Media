// Interactive Wandering Dot with Spring Physics, Magnetic Pull, and Particle Bursts
const config = {
  dot: '.dot',
  body: '.dot__body',
  anchor: '[data-dot-anchor]',
  interactive: 'a, button, [role="button"], summary, label, .theme-pill, input, select, textarea, [data-interactive]',
  text: 'p, h1, h2, h3, em, .build__line, address',
  avoid: '[data-dot-avoid]',
  palette: ['signal'],
  cursorSize: 14,
  hoverSize: 46,
  magnet: 2.4
};

const root = document.documentElement;
const state = {
  x: -100,
  y: -100,
  vx: 0,
  vy: 0,
  w: config.cursorSize,
  h: config.cursorSize,
  r: config.cursorSize / 2,
  mode: 'dock', // dock, float, hold, hover
  shape: 'dot',
  pointer: { x: -100, y: -100 },
  anchor: null,
  docked: null,
  color: 0,
  hasMovedPointer: false
};

let dotEl, bodyEl, anchors = [];
const isFine = () => matchMedia('(pointer: fine)').matches;
const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const forcedColors = () => matchMedia('(forced-colors: active)').matches;

function getRectCenter(el) {
  const r = el.getBoundingClientRect();
  return {
    x: r.left + r.width / 2,
    y: r.top + r.height / 2,
    d: r.width,
    visible: r.bottom > 0 && r.top < innerHeight
  };
}

function findNearestAnchor() {
  let nearest = null, minDist = Infinity;
  anchors.forEach(a => {
    const c = getRectCenter(a);
    if (!c.visible) return;
    const dist = Math.abs(c.y - innerHeight / 2);
    if (dist < minDist) {
      nearest = a;
      minDist = dist;
    }
  });
  return nearest || state.anchor || anchors[0];
}

function findVisibleAnchorNear(x, y, radius = 50) {
  return anchors.find(a => {
    const c = getRectCenter(a);
    return c.visible && Math.hypot(c.x - x, c.y - y) <= radius;
  });
}

function dockTo(target) {
  state.anchor = target;
  state.docked = target;
  state.mode = 'dock';
  root.dataset.dotMode = 'dock';
}

function undock() {
  state.docked = null;
  state.mode = 'float';
  root.dataset.dotMode = 'float';
}

function setColor(name) {
  root.style.setProperty('--color--dot', `var(--color--${name})`);
}

function cycleColor() {
  state.color = (state.color + 1) % config.palette.length;
  setColor(config.palette[state.color]);
}

function getColorValue(name) {
  return getComputedStyle(root).getPropertyValue(`--color--${name}`).trim();
}

function particleBurst(x, y, count = 12) {
  if (prefersReducedMotion() || !dotEl) return;
  const frag = document.createDocumentFragment();
  const currentColor = '#ff4f2b';

  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'dot__particle';
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const dist = 30 + Math.random() * 50;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    p.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: ${currentColor};
      pointer-events: none;
      z-index: 9999;
    `;
    frag.appendChild(p);

    p.animate([
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 }
    ], {
      duration: 500 + Math.random() * 300,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
    }).finished.then(() => p.remove());
  }
  document.body.appendChild(frag);
}

function updatePhysics() {
  let tx = state.pointer.x, ty = state.pointer.y;
  let targetW = config.cursorSize, targetH = config.cursorSize, targetR = config.cursorSize / 2;

  if (state.mode === 'dock' && state.docked) {
    const c = getRectCenter(state.docked);
    tx = c.x;
    ty = c.y;
    targetW = c.d;
    targetH = c.d;
    targetR = c.d / 2;
  } else if (state.mode === 'hold' && state.anchor) {
    const c = getRectCenter(state.anchor);
    tx = c.x;
    ty = c.y;
    targetW = c.d;
    targetH = c.d;
    targetR = c.d / 2;
  } else if (state.mode === 'hover') {
    targetW = config.hoverSize;
    targetH = config.hoverSize;
    targetR = config.hoverSize / 2;
  }

  const easePos = 0.24;
  const easeSize = 0.20;
  state.x += (tx - state.x) * easePos;
  state.y += (ty - state.y) * easePos;
  state.w += (targetW - state.w) * easeSize;
  state.h += (targetH - state.h) * easeSize;
  state.r += (targetR - state.r) * easeSize;

  if (bodyEl) {
    bodyEl.style.transform = `translate(${state.x - state.w / 2}px, ${state.y - state.h / 2}px)`;
    bodyEl.style.width = `${state.w}px`;
    bodyEl.style.height = `${state.h}px`;
    bodyEl.style.borderRadius = `${state.r}px`;
  }

  requestAnimationFrame(updatePhysics);
}

function handlePointerMove(e) {
  state.hasMovedPointer = true;
  state.pointer.x = e.clientX;
  state.pointer.y = e.clientY;

  if (state.mode === 'hold') return;

  const target = document.elementFromPoint(e.clientX, e.clientY);
  const avoidEl = target?.closest(config.avoid);
  if (avoidEl) {
    root.dataset.dotState = 'avoid';
    return;
  }

  const anchorNear = findVisibleAnchorNear(e.clientX, e.clientY, 40);
  if (anchorNear) {
    dockTo(anchorNear);
    return;
  }

  if (state.mode === 'dock') {
    undock();
  }

  const interactive = target?.closest(config.interactive);
  if (interactive) {
    state.mode = 'hover';
    root.dataset.dotState = 'interactive';
    return;
  } else if (state.mode === 'hover') {
    state.mode = 'float';
  }

  const textEl = target?.closest(config.text);
  if (textEl) {
    root.dataset.dotState = 'caret';
    return;
  }

  root.dataset.dotState = 'normal';
}

function init() {
  dotEl = document.querySelector(config.dot);
  bodyEl = dotEl?.querySelector(config.body);
  anchors = [...document.querySelectorAll(config.anchor)];

  if (!dotEl || !bodyEl || !anchors.length) return;

  root.dataset.dot = '';

  // DEFAULT POSITION: Place cursor dot EXACTLY in the hero socket where the ball lands
  const heroAnchor = anchors.find(a => a.dataset.dotAnchor === 'hero') || anchors[0];
  const c = getRectCenter(heroAnchor);
  state.x = c.x;
  state.y = c.y;
  state.pointer.x = c.x;
  state.pointer.y = c.y;
  dockTo(heroAnchor);

  if (isFine() && !prefersReducedMotion() && !forcedColors()) {
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', (e) => {
      particleBurst(e.clientX, e.clientY, 8);
    }, { passive: true });
  }

  window.addEventListener('scroll', () => {
    if (!state.hasMovedPointer) return;
    if (state.mode === 'dock' || state.mode === 'hold') return;
    const nearest = findNearestAnchor();
    if (nearest && state.anchor !== nearest) {
      state.anchor = nearest;
    }
  }, { passive: true });

  
  // Keep mouse dot in top layer when dialogs open
  const observer = new MutationObserver(() => {
    const openDialog = document.querySelector('dialog[open]');
    if (openDialog && dotEl.parentElement !== openDialog) {
      openDialog.appendChild(dotEl);
    } else if (!openDialog && dotEl.parentElement !== document.body) {
      document.body.appendChild(dotEl);
    }
  });
  observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['open'] });

  requestAnimationFrame(updatePhysics);
}

const DotModule = {
  init,
  hold(anchorName) {
    state.mode = 'hold';
    state.anchor = anchors.find(a => a.dataset.dotAnchor === anchorName) || anchors[0];
  },
  release() {
    state.mode = 'dock';
    dockTo(state.anchor || anchors[0]);
  },
  setColor,
  cycle: cycleColor,
  burst: particleBurst,
  color: getColorValue,
  get body() { return bodyEl; }
};

window.dot = DotModule;
export default DotModule;
