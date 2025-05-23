// src/components/landing/PopularDestinations.tsx
import { Destination } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface PopularDestinationsProps {
	destinations: Destination[];
}

export default function PopularDestinations({ destinations }: PopularDestinationsProps) {
	return (
		<section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
						Popular Destinations
					</h2>
					<p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
						Explore homes in these trending locations
					</p>
				</div>

				<div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					{destinations.map((destination, index) => (
						<Link
							key={index}
							href={`/destinations/${destination.name.toLowerCase()}`}
							className="relative rounded-lg overflow-hidden group cursor-pointer"
						>
							<div className="aspect-w-4 aspect-h-3 relative h-64">
								<Image
									src={destination.imageUrl}
									alt={destination.name}
									fill
									className="object-cover transition-transform duration-300 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
							</div>
							<div className="absolute bottom-0 left-0 right-0 p-4 text-white">
								<h3 className="text-xl font-bold">{destination.name}</h3>
								<p className="text-sm">{destination.properties} properties</p>
							</div>
						</Link>
					))}
				</div>

				<div className="mt-12 text-center">
					<Link
						href="/destinations"
						className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						View All Destinations
					</Link>
				</div>
			</div>
		</section>
	);
}
