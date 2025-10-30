import { FaNairaSign } from "react-icons/fa6";
import {
  LuCheck,
  LuClipboardCheck,
  LuFileText,
  LuHouse,
  LuImages,
  LuMapPin,
  LuPhone,
} from "react-icons/lu";

export const steps = [
  { num: 1, title: "Basic Info", icon: LuHouse },
  { num: 2, title: "Location", icon: LuMapPin },
  { num: 3, title: "Pricing", icon: FaNairaSign },
  { num: 4, title: "Details", icon: LuFileText },
  { num: 5, title: "Media Uploads", icon: LuImages },
  { num: 6, title: "Features", icon: LuClipboardCheck },
  { num: 7, title: "Contact", icon: LuPhone },
  { num: 8, title: "Review", icon: LuCheck },
];

export const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export const propertyTypes = [
  "Self Contained",
  "Mini Flat",
  "Flat/Apartment",
  "Bungalow",
  "Detached Duplex",
  "Semi-Detached Duplex",
  "Terraced Duplex",
  "Mansion",
  "Block of Flats",
  "Commercial",
  "Plot",
  "Office",
  "Warehouse",
  "Serviced Apartment",
];

export const flatTypes = [
  "Studio",
  "1 Bedroom",
  "2 Bedroom",
  "3 Bedroom",
  "4 Bedroom",
  "5+ Bedroom",
];

export const amenitiesList = [
  "Swimming Pool",
  "Gym",
  "Garden",
  "Kids Play Area",
  "Clubhouse",
  "Security",
  "CCTV",
  "Gated Community",
  "Lift",
  "Generator",
  "Inverter",
  "Borehole",
  "Piped Water",
  "Water Treatment",
  "Fire Safety",
  "Intercom",
  "Visitor Parking",
  "Street Lights",
  "Fence",
  "Gatehouse",
  "Commercial Mall Nearby",
  "School Nearby",
];

export const additionalRoomsList = [
  "Servant Room",
  "Study Room",
  "Pooja Room",
  "Store Room",
  "Home Theater",
  "Terrace",
];

export const fields = {
  // Basic Info
  title: "",
  description: "",
  propertyType: "",
  flatType: "",
  listingType: "",

  // Address
  address: {
    street: "",
    area: "",
    city: "",
    state: "",
    lga: "",
    postalCode: "",
    landmark: "",
  },

  // Location coordinates
  location: {
    type: "Point",
    coordinates: [0, 0], // [longitude, latitude]
  },

  // Rooms
  bedrooms: 0,
  bathrooms: 0,
  kitchens: 1,
  balconies: 0,

  // Floor details
  floor: "",
  totalFloors: "",

  // Sizes
  floorSizeValue: "",
  floorSizeUnit: "sqft",
  carpetAreaValue: "",
  carpetAreaUnit: "sqft",

  // Pricing
  priceAmount: "",
  negotiable: false,
  transactionType: "",

  // Rental details
  depositAmount: "",
  rentFrequency: "Monthly",
  leaseDurationMonths: "",
  petsAllowed: false,
  preferredTenants: "Anyone",
  serviceChargeAmount: "",
  serviceChargeFrequency: "Monthly",
  agencyFeePercent: "",
  cautionFee: "",

  // Condition
  furnishingStatus: "",
  propertyCondition: "",
  possessionStatus: "",
  availableFrom: new Date().toISOString().split("T")[0],
  yearBuilt: "",

  // Parking
  coveredParking: 0,
  openParking: 0,

  // Amenities
  amenities: [],

  // Utilities
  waterSupply: "Municipal",
  powerBackup: "None",
  gas: "None",

  // Orientation
  facing: "",

  // Additional
  additionalRooms: [],
  highlights: "",

  // Contact
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  contactRole: "",

  // Legal
  hasCofo: false,
  hasGovernorsConsent: false,
  hasSurveyPlan: false,
  hasDeedOfAssignment: false,
  hasExcision: false,
};

export const generateMediaCategories = (data) => {
  const cats = [
    {
      id: "cover",
      label: "Cover Photo",
      description: "Main property image (required)",
      required: true,
      minImages: 1,
      maxImages: 1,
      icon: "🏠",
    },
    {
      id: "exterior",
      label: "Exterior/Building",
      description: "Outside views, facade, compound",
      required: true,
      minImages: 2,
      icon: "🏢",
      maxImages: 7,
    },
    {
      id: "living",
      label: "Living Room",
      description: "Main living area",
      required: true,
      minImages: 2,
      icon: "🛋️",
      maxImages: 4,
    },
  ];

  // Add bedrooms
  const bedroomCount = parseInt(data.bedrooms) || 0;
  for (let i = 1; i <= bedroomCount; i++) {
    cats.push({
      id: `bedroom_${i}`,
      label: `Bedroom ${i}${i === 1 ? " (Master)" : ""}`,
      description: `Photos of bedroom ${i}`,
      required: true,
      minImages: 1,
      icon: "🛏️",
      maxImages: 4,
    });
  }

  // Add bathrooms
  const bathroomCount = parseInt(data.bathrooms) || 0;
  for (let i = 1; i <= bathroomCount; i++) {
    cats.push({
      id: `bathroom_${i}`,
      label: `Bathroom ${i}`,
      description: `Toilet, shower, fixtures`,
      required: true,
      minImages: 1,
      maxImages: 4,
      icon: "🚿",
    });
  }

  // Add kitchens
  const kitchenCount = parseInt(data.kitchens) || 0;
  for (let i = 1; i <= kitchenCount; i++) {
    cats.push({
      id: `kitchen_${i}`,
      label: kitchenCount > 1 ? `Kitchen ${i}` : "Kitchen",
      description: "Cabinets, appliances, countertops",
      required: true,
      minImages: 1,
      maxImages: 4,
      icon: "🍳",
    });
  }

  // Add balconies if any
  const balconyCount = parseInt(data.balconies) || 0;
  if (balconyCount > 0) {
    for (let i = 1; i <= balconyCount; i++) {
      cats.push({
        id: `balcony_${i}`,
        label: balconyCount > 1 ? `Balcony ${i}` : "Balcony",
        description: "Outdoor space, view",
        required: false,
        minImages: 1,
        maxImages: 4,
        icon: "🌿",
      });
    }
  }

  // Add additional rooms
  if (data.additionalRooms && data.additionalRooms.length > 0) {
    data.additionalRooms.forEach((room, idx) => {
      cats.push({
        id: `additional_${idx}`,
        label: room || `Additional Room ${idx + 1}`,
        description: "Other spaces",
        required: false,
        minImages: 1,
        maxImages: 4,
        icon: "📦",
      });
    });
  }

  // Optional categories
  cats.push(
    {
      id: "dining",
      label: "Dining Area",
      description: "Dining space (optional)",
      required: false,
      minImages: 1,
      icon: "🍽️",
    },
    {
      id: "parking",
      label: "Parking",
      description: "Garage, parking space",
      required: false,
      minImages: 1,
      icon: "🚗",
    },
    {
      id: "other",
      label: "Other",
      description: "Additional photos",
      required: false,
      minImages: 0,
      icon: "📸",
    }
  );

  return cats;
};
