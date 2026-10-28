"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { BrandIcon } from "./SocialLinks";

const chatUrl = "https://wa.me/message/KY3JMMPKSOYNP1";

export default function WhatsAppWidget() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function reveal() {
      if (window.scrollY < 450) return;
      setVisible(true);
      window.removeEventListener("scroll", reveal);
    }
    window.addEventListener("scroll", reveal, { passive: true });
    reveal();
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  useEffect(() => {
    const sections = ["voices", "contact"].map(id => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) setOpen(false);
    }, { threshold: 0.1 });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return <aside className="whatsapp-widget" aria-label="WhatsApp contact">
    {open && <div className="whatsapp-panel">
      <div className="whatsapp-panel-top"><span>WEBCENTRIKX / WHATSAPP</span><button type="button" onClick={() => setOpen(false)} aria-label="Close WhatsApp message"><X size={18} aria-hidden="true" /></button></div>
      <p>Have a project in mind?</p>
      <span className="whatsapp-panel-copy">Tell us what you&apos;re working on. We&apos;ll pick it up from there.</span>
      <a href={chatUrl} target="_blank" rel="noopener noreferrer">Message on WhatsApp <ArrowUpRight size={17} aria-hidden="true" /></a>
    </div>}
    <button type="button" className="whatsapp-trigger" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-label={open ? "Hide WhatsApp message" : "Chat with us on WhatsApp"} title="Chat with us on WhatsApp">
      <BrandIcon brand="whatsapp" size={23} /><span>Chat with us</span>
    </button>
  </aside>;
}
