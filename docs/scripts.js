// Simple wallpaper + quotes logic
const images = [
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
let autoTimer = null;
const intervalMs = 6000;

// Elements used by the original scripts
const bgA = document.getElementById('bgA');
const bgB = document.getElementById('bgB');
const quoteText = document.getElementById('quoteText');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const focusBtn = document.getElementById('focusBtn');
const downloadBtn = document.getElementById('downloadBtn');

let activeBg = bgA; // which image element is currently visible

function swapBackground(i){
  index = (i + images.length) % images.length;
  const nextBg = activeBg === bgA ? bgB : bgA;
  nextBg.src = images[index];
  nextBg.alt = `Background ${index+1}`;
  quoteText.textContent = quotes[index % quotes.length];
  // wait for image to load before crossfading
  nextBg.onload = ()=>{
    activeBg.classList.remove('active');
    nextBg.classList.add('active');
    activeBg = nextBg;
  };
}

function next(){ swapBackground(index+1); }
function prev(){ swapBackground(index-1); }

function shuffle(){
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }
  swapBackground(0);
}

function toggleFocus(){
  const isOn = focusBtn.getAttribute('aria-pressed') === 'true';
  focusBtn.setAttribute('aria-pressed', String(!isOn));
  document.getElementById('overlay').classList.toggle('hidden');
}

let autoTimer = null;
function startAuto(){ stopAuto(); autoTimer = setInterval(next, intervalMs); }
function stopAuto(){ if(autoTimer) { clearInterval(autoTimer); autoTimer = null; } }

nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);
shuffleBtn.addEventListener('click', shuffle);
focusBtn.addEventListener('click', toggleFocus);

downloadBtn.addEventListener('click', ()=>{
  const a = document.createElement('a');
  a.href = images[index];
  a.download = `wallpaper-${index+1}.svg`;
  document.body.appendChild(a);
  a.click();
  a.remove();
});

// keyboard shortcuts
document.addEventListener('keydown', (e)=>{
  if(e.key === 'ArrowRight') next();
  if(e.key === 'ArrowLeft') prev();
  if(e.key.toLowerCase() === 'f') toggleFocus();
});

// initialize
swapBackground(0);
