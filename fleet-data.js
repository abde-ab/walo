// Fleet Data for Cadigor Mobility
const fleetData = [
    // Category 1: Citadines & Compactes
    {
        id: 'clio-v-manual',
        name: 'Renault Clio V',
        category: 'citadine',
        categoryLabel: 'City & Compact',
        image: 'fleet_clio.png',
        gallery: ['fleet_clio.png', 'fleet_clio.png', 'fleet_clio.png'],
        alt: 'Renault Clio V rental Agadir Morocco - CADIGOR MOBILITY',
        specs: {
            transmission: 'Manual',
            fuel: 'Diesel',
            seats: 5,
            luggage: 2,
            ac: true
        },
        pricePerDay: 32,
        detailedSpecs: {
            modelYear: '2023',
            consumption: '4.8 L/100km',
            babySeat: 'Available',
            safety: 'Airbags, ABS, and Emergency Braking',
            technology: 'Bluetooth, USB, Multimedia Screen'
        },
        marketing: "The Renault Clio V Manual offers the perfect balance of agility and efficiency for city driving and coastal trips."
    },
    {
        id: 'sandero',
        name: 'Dacia Sandero Streetway',
        category: 'citadine',
        categoryLabel: 'City & Compact',
        image: 'fleet_sandero.png',
        gallery: ['fleet_sandero.png', 'fleet_sandero.png', 'fleet_sandero.png'],
        alt: 'Dacia Sandero Streetway rental Agadir Morocco - CADIGOR MOBILITY',
        specs: {
            transmission: 'Manual',
            fuel: 'Petrol',
            seats: 5,
            luggage: 2,
            ac: true
        },
        pricePerDay: 25,
        detailedSpecs: {
            modelYear: '2023',
            consumption: '5.3 L/100km',
            babySeat: 'Available',
            safety: 'Airbags and ABS System',
            technology: 'Bluetooth, USB Port'
        },
        marketing: "Economic and reliable, the Sandero Streetway is ideal for budget-conscious travelers who don't want to compromise on space."
    },
    {
        id: 'i20',
        name: 'Hyundai i20',
        category: 'citadine',
        categoryLabel: 'City & Compact',
        image: 'fleet_i20.png',
        gallery: ['fleet_i20.png', 'fleet_i20.png', 'fleet_i20.png'],
        alt: 'Hyundai i20 rental Agadir Morocco - CADIGOR MOBILITY',
        specs: {
            transmission: 'Automatic',
            fuel: 'Petrol',
            seats: 5,
            luggage: 2,
            ac: true
        },
        pricePerDay: 35,
        detailedSpecs: {
            modelYear: '2024',
            consumption: '5.1 L/100km',
            babySeat: 'Available',
            safety: 'High-strength steel chassis, Airbags, ABS',
            technology: 'Apple CarPlay, Android Auto, Rearview Camera'
        },
        marketing: "The Hyundai i20 Automatic provides a smooth and effortless driving experience, perfect for exploring Agadir in style."
    },
    {
        id: 'clio-v-auto',
        name: 'Renault Clio V (Auto)',
        category: 'citadine',
        categoryLabel: 'City & Compact',
        image: 'clio V cadigor.png',
        gallery: ['clio V cadigor.png', 'clio V cadigor.png', 'clio V cadigor.png'],
        alt: 'Renault Clio V rental Agadir Morocco - CADIGOR MOBILITY',
        specs: {
            transmission: 'Automatic',
            fuel: 'Petrol',
            seats: 5,
            luggage: 2,
            ac: true
        },
        pricePerDay: 35,
        detailedSpecs: {
            modelYear: '2023',
            consumption: '5.1 L/100km',
            babySeat: 'Available',
            safety: 'Airbags and ABS System included',
            technology: 'Bluetooth Connectivity, USB Port, Multimedia Screen, and Rearview Camera'
        },
        marketing: "Experience the ultimate city car with the Clio V Automatic. Its sleek design and advanced tech ensure a premium journey."
    },


    // Category 2: Berline & Famille
    {
        id: 'logan',
        name: 'Dacia Logan',
        category: 'berline',
        categoryLabel: 'Sedans & Family',
        image: 'fleet_logan.png',
        gallery: ['fleet_logan.png', 'fleet_logan.png', 'fleet_logan.png'],
        alt: 'Dacia Logan sedan rental Agadir Morocco - CADIGOR MOBILITY',
        specs: {
            transmission: 'Manual',
            fuel: 'Diesel',
            seats: 5,
            luggage: 3,
            ac: true
        },
        pricePerDay: 29,
        detailedSpecs: {
            modelYear: '2023',
            consumption: '4.5 L/100km',
            babySeat: 'Available',
            safety: 'Reinforced structure, Airbags, ABS',
            technology: 'Bluetooth, USB, Radio CD'
        },
        marketing: "The legendary Dacia Logan remains the king of versatility, offering massive trunk space and unbeatable diesel efficiency."
    },
    {
        id: 'jogger',
        name: 'Dacia Jogger',
        category: 'berline',
        categoryLabel: 'Sedans & Family',
        image: 'fleet_jogger.png',
        gallery: ['fleet_jogger.png', 'fleet_jogger.png', 'fleet_jogger.png'],
        alt: 'Dacia Jogger 7-seater rental Agadir Morocco - CADIGOR MOBILITY',
        specs: {
            transmission: 'Manual',
            fuel: 'Diesel ',
            seats: 7,
            luggage: 4,
            ac: true
        },
        pricePerDay: 38,
        detailedSpecs: {
            modelYear: '2024',
            consumption: '5.0 L/100km',
            babySeat: 'Available',
            safety: '6 Airbags, ABS, ESC',
            technology: '8-inch Touchscreen, Smartphone Mirroring'
        },
        marketing: "With 7 full-sized seats, the Dacia Jogger is the ultimate family explorer for your Moroccan road trip."
    },
    {
        id: 'accent',
        name: 'Hyundai Accent',
        category: 'berline',
        categoryLabel: 'Sedans & Family',
        image: 'fleet_accent.png',
        gallery: ['fleet_accent.png', 'fleet_accent.png', 'fleet_accent.png'],
        alt: 'Hyundai Accent sedan rental Agadir Morocco - CADIGOR MOBILITY',
        specs: {
            transmission: 'Automatic',
            fuel: 'Petrol',
            seats: 5,
            luggage: 3,
            ac: true
        },
        pricePerDay: 34,
        detailedSpecs: {
            modelYear: '2023',
            consumption: '5.6 L/100km',
            babySeat: 'Available',
            safety: 'Airbags, ABS, Stability Control',
            technology: 'Keyless Entry, Bluetooth, Rear sensors'
        },
        marketing: "The Hyundai Accent combines sedan comfort with automatic ease, making long drives between cities a breeze."
    },

    // Category 3: SUV & 4x4
    {
        id: 'duster',
        name: 'Dacia Duster',
        category: 'suv',
        categoryLabel: 'SUV & 4x4',
        image: 'fleet_duster.png',
        gallery: ['fleet_duster.png', 'fleet_duster.png', 'fleet_duster.png'],
        alt: 'Dacia Duster 4x4 rental Agadir Morocco - CADIGOR MOBILITY',
        specs: {
            transmission: 'Manual',
            fuel: 'Diesel',
            seats: 5,
            luggage: 3,
            ac: true
        },
        pricePerDay: 39,
        detailedSpecs: {
            modelYear: '2023',
            consumption: '5.2 L/100km',
            babySeat: 'Available',
            safety: 'Multiview camera, Blind spot warning, Airbags, ABS',
            technology: 'Media Nav, Cruise Control, 4WD mode'
        },
        marketing: "Conquer any terrain with the Dacia Duster. Rugged, capable, and ready for Morocco's diverse landscapes."
    },
    {
        id: 'tucson',
        name: 'Hyundai Tucson',
        category: 'suv',
        categoryLabel: 'SUV & 4x4',
        image: 'fleet_tucson.png',
        gallery: ['fleet_tucson.png', 'fleet_tucson.png', 'fleet_tucson.png'],
        alt: 'Hyundai Tucson SUV rental Agadir Morocco - CADIGOR MOBILITY',
        specs: {
            transmission: 'Automatic',
            fuel: 'Diesel',
            seats: 5,
            luggage: 4,
            ac: true
        },
        pricePerDay: 55,
        detailedSpecs: {
            modelYear: '2024',
            consumption: '5.8 L/100km',
            babySeat: 'Available',
            safety: 'Forward Collision-Avoidance, Lane Keeping, 7 Airbags',
            technology: '10.25-inch Navigation, Wireless Charging, 360 Camera'
        },
        marketing: "The Hyundai Tucson offers a premium SUV experience with cutting-edge technology and superior comfort for all passengers."
    },
    {
        id: 'troc',
        name: 'Volkswagen T-Roc',
        category: 'suv',
        categoryLabel: 'SUV & 4x4',
        image: 'fleet_troc.png',
        gallery: ['fleet_troc.png', 'fleet_troc.png', 'fleet_troc.png'],
        alt: 'Volkswagen T-Roc SUV rental Agadir Morocco - CADIGOR MOBILITY',
        specs: {
            transmission: 'Automatic',
            fuel: 'Diesel ',
            seats: 5,
            luggage: 3,
            ac: true
        },
        pricePerDay: 5,
        detailedSpecs: {
            modelYear: '2024',
            consumption: '5.4 L/100km',
            babySeat: 'Available',
            safety: 'Adaptive Cruise Control, Front Assist, Airbags',
            technology: 'Digital Cockpit, App-Connect, Park Assist'
        },
        marketing: "The VW T-Roc is where style meets capability. Drive a modern icon through the streets of Agadir."
    },
    {
        id: 'touareg',
        name: 'Volkswagen Touareg',
        category: 'suv',
        categoryLabel: 'SUV & 4x4',
        image: 'fleet_touareg.png',
        gallery: ['fleet_touareg.png', 'fleet_touareg.png', 'fleet_touareg.png'],
        alt: 'Volkswagen Touareg luxury SUV rental Agadir Morocco - CADIGOR MOBILITY',
        specs: {
            transmission: 'Automatic',
            fuel: 'Diesel',
            seats: 5,
            luggage: 4,
            ac: true
        },
        pricePerDay: 119,
        detailedSpecs: {
            modelYear: '2024',
            consumption: '7.1 L/100km',
            babySeat: 'Available',
            safety: 'Night Vision, Front Cross Traffic Assist, Matrix LED',
            technology: 'Innovision Cockpit, Head-up Display, Premium Audio'
        },
        marketing: "Indulge in absolute luxury with the VW Touareg. The pinnacle of comfort and status for your journey across Morocco."
    }
];
