// src/app/safety/page.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
	Shield,
	UserCheck,
	Camera,
	Star,
	MessageSquare,
	Lock,
	Eye,
	AlertTriangle,
	CheckCircle,
	Flag,
	Users,
	FileText,
	MapPin,
	Home,
	Phone,
	Mail,
} from "lucide-react";
import Link from "next/link";

export default function SafetyTrustPage() {
	const protectionFeatures = [
		{
			icon: UserCheck,
			title: "Identity Verification",
			description:
				"All members verify their identity with government-issued ID and phone confirmation before participating in exchanges.",
			features: [
				"Government ID verification",
				"Phone number confirmation",
				"Email verification",
				"Profile completeness check",
			],
		},
		{
			icon: Camera,
			title: "Property Verification",
			description:
				"Properties undergo verification to ensure they exist and match their descriptions through photos and address confirmation.",
			features: ["Photo verification", "Address confirmation", "Property ownership check", "Virtual tour options"],
		},
		{
			icon: Star,
			title: "Review System",
			description:
				"Transparent mutual reviews from hosts and guests help build trust and accountability in our community.",
			features: [
				"Mutual reviews required",
				"Photo reviews encouraged",
				"Response rate tracking",
				"Overall rating system",
			],
		},
		{
			icon: MessageSquare,
			title: "Secure Communication",
			description:
				"All initial communication happens through our secure platform to protect your privacy until you're ready to connect directly.",
			features: ["Encrypted messaging", "Report inappropriate messages", "Message history", "Privacy controls"],
		},
	];

	const safetyTips = [
		{
			category: "Before You Travel",
			icon: MapPin,
			tips: [
				"Research your destination thoroughly including local customs and laws",
				"Share detailed travel itinerary with trusted family or friends",
				"Verify host identity through video call before exchanging homes",
				"Read all previous reviews carefully and ask specific questions",
				"Purchase comprehensive travel insurance for your trip",
			],
		},
		{
			category: "During Your Stay",
			icon: Home,
			tips: [
				"Respect house rules and treat the property as your own",
				"Keep local emergency numbers and embassy contacts handy",
				"Stay in regular contact with family and friends back home",
				"Document any pre-existing damage with photos immediately",
				"Be considerate of neighbors and the local community",
			],
		},
		{
			category: "Communication Safety",
			icon: MessageSquare,
			tips: [
				"Keep conversations on our platform until you feel comfortable",
				"Never share financial information through messages",
				"Be cautious of requests for wire transfers or unusual payments",
				"Report suspicious behavior or requests immediately",
				"Trust your instincts if something doesn't feel right",
			],
		},
	];

	const trustIndicators = [
		{ icon: Shield, label: "Verified Host", description: "ID and property verified by flatswaps" },
		{ icon: Star, label: "Superhost", description: "Exceptional reviews and response rate" },
		{ icon: Users, label: "Experienced", description: "Completed 5+ successful exchanges" },
		{ icon: Eye, label: "Recently Active", description: "Active on platform within last 30 days" },
	];

	const reportingSteps = [
		{
			step: 1,
			title: "Report Immediately",
			description:
				"Use the report button on any profile, listing, or message. For emergencies, contact local authorities first.",
			icon: Flag,
		},
		{
			step: 2,
			title: "We Investigate",
			description: "Our trust & safety team reviews all reports within 24 hours and investigates thoroughly.",
			icon: Eye,
		},
		{
			step: 3,
			title: "Action Taken",
			description: "We take appropriate action from warnings to permanent account suspension based on our findings.",
			icon: Shield,
		},
		{
			step: 4,
			title: "Follow-up",
			description: "We follow up with all parties and implement measures to prevent similar issues.",
			icon: CheckCircle,
		},
	];

	const emergencyContacts = [
		{
			title: "Safety Emergency",
			description: "Immediate safety concerns during your exchange",
			contact: "safety@flatswaps.com",
			icon: AlertTriangle,
			color: "text-red-600 dark:text-red-400",
		},
		{
			title: "General Support",
			description: "Non-emergency questions and assistance",
			contact: "support@flatswaps.com",
			icon: Mail,
			color: "text-blue-600 dark:text-blue-400",
		},
	];

	return (
		<>
			<Header />
			<main className="min-h-screen bg-white dark:bg-gray-900">
				{/* Hero Section */}
				<section className="py-16 bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-sm font-medium text-green-800 dark:text-green-200 mb-6">
							<Shield className="h-4 w-4 mr-2" />
							Safety & Trust
						</div>
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
							Safe Exchanges, Trusted Community
						</h1>
						<p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
							Learn how we protect our community and discover essential safety tips for successful home
							exchanges.
						</p>
					</div>
				</section>

				{/* How We Protect You */}
				<section className="py-16">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
								How flatswaps Protects You
							</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300">
								Multiple layers of verification and security measures keep our community safe
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{protectionFeatures.map((feature, index) => {
								const Icon = feature.icon;
								return (
									<div
										key={index}
										className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
									>
										<div className="flex items-center mb-6">
											<div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mr-4">
												<Icon className="h-6 w-6 text-green-600 dark:text-green-400" />
											</div>
											<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
												{feature.title}
											</h3>
										</div>
										<p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
											{feature.description}
										</p>
										<ul className="space-y-2">
											{feature.features.map((item, idx) => (
												<li
													key={idx}
													className="flex items-center text-sm text-gray-600 dark:text-gray-300"
												>
													<CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
													{item}
												</li>
											))}
										</ul>
									</div>
								);
							})}
						</div>
					</div>
				</section>

				{/* Trust Indicators */}
				<section className="py-16 bg-gray-50 dark:bg-gray-800">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
								Trust Indicators to Look For
							</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300">
								These badges help you identify reliable and experienced hosts
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{trustIndicators.map((indicator, index) => {
								const Icon = indicator.icon;
								return (
									<div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-xl text-center">
										<div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full w-fit mx-auto mb-4">
											<Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
										</div>
										<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
											{indicator.label}
										</h3>
										<p className="text-gray-600 dark:text-gray-300 text-sm">{indicator.description}</p>
									</div>
								);
							})}
						</div>
					</div>
				</section>

				{/* Safety Tips */}
				<section className="py-16">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
								Safety Tips for Home Exchanges
							</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300">
								Essential guidelines for safe and successful exchanges
							</p>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							{safetyTips.map((category, index) => {
								const Icon = category.icon;
								return (
									<div
										key={index}
										className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700"
									>
										<div className="flex items-center mb-6">
											<div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
												<Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
											</div>
											<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
												{category.category}
											</h3>
										</div>
										<ul className="space-y-3">
											{category.tips.map((tip, idx) => (
												<li key={idx} className="flex items-start text-gray-600 dark:text-gray-300">
													<CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
													<span className="text-sm leading-relaxed">{tip}</span>
												</li>
											))}
										</ul>
									</div>
								);
							})}
						</div>
					</div>
				</section>

				{/* Reporting Process */}
				<section className="py-16 bg-gray-50 dark:bg-gray-800">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
								How to Report Safety Concerns
							</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300">
								Our process for handling and resolving safety issues
							</p>
						</div>
						<div className="space-y-6">
							{reportingSteps.map((step, index) => {
								const Icon = step.icon;
								return (
									<div
										key={index}
										className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600 flex items-start"
									>
										<div className="flex-shrink-0 mr-6">
											<div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
												<span className="text-lg font-bold text-blue-600 dark:text-blue-400">
													{step.step}
												</span>
											</div>
										</div>
										<div className="flex-1">
											<div className="flex items-center mb-3">
												<Icon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
												<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
													{step.title}
												</h3>
											</div>
											<p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</section>

				{/* Community Standards */}
				<section className="py-16">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Community Standards</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300">
								Guidelines that help maintain a safe and respectful community
							</p>
						</div>
						<div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div>
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
										<Users className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
										Respect & Inclusion
									</h3>
									<p className="text-gray-600 dark:text-gray-300 mb-4">
										Treat all community members with respect, regardless of background, identity, or beliefs.
									</p>
								</div>
								<div>
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
										<FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
										Honest Communication
									</h3>
									<p className="text-gray-600 dark:text-gray-300 mb-4">
										Provide accurate information about yourself and your property in all interactions.
									</p>
								</div>
								<div>
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
										<Home className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
										Property Care
									</h3>
									<p className="text-gray-600 dark:text-gray-300 mb-4">
										Treat others' homes with the same care and respect you'd expect for your own.
									</p>
								</div>
								<div>
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
										<AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
										Safety First
									</h3>
									<p className="text-gray-600 dark:text-gray-300 mb-4">
										Follow safety guidelines and report any concerns immediately to our team.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Emergency Contact */}
				<section className="py-16 bg-gradient-to-r from-red-600 to-orange-600">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-8">
							<h2 className="text-3xl font-bold text-white mb-4">Need to Report a Safety Concern?</h2>
							<p className="text-xl text-red-100">Contact us immediately if you encounter any safety issues</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{emergencyContacts.map((contact, index) => {
								const Icon = contact.icon;
								return (
									<div
										key={index}
										className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl text-white text-center"
									>
										<Icon
											className={`h-8 w-8 mx-auto mb-4 ${contact.color
												.replace("dark:text-red-400", "text-white")
												.replace("dark:text-blue-400", "text-white")}`}
										/>
										<h3 className="text-lg font-semibold mb-2">{contact.title}</h3>
										<p className="text-sm text-red-100 mb-3">{contact.description}</p>
										<a href={`mailto:${contact.contact}`} className="text-white font-medium hover:underline">
											{contact.contact}
										</a>
									</div>
								);
							})}
						</div>
						<div className="text-center mt-8">
							<p className="text-red-100 text-sm">
								For immediate emergencies, always contact local emergency services first (911, 999, 112, etc.)
							</p>
						</div>
					</div>
				</section>

				{/* Legal Policies */}
				<section className="py-16 bg-gray-50 dark:bg-gray-800">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Important Policies</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300">
								Legal policies that govern our platform and protect our community
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Link
								href="/terms"
								className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow group"
							>
								<FileText className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
									Terms of Service
								</h3>
								<p className="text-gray-600 dark:text-gray-300 text-sm">
									Legal agreement outlining user rights and responsibilities on our platform.
								</p>
							</Link>
							<Link
								href="/privacy"
								className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow group"
							>
								<Lock className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
									Privacy Policy
								</h3>
								<p className="text-gray-600 dark:text-gray-300 text-sm">
									How we collect, use, and protect your personal information.
								</p>
							</Link>
						</div>
					</div>
				</section>

				{/* Demo Notice */}
				<section className="py-8 bg-gray-100 dark:bg-gray-800">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<p className="text-sm text-gray-600 dark:text-gray-400">
							<strong>Note:</strong> This is a demonstration website. All safety information and policies are
							simulated for illustrative purposes only.
						</p>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
