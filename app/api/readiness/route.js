import { NextResponse } from "next/server";
import { hasEmailConfig, sendOwnerEmail } from "../notify-owner";
import { hasBotProtection, readSubmission, reserveEmailQuota, verifyBot } from "../submission-guard";
import { problems } from "../../readiness/problems";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const labels = new Map(problems);
const allowed = new Set(labels.keys());

export async function POST(request) {
  let input;
  try {
    input = await readSubmission(request);
  } catch {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }
  if (!input || typeof input !== "object" || Array.isArray(input)) return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  if (input.website) return NextResponse.json({ ok: true });

  const email = String(input.email || "").trim();
  const checked = input.checked;
  const problemDetails = String(input.problemDetails || "").trim();
  if (!emailPattern.test(email) || email.length > 254 || input.consent !== true || !Array.isArray(checked) || checked.length > allowed.size || checked.some(id => !allowed.has(id)) || new Set(checked).size !== checked.length || problemDetails.length > 1500) {
    return NextResponse.json({ error: "Please enter a valid email and agree to receive a reply." }, { status: 400 });
  }

  if (!hasEmailConfig()) return NextResponse.json({ error: "The follow-up form is temporarily unavailable. Please contact hello@webcentrikx.com directly." }, { status: 503 });
  if (!hasBotProtection()) return NextResponse.json({ error: "The follow-up form is temporarily unavailable. Please email hello@webcentrikx.com directly." }, { status: 503 });
  if (!await verifyBot(request, input.turnstileToken)) return NextResponse.json({ error: "Verification expired or failed. Please try again." }, { status: 403 });
  if (!reserveEmailQuota(request, email)) return NextResponse.json({ error: "Too many requests right now. Please email hello@webcentrikx.com directly." }, { status: 429 });

  try {
    await sendOwnerEmail({
      email,
      subject: "Webcentrikx readiness checklist follow-up",
      text: `Reply to: ${email}\nProblems selected: ${checked.length}\nSelected:\n${checked.map(id => `- ${labels.get(id)}`).join("\n") || "None"}\n\nVisitor's description:\n${problemDetails || "Not provided"}\n\nVisitor consented to one email follow-up.`,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Readiness follow-up error", error);
    return NextResponse.json({ error: "We could not send your request. Please contact hello@webcentrikx.com directly." }, { status: 502 });
  }
}
