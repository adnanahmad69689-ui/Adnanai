/** Lightweight AI system-pattern gallery rendered from the managed portfolio database. */
import { useEffect } from "react";
import { siteConfig, mailto } from "../data/siteConfig";
import { listPublishedPortfolioItems, type PortfolioItem } from "@/lib/portfolio";
import { useQuery } from "@tanstack/react-query";
import { PipelineOverlay } from "./PipelineOverlay";

type Workflow = Pick<PortfolioItem, "id" | "title" | "imageUrl" | "imageAlt" | "label" | "description" | "trigger" | "aiProcess" | "output">;

function getMetric(label: string) {
  const [metric = "AI", ...rest] = label.split("·");
  return { metric: metric.trim(), metricLabel: rest.join("·").trim() || "System pattern" };
}

function SystemPatternCard({ project }: { project: Workflow }) {
  const { metric, metricLabel } = getMetric(project.label);
  const href = mailto(
    `Adnan AI — ${project.title}`,
    `Hi Adnan AI,\n\nI’d like to discuss a system related to ${project.title}.\n\nHere is my business context:\n\n[Describe your task]\n\nThanks!`
  );
  return (
    <article className="n8n-card">
      <div className="n8n-img-container">
        <img alt={project.imageAlt} className="n8n-img" loading="lazy" decoding="async" src={project.imageUrl} />
        <PipelineOverlay sub />
      </div>
      <div className="n8n-info">
        <div className="wf-metric-badge"><span className="wf-metric-value">{metric}</span><span className="wf-metric-label">{metricLabel}</span></div>
        <h3 className="n8n-card-title">{project.title}</h3>
        <div className="wf-details">
          <div className="wf-problem"><span className="wf-icon wf-icon-x">✕</span><span className="wf-detail-text">{project.trigger ?? project.description}</span></div>
          <div className="wf-solution"><span className="wf-icon wf-icon-check">✓</span><span className="wf-detail-text">{project.aiProcess ?? project.output ?? project.description}</span></div>
        </div>
        <a className="n8n-card-cta" href={href}>{siteConfig.workflows.cardCta}<svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="14"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
      </div>
    </article>
  );
}

export function N8nProjects() {
  const { n8nPage, workflows } = siteConfig;
  const { data: rawProjects, isLoading, isError } = useQuery({ queryKey: ["portfolio", "ai_system"], queryFn: () => listPublishedPortfolioItems("ai_system") });
  const projects = (rawProjects ?? []) as Workflow[];
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <section className="n8n-section">
      <div className="n8n-bg-glow" />
      <div className="n8n-container">
        <div className="n8n-back-wrapper"><a href="#" className="n8n-back-link"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>{n8nPage.backLabel}</a></div>
        <div className="n8n-heading-block"><span className="n8n-section-label">{n8nPage.label}</span><h1 className="n8n-heading">{n8nPage.headingLead} <em>{n8nPage.headingEm}</em></h1><p className="n8n-subtitle">{n8nPage.subtitle}</p></div>
        <div className="n8n-gallery">{isLoading ? <p className="workflows-loading">Loading AI systems…</p> : null}{isError ? <p className="workflows-loading">AI system patterns are temporarily unavailable. Please check back shortly.</p> : null}{projects.map((project) => <SystemPatternCard key={project.id} project={project} />)}{!isLoading && !isError && projects.length === 0 ? <p className="workflows-loading">Published AI system patterns will appear here.</p> : null}</div>
        <div className="n8n-cta-section"><h3 className="n8n-cta-heading">{n8nPage.ctaHeading}</h3><p className="n8n-cta-sub">{n8nPage.ctaSub}</p><a href={mailto(workflows.ctaSubject, workflows.ctaBody)} className="cta-button">✦ {n8nPage.ctaButton}<svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="18"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a></div>
      </div>
    </section>
  );
}
