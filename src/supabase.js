import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wqzfjnthbdpownllpgki.supabase.co';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxemZqbnRoYmRwb3dubGxwZ2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ1NzUzNjcsImV4cCI6MjExMDE1MTM2N30.Tcqz2Ty4E_18npPCIAmd1SDeFjGLmSRpQbhpiCyLAx0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
