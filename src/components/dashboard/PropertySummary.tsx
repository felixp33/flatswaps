// src/components/dashboard/PropertySummary.tsx

import Link from "next/link";
import { Home, ChevronRight, MapPin, Plus } from "lucide-react";

interface PropertySummaryProps {
	property?: {
		id: string;
		title: string;
		description: string;
		location: string;
		bedrooms: number;
		bathrooms: number;
		guests: number;
		size?: number;
		images: string[];
		rating?: number;
		reviewCount?: number;
		isActive?: boolean;
	};
}

export default function PropertySummary({ property }: PropertySummaryProps) {
	// If no property, show add property state
	if (!property) {
		return (
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
				<div className="p-6">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
							<Home className="h-4 w-4 mr-2" />
							Your Property
						</h2>
					</div>

					{/* No Property State - Horizontal Layout */}
					<div className="flex items-center space-x-4">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 flex-shrink-0">
							<Home className="h-5 w-5 text-gray-400" />
						</div>
						<div className="flex-1 min-w-0">
							<h3 className="text-sm font-medium text-gray-900 dark:text-white">No property listed</h3>
							<p className="text-xs text-gray-600 dark:text-gray-300">Connect with exchange students</p>
						</div>
						<Link
							href="/profile/properties/add"
							className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex-shrink-0"
						>
							<Plus className="h-4 w-4 mr-2" />
							Add Property
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
			<div className="p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
						<Home className="h-4 w-4 mr-2" />
						Your Property
					</h2>
					<Link
						href="/profile/properties"
						className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
					>
						View Details
						<ChevronRight className="h-4 w-4 ml-1" />
					</Link>
				</div>

				{/* Property Info */}
				<div className="flex space-x-3">
					<div className="relative">
						{property.images[0] ? (
							<img
								src={property.images[0]}
								alt={property.title}
								className="w-12 h-12 rounded-lg object-cover"
								onError={(e) => {
									// Fallback to placeholder if image fails
									e.currentTarget.style.display = "none";
									const fallback = e.currentTarget.nextElementSibling as HTMLElement;
									if (fallback) fallback.style.display = "flex";
								}}
							/>
						) : null}
						<div
							className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center"
							style={{ display: property.images[0] ? "none" : "flex" }}
						>
							<Home className="h-6 w-6 text-gray-400" />
						</div>

						{/* Status Indicator */}
						<div
							className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
								property.isActive ? "bg-green-500" : "bg-gray-400"
							}`}
						></div>
					</div>

					<div className="flex-1 min-w-0">
						<h3 className="font-medium text-gray-900 dark:text-white truncate">{property.title}</h3>
						<div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
							<MapPin className="h-3 w-3 mr-1" />
							<span className="truncate">{property.location}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
