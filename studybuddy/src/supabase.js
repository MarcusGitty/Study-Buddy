//This file is to link to the supabase bankend
import { createClient } from "@supabase/supabase-js";

//This format is our website & our API key for supabase

export const supabase = createClient(
  "https://mqkovrebsoxdkzxirnlk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xa292cmVic294ZGt6eGlybmxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ5MzEwNjQsImV4cCI6MjAwMDUwNzA2NH0.ciS9kpQgjy7fdrx2UnOia5oNG_XGySAUxKfKdu2wclk"
);
