import { NextResponse } from "next/server";
import { createBookingsTable, getAllBookings } from "@/lib/db";
import sql from "@/lib/db";

export async function GET() {
  try {
    await createBookingsTable();
    const bookings = await getAllBookings();
    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error("Admin fetch error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await sql`DELETE FROM bookings WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ success: false, message: "Failed to delete booking" }, { status: 500 });
  }
}
