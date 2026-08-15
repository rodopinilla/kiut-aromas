/* ============================================================
   KIUT WELLNESS PWA — Application Logic
   Vanilla JS ES6+ · No frameworks · Service Worker enabled
   ============================================================ */

'use strict';

/* ─── CONSTANTS ─── */
const PRODUCTS = [
  { id: 1, name: 'Recarga de Energía', type: 'Vela de Soja Natural', weight: '100g', price: 8500, burnHours: 40, image: '../assets/images/IMG_20260425_143255390_HDR_AE.jpg', category: 'energia', scentFamily: 'floral' },
  { id: 2, name: 'Tonka y Sándalo', type: 'Vela de Soja Natural', weight: '200g', price: 12900, burnHours: 60, image: '../assets/images/IMG_20260425_145431213_HDR_AE.jpg', category: 'premium', scentFamily: 'amaderado' },
  { id: 3, name: 'Canela, Vainilla y Tabaco', type: 'Vela de Soja Natural', weight: '150g', price: 9900, burnHours: 50, image: '../assets/images/IMG_20260523_123404284_HDR_AE.jpg', category: 'clasica', scentFamily: 'especiado' },
  { id: 4, name: 'Hojas de Limón y Fresias', type: 'Vela de Soja Natural', weight: '150g', price: 9900, burnHours: 50, image: '../assets/images/IMG_20260523_123553324_HDR_AE.jpg', category: 'clasica', scentFamily: 'fresco' },
  { id: 5, name: 'Home Diffuser', type: 'Difusor Premium', weight: '200ml', price: 14500, burnHours: 720, image: '../assets/images/IMG_20260506_155709276_HDR_AE.jpg', category: 'home', scentFamily: 'oriental' },
  { id: 6, name: 'Prendeme', type: 'Vela Wellness', weight: '150g', price: 10500, burnHours: 50, image: '../assets/images/IMG_20260425_144015830_HDR_AE.jpg', category: 'wellness', scentFamily: 'fresco' },
];

const LEVELS = [
  { name: 'Seed', emoji: '🌱', min: 0, max: 500, color: '#4CAF50', perks: ['Descuentos de temporada', 'Acceso al quiz olfativo'] },
  { name: 'Flame', emoji: '🕯️', min: 501, max: 1500, color: '#FF9800', perks: ['Envío gratis siempre', 'Acceso anticipado a novedades', 'Recarga con 5% extra de descuento'] },
  { name: 'Sanctuary', emoji: '🌿', min: 1501, max: Infinity, color: '#8B4513', perks: ['20% descuento permanente', 'Vela de cumpleaños gratis', 'Línea directa KIUT', 'Packaging gift wrap gratis'] }
];

/* ─── STORAGE ─── */
const Store = {
  get: (key, def = null) => { try { const v = localStorage.getItem('kiut_pwa_' + key); return v ? JSON.parse(v) : def; } catch { return def; } },
  set: (key, val) => { try { localStorage.setItem('kiut_pwa_' + key, JSON.stringify(val)); } catch {} }
};

const getProfile = () => Store.get('profile', { points: 0, name: 'Amante de KIUT', candles: [], pointsHistory: [] });
const saveProfile = (p) => Store.set('profile', p);

/* ─── ROUTER ─── */
let currentScreen = 'home';
const screens = {};

const navigate = (screenId) => {
  const content = document.getElementById('pwaContent');
  const backBtn = document.getElementById('pwaBackBtn');
  if (!content) return;
  currentScreen = screenId;
  // Update nav buttons
  document.querySelectorAll('.pwa-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.screen === screenId);
  });
  // Back button visibility
  if (backBtn) {
    backBtn.style.opacity = '1';
    backBtn.style.pointerEvents = 'auto';
    if (screenId === 'home') { backBtn.style.opacity = '0'; backBtn.style.pointerEvents = 'none'; }
  }
  // Render screen
  const screenFn = screens[screenId];
  if (screenFn) {
    content.innerHTML = '';
    const el = screenFn();
    content.appendChild(el);
  }
};

