import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product } from '@/data/products';
import { STORAGE_KEYS } from '@/lib/constants';
import { toast } from 'sonner';

interface CompareContextType {
  items: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  totalItems: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE_ITEMS = 3;

export const CompareProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMPARE || 'lux-vision-compare');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPARE || 'lux-vision-compare', JSON.stringify(items));
  }, [items]);

  const addToCompare = useCallback((product: Product) => {
    setItems(prev => {
      if (prev.length >= MAX_COMPARE_ITEMS) {
        toast.error(`Vous pouvez comparer jusqu'à ${MAX_COMPARE_ITEMS} produits maximum`);
        return prev;
      }

      if (prev.find(item => item.id === product.id)) {
        toast.info('Ce produit est déjà dans la comparaison');
        return prev;
      }

      toast.success('Produit ajouté à la comparaison');
      return [...prev, product];
    });
  }, []);

  const removeFromCompare = useCallback((productId: string) => {
    setItems(prev => prev.filter(item => item.id !== productId));
    toast.success('Produit retiré de la comparaison');
  }, []);

  const clearCompare = useCallback(() => {
    setItems([]);
    toast.success('Comparaison vidée');
  }, []);

  const isInCompare = useCallback((productId: string) => {
    return items.some(item => item.id === productId);
  }, [items]);

  return (
    <CompareContext.Provider
      value={{
        items,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        totalItems: items.length,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
