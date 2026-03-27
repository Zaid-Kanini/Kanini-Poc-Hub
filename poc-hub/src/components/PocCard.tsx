import { useNavigate } from 'react-router-dom';
import type { PocItem, PocStatus } from '../data/pocData';

const statusColors: Record<PocStatus, string> = {
  'In Production': 'bg-green-50 text-green-700',
  'Testing Phase': 'bg-blue-50 text-blue-700',
  Ideation: 'bg-yellow-50 text-yellow-700',
  Pilot: 'bg-purple-50 text-purple-700',
};

interface Props {
  poc: PocItem;
  index: number;
}

export default function PocCard({ poc, index }: Props) {
  const navigate = useNavigate();

  function truncateText(text: string, limit: number = 200): string {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + "...";
}
  return (
    <div
      className="poc-card animate-on-scroll bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="card-icon w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-black border border-gray-100 transition-transform">
          <span className="material-symbols-outlined text-secondary">{poc.icon}</span>
        </div>
        <span
          className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full ${statusColors[poc.status]}`}
        >
          {poc.status}
        </span>
      </div>

      {/* Body */}
      <h3 className="text-xl font-bold text-black mb-2">{poc.title}</h3>
      <p className="text-gray-500 text-sm mb-6 flex-grow">{truncateText(poc.description)}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {poc.tags.map((tag) => (
          <span
            key={tag}
            className="domain-tag px-2 py-1 bg-green-50 text-secondary text-[11px] font-bold rounded transition-all"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-50 pt-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-200" />
          <span className="text-xs font-medium text-gray-600">{poc.team}</span>
        </div>
        <button
          onClick={() => navigate(`/poc/${poc.id}`)}
          className="text-secondary text-sm font-bold flex items-center gap-1 hover:underline"
        >
          View Details
          <span className="material-symbols-outlined text-base">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
