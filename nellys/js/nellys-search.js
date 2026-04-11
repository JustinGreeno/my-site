/* Nelly's Grill & Dairy Bar - Live Search & Tag System */

// ── Mobile Hamburger Menu ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  var btn  = document.getElementById('nav-hamburger');
  var menu = document.getElementById('nav-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    var open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });
  // Close when clicking outside
  document.addEventListener('click', function(e) {
    if (menu.classList.contains('open') && !btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
  // Close on nav link click (mobile)
  menu.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
});

// ── Site Pages (for site-wide search) ───────────────────────
const SITE_PAGES = [
  { name: 'Contact Us',      desc: 'Phone number, address & directions', url: 'contact.html',  icon: '📞', keywords: ['contact','phone','call','address','map','directions','location','find','hours','open','closed'] },
  { name: 'Photos',          desc: 'Food photos & restaurant gallery',   url: 'photos.html',   icon: '📸', keywords: ['photos','pictures','gallery','images','see','look','food photos'] },
  { name: 'Weekly Specials', desc: 'Fish & Chips Thu, Seafood Fri & more', url: 'specials.html', icon: '⭐', keywords: ['specials','special','deals','deal','thursday','friday','saturday','sunday','weekly','bucket','seafood friday','fish and chips'] },
  { name: 'Our Menu',        desc: 'Full menu — seafood, chicken, burgers, pizza & more', url: 'menu.html', icon: '🍽️', keywords: ['menu','food','order','eat','full menu'] },
  { name: 'Home',            desc: "Nelly's Grill & Dairy Bar, West Pugwash NS", url: 'index.html', icon: '🏠', keywords: ['home','about','nellys',"nelly's",'grill','dairy bar','west pugwash','pugwash'] },
];

function searchPages(query) {
  const lower = query.toLowerCase().trim();
  if (lower.length < 2) return [];
  return SITE_PAGES.filter(p =>
    p.keywords.some(k => k.includes(lower) || lower.includes(k)) ||
    p.name.toLowerCase().includes(lower) ||
    p.desc.toLowerCase().includes(lower)
  );
}

// ── Tag Definitions ──────────────────────────────────────────
const TAG_DEFS = {
  fish:         { label: 'Fish / Seafood', icon: '🐟', color: '#0099b8', bg: '#e0f6fb' },
  chicken:      { label: 'Chicken',        icon: '🍗', color: '#c8630a', bg: '#fff0e0' },
  beef:         { label: 'Beef',           icon: '🥩', color: '#a32020', bg: '#fdeaea' },
  spicy:        { label: 'Spicy',          icon: '🌶️', color: '#d42020', bg: '#ffe8e8' },
  vegetarian:   { label: 'Vegetarian',     icon: '🥦', color: '#1e8a3e', bg: '#e6f7ec' },
};

// ── Broad Search Aliases ─────────────────────────────────────
// Searching any of these words expands to cover the listed tags/terms
const SEARCH_ALIASES = {
  fish:       ['fish', 'seafood', 'haddock', 'lobster', 'clam', 'scallop', 'chowder', 'atlantic'],
  seafood:    ['fish', 'seafood', 'haddock', 'lobster', 'clam', 'scallop', 'chowder', 'atlantic'],
  haddock:    ['fish', 'haddock', 'seafood'],
  lobster:    ['fish', 'lobster', 'seafood'],
  clam:       ['fish', 'clam', 'seafood'],
  scallop:    ['fish', 'scallop', 'seafood'],
  chowder:    ['fish', 'chowder', 'seafood'],
  shrimp:     ['fish', 'seafood'],
  chicken:    ['chicken'],
  wings:      ['chicken', 'wing'],
  wing:       ['chicken', 'wing'],
  bucket:     ['chicken'],
  beef:       ['beef', 'burger'],
  burger:     ['beef', 'burger'],
  hamburger:  ['beef', 'burger'],
  steak:      ['beef'],
  hotdog:     ['beef', 'hotdog'],
  hot_dog:    ['beef', 'hotdog'],
  pepperoni:  ['beef', 'pepperoni'],
  donair:     ['beef', 'donair'],
  spicy:      ['spicy'],
  hot:        ['spicy'],
  inferno:    ['spicy'],
  veggie:     ['vegetarian'],
  vegetarian: ['vegetarian'],
  veg:        ['vegetarian'],
  pizza:      ['pizza'],
  garlic:     ['garlic'],
  poutine:    ['poutine'],
  fries:      ['fries'],
  chips:      ['fries', 'fish'],
  salad:      ['salad'],
  wrap:       ['wrap'],
  sandwich:   ['sandwich', 'club', 'blt', 'western'],
  club:       ['club'],
  blt:        ['blt', 'bacon'],
  bacon:      ['bacon', 'blt'],
  kids:       ['kids', 'grilled cheese', 'hot dog'],
  dessert:    ['dessert', 'cake', 'pie', 'ice cream'],
  icecream:   ['ice cream', 'dessert'],
  drinks:     ['drink', 'beer', 'wine', 'pop', 'coffee', 'tea', 'milk', 'water'],
  beer:       ['beer', 'draught'],
  wine:       ['wine'],
  coffee:     ['coffee'],
  tea:        ['tea'],
  pop:        ['pop', 'soda'],
  mozza:      ['mozza', 'mozzarella'],
  pickle:     ['pickle'],
  onion:      ['onion rings', 'onion'],
  rings:      ['onion rings'],
};

// ── Full Menu Data with Tags ─────────────────────────────────
const MENU_DATA = [
  // SEAFOOD
  { name: 'Haddock & Fries (1 pc)', desc: 'Golden battered Atlantic haddock with fries', price: '$13-$14', tab: 'seafood', tags: ['fish'] },
  { name: 'Haddock & Fries (2 pc)', desc: 'Double the fish, double the delicious', price: '$16-$18', tab: 'seafood', tags: ['fish'] },
  { name: 'Pan Fried Haddock Dinner', desc: 'With fries or mash and veg', price: '$16-$19', tab: 'seafood', tags: ['fish'] },
  { name: 'Haddock Burger & Fries', desc: 'Fresh haddock on a bun with fries', price: '$12-$14', tab: 'seafood', tags: ['fish'] },
  { name: 'Scallops & Fries', desc: 'Fresh Nova Scotia scallops with fries', price: '$19-$24', tab: 'seafood', tags: ['fish'] },
  { name: 'Lobster Roll & Coleslaw', desc: 'Fresh Nova Scotia lobster on a toasted buttered roll', price: '$19', tab: 'seafood', tags: ['fish'] },
  { name: 'Clam Platter', desc: 'Five Islands clams and fries', price: '$19-$24', tab: 'seafood', tags: ['fish'] },
  { name: 'Seafood Platter', desc: 'Clams, scallops, haddock and fries. The works!', price: '$20-$26', tab: 'seafood', tags: ['fish'] },
  // CHICKEN
  { name: '2 pc Fried Chicken', desc: 'With fries or mash, potato and coleslaw', price: '$12-$14', tab: 'chicken', tags: ['chicken'] },
  { name: '3 pc Fried Chicken', desc: 'With fries or mash, potato and coleslaw', price: '$14-$16', tab: 'chicken', tags: ['chicken'] },
  { name: 'Chicken Tenders & Fries', desc: 'Crispy chicken tenders with fries', price: '$12-$14', tab: 'chicken', tags: ['chicken'] },
  { name: 'Crispy Chicken Burger & Fries', desc: 'Crispy chicken breast on a bun with fries', price: '$12-$14', tab: 'chicken', tags: ['chicken'] },
  { name: 'Bucket of Nelly\'s Fried Chicken', desc: '9 crispy chicken pieces, large fries, coleslaw and gravy', price: '$30-$39', tab: 'chicken', tags: ['chicken'] },
  // BURGERS
  { name: 'Classic Burger', desc: 'Fresh local beef, charbroiled to perfection', price: '$6-$7', tab: 'burgers', tags: ['beef'] },
  { name: 'Double Classic Burger', desc: 'Two patties for the hungry', price: '$8', tab: 'burgers', tags: ['beef'] },
  { name: 'Mozza & Mushroom Burger', desc: 'Topped with melted mozzarella and sauteed mushrooms', price: '$7-$8', tab: 'burgers', tags: ['beef'] },
  { name: 'Inferno Burger', desc: 'Banana peppers, sriracha mayo, lettuce, tomato and cheddar', price: '$7-$8', tab: 'burgers', tags: ['beef', 'spicy'] },
  { name: 'Jumbo Hotdog', desc: 'Classic jumbo dog with your choice of toppings', price: '$7-$8', tab: 'burgers', tags: ['beef'] },
  { name: "Nelly's Mess", desc: 'Ground beef and onions on mash or fries, topped with gravy and peas', price: '$12-$14', tab: 'burgers', tags: ['beef'] },
  { name: 'Club & Fries', desc: 'Classic triple-decker club sandwich with fries', price: '$15-$17', tab: 'burgers', tags: ['chicken', 'beef'] },
  { name: 'Toasted BLT & Fries', desc: 'Bacon, lettuce, tomato on toasted bread with fries', price: '$13-$14', tab: 'burgers', tags: ['beef'] },
  { name: 'Toasted Western & Fries', desc: 'Western sandwich on toasted bread with fries', price: '$13-$14', tab: 'burgers', tags: ['beef'] },
  { name: 'Hot Hamburger or Chicken & Fries', desc: 'Open-faced with gravy and fries', price: '$14-$16', tab: 'burgers', tags: ['beef', 'chicken'] },
  // PIZZA
  { name: 'Plain Pizza (Sauce & Cheese)', desc: 'Classic cheese pizza', price: '$9 / $13 / $17-18', tab: 'pizza', tags: ['vegetarian'] },
  { name: 'Meatlovers Pizza', desc: 'Pepperoni, bacon, salami, ground beef', price: '$14-15 / $21-23 / $26-28', tab: 'pizza', tags: ['beef'] },
  { name: 'Deluxe Pizza', desc: 'Pepperoni, bacon, green pepper, mushroom, onion', price: '$14-15 / $19-23 / $25-28', tab: 'pizza', tags: ['beef'] },
  { name: 'Hawaiian Pizza', desc: 'Ham, pineapple, green pepper', price: '$14-15 / $21-23 / $26-28', tab: 'pizza', tags: ['beef'] },
  { name: 'Vegetarian Pizza', desc: 'Tomato, onion, green pepper, mushroom, olive', price: '$13-15 / $21-23 / $26-28', tab: 'pizza', tags: ['vegetarian'] },
  { name: 'Donair Pizza', desc: 'East coast classic. Donair meat with sweet sauce.', price: '$13 / $21 / $26', tab: 'pizza', tags: ['beef', 'spicy'] },
  { name: 'Garlic Fingers', desc: 'Cheesy garlic goodness', price: '$9 / $14 / $18', tab: 'pizza', tags: ['vegetarian'] },
  // SNACKS
  { name: '1 lb Naked Chicken Wings', desc: 'A pound of crispy wings, naked or tossed in your choice of sauce', price: '$14-$16', tab: 'snacks', tags: ['chicken'] },
  { name: '2 lb Bucket of Naked Wings', desc: 'Two pounds of wings with 2 sauces', price: '$25-$28', tab: 'snacks', tags: ['chicken'] },
  { name: 'Hand Cut Fries', desc: 'Fresh cut and golden fried', price: '$6-$7', tab: 'snacks', tags: ['vegetarian'] },
  { name: 'Poutine', desc: 'Fries, cheese curds and gravy', price: '$9-$10', tab: 'snacks', tags: ['vegetarian'] },
  { name: 'Onion Rings', desc: 'Golden battered and crispy', price: '$7-$8', tab: 'snacks', tags: ['vegetarian'] },
  { name: 'Cheesy Mozza Sticks', desc: 'Breaded mozzarella sticks, golden fried', price: '$7-$8', tab: 'snacks', tags: ['vegetarian'] },
  { name: 'Deep Fried Dill Pickles', desc: 'Crispy fried pickle spears', price: '$7-$8', tab: 'snacks', tags: ['vegetarian'] },
  { name: 'Pub Style Deep Fried Pepperoni', desc: 'Nova Scotia classic!', price: '$7-$8', tab: 'snacks', tags: ['beef'] },
  // MORE
  { name: 'Seafood Chowder & Roll', desc: 'Lobster, scallops, shrimp and haddock in creamy chowder', price: '$15-$17', tab: 'more', tags: ['fish'] },
  { name: 'Tossed or Caesar Salad', desc: 'Fresh garden salad or classic Caesar', price: '$8-$11', tab: 'more', tags: ['vegetarian'] },
  { name: 'Chicken Caesar Wrap / Salad', desc: 'Grilled chicken with Caesar salad, wrapped or on a bed of greens', price: '$12-$15', tab: 'more', tags: ['chicken'] },
  { name: 'Grilled Cheese & Fries', desc: 'Classic grilled cheese with fries (kids)', price: '$8-$10', tab: 'more', tags: ['vegetarian'] },
  { name: 'Hot Dog & Fries', desc: 'Kid-sized hot dog with fries', price: '$8-$10', tab: 'more', tags: ['beef'] },
  { name: 'Chicken Tenders & Fries (Kids)', desc: 'Kid-sized chicken tenders with fries', price: '$8-$10', tab: 'more', tags: ['chicken'] },
  { name: 'Cake or Pie', desc: 'Ask your server for today\'s selection', price: '$5.50', tab: 'more', tags: ['vegetarian'] },
  { name: 'Coffee / Tea', desc: 'Fresh brewed', price: '$1.75-$2.00', tab: 'more', tags: ['vegetarian'] },
  { name: 'Hot Chocolate', desc: 'Rich and creamy', price: '$1.75', tab: 'more', tags: ['vegetarian'] },
  { name: 'Canned Pop / Water', desc: 'Assorted soft drinks and bottled water', price: '$1.75-$2.00', tab: 'more', tags: ['vegetarian'] },
  { name: 'Bottled Pop', desc: 'Larger size bottles', price: '$2.50-$3.00', tab: 'more', tags: ['vegetarian'] },
  { name: 'Milk', desc: 'Cold and fresh', price: '$2.60-$3.00', tab: 'more', tags: ['vegetarian'] },
  { name: 'Domestic Beer or Draught', desc: 'Ask about our selection', price: '$6.00', tab: 'more', tags: ['vegetarian'] },
  { name: 'House Wine', desc: 'Pinot Grigio White or Merlot Red', price: '$7.00', tab: 'more', tags: ['vegetarian'] },
];

// ── Search Helpers ───────────────────────────────────────────
function expandQuery(raw) {
  const lower = raw.toLowerCase().trim();
  const expanded = new Set([lower]);
  // Check each alias key
  Object.keys(SEARCH_ALIASES).forEach(key => {
    if (lower.includes(key) || key.includes(lower)) {
      SEARCH_ALIASES[key].forEach(t => expanded.add(t));
    }
  });
  return Array.from(expanded);
}

function itemMatchesQuery(item, terms) {
  const haystack = [
    item.name, item.desc, item.tab,
    ...item.tags,
    ...item.tags.map(t => TAG_DEFS[t] ? TAG_DEFS[t].label : t)
  ].join(' ').toLowerCase();

  return terms.some(term => haystack.includes(term));
}

function searchMenu(query) {
  if (!query || query.trim().length < 1) return [];
  const terms = expandQuery(query);
  return MENU_DATA.filter(item => itemMatchesQuery(item, terms));
}

// ── Tag Pill HTML ────────────────────────────────────────────
function tagPillHTML(tagKey, clickable = false) {
  const def = TAG_DEFS[tagKey];
  if (!def) return '';
  const cls = clickable ? 'tag-pill tag-pill--filter' : 'tag-pill';
  return `<span class="${cls}" data-tag="${tagKey}" style="background:${def.bg};color:${def.color};border-color:${def.color};">${def.icon} ${def.label}</span>`;
}

// ── Live Dropdown Search ─────────────────────────────────────
function initSearchBanner() {
  const banner = document.querySelector('.search-banner');
  if (!banner) return;

  const input = banner.querySelector('input[type="search"]');
  const button = banner.querySelector('button');
  if (!input) return;

  // Create dropdown container
  const dropdown = document.createElement('div');
  dropdown.className = 'search-dropdown';
  dropdown.setAttribute('role', 'listbox');
  dropdown.style.display = 'none';
  banner.style.position = 'relative';
  banner.appendChild(dropdown);

  let currentResults = [];
  let focusedIndex = -1;

  function isMenuPage() {
    return !!document.getElementById('menu-search');
  }

  function renderDropdown(query) {
    const menuResults = searchMenu(query);
    const pageResults = searchPages(query);
    currentResults = menuResults;
    focusedIndex = -1;

    if (!query || query.trim().length < 2) {
      dropdown.style.display = 'none';
      return;
    }

    if (menuResults.length === 0 && pageResults.length === 0) {
      dropdown.innerHTML = `<div class="search-dropdown__empty">No results for "<strong>${escHTML(query)}</strong>"</div>`;
      dropdown.style.display = 'block';
      return;
    }

    const encodedQ = encodeURIComponent(query);
    let html = '';

    // ── Page results ──
    if (pageResults.length > 0) {
      html += `<div class="search-dropdown__section">Pages</div>`;
      html += pageResults.map(p => `
        <a class="search-dropdown__page" href="${p.url}">
          <span class="search-dropdown__page-icon">${p.icon}</span>
          <div class="search-dropdown__page-body">
            <span class="search-dropdown__page-name">${escHTML(p.name)}</span>
            <span class="search-dropdown__page-desc">${escHTML(p.desc)}</span>
          </div>
          <span class="search-dropdown__page-arrow">&#8594;</span>
        </a>`).join('');
    }

    // ── Menu item results ──
    if (menuResults.length > 0) {
      html += `<div class="search-dropdown__section">Menu Items</div>`;
      const show = menuResults.slice(0, 6);
      const more = menuResults.length - show.length;

      html += show.map((item, i) => {
        const tagsHTML = item.tags.map(t => tagPillHTML(t)).join('');
        return `
          <div class="search-dropdown__item" role="option" data-index="${i}" tabindex="-1">
            <div class="search-dropdown__item-left">
              <span class="search-dropdown__item-name">${escHTML(item.name)}</span>
              <span class="search-dropdown__item-desc">${escHTML(item.desc)}</span>
              <span class="search-dropdown__item-tags">${tagsHTML}</span>
            </div>
            <span class="search-dropdown__item-price">${escHTML(item.price)}</span>
          </div>`;
      }).join('');

      if (more > 0) {
        html += `<a class="search-dropdown__more" href="menu.html?q=${encodedQ}">See all ${menuResults.length} menu results &rarr;</a>`;
      } else {
        html += `<a class="search-dropdown__more" href="menu.html?q=${encodedQ}">View on menu page &rarr;</a>`;
      }
    }

    dropdown.innerHTML = html;
    dropdown.style.display = 'block';

    // Click handlers on menu items
    dropdown.querySelectorAll('.search-dropdown__item').forEach(el => {
      el.addEventListener('mousedown', function(e) {
        e.preventDefault();
        const idx = parseInt(this.dataset.index);
        const item = menuResults[idx];
        if (item) navigateToItem(item, query);
      });
    });
  }

  function navigateToItem(item, query) {
    if (isMenuPage()) {
      // Filter in-page
      const menuSearch = document.getElementById('menu-search');
      if (menuSearch) {
        menuSearch.value = query;
        menuSearch.dispatchEvent(new Event('input'));
        menuSearch.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      dropdown.style.display = 'none';
    } else {
      window.location.href = `menu.html?q=${encodeURIComponent(query)}`;
    }
  }

  // Keyboard navigation
  input.addEventListener('keydown', function(e) {
    const items = dropdown.querySelectorAll('.search-dropdown__item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusedIndex = Math.min(focusedIndex + 1, items.length - 1);
      items[focusedIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusedIndex = Math.max(focusedIndex - 1, -1);
      if (focusedIndex === -1) input.focus();
      else items[focusedIndex]?.focus();
    } else if (e.key === 'Escape') {
      dropdown.style.display = 'none';
      input.blur();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedIndex >= 0 && currentResults[focusedIndex]) {
        navigateToItem(currentResults[focusedIndex], input.value);
      } else {
        const q = input.value.trim();
        if (q) {
          if (isMenuPage()) navigateToItem(null, q);
          else window.location.href = `menu.html?q=${encodeURIComponent(q)}`;
        }
      }
    }
  });

  input.addEventListener('input', function() {
    renderDropdown(this.value.trim());
    // If on menu page, also update in-page filter live
    if (isMenuPage()) {
      const menuSearch = document.getElementById('menu-search');
      if (menuSearch) {
        menuSearch.value = this.value;
        menuSearch.dispatchEvent(new Event('input'));
      }
    }
  });

  // Hide on outside click
  document.addEventListener('mousedown', function(e) {
    if (!banner.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });

  input.addEventListener('focus', function() {
    if (this.value.trim().length >= 2) renderDropdown(this.value.trim());
  });

  // Button click
  if (button) {
    button.addEventListener('click', function(e) {
      const q = input.value.trim();
      if (!q) return;
      e.preventDefault();
      if (isMenuPage()) navigateToItem(null, q);
      else window.location.href = `menu.html?q=${encodeURIComponent(q)}`;
    });
    // Prevent form submit from navigating when on menu page
    const form = button.closest('form');
    if (form && isMenuPage()) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        navigateToItem(null, input.value.trim());
      });
    }
  }

  // Also wire the banner search button on menu page
  const bannerBtn = document.getElementById('search-banner-btn');
  const bannerInput2 = document.getElementById('search-banner-input');
  if (bannerBtn && bannerInput2) {
    bannerInput2.addEventListener('input', function() {
      input.value = this.value;
      renderDropdown(this.value.trim());
      if (isMenuPage()) {
        const menuSearch = document.getElementById('menu-search');
        if (menuSearch) {
          menuSearch.value = this.value;
          menuSearch.dispatchEvent(new Event('input'));
        }
      }
    });
    bannerBtn.addEventListener('click', function() {
      navigateToItem(null, bannerInput2.value.trim());
    });
  }
}

// ── Tag Pill Filter Bar (menu page only) ─────────────────────
function initTagFilters() {
  const filterBar = document.getElementById('tag-filter-bar');
  if (!filterBar) return;

  let activeTag = null;

  // Build pills — Full Menu button first, then tag filters
  filterBar.innerHTML =
    `<button class="tag-pill tag-pill--all active" id="full-menu-btn">🍽️ Full Menu</button>` +
    Object.entries(TAG_DEFS).map(([key, def]) =>
      `<button class="tag-pill tag-pill--filter" data-tag="${key}" style="background:${def.bg};color:${def.color};border-color:${def.color};">${def.icon} ${def.label}</button>`
    ).join('');

  function clearAllFilters() {
    activeTag = null;
    applyTagFilter(null);
    filterBar.querySelectorAll('.tag-pill--filter').forEach(b => b.classList.remove('active'));
    document.getElementById('full-menu-btn').classList.add('active');
  }

  document.getElementById('full-menu-btn').addEventListener('click', clearAllFilters);

  filterBar.querySelectorAll('.tag-pill--filter').forEach(btn => {
    btn.addEventListener('click', function() {
      const tag = this.dataset.tag;
      if (activeTag === tag) {
        clearAllFilters();
      } else {
        activeTag = tag;
        applyTagFilter(tag);
        filterBar.querySelectorAll('.tag-pill--filter').forEach(b => b.classList.remove('active'));
        document.getElementById('full-menu-btn').classList.remove('active');
        this.classList.add('active');
      }
    });
  });
}

function applyTagFilter(tag) {
  const allItems = document.querySelectorAll('.menu-item[data-tags]');
  const allSections = document.querySelectorAll('.menu-section');
  const tabs = document.querySelectorAll('.menu-tab');
  const tabsRow = document.getElementById('menu-tabs-row');
  const noResults = document.getElementById('menu-no-results');

  // Clear inline search
  const menuSearch = document.getElementById('menu-search');
  if (menuSearch) menuSearch.value = '';

  if (!tag) {
    // Restore all
    allItems.forEach(el => el.style.display = '');
    allSections.forEach(s => {
      s.classList.remove('active');
      s.querySelectorAll('h3').forEach(h => h.style.display = '');
    });
    // Reactivate seafood tab
    if (tabsRow) tabsRow.style.display = '';
    const firstTab = document.querySelector('.menu-tab');
    if (firstTab) firstTab.click();
    if (noResults) noResults.style.display = 'none';
    return;
  }

  // Hide tabs, show all sections
  if (tabsRow) tabsRow.style.display = 'none';
  allSections.forEach(s => {
    s.classList.add('active');
    s.querySelectorAll('h3').forEach(h => h.style.display = '');
  });

  let total = 0;
  allItems.forEach(el => {
    const tags = (el.dataset.tags || '').split(' ');
    const match = tags.includes(tag);
    el.style.display = match ? '' : 'none';
    if (match) total++;
  });

  // Hide section headings with no visible items
  allSections.forEach(section => {
    const visible = [...section.querySelectorAll('.menu-item')].filter(i => i.style.display !== 'none');
    section.querySelectorAll('h3').forEach(h => h.style.display = visible.length ? '' : 'none');
  });

  if (noResults) noResults.style.display = total === 0 ? 'block' : 'none';
}

// ── Escape HTML helper ────────────────────────────────────────
function escHTML(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Scroll Reveal ─────────────────────────────────────────────
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.panel, .carousel-section, .info-card, .contact-item, .special-card, .mgal-card, .hours-table, .contact-banner'
  );
  targets.forEach(function(el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = ((i % 5) * 0.07) + 's';
  });
  if (!('IntersectionObserver' in window)) {
    targets.forEach(function(el) { el.classList.add('revealed'); });
    return;
  }
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  targets.forEach(function(el) { obs.observe(el); });
}

// ── Init on DOM ready ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  initSearchBanner();
  initTagFilters();
  initScrollReveal();
});
