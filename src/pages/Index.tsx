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
import { Vo2MaxCalculator } from "@/components/Vo2MaxCalculator";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pace');
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDE1D3] to-[#F1F0FB] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold text-black">
            {t('common.appTitle')}
          </h1>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/settings')}
              className="rounded-full hover:bg-white/50 backdrop-blur-sm"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2 sm:grid-cols-7 gap-2 bg-transparent h-auto p-1">
              <TabsTrigger 
                value="pace" 
                className="data-[state=active]:bg-[#FEC6A1] data-[state=active]:text-white bg-[#FDE1D3] py-2"
              >
                {t('tabs.converter')}
              </TabsTrigger>
              <TabsTrigger 
                value="time" 
                className="data-[state=active]:bg-[#FEC6A1] data-[state=active]:text-white bg-[#FDE1D3] py-2"
              >
                {t('tabs.time')}
              </TabsTrigger>
              <TabsTrigger 
                value="speed" 
                className="data-[state=active]:bg-[#FEC6A1] data-[state=active]:text-white bg-[#FDE1D3] py-2"
              >
                {t('tabs.speed')}
              </TabsTrigger>
              <TabsTrigger 
                value="predicted" 
                className="data-[state=active]:bg-[#FEC6A1] data-[state=active]:text-white bg-[#FDE1D3] py-2"
              >
                {t('tabs.predicted')}
              </TabsTrigger>
              <TabsTrigger 
                value="finish" 
                className="data-[state=active]:bg-[#FEC6A1] data-[state=active]:text-white bg-[#FDE1D3] py-2"
              >
                {t('tabs.finish')}
              </TabsTrigger>
              <TabsTrigger 
                value="vma" 
                className="data-[state=active]:bg-[#FEC6A1] data-[state=active]:text-white bg-[#FDE1D3] py-2"
              >
                {t('tabs.vma')}
              </TabsTrigger>
              <TabsTrigger 
                value="vo2max" 
                className="data-[state=active]:bg-[#FEC6A1] data-[state=active]:text-white bg-[#FDE1D3] py-2"
              >
                {t('tabs.vo2max')}
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
              <TabsContent value="vo2max">
                <Vo2MaxCalculator />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;