import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleRecordChange = (distance: string, value: string) => {
    setUser(prev => ({
      ...prev,
      records: {
        ...prev.records,
        [distance]: value
      }
    }));
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
                    onChange={handleImageChange}
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
                {isEditing ? "Sauvegarder" : "Modifier"}
              </Button>
            </div>
          </Card>

          {/* Records Personnels */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4 text-[#8B5CF6]">Records Personnels</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.entries(user.records).map(([distance, time]) => (
                <div key={distance} className="p-3 bg-[#D3E4FD] rounded-lg">
                  <div className="text-sm text-gray-600">{distance}</div>
                  {isEditing ? (
                    <Input
                      value={time}
                      onChange={(e) => handleRecordChange(distance, e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <div className="font-semibold text-[#8B5CF6]">{time}</div>
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