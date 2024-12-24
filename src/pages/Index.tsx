import { useState } from 'react';
import { PaceCalculator } from '@/components/PaceCalculator';
import { TimeCalculator } from '@/components/TimeCalculator';
import { SpeedCalculator } from '@/components/SpeedCalculator';
import { Button } from "@/components/ui/button";

const Index = () => {
  const [activeCalculator, setActiveCalculator] = useState<'pace' | 'time' | 'speed'>('pace');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Calculateur d'Allure de Course</h1>
        
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={activeCalculator === 'pace' ? 'default' : 'outline'}
            onClick={() => setActiveCalculator('pace')}
          >
            Convertisseur d'Allure
          </Button>
          <Button
            variant={activeCalculator === 'time' ? 'default' : 'outline'}
            onClick={() => setActiveCalculator('time')}
          >
            Calculer le Temps
          </Button>
          <Button
            variant={activeCalculator === 'speed' ? 'default' : 'outline'}
            onClick={() => setActiveCalculator('speed')}
          >
            Calculer l'Allure
          </Button>
        </div>

        <div className="transition-all duration-300 ease-in-out">
          {activeCalculator === 'pace' && <PaceCalculator />}
          {activeCalculator === 'time' && <TimeCalculator />}
          {activeCalculator === 'speed' && <SpeedCalculator />}
        </div>
      </div>
    </div>
  );
};

export default Index;