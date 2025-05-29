// src/app/blog/page.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, Clock, User, Tag, Search, Filter, ArrowRight, BookOpen, Globe, Home, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
	const featuredPost = {
		id: "featured",
		title: "The Ultimate Guide to Your First Home Exchange: Everything You Need to Know",
		excerpt:
			"Nervous about your first home swap? Our comprehensive guide covers everything from choosing the right partner to ensuring a smooth exchange experience.",
		author: "Sarah Chen",
		date: "May 28, 2025",
		readTime: "12 min read",
		category: "Guide",
		imageUrl: "/images/blog/first-home-exchange-guide.png",
		tags: ["Home Exchange", "Beginner", "Tips"],
	};

	const blogPosts = [
		{
			id: "1",
			title: "10 European Cities Perfect for Student Home Exchanges",
			excerpt:
				"Discover the best European destinations for student exchanges, from affordable living costs to vibrant cultural scenes.",
			author: "Emma Thompson",
			date: "May 25, 2025",
			readTime: "8 min read",
			category: "Destinations",
			imageUrl: "/images/blog/european-cities.png",
			tags: ["Europe", "Students", "Travel"],
		},
		{
			id: "2",
			title: "How to Create the Perfect Welcome Guide for Your Guests",
			excerpt:
				"Make your home exchange guests feel welcome with these essential tips for creating an informative and personal welcome guide.",
			author: "Marcus Rodriguez",
			date: "May 22, 2025",
			readTime: "6 min read",
			category: "Hosting",
			imageUrl: "/images/blog/welcome-guide.png",
			tags: ["Hosting", "Tips", "Guest Experience"],
		},
		{
			id: "3",
			title: "Sustainable Travel: Why Home Exchanges Are the Future",
			excerpt:
				"Explore how home swapping reduces environmental impact while providing authentic travel experiences.",
			author: "Alex Kim",
			date: "May 20, 2025",
			readTime: "10 min read",
			category: "Sustainability",
			imageUrl: "/images/blog/sustainable-travel.png",
			tags: ["Sustainability", "Environment", "Future of Travel"],
		},
		{
			id: "4",
			title: "Building Trust in the Home Exchange Community",
			excerpt:
				"Learn about our verification processes and how we maintain safety standards for all FlatSwaps members.",
			author: "Alex Kim",
			date: "May 18, 2025",
			readTime: "7 min read",
			category: "Safety",
			imageUrl: "/images/blog/building-trust.png",
			tags: ["Safety", "Verification", "Community"],
		},
		{
			id: "5",
			title: "Cultural Exchange Through Home Swapping: Real Stories",
			excerpt:
				"Heartwarming stories from our community about friendships formed and cultures discovered through home exchanges.",
			author: "Emma Thompson",
			date: "May 15, 2025",
			readTime: "9 min read",
			category: "Stories",
			imageUrl: "/images/blog/cultural-exchange.png",
			tags: ["Culture", "Stories", "Community"],
		},
		{
			id: "6",
			title: "Budget Travel Hacks: Save Money with Home Exchanges",
			excerpt:
				"Discover how home swapping can cut your travel costs by up to 70% while providing better experiences.",
			author: "Sarah Chen",
			date: "May 12, 2025",
			readTime: "5 min read",
			category: "Budget Travel",
			imageUrl: "/images/blog/budget-travel.png",
			tags: ["Budget", "Money Saving", "Tips"],
		},
	];

	const categories = [
		{ name: "All Posts", count: 24, active: true },
		{ name: "Destinations", count: 8, active: false },
		{ name: "Guide", count: 6, active: false },
		{ name: "Hosting", count: 4, active: false },
		{ name: "Stories", count: 3, active: false },
		{ name: "Safety", count: 2, active: false },
		{ name: "Budget Travel", count: 1, active: false },
	];

	const popularTags = [
		"Home Exchange",
		"Travel Tips",
		"Europe",
		"Students",
		"Budget Travel",
		"Safety",
		"Culture",
		"Sustainability",
		"Hosting",
		"First Timer",
	];

	return (
		<>
			<Header />
			<main className="min-h-screen bg-white dark:bg-gray-900">
				{/* Header */}
				<section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center">
							<div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-800 dark:text-blue-200 mb-6">
								<BookOpen className="h-4 w-4 mr-2" />
								FlatSwaps Blog
							</div>
							<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
								Stories, Tips & Guides for
								<span className="text-blue-600 dark:text-blue-400 block">Home Exchange Travelers</span>
							</h1>
							<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
								Discover insights, travel stories, and practical advice from our global community of home
								exchange enthusiasts.
							</p>
						</div>
					</div>
				</section>

				{/* Search and Filter */}
				<section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col md:flex-row gap-4 items-center justify-between">
							<div className="relative flex-1 max-w-md">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
								<input
									type="text"
									placeholder="Search articles..."
									className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div className="flex items-center space-x-4">
								<button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
									<Filter className="h-4 w-4 mr-2" />
									Filter
								</button>
								<select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
									<option>Latest Posts</option>
									<option>Most Popular</option>
									<option>Oldest First</option>
								</select>
							</div>
						</div>
					</div>
				</section>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="flex flex-col lg:flex-row gap-12">
						{/* Main Content */}
						<div className="flex-1">
							{/* Featured Post */}
							<div className="mb-12">
								<div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl overflow-hidden shadow-xl">
									<div className="flex flex-col lg:flex-row">
										<div className="lg:w-1/2 p-8 lg:p-12 text-white">
											<div className="flex items-center mb-4">
												<span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
													Featured
												</span>
											</div>
											<h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
												{featuredPost.title}
											</h2>
											<p className="text-blue-100 text-lg mb-6 leading-relaxed">{featuredPost.excerpt}</p>
											<div className="flex items-center justify-between">
												<div className="flex items-center space-x-4 text-blue-100">
													<div className="flex items-center">
														<User className="h-4 w-4 mr-2" />
														{featuredPost.author}
													</div>
													<div className="flex items-center">
														<Clock className="h-4 w-4 mr-2" />
														{featuredPost.readTime}
													</div>
												</div>
												<Link
													href={`/blog/${featuredPost.id}`}
													className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
												>
													Read More
													<ArrowRight className="h-4 w-4 ml-2" />
												</Link>
											</div>
										</div>
										<div className="lg:w-1/2 relative min-h-64 lg:min-h-full">
											<div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20"></div>
											{/* Image placeholder */}
											<div className="w-full h-full bg-white/10 flex items-center justify-center">
												<Home className="h-16 w-16 text-white/50" />
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Blog Posts Grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								{blogPosts.map((post) => (
									<article
										key={post.id}
										className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300"
									>
										<div className="relative h-48 bg-gray-200 dark:bg-gray-700">
											{/* Image placeholder */}
											<div className="w-full h-full flex items-center justify-center">
												<Globe className="h-12 w-12 text-gray-400" />
											</div>
											<div className="absolute top-4 left-4">
												<span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
													{post.category}
												</span>
											</div>
										</div>
										<div className="p-6">
											<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 leading-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
												<Link href={`/blog/${post.id}`}>{post.title}</Link>
											</h3>
											<p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{post.excerpt}</p>
											<div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
												<div className="flex items-center space-x-4">
													<div className="flex items-center">
														<User className="h-4 w-4 mr-1" />
														{post.author}
													</div>
													<div className="flex items-center">
														<Calendar className="h-4 w-4 mr-1" />
														{post.date}
													</div>
												</div>
												<div className="flex items-center">
													<Clock className="h-4 w-4 mr-1" />
													{post.readTime}
												</div>
											</div>
											<div className="flex flex-wrap gap-2">
												{post.tags.map((tag, index) => (
													<span
														key={index}
														className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
													>
														<Tag className="h-3 w-3 mr-1" />
														{tag}
													</span>
												))}
											</div>
										</div>
									</article>
								))}
							</div>

							{/* Load More */}
							<div className="text-center mt-12">
								<button className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
									Load More Articles
									<ArrowRight className="h-5 w-5 ml-2" />
								</button>
							</div>
						</div>

						{/* Sidebar */}
						<aside className="lg:w-80">
							{/* Categories */}
							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
								<div className="space-y-2">
									{categories.map((category, index) => (
										<button
											key={index}
											className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
												category.active
													? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
													: "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
											}`}
										>
											<span>{category.name}</span>
											<span className="text-sm">{category.count}</span>
										</button>
									))}
								</div>
							</div>

							{/* Popular Tags */}
							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Popular Tags</h3>
								<div className="flex flex-wrap gap-2">
									{popularTags.map((tag, index) => (
										<button
											key={index}
											className="inline-flex items-center px-3 py-2 rounded-full text-sm bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors"
										>
											<Tag className="h-3 w-3 mr-1" />
											{tag}
										</button>
									))}
								</div>
							</div>

							{/* Newsletter Signup */}
							<div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
								<div className="text-center">
									<Heart className="h-12 w-12 mx-auto mb-4 text-white/80" />
									<h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
									<p className="text-blue-100 mb-4 text-sm">
										Get the latest travel tips and home exchange stories delivered to your inbox.
									</p>
									<div className="space-y-3">
										<input
											type="email"
											placeholder="Enter your email"
											className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-blue-100 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
										/>
										<button className="w-full px-4 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
											Subscribe
										</button>
									</div>
								</div>
							</div>
						</aside>
					</div>
				</div>

				{/* Demo Notice */}
				<section className="py-8 bg-gray-100 dark:bg-gray-800">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<p className="text-sm text-gray-600 dark:text-gray-400">
							<strong>Note:</strong> This is a demonstration website. All blog posts and content are simulated
							for illustrative purposes only.
						</p>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
