"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronDown, Quote } from "lucide-react";
import SectionCta from "./SectionCta";
import { BrandIcon } from "./SocialLinks";
import VoiceAmbient from "./VoiceAmbient";

const cases = [
  {
    title: "Al Taleb Mobile", category: "Electronics e-commerce", client: "Mohd Atif", image: "/assets/work-altalebmobile.png", url: "https://altalebmobile.com/",
    problem: "Product questions and orders came through calls and DMs, leaving the team to handle each enquiry manually without a storefront customers could explore.",
    built: "A live electronics store with clear categories, product browsing, and a direct online path to purchase.",
    outcome: "Customers can browse before contacting the team. Mohd Atif reported less time spent managing orders manually and stronger sales after launch.",
    currentOrders: "About 10-15 orders per day",
  },
  {
    title: "Earthy East Organics", category: "Organic products e-commerce", client: "Krishika Chaudhary", image: "/assets/work-earthyeast.png", url: "https://earthyeast.in/",
    problem: "Shoppers had no central place to discover the products or buy online, while orders through calls and DMs took the founder's time.",
    built: "A product-led store with clear navigation, imagery, and a straightforward path from discovery to checkout.",
    outcome: "The store gave the brand a credible online home. Krishika reported less manual order handling and stronger sales after launch.",
    currentOrders: "About 5-6 orders per day", caseStudy: "/work/earthy-east",
  },
];

const packages = [
  {
    name: "Landing Page Sprint", priceUsd: 500, summary: "One focused page for one offer and a clear next step.",
    includes: ["One custom-designed landing page", "Responsive Next.js build", "Focused copy and lead capture journey", "Core SEO and performance checks"],
  },
  {
    name: "Commerce Architecture", priceUsd: 1200, summary: "A considered storefront that makes browsing and buying easier.", featured: true,
    includes: ["Storefront design and setup", "Up to 20 product uploads", "Collections, cart and payment setup", "Order notifications and team handover"],
  },
  {
    name: "SaaS UI Build", priceUsd: 2000, summary: "A focused dashboard or portal interface for your product's next stage.",
    includes: ["Product journey and screen architecture", "Responsive Next.js interface", "Reusable UI components", "Integration scope and developer handover"],
  },
  {
    name: "Custom AI Automation & Workflow Audits", custom: true, summary: "For businesses with a website that need their operations to scale.",
    includes: ["Workflow audit and opportunity map", "Prioritized automation roadmap", "Scoped n8n, Claude and MCP implementation", "Testing, alerts and human handoff"],
  },
];
const featuredIndex = packages.findIndex(item => item.featured);

const questions = [
  ["How much does a project cost?", "A focused landing page starts at USD 500. Commerce and SaaS UI builds start at USD 1,200 and 2,000. Multi-page websites and AI workflow projects are scoped against your requirements. Any additions are priced before work begins."],
  ["How do payments work?", "A 50% upfront deposit secures the project. The remaining payment schedule and deliverables are stated in your proposal before work begins."],
  ["How long will it take?", "A focused website and a connected multi-system workflow have different schedules. We agree the timeline, milestones, and dependencies in writing before starting."],
  ["Who supplies the copy and images?", "Tell us what you already have. The proposal states what copywriting, image sourcing or content support is included and what your team needs to provide."],
  ["How many revisions are included?", "Web-build packages include three revision rounds. AI audit and workflow review rounds are defined in the tailored proposal before work starts."],
  ["Who owns the website and accounts?", "Ownership, access and handover are documented in the project agreement. We clarify domains, hosting and third-party accounts before setup."],
  ["What happens after launch?", "Web builds include 60 days of support for minor bugs, errors, and agreed small updates. Automation support and monitoring terms are scoped in the proposal. New features and ongoing maintenance are separate."],
  ["Will there be ongoing costs?", "Hosting, domains, paid plugins, automation tools and AI usage can have recurring charges. We list the tools and known ongoing costs in your proposal."],
  ["What if an automation needs a human?", "We map approvals, alerts and handoffs during discovery. AI and automations should have clear points where your team can review or take over."],
];

