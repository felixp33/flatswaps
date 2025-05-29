// src/app/auth/forgot-password/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import FormField from "@/components/auth/FormField";
import { validateEmail } from "@/lib/auth/validation";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const emailError = validateEmail(email);
		if (emailError) {
			setError(emailError);
			return;
		}

		setIsLoading(true);
		setError("");

		try {
			// TODO: Implement actual password reset
			console.log("Password reset for:", email);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setIsSuccess(true);
		} catch (error) {
			console.error("Password reset error:", error);
			setError("Failed to send reset email. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	if (isSuccess) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
						<div className="text-center">
							<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
								<CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
							</div>
							<h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">Check your email</h2>
							<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
								We've sent a password reset link to
							</p>
							<p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">{email}</p>
							<p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
								Didn't receive the email? Check your spam folder or{" "}
								<button
									onClick={() => setIsSuccess(false)}
									className="font-medium text-blue-600 hover:text-blue-500"
								>
									try again
								</button>
							</p>
						</div>

						<div className="mt-8">
							<Link
								href="/auth/signin"
								className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								<ArrowLeft className="w-4 h-4 mr-2" />
								Back to Sign In
							</Link>
						</div>
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
					<span className="text-3xl font-bold text-blue-600">flatswaps</span>
				</Link>

				{/* Header */}
				<div className="mt-6 text-center">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white">Forgot your password?</h2>
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
						No worries! Enter your email and we'll send you a reset link.
					</p>
				</div>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="text-center mb-6">
							<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900">
								<Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
							</div>
						</div>

						<FormField
							label="Email Address"
							name="email"
							type="email"
							value={email}
							onChange={setEmail}
							error={error}
							placeholder="Enter your email address"
							required
							autoComplete="email"
						/>

						<button
							type="submit"
							disabled={isLoading}
							className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							{isLoading ? (
								<div className="flex items-center">
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
									Sending reset link...
								</div>
							) : (
								"Send Reset Link"
							)}
						</button>
					</form>

					<div className="mt-6">
						<Link
							href="/auth/signin"
							className="w-full flex justify-center items-center py-2 px-4 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
						>
							<ArrowLeft className="w-4 h-4 mr-2" />
							Back to Sign In
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
