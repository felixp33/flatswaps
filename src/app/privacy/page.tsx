// src/app/privacy/page.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PrivacyPolicyPage() {
	return (
		<>
			<Header />
			<main className="min-h-screen bg-white dark:bg-gray-900">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="prose prose-gray dark:prose-invert max-w-none">
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>

						<p className="text-gray-600 dark:text-gray-300 mb-8">
							<strong>Last updated:</strong> May 29, 2025
						</p>

						<div className="space-y-8">
							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
									1. Information We Collect
								</h2>
								<div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
									<h3 className="text-lg font-medium text-gray-900 dark:text-white">Personal Information</h3>
									<p>
										When you create an account, we collect information such as your name, email address, phone
										number, and location. For property listings, we may collect additional details about your
										property and availability.
									</p>

									<h3 className="text-lg font-medium text-gray-900 dark:text-white">Usage Information</h3>
									<p>
										We automatically collect certain information about how you use our service, including your
										interactions with other users, search queries, and browsing patterns on our platform.
									</p>

									<h3 className="text-lg font-medium text-gray-900 dark:text-white">Device Information</h3>
									<p>
										We collect information about the devices you use to access FlatSwaps, including IP
										address, browser type, operating system, and mobile device identifiers.
									</p>
								</div>
							</section>

							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
									2. How We Use Your Information
								</h2>
								<div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
									<p>We use the information we collect to:</p>
									<ul className="list-disc list-inside space-y-2 ml-4">
										<li>Provide and maintain our home exchange and rental services</li>
										<li>Facilitate connections between users and process bookings</li>
										<li>Verify user identities and prevent fraud</li>
										<li>Send important notifications about your account and bookings</li>
										<li>Improve our platform and develop new features</li>
										<li>Provide customer support and respond to inquiries</li>
										<li>Comply with legal obligations and enforce our terms</li>
									</ul>
								</div>
							</section>

							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
									3. Information Sharing
								</h2>
								<div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
									<h3 className="text-lg font-medium text-gray-900 dark:text-white">With Other Users</h3>
									<p>
										When you create a listing or engage in exchanges, certain information from your profile
										becomes visible to other users to facilitate connections and build trust within the
										community.
									</p>

									<h3 className="text-lg font-medium text-gray-900 dark:text-white">With Service Providers</h3>
									<p>
										We may share your information with trusted third-party service providers who help us
										operate our platform, such as payment processors, hosting services, and customer support
										tools.
									</p>

									<h3 className="text-lg font-medium text-gray-900 dark:text-white">Legal Requirements</h3>
									<p>
										We may disclose your information when required by law or when we believe it's necessary to
										protect our rights, your safety, or the safety of others.
									</p>
								</div>
							</section>

							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Data Security</h2>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
									We implement appropriate technical and organizational measures to protect your personal
									information against unauthorized access, alteration, disclosure, or destruction. However, no
									method of transmission over the internet is 100% secure, and we cannot guarantee absolute
									security.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Data Retention</h2>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
									We retain your personal information for as long as necessary to provide our services and
									fulfill the purposes outlined in this policy. When you delete your account, we will delete or
									anonymize your personal information, except where we need to retain it for legal or safety
									reasons.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
									6. Your Rights and Choices
								</h2>
								<div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
									<p>You have the right to:</p>
									<ul className="list-disc list-inside space-y-2 ml-4">
										<li>Access and update your personal information through your account settings</li>
										<li>Request a copy of the personal information we have about you</li>
										<li>Request deletion of your personal information</li>
										<li>Opt out of marketing communications</li>
										<li>Restrict certain processing of your information</li>
										<li>Data portability for information you've provided to us</li>
									</ul>
								</div>
							</section>

							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
									7. Cookies and Similar Technologies
								</h2>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
									We use cookies and similar technologies to enhance your experience on our platform, analyze
									usage patterns, and provide personalized content. You can control cookie settings through
									your browser preferences, though some features may not function properly if cookies are
									disabled.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
									8. International Data Transfers
								</h2>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
									FlatSwaps operates globally, and your information may be transferred to and processed in
									countries other than your own. We ensure appropriate safeguards are in place to protect your
									information in accordance with this privacy policy.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
									9. Children's Privacy
								</h2>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
									Our service is not intended for children under 18 years of age, and we do not knowingly
									collect personal information from children under 18. If we become aware that we have
									collected personal information from a child under 18, we will take steps to delete such
									information.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
									10. Changes to This Policy
								</h2>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
									We may update this privacy policy from time to time to reflect changes in our practices or
									applicable laws. We will notify you of any material changes by posting the new policy on our
									platform and, where appropriate, through email or other communications.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. Contact Us</h2>
								<div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
									<p>
										If you have any questions about this privacy policy or our privacy practices, please
										contact us at:
									</p>
									<div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
										<p>
											<strong>Email:</strong> privacy@flatswaps.com
										</p>
										<p>
											<strong>Address:</strong> FlatSwaps Privacy Team
											<br />
											123 Exchange Street
											<br />
											Digital City, DC 12345
										</p>
									</div>
								</div>
							</section>
						</div>

						<div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
							<p className="text-sm text-gray-600 dark:text-gray-400">
								<strong>Note:</strong> This is a demonstration website. This privacy policy is for illustrative
								purposes only and does not constitute an actual privacy policy for any real service.
							</p>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
