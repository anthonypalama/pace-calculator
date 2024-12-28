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
    <div className="min-h-screen bg-gradient-to-br from-[#F2FCE2]/20 via-[#D3E4FD]/20 to-[#FFDEE2]/20 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary/80 to-purple-600/80">
            Calculateur d'Allure
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/settings')}
            className="rounded-full hover:bg-white/50 backdrop-blur-sm transition-all duration-300"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        <div className="backdrop-blur-sm bg-white/30 rounded-xl p-4 shadow-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 bg-transparent h-auto p-1">
              <TabsTrigger 
                value="pace" 
                className="data-[state=active]:bg-primary/80 data-[state=active]:text-primary-foreground backdrop-blur-sm bg-white/50 py-2"
              >
                Convertisseur
              </TabsTrigger>
              <TabsTrigger 
                value="time" 
                className="data-[state=active]:bg-primary/80 data-[state=active]:text-primary-foreground backdrop-blur-sm bg-white/50 py-2"
              >
                Temps
              </TabsTrigger>
              <TabsTrigger 
                value="speed" 
                className="data-[state=active]:bg-primary/80 data-[state=active]:text-primary-foreground backdrop-blur-sm bg-white/50 py-2"
              >
                Allure
              </TabsTrigger>
              <TabsTrigger 
                value="predicted" 
                className="data-[state=active]:bg-primary/80 data-[state=active]:text-primary-foreground backdrop-blur-sm bg-white/50 py-2"
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
    </div>
  );
};

export default Index;