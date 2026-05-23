import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.neon_db_connection_string!);

export async function createBookingsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) DEFAULT '',
      phone VARCHAR(50) NOT NULL,
      guests INTEGER DEFAULT 1,
      check_in DATE,
      check_out DATE,
      room_type VARCHAR(100) DEFAULT '',
      message TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
}

export async function insertBooking(data: {
  name: string;
  email: string;
  phone: string;
  guests: number;
  checkIn: string;
  checkOut: string;
  roomType: string;
  message: string;
}) {
  await sql`
    INSERT INTO bookings (name, email, phone, guests, check_in, check_out, room_type, message)
    VALUES (
      ${data.name},
      ${data.email},
      ${data.phone},
      ${data.guests},
      ${data.checkIn || null},
      ${data.checkOut || null},
      ${data.roomType},
      ${data.message}
    )
  `;
}

export async function getAllBookings() {
  return await sql`
    SELECT * FROM bookings ORDER BY created_at DESC
  `;
}

export default sql;
