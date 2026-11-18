import { create } from 'zustand';
import { ProductCategory } from '../data/products';

export type CategoryFilter = 'Todos' | ProductCategory;

interface CatalogStore {
  isMenuOpen: boolean;
  activeCategory: CategoryFilter;
  activeBrand: string;
  searchQuery: string;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  setActiveCategory: (category: CategoryFilter) => void;
  setActiveBrand: (brand: string) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
  navigateToCategory: (category: CategoryFilter) => void;
}

export const useCatalogStore = create<CatalogStore>((set) => ({
  isMenuOpen: false,
  activeCategory: 'Todos',
  activeBrand: 'Todas',
  searchQuery: '',
  openMenu: () => set({ isMenuOpen: true }),
  closeMenu: () => set({ isMenuOpen: false }),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  setActiveCategory: (activeCategory) => set({ activeCategory }),
  setActiveBrand: (activeBrand) => set({ activeBrand }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  resetFilters: () =>
    set({
      activeCategory: 'Todos',
      activeBrand: 'Todas',
      searchQuery: '',
    }),
  navigateToCategory: (category) => {
    set({
      activeCategory: category,
      activeBrand: 'Todas',
      searchQuery: '',
      isMenuOpen: false,
    });
    window.setTimeout(() => {
      const target = document.getElementById('catalogo-principal');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  },
}));
