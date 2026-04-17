/* ==============================
   script.js — Portfolio Website
============================== */

// ──────────────────────────────
// PAGE LOADER
// ──────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    document.body.style.overflow = 'auto';
    startTypewriter();
    animateCounters();
  }, 2000);
});

document.body.style.overflow = 'hidden';

// ──────────────────────────────
// SCROLL PROGRESS BAR
// ──────────────────────────────
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById('scroll-progress').style.width = progress + '%';
});

// ──────────────────────────────
// NAVBAR SCROLL EFFECT
// ──────────────────────────────
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ──────────────────────────────
// HAMBURGER MENU
// ──────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

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

// ──────────────────────────────
// DARK/LIGHT THEME TOGGLE
// ──────────────────────────────
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
let isDark = true;

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeIcon.textContent = isDark ? '☀' : '☾';
});

// ──────────────────────────────
// SMOOTH SCROLL HELPER
// ──────────────────────────────
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const id = anchor.getAttribute('href').slice(1);
    scrollToSection(id);
  });
});

// ──────────────────────────────
// TYPEWRITER EFFECT
// ──────────────────────────────
const typewriterWords = ['Storyteller', 'Creator', 'Visionary', 'Artist'];
let wordIdx = 0, charIdx = 0, isDeleting = false;
const twEl = document.getElementById('typewriter');

function startTypewriter() {
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

// ──────────────────────────────
// ANIMATED COUNTERS
// ──────────────────────────────
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    let current = 0;
    const duration = 1800;
    const step = target / (duration / 16);
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

// ──────────────────────────────
// SCROLL REVEAL
// ──────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.05}s`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ──────────────────────────────
// SKILL BARS ANIMATION
// ──────────────────────────────
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        const w = fill.getAttribute('data-width');
        fill.style.width = w + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const aboutSection = document.getElementById('about');
if (aboutSection) skillObserver.observe(aboutSection);

// ──────────────────────────────
// PORTFOLIO DATA
// ──────────────────────────────
const portfolioItems = [
  { title: 'Brand Campaign Edit', category: 'video', emoji: '🎬', desc: 'Full brand advertisement edit for a luxury fashion label.' },
  { title: 'Golden Hour Portraits', category: 'photo', emoji: '📸', desc: 'Outdoor portrait session with natural golden light.' },
  { title: 'Editorial Shoot', category: 'model', emoji: '👗', desc: 'High fashion editorial for a lifestyle magazine.' },
  { title: 'YouTube Intro Pack', category: 'design', emoji: '✏️', desc: 'Motion graphics & intro templates for YouTube creators.' },
  { title: 'Travel Vlog Series', category: 'vlog', emoji: '🎙️', desc: 'A cinematic travel vlog series across Southeast Asia.' },
  { title: 'Product Photography', category: 'photo', emoji: '🏺', desc: 'Clean product photography for an e-commerce brand.' },
  { title: 'Music Video Edit', category: 'video', emoji: '🎵', desc: 'Fast-cut music video edit for an indie pop artist.' },
  { title: 'Brand Identity', category: 'design', emoji: '🖌️', desc: 'Full brand identity system including logo & guidelines.' },
];

function renderPortfolio(filter = 'all') {
  const grid = document.getElementById('portfolio-grid');
  grid.innerHTML = '';
  portfolioItems.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'portfolio-item reveal' + (idx === 0 ? '' : '');
    if (filter !== 'all' && item.category !== filter) {
      div.classList.add('hidden');
    }
    div.innerHTML = `
      <div class="portfolio-thumb">${item.emoji}</div>
      <div class="portfolio-overlay">
        <span class="expand-icon">⤢</span>
        <h3>${item.title}</h3>
        <span>${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
      </div>
    `;
    div.addEventListener('click', () => openLightbox(item));
    grid.appendChild(div);
    // Observe for reveal
    revealObserver.observe(div);
  });
}

renderPortfolio();

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPortfolio(btn.getAttribute('data-filter'));
  });
});

// ──────────────────────────────
// LIGHTBOX
// ──────────────────────────────
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');

function openLightbox(item) {
  lightboxContent.innerHTML = `
    <div class="lb-emoji">${item.emoji}</div>
    <h3>${item.title}</h3>
    <p>${item.desc}</p>
  `;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeBlogModal();
  }
});

