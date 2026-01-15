import { Card } from '../common/Card';
import { RefineryCard } from './RefineryCard';
import { refineries } from '../../data/refineryData';

export function RefineryStatusTracker() {
  const totalCapacity = refineries.reduce((sum, r) => sum + r.capacity, 0);
  const totalOutput = refineries.reduce((sum, r) => sum + r.currentOutput, 0);
  const overallUtilization = ((totalOutput / totalCapacity) * 100).toFixed(1);

  return (
    <Card title="Refinery Status">
      <div className="mb-4 p-3 bg-neutral-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm text-neutral-600">Total Refining Output</span>
          <span className="font-semibold text-neutral-900">
            {totalOutput}K / {totalCapacity}K bbl/d ({overallUtilization}%)
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {refineries.map((refinery) => (
          <RefineryCard key={refinery.id} refinery={refinery} />
        ))}
      </div>

      <p className="text-xs text-neutral-500 mt-4">
        Source: PDVSA operational reports, industry estimates
      </p>
    </Card>
  );
}
