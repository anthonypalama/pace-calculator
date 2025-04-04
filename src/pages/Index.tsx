
import { Button } from "@/components/ui/button";
import { Settings, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaceCalculator } from "@/components/PaceCalculator";
import { TimeCalculator } from "@/components/TimeCalculator";
import { SpeedCalculator } from "@/components/SpeedCalculator";
import { DistanceCalculator } from "@/components/DistanceCalculator";
import { PredictedTimeCalculator } from "@/components/PredictedTimeCalculator";
import { PredictiveFinish } from "@/components/PredictiveFinish";
import { VmaCalculator } from "@/components/VmaCalculator";
import { Vo2MaxCalculator } from "@/components/Vo2MaxCalculator";
import { TriathlonCalculator } from "@/components/TriathlonCalculator";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useSession } from '@supabase/auth-helpers-react';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pace');
  const { t } = useTranslation();
  const session = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pastel-peach to-pastel-purple p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold text-black">
            {t('common.appTitle')}
          </h1>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            {session ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/settings')}
                className="rounded-full hover:bg-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <Settings className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
                className="hover:bg-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Connexion
              </Button>
            )}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg animate-fade-in">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2 sm:grid-cols-9 gap-2 bg-transparent h-auto p-1">
              <TabsTrigger 
                value="pace" 
                className="data-[state=active]:bg-[#FEC6A1] data-[state=active]:text-white bg-[#FDE1D3] py-2 transition-all duration-300"
              >
                {t('tabs.converter')}
              </TabsTrigger>
              <TabsTrigger 
                value="time" 
                className="data-[state=active]:bg-[#FEC6A1] data-[state=active]:text-white bg-[#FDE1D3] py-2 transition-all duration-300"
              >
                {t('tabs.time')}
              </TabsTrigger>
              <TabsTrigger 
                value="speed" 
                className="data-[state=active]:bg-[#FEC6A1] data-[state=active]:text-white bg-[#FDE1D3] py-2 transition-all duration-300"
              >
                {t('tabs.speed')}
              </TabsTrigger>
              <TabsTrigger 
                value="distance" 
                className="data-[state=active]:bg-[#FEC6A1] data-[state=active]:text-white bg-[#FDE1D3] py-2 transition-all duration-300"
              >
                {t('tabs.distance')}
              </TabsTrigger>
              <TabsTrigger 
                value="predicted" 
                className="data-[state=active]:bg-[#FEC6A1] data-[state=active]:text-white bg-[#FDE1D3] py-2 transition-all duration-300"
              >
                {t('tabs.predicted')}
              </TabsTrigger>
              <TabsTrigger 
                value="finish" 
                className="data-[state=active]:bg-[#FEC6A1] data-[state=active]:text-white bg-[#FDE1D3] py-2 transition-all duration-300"
              >
                {t('tabs.finish')}
              </TabsTrigger>
              <TabsTrigger 
                value="vma" 
                className="data-[state=active]:bg-[#FEC6A1] data-[state=active]:text-white bg-[#FDE1D3] py-2 transition-all duration-300"
              >
                VMA
              </TabsTrigger>
              <TabsTrigger 
                value="vo2max" 
                className="data-[state=active]:bg-[#FEC6A1] data-[state=active]:text-white bg-[#FDE1D3] py-2 transition-all duration-300"
              >
                {t('tabs.vo2max')}
              </TabsTrigger>
              <TabsTrigger 
                value="triathlon" 
                className="data-[state=active]:bg-[#FEC6A1] data-[state=active]:text-white bg-[#FDE1D3] py-2 transition-all duration-300"
              >
                Triathlon
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
              <TabsContent value="distance">
                <DistanceCalculator />
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
              <TabsContent value="vo2max">
                <Vo2MaxCalculator />
              </TabsContent>
              <TabsContent value="triathlon">
                <TriathlonCalculator />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
