"use client";

import { useState } from "react";
import { ArrowUpRight, CalendarDays, Check, Clock3 } from "lucide-react";
import { bookingUrl, openCalendlyPopup } from "./calendlyPopup";

export default function CalendlyBooking() {
  const [status, setStatus] = useState("idle");

  async function openCalendar() {
    if (status === "loading") return;
    setStatus("loading");
    try {
      await openCalendlyPopup();
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return <div className="booking-panel">
    <div className="booking-panel-icon"><CalendarDays size={25} aria-hidden="true" /></div>
    <div className="booking-panel-meta"><Clock3 size={16} aria-hidden="true" />30 minutes · Video call</div>
    <h4>Get a clear direction for your next build.</h4>
    <p>We&apos;ll discuss the business problem, the right web or automation scope, and a practical next step.</p>
    <ul>
      <li><Check size={16} aria-hidden="true" />Your goals and current challenges</li>
      <li><Check size={16} aria-hidden="true" />Website or automation requirements</li>
      <li><Check size={16} aria-hidden="true" />Timeline and next steps</li>
    </ul>
    <button className="booking-open" type="button" onClick={openCalendar} disabled={status === "loading"} aria-busy={status === "loading"}>
      {status === "loading" ? "Opening calendar..." : "Book a Call"}<ArrowUpRight size={18} aria-hidden="true" />
    </button>
    {status === "error" && <p className="booking-error" role="status">The popup could not load. Please use the direct link below.</p>}
    <a className="booking-direct" href={bookingUrl} target="_blank" rel="noreferrer">Open Calendly in a new tab <ArrowUpRight size={15} aria-hidden="true" /></a>
  </div>;
}
