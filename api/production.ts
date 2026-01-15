export const config = {
  runtime: 'edge',
};

const EIA_BASE_URL = 'https://api.eia.gov/v2/international/data';
const CACHE_MAX_AGE = 86400; // 24 hours in seconds

interface EIADataPoint {
  period: string;
  productName: string;
  activityName: string;
  countryRegionId: string;
  countryRegionName: string;
  unit: string;
  value: number;
}

interface EIAResponse {
  response: {
    data: EIADataPoint[];
    total: number;
  };
}

interface ProductionDataPoint {
  year: number;
  production: number;
}

interface ProductionSummary {
  current: number;
  peak: number;
  preMaduro: number;
  capacityUtilization: number;
}

interface KeyMetrics {
  reserves: { amount: number; globalShare: number };
  production: { current: number; change: number };
  exports: { volume: number; mainDestinations: string[] };
  crudePrice: { current: number; change: number; benchmark: string };
}

function transformEIAData(data: EIADataPoint[]): ProductionDataPoint[] {
  const productionByYear = new Map<number, number>();

  for (const point of data) {
    if (point.unit === 'TBPD' && point.activityName === 'Production') {
      const year = parseInt(point.period.substring(0, 4), 10);
      const existing = productionByYear.get(year);
      if (!existing || point.period > String(year)) {
        productionByYear.set(year, point.value);
      }
    }
  }

  return Array.from(productionByYear.entries())
    .map(([year, production]) => ({ year, production }))
    .sort((a, b) => a.year - b.year);
}

function calculateSummary(production: ProductionDataPoint[]): ProductionSummary {
  const current = production.length > 0
    ? production[production.length - 1].production
    : 0;
  const peak = Math.max(...production.map(p => p.production), 0);
  const preMaduro = production.find(p => p.year === 2013)?.production || 2000;
  const capacityUtilization = peak > 0 ? (current / peak) * 100 : 0;

  return {
    current,
    peak,
    preMaduro,
    capacityUtilization: Math.round(capacityUtilization * 10) / 10,
  };
}

function calculateKeyMetrics(production: ProductionDataPoint[]): KeyMetrics {
  const current = production.length > 0
    ? production[production.length - 1].production / 1000
    : 1.0;
  const peak = Math.max(...production.map(p => p.production), 3500) / 1000;
  const changeFromPeak = peak > 0 ? ((current - peak) / peak) * 100 : 0;

  return {
    reserves: { amount: 303, globalShare: 20 },
    production: {
      current: Math.round(current * 10) / 10,
      change: Math.round(changeFromPeak * 10) / 10,
    },
    exports: {
      volume: Math.round(current * 0.5 * 10) / 10,
      mainDestinations: ['China', 'India', 'Cuba'],
    },
    crudePrice: { current: 72, change: 1.2, benchmark: 'Merey' },
  };
}

export default async function handler(request: Request): Promise<Response> {
  // Only allow GET requests
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.EIA_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const params = new URLSearchParams({
      api_key: apiKey,
      'facets[countryRegionId][]': 'VEN',
      'facets[activityId][]': '1',
      'facets[unit][]': 'TBPD',
      frequency: 'annual',
      'data[]': 'value',
      'sort[0][column]': 'period',
      'sort[0][direction]': 'asc',
      start: '1998',
      length: '100',
    });

    const response = await fetch(`${EIA_BASE_URL}?${params}`);

    if (!response.ok) {
      throw new Error(`EIA API error: ${response.status}`);
    }

    const json: EIAResponse = await response.json();
    const production = transformEIAData(json.response.data);

    if (production.length === 0) {
      throw new Error('No production data returned from API');
    }

    const summary = calculateSummary(production);
    const metrics = calculateKeyMetrics(production);

    return new Response(
      JSON.stringify({
        production,
        summary,
        metrics,
        source: 'api',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': `public, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate`,
        },
      }
    );
  } catch (error) {
    console.error('EIA API error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch production data',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
