"use client";

import { ArrowRight, Home, Users, Handshake } from "lucide-react";

export default function ImprovedHowItWorks() {
	const steps = [
		{
			number: 1,
			title: "Create a Profile",
			description: "Describe your current flat and specify what you're looking for.",
			image: "/images/how-it-works/create-profile.png",
			icon: Home,
			alt: "Person relaxing in apartment thinking about travel destinations",
		},
		{
			number: 2,
			title: "Get Matched",
			description: "We find potential swaps based on your preferences.",
			image: "/images/how-it-works/get-matched-2.png",
			icon: Users,
			alt: "Puzzle pieces showing flat swapping matching system",
		},
		{
			number: 3,
			title: "Connect & Swap",
			description: "Contact matches and finalize your flat swap easily.",
			image: "/images/how-it-works/connect-swap-1.png",
			icon: Handshake,
			alt: "Two people shaking hands to finalize apartment swap",
		},
	];

	// Debug function to log image loading
	const handleImageError = (imagePath: string, e: React.SyntheticEvent<HTMLImageElement>) => {
		console.log(`Failed to load image: ${imagePath}`);
		console.log("Error event:", e);

		const target = e.currentTarget;
		const placeholder = target.nextElementSibling as HTMLElement | null;
		target.style.opacity = "0";
		if (placeholder) {
			placeholder.style.display = "flex";
		}
		setTimeout(() => {
			target.style.display = "none";
		}, 300);
	};

	const handleImageLoad = (imagePath: string, e: React.SyntheticEvent<HTMLImageElement>) => {
		console.log(`Successfully loaded image: ${imagePath}`);

		const target = e.currentTarget;
		const placeholder = target.nextElementSibling as HTMLElement | null;

		// Show the image and hide placeholder
		target.style.display = "block";
		target.style.opacity = "1";
		if (placeholder) {
			placeholder.style.display = "none";
		}
	};

	return (
		<section id="how-it-works" className="py-16 md:py-24 bg-white dark:bg-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight sm:text-4xl mb-4">
						How It Works
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Exchange your home or find the perfect space abroad in three simple steps
					</p>
				</div>

				{/* Steps Container */}
				<div className="relative">
					{/* Connection Lines */}
					<div className="hidden lg:block absolute top-32 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-800 to-transparent"></div>
					<div className="hidden lg:flex absolute top-32 left-1/4 right-1/4 justify-between items-center">
						<ArrowRight className="text-blue-400 dark:text-blue-500 h-6 w-6 bg-white dark:bg-gray-900 rounded-full p-1" />
						<ArrowRight className="text-blue-400 dark:text-blue-500 h-6 w-6 bg-white dark:bg-gray-900 rounded-full p-1" />
					</div>

					{/* Steps Grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
						{steps.map((step, index) => {
							const Icon = step.icon;
							return (
								<div key={step.number} className="text-center group cursor-pointer">
									{/* Image Container */}
									<div className="relative mb-6 overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
										<div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700 relative">
											{/* Actual Image */}
											<img
												src={step.image}
												alt={step.alt}
												className="w-full h-full object-cover transition-opacity duration-300"
												onError={(e) => handleImageError(step.image, e)}
												onLoad={(e) => handleImageLoad(step.image, e)}
												style={{ display: "block" }}
											/>

											{/* Elegant Placeholder/Fallback */}
											<div
												className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-700 dark:via-gray-750 dark:to-gray-800 flex flex-col items-center justify-center transition-all duration-300"
												style={{ display: "none" }}
											>
												<div className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-2xl backdrop-blur-sm shadow-lg">
													<Icon className="h-12 w-12 text-blue-500 dark:text-blue-400 mx-auto mb-2" />
												</div>
												<div className="mt-3 text-center">
													<div className="w-16 h-2 bg-blue-200 dark:bg-blue-700 rounded-full animate-pulse"></div>
												</div>
											</div>

											{/* Step Number Badge */}
											<div className="absolute top-4 left-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
												{step.number}
											</div>

											{/* Hover Overlay */}
											<div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
										</div>
									</div>

									{/* Content */}
									<div className="space-y-3">
										<h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
											{step.title}
										</h3>
										<p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-sm mx-auto">
											{step.description}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<div className="text-center mt-12">
					<a
						href="/auth/signup"
						className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl group"
					>
						<span>Get Started Now</span>
						<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
					</a>
					<p className="mt-3 text-sm text-gray-500 dark:text-gray-400">No credit card required • Free to start</p>
				</div>
			</div>
		</section>
	);
}
