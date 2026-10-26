"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "./useMotionPreference";
import { ArrowUpRight, Check, Globe, Workflow, Bot, Gauge, MessageSquare, Clock3, Mail } from "lucide-react";
import SocialLinks from "./SocialLinks";

function useDesktopMotion() {
  const reduced = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const query = matchMedia("(min-width: 1024px) and (pointer: fine)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return desktop && !reduced;
}

export function AgencyCursor() {
  const enabled = useDesktopMotion();
  const x = useMotionValue(-200), y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 220, damping: 26 });
  const sy = useSpring(y, { stiffness: 220, damping: 26 });
  const [mode, setMode] = useState("ring");
  useEffect(() => {
    if (!enabled) return;
    const move = (event) => {
      x.set(event.clientX); y.set(event.clientY);
      const section = event.target.closest("[data-cursor]");
      setMode(section?.dataset.cursor || (event.target.closest("a, button") ? "link" : "ring"));
    };
    const hide = () => { x.set(-200); y.set(-200); };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    return () => { window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", hide); };
  }, [enabled, x, y]);
  if (!enabled) return null;
  return <motion.div aria-hidden="true" className={`agency-cursor cursor-${mode}`} style={{ x: sx, y: sy }}>
    {mode === "orbit" ? <svg viewBox="0 0 100 100"><defs><path id="cursor-orbit" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" /></defs><text><textPath href="#cursor-orbit">EXPLORE WORK • EXPLORE WORK • </textPath></text></svg> : <span />}
  </motion.div>;
}

export function HeroSystem() {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reduced) return;
    let timer;
    const observer = new IntersectionObserver(([entry]) => {
      clearInterval(timer);
      if (entry.isIntersecting) timer = setInterval(() => setStep(value => (value + 1) % 4), 2000);
    });
    observer.observe(ref.current);
    return () => { observer.disconnect(); clearInterval(timer); };
  }, [reduced]);
  const nodes = [[Globe, "Website"], [Bot, "AI assistant"], [Workflow, "CRM"], [Mail, "Follow-up"]];
  return <div ref={ref} className="hero-system" data-cursor="soft">
    <div className="system-top"><span><span className="status-dot" /> CONNECTED BY WEBCENTRIKX</span><span>DEMO WORKFLOW</span></div>
    <div className="system-site"><div className="browser-bar"><span /><span /><span /><small>yourbrand.com</small><Globe size={14} /></div>
      <div className="mini-site"><div><small>YOUR NEXT CHAPTER</small><h3>A better first<br />impression.</h3><span className="mini-cta">Let&apos;s get started <ArrowUpRight size={14} /></span></div><div className="site-graphic"><div /><div /><div /></div></div>
    </div>
    <div className="demo-metrics"><div><small>Page experience</small><strong>Fast by design</strong><div className="speed-track"><span /></div></div><div><small>Sample weekly enquiries</small><strong>48 <span>this week</span></strong><div className="activity-bars" role="img" aria-label="Demo enquiry chart, not client results">{[30, 46, 36, 65, 55, 78, 94].map((height, index) => <motion.i key={index} style={{ height: `${height}%` }} animate={reduced ? {} : { scaleY: step % 2 ? 0.8 : 1 }} transition={{ duration: 0.7, delay: index * 0.06 }} />)}</div></div></div>
    <div className="workflow-nodes">{nodes.map(([Icon, label], index) => <div key={label} className={`workflow-node ${step >= index ? "is-active" : ""}`}><span><Icon size={20} /></span><small>{label}</small>{index < 3 && <i />}</div>)}</div>
    <div className="system-event"><Check size={16} /><span>{["Enquiry received from your website", "AI collects the project requirements", "Contact saved and assigned in your CRM", "Personalised follow-up ready to send"][step]}</span><span className="event-index">0{step + 1}/04</span></div>
  </div>;
}

