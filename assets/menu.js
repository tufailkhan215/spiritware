/**
 * menu.js - Mobile menu open/close
 */
(function () {
  'use strict';

  var openBtn = document.querySelector('[data-open-mobile-menu]');
  var closeBtns = document.querySelectorAll('[data-close-menu]');
  var menu = document.getElementById('MobileMenu');

  if (!menu) return;

  function openMenu() {
    menu.hidden = false;
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.hidden = true;
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openBtn) {
    openBtn.addEventListener('click', function () {
      openMenu();
    });
  }

  closeBtns.forEach(function (btn) {
    btn.addEventListener('click', closeMenu);
  });

  menu.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();
