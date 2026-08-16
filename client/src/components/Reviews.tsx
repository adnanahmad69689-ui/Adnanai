/** Service-focus section. It contains no customer reviews, ratings, or unsupported outcome claims. */
import { siteConfig } from "../data/siteConfig";
import { outcomes } from "../data/outcomes";

export function Reviews() {
  const { reviews: cfg } = siteConfig;
  return (
    <section id="reviews" className="reviews-section">
      <div className="reviews-bg-glow" />
      <div className="reviews-container">
        <div className="reveal-item reviews-header-block">
          <span className="section-label">{cfg.label}</span>
          <div className="reviews-heading-wrapper">
            <h2 className="reviews-heading">
              {cfg.headingLead} <em>{cfg.headingEm}</em> {cfg.headingTail}
            </h2>
            <span className="outcomes-summary-chip">ADNAN AI SERVICES</span>
          </div>
          <p className="reviews-subtitle">{cfg.subtitle}</p>
        </div>
        <div className="reviews-grid outcomes-grid">
          {outcomes.map((outcome) => (
            <article key={outcome.title} className="review-card outcome-card reveal-item">
              <div className="outcome-card-top">
                <span className="outcome-tag" style={{ borderColor: `${outcome.accent}55`, color: outcome.accent }}>
                  {outcome.tag}
                </span>
                <span className="outcome-orbit" style={{ backgroundColor: outcome.accent }} />
              </div>
              <div className="outcome-metric" style={{ color: outcome.accent }}>
                {outcome.metric}
              </div>
              <div className="outcome-metric-label">{outcome.metricLabel}</div>
              <h3 className="outcome-title">{outcome.title}</h3>
              <p className="outcome-detail">{outcome.detail}</p>
              <div className="outcome-card-footer">
                <span className="outcome-footer-mark">◇</span>
                <span>Adnan AI service focus</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
