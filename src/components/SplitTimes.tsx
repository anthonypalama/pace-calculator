interface SplitTimesProps {
  splits: string[];
  show: boolean;
}

export const SplitTimes = ({ splits, show }: SplitTimesProps) => {
  if (!show || splits.length === 0) return null;

  return (
    <div className="mt-4 space-y-2">
      <h3 className="font-semibold">Temps de passage :</h3>
      <div className="max-h-60 overflow-y-auto space-y-1">
        {splits.map((split, index) => (
          <div key={index} className="text-sm p-2 bg-secondary/10 rounded">
            {split}
          </div>
        ))}
      </div>
    </div>
  );
};