// src/app/help/page.tsx
"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
	Search,
	Book,
	Home,
	MessageCircle,
	CreditCard,
	Settings,
	ChevronDown,
	ChevronUp,
	HelpCircle,
	Mail,
	Send,
	Clock,
} from "lucide-react";
import { useState } from "react";

export default function HelpSupportPage() {
	const [openFaq, setOpenFaq] = useState<number | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	const categories = [
		{
			icon: Home,
			title: "Getting Started",
			description: "Learn the basics of home swapping",
			articles: 12,
			color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
		},
		{
			icon: Book,
			title: "Booking & Exchanges",
			description: "How to book and manage your swaps",
			articles: 18,
			color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
		},
		{
			icon: CreditCard,
			title: "Payments & Fees",
			description: "Understanding costs and payments",
			articles: 8,
			color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
		},
		{
			icon: MessageCircle,
			title: "Communication",
			description: "Messaging and contacting hosts",
			articles: 10,
			color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
		},
		{
			icon: Settings,
			title: "Account Settings",
			description: "Manage your profile and preferences",
			articles: 14,
			color: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400",
		},
	];

	const faqs = [
		{
			question: "How do I create my first home exchange listing?",
			answer:
				"Click 'List Your Property' in the header, then follow our step-by-step guide. You'll need to add photos, write a description, set your availability, and complete the verification process. The whole process takes about 15-20 minutes.",
		},
		{
			question: "Is flatswaps free to use?",
			answer:
				"Yes! Creating an account, browsing properties, and arranging direct home exchanges is completely free. We only charge a small service fee (3-5%) for bookings that involve rental payments, not for traditional home swaps.",
		},
		{
			question: "How does the verification process work?",
			answer:
				"We verify your identity through government ID, phone number, and email confirmation. For properties, we verify photos and addresses. The process typically takes 24-48 hours and helps build trust in our community.",
		},
		{
			question: "What if something goes wrong during my stay?",
			answer:
				"Contact our support team immediately through live chat or email. We have dedicated protocols for handling issues during active exchanges, including emergency support and dispute resolution.",
		},
		{
			question: "How do I find potential swap partners?",
			answer:
				"Use our search function to find properties in your desired destination, then send swap requests to hosts whose homes interest you. You can also create a 'swap search' and we'll notify you of potential matches.",
		},
		{
			question: "Can I rent my property instead of swapping?",
			answer:
				"Yes! You can choose to offer your property for both home exchanges and traditional rentals. Set different rates and availability for each option in your listing settings.",
		},
		{
			question: "What happens if I need to cancel a confirmed swap?",
			answer:
				"Cancellation policies vary by agreement type. For direct swaps, work with your swap partner to reschedule. For paid bookings, standard cancellation fees apply. Always communicate early if plans change.",
		},
		{
			question: "How do I leave a review after my exchange?",
			answer:
				"You'll receive an email prompt after your exchange ends. Reviews are mutual - both you and your host/guest can leave feedback. Reviews help build trust and improve the experience for everyone.",
		},
		{
			question: "What if my swap partner isn't responding to messages?",
			answer:
				"Try alternative contact methods if available. If there's still no response and you have a confirmed booking, contact our support team. We can help facilitate communication or assist with alternative arrangements.",
		},
		{
			question: "How do I update my availability calendar?",
			answer:
				"Go to your property listing and click 'Manage Calendar.' You can block unavailable dates, set minimum stay requirements, and adjust your availability for both swaps and rentals.",
		},
	];

	const filteredFaqs = faqs.filter(
		(faq) =>
			faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
			faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const toggleFaq = (index: number) => {
		setOpenFaq(openFaq === index ? null : index);
	};

	return (
		<>
			<Header />
			<main className="min-h-screen bg-white dark:bg-gray-900">
				{/* Hero Section */}
				<section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-800 dark:text-blue-200 mb-6">
							<HelpCircle className="h-4 w-4 mr-2" />
							Help & Support
						</div>
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
							How can we help you?
						</h1>
						<p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
							Find answers to common questions or contact our support team
						</p>

						{/* Search Bar */}
						<div className="relative max-w-2xl mx-auto">
							<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
							<input
								type="text"
								placeholder="Search for answers..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
							/>
						</div>
					</div>
				</section>

				{/* Popular Categories */}
				<section className="py-16">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
							Browse by Topic
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{categories.map((category, index) => {
								const Icon = category.icon;
								return (
									<div
										key={index}
										className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:transform hover:scale-[1.02] cursor-pointer"
									>
										<div className={`p-3 rounded-lg w-fit mb-4 ${category.color}`}>
											<Icon className="h-6 w-6" />
										</div>
										<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
											{category.title}
										</h3>
										<p className="text-gray-600 dark:text-gray-300 mb-4">{category.description}</p>
										<span className="text-sm text-gray-500 dark:text-gray-400">
											{category.articles} articles
										</span>
									</div>
								);
							})}
						</div>
					</div>
				</section>

				{/* FAQ Section */}
				<section className="py-16 bg-gray-50 dark:bg-gray-800">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
							Frequently Asked Questions
						</h2>
						<div className="space-y-4">
							{filteredFaqs.map((faq, index) => (
								<div
									key={index}
									className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
								>
									<button
										className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
										onClick={() => toggleFaq(index)}
									>
										<h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
											{faq.question}
										</h3>
										{openFaq === index ? (
											<ChevronUp className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
										) : (
											<ChevronDown className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
										)}
									</button>
									{openFaq === index && (
										<div className="px-6 pb-6">
											<div className="pt-4 border-t border-gray-200 dark:border-gray-600">
												<p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Contact Support Form */}
				<section className="py-16">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Still need help?</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300">
								Send us a message and we'll get back to you soon
							</p>
						</div>
						<div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
							<form className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Name
										</label>
										<input
											type="text"
											className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="Your full name"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Email
										</label>
										<input
											type="email"
											className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="your.email@example.com"
										/>
									</div>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Topic
									</label>
									<select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
										<option>Select a topic</option>
										<option>Account Help</option>
										<option>Booking Issue</option>
										<option>Technical Problem</option>
										<option>Payment Question</option>
										<option>Safety Concern</option>
										<option>General Question</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Message
									</label>
									<textarea
										rows={6}
										className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
										placeholder="Describe your question or issue in detail..."
									/>
								</div>
								<button className="w-full flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
									<Send className="h-5 w-5 mr-2" />
									Send Message
								</button>
							</form>
						</div>
					</div>
				</section>

				{/* Support Info */}
				<section className="py-16 bg-blue-50 dark:bg-blue-900/10">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
								<MessageCircle className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Live Chat</h3>
								<p className="text-gray-600 dark:text-gray-300 mb-4">Get instant help from our support team</p>
								<button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
									Start Chat
								</button>
							</div>
							<div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
								<Mail className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email Support</h3>
								<p className="text-gray-600 dark:text-gray-300 mb-4">support@flatswaps.com</p>
								<div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
									<Clock className="h-4 w-4 mr-2" />
									Response within 4 hours
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Demo Notice */}
				<section className="py-8 bg-gray-100 dark:bg-gray-800">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<p className="text-sm text-gray-600 dark:text-gray-400">
							<strong>Note:</strong> This is a demonstration website. All help content and support features are
							simulated for illustrative purposes only.
						</p>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
