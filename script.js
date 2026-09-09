/* ==================================================================
   SCRIPT.JS — Bohuslava Rozsypalová — "Playful Portfolio" dizajn
   (grafická časť portfólia)
   ------------------------------------------------------------------
   Obsah:
     JS 1  Theme switcher — roztočenie + prehodenie farebnej témy
     JS 2  "Zvlnenie" nadpisu (viac nadpisov naraz) pri scrollovaní
     JS 3  Motto — "zotri a odhaľ" (scratch-to-reveal canvas, odhaľuje obrázok)
     JS 4  Moodboard — drag & drop (Pointer Events, myš aj dotyk)
     JS 5  Kontaktný formulár (FormSubmit)
     JS 6  Bočné menu (kocky) + horné menu — aktívna sekcia, "späť hore"
     JS 7  Hlavička — mobilné vysúvacie menu (hamburger)
     JS 8  Gallery Explore — rozklikateľné kategórie s galériou
     JS 9  Lightbox — klik na fotku v galérii ju zväčší na celú
   ================================================================== */

/* ============================================================
   JS 1: Theme switcher 
   ============================================================ */
(function () {
  const button = document.getElementById('wheel-button');
  const wheel = document.getElementById('wheel-svg');
  const themeOrder = ['bloom', 'zest', 'citrus'];
  let spinning = false;
  let totalRotation = 0;

  button.addEventListener('click', () => {
    if (spinning) return;
    spinning = true;
    button.disabled = true;

   
    totalRotation += 1440 + Math.floor(Math.random() * 360);
    wheel.style.transform = `rotate(${totalRotation}deg)`;

    setTimeout(() => {
      const current = document.documentElement.getAttribute('data-theme') || 'bloom';
      const currentIndex = themeOrder.indexOf(current);
      const next = themeOrder[(currentIndex + 1) % themeOrder.length];
      document.documentElement.setAttribute('data-theme', next);
      spinning = false;
      button.disabled = false;
    }, 2200); /* zodpovedá dĺžke transition v .wheel-svg (2.2s) */
  });
})();


(function () {
  const headingIds = ['services-heading', 'journey2-heading', 'cupdesign-heading'];

  headingIds.forEach((id) => {
    const heading = document.getElementById(id);
    if (!heading) return;

    const lines = heading.innerHTML.split('<br>');
    heading.innerHTML = '';

    lines.forEach((line, lineIndex) => {
      if (lineIndex > 0) heading.appendChild(document.createElement('br'));
      line.split('').forEach((char) => {
        const span = document.createElement('span');
        span.className = 'wave-letter';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationPlayState = 'paused';
        heading.appendChild(span);
      });
    });

    const letters = heading.querySelectorAll('.wave-letter');
    let played = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !played) {
          played = true;
          letters.forEach((letter, i) => {
            letter.style.animationDelay = (i * 40) + 'ms';
            letter.style.animationPlayState = 'running';
          });
        }
      });
    }, { threshold: 0.6 });

    observer.observe(heading);
  });
})();

/* ============================================================
   JS 3: MOTTO — canvas scratch efekt

   ============================================================ */
(function () {
  const canvas = document.getElementById('scratch-canvas');
  const ctx = canvas.getContext('2d');
  const box = canvas.parentElement;
  let drawing = false;

  function sizeCanvas() {
    const rect = box.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    paintScratchLayer();
  }
  function paintScratchLayer() {
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#CBD8C4');
    grad.addColorStop(1, '#3E2F26');
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(253,253,239,0.7)';
    ctx.font = '700 13px "Montserrat", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('scratch to reveal', canvas.width / 2, canvas.height / 2);
  }
  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    return { x: point.clientX - rect.left, y: point.clientY - rect.top };
  }
  function scratchAt(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 32, 0, Math.PI * 2);
    ctx.fill();
  }
  function start(e) { drawing = true; const p = getPos(e); scratchAt(p.x, p.y); }
  function move(e) { if (!drawing) return; e.preventDefault(); const p = getPos(e); scratchAt(p.x, p.y); }
  function end() { drawing = false; }

  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mousemove', move);
  window.addEventListener('mouseup', end);
  canvas.addEventListener('touchstart', start, { passive: true });
  canvas.addEventListener('touchmove', move, { passive: false });
  canvas.addEventListener('touchend', end);

  document.getElementById('scratch-reset').addEventListener('click', paintScratchLayer);
  window.addEventListener('resize', sizeCanvas);
  sizeCanvas();
})();

/* ============================================================
   JS 4: MOODBOARD — drag & drop 
   ============================================================ */
