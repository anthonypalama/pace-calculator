import { supabase } from './supabase';
import { Profile } from '@/types/supabase';

export const upsertProfile = async (profile: Partial<Profile>) => {
  try {
    console.log('Mise à jour du profil:', profile);
    const { data, error } = await supabase
      .from('profiles')
      .upsert(profile)
      .select()
      .single();

    if (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      throw error;
    }

    console.log('Profil mis à jour avec succès:', data);
    return data;
  } catch (error) {
    console.error('Erreur lors de l\'upsert du profil:', error);
    throw error;
  }
};

export const getProfile = async (userId: string) => {
  try {
    console.log('Récupération du profil pour l\'utilisateur:', userId);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      throw error;
    }

    console.log('Profil récupéré:', data);
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    throw error;
  }
};