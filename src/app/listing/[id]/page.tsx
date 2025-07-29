// src/app/listing/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
	MapPin,
	Users,
	Bed,
	Bath,
	Home,
	Calendar,
	Heart,
	Share,
	Camera,
	ChevronLeft,
	ChevronRight,
	X,
	MessageCircle,
	ArrowLeft,
} from "lucide-react";

// Mock data - replace with actual API call
const getFlatById = (id: string) => {
	// This would be an API call in a real app
	return {
		id,
		title: "Cozy Apartment Near Beach",
		location: "Barcelona, Spain",
		coordinates: { lat: 41.3851, lng: 2.1734 },
		description:
			"Beautiful beachfront apartment just 5 minutes walk from Barceloneta Beach. Perfect for couples or small families wanting to experience the vibrant Barcelona lifestyle. The apartment features a sunny balcony with partial sea views and is surrounded by excellent restaurants and cafes.",
                features: {
                        rooms: 2,
                        bathrooms: 1,
                        guests: 4,
                        size: 75,
                },
		images: [
			"/images/flats/barcelona/living-room.png",
			"/images/flats/barcelona/bedroom.png",
			"/images/flats/barcelona/balcony.png",
			"/images/flats/barcelona/street.png",
		],
		amenities: {
			interior: ["Fitted Kitchen", "Air Conditioning", "WiFi", "TV", "Washing Machine", "Dishwasher"],
			building: ["Elevator", "Rooftop Terrace", "Bike Storage"],
			neighborhood: ["Beach Access", "Metro Station", "Restaurants", "Supermarket", "Nightlife"],
		},
		availability: {
			available: true,
			flexibleDates: true,
			minStay: 5,
			maxStay: 30,
		},
		host: {
			name: "Carlos Gomez",
			avatar: "/images/avatars/carlos.jpg",
			memberSince: "2022",
			verifiedUser: true,
			responseRate: 98,
			responseTime: "within 2 hours",
		},
	};
};

