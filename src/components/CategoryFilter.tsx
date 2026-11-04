import React from 'react';
import { CategoryId } from '../types';
import { Search, X, Utensils, Coffee, Cookie, Sparkles } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: {
    all: number;
    makanan: number;
    minuman: number;
    cemilan: number;
  };
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  counts,
}) => {
  const categories: { id: CategoryId; label: string; icon: React.ReactNode; count: number }[] = [
    {
      id: 'all',
      label: 'Semua',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      count: counts.all,
    },
    {
      id: 'makanan',
      label: 'Makanan',
      icon: <Utensils className="w-3.5 h-3.5" />,
      count: counts.makanan,
    },
    {
      id: 'minuman',
      label: 'Minuman',
      icon: <Coffee className="w-3.5 h-3.5" />,
      count: counts.minuman,
    },
    {
      id: 'cemilan',
      label: 'Cemilan',
      icon: <Cookie className="w-3.5 h-3.5" />,
      count: counts.cemilan,
    },
  ];

  return (
    <div className="space-y-2.5">
      {/* Segmented Filter Control (Tabs di atas) */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/90 rounded-xl overflow-x-auto no-scrollbar border border-slate-200/80 dark:border-slate-700/80">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 min-h-[38px] ${
                isActive
                  ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs border border-slate-200/70 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <span className={isActive ? 'text-amber-500' : 'text-slate-400'}>{cat.icon}</span>
              <span>{cat.label}</span>
              <span
                className={`text-[11px] font-normal px-1.5 py-0.2 rounded-full tabular-nums ${
                  isActive
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                    : 'bg-slate-200/80 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Input Bar Kecil di Bawah Tab Kategori */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Search className="w-3.5 h-3.5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari nama makanan atau minuman secara instan..."
          className="w-full pl-9 pr-8 py-2 bg-white dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 placeholder-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all shadow-2xs"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Bersihkan pencarian"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
