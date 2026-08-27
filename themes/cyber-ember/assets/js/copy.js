(function () {
  'use strict';

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } finally { document.body.removeChild(ta); }
    return Promise.resolve();
  }

  function flash(el, label) {
    const prev = el.getAttribute('data-label') || el.textContent;
    el.textContent = label;
    window.setTimeout(() => { el.textContent = prev; }, 1600);
  }

  function enhanceCodeBlocks() {
    document.querySelectorAll('.prose-ember pre, .terminal-window pre').forEach((pre) => {
      if (pre.parentElement && pre.parentElement.classList.contains('code-block')) return;
      const wrap = document.createElement('div');
      wrap.className = 'code-block';
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'code-copy';
      btn.setAttribute('data-label', 'Copy');
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code');
      btn.addEventListener('click', () => {
        const code = pre.querySelector('code');
        copyText((code || pre).innerText.replace(/\n$/, '')).then(() => flash(btn, 'Copied'));
      });
      wrap.appendChild(btn);
    });
  }

  function enhanceShareLinks() {
    document.querySelectorAll('[data-share-url]').forEach((el) => {
      el.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        e.stopPropagation();
        copyText(el.getAttribute('data-share-url') || el.href).then(() => {
          const prev = el.getAttribute('title');
          el.setAttribute('title', 'Link copied');
          el.classList.add('share-link-copied');
          window.setTimeout(() => {
            el.setAttribute('title', prev || 'Copy link to this page');
            el.classList.remove('share-link-copied');
          }, 1600);
        });
      });
    });
  }

  function init() {
    enhanceCodeBlocks();
    enhanceShareLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
