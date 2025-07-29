// src/types/index.ts

export interface Property {
	id: string;
	title: string;
	location: string;
	price: string;
	rating: number;
	reviews: number;
	imageUrl: string;
	isSwapAvailable?: boolean;
        features: {
                rooms?: number;
                guests?: number;
                amenities?: string[];
        };
	description?: string;
	host?: User;
}

export interface User {
	id: string;
	name: string;
	email?: string;
	avatar?: string;
	location?: string;
	bio?: string;
	memberSince?: string;
	responseRate?: number;
	verified?: boolean;
}

export interface Destination {
	name: string;
	properties: number;
	imageUrl: string;
	description?: string;
}

export interface Testimonial {
	id: string;
	name: string;
	location: string;
	text: string;
	avatar: string;
	rating?: number;
}

export interface SearchFilters {
	location?: string;
	checkIn?: string;
	checkOut?: string;
	guests?: number;
	priceRange?: {
		min: number;
		max: number;
	};
        propertyType?: string;
        swapOnly?: boolean;
        rooms?: number;
        amenities?: string[];
}

export interface NavItem {
	name: string;
	href: string;
	external?: boolean;
}

export interface FAQ {
	question: string;
	answer: string;
}
