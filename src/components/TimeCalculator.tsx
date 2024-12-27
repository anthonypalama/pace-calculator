import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TimeInput } from './TimeInput';
import { QuickDistanceButtons } from './QuickDistanceButtons';
import { SplitTimes } from './SplitTimes';
import { calculatePaceFromSpeed, calculateSplitTimes } from '../utils/timeCalculations';

export const TimeCalculator = () => {
  const [distance, setDistance] = useState<string>('');
  const [speed, setSpeed] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [pace, setPace] = useState<string>('');
  const [showSplits, setShowSplits] = useState(false);
  const [splits, setSplits] = useState<string[]>([]);

  const calculateFromSpeed = (newSpeed: number) => {
    const newPace = calculatePaceFromSpeed(newSpeed);
    setPace(newPace);
    
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

  useEffect(() => {
    if (speed && distance) {
      const newSpeed = Number(speed);
      if (newSpeed > 0) {
        calculateFromSpeed(newSpeed);
        const newSplits = calculateSplitTimes(Number(distance), newSpeed);
        setSplits(newSplits);
        setShowSplits(true);
      }
    }
  }, [speed, distance]);

  useEffect(() => {
    if (pace.match(/^\d{1,2}:\d{2}$/)) {
      calculateFromPace(pace);
    }
  }, [pace, distance]);

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
          <QuickDistanceButtons onSelect={setDistance} selectedValue={distance} />
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
          <TimeInput
            id="time"
            value={time}
            onChange={setTime}
            className="text-lg font-bold bg-secondary/20"
            readOnly
          />
        </div>
        
        <Button 
          onClick={() => {
            if (speed && distance) {
              const newSplits = calculateSplitTimes(Number(distance), Number(speed));
              setSplits(newSplits);
              setShowSplits(true);
            }
          }}
          className="w-full"
          disabled={!speed || !distance}
        >
          Afficher les temps de passage
        </Button>

        <SplitTimes splits={splits} show={showSplits} />
      </div>
    </Card>
  );
};