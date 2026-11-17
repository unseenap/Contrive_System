import { products, productImage } from '../content/products.mjs';
import { facilities, principles } from '../content/company.mjs';
import { articles, postLink } from '../content/articles.mjs';

const link = (id) => id + '.html';
const photo = (name, alt = '', eager = false) => '<img src="assets/' + name + '.jpg" alt="' + alt + '"' + (eager ? '' : ' loading="lazy"') + ' decoding="async">';
const heading = (first, accent) => '<h2 class="section-heading">' + first + ' <span>' + accent + '</span></h2>';
const button = (href, label) => '<a class="button" href="' + href + '">' + label + '</a>';

function productCards(list) {
  return '<div class="product-grid">' + list.map(([id, title]) =>
    '<a class="product-card" href="' + link(id) + '">' + photo(productImage(id)) + '<span>' + title + '<b aria-hidden="true">↗</b></span></a>'
  ).join('') + '</div>';
}

function facilityCards() {
  return '<div class="three-grid">' + facilities.map(([id, title, detail]) =>
    '<article class="facility-card">' + photo(id, 'Illustration of ' + title.toLowerCase()) + '<div><h3>' + title + '</h3><p>' + detail + '</p></div></article>'
  ).join('') + '</div>';
}

function profile() {
  return '<div class="profile-copy">' +
    '<h2>Company <span>Profile</span></h2>' +
    '<p>Contrive_System focuses on electrical control panels, power distribution and industrial automation. Explore panel configurations for motor control, utility changeover, building services and process equipment.</p>' +
    button('about.html', 'Read more') + '</div>' +
    '<div class="profile-values">' + principles.map(([title, detail]) =>
      '<article><span class="value-icon" aria-hidden="true">✓</span><div><h3>' + title + '</h3><p>' + detail + '</p></div></article>'
    ).join('') + '</div>';
}

function blogCards() {
  return '<div class="three-grid">' + articles.map(([title, image, detail], index) =>
    '<article class="article-card">' + photo(image) + '<div><h3>' + title + '</h3><p>' + detail.split('. ')[0] + '.</p><a class="text-link" href="' + postLink(index) + '">Read article <span aria-hidden="true">↗</span></a></div></article>'
  ).join('') + '</div>';
}

function quoteForm(forHome = false) {
  return `
    <section class="quote-section" id="quote">
      <div class="wrap quote-layout">
        <div><p class="quote-label">Get a quote</p><h2>${forHome ? 'Tell us about your panel project.' : 'Build your project brief.'}</h2><p>Tell us what you need to control, protect or distribute. Include the panel rating, installation environment and project timeline.</p><p class="quote-note">Download your completed enquiry to keep and share with your project team.</p></div>
        <form id="quote-form">
          <div class="form-fields">
            <label>Name<input name="Name" autocomplete="name" placeholder="Your name" required maxlength="120"></label>
            <label>Phone number<input name="Phone" type="tel" autocomplete="tel" placeholder="Your phone number" required maxlength="40"></label>
            <label>Email<input name="Email" type="email" autocomplete="email" placeholder="Your email address" required maxlength="180"></label>
            <label>Company or site address<input name="Address" autocomplete="street-address" placeholder="Company or site address" maxlength="220"></label>
            <label class="field-wide">Project requirements<textarea id="requirements" name="Project requirements" rows="4" placeholder="Panel type, ratings, installation site or timeline" required maxlength="4000"></textarea></label>
          </div>
          <button class="button" type="submit" disabled>Download enquiry</button>
          <noscript><p class="quote-note">Enable JavaScript to download your enquiry.</p></noscript>
          <p id="quote-status" role="status"></p>
        </form>
      </div>
    </section>`;
}

function planningQuestions() {
  return `<section class="planning-faq wrap" aria-labelledby="planning-title">
    <div><h2 id="planning-title">A clearer start to your project.</h2><p>Answers to the questions that come before a panel enquiry.</p></div>
    <div>
      <details><summary>What should I include in a panel enquiry?</summary><p>Share the application, supply voltage, load schedule, installation location and delivery timeline. Add a single-line diagram or equipment list when available.</p></details>
      <details><summary>How do I choose a panel family?</summary><p>Start with the load. MCC and VFD panels serve motor applications, PCC and distribution panels handle power distribution, and PLC panels bring process controls together. Explore each product page for the details to include in your brief.</p></details>
      <details><summary>Can I enquire about an existing installation?</summary><p>Yes. Describe the existing panel, the change you are planning and any available drawings. Include the existing ratings, connected loads and space constraints.</p></details>
      <details><summary>How do I save the product catalogue?</summary><p>Open the Catalogue page and choose Print / save as PDF. Use your browser’s save-to-PDF option to keep a copy.</p></details>
    </div>
  </section>`;
}

function inner(title, content) {
  return '<div class="page-banner"><div class="wrap"><h1>' + title +
    '</h1><p><a href="index.html">Home</a> <span aria-hidden="true">›</span> ' + title + '</p></div></div>' + content;
}

const footer = `
  <div class="wrap footer-grid">
    <div><a class="brand footer-brand" href="index.html"><img class="brand-logo" src="assets/contrive-symbol.png" alt="" width="52" height="52"><span><strong>Contrive<span>_</span>System</strong><small>ELECTRICAL CONTROL PANELS</small></span></a><p>Power distribution. Motor control. Industrial automation.</p></div>
    <div><h2>Our Products</h2>${products.slice(3, 8).map(([id, title]) => '<a href="' + link(id) + '">' + title + '</a>').join('')}</div>
    <div><h2>Quick Links</h2><a href="index.html">Home</a><a href="about.html">About Us</a><a href="gallery.html">Gallery</a><a href="catalogue.html">Catalogue</a><a href="contact.html">Contact</a></div>
    <div><h2>Contact Us</h2><p>Prepare a brief for your electrical panel requirement.</p><a class="button" href="quote.html">Get a quote</a></div>
  </div>
  <div class="footer-bottom"><div class="wrap">© ${new Date().getFullYear()} Contrive_System. All rights reserved.</div></div>`;

export { link, photo, heading, button, productCards, facilityCards, profile, blogCards, quoteForm, planningQuestions, inner, footer };
