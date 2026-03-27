import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPocById } from '../api/pocs';
import type { PocItem, PocStatus } from '../data/pocData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const statusColors: Record<PocStatus, { bg: string; text: string; dot: string }> = {
  'In Production': { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  'Testing Phase': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  Ideation: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  Pilot: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
};

export default function PocDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [poc, setPoc] = useState<PocItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const numId = Number(id);
    if (!id || Number.isNaN(numId)) {
      setError('Invalid POC ID');
      setLoading(false);
      return;
    }

    getPocById(numId)
      .then((data) => setPoc(data))
      .catch(() => setError('POC not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center py-40">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !poc) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <span className="material-symbols-outlined text-5xl text-gray-300">error</span>
          <p className="text-gray-500 text-lg">{error || 'POC not found'}</p>
          <button
            onClick={() => navigate('/portal')}
            className="mt-4 px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors"
          >
            Back to Portal
          </button>
        </div>
      </div>
    );
  }

  const status = statusColors[poc.status];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="px-6 lg:px-20 pt-28 pb-20">
        <div className="max-w-[960px] mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate('/portal')}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black mb-8 transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to all POCs
          </button>

          {/* Header card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 shadow-sm mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
                <span className="material-symbols-outlined text-3xl text-gray-700">
                  {poc.icon}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                {/* Title row */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                  <h1
                    className="text-2xl lg:text-3xl font-bold text-black"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {poc.title}
                  </h1>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase rounded-full w-fit ${status.bg} ${status.text}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {poc.status}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-5">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">category</span>
                    {poc.domain}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">group</span>
                    {poc.team}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {poc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 shadow-sm mb-8">
            <h2 className="text-lg font-bold text-black mb-4">About this POC</h2>
            <p className="text-gray-600 leading-relaxed text-[15px]">{poc.description}</p>
          </div>

          {/* Links */}
          {(poc.github_url || poc.application_url) && (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 shadow-sm mb-8">
              <h2 className="text-lg font-bold text-black mb-5">Links</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                {poc.github_url && (
                  <a
                    href={poc.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3.5 border border-gray-200 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all group"
                  >
                    <svg
                      className="w-6 h-6 text-gray-700 group-hover:text-black transition-colors"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <div>
                      <div className="text-sm font-semibold text-gray-800 group-hover:text-black">
                        GitHub Repository
                      </div>
                      <div className="text-xs text-gray-400">View source code</div>
                    </div>
                    <span className="material-symbols-outlined text-base text-gray-400 ml-auto">
                      open_in_new
                    </span>
                  </a>
                )}

                {poc.application_url && (
                  <a
                    href={poc.application_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3.5 border border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all group"
                  >
                    <span className="material-symbols-outlined text-2xl text-green-600">
                      rocket_launch
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-gray-800 group-hover:text-green-700">
                        Live Application
                      </div>
                      <div className="text-xs text-gray-400">View the deployed project</div>
                    </div>
                    <span className="material-symbols-outlined text-base text-gray-400 ml-auto">
                      open_in_new
                    </span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
