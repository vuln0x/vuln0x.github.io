(function () {
  'use strict';

  const STORAGE_KEY = 'cyber-ember-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleIcon(theme);
  }

  function updateToggleIcon(theme) {
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      const sun = btn.querySelector('[data-icon="sun"]');
      const moon = btn.querySelector('[data-icon="moon"]');
      if (sun && moon) {
        sun.classList.toggle('hidden', theme === 'dark');
        moon.classList.toggle('hidden', theme === 'light');
      }
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  function init() {
    const theme = getPreferredTheme();
    applyTheme(theme);

    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