export function MovingHeadlines() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const left = useTransform(scrollYProgress, [0, 1], [-160, 50]);
  const right = useTransform(scrollYProgress, [0, 1], [50, -160]);
  return <div ref={ref} className="moving-headlines" aria-label="Designed to connect. Built to move you forward."><motion.p aria-hidden="true" style={{ x: reduced ? 0 : left }}>Designed to connect. Designed to connect.</motion.p><motion.p aria-hidden="true" style={{ x: reduced ? 0 : right }}>Built to move you forward. Built to move you forward.</motion.p></div>;
}

const problems = [
  [Gauge, "Speed earns attention.", "Slow websites lose visitors before they understand your offer.", "Make the first impression count."],
  [MessageSquare, "Clarity builds confidence.", "Confusing messaging leaves good leads unsure of their next step.", "Give every page a clear purpose."],
  [Clock3, "Follow-up keeps it moving.", "Manual follow-ups let promising conversations fall through the cracks.", "Connect the steps that come next."],
];

function SplitCard({ item: [Icon, title, body, note], index, progress, enabled }) {
  const x = useTransform(progress, [0, 0.4, 1], [0, 0, (index - 1) * 24]);
  const rotate = useTransform(progress, [0, 0.4, 1], [0, 0, (index - 1) * 3]);
  return <motion.article className="problem-card fill-card" style={enabled ? { x, rotate } : {}}><Icon size={30} /><h3>{title}</h3><p>{body}</p><small>{note}</small></motion.article>;
}

export function SplitProblems() {
  const ref = useRef(null);
  const enabled = useDesktopMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 35%"] });
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.94, 0.94]);
  const gap = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0, 20]);
  return <section ref={ref} className="problem-section" data-cursor="soft"><motion.div className="problem-grid" style={enabled ? { scale, gap } : {}}>{problems.map((item, index) => <SplitCard key={item[1]} item={item} index={index} progress={scrollYProgress} enabled={enabled} />)}</motion.div></section>;
}

export function HorizontalStack({ children }) {
  const ref = useRef(null), track = useRef(null), viewport = useRef(null);
  const enabled = useDesktopMotion();
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 20%", "end 80%"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  useEffect(() => {
    const measure = () => setDistance(Math.max(0, track.current.scrollWidth - viewport.current.clientWidth));
    const observer = new ResizeObserver(measure);
    observer.observe(viewport.current); observer.observe(track.current); measure();
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`stack-scroll ${enabled ? "stack-animated" : ""}`}><div ref={viewport} className="stack-viewport" tabIndex={enabled ? undefined : 0} aria-label="Technology platforms"><motion.div ref={track} className="stack-track" style={{ x: enabled ? x : 0 }}>{children}</motion.div></div></div>;
}

export function BrandFooter() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 85, damping: 25, mass: 0.6 });
  const y = useTransform(progress, [0, 1], [90, 0]);
  const opacity = useTransform(progress, [0, 0.8, 1], [0.15, 1, 1]);
  const scale = useTransform(progress, [0, 1], [0.9, 1]);
  return <footer ref={ref} className="brand-footer" data-cursor="soft">
    <div className="footer-top"><p>Custom websites. Business-tailored AI.<br /><span>Built for what comes next.</span></p><a href="#top">Back to top <ArrowUpRight size={18} /></a></div>
    <motion.svg style={{ y: reduced ? 0 : y, opacity: reduced ? 1 : opacity, scale: reduced ? 1 : scale }} className="footer-wordmark" viewBox="0 0 1200 210" role="img" aria-label="webcentrikx"><defs><linearGradient id="brand-fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f4f6f5" /><stop offset="100%" stopColor="#242a28" /></linearGradient></defs><text x="600" y="175" textAnchor="middle" textLength="1170" lengthAdjust="spacingAndGlyphs" fill="url(#brand-fade)">webcentrikx</text></motion.svg>
    <div className="footer-bottom"><span>Webcentrikx</span><SocialLinks placement="footer" /><a href="mailto:hello@webcentrikx.com">hello@webcentrikx.com</a></div>
  </footer>;
}
