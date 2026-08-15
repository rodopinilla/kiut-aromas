/* ============================================================
   KIUT AROMAS — Premium Candle E-Commerce Application
   Production-ready vanilla JS · ES6+ · No dependencies
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────
   0. PRODUCT DATA
   ───────────────────────────────────────────── */

const PRODUCTS = [
  {
    id: 1,
    name: 'Recarga de Energía',
    type: 'Vela de Soja Natural',
    weight: '100g',
    price: 8500,
    category: 'energia',
    badge: 'Popular',
    notes: { top: 'Flor de Naranjo', heart: 'Jazmín', base: 'Ámbar' },
    description: 'Una explosión de vitalidad que despierta tus sentidos. Notas florales vibrantes que transforman tu espacio en un jardín de energía.',
    image: 'assets/images/IMG_20260425_143255390_HDR_AE.jpg',
    gallery: ['assets/images/IMG_20260425_143255390_HDR_AE.jpg', 'assets/images/IMG_20260425_143319980_HDR_AE.jpg']
  },
  {
    id: 2,
    name: 'Recarga de Energía',
    type: 'Difusor de Ambientes',
    weight: '100ml',
    price: 9800,
    category: 'energia',
    badge: null,
    notes: { top: 'Flor de Naranjo', heart: 'Jazmín', base: 'Ámbar' },
    description: 'Fragancia continua que llena cada rincón con la vibrante energía de flores y ámbar. Sin llama, con máxima difusión.',
    image: 'assets/images/IMG_20260425_143319980_HDR_AE.jpg',
    gallery: ['assets/images/IMG_20260425_143319980_HDR_AE.jpg', 'assets/images/IMG_20260425_143255390_HDR_AE.jpg']
  },
  {
    id: 3,
    name: 'Tonka y Sándalo',
    type: 'Vela de Soja Natural',
    weight: '200g',
    price: 12900,
    category: 'premium',
    badge: 'Bestseller',
    notes: { top: 'Tonka', heart: 'Sándalo', base: 'Vainilla oscura' },
    description: 'Sofisticación en estado puro. La calidez del sándalo se abraza con la dulzura enigmática del haba de tonka.',
    image: 'assets/images/IMG_20260425_145431213_HDR_AE.jpg',
    gallery: ['assets/images/IMG_20260425_145431213_HDR_AE.jpg', 'assets/images/IMG_20260523_123708294_HDR_AE.jpg', 'assets/images/IMG_20260523_123814349_HDR_AE.jpg']
  },
  {
    id: 4,
    name: 'Sándalo, Nardo y Pera',
    type: 'Vela de Soja Natural',
    weight: '200g',
    price: 12900,
    category: 'premium',
    badge: null,
    notes: { top: 'Pera', heart: 'Nardo', base: 'Sándalo' },
    description: 'Un viaje sensorial desde la frescura frutal de la pera hasta la profundidad amaderada del sándalo.',
    image: 'assets/images/IMG_20260425_145644695_HDR_AE.jpg',
    gallery: ['assets/images/IMG_20260425_145644695_HDR_AE.jpg', 'assets/images/IMG_20260523_123708294_HDR_AE.jpg']
  },
  {
    id: 5,
    name: 'Canela, Vainilla y Tabaco',
    type: 'Vela de Soja Natural',
    weight: '150g',
    price: 9900,
    category: 'clasica',
    badge: 'Nuevo',
    notes: { top: 'Canela', heart: 'Vainilla', base: 'Tabaco dulce' },
    description: 'El abrazo cálido de una tarde junto a la chimenea. Canela envolvente, vainilla suave y un toque de tabaco que invita a quedarse.',
    image: 'assets/images/IMG_20260523_123404284_HDR_AE.jpg',
    gallery: ['assets/images/IMG_20260523_123404284_HDR_AE.jpg', 'assets/images/IMG_20260506_102503326_HDR_AE.jpg', 'assets/images/IMG_20260506_131253739_HDR_AE.jpg']
  },
  {
    id: 6,
    name: 'Hojas de Limón y Fresias',
    type: 'Vela de Soja Natural',
    weight: '150g',
    price: 9900,
    category: 'clasica',
    badge: null,
    notes: { top: 'Hojas de Limón', heart: 'Fresia', base: 'Musgo blanco' },
    description: 'Frescura botánica que purifica y revitaliza. Como un paseo matutino por un jardín bañado de rocío.',
    image: 'assets/images/IMG_20260523_123553324_HDR_AE.jpg',
    gallery: ['assets/images/IMG_20260523_123553324_HDR_AE.jpg', 'assets/images/IMG_20260523_123656026_HDR_AE.jpg']
  },
  {
    id: 7,
    name: 'Home Diffuser',
    type: 'Difusor Premium',
    weight: '200ml',
    price: 14500,
    category: 'home',
    badge: 'Premium',
    notes: { top: 'Bergamota', heart: 'Rosa negra', base: 'Oud' },
    description: 'La joya de tu hogar. Diseño escultórico en vidrio negro que difunde las fragancias más exclusivas de KIUT.',
    image: 'assets/images/IMG_20260506_155709276_HDR_AE.jpg',
    gallery: ['assets/images/IMG_20260506_155709276_HDR_AE.jpg', 'assets/images/IMG_20260506_155540348_HDR_AE.jpg', 'assets/images/IMG_20260506_155730902_HDR_AE.jpg']
  },
  {
    id: 8,
    name: 'Prendeme',
    type: 'Vela de Soja Natural',
    weight: '150g',
    price: 10500,
    category: 'wellness',
    badge: 'Bienestar',
    notes: { top: 'Eucalipto', heart: 'Menta', base: 'Romero' },
    description: 'Wellness en cada respiro. Aromas herbales que despejan la mente y reconfortan el alma.',
    image: 'assets/images/IMG_20260425_144015830_HDR_AE.jpg',
    gallery: ['assets/images/IMG_20260425_144015830_HDR_AE.jpg', 'assets/images/IMG_20260425_144032438_HDR_AE.jpg']
  }
];

const FREE_SHIPPING_THRESHOLD = 25000;
const REFILL_PRICE = 6800;
const AVG_PRICE = 10500;

/* ─────────────────────────────────────────────
   1. UTILITY HELPERS
   ───────────────────────────────────────────── */

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const formatPrice = (num) => {
  const str = Math.round(num).toString();
  return '$' + str.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isTouchDevice = () =>
  'ontouchstart' in window || navigator.maxTouchPoints > 0;

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

const lerp = (a, b, t) => a + (b - a) * t;

const debounce = (fn, ms = 100) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};

/* ─────────────────────────────────────────────
   2. DARK MODE / THEME TOGGLE
   ───────────────────────────────────────────── */

const ThemeManager = (() => {
  const STORAGE_KEY = 'kiut-theme';
  let toggleBtn;

  const apply = (dark) => {
    document.body.classList.toggle('dark-mode', dark);
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-label', dark ? 'Modo claro' : 'Modo oscuro');
      const icon = toggleBtn.querySelector('i, svg, .theme-icon');
      if (icon) {
        icon.className = dark ? 'theme-icon icon-sun' : 'theme-icon icon-moon';
      }
      toggleBtn.innerHTML = dark
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
  };

  const toggle = () => {
    const nowDark = !document.body.classList.contains('dark-mode');
    localStorage.setItem(STORAGE_KEY, nowDark ? 'dark' : 'light');
    apply(nowDark);
  };

  const init = () => {
    toggleBtn = $('.theme-toggle');
    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = saved ? saved === 'dark' : prefersDark;
    apply(dark);
    if (toggleBtn) toggleBtn.addEventListener('click', toggle);
  };

  return { init };
})();

/* ─────────────────────────────────────────────
   3. NAVBAR
   ───────────────────────────────────────────── */

const Navbar = (() => {
  let navbar, mobileBtn, navLinks, sections;
  let lastScroll = 0;

  const handleScroll = () => {
    const y = window.scrollY;
    if (navbar) {
      navbar.classList.toggle('scrolled', y > 50);
      /* Hide / show on scroll direction */
      if (y > 300) {
        navbar.classList.toggle('nav-hidden', y > lastScroll && y - lastScroll > 5);
      } else {
        navbar.classList.remove('nav-hidden');
      }
    }
    lastScroll = y;
  };

  const highlightActive = () => {
    if (!sections || !sections.length) return;
    const scrollY = window.scrollY + 120;
    let currentId = '';
    sections.forEach((sec) => {
      if (sec.offsetTop <= scrollY) currentId = sec.id;
    });
    $$('.nav-link').forEach((link) => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${currentId}`
      );
    });
  };

  const toggleMobileMenu = () => {
    if (!mobileBtn || !navLinks) return;
    const open = navLinks.classList.toggle('open');
    mobileBtn.classList.toggle('active', open);
    mobileBtn.setAttribute('aria-expanded', open);
    document.body.classList.toggle('menu-open', open);
  };

  const closeMobile = () => {
    if (navLinks) navLinks.classList.remove('open');
    if (mobileBtn) {
      mobileBtn.classList.remove('active');
      mobileBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.classList.remove('menu-open');
  };

  const smoothScroll = (e) => {
    const link = e.target.closest('.nav-link');
    if (!link) return;
    const hash = link.getAttribute('href');
    if (!hash || hash.charAt(0) !== '#') return;
    e.preventDefault();
    const target = $(hash);
    if (target) {
      const offset = navbar ? navbar.offsetHeight : 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    closeMobile();
  };

  const init = () => {
    navbar = $('.navbar');
    mobileBtn = $('.mobile-menu-btn');
    navLinks = $('.nav-links');
    sections = $$('section[id]');

    window.addEventListener('scroll', () => {
      handleScroll();
      highlightActive();
    }, { passive: true });

    if (mobileBtn) mobileBtn.addEventListener('click', toggleMobileMenu);

    document.addEventListener('click', (e) => {
      if (e.target.closest('.nav-link')) smoothScroll(e);
    });
  };

  return { init };
})();

/* ─────────────────────────────────────────────
   4. HERO PARTICLE SYSTEM
   ───────────────────────────────────────────── */

const ParticleSystem = (() => {
  let canvas, ctx, particles = [], animId, visible = true, w, h;
  const COUNT = 50;

  class Particle {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x = Math.random() * w;
      this.y = initial ? Math.random() * h : h + 10;
      this.r = Math.random() * 2.5 + 1;
      this.speedY = Math.random() * 0.6 + 0.2;
      this.wobbleAmp = Math.random() * 30 + 10;
      this.wobbleSpeed = Math.random() * 0.02 + 0.005;
      this.phase = Math.random() * Math.PI * 2;
      this.opacity = Math.random() * 0.5 + 0.3;
      this.life = 0;
    }
    update() {
      this.life += 1;
      this.y -= this.speedY;
      this.x += Math.sin(this.life * this.wobbleSpeed + this.phase) * 0.4;
      /* Fade at edges */
      const edgeFade = 1 - Math.max(
        0,
        (Math.abs(this.x - w / 2) - w / 2 + 60) / 60
      );
      const topFade = clamp(this.y / (h * 0.2), 0, 1);
      this.drawOpacity = this.opacity * clamp(edgeFade, 0, 1) * topFade;
      if (this.y < -10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(196, 162, 101, ${this.drawOpacity})`;
      ctx.fill();
    }
  }

  const resize = () => {
    if (!canvas) return;
    const hero = $('#hero') || canvas.parentElement;
    w = hero.clientWidth;
    h = hero.clientHeight;
    canvas.width = w * devicePixelRatio;
    canvas.height = h * devicePixelRatio;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  };

  const tick = () => {
    if (!visible || prefersReducedMotion()) {
      animId = requestAnimationFrame(tick);
      return;
    }
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => { p.update(); p.draw(); });
    animId = requestAnimationFrame(tick);
  };

  const init = () => {
    canvas = $('.hero-particles');
    if (!canvas) {
      /* Create canvas if not in DOM */
      const hero = $('#hero');
      if (!hero) return;
      canvas = document.createElement('canvas');
      canvas.className = 'hero-particles';
      canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;';
      hero.style.position = 'relative';
      hero.prepend(canvas);
    }
    ctx = canvas.getContext('2d');
    resize();
    for (let i = 0; i < COUNT; i++) particles.push(new Particle());

    window.addEventListener('resize', debounce(resize, 200));

    /* Pause when hero not visible */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.05 })
        .observe(canvas.parentElement || canvas);
    }

    tick();
  };

  return { init };
})();

