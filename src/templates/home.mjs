import { icon, playbackIcons } from './icons.mjs';
import { productLookup, productImage } from '../content/products.mjs';
import { facilities } from '../content/company.mjs';
import { articles, postLink } from '../content/articles.mjs';
import { homeSlides, homeCategories, homeProducts } from '../content/home.mjs';
import { link, photo, planningQuestions, quoteForm } from './components.mjs';

function home() {
  const arrow = '<span aria-hidden="true">' + icon('arrow-up-right') + '</span>';
  const industries = ['Industrial manufacturing', 'Commercial buildings', 'Infrastructure', 'Utilities', 'Building services'];
  const marqueeItems = industries.map((industry) => '<li>' + industry + '</li>').join('');
  return `
    <section class="home-hero" aria-label="Featured electrical panels" aria-roledescription="carousel">
      <div class="home-wrap home-hero-layout">
        <div class="home-hero-copy">
          <h1 class="sr-only">Industrial electrical control panels</h1>
          <div class="home-slide-copy" id="featured-copy">
            ${homeSlides.map(([, , , title, highlight, description], index) => `
              <div class="home-slide-message"${index ? ' aria-hidden="true"' : ' data-active'}>
                <h2>${title}<br><span>${highlight}</span></h2>
                <p>${description}</p>
              </div>`).join('')}
          </div>
          <div class="home-actions">
            <a class="home-button home-button-primary" href="#product-range">Explore panels ${icon("arrow-down")}</a>
            <a class="home-button home-button-quiet" href="#quote">Get a quote ${arrow}</a>
          </div>
        </div>
      </div>
      <div class="home-feature" id="featured-panels">
        ${homeSlides.map(([id, image, alt], index) => `
          <figure class="home-slide" data-panel="${id}" aria-label="${index + 1} of ${homeSlides.length}" aria-roledescription="slide"${index ? ' hidden' : ''}>
            <div class="home-slide-image">${photo(image, alt, index === 0)}</div>
            <figcaption class="home-wrap home-feature-caption">
              <a class="home-feature-name" href="${link(id)}">${productLookup.get(id)[1]} ${arrow}</a>
            </figcaption>
          </figure>`).join('')}
      </div>
      <div class="home-wrap home-feature-controls" role="group" aria-label="Slide controls" hidden>
        <div class="home-slide-pickers">
          ${homeSlides.map(([id], index) => '<button class="home-slide-picker" type="button" data-feature-select="' + index + '" aria-label="Show ' + productLookup.get(id)[1] + '" aria-controls="featured-copy featured-panels"' + (index ? '' : ' aria-current="true"') + '><span aria-hidden="true"></span></button>').join('')}
        </div>
        <div class="home-slide-buttons">
          <button type="button" class="home-icon-button" data-feature-rotation aria-label="Pause slide rotation">${playbackIcons()}</button>
          <button type="button" class="home-icon-button" data-feature-step="-1" aria-label="Previous featured panel" aria-controls="featured-copy featured-panels">${icon("arrow-left")}</button>
          <button type="button" class="home-icon-button" data-feature-step="1" aria-label="Next featured panel" aria-controls="featured-copy featured-panels">${icon("arrow-right")}</button>
        </div>
      </div>
      <p class="sr-only" id="feature-status" aria-live="polite"></p>
    </section>
    <section class="home-marquee" aria-label="Industries">
      <div class="home-wrap home-marquee-layout">
        <span class="home-marquee-label">Industries</span>
        <div class="home-marquee-window">
          <div class="home-marquee-track">
            <ul>${marqueeItems}</ul>
            <ul aria-hidden="true">${marqueeItems}</ul>
          </div>
        </div>
        <button type="button" class="home-marquee-control home-icon-button" aria-label="Pause industries marquee" hidden>${playbackIcons()}</button>
      </div>
    </section>

    <section class="home-section home-wrap" id="product-range" aria-labelledby="product-title">
      <div class="home-section-head" data-home-reveal>
        <div><h2 id="product-title">Explore our panels</h2><p>Find the right panel family for your application.</p></div>
        <a class="home-text-link" href="products.html">View all products ${arrow}</a>
      </div>
      <div class="home-product-filters" role="group" aria-label="Filter featured panels" hidden>
        <button type="button" data-product-filter="all" aria-pressed="true" aria-controls="home-products">All featured</button>
        ${Object.entries(homeCategories).map(([category, label]) => '<button type="button" data-product-filter="' + category + '" aria-pressed="false" aria-controls="home-products">' + label + '</button>').join('')}
      </div>
      <p id="featured-results" class="sr-only" role="status"></p>
      <div class="home-product-grid" id="home-products">
        ${homeProducts.map(([id, category, title]) => `
          <a class="home-product-card" data-product-category="${category}" href="${link(id)}">
            <div class="home-product-image">${photo(productImage(id))}</div>
            <div class="home-product-copy">
              <div><span>${homeCategories[category]}</span><h3>${title}</h3></div>
              ${arrow}
            </div>
          </a>`).join('')}
      </div>
    </section>

    <section class="home-process" aria-labelledby="process-title">
      <div class="home-wrap home-process-layout">
        <figure data-home-reveal>
          ${photo('assembly', 'Electrical switchgear cabinets on an illustrative assembly floor')}
          <figcaption>Illustrative switchgear assembly</figcaption>
        </figure>
        <div data-home-reveal>
          <h2 id="process-title">From enclosure to assembly</h2>
          <p>Each stage shapes how the panel fits, operates and can be serviced.</p>
          <dl class="home-process-list">
            ${facilities.map(([id, title, detail]) => '<div><dt>' + title + '</dt><dd>' + detail + '</dd></div>').join('')}
          </dl>
          <a href="about.html" class="home-text-link">About Contrive_System ${arrow}</a>
        </div>
      </div>
    </section>

    <section class="home-section home-wrap home-guides" aria-labelledby="guides-title">
      <div data-home-reveal><h2 id="guides-title">Planning a panel project?</h2><p>Start with the application, site conditions and the details your quote will need.</p><a class="home-text-link" href="catalogue.html">Browse catalogue ${arrow}</a></div>
      <ul data-home-reveal>
        ${articles.map(([title, image], index) => '<li><a href="' + postLink(index) + '">' + photo(image) + '<span>' + title + '</span>' + arrow + '</a></li>').join('')}
      </ul>
    </section>
    ${planningQuestions()}
    ${quoteForm(true)}`;
}

export { home };