/* ─── SCREEN: HOME ─── */
screens.home = () => {
  const div = document.createElement('div');
  div.className = 'pwa-screen';
  const profile = getProfile();
  const level = LEVELS.find(l => profile.points >= l.min && profile.points <= l.max) || LEVELS[0];
  const nextLevel = LEVELS[LEVELS.indexOf(level) + 1];
  const progress = nextLevel ? Math.round((profile.points - level.min) / (nextLevel.min - level.min) * 100) : 100;
  
  // Get most urgent candle for refill
  const candles = profile.candles || [];
  let urgentCandle = candles.reduce((acc, c) => {
    const remaining = calcRemainingPercent(c);
    return (!acc || remaining < calcRemainingPercent(acc)) ? c : acc;
  }, null);

  div.innerHTML = `
    <p class="home-subgreeting">${new Date().getHours() < 12 ? '☀️ Buenos días' : new Date().getHours() < 18 ? '🌤️ Buenas tardes' : '🌙 Buenas noches'}</p>
    <h1 class="home-greeting">${profile.name}</h1>

    ${ urgentCandle ? `
      <div class="next-refill-card" onclick="navigate('inventory')">
        <p class="nrc-label">Próxima Recarga</p>
        <p class="nrc-product">${urgentCandle.name}</p>
        <div class="nrc-progress"><div class="nrc-fill" style="width:${calcRemainingPercent(urgentCandle)}%"></div></div>
        <p class="nrc-time">${calcRemainingPercent(urgentCandle).toFixed(0)}% restante · ~${calcRemainingHours(urgentCandle)}h</p>
      </div>` : `
      <div class="next-refill-card" onclick="navigate('inventory')" style="cursor:pointer">
        <p class="nrc-label">Panel de Recargas</p>
        <p class="nrc-product">Registrá tu primera vela</p>
        <p class="nrc-time">Escaneá el código y empezá a trackearlo →</p>
      </div>`
    }

    <div class="home-quick-grid">
      <div class="quick-action-card" onclick="navigate('ar')">
        <span class="quick-action-icon">✨</span>
        <span class="quick-action-label">Ver en mi Espacio</span>
      </div>
      <div class="quick-action-card" onclick="navigate('quiz')">
        <span class="quick-action-icon">🔮</span>
        <span class="quick-action-label">Quiz Olfativo</span>
      </div>
      <div class="quick-action-card" onclick="navigate('iot')">
        <span class="quick-action-icon">📡</span>
        <span class="quick-action-label">Control IoT</span>
      </div>
      <div class="quick-action-card" onclick="navigate('loyalty')">
        <span class="quick-action-icon">${level.emoji}</span>
        <span class="quick-action-label">${level.name} · ${profile.points} pts</span>
      </div>
    </div>

    <h2 class="home-section-title">Journal KIUT</h2>
    <div class="journal-feed">
      <div class="journal-item" onclick="navigate('home')">
        <img class="journal-item-thumb" src="../assets/images/IMG_20260506_131253739_HDR_AE.jpg" alt="Artículo" onerror="this.style.background='var(--border)'">
        <div>
          <p class="journal-item-tag">Diseño Interior</p>
          <p class="journal-item-title">Cómo usar aromas para definir zonas</p>
        </div>
      </div>
      <div class="journal-item" onclick="navigate('home')">
        <img class="journal-item-thumb" src="../assets/images/IMG_20260506_102503326_HDR_AE.jpg" alt="Artículo" onerror="this.style.background='var(--border)'">
        <div>
          <p class="journal-item-tag">Cultura Argentina</p>
          <p class="journal-item-title">El mate, el tango y los aromas porteños</p>
        </div>
      </div>
      <div class="journal-item" onclick="navigate('home')">
        <img class="journal-item-thumb" src="../assets/images/IMG_20260425_145751619_HDR_AE.jpg" alt="Artículo" onerror="this.style.background='var(--border)'">
        <div>
          <p class="journal-item-tag">Bienestar</p>
          <p class="journal-item-title">Neurociencia del aroma: 13ms al cerebro</p>
        </div>
      </div>
    </div>
  `;
  return div;
};

/* ─── HELPERS for burn tracking ─── */
const calcRemainingPercent = (candle) => {
  const product = PRODUCTS.find(p => p.id === candle.productId);
  if (!product) return 100;
  const elapsed = (Date.now() - new Date(candle.activatedAt).getTime()) / 3600000; // hours
  const remaining = Math.max(0, 100 - (elapsed / product.burnHours * 100));
  return remaining;
};

const calcRemainingHours = (candle) => {
  const product = PRODUCTS.find(p => p.id === candle.productId);
  if (!product) return 0;
  const elapsed = (Date.now() - new Date(candle.activatedAt).getTime()) / 3600000;
  return Math.max(0, Math.round(product.burnHours - elapsed));
};

