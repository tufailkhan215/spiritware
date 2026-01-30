/**
 * cart.js - Add to cart, cart drawer/notification updates
 */
(function () {
  'use strict';

  if (!window.shopUrl || !window.routes) return;

  window.theme = window.theme || {};
  window.theme.cart = window.theme.cart || {};

  window.theme.addToCart = function (formData) {
    fetch(window.routes.cart_add_url, {
      method: 'POST',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json'
      }
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.status && data.status === 422) {
          if (window.cartStrings && window.cartStrings.quantityError) {
            alert(window.cartStrings.quantityError.replace('[quantity]', (data.description || '')));
          } else {
            alert('Error adding to cart.');
          }
          return;
        }
        if (document.querySelector('[href="' + window.routes.cart_url + '"]')) {
          document.querySelector('[href="' + window.routes.cart_url + '"]').textContent = 'Cart (' + (data.item_count || 0) + ')';
        }
        if (window.theme.cart.onAdd && typeof window.theme.cart.onAdd === 'function') {
          window.theme.cart.onAdd(data);
        }
      })
      .catch(function () {
        if (window.cartStrings && window.cartStrings.error) {
          alert(window.cartStrings.error);
        } else {
          alert('Error adding to cart.');
        }
      });
  };
})();
