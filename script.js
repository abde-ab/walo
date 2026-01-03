// Email API Utility Function
async function sendEmail(name, email, comments) {
    try {
        const response = await fetch('https://email-snowy-ten.vercel.app/Email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                comments: comments
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`HTTP error! status: ${response.status}`, errorData);
        }

        const data = await response.json();
        return { success: true, data: data };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.desktop-nav');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            // Need to implement mobile drawer roughly
            console.log('Mobile menu clicked - To Be Implemented');
        });
    }

    // Scroll Effect for Navbar
    const navbar = document.getElementById('navbar');

    // Set initial navbar background to match fleet page
    navbar.style.background = 'rgba(10, 10, 10, 0.8)';

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- Review Rendering ---
    const reviewsContainer = document.getElementById('reviews-container');

    const renderReviews = () => {
        if (!reviewsContainer || typeof reviewsData === 'undefined') return;

        // Filter for general reviews or top rated
        const homeReviews = reviewsData.filter(r => r.target === 'general').slice(0, 3);

        homeReviews.forEach(review => {
            const card = document.createElement('div');
            card.className = 'review-card';

            let stars = '';
            for (let i = 0; i < 5; i++) {
                stars += i < review.rating ? '★' : '☆';
            }

            card.innerHTML = `
                <div class="review-stars">${stars}</div>
                <p class="review-content">"${review.comment}"</p>
                <div class="review-footer">
                    <img src="${review.avatar}" alt="${review.name}" class="review-avatar">
                    <div class="review-info">
                        <h4>${review.name}</h4>
                        <span>${review.date}</span>
                    </div>
                </div>
            `;
            reviewsContainer.appendChild(card);
        });
    };

    renderReviews();

    // --- FAQ Rendering & Accordion ---
    const faqList = document.getElementById('faq-list');

    const renderFAQ = () => {
        if (!faqList || typeof faqData === 'undefined') return;

        faqData.forEach((item, index) => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';

            faqItem.innerHTML = `
                <div class="faq-question">
                    <h3>${item.question}</h3>
                    <span class="faq-icon">+</span>
                </div>
                <div class="faq-answer">
                    <div class="faq-answer-content">
                        ${item.answer}
                    </div>
                </div>
            `;

            faqItem.querySelector('.faq-question').addEventListener('click', () => {
                const isActive = faqItem.classList.contains('active');

                // Close all other items
                document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));

                // Open clicked item if it wasn't active
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });

            faqList.appendChild(faqItem);

            // Open the first item by default
            if (index === 0) {
                faqItem.classList.add('active');
            }
        });
    };

    renderFAQ();

    // --- Home Search Form Logic ---
    const homeSearchForm = document.getElementById('home-search-form');
    if (homeSearchForm) {
        // Set min date to today for inputs
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const today = `${year}-${month}-${day}T${hours}:${minutes}`;
        const pickupInput = document.getElementById('home-pickup-date');
        const dropoffInput = document.getElementById('home-dropoff-date');

        if (pickupInput) pickupInput.min = today;
        if (dropoffInput) dropoffInput.min = today;

        // Sync Drop-off min date with Pick-up selection
        pickupInput.addEventListener('input', () => {
            const pickup = pickupInput.value;
            if (pickup) {
                dropoffInput.min = pickup;
                // If current dropoff is before new pickup, reset it
                if (dropoffInput.value && dropoffInput.value < pickup) {
                    dropoffInput.value = pickup;
                }
            }
        });

        homeSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const pickup = pickupInput.value;
            const dropoff = dropoffInput.value;

            if (new Date(dropoff) < new Date(pickup)) {
                alert("Drop-off date must be same as or after pick-up date.");
                return;
            }

            sessionStorage.setItem('pickupDate', pickup);
            sessionStorage.setItem('dropoffDate', dropoff);

            window.location.href = 'fleet.html';
        });
    }

    // Force Calendar Picker on Click (Mobile/Desktop Optimization)
    const dateInputs = document.querySelectorAll('input[type="date"], input[type="datetime-local"]');
    dateInputs.forEach(input => {
        input.addEventListener('click', (e) => {
            try {
                // Show the picker if supported
                if (typeof input.showPicker === 'function') {
                    input.showPicker();
                }
            } catch (error) {
                // Fail silently if browser doesn't support or if prevents (legacy browsers)
                console.log('Date picker auto-open not supported');
            }
        });
    });

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const vehicle = document.getElementById('contact-vehicle').value;
            const message = document.getElementById('contact-message').value;

            const vehicleText = vehicle ? `Interested Vehicle: ${document.getElementById('contact-vehicle').options[document.getElementById('contact-vehicle').selectedIndex].text}\n\n` : '';
            const emailBody = `New Contact Request from ${name}\n\n${vehicleText}Message:\n${message}\n\nContact Email: ${email}`;

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            const result = await sendEmail(
                email,
                'cadigormobility@gmail.com',
                `New Contact Request from ${name}`,
                emailBody
            );

            if (result.success) {
                alert('Thank you! Your message has been sent successfully. We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Sorry, there was an error sending your message. Please try again or contact us directly at cadigormobility@gmail.com');
            }

            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    }
});
