import React from 'react';
import { Input } from "@/components/ui/input";

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

export const TimeInput = ({ value, onChange, placeholder = "00:00:00", className, id }: TimeInputProps) => {
  const formatTimeString = (input: string): string => {
    // Supprimer tout ce qui n'est pas un chiffre
    const numbers = input.replace(/\D/g, '');
    
    // Limiter à 6 chiffres maximum
    const limited = numbers.slice(0, 6);
    
    // Ajouter les deux-points aux bons endroits
    if (limited.length <= 2) {
      return limited;
    } else if (limited.length <= 4) {
      return `${limited.slice(0, 2)}:${limited.slice(2)}`;
    } else {
      return `${limited.slice(0, 2)}:${limited.slice(2, 4)}:${limited.slice(4)}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatTimeString(e.target.value);
    onChange(formatted);
  };

  const handleBlur = () => {
    // Compléter avec des zéros si nécessaire
    if (value.length > 0 && value.length < 8) {
      const parts = value.split(':');
      const hours = parts[0]?.padStart(2, '0') || '00';
      const minutes = parts[1]?.padStart(2, '0') || '00';
      const seconds = parts[2]?.padStart(2, '0') || '00';
      onChange(`${hours}:${minutes}:${seconds}`);
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
      maxLength={8}
    />
  );
};