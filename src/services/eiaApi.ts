import type { ProductionDataPoint, ProductionSummary, KeyMetrics } from '../types';
import { historicalProduction, productionSummary, keyMetrics } from '../data/productionData';

const API_ENDPOINT = '/api/production';
const CACHE_KEY = 'eia_production_data';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour (server caches for 24h, client refreshes more often)

interface ApiResponse {
  production: ProductionDataPoint[];
  summary: ProductionSummary;
  metrics: KeyMetrics;
  source: 'api';
}

interface CachedData {
  timestamp: number;
  production: ProductionDataPoint[];
  summary: ProductionSummary;
  metrics: KeyMetrics;
}

function getCachedData(): CachedData | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const data: CachedData = JSON.parse(cached);
    const isExpired = Date.now() - data.timestamp > CACHE_TTL;

    if (isExpired) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

function setCachedData(data: Omit<CachedData, 'timestamp'>): void {
  try {
    const cacheEntry: CachedData = {
      ...data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheEntry));
  } catch {
    // Storage full or unavailable
  }
}

export async function fetchProductionData(): Promise<{
  production: ProductionDataPoint[];
  summary: ProductionSummary;
  metrics: KeyMetrics;
  source: 'api' | 'cache' | 'fallback';
}> {
  // Check cache first
  const cached = getCachedData();
  if (cached) {
    return {
      production: cached.production,
      summary: cached.summary,
      metrics: cached.metrics,
      source: 'cache',
    };
  }

  try {
    const response = await fetch(API_ENDPOINT);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    if (!data.production || data.production.length === 0) {
      throw new Error('No production data returned from API');
    }

    // Cache the results
    setCachedData({
      production: data.production,
      summary: data.summary,
      metrics: data.metrics,
    });

    return {
      production: data.production,
      summary: data.summary,
      metrics: data.metrics,
      source: 'api',
    };
  } catch (error) {
    console.error('Failed to fetch production data:', error);
    return {
      production: historicalProduction,
      summary: productionSummary,
      metrics: keyMetrics,
      source: 'fallback',
    };
  }
}

export function clearCache(): void {
  localStorage.removeItem(CACHE_KEY);
}
