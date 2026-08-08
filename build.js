#!/usr/bin/env node
/* =============================================================
   ZAURA static site builder
   ---------------------------------------------------------------
   Usage:  node build.js
   Reads : src/site.config.js, src/templates.js, src/pages/*.html
   Writes: <root>/*.html  and  js/products.js
   ============================================================= */

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SRC = path.join(ROOT, "src");
const PAGES = path.join(SRC, "pages");

const { site, categories, products } = require("./src/site.config");
const {
  renderHead,
  renderHeader,
  renderFooter,
  searchModal,
  toast,
} = require("./src/templates");

const money = (n) => "\u20b9" + Number(n).toLocaleString("en-IN");
const byCat = (file) => products.filter((p) => p.cat === file);
const catOf = (file) => categories.find((c) => c.file === file);

/* ---------------- product card ---------------- */
function card(p, cols) {
  const href = `product.html?id=${encodeURIComponent(p.id)}`;
  const price = p.oldPrice
    ? `<span class="old-price">${money(p.oldPrice)}</span> ${money(p.price)}`
    : money(p.price);
  const sizes = p.sizes
    .map((s) => `<button class="size-btn" type="button" data-size="${s}">${s}</button>`)
    .join("");
  const swatches = (p.variants || [])
    .map(
      (v, i) =>
        `<button class="card-swatch${i === 0 ? " active" : ""}" type="button" style="--sw:${v.hex}" data-image="${v.image}" data-color="${v.name}" title="${v.name}" aria-label="${v.name}"></button>`
    )
    .join("");
  return `        <div class="${cols || "col-lg-3 col-sm-6"}">
          <article class="product-card" data-product-id="${p.id}">
            ${p.badge ? `<span class="badge-custom ${p.badge === "NEW" ? "hot" : "sale"}">${p.badge}</span>` : ""}
            <div class="wishlist" role="button" tabindex="0" aria-label="Add to wishlist">&#9829;</div>
            <a class="product-link" href="${href}">
              <div class="product-img">
                <img src="${p.image}" alt="${p.name} — ${p.variants[0].name}" width="640" height="800" loading="lazy" decoding="async">
                <div class="size-box">${sizes}</div>
              </div>
            </a>
            <div class="product-info">
              <h3 class="product-title"><a href="${href}">${p.name}</a></h3>
              <div class="price">${price}</div>
              <div class="card-swatches" aria-label="Available colours">${swatches}</div>
              <button class="btn btn-primary w-100 py-2 mt-2 add-to-cart-btn ad-cart" type="button">Add to Cart</button>
            </div>
          </article>
        </div>`;
}


function grid(file, limit, cols) {
  const list = byCat(file).slice(0, limit || 99);
  return `      <div class="row g-4">\n${list
    .map((p) => card(p, cols))
    .join("\n")}\n      </div>`;
}

/* ---------------- category pages ---------------- */
function categoryPage(c) {
  const list = byCat(c.file);
  return `<!--#HEADER#-->

  <main id="main">
    <header class="category-hero">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb small">
            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item"><a href="${c.parentHref}">${c.parent}</a></li>
            <li class="breadcrumb-item active" aria-current="page">${c.name}</li>
          </ol>
        </nav>
        <h1>${c.heading}</h1>
        <p>${c.intro}</p>
      </div>
    </header>

    <section class="py-5">
      <div class="container">
        <div class="section-head justify-content-end">
          <span class="result-count">Showing ${list.length} style${list.length === 1 ? "" : "s"}</span>
        </div>
${grid(c.file)}
      </div>
    </section>

    <section class="cat-note">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-4"><h3>Fabric first</h3><p>Every style is sampled in-house before it goes on sale, so the fabric weight, drape and colour-fastness you read about are the ones you receive.</p></div>
          <div class="col-md-4"><h3>True-to-size fits</h3><p>Our size chart is built on Indian body measurements, not converted from foreign standards. If you are between sizes, size up for a relaxed fall.</p></div>
          <div class="col-md-4"><h3>Easy exchanges</h3><p>Not the right fit? Write to us within 7 days of delivery at <a href="mailto:${site.contact.email}">${site.contact.email}</a> and we will arrange an exchange.</p></div>
        </div>
      </div>
    </section>
  </main>

<!--#FOOTER#-->`;
}

/* ---------------- products.js (used by search + product page) ---------------- */
function writeProductsJs() {
  const map = {};
  for (const p of products) {
    const c = catOf(p.cat);
    map[p.id] = {
      id: p.id,
      name: p.name,
      category: c ? `${c.parent} · ${c.name}` : "Shop",
      categoryHref: p.cat,
      price: p.price,
      oldPrice: p.oldPrice || null,
      image: p.image,
      images: p.images,
      colors: p.colors,
      variants: p.variants,
      sizes: p.sizes,
      fabric: p.fabric,
      description: p.description,
      specs: p.specs,
      care: p.care,
    };
  }
  const imageIndex = {};
  for (const p of products) if (!imageIndex[p.image]) imageIndex[p.image] = p.id;

  const js = `/* AUTO-GENERATED by build.js — edit src/site.config.js instead. */
window.ZAURA_PRODUCTS = ${JSON.stringify(map)};
window.ZAURA_IMAGE_INDEX = ${JSON.stringify(imageIndex)};
window.ZAURA_getProductIdFromSrc = function (src) {
  if (!src) return null;
  var clean = src.split("?")[0].split("#")[0].replace(/^\\.?\\/*/, "");
  return window.ZAURA_IMAGE_INDEX[clean] || null;
};
`;
  fs.writeFileSync(path.join(ROOT, "js", "products.js"), js);
}

