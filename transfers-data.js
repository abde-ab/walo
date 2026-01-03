// Transfers Data for Cadigor Mobility
const transferRoutes = [
    {
        id: "aga-bay",
        from: "Agadir Al Massira Airport (AGA)",
        to: "Agadir Bay / City Center",
        priceStandard: 20, // 1-4 passengers
        priceVan: 35      // 5-7 passengers
    },
    {
        id: "aga-taghazout",
        from: "Agadir Al Massira Airport (AGA)",
        to: "Taghazout / Tamraght",
        priceStandard: 30,
        priceVan: 50
    },
    {
        id: "aga-imsouane",
        from: "Agadir Al Massira Airport (AGA)",
        to: "Imsouane",
        priceStandard: 70,
        priceVan: 100
    },
    {
        id: "mar-aga",
        from: "Marrakech Menara Airport (RAK)",
        to: "Agadir City Center",
        priceStandard: 90,
        priceVan: 130
    }
];

const serviceTypes = [
    { id: "airport-hotel", label: "Airport to Hotel" },
    { id: "hotel-airport", label: "Hotel to Airport" },
    { id: "point-to-point", label: "Point-to-Point" }
];
