"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "./useMotionPreference";

export default function VoiceAmbient() {
  const scene = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: scene, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const turn = useTransform(scrollYProgress, [0, 1], [-15, 22]);

  return <div ref={scene} className="voice-ambient" aria-hidden="true">
    <motion.div className="voice-ambient-orbit voice-ambient-orbit-one" style={reduced ? undefined : { y: drift, rotate: turn }} />
    <motion.div className="voice-ambient-orbit voice-ambient-orbit-two" style={reduced ? undefined : { y: drift }} />
    <div className="voice-ambient-lines" />
  </div>;
}
