import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const TimeCalculator = () => {
  const [distance, setDistance] = useState<string>('');
  const [speed, setSpeed] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [pace, setPace] = useState<string>('');
  const [showSplits, setShowSplits] = useState(false);
  const [splits, setSplits] = useState<string[]>([]);

  const quickDistances = [
    { name: '5K', value: '5' },
    { name: '10K', value: '10' },
    { name: 'Semi', value: '21.1' },
    { name: 'Marathon', value: '42.2' },
  ];

  const calculateSplits = () => {
    if (!speed || !distance) return;
    
    const totalDistance = parseFloat(distance);
    const speedKmH = parseFloat(speed);
    const timePerKm = 60 / speedKmH; // minutes per km
    
    const newSplits = [];
    for (let km = 1; km <= Math.ceil(totalDistance); km++) {
      const timeAtKm = timePerKm * km;
      const hours = Math.floor(timeAtKm / 60);
      const minutes = Math.floor(timeAtKm % 60);
      const seconds = Math.round((timeAtKm * 60) % 60);
      
      newSplits.push(
        `${km} km - ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }
    
    setSplits(newSplits);
    setShowSplits(true);
  };

  const calculateFromSpeed = (newSpeed: number) => {
    // Calcul de l'allure à partir de la vitesse
    const minPerKm = 60 / newSpeed;
    const paceMinutes = Math.floor(minPerKm);
    const paceSeconds = Math.round((minPerKm - paceMinutes) * 60);
    setPace(`${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`);
    
    // Calcul du temps si une distance est définie
    if (distance) {
      const timeHours = Number(distance) / newSpeed;
      const hours = Math.floor(timeHours);
      const minutes = Math.floor((timeHours - hours) * 60);
      const seconds = Math.round(((timeHours - hours) * 60 - minutes) * 60);
      setTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }
  };

  const calculateFromPace = (paceString: string) => {
    const [paceMinutes, paceSeconds] = paceString.split(':').map(Number);
    if (!isNaN(paceMinutes) && !isNaN(paceSeconds)) {
      const totalMinutesPerKm = paceMinutes + paceSeconds / 60;
      const newSpeed = 60 / totalMinutesPerKm;
      setSpeed(newSpeed.toFixed(2));
      
      // Calcul du temps si une distance est définie
      if (distance) {
        const timeHours = Number(distance) / newSpeed;
        const hours = Math.floor(timeHours);
        const minutes = Math.floor((timeHours - hours) * 60);
        const seconds = Math.round(((timeHours - hours) * 60 - minutes) * 60);
        setTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }
    }
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = Number(e.target.value);
    setSpeed(e.target.value);
    if (newSpeed > 0) {
      calculateFromSpeed(newSpeed);
    } else {
      setPace('');
      setTime('');
    }
  };

  const handlePaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPace = e.target.value;
    setPace(newPace);
    if (newPace.match(/^\d{1,2}:\d{2}$/)) {
      calculateFromPace(newPace);
    } else {
      setSpeed('');
      setTime('');
    }
  };

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
          <div className="flex flex-wrap gap-2 mt-2">
            {quickDistances.map((qd) => (
              <Button
                key={qd.name}
                variant="outline"
                size="sm"
                onClick={() => setDistance(qd.value)}
              >
                {qd.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="speed">Vitesse (km/h)</Label>
          <Input
            id="speed"
            type="number"
            step="0.1"
            value={speed}
            onChange={handleSpeedChange}
            placeholder="Entrez la vitesse"
            className="text-lg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pace">Allure (min:sec/km)</Label>
          <Input
            id="pace"
            type="text"
            value={pace}
            onChange={handlePaceChange}
            placeholder="00:00"
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
        
        <Button 
          onClick={calculateSplits}
          className="w-full"
          disabled={!speed || !distance}
        >
          Afficher les temps de passage
        </Button>

        {showSplits && splits.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold">Temps de passage :</h3>
            <div className="max-h-60 overflow-y-auto space-y-1">
              {splits.map((split, index) => (
                <div key={index} className="text-sm p-2 bg-secondary/10 rounded">
                  {split}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};