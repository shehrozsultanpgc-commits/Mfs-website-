import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const DEFAULT_SUPABASE_URL = 'https://kbpxgkqyivchssfudcdw.supabase.co';
const DEFAULT_ANON_KEY = 'sb_publishable_szE5kp2CstV0OCzt9YQmHQ__t4PWGsY';

function getValidSupabaseUrl(): string {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    let cleaned = envUrl.trim().replace(/^["']|["']$/g, '').trim();
    if (cleaned.length > 0 && !cleaned.includes('placeholder')) {
      if (!/^https?:\/\//i.test(cleaned)) {
        cleaned = `https://${cleaned}`;
      }
      try {
        const parsed = new URL(cleaned);
        if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
          return parsed.origin;
        }
      } catch (err) {
        console.warn('[MFS Supabase] Invalid VITE_SUPABASE_URL format:', envUrl, err);
      }
    }
  }
  return DEFAULT_SUPABASE_URL;
}

function getValidSupabaseAnonKey(): string {
  const envKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (envKey && typeof envKey === 'string' && envKey.trim().length > 0) {
    const cleaned = envKey.trim().replace(/^["']|["']$/g, '').trim();
    if (cleaned.length > 0 && !cleaned.includes('placeholder')) {
      return cleaned;
    }
  }
  return DEFAULT_ANON_KEY;
}

const supabaseUrl = getValidSupabaseUrl();
const supabaseAnonKey = getValidSupabaseAnonKey();

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.info('[MFS Supabase] Using target Supabase endpoint:', supabaseUrl);
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

