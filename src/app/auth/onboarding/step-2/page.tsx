// src/app/auth/onboarding/step-2/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Check } from "lucide-react";
import OnboardingLayout from "@/components/auth/OnboardingLayout";
import FormField from "@/components/auth/FormField";
import { validateVerificationCode } from "@/lib/auth/validation";
import { VerificationData, ValidationErrors } from "@/types/auth";

export default function OnboardingStep2() {
	const router = useRouter();
        const [formData, setFormData] = useState<VerificationData>({
                emailCode: "",
        });
	const [errors, setErrors] = useState<ValidationErrors>({});
	const [isLoading, setIsLoading] = useState(false);
        const [verificationStates, setVerificationStates] = useState({
                email: { sent: false, verified: false, resending: false },
        });
	const [countdown, setCountdown] = useState(0);

	const stepLabels = ["Profile Setup", "Verification", "Property Setup", "Complete"];
	const completedSteps = [true, false, false, false];

	// Countdown timer for resend buttons
	useEffect(() => {
		if (countdown > 0) {
			const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
			return () => clearTimeout(timer);
		}
	}, [countdown]);

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const sendEmailVerification = async () => {
		setVerificationStates((prev) => ({
			...prev,
			email: { ...prev.email, resending: true },
		}));

		try {
			// TODO: Implement actual email verification
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setVerificationStates((prev) => ({
				...prev,
				email: { sent: true, verified: false, resending: false },
			}));
			setCountdown(60);
		} catch (error) {
			setErrors({ email: "Failed to send verification email" });
		}
	};

	const verifyEmailCode = async () => {
		const codeError = validateVerificationCode(formData.emailCode || "");
		if (codeError) {
			setErrors({ emailCode: codeError });
			return;
		}

		setIsLoading(true);
		try {
			// TODO: Implement actual email verification
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setVerificationStates((prev) => ({
				...prev,
				email: { ...prev.email, verified: true },
			}));
		} catch (error) {
			setErrors({ emailCode: "Invalid verification code" });
		} finally {
			setIsLoading(false);
		}
	};


	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Email verification is required
		if (!verificationStates.email.verified) {
			setErrors({ general: "Please verify your email address to continue" });
			return;
		}

		setIsLoading(true);
		try {
			// TODO: Save verification data
			console.log("Verification data:", formData);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			router.push("/auth/onboarding/step-3");
		} catch (error) {
			console.error("Verification error:", error);
			setErrors({ general: "Something went wrong. Please try again." });
		} finally {
			setIsLoading(false);
		}
	};

	const handleBack = () => {
		router.push("/auth/onboarding/step-1");
	};

	const handleSkip = () => {
		router.push("/auth/onboarding/step-3");
	};

	return (
		<OnboardingLayout
			currentStep={2}
			totalSteps={4}
			completedSteps={completedSteps}
			stepLabels={stepLabels}
			title="Verify Your Account"
			subtitle="Help us keep Flatswaps safe and secure for everyone"
			onBack={handleBack}
		>
			<div className="max-w-2xl mx-auto">
				<form onSubmit={handleSubmit} className="space-y-8">
					{errors.general && (
						<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
							<p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
						</div>
					)}

					{/* Email Verification - Required */}
					<div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
						<div className="flex items-center mb-4">
							<div
								className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
									verificationStates.email.verified
										? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
										: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
								}`}
							>
								{verificationStates.email.verified ? (
									<Check className="w-5 h-5" />
								) : (
									<Mail className="w-5 h-5" />
								)}
							</div>
							<div className="flex-1">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
									Email Verification
									<span className="ml-2 text-sm text-red-500">Required</span>
								</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Verify your email address to secure your account
								</p>
							</div>
							{verificationStates.email.verified && (
								<div className="text-green-600 dark:text-green-400">
									<Check className="w-6 h-6" />
								</div>
							)}
						</div>

						{!verificationStates.email.verified && (
							<div className="space-y-4">
								{!verificationStates.email.sent ? (
									<button
										type="button"
										onClick={sendEmailVerification}
										disabled={verificationStates.email.resending}
										className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
									>
										{verificationStates.email.resending ? "Sending..." : "Send Verification Email"}
									</button>
								) : (
									<div className="space-y-4">
										<p className="text-sm text-gray-600 dark:text-gray-400">
											We've sent a verification code to your email. Please enter it below:
										</p>
										<div className="flex space-x-4">
											<FormField
												label=""
												name="emailCode"
												value={formData.emailCode || ""}
												onChange={(value) => handleInputChange("emailCode", value)}
												error={errors.emailCode}
												placeholder="Enter 6-digit code"
											/>
											<button
												type="button"
												onClick={verifyEmailCode}
												disabled={isLoading}
												className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
											>
												Verify
											</button>
										</div>
										<button
											type="button"
											onClick={sendEmailVerification}
											disabled={countdown > 0 || verificationStates.email.resending}
											className="text-sm text-blue-600 hover:text-blue-500 disabled:text-gray-400"
										>
											{countdown > 0 ? `Resend in ${countdown}s` : "Resend Code"}
										</button>
									</div>
								)}
							</div>
						)}
					</div>

                                        {/* Action Buttons */}
                                        <div className="flex justify-between">
                                                <button
							type="button"
							onClick={handleSkip}
							className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
						>
							Skip for now
						</button>
						<button
							type="submit"
							disabled={isLoading || !verificationStates.email.verified}
							className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? (
								<div className="flex items-center">
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
									Processing...
								</div>
							) : (
								"Continue to Property Setup"
							)}
						</button>
					</div>
				</form>
			</div>
		</OnboardingLayout>
	);
}
