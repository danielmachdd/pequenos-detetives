/* ================================================
   PEQUENOS DETETIVES — script.js
   Vanilla JS · Sem bibliotecas externas
   (UTMs + InitiateCheckout/Purchase são tratados pela UTMify
    e pela plataforma de checkout — server-side. Nada disso no front.)
   ================================================ */

/* === 1. CRONÔMETRO DE URGÊNCIA (7 min com localStorage) === */
(function () {
  var DURATION = 7 * 60;
  var KEY = 'pd_countdown_end_v2';

  var stored = localStorage.getItem(KEY);
  var now    = Math.floor(Date.now() / 1000);
  var endTime;

  if (!stored || now >= parseInt(stored, 10)) {
    endTime = now + DURATION;
    localStorage.setItem(KEY, endTime);
  } else {
    endTime = parseInt(stored, 10);
  }

  var minutesEl = document.getElementById('cd-minutes');
  var secondsEl = document.getElementById('cd-seconds');
  if (!minutesEl) return;

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function tick() {
    var remaining = parseInt(localStorage.getItem(KEY), 10) - Math.floor(Date.now() / 1000);
    if (remaining <= 0) {
      var newEnd = Math.floor(Date.now() / 1000) + DURATION;
      localStorage.setItem(KEY, newEnd);
      remaining = DURATION;
    }
    minutesEl.textContent = pad(Math.floor(remaining / 60));
    secondsEl.textContent = pad(remaining % 60);
  }

  tick();
  setInterval(tick, 1000);
})();


/* === 2. HEADER — sombra ao rolar === */
(function () {
  var header = document.getElementById('header');
  if (!header) return;
  window.addEventListener('scroll', function () {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  }, { passive: true });
})();


/* === 3. FAQ — accordion (um item aberto por vez) === */
(function () {
  var items = document.querySelectorAll('.faq__item');
  if (!items.length) return;
  items.forEach(function (item) {
    var btn = item.querySelector('.faq__btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      items.forEach(function (i) {
        i.classList.remove('is-open');
        var b = i.querySelector('.faq__btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();


/* === 4. SMOOTH SCROLL para links âncora === */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var headerEl = document.getElementById('header');
      var offset   = headerEl ? headerEl.offsetHeight : 0;
      var top      = target.getBoundingClientRect().top + window.pageYOffset - offset - 14;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();


/* === 5. NOTIFICAÇÕES DE VENDAS === */
(function () {
  var enableSalesNotifications = true;
  if (!enableSalesNotifications) return;

  var messages = [
    'Mariana garantiu a Coleção Premium em São Paulo - SP',
    'Patrícia acabou de comprar em Fortaleza - CE',
    'Juliana escolheu a Coleção Premium em Curitiba - PR',
    'Ana comprou os mistérios em Salvador - BA',
    'Fernanda garantiu a Coleção Premium em Belo Horizonte - MG',
    'Camila comprou há 2 minutos no Rio de Janeiro - RJ',
    'Rodrigo acabou de comprar em Recife - PE',
    'Bruna garantiu a Coleção Premium em Goiânia - GO',
    'Aline comprou os mistérios em Maceió - AL',
    'Vanessa escolheu a Coleção Premium em Porto Alegre - RS'
  ];

  var notif = document.getElementById('sales-notif');
  var msgEl = notif ? notif.querySelector('.sales-notif__msg') : null;
  if (!notif || !msgEl) return;

  var lastIndex = -1;
  var hideTimer;
  var hero = document.querySelector('.hero');

  function pastHero() {
    if (!hero) return true;
    return hero.getBoundingClientRect().bottom <= 0;
  }

  function getRandom(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function getRandomMessage() {
    var idx;
    do { idx = getRandom(0, messages.length - 1); } while (idx === lastIndex && messages.length > 1);
    lastIndex = idx;
    return messages[idx];
  }
  function show() {
    msgEl.textContent = getRandomMessage();
    notif.classList.add('is-visible');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () { notif.classList.remove('is-visible'); }, 5000);
  }
  function attempt() {
    if (pastHero()) {
      show();
      scheduleNext();
    } else {
      setTimeout(attempt, 1500);
    }
  }
  function scheduleNext() {
    var delay = getRandom(22, 45) * 1000;
    setTimeout(attempt, delay);
  }
  setTimeout(attempt, 8000);
})();


/* === 6. SCROLL REVEAL — anima elementos ao entrar na tela === */
(function () {
  var grids = document.querySelectorAll('.reveal-grid');
  if (!grids.length) return;
  if (!('IntersectionObserver' in window)) {
    grids.forEach(function (g) {
      Array.from(g.children).forEach(function (child) {
        child.style.opacity = '1';
        child.style.transform = 'none';
      });
    });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  grids.forEach(function (grid) {
    Array.from(grid.children).forEach(function (child) { observer.observe(child); });
  });
})();
