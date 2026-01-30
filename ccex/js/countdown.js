// CCEx Countdown Timer - Shared across all pages
(function() {
    const targetDate = new Date('August 22, 2026 00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minsEl = document.getElementById('mins');
        const secsEl = document.getElementById('secs');
        const countdownEl = document.getElementById('countdown');

        if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

        if (distance < 0) {
            if (countdownEl) {
                countdownEl.innerHTML = '<span style="color: var(--straw-light);">CCEx 2026 is HERE!</span>';
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = days;
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minsEl.textContent = mins.toString().padStart(2, '0');
        secsEl.textContent = secs.toString().padStart(2, '0');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            updateCountdown();
            setInterval(updateCountdown, 1000);
        });
    } else {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
})();
