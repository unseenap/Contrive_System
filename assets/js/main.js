const menuToggle = document.querySelector('#menu-toggle');
const navigation = document.querySelector('#navigation');
const productNavigation = document.querySelector('.nav-products');
const productsToggle = document.querySelector('#products-toggle');
const productsMenu = document.querySelector('#products-menu');
const siteHeader = document.querySelector('.site-header');
const mobileNavigation = matchMedia('(max-width: 1060px)');
const query = new URLSearchParams(location.search);
const item = query.get('item');
const productLink = [...productsMenu.querySelectorAll('a')].find((link) => new URL(link.href).pathname.endsWith('/' + item + '.html'));
const legacyArticles = document.querySelector('#legacy-articles');

if (legacyArticles && query.has('page')) {
  const legacyPage = query.get('page');
  const articleNumber = Number(query.get('article'));
  const fallback = [...navigation.querySelectorAll('[data-page]')].find((link) => link.dataset.page === legacyPage);
  let destination = fallback?.getAttribute('href');
  if (legacyPage === 'products' && productLink) destination = productLink.getAttribute('href');
  if (legacyPage === 'blog') destination = JSON.parse(legacyArticles.textContent)[articleNumber - 1] ?? destination;
  if (legacyPage === 'quote' && productLink) destination += '?item=' + encodeURIComponent(item);
  if (destination) location.replace(destination + location.hash);
}

let openedByHover = false;

function setProductsMenu(open, hover = false) {
  openedByHover = hover;
  productsToggle.setAttribute('aria-expanded', String(open));
  productsToggle.setAttribute('aria-label', open ? 'Hide product categories' : 'Show product categories');
  productsMenu.hidden = !open;
  if (open) siteHeader.classList.remove('is-hidden');
}

function setNavigation(open, restoreFocus = false) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('open', open);
  if (mobileNavigation.matches) navigation.setAttribute('aria-hidden', String(!open));
  else navigation.removeAttribute('aria-hidden');
  if (open) siteHeader.classList.remove('is-hidden');
  if (!open) setProductsMenu(false);
  if (restoreFocus) menuToggle.focus();
}

menuToggle.addEventListener('click', () => setNavigation(menuToggle.getAttribute('aria-expanded') === 'false'));
productsToggle.addEventListener('click', () => setProductsMenu(productsMenu.hidden || openedByHover));
productNavigation.addEventListener('pointerenter', (event) => {
  if (event.pointerType === 'mouse' && productsMenu.hidden && !mobileNavigation.matches) {
    setProductsMenu(true, true);
  }
});
productNavigation.addEventListener('pointerleave', (event) => {
  if (!mobileNavigation.matches && event.pointerType === 'mouse' && !productNavigation.contains(document.activeElement)) setProductsMenu(false);
});
productNavigation.addEventListener('focusout', (event) => {
  if (!productNavigation.contains(event.relatedTarget)) setProductsMenu(false);
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-products')) setProductsMenu(false);
  if (mobileNavigation.matches && !navigation.contains(event.target) && !menuToggle.contains(event.target)) {
    setNavigation(false);
  }
});

navigation.addEventListener('click', (event) => {
  if (mobileNavigation.matches && event.target.closest('a')) setNavigation(false);
});

navigation.addEventListener('focusout', (event) => {
  if (mobileNavigation.matches && event.relatedTarget && !siteHeader.contains(event.relatedTarget)) setNavigation(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (!productsMenu.hidden) {
    setProductsMenu(false);
    productsToggle.focus();
  } else if (navigation.classList.contains('open')) {
    setNavigation(false, true);
  }
});
mobileNavigation.addEventListener('change', () => {
  const focusedInMenu = navigation.contains(document.activeElement) || productsToggle === document.activeElement;
  setNavigation(false, mobileNavigation.matches && focusedInMenu);
});
setNavigation(false);

// Measure each label so the Uiverse outline follows variable-width menu items.
const outlineRectangle = navigation.querySelector('.nav-outline-rect');
const navigationItems = [...navigation.querySelectorAll(':scope > .nav-item')];
const activeNavigationItem = navigation.querySelector('[data-page][aria-current]')?.closest('.nav-item');
let highlightedNavigationItem = activeNavigationItem;

function drawNavigationOutline() {
  if (mobileNavigation.matches) return;
  const width = navigation.clientWidth - 2;
  const height = navigation.clientHeight - 2;
  outlineRectangle.setAttribute('width', String(width));
  outlineRectangle.setAttribute('height', String(height));
  if (!highlightedNavigationItem || width <= 0 || height <= 0) {
    outlineRectangle.setAttribute('stroke-dasharray', '0 100');
    return;
  }
  const navBounds = navigation.getBoundingClientRect();
  const itemBounds = highlightedNavigationItem.getBoundingClientRect();
  const start = Math.max(0, itemBounds.left - navBounds.left - 1);
  const length = Math.min(itemBounds.width, width - start);
  const bottomStart = width + height + width - start - length;
  const perimeter = 2 * (width + height);
  const segments = [0, start, length, bottomStart - start - length, length, perimeter - bottomStart - length];
  outlineRectangle.setAttribute('stroke-dasharray', segments.map((segment) => (segment / perimeter * 100).toFixed(3)).join(' '));
}

function highlightNavigationItem(item) {
  highlightedNavigationItem = item;
  drawNavigationOutline();
}

for (const item of navigationItems) {
  item.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') highlightNavigationItem(item);
  });
  item.addEventListener('focusin', () => highlightNavigationItem(item));
}
navigation.addEventListener('pointerleave', () => {
  const focusedItem = navigation.contains(document.activeElement) ? document.activeElement.closest('.nav-item') : null;
  highlightNavigationItem(focusedItem ?? activeNavigationItem);
});
navigation.addEventListener('focusout', (event) => {
  if (!navigation.contains(event.relatedTarget)) highlightNavigationItem(activeNavigationItem);
});
if ('ResizeObserver' in window) {
  const outlineObserver = new ResizeObserver(drawNavigationOutline);
  outlineObserver.observe(navigation);
  navigationItems.forEach((item) => outlineObserver.observe(item));
}
document.fonts?.ready.then(drawNavigationOutline);
mobileNavigation.addEventListener('change', () => highlightNavigationItem(activeNavigationItem));
drawNavigationOutline();

