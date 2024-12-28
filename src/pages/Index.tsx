import { useState } from 'react';
import { PaceCalculator } from '@/components/PaceCalculator';
import { TimeCalculator } from '@/components/TimeCalculator';
import { SpeedCalculator } from '@/components/SpeedCalculator';
import { PredictedTimeCalculator } from '@/components/PredictedTimeCalculator';
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pace');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Calculateur d'Allure
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/settings')}
            className="rounded-full hover:bg-secondary/50"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 bg-transparent h-auto p-1">
            <TabsTrigger 
              value="pace" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2"
            >
              Convertisseur
            </TabsTrigger>
            <TabsTrigger 
              value="time" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2"
            >
              Temps
            </TabsTrigger>
            <TabsTrigger 
              value="speed" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2"
            >
              Allure
            </TabsTrigger>
            <TabsTrigger 
              value="predicted" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2"
            >
              Prédiction
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="pace">
              <PaceCalculator />
            </TabsContent>
            <TabsContent value="time">
              <TimeCalculator />
            </TabsContent>
            <TabsContent value="speed">
              <SpeedCalculator />
            </TabsContent>
            <TabsContent value="predicted">
              <PredictedTimeCalculator />
            </TabsContent>
          </div>
        </Tabs>

        {/* Bannière publicitaire */}
        <div className="mt-8 w-full h-24 bg-secondary rounded-lg flex items-center justify-center">
          <p className="text-secondary-foreground">Espace publicitaire</p>
        </div>
      </div>
    </div>
  );
};

export default Index;