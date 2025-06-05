// src/data/mockMatches.ts

export const mockMatches = [
	{
		id: "1",
		status: "new", // new, pending, accepted, rejected
		type: "bilateral", // bilateral, multilateral
		matchScore: 95,
		createdAt: "2 hours ago",
		participants: [
			{
				id: "user1",
				name: "Sarah Johnson",
				location: "Barcelona, Spain",
				rating: 4.8,
				reviews: 34,
				initials: "SJ",
				hasAccepted: null, // null for new matches, true/false for pending
				property: {
					title: "Cozy Apartment Near Beach",
					location: "Barcelona, Spain",
					bedrooms: 2,
					bathrooms: 1,
					guests: 4,
				},
				swapDates: "Mar 15-25, 2024",
				contactInfo: {
					email: "sarah.j@email.com",
					phone: "+34 123 456 789",
				},
			},
			{
				id: "currentUser",
				name: "You",
				location: "New York, USA",
				hasAccepted: null,
				property: {
					title: "Manhattan Loft",
					location: "New York, USA",
					bedrooms: 1,
					bathrooms: 1,
					guests: 2,
				},
				swapDates: "Apr 10-20, 2024",
			},
		],
	},
	{
		id: "2",
		status: "pending",
		type: "multilateral",
		matchScore: 89,
		createdAt: "1 day ago",
		participants: [
			{
				id: "user2",
				name: "Marco Rodriguez",
				location: "Rome, Italy",
				rating: 4.9,
				reviews: 67,
				initials: "MR",
				hasAccepted: true,
				property: {
					title: "Historic Villa in Trastevere",
					location: "Rome, Italy",
					bedrooms: 3,
					bathrooms: 2,
					guests: 6,
				},
				swapDates: "Jun 5-15, 2024",
				contactInfo: {
					email: "marco.r@email.com",
					phone: "+39 123 456 789",
				},
			},
			{
				id: "user3",
				name: "Emma Wilson",
				location: "London, UK",
				rating: 4.7,
				reviews: 28,
				initials: "EW",
				hasAccepted: false, // hasn't accepted yet
				property: {
					title: "Modern Flat in Shoreditch",
					location: "London, UK",
					bedrooms: 1,
					bathrooms: 1,
					guests: 2,
				},
				swapDates: "Jun 1-10, 2024",
				contactInfo: {
					email: "emma.w@email.com",
					phone: "+44 123 456 789",
				},
			},
			{
				id: "currentUser",
				name: "You",
				location: "New York, USA",
				hasAccepted: true, // user has already accepted
				property: {
					title: "Manhattan Loft",
					location: "New York, USA",
					bedrooms: 1,
					bathrooms: 1,
					guests: 2,
				},
				swapDates: "Jun 12-22, 2024",
			},
		],
	},
	{
		id: "3",
		status: "accepted",
		type: "bilateral",
		matchScore: 92,
		createdAt: "3 days ago",
		participants: [
			{
				id: "user4",
				name: "Alex Chen",
				location: "Tokyo, Japan",
				rating: 4.6,
				reviews: 15,
				initials: "AC",
				hasAccepted: true,
				property: {
					title: "Minimalist Studio in Shibuya",
					location: "Tokyo, Japan",
					bedrooms: 1,
					bathrooms: 1,
					guests: 2,
				},
				swapDates: "Feb 20-28, 2024",
				contactInfo: {
					email: "alex.chen@email.com",
					phone: "+81 123 456 789",
				},
			},
			{
				id: "currentUser",
				name: "You",
				location: "New York, USA",
				hasAccepted: true,
				property: {
					title: "Manhattan Loft",
					location: "New York, USA",
					bedrooms: 1,
					bathrooms: 1,
					guests: 2,
				},
				swapDates: "Feb 20-28, 2024",
			},
		],
	},
	{
		id: "4",
		status: "rejected",
		type: "bilateral",
		matchScore: 78,
		createdAt: "1 week ago",
		participants: [
			{
				id: "user5",
				name: "Lisa Wang",
				location: "Berlin, Germany",
				rating: 4.4,
				reviews: 19,
				initials: "LW",
				hasAccepted: null, // was rejected before everyone could accept
				property: {
					title: "Modern Apartment in Mitte",
					location: "Berlin, Germany",
					bedrooms: 2,
					bathrooms: 1,
					guests: 3,
				},
				swapDates: "Mar 1-10, 2024",
				contactInfo: {
					email: "lisa.w@email.com",
					phone: "+49 123 456 789",
				},
			},
			{
				id: "currentUser",
				name: "You",
				location: "New York, USA",
				hasAccepted: null,
				property: {
					title: "Manhattan Loft",
					location: "New York, USA",
					bedrooms: 1,
					bathrooms: 1,
					guests: 2,
				},
				swapDates: "Mar 1-10, 2024",
			},
		],
	},
];
