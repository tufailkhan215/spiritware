/**
 * cart-drawer.js - Open/close cart drawer, refresh content on add to cart
 */
(function () {
  'use strict';

  var drawer = document.getElementById('CartDrawer');
  var panel = document.getElementById('CartDrawerPanel');
  if (!drawer || !panel) return;

  function openDrawer() {
    drawer.hidden = false;
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.hidden = true;
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateCartCount(count) {
    var el = document.querySelector('[data-cart-count]');
    if (el) el.textContent = '(' + (count || 0) + ')';
  }

  function refreshDrawerContent() {
    if (!window.shopUrl || !window.routes) return;
    var url = window.shopUrl + '/?sections=cart-drawer';
    fetch(url)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var html = data['cart-drawer'] || data['cart_drawer'];
        if (html && panel) {
          panel.innerHTML = html;
        }
      })
      .catch(function () {});
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-open-cart-drawer]')) {
      e.preventDefault();
      openDrawer();
    }
    if (e.target.closest('[data-close-cart-drawer]')) {
      e.preventDefault();
      closeDrawer();
    }
  });

  drawer.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
  });

  window.theme = window.theme || {};
  window.theme.cart = window.theme.cart || {};
  window.theme.cart.openDrawer = openDrawer;
  window.theme.cart.closeDrawer = closeDrawer;
  window.theme.cart.updateCartCount = updateCartCount;
  window.theme.cart.onAdd = function (data) {
    updateCartCount(data.item_count);
    refreshDrawerContent();
    openDrawer();
  };
})();
