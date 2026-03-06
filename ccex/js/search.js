// CCEx Site-Wide Search System
const searchIndex = [
    // Pages
    { type: 'page', icon: '🏠', title: 'Home', desc: 'Main page - Welcome to the Fair', url: 'index.html', keywords: 'home main welcome fair exhibition' },
    { type: 'page', icon: '📅', title: 'Schedule', desc: 'Full event schedule for 2026', url: 'schedule-2025.html', keywords: 'schedule events times calendar when' },
    { type: 'page', icon: '🎠', title: 'Kids Activities', desc: 'Fun activities for children', url: 'activities.html', keywords: 'kids children activities petting zoo face painting games' },
    { type: 'page', icon: '🐄', title: 'Exhibitors', desc: 'Information for exhibitors', url: 'exhibitors.html', keywords: 'exhibitors livestock cattle horses sheep entry' },
    { type: 'page', icon: '🍔', title: 'Vendors', desc: 'Vendor information and pricing', url: 'vendors.html', keywords: 'vendors food booth craft merchandise sell' },
    { type: 'page', icon: '📝', title: 'Forms & Documents', desc: 'Download entry forms and rules', url: 'forms.html', keywords: 'forms documents download entry application' },
    { type: 'page', icon: '👕', title: 'Merchandise', desc: 'Official CCEx merchandise', url: 'merch.html', keywords: 'merch merchandise shirts hats clothing buy shop' },
    { type: 'page', icon: '📸', title: 'Photos', desc: 'Photo gallery from the fair', url: 'photos.html', keywords: 'photos pictures gallery images memories' },
    { type: 'page', icon: '🤝', title: 'Sponsors', desc: 'Our sponsors and partners', url: 'sponsors.html', keywords: 'sponsors partners support business' },
    { type: 'page', icon: '👥', title: 'Board Members', desc: 'Meet the exhibition board', url: 'members.html', keywords: 'board members directors committee team' },
    { type: 'page', icon: '✉️', title: 'Contact Us', desc: 'Get in touch with us', url: 'contact.html', keywords: 'contact email phone address location directions' },
    { type: 'page', icon: '🌿', title: '4-H Programs', desc: 'Youth agricultural development', url: '4h.html', keywords: '4h 4-h youth agriculture clubs pledge head heart hands health' },

    // Forms
    { type: 'form', icon: '📄', title: 'Kids Show N Shine Registration', desc: 'Register for kids car show event', url: 'show-n-shine.html', keywords: 'show shine kids car vehicle registration children' },
    { type: 'form', icon: '📄', title: 'Horse Show Registration', desc: 'Register for light horse show', url: 'horse-registration.html', keywords: 'horse registration light horse show exhibitor' },
    { type: 'form', icon: '📄', title: 'Vendor Application', desc: 'Apply to be a vendor', url: 'vendor-application.html', keywords: 'vendor application food booth merchant apply' },
    { type: 'form', icon: '📄', title: 'Light Horse Show Booklet', desc: 'Rules, classes, and schedule for horses', url: 'images/forms and documents/CCex-Light Horse booklet 2025 .pdf', keywords: 'horse show booklet rules classes schedule light' },
    { type: 'form', icon: '📄', title: 'Livestock Traceability Info', desc: 'Required info for livestock entries', url: 'images/forms and documents/LIVESTOCK TRACEABILITY INFO SHEET 2025 (1).pdf', keywords: 'livestock traceability cattle sheep goat identification' },
    { type: 'form', icon: '📄', title: 'Exhibition Hall Entry Form', desc: 'General entry form for exhibition hall', url: 'images/forms and documents/Ex Hall entry form.pdf', keywords: 'exhibition hall entry form general' },
    { type: 'form', icon: '📄', title: 'Vegetables Entry', desc: 'Garden department classes', url: 'images/forms and documents/vegetables Garden Department.pdf', keywords: 'vegetables garden produce department entry' },
    { type: 'form', icon: '📄', title: 'Baking & Pickling Entry', desc: 'Home crafts - baking and preserves', url: 'images/forms and documents/baking-pickling Home Crafts Department Classes 3-17.pdf', keywords: 'baking pickling preserves home crafts classes' },
    { type: 'form', icon: '📄', title: 'Arts & Crafts Entry', desc: 'Handmade arts and crafts', url: 'images/forms and documents/arts and crafts Classes 18-26.pdf', keywords: 'arts crafts handmade classes' },
    { type: 'form', icon: '📄', title: 'Flowers Entry', desc: 'Floral entries and arrangements', url: 'images/forms and documents/flowers Classes 27-33.pdf', keywords: 'flowers floral arrangements classes' },
    { type: 'form', icon: '📄', title: 'Children Competition Entry', desc: 'Youth exhibitor competition', url: 'images/forms and documents/Children\'s competition  Class 34.pdf', keywords: 'children kids competition youth class' },
    { type: 'form', icon: '📄', title: 'Sponsorship Package', desc: 'Sponsorship opportunities info', url: 'images/forms and documents/2024-Sponsorship-Package.pdf', keywords: 'sponsor sponsorship package business support' },

    // Events & Activities
    { type: 'event', icon: '🐴', title: 'Heavy Horse Pull', desc: 'Watch powerful draft horses compete', url: 'schedule-2025.html', keywords: 'heavy horse pull draft horses competition' },
    { type: 'event', icon: '💥', title: 'Demolition Derby', desc: 'High-octane crashes and excitement', url: 'schedule-2025.html', keywords: 'demolition derby cars crash excitement' },
    { type: 'event', icon: '🏛️', title: 'Agricultural Hall', desc: 'Prize-winning vegetables and crafts', url: 'schedule-2025.html', keywords: 'agricultural hall vegetables preserves crafts display' },
    { type: 'event', icon: '🎤', title: 'Live Entertainment', desc: 'Local bands on the main stage', url: 'schedule-2025.html', keywords: 'live entertainment music bands stage performers' },
    { type: 'event', icon: '🐑', title: 'Petting Zoo', desc: 'Get up close with farm animals', url: 'activities.html', keywords: 'petting zoo animals goats lambs bunnies chicks' },
    { type: 'event', icon: '🍟', title: 'Food Court', desc: 'Fair favorites and treats', url: 'index.html', keywords: 'food court fries cotton candy treats eating' },
    { type: 'event', icon: '🎨', title: 'Face Painting', desc: 'Transform into your favorite character', url: 'activities.html', keywords: 'face painting kids art children' },
    { type: 'event', icon: '🎢', title: 'Midway Rides', desc: 'Thrilling rides for all ages', url: 'activities.html', keywords: 'midway rides carnival games thrilling' },
    { type: 'event', icon: '🐴', title: 'Pony Rides', desc: 'Gentle pony rides for children', url: 'activities.html', keywords: 'pony rides kids horses children' },
    { type: 'event', icon: '🌾', title: 'Hay Bale Maze', desc: 'Navigate through the maze', url: 'activities.html', keywords: 'hay bale maze adventure kids' },
    { type: 'event', icon: '🐄', title: 'Livestock Shows', desc: 'Cattle, horses, sheep, goats, poultry', url: 'schedule-2025.html', keywords: 'livestock shows cattle horses sheep goats poultry' },
    { type: 'event', icon: '🏆', title: '4-H Competitions', desc: 'Youth agricultural competitions', url: 'schedule-2025.html', keywords: '4h 4-h competitions youth showmanship' },
    { type: 'event', icon: '🎈', title: 'Balloon Animals', desc: 'Amazing balloon art creations', url: 'activities.html', keywords: 'balloon animals art kids' },
    { type: 'event', icon: '🏆', title: 'Kids Competitions', desc: 'Pie eating, sack races, and more', url: 'activities.html', keywords: 'kids competitions pie eating sack races' },

    // Info & FAQ
    { type: 'info', icon: '💵', title: 'Admission Prices', desc: 'Adults $10, Kids $5, Under 6 Free', url: 'contact.html', keywords: 'admission price cost tickets entry fee' },
    { type: 'info', icon: '📍', title: 'Location & Directions', desc: 'Exhibition Grounds, Oxford, NS', url: 'contact.html', keywords: 'location directions address map oxford nova scotia' },
    { type: 'info', icon: '🅿️', title: 'Parking Information', desc: 'Free parking, accessible spots available', url: 'contact.html', keywords: 'parking free accessible handicap' },
    { type: 'info', icon: '🐕', title: 'Pet Policy', desc: 'Service animals only permitted', url: 'contact.html', keywords: 'pets dogs animals allowed policy' },
    { type: 'info', icon: '📆', title: 'Fair Dates 2026', desc: 'Aug 31 - Sept 6', url: 'index.html', keywords: 'dates when fair 2026 august september' },
    { type: 'info', icon: '⏰', title: 'Fair Hours', desc: 'Fri 5-10PM, Sat-Sun 10AM-10PM, Mon 10AM-4PM', url: 'vendors.html', keywords: 'hours times open close schedule' },
    { type: 'info', icon: '🌧️', title: 'Weather Policy', desc: 'Fair runs rain or shine', url: 'contact.html', keywords: 'weather rain policy refund' },
    { type: 'info', icon: '📧', title: 'Email Contact', desc: 'cumberlandexhibition@gmail.com', url: 'contact.html', keywords: 'email contact info address' },
    { type: 'info', icon: '♿', title: 'Accessibility', desc: 'Accessible parking and facilities', url: 'contact.html', keywords: 'accessible accessibility wheelchair handicap' },
    { type: 'info', icon: '🍽️', title: 'Food Available', desc: 'Food court with fair favorites', url: 'contact.html', keywords: 'food eating available vendors' },
    { type: 'info', icon: '💼', title: 'Become a Vendor', desc: 'Apply to sell at the fair', url: 'vendors.html', keywords: 'vendor apply sell booth' },
    { type: 'info', icon: '🤝', title: 'Become a Sponsor', desc: 'Sponsorship opportunities', url: 'sponsors.html', keywords: 'sponsor sponsorship business partner' },
    { type: 'info', icon: '🙋', title: 'Volunteer', desc: 'Help at the fair', url: 'contact.html', keywords: 'volunteer help work fair' },

    // Livestock Categories
    { type: 'info', icon: '🐄', title: 'Beef Cattle Entry', desc: 'Enter beef cattle in the show', url: 'exhibitors.html', keywords: 'beef cattle entry angus hereford charolais' },
    { type: 'info', icon: '🐴', title: 'Horse Entry', desc: 'Enter horses in shows', url: 'exhibitors.html', keywords: 'horse entry show light heavy draft' },
    { type: 'info', icon: '🐑', title: 'Sheep Entry', desc: 'Enter sheep in the show', url: 'exhibitors.html', keywords: 'sheep entry lambs suffolk hampshire' },
    { type: 'info', icon: '🐐', title: 'Goat Entry', desc: 'Enter goats in the show', url: 'exhibitors.html', keywords: 'goat entry boer nubian alpine' },
    { type: 'info', icon: '🐔', title: 'Poultry Entry', desc: 'Enter poultry in the show', url: 'exhibitors.html', keywords: 'poultry entry chickens ducks turkeys geese' },
    { type: 'info', icon: '🐰', title: 'Rabbit Entry', desc: 'Enter rabbits in the show', url: 'exhibitors.html', keywords: 'rabbit entry bunny show' }
];

