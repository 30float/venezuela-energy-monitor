import { useState, useEffect, useCallback } from 'react';
import type { ProductionDataPoint, ProductionSummary, KeyMetrics } from '../types';
import { fetchProductionData, clearCache } from '../services/eiaApi';
import { historicalProduction, productionSummary, keyMetrics } from '../data/productionData';

interface ProductionDataState {
  production: ProductionDataPoint[];
  summary: ProductionSummary;
  metrics: KeyMetrics;
  isLoading: boolean;
  error: string | null;
  source: 'api' | 'cache' | 'fallback' | 'initial';
}

export function useProductionData() {
  const [state, setState] = useState<ProductionDataState>({
    production: historicalProduction,
    summary: productionSummary,
    metrics: keyMetrics,
    isLoading: true,
    error: null,
    source: 'initial',
  });

  const loadData = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await fetchProductionData();
      setState({
        production: result.production,
        summary: result.summary,
        metrics: result.metrics,
        isLoading: false,
        error: null,
        source: result.source,
      });
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to load data',
        source: 'fallback',
      }));
    }
  }, []);

  const refresh = useCallback(async () => {
    clearCache();
    await loadData();
  }, [loadData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    ...state,
    refresh,
  };
}
