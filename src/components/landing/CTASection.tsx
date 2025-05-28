// src/components/landing/CTASection.tsx
import Link from "next/link";

export default function CtaSection() {
	return (
		<section className="py-16 md:py-24 bg-blue-600">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
					Ready to Start Your Home Exchange Journey?
				</h2>
				<p className="mt-3 max-w-2xl mx-auto text-xl text-blue-100 sm:mt-4">
					Join thousands of members already swapping homes around the world
				</p>

				<div className="mt-8">
					<Link
						href="/list-property"
						className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
					>
						Start Your Home Exchange
					</Link>
				</div>
			</div>
		</section>
	);
}
