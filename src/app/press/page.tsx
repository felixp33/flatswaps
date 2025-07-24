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
} from "lucide-react";

export default function PressPage() {
	const pressReleases = [
		{
			date: "May 15, 2025",
			headline: "flatswaps Reaches 50,000 Successful Home Exchanges Worldwide",
			summary:
				"Platform celebrates major milestone as global community of home swappers continues to grow, with new partnerships announced in Asia-Pacific region.",
			type: "Company News",
		},
		{
			date: "March 22, 2025",
			headline: "flatswaps Launches Student Exchange Program with 50+ Universities",
			summary:
				"New initiative makes study abroad more affordable through verified student-to-student home exchanges across Europe, North America, and Australia.",
			type: "Product Launch",
		},
		{
			date: "January 10, 2025",
			headline: "flatswaps Secures $15M Series A to Expand Global Operations",
			summary:
				"Funding round led by Travel Ventures will accelerate international expansion and enhance platform safety features for home exchange community.",
			type: "Funding",
		},
		{
			date: "November 8, 2024",
			headline: "flatswaps Named 'Best Travel Innovation' at Global Tourism Awards",
			summary:
				"Platform recognized for pioneering approach to sustainable travel and cultural exchange through peer-to-peer home swapping technology.",
			type: "Awards",
		},
	];

	const mediaAssets = [
		{
			category: "Logos",
			items: [
				{ name: "flatswaps Logo (PNG)", size: "2.1 MB", format: "PNG" },
				{ name: "flatswaps Logo (SVG)", size: "12 KB", format: "SVG" },
				{ name: "flatswaps Logo (White)", size: "1.8 MB", format: "PNG" },
				{ name: "flatswaps Icon Only", size: "456 KB", format: "PNG" },
			],
		},
		{
			category: "Executive Photos",
			items: [
				{ name: "Sarah Chen, CEO", size: "3.2 MB", format: "JPG" },
				{ name: "Marcus Rodriguez, CTO", size: "2.9 MB", format: "JPG" },
				{ name: "Executive Team Group", size: "4.1 MB", format: "JPG" },
			],
		},
		{
			category: "Product Screenshots",
			items: [
				{ name: "Platform Overview", size: "1.8 MB", format: "PNG" },
				{ name: "Mobile App Interface", size: "2.3 MB", format: "PNG" },
				{ name: "Property Listings", size: "2.1 MB", format: "PNG" },
			],
		},
		{
			category: "Brand Guidelines",
			items: [
				{ name: "Brand Style Guide", size: "5.2 MB", format: "PDF" },
				{ name: "Logo Usage Guidelines", size: "1.9 MB", format: "PDF" },
			],
		},
	];

	const mediaLogos = [
		"TechCrunch",
		"Forbes",
		"Travel + Leisure",
		"Skift",
		"The Guardian",
		"Wall Street Journal",
		"CNN Travel",
		"BBC",
		"Fast Company",
		"Wired",
	];

	const keyStats = [
		{ number: "25,000+", label: "Active Members" },
		{ number: "50,000+", label: "Successful Swaps" },
		{ number: "180", label: "Countries" },
		{ number: "4.9/5", label: "Average Rating" },
	];

	const executiveTeam = [
		{
			name: "Sarah Chen",
			title: "Co-Founder & CEO",
			bio: "Former Airbnb Product Manager with 8+ years in travel technology. MBA from Stanford, passionate about sustainable tourism and cultural exchange.",
			email: "sarah@flatswaps.com",
		},
		{
			name: "Marcus Rodriguez",
			title: "Co-Founder & CTO",
			bio: "Ex-Google Senior Software Engineer specializing in marketplace platforms. Computer Science PhD from MIT, advocate for ethical technology.",
			email: "marcus@flatswaps.com",
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
									Media resources, press releases, and brand assets for flatswaps, the world's leading home
									exchange platform.
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
										<span>+1 (555) 123-PRESS</span>
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
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About flatswaps</h2>
								<div className="prose prose-gray dark:prose-invert max-w-none">
									<p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
										Founded in 2023, flatswaps is revolutionizing travel through authentic home exchanges. Our
										platform connects travelers worldwide, enabling them to swap homes and experience
										destinations like locals while building meaningful cultural connections.
									</p>
									<p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
										With over 25,000 active members across 180 countries, flatswaps has facilitated more than
										50,000 successful home exchanges, saving travelers millions in accommodation costs while
										promoting sustainable tourism practices.
									</p>
									<p className="text-gray-600 dark:text-gray-300 leading-relaxed">
										The company is headquartered in San Francisco with team members distributed globally,
										reflecting our commitment to remote-first culture and diversity.
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
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Executive Team</h2>
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
								<Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									Best Travel Innovation 2024
								</h3>
								<p className="text-gray-600 dark:text-gray-300">Global Tourism Awards</p>
							</div>
							<div className="bg-white dark:bg-gray-700 p-6 rounded-lg text-center">
								<TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									Fastest Growing Startup
								</h3>
								<p className="text-gray-600 dark:text-gray-300">TechCrunch Awards 2024</p>
							</div>
							<div className="bg-white dark:bg-gray-700 p-6 rounded-lg text-center">
								<Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									Community Choice Award
								</h3>
								<p className="text-gray-600 dark:text-gray-300">Travel Weekly 2024</p>
							</div>
						</div>
					</div>
				</section>

				{/* Demo Notice */}
				<section className="py-8 bg-gray-100 dark:bg-gray-800">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<p className="text-sm text-gray-600 dark:text-gray-400">
							<strong>Note:</strong> This is a demonstration website. flatswaps is a fictional company and all
							press releases, awards, and media coverage are simulated for illustrative purposes.
						</p>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
