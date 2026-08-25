/** Lightweight pill navbar with CSS-driven transitions and responsive menu. */
import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "../data/siteConfig";

function scrollToSection(id: string) {
  if (id === "hero") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", "#");
    return;
  }

  const element = document.getElementById(id);
  if (!element) {
    window.location.href = `/#${id}`;
    return;
  }
  element.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.pushState(null, "", `#${id}`);
}

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const rafRef = useRef(0);
  const { nav, identity } = siteConfig;

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
    scrollToSection(id);
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
            href="#main"
            className="nav-logo"
            onClick={(event) => {
              event.preventDefault();
              onNavClick("hero");
            }}
            aria-label="Back to top"
          >
            <span className="nav-logo-text">Home</span>
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
          <div className="nav-cta-wrapper">
            <button className="neon-btn" onClick={() => onNavClick("contact")} aria-label="Contact Adnan Ai">
              {nav.contactLabel}
            </button>
          </div>
        </div>
      </nav>

      <button
        className={`mobile-menu-button ${scrolled ? "scrolled" : ""}`}
        onClick={() => setMenuOpen((value) => !value)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-mobile-menu"
      >
        <span className={`hamburger-wrapper ${menuOpen ? "open" : ""}`}>
          <span className="hamburger-line line-1" />
          <span className="hamburger-line line-2" />
          <span className="hamburger-line line-3" />
        </span>
      </button>

      {menuOpen && (
        <div id="primary-mobile-menu" className="mobile-menu-overlay" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="mobile-menu-bg" />
          <div className="mobile-menu-gradient" />
          <div className="mobile-menu-content">
            <button className="mobile-menu-logo" type="button" onClick={() => onNavClick("hero")} aria-label="Back to top"><span className="mobile-menu-logo-text">{identity.firstName} <em>{identity.lastName}</em></span></button>
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
            <button type="button" className="mobile-cta-btn" onClick={() => onNavClick("contact")}>
              <span className="cta-text">{nav.contactLabel}</span><span className="cta-arrow">→</span>
            </button>
            <div className="mobile-menu-footer"><p>{nav.mobileFooter}</p></div>
          </div>
        </div>
      )}
    </>
  );
}
