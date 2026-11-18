import { useEffect, useState } from 'react';
import {
  MessageCircle,
  Minus,
  Plus,
  Shirt,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { formatBRL } from '../data/products';
import { buildWhatsAppOrderUrl, useCartStore } from '../store/useCartStore';

function CartThumbnail({ src, alt }: { src: string; alt: string }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className="w-20 h-24 rounded-lg bg-[#1a1a1a] border border-white/10 flex items-center justify-center shrink-0">
        <Shirt className="w-6 h-6 text-[#737373]" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setImgError(true)}
      className="w-20 h-24 object-cover rounded-lg bg-[#1a1a1a] border border-white/10 shrink-0"
    />
  );
}

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCartStore();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCart();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeCart]);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const whatsappUrl = items.length > 0 ? buildWhatsAppOrderUrl(items) : '#';

  const handleBrowseCollection = () => {
    closeCart();
    const el = document.getElementById('colecoes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Sacola de compras"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full sm:w-[440px] h-full bg-[#121212] border-l border-white/10 flex flex-col"
          >
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <ShoppingBag
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                />
                <h2 className="font-display text-lg font-semibold text-white">
                  Sua Sacola
                </h2>
                <span className="text-xs text-[#a3a3a3] tabular-nums">
                  ({totalCount} {totalCount === 1 ? 'peça' : 'peças'})
                </span>
              </div>

              <button
                type="button"
                onClick={closeCart}
                aria-label="Fechar sacola"
                className="w-10 h-10 rounded-full border border-white/10 bg-[#0b0b0b] text-[#d4d4d4] hover:text-white hover:border-white/35 inline-flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-14 h-14 rounded-full bg-[#151515] border border-white/10 flex items-center justify-center">
                    <ShoppingBag
                      className="w-6 h-6 text-[#a3a3a3]"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="space-y-1.5 max-w-xs">
                    <p className="font-display text-lg font-semibold text-white">
                      Sua sacola está vazia
                    </p>
                    <p className="text-sm text-[#a3a3a3] leading-relaxed">
                      Escolha as peças e tamanhos no catálogo para montar seu
                      pedido e enviar direto no nosso WhatsApp.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleBrowseCollection}
                    className="mt-2 px-6 py-2.5 min-h-[44px] rounded-full bg-white text-[#0b0b0b] text-sm font-semibold hover:bg-[#e5e5e5] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    Ver Coleção Oficial
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.cartItemKey}
                      className="p-3.5 rounded-xl bg-[#151515] border border-white/10 flex gap-4"
                    >
                      <CartThumbnail src={item.image} alt={item.name} />

                      <div className="flex-1 min-w-0 flex flex-col justify-between gap-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 space-y-0.5">
                            <p className="text-xs text-[#a3a3a3]">
                              {item.brand} · Tam.{' '}
                              <span className="text-white font-medium">
                                {item.selectedSize}
                              </span>
                            </p>
                            <h3 className="text-sm font-semibold text-white truncate">
                              {item.name}
                            </h3>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.cartItemKey)}
                            aria-label={`Remover ${item.name} tamanho ${item.selectedSize}`}
                            className="w-8 h-8 rounded-full text-[#a3a3a3] hover:text-white hover:bg-white/10 inline-flex items-center justify-center transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <div className="inline-flex items-center border border-white/10 rounded-lg bg-[#0b0b0b]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.cartItemKey, -1)}
                              aria-label={`Diminuir quantidade de ${item.name}`}
                              className="w-9 h-9 inline-flex items-center justify-center text-[#d4d4d4] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-l-lg"
                            >
                              <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                            <span className="px-2.5 text-sm font-medium text-white tabular-nums min-w-[28px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.cartItemKey, 1)}
                              aria-label={`Aumentar quantidade de ${item.name}`}
                              className="w-9 h-9 inline-flex items-center justify-center text-[#d4d4d4] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-r-lg"
                            >
                              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                          </div>

                          <p className="text-sm font-semibold text-white tabular-nums">
                            {formatBRL(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-5 border-t border-white/10 bg-[#0e0e0e] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#a3a3a3]">Subtotal</span>
                  <span className="text-lg font-semibold text-white tabular-nums">
                    {formatBRL(subtotal)}
                  </span>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[48px] px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-[#052010] text-sm font-semibold inline-flex items-center justify-center gap-2.5 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Finalizar Pedido no WhatsApp</span>
                </a>

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs text-[#a3a3a3] hover:text-white transition-colors py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
                  >
                    Limpar sacola
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
