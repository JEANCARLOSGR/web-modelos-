// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ilhfnrxjppfccxyklser.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsaGZucnhqcHBmY2N4eWtsc2VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNzc2MjksImV4cCI6MjA2Mjg1MzYyOX0.0d0T4pTFFoOAxqW75gZw2Iistku4SdjJnmr7Tgog38w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
