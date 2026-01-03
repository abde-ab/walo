/**
 * Cadigor Mobility - Cookie Consent Manager
 * Handles the display and logic of the cookie consent banner
 */

document.addEventListener('DOMContentLoaded', function () {
    // Check if user has already made a choice
    if (!localStorage.getItem('cookieConsent')) {
        // Create the banner element
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <div class="cookie-text">
                    <p>We use cookies to ensure you get the best experience on our website. 
                    By continuing to visit this site you agree to our use of cookies. 
                    <a href="privacy.html">Learn more</a></p>
                </div>
                <div class="cookie-actions">
                    <button id="cookie-decline" class="btn-cookie-decline">Decline</button>
                    <button id="cookie-accept" class="btn-cookie-accept">Accept</button>
                </div>
            </div>
        `;

        // Append to body
        document.body.appendChild(banner);

        // Trigger reflow to enable transition
        setTimeout(() => {
            banner.classList.add('show');
        }, 100);

        // Add event listeners
        document.getElementById('cookie-accept').addEventListener('click', function () {
            localStorage.setItem('cookieConsent', 'accepted');
            banner.classList.remove('show');
            setTimeout(() => {
                banner.remove();
            }, 500);
        });

        document.getElementById('cookie-decline').addEventListener('click', function () {
            localStorage.setItem('cookieConsent', 'declined');
            banner.classList.remove('show');
            setTimeout(() => {
                banner.remove();
            }, 500);
        });
    }
});
