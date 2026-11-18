import { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { outfitLooks } from '../data/products';
import { useCatalogStore } from '../store/useCatalogStore';

export function OutfitsSection() {
  const railRef = useRef<HTMLDivElement>(null);
  const navigateToCategory = useCatalogStore(
    (state) => state.navigateToCategory
  );

  const scrollRail = (direction: 'left' | 'right') => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({
      left: direction === 'left' ? -310 : 310,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="outfits"
      className="py-16 sm:py-24 bg-[#0b0b0b] border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-center sm:text-left">
          <div className="space-y-2 max-w-xl mx-auto sm:mx-0">
            <p className="text-[11px] sm:text-xs font-medium tracking-[0.18em] uppercase text-[#a3a3a3]">
              LOOKBOOK · OUTFIT INSPIRATION
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-white">
              OUTFITS & LOOKS DO DIA
            </h2>
            <p className="text-sm sm:text-base text-[#b3b3b3]">
              Combinações reais montadas com as peças disponíveis na loja.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollRail('left')}
              aria-label="Ver looks anteriores"
              className="w-9 h-9 rounded-full bg-[#151515] border border-white/15 text-white hover:bg-white hover:text-[#0b0b0b] inline-flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollRail('right')}
              aria-label="Ver próximos looks"
              className="w-9 h-9 rounded-full bg-[#151515] border border-white/15 text-white hover:bg-white hover:text-[#0b0b0b] inline-flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-2 -mx-5 px-5 sm:mx-0 sm:px-0"
        >
          {outfitLooks.map((look, index) => (
            <motion.article
              key={look.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.35,
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-[248px] sm:w-[280px] lg:w-[292px] snap-start shrink-0 bg-[#141414] border border-white/10 rounded-xl overflow-hidden flex flex-col group"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#111111]">
                <img
                  src={look.image}
                  alt={`${look.title} — ${look.pieces}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b]/90 via-transparent to-transparent"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="font-display text-base font-semibold text-white">
                    {look.title}
                  </h3>
                  <p className="text-xs text-[#a3a3a3] leading-relaxed">
                    {look.pieces}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigateToCategory(look.category)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-[#25D366] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm self-start"
                >
                  <span>Ver peças do look</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
