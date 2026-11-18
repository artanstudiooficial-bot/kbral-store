import { MouseEvent, useRef, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Shirt,
  SlidersHorizontal,
  X,
  ZoomIn,
} from 'lucide-react';
import { motion } from 'motion/react';
import { formatBRL, mockProducts, Product } from '../data/products';
import { useCartStore } from '../store/useCartStore';
import { CategoryFilter, useCatalogStore } from '../store/useCatalogStore';

const CATEGORY_FILTERS: CategoryFilter[] = [
  'Todos',
  'Camisetas',
  'Moletons',
  'Bermudas',
  'Tênis',
];

function ProductCard({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const addItem = useCartStore((state) => state.addItem);
  const defaultSize = product.category === 'Tênis' ? '40' : 'M';
  const [selectedSize, setSelectedSize] = useState<string>(defaultSize);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [imgError, setImgError] = useState(false);

  const [isZooming, setIsZooming] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  const handleAdd = () => {
    addItem(product, selectedSize);
    setAddedFeedback(true);
    window.setTimeout(() => {
      setAddedFeedback(false);
    }, 1200);
  };

  const isFootwear = product.category === 'Tênis';

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-[#151515] border border-white/10 rounded-xl overflow-hidden flex flex-col transition-colors duration-200 hover:border-white/20"
    >
      <div
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => {
          setIsZooming(false);
          setZoomOrigin({ x: 50, y: 50 });
        }}
        onMouseMove={handleMouseMove}
        className={`relative w-full bg-[#121212] border-b border-white/10 overflow-hidden cursor-zoom-in ${
          compact ? 'aspect-[4/4.4]' : 'aspect-[3/3.8]'
        }`}
      >
        {!imgError ? (
          <img
            src={product.image}
            alt={`${product.name} — ${product.brand}`}
            referrerPolicy="no-referrer"
            draggable={false}
            onError={() => setImgError(true)}
            style={{
              transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
              transform: isZooming ? 'scale(1.85)' : 'scale(1)',
            }}
            className={`w-full h-full object-cover object-center will-change-transform select-none ${
              isZooming
                ? 'transition-transform duration-100 ease-out'
                : 'transition-transform duration-300 ease-out'
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center bg-gradient-to-b from-[#1a1a1a] to-[#121212]">
            <Shirt className="w-8 h-8 text-[#737373]" aria-hidden="true" />
            <span className="text-xs font-medium text-[#a3a3a3]">
              {product.name}
            </span>
          </div>
        )}

        <div
          aria-hidden="true"
          className={`hidden sm:inline-flex pointer-events-none absolute top-2.5 right-2.5 items-center gap-1 px-2 py-0.5 rounded-full bg-[#0b0b0b]/75 backdrop-blur-md border border-white/15 text-[10px] font-medium text-[#d4d4d4] transition-opacity duration-200 ${
            isZooming ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <ZoomIn className="w-2.5 h-2.5" />
          <span>Lupa</span>
        </div>
      </div>

      <div
        className={`flex-1 flex flex-col justify-between ${
          compact ? 'p-3.5 gap-3' : 'p-4 sm:p-5 gap-4'
        }`}
      >
        <div className="space-y-1.5">
          <div className="text-[11px] text-[#a3a3a3] tracking-wide truncate">
            <span className="text-[#d4d4d4] font-medium">{product.brand}</span>
            <span aria-hidden="true"> · </span>
            <span>{product.specs}</span>
          </div>

          <h3
            className={`font-display font-semibold text-white leading-snug line-clamp-1 ${
              compact ? 'text-sm sm:text-[15px]' : 'text-base sm:text-lg'
            }`}
          >
            {product.name}
          </h3>

          <p
            className={`font-semibold text-white tabular-nums ${
              compact ? 'text-sm' : 'text-base'
            }`}
          >
            {formatBRL(product.price)}
          </p>
        </div>

        <div className="space-y-2.5">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#a3a3a3]">
                {isFootwear ? 'Numeração' : 'Tamanho'}
              </span>
              <span className="font-medium text-white tabular-nums">
                {selectedSize}
              </span>
            </div>

            <div
              className="grid grid-cols-5 gap-1"
              role="radiogroup"
              aria-label={`Selecionar ${isFootwear ? 'numeração' : 'tamanho'} para ${product.name}`}
            >
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-md font-medium tabular-nums transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      compact ? 'h-7 text-[11px]' : 'h-8 text-xs'
                    } ${
                      isSelected
                        ? 'bg-white text-[#0b0b0b] font-semibold'
                        : 'bg-[#0b0b0b] text-[#b3b3b3] border border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`w-full rounded-lg font-semibold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              compact ? 'min-h-[38px] px-3 py-2 text-xs' : 'min-h-[44px] px-4 py-2.5 text-sm'
            } ${
              addedFeedback
                ? 'bg-[#25D366] text-[#052010]'
                : 'bg-white text-[#0b0b0b] hover:bg-[#e5e5e5]'
            }`}
          >
            {addedFeedback ? (
              <>
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Adicionado ({selectedSize})</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Adicionar à Sacola</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function ProductGrid() {
  const {
    activeCategory,
    activeBrand,
    searchQuery,
    setActiveCategory,
    setSearchQuery,
    openMenu,
    resetFilters,
  } = useCatalogStore();

  const railRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  });

  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const featuredProducts = mockProducts.filter((p) => p.featured);
  const filteredProducts = mockProducts.filter((product) => {
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
  });

  const hasActiveFilters =
    activeCategory !== 'Todos' ||
    activeBrand !== 'Todas' ||
    searchQuery.trim().length > 0;

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail) return;
    if ((e.target as HTMLElement).closest('button')) return;
    dragState.current = {
      isDown: true,
      startX: e.pageX - rail.offsetLeft,
      scrollLeft: rail.scrollLeft,
    };
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || !dragState.current.isDown) return;
    const x = e.pageX - rail.offsetLeft;
    const walk = (x - dragState.current.startX) * 1.25;
    rail.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    dragState.current.isDown = false;
  };

  const scrollRail = (direction: 'left' | 'right') => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({
      left: direction === 'left' ? -320 : 320,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="colecoes"
      className="py-14 sm:py-22 bg-[#0b0b0b] border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-center sm:text-left">
          <div className="space-y-2 max-w-2xl mx-auto sm:mx-0">
            <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-white">
              COLEÇÃO OFICIAL | PRONTA ENTREGA
            </h2>
            <p className="text-sm sm:text-base text-[#b3b3b3]">
              Arraste para o lado ou filtre por categoria abaixo para montar
              seu pedido.
            </p>
          </div>

          {totalCount > 0 && (
            <button
              type="button"
              onClick={openCart}
              className="mx-auto sm:mx-0 px-4 py-2 min-h-[38px] rounded-full bg-[#151515] border border-white/15 text-xs sm:text-sm font-medium text-white hover:border-white/35 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Ver sacola ({totalCount} {totalCount === 1 ? 'peça' : 'peças'})
            </button>
          )}
        </div>

        {/* Compact Fluid Horizontal Carousel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 px-0.5">
            <h3 className="font-display text-base sm:text-lg font-medium text-white">
              Destaques em Rotação
            </h3>

            <span className="sm:hidden text-xs text-[#8a8a8a]">
              Arraste para explorar
            </span>

            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollRail('left')}
                aria-label="Ver destaques anteriores"
                className="w-9 h-9 rounded-full bg-[#151515] border border-white/15 text-white hover:bg-white hover:text-[#0b0b0b] inline-flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollRail('right')}
                aria-label="Ver próximos destaques"
                className="w-9 h-9 rounded-full bg-[#151515] border border-white/15 text-white hover:bg-white hover:text-[#0b0b0b] inline-flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            ref={railRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="flex gap-3.5 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-2 cursor-grab active:cursor-grabbing -mx-5 px-5 sm:mx-0 sm:px-0"
          >
            {featuredProducts.map((product) => (
              <div
                key={`featured-${product.id}`}
                className="w-[218px] sm:w-[242px] lg:w-[252px] snap-start shrink-0"
              >
                <ProductCard product={product} compact />
              </div>
            ))}
          </div>
        </div>

        {/* Filterable Main Catalog Section */}
        <div
          id="catalogo-principal"
          className="space-y-6 pt-8 border-t border-white/10 scroll-mt-24"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-lg sm:text-xl font-medium text-white">
                {activeCategory === 'Todos'
                  ? `Catálogo (${filteredProducts.length})`
                  : `${activeCategory} (${filteredProducts.length})`}
              </h3>

              <button
                type="button"
                onClick={openMenu}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#151515] border border-white/15 text-xs font-medium text-white hover:border-white/35 transition-colors cursor-pointer shrink-0"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Filtros & Busca</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 sm:w-56">
                <Search
                  className="w-3.5 h-3.5 text-[#8a8a8a] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar peça ou marca..."
                  aria-label="Pesquisar no catálogo"
                  className="w-full h-10 pl-8 pr-8 rounded-xl bg-[#121212] border border-white/10 text-xs text-white placeholder:text-[#737373] focus:outline-none focus:border-white/40"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Limpar busca"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full text-[#8a8a8a] hover:text-white inline-flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-3 h-3" aria-hidden="true" />
                  </button>
                )}
              </div>

              <div
                className="flex items-center justify-between sm:justify-start gap-1 p-1 bg-[#121212] border border-white/10 rounded-xl overflow-x-auto no-scrollbar"
                role="tablist"
                aria-label="Filtrar coleção por categoria"
              >
                {CATEGORY_FILTERS.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                        isActive
                          ? 'bg-white text-[#0b0b0b] font-semibold'
                          : 'text-[#a3a3a3] hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#a3a3a3]">
              <span>
                Exibindo {filteredProducts.length}{' '}
                {filteredProducts.length === 1 ? 'resultado' : 'resultados'}
                {activeBrand !== 'Todas' ? ` · Marca: ${activeBrand}` : ''}
                {searchQuery.trim() ? ` · Busca: "${searchQuery.trim()}"` : ''}
              </span>
              <button
                type="button"
                onClick={resetFilters}
                className="text-white underline underline-offset-4 hover:text-[#d4d4d4] cursor-pointer"
              >
                Limpar filtros
              </button>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center space-y-3 bg-[#121212] border border-white/10 rounded-xl px-5">
              <p className="font-display text-lg font-semibold text-white">
                Nenhuma peça encontrada
              </p>
              <p className="text-sm text-[#a3a3a3]">
                Tente limpar os filtros ou pesquisar por outro termo ou marca.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-full bg-white text-[#0b0b0b] text-xs font-semibold hover:bg-[#e5e5e5] transition-colors cursor-pointer"
              >
                Mostrar todos os produtos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 max-w-sm mx-auto sm:max-w-none">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
