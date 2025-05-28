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
	Home,
	Heart,
	MessageCircle,
	Camera,
	Shield,
	Award,
	Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MyFlat() {
	// Mock user's single flat data
	const userFlat = {
		id: "1",
		title: "Modern Loft in Manhattan",
		location: "New York, USA",
		description:
			"Beautiful modern loft in the heart of Manhattan, perfect for couples or small families. Walking distance to Central Park and excellent public transport connections.",
		imageUrl: "/images/properties/modern-loft-manhattan.png",
		isSwapAvailable: true,
		isActive: true,
		features: {
			bedrooms: 2,
			bathrooms: 1,
			guests: 4,
			size: 85, // Square meters
		},
		amenities: {
			general: ["2nd Floor", "Suitable for vacation rentals"],
			accessibility: ["Elevator"],
			interior: ["Fitted Kitchen", "Shower", "Separate WC", "Basement Storage", "Tile Flooring"],
			exterior: ["Mountain View", "Winter Garden", "Underground Garage", "Plastic Windows"],
			equipment: ["DSL Connection", "Washing Machine", "Cable Connection", "WiFi"],
		},
		availability: {
			nextAvailable: "March 15, 2024",
			preferredDuration: "1-4 weeks",
			restrictions: "No smoking, pets welcome",
		},
		lastUpdated: "2024-03-01",
		memberSince: "2023-03-15",
		verified: true,
	};

	const hasFlat = true; // In real app, this would check if user has a flat listed

	if (!hasFlat) {
		// Empty state when user hasn't listed their flat yet
		return (
			<ProfileLayout>
				<div className="p-6">
					<div className="text-center py-16">
						<div className="mx-auto h-32 w-32 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-8">
							<Home className="h-12 w-12 text-gray-400" />
						</div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">List Your Flat</h1>
						<p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
							Start your home swapping journey by listing your flat. Connect with travelers worldwide and
							experience new destinations by exchanging homes.
						</p>
						<div className="space-y-4 mb-8">
							<div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
								<Shield className="h-5 w-5 mr-2" />
								<span>Verified and secure platform</span>
							</div>
							<div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
								<Heart className="h-5 w-5 mr-2" />
								<span>Connect with trusted home swappers</span>
							</div>
							<div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
								<Award className="h-5 w-5 mr-2" />
								<span>No booking fees, just pure exchange</span>
							</div>
						</div>
						<Link
							href="/list-property"
							className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
						>
							<Plus className="h-6 w-6 mr-3" />
							List Your Flat
						</Link>
					</div>
				</div>
			</ProfileLayout>
		);
	}

	return (
		<ProfileLayout>
			<div className="p-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Flat</h1>
						<p className="text-gray-600 dark:text-gray-300 mt-2">
							Manage your flat listing and track swap activity
						</p>
					</div>
					<div className="flex gap-3 mt-4 sm:mt-0">
						<Link
							href={`/profile/properties/${userFlat.id}/edit`}
							className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
						>
							<Edit3 className="h-4 w-4 mr-2" />
							Edit Listing
						</Link>
						<button className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors">
							{userFlat.isActive ? (
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

				{/* Flat Overview Card */}
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
					<div className="flex flex-col lg:flex-row">
						{/* Flat Image */}
						<div className="relative h-64 lg:h-auto lg:w-80 flex-shrink-0">
							<Image src={userFlat.imageUrl} alt={userFlat.title} fill className="object-cover" />
							<div className="absolute top-4 left-4 flex gap-2">
								{userFlat.verified && (
									<span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center">
										<Shield className="h-3 w-3 mr-1" />
										Verified
									</span>
								)}
								<span
									className={`text-xs font-semibold px-3 py-1 rounded-full ${
										userFlat.isActive ? "bg-blue-600 text-white" : "bg-gray-600 text-white"
									}`}
								>
									{userFlat.isActive ? "Available for Swap" : "Unavailable"}
								</span>
							</div>
							<div className="absolute top-4 right-4">
								<Link
									href="/profile/flat/gallery"
									className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
								>
									<Camera className="h-4 w-4" />
								</Link>
							</div>
						</div>

						{/* Flat Details */}
						<div className="flex-1 p-8">
							<div className="flex justify-between items-start mb-6">
								<div>
									<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{userFlat.title}</h2>
									<div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
										<MapPin className="h-5 w-5 mr-2" />
										{userFlat.location}
									</div>
									<div className="flex items-center space-x-6 text-sm">
										<div className="flex items-center">
											<Bed className="h-4 w-4 text-gray-400 mr-2" />
											<span className="text-gray-600 dark:text-gray-300">
												{userFlat.features.bedrooms} bedrooms
											</span>
										</div>
										<div className="flex items-center">
											<Bath className="h-4 w-4 text-gray-400 mr-2" />
											<span className="text-gray-600 dark:text-gray-300">
												{userFlat.features.bathrooms} bathroom
											</span>
										</div>
										<div className="flex items-center">
											<Users className="h-4 w-4 text-gray-400 mr-2" />
											<span className="text-gray-600 dark:text-gray-300">
												Up to {userFlat.features.guests} guests
											</span>
										</div>
										<div className="flex items-center">
											<Home className="h-4 w-4 text-gray-400 mr-2" />
											<span className="text-gray-600 dark:text-gray-300">{userFlat.features.size} m²</span>
										</div>
									</div>
								</div>
								<button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
									<MoreVertical className="h-5 w-5" />
								</button>
							</div>

							<p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{userFlat.description}</p>

							{/* Amenities */}
							<div className="mb-6">
								<h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
									Amenities & Features
								</h3>

								{/* General Information */}
								<div className="mb-4">
									<h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
										General Information
									</h4>
									<div className="flex flex-wrap gap-2">
										{userFlat.amenities.general.map((amenity, index) => (
											<span
												key={index}
												className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
											>
												{amenity}
											</span>
										))}
									</div>
								</div>

								{/* Accessibility */}
								<div className="mb-4">
									<h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
										Accessibility
									</h4>
									<div className="flex flex-wrap gap-2">
										{userFlat.amenities.accessibility.map((amenity, index) => (
											<span
												key={index}
												className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
											>
												{amenity}
											</span>
										))}
									</div>
								</div>

								{/* Interior */}
								<div className="mb-4">
									<h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
										Interior
									</h4>
									<div className="flex flex-wrap gap-2">
										{userFlat.amenities.interior.map((amenity, index) => (
											<span
												key={index}
												className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
											>
												{amenity}
											</span>
										))}
									</div>
								</div>

								{/* Exterior */}
								<div className="mb-4">
									<h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
										Exterior
									</h4>
									<div className="flex flex-wrap gap-2">
										{userFlat.amenities.exterior.map((amenity, index) => (
											<span
												key={index}
												className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
											>
												{amenity}
											</span>
										))}
									</div>
								</div>

								{/* Equipment */}
								<div className="mb-4">
									<h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
										Equipment
									</h4>
									<div className="flex flex-wrap gap-2">
										{userFlat.amenities.equipment.map((amenity, index) => (
											<span
												key={index}
												className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
											>
												{amenity}
											</span>
										))}
									</div>
								</div>
							</div>

							{/* Action Button */}
							<div className="flex justify-end">
								<Link
									href={`/properties/${userFlat.id}`}
									className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
								>
									<Eye className="h-4 w-4 mr-2" />
									View Public Listing
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* Availability & Recent Activity */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Availability</h3>
						<div className="space-y-4">
							<div>
								<span className="text-sm font-medium text-gray-500 dark:text-gray-400">Next Available</span>
								<p className="text-gray-900 dark:text-white">{userFlat.availability.nextAvailable}</p>
							</div>
							<div>
								<span className="text-sm font-medium text-gray-500 dark:text-gray-400">Preferred Duration</span>
								<p className="text-gray-900 dark:text-white">{userFlat.availability.preferredDuration}</p>
							</div>
							<div>
								<span className="text-sm font-medium text-gray-500 dark:text-gray-400">House Rules</span>
								<p className="text-gray-900 dark:text-white">{userFlat.availability.restrictions}</p>
							</div>
						</div>
						<Link
							href="/profile/flat/calendar"
							className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
						>
							<Calendar className="h-4 w-4 mr-2" />
							Manage Calendar
						</Link>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
						<div className="space-y-4">
							<div className="flex items-start space-x-3">
								<div className="flex-shrink-0 p-2 bg-green-100 dark:bg-green-900 rounded-full">
									<MessageCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
								</div>
								<div>
									<p className="text-sm text-gray-900 dark:text-white">
										New swap request from Sarah in Barcelona
									</p>
									<p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
								</div>
							</div>
							<div className="flex items-start space-x-3">
								<div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
									<Star className="h-4 w-4 text-blue-600 dark:text-blue-400" />
								</div>
								<div>
									<p className="text-sm text-gray-900 dark:text-white">Received 5-star review from Marco</p>
									<p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
								</div>
							</div>
							<div className="flex items-start space-x-3">
								<div className="flex-shrink-0 p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
									<Home className="h-4 w-4 text-purple-600 dark:text-purple-400" />
								</div>
								<div>
									<p className="text-sm text-gray-900 dark:text-white">Completed swap with Emma in London</p>
									<p className="text-xs text-gray-500 dark:text-gray-400">1 week ago</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Quick Actions */}
				<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
					<h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-4">Quick Actions</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						<Link
							href="/profile/matches"
							className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
						>
							<Heart className="h-6 w-6 text-blue-600 mr-3" />
							<div>
								<p className="text-sm font-medium text-gray-900 dark:text-white">View Matches</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">Find swap partners</p>
							</div>
						</Link>

						<Link
							href="/profile/messages"
							className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
						>
							<MessageCircle className="h-6 w-6 text-blue-600 mr-3" />
							<div>
								<p className="text-sm font-medium text-gray-900 dark:text-white">Messages</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">3 unread</p>
							</div>
						</Link>

						<Link
							href="/profile/flat/calendar"
							className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
						>
							<Calendar className="h-6 w-6 text-blue-600 mr-3" />
							<div>
								<p className="text-sm font-medium text-gray-900 dark:text-white">Calendar</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">Manage availability</p>
							</div>
						</Link>

						<Link
							href="/find-swap"
							className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
						>
							<Search className="h-6 w-6 text-blue-600 mr-3" />
							<div>
								<p className="text-sm font-medium text-gray-900 dark:text-white">Find Swaps</p>
								<p className="text-xs text-gray-500 dark:gray-400">Discover new places</p>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</ProfileLayout>
	);
}