// Animal synonym groups - searching any term matches all related terms
const synonymGroups = [
    ['cow', 'cattle', 'bovine', 'heifer', 'steer', 'bull', 'calf', 'ox'],
    ['chicken', 'hen', 'rooster', 'cock', 'chick', 'chicks', 'poultry', 'fowl'],
    ['horse', 'mare', 'stallion', 'colt', 'filly', 'foal', 'gelding', 'equine', 'pony', 'ponies'],
    ['sheep', 'lamb', 'lambs', 'ewe', 'ram', 'ovine'],
    ['goat', 'goats', 'kid', 'doe', 'buck', 'billy', 'nanny'],
    ['pig', 'hog', 'sow', 'boar', 'piglet', 'swine'],
    ['rabbit', 'bunny', 'bunnies', 'hare'],
    ['duck', 'ducks', 'drake', 'duckling'],
    ['turkey', 'turkeys', 'tom', 'gobbler'],
    ['goose', 'geese', 'gander'],
];

function getSearchTerms(query) {
    const q = query.toLowerCase();
    const words = q.split(/\s+/);
    const expanded = new Set(words);
    for (const word of words) {
        for (const group of synonymGroups) {
            if (group.includes(word)) {
                group.forEach(syn => expanded.add(syn));
            }
        }
    }
    return expanded;
}

