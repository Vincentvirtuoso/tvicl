export const properties = [
  {
    id: 1,
    slug: "the-skyline-residences",
    name: "The Skyline Residences",
    description:
      "Modern luxury apartments in the heart of the city with panoramic skyline views.",
    longDescription: `
The Skyline Residences offers a seamless blend of urban luxury and modern design. 
Each unit features floor-to-ceiling windows, smart home automation, and high-end finishes.

**Key Features:**
- Rooftop infinity pool
- Fully equipped fitness center
- 24/7 concierge and security
- Pet-friendly environment
- Energy-efficient appliances
    `,
    price: 450000,
    pricePerSqFt: 375,
    sqFeet: 1200,
    bedrooms: 3,
    bathrooms: 2,
    parkingSpaces: 2,
    lotSize: "0.25 acres",
    type: "Apartment",
    category: "For Sale",
    cover: "/images/properties/property_10.png",
    gallery: [
      "/images/properties/property_1.png",
      "/images/properties/property_2.png",
      "/images/properties/property_3.png",
    ],
    documents: [
      {
        name: "Certificate of Occupancy",
        type: "PDF",
        url: "/docs/skyline_certificate.pdf",
        verified: true,
      },
      {
        name: "Building Plan Approval",
        type: "PDF",
        url: "/docs/skyline_plan.pdf",
        verified: true,
      },
    ],
    location: {
      address: "123 Downtown Blvd",
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
      coordinates: [6.5244, 3.3792],
    },
    tags: ["Luxury", "Exclusive", "City View", "Modern", "Smart Home"],
    features: ["Gym", "Pool", "Security", "Smart Locks", "CCTV"],
    status: "Available",
    builtYear: 2023,
    verified: true,
    listedDate: "2025-10-01",
    agent: {
      name: "David Johnson",
      phone: "+234 802 345 6789",
      email: "david@affilhomes.com",
      photo: "/images/logo.png",
    },
  },

  {
    id: 2,
    slug: "palm-grove-villa",
    name: "Palm Grove Villa",
    description:
      "A serene 5-bedroom villa surrounded by lush gardens and modern architecture.",
    longDescription: `
Palm Grove Villa redefines tropical luxury living with private gardens, 
spacious interiors, and seamless indoor-outdoor flow.

**Key Features:**
- Private swimming pool
- Home theater
- Automated lighting
- Solar backup
- Dedicated staff quarters
    `,
    price: 1250000,
    pricePerSqFt: 480,
    sqFeet: 2600,
    bedrooms: 5,
    bathrooms: 4,
    parkingSpaces: 4,
    lotSize: "0.75 acres",
    type: "Villa",
    category: "For Sale",
    cover: "/images/properties/property_4.png",
    gallery: [
      "/images/properties/property_9.png",
      "/images/properties/property_5.png",
      "/images/properties/property_8.png",
    ],
    documents: [
      {
        name: "Deed of Assignment",
        type: "PDF",
        url: "/docs/palmgrove_deed.pdf",
        verified: true,
      },
      {
        name: "Land Survey Document",
        type: "PDF",
        url: "/docs/palmgrove_survey.pdf",
        verified: true,
      },
    ],
    location: {
      address: "45 Palm Avenue, Ikoyi",
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
      coordinates: [6.4549, 3.4246],
    },
    tags: ["Luxury", "Exclusive", "Private Pool", "Smart Home", "Family"],
    features: [
      "Cinema Room",
      "Solar Backup",
      "Security Gate",
      "Garden",
      "Garage",
    ],
    status: "Available",
    builtYear: 2021,
    verified: true,
    listedDate: "2025-09-28",
    agent: {
      name: "Sarah Williams",
      phone: "+234 803 678 4567",
      email: "sarah@affilhomes.com",
      photo: "/images/logo.png",
    },
  },

  {
    id: 3,
    slug: "ocean-breeze-condo",
    name: "Ocean Breeze Condo",
    description:
      "Beachfront condos offering spectacular ocean views and a refreshing coastal breeze.",
    longDescription: `
Ocean Breeze Condo blends sophistication with relaxation, 
offering minimalist interiors and breathtaking oceanfront scenery.

**Key Features:**
- Beach access
- Infinity pool
- Rooftop lounge
- Underground parking
- Ocean-facing balconies
    `,
    price: 600000,
    pricePerSqFt: 420,
    sqFeet: 1500,
    bedrooms: 3,
    bathrooms: 3,
    parkingSpaces: 2,
    lotSize: "0.4 acres",
    type: "Condo",
    category: "For Sale",
    cover: "/images/properties/property_3.png",
    gallery: [
      "/images/properties/property_10.png",
      "/images/properties/property_6.png",
      "/images/properties/property_4.png",
    ],
    documents: [
      {
        name: "Building Permit",
        type: "PDF",
        url: "/docs/oceanbreeze_permit.pdf",
        verified: true,
      },
      {
        name: "Oceanfront Lease Agreement",
        type: "PDF",
        url: "/docs/oceanbreeze_lease.pdf",
        verified: true,
      },
    ],
    location: {
      address: "7 Seaside Road",
      city: "Lekki",
      state: "Lagos",
      country: "Nigeria",
      coordinates: [6.431, 3.479],
    },
    tags: ["Beachfront", "Ocean View", "Luxury", "Modern"],
    features: [
      "Rooftop Bar",
      "Ocean View",
      "Jacuzzi",
      "Private Balcony",
      "Gym",
    ],
    status: "Available",
    builtYear: 2022,
    verified: true,
    listedDate: "2025-09-22",
    agent: {
      name: "Michael Brown",
      phone: "+234 812 333 4444",
      email: "michael@affilhomes.com",
      photo: "/images/logo.png",
    },
  },

  // 🏘 FOR RENT
  {
    id: 4,
    slug: "cedarwood-apartments",
    name: "Cedarwood Apartments",
    description:
      "Modern 2-bedroom apartments available for rent in a quiet, gated neighborhood.",
    longDescription: `
Cedarwood Apartments offers peace, comfort, and convenience. 
Perfect for young professionals or small families looking for security and accessibility.

**Key Features:**
- 24/7 power supply
- Fully fitted kitchen
- Gated compound
- Water treatment system
- Security patrol
    `,
    price: 1800,
    lease: {
      rentType: "Monthly",
      duration: "1 year minimum",
      depositRequired: true,
      furnished: true,
      utilitiesIncluded: false,
    },
    sqFeet: 900,
    bedrooms: 2,
    bathrooms: 2,
    parkingSpaces: 1,
    lotSize: "0.12 acres",
    type: "Apartment",
    category: "For Rent",
    cover: "/images/properties/property_11.png",
    gallery: [
      "/images/properties/property_7.png",
      "/images/properties/property_2.png",
      "/images/properties/property_6.png",
    ],
    documents: [
      {
        name: "Tenancy Agreement",
        type: "PDF",
        url: "/docs/cedarwood_tenancy.pdf",
        verified: true,
      },
      {
        name: "Property Maintenance Policy",
        type: "PDF",
        url: "/docs/cedarwood_maintenance.pdf",
        verified: false,
      },
    ],
    location: {
      address: "8 Palm Drive, Surulere",
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
      coordinates: [6.495, 3.356],
    },
    tags: ["Affordable", "Furnished", "Secure", "Modern"],
    features: [
      "Security",
      "Water Heater",
      "Balcony",
      "Air Conditioning",
      "Power Backup",
    ],
    status: "Occupied",
    builtYear: 2019,
    verified: true,
    listedDate: "2025-09-18",
    agent: {
      name: "Grace Obinna",
      phone: "+234 813 500 9090",
      email: "grace@affilhomes.com",
      photo: "/images/logo.png",
    },
  },

  {
    id: 5,
    slug: "sunset-loft",
    name: "Sunset Loft",
    description:
      "Stylish and compact studio loft for rent in a central business district.",
    longDescription: `
The Sunset Loft is designed for young professionals who value modern living 
with quick access to downtown Lagos. 

**Key Features:**
- Rooftop terrace
- Coworking area
- Smart lock entry
- Daily maintenance service
    `,
    price: 1200,
    lease: {
      rentType: "Monthly",
      duration: "6 months minimum",
      depositRequired: true,
      furnished: false,
      utilitiesIncluded: true,
    },
    sqFeet: 600,
    bedrooms: 1,
    bathrooms: 1,
    parkingSpaces: 0,
    lotSize: "0.1 acres",
    type: "Studio",
    category: "For Rent",
    cover: "/images/properties/property_2.png",
    gallery: [
      "/images/properties/property_1.png",
      "/images/properties/property_2.png",
      "/images/properties/property_3.png",
    ],
    documents: [
      {
        name: "Lease Agreement",
        type: "PDF",
        url: "/docs/sunset_lease.pdf",
        verified: true,
      },
    ],
    location: {
      address: "11 Broad Street, Marina",
      city: "Lagos Island",
      state: "Lagos",
      country: "Nigeria",
      coordinates: [6.452, 3.391],
    },
    tags: ["Studio", "City Center", "Exclusive", "Minimalist", "Cozy"],
    features: ["Wi-Fi", "Smart Entry", "Elevator", "Terrace", "CCTV Security"],
    status: "Available",
    builtYear: 2020,
    verified: true,
    listedDate: "2025-09-15",
    agent: {
      name: "John Adeyemi",
      phone: "+234 802 600 4455",
      email: "john@affilhomes.com",
      photo: "/images/logo.png",
    },
  },
];
