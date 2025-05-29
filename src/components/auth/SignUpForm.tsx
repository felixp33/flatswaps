// src/components/auth/SignUpForm.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import FormField from "./FormField";
import SocialLogin from "./SocialLogin";
import PasswordStrength from "./PasswordStrength";
import { validateSignUpForm } from "@/lib/auth/validation";
import { SignUpData, ValidationErrors } from "@/types/auth";

interface SignUpFormProps {
	onSubmit: (data: SignUpData) => Promise<void>;
	onSocialLogin: (provider: string) => Promise<void>;
	isLoading?: boolean;
	error?: string;
}

export default function SignUpForm({ onSubmit, onSocialLogin, isLoading = false, error }: SignUpFormProps) {
	const [formData, setFormData] = useState<SignUpData>({
		fullName: "",
		email: "",
		password: "",
		acceptTerms: false,
	});
	const [errors, setErrors] = useState<ValidationErrors>({});
	const [showPasswordStrength, setShowPasswordStrength] = useState(false);

	const handleInputChange = (field: keyof SignUpData, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const validationErrors = validateSignUpForm(formData);
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		try {
			await onSubmit(formData);
		} catch (error) {
			// Error handling is done by parent component
		}
	};

	return (
		<div className="w-full max-w-md mx-auto">
			{/* Header */}
			<div className="text-center mb-8">
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create your account</h2>
				<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Join thousands of home swappers worldwide</p>
			</div>

			<div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
				{/* Social Login */}
				<SocialLogin onSocialLogin={onSocialLogin} isLoading={isLoading} />

				{/* Sign Up Form */}
				<form onSubmit={handleSubmit} className="space-y-6">
					{error && (
						<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
							<p className="text-sm text-red-600 dark:text-red-400">{error}</p>
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
						hint="Please enter your first and last name"
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
						hint="We'll use this to verify your account"
					/>

					<div>
						<FormField
							label="Password"
							name="password"
							type="password"
							value={formData.password}
							onChange={(value) => handleInputChange("password", value)}
							error={errors.password}
							placeholder="Create a strong password"
							required
							autoComplete="new-password"
							onFocus={() => setShowPasswordStrength(true)}
						/>
						<PasswordStrength
							password={formData.password}
							show={showPasswordStrength && formData.password.length > 0}
						/>
					</div>

					{/* Terms and Conditions */}
					<div className="space-y-4">
						<div className="flex items-start">
							<div className="flex items-center h-5">
								<input
									id="acceptTerms"
									name="acceptTerms"
									type="checkbox"
									checked={formData.acceptTerms}
									onChange={(e) => handleInputChange("acceptTerms", e.target.checked)}
									className={`focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded ${
										errors.acceptTerms ? "border-red-300" : ""
									}`}
								/>
							</div>
							<div className="ml-3 text-sm">
								<label htmlFor="acceptTerms" className="text-gray-600 dark:text-gray-300">
									I agree to the{" "}
									<Link href="/terms" className="text-blue-600 hover:text-blue-500 underline">
										Terms of Service
									</Link>{" "}
									and{" "}
									<Link href="/privacy" className="text-blue-600 hover:text-blue-500 underline">
										Privacy Policy
									</Link>
								</label>
								{errors.acceptTerms && (
									<p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.acceptTerms}</p>
								)}
							</div>
						</div>

						{/* Additional Info */}
						<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
							<div className="flex">
								<div className="flex-shrink-0">
									<svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
										<path
											fillRule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<div className="ml-3">
									<p className="text-sm text-blue-700 dark:text-blue-300">
										<strong>Your privacy matters:</strong> We'll never share your personal information or spam
										you. You can unsubscribe from marketing emails at any time.
									</p>
								</div>
							</div>
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
	);
}
