// src/app/auth/onboarding/step-3/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, Plus, Camera, MapPin, Users, Bed, Bath } from "lucide-react";
import { AMENITY_CATEGORIES } from "@/lib/data/amenities";
import OnboardingLayout from "@/components/auth/OnboardingLayout";
import FormField from "@/components/auth/FormField";
import { validateLocation } from "@/lib/auth/validation";
import { ValidationErrors } from "@/types/auth";

interface PropertyData {
	hasProperty: boolean;
	title: string;
	description: string;
	location: {
		address: string;
		city: string;
		country: string;
	};
	features: {
		bedrooms: number;
		bathrooms: number;
		guests: number;
		size: string;
	};
	amenities: string[];
	photos: File[];
}

export default function OnboardingStep3() {
	const router = useRouter();
	const [propertyData, setPropertyData] = useState<PropertyData>({
		hasProperty: false,
		title: "",
		description: "",
		location: {
			address: "",
			city: "",
			country: "",
		},
		features: {
			bedrooms: 1,
			bathrooms: 1,
			guests: 2,
			size: "",
		},
		amenities: [],
		photos: [],
	});
	const [errors, setErrors] = useState<ValidationErrors>({});
	const [isLoading, setIsLoading] = useState(false);
	const [photoPreview, setPhotoPreview] = useState<string[]>([]);

	const stepLabels = ["Profile Setup", "Verification", "Property Setup", "Complete"];
	const completedSteps = [true, true, false, false];


	const handleInputChange = (field: string, value: any) => {
		if (field.includes(".")) {
			const [parent, child] = field.split(".");
			setPropertyData((prev) => ({
				...prev,
				[parent]: {
					...(prev[parent as keyof PropertyData] as object),
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
		const newAmenities = propertyData.amenities.includes(amenity)
			? propertyData.amenities.filter((a) => a !== amenity)
			: [...propertyData.amenities, amenity];

		setPropertyData((prev) => ({ ...prev, amenities: newAmenities }));
	};

	const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		if (files.length + propertyData.photos.length > 10) {
			setErrors({ photos: "Maximum 10 photos allowed" });
			return;
		}

		const newPhotos = [...propertyData.photos, ...files];
		setPropertyData((prev) => ({ ...prev, photos: newPhotos }));

		// Create preview URLs
		const newPreviews = files.map((file) => URL.createObjectURL(file));
		setPhotoPreview((prev) => [...prev, ...newPreviews]);
	};

	const removePhoto = (index: number) => {
		const newPhotos = propertyData.photos.filter((_, i) => i !== index);
		const newPreviews = photoPreview.filter((_, i) => i !== index);

		setPropertyData((prev) => ({ ...prev, photos: newPhotos }));
		setPhotoPreview(newPreviews);
	};

	const validatePropertyForm = (): ValidationErrors => {
		const errors: ValidationErrors = {};

		if (!propertyData.hasProperty) return errors;

		if (!propertyData.title.trim()) errors.title = "Property title is required";
		if (!propertyData.description.trim()) errors.description = "Property description is required";

		const locationErrors = validateLocation(propertyData.location.city, propertyData.location.country);
		Object.assign(errors, locationErrors);

		if (!propertyData.location.address.trim()) errors.address = "Address is required";

		return errors;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (propertyData.hasProperty) {
			const validationErrors = validatePropertyForm();
			if (Object.keys(validationErrors).length > 0) {
				setErrors(validationErrors);
				return;
			}
		}

		setIsLoading(true);
		try {
			// TODO: Save property data
			console.log("Property setup data:", propertyData);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			router.push("/profile");
		} catch (error) {
			console.error("Property setup error:", error);
			setErrors({ general: "Something went wrong. Please try again." });
		} finally {
			setIsLoading(false);
		}
	};

	const handleBack = () => {
		router.push("/auth/onboarding/step-2");
	};

	const handleSkip = () => {
		router.push("/profile");
	};

	return (
		<OnboardingLayout
			currentStep={3}
			totalSteps={4}
			completedSteps={completedSteps}
			stepLabels={stepLabels}
			title="Do You Have a Property to Share?"
			subtitle="List your property to start swapping homes with others"
			onBack={handleBack}
		>
			<div className="max-w-3xl mx-auto">
				<form onSubmit={handleSubmit} className="space-y-8">
					{errors.general && (
						<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
							<p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
						</div>
					)}

					{/* Property Ownership Question */}
					<div className="text-center space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<button
								type="button"
								onClick={() => handleInputChange("hasProperty", true)}
								className={`p-8 rounded-xl border-2 transition-all ${
									propertyData.hasProperty
										? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
										: "border-gray-200 dark:border-gray-700 hover:border-gray-300"
								}`}
							>
								<Home
									className={`w-12 h-12 mx-auto mb-4 ${
										propertyData.hasProperty ? "text-blue-600" : "text-gray-400"
									}`}
								/>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									Yes, I have a property
								</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									I want to list my property for home swapping
								</p>
							</button>

							<button
								type="button"
								onClick={() => handleInputChange("hasProperty", false)}
								className={`p-8 rounded-xl border-2 transition-all ${
									!propertyData.hasProperty
										? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
										: "border-gray-200 dark:border-gray-700 hover:border-gray-300"
								}`}
							>
								<Users
									className={`w-12 h-12 mx-auto mb-4 ${
										!propertyData.hasProperty ? "text-blue-600" : "text-gray-400"
									}`}
								/>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Not right now</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									I want to explore and find properties first
								</p>
							</button>
						</div>
					</div>

					{/* Property Details Form */}
					{propertyData.hasProperty && (
						<div className="space-y-8 pt-8 border-t border-gray-200 dark:border-gray-700">
							{/* Basic Information */}
							<div className="space-y-6">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white">Property Details</h3>

								<FormField
									label="Property Title"
									name="title"
									value={propertyData.title}
									onChange={(value) => handleInputChange("title", value)}
									error={errors.title}
									placeholder="e.g., Cozy 2BR Apartment in City Center"
									required
								/>

								<FormField
									label="Description"
									name="description"
									type="textarea"
									value={propertyData.description}
									onChange={(value) => handleInputChange("description", value)}
									error={errors.description}
									placeholder="Describe your property, neighborhood, and what makes it special..."
									required
								/>
							</div>

							{/* Location */}
							<div className="space-y-6">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white">Location</h3>

								<FormField
									label="Address"
									name="location.address"
									value={propertyData.location.address}
									onChange={(value) => handleInputChange("location.address", value)}
									error={errors.address}
									placeholder="Street address"
									required
								/>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormField
										label="City"
										name="location.city"
										value={propertyData.location.city}
										onChange={(value) => handleInputChange("location.city", value)}
										error={errors.city}
										placeholder="City"
										required
									/>
									<FormField
										label="Country"
										name="location.country"
										value={propertyData.location.country}
										onChange={(value) => handleInputChange("location.country", value)}
										error={errors.country}
										placeholder="Country"
										required
									/>
								</div>
							</div>

							{/* Property Features */}
							<div className="space-y-6">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white">Property Features</h3>

								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Bedrooms
										</label>
										<select
											value={propertyData.features.bedrooms}
											onChange={(e) => handleInputChange("features.bedrooms", parseInt(e.target.value))}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
										>
											{[1, 2, 3, 4, 5, 6].map((num) => (
												<option key={num} value={num}>
													{num}
												</option>
											))}
										</select>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Bathrooms
										</label>
										<select
											value={propertyData.features.bathrooms}
											onChange={(e) => handleInputChange("features.bathrooms", parseInt(e.target.value))}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
										>
											{[1, 2, 3, 4, 5].map((num) => (
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
                                                        <div className="space-y-4">
                                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Amenities</h3>
                                                                {Object.values(AMENITY_CATEGORIES).map((category) => (
                                                                        <div key={category.title} className="mb-4">
                                                                                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                                                                                        {category.title}
                                                                                </h4>
                                                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                                                        {category.amenities.map((amenity) => (
                                                                                                <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                                                                                                        <input
                                                                                                                type="checkbox"
                                                                                                                checked={propertyData.amenities.includes(amenity)}
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

							{/* Photos */}
							<div className="space-y-4">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white">Photos</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400">
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
						</div>
					)}

					{/* Action Buttons */}
					<div className="flex justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
						<button
							type="button"
							onClick={handleSkip}
							className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
						>
							Skip for now
						</button>
						<button
							type="submit"
							disabled={isLoading}
							className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? (
								<div className="flex items-center">
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
									{propertyData.hasProperty ? "Creating Property..." : "Completing Setup..."}
								</div>
							) : propertyData.hasProperty ? (
								"Create Property & Finish"
							) : (
								"Complete Setup"
							)}
						</button>
					</div>
				</form>
			</div>
		</OnboardingLayout>
	);
}
