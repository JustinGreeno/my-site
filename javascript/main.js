/**
 * JustinGreeno.dev - Main JavaScript
 * Search functionality and site interactions
 */

// Site content index for search
const siteIndex = [
    {
        title: 'Home',
        url: 'index.html',
        keywords: ['home', 'justin greeno', 'web developer', 'pixel artist', 'game developer', 'vancouver', 'nova scotia', 'portfolio'],
        description: 'Welcome to JustinGreeno.dev - Web Developer, Pixel Artist, and Game Developer'
    },
    {
        title: 'About Me',
        url: 'about.html',
        keywords: ['about', 'bio', 'biography', 'skills', 'contact', 'email', 'javascript', 'typescript', 'react', 'node', 'unity', 'c#', 'html', 'css', 'sql', 'git', 'github', 'figma', 'photoshop', 'counselor', 'farm', 'nova scotia'],
        description: 'Learn about Justin Greeno - skills, background, and contact information'
    },
    {
        title: 'Pixel Art Gallery',
        url: 'pixel-art.html',
        keywords: ['pixel art', 'art', 'gallery', 'timelapse', 'time-lapse', 'animation', '16-bit', 'retro', 'aseprite', 'digital art', 'sprites'],
        description: 'Pixel art gallery and time-lapse videos'
    },
    {
        title: 'Darkness Blooms Devlogs',
        url: 'devlogs.html',
        keywords: ['darkness blooms', 'devlog', 'game development', 'rpg', 'indie game', 'unity', 'characters', 'story', 'youtube', 'discord', 'community'],
        description: 'Development logs for Darkness Blooms RPG'
    },
    {
        title: 'Life',
        url: 'life.html',
        keywords: ['life', 'personal', 'dogs', 'pets', 'instagram', 'farm', 'nova scotia', 'vancouver', 'hobbies'],
        description: 'Personal life - dogs, adventures, and moments'
    },
    {
        title: 'Resume',
        url: 'resume.html',
        keywords: ['resume', 'cv', 'experience', 'work', 'job', 'career', 'hire', 'employment', 'qualifications', 'skills'],
        description: 'Professional resume and qualifications'
    },
    {
        title: 'Web Games',
        url: 'webgames.html',
        keywords: ['games', 'web games', 'play', 'browser games', 'demo', 'interactive'],
        description: 'Playable browser games and demos'
    }
];

// DOM Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

/**
 * Search the site index
 * @param {string} query - Search query
 * @returns {Array} - Matching results
 */
function searchSite(query) {
    if (!query || query.length < 2) return [];

    const lowerQuery = query.toLowerCase().trim();
    const results = [];

    siteIndex.forEach(page => {
        let score = 0;

        // Check title
        if (page.title.toLowerCase().includes(lowerQuery)) {
            score += 10;
        }

        // Check keywords
        page.keywords.forEach(keyword => {
            if (keyword.includes(lowerQuery)) {
                score += 5;
            }
            if (keyword === lowerQuery) {
                score += 10;
            }
        });

        // Check description
        if (page.description.toLowerCase().includes(lowerQuery)) {
            score += 3;
        }

        if (score > 0) {
            results.push({ ...page, score });
        }
    });

    // Sort by score descending
    results.sort((a, b) => b.score - a.score);

    return results;
}

/**
 * Display search results
 * @param {Array} results - Search results
 */
function displayResults(results) {
    if (!searchResults) return;

    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
        searchResults.classList.add('active');
        return;
    }

    const html = results.map(result => `
        <a href="${result.url}" class="search-result-item">
            <strong>${result.title}</strong>
            <br>
            <small>${result.description}</small>
        </a>
    `).join('');

    searchResults.innerHTML = html;
    searchResults.classList.add('active');
}

/**
 * Hide search results
 */
function hideResults() {
    if (searchResults) {
        searchResults.classList.remove('active');
    }
}

// Event Listeners
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value;
        const results = searchSite(query);

        if (results.length === 1) {
            // If only one result, navigate directly
            window.location.href = results[0].url;
        } else {
            displayResults(results);
        }
    });
}

if (searchInput) {
    // Live search as user types
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;

        if (query.length < 2) {
            hideResults();
            return;
        }

        const results = searchSite(query);
        displayResults(results);
    });

    // Hide results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchForm.contains(e.target)) {
            hideResults();
        }
    });

    // Show results on focus if there's a query
    searchInput.addEventListener('focus', () => {
        const query = searchInput.value;
        if (query.length >= 2) {
            const results = searchSite(query);
            displayResults(results);
        }
    });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to current nav item
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ==========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ==========================================

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length === 0) return;

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers - show everything
        animatedElements.forEach(el => el.classList.add('visible'));
    }
}

/**
 * Initialize parallax scrolling effect
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');

    if (parallaxElements.length === 0) return;

    let ticking = false;

    function updateParallax() {
        const scrollY = window.pageYOffset;
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 0.3;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    setActiveNavItem();
    initScrollAnimations();
    initParallax();
});

// Console greeting
console.log('%cWelcome to JustinGreeno.dev!', 'color: #689fab; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with passion by Justin Greeno', 'color: #A5E4CC;');