// ──────────────────────────────
// BLOG DATA
// ──────────────────────────────
const blogPosts = [
  {
    title: '10 Premiere Pro Shortcuts That Changed How I Edit',
    category: 'Video Editing',
    date: 'Dec 10, 2024',
    emoji: '🎬',
    excerpt: 'After 5 years of editing, these keyboard shortcuts are the ones I use every single day — and they\'ve cut my editing time in half.',
    body: `After 5 years of editing professionally, I've refined a set of keyboard shortcuts that have genuinely transformed my workflow. Editing isn't just about creativity — it's about speed.

The most impactful shortcut I use is Ripple Delete (Shift+Delete on Mac). Instead of deleting a clip and leaving a gap you then have to close, Ripple Delete removes the clip AND closes the gap automatically. It sounds small, but across a 10-minute timeline it saves minutes.

Another game-changer is J, K, L for playback speed. J plays backward, K pauses, and L plays forward — hold L twice for 2x speed. Once your fingers learn this, you'll never click the play button again.

For color work, Lumetri scopes accessed via Window > Lumetri Scopes give you a real-time waveform and vectorscope view. Combine that with Auto Match (in the Lumetri Color panel) as a starting point, and you can grade a 10-minute piece in under 30 minutes.

The real secret is building muscle memory. Spend one week forcing yourself to use shortcuts for everything, even if it feels slower at first. By week two, you'll wonder how you ever edited without them.`
  },
  {
    title: 'Golden Hour Photography: A Complete Guide',
    category: 'Photography',
    date: 'Nov 28, 2024',
    emoji: '🌅',
    excerpt: 'The golden hour is every photographer\'s dream. Here\'s how to plan, shoot, and edit for maximum impact in that 45-minute window.',
    body: `The golden hour — that magical 45-minute window after sunrise and before sunset — is when the world looks its most cinematic. The light is soft, warm, and directional, creating natural depth and gorgeous lens flares.

Planning is everything. Use an app like PhotoPills or The Photographer's Ephemeris to know exactly when and where the sun will be on your chosen day. Show up 30 minutes early to scout locations and set up.

For gear, a 50mm or 85mm lens at f/1.8–f/2.8 will give you that dreamy shallow depth of field that golden hour portraits are known for. Keep your ISO low (100–400) and let the aperture and shutter work together. Expose for the highlights — you can recover shadows in Lightroom, but blown highlights are gone forever.

One underused technique is backlit silhouettes. Position your subject directly between you and the sun, expose for the sky, and you'll get a striking silhouette with a glowing rim light around the edges.

In post, I start every golden hour edit by pulling up the Tone Curve and adding a slight S-curve for contrast. Then I add warmth (+15 to +25 on Temperature) and a hint of orange in the HSL panel to deepen the glow. The result feels natural but elevated.`
  },
  {
    title: 'How I Grew My Instagram from 0 to 50k in 8 Months',
    category: 'Content Strategy',
    date: 'Nov 10, 2024',
    emoji: '📱',
    excerpt: 'No bots, no follow-unfollow tricks. Just a clear content strategy, consistent execution, and a deep understanding of the algorithm.',
    body: `Eight months ago I had 847 followers on Instagram. Today I have over 50,000. Here's exactly what I did — no shortcuts, no gimmicks.

The biggest unlock was niching down. I stopped trying to post everything — travel, food, lifestyle, work — and committed entirely to behind-the-scenes creative content. Photography setups, editing timelines, color grading comparisons. Once I had a clear niche, the right people found me.

Consistency beats everything. I posted 5 times per week for the first 6 months without exception. Not necessarily 5 amazing posts — 5 consistent, on-brand posts. The algorithm rewards predictable behavior, and so do human followers.

Reels were the biggest growth driver. I repurposed my Premiere Pro tutorial content into 30–60 second Reels showing before/after edits. Those alone brought in 20,000 followers. Short-form video is still the fastest path to discovery on Instagram.

Engagement is a two-way street. I spent 30 minutes every day genuinely commenting on posts in my niche — not "great post!" but real, thoughtful responses. This brought people to my profile organically.

The hardest part isn't the strategy — it's showing up when the numbers don't move. Month 2 was brutal. But the momentum from month 5 onward was worth every quiet day.`
  },
  {
    title: 'Behind the Lens: My Favorite Modeling Shoot',
    category: 'Behind the Scenes',
    date: 'Oct 22, 2024',
    emoji: '👗',
    excerpt: 'A look at the planning, challenges, and magic that happened during my most ambitious editorial shoot to date.',
    body: `Some shoots just come together perfectly. This editorial — inspired by the intersection of architecture and fashion — was one of those rare days where everything clicked.

We shot at an abandoned warehouse on the edge of the city. The location had this incredible brutalist aesthetic: raw concrete, large industrial windows flooding the space with diffused light, rusted metal structures creating natural frames. I'd scouted it three times before the shoot.

The challenge was wardrobe. We wanted pieces that felt structured and geometric to echo the architecture — a lot of sharp shoulders, monochrome layers, and textured fabrics. The styling took two weeks to put together, coordinating with local designers who were willing to loan pieces.

On the day, we had a 6-hour window. I always build in buffer time for setups and adjustments — we ended up needing almost all of it. The best images came in the final two hours when the afternoon light dropped low through the windows, creating long diagonal shadows across the concrete floor.

Post-production was minimal. The location and light did most of the work. I brought the images into Lightroom, desaturated slightly, and boosted contrast. The final edit was delivered within 48 hours — a record for me.

The lesson I keep relearning: location is everything. Invest in the scout.`
  },
];

