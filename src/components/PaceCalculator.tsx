import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaceInput } from './PaceInput';
import { useTranslation } from 'react-i18next';

export const PaceCalculator = () => {
  const [kmh, setKmh] = useState<string>('');
  const [minKm, setMinKm] = useState<string>('');
  const { t } = useTranslation();

  const convertKmhToMinKm = (kmh: number) => {
    const minPerKm = 60 / kmh;
    const minutes = Math.floor(minPerKm);
    const seconds = Math.round((minPerKm - minutes) * 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
    const numericValue = value.replace(/[^\d.]/g, '');
    setKmh(numericValue);
    if (!isNaN(Number(numericValue)) && Number(numericValue) > 0) {
      setMinKm(convertKmhToMinKm(Number(numericValue)));
    } else {
      setMinKm('');
    }
  };

  const handleMinKmChange = (value: string) => {
    console.log("Input pace:", value);
    setMinKm(value);
    if (value.match(/^\d{1,2}:\d{2}$/)) {
      const kmhValue = convertMinKmToKmh(value);
      setKmh(kmhValue);
    }
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{t('converter.title', 'Convertisseur d\'Allure')}</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="kmh">{t('converter.speed', 'Vitesse (km/h)')}</Label>
          <Input
            id="kmh"
            type="text"
            inputMode="decimal"
            value={kmh}
            onChange={(e) => handleKmhChange(e.target.value)}
            placeholder={t('converter.enterSpeed', 'Entrez la vitesse')}
            className="text-lg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="minKm">{t('converter.pace', 'Allure (min:sec/km)')}</Label>
          <PaceInput
            id="minKm"
            value={minKm}
            onChange={handleMinKmChange}
            placeholder="00:00"
            className="text-lg"
          />
        </div>
      </div>
    </Card>
  );
};