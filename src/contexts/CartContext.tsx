import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { cartAPI } from '@/services/api';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

export interface CartItem extends Product {
  quantity: number;
  cart_id?: string; // Backend cart item ID
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('lux-vision-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);

  // Sync with localStorage when not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('lux-vision-cart', JSON.stringify(items));
    }
  }, [items, isAuthenticated]);

  // Fetch cart from backend when user logs in
  useEffect(() => {
    const fetchCart = async () => {
      if (isAuthenticated && !authLoading) {
        try {
          setIsLoading(true);
          const response = await cartAPI.getAll();
          if (response.status === 'success') {
            const backendItems: CartItem[] = response.data.items.map((item: any) => ({
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
              quantity: item.quantity,
              cart_id: item.cart_id,
            }));
            setItems(backendItems);
          }
        } catch (error: any) {
          console.error('Error fetching cart:', error);
          // Continue using local cart if API fails
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCart();
  }, [isAuthenticated, authLoading]);

  const addToCart = async (product: Product, quantity = 1) => {
    if (isAuthenticated) {
      try {
        setIsLoading(true);
        await cartAPI.add(product.id, quantity);

        // Update local state
        setItems(currentItems => {
          const existingItem = currentItems.find(item => item.id === product.id);
          if (existingItem) {
            return currentItems.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }
          return [...currentItems, { ...product, quantity }];
        });
      } catch (error: any) {
        toast.error('Erreur lors de l\'ajout au panier');
        console.error('Add to cart error:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Offline mode - use localStorage
      setItems(currentItems => {
        const existingItem = currentItems.find(item => item.id === product.id);
        if (existingItem) {
          return currentItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...currentItems, { ...product, quantity }];
      });
    }
  };

  const removeFromCart = async (productId: string) => {
    if (isAuthenticated) {
      const item = items.find(i => i.id === productId);
      if (!item?.cart_id) return;

      try {
        setIsLoading(true);
        await cartAPI.remove(item.cart_id);
        setItems(currentItems => currentItems.filter(item => item.id !== productId));
      } catch (error: any) {
        toast.error('Erreur lors de la suppression du panier');
        console.error('Remove from cart error:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setItems(currentItems => currentItems.filter(item => item.id !== productId));
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (isAuthenticated) {
      const item = items.find(i => i.id === productId);
      if (!item?.cart_id) return;

      try {
        setIsLoading(true);
        await cartAPI.update(item.cart_id, quantity);
        setItems(currentItems =>
          currentItems.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        );
      } catch (error: any) {
        toast.error('Erreur lors de la mise à jour du panier');
        console.error('Update cart error:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setItems(currentItems =>
        currentItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        setIsLoading(true);
        await cartAPI.clear();
        setItems([]);
      } catch (error: any) {
        toast.error('Erreur lors du vidage du panier');
        console.error('Clear cart error:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setItems([]);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
