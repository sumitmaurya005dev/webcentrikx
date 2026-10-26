"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { bookingUrl, openCalendlyPopup } from "../../calendlyPopup";

export default function BookCallButton() {
  const [state, setState] = useState("idle");

  async function openCalendar() {
    if (state === "loading") return;
    setState("loading");
    try {
      await openCalendlyPopup();
      setState("idle");
    } catch {
      setState("error");
    }
  }

  return <div className="case-call-action"><button type="button" onClick={openCalendar} disabled={state === "loading"} aria-busy={state === "loading"}>Book a Call <ArrowUpRight size={18} aria-hidden="true" /></button>{state === "error" && <a href={bookingUrl} target="_blank" rel="noreferrer">Calendar did not open. Use the direct booking link.</a>}</div>;
}
