
import { createClient } from '@supabase/supabase-js';

// Configuration based on your Supabase Project details
const SUPABASE_URL = 'https://sybezgliqtwkcsmsfhlg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_D5wDGZ6CevFPrCmskT2twg_99F2Vrey';

// Check if the keys are provided
const isConfigured = !!(SUPABASE_URL && SUPABASE_ANON_KEY && !SUPABASE_URL.includes('your-project'));

export const supabase = createClient(
  isConfigured ? SUPABASE_URL : 'https://placeholder.supabase.co', 
  isConfigured ? SUPABASE_ANON_KEY : 'placeholder'
);

export const isSupabaseConfigured = isConfigured;
