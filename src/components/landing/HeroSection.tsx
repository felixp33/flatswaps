// src/components/landing/HeroSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

export default function HeroSection() {
	const [destination, setDestination] = useState("");

	// Popular destinations for the dropdown
	const popularDestinations = [
		{ value: "", label: "Where would you like to go?" },
		{ value: "paris", label: "Paris, France" },
		{ value: "london", label: "London, UK" },
		{ value: "newyork", label: "New York, USA" },
		{ value: "tokyo", label: "Tokyo, Japan" },
		{ value: "barcelona", label: "Barcelona, Spain" },
	];

	return (
		<section className="relative">
			{/* Hero Image */}
			<div className="absolute inset-0 z-0 h-[600px] md:h-[600px]">
				<div className="relative h-full w-full">
					<Image
						src="/images/hero-background.png"
						alt="Beautiful home for exchange"
						fill
						style={{ objectFit: "cover" }}
						priority
					/>
					<div className="absolute inset-0 bg-black opacity-40"></div>
				</div>
			</div>

			{/* Hero Content */}
			<div className="relative z-10 px-4 py-24 sm:px-6 lg:px-8 max-w-7xl mx-auto h-[600px] flex flex-col justify-center">
				<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl">
					Swap Homes, Exchange Lives
				</h1>
				<p className="mt-6 max-w-2xl text-xl text-gray-200">
					Travel like a local by exchanging homes with verified members around the world, or find your perfect
					vacation rental.
				</p>

				{/* Simplified Search Box */}
				<div className="mt-10 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-xl">
					<div className="flex flex-col space-y-4">
						<div>
							<label
								htmlFor="destination"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
							>
								Your Dream Destination
							</label>
							<select
								id="destination"
								value={destination}
								onChange={(e) => setDestination(e.target.value)}
								className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-base"
							>
								{popularDestinations.map((dest) => (
									<option key={dest.value} value={dest.value}>
										{dest.label}
									</option>
								))}
							</select>
						</div>

						<div className="flex flex-col sm:flex-row gap-4">
							<button
								type="button"
								className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								Find Properties
							</button>
							<button
								type="button"
								className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-gray-300 dark:border-gray-600 shadow-sm text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								List Your Home
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
