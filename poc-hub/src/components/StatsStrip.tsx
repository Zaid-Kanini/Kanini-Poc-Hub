import { useCountUp } from '../hooks/useCountUp';
import { useEffect, useState } from 'react';
import { getGlobalStats } from '../api/stats';

function StatItem({
  value,
  label,
  prefix = '',
  suffix = '',
}: {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}) {
  const { count, ref } = useCountUp(value);
  return (
    <div className="text-center animate-on-scroll">
      <p className="text-4xl font-black text-black mb-2">
        <span ref={ref}>
          {prefix}
          {count}
          {suffix}
        </span>
      </p>
      <p className="text-sm font-bold text-gray-400 uppercase">{label}</p>
    </div>
  );
}

export default function StatsStrip() {
  const [globalStats, setGlobalStats] = useState<{ value: number; label: string; prefix: string; suffix: string }[]>([]);

  useEffect(() => {
    getGlobalStats().then(setGlobalStats).catch(() => {});
  }, []);

  return (
    <section id="stats" className="bg-bg-alt py-16 px-6 lg:px-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {globalStats.map((s) => (
          <StatItem
            key={s.label}
            value={s.value}
            label={s.label}
            prefix={s.prefix}
            suffix={s.suffix ?? ''}
          />
        ))}
      </div>
    </section>
  );
}
