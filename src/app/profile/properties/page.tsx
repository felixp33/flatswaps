// src/app/profile/properties/page.tsx
import ProfileLayout from "@/components/profile/ProfileLayout";
import {
	Plus,
	Edit3,
	Eye,
	Calendar,
	MapPin,
	Star,
	Users,
	Bed,
	Bath,
	MoreVertical,
	ToggleLeft,
	ToggleRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MyProperties() {
	// Mock properties data
	const properties = [
		{
			id: "1",
			title: "Modern Loft in Manhattan",
			location: "New York, USA",
			price: "$150",
			rating: 4.9,
			reviews: 28,
			imageUrl:
				"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
			isSwapAvailable: true,
			isActive: true,
			features: {
				bedrooms: 2,
				bathrooms: 1,
				guests: 4,
			},
			bookings: {
				upcoming: 3,
				thisMonth: 8,
			},
			lastBooked: "2024-03-15",
		},
		{
			id: "2",
			title: "Cozy Studio Apartment",
			location: "Brooklyn, NY, USA",
			price: "$85",
			rating: 4.7,
			reviews: 15,
			imageUrl:
				"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
			isSwapAvailable: false,
			isActive: false,
			features: {
				bedrooms: 1,
				bathrooms: 1,
				guests: 2,
			},
			bookings: {
				upcoming: 0,
				thisMonth: 0,
			},
			lastBooked: "2024-01-22",
		},
	];

	return (
		<ProfileLayout>
			<div className="p-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
					<div>
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Properties</h1>
						<p className="text-gray-600 dark:text-gray-300 mt-1">Manage your listings and track performance</p>
					</div>
					<Link
						href="/list-property"
						className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
					>
						<Plus className="h-4 w-4 mr-2" />
						Add New Property
					</Link>
				</div>

				{/* Properties Grid */}
				<div className="grid gap-6">
					{properties.map((property) => (
						<div
							key={property.id}
							className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
						>
							<div className="flex flex-col lg:flex-row">
								{/* Property Image */}
								<div className="relative h-48 lg:h-auto lg:w-64 flex-shrink-0">
									<Image src={property.imageUrl} alt={property.title} fill className="object-cover" />
									<div className="absolute top-3 left-3 flex gap-2">
										{property.isSwapAvailable && (
											<span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
												Swap Available
											</span>
										)}
										<span
											className={`text-xs font-semibold px-2 py-1 rounded-md ${
												property.isActive ? "bg-green-600 text-white" : "bg-gray-600 text-white"
											}`}
										>
											{property.isActive ? "Active" : "Inactive"}
										</span>
									</div>
								</div>

								{/* Property Details */}
								<div className="flex-1 p-6">
									<div className="flex justify-between items-start mb-4">
										<div>
											<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
												{property.title}
											</h3>
											<div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
												<MapPin className="h-4 w-4 mr-1" />
												{property.location}
											</div>
										</div>
										<div className="flex items-center space-x-2">
											<button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
												<MoreVertical className="h-5 w-5" />
											</button>
										</div>
									</div>

									{/* Property Stats */}
									<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
										<div className="flex items-center text-sm">
											<Bed className="h-4 w-4 text-gray-400 mr-2" />
											<span className="text-gray-600 dark:text-gray-300">
												{property.features.bedrooms} bed
											</span>
										</div>
										<div className="flex items-center text-sm">
											<Bath className="h-4 w-4 text-gray-400 mr-2" />
											<span className="text-gray-600 dark:text-gray-300">
												{property.features.bathrooms} bath
											</span>
										</div>
										<div className="flex items-center text-sm">
											<Users className="h-4 w-4 text-gray-400 mr-2" />
											<span className="text-gray-600 dark:text-gray-300">
												{property.features.guests} guests
											</span>
										</div>
										<div className="flex items-center text-sm">
											<Star className="h-4 w-4 text-yellow-400 mr-2" />
											<span className="text-gray-600 dark:text-gray-300">
												{property.rating} ({property.reviews})
											</span>
										</div>
									</div>

									{/* Booking Stats */}
									<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
										<div>
											<p className="text-sm font-medium text-gray-900 dark:text-white">
												{property.bookings.upcoming}
											</p>
											<p className="text-xs text-gray-500 dark:text-gray-400">Upcoming bookings</p>
										</div>
										<div>
											<p className="text-sm font-medium text-gray-900 dark:text-white">
												{property.bookings.thisMonth}
											</p>
											<p className="text-xs text-gray-500 dark:text-gray-400">Bookings this month</p>
										</div>
										<div>
											<p className="text-sm font-medium text-gray-900 dark:text-white">
												{property.price}/night
											</p>
											<p className="text-xs text-gray-500 dark:text-gray-400">Current rate</p>
										</div>
									</div>

									{/* Action Buttons */}
									<div className="flex flex-wrap gap-3">
										<Link
											href={`/properties/${property.id}`}
											className="inline-flex items-center px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
										>
											<Eye className="h-4 w-4 mr-2" />
											View Listing
										</Link>
										<Link
											href={`/profile/properties/${property.id}/edit`}
											className="inline-flex items-center px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
										>
											<Edit3 className="h-4 w-4 mr-2" />
											Edit
										</Link>
										<Link
											href={`/profile/properties/${property.id}/calendar`}
											className="inline-flex items-center px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
										>
											<Calendar className="h-4 w-4 mr-2" />
											Calendar
										</Link>
										<button className="inline-flex items-center px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">
											{property.isActive ? (
												<>
													<ToggleRight className="h-4 w-4 mr-2" />
													Active
												</>
											) : (
												<>
													<ToggleLeft className="h-4 w-4 mr-2" />
													Inactive
												</>
											)}
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Empty State */}
				{properties.length === 0 && (
					<div className="text-center py-12">
						<div className="mx-auto h-24 w-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
							<Plus className="h-8 w-8 text-gray-400" />
						</div>
						<h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">No properties listed yet</h3>
						<p className="text-gray-500 dark:text-gray-400 mt-2">
							Get started by adding your first property listing.
						</p>
						<Link
							href="/list-property"
							className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
						>
							<Plus className="h-4 w-4 mr-2" />
							List Your First Property
						</Link>
					</div>
				)}
			</div>
		</ProfileLayout>
	);
}
