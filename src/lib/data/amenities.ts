export const AMENITY_CATEGORIES = {
    essentials: {
        title: "Essentials",
        amenities: ["WiFi", "Heating", "Air Conditioning", "Parking", "Kitchen Access"],
    },
    appliances: {
        title: "Appliances",
        amenities: ["Washer", "Dryer", "Dishwasher", "Microwave", "Refrigerator"],
    },
    accessibility: {
        title: "Accessibility",
        amenities: ["Wheelchair Access", "Elevator", "Ground Floor Access"],
    },
    policies: {
        title: "Policies",
        amenities: ["Pets Allowed", "Smoking Allowed"],
    },
} as const;

export type AmenityCategoryKey = keyof typeof AMENITY_CATEGORIES;

export const ALL_AMENITIES = Object.values(AMENITY_CATEGORIES).flatMap((c) => c.amenities);
