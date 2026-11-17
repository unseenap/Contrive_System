import { posix } from 'node:path';
import { products } from '../content/products.mjs';

const pagePaths = {
  'index.html': 'index.html',
  'about.html': 'pages/about.html',
  'gallery.html': 'pages/gallery.html',
  'catalogue.html': 'pages/catalogue.html',
  'contact.html': 'pages/contact.html',
  'quote.html': 'pages/quote.html',
  'products.html': 'pages/products/index.html',
  'blog.html': 'pages/blog/index.html',
  'choosing-an-mcc-panel.html': 'pages/blog/choosing-an-mcc-panel.html',
  'what-an-apfc-panel-does.html': 'pages/blog/what-an-apfc-panel-does.html',
  'preparing-a-panel-enquiry.html': 'pages/blog/preparing-a-panel-enquiry.html',
};
const assetPaths = {
  'styles.css': 'assets/css/main.css',
  'home.css': 'assets/css/home.css',
  'site.js': 'assets/js/main.js',
  'home.js': 'assets/js/home.js',
  'assets/contrive-symbol.png': 'assets/images/brand/contrive-symbol.png',
};
const imageGroups = {
  products: ['amf', 'apfc', 'changeover', 'distribution', 'hvac', 'mcc', 'pcc', 'vfd'],
  hero: ['hero-apfc', 'hero-hvac', 'hero-switchgear', 'home-mcc'],
  facility: ['assembly', 'laser', 'bending', 'treatment', 'switchgear'],
  team: ['engineer', 'service', 'support'],
};
for (const [group, names] of Object.entries(imageGroups)) {
  for (const name of names) assetPaths['assets/' + name + '.jpg'] = 'assets/images/' + group + '/' + name + '.jpg';
}

for (const [id] of products) pagePaths[id + '.html'] = 'pages/products/' + id + '.html';

function resolvePageLinks(html, outputPath) {
  return html.replace(/(href|src)="([^"]+)"/g, (attribute, name, value) => {
    const suffixIndex = value.search(/[?#]/);
    const pathname = suffixIndex === -1 ? value : value.slice(0, suffixIndex);
    const suffix = suffixIndex === -1 ? '' : value.slice(suffixIndex);
    const target = pagePaths[pathname] ?? assetPaths[pathname];
    if (!target) return attribute;
    return name + '="' + posix.relative(posix.dirname(outputPath), target) + suffix + '"';
  });
}

export { pagePaths, resolvePageLinks };
