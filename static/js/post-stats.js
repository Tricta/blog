(function () {
  var el = document.querySelector('.post-views');
  if (!el) return;

  var slug = el.dataset.slug;
  var abacusNs = el.dataset.abacusNs;
  var hasGiscus = el.dataset.giscus === '1';

  // ── Views via Abacus ────────────────────────────────────────────────
  if (slug && abacusNs) {
    var viewsEl = el.querySelector('.js-views');
    var key = 'views-' + slug;
    fetch('https://abacus.jasoncameron.dev/hit/' + encodeURIComponent(abacusNs) + '/' + encodeURIComponent(key))
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { if (viewsEl) viewsEl.textContent = (d && d.value != null) ? d.value : '0'; })
      .catch(function () { if (viewsEl) viewsEl.textContent = '0'; });
  }

  // ── Reactions count via Giscus IMetadataMessage ─────────────────────
  if (hasGiscus) {
    var reactionsEl = el.querySelector('.js-reactions');
    var reactBtn = el.querySelector('.post-views-react');

    window.addEventListener('message', function (event) {
      if (event.origin !== 'https://giscus.app') return;
      var data = event.data && event.data.giscus;
      if (!data || !data.discussion) return;
      if (reactionsEl) reactionsEl.textContent = data.discussion.reactionCount != null ? data.discussion.reactionCount : 0;
    });

    if (reactBtn) {
      reactBtn.addEventListener('click', function (e) {
        var target = document.getElementById('giscus-comments');
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        var iframe = target.querySelector('iframe.giscus-frame');
        if (iframe) setTimeout(function () { iframe.focus(); }, 400);
      });
    }
  }
})();
