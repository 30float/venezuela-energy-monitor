import { useState, useMemo } from 'react';
import { Card } from '../common/Card';
import { NewsFilters } from './NewsFilters';
import { NewsCard } from './NewsCard';
import { mockNewsData } from '../../data/newsData';
import type { NewsCategory } from '../../types';

export function NewsFeed() {
  const [category, setCategory] = useState<NewsCategory>('all');

  const filteredNews = useMemo(() => {
    if (category === 'all') return mockNewsData;
    return mockNewsData.filter((item) => item.category === category);
  }, [category]);

  return (
    <Card title="Infrastructure News">
      <NewsFilters activeCategory={category} onCategoryChange={setCategory} />

      <div className="max-h-[600px] overflow-y-auto -mx-5 px-5">
        {filteredNews.length > 0 ? (
          filteredNews.map((news) => <NewsCard key={news.id} news={news} />)
        ) : (
          <div className="py-8 text-center text-neutral-500">
            No news available for this category.
          </div>
        )}
      </div>

      <p className="text-xs text-neutral-500 mt-4 pt-4 border-t border-neutral-100">
        News sources: Reuters, Bloomberg, S&P Global, Argus Media
      </p>
    </Card>
  );
}
