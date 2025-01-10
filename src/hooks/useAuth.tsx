import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User, AuthError } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { Profile } from '@/types/supabase';
import { upsertProfile, getProfile } from '@/lib/db';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (userId: string) => {
    try {
      console.log('Loading profile for user:', userId);
      const profileData = await getProfile(userId);
      console.log('Profile data loaded:', profileData);
      setProfile(profileData);
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Error loading profile');
    }
  };

  useEffect(() => {
    console.log('Setting up auth state listener');
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('Auth state changed:', _event, session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        try {
          console.log('Creating/updating profile for user:', currentUser.id);
          await upsertProfile({
            id: currentUser.id,
            full_name: currentUser.user_metadata.full_name,
            avatar_url: currentUser.user_metadata.avatar_url,
            updated_at: new Date().toISOString(),
          });
          
          await loadProfile(currentUser.id);
          toast.success('Login successful!');
        } catch (error) {
          console.error('Error updating profile:', error);
          toast.error('Error updating profile');
        }
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      console.log('Initiating Google sign in');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/settings`
        }
      });
      if (error) {
        console.error('Google sign in error:', error);
        toast.error(getErrorMessage(error));
      }
    } catch (error) {
      console.error('Unexpected error during Google sign in:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        toast.error(getErrorMessage(error));
      } else {
        setProfile(null);
        toast.success('Successfully signed out');
      }
    } catch (error) {
      console.error('Unexpected error during sign out:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const getErrorMessage = (error: AuthError) => {
    console.log('Processing error:', error);
    switch (error.message) {
      case 'Invalid login credentials':
        return 'Invalid email or password';
      case 'Email not confirmed':
        return 'Please verify your email before signing in';
      case 'Email provider disabled':
        return 'Email/password login is not enabled';
      default:
        return error.message;
    }
  };

  return { user, profile, loading, signInWithGoogle, signOut };
};