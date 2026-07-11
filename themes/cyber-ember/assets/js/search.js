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

    await new Promise((resolve, reject) => {
      script.onload = () => {
        const started = Date.now();
        const waitForUI = () => {
          if (window.PagefindUI) {
            resolve();
            return;
          }
          if (Date.now() - started > 10000) {
            reject(new Error('PagefindUI failed to load'));
            return;
          }
          setTimeout(waitForUI, 50);
        };
        waitForUI();
      };
      script.onerror = () => reject(new Error('Failed to load Pagefind'));
    });
    pagefindLoaded = true;
    return window.pagefind;
  }

  function createModal() {
    const overlay = document.createElement('div');
    overlay.id = 'search-modal';
    overlay.className = 'search-overlay hidden';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Search');
    overlay.innerHTML = `
      <div class="search-panel" role="document">
        <div class="search-panel-header">
          <div class="search-panel-title">
            <svg class="search-panel-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <h2>Search</h2>
          </div>
          <button id="search-close" class="search-close-btn" aria-label="Close search">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="search-panel-body">
          <div id="pagefind-search"></div>
        </div>
        <p class="search-panel-footer">
          Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to open
        </p>
      </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
  }

  async function openSearch() {
    let modal = document.getElementById('search-modal');
    if (!modal) modal = createModal();

    modal.classList.remove('hidden');
    document.body.classList.add('search-open');
    document.body.style.overflow = 'hidden';

    try {
      await loadPagefind();
    } catch (err) {
      console.error(err);
      return;
    }

    if (!modal.dataset.initialized && window.PagefindUI) {
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
      document.body.classList.remove('search-open');
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
