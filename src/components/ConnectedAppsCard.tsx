import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ConnectedApp {
  name: string;
  connected: boolean;
}

interface ConnectedAppsCardProps {
  connectedApps: ConnectedApp[];
}

export const ConnectedAppsCard = ({ connectedApps }: ConnectedAppsCardProps) => {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-4 text-[#8B5CF6]">Applications Connectées</h3>
      <div className="space-y-4">
        {connectedApps.map((app) => (
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
  );
};