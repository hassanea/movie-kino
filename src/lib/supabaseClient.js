import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_APP_DB_ENDPOINT;
const supabaseKey = import.meta.env.VITE_APP_DB_ANON_KEY;

export const supabase = createClient(supabaseURL, supabaseKey);
