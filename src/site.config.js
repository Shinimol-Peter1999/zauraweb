/* =============================================================
   ZAURA — SINGLE SOURCE OF TRUTH
   Edit this file, then run:  node build.js
   Everything below (contact details, menus, pages, products)
   is written into every page automatically.
   ============================================================= */

const site = {
  brand: "ZAURA",
  tagline: "Timeless fashion, crafted with care.",

  /* ---------- CONTACT DETAILS (used in footer + contact page) ---------- */
  contact: {
    addressLines: [
      "Anupahalli V, Hoskote Taluk",
      "Bengaluru Rural, Karnataka – 562129",
    ],
    addressOneLine:
      "Anupahalli V, Hoskote Taluk, Bengaluru Rural, Karnataka – 562129",
    email: "zaurafashions@gmail.com",
    phoneDisplay: "+91 8660791856",
    phoneLink: "+918660791856",
    hours: "Monday – Saturday, 10:00 AM – 7:00 PM IST",
  },

  social: {
    instagram: "https://www.instagram.com/zaurafashions?igsh=cjNtaGN1eGU1OG9i",
    twitter: "https://x.com/ZAURAFASHIONS?s=20",
  },

  /* ---------- NAVIGATION ---------- */
  nav: [
    { label: "HOME", href: "index.html" },
    {
      label: "MEN",
      href: "mens.html",
      children: [
        { label: "Shirts", href: "men-shirts.html" },
        { label: "T-Shirts", href: "men-tshirts.html" },
        { label: "Jeans", href: "men-jeans.html" },
      ],
    },
    {
      label: "WOMEN",
      href: "womens.html",
      children: [
        { label: "Kurti", href: "women-kurti.html" },
        { label: "T-Shirts", href: "women-tshirts.html" },
        { label: "Tops", href: "women-tops.html" },
        { label: "Pant", href: "women-pants.html" },
        { label: "Short Kurti", href: "women-short-kurti.html" },
      ],
    },
    { label: "CONTACT US", href: "contact.html" },
  ],
};

/* ---------- CATEGORY PAGES ----------------------------------
   One entry = one page generated at <file>.
   ------------------------------------------------------------ */
