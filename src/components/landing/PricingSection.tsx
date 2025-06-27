// src/components/landing/PricingSection.tsx
"use client";

import { Check, Star, ArrowRight, Zap } from "lucide-react";

export default function PricingSection() {
	const plans = [
		{
			name: "Free",
			price: "0",
			description: "Perfect for getting started with home swapping",
			popular: false,
			features: ["Unlimited matches", "verification", "exclusive deals", "basic contract templates"],
			limitations: [],
			cta: "Get Started Free",
			ctaLink: "/auth/signup",
		},
		{
			name: "SwapSecure",
			price: "11.99",
			description: "Unlock the full potential of home swapping",
			popular: true,
			features: [
				"Everything in Free",
				"Identity verification",
				"rent insurance/guarantee",
				"insurance (damages)",
				"Digital contracts",
			],
			limitations: [],
			cta: "Get Premium Access",
			ctaLink: "/auth/signup?plan=premium",
		},
	];

	return (
		<section className="py-16 md:py-24 bg-white dark:bg-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full mb-4">
						<Zap className="w-4 h-4 mr-2" />
						Simple, Transparent Pricing
					</div>
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight sm:text-4xl mb-4">
						Choose Your Home Swapping Plan
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Start for free and upgrade with a simple one-time payment. No subscriptions, no hidden fees.
					</p>
				</div>

				{/* Pricing Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					{plans.map((plan, index) => (
						<div
							key={plan.name}
							className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
								plan.popular
									? "border-blue-500 dark:border-blue-400"
									: "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
							}`}
						>
							{/* Popular Badge */}
							{plan.popular && (
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
									<div className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full shadow-lg">
										<Star className="w-4 h-4 mr-1 fill-current" />
										Most Popular
									</div>
								</div>
							)}

							<div className="p-8">
								{/* Plan Header */}
								<div className="text-center mb-8">
									<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
									<div className="flex items-baseline justify-center mb-4">
										<span className="text-5xl font-bold text-gray-900 dark:text-white">€{plan.price}</span>
										<span className="text-gray-500 dark:text-gray-400 ml-2">
											{plan.price !== "0" ? "once" : "forever"}
										</span>
									</div>
									<p className="text-gray-600 dark:text-gray-300">{plan.description}</p>
								</div>

								{/* Features List */}
								<div className="space-y-4 mb-8">
									<ul className="space-y-3">
										{plan.features.map((feature, featureIndex) => (
											<li key={featureIndex} className="flex items-start">
												<Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
												<span className="text-gray-600 dark:text-gray-300 text-sm">{feature}</span>
											</li>
										))}
									</ul>
								</div>

								{/* CTA Button */}
								<a
									href={plan.ctaLink}
									className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg transition-all duration-200 group ${
										plan.popular
											? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
											: "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100"
									}`}
								>
									{plan.cta}
									<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
								</a>

								{plan.name === "Premium" && (
									<p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">
										One-time payment • Lifetime access
									</p>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
