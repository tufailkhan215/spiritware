/**
 * Header 1 (Sacred Rebel) — SACRED_REBEL_HOMEPAGE_PROMPT.md §2
 * - Scroll: add .header-1--scrolled for solid background (transition-all duration-500).
 * - Mobile menu: open/close overlay and drawer.
 * - Desktop dropdowns: keyboard (Escape to close, aria-expanded sync).
 */

(function () {
  const HEADER_SCROLL_THRESHOLD = 24;

  function initDesktopDropdowns() {
    const nav = document.querySelector('.header-1__nav');
    if (!nav) return;

    const items = nav.querySelectorAll('.header-1__nav-item[data-header-dropdown]');
    items.forEach(function (item) {
      const trigger = item.querySelector('.header-1__nav-link[aria-controls]');
      const panel = trigger ? document.getElementById(trigger.getAttribute('aria-controls')) : null;
      if (!trigger || !panel) return;

      function setExpanded(open) {
        const value = open ? 'true' : 'false';
        trigger.setAttribute('aria-expanded', value);
        item.setAttribute('aria-expanded', value);
      }

      item.addEventListener('focusin', function () {
        setExpanded(true);
      });

      item.addEventListener('focusout', function (e) {
        if (!item.contains(e.relatedTarget)) setExpanded(false);
      });

      item.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        setExpanded(false);
        trigger.focus();
      });
    });
  }

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
      initDesktopDropdowns();
    });
  } else {
    initHeader1();
    initMobileMenu();
    initDesktopDropdowns();
  }
})();
