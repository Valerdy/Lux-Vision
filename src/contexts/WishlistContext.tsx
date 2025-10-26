import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { STORAGE_KEYS, SUCCESS_MESSAGES } from '@/lib/constants';
import { toast } from 'sonner';

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [items]);

  const addToWishlist = (product: Product) => {
    setItems(currentItems => {
      const exists = currentItems.find(item => item.id === product.id);

      if (exists) {
        toast.info('Ce produit est déjà dans vos favoris');
        return currentItems;
      }

      toast.success(SUCCESS_MESSAGES.ADDED_TO_WISHLIST);
      return [...currentItems, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setItems(currentItems => {
      const filtered = currentItems.filter(item => item.id !== productId);
      toast.success(SUCCESS_MESSAGES.REMOVED_FROM_WISHLIST);
      return filtered;
    });
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
