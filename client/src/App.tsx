/**
 * App shell: dark theme, custom cursor, skip link, navbar, and hash routing
 * between the home page and the #n8n-projects gallery page (mirrors the
 * reference site's hashchange-based routing).
 */
import { lazy, Suspense, useEffect, useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";

const N8nProjects = lazy(() =>
  import("./components/N8nProjects").then((module) => ({ default: module.N8nProjects }))
);

function AppContent() {
  const [page, setPage] = useState<"home" | "n8n">("home");

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash;
      if (hash === "#n8n-projects") {
        setPage("n8n");
        window.scrollTo(0, 0);
      } else {
        setPage("home");
        if (hash && hash !== "#") {
          const id = hash.replace("#", "");
          setTimeout(() => {
            const el = document.getElementById(id);
            if (el) {
              const top = el.offsetTop - 20;
              window.scrollTo({ top, behavior: "smooth" });
            }
          }, 100);
        }
      }
    };
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="App">
      <CustomCursor />
      <a href="#main" className="skip-to-content">
        Skip to content
      </a>
      <Navbar />
      {page === "n8n" ? (
        <Suspense fallback={<main className="route-loading">Loading AI system patterns…</main>}>
          <N8nProjects />
        </Suspense>
      ) : <Home />}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
