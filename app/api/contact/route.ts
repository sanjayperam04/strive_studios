import { NextResponse } from "next/server";
import { Resend } from "resend";
import { google } from "googleapis";

async function appendToSheet(row: string[]) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, company, services } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
    }

    if (message.length < 10) {
      return NextResponse.json({ message: "Please fill out all fields completely." }, { status: 400 });
    }

    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const fullMessage = `${company ? `Company: ${company}\n` : ""}${services?.length ? `Services: ${services.join(", ")}\n` : ""}${message}`;

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Run Resend + Sheets in parallel — a failure in Sheets won't block the email
    const [emailResult, sheetsResult] = await Promise.allSettled([
      resend.emails.send({
        from: "Strive Studios Form <onboarding@resend.dev>",
        to: ["hello@strivestudios.co"],
        replyTo: email,
        subject: `New Project Inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${fullMessage}`,
      }),
      appendToSheet([
        timestamp,
        name,
        email,
        company ?? "",
        Array.isArray(services) ? services.join(", ") : "",
        message,
      ]),
    ]);

    if (emailResult.status === "rejected") {
      console.error("Resend error:", emailResult.reason);
      return NextResponse.json({ message: "Failed to send email." }, { status: 500 });
    }

    if (emailResult.value.error) {
      console.error("Resend API error:", emailResult.value.error);
      return NextResponse.json({ message: "Failed to send email." }, { status: 500 });
    }

    if (sheetsResult.status === "rejected") {
      // Log but don't fail the request — email was sent successfully
      console.error("Google Sheets error:", sheetsResult.reason);
    }

    return NextResponse.json({ message: "Message successfully received!" }, { status: 200 });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json({ message: "Internal server error during submission." }, { status: 500 });
  }
}
