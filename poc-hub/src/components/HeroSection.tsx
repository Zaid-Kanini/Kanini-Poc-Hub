import { useCountUp } from '../hooks/useCountUp';
import { useEffect, useState, useRef } from 'react';
import { getHeroStats } from '../api/stats';
import ParticleBurst from './ParticleBurst/ParticleBurst';

function TypingHeadline({ onDone }: { onDone: () => void }) {
  const lines = ['Explored.', 'Proven.', 'Launched.'];
  const [, forceUpdate] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const stateRef = useRef({
    displayedLines: [] as string[],
    currentLine: 0,
    currentChar: 0,
    done: false,
    lastTick: 0,
    waitUntil: 0,
  });
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  // Blink cursor only while typing
  useEffect(() => {
    if (stateRef.current.done) return;
    const id = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Single persistent typing loop — no React state deps
  useEffect(() => {
    const s = stateRef.current;
    let rafId = 0;

    const CHAR_DELAY = 60;
    const LINE_PAUSE = 400;

    const tick = (now: number) => {
      if (s.done) return;
      if (!s.lastTick) s.lastTick = now;

      if (s.waitUntil && now < s.waitUntil) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      s.waitUntil = 0;

      const elapsed = now - s.lastTick;
      if (elapsed < CHAR_DELAY) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      s.lastTick = now;

      const line = lines[s.currentLine];
      if (!line) { s.done = true; onDoneRef.current(); forceUpdate((n) => n + 1); setShowCursor(false); return; }

      s.currentChar++;
      if (s.currentChar > line.length) {
        // Line finished
        s.displayedLines[s.currentLine] = line;
        if (s.currentLine < lines.length - 1) {
          s.currentLine++;
          s.currentChar = 0;
          s.waitUntil = now + LINE_PAUSE;
          s.lastTick = 0; // reset so next tick measures fresh
        } else {
          s.done = true;
          onDoneRef.current();
          setShowCursor(false);
        }
        forceUpdate((n) => n + 1);
        rafId = requestAnimationFrame(tick);
        return;
      }

      s.displayedLines[s.currentLine] = line.slice(0, s.currentChar);
      forceUpdate((n) => n + 1);
      rafId = requestAnimationFrame(tick);
    };

    const timeout = setTimeout(() => {
      rafId = requestAnimationFrame(tick);
    }, 300);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const s = stateRef.current;

  return (
    <h1 className="text-5xl lg:text-7xl font-black mb-2 leading-[1.1] text-black animate-[fadeIn_0.5s_ease_forwards]">
      {lines.map((line, i) => (
        <span key={line} className="block">
          {s.displayedLines[i] || (i === s.currentLine ? '' : '')}
          {/* Blinking cursor on current line */}
          {i === s.currentLine && !s.done && (
            <span
              className="inline-block w-[3px] h-[0.85em] bg-black align-middle ml-0.5 rounded-sm translate-y-[0.05em]"
              style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}
            />
          )}

        </span>
      ))}
    </h1>
  );
}

function HeroStat({ value, label }: { value: number; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div className="flex flex-col">
      <span ref={ref} className="text-4xl font-bold text-black">
        {count}
      </span>
      <span className="text-sm text-gray-400 uppercase tracking-widest font-semibold">
        {label}
      </span>
    </div>
  );
}

export default function HeroSection() {
  const [typingDone, setTypingDone] = useState(false);
  const [heroStats, setHeroStats] = useState<{ value: number; label: string }[]>([]);

  useEffect(() => {
    getHeroStats().then(setHeroStats).catch(() => {});
  }, []);

  return (
    <section
      id="hero"
      className="bg-white text-gray-900 pt-24 pb-16 px-6 lg:px-24 relative overflow-hidden border-b border-gray-100 mt-[72px]"
    >
      {/* Particle burst background */}
      <ParticleBurst />

      {/* Decorative blurs */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl relative z-10">
        <TypingHeadline onDone={() => setTypingDone(true)} />
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: typingDone ? 1 : 0,
            transform: typingDone ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <p className="text-lg lg:text-xl text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Accelerating digital transformation through validated proofs of concept across the
            enterprise. Explore, collaborate, and scale successful pilots.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="btn-press bg-black text-white px-8 py-4 rounded-xl text-lg font-bold flex items-center gap-2 hover:bg-gray-800 transition-all">
              Explore POCs
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div
        className="mt-10 flex flex-wrap gap-8 border-t border-gray-100 pt-8 relative z-10 transition-all duration-700 ease-out delay-200"
        style={{
          opacity: typingDone ? 1 : 0,
          transform: typingDone ? 'translateY(0)' : 'translateY(16px)',
        }}
      >
        {heroStats.map((s, i) => (
          <div key={s.label} className="contents">
            <HeroStat value={s.value} label={s.label} />
            {i < heroStats.length - 1 && (
              <div className="w-px h-12 bg-gray-100 hidden md:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
