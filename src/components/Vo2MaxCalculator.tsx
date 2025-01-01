import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const Vo2MaxCalculator = () => {
  const { t } = useTranslation();
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [vo2max, setVo2max] = useState<number | null>(null);

  const calculateVo2Max = () => {
    if (!age || !weight || !height) return;

    // Formule de calcul VO2 Max (estimation basée sur les données anthropométriques)
    const baseVo2Max = gender === 'male' ? 56.363 : 44.998;
    const ageEffect = -0.381 * parseInt(age);
    const weightEffect = -0.754 * (parseInt(weight) / Math.pow(parseInt(height) / 100, 2));
    const heightEffect = 0.464 * parseInt(height);

    const estimated = baseVo2Max + ageEffect + weightEffect + heightEffect;
    setVo2max(Math.max(0, Math.round(estimated * 10) / 10));
  };

  const getVo2MaxCategory = (value: number) => {
    if (value >= 60) return t('vo2max.excellent');
    if (value >= 52) return t('vo2max.good');
    if (value >= 47) return t('vo2max.average');
    if (value >= 42) return t('vo2max.belowAverage');
    return t('vo2max.poor');
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{t('vo2max.title')}</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>{t('vo2max.gender')}</Label>
          <RadioGroup
            value={gender}
            onValueChange={setGender}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">{t('vo2max.male')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">{t('vo2max.female')}</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">{t('vo2max.age')}</Label>
          <Input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">{t('vo2max.weight')}</Label>
          <Input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">{t('vo2max.height')}</Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <Button
          onClick={calculateVo2Max}
          className="w-full"
        >
          {t('vo2max.calculate')}
        </Button>

        {vo2max !== null && (
          <div className="mt-4 text-center">
            <p className="text-xl font-bold">
              {t('vo2max.result')}: {vo2max} ml/kg/min
            </p>
            <p className="text-lg mt-2">
              {getVo2MaxCategory(vo2max)}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};