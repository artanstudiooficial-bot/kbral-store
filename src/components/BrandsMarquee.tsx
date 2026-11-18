import { useEffect, useRef } from 'react';
import { BRAND_MARQUEE_ITEMS } from '../data/products';

export function BrandsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);

  const repeated = [
    ...BRAND_MARQUEE_ITEMS,
    ...BRAND_MARQUEE_ITEMS,
    ...BRAND_MARQUEE_ITEMS,
    ...BRAND_MARQUEE_ITEMS,
  ];

  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();
    const speedPxPerSec = 44;

    const tick = (now: number) => {
      const dt = Math.min(now - lastTime, 64) / 1000;
      lastTime = now;

      const track = trackRef.current;
      if (track) {
        const halfWidth = track.scrollWidth / 2;
        if (halfWidth > 0) {
          offsetRef.current += dt * speedPxPerSec;
          if (offsetRef.current >= halfWidth) {
            offsetRef.current -= halfWidth;
          }
          track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      aria-label="Marcas selecionadas"
      className="relative w-full overflow-hidden bg-[#101010] border-b border-white/10 py-3.5 select-none touch-pan-y"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 z-10 bg-gradient-to-r from-[#101010] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 z-10 bg-gradient-to-l from-[#101010] to-transparent"
      />

      <div ref={trackRef} className="flex w-max will-change-transform items-center">
        {repeated.map((label, idx) => (
          <div
            key={`${label}-${idx}`}
            className="flex items-center shrink-0"
          >
            <span className="font-display text-xs sm:text-sm font-medium tracking-[0.22em] text-[#d4d4d4] whitespace-nowrap px-5 sm:px-7">
              {label}
            </span>
            <span
              aria-hidden="true"
              className="text-white/30 text-xs font-medium"
            >
              +
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
