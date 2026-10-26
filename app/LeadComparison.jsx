"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, BellRing, Check, MessageCircle, Pause, Play, RotateCcw, Sparkles } from "lucide-react";
import { useReducedMotion } from "./useMotionPreference";

const lastStep = 7;
const enter = { initial: { opacity: 0, y: 12, scale: 0.97 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 0.4, ease: "easeOut" } };

function Bubble({ children, incoming = false, reduced }) {
  return <motion.p className={`lead-story-bubble ${incoming ? "is-incoming" : "is-outgoing"}`} {...(reduced ? {} : enter)}>{children}</motion.p>;
}

function ChatLane({ automated, step, reduced }) {
  const messagesRef = useRef(null);

  useEffect(() => {
    if (!automated || !messagesRef.current) return;
    const frame = requestAnimationFrame(() => {
      messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: reduced ? "instant" : "smooth" });
    });
    return () => cancelAnimationFrame(frame);
  }, [automated, reduced, step]);

  return <div className={`lead-story-lane ${automated ? "is-ai" : "is-basic"}`}>
    <div className="lead-story-lane-top"><span className="lead-story-lane-label">{automated ? "YOUR COMPETITOR / AI AUTOMATION" : "YOUR BUSINESS / BASIC AUTO-REPLY"}</span><span className="lead-story-lane-icon">{automated ? <Sparkles size={17} aria-hidden="true" /> : <MessageCircle size={17} aria-hidden="true" />}</span></div>
    <div className="lead-story-chat">
      <div className="lead-story-chat-head"><span className="lead-story-avatar">P</span><div><strong>Apartment enquiry</strong><small>{automated ? "Competitor's AI assistant" : "Your property team"}</small></div><span className="lead-story-chat-dots" aria-hidden="true">•••</span></div>
      <div ref={messagesRef} className="lead-story-messages" aria-label={automated ? "AI-assisted example conversation" : "Basic auto-reply example conversation"}>
        <span className="lead-story-time">Today, 11:04 PM</span>
        <Bubble reduced={reduced}>Hi, I'm looking for an apartment. Can I arrange a viewing?</Bubble>
        <AnimatePresence>
          {step >= 1 && <Bubble key="reply" incoming reduced={reduced}>{automated ? "Happy to help. Which location and how many bedrooms are you looking for?" : "Hi! Thanks for contacting us. Our team will get back to you soon."}</Bubble>}
          {automated && step >= 2 && <Bubble key="location" reduced={reduced}>Whitefield, Bengaluru. A 2-bedroom apartment.</Bubble>}
          {automated && step >= 3 && <Bubble key="budget-question" incoming reduced={reduced}>What budget and carpet area would work for you?</Bubble>}
          {automated && step >= 4 && <Bubble key="budget" reduced={reduced}>Up to INR 1.2 crore, around 1,100 sq ft.</Bubble>}
          {automated && step >= 5 && <Bubble key="visit-question" incoming reduced={reduced}>I can arrange a site visit. What's your name, email, and preferred time?</Bubble>}
          {automated && step >= 6 && <Bubble key="visit-details" reduced={reduced}>Riya Sharma, riya@example.com. Saturday at 11 AM works for me.</Bubble>}
          {automated && step >= 7 && <Bubble key="visit-confirmation" incoming reduced={reduced}>Thanks, Riya. Your site visit for a 2 BHK in Whitefield is booked for Saturday at 11 AM. Our property manager has your details.</Bubble>}
        </AnimatePresence>
        {!automated && step >= 2 && <motion.div className="lead-story-silence" {...(reduced ? {} : enter)}><span className="lead-story-silence-line" /><span>No requirements captured. The buyer keeps looking.</span><span className="lead-story-silence-line" /></motion.div>}
      </div>
      <div className="lead-story-input" aria-hidden="true"><span>Message</span><ArrowRight size={15} /></div>
    </div>
    <div className="lead-story-outcome" aria-live="polite">{automated ? <><Check size={17} aria-hidden="true" /><span>{step >= lastStep ? "Buyer qualified. Site visit booked. Owner notified." : "The competitor keeps the conversation moving."}</span></> : <><span className="lead-story-outcome-dot" /><span>{step >= 2 ? "You have no buyer details or booked visit." : "A reply alone is not a follow-up."}</span></>}</div>
  </div>;
}

export default function LeadComparison() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView || started) return;
    setStarted(true);
    if (reduced) setStep(lastStep);
    else setPlaying(true);
  }, [inView, reduced, started]);

  useEffect(() => {
    if (!playing) return undefined;
    if (step >= lastStep) {
      setPlaying(false);
      return undefined;
    }
    const timer = setTimeout(() => setStep(current => current + 1), step === 0 ? 1050 : 1450);
    return () => clearTimeout(timer);
  }, [playing, step]);

  function togglePlayback() {
    if (step >= lastStep) {
      setStep(0);
      setPlaying(!reduced);
    } else setPlaying(current => !current);
  }

  return <div ref={ref} className="lead-story">
    <div className="lead-story-heading"><div><p className="process-eyebrow">ONE BUYER. TWO PROPERTY BUSINESSES.</p><h3>Your missed enquiry could become your competitor's site visit.</h3><p>Imagine a buyer messaging after hours. Your generic auto-reply leaves them waiting. Your competitor's AI assistant learns their budget and requirements, then books a viewing before your team responds. They are already a step closer to closing the deal.</p></div><span className="lead-story-demo-label">ILLUSTRATIVE DEMO</span></div>
    <div className="lead-story-controls"><div className="lead-story-progress" aria-label={`Story step ${step + 1} of ${lastStep + 1}`}>{Array.from({ length: lastStep + 1 }, (_, index) => <button key={index} type="button" className={index <= step ? "is-active" : ""} aria-label={`Show story step ${index + 1}`} aria-current={index === step ? "step" : undefined} onClick={() => { setStep(index); setPlaying(false); }} />)}</div><button className="lead-story-play" type="button" onClick={togglePlayback}>{step >= lastStep ? <RotateCcw size={16} aria-hidden="true" /> : playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}{step >= lastStep ? "Replay story" : playing ? "Pause story" : "Play story"}</button></div>
    <div className="lead-story-grid"><ChatLane step={step} reduced={reduced} /><ChatLane step={step} automated reduced={reduced} /></div>
    <div className={`lead-story-alert ${step >= lastStep ? "is-visible" : ""}`} aria-live="polite"><div className="lead-story-alert-icon"><BellRing size={20} aria-hidden="true" /></div><div>{step >= lastStep ? <><span>COMPETITOR ALERT · SITE VISIT BOOKED</span><strong>Riya Sharma · 2 BHK in Whitefield · Up to INR 1.2 crore · ~1,100 sq ft</strong><p>Saturday at 11 AM · riya@example.com. Their property manager has the visit details.</p></> : <><span>THE NEXT STEP</span><strong>Waiting for the details a property team needs.</strong><p>The outcome appears when the conversation finishes.</p></>}</div>{step >= lastStep && <Check size={19} className="lead-story-alert-check" aria-hidden="true" />}</div>
    <p className="lead-story-note">Illustrative comparison, not a live booking or guaranteed sale. Real workflows check availability, use approved property details and consent rules, and hand off to your team.</p>
  </div>;
}
