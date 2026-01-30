/**
 * slider.js - Hero slider: auto-play, dots, arrows
 */
(function () {
  'use strict';

  var slider = document.querySelector('[data-hero-slider]');
  if (!slider) return;

  var slides = slider.querySelectorAll('[data-slide]');
  var dots = slider.querySelectorAll('[data-dot-index]');
  var prevBtn = slider.querySelector('[data-slider-prev]');
  var nextBtn = slider.querySelector('[data-slider-next]');
  var current = 0;
  var total = slides.length;
  var interval;
  var delay = parseInt(slider.getAttribute('data-auto-play-delay') || '5', 10) * 1000;

  function goTo(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    current = index;
    slides.forEach(function (s, i) {
      s.removeAttribute('data-active');
      if (i === current) s.setAttribute('data-active', '');
    });
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === current);
      d.setAttribute('aria-label', 'Slide ' + (current + 1) + ' of ' + total);
    });
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    interval = setInterval(next, delay);
  }

  function stopAutoPlay() {
    if (interval) clearInterval(interval);
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { stopAutoPlay(); prev(); startAutoPlay(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { stopAutoPlay(); next(); startAutoPlay(); });
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      stopAutoPlay();
      goTo(i);
      startAutoPlay();
    });
  });

  if (total > 1) startAutoPlay();
})();
