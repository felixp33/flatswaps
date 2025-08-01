// src/app/profile/properties/add/page.tsx - Complete fixed version
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProfileLayout from "@/components/profile/ProfileLayout";
import FormField from "@/components/auth/FormField";
import { AMENITY_CATEGORIES } from "@/lib/data/amenities";
import { ValidationErrors } from "@/types/auth";
import { validateLocation } from "@/lib/auth/validation";
import { Plus, Home, Bed, Users, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { upsertFlat, AmenityType, isValidAmenity } from "@/lib/api";

interface PropertyData {
	propertyType: string;
	title: string;
	description: string;
	location: {
		address: string;
		city: string;
		country: string;
	};
	features: {
		rooms: number;
		guests: number;
		size: string;
	};
	amenities: AmenityType[]; // Updated to use AmenityType[]
	photos: File[];
}

export default function AddPropertyPage() {
	const router = useRouter();
	const { user } = useAuth();
	const [propertyData, setPropertyData] = useState<PropertyData>({
		propertyType: "entire_flat",
		title: "",
		description: "",
		location: { address: "", city: "", country: "" },
		features: { rooms: 1, guests: 2, size: "" },
		amenities: [],
		photos: [],
	});
	const [photoPreview, setPhotoPreview] = useState<string[]>([]);
	const [errors, setErrors] = useState<ValidationErrors>({});
	const [isLoading, setIsLoading] = useState(false);

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

	const handleInputChange = (field: string, value: any) => {
		if (field.includes(".")) {
			const [parent, child] = field.split(".");
			setPropertyData((prev) => ({
				...prev,
				[parent]: {
					...(prev as any)[parent],
					[child]: value,
				},
			}));
		} else {
			setPropertyData((prev) => ({ ...prev, [field]: value }));
		}

		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const handleAmenityToggle = (amenity: string) => {
		if (!isValidAmenity(amenity)) {
			console.warn(`Invalid amenity: ${amenity}`);
			return;
		}

		setPropertyData((prev) => ({
			...prev,
			amenities: prev.amenities.includes(amenity as AmenityType)
				? prev.amenities.filter((a) => a !== amenity)
				: [...prev.amenities, amenity as AmenityType],
		}));
	};

	const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		if (files.length + propertyData.photos.length > 10) {
			setErrors({ photos: "Maximum 10 photos allowed" });
			return;
		}
		const newPhotos = [...propertyData.photos, ...files];
		setPropertyData((prev) => ({ ...prev, photos: newPhotos }));
		const previews = files.map((file) => URL.createObjectURL(file));
		setPhotoPreview((prev) => [...prev, ...previews]);
	};

	const removePhoto = (index: number) => {
		setPropertyData((prev) => ({
			...prev,
			photos: prev.photos.filter((_, i) => i !== index),
		}));
		setPhotoPreview((prev) => prev.filter((_, i) => i !== index));
	};

	const validateForm = (): ValidationErrors => {
		const errs: ValidationErrors = {};
		if (!propertyData.propertyType) errs.propertyType = "Property type is required";
		if (!propertyData.title.trim()) errs.title = "Property title is required";
		if (!propertyData.description.trim()) errs.description = "Property description is required";
		const locErrors = validateLocation(propertyData.location.city, propertyData.location.country);
		Object.assign(errs, locErrors);
		if (!propertyData.location.address.trim()) errs.address = "Address is required";
		return errs;
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
			if (user) {
				await upsertFlat({
					owner_id: user.id,
					title: propertyData.title,
					description: propertyData.description,
					address: propertyData.location.address,
					city: propertyData.location.city,
					room_count: propertyData.features.rooms,
					size_sqm: parseInt(propertyData.features.size) || undefined,
					amenities: propertyData.amenities, // Now properly typed as AmenityType[]
					// Add other fields as needed
				});
			}
			router.push("/profile/properties");
		} catch (err) {
			setErrors({ general: "Failed to create property" });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ProfileLayout>
			<div className="p-6 max-w-3xl mx-auto">
				<div className="mb-8">
					<h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add Property</h1>
					<p className="text-gray-600 dark:text-gray-300 mt-2">Share your property details to start swapping</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-8">
					{/* Property Type Selection */}
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Property Type</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{propertyTypes.map((type) => {
								const Icon = type.icon;
								const isSelected = propertyData.propertyType === type.id;
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
											type="radio"
											name="propertyType"
											value={type.id}
											checked={isSelected}
											onChange={(e) => handleInputChange("propertyType", e.target.value)}
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
														? "text-blue-700 dark:text-blue-200"
														: "text-gray-500 dark:text-gray-400"
												}`}
											>
												{type.description}
											</p>
										</div>
										{isSelected && (
											<div className="absolute top-3 right-3">
												<Check className="h-5 w-5 text-blue-600 dark:text-blue-400" />
											</div>
										)}
									</label>
								);
							})}
						</div>
						{errors.propertyType && (
							<p className="text-sm text-red-600 dark:text-red-400 mt-2">{errors.propertyType}</p>
						)}
					</div>

					{/* Basic Information */}
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Basic Information</h2>
						<div className="space-y-6">
							<FormField
								label="Property Title"
								name="title"
								value={propertyData.title}
								onChange={(value) => handleInputChange("title", value)}
								error={errors.title}
								placeholder="Cozy 2-bedroom apartment in city center"
							/>
							<FormField
								label="Description"
								name="description"
								type="textarea"
								value={propertyData.description}
								onChange={(value) => handleInputChange("description", value)}
								error={errors.description}
								placeholder="Describe your property, its location, and what makes it special..."
							/>
						</div>
					</div>

					{/* Location */}
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Location</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FormField
								label="City"
								name="location.city"
								value={propertyData.location.city}
								onChange={(value) => handleInputChange("location.city", value)}
								error={errors.city}
								placeholder="Berlin"
							/>
							<FormField
								label="Country"
								name="location.country"
								value={propertyData.location.country}
								onChange={(value) => handleInputChange("location.country", value)}
								error={errors.country}
								placeholder="Germany"
							/>
							<div className="md:col-span-2">
								<FormField
									label="Address"
									name="location.address"
									value={propertyData.location.address}
									onChange={(value) => handleInputChange("location.address", value)}
									error={errors.address}
									placeholder="Street address"
								/>
							</div>
						</div>
					</div>

					{/* Property Features */}
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Property Features</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rooms</label>
								<select
									value={propertyData.features.rooms}
									onChange={(e) => handleInputChange("features.rooms", parseInt(e.target.value))}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
								>
									{[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
										<option key={num} value={num}>
											{num}
										</option>
									))}
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Max Guests
								</label>
								<select
									value={propertyData.features.guests}
									onChange={(e) => handleInputChange("features.guests", parseInt(e.target.value))}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
								>
									{[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
										<option key={num} value={num}>
											{num}
										</option>
									))}
								</select>
							</div>
							<FormField
								label="Size (sqm)"
								name="features.size"
								value={propertyData.features.size}
								onChange={(value) => handleInputChange("features.size", value)}
								placeholder="85"
							/>
						</div>
					</div>

					{/* Amenities */}
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Amenities</h2>
						<div className="space-y-6">
							{Object.values(AMENITY_CATEGORIES).map((category) => (
								<div key={category.title}>
									<h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">{category.title}</h3>
									<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
										{category.amenities.map((amenity) => (
											<label key={amenity} className="flex items-center space-x-2 cursor-pointer">
												<input
													type="checkbox"
													checked={propertyData.amenities.includes(amenity as AmenityType)}
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

					{/* Photos */}
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Photos</h2>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
							Add up to 10 photos of your property (you can add more later)
						</p>

						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							{photoPreview.map((preview, index) => (
								<div key={index} className="relative">
									<img
										src={preview}
										alt={`Property ${index + 1}`}
										className="w-full h-24 object-cover rounded-lg"
									/>
									<button
										type="button"
										onClick={() => removePhoto(index)}
										className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
									>
										×
									</button>
								</div>
							))}

							{propertyData.photos.length < 10 && (
								<label className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-24 flex items-center justify-center cursor-pointer hover:border-gray-400">
									<div className="text-center">
										<Plus className="w-6 h-6 text-gray-400 mx-auto mb-1" />
										<span className="text-xs text-gray-500">Add Photo</span>
									</div>
									<input
										type="file"
										accept="image/*"
										multiple
										onChange={handlePhotoUpload}
										className="hidden"
									/>
								</label>
							)}
						</div>

						{errors.photos && <p className="text-sm text-red-600 dark:text-red-400">{errors.photos}</p>}
					</div>

					{/* Submit Button */}
					<div className="flex justify-end space-x-4">
						<button
							type="button"
							onClick={() => router.push("/profile/properties")}
							className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={isLoading}
							className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? (
								<div className="flex items-center">
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
									Creating Property...
								</div>
							) : (
								"Create Property"
							)}
						</button>
					</div>

					{errors.general && (
						<p className="text-sm text-red-600 dark:text-red-400 text-center">{errors.general}</p>
					)}
				</form>
			</div>
		</ProfileLayout>
	);
}
