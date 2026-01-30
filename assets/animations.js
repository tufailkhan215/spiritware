/**
 * animations.js - Optional scroll or entrance animations
 */
(function () {
  'use strict';

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -50px 0px', threshold: 0 });

  document.querySelectorAll('.section').forEach(function (section) {
    section.classList.add('animate-ready');
    observer.observe(section);
  });
})();
