/* ==================================================================
   SCRIPT.JS — Bohuslava Rozsypalová · Grafické portfólio
   ------------------------------------------------------------------
    1  Jazykové verzie (EN / SK / DE)
    2  Obrázky — náhradný rámik pri chybe načítania
    3  Prepínač farebných tém (koleso)
    4  Plynulý posun na sekciu (data-scroll-to)
    5  Navigácia — aktívna sekcia a mobilné menu
    6  Zvlnené nadpisy
    7  Carousel
    8  Stieracia plocha
    9  Moodboard
   10  Galéria M-Victory
   11  Lightbox
   12  Weby — pohyblivé karty
   13  Kontaktný formulár
   ================================================================== */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/* ============================================================
   1. JAZYKOVÉ VERZIE
   Anglický text je priamo v HTML, preklady sú v i18n.js.
   data-i18n="kľúč"                 → preloží obsah prvku
   data-i18n-attr="atribút:kľúč"    → preloží atribút (alt, aria-label…)
   Po zmene jazyka sa odošle udalosť "langchange".
   ============================================================ */
(function () {
  const SUPPORTED = ['en', 'sk', 'de'];
  const dict = window.I18N_DICT || {};
  const en = dict.en = dict.en || {};
  const textEls = document.querySelectorAll('[data-i18n]');
  const attrEls = document.querySelectorAll('[data-i18n-attr]');
  let current = 'en';

  function attrPairs(el) {
    return el.dataset.i18nAttr.split(';').map(pair => pair.split(':').map(s => s.trim()));
  }

  // Anglické texty z HTML slúžia ako východiskový slovník
  textEls.forEach(el => {
    if (!(el.dataset.i18n in en)) en[el.dataset.i18n] = el.innerHTML;
  });
  attrEls.forEach(el => attrPairs(el).forEach(([attr, key]) => {
    if (!(key in en)) en[key] = el.getAttribute(attr) || '';
  }));

  function t(key) {
    const table = dict[current] || {};
    if (key in table) return table[key];
    return key in en ? en[key] : key;
  }

  function apply(lang) {
    current = SUPPORTED.includes(lang) ? lang : 'en';
    document.documentElement.lang = current;
    textEls.forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    attrEls.forEach(el => attrPairs(el).forEach(([attr, key]) => el.setAttribute(attr, t(key))));
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === current));
    });
    try { localStorage.setItem('lang', current); } catch (e) { /* úložisko nie je dostupné */ }
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: current } }));
  }

  // Poradie: parameter ?lang=, uložená voľba, jazyk prehliadača
  function initialLang() {
    const fromUrl = new URLSearchParams(location.search).get('lang');
    if (SUPPORTED.includes(fromUrl)) return fromUrl;

    let saved = null;
    try { saved = localStorage.getItem('lang'); } catch (e) { /* úložisko nie je dostupné */ }
    if (SUPPORTED.includes(saved)) return saved;

    const browser = (navigator.language || '').slice(0, 2).toLowerCase();
    if (browser === 'sk' || browser === 'cs') return 'sk';
    if (browser === 'de') return 'de';
    return 'en';
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.lang !== current) apply(btn.dataset.lang);
    });
  });

  window.i18n = { t, apply, get lang() { return current; } };
  apply(initialLang());
})();


/* ============================================================
   2. OBRÁZKY — ak sa obrázok nenačíta, slot dostane triedu
   "is-missing" a zobrazí sa náhradný rámik
   ============================================================ */
(function () {
  document.querySelectorAll('.img-slot img').forEach(img => {
    const markMissing = () => img.parentElement.classList.add('is-missing');
    if (img.complete && img.naturalWidth === 0) markMissing();
    else img.addEventListener('error', markMissing);
  });
})();


/* ============================================================
   3. PREPÍNAČ FAREBNÝCH TÉM — koleso sa roztočí a nastaví
   ďalšiu tému. Prvá téma v zozname je predvolená.
   ============================================================ */
