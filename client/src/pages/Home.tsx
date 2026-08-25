/**
 * Home page: prioritizes the hero, then automatically loads non-critical
 * portfolio sections shortly after the first paint.
 */
import { lazy, Suspense } from "react";
import { Hero } from "../components/Hero";

const PortfolioSections = lazy(() => import("../components/PortfolioSections"));

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Suspense fallback={<div className="route-loading" aria-live="polite">Loading portfolio…</div>}>
        <PortfolioSections />
      </Suspense>
    </main>
  );
}
