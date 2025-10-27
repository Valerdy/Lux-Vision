/**
 * Application-wide constants and configuration
 */

// App Information
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Lux-Vision';
export const APP_URL = import.meta.env.VITE_APP_URL || 'http://localhost:5173';
export const APP_ENV = import.meta.env.VITE_APP_ENV || 'development';

// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
export const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10);

// Storage Configuration
export const STORAGE_PREFIX = import.meta.env.VITE_STORAGE_PREFIX || 'lux_vision_';
export const CACHE_EXPIRATION = parseInt(import.meta.env.VITE_CACHE_EXPIRATION || '3600000', 10);

// Storage Keys
export const STORAGE_KEYS = {
  CART: `${STORAGE_PREFIX}cart`,
  WISHLIST: `${STORAGE_PREFIX}wishlist`,
  COMPARE: `${STORAGE_PREFIX}compare`,
  RECENTLY_VIEWED: `${STORAGE_PREFIX}recently_viewed`,
  USER: `${STORAGE_PREFIX}user`,
  AUTH_TOKEN: `${STORAGE_PREFIX}auth_token`,
  THEME: `${STORAGE_PREFIX}theme`,
  PREFERENCES: `${STORAGE_PREFIX}preferences`,
} as const;

// Pagination
export const PRODUCTS_PER_PAGE = parseInt(import.meta.env.VITE_PRODUCTS_PER_PAGE || '12', 10);
export const MAX_CART_ITEMS = parseInt(import.meta.env.VITE_MAX_CART_ITEMS || '50', 10);

// Feature Flags
export const FEATURES = {
  ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ERROR_TRACKING: import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true',
  DEV_TOOLS: import.meta.env.VITE_ENABLE_DEV_TOOLS === 'true',
} as const;

// Contact Information
export const CONTACT = {
  EMAIL: import.meta.env.VITE_CONTACT_EMAIL || 'contact@lux-vision.com',
  SUPPORT_EMAIL: import.meta.env.VITE_SUPPORT_EMAIL || 'support@lux-vision.com',
  PHONE: '+33 1 23 45 67 89',
  ADDRESS: '123 Avenue des Champs-Élysées, 75008 Paris, France',
} as const;

// Social Media Links
export const SOCIAL_LINKS = {
  FACEBOOK: import.meta.env.VITE_FACEBOOK_URL || 'https://facebook.com/luxvision',
  INSTAGRAM: import.meta.env.VITE_INSTAGRAM_URL || 'https://instagram.com/luxvision',
  TWITTER: import.meta.env.VITE_TWITTER_URL || 'https://twitter.com/luxvision',
  LINKEDIN: 'https://linkedin.com/company/luxvision',
  YOUTUBE: 'https://youtube.com/@luxvision',
} as const;

// SEO Configuration
export const SEO = {
  DEFAULT_TITLE: import.meta.env.VITE_SEO_TITLE || 'Lux-Vision - Premium Eyewear',
  DEFAULT_DESCRIPTION: import.meta.env.VITE_SEO_DESCRIPTION || 'Découvrez notre collection de lunettes de vue et de soleil haut de gamme',
  DEFAULT_KEYWORDS: import.meta.env.VITE_SEO_KEYWORDS || 'lunettes,eyewear,sunglasses,optical',
  OG_IMAGE: '/hero-eyewear.jpg',
} as const;

// Product Categories
export const PRODUCT_CATEGORIES = {
  OPTICAL: 'optical',
  SUNGLASSES: 'sunglasses',
} as const;

// Gender Options
export const GENDER_OPTIONS = {
  MEN: 'men',
  WOMEN: 'women',
  UNISEX: 'unisex',
} as const;

// Price Range (in cents for accuracy)
export const PRICE_RANGES = [
  { label: 'Moins de 50€', min: 0, max: 50000 },
  { label: '50€ - 100€', min: 50000, max: 100000 },
  { label: '100€ - 150€', min: 100000, max: 150000 },
  { label: 'Plus de 150€', min: 150000, max: Infinity },
] as const;

