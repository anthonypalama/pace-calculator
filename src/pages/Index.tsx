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
      <div className="max-w-4xl mx-auto relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold text-primary">Calculateur d'Allure</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/settings')}
            className="rounded-full"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full flex flex-wrap sm:flex-nowrap gap-2 bg-transparent">
            <TabsTrigger 
              value="pace" 
              className="flex-1 min-w-[120px]"
            >
              Convertisseur
            </TabsTrigger>
            <TabsTrigger 
              value="time" 
              className="flex-1 min-w-[120px]"
            >
              Temps
            </TabsTrigger>
            <TabsTrigger 
              value="speed" 
              className="flex-1 min-w-[120px]"
            >
              Allure
            </TabsTrigger>
            <TabsTrigger 
              value="predicted" 
              className="flex-1 min-w-[120px]"
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
      </div>
    </div>
  );
};

export default Index;