// src/components/matches/MatchFilterBar.tsx
"use client";

import { useState } from "react";
import { Heart, Clock, CheckCircle, XCircle, ChevronDown } from "lucide-react";

interface FilterOption {
	id: string;
	label: string;
	icon: any;
	color: string;
	count: number;
}

interface MatchFilterBarProps {
	matches: any[];
	activeFilter: string;
	onFilterChange: (filterId: string) => void;
}

export default function MatchFilterBar({ matches, activeFilter, onFilterChange }: MatchFilterBarProps) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const filterOptions: FilterOption[] = [
		{
			id: "all",
			label: "All Matches",
			icon: Heart,
			color: "text-gray-600",
			count: matches.length,
		},
		{
			id: "new",
			label: "New Matches",
			icon: Heart,
			color: "text-blue-600",
			count: matches.filter((m) => m.status === "new").length,
		},
		{
			id: "pending",
			label: "Pending",
			icon: Clock,
			color: "text-yellow-600",
			count: matches.filter((m) => m.status === "pending").length,
		},
		{
			id: "accepted",
			label: "Confirmed",
			icon: CheckCircle,
			color: "text-green-600",
			count: matches.filter((m) => m.status === "accepted").length,
		},
		{
			id: "rejected",
			label: "Cancelled",
			icon: XCircle,
			color: "text-red-600",
			count: matches.filter((m) => m.status === "rejected").length,
		},
	];

	const activeFilterOption = filterOptions.find((option) => option.id === activeFilter) || filterOptions[0];

	const handleFilterSelect = (filterId: string) => {
		onFilterChange(filterId);
		setIsDropdownOpen(false);
	};

	return (
		<div className="mb-6">
			{/* Mobile Dropdown (sm and below) */}
			<div className="sm:hidden">
				<div className="relative">
					<button
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
					>
						<div className="flex items-center">
							<activeFilterOption.icon className={`h-5 w-5 ${activeFilterOption.color} mr-3`} />
							<div className="flex items-center space-x-2">
								<span className="text-lg font-semibold text-gray-900 dark:text-white">
									{activeFilterOption.count}
								</span>
								<span className="text-sm text-gray-500 dark:text-gray-400">{activeFilterOption.label}</span>
							</div>
						</div>
						<ChevronDown
							className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
								isDropdownOpen ? "rotate-180" : ""
							}`}
						/>
					</button>

					{/* Dropdown Menu */}
					{isDropdownOpen && (
						<div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
							{filterOptions.map((filter) => {
								const Icon = filter.icon;
								const isActive = activeFilter === filter.id;

								return (
									<button
										key={filter.id}
										onClick={() => handleFilterSelect(filter.id)}
										className={`w-full flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
											isActive ? "bg-blue-50 dark:bg-blue-900/20" : ""
										}`}
									>
										<Icon className={`h-5 w-5 ${isActive ? "text-blue-600" : filter.color} mr-3`} />
										<div className="flex-1 text-left">
											<div className="flex items-center space-x-2">
												<span
													className={`text-lg font-semibold ${
														isActive ? "text-blue-600" : "text-gray-900 dark:text-white"
													}`}
												>
													{filter.count}
												</span>
												<span
													className={`text-sm ${
														isActive ? "text-blue-600" : "text-gray-500 dark:text-gray-400"
													}`}
												>
													{filter.label}
												</span>
											</div>
										</div>
										{isActive && <CheckCircle className="h-4 w-4 text-blue-600 ml-2" />}
									</button>
								);
							})}
						</div>
					)}
				</div>

				{/* Backdrop to close dropdown */}
				{isDropdownOpen && <div className="fixed inset-0 z-0" onClick={() => setIsDropdownOpen(false)} />}
			</div>

			{/* Desktop Grid (md and above) */}
			<div className="hidden sm:grid grid-cols-2 md:grid-cols-5 gap-3">
				{filterOptions.map((filter) => {
					const Icon = filter.icon;
					const isActive = activeFilter === filter.id;

					return (
						<button
							key={filter.id}
							onClick={() => onFilterChange(filter.id)}
							className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
								isActive
									? "bg-white dark:bg-gray-800 border-blue-500 shadow-md ring-1 ring-blue-500"
									: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
							}`}
						>
							<div className="flex items-center">
								<Icon className={`h-5 w-5 ${isActive ? "text-blue-600" : filter.color} mr-3`} />
								<div className="text-left">
									<p
										className={`text-xl font-semibold ${
											isActive ? "text-blue-600" : "text-gray-900 dark:text-white"
										}`}
									>
										{filter.count}
									</p>
									<p className={`text-xs ${isActive ? "text-blue-600" : "text-gray-500 dark:text-gray-400"}`}>
										{filter.label}
									</p>
								</div>
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}
