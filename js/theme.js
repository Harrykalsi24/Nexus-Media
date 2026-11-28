// Light & Dark Theme Manager with Smooth Transitions & Asset Sync
const root = document.documentElement;
const STORAGE_KEY = 'nexus:theme';

function getInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  // Sync theme toggle buttons in nav
  const toggles = document.querySelectorAll('.nav__theme-toggle, [data-theme-toggle]');
  toggles.forEach(btn => {
    btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    btn.setAttribute('data-current-theme', theme);
  });

  // Sync hero theme pills
  const pills = document.querySelectorAll('.theme-pill');
  pills.forEach(pill => {
    pill.setAttribute('aria-pressed', pill.dataset.themeSet === theme ? 'true' : 'false');
  });

  // Save preference
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (err) {}

  // Trigger dot burst on theme switch
  if (window.dot) {
    const heroSocket = document.querySelector('[data-dot-anchor="hero"]');
    if (heroSocket) {
      const rect = heroSocket.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < innerHeight) {
        window.dot.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 8);
      }
    }
  }
}

function toggleTheme() {
  const current = root.dataset.theme === 'light' ? 'light' : 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

function init() {
  const theme = getInitialTheme();
  applyTheme(theme);

  // Bind clicks
  document.querySelectorAll('.nav__theme-toggle, [data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Listen to system preference changes if user hasn't explicitly set one
  matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });
}

const ThemeModule = {
  init,
  setTheme: applyTheme,
  toggle: toggleTheme,
  get current() { return root.dataset.theme; }
};

window.themeManager = ThemeModule;
export default ThemeModule;
