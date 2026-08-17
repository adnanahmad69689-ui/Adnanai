/**
 * App shell: public portfolio and a private owner-only admin route.
 */
import { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";

const N8nProjects = lazy(() =>
  import("./components/N8nProjects").then((module) => ({ default: module.N8nProjects })),
);
const AdminPortfolio = lazy(() => import("./pages/AdminPortfolio"));

function PublicPortfolio() {
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
          window.setTimeout(() => {
            const element = document.getElementById(id);
            if (element) window.scrollTo({ top: element.offsetTop - 20, behavior: "smooth" });
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
      <a href="#main" className="skip-to-content">Skip to content</a>
      <Navbar />
      {page === "n8n" ? (
        <Suspense fallback={<main className="route-loading">Loading AI system patterns…</main>}>
          <N8nProjects />
        </Suspense>
      ) : <Home />}
    </div>
  );
}

function AppContent() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const returnPath = sessionStorage.getItem("adnan-ai-admin-return-path");
    if (location === "/" && returnPath === "/admin") {
      sessionStorage.removeItem("adnan-ai-admin-return-path");
      setLocation(returnPath);
    }
  }, [location, setLocation]);

  return location === "/admin" ? (
    <Suspense fallback={<main className="route-loading">Loading portfolio controls…</main>}>
      <AdminPortfolio />
    </Suspense>
  ) : <PublicPortfolio />;
}

export default function App() {
  return <ErrorBoundary><AppContent /></ErrorBoundary>;
}
