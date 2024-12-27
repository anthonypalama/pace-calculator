import React from 'react';
import { Input } from "@/components/ui/input";

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  readOnly?: boolean;
}

export const TimeInput = ({ 
  value, 
  onChange, 
  placeholder = "00:00:00", 
  className,
  id,
  readOnly = false
}: TimeInputProps) => {
  const formatTimeString = (input: string): string => {
    const numbers = input.replace(/\D/g, '');
    const limited = numbers.slice(0, 6);
    
    if (limited.length <= 2) {
      return limited;
    } else if (limited.length <= 4) {
      return `${limited.slice(0, 2)}:${limited.slice(2)}`;
    } else {
      return `${limited.slice(0, 2)}:${limited.slice(2, 4)}:${limited.slice(4)}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    const formatted = formatTimeString(e.target.value);
    onChange(formatted);
  };

  const handleBlur = () => {
    if (readOnly) return;
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
      readOnly={readOnly}
    />
  );
};