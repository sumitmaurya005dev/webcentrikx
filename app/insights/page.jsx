import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata("/insights", "Website & AI Workflow Insights | Webcentrikx", "Practical guides on qualifying leads with n8n and designing reliable AI-assisted business workflows.");

const articles = [
  { title: "An n8n lead-qualification workflow that hands over useful context", description: "A practical path from incoming enquiry to a clear CRM record and a human-owned next step.", href: "/insights/lead-qualification", topic: "LEAD OPERATIONS" },
  { title: "What happens when an AI workflow is uncertain or fails?", description: "Design the alert, approval, and fallback paths before you automate the happy path.", href: "/insights/workflow-handoffs", topic: "WORKFLOW RELIABILITY" },
];

export default function InsightsPage() {
  return <main className="resource-page"><header className="resource-header"><Link href="/" className="resource-brand"><span>W</span>Webcentrikx</Link><Link href="/#automation">Back to the website</Link></header><div className="resource-inner insight-page"><div className="resource-intro"><p className="process-eyebrow">INSIGHTS</p><h1>Build the system behind the promise.</h1><p>Short, practical breakdowns of the decisions behind useful web and AI work.</p></div><div className="insight-list">{articles.map(article => <Link href={article.href} key={article.href}><span>{article.topic}</span><h2>{article.title}</h2><p>{article.description}</p><ArrowUpRight size={20} aria-hidden="true" /></Link>)}</div><Link className="insight-checklist-link" href="/readiness">Try the free website and automation readiness checklist <ArrowUpRight size={17} aria-hidden="true" /></Link></div></main>;
}
