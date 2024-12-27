import { Button } from "@/components/ui/button";

interface QuickDistanceButtonsProps {
  onSelect: (value: string) => void;
  selectedValue?: string;
}

export const QuickDistanceButtons = ({ onSelect, selectedValue }: QuickDistanceButtonsProps) => {
  const quickDistances = [
    { name: '5K', value: '5' },
    { name: '10K', value: '10' },
    { name: 'Semi', value: '21.1' },
    { name: 'Marathon', value: '42.2' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {quickDistances.map((qd) => (
        <Button
          key={qd.name}
          variant={selectedValue === qd.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelect(qd.value)}
        >
          {qd.name}
        </Button>
      ))}
    </div>
  );
};