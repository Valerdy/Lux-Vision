import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '@/services/api';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'customer' | 'admin';
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem('lux-vision-token');
      const storedUser = localStorage.getItem('lux-vision-user');

      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));

          // Verify token is still valid by fetching profile
          const response = await authAPI.getProfile();
          if (response.status === 'success') {
            setUser(response.data.user);
          }
        } catch (error) {
          // Token is invalid, clear storage
          localStorage.removeItem('lux-vision-token');
          localStorage.removeItem('lux-vision-user');
          setToken(null);
          setUser(null);
        }
      }

      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);

      if (response.status === 'success') {
        const { token: newToken, user: newUser } = response.data;

        // Save to state
        setToken(newToken);
        setUser(newUser);

        // Save to localStorage
        localStorage.setItem('lux-vision-token', newToken);
        localStorage.setItem('lux-vision-user', JSON.stringify(newUser));

        toast.success('Connexion réussie !');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erreur lors de la connexion';
      toast.error(message);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await authAPI.register(data);

      if (response.status === 'success') {
        const { token: newToken, user: newUser } = response.data;

        // Save to state
        setToken(newToken);
        setUser(newUser);

        // Save to localStorage
        localStorage.setItem('lux-vision-token', newToken);
        localStorage.setItem('lux-vision-user', JSON.stringify(newUser));

        toast.success('Inscription réussie !');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erreur lors de l\'inscription';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    // Clear state
    setToken(null);
    setUser(null);

    // Clear localStorage
    localStorage.removeItem('lux-vision-token');
    localStorage.removeItem('lux-vision-user');

    // Clear cart and wishlist from localStorage (will be synced from server on next login)
    localStorage.removeItem('lux-vision-cart');
    localStorage.removeItem('lux-vision-wishlist');

    toast.success('Déconnexion réussie');
  };

  const updateProfile = async (data: UpdateProfileData) => {
    try {
      const response = await authAPI.updateProfile(data);

      if (response.status === 'success') {
        const updatedUser = response.data.user;
        setUser(updatedUser);
        localStorage.setItem('lux-vision-user', JSON.stringify(updatedUser));
        toast.success('Profil mis à jour avec succès');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erreur lors de la mise à jour du profil';
      toast.error(message);
      throw error;
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const response = await authAPI.updatePassword(currentPassword, newPassword);

      if (response.status === 'success') {
        toast.success('Mot de passe modifié avec succès');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erreur lors de la modification du mot de passe';
      toast.error(message);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
