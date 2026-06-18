import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getBookings, createBooking, updateBookingStatus } from "@/lib/supabase/queries";
import type { Booking } from "@/types";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const propertyId = searchParams.get("property_id");
  if (!propertyId) return NextResponse.json({ error: "property_id required" }, { status: 400 });

  const bookings = await getBookings(propertyId);
  return NextResponse.json({ bookings });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const booking = await createBooking(body as Omit<Booking, "id" | "created_at">);
  if (!booking) return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  return NextResponse.json({ booking }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, status } = await req.json();
  await updateBookingStatus(id, status);
  return NextResponse.json({ ok: true });
}
