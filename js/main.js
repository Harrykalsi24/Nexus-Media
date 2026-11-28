// Nexus Media Main Orchestrator
import DotModule from './dot.js';
import ThemeModule from './theme.js';
import HeroModule from './hero.js';
import BuildModule from './build.js';
import ChickenModule from './chicken.js';
import GameModule from './game.js';

// Setup word-level scroll highlight in about section
function setupAboutWords() {
  const statement = document.querySelector('.about__statement');
  if (!statement) return;

  // Split text nodes into spans with .about__word
  const walker = document.createTreeWalker(statement, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) {
    if (node.nodeValue.trim()) textNodes.push(node);
  }

  textNodes.forEach(tn => {
    const words = tn.nodeValue.split(/(\s+)/);
    const frag = document.createDocumentFragment();
    words.forEach(w => {
      if (w.trim()) {
        const span = document.createElement('span');
        span.className = 'about__word';
        span.textContent = w;
        frag.appendChild(span);
      } else {
        frag.appendChild(document.createTextNode(w));
      }
    });
    tn.replaceWith(frag);
  });
}

// Setup smooth scrolling for anchor links
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href === '') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile nav if open
        const navLinks = document.getElementById('nav-links');
        if (navLinks && navLinks.matches(':popover-open')) {
          navLinks.hidePopover();
        }
      }
    });
  });
}

// Setup interactive email copy-to-clipboard with toast feedback
function setupEmailCopy() {
  const mailLinks = document.querySelectorAll('.contact__mail, .footer__link[href^="mailto:"]');
  const toast = document.createElement('div');
  toast.className = 'toast-notice';
  toast.textContent = 'Email copied to clipboard: support@nexusmedia.com';
  document.body.appendChild(toast);

  let toastTimer = null;
  function showToast() {
    clearTimeout(toastTimer);
    toast.classList.add('is-visible');
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2800);
  }

  mailLinks.forEach(link => {
    link.addEventListener('click', e => {
      const email = 'support@nexusmedia.com';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(showToast);
      }
      if (window.dot) {
        window.dot.burst(e.clientX, e.clientY, 10);
      }
    });
  });
}

// Setup inquiry dialog for "Let's talk" buttons
function setupInquiryDialog() {
  const dialog = document.getElementById('inquiry-modal');
  if (!dialog) return;

  document.querySelectorAll('a[href="#contact"].button, .nav__cta, .nav__menu-cta').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      dialog.showModal();
    });
  });

  dialog.querySelector('.inquiry-close')?.addEventListener('click', () => {
    dialog.close();
  });

  dialog.addEventListener('click', e => {
    if (e.target === dialog) dialog.close();
  });

  const form = dialog.querySelector('.inquiry-form');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.textContent = 'Submitting...';
    setTimeout(() => {
      dialog.close();
      alert('Thank you! Nexus Media will contact you within 24 business hours.');
      form.reset();
      if (submitBtn) submitBtn.textContent = 'Submit Inquiry';
    }, 600);
  });
}


// Liquid Navbar Indicator Controller (Scroll Spy + Hover Magnet)
function setupLiquidNavbar() {
  const navLinks = document.querySelector('.nav__links');
  const indicator = document.querySelector('.nav__indicator');
  const links = [...document.querySelectorAll('.nav__link')];
  if (!navLinks || !indicator || !links.length) return;

  let activeLink = links[0];

  function moveToLink(link) {
    if (!link) {
      indicator.style.opacity = '0';
      return;
    }
    const navRect = navLinks.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const offsetLeft = linkRect.left - navRect.left;
    const width = linkRect.width;

    indicator.style.transform = `translate(${offsetLeft}px, -50%)`;
    indicator.style.width = `${width}px`;
    indicator.style.opacity = '1';
  }

  // Hover fluid movement
  links.forEach(link => {
    link.addEventListener('pointerenter', () => moveToLink(link));
    link.addEventListener('pointerleave', () => moveToLink(activeLink));
  });

  // Section Scroll Spy using IntersectionObserver
  const sectionIds = links.map(l => l.getAttribute('href')).filter(h => h && h.startsWith('#'));
  const sections = sectionIds.map(id => document.querySelector(id)).filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        const matchingLink = links.find(l => l.getAttribute('href') === id);
        if (matchingLink) {
          activeLink = matchingLink;
          links.forEach(l => l.classList.toggle('is-active', l === matchingLink));
          moveToLink(matchingLink);
        }
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(s => observer.observe(s));

  // Initial placement
  setTimeout(() => {
    if (activeLink) moveToLink(activeLink);
  }, 300);

  window.addEventListener('resize', () => {
    if (activeLink) moveToLink(activeLink);
  });
}

// Global bootstrap
document.addEventListener('DOMContentLoaded', () => {
  ThemeModule.init();
  DotModule.init();
  setupAboutWords();
  BuildModule.init();
  ChickenModule.init();
  GameModule.init();
  HeroModule.init();
  setupSmoothScroll();
  setupEmailCopy();
  setupInquiryDialog();
  setupLiquidNavbar();
});
