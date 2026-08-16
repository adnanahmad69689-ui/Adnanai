/**
 * Featured project section: founder badges, highlights, tech pills,
 * CTA, and a browser-style mockup frame with an overlay stat card.
 */
import { siteConfig, mailto } from "../data/siteConfig";

export function Projects() {
  const { project } = siteConfig;
  return (
    <section id="projects" className="projects-section">
      <div className="projects-bg-glow" />
      <div className="projects-container">
        <div className="projects-grid">
          <div className="projects-details">
            <span className="section-label reveal-item">{project.label}</span>
            <h2 className="project-main-title reveal-item">
              {project.titleLead} <em>{project.titleEm}</em>
            </h2>
            <div className="project-badge-row reveal-item">
              {project.badges.map((b) => (
                <span key={b} className="founder-badge">
                  {b}
                </span>
              ))}
            </div>
            <p className="project-tagline reveal-item">{project.tagline}</p>
            <p className="project-description reveal-item">{project.description}</p>
            <div className="project-highlights">
              {project.highlights.map((h) => (
                <div key={h.title} className="project-highlight reveal-item">
                  <span className="highlight-icon">✓</span>
                  <span className="highlight-text">
                    <strong>{h.title}</strong> {h.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="project-tech-stack reveal-item">
              {project.techStack.map((t) => (
                <span key={t} className="tech-pill">
                  {t}
                </span>
              ))}
            </div>
            <a
              className="project-cta-button reveal-item"
              href={mailto(project.ctaSubject, project.ctaBody)}
            >
              {project.ctaLabel}
              <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="16">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="projects-visual reveal-item">
            <div className="mockup-frame">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span className="mockup-dot mockup-dot--red" />
                  <span className="mockup-dot mockup-dot--yellow" />
                  <span className="mockup-dot mockup-dot--green" />
                </div>
                <span className="mockup-url">{project.mockupUrl}</span>
              </div>
              <div className="mockup-body">
                <img
                  src={project.mockupImage}
                  alt={project.mockupImageAlt}
                  className="mockup-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="mockup-overlay-card">
                <span className="overlay-badge">{project.overlayBadge}</span>
                <div className="overlay-stat">{project.overlayStat}</div>
                <div className="overlay-sub">{project.overlaySub}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
