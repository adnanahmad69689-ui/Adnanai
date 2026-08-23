/**
 * Home page: prioritizes the hero, then automatically loads non-critical
 * portfolio sections shortly after the first paint.
 */
import { lazy, Suspense, useEffect, useState } from "react";
import { Hero } from "../components/Hero";

const PortfolioSections = lazy(() => import("../components/PortfolioSections"));

export default function Home() {
  const [shouldLoadSections, setShouldLoadSections] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setShouldLoadSections(true), 180);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      <Hero />
      <main id="main">
        <div>
          {shouldLoadSections ? (
            <Suspense fallback={<div className="route-loading" aria-live="polite">Loading portfolio…</div>}>
              <PortfolioSections />
            </Suspense>
          ) : null}
        </div>
      </main>
    </div>
  );
}
