/**
 * #n8n-projects subpage: back link, centered heading, 3-col gallery of all
 * workflow cards, and a boxed audit CTA. Rendered when the URL hash is
 * "#n8n-projects" (see App.tsx hash routing).
 */
import { useEffect } from "react";
import { motion } from "framer-motion";
import { siteConfig, mailto } from "../data/siteConfig";
import { allWorkflows, type Workflow } from "../data/projects";
import { PipelineOverlay } from "./PipelineOverlay";

function N8nCard({ project }: { project: Workflow }) {
  const href = mailto(
    `I need ${project.title}`,
    `Hi,\n\nI saw your ${project.title} workflow and I need this for my business.\n\nCan you help me set it up?\n\nThanks!`
  );
  return (
    <motion.div
      className="n8n-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="n8n-img-container">
        <img alt={project.title} className="n8n-img" loading="lazy" src={project.image} />
        <PipelineOverlay sub />
      </div>
      <div className="n8n-info">
        <div className="wf-metric-badge">
          <span className="wf-metric-value">{project.metric}</span>
          <span className="wf-metric-label">{project.metricLabel}</span>
        </div>
        <h3 className="n8n-card-title">{project.title}</h3>
        <div className="wf-details">
          <div className="wf-problem">
            <span className="wf-icon wf-icon-x">✕</span>
            <span className="wf-detail-text">{project.problem}</span>
          </div>
          <div className="wf-solution">
            <span className="wf-icon wf-icon-check">✓</span>
            <span className="wf-detail-text">{project.solution}</span>
          </div>
        </div>
        <a className="n8n-card-cta" href={href}>
          {siteConfig.workflows.cardCta}
          <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="14">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

export function N8nProjects() {
  const { n8nPage, workflows } = siteConfig;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="n8n-section">
      <div className="n8n-bg-glow" />
      <div className="n8n-container">
        <div className="n8n-back-wrapper">
          <motion.a
            href="#"
            className="n8n-back-link"
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {n8nPage.backLabel}
          </motion.a>
        </div>
        <motion.div
          className="n8n-heading-block"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="n8n-section-label">{n8nPage.label}</span>
          <h1 className="n8n-heading">
            {n8nPage.headingLead} <em>{n8nPage.headingEm}</em>
          </h1>
          <p className="n8n-subtitle">{n8nPage.subtitle}</p>
        </motion.div>
        <div className="n8n-gallery">
          {allWorkflows.map((p) => (
            <N8nCard key={p.id} project={p} />
          ))}
        </div>
        <motion.div
          className="n8n-cta-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="n8n-cta-heading">{n8nPage.ctaHeading}</h3>
          <p className="n8n-cta-sub">{n8nPage.ctaSub}</p>
          <motion.a
            href={mailto(workflows.ctaSubject, workflows.ctaBody)}
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            ✦ {n8nPage.ctaButton}
            <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="18">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

