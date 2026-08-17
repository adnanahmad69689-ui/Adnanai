/** Sample-only portfolio formats. These cards are explicitly not client projects or outcome claims. */
import { sampleProjects, type SampleProjectFormat } from "../data/sampleProjects";

function Preview({ format }: { format: SampleProjectFormat }) {
  if (format === "private-site") {
    return <div className="sample-preview sample-preview--private" aria-label="Sample private website preview">
      <div className="sample-browser-bar"><i /><i /><i /><span>private-demo.preview</span></div>
      <div className="sample-site-nav"><b>BRAND</b><span>WORK</span><span>ABOUT</span><em>CONTACT</em></div>
      <div className="sample-site-hero"><small>PRIVATE WEBSITE</small><strong>Designed to make the offer clear.</strong><span /></div>
      <div className="sample-site-columns"><i /><i /><i /></div>
    </div>;
  }
  if (format === "live-3d") {
    return <div className="sample-preview sample-preview--3d" aria-label="Sample public 3D website preview">
      <div className="sample-3d-grid" /><div className="sample-orb sample-orb--one" /><div className="sample-orb sample-orb--two" />
      <div className="sample-3d-copy"><small>LIVE 3D WEBSITE</small><strong>Move through the scene.</strong><span>Interactive experience preview</span></div>
    </div>;
  }
  return <div className="sample-preview sample-preview--agent" aria-label="Sample AI workflow preview">
    <div className="sample-flow-line" /><div className="sample-agent-node"><small>TRIGGER</small><strong>New enquiry</strong></div>
    <div className="sample-agent-node sample-agent-node--active"><small>PROCESS</small><strong>AI routing</strong></div>
    <div className="sample-agent-node"><small>OUTPUT</small><strong>Next action</strong></div>
  </div>;
}

export function SampleProjectCollection() {
  return <section className="sample-projects-section" aria-labelledby="sample-projects-heading">
    <div className="sample-projects-container">
      <div className="sample-projects-intro reveal-item">
        <span className="section-label">Portfolio format preview</span>
        <h2 id="sample-projects-heading">Choose the right <em>project format.</em></h2>
        <p>These are sample layouts only. Replace their visuals, copy, and actions with your verified website or system details when you are ready.</p>
      </div>
      <div className="sample-projects-grid">
        {sampleProjects.map((project) => <article key={project.id} className="sample-project-card reveal-item">
          <Preview format={project.format} />
          <div className="sample-project-content">
            <span className="sample-project-label">{project.label}</span>
            <h3>{project.title}</h3><p>{project.description}</p>
            <ul>{project.details.map((detail) => <li key={detail}>✓ {detail}</li>)}</ul>
            <div className="sample-project-footer"><span>{project.status}</span><span className="sample-project-action">{project.action} →</span></div>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
