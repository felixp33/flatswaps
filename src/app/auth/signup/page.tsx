// src/app/auth/signup/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import SocialLogin from "@/components/auth/SocialLogin";
import FormField from "@/components/auth/FormField";
import PasswordStrength from "@/components/auth/PasswordStrength";
import { validateEmail, validatePassword } from "@/lib/auth/validation";
import { ValidationErrors } from "@/types/auth";

export default function SignUpPage() {
        const { signUp, signInWithProvider } = useAuth();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		acceptTerms: false,
	});
	const [errors, setErrors] = useState<ValidationErrors>({});
	const [isLoading, setIsLoading] = useState(false);
	const [showPasswordStrength, setShowPasswordStrength] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleInputChange = (field: string, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

        const handleSocialLogin = async (provider: string) => {
                setIsLoading(true);
                try {
                        const { error } = await signInWithProvider(provider as 'google');
                        if (error) {
                                console.error('Social login error:', error);
                                setErrors({ general: 'Authentication failed. Please try again.' });
                        }
                } finally {
                        setIsLoading(false);
                }
        };

	const validateForm = (): ValidationErrors => {
		const errors: ValidationErrors = {};

		const emailError = validateEmail(formData.email);
		if (emailError) errors.email = emailError;

		const passwordError = validatePassword(formData.password);
		if (passwordError) errors.password = passwordError;

		// Full name is optional, so no validation needed

		if (!formData.acceptTerms) {
			errors.acceptTerms = "You must accept the terms and conditions";
		}

		return errors;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const validationErrors = validateForm();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		setIsLoading(true);
		setErrors({});

		try {
			const { error } = await signUp(formData.email, formData.password);

			if (error) {
				// Handle specific Supabase errors
				if (error.message.includes("User already registered")) {
					setErrors({ email: "An account with this email already exists" });
				} else if (error.message.includes("Password should be at least")) {
					setErrors({ password: "Password should be at least 6 characters" });
				} else if (error.message.includes("Invalid email")) {
					setErrors({ email: "Please enter a valid email address" });
				} else {
					setErrors({ general: error.message });
				}
			} else {
				setSuccess(true);
			}
		} catch (error) {
			console.error("Sign up error:", error);
			setErrors({ general: "Something went wrong. Please try again." });
		} finally {
			setIsLoading(false);
		}
	};

	// Success state
	if (success) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<Link href="/" className="flex justify-center">
						<span className="text-3xl font-bold text-blue-600">Flatswaps</span>
					</Link>

					<div className="mt-6 text-center">
						<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20">
							<svg
								className="h-6 w-6 text-green-600 dark:text-green-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
							</svg>
						</div>
						<h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Check your email</h2>
						<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
							We've sent a confirmation link to {formData.email}
						</p>
						<p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
							Click the link in the email to activate your account and complete your registration.
						</p>
					</div>

					<div className="mt-8 text-center">
						<Link
							href="/auth/signin"
							className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
						>
							Back to Sign In
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				{/* Logo */}
				<Link href="/" className="flex justify-center">
					<span className="text-3xl font-bold text-blue-600">Flatswaps</span>
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
