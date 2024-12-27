import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      
      // Formule de Riegel pour la prédiction du temps
      const predictedSeconds = totalSeconds * Math.pow(targetDistanceNum / refDistanceNum, 1.06);
      
      const predHours = Math.floor(predictedSeconds / 3600);
      const predMinutes = Math.floor((predictedSeconds % 3600) / 60);
      const predSeconds = Math.round(predictedSeconds % 60);
      
      setPredictedTime(
        `${predHours.toString().padStart(2, '0')}:${predMinutes.toString().padStart(2, '0')}:${predSeconds.toString().padStart(2, '0')}`
      );
    }
  };

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
                onClick={() => {
                  setReferenceDistance(d.value);
                  calculatePredictedTime();
                }}
              >
                {d.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="referenceTime">Temps de référence (hh:mm:ss)</Label>
          <Input
            id="referenceTime"
            type="text"
            value={referenceTime}
            onChange={(e) => {
              setReferenceTime(e.target.value);
              if (e.target.value.match(/^\d{2}:\d{2}:\d{2}$/)) {
                calculatePredictedTime();
              }
            }}
            placeholder="00:00:00"
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
                onClick={() => {
                  setTargetDistance(d.value);
                  calculatePredictedTime();
                }}
              >
                {d.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="predictedTime">Temps prédit</Label>
          <Input
            id="predictedTime"
            type="text"
            value={predictedTime}
            readOnly
            className="text-lg font-bold bg-secondary/20"
          />
        </div>
      </div>
    </Card>
  );
};