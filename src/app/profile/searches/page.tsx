"use client";

import { useState } from "react";
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
	Eye,
	Edit3,
	Play,
	Pause,
	Trash2,
} from "lucide-react";

// Dropdown Menu Component
interface DropdownMenuProps {
	search: any;
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
							{/* View Results - Remove since it's now the matches button */}
							{/* <Link
                href={`/profile/matches?search=${search.id}`}
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Eye className="h-4 w-4 mr-3" />
                View Results ({search.matchCount})
              </Link> */}

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

							{/* Divider */}
							<div className="border-t border-gray-200 dark:border-gray-600 my-1" />

							{/* Delete */}
							<button
								onClick={() => {
									onDeleteClick(search.id, search.name);
									setIsOpen(false);
								}}
								className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
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

// Main Component
export default function SearchesPage() {
	const [deleteModal, setDeleteModal] = useState({
		isOpen: false,
		searchId: null as string | null,
		searchName: "",
	});

	// Mock data - replace with your actual data
	const searches = [
		{
			id: "1",
			name: "Apartment",
			location: "Barcelona, Spain",
			isActive: true,
			newMatches: 3,
			matchCount: 12,
			alertsEnabled: true,
			lastUpdated: "2025-06-10",
			criteria: {
				dateRange: "Oct 1 2025 - Mar 30 2026",
				bedrooms: "2-3",
				budget: "€800-1200/month",
				propertyType: "Apartment",
			},
		},
		{
			id: "2",
			name: "Cozy Studio",
			location: "Munich, Germany",
			isActive: false,
			newMatches: 0,
			matchCount: 8,
			alertsEnabled: false,
			lastUpdated: "2025-06-08",
			criteria: {
				dateRange: "Aug 1 - Sep 30, 2025",
				bedrooms: "1",
				budget: "€600-900/month",
				propertyType: "Studio",
			},
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

	return (
		<ProfileLayout>
			<div className="h-full overflow-y-auto">
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
								className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
							>
								<div className="flex items-start justify-between">
									<div className="flex-1">
										{/* Search Header */}
										<div className="flex items-start justify-between mb-4">
											<div className="flex-1">
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

											{/* Three-dot menu */}
											<SearchDropdownMenu search={search} onDeleteClick={handleDeleteClick} />
										</div>

										{/* Search Criteria Boxes */}
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
											{/* Property Requirements */}
											<div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
												<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
													<Search className="h-4 w-4 mr-2" />
													Property Requirements
												</h4>
												<div className="space-y-2">
													<div className="flex items-center text-sm">
														<span className="text-gray-500 dark:text-gray-400 mr-2">
															🛏️ {search.criteria.bedrooms} bed
														</span>
														<span className="text-gray-500 dark:text-gray-400 mr-2">🚿 1 bath</span>
													</div>
													<div className="text-sm text-gray-600 dark:text-gray-300">
														{search.criteria.propertyType} • 1 month
													</div>
												</div>
											</div>

											{/* Preferred Amenities */}
											<div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
												<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
													Preferred Amenities
												</h4>
												<div className="flex flex-wrap gap-2">
													<span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md">
														WiFi
													</span>
													<span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md">
														Kitchen
													</span>
													<span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md">
														Balcony
													</span>
												</div>
											</div>
										</div>

										{/* Matches Button */}
										<div className="flex items-center justify-end">
											<Link
												href={`/profile/matches?search=${search.id}`}
												className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
											>
												<span>{search.matchCount} matches found</span>
											</Link>
										</div>
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
						</div>
					)}
				</div>
			</div>
		</ProfileLayout>
	);
}
