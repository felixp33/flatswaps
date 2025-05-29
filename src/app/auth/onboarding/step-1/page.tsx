// src/app/auth/onboarding/step-1/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, MapPin, Globe } from "lucide-react";
import OnboardingLayout from "@/components/auth/OnboardingLayout";
import FormField from "@/components/auth/FormField";
import { validateProfileForm } from "@/lib/auth/validation";
import { ProfileSetupData, ValidationErrors } from "@/types/auth";

export default function OnboardingStep1() {
	const router = useRouter();
	const [formData, setFormData] = useState<ProfileSetupData>({
		location: { city: "", country: "" },
		bio: "",
		languages: [],
		contactMethod: "both",
	});
	const [errors, setErrors] = useState<ValidationErrors>({});
	const [isLoading, setIsLoading] = useState(false);
	const [profileImage, setProfileImage] = useState<string | null>(null);

	const stepLabels = ["Profile Setup", "Verification", "Property Setup", "Complete"];
	const completedSteps = [false, false, false, false];

	// Common languages for selection
	const availableLanguages = [
		"English",
		"Spanish",
		"French",
		"German",
		"Italian",
		"Portuguese",
		"Dutch",
		"Russian",
		"Chinese",
		"Japanese",
		"Korean",
		"Arabic",
	];

	// Common countries for quick selection
	const popularCountries = [
		"United States",
		"United Kingdom",
		"Germany",
		"France",
		"Spain",
		"Italy",
		"Netherlands",
		"Canada",
		"Australia",
		"Japan",
	];

	const handleInputChange = (field: string, value: any) => {
		if (field.includes(".")) {
			const [parent, child] = field.split(".");
			setFormData((prev) => ({
				...prev,
				[parent]: { ...prev[parent as keyof ProfileSetupData], [child]: value },
			}));
		} else {
			setFormData((prev) => ({ ...prev, [field]: value }));
		}

		// Clear errors
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const handleLanguageToggle = (language: string) => {
		const newLanguages = formData.languages.includes(language)
			? formData.languages.filter((lang) => lang !== language)
			: [...formData.languages, language];

		setFormData((prev) => ({ ...prev, languages: newLanguages }));
		if (errors.languages) {
			setErrors((prev) => ({ ...prev, languages: "" }));
		}
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const validationErrors = validateProfileForm(formData);
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		setIsLoading(true);
		try {
			// TODO: Save profile data
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

	return (
		<OnboardingLayout
			currentStep={1}
			totalSteps={4}
			completedSteps={completedSteps}
			stepLabels={stepLabels}
			title="Complete Your Profile"
			subtitle="Tell us about yourself to help find better swap matches"
			onBack={handleBack}
		>
			<div className="max-w-2xl mx-auto">
				<form onSubmit={handleSubmit} className="space-y-8">
					{errors.general && (
						<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
							<p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
						</div>
					)}

					{/* Profile Photo */}
					<div className="text-center">
						<div className="relative inline-block">
							<div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
								{profileImage ? (
									<img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
								) : (
									<Camera className="w-8 h-8 text-gray-400" />
								)}
							</div>
							<label
								htmlFor="profile-photo"
								className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
							>
								<Camera className="w-4 h-4" />
							</label>
							<input
								id="profile-photo"
								type="file"
								accept="image/*"
								onChange={handleImageUpload}
								className="hidden"
							/>
						</div>
						<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Upload a profile photo (optional)</p>
					</div>

					{/* Location */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<FormField
								label="City"
								name="location.city"
								value={formData.location.city}
								onChange={(value) => handleInputChange("location.city", value)}
								error={errors.city}
								placeholder="e.g., Berlin"
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Country <span className="text-red-500">*</span>
							</label>
							<select
								value={formData.location.country}
								onChange={(e) => handleInputChange("location.country", e.target.value)}
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
							>
								<option value="">Select your country</option>
								{popularCountries.map((country) => (
									<option key={country} value={country}>
										{country}
									</option>
								))}
							</select>
							{errors.country && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.country}</p>}
						</div>
					</div>

					{/* Bio */}
					<FormField
						label="About Me"
						name="bio"
						type="textarea"
						value={formData.bio}
						onChange={(value) => handleInputChange("bio", value)}
						error={errors.bio}
						placeholder="Tell potential swap partners about yourself, your interests, and what makes you a great home swapper..."
						hint="This helps other members get to know you better (max 500 characters)"
					/>

					{/* Languages */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
							Languages I Speak <span className="text-red-500">*</span>
						</label>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
							{availableLanguages.map((language) => (
								<label key={language} className="flex items-center space-x-2 cursor-pointer">
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

					{/* Contact Preference */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
							Preferred Contact Method
						</label>
						<div className="space-y-2">
							{[
								{ value: "email", label: "Email only" },
								{ value: "phone", label: "Phone only" },
								{ value: "both", label: "Both email and phone" },
							].map((option) => (
								<label key={option.value} className="flex items-center space-x-2 cursor-pointer">
									<input
										type="radio"
										name="contactMethod"
										value={option.value}
										checked={formData.contactMethod === option.value}
										onChange={(e) => handleInputChange("contactMethod", e.target.value)}
										className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
									/>
									<span className="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
								</label>
							))}
						</div>
					</div>

					{/* Submit Button */}
					<div className="flex justify-end">
						<button
							type="submit"
							disabled={isLoading}
							className="px-8 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
