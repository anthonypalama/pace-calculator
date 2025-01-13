import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TimeInput } from './TimeInput';
import { PaceInput } from './PaceInput';
import { useTranslation } from 'react-i18next';

export const SpeedCalculator = () => {
  const [distance, setDistance] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [speed, setSpeed] = useState<string>('');
  const [pace, setPace] = useState<string>('');
  const [showSplits, setShowSplits] = useState(false);
  const [splits, setSplits] = useState<string[]>([]);
  const { t } = useTranslation();

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

      const minPerKm = 60 / calculatedSpeed;
      const paceMinutes = Math.floor(minPerKm);
      const paceSeconds = Math.round((minPerKm - paceMinutes) * 60);
      setPace(`${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`);
    } else {
      setSpeed('');
      setPace('');
    }
  };

  const calculateSplits = () => {
    if (!speed || !distance) return;
    
    const totalDistance = parseFloat(distance);
    const speedKmH = parseFloat(speed);
    const timePerKm = 60 / speedKmH; // minutes per km
    
    const newSplits = [];
    for (let km = 1; km <= totalDistance; km++) {
      const timeAtKm = timePerKm * km;
      const hours = Math.floor(timeAtKm / 60);
      const minutes = Math.floor(timeAtKm % 60);
      const seconds = Math.round((timeAtKm * 60) % 60);
      
      newSplits.push(
        `${km} km - ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }
    
    // Ajouter le dernier split si la distance n'est pas un nombre entier
    if (totalDistance % 1 !== 0) {
      const timeAtFinal = timePerKm * totalDistance;
      const hours = Math.floor(timeAtFinal / 60);
      const minutes = Math.floor(timeAtFinal % 60);
      const seconds = Math.round((timeAtFinal * 60) % 60);
      
      newSplits.push(
        `${totalDistance} km - ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }
    
    setSplits(newSplits);
    setShowSplits(true);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
    if (e.target.value.match(/^\d{2}:\d{2}:\d{2}$/)) {
      calculateSpeed();
    }
  };

  // Calcul automatique à chaque changement
  React.useEffect(() => {
    if (distance && time.match(/^\d{2}:\d{2}:\d{2}$/)) {
      calculateSpeed();
      calculateSplits();
    }
  }, [distance, time]);

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{t('speed.title')}</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="distance">{t('speed.distance')}</Label>
          <Input
            id="distance"
            type="number"
            step="0.1"
            value={distance}
            onChange={(e) => {
              setDistance(e.target.value);
              calculateSpeed();
            }}
            placeholder={t('speed.enterDistance')}
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
          <Label htmlFor="time">{t('speed.time')}</Label>
          <TimeInput
            id="time"
            value={time}
            onChange={setTime}
            className="text-lg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="speed">{t('speed.calculatedSpeed')}</Label>
          <Input
            id="speed"
            type="text"
            value={speed}
            readOnly
            className="text-lg font-bold bg-secondary/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pace">{t('speed.calculatedPace')}</Label>
          <PaceInput
            id="pace"
            value={pace}
            onChange={() => {}}
            readOnly
            className="text-lg font-bold bg-secondary/20"
          />
        </div>

        <Button 
          onClick={calculateSplits}
          className="w-full"
          disabled={!speed || !distance}
        >
          {t('speed.showSplits')}
        </Button>

        {showSplits && splits.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold">{t('speed.splits')}:</h3>
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
