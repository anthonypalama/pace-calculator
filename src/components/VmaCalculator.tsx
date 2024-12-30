import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TimeInput } from './TimeInput';
import { Button } from './ui/button';

export const VmaCalculator = () => {
  const [distance, setDistance] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [vma, setVma] = useState<string>('');

  const distances = [
    { name: '1000m', value: '1' },
    { name: '2000m', value: '2' },
    { name: '3000m', value: '3' },
    { name: 'Cooper (12min)', value: 'cooper' },
  ];

  const calculateVma = () => {
    if (!time || !distance) return;

    const [hours, minutes, seconds] = time.split(':').map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    
    let calculatedVma = 0;
    
    if (distance === 'cooper') {
      // Test de Cooper (distance en 12 minutes)
      calculatedVma = (parseFloat(distance) * 1000) / 200;
    } else {
      const distanceMeters = parseFloat(distance) * 1000;
      const speedKmh = (distanceMeters / totalSeconds) * 3.6;
      
      // Formule de Léger-Boucher
      calculatedVma = speedKmh * 1.1;
    }

    setVma(calculatedVma.toFixed(1));
  };

  useEffect(() => {
    calculateVma();
  }, [distance, time]);

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Calculateur de VMA</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Distance du test</Label>
          <div className="flex flex-wrap gap-2">
            {distances.map((d) => (
              <Button
                key={d.name}
                variant={distance === d.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDistance(d.value)}
              >
                {d.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Temps réalisé (hh:mm:ss)</Label>
          <TimeInput
            id="time"
            value={time}
            onChange={setTime}
            className="text-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vma">VMA estimée (km/h)</Label>
          <Input
            id="vma"
            type="text"
            value={vma}
            readOnly
            className="text-lg font-bold bg-secondary/20"
          />
        </div>
      </div>
    </Card>
  );
};