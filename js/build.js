// Interactive Build Section: Sharp Unrounded Interactive QR Code Canvas Matrix + Glitch Decoding Text
const QR_MATRIX = [[1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1], [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1], [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1], [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1], [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0], [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1], [1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1], [0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0], [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1], [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0], [1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1], [1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0], [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0], [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0], [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0], [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1], [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0], [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0]];
const M = QR_MATRIX.length; // 29x29

const qrConfig = {
  resolutions: [5, 9, 15, 22, 29],
  step: 80,
  matrix: M,
  reach: 4.8,
  push: 0.28,
  swell: 0.25,
  ease: 0.18,
  rippleSpeed: 24,
  rippleWidth: 2.2,
  brush: 1.2,
  hold: 1600,
  fade: 2600,
  click: 0.6
};

const easeOut = e => e * e * (3 - 2 * e);

function createSharpQrInteractive(canvas, { reducedMotion, ink }) {
  const ctx = canvas.getContext('2d');
  let currentInk = ink || '#ff4f2b';
  let dots = [], grid = [];
  let size = 0, unit = 0, isReady = false;
  let pointer = null, ripple = null;
  let animId = 0, timer = 0, lastTime = 0, drag = null;

  function initGrid() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    size = Math.round(canvas.clientWidth * dpr) || 300;
    unit = size / M;
    canvas.width = size;
    canvas.height = size;
    dots = [];
    grid = [];

    for (let y = 0; y < M; y++) {
      for (let x = 0; x < M; x++) {
        if (QR_MATRIX[y][x] === 1) {
          const d = {
            x: x + 0.5,
            y: y + 0.5,
            v: 0,
            ox: 0,
            oy: 0,
            drawn: 0
          };
          dots.push(d);
          grid[y * M + x] = d;
        }
      }
    }
  }

  function renderResolution(res) {
    const step = M / res;
    canvas.width = res;
    canvas.height = res;
    ctx.fillStyle = currentInk;
    for (let ry = 0; ry < res; ry++) {
      for (let rx = 0; rx < res; rx++) {
        const my = Math.min(M - 1, Math.floor(ry * step));
        const mx = Math.min(M - 1, Math.floor(rx * step));
        if (QR_MATRIX[my][mx] === 1) {
          // SHARP UNROUNDED SQUARES
          ctx.fillRect(rx, ry, 1, 1);
        }
      }
    }
  }

  function getDrawnAlpha(d, now) {
    if (!d.drawn) return 0;
    const diff = now - d.drawn;
    if (diff < qrConfig.hold) return 1;
    const alpha = 1 - (diff - qrConfig.hold) / qrConfig.fade;
    if (alpha <= 0) d.drawn = 0;
    return Math.max(0, alpha);
  }

  function render(now = performance.now()) {
    ctx.clearRect(0, 0, size, size);

    // Clean, crisp high-contrast background without any milky or whitish glaze
    ctx.fillStyle = currentInk;

    for (const d of dots) {
      const drawnAlpha = getDrawnAlpha(d, now);
      const intensity = Math.max(d.v, drawnAlpha);
      const baseD = unit * 0.88;
      // Active swell on proximity/draw without any whitish overlay
      const dotDiameter = baseD * (1 + qrConfig.swell * intensity);
      const px = (d.x + d.ox) * unit - dotDiameter / 2;
      const py = (d.y + d.oy) * unit - dotDiameter / 2;

      // SHARP UNROUNDED SQUARE MODULES IN RICH ACCENT INK
      ctx.globalAlpha = intensity > 0.05 ? 1 : 0.88;
      ctx.fillRect(px, py, dotDiameter, dotDiameter);
    }
    ctx.globalAlpha = 1;
  }

  function applyBrush(from, to) {
    const now = performance.now();
    const dist = Math.hypot(to.x - from.x, to.y - from.y);
    const steps = Math.max(1, Math.ceil(dist / 0.4));
    const brushR = Math.ceil(qrConfig.brush);
    for (let i = 0; i <= steps; i++) {
      const sx = from.x + (to.x - from.x) * (i / steps);
      const sy = from.y + (to.y - from.y) * (i / steps);
      for (let y = Math.floor(sy) - brushR; y <= Math.floor(sy) + brushR; y++) {
        for (let x = Math.floor(sx) - brushR; x <= Math.floor(sx) + brushR; x++) {
          const d = grid[y * M + x];
          if (d && x >= 0 && x < M && Math.hypot(d.x - sx, d.y - sy) <= qrConfig.brush) {
            d.drawn = now;
          }
        }
      }
    }
  }

  function computeForces(d, now) {
    let force = 0, source = null;
    if (pointer) {
      const dist = Math.hypot(d.x - pointer.x, d.y - pointer.y);
      const ratio = Math.max(0, 1 - dist / qrConfig.reach);
      if (ratio > 0) {
        force = easeOut(ratio);
        source = pointer;
      }
    }
    if (ripple) {
      const rippleDist = ((now - ripple.start) / 1000) * qrConfig.rippleSpeed;
      const dDist = Math.hypot(d.x - ripple.x, d.y - ripple.y);
      const ratio = Math.max(0, 1 - Math.abs(dDist - rippleDist) / qrConfig.rippleWidth) * Math.max(0, 1 - rippleDist / M);
      if (ratio > force) {
        force = easeOut(ratio);
        source = ripple;
      }
    }
    if (!source) return { v: 0, ox: 0, oy: 0 };
    const dx = d.x - source.x;
    const dy = d.y - source.y;
    const len = Math.hypot(dx, dy) || 1;
    return {
      v: force,
      ox: (dx / len) * qrConfig.push * force,
      oy: (dy / len) * qrConfig.push * force
    };
  }

  function loop(now) {
    const dt = Math.min((now - (lastTime || now)) / (1000 / 60), 30) || 1;
    const factor = 1 - (1 - qrConfig.ease) ** dt;
    lastTime = now;
    let hasMotion = false;

    for (const d of dots) {
      const f = computeForces(d, now);
      d.v += (f.v - d.v) * factor;
      d.ox += (f.ox - d.ox) * factor;
      d.oy += (f.oy - d.oy) * factor;
      if (d.v > 0.002 || d.drawn || Math.abs(d.ox) > 0.002 || Math.abs(d.oy) > 0.002) {
        hasMotion = true;
      }
    }

    if (ripple && ((now - ripple.start) / 1000) * qrConfig.rippleSpeed > M * 1.5) {
      ripple = null;
    }

    render(now);
    animId = (hasMotion || pointer || ripple) ? requestAnimationFrame(loop) : 0;
    if (!animId) lastTime = 0;
  }

  function poke() {
    if (isReady && !animId) animId = requestAnimationFrame(loop);
  }

  function getCanvasCoord(e) {
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const cy = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    return {
      x: ((cx - rect.left) / rect.width) * M,
      y: ((cy - rect.top) / rect.height) * M
    };
  }

  function resolveColor(newColor) {
    currentInk = newColor;
    if (!canvas.clientWidth) return;
    clearTimeout(timer);
    cancelAnimationFrame(animId);
    animId = 0;
    isReady = false;

    const resQueue = reducedMotion ? [] : [...qrConfig.resolutions];
    function stepAnim() {
      if (resQueue.length) {
        renderResolution(resQueue.shift());
        timer = setTimeout(stepAnim, qrConfig.step);
      } else {
        initGrid();
        isReady = true;
        render();
        poke();
      }
    }
    stepAnim();
  }

  if (!reducedMotion) {
    canvas.addEventListener('pointermove', e => {
      pointer = getCanvasCoord(e);
      if (drag && isReady) {
        drag.travel += Math.hypot(pointer.x - drag.from.x, pointer.y - drag.from.y);
        applyBrush(drag.from, pointer);
        drag.from = pointer;
      }
      poke();
    });

    canvas.addEventListener('pointerleave', () => {
      pointer = null;
      poke();
    });

    canvas.addEventListener('pointerdown', e => {
      drag = { from: getCanvasCoord(e), travel: 0 };
      if (window.dot) window.dot.burst(e.clientX, e.clientY, 8);
    });

    canvas.addEventListener('pointerup', e => {
      if (drag && drag.travel < qrConfig.click) {
        ripple = { ...getCanvasCoord(e), start: performance.now() };
      }
      drag = null;
      poke();
    });
  }

  window.addEventListener('resize', () => {
    if (isReady && canvas.clientWidth) {
      initGrid();
      render();
    }
  });

  return { resolve: resolveColor };
}

