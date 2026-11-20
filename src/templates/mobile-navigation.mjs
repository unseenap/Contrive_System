import { icon } from './icons.mjs';

function mobileNavigation(section, productLinks) {
  const active = (page) => section === page ? ' aria-current="page"' : '';
  const moreActive = ['gallery', 'catalogue', 'blog', 'quote'].includes(section);
  return `
    <!-- Mobile dock adapted from Uiverse.io by eslam-hany. -->
    <nav class="mobile-dock" aria-label="Mobile navigation">
      <a class="mobile-dock-link" href="index.html"${active('home')}>${icon('home')}<span>Home</span></a>
      <button type="button" data-mobile-panel="products" aria-haspopup="dialog" aria-controls="mobile-nav-sheet"${section === 'products' ? ' class="is-current"' : ''}>${icon('layout-grid')}<span>Products</span></button>
      <a class="mobile-dock-link" href="about.html"${active('about')}>${icon('info-circle')}<span>About</span></a>
      <a class="mobile-dock-link" href="contact.html"${active('contact')}>${icon('phone')}<span>Contact</span></a>
      <button type="button" data-mobile-panel="more" aria-haspopup="dialog" aria-controls="mobile-nav-sheet"${moreActive ? ' class="is-current"' : ''}>${icon('menu-2')}<span>More</span></button>
    </nav>
    <dialog class="mobile-nav-sheet" id="mobile-nav-sheet" aria-labelledby="mobile-sheet-title">
      <div class="mobile-sheet-heading">
        <h2 id="mobile-sheet-title">Explore</h2>
        <button type="button" data-close-mobile-sheet aria-label="Close navigation">${icon('x')}</button>
      </div>
      <div data-mobile-group="products">
        <a class="mobile-sheet-feature" href="products.html">Browse all products ${icon('arrow-up-right')}</a>
        <div class="mobile-sheet-links">${productLinks}</div>
      </div>
      <div data-mobile-group="more" hidden>
        <div class="mobile-sheet-links">
          <a href="gallery.html"${active('gallery')}>Our Gallery ${icon('arrow-up-right')}</a>
          <a href="catalogue.html"${active('catalogue')}>Catalogue ${icon('arrow-up-right')}</a>
          <a href="blog.html"${active('blog')}>Blog ${icon('arrow-up-right')}</a>
          <a href="quote.html"${active('quote')}>Get a Quote ${icon('arrow-up-right')}</a>
        </div>
      </div>
    </dialog>`;
}

export { mobileNavigation };
