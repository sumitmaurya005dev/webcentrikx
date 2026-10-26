"use client";

import { useCallback, useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, Printer } from "lucide-react";
import Link from "next/link";
import TurnstileWidget from "../TurnstileWidget";
import { problemGroups, problems } from "./problems";

export default function ReadinessCheck() {
  const [checked, setChecked] = useState([]);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [problemDetails, setProblemDetails] = useState("");
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [challengeReset, setChallengeReset] = useState(0);
  const onToken = useCallback(token => setTurnstileToken(token), []);
  const firstIssue = problems.find(([id]) => checked.includes(id))?.[1] || "Select any issues that sound familiar, then tell us more in your own words.";

  function toggle(id) {
    setChecked(current => current.includes(id) ? current.filter(value => value !== id) : [...current, id]);
  }

  async function requestFollowUp(event) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setFeedback("");
    try {
      const response = await fetch("/api/readiness", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, consent, website, checked, problemDetails, turnstileToken }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Your request could not be sent.");
      setStatus("success");
      setFeedback("Request sent. We will reply by email with a focused next step.");
      setTurnstileToken("");
      setChallengeReset(value => value + 1);
    } catch (error) {
      setStatus("error");
      setFeedback(error.message);
      setTurnstileToken("");
      setChallengeReset(value => value + 1);
    }
  }

  return <div className="resource-inner">
    <div className="resource-intro"><p className="process-eyebrow">FREE SELF-ASSESSMENT</p><h1>What is slowing your business down?</h1><p>Tick the problems you are facing with your website, enquiries, or day-to-day work. Add your own details and we can suggest a practical next step.</p></div>
    <div className="readiness-layout"><div className="readiness-list">{problemGroups.map(group => <section key={group.title} aria-label={group.title}><h2>{group.title}</h2>{group.items.map(([id, label]) => <label className="readiness-row" key={id}><input type="checkbox" checked={checked.includes(id)} onChange={() => toggle(id)} /><span className="readiness-check" aria-hidden="true"><Check size={16} /></span><span>{label}</span></label>)}</section>)}</div>
      <aside className="readiness-result" aria-live="polite"><span className="readiness-count">{checked.length}<small> / {problems.length}</small></span><p className="readiness-count-label">problems selected</p><div className="readiness-track"><span style={{ width: `${checked.length / problems.length * 100}%` }} /></div><h2>{checked.length ? "You mentioned" : "Start with what feels familiar"}</h2><p>{firstIssue}</p><div className="readiness-actions"><button type="button" onClick={() => window.print()}><Printer size={17} aria-hidden="true" />Print this checklist</button><Link href="/#contact"><ArrowLeft size={17} aria-hidden="true" />Back to Webcentrikx</Link></div>
        <form className="readiness-followup" onSubmit={requestFollowUp}><h3>Tell us more</h3><p>Explain what is happening in your business. A few lines are enough.</p><label><span>Your biggest challenge <span className="form-label-note">Optional</span></span><textarea value={problemDetails} onChange={event => setProblemDetails(event.target.value)} maxLength={1500} rows={5} placeholder="What happens today, and what would you like to change?" /></label><label>Email address<input type="email" value={email} onChange={event => setEmail(event.target.value)} required autoComplete="email" maxLength={254} placeholder="you@company.com" /></label><label className="readiness-consent"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} required /><span>I agree to receive one email about my assessment. No subscription. See our <Link href="/privacy-policy" target="_blank">Privacy Policy</Link>.</span></label><TurnstileWidget onToken={onToken} resetKey={challengeReset} /><div className="form-trap" aria-hidden="true"><label>Website<input value={website} onChange={event => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" /></label></div><button type="submit" disabled={status === "sending" || !turnstileToken}>{status === "sending" ? "Sending..." : "Request email feedback"}<ArrowUpRight size={17} aria-hidden="true" /></button>{feedback && <p className={`form-feedback ${status}`} role="status">{feedback}</p>}</form>
      </aside></div><p className="readiness-disclaimer">This is a self-check, not a performance audit. Your answers stay in your browser unless you request email feedback.</p>
  </div>;
}
