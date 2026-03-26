import { useEffect, useRef, useState } from 'react';

const text = 'Built for teams to automate and follow the entire SDLC with high-level intent';

export default function PropelIQIntro() {
  const [typedText, setTypedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const charIdx = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Detect when section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Start typing only when visible
  useEffect(() => {
    if (!isVisible) return;
    let rafId: number;
    let lastTime = 0;
    const speed = 35;

    const tick = (time: number) => {
      if (time - lastTime < speed) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      lastTime = time;

      if (charIdx.current < text.length) {
        charIdx.current++;
        setTypedText(text.slice(0, charIdx.current));
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-16 px-6 lg:px-20" style={{ background: '#ffffff' }}>
      <div className="max-w-5xl">
        <p
          className="mb-4"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(4rem, 4vw, 3.2rem)',
            fontWeight: 700,
            color: 'black',
            letterSpacing: '0.01em',
          }}
        >
          Introducing Propel
        </p>
        <p
          className="min-h-[2em]"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(1rem, 4vw, 3.2rem)',
            fontWeight: 700,
            lineHeight: 1.25,
            color: '#374151',
            letterSpacing: '-0.02em',
          }}
        >
          {typedText}
          <span
            className="inline-block w-0.5 align-middle ml-0.5"
            style={{
              height: '1.1em',
              background: '#0f0f0f',
              animation: 'ai-ide-blink 1s step-end infinite',
            }}
          />
        </p>
      </div>
    </section>
  );
}
