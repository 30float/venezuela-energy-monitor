import { keyMetrics } from '../../data/productionData';
import { MetricCard } from './MetricCard';

export function KeyMetricsPanel() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        }
        label="Proven Reserves"
        value={`${keyMetrics.reserves.amount}B bbl`}
        subValue={`${keyMetrics.reserves.globalShare}% of global`}
      />

      <MetricCard
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        }
        label="Current Production"
        value={`${keyMetrics.production.current}M bpd`}
        trend={{ value: keyMetrics.production.change, isPositive: false }}
        subValue="from peak"
      />

      <MetricCard
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
            />
          </svg>
        }
        label="Export Volume"
        value={`${keyMetrics.exports.volume}M bpd`}
        subValue={keyMetrics.exports.mainDestinations.join(', ')}
      />

      <MetricCard
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        label={`${keyMetrics.crudePrice.benchmark} Crude`}
        value={`$${keyMetrics.crudePrice.current}/bbl`}
        trend={{ value: keyMetrics.crudePrice.change, isPositive: true }}
      />
    </div>
  );
}
