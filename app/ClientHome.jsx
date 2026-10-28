"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AgencyCursor, HeroSystem, BrandFooter } from "./MotionShowcase";
import WorkExperience from "./WorkExperience";
import ProcessExperience, { AmbientFlow } from "./ProcessExperience";
import InquiryForm from "./InquiryForm";
import CalendlyBooking from "./CalendlyBooking";
import { bookingUrl, openCalendlyPopup } from "./calendlyPopup";
import { ClientProof, FounderVoices, FounderAuthority, ScopeGuide, FrequentlyAsked } from "./ConversionSections";
import SocialLinks from "./SocialLinks";
import AutomationExamples from "./AutomationExamples";
import LeadComparison from "./LeadComparison";
import WhatsAppWidget from "./WhatsAppWidget";
import { motion, MotionConfig } from "framer-motion";
import { useReducedMotion } from "./useMotionPreference";
import { ArrowUpRight, CalendarDays, Clock3, Menu, MessageSquareWarning, PanelsTopLeft, X } from "lucide-react";
import {
  siClaude,
  siModelcontextprotocol,
  siN8n,
  siNextdotjs,
} from "simple-icons/icons";

const navItems = [
  ["Services", "#services"],
  ["Automation", "#automation"],
  ["Work", "#results"],
  ["Process", "#process"],
  ["Pricing", "#scope"],
  ["FAQ", "#faq"],
  ["Contact", "#contact"],
];

const problems = [
  { title: "A weak interface loses trust.", body: "Broken layouts and slow pages make buyers work to understand your offer. Many leave before they reach the form.", icon: PanelsTopLeft },
  { title: "A missed reply loses the lead.", body: "An enquiry at 11 PM should not sit unanswered until your team is back online.", icon: MessageSquareWarning },
  { title: "Manual updates drain the day.", body: "Copying details between inboxes, sheets, and CRM tools costs attention your team could spend on customers.", icon: Clock3 },
];

const services = [
  {
    title: "Custom Websites",
    body: "Fast Next.js websites, commerce experiences, and modern SaaS interfaces built around clear journeys, resilient components, and measurable business actions.",
  },
  {
    title: "Business-Tailored AI Automations",
    body: "Custom n8n workflows and AI agents that qualify leads, move data between tools, trigger follow-ups, and give your team a clear point to take over.",
  },
];

const stack = [
  ["Next.js", "The foundation for fast, custom web experiences and capable SaaS interfaces.", siNextdotjs],
  ["n8n", "The orchestration layer connecting lead capture, CRM, notifications, and operations.", siN8n],
  ["Claude", "AI reasoning for approved knowledge, structured answers, and useful agent tasks.", siClaude],
  ["MCP", "A standard way to give AI workflows controlled access to the tools they need.", siModelcontextprotocol],
];

const work = [
  {
    title: "Al Taleb Mobile",
    type: "E-commerce website",
    body: "An electronics storefront that brings phones, laptops, and everyday essentials into one browsing experience, with clear categories and offers close at hand.",
    href: "https://altalebmobile.com/",
    image: "/assets/work-altalebmobile.png",
    alt: "Screenshot of Al Taleb Mobile website",
  },
  {
    title: "Earthy East Organics",
    type: "Organic store website",
    body: "A welcoming storefront for organic products, with straightforward navigation and a clear path from discovering a product to adding it to the cart.",
    href: "https://earthyeast.in/",
    image: "/assets/work-earthyeast.png",
    alt: "Screenshot of Earthy East Organics website",
  },
];

work.push(
  { title: "Forma Studio", type: "Architecture / Concept", body: "A sample portfolio for an architecture studio, balancing space, structure, and a direct project enquiry.", href: "/concepts/forma.html", image: "/assets/work-forma.png", alt: "Forma Studio concept website screenshot" },
  { title: "Relay", type: "Automation platform / Concept", body: "A sample product website for a connected workspace, with a clear offer and a focused product story.", href: "/concepts/relay.html", image: "/assets/work-relay.png", alt: "Relay automation concept website screenshot" }
);

const steps = [
  ["Audit the opportunity", "We map the buyer journey or manual workflow, identify friction, and agree on the outcome to improve."],
  ["Architect the solution", "You get a clear scope, interface or workflow plan, milestones, and the decisions needed from your team."],
  ["Build and validate", "We develop the web experience or automation, test real paths and edge cases, and review it with you."],
  ["Launch and hand over", "We deploy, document ownership and operating steps, and support the agreed post-launch period."],
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const revealParent = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const wordReveal = {
  hidden: { opacity: 0, y: 34, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function SmoothScroll() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    let scroll;
    let cancelled = false;

    import("locomotive-scroll").then(({ default: LocomotiveScroll }) => {
      if (cancelled) return;
      scroll = new LocomotiveScroll({
        lenisOptions: {
          lerp: 0.08,
          duration: 1.15,
          smoothWheel: true,
          wheelMultiplier: 0.9,
        },
      });
    });

    return () => {
      cancelled = true;
      scroll?.destroy?.();
    };
  }, [shouldReduceMotion]);

  return null;
}

