import type { ProductionDataPoint, ProductionSummary, KeyMetrics } from '../types';

export const historicalProduction: ProductionDataPoint[] = [
  { year: 1998, production: 3500 },
  { year: 2000, production: 3200 },
  { year: 2002, production: 2900 },
  { year: 2004, production: 2600 },
  { year: 2006, production: 2500 },
  { year: 2008, production: 2400 },
  { year: 2010, production: 2300 },
  { year: 2012, production: 2100 },
  { year: 2013, production: 2000 },
  { year: 2014, production: 2300 },
  { year: 2015, production: 2200 },
  { year: 2016, production: 2100 },
  { year: 2017, production: 1900 },
  { year: 2018, production: 1400 },
  { year: 2019, production: 1000 },
  { year: 2020, production: 500 },
  { year: 2021, production: 600 },
  { year: 2022, production: 700 },
  { year: 2023, production: 800 },
  { year: 2024, production: 900 },
  { year: 2025, production: 1000 },
];

export const productionSummary: ProductionSummary = {
  current: 1000,
  peak: 3500,
  preMaduro: 2000,
  capacityUtilization: 28.6,
};

export const keyMetrics: KeyMetrics = {
  reserves: {
    amount: 303,
    globalShare: 20,
  },
  production: {
    current: 1.0,
    change: -71.4, // from peak of 3.5M
  },
  exports: {
    volume: 0.5,
    mainDestinations: ['China', 'India', 'Cuba'],
  },
  crudePrice: {
    current: 72,
    change: 1.2,
    benchmark: 'Merey',
  },
};
