import type { NewsCategory } from '../../types';

interface NewsFiltersProps {
  activeCategory: NewsCategory;
  onCategoryChange: (category: NewsCategory) => void;
}

const categories: { value: NewsCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'production', label: 'Production' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'policy', label: 'Policy' },
  { value: 'market', label: 'Market' },
];

export function NewsFilters({ activeCategory, onCategoryChange }: NewsFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onCategoryChange(cat.value)}
          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
            activeCategory === cat.value
              ? 'bg-primary-500 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
