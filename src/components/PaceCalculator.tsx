import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const PaceCalculator = () => {
  const [kmh, setKmh] = useState<string>('');
  const [minKm, setMinKm] = useState<string>('');

  const convertKmhToMinKm = (kmh: number) => {
    const minPerKm = 60 / kmh;
    const minutes = Math.floor(minPerKm);
    const seconds = Math.round((minPerKm - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const convertMinKmToKmh = (minKm: string) => {
    console.log("Converting pace:", minKm);
    const [minutes, seconds = '0'] = minKm.split(':').map(Number);
    if (!isNaN(minutes)) {
      const totalMinutes = minutes + (Number(seconds) / 60);
      if (totalMinutes > 0) {
        const kmhValue = (60 / totalMinutes).toFixed(2);
        console.log("Calculated speed:", kmhValue);
        return kmhValue;
      }
    }
    return '';
  };

  const handleKmhChange = (value: string) => {
    setKmh(value);
    if (!isNaN(Number(value)) && Number(value) > 0) {
      setMinKm(convertKmhToMinKm(Number(value)));
    } else {
      setMinKm('');
    }
  };

  const formatPaceInput = (value: string): string => {
    // Supprime tous les caractères non numériques sauf ":"
    const cleaned = value.replace(/[^\d:]/g, '');
    
    // Sépare les minutes et les secondes
    const [minutes, seconds] = cleaned.split(':');
    
    // Si on a des secondes, s'assure qu'elles sont <= 59
    if (seconds !== undefined) {
      const numSeconds = parseInt(seconds);
      if (!isNaN(numSeconds) && numSeconds > 59) {
        return `${minutes}:59`;
      }
    }
    
    return cleaned;
  };

  const handleMinKmChange = (value: string) => {
    console.log("Input pace:", value);
    const formattedValue = formatPaceInput(value);
    if (formattedValue.match(/^\d{1,2}(:\d{0,2})?$/)) {
      setMinKm(formattedValue);
      const kmhValue = convertMinKmToKmh(formattedValue);
      setKmh(kmhValue);
    }
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Convertisseur d'Allure</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="kmh">Vitesse (km/h)</Label>
          <Input
            id="kmh"
            type="number"
            step="0.1"
            value={kmh}
            onChange={(e) => handleKmhChange(e.target.value)}
            placeholder="Entrez la vitesse"
            className="text-lg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="minKm">Allure (min:sec/km)</Label>
          <Input
            id="minKm"
            type="text"
            value={minKm}
            onChange={(e) => handleMinKmChange(e.target.value)}
            placeholder="00:00"
            className="text-lg"
            pattern="\d{1,2}(:\d{0,2})?"
          />
        </div>
      </div>
    </Card>
  );
};