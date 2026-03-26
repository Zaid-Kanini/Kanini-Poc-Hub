import { useEffect, useState } from 'react';

export function useHideyNavbar(threshold = 10) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > lastY && currentY > threshold);
      setScrolled(currentY > 60);
      lastY = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { hidden, scrolled };
}
