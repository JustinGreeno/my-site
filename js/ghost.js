/* ghost.js — ghost design system core */
(function () {
  'use strict';

  const html = document.documentElement;

  /* ── AUTO ACTIVE NAV ─────────────────────────────── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.gn-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── SCROLL PROGRESS ─────────────────────────────── */
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.prepend(progressBar);

  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max > 0) {
      progressBar.style.transform = 'scaleX(' + (window.scrollY / max) + ')';
    }
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ── THEME BULB ──────────────────────────────────── */
  const BULB = '<svg class="bulb-icon" width="16" height="20" viewBox="0 0 16 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5.5 14.5c0-2.5-2.5-4.2-2.5-7a5 5 0 0 1 10 0c0 2.8-2.5 4.5-2.5 7h-5z"/><line x1="5.5" y1="17" x2="10.5" y2="17"/><line x1="6.5" y1="19" x2="9.5" y2="19"/><line class="bulb-ray bulb-ray-t" x1="8" y1="0.5" x2="8" y2="2"/><line class="bulb-ray bulb-ray-tr" x1="11.5" y1="1.5" x2="10.5" y2="2.8"/><line class="bulb-ray bulb-ray-tl" x1="4.5" y1="1.5" x2="5.5" y2="2.8"/></svg>';

  function applyTheme(t) {
    html.setAttribute('data-theme', t);
    localStorage.setItem('ghost-theme', t);
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.innerHTML = BULB;
      btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.classList.toggle('bulb-lit', t === 'light');
    });
  }

  applyTheme(localStorage.getItem('ghost-theme') || 'dark');

  document.addEventListener('click', e => {
    if (e.target.closest('#theme-toggle, .theme-toggle')) {
      applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    }
  });

  /* ── CUSTOM CURSOR ───────────────────────────────── */
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  if (!isTouch) {
    html.setAttribute('data-cursor', 'custom');

    const dot = document.createElement('div');
    dot.id = 'cursor-dot';
    document.body.appendChild(dot);

    const glowEl = document.getElementById('cursor-glow');
    if (glowEl) glowEl.hidden = true;

    document.addEventListener('mousemove', e => {
      dot.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
    });

    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; });
  }

  /* ── SCROLL REVEAL ───────────────────────────────── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  function initReveal() {
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
  }

  /* ── LIGHTBOX ────────────────────────────────────── */
  function openLightbox(images, startIdx) {
    let cur = startIdx;
    const total = images.length;

    const overlay = document.createElement('div');
    overlay.className = 'lb-overlay';

    const img = document.createElement('img');
    img.className = 'lb-img';

    const counter = document.createElement('div');
    counter.className = 'lb-counter';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lb-close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.innerHTML = '&times;';

    overlay.append(img, closeBtn);
    if (total > 1) overlay.append(counter);

    if (total > 1) {
      const prev = document.createElement('button');
      prev.className = 'lb-nav lb-prev';
      prev.setAttribute('aria-label', 'Previous');
      prev.innerHTML = '&#8592;';

      const next = document.createElement('button');
      next.className = 'lb-nav lb-next';
      next.setAttribute('aria-label', 'Next');
      next.innerHTML = '&#8594;';

      overlay.append(prev, next);
      prev.addEventListener('click', e => { e.stopPropagation(); show(cur - 1); });
      next.addEventListener('click', e => { e.stopPropagation(); show(cur + 1); });
    }

    function show(i) {
      cur = ((i % total) + total) % total;
      // grid images are small thumbnails; data-full points at the full-size copy
      img.src = images[cur].dataset.full || images[cur].src;
      img.alt = images[cur].alt || '';
      if (total > 1) counter.textContent = (cur + 1) + ' / ' + total;
    }

    function close() {
      overlay.classList.remove('open');
      overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
      document.removeEventListener('keydown', onKey);
    }

    function onKey(e) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft'  && total > 1) show(cur - 1);
      if (e.key === 'ArrowRight' && total > 1) show(cur + 1);
    }

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', onKey);

    show(cur);
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('open'));
  }

  function initLightboxes() {
    const photoItems = Array.from(document.querySelectorAll('.photo-item'));
    photoItems.forEach((el, i) => {
      el.addEventListener('click', () => openLightbox(photoItems, i));
    });

    const resumeThumb = document.getElementById('resume-thumb');
    if (resumeThumb) {
      resumeThumb.addEventListener('click', () => openLightbox([resumeThumb], 0));
    }
  }

  /* ── SEARCH ──────────────────────────────────────── */
  const INDEX = [
    { title: 'Home',                        page: 'index.html',     section: '',             kw: 'portfolio web developer designer nova scotia hire freelance available' },
    { title: 'Work',                         page: 'work.html',      section: 'Portfolio',    kw: 'work projects portfolio all client concept dev' },
    { title: 'Cumberland County Exhibition', page: 'work.html',      section: 'Client Work',  kw: 'cumberland county exhibition event schedules exhibitors horse registration vendor applications countdown 2025' },
    { title: "Nelly's Pugwash",              page: 'work.html',      section: 'Client Work',  kw: 'nellys pugwash restaurant site daily specials menus animation mobile' },
    { title: 'Sociables Pub',                page: 'work.html',      section: 'Concept',      kw: 'sociables pub menu events community' },
    { title: "Sheryl's Bakery",              page: 'work.html',      section: 'Concept',      kw: 'sheryls bakery menu gallery' },
    { title: "What's For Dinner",            page: 'work.html',      section: 'Concept',      kw: 'whats for dinner meal planning app' },
    { title: 'Darkness Blooms',              page: 'devlogs.html',   section: 'Solo Dev',     kw: 'darkness blooms unity c# retro rpg pixel art game development devlogs youtube twitch discord' },
    { title: 'Books',                        page: 'books.html',     section: 'Published',    kw: 'books published author writing amazon kindle paperback goodreads ebook' },
    { title: 'Untranslatable',               page: 'books.html',     section: 'Published',    kw: 'untranslatable words for the feelings we all know book language emotions amazon kindle goodreads 2026' },
    { title: 'Pixel Art Gallery',            page: 'pixel-art.html', section: 'Gallery',      kw: 'pixel art gallery aseprite animation sprites environments' },
    { title: 'Devlogs',                      page: 'devlogs.html',   section: 'Development',  kw: 'devlogs development progress game youtube characters story' },
    { title: 'About Justin',                 page: 'about.html',     section: 'About',        kw: 'about biography nova scotia counselor developer gardening education bcit ubc saint marys' },
    { title: 'Resume',                       page: 'resume.html',    section: 'Resume',       kw: 'resume experience education skills certifications download pdf print' },
    { title: 'Contact',                      page: 'contact.html',   section: 'Contact',      kw: 'contact email hire freelance linkedin instagram discord patreon' },
    { title: 'Games',                        page: 'games.html',     section: 'Play',         kw: 'games snake pacman colour code browser web games play interactive fun' },
    { title: 'Grove (Legacy Site)',          page: 'grove/index.html', section: 'Archive',    kw: 'grove archive legacy original old portfolio justingreeno' },
    { title: 'JavaScript / TypeScript',      page: 'resume.html',    section: 'Skills',       kw: 'javascript typescript es6 frontend programming' },
    { title: 'React / Vite / Node.js',       page: 'resume.html',    section: 'Skills',       kw: 'react vite nodejs express backend api component' },
    { title: 'HTML / CSS',                   page: 'resume.html',    section: 'Skills',       kw: 'html css responsive design accessibility web standards' },
    { title: 'Unity / C# / Pixel Art',       page: 'resume.html',    section: 'Skills',       kw: 'unity csharp game engine aseprite pixel art animation' },
    { title: 'Counseling / Harm Reduction',  page: 'resume.html',    section: 'Experience',   kw: 'counseling harm reduction addiction crisis intervention transitional housing intellectual disabilities' },
  ];

  function searchIndex(q) {
    const s = q.toLowerCase().trim();
    if (s.length < 2) return [];
    return INDEX.filter(item =>
      (item.title + ' ' + item.section + ' ' + item.kw).toLowerCase().includes(s)
    ).slice(0, 8);
  }

  function injectSearch() {
    const nav = document.querySelector('.gn .c');
    if (!nav || document.getElementById('search-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'search-btn';
    btn.className = 'search-btn';
    btn.setAttribute('aria-label', 'Search');
    btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="6" cy="6" r="4.5"/><line x1="9.5" y1="9.5" x2="14" y2="14"/></svg>';

    const toggle = nav.querySelector('#theme-toggle, .theme-toggle');
    if (toggle) {
      nav.insertBefore(btn, toggle);
    } else {
      nav.appendChild(btn);
    }

    const overlay = document.createElement('div');
    overlay.id = 'search-overlay';
    overlay.className = 'search-overlay';
    overlay.innerHTML = '<div class="search-box"><div class="search-input-wrap"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="5.5" cy="5.5" r="4"/><line x1="8.5" y1="8.5" x2="13" y2="13"/></svg><input type="text" id="search-input" placeholder="Search pages, skills, projects..." autocomplete="off" spellcheck="false"><kbd class="search-hint">ESC</kbd></div><ul id="search-results" class="search-results"></ul></div>';
    document.body.appendChild(overlay);

    const input   = document.getElementById('search-input');
    const results = document.getElementById('search-results');

    function openSearch()  { overlay.classList.add('open'); setTimeout(() => input.focus(), 40); }
    function closeSearch() { overlay.classList.remove('open'); input.value = ''; results.innerHTML = ''; }

    input.addEventListener('input', () => {
      const items = searchIndex(input.value);
      if (input.value.trim().length < 2) { results.innerHTML = ''; return; }
      results.innerHTML = items.length
        ? items.map(item => '<li><a href="' + item.page + '" class="sr-link"><span class="sr-section">' + item.section + '</span><span class="sr-title">' + item.title + '</span></a></li>').join('')
        : '<li class="sr-empty">No results.</li>';
    });

    btn.addEventListener('click', openSearch);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeSearch();
    });
  }

  /* ── MOBILE NAV ──────────────────────────────────── */
  function injectMobileNav() {
    const nav   = document.querySelector('.gn .c');
    const links = document.querySelector('.gn-links');
    if (!nav || !links || document.getElementById('nav-burger')) return;

    const burger = document.createElement('button');
    burger.id = 'nav-burger';
    burger.className = 'nav-burger';
    burger.setAttribute('aria-label', 'Open navigation');
    burger.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(burger);

    const overlay = document.createElement('div');
    overlay.id = 'nav-overlay';
    overlay.className = 'nav-overlay';

    const linksClone = links.cloneNode(true);
    linksClone.classList.remove('gn-links');
    linksClone.classList.add('nav-overlay-links');
    linksClone.removeAttribute('id');

    const closeBtn = document.createElement('button');
    closeBtn.className = 'nav-overlay-close';
    closeBtn.setAttribute('aria-label', 'Close navigation');
    closeBtn.innerHTML = '&times;';

    overlay.append(closeBtn, linksClone);
    document.body.appendChild(overlay);

    function openNav()  {
      overlay.classList.add('open');
      burger.classList.add('active');
      burger.setAttribute('aria-label', 'Close navigation');
      document.body.style.overflow = 'hidden';
    }
    function closeNav() {
      overlay.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-label', 'Open navigation');
      document.body.style.overflow = '';
    }

    burger.addEventListener('click', () => overlay.classList.contains('open') ? closeNav() : openNav());
    closeBtn.addEventListener('click', closeNav);
    overlay.addEventListener('click', e => { if (e.target.tagName === 'A') closeNav(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
  }

  /* ── YOUTUBE FACADES ─────────────────────────────── */
  function ytFallback() {
    const fallbacks = ['hqdefault', 'mqdefault', 'sddefault', 'default'];
    function attach(img) {
      if (img.dataset.ytFallback) return;
      img.dataset.ytFallback = '1';
      img.addEventListener('error', function () {
        const id = (this.closest('.yt-facade') || {}).dataset?.ytid;
        if (!id) return;
        const cur = (this.src.match(/\/(hqdefault|mqdefault|sddefault|default)\.jpg/) || [])[1] || 'hqdefault';
        const idx = fallbacks.indexOf(cur);
        if (idx < fallbacks.length - 1) {
          this.src = 'https://i.ytimg.com/vi/' + id + '/' + fallbacks[idx + 1] + '.jpg';
        }
      });
      if (img.complete && img.naturalWidth === 0 && img.src) img.dispatchEvent(new Event('error'));
    }
    document.querySelectorAll('.yt-facade img').forEach(attach);
    new MutationObserver(muts => {
      muts.forEach(m => m.addedNodes.forEach(n => {
        if (n.nodeType !== 1) return;
        (n.querySelectorAll ? n.querySelectorAll('.yt-facade img') : []).forEach(attach);
      }));
    }).observe(document.body, { childList: true, subtree: true });
  }

  document.addEventListener('click', e => {
    const facade = e.target.closest('.yt-facade');
    if (!facade) return;
    const id = facade.dataset.ytid;
    if (!id) return;

    const iframe = document.createElement('iframe');
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.setAttribute('allowfullscreen', '');
    iframe.title = 'YouTube video player';
    iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0';
    iframe.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';

    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:absolute;inset:0;background:#000';
    wrap.appendChild(iframe);

    facade.parentNode.insertBefore(wrap, facade);
    facade.remove();
  });

  /* ── VIDEO TOGGLES ───────────────────────────────── */
  document.addEventListener('click', e => {
    const btn = e.target.closest('.video-toggle');
    if (!btn) return;
    const target = document.getElementById(btn.dataset.target);
    if (!target) return;
    const isOpen = target.classList.toggle('open');
    const label = btn.querySelector('.vt-label');
    if (label) label.textContent = isOpen ? 'Hide Video' : 'Watch Video';
  });

  /* ── INIT ────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initReveal();
      initLightboxes();
      injectSearch();
      injectMobileNav();
      ytFallback();
    });
  } else {
    initReveal();
    initLightboxes();
    injectSearch();
    injectMobileNav();
    ytFallback();
  }

})();
