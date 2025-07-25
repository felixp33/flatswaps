// src/app/press/page.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
	Download,
	Calendar,
	ExternalLink,
	Mail,
	Phone,
	FileText,
	Image as ImageIcon,
	Award,
	Users,
	Globe,
	TrendingUp,
	GraduationCap,
	BookOpen,
} from "lucide-react";

export default function PressPage() {
	const pressReleases = [
		{
			date: "December 15, 2026",
			headline: "Flatswaps Expands to 10 Cities, Reaches 6,000 Active Students",
			summary:
				"Platform celebrates successful expansion phase with €125k in monthly revenue as student apartment swap network grows across major European university cities including new markets in Scandinavia and Eastern Europe.",
			type: "Company News",
		},
		{
			date: "September 20, 2026",
			headline: "Flatswaps Launches Mobile Apps for iOS and Android",
			summary:
				"New mobile applications make student apartment swapping more accessible, with enhanced matching algorithms and real-time chat functionality designed specifically for the mobile-first student generation.",
			type: "Product Launch",
		},
		{
			date: "June 10, 2026",
			headline: "Flatswaps Secures Seed Investment to Scale Operations",
			summary:
				"Following successful pilot program in 4 cities (Berlin, Enschede, Warsaw, Trondheim) with 4,000 users and €73k monthly revenue, investors back platform's expansion to serve growing European student community.",
			type: "Funding",
		},
		{
			date: "January 15, 2026",
			headline: "Flatswaps Completes Desktop and Mobile Platform Development",
			summary:
				"After successful MVP launch and product iteration phase, platform now offers complete desktop and mobile experience with improved matchmaking algorithms and enhanced safety features for student housing exchanges.",
			type: "Product Launch",
		},
	];

	const mediaAssets = [
		{
			category: "Logos & Brand",
			items: [
				{ name: "Flatswaps Logo (PNG)", size: "2.1 MB", format: "PNG" },
				{ name: "Flatswaps Logo (SVG)", size: "12 KB", format: "SVG" },
				{ name: "Flatswaps Logo (White)", size: "1.8 MB", format: "PNG" },
				{ name: "Flatswaps Icon Only", size: "456 KB", format: "PNG" },
				{ name: "Brand Style Guide", size: "5.2 MB", format: "PDF" },
			],
		},
		{
			category: "Platform Screenshots",
			items: [
				{ name: "Student Dashboard", size: "1.8 MB", format: "PNG" },
				{ name: "Apartment Listings", size: "2.3 MB", format: "PNG" },
				{ name: "Mobile App Interface", size: "2.1 MB", format: "PNG" },
				{ name: "University Verification", size: "1.9 MB", format: "PNG" },
			],
		},
		{
			category: "Founder Photos",
			items: [
				{ name: "Emma Larsson, CEO", size: "3.2 MB", format: "JPG" },
				{ name: "Thomas Mueller, CTO", size: "2.9 MB", format: "JPG" },
				{ name: "Founder Team Photo", size: "4.1 MB", format: "JPG" },
			],
		},
		{
			category: "Student Stories",
			items: [
				{ name: "Barcelona Exchange", size: "2.8 MB", format: "JPG" },
				{ name: "Berlin Student Life", size: "3.1 MB", format: "JPG" },
				{ name: "Amsterdam Study Abroad", size: "2.6 MB", format: "JPG" },
			],
		},
	];

	const mediaLogos = [
		"The PIE News",
		"Study International",
		"Times Higher Education",
		"Erasmus Student Network",
		"Study.EU",
		"Study in Europe",
		"EdTech Hub",
		"Campus France",
		"DAAD",
		"Nuffic",
	];

	const keyStats = [
		{ number: "6,000+", label: "Active Students" },
		{ number: "10", label: "European Cities" },
		{ number: "€125k", label: "Monthly Revenue" },
		{ number: "4.8★", label: "Average Rating" },
	];

	const executiveTeam = [
		{
			name: "Emma Larsson",
			title: "Co-Founder & CEO",
			bio: "Former Erasmus student who experienced firsthand the challenges of finding affordable housing abroad. MBA from INSEAD, passionate about making study abroad accessible to all students regardless of financial background.",
			email: "emma@flatswaps.com",
		},
		{
			name: "Thomas Mueller",
			title: "Co-Founder & CTO",
			bio: "Computer Science graduate from TU Munich who built the first version of Flatswaps during his exchange semester in Barcelona. Former software engineer at N26, specializing in secure peer-to-peer platforms.",
			email: "thomas@flatswaps.com",
		},
	];

	return (
		<>
			<Header />
			<main className="min-h-screen bg-white dark:bg-gray-900">
				{/* Header */}
				<section className="py-12 bg-gray-50 dark:bg-gray-800">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
							<div className="mb-6 lg:mb-0">
								<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Press Room</h1>
								<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
									Media resources, press releases, and brand assets for Flatswaps, Europe's leading student
									apartment exchange platform.
								</p>
							</div>
							<div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Media Contact</h3>
								<div className="space-y-3">
									<div className="flex items-center text-gray-600 dark:text-gray-300">
										<Mail className="h-4 w-4 mr-3" />
										<a href="mailto:press@flatswaps.com" className="hover:text-blue-600">
											press@flatswaps.com
										</a>
									</div>
									<div className="flex items-center text-gray-600 dark:text-gray-300">
										<Phone className="h-4 w-4 mr-3" />
										<span>+49 30 1234-PRESS</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Company Overview */}
				<section className="py-12">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							<div className="lg:col-span-2">
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About Flatswaps</h2>
								<div className="prose prose-gray dark:prose-invert max-w-none">
									<p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
										Founded in 2025, Flatswaps is revolutionizing student housing across Europe through secure
										apartment exchanges. Our platform connects students studying abroad, enabling them to swap
										apartments and experience authentic local living while dramatically reducing accommodation
										costs.
									</p>
									<p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
										With over 8,500 verified student members across 15 European countries, Flatswaps has
										facilitated more than 5,000 successful apartment exchanges, saving students collectively
										over €15 million in accommodation costs while fostering meaningful cultural connections.
									</p>
									<p className="text-gray-600 dark:text-gray-300 leading-relaxed">
										The company is headquartered in Berlin with a distributed team across Europe, reflecting
										our commitment to supporting the diverse European student community and making study
										abroad accessible regardless of financial background.
									</p>
								</div>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Statistics</h3>
								<div className="grid grid-cols-2 gap-4">
									{keyStats.map((stat, index) => (
										<div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
											<div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
												{stat.number}
											</div>
											<div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Press Releases */}
				<section className="py-12 bg-gray-50 dark:bg-gray-800">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Latest Press Releases</h2>
						<div className="space-y-6">
							{pressReleases.map((release, index) => (
								<div
									key={index}
									className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
								>
									<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
										<div className="flex items-center space-x-4 mb-2 sm:mb-0">
											<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
												{release.type}
											</span>
											<div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
												<Calendar className="h-4 w-4 mr-2" />
												{release.date}
											</div>
										</div>
										<button className="flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
											<FileText className="h-4 w-4 mr-2" />
											Download PDF
										</button>
									</div>
									<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
										{release.headline}
									</h3>
									<p className="text-gray-600 dark:text-gray-300 leading-relaxed">{release.summary}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Media Assets */}
				<section className="py-12">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex justify-between items-center mb-8">
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white">Media Assets & Brand Kit</h2>
							<button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
								<Download className="h-4 w-4 mr-2" />
								Download All Assets
							</button>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{mediaAssets.map((category, index) => (
								<div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
										<ImageIcon className="h-5 w-5 mr-2" />
										{category.category}
									</h3>
									<div className="space-y-3">
										{category.items.map((item, itemIndex) => (
											<div
												key={itemIndex}
												className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600"
											>
												<div>
													<p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
													<p className="text-xs text-gray-500 dark:text-gray-400">
														{item.format} • {item.size}
													</p>
												</div>
												<button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
													<Download className="h-4 w-4" />
												</button>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Executive Team */}
				<section className="py-12 bg-gray-50 dark:bg-gray-800">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Founding Team</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{executiveTeam.map((exec, index) => (
								<div
									key={index}
									className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
								>
									<div className="flex items-start space-x-4">
										<div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
											{exec.name
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</div>
										<div className="flex-1">
											<h3 className="text-lg font-semibold text-gray-900 dark:text-white">{exec.name}</h3>
											<p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{exec.title}</p>
											<p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
												{exec.bio}
											</p>
											<a
												href={`mailto:${exec.email}`}
												className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
											>
												{exec.email}
											</a>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Media Coverage */}
				<section className="py-12">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">As Featured In</h2>
						<div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
							{mediaLogos.map((logo, index) => (
								<div key={index} className="text-center">
									<div className="h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
										<span className="text-gray-600 dark:text-gray-300 font-medium text-sm">{logo}</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Awards & Recognition */}
				<section className="py-12 bg-gray-50 dark:bg-gray-800">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Awards & Recognition</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="bg-white dark:bg-gray-700 p-6 rounded-lg text-center">
								<GraduationCap className="h-12 w-12 text-blue-500 mx-auto mb-4" />
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									Best EdTech Innovation 2026
								</h3>
								<p className="text-gray-600 dark:text-gray-300">European EdTech Awards</p>
							</div>
							<div className="bg-white dark:bg-gray-700 p-6 rounded-lg text-center">
								<Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									Student Choice Award
								</h3>
								<p className="text-gray-600 dark:text-gray-300">Erasmus Student Network 2026</p>
							</div>
							<div className="bg-white dark:bg-gray-700 p-6 rounded-lg text-center">
								<TrendingUp className="h-12 w-12 text-purple-500 mx-auto mb-4" />
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									Rising Startup of the Year
								</h3>
								<p className="text-gray-600 dark:text-gray-300">Berlin Startup Awards 2026</p>
							</div>
						</div>
					</div>
				</section>

				{/* Student Impact Section */}
				<section className="py-12">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Student Impact</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							<div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
								<div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">€15M+</div>
								<div className="text-gray-600 dark:text-gray-300">Total Student Savings</div>
							</div>
							<div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
								<div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">€3,000</div>
								<div className="text-gray-600 dark:text-gray-300">Average Savings per Exchange</div>
							</div>
							<div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
								<div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">4.8★</div>
								<div className="text-gray-600 dark:text-gray-300">Average Student Rating</div>
							</div>
							<div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
								<div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">92%</div>
								<div className="text-gray-600 dark:text-gray-300">Would Recommend to Friends</div>
							</div>
						</div>
					</div>
				</section>

				{/* Demo Notice */}
				<section className="py-8 bg-gray-100 dark:bg-gray-800">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<p className="text-sm text-gray-600 dark:text-gray-400">
							<strong>Note:</strong> This is a demonstration website. Flatswaps is a fictional company and all
							press releases, awards, and media coverage are simulated for illustrative purposes.
						</p>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
