import { Card } from '../common/Card';
import { ProductionChart } from './ProductionChart';
import { HistoricalComparison } from './HistoricalComparison';
import { CapacityGauge } from './CapacityGauge';
import { historicalProduction, productionSummary } from '../../data/productionData';

export function ProductionDashboard() {
  return (
    <div className="space-y-6">
      <Card title="Oil Production History (1998-2025)">
        <ProductionChart data={historicalProduction} />
        <p className="text-xs text-slate-500 mt-4">
          Source: OPEC Monthly Oil Market Reports, EIA estimates
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Production Comparison">
          <HistoricalComparison />
        </Card>

        <Card title="Capacity Utilization">
          <div className="flex items-center justify-center py-4">
            <CapacityGauge
              current={productionSummary.current}
              peak={productionSummary.peak}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
