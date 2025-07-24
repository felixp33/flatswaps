"use client";

import Image from "next/image";
import Link from "next/link";

export default function MinimalFooter() {
	return (
		<footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-6 text-center">
			<Link href="/" className="inline-flex items-center justify-center space-x-2 text-xl font-bold text-blue-600">
				<Image src="/favicon-256x256.png" alt="Flatswaps" width={32} height={32} className="h-8 w-8" />
				<span>Flatswaps</span>
			</Link>
			<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Swap smarter. Travel farther.</p>
		</footer>
	);
}
