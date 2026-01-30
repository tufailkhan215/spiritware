/**
 * product.js - Product form: variant change (price/image), thumbnail click, quantity, add to cart
 */
(function () {
  'use strict';

  var form = document.querySelector('[data-product-form]');
  if (!form) return;

  var mainImage = document.querySelector('[data-product-main-image] img');
  var thumbnails = form.querySelectorAll('[data-product-thumbnail]');
  var variantInput = form.querySelector('[data-variant-id]');
  var priceEl = document.querySelector('[data-product-price]');
  var addBtn = form.querySelector('[data-add-to-cart]');

  if (thumbnails.length) {
    thumbnails.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var img = thumb.querySelector('img');
        if (img && mainImage) {
          mainImage.src = img.src.replace(/\?\w+$/, '') + (img.src.indexOf('?') > -1 ? '' : '?');
          mainImage.src = img.src;
          thumbnails.forEach(function (t) { t.classList.remove('active'); });
          thumb.classList.add('active');
        }
      });
    });
  }

  form.querySelectorAll('[data-option-input]').forEach(function (input) {
    input.addEventListener('change', function () {
      var selectedOptions = [];
      form.querySelectorAll('[data-option-input]:checked').forEach(function (opt) {
        selectedOptions.push(opt.value);
      });
      if (window.productVariants) {
        var variant = window.productVariants.find(function (v) {
          return v.options && v.options.join('') === selectedOptions.join('');
        });
        if (variant && variantInput) {
          variantInput.value = variant.id;
          if (priceEl) {
            var priceSpan = priceEl.querySelector('.price');
            if (priceSpan) priceSpan.textContent = (variant.price / 100).toFixed(2);
          }
          if (addBtn) {
            addBtn.disabled = !variant.available;
            addBtn.textContent = variant.available ? (window.variantStrings && window.variantStrings.addToCart) || 'Add to cart' : (window.variantStrings && window.variantStrings.soldOut) || 'Sold out';
          }
        }
      }
    });
  });
})();