export function ClientProof() {
  return <section id="results" className="page-section client-proof"><div className="proof-inner">
    <div className="proof-heading"><p className="process-eyebrow">LIVE CLIENT CASE STUDIES</p><h2>Web builds doing real business work.</h2><p>Al Taleb Mobile and Earthy East Organics moved product discovery and purchasing from scattered messages to dedicated online stores.</p></div>
    <div className="proof-grid">{cases.map(item => <article className="proof-item" key={item.title}>
      <a href={item.url} target="_blank" rel="noreferrer" aria-label={`Visit ${item.title}`}><Image src={item.image} alt={`${item.title} website screenshot`} width={1365} height={900} sizes="(max-width: 767px) 100vw, 50vw" /><span className="proof-visit">Visit live website <ArrowUpRight size={17} /></span></a>
      <div className="proof-copy"><p className="process-eyebrow">{item.category}</p><h3>{item.title}</h3><p className="proof-client">Client: {item.client}</p><dl className="proof-story"><div><dt>The challenge</dt><dd>{item.problem}</dd></div><div><dt>What we built</dt><dd>{item.built}</dd></div><div><dt>Business outcome</dt><dd>{item.outcome}</dd></div><div><dt>Approximate current order volume</dt><dd>{item.currentOrders}</dd></div></dl>{item.caseStudy && <Link className="proof-case-link" href={item.caseStudy}>Read the case study <ArrowUpRight size={17} aria-hidden="true" /></Link>}</div>
    </article>)}</div>
  </div></section>;
}

export function FounderVoices() {
  return <section id="voices" className="page-section founder-voices"><VoiceAmbient /><div className="voice-inner">
    <div className="voice-intro"><p className="process-eyebrow">CLIENT EXPERIENCE</p><h2>Built with care. Remembered for it.</h2><p>Direct feedback from Earthy East Organics, alongside the operational change behind Al Taleb Mobile.</p></div>
    <div className="voice-quotes"><figure className="voice-quote"><Quote size={34} aria-hidden="true" />
      <blockquote>
        <p>I had a great experience working with Sumit from Webcentrikx Technologies to build my brand's website. He was extremely professional, helpful, and patient throughout the process. He took the time to understand my requirements, proactively suggested ideas, and was always willing to go the extra mile, even when it meant additional work for him.</p>
        <p>What I appreciated most was that he genuinely understood the value of money and would always suggest ways to optimise costs without compromising on quality. Even after the website was completed, he continued to be available for any help or issues. He is well-mannered, reliable, and genuinely cares about his clients' needs. I would highly recommend him to anyone looking for a website developer who goes beyond just delivering a project.</p>
      </blockquote>
      <figcaption><span className="voice-monogram" aria-hidden="true">KC</span><span><strong>Krishika Chaudhary</strong><small>Founder, Earthy East Organics</small></span><a href="https://earthyeast.in/" target="_blank" rel="noreferrer" aria-label="Visit Earthy East Organics"><ArrowUpRight size={19} /></a></figcaption>
    </figure>
    <figure className="voice-quote voice-story"><p className="voice-story-label">AL TALEB MOBILE / PROJECT STORY</p>
      <div className="voice-story-copy"><p>Before launch, product questions and orders came through calls and DMs. Al Taleb Mobile now has a dedicated store where customers can browse phones and computers and move towards a purchase.</p><p>Mohd Atif reported less manual order management and stronger sales after launch.</p></div>
      <figcaption><span className="voice-monogram" aria-hidden="true">MA</span><span><strong>Mohd Atif</strong><small>Founder, Al Taleb Mobile</small></span><a href="https://altalebmobile.com/" target="_blank" rel="noreferrer" aria-label="Visit Al Taleb Mobile"><ArrowUpRight size={19} /></a></figcaption>
    </figure></div>
  </div></section>;
}

export function FounderAuthority() {
  return <section id="founder" className="page-section founder-authority"><div className="founder-inner"><div><p className="process-eyebrow">MEET THE FOUNDER</p><figure className="founder-portrait"><Image src="/assets/sumit-kumar-maurya.webp" alt="Sumit Kumar Maurya, founder of Webcentrikx" width={800} height={800} sizes="(max-width: 767px) 280px, 320px" /></figure><h2>Hi, I'm Sumit Kumar Maurya.</h2><p className="founder-role">Founder, Webcentrikx | Full-stack engineer</p></div><div>
    <p>My work brings full-stack engineering and enterprise IT systems experience into one focused practice. I build fast Next.js websites, modern SaaS interfaces, and custom AI agentic workflows that connect the tools a business already relies on.</p>
    <p>At Webcentrikx, the goal is not another polished screen or isolated automation. It is a clear path from customer intent to team action, with sound architecture, deliberate UI, and human oversight where it matters.</p>
    <p>I start with the journey behind the screen: where an enquiry lands, what your team needs to know, and which handoffs keep slowing things down. Then I shape the interface and the workflow together, so the result works for your customers and the people serving them.</p>
    <div className="founder-links" aria-label="Sumit's social profiles">
      <a href="https://www.linkedin.com/in/sumitkumarmaurya/" target="_blank" rel="noreferrer" aria-label="Sumit on LinkedIn" title="LinkedIn"><BrandIcon brand="linkedin" size={19} /></a>
      <a href="https://x.com/iamsumitkmaurya" target="_blank" rel="noreferrer" aria-label="Sumit on X" title="X"><BrandIcon brand="x" size={19} /></a>
      <a href="https://www.instagram.com/sumit.docs/" target="_blank" rel="noreferrer" aria-label="Sumit on Instagram" title="Instagram"><BrandIcon brand="instagram" size={19} /></a>
    </div>
  </div></div></section>;
}

