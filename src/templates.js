/* =============================================================
   Page shell templates (header, footer, <head>).
   These are used by build.js for EVERY page, so a change here
   applies site-wide.
   ============================================================= */

const { site } = require("./site.config");

/* ---------------- <head> ---------------- */
function renderHead({ title, description, page }) {
  const preloadHero =
    page === "index.html"
      ? `\n  <link rel="preload" as="image" href="img/banner1.jpg" fetchpriority="high">`
      : "";
  return `<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="theme-color" content="#111111">
  <link rel="canonical" href="${page === "index.html" ? "./" : page}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="img/favicon-64.png" type="image/png" sizes="64x64">
  <link rel="apple-touch-icon" href="img/apple-touch-icon.png">${preloadHero}

  <!-- Styles: local first so the page can paint without waiting on the network -->
  <link rel="preload" as="font" type="font/woff2" href="css/fonts/montserrat-400.woff2" crossorigin>
  <link rel="preload" as="font" type="font/woff2" href="css/fonts/montserrat-700.woff2" crossorigin>
  <link rel="stylesheet" href="css/fonts.css">
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/enhancements.css">
  <link rel="stylesheet" href="css/bootstrap-icon.css">
  <link rel="stylesheet" href="css/aos.css" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="css/aos.css"></noscript>`;
}

/* ---------------- HEADER / NAVIGATION ---------------- */
function renderHeader(currentPage) {
  const items = site.nav
    .map((item) => {
      const isActive =
        item.href === currentPage ||
        (item.children || []).some((c) => c.href === currentPage);
      const active = isActive ? " active" : "";
      const aria = isActive ? ' aria-current="page"' : "";

      if (!item.children) {
        return `          <li class="nav-item">
            <a class="nav-link${active}" href="${item.href}"${aria}>${item.label}</a>
          </li>`;
      }

      const sub = item.children
        .map(
          (c) =>
            `              <li><a class="dropdown-item${
              c.href === currentPage ? " active" : ""
            }" href="${c.href}">${c.label}</a></li>`
        )
        .join("\n");

      return `          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle${active}" href="${item.href}" role="button" data-bs-toggle="dropdown" aria-expanded="false">${item.label}</a>
            <ul class="dropdown-menu">
${sub}
            </ul>
          </li>`;
    })
    .join("\n");

  return `  <a class="skip-link" href="#main">Skip to content</a>
  <nav class="navbar navbar-expand-lg custom-navbar">
    <div class="container">

      <a class="navbar-brand logo" href="index.html">
        <img src="img/logo-transparent.png" alt="${site.brand}" width="150" height="58">
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
              aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarContent">

        <ul class="navbar-nav mx-auto">
${items}
        </ul>

        <div class="header-right">
          <a href="signin.html" class="signin">Sign In</a>
          <a href="#" data-bs-toggle="modal" data-bs-target="#searchModal" aria-label="Search"><i class="bi bi-search"></i></a>
          <a href="wishlist.html" id="wishlist-icon" aria-label="Wishlist"><i class="bi bi-heart"></i></a>
          <a href="cart.html" class="cart-icon" id="cart-icon" aria-label="Cart">
            <i class="bi bi-bag"></i>
            <span>00</span>
          </a>
        </div>

      </div>
    </div>
  </nav>`;
}

/* ---------------- FOOTER ---------------- */
function renderFooter() {
  const c = site.contact;
  const shopLinks = site.nav
    .filter((n) => n.children)
    .flatMap((n) => n.children)
    .slice(0, 8)
    .map((l) => `            <li><a href="${l.href}">${l.label}</a></li>`)
    .join("\n");

  return `  <footer class="footer">
    <div class="container">
      <div class="footer-main">

        <div class="footer-col footer-address">
          <h5>Visit Us</h5>
          <p><i class="bi bi-geo-alt" aria-hidden="true"></i><span>${c.addressLines.join(
            "<br>"
          )}</span></p>
          <p><i class="bi bi-envelope" aria-hidden="true"></i><span><a href="mailto:${
            c.email
          }">${c.email}</a></span></p>
          <p><i class="bi bi-telephone" aria-hidden="true"></i><span><a href="tel:${
            c.phoneLink
          }">${c.phoneDisplay}</a></span></p>
        </div>

        <div class="footer-col footer-brand">
          <a href="index.html" class="footer-logo">
            <img src="img/logo-transparent.png" alt="${
              site.brand
            }" width="150" height="58" loading="lazy" decoding="async">
          </a>
          <p class="footer-tagline">${site.tagline}</p>
          <ul class="footer-links">
${shopLinks}
          </ul>
        </div>

        <div class="footer-col footer-social">
          <h5>Follow Us</h5>
          <div class="social-icons">
            <a href="${
              site.social.instagram
            }" target="_blank" rel="noopener" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
            <a href="${
              site.social.twitter
            }" target="_blank" rel="noopener" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
          </div>
          <p class="footer-hours">${c.hours}</p>
        </div>

      </div>

      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} ${
    site.brand
  } Fashions. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <button id="scrollTopBtn" class="scroll-top-btn" type="button" aria-label="Back to top">
    <i class="bi bi-arrow-up" aria-hidden="true"></i>
  </button>`;
}

/* ---------------- SHARED PAGE FURNITURE ---------------- */
const searchModal = `  <div class="modal fade" id="searchModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Search Products</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body"><input type="text" class="form-control" placeholder="Search products..."></div>
      </div>
    </div>
  </div>`;

const toast = `  <div class="zaura-toast" id="zauraToast">Added to cart</div>`;

module.exports = { renderHead, renderHeader, renderFooter, searchModal, toast };
