/* =============================================================
   ZAURA — shared site behaviour
   Cart badge · Wishlist badge · Product-card colour swatches
   Search · Navigation · Back-to-top
   ============================================================= */
(function () {
  "use strict";

  var CART_KEY = "cart";
  var WISH_KEY = "wishlist";
  var SESSION_KEY = "zaura_session";

  /* ---------------- session helpers ----------------
     Cart + wishlist belong to the signed-in account. The legacy
     "cart" / "wishlist" keys stay in place (other pages read them)
     but they are only ever a mirror of the current user's bucket.
     Signed out => both mirrors are emptied. */
  function currentUser() {
    try {
      var s = JSON.parse(localStorage.getItem(SESSION_KEY));
      return s && s.email ? String(s.email).toLowerCase() : null;
    } catch (e) {
      return null;
    }
  }
  function bucketKey(base) {
    var u = currentUser();
    return u ? "zaura_" + base + "::" + u : null;
  }
  function readJSON(key, fallback) {
    try {
      var v = JSON.parse(localStorage.getItem(key));
      return v == null ? fallback : v;
    } catch (e) {
      return fallback;
    }
  }

  var writingMirror = false;
  function writeMirror(key, value) {
    writingMirror = true;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } finally {
      writingMirror = false;
    }
  }

  /* Load the signed-in user's data into the shared keys, or clear
     them completely when nobody is signed in. */
  function syncFromSession() {
    var ck = bucketKey("cart");
    var wk = bucketKey("wish");
    writeMirror(CART_KEY, ck ? readJSON(ck, []) : []);
    writeMirror(WISH_KEY, wk ? readJSON(wk, []) : []);
  }

  /* Any page that writes the shared keys directly (cart.html,
     checkout.html, ...) is mirrored back into the user bucket. */
  (function patchStorage() {
    var native = localStorage.setItem.bind(localStorage);
    localStorage.setItem = function (key, value) {
      native(key, value);
      if (writingMirror) return;
      if (key === CART_KEY || key === WISH_KEY) {
        var bk = bucketKey(key === CART_KEY ? "cart" : "wish");
        if (bk) native(bk, value);
      }
    };
  })();

  syncFromSession();

  function isSignedIn() {
    return !!currentUser();
  }

  /* Ask the visitor to sign in, then bring them straight back. */
  function requireSignIn(action) {
    toast("Please sign in to " + action + ".");
    var next = location.pathname.split("/").pop() + location.search;
    setTimeout(function () {
      window.location.href = "signin.html?next=" + encodeURIComponent(next || "index.html");
    }, 1100);
    return false;
  }

  /* ---------------- storage helpers ---------------- */
  function getCart() {
    if (!isSignedIn()) return [];
    return readJSON(CART_KEY, []) || [];
  }
  function getWish() {
    if (!isSignedIn()) return [];
    var w = readJSON(WISH_KEY, []);
    return Array.isArray(w) ? w : [];
  }
  function setWish(list) {
    localStorage.setItem(WISH_KEY, JSON.stringify(list || []));
  }
  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  /* ---------------- badges ---------------- */
  function updateCartBadge() {
    var count = getCart().reduce(function (n, item) {
      return n + (item.quantity || 1);
    }, 0);
    document.querySelectorAll(".cart-icon span, #cart-count").forEach(function (el) {
      el.innerText = pad(count);
    });
  }

  /* The wishlist badge is ALWAYS visible and starts at 00. */
  function updateWishBadge() {
    var count = getWish().length;
    var icon = document.getElementById("wishlist-icon");
    if (!icon) return;
    var badge = document.getElementById("zaura-wish-badge");
    if (!badge) {
      badge = document.createElement("span");
      badge.id = "zaura-wish-badge";
      badge.className = "zaura-badge";
      icon.appendChild(badge);
    }
    badge.innerText = pad(count);
    badge.style.display = "";
    badge.classList.toggle("is-empty", count === 0);
    icon.setAttribute("aria-label", "Wishlist (" + count + " items)");
    document.querySelectorAll("#wish-count").forEach(function (el) {
      el.innerText = pad(count);
    });
  }

  function toggleWish(id) {
    if (!isSignedIn()) return requireSignIn("save items to your wishlist");
    var list = getWish();
    var next = list.indexOf(id) > -1
      ? list.filter(function (x) { return x !== id; })
      : list.concat([id]);
    setWish(next);
    updateWishBadge();
    syncWishHearts();
    return next.indexOf(id) > -1;
  }

  function syncWishHearts() {
    var list = getWish();
    document.querySelectorAll(".product-card[data-product-id]").forEach(function (cardEl) {
      var heart = cardEl.querySelector(".wishlist");
      if (heart) {
        heart.classList.toggle("active", list.indexOf(cardEl.getAttribute("data-product-id")) > -1);
      }
    });
  }

  function toast(msg) {
    var el = document.getElementById("zauraToast");
    if (!el) return;
    el.innerText = msg;
    el.classList.add("show");
    setTimeout(function () {
      el.classList.remove("show");
    }, 1600);
  }

  /* ---------------- product cards ---------------- */
  function enhanceCards() {
    document.querySelectorAll(".product-card").forEach(function (cardEl) {
      var img = cardEl.querySelector("img");
      if (!img) return;

      var id = cardEl.getAttribute("data-product-id");
      if (!id && window.ZAURA_getProductIdFromSrc) {
        id = window.ZAURA_getProductIdFromSrc(img.getAttribute("src"));
        if (id) cardEl.setAttribute("data-product-id", id);
      }
      if (!id) return;

      var href = "product.html?id=" + encodeURIComponent(id);
      var link = cardEl.querySelector("a[href]");
      if (link && (link.getAttribute("href") === "" || link.getAttribute("href") === "#")) {
        link.setAttribute("href", href);
      }
      if (!img.closest("a")) {
        img.style.cursor = "pointer";
        img.addEventListener("click", function (e) {
          if (!e.target.closest(".size-btn, .wishlist, button")) window.location.href = href;
        });
      }

      /* colour swatches — swap the card photo */
      cardEl.querySelectorAll(".card-swatch").forEach(function (sw) {
        sw.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          var src = sw.getAttribute("data-image");
          if (src) {
            img.src = src;
            img.alt = cardEl.querySelector(".product-title")
              ? cardEl.querySelector(".product-title").innerText + " — " + sw.getAttribute("data-color")
              : sw.getAttribute("data-color");
          }
          cardEl.querySelectorAll(".card-swatch").forEach(function (x) {
            x.classList.remove("active");
          });
          sw.classList.add("active");
        });
      });

      /* size chips */
      cardEl.querySelectorAll(".size-btn").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          cardEl.querySelectorAll(".size-btn").forEach(function (b) {
            b.classList.remove("selected-size");
          });
          btn.classList.add("selected-size");
        });
      });

      /* "View details" link */
      var info = cardEl.querySelector(".product-info");
      if (info && !info.querySelector(".zaura-view-details")) {
        var a = document.createElement("a");
        a.className = "zaura-view-details";
        a.href = href;
        a.textContent = "View details \u2192";
        info.appendChild(a);
      }

      /* wishlist heart */
      var heart = cardEl.querySelector(".wishlist");
      if (heart && !heart.dataset.bound) {
        heart.dataset.bound = "1";
        heart.style.cursor = "pointer";
        heart.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          if (!isSignedIn()) { toggleWish(id); return; }
          toast(toggleWish(id) ? "Added to wishlist" : "Removed from wishlist");
        });
      }

      /* add to cart — needs a size, uses the selected colour */
      var addBtn = cardEl.querySelector(".add-to-cart-btn");
      if (addBtn && !addBtn.dataset.bound) {
        addBtn.dataset.bound = "1";
        addBtn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          if (!isSignedIn()) { requireSignIn("add items to your cart"); return; }
          var product = (window.ZAURA_PRODUCTS || {})[id];
          if (!product) {
            window.location.href = href;
            return;
          }
          var size = cardEl.querySelector(".size-btn.selected-size");
          if (!size) {
            toast("Please choose a size first");
            return;
          }
          var swatch = cardEl.querySelector(".card-swatch.active");
          window.ZAURA.addToCart({
            id: product.id,
            name: product.name,
            image: swatch ? swatch.getAttribute("data-image") : product.image,
            price: product.price,
            size: size.innerText.trim(),
            color: swatch ? swatch.getAttribute("data-color") : product.variants[0].name,
            quantity: 1,
          });
          toast(product.name + " added to cart");
        });
      }
    });
    syncWishHearts();
  }


  /* ---------------- search ---------------- */
  function buildSearch() {
    var modal = document.getElementById("searchModal");
    if (!modal) return;
    var body = modal.querySelector(".modal-body");
    if (!body) return;
    body.innerHTML =
      '<input type="text" id="zauraSearchInput" class="form-control mb-3" placeholder="Search products, categories, fabric...">' +
      '<div id="zauraSearchResults" class="zaura-search-results"></div>';

    var input = document.getElementById("zauraSearchInput");
    var out = document.getElementById("zauraSearchResults");
    var all = Object.keys(window.ZAURA_PRODUCTS || {}).map(function (k) {
      return window.ZAURA_PRODUCTS[k];
    });

    function render(q) {
      var term = (q || "").trim().toLowerCase();
      var hits = term
        ? all.filter(function (p) {
            return (
              p.name.toLowerCase().indexOf(term) > -1 ||
              p.category.toLowerCase().indexOf(term) > -1 ||
              (p.fabric && p.fabric.toLowerCase().indexOf(term) > -1)
            );
          })
        : all.slice(0, 6);
      if (!hits.length) {
        out.innerHTML = '<p class="text-muted small mb-0">No products match "' + q + '"</p>';
        return;
      }
      out.innerHTML = hits
        .map(function (p) {
          return (
            '<a class="zaura-search-item" href="product.html?id=' + encodeURIComponent(p.id) + '">' +
            '<img src="' + p.image + '" alt="" loading="lazy" decoding="async">' +
            '<div><div class="zsi-name">' + p.name + "</div>" +
            '<div class="zsi-meta">' + p.category + " \u00b7 \u20b9" + p.price + "</div></div></a>"
          );
        })
        .join("");
    }

    input.addEventListener("input", function (e) {
      render(e.target.value);
    });
    modal.addEventListener("shown.bs.modal", function () {
      input.focus();
      render("");
    });
    render("");
  }

  /* ---------------- navigation ---------------- */
  function setupNav() {
    var toggles = document.querySelectorAll(".navbar .nav-item.dropdown > a.dropdown-toggle");
    if (!toggles.length) return;

    function apply() {
      var desktop = window.innerWidth >= 992;
      toggles.forEach(function (t) {
        if (desktop) {
          t.removeAttribute("data-bs-toggle");
          var menu = t.parentElement.querySelector(".dropdown-menu");
          if (menu) menu.classList.remove("show");
          t.parentElement.classList.remove("show");
          t.setAttribute("aria-expanded", "false");
        } else {
          t.setAttribute("data-bs-toggle", "dropdown");
        }
      });
    }
    apply();

    var timer;
    window.addEventListener("resize", function () {
      clearTimeout(timer);
      timer = setTimeout(apply, 120);
    });

    document.querySelectorAll(".navbar .dropdown-menu .dropdown-item").forEach(function (item) {
      item.addEventListener("click", function () {
        if (window.innerWidth < 992) {
          var nav = document.getElementById("navbarContent");
          if (nav && nav.classList.contains("show") && window.bootstrap) {
            window.bootstrap.Collapse.getOrCreateInstance(nav).hide();
          }
        }
      });
    });
  }

  /* Mobile: first tap opens the dropdown instead of following the link. */
  document.addEventListener("click", function (e) {
    var t = e.target.closest(".navbar-nav .dropdown-toggle");
    if (!t) return;
    var touch = window.matchMedia("(hover: none)").matches || window.innerWidth < 992;
    if (!touch) return;
    var menu = t.parentElement.querySelector(".dropdown-menu");
    if (!menu || menu.classList.contains("show")) return;
    e.preventDefault();
    document.querySelectorAll(".navbar-nav .dropdown-menu.show").forEach(function (m) {
      m.classList.remove("show");
    });
    menu.classList.add("show");
    t.setAttribute("aria-expanded", "true");
  });

  /* ---------------- back to top ---------------- */
  function setupBackToTop() {
    var btn = document.getElementById("scrollTopBtn");
    if (!btn) return;
    var toggle = function () {
      btn.classList.toggle("show", window.scrollY > 150);
    };
    toggle();
    window.addEventListener("scroll", toggle, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------- boot ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    enhanceCards();
    buildSearch();
    updateCartBadge();
    updateWishBadge();
    setupNav();
    setupBackToTop();
  });

  /* Keep badges correct when the page is restored from bfcache
     or another tab changes the cart / wishlist. */
  window.addEventListener("pageshow", function () {
    syncFromSession();
    updateCartBadge();
    updateWishBadge();
    syncWishHearts();
  });
  window.addEventListener("storage", function (e) {
    if (e.key === SESSION_KEY) {
      syncFromSession();
      updateCartBadge();
      updateWishBadge();
      syncWishHearts();
      return;
    }
    if (e.key === WISH_KEY) {
      updateWishBadge();
      syncWishHearts();
    }
    if (e.key === CART_KEY) updateCartBadge();
  });

  window.ZAURA = {
    getCart: getCart,
    getWish: getWish,
    setWish: setWish,
    toggleWish: toggleWish,
    updateCartBadge: updateCartBadge,
    updateWishBadge: updateWishBadge,
    toast: toast,
    isSignedIn: isSignedIn,
    requireSignIn: requireSignIn,
    syncFromSession: syncFromSession,
    addToCart: function (item) {
      if (!isSignedIn()) return requireSignIn("add items to your cart");
      var cart = getCart();
      var found = cart.find(function (c) {
        return c.id === item.id && c.size === item.size && c.color === item.color;
      });
      if (found) {
        found.quantity = (found.quantity || 1) + (item.quantity || 1);
      } else {
        cart.push(Object.assign({ quantity: 1 }, item));
      }
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      updateCartBadge();
      return true;
    },
  };
})();
