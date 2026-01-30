/**
 * homepage-1.js - Spiritware style 1 homepage: scroll indicator, testimonial slider, Quick Add
 */
(function () {
  'use strict';

  // ----- Scroll indicator: hide after user scrolls -----
  var scrollIndicator = document.querySelector('[data-scroll-indicator]');
  if (scrollIndicator) {
    var scrollThreshold = 80;
    var ticking = false;
    function hideScrollIndicator() {
      if (window.scrollY > scrollThreshold) {
        scrollIndicator.setAttribute('aria-hidden', 'true');
        scrollIndicator.classList.add('hero-1__scroll--hidden');
      } else {
        scrollIndicator.setAttribute('aria-hidden', 'false');
        scrollIndicator.classList.remove('hero-1__scroll--hidden');
      }
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(hideScrollIndicator);
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    hideScrollIndicator();
  }

  // ----- Testimonial slider -----
  var slider = document.querySelector('[data-testimonial-slider-1]');
  if (slider) {
    var slides = slider.querySelectorAll('[data-slide]');
    var nav = slider.closest('.community-1') && slider.closest('.community-1').querySelector('[data-testimonial-nav-1]');
    var prevBtn = nav && nav.querySelector('[data-prev]');
    var nextBtn = nav && nav.querySelector('[data-next]');
    var dotsContainer = nav && nav.querySelector('[data-dots]');
    var currentIndex = 0;
    var total = slides.length;

    function setActive(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      currentIndex = index;
      slides.forEach(function (slide, i) {
        if (i === currentIndex) {
          slide.setAttribute('data-active', '');
          slide.classList.add('community-1__slide--active');
        } else {
          slide.removeAttribute('data-active');
          slide.classList.remove('community-1__slide--active');
        }
      });
      if (dotsContainer) {
        var dots = dotsContainer.querySelectorAll('.community-1__dot');
        dots.forEach(function (dot, i) {
          dot.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
          dot.classList.toggle('community-1__dot--active', i === currentIndex);
        });
      }
    }

    function goPrev() {
      setActive(currentIndex - 1);
    }
    function goNext() {
      setActive(currentIndex + 1);
    }

    if (prevBtn) prevBtn.addEventListener('click', goPrev);
    if (nextBtn) nextBtn.addEventListener('click', goNext);

    if (dotsContainer && total > 1) {
      for (var i = 0; i < total; i++) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'community-1__dot' + (i === 0 ? ' community-1__dot--active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1) + ' of ' + total);
        dot.setAttribute('aria-current', i === 0 ? 'true' : 'false');
        dot.dataset.index = i;
        dot.addEventListener('click', function () {
          setActive(parseInt(this.dataset.index, 10));
        });
        dotsContainer.appendChild(dot);
      }
    }

    setActive(0);
  }

  // ----- Quick Add: add variant to cart, then open cart drawer -----
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-quick-add-product]');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    var productId = btn.dataset.quickAddProduct;
    var variantId = btn.dataset.quickAddVariant;
    if (!productId || !variantId) return;

    var formData = new FormData();
    formData.append('id', variantId);
    formData.append('quantity', '1');

    if (!window.routes || !window.routes.cart_add_url) return;

    btn.disabled = true;
    btn.textContent = btn.dataset.addingText || 'Adding…';

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
        if (data.status && data.status !== 200) {
          throw new Error(data.description || 'Add to cart failed');
        }
        var itemCount = (data && data.item_count) || 0;
        if (window.theme && window.theme.cart && typeof window.theme.cart.onAdd === 'function') {
          window.theme.cart.onAdd({ item_count: itemCount });
        }
      })
      .catch(function () {
        if (window.routes && window.routes.cart_url) {
          formData.append('return_to', window.routes.cart_url);
          var form = document.createElement('form');
          form.method = 'POST';
          form.action = window.routes.cart_add_url;
          formData.forEach(function (value, key) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
          });
          document.body.appendChild(form);
          form.submit();
        }
      })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = btn.dataset.quickAddLabel || 'Quick Add';
      });
  });
})();
