const starConfigs = [
  { top: 5, left: 8, rotation: 12 },
  { top: 12, left: 28, rotation: -28 },
  { top: 6, left: 48, rotation: 45 },
  { top: 15, left: 68, rotation: -15 },
  { top: 8, left: 88, rotation: 32 },
  { top: 22, left: 18, rotation: -42 },
  { top: 32, left: 38, rotation: 8 },
  { top: 28, left: 58, rotation: -35 },
  { top: 36, left: 78, rotation: 22 },
  { top: 44, left: 8, rotation: -18 },
  { top: 52, left: 28, rotation: 38 },
  { top: 46, left: 48, rotation: -25 },
  { top: 54, left: 68, rotation: 50 },
  { top: 48, left: 88, rotation: -48 },
  { top: 62, left: 18, rotation: 15 },
  { top: 68, left: 38, rotation: -33 },
  { top: 72, left: 58, rotation: 26 },
  { top: 80, left: 78, rotation: -55 }
];

const widths = [
  'clamp(25px, 6vmin, 50px)',
  'clamp(35px, 8vmin, 65px)',
  'clamp(30px, 7vmin, 55px)',
  'clamp(35px, 8.5vmin, 70px)',
  'clamp(30px, 7.5vmin, 60px)',
  'clamp(40px, 9vmin, 75px)',
  'clamp(25px, 6vmin, 50px)',
  'clamp(35px, 8vmin, 65px)',
  'clamp(30px, 7vmin, 55px)',
  'clamp(30px, 7.5vmin, 60px)',
  'clamp(35px, 8.5vmin, 70px)',
  'clamp(25px, 6vmin, 50px)',
  'clamp(40px, 9vmin, 75px)',
  'clamp(30px, 7vmin, 55px)',
  'clamp(35px, 8vmin, 65px)',
  'clamp(30px, 7.5vmin, 60px)',
  'clamp(35px, 8.5vmin, 70px)',
  'clamp(25px, 6vmin, 50px)'
];

const starContainer = document.body;

function createStars() {
  const page = document.querySelector('.page');
  
  starConfigs.forEach((config, idx) => {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.top = config.top + '%';
    star.style.left = config.left + '%';
    star.style.width = widths[idx];
    star.style.height = widths[idx];
    star.setAttribute('data-rotation', config.rotation);
    starContainer.insertBefore(star, page);
  });
}

createStars();

// Splash screen handler
const splashScreen = document.querySelector('.splash-screen');
const splashStar = document.querySelector('.splash-star');
const bgMusic = document.getElementById('bgMusic');

splashStar.addEventListener('click', () => {
  splashScreen.classList.add('hidden');
  bgMusic.play();
});

const initialOpacity = 0.15;

function updateStarTransforms() {
  const scrollY = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollableHeight = documentHeight - windowHeight;
  const scrollProgress = scrollY / scrollableHeight;
  
  // Calculate opacity: fade out in the last 20% of scroll, starting from initial opacity
  let opacity = initialOpacity;
  if (scrollProgress > 0.8) {
    opacity = initialOpacity * (1 - ((scrollProgress - 0.8) / 0.2));
  }
  
  document.querySelectorAll('.star').forEach((star, index) => {
    const parallaxFactor = 0.1 + (index * 0.015);
    const baseRotation = parseInt(star.getAttribute('data-rotation'));
    const scrollRotation = scrollY * 0.05 * (index % 2 === 0 ? 1 : -1);
    const totalRotation = baseRotation + scrollRotation;
    star.style.opacity = opacity;
    star.style.transform = `translateY(${-scrollY * parallaxFactor}px) rotate(${totalRotation}deg)`;
  });
}

// Apply transforms on initial load
updateStarTransforms();

window.addEventListener('scroll', () => {
  updateStarTransforms();
});
