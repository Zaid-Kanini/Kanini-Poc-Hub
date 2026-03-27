import { useEffect, useState } from 'react';
import { getFeaturedPoc } from '../api/stats';
import { useNavigate } from 'react-router-dom';
interface FeaturedPocData {
  pocId: number | null;
  title: string;
  subtitle: string;
  description: string;
  deploymentStatus: string;
  stats: { value: string; label: string }[];
}

export default function FeaturedPoc() {
  const [featuredPoc, setFeaturedPoc] = useState<FeaturedPocData | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    getFeaturedPoc().then(setFeaturedPoc).catch(() => {});
  }, []);

  if (!featuredPoc) return null;

  return (
    <section
      id="featured"
      className="bg-white py-20 px-6 lg:px-20 text-gray-900 flex flex-col lg:flex-row items-center gap-16 border-y border-gray-100 overflow-hidden"
    >
      {/* Text */}
      <div className="lg:w-1/2 slide-from-left">
        <span className="text-secondary font-bold uppercase tracking-widest text-xs block mb-4">
          {featuredPoc.subtitle}
        </span>
        <h2 className="text-4xl font-bold mb-6 text-black">{featuredPoc.title}</h2>
        <p className="text-gray-500 text-lg leading-relaxed mb-8">{featuredPoc.description}</p>

        <div className="grid grid-cols-2 gap-6 mb-10">
          {featuredPoc.stats.map((s) => (
            <div key={s.label} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-2xl font-bold text-secondary">{s.value}</p>
              <p className="text-xs text-gray-400 uppercase">{s.label}</p>
            </div>
          ))}
        </div>

        <button onClick={() => featuredPoc.pocId && navigate(`/poc/${featuredPoc.pocId}`)} className="btn-press bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all">
          Explore Implementation
        </button>
      </div>

      {/* Image */}
      <div className="lg:w-1/2 relative slide-from-right">
        <div className="bg-gray-100 rounded-3xl p-2">
          <div className="rounded-2xl w-full h-72 lg:h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-gray-400">visibility</span>
          </div>
        </div>
        {/* Floating badge */}
        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl text-black flex items-center gap-3 border border-gray-100">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white">
            <span className="material-symbols-outlined">check_circle</span>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Deployment Status</p>
            <p className="text-sm font-bold">{featuredPoc.deploymentStatus}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
