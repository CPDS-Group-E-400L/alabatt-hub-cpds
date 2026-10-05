import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://eauqfogmgpqybwvxzxoy.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhdXFmb2dtZ3BxeWJ3dnh6eG95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyMzI4NjUsImV4cCI6MjEwNjgwODg2NX0.ctyrcOeXeVVR3IkOMUNBCgNRuBCKKHuDaAFcx8kBGY0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});
