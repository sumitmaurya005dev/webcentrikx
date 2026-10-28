export const siteUrl = "https://webcentrikx.com";

export function pageMetadata(path, title, description) {
  const url = new URL(path, siteUrl).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "Webcentrikx Technologies", type: "website", locale: "en_US" },
    twitter: { card: "summary", title, description },
  };
}
