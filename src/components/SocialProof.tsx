import { useEffect, useRef } from 'react';
import { testimonials } from '../data/products';

export function SocialProof() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();
    const speedPxPerSec = 52;

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
    <section
      id="avaliacoes"
      className="py-16 sm:py-24 bg-[#0b0b0b] border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mb-10 sm:mb-12">
        <div className="max-w-2xl mx-auto sm:mx-0 text-center sm:text-left space-y-2">
          <p className="text-[11px] sm:text-xs font-medium tracking-[0.18em] uppercase text-[#a3a3a3]">
            AVALIAÇÕES REAIS
          </p>
          <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-white text-balance">
            O QUE DIZEM NOSSOS CLIENTES
          </h2>
          <p className="text-sm sm:text-base text-[#b3b3b3]">
            Confira prints reais de clientes após receberem seus pedidos.
          </p>
        </div>
      </div>

      {/* Uninterrupted 60fps Infinite Loop (Desktop & Mobile) */}
      <div className="relative w-full overflow-hidden touch-pan-y">
        <div
          aria-hidden="true"
          className="pointer-events-none hidden sm:block absolute inset-y-0 left-0 w-16 lg:w-28 z-20 bg-gradient-to-r from-[#0b0b0b] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none hidden sm:block absolute inset-y-0 right-0 w-16 lg:w-28 z-20 bg-gradient-to-l from-[#0b0b0b] to-transparent"
        />

        <div
          ref={trackRef}
          className="flex w-max will-change-transform"
        >
          {duplicatedTestimonials.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="pr-5 sm:pr-6 shrink-0"
            >
              <div className="w-[236px] sm:w-[258px] flex flex-col items-center gap-3.5">
                <div className="w-full rounded-[38px] bg-gradient-to-b from-[#2a2a2d] via-[#171719] to-[#222225] p-[7px] shadow-[0_20px_50px_rgba(0,0,0,0.85)] ring-1 ring-white/15">
                  <div className="relative w-full aspect-[386/760] rounded-[31px] overflow-hidden bg-black">
                    <img
                      src={item.proofImage}
                      alt={`Avaliação real de ${item.author}: ${item.highlight}`}
                      draggable={false}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top select-none pointer-events-none"
                    />
                  </div>
                </div>

                <div className="text-center space-y-0.5 px-2">
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    {item.author}
                  </p>
                  <p className="text-[11px] text-[#8a8a8a]">{item.channel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