// Glitch decoding text animation
const buildSelectors = {
  wrapper: '[data-build]',
  word: '[data-build-word]',
  note: '[data-build-note]',
  meter: '[data-build-meter]',
  item: '[data-build-items] > *',
  itemText: '[data-build-text]',
  orb: '[data-build-orb]',
  glyph: 'build__glyph',
  glyphs: '#%&*+=<>/?$@',
  duration: 560
};

const prefersReduce = matchMedia('(prefers-reduced-motion: reduce)');

function decodeText(el, targetText) {
  if (prefersReduce.matches) {
    el.textContent = targetText;
    return;
  }
  const start = performance.now();
  const progressMap = [...targetText].map((_, i) => (i / targetText.length) * 0.7 + Math.random() * 0.3);

  function frame(now) {
    const elapsed = Math.min((now - start) / buildSelectors.duration, 1);
    const frag = document.createDocumentFragment();

    [...targetText].forEach((char, i) => {
      if (elapsed >= progressMap[i] || char === ' ') {
        frag.append(char);
      } else {
        const span = document.createElement('span');
        span.className = buildSelectors.glyph;
        span.textContent = buildSelectors.glyphs[Math.floor(Math.random() * buildSelectors.glyphs.length)];
        frag.append(span);
      }
    });

    el.replaceChildren(frag);
    if (elapsed < 1) {
      el.dataset.raf = requestAnimationFrame(frame);
    }
  }

  cancelAnimationFrame(Number(el.dataset.raf) || 0);
  requestAnimationFrame(frame);
}

