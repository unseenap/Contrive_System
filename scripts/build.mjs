import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { products, productNavigation, productLookup } from '../src/content/products.mjs';
import { articles, postLink } from '../src/content/articles.mjs';
import { pagePaths, resolvePageLinks } from '../src/config/paths.mjs';
import { sectionDescriptions, mainPages } from '../src/config/pages.mjs';
import { footer, link } from '../src/templates/components.mjs';
import { pages } from '../src/templates/pages.mjs';

const projectRoot = new URL('../', import.meta.url);
const template = readFileSync(new URL('src/templates/layout.html', projectRoot), 'utf8');
const legacyArticles = JSON.stringify(articles.map((_, index) => pagePaths[postLink(index)]));
function writePage({ file, section, title, content, description, productId, isDetail = false }) {
  const currentProductIndex = productNavigation.findIndex(([id]) => id === productId);
  const productsMenu = productNavigation.map(([id, label], index) => {
    const name = label ?? productLookup.get(id)[1];
    return '<a href="' + link(id) + '"' + (index === currentProductIndex ? ' aria-current="page"' : '') + '>' + name + '</a>';
  }).join('\n            ');
  const isHome = section === 'home';
  const html = template.replace(/\{\{(\w+)\}\}/g, (_, key) => ({
    title: isHome ? 'Contrive_System | Electrical Control Panels' : title + ' | Contrive_System',
    description: (description ?? sectionDescriptions[section]).replaceAll('&', '&amp;').replaceAll('"', '&quot;'),
    content,
    footer,
    productsMenu,
    bodyClass: isHome ? ' class="home-page"' : '',
    homeAssets: isHome ? '<link rel="stylesheet" href="home.css">\n  <script src="home.js" defer></script>' : '',
    compatibility: isHome ? '<script id="legacy-articles" type="application/json">' + legacyArticles + '</script>' : '',
  })[key]).replace('data-page="' + section + '"', 'data-page="' + section + '" aria-current="' + (isDetail ? 'location' : 'page') + '"');
  const outputPath = pagePaths[file];
  if (!outputPath) throw new Error('Missing page path for ' + file);
  const outputUrl = new URL(outputPath, projectRoot);
  mkdirSync(new URL('./', outputUrl), { recursive: true });
  writeFileSync(outputUrl, resolvePageLinks(html, outputPath), 'utf8');
}

for (const [section, file, title] of mainPages) {
  writePage({ file, section, title, content: pages[section]() });
}
for (const product of products) {
  const [id, title, description] = product;
  writePage({ file: link(id), section: 'products', title, content: pages.products(product), description, productId: id, isDetail: true });
}
for (const [index, article] of articles.entries()) {
  writePage({ file: postLink(index), section: 'blog', title: article[0], content: pages.blog(article), description: article[2].split('. ')[0] + '.', isDetail: true });
}
