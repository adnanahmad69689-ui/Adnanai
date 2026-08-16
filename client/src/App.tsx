/**
 * App shell: dark theme, custom cursor, skip link, navbar, and hash routing
 * between the home page and the #n8n-projects gallery page (mirrors the
 * reference site's hashchange-based routing).
 */
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { N8nProjects } from "./components/N8nProjects";
import Home from "./pages/Home";

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
      {page === "n8n" ? <N8nProjects /> : <Home />}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <AppContent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

