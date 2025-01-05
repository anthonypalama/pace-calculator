import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { Profile } from '@/types/supabase';
import { upsertProfile, getProfile } from '@/lib/db';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (userId: string) => {
    try {
      const profileData = await getProfile(userId);
      setProfile(profileData);
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
      toast.error('Erreur lors du chargement du profil');
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        try {
          // Créer/mettre à jour le profil lors de la connexion
          await upsertProfile({
            id: currentUser.id,
            full_name: currentUser.user_metadata.full_name,
            avatar_url: currentUser.user_metadata.avatar_url,
            updated_at: new Date().toISOString(),
          });
          
          await loadProfile(currentUser.id);
          toast.success('Connexion réussie !');
        } catch (error) {
          console.error('Erreur lors de la mise à jour du profil:', error);
          toast.error('Erreur lors de la mise à jour du profil');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/settings`
      }
    });
    if (error) {
      console.error('Erreur de connexion Google:', error.message);
      toast.error('Erreur lors de la connexion avec Google');
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Erreur de déconnexion:', error.message);
      toast.error('Erreur lors de la déconnexion');
    } else {
      setProfile(null);
      toast.success('Déconnexion réussie');
    }
  };

  return { user, profile, loading, signInWithGoogle, signOut };
};