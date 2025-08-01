// src/app/profile/searches/page.tsx - Fixed version
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProfileLayout from "@/components/profile/ProfileLayout";
import {
	Search,
	Plus,
	Heart,
	Bell,
	Filter,
	MapPin,
	Calendar,
	MoreVertical,
	Edit3,
	Play,
	Pause,
	Trash2,
	Eye,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { fetchUserSearches, Search as SearchType } from "@/lib/api"; // Import the actual Search type

// Interface for display purposes (what your UI expects)
interface DisplaySearch {
	id: string;
	name: string;
	location: string;
	isActive: boolean;
	newMatches: number;
	matchCount: number;
	alertsEnabled: boolean;
	lastUpdated: string;
	criteria: {
		dateRange: string;
		rooms: number;
		budget: string;
		propertyType: string;
	};
	amenities: string[];
}

// Dropdown Menu Component
interface DropdownMenuProps {
	search: DisplaySearch;
	onDeleteClick: (searchId: string, searchName: string) => void;
}

function SearchDropdownMenu({ search, onDeleteClick }: DropdownMenuProps) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => setIsOpen(!isOpen);

	return (
		<div className="relative">
			<button
				onClick={toggleDropdown}
				className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
			>
				<MoreVertical className="h-5 w-5" />
			</button>

			{isOpen && (
				<>
					{/* Backdrop */}
					<div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

					{/* Dropdown Menu */}
					<div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-20">
						<div className="py-1">
							{/* Edit Search */}
							<Link
								href={`/profile/searches/${search.id}/edit`}
								className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
								onClick={() => setIsOpen(false)}
							>
								<Edit3 className="h-4 w-4 mr-3" />
								Edit Search
							</Link>

							{/* Pause/Activate */}
							<button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
								{search.isActive ? (
									<>
										<Pause className="h-4 w-4 mr-3" />
										Pause Search
									</>
								) : (
									<>
										<Play className="h-4 w-4 mr-3" />
										Activate Search
									</>
								)}
							</button>

							{/* Delete */}
							<button
								onClick={() => {
									onDeleteClick(search.id, search.name);
									setIsOpen(false);
								}}
								className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
							>
								<Trash2 className="h-4 w-4 mr-3" />
								Delete Search
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default function SearchesPage() {
	const { user } = useAuth();
	const [searches, setSearches] = useState<SearchType[]>([]); // Use actual API type
	const [displaySearches, setDisplaySearches] = useState<DisplaySearch[]>([]); // Transformed for display
	const [deleteModal, setDeleteModal] = useState({
		isOpen: false,
		searchId: null as string | null,
		searchName: "",
	});
	const [isDeleting, setIsDeleting] = useState(false);

	// Transform API Search to DisplaySearch
	const transformSearchForDisplay = (search: SearchType): DisplaySearch => {
		return {
			id: search.id,
			name: search.title || `Search in ${search.city}`,
			location: search.city || "Unknown location",
			isActive: search.is_active ?? true,
			newMatches: search.new_matches ?? 0,
			matchCount: search.match_count ?? 0,
			alertsEnabled: search.alerts_enabled ?? true,
			lastUpdated: search.updated_at || search.created_at || new Date().toISOString(),
			criteria: {
				dateRange:
					search.available_from && search.available_until
						? `${new Date(search.available_from).toLocaleDateString()} - ${new Date(
								search.available_until
						  ).toLocaleDateString()}`
						: "Flexible dates",
				rooms: search.min_rooms || 1,
				budget: search.max_rent ? `Up to €${search.max_rent}` : "Flexible budget",
				propertyType: "Any", // You can enhance this based on your property type logic
			},
			amenities: search.amenities || [],
		};
	};

	// Fetch searches from API
	useEffect(() => {
		if (!user) return;

		fetchUserSearches().then((data) => {
			if (data && data.length > 0) {
				setSearches(data);
				// Transform for display
				const transformed = data.map(transformSearchForDisplay);
				setDisplaySearches(transformed);
			}
		});
	}, [user]);

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
		// TODO: Implement actual deletion logic with your API
		setTimeout(() => {
			console.log(`Deleted search: ${deleteModal.searchId}`);
			// Remove from both states
			setSearches((prev) => prev.filter((s) => s.id !== deleteModal.searchId));
			setDisplaySearches((prev) => prev.filter((s) => s.id !== deleteModal.searchId));
			setDeleteModal({ isOpen: false, searchId: null, searchName: "" });
			setIsDeleting(false);
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
						{
							label: "Active Searches",
							value: displaySearches.filter((s) => s.isActive).length.toString(),
							icon: Search,
							color: "text-blue-600",
						},
						{
							label: "Total Matches",
							value: displaySearches.reduce((sum, s) => sum + s.matchCount, 0).toString(),
							icon: Heart,
							color: "text-pink-600",
						},
						{
							label: "New This Week",
							value: displaySearches.reduce((sum, s) => sum + s.newMatches, 0).toString(),
							icon: Bell,
							color: "text-green-600",
						},
						{
							label: "Saved Searches",
							value: displaySearches.length.toString(),
							icon: Filter,
							color: "text-purple-600",
						},
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
					{displaySearches.map((search) => (
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
										<SearchDropdownMenu search={search} onDeleteClick={handleDeleteClick} />
									</div>

									{/* Search Criteria */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
										<div className="flex items-center space-x-2">
											<span className="text-sm font-medium text-gray-700 dark:text-gray-300">Rooms:</span>
											<span className="text-sm text-gray-600 dark:text-gray-400">
												{search.criteria.rooms}+
											</span>
										</div>
										<div className="flex items-center space-x-2">
											<span className="text-sm font-medium text-gray-700 dark:text-gray-300">Budget:</span>
											<span className="text-sm text-gray-600 dark:text-gray-400">
												{search.criteria.budget}
											</span>
										</div>
									</div>

									{/* Amenities */}
									{search.amenities.length > 0 && (
										<div className="mb-4">
											<span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
												Amenities:
											</span>
											<div className="flex flex-wrap gap-2">
												{search.amenities.slice(0, 3).map((amenity, index) => (
													<span
														key={index}
														className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full"
													>
														{amenity}
													</span>
												))}
												{search.amenities.length > 3 && (
													<span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
														+{search.amenities.length - 3} more
													</span>
												)}
											</div>
										</div>
									)}

									{/* Bottom row */}
									<div className="flex items-center justify-between text-sm">
										<div className="flex items-center space-x-4">
											<div className="flex items-center space-x-1">
												<Heart className="h-4 w-4 text-pink-500" />
												<span className="text-gray-600 dark:text-gray-300">
													{search.matchCount} matches
												</span>
											</div>
											<div className="flex items-center space-x-1">
												<Bell
													className={`h-4 w-4 ${
														search.alertsEnabled ? "text-green-500" : "text-gray-400"
													}`}
												/>
												<span className="text-sm text-gray-600 dark:text-gray-300">
													Alerts {search.alertsEnabled ? "on" : "off"}
												</span>
											</div>
										</div>
										<div className="text-xs text-gray-500 dark:text-gray-400">
											Last updated: {new Date(search.lastUpdated).toLocaleDateString()}
										</div>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex flex-col space-y-2 lg:ml-4 mt-4 lg:mt-0">
									<Link
										href={`/profile/searches/${search.id}/results`}
										className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
									>
										<Eye className="h-4 w-4 mr-2" />
										View Results
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Empty State */}
				{displaySearches.length === 0 && (
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
							Create Search
						</Link>
					</div>
				)}

				{/* Delete Confirmation Modal */}
				{deleteModal.isOpen && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
						<div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Delete Search</h3>
							<p className="text-gray-600 dark:text-gray-300 mb-6">
								Are you sure you want to delete "{deleteModal.searchName}"? This action cannot be undone.
							</p>
							<div className="flex justify-end space-x-3">
								<button
									onClick={handleDeleteCancel}
									disabled={isDeleting}
									className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
								>
									Cancel
								</button>
								<button
									onClick={handleDeleteConfirm}
									disabled={isDeleting}
									className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
								>
									{isDeleting ? "Deleting..." : "Delete"}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</ProfileLayout>
	);
}
