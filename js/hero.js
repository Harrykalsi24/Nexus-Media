// Hero Section Intro Animation: Outline Draw, Swoosh Wipe, Ball Drop Bounce & Recoil, 3D Tilt
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const heroSelectors = {
  wrapper: '.hero',
  title: '.hero__title',
  logo: '.hero__logo',
  letter: '.hero__letter',
  swoosh: '.hero__swoosh',
  role: '.hero__role',
  typed: '.hero__typed',
  scroll: '.hero__scroll',
  field: '.hero__field',
  anchor: 'hero'
};

const root = document.documentElement;

function animateLetters(letters) {
  return letters.flatMap((el, idx) => {
    const len = Math.ceil(el.getTotalLength ? el.getTotalLength() : 350);
    const delay = idx * 220;
    el.style.strokeDasharray = len;
    el.style.opacity = 1;
    return [
      el.animate({
        strokeDashoffset: [len, 0],
        strokeWidth: [2.5, 2.5, 0]
      }, {
        delay,
        duration: 1700,
        easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
        fill: 'both'
      }),
      el.animate({
        fillOpacity: [0, 1]
      }, {
        delay: delay + 1050,
        duration: 650,
        easing: 'ease-out',
        fill: 'both'
      })
    ];
  });
}

function animateSwoosh(swoosh) {
  if (!swoosh) return null;
  swoosh.style.opacity = 1;
  return swoosh.animate({
    clipPath: ['inset(-10% 100% -10% 0)', 'inset(-10% 0% -10% 0)']
  }, {
    delay: 1400,
    duration: 650,
    easing: 'cubic-bezier(0.7, 0, 0.2, 1)',
    fill: 'both'
  });
}

async function dropAndBounceDot(titleEl) {
  if (!window.dot || !window.dot.body) return;
  const d = window.dot;
  const getColor = name => d.color(name);
  const tf = (y, sx, sy) => `translate(-50%, calc(-50% + ${y})) scale(${sx}, ${sy})`;

  const anim = d.body.animate([
    { transform: tf('-75vh', 0.5, 0.5), borderRadius: '0%', backgroundColor: getColor('signal'), opacity: 1, easing: 'cubic-bezier(0.55, 0, 1, 0.45)' },
    { transform: tf('0px', 0.78, 0.38), borderRadius: '0%', backgroundColor: getColor('signal'), offset: 0.38, easing: 'cubic-bezier(0.2, 0.6, 0.35, 1)' },
    { transform: tf('-140px', 0.85, 1.1), borderRadius: '30%', backgroundColor: getColor('signal'), offset: 0.64, easing: 'cubic-bezier(0.55, 0, 1, 0.45)' },
    { transform: tf('0px', 1.28, 0.74), borderRadius: '50%', backgroundColor: getColor('signal'), offset: 0.84, easing: 'ease-out' },
    { transform: tf('-12px', 0.96, 1.05), borderRadius: '50%', backgroundColor: getColor('signal'), offset: 0.92, easing: 'ease-in' },
    { transform: tf('0px', 1, 1), borderRadius: '50%', backgroundColor: getColor('signal'), opacity: 1 }
  ], { duration: 1500 });

  const impact = count => {
    const rect = d.body.getBoundingClientRect();
    d.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, count);
    titleEl.animate({
      translate: ['0 0', '0 6px', '0 0']
    }, {
      duration: 380,
      easing: 'cubic-bezier(0.3, 1.6, 0.5, 1)'
    });
  };

  setTimeout(() => impact(14), 570);
  setTimeout(() => impact(8), 1260);

  await anim.finished;
}

const rolesList = [
  'Digital Marketing & Web Engineering',
  'Reputation & Review Automation',
  'Sub-Second Custom Web Builds',
  'High-Intent Paid Acquisition'
];

async function typewriterLoop(el) {
  let roleIdx = 0;
  while (true) {
    const text = rolesList[roleIdx];
    el.textContent = '';
    for (const char of text) {
      el.textContent += char;
      await sleep(char === ' ' ? 80 : 35 + Math.random() * 35);
    }
    await sleep(2600);
    while (el.textContent.length > 0) {
      el.textContent = el.textContent.slice(0, -1);
      await sleep(22);
    }
    await sleep(400);
    roleIdx = (roleIdx + 1) % rolesList.length;
  }
}

function fadeIn(el, delay = 0) {
  if (!el) return;
  return el.animate({
    opacity: [0, 1],
    translate: ['0 10px', '0 0']
  }, {
    delay,
    duration: 700,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    fill: 'both'
  });
}

async function runHeroIntro(wrapper) {
  const title = wrapper.querySelector(heroSelectors.title);
  const letters = [...wrapper.querySelectorAll(heroSelectors.letter)];
  const swoosh = wrapper.querySelector(heroSelectors.swoosh);
  const role = wrapper.querySelector(heroSelectors.role);
  const typed = wrapper.querySelector(heroSelectors.typed);
  const scroll = wrapper.querySelector(heroSelectors.scroll);

  if (window.dot) window.dot.hold(heroSelectors.anchor);

  const letterAnims = [...animateLetters(letters)];
  if (swoosh) {
    const swAnim = animateSwoosh(swoosh);
    if (swAnim) letterAnims.push(swAnim);
  }

  await Promise.all([sleep(1000), document.fonts ? document.fonts.ready : Promise.resolve()]);
  fadeIn(role);

  typewriterLoop(typed);

  await sleep(1000);
  await dropAndBounceDot(title);

  fadeIn(scroll, 900);
  if (window.dot) window.dot.release();
  delete root.dataset.intro;

  letterAnims.forEach(a => a.cancel());
  [...letters, swoosh].forEach(el => el?.removeAttribute('style'));
}

function setupInteractiveTilt(wrapper) {
  const logo = wrapper.querySelector(heroSelectors.logo);
  const field = wrapper.querySelector(heroSelectors.field);
  let rafId = 0;

  wrapper.addEventListener('pointermove', e => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const rect = wrapper.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      if (logo) {
        logo.style.setProperty('--tilt-y', `${normX * 8}deg`);
        logo.style.setProperty('--tilt-x', `${normY * -8}deg`);
      }
      if (field) {
        field.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        field.style.setProperty('--my', `${e.clientY - rect.top}px`);
        field.style.setProperty('--lit', '1');
      }
    });
  });

  wrapper.addEventListener('pointerleave', () => {
    if (logo) {
      logo.style.setProperty('--tilt-x', '0deg');
      logo.style.setProperty('--tilt-y', '0deg');
    }
    if (field) {
      field.style.setProperty('--lit', '0');
    }
  });
}

function init() {
  const wrapper = document.querySelector(heroSelectors.wrapper);
  if (!wrapper) return;

  if (root.dataset.intro === 'pending') {
    runHeroIntro(wrapper);
  }

  if (matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
    setupInteractiveTilt(wrapper);
  }
}

const HeroModule = { init };
window.heroSection = HeroModule;
export default HeroModule;
