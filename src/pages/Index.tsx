import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaceCalculator } from "@/components/PaceCalculator";
import { TimeCalculator } from "@/components/TimeCalculator";
import { SpeedCalculator } from "@/components/SpeedCalculator";
import { PredictedTimeCalculator } from "@/components/PredictedTimeCalculator";
import { PredictiveFinish } from "@/components/PredictiveFinish";
import { VmaCalculator } from "@/components/VmaCalculator";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pace');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF7CD] to-[#FFDEE2] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED]">
            Calculateur d'Allure
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/settings')}
            className="rounded-full hover:bg-white/50 backdrop-blur-sm"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2 sm:grid-cols-6 gap-2 bg-transparent h-auto p-1">
              <TabsTrigger 
                value="pace" 
                className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white bg-[#D3E4FD] py-2"
              >
                Convertisseur
              </TabsTrigger>
              <TabsTrigger 
                value="time" 
                className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white bg-[#D3E4FD] py-2"
              >
                Temps
              </TabsTrigger>
              <TabsTrigger 
                value="speed" 
                className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white bg-[#D3E4FD] py-2"
              >
                Allure
              </TabsTrigger>
              <TabsTrigger 
                value="predicted" 
                className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white bg-[#D3E4FD] py-2"
              >
                Prédiction
              </TabsTrigger>
              <TabsTrigger 
                value="finish" 
                className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white bg-[#D3E4FD] py-2"
              >
                Arrivée
              </TabsTrigger>
              <TabsTrigger 
                value="vma" 
                className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white bg-[#D3E4FD] py-2"
              >
                VMA
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
              <TabsContent value="finish">
                <PredictiveFinish />
              </TabsContent>
              <TabsContent value="vma">
                <VmaCalculator />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;