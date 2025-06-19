// src/app/page.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturedProperties from "@/components/landing/FeaturedProperties";
import PopularDestinations from "@/components/landing/PopularDestination";
import Testimonials from "@/components/landing/Testimonials";
import FAQSection from "@/components/landing/FAQSection";
import CtaSection from "@/components/landing/CTASection";
import { featuredProperties, testimonials } from "@/lib/data/MockData";
import PricingSection from "@/components/landing/PricingSection";

export default function HomePage() {
	return (
		<>
			<Header />
			<main>
				<HeroSection />
				<HowItWorks />
				<PopularDestinations />
				<Testimonials testimonials={testimonials} />
				<FAQSection />
				<CtaSection />
			</main>
			<Footer />
		</>
	);
}
