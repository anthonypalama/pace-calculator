import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

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

        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Paramètres</h1>
          <p className="text-muted-foreground">
            Pour accéder aux fonctionnalités de compte et de synchronisation avec Strava, Garmin, etc., 
            vous devez d'abord vous connecter ou créer un compte.
          </p>
          <div className="mt-6">
            <Button 
              onClick={() => {
                // Cette fonctionnalité nécessite Supabase
                console.log("Fonctionnalité à implémenter avec Supabase");
              }}
              className="w-full sm:w-auto"
            >
              Se connecter / Créer un compte
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;