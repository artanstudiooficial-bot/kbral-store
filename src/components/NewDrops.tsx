import { useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { newDropBlocks, ProductCategory } from '../data/products';
import { useCatalogStore } from '../store/useCatalogStore';

export function NewDrops() {
  const navigateToCategory = useCatalogStore(
    (state) => state.navigateToCategory
  );
  const [touchedCategory, setTouchedCategory] =
    useState<ProductCategory | null>(null);

  return (
    <section
      id="new-drops"
      className="py-12 sm:py-16 bg-[#0b0b0b] border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-white">
              COLEÇÕES
            </h2>
            <ArrowRight className="w-4 h-4 text-[#a3a3a3]" aria-hidden="true" />
          </div>

          <button
            type="button"
            onClick={() => navigateToCategory('Todos')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#b3b3b3] hover:text-white transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
          >
            <span>Ver Tudo</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {newDropBlocks.map((drop, index) => {
            const isTouched = touchedCategory === drop.category;

            return (
              <motion.button
                key={drop.category}
                type="button"
                onClick={() => navigateToCategory(drop.category)}
                onTouchStart={() => setTouchedCategory(drop.category)}
                onTouchEnd={() => setTouchedCategory(null)}
                onTouchCancel={() => setTouchedCategory(null)}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group text-left bg-[#141414] border border-white/10 hover:border-white/30 active:border-white/40 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <div className="relative aspect-square w-full bg-[#121212] overflow-hidden border-b border-white/10">
                  <img
                    src={drop.image}
                    alt={`Explorar coleção ${drop.title}`}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105 ${
                      isTouched ? 'scale-105' : ''
                    }`}
                  />

                  {/* Subtle overlay scrim + rectangular "Ver Coleção" prompt on hover or touch hold */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 bg-[#0b0b0b]/55 backdrop-blur-[1.5px] flex items-center justify-center p-3 transition-opacity duration-200 ${
                      isTouched
                        ? 'opacity-100'
                        : 'opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus-visible:opacity-100'
                    }`}
                  >
                    <span
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#0b0b0b]/90 border border-white/80 text-white text-xs sm:text-sm font-display font-semibold tracking-wider uppercase shadow-[0_8px_24px_rgba(0,0,0,0.6)] transition-all duration-200 whitespace-nowrap ${
                        isTouched
                          ? 'translate-y-0 scale-100'
                          : 'translate-y-1.5 scale-95 group-hover:translate-y-0 group-hover:scale-100 group-active:translate-y-0 group-active:scale-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100'
                      }`}
                    >
                      <span>Ver Coleção</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                <div className="p-3 sm:p-4 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-display text-sm sm:text-base font-semibold text-white truncate">
                      {drop.title}
                    </p>
                    <p className="text-[11px] sm:text-xs text-[#9a9a9a] truncate">
                      {drop.subtitle}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className={`w-8 h-8 rounded-lg inline-flex items-center justify-center shrink-0 transition-colors ${
                      isTouched
                        ? 'bg-[#25D366] text-[#052010]'
                        : 'bg-white text-[#0b0b0b] group-hover:bg-[#25D366] group-hover:text-[#052010] group-active:bg-[#25D366] group-active:text-[#052010]'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
