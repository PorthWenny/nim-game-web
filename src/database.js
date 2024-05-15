import { createClient } from '@supabase/supabase-js'

// github auth, replace after test
const supabaseUrl = "https://ywxfclrqooyhsazbnmac.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3eGZjbHJxb295aHNhemJubWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3NTIzMzYsImV4cCI6MjAzMTMyODMzNn0.JoIrCYNWn6MgOx_IzbkFww9kh2kB3vEhybS0ps-Facg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);