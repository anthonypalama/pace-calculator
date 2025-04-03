
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TimeInput } from './TimeInput';
import { PaceInput } from './PaceInput';
import { useTranslation } from 'react-i18next';

export const DistanceCalculator = () => {
  const [speed, setSpeed] = useState<string>('');
  const [pace, setPace] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [distance, setDistance] = useState<string>('');
  const { t } = useTranslation();

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^\d.]/g, '');
    setSpeed(numericValue);
    
    if (pace && pace !== calculatePaceFromSpeed(parseFloat(numericValue))) {
      setPace(calculatePaceFromSpeed(parseFloat(numericValue)));
    }
    
    calculateDistance();
  };

  const handlePaceChange = (value: string) => {
    setPace(value);
    if (value.match(/^\d{1,2}:\d{2}$/)) {
      const [minutes, seconds] = value.split(':').map(Number);
      const totalMinutes = minutes + (seconds / 60);
      if (totalMinutes > 0) {
        const speedValue = (60 / totalMinutes).toFixed(2);
        setSpeed(speedValue);
      }
    }
    
    calculateDistance();
  };

  const handleTimeChange = (value: string) => {
    setTime(value);
    calculateDistance();
  };

  const calculatePaceFromSpeed = (speedKmH: number): string => {
    if (!speedKmH || speedKmH <= 0) return '';
    
    const minPerKm = 60 / speedKmH;
    const paceMinutes = Math.floor(minPerKm);
    const paceSeconds = Math.round((minPerKm - paceMinutes) * 60);
    return `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`;
  };

  const calculateDistance = () => {
    if (!speed || !time) {
      setDistance('');
      return;
    }

    const speedNum = parseFloat(speed);
    if (isNaN(speedNum) || speedNum <= 0) {
      setDistance('');
      return;
    }

    if (time.match(/^\d{2}:\d{2}:\d{2}$/)) {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      const totalHours = hours + minutes / 60 + seconds / 3600;
      const calculatedDistance = (speedNum * totalHours).toFixed(2);
      setDistance(calculatedDistance);
    }
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateDistance();
  }, [speed, time]);

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{t('distance.title')}</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="speed">{t('distance.speed')}</Label>
          <Input
            id="speed"
            type="text"
            inputMode="decimal"
            value={speed}
            onChange={handleSpeedChange}
            placeholder={t('distance.enterSpeed')}
            className="text-lg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pace">{t('distance.pace')}</Label>
          <PaceInput
            id="pace"
            value={pace}
            onChange={handlePaceChange}
            placeholder="00:00"
            className="text-lg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">{t('distance.time')}</Label>
          <TimeInput
            id="time"
            value={time}
            onChange={handleTimeChange}
            className="text-lg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="calculatedDistance">{t('distance.calculatedDistance')}</Label>
          <Input
            id="calculatedDistance"
            type="text"
            value={distance ? `${distance} km` : ''}
            readOnly
            className="text-lg font-bold bg-secondary/20"
          />
        </div>
      </div>
    </Card>
  );
};
