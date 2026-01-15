import { Card } from '../common/Card';
import { ProductionChart } from './ProductionChart';
import { HistoricalComparison } from './HistoricalComparison';
import { CapacityGauge } from './CapacityGauge';
import { useProductionDataContext } from '../../context/ProductionDataContext';

export function ProductionDashboard() {
  const { production, summary, isLoading, source } = useProductionDataContext();

  const yearRange = production.length > 0
    ? `${production[0].year}-${production[production.length - 1].year}`
    : '1998-2025';

  return (
    <div className="space-y-6">
      <Card title={`Oil Production History (${yearRange})`}>
        {isLoading ? (
          <div className="h-72 flex items-center justify-center">
            <div className="text-neutral-500">Loading production data...</div>
          </div>
        ) : (
          <ProductionChart data={production} />
        )}
        <p className="text-xs text-neutral-500 mt-4">
          Source: {source === 'api' ? 'EIA API (live)' : source === 'cache' ? 'EIA API (cached)' : 'OPEC Monthly Oil Market Reports, EIA estimates'}
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Production Comparison">
          <HistoricalComparison />
        </Card>

        <Card title="Capacity Utilization">
          <div className="flex items-center justify-center py-4">
            <CapacityGauge
              current={summary.current}
              peak={summary.peak}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
