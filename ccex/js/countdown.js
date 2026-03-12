// CCEx Countdown Timer - Shared across all pages
(function() {
    var countdownInterval = null;

    var fairStart  = new Date('August 31, 2026 00:00:00').getTime();
    var fairEnd    = new Date('September 7, 2026 00:00:00').getTime(); // day after Sept 6
    var nextYear   = new Date('August 31, 2027 00:00:00').getTime();

    function updateCountdown() {
        var now = new Date().getTime();

        var daysEl      = document.getElementById('days');
        var hoursEl     = document.getElementById('hours');
        var minsEl      = document.getElementById('mins');
        var secsEl      = document.getElementById('secs');
        var countdownEl = document.getElementById('countdown');
        var labelEl     = document.querySelector('.countdown-label');

        if (!countdownEl) return;

        // Phase 3: after the exhibition — "See us next year"
        if (now >= fairEnd) {
            if (labelEl) labelEl.textContent = 'See us next year \u2014 CCEx 2027';
            var distance = nextYear - now;
            if (distance <= 0) {
                countdownEl.innerHTML = '<span style="color:var(--straw-light);">Happening Now!</span>';
                clearInterval(countdownInterval);
                return;
            }
            if (daysEl && hoursEl && minsEl && secsEl) {
                daysEl.textContent  = Math.floor(distance / (1000 * 60 * 60 * 24));
                hoursEl.textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
                minsEl.textContent  = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                secsEl.textContent  = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
            }
            return;
        }

        // Phase 2: during the exhibition — "Happening Now"
        if (now >= fairStart) {
            if (labelEl) labelEl.textContent = 'CCEx 2026';
            countdownEl.innerHTML = '<span style="color:var(--straw-light);font-family:\'Alfa Slab One\',serif;font-size:1.6rem;letter-spacing:0.05em;">Happening Now!</span>';
            clearInterval(countdownInterval);
            countdownInterval = null;
            return;
        }

        // Phase 1: before the exhibition — countdown to Aug 31
        var distance = fairStart - now;
        if (daysEl && hoursEl && minsEl && secsEl) {
            daysEl.textContent  = Math.floor(distance / (1000 * 60 * 60 * 24));
            hoursEl.textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            minsEl.textContent  = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            secsEl.textContent  = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
        }
    }

    function startCountdown() {
        if (countdownInterval) return;
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    function stopCountdown() {
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
    }

    // Pause when tab is hidden, resume when visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopCountdown();
        } else {
            startCountdown();
        }
    });

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startCountdown);
    } else {
        startCountdown();
    }
})();
