import { Header } from './components/common/Header';
import { KeyMetricsPanel } from './components/metrics/KeyMetricsPanel';
import { ProductionDashboard } from './components/dashboard/ProductionDashboard';
import { RefineryStatusTracker } from './components/refineries/RefineryStatusTracker';
import { NewsFeed } from './components/news/NewsFeed';

function App() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Key Metrics */}
        <section className="mb-8">
          <KeyMetricsPanel />
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Production & Refineries */}
          <div className="lg:col-span-2 space-y-6">
            <ProductionDashboard />
            <RefineryStatusTracker />
          </div>

          {/* Right Column - News Feed */}
          <div className="lg:col-span-1">
            <NewsFeed />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-neutral-200 text-center text-sm text-neutral-500">
          <p>Venezuela Energy Infrastructure Monitor</p>
          <p className="mt-1">
            Data sources: OPEC, EIA, PDVSA, Reuters, Bloomberg, S&P Global
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