/* ─── SCREEN: AR VISUALIZER ─── */
screens.ar = () => {
  const div = document.createElement('div');
  div.className = 'pwa-screen ar-screen';
  let selectedProduct = PRODUCTS[0];

  div.innerHTML = `
    <div class="ar-hero">
      <span class="ar-hero-emoji">✨</span>
      <h2>KIUT en mi Espacio</h2>
      <p>Visualizá cómo quedaría tu pieza KIUT en tu mesa de luz, estante o rincón favorito.</p>
      <button class="ar-launch-btn" id="arLaunchBtn">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
        Activar Cámara AR
      </button>
    </div>

    <h3 class="home-section-title" style="margin-bottom:12px">Seleccionar Producto</h3>
    <div class="ar-products-scroll" id="arProductsScroll">
      ${PRODUCTS.map(p => `
        <div class="ar-product-chip ${p.id === selectedProduct.id ? 'selected' : ''}" data-pid="${p.id}">
          <img class="ar-product-chip-img" src="${p.image}" alt="${p.name}" onerror="this.style.background='var(--border)'">
          <p class="ar-product-chip-name">${p.name}</p>
        </div>
      `).join('')}
    </div>

    <div class="ar-viewer" id="arViewer">
      <div class="ar-viewer-placeholder">
        <span style="font-size:3rem">📷</span>
        <p>Selecciona un producto y activá la cámara para verlo en tu espacio</p>
      </div>
    </div>

    <div class="ar-instructions">
      <div class="ar-step"><span class="ar-step-icon">📱</span><p class="ar-step-text">Enfocá una superficie plana</p></div>
      <div class="ar-step"><span class="ar-step-icon">👆</span><p class="ar-step-text">Tocá para colocar la pieza</p></div>
      <div class="ar-step"><span class="ar-step-icon">🔄</span><p class="ar-step-text">Rotá con dos dedos</p></div>
      <div class="ar-step"><span class="ar-step-icon">📸</span><p class="ar-step-text">Compartí la foto</p></div>
    </div>
  `;

  // AR Camera activation
  div.querySelector('#arLaunchBtn').addEventListener('click', async () => {
    const viewer = div.querySelector('#arViewer');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      viewer.innerHTML = `
        <video id="arVideo" autoplay playsinline muted style="width:100%;height:100%;object-fit:cover;border-radius:20px"></video>
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none">
          <div style="background:rgba(201,168,76,0.2);border:2px solid var(--color-gold);width:120px;height:160px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:3rem">${['🕯️','🏺','✨'][PRODUCTS.findIndex(p=>p.id===selectedProduct.id)%3]}</div>
        </div>
        <button onclick="stopCamera()" style="position:absolute;bottom:12px;right:12px;background:rgba(0,0,0,0.6);color:white;border:none;border-radius:40px;padding:8px 16px;cursor:pointer;font-size:0.8rem">Detener</button>
        <button onclick="shareAR()" style="position:absolute;bottom:12px;left:12px;background:var(--color-gold);color:#1A0A00;border:none;border-radius:40px;padding:8px 16px;cursor:pointer;font-weight:700;font-size:0.8rem">📸 Compartir</button>
      `;
      document.getElementById('arVideo').srcObject = stream;
      window._arStream = stream;
      window.stopCamera = () => { stream.getTracks().forEach(t=>t.stop()); viewer.innerHTML = '<div class="ar-viewer-placeholder"><span style="font-size:3rem">📷</span><p>Cámara detenida</p></div>'; };
      window.shareAR = async () => {
        if (navigator.share) {
          await navigator.share({ title: 'KIUT en mi espacio ✨', text: `¡Mirá cómo queda ${selectedProduct.name} en mi casa! 🕯️ @kiutaromas`, url: 'https://kiut.com.ar' });
        } else {
          alert('Compartí esta imagen en Instagram con @kiutaromas ✨');
        }
      };
    } catch (err) {
      viewer.innerHTML = `<div class="ar-viewer-placeholder"><span style="font-size:2rem">🚫</span><p>Permiso de cámara necesario para AR. Activalo en configuración.</p></div>`;
    }
  });

  // Product selection
  div.querySelector('#arProductsScroll').addEventListener('click', (e) => {
    const chip = e.target.closest('.ar-product-chip');
    if (!chip) return;
    const pid = parseInt(chip.dataset.pid);
    selectedProduct = PRODUCTS.find(p => p.id === pid);
    div.querySelectorAll('.ar-product-chip').forEach(c => c.classList.toggle('selected', parseInt(c.dataset.pid) === pid));
  });

  return div;
};

