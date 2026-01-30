/**
 * filters.js - Collection filters: update URL or form submit
 */
(function () {
  'use strict';

  var form = document.getElementById('FilterForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var params = new URLSearchParams(window.location.search);
    var tags = [];
    form.querySelectorAll('input[name="filter[]"]:checked').forEach(function (cb) {
      tags.push(cb.value);
    });
    if (tags.length) {
      params.set('constraint', tags.join('+'));
    } else {
      params.delete('constraint');
    }
    window.location.search = params.toString();
  });

  var sortSelect = document.getElementById('SortBy');
  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      var url = new URL(window.location.href);
      url.searchParams.set('sort_by', this.value);
      window.location.href = url.toString();
    });
  }

  var viewToggle = document.querySelector('.view-toggle');
  if (viewToggle) {
    viewToggle.querySelectorAll('[data-view]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var view = this.getAttribute('data-view');
        var grid = document.querySelector('[data-collection-products]');
        if (grid) {
          grid.classList.remove('collection-products--grid', 'collection-products--list');
          grid.classList.add('collection-products--' + view);
        }
        viewToggle.querySelectorAll('[data-view]').forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        btn.classList.add('active');
      });
    });
  }

  var filterToggle = document.querySelector('[data-filter-toggle]');
  var sidebar = document.querySelector('[data-filter-sidebar]');
  if (filterToggle && sidebar) {
    filterToggle.addEventListener('click', function () {
      var open = sidebar.style.display !== 'none' && sidebar.style.display !== '';
      sidebar.style.display = open ? 'none' : 'block';
      filterToggle.setAttribute('aria-expanded', !open);
    });
  }
})();
