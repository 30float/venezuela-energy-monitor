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
    <div className="bg-white p-3 shadow-lg rounded-lg border border-neutral-200">
      <p className="text-neutral-500 text-sm font-medium">{label}</p>
      <p className="text-neutral-900 font-semibold text-lg">
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
              <stop offset="5%" stopColor="#171717" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#171717" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="year"
            tick={{ fill: '#737373', fontSize: 12 }}
            axisLine={{ stroke: '#e5e5e5' }}
            tickLine={{ stroke: '#e5e5e5' }}
          />
          <YAxis
            tick={{ fill: '#737373', fontSize: 12 }}
            axisLine={{ stroke: '#e5e5e5' }}
            tickLine={{ stroke: '#e5e5e5' }}
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}M`}
            domain={[0, 4000]}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={3500}
            stroke="#a3a3a3"
            strokeDasharray="5 5"
            label={{
              value: 'Peak (3.5M)',
              position: 'right',
              fill: '#a3a3a3',
              fontSize: 11,
            }}
          />
          <ReferenceLine
            y={2000}
            stroke="#d4d4d4"
            strokeDasharray="5 5"
            label={{
              value: '2013 Level',
              position: 'right',
              fill: '#d4d4d4',
              fontSize: 11,
            }}
          />
          <Area
            type="monotone"
            dataKey="production"
            stroke="#262626"
            strokeWidth={2}
            fill="url(#productionGradient)"
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
