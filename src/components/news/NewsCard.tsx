import type { NewsItem, NewsCategory } from '../../types';
import { formatRelativeTime } from '../../utils/formatters';

interface NewsCardProps {
  news: NewsItem;
}

const categoryColors: Record<Exclude<NewsCategory, 'all'>, string> = {
  production: 'bg-neutral-900 text-white',
  infrastructure: 'bg-neutral-600 text-white',
  policy: 'bg-neutral-400 text-white',
  market: 'bg-neutral-200 text-neutral-700',
};

export function NewsCard({ news }: NewsCardProps) {
  return (
    <article className="p-4 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="font-medium text-neutral-900 leading-snug">{news.title}</h4>
        <span
          className={`shrink-0 px-2 py-0.5 text-xs font-medium rounded ${categoryColors[news.category]}`}
        >
          {news.category}
        </span>
      </div>
      <p className="text-sm text-neutral-600 line-clamp-2 mb-2">{news.summary}</p>
      <div className="flex items-center gap-2 text-xs text-neutral-500">
        <span className="font-medium">{news.source}</span>
        <span>•</span>
        <span>{formatRelativeTime(news.publishedAt)}</span>
      </div>
    </article>
  );
}
