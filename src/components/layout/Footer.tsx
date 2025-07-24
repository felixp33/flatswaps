// src/components/layout/Footer.tsx
import Link from "next/link";
import { Mail } from "lucide-react";

// Social media icons using Simple Icons patterns
const FacebookIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" fill="currentColor">
		<path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z" />
	</svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" fill="currentColor">
		<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
	</svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" fill="currentColor">
		<path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
	</svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" fill="currentColor">
		<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
	</svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" fill="currentColor">
		<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
	</svg>
);

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
							<a
								href="https://facebook.com/Flatswaps"
								className="text-gray-300 hover:text-white transition-colors"
								aria-label="Facebook"
								target="_blank"
								rel="noopener noreferrer"
							>
								<FacebookIcon className="h-5 w-5" />
							</a>
							<a
								href="https://twitter.com/Flatswaps"
								className="text-gray-300 hover:text-white transition-colors"
								aria-label="Twitter"
								target="_blank"
								rel="noopener noreferrer"
							>
								<TwitterIcon className="h-5 w-5" />
							</a>
							<a
								href="https://instagram.com/Flatswaps"
								className="text-gray-300 hover:text-white transition-colors"
								aria-label="Instagram"
								target="_blank"
								rel="noopener noreferrer"
							>
								<InstagramIcon className="h-5 w-5" />
							</a>
							<a
								href="https://tiktok.com/@Flatswaps"
								className="text-gray-300 hover:text-white transition-colors"
								aria-label="TikTok"
								target="_blank"
								rel="noopener noreferrer"
							>
								<TikTokIcon className="h-5 w-5" />
							</a>
							<a
								href="https://linkedin.com/company/Flatswaps"
								className="text-gray-300 hover:text-white transition-colors"
								aria-label="LinkedIn"
								target="_blank"
								rel="noopener noreferrer"
							>
								<LinkedInIcon className="h-5 w-5" />
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
					<div className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Flatswaps. All rights reserved.</div>
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
