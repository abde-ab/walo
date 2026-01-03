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
    const routeSelect = document.getElementById('transfer-route');
    const serviceSelect = document.getElementById('service-type');
    const passengerSelect = document.getElementById('passengers');
    const priceDisplay = document.getElementById('transfer-price');
    const bookingForm = document.getElementById('transfer-booking-form');

    // --- Load Routes ---
    const loadRoutes = () => {
        transferRoutes.forEach(route => {
            const option = document.createElement('option');
            option.value = route.id;
            option.textContent = `${route.from} ➔ ${route.to}`;
            routeSelect.appendChild(option);
        });
    };

    // --- Update Price ---
    const updatePrice = () => {
        const routeId = routeSelect.value;
        const passengerType = passengerSelect.value;

        if (!routeId) {
            priceDisplay.textContent = '-- €';
            return;
        }

        const route = transferRoutes.find(r => r.id === routeId);
        if (route) {
            const price = passengerType === 'van' ? route.priceVan : route.priceStandard;
            priceDisplay.textContent = `${price} €`;
        }
    };

    // --- Event Listeners ---
    if (routeSelect) {
        loadRoutes();
        routeSelect.addEventListener('change', updatePrice);
    }

    if (passengerSelect) {
        passengerSelect.addEventListener('change', updatePrice);
    }

    // --- Form Submission (Email + WhatsApp) ---
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const service = serviceSelect.options[serviceSelect.selectedIndex].text;
            const route = routeSelect.options[routeSelect.selectedIndex].text;
            const passengers = passengerSelect.options[passengerSelect.selectedIndex].text;
            const date = document.getElementById('transfer-date').value;
            const flight = document.getElementById('flight-number').value;
            const price = priceDisplay.textContent;
            const name = document.getElementById('transfer-name').value;
            const email = document.getElementById('transfer-email').value;

            const submitButton = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Prepare email content
            const emailSubject = `New Transfer Booking Request from ${name}`;
            const emailBody = `New Airport Transfer Booking Request

Customer Details:
- Name: ${name}
- Email: ${email}

Booking Details:
- Service: ${service}
- Route: ${route}
- Passengers: ${passengers}
- Date/Time: ${date}
- Flight Number: ${flight}
- Fixed Price: ${price}

Please confirm this booking. Thank you!`;

            // Send email
            const emailResult = await sendEmail(
                email,
                'cadigormobility@gmail.com',
                emailSubject,
                emailBody
            );

            // Also open WhatsApp as backup
            const whatsappMessage = `Hello Cadigor Mobility! I would like to book an Airport Transfer:%0A%0A` +
                `*Service:* ${service}%0A` +
                `*Route:* ${route}%0A` +
                `*Passengers:* ${passengers}%0A` +
                `*Date/Time:* ${date}%0A` +
                `*Flight Number:* ${flight}%0A` +
                `*Fixed Price:* ${price}%0A%0A` +
                `Please confirm my booking. Thank you!`;

            const whatsappUrl = `https://wa.me/212666761111?text=${whatsappMessage}`;
            window.open(whatsappUrl, '_blank');

            if (emailResult.success) {
                alert('Thank you! Your booking request has been sent. We will confirm your transfer shortly.');
                bookingForm.reset();
                priceDisplay.textContent = '-- €';
            } else {
                alert('Your booking request has been sent via WhatsApp. We will confirm your transfer shortly.');
            }

            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    }

    // Mobile Toggle for Transfers Page
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.desktop-nav');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)'; // Always dark for this page

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
            } else {
                navbar.style.boxShadow = 'none';
            }
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
