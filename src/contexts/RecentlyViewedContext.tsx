import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product } from '@/data/products';
import { STORAGE_KEYS } from '@/lib/constants';

interface RecentlyViewedContextType {
  items: Product[];
  addToRecentlyViewed: (product: Product) => void;
  clearRecentlyViewed: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

const MAX_RECENT_ITEMS = 12;

export const RecentlyViewedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(items));
  }, [items]);

  const addToRecentlyViewed = (product: Product) => {
    setItems(prev => {
      // Remove the product if it's already in the list
      const filtered = prev.filter(item => item.id !== product.id);

      // Add to the beginning and limit to MAX_RECENT_ITEMS
      return [product, ...filtered].slice(0, MAX_RECENT_ITEMS);
    });
  };

  const clearRecentlyViewed = () => {
    setItems([]);
  };

  return (
    <RecentlyViewedContext.Provider
      value={{
        items,
        addToRecentlyViewed,
        clearRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
};
