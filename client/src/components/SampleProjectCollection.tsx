/** Evidence-based portfolio project collection from the user-supplied site and screenshots. */
import { mailto } from "../data/siteConfig";
import { sampleProjects } from "../data/sampleProjects";

export function SampleProjectCollection() {
  return <section className="sample-projects-section" aria-labelledby="sample-projects-heading">
    <div className="sample-projects-container">
      <div className="sample-projects-intro reveal-item">
        <span className="section-label">Selected project formats</span>
        <h2 id="sample-projects-heading">Websites and <em>AI systems.</em></h2>
        <p>Public links appear only where supplied. Private work is shown through visual evidence and an enquiry action.</p>
      </div>
      <div className="sample-projects-grid">
        {sampleProjects.map((project) => <article key={project.id} className="sample-project-card reveal-item">
          <figure className="sample-project-image">
            <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
            {project.secondaryImage && <img className="sample-project-image--secondary" src={project.secondaryImage} alt={project.secondaryImageAlt} loading="lazy" decoding="async" />}
          </figure>
          <div className="sample-project-content">
            <span className="sample-project-label">{project.label}</span>
            <h3>{project.title}</h3><p>{project.description}</p>
            <ul>{project.details.map((detail) => <li key={detail}>✓ {detail}</li>)}</ul>
            <div className="sample-project-footer">
              <span>{project.status}</span>
              {project.url ? <a className="sample-project-action" href={project.url} target="_blank" rel="noreferrer">{project.action}</a> : <a className="sample-project-action" href={mailto(`Adnan AI — ${project.title}`, `Hi Adnan Ai,\n\nI would like to request more details about ${project.title}.\n\nThanks!`)}>{project.action}</a>}
            </div>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
