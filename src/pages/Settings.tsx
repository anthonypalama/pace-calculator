import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { RecordsCard } from "@/components/RecordsCard";

const Settings = () => {
  const navigate = useNavigate();
  const [isEditingRecords, setIsEditingRecords] = useState(false);
  const [userData, setUserData] = useState({
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF7CD] to-[#FFDEE2] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6 text-[#8B5CF6] hover:bg-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>

        <div className="space-y-6 animate-fade-in">
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