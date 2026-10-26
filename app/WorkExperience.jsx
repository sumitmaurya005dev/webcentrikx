"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AmbientFlow, PreviewCard, samples } from "./ProcessExperience";

const tones = ["#dce8e5", "#e4ebd8", "#e6e9df", "#dfe8ed"];

export default function WorkExperience({ projects }) {
  const concepts = [...projects.filter(project => project.type.includes("Concept")).map((project, index) => ({ name: project.title, category: project.type, detail: project.body, href: project.href, image: project.image, alt: project.alt, tone: tones[index], status: "Concept" })), ...samples];
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);
  const stopWheelRef = useRef(() => {});
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const update = () => {
      const card = gallery.querySelector(".process-card-slot");
      if (!card) return;
      const gap = parseFloat(getComputedStyle(gallery).columnGap) || 0;
      setActiveIndex(Math.min(concepts.length - 1, Math.round(gallery.scrollLeft / (card.getBoundingClientRect().width + gap))));
      setCanScrollBack(gallery.scrollLeft > 2);
      setCanScrollForward(gallery.scrollLeft + gallery.clientWidth < gallery.scrollWidth - 2);
    };
    const observer = new ResizeObserver(update);
    observer.observe(gallery);
    gallery.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); gallery.removeEventListener("scroll", update); };
  }, [concepts.length]);

  useEffect(() => {
    const section = sectionRef.current;
    const gallery = galleryRef.current;
    if (!section || !gallery) return;
    let target = gallery.scrollLeft;
    let frame = 0;

    const advance = () => {
      const remaining = target - gallery.scrollLeft;
      if (Math.abs(remaining) < 0.5) {
        gallery.scrollLeft = target;
        frame = 0;
        return;
      }
      gallery.scrollLeft += remaining * 0.16;
      frame = requestAnimationFrame(advance);
    };
    const stopWheel = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      target = gallery.scrollLeft;
    };
    stopWheelRef.current = stopWheel;
    gallery.addEventListener("pointerdown", stopWheel);
    gallery.addEventListener("keydown", stopWheel);

    const onWheel = event => {
      if (event.ctrlKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const bounds = gallery.getBoundingClientRect();
      if (bounds.top > innerHeight * 0.45 || bounds.bottom < innerHeight * 0.55) return;

      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1;
      const distance = event.deltaY * unit;
      const maxScroll = gallery.scrollWidth - gallery.clientWidth;
      if (!frame) target = gallery.scrollLeft;
      if ((distance > 0 && target >= maxScroll - 2) || (distance < 0 && target <= 2)) return;

      target = Math.max(0, Math.min(maxScroll, target + distance * 1.6));
      if (!frame) frame = requestAnimationFrame(advance);
    };

    section.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      section.removeEventListener("wheel", onWheel);
      gallery.removeEventListener("pointerdown", stopWheel);
      gallery.removeEventListener("keydown", stopWheel);
      stopWheel();
    };
  }, []);

  function scrollConcepts(direction) {
    stopWheelRef.current();
    const gallery = galleryRef.current;
    const card = gallery?.querySelector(".process-card-slot");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(gallery).columnGap) || 0;
    gallery.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: "smooth" });
  }

  return <section ref={sectionRef} id="work" className="process-experience work-experience" data-cursor="orbit">
    <AmbientFlow />
    <div className="work-concepts"><p className="process-eyebrow">ORIGINAL CONCEPTS</p><h2>Other directions we could explore.</h2><p>These sample designs show different styles and sectors. They are fictional brands, not client work.</p><div className="concept-navigation"><span>{String(activeIndex + 1).padStart(2, "0")} / {String(concepts.length).padStart(2, "0")}</span><div><button type="button" aria-label="Previous concepts" aria-controls="concept-gallery" disabled={!canScrollBack} onClick={() => scrollConcepts(-1)}><ChevronLeft size={20} aria-hidden="true" /></button><button type="button" aria-label="Next concepts" aria-controls="concept-gallery" disabled={!canScrollForward} onClick={() => scrollConcepts(1)}><ChevronRight size={20} aria-hidden="true" /></button></div></div><div id="concept-gallery" ref={galleryRef} className="concept-grid" role="region" aria-label="Website concept gallery" tabIndex={0}>{concepts.map((concept, index) => <PreviewCard key={concept.name} index={index} sample={concept} />)}</div></div>
  </section>;
}
