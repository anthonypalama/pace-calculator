interface TimeComponents {
  hours: number;
  minutes: number;
  seconds: number;
}

export const parseTime = (timeString: string): TimeComponents => {
  const [hours = '0', minutes = '0', seconds = '0'] = timeString.split(':');
  return {
    hours: parseInt(hours),
    minutes: parseInt(minutes),
    seconds: parseInt(seconds)
  };
};

export const timeToSeconds = (time: TimeComponents): number => {
  return time.hours * 3600 + time.minutes * 60 + time.seconds;
};

export const calculateVmaFromRecord = (distance: number, timeString: string): number => {
  const time = parseTime(timeString);
  const totalSeconds = timeToSeconds(time);
  
  // Vitesse en km/h
  const speed = (distance / totalSeconds) * 3600;
  
  // Formule de Léger-Boucher pour estimer la VMA
  const vma = speed * 1.1;
  
  return Math.round(vma * 10) / 10;
};

export const calculateVo2maxFromVma = (vma: number): number => {
  return Math.round(vma * 3.5 * 10) / 10;
};

export const getBestVmaEstimate = (records: Record<string, string>): { vma: number; vo2max: number } | null => {
  const estimates: { distance: number; time: string }[] = [];
  
  // Convertir les distances en kilomètres
  Object.entries(records).forEach(([distance, time]) => {
    let distanceInKm = 0;
    if (distance.includes('km')) {
      distanceInKm = parseFloat(distance);
    } else if (distance === '1 mile') {
      distanceInKm = 1.60934;
    }
    
    if (distanceInKm > 0) {
      estimates.push({ distance: distanceInKm, time });
    }
  });
  
  if (estimates.length === 0) return null;
  
  // Calculer la VMA pour chaque record
  const vmaEstimates = estimates.map(({ distance, time }) => 
    calculateVmaFromRecord(distance, time)
  );
  
  // Prendre la meilleure VMA estimée
  const bestVma = Math.max(...vmaEstimates);
  const vo2max = calculateVo2maxFromVma(bestVma);
  
  return { vma: bestVma, vo2max };
};