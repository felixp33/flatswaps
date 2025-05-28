"use client";

import React, { useState } from "react";
import {
	Edit,
	Upload,
	X,
	Plus,
	Check,
	MapPin,
	Bed,
	Bath,
	Users,
	Wifi,
	Car,
	Dog,
	Cigarette,
	Home,
	Shield,
	TreePine,
	Accessibility,
} from "lucide-react";

type FeatureKey = "smoking" | "pets" | "parking" | "balcony" | "elevator" | "basement" | "garden" | "disabledFriendly";

interface Features {
	smoking: boolean;
	pets: boolean;
	parking: boolean;
	balcony: boolean;
	elevator: boolean;
	basement: boolean;
	garden: boolean;
	disabledFriendly: boolean;
}

export default function MyFlatSection() {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [galleryImages, setGalleryImages] = useState<string[]>([
		"/api/placeholder/300/200",
		"/api/placeholder/300/200",
		"/api/placeholder/300/200",
		"/api/placeholder/300/200",
	]);

	const [features, setFeatures] = useState<Features>({
		smoking: false,
		pets: false,
		parking: false,
		balcony: false,
		elevator: false,
		basement: false,
		garden: false,
		disabledFriendly: false,
	});

	const featuresList: { key: FeatureKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
		{ key: "smoking", label: "Smoking", icon: Cigarette },
		{ key: "pets", label: "Pets", icon: Dog },
		{ key: "parking", label: "Parking", icon: Car },
		{ key: "balcony", label: "Balcony", icon: Home },
		{ key: "elevator", label: "Elevator", icon: Shield },
		{ key: "basement", label: "Basement", icon: Home },
		{ key: "garden", label: "Garden", icon: TreePine },
		{ key: "disabledFriendly", label: "Disabled Friendly", icon: Accessibility },
	];

	const handleFeatureToggle = (feature: FeatureKey): void => {
		if (isEditing) {
			setFeatures((prev) => ({
				...prev,
				[feature]: !prev[feature],
			}));
		}
	};

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const files = Array.from(event.target.files || []);
		files.forEach((file) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target?.result) {
					setGalleryImages((prev) => [...prev, e.target!.result as string]);
				}
			};
			reader.readAsDataURL(file);
		});
	};

	const removeImage = (index: number): void => {
		if (isEditing) {
			setGalleryImages((prev) => prev.filter((_, i) => i !== index));
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
			{/* Header */}
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Flat</h1>
				<button
					onClick={() => setIsEditing(!isEditing)}
					className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors ${
						isEditing ? "bg-green-600 hover:bg-green-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
					}`}
				>
					{isEditing ? (
						<>
							<Check className="h-4 w-4 mr-2" />
							Save
						</>
					) : (
						<>
							<Edit className="h-4 w-4 mr-2" />
							Edit
						</>
					)}
				</button>
			</div>

			{/* Property Summary */}
			<div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
				<div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
					<MapPin className="h-4 w-4 mr-2" />
					<span>Manhattan, New York, USA</span>
				</div>
				<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Modern Loft Apartment</h2>
				<div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-300">
					<div className="flex items-center">
						<Bed className="h-4 w-4 mr-1" />
						<span>2 bedrooms</span>
					</div>
					<div className="flex items-center">
						<Bath className="h-4 w-4 mr-1" />
						<span>1 bathroom</span>
					</div>
					<div className="flex items-center">
						<Users className="h-4 w-4 mr-1" />
						<span>Up to 4 guests</span>
					</div>
				</div>
			</div>

			{/* Features & Rules */}
			<div className="mb-8">
				<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Features & Rules</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{featuresList.map(({ key, label, icon: Icon }) => (
						<div
							key={key}
							onClick={() => handleFeatureToggle(key)}
							className={`p-4 rounded-lg border-2 transition-all duration-200 ${
								isEditing ? "cursor-pointer hover:shadow-md" : ""
							} ${
								features[key]
									? "border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-600"
									: "border-gray-200 bg-white dark:bg-gray-700 dark:border-gray-600"
							}`}
						>
							<div className="flex flex-col items-center text-center">
								<Icon
									className={`h-6 w-6 mb-2 ${
										features[key] ? "text-green-600 dark:text-green-400" : "text-gray-400 dark:text-gray-500"
									}`}
								/>
								<span
									className={`text-sm font-medium ${
										features[key] ? "text-green-700 dark:text-green-300" : "text-gray-600 dark:text-gray-300"
									}`}
								>
									{label}
								</span>
								<span
									className={`text-xs mt-1 ${
										features[key] ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"
									}`}
								>
									{features[key] ? "Yes" : "No"}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Gallery */}
			<div>
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Gallery</h2>
					{isEditing && (
						<label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors">
							<Plus className="h-4 w-4 mr-2" />
							Add Photos
							<input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
						</label>
					)}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{galleryImages.map((image, index) => (
						<div key={index} className="relative group">
							<div className="aspect-w-16 aspect-h-12 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
								<img
									src={image}
									alt={`Property photo ${index + 1}`}
									className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</div>
							{isEditing && (
								<button
									onClick={() => removeImage(index)}
									className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100"
								>
									<X className="h-4 w-4" />
								</button>
							)}
						</div>
					))}

					{isEditing && (
						<label className="aspect-w-16 aspect-h-12 bg-gray-100 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
							<div className="text-center">
								<Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
								<span className="text-sm text-gray-500 dark:text-gray-400">Upload more photos</span>
							</div>
							<input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
						</label>
					)}
				</div>

				{galleryImages.length === 0 && (
					<div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg">
						<Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
						<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No photos yet</h3>
						<p className="text-gray-500 dark:text-gray-400 mb-4">Add some photos to showcase your property</p>
						{isEditing && (
							<label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors">
								<Plus className="h-4 w-4 mr-2" />
								Add Your First Photo
								<input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
							</label>
						)}
					</div>
				)}
			</div>

			{/* Additional Information */}
			{isEditing && (
				<div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
					<h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">Editing Mode Active</h3>
					<p className="text-blue-700 dark:text-blue-300 text-sm">
						Click on features to toggle them on/off. Upload new photos or remove existing ones. Don't forget to
						save your changes when you're done!
					</p>
				</div>
			)}
		</div>
	);
}
