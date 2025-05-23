// src/components/landing/CtaSection.tsx
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

				<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
					<Link
						href="/list-property"
						className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 shadow-sm"
					>
						List Your Property
					</Link>
					<Link
						href="/find-swap"
						className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						Find a Swap
					</Link>
				</div>
			</div>
		</section>
	);
}
