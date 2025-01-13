import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TimeInput } from './TimeInput';
import { QuickDistanceButtons } from './QuickDistanceButtons';
import { useTranslation } from 'react-i18next';

export const PredictiveFinish = () => {
  const [elapsedTime, setElapsedTime] = useState<string>('');
  const [coveredDistance, setCoveredDistance] = useState<string>('');
  const [totalDistance, setTotalDistance] = useState<string>('');
  const [predictedTime, setPredictedTime] = useState<string>('');
  const { t } = useTranslation();

  const calculatePredictedTime = () => {
    if (!elapsedTime || !coveredDistance || !totalDistance) return;

    const [hours, minutes, seconds] = elapsedTime.split(':').map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const coveredDistanceNum = parseFloat(coveredDistance);
    const totalDistanceNum = parseFloat(totalDistance);

    if (coveredDistanceNum > 0 && totalDistanceNum > 0) {
      const predictedSeconds = (totalSeconds * totalDistanceNum) / coveredDistanceNum;
      const predHours = Math.floor(predictedSeconds / 3600);
      const predMinutes = Math.floor((predictedSeconds % 3600) / 60);
      const predSeconds = Math.round(predictedSeconds % 60);

      setPredictedTime(
        `${predHours.toString().padStart(2, '0')}:${predMinutes.toString().padStart(2, '0')}:${predSeconds.toString().padStart(2, '0')}`
      );
    }
  };

  useEffect(() => {
    calculatePredictedTime();
  }, [elapsedTime, coveredDistance, totalDistance]);

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{t('finish.title')}</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="elapsedTime">{t('finish.elapsedTime')}</Label>
          <TimeInput
            id="elapsedTime"
            value={elapsedTime}
            onChange={setElapsedTime}
            className="text-lg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="coveredDistance">{t('finish.coveredDistance')}</Label>
          <Input
            id="coveredDistance"
            type="number"
            step="0.1"
            value={coveredDistance}
            onChange={(e) => setCoveredDistance(e.target.value)}
            placeholder="0.0"
            className="text-lg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="totalDistance">{t('finish.totalDistance')}</Label>
          <Input
            id="totalDistance"
            type="number"
            step="0.1"
            value={totalDistance}
            onChange={(e) => setTotalDistance(e.target.value)}
            placeholder="0.0"
            className="text-lg"
          />
          <QuickDistanceButtons
            onSelect={(value) => setTotalDistance(value)}
            selectedValue={totalDistance}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="predictedTime">{t('finish.predictedTime')}</Label>
          <TimeInput
            id="predictedTime"
            value={predictedTime}
            onChange={() => {}}
            className="text-lg font-bold bg-secondary/20"
            readOnly
          />
        </div>
      </div>
    </Card>
  );
};
