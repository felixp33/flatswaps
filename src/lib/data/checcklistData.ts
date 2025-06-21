// src/lib/data/checklistData.ts

export interface ChecklistItem {
	id: string;
	text: string;
	urgent: boolean;
	timeframe: string;
	description?: string;
}

export type IconType = "FileText" | "BookOpen" | "MapPin" | "CreditCard" | "Globe" | "Plane";
export type ColorType = "blue" | "purple" | "green" | "orange" | "indigo" | "teal";
export type UrgencyType = "high" | "medium" | "low";

export interface ChecklistSection {
	title: string;
	icon: IconType;
	color: ColorType;
	urgency: UrgencyType;
	items: ChecklistItem[];
}

export const checklistSections = [
	{
		title: "Legal & Documentation",
		icon: "FileText" as const,
		color: "blue" as const,
		urgency: "high" as const,
		items: [
			{
				id: "visa",
				text: "Apply for student visa/permits",
				urgent: true,
				timeframe: "2-3 months before",
				description:
					"Research visa requirements for your destination country and apply early as processing can take weeks.",
			},
			{
				id: "passport",
				text: "Check passport validity (6+ months remaining)",
				urgent: true,
				timeframe: "3-4 months before",
				description: "Most countries require at least 6 months validity remaining on your passport.",
			},
			{
				id: "insurance",
				text: "Get international health insurance",
				urgent: true,
				timeframe: "1-2 months before",
				description: "Ensure you have comprehensive health coverage for your destination country.",
			},
			{
				id: "documents",
				text: "Make certified copies of all important documents",
				urgent: true,
				timeframe: "1 month before",
				description: "Passport, visa, birth certificate, academic transcripts, insurance documents.",
			},
			{
				id: "transcripts",
				text: "Request official transcripts and diplomas",
				urgent: false,
				timeframe: "2-3 months before",
				description: "Universities may require official academic records for course registration.",
			},
			{
				id: "emergency",
				text: "Register with your embassy/consulate",
				urgent: false,
				timeframe: "After arrival",
				description: "Let your home country's embassy know you're studying abroad.",
			},
		],
	},
	{
		title: "Academic Preparation",
		icon: "BookOpen",
		color: "purple",
		urgency: "high",
		items: [
			{
				id: "courses",
				text: "Register for courses at host university",
				urgent: true,
				timeframe: "2-3 months before",
				description: "Popular courses fill up quickly, so register as early as possible.",
			},
			{
				id: "language-test",
				text: "Take required language proficiency tests",
				urgent: true,
				timeframe: "3-4 months before",
				description: "TOEFL, IELTS, or other language tests may be required for course admission.",
			},
			{
				id: "credits",
				text: "Confirm credit transfer agreements",
				urgent: true,
				timeframe: "2 months before",
				description: "Ensure your courses will count toward your home degree requirements.",
			},
			{
				id: "advisors",
				text: "Meet with academic advisors (home & host)",
				urgent: false,
				timeframe: "1-2 months before",
				description: "Discuss course selection and academic goals with advisors at both universities.",
			},
			{
				id: "materials",
				text: "Research required textbooks and materials",
				urgent: false,
				timeframe: "1 month before",
				description: "Check if you can buy books cheaper at home or if digital versions are available.",
			},
			{
				id: "orientation",
				text: "Sign up for university orientation programs",
				urgent: true,
				timeframe: "1-2 months before",
				description: "Orientation helps you meet other students and learn about campus resources.",
			},
		],
	},
	{
		title: "Housing & Living",
		icon: "MapPin",
		color: "green",
		urgency: "medium",
		items: [
			{
				id: "housing",
				text: "Secure housing through FlatSwaps",
				urgent: false,
				timeframe: "2-4 months before",
				description: "Connect with other exchange students for authentic local living experiences.",
			},
			{
				id: "neighborhood",
				text: "Research your neighborhood and local area",
				urgent: false,
				timeframe: "1 month before",
				description: "Learn about transportation, safety, shopping, and entertainment options.",
			},
			{
				id: "utilities",
				text: "Understand utility setup and internet options",
				urgent: false,
				timeframe: "2 weeks before",
				description: "Know how to set up electricity, water, heating, and internet services.",
			},
			{
				id: "transport",
				text: "Research local transportation options",
				urgent: false,
				timeframe: "1 month before",
				description: "Public transport, student discounts, bike rentals, and walking routes.",
			},
			{
				id: "emergency-contacts",
				text: "Learn emergency numbers and procedures",
				urgent: true,
				timeframe: "Before departure",
				description: "Police, fire, medical emergency numbers and how to contact local authorities.",
			},
			{
				id: "local-services",
				text: "Locate nearby grocery stores, pharmacies, hospitals",
				urgent: false,
				timeframe: "After arrival",
				description: "Map out essential services in your neighborhood for easy access.",
			},
		],
	},
	{
		title: "Financial Planning",
		icon: "CreditCard",
		color: "orange",
		urgency: "high",
		items: [
			{
				id: "bank",
				text: "Open local bank account or arrange international banking",
				urgent: true,
				timeframe: "1 month before",
				description: "Avoid international transaction fees and make local payments easier.",
			},
			{
				id: "budget",
				text: "Create detailed monthly budget for living expenses",
				urgent: false,
				timeframe: "2 months before",
				description: "Research local costs for food, transport, entertainment, and unexpected expenses.",
			},
			{
				id: "notify-bank",
				text: "Notify home bank of international travel",
				urgent: true,
				timeframe: "2 weeks before",
				description: "Prevent your cards from being blocked due to unusual activity abroad.",
			},
			{
				id: "tax",
				text: "Understand tax obligations in host country",
				urgent: false,
				timeframe: "After arrival",
				description: "Some countries require tax registration for students staying longer periods.",
			},
			{
				id: "currency",
				text: "Research currency exchange and payment methods",
				urgent: false,
				timeframe: "1 month before",
				description: "Best exchange rates, local payment apps, and cash vs. card preferences.",
			},
			{
				id: "scholarships",
				text: "Apply for exchange scholarships or grants",
				urgent: false,
				timeframe: "3-6 months before",
				description: "Many organizations offer funding specifically for exchange students.",
			},
		],
	},
	{
		title: "Cultural & Social Integration",
		icon: "Globe",
		color: "indigo",
		urgency: "medium",
		items: [
			{
				id: "language-learn",
				text: "Start learning local language basics",
				urgent: false,
				timeframe: "3-6 months before",
				description: "Even basic phrases will help you connect with locals and navigate daily life.",
			},
			{
				id: "culture",
				text: "Research local customs, etiquette, and culture",
				urgent: false,
				timeframe: "1-2 months before",
				description: "Understanding cultural norms helps avoid misunderstandings and shows respect.",
			},
			{
				id: "groups",
				text: "Join exchange student groups and forums online",
				urgent: false,
				timeframe: "2-3 months before",
				description: "Connect with other exchange students for tips, friendships, and support.",
			},
			{
				id: "social-events",
				text: "Research social events and student activities",
				urgent: false,
				timeframe: "1 month before",
				description: "Find clubs, sports teams, and activities that match your interests.",
			},
			{
				id: "local-contacts",
				text: "Connect with local students or your swap partner",
				urgent: false,
				timeframe: "1 month before",
				description: "Having local friends makes your experience richer and more authentic.",
			},
			{
				id: "cultural-sites",
				text: "Make a list of places to visit and explore",
				urgent: false,
				timeframe: "Anytime",
				description: "Research museums, landmarks, natural sites, and hidden local gems.",
			},
		],
	},
	{
		title: "Travel & Logistics",
		icon: "Plane",
		color: "teal",
		urgency: "medium",
		items: [
			{
				id: "flights",
				text: "Book flights and arrange airport transfers",
				urgent: false,
				timeframe: "2-3 months before",
				description: "Book early for better prices and ensure arrival before orientation dates.",
			},
			{
				id: "packing",
				text: "Plan packing based on climate and culture",
				urgent: false,
				timeframe: "2 weeks before",
				description: "Research weather patterns and dress codes to pack appropriately.",
			},
			{
				id: "sim-card",
				text: "Research mobile phone and SIM card options",
				urgent: false,
				timeframe: "1 month before",
				description: "Stay connected from day one with local mobile service or international plans.",
			},
			{
				id: "power-adapters",
				text: "Get appropriate power adapters and converters",
				urgent: false,
				timeframe: "1 month before",
				description: "Different countries use different plug types and voltages for electronics.",
			},
			{
				id: "medications",
				text: "Ensure sufficient supply of medications",
				urgent: true,
				timeframe: "1 month before",
				description: "Bring extra supply and prescriptions; research availability of medications abroad.",
			},
			{
				id: "travel-insurance",
				text: "Purchase comprehensive travel insurance",
				urgent: true,
				timeframe: "1 month before",
				description: "Coverage for trip cancellation, lost luggage, and emergency situations.",
			},
		],
	},
] as const;

// Helper functions for working with checklist data
export const getUrgentItems = (): ChecklistItem[] => {
	return checklistSections.flatMap((section) => section.items.filter((item) => item.urgent));
};

export const getItemsByTimeframe = (timeframe: string): ChecklistItem[] => {
	return checklistSections.flatMap((section) =>
		section.items.filter((item) => item.timeframe.toLowerCase().includes(timeframe.toLowerCase()))
	);
};

export const getTotalItemCount = (): number => {
	return checklistSections.reduce((total, section) => total + section.items.length, 0);
};

export const getSectionProgress = (sectionTitle: string, completedItems: Set<string>): number => {
	const section = checklistSections.find((s) => s.title === sectionTitle);
	if (!section) return 0;

	const completedInSection = section.items.filter((item) => completedItems.has(item.id)).length;
	return section.items.length > 0 ? (completedInSection / section.items.length) * 100 : 0;
};
