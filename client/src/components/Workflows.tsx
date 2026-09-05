/**
 * The two AI portfolio sections.
 *
 * AI Automation and AI Agents share one card and one section shell so they stay
 * visually consistent, but each is driven by its own query and its own copy.
 * Nothing is hardcoded: both render whatever the admin console has published.
 */
import { useState } from "react";
import { siteConfig, mailto } from "../data/siteConfig";
import { listAgentSectionItems, listPublishedPortfolioItems, type PortfolioItem } from "@/lib/portfolio";
import { useQuery } from "@tanstack/react-query";
import { framingStyle } from "@/lib/framing";

type Workflow = Pick<PortfolioItem, "id" | "title" | "imageUrl" | "imageAlt" | "label" | "description" | "trigger" | "aiProcess" | "output" | "focalX" | "focalY" | "zoom">;

/** Cards beyond this stay collapsed behind the reveal button. */
const VISIBLE_LIMIT = 4;

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

function AiSection({
  id,
  label,
  heading,
  headingEm,
  description,
  items,
  isLoading,
  isError,
  revealLabel,
  emptyMessage,
  variant,
}: {
  id: string;
  label: string;
  heading: string;
  headingEm: string;
  description: string;
  items: Workflow[];
  isLoading: boolean;
  isError: boolean;
  revealLabel: string;
  emptyMessage: string;
  variant?: "agents";
}) {
  const [expanded, setExpanded] = useState(false);
  const canCollapse = items.length > VISIBLE_LIMIT;
  const visible = canCollapse && !expanded ? items.slice(0, VISIBLE_LIMIT) : items;

  return (
    <section id={id} className={`workflows-section${variant === "agents" ? " workflows-section--agents" : ""}`}>
      <div className="workflows-bg-glow" />
      <div className="workflows-container">
        <div className="workflows-heading-block reveal-item">
          <span className="section-label">{label}</span>
          <h2 className="workflows-heading">
            {heading} <em>{headingEm}</em>
          </h2>
          <p className="workflows-subtitle">{description}</p>
        </div>

        <div className="workflows-gallery">
          {isLoading ? <p className="workflows-loading">Loading…</p> : null}
          {isError ? <p className="workflows-loading">This section is temporarily unavailable. Please check back shortly.</p> : null}
          {visible.map((item) => (
            <WorkflowCard key={item.id} workflow={item} />
          ))}
          {!isLoading && !isError && items.length === 0 ? <p className="workflows-loading">{emptyMessage}</p> : null}
        </div>

        {canCollapse ? (
          <div className="workflows-reveal">
            <button
              type="button"
              className="workflows-reveal-btn"
              onClick={() => setExpanded((open) => !open)}
              aria-expanded={expanded}
              aria-controls={`${id}-gallery`}
            >
              {expanded ? "Show Less" : revealLabel}
              <span className={`workflows-reveal-icon${expanded ? " is-open" : ""}`} aria-hidden="true">
                <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="14">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function Workflows() {
  const { workflows, agents } = siteConfig;

  const automation = useQuery({
    queryKey: ["portfolio", "ai_system"],
    queryFn: () => listPublishedPortfolioItems("ai_system"),
  });
  const agentItems = useQuery({
    queryKey: ["portfolio", "agent-section"],
    queryFn: listAgentSectionItems,
  });

  return (
    <>
      <AiSection
        id="ai-systems"
        label={workflows.label}
        heading={workflows.headingLead}
        headingEm={workflows.headingEm}
        description={workflows.subtitle}
        items={(automation.data ?? []) as Workflow[]}
        isLoading={automation.isLoading}
        isError={automation.isError}
        revealLabel="View All Automations"
        emptyMessage="Automations will appear here when published."
      />
      <AiSection
        id="ai-agents"
        variant="agents"
        label={agents.label}
        heading={agents.headingLead}
        headingEm={agents.headingEm}
        description={agents.subtitle}
        items={(agentItems.data ?? []) as Workflow[]}
        isLoading={agentItems.isLoading}
        isError={agentItems.isError}
        revealLabel="View All AI Agents"
        emptyMessage="Agent projects will appear here when published."
      />
    </>
  );
}
