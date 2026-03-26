import { useEffect, useRef, useState } from 'react';
import demoVideo from '../assets/demo.mp4';

const sentences = [
  'The Editor view offers tab autocompletion, natural language code commands, and a configurable, context-aware agent.',
  'Write code at the speed of thought. Let AI handle the boilerplate.',
  'Designed for developers who refuse to slow down.',
];

const features = [
  { icon: '🔮', label: 'Tab autocompletion that understands context', bg: '#ecfdf5' },
  { icon: '💬', label: 'Natural language code commands', bg: '#eff6ff' },
  { icon: '⚙️', label: 'Configurable, context-aware agent', bg: '#fdf4ff' },
];

export default function AiIdeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const sentenceIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);
  const paused = useRef(false);
  const videoSrc: string = demoVideo;
  const videoRef = useRef<HTMLVideoElement>(null);

  // Intersection Observer
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setIsVisible(true);
            // Autoplay video when section is visible
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Typewriter effect
  useEffect(() => {
    let rafId: number;
    let lastTime = 0;

    const tick = (time: number) => {
      const speed = deleting.current ? 28 : paused.current ? 80 : 46;
      if (time - lastTime < speed) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      lastTime = time;

      if (paused.current) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const current = sentences[sentenceIdx.current];

      if (!deleting.current) {
        charIdx.current++;
        setTypedText(current.slice(0, charIdx.current));
        if (charIdx.current === current.length) {
          paused.current = true;
          setTimeout(() => {
            paused.current = false;
            deleting.current = true;
          }, 2600);
        }
      } else {
        charIdx.current--;
        setTypedText(current.slice(0, charIdx.current));
        if (charIdx.current === 0) {
          deleting.current = false;
          sentenceIdx.current = (sentenceIdx.current + 1) % sentences.length;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const hasVideo = videoSrc && videoSrc.length > 0;

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 lg:px-20 overflow-hidden"
      style={{ background: '#f7f7f5' }}
    >
      <div
        className="max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        {/* ── LEFT SIDE ── */}
        <div className="flex flex-col gap-7">
          {/* Headline */}
          <h2
            className="leading-none"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              color: '#0f0f0f',
              letterSpacing: '-0.02em',
            }}
          >
            Build faster.
            <br />
            Think deeper.
          </h2>

          {/* Typewriter */}
          <div className="min-h-[2.4em] flex items-start flex-wrap gap-1.5">
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 'clamp(1rem, 1.5vw, 1.18rem)',
                fontWeight: 300,
                lineHeight: 1.65,
                color: '#4a4a4a',
              }}
            >
              {typedText}
            </p>
            <span
              className="inline-block w-0.5 align-middle"
              style={{
                height: '1.1em',
                background: '#0f0f0f',
                marginLeft: '2px',
                animation: 'ai-ide-blink 1s step-end infinite',
              }}
            />
          </div>
        </div>

        {/* ── RIGHT SIDE ── */}
        <div
          className="relative"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(24px)',
            transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s',
          }}
        >
          {/* Glow blob */}
          <div
            className="absolute rounded-[32px]"
            style={{
              inset: '-32px',
              background:
                'conic-gradient(from 180deg at 50% 50%, #4ade80 0deg, #60a5fa 90deg, #f472b6 180deg, #fb923c 270deg, #4ade80 360deg)',
              filter: 'blur(40px)',
              opacity: 0.35,
              animation: 'ai-ide-rotate-glow 8s linear infinite',
              zIndex: 0,
            }}
          />

          {/* Video card with spinning gradient border */}
          <div className="ai-ide-video-card">
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

              {/* Live Demo badge */}
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
                    background: '#4ade80',
                    animation: 'ai-ide-pulse 1.5s ease-in-out infinite',
                  }}
                />
                Live Demo
              </div>

              {/* Video element */}
              {hasVideo && (
                <video
                  ref={videoRef}
                  className="block w-full h-auto object-cover"
                  style={{ minHeight: '500px', maxHeight: '600px' }}
                  src={videoSrc}
                  loop
                  muted
                  playsInline
                />
              )}

              {/* Placeholder when no video src */}
              {!hasVideo && (
                <div
                  className="w-full flex flex-col items-center justify-center gap-4"
                  style={{
                    height: '320px',
                    background:
                      'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #1a1a2e 100%)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-xl"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1.5px solid rgba(255,255,255,0.2)',
                      animation: 'ai-ide-float 3s ease-in-out infinite',
                    }}
                  >
                    ▶
                  </div>
                  <span>Drop your video src here to preview</span>
                </div>
              )}

              {/* Subtle overlay shimmer */}
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
    </section>
  );
}
