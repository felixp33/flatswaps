// src/components/landing/HeroSection.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
	const [selectedLocation, setSelectedLocation] = useState("");
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [guests, setGuests] = useState("");

	// Popular locations for the dropdown
	const popularLocations = [
		{ value: "paris", label: "Paris, France" },
		{ value: "london", label: "London, UK" },
		{ value: "newyork", label: "New York, USA" },
		{ value: "tokyo", label: "Tokyo, Japan" },
		{ value: "barcelona", label: "Barcelona, Spain" },
	];

	return (
		<section className="relative">
			{/* Hero Image */}
			<div className="absolute inset-0 z-0 h-[700px] md:h-[600px]">
				<div className="relative h-full w-full">
					<Image
						src="https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
						alt="Beautiful home for exchange"
						fill
						style={{ objectFit: "cover" }}
						priority
					/>
					<div className="absolute inset-0 bg-black opacity-40"></div>
				</div>
			</div>

			{/* Hero Content */}
			<div className="relative z-10 px-4 py-24 sm:px-6 lg:px-8 max-w-7xl mx-auto h-[700px] md:h-[600px] flex flex-col justify-center">
				<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl">
					Swap Homes, Exchange Lives
				</h1>
				<p className="mt-6 max-w-2xl text-xl text-gray-200">
					Travel like a local by exchanging homes with verified members around the world, or find your perfect
					vacation rental.
				</p>

				{/* Search Box */}
				<div className="mt-10 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 md:p-6 max-w-4xl">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div className="col-span-1">
							<label
								htmlFor="location"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
							>
								Location
							</label>
							<select
								id="location"
								value={selectedLocation}
								onChange={(e) => setSelectedLocation(e.target.value)}
								className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
							>
								<option value="">Where to?</option>
								{popularLocations.map((location) => (
									<option key={location.value} value={location.value}>
										{location.label}
									</option>
								))}
							</select>
						</div>
						<div className="col-span-1">
							<label
								htmlFor="check-in"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
							>
								Check In
							</label>
							<input
								type="date"
								id="check-in"
								value={checkIn}
								onChange={(e) => setCheckIn(e.target.value)}
								className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
							/>
						</div>
						<div className="col-span-1">
							<label
								htmlFor="check-out"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
							>
								Check Out
							</label>
							<input
								type="date"
								id="check-out"
								value={checkOut}
								onChange={(e) => setCheckOut(e.target.value)}
								className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
							/>
						</div>
						<div className="col-span-1">
							<label
								htmlFor="guests"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
							>
								Guests
							</label>
							<select
								id="guests"
								value={guests}
								onChange={(e) => setGuests(e.target.value)}
								className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
							>
								<option value="">Select</option>
								<option value="1">1 Guest</option>
								<option value="2">2 Guests</option>
								<option value="3">3 Guests</option>
								<option value="4">4 Guests</option>
								<option value="5+">5+ Guests</option>
							</select>
						</div>
					</div>

					<div className="mt-6 flex flex-col sm:flex-row gap-4">
						<button
							type="button"
							className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							Find Properties
						</button>
						<button
							type="button"
							className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 dark:border-gray-600 shadow-sm text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							Find Home Swaps
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