export default function FlatListingPage() {
	const params = useParams();
	const router = useRouter();
	const flatId = params.id as string;

	const [flat, setFlat] = useState<any>(null);
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);
	const [isGalleryOpen, setIsGalleryOpen] = useState(false);
	const [isFavorited, setIsFavorited] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulate API call
		setTimeout(() => {
			const flatData = getFlatById(flatId);
			setFlat(flatData);
			setIsLoading(false);
		}, 500);
	}, [flatId]);

	const nextImage = () => {
		if (!flat) return;
		setSelectedImageIndex((prev) => (prev + 1) % flat.images.length);
	};

	const prevImage = () => {
		if (!flat) return;
		setSelectedImageIndex((prev) => (prev - 1 + flat.images.length) % flat.images.length);
	};

	const openGallery = (index: number) => {
		setSelectedImageIndex(index);
		setIsGalleryOpen(true);
	};

	const handleContactHost = () => {
		// Navigate to messages or open contact modal
		router.push(`/profile/messages/new?recipient=${flat.host.name}&flatId=${flatId}`);
	};

	const handleRequestSwap = () => {
		// Navigate to swap request flow
		router.push(`/profile/searches/new?flatId=${flatId}`);
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
				<div className="flex items-center justify-center min-h-screen">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
				</div>
			</div>
		);
	}

	if (!flat) {
		return (
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
				<div className="flex items-center justify-center min-h-screen">
					<div className="text-center">
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Flat not found</h1>
						<button
							onClick={() => router.back()}
							className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
						>
							<ArrowLeft className="h-4 w-4 mr-2" />
							Go Back
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			{/* Header */}
			<div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<button
							onClick={() => router.back()}
							className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
						>
							<ArrowLeft className="h-5 w-5 mr-2" />
							Back
						</button>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
					{/* Images and Details */}
					<div>
						{/* Image Gallery */}
						<div className="mb-8">
							<div className="relative h-96 rounded-lg overflow-hidden mb-4">
								<img
									src={flat.images[selectedImageIndex]}
									alt={flat.title}
									className="w-full h-full object-cover cursor-pointer"
									onClick={() => openGallery(selectedImageIndex)}
								/>
								{flat.images.length > 1 && (
									<>
										<button
											onClick={prevImage}
											className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
										>
											<ChevronLeft className="h-5 w-5" />
										</button>
										<button
											onClick={nextImage}
											className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
										>
											<ChevronRight className="h-5 w-5" />
										</button>
									</>
								)}
								<div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
									{selectedImageIndex + 1} / {flat.images.length}
								</div>
							</div>

							{/* Thumbnail Gallery */}
							<div className="grid grid-cols-6 gap-2">
								{flat.images.slice(0, 5).map((image: string, index: number) => (
									<img
										key={index}
										src={image}
										alt={`${flat.title} ${index + 1}`}
										className={`h-16 w-full object-cover rounded cursor-pointer border-2 transition-all ${
											index === selectedImageIndex
												? "border-blue-500"
												: "border-transparent hover:border-gray-300"
										}`}
										onClick={() => setSelectedImageIndex(index)}
									/>
								))}
								{flat.images.length > 5 && (
									<button
										onClick={() => openGallery(5)}
										className="h-16 w-full bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
									>
										<Camera className="h-6 w-6" />
									</button>
								)}
							</div>
						</div>

						{/* Property Details */}
						<div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6">
							<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{flat.title}</h1>

							<div className="flex items-center text-gray-600 dark:text-gray-300 mb-6">
								<MapPin className="h-5 w-5 mr-2" />
								{flat.location}
							</div>

							{/* Property Stats */}
							<div className="grid grid-cols-4 gap-4 mb-6">
                                                                <div className="text-center">
                                                                        <div className="flex items-center justify-center mb-2">
                                                                                <Bed className="h-5 w-5 text-gray-400" />
                                                                        </div>
                                                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                                                                {flat.features.rooms}
                                                                        </div>
                                                                        <div className="text-sm text-gray-600 dark:text-gray-300">Rooms</div>
                                                                </div>
								<div className="text-center">
									<div className="flex items-center justify-center mb-2">
										<Bath className="h-5 w-5 text-gray-400" />
									</div>
									<div className="text-2xl font-bold text-gray-900 dark:text-white">
										{flat.features.bathrooms}
									</div>
									<div className="text-sm text-gray-600 dark:text-gray-300">Bathrooms</div>
								</div>
								<div className="text-center">
									<div className="flex items-center justify-center mb-2">
										<Users className="h-5 w-5 text-gray-400" />
									</div>
									<div className="text-2xl font-bold text-gray-900 dark:text-white">
										{flat.features.guests}
									</div>
									<div className="text-sm text-gray-600 dark:text-gray-300">Guests</div>
								</div>
								<div className="text-center">
									<div className="flex items-center justify-center mb-2">
										<Home className="h-5 w-5 text-gray-400" />
									</div>
									<div className="text-2xl font-bold text-gray-900 dark:text-white">{flat.features.size}</div>
									<div className="text-sm text-gray-600 dark:text-gray-300">m²</div>
								</div>
							</div>

							<p className="text-gray-600 dark:text-gray-300 leading-relaxed">{flat.description}</p>
						</div>

						{/* Amenities */}
						<div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6">
							<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Amenities</h2>

							<div className="space-y-6">
								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-3">Interior</h3>
									<div className="grid grid-cols-2 gap-2">
										{flat.amenities.interior.map((amenity: string, index: number) => (
											<div key={index} className="flex items-center text-gray-600 dark:text-gray-300">
												<span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
												{amenity}
											</div>
										))}
									</div>
								</div>

								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-3">Building</h3>
									<div className="grid grid-cols-2 gap-2">
										{flat.amenities.building.map((amenity: string, index: number) => (
											<div key={index} className="flex items-center text-gray-600 dark:text-gray-300">
												<span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
												{amenity}
											</div>
										))}
									</div>
								</div>

								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-3">Neighborhood</h3>
									<div className="grid grid-cols-2 gap-2">
										{flat.amenities.neighborhood.map((amenity: string, index: number) => (
											<div key={index} className="flex items-center text-gray-600 dark:text-gray-300">
												<span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
												{amenity}
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right Column - Host Info and Actions */}
					<div className="lg:col-span-1">
						<div className="sticky top-8">
							{/* Host Information */}
							<div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6">
								<div className="flex items-center mb-4">
									<div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
										{flat.host.name
											.split(" ")
											.map((n: string) => n[0])
											.join("")}
									</div>
									<div className="ml-4">
										<h3 className="font-semibold text-gray-900 dark:text-white">{flat.host.name}</h3>
										<p className="text-sm text-gray-600 dark:text-gray-300">
											Member since {flat.host.memberSince}
										</p>
									</div>
								</div>

								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span className="text-gray-600 dark:text-gray-300">Response rate:</span>
										<span className="font-medium text-gray-900 dark:text-white">
											{flat.host.responseRate}%
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600 dark:text-gray-300">Response time:</span>
										<span className="font-medium text-gray-900 dark:text-white">
											{flat.host.responseTime}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Full Screen Gallery Modal */}
			{isGalleryOpen && (
				<div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
					<button
						onClick={() => setIsGalleryOpen(false)}
						className="absolute top-4 right-4 text-white p-2 hover:bg-white hover:bg-opacity-10 rounded-full"
					>
						<X className="h-6 w-6" />
					</button>
					<button
						onClick={prevImage}
						className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 hover:bg-white hover:bg-opacity-10 rounded-full"
					>
						<ChevronLeft className="h-8 w-8" />
					</button>
					<button
						onClick={nextImage}
						className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 hover:bg-white hover:bg-opacity-10 rounded-full"
					>
						<ChevronRight className="h-8 w-8" />
					</button>
					<img
						src={flat.images[selectedImageIndex]}
						alt={flat.title}
						className="max-h-full max-w-full object-contain"
					/>
					<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg">
						{selectedImageIndex + 1} / {flat.images.length}
					</div>
				</div>
			)}
		</div>
	);
}
