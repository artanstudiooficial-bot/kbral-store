import { create } from 'zustand';
import { formatBRL, Product } from '../data/products';

export interface CartItem extends Product {
  cartItemKey: string;
  selectedSize: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, selectedSize: string) => void;
  removeItem: (cartItemKey: string) => void;
  updateQuantity: (cartItemKey: string, delta: number) => void;
  clearCart: () => void;
}

export const WHATSAPP_NUMBER = '5548991705954';

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  isOpen: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  addItem: (product, selectedSize) =>
    set((state) => {
      const cartItemKey = `${product.id}__${selectedSize}`;
      const existing = state.items.find(
        (item) => item.cartItemKey === cartItemKey
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.cartItemKey === cartItemKey
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { ...product, cartItemKey, selectedSize, quantity: 1 },
        ],
      };
    }),
  removeItem: (cartItemKey) =>
    set((state) => ({
      items: state.items.filter((item) => item.cartItemKey !== cartItemKey),
    })),
  updateQuantity: (cartItemKey, delta) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.cartItemKey === cartItemKey
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),
  clearCart: () => set({ items: [] }),
}));

export function buildWhatsAppOrderUrl(items: CartItem[]): string {
  const itemList = items
    .map(
      (item) =>
        `${item.quantity}x ${item.name} (Tam: ${item.selectedSize}) - ${formatBRL(item.price * item.quantity)}`
    )
    .join(', ');
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const fullMessage = `Olá, tenho interesse nestes produtos da KBRAL STORE: ${itemList} | Total estimado: ${formatBRL(total)}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
}
