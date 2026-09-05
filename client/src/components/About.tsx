/**
 * About section: tilt-able portrait with glare, bio paragraphs,
 * glass info table, and achievements box.
 */
import { useEffect, useRef, useState } from "react";
import type { SiteSettings } from "@/lib/portfolio";
import { siteConfig } from "../data/siteConfig";

export function About() {
  const { about } = siteConfig;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, glare: 0 });
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const aboutImage = settings?.aboutImageUrl || about.image;
  const aboutImageAlt = settings?.aboutImageAlt || about.imageAlt;

  useEffect(() => {
    let active = true;
    void import("@/lib/portfolio")
      .then(({ getSiteSettings }) => getSiteSettings())
      .then(result => {
        if (active) setSettings(result);
      })
      .catch(() => {
        // Keep the built-in portrait visible if the public settings request is unavailable.
      });
    return () => { active = false; };
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - py) * 10,
      ry: (px - 0.5) * 10,
      gx: px * 100,
      gy: py * 100,
      glare: 1,
    });
  };
  const onMouseLeave = () => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, glare: 0 });

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-header reveal-item">
          <span className="section-label section-label--muted">{about.label}</span>
          <h2 className="about-heading">
            {about.headingLead} <em>{about.headingEm}</em>
          </h2>
        </div>
        <div className="about-content">
          <div className="about-image reveal-item" style={{ perspective: 1200 }}>
            <div
              ref={wrapRef}
              className="about-img-wrapper"
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              style={{
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src={aboutImage}
                alt={aboutImageAlt}
                className="about-img tilt-content"
                loading="lazy"
                decoding="async"
              />
              <div
                className="glare-effect"
                style={{
                  background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.2), transparent 60%)`,
                  opacity: tilt.glare,
                  transition: "opacity 0.3s ease",
                }}
              />
            </div>
          </div>
          <div className="about-text">
            {about.bio.map((p, i) => (
              <p key={i} className="about-bio reveal-item">
                {p}
              </p>
            ))}
            <div className="achievements-box reveal-item">
              <h3 className="achievements-title">{about.achievementsTitle}</h3>
              <ul className="achievements-list">
                {about.achievements.map((a) => (
                  <li key={a} className="achievement-item">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
