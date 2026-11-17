import { home } from './home.mjs';
import { products, catalogueProducts, productImage, productRequirements } from '../content/products.mjs';
import { facilities } from '../content/company.mjs';
import { link, photo, heading, button, productCards, facilityCards, profile, blogCards, quoteForm, planningQuestions, inner } from './components.mjs';

const pages = {
  home,
  about: () => inner('About Us', '<section class="section wrap split"><div><h2>Electrical systems begin with the application.</h2><p>Contrive_System brings power distribution, motor control and automation panels into one product range for industrial and commercial projects.</p><p>Whether your brief starts with a motor list, a building services schedule or a process control requirement, explore equipment by its role in the installation.</p>' + button('products.html', 'Explore products') + '</div>' + photo('assembly', 'Illustrative switchgear assembly floor') + '</section><section class="profile"><div class="wrap profile-layout">' + profile() + '</div></section><section class="section wrap">' + heading('Enclosure & Assembly', 'Processes') + facilityCards() + '</section>' + planningQuestions()),
  products: (product) => {
    if (!product) return inner('Our Products', '<section class="section wrap"><div class="range-intro"><div><h2>Find your panel.</h2><p>Explore power distribution, motor control and automation equipment. Each product includes a checklist to help you prepare your enquiry.</p></div><label class="product-search" hidden>Search the range<input id="product-search" type="search" placeholder="Try motor, PLC or distribution" autocomplete="off" aria-controls="product-range-list"></label></div><p class="search-status" id="product-search-status" role="status"></p><div id="product-range-list">' + productCards(catalogueProducts) + '</div></section>');
    const [id, title, detail] = product;
    return inner(title, '<section class="section wrap split product-detail"><figure>' + photo(productImage(id), '') +
      '<figcaption>Representative electrical equipment</figcaption></figure>' +
      '<div><h2>Application</h2><p>' + detail + '</p><h3>Details to include in your enquiry</h3><ul><li>' + productRequirements[id] + '</li><li>Site conditions, enclosure requirements and available space</li><li>Project schedule and supporting drawings</li></ul>' +
      button('quote.html?item=' + id, 'Get a quote') + ' <a class="text-link" href="products.html">All products</a></div></section>' +
      '<section class="specification-note wrap"><div><h2>Plan the complete installation.</h2><p>Include the upstream supply, connected equipment, cable entry and maintenance access in your brief. Final ratings and component selection depend on the project design.</p></div><a class="button" href="catalogue.html">Explore the catalogue</a></section>');
  },
  gallery: () => inner('Our Gallery', '<section class="section wrap"><p class="intro">Illustrative views of electrical panels, switchgear assemblies and manufacturing equipment.</p><div class="gallery-grid">' + [...products.slice(0, 8), ...facilities, ['assembly', 'Switchgear assembly']].map(([id, title]) =>
    '<button class="gallery-card" type="button" data-image="' + id + '">' + photo(id) + '<span>' + title + '</span></button>'
  ).join('') + '</div></section>'),
  catalogue: () => inner('Catalogue', '<section class="section wrap catalogue"><h2>Electrical panel catalogue</h2><p class="intro">Browse the range or print this catalogue to save a PDF copy.</p><button class="button" id="print-catalogue" type="button">Print / save as PDF</button><dl>' + catalogueProducts.map(([id, title, detail]) =>
    '<div><dt><a href="' + link(id) + '">' + title + '</a></dt><dd>' + detail + '</dd></div>'
  ).join('') + '</dl></section>'),
  blog: (article) => article ? inner(article[0], '<article class="section wrap split">' + photo(article[1]) + '<div><h2>' + article[0] + '</h2><p>' + article[2] + '</p><a class="text-link" href="blog.html">Back to blog</a></div></article>') : inner('Blog', '<section class="section wrap">' + blogCards() + '</section>'),
  contact: () => inner('Contact Us', '<section class="section wrap split"><div><h2>Discuss your panel requirements</h2><p>Use the enquiry form for a new panel, a modification to an existing installation or a question about the product range.</p><p>For a project enquiry, include the panel type, project location and the best way to reach you.</p>' + button('products.html', 'Browse the product range') + '</div>' + photo('assembly', 'Illustrative electrical panel assembly') + '</section>' + quoteForm()),
  quote: () => inner('Get a Quote', quoteForm()),
};

export { pages };