/* ─── SCREEN: INVENTORY / RECARGA CIRCULAR ─── */
screens.inventory = () => {
  const div = document.createElement('div');
  div.className = 'pwa-screen';
  const profile = getProfile();
  const candles = profile.candles || [];

  const renderCandles = () => {
    const list = div.querySelector('#candleList');
    if (!list) return;
    if (candles.length === 0) {
      list.innerHTML = `
        <div style="text-align:center;padding:40px 20px;color:var(--text-muted)">
          <div style="font-size:3rem;margin-bottom:12px">🕯️</div>
          <p style="font-family:var(--font-serif);font-size:1.2rem;margin-bottom:8px">Sin velas registradas</p>
          <p style="font-size:0.85rem">Escaneá el código de barras de tu vela KIUT para empezar a trackear su vida útil.</p>
        </div>
      `;
      return;
    }
    list.innerHTML = candles.map((c, i) => {
      const pct = calcRemainingPercent(c);
      const hrs = calcRemainingHours(c);
      const fillClass = pct > 50 ? 'high' : pct > 20 ? 'medium' : 'low';
      const isLow = pct < 25;
      return `
        <div class="candle-card">
          <div class="candle-card-header">
            <img class="candle-card-img" src="${c.image}" alt="${c.name}" onerror="this.style.background='var(--border)'">
            <div style="flex:1">
              <p class="candle-card-name">${c.name}</p>
              <p class="candle-card-type">${c.type}</p>
              ${ isLow ? '<span class="refill-badge">⚡ ¡Recarga pronto!</span>' : '' }
            </div>
          </div>
          <div class="candle-burn-bar"><div class="candle-burn-fill ${fillClass}" style="width:${pct}%"></div></div>
          <div class="candle-burn-stats">
            <span>${pct.toFixed(0)}% restante</span>
            <span>~${hrs}h más</span>
          </div>
          <div class="candle-card-actions">
            <button class="btn-refill" onclick="requestRefill(${i})">♻️ Pedir Recarga</button>
            <button class="btn-remind" onclick="setReminder(${i})">🔔 Recordatorio</button>
          </div>
        </div>
      `;
    }).join('');
  };

  div.innerHTML = `
    <div class="inventory-header">
      <h2>Mis Recargas</h2>
      <button class="btn-scan" id="scanBtn">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 7h.01M17 7h.01M7 17h.01M17 17h.01"/></svg>
        Escanear
      </button>
    </div>
    
    <div id="candleList"></div>

    <!-- CO2 Stats -->
    ${ candles.length > 0 ? `
    <div class="pwa-card" style="margin-top:20px;text-align:center">
      <p style="font-family:var(--font-serif);font-size:1.1rem;margin-bottom:12px">Tu Impacto Ambiental 🌿</p>
      <div style="display:flex;gap:16px;justify-content:center">
        <div><p style="font-family:var(--font-serif);font-size:1.8rem;color:var(--color-green)">${candles.length}</p><p style="font-size:0.75rem;color:var(--text-muted)">Recargas</p></div>
        <div><p style="font-family:var(--font-serif);font-size:1.8rem;color:var(--color-green)">${(candles.length * 0.12).toFixed(1)} kg</p><p style="font-size:0.75rem;color:var(--text-muted)">CO₂ evitado</p></div>
        <div><p style="font-family:var(--font-serif);font-size:1.8rem;color:var(--color-green)">${candles.length}</p><p style="font-size:0.75rem;color:var(--text-muted)">Frascos reutilizados</p></div>
      </div>
    </div>` : '' }

    <!-- Scanner Modal -->
    <div class="scan-modal hidden" id="scanModal">
      <div class="scan-viewport">
        <video id="scanVideo" autoplay playsinline muted></video>
        <div class="scan-guide">
          <div class="scan-guide-corner tl"></div>
          <div class="scan-guide-corner tr"></div>
          <div class="scan-guide-corner bl"></div>
          <div class="scan-guide-corner br"></div>
          <div class="scan-line"></div>
        </div>
      </div>
      <p class="scan-tip">Apuntá al código de barras de tu vela KIUT</p>
      <button class="btn-scan-cancel" id="scanCancel">Cancelar</button>
    </div>
  `;

  renderCandles();

  // Scanner logic
  const scanModal = div.querySelector('#scanModal');
  const scanBtn = div.querySelector('#scanBtn');
  const scanCancel = div.querySelector('#scanCancel');

  scanBtn.addEventListener('click', async () => {
    scanModal.classList.remove('hidden');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      const video = div.querySelector('#scanVideo');
      video.srcObject = stream;
      window._scanStream = stream;
      
      // Simulate successful scan after 3 seconds (in real app: use BarcodeDetector API)
      setTimeout(() => {
        stream.getTracks().forEach(t => t.stop());
        scanModal.classList.add('hidden');
        
        // Pick a random product to simulate scan
        const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.filter(p=>p.type.includes('Vela')).length)];
        const profile = getProfile();
        if (!profile.candles) profile.candles = [];
        profile.candles.push({ productId: product.id, name: product.name, type: product.type, image: product.image, activatedAt: new Date().toISOString(), weight: product.weight });
        // Award points
        profile.points = (profile.points || 0) + 50;
        profile.pointsHistory = profile.pointsHistory || [];
        profile.pointsHistory.unshift({ pts: 50, reason: 'Registro de producto', date: new Date().toISOString() });
        saveProfile(profile);
        candles.push(profile.candles[profile.candles.length - 1]);
        renderCandles();
        showToast(`✅ ${product.name} registrada! +50 pts KIUT Family`);
      }, 3000);
    } catch {
      scanModal.classList.add('hidden');
      showToast('Permiso de cámara necesario para escanear');
    }
  });

  scanCancel.addEventListener('click', () => {
    if (window._scanStream) window._scanStream.getTracks().forEach(t => t.stop());
    scanModal.classList.add('hidden');
  });

  window.requestRefill = (i) => {
    showToast('📧 Solicitud de recarga enviada a KIUT. ¡Te confirmamos en 24h!');
  };
  window.setReminder = (i) => {
    if ('Notification' in window) {
      Notification.requestPermission().then(p => {
        if (p === 'granted') {
          setTimeout(() => new Notification('KIUT Wellness 🕯️', { body: `¡Es hora de recargar tu ${candles[i].name}!`, icon: '../assets/images/IMG_20260425_145431213_HDR_AE.jpg' }), 5000);
          showToast('🔔 Recordatorio configurado para en 5 segundos (demo)');
        }
      });
    }
  };

  return div;
};

