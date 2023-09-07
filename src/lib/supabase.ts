import { config } from "@/config/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = config.supabaseUrl;
const supabaseKey = config.supabaseKey;
export const supabase = createClient(supabaseUrl, supabaseKey, {
  db: { schema: "public" },
  auth: { persistSession: false },
});
