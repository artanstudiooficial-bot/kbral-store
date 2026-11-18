import { useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { mockProducts } from '../data/products';
import { CategoryFilter, useCatalogStore } from '../store/useCatalogStore';

const CATEGORIES: CategoryFilter[] = [
  'Todos',
  'Camisetas',
  'Moletons',
  'Bermudas',
  'Tênis',
];

const BRANDS = [
  'Todas',
  'ZARA',
  'Hugo BOSS',
  'Nike',
  'Tommy Hilfiger',
  'Faith Brand',
  'City Denim',
];

export function FilterDrawer() {
  const {
    isMenuOpen,
    closeMenu,
    activeCategory,
    activeBrand,
    searchQuery,
    setActiveCategory,
    setActiveBrand,
    setSearchQuery,
    resetFilters,
  } = useCatalogStore();

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', handleKey);
    };
  }, [isMenuOpen, closeMenu]);

  const matchingCount = mockProducts.filter((product) => {
    const matchCategory =
      activeCategory === 'Todos' || product.category === activeCategory;
    const matchBrand =
      activeBrand === 'Todas' || product.brand === activeBrand;
    const q = searchQuery.trim().toLowerCase();
    const matchQuery =
      !q ||
      product.name.toLowerCase().includes(q) ||
      product.brand.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.specs.toLowerCase().includes(q);
    return matchCategory && matchBrand && matchQuery;
  }).length;

  const handleApply = () => {
    closeMenu();
    window.setTimeout(() => {
      const target = document.getElementById('catalogo-principal');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de categorias e filtros"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full sm:w-[390px] h-full bg-[#121212] border-l border-white/10 flex flex-col"
          >
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal
                  className="w-4 h-4 text-white"
                  aria-hidden="true"
                />
                <h2 className="font-display text-lg font-semibold text-white">
                  Categorias & Pesquisa
                </h2>
              </div>

              <button
                type="button"
                onClick={closeMenu}
                aria-label="Fechar menu de filtros"
                className="w-10 h-10 rounded-full border border-white/10 bg-[#0b0b0b] text-[#d4d4d4] hover:text-white hover:border-white/35 inline-flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">
              {/* Search Field */}
              <div className="space-y-2.5">
                <label
                  htmlFor="kbral-search-drawer"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#a3a3a3]"
                >
                  Pesquisar Produto
                </label>
                <div className="relative">
                  <Search
                    className="w-4 h-4 text-[#8a8a8a] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="kbral-search-drawer"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar peça, marca ou modelo..."
                    className="w-full h-11 pl-10 pr-9 rounded-xl bg-[#0b0b0b] border border-white/15 text-sm text-white placeholder:text-[#737373] focus:outline-none focus:border-white"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Limpar busca"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full text-[#8a8a8a] hover:text-white inline-flex items-center justify-center cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter List */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#a3a3a3]">
                  Categorias
                </p>
                <div className="space-y-1.5">
                  {CATEGORIES.map((category) => {
                    const count =
                      category === 'Todos'
                        ? mockProducts.length
                        : mockProducts.filter((p) => p.category === category)
                            .length;
                    const isSelected = activeCategory === category;

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-white text-[#0b0b0b] border-white font-semibold'
                            : 'bg-[#151515] text-[#d4d4d4] border-white/10 hover:border-white/25 hover:text-white'
                        }`}
                      >
                        <span>
                          {category === 'Todos' ? 'Todos os Produtos' : category}
                        </span>
                        <span
                          className={`text-xs tabular-nums ${
                            isSelected ? 'text-[#0b0b0b]/70' : 'text-[#8a8a8a]'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brand Filter Grid */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#a3a3a3]">
                  Filtrar por Marca
                </p>
                <div className="flex flex-wrap gap-2">
                  {BRANDS.map((brand) => {
                    const isSelected = activeBrand === brand;
                    return (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => setActiveBrand(brand)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-white text-[#0b0b0b] border-white font-semibold'
                            : 'bg-[#0b0b0b] text-[#b3b3b3] border-white/10 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {brand}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-white/10 bg-[#0e0e0e] space-y-3">
              <button
                type="button"
                onClick={handleApply}
                className="w-full min-h-[48px] px-5 py-3 rounded-full bg-white text-[#0b0b0b] hover:bg-[#e5e5e5] text-sm font-semibold transition-colors cursor-pointer"
              >
                Ver Produtos ({matchingCount})
              </button>

              <button
                type="button"
                onClick={resetFilters}
                className="w-full py-2 text-xs text-[#a3a3a3] hover:text-white transition-colors cursor-pointer"
              >
                Limpar todos os filtros
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
