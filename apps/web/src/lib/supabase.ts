import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://plltvinvmifjxotzalis.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_-oQD3lFkWu9s76ZcQfC0xg_AO7MVzdK";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
