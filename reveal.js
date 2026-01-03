/**
 * reveal.js
 * Implements "Reveal on Scroll" animations using IntersectionObserver.
 */
document.addEventListener('DOMContentLoaded', () => {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const observeAll = () => {
        const revealElements = document.querySelectorAll('.reveal, .reveal-scale');
        revealElements.forEach(el => revealObserver.observe(el));
    };

    // Initial scan
    observeAll();

    // Export to window for manual triggering (e.g. after dynamic loading)
    window.triggerReveal = observeAll;

    // Optional: Use MutationObserver for fully automatic dynamic detection
    const mutationObserver = new MutationObserver(() => {
        observeAll();
    });

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
});
