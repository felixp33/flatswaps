// src/lib/data/mockData.ts
import { Property, Destination, Testimonial } from "@/types";

// Featured properties for the homepage
export const featuredProperties: Property[] = [
	{
		id: "1",
		title: "Berlin Altbau",
		location: "Berlin, Germany",
		price: "$150",
		rating: 4.9,
		reviews: 128,
		imageUrl: "/images/property-1.png",
		isSwapAvailable: true,
		features: {
			bedrooms: 2,
			bathrooms: 1,
			guests: 4,
		},
	},
	{
		id: "2",
		title: "Beachfront Villa",
		location: "Bali, Indonesia",
		price: "$220",
		rating: 4.8,
		reviews: 97,
		imageUrl: "/images/property-2.png",
		isSwapAvailable: false,
		features: {
			bedrooms: 3,
			bathrooms: 2,
			guests: 6,
		},
	},
	{
		id: "3",
		title: "Alpine Ski Chalet",
		location: "Chamonix, France",
		price: "$180",
		rating: 4.7,
		reviews: 76,
		imageUrl: "/images/property-3.png",
		isSwapAvailable: true,
		features: {
			bedrooms: 4,
			bathrooms: 3,
			guests: 8,
		},
	},
];

// Popular destinations for the homepage
export const popularDestinations: Destination[] = [
	{
		name: "London",
		properties: 1250,
		imageUrl: "/images/destination-london.png",
	},
	{
		name: "Paris",
		properties: 980,
		imageUrl: "/images/destination-paris.png",
	},
	{
		name: "Tokyo",
		properties: 1420,
		imageUrl: "/images/destination-tokyo.png",
	},
	{
		name: "Barcelona",
		properties: 865,
		imageUrl: "/images/destination-barcelona.png",
	},
];

// Testimonials for the homepage
export const testimonials: Testimonial[] = [
	{
		id: "1",
		name: "Emma Thompson",
		location: "London, UK",
		text: "flatswaps made it so easy to exchange my London apartment for a beautiful beach house in Barcelona. The process was smooth, and I saved thousands on accommodation costs.",
		avatar: "/images/avatar-1.png",
	},
	{
		id: "2",
		name: "James Rodriguez",
		location: "Madrid, Spain",
		text: "As someone who travels frequently for work, flatswaps has been a game-changer. I've stayed in amazing homes and met wonderful people all over the world.",
		avatar: "/images/avatar-2.png",
	},
	{
		id: "3",
		name: "Sophie Chen",
		location: "Singapore",
		text: "The verification system gave me peace of mind when swapping my home. Everything was exactly as described, and my swap partners left my place spotless.",
		avatar: "/images/avatar-3.png",
	},
];

// Hero images that can be randomly selected or rotated
export const heroImages = [
	{
		url: "/images/hero-background.png",
		alt: "Beautiful modern home with garden",
	},
	{
		url: "/images/hero-background-2.png",
		alt: "Cozy apartment with ocean view",
	},
	{
		url: "/images/hero-background-3.png",
		alt: "Stylish living room with large windows",
	},
];

// Frequently asked questions for the FAQ section
export const faqs = [
	{
		question: "How does home swapping work?",
		answer:
			"Home swapping allows you to exchange homes with another member for an agreed period. You stay in their home while they stay in yours, or arrange a non-simultaneous swap. flatswaps handles all the verification, communication, and agreement processes to make it seamless.",
	},
	{
		question: "Is home swapping safe?",
		answer:
			"Yes, flatswaps prioritizes safety through verified profiles, secure messaging, detailed agreements, and reviews. All members undergo ID verification, and properties are verified through virtual or in-person checks. We also provide insurance options specifically designed for home exchanges.",
	},
	{
		question: "What if I only want to swap during specific dates?",
		answer:
			"You have complete control over your availability calendar. Set the dates when your home is available for swapping, and you'll only receive requests for those periods. You can also specify preferred swap durations and update your availability at any time.",
	},
	{
		question: "Can I rent my property instead of swapping?",
		answer:
			"Absolutely! flatswaps allows you to list your property for both swapping and traditional rentals. You can choose one or both options, and set different availability and rates for each. This gives you maximum flexibility to utilize your property however works best for you.",
	},
];
