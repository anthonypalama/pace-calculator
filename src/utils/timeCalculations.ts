export const calculateSpeedFromTime = (distance: number, hours: number, minutes: number, seconds: number) => {
  const totalHours = hours + minutes / 60 + seconds / 3600;
  return distance / totalHours;
};

export const calculatePaceFromSpeed = (speedKmH: number) => {
  const minPerKm = 60 / speedKmH;
  const paceMinutes = Math.floor(minPerKm);
  const paceSeconds = Math.round((minPerKm - paceMinutes) * 60);
  return `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`;
};

export const calculateSplitTimes = (distance: number, speedKmH: number) => {
  const timePerKm = 60 / speedKmH;
  const splits: string[] = [];
  
  for (let km = 1; km <= Math.ceil(distance); km++) {
    if (km > distance && km !== distance) continue;
    
    const timeAtKm = timePerKm * (km > distance ? distance : km);
    const hours = Math.floor(timeAtKm / 60);
    const minutes = Math.floor(timeAtKm % 60);
    const seconds = Math.round((timeAtKm * 60) % 60);
    
    splits.push(
      `${km > distance ? distance : km} km - ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    );
  }
  
  return splits;
};