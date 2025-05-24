// src/components/landing/FAQSection.tsx
"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQSection() {
	const [openQuestion, setOpenQuestion] = useState<number | null>(null);

	const faqs = [
		{
			question: "How does home swapping work?",
			answer:
				"Home swapping allows you to exchange homes with another member for an agreed period. You stay in their home while they stay in yours, or arrange a non-simultaneous swap. FlatSwaps handles all the verification, communication, and agreement processes to make it seamless.",
		},
		{
			question: "Is home swapping safe?",
			answer:
				"Yes, FlatSwaps prioritizes safety through verified profiles, secure messaging, detailed agreements, and reviews. All members undergo ID verification, and properties are verified through virtual or in-person checks. We also provide insurance options specifically designed for home exchanges.",
		},
		{
			question: "What if I only want to swap during specific dates?",
			answer:
				"You have complete control over your availability calendar. Set the dates when your home is available for swapping, and you'll only receive requests for those periods. You can also specify preferred swap durations and update your availability at any time.",
		},
		{
			question: "Can I rent my property instead of swapping?",
			answer:
				"Absolutely! FlatSwaps allows you to list your property for both swapping and traditional rentals. You can choose one or both options, and set different availability and rates for each. This gives you maximum flexibility to utilize your property however works best for you.",
		},
		{
			question: "What costs are involved?",
			answer:
				"Creating a profile and browsing properties is completely free. We only charge a small service fee when you successfully complete a booking or swap. Premium memberships are available with additional features like priority support and enhanced visibility for your listings.",
		},
		{
			question: "How do I verify other members?",
			answer:
				"All members go through our verification process including ID verification, phone number confirmation, and property verification. You can view verification badges on profiles, read reviews from other members, and communicate through our secure messaging system before making any commitments.",
		},
	];

	const toggleQuestion = (index: number) => {
		setOpenQuestion(openQuestion === index ? null : index);
	};

	return (
		<section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
						Frequently Asked Questions
					</h2>
					<p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
						Everything you need to know about home swapping with FlatSwaps
					</p>
				</div>

				<div className="space-y-4">
					{faqs.map((faq, index) => (
						<div
							key={index}
							className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden transition-all duration-200 hover:shadow-md"
						>
							<div
								className="flex justify-between items-center cursor-pointer p-6 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
								onClick={() => toggleQuestion(index)}
							>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">{faq.question}</h3>
								<div className="flex-shrink-0">
									{openQuestion === index ? (
										<Minus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
									) : (
										<Plus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
									)}
								</div>
							</div>
							{openQuestion === index && (
								<div className="px-6 pb-6">
									<div className="pt-4 border-t border-gray-200 dark:border-gray-600">
										<p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
									</div>
								</div>
							)}
						</div>
					))}
				</div>

				{/* Contact CTA */}
				<div className="mt-12 text-center">
					<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Still have questions?</h3>
						<p className="text-gray-600 dark:text-gray-300 mb-4">
							Our support team is here to help you get started with your home swapping journey.
						</p>
						<button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
							Contact Support
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