/* ─── SCREEN: IoT CONTROL ─── */
screens.iot = () => {
  const div = document.createElement('div');
  div.className = 'pwa-screen';
  const iotState = Store.get('iot', { intensity: 60, schedule: { lun: { on: true, start: '08:00', end: '22:00' }, mar: { on: true, start: '08:00', end: '22:00' }, mie: { on: false, start: '08:00', end: '22:00' }, jue: { on: true, start: '08:00', end: '22:00' }, vie: { on: true, start: '08:00', end: '23:00' }, sab: { on: true, start: '10:00', end: '23:00' }, dom: { on: true, start: '10:00', end: '21:00' } }, modes: { welcome: false, meditation: false, sleep: false, work: false }, geofenceRadius: 300, connected: true });

  const days = ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom'];
  const dayLabels = { lun: 'Lunes', mar: 'Martes', mie: 'Miércoles', jue: 'Jueves', vie: 'Viernes', sab: 'Sábado', dom: 'Domingo' };

  div.innerHTML = `
    <div class="iot-device-card">
      <div class="iot-device-header">
        <div>
          <p class="iot-device-name">Difusor KIUT Pro</p>
          <p style="font-size:0.8rem;opacity:0.7">
            <span class="iot-status-dot ${iotState.connected ? '' : 'offline'}"></span>
            ${iotState.connected ? 'Conectado · Red Hogar' : 'Sin conexión — modo local'}
          </p>
        </div>
        <span style="font-size:2rem">📡</span>
      </div>

      <p class="iot-intensity-label">Intensidad de difusión</p>
      <p class="iot-intensity-display" id="intensityDisplay">${iotState.intensity}%</p>
      <input type="range" class="iot-slider" id="intensitySlider" min="0" max="100" value="${iotState.intensity}">

      <div class="iot-modes">
        ${Object.entries({ welcome: { label: 'Bienvenida', emoji: '🏠' }, meditation: { label: 'Meditación', emoji: '🧘' }, sleep: { label: 'Sueño', emoji: '🌙' }, work: { label: 'Focus', emoji: '💼' } }).map(([key, { label, emoji }]) => `
          <button class="iot-mode-btn ${iotState.modes[key] ? 'active' : ''}" data-mode="${key}">
            <span class="iot-mode-emoji">${emoji}</span>
            ${label}
          </button>
        `).join('')}
      </div>
    </div>

    <h3 class="home-section-title">Programación Semanal</h3>
    <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:12px">⚡ Funciona sin conexión a internet (Edge Computing)</p>
    <div class="iot-schedule-card">
      ${days.map(day => `
        <div class="schedule-row">
          <div>
            <p class="schedule-day">${dayLabels[day]}</p>
            <p class="schedule-time">${iotState.schedule[day].start} — ${iotState.schedule[day].end}</p>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" data-day="${day}" ${iotState.schedule[day].on ? 'checked' : ''}>
            <span class="toggle-slider"></span>
          </label>
        </div>
      `).join('')}
    </div>

    <h3 class="home-section-title" style="margin-top:20px">Modo Bienvenida GPS 🏠</h3>
    <div class="geofence-card">
      <div class="geofence-header">
        <div>
          <p class="geofence-title">Activar al llegar a casa</p>
          <p class="geofence-subtitle">El difusor se activa cuando detecta que llegaste al radio de tu hogar</p>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" id="geofenceToggle" ${iotState.modes.welcome ? 'checked' : ''}>
          <span class="toggle-slider"></span>
        </label>
      </div>
      <div class="geofence-radius">
        <label>Radio de activación:</label>
        <input type="range" min="100" max="1000" value="${iotState.geofenceRadius}" id="geofenceRadius" style="flex:1">
        <span id="geofenceRadiusLabel" style="font-size:0.8rem;color:var(--color-amber);font-weight:700;min-width:60px">${iotState.geofenceRadius}m</span>
      </div>
      <p style="font-size:0.75rem;color:var(--text-muted);margin-top:8px">La programación se guarda localmente. Funciona sin conexión.</p>
    </div>
  `;

  // Intensity slider
  div.querySelector('#intensitySlider').addEventListener('input', (e) => {
    const val = e.target.value;
    div.querySelector('#intensityDisplay').textContent = val + '%';
    iotState.intensity = parseInt(val);
    Store.set('iot', iotState);
  });

  // Mode buttons
  div.querySelectorAll('.iot-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      // Toggle, deactivate others
      Object.keys(iotState.modes).forEach(m => iotState.modes[m] = false);
      iotState.modes[mode] = !btn.classList.contains('active');
      div.querySelectorAll('.iot-mode-btn').forEach(b => b.classList.remove('active'));
      if (iotState.modes[mode]) btn.classList.add('active');
      // Apply mode intensity
      const modeIntensity = { welcome: 70, meditation: 30, sleep: 15, work: 50 };
      if (iotState.modes[mode]) {
        iotState.intensity = modeIntensity[mode];
        div.querySelector('#intensitySlider').value = modeIntensity[mode];
        div.querySelector('#intensityDisplay').textContent = modeIntensity[mode] + '%';
      }
      Store.set('iot', iotState);
      showToast(`Modo ${btn.textContent.trim()} ${iotState.modes[mode] ? 'activado' : 'desactivado'}`);
    });
  });

  // Schedule toggles
  div.querySelectorAll('.schedule-row input[type=checkbox][data-day]').forEach(chk => {
    chk.addEventListener('change', () => {
      iotState.schedule[chk.dataset.day].on = chk.checked;
      Store.set('iot', iotState);
    });
  });

  // Geofence
  div.querySelector('#geofenceToggle')?.addEventListener('change', (e) => {
    iotState.modes.welcome = e.target.checked;
    Store.set('iot', iotState);
    if (e.target.checked && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => showToast(`📍 Ubicación guardada: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`),
        () => showToast('Permiso de ubicación necesario para Modo Bienvenida')
      );
    }
  });

  div.querySelector('#geofenceRadius')?.addEventListener('input', (e) => {
    iotState.geofenceRadius = parseInt(e.target.value);
    div.querySelector('#geofenceRadiusLabel').textContent = e.target.value + 'm';
    Store.set('iot', iotState);
  });

  return div;
};