// A direction threshold prevents small touchpad movements from flickering the header.
let scrollAnchor = Math.max(0, window.scrollY);
let scrollFramePending = false;

function updateScrollHeader() {
  scrollFramePending = false;
  if (matchMedia('(max-width: 640px)').matches) {
    siteHeader.classList.remove('is-hidden');
    siteHeader.classList.remove('is-scrolled');
    scrollAnchor = Math.max(0, window.scrollY);
    return;
  }
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const position = Math.min(maxScroll, Math.max(0, window.scrollY));
  const movement = position - scrollAnchor;
  const focused = document.activeElement;
  const keyboardFocus = siteHeader.contains(focused) && focused.matches(':focus-visible');
  const interacting = navigation.classList.contains('open') || !productsMenu.hidden || keyboardFocus;

  siteHeader.classList.toggle('is-scrolled', position > 24);
  if (position <= siteHeader.offsetHeight || interacting) {
    siteHeader.classList.remove('is-hidden');
    scrollAnchor = position;
  } else if (Math.abs(movement) >= 12) {
    siteHeader.classList.toggle('is-hidden', movement > 0);
    scrollAnchor = position;
  }
}

document.addEventListener('scroll', () => {
  if (scrollFramePending) return;
  scrollFramePending = true;
  requestAnimationFrame(updateScrollHeader);
}, { passive: true });

siteHeader.addEventListener('focusin', () => {
  siteHeader.classList.remove('is-hidden');
  scrollAnchor = Math.max(0, window.scrollY);
});

function measureHeader() {
  document.documentElement.style.setProperty('--header-height', siteHeader.offsetHeight + 'px');
}
if ('ResizeObserver' in window) new ResizeObserver(measureHeader).observe(siteHeader);
measureHeader();
updateScrollHeader();

const dialog = document.querySelector('#image-dialog');
document.querySelectorAll('.gallery-card').forEach((card) => card.addEventListener('click', () => {
  const image = dialog.querySelector('img');
  const title = card.querySelector('span').textContent;
  image.src = card.querySelector('img').src;
  image.alt = 'Illustration of ' + title;
  dialog.querySelector('#image-caption').textContent = title;
  dialog.showModal();
}));
dialog.querySelector('button').addEventListener('click', () => dialog.close());
document.querySelector('#print-catalogue')?.addEventListener('click', () => window.print());

const search = document.querySelector('#product-search');
if (search) {
  const cards = [...document.querySelectorAll('#product-range-list .product-card')];
  const status = document.querySelector('#product-search-status');
  search.parentElement.hidden = false;
  search.addEventListener('input', () => {
    const term = search.value.trim().toLowerCase();
    let count = 0;
    for (const card of cards) {
      card.hidden = !card.textContent.toLowerCase().includes(term);
      if (!card.hidden) count += 1;
    }
    status.textContent = term ? (count ? count + ' products found' : 'No products found. Try a panel name such as MCC, VFD or distribution.') : '';
  });
}

const form = document.querySelector('#quote-form');
if (form) {
  const title = productLink?.textContent;
  const submit = form.querySelector('button[type="submit"]');
  if (title && !document.querySelector('#requirements').value) {
    document.querySelector('#requirements').value = 'Panel type: ' + title + '\n';
  }
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const details = Array.from(new FormData(form), ([label, value]) => label + ': ' + value.trim());
    const file = new Blob(['Contrive_System project enquiry\n\n' + details.join('\n\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const download = document.createElement('a');
    download.href = url;
    download.download = 'Contrive_System-enquiry.txt';
    document.body.append(download);
    download.click();
    download.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    document.querySelector('#quote-status').textContent = 'Your enquiry brief is ready to share.';
  });
  submit.disabled = false;
}