(function () {
  const board = document.getElementById('moodboard-board');
  if (!board) return;

  const items = Array.from(board.querySelectorAll('.moodboard-item:not(.is-fixed)'));

  function applyPosition(item) {
    item.style.left = item.dataset.x + 'px';
    item.style.top = item.dataset.y + 'px';
  }

  function clamp(item) {
    const boardRect = board.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const maxX = boardRect.width - itemRect.width;
    const maxY = boardRect.height - itemRect.height;
    item.dataset.x = Math.min(Math.max(0, parseFloat(item.dataset.x)), Math.max(0, maxX));
    item.dataset.y = Math.min(Math.max(0, parseFloat(item.dataset.y)), Math.max(0, maxY));
  }

  const startPositions = items.map(item => ({ x: item.dataset.x, y: item.dataset.y }));

  items.forEach((item) => {
    item.style.position = 'absolute';
    clamp(item);
    applyPosition(item);

    let offsetX = 0, offsetY = 0;

    item.addEventListener('pointerdown', (e) => {
      item.setPointerCapture(e.pointerId);
      const boardRect = board.getBoundingClientRect();
      offsetX = e.clientX - boardRect.left - parseFloat(item.dataset.x);
      offsetY = e.clientY - boardRect.top - parseFloat(item.dataset.y);
      item.style.zIndex = 50;
    });

    item.addEventListener('pointermove', (e) => {
      if (e.buttons === 0 && e.pointerType !== 'touch') return;
      if (!item.hasPointerCapture || !item.hasPointerCapture(e.pointerId)) return;
      const boardRect = board.getBoundingClientRect();
      item.dataset.x = e.clientX - boardRect.left - offsetX;
      item.dataset.y = e.clientY - boardRect.top - offsetY;
      clamp(item);
      applyPosition(item);
    });

    item.addEventListener('pointerup', (e) => {
      if (item.hasPointerCapture(e.pointerId)) item.releasePointerCapture(e.pointerId);
      item.style.zIndex = '';
    });
  });


  window.addEventListener('resize', () => {
    items.forEach(item => { clamp(item); applyPosition(item); });
  });

  const resetBtn = document.getElementById('moodboard-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      items.forEach((item, i) => {
        item.dataset.x = startPositions[i].x;
        item.dataset.y = startPositions[i].y;
        clamp(item);
        applyPosition(item);
      });
    });
  }
})();

/* ============================================================
   JS 5: KONTAKTNÝ FORMULÁR — FormSubmit AJAX
   ============================================================ */
(function () {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit');
  const statusEl = document.getElementById('form-status');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    statusEl.textContent = '';
    const data = new FormData(contactForm);
    fetch('https://formsubmit.co/ajax/b.rozsypalova@gmail.com', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: data
    })
      .then(res => res.json())
      .then(() => {
        statusEl.textContent = '✓ Message sent — thank you! I will get back to you soon.';
        contactForm.reset();
      })
      .catch(() => {
        statusEl.textContent = 'Something went wrong. Please email b.rozsypalova@gmail.com directly.';
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send';
      });
  });
})();

/* ============================================================
   JS 6: SIDE MENU 
   ============================================================ */
(function () {
  const dots = document.querySelectorAll('.side-nav-dot');
  const navLinks = document.querySelectorAll('.site-header nav a[data-nav]');
  const sections = document.querySelectorAll('section[id]');

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = document.getElementById(dot.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        dots.forEach(dot => dot.classList.toggle('active', dot.dataset.target === id));
        navLinks.forEach(link => link.classList.toggle('active', link.dataset.nav === id));
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(s => sectionObserver.observe(s));

  const backToTop = document.getElementById('back-to-top');
  backToTop.addEventListener('click', () => {
    document.getElementById('hero').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();

/* ============================================================
   JS 7: HLAVIČKA — mobilné vysúvacie menu 
   ============================================================ */
(function () {
  const toggle = document.getElementById('nav-toggle-btn');
  const navList = document.getElementById('nav-list');
  if (!toggle || !navList) return;

  toggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navList.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
})();

/* ============================================================
   JS 8: GALLERY EXPLORE 
   ============================================================ */
(function () {
  const catGrid = document.getElementById('gallery-cat-grid');
  if (!catGrid) return;

  document.querySelectorAll('.gallery-cat-card').forEach(card => {
    card.addEventListener('click', () => {
      const detail = document.getElementById('gallery-detail-' + card.dataset.cat);
      if (!detail) return;
      catGrid.hidden = true;
      document.querySelectorAll('.gallery-detail').forEach(d => { d.hidden = true; });
      detail.hidden = false;
      detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.querySelectorAll('#gallery-explore .back-link').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gallery-detail').forEach(d => { d.hidden = true; });
      catGrid.hidden = false;
      catGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ============================================================
   JS 9: LIGHTBOX 
   ============================================================ */
(function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (!lightbox || !lightboxImg) return;

  let currentGroup = [];
  let currentIndex = 0;

  function showCurrent() {
    const img = currentGroup[currentIndex];
    if (!img) return;
    lightboxImg.src = img.getAttribute('src') || '';
    lightboxImg.alt = img.getAttribute('alt') || '';
  }
  function openLightbox(imgs, idx) {
    currentGroup = imgs;
    currentIndex = idx;
    showCurrent();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
  }

  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev').addEventListener('click', () => {
    if (!currentGroup.length) return;
    currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
    showCurrent();
  });
  document.getElementById('lightbox-next').addEventListener('click', () => {
    if (!currentGroup.length) return;
    currentIndex = (currentIndex + 1) % currentGroup.length;
    showCurrent();
  });
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') document.getElementById('lightbox-prev').click();
    if (e.key === 'ArrowRight') document.getElementById('lightbox-next').click();
  });

  function initLightboxGroups(containerSelector) {
    document.querySelectorAll(containerSelector).forEach((container) => {
      const imgs = Array.from(container.querySelectorAll('img'));
      imgs.forEach((img, idx) => {
        img.addEventListener('click', () => openLightbox(imgs, idx));
      });
    });
  }

  initLightboxGroups('.mini-gallery-grid');
  initLightboxGroups('.gallery-detail-grid');
  initLightboxGroups('.wins-grid');
})();
