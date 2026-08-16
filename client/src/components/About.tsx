/**
 * About section: tilt-able portrait with glare, bio paragraphs,
 * glass info table, and achievements box.
 */
import { useRef, useState } from "react";
import { siteConfig } from "../data/siteConfig";

export function About() {
  const { about } = siteConfig;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, glare: 0 });

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
                src={about.image}
                alt={about.imageAlt}
                className="about-img tilt-content"
                loading="lazy"
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
            <div className="info-table reveal-item">
              {about.info.map((row) => (
                <div key={row.label} className="info-row">
                  <span className="info-label">{row.label}</span>
                  <span
                    className={`info-value ${"highlight" in row && row.highlight ? "info-value--highlight" : ""}`}
                  >
                    {"href" in row && row.href ? (
                      <a
                        href={row.href}
                        target={row.href.startsWith("http") ? "_blank" : undefined}
                        rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </span>
                </div>
              ))}
            </div>
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
