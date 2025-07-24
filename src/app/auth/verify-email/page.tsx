// src/app/auth/verify-email/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, CheckCircle, XCircle, RefreshCw } from "lucide-react";

function VerifyEmailContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [status, setStatus] = useState<"loading" | "success" | "error" | "expired">("loading");
	const [email, setEmail] = useState(searchParams.get("email") || "");
	const [isResending, setIsResending] = useState(false);

	useEffect(() => {
		const token = searchParams.get("token");
		if (token) {
			verifyEmail(token);
		} else {
			setStatus("error");
		}
	}, [searchParams]);

	const verifyEmail = async (token: string) => {
		try {
			// TODO: Implement actual email verification
			console.log("Verifying email with token:", token);
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Simulate different outcomes based on token
			if (token === "expired") {
				setStatus("expired");
			} else if (token === "invalid") {
				setStatus("error");
			} else {
				setStatus("success");
			}
		} catch (error) {
			console.error("Email verification error:", error);
			setStatus("error");
		}
	};

	const resendVerificationEmail = async () => {
		if (!email) return;

		setIsResending(true);
		try {
			// TODO: Implement actual resend verification
			console.log("Resending verification to:", email);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			// You could show a success message here
		} catch (error) {
			console.error("Resend verification error:", error);
		} finally {
			setIsResending(false);
		}
	};

	const handleContinue = () => {
		router.push("/auth/onboarding/step-1");
	};

	const renderContent = () => {
		switch (status) {
			case "loading":
				return (
					<div className="text-center">
						<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-6">
							<RefreshCw className="h-6 w-6 text-blue-600 dark:text-blue-400 animate-spin" />
						</div>
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Verifying your email...</h2>
						<p className="text-gray-600 dark:text-gray-400">Please wait while we verify your email address.</p>
					</div>
				);

			case "success":
				return (
					<div className="text-center">
						<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-6">
							<CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
						</div>
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
							Email verified successfully!
						</h2>
						<p className="text-gray-600 dark:text-gray-400 mb-8">
							Great! Your email has been verified. You can now complete your profile setup.
						</p>
						<button
							onClick={handleContinue}
							className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							Continue Setup
						</button>
					</div>
				);

			case "expired":
				return (
					<div className="text-center">
						<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900 mb-6">
							<XCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
						</div>
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Verification link expired</h2>
						<p className="text-gray-600 dark:text-gray-400 mb-8">
							This verification link has expired. We can send you a new one.
						</p>
						{email && (
							<div className="space-y-4">
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Send new verification email to: <strong>{email}</strong>
								</p>
								<button
									onClick={resendVerificationEmail}
									disabled={isResending}
									className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
								>
									{isResending ? (
										<div className="flex items-center">
											<RefreshCw className="w-4 h-4 mr-2 animate-spin" />
											Sending...
										</div>
									) : (
										"Send New Verification Email"
									)}
								</button>
							</div>
						)}
					</div>
				);

			case "error":
			default:
				return (
					<div className="text-center">
						<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-6">
							<XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
						</div>
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Verification failed</h2>
						<p className="text-gray-600 dark:text-gray-400 mb-8">
							We couldn&apos;t verify your email address. The link may be invalid or expired.
						</p>
						<div className="space-y-4">
							{email && (
								<>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Send new verification email to: <strong>{email}</strong>
									</p>
									<button
										onClick={resendVerificationEmail}
										disabled={isResending}
										className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 mb-4"
									>
										{isResending ? (
											<div className="flex items-center">
												<RefreshCw className="w-4 h-4 mr-2 animate-spin" />
												Sending...
											</div>
										) : (
											"Send New Verification Email"
										)}
									</button>
								</>
							)}
							<Link
								href="/auth/signin"
								className="w-full flex justify-center py-2 px-4 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
							>
								Back to Sign In
							</Link>
						</div>
					</div>
				);
		}
	};

	return renderContent();
}

function LoadingFallback() {
	return (
		<div className="text-center">
			<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-6">
				<RefreshCw className="h-6 w-6 text-blue-600 dark:text-blue-400 animate-spin" />
			</div>
			<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Loading...</h2>
			<p className="text-gray-600 dark:text-gray-400">Please wait while we load the verification page.</p>
		</div>
	);
}

export default function VerifyEmailPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				{/* Logo */}
				<Link href="/" className="flex justify-center mb-8">
					<span className="text-3xl font-bold text-blue-600">Flatswaps</span>
				</Link>

				<div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
					<Suspense fallback={<LoadingFallback />}>
						<VerifyEmailContent />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