(function () {
  const button = document.getElementById('wheel-button');
  const wheel = document.getElementById('wheel-svg');
  const THEMES = ['gold', 'champagne', 'bloom', 'zest', 'citrus'];
  const SPIN_DURATION = 2200; // zhodné s transition v .wheel-svg
  let rotation = 0;

  button.addEventListener('click', () => {
    button.disabled = true;
    rotation += 1440 + Math.floor(Math.random() * 360);
    wheel.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
      const current = document.documentElement.dataset.theme || THEMES[0];
      const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
      document.documentElement.dataset.theme = next;
      document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: next } }));
      button.disabled = false;
    }, SPIN_DURATION);
  });
})();


/* ============================================================
   4. PLYNULÝ POSUN NA SEKCIU — každé tlačidlo s atribútom
   data-scroll-to="id-sekcie" (bočné menu, „ďalej“, bannery,
   späť hore)
   ============================================================ */
(function () {
  document.querySelectorAll('[data-scroll-to]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.scrollTo);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();


/* ============================================================
   5. NAVIGÁCIA — zvýraznenie aktuálnej sekcie v bočnom
   a hornom menu, vysúvacie menu na mobile
   ============================================================ */
(function () {
  const dots = document.querySelectorAll('.side-nav-dot');
  const navLinks = document.querySelectorAll('.site-header nav a');
  const toggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      dots.forEach(dot => dot.classList.toggle('active', dot.dataset.scrollTo === id));
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + id));
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('section[id]').forEach(section => observer.observe(section));

  function closeMenu() {
    navList.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
})();


/* ============================================================
   6. ZVLNENÉ NADPISY — nadpis s triedou "wave-heading" sa
   rozdelí na písmená, ktoré sa pohnú pri prvom zobrazení
   ============================================================ */
(function () {
  const headings = document.querySelectorAll('.wave-heading');

  function splitIntoLetters(heading) {
    const lines = heading.innerHTML.split(/<br\s*\/?>/i);
    heading.innerHTML = '';
    lines.forEach((line, i) => {
      if (i > 0) heading.appendChild(document.createElement('br'));
      [...line].forEach(char => {
        const span = document.createElement('span');
        span.className = 'wave-letter';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationPlayState = 'paused';
        heading.appendChild(span);
      });
    });
  }

  function play(heading) {
    heading.querySelectorAll('.wave-letter').forEach((letter, i) => {
      letter.style.animationDelay = (i * 40) + 'ms';
      letter.style.animationPlayState = 'running';
    });
  }

  headings.forEach(splitIntoLetters);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.waved) {
        entry.target.dataset.waved = 'true';
        play(entry.target);
      }
    });
  }, { threshold: 0.6 });
  headings.forEach(h => observer.observe(h));

  // Preklad prepíše obsah nadpisu, preto ho rozdelíme znova
  document.addEventListener('langchange', () => {
    headings.forEach(h => {
      splitIntoLetters(h);
      if (h.dataset.waved) play(h);
    });
  });
})();


/* ============================================================
   7. CAROUSEL — automatické listovanie, šípky, bodky,
   potiahnutie prstom a klávesy ← →
   ============================================================ */
(function () {
  const carousel = document.getElementById('carousel');
  const track = document.getElementById('carousel-track');
  const dotsWrap = document.getElementById('carousel-dots');
  const slides = [...track.querySelectorAll('.carousel-slide')];
  const INTERVAL = 6000;
  let index = 0;
  let timer = null;
  let paused = false;

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.addEventListener('click', () => { goTo(i); restart(); });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function labelDots() {
    dots.forEach((dot, i) => dot.setAttribute('aria-label', `${window.i18n.t('car.goto')} ${i + 1}`));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((slide, n) => {
      const active = n === index;
      slide.setAttribute('aria-hidden', String(!active));
      slide.inert = !active;
    });
    dots.forEach((dot, n) => dot.setAttribute('aria-current', String(n === index)));
  }

  function restart() {
    clearInterval(timer);
    if (prefersReducedMotion || paused || document.hidden) return;
    timer = setInterval(() => goTo(index + 1), INTERVAL);
  }

  function setPaused(value) {
    paused = value;
    restart();
  }

  document.getElementById('carousel-prev').addEventListener('click', () => { goTo(index - 1); restart(); });
  document.getElementById('carousel-next').addEventListener('click', () => { goTo(index + 1); restart(); });

  // Pauza počas prezerania
  carousel.addEventListener('mouseenter', () => setPaused(true));
  carousel.addEventListener('mouseleave', () => setPaused(false));
  carousel.addEventListener('focusin', () => setPaused(true));
  carousel.addEventListener('focusout', e => { if (!carousel.contains(e.relatedTarget)) setPaused(false); });
  document.addEventListener('visibilitychange', restart);

  carousel.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { goTo(index - 1); restart(); }
    if (e.key === 'ArrowRight') { goTo(index + 1); restart(); }
  });

  // Potiahnutie prstom alebo myšou
  let startX = null;
  track.addEventListener('pointerdown', e => { startX = e.clientX; });
  track.addEventListener('pointercancel', () => { startX = null; });
  track.addEventListener('pointerup', e => {
    if (startX === null) return;
    const diff = e.clientX - startX;
    startX = null;
    if (Math.abs(diff) > 50) {
      goTo(diff < 0 ? index + 1 : index - 1);
      restart();
    }
  });

  document.addEventListener('langchange', labelDots);
  labelDots();
  goTo(0);
  restart();
})();


