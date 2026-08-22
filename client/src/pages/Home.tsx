/**
 * Home page: prioritizes the hero, then loads the non-critical portfolio
 * sections once the visitor begins leaving the first viewport.
 */
import { lazy, Suspense, useRef } from "react";
import { Hero } from "../components/Hero";
import { useNearViewport } from "../hooks/useNearViewport";

const PortfolioSections = lazy(() => import("../components/PortfolioSections"));

export default function Home() {
  const deferredContentRef = useRef<HTMLDivElement>(null);
  const shouldLoadSections = useNearViewport(deferredContentRef);

  return (
    <div>
      <Hero />
      <main id="main">
        <div ref={deferredContentRef}>
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
