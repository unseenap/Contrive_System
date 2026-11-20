<div align="center">

<img src="assets/images/brand/contrive-symbol.png" alt="Contrive_System circuit monogram" width="88" height="88">

# Contrive_System

**Electrical control panels · Power distribution · Industrial automation**

A responsive company website with a searchable product catalogue, an animated homepage, and practical guidance for project enquiries.

**38 pages** &nbsp; · &nbsp; **27 products** &nbsp; · &nbsp; **Plain HTML, CSS & JavaScript**

[Explore the homepage](index.html) &nbsp; / &nbsp; [Browse products](pages/products/index.html) &nbsp; / &nbsp; [View catalogue](pages/catalogue.html)

</div>

---

## Start here

Run these commands from the project folder. The build requires Node.js, and the local preview uses Python.

**Build the website**

~~~sh
node scripts/build.mjs
~~~

**Start a local preview**

~~~sh
python -m http.server 4317
~~~

Open [localhost:4317](http://localhost:4317) in your browser. You can also open <code>index.html</code> directly.

[Features](#features) · [Project map](#project-map) · [Editing guide](#editing-guide) · [Build workflow](#build-workflow) · [Current status](#current-status)

## Features

| Experience | What visitors can do |
| --- | --- |
| Featured panels | Browse four slides with synchronized images and copy, six-second rotation, and pause controls |
| Product discovery | Search 27 products and explore application details and enquiry requirements |
| Responsive navigation | Open the product dropdown and navigate the site on desktop, tablet, and mobile |
| Equipment gallery | Open illustrative panel and facility images in a larger viewer |
| Project guidance | Read selection articles and expand answers to common planning questions |
| Printable catalogue | Print the product range or save it as a PDF through the browser |
| Enquiry brief | Complete a form and download the project details as a text file |
| Accessible motion | Use keyboard controls and browse with reduced motion preferences |

## Project map

~~~text
Contrive_System/
├── index.html                  Generated homepage
├── README.md                   Project guide
│
├── src/                        Editable website source
│   ├── content/
│   │   ├── products.mjs        Products, requirements and navigation order
│   │   ├── company.mjs         Company copy and assembly processes
│   │   ├── articles.mjs        Blog content and article links
│   │   └── home.mjs            Slider copy and featured categories
│   ├── config/
│   │   ├── pages.mjs           Page definitions and descriptions
│   │   └── paths.mjs           Page and asset locations
│   └── templates/
│       ├── layout.html         Document shell, header and navigation
│       ├── components.mjs      Forms, cards, footer and shared sections
│       ├── home.mjs            Homepage layout
│       └── pages.mjs           Inner-page layouts
│
├── scripts/
│   └── build.mjs               HTML generation entry point
│
├── pages/                      Generated inner pages
│   ├── about.html
│   ├── catalogue.html
│   ├── contact.html
│   ├── gallery.html
│   ├── quote.html
│   ├── products/               Product listing and individual pages
│   └── blog/                   Article listing and individual articles
│
└── assets/
    ├── icons/                  Tabler SVG icons and MIT license
    ├── css/                    Shared and homepage styles
    ├── js/                     Shared and homepage interactions
    └── images/
        ├── brand/              Company logo
        ├── products/           Panel illustrations
        ├── hero/               Slider imagery
        ├── facility/           Equipment and assembly imagery
        └── team/               People and service imagery
~~~

## Editing guide

| To change | Edit |
| --- | --- |
| Product descriptions, requirements or dropdown order | [src/content/products.mjs](src/content/products.mjs) |
| Company principles and assembly copy | [src/content/company.mjs](src/content/company.mjs) |
| Homepage slide text and featured products | [src/content/home.mjs](src/content/home.mjs) |
| Blog article content | [src/content/articles.mjs](src/content/articles.mjs) |
| Main navigation, document metadata or header logo | [src/templates/layout.html](src/templates/layout.html) |
| Footer, enquiry form, FAQs or reusable cards | [src/templates/components.mjs](src/templates/components.mjs) |
| Homepage layout | [src/templates/home.mjs](src/templates/home.mjs) |
| Product, company and other inner-page layouts | [src/templates/pages.mjs](src/templates/pages.mjs) |
| Page descriptions | [src/config/pages.mjs](src/config/pages.mjs) |
| Page and image locations | [src/config/paths.mjs](src/config/paths.mjs) |
| Shared styles and responsive layout | [assets/css/main.css](assets/css/main.css) |
| Homepage styling | [assets/css/home.css](assets/css/home.css) |
| Navigation, search, gallery or enquiry behavior | [assets/js/main.js](assets/js/main.js) |
| Carousel, filters, marquee or reveal animations | [assets/js/home.js](assets/js/home.js) |

## Build workflow

1. Update the relevant content or template under <code>src/</code>.
2. Run <code>node scripts/build.mjs</code>.
3. Preview the affected pages and check navigation at desktop and mobile widths.

The build creates <code>index.html</code> and the HTML under <code>pages/</code>, including missing output directories. Generated HTML is overwritten on each build, so make lasting content and layout changes in <code>src/</code>.

CSS, JavaScript, and image assets are used directly. Refresh the browser after editing them. Relative links are calculated for each generated page, supporting both local folders and static hosting.

## Current status

- The site includes eight main destinations, 27 product pages, and three individual articles.
- The enquiry form downloads a project brief. Direct delivery requires a company contact address or a submission service.
- Equipment and facility imagery is illustrative.
- Company contact details, certifications, and testimonials can be added when supplied.

Interface icons use [Tabler Icons](https://github.com/tabler/tabler-icons), with the MIT license included in [assets/icons/LICENSE](assets/icons/LICENSE).

---

<div align="center">

**Contrive_System**  
Electrical control panels for industrial and commercial applications.

[Back to top](#contrive_system)

</div>
