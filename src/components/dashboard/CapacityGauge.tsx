interface CapacityGaugeProps {
  current: number;
  peak: number;
}

export function CapacityGauge({ current, peak }: CapacityGaugeProps) {
  const percentage = (current / peak) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <svg width="140" height="140" className="transform -rotate-90">
          <circle
            cx="70"
            cy="70"
            r="45"
            fill="none"
            stroke="#e5e5e5"
            strokeWidth="12"
          />
          <circle
            cx="70"
            cy="70"
            r="45"
            fill="none"
            stroke="#262626"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-semibold text-neutral-900">
            {percentage.toFixed(0)}%
          </span>
          <span className="text-xs text-neutral-500">of peak</span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-neutral-600">
          <span className="font-semibold text-neutral-900">{(current / 1000).toFixed(1)}M</span>
          {' / '}
          <span className="text-neutral-400">{(peak / 1000).toFixed(1)}M bbl/day</span>
        </p>
      </div>
    </div>
  );
}
