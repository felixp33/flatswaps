// src/app/profile/properties/page.tsx
"use client";

import React, { useState } from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import {
	Edit3,
	Eye,
	MapPin,
	Star,
	Users,
	Bed,
	Bath,
	Home,
	Shield,
	Camera,
	X,
	ChevronLeft,
	ChevronRight,
	Plus,
} from "lucide-react";

export default function MyFlatPage() {
	// Mock image data - in a real app, this would come from your property data
	const [flatImages, setFlatImages] = useState([
		"/images/flat/living-room-main.png",
		"/images/flat/kitchen.png",
		"/images/flat/bedroom.png",
		"/images/flat/bathroom.png",
		"/images/flat/balcony.png",
		"/images/flat/street-view.png",
		"/images/flat/window-view.png",
	]);

	const [selectedImageIndex, setSelectedImageIndex] = useState(0);
	const [isGalleryOpen, setIsGalleryOpen] = useState(false);
	const [isUploading, setIsUploading] = useState(false);

	// Mock user's flat data
	const userFlat = {
		id: "1",
		title: "Berlin Altbau",
		location: "Berlin, Germany",
		description:
			"Beautiful Altbau flat in the heart of Berlin, perfect for couples or small families. Walking distance to Flughafen Tempelhof and excellent public transport connections.",
		isSwapAvailable: true,
		isActive: true,
		features: {
			bedrooms: 2,
			bathrooms: 1,
			guests: 4,
			size: 85,
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

	const openGallery = (imageIndex: number) => {
		setSelectedImageIndex(imageIndex);
		setIsGalleryOpen(true);
	};

	const closeGallery = () => {
		setIsGalleryOpen(false);
	};

	const navigateGallery = (direction: "next" | "prev") => {
		if (direction === "next") {
			setSelectedImageIndex((prev) => (prev + 1) % flatImages.length);
		} else {
			setSelectedImageIndex((prev) => (prev - 1 + flatImages.length) % flatImages.length);
		}
	};

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || []);
		if (files.length === 0) return;

		setIsUploading(true);

		// Simulate upload process
		files.forEach((file) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target?.result) {
					setFlatImages((prev) => [...prev, e.target!.result as string]);
				}
			};
			reader.readAsDataURL(file);
		});

		setTimeout(() => {
			setIsUploading(false);
		}, 1000);
	};

	const removeImage = (indexToRemove: number) => {
		setFlatImages((prev) => prev.filter((_, index) => index !== indexToRemove));
	};

	// Image placeholder component
	const ImagePlaceholder = ({
		className,
		isMain = false,
		style,
	}: {
		className: string;
		isMain?: boolean;
		style?: React.CSSProperties;
	}) => (
		<div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`} style={style}>
			<Camera className={`text-gray-400 ${isMain ? "h-16 w-16" : "h-8 w-8"}`} />
		</div>
	);

	return (
		<ProfileLayout>
			<div className="p-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Flat</h1>
						<p className="text-gray-600 dark:text-gray-300 mt-2">Manage your flat listing</p>
					</div>
					<div className="flex gap-3 mt-4 sm:mt-0">
						<button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
							<Edit3 className="h-4 w-4 mr-2" />
							Edit Listing
						</button>
					</div>
				</div>

				{/* Main Content */}
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
					<div className="flex flex-col lg:flex-row">
						{/* Image Gallery Section */}
						<div className="lg:w-1/2 p-6">
							{/* Main Image */}
							<div className="relative mb-4">
								<div className="relative h-80 rounded-lg overflow-hidden group cursor-pointer">
									{flatImages.length > 0 ? (
										<img
											src={flatImages[0]}
											alt="Main flat view"
											className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
											onClick={() => openGallery(0)}
											onError={(e) => {
												const target = e.target as HTMLImageElement;
												const nextSibling = target.nextSibling as HTMLElement;
												target.style.display = "none";
												if (nextSibling) {
													nextSibling.style.display = "flex";
												}
											}}
										/>
									) : null}
									<ImagePlaceholder
										className="absolute inset-0 rounded-lg"
										isMain={true}
										style={{ display: flatImages.length > 0 ? "none" : "flex" }}
									/>

									{/* Status badges */}
									<div className="absolute top-4 left-4 flex gap-2">
										{userFlat.verified && (
											<span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center">
												<Shield className="h-3 w-3 mr-1" />
												Verified
											</span>
										)}
									</div>

									{/* Image count overlay */}
									{flatImages.length > 1 && (
										<div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
											1 / {flatImages.length}
										</div>
									)}
								</div>
							</div>

							{/* Thumbnail Grid */}
							<div className="grid grid-cols-4 gap-2">
								{flatImages.slice(1, 5).map((image, index) => (
									<div
										key={index + 1}
										className="relative h-20 rounded-lg overflow-hidden cursor-pointer group"
										onClick={() => openGallery(index + 1)}
									>
										<img
											src={image}
											alt={`Flat view ${index + 2}`}
											className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
											onError={(e) => {
												const target = e.target as HTMLImageElement;
												const nextSibling = target.nextSibling as HTMLElement;
												target.style.display = "none";
												if (nextSibling) {
													nextSibling.style.display = "flex";
												}
											}}
										/>
										<ImagePlaceholder className="absolute inset-0 rounded-lg" style={{ display: "none" }} />
									</div>
								))}

								{/* Show more images button */}
								{flatImages.length > 5 && (
									<div
										className="relative h-20 rounded-lg overflow-hidden cursor-pointer group bg-gray-800 bg-opacity-50 flex items-center justify-center"
										onClick={() => openGallery(5)}
									>
										<div className="text-white text-center">
											<Camera className="h-6 w-6 mx-auto mb-1" />
											<span className="text-xs">+{flatImages.length - 5}</span>
										</div>
									</div>
								)}

								{/* Add images button */}
								<label className="relative h-20 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer group hover:border-blue-500 dark:hover:border-blue-400 transition-colors flex items-center justify-center">
									<div className="text-center">
										{isUploading ? (
											<div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
										) : (
											<>
												<Plus className="h-6 w-6 text-gray-400 group-hover:text-blue-500 mx-auto mb-1" />
												<span className="text-xs text-gray-500 group-hover:text-blue-500">Add</span>
											</>
										)}
									</div>
									<input
										type="file"
										multiple
										accept="image/*"
										onChange={handleImageUpload}
										className="hidden"
									/>
								</label>
							</div>

							{/* View all images button */}
							{flatImages.length > 0 && (
								<button
									onClick={() => openGallery(0)}
									className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
								>
									<Camera className="h-4 w-4 mr-2" />
									View All {flatImages.length} Images
								</button>
							)}
						</div>

						{/* Flat Details */}
						<div className="lg:w-1/2 p-8">
							<div className="mb-6">
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{userFlat.title}</h2>
								<div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
									<MapPin className="h-5 w-5 mr-2" />
									{userFlat.location}
								</div>
								<div className="flex items-center space-x-6 text-sm mb-6">
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

							<p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{userFlat.description}</p>

							{/* Amenities Preview */}
							<div className="mb-6">
								<h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Key Features</h3>

								{/* Preview of Interior amenities */}
								<div className="flex flex-wrap gap-2">
									{userFlat.amenities.interior.slice(0, 3).map((amenity, index) => (
										<span
											key={index}
											className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
										>
											{amenity}
										</span>
									))}
									{userFlat.amenities.interior.length > 3 && (
										<span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
											+{userFlat.amenities.interior.length - 3} more
										</span>
									)}
								</div>
							</div>

							{/* Action Button */}
							<div className="flex justify-end">
								<button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
									<Eye className="h-4 w-4 mr-2" />
									View Public Listing
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Complete Amenities List */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
						Complete Amenities & Features
					</h3>

					{/* General Information */}
					<div className="mb-6">
						<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
							<Home className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
							General Information
						</h4>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
							{userFlat.amenities.general.map((amenity, index) => (
								<div
									key={index}
									className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
								>
									<div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
									<span className="text-sm text-gray-900 dark:text-white">{amenity}</span>
								</div>
							))}
						</div>
					</div>

					{/* Accessibility */}
					<div className="mb-6">
						<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
							<Users className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
							Accessibility
						</h4>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
							{userFlat.amenities.accessibility.map((amenity, index) => (
								<div
									key={index}
									className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
								>
									<div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
									<span className="text-sm text-gray-900 dark:text-white">{amenity}</span>
								</div>
							))}
						</div>
					</div>

					{/* Interior Features */}
					<div className="mb-6">
						<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
							<Bed className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
							Interior Features
						</h4>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
							{userFlat.amenities.interior.map((amenity, index) => (
								<div
									key={index}
									className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
								>
									<div className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
									<span className="text-sm text-gray-900 dark:text-white">{amenity}</span>
								</div>
							))}
						</div>
					</div>

					{/* Exterior Features */}
					<div className="mb-6">
						<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
							<MapPin className="h-4 w-4 mr-2 text-orange-600 dark:text-orange-400" />
							Exterior Features
						</h4>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
							{userFlat.amenities.exterior.map((amenity, index) => (
								<div
									key={index}
									className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
								>
									<div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
									<span className="text-sm text-gray-900 dark:text-white">{amenity}</span>
								</div>
							))}
						</div>
					</div>

					{/* Equipment & Technology */}
					<div>
						<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
							<Star className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
							Equipment & Technology
						</h4>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
							{userFlat.amenities.equipment.map((amenity, index) => (
								<div
									key={index}
									className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
								>
									<div className="w-2 h-2 bg-indigo-500 rounded-full mr-3 flex-shrink-0"></div>
									<span className="text-sm text-gray-900 dark:text-white">{amenity}</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Gallery Modal */}
				{isGalleryOpen && (
					<div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
						<div className="relative w-full h-full flex items-center justify-center p-4">
							{/* Close button */}
							<button
								onClick={closeGallery}
								className="absolute top-4 right-4 z-50 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
							>
								<X className="h-6 w-6" />
							</button>

							{/* Previous button */}
							{flatImages.length > 1 && (
								<button
									onClick={() => navigateGallery("prev")}
									className="absolute left-4 z-50 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
								>
									<ChevronLeft className="h-6 w-6" />
								</button>
							)}

							{/* Main image */}
							<div className="max-w-4xl max-h-full">
								<img
									src={flatImages[selectedImageIndex]}
									alt={`Flat view ${selectedImageIndex + 1}`}
									className="max-w-full max-h-full object-contain"
									onError={(e) => {
										const target = e.target as HTMLImageElement;
										const nextSibling = target.nextSibling as HTMLElement;
										target.style.display = "none";
										if (nextSibling) {
											nextSibling.style.display = "flex";
										}
									}}
								/>
								<div
									className="w-96 h-96 bg-gray-700 flex items-center justify-center rounded-lg"
									style={{ display: "none" }}
								>
									<Camera className="h-16 w-16 text-gray-400" />
								</div>
							</div>

							{/* Next button */}
							{flatImages.length > 1 && (
								<button
									onClick={() => navigateGallery("next")}
									className="absolute right-4 z-50 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
								>
									<ChevronRight className="h-6 w-6" />
								</button>
							)}

							{/* Image counter */}
							<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
								{selectedImageIndex + 1} / {flatImages.length}
							</div>

							{/* Thumbnail strip */}
							<div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto">
								{flatImages.map((image, index) => (
									<button
										key={index}
										onClick={() => setSelectedImageIndex(index)}
										className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
											index === selectedImageIndex
												? "border-white"
												: "border-transparent opacity-70 hover:opacity-100"
										}`}
									>
										<img
											src={image}
											alt={`Thumbnail ${index + 1}`}
											className="w-full h-full object-cover"
											onError={(e) => {
												const target = e.target as HTMLImageElement;
												const nextSibling = target.nextSibling as HTMLElement;
												target.style.display = "none";
												if (nextSibling) {
													nextSibling.style.display = "flex";
												}
											}}
										/>
										<div
											className="w-full h-full bg-gray-600 flex items-center justify-center"
											style={{ display: "none" }}
										>
											<Camera className="h-4 w-4 text-gray-400" />
										</div>
									</button>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</ProfileLayout>
	);
}
