// src/app/auth/signup/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SocialLogin from "@/components/auth/SocialLogin";
import FormField from "@/components/auth/FormField";
import PasswordStrength from "@/components/auth/PasswordStrength";
import { validateSignUpForm } from "@/lib/auth/validation";
import { SignUpData, ValidationErrors } from "@/types/auth";

export default function SignUpPage() {
	const router = useRouter();
	const [formData, setFormData] = useState<SignUpData>({
		fullName: "",
		email: "",
		password: "",
		acceptTerms: false,
	});
	const [errors, setErrors] = useState<ValidationErrors>({});
	const [isLoading, setIsLoading] = useState(false);
	const [showPasswordStrength, setShowPasswordStrength] = useState(false);

	const handleInputChange = (field: keyof SignUpData, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const handleSocialLogin = async (provider: string) => {
		console.log(`Social login with ${provider}`);
		// TODO: Implement social login
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const validationErrors = validateSignUpForm(formData);
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		setIsLoading(true);
		try {
			// TODO: Implement actual signup
			console.log("Sign up with:", formData);
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			router.push("/auth/onboarding/step-1");
		} catch (error) {
			console.error("Sign up error:", error);
			setErrors({ general: "Something went wrong. Please try again." });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				{/* Logo */}
				<Link href="/" className="flex justify-center">
					<span className="text-3xl font-bold text-blue-600">flatswaps</span>
				</Link>

				{/* Header */}
				<div className="mt-6 text-center">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create your account</h2>
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
						Join thousands of home swappers worldwide
					</p>
				</div>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
					{/* Social Login */}
					<SocialLogin onSocialLogin={handleSocialLogin} isLoading={isLoading} />

					{/* Sign Up Form */}
					<form onSubmit={handleSubmit} className="space-y-6">
						{errors.general && (
							<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
								<p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
							</div>
						)}

						<FormField
							label="Full Name"
							name="fullName"
							type="text"
							value={formData.fullName}
							onChange={(value) => handleInputChange("fullName", value)}
							error={errors.fullName}
							placeholder="Enter your full name"
							required
							autoComplete="name"
						/>

						<FormField
							label="Email Address"
							name="email"
							type="email"
							value={formData.email}
							onChange={(value) => handleInputChange("email", value)}
							error={errors.email}
							placeholder="Enter your email address"
							required
							autoComplete="email"
						/>

						<div>
							<FormField
								label="Password"
								name="password"
								type="password"
								value={formData.password}
								onChange={(value) => handleInputChange("password", value)}
								onFocus={() => setShowPasswordStrength(true)}
								error={errors.password}
								placeholder="Create a strong password"
								required
								autoComplete="new-password"
							/>
							<PasswordStrength password={formData.password} show={showPasswordStrength} />
						</div>

						{/* Terms and Conditions */}
						<div className="flex items-start">
							<div className="flex items-center h-5">
								<input
									id="acceptTerms"
									name="acceptTerms"
									type="checkbox"
									checked={formData.acceptTerms}
									onChange={(e) => handleInputChange("acceptTerms", e.target.checked)}
									className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
								/>
							</div>
							<div className="ml-3 text-sm">
								<label htmlFor="acceptTerms" className="text-gray-600 dark:text-gray-300">
									I agree to the{" "}
									<Link href="/terms" className="text-blue-600 hover:text-blue-500">
										Terms of Service
									</Link>{" "}
									and{" "}
									<Link href="/privacy" className="text-blue-600 hover:text-blue-500">
										Privacy Policy
									</Link>
								</label>
								{errors.acceptTerms && (
									<p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.acceptTerms}</p>
								)}
							</div>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={isLoading}
							className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							{isLoading ? (
								<div className="flex items-center">
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
									Creating account...
								</div>
							) : (
								"Create Account"
							)}
						</button>
					</form>

					{/* Sign In Link */}
					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Already have an account?{" "}
							<Link href="/auth/signin" className="font-medium text-blue-600 hover:text-blue-500">
								Sign in
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
