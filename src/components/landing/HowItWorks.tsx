// src/components/landing/HowItWorks.tsx
import Link from "next/link";

interface Step {
	number: number;
	title: string;
	description: string;
}

export default function HowItWorks() {
	// Steps data
	const steps: Step[] = [
		{
			number: 1,
			title: "Create Your Listing",
			description:
				"List your property with photos, amenities, and swap preferences. Verified listings get more views!",
		},
		{
			number: 2,
			title: "Connect With Members",
			description:
				"Browse listings or wait for swap requests. Message with potential swap partners to discuss details.",
		},
		{
			number: 3,
			title: "Swap or Rent",
			description:
				"Finalize your exchange details, sign the agreement, and enjoy living like a local in your temporary home.",
		},
	];

	return (
		<section id="how-it-works" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
						How FlatSwaps Works
					</h2>
					<p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
						Exchange your home or find the perfect vacation rental in three simple steps
					</p>
				</div>

				<div className="mt-16 lg:mt-20 grid gap-8 md:grid-cols-3">
					{steps.map((step) => (
						<div key={step.number} className="relative">
							<div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white text-xl font-bold">
								{step.number}
							</div>
							<div className="ml-16 md:ml-0 md:mt-16 md:text-center">
								<h3 className="text-xl font-medium text-gray-900 dark:text-white">{step.title}</h3>
								<p className="mt-2 text-base text-gray-500 dark:text-gray-400">{step.description}</p>
							</div>
						</div>
					))}
				</div>

				<div className="mt-12 text-center">
					<Link
						href="/how-it-works"
						className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						Learn More
					</Link>
				</div>
			</div>
		</section>
	);
}
