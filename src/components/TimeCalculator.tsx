import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TimeInput } from './TimeInput';
import { QuickDistanceButtons } from './QuickDistanceButtons';
import { SplitTimes } from './SplitTimes';
import { PaceInput } from './PaceInput';
import { calculatePaceFromSpeed, calculateSplitTimes } from '../utils/timeCalculations';

export const TimeCalculator = () => {
  const [distance, setDistance] = useState<string>('');
  const [speed, setSpeed] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [pace, setPace] = useState<string>('');
  const [showSplits, setShowSplits] = useState(false);
  const [splits, setSplits] = useState<string[]>([]);

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^\d.]/g, '');
    setSpeed(numericValue);
  };

  const handlePaceChange = (value: string) => {
    console.log("Changing pace to:", value);
    setPace(value);
    if (value.match(/^\d{1,2}:\d{2}$/)) {
      const [minutes, seconds] = value.split(':').map(Number);
      const totalMinutes = minutes + (seconds / 60);
      if (totalMinutes > 0) {
        const speedValue = (60 / totalMinutes).toFixed(2);
        setSpeed(speedValue);
      }
    }
  };

  // Calcul automatique à chaque changement
  useEffect(() => {
    if (distance && speed) {
      const speedNum = parseFloat(speed);
      if (!isNaN(speedNum) && speedNum > 0) {
        const timeHours = Number(distance) / speedNum;
        const hours = Math.floor(timeHours);
        const minutes = Math.floor((timeHours - hours) * 60);
        const seconds = Math.round(((timeHours - hours) * 60 - minutes) * 60);
        
        setTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        setPace(calculatePaceFromSpeed(speedNum));
        
        const newSplits = calculateSplitTimes(Number(distance), speedNum);
        setSplits(newSplits);
        setShowSplits(true);
      }
    }
  }, [distance, speed]);

  // Mise à jour de l'allure quand la vitesse change
  useEffect(() => {
    if (speed) {
      const speedNum = parseFloat(speed);
      if (!isNaN(speedNum) && speedNum > 0) {
        setPace(calculatePaceFromSpeed(speedNum));
      }
    }
  }, [speed]);

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Calculateur de Temps</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="distance">Distance (km)</Label>
          <Input
            id="distance"
            type="text"
            inputMode="decimal"
            value={distance}
            onChange={(e) => setDistance(e.target.value.replace(/[^\d.]/g, ''))}
            placeholder="Entrez la distance"
            className="text-lg"
          />
          <QuickDistanceButtons onSelect={setDistance} selectedValue={distance} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="speed">Vitesse (km/h)</Label>
          <Input
            id="speed"
            type="text"
            inputMode="decimal"
            value={speed}
            onChange={handleSpeedChange}
            placeholder="Entrez la vitesse"
            className="text-lg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pace">Allure (min:sec/km)</Label>
          <PaceInput
            id="pace"
            value={pace}
            onChange={handlePaceChange}
            placeholder="00:00"
            className="text-lg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Temps estimé</Label>
          <TimeInput
            id="time"
            value={time}
            onChange={() => {}}
            className="text-lg font-bold bg-secondary/20"
            readOnly
          />
        </div>

        <SplitTimes splits={splits} show={showSplits} />
      </div>
    </Card>
  );
};