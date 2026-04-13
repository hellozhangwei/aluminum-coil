async function includeLayout() {
  const headerTarget = document.querySelector('[data-include="header"]');
  const footerTarget = document.querySelector('[data-include="footer"]');

  if (headerTarget) {
    const headerHtml = await fetch('/partials/header.html').then((r) => r.text());
    headerTarget.innerHTML = headerHtml;
  }

  if (footerTarget) {
    const footerHtml = await fetch('/partials/footer.html').then((r) => r.text());
    footerTarget.innerHTML = footerHtml;
  }

  const page = document.body.dataset.page;
  if (page) {
    const activeLink = document.querySelector(`[data-nav="${page}"]`);
    if (activeLink) activeLink.classList.add('active');
  }
}

includeLayout();
