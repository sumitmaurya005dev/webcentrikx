import LegalPage from "../LegalPage";

export const metadata = {
  title: "Cookie Policy | Webcentrikx Technologies",
  description: "How cookies and similar browser technologies may be used on the Webcentrikx Technologies website.",
};

export default function CookiePolicyPage() {
  return <LegalPage eyebrow="BROWSER TECHNOLOGIES" title="Cookie Policy" introduction="Here is what may be stored or read in your browser when you use this website and its third-party features." updated="26 October 2026">
    <section><h2>What we use</h2><p>We do not currently run our own advertising or analytics cookies on this website. The site may still use essential browser or server mechanisms needed to display pages, protect forms, and deliver the features you choose to open.</p></section>
    <section><h2>Form protection</h2><p>Our forms use Cloudflare Turnstile to reduce spam and abuse. Its challenge may use cookies, local storage, or similar browser signals to verify a submission. Without successful verification, the forms cannot send; you can contact us by email instead. See <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">Cloudflare&apos;s privacy policy</a>.</p></section>
    <section><h2>Booking and external links</h2><p>Calendly loads when you open the booking popup or visit its booking page. Calendly may set its own cookies or local storage and offers its own privacy controls. See <a href="https://calendly.com/legal/privacy-notice" target="_blank" rel="noreferrer">Calendly&apos;s privacy notice</a>. If you follow a WhatsApp or social media link, that service&apos;s browser technologies and policies apply.</p></section>
    <section><h2>Your controls</h2><p>You can block or delete cookies through your browser settings. Some features, including form verification and booking, may stop working when required browser storage is blocked. Calendly&apos;s booking experience provides its own cookie choices where available. If you prefer, contact us at <a href="mailto:hello@webcentrikx.com">hello@webcentrikx.com</a> without using a form or booking widget.</p></section>
    <section><h2>When this changes</h2><p>If we add analytics, advertising, or other optional tracking, we will update this page and add the controls required for that use before enabling it.</p></section>
  </LegalPage>;
}
