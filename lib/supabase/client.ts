import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

/**
 * Supabase client for browser (Client Components)
 * Use this in client components and browser-side code
 * 
 * @example
 * import { supabase } from '@/lib/supabase/client';
 * const { data } = await supabase.from('professors').select('*');
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
