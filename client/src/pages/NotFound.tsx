import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    const title = document.title;
    const robots = document.querySelector('meta[name="robots"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const robotsContent = robots?.getAttribute("content") ?? null;
    const canonicalHref = canonical?.getAttribute("href") ?? null;

    document.title = "Page not found | Adnan Ai";
    robots?.setAttribute("content", "noindex,nofollow,noarchive");
    canonical?.removeAttribute("href");

    return () => {
      document.title = title;
      if (robotsContent) robots?.setAttribute("content", robotsContent);
      if (canonicalHref) canonical?.setAttribute("href", canonicalHref);
    };
  }, []);

  return (
    <main className="not-found-page" aria-labelledby="not-found-title">
      <div className="not-found-panel">
        <p className="not-found-label">404</p>
        <h1 id="not-found-title">This page is not here.</h1>
        <p>The link may be old, or the page may have moved.</p>
        <a className="not-found-action" href="/">Back to Adnan Ai</a>
      </div>
    </main>
  );
}
