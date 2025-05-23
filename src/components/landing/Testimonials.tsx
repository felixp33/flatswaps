// src/components/landing/Testimonials.tsx
import Image from "next/image";
import { Testimonial } from "@/types";

interface TestimonialsProps {
	testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
	return (
		<section className="py-16 md:py-24">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
						What Our Members Say
					</h2>
					<p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
						Real experiences from our community
					</p>
				</div>

				<div className="mt-12 grid gap-8 md:grid-cols-3">
					{testimonials.map((testimonial) => (
						<div
							key={testimonial.id}
							className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl"
						>
							<div className="flex items-center mb-4">
								<div className="h-12 w-12 rounded-full overflow-hidden relative mr-4">
									<Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
								</div>
								<div>
									<h3 className="text-lg font-medium text-gray-900 dark:text-white">{testimonial.name}</h3>
									<p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
								</div>
							</div>
							<div className="mb-4">
								<div className="flex text-yellow-400">
									{[...Array(5)].map((_, i) => (
										<span key={i}>★</span>
									))}
								</div>
							</div>
							<p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.text}"</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
