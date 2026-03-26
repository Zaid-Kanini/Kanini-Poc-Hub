import { useEffect, useRef, useState } from 'react';

const text = 'Built for teams to automate and follow the entire SDLC with high-level intent';

export default function PropelIQIntro() {
  const [typedText, setTypedText] = useState('');
  const charIdx = useRef(0);

  useEffect(() => {
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
  }, []);

  return (
    <section className="py-16 px-6 lg:px-20 text-center" style={{ background: '#ffffff' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="mb-4"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
            fontWeight: 700,
            color: '#0f0f0f',
            letterSpacing: '-0.01em',
          }}
        >
          Introducing PropelIQ
        </h2>
        <p
          className="min-h-[2em]"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            fontWeight: 400,
            lineHeight: 1.6,
            color: '#4a4a4a',
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
