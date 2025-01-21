import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TimeInput } from './TimeInput';
import { useTranslation } from 'react-i18next';

type TriathlonDistance = {
  name: string;
  swim: number;
  bike: number;
  run: number;
  swimRatio: number;
  bikeRatio: number;
  runRatio: number;
};

// Base ratios for Olympic distance (M): 20% swim, 50% bike, 30% run
const BASE_SWIM_RATIO = 0.20;
const BASE_BIKE_RATIO = 0.50;
const BASE_RUN_RATIO = 0.30;

const TRIATHLON_DISTANCES: { [key: string]: TriathlonDistance } = {
  'XS': { 
    name: 'XS - Découverte', 
    swim: 0.4, 
    bike: 10, 
    run: 2.5,
    // Adjust ratios based on distance compared to M distance
    swimRatio: BASE_SWIM_RATIO * (0.4 / 1.5),
    bikeRatio: BASE_BIKE_RATIO * (10 / 40),
    runRatio: BASE_RUN_RATIO * (2.5 / 10)
  },
  'S': { 
    name: 'S - Sprint', 
    swim: 0.75, 
    bike: 20, 
    run: 5,
    swimRatio: BASE_SWIM_RATIO * (0.75 / 1.5),
    bikeRatio: BASE_BIKE_RATIO * (20 / 40),
    runRatio: BASE_RUN_RATIO * (5 / 10)
  },
  'M': { 
    name: 'M - Olympique', 
    swim: 1.5, 
    bike: 40, 
    run: 10,
    // Base ratios for Olympic distance
    swimRatio: BASE_SWIM_RATIO,
    bikeRatio: BASE_BIKE_RATIO,
    runRatio: BASE_RUN_RATIO
  },
  'L': { 
    name: 'L - Half Ironman', 
    swim: 1.9, 
    bike: 90, 
    run: 21.1,
    swimRatio: BASE_SWIM_RATIO * (1.9 / 1.5),
    bikeRatio: BASE_BIKE_RATIO * (90 / 40),
    runRatio: BASE_RUN_RATIO * (21.1 / 10)
  },
  'XL': { 
    name: 'XL - Ironman', 
    swim: 3.8, 
    bike: 180, 
    run: 42.2,
    swimRatio: BASE_SWIM_RATIO * (3.8 / 1.5),
    bikeRatio: BASE_BIKE_RATIO * (180 / 40),
    runRatio: BASE_RUN_RATIO * (42.2 / 10)
  },
};

export const TriathlonCalculator = () => {
  const [selectedDistance, setSelectedDistance] = useState<string>('M');
  const [totalTime, setTotalTime] = useState<string>('');
  const [transitionTime, setTransitionTime] = useState<string>('05:00');
  const [swimTime, setSwimTime] = useState<string>('');
  const [bikeTime, setBikeTime] = useState<string>('');
  const [runTime, setRunTime] = useState<string>('');
  const { t } = useTranslation();

  const timeStringToMinutes = (timeString: string): number => {
    if (!timeString) return 0;
    const [hours = '0', minutes = '0', seconds = '0'] = timeString.split(':');
    return parseInt(hours) * 60 + parseInt(minutes) + parseInt(seconds) / 60;
  };

  const minutesToTimeString = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    const seconds = Math.round((totalMinutes % 1) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const calculateSplitTimes = () => {
    console.log('Calculating split times with total time:', totalTime);
    if (!totalTime) {
      setSwimTime('');
      setBikeTime('');
      setRunTime('');
      return;
    }

    const totalMinutes = timeStringToMinutes(totalTime);
    const transitionMinutes = timeStringToMinutes(transitionTime) * 2; // Deux transitions
    const activeTime = totalMinutes - transitionMinutes;

    console.log('Active time (minus transitions):', activeTime);

    if (activeTime <= 0) {
      setSwimTime('');
      setBikeTime('');
      setRunTime('');
      return;
    }

    const distance = TRIATHLON_DISTANCES[selectedDistance];
    
    // Calcul des temps basé sur les ratios ajustés pour chaque distance
    const totalRatio = distance.swimRatio + distance.bikeRatio + distance.runRatio;
    const swimMinutes = (activeTime * distance.swimRatio) / totalRatio;
    const bikeMinutes = (activeTime * distance.bikeRatio) / totalRatio;
    const runMinutes = (activeTime * distance.runRatio) / totalRatio;

    console.log('Calculated times:', {
      swim: swimMinutes,
      bike: bikeMinutes,
      run: runMinutes,
      total: swimMinutes + bikeMinutes + runMinutes,
      activeTime,
      ratios: {
        swim: distance.swimRatio,
        bike: distance.bikeRatio,
        run: distance.runRatio,
        total: totalRatio
      }
    });

    setSwimTime(minutesToTimeString(swimMinutes));
    setBikeTime(minutesToTimeString(bikeMinutes));
    setRunTime(minutesToTimeString(runMinutes));
  };

  const handleTotalTimeChange = (newTime: string) => {
    setTotalTime(newTime);
    console.log('Total time changed to:', newTime);
  };

  const handleTransitionTimeChange = (newTime: string) => {
    setTransitionTime(newTime);
    console.log('Transition time changed to:', newTime);
  };

  useEffect(() => {
    calculateSplitTimes();
  }, [totalTime, transitionTime, selectedDistance]);

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Calculateur Triathlon</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Distance</Label>
          <Select value={selectedDistance} onValueChange={setSelectedDistance}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez une distance" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(TRIATHLON_DISTANCES).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="totalTime">Temps Total Estimé</Label>
          <TimeInput
            id="totalTime"
            value={totalTime}
            onChange={handleTotalTimeChange}
            placeholder="00:00:00"
            className="text-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="transitionTime">Temps de Transition</Label>
          <TimeInput
            id="transitionTime"
            value={transitionTime}
            onChange={handleTransitionTimeChange}
            placeholder="05:00"
            className="text-lg"
          />
          <p className="text-sm text-muted-foreground">Temps par transition (x2)</p>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <div className="space-y-2">
            <Label>Natation ({TRIATHLON_DISTANCES[selectedDistance].swim} km)</Label>
            <TimeInput
              value={swimTime}
              onChange={() => {}}
              readOnly
              className="text-lg font-bold bg-secondary/20"
            />
          </div>

          <div className="space-y-2">
            <Label>Vélo ({TRIATHLON_DISTANCES[selectedDistance].bike} km)</Label>
            <TimeInput
              value={bikeTime}
              onChange={() => {}}
              readOnly
              className="text-lg font-bold bg-secondary/20"
            />
          </div>

          <div className="space-y-2">
            <Label>Course à pied ({TRIATHLON_DISTANCES[selectedDistance].run} km)</Label>
            <TimeInput
              value={runTime}
              onChange={() => {}}
              readOnly
              className="text-lg font-bold bg-secondary/20"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};