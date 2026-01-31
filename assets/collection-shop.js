/**
 * Shop / Collection page: tab switching via Section Rendering API.
 * Intercepts nav link clicks, fetches collection content, replaces grid with animation.
 */
(function() {
  function initCollectionShop() {
    var contentEl = document.getElementById('shop-page-content');
    if (!contentEl) return;

    var sectionId = contentEl.getAttribute('data-section-id');
    if (!sectionId) return;

    var navLinks = contentEl.querySelectorAll('.shop-page__nav-link');
    var currentHandle = contentEl.getAttribute('data-collection-handle') || '';

    navLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        var href = link.getAttribute('href');
        if (!href || href === window.location.pathname) return;

        var url = new URL(href, window.location.origin);
        if (url.pathname === window.location.pathname && url.search === window.location.search) return;

        e.preventDefault();

        contentEl.classList.add('shop-page--loading');

        var fetchUrl = href.indexOf('?') !== -1 ? href + '&sections=' + encodeURIComponent(sectionId) : href + '?sections=' + encodeURIComponent(sectionId);

        fetch(fetchUrl, { headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' } })
          .then(function(res) { return res.json(); })
          .then(function(data) {
            var sectionHtml = data && data[sectionId];
            if (!sectionHtml) {
              window.location.href = href;
              return;
            }

            var temp = document.createElement('div');
            temp.innerHTML = sectionHtml;
            var newContent = temp.firstElementChild;
            if (!newContent) {
              window.location.href = href;
              return;
            }

            newContent.classList.add('shop-page--entering');
            contentEl.parentNode.replaceChild(newContent, contentEl);

            requestAnimationFrame(function() {
              newContent.classList.remove('shop-page--entering');
            });

            history.pushState({ collection: href }, '', href);

            if (document.title && newContent.querySelector('.shop-page__title')) {
              var titleEl = newContent.querySelector('.shop-page__title');
              if (titleEl) document.title = (titleEl.textContent || '').trim() + ' | ' + (document.title.split(' | ').pop() || '');
            }

            initSortSelect(newContent);
            initCollectionShop();
          })
          .catch(function() {
            window.location.href = href;
          });
      });
    });

    initSortSelect(contentEl);
  }

  function initSortSelect(container) {
    if (!container) container = document;
    var sortSelect = (container === document || !container.querySelector) ? document.getElementById('ShopSortBy') : container.querySelector('#ShopSortBy');
    if (!sortSelect) return;

    var params = new URLSearchParams(window.location.search);
    var sortBy = params.get('sort_by');
    if (sortBy && sortSelect.querySelector('option[value="' + sortBy + '"]')) {
      sortSelect.value = sortBy;
    }

    sortSelect.removeEventListener('change', sortSelect._shopSortHandler);
    sortSelect._shopSortHandler = function() {
      var url = new URL(window.location.href);
      url.searchParams.set('sort_by', this.value);
      window.location.href = url.toString();
    };
    sortSelect.addEventListener('change', sortSelect._shopSortHandler);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCollectionShop);
  } else {
    initCollectionShop();
  }

  window.addEventListener('popstate', function() {
    if (event.state && event.state.collection) {
      window.location.href = event.state.collection;
    }
  });
})();
