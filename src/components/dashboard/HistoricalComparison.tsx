import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useProductionDataContext } from '../../context/ProductionDataContext';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { name: string } }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white p-3 shadow-lg rounded-lg border border-neutral-200">
      <p className="text-neutral-500 text-sm font-medium">{payload[0].payload.name}</p>
      <p className="text-neutral-900 font-semibold text-lg">
        {(payload[0].value / 1000).toFixed(1)}M bbl/day
      </p>
    </div>
  );
}

export function HistoricalComparison() {
  const { summary } = useProductionDataContext();

  const comparisonData = [
    { name: 'Peak', value: summary.peak, color: '#a3a3a3' },
    { name: 'Pre-2013', value: summary.preMaduro, color: '#525252' },
    { name: 'Current', value: summary.current, color: '#171717' },
  ];

  const maxValue = Math.max(summary.peak, 4000);

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={comparisonData} layout="vertical" margin={{ left: 20, right: 30 }}>
          <XAxis
            type="number"
            tickFormatter={(v) => `${(v / 1000).toFixed(1)}M`}
            tick={{ fill: '#737373', fontSize: 12 }}
            axisLine={{ stroke: '#e5e5e5' }}
            domain={[0, maxValue]}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={80}
            tick={{ fill: '#737373', fontSize: 12 }}
            axisLine={{ stroke: '#e5e5e5' }}
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
