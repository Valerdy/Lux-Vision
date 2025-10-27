import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('lux-vision-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login if unauthorized
      localStorage.removeItem('lux-vision-token');
      localStorage.removeItem('lux-vision-user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) => {
    const response = await api.put('/auth/updateprofile', data);
    return response.data;
  },

  updatePassword: async (currentPassword: string, newPassword: string) => {
    const response = await api.put('/auth/updatepassword', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },
};

// Transform snake_case to camelCase for products
const transformProduct = (product: any) => {
  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    price: product.price,
    image: product.images?.[0] || '/placeholder.svg',
    images: product.images || [],
    category: product.category,
    gender: product.gender,
    description: product.description,
    features: product.features || [],
    frameShape: product.frame_shape,
    material: product.material,
    color: product.color,
    inStock: product.in_stock,
    discount: product.discount,
  };
};

// Products API
export const productsAPI = {
  getAll: async (params?: {
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
  }) => {
    const response = await api.get('/products', { params });
    // Transform products to match frontend format
    if (response.data.data?.products) {
      response.data.data.products = response.data.data.products.map(transformProduct);
    }
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    // Transform product to match frontend format
    if (response.data.data?.product) {
      response.data.data.product = transformProduct(response.data.data.product);
    }
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/products/stats');
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/products', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

// Reviews API
export const reviewsAPI = {
  getByProduct: async (productId: string) => {
    const response = await api.get(`/reviews/product/${productId}`);
    return response.data;
  },

  create: async (data: {
    productId: string;
    rating: number;
    title: string;
    comment: string;
  }) => {
    const response = await api.post('/reviews', data);
    return response.data;
  },

  update: async (id: string, data: {
    rating?: number;
    title?: string;
    comment?: string;
  }) => {
    const response = await api.put(`/reviews/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  },
};

// Orders API
export const ordersAPI = {
  getAll: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  create: async (data: {
    items: Array<{
      productId: string;
      productName: string;
      price: number;
      quantity: number;
    }>;
    shippingAddress: any;
    billingAddress: any;
    paymentMethod: string;
  }) => {
    const response = await api.post('/orders', data);
    return response.data;
  },

  updateStatus: async (id: string, status: string) => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },
};

// Wishlist API
export const wishlistAPI = {
  getAll: async () => {
    const response = await api.get('/users/wishlist');
    return response.data;
  },

  add: async (productId: string) => {
    const response = await api.post('/users/wishlist', { productId });
    return response.data;
  },

  remove: async (productId: string) => {
    const response = await api.delete(`/users/wishlist/${productId}`);
    return response.data;
  },
};

// Cart API
export const cartAPI = {
  getAll: async () => {
    const response = await api.get('/users/cart');
    return response.data;
  },

  add: async (productId: string, quantity: number = 1) => {
    const response = await api.post('/users/cart', { productId, quantity });
    return response.data;
  },

  update: async (id: string, quantity: number) => {
    const response = await api.put(`/users/cart/${id}`, { quantity });
    return response.data;
  },

  remove: async (id: string) => {
    const response = await api.delete(`/users/cart/${id}`);
    return response.data;
  },

  clear: async () => {
    const response = await api.delete('/users/cart');
    return response.data;
  },
};

export default api;