/* ─────────────────────────────────────────────
   5. PRODUCT CATALOG — FILTERS & 3D TILT
   ───────────────────────────────────────────── */

const ProductCatalog = (() => {
  let grid, cards, currentFilter = 'all';

  const filterProducts = (cat) => {
    currentFilter = cat;
    /* Update button states */
    $$('.filter-btn').forEach((btn) =>
      btn.classList.toggle('active', btn.dataset.filter === cat)
    );

    cards.forEach((card) => {
      const match = cat === 'all' || card.dataset.category === cat;
      if (match) {
        card.style.display = '';
        requestAnimationFrame(() => {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.92) translateY(16px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity .45s ease, transform .45s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
          });
        });
      } else {
        card.style.transition = 'opacity .3s ease, transform .3s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.92) translateY(16px)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  };

  const handleTilt = (e) => {
    if (isTouchDevice() || prefersReducedMotion()) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    card.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
    /* Glare overlay */
    const glare = card.querySelector('.product-card-glare');
    if (glare) {
      const gx = (x / rect.width) * 100;
      const gy = (y / rect.height) * 100;
      glare.style.background =
        `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;
    }
  };

  const resetTilt = (e) => {
    const card = e.currentTarget;
    card.style.transform = '';
    card.style.transition = 'transform .5s ease';
    const glare = card.querySelector('.product-card-glare');
    if (glare) glare.style.background = 'transparent';
    setTimeout(() => { card.style.transition = ''; }, 500);
  };

  const renderCatalog = () => {
    if (!grid) return;
    grid.innerHTML = PRODUCTS.map((p) => `
      <div class="product-card reveal" data-product-id="${p.id}" data-category="${p.category}">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <div class="product-card-image">
          <img class="product-card-img" src="${p.image}" alt="${p.name}" loading="lazy" />
          <div class="product-card-overlay"></div>
          <div class="product-card-glare" style="position:absolute;inset:0;pointer-events:none;mix-blend-mode:overlay;opacity:0;transition:opacity 0.4s ease;"></div>
        </div>
        <div class="product-card-body">
          <h3 class="product-name">${p.name}</h3>
          <p class="product-notes">${p.notes.top} · ${p.notes.heart} · ${p.notes.base}</p>
          <div class="product-price">${formatPrice(p.price)}</div>
          <button class="add-to-cart-btn" data-product-id="${p.id}">Agregar al carrito</button>
        </div>
      </div>
    `).join('');
  };

  const init = () => {
    grid = $('.product-grid');
    if (!grid) return;
    renderCatalog();
    cards = $$('.product-card', grid);

    /* Delegated filter clicks */
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (btn) filterProducts(btn.dataset.filter);
    });

    /* 3D tilt */
    if (!isTouchDevice()) {
      cards.forEach((card) => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
      });
    }

    /* Add to cart click — delegated */
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.add-to-cart-btn');
      if (!btn) return;
      const id = parseInt(btn.dataset.productId, 10);
      if (id) Cart.add(id);
    });
  };

  return { init };
})();

/* ─────────────────────────────────────────────
   6. PRODUCT MODAL
   ───────────────────────────────────────────── */

const ProductModal = (() => {
  let modal, currentGalleryIdx = 0, currentProduct = null;

  const createModal = () => {
    modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
      <div class="product-modal-overlay"></div>
      <div class="product-modal-content glass">
        <button class="product-modal-close" aria-label="Cerrar">&times;</button>
        <div class="product-modal-gallery">
          <img class="product-modal-img" src="" alt="" />
          <button class="gallery-prev" aria-label="Anterior">‹</button>
          <button class="gallery-next" aria-label="Siguiente">›</button>
          <div class="gallery-dots"></div>
        </div>
        <div class="product-modal-info">
          <span class="product-modal-badge"></span>
          <h2 class="product-modal-name"></h2>
          <p class="product-modal-type"></p>
          <p class="product-modal-desc"></p>
          <div class="product-modal-notes">
            <div class="note-item"><span class="note-label">Salida</span><span class="note-value" data-note="top"></span></div>
            <div class="note-item"><span class="note-label">Corazón</span><span class="note-value" data-note="heart"></span></div>
            <div class="note-item"><span class="note-label">Fondo</span><span class="note-value" data-note="base"></span></div>
          </div>
          <div class="product-modal-price"></div>
          <button class="btn-primary add-to-cart-btn product-modal-add" data-product-id="">Agregar al carrito</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    /* Events */
    modal.querySelector('.product-modal-overlay').addEventListener('click', close);
    modal.querySelector('.product-modal-close').addEventListener('click', close);
    modal.querySelector('.gallery-prev').addEventListener('click', () => navGallery(-1));
    modal.querySelector('.gallery-next').addEventListener('click', () => navGallery(1));
  };

  const navGallery = (dir) => {
    if (!currentProduct) return;
    const g = currentProduct.gallery;
    currentGalleryIdx = (currentGalleryIdx + dir + g.length) % g.length;
    const img = modal.querySelector('.product-modal-img');
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = g[currentGalleryIdx];
      img.style.opacity = '1';
    }, 200);
    updateDots();
  };

  const updateDots = () => {
    const dots = modal.querySelector('.gallery-dots');
    if (!currentProduct) return;
    dots.innerHTML = currentProduct.gallery
      .map((_, i) =>
        `<span class="gallery-dot${i === currentGalleryIdx ? ' active' : ''}"></span>`
      )
      .join('');
  };

  const open = (productId) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    currentProduct = product;
    currentGalleryIdx = 0;

    if (!modal) createModal();

    modal.querySelector('.product-modal-img').src = product.gallery[0];
    modal.querySelector('.product-modal-img').alt = product.name;
    modal.querySelector('.product-modal-name').textContent = product.name;
    modal.querySelector('.product-modal-type').textContent = `${product.type} · ${product.weight}`;
    modal.querySelector('.product-modal-desc').textContent = product.description;
    modal.querySelector('.product-modal-price').textContent = formatPrice(product.price);
    modal.querySelector('.product-modal-add').dataset.productId = product.id;

    const badge = modal.querySelector('.product-modal-badge');
    if (product.badge) {
      badge.textContent = product.badge;
      badge.style.display = '';
    } else {
      badge.style.display = 'none';
    }

    modal.querySelector('[data-note="top"]').textContent = product.notes.top;
    modal.querySelector('[data-note="heart"]').textContent = product.notes.heart;
    modal.querySelector('[data-note="base"]').textContent = product.notes.base;

    updateDots();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
    currentProduct = null;
  };

  const init = () => {
    /* Delegated click on product card (not on the add-to-cart button) */
    document.addEventListener('click', (e) => {
      if (e.target.closest('.add-to-cart-btn')) return;
      const card = e.target.closest('.product-card');
      if (!card) return;
      const id = parseInt(card.dataset.productId, 10);
      if (id) open(id);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  };

  return { init, open, close };
})();

/* ─────────────────────────────────────────────
   7. SHOPPING CART
   ───────────────────────────────────────────── */

const Cart = (() => {
  const STORAGE_KEY = 'kiut-cart';
  let items = [];
  let sidebar, overlay;

  /* —— Persistence —— */
  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const load = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) items = JSON.parse(raw);
    } catch { items = []; }
  };

  /* —— Core operations —— */
  const add = (productId) => {
    const existing = items.find((i) => i.productId === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      items.push({ productId, qty: 1 });
    }
    save();
    render();
    updateBadge();
    showFeedback(productId);
    openSidebar();
  };

  const remove = (productId) => {
    items = items.filter((i) => i.productId !== productId);
    save();
    render();
    updateBadge();
  };

  const updateQty = (productId, delta) => {
    const item = items.find((i) => i.productId === productId);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    save();
    render();
    updateBadge();
  };

  const getTotal = () =>
    items.reduce((sum, i) => {
      const p = PRODUCTS.find((pr) => pr.id === i.productId);
      return sum + (p ? p.price * i.qty : 0);
    }, 0);

  const getCount = () => items.reduce((s, i) => s + i.qty, 0);

  /* —— UI helpers —— */
  const updateBadge = () => {
    const badges = $$('.cart-count');
    const count = getCount();
    badges.forEach((b) => {
      b.textContent = count;
      b.style.display = count > 0 ? '' : 'none';
    });
  };

  const showFeedback = (productId) => {
    const btn = $(`.add-to-cart-btn[data-product-id="${productId}"]`);
    if (!btn) return;
    btn.classList.add('added');
    const origText = btn.textContent;
    btn.textContent = '✓ Agregado';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.textContent = origText;
    }, 1400);
  };

  const renderShippingBar = () => {
    const total = getTotal();
    const pct = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
    const remaining = FREE_SHIPPING_THRESHOLD - total;
    const bar = sidebar ? sidebar.querySelector('.shipping-fill') : null;
    const msg = sidebar ? sidebar.querySelector('.shipping-msg') : null;
    if (bar) bar.style.width = pct + '%';
    if (msg) {
      msg.textContent =
        remaining <= 0
          ? '¡Envío gratis desbloqueado! 🎉'
          : `Faltan ${formatPrice(remaining)} para envío gratis`;
    }
  };

  const render = () => {
    if (!sidebar) return;
    const container = sidebar.querySelector('.cart-items');
    const totalEl = sidebar.querySelector('.cart-total-value');
    const emptyMsg = sidebar.querySelector('.cart-empty');
    const footer = sidebar.querySelector('.cart-footer');

    if (items.length === 0) {
      container.innerHTML = '';
      if (emptyMsg) emptyMsg.style.display = '';
      if (footer) footer.style.display = 'none';
      renderShippingBar();
      return;
    }
    if (emptyMsg) emptyMsg.style.display = 'none';
    if (footer) footer.style.display = '';

    container.innerHTML = items
      .map((item) => {
        const p = PRODUCTS.find((pr) => pr.id === item.productId);
        if (!p) return '';
        return `
        <div class="cart-item" data-product-id="${p.id}">
          <img class="cart-item-img" src="${p.image}" alt="${p.name}" loading="lazy" />
          <div class="cart-item-info">
            <p class="cart-item-name">${p.name}</p>
            <p class="cart-item-type">${p.type} · ${p.weight}</p>
            <p class="cart-item-price">${formatPrice(p.price)}</p>
          </div>
          <div class="cart-item-qty">
            <button class="qty-btn qty-minus" data-id="${p.id}" aria-label="Menos">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn qty-plus" data-id="${p.id}" aria-label="Más">+</button>
          </div>
          <button class="cart-item-remove" data-id="${p.id}" aria-label="Eliminar">&times;</button>
        </div>`;
      })
      .join('');

    if (totalEl) totalEl.textContent = formatPrice(getTotal());
    renderShippingBar();
  };

  const openSidebar = () => {
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  };

  const closeSidebar = () => {
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('visible');
    document.body.style.overflow = '';
  };

  const init = () => {
    sidebar = $('.cart-sidebar');
    overlay = $('.cart-overlay');
    load();

    /* Build sidebar if not in DOM */
    if (!sidebar) {
      sidebar = document.createElement('aside');
      sidebar.className = 'cart-sidebar';
      sidebar.innerHTML = `
        <div class="cart-header">
          <h3>Tu carrito</h3>
          <button class="cart-close" aria-label="Cerrar carrito">&times;</button>
        </div>
        <div class="shipping-progress">
          <p class="shipping-msg"></p>
          <div class="shipping-bar"><div class="shipping-fill"></div></div>
        </div>
        <p class="cart-empty" style="text-align:center;padding:2rem;color:var(--text-muted, #888);">Tu carrito está vacío</p>
        <div class="cart-items"></div>
        <div class="cart-footer" style="display:none;">
          <div class="cart-total">
            <span>Total</span>
            <span class="cart-total-value"></span>
          </div>
          <button class="cart-checkout-btn btn-primary">Finalizar compra</button>
        </div>
      `;
      document.body.appendChild(sidebar);

      overlay = document.createElement('div');
      overlay.className = 'cart-overlay';
      document.body.appendChild(overlay);
    }

    render();
    updateBadge();

    /* Events — delegated */
    sidebar.addEventListener('click', (e) => {
      if (e.target.closest('.cart-close')) return closeSidebar();
      const minus = e.target.closest('.qty-minus');
      if (minus) return updateQty(parseInt(minus.dataset.id, 10), -1);
      const plus = e.target.closest('.qty-plus');
      if (plus) return updateQty(parseInt(plus.dataset.id, 10), 1);
      const rm = e.target.closest('.cart-item-remove');
      if (rm) return remove(parseInt(rm.dataset.id, 10));
      if (e.target.closest('.cart-checkout-btn')) {
        alert('Redirigiendo a MercadoPago… (demo)');
      }
    });

    if (overlay) overlay.addEventListener('click', closeSidebar);

    document.addEventListener('click', (e) => {
      if (e.target.closest('.cart-btn')) {
        e.preventDefault();
        openSidebar();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSidebar();
    });
  };

  return { init, add, remove, updateQty, getTotal, getCount };
})();

/* ─────────────────────────────────────────────
   8. SCENT QUIZ ENGINE
   ───────────────────────────────────────────── */

const ScentQuiz = (() => {
  const QUIZ_QUESTIONS = [
    {
      id: 0,
      question: '¿Para quién es este regalo de bienestar?',
      subtitle: 'Esto nos ayuda a personalizar tu experiencia',
      options: [
        { value: 'personal', label: 'Para mí', emoji: '🧘', weight: { floral: 1, amaderado: 0, fresco: 1, especiado: 0, oriental: 0 } },
        { value: 'pareja', label: 'Para mi pareja', emoji: '❤️', weight: { floral: 1, amaderado: 1, fresco: 0, especiado: 0, oriental: 1 } },
        { value: 'amiga', label: 'Un regalo', emoji: '🎁', weight: { floral: 2, amaderado: 0, fresco: 1, especiado: 0, oriental: 0 } },
        { value: 'empresa', label: 'Para mi empresa', emoji: '🏢', weight: { floral: 0, amaderado: 2, fresco: 0, especiado: 0, oriental: 1 }, isB2B: true }
      ]
    },
    {
      id: 1,
      question: '¿Qué momento del día mejor describe tu estilo de vida?',
      subtitle: 'Piensa en el ambiente que más te inspira',
      options: [
        { value: 'manana', label: 'Mañana fresca con café', emoji: '☕', weight: { floral: 0, amaderado: 0, fresco: 2, especiado: 1, oriental: 0 } },
        { value: 'tarde', label: 'Tarde soleada en terraza', emoji: '☀️', weight: { floral: 2, amaderado: 0, fresco: 1, especiado: 0, oriental: 0 } },
        { value: 'noche', label: 'Noche con vino y libro', emoji: '🍷', weight: { floral: 0, amaderado: 1, fresco: 0, especiado: 1, oriental: 2 } },
        { value: 'gym', label: 'Post-gym revitalizante', emoji: '💪', weight: { floral: 0, amaderado: 0, fresco: 2, especiado: 0, oriental: 0 } }
      ]
    },
    {
      id: 2,
      question: '¿Cómo es tu espacio ideal?',
      subtitle: 'El espacio influye en qué aromas te van mejor',
      options: [
        { value: 'minimalista', label: 'Minimalista y claro', emoji: '🏠', weight: { floral: 1, amaderado: 0, fresco: 2, especiado: 0, oriental: 0 } },
        { value: 'bohemio', label: 'Bohemio con plantas', emoji: '🌿', weight: { floral: 2, amaderado: 0, fresco: 1, especiado: 0, oriental: 1 } },
        { value: 'industrial', label: 'Industrial con madera', emoji: '🪵', weight: { floral: 0, amaderado: 2, fresco: 0, especiado: 1, oriental: 0 } },
        { value: 'ecletico', label: 'Ecléctico y colorido', emoji: '🎨', weight: { floral: 1, amaderado: 1, fresco: 0, especiado: 2, oriental: 1 } }
      ]
    },
    {
      id: 3,
      question: '¿Qué emoción querés despertar en tu hogar?',
      subtitle: 'Los aromas tienen el poder de transformar emociones',
      options: [
        { value: 'energia', label: 'Energía y vitalidad', emoji: '⚡', weight: { floral: 0, amaderado: 0, fresco: 2, especiado: 1, oriental: 0 } },
        { value: 'calma', label: 'Calma y serenidad', emoji: '🕊️', weight: { floral: 1, amaderado: 1, fresco: 1, especiado: 0, oriental: 1 } },
        { value: 'romantico', label: 'Romance y calidez', emoji: '🌹', weight: { floral: 2, amaderado: 1, fresco: 0, especiado: 0, oriental: 2 } },
        { value: 'inspiracion', label: 'Inspiración y focus', emoji: '🧠', weight: { floral: 0, amaderado: 0, fresco: 1, especiado: 2, oriental: 0 } }
      ]
    },
    {
      id: 4,
      question: '¿Cuál de estos mundos sensoriales te seduce más?',
      subtitle: 'Cada imagen evoca una familia aromática',
      options: [
        { value: 'jardin', label: 'Jardín en flor', emoji: '🌸', weight: { floral: 3, amaderado: 0, fresco: 1, especiado: 0, oriental: 0 } },
        { value: 'bosque', label: 'Bosque de cedro', emoji: '🌲', weight: { floral: 0, amaderado: 3, fresco: 0, especiado: 0, oriental: 1 } },
        { value: 'especiero', label: 'Mercado de especias', emoji: '🫚', weight: { floral: 0, amaderado: 1, fresco: 0, especiado: 3, oriental: 1 } },
        { value: 'ocean', label: 'Brisa marina', emoji: '🌊', weight: { floral: 0, amaderado: 0, fresco: 3, especiado: 0, oriental: 0 } }
      ]
    },
    {
      id: 5,
      question: '¿Con qué frecuencia usás velas o difusores?',
      subtitle: 'Para recomendarte el tamaño ideal',
      options: [
        { value: 'diario', label: 'Todos los días', emoji: '🔥', weight: { floral: 1, amaderado: 1, fresco: 1, especiado: 1, oriental: 1 } },
        { value: 'finde', label: 'Fines de semana', emoji: '📅', weight: { floral: 1, amaderado: 1, fresco: 0, especiado: 0, oriental: 1 } },
        { value: 'ocasion', label: 'En ocasiones especiales', emoji: '✨', weight: { floral: 1, amaderado: 1, fresco: 0, especiado: 1, oriental: 1 } },
        { value: 'primera', label: 'Soy nuevo/a en esto', emoji: '🌱', weight: { floral: 1, amaderado: 0, fresco: 1, especiado: 0, oriental: 0 } }
      ]
    },
    {
      id: 6,
      question: '¿Qué escritor/a o artista argentino/a te resuena más?',
      subtitle: 'El arte y el aroma comparten lenguaje emocional',
      options: [
        { value: 'borges', label: 'Borges (intelectual, misterioso)', emoji: '📚', weight: { floral: 0, amaderado: 2, fresco: 0, especiado: 1, oriental: 2 } },
        { value: 'cortazar', label: 'Cortázar (lúdico, sorpresivo)', emoji: '🎲', weight: { floral: 1, amaderado: 0, fresco: 1, especiado: 2, oriental: 1 } },
        { value: 'storni', label: 'Alfonsina Storni (sensible, poético)', emoji: '🌊', weight: { floral: 2, amaderado: 0, fresco: 2, especiado: 0, oriental: 1 } },
        { value: 'ava', label: 'Ava Gardner (glamour, sofisticación)', emoji: '💎', weight: { floral: 2, amaderado: 1, fresco: 0, especiado: 0, oriental: 3 } }
      ]
    },
    {
      id: 7,
      question: '¿Qué diseño de interior define mejor tu estética?',
      subtitle: 'Los ambientes y los aromas se potencian mutuamente',
      options: [
        { value: 'escandinavo', label: 'Escandinavo (madera clara, lino)', emoji: '🪵', weight: { floral: 1, amaderado: 1, fresco: 2, especiado: 0, oriental: 0 } },
        { value: 'japones', label: 'Japandi (zen, minimalismo)', emoji: '⛩️', weight: { floral: 0, amaderado: 2, fresco: 1, especiado: 0, oriental: 2 } },
        { value: 'mediterraneo', label: 'Mediterráneo (color, texturas)', emoji: '🏛️', weight: { floral: 2, amaderado: 0, fresco: 1, especiado: 1, oriental: 0 } },
        { value: 'art-deco', label: 'Art Déco (glamour, dorados)', emoji: '✨', weight: { floral: 1, amaderado: 1, fresco: 0, especiado: 2, oriental: 2 } }
      ]
    }
  ];

  const FAMILY_META = {
    floral: {
      name: 'Floral',
      icon: '🌸',
      color: '#E8739A',
      description: 'Tu esencia es luminosa y romántica. Te atraen los aromas que evocan jardines en flor y momentos de belleza natural.',
      productIds: [1, 6]
    },
    amaderado: {
      name: 'Amaderado',
      icon: '🪵',
      color: '#8B5E3C',
      description: 'Tu alma busca profundidad y calidez. Los aromas de madera, resina y tierra te conectan con lo esencial.',
      productIds: [3, 4]
    },
    especiado: {
      name: 'Especiado',
      icon: '🌶️',
      color: '#C4A265',
      description: 'Intensidad define tu carácter olfativo. Las especias y notas oscuras crean la atmósfera que tu espíritu necesita.',
      productIds: [5, 7]
    },
    fresco: {
      name: 'Fresco',
      icon: '🍋',
      color: '#A8B545',
      description: 'Frescura y vitalidad son tu firma. Los aromas limpios y verdes llenan tu espacio de energía positiva.',
      productIds: [6, 1]
    },
    oriental: {
      name: 'Oriental',
      icon: '🌙',
      color: '#2D5A3D',
      description: 'La sofisticación es tu santuario. Aromas enigmáticos y profundos te devuelven el equilibrio.',
      productIds: [3, 7]
    }
  };

  let currentStep = 0;
  let answers = [];
  let container;

  const calcScores = () => {
    const scores = { floral: 0, amaderado: 0, especiado: 0, fresco: 0, oriental: 0 };
    answers.forEach((ans) => {
      if (!ans) return;
      Object.entries(ans.weight).forEach(([k, v]) => {
        scores[k] = (scores[k] || 0) + v;
      });
    });
    return scores;
  };

  const getDominant = (scores) => {
    let max = 0, dominant = 'floral';
    Object.entries(scores).forEach(([k, v]) => {
      if (v > max) { max = v; dominant = k; }
    });
    return dominant;
  };

  const renderStep = () => {
    if (!container) return;
    const step = QUIZ_QUESTIONS[currentStep];
    const progress = ((currentStep) / QUIZ_QUESTIONS.length) * 100;
    const stepsHtml = container.querySelector('.quiz-steps');
    const progFill = container.querySelector('.quiz-progress-fill');

    if (progFill) progFill.style.width = progress + '%';

    if (!stepsHtml) return;
    stepsHtml.innerHTML = `
      <div class="quiz-step active">
        <p class="quiz-step-number">Paso ${currentStep + 1} de ${QUIZ_QUESTIONS.length}</p>
        <h3 class="quiz-question">${step.question}</h3>
        ${step.subtitle ? \`<p class="quiz-step-subtitle" style="text-align:center;color:var(--text-muted);font-size:0.9rem;margin-bottom:1.5rem;">\${step.subtitle}</p>\` : ''}
        <div class="quiz-options">
          ${step.options.map((opt, i) => `
            <button class="quiz-option${answers[currentStep] === opt ? ' selected' : ''}"
                    data-option="${i}">
              <span class="option-icon" style="font-size:1.4rem;">${opt.emoji}</span>
              <span>${opt.label}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    /* Nav buttons */
    const nav = container.querySelector('.quiz-nav');
    if (nav) {
      nav.innerHTML = `
        ${currentStep > 0 ? '<button class="quiz-btn-prev btn-outline">← Anterior</button>' : '<span></span>'}
        <span></span>
      `;
    }
  };

  const showResult = () => {
    const scores = calcScores();
    const dominant = getDominant(scores);
    const family = FAMILY_META[dominant];
    const products = family.productIds.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

    const stepsContainer = container.querySelector('.quiz-steps');
    const nav = container.querySelector('.quiz-nav');
    const progFill = container.querySelector('.quiz-progress-fill');

    if (progFill) progFill.style.width = '100%';
    if (nav) nav.innerHTML = '';

    const isB2BUser = answers[0] && answers[0].value === 'empresa';

    if (isB2BUser) {
      stepsContainer.innerHTML = `
        <div class="quiz-result" style="animation: fadeInUp .6s ease forwards;">
          <div class="scent-profile-card glass" style="border-top: 3px solid var(--color-gold);">
            <span class="scent-family-icon" style="font-size:3rem;">🏢</span>
            <h3 class="scent-family-name" style="color:var(--color-gold);" id="profileFamily">Pack Corporativo KIUT</h3>
            <p class="scent-family-desc" id="profileDesc">Para proyectos corporativos, recomendamos nuestros Kits Empresariales: fragancias amaderadas y orientales que comunican sofisticación y bienestar. Packaging personalizado con tu logo.</p>
            <div style="margin-top:2rem;">
              <a href="mailto:b2b@kiutaromas.com" class="btn-primary" style="display:inline-block;margin-bottom:1rem;">Solicitar Cotización B2B</a>
            </div>
          </div>
          <div style="margin-top:1.5rem;display:flex;gap:1rem;justify-content:center;">
            <button class="btn-outline quiz-restart">Reiniciar Quiz</button>
          </div>
        </div>
      `;
    } else {
      stepsContainer.innerHTML = `
        <div class="quiz-result" style="animation: fadeInUp .6s ease forwards;">
          <div class="scent-profile-card glass" style="border-top: 3px solid ${family.color};">
            <span class="scent-family-icon" style="font-size:3rem;">${family.icon}</span>
            <h3 class="scent-family-name" style="color:${family.color};">Tu ADN Olfativo: ${family.name}</h3>
            <p class="scent-family-desc">${family.description}</p>
            <div class="scent-wheel-container">${buildScentWheel(scores)}</div>
          </div>
          <h4 style="margin-top:2rem;">Tus productos recomendados</h4>
          <div class="quiz-recommended-products" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.2rem;margin-top:1rem;">
            ${products.map((p) => `
              <div class="quiz-rec-card glass" style="padding:1rem;border-radius:12px;text-align:center;">
                <img src="${p.image}" alt="${p.name}" style="width:100%;border-radius:8px;aspect-ratio:1/1;object-fit:cover;" loading="lazy" />
                <h5 style="margin-top:.8rem;">${p.name}</h5>
                <p style="font-size:.85rem;color:var(--text-muted,#888);">${p.type}</p>
                <p style="font-weight:700;margin:.5rem 0;">${formatPrice(p.price)}</p>
                <button class="btn-primary add-to-cart-btn" data-product-id="${p.id}" style="width:100%;padding:.6rem;">Agregar al carrito</button>
              </div>
            `).join('')}
          </div>
          <div style="margin-top:1.5rem;display:flex;gap:1rem;justify-content:center;">
            <button class="btn-outline quiz-restart">Reiniciar Quiz</button>
            <button class="btn-secondary quiz-share">Compartir resultado</button>
          </div>
        </div>
      `;
    }

    /* Re-attach restart */
    const restartBtn = stepsContainer.querySelector('.quiz-restart');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        currentStep = 0;
        answers = [];
        renderStep();
      });
    }

    const shareBtn = stepsContainer.querySelector('.quiz-share');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        const text = \`¡Descubrí mi ADN Olfativo en KIUT AROMAS! Soy \${family.name} \${family.icon}. Descubrí el tuyo →\`;
        if (navigator.share) {
          navigator.share({ title: 'KIUT AROMAS — Mi ADN Olfativo', text, url: location.href });
        } else {
          navigator.clipboard.writeText(text + ' ' + location.href).then(() => {
            shareBtn.textContent = '✓ Copiado';
            setTimeout(() => { shareBtn.textContent = 'Compartir resultado'; }, 2000);
          });
        }
      });
    }
  };

  const selectOption = (idx) => {
    answers[currentStep] = QUIZ_QUESTIONS[currentStep].options[idx];
    /* Highlight */
    $$('.quiz-option', container).forEach((o, i) =>
      o.classList.toggle('selected', i === idx)
    );
    /* Auto-advance */
    setTimeout(() => {
      if (currentStep < QUIZ_QUESTIONS.length - 1) {
        currentStep++;
        renderStep();
      } else {
        showResult();
      }
    }, 600);
  };

  const init = () => {
    container = $('.quiz-container');
    if (!container) return;

    /* Ensure required inner structure */
    if (!container.querySelector('.quiz-progress')) {
      container.insertAdjacentHTML('afterbegin', `
        <div class="quiz-progress"><div class="quiz-progress-fill"></div></div>
        <div class="quiz-steps"></div>
        <div class="quiz-nav"></div>
      `);
    }

    renderStep();

    container.addEventListener('click', (e) => {
      const opt = e.target.closest('.quiz-option');
      if (opt) {
        selectOption(parseInt(opt.dataset.option, 10));
        return;
      }
      if (e.target.closest('.quiz-btn-prev')) {
        if (currentStep > 0) { currentStep--; renderStep(); }
      }
    });
  };

  return { init };
})();

/* ─────────────────────────────────────────────
   8a. SCENT WHEEL — SVG RADAR CHART
   ───────────────────────────────────────────── */

function buildScentWheel(scores) {
  const families = ['floral', 'amaderado', 'especiado', 'fresco', 'oriental'];
  const labels = ['Floral', 'Amaderado', 'Especiado', 'Fresco', 'Oriental'];
  const colors = ['#E8739A', '#8B5E3C', '#C4A265', '#A8B545', '#2D5A3D'];
  const maxVal = Math.max(...Object.values(scores), 1);
  const cx = 150, cy = 150, R = 110;
  const angleStep = (Math.PI * 2) / 5;
  const offset = -Math.PI / 2;

  const pointAt = (i, r) => {
    const a = offset + i * angleStep;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };

  /* Grid rings */
  let gridLines = '';
  for (let ring = 1; ring <= 4; ring++) {
    const r = (R / 4) * ring;
    const pts = families.map((_, i) => pointAt(i, r).join(',')).join(' ');
    gridLines += `<polygon points="${pts}" fill="none" stroke="var(--scent-grid, rgba(196,162,101,0.15))" stroke-width="1"/>`;
  }

  /* Axes */
  let axes = '';
  families.forEach((_, i) => {
    const [x, y] = pointAt(i, R);
    axes += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="var(--scent-grid, rgba(196,162,101,0.15))" stroke-width="1"/>`;
  });

  /* Labels */
  let lbls = '';
  families.forEach((_, i) => {
    const [x, y] = pointAt(i, R + 18);
    lbls += `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle"
             fill="${colors[i]}" font-size="11" font-weight="600">${labels[i]}</text>`;
  });

  /* Data polygon */
  const dataPts = families.map((f, i) => {
    const val = (scores[f] || 0) / maxVal;
    return pointAt(i, val * R).join(',');
  }).join(' ');

  /* Dots */
  let dots = '';
  families.forEach((f, i) => {
    const val = (scores[f] || 0) / maxVal;
    const [x, y] = pointAt(i, val * R);
    dots += `<circle cx="${x}" cy="${y}" r="4" fill="${colors[i]}" stroke="#fff" stroke-width="1.5">
      <animate attributeName="r" from="0" to="4" dur="0.6s" fill="freeze" begin="${i * 0.1}s"/>
    </circle>`;
  });

  return `
    <svg viewBox="0 0 300 300" width="280" height="280" style="display:block;margin:1rem auto;" role="img" aria-label="Perfil olfativo">
      ${gridLines}${axes}
      <polygon points="${dataPts}" fill="rgba(196,162,101,0.18)" stroke="#C4A265" stroke-width="2" stroke-linejoin="round">
        <animate attributeName="opacity" from="0" to="1" dur="0.8s" fill="freeze"/>
      </polygon>
      ${dots}${lbls}
    </svg>`;
}

/* ─────────────────────────────────────────────
   9. SCROLL REVEAL
   ───────────────────────────────────────────── */

const ScrollReveal = (() => {
  const init = () => {
    const reveals = $$('.reveal');
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      /* Show everything immediately */
      reveals.forEach((el) => el.classList.add('visible'));
      return;
    }
    try {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              /* Stagger children */
              const children = $$('[data-reveal-child]', entry.target);
              children.forEach((child, i) => {
                child.style.transitionDelay = `${i * 100}ms`;
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
      );
      reveals.forEach((el) => observer.observe(el));
    } catch (err) {
      console.warn("IntersectionObserver failed, revealing elements as fallback:", err);
      reveals.forEach((el) => el.classList.add('visible'));
    }
  };
  return { init };
})();

/* ─────────────────────────────────────────────
   10. PARALLAX EFFECTS
   ───────────────────────────────────────────── */

const Parallax = (() => {
  let elements = [];
  let ticking = false;

  const update = () => {
    const scrollY = window.scrollY;
    elements.forEach(({ el, speed, offset }) => {
      const y = (scrollY - offset) * speed;
      el.style.transform = `translate3d(0, ${y}px, 0)`;
    });
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };

  const init = () => {
    if (prefersReducedMotion() || isTouchDevice()) return;
    elements = $$('.hero-float-img, [data-parallax]').map((el) => ({
      el,
      speed: parseFloat(el.dataset.parallaxSpeed || '0.15'),
      offset: el.offsetTop
    }));
    if (elements.length) window.addEventListener('scroll', onScroll, { passive: true });
  };

  return { init };
})();

/* ─────────────────────────────────────────────
   11. LAZY LOADING IMAGES
   ───────────────────────────────────────────── */

const LazyImages = (() => {
  const init = () => {
    const imgs = $$('img[data-src]');
    if (!imgs.length) return;

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
            obs.unobserve(img);
          });
        },
        { rootMargin: '200px' }
      );
      imgs.forEach((img) => obs.observe(img));
    } else {
      /* Fallback */
      imgs.forEach((img) => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  };
  return { init };
})();

