export type PropertyType = "hotel" | "restaurant" | "spa" | "cafe";

export interface Property {
  id: string;
  user_id: string;
  name: string;
  type: PropertyType;
  address: string;
  phone: string;
  description: string;
  ai_persona_name: string;
  ai_greeting: string;
  working_hours_start: string;
  working_hours_end: string;
  auto_reply: boolean;
  zalo_oa_id?: string;
  facebook_page_id?: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  property_id: string;
  channel: "zalo" | "facebook" | "widget" | "phone";
  customer_name?: string;
  customer_phone?: string;
  customer_id_external?: string;
  status: "open" | "resolved" | "escalated";
  last_message: string;
  last_message_at: string;
  unread_count: number;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  created_at: string;
}

export interface Booking {
  id: string;
  property_id: string;
  conversation_id?: string;
  customer_name: string;
  customer_phone: string;
  booking_type: "room" | "table" | "service";
  date: string;
  time?: string;
  guests?: number;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
}

export interface Lead {
  id: string;
  property_id: string;
  name?: string;
  phone?: string;
  channel: string;
  interest: string;
  status: "new" | "contacted" | "converted" | "lost";
  created_at: string;
}

export interface DashboardStats {
  total_conversations: number;
  open_conversations: number;
  resolved_today: number;
  total_bookings: number;
  pending_bookings: number;
  new_leads: number;
  response_rate: number;
}
