import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { ProductionDataPoint } from '../../types';

interface ProductionChartProps {
  data: ProductionDataPoint[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const value = payload[0].value;
  return (
    <div className="bg-white p-3 shadow-lg rounded-lg border border-slate-200">
      <p className="text-slate-600 text-sm font-medium">{label}</p>
      <p className="text-primary-600 font-bold text-lg">
        {(value / 1000).toFixed(2)}M bbl/day
      </p>
    </div>
  );
}

export function ProductionChart({ data }: ProductionChartProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="productionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="year"
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={{ stroke: '#e2e8f0' }}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={{ stroke: '#e2e8f0' }}
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}M`}
            domain={[0, 4000]}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={3500}
            stroke="#94a3b8"
            strokeDasharray="5 5"
            label={{
              value: 'Peak (3.5M)',
              position: 'right',
              fill: '#94a3b8',
              fontSize: 11,
            }}
          />
          <ReferenceLine
            y={2000}
            stroke="#cbd5e1"
            strokeDasharray="5 5"
            label={{
              value: '2013 Level',
              position: 'right',
              fill: '#cbd5e1',
              fontSize: 11,
            }}
          />
          <Area
            type="monotone"
            dataKey="production"
            stroke="#f97316"
            strokeWidth={2}
            fill="url(#productionGradient)"
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
