// src/app/profile/searches/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProfileLayout from "@/components/profile/ProfileLayout";
import FormField from "@/components/auth/FormField";
import { Search, MapPin, Calendar, Home, Users, Bed, Bath, Check, X, Clock, Plane, GraduationCap } from "lucide-react";
import VisibilityPremiumBanner from "@/components/profile/VisibilityPremiumBanner";
import { AMENITY_CATEGORIES } from "@/lib/data/amenities";

interface SearchFormData {
	name?: string;
	searchMode: "dates" | "duration"; // New: search mode
	location: {
		city: string;
		country: string;
	};
	dateRange: {
		startDate: string;
		endDate: string;
	};
	duration: {
		min: string;
		max: string;
		unit: "days" | "weeks" | "months";
	};
	timeframe: {
		earliest: string;
		latest: string;
	};
	criteria: {
		propertyTypes: string[];
                rooms: number; // Number of rooms
		minSize?: number;
		maxPrice?: number;
		maxBudget?: number;
	};
	amenities: string[];
}

export default function CreateSearchPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const [formData, setFormData] = useState<SearchFormData>({
		name: "",
		searchMode: "dates",
		location: {
			city: "",
			country: "",
		},
		dateRange: {
			startDate: "",
			endDate: "",
		},
		duration: {
			min: "",
			max: "",
			unit: "months",
		},
		timeframe: {
			earliest: "",
			latest: "",
		},
		criteria: {
			propertyTypes: [],
                        rooms: 1,
		},
		amenities: [],
	});

	const propertyTypes = [
		{
			id: "entire_flat",
			title: "Entire Flat/Apartment",
			description: "You have the whole place to yourself",
			icon: Home,
		},
		{
			id: "private_room",
			title: "Private Room",
			description: "Your own room in a shared flat",
			icon: Bed,
		},
		{
			id: "shared_room",
			title: "Shared Room",
			description: "Share a room with others",
			icon: Users,
		},
	];

        const amenityCategories = AMENITY_CATEGORIES;

	const durationUnits = [
		{ value: "days", label: "days" },
		{ value: "weeks", label: "weeks" },
		{ value: "months", label: "months" },
	];

	const handleInputChange = (field: string, value: any) => {
		if (field.includes(".")) {
			const [parent, child] = field.split(".");
			setFormData((prev) => ({
				...prev,
				[parent]: {
					...(prev[parent as keyof SearchFormData] as object),
					[child]: value,
				},
			}));
		} else {
			setFormData((prev) => ({ ...prev, [field]: value }));
		}

		// Clear error when user makes changes
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const handlePropertyTypeToggle = (typeId: string) => {
		setFormData((prev) => ({
			...prev,
			criteria: {
				...prev.criteria,
				propertyTypes: prev.criteria.propertyTypes.includes(typeId)
					? prev.criteria.propertyTypes.filter((type) => type !== typeId)
					: [...prev.criteria.propertyTypes, typeId],
			},
		}));
	};

	const handleAmenityToggle = (amenity: string) => {
		setFormData((prev) => ({
			...prev,
			amenities: prev.amenities.includes(amenity)
				? prev.amenities.filter((a) => a !== amenity)
				: [...prev.amenities, amenity],
		}));
	};

	const calculateDuration = () => {
		if (!formData.dateRange.startDate || !formData.dateRange.endDate) return "";
		const start = new Date(formData.dateRange.startDate);
		const end = new Date(formData.dateRange.endDate);
		const diffTime = Math.abs(end.getTime() - start.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays === 1) return "1 day";
		if (diffDays < 14) return `${diffDays} days`;
		if (diffDays < 60) return `${Math.round(diffDays / 7)} weeks`;
		return `${Math.round(diffDays / 30)} months`;
	};

	const getValidationMessage = () => {
		if (formData.searchMode === "dates") {
			const duration = calculateDuration();
			if (duration.includes("day") && parseInt(duration) < 2) {
				return { type: "info", message: "💡 Most hosts prefer stays of 2+ days" };
			}
		} else {
			const minDuration = parseInt(formData.duration.min);
			const unit = formData.duration.unit;

			if (unit === "months" && minDuration >= 4) {
				return { type: "success", message: "✅ Perfect for semester exchanges and long-term hosting" };
			}
			if (unit === "days" && minDuration < 3) {
				return { type: "warning", message: "⚠️ Very short stays have limited availability" };
			}
		}
		return null;
	};

	const validateForm = (): Record<string, string> => {
		const newErrors: Record<string, string> = {};

		if (!formData.location.city.trim()) {
			newErrors.city = "Destination city is required";
		}

		if (formData.searchMode === "dates") {
			if (!formData.dateRange.startDate) {
				newErrors.startDate = "Start date is required";
			}
			if (!formData.dateRange.endDate) {
				newErrors.endDate = "End date is required";
			}
			if (formData.dateRange.startDate && formData.dateRange.endDate) {
				const start = new Date(formData.dateRange.startDate);
				const end = new Date(formData.dateRange.endDate);
				if (start >= end) {
					newErrors.endDate = "End date must be after start date";
				}
			}
		} else {
			if (!formData.duration.min) {
				newErrors.minDuration = "Minimum duration is required";
			}
			if (!formData.timeframe.earliest) {
				newErrors.earliest = "Earliest arrival date is required";
			}
		}

		if (formData.criteria.propertyTypes.length === 0) {
			newErrors.propertyTypes = "Please select at least one property type";
		}

		return newErrors;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const validationErrors = validateForm();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		setIsLoading(true);

		try {
			// TODO: Save search to backend
			console.log("Creating search:", formData);

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Redirect back to searches list
			router.push("/profile/searches");
		} catch (error) {
			console.error("Error creating search:", error);
			setErrors({ general: "Failed to create search. Please try again." });
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancel = () => {
		router.push("/profile/searches");
	};

	const validation = getValidationMessage();

	return (
		<ProfileLayout>
			<div className="p-6">
				{/* Header */}
				<div className="mb-8">
					<div className="flex items-center mb-4">
						<button
							onClick={handleCancel}
							className="mr-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
						>
							<X className="h-5 w-5" />
						</button>
						<div>
							<h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Search</h1>
							<p className="text-gray-600 dark:text-gray-300 mt-1">
								Set up a search to find your perfect home swap or rental
							</p>
						</div>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="max-w-4xl">
					{errors.general && (
						<div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
							<p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
						</div>
					)}

					{/* Basic Information */}
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
							<Search className="h-5 w-5 mr-2" />
							Basic Information
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="md:col-span-2">
								<FormField
									label="Search Name (Optional)"
									name="name"
									value={formData.name || ""}
									onChange={(value) => handleInputChange("name", value)}
									placeholder="e.g., Summer in Barcelona"
									hint="Leave empty to auto-generate based on location and dates"
								/>
							</div>

							<FormField
								label="Destination City"
								name="location.city"
								value={formData.location.city}
								onChange={(value) => handleInputChange("location.city", value)}
								error={errors.city}
								placeholder="Where do you want to go?"
								required
							/>

							<FormField
								label="Country (Optional)"
								name="location.country"
								value={formData.location.country}
								onChange={(value) => handleInputChange("location.country", value)}
								placeholder="Country"
							/>
						</div>
					</div>

					{/* Search Mode Toggle */}
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
							What type of trip are you planning?
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<button
								type="button"
								onClick={() => handleInputChange("searchMode", "dates")}
								className={`p-4 rounded-lg border-2 transition-all text-left ${
									formData.searchMode === "dates"
										? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
										: "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
								}`}
							>
								<div className="flex items-center mb-2">
									<Plane className="h-5 w-5 mr-2 text-blue-600" />
									<span className="font-medium text-gray-900 dark:text-white">Specific Dates</span>
								</div>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Holidays, events, conferences - I know exactly when I'm traveling
								</p>
							</button>

							<button
								type="button"
								onClick={() => handleInputChange("searchMode", "duration")}
								className={`p-4 rounded-lg border-2 transition-all text-left ${
									formData.searchMode === "duration"
										? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
										: "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
								}`}
							>
								<div className="flex items-center mb-2">
									<GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
									<span className="font-medium text-gray-900 dark:text-white">Flexible Timing</span>
								</div>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Semester abroad, remote work, sabbatical - I need a certain duration
								</p>
							</button>
						</div>
					</div>

					{/* Date-Driven Mode */}
					{formData.searchMode === "dates" && (
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
							<div className="flex items-center mb-6">
								<Calendar className="h-5 w-5 mr-2 text-blue-600" />
								<h2 className="text-lg font-semibold text-gray-900 dark:text-white">Travel Dates</h2>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									label="Check-in"
									name="dateRange.startDate"
									type="date"
									value={formData.dateRange.startDate}
									onChange={(value) => handleInputChange("dateRange.startDate", value)}
									error={errors.startDate}
									required
								/>

								<FormField
									label="Check-out"
									name="dateRange.endDate"
									type="date"
									value={formData.dateRange.endDate}
									onChange={(value) => handleInputChange("dateRange.endDate", value)}
									error={errors.endDate}
									required
								/>
							</div>

							{calculateDuration() && (
								<div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
									<p className="text-sm text-blue-800 dark:text-blue-200">
										<Clock className="inline h-4 w-4 mr-1" />
										Duration: {calculateDuration()}
									</p>
								</div>
							)}
						</div>
					)}

					{/* Duration-Driven Mode */}
					{formData.searchMode === "duration" && (
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
							<div className="flex items-center mb-6">
								<Clock className="h-5 w-5 mr-2 text-blue-600" />
								<h2 className="text-lg font-semibold text-gray-900 dark:text-white">Duration & Timeframe</h2>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Minimum duration
										<span className="text-red-500 ml-1">*</span>
									</label>
									<input
										type="number"
										min="1"
										placeholder="4"
										value={formData.duration.min}
										onChange={(e) => handleInputChange("duration.min", e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
									{errors.minDuration && (
										<p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.minDuration}</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Maximum duration
									</label>
									<input
										type="number"
										min="1"
										placeholder="6"
										value={formData.duration.max}
										onChange={(e) => handleInputChange("duration.max", e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Unit
									</label>
									<select
										value={formData.duration.unit}
										onChange={(e) =>
											handleInputChange("duration.unit", e.target.value as "days" | "weeks" | "months")
										}
										className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
									>
										{durationUnits.map((unit) => (
											<option key={unit.value} value={unit.value}>
												{unit.label}
											</option>
										))}
									</select>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									label="Earliest arrival"
									name="timeframe.earliest"
									type="date"
									value={formData.timeframe.earliest}
									onChange={(value) => handleInputChange("timeframe.earliest", value)}
									error={errors.earliest}
									required
								/>

								<FormField
									label="Latest arrival"
									name="timeframe.latest"
									type="date"
									value={formData.timeframe.latest}
									onChange={(value) => handleInputChange("timeframe.latest", value)}
								/>
							</div>
						</div>
					)}

					{/* Validation Message */}
					{validation && (
						<div
							className={`mb-6 p-3 rounded-md ${
								validation.type === "success"
									? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200"
									: validation.type === "warning"
									? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200"
									: "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200"
							}`}
						>
							<p className="text-sm">{validation.message}</p>
						</div>
					)}

					{/* Property Types - Multiple Selection */}

					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
							<Home className="h-5 w-5 mr-2" />
							Property Types
						</h2>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
							Select all property types you're interested in
						</p>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
							{propertyTypes.map((type) => {
								const Icon = type.icon;
								const isSelected = formData.criteria.propertyTypes.includes(type.id);
								return (
									<label
										key={type.id}
										className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
											isSelected
												? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
												: "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
										}`}
									>
										<input
											type="checkbox"
											checked={isSelected}
											onChange={() => handlePropertyTypeToggle(type.id)}
											className="sr-only"
										/>
										<div>
											<Icon
												className={`h-6 w-6 mb-2 ${
													isSelected ? "text-blue-600 dark:text-blue-400" : "text-gray-400"
												}`}
											/>
											<h3
												className={`text-sm font-medium mb-1 ${
													isSelected ? "text-blue-900 dark:text-blue-100" : "text-gray-900 dark:text-white"
												}`}
											>
												{type.title}
											</h3>
											<p
												className={`text-xs ${
													isSelected
														? "text-blue-700 dark:text-blue-300"
														: "text-gray-500 dark:text-gray-400"
												}`}
											>
												{type.description}
											</p>
										</div>
										{isSelected && (
											<div className="absolute top-2 right-2">
												<Check className="h-5 w-5 text-blue-600 dark:text-blue-400" />
											</div>
										)}
									</label>
								);
							})}
						</div>

						{errors.propertyTypes && (
							<p className="text-sm text-red-600 dark:text-red-400 mb-4">{errors.propertyTypes}</p>
						)}

						{/* Property Size & Rooms - Updated to use single rooms field */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Number of Rooms
								</label>
								<select
									value={formData.criteria.rooms}
									onChange={(e) => handleInputChange("criteria.rooms", parseInt(e.target.value))}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									{[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
										<option key={num} value={num}>
											{num} {num === 1 ? "Room" : "Rooms"}
										</option>
									))}
								</select>
							</div>

							<FormField
								label="Min Size (m²)"
								name="criteria.minSize"
								type="number"
								value={formData.criteria.minSize?.toString() || ""}
								onChange={(value) => handleInputChange("criteria.minSize", value ? parseInt(value) : undefined)}
								placeholder="Optional"
							/>

							<FormField
								label="Max Price (€/month)"
								name="criteria.maxPrice"
								type="number"
								value={formData.criteria.maxPrice?.toString() || ""}
								onChange={(value) =>
									handleInputChange("criteria.maxPrice", value ? parseInt(value) : undefined)
								}
								placeholder="Optional"
							/>
						</div>
					</div>

					{/* Amenities - Updated with categorized structure */}
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Required Amenities</h2>

						<div className="space-y-6">
							{Object.entries(amenityCategories).map(([categoryKey, category]) => (
								<div key={categoryKey}>
									<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">{category.title}</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
										{category.amenities.map((amenity) => (
											<label key={amenity} className="flex items-center space-x-2 cursor-pointer">
												<input
													type="checkbox"
													checked={formData.amenities.includes(amenity)}
													onChange={() => handleAmenityToggle(amenity)}
													className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
												/>
												<span className="text-sm text-gray-700 dark:text-gray-300">{amenity}</span>
											</label>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
					<VisibilityPremiumBanner></VisibilityPremiumBanner>

					{/* Action Buttons */}
					<div className="flex justify-between mt-8">
						<button
							type="button"
							onClick={handleCancel}
							className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={isLoading}
							className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
						>
							{isLoading ? (
								<div className="flex items-center">
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
									Creating Search...
								</div>
							) : formData.searchMode === "dates" ? (
								"Find Available Places"
							) : (
								"Find Long-term Matches"
							)}
						</button>
					</div>
				</form>
			</div>
		</ProfileLayout>
	);
}
