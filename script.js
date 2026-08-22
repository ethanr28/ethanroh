const interests = {
  movies: [
    { name: "Interstellar", note: "One of the films I always come back to." },
    { name: "Dune: Part Two", note: "Scale, sound, world-building, and an absurdly good theater experience." },
    { name: "Top Gun: Maverick", note: "A near-perfect big-screen movie." },
    { name: "Edge of Tomorrow", note: "Still underrated." },
    { name: "Miracle", note: "Sports movie comfort watch." },
    { name: "Project Hail Mary", note: "On my list as the story moves from page to screen." },
    { name: "The Fall Guy", note: "Fun, energetic, and easy to rewatch." },
  ],
  books: [
    { name: "Thinking in Bets", note: "Decision-making under uncertainty." },
    { name: "Divergent", note: "A longtime favorite." },
    { name: "Outliers", note: "A useful lens on opportunity and performance." },
    { name: "The War Below", note: "A look at the materials behind the energy transition." },
    { name: "Here Comes the Sun", note: "On the climate and energy reading shelf." },
    { name: "Ender’s Game", note: "Strategy, systems, and science fiction." },
    { name: "Ready Player One", note: "A fast, nostalgic read." },
  ],
  listening: [
    { name: "Zach Bryan", note: "In heavy rotation." },
    { name: "Noah Kahan", note: "A regular on the queue." },
    { name: "Drake", note: "Always somewhere in the rotation." },
    { name: "Calvin Harris", note: "For something more energetic." },
    { name: "Rihanna", note: "No explanation needed." },
    { name: "Pretty Basic", note: "A podcast I keep up with." },
  ],
  travel: [
    { name: "Sicily", note: "Coastline, food, and one of my favorite parts of Italy." },
    { name: "Italy", note: "A place I’ll keep finding reasons to go back to." },
    { name: "Neptune Oyster", note: "A Boston favorite." },
    { name: "Finding the next spot", note: "Good food is usually part of the itinerary." },
  ],
  sports: [
    { name: "Boston Celtics", note: "The team." },
    { name: "Pickup basketball", note: "The best way to spend a free run." },
    { name: "NYT Mini", note: "Not technically a sport, but timed like one." },
  ],
};

const revealEls = document.querySelectorAll('.reveal');
revealEls.forEach((el) => {
  const delay = el.dataset.delay || 0;
  el.style.setProperty('--delay', `${delay}ms`);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
revealEls.forEach((el) => observer.observe(el));

const experienceRows = document.querySelectorAll('.experience-row');
experienceRows.forEach((row) => {
  row.addEventListener('click', () => {
    const willOpen = row.getAttribute('aria-expanded') !== 'true';
    experienceRows.forEach((other) => other.setAttribute('aria-expanded', 'false'));
    row.setAttribute('aria-expanded', String(willOpen));
  });
});

const cameraTrigger = document.querySelector('.camera-trigger');
const interestRoll = document.getElementById('interest-roll');
const tabs = [...document.querySelectorAll('.interest-tab')];
const prevBtn = document.getElementById('prev-interest');
const nextBtn = document.getElementById('next-interest');
const currentEl = document.getElementById('roll-current');
const totalEl = document.getElementById('roll-total');
const card = document.getElementById('interest-card');
const nameEl = document.getElementById('interest-name');
const noteEl = document.getElementById('interest-note');
const kickerEl = document.getElementById('interest-kicker');
let activeCategory = 'movies';
let activeIndex = 0;

function renderInterest() {
  const items = interests[activeCategory];
  const item = items[activeIndex];
  card.classList.add('is-changing');
  window.setTimeout(() => {
    kickerEl.textContent = activeCategory === 'travel' ? 'food + travel' : activeCategory.slice(0, -1) || activeCategory;
    nameEl.textContent = item.name;
    noteEl.textContent = item.note;
    currentEl.textContent = String(activeIndex + 1).padStart(2, '0');
    totalEl.textContent = String(items.length).padStart(2, '0');
    card.classList.remove('is-changing');
  }, 150);
}

cameraTrigger.addEventListener('click', () => {
  const isOpen = cameraTrigger.getAttribute('aria-expanded') === 'true';
  cameraTrigger.setAttribute('aria-expanded', String(!isOpen));
  interestRoll.hidden = isOpen;
  if (!isOpen) renderInterest();
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    activeCategory = tab.dataset.category;
    activeIndex = 0;
    tabs.forEach((t) => {
      const isActive = t === tab;
      t.classList.toggle('is-active', isActive);
      t.setAttribute('aria-selected', String(isActive));
    });
    renderInterest();
  });
});

prevBtn.addEventListener('click', () => {
  const items = interests[activeCategory];
  activeIndex = (activeIndex - 1 + items.length) % items.length;
  renderInterest();
});
nextBtn.addEventListener('click', () => {
  const items = interests[activeCategory];
  activeIndex = (activeIndex + 1) % items.length;
  renderInterest();
});

let touchStartX = null;
const stage = document.querySelector('.interest-stage');
stage.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });
stage.addEventListener('touchend', (event) => {
  if (touchStartX === null) return;
  const delta = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) > 45) {
    delta < 0 ? nextBtn.click() : prevBtn.click();
  }
  touchStartX = null;
}, { passive: true });

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.getElementById('year').textContent = new Date().getFullYear();
