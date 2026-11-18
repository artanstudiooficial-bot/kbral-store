import { useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_BANNER_WIDE } from '../data/products';

export function Hero() {
  const [imgError, setImgError] = useState(false);

  const handleScrollToCollection = () => {
    const el = document.getElementById('new-drops');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[480px] sm:min-h-[560px] lg:min-h-[78svh] lg:max-h-[760px] flex items-center pt-24 pb-10 sm:pt-28 sm:pb-14 lg:py-20 overflow-hidden bg-[#0b0b0b] border-b border-white/10"
    >
      {/* Unified Split Duo Banner: Mobile right-aligned + Desktop centered medium closeup */}
      {!imgError && (
        <div className="absolute inset-0 lg:inset-y-0 lg:inset-x-0 lg:mx-auto lg:w-[92%] lg:max-w-[1180px] lg:h-full bg-[#0b0b0b] overflow-hidden pointer-events-none">
          <motion.img
            initial={{ opacity: 0.9, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            src={HERO_BANNER_WIDE}
            alt="Dois modelos vestindo peças exclusivas KBRAL STORE"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-right-top lg:object-[50%_6%] translate-x-[4%] sm:translate-x-[2%] lg:translate-x-0"
          />
          {/* Mobile left-side dark scrim */}
          <div
            aria-hidden="true"
            className="lg:hidden absolute inset-0 bg-gradient-to-r from-[#0b0b0b] from-32% via-[#0b0b0b]/92 via-48% to-transparent"
          />
          {/* Desktop left & right edge feathering into #0b0b0b */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute inset-y-0 left-0 w-[48%] bg-gradient-to-r from-[#0b0b0b] from-32% via-[#0b0b0b]/88 via-64% to-transparent"
          />
          <div
            aria-hidden="true"
            className="hidden lg:block absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#0b0b0b] via-[#0b0b0b]/70 to-transparent"
          />
          {/* Top & bottom edge fades */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-20 lg:h-24 bg-gradient-to-b from-[#0b0b0b]/75 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-16 lg:h-24 bg-gradient-to-t from-[#0b0b0b] to-transparent"
          />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[54%] sm:max-w-[52%] lg:max-w-[490px] xl:max-w-[530px] flex flex-col items-start text-left space-y-3 sm:space-y-5 lg:space-y-6"
        >
          <h1
            className="font-display font-semibold tracking-tight text-white leading-[1.03] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
            style={{ fontSize: 'clamp(1.32rem, 4.4vw, 3.65rem)' }}
          >
            VESTUÁRIO DE ALTO PADRÃO PARA QUEM TEM ATITUDE
          </h1>

          <p className="text-xs sm:text-base lg:text-lg text-[#e0e0e0] max-w-[210px] sm:max-w-md lg:max-w-lg leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]">
            Peças exclusivas selecionadas a dedo. Qualidade que você sente no
            primeiro toque e entrega ágil para todo o estado.
          </p>

          <div className="pt-1 sm:pt-2">
            <motion.button
              type="button"
              onClick={handleScrollToCollection}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-7 sm:py-3.5 min-h-[42px] sm:min-h-[48px] rounded-full bg-white text-[#0b0b0b] text-xs sm:text-base font-semibold hover:bg-[#e5e5e5] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0b]"
            >
              <span>Ver Coleção Oficial</span>
              <ArrowDownRight
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
