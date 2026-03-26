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

    const selector = '.animate-on-scroll, .slide-from-left, .slide-from-right';
    const observed = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold: 0.1 }
    );

    function observeAll() {
      container!.querySelectorAll(selector).forEach((el) => {
        if (!observed.has(el)) {
          observed.add(el);
          io.observe(el);
        }
      });
    }

    observeAll();

    // Watch for dynamically added elements (e.g. async-loaded POC cards)
    const mo = new MutationObserver(() => observeAll());
    mo.observe(container, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [rootMargin]);

  return containerRef;
}
