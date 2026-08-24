/** Lightweight pill navbar with CSS-driven transitions and responsive menu. */
import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig, mailto } from "../data/siteConfig";

function scrollToSection(id: string, offset = 20) {
  const element = document.getElementById(id);
  if (!element) {
    window.location.href = `/#${id}`;
    return;
  }
  window.scrollTo({ top: element.offsetTop - offset, behavior: "smooth" });
  window.history.pushState(null, "", `#${id}`);
}

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const rafRef = useRef(0);
  const { nav, identity, contact } = siteConfig;

  useEffect(() => {
    const updateScrollState = () => {
      rafRef.current = 0;
      setScrolled((previous) => {
        const next = window.scrollY > 400;
        return previous === next ? previous : next;
      });

      for (const link of nav.links) {
        const section = document.getElementById(link.id);
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          setActiveSection((previous) => (previous === section.id ? previous : section.id));
          break;
        }
      }
    };
    const onScroll = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(updateScrollState);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollState();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { threshold: 0.3, rootMargin: "-20% 0px -70% 0px" }
    );
    nav.links.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [nav.links]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const onNavClick = useCallback((id: string) => {
    scrollToSection(id, 20);
    setMenuOpen(false);
  }, []);

  const collapsed = scrolled && !hovered;

  return (
    <>
      <nav
        className={`navigation-top ${scrolled ? "scrolled" : ""} ${hovered ? "hovered" : ""} ${collapsed ? "collapsed" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Primary"
      >
        <div className="nav-inner">
          <a
            href="#"
            className="nav-logo"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.pushState(null, "", "#");
            }}
            aria-label="Back to top"
          >
            {identity.monogram}
          </a>
          <ul className="nav-links">
            {nav.links.map((link) => (
              <li key={link.id}>
                <button
                  className={`nav-link ${activeSection === link.id ? "active" : ""}`}
                  onClick={() => onNavClick(link.id)}
                  aria-label={`Navigate to ${link.label} section`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <button
            className="nav-icon-btn"
            onClick={() => setNotifOpen((value) => !value)}
            aria-label="Contact prompt"
            aria-expanded={notifOpen}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          <div className="nav-cta-wrapper">
            <button className="neon-btn" onClick={() => onNavClick("contact")} aria-label="Contact Adnan Ai">
              {nav.contactLabel}
            </button>
          </div>
        </div>
      </nav>

      {notifOpen && (
        <div className="notification-popup" role="dialog" aria-label="Contact prompt">
          <div className="notification-message">
            <div className="message-icon">✦</div>
            <p>{nav.notification.quote}</p>
          </div>
          <a className="lets-discuss-btn" href={mailto(nav.notification.ctaSubject, nav.notification.ctaBody)} onClick={() => setNotifOpen(false)}>
            {nav.notification.ctaLabel}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      )}

      <button
        className={`mobile-menu-button ${scrolled ? "scrolled" : ""}`}
        onClick={() => setMenuOpen((value) => !value)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        <span className={`hamburger-wrapper ${menuOpen ? "open" : ""}`}>
          <span className="hamburger-line line-1" />
          <span className="hamburger-line line-2" />
          <span className="hamburger-line line-3" />
        </span>
      </button>

      {menuOpen && (
        <div className="mobile-menu-overlay" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="mobile-menu-bg" />
          <div className="mobile-menu-gradient" />
          <div className="mobile-menu-content">
            <div className="mobile-menu-logo"><span className="logo-text">{identity.monogram}</span></div>
            <ul className="mobile-menu-links">
              {nav.links.map((link) => (
                <li key={link.id}>
                  <button className={`mobile-nav-link ${activeSection === link.id ? "active" : ""}`} onClick={() => onNavClick(link.id)}>
                    {activeSection === link.id && <span className="active-indicator" />}
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            <a href={`mailto:${contact.email}`} className="mobile-cta-btn" onClick={() => setMenuOpen(false)}>
              <span className="cta-text">{nav.mobileCta}</span><span className="cta-arrow">→</span>
            </a>
            <div className="mobile-menu-footer"><p>{nav.mobileFooter}</p></div>
          </div>
        </div>
      )}
    </>
  );
}
