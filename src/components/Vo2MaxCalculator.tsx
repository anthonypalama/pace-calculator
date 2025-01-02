import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";

export const Vo2MaxCalculator = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [vma, setVma] = useState<string>('');
  const [vo2max, setVo2max] = useState<number | null>(null);

  const calculateVo2Max = () => {
    if (!vma) return;
    
    const vmaNumber = parseFloat(vma);
    if (isNaN(vmaNumber)) return;
    
    // Formule : VO2max = VMA x 3.5
    const estimated = Math.round(vmaNumber * 3.5 * 10) / 10;
    setVo2max(estimated);
    
    toast({
      title: t('vo2max.calculated'),
      description: `${estimated} ml/kg/min`,
    });
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
          <Label htmlFor="vma">{t('vo2max.vma')}</Label>
          <Input
            id="vma"
            type="number"
            step="0.1"
            value={vma}
            onChange={(e) => setVma(e.target.value)}
            placeholder="14.5"
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