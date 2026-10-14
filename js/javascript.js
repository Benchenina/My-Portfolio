/* ============================================================
   javascript.js — vanilla JS interactions
   - mobile menu / navbar state
   - smooth vertical card reveal + tilt hover
   - scroll-to-top / scroll-to-bottom fabs
   - typing effect, active nav link, footer year
   ============================================================ */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');
  var navbar = document.getElementById('navbar');
  var toTop = document.getElementById('toTop');
  var toBottom = document.getElementById('toBottom');
  var yearEl = document.getElementById('year');

  /* ---------- dark / light theme toggle ---------- */
  var themeBtn = document.getElementById('themeToggle');
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('portfolio-theme', t); } catch (e) { /* private mode */ }
    if (themeBtn) {
      var light = t === 'light';
      themeBtn.textContent = light ? '☀️' : '🌙';
      themeBtn.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
    }
  }
  (function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem('portfolio-theme'); } catch (e) {}
    if (saved === 'light' || saved === 'dark') { applyTheme(saved); return; }
    var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight ? 'light' : 'dark');
  })();
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(cur);
    });
  }

  /* ---------- footer year ---------- */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- mobile menu ---------- */
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- active nav link (defined before first onScroll call) ---------- */
  var sections = ['top', 'projects', 'stack', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  function highlightNav(y) {
    if (!sections || !sections.length) return;
    var current = 'top';
    sections.forEach(function (s) {
      if (s && y >= s.offsetTop - 160) current = s.id;
    });
    document.querySelectorAll('.nav-link').forEach(function (a) {
      var href = a.getAttribute('href');
      a.classList.toggle('active', href === '#' + current);
    });
  }

  /* ---------- navbar + fabs on scroll ---------- */
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var max = document.documentElement.scrollHeight - window.innerHeight;

    if (navbar) navbar.classList.toggle('scrolled', y > 24);

    // Show "up" after scrolling a bit, "down" until near bottom
    if (toTop) toTop.classList.toggle('show', y > 400);
    if (toBottom) toBottom.classList.toggle('show', max - y > 400);

    try { highlightNav(y); } catch (e) { /* no-op */ }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- smooth scroll to top / bottom (wired before first scroll calc) ---------- */
  function smoothTo(top) {
    try {
      window.scrollTo({ top: top, behavior: 'smooth' });
    } catch (e) {
      window.scrollTo(0, top); // very old fallback
    }
  }
  if (toTop) toTop.addEventListener('click', function () { smoothTo(0); });
  if (toBottom) {
    toBottom.addEventListener('click', function () {
      smoothTo(document.documentElement.scrollHeight - window.innerHeight);
    });
  }

  onScroll();

  /* ---------- smooth anchor scrolling (fallback-safe) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  });

  /* ---------- cards: always visible (plain boxes) ---------- */
  var cards = document.querySelectorAll('.card');
  cards.forEach(function (c) { c.classList.add('visible'); });

  /* ---------- parallax lift on hero visual + card tilt (desktop) ---------- */
  var fine = window.matchMedia && window.matchMedia('(pointer:fine)').matches;
  if (fine) {
    document.querySelectorAll('.card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        if (!card.classList.contains('visible') && card.classList.contains('reveal')) return;
        var r = card.getBoundingClientRect();
        var rx = ((e.clientY - r.top) / r.height - 0.5) * -4;
        var ry = ((e.clientX - r.left) / r.width - 0.5) * 4;
        card.style.transform = 'translateY(-6px) perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ---------- typing effect in terminal ---------- */
  var typingEl = document.getElementById('typing');
  var phrases = [
    'python palette_forge.py --hue-shift',
    'godot --export "Little Quest" android',
    'jupyter lab analysis.ipynb',
    'git push origin main'
  ];
  if (typingEl) {
    var pi = 0, ci = 0, deleting = false;
    (function tick() {
      var word = phrases[pi];
      typingEl.textContent = word.slice(0, ci);
      if (!deleting && ci < word.length) { ci++; }
      else if (!deleting && ci === word.length) { deleting = true; return void setTimeout(tick, 1400); }
      else if (deleting && ci > 0) { ci--; }
      else { deleting = false; pi = (pi + 1) % phrases.length; }
      setTimeout(tick, deleting ? 32 : 64);
    })();
  }
})();