// Initialize search when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('siteSearch');
    const searchDropdown = document.getElementById('searchDropdown');

    if (!searchInput || !searchDropdown) return;

    function highlightMatch(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    function performLiveSearch(query) {
        if (!query || query.length < 2) {
            searchDropdown.classList.remove('active');
            return;
        }

        const terms = getSearchTerms(query);
        const results = searchIndex.filter(item => {
            const searchText = `${item.title} ${item.desc} ${item.keywords}`.toLowerCase();
            return [...terms].some(term => searchText.includes(term));
        });

        if (results.length === 0) {
            searchDropdown.innerHTML = `
                <div class="search-no-results">
                    <strong>No results found for "${query}"</strong>
                    Try searching for: schedule, forms, livestock, vendors, contact
                </div>
            `;
            searchDropdown.classList.add('active');
            return;
        }

        // Group results by type
        const grouped = {};
        results.forEach(item => {
            if (!grouped[item.type]) grouped[item.type] = [];
            grouped[item.type].push(item);
        });

        const typeLabels = { page: 'Pages', form: 'Forms & Documents', event: 'Events & Activities', info: 'Information' };

        let html = '';
        for (const type in grouped) {
            html += `<div class="search-category">
                <div class="search-category-title">${typeLabels[type] || type}</div>`;
            grouped[type].slice(0, 5).forEach(item => {
                html += `
                    <a href="${item.url}" class="search-result">
                        <div class="search-result-icon">${item.icon}</div>
                        <div class="search-result-content">
                            <div class="search-result-title">${highlightMatch(item.title, query)}</div>
                            <div class="search-result-desc">${item.desc}</div>
                        </div>
                    </a>
                `;
            });
            html += '</div>';
        }

        searchDropdown.innerHTML = html;
        searchDropdown.classList.add('active');
    }

    searchInput.addEventListener('input', function() {
        performLiveSearch(this.value.trim());
    });

    searchInput.addEventListener('focus', function() {
        if (this.value.trim().length >= 2) {
            performLiveSearch(this.value.trim());
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-bar-container')) {
            searchDropdown.classList.remove('active');
        }
    });

    // Navigate on Enter key
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const firstResult = searchDropdown.querySelector('.search-result');
            if (firstResult) {
                window.location.href = firstResult.href;
            } else if (this.value.trim()) {
                window.location.href = 'forms.html?search=' + encodeURIComponent(this.value.trim());
            }
        }
    });

    // Make performSearch available globally
    window.performSearch = function() {
        const query = searchInput.value.trim();
        if (query) {
            const firstResult = searchDropdown.querySelector('.search-result');
            if (firstResult) {
                window.location.href = firstResult.href;
            } else {
                window.location.href = 'forms.html?search=' + encodeURIComponent(query);
            }
        }
    };
});
