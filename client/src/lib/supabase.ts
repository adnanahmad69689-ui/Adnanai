import { createClient } from "@supabase/supabase-js";

// These are intentionally public browser values. Cloudflare Pages receives the
// same settings as build variables; the fallbacks keep the independently
// deployed static app operational if a build environment omits one value.
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://xlskgkechyngzsrttxap.supabase.co";
export const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_ZzHcn69D7BtLSPqhGjJxrw_iLriozqx";

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error("Supabase browser configuration is missing.");
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
