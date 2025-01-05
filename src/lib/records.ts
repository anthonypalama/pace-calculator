import { supabase } from './supabase';
import { Record } from '@/types/supabase';

export const upsertRecord = async (record: Omit<Record, 'id'>) => {
  try {
    console.log('Mise à jour du record:', record);
    const { data, error } = await supabase
      .from('records')
      .upsert({
        user_id: record.user_id,
        distance: record.distance,
        time: record.time,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Erreur lors de la mise à jour du record:', error);
      throw error;
    }

    console.log('Record mis à jour avec succès:', data);
    return data;
  } catch (error) {
    console.error('Erreur lors de l\'upsert du record:', error);
    throw error;
  }
};

export const getRecords = async (userId: string) => {
  try {
    console.log('Récupération des records pour l\'utilisateur:', userId);
    const { data, error } = await supabase
      .from('records')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Erreur lors de la récupération des records:', error);
      throw error;
    }

    console.log('Records récupérés:', data);
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des records:', error);
    throw error;
  }
};