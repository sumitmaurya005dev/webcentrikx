import LegalPage from "../LegalPage";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata("/terms-of-service", "Terms of Service | Webcentrikx Technologies", "Terms for using the Webcentrikx Technologies website and requesting website or AI automation services.");

export default function TermsPage() {
  return <LegalPage eyebrow="WEBSITE TERMS" title="Terms of Service" introduction="These terms cover use of this website and enquiries sent through it. A separate written proposal or agreement sets the terms of any client project." updated="26 October 2026">
    <section><h2>Using this website</h2><p>You may browse the site and use its contact and checklist features for genuine enquiries. Please provide information you are entitled to share and do not attempt to disrupt the site, submit spam, or misuse its forms or content.</p></section>
    <section><h2>Enquiries and bookings</h2><p>Submitting a form, sending a message, or booking a discovery call does not create a client relationship or require either side to start a project. We may respond with questions, a proposal, or a decision that the request is outside our scope. Booking availability is managed through Calendly.</p></section>
    <section><h2>Project scope and payment</h2><p>Website design, development, automation, deliverables, revisions, dates, pricing, deposits, ownership, third-party costs, support, and cancellation arrangements are agreed in a separate written proposal or contract. Pricing shown on the website is indicative. Currency conversions are estimates and the proposal controls the final amount and payment currency.</p></section>
    <section><h2>Examples and information</h2><p>Portfolio pieces and workflow demonstrations explain our approach. Concept designs are illustrative and do not represent commissioned client work. Articles, checklists, and examples are general information; they are not a promise that any particular sales, time-saving, or automation outcome will occur for your business.</p></section>
    <section><h2>Content and third-party services</h2><p>Unless stated otherwise, the website&apos;s design, text, and original materials belong to Webcentrikx Technologies or their respective owners. Please ask before reusing them beyond ordinary browsing. Links or integrations to Calendly, WhatsApp, social platforms, and other providers are governed by those providers&apos; own terms when you use them.</p></section>
    <section><h2>Availability and changes</h2><p>We work to keep the site accurate and available, but it may change or be temporarily unavailable. If you spot an error, contact us. We may update these website terms; the date above identifies the current version. For any conflict about a paid project, the signed project agreement takes precedence.</p></section>
  </LegalPage>;
}
