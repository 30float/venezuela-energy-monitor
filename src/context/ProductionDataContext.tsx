import { createContext, useContext, type ReactNode } from 'react';
import { useProductionData } from '../hooks/useProductionData';
import type { ProductionDataPoint, ProductionSummary, KeyMetrics } from '../types';

interface ProductionDataContextValue {
  production: ProductionDataPoint[];
  summary: ProductionSummary;
  metrics: KeyMetrics;
  isLoading: boolean;
  error: string | null;
  source: 'api' | 'cache' | 'fallback' | 'initial';
  refresh: () => Promise<void>;
}

const ProductionDataContext = createContext<ProductionDataContextValue | null>(null);

export function ProductionDataProvider({ children }: { children: ReactNode }) {
  const data = useProductionData();

  return (
    <ProductionDataContext.Provider value={data}>
      {children}
    </ProductionDataContext.Provider>
  );
}

export function useProductionDataContext() {
  const context = useContext(ProductionDataContext);
  if (!context) {
    throw new Error('useProductionDataContext must be used within ProductionDataProvider');
  }
  return context;
}
