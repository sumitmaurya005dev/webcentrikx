import { NextResponse } from "next/server";
import { hasEmailConfig, sendOwnerEmail } from "../notify-owner";
import { hasBotProtection, readSubmission, reserveEmailQuota, verifyBot } from "../submission-guard";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const services = new Set(["Website", "AI automation", "Both", "Not sure yet"]);

export async function POST(request) {
  let input;
  try {
    input = await readSubmission(request);
  } catch {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  if (input.website) return NextResponse.json({ ok: true });

  const name = String(input.name || "").trim();
  const email = String(input.email || "").trim();
  const countryCode = String(input.countryCode || "").trim();
  const phone = String(input.phone || "").trim();
  const phoneDigits = phone.replace(/[^0-9]/g, "");
  const service = String(input.service || "").trim();
  const budget = String(input.budget || "").trim();
  const message = String(input.message || "").trim();
  const ideas = String(input.ideas || "").trim();
  if (name.length < 2 || name.length > 100 || !emailPattern.test(email) || email.length > 254 || !/^\+[1-9]\d{0,3}$/.test(countryCode) || !/^[0-9\s().-]+$/.test(phone) || phone.length > 24 || phoneDigits.length < 6 || phoneDigits.length + countryCode.length - 1 > 15 || !services.has(service) || budget.length < 2 || budget.length > 80 || message.length < 15 || message.length > 3000 || ideas.length > 2000) {
    return NextResponse.json({ error: "Please complete every field with a valid email and a few details about your project." }, { status: 400 });
  }

  if (!hasEmailConfig()) {
    return NextResponse.json({ error: "The form is temporarily unavailable. Please contact hello@webcentrikx.com directly." }, { status: 503 });
  }

  if (!hasBotProtection()) return NextResponse.json({ error: "The form is temporarily unavailable. Please email hello@webcentrikx.com directly." }, { status: 503 });
  if (!await verifyBot(request, input.turnstileToken)) return NextResponse.json({ error: "Verification expired or failed. Please try again." }, { status: 403 });
  if (!reserveEmailQuota(request, email)) return NextResponse.json({ error: "Too many requests right now. Please email hello@webcentrikx.com directly." }, { status: 429 });

  try {
    await sendOwnerEmail({
      email,
      subject: `Webcentrikx enquiry: ${service}`,
      text: `Name: ${name}\nEmail: ${email}\nContact number: ${countryCode} ${phoneDigits}\nService: ${service}\nApproximate budget: ${budget}\n\nProject details:\n${message}\n\nIdeas to implement:\n${ideas || "Not provided"}`,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Inquiry delivery error", error);
    return NextResponse.json({ error: "We couldn't send your enquiry. Please contact hello@webcentrikx.com directly." }, { status: 502 });
  }
}
