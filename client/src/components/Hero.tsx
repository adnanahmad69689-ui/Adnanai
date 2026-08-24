/** Lightweight pinned hero with native scroll progress and CSS-friendly transforms. */
import { useEffect, useRef, useState } from "react";
import type { SiteSettings } from "@/lib/portfolio";
import { siteConfig } from "../data/siteConfig";
import { BrandLogo } from "./BrandLogo";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function Hero() {
  const { hero, identity, contact } = siteConfig;
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const heroImage = settings?.heroImageUrl || hero.backgroundImage;
  const heroAlt = settings?.heroImageAlt || hero.backgroundAlt;
  const [wordIdx, setWordIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const bgWrapRef = useRef<HTMLDivElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const interval = window.setInterval(() => setWordIdx((index) => (index + 1) % hero.rotatingWords.length), 2800);
    return () => window.clearInterval(interval);
  }, [hero.rotatingWords.length]);

  useEffect(() => {
    const section = sectionRef.current;
    const background = bgWrapRef.current;
    const phase1 = phase1Ref.current;
    const phase2 = phase2Ref.current;
    if (!section || !background || !phase1 || !phase2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-section.getBoundingClientRect().top / travel);
      const phase1Progress = clamp(progress / 0.35);
      const phase2Progress = clamp((progress - 0.3) / 0.25);
      phase1.style.opacity = String(1 - phase1Progress);
      phase1.style.transform = `translate3d(0, ${-phase1Progress * 40}px, 0)`;
      phase2.style.opacity = String(phase2Progress);
      phase2.style.transform = `translate3d(0, ${(1 - phase2Progress) * 60}px, 0)`;
      background.style.transform = `translate3d(0, ${progress * 3}%, 0) scale(${1 + progress * 0.12})`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="hero" className="hero-section" ref={sectionRef}>
      <div className="hero-sticky">
        <div className="hero-bg-wrap" ref={bgWrapRef}>
          <img src={heroImage} alt={heroAlt} className="hero-bg-image" fetchPriority="high" decoding="async" />
        </div>
        <div className="hero-overlay-left" /><div className="hero-overlay-bottom" />
        <div ref={phase1Ref} className="hero-phase1-container hero-phase-enter">
          <div className="hero-greeting-logo-lockup"><BrandLogo className="hero-greeting-logo" title="Adnan Ai" /></div>
          <div className="hero-right-panel">
            {hero.services.map((service) => <span key={service} className="hero-service-line">{service}</span>)}
            <div className="hero-panel-divider" />
            <a className="hero-help-link" href={`mailto:${contact.email}`}>How can I help? ↗</a>
            {hero.stats.map((stat) => <div key={stat.label} className="hero-stat"><div className="hero-stat-value">{stat.value}</div><div className="hero-stat-label">{stat.label}</div></div>)}
          </div>
          <div className="hero-headline-wrapper">
            <p className="hero-tagline">{hero.tagline}</p>
            <h1 className="hero-name"><span className="line-mask"><span className="line-inner">{identity.firstName}</span></span><span className="line-mask"><span className="line-inner"><span className="hero-lastname">{identity.lastName}{identity.lastNameSuffix}</span></span></span></h1>
            <p className="hero-rotating" aria-live="polite">{hero.rotatingWords[wordIdx]}</p>
            <p className="hero-desc">{hero.description}</p>
          </div>
          <div className="hero-scroll-indicator"><span className="hero-scroll-text">(Scroll down)</span><div className="hero-scroll-line" /></div>
        </div>
        <div className="hero-phase2-container" ref={phase2Ref} style={{ opacity: 0, transform: "translate3d(0, 60px, 0)" }}>
          <div className="hero-phase2-left"><p className="hero-phase2-label">{hero.phase2.label}</p><h2 className="hero-phase2-heading">{hero.phase2.headingLead}<br /><em>{hero.phase2.headingEm}</em></h2><p className="hero-phase2-desc">{hero.phase2.description}</p><div className="hero-phase2-actions"><a className="neon-btn" href={`#${hero.phase2.primaryCta.target}`}>{hero.phase2.primaryCta.label}</a><a className="hero-talk-link" href={`mailto:${contact.email}`}>{hero.phase2.secondaryCta.label}</a></div></div>
          <div className="hero-phase2-stats">{hero.phase2.stats.map((stat) => <div key={stat.label}><div className="hero-phase2-stat-value">{stat.value}</div><div className="hero-phase2-stat-label">{stat.label}</div></div>)}</div>
        </div>
      </div>
    </section>
  );
}
