const featured = document.querySelector('.home-hero');
const featuredControls = featured.querySelector('.home-feature-controls');
const featuredSlides = [...featured.querySelectorAll('.home-slide')];
const featuredMessages = [...featured.querySelectorAll('.home-slide-message')];
const featuredPickers = [...featured.querySelectorAll('[data-feature-select]')];
const rotationControl = featured.querySelector('[data-feature-rotation]');
const featureStatus = document.querySelector('#feature-status');
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const slideDuration = 6000;
let currentSlide = 0;
let rotationTimer;
let rotationPaused = false;
let carouselHovered = false;
let carouselVisible = true;

featured.style.setProperty('--feature-duration', slideDuration + 'ms');

function syncRotation() {
  clearTimeout(rotationTimer);
  rotationControl.hidden = motionPreference.matches;
  rotationControl.setAttribute('aria-label', rotationPaused ? 'Play slide rotation' : 'Pause slide rotation');
  rotationControl.querySelector('[data-play]').hidden = !rotationPaused;
  rotationControl.querySelector('[data-pause]').hidden = rotationPaused;

  const rotating = !rotationPaused && !motionPreference.matches && !carouselHovered && carouselVisible && !document.hidden;
  featured.toggleAttribute('data-rotating', rotating);
  if (rotating) rotationTimer = setTimeout(() => stepFeatured(1, false), slideDuration);
}

function showFeatured(index, announce = true) {
  if (index === currentSlide) return;
  featuredSlides[currentSlide].hidden = true;
  featuredSlides[currentSlide].classList.remove('is-changing');
  featuredMessages[currentSlide].removeAttribute('data-active');
  featuredMessages[currentSlide].setAttribute('aria-hidden', 'true');
  featuredMessages[currentSlide].classList.remove('is-changing');
  featuredPickers[currentSlide].removeAttribute('aria-current');

  currentSlide = index;
  const nextSlide = featuredSlides[currentSlide];
  const nextMessage = featuredMessages[currentSlide];
  nextSlide.hidden = false;
  nextSlide.classList.add('is-changing');
  nextMessage.removeAttribute('aria-hidden');
  nextMessage.setAttribute('data-active', '');
  nextMessage.classList.add('is-changing');
  featuredPickers[currentSlide].setAttribute('aria-current', 'true');
  if (announce) {
    const title = nextSlide.querySelector('.home-feature-name').firstChild.textContent.trim();
    featureStatus.textContent = title + ', slide ' + (currentSlide + 1) + ' of ' + featuredSlides.length;
  }
  syncRotation();
}

function stepFeatured(direction, announce = true) {
  showFeatured((currentSlide + direction + featuredSlides.length) % featuredSlides.length, announce);
}

featuredControls.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button === rotationControl) {
    rotationPaused = !rotationPaused;
    syncRotation();
  } else if ('featureSelect' in button.dataset) {
    showFeatured(Number(button.dataset.featureSelect));
  } else {
    stepFeatured(Number(button.dataset.featureStep));
  }
});
featuredControls.addEventListener('keydown', (event) => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  event.preventDefault();
  stepFeatured(event.key === 'ArrowLeft' ? -1 : 1);
});
featured.addEventListener('pointerenter', (event) => {
  if (event.pointerType !== 'mouse') return;
  carouselHovered = true;
  syncRotation();
});
featured.addEventListener('pointerleave', (event) => {
  if (event.pointerType !== 'mouse') return;
  carouselHovered = false;
  syncRotation();
});
featured.addEventListener('focusin', (event) => {
  if (!event.target.matches(':focus-visible') && !event.target.closest('.home-feature-name')) return;
  rotationPaused = true;
  syncRotation();
});
document.addEventListener('visibilitychange', syncRotation);
motionPreference.addEventListener('change', syncRotation);
featuredControls.hidden = false;
syncRotation();

const filters = document.querySelector('.home-product-filters');
const panelCards = [...document.querySelectorAll('.home-product-card')];
const filterButtons = [...filters.querySelectorAll('button')];
const filterStatus = document.querySelector('#featured-results');

filters.addEventListener('click', (event) => {
  const button = event.target.closest('[data-product-filter]');
  if (!button) return;
  const category = button.dataset.productFilter;
  filterButtons.forEach((filter) => filter.setAttribute('aria-pressed', String(filter === button)));
  let visibleCount = 0;
  panelCards.forEach((card) => {
    const visible = category === 'all' || card.dataset.productCategory === category;
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  filterStatus.textContent = visibleCount + ' featured panels shown';
});
filters.hidden = false;

const marquee = document.querySelector('.home-marquee');
const marqueeControl = marquee.querySelector('button');
function syncMarquee() {
  marquee.toggleAttribute('data-animated', !motionPreference.matches);
  marqueeControl.hidden = motionPreference.matches;
}

marqueeControl.addEventListener('click', () => {
  const paused = marquee.toggleAttribute('data-paused');
  marqueeControl.setAttribute('aria-label', paused ? 'Play industries marquee' : 'Pause industries marquee');
  marqueeControl.querySelector('[data-play]').hidden = !paused;
  marqueeControl.querySelector('[data-pause]').hidden = paused;
});
motionPreference.addEventListener('change', syncMarquee);
syncMarquee();

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (target === featured) {
        if (carouselVisible !== isIntersecting) {
          carouselVisible = isIntersecting;
          syncRotation();
        }
      } else if (target === marquee) {
        marquee.toggleAttribute('data-offscreen', !isIntersecting);
      } else if (isIntersecting) {
        if (!motionPreference.matches) target.classList.add('home-reveal');
        observer.unobserve(target);
      }
    }
  }, { threshold: .12 });
  observer.observe(featured);
  observer.observe(marquee);
  document.querySelectorAll('[data-home-reveal]').forEach((element) => observer.observe(element));
}
