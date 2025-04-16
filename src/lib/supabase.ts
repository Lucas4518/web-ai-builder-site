
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://gkipyxwqhjaurjbywszn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdraXB5eHdxaGphdXJqYnl3c3puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNjY5MTksImV4cCI6MjA1OTY0MjkxOX0.HFQJUrJUv9eAF15rl9hPvQzID87rn9kawNGnl45jHpE';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
