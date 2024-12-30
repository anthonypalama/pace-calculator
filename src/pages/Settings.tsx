import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Share2 } from "lucide-react";

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
    const oldValue = user.records[distance as keyof typeof user.records];
    if (oldValue && isNewRecord(oldValue, newValue)) {
      setUser(prev => ({
        ...prev,
        records: {
          ...prev.records,
          [distance]: newValue
        }
      }));
      
      toast.success("🎉 Nouveau record personnel !", {
        description: `Félicitations ! Vous avez battu votre record sur ${distance}`,
        action: {
          label: "Partager",
          onClick: () => handleShare(distance, newValue)
        },
        className: "animate-bounce"
      });
    } else {
      setUser(prev => ({
        ...prev,
        records: {
          ...prev.records,
          [distance]: newValue
        }
      }));
    }
  };

  const isNewRecord = (oldTime: string, newTime: string): boolean => {
    const oldSeconds = timeToSeconds(oldTime);
    const newSeconds = timeToSeconds(newTime);
    return newSeconds < oldSeconds;
  };

  const timeToSeconds = (time: string): number => {
    const parts = time.split(':').map(Number);
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return parts[0] * 60 + parts[1];
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
      // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
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
          {/* Profil */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setUser(prev => ({
                            ...prev,
                            avatar: reader.result as string
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                )}
              </div>
              <div className="flex-1 space-y-2 text-center sm:text-left">
                {isEditing ? (
                  <>
                    <Input
                      value={user.name}
                      onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                      className="text-xl font-bold"
                    />
                    <Input
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                    />
                    <Input
                      type="date"
                      value={user.birthDate}
                      onChange={(e) => setUser(prev => ({ ...prev, birthDate: e.target.value }))}
                    />
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-[#8B5CF6]">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-gray-600">Né(e) le : {new Date(user.birthDate).toLocaleDateString()}</p>
                  </>
                )}
              </div>
              <Button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
              >
                {isEditing ? "Sauvegarder" : "Modifier le profil"}
              </Button>
            </div>
          </Card>

          {/* Records Personnels */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#8B5CF6]">Records Personnels</h3>
              <Button
                onClick={() => setIsEditingRecords(!isEditingRecords)}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
              >
                {isEditingRecords ? "Terminer" : "Modifier les records"}
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.entries(user.records).map(([distance, time]) => (
                <div key={distance} className="p-3 bg-[#D3E4FD] rounded-lg">
                  <div className="text-sm text-gray-600">{distance}</div>
                  {isEditingRecords ? (
                    <Input
                      value={time}
                      onChange={(e) => handleSaveRecords(distance, e.target.value)}
                      className="mt-1"
                      placeholder="mm:ss"
                    />
                  ) : (
                    <div className="font-semibold text-[#8B5CF6] flex items-center justify-between">
                      {time}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleShare(distance, time)}
                        className="ml-2"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Applications Connectées */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4 text-[#8B5CF6]">Applications Connectées</h3>
            <div className="space-y-4">
              {user.connectedApps.map((app) => (
                <div key={app.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="font-medium text-gray-700">{app.name}</div>
                    <Badge variant={app.connected ? "default" : "secondary"}>
                      {app.connected ? "Connecté" : "Non connecté"}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    {app.connected ? "Déconnecter" : "Connecter"}
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;