"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Bot, CalendarDays, LayoutDashboard, Mail, MessageCircle, Play, RotateCcw, ShoppingBag } from "lucide-react";
import { useReducedMotion } from "./useMotionPreference";

const examples = [
  {
    title: "WhatsApp lead follow-up",
    type: "WhatsApp + lead capture",
    icon: MessageCircle,
    steps: ["A customer starts a WhatsApp chat", "Approved questions capture what they need", "The lead is logged and your team is alerted"],
    handoff: "A person takes over for pricing and detailed conversations.",
  },
  {
    title: "CRM pipeline dashboard",
    type: "Leads + sales visibility",
    icon: LayoutDashboard,
    steps: ["A new lead arrives from a connected channel", "Its stage, owner and next task are updated", "The dashboard shows what needs attention"],
    handoff: "Your team decides priorities and moves deals forward.",
  },
  {
    title: "Social content autopilot",
    type: "AI drafts + scheduling",
    icon: CalendarDays,
    steps: ["A topic enters your content queue", "AI drafts a post from your brand guidance", "A person approves it before scheduling"],
    handoff: "Your team reviews claims, tone and visuals before anything goes live.",
  },
  {
    title: "Email follow-up",
    type: "Opt-in email + CRM",
    icon: Mail,
    steps: ["A visitor opts in through a form", "A relevant email sequence is triggered", "Replies and opt-outs are routed correctly"],
    handoff: "Your team handles replies and approves campaign content.",
  },
  {
    title: "Store order updates",
    type: "E-commerce + operations",
    icon: ShoppingBag,
    steps: ["A customer completes checkout", "The order reaches your tracking system", "Your team and customer get the right updates"],
    handoff: "Your team handles exceptions, fulfilment and customer requests.",
  },
  {
    title: "AI enquiry assistant",
    type: "AI + human handoff",
    icon: Bot,
    steps: ["A visitor asks a common question", "AI answers from approved business information", "Complex requests are sent to your team"],
    handoff: "Uncertain answers and sensitive decisions stay with a human.",
  },
];

function WorkflowDemo({ example, index }) {
  const [active, setActive] = useState(-1);
  const [running, setRunning] = useState(false);
  const reduced = useReducedMotion();
  const Icon = example.icon;

  useEffect(() => {
    if (!running) return undefined;
    if (active === example.steps.length - 1) {
      setRunning(false);
      return undefined;
    }
    const timer = setTimeout(() => setActive(step => step + 1), 750);
    return () => clearTimeout(timer);
  }, [active, running, example.steps.length]);

  function play() {
    setActive(reduced ? example.steps.length - 1 : 0);
    setRunning(!reduced);
  }

  return <article className="automation-example">
    <div className="automation-example-top"><span>DEMO 0{index + 1}</span><Icon size={22} aria-hidden="true" /></div>
    <p className="automation-example-type">{example.type}</p>
    <h3>{example.title}</h3>
    <ol>{example.steps.map((step, stepIndex) => <li className={active >= stepIndex ? "is-active" : ""} key={step}>
      <span className="automation-step-number">0{stepIndex + 1}</span><span>{step}</span>{stepIndex < example.steps.length - 1 && <ArrowRight size={15} aria-hidden="true" />}
    </li>)}</ol>
    <p className="automation-handoff"><strong>Human handoff</strong>{example.handoff}</p>
    <button type="button" onClick={play} disabled={running} aria-label={`${active < 0 ? "Play" : "Replay"} ${example.title} demo`}>
      {active < 0 ? <Play size={16} /> : <RotateCcw size={16} />}{running ? "Running workflow" : active < 0 ? "Play workflow" : "Replay workflow"}
    </button>
  </article>;
}

export default function AutomationExamples() {
  return <div className="automation-examples">
    <div className="automation-examples-heading"><div><p className="process-eyebrow">WORKFLOW EXAMPLES</p><h3>See where manual work disappears.</h3></div><p>Six ways a tailored workflow can qualify, route, update, and escalate work across your existing tools.</p></div>
    <div className="automation-example-grid">{examples.map((example, index) => <WorkflowDemo key={example.title} example={example} index={index} />)}</div>
  </div>;
}
