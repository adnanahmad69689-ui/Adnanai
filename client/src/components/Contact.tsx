/** Contact section: focused email and Instagram actions with neutral visual accents. */
import { siteConfig } from "../data/siteConfig";

const ICONS: Record<string, React.ReactNode> = {
  email: <span style={{ fontSize: 13 }}>@</span>,
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
              {links.map((link) => (
                <a
                  key={link.key}
                  className="contact-pill-link"
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <span className="contact-pill-icon">{ICONS[link.key]}</span>
                  <span className="contact-pill-value">{link.value}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="contact-visual-right" aria-hidden="true">
            <div className="glass-panel panel-1">
              <div className="panel-title">AI Systems</div>
              <div className="panel-status">Ready</div>
              <div className="panel-sub">• Strategy to delivery</div>
            </div>
            <div className="glass-panel panel-2">
              <div className="panel-sub">Focus</div>
              <div className="panel-big">AI</div>
              <div className="panel-sub">Built around your work</div>
            </div>
            <div className="glass-panel panel-3">
              <div className="panel-lead">Let’s solve the next workflow.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
