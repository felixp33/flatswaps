// src/app/profile/searches/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProfileLayout from "@/components/profile/ProfileLayout";
import FormField from "@/components/auth/FormField";
import { Search, MapPin, Calendar, Home, Users, Bed, Bath, Check, X } from "lucide-react";

interface SearchFormData {
	name?: string;
	location: {
		city: string;
		country: string;
	};
	dateRange: {
		startDate: string;
		endDate: string;
	};
	criteria: {
		propertyTypes: string[];
		bedrooms: number;
		bathrooms: number;
		minSize?: number;
		maxSize?: number;
		maxBudget?: number;
	};
	amenities: string[];
	swapDuration: string;
}

export default function CreateSearchPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const [formData, setFormData] = useState<SearchFormData>({
		name: "",
		location: {
			city: "",
			country: "",
		},
		dateRange: {
			startDate: "",
			endDate: "",
		},
		criteria: {
			propertyTypes: [],
			bedrooms: 1,
			bathrooms: 1,
		},
		amenities: [],
		swapDuration: "flexible",
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

	const availableAmenities = [
		"WiFi",
		"Kitchen Access",
		"Washing Machine",
		"Air Conditioning",
		"Heating",
		"Parking",
		"Balcony/Terrace",
		"Garden",
		"Elevator",
		"Pet Friendly",
		"Gym Access",
		"Swimming Pool",
		"Dishwasher",
		"TV",
		"Workspace/Desk",
		"Near Public Transport",
	];

	const swapDurations = [
		{ value: "flexible", label: "Flexible" },
		{ value: "1-7_days", label: "1-7 days" },
		{ value: "1-2_weeks", label: "1-2 weeks" },
		{ value: "2-4_weeks", label: "2-4 weeks" },
		{ value: "1-3_months", label: "1-3 months" },
		{ value: "3-6_months", label: "3-6 months" },
		{ value: "6+_months", label: "6+ months" },
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

	const validateForm = (): Record<string, string> => {
		const newErrors: Record<string, string> = {};

		if (!formData.location.city.trim()) {
			newErrors.city = "Destination city is required";
		}

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

	// Generate suggested search name based on location and dates
	const generateSearchName = () => {
		if (formData.location.city && formData.dateRange.startDate) {
			const startDate = new Date(formData.dateRange.startDate);
			const monthYear = startDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });
			const suggestedName = `${formData.location.city} - ${monthYear}`;
			return suggestedName;
		}
		return "";
	};

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

					{/* Date Range */}
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
							<Calendar className="h-5 w-5 mr-2" />
							Travel Dates
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FormField
								label="Start Date"
								name="dateRange.startDate"
								type="date"
								value={formData.dateRange.startDate}
								onChange={(value) => handleInputChange("dateRange.startDate", value)}
								error={errors.startDate}
								required
							/>

							<FormField
								label="End Date"
								name="dateRange.endDate"
								type="date"
								value={formData.dateRange.endDate}
								onChange={(value) => handleInputChange("dateRange.endDate", value)}
								error={errors.endDate}
								required
							/>
						</div>

						<div className="mt-4">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
								Preferred Duration
							</label>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
								{swapDurations.map((duration) => (
									<label key={duration.value} className="flex items-center cursor-pointer">
										<input
											type="radio"
											name="swapDuration"
											value={duration.value}
											checked={formData.swapDuration === duration.value}
											onChange={(e) => handleInputChange("swapDuration", e.target.value)}
											className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
										/>
										<span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{duration.label}</span>
									</label>
								))}
							</div>
						</div>
					</div>

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
												: "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
										}`}
									>
										<input
											type="checkbox"
											checked={isSelected}
											onChange={() => handlePropertyTypeToggle(type.id)}
											className="sr-only"
										/>
										<div className="flex flex-col items-center text-center">
											<Icon
												className={`h-8 w-8 mb-3 ${
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

						{/* Property Size & Rooms */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Min Bedrooms
								</label>
								<select
									value={formData.criteria.bedrooms}
									onChange={(e) => handleInputChange("criteria.bedrooms", parseInt(e.target.value))}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									{[1, 2, 3, 4, 5, 6].map((num) => (
										<option key={num} value={num}>
											{num}+
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Min Bathrooms
								</label>
								<select
									value={formData.criteria.bathrooms}
									onChange={(e) => handleInputChange("criteria.bathrooms", parseInt(e.target.value))}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									{[1, 2, 3, 4, 5].map((num) => (
										<option key={num} value={num}>
											{num}+
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
								label="Max Size (m²)"
								name="criteria.maxSize"
								type="number"
								value={formData.criteria.maxSize?.toString() || ""}
								onChange={(value) => handleInputChange("criteria.maxSize", value ? parseInt(value) : undefined)}
								placeholder="Optional"
							/>
						</div>
					</div>

					{/* Amenities */}
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Preferred Amenities</h2>

						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
							{availableAmenities.map((amenity) => (
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
							) : (
								"Create Search"
							)}
						</button>
					</div>
				</form>
			</div>
		</ProfileLayout>
	);
}
