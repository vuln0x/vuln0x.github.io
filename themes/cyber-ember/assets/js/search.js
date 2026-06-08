(function () {
  'use strict';

  let pagefindLoaded = false;

  async function loadPagefind() {
    if (pagefindLoaded) return window.pagefind;
    const script = document.createElement('script');
    script.src = '/pagefind/pagefind-ui.js';
    script.type = 'module';
    document.head.appendChild(script);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/pagefind/pagefind-ui.css';
    document.head.appendChild(link);

    await new Promise((resolve) => { script.onload = resolve; });
    pagefindLoaded = true;
    return window.pagefind;
  }

  function createModal() {
    const overlay = document.createElement('div');
    overlay.id = 'search-modal';
    overlay.className = 'search-overlay hidden';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Search');
    overlay.innerHTML = `
      <div class="w-full max-w-2xl glass-card p-6 shadow-elevated">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-text-primary">Search</h2>
          <button id="search-close" class="text-text-muted hover:text-ember-primary transition-colors p-2" aria-label="Close search">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div id="pagefind-search"></div>
        <p class="text-xs text-text-muted mt-4 text-center">Press <kbd class="px-1.5 py-0.5 rounded bg-ember-card border border-ember-border text-xs">Ctrl</kbd> + <kbd class="px-1.5 py-0.5 rounded bg-ember-card border border-ember-border text-xs">K</kbd> to open</p>
      </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
  }

  async function openSearch() {
    let modal = document.getElementById('search-modal');
    if (!modal) modal = createModal();

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    await loadPagefind();

    if (!modal.dataset.initialized) {
      new window.PagefindUI({
        element: '#pagefind-search',
        showSubResults: true,
        resetStyles: false,
        bundlePath: '/pagefind/',
      });
      modal.dataset.initialized = 'true';
    }

    const input = modal.querySelector('input');
    if (input) setTimeout(() => input.focus(), 100);

    modal.querySelector('#search-close').onclick = closeSearch;
    modal.addEventListener('click', (e) => { if (e.target === modal) closeSearch(); });
  }

  function closeSearch() {
    const modal = document.getElementById('search-modal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  function init() {
    window.addEventListener('open-search', openSearch);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSearch();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
