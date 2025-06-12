// src/app/profile/properties/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Add this import
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
	const router = useRouter(); // Add this hook

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

	// Add handler for View Public Listing button
	const handleViewPublicListing = () => {
		router.push(`/listing/${userFlat.id}`);
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
									{userFlat.verified && (
										<div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center">
											<Shield className="h-3 w-3 mr-1" />
											Verified
										</div>
									)}
									<div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
										1 / {flatImages.length}
									</div>
								</div>
							</div>

							{/* Thumbnail Gallery */}
							<div className="grid grid-cols-6 gap-2">
								{flatImages.slice(1, 5).map((image, index) => (
									<div key={index + 1} className="relative">
										<img
											src={image}
											alt={`Flat view ${index + 2}`}
											className="h-16 w-full object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
											onClick={() => openGallery(index + 1)}
											onError={(e) => {
												const target = e.target as HTMLImageElement;
												const parent = target.parentElement;
												if (parent) {
													parent.innerHTML = `<div class="h-16 w-full bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center"><svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div>`;
												}
											}}
										/>
										<button
											onClick={() => removeImage(index + 1)}
											className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
											style={{ fontSize: "10px", width: "18px", height: "18px" }}
										>
											<X className="h-2 w-2" />
										</button>
									</div>
								))}

								{/* Add more images slot */}
								<label className="h-16 w-full bg-gray-100 dark:bg-gray-700 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex flex-col items-center justify-center group">
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

							{/* Action Button - Updated with onClick handler */}
							<div className="flex justify-end">
								<button
									onClick={handleViewPublicListing}
									className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
								>
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
						<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">General</h4>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
							{userFlat.amenities.general.map((amenity, index) => (
								<div key={index} className="flex items-center text-gray-600 dark:text-gray-300">
									<span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
									{amenity}
								</div>
							))}
						</div>
					</div>

					{/* Accessibility */}
					<div className="mb-6">
						<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Accessibility</h4>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
							{userFlat.amenities.accessibility.map((amenity, index) => (
								<div key={index} className="flex items-center text-gray-600 dark:text-gray-300">
									<span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
									{amenity}
								</div>
							))}
						</div>
					</div>

					{/* Interior */}
					<div className="mb-6">
						<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Interior</h4>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
							{userFlat.amenities.interior.map((amenity, index) => (
								<div key={index} className="flex items-center text-gray-600 dark:text-gray-300">
									<span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
									{amenity}
								</div>
							))}
						</div>
					</div>

					{/* Exterior */}
					<div className="mb-6">
						<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Exterior</h4>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
							{userFlat.amenities.exterior.map((amenity, index) => (
								<div key={index} className="flex items-center text-gray-600 dark:text-gray-300">
									<span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
									{amenity}
								</div>
							))}
						</div>
					</div>

					{/* Equipment */}
					<div>
						<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Equipment</h4>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
							{userFlat.amenities.equipment.map((amenity, index) => (
								<div key={index} className="flex items-center text-gray-600 dark:text-gray-300">
									<span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
									{amenity}
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Availability & Status */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Availability & Status</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Availability</h4>
							<p className="text-gray-600 dark:text-gray-300 mb-2">
								Next available: <span className="font-medium">{userFlat.availability.nextAvailable}</span>
							</p>
							<p className="text-gray-600 dark:text-gray-300 mb-2">
								Preferred duration:{" "}
								<span className="font-medium">{userFlat.availability.preferredDuration}</span>
							</p>
							<p className="text-gray-600 dark:text-gray-300">
								Restrictions: <span className="font-medium">{userFlat.availability.restrictions}</span>
							</p>
						</div>

						<div>
							<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Property Status</h4>
							<div className="space-y-2">
								<div className="flex items-center">
									<span
										className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
											userFlat.isActive
												? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
												: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
										}`}
									>
										{userFlat.isActive ? "Active" : "Inactive"}
									</span>
								</div>
								<div className="flex items-center">
									<span
										className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
											userFlat.isSwapAvailable
												? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
												: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
										}`}
									>
										{userFlat.isSwapAvailable ? "Available for Swap" : "Not Available for Swap"}
									</span>
								</div>
							</div>
							<p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
								Last updated: {userFlat.lastUpdated}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Full Screen Image Gallery Modal */}
			{isGalleryOpen && (
				<div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
					<button
						onClick={closeGallery}
						className="absolute top-4 right-4 text-white p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
					>
						<X className="h-6 w-6" />
					</button>

					<button
						onClick={() => navigateGallery("prev")}
						className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
					>
						<ChevronLeft className="h-8 w-8" />
					</button>

					<button
						onClick={() => navigateGallery("next")}
						className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
					>
						<ChevronRight className="h-8 w-8" />
					</button>

					<img
						src={flatImages[selectedImageIndex]}
						alt={`Flat view ${selectedImageIndex + 1}`}
						className="max-h-full max-w-full object-contain"
						onError={(e) => {
							const target = e.target as HTMLImageElement;
							target.src = "/images/placeholder-flat.jpg"; // Fallback image
						}}
					/>

					<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg">
						{selectedImageIndex + 1} / {flatImages.length}
					</div>
				</div>
			)}
		</ProfileLayout>
	);
}
