import { useState } from 'react';

interface Props {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  categories: string[];
}

export default function SearchFilterBar({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  categories,
}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <section className="px-6 lg:px-20 -mt-7 relative z-20">
      <div className="bg-white rounded-2xl p-5 shadow-xl shadow-black/5 flex flex-col lg:flex-row gap-4 items-center border border-gray-100">
        {/* Search input */}
        <div
          className={`flex-1 flex items-center bg-gray-50 rounded-xl px-4 border border-gray-200 transition-all w-full ${focused ? 'lg:max-w-sm' : 'lg:max-w-xs'}`}
        >
          <span className="material-symbols-outlined text-gray-400">search</span>
          <input
            className="w-full bg-transparent border-none focus:ring-0 py-3 text-sm outline-none"
            placeholder="Search POCs by keyword..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
          {categories.map((cat) => {
            const isActive = cat === activeFilter;
            return (
              <button
                key={cat}
                onClick={() => onFilterChange(cat)}
                className={`filter-pill px-4 py-2 rounded-full text-xs font-semibold transition-all relative
                  ${
                    isActive
                      ? 'filter-pill--active bg-black text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                {cat}
                {isActive && cat !== 'All POCs' && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-brand-red rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
