/**
 * App shell: public portfolio and a private owner-only admin route.
 */
import { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const N8nRoute = lazy(() => import("./pages/N8nRoute"));
const AdminRoute = lazy(() => import("./pages/AdminRoute"));
const PasswordRecoveryRoute = lazy(() => import("./pages/PasswordRecoveryRoute"));

function PublicPortfolio() {
  const [page, setPage] = useState<"home" | "n8n">("home");

  useEffect(() => {
    const delayedScrolls = new Set<number>();
    const onHash = () => {
      const hash = window.location.hash;
      if (hash === "#n8n-projects") {
        setPage("n8n");
        window.scrollTo(0, 0);
      } else {
        setPage("home");
        if (hash && hash !== "#") {
          const id = hash.replace("#", "");
          let attempts = 0;
          const scrollToHash = () => {
            const element = document.getElementById(id);
            if (element) {
              element.scrollIntoView({ behavior: attempts === 0 ? "smooth" : "auto", block: "start" });
            }
            if (attempts < 6) {
              attempts += 1;
              const timeout = window.setTimeout(scrollToHash, 180);
              delayedScrolls.add(timeout);
            }
          };
          const timeout = window.setTimeout(scrollToHash, 60);
          delayedScrolls.add(timeout);
        }
      }
    };
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => {
      window.removeEventListener("hashchange", onHash);
      delayedScrolls.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, []);

  return (
    <div className="App">
      <CustomCursor />
      <a href="#main" className="skip-to-content">Skip to content</a>
      <Navbar />
      {page === "n8n" ? (
        <Suspense fallback={<main className="route-loading">Loading AI system patterns…</main>}>
          <N8nRoute />
        </Suspense>
      ) : <Home />}
    </div>
  );
}

function AppContent() {
  const [location] = useLocation();

  return location === "/admin" ? (
      <Suspense fallback={<main className="route-loading">Loading portfolio controls…</main>}>
      <AdminRoute />
    </Suspense>
  ) : location === "/reset-password" ? (
    <Suspense fallback={<main className="route-loading">Loading password setup…</main>}>
      <PasswordRecoveryRoute />
    </Suspense>
  ) : location === "/" ? <PublicPortfolio /> : <NotFound />;
}

export default function App() {
  return <ErrorBoundary><AppContent /></ErrorBoundary>;
}
