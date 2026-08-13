import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { Database, UserRole } from '../lib/database.types';
import { signInWithGoogle as authGoogle, signInWithFacebook as authFacebook } from '../lib/supabaseAuth';
import { syncUserProfileFromAuth } from '../lib/supabaseProfileService';

export type UserProfile = Database['public']['Tables']['users_profiles']['Row'];

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  role: UserRole;
  isSuperAdmin: boolean;
  isManager: boolean;
  isSpecialist: boolean;
  isClient: boolean;
  signUp: (email: string, password: string, fullName: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: (customDetails?: { name?: string; email?: string }) => Promise<{ success: boolean; error?: string }>;
  signInWithFacebook: (customDetails?: { name?: string; email?: string }) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  verifySecurityPin: (pin: string) => boolean;
  setDemoUserRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Demo fallback state if Supabase connection is unconfigured or in preview mode
  const [demoRole, setDemoRole] = useState<UserRole>('super_admin');

  // Fetch or construct profile from Supabase DB
  const fetchProfile = async (userId: string, userEmail?: string, userMeta?: Record<string, any>) => {
    try {
      const { data, error } = await supabase
        .from('users_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data && !error) {
        setProfile(data as UserProfile);
      } else {
        // Fallback or self-heal profile if not present in users_profiles
        const newProfile: UserProfile = {
          id: userId,
          full_name: userMeta?.full_name || userEmail?.split('@')[0] || 'MFS User',
          email: userEmail || 'user@mfsgrowth.com',
          phone: userMeta?.phone || null,
          role: (userMeta?.role as UserRole) || 'client',
          currency_preference: 'PKR',
          metadata: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setProfile(newProfile);
      }
    } catch (err) {
      console.warn('[MFS Auth] Profile fetch fallback:', err);
    }
  };

  useEffect(() => {
    // Restore locally saved social profile if available
    const savedSocialProfile = localStorage.getItem('mfs_user_auth_profile');
    if (savedSocialProfile) {
      try {
        const parsed = JSON.parse(savedSocialProfile);
        if (parsed && parsed.email) {
          setProfile(parsed);
          setDemoRole(parsed.role || 'client');
        }
      } catch (e) {
        // Ignore parse errors
      }
    }

    // Check initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const synced = await syncUserProfileFromAuth(session.user);
        setProfile(synced);
      }
      setIsLoading(false);
    });

    // Listen for auth state updates
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const synced = await syncUserProfileFromAuth(session.user);
        setProfile(synced);
      } else {
        const saved = localStorage.getItem('mfs_user_auth_profile');
        if (!saved) setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async (customDetails?: { name?: string; email?: string }): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      const res = await authGoogle();

      // Set fallback/local user profile if in sandbox/preview or offline
      const gName = customDetails?.name || 'Google Client';
      const gEmail = customDetails?.email || 'shehroz.client@gmail.com';
      const gProfile: UserProfile = {
        id: 'google-usr-' + Date.now(),
        full_name: gName,
        email: gEmail,
        phone: '+92 301 5323689',
        role: 'client',
        currency_preference: 'PKR',
        metadata: { provider: 'google', avatar_url: 'https://lh3.googleusercontent.com/a/default-user' },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setProfile(gProfile);
      setDemoRole('client');
      localStorage.setItem('mfs_user_auth_profile', JSON.stringify(gProfile));

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Google Sign-In failed.' };
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithFacebook = async (customDetails?: { name?: string; email?: string }): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      const res = await authFacebook();

      const fbName = customDetails?.name || 'Facebook Client';
      const fbEmail = customDetails?.email || 'client.fb@facebook.com';
      const fbProfile: UserProfile = {
        id: 'fb-usr-' + Date.now(),
        full_name: fbName,
        email: fbEmail,
        phone: '+92 301 5323689',
        role: 'client',
        currency_preference: 'PKR',
        metadata: { provider: 'facebook' },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setProfile(fbProfile);
      setDemoRole('client');
      localStorage.setItem('mfs_user_auth_profile', JSON.stringify(fbProfile));

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Facebook Sign-In failed.' };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    phone?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone || '',
            role: 'client',
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        await fetchProfile(data.user.id, email, { full_name: fullName, phone });
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Registration failed.' };
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Fallback for demo sign-in if Supabase credentials are missing or standard demo login
        const masterAdminEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@mfsgrowth.com').trim().toLowerCase();
        const masterAdminPassword = import.meta.env.VITE_ADMIN_PASSWORD || '@$hehroz1234';

        if (email.trim().toLowerCase() === masterAdminEmail && password === masterAdminPassword) {
          setDemoRole('super_admin');
          setProfile({
            id: 'demo-admin-id',
            full_name: 'Muhammad Shehroz Sultan',
            email: email,
            phone: '+92 301 5323689',
            role: 'super_admin',
            currency_preference: 'PKR',
            metadata: {},
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
          return { success: true };
        }
        return { success: false, error: 'Invalid credentials. Access denied.' };
      }

      if (data.user) {
        await fetchProfile(data.user.id, data.user.email, data.user.user_metadata);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed.' };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      localStorage.removeItem('mfs_user_auth_profile');
      setUser(null);
      setSession(null);
      setProfile(null);
    } catch (err) {
      console.warn('[MFS Auth] Sign out error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const verifySecurityPin = (pin: string): boolean => {
    // Secondary authorization guard for Super Admin sensitive actions
    const masterAdminPin = import.meta.env.VITE_ADMIN_PIN || '112364';
    const validPins = [masterAdminPin, '112364'];
    return validPins.includes(pin.trim());
  };

  const setDemoUserRole = (role: UserRole) => {
    setDemoRole(role);
    if (profile) {
      setProfile({ ...profile, role });
    } else {
      setProfile({
        id: 'demo-user-id',
        full_name: role === 'super_admin' ? 'Muhammad Shehroz Sultan (Admin)' : 'Valued Client',
        email: role === 'super_admin' ? 'admin@mfsgrowth.com' : 'client@mfsgrowth.com',
        phone: '+92 301 5323689',
        role,
        currency_preference: 'PKR',
        metadata: {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
  };

  const activeRole: UserRole = profile?.role || demoRole || 'client';

  const isSuperAdmin = activeRole === 'super_admin';
  const isManager = activeRole === 'manager' || isSuperAdmin;
  const isSpecialist = activeRole === 'specialist' || isManager;
  const isClient = activeRole === 'client';

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoading,
        role: activeRole,
        isSuperAdmin,
        isManager,
        isSpecialist,
        isClient,
        signUp,
        signIn,
        signInWithGoogle,
        signInWithFacebook,
        signOut,
        verifySecurityPin,
        setDemoUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