/* ─────────────────────────────────────────────
   12. REFILL SAVINGS CALCULATOR
   ───────────────────────────────────────────── */

const RefillCalc = (() => {
  let slider;

  const animateValue = (el, start, end, duration = 800) => {
    if (prefersReducedMotion()) { el.textContent = formatPrice(end); return; }
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(lerp(start, end, eased));
      el.textContent = formatPrice(current);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const animateRawValue = (el, start, end, suffix = '', duration = 800) => {
    if (prefersReducedMotion()) { el.textContent = end + suffix; return; }
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(lerp(start, end, eased));
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const calculate = (candles) => {
    const months = 12;
    const withoutRefill = candles * AVG_PRICE * months;
    const withRefill = candles * REFILL_PRICE * months + candles * AVG_PRICE;
    const savings = withoutRefill - withRefill;
    const jarsReused = candles * months;
    const co2Saved = Math.round(jarsReused * 0.35 * 10) / 10; // ~0.35 kg per jar
    const treesEquivalent = Math.round(jarsReused * 0.02 * 10) / 10; // trees saved equivalent

    return { withoutRefill, withRefill, savings, jarsReused, co2Saved, treesEquivalent };
  };

  const render = (candles) => {
    const r = calculate(candles);

    const qty = $('#savingsValue');
    const without = $('#savingsWithout');
    const withR = $('#savingsWith');
    const saved = $('#savingsSaved');
    const jars = $('#envBottles');
    const co2 = $('#envCO2');
    const trees = $('#envTrees');

    if (qty) qty.textContent = candles;

    if (without) animateValue(without, 0, r.withoutRefill);
    if (withR) animateValue(withR, 0, r.withRefill);
    if (saved) animateValue(saved, 0, r.savings);
    
    if (jars) animateRawValue(jars, 0, r.jarsReused);
    if (co2) animateRawValue(co2, 0, r.co2Saved, ' kg');
    if (trees) animateRawValue(trees, 0, r.treesEquivalent);
  };

  const init = () => {
    slider = $('.savings-input');
    if (!slider) return;
    slider.addEventListener('input', () => render(parseInt(slider.value, 10)));
    render(parseInt(slider.value, 10) || 2);
  };

  return { init };
})();

/* ─────────────────────────────────────────────
   13. NEWSLETTER FORM
   ───────────────────────────────────────────── */

const Newsletter = (() => {
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const init = () => {
    const form = $('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      const btn = form.querySelector('.newsletter-btn');
      const email = input ? input.value.trim() : '';

      if (!isValidEmail(email)) {
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
        setTimeout(() => input.classList.remove('error'), 1500);
        return;
      }

      /* Demo: store in localStorage */
      const subs = JSON.parse(localStorage.getItem('kiut-newsletter') || '[]');
      if (!subs.includes(email)) subs.push(email);
      localStorage.setItem('kiut-newsletter', JSON.stringify(subs));

      /* Button animation */
      btn.disabled = true;
      btn.dataset.origText = btn.textContent;
      btn.textContent = '✓';
      btn.classList.add('success');
      input.value = '';

      setTimeout(() => {
        btn.textContent = btn.dataset.origText;
        btn.classList.remove('success');
        btn.disabled = false;
      }, 3000);
    });
  };

  return { init };
})();

/* ─────────────────────────────────────────────
   14. CONTACT FORM
   ───────────────────────────────────────────── */

const ContactForm = (() => {
  const validate = (form) => {
    let valid = true;
    const required = $$('[required]', form);
    required.forEach((field) => {
      const val = field.value.trim();
      const isEmail = field.type === 'email';
      const empty = val === '';
      const badEmail = isEmail && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      const invalid = empty || badEmail;
      field.classList.toggle('error', invalid);
      field.setAttribute('aria-invalid', invalid);
      if (invalid) valid = false;
    });
    return valid;
  };

  const init = () => {
    const form = $('.contact-form');
    if (!form) return;

    /* B2B toggle */
    const b2bToggle = $('.contact-b2b-toggle, .b2b-toggle');
    const b2bSection = $('.contact-b2b');
    if (b2bToggle && b2bSection) {
      b2bToggle.addEventListener('click', () => {
        const open = b2bSection.classList.toggle('open');
        b2bToggle.setAttribute('aria-expanded', open);
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate(form)) return;

      const btn = form.querySelector('.form-submit');
      btn.disabled = true;
      btn.classList.add('loading');
      const origText = btn.textContent;
      btn.textContent = 'Enviando…';

      /* Simulate send */
      setTimeout(() => {
        btn.classList.remove('loading');
        btn.classList.add('success');
        btn.textContent = '✓ Enviado';

        /* Store demo */
        const data = {};
        $$('input, textarea, select', form).forEach((f) => {
          if (f.name) data[f.name] = f.value;
        });
        const msgs = JSON.parse(localStorage.getItem('kiut-messages') || '[]');
        msgs.push({ ...data, date: new Date().toISOString() });
        localStorage.setItem('kiut-messages', JSON.stringify(msgs));

        form.reset();

        setTimeout(() => {
          btn.disabled = false;
          btn.classList.remove('success');
          btn.textContent = origText;
        }, 3000);
      }, 1500);
    });

    /* Real-time field validation */
    form.addEventListener('blur', (e) => {
      const field = e.target;
      if (!field.hasAttribute('required')) return;
      const val = field.value.trim();
      const badEmail = field.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      const invalid = val === '' || badEmail;
      field.classList.toggle('error', invalid);
      field.setAttribute('aria-invalid', invalid);
    }, true);
  };

  return { init };
})();

/* ─────────────────────────────────────────────
   15. SMOOTH SCROLLING (General)
   ───────────────────────────────────────────── */

const SmoothScroll = (() => {
  const init = () => {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      if (hash === '#') return;
      const target = $(hash);
      if (!target) return;
      e.preventDefault();
      const navH = $('.navbar')?.offsetHeight || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  };
  return { init };
})();

/* ─────────────────────────────────────────────
   16. COUNTER ANIMATION (for stats sections)
   ───────────────────────────────────────────── */

const CounterAnimation = (() => {
  const init = () => {
    const counters = $$('[data-count]');
    if (!counters.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const end = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.countSuffix || '';
          const duration = 1500;
          const start = performance.now();

          const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * end) + suffix;
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => obs.observe(c));
  };
  return { init };
})();

