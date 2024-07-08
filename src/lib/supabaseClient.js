import { createClient } from "@supabase/supabase-js";

// Supabase Database Endpoint
const supabaseURL = import.meta.env.VITE_APP_DB_ENDPOINT;

// Supabase Key (Authentication to access database)
const supabaseKey = import.meta.env.VITE_APP_DB_ANON_KEY;

// Creates Supabase Client Interface for DB interaction
// Exports as object for usage in other files

export const supabase = createClient(supabaseURL, supabaseKey);