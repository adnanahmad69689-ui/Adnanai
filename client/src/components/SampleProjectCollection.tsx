/** Evidence-based website collection from the user-supplied site and screenshots. */
import { trpc } from "@/lib/trpc";
import { useMemo } from "react";
import { mailto } from "../data/siteConfig";

type WebsiteItem = {
  id: number;
  title: string;
  label: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  publicUrl: string | null;
  details: string[];
};

export function SampleProjectCollection() {
  const websiteQuery = useMemo(() => ({ kind: "website" as const }), []);
  const { data: rawProjects, isLoading, isError } = trpc.portfolio.list.useQuery(websiteQuery);
  const projects = (rawProjects ?? []) as WebsiteItem[];

  return <section className="sample-projects-section" aria-labelledby="sample-projects-heading">
    <div className="sample-projects-container">
      <div className="sample-projects-intro reveal-item">
        <span className="section-label">Websites</span>
        <h2 id="sample-projects-heading">Built for the <em>browser.</em></h2>
        <p>Public links appear only where supplied. Every featured project can be reviewed through its live site or direct project discussion.</p>
      </div>
      <div className="sample-projects-grid">
        {isLoading ? <p className="sample-projects-loading">Loading website projects…</p> : null}
        {isError ? <p className="sample-projects-loading">Website projects are temporarily unavailable. Please check back shortly.</p> : null}
        {projects.map((project) => <article key={project.id} className="sample-project-card reveal-item">
          <figure className="sample-project-image">
            <img src={project.imageUrl} alt={project.imageAlt} loading="lazy" decoding="async" />
          </figure>
          <div className="sample-project-content">
            <span className="sample-project-label">{project.label}</span>
            <h3>{project.title}</h3><p>{project.description}</p>
            <ul>{project.details.map((detail) => <li key={detail}>✓ {detail}</li>)}</ul>
            <div className="sample-project-footer">
              <span>{project.publicUrl ? "Public project · live website available" : "Project discussion available"}</span>
              {project.publicUrl ? <a className="sample-project-action" href={project.publicUrl} target="_blank" rel="noreferrer">Visit live site ↗</a> : <a className="sample-project-action" href={mailto(`Adnan AI — ${project.title}`, `Hi Adnan Ai,\n\nI would like to request more details about ${project.title}.\n\nThanks!`)}>Discuss project ↗</a>}
            </div>
          </div>
        </article>)}
        {!isLoading && !isError && projects.length === 0 ? <p className="sample-projects-loading">New website work will appear here when it is published.</p> : null}
      </div>
    </div>
  </section>;
}
