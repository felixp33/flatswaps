// src/lib/data/mockData.ts

import { Destination, Property, Testimonial } from "@/types";

// Featured properties for the homepage
export const featuredProperties: Property[] = [
	{
		id: "1",
		title: "Modern Loft in Manhattan",
		location: "New York, USA",
		price: "$150",
		rating: 4.9,
		reviews: 128,
		imageUrl:
			"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
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
		imageUrl:
			"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
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
		imageUrl:
			"https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
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
		imageUrl:
			"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
	},
	{
		name: "Paris",
		properties: 980,
		imageUrl:
			"https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
	},
	{
		name: "Tokyo",
		properties: 1420,
		imageUrl:
			"https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
	},
	{
		name: "Barcelona",
		properties: 865,
		imageUrl:
			"https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
	},
];

// Hero images that can be randomly selected or rotated
export const heroImages = [
	{
		url: "https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
		alt: "Beautiful modern home with garden",
	},
	{
		url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		alt: "Cozy apartment with ocean view",
	},
	{
		url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
		alt: "Stylish living room with large windows",
	},
];

// Frequently asked questions for the FAQ section
export const faqs = [
	{
		question: "How does home swapping work?",
		answer:
			"Home swapping allows you to exchange homes with another member for an agreed period. You stay in their home while they stay in yours, or arrange a non-simultaneous swap. FlatSwaps handles all the verification, communication, and agreement processes to make it seamless.",
	},
	{
		question: "Is home swapping safe?",
		answer:
			"Yes, FlatSwaps prioritizes safety through verified profiles, secure messaging, detailed agreements, and reviews. All members undergo ID verification, and properties are verified through virtual or in-person checks. We also provide insurance options specifically designed for home exchanges.",
	},
	{
		question: "What if I only want to swap during specific dates?",
		answer:
			"You have complete control over your availability calendar. Set the dates when your home is available for swapping, and you'll only receive requests for those periods. You can also specify preferred swap durations and update your availability at any time.",
	},
	{
		question: "Can I rent my property instead of swapping?",
		answer:
			"Absolutely! FlatSwaps allows you to list your property for both swapping and traditional rentals. You can choose one or both options, and set different availability and rates for each. This gives you maximum flexibility to utilize your property however works best for you.",
	},
];

// Extract from src/lib/data/mockData.ts

// Testimonials for the homepage
export const testimonials: Testimonial[] = [
	{
		id: "1",
		name: "Emma Thompson",
		location: "London, UK",
		text: "FlatSwaps made it so easy to exchange my London apartment for a beautiful beach house in Barcelona. The process was smooth, and I saved thousands on accommodation costs.",
		avatar:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
	},
	{
		id: "2",
		name: "James Rodriguez",
		location: "Madrid, Spain",
		text: "As someone who travels frequently for work, FlatSwaps has been a game-changer. I've stayed in amazing homes and met wonderful people all over the world.",
		avatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
	},
	{
		id: "3",
		name: "Sophie Chen",
		location: "Singapore",
		text: "The verification system gave me peace of mind when swapping my home. Everything was exactly as described, and my swap partners left my place spotless.",
		avatar:
			"https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2861&q=80",
	},
];
