import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Settings = () => {
  const navigate = useNavigate();
  // Simulation d'un utilisateur connecté
  const user = {
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>

        <div className="space-y-6">
          {/* Profil */}
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </Card>

          {/* Records Personnels */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Records Personnels</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.entries(user.records).map(([distance, time]) => (
                <div key={distance} className="p-3 bg-secondary/20 rounded-lg">
                  <div className="text-sm text-muted-foreground">{distance}</div>
                  <div className="font-semibold">{time}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Applications Connectées */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Applications Connectées</h3>
            <div className="space-y-4">
              {user.connectedApps.map((app) => (
                <div key={app.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="font-medium">{app.name}</div>
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

          {/* Bannière publicitaire */}
          <div className="w-full h-24 bg-secondary rounded-lg flex items-center justify-center">
            <p className="text-secondary-foreground">Espace publicitaire</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;