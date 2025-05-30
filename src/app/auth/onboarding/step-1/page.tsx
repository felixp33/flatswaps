// Simplified src/app/auth/onboarding/step-1/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Camera, MapPin, Check } from "lucide-react";
import OnboardingLayout from "@/components/auth/OnboardingLayout";
import FormField from "@/components/auth/FormField";
import { validateProfileForm } from "@/lib/auth/validation";
import { ProfileSetupData, ValidationErrors } from "@/types/auth";
import Image from "next/image";

// City data with country inference
const POPULAR_CITIES = [
	{ name: "Berlin", country: "Germany", flag: "🇩🇪" },
	{ name: "London", country: "United Kingdom", flag: "🇬🇧" },
	{ name: "Paris", country: "France", flag: "🇫🇷" },
	{ name: "Madrid", country: "Spain", flag: "🇪🇸" },
	{ name: "Amsterdam", country: "Netherlands", flag: "🇳🇱" },
	{ name: "Rome", country: "Italy", flag: "🇮🇹" },
	{ name: "Barcelona", country: "Spain", flag: "🇪🇸" },
	{ name: "Vienna", country: "Austria", flag: "🇦🇹" },
	{ name: "Prague", country: "Czech Republic", flag: "🇨🇿" },
	{ name: "Copenhagen", country: "Denmark", flag: "🇩🇰" },
	{ name: "Stockholm", country: "Sweden", flag: "🇸🇪" },
	{ name: "Helsinki", country: "Finland", flag: "🇫🇮" },
	{ name: "Oslo", country: "Norway", flag: "🇳🇴" },
	{ name: "Zurich", country: "Switzerland", flag: "🇨🇭" },
	{ name: "Brussels", country: "Belgium", flag: "🇧🇪" },
	{ name: "Dublin", country: "Ireland", flag: "🇮🇪" },
	{ name: "Lisbon", country: "Portugal", flag: "🇵🇹" },
	{ name: "Warsaw", country: "Poland", flag: "🇵🇱" },
	{ name: "Budapest", country: "Hungary", flag: "🇭🇺" },
	{ name: "Munich", country: "Germany", flag: "🇩🇪" },
	{ name: "Hamburg", country: "Germany", flag: "🇩🇪" },
	{ name: "Milan", country: "Italy", flag: "🇮🇹" },
	{ name: "Lyon", country: "France", flag: "🇫🇷" },
	{ name: "Manchester", country: "United Kingdom", flag: "🇬🇧" },
	{ name: "Edinburgh", country: "United Kingdom", flag: "🇬🇧" },
	{ name: "New York", country: "United States", flag: "🇺🇸" },
	{ name: "Los Angeles", country: "United States", flag: "🇺🇸" },
	{ name: "San Francisco", country: "United States", flag: "🇺🇸" },
	{ name: "Toronto", country: "Canada", flag: "🇨🇦" },
	{ name: "Montreal", country: "Canada", flag: "🇨🇦" },
	{ name: "Sydney", country: "Australia", flag: "🇦🇺" },
	{ name: "Melbourne", country: "Australia", flag: "🇦🇺" },
	{ name: "Tokyo", country: "Japan", flag: "🇯🇵" },
	{ name: "Seoul", country: "South Korea", flag: "🇰🇷" },
	{ name: "Singapore", country: "Singapore", flag: "🇸🇬" },
];

