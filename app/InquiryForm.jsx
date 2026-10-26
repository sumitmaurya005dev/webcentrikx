"use client";

import { useCallback, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, CircleHelp, Globe2, Plus, Workflow } from "lucide-react";
import TurnstileWidget from "./TurnstileWidget";
import Link from "next/link";

const initial = { name: "", email: "", countryCode: "+91", phone: "", service: "", budget: "", message: "", ideas: "", website: "" };
const services = [
  { name: "Website", icon: Globe2 },
  { name: "AI automation", icon: Workflow },
  { name: "Both", icon: Plus },
  { name: "Not sure yet", icon: CircleHelp },
];
const suggestions = {
  Website: ["SaaS UI", "Commerce experience", "Fast loading"],
  "AI automation": ["Lead qualification", "CRM sync", "Workflow audit"],
  Both: ["Customer journey", "Lead routing", "Operational handoff"],
  "Not sure yet": ["Clearer messaging", "Online enquiries", "Less manual work"],
};
const stages = ["Service", "Project", "Contact"];
const callingCodes = [
  ["+91", "+91 India"], ["+1", "+1 US / Canada"], ["+44", "+44 UK"], ["+971", "+971 UAE"],
  ["+61", "+61 Australia"], ["+65", "+65 Singapore"], ["+966", "+966 Saudi Arabia"],
  ["+49", "+49 Germany"], ["+33", "+33 France"], ["+880", "+880 Bangladesh"],
  ["+92", "+92 Pakistan"], ["+977", "+977 Nepal"],
];

