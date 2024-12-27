import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TimeInput } from './TimeInput';

export const PredictedTimeCalculator = () => {
  const [referenceDistance, setReferenceDistance] = useState<string>('');
  const [referenceTime, setReferenceTime] = useState<string>('');
  const [targetDistance, setTargetDistance] = useState<string>('');
  const [predictedTime, setPredictedTime] = useState<string>('');

  const distances = [
    { name: '5K', value: '5' },
    { name: '10K', value: '10' },
    { name: 'Semi', value: '21.1' },
    { name: 'Marathon', value: '42.2' },
  ];

  const calculatePredictedTime = () => {
    if (!referenceDistance || !referenceTime || !targetDistance) return;

    const [hours, minutes, seconds] = referenceTime.split(':').map(Number);
    const refDistanceNum = parseFloat(referenceDistance);
    const targetDistanceNum = parseFloat(targetDistance);
    
    if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds) && refDistanceNum > 0) {
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      
      // Nomogramme de Mercier
      // Facteur de correction basé sur la distance
      const getDistanceFactor = (distance: number) => {
        if (distance <= 5) return 1;
        if (distance <= 10) return 1.06;
        if (distance <= 21.1) return 1.12;
        return 1.18;
      };

      const refFactor = getDistanceFactor(refDistanceNum);
      const targetFactor = getDistanceFactor(targetDistanceNum);
      
      // Calcul du temps prédit avec le nomogramme de Mercier
      const predictedSeconds = totalSeconds * (targetDistanceNum / refDistanceNum) * (targetFactor / refFactor);
      
      const predHours = Math.floor(predictedSeconds / 3600);
      const predMinutes = Math.floor((predictedSeconds % 3600) / 60);
      const predSeconds = Math.round(predictedSeconds % 60);
      
      setPredictedTime(
        `${predHours.toString().padStart(2, '0')}:${predMinutes.toString().padStart(2, '0')}:${predSeconds.toString().padStart(2, '0')}`
      );
    }
  };

  // Déclencher le calcul automatiquement à chaque changement
  React.useEffect(() => {
    calculatePredictedTime();
  }, [referenceDistance, referenceTime, targetDistance]);

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Prédiction de Temps</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Distance de référence</Label>
          <div className="flex flex-wrap gap-2">
            {distances.map((d) => (
              <Button
                key={d.name}
                variant={referenceDistance === d.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setReferenceDistance(d.value)}
              >
                {d.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="referenceTime">Temps de référence (hh:mm:ss)</Label>
          <TimeInput
            id="referenceTime"
            value={referenceTime}
            onChange={setReferenceTime}
            className="text-lg"
          />
        </div>

        <div className="space-y-2">
          <Label>Distance cible</Label>
          <div className="flex flex-wrap gap-2">
            {distances.map((d) => (
              <Button
                key={d.name}
                variant={targetDistance === d.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTargetDistance(d.value)}
              >
                {d.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="predictedTime">Temps prédit</Label>
          <TimeInput
            id="predictedTime"
            value={predictedTime}
            onChange={() => {}}
            className="text-lg font-bold bg-secondary/20"
            readOnly
          />
        </div>
      </div>
    </Card>
  );
};
