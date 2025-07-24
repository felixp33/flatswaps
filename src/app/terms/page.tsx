// src/app/terms/page.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function TermsOfServicePage() {
	return (
		<>
			<Header />
			<main className="min-h-screen bg-white dark:bg-gray-900">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="prose prose-gray dark:prose-invert max-w-none">
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>

						<p className="text-gray-600 dark:text-gray-300 mb-8">
							<strong>Last updated:</strong> May 29, 2025
						</p>

						<div className="space-y-8">
							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
									1. Agreement to Terms
								</h2>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
									By accessing and using flatswaps, you accept and agree to be bound by the terms and provision
									of this agreement. If you do not agree to abide by the above, please do not use this service.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
									2. Description of Service
								</h2>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
									flatswaps is a platform that facilitates home exchanges and short-term rentals between
									registered users. We provide the technology and services to help users connect, communicate,
									and arrange accommodations.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
									3. User Responsibilities
								</h2>
								<div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
									<p>As a user of flatswaps, you agree to:</p>
									<ul className="list-disc list-inside space-y-2 ml-4">
										<li>Provide accurate and truthful information in your profile and listings</li>
										<li>Respect other users' properties and follow house rules</li>
										<li>Communicate respectfully with other members</li>
										<li>Report any issues or violations to our support team</li>
										<li>Comply with all applicable laws and regulations</li>
									</ul>
								</div>
							</section>

							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
									4. Account Registration
								</h2>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
									To use certain features of flatswaps, you must register for an account. You are responsible
									for maintaining the confidentiality of your account credentials and for all activities that
									occur under your account.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
									5. Property Listings
								</h2>
								<div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
									<p>When listing your property, you represent that:</p>
									<ul className="list-disc list-inside space-y-2 ml-4">
										<li>You have the right to list and offer the property</li>
										<li>All information provided is accurate and current</li>
										<li>The property meets all safety and legal requirements</li>
										<li>You will honor confirmed bookings and exchanges</li>
									</ul>
								</div>
							</section>

							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
									6. Booking and Cancellation
								</h2>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
									Booking confirmations create a binding agreement between users. Cancellation policies vary by
									listing and are clearly displayed before booking. We encourage users to communicate directly
									to resolve any issues before cancelling.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
									7. Fees and Payments
								</h2>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
									flatswaps may charge service fees for bookings processed through our platform. All fees are
									clearly disclosed before payment. For home exchanges, no service fees apply to the exchange
									itself.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
									8. Prohibited Uses
								</h2>
								<div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
									<p>You may not use flatswaps for:</p>
									<ul className="list-disc list-inside space-y-2 ml-4">
										<li>Any unlawful purpose or to solicit others to perform unlawful acts</li>
										<li>Violating any international, federal, provincial, or state regulations or laws</li>
										<li>Harassing, abusing, insulting, harming, defaming, or discriminating</li>
										<li>Submitting false or misleading information</li>
										<li>Uploading or transmitting viruses or malicious code</li>
									</ul>
								</div>
							</section>

							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
									9. Limitation of Liability
								</h2>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
									flatswaps acts as a platform connecting users and is not responsible for the actual
									accommodations or exchanges. We do not guarantee the accuracy of listings or the conduct of
									users. Your use of the service is at your own risk.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Termination</h2>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
									We reserve the right to terminate or suspend your account at any time for violations of these
									terms or for any other reason we deem necessary to protect our platform and community.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
									11. Changes to Terms
								</h2>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
									We reserve the right to modify these terms at any time. We will notify users of significant
									changes via email or platform notifications. Continued use of the service constitutes
									acceptance of modified terms.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
									12. Contact Information
								</h2>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
									If you have any questions about these Terms of Service, please contact us at
									legal@flatswaps.com or through our support center.
								</p>
							</section>
						</div>

						<div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
							<p className="text-sm text-gray-600 dark:text-gray-400">
								<strong>Note:</strong> This is a demonstration website. These terms are for illustrative
								purposes only and do not constitute actual legal terms for any real service.
							</p>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
