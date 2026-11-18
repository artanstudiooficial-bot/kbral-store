import { Menu, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { useCartStore } from '../store/useCartStore';
import { useCatalogStore } from '../store/useCatalogStore';

export function KbralMonogram({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="20" cy="20" r="19" stroke="white" strokeWidth="1.5" />
      <circle
        cx="20"
        cy="20"
        r="14.5"
        fill="#151515"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      <path
        d="M15.5 13.5L14.2 26.5M24.8 13.8C21.5 16.8 18.2 19.2 14.8 20.5C17.8 21.4 21.2 23.6 24.2 26.5"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Header() {
  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);
  const openMenu = useCatalogStore((state) => state.openMenu);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-40 px-3 sm:px-6 pointer-events-none">
      <div className="pointer-events-auto max-w-5xl mx-auto h-14 px-3.5 sm:px-5 rounded-full bg-[#121212]/80 backdrop-blur-xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.65)] flex items-center justify-between gap-3 sm:gap-6">
        <a
          href="#inicio"
          className="inline-flex items-center gap-2.5 text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full pr-1"
        >
          <KbralMonogram className="w-7 h-7 shrink-0" />
          <span className="font-display text-sm sm:text-base font-semibold tracking-wider">
            KBRAL STORE
          </span>
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#b3b3b3]"
        >
          <a
            href="#inicio"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
          >
            Início
          </a>
          <a
            href="#new-drops"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
          >
            Coleções
          </a>
          <a
            href="#colecoes"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
          >
            Catálogo
          </a>
          <a
            href="#outfits"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
          >
            Outfits
          </a>
          <a
            href="#avaliacoes"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
          >
            Avaliações
          </a>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Abrir sacola com ${totalCount} ${totalCount === 1 ? 'item' : 'itens'}`}
            className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 min-h-[38px] rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-sm font-medium text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ShoppingBag className="w-4 h-4 text-white" aria-hidden="true" />
            <span className="hidden sm:inline">Sacola</span>
            <motion.span
              key={totalCount}
              initial={{ scale: 0.75, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className={`inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-xs font-semibold tabular-nums ${
                totalCount > 0
                  ? 'bg-[#25D366] text-[#052010]'
                  : 'bg-white/15 text-[#d4d4d4]'
              }`}
            >
              {totalCount}
            </motion.span>
          </button>

          <button
            type="button"
            onClick={openMenu}
            aria-label="Abrir menu de categorias e pesquisa"
            className="w-[38px] h-[38px] rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white inline-flex items-center justify-center transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Menu className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
