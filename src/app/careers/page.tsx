// src/app/careers/page.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Briefcase, Heart, Globe, Users, Coffee, Laptop, MapPin, Mail } from "lucide-react";

export default function CareersPage() {
	const benefits = [
		{
			icon: Globe,
			title: "Remote-First Culture",
			description: "Work from anywhere in the world. We believe great work happens everywhere.",
		},
		{
			icon: Heart,
			title: "Unlimited Home Swaps",
			description: "Free access to our entire platform for personal travel and exchanges.",
		},
		{
			icon: Coffee,
			title: "Flexible Schedule",
			description: "Choose your hours and work when you're most productive.",
		},
		{
			icon: Users,
			title: "Inclusive Team",
			description: "We celebrate diversity and create an environment where everyone belongs.",
		},
		{
			icon: Laptop,
			title: "Top Equipment",
			description: "MacBook Pro, monitor, and home office setup allowance for all team members.",
		},
		{
			icon: MapPin,
			title: "Annual Team Retreats",
			description: "Company-paid trips where we explore new destinations together.",
		},
	];

	const values = [
		{
			title: "Think Like a Traveler",
			description: "We approach problems with curiosity and openness, always ready to explore new solutions.",
		},
		{
			title: "Build Bridges",
			description: "We connect people, ideas, and cultures. Every decision should bring our community closer.",
		},
		{
			title: "Own Your Journey",
			description: "Take initiative, make decisions, and be accountable for outcomes. We trust you to lead.",
		},
		{
			title: "Stay Humble",
			description: "We're always learning, always improving. No ego, just genuine desire to do better.",
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
							<div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-800 dark:text-blue-200 mb-6">
								<Briefcase className="h-4 w-4 mr-2" />
								Join Our Mission
							</div>
							<h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
								Build the Future of
								<span className="text-blue-600 dark:text-blue-400 block">Global Travel</span>
							</h1>
							<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
								Help us create meaningful connections between travelers worldwide. Join a team that's passionate
								about making authentic travel accessible to everyone.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<a
									href="#openings"
									className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
								>
									View Open Positions
								</a>
								<a
									href="#culture"
									className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
								>
									Learn About Our Culture
								</a>
							</div>
						</div>
					</div>
				</section>

				{/* Culture Section */}
				<section id="culture" className="py-16 md:py-24">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Culture & Values</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
								We're building more than a product—we're cultivating a culture of exploration, connection, and
								continuous growth.
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
							{values.map((value, index) => (
								<div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
									<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{value.title}</h3>
									<p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Benefits Section */}
				<section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
								Why You'll Love Working Here
							</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300">
								We believe happy employees create exceptional experiences for our community.
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{benefits.map((benefit, index) => {
								const Icon = benefit.icon;
								return (
									<div key={index} className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm">
										<div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg w-fit mb-6">
											<Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
										</div>
										<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
											{benefit.title}
										</h3>
										<p className="text-gray-600 dark:text-gray-300 leading-relaxed">{benefit.description}</p>
									</div>
								);
							})}
						</div>
					</div>
				</section>

				{/* Current Openings Section */}
				<section id="openings" className="py-16 md:py-24">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Current Openings</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300">
								We're always looking for talented individuals who share our passion for travel and connection.
							</p>
						</div>

						{/* No Jobs Available State */}
						<div className="text-center py-16">
							<div className="mx-auto h-32 w-32 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-8">
								<Briefcase className="h-12 w-12 text-gray-400" />
							</div>
							<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								No Open Positions Right Now
							</h3>
							<p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
								We don't have any active job postings at the moment, but we're always interested in connecting
								with exceptional talent. If you're passionate about travel technology and community building,
								we'd love to hear from you.
							</p>

							{/* Get Notified Section */}
							<div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 max-w-2xl mx-auto">
								<h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Stay in Touch</h4>
								<p className="text-gray-600 dark:text-gray-300 mb-6">
									We'll notify you when positions that match your interests become available.
								</p>
								<div className="flex flex-col sm:flex-row gap-4">
									<input
										type="email"
										placeholder="Enter your email address"
										className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
									<button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
										Get Notified
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Contact Section */}
				<section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-700">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Make an Impact?</h2>
						<p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
							Even if we don't have the perfect role listed, we're always interested in meeting talented people
							who are passionate about our mission.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a
								href="mailto:careers@flatswaps.com"
								className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
							>
								<Mail className="h-5 w-5 mr-2" />
								Send Us Your Resume
							</a>
							<a
								href="/about"
								className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
							>
								Learn More About Us
							</a>
						</div>

						<div className="mt-8 text-blue-100">
							<p className="mb-2">Questions about working at flatswaps?</p>
							<a href="mailto:careers@flatswaps.com" className="text-white underline hover:no-underline">
								careers@flatswaps.com
							</a>
						</div>
					</div>
				</section>

				{/* Demo Notice */}
				<section className="py-8 bg-gray-100 dark:bg-gray-800">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<p className="text-sm text-gray-600 dark:text-gray-400">
							<strong>Note:</strong> This is a demonstration website. flatswaps is a fictional company and these
							are not real job opportunities.
						</p>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