/* ─────────────────────────────────────────────
   17. BACK TO TOP BUTTON
   ───────────────────────────────────────────── */

const BackToTop = (() => {
  let btn;

  const init = () => {
    btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Volver arriba');
    btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`;
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  return { init };
})();

/* ─────────────────────────────────────────────
   18. KEYBOARD ACCESSIBILITY
   ───────────────────────────────────────────── */

const A11y = (() => {
  const init = () => {
    /* Show focus outlines only for keyboard users */
    document.body.addEventListener('mousedown', () => {
      document.body.classList.add('using-mouse');
    });
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') document.body.classList.remove('using-mouse');
    });

    /* Skip to content */
    const skip = document.createElement('a');
    skip.href = '#products';
    skip.className = 'skip-link';
    skip.textContent = 'Ir al contenido principal';
    document.body.prepend(skip);
  };
  return { init };
})();

/* ─────────────────────────────────────────────
   19. WHATSAPP FLOAT BUTTON (optional UX)
   ───────────────────────────────────────────── */

const WhatsAppButton = (() => {
  const init = () => {
    const existing = $('.whatsapp-float');
    if (existing) {
      existing.addEventListener('click', () => {
        window.open(
          'https://wa.me/5491100000000?text=Hola%20KIUT%20AROMAS!%20Quiero%20consultar…',
          '_blank'
        );
      });
    }
  };
  return { init };
})();

/* ─────────────────────────────────────────────
   20. PRODUCT QUICK VIEW CAROUSEL (on cards)
   ───────────────────────────────────────────── */

const ProductGalleryDots = (() => {
  const init = () => {
    /* Add gallery dots to product cards that have multiple images */
    $$('.product-card').forEach((card) => {
      const id = parseInt(card.dataset.productId, 10);
      const product = PRODUCTS.find((p) => p.id === id);
      if (!product || product.gallery.length < 2) return;

      const img = card.querySelector('.product-card-img');
      if (!img) return;

      let idx = 0;

      card.addEventListener('mouseenter', () => {
        if (isTouchDevice()) return;
        idx = 1;
        img.style.opacity = '0.7';
        setTimeout(() => {
          img.src = product.gallery[idx];
          img.style.opacity = '1';
        }, 150);
      });

      card.addEventListener('mouseleave', () => {
        idx = 0;
        img.style.opacity = '0.7';
        setTimeout(() => {
          img.src = product.gallery[idx];
          img.style.opacity = '1';
        }, 150);
      });
    });
  };
  return { init };
})();

/* ─────────────────────────────────────────────
   21. PERFORMANCE: RESOURCE HINTS
   ───────────────────────────────────────────── */

const PerfHints = (() => {
  const init = () => {
    /* Preconnect to Google Fonts */
    const preconnects = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'];
    preconnects.forEach((url) => {
      if (!$(`link[href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        link.crossOrigin = '';
        document.head.appendChild(link);
      }
    });
  };
  return { init };
})();

