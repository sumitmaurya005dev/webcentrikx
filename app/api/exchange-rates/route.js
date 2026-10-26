import { NextResponse } from "next/server";

const currencies = ["INR", "EUR", "GBP", "AED"];

export async function GET() {
  try {
    const response = await fetch("https://api.frankfurter.dev/v2/rates?base=USD&quotes=INR,EUR,GBP,AED", {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error("Rate provider unavailable");

    const rows = await response.json();
    const rates = Object.fromEntries(rows.map(({ quote, rate }) => [quote, rate]));
    if (!currencies.every(currency => Number.isFinite(rates[currency]) && rates[currency] > 0) || !/^\d{4}-\d{2}-\d{2}$/.test(rows[0]?.date || "")) {
      throw new Error("Invalid rate response");
    }

    return NextResponse.json({ rates, date: rows[0].date }, { headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" } });
  } catch {
    return NextResponse.json({ error: "Conversion rates are temporarily unavailable." }, { status: 503 });
  }
}
