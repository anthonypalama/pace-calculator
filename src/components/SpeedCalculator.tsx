import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SpeedCalculator = () => {
  const [distance, setDistance] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [speed, setSpeed] = useState<string>('');

  const calculateSpeed = () => {
    if (distance && time) {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
        const totalHours = hours + minutes / 60 + seconds / 3600;
        const speedValue = (Number(distance) / totalHours).toFixed(2);
        setSpeed(speedValue);
      }
    } else {
      setSpeed('');
    }
  };

  useEffect(() => {
    calculateSpeed();
  }, [distance, time]);

  const handleTimeChange = (value: string) => {
    if (value.match(/^\d{0,2}:\d{0,2}:\d{0,2}$/)) {
      setTime(value);
    }
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Calculateur d'Allure</h2>
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
          <Label htmlFor="time">Temps (hh:mm:ss)</Label>
          <Input
            id="time"
            type="text"
            value={time}
            onChange={(e) => handleTimeChange(e.target.value)}
            placeholder="00:00:00"
            className="text-lg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="speed">Vitesse calculée (km/h)</Label>
          <Input
            id="speed"
            type="text"
            value={speed}
            readOnly
            className="text-lg font-bold bg-secondary/20"
          />
        </div>
      </div>
    </Card>
  );
};