/* ─────────────────────────────────────────────
   22. LOADING SCREEN
   ───────────────────────────────────────────── */

const LoadingScreen = (() => {
  const init = () => {
    const loader = $('.loading-screen');
    if (!loader) return;

    const hide = () => {
      loader.classList.add('loaded');
      setTimeout(() => { loader.style.display = 'none'; }, 600);
    };

    if (document.readyState === 'complete') {
      setTimeout(hide, 300);
    } else {
      window.addEventListener('load', () => setTimeout(hide, 300));
    }
  };
  return { init };
})();

/* ─────────────────────────────────────────────
   23. EDITORIAL SECTION — ARTICLE HOVER
   ───────────────────────────────────────────── */

const Editorial = (() => {
  const init = () => {
    const grid = document.getElementById('editorialGrid');
    const filterBtns = document.querySelectorAll('.journal-filter-btn');
    if (!grid) return;

    const renderGrid = (filter = 'all') => {
      grid.innerHTML = '';
      Object.entries(ARTICLES).forEach(([id, art]) => {
        if (filter !== 'all' && art.tag !== filter) return;
        
        const card = document.createElement('article');
        card.className = 'article-card';
        card.innerHTML = `
          <div class="article-card-img" style="background-image: url('${art.image}')"></div>
          <div class="article-card-content">
            <span class="article-card-tag">${art.tag}</span>
            <h3 class="article-card-title">${art.title}</h3>
            <button class="btn-outline" onclick="openArticle('${id}')">Leer artículo</button>
          </div>
        `;
        
        if (!isTouchDevice()) {
          card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-6px)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
          });
          card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
          });
        }
        
        grid.appendChild(card);
      });
    };

    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderGrid(e.target.dataset.filter);
      });
    });

    // Initial render
    renderGrid('all');
  };
  return { init };
})();

