// Premium Zen scripts: image crossfade, preload, minimal controls
const imgs = [
  'images/1.svg',
  'images/2.svg',
  'images/3.svg'
];

const quotes = [
  "Breathe. You are present.",
  "Notice the small, gentle things.",
  "One calm breath at a time.",
  "Slow down — everything is okay.",
  "Find space for stillness right now."
];

let index = 0;
let bgA = document.getElementById('bgA');
let bgB = document.getElementById('bgB');
let showingA = true;
let quoteEl = document.getElementById('quoteText');

// Controls
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const focusBtn = document.getElementById('focusBtn');
const downloadBtn = document.getElementById('downloadBtn');
const themeBtn = document.getElementById('themeBtn');

const intervalMs = 7000;
let autoTimer = null;

function setQuote(i){ quoteEl.textContent = quotes[i % quotes.length]; }

function preload(src){ const p = new Image(); p.src = src; }

function crossfadeTo(i){
  index = (i + imgs.length) % imgs.length;
  const nextSrc = imgs[index];
  // preload
  preload(nextSrc);

  const showImg = showingA ? bgB : bgA;
  const hideImg = showingA ? bgA : bgB;

  showImg.src = nextSrc;
  // force a reflow so transition happens reliably
  void showImg.offsetWidth;

  showImg.classList.add('active');
  hideImg.classList.remove('active');

  showingA = !showingA;
  setQuote(index);
}

function next(){ crossfadeTo(index+1); }
function prev(){ crossfadeTo(index-1); }

function shuffle(){
  for (let i = imgs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imgs[i], imgs[j]] = [imgs[j], imgs[i]];
  }
  crossfadeTo(0);
}

function toggleFocus(){
  const overlay = document.getElementById('overlay');
  const pressed = focusBtn.getAttribute('aria-pressed') === 'true';
  focusBtn.setAttribute('aria-pressed', String(!pressed));
  overlay.style.display = (!pressed) ? 'none' : 'flex';
}

function startAuto(){ stopAuto(); autoTimer = setInterval(next, intervalMs); }
function stopAuto(){ if(autoTimer){ clearInterval(autoTimer); autoTimer = null; } }

// Download
downloadBtn.addEventListener('click', ()=>{
  const link = document.createElement('a');
  const src = imgs[index];
  link.href = src;
  link.download = `wallpaper-${index+1}`;
  document.body.appendChild(link);
  link.click();
  link.remove();
});

// Theme toggle (keeps previous behavior)
if (themeBtn){
  const saved = localStorage.getItem('mw_theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  themeBtn.addEventListener('click', ()=>{
    const cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = cur === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('mw_theme', next);
    themeBtn.setAttribute('aria-pressed', String(next === 'light'));
    themeBtn.textContent = next === 'light' ? '☀️' : '☾';
  });
}

// Keyboard
document.addEventListener('keydown',(e)=>{
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft') prev();
  if (e.key.toLowerCase() === 'f') toggleFocus();
});

// Attach click handlers
nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);
shuffleBtn.addEventListener('click', shuffle);
focusBtn.addEventListener('click', toggleFocus);

// initialize
// ensure bg elements exist
if (!bgA || !bgB){ bgA = document.getElementById('bgA'); bgB = document.getElementById('bgB'); }
// start with current index
setQuote(0);
preload(imgs[1 % imgs.length]);
// ensure initial active classes
bgA.classList.add('active');
// start automatic rotation
startAuto();