function init() {
  const wrapper = document.querySelector(buildSelectors.wrapper);
  if (!wrapper) return;

  const wordEl = wrapper.querySelector(buildSelectors.word);
  const noteEl = wrapper.querySelector(buildSelectors.note);
  const meterEl = wrapper.querySelector(buildSelectors.meter);
  const orbCanvas = wrapper.querySelector(buildSelectors.orb);

  const initialInk = getComputedStyle(document.documentElement).getPropertyValue('--color--signal').trim() || '#ff4f2b';
  const qrInstance = orbCanvas ? createSharpQrInteractive(orbCanvas, { reducedMotion: prefersReduce.matches, ink: initialInk }) : null;

  const items = [...wrapper.querySelectorAll(buildSelectors.item)].map(el => ({
    word: el.dataset.word,
    color: el.dataset.color,
    note: el.querySelector(buildSelectors.itemText).textContent.trim()
  }));

  if (!items.length) return;

  meterEl.innerHTML = '';
  const meterTicks = items.map(() => meterEl.appendChild(document.createElement('span')));
  wrapper.style.setProperty('--build-count', items.length);

  let currentIndex = -1;
  function setIndex(index) {
    if (index === currentIndex || !items[index]) return;
    currentIndex = index;
    const item = items[index];

    wrapper.style.setProperty('--build-index', index);
    meterTicks.forEach((tick, i) => tick.toggleAttribute('aria-current', i === index));

    const colorVal = getComputedStyle(document.documentElement).getPropertyValue(`--color--${item.color}`).trim() || '#ff4f2b';
    wrapper.style.setProperty('--build-color', colorVal);
    qrInstance?.resolve(colorVal);

    if (wordEl) decodeText(wordEl, item.word);
    if (window.dot) window.dot.setColor(item.color);

    if (noteEl) {
      noteEl.textContent = item.note;
      noteEl.removeAttribute('data-changing');
      void noteEl.offsetWidth;
      noteEl.setAttribute('data-changing', '');
    }
  }

  setIndex(0);

  let ticking = false;
  function handleScroll() {
    ticking = false;
    const rect = wrapper.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight) return;
    const progress = Math.min(Math.max(-rect.top / (rect.height - innerHeight), 0), 0.999);
    setIndex(Math.floor(progress * items.length));
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(handleScroll);
    }
  }, { passive: true });

  wrapper.querySelector('.build__stage')?.addEventListener('click', () => {
    setIndex((currentIndex + 1) % items.length);
  });
}

const BuildModule = { init };
window.buildSection = BuildModule;
export default BuildModule;
