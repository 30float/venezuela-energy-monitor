import type { NewsItem, NewsCategory } from '../../types';
import { formatRelativeTime } from '../../utils/formatters';

interface NewsCardProps {
  news: NewsItem;
}

const categoryColors: Record<Exclude<NewsCategory, 'all'>, string> = {
  production: 'bg-orange-100 text-orange-700',
  infrastructure: 'bg-blue-100 text-blue-700',
  policy: 'bg-purple-100 text-purple-700',
  market: 'bg-green-100 text-green-700',
};

export function NewsCard({ news }: NewsCardProps) {
  return (
    <article className="p-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="font-medium text-slate-800 leading-snug">{news.title}</h4>
        <span
          className={`shrink-0 px-2 py-0.5 text-xs font-medium rounded ${categoryColors[news.category]}`}
        >
          {news.category}
        </span>
      </div>
      <p className="text-sm text-slate-600 line-clamp-2 mb-2">{news.summary}</p>
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span className="font-medium">{news.source}</span>
        <span>•</span>
        <span>{formatRelativeTime(news.publishedAt)}</span>
      </div>
    </article>
  );
}