function renderBlog() {
  const grid = document.getElementById('blog-grid');
  blogPosts.forEach((post, i) => {
    const div = document.createElement('div');
    div.className = 'blog-card reveal';
    div.innerHTML = `
      <div class="blog-thumb">${post.emoji}</div>
      <div class="blog-body">
        <div class="blog-meta">
          <span class="blog-category">${post.category}</span>
          <span class="blog-date">${post.date}</span>
        </div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <span class="blog-read-more">Read More →</span>
      </div>
    `;
    div.addEventListener('click', () => openBlogModal(post));
    grid.appendChild(div);
    revealObserver.observe(div);
  });
}

renderBlog();

// Blog Modal
const blogModal = document.getElementById('blog-modal');
const modalContent = document.getElementById('modal-content');

function openBlogModal(post) {
  modalContent.innerHTML = `
    <div class="modal-meta">
      <span class="modal-cat">${post.category}</span>
      <span>${post.date}</span>
    </div>
    <h2>${post.title}</h2>
    ${post.body.split('\n\n').map(p => `<p>${p}</p>`).join('')}
  `;
  blogModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

document.getElementById('modal-close').addEventListener('click', closeBlogModal);
blogModal.addEventListener('click', (e) => {
  if (e.target === blogModal) closeBlogModal();
});

function closeBlogModal() {
  blogModal.classList.remove('open');
  document.body.style.overflow = 'auto';
}

// ──────────────────────────────
// TESTIMONIALS
// ──────────────────────────────
const testimonials = [
  {
    text: "Working with them was a game-changer for our brand. The video edits were cinematic and the turnaround was incredibly fast. We've seen a 3x increase in engagement since.",
    name: "Sarah Chen",
    role: "Marketing Director, Lumière Studio"
  },
  {
    text: "The photography for our product launch exceeded every expectation. Every shot told a story. Our campaign performed 40% better than any previous launch.",
    name: "Marcus Okafor",
    role: "Creative Lead, Volta Brand"
  },
  {
    text: "I've worked with many content creators but this was something else. The reels they edited for us went viral twice. Truly understands modern visual storytelling.",
    name: "Priya Nair",
    role: "Founder, Bloom Social"
  },
  {
    text: "From concept to delivery, the process was seamless. The graphic design work was on-brand, polished, and delivered ahead of schedule. Will absolutely work together again.",
    name: "James Holt",
    role: "CEO, Meridian Agency"
  },
];

let currentSlide = 0;
const track = document.getElementById('testimonials-track');
const dotsContainer = document.getElementById('testimonial-dots');

function renderTestimonials() {
  testimonials.forEach((t, i) => {
    const slide = document.createElement('div');
    slide.className = 'testimonial-slide';
    slide.innerHTML = `
      <div class="testimonial-stars">
        ${'<span>★</span>'.repeat(5)}
      </div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <strong>${t.name}</strong>
        <span>${t.role}</span>
      </div>
    `;
    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 't-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
}

function goToSlide(idx) {
  currentSlide = idx;
  track.style.transform = `translateX(-${idx * 100}%)`;
  document.querySelectorAll('.t-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === idx);
  });
}

renderTestimonials();

// Auto-advance testimonials
setInterval(() => {
  goToSlide((currentSlide + 1) % testimonials.length);
}, 5000);

// ──────────────────────────────
// CONTACT FORM
// ──────────────────────────────
function submitForm() {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  let valid = true;

  // Reset errors
  ['name', 'email', 'message'].forEach(f => {
    document.getElementById(f).classList.remove('error');
    document.getElementById(f + '-error').textContent = '';
  });

  if (!name.value.trim()) {
    name.classList.add('error');
    document.getElementById('name-error').textContent = 'Name is required.';
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    email.classList.add('error');
    document.getElementById('email-error').textContent = 'Please enter a valid email.';
    valid = false;
  }

  if (message.value.trim().length < 10) {
    message.classList.add('error');
    document.getElementById('message-error').textContent = 'Message must be at least 10 characters.';
    valid = false;
  }

  if (!valid) return;

  const btn = document.getElementById('submit-btn');
  document.getElementById('btn-text').style.display = 'none';
  document.getElementById('btn-loader').style.display = 'inline';
  btn.disabled = true;

  // Simulate async submit
  setTimeout(() => {
    document.getElementById('contact-form').style.display = 'none';
    const success = document.getElementById('success-message');
    success.classList.add('show');
  }, 1800);
}

// ──────────────────────────────
// BACK TO TOP
// ──────────────────────────────
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ──────────────────────────────
// PARALLAX EFFECT
// ──────────────────────────────
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroGrid = document.querySelector('.hero-grid');
  const heroGradient = document.querySelector('.hero-gradient');
  if (heroGrid) heroGrid.style.transform = `translateY(${scrollY * 0.15}px)`;
  if (heroGradient) heroGradient.style.transform = `translateY(${scrollY * 0.08}px)`;
});
