import { supabase } from "@/lib/supabase";
import { useCallback, useEffect, useMemo, useState } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath } = options ?? {};
  const [user, setUser] = useState<{ id: string; email: string | null; name: string | null; role: "user" | "admin" } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [needsPasswordSetup, setNeedsPasswordSetup] = useState(false);

  const refresh = useCallback(async () => {
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
    if (authError || !authUser) {
      setUser(null);
      setError(authError ? new Error(authError.message) : null);
      setLoading(false);
      return;
    }
    const { data: profile, error: profileError } = await supabase.from("profiles").select("full_name, role").eq("id", authUser.id).maybeSingle();
    if (profileError) {
      setError(new Error(profileError.message));
      setUser(null);
    } else {
      setError(null);
      setUser({ id: authUser.id, email: authUser.email ?? null, name: profile?.full_name ?? authUser.user_metadata?.full_name ?? null, role: profile?.role === "admin" ? "admin" : "user" });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setNeedsPasswordSetup(true);
      void refresh();
    });
    return () => subscription.unsubscribe();
  }, [refresh]);

  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    setUser(null);
  }, []);

  const signInWithPassword = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
  }, []);

  const requestPasswordSetup = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/admin` });
    if (error) throw new Error(error.message);
  }, []);

  const completePasswordSetup = useCallback(async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw new Error(error.message);
    setNeedsPasswordSetup(false);
    await refresh();
  }, [refresh]);

  const state = useMemo(() => {
    return {
      user,
      loading,
      error,
      isAuthenticated: Boolean(user),
      needsPasswordSetup,
    };
  }, [error, loading, needsPasswordSetup, user]);

  useEffect(() => {
    if (!redirectOnUnauthenticated) return;
    if (loading) return;
    if (state.user) return;
    if (typeof window === "undefined") return;
    if (redirectPath && window.location.pathname === redirectPath) return;
    window.location.href = redirectPath ?? "/admin";
  }, [loading, redirectOnUnauthenticated, redirectPath, state.user]);

  return {
    ...state,
    refresh,
    logout,
    signInWithPassword,
    requestPasswordSetup,
    completePasswordSetup,
  };
}
