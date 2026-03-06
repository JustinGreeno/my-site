// CCEx Countdown Timer - Shared across all pages
(function() {
    var countdownInterval = null;

    var targetDate = new Date('August 31, 2026 00:00:00').getTime();
    if (isNaN(targetDate)) return;

    function updateCountdown() {
        var now = new Date().getTime();
        var distance = targetDate - now;

        var daysEl = document.getElementById('days');
        var hoursEl = document.getElementById('hours');
        var minsEl = document.getElementById('mins');
        var secsEl = document.getElementById('secs');
        var countdownEl = document.getElementById('countdown');

        if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

        if (distance < 0) {
            if (countdownEl) {
                countdownEl.innerHTML = '<span style="color: var(--straw-light);">CCEx 2026 is HERE!</span>';
            }
            if (countdownInterval) {
                clearInterval(countdownInterval);
                countdownInterval = null;
            }
            return;
        }

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var secs = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = days;
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minsEl.textContent = mins.toString().padStart(2, '0');
        secsEl.textContent = secs.toString().padStart(2, '0');
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
