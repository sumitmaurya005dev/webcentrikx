import "./globals.css";
import "./monochrome.css";

export const metadata = {
  title: "Webcentrikx - Custom Websites & AI Automation",
  description:
    "Webcentrikx builds fast Next.js websites, modern SaaS interfaces, and business-tailored AI workflows with n8n, Claude, and MCP.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
