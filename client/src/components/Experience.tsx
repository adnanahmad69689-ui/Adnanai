/** Experience section: two-column timeline entries with accent left border. */
import { siteConfig } from "../data/siteConfig";
import { experienceEntries } from "../data/experience";

export function Experience() {
  const { experience } = siteConfig;
  return (
    <section id="experience" className="experience-section">
      <div className="experience-container">
        <div className="reveal-item">
          <span className="section-label">{experience.label}</span>
          <h2 className="experience-heading">
            {experience.headingLead} <em>{experience.headingEm}</em>
          </h2>
        </div>
        <div className="experience-grid">
          {experienceEntries.map((entry) => (
            <div key={entry.role} className="experience-entry reveal-item">
              <h3 className="experience-role">{entry.role}</h3>
              <span className="experience-date">{entry.date}</span>
              <p className="experience-company">{entry.company}</p>
              <p className="experience-company-type">{entry.companyType}</p>
              <ul className="experience-bullets">
                {entry.bullets.map((b) => (
                  <li key={b} className="experience-bullet">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