/* ============================================================
   8. STIERACIA PLOCHA — farebná vrstva nad obrázkom sa
   stiera myšou alebo prstom. Farby berie z aktuálnej témy.
   ============================================================ */
(function () {
  const canvas = document.getElementById('scratch-canvas');
  const ctx = canvas.getContext('2d');
  const BRUSH_RADIUS = 32;
  let drawing = false;

  function paintLayer() {
    const css = getComputedStyle(document.documentElement);
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, css.getPropertyValue('--bg-accent').trim());
    gradient.addColorStop(1, css.getPropertyValue('--ink').trim());

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.font = '700 13px "Montserrat", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(window.i18n.t('scratch.canvas'), canvas.width / 2, canvas.height / 2);
  }

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    paintLayer();
  }

  function scratch(e) {
    const rect = canvas.getBoundingClientRect();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(e.clientX - rect.left, e.clientY - rect.top, BRUSH_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  }

  canvas.addEventListener('pointerdown', e => {
    drawing = true;
    canvas.setPointerCapture(e.pointerId);
    scratch(e);
  });
  canvas.addEventListener('pointermove', e => { if (drawing) scratch(e); });
  canvas.addEventListener('pointerup', () => { drawing = false; });
  canvas.addEventListener('pointercancel', () => { drawing = false; });

  document.getElementById('scratch-reset').addEventListener('click', paintLayer);
  document.addEventListener('langchange', paintLayer);
  document.addEventListener('themechange', paintLayer);
  window.addEventListener('resize', resize);
  resize();
})();


/* ============================================================
   9. MOODBOARD — farebné vzorky sa dajú presúvať po ploche
   ============================================================ */
(function () {
  const board = document.getElementById('moodboard-board');
  const swatches = [...board.querySelectorAll('.swatch')];
  const startPositions = swatches.map(s => ({ x: s.dataset.x, y: s.dataset.y }));

  function place(swatch) {
    if (!board.clientWidth) return; // moodboard je na mobile skrytý
    const maxX = board.clientWidth - swatch.offsetWidth;
    const maxY = board.clientHeight - swatch.offsetHeight;
    const x = Math.min(Math.max(0, parseFloat(swatch.dataset.x)), Math.max(0, maxX));
    const y = Math.min(Math.max(0, parseFloat(swatch.dataset.y)), Math.max(0, maxY));
    swatch.dataset.x = x;
    swatch.dataset.y = y;
    swatch.style.left = x + 'px';
    swatch.style.top = y + 'px';
  }

  swatches.forEach(swatch => {
    let offsetX = 0;
    let offsetY = 0;
    place(swatch);

    swatch.addEventListener('pointerdown', e => {
      swatch.setPointerCapture(e.pointerId);
      const rect = board.getBoundingClientRect();
      offsetX = e.clientX - rect.left - parseFloat(swatch.dataset.x);
      offsetY = e.clientY - rect.top - parseFloat(swatch.dataset.y);
      swatch.style.zIndex = 50;
    });

    swatch.addEventListener('pointermove', e => {
      if (!swatch.hasPointerCapture(e.pointerId)) return;
      const rect = board.getBoundingClientRect();
      swatch.dataset.x = e.clientX - rect.left - offsetX;
      swatch.dataset.y = e.clientY - rect.top - offsetY;
      place(swatch);
    });

    swatch.addEventListener('pointerup', () => { swatch.style.zIndex = ''; });
  });

  document.getElementById('moodboard-reset').addEventListener('click', () => {
    swatches.forEach((swatch, i) => {
      swatch.dataset.x = startPositions[i].x;
      swatch.dataset.y = startPositions[i].y;
      place(swatch);
    });
  });

  window.addEventListener('resize', () => swatches.forEach(place));
})();


