import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Share2, Pencil } from "lucide-react";
import { getBestVmaEstimate } from "@/utils/vmaCalculator";
import { toast } from "sonner";

interface RecordsCardProps {
  records: Record<string, string>;
  isEditing: boolean;
  onSaveRecord: (distance: string, time: string) => void;
  onShare: (distance: string, time: string) => void;
  setIsEditing: (value: boolean) => void;
}

export const RecordsCard = ({ records, isEditing, onSaveRecord, onShare, setIsEditing }: RecordsCardProps) => {
  const estimates = getBestVmaEstimate(records);

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-semibold text-[#8B5CF6]">Records Personnels</h3>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="ghost"
            className="hover:bg-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
          >
            {isEditing ? "Sauvegarder" : "Modifier les records"}
            <Pencil className="h-4 w-4 ml-2" />
          </Button>
        </div>
        {estimates && (
          <div className="text-sm text-gray-600">
            <p>VMA estimée: {estimates.vma} km/h</p>
            <p>VO2max estimée: {estimates.vo2max} ml/kg/min</p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {Object.entries(records).map(([distance, time]) => (
          <div key={distance} className="p-3 bg-[#D3E4FD] rounded-lg">
            <div className="text-sm text-gray-600">{distance}</div>
            {isEditing ? (
              <Input
                value={time}
                onChange={(e) => onSaveRecord(distance, e.target.value)}
                className="mt-1"
                placeholder="hh:mm:ss"
              />
            ) : (
              <div className="font-semibold text-[#8B5CF6] flex items-center justify-between">
                {time}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onShare(distance, time)}
                  className="ml-2"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};