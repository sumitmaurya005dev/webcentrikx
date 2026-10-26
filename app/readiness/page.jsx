import Link from "next/link";
import ReadinessCheck from "./ReadinessCheck";

export const metadata = {
  title: "Website & AI Readiness Checklist | Webcentrikx",
  description: "A practical self-check for website enquiries, lead handoffs, and business automation. Get a clear next step without booking a call.",
};

export default function ReadinessPage() {
  return <main className="resource-page">
    <header className="resource-header"><Link href="/" className="resource-brand"><span>W</span>Webcentrikx</Link><Link href="/#contact">Back to the website</Link></header>
    <ReadinessCheck />
  </main>;
}
