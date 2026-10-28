import "./globals.css";
import "./monochrome.css";
import { pageMetadata, siteUrl } from "./seo";

export const metadata = {
  metadataBase: new URL(siteUrl),
  ...pageMetadata("/", "Custom Websites & AI Automation | Webcentrikx", "Webcentrikx Technologies builds fast Next.js websites, modern SaaS interfaces, and business-tailored AI workflows that help teams capture and follow up with leads."),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
