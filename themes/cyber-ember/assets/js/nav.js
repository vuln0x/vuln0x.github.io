(function () {
  'use strict';

  function init() {
    const header = document.getElementById('site-header');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (header) {
      window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 10);
      }, { passive: true });
    }

    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => {
        const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', String(!expanded));
        mobileMenu.classList.toggle('hidden', expanded);
      });

      mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          menuBtn.setAttribute('aria-expanded', 'false');
          mobileMenu.classList.add('hidden');
        });
      });
    }

    document.querySelectorAll('[data-search-open]').forEach((btn) => {
      btn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('open-search'));
      });
    });

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('open-search'));
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
