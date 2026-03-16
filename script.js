// ── 1. SCROLL REVEAL ──────────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => revealObserver.observe(el));


// ── 2. TYPING ANIMATION ───────────────────────────────────────────
const phrases = [
  'Computer Science Graduate & Software Engineer',
  'Building clean, purposeful software.',
  'React · Java · C++ · Python',
  'Open to new opportunities.',
];
const typedEl = document.getElementById('typed-text');
let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
const TYPING_SPEED   = 55;
const DELETING_SPEED = 30;
const PAUSE_END      = 2000;
const PAUSE_START    = 400;

function type() {
  const current = phrases[phraseIndex];
  if (!isDeleting) {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, PAUSE_END);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting  = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, PAUSE_START);
      return;
    }
  }
  setTimeout(type, isDeleting ? DELETING_SPEED : TYPING_SPEED);
}
setTimeout(type, 800);


// ── 3. DARK MODE TOGGLE ───────────────────────────────────────────
const root      = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');
const iconMoon  = document.getElementById('icon-moon');
const iconSun   = document.getElementById('icon-sun');

// Restore saved preference on load
if (localStorage.getItem('theme') === 'dark') {
  root.classList.add('dark');
  iconMoon.classList.add('hidden');
  iconSun.classList.remove('hidden');
}

toggleBtn.addEventListener('click', () => {
  const isDark = root.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  iconMoon.classList.toggle('hidden', isDark);
  iconSun.classList.toggle('hidden',  !isDark);
});


// ── 4. PROJECT TAG FILTER ─────────────────────────────────────────
const filterBar = document.getElementById('filter-bar');
const cards     = document.querySelectorAll('#projects-grid .project-card');

filterBar.addEventListener('click', e => {
  const btn = e.target.closest('.tag-btn');
  if (!btn) return;

  // Update active button styling
  document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const selected = btn.dataset.tag;

  cards.forEach(card => {
    const tags = (card.dataset.tags || '').split(',');
    const show = selected === 'all' || tags.includes(selected) || card.dataset.tags === 'all';
    card.classList.toggle('hidden-card', !show);
  });
});


// ── 5. LIVE CLOCK ─────────────────────────────────────────────────
const clockEl = document.getElementById('live-clock');

function updateClock() {
  const now = new Date();
  const opts = {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    timeZoneName: 'short'
  };
  clockEl.textContent = now.toLocaleString('en-US', opts);
}
updateClock();
setInterval(updateClock, 1000);
