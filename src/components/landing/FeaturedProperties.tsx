// src/components/landing/FeaturedProperties.tsx
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/types";

interface FeaturedPropertiesProps {
	properties: Property[];
}

export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
	return (
		<section className="py-16 md:py-24">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
						Featured Properties
					</h2>
					<p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
						Discover exceptional homes available for swap or rent
					</p>
				</div>

				<div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{properties.map((property) => (
						<div
							key={property.id}
							className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-[1.02]"
						>
							<div className="relative h-48 w-full">
								<Image src={property.imageUrl} alt={property.title} fill className="object-cover" />
								{property.isSwapAvailable && (
									<div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
										Available for Swap
									</div>
								)}
							</div>
							<div className="p-6">
								<h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">{property.title}</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">{property.location}</p>
								<div className="mt-4 flex items-center">
									<span className="text-yellow-400">★</span>
									<span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
										{property.rating} ({property.reviews} reviews)
									</span>
								</div>
								<div className="mt-4 flex justify-between items-center">
									<div>
										<span className="text-lg font-semibold text-gray-900 dark:text-white">
											{property.price}
										</span>
										<span className="text-sm text-gray-500 dark:text-gray-400"> / night</span>
									</div>
									<Link
										href={`/properties/${property.id}`}
										className="text-blue-600 hover:text-blue-500 font-medium text-sm"
									>
										View Details
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="mt-12 text-center">
					<Link
						href="/properties"
						className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						View All Properties
					</Link>
				</div>
			</div>
		</section>
	);
}
