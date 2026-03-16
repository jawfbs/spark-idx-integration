import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SearchParams, Listing, User } from '@/lib/types';

// ============================================
// AUTH STORE
// ============================================

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));

// ============================================
// SEARCH STORE
// ============================================

interface SearchState {
  params: SearchParams;
  isSearching: boolean;
  mapView: boolean;
  setParams: (params: Partial<SearchParams>) => void;
  resetParams: () => void;
  setSearching: (searching: boolean) => void;
  setMapView: (mapView: boolean) => void;
}

const defaultSearchParams: SearchParams = {
  status: 'A',
  page: 1,
  pageSize: 24,
  sortBy: 'listDate',
  sortOrder: 'desc',
};

export const useSearchStore = create<SearchState>((set) => ({
  params: defaultSearchParams,
  isSearching: false,
  mapView: false,
  setParams: (params) =>
    set((state) => ({
      params: { ...state.params, ...params, page: params.page || 1 },
    })),
  resetParams: () => set({ params: defaultSearchParams }),
  setSearching: (isSearching) => set({ isSearching }),
  setMapView: (mapView) => set({ mapView }),
}));

// ============================================
// FAVORITES STORE (with persistence)
// ============================================

interface FavoritesState {
  favorites: string[]; // MLS numbers
  addFavorite: (mlsNumber: string) => void;
  removeFavorite: (mlsNumber: string) => void;
  isFavorite: (mlsNumber: string) => boolean;
  setFavorites: (favorites: string[]) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (mlsNumber) =>
        set((state) => ({
          favorites: [...state.favorites, mlsNumber],
        })),
      removeFavorite: (mlsNumber) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f !== mlsNumber),
        })),
      isFavorite: (mlsNumber) => get().favorites.includes(mlsNumber),
      setFavorites: (favorites) => set({ favorites }),
    }),
    {
      name: 'spark-idx-favorites',
    }
  )
);

// ============================================
// UI STORE
// ============================================

interface UIState {
  mobileMenuOpen: boolean;
  searchDrawerOpen: boolean;
  filterDrawerOpen: boolean;
  contactModalOpen: boolean;
  showingModalOpen: boolean;
  shareModalOpen: boolean;
  loginModalOpen: boolean;
  activeMlsNumber: string | null;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchDrawerOpen: (open: boolean) => void;
  setFilterDrawerOpen: (open: boolean) => void;
  setContactModalOpen: (open: boolean, mlsNumber?: string) => void;
  setShowingModalOpen: (open: boolean, mlsNumber?: string) => void;
  setShareModalOpen: (open: boolean, mlsNumber?: string) => void;
  setLoginModalOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  searchDrawerOpen: false,
  filterDrawerOpen: false,
  contactModalOpen: false,
  showingModalOpen: false,
  shareModalOpen: false,
  loginModalOpen: false,
  activeMlsNumber: null,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setSearchDrawerOpen: (open) => set({ searchDrawerOpen: open }),
  setFilterDrawerOpen: (open) => set({ filterDrawerOpen: open }),
  setContactModalOpen: (open, mlsNumber) =>
    set({ contactModalOpen: open, activeMlsNumber: mlsNumber || null }),
  setShowingModalOpen: (open, mlsNumber) =>
    set({ showingModalOpen: open, activeMlsNumber: mlsNumber || null }),
  setShareModalOpen: (open, mlsNumber) =>
    set({ shareModalOpen: open, activeMlsNumber: mlsNumber || null }),
  setLoginModalOpen: (open) => set({ loginModalOpen: open }),
}));
