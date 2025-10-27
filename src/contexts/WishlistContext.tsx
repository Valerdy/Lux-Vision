import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { STORAGE_KEYS, SUCCESS_MESSAGES } from '@/lib/constants';
import { wishlistAPI } from '@/services/api';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  totalItems: number;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [items, setItems] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  // Sync with localStorage when not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      try {
        localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(items));
      } catch (error) {
        console.error('Error saving wishlist to localStorage:', error);
      }
    }
  }, [items, isAuthenticated]);

  // Fetch wishlist from backend when user logs in
  useEffect(() => {
    const fetchWishlist = async () => {
      if (isAuthenticated && !authLoading) {
        try {
          setIsLoading(true);
          const response = await wishlistAPI.getAll();
          if (response.status === 'success') {
            const backendItems: Product[] = response.data.products.map((item: any) => ({
              id: item.id,
              name: item.name,
              brand: item.brand,
              price: item.price,
              image: item.images?.[0] || item.image,
              images: item.images || [],
              category: item.category,
              gender: item.gender,
              description: item.description || '',
              features: item.features || [],
              frameShape: item.frame_shape || '',
              material: item.material || '',
              color: item.color || '',
              inStock: item.in_stock,
              discount: item.discount,
            }));
            setItems(backendItems);
          }
        } catch (error: any) {
          console.error('Error fetching wishlist:', error);
          // Continue using local wishlist if API fails
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchWishlist();
  }, [isAuthenticated, authLoading]);

  const addToWishlist = async (product: Product) => {
    const exists = items.find(item => item.id === product.id);
    if (exists) {
      toast.info('Ce produit est déjà dans vos favoris');
      return;
    }

    if (isAuthenticated) {
      try {
        setIsLoading(true);
        await wishlistAPI.add(product.id);
        setItems(currentItems => [...currentItems, product]);
        toast.success(SUCCESS_MESSAGES.ADDED_TO_WISHLIST);
      } catch (error: any) {
        toast.error('Erreur lors de l\'ajout aux favoris');
        console.error('Add to wishlist error:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setItems(currentItems => [...currentItems, product]);
      toast.success(SUCCESS_MESSAGES.ADDED_TO_WISHLIST);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (isAuthenticated) {
      try {
        setIsLoading(true);
        await wishlistAPI.remove(productId);
        setItems(currentItems => currentItems.filter(item => item.id !== productId));
        toast.success(SUCCESS_MESSAGES.REMOVED_FROM_WISHLIST);
      } catch (error: any) {
        toast.error('Erreur lors de la suppression des favoris');
        console.error('Remove from wishlist error:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setItems(currentItems => currentItems.filter(item => item.id !== productId));
      toast.success(SUCCESS_MESSAGES.REMOVED_FROM_WISHLIST);
    }
  };

  const isInWishlist = (productId: string): boolean => {
    return items.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);
    toast.success('Favoris vidés');
  };

  const totalItems = items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        totalItems,
        isLoading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};
