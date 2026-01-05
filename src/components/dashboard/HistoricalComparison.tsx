import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const comparisonData = [
  { name: 'Peak (1998)', value: 3500, color: '#94a3b8' },
  { name: 'Pre-2013', value: 2000, color: '#64748b' },
  { name: 'Current', value: 1000, color: '#f97316' },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { name: string } }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white p-3 shadow-lg rounded-lg border border-slate-200">
      <p className="text-slate-600 text-sm font-medium">{payload[0].payload.name}</p>
      <p className="text-slate-800 font-bold text-lg">
        {(payload[0].value / 1000).toFixed(1)}M bbl/day
      </p>
    </div>
  );
}

export function HistoricalComparison() {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={comparisonData} layout="vertical" margin={{ left: 20, right: 30 }}>
          <XAxis
            type="number"
            tickFormatter={(v) => `${(v / 1000).toFixed(1)}M`}
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={{ stroke: '#e2e8f0' }}
            domain={[0, 4000]}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={80}
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={{ stroke: '#e2e8f0' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={800}>
            {comparisonData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