/* ─── SCREEN: LOYALTY ─── */
screens.loyalty = () => {
  const div = document.createElement('div');
  div.className = 'pwa-screen';
  const profile = getProfile();
  const level = LEVELS.find(l => profile.points >= l.min && profile.points <= l.max) || LEVELS[0];
  const nextLevel = LEVELS[LEVELS.indexOf(level) + 1];
  const progress = nextLevel ? Math.round((profile.points - level.min) / (nextLevel.min - level.min) * 100) : 100;

  div.innerHTML = `
    <div class="loyalty-hero">
      <div class="loyalty-level-display">${level.emoji}</div>
      <h2 class="loyalty-name">${level.name}</h2>
      <p class="loyalty-pts-display">${profile.points.toLocaleString('es-AR')} puntos KIUT Family</p>
      <div class="loyalty-progress-bar"><div class="loyalty-progress-fill" style="width:${progress}%"></div></div>
      <p class="loyalty-progress-label">${nextLevel ? `${(nextLevel.min - profile.points).toLocaleString('es-AR')} pts para ${nextLevel.emoji} ${nextLevel.name}` : '¡Nivel máximo alcanzado! 🎉'}</p>
    </div>

    <h3 class="home-section-title">Tus Recompensas</h3>
    <div class="rewards-grid">
      <div class="reward-card ${profile.points >= 200 ? '' : 'locked'}">
        <span class="reward-emoji">🚚</span>
        <p class="reward-name">Envío Gratis</p>
        <p class="reward-pts">${profile.points >= 200 ? '¡Activo!' : '200 pts'}</p>
      </div>
      <div class="reward-card ${profile.points >= 500 ? '' : 'locked'}">
        <span class="reward-emoji">🎁</span>
        <p class="reward-name">Sample Gratis</p>
        <p class="reward-pts">${profile.points >= 500 ? 'Canjear →' : '500 pts'}</p>
      </div>
      <div class="reward-card ${profile.points >= 1000 ? '' : 'locked'}">
        <span class="reward-emoji">💎</span>
        <p class="reward-name">10% Descuento</p>
        <p class="reward-pts">${profile.points >= 1000 ? 'Canjear →' : '1000 pts'}</p>
      </div>
      <div class="reward-card ${profile.points >= 1500 ? '' : 'locked'}">
        <span class="reward-emoji">🎂</span>
        <p class="reward-name">Vela de Cumpleaños</p>
        <p class="reward-pts">${profile.points >= 1500 ? 'Nivel Sanctuary' : '1500 pts'}</p>
      </div>
    </div>

    <h3 class="home-section-title">Subir Foto UGC</h3>
    <div class="ugc-upload-area" id="ugcUploadArea">
      <input type="file" id="ugcInput" accept="image/*" capture="camera" style="display:none">
      <span class="ugc-upload-icon">📸</span>
      <p class="ugc-upload-title">¿Tenés una vela KIUT en casa?</p>
      <p class="ugc-upload-sub">Subí una foto y ganás puntos instantáneos</p>
      <span class="ugc-pts-badge">⭐ +200 puntos</span>
    </div>

    <h3 class="home-section-title">Historial de Puntos</h3>
    <div class="history-list">
      ${(profile.pointsHistory || []).slice(0, 10).map(h => `
        <div class="history-item">
          <div>
            <p class="history-reason">${h.reason}</p>
            <p class="history-date">${new Date(h.date).toLocaleDateString('es-AR')}</p>
          </div>
          <span class="history-pts positive">+${h.pts}</span>
        </div>
      `).join('') || '<p style="color:var(--text-muted);font-size:0.85rem;padding:12px 0">Sin movimientos aún. ¡Empezá a acumular puntos!</p>'}
    </div>

    <div style="margin-top:20px">
      ${LEVELS.map((l, i) => `
        <div class="pwa-card" style="margin-bottom:12px;border-color:${l.color};border-left:4px solid ${l.color}">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <p style="font-family:var(--font-serif);font-size:1.1rem">${l.emoji} ${l.name}</p>
            <span style="font-size:0.75rem;color:var(--text-muted)">${l.min === 0 ? '0' : l.min.toLocaleString('es-AR')}${l.max === Infinity ? '+' : ' – ' + l.max.toLocaleString('es-AR')} pts</span>
          </div>
          <ul style="font-size:0.8rem;color:var(--text-secondary);list-style:none">
            ${l.perks.map(p => `<li>✓ ${p}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
  `;

  // UGC Upload
  const ugcArea = div.querySelector('#ugcUploadArea');
  const ugcInput = div.querySelector('#ugcInput');
  ugcArea.addEventListener('click', () => ugcInput.click());
  ugcInput.addEventListener('change', () => {
    if (ugcInput.files.length) {
      const profile = getProfile();
      profile.points += 200;
      profile.pointsHistory = profile.pointsHistory || [];
      profile.pointsHistory.unshift({ pts: 200, reason: 'Foto UGC subida ✨', date: new Date().toISOString() });
      saveProfile(profile);
      showToast('⭐ +200 puntos por tu foto! Gracias por compartir ✨');
      setTimeout(() => navigate('loyalty'), 1000);
    }
  });

  return div;
};

/* ─── SCREEN: QUIZ MOBILE ─── */
const QUIZ_QUESTIONS = [
  { id: 0, question: '¿Qué momento del día te inspira más?', sub: 'Cada momento tiene su aroma ideal', options: [{ v: 'manana', l: 'Mañana fresca', e: '☀️' }, { v: 'tarde', l: 'Tarde soleada', e: '🌤️' }, { v: 'noche', l: 'Noche con velas', e: '🕯️' }, { v: 'gym', l: 'Post-gym', e: '💪' }] },
  { id: 1, question: '¿Qué emoción querés en tu hogar?', sub: 'Los aromas transforman emociones', options: [{ v: 'energia', l: 'Energía', e: '⚡' }, { v: 'calma', l: 'Calma', e: '🕊️' }, { v: 'romantico', l: 'Romance', e: '🌹' }, { v: 'focus', l: 'Focus', e: '🧠' }] },
  { id: 2, question: '¿Cuál es tu espacio favorito?', sub: 'El ambiente define el aroma perfecto', options: [{ v: 'minimalista', l: 'Minimalista', e: '🏠' }, { v: 'natural', l: 'Natural con plantas', e: '🌿' }, { v: 'industrial', l: 'Industrial', e: '🪵' }, { v: 'ecletico', l: 'Ecléctico', e: '🎨' }] },
  { id: 3, question: '¿Qué familia de aromas te atrae?', sub: 'Tu instinto olfativo sabe la respuesta', options: [{ v: 'floral', l: 'Flores y jardín', e: '🌸' }, { v: 'amaderado', l: 'Madera y tierra', e: '🌲' }, { v: 'especiado', l: 'Especias y calidez', e: '🫚' }, { v: 'fresco', l: 'Fresco y marino', e: '🌊' }] },
  { id: 4, question: '¿Con qué frecuencia usás velas?', sub: 'Para recomendarte el tamaño ideal', options: [{ v: 'diario', l: 'Todos los días', e: '🔥' }, { v: 'finde', l: 'Fines de semana', e: '📅' }, { v: 'ocasion', l: 'Ocasiones especiales', e: '✨' }, { v: 'primera', l: 'Primera vez', e: '🌱' }] }
];

const SCENT_PROFILES = {
  floral: { family: 'Olfativo Floral', emoji: '🌸', desc: 'Sos una persona sensible, creativa y romántica. Los aromas florales te conectan con la naturaleza y las emociones.', products: [0, 3] },
  amaderado: { family: 'Olfativo Amaderado', emoji: '🌲', desc: 'Buscás profundidad y autenticidad. Los aromas amaderados te dan calidez y conexión con lo esencial.', products: [1, 4] },
  especiado: { family: 'Olfativo Especiado', emoji: '🫚', desc: 'Tenés personalidad fuerte y apasionada. Los aromas especiados despiertan tu energía y creatividad.', products: [2, 1] },
  fresco: { family: 'Olfativo Fresco', emoji: '🌊', desc: 'Sos energético/a y vital. Los aromas frescos te mantienen activo/a y con la mente clara.', products: [3, 5] },
  oriental: { family: 'Olfativo Oriental', emoji: '🌙', desc: 'Sos misterioso/a y sofisticado/a. Los aromas orientales te transportan a experiencias sensoriales únicas.', products: [4, 1] }
};

screens.quiz = () => {
  const div = document.createElement('div');
  div.className = 'pwa-screen quiz-mobile-container';
  let currentQ = 0;
  const answers = {};

  const renderQuestion = () => {
    const q = QUIZ_QUESTIONS[currentQ];
    div.innerHTML = `
      <div class="quiz-mobile-progress">
        ${QUIZ_QUESTIONS.map((_, i) => `<div class="qm-step ${i < currentQ ? 'done' : i === currentQ ? 'active' : ''}"></div>`).join('')}
      </div>
      <p class="quiz-mobile-question">${q.question}</p>
      <p class="quiz-mobile-sub">${q.sub}</p>
      <div class="quiz-mobile-options">
        ${q.options.map(o => `
          <div class="qm-option ${answers[currentQ] === o.v ? 'selected' : ''}" data-val="${o.v}">
            <span class="qm-option-emoji">${o.e}</span>
            <span class="qm-option-label">${o.l}</span>
          </div>
        `).join('')}
      </div>
      <div class="quiz-mobile-nav">
        <button class="qm-nav-prev" ${currentQ === 0 ? 'disabled style="opacity:0.3"' : ''} id="qmPrev">←</button>
        <button class="qm-nav-next" ${answers[currentQ] === undefined ? 'disabled' : ''} id="qmNext">${currentQ < QUIZ_QUESTIONS.length - 1 ? 'Siguiente →' : 'Ver mi perfil'}</button>
      </div>
    `;

    div.querySelectorAll('.qm-option').forEach(opt => {
      opt.addEventListener('click', () => {
        answers[currentQ] = opt.dataset.val;
        div.querySelectorAll('.qm-option').forEach(o => o.classList.toggle('selected', o.dataset.val === opt.dataset.val));
        div.querySelector('#qmNext').disabled = false;
      });
    });

    div.querySelector('#qmNext').addEventListener('click', () => {
      if (currentQ < QUIZ_QUESTIONS.length - 1) { currentQ++; renderQuestion(); }
      else renderResult();
    });

    div.querySelector('#qmPrev').addEventListener('click', () => {
      if (currentQ > 0) { currentQ--; renderQuestion(); }
    });
  };

  const renderResult = () => {
    // Tally scores
    const scores = { floral: 0, amaderado: 0, especiado: 0, fresco: 0, oriental: 0 };
    const weights = { manana: { fresco: 2 }, tarde: { floral: 2 }, noche: { oriental: 2, amaderado: 1 }, gym: { fresco: 2 }, energia: { fresco: 1, especiado: 1 }, calma: { amaderado: 1, floral: 1 }, romantico: { floral: 2, oriental: 1 }, focus: { especiado: 1, fresco: 1 }, minimalista: { fresco: 1 }, natural: { floral: 2 }, industrial: { amaderado: 2 }, ecletico: { especiado: 2 }, floral: { floral: 3 }, amaderado: { amaderado: 3 }, especiado: { especiado: 3 }, fresco: { fresco: 3 }, diario: {}, finde: {}, ocasion: {}, primera: { floral: 1 } };
    Object.values(answers).forEach(val => {
      const w = weights[val] || {};
      Object.entries(w).forEach(([k, v]) => scores[k] = (scores[k] || 0) + v);
    });
    const topFamily = Object.entries(scores).sort((a,b) => b[1]-a[1])[0][0];
    const profile_result = SCENT_PROFILES[topFamily];
    const recommendedProducts = profile_result.products.map(i => PRODUCTS[i]).filter(Boolean);

    // Save to profile
    const profile = getProfile();
    profile.scentFamily = topFamily;
    profile.points = (profile.points || 0) + 100;
    profile.pointsHistory = profile.pointsHistory || [];
    profile.pointsHistory.unshift({ pts: 100, reason: 'Quiz completado', date: new Date().toISOString() });
    saveProfile(profile);

    div.innerHTML = `
      <div class="quiz-result-card">
        <span class="quiz-result-emoji">${profile_result.emoji}</span>
        <h2 class="quiz-result-family">${profile_result.family}</h2>
        <p class="quiz-result-desc">${profile_result.desc}</p>
        <p style="font-weight:600;margin-bottom:10px">Tus recomendaciones:</p>
        <div class="quiz-result-products">
          ${recommendedProducts.map(p => `
            <div class="qr-product">
              <img class="qr-product-img" src="${p.image}" alt="${p.name}" onerror="this.style.background='var(--border)'">
              <div>
                <p class="qr-product-name">${p.name}</p>
                <p class="qr-product-price">${p.type} · $${p.price.toLocaleString('es-AR')}</p>
              </div>
            </div>
          `).join('')}
        </div>
        <a href="../index.html#products" class="qr-cta">Ver colección completa →</a>
        <p style="font-size:0.75rem;color:var(--color-green);margin-top:12px">+100 pts por completar el quiz ⭐</p>
      </div>
      <button onclick="navigate('quiz')" style="width:100%;margin-top:12px;background:transparent;border:1.5px solid var(--border);border-radius:12px;padding:12px;color:var(--text-secondary);cursor:pointer">Repetir Quiz</button>
    `;
  };

  renderQuestion();
  return div;
};

/* ─── TOAST NOTIFICATIONS ─── */
const showToast = (msg) => {
  const existing = document.querySelector('.pwa-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'pwa-toast';
  toast.textContent = msg;
  toast.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%) translateY(20px);background:var(--text-primary);color:var(--bg-primary);padding:10px 20px;border-radius:40px;font-size:0.85rem;font-weight:500;z-index:1000;opacity:0;transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);white-space:nowrap;max-width:90vw;text-align:center;';
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = '1'; toast.style.transform = 'translateX(-50%) translateY(0)'; });
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(-50%) translateY(20px)'; setTimeout(() => toast.remove(), 300); }, 3000);
};

