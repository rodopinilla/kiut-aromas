/* ============================================================
   KIUT AROMAS — Web Push Notifications Module
   ============================================================ */

'use strict';

window.KIUTWebPush = (() => {
  const PUBLIC_VAPID_KEY = 'KIUT_PUBLIC_VAPID_KEY_PLACEHOLDER';

  const isSupported = () => 'serviceWorker' in navigator && 'PushManager' in window;

  const requestPermission = async () => {
    if (!isSupported()) return false;
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      await subscribeUser();
      return true;
    }
    return false;
  };

  const subscribeUser = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      let subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        console.log('Subscripción Web Push lista para activar con el servidor Backend elegido.');
      }
      localStorage.setItem('kiut_webpush_subscribed', 'true');
    } catch (err) {
      console.warn('Web Push subscription error:', err);
    }
  };

  const init = () => {
    if (isSupported() && !localStorage.getItem('kiut_webpush_subscribed')) {
      setTimeout(() => {
        if (Notification.permission === 'default') {
          showNotificationBanner();
        }
      }, 10000);
    }
  };

  const showNotificationBanner = () => {
    if (document.getElementById('webPushBanner')) return;
    const banner = document.createElement('div');
    banner.id = 'webPushBanner';
    banner.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--color-gold, #C9A84C);
      border-radius: 16px;
      padding: 16px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.15);
      z-index: 999;
      max-width: 320px;
      font-family: var(--font-sans, sans-serif);
    `;
    banner.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <span style="font-size:1.5rem">🔔</span>
        <strong style="font-size:0.9rem;color:var(--text-primary, #1A0A00)">Recibe alertas de recarga</strong>
      </div>
      <p style="font-size:0.8rem;color:var(--text-secondary, #5C3D1E);margin-bottom:12px">Te avisamos antes de que se agote tu vela y cuando haya promociones B2B.</p>
      <div style="display:flex;gap:8px">
        <button id="webPushAccept" style="background:var(--color-amber, #8B4513);color:white;border:none;border-radius:8px;padding:6px 12px;font-size:0.8rem;cursor:pointer;font-weight:600">Activar</button>
        <button id="webPushDecline" style="background:transparent;color:var(--text-muted, #8B6F5A);border:none;padding:6px 12px;font-size:0.8rem;cursor:pointer">Ahora no</button>
      </div>
    `;
    document.body.appendChild(banner);

    document.getElementById('webPushAccept').onclick = async () => {
      await requestPermission();
      banner.remove();
    };
    document.getElementById('webPushDecline').onclick = () => {
      banner.remove();
    };
  };

  return { init, requestPermission };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.KIUTWebPush.init());
} else {
  window.KIUTWebPush.init();
}
