"use client";
import React, { useState } from "react";
import { Check, Shield, Heart, Star, ArrowRight, Zap, Info, X, Search, Users } from "lucide-react";

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
						Free to Search - 100% Scam Protection
					</div>
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
						Simple, <span className="text-green-600">Fair</span> Pricing
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
						Search and find your perfect home swap completely free. Pay only when you've found your match to
						activate 100% scam protection and comprehensive insurance coverage.
					</p>
				</div>

				{/* Pricing Cards */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
					{/* Free Search Phase */}
					<div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
						<div className="text-center mb-8">
							<div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
								<Search className="w-8 h-8 text-green-600" />
							</div>
							<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Search & Match</h3>
							<div className="mb-4">
								<span className="text-5xl font-bold text-gray-900 dark:text-white">€0</span>
								<span className="text-gray-500 dark:text-gray-400 ml-2">always</span>
							</div>
							<p className="text-gray-600 dark:text-gray-300">Find your perfect swap partner for free</p>
						</div>

						<div className="space-y-4 mb-8">
							<div className="flex items-start">
								<Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
								<span className="text-gray-900 dark:text-white font-medium">Unlimited searches</span>
							</div>
							<div className="flex items-start">
								<Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
								<span className="text-gray-900 dark:text-white font-medium">Browse all available swaps</span>
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
								<span className="text-gray-900 dark:text-white font-medium">Connect with matches</span>
							</div>
						</div>

						<button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center">
							Start Searching Free
							<ArrowRight className="w-5 h-5 ml-2" />
						</button>
					</div>

					{/* Pay When You Swap */}
					<div className="relative bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl shadow-2xl border-2 border-blue-500 p-8 text-white transform hover:scale-105 transition-all duration-300">
						<div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
								🛡️ FULL PROTECTION INCLUDED
							</div>
						</div>

						<div className="text-center mb-8 mt-4">
							<div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
								<Users className="w-8 h-8 text-white" />
							</div>
							<h3 className="text-2xl font-bold mb-2">SwapSecure</h3>
							<div className="mb-4">
								<span className="text-4xl font-bold">4.5%</span>
								<span className="text-blue-200 ml-2">of monthly rent</span>
							</div>
							<p className="text-blue-100">Monthly SwapSecure protection fee</p>
						</div>

						<div className="space-y-4 mb-8">
							<div className="flex items-start">
								<Check className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
								<span className="font-medium">Everything in Search & Match</span>
							</div>

							<div className="flex items-start">
								<Shield className="w-5 h-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
								<div className="flex items-start">
									<div className="flex-1">
										<span className="font-medium">100% Scam Protection</span>
									</div>
									<button
										onClick={() => toggleTooltip(0)}
										className="ml-2 text-blue-200 hover:text-white transition-colors"
									>
										<Info className="w-4 h-4" />
									</button>
								</div>
							</div>

							{showTooltip === 0 && (
								<div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 relative">
									<button
										onClick={() => setShowTooltip(null)}
										className="absolute top-2 right-2 text-white hover:text-gray-200"
									>
										<X className="w-4 h-4" />
									</button>
									<p className="text-sm text-blue-100 pr-6">
										Complete protection against fraudulent listings, fake profiles, and any form of scamming.
										Our verification process and protection guarantee ensure your swap is 100% legitimate and
										safe.
									</p>
								</div>
							)}

							<div className="flex items-start">
								<Shield className="w-5 h-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
								<div className="flex items-start">
									<div className="flex-1">
										<span className="font-medium">Rent Default Insurance</span>
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
										Protection against rent defaults. If your swap partner stops paying rent on your original
										property, we'll cover the costs so you're not left with financial burden.
									</p>
								</div>
							)}

							<div className="flex items-start">
								<Shield className="w-5 h-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
								<div className="flex items-start">
									<div className="flex-1">
										<span className="font-medium">Liability Insurance</span>
									</div>
									<button
										onClick={() => toggleTooltip(2)}
										className="ml-2 text-blue-200 hover:text-white transition-colors"
									>
										<Info className="w-4 h-4" />
									</button>
								</div>
							</div>

							{showTooltip === 2 && (
								<div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 relative">
									<button
										onClick={() => setShowTooltip(null)}
										className="absolute top-2 right-2 text-white hover:text-gray-200"
									>
										<X className="w-4 h-4" />
									</button>
									<p className="text-sm text-blue-100 pr-6">
										Liability insurance covering damage to third parties during your swap period.
									</p>
								</div>
							)}

							<div className="flex items-start">
								<Shield className="w-5 h-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
								<div className="flex items-start">
									<div className="flex-1">
										<span className="font-medium">Contents Insurance</span>
									</div>
									<button
										onClick={() => toggleTooltip(3)}
										className="ml-2 text-blue-200 hover:text-white transition-colors"
									>
										<Info className="w-4 h-4" />
									</button>
								</div>
							</div>

							{showTooltip === 3 && (
								<div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 relative">
									<button
										onClick={() => setShowTooltip(null)}
										className="absolute top-2 right-2 text-white hover:text-gray-200"
									>
										<X className="w-4 h-4" />
									</button>
									<p className="text-sm text-blue-100 pr-6">
										Household contents insurance protecting your belongings during the swap.
									</p>
								</div>
							)}

							<div className="flex items-start">
								<Check className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
								<span className="font-medium">Professional Contract Templates</span>
							</div>

							<div className="flex items-start">
								<Check className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
								<span className="font-medium">24/7 Support During Swap</span>
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

				{/* How It Works */}
				<div className="mt-16 text-center">
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
						<div className="flex items-center justify-center mb-6">
							<Zap className="w-6 h-6 text-blue-600 mr-2" />
							<h3 className="text-xl font-bold text-gray-900 dark:text-white">How Our Pricing Works</h3>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
							<div className="text-center">
								<div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
									<span className="text-green-600 font-bold">1</span>
								</div>
								<h4 className="font-semibold text-gray-900 dark:text-white mb-2">Search Free</h4>
								<p className="text-sm text-gray-600 dark:text-gray-300">
									Browse, search, and connect with potential swap partners at no cost
								</p>
							</div>
							<div className="text-center">
								<div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
									<span className="text-blue-600 font-bold">2</span>
								</div>
								<h4 className="font-semibold text-gray-900 dark:text-white mb-2">Agree to Swap</h4>
								<p className="text-sm text-gray-600 dark:text-gray-300">
									Once you've found your perfect match and agreed to proceed
								</p>
							</div>
							<div className="text-center">
								<div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
									<span className="text-purple-600 font-bold">3</span>
								</div>
								<h4 className="font-semibold text-gray-900 dark:text-white mb-2">Activate SwapSecure</h4>
								<p className="text-sm text-gray-600 dark:text-gray-300">
									Start your monthly protection fee and enjoy 100% safe swapping
								</p>
							</div>
						</div>

						<p className="text-gray-600 dark:text-gray-300 leading-relaxed">
							Our fair pricing model means you only pay when you've successfully found a swap partner. The
							monthly SwapSecure fee activates our 100% scam protection system and includes comprehensive
							insurance coverage to ensure your swap is completely safe and secure.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