export default function InquiryForm() {
  const [values, setValues] = useState(initial);
  const [selectedIdeas, setSelectedIdeas] = useState([]);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const [step, setStep] = useState(0);
  const [customCode, setCustomCode] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [challengeReset, setChallengeReset] = useState(0);
  const onToken = useCallback(token => setTurnstileToken(token), []);

  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setFeedback("");
    const ideas = [selectedIdeas.join(", "), values.ideas.trim()].filter(Boolean).join("\n");
    try {
      const response = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, ideas, turnstileToken }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We couldn't send your enquiry.");
      setStatus("success");
      setFeedback("Your enquiry has been sent. We will reply by email with the next step.");
      setValues(initial);
      setSelectedIdeas([]);
      setStep(0);
      setCustomCode(false);
    } catch (error) {
      setStatus("error");
      setFeedback(error.message);
      setTurnstileToken("");
      setChallengeReset(value => value + 1);
    }
  }

  function change(event) {
    setValues(current => ({ ...current, [event.target.name]: event.target.value }));
    if (event.target.name === "service") setSelectedIdeas([]);
    if (status === "error") setStatus("idle");
  }

  function toggleIdea(idea) {
    setSelectedIdeas(current => current.includes(idea) ? current.filter(item => item !== idea) : [...current, idea]);
  }

  function changeCountryCode(event) {
    const other = event.target.value === "other";
    setCustomCode(other);
    setValues(current => ({ ...current, countryCode: other ? "" : event.target.value }));
  }

  function next(event) {
    if (event.currentTarget.closest("form").reportValidity()) setStep(current => current + 1);
  }

  return <form className="inquiry-form" onSubmit={submit}>
    <ol className="form-progress" aria-label="Enquiry progress">{stages.map((label, index) => <li key={label} className={index === step ? "is-current" : index < step ? "is-complete" : ""} aria-current={index === step ? "step" : undefined}><span>{index < step ? <Check size={13} aria-hidden="true" /> : `0${index + 1}`}</span>{label}</li>)}</ol>
    {step === 0 && <div className="form-stage"><div className="form-stage-heading"><h4>What can we help you build?</h4><p>Pick the closest match. We will work out the details together.</p></div><fieldset className="service-fieldset"><legend>Choose a service <span className="form-required" aria-hidden="true">*</span></legend><div className="service-choices">
      {services.map(({ name, icon: Icon }) => <label className={`service-choice${values.service === name ? " is-selected" : ""}`} key={name}>
        <input type="radio" name="service" value={name} checked={values.service === name} onChange={change} required />
        <Icon size={18} aria-hidden="true" /><span>{name}</span>{values.service === name && <Check className="service-check" size={15} aria-hidden="true" />}
      </label>)}
    </div></fieldset></div>}
    {step === 1 && <div className="form-stage"><div className="form-stage-heading"><h4>Tell us the essentials.</h4><p>A few sentences are enough to get started.</p></div>
      <label><span>What are you trying to build or improve? <span className="form-required" aria-hidden="true">*</span></span><textarea name="message" value={values.message} onChange={change} required minLength={15} maxLength={3000} rows={4} placeholder="What is happening now, and what would you like to change?" /></label>
      <div className="ideas-field"><label><span>Ideas you want to implement <span className="form-label-note">Optional</span></span><textarea name="ideas" value={values.ideas} onChange={change} maxLength={1900} rows={3} placeholder="Features, examples, workflows, or anything you have in mind" /></label>
        {values.service && <div className="idea-suggestions" aria-label="Suggested ideas">{suggestions[values.service].map(idea => <button key={idea} type="button" aria-pressed={selectedIdeas.includes(idea)} onClick={() => toggleIdea(idea)}>{selectedIdeas.includes(idea) ? <Check size={14} aria-hidden="true" /> : <Plus size={14} aria-hidden="true" />}{idea}</button>)}</div>}
      </div></div>}
    {step === 2 && <div className="form-stage"><div className="form-stage-heading"><h4>Where should we reply?</h4><p>We will respond by email with a practical next step.</p></div>
      <div className="form-row"><label><span>Full name <span className="form-required" aria-hidden="true">*</span></span><input name="name" value={values.name} onChange={change} autoComplete="name" required minLength={2} maxLength={100} /></label><label><span>Email address <span className="form-required" aria-hidden="true">*</span></span><input type="email" name="email" value={values.email} onChange={change} autoComplete="email" required maxLength={254} /></label></div>
      <div className="form-phone-row"><div className="country-code-field"><label htmlFor="country-code">Country code <span className="form-required" aria-hidden="true">*</span></label><div className="ui-select country-code-select"><select id="country-code" value={customCode ? "other" : values.countryCode} onChange={changeCountryCode} aria-label="Country calling code">{callingCodes.map(([code, label]) => <option value={code} key={code}>{label}</option>)}<option value="other">Other code</option></select><ChevronDown size={16} aria-hidden="true" /></div>{customCode && <input type="tel" name="countryCode" value={values.countryCode} onChange={change} autoComplete="tel-country-code" inputMode="tel" required pattern="\+[1-9][0-9]{0,3}" maxLength={5} placeholder="e.g. +81" aria-label="Other country calling code" />}</div><label><span>Contact number <span className="form-required" aria-hidden="true">*</span></span><input type="tel" name="phone" value={values.phone} onChange={change} autoComplete="tel-national" inputMode="tel" required minLength={6} maxLength={24} placeholder="Your phone number" /></label></div>
      <label><span>Approximate budget <span className="form-required" aria-hidden="true">*</span><span className="form-label-note">Any currency is fine</span></span><input name="budget" value={values.budget} onChange={change} required maxLength={80} placeholder="e.g. INR 50,000 or USD 1,200" /></label>
      <TurnstileWidget onToken={onToken} resetKey={challengeReset} />
      <p className="form-privacy-note">We use these details to reply about your project. Read our <Link href="/privacy-policy" target="_blank">Privacy Policy</Link>.</p>
    </div>}
    <div className="form-trap" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={change} /></label></div>
    <div className="form-navigation">{step > 0 && <button type="button" className="form-back" onClick={() => setStep(current => current - 1)}><ArrowLeft size={17} aria-hidden="true" />Back</button>}{step < 2 ? <button type="button" className="form-submit" onClick={next}>Continue<ArrowRight size={18} aria-hidden="true" /></button> : <button type="submit" disabled={status === "sending" || !turnstileToken} className="form-submit">{status === "sending" ? "Sending..." : "Send enquiry"}<ArrowUpRight size={18} aria-hidden="true" /></button>}</div>
    {feedback && <p className={`form-feedback ${status}`} role="status">{feedback}</p>}
  </form>;
}
