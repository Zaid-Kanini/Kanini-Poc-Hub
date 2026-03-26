import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import SearchFilterBar from '../components/SearchFilterBar';
import PocCard from '../components/PocCard';
import FeaturedPoc from '../components/FeaturedPoc';
import StatsStrip from '../components/StatsStrip';
import LogoMarquee from '../components/LogoMarquee';
import Footer from '../components/Footer';
import { pocData } from '../data/pocData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function PortalPage() {
  const [activeFilter, setActiveFilter] = useState('All POCs');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useScrollAnimation();

  const filtered = useMemo(() => {
    return pocData.filter((poc) => {
      const matchesFilter =
        activeFilter === 'All POCs' || poc.domain === activeFilter;
      const matchesSearch =
        !searchQuery ||
        poc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        poc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        poc.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div ref={scrollRef} className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <SearchFilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* POC Grid */}
      <section id="pocs" className="px-6 lg:px-20 pt-20 pb-16 bg-bg-alt">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-black">Latest Pilots</h2>
          <a className="text-secondary font-semibold flex items-center gap-1 hover:underline" href="#">
            View all <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((poc, i) => (
            <PocCard key={poc.id} poc={poc} index={i} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-gray-400 py-20">
              No POCs match your search.
            </p>
          )}
        </div>
      </section>

      <FeaturedPoc />
      <StatsStrip />
      <LogoMarquee />
      <Footer />
    </div>
  );
}
