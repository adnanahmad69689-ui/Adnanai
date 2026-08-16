/** Footer: copyright + tagline, hairline top border. */
import { siteConfig } from "../data/siteConfig";

export function Footer() {
  const { identity } = siteConfig;
  const year = identity.copyrightYear ?? new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-copyright">
          © {year} {identity.firstName} {identity.lastName} — {identity.location}
        </p>
        <p className="footer-tagline">{identity.roles}</p>
      </div>
    </footer>
  );
}
