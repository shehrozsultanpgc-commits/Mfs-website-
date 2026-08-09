import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';
import type { Database, UserRole } from './database.types';

export type UserProfileRow = Database['public']['Tables']['users_profiles']['Row'];

/**
 * Syncs user profile metadata from Supabase Auth (Google/Facebook or Email) into Database and Local Cache
 */
export async function syncUserProfileFromAuth(user: User): Promise<UserProfileRow> {
  const meta = user.user_metadata || {};
  const provider = user.app_metadata?.provider || meta.provider || 'oauth';

  const fullName =
    meta.full_name ||
    meta.name ||
    meta.custom_name ||
    (user.email ? user.email.split('@')[0].replace(/[._]/g, ' ') : 'MFS Client');

  const avatarUrl = meta.avatar_url || meta.picture || meta.avatar || null;
  const userEmail = user.email || meta.email || 'client@mfsgrowth.com';
  const phone = meta.phone || meta.phone_number || null;

  try {
    // 1. Query existing profile from users_profiles table
    const { data: existingProfile, error } = await supabase
      .from('users_profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (existingProfile && !error) {
      const profileData = existingProfile as UserProfileRow;
      localStorage.setItem('mfs_user_auth_profile', JSON.stringify(profileData));
      return profileData;
    }

    // 2. Construct new profile record for newly authenticated user
    const newProfile: UserProfileRow = {
      id: user.id,
      full_name: fullName,
      email: userEmail,
      phone: phone,
      role: (meta.role as UserRole) || 'client',
      currency_preference: 'PKR',
      metadata: {
        provider,
        avatar_url: avatarUrl,
        last_login: new Date().toISOString(),
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Insert into Supabase table
    const { data: insertedData, error: insertError } = await supabase
      .from('users_profiles')
      .upsert(newProfile as any)
      .select()
      .maybeSingle();

    const activeProfile = (insertedData as UserProfileRow) || newProfile;
    if (insertError) {
      console.warn('[MFS Profile] Database insert notice (using fallback profile):', insertError.message);
    }

    localStorage.setItem('mfs_user_auth_profile', JSON.stringify(activeProfile));
    return activeProfile;
  } catch (err) {
    console.error('[MFS Profile] Sync exception:', err);
    const fallbackProfile: UserProfileRow = {
      id: user.id,
      full_name: fullName,
      email: userEmail,
      phone: phone,
      role: 'client',
      currency_preference: 'PKR',
      metadata: { provider, avatar_url: avatarUrl },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    localStorage.setItem('mfs_user_auth_profile', JSON.stringify(fallbackProfile));
    return fallbackProfile;
  }
}

/**
 * Retrieves the currently saved/cached user profile or queries Supabase for active user
 */
export async function getCurrentUserProfile(): Promise<UserProfileRow | null> {
  // Check local cache first for instant UI response
  const cached = localStorage.getItem('mfs_user_auth_profile');
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (parsed && parsed.email) return parsed as UserProfileRow;
    } catch (e) {
      // Ignore JSON error
    }
  }

  // Query active Supabase session
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      return await syncUserProfileFromAuth(session.user);
    }
  } catch (err) {
    console.warn('[MFS Profile] Could not fetch current user session profile:', err);
  }

  return null;
}
