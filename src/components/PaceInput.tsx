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
    // Supprime tous les caractères non numériques
    const numbers = input.replace(/[^\d]/g, '');
    
    // Si on a moins de 2 caractères, on retourne juste les chiffres
    if (numbers.length <= 2) {
      return numbers;
    }
    
    // Si on a plus de 2 caractères, on formate en MM:SS
    const minutes = numbers.slice(0, 2);
    const seconds = numbers.slice(2, 4);
    
    // Vérifie que les secondes ne dépassent pas 59
    if (seconds && parseInt(seconds) > 59) {
      return `${minutes}:59`;
    }
    
    if (seconds) {
      return `${minutes}:${seconds}`;
    }
    
    return minutes;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    
    let newValue = e.target.value;
    console.log("Input value:", newValue);
    
    // Si l'utilisateur tape ":", on l'ignore
    if (newValue.endsWith(':')) {
      return;
    }
    
    // Ajoute automatiquement ":" après les minutes
    if (newValue.length === 2 && !newValue.includes(':') && value.length < 2) {
      newValue += ':';
    }
    
    const formatted = formatPaceString(newValue);
    console.log("Formatted value:", formatted);
    onChange(formatted);
  };

  const handleBlur = () => {
    if (readOnly) return;
    
    if (value && !value.includes(':')) {
      // Si on n'a que les minutes, on ajoute automatiquement :00
      const formatted = `${value.padStart(2, '0')}:00`;
      onChange(formatted);
    } else if (value.includes(':')) {
      // Complète avec des zéros si nécessaire
      const [minutes, seconds] = value.split(':');
      const formatted = `${minutes.padStart(2, '0')}:${(seconds || '00').padStart(2, '0')}`;
      onChange(formatted);
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