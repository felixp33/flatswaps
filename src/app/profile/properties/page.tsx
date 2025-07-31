// src/app/profile/properties/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
	Camera,
	X,
	ChevronLeft,
	ChevronRight,
        Plus,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { fetchFlat, upsertFlat } from "@/lib/api";

export default function MyFlatPage() {
	const router = useRouter();

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

        const { user } = useAuth();

        const placeholderFlat = {
                id: "1",
                title: "Berlin Altbau",
                location: "Berlin, Germany",
                description:
                        "Beautiful Altbau flat in the heart of Berlin, perfect for couples or small families. Walking distance to Flughafen Tempelhof and excellent public transport connections.",
                features: {
                        rooms: 2,
                        guests: 4,
                        size: 85,
                },
                amenities: {
                        general: ["Non-smoking", "Pets allowed", "Long-term stays welcome", "Self check-in", "Private entrance"],
                        accessibility: ["Wide doorways", "Step-free access", "Accessible parking spot"],
                        interior: ["Fitted Kitchen", "Shower", "Separate WC", "WiFi", "Heating", "Dishwasher"],
                        exterior: ["Balcony", "Garden access", "Bike storage", "Parking space"],
                        equipment: ["Washing machine", "Dryer", "Iron", "Hair dryer", "First aid kit"],
                },
                rating: 4.8,
                reviews: 23,
                verified: true,
                isActive: true,
                isSwapAvailable: true,
                lastUpdated: "March 15, 2024",
        };

        const [userFlat, setUserFlat] = useState<any>(placeholderFlat);

        useEffect(() => {
                if (!user) return;
                fetchFlat(user.id).then((data) => {
                        if (data) setUserFlat(data);
                });
        }, [user]);

	const openGallery = (index: number) => {
		setSelectedImageIndex(index);
		setIsGalleryOpen(true);
	};

	const closeGallery = () => {
		setIsGalleryOpen(false);
	};

	const navigateGallery = (direction: "prev" | "next") => {
		if (direction === "prev") {
			setSelectedImageIndex((prev) => (prev === 0 ? flatImages.length - 1 : prev - 1));
		} else {
			setSelectedImageIndex((prev) => (prev === flatImages.length - 1 ? 0 : prev + 1));
		}
	};

	const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (!files) return;

		setIsUploading(true);
		// Simulate upload delay
		setTimeout(() => {
			setIsUploading(false);
		}, 2000);

		// In a real app, you would upload to your backend/Supabase storage here
		// For now, we'll just simulate adding new images
		const newImageUrls = Array.from(files).map((file) => URL.createObjectURL(file));
		setFlatImages((prev) => [...prev, ...newImageUrls]);
	};

	const handleViewPublicListing = () => {
		router.push(`/listing/${userFlat.id}`);
	};

	// Placeholder component for missing images
	const ImagePlaceholder = ({
		className,
		isMain,
		style,
	}: {
		className?: string;
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
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
											onClick={() => openGallery(0)}
											onError={(e) => {
												const target = e.target as HTMLImageElement;
												target.style.display = "none";
												const placeholder = target.nextElementSibling as HTMLElement;
												if (placeholder) placeholder.style.display = "flex";
											}}
										/>
									) : (
										<ImagePlaceholder className="w-full h-full rounded-lg" isMain />
									)}
									<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
										<Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
									</div>
								</div>
							</div>

							{/* Thumbnail Grid */}
							<div className="grid grid-cols-4 gap-2 mb-4">
								{flatImages.slice(1, 5).map((image, index) => (
									<div
										key={index + 1}
										className="relative h-20 rounded-lg overflow-hidden cursor-pointer group"
										onClick={() => openGallery(index + 1)}
									>
										<img
											src={image}
											alt={`Flat view ${index + 2}`}
											className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
											onError={(e) => {
												const target = e.target as HTMLImageElement;
												target.style.display = "none";
												const placeholder = target.nextElementSibling as HTMLElement;
												if (placeholder) placeholder.style.display = "flex";
											}}
										/>
										<ImagePlaceholder
											className="w-full h-full absolute inset-0"
											style={{ display: "none" }}
										/>
									</div>
								))}

								{/* Upload new images */}
								<label className="h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors group">
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
                                                                               {userFlat.features.rooms} rooms
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
