/** Footer: concise tagline with a hairline top border. */
import { siteConfig } from "../data/siteConfig";

export function Footer() {
  const { identity } = siteConfig;
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-tagline">{identity.roles}</p>
      </div>
    </footer>
  );
}
