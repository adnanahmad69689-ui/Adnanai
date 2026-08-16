/** Skills section: 3-col grid of glass category cards with tag pills. */
import { siteConfig } from "../data/siteConfig";
import { skillCategories } from "../data/skills";

export function Skills() {
  const { skills } = siteConfig;
  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <div className="reveal-item">
          <span className="section-label">{skills.label}</span>
          <h2 className="skills-heading" style={{ fontSize: "var(--text-h1)" }}>
            {skills.headingLead} <em>{skills.headingEm}</em>
          </h2>
        </div>
        <div className="skills-grid">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="skill-category reveal-item">
              <h3 className="skill-category-title">{cat.title}</h3>
              <div className="skill-tags">
                {cat.tags.map((tag) => (
                  <span key={tag} className="skill-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

