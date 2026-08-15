/* ============================================================
   KIUT AROMAS — Lead Capture & Zero-Party Data Module
   Standalone module, included after app.js
   ============================================================ */

'use strict';

// This module augments the BehavioralTracker defined in app.js
// and provides additional lead capture utilities.

window.KIUTLeadCapture = (() => {
  const getProfile = () => JSON.parse(localStorage.getItem('kiut_profile') || '{}');
  const saveProfile = (p) => localStorage.setItem('kiut_profile', JSON.stringify(p));

  // Returns personalization data based on behavioral profile
  const getPersonalization = () => {
    const p = getProfile();
    const scentFamily = p.scentFamily;
    const viewedMost = p.viewedProducts?.[0];
    const timeInQuiz = p.sectionTime?.quiz || 0;
    const isReturning = p.lastVisit && new Date(p.lastVisit) < new Date(Date.now() - 24*3600*1000);
    return { scentFamily, viewedMost, timeInQuiz, isReturning };
  };

  // Dynamic hero subtitle personalization
  const personalizeHero = () => {
    const { scentFamily, isReturning } = getPersonalization();
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle || !isReturning) return;
    const messages = {
      floral: '¡Bienvenida de vuelta! Tus fragancias florales favoritas te esperan. 🌸',
      amaderado: '¡Bienvenido de vuelta! El sándalo y la tonka te están esperando. 🪵',
      fresco: '¡Hola de nuevo! Las fragancias frescas están listas para vos. 🌿',
      especiado: '¡Bienvenido/a! Tus aromas especiados favoritos te esperan. 🫚',
      oriental: '¡Hola! La colección oriental está esperándote. 🌙'
    };
    if (scentFamily && messages[scentFamily]) {
      subtitle.style.transition = 'opacity 0.5s ease';
      subtitle.style.opacity = '0';
      setTimeout(() => {
        subtitle.textContent = messages[scentFamily];
        subtitle.style.opacity = '1';
      }, 500);
    }
  };

  // Birthday notification
  const checkBirthday = () => {
    const p = getProfile();
    if (!p.birthday) return;
    const today = new Date();
    const bday = new Date(p.birthday);
    if (today.getMonth() === bday.getMonth() && today.getDate() === bday.getDate()) {
      const banner = document.createElement('div');
      banner.className = 'birthday-banner';
      banner.innerHTML = `
        <div class="birthday-banner-inner container">
          🎂 <strong>¡Feliz cumpleaños!</strong> Tu vela de regalo te está esperando — 
          <a href="#contact">Contactanos para coordinar el retiro</a>
          <button class="birthday-close" onclick="this.closest('.birthday-banner').remove()">✕</button>
        </div>
      `;
      document.body.prepend(banner);
    }
  };

  const init = () => {
    personalizeHero();
    checkBirthday();
  };

  return { init, getPersonalization };
})();

// Auto-init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.KIUTLeadCapture.init());
} else {
  window.KIUTLeadCapture.init();
}