/* ─── INIT ─── */
const init = () => {
  // Service Worker registration
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').catch(e => console.warn('SW failed:', e));
  }

  // Navigation
  document.querySelectorAll('.pwa-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.screen));
  });

  // Back button
  document.getElementById('pwaBackBtn')?.addEventListener('click', () => navigate('home'));

  // Notification button
  document.getElementById('pwaNotifBtn')?.addEventListener('click', () => {
    if ('Notification' in window) Notification.requestPermission();
  });

  // PWA Install Prompt
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const prompt = document.getElementById('installPrompt');
    if (prompt) prompt.style.display = 'block';
  });
  document.getElementById('btnInstall')?.addEventListener('click', () => {
    if (deferredPrompt) { deferredPrompt.prompt(); deferredPrompt.userChoice.then(() => { deferredPrompt = null; document.getElementById('installPrompt').style.display = 'none'; }); }
  });
  document.getElementById('btnInstallDismiss')?.addEventListener('click', () => {
    document.getElementById('installPrompt').style.display = 'none';
  });

  // Handle deep-links via URL hash
  const hash = location.hash.replace('#', '');
  const validScreens = ['home', 'ar', 'inventory', 'iot', 'loyalty', 'quiz'];
  navigate(validScreens.includes(hash) ? hash : 'home');
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
