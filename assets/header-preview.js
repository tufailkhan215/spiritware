/**
 * header-preview.js — Mobile menu open/close for Sacred Rebel header.
 * Targets MobileMenuPreview, data-open-mobile-menu-preview, data-close-menu-preview.
 */
(function () {
  'use strict';

  var menu = document.getElementById('MobileMenuPreview');
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
    if (e.target.closest('[data-open-mobile-menu-preview]')) {
      e.preventDefault();
      openMenu();
    }
    if (e.target.closest('[data-close-menu-preview]')) {
      e.preventDefault();
      closeMenu();
    }
  });

  menu.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();
