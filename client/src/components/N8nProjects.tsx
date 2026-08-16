/** Lightweight AI system-pattern gallery rendered from neutral service examples. */
import { useEffect } from "react";
import { siteConfig, mailto } from "../data/siteConfig";
import { allWorkflows, type Workflow } from "../data/projects";
import { PipelineOverlay } from "./PipelineOverlay";

function SystemPatternCard({ project }: { project: Workflow }) {
  const href = mailto(
    `Adnan AI — ${project.title}`,
    `Hi Adnan AI,\n\nI’d like to discuss a system related to ${project.title}.\n\nHere is my business context:\n\n[Describe your task]\n\nThanks!`
  );
  return (
    <article className="n8n-card">
      <div className="n8n-img-container">
        <img alt={project.title} className="n8n-img" loading="lazy" decoding="async" src={project.image} />
        <PipelineOverlay sub />
      </div>
      <div className="n8n-info">
        <div className="wf-metric-badge"><span className="wf-metric-value">{project.metric}</span><span className="wf-metric-label">{project.metricLabel}</span></div>
        <h3 className="n8n-card-title">{project.title}</h3>
        <div className="wf-details">
          <div className="wf-problem"><span className="wf-icon wf-icon-x">✕</span><span className="wf-detail-text">{project.problem}</span></div>
          <div className="wf-solution"><span className="wf-icon wf-icon-check">✓</span><span className="wf-detail-text">{project.solution}</span></div>
        </div>
        <a className="n8n-card-cta" href={href}>{siteConfig.workflows.cardCta}<svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="14"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
      </div>
    </article>
  );
}

export function N8nProjects() {
  const { n8nPage, workflows } = siteConfig;
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <section className="n8n-section">
      <div className="n8n-bg-glow" />
      <div className="n8n-container">
        <div className="n8n-back-wrapper"><a href="#" className="n8n-back-link"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>{n8nPage.backLabel}</a></div>
        <div className="n8n-heading-block"><span className="n8n-section-label">{n8nPage.label}</span><h1 className="n8n-heading">{n8nPage.headingLead} <em>{n8nPage.headingEm}</em></h1><p className="n8n-subtitle">{n8nPage.subtitle}</p></div>
        <div className="n8n-gallery">{allWorkflows.map((project) => <SystemPatternCard key={project.id} project={project} />)}</div>
        <div className="n8n-cta-section"><h3 className="n8n-cta-heading">{n8nPage.ctaHeading}</h3><p className="n8n-cta-sub">{n8nPage.ctaSub}</p><a href={mailto(workflows.ctaSubject, workflows.ctaBody)} className="cta-button">✦ {n8nPage.ctaButton}<svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="18"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a></div>
      </div>
    </section>
  );
}
