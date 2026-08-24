import { useEffect } from "react";
import { AdminPasswordSetup } from "@/components/AdminSignIn";
import { AppProviders } from "@/components/AppProviders";
import { useAuth } from "@/_core/hooks/useAuth";

function PasswordRecoveryContent() {
  const { loading, user } = useAuth();

  useEffect(() => {
    const originalTitle = document.title;
    const robots = document.querySelector('meta[name="robots"]');
    const originalRobots = robots?.getAttribute("content") ?? null;
    document.title = "Set admin password | Adnan Ai";
    robots?.setAttribute("content", "noindex,nofollow,noarchive");
    return () => {
      document.title = originalTitle;
      if (originalRobots) robots?.setAttribute("content", originalRobots);
    };
  }, []);

  if (loading) return <main className="route-loading">Confirming your secure recovery link…</main>;

  if (!user) {
    return <main className="route-loading">Open the newest password recovery link from your email to continue.</main>;
  }

  return <AdminPasswordSetup />;
}

export default function PasswordRecoveryRoute() {
  return <AppProviders><PasswordRecoveryContent /></AppProviders>;
}
