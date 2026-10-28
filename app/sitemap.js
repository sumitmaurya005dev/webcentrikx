import { siteUrl } from "./seo";

const paths = [
  "/",
  "/about",
  "/work/earthy-east",
  "/insights",
  "/insights/lead-qualification",
  "/insights/workflow-handoffs",
  "/readiness",
  "/privacy-policy",
  "/terms-of-service",
  "/cookie-policy",
];

export default function sitemap() {
  return paths.map(path => ({ url: new URL(path, siteUrl).href }));
}
