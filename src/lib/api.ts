// src/lib/api.ts - Updated for your existing profiles table
import { supabase } from "./supabase";
import { Conversation, Message } from "@/types/messages";

// Types matching your actual database structure
export interface Profile {
	user_id: string; // This matches your existing column name
	firstname?: string;
	lastname?: string;
	email?: string;
	income?: number;
	location?: string;
	birthdate?: string;
	sex?: string;
	phone?: string;
	languages?: string[];
	created_at?: string;
	updated_at?: string;
}

export interface Flat {
	id: string; // UUID
	owner_id: string; // UUID - references auth.users(id)
	title: string;
	description?: string;
	address?: string;
	city?: string;
	postal_code?: string;
	rent_amount?: number;
	deposit_amount?: number;
	available_from?: string;
	available_until?: string;
	room_count?: number;
	size_sqm?: number;
	furnished?: boolean;
	pets_allowed?: boolean;
	smoking_allowed?: boolean;
	images?: string[];
	created_at?: string;
	updated_at?: string;
}

export interface Search {
	id: string; // UUID
	user_id: string; // UUID
	title: string;
	city?: string;
	max_rent?: number;
	min_rooms?: number;
	max_rooms?: number;
	min_size?: number;
	max_size?: number;
	available_from?: string;
	available_until?: string;
	furnished?: boolean;
	pets_allowed?: boolean;
	smoking_allowed?: boolean;
	created_at?: string;
	updated_at?: string;
}

export interface Contract {
	id: string; // UUID
	user_id: string; // UUID
	flat_id?: string; // UUID
	landlord_name?: string;
	tenant_name?: string;
	start_date?: string;
	end_date?: string;
	monthly_rent?: number;
	deposit_amount?: number;
	status?: "active" | "pending" | "terminated";
	contract_file_url?: string;
	created_at?: string;
	updated_at?: string;
}

// Helper function to get current user
export async function getCurrentUser() {
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();
	if (error) {
		console.error("Error getting current user:", error);
		return null;
	}
	return user;
}

// Profile operations - using your existing table structure
export async function fetchProfile(userId?: string): Promise<Profile | null> {
	const targetUserId = userId || (await getCurrentUser())?.id;

	if (!targetUserId) {
		console.error("No user ID provided and no authenticated user");
		return null;
	}

	const { data, error } = await supabase
		.from("profiles")
		.select("*")
		.eq("user_id", targetUserId) // Using your existing column name
		.maybeSingle();

	if (error) {
		console.error("Error fetching profile:", error);
		return null;
	}

	return data;
}

export async function upsertProfile(profile: Partial<Profile>) {
	const user = await getCurrentUser();

	if (!user) {
		return { data: null, error: { message: "User not authenticated" } };
	}

	// Ensure we're updating the current user's profile
	const profileData = {
		...profile,
		user_id: user.id, // Using your existing column name
		updated_at: new Date().toISOString(),
	};

	const { data, error } = await supabase.from("profiles").upsert(profileData).select().single();

	if (error) {
		console.error("Error updating profile:", error);
	}

	return { data, error };
}

// Flat operations
export async function fetchUserFlats(): Promise<Flat[]> {
	const user = await getCurrentUser();

	if (!user) {
		console.error("User not authenticated");
		return [];
	}

	const { data, error } = await supabase
		.from("flats")
		.select("*")
		.eq("owner_id", user.id)
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error fetching flats:", error);
		return [];
	}

	return data || [];
}

export async function fetchFlat(flatId: string): Promise<Flat | null> {
	const { data, error } = await supabase.from("flats").select("*").eq("id", flatId).single();

	if (error) {
		console.error("Error fetching flat:", error);
		return null;
	}

	return data;
}

export async function upsertFlat(flat: Partial<Flat>) {
	const user = await getCurrentUser();

	if (!user) {
		return { data: null, error: { message: "User not authenticated" } };
	}

	const flatData = {
		...flat,
		owner_id: user.id,
		updated_at: new Date().toISOString(),
	};

	const { data, error } = await supabase.from("flats").upsert(flatData).select().single();

	if (error) {
		console.error("Error updating flat:", error);
	}

	return { data, error };
}

export async function deleteFlat(flatId: string) {
	const { error } = await supabase.from("flats").delete().eq("id", flatId);

	if (error) {
		console.error("Error deleting flat:", error);
	}

	return { error };
}

// Search operations
export async function fetchUserSearches(): Promise<Search[]> {
	const user = await getCurrentUser();

	if (!user) {
		console.error("User not authenticated");
		return [];
	}

	const { data, error } = await supabase
		.from("searches")
		.select("*")
		.eq("user_id", user.id)
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error fetching searches:", error);
		return [];
	}

	return data || [];
}

export async function upsertSearch(search: Partial<Search>) {
	const user = await getCurrentUser();

	if (!user) {
		return { data: null, error: { message: "User not authenticated" } };
	}

	const searchData = {
		...search,
		user_id: user.id,
		updated_at: new Date().toISOString(),
	};

	const { data, error } = await supabase.from("searches").upsert(searchData).select().single();

	if (error) {
		console.error("Error updating search:", error);
	}

	return { data, error };
}

export async function deleteSearch(searchId: string) {
	const { error } = await supabase.from("searches").delete().eq("id", searchId);

	if (error) {
		console.error("Error deleting search:", error);
	}

	return { error };
}

