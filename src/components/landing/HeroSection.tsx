"use client";

import { useState, useEffect } from "react";
import { ArrowLeftRight } from "lucide-react";

// Define the Property type
type Property = {
	id: number;
	image: string;
	country: string;
	flag: string;
	alt: string;
};

export default function ImprovedHeroSection() {
	const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);

	// All available properties
	const properties: Property[] = [
		{
			id: 1,
			image: "/images/properties/italy-apartment.png",
			country: "Italy",
			flag: "🇮🇹",
			alt: "Cozy Italian apartment in Florence",
		},
		{
			id: 2,
			image: "/images/properties/bali-villa.png",
			country: "Bali",
			flag: "🇮🇩",
			alt: "Modern tropical villa in Bali",
		},
		{
			id: 3,
			image: "/images/properties/berlin-altbau.png",
			country: "Berlin",
			flag: "🇩🇪",
			alt: "Classic Berlin Altbau apartment",
		},
		{
			id: 4,
			image: "/images/properties/student-apartment.png",
			country: "Amsterdam",
			flag: "🇳🇱",
			alt: "Modern student apartment in Amsterdam",
		},
		{
			id: 5,
			image: "/images/properties/tokyo-minimalist.png",
			country: "Tokyo",
			flag: "🇯🇵",
			alt: "Minimalist apartment in Tokyo",
		},
		{
			id: 6,
			image: "/images/properties/london-victorian.png",
			country: "London",
			flag: "🇬🇧",
			alt: "Victorian flat in London",
		},
	];

	// Randomly select 2 properties on component mount
	useEffect(() => {
		const shuffled = [...properties].sort(() => 0.5 - Math.random());
		setSelectedProperties(shuffled.slice(0, 2));
	}, []);

	return (
		<section className="relative py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
					{/* Left Content */}
					<div className="pt-8">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
							Find your match. Swap your flat.
						</h1>
						<p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
							Match with other renters to exchange apartments - keep your old contract rates while finding the
							right space for your situation.
						</p>

						<div className="space-y-4 mb-8">
							<div className="flex items-center">
								<span className="mr-3">🕒</span>
								<span className="text-gray-700 dark:text-gray-300">Save time & energy</span>
							</div>
							<div className="flex items-center">
								<span className="mr-3">🌍</span>
								<span className="text-gray-700 dark:text-gray-300">1780+ homes available in 67 cities</span>
							</div>
							<div className="flex items-center">
								<span className="mr-3">😊</span>
								<span className="text-gray-700 dark:text-gray-300">Find a home that makes you happy</span>
							</div>
							<div className="flex items-center">
								<span className="mr-3">🏡</span>
								<span className="text-gray-700 dark:text-gray-300">
									More options, better locations – Find a home that fits your needs
								</span>
							</div>
						</div>

						<div className="mt-8">
							<a
								href="/auth/signup"
								className="inline-block bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
							>
								Let's find your match now!
							</a>
						</div>
					</div>

					{/* Right Content - Property Images */}
					<div className="relative h-[500px] w-full flex justify-center items-center">
						<div className="relative flex items-center gap-4 max-w-full px-4">
							{selectedProperties.length === 2 && (
								<>
									<div className="relative w-full max-w-[256px] min-w-[150px] -translate-y-8">
										<img
											src={selectedProperties[0].image}
											alt={selectedProperties[0].alt}
											className="rounded-xl shadow-lg w-full aspect-[3/4] object-cover border-4 border-white"
										/>
										<div className="absolute top-4 left-4">
											<span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm shadow-sm font-medium text-gray-800">
												{selectedProperties[0].flag} {selectedProperties[0].country}
											</span>
										</div>
									</div>

									<div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg z-30 shrink-0 border border-gray-200 dark:border-gray-700">
										<ArrowLeftRight className="w-6 h-6 text-blue-500" />
									</div>

									<div className="relative w-full max-w-[256px] min-w-[150px]">
										<img
											src={selectedProperties[1].image}
											alt={selectedProperties[1].alt}
											className="rounded-xl shadow-lg w-full aspect-[3/4] object-cover border-4 border-white"
										/>
										<div className="absolute top-4 left-4">
											<span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm shadow-sm font-medium text-gray-800">
												{selectedProperties[1].flag} {selectedProperties[1].country}
											</span>
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Background gradient */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-gray-800/50 dark:to-gray-900/50 -z-10"></div>
		</section>
	);
}
