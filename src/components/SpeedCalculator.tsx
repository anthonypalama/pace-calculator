import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const SpeedCalculator = () => {
  const [distance, setDistance] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [speed, setSpeed] = useState<string>('');
  const [pace, setPace] = useState<string>('');

  const quickDistances = [
    { name: '5K', value: '5' },
    { name: '10K', value: '10' },
    { name: 'Semi', value: '21.1' },
    { name: 'Marathon', value: '42.2' },
  ];

  const calculateSpeed = () => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const distanceNum = Number(distance);
    
    if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds) && distanceNum > 0) {
      const totalHours = hours + minutes / 60 + seconds / 3600;
      const calculatedSpeed = distanceNum / totalHours;
      setSpeed(calculatedSpeed.toFixed(2));

      // Calcul de l'allure
      const minPerKm = 60 / calculatedSpeed;
      const paceMinutes = Math.floor(minPerKm);
      const paceSeconds = Math.round((minPerKm - paceMinutes) * 60);
      setPace(`${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`);
    } else {
      setSpeed('');
      setPace('');
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
    if (e.target.value.match(/^\d{2}:\d{2}:\d{2}$/)) {
      calculateSpeed();
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
            onChange={(e) => {
              setDistance(e.target.value);
              calculateSpeed();
            }}
            placeholder="Entrez la distance"
            className="text-lg"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {quickDistances.map((qd) => (
              <Button
                key={qd.name}
                variant="outline"
                size="sm"
                onClick={() => {
                  setDistance(qd.value);
                  calculateSpeed();
                }}
              >
                {qd.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Temps (hh:mm:ss)</Label>
          <Input
            id="time"
            type="text"
            value={time}
            onChange={handleTimeChange}
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
        <div className="space-y-2">
          <Label htmlFor="pace">Allure calculée (min:sec/km)</Label>
          <Input
            id="pace"
            type="text"
            value={pace}
            readOnly
            className="text-lg font-bold bg-secondary/20"
          />
        </div>
      </div>
    </Card>
  );
};