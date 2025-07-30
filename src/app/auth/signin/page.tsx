// src/app/auth/signin/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import SocialLogin from "@/components/auth/SocialLogin";
import FormField from "@/components/auth/FormField";
import { validateEmail } from "@/lib/auth/validation";
import { ValidationErrors } from "@/types/auth";
import { useAuth } from "@/contexts/AuthContext";

export default function SignInPage() {
        const { signIn, signInWithProvider } = useAuth();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		rememberMe: false,
	});
	const [errors, setErrors] = useState<ValidationErrors>({});
	const [isLoading, setIsLoading] = useState(false);

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

		if (!formData.password) errors.password = "Password is required";

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
                try {
                        const { error } = await signIn(formData.email, formData.password);
                        if (error) {
                                setErrors({ general: "Invalid email or password. Please try again." });
                        }
                } catch (error) {
                        console.error("Sign in error:", error);
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
					<span className="text-3xl font-bold text-blue-600">Flatswaps</span>
				</Link>

				{/* Header */}
				<div className="mt-6 text-center">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Sign in to your account to continue</p>
				</div>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
					{/* Social Login */}
					<SocialLogin onSocialLogin={handleSocialLogin} isLoading={isLoading} />

					{/* Sign In Form */}
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

						<FormField
							label="Password"
							name="password"
							type="password"
							value={formData.password}
							onChange={(value) => handleInputChange("password", value)}
							error={errors.password}
							placeholder="Enter your password"
							required
							autoComplete="current-password"
						/>

						{/* Remember Me & Forgot Password */}
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="rememberMe"
									name="rememberMe"
									type="checkbox"
									checked={formData.rememberMe}
									onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
									className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
								/>
								<label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-600 dark:text-gray-300">
									Remember me
								</label>
							</div>

                                                        <div className="text-sm flex flex-col items-end">
                                                                <Link href="/auth/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                                                                        Forgot your password?
                                                                </Link>
                                                                <Link href="/auth/reset-password" className="font-medium text-blue-600 hover:text-blue-500 mt-1">
                                                                        Reset password
                                                                </Link>
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
									Signing in...
								</div>
							) : (
								"Sign In"
							)}
						</button>
					</form>

					{/* Sign Up Link */}
					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Don't have an account?{" "}
							<Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
								Sign up for free
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
