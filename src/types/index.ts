// Production Data Types
export interface ProductionDataPoint {
  year: number;
  production: number; // thousands of barrels per day
}

export interface ProductionSummary {
  current: number;      // current production in thousands bpd
  peak: number;         // peak historical production
  preMaduro: number;    // 2013 production level
  capacityUtilization: number; // percentage
}

// Refinery Types
export type RefineryStatus = 'operational' | 'reduced' | 'offline' | 'maintenance';

export interface Refinery {
  id: string;
  name: string;
  location: string;
  capacity: number;        // thousands of barrels per day
  currentOutput: number;   // thousands of barrels per day
  status: RefineryStatus;
  lastUpdated: string;     // ISO date string
}

// News Types
export type NewsCategory = 'production' | 'infrastructure' | 'policy' | 'market' | 'all';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;     // ISO date string
  category: Exclude<NewsCategory, 'all'>;
  url: string;
}

// Key Metrics Types
export interface KeyMetrics {
  reserves: {
    amount: number;        // billion barrels
    globalShare: number;   // percentage
  };
  production: {
    current: number;       // million bpd
    change: number;        // percentage change from peak
  };
  exports: {
    volume: number;        // million bpd
    mainDestinations: string[];
  };
  crudePrice: {
    current: number;       // USD per barrel
    change: number;        // percentage daily change
    benchmark: string;
  };
}
