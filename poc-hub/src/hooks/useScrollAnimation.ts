import { useEffect, useRef } from 'react';

/**
 * Observes elements with the given className and toggles 'is-visible'
 * when they enter the viewport. Optionally applies stagger delays.
 */
export function useScrollAnimation(rootMargin = '0px 0px -80px 0px') {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(
      '.animate-on-scroll, .slide-from-left, .slide-from-right'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [rootMargin]);

  return containerRef;
}
