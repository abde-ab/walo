// Email API Utility Function
async function sendEmail(fromEmail, toEmail, subject, message) {
    try {
        const response = await fetch('https://email-snowy-ten.vercel.app/Email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: fromEmail,
                to: toEmail,
                subject: subject,
                message: message
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { success: true, data: data };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get vehicle ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const vehicleId = urlParams.get('id');

    if (!vehicleId) {
        window.location.href = 'fleet.html';
        return;
    }

    // 2. Find vehicle data in fleetData array
    const vehicle = fleetData.find(v => v.id === vehicleId);

    if (!vehicle) {
        window.location.href = 'fleet.html';
        return;
    }

    // 3. Populate page elements
    document.title = `${vehicle.name} - CADIGOR MOBILITY`;

    // Basic Info
    document.getElementById('vdp-name').textContent = vehicle.name;
    document.getElementById('vdp-category').textContent = vehicle.categoryLabel;
    document.getElementById('vdp-price-value').textContent = vehicle.pricePerDay;

    // --- Gallery Logic ---
    const mainImg = document.getElementById('vdp-vehicle-image');
    const thumbContainer = document.getElementById('vdp-thumbnails');
    const prevBtn = document.querySelector('.gallery-nav.prev');
    const nextBtnGallery = document.querySelector('.gallery-nav.next');

    let currentImgIndex = 0;
    const galleryImages = vehicle.gallery || [vehicle.image];

    mainImg.src = galleryImages[0];
    mainImg.alt = vehicle.alt;

    const renderThumbnails = () => {
        thumbContainer.innerHTML = '';
        galleryImages.forEach((imgSrc, index) => {
            const thumb = document.createElement('div');
            thumb.className = `thumb ${index === currentImgIndex ? 'active' : ''}`;
            thumb.innerHTML = `<img src="${imgSrc}" alt="${vehicle.name} thumbnail ${index + 1}">`;

            thumb.addEventListener('click', () => {
                currentImgIndex = index;
                updateGallery();
            });
            thumbContainer.appendChild(thumb);
        });
    };

    const updateGallery = () => {
        mainImg.style.opacity = '0';
        setTimeout(() => {
            mainImg.src = galleryImages[currentImgIndex];
            mainImg.style.opacity = '1';
        }, 150);

        // Update active thumb
        document.querySelectorAll('.thumb').forEach((t, i) => {
            t.classList.toggle('active', i === currentImgIndex);
        });

        // Scroll thumb into view if needed
        const activeThumb = thumbContainer.children[currentImgIndex];
        if (activeThumb) {
            activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    };

    prevBtn.addEventListener('click', () => {
        currentImgIndex = (currentImgIndex - 1 + galleryImages.length) % galleryImages.length;
        updateGallery();
    });

    nextBtnGallery.addEventListener('click', () => {
        currentImgIndex = (currentImgIndex + 1) % galleryImages.length;
        updateGallery();
    });

    if (galleryImages.length > 1) {
        renderThumbnails();
    } else {
        prevBtn.style.display = 'none';
        nextBtnGallery.style.display = 'none';
        thumbContainer.style.display = 'none';
    }

    // Specs
    document.getElementById('vdp-transmission').textContent = vehicle.specs.transmission;
    document.getElementById('vdp-fuel').textContent = vehicle.specs.fuel;
    document.getElementById('vdp-seats').textContent = vehicle.specs.seats;

    // Detailed Specs
    if (vehicle.detailedSpecs) {
        document.getElementById('spec-year').textContent = vehicle.detailedSpecs.modelYear || '2023';
        document.getElementById('spec-consumption').textContent = vehicle.detailedSpecs.consumption || '5.1 L/100km';
        document.getElementById('spec-baby-seat').textContent = vehicle.detailedSpecs.babySeat || 'Available';
        document.getElementById('spec-safety').textContent = vehicle.detailedSpecs.safety || 'Airbags and ABS System included';
        document.getElementById('spec-tech').textContent = vehicle.detailedSpecs.technology || 'Standard Features';
    }

    // Marketing Text
    document.getElementById('vdp-marketing-text').textContent = vehicle.marketing || '';

    // --- Booking Modal Logic ---
    const modal = document.getElementById('booking-modal');
    const reserveBtn = document.querySelector('.vdp-cta');
    const closeBtn = document.querySelector('.close-modal');
    const nextBtn = document.getElementById('next-to-step-2');
    const backBtn = document.getElementById('back-to-step-1');
    const step1 = document.getElementById('booking-step-1');
    const step2 = document.getElementById('booking-step-2');

    const pickupInput = document.getElementById('pickup-date');
    const dropoffInput = document.getElementById('dropoff-date');
    const daysDisplay = document.getElementById('days-count');
    const dailyPriceDisplay = document.getElementById('daily-price');
    const totalDisplay = document.getElementById('total-booking-price');
    const summaryTotalDisplay = document.getElementById('summary-total-price');

    const dailyPrice = vehicle.pricePerDay;
    dailyPriceDisplay.textContent = dailyPrice;

    // Set initial min dates to prevent past date booking
    const todayStr = new Date().toISOString().split('T')[0];
    pickupInput.min = todayStr;
    dropoffInput.min = todayStr;

    // Sync Drop-off min date with Pick-up selection
    pickupInput.addEventListener('input', () => {
        const pickup = pickupInput.value;
        if (pickup) {
            dropoffInput.min = pickup;
            // If current dropoff is before new pickup, auto-reset it to match
            if (dropoffInput.value && dropoffInput.value < pickup) {
                dropoffInput.value = pickup;
            }
        }
        calculatePrice(); // Recalculate if auto-adjusted
    });

    // Open Modal
    reserveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scroll
    });

    // Close Modal
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Reset to step 1
        step1.classList.add('active');
        step2.classList.remove('active');
    };

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Price Calculation
    const calculatePrice = () => {
        const start = new Date(pickupInput.value);
        const end = new Date(dropoffInput.value);

        if (pickupInput.value && dropoffInput.value && end >= start) {
            const diffHours = Math.abs(end - start) / (1000 * 60 * 60);

            // 24h cycle logic with 120-minute (2h) grace period
            let diffDays = Math.floor(diffHours / 24);
            const extraHours = diffHours % 24;

            if (extraHours > 2) {
                diffDays += 1;
            }

            // Minimum 1 day calculation
            if (diffDays < 1) diffDays = 1;

            daysDisplay.textContent = diffDays;
            const total = diffDays * dailyPrice;
            totalDisplay.textContent = total;
            summaryTotalDisplay.textContent = total;
            nextBtn.disabled = false;
        } else {
            daysDisplay.textContent = '0';
            totalDisplay.textContent = '0';
            nextBtn.disabled = true;
        }
    };

    pickupInput.addEventListener('change', calculatePrice);
    dropoffInput.addEventListener('change', calculatePrice);

    // Step Transitions
    nextBtn.addEventListener('click', () => {
        step1.classList.remove('active');
        step2.classList.add('active');
        document.getElementById('summary-total-price').textContent = totalDisplay.textContent;
    });

    backBtn.addEventListener('click', () => {
        step2.classList.remove('active');
        step1.classList.add('active');
    });

    // Final Confirmation
    const finalForm = document.getElementById('final-booking-form');
    finalForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const bookingData = {
            vehicle: vehicle.name,
            totalPrice: totalDisplay.textContent,
            pickup: pickupInput.value,
            dropoff: dropoffInput.value,
            location: document.getElementById('pickup-location').value,
            customer: {
                name: document.getElementById('cust-name').value,
                email: document.getElementById('cust-email').value,
                phone: document.getElementById('cust-phone').value,
                flight: document.getElementById('cust-flight').value
            },
            addons: {
                driver: document.getElementById('addon-driver').checked,
                babyseat: document.getElementById('addon-babyseat').checked
            }
        };

        const submitButton = finalForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Processing...';
        submitButton.disabled = true;

        // Prepare email content
        const addonsList = [];
        if (bookingData.addons.driver) addonsList.push('Professional Driver');
        if (bookingData.addons.babyseat) addonsList.push('Baby Seat');
        const addonsText = addonsList.length > 0 ? addonsList.join(', ') : 'None';

        const emailSubject = `New Car Rental Booking from ${bookingData.customer.name}`;
        const emailBody = `New Car Rental Booking Request

Customer Details:
- Name: ${bookingData.customer.name}
- Email: ${bookingData.customer.email}
- Phone: ${bookingData.customer.phone}
${bookingData.customer.flight ? `- Flight Number: ${bookingData.customer.flight}` : ''}

Booking Details:
- Vehicle: ${bookingData.vehicle}
- Pick-up Date/Time: ${bookingData.pickup}
- Drop-off Date/Time: ${bookingData.dropoff}
- Pick-up Location: ${bookingData.location}
- Total Price: ${bookingData.totalPrice} €
- Add-ons: ${addonsText}

Please confirm this booking. Thank you!`;

        // Send email
        const emailResult = await sendEmail(
            bookingData.customer.email,
            'cadigormobility@gmail.com',
            emailSubject,
            emailBody
        );

        if (emailResult.success) {
            alert(`Booking Confirmed for ${vehicle.name}!\nTotal Price: ${bookingData.totalPrice} €\nWe have received your booking request and will contact you shortly.`);
            closeModal();
            // Reset form
            finalForm.reset();
            pickupInput.value = '';
            dropoffInput.value = '';
            totalDisplay.textContent = '0';
            summaryTotalDisplay.textContent = '0';
            daysDisplay.textContent = '0';
        } else {
            alert(`Booking request submitted for ${vehicle.name}!\nTotal Price: ${bookingData.totalPrice} €\nWe will contact you shortly. If you don't hear from us, please contact us directly.`);
            closeModal();
        }

        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });

    // Navbar Scroll Effect (same as script.js and fleet.js)
    const navbar = document.getElementById('navbar');
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

    // --- Vehicle Specific Reviews Rendering ---
    const vdpReviewsContainer = document.getElementById('vdp-reviews-container');

    const renderVehicleReviews = () => {
        if (!vdpReviewsContainer) return;

        // Filter for reviews matching this car ID or general if none match
        let filteredReviews = reviewsData.filter(r => r.target === vehicleId);

        // If no specific reviews, show general ones or mixed
        if (filteredReviews.length === 0) {
            filteredReviews = reviewsData.filter(r => r.target === 'general').slice(0, 3);
        }

        filteredReviews.forEach(review => {
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
            vdpReviewsContainer.appendChild(card);
        });
    };

    renderVehicleReviews();

    // Mobile Toggle (Basic)
    const mobileToggle = document.querySelector('.mobile-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            console.log('Mobile menu clicked');
        });
    }

    // Force Calendar Picker on Click
    const dateInputs = document.querySelectorAll('input[type="date"], input[type="datetime-local"]');
    dateInputs.forEach(input => {
        input.addEventListener('click', () => {
            try {
                if (typeof input.showPicker === 'function') {
                    input.showPicker();
                }
            } catch (error) {
                console.log('Date picker auto-open not supported');
            }
        });
    });
});
