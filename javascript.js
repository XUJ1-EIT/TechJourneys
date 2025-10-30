;(function () {
  'use strict';

  const mainNav = document.getElementById('mainNav');
  const navToggle = document.getElementById('navToggle');
  const searchToggle = document.getElementById('searchToggle');
  const searchItem = document.querySelector('.search-item');
  const searchInput = document.getElementById('searchInput');
  const themeToggle = document.getElementById('themeToggle');

  // Dynamic search results container
  let searchResultsContainer = null;

  // Theme Toggle Functionality
  function initTheme() {
    // Get saved theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }

  // Initialize theme on page load
  initTheme();

  // Theme toggle event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Header: search toggle & mobile nav
  if (searchToggle) {
    searchToggle.addEventListener('click', (e) => {
      e.preventDefault();
      searchItem.classList.toggle('active');
      if (searchItem.classList.contains('active')) searchInput.focus(); else searchInput.blur();
    });
  }

  document.addEventListener('click', (e) => {
    if (!searchItem.contains(e.target) && searchItem.classList.contains('active')) {
      searchItem.classList.remove('active');
    }
  });

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      if (isOpen) searchItem.classList.remove('active');
    });
  }

  // Close mobile nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!mainNav || !mainNav.classList.contains('open')) return;
    const clickedInsideNav = mainNav.contains(e.target);
    const clickedToggle = navToggle && navToggle.contains(e.target);
    if (clickedInsideNav || clickedToggle) return;
    mainNav.classList.remove('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  });

  // Helpers
  function stripHTML(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  function truncateText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    let truncated = text.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > Math.floor(maxLength * 0.6)) truncated = truncated.slice(0, lastSpace);
    return truncated.trim() + '...';
  }

  // Featured posts: build slides & initialize slider
  if (typeof posts !== 'undefined') {
    const slidesContainer = document.getElementById('featuredSlides');
    if (slidesContainer) {
      const featuredPosts = posts.filter((p) => p.featured);
      if (featuredPosts.length === 0) slidesContainer.innerHTML = '<p>No featured posts available.</p>';
      else {
        featuredPosts.forEach((post) => {
          const slide = document.createElement('article');
          slide.classList.add('slide');
          // Get description from structured content or fallback to stripHTML for legacy posts
          const description = post.content && typeof post.content === 'object' && post.content.intro 
            ? post.content.intro 
            : stripHTML(post.content || '');
          slide.innerHTML = `
          <div class="slide-image">
            <a href="post.html?id=${post.id}"><img src="${post.image}" alt="${post.title}" /></a>
          </div>
          <div class="slide-content">
            <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
            <p>${truncateText(description, 250)}</p>
            <p class="post-meta">Category: <a href="categories.html?category=${encodeURIComponent(post.category)}">${post.category}</a> | ${new Date(post.date).toLocaleDateString()}</p>
          </div>
        `;
          slidesContainer.appendChild(slide);
        });
      }
      initializeSlider();
    }
  }

  // Slider logic: controls, autoplay, pause/resume
  function initializeSlider() {
    const slides = document.querySelector('.slides');
    const slideItems = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let index = 0;
    initializeSlider._intervalId = initializeSlider._intervalId || null;
    initializeSlider._listenersAdded = initializeSlider._listenersAdded || false;
    if (!slides || slideItems.length === 0) return;

    function showSlide(i) {
      if (i >= slideItems.length) index = 0;
      else if (i < 0) index = slideItems.length - 1;
      else index = i;
      slides.style.transform = `translateX(-${index * 100}%)`;
    }

    if (!initializeSlider._listenersAdded) {
      if (prevBtn) prevBtn.addEventListener('click', () => showSlide(index - 1));
      if (nextBtn) nextBtn.addEventListener('click', () => showSlide(index + 1));
      initializeSlider._listenersAdded = true;
    }

    if (initializeSlider._intervalId) {
      clearInterval(initializeSlider._intervalId);
      initializeSlider._intervalId = null;
    }
    initializeSlider._intervalId = setInterval(() => showSlide(index + 1), 5000);

    const sliderEl = document.querySelector('.slider');
    function stopAutoplay() {
      if (initializeSlider._intervalId) {
        clearInterval(initializeSlider._intervalId);
        initializeSlider._intervalId = null;
      }
    }
    function startAutoplay() {
      if (!initializeSlider._intervalId) initializeSlider._intervalId = setInterval(() => showSlide(index + 1), 5000);
    }

    if (sliderEl) {
      sliderEl.addEventListener('mouseenter', stopAutoplay);
      sliderEl.addEventListener('mouseleave', startAutoplay);
      sliderEl.addEventListener('focusin', stopAutoplay);
      sliderEl.addEventListener('focusout', startAutoplay);
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAutoplay(); else startAutoplay();
    });
  }

  // Full-width Latest Posts (image cards under featured)
  if (typeof posts !== 'undefined') {
    const latestFullContainer = document.getElementById('latestPostsFullContainer');
    const latestFullPagination = document.getElementById('latestFullPagination');
    if (latestFullContainer) {
      const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
      const PAGE_SIZE_FULL = 8;
      let currentFullPage = 1;
      const totalFullPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE_FULL));

      function renderFullPage(page) {
        currentFullPage = Math.min(Math.max(1, page), totalFullPages);
        latestFullContainer.innerHTML = '';
        const start = (currentFullPage - 1) * PAGE_SIZE_FULL;
        const pagePosts = sorted.slice(start, start + PAGE_SIZE_FULL);
        pagePosts.forEach((post) => {
          const card = document.createElement('article');
          card.className = 'post-card';
          // Get description from structured content or fallback to stripHTML for legacy posts
          const description = post.content && typeof post.content === 'object' && post.content.intro 
            ? post.content.intro 
            : stripHTML(post.content || '');
          card.innerHTML = `
          <img src="${post.image}" alt="${post.title}" loading="lazy" />
          <div class="card-body">
            <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
            <div class="meta"><a href="categories.html?category=${encodeURIComponent(post.category)}">${post.category}</a> | ${new Date(post.date).toLocaleDateString()}</div>
            <p class="excerpt">${description.substring(0, 140)}...</p>
          </div>
        `;
          latestFullContainer.appendChild(card);
        });
        renderFullPagination();
      }

      function renderFullPagination() {
        if (!latestFullPagination) return;
        latestFullPagination.innerHTML = '';
        const prev = document.createElement('button');
        prev.textContent = 'Prev';
        prev.disabled = currentFullPage === 1;
        prev.addEventListener('click', () => renderFullPage(currentFullPage - 1));
        latestFullPagination.appendChild(prev);
        const visible = 7;
        let start = Math.max(1, currentFullPage - Math.floor(visible / 2));
        let end = start + visible - 1;
        if (end > totalFullPages) {
          end = totalFullPages; start = Math.max(1, end - visible + 1);
        }
        for (let i = start; i <= end; i++) {
          const btn = document.createElement('button');
          btn.textContent = String(i);
          if (i === currentFullPage) btn.classList.add('active');
          btn.addEventListener('click', () => renderFullPage(i));
          latestFullPagination.appendChild(btn);
        }
        const next = document.createElement('button');
        next.textContent = 'Next';
        next.disabled = currentFullPage === totalFullPages;
        next.addEventListener('click', () => renderFullPage(currentFullPage + 1));
        latestFullPagination.appendChild(next);
      }
      renderFullPage(1);
    }
  }

  // Categories Page Rendering
  (function () {
    if (typeof posts === 'undefined') return;
    const container = document.getElementById('categoriesContainer');
    if (!container) return;
    const preferredOrder = ['Entra ID', 'Azure', 'Defender', 'PowerShell'];
    const dataCategories = Array.from(new Set(posts.map((p) => p.category)));
    const categories = preferredOrder.filter((c) => dataCategories.includes(c)).concat(dataCategories.filter((c) => !preferredOrder.includes(c)));
    const params = new URLSearchParams(window.location.search);
    const selected = params.get('category');
    function slugify(str) { return String(str).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, ''); }
    const byDateDesc = (a, b) => new Date(b.date) - new Date(a.date);

    // If a specific category is requested, show only that category (full list), with a back link
    if (selected) {
      const chosen = categories.find((c) => c === selected) || categories.find((c) => slugify(c) === slugify(selected));
      if (!chosen) {
        container.innerHTML = `<p>No category found for "${selected}". <a href="categories.html">Show all categories</a></p>`;
        return;
      }
  const catPosts = posts.filter((p) => p.category === chosen).sort(byDateDesc);
      // mark container for single-category styling
      container.classList.add('single-category-view');
      // Update the page H1 and document title to the chosen category for clarity
      try {
        const pageTitleEl = document.querySelector('main h1') || document.querySelector('h1');
        if (pageTitleEl) pageTitleEl.textContent = chosen;
        document.title = `Tech Journeys - ${chosen}`;
      } catch (e) {
        // ignore in environments where document isn't writable
      }

      // Render like All Posts: group by year and show title + date only
      const byYear = catPosts.reduce((acc, post) => {
        const year = new Date(post.date).getFullYear();
        (acc[year] = acc[year] || []).push(post);
        return acc;
      }, {});

      Object.keys(byYear).sort((a, b) => b - a).forEach((year) => {
        const section = document.createElement('section');
        section.className = 'year-section';
        const h2 = document.createElement('h2');
        h2.textContent = year;
        section.appendChild(h2);

        const ul = document.createElement('ul');
        ul.className = 'all-posts-list';

        byYear[year].forEach((post) => {
          const li = document.createElement('li');
          const dateStr = new Date(post.date).toLocaleDateString();
          li.innerHTML = `<a href="post.html?id=${encodeURIComponent(post.id)}">${post.title}</a> <span class="post-date">${dateStr}</span>`;
          ul.appendChild(li);
        });

        section.appendChild(ul);
        container.appendChild(section);
      });
      return;
    }

    // Default: render all categories (with optional 'More' links)
    categories.forEach((cat) => {
      const catPosts = posts.filter((p) => p.category === cat).sort(byDateDesc);
      if (catPosts.length === 0) return;
      const section = document.createElement('section');
      section.className = 'category-section';
      section.id = 'category-' + slugify(cat);
      const h2 = document.createElement('h2');
      h2.innerHTML = `${cat} <span class="category-count">(${catPosts.length})</span>`;
      section.appendChild(h2);
      const list = document.createElement('ul');
      list.className = 'category-list';
      const limit = 5;
      catPosts.slice(0, limit).forEach((post) => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="post.html?id=${encodeURIComponent(post.id)}">${post.title}</a>`;
        list.appendChild(li);
      });
      section.appendChild(list);
      if (catPosts.length > limit) {
        const more = document.createElement('a');
        more.className = 'more-btn';
        more.href = `categories.html?category=${encodeURIComponent(cat)}#category-${slugify(cat)}`;
        more.textContent = 'More →';
        section.appendChild(more);
      }
      container.appendChild(section);
    });
  })();

  // Live search: build results, keyboard navigation
  if (searchInput && typeof posts !== 'undefined') {
    searchResultsContainer = document.createElement('ul');
    searchResultsContainer.className = 'search-results';
    searchResultsContainer.style.display = 'none';
    searchItem.appendChild(searchResultsContainer);
    let results = [];
    let selectedIndex = -1;
    function renderResults(list) {
      searchResultsContainer.innerHTML = '';
      function escapeHtml(str) { return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;'); }
      if (list.length === 0) {
        const q = escapeHtml(searchInput.value || '');
        const li = document.createElement('li');
        li.className = 'search-result-item no-results';
        li.innerHTML = `No results for "<strong>${q}</strong>"`;
        searchResultsContainer.appendChild(li);
        selectedIndex = -1;
        searchResultsContainer.style.display = 'block';
        return;
      }
      list.forEach((p) => {
        const li = document.createElement('li');
        li.className = 'search-result-item';
        li.innerHTML = `<a href="post.html?id=${encodeURIComponent(p.id)}">${p.title}</a>`;
        li.addEventListener('click', () => { searchResultsContainer.style.display = 'none'; });
        searchResultsContainer.appendChild(li);
      });
      selectedIndex = -1;
      searchResultsContainer.style.display = 'block';
    }
    function doSearch(term) {
      const q = term.trim().toLowerCase();
      if (q.length === 0) { renderResults([]); return; }
      results = posts.filter((p) => { 
        // Get searchable text from structured content or fallback to stripHTML for legacy posts
        const contentText = p.content && typeof p.content === 'object' && p.content.intro 
          ? p.content.intro 
          : stripHTML(p.content || '');
        const hay = (p.title + ' ' + contentText + ' ' + p.category).toLowerCase(); 
        return hay.includes(q); 
      }).slice(0, 8);
      renderResults(results);
    }
    function debounce(fn, ms = 250) { let t = null; return function (...args) { if (t) clearTimeout(t); t = setTimeout(() => fn.apply(this, args), ms); }; }
    searchInput.addEventListener('input', debounce((e) => { doSearch(e.target.value); }, 240));
    searchInput.addEventListener('keydown', (e) => {
      const items = searchResultsContainer.querySelectorAll('.search-result-item');
      if (e.key === 'ArrowDown') { e.preventDefault(); selectedIndex = Math.min(selectedIndex + 1, items.length - 1); items.forEach((it, i) => it.classList.toggle('selected', i === selectedIndex)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); selectedIndex = Math.max(selectedIndex - 1, 0); items.forEach((it, i) => it.classList.toggle('selected', i === selectedIndex)); }
      else if (e.key === 'Enter') { if (selectedIndex >= 0 && items[selectedIndex]) { const anchor = items[selectedIndex].querySelector('a'); if (anchor) window.location = anchor.href; } }
      else if (e.key === 'Escape') searchResultsContainer.style.display = 'none';
    });
    document.addEventListener('click', (e) => { if (!searchItem.contains(e.target)) searchResultsContainer.style.display = 'none'; });
  }

  // Back-to-top button: inject and handle scroll/focus
  (function () {
    if (document.querySelector('.back-to-top')) return;
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.setAttribute('title', 'Back to top');
    btn.setAttribute('type', 'button');
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M6 15l6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    document.body.appendChild(btn);
    const SHOW_AFTER = 250;
    function onScroll() { const scrolled = window.scrollY || document.documentElement.scrollTop; if (scrolled > SHOW_AFTER) btn.classList.add('show'); else btn.classList.remove('show'); }
    function scrollToTop() {
      if ('scrollBehavior' in document.documentElement.style) window.scrollTo({ top: 0, behavior: 'smooth' });
      else {
        const start = window.scrollY || document.documentElement.scrollTop; let current = start; const step = () => { current = current - Math.max(12, Math.floor(current / 8)); window.scrollTo(0, current); if (current > 0) requestAnimationFrame(step); };
        requestAnimationFrame(step);
      }
    }
    btn.addEventListener('click', (e) => { e.preventDefault(); scrollToTop(); btn.blur(); });
    btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollToTop(); } });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', onScroll);
    onScroll();
  })();

  // Move only the H3 title above the image on small viewports (<=600px)
  // This is reversible: original positions are preserved and restored when viewport expands.
  function moveTitlesForMobile() {
    const BREAKPOINT = 600;
    const shouldMove = window.innerWidth <= BREAKPOINT;
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide) => {
      const content = slide.querySelector('.slide-content');
      const imgWrap = slide.querySelector('.slide-image');
      if (!content || !imgWrap) return;
      const title = content.querySelector('h3');
      if (!title) return;
      // store original place if not stored
      if (!title.__originalParent) {
        title.__originalParent = content;
        title.__originalNext = title.nextSibling;
      }
      if (shouldMove) {
        // move title before image wrapper
        if (imgWrap.previousSibling !== title) imgWrap.parentNode.insertBefore(title, imgWrap);
      } else {
        // restore to original position inside content
        if (title.__originalParent && title.parentNode !== title.__originalParent) {
          if (title.__originalNext) title.__originalParent.insertBefore(title, title.__originalNext);
          else title.__originalParent.appendChild(title);
        }
      }
    });
  }

  // debounce helper (reused locally to avoid global collisions)
  function debounceLocal(fn, ms = 120) { let t = null; return function (...args) { if (t) clearTimeout(t); t = setTimeout(() => fn.apply(this, args), ms); }; }

  // run on load and on resize
  window.addEventListener('load', moveTitlesForMobile);
  window.addEventListener('resize', debounceLocal(moveTitlesForMobile, 160));

})();