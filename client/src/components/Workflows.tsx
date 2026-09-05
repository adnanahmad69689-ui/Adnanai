/**
 * "Real Results" workflows section: heading, count-up metrics bar,
 * A concise three-card gallery of practical workflow examples.
 */
import { siteConfig, mailto } from "../data/siteConfig";
import { listPublishedPortfolioItems, type PortfolioItem } from "@/lib/portfolio";
import { useQuery } from "@tanstack/react-query";
import { framingStyle } from "@/lib/framing";

type Workflow = Pick<PortfolioItem, "id" | "title" | "imageUrl" | "imageAlt" | "label" | "description" | "trigger" | "aiProcess" | "output" | "focalX" | "focalY" | "zoom">;

function getMetric(label: string) {
  const [metric = "AI", ...rest] = label.split("·");
  return { metric: metric.trim(), metricLabel: rest.join("·").trim() || "System pattern" };
}

export function WorkflowCard({ workflow }: { workflow: Workflow }) {
  const { workflows } = siteConfig;
  const { metric, metricLabel } = getMetric(workflow.label);
  const href = mailto(
    `I need ${workflow.title}`,
    `Hi,\n\nI saw your ${workflow.title} workflow and I need this for my business.\n\nCan you help me set it up?\n\nThanks!`
  );
  return (
    <div className="workflow-card reveal-item">
      <div className="workflow-card-inner">
        <div className="workflow-img-container">
          <img
            alt={workflow.imageAlt}
            className="workflow-img"
            loading="lazy"
            decoding="async"
            src={workflow.imageUrl}
            style={framingStyle(workflow)}
          />
        </div>
        <div className="workflow-info">
          <div className="wf-metric-badge">
            <span className="wf-metric-value">{metric}</span>
            <span className="wf-metric-label">{metricLabel}</span>
          </div>
          <h3 className="wf-title">{workflow.title}</h3>
          <div className="wf-details">
            <div className="wf-problem">
              <span className="wf-icon wf-icon-x">✕</span>
              <span className="wf-detail-text">{workflow.trigger ?? workflow.description}</span>
            </div>
            <div className="wf-solution">
              <span className="wf-icon wf-icon-check">✓</span>
              <span className="wf-detail-text">{workflow.aiProcess ?? workflow.output ?? workflow.description}</span>
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
  const { data: rawWorkflows, isLoading, isError } = useQuery({ queryKey: ["portfolio", "ai_system"], queryFn: () => listPublishedPortfolioItems("ai_system") });
  const workflowsToFeature = ((rawWorkflows ?? []) as Workflow[]).slice(0, 3);
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

        <div className="workflows-gallery">
          {isLoading ? <p className="workflows-loading">Loading AI systems…</p> : null}
          {isError ? <p className="workflows-loading">AI system patterns are temporarily unavailable. Please check back shortly.</p> : null}
          {workflowsToFeature.map((w) => (
            <WorkflowCard key={w.id} workflow={w} />
          ))}
          {!isLoading && !isError && workflowsToFeature.length === 0 ? <p className="workflows-loading">AI system patterns will appear here when published.</p> : null}
        </div>
      </div>
    </section>
  );
}