// Contract operations
// Return a lightweight summary of the user's contracts for dashboard views
export interface ContractSummary {
        id: string;
        title: string;
        otherParty: string;
        status: string;
        createdDate: string;
        startDate?: string;
        endDate?: string;
        conversationId?: string;
}

export async function fetchUserContracts(): Promise<ContractSummary[]> {
        const user = await getCurrentUser();

        if (!user) {
                console.error("User not authenticated");
                return [];
	}

        const { data, error } = await supabase
                .from("contracts")
                .select(
                        `
      *,
      flats(title)
    `
                )
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

        if (error) {
                console.error("Error fetching contracts:", error);
                return [];
        }

        return (data || []).map((c: any) => ({
                id: c.id,
                title: c.flats?.title || "Contract",
                otherParty: c.landlord_name || c.tenant_name || "Unknown",
                status: c.status || "pending",
                createdDate: c.created_at || "",
                startDate: c.start_date || undefined,
                endDate: c.end_date || undefined,
                conversationId: c.conversation_id || undefined,
        }));
}

export async function upsertContract(contract: Partial<Contract>) {
	const user = await getCurrentUser();

	if (!user) {
		return { data: null, error: { message: "User not authenticated" } };
	}

	const contractData = {
		...contract,
		user_id: user.id,
		updated_at: new Date().toISOString(),
	};

	const { data, error } = await supabase.from("contracts").upsert(contractData).select().single();

	if (error) {
		console.error("Error updating contract:", error);
	}

	return { data, error };
}

// Dashboard data - fetch all user data at once
export async function fetchDashboardData() {
	const user = await getCurrentUser();

	if (!user) {
		return {
			profile: null,
			flats: [],
			searches: [],
			contracts: [],
			error: "User not authenticated",
		};
	}

	try {
		const [profile, flats, searches, contracts] = await Promise.all([
			fetchProfile(user.id),
			fetchUserFlats(),
			fetchUserSearches(),
			fetchUserContracts(),
		]);

		return {
			profile,
			flats,
			searches,
			contracts,
			error: null,
		};
	} catch (error) {
		console.error("Error fetching dashboard data:", error);
		return {
			profile: null,
			flats: [],
			searches: [],
			contracts: [],
			error: "Failed to fetch dashboard data",
		};
	}
}

// Test function to add sample data
export async function addSampleData() {
	const user = await getCurrentUser();

	if (!user) {
		return { error: "User not authenticated" };
	}

	try {
		// Add sample profile data
		await upsertProfile({
			firstname: "John",
			lastname: "Doe",
			email: user.email,
			location: "Berlin, Germany",
			income: 50000,
			languages: ["English", "German"],
		});

		// Add sample flat
		const { data: flat } = await upsertFlat({
			title: "Modern 2BR Apartment",
			description: "Beautiful apartment in the heart of Berlin",
			address: "Alexanderplatz 1",
			city: "Berlin",
			postal_code: "10178",
			rent_amount: 1200.0,
			room_count: 2,
			size_sqm: 75,
			furnished: true,
			pets_allowed: false,
			available_from: "2024-09-01",
		});

		// Add sample search
		await upsertSearch({
			title: "Looking for 1BR in Munich",
			city: "Munich",
			max_rent: 1000.0,
			min_rooms: 1,
			max_rooms: 2,
		});

		// Add sample contract (if flat was created)
		if (flat) {
			await upsertContract({
				flat_id: flat.id,
				tenant_name: "John Doe",
				landlord_name: "Jane Smith",
				start_date: "2024-09-01",
				end_date: "2025-08-31",
				monthly_rent: 1200.0,
				status: "active",
			});
		}

		return { error: null };
	} catch (error) {
		console.error("Error adding sample data:", error);
		return { error: "Failed to add sample data" };
	}
}

// File upload helper
export async function uploadFile(file: File, bucket: string, path?: string) {
	const user = await getCurrentUser();

	if (!user) {
		return { data: null, error: { message: "User not authenticated" } };
	}

	const fileExt = file.name.split(".").pop();
	const fileName = `${user.id}/${path || Date.now()}.${fileExt}`;

	const { data, error } = await supabase.storage.from(bucket).upload(fileName, file);

	if (error) {
		console.error("Error uploading file:", error);
		return { data: null, error };
	}

	// Get public URL
	const {
		data: { publicUrl },
	} = supabase.storage.from(bucket).getPublicUrl(fileName);

	return { data: { ...data, publicUrl }, error: null };
}

// Messaging operations
export async function fetchConversations(userId: string): Promise<Conversation[]> {
        const { data, error } = await supabase
                .from('conversations')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

        if (error) {
                console.error('Error fetching conversations:', error);
                return [];
        }

        return (data as Conversation[]) || [];
}

export async function fetchMessages(conversationId: string): Promise<Message[]> {
        const { data, error } = await supabase
                .from('messages')
                .select('*')
                .eq('conversation_id', conversationId)
                .order('created_at', { ascending: true });

        if (error) {
                console.error('Error fetching messages:', error);
                return [];
        }

        return (data as Message[]) || [];
}

export async function sendMessage(conversationId: string, text: string) {
        const user = await getCurrentUser();

        if (!user) {
                return { error: { message: 'User not authenticated' } };
        }

        const { error } = await supabase.from('messages').insert({
                conversation_id: conversationId,
                user_id: user.id,
                text,
                created_at: new Date().toISOString(),
        });

        if (error) {
                console.error('Error sending message:', error);
        }

        return { error };
}
