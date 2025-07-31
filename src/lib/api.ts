import { supabase } from "./supabase";

// Profile retrieval and update
export async function fetchProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) {
    console.error("Error fetching profile", error);
    return null;
  }
  return data;
}

export async function upsertProfile(profile: any) {
  const { data, error } = await supabase
    .from("profiles")
    .upsert(profile)
    .select()
    .single();
  if (error) {
    console.error("Error updating profile", error);
  }
  return { data, error };
}

// Flat retrieval and update
export async function fetchFlat(userId: string) {
  const { data, error } = await supabase
    .from("flats")
    .select("*")
    .eq("owner_id", userId)
    .maybeSingle();
  if (error) {
    console.error("Error fetching flat", error);
    return null;
  }
  return data;
}

export async function upsertFlat(flat: any) {
  const { data, error } = await supabase
    .from("flats")
    .upsert(flat)
    .select()
    .single();
  if (error) {
    console.error("Error updating flat", error);
  }
  return { data, error };
}

// Searches
export async function fetchSearches(userId: string) {
  const { data, error } = await supabase
    .from("searches")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    console.error("Error fetching searches", error);
    return [];
  }
  return data;
}

export async function upsertSearch(search: any) {
  const { data, error } = await supabase
    .from("searches")
    .upsert(search)
    .select()
    .single();
  if (error) {
    console.error("Error updating search", error);
  }
  return { data, error };
}

// Contracts
export async function fetchContracts(userId: string) {
  const { data, error } = await supabase
    .from("contracts")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    console.error("Error fetching contracts", error);
    return [];
  }
  return data;
}

export async function upsertContract(contract: any) {
  const { data, error } = await supabase
    .from("contracts")
    .upsert(contract)
    .select()
    .single();
  if (error) {
    console.error("Error updating contract", error);
  }
  return { data, error };
}

// Conversations and messages
export async function fetchConversations(userId: string) {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    console.error("Error fetching conversations", error);
    return [];
  }
  return data;
}

export async function fetchMessages(conversationId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });
  if (error) {
    console.error("Error fetching messages", error);
    return [];
  }
  return data;
}

export async function sendMessage(conversationId: string, text: string) {
  const { data, error } = await supabase
    .from("messages")
    .insert({ conversation_id: conversationId, text })
    .select()
    .single();
  if (error) {
    console.error("Error sending message", error);
  }
  return { data, error };
}
