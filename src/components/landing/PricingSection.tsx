"use client";
import React, { useState } from "react";
import { Check, Shield, Heart, Star, ArrowRight, Zap, Info, X } from "lucide-react";

export default function PricingSection() {
	const [showTooltip, setShowTooltip] = useState<number | null>(null);

	const toggleTooltip = (index: number) => {
		setShowTooltip(showTooltip === index ? null : index);
	};

	return (
		<section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-medium rounded-full mb-4">
						<Heart className="w-4 h-4 mr-2" />
						Free Forever - No Hidden Costs
					</div>
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
						Start Swapping for <span className="text-green-600">Free</span>
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
						Find your perfect home swap completely free. When you've found your match, you can optionally add
						SwapSecure protection for ultimate peace of mind.
					</p>
				</div>

				{/* Pricing Cards */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
					{/* Free Plan */}
					<div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
						<div className="text-center mb-8">
							<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Free Forever</h3>
							<div className="mb-4">
								<span className="text-5xl font-bold text-gray-900 dark:text-white">€0</span>
								<span className="text-gray-500 dark:text-gray-400 ml-2">always</span>
							</div>
							<p className="text-gray-600 dark:text-gray-300">Everything you need to start swapping homes</p>
						</div>

						<div className="space-y-4 mb-8">
							<div className="flex items-start">
								<Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
								<span className="text-gray-900 dark:text-white font-medium">Unlimited home swaps</span>
							</div>
							<div className="flex items-start">
								<Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
								<span className="text-gray-900 dark:text-white font-medium">Profile verification</span>
							</div>
							<div className="flex items-start">
								<Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
								<span className="text-gray-900 dark:text-white font-medium">Secure messaging</span>
							</div>
							<div className="flex items-start">
								<Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
								<span className="text-gray-900 dark:text-white font-medium">Basic contract templates</span>
							</div>
							<div className="flex items-start">
								<Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
								<span className="text-gray-900 dark:text-white font-medium">Community support</span>
							</div>
						</div>

						<button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center">
							Start Swapping Free
							<ArrowRight className="w-5 h-5 ml-2" />
						</button>
					</div>

					{/* SwapSecure Plan */}
					<div className="relative bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl shadow-2xl border-2 border-blue-500 p-8 text-white transform hover:scale-105 transition-all duration-300">
						<div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
								🛡️ PREMIUM PROTECTION
							</div>
						</div>

						<div className="text-center mb-8 mt-4">
							<h3 className="text-2xl font-bold mb-2">SwapSecure</h3>
							<div className="mb-4">
								<span className="text-5xl font-bold">from €12.99</span>
								<span className="text-blue-200 ml-2">/month</span>
							</div>
							<p className="text-blue-100">Optional protection when you find your swap match</p>
						</div>

						<div className="space-y-4 mb-8">
							<div className="flex items-start">
								<Check className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
								<span className="font-medium">Everything in Free Plan</span>
							</div>

							<div className="flex items-start">
								<Shield className="w-5 h-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
								<div className="flex items-start">
									<div className="flex-1">
										<span className="font-medium">Rent Insurance Protection</span>
									</div>
									<button
										onClick={() => toggleTooltip(1)}
										className="ml-2 text-blue-200 hover:text-white transition-colors"
									>
										<Info className="w-4 h-4" />
									</button>
								</div>
							</div>

							{showTooltip === 1 && (
								<div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 relative">
									<button
										onClick={() => setShowTooltip(null)}
										className="absolute top-2 right-2 text-white hover:text-gray-200"
									>
										<X className="w-4 h-4" />
									</button>
									<p className="text-sm text-blue-100 pr-6">
										If your swap partner suddenly stops paying their rent (your original place), we'll cover
										the costs so you're not left with financial burden. This protects you from the biggest
										risk in home swapping.
									</p>
								</div>
							)}

							<div className="flex items-start">
								<Shield className="w-5 h-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
								<span className="font-medium">Property Damage Insurance</span>
							</div>

							<div className="flex items-start">
								<Check className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
								<span className="font-medium">Advanced Contract Templates</span>
							</div>
						</div>

						<button className="w-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center">
							<div className="flex items-center">
								<Info className="w-5 h-5 mr-2" />
								Learn More About SwapSecure
							</div>
						</button>
					</div>
				</div>

				{/* Additional Info */}
				<div className="mt-16 text-center">
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
						<div className="flex items-center justify-center mb-4">
							<Zap className="w-6 h-6 text-blue-600 mr-2" />
							<h3 className="text-xl font-bold text-gray-900 dark:text-white">Why Choose SwapSecure?</h3>
						</div>
						<p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
							Home swapping is built on trust, and our free service connects you with verified members. When
							you've found your perfect match and are ready to proceed, SwapSecure offers comprehensive
							protection for those who want complete peace of mind during their swap.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