const categories = [
  {
    file: "men-shirts.html",
    parent: "Men",
    parentHref: "mens.html",
    name: "Shirts",
    title: "Men's Shirts — Formal & Casual Shirts | ZAURA",
    description:
      "Shop ZAURA men's shirts: crisp formal shirts, breathable linen and everyday cotton casuals tailored for an easy, modern fit.",
    heading: "Men's Shirts",
    intro:
      "From boardroom-ready formals to relaxed weekend linens, every ZAURA shirt is cut for a clean shoulder line and finished with reinforced stitching. Breathable fabrics, colour-fast dyes and collars that hold their shape wash after wash.",
    image: "img/category-1.jpg",
  },
  {
    file: "men-tshirts.html",
    parent: "Men",
    parentHref: "mens.html",
    name: "T-Shirts",
    title: "Men's T-Shirts — Cotton Tees & Everyday Basics | ZAURA",
    description:
      "Soft combed-cotton T-shirts for men. Collarless, crew-neck and relaxed fits in 180 GSM jersey that keeps its shape.",
    heading: "Men's T-Shirts",
    intro:
      "Our tees start with 180 GSM combed-cotton jersey — soft against the skin, dense enough to hold its shape. Shoulder seams are taped, hems are twin-needle stitched, and every colour is pre-shrunk so the fit you buy is the fit you keep.",
    image: "img/category-2.jpg",
  },
  {
    file: "men-jeans.html",
    parent: "Men",
    parentHref: "mens.html",
    name: "Jeans",
    title: "Men's Jeans — Slim, Straight & Tapered Denim | ZAURA",
    description:
      "Stretch denim jeans for men in slim, straight and tapered fits. Durable indigo washes built for daily wear.",
    heading: "Men's Jeans",
    intro:
      "Denim you can actually live in. We blend a touch of elastane into heavyweight indigo cotton for give across the seat and thigh, then finish with bar-tacked stress points and rust-resistant hardware.",
    image: "img/category-3.jpg",
  },
  {
    file: "women-kurti.html",
    parent: "Women",
    parentHref: "womens.html",
    name: "Kurti",
    title: "Women's Kurtis — Cotton & Embroidered Kurtis | ZAURA",
    description:
      "Handpicked women's kurtis in breathable cotton — A-line, straight and embroidered styles for work and festive days.",
    heading: "Women's Kurtis",
    intro:
      "Everyday kurtis in breathable cotton and cotton-blend weaves, with side slits placed for easy movement and necklines finished by hand. Cut long enough to pair with leggings, palazzos or straight trousers.",
    image: "img/women-3.jpg",
  },
  {
    file: "women-tshirts.html",
    parent: "Women",
    parentHref: "womens.html",
    name: "T-Shirts",
    title: "Women's T-Shirts — Soft Cotton Tees | ZAURA",
    description:
      "Relaxed and boxy cotton T-shirts for women. Pre-shrunk, breathable jersey in wearable everyday colours.",
    heading: "Women's T-Shirts",
    intro:
      "Light, breathable jersey tees designed to layer or stand alone. Softly rolled hems, a neckline that stays flat, and a drape that skims rather than clings.",
    image: "img/women-1.jpg",
  },
  {
    file: "women-tops.html",
    parent: "Women",
    parentHref: "womens.html",
    name: "Tops",
    title: "Women's Tops — Casual & Occasion Tops | ZAURA",
    description:
      "Women's tops from ZAURA: ruffle-sleeve, satin wrap and everyday casual styles that move from desk to dinner.",
    heading: "Women's Tops",
    intro:
      "Tops that carry a day from desk to dinner. Fluid fabrics, considered sleeve detail and closures that sit flat — designed to look composed with denim and just as right with tailored trousers.",
    image: "img/women-2.jpg",
  },
  {
    file: "women-pants.html",
    parent: "Women",
    parentHref: "womens.html",
    name: "Pants",
    title: "Women's Pants — Palazzos & Tailored Trousers | ZAURA",
    description:
      "High-waist palazzos and tapered cotton trousers for women. Comfortable waistbands with a clean, tailored line.",
    heading: "Women's Pants",
    intro:
      "Bottoms built around comfort without losing the line — wide elastic-backed waistbands, deep functional pockets and hems set to a flattering length for Indian sizing.",
    image: "img/women-4.jpg",
  },
  {
    file: "women-short-kurti.html",
    parent: "Women",
    parentHref: "womens.html",
    name: "Short Kurti",
    title: "Women's Short Kurtis — Everyday Short Kurtas | ZAURA",
    description:
      "Short kurtis for women in easy cotton. Hip-length cuts that pair effortlessly with jeans, leggings and palazzos.",
    heading: "Women's Short Kurtis",
    intro:
      "Hip-length kurtis that work as hard as a good shirt. Easy cotton, clean side slits and mandarin or round necklines — the simplest way to dress up a pair of jeans.",
    image: "img/women-1.jpg",
  },
];

/* ---------- PRODUCTS ----------------------------------------
   Add a product here and it appears on its category page,
   in search, and on its own product detail page.
   `cat` must match a `file` above.

   IMAGES / COLOURS
   ----------------
   Every product lists `variants`. One variant = one colour + the
   photo shown when that colour is selected:

       variants: [
         { name: "White", hex: "#f8fafc", image: "img/products/shirt-white.jpg" },
       ]

   All product photos live in  img/products/  and lookbook photos in
   img/lookbook/  — swap a file (same name) to change the picture
   everywhere, or point `image` at any other path.
   ------------------------------------------------------------ */
const M = ["M", "L", "XL", "XXL"];
const W = ["XS", "S", "M", "L", "XL"];
const JEAN = ["30", "32", "34", "36", "38"];
const TEE = ["S", "M", "L", "XL", "XXL"];

