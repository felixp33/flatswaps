// src/components/landing/Testimonials.tsx
import Image from "next/image";
import { Testimonial } from "@/types";

interface TestimonialsProps {
	testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
	// Updated testimonials with exchange student perspective
	const exchangeStudentTestimonials = [
		{
			id: "1",
			name: "Emma Thompson",
			location: "University of Edinburgh → Barcelona",
			text: "During my semester abroad in Barcelona, Flatswaps was a lifesaver! I swapped my Edinburgh flat with a local student and got to experience authentic Spanish living. It saved me thousands compared to student housing and I made a lifelong friend.",
			avatar: "/images/avatar-4.png",
			program: "Erasmus Exchange",
			duration: "Fall 2023",
		},
		{
			id: "2",
			name: "James Rodriguez",
			location: "UC Berkeley → Amsterdam",
			text: "As a computer science student doing research at UvA, finding affordable housing in Amsterdam seemed impossible. Through Flatswaps, I connected with another student and we both got authentic local experiences instead of expensive tourist accommodations.",
			avatar: "/images/avatar-5.png",
			program: "Research Exchange",
			duration: "Spring 2024",
		},
		{
			id: "3",
			name: "Sophie Chen",
			location: "NUS Singapore → Berlin",
			text: "My year abroad studying at TU Berlin was incredible thanks to Flatswaps. Living in a real Berlin apartment instead of a dorm gave me such a deeper cultural immersion. Plus, my exchange partner loved exploring Singapore from my place!",
			avatar: "/images/avatar-6.png",
			program: "Year Abroad Program",
			duration: "Academic Year 2023-24",
		},
	];

	return (
		<section
			id="testimonials"
			className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-800 dark:text-blue-200 mb-4">
						🎓 Student Stories
					</div>
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
						Exchange Students Love Flatswaps
					</h2>
					<p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 sm:mt-4">
						Real stories from students who transformed their study abroad experience
					</p>
				</div>

				<div className="mt-12 grid gap-8 md:grid-cols-3">
					{exchangeStudentTestimonials.map((testimonial) => (
						<div
							key={testimonial.id}
							className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:transform hover:scale-[1.02] relative overflow-hidden"
						>
							{/* Decorative element */}
							<div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full -translate-y-10 translate-x-10 opacity-10"></div>

							<div className="relative">
								{/* Student info header */}
								<div className="flex items-center mb-4">
									<div className="h-14 w-14 rounded-full overflow-hidden relative mr-4 ring-2 ring-blue-100 dark:ring-blue-800">
										<Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
									</div>
									<div className="flex-1">
										<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
											{testimonial.name}
										</h3>
										<p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
											{testimonial.location}
										</p>
										<div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
											<span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full mr-2">
												{testimonial.program}
											</span>
											<span>{testimonial.duration}</span>
										</div>
									</div>
								</div>

								{/* Rating stars */}
								<div className="mb-4 flex items-center">
									<div className="flex text-yellow-400 mr-2">
										{[...Array(5)].map((_, i) => (
											<svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
												<path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
											</svg>
										))}
									</div>
									<span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
										Verified Exchange
									</span>
								</div>

								{/* Testimonial text */}
								<blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed">
									<p className="relative">
										<span className="text-4xl text-blue-200 dark:text-blue-800 absolute -top-2 -left-2 font-serif">
											"
										</span>
										<span className="relative z-10">{testimonial.text}</span>
									</p>
								</blockquote>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
