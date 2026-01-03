// Fleet page functionality
document.addEventListener('DOMContentLoaded', () => {
    const fleetGrid = document.getElementById('fleet-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let currentFilter = 'all';

    // --- Dynamic Pricing System ---
    const pickupDate = sessionStorage.getItem('pickupDate');
    const dropoffDate = sessionStorage.getItem('dropoffDate');
    let rentalDuration = 0;

    if (pickupDate && dropoffDate) {
        const start = new Date(pickupDate);
        const end = new Date(dropoffDate);
        const diffHours = Math.abs(end - start) / (1000 * 60 * 60);

        // 24h cycle logic with 120-minute (2h) grace period
        rentalDuration = Math.floor(diffHours / 24);
        const extraHours = diffHours % 24;

        if (extraHours > 2) {
            rentalDuration += 1;
        }

        // Minimum 1 day charge
        if (rentalDuration < 1) rentalDuration = 1;

        // Show and update the date bar
        const dateBar = document.getElementById('fleet-date-bar');
        if (dateBar) {
            dateBar.style.display = 'block';
            document.getElementById('display-pickup').textContent = pickupDate;
            document.getElementById('display-dropoff').textContent = dropoffDate;
            document.getElementById('display-duration').textContent = `${rentalDuration} Day${rentalDuration > 1 ? 's' : ''}`;
        }
    }

    // Render fleet cards
    function renderFleet(filter = 'all') {
        fleetGrid.innerHTML = '';

        const filteredCars = filter === 'all'
            ? fleetData
            : fleetData.filter(car => car.category === filter);

        filteredCars.forEach(car => {
            const card = createCarCard(car);
            fleetGrid.appendChild(card);
        });
    }

    // Create individual car card
    function createCarCard(car) {
        const card = document.createElement('div');
        card.className = 'fleet-card reveal';
        card.setAttribute('data-category', car.category);

        const totalPrice = rentalDuration > 0 ? (car.pricePerDay * rentalDuration) : null;
        const priceDisplay = totalPrice
            ? `<div class="price-stack">
                 <span class="total-price">€${totalPrice}</span>
                 <span class="price-period">Total for ${rentalDuration} days</span>
                 <span class="price-per-day">(€${car.pricePerDay}/day)</span>
               </div>`
            : `<span class="price">€${car.pricePerDay}</span>/day`;

        card.innerHTML = `
            <div class="card-image">
                <img src="${car.image}" alt="${car.alt}" onerror="this.src='fleet_suv.png'">
                <div class="card-badge">${car.categoryLabel}</div>
            </div>
            <div class="card-content">
                <h3>${car.name}</h3>
                
                <div class="card-specs">
                    <div class="spec-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 6v6l4 2"/>
                        </svg>
                        <span>${car.specs.transmission}</span>
                    </div>
                    <div class="spec-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 12h18M3 6h18M3 18h18"/>
                        </svg>
                        <span>${car.specs.fuel}</span>
                    </div>
                    <div class="spec-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        <span>${car.specs.seats} Seats</span>
                    </div>
                </div>
                
                <div class="card-price">
                    ${priceDisplay}
                </div>
                
                <a href="vehicle-detail.html?id=${car.id}" class="btn btn-primary btn-full">
                    ${rentalDuration > 0 ? 'Book for this duration' : 'Learn More'}
                </a>
            </div>
        `;

        return card;
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Get category and render
            const category = button.getAttribute('data-category');
            currentFilter = category;
            renderFleet(category);
        });
    });

    // --- Skeleton Loaders ---
    function renderSkeletons(count = 6) {
        fleetGrid.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'skeleton-card';
            skeleton.innerHTML = `
                <div class="skeleton-image skeleton"></div>
                <div class="skeleton-content">
                    <div class="skeleton-title skeleton"></div>
                    <div class="skeleton-text skeleton" style="width: 50%"></div>
                    <div class="skeleton-text skeleton" style="width: 40%"></div>
                    <div class="skeleton-text skeleton" style="width: 60%"></div>
                    <div class="skeleton-button skeleton"></div>
                </div>
            `;
            fleetGrid.appendChild(skeleton);
        }
    }

    // Initial render with simulated loading
    renderSkeletons();
    setTimeout(() => {
        renderFleet();
        // Trigger reveal for the newly added cards
        if (window.triggerReveal) window.triggerReveal();
    }, 1000); // 1 second delay for a nice feel

    // Scroll Effect for Navbar (matching other pages)
    const navbar = document.getElementById('navbar');

    // Set initial navbar background to match other pages
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
});
