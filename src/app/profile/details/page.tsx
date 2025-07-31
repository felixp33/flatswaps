// src/app/profile/details/page.tsx
"use client";

import { useState, useEffect } from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { Edit, Save, X, Shield, Star, MapPin, Calendar, Camera } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { fetchProfile, upsertProfile } from "@/lib/api";

export default function ProfileDetails() {
        const { user } = useAuth();
        const [isEditing, setIsEditing] = useState(false);

        const [formData, setFormData] = useState({
                // Basic Information
                firstName: "Emma",
                lastName: "Maier",
                email: "emma .meier@example.com",
                phone: "+49 (30) 123-45678",
		bio: "Software engineer and travel enthusiast. Love exploring new cities and experiencing different cultures through authentic local stays. My modern loft in Berlin is perfect for professionals or couples wanting to experience the vibrant startup scene and rich history of the city.",

		// Occupation Details
		employmentType: "Full-time Employee",
		incomeRange: "€50,000 - €75,000",
		workLocation: "Berlin, Deutschland",
		languages: ["English", "German", "Spanish"],
	});

        const [originalData, setOriginalData] = useState(formData);

        useEffect(() => {
                if (!user) return;
                fetchProfile(user.id).then((data) => {
                        if (data) {
                                setFormData({
                                        firstName: data.first_name || "",
                                        lastName: data.last_name || "",
                                        email: data.email || "",
                                        phone: data.phone || "",
                                        bio: data.bio || "",
                                        employmentType: data.employment_type || "",
                                        incomeRange: data.income_range || "",
                                        workLocation: data.work_location || "",
                                        languages: data.languages || [],
                                });
                                setOriginalData(data);
                        }
                });
        }, [user]);

	const employmentTypes = [
		"Full-time Employee",
		"Part-time Employee",
		"Freelancer/Contractor",
		"Self-employed",
		"Student",
		"Retired",
		"Unemployed",
		"Other",
	];

	const incomeRanges = [
		"Under €25,000",
		"€25,000 - €35,000",
		"€35,000 - €50,000",
		"€50,000 - €75,000",
		"€75,000 - €100,000",
		"€100,000 - €150,000",
		"Over €150,000",
		"Prefer not to say",
	];

	const availableLanguages = [
		"English",
		"Spanish",
		"French",
		"German",
		"Italian",
		"Portuguese",
		"Dutch",
		"Chinese",
		"Japanese",
		"Arabic",
	];

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleLanguageToggle = (language: string) => {
		setFormData((prev) => ({
			...prev,
			languages: prev.languages.includes(language)
				? prev.languages.filter((lang) => lang !== language)
				: [...prev.languages, language],
		}));
	};

        const handleSave = async () => {
                setOriginalData(formData);
                setIsEditing(false);
                if (user) {
                        await upsertProfile({
                                id: user.id,
                                first_name: formData.firstName,
                                last_name: formData.lastName,
                                email: formData.email,
                                phone: formData.phone,
                                bio: formData.bio,
                                employment_type: formData.employmentType,
                                income_range: formData.incomeRange,
                                work_location: formData.workLocation,
                                languages: formData.languages,
                        });
                }
        };

	const handleCancel = () => {
		setFormData(originalData);
		setIsEditing(false);
	};

	const stats = [
		{ label: "Total Swaps", value: "8", icon: Shield, color: "text-blue-600" },
		{ label: "Reviews", value: "23", icon: Star, color: "text-yellow-600" },
		{ label: "Response Rate", value: "95%", icon: MapPin, color: "text-green-600" },
		{ label: "Rating", value: "4.8", icon: Calendar, color: "text-purple-600" },
	];

	return (
		<ProfileLayout>
			<div className="p-6 space-y-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
					<div>
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Details</h1>
						<p className="text-gray-600 dark:text-gray-300 mt-1">
							Manage your personal information and preferences
						</p>
					</div>
					{!isEditing ? (
						<button
							onClick={() => setIsEditing(true)}
							className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
						>
							<Edit className="h-4 w-4 mr-2" />
							Edit Profile
						</button>
					) : (
						<div className="mt-4 sm:mt-0 flex space-x-3">
							<button
								onClick={handleCancel}
								className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
							>
								<X className="h-4 w-4 mr-2" />
								Cancel
							</button>
							<button
								onClick={handleSave}
								className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
							>
								<Save className="h-4 w-4 mr-2" />
								Save Changes
							</button>
						</div>
					)}
				</div>

				{/* Profile Header */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
					<div className="flex items-center space-x-6">
						{/* Profile Photo */}
						<div className="relative">
							<div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-2xl">
								{formData.firstName[0]}
								{formData.lastName[0]}
							</div>
							{isEditing && (
								<div className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
									<Camera className="h-4 w-4 text-white" />
								</div>
							)}
						</div>

						{/* User Info */}
						<div className="flex-1">
							<div className="flex items-center space-x-3 mb-2">
								<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
									{formData.firstName} {formData.lastName}
								</h2>
								<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
									<Shield className="h-3 w-3 mr-1" />
									Verified
								</span>
							</div>

							<div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
								<MapPin className="h-4 w-4 mr-1" />
								Berlin, Germany
							</div>

							<div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
								<Calendar className="h-4 w-4 mr-1" />
								Member since January 2024
							</div>

							<div className="flex items-center space-x-4">
								<div className="flex items-center">
									<Star className="h-4 w-4 text-yellow-400 mr-1" />
									<span className="text-sm font-medium text-gray-900 dark:text-white">4.8 (23 reviews)</span>
								</div>
								<div className="text-sm text-gray-500 dark:text-gray-400">95% response rate</div>
							</div>
						</div>
					</div>

					{/* Bio */}
					<div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
						<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">About</h3>
						{isEditing ? (
							<textarea
								value={formData.bio}
								onChange={(e) => handleInputChange("bio", e.target.value)}
								rows={4}
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
								placeholder="Tell others about yourself..."
							/>
						) : (
							<p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{formData.bio}</p>
						)}
					</div>
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
					{stats.map((stat, index) => {
						const Icon = stat.icon;
						return (
							<div
								key={index}
								className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
							>
								<div className="flex items-center">
									<Icon className={`h-6 w-6 ${stat.color} mr-3`} />
									<div>
										<p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
										<p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* Personal Information */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Personal Information</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">First Name</label>
							{isEditing ? (
								<input
									type="text"
									value={formData.firstName}
									onChange={(e) => handleInputChange("firstName", e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
								/>
							) : (
								<p className="text-gray-900 dark:text-white">{formData.firstName}</p>
							)}
						</div>
						<div>
							<label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Last Name</label>
							{isEditing ? (
								<input
									type="text"
									value={formData.lastName}
									onChange={(e) => handleInputChange("lastName", e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
								/>
							) : (
								<p className="text-gray-900 dark:text-white">{formData.lastName}</p>
							)}
						</div>
						<div>
							<label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Email</label>
							{isEditing ? (
								<input
									type="email"
									value={formData.email}
									onChange={(e) => handleInputChange("email", e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
								/>
							) : (
								<p className="text-gray-900 dark:text-white">{formData.email}</p>
							)}
						</div>
						<div>
							<label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Phone</label>
							{isEditing ? (
								<input
									type="tel"
									value={formData.phone}
									onChange={(e) => handleInputChange("phone", e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
								/>
							) : (
								<p className="text-gray-900 dark:text-white">{formData.phone}</p>
							)}
						</div>
					</div>
				</div>

				{/* Occupation Details */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Occupation</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Employment Type</label>
							{isEditing ? (
								<select
									value={formData.employmentType}
									onChange={(e) => handleInputChange("employmentType", e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
								>
									{employmentTypes.map((type) => (
										<option key={type} value={type}>
											{type}
										</option>
									))}
								</select>
							) : (
								<p className="text-gray-900 dark:text-white">{formData.employmentType}</p>
							)}
						</div>
						<div>
							<label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Income Range</label>
							{isEditing ? (
								<select
									value={formData.incomeRange}
									onChange={(e) => handleInputChange("incomeRange", e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
								>
									{incomeRanges.map((range) => (
										<option key={range} value={range}>
											{range}
										</option>
									))}
								</select>
							) : (
								<p className="text-gray-900 dark:text-white">{formData.incomeRange}</p>
							)}
						</div>
						<div className="md:col-span-2">
							<label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Work Location</label>
							{isEditing ? (
								<input
									type="text"
									value={formData.workLocation}
									onChange={(e) => handleInputChange("workLocation", e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
								/>
							) : (
								<p className="text-gray-900 dark:text-white">{formData.workLocation}</p>
							)}
						</div>
					</div>
				</div>

				{/* Languages */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Languages</h3>
					{isEditing ? (
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
							{availableLanguages.map((language) => (
								<label key={language} className="flex items-center space-x-2 cursor-pointer">
									<input
										type="checkbox"
										checked={formData.languages.includes(language)}
										onChange={() => handleLanguageToggle(language)}
										className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
									/>
									<span className="text-sm text-gray-700 dark:text-gray-300">{language}</span>
								</label>
							))}
						</div>
					) : (
						<div className="flex flex-wrap gap-2">
							{formData.languages.map((language, index) => (
								<span
									key={index}
									className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
								>
									{language}
								</span>
							))}
						</div>
					)}
				</div>
			</div>
		</ProfileLayout>
	);
}
