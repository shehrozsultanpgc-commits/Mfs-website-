import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://qmkobasgawahwqoxygkn.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Server-only Supabase Admin Client using SUPABASE_SERVICE_ROLE_KEY.
 * This client bypasses Row Level Security for privileged backend routines.
 * NEVER expose this or import it in client-side code.
 */
export const supabaseAdmin = serviceRoleKey && serviceRoleKey.trim().length > 10
  ? createClient(supabaseUrl, serviceRoleKey.trim(), {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;
