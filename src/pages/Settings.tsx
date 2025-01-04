import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Settings as SettingsIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { RecordsCard } from "@/components/RecordsCard";
import { ProfileCard } from "@/components/ProfileCard";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  const navigate = useNavigate();
  const [isEditingRecords, setIsEditingRecords] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com",
    birthDate: "1990-01-01",
    avatar: "/placeholder.svg",
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
    }
  });

  const handleSaveRecords = async (distance: string, newValue: string) => {
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

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    toast.success("Profil mis à jour avec succès !");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pastel-peach to-pastel-purple p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            className="text-black hover:bg-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
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
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;