import type { ReactNode } from 'react';

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  subValue?: string;
  trend?: {
    value: number;
    isPositive?: boolean;
  };
}

export function MetricCard({ icon, label, value, subValue, trend }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-start gap-4">
      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm text-slate-500 truncate">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <div className="flex items-center gap-2 mt-1">
          {subValue && <span className="text-sm text-slate-600">{subValue}</span>}
          {trend && (
            <span
              className={`text-sm font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.value >= 0 ? '+' : ''}
              {trend.value.toFixed(1)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
