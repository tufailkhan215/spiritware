/**
 * predictive-search.js - Fetch suggest.json and render results dropdown
 */
(function () {
  'use strict';

  var input = document.querySelector('[data-predictive-search-input]');
  var resultsContainer = document.querySelector('[data-predictive-search-results]');
  if (!input || !resultsContainer || !window.routes || !window.routes.predictive_search_url) return;

  var debounceTimer;
  var debounceMs = 300;

  function buildSearchUrl(query) {
    var base = window.routes.predictive_search_url;
    var sep = base.indexOf('?') === -1 ? '?' : '&';
    return base + sep + 'q=' + encodeURIComponent(query) +
      '&resources[type]=product,article,page,collection' +
      '&resources[limit]=6' +
      '&resources[options][unavailable_products]=hide';
  }

  function formatMoney(cents) {
    if (typeof window.Shopify !== 'undefined' && window.Shopify.formatMoney) {
      return window.Shopify.formatMoney(cents);
    }
    return '$' + (cents / 100).toFixed(2);
  }

  function renderResults(data) {
    var results = data.resources && data.resources.results ? data.resources.results : {};
    var products = results.products || [];
    var articles = results.articles || [];
    var pages = results.pages || [];
    var collections = results.collections || [];
    var queries = results.queries || [];

    var html = '';
    if (products.length) {
      html += '<div class="predictive-search__group"><h3 class="predictive-search__heading">' + (window.predictiveSearchStrings && window.predictiveSearchStrings.products) + '</h3><ul class="predictive-search__list">';
      products.forEach(function (p) {
        var img = p.featured_image && p.featured_image.url ? '<img src="' + p.featured_image.url + '" alt="" width="48" height="48" loading="lazy" class="predictive-search__item-image" />' : '';
        var price = p.price_min != null ? formatMoney(Math.round(parseFloat(p.price_min) * 100)) : '';
        html += '<li class="predictive-search__item"><a href="' + (p.url || '#') + '" class="predictive-search__item-link">' + img + '<span class="predictive-search__item-content"><span class="predictive-search__item-title">' + (p.title || '') + '</span>' + (price ? '<span class="predictive-search__item-price">' + price + '</span>' : '') + '</span></a></li>';
      });
      html += '</ul></div>';
    }
    if (collections.length) {
      html += '<div class="predictive-search__group"><h3 class="predictive-search__heading">' + (window.predictiveSearchStrings && window.predictiveSearchStrings.collections) + '</h3><ul class="predictive-search__list">';
      collections.forEach(function (c) {
        html += '<li class="predictive-search__item"><a href="' + (c.url || '#') + '" class="predictive-search__item-link predictive-search__item-link--text"><span class="predictive-search__item-title">' + (c.title || '') + '</span></a></li>';
      });
      html += '</ul></div>';
    }
    if (articles.length) {
      html += '<div class="predictive-search__group"><h3 class="predictive-search__heading">' + (window.predictiveSearchStrings && window.predictiveSearchStrings.articles) + '</h3><ul class="predictive-search__list">';
      articles.forEach(function (a) {
        html += '<li class="predictive-search__item"><a href="' + (a.url || '#') + '" class="predictive-search__item-link predictive-search__item-link--text"><span class="predictive-search__item-title">' + (a.title || '') + '</span></a></li>';
      });
      html += '</ul></div>';
    }
    if (pages.length) {
      html += '<div class="predictive-search__group"><h3 class="predictive-search__heading">' + (window.predictiveSearchStrings && window.predictiveSearchStrings.pages) + '</h3><ul class="predictive-search__list">';
      pages.forEach(function (p) {
        html += '<li class="predictive-search__item"><a href="' + (p.url || '#') + '" class="predictive-search__item-link predictive-search__item-link--text"><span class="predictive-search__item-title">' + (p.title || '') + '</span></a></li>';
      });
      html += '</ul></div>';
    }
    if (queries.length) {
      html += '<div class="predictive-search__group"><h3 class="predictive-search__heading">' + (window.predictiveSearchStrings && window.predictiveSearchStrings.queries) + '</h3><ul class="predictive-search__list">';
      queries.forEach(function (q) {
        html += '<li class="predictive-search__item"><a href="' + (q.url || '#') + '" class="predictive-search__item-link predictive-search__item-link--text"><span class="predictive-search__item-title">' + (q.text || '') + '</span></a></li>';
      });
      html += '</ul></div>';
    }

    if (!html) {
      html = '<p class="predictive-search__empty">' + (window.predictiveSearchStrings && window.predictiveSearchStrings.no_results) + '</p>';
    }

    resultsContainer.innerHTML = html;
    resultsContainer.hidden = false;
  }

  function clearResults() {
    resultsContainer.innerHTML = '';
    resultsContainer.hidden = true;
  }

  function fetchResults(query) {
    query = (query || '').trim();
    if (query.length < 2) {
      clearResults();
      return;
    }
    var url = buildSearchUrl(query);
    if (window.shopUrl) {
      url = (url.indexOf('http') === 0 ? url : window.shopUrl + url);
    }
    fetch(url, { headers: { 'Accept': 'application/json' } })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.resources && data.resources.results) {
          renderResults(data);
        } else {
          clearResults();
        }
      })
      .catch(function () {
        clearResults();
      });
  }

  input.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    var q = input.value;
    debounceTimer = setTimeout(function () {
      fetchResults(q);
    }, debounceMs);
  });

  input.addEventListener('focus', function () {
    if (input.value.trim().length >= 2) {
      fetchResults(input.value);
    }
  });

  input.addEventListener('blur', function () {
    setTimeout(function () {
      var active = document.activeElement;
      if (!resultsContainer.contains(active) && active !== input) {
        clearResults();
      }
    }, 150);
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('[data-predictive-search]')) {
      clearResults();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      clearResults();
      input.blur();
    }
  });
})();
