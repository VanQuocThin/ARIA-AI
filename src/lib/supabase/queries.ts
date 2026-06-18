import { createClient } from "./server";
import type { Property, Conversation, Message, Booking, Lead, DashboardStats } from "@/types";

export async function getProperty(): Promise<Property | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("properties")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return data;
}

export async function updateProperty(id: string, updates: Partial<Property>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  return { data, error };
}

export async function getConversations(propertyId: string, status?: string): Promise<Conversation[]> {
  const supabase = await createClient();
  let query = supabase
    .from("conversations")
    .select("*")
    .eq("property_id", propertyId)
    .order("last_message_at", { ascending: false });

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data } = await query;
  return data ?? [];
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });
  return data ?? [];
}

export async function createConversation(
  propertyId: string,
  channel: Conversation["channel"],
  customerIdExternal: string,
  customerName?: string
): Promise<Conversation | null> {
  const supabase = await createClient();

  // Upsert: find existing open conversation or create new
  const { data: existing } = await supabase
    .from("conversations")
    .select("*")
    .eq("property_id", propertyId)
    .eq("customer_id_external", customerIdExternal)
    .eq("status", "open")
    .maybeSingle();

  if (existing) return existing;

  const { data } = await supabase
    .from("conversations")
    .insert({ property_id: propertyId, channel, customer_id_external: customerIdExternal, customer_name: customerName })
    .select()
    .single();

  return data;
}

export async function addMessage(
  conversationId: string,
  role: "user" | "assistant",
  content: string
): Promise<Message | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("messages")
    .insert({ conversation_id: conversationId, role, content })
    .select()
    .single();

  // Update last_message on conversation
  await supabase
    .from("conversations")
    .update({ last_message: content, last_message_at: new Date().toISOString() })
    .eq("id", conversationId);

  return data;
}

export async function updateConversationStatus(id: string, status: Conversation["status"]) {
  const supabase = await createClient();
  return supabase.from("conversations").update({ status }).eq("id", id);
}

export async function getBookings(propertyId: string): Promise<Booking[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("bookings")
    .select("*")
    .eq("property_id", propertyId)
    .order("date", { ascending: true });
  return data ?? [];
}

export async function createBooking(booking: Omit<Booking, "id" | "created_at">): Promise<Booking | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("bookings").insert(booking).select().single();
  return data;
}

export async function updateBookingStatus(id: string, status: Booking["status"]) {
  const supabase = await createClient();
  return supabase.from("bookings").update({ status }).eq("id", id);
}

export async function getLeads(propertyId: string): Promise<Lead[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("leads")
    .select("*")
    .eq("property_id", propertyId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function createLead(lead: Omit<Lead, "id" | "created_at">): Promise<Lead | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("leads").insert(lead).select().single();
  return data;
}

export async function getDashboardStats(propertyId: string): Promise<DashboardStats> {
  const supabase = await createClient();

  const today = new Date().toISOString().split("T")[0];

  const [convAll, convOpen, convToday, bookAll, bookPending, leadsNew] = await Promise.all([
    supabase.from("conversations").select("id", { count: "exact" }).eq("property_id", propertyId),
    supabase.from("conversations").select("id", { count: "exact" }).eq("property_id", propertyId).eq("status", "open"),
    supabase.from("conversations").select("id", { count: "exact" }).eq("property_id", propertyId).eq("status", "resolved").gte("last_message_at", today),
    supabase.from("bookings").select("id", { count: "exact" }).eq("property_id", propertyId),
    supabase.from("bookings").select("id", { count: "exact" }).eq("property_id", propertyId).eq("status", "pending"),
    supabase.from("leads").select("id", { count: "exact" }).eq("property_id", propertyId).eq("status", "new"),
  ]);

  return {
    total_conversations: convAll.count ?? 0,
    open_conversations: convOpen.count ?? 0,
    resolved_today: convToday.count ?? 0,
    total_bookings: bookAll.count ?? 0,
    pending_bookings: bookPending.count ?? 0,
    new_leads: leadsNew.count ?? 0,
    response_rate: 83,
  };
}
