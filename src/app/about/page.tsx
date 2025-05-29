// src/app/about/page.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Heart, Globe, Shield, Users, Home, Sparkles } from "lucide-react";

export default function AboutPage() {
	const values = [
		{
			icon: Heart,
			title: "Community First",
			description:
				"We believe in the power of human connection and building trust between strangers who become friends.",
		},
		{
			icon: Globe,
			title: "Global Perspective",
			description:
				"Enabling cultural exchange and understanding through authentic local living experiences worldwide.",
		},
		{
			icon: Shield,
			title: "Trust & Safety",
			description:
				"Rigorous verification processes and community standards ensure safe, secure exchanges for everyone.",
		},
		{
			icon: Users,
			title: "Inclusive Access",
			description:
				"Making travel accessible to students and budget-conscious travelers through fair, fee-free exchanges.",
		},
	];

	const stats = [
		{ number: "25,000+", label: "Active Members" },
		{ number: "180+", label: "Countries" },
		{ number: "50,000+", label: "Successful Swaps" },
		{ number: "4.9/5", label: "Average Rating" },
	];

	const team = [
		{
			name: "Sarah Chen",
			role: "Co-Founder & CEO",
			bio: "Former Airbnb product manager with a passion for sustainable travel and cultural exchange.",
			initials: "SC",
		},
		{
			name: "Marcus Rodriguez",
			role: "Co-Founder & CTO",
			bio: "Ex-Google engineer who believes technology should bring people together, not apart.",
			initials: "MR",
		},
		{
			name: "Emma Thompson",
			role: "Head of Community",
			bio: "Travel blogger turned community builder, ensuring every swap creates lasting connections.",
			initials: "ET",
		},
		{
			name: "Alex Kim",
			role: "Head of Trust & Safety",
			bio: "Former law enforcement officer dedicated to creating the safest platform for home exchanges.",
			initials: "AK",
		},
	];

	return (
		<>
			<Header />
			<main className="min-h-screen bg-white dark:bg-gray-900">
				{/* Hero Section */}
				<section className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center">
							<h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
								Redefining How the World
								<span className="text-blue-600 dark:text-blue-400 block">Travels Together</span>
							</h1>
							<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
								FlatSwaps connects global travelers through authentic home exchanges, making meaningful travel
								accessible while building bridges between cultures.
							</p>
						</div>
					</div>
				</section>

				{/* Mission Section */}
				<section className="py-16 md:py-24">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
							<div>
								<div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-800 dark:text-blue-200 mb-6">
									<Sparkles className="h-4 w-4 mr-2" />
									Our Mission
								</div>
								<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
									Making Travel More Human
								</h2>
								<p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
									We believe travel should be about connection, not just consumption. FlatSwaps was born from
									the idea that the best way to experience a new place is to live like a local, and the best
									way to do that is by swapping homes with someone who calls it home.
								</p>
								<p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
									Our platform removes the barriers that make travel expensive and impersonal, creating
									opportunities for meaningful cultural exchange while building a global community of trusted
									travelers.
								</p>
							</div>
							<div className="relative">
								<div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
									<Home className="h-16 w-16 mb-6 opacity-80" />
									<h3 className="text-2xl font-bold mb-4">Founded in 2023</h3>
									<p className="text-blue-100 leading-relaxed">
										Started by two friends who met through a home exchange in Barcelona, FlatSwaps grew from a
										simple idea: what if we could make authentic travel accessible to everyone, not just those
										who could afford luxury?
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Values Section */}
				<section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
								The principles that guide everything we do, from product decisions to community building.
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{values.map((value, index) => {
								const Icon = value.icon;
								return (
									<div key={index} className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm">
										<div className="flex items-center mb-4">
											<div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
												<Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
											</div>
											<h3 className="text-xl font-semibold text-gray-900 dark:text-white">{value.title}</h3>
										</div>
										<p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
									</div>
								);
							})}
						</div>
					</div>
				</section>

				{/* Stats Section */}
				<section className="py-16 md:py-24">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Growing Global Community</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300">
								Connecting travelers across continents, one swap at a time.
							</p>
						</div>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
							{stats.map((stat, index) => (
								<div key={index} className="text-center">
									<div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
										{stat.number}
									</div>
									<div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Team Section */}
				<section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
								Passionate travelers and technologists working to make authentic travel accessible to everyone.
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							{team.map((member, index) => (
								<div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm text-center">
									<div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
										{member.initials}
									</div>
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{member.name}</h3>
									<p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{member.role}</p>
									<p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{member.bio}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-700">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
						<p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
							Join thousands of travelers who've discovered that the best adventures happen when you live like a
							local.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a
								href="/list-property"
								className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
							>
								List Your Home
							</a>
							<a
								href="/find-swap"
								className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
							>
								Find a Swap
							</a>
						</div>
					</div>
				</section>

				{/* Demo Notice */}
				<section className="py-8 bg-gray-100 dark:bg-gray-800">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<p className="text-sm text-gray-600 dark:text-gray-400">
							<strong>Note:</strong> This is a demonstration website. FlatSwaps is a fictional company created
							for illustrative purposes only.
						</p>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
