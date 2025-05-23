// src/app/page.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturedProperties from "@/components/landing/FeaturedProperties";
import PopularDestinations from "@/components/landing/PopularDestination";
import Testimonials from "@/components/landing/Testimonials";
import { featuredProperties, popularDestinations, testimonials } from "@/lib/data/MockData";
import CtaSection from "@/components/landing/CTASection";

export default function HomePage() {
	return (
		<>
			<Header />
			<main>
				<HeroSection />
				<HowItWorks />
				<FeaturedProperties properties={featuredProperties} />
				<PopularDestinations destinations={popularDestinations} />
				<Testimonials testimonials={testimonials} />
				<CtaSection />
			</main>
			<Footer />
		</>
	);
}
