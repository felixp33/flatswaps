"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const rotatingPhrases = [
	"your FlatSwap?",
	"a new chapter?",
	"living like a local?",
	"your adventure?",
	"your study abroad?",
];

export default function CtaSection() {
	const [index, setIndex] = useState(0);
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			// Fade out
			setIsVisible(false);

			// After fade out completes, change text and fade in
			setTimeout(() => {
				setIndex((prevIndex) => (prevIndex + 1) % rotatingPhrases.length);
				setIsVisible(true);
			}, 250); // Half of transition duration
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		<section className="py-16 md:py-24 bg-blue-600">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl flex justify-center items-baseline">
					<span className="inline-block">Ready to start</span>
					<span className="inline-block" style={{ width: "10px" }}></span>
					<span
						className={`inline-block text-left transition-opacity duration-500 ease-in-out ${
							isVisible ? "opacity-100" : "opacity-0"
						}`}
					>
						{rotatingPhrases[index]}
					</span>
				</h2>

				<p className="mt-3 max-w-2xl mx-auto text-xl text-blue-100 sm:mt-4">
					Join thousands of members already swapping homes around the world.
				</p>

				<div className="mt-8">
					<a
						href="/auth/signup"
						className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
					>
						Start Your FlatSwap Now
					</a>
				</div>
			</div>
		</section>
	);
}
