// src/components/dashboard/PropertySummary.tsx

import Link from "next/link";
import { Home, Edit3, Eye, ChevronRight, MapPin, Users, Star, Plus } from "lucide-react";

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
						<h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
							<Home className="h-5 w-5 mr-2" />
							Your Property
						</h2>
					</div>

					{/* No Property State */}
					<div className="text-center py-8">
						<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
							<Home className="h-6 w-6 text-gray-400" />
						</div>
						<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">No property listed yet</h3>
						<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
							Add your property to start connecting with other exchange students.
						</p>
						<Link
							href="/profile/properties/add"
							className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
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
					<h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
						<Home className="h-5 w-5 mr-2" />
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
				<div className="flex space-x-4 mb-4">
					<div className="relative">
						{property.images[0] ? (
							<img
								src={property.images[0]}
								alt={property.title}
								className="w-20 h-20 rounded-lg object-cover"
								onError={(e) => {
									// Fallback to placeholder if image fails
									e.currentTarget.style.display = "none";
									const fallback = e.currentTarget.nextElementSibling as HTMLElement;
									if (fallback) fallback.style.display = "flex";
								}}
							/>
						) : null}
						<div
							className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center"
							style={{ display: property.images[0] ? "none" : "flex" }}
						>
							<Home className="h-8 w-8 text-gray-400" />
						</div>

						{/* Status Indicator */}
						<div
							className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
								property.isActive ? "bg-green-500" : "bg-gray-400"
							}`}
						></div>
					</div>

					<div className="flex-1">
						<div className="flex items-start justify-between">
							<div>
								<h3 className="font-medium text-gray-900 dark:text-white">{property.title}</h3>
								<div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
									<MapPin className="h-4 w-4 mr-1" />
									{property.location}
								</div>
							</div>
							<span
								className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
									property.isActive
										? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
										: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
								}`}
							>
								{property.isActive ? "Active" : "Inactive"}
							</span>
						</div>

						<div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2 space-x-4">
							<span>{property.bedrooms} bed</span>
							<span>{property.bathrooms} bath</span>
							<div className="flex items-center">
								<Users className="h-4 w-4 mr-1" />
								<span>{property.guests} guests</span>
							</div>
							{property.size && <span>{property.size}m²</span>}
						</div>

						{/* Rating */}
						{property.rating && (
							<div className="flex items-center mt-2">
								<Star className="h-4 w-4 text-yellow-400 mr-1" />
								<span className="text-sm text-gray-600 dark:text-gray-300">
									{property.rating} ({property.reviewCount || 0} reviews)
								</span>
							</div>
						)}
					</div>
				</div>

				{/* Property Description */}
				<p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{property.description}</p>

				{/* Action Buttons */}
				<div className="flex space-x-2">
					<Link
						href={`/profile/properties/${property.id}/edit`}
						className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md transition-colors"
					>
						<Edit3 className="h-4 w-4 mr-2" />
						Edit Property
					</Link>
					<Link
						href="/profile/properties"
						className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
					>
						<Eye className="h-4 w-4 mr-2" />
						Manage Property
					</Link>
				</div>

				{/* Quick Stats */}
				<div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
					<div className="grid grid-cols-3 gap-4 text-center">
						<div>
							<p className="text-lg font-semibold text-gray-900 dark:text-white">12</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">Total Views</p>
						</div>
						<div>
							<p className="text-lg font-semibold text-gray-900 dark:text-white">3</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">Active Matches</p>
						</div>
						<div>
							<p className="text-lg font-semibold text-gray-900 dark:text-white">1</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">Current Swap</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
