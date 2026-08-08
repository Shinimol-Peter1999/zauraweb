/* =============================================================
   ZAURA — account handling (browser-local demo accounts)
   Sign up · Sign in · Sign out · Forgot / reset password
   ============================================================= */
(function () {
  "use strict";

  var USERS_KEY = "zaura_users";
  var SESSION_KEY = "zaura_session";
  var RESET_KEY = "zaura_resets";
  var RESET_TTL = 15 * 60 * 1000; // 15 minutes

  function read(key, fallback) {
    try {
      var v = JSON.parse(localStorage.getItem(key));
      return v == null ? fallback : v;
    } catch (e) {
      return fallback;
    }
  }
  function users() {
    return read(USERS_KEY, []);
  }
  function saveUsers(list) {
    localStorage.setItem(USERS_KEY, JSON.stringify(list));
  }
  function getSession() {
    return read(SESSION_KEY, null);
  }
  function setSession(s) {
    if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    else localStorage.removeItem(SESSION_KEY);
  }
  function hash(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    return String(h);
  }
  function normalise(email) {
    return (email || "").trim().toLowerCase();
  }
  function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ---------------- sign up / in / out ---------------- */
  function signUp(data) {
    var name = data.name;
    var email = normalise(data.email);
    var password = data.password;
    if (!name || !email || !password) return { ok: false, error: "All fields are required." };
    if (!validEmail(email)) return { ok: false, error: "Please enter a valid email." };
    if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };

    var list = users();
    if (list.some(function (u) { return u.email === email; })) {
      return { ok: false, error: "An account with this email already exists." };
    }
    list.push({ name: name, email: email, pw: hash(password), created: Date.now() });
    saveUsers(list);
    setSession({ name: name, email: email });
    if (window.ZAURA) window.ZAURA.syncFromSession();
    return { ok: true };
  }

  function signIn(data) {
    var email = normalise(data.email);
    var user = users().find(function (u) {
      return u.email === email && u.pw === hash(data.password || "");
    });
    if (!user) return { ok: false, error: "Invalid email or password." };
    setSession({ name: user.name, email: user.email });
    if (window.ZAURA) window.ZAURA.syncFromSession();
    return { ok: true };
  }

  function signOut() {
    setSession(null);
    /* Cart + wishlist are per-account: empty the shared mirrors so a
       signed-out visitor sees empty icons immediately. */
    try {
      localStorage.setItem("cart", "[]");
      localStorage.setItem("wishlist", "[]");
    } catch (e) {}
    if (window.ZAURA) {
      window.ZAURA.syncFromSession();
      window.ZAURA.updateCartBadge();
      window.ZAURA.updateWishBadge();
    }
  }

  /* ---------------- forgot / reset password ----------------
     There is no mail server behind this static site, so a reset
     code is generated in the browser and shown to the account
     owner. Swap requestReset() for a real API call when a
     backend is available.
     --------------------------------------------------------- */
  function requestReset(rawEmail) {
    var email = normalise(rawEmail);
    if (!email) return { ok: false, error: "Please enter your email address." };
    if (!validEmail(email)) return { ok: false, error: "Please enter a valid email." };
    if (!users().some(function (u) { return u.email === email; })) {
      return { ok: false, error: "We could not find an account with that email." };
    }
    var code = String(Math.floor(100000 + Math.random() * 900000));
    var resets = read(RESET_KEY, {});
    resets[email] = { code: code, expires: Date.now() + RESET_TTL };
    localStorage.setItem(RESET_KEY, JSON.stringify(resets));
    return { ok: true, email: email, code: code };
  }

  function resetPassword(rawEmail, code, newPassword) {
    var email = normalise(rawEmail);
    var resets = read(RESET_KEY, {});
    var entry = resets[email];
    if (!entry) return { ok: false, error: "Request a reset code first." };
    if (Date.now() > entry.expires) {
      delete resets[email];
      localStorage.setItem(RESET_KEY, JSON.stringify(resets));
      return { ok: false, error: "That code has expired. Please request a new one." };
    }
    if (String(code || "").trim() !== entry.code) return { ok: false, error: "Incorrect reset code." };
    if (!newPassword || newPassword.length < 6) {
      return { ok: false, error: "Password must be at least 6 characters." };
    }

    var list = users();
    var user = list.find(function (u) { return u.email === email; });
    if (!user) return { ok: false, error: "Account not found." };
    user.pw = hash(newPassword);
    saveUsers(list);
    delete resets[email];
    localStorage.setItem(RESET_KEY, JSON.stringify(resets));
    return { ok: true };
  }

  /* ---------------- header state ---------------- */
  function updateHeader() {
    var session = getSession();
    document.querySelectorAll(".signin").forEach(function (link) {
      if (session) {
        link.textContent = "Hi, " + session.name.split(" ")[0];
        link.setAttribute("href", "#");
        link.setAttribute("title", "Click to sign out");
        link.onclick = function (e) {
          e.preventDefault();
          if (confirm("Sign out?")) {
            signOut();
            location.reload();
          }
        };
      } else {
        link.textContent = "Sign In";
        link.setAttribute("href", "signin.html");
        link.onclick = null;
      }
    });
  }

  /* Carry ?next= across the sign in <-> sign up links. */
  function keepNext() {
    var raw = new URLSearchParams(location.search).get("next");
    if (!raw) return;
    document.querySelectorAll('a[href="signin.html"], a[href="signup.html"]').forEach(function (a) {
      a.setAttribute("href", a.getAttribute("href") + "?next=" + encodeURIComponent(raw));
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    updateHeader();
    keepNext();
  });

  /* Where to land after a successful sign in / sign up. Only
     same-site relative paths are honoured. */
  function nextUrl() {
    var raw = new URLSearchParams(location.search).get("next") || "";
    if (!raw || /^(https?:|\/\/)/i.test(raw)) return "index.html";
    return raw;
  }

  window.ZAURA_AUTH = {
    nextUrl: nextUrl,
    signUp: signUp,
    signIn: signIn,
    signOut: signOut,
    getSession: getSession,
    requestReset: requestReset,
    resetPassword: resetPassword,
    updateHeader: updateHeader,
  };
})();