export default function OnboardingStep1() {
	const router = useRouter();
	const [formData, setFormData] = useState<ProfileSetupData>({
		location: { city: "", country: "" },
		bio: "",
		languages: ["English"], // Default to English
		contactMethod: "both", // Default preference
	});
	const [errors, setErrors] = useState<ValidationErrors>({});
	const [isLoading, setIsLoading] = useState(false);
	const [profileImage, setProfileImage] = useState<string | null>(null);

	// City autocomplete state
	const [cityInput, setCityInput] = useState("");
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [filteredCities, setFilteredCities] = useState(POPULAR_CITIES.slice(0, 8));
	const [selectedCity, setSelectedCity] = useState<(typeof POPULAR_CITIES)[0] | null>(null);

	const stepLabels = ["Profile Setup", "Verification", "Property Setup", "Complete"];
	const completedSteps = [true, false, false, false];

	// Filter cities based on input
	useEffect(() => {
		if (cityInput.length > 0) {
			const filtered = POPULAR_CITIES.filter(
				(city) =>
					city.name.toLowerCase().includes(cityInput.toLowerCase()) ||
					city.country.toLowerCase().includes(cityInput.toLowerCase())
			).slice(0, 6);
			setFilteredCities(filtered);
			setShowSuggestions(true);
		} else {
			setFilteredCities(POPULAR_CITIES.slice(0, 8));
			setShowSuggestions(false);
		}
	}, [cityInput]);

	const handleCitySelect = (city: (typeof POPULAR_CITIES)[0]) => {
		setSelectedCity(city);
		setCityInput(city.name);
		setFormData((prev) => ({
			...prev,
			location: { city: city.name, country: city.country },
		}));
		setShowSuggestions(false);
		if (errors.city) {
			setErrors((prev) => ({ ...prev, city: "" }));
		}
	};

	const handleCityInputChange = (value: string) => {
		setCityInput(value);
		setSelectedCity(null);
		setFormData((prev) => ({
			...prev,
			location: { city: value, country: "" },
		}));
	};

	const handleLanguageToggle = (language: string) => {
		const newLanguages = formData.languages.includes(language)
			? formData.languages.filter((lang) => lang !== language)
			: [...formData.languages, language];

		setFormData((prev) => ({ ...prev, languages: newLanguages }));
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setProfileImage(reader.result as string);
			};
			reader.readAsDataURL(file);
			setFormData((prev) => ({ ...prev, profilePhoto: file }));
		}
	};

	const validateSimplifiedForm = (): ValidationErrors => {
		const errors: ValidationErrors = {};

		if (!formData.location.city) {
			errors.city = "Please select your city";
		}

		if (formData.languages.length === 0) {
			errors.languages = "Please select at least one language";
		}

		return errors;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const validationErrors = validateSimplifiedForm();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		setIsLoading(true);
		try {
			console.log("Profile setup data:", formData);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			router.push("/auth/onboarding/step-2");
		} catch (error) {
			console.error("Profile setup error:", error);
			setErrors({ general: "Something went wrong. Please try again." });
		} finally {
			setIsLoading(false);
		}
	};

	const handleBack = () => {
		router.push("/auth/signup");
	};

	// Quick language selection (most common for students)
	const popularLanguages = ["English", "Spanish", "French", "German", "Italian", "Portuguese"];

	return (
		<OnboardingLayout
			currentStep={1}
			totalSteps={4}
			completedSteps={completedSteps}
			stepLabels={stepLabels}
			title="Complete Your Profile"
			subtitle="Just a few quick details to get you started"
			onBack={handleBack}
		>
			<div className="max-w-xl mx-auto">
				<form onSubmit={handleSubmit} className="space-y-8">
					{errors.general && (
						<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
							<p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
						</div>
					)}

					{/* Profile Photo - Optional */}
					<div className="text-center">
						<div className="relative inline-block">
							<div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
								{profileImage ? (
									<Image
										src={profileImage}
										alt="Profile"
										width={96}
										height={96}
										className="w-full h-full object-cover"
									/>
								) : (
									<Camera className="w-6 h-6 text-gray-400" />
								)}
							</div>
							<label
								htmlFor="profile-photo"
								className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
							>
								<Camera className="w-3 h-3" />
							</label>
							<input
								id="profile-photo"
								type="file"
								accept="image/*"
								onChange={handleImageUpload}
								className="hidden"
							/>
						</div>
						<p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Add photo (optional)</p>
					</div>

					{/* City with Autocomplete */}
					<div className="relative">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Where are you located? <span className="text-red-500">*</span>
						</label>
						<div className="relative">
							<div className="absolute left-3 top-1/2 transform -translate-y-1/2">
								<MapPin className="h-4 w-4 text-gray-400" />
							</div>
							<input
								type="text"
								value={cityInput}
								onChange={(e) => handleCityInputChange(e.target.value)}
								onFocus={() => setShowSuggestions(true)}
								placeholder="Start typing your city..."
								className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
							/>
							{selectedCity && (
								<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
									<Check className="h-4 w-4 text-green-500" />
								</div>
							)}
						</div>

						{/* City Suggestions */}
						{showSuggestions && (
							<div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
								{filteredCities.length > 0 ? (
									filteredCities.map((city, index) => (
										<button
											key={index}
											type="button"
											onClick={() => handleCitySelect(city)}
											className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 transition-colors"
										>
											<span className="text-lg">{city.flag}</span>
											<div>
												<div className="font-medium text-gray-900 dark:text-white">{city.name}</div>
												<div className="text-sm text-gray-500 dark:text-gray-400">{city.country}</div>
											</div>
										</button>
									))
								) : (
									<div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">
										No cities found. You can still type your city name.
									</div>
								)}
							</div>
						)}

						{errors.city && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.city}</p>}
					</div>

					{/* Languages - Simplified */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
							Languages you speak <span className="text-red-500">*</span>
						</label>
						<div className="grid grid-cols-2 gap-3">
							{popularLanguages.map((language) => (
								<label
									key={language}
									className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
								>
									<input
										type="checkbox"
										checked={formData.languages.includes(language)}
										onChange={() => handleLanguageToggle(language)}
										className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
									/>
									<span className="text-sm text-gray-700 dark:text-gray-300">{language}</span>
								</label>
							))}
						</div>
						{errors.languages && (
							<p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.languages}</p>
						)}
					</div>

					{/* About Me - Optional and smaller */}
					<FormField
						label="Tell us about yourself (optional)"
						name="bio"
						type="textarea"
						value={formData.bio}
						onChange={(value) => setFormData((prev) => ({ ...prev, bio: value }))}
						placeholder="What kind of traveler are you? What do you study? Any hobbies?"
						hint="Help others get to know you better"
					/>

					{/* Submit Button */}
					<div className="flex justify-end pt-4">
						<button
							type="submit"
							disabled={isLoading}
							className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
						>
							{isLoading ? (
								<div className="flex items-center">
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
									Saving...
								</div>
							) : (
								"Continue to Verification"
							)}
						</button>
					</div>
				</form>
			</div>
		</OnboardingLayout>
	);
}