const products = [
  /* ---- MEN / SHIRTS ---- */
  {
    id: "men-shirt-oxford", cat: "men-shirts.html", name: "Classic Oxford Shirt",
    price: 1299, oldPrice: 1699, sizes: M, badge: "SALE",
    variants: [
      { name: "White", hex: "#f4f4f5", image: "img/products/shirt-white.jpg" },
      { name: "Sky Blue", hex: "#93c5fd", image: "img/products/shirt-blue.jpg" },
      { name: "Navy", hex: "#1e3a8a", image: "img/products/shirt-navy.jpg" },
    ],
    fabric: "Yarn-dyed Oxford cotton (100% cotton, 140 GSM)",
    description: "The shirt that anchors a wardrobe. Yarn-dyed Oxford cotton gives it structure straight out of the box and softness that builds with every wash. Button-down collar, single chest pocket, clean regular fit.",
    specs: { Fit: "Regular", Collar: "Button-down", Cuff: "Barrel", Origin: "India", SKU: "ZR-MS-01" },
    care: ["Machine wash cold with like colours", "Do not bleach", "Tumble dry low", "Warm iron while slightly damp"],
  },
  {
    id: "men-shirt-formal-slim", cat: "men-shirts.html", name: "Formal Slim-Fit Shirt",
    price: 1499, oldPrice: null, sizes: M,
    variants: [
      { name: "Crisp White", hex: "#f8fafc", image: "img/products/shirt-white.jpg" },
      { name: "Black", hex: "#111111", image: "img/products/shirt-black.jpg" },
      { name: "Sky Blue", hex: "#93c5fd", image: "img/products/shirt-blue.jpg" },
    ],
    fabric: "Wrinkle-resistant poplin (65% cotton, 35% polyester)",
    description: "A sharp slim-fit formal shirt engineered for long days. The wrinkle-resistant poplin keeps its finish from the first meeting to the last, with a spread collar that sits neatly under a jacket.",
    specs: { Fit: "Slim", Collar: "Spread", Cuff: "Barrel", Origin: "India", SKU: "ZR-MS-02" },
    care: ["Machine wash cold", "Wash inside out", "Iron on medium heat", "Do not wring"],
  },
  {
    id: "men-shirt-linen", cat: "men-shirts.html", name: "Linen Casual Shirt",
    price: 1399, oldPrice: 1799, sizes: M, badge: "SALE",
    variants: [
      { name: "Sand Beige", hex: "#d9c7ab", image: "img/products/shirt-beige.jpg" },
      { name: "Olive", hex: "#5b6b3a", image: "img/products/shirt-olive.jpg" },
      { name: "White", hex: "#f4f4f5", image: "img/products/shirt-white.jpg" },
    ],
    fabric: "Linen-cotton blend (55% linen, 45% cotton)",
    description: "Built for warm afternoons. The linen-cotton blend breathes freely and drapes with an easy, lived-in texture, while a relaxed cut keeps the shirt comfortable rolled up or buttoned down.",
    specs: { Fit: "Relaxed", Collar: "Camp", Cuff: "Barrel", Origin: "India", SKU: "ZR-MS-03" },
    care: ["Gentle machine wash cold", "Do not bleach", "Line dry in shade", "Steam or warm iron"],
  },
  {
    id: "men-shirt-checked", cat: "men-shirts.html", name: "Checked Cotton Shirt",
    price: 1199, oldPrice: null, sizes: M,
    variants: [
      { name: "Rust Check", hex: "#9a3412", image: "img/products/shirt-check-rust.jpg" },
      { name: "Grey Check", hex: "#64748b", image: "img/products/shirt-check-grey.jpg" },
    ],
    fabric: "Brushed cotton twill (100% cotton)",
    description: "A soft, brushed cotton check that works over a tee or on its own. Colour-fast dyes hold the pattern crisp, and a mid-weight twill gives it just enough body for cooler evenings.",
    specs: { Fit: "Regular", Collar: "Point", Cuff: "Barrel", Origin: "India", SKU: "ZR-MS-04" },
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low", "Warm iron"],
  },

  /* ---- MEN / T-SHIRTS ---- */
  {
    id: "men-tee-collarless", cat: "men-tshirts.html", name: "Collarless Cotton Tee",
    price: 999, oldPrice: 1499, sizes: TEE, badge: "SALE",
    variants: [
      { name: "Black", hex: "#111111", image: "img/products/tee-black.jpg" },
      { name: "White", hex: "#f4f4f5", image: "img/products/tee-white.jpg" },
      { name: "Charcoal", hex: "#374151", image: "img/products/tee-charcoal.jpg" },
    ],
    fabric: "Combed cotton jersey (100% cotton, 180 GSM)",
    description: "A clean collarless tee with a soft hand-feel and a modern drop-shoulder cut. Versatile enough to layer under a shirt, refined enough to wear on its own.",
    specs: { Fit: "Regular", GSM: "180", Neck: "Band", Origin: "India", SKU: "ZR-MT-01" },
    care: ["Machine wash cold, inside out", "Do not bleach", "Tumble dry low", "Cool iron on reverse"],
  },
  {
    id: "men-tee-ecru", cat: "men-tshirts.html", name: "Ecru Relaxed Tee",
    price: 999, oldPrice: 1499, sizes: TEE, badge: "SALE",
    variants: [
      { name: "Ecru", hex: "#e8ddc8", image: "img/products/tee-ecru.jpg" },
      { name: "White", hex: "#f4f4f5", image: "img/products/tee-white.jpg" },
      { name: "Black", hex: "#111111", image: "img/products/tee-black.jpg" },
    ],
    fabric: "Combed cotton jersey (100% cotton, 180 GSM)",
    description: "The everyday tee in a warm ecru tone. Lightweight, breathable and cut a touch looser through the body for easy movement all day.",
    specs: { Fit: "Relaxed", GSM: "180", Neck: "Crew", Origin: "India", SKU: "ZR-MT-02" },
    care: ["Machine wash cold, inside out", "Do not bleach", "Line dry in shade", "Cool iron on reverse"],
  },
  {
    id: "men-tee-charcoal", cat: "men-tshirts.html", name: "Charcoal Everyday Tee",
    price: 999, oldPrice: 1499, sizes: TEE, badge: "SALE",
    variants: [
      { name: "Charcoal", hex: "#374151", image: "img/products/tee-charcoal.jpg" },
      { name: "Black", hex: "#111111", image: "img/products/tee-black.jpg" },
      { name: "Ecru", hex: "#e8ddc8", image: "img/products/tee-ecru.jpg" },
    ],
    fabric: "Combed cotton jersey (100% cotton, 180 GSM)",
    description: "A deep charcoal tee that resists fading wash after wash. Taped shoulder seams keep the shape, and a twin-needle hem stops the edge from curling.",
    specs: { Fit: "Regular", GSM: "180", Neck: "Crew", Origin: "India", SKU: "ZR-MT-03" },
    care: ["Machine wash cold, inside out", "Do not bleach", "Tumble dry low", "Cool iron on reverse"],
  },
  {
    id: "men-tee-crew", cat: "men-tshirts.html", name: "Essential Crew-Neck Tee",
    price: 899, oldPrice: null, sizes: TEE,
    variants: [
      { name: "White", hex: "#f4f4f5", image: "img/products/tee-white.jpg" },
      { name: "Black", hex: "#111111", image: "img/products/tee-black.jpg" },
      { name: "Charcoal", hex: "#374151", image: "img/products/tee-charcoal.jpg" },
    ],
    fabric: "Bio-washed cotton jersey (100% cotton, 160 GSM)",
    description: "The plain tee, done properly. Bio-washed for softness from day one, with a ribbed collar that holds its shape and a length that stays tucked when you want it to.",
    specs: { Fit: "Regular", GSM: "160", Neck: "Crew", Origin: "India", SKU: "ZR-MT-04" },
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low", "Cool iron"],
  },

  /* ---- MEN / JEANS ---- */
  {
    id: "men-jeans-slim", cat: "men-jeans.html", name: "Slim-Fit Stretch Jeans",
    price: 1799, oldPrice: 2299, sizes: JEAN, badge: "SALE",
    variants: [
      { name: "Indigo", hex: "#2b4a72", image: "img/products/jeans-indigo.jpg" },
      { name: "Jet Black", hex: "#111827", image: "img/products/jeans-black.jpg" },
      { name: "Stone Grey", hex: "#6b7280", image: "img/products/jeans-grey.jpg" },
    ],
    fabric: "Stretch denim (98% cotton, 2% elastane, 12 oz)",
    description: "A slim leg with real give. Two percent elastane means the denim moves with you through a full day, while a 12 oz weight keeps the structure and the indigo depth.",
    specs: { Fit: "Slim", Rise: "Mid", Closure: "Button & zip", Origin: "India", SKU: "ZR-MJ-01" },
    care: ["Wash inside out in cold water", "Wash separately for first 3 washes", "Do not bleach", "Line dry in shade"],
  },
  {
    id: "men-jeans-straight", cat: "men-jeans.html", name: "Straight-Leg Denim",
    price: 1899, oldPrice: null, sizes: JEAN,
    variants: [
      { name: "Indigo", hex: "#2b4a72", image: "img/products/jeans-indigo.jpg" },
      { name: "Light Wash", hex: "#9db6cf", image: "img/products/jeans-lightwash.jpg" },
      { name: "Jet Black", hex: "#111827", image: "img/products/jeans-black.jpg" },
    ],
    fabric: "Rigid denim (100% cotton, 13 oz)",
    description: "A clean straight leg in honest rigid denim that breaks in to your shape. Bar-tacked stress points and rust-resistant hardware make this a pair you keep for years.",
    specs: { Fit: "Straight", Rise: "Mid", Closure: "Button & zip", Origin: "India", SKU: "ZR-MJ-02" },
    care: ["Wash inside out in cold water", "Do not bleach", "Line dry in shade", "Iron on reverse if needed"],
  },
  {
    id: "men-jeans-tapered", cat: "men-jeans.html", name: "Tapered Dark-Wash Jeans",
    price: 1999, oldPrice: 2499, sizes: JEAN, badge: "SALE",
    variants: [
      { name: "Jet Black", hex: "#111827", image: "img/products/jeans-black.jpg" },
      { name: "Indigo", hex: "#2b4a72", image: "img/products/jeans-indigo.jpg" },
      { name: "Stone Grey", hex: "#6b7280", image: "img/products/jeans-grey.jpg" },
    ],
    fabric: "Stretch denim (97% cotton, 3% elastane, 11.5 oz)",
    description: "Roomy through the thigh, narrow at the ankle — the fit that works with both sneakers and boots. A deep, even dark wash that dresses up easily.",
    specs: { Fit: "Tapered", Rise: "Mid", Closure: "Button & zip", Origin: "India", SKU: "ZR-MJ-03" },
    care: ["Wash inside out in cold water", "Wash separately for first 3 washes", "Do not bleach", "Line dry in shade"],
  },

  /* ---- WOMEN / KURTI ---- */
  {
    id: "women-kurti-chikankari", cat: "women-kurti.html", name: "Chikankari A-Line Kurti",
    price: 1499, oldPrice: 1899, sizes: W, badge: "SALE",
    variants: [
      { name: "Ivory", hex: "#f1e9dc", image: "img/products/kurti-ivory.jpg" },
      { name: "Rose", hex: "#d98a9a", image: "img/products/kurti-rose.jpg" },
      { name: "Indigo", hex: "#33447a", image: "img/products/kurti-indigo.jpg" },
    ],
    fabric: "Cotton mulmul with hand-finished chikankari (100% cotton)",
    description: "Fine chikankari worked over soft cotton mulmul, with an A-line fall that skims rather than clings. Light enough for summer, detailed enough for a celebration.",
    specs: { Fit: "A-Line", Length: "Calf", Sleeve: "3/4", Origin: "India", SKU: "ZR-WK-01" },
    care: ["Hand wash cold, separately", "Do not bleach or soak", "Dry in shade", "Iron on reverse, low heat"],
  },
  {
    id: "women-kurti-printed", cat: "women-kurti.html", name: "Printed Cotton Kurti",
    price: 1199, oldPrice: null, sizes: W,
    variants: [
      { name: "Teal", hex: "#0f766e", image: "img/products/kurti-teal.jpg" },
      { name: "Mustard", hex: "#c98a1b", image: "img/products/kurti-mustard.jpg" },
      { name: "Indigo", hex: "#33447a", image: "img/products/kurti-indigo.jpg" },
    ],
    fabric: "Cotton cambric (100% cotton, colour-fast prints)",
    description: "An easy printed kurti for daily wear. Colour-fast screen prints on breathable cotton cambric, with side slits placed for comfortable movement through a full workday.",
    specs: { Fit: "Straight", Length: "Knee", Sleeve: "3/4", Origin: "India", SKU: "ZR-WK-02" },
    care: ["Machine wash cold, gentle cycle", "Do not bleach", "Line dry in shade", "Warm iron"],
  },
  {
    id: "women-kurti-embroidered", cat: "women-kurti.html", name: "Embroidered Straight Kurti",
    price: 1699, oldPrice: null, sizes: W,
    variants: [
      { name: "Rose", hex: "#d98a9a", image: "img/products/kurti-rose.jpg" },
      { name: "Mustard", hex: "#c98a1b", image: "img/products/kurti-mustard.jpg" },
      { name: "Teal", hex: "#0f766e", image: "img/products/kurti-teal.jpg" },
    ],
    fabric: "Rayon-cotton blend with thread embroidery",
    description: "Thread embroidery across the yoke lifts a simple straight silhouette into something occasion-ready. The rayon-cotton blend drapes beautifully and resists creasing.",
    specs: { Fit: "Straight", Length: "Calf", Sleeve: "3/4", Origin: "India", SKU: "ZR-WK-03" },
    care: ["Dry clean recommended", "If washing, cold water on gentle", "Iron on low, avoid embroidery", "Do not wring"],
  },
  {
    id: "women-kurti-anarkali", cat: "women-kurti.html", name: "Anarkali Flared Kurti",
    price: 1899, oldPrice: 2299, sizes: W, badge: "NEW",
    variants: [
      { name: "Indigo", hex: "#33447a", image: "img/products/kurti-indigo.jpg" },
      { name: "Rose", hex: "#d98a9a", image: "img/products/kurti-rose.jpg" },
      { name: "Ivory", hex: "#f1e9dc", image: "img/products/kurti-ivory.jpg" },
    ],
    fabric: "Viscose georgette with cotton lining",
    description: "A full-flare Anarkali with panelled godets that give the skirt its sweep. Lined through the bodice, gathered under an empire seam, and finished with a soft round neckline for festive days.",
    specs: { Fit: "Flared", Length: "Ankle", Sleeve: "3/4", Origin: "India", SKU: "ZR-WK-04" },
    care: ["Dry clean recommended", "Do not bleach", "Dry in shade", "Iron on low with a cloth"],
  },
  {
    id: "women-kurti-angrakha", cat: "women-kurti.html", name: "Angrakha Cotton Kurti",
    price: 1349, oldPrice: null, sizes: W, badge: "NEW",
    variants: [
      { name: "Mustard", hex: "#c98a1b", image: "img/products/kurti-mustard.jpg" },
      { name: "Teal", hex: "#0f766e", image: "img/products/kurti-teal.jpg" },
      { name: "Ivory", hex: "#f1e9dc", image: "img/products/kurti-ivory.jpg" },
    ],
    fabric: "Handloom-feel cotton (100% cotton)",
    description: "A classic angrakha overlap tied at the side, cut in a breathable handloom-feel cotton. The wrap front flatters through the waist and the hem falls just below the knee.",
    specs: { Fit: "Wrap", Length: "Knee", Sleeve: "3/4", Origin: "India", SKU: "ZR-WK-05" },
    care: ["Machine wash cold, gentle cycle", "Do not bleach", "Line dry in shade", "Warm iron"],
  },

  /* ---- WOMEN / T-SHIRTS ---- */
  {
    id: "women-tee-relaxed", cat: "women-tshirts.html", name: "Relaxed Cotton Tee",
    price: 899, oldPrice: null, sizes: W,
    variants: [
      { name: "White", hex: "#f4f4f5", image: "img/products/wtee-white.jpg" },
      { name: "Black", hex: "#111111", image: "img/products/wtee-black.jpg" },
      { name: "Blush", hex: "#e7bfc0", image: "img/products/wtee-blush.jpg" },
    ],
    fabric: "Combed cotton jersey (100% cotton, 160 GSM)",
    description: "A relaxed everyday tee in soft combed cotton. Slightly dropped shoulders and a rolled hem give it an unfussy, well-worn ease from the very first day.",
    specs: { Fit: "Relaxed", GSM: "160", Neck: "Crew", Origin: "India", SKU: "ZR-WT-01" },
    care: ["Machine wash cold, inside out", "Do not bleach", "Tumble dry low", "Cool iron"],
  },
  {
    id: "women-tee-boxy", cat: "women-tshirts.html", name: "Boxy Fit Tee",
    price: 949, oldPrice: 1249, sizes: W, badge: "SALE",
    variants: [
      { name: "Black", hex: "#111111", image: "img/products/wtee-black.jpg" },
      { name: "White", hex: "#f4f4f5", image: "img/products/wtee-white.jpg" },
      { name: "Teal", hex: "#0f766e", image: "img/products/wtee-teal.jpg" },
    ],
    fabric: "Heavyweight cotton jersey (100% cotton, 200 GSM)",
    description: "A structured, boxy tee that holds its own shape. Heavier 200 GSM jersey means no cling, a clean shoulder line, and a cropped-but-wearable length.",
    specs: { Fit: "Boxy", GSM: "200", Neck: "Crew", Origin: "India", SKU: "ZR-WT-02" },
    care: ["Machine wash cold, inside out", "Do not bleach", "Line dry in shade", "Cool iron"],
  },

  /* ---- WOMEN / TOPS ---- */
  {
    id: "women-top-ruffle", cat: "women-tops.html", name: "Ruffle-Sleeve Top",
    price: 1099, oldPrice: null, sizes: W,
    variants: [
      { name: "Blush", hex: "#e7bfc0", image: "img/products/top-blush.jpg" },
      { name: "Ivory", hex: "#f1e9dc", image: "img/products/top-ivory.jpg" },
      { name: "Black", hex: "#111111", image: "img/products/top-black.jpg" },
    ],
    fabric: "Viscose crepe (100% viscose)",
    description: "A softly gathered ruffle sleeve on a fluid crepe body. It reads polished with trousers and relaxed with denim — the kind of top that quietly earns its place.",
    specs: { Fit: "Regular", Length: "Hip", Sleeve: "Short ruffle", Origin: "India", SKU: "ZR-WP-01" },
    care: ["Hand wash cold", "Do not bleach", "Dry flat in shade", "Iron on low"],
  },
  {
    id: "women-top-satin-wrap", cat: "women-tops.html", name: "Satin Wrap Top",
    price: 1349, oldPrice: 1699, sizes: W, badge: "SALE",
    variants: [
      { name: "Black", hex: "#111111", image: "img/products/top-black.jpg" },
      { name: "Ivory", hex: "#f1e9dc", image: "img/products/top-ivory.jpg" },
      { name: "Blush", hex: "#e7bfc0", image: "img/products/top-blush.jpg" },
    ],
    fabric: "Matte satin (95% polyester, 5% elastane)",
    description: "A true wrap front with a concealed inner tie, so the neckline stays exactly where you set it. Matte satin catches light softly without looking shiny.",
    specs: { Fit: "Regular", Length: "Hip", Sleeve: "Full", Origin: "India", SKU: "ZR-WP-02" },
    care: ["Hand wash cold or dry clean", "Do not bleach", "Dry flat in shade", "Iron on reverse, low heat"],
  },

  /* ---- WOMEN / PANTS ---- */
  {
    id: "women-pant-palazzo", cat: "women-pants.html", name: "High-Waist Palazzo",
    price: 1249, oldPrice: null, sizes: W,
    variants: [
      { name: "Black", hex: "#111111", image: "img/products/pant-black.jpg" },
      { name: "Beige", hex: "#d9c7ab", image: "img/products/pant-beige.jpg" },
      { name: "Olive", hex: "#5b6b3a", image: "img/products/pant-olive.jpg" },
    ],
    fabric: "Rayon flex (100% rayon)",
    description: "Wide, fluid palazzos with an elastic-backed high waist that stays put. Deep side pockets and a hem set to sit just above the floor with a low heel.",
    specs: { Fit: "Wide leg", Rise: "High", Closure: "Elastic & drawcord", Origin: "India", SKU: "ZR-WB-01" },
    care: ["Machine wash cold, gentle cycle", "Do not bleach", "Line dry in shade", "Warm iron"],
  },
  {
    id: "women-pant-tapered", cat: "women-pants.html", name: "Tapered Cotton Trousers",
    price: 1399, oldPrice: 1799, sizes: W, badge: "SALE",
    variants: [
      { name: "Charcoal", hex: "#374151", image: "img/products/pant-charcoal.jpg" },
      { name: "Black", hex: "#111111", image: "img/products/pant-black.jpg" },
      { name: "Beige", hex: "#d9c7ab", image: "img/products/pant-beige.jpg" },
    ],
    fabric: "Cotton twill with stretch (96% cotton, 4% elastane)",
    description: "A tailored taper in stretch cotton twill. Front creases hold their line, the waistband sits flat under a tucked shirt, and the ankle-length hem keeps the look sharp.",
    specs: { Fit: "Tapered", Rise: "Mid", Closure: "Hook & zip", Origin: "India", SKU: "ZR-WB-02" },
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low", "Iron on medium heat"],
  },

  /* ---- WOMEN / SHORT KURTI ---- */
  {
    id: "women-short-kurti-straight", cat: "women-short-kurti.html", name: "Short Straight Kurti",
    price: 999, oldPrice: null, sizes: W,
    variants: [
      { name: "Ivory", hex: "#f1e9dc", image: "img/products/skurti-ivory.jpg" },
      { name: "Teal", hex: "#0f766e", image: "img/products/skurti-teal.jpg" },
      { name: "Rust", hex: "#b4432a", image: "img/products/skurti-rust.jpg" },
    ],
    fabric: "Cotton cambric (100% cotton)",
    description: "A hip-length straight kurti that behaves like a very good shirt. Breathable cotton cambric, clean side slits, and a neckline finished with fine piping.",
    specs: { Fit: "Straight", Length: "Hip", Sleeve: "3/4", Origin: "India", SKU: "ZR-WS-01" },
    care: ["Machine wash cold, gentle cycle", "Do not bleach", "Line dry in shade", "Warm iron"],
  },
  {
    id: "women-short-kurti-mandarin", cat: "women-short-kurti.html", name: "Mandarin-Collar Short Kurti",
    price: 1099, oldPrice: 1399, sizes: W, badge: "SALE",
    variants: [
      { name: "Rust", hex: "#b4432a", image: "img/products/skurti-rust.jpg" },
      { name: "Ivory", hex: "#f1e9dc", image: "img/products/skurti-ivory.jpg" },
      { name: "Teal", hex: "#0f766e", image: "img/products/skurti-teal.jpg" },
    ],
    fabric: "Cotton slub (100% cotton)",
    description: "A crisp mandarin collar and a half-placket give this short kurti a smart, put-together edge. Textured cotton slub adds interest without adding weight.",
    specs: { Fit: "Straight", Length: "Hip", Sleeve: "3/4", Origin: "India", SKU: "ZR-WS-02" },
    care: ["Machine wash cold", "Do not bleach", "Line dry in shade", "Warm iron"],
  },
];

/* Derive the legacy fields (image / images / colors) from `variants`
   so templates, search and the cart keep working unchanged. */
for (const p of products) {
  p.image = p.variants[0].image;
  p.images = p.variants.map((v) => v.image);
  p.colors = p.variants.map((v) => v.hex);
}

module.exports = { site, categories, products };
