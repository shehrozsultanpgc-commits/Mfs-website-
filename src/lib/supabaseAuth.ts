import { supabase } from './supabase';
import type { User, Session } from '@supabase/supabase-js';

export interface AuthResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Initiates One-Click Google OAuth Sign-In via Supabase Auth
 */
export async function signInWithGoogle(customRedirectUrl?: string): Promise<AuthResponse> {
  try {
    const redirectTo = customRedirectUrl || window.location.origin;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      console.warn('[MFS Auth] Supabase Google OAuth notice:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('[MFS Auth] Google Sign-In error:', err);
    return { success: false, error: err?.message || 'Google Sign-In failed.' };
  }
}

/**
 * Initiates One-Click Facebook OAuth Sign-In via Supabase Auth
 */
export async function signInWithFacebook(customRedirectUrl?: string): Promise<AuthResponse> {
  try {
    const redirectTo = customRedirectUrl || window.location.origin;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo,
      },
    });

    if (error) {
      console.warn('[MFS Auth] Supabase Facebook OAuth notice:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('[MFS Auth] Facebook Sign-In error:', err);
    return { success: false, error: err?.message || 'Facebook Sign-In failed.' };
  }
}

/**
 * Signs out current active Supabase user session
 */
export async function signOutUser(): Promise<AuthResponse> {
  try {
    const { error } = await supabase.auth.signOut();
    localStorage.removeItem('mfs_user_auth_profile');
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Sign out failed.' };
  }
}

/**
 * Retrieves current active Supabase session
 */
export async function getAuthSession(): Promise<Session | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (err) {
    console.warn('[MFS Auth] Failed to retrieve session:', err);
    return null;
  }
}

/**
 * Retrieves current authenticated Supabase user
 */
export async function getCurrentUser(): Promise<User | null> {
  const session = await getAuthSession();
  return session?.user ?? null;
}
