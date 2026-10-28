import Image from "next/image";
import Link from "next/link";
import LegalPage from "../LegalPage";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata("/about", "About Webcentrikx Technologies", "Meet Webcentrikx Technologies and founder Sumit Kumar Maurya. Custom websites and business-tailored AI workflows built with clear ownership.");

export default function AboutPage() {
  return <LegalPage eyebrow="ABOUT THE AGENCY" title="About" introduction="Webcentrikx Technologies builds custom websites and business-tailored AI workflows that help teams move from enquiry to action.">
    <section className="about-feature"><div><p className="legal-kicker">TWO CONNECTED DISCIPLINES</p><h2>Build the experience. Connect the operations.</h2><p>We design and develop fast websites and modern interfaces, then connect the workflows behind them: lead capture, qualification, routing, and human follow-up. Every build starts with the business problem and the people who will use it.</p><div className="about-pills"><span>Next.js websites</span><span>Modern SaaS UI</span><span>Custom AI workflows</span><span>n8n integrations</span></div></div><Image src="/assets/sumit-kumar-maurya.webp" alt="Sumit Kumar Maurya, founder of Webcentrikx Technologies" width={480} height={520} className="about-portrait" priority /></section>
    <section><p className="legal-kicker">MEET THE FOUNDER</p><h2>Sumit Kumar Maurya</h2><p>Sumit is a full-stack developer with experience working on IT systems. He brings that engineering perspective to fast Next.js websites, thoughtful interfaces, and AI-assisted workflows that connect the tools a business already uses. He leads the conversation from the first brief through delivery, so clients know who is responsible for the work.</p><p>Our approach is practical: understand the job, agree on scope, build in visible stages, and hand over a system your team can actually use.</p></section>
    <section><p className="legal-kicker">WORK WITH US</p><h2>A clear place to start.</h2><p>Explore <Link href="/#work">recent client work</Link>, try the <Link href="/readiness">website and automation checklist</Link>, or <Link href="/#contact">tell us what you want to build</Link>. Our working hours are Monday to Friday, 9:00 AM to 6:00 PM India Standard Time (UTC+05:30). We collaborate with clients across time zones.</p></section>
  </LegalPage>;
}