// Frame Shapes
export const FRAME_SHAPES = [
  'Round',
  'Aviator',
  'Cat Eye',
  'Square',
  'Wayfarer',
  'Shield',
  'Oversized',
  'Oval',
  'Rectangle',
  'Geometric',
] as const;

// Materials
export const MATERIALS = [
  'Acetate',
  'Metal',
  'Titanium',
  'TR90',
  'Wood',
  'Carbon Fiber',
  'Stainless Steel',
] as const;

// Shipping Options
export const SHIPPING = {
  FREE_SHIPPING_THRESHOLD: 100000, // 100€ in cents
  STANDARD_SHIPPING_COST: 4990, // 49.90€ in cents
  EXPRESS_SHIPPING_COST: 9990, // 99.90€ in cents
  STANDARD_DELIVERY_DAYS: '3-5',
  EXPRESS_DELIVERY_DAYS: '1-2',
} as const;

// Currency
export const CURRENCY = {
  CODE: 'EUR',
  SYMBOL: '€',
  LOCALE: 'fr-FR',
} as const;

// Image Configuration
export const IMAGE_CDN_URL = import.meta.env.VITE_IMAGE_CDN_URL || '';
export const MAX_IMAGE_SIZE = parseInt(import.meta.env.VITE_MAX_IMAGE_SIZE || '5242880', 10); // 5MB

// Animation Durations (in ms)
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Toast Notifications Duration (in ms)
export const TOAST_DURATION = {
  SUCCESS: 3000,
  ERROR: 5000,
  INFO: 4000,
  WARNING: 4000,
} as const;

// Navigation Menu Items
export const NAV_ITEMS = [
  { label: 'Accueil', href: '/' },
  { label: 'Boutique', href: '/shop' },
  { label: 'À propos', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

// Footer Links
export const FOOTER_LINKS = {
  COMPANY: [
    { label: 'À propos', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Blog', href: '/blog' },
  ],
  SHOP: [
    { label: 'Boutique', href: '/shop' },
    { label: 'Lunettes de Vue', href: '/shop?category=optical' },
    { label: 'Lunettes de Soleil', href: '/shop?category=sunglasses' },
    { label: 'Promotions', href: '/shop?sort=discount' },
  ],
  SUPPORT: [
    { label: 'Service Client', href: '/contact' },
    { label: 'Livraison', href: '/shipping' },
    { label: 'Retours', href: '/returns' },
    { label: 'Garantie', href: '/warranty' },
  ],
  LEGAL: [
    { label: 'Mentions Légales', href: '/legal' },
    { label: 'CGV', href: '/terms' },
    { label: 'Politique de Confidentialité', href: '/privacy' },
    { label: 'Cookies', href: '/cookies' },
  ],
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Une erreur est survenue. Veuillez réessayer.',
  NETWORK: 'Erreur de connexion. Vérifiez votre connexion internet.',
  NOT_FOUND: 'Ressource introuvable.',
  UNAUTHORIZED: 'Vous devez être connecté pour effectuer cette action.',
  VALIDATION: 'Veuillez vérifier les informations saisies.',
  SERVER: 'Erreur serveur. Veuillez réessayer plus tard.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  ADDED_TO_CART: 'Produit ajouté au panier',
  REMOVED_FROM_CART: 'Produit retiré du panier',
  ADDED_TO_WISHLIST: 'Produit ajouté aux favoris',
  REMOVED_FROM_WISHLIST: 'Produit retiré des favoris',
  ORDER_PLACED: 'Commande confirmée ! Vous recevrez un email de confirmation.',
  PROFILE_UPDATED: 'Profil mis à jour avec succès',
  PASSWORD_CHANGED: 'Mot de passe modifié avec succès',
  EMAIL_SENT: 'Email envoyé avec succès',
} as const;

// Validation Rules
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  MESSAGE_MAX_LENGTH: 1000,
} as const;

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;
