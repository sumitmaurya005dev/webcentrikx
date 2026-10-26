"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "./useMotionPreference";
import { Pause, Play, RotateCcw, ArrowUpRight } from "lucide-react";
import { AmbientFlow } from "./ProcessExperience";

const chapters = [
  { label: "The overwhelm", title: "You started a business. Not another late night.", body: "The layout breaks. The form will not connect. Your next big idea disappears into a dozen open tabs." },
  { label: "The right partner", title: "A little help. A whole new direction.", body: "Webcentrikx joins the dots: the message, the design, the development, and the workflows behind it all." },
  { label: "Room to grow", title: "Back to the work you love.", body: "Your website is ready. Your tools are connected. And you have a team to turn to for the next chapter." },
];

function DeskScene({ chapter, moving }) {
  const helped = chapter > 0;
  const done = chapter === 2;
  const tween = { duration: moving ? 0.85 : 0, ease: [0.22, 1, 0.36, 1] };
  return <svg className="founder-scene" viewBox="0 0 820 510" role="img" aria-label={done ? "A happy founder and a Webcentrikx teammate at a computer showing a finished website and connected workflows." : helped ? "A Webcentrikx teammate arrives to help the founder build their website." : "A frustrated founder works at a computer surrounded by unfinished website tasks."}>
    <defs><pattern id="story-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#b1c9bf" strokeWidth=".5" /></pattern></defs>
    <rect x="24" y="20" width="772" height="462" rx="8" fill="url(#story-grid)" opacity=".5" />
    <path d="M48 445H780" stroke="#9bb4a7" strokeWidth="2" />
    <rect x="76" y="76" width="140" height="114" rx="4" fill="#f8faf6" stroke="#bfd0c5" strokeWidth="2" />
    <path d="M146 77V188M76 133H216" stroke="#bfd0c5" strokeWidth="2" />
    <path d="M91 173L120 146L142 163L169 118L201 173Z" fill="#bad0b7" />
    <path d="M160 330Q143 310 145 291H215V394H160Z" fill="#8da99b" />
    <path d="M181 393V437M157 440H214" stroke="#324c41" strokeWidth="8" strokeLinecap="round" />
    <path d="M228 360L280 361L300 424H330" stroke="#263e38" strokeWidth="24" strokeLinecap="round" fill="none" />
    <path d="M239 370L230 427H263" stroke="#446459" strokeWidth="24" strokeLinecap="round" fill="none" />
    <motion.g animate={{ rotate: helped ? 0 : 9, y: helped ? 0 : 7 }} style={{ transformOrigin: "234px 354px" }} transition={tween}>
      <path d="M200 255Q225 239 250 258L270 355Q235 376 191 352Z" fill="#deac5b" stroke="#32463c" strokeWidth="2" />
      <path d="M215 252V226H242V252" fill="#d79e7c" />
      <rect x="206" y="176" width="60" height="66" rx="26" fill="#edb892" stroke="#32463c" strokeWidth="2" />
      <path d="M203 205Q192 168 220 162Q257 151 272 183L260 196L236 181L217 208Z" fill="#293c36" />
      <circle cx="256" cy="208" r="3" fill="#283d35" />
      <motion.path animate={{ d: helped ? "M246 226Q252 233 258 226" : "M244 231Q251 224 258 229" }} fill="none" stroke="#583c32" strokeWidth="2.5" strokeLinecap="round" transition={tween} />
      <motion.path animate={{ d: helped ? "M222 276L262 320L318 315" : "M220 274L269 298L264 227" }} fill="none" stroke="#edb892" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" transition={tween} />
      <path d="M248 278L275 322L329 320" fill="none" stroke="#d79e7c" strokeWidth="16" strokeLinecap="round" />
    </motion.g>
    <motion.g animate={{ opacity: helped ? 0 : 1, y: helped ? -16 : 0 }} transition={tween}>
      <path d="M285 177L293 159M297 188L314 182M268 162L268 148" stroke="#be6753" strokeWidth="3" strokeLinecap="round" />
      <rect x="312" y="72" width="116" height="35" rx="5" fill="#fff5f0" stroke="#d99e8c" /><text x="326" y="95" fill="#9a5240" fontSize="12">Layout broken</text>
      <rect x="452" y="109" width="126" height="35" rx="5" fill="#fff5f0" stroke="#d99e8c" /><text x="466" y="132" fill="#9a5240" fontSize="12">Form not sending</text>
      <path d="M337 122L345 131L355 116" fill="none" stroke="#b87664" strokeWidth="2" />
    </motion.g>
    <path d="M283 338H601M310 340V441M574 340V441" stroke="#35564b" strokeWidth="9" strokeLinecap="round" />
    <rect x="319" y="189" width="240" height="142" rx="9" fill="#263e35" />
    <rect x="329" y="200" width="220" height="115" rx="3" fill={done ? "#edf5e7" : "#f6f3ed"} />
    <path d="M424 330V338H465V330" fill="#263e35" />
    <motion.g animate={{ opacity: done ? 0 : 1 }} transition={tween}>
      <path d="M344 222H410M344 233H389M347 278H429" stroke="#c5cec0" strokeWidth="5" />
      <rect x="451" y="218" width="74" height="40" rx="2" fill="#dfb9ad" transform="rotate(7 488 238)" />
      <path d="M354 290L362 282M354 282L362 290" stroke="#b56755" strokeWidth="2" /><text x="373" y="290" fill="#916354" fontSize="10">Something went wrong</text>
    </motion.g>
    <motion.g animate={{ opacity: done ? 1 : 0, y: done ? 0 : 10 }} transition={tween}>
      <rect x="342" y="214" width="50" height="4" rx="2" fill="#2f6651" /><path d="M484 216H534" stroke="#a4b5a0" strokeWidth="3" />
      <text x="342" y="245" fill="#254c3e" fontSize="12" fontWeight="bold">Your next chapter.</text>
      <path d="M342 257H437M342 264H414" stroke="#abc1a5" strokeWidth="3" />
      <rect x="342" y="276" width="64" height="17" rx="3" fill="#2c6952" /><text x="349" y="288" fontSize="7" fill="#fff">LET'S GET STARTED</text>
      <rect x="464" y="232" width="68" height="61" rx="4" fill="#bdd290" /><path d="M475 281L488 268L499 275L520 247" fill="none" stroke="#42633d" strokeWidth="4" />
    </motion.g>
    <motion.g animate={{ x: helped ? 0 : 100, opacity: helped ? 1 : 0 }} transition={tween}>
      <path d="M652 340L643 431H665M679 340L698 431H717" fill="none" stroke="#32473f" strokeWidth="23" strokeLinecap="round" />
      <path d="M636 245Q662 229 689 247L710 343H620Z" fill="#438875" stroke="#294e42" strokeWidth="2" />
      <path d="M650 240V222H675V240" fill="#b77c5a" />
      <rect x="638" y="171" width="55" height="64" rx="25" fill="#d79a73" />
      <path d="M638 201Q623 170 647 161Q685 150 696 178L682 191L659 179L647 204Z" fill="#253c34" />
      <circle cx="647" cy="206" r="3" fill="#263a30" /><path d="M646 220Q653 226 660 219" fill="none" stroke="#693f2e" strokeWidth="2" />
      <text x="647" y="292" fontSize="29" fill="#edf7c6" fontWeight="bold">W</text>
      <motion.path animate={{ d: done ? "M636 266L602 306L553 299" : "M636 266L601 251L585 213" }} fill="none" stroke="#d79a73" strokeWidth="16" strokeLinecap="round" transition={tween} />
      <path d="M689 266L718 304L695 331" fill="none" stroke="#b77c5a" strokeWidth="16" strokeLinecap="round" />
      <rect x="590" y="101" width="156" height="38" rx="8" fill="#254e3e" /><text x="606" y="125" fontSize="14" fill="#f0f5dc" fontWeight="bold">Webcentrikx</text>
    </motion.g>
    <motion.g animate={{ opacity: done ? 1 : 0, y: done ? 0 : 15 }} transition={{ ...tween, delay: moving ? 0.25 : 0 }}>
      <path d="M370 144H524" stroke="#7aab8d" strokeWidth="2" strokeDasharray="4 5" />
      {[350, 430, 510].map((x, index) => <g key={x}><rect x={x} y="128" width="40" height="30" rx="6" fill="#d6e9c4" stroke="#83a28b" /><path d={`M${x + 11} 143l6 6 12-13`} stroke="#326349" strokeWidth="2" fill="none" /><text x={x + 20} y="119" textAnchor="middle" fontSize="9" fill="#326349">{["Website", "CRM", "Follow-up"][index]}</text></g>)}
    </motion.g>
  </svg>;
}