function AnimatedTitle({ children, as = "h2", className, accentWords = [] }) {
  const reduced = useReducedMotion();
  const words = children.split(" ");
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      variants={revealParent}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      aria-label={children}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block pr-[0.16em] align-bottom">
          <motion.span
            aria-hidden="true"
            className={`inline-block${accentWords.includes(word.toLowerCase().replace(/[^a-z]/g, "")) ? " accent-word" : ""}`}
            variants={wordReveal}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

function LogoMark({ icon, name }) {
  return (
    <div className="grid size-14 place-items-center rounded-2xl border border-slate-200 bg-white shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
      <svg viewBox="0 0 24 24" role="img" aria-label={`${name} logo`} className="size-7" style={{ color: `#${icon.hex}` }}>
        <path d={icon.path} fill="currentColor" />
      </svg>
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-teal-700">
      {children}
    </p>
  );
}

export default function ClientHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  async function openBooking() {
    if (bookingLoading) return;
    setMenuOpen(false);
    setBookingLoading(true);
    try {
      await openCalendlyPopup();
    } catch {
      window.location.assign(bookingUrl);
    } finally {
      setBookingLoading(false);
    }
  }

  return (
    <MotionConfig reducedMotion="user"><main className="min-h-dvh overflow-x-clip">
      <AgencyCursor />
      <SmoothScroll />
      <WhatsAppWidget />
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#f5f7fb]/85 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="Webcentrikx home">
            <div className="grid size-10 place-items-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-xl shadow-slate-900/15">
              W
            </div>
            <span className="text-lg font-black tracking-tight">Webcentrikx</span>
          </a>
          <nav className="hidden items-center gap-5 text-sm font-semibold text-slate-600 xl:flex" aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} className="transition hover:text-slate-950">
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <SocialLinks placement="header" />
            <button type="button" onClick={openBooking} disabled={bookingLoading} aria-busy={bookingLoading} className="header-contact hidden min-h-11 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-black text-white shadow-xl shadow-slate-900/15 transition hover:-translate-y-0.5 active:translate-y-0 md:inline-flex">{bookingLoading ? "Opening..." : "Book a Call"}</button>
            <button type="button" className="mobile-menu-button xl:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(open => !open)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
          </div>
        </div>
        <nav id="mobile-navigation" className="mobile-nav xl:hidden" hidden={!menuOpen} aria-label="Mobile navigation">
          {navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <button type="button" className="mobile-nav-contact" onClick={openBooking} disabled={bookingLoading} aria-busy={bookingLoading}>{bookingLoading ? "Opening..." : "Book a Call"}</button>
          <SocialLinks placement="menu" />
        </nav>
      </motion.header>

      <section id="top" className="hero-ambient mx-auto grid min-h-[calc(100dvh-80px)] max-w-7xl items-center gap-10 px-5 py-14 md:grid-cols-[1fr_0.9fr] md:px-8 md:py-16">
        <AmbientFlow />
        <motion.div variants={revealParent} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} transition={{ duration: 0.55 }}>
            <SectionLabel>Custom websites / Business-tailored AI automation</SectionLabel>
          </motion.div>
          <AnimatedTitle as="h1" className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-slate-950 md:text-6xl lg:text-7xl">
            Web experiences that convert. AI workflows that keep up.
          </AnimatedTitle>
          <motion.p variants={fadeUp} transition={{ duration: 0.65, ease: "easeOut" }} className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            We build fast Next.js websites that help turn interest into enquiries, and custom AI workflows that qualify, route, and follow up with leads while your team stays in control.
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.65, ease: "easeOut" }} className="mt-8 flex flex-wrap gap-3">
            <motion.button type="button" whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} onClick={openBooking} disabled={bookingLoading} aria-busy={bookingLoading} className="hero-call-cta inline-flex min-h-12 items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 text-sm font-black text-slate-950 shadow-sm transition hover:-translate-y-0.5"><CalendarDays size={17} aria-hidden="true" />{bookingLoading ? "Opening calendar..." : "Book a Call"}</motion.button>
          </motion.div>
          <motion.p variants={fadeUp} transition={{ duration: 0.65, ease: "easeOut" }} className="hero-call-note">30 minutes with Sumit, the founder · Discuss your project and next steps</motion.p>
        </motion.div>

        <HeroSystem />
      </section>
      <section id="problem" className="page-section problem-section px-5 md:px-8">
        <div className="problem-inner"><p className="process-eyebrow">THE COST OF DISCONNECTED DIGITAL WORK</p><h2>A polished front end is only half the job.</h2><div className="problem-grid">{problems.map(({ title, body, icon: Icon }) => <article key={title}><Icon size={26} aria-hidden="true" /><h3>{title}</h3><p>{body}</p></article>)}</div></div>
      </section>
      <section id="services" className="page-section mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <SectionLabel>Two ways to remove friction</SectionLabel>
          <AnimatedTitle className="text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            One partner. Two disciplines.
          </AnimatedTitle>
        </Reveal>
        <div className="section-content service-grid grid md:grid-cols-2">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -8 }}
              viewport={{ once: true, amount: 0.32 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
              className="fill-card rounded-lg border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-xl hover:shadow-slate-900/10"
            >
              <div className="mb-8 h-1.5 w-14 rounded-full bg-teal-700" />
              <h3 className="text-2xl font-black tracking-tight text-slate-950">{service.title}</h3>
              <p className="mt-4 leading-7 text-slate-600">{service.body}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="automation" data-cursor="soft" className="page-section bg-white px-5 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <SectionLabel>AI automation deep dive</SectionLabel>
            <AnimatedTitle className="text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Every lead routed. Every handoff clearer.
            </AnimatedTitle>
          </Reveal>
          <Reveal className="automation-detail" delay={0.08}>
            <p className="text-lg leading-8 text-slate-700">
              A custom n8n workflow can capture an enquiry after hours, ask the right qualification questions, update your CRM, and alert the right person. Claude and MCP can add useful reasoning and tool access where the task calls for it. Your team receives context instead of another inbox to check.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Qualify leads before your team replies", "Route enquiries to the right owner", "Keep CRM and inbox data in sync", "Escalate exceptions to a person"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="automation-benefit text-sm font-semibold text-slate-800"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
        <LeadComparison />
        <AutomationExamples />
        <div className="automation-reading">
          <div className="automation-reading-intro"><p className="process-eyebrow">PRACTICAL INSIGHTS</p><h3>The thinking behind the workflow.</h3><p>Two closer looks at how useful automation captures context and keeps people in control.</p></div>
          <div className="automation-reading-links">
            <Link href="/insights/lead-qualification"><span>01</span><span><strong>Lead qualification with n8n</strong><small>From first enquiry to a clear CRM handoff.</small></span><ArrowUpRight size={19} aria-hidden="true" /></Link>
            <Link href="/insights/workflow-handoffs"><span>02</span><span><strong>AI handoffs and failure paths</strong><small>What happens when an answer needs a person.</small></span><ArrowUpRight size={19} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section id="stack" className="page-section mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <SectionLabel>Tech stack</SectionLabel>
          <AnimatedTitle className="text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Engineered with purpose.
          </AnimatedTitle>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Next.js shapes the web experience. n8n connects the operations. Claude and MCP extend what a well-governed AI workflow can do.
          </p>
        </Reveal>
        <div className="stack-grid">
          {stack.map(([name, body, icon], index) => (
            <motion.article
              key={name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -8, scale: 1.015 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.52, delay: index * 0.045, ease: "easeOut" }}
              className="fill-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-xl hover:shadow-slate-900/10"
            >
              <LogoMark icon={icon} name={name} />
              <h3 className="mt-8 text-2xl font-black tracking-tight text-slate-950">{name}</h3>
              <p className="mt-3 leading-7 text-slate-600">{body}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <ClientProof />
      <FounderVoices />
      <WorkExperience projects={work} />
      <FounderAuthority />
      <ProcessExperience steps={steps} />
      <ScopeGuide />
      <FrequentlyAsked />

      <section id="contact" className="page-section contact-section px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="contact-content mx-auto grid max-w-[1216px] gap-8 text-white lg:grid-cols-2"
        >
          <div className="contact-intro"><p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-teal-200">YOUR NEXT MOVE</p>
            <AnimatedTitle className="max-w-4xl text-4xl font-black tracking-tight md:text-5xl">Build with clarity from the first call.</AnimatedTitle>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">Book a 30-minute discovery call to discuss your website or automation goals. Prefer writing first? Send a short brief beside it.</p><p className="contact-hours">Working hours: Monday–Friday, 9:00 AM–6:00 PM IST (UTC+05:30).</p><Link className="contact-audit-link" href="/readiness">Not ready for a call? Try the free readiness checklist <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
          <div id="book-call" className="contact-option"><div className="contact-option-heading"><span>01 / DISCOVERY CALL</span><h3>Book a Call.</h3><p>Choose a time. We will discuss the opportunity, likely scope, and a practical next step.</p></div><CalendlyBooking /></div>
          <div id="contact-enquiry" className="contact-option"><div className="contact-option-heading"><span>02 / PROJECT ENQUIRY</span><h3>Send a project brief.</h3><p>Share the essentials and we will reply by email with the next step.</p></div><InquiryForm /><p className="contact-email">Prefer email? <a href="mailto:hello@webcentrikx.com">hello@webcentrikx.com</a></p></div>
        </motion.div>
      </section>

      <BrandFooter />
    </main></MotionConfig>
  );
}
