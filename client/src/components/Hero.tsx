/**
 * 180vh pinned hero with two scroll phases:
 *  - Phase 1: greeting, right panel, giant name + rotating word, scroll hint.
 *  - Phase 2 (30%→55% scroll): "What I build" panel with CTAs and big stats.
 * Background image slowly zooms and parallaxes on scroll (GSAP ScrollTrigger).
 */
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig, mailto } from "../data/siteConfig";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const { hero, identity, contact } = siteConfig;
  const [wordIdx, setWordIdx] = useState(0);
  const [greeting, setGreeting] = useState("");

  const sectionRef = useRef<HTMLDivElement>(null);
  const bgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const nameLine1Ref = useRef<HTMLSpanElement>(null);
  const nameLine2Ref = useRef<HTMLSpanElement>(null);
  const rotatingRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);

  /* Time-of-day greeting */
  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning!" : h < 18 ? "Good afternoon!" : "Good evening!");
  }, []);

  /* Rotating word */
  useEffect(() => {
    const id = setInterval(
      () => setWordIdx((i) => (i + 1) % hero.rotatingWords.length),
      2500
    );
    return () => clearInterval(id);
  }, [hero.rotatingWords.length]);

  /* GSAP entrance + scroll choreography */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          reducedMotion: "(prefers-reduced-motion: reduce)",
          normalMotion: "(prefers-reduced-motion: no-preference)",
        },
        (mctx) => {
          const { reducedMotion } = mctx.conditions as { reducedMotion: boolean };
          if (reducedMotion) {
            gsap.set(
              [
                greetingRef.current,
                rightPanelRef.current,
                taglineRef.current,
                nameLine1Ref.current,
                nameLine2Ref.current,
                rotatingRef.current,
                descRef.current,
                scrollIndRef.current,
                phase2Ref.current,
              ],
              { autoAlpha: 1, y: 0 }
            );
            return;
          }

          gsap.set(
            [
              greetingRef.current,
              rightPanelRef.current,
              taglineRef.current,
              rotatingRef.current,
              descRef.current,
              scrollIndRef.current,
            ],
            { autoAlpha: 0 }
          );
          gsap.set([nameLine1Ref.current, nameLine2Ref.current], {
            y: "110%",
            opacity: 0.7,
          });

          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.to(greetingRef.current, { autoAlpha: 1, duration: 0.55 })
            .to(rightPanelRef.current, { autoAlpha: 1, x: 0, duration: 0.65 }, "-=0.2")
            .to(taglineRef.current, { autoAlpha: 1, duration: 0.5 }, "-=0.3")
            .to(nameLine1Ref.current, { y: "0%", duration: 0.9, ease: "power4.out" }, "-=0.25")
            .to(nameLine2Ref.current, { y: "0%", duration: 0.9, ease: "power4.out" }, "-=0.65")
            .to(rotatingRef.current, { autoAlpha: 1, y: 0, duration: 0.55 }, "-=0.3")
            .to(descRef.current, { autoAlpha: 1, duration: 0.5 }, "-=0.2")
            .to(scrollIndRef.current, { autoAlpha: 1, duration: 0.5 }, "-=0.3");

          gsap.delayedCall(3, () => {
            gsap.to([nameLine1Ref.current, nameLine2Ref.current], {
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            });
          });

          /* Slow background zoom */
          gsap.to(imgRef.current, {
            scale: 1.05,
            duration: 22,
            ease: "none",
            repeat: -1,
            yoyo: true,
          });

          /* Scroll parallax on the background wrapper */
          gsap.to(bgWrapRef.current, {
            scale: 1.25,
            y: "5%",
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "60% top",
              scrub: 1.2,
            },
          });

          /* Scroll indicator pulse */
          gsap.to(".hero-scroll-line", {
            scaleY: 0.35,
            opacity: 0.25,
            duration: 1.6,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            transformOrigin: "top",
          });

          /* Phase 1 fades out */
          gsap.to(phase1Ref.current, {
            autoAlpha: 0,
            y: -40,
            ease: "power2.in",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "35% top",
              scrub: 1.2,
            },
          });

          /* Phase 2 fades in */
          gsap.set(phase2Ref.current, { autoAlpha: 0, y: 60 });
          gsap.to(phase2Ref.current, {
            autoAlpha: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "30% top",
              end: "55% top",
              scrub: 1,
            },
          });
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="hero-section" ref={sectionRef}>
      <div className="hero-sticky">
        <div className="hero-bg-wrap" ref={bgWrapRef}>
          <img
            ref={imgRef}
            src={hero.backgroundImage}
            alt={hero.backgroundAlt}
            className="hero-bg-image"
          />
        </div>
        <div className="hero-overlay-left" />
        <div className="hero-overlay-bottom" />

        {/* Phase 1 */}
        <div ref={phase1Ref} className="hero-phase1-container">
          <div className="hero-greeting" ref={greetingRef}>
            <p className="hero-greeting-small">{greeting}</p>
            <p className="hero-greeting-name">
              {identity.firstName} <em>{identity.lastName}</em>
            </p>
          </div>

          <div className="hero-right-panel" ref={rightPanelRef}>
            {hero.services.map((s) => (
              <span key={s} className="hero-service-line">
                {s}
              </span>
            ))}
            <div className="hero-panel-divider" />
            <a className="hero-help-link" href={`mailto:${contact.email}`}>
              How can I help? ↗
            </a>
            {hero.stats.map((s) => (
              <div key={s.label} className="hero-stat">
                <div className="hero-stat-value">{s.value}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="hero-headline-wrapper">
            <p className="hero-tagline" ref={taglineRef}>
              {hero.tagline}
            </p>
            <h1 className="hero-name">
              <span className="line-mask">
                <span className="line-inner" ref={nameLine1Ref}>
                  {identity.firstName}
                </span>
              </span>
              <span className="line-mask">
                <span className="line-inner" ref={nameLine2Ref}>
                  <span className="hero-lastname">
                    {identity.lastName}
                    {identity.lastNameSuffix}
                  </span>
                </span>
              </span>
            </h1>
            <p className="hero-rotating" ref={rotatingRef} aria-live="polite">
              {hero.rotatingWords[wordIdx]}
            </p>
            <p className="hero-desc" ref={descRef}>
              {hero.description}
            </p>
          </div>

          <div className="hero-scroll-indicator" ref={scrollIndRef}>
            <span className="hero-scroll-text">(Scroll down)</span>
            <div className="hero-scroll-line" />
          </div>
        </div>

        {/* Phase 2 */}
        <div className="hero-phase2-container" ref={phase2Ref}>
          <div className="hero-phase2-left">
            <p className="hero-phase2-label">{hero.phase2.label}</p>
            <h2 className="hero-phase2-heading">
              {hero.phase2.headingLead}
              <br />
              <em>{hero.phase2.headingEm}</em>
            </h2>
            <p className="hero-phase2-desc">{hero.phase2.description}</p>
            <div className="hero-phase2-actions">
              <a
                className="neon-btn"
                href={`#${hero.phase2.primaryCta.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(hero.phase2.primaryCta.target);
                  if (el) window.scrollTo({ top: el.offsetTop - 20, behavior: "smooth" });
                }}
              >
                {hero.phase2.primaryCta.label}
              </a>
              <a className="hero-talk-link" href={`mailto:${contact.email}`}>
                {hero.phase2.secondaryCta.label}
              </a>
            </div>
          </div>
          <div className="hero-phase2-stats">
            {hero.phase2.stats.map((s) => (
              <div key={s.label}>
                <div className="hero-phase2-stat-value">{s.value}</div>
                <div className="hero-phase2-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
