import { useState, useEffect } from 'react';
import { productsAPI } from '@/services/api';
import { Product } from '@/data/products';

interface UseProductsParams {
  category?: string;
  gender?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  enabled?: boolean;
}

interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  total: number;
  totalPages: number;
  refetch: () => void;
}

export const useProducts = (params: UseProductsParams = {}): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const { enabled = true, ...apiParams } = params;

  const fetchProducts = async () => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await productsAPI.getAll(apiParams);

      if (response.status === 'success') {
        setProducts(response.data.products);
        setTotal(response.data.pagination?.total || response.data.products.length);
        setTotalPages(response.data.pagination?.totalPages || 1);
      }
    } catch (err: any) {
      setError(err);
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [
    params.category,
    params.gender,
    params.brand,
    params.minPrice,
    params.maxPrice,
    params.search,
    params.sortBy,
    params.sortOrder,
    params.page,
    params.limit,
    enabled,
  ]);

  return {
    products,
    isLoading,
    error,
    total,
    totalPages,
    refetch: fetchProducts,
  };
};

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await productsAPI.getById(id);

        if (response.status === 'success') {
          setProduct(response.data.product);
        }
      } catch (err: any) {
        setError(err);
        console.error('Error fetching product:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, isLoading, error };
};
