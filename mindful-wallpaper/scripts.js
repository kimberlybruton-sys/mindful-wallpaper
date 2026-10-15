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

const bgImage = document.getElementById('bgImage');
const quoteEl = document.getElementById('quote');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const focusBtn = document.getElementById('focusBtn');
const downloadBtn = document.getElementById('downloadBtn');
const autoToggle = document.getElementById('autoToggle');

function show(i){
  index = (i + images.length) % images.length;
  bgImage.style.opacity = 0;
  // small timeout for transition
  setTimeout(()=> {
    bgImage.src = images[index];
    bgImage.alt = `Background ${index+1}`;
    quoteEl.textContent = quotes[index % quotes.length];
    bgImage.onload = ()=> bgImage.style.opacity = 1;
  }, 200);
}

function next(){ show(index+1); }
function prev(){ show(index-1); }

function shuffle(){
  // simple Fisher-Yates shuffle of images array
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }
  show(0);
}

function toggleFocus(){
  const isOn = focusBtn.getAttribute('aria-pressed') === 'true';
  focusBtn.setAttribute('aria-pressed', String(!isOn));
  document.getElementById('overlay').classList.toggle('hidden');
}

function startAuto(){
  stopAuto();
  autoTimer = setInterval(next, intervalMs);
}

function stopAuto(){ if(autoTimer) { clearInterval(autoTimer); autoTimer = null; } }

autoToggle.addEventListener('change',(e)=>{
  if(e.target.checked) startAuto(); else stopAuto();
});

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

// keyboard shortcuts: left/right/f
document.addEventListener('keydown', (e)=>{
  if(e.key === 'ArrowRight') next();
  if(e.key === 'ArrowLeft') prev();
  if(e.key.toLowerCase() === 'f') toggleFocus();
});

// initialize
show(0);
