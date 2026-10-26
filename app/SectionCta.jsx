import { ArrowUpRight } from "lucide-react";

export default function SectionCta({ secondary = false }) {
  return <a className={`section-cta${secondary ? " section-cta-secondary" : ""}`} href="#book-call">Book Your Discovery Call<ArrowUpRight size={18} aria-hidden="true" /></a>;
}
