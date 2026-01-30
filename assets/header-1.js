/**
 * header-1.js — Mobile menu open/close for Sacred Rebel header.
 * Targets MobileMenu1, data-open-mobile-menu-1, data-close-menu-1.
 */
(function () {
  'use strict';

  var menu = document.getElementById('MobileMenu1');
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

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-open-mobile-menu-1]')) {
      e.preventDefault();
      openMenu();
    }
    if (e.target.closest('[data-close-menu-1]')) {
      e.preventDefault();
      closeMenu();
    }
  });

  menu.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();
