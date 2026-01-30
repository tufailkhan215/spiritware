/**
 * theme.js - Global theme behavior (cart forms, global UI)
 */
(function () {
  'use strict';

  // Cart add from product card (AJAX or form submit)
  document.querySelectorAll('[data-product-card-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      if (window.theme && typeof window.theme.addToCart === 'function') {
        e.preventDefault();
        var formData = new FormData(form);
        window.theme.addToCart(formData);
      }
    });
  });
})();
