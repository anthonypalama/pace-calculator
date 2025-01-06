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
    const numbers = input.replace(/\D/g, '');
    const limited = numbers.slice(0, 4);
    
    if (limited.length <= 2) {
      return limited;
    } else {
      const minutes = limited.slice(0, 2);
      const seconds = limited.slice(2);
      
      // Vérifie que les secondes ne dépassent pas 59
      if (seconds && parseInt(seconds) > 59) {
        return `${minutes}:59`;
      }
      
      return `${minutes}:${seconds}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    console.log("Input value:", e.target.value);
    const formatted = formatPaceString(e.target.value);
    onChange(formatted);
  };

  const handleBlur = () => {
    if (readOnly) return;
    if (value.length > 0) {
      const parts = value.split(':');
      const minutes = parts[0]?.padStart(2, '0') || '00';
      const seconds = parts[1]?.padStart(2, '0') || '00';
      
      // Vérifie que les secondes ne dépassent pas 59
      const finalSeconds = parseInt(seconds) > 59 ? '59' : seconds;
      onChange(`${minutes}:${finalSeconds}`);
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