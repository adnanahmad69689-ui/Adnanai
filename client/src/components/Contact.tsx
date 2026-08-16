/**
 * Contact section: big card with heading + pill links on the left,
 * floating glass stat panels on the right (hidden on small screens).
 */
import { siteConfig } from "../data/siteConfig";

const ICONS: Record<string, React.ReactNode> = {
  email: <span style={{ fontSize: 13 }}>@</span>,
  linkedin: <span style={{ fontSize: 11, fontWeight: 700 }}>in</span>,
  github: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  youtube: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
    </svg>
  ),
  instagram: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  ),
};

export function Contact() {
  const { contact } = siteConfig;
  const links = [
    { key: "email", value: contact.email, href: `mailto:${contact.email}` },
    { key: "linkedin", value: contact.linkedinLabel, href: contact.linkedin },
    { key: "github", value: contact.githubLabel, href: contact.github },
    { key: "youtube", value: contact.youtubeLabel, href: contact.youtube },
    { key: "instagram", value: contact.instagramLabel, href: contact.instagram },
  ];
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-card reveal-item">
          <div className="contact-left">
            <h2 className="contact-heading">
              {contact.headingLead} <em>{contact.headingEm}</em>
            </h2>
            <p className="contact-subtext">{contact.subtext}</p>
            <div className="contact-links-pill-wrapper">
              {links.map((l) => (
                <a
                  key={l.key}
                  className="contact-pill-link"
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <span className="contact-pill-icon">{ICONS[l.key]}</span>
                  <span className="contact-pill-value">{l.value}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="contact-visual-right" aria-hidden="true">
            <div className="glass-panel panel-1">
              <div className="panel-title">AI Automation</div>
              <div className="panel-status">Active</div>
              <div className="panel-sub">• 4 workflows running</div>
            </div>
            <div className="glass-panel panel-2">
              <div className="panel-sub">Accuracy</div>
              <div className="panel-big">98.5%</div>
              <div className="panel-sub">System optimal</div>
            </div>
            <div className="glass-panel panel-3">
              <div className="panel-lead">Incoming lead...</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