/* ─────────────────────────────────────────────
   24. ABOUT SECTION — VALUE CARDS ANIMATION
   ───────────────────────────────────────────── */

const AboutValues = (() => {
  const init = () => {
    const cards = $$('.value-card');
    if (!cards.length) return;
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 120}ms`;
    });
  };
  return { init };
})();

/* ─────────────────────────────────────────────
   25. CSS INJECTION FOR JS-DEPENDENT STYLES
   ───────────────────────────────────────────── */

const InjectStyles = (() => {
  const init = () => {
    const style = document.createElement('style');
    style.textContent = `
      /* Back to top */
      .back-to-top {
        position: fixed; bottom: 2rem; right: 2rem; z-index: 900;
        width: 44px; height: 44px; border-radius: 50%;
        background: var(--color-gold, #C4A265); color: #fff;
        border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
        box-shadow: 0 4px 16px rgba(196,162,101,0.35);
        opacity: 0; transform: translateY(20px); pointer-events: none;
        transition: opacity .3s ease, transform .3s ease;
      }
      .back-to-top.visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
      .back-to-top:hover { transform: translateY(-3px); box-shadow: 0 6px 24px rgba(196,162,101,0.5); }

      /* Skip link */
      .skip-link {
        position: fixed; top: -100px; left: 1rem; z-index: 10000;
        background: var(--color-gold, #C4A265); color: #fff;
        padding: .6rem 1.2rem; border-radius: 0 0 8px 8px;
        font-weight: 600; transition: top .3s ease; text-decoration: none;
      }
      .skip-link:focus { top: 0; }

      /* Focus outlines for keyboard users */
      body.using-mouse *:focus { outline: none !important; }

      /* Product modal */
      .product-modal { position: fixed; inset: 0; z-index: 9000; display: flex;
        align-items: center; justify-content: center;
        opacity: 0; pointer-events: none; transition: opacity .35s ease; }
      .product-modal.open { opacity: 1; pointer-events: auto; }
      .product-modal-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.6);
        backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
      .product-modal-content { position: relative; z-index: 1; display: grid;
        grid-template-columns: 1fr 1fr; gap: 2rem; max-width: 900px; width: 92vw;
        max-height: 90vh; overflow-y: auto; padding: 2rem; border-radius: 16px;
        background: var(--glass-bg, rgba(245,240,235,0.92));
        backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
        transform: scale(0.95) translateY(20px);
        transition: transform .35s ease; }
      .product-modal.open .product-modal-content { transform: scale(1) translateY(0); }
      .product-modal-close { position: absolute; top: 1rem; right: 1rem;
        background: none; border: none; font-size: 1.8rem; cursor: pointer;
        color: var(--text-primary, #1A1A1A); width: 36px; height: 36px;
        display: flex; align-items: center; justify-content: center; border-radius: 50%;
        transition: background .2s ease; }
      .product-modal-close:hover { background: rgba(0,0,0,0.06); }
      .product-modal-gallery { position: relative; border-radius: 12px; overflow: hidden; }
      .product-modal-img { width: 100%; aspect-ratio: 1/1; object-fit: cover;
        transition: opacity .3s ease; }
      .gallery-prev, .gallery-next { position: absolute; top: 50%; transform: translateY(-50%);
        background: rgba(255,255,255,0.8); border: none; font-size: 1.5rem;
        width: 36px; height: 36px; border-radius: 50%; cursor: pointer;
        backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
        transition: background .2s ease; }
      .gallery-prev { left: .75rem; }
      .gallery-next { right: .75rem; }
      .gallery-prev:hover, .gallery-next:hover { background: rgba(255,255,255,0.95); }
      .gallery-dots { position: absolute; bottom: .75rem; left: 50%; transform: translateX(-50%);
        display: flex; gap: 6px; }
      .gallery-dot { width: 8px; height: 8px; border-radius: 50%;
        background: rgba(255,255,255,0.5); transition: background .2s ease; }
      .gallery-dot.active { background: #fff; }
      .product-modal-badge { display: inline-block; padding: .25rem .75rem; border-radius: 20px;
        background: var(--color-gold, #C4A265); color: #fff; font-size: .75rem;
        font-weight: 600; text-transform: uppercase; letter-spacing: .05em; margin-bottom: .75rem; }
      .product-modal-name { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; margin: 0; }
      .product-modal-type { color: var(--text-muted, #888); margin: .25rem 0 1rem; }
      .product-modal-desc { line-height: 1.6; margin-bottom: 1.2rem; }
      .product-modal-notes { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
      .note-item { flex: 1; text-align: center; padding: .75rem; border-radius: 10px;
        background: var(--note-bg, rgba(196,162,101,0.08)); }
      .note-label { display: block; font-size: .7rem; text-transform: uppercase;
        letter-spacing: .08em; color: var(--text-muted, #888); margin-bottom: .3rem; }
      .note-value { font-weight: 600; font-size: .9rem; }
      .product-modal-price { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem;
        font-weight: 700; color: var(--color-gold, #C4A265); margin-bottom: 1rem; }
      .product-modal-add { width: 100%; }

      /* Cart sidebar */
      .cart-sidebar { position: fixed; top: 0; right: 0; z-index: 9500;
        width: 420px; max-width: 100vw; height: 100vh; display: flex; flex-direction: column;
        background: var(--glass-bg, rgba(245,240,235,0.97));
        backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
        box-shadow: -4px 0 30px rgba(0,0,0,0.12);
        transform: translateX(100%); transition: transform .4s cubic-bezier(0.4,0,0.2,1); }
      .cart-sidebar.open { transform: translateX(0); }
      .cart-overlay { position: fixed; inset: 0; z-index: 9400; background: rgba(0,0,0,0.45);
        backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
        opacity: 0; pointer-events: none; transition: opacity .35s ease; }
      .cart-overlay.visible { opacity: 1; pointer-events: auto; }
      .cart-header { display: flex; align-items: center; justify-content: space-between;
        padding: 1.5rem; border-bottom: 1px solid rgba(196,162,101,0.15); }
      .cart-header h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; margin: 0; }
      .cart-close { background: none; border: none; font-size: 1.6rem; cursor: pointer;
        color: var(--text-primary, #1A1A1A); padding: .5rem; }
      .shipping-progress { padding: 1rem 1.5rem; }
      .shipping-msg { font-size: .85rem; margin-bottom: .5rem; text-align: center; }
      .shipping-bar { height: 4px; border-radius: 2px; background: rgba(196,162,101,0.15);
        overflow: hidden; }
      .shipping-fill { height: 100%; background: linear-gradient(90deg, #C4A265, #E8739A);
        border-radius: 2px; transition: width .6s ease; }
      .cart-items { flex: 1; overflow-y: auto; padding: 1rem 1.5rem; }
      .cart-item { display: grid; grid-template-columns: 60px 1fr auto auto;
        gap: .75rem; align-items: center; padding: 1rem 0;
        border-bottom: 1px solid rgba(196,162,101,0.08); }
      .cart-item-img { width: 60px; height: 60px; object-fit: cover; border-radius: 8px; }
      .cart-item-name { font-weight: 600; font-size: .9rem; margin: 0; }
      .cart-item-type { font-size: .75rem; color: var(--text-muted, #888); margin: .15rem 0 0; }
      .cart-item-price { font-size: .85rem; font-weight: 600; color: var(--color-gold, #C4A265); margin: .3rem 0 0; }
      .cart-item-qty { display: flex; align-items: center; gap: .5rem; }
      .qty-btn { width: 28px; height: 28px; border-radius: 50%; border: 1px solid rgba(196,162,101,0.3);
        background: transparent; cursor: pointer; font-size: 1rem; display: flex;
        align-items: center; justify-content: center;
        transition: background .2s ease, border-color .2s ease; }
      .qty-btn:hover { background: rgba(196,162,101,0.1); border-color: var(--color-gold, #C4A265); }
      .qty-value { font-weight: 600; min-width: 20px; text-align: center; }
      .cart-item-remove { background: none; border: none; font-size: 1.2rem; cursor: pointer;
        color: var(--text-muted, #888); padding: .25rem; transition: color .2s ease; }
      .cart-item-remove:hover { color: #e74c3c; }
      .cart-footer { padding: 1.5rem; border-top: 1px solid rgba(196,162,101,0.15); }
      .cart-total { display: flex; justify-content: space-between; align-items: center;
        margin-bottom: 1rem; }
      .cart-total span:first-child { font-size: 1rem; font-weight: 600; }
      .cart-total-value { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem;
        font-weight: 700; color: var(--color-gold, #C4A265); }
      .cart-checkout-btn { width: 100%; padding: 1rem; font-size: 1rem; }

      /* Quiz option selected */
      .quiz-option.selected {
        border-color: var(--color-gold, #C4A265) !important;
        box-shadow: 0 0 0 2px rgba(196,162,101,0.3), 0 4px 16px rgba(196,162,101,0.15) !important;
        background: rgba(196,162,101,0.06) !important;
      }

      /* Added to cart feedback */
      .add-to-cart-btn.added {
        background: #2D5A3D !important; pointer-events: none;
      }

      /* Fade in animation */
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(24px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* Newsletter success */
      .newsletter-btn.success {
        background: #2D5A3D !important; min-width: 48px;
      }

      /* Form errors */
      .form-input.error, .form-textarea.error, .newsletter-input.error {
        border-color: #e74c3c !important;
        animation: shake .4s ease;
      }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-6px); }
        75% { transform: translateX(6px); }
      }

      /* Loading state */
      .form-submit.loading {
        opacity: 0.7; pointer-events: none;
      }
      .form-submit.success {
        background: #2D5A3D !important;
      }

      /* B2B section */
      .contact-b2b { max-height: 0; overflow: hidden; transition: max-height .4s ease; }
      .contact-b2b.open { max-height: 500px; }

      /* Responsive modal */
      @media (max-width: 768px) {
        .product-modal-content { grid-template-columns: 1fr; gap: 1rem; padding: 1.2rem; }
        .cart-sidebar { width: 100vw; }
        .product-modal-notes { flex-direction: column; gap: .5rem; }
      }

      /* Nav hidden */
      .navbar.nav-hidden { transform: translateY(-100%); }
      .navbar { transition: transform .35s ease, background .3s ease, box-shadow .3s ease; }

      /* Scent wheel dark mode */
      body.dark-mode .product-modal-content,
      body.dark-mode .cart-sidebar {
        background: rgba(26,26,26,0.97);
      }
      body.dark-mode .product-modal-close,
      body.dark-mode .cart-close { color: #fff; }
      body.dark-mode .product-modal-close:hover { background: rgba(255,255,255,0.1); }
      body.dark-mode .gallery-prev,
      body.dark-mode .gallery-next { background: rgba(0,0,0,0.6); color: #fff; }
      body.dark-mode .qty-btn { color: #fff; }
      body.dark-mode .cart-item-remove { color: #aaa; }
    `;
    document.head.appendChild(style);
  };
  return { init };
})();

/* ─────────────────────────────────────────────
   BEHAVIORAL TRACKER
   ───────────────────────────────────────────── */
const BehavioralTracker = (() => {
  const getProfile = () => JSON.parse(localStorage.getItem('kiut_profile') || '{}');
  const saveProfile = (p) => localStorage.setItem('kiut_profile', JSON.stringify(p));

  const init = () => {
    const profile = getProfile();
    profile.lastVisit = new Date().toISOString();
    
    // Listen to product views
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (card && !e.target.closest('.add-to-cart-btn')) {
        const id = card.dataset.productId;
        profile.viewedProducts = profile.viewedProducts || [];
        if (!profile.viewedProducts.includes(id)) {
          profile.viewedProducts.unshift(id);
        }
        saveProfile(profile);
      }
    });

    saveProfile(profile);
  };
  return { init };
})();

/* ─────────────────────────────────────────────
   LOYALTY WIDGET
   ───────────────────────────────────────────── */
const LoyaltyWidget = (() => {
  const init = () => {
    const profile = JSON.parse(localStorage.getItem('kiut_profile') || '{}');
    if (!profile.points) profile.points = 0;
    
    // Only show if user has interacted with quiz or added items
    if (profile.scentFamily || localStorage.getItem('kiut-cart')) {
      const widget = document.createElement('div');
      widget.className = 'loyalty-widget';
      
      let levelName = 'Bronze';
      let emoji = '🥉';
      let color = '#CD7F32';
      let nextLevel = 500;
      
      if (profile.points >= 500) { levelName = 'Silver'; emoji = '🥈'; color = '#C0C0C0'; nextLevel = 1000; }
      if (profile.points >= 1000) { levelName = 'Gold'; emoji = '🥇'; color = '#FFD700'; nextLevel = 5000; }

      const progress = Math.min((profile.points / nextLevel) * 100, 100);

      widget.innerHTML = `
        <div class="loyalty-widget-inner" style="--level-color: ${color}">
          <div class="lw-header">
            <span class="lw-emoji">${emoji}</span>
            <div>
              <span class="lw-level">Nivel ${levelName}</span>
              <span class="lw-points">${profile.points} pts</span>
            </div>
          </div>
          <div class="lw-progress"><div class="lw-fill" style="width:${progress}%"></div></div>
          <p class="lw-next">Faltan ${nextLevel - profile.points} pts</p>
        </div>
      `;
      document.body.appendChild(widget);
    }
  };
  return { init };
})();

/* ─────────────────────────────────────────────
   EXIT INTENT
   ───────────────────────────────────────────── */
const ExitIntent = (() => {
  const init = () => {
    let triggered = false;
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY < 0 && !triggered && !localStorage.getItem('kiut_exit_intent_seen')) {
        triggered = true;
        localStorage.setItem('kiut_exit_intent_seen', 'true');
        showModal();
      }
    });
  };

  const showModal = () => {
    const modal = document.createElement('div');
    modal.className = 'exit-modal active';
    modal.innerHTML = `
      <div class="exit-modal-backdrop"></div>
      <div class="exit-modal-content">
        <button class="exit-modal-close" aria-label="Cerrar">&times;</button>
        <span class="exit-modal-icon">🎁</span>
        <h3>No te vayas con las manos vacías</h3>
        <p>Dejanos tu email y tu fecha de cumpleaños. Te regalamos una vela sorpresa en tu mes.</p>
        <form class="exit-capture-form">
          <input type="email" class="exit-email-input" placeholder="Tu email" required />
          <label class="exit-birthday-label">Tu cumpleaños:</label>
          <input type="date" class="exit-birthday-input" required />
          <button type="submit" class="btn-primary exit-submit">Quiero mi regalo</button>
          <span class="exit-no-thanks">No, gracias</span>
        </form>
      </div>
    `;
    
    document.body.appendChild(modal);

    const close = () => {
      modal.classList.remove('active');
      setTimeout(() => modal.remove(), 400);
    };

    modal.querySelector('.exit-modal-close').addEventListener('click', close);
    modal.querySelector('.exit-no-thanks').addEventListener('click', close);
    modal.querySelector('.exit-modal-backdrop').addEventListener('click', close);
    
    modal.querySelector('.exit-capture-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const email = modal.querySelector('.exit-email-input').value;
      const bday = modal.querySelector('.exit-birthday-input').value;
      
      const profile = JSON.parse(localStorage.getItem('kiut_profile') || '{}');
      profile.email = email;
      profile.birthday = bday;
      profile.points = (profile.points || 0) + 100; // Bonus points for signing up
      localStorage.setItem('kiut_profile', JSON.stringify(profile));
      
      const content = modal.querySelector('.exit-modal-content');
      content.innerHTML = `
        <span class="exit-success-icon">✨</span>
        <h3>¡Ya estás en la lista!</h3>
        <p>Revisá tu email en tu mes de cumpleaños para reclamar tu regalo.</p>
        <button class="btn-primary exit-modal-close" style="width:100%">Entendido</button>
      `;
      content.querySelector('.exit-modal-close').addEventListener('click', close);
    });
  };

  return { init };
})();

/* ─────────────────────────────────────────────
   INIT — Boot everything safely
   ───────────────────────────────────────────── */

const initAll = () => {
  const safeInit = (name, fn) => {
    try {
      fn();
    } catch (err) {
      console.error(`Error initializing module [${name}]:`, err);
    }
  };

  /* Inject JS-dependent CSS first */
  safeInit('InjectStyles', InjectStyles.init);

  /* Core UI */
  safeInit('ThemeManager', ThemeManager.init);
  safeInit('Navbar', Navbar.init);
  safeInit('LoadingScreen', LoadingScreen.init);

  /* Hero */
  safeInit('ParticleSystem', ParticleSystem.init);
  safeInit('Parallax', Parallax.init);

  /* Products */
  safeInit('ProductCatalog', ProductCatalog.init);
  safeInit('ProductModal', ProductModal.init);
  safeInit('ProductGalleryDots', ProductGalleryDots.init);

  /* Quiz */
  safeInit('ScentQuiz', ScentQuiz.init);

  /* Cart */
  safeInit('Cart', Cart.init);

  /* Sections */
  safeInit('RefillCalc', RefillCalc.init);
  safeInit('Editorial', Editorial.init);
  safeInit('AboutValues', AboutValues.init);
  safeInit('CounterAnimation', CounterAnimation.init);

  /* Forms */
  safeInit('Newsletter', Newsletter.init);
  safeInit('ContactForm', ContactForm.init);

  /* Animations & UX */
  safeInit('ScrollReveal', ScrollReveal.init);
  safeInit('LazyImages', LazyImages.init);
  safeInit('SmoothScroll', SmoothScroll.init);
  safeInit('BackToTop', BackToTop.init);
  safeInit('A11y', A11y.init);
  safeInit('WhatsAppButton', WhatsAppButton.init);
  safeInit('PerfHints', PerfHints.init);

  /* New Modules */
  safeInit('BehavioralTracker', BehavioralTracker.init);
  safeInit('LoyaltyWidget', LoyaltyWidget.init);
  safeInit('ExitIntent', ExitIntent.init);

  /* Log ready */
  console.log(
    '%c🕯️ KIUT AROMAS %c— Encendiendo experiencias',
    'background:#C4A265;color:#fff;padding:4px 12px;border-radius:4px 0 0 4px;font-weight:700;',
    'background:#1A1A1A;color:#C4A265;padding:4px 12px;border-radius:0 4px 4px 0;'
  );
};

/* Bulletproof DOM load boot trigger */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}

/* ─────────────────────────────────────────────
   JOURNAL ARTICLES — Modal content & controller
   ───────────────────────────────────────────── */

const ARTICLES = {
  'ritual-noche': {
    tag: 'Rituales',
    title: 'El ritual de la noche perfecta',
    meta: 'Por KIUT AROMAS  ·  5 min de lectura  ·  Bienestar & Hogar',
    image: "assets/images/journal_ritual_noche.jpg",
    content: `
      <p>Existe un momento preciso en el que la noche deja de ser el fin del día y se convierte en el comienzo de algo distinto: una pausa que mereces, un territorio propio donde el cuerpo afloja y la mente respira. Ese momento no ocurre por accidente. Se construye.</p>

      <h3>La arquitectura sensorial del descanso</h3>
      <p>El cerebro humano responde de manera profunda a los estímulos sensoriales. Antes de que caiga el sueño, necesita señales claras de que el día ha terminado. La luz cálida, los aromas suaves y la temperatura controlada actúan como llaves que abren ese estado de relajación.</p>
      <blockquote>"El olfato es el único sentido directamente conectado al sistema límbico, sede de nuestras emociones y memoria. Una fragancia elegida con intención puede reducir el cortisol en minutos."</blockquote>
      <p>Encender una vela de soja a las 21:00 h no es un gesto decorativo: es una instrucción al sistema nervioso autónomo. Le estás diciendo que es hora de transitar del modo de alerta al modo de restauración.</p>

      <h3>Tu protocolo de la noche</h3>
      <p><strong>1. Atenúa la luz artificial.</strong> Treinta minutos antes de dormir, reemplaza las luces blancas por la calidez de una o dos velas. La temperatura de color de la llama (alrededor de 1.800 K) no suprime la melatonina como lo hace la luz LED azul.</p>
      <p><strong>2. Elige tu aroma ancla.</strong> Las notas de lavanda, sándalo, benzóico y palo santo han demostrado activar el sistema parasimpático. En KIUT, nuestra línea Nocturna combina cedro de Virginia con lavanda francesa y una base de musgo blanco que persiste durante horas.</p>
      <p><strong>3. El ritual del silencio.</strong> Acompaña los primeros minutos con un libro físico, una infusión de manzanilla o simplemente quietud. El cerebro asociará ese aroma con ese estado, y con el tiempo el solo hecho de encender la vela bastará para inducir la calma.</p>

      <h3>El poder de la repetición</h3>
      <p>Los rituales funcionan porque el cerebro ama los patrones. La primera semana puede sentirse forzado; la tercera semana, el cuerpo comienza a anticipar. La sexta semana, el ritual se convierte en necesidad. No porque seas dependiente de él, sino porque has entrenado a tu sistema nervioso para confiar en ese momento.</p>
      <p>Una vela KIUT dura en promedio 45 horas. Son 45 noches de práctica, de intención, de regalo que te das a ti mismo antes de cerrar los ojos.</p>
    `
  },
  'aromas-estacion': {
    tag: 'Guías',
    title: 'Aromas por estación: tu guía sensorial completa',
    meta: 'Por KIUT AROMAS  ·  7 min de lectura  ·  Olfato & Naturaleza',
    image: "assets/images/journal_aromas_estacion.jpg",
    content: `
      <p>La naturaleza tiene su propio lenguaje aromático. Cada estación trae consigo una paleta olfativa que resuena con algo profundo en nosotros: una memoria, una emoción, una sensación física. Aprender a leer ese lenguaje y traducirlo a tu hogar es uno de los actos más íntimos de conexión con el mundo natural.</p>

      <h3>🌸 Primavera: Frescura y promesa</h3>
      <p>La primavera huele a inicio. Las flores de naranjo recién abiertas, la lluvia sobre la tierra seca, el jazmín trepando muros tibios. Son aromas ligeros, efervescentes, cargados de expectativa. Para tu hogar en esta estación, busca fragancias que combinen notas verdes como la albahaca o el té verde con flores blancas: jazmín, azahar o iris.</p>
      <p>En KIUT, nuestra vela <em>Florecer</em> captura exactamente esta transición: una apertura cítrica que evoluciona hacia un corazón floral y asienta en base de musgo húmedo.</p>

      <h3>☀️ Verano: Intensidad y luz</h3>
      <p>El verano pide aromas que no compitan con el calor sino que lo abracen. Las fragancias acuáticas, las notas de cítricos helados y las florales tropicales como el frangipani o el monoi funcionan como una brisa encerrada en cera. Son aromas que refrescan sin enfriar, que iluminan sin deslumbrar.</p>
      <blockquote>"En verano, los aromas viajan más lejos porque el calor amplifica la evaporación. Una vela que en invierno perfuma una habitación, en verano puede alcanzar toda la planta."</blockquote>

      <h3>🍂 Otoño: Calidez y profundidad</h3>
      <p>El otoño es la estación más aromática del año. La madera mojada, las especias calientes, la vainilla tostada, el tabaco rubio, el cuero suave. Es el momento de las velas más densas, las de mayor proyección, las que permanecen en el aire horas después de apagadas. Para el otoño: ámbar, benjuí, canela, cardamomo, madera de cedro y oud.</p>
      <p>Nuestra colección <em>Tonka y Sándalo</em> fue diseñada específicamente para este período: densa, envolvente, como un abrazo que huele a biblioteca antigua y tierra húmeda.</p>

      <h3>❄️ Invierno: Confort y recogimiento</h3>
      <p>El invierno pide aromas que construyan un mundo interior. Cuando el frío obliga al cuerpo a buscar calor, los aromas de pino, abeto, clavo, naranja confitada y resinas antiguas crean esa sensación de hogar que trasciende la temperatura real. Son fragancias que cuentan historias.</p>
      <p>La clave en invierno: elige velas con mayor concentración de fragancia (fragrance load del 10% o más) para que el aroma se sienta incluso con ventanas cerradas y la calefacción funcionando.</p>
    `
  },
  'aromaterapia': {
    tag: 'Bienestar',
    title: 'Aromaterapia en casa: la ciencia detrás del olfato',
    meta: 'Por KIUT AROMAS  ·  6 min de lectura  ·  Neurociencia & Bienestar',
    image: "assets/images/journal_aromaterapia.jpg",
    content: `
      <p>Durante siglos, la humanidad utilizó el olfato como guía de supervivencia: detectar el peligro, encontrar alimento, reconocer a los suyos. Hoy, esa misma maquinaria evolutiva puede ponerse al servicio de algo completamente diferente: tu bienestar cotidiano.</p>

      <h3>El camino más directo al cerebro emocional</h3>
      <p>A diferencia de los otros sentidos, el olfato no pasa por el tálamo antes de llegar a la corteza cerebral. Las moléculas aromáticas viajan directamente desde los receptores nasales al sistema límbico, que incluye la amígdala (procesamiento emocional) y el hipocampo (memoria). Este atajo neurológico explica por qué un aroma puede evocar instantáneamente una emoción o un recuerdo con una viveza que ninguna imagen o sonido puede igualar.</p>
      <blockquote>"El olfato es el único sentido no filtrado. Llega primero, reacciona antes. Por eso los aromas pueden modificar el estado de ánimo en segundos, no en minutos."</blockquote>

      <h3>Qué dice la ciencia sobre cada fragancia</h3>
      <p><strong>Lavanda:</strong> Múltiples estudios (incluidos ensayos clínicos controlados) demuestran que el linalool, principal componente de la lavanda, reduce la actividad del sistema nervioso simpático. Menos cortisol, menor frecuencia cardíaca, mayor sensación de calma.</p>
      <p><strong>Cítricos (limón, bergamota, naranja):</strong> Activan la producción de dopamina y serotonina. Son los antidepresivos naturales más accesibles. Un estudio publicado en el <em>Journal of Alternative and Complementary Medicine</em> demostró que la inhalación de bergamota redujo la ansiedad en pacientes preoperatorios en un 36%.</p>
      <p><strong>Sándalo y cedro:</strong> Contienen sesquiterpenos que estimulan la glándula pineal, favoreciendo la síntesis de melatonina. Son los aliados del sueño profundo.</p>
      <p><strong>Menta y eucalipto:</strong> El mentol activa los receptores TRPM8, generando una sensación de frescura y aumentando el estado de alerta. Son ideales para espacios de trabajo.</p>

      <h3>Cómo crear tu espacio terapéutico en casa</h3>
      <p>No necesitas un spa ni equipos especiales. Una vela de soja bien formulada libera moléculas aromáticas de manera controlada y constante, sin los riesgos de las parafinas de baja calidad (que producen hollín y compuestos orgánicos volátiles).</p>
      <p>El truco está en la intención: elige un aroma diferente para cada función de tu hogar. Cítricos en el estudio, lavanda en el dormitorio, madera en el living. Con el tiempo, entrar a cada espacio activará el estado mental asociado. Es condicionamiento clásico al servicio de tu bienestar.</p>

      <h3>Cera de soja: por qué importa</h3>
      <p>La cera de soja libera los aceites esenciales de manera más lenta y uniforme que la parafina. Quema más frío, lo que significa que las moléculas aromáticas se liberan en su forma más íntegra, sin degradarse por exceso de calor. La diferencia olfativa es notable: más matices, mayor complejidad, menos "artificialidad".</p>
    `
  },
  'sostenibilidad': {
    tag: 'Sostenibilidad',
    title: 'Del campo a tu hogar: nuestra cadena sostenible',
    meta: 'Por KIUT AROMAS  ·  5 min de lectura  ·  Medio Ambiente & Economía Circular',
    image: "assets/images/journal_sostenibilidad.jpg",
    content: `
      <p>Hay una pregunta que nos hicimos desde el primer día: ¿es posible crear una vela que sea honesta en cada etapa de su existencia? No solo en el momento en que arde, sino desde que sus materiales son extraídos hasta que el recipiente termina su vida útil. La respuesta, después de años de investigación y reformulaciones, es sí. Pero requiere trabajo.</p>

      <h3>La cera: de la planta al recipiente</h3>
      <p>La soja que utilizamos proviene de cultivos no transgénicos, sin glifosato, procesados mediante extracción mecánica en frío. La cera de soja es un subproducto del aceite de soja: en lugar de terminar como desperdicio industrial, se convierte en el corazón de cada vela KIUT.</p>
      <p>La huella de carbono de la cera de soja es significativamente menor que la de la parafina (derivada del petróleo) y la cera de abeja a escala comercial (que interfiere con los ecosistemas de polinización). No es perfecta, ningún material lo es, pero es la opción más coherente con nuestra filosofía.</p>

      <h3>Las fragancias: transparencia total</h3>
      <blockquote>"No usamos 'fragrance' como ingrediente opaco. Cada aroma en nuestras velas tiene una ficha técnica que podés solicitarnos, con cada componente identificado."</blockquote>
      <p>Nuestras fragancias son libres de ftalatos, parabenos, muscos nitrados y colorantes sintéticos. Muchas de nuestras líneas incorporan aceites esenciales puros (no reconstituidos) obtenidos mediante destilación al vapor o prensado en frío de productores certificados en Provenza, Marruecos y Argentina.</p>

      <h3>El modelo de Recarga Circular</h3>
      <p>Aquí está nuestra propuesta más radical: cuando tu vela KIUT se termina, el recipiente no va a la basura. Viene de vuelta a nosotros.</p>
      <p>En nuestro punto de recarga en tienda, limpiamos, esterilizamos y rellenamos cada recipiente con la fragancia que elijas. El precio de la recarga es un 40% menor que una vela nueva. El recipiente dura indefinidamente. El residuo generado por vela se aproxima a cero.</p>
      <p>Este modelo no es solo ambiental: es económico. Calculamos que un cliente que recarga su vela cuatro veces en lugar de comprar cuatro velas nuevas ahorra el equivalente a una vela adicional. La sostenibilidad, en este caso, también tiene sentido financiero.</p>

      <h3>Nuestros compromisos medibles</h3>
      <p><strong>100%</strong> de envases diseñados para ser recargados o reciclados.<br>
      <strong>0%</strong> parafina ni materiales derivados del petróleo en nuestras fórmulas.<br>
      <strong>30%</strong> descuento sobre precio de lista para quien trae su recipiente a recargar.<br>
      <strong>Local:</strong> producción artesanal en Argentina, reduciendo emisiones de transporte internacional.</p>
      <p>Cada vez que encendés una vela KIUT, no solo estás eligiendo un aroma. Estás eligiendo un modelo diferente de producción y consumo. Y eso, en un mundo saturado de objetos desechables, es un acto político pequeño pero real.</p>
    `
  },
  'b2b-gifts': {
    tag: 'B2B',
    title: 'Regalos corporativos con impacto',
    meta: 'Por KIUT AROMAS  ·  3 min de lectura',
    image: 'assets/images/journal_b2b.jpg',
    content: '<p>Personalizamos aromas para empresas que buscan conectar de forma genuina.</p>'
  },
  'hotel-spas': {
    tag: 'B2B',
    title: 'Aromaterapia para Hoteles y Spas',
    meta: 'Por KIUT AROMAS  ·  4 min de lectura',
    image: 'assets/images/journal_hotel.jpg',
    content: '<p>Diseñamos fragancias exclusivas para potenciar la experiencia de tus clientes.</p>'
  },
  'design-trends': {
    tag: 'Diseño Interior',
    title: 'Tendencias en aromas y diseño',
    meta: 'Por KIUT AROMAS  ·  5 min de lectura',
    image: 'assets/images/journal_design.jpg',
    content: '<p>Cómo los aromas se integran al diseño de interiores para transformar un espacio.</p>'
  },
  'argentine-culture': {
    tag: 'Cultura Argentina',
    title: 'Aromas que cuentan nuestra historia',
    meta: 'Por KIUT AROMAS  ·  4 min de lectura',
    image: 'assets/images/journal_culture.jpg',
    content: '<p>Nuestros aromas están inspirados en los paisajes y la cultura de Argentina.</p>'
  },
  'wellness-routine': {
    tag: 'Bienestar',
    title: 'Tu rutina de bienestar diaria',
    meta: 'Por KIUT AROMAS  ·  3 min de lectura',
    image: 'assets/images/journal_wellness.jpg',
    content: '<p>Pequeños rituales con aromas que te ayudarán a mantener el equilibrio diario.</p>'
  },
  'candle-care': {
    tag: 'Guías',
    title: 'Cómo cuidar tus velas',
    meta: 'Por KIUT AROMAS  ·  2 min de lectura',
    image: 'assets/images/journal_care.jpg',
    content: '<p>Guía rápida para extender la vida útil de tus velas y mantener su calidad.</p>'
  },
  'eco-packaging': {
    tag: 'Sostenibilidad',
    title: 'Nuestro packaging ecológico',
    meta: 'Por KIUT AROMAS  ·  3 min de lectura',
    image: 'assets/images/journal_eco.jpg',
    content: '<p>El compromiso de KIUT con el medio ambiente va más allá de la cera.</p>'
  },
  'scent-pairing': {
    tag: 'Diseño Interior',
    title: 'Scent Pairing para tu hogar',
    meta: 'Por KIUT AROMAS  ·  5 min de lectura',
    image: 'assets/images/journal_pairing.jpg',
    content: '<p>Aprende a combinar diferentes aromas para crear ambientes únicos.</p>'
  }
};

/* Open modal */
function openArticle(id) {
  const data = ARTICLES[id];
  if (!data) return;

  const modal = document.getElementById('article-modal');
  document.getElementById('modal-tag').textContent = data.tag;
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-meta').textContent = data.meta;
  document.getElementById('modal-hero-img').style.backgroundImage = \`url('\${data.image}')\`;
  document.getElementById('modal-text').innerHTML = data.content;

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  // Close on ESC
  document.addEventListener('keydown', _closeOnEsc);
}

/* Close modal */
function closeArticle() {
  const modal = document.getElementById('article-modal');
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', _closeOnEsc);
}

function _closeOnEsc(e) {
  if (e.key === 'Escape') closeArticle();
}
