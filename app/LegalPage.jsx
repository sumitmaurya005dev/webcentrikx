import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const pages = [
  ["About", "/about"],
  ["Privacy Policy", "/privacy-policy"],
  ["Terms of Service", "/terms-of-service"],
  ["Cookie Policy", "/cookie-policy"],
];

export default function LegalPage({ eyebrow, title, introduction, children, updated }) {
  return <main className="resource-page legal-page">
    <header className="resource-header"><Link href="/" className="resource-brand"><span>W</span>Webcentrikx</Link><Link href="/"><ArrowLeft size={15} aria-hidden="true" /> Back to the website</Link></header>
    <div className="legal-shell">
      <aside className="legal-sidebar" aria-label="Company pages"><span>WEBCENTRIKX TECHNOLOGIES</span><nav>{pages.map(([label, href]) => <Link key={href} href={href} aria-current={title === label ? "page" : undefined}>{label}<ArrowUpRight size={15} aria-hidden="true" /></Link>)}</nav><p>Questions about these pages?<br /><a href="mailto:hello@webcentrikx.com">hello@webcentrikx.com</a></p></aside>
      <article className="legal-content"><p className="process-eyebrow">{eyebrow}</p><h1>{title}</h1><p className="legal-lead">{introduction}</p>{updated && <p className="legal-updated">Last updated: {updated}</p>}<div className="legal-sections">{children}</div><div className="legal-contact"><span>NEED TO TALK?</span><h2>Let&apos;s make it clear.</h2><p>Reach Webcentrikx Technologies at <a href="mailto:hello@webcentrikx.com">hello@webcentrikx.com</a> or <a href="tel:+917275653255">+91 7275653255</a>.</p></div></article>
    </div>
    <footer className="legal-footer"><span>© {new Date().getFullYear()} Webcentrikx Technologies · Mon–Fri, 9:00 AM–6:00 PM IST (UTC+05:30)</span><nav aria-label="Footer">{pages.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav></footer>
  </main>;
}
