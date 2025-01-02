import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { RecordsCard } from "@/components/RecordsCard";
import { ConnectedAppsCard } from "@/components/ConnectedAppsCard";
import { ProfileCard } from "@/components/ProfileCard";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingRecords, setIsEditingRecords] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    birthDate: "",
    avatar: "",
    records: {
      "1000m": "",
      "1 mile": "",
      "5km": "",
      "10km": "",
      "Semi": "",
      "Marathon": "",
      "50km": "",
      "100km": "",
      "100 miles": ""
    },
    connectedApps: [
      { name: "Strava", connected: false },
      { name: "Garmin Connect", connected: false },
      { name: "Polar", connected: false },
      { name: "Suunto", connected: false },
      { name: "Coros", connected: false }
    ]
  });

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Erreur lors du chargement du profil:', profileError);
      return;
    }

    const { data: records, error: recordsError } = await supabase
      .from('records')
      .select('*')
      .eq('user_id', user.id);

    if (recordsError) {
      console.error('Erreur lors du chargement des records:', recordsError);
      return;
    }

    const recordsMap = records?.reduce((acc, record) => {
      acc[record.distance] = record.time;
      return acc;
    }, {});

    setUserData(prev => ({
      ...prev,
      name: profile?.full_name || user.user_metadata?.full_name || "",
      email: user.email || "",
      birthDate: profile?.birth_date || "",
      avatar: profile?.avatar_url || user.user_metadata?.avatar_url || "",
      records: { ...prev.records, ...recordsMap }
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: userData.name,
        birth_date: userData.birthDate,
        avatar_url: userData.avatar,
        updated_at: new Date().toISOString()
      });

    if (error) {
      toast.error("Erreur lors de la sauvegarde du profil");
      console.error('Erreur de sauvegarde:', error);
      return;
    }

    setIsEditing(false);
    toast.success("Profil mis à jour avec succès !");
  };

  const handleSaveRecords = async (distance: string, newValue: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('records')
      .upsert({
        user_id: user.id,
        distance: distance,
        time: newValue,
        updated_at: new Date().toISOString()
      });

    if (error) {
      toast.error("Erreur lors de la sauvegarde du record");
      console.error('Erreur de sauvegarde du record:', error);
      return;
    }

    setUserData(prev => ({
      ...prev,
      records: {
        ...prev.records,
        [distance]: newValue
      }
    }));

    toast.success(`Record ${distance} mis à jour !`);
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
    <div className="min-h-screen bg-gradient-to-b from-[#FEF7CD] to-[#FFDEE2] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6 text-[#8B5CF6]"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>

        <div className="space-y-6">
          <ProfileCard 
            user={userData}
            isEditing={isEditing}
            onSave={handleSave}
            setIsEditing={setIsEditing}
            setUser={setUserData}
          />

          <RecordsCard
            records={userData.records}
            isEditing={isEditingRecords}
            onSaveRecord={handleSaveRecords}
            onShare={handleShare}
          />

          <ConnectedAppsCard
            connectedApps={userData.connectedApps}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;