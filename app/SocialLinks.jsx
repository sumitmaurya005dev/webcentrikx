"use client";

import { faFacebookF, faGithub, faInstagram, faLinkedinIn, faWhatsapp, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

const icons = {
  instagram: faInstagram,
  x: faXTwitter,
  youtube: faYoutube,
  facebook: faFacebookF,
  github: faGithub,
  linkedin: faLinkedinIn,
  whatsapp: faWhatsapp,
};

const profiles = [
  { brand: "instagram", label: "Webcentrikx on Instagram", href: "https://www.instagram.com/webcentrikx/" },
  { brand: "x", label: "Webcentrikx on X", href: "https://x.com/Webcentrikx" },
  { brand: "youtube", label: "YouTube profile coming soon" },
  { brand: "facebook", label: "Facebook profile coming soon" },
  { brand: "linkedin", label: "Sumit on LinkedIn", href: "https://www.linkedin.com/in/sumitkumarmaurya/" },
];

export function BrandIcon({ brand, size = 18 }) {
  const [width, height, , , path] = icons[brand].icon;
  const paths = Array.isArray(path) ? path : [path];

  return <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox={`0 0 ${width} ${height}`} className={`brand-icon brand-${brand}`}>
    {paths.map((shape, index) => <path key={index} d={shape} fill="currentColor" />)}
  </svg>;
}

export default function SocialLinks({ placement }) {
  return <div className={`social-links social-${placement}`} aria-label="Social profiles">
    {profiles.map(profile => profile.href ? <a key={profile.brand} href={profile.href} target="_blank" rel="noreferrer" aria-label={profile.label} title={profile.label}><BrandIcon brand={profile.brand} /></a> : <button key={profile.brand} type="button" disabled aria-label={profile.label} title={profile.label}><BrandIcon brand={profile.brand} /></button>)}
  </div>;
}
