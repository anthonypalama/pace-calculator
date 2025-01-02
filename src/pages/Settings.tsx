import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { RecordsCard } from "@/components/RecordsCard";
import { ConnectedAppsCard } from "@/components/ConnectedAppsCard";
import { ProfileCard } from "@/components/ProfileCard";

const Settings = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingRecords, setIsEditingRecords] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    birthDate: "1990-01-01",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    records: {
      "1000m": "3:30",
      "1 mile": "5:45",
      "5km": "20:15",
      "10km": "42:30",
      "Semi": "1:45:00",
      "Marathon": "3:45:00",
      "50km": "5:30:00",
      "100km": "12:00:00",
      "100 miles": "24:00:00"
    },
    connectedApps: [
      { name: "Strava", connected: true },
      { name: "Garmin Connect", connected: false },
      { name: "Polar", connected: false },
      { name: "Suunto", connected: false },
      { name: "Coros", connected: false }
    ]
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profil mis à jour avec succès !");
  };

  const handleSaveRecords = (distance: string, newValue: string) => {
    setUser(prev => ({
      ...prev,
      records: {
        ...prev.records,
        [distance]: newValue
      }
    }));
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
            user={user}
            isEditing={isEditing}
            onSave={handleSave}
            setIsEditing={setIsEditing}
            setUser={setUser}
          />

          <RecordsCard
            records={user.records}
            isEditing={isEditingRecords}
            onSaveRecord={handleSaveRecords}
            onShare={handleShare}
          />

          <ConnectedAppsCard
            connectedApps={user.connectedApps}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;