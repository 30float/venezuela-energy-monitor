import type { Refinery, RefineryStatus } from '../../types';
import { CapacityBar } from './CapacityBar';
import { formatDate } from '../../utils/formatters';

interface RefineryCardProps {
  refinery: Refinery;
}

const statusConfig: Record<RefineryStatus, { label: string; color: string; bgColor: string }> = {
  operational: {
    label: 'Operational',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
  },
  reduced: {
    label: 'Reduced Capacity',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
  },
  maintenance: {
    label: 'Maintenance',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
  },
  offline: {
    label: 'Offline',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
  },
};

export function RefineryCard({ refinery }: RefineryCardProps) {
  const status = statusConfig[refinery.status];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold text-slate-800">{refinery.name}</h4>
          <p className="text-sm text-slate-500">{refinery.location}</p>
        </div>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.color} ${status.bgColor}`}
        >
          {status.label}
        </span>
      </div>

      <CapacityBar current={refinery.currentOutput} capacity={refinery.capacity} />

      <p className="text-xs text-slate-400 mt-3">
        Last updated: {formatDate(refinery.lastUpdated)}
      </p>
    </div>
  );
}
