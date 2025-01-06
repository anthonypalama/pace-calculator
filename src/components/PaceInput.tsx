import React from 'react';
import { Input } from "@/components/ui/input";

interface PaceInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  readOnly?: boolean;
}

export const PaceInput = ({ 
  value, 
  onChange, 
  placeholder = "00:00", 
  className,
  id,
  readOnly = false
}: PaceInputProps) => {
  const formatPaceString = (input: string): string => {
    // Supprime tous les caractères non numériques sauf ":"
    const numbers = input.replace(/[^\d:]/g, '');
    
    // Si on a déjà un ":", on ne garde que les 2 premiers chiffres avant et après
    if (numbers.includes(':')) {
      const [minutes, seconds] = numbers.split(':');
      const formattedMinutes = minutes.slice(0, 2);
      const formattedSeconds = seconds?.slice(0, 2) || '';
      
      // Vérifie que les secondes ne dépassent pas 59
      if (formattedSeconds && parseInt(formattedSeconds) > 59) {
        return `${formattedMinutes}:59`;
      }
      
      return `${formattedMinutes}${formattedSeconds ? ':' + formattedSeconds : ''}`;
    }
    
    // Si pas de ":", on formate comme minutes
    const minutes = numbers.slice(0, 2);
    return minutes;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    
    let newValue = e.target.value;
    
    // Ajoute automatiquement ":" après les minutes si on tape un troisième chiffre
    if (newValue.length === 2 && !newValue.includes(':') && value.length < 2) {
      newValue += ':';
    }
    
    const formatted = formatPaceString(newValue);
    onChange(formatted);
  };

  const handleBlur = () => {
    if (readOnly) return;
    
    if (value.length > 0) {
      const [minutes, seconds] = value.split(':');
      const formattedMinutes = minutes?.padStart(2, '0') || '00';
      const formattedSeconds = seconds?.padStart(2, '0') || '00';
      onChange(`${formattedMinutes}:${formattedSeconds}`);
    }
  };

  return (
    <Input
      id={id}
      type="text"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      className={className}
      maxLength={5}
      readOnly={readOnly}
    />
  );
};