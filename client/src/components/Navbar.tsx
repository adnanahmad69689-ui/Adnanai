/**
 * Pill navbar: centered, blurred, collapses to logo-only width after 400px
 * of scroll (expands on hover), active-section pill, notification popup,
 * neon contact button. On <=1024px it is replaced by a hamburger that opens
 * a full-screen overlay menu.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig, mailto } from "../data/siteConfig";

export function scrollToSection(id: string, offset = 20) {
  const el = document.getElementById(id);
  if (!el) {
    window.location.href = `/#${id}`;
    return;
  }
  const top = el.offsetTop - offset;
  window.scrollTo({ top, behavior: "smooth" });
  if (window.history.pushState) {
    window.history.pushState(null, "", `#${id}`);
  }
}

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { nav, identity, contact } = siteConfig;

  /* Track scroll position + active section */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 400);
      const sections = nav.links
        .map((l) => document.getElementById(l.id))
        .filter(Boolean) as HTMLElement[];
      for (const s of sections) {
        const rect = s.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          setActiveSection(s.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-20% 0px -70% 0px" }
    );
    nav.links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [nav.links]);

  /* Lock body scroll when the mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const onNavClick = useCallback((id: string) => {
    if (document.getElementById(id)) {
      scrollToSection(id, 20);
    } else {
      window.location.href = `/#${id}`;
    }
    setMenuOpen(false);
  }, []);

  const onDiscuss = () => {
    window.location.href = mailto(
      nav.notification.ctaSubject,
      nav.notification.ctaBody
    );
    setNotifOpen(false);
  };

  const collapsed = scrolled && !hovered;

  return (
    <>
      <motion.nav
        ref={navRef}
        className={`navigation-top ${scrolled ? "scrolled" : ""} ${hovered ? "hovered" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ left: "50%", x: "-50%", y: -80, opacity: 0 }}
        animate={{
          left: "50%",
          x: "-50%",
          y: 0,
          opacity: 1,
          width: collapsed ? 128 : "auto",
        }}
        transition={{
          y: { type: "spring", stiffness: 120, damping: 14, delay: 0.2 },
          opacity: { duration: 0.5, delay: 0.2 },
          width: { type: "spring", stiffness: 300, damping: 25, duration: 0.5 },
        }}
        aria-label="Primary"
      >
        <div className="nav-inner">
          <a
            href="#"
            className="nav-logo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.pushState(null, "", "#");
            }}
            aria-label="Back to top"
          >
            {identity.monogram}
          </a>
          <AnimatePresence>
            {!collapsed && (
              <motion.ul
                className="nav-links"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
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
              </motion.ul>
            )}
          </AnimatePresence>
          <motion.button
            className="nav-icon-btn"
            onClick={() => setNotifOpen((v) => !v)}
            aria-label="Notifications"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </motion.button>
          <motion.div
            className="nav-cta-wrapper"
            animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : "auto" }}
            transition={{ duration: 0.2 }}
          >
            <button
              className="neon-btn"
              onClick={() => onNavClick("contact")}
              aria-label="Contact Us - Scroll to section"
            >
              {nav.contactLabel}
            </button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Notification popup */}
      <AnimatePresence>
        {notifOpen && (
          <motion.div
            className="notification-popup"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="notification-message">
              <div className="message-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <p>{nav.notification.quote}</p>
            </div>
            <button className="lets-discuss-btn" onClick={onDiscuss}>
              {nav.notification.ctaLabel}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile hamburger */}
      <motion.button
        className={`mobile-menu-button ${scrolled ? "scrolled" : ""}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className={`hamburger-wrapper ${menuOpen ? "open" : ""}`}>
          <span className="hamburger-line line-1" />
          <span className="hamburger-line line-2" />
          <span className="hamburger-line line-3" />
        </span>
      </motion.button>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="mobile-menu-bg" />
            <div className="mobile-menu-gradient" />
            <div className="mobile-menu-content">
              <motion.div
                className="mobile-menu-logo"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <span className="logo-text">{identity.monogram}</span>
              </motion.div>
              <motion.ul
                className="mobile-menu-links"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: { transition: { staggerChildren: 0.08 } },
                  hidden: { transition: { staggerChildren: 0.05 } },
                }}
              >
                {nav.links.map((link) => (
                  <motion.li
                    key={link.id}
                    variants={{
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { type: "spring", stiffness: 300, damping: 25 },
                      },
                      hidden: {
                        opacity: 0,
                        y: 30,
                        transition: { type: "spring", stiffness: 300, damping: 25 },
                      },
                    }}
                  >
                    <button
                      className={`mobile-nav-link ${activeSection === link.id ? "active" : ""}`}
                      onClick={() => onNavClick(link.id)}
                    >
                      {activeSection === link.id && (
                        <motion.span
                          className="active-indicator"
                          layoutId="mobile-nav-pill"
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        />
                      )}
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <a
                  href={`mailto:${contact.email}`}
                  className="mobile-cta-btn"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="cta-text">{nav.mobileCta}</span>
                  <span className="cta-arrow">→</span>
                </a>
              </motion.div>
              <motion.div
                className="mobile-menu-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p>{nav.mobileFooter}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
