
import { createClient } from '@supabase/supabase-js';

/**
 * We check for both standard and Next.js public environment variable prefixes.
 * In many environments, browser-accessible variables must be prefixed with NEXT_PUBLIC_
 */
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// If keys are missing, we log a warning instead of letting the app crash immediately 
// via the createClient constructor. This allows the UI to potentially show a 
// "Missing Configuration" state instead of a white screen.
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase configuration is missing. Please ensure SUPABASE_URL and SUPABASE_ANON_KEY ' +
    'are set in your environment variables.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);