/* ---------------- page shell ---------------- */
const COMMON_SCRIPTS = [
  "js/bootstrap.bundle.min.js",
  "js/products.js",
  "js/site.js",
  "js/images.js",
  "js/auth.js",
  "js/aos.js",
];

function pageScripts(name) {
  const f = path.join(PAGES, name.replace(".html", ".scripts.txt"));
  let extra = "";
  if (fs.existsSync(f)) {
    extra = fs
      .readFileSync(f, "utf8")
      .split(/(?=<script)/)
      .filter((s) => s.trim())
      .filter((s) => {
        const m = s.match(/src="([^"]+)"/);
        return !m || !COMMON_SCRIPTS.includes(m[1]);
      })
      .join("\n");
  }
  const needsAos = /AOS\s*\./.test(extra);
  return `  <script src="js/bootstrap.bundle.min.js"></script>
${needsAos ? '  <script src="js/aos.js"></script>\n' : ""}  <script src="js/products.js"></script>
  <script src="js/site.js"></script>
  <script src="js/auth.js"></script>
${extra}`;
}

function shell({ name, title, description, body }) {
  const html = body
    .replace("<!--#HEADER#-->", renderHeader(name))
    .replace("<!--#FOOTER#-->", renderFooter())
    .replace(/<!--#GRID:([^:#]+)(?::(\d+))?(?::([^#]+))?#-->/g, (_, file, n, cols) =>
      grid(file, n ? Number(n) : undefined, cols)
    );

  return `<!doctype html>
<html lang="en">
<head>
  ${renderHead({ title, description, page: name })}
</head>
<body>

${html}

${searchModal}
${toast}

${pageScripts(name)}
</body>
</html>
`;
}

/* ---------------- page manifest ---------------- */
const pageMeta = {
  "index.html": {
    title: "ZAURA Fashions — Modern Indian Clothing for Men & Women",
    description:
      "Shop ZAURA Fashions: shirts, tees and denim for men, kurtis, tops and trousers for women. Considered fabrics, honest pricing, shipped across India.",
  },
  "mens.html": {
    title: "Men's Clothing — Shirts, T-Shirts & Jeans | ZAURA",
    description:
      "Explore ZAURA menswear: tailored shirts, combed-cotton T-shirts and stretch denim built for everyday Indian weather.",
  },
  "womens.html": {
    title: "Women's Clothing — Kurtis, Tops, Tees & Pants | ZAURA",
    description:
      "Explore ZAURA womenswear: cotton kurtis, everyday tees, occasion tops and comfortable palazzos and trousers.",
  },
  "contact.html": {
    title: "Contact ZAURA Fashions — Bengaluru Rural, Karnataka",
    description:
      "Get in touch with ZAURA Fashions. Visit us at Anupahalli V, Hoskote Taluk, Bengaluru Rural, Karnataka 562129, or call +91 8660791856.",
  },
  "product.html": {
    title: "Product Details | ZAURA",
    description: "Fabric, fit, sizing and care details for every ZAURA piece.",
  },
  "cart.html": {
    title: "Your Cart | ZAURA",
    description: "Review the items in your ZAURA shopping bag before checkout.",
  },
  "checkout.html": {
    title: "Checkout | ZAURA",
    description: "Securely complete your ZAURA order.",
  },
  "wishlist.html": {
    title: "Your Wishlist | ZAURA",
    description: "Pieces you have saved for later at ZAURA.",
  },
  "signin.html": {
    title: "Sign In | ZAURA",
    description: "Sign in to your ZAURA account to track orders and saved items.",
  },
  "signup.html": {
    title: "Create an Account | ZAURA",
    description: "Create a ZAURA account for faster checkout and order tracking.",
  },
};

/* ---------------- run ---------------- */
function run() {
  let count = 0;

  for (const [name, meta] of Object.entries(pageMeta)) {
    const bodyPath = path.join(PAGES, name);
    if (!fs.existsSync(bodyPath)) {
      console.warn("skip (missing body):", name);
      continue;
    }
    const body = fs.readFileSync(bodyPath, "utf8");
    fs.writeFileSync(path.join(ROOT, name), shell({ name, body, ...meta }));
    count++;
  }

  for (const c of categories) {
    fs.writeFileSync(
      path.join(ROOT, c.file),
      shell({
        name: c.file,
        title: c.title,
        description: c.description,
        body: categoryPage(c),
      })
    );
    count++;
  }

  writeProductsJs();

  // sitemap
  const urls = [...Object.keys(pageMeta), ...categories.map((c) => c.file)].filter(
    (u) => !["cart.html", "checkout.html", "wishlist.html", "signin.html", "signup.html"].includes(u)
  );
  fs.writeFileSync(
    path.join(ROOT, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((u) => `  <url><loc>${u === "index.html" ? "" : u}</loc></url>`)
      .join("\n")}\n</urlset>\n`
  );

  console.log(`Built ${count} pages + js/products.js + sitemap.xml`);
}

run();
