// src/app/profile/searches/page.tsx
"use client";

import { useState } from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import {
	Search,
	Plus,
	Edit3,
	Trash2,
	MapPin,
	Home,
	Users,
	Bed,
	Bath,
	Calendar,
	Filter,
	Heart,
	Bell,
	MoreVertical,
	Eye,
	Play,
	Pause,
	AlertTriangle,
} from "lucide-react";
import Link from "next/link";

export default function SearchesPage() {
	const [deleteModal, setDeleteModal] = useState({
		isOpen: false,
		searchId: null as string | null,
		searchName: "",
	});
	const [isDeleting, setIsDeleting] = useState(false);

	// Consistent date formatting function to match other files
	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	// Mock searches data with consistent date formatting
	const searches = [
		{
			id: "1",
			name: "Summer in Barcelona",
			location: "Barcelona, Spain",
			isActive: true,
			createdDate: "2024-02-15",
			lastUpdated: "2024-03-01",
			matchCount: 12,
			newMatches: 3,
			criteria: {
				bedrooms: 2,
				bathrooms: 1,
				guests: 4,
				propertyType: "Apartment",
				dateRange: "Jun 15 - Jul 15, 2024",
				amenities: ["WiFi", "Kitchen", "Balcony"],
				swapDuration: "1 month",
			},
			alertsEnabled: true,
		},
		{
			id: "2",
			name: "Tokyo Adventure",
			location: "Tokyo, Japan",
			isActive: false,
			createdDate: "2024-01-20",
			lastUpdated: "2024-02-10",
			matchCount: 8,
			newMatches: 0,
			criteria: {
				bedrooms: 1,
				bathrooms: 1,
				guests: 2,
				propertyType: "Studio",
				dateRange: "Apr 1 - Apr 30, 2024",
				amenities: ["WiFi", "Elevator", "Near Metro"],
				swapDuration: "1 month",
			},
			alertsEnabled: false,
		},
		{
			id: "3",
			name: "London Business Trip",
			location: "London, UK",
			isActive: true,
			createdDate: "2024-03-05",
			lastUpdated: "2024-03-10",
			matchCount: 15,
			newMatches: 5,
			criteria: {
				bedrooms: 1,
				bathrooms: 1,
				guests: 2,
				propertyType: "Apartment",
				dateRange: "May 10 - May 24, 2024",
				amenities: ["WiFi", "Business Center", "Good Transport"],
				swapDuration: "2 weeks",
			},
			alertsEnabled: true,
		},
	];

	const getStatusColor = (isActive: boolean) => {
		return isActive
			? "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300"
			: "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300";
	};

	const handleDeleteClick = (searchId: string, searchName: string) => {
		setDeleteModal({
			isOpen: true,
			searchId,
			searchName,
		});
	};

	const handleDeleteConfirm = () => {
		setIsDeleting(true);
		// Simulate deletion - replace with your actual logic later
		setTimeout(() => {
			console.log(`Deleted search: ${deleteModal.searchId}`);
			setDeleteModal({ isOpen: false, searchId: null, searchName: "" });
			setIsDeleting(false);
			// Here you would remove the item from your searches array
		}, 1000);
	};

	const handleDeleteCancel = () => {
		setDeleteModal({ isOpen: false, searchId: null, searchName: "" });
	};

	return (
		<ProfileLayout>
			<div className="p-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
					<div>
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Searches</h1>
					</div>
					<Link
						href="/profile/searches/create"
						className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
					>
						<Plus className="h-4 w-4 mr-2" />
						Create New Search
					</Link>
				</div>

				{/* Search Stats */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
					{[
						{ label: "Active Searches", value: "2", icon: Search, color: "text-blue-600" },
						{ label: "Total Matches", value: "35", icon: Heart, color: "text-pink-600" },
						{ label: "New This Week", value: "8", icon: Bell, color: "text-green-600" },
						{ label: "Saved Searches", value: "3", icon: Filter, color: "text-purple-600" },
					].map((stat, index) => {
						const Icon = stat.icon;
						return (
							<div
								key={index}
								className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
							>
								<div className="flex items-center">
									<Icon className={`h-6 w-6 ${stat.color} mr-3`} />
									<div>
										<p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
										<p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* Searches List */}
				<div className="space-y-4">
					{searches.map((search) => (
						<div
							key={search.id}
							className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
						>
							<div className="flex flex-col lg:flex-row lg:items-start justify-between">
								<div className="flex-1">
									{/* Search Header */}
									<div className="flex items-start justify-between mb-4">
										<div>
											<div className="flex items-center space-x-3 mb-2">
												<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
													{search.name}
												</h3>
												<span
													className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
														search.isActive
													)}`}
												>
													{search.isActive ? "Active" : "Paused"}
												</span>
												{search.newMatches > 0 && (
													<span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
														{search.newMatches} new
													</span>
												)}
											</div>
											<div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
												<MapPin className="h-4 w-4 mr-1" />
												{search.location}
											</div>
											<div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
												<Calendar className="h-4 w-4 mr-1" />
												{search.criteria.dateRange}
											</div>
										</div>
										<div className="flex items-center space-x-2">
											<button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
												<MoreVertical className="h-5 w-5" />
											</button>
										</div>
									</div>

									{/* Search Criteria */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
										<div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
											<h4 className="font-medium text-gray-900 dark:text-white text-sm mb-2">
												Property Requirements
											</h4>
											<div className="flex items-center text-xs text-gray-600 dark:text-gray-300 space-x-4">
												<div className="flex items-center">
													<Bed className="h-3 w-3 mr-1" />
													<span>{search.criteria.bedrooms} bed</span>
												</div>
												<div className="flex items-center">
													<Bath className="h-3 w-3 mr-1" />
													<span>{search.criteria.bathrooms} bath</span>
												</div>
												<div className="flex items-center">
													<Users className="h-3 w-3 mr-1" />
													<span>{search.criteria.guests} guests</span>
												</div>
											</div>
											<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
												{search.criteria.propertyType} • {search.criteria.swapDuration}
											</p>
										</div>
										<div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
											<h4 className="font-medium text-gray-900 dark:text-white text-sm mb-2">
												Preferred Amenities
											</h4>
											<div className="flex flex-wrap gap-1">
												{search.criteria.amenities.map((amenity, index) => (
													<span
														key={index}
														className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
													>
														{amenity}
													</span>
												))}
											</div>
										</div>
									</div>

									{/* Search Stats */}
									<div className="flex items-center justify-between mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
										<div className="flex items-center space-x-4">
											<div className="flex items-center">
												<Heart className="h-4 w-4 text-pink-500 mr-1" />
												<span className="text-sm font-medium text-gray-900 dark:text-white">
													{search.matchCount} matches found
												</span>
											</div>
											<div className="flex items-center">
												<Bell
													className={`h-4 w-4 mr-1 ${
														search.alertsEnabled ? "text-green-500" : "text-gray-400"
													}`}
												/>
												<span className="text-sm text-gray-600 dark:text-gray-300">
													Alerts {search.alertsEnabled ? "on" : "off"}
												</span>
											</div>
										</div>
										<div className="text-xs text-gray-500 dark:text-gray-400">
											Last updated: {formatDate(search.lastUpdated)}
										</div>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex flex-col lg:flex-col space-y-2 lg:ml-4 mt-4 lg:mt-0">
									<Link
										href={`/profile/matches?search=${search.id}&status=all`}
										className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
									>
										<Eye className="h-4 w-4 mr-2" />
										View Results ({search.matchCount})
									</Link>
									<Link
										href={`/profile/searches/${search.id}/edit`}
										className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
									>
										<Edit3 className="h-4 w-4 mr-2" />
										Edit Search
									</Link>
									<button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
										{search.isActive ? (
											<>
												<Pause className="h-4 w-4 mr-2" />
												Pause
											</>
										) : (
											<>
												<Play className="h-4 w-4 mr-2" />
												Activate
											</>
										)}
									</button>
									<button
										onClick={() => handleDeleteClick(search.id, search.name)}
										className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 bg-white dark:bg-gray-700 border border-red-300 dark:border-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
									>
										<Trash2 className="h-4 w-4 mr-2" />
										Delete
									</button>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Empty State */}
				{searches.length === 0 && (
					<div className="text-center py-12">
						<div className="mx-auto h-24 w-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
							<Search className="h-8 w-8 text-gray-400" />
						</div>
						<h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">No searches yet</h3>
						<p className="text-gray-500 dark:text-gray-400 mt-2">
							Create your first search to find the perfect swap partners.
						</p>
						<Link
							href="/profile/searches/create"
							className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
						>
							<Plus className="h-4 w-4 mr-2" />
							Create Your First Search
						</Link>
					</div>
				)}

				{/* Tips */}
				<div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
					<h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">Search Tips</h3>
					<div className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
						<p>• Keep your searches active to receive notifications about new matches</p>
						<p>• Be flexible with your dates and requirements to find more potential partners</p>
						<p>• Update your searches regularly to reflect changing travel plans</p>
						<p>• Use specific amenities to find properties that match your exact needs</p>
					</div>
				</div>
			</div>

			{/* Delete Confirmation Popup */}
			{deleteModal.isOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
						<div className="p-6">
							<div className="flex items-center mb-4">
								<div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg mr-3">
									<AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
								</div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delete Search</h3>
							</div>
							<p className="text-gray-600 dark:text-gray-300 mb-6">
								Are you sure you want to delete "{deleteModal.searchName}"? This action cannot be undone.
							</p>
							<div className="flex justify-end space-x-3">
								<button
									onClick={handleDeleteCancel}
									disabled={isDeleting}
									className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
								>
									Cancel
								</button>
								<button
									onClick={handleDeleteConfirm}
									disabled={isDeleting}
									className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-50"
								>
									{isDeleting ? "Deleting..." : "Delete"}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</ProfileLayout>
	);
}
