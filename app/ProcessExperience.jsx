"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { useReducedMotion } from "./useMotionPreference";
import { ArrowUpRight } from "lucide-react";

export const samples = [
  { slug: "atelier", name: "Atelier Living", category: "Luxury home interiors", detail: "Give your spaces room to speak. An editorial portfolio with project galleries and a direct path to an enquiry.", tone: "#dfe8dc" },
  { slug: "kindred-dental", name: "Kindred Dental", category: "Dentist", detail: "Help new patients feel at ease, explore your services, and take the first step towards an appointment.", tone: "#d9eded" },
  { slug: "aura-skin", name: "Aura Skin Clinic", category: "Skin clinic", detail: "A considered introduction to your practice, with clear treatment information and a simple consultation journey.", tone: "#eadfe8" },
  { slug: "oakfield-school", name: "Oakfield School", category: "School", detail: "Bring school life into focus, with space for your community, curriculum, and admissions enquiries.", tone: "#e9edc9" },
  { slug: "northline-builders", name: "Northline Homes", category: "Builders & property", detail: "Showcase properties with useful project details and connect interested buyers with your sales team.", tone: "#dce5ed" },
];

export function AmbientFlow({ variant = "light" }) {
  const ref = useRef(null);
  const visible = useInView(ref, { margin: "100px" });
  const reduced = useReducedMotion();
  return <div ref={ref} aria-hidden="true" className={`ambient-flow ambient-${variant} ${visible && !reduced ? "ambient-running" : ""}`}>
    <div className="ambient-wash" />
    <svg viewBox="0 0 1400 650" preserveAspectRatio="none"><g>{Array.from({ length: 7 }, (_, index) => <path key={index} d={`M-120 ${230 + index * 25} C 210 ${-80 + index * 23}, 550 ${660 + index * 22}, 940 ${300 + index * 25} S 1330 ${190 + index * 23}, 1550 ${280 + index * 24}`} />)}</g></svg>
  </div>;
}

export function PreviewCard({ sample, index }) {
  const href = sample.href || `/concepts/${sample.slug}.html`;
  return <div className="process-card-slot" style={{ "--sample-tone": sample.tone, "--sample-index": index }}>
    <article className="process-sample">
      <a href={href} target="_blank" rel="noreferrer" className="sample-preview" aria-label={`Open ${sample.name} website`}>
        <div className="sample-browser"><span className="sample-dots" aria-hidden="true"><i /><i /><i /></span><span>{sample.category}</span><span>{sample.status || "Concept"} / 0{index + 1}</span></div>
        <Image src={sample.image || `/assets/sample-${sample.slug}.jpg`} width={1280} height={840} alt={sample.alt || `${sample.name}: ${sample.category.toLowerCase()} website concept screenshot`} sizes="(max-width: 767px) 80vw, 460px" className="sample-screenshot" />
      </a>
      <div className="sample-caption"><div><p className="sample-category">{sample.category}</p><h3>{sample.name}</h3></div><a className="sample-open" href={href} target="_blank" rel="noreferrer" title={`Open ${sample.name}`} aria-label={`Open ${sample.name} website`}><ArrowUpRight size={22} /></a><p>{sample.detail}</p></div>
    </article>
  </div>;
}

export default function ProcessExperience({ steps }) {
  return <section id="process" className="process-experience" data-cursor="soft">
    <AmbientFlow />
    <div className="simple-process"><div><p className="process-eyebrow">HOW WE WORK</p><h2>Four steps from friction to launch.</h2><p>One clear path whether we are building your next web experience or an operational workflow.</p></div><ol>{steps.map(([title, body], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol></div>
  </section>;
}
