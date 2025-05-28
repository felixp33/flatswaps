// src/components/landing/PopularDestination.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Destination {
	name: string;
	properties: number;
	imageUrl: string;
	description?: string;
}

export default function PopularDestinations() {
	// Extended list of destinations for rotation
	const allDestinations: Destination[] = [
		{
			name: "London",
			properties: 1250,
			imageUrl: "/images/destinations/london.png",
		},
		{
			name: "Paris",
			properties: 980,
			imageUrl: "/images/destinations/paris.png",
		},
		{
			name: "Tokyo",
			properties: 1420,
			imageUrl: "/images/destinations/tokyo.png",
		},
		{
			name: "Barcelona",
			properties: 865,
			imageUrl: "/images/destinations/barcelona.png",
		},
		{
			name: "Amsterdam",
			properties: 742,
			imageUrl: "/images/destinations/amsterdam.png",
		},
		{
			name: "Berlin",
			properties: 623,
			imageUrl: "/images/destinations/berlin.png",
		},
		{
			name: "Rome",
			properties: 891,
			imageUrl: "/images/destinations/rome.png",
		},
		{
			name: "New York",
			properties: 1834,
			imageUrl: "/images/destinations/newyork.png",
		},
		{
			name: "Singapore",
			properties: 456,
			imageUrl: "/images/destinations/singapore.png",
		},
		{
			name: "Sydney",
			properties: 567,
			imageUrl: "/images/destinations/sydney.png",
		},
		{
			name: "Vienna",
			properties: 389,
			imageUrl: "/images/destinations/vienna.png",
		},
		{
			name: "Copenhagen",
			properties: 298,
			imageUrl: "/images/destinations/copenhagen.png",
		},
		{
			name: "Prague",
			properties: 445,
			imageUrl: "/images/destinations/prague.png",
		},
		{
			name: "Dublin",
			properties: 334,
			imageUrl: "/images/destinations/dublin.png",
		},
		{
			name: "Stockholm",
			properties: 267,
			imageUrl: "/images/destinations/stockholm.png",
		},
	];

	const [currentDestinations, setCurrentDestinations] = useState<Destination[]>([]);
	const [isFlipping, setIsFlipping] = useState([false, false, false, false]);
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [destinationPool, setDestinationPool] = useState<Destination[]>([]);

	// Initialize with first 4 destinations and create shuffled pool
	useEffect(() => {
		const initial = allDestinations.slice(0, 4);
		setCurrentDestinations(initial);

		// Create a pool of remaining destinations for rotation
		const remaining = allDestinations.slice(4);
		setDestinationPool([...remaining, ...allDestinations.slice(0, 4)]); // Include initial ones for continuous rotation
	}, []);

	// Sequential rotation - one card at a time every 2.5 seconds
	useEffect(() => {
		if (currentDestinations.length === 0) return;

		const interval = setInterval(() => {
			const cardToChange = currentCardIndex;

			// Start flip animation for current card
			setIsFlipping((prev) => {
				const newFlipping = [...prev];
				newFlipping[cardToChange] = true;
				return newFlipping;
			});

			// After flip animation (250ms), change content
			setTimeout(() => {
				setCurrentDestinations((prev) => {
					const newDestinations = [...prev];
					// Get next destination from pool
					const poolIndex = Math.floor(Math.random() * destinationPool.length);
					newDestinations[cardToChange] = destinationPool[poolIndex];
					return newDestinations;
				});

				// End flip animation
				setTimeout(() => {
					setIsFlipping((prev) => {
						const newFlipping = [...prev];
						newFlipping[cardToChange] = false;
						return newFlipping;
					});
				}, 100);
			}, 250);

			// Move to next card
			setCurrentCardIndex((prev) => (prev + 1) % 4);
		}, 2500); // Change every 2.5 seconds

		return () => clearInterval(interval);
	}, [currentCardIndex, destinationPool]);

	// Stagger the flip animation for each card
	const getFlipDelay = (index: number) => {
		return `${index * 100}ms`;
	};

	return (
		<section id="destinations" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
						Popular Student Destinations
					</h2>
					<p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
						Discover amazing places where students are actively swapping homes
					</p>
				</div>

				<div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					{currentDestinations.map((destination, index) => (
						<div
							key={`${destination.name}-${index}`}
							className="relative rounded-lg overflow-hidden group cursor-pointer transform-gpu perspective-1000"
						>
							<div
								className={`relative transition-transform duration-500 transform-style-preserve-3d ${
									isFlipping[index] ? "rotate-y-180" : ""
								}`}
							>
								{/* Card content */}
								<div className="relative h-64 backface-hidden">
									<Image
										src={destination.imageUrl}
										alt={destination.name}
										fill
										className="object-cover transition-transform duration-300 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
									<div className="absolute bottom-0 left-0 right-0 p-4 text-white">
										<h3 className="text-xl font-bold mb-1">{destination.name}</h3>
										<p className="text-sm opacity-90">{destination.properties.toLocaleString()} properties</p>
										<div className="mt-2 flex items-center">
											<div className="flex -space-x-1">
												<div className="w-4 h-4 rounded-full bg-blue-400 border border-white"></div>
												<div className="w-4 h-4 rounded-full bg-green-400 border border-white"></div>
												<div className="w-4 h-4 rounded-full bg-purple-400 border border-white"></div>
											</div>
											<span className="ml-2 text-xs opacity-75">Active students</span>
										</div>
									</div>

									{/* Floating badge */}
									<div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-2 py-1 rounded-full">
										✨ Popular
									</div>

									{/* Active rotation indicator */}
									{isFlipping[index] && (
										<div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
											<div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
										</div>
									)}
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Stats section */}
				<div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
					<div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
						<div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
							{allDestinations.reduce((sum, dest) => sum + dest.properties, 0).toLocaleString()}
						</div>
						<div className="text-sm text-gray-600 dark:text-gray-300">Total Properties</div>
					</div>
					<div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
						<div className="text-2xl font-bold text-green-600 dark:text-green-400">
							{allDestinations.length * 17}
						</div>
						<div className="text-sm text-gray-600 dark:text-gray-300">Cities Available</div>
					</div>
					<div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
						<div className="text-2xl font-bold text-purple-600 dark:text-purple-400">25k+</div>
						<div className="text-sm text-gray-600 dark:text-gray-300">Active Students</div>
					</div>
					<div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
						<div className="text-2xl font-bold text-orange-600 dark:text-orange-400">180+</div>
						<div className="text-sm text-gray-600 dark:text-gray-300">Universities</div>
					</div>
				</div>
			</div>

			<style jsx>{`
				.perspective-1000 {
					perspective: 1000px;
				}
				.transform-style-preserve-3d {
					transform-style: preserve-3d;
				}
				.backface-hidden {
					backface-visibility: hidden;
				}
				.rotate-y-180 {
					transform: rotateY(180deg);
				}
			`}</style>
		</section>
	);
}
