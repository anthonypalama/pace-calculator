import React, { useState, useEffect } from 'react';
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
    const [minutes, seconds] = minKm.split(':').map(Number);
    if (!isNaN(minutes) && !isNaN(seconds)) {
      const totalMinutes = minutes + seconds / 60;
      return (60 / totalMinutes).toFixed(2);
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

  const handleMinKmChange = (value: string) => {
    if (value.match(/^\d{1,2}:\d{0,2}$/)) {
      setMinKm(value);
      const kmhValue = convertMinKmToKmh(value);
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
          />
        </div>
      </div>
    </Card>
  );
};