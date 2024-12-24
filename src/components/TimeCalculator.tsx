import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const TimeCalculator = () => {
  const [distance, setDistance] = useState<string>('');
  const [speed, setSpeed] = useState<string>('');
  const [time, setTime] = useState<string>('');

  const calculateTime = () => {
    const distanceNum = Number(distance);
    const speedNum = Number(speed);
    
    if (distanceNum > 0 && speedNum > 0) {
      const timeHours = distanceNum / speedNum;
      const hours = Math.floor(timeHours);
      const minutes = Math.floor((timeHours - hours) * 60);
      const seconds = Math.round(((timeHours - hours) * 60 - minutes) * 60);
      
      setTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    } else {
      setTime('');
    }
  };

  useEffect(() => {
    calculateTime();
  }, [distance, speed]);

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Calculateur de Temps</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="distance">Distance (km)</Label>
          <Input
            id="distance"
            type="number"
            step="0.1"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Entrez la distance"
            className="text-lg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="speed">Vitesse (km/h)</Label>
          <Input
            id="speed"
            type="number"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            placeholder="Entrez la vitesse"
            className="text-lg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Temps estimé</Label>
          <Input
            id="time"
            type="text"
            value={time}
            readOnly
            className="text-lg font-bold bg-secondary/20"
          />
        </div>
      </div>
    </Card>
  );
};