export default function FounderStory() {
  const ref = useRef(null);
  const visible = useInView(ref, { amount: 0.35 });
  const reduced = useReducedMotion();
  const [chapter, setChapter] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = reduced ? 2 : chapter;
  useEffect(() => {
    if (!visible || paused || reduced || chapter === 2) return;
    const timer = setInterval(() => { if (!document.hidden) setChapter(value => Math.min(value + 1, 2)); }, 4500);
    return () => clearInterval(timer);
  }, [visible, paused, reduced, chapter]);
  return <section ref={ref} className="founder-story" id="your-next-chapter">
    <AmbientFlow variant="story" />
    <div className="story-heading"><p className="process-eyebrow">YOU DON'T HAVE TO BUILD IT ALONE</p><h2>A familiar story.<br /><span>A better ending.</span></h2></div>
    <div className="story-layout"><div className="story-stage"><DeskScene chapter={current} moving={!reduced && visible && !paused} /></div><div className="story-copy"><span className="story-number">0{current + 1} / 03</span><div className="story-chapter-copy"><h3>{chapters[current].title}</h3><p>{chapters[current].body}</p></div><a className="story-cta" href="#contact">Let's build your next chapter <ArrowUpRight size={18} /></a>
      {!reduced && <div className="story-controls"><div className="story-chapters" role="group" aria-label="Story chapters">{chapters.map((item, index) => <button key={item.label} type="button" title={item.label} aria-label={item.label} aria-pressed={chapter === index} onClick={() => { setChapter(index); setPaused(true); }}><span /></button>)}</div><button className="story-play" type="button" title={chapter === 2 ? "Replay story" : paused ? "Play story" : "Pause story"} aria-label={chapter === 2 ? "Replay story" : paused ? "Play story" : "Pause story"} onClick={() => { if (chapter === 2) { setChapter(0); setPaused(false); } else setPaused(value => !value); }}>{chapter === 2 ? <RotateCcw size={18} /> : paused ? <Play size={18} /> : <Pause size={18} />}</button></div>}
    </div></div>
  </section>;
}
