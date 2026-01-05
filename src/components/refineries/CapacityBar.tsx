interface CapacityBarProps {
  current: number;
  capacity: number;
}

export function CapacityBar({ current, capacity }: CapacityBarProps) {
  const percentage = (current / capacity) * 100;

  const getColorClass = (pct: number) => {
    if (pct >= 70) return 'bg-green-500';
    if (pct >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-slate-600 mb-1">
        <span className="font-medium">{current}K bbl/d</span>
        <span className="text-slate-400">{capacity}K capacity</span>
      </div>
      <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColorClass(percentage)} transition-all duration-500 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-right text-xs text-slate-500 mt-1">
        {percentage.toFixed(1)}% utilization
      </div>
    </div>
  );
}
