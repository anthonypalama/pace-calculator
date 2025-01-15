import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings as SettingsIcon, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { RecordsCard } from "@/components/RecordsCard";
import { ProfileCard } from "@/components/ProfileCard";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

const Settings = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isEditingRecords, setIsEditingRecords] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  const [userData, setUserData] = useState({
    name: user?.user_metadata?.full_name || "Utilisateur",
    email: user?.email || "",
    birthDate: "1991-08-27",
    avatar: user?.user_metadata?.avatar_url || "/placeholder.svg",
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

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Déconnexion réussie");
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      toast.error("Erreur lors de la déconnexion");
    }
  };

  const handleSaveProfile = async () => {
    try {
      if (!user) {
        toast.error("Vous devez être connecté pour modifier votre profil");
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: userData.name,
          email: userData.email,
          birth_date: userData.birthDate,
          avatar_url: userData.avatar,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      
      setIsEditingProfile(false);
      toast.success("Profil mis à jour avec succès !");
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du profil:', error);
      toast.error("Erreur lors de la sauvegarde du profil");
    }
  };

  const handleSaveRecords = async (distance: string, time: string) => {
    try {
      if (!user) {
        toast.error("Vous devez être connecté pour modifier vos records");
        return;
      }

      setUserData(prev => ({
        ...prev,
        records: {
          ...prev.records,
          [distance]: time
        }
      }));

      toast.success(`Record ${distance} mis à jour !`);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du record:', error);
      toast.error("Erreur lors de la sauvegarde du record");
    }
  };

  const handleShare = async (distance: string, time: string) => {
    const text = `Je viens de battre mon record personnel sur ${distance} avec un temps de ${time} ! 🏃‍♂️🎉`;
    
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Texte copié dans le presse-papier !");
    } catch (error) {
      console.error('Erreur lors de la copie dans le presse-papier:', error);
      toast.error("Erreur lors du partage");
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
          <Button
            variant="ghost"
            className="hover:bg-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 bg-red-500 text-white"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
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