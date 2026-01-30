/**
 * Header 1 (Sacred Rebel) — SACRED_REBEL_HOMEPAGE_PROMPT.md §2
 * - Scroll: add .header-1--scrolled for solid background (transition-all duration-500).
 * - Mobile menu: open/close overlay and drawer.
 */

(function () {
  const HEADER_SCROLL_THRESHOLD = 24;

  function initHeader1() {
    const header = document.getElementById('header-1');
    if (!header) return;

    const scrolledClass = 'header-1--scrolled';
    const useScrolledBg = header.closest('.section-header-1')?.querySelector('[data-header-scrolled-bg]') !== null;
    const settingsEl = document.querySelector('[data-section-id]');
    // Section might expose setting via data attr; if not, assume true
    const enableScrolledBg = header.dataset.scrolledBg !== 'false';

    function updateScrolled() {
      if (!enableScrolledBg) return;
      if (window.scrollY > HEADER_SCROLL_THRESHOLD) {
        header.classList.add(scrolledClass);
      } else {
        header.classList.remove(scrolledClass);
      }
    }

    window.addEventListener('scroll', updateScrolled, { passive: true });
    updateScrolled();
  }

  function initMobileMenu() {
    const toggle = document.querySelector('.header-1__menu-toggle');
    const overlay = document.querySelector('.header-1-mobile-overlay');
    const drawer = document.getElementById('header-1-mobile');
    const closeBtn = document.querySelector('.header-1-mobile__close');

    if (!toggle || !overlay || !drawer) return;

    function open() {
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      drawer.removeAttribute('hidden');
      drawer.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-controls', 'header-1-mobile');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      drawer.setAttribute('hidden', '');
      drawer.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function () {
      if (toggle.getAttribute('aria-expanded') === 'true') close();
      else open();
    });

    closeBtn?.addEventListener('click', close);
    overlay.addEventListener('click', close);

    drawer.querySelectorAll('.header-1-mobile__link').forEach(function (link) {
      link.addEventListener('click', close);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initHeader1();
      initMobileMenu();
    });
  } else {
    initHeader1();
    initMobileMenu();
  }
})();
