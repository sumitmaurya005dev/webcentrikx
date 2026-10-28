import ClientHome from "./ClientHome";
import { siteUrl } from "./seo";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "Webcentrikx", alternateName: "Webcentrikx Technologies", url: `${siteUrl}/` },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Webcentrikx Technologies",
      url: `${siteUrl}/`,
      email: "hello@webcentrikx.com",
      telephone: "+917275653255",
      founder: { "@type": "Person", name: "Sumit Kumar Maurya", url: `${siteUrl}/about` },
      sameAs: ["https://x.com/Webcentrikx", "https://www.instagram.com/webcentrikx/"],
    },
  ],
};

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <ClientHome />
  </>;
}
