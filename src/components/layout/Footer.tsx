// src/components/layout/Footer.tsx
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
	return (
		<footer className="bg-gray-900 text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Company */}
					<div>
						<h3 className="text-lg font-semibold mb-4">Company</h3>
						<ul className="space-y-3">
							<li>
								<Link href="/about" className="text-gray-300 hover:text-white transition-colors">
									About Us
								</Link>
							</li>
							<li>
								<Link href="/careers" className="text-gray-300 hover:text-white transition-colors">
									Careers
								</Link>
							</li>
							<li>
								<Link href="/press" className="text-gray-300 hover:text-white transition-colors">
									Press Room
								</Link>
							</li>
							<li>
								<Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
									Blog
								</Link>
							</li>
						</ul>
					</div>

					{/* Support */}
					<div>
						<h3 className="text-lg font-semibold mb-4">Support</h3>
						<ul className="space-y-3">
							<li>
								<Link href="/help" className="text-gray-300 hover:text-white transition-colors">
									Help & Support
								</Link>
							</li>
							<li>
								<Link href="/safety" className="text-gray-300 hover:text-white transition-colors">
									Safety & Trust
								</Link>
							</li>
						</ul>
					</div>

					{/* Legal */}
					<div>
						<h3 className="text-lg font-semibold mb-4">Legal</h3>
						<ul className="space-y-3">
							<li>
								<Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
									Terms of Service
								</Link>
							</li>
							<li>
								<Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
									Privacy Policy
								</Link>
							</li>
						</ul>
					</div>

					{/* Connect */}
					<div>
						<h3 className="text-lg font-semibold mb-4">Connect</h3>
						<div className="flex space-x-4 mb-4">
							<a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
								<Facebook className="h-5 w-5" />
							</a>
							<a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
								<Twitter className="h-5 w-5" />
							</a>
							<a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Instagram">
								<Instagram className="h-5 w-5" />
							</a>
							<a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="LinkedIn">
								<Linkedin className="h-5 w-5" />
							</a>
						</div>
						<div className="text-gray-300 text-sm">
							<p className="mb-2">Subscribe to our newsletter</p>
							<div className="flex">
								<input
									type="email"
									placeholder="Your email"
									className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								<button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-md transition-colors">
									<Mail className="h-4 w-4" />
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom section */}
				<div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
					<div className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 FlatSwaps. All rights reserved.</div>
					<div className="text-gray-400 text-sm">
						<span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
							Demo Website
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
