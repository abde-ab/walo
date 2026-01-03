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

    // --- Form Submission (WhatsApp) ---
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const service = serviceSelect.options[serviceSelect.selectedIndex].text;
            const route = routeSelect.options[routeSelect.selectedIndex].text;
            const passengers = passengerSelect.options[passengerSelect.selectedIndex].text;
            const date = document.getElementById('transfer-date').value;
            const flight = document.getElementById('flight-number').value;
            const price = priceDisplay.textContent;

            const message = `Hello Cadigor Mobility! I would like to book an Airport Transfer:%0A%0A` +
                `*Service:* ${service}%0A` +
                `*Route:* ${route}%0A` +
                `*Passengers:* ${passengers}%0A` +
                `*Date/Time:* ${date}%0A` +
                `*Flight Number:* ${flight}%0A` +
                `*Fixed Price:* ${price}%0A%0A` +
                `Please confirm my booking. Thank you!`;

            const whatsappUrl = `https://wa.me/212666761111?text=${message}`;
            window.open(whatsappUrl, '_blank');
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