/* ============================================================
   10. GALÉRIA M-VICTORY — klik na kategóriu otvorí jej detail
   ============================================================ */
(function () {
  const catGrid = document.getElementById('gallery-cat-grid');
  const details = document.querySelectorAll('.gallery-detail');

  function showOnly(element) {
    catGrid.hidden = element !== catGrid;
    details.forEach(d => { d.hidden = d !== element; });
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.querySelectorAll('.gallery-cat-card').forEach(card => {
    card.addEventListener('click', () => {
      const detail = document.getElementById('gallery-detail-' + card.dataset.cat);
      if (detail) showOnly(detail);
    });
  });

  document.querySelectorAll('.gallery-detail .back-link').forEach(btn => {
    btn.addEventListener('click', () => showOnly(catGrid));
  });
})();


/* ============================================================
   11. LIGHTBOX — klik na obrázok v galérii ho zväčší,
   šípkami sa prechádza v rámci tej istej galérie
   ============================================================ */
(function () {
  const lightbox = document.getElementById('lightbox');
  const image = document.getElementById('lightbox-img');
  const GROUPS = ['.mini-gallery-grid', '.gallery-detail-grid', '.project-grid', '.device-stage'];
  let group = [];
  let index = 0;

  function show() {
    image.src = group[index].src;
    image.alt = group[index].alt;
  }

  function open(images, i) {
    group = images;
    index = i;
    show();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function close() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    image.src = '';
  }

  function step(direction) {
    index = (index + direction + group.length) % group.length;
    show();
  }

  document.querySelectorAll(GROUPS.join(',')).forEach(container => {
    const images = [...container.querySelectorAll('img')];
    images.forEach((img, i) => img.addEventListener('click', () => open(images, i)));
  });

  document.getElementById('lightbox-close').addEventListener('click', close);
  document.getElementById('lightbox-prev').addEventListener('click', () => step(-1));
  document.getElementById('lightbox-next').addEventListener('click', () => step(1));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
})();


/* ============================================================
   12. WEBY — POHYBLIVÉ KARTY
   Karta sa nakláňa podľa polohy myši a odlesk sleduje kurzor.
   Na dotykových zariadeniach zostáva len vznášanie a tieň.
   ============================================================ */
(function () {
  if (prefersReducedMotion) return;
  const MAX_TILT = 9; // stupne

  document.querySelectorAll('.web-card').forEach(card => {
    card.addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      card.classList.add('is-tilting');
      card.style.setProperty('--ry', ((x - 0.5) * 2 * MAX_TILT).toFixed(2) + 'deg');
      card.style.setProperty('--rx', ((0.5 - y) * 2 * MAX_TILT).toFixed(2) + 'deg');
      card.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
      card.style.setProperty('--my', (y * 100).toFixed(1) + '%');
    });

    card.addEventListener('pointerleave', () => {
      card.classList.remove('is-tilting');
      ['--rx', '--ry', '--mx', '--my'].forEach(prop => card.style.removeProperty(prop));
    });
  });
})();


/* ============================================================
   13. KONTAKTNÝ FORMULÁR — odoslanie cez FormSubmit
   ============================================================ */
(function () {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit');
  const status = document.getElementById('form-status');
  const t = key => window.i18n.t(key);

  form.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = t('form.sending');
    status.textContent = '';

    fetch('https://formsubmit.co/ajax/b.rozsypalova@gmail.com', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form)
    })
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        status.textContent = t('form.success');
        form.reset();
      })
      .catch(() => { status.textContent = t('form.error'); })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = t('form.send');
      });
  });
})();