export function ScopeGuide() {
  const [highlighted, setHighlighted] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [rateData, setRateData] = useState(null);
  const [rateStatus, setRateStatus] = useState("idle");
  const activated = useRef(new Set([featuredIndex]));
  const displayCurrency = currency === "USD" || rateData?.rates?.[currency] ? currency : "USD";
  const formatter = new Intl.NumberFormat(displayCurrency === "INR" ? "en-IN" : "en-US", { style: "currency", currency: displayCurrency, maximumFractionDigits: 0 });

  async function selectCurrency(event) {
    const next = event.target.value;
    setCurrency(next);
    if (next === "USD" || rateData) return;
    setRateStatus("loading");
    try {
      const response = await fetch("/api/exchange-rates");
      if (!response.ok) throw new Error("Rates unavailable");
      setRateData(await response.json());
      setRateStatus("ready");
    } catch {
      setRateStatus("error");
    }
  }

  return <section id="scope" className="page-section scope-guide" onPointerLeave={() => setHighlighted(null)}><div className="scope-inner">
    <div className="pricing-header"><div className="pricing-heading"><p className="process-eyebrow">CLEAR PROJECT OPTIONS</p><h2>Invest in the right next move.</h2><p>Choose a focused web build, or start with a tailored audit and automation plan for the operations behind your business. Every engagement begins with a written scope.</p></div><div className="pricing-currency"><label htmlFor="pricing-currency">Display currency</label><div className="ui-select"><select id="pricing-currency" value={currency} onChange={selectCurrency}><option value="USD">USD - US Dollar</option><option value="INR">INR - Indian Rupee</option><option value="EUR">EUR - Euro</option><option value="GBP">GBP - British Pound</option><option value="AED">AED - UAE Dirham</option></select><ChevronDown size={16} aria-hidden="true" /></div><p role="status">{rateStatus === "loading" && currency !== "USD" ? "Converting prices..." : rateStatus === "error" && currency !== "USD" ? "Rates unavailable. Showing USD prices." : displayCurrency !== "USD" ? `Approximate rates from ${rateData.date}.` : ""}</p></div></div>
    <div className="pricing-grid">{packages.map((item, index) => <article onPointerEnter={event => {
      if (event.pointerType === "touch" || (highlighted ?? featuredIndex) === index) return;
      activated.current.add(index);
      setHighlighted(index);
    }} className={`pricing-package${item.featured ? " is-featured" : ""}${item.custom ? " is-custom" : ""}${(highlighted === null ? item.featured : highlighted === index) ? " is-active" : activated.current.has(index) ? " has-been-active" : ""}`} key={item.name}>
      <div className="pricing-package-top"><p>{item.name}</p>{item.featured && <span>POPULAR</span>}</div>
      <p className={`pricing-price${displayCurrency !== "USD" ? " is-converted" : ""}`}>{item.custom ? "Tailored quote" : <>{displayCurrency !== "USD" && <small aria-label="approximately">≈ </small>}{formatter.format(item.priceUsd * (rateData?.rates?.[displayCurrency] || 1))}<span> {displayCurrency} / project</span></>}</p>
      <p className="pricing-summary">{item.summary}</p>
      <ul>{item.includes.map(detail => <li key={detail}><Check size={17} aria-hidden="true" />{detail}</li>)}</ul>
    </article>)}</div>
    <SectionCta />
    <p className="pricing-terms">Converted prices are indicative; the final amount and payment currency are confirmed in your proposal. Web builds: 50% deposit to start, three revision rounds, and 60 days of minor post-launch fixes and agreed small updates. AI audit and automation terms are scoped separately. Hosting, domains, paid tools, AI usage, and additional work are separate.</p>
  </div></section>;
}

export function FrequentlyAsked() {
  return <section id="faq" className="page-section faq-section"><div className="faq-inner"><div><p className="process-eyebrow">GOOD TO KNOW</p><h2>Questions before we begin.</h2></div><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>;
}
