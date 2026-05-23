import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createBookingsTable, insertBooking } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, checkIn, checkOut, roomType, guests, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Name and phone are required" },
        { status: 400 }
      );
    }

    await createBookingsTable();

    await insertBooking({ name, email, phone, guests: Number(guests) || 1, checkIn, checkOut, roomType, message });

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }
              .header { background: #C9A962; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { padding: 20px; background: #f9f9f9; }
              .field { margin-bottom: 15px; padding: 10px; background: white; border-left: 4px solid #C9A962; }
              .label { font-weight: bold; color: #C9A962; margin-bottom: 5px; }
              .value { color: #333; margin-top: 5px; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; background: #f1f1f1; border-radius: 0 0 10px 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>🏨 New Booking Received</h2>
                <p>Hotel Shri Govind - Bilaspur</p>
              </div>
              <div class="content">
                <div class="field"><div class="label">👤 Guest Name</div><div class="value">${escHtml(name)}</div></div>
                ${email ? `<div class="field"><div class="label">📧 Email</div><div class="value">${escHtml(email)}</div></div>` : ""}
                <div class="field"><div class="label">📞 Phone</div><div class="value">${escHtml(phone)}</div></div>
                <div class="field"><div class="label">👥 Guests</div><div class="value">${escHtml(guests)}</div></div>
                <div class="field"><div class="label">📅 Check-in</div><div class="value">${escHtml(checkIn || "Not specified")}</div></div>
                <div class="field"><div class="label">📅 Check-out</div><div class="value">${escHtml(checkOut || "Not specified")}</div></div>
                <div class="field"><div class="label">🏠 Room Type</div><div class="value">${escHtml(roomType || "Not specified")}</div></div>
                <div class="field"><div class="label">💬 Message</div><div class="value">${escHtml(message || "No message")}</div></div>
              </div>
              <div class="footer">
                <p>Submitted from Hotel Shri Govind website booking form.</p>
                <p>📞 +91 9993917766 | 📧 hotelshrigovind06@gmail.com</p>
              </div>
            </div>
          </body>
          </html>
        `;

        await transporter.sendMail({
          from: `"Hotel Shri Govind" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_receiver,
          subject: "New Booking - Hotel Shri Govind",
          html: htmlContent,
        });
      } catch (emailErr) {
        console.error("Email send failed:", emailErr);
      }
    }

    return NextResponse.json({ success: true, message: "Booking submitted successfully!" });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}

function escHtml(str: string) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
