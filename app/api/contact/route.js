import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  console.log("=== API ROUTE CALLED ===");

  try {
    // Log environment variables (without exposing full password)
    console.log("Environment check:");
    console.log("EMAIL_USER exists:", !!process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
    console.log(
      "EMAIL_USER value:",
      process.env.EMAIL_USER
        ? process.env.EMAIL_USER.substring(0, 5) + "..."
        : "NOT SET",
    );

    // Parse request body
    console.log("Parsing request body...");
    const body = await request.json();
    console.log("Request body received:", JSON.stringify(body, null, 2));

    const { name, email, phone, checkIn, checkOut, roomType, guests, message } =
      body;

    // Validate required fields
    if (!name || !phone) {
      console.log("Validation failed: Missing required fields");
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
          error: "Name and phone are required",
        },
        { status: 400 },
      );
    }

    console.log("Validation passed");

    // Configure email transporter
    console.log("Configuring email transporter...");

    // Check if email credentials are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error(
        "EMAIL_USER or EMAIL_PASS is not set in environment variables",
      );
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error",
          error: "Email credentials not configured",
        },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      debug: true, // Enable debug mode
      logger: true, // Enable logging
    });

    console.log("Transporter created, verifying connection...");

    // Verify transporter connection
    try {
      await transporter.verify();
      console.log("Transporter verified successfully - connection OK");
    } catch (verifyError) {
      console.error("Transporter verification failed:", verifyError);
      return NextResponse.json(
        {
          success: false,
          message: "Email service connection failed",
          error: verifyError.message,
        },
        { status: 500 },
      );
    }

    // Prepare email content
    console.log("Preparing email content...");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
          }
          .header {
            background: #C9A962;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            padding: 20px;
            background: #f9f9f9;
          }
          .field {
            margin-bottom: 15px;
            padding: 10px;
            background: white;
            border-left: 4px solid #C9A962;
          }
          .label {
            font-weight: bold;
            color: #C9A962;
            margin-bottom: 5px;
          }
          .value {
            color: #333;
            margin-top: 5px;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #666;
            background: #f1f1f1;
            border-radius: 0 0 10px 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🏨 New Booking Inquiry</h2>
            <p>Hotel Shri Govind - Bilaspur</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">👤 Guest Name</div>
              <div class="value">${escapeHtml(name)}</div>
            </div>
            
            ${
              email
                ? `
            <div class="field">
              <div class="label">📧 Email</div>
              <div class="value">${escapeHtml(email)}</div>
            </div>
            `
                : ""
            }
            
            <div class="field">
              <div class="label">📞 Phone Number</div>
              <div class="value">${escapeHtml(phone)}</div>
            </div>
            
            <div class="field">
              <div class="label">👥 Number of Guests</div>
              <div class="value">${escapeHtml(guests)}</div>
            </div>
            
            <div class="field">
              <div class="label">📅 Check-in Date</div>
              <div class="value">${escapeHtml(checkIn || "Not specified")}</div>
            </div>
            
            <div class="field">
              <div class="label">📅 Check-out Date</div>
              <div class="value">${escapeHtml(checkOut || "Not specified")}</div>
            </div>
            
            <div class="field">
              <div class="label">🏠 Room Type</div>
              <div class="value">${escapeHtml(roomType || "Not specified")}</div>
            </div>
            
            <div class="field">
              <div class="label">💬 Message</div>
              <div class="value">${escapeHtml(message || "No message provided")}</div>
            </div>
          </div>
          <div class="footer">
            <p>This inquiry was submitted from Hotel Shri Govind website contact form.</p>
            <p>📞 Hotel Reception: +91 9993917766 | 📧 hotelshrigovind06@gmail.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
      New Booking Inquiry - Hotel Shri Govind
      ========================================
      
      Name: ${name}
      ${email ? `Email: ${email}` : ""}
      Phone: ${phone}
      Guests: ${guests}
      Check-in: ${checkIn || "Not specified"}
      Check-out: ${checkOut || "Not specified"}
      Room Type: ${roomType || "Not specified"}
      
      Message:
      ${message || "No message provided"}
      
      ----------------------------------------
      This inquiry was submitted from Hotel Shri Govind website contact form.
      Hotel Reception: +91 9993917766
      Email: hotelshrigovind06@gmail.com
    `;

    const mailOptions = {
      from: `"Hotel Shri Govind Website" <${process.env.EMAIL_USER}>`,
      to: `${process.env.EMAIL_receiver}`, 
      subject: "New Booking Inquiry - Hotel Shri Govind",
      replyTo: email || process.env.EMAIL_USER,
      html: htmlContent,
      text: textContent,
    };

    console.log("Mail options prepared:");
    console.log("- From:", mailOptions.from);
    console.log("- To:", mailOptions.to);
    console.log("- Subject:", mailOptions.subject);
    console.log("- ReplyTo:", mailOptions.replyTo);
    console.log("- HTML length:", mailOptions.html.length);
    console.log("- Text length:", mailOptions.text.length);

    // Send email
    console.log("Attempting to send email...");
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully",
        messageId: info.messageId,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("=== EMAIL SENDING ERROR ===");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Error command:", error.command);
    console.error("Error response:", error.response);
    console.error("Stack trace:", error.stack);

    // Handle specific error types
    let errorMessage = "Failed to send email";
    let statusCode = 500;

    if (error.code === "EAUTH") {
      errorMessage =
        "Email authentication failed. Please check your Gmail app password.";
      console.error("Authentication error - Check EMAIL_PASS in .env.local");
    } else if (error.code === "ECONNECTION") {
      errorMessage =
        "Cannot connect to email server. Check your internet connection.";
    } else if (error.code === "ESOCKET") {
      errorMessage = "Socket connection error. Try again later.";
    } else if (error.response && error.response.includes("535")) {
      errorMessage =
        "Gmail authentication failed. Please generate a new app password.";
      console.error("Gmail 535 error - Invalid credentials");
    }

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
        error: error.message,
        code: error.code || "UNKNOWN",
      },
      { status: statusCode },
    );
  }
}

// Helper function to escape HTML special characters
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
