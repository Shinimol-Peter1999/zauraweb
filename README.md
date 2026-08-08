# ZAURA Fashions — Website

Static site (HTML/CSS/JS). No server or build step is required to host it:
upload the contents of this folder to any web host and it works.

## Everyday editing — one file does most of it

`src/site.config.js` is the single source of truth for:

- brand name, tagline, address, email, phone, opening hours, social links
- the navigation menu and its dropdowns
- the category / sub-category pages and their intro copy
- the full product catalogue (name, price, sale price, image, sizes, description)

Change something there, run one command, and every page updates:

```bash
node build.js
```

That regenerates all 18 HTML pages, `js/products.js` and `sitemap.xml`.

## Where things live

```
src/site.config.js   brand info, menus, categories, products
src/templates.js     the shared <head>, header and footer
src/pages/*.html     the body content of each hand-written page
build.js             assembles pages + auto-creates the sub-category pages
css/                 style.css (base) + enhancements.css (2026 refresh) + self-hosted fonts
js/                  site behaviour: cart, wishlist, search, sign-in
img/                 photography
```

Pages created automatically from the catalogue:
men-shirts, men-tshirts, men-jeans, women-kurti, women-short-kurti,
women-tops, women-tshirts, women-pants.

## Editing without Node

Every generated `.html` file in the root is plain HTML and can be edited
directly. Note that re-running `node build.js` will overwrite it, so for
permanent changes edit `src/` instead.

## Performance notes

- Fonts (Montserrat, Bootstrap Icons) are self-hosted — no third-party requests.
- All images use `loading="lazy"` and `decoding="async"`; the banner is eager.
- The remote image-swapping script was removed; all images are local.
- Only the scripts a page actually needs are included.
