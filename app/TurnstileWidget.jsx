"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export default function TurnstileWidget({ onToken, resetKey }) {
  const container = useRef(null);
  const widget = useRef(null);
  const [ready, setReady] = useState(false);
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!ready || !sitekey || !container.current || !window.turnstile) return;
    widget.current = window.turnstile.render(container.current, {
      sitekey,
      theme: "light",
      callback: onToken,
      "expired-callback": () => onToken(""),
      "error-callback": () => onToken(""),
    });
    return () => {
      if (widget.current !== null && window.turnstile) window.turnstile.remove(widget.current);
      widget.current = null;
    };
  }, [ready, sitekey, resetKey, onToken]);

  if (!sitekey) return <p className="form-feedback error">Form verification is being set up. Please email hello@webcentrikx.com directly.</p>;
  return <div className="form-verification">
    <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={() => setReady(true)} />
    <div ref={container} />
  </div>;
}
