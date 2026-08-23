import { AppProviders } from "../components/AppProviders";
import { useEffect } from "react";
import AdminPortfolio from "./AdminPortfolio";

export default function AdminRoute() {
  useEffect(() => {
    const originalTitle = document.title;
    const robots = document.querySelector('meta[name="robots"]');
    const originalRobots = robots?.getAttribute("content") ?? null;
    document.title = "Private admin | Adnan Ai";
    robots?.setAttribute("content", "noindex,nofollow,noarchive");
    return () => {
      document.title = originalTitle;
      if (originalRobots) robots?.setAttribute("content", originalRobots);
    };
  }, []);

  return <AppProviders><AdminPortfolio /></AppProviders>;
}
