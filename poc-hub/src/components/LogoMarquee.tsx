import { partnerLogos } from '../data/pocData';

export default function LogoMarquee() {
  // Double the list for seamless infinite scroll
  const doubled = [...partnerLogos, ...partnerLogos];

  return (
    <section className="py-10 bg-white border-b border-gray-100 overflow-hidden">
      <div className="marquee-track">
        {doubled.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex-shrink-0 mx-8 flex items-center justify-center h-12 px-6 rounded-lg bg-gray-50 border border-gray-100"
          >
            <span className="text-sm font-semibold text-gray-400 whitespace-nowrap">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
