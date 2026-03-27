import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PocCard from '../components/PocCard';
import type { PocItem } from '../data/pocData';
import { getPocs, getCategories } from '../api/pocs';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function AllPocsPage() {
  const navigate = useNavigate();
  const scrollRef = useScrollAnimation();
  const [activeFilter, setActiveFilter] = useState('All POCs');
  const [searchQuery, setSearchQuery] = useState('');
  const [pocs, setPocs] = useState<PocItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['All POCs']);

  const fetchPocs = useCallback(async () => {
    try {
      const data = await getPocs({ domain: activeFilter, search: searchQuery });
      setPocs(data);
    } catch (err) {
      console.error('POC fetch error:', err);
    }
  }, [activeFilter, searchQuery]);

  useEffect(() => { fetchPocs(); }, [fetchPocs]);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  return (
    <div ref={scrollRef} className="min-h-screen bg-white">
      <Navbar />

      <main className="px-6 lg:px-20 pt-28 pb-20">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <button
                onClick={() => navigate('/portal')}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black mb-3 transition-colors"
              >
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Back to Portal
              </button>
              <h1
                className="text-3xl font-bold text-black"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                All POCs
              </h1>
              <p className="text-gray-500 text-sm mt-1">{pocs.length} projects found</p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-80">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                search
              </span>
              <input
                type="text"
                placeholder="Search POCs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition-all ${
                  activeFilter === cat
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* POC Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pocs.map((poc, i) => (
              <PocCard key={poc.id} poc={poc} index={i} />
            ))}
            {pocs.length === 0 && (
              <p className="col-span-full text-center text-gray-400 py-20">
                No POCs match your search.
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
