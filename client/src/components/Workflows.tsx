/**
 * "Real Results" workflows section: heading, count-up metrics bar,
 * 2-col gallery of workflow cards with pipeline overlays, show-more button,
 * social proof strip, and the gradient audit CTA.
 */
import { siteConfig, mailto } from "../data/siteConfig";
import { homeWorkflows, type Workflow } from "../data/projects";

export function WorkflowCard({ workflow }: { workflow: Workflow }) {
  const { workflows } = siteConfig;
  const href = mailto(
    `I need ${workflow.title}`,
    `Hi,\n\nI saw your ${workflow.title} workflow and I need this for my business.\n\nCan you help me set it up?\n\nThanks!`
  );
  return (
    <div className="workflow-card reveal-item">
      <div className="workflow-card-inner">
        <div className="workflow-img-container">
          <img
            alt={workflow.title}
            className="workflow-img"
            loading="lazy"
            decoding="async"
            src={workflow.image}
          />
        </div>
        <div className="workflow-info">
          <div className="wf-metric-badge">
            <span className="wf-metric-value">{workflow.metric}</span>
            <span className="wf-metric-label">{workflow.metricLabel}</span>
          </div>
          <h3 className="wf-title">{workflow.title}</h3>
          <div className="wf-details">
            <div className="wf-problem">
              <span className="wf-icon wf-icon-x">✕</span>
              <span className="wf-detail-text">{workflow.problem}</span>
            </div>
            <div className="wf-solution">
              <span className="wf-icon wf-icon-check">✓</span>
              <span className="wf-detail-text">{workflow.solution}</span>
            </div>
          </div>
          <a className="wf-card-cta" href={href}>
            {workflows.cardCta}
            <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="14">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export function Workflows() {
  const { workflows } = siteConfig;
  return (
    <section id="ai-systems" className="workflows-section">
      <div className="workflows-bg-glow" />
      <div className="workflows-container">
        <div className="workflows-heading-block reveal-item">
          <span className="section-label">{workflows.label}</span>
          <h2 className="workflows-heading">
            {workflows.headingLead} <em>{workflows.headingEm}</em>
          </h2>
          <p className="workflows-subtitle">{workflows.subtitle}</p>
        </div>

        <div className="service-pillars reveal-item" aria-label="Adnan AI core services">
          {workflows.pillars.map((pillar) => (
            <span key={pillar} className="service-pillar">{pillar}</span>
          ))}
        </div>

        <div className="workflows-gallery">
          {homeWorkflows.map((w) => (
            <WorkflowCard key={w.id} workflow={w} />
          ))}
        </div>

        <div className="show-more-container">
          <a className="show-more-button" href="#n8n-projects" style={{ textDecoration: "none" }}>
            {workflows.showMoreLabel}
            <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" style={{ marginLeft: 8 }} viewBox="0 0 24 24" width="16">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="social-proof-strip reveal-item">
          <span className="social-proof-label">{workflows.trustedByLabel}</span>
          <div className="social-proof-logos">
            {workflows.trustedBy.map((t) => (
              <span key={t} className="social-proof-item">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="workflow-cta-section reveal-item">
          <h3 className="cta-heading">{workflows.ctaHeading}</h3>
          <p className="cta-sub">{workflows.ctaSub}</p>
          <a className="cta-button" href={mailto(workflows.ctaSubject, workflows.ctaBody)}>
            <span className="cta-button-icon">✦</span>
            {workflows.ctaButton}
            <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="18">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
