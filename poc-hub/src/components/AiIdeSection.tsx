import { useEffect, useRef, useState } from 'react';
import demoVideo from '../assets/demo.mp4';

const stages = [
  {
    number: '01',
    headline: 'From Idea\nTo Intent.',
    tagline: 'Turn raw vision into structured clarity.',
    description:
      'Feed in your BRD and watch it evolve into a living, breathing spec.md—a complete blueprint that captures requirements, edge cases, and technical direction. No gaps. No guesswork. Just clarity you can build on.',
    accent: '#4ade80',
    gradient: 'conic-gradient(from 180deg at 50% 50%, #4ade80 0deg, #60a5fa 90deg, #f472b6 180deg, #fb923c 270deg, #4ade80 360deg)',
  },
  {
    number: '02',
    headline: 'Big Picture,\nPerfectly Broken Down.',
    tagline: 'Transform complexity into actionable epics.',
    description:
      'Automatically generate a detailed epics.md that maps your product into meaningful, trackable chunks. Every feature, every flow—organized for momentum and built for execution.',
    accent: '#60a5fa',
    gradient: 'conic-gradient(from 90deg at 50% 50%, #60a5fa 0deg, #a78bfa 90deg, #4ade80 180deg, #facc15 270deg, #60a5fa 360deg)',
  },
  {
    number: '03',
    headline: 'Quality,\nEngineered Early.',
    tagline: 'Design testing before code is written.',
    description:
      'Create comprehensive test plans that think ahead—covering scenarios, edge cases, and validations. Build confidence into your product from day one, not after things break.',
    accent: '#f472b6',
    gradient: 'conic-gradient(from 270deg at 50% 50%, #f472b6 0deg, #fb923c 90deg, #a78bfa 180deg, #60a5fa 270deg, #f472b6 360deg)',
  },
  {
    number: '04',
    headline: 'Ship with\nConfidence.',
    tagline: 'From changes to clean, contextual pull requests.',
    description:
      'Generate pull requests that tell the full story—what changed, why it matters, and how to review it. Less back-and-forth, more forward motion.',
    accent: '#fb923c',
    gradient: 'conic-gradient(from 0deg at 50% 50%, #fb923c 0deg, #4ade80 90deg, #60a5fa 180deg, #f472b6 270deg, #fb923c 360deg)',
  },
];

function StageCard({
  stage,
  index,
}: {
  stage: (typeof stages)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isReversed = index % 2 !== 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
        isReversed ? 'lg:direction-rtl' : ''
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      {/* ── TEXT SIDE ── */}
      <div
        className="flex flex-col gap-5"
        style={{
          order: isReversed ? 2 : 1,
          direction: 'ltr',
        }}
      >
        {/* Step number */}
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            color: stage.accent,
            textTransform: 'uppercase',
          }}
        >
          Step {stage.number}
        </span>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#0f0f0f',
            letterSpacing: '-0.02em',
            whiteSpace: 'pre-line',
          }}
        >
          {stage.headline}
        </h2>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
            fontWeight: 500,
            lineHeight: 1.5,
            color: '#1a1a1a',
          }}
        >
          {stage.tagline}
        </p>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(0.92rem, 1.2vw, 1.02rem)',
            fontWeight: 300,
            lineHeight: 1.75,
            color: '#555',
            maxWidth: '480px',
          }}
        >
          {stage.description}
        </p>
      </div>

      {/* ── VISUAL SIDE ── */}
      <div
        className="relative flex items-center justify-center"
        style={{
          order: isReversed ? 1 : 2,
          direction: 'ltr',
        }}
      >
        {/* Glow blob */}
        <div
          className="absolute rounded-[32px]"
          style={{
            inset: '-24px',
            background: stage.gradient,
            filter: 'blur(48px)',
            opacity: 0.25,
            animation: 'ai-ide-rotate-glow 8s linear infinite',
            zIndex: 0,
          }}
        />

        {/* Video Card */}
        <div className="ai-ide-video-card relative z-[1] w-full max-w-[540px]">
          <div
            className="rounded-[18px] overflow-hidden relative"
            style={{ background: '#0d0d0d' }}
          >
            {/* Corner accents */}
            <div
              className="absolute w-[18px] h-[18px] z-[3]"
              style={{
                top: '-6px',
                left: '-6px',
                borderTop: '2px solid rgba(255,255,255,0.7)',
                borderLeft: '2px solid rgba(255,255,255,0.7)',
                borderRadius: '4px 0 0 0',
              }}
            />
            <div
              className="absolute w-[18px] h-[18px] z-[3]"
              style={{
                top: '-6px',
                right: '-6px',
                borderTop: '2px solid rgba(255,255,255,0.7)',
                borderRight: '2px solid rgba(255,255,255,0.7)',
                borderRadius: '0 4px 0 0',
              }}
            />
            <div
              className="absolute w-[18px] h-[18px] z-[3]"
              style={{
                bottom: '-6px',
                left: '-6px',
                borderBottom: '2px solid rgba(255,255,255,0.7)',
                borderLeft: '2px solid rgba(255,255,255,0.7)',
                borderRadius: '0 0 0 4px',
              }}
            />
            <div
              className="absolute w-[18px] h-[18px] z-[3]"
              style={{
                bottom: '-6px',
                right: '-6px',
                borderBottom: '2px solid rgba(255,255,255,0.7)',
                borderRight: '2px solid rgba(255,255,255,0.7)',
                borderRadius: '0 0 4px 0',
              }}
            />

            {/* Badge */}
            <div
              className="absolute top-3.5 left-3.5 z-[2] flex items-center gap-1.5 rounded-full px-3 py-1"
              style={{
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              <span
                className="w-[5px] h-[5px] rounded-full"
                style={{
                  background: stage.accent,
                  animation: 'ai-ide-pulse 1.5s ease-in-out infinite',
                }}
              />
              {index === 0 && 'spec.md'}
              {index === 1 && 'epics.md'}
              {index === 2 && 'test-plan.md'}
              {index === 3 && 'pull-request.md'}
            </div>

            {/* Video */}
            <video
              className="block w-full h-auto object-cover"
              style={{ minHeight: '320px', maxHeight: '420px' }}
              src={demoVideo}
              loop
              muted
              playsInline
              autoPlay
            />

            {/* Overlay shimmer */}
            <div
              className="absolute inset-0 pointer-events-none rounded-[18px]"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AiIdeSection() {
  return (
    <section
      className="py-20 px-6 lg:px-20 overflow-hidden"
      style={{ background: '#f7f7f5' }}
    >
      {/* ── Four Stage Cards ── */}
      <div className="flex flex-col gap-32">
        {stages.map((stage, i) => (
          <StageCard key={stage.number} stage={stage} index={i} />
        ))}
      </div>

    </section>
  );
}
