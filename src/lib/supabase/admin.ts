import { createClient } from "@supabase/supabase-js";

/**
 * Service-role admin client — bypasses RLS.
 * Only use in server-side API routes (never import in client components).
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
