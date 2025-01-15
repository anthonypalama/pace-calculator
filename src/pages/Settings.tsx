import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Settings as SettingsIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { RecordsCard } from "@/components/RecordsCard";
import { ProfileCard } from "@/components/ProfileCard";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { getRecords, upsertRecord } from "@/lib/records";
import { supabase } from "@/lib/supabase";

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditingRecords, setIsEditingRecords] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  const [userData, setUserData] = useState({
    name: "Anthony Palama",
    email: "",
    birthDate: "1991-08-27",
    avatar: "/placeholder.svg",
    records: {
      "1000m": "02:55",
      "1 mile": "",
      "5km": "",
      "10km": "",
      "Semi": "",
      "Marathon": "",
      "50km": "",
      "100km": "",
      "100 miles": ""
    }
  });

  useEffect(() => {
    const loadRecords = async () => {
      try {
        console.log('Chargement des données...');
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('full_name', 'Anthony Palama')
          .maybeSingle();  // Utilisation de maybeSingle() au lieu de single()

        if (profileError) {
          console.error('Erreur lors du chargement du profil:', profileError);
          toast.error("Erreur lors du chargement du profil");
          return;
        }

        if (profileData) {
          console.log('Profil chargé:', profileData);
          const records = await getRecords(profileData.id);
          console.log('Records chargés:', records);
          
          const recordsMap: Record<string, string> = {};
          records.forEach((record: any) => {
            recordsMap[record.distance] = record.time;
          });

          setUserData(prev => ({
            ...prev,
            name: profileData.full_name,
            email: profileData.email || '',
            birthDate: profileData.birth_date || '1991-08-27',
            avatar: profileData.avatar_url || '/placeholder.svg',
            records: {
              ...prev.records,
              ...recordsMap
            }
          }));
        } else {
          console.log('Aucun profil trouvé pour Anthony Palama');
          toast.error("Profil non trouvé");
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        toast.error("Erreur lors du chargement des données");
      }
    };

    loadRecords();
  }, []);

  const handleSaveRecords = async (distance: string, newValue: string) => {
    try {
      console.log('Sauvegarde du record:', { distance, time: newValue });
      const { data: profileData } = await supabase
        .from('profiles')
        .select('id')
        .eq('full_name', 'Anthony Palama')
        .maybeSingle();  // Utilisation de maybeSingle() ici aussi

      if (profileData) {
        await upsertRecord({
          user_id: profileData.id,
          distance,
          time: newValue,
          updated_at: new Date().toISOString(),
        });

        setUserData(prev => ({
          ...prev,
          records: {
            ...prev.records,
            [distance]: newValue
          }
        }));

        toast.success(`Record ${distance} mis à jour !`);
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du record:', error);
      toast.error("Erreur lors de la sauvegarde du record");
    }
  };

  const handleSaveProfile = async () => {
    try {
      console.log('Sauvegarde du profil:', userData);
      const { data: profileData } = await supabase
        .from('profiles')
        .select('id')
        .eq('full_name', 'Anthony Palama')
        .maybeSingle();  // Et ici aussi

      if (profileData) {
        const { error } = await supabase
          .from('profiles')
          .update({
            full_name: userData.name,
            email: userData.email,
            birth_date: userData.birthDate,
            avatar_url: userData.avatar,
            updated_at: new Date().toISOString()
          })
          .eq('id', profileData.id);

        if (error) throw error;
        
        setIsEditingProfile(false);
        toast.success("Profil mis à jour avec succès !");
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du profil:', error);
      toast.error("Erreur lors de la sauvegarde du profil");
    }
  };

  const handleShare = async (distance: string, time: string) => {
    const text = `Je viens de battre mon record personnel sur ${distance} avec un temps de ${time} ! 🏃‍♂️🎉`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Nouveau Record Personnel',
          text: text,
          url: window.location.href
        });
      } catch (error) {
        console.error('Erreur lors du partage:', error);
      }
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Texte copié dans le presse-papier !");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pastel-peach to-pastel-purple p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            className="hover:bg-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 bg-[#D946EF] text-white"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-2xl font-bold text-black flex items-center gap-2">
            <SettingsIcon className="h-6 w-6" />
            Paramètres
          </h1>
        </div>

        <div className="space-y-6 animate-fade-in">
          <ProfileCard
            user={userData}
            isEditing={isEditingProfile}
            onSave={handleSaveProfile}
            setIsEditing={setIsEditingProfile}
            setUser={setUserData}
          />
          
          <Separator className="my-6" />
          
          <RecordsCard
            records={userData.records}
            isEditing={isEditingRecords}
            onSaveRecord={handleSaveRecords}
            onShare={handleShare}
            setIsEditing={setIsEditingRecords}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;