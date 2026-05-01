(function () {
  var btn = document.querySelector('.nav-toggle');
  var backdrop = document.querySelector('.nav-backdrop');
  var nav = document.getElementById('site-nav');
  if (!btn || !nav) return;

  function isOpen() { return document.body.classList.contains('nav-open'); }
  function setOpen(open) {
    document.body.classList.toggle('nav-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  btn.addEventListener('click', function () { setOpen(!isOpen()); });
  if (backdrop) backdrop.addEventListener('click', function () { setOpen(false); });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
})();
