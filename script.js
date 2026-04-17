// ==============================
// SAFE GET HELPER
// ==============================
const $ = (id) => document.getElementById(id);

// ==============================
// PAGE LOADER
// ==============================
document.body.style.overflow = 'hidden';

window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = $('loader');
    if (loader) loader.classList.add('hidden');

    document.body.style.overflow = 'auto';

    if (typeof startTypewriter === 'function') startTypewriter();
    if (typeof animateCounters === 'function') animateCounters();
  }, 2000);
});

// ==============================
// SCROLL EVENTS (MERGED FOR PERFORMANCE)
// ==============================
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;

  // Progress bar
  const progressEl = $('scroll-progress');
  if (progressEl) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressEl.style.width = progress + '%';
  }

  // Navbar
  const navbar = $('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', scrollTop > 60);
  }

  // Back to top
  const backToTop = $('back-to-top');
  if (backToTop) {
    backToTop.classList.toggle('show', scrollTop > 400);
  }

  // Parallax
  const heroGrid = document.querySelector('.hero-grid');
  const heroGradient = document.querySelector('.hero-gradient');

  if (heroGrid) heroGrid.style.transform = `translateY(${scrollTop * 0.15}px)`;
  if (heroGradient) heroGradient.style.transform = `translateY(${scrollTop * 0.08}px)`;
});

// ==============================
// HAMBURGER MENU
// ==============================
const hamburger = $('hamburger');
const mobileMenu = $('mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// ==============================
// THEME TOGGLE
// ==============================
const themeToggle = $('theme-toggle');

if (themeToggle) {
  const themeIcon = themeToggle.querySelector('.theme-icon');
  let isDark = true;

  themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    if (themeIcon) themeIcon.textContent = isDark ? '☀' : '☾';
  });
}

// ==============================
// SMOOTH SCROLL
// ==============================
function scrollToSection(id) {
  const el = $(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const id = anchor.getAttribute('href').slice(1);
    scrollToSection(id);
  });
});

// ==============================
// TYPEWRITER
// ==============================
const typewriterWords = ['Storyteller', 'Creator', 'Visionary', 'Artist'];
let wordIdx = 0, charIdx = 0, isDeleting = false;
const twEl = $('typewriter');

function startTypewriter() {
  if (!twEl) return;

  function type() {
    const word = typewriterWords[wordIdx];

    if (!isDeleting) {
      twEl.textContent = word.substring(0, charIdx + 1);
      charIdx++;

      if (charIdx === word.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      twEl.textContent = word.substring(0, charIdx - 1);
      charIdx--;

      if (charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % typewriterWords.length;
      }
    }

    setTimeout(type, isDeleting ? 60 : 100);
  }

  type();
}

// ==============================
// COUNTERS
// ==============================
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    if (!target) return;

    let current = 0;
    const step = target / 100;

    const interval = setInterval(() => {
      current += step;

      if (current >= target) {
        current = target;
        clearInterval(interval);
      }

      el.textContent = Math.floor(current);
    }, 16);
  });
}

// ==============================
// SCROLL REVEAL
// ==============================
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.05}s`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
  .forEach(el => revealObserver.observe(el));

// ==============================
// SKILLS
// ==============================
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        const w = fill.getAttribute('data-width');
        if (w) fill.style.width = w + '%';
      });

      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const aboutSection = $('about');
if (aboutSection) skillObserver.observe(aboutSection);

// ==============================
// PORTFOLIO
// ==============================
const portfolioItems = [/* KEEP YOUR DATA SAME */];

function renderPortfolio(filter = 'all') {
  const grid = $('portfolio-grid');
  if (!grid) return;

  grid.innerHTML = '';

  portfolioItems.forEach(item => {
    const div = document.createElement('div');
    div.className = 'portfolio-item reveal';

    if (filter !== 'all' && item.category !== filter) {
      div.classList.add('hidden');
    }

    div.innerHTML = `
      <div class="portfolio-thumb">${item.emoji}</div>
      <div class="portfolio-overlay">
        <span class="expand-icon">⤢</span>
        <h3>${item.title}</h3>
        <span>${item.category}</span>
      </div>
    `;

    div.addEventListener('click', () => openLightbox(item));
    grid.appendChild(div);
    revealObserver.observe(div);
  });
}

if ($('portfolio-grid')) renderPortfolio();

// ==============================
// LIGHTBOX
// ==============================
const lightbox = $('lightbox');
const lightboxContent = $('lightbox-content');

function openLightbox(item) {
  if (!lightbox || !lightboxContent) return;

  lightboxContent.innerHTML = `
    <div class="lb-emoji">${item.emoji}</div>
    <h3>${item.title}</h3>
    <p>${item.desc}</p>
  `;

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;

  lightbox.classList.remove('open');
  document.body.style.overflow = 'auto';
}

const lightboxClose = $('lightbox-close');
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

// ==============================
// BLOG (SAFE)
// ==============================
const blogGrid = $('blog-grid');

if (blogGrid) {
  // keep your blog rendering code here safely
}

// ==============================
// BACK TO TOP CLICK
// ==============================
const backToTopBtn = $('back-to-top');
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
