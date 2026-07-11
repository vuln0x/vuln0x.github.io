(function () {

  'use strict';



  const DEFAULT_OFFSET = 88;



  function getHeaderOffset() {

    const value = getComputedStyle(document.documentElement).getPropertyValue('--header-offset').trim();

    if (value) {

      const parsed = parseFloat(value);

      if (!Number.isNaN(parsed)) {

        return value.endsWith('rem') ? parsed * 16 : parsed;

      }

    }

    const header = document.getElementById('site-header');

    return header ? header.offsetHeight + 16 : DEFAULT_OFFSET;

  }



  function scrollToHeading(id) {

    const target = document.getElementById(id);

    if (!target) return;

    const offset = getHeaderOffset();

    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });

  }



  function setActiveLink(id) {

    document.querySelectorAll('.toc-content a[href^="#"]').forEach((link) => {

      const linkId = link.getAttribute('href').slice(1);

      link.classList.toggle('toc-active', linkId === id);

    });

  }



  function handleTocClick(event) {

    const link = event.target.closest('.toc-content a[href^="#"]');

    if (!link) return;



    const id = link.getAttribute('href').slice(1);

    if (!id) return;



    const target = document.getElementById(id);

    if (!target) return;



    event.preventDefault();

    scrollToHeading(id);

    setActiveLink(id);



    if (window.history.replaceState) {

      window.history.replaceState(null, '', `#${id}`);

    }



    const mobileToc = link.closest('[data-toc-mobile]');

    if (mobileToc && mobileToc.open) {

      mobileToc.open = false;

    }

  }



  function initScrollSpy() {

    const headings = Array.from(document.querySelectorAll('.prose-ember :is(h2, h3, h4, h5, h6)[id]'));

    if (!headings.length) return;



    const observer = new IntersectionObserver(

      (entries) => {

        const visible = entries

          .filter((entry) => entry.isIntersecting)

          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {

          setActiveLink(visible[0].target.id);

        }

      },

      {

        rootMargin: `-${getHeaderOffset()}px 0px -60% 0px`,

        threshold: [0, 0.25, 0.5, 1],

      }

    );



    headings.forEach((heading) => observer.observe(heading));

  }



  function init() {

    document.querySelectorAll('.toc-content').forEach((toc) => {

      toc.addEventListener('click', handleTocClick);

    });



    if (window.location.hash) {

      const id = window.location.hash.slice(1);

      requestAnimationFrame(() => {

        scrollToHeading(id);

        setActiveLink(id);

      });

    }



    initScrollSpy();

  }



  if (document.readyState === 'loading') {

    document.addEventListener('DOMContentLoaded', init);

  } else {

    init();

  }

})();

