export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
}

export const reviews: Review[] = [
  // Pilote Classique
  {
    id: 'r1',
    productId: '1',
    author: 'Marie Dupont',
    rating: 5,
    title: 'Excellent choix !',
    comment: 'Ces lunettes pilote sont absolument magnifiques. La qualité est exceptionnelle et elles sont très confortables.',
    date: '2025-01-15',
    verified: true,
    helpful: 12,
  },
  {
    id: 'r2',
    productId: '1',
    author: 'Jean Martin',
    rating: 4,
    title: 'Très satisfait',
    comment: 'Bon rapport qualité-prix. Le style est intemporel.',
    date: '2025-01-10',
    verified: true,
    helpful: 8,
  },
  // Papillon Luxe
  {
    id: 'r3',
    productId: '2',
    author: 'Sophie Lefebvre',
    rating: 5,
    title: 'Magnifique !',
    comment: 'La forme papillon est parfaite pour mon visage. Les détails dorés sont sublimes.',
    date: '2025-01-18',
    verified: true,
    helpful: 15,
  },
  {
    id: 'r4',
    productId: '2',
    author: 'Claire Bernard',
    rating: 5,
    title: 'J\'adore',
    comment: 'Élégantes et confortables. Je reçois beaucoup de compliments !',
    date: '2025-01-12',
    verified: true,
    helpful: 10,
  },
  {
    id: 'r5',
    productId: '2',
    author: 'Isabelle Moreau',
    rating: 4,
    title: 'Très belles lunettes',
    comment: 'Qualité au rendez-vous, peut-être un peu chères mais ça vaut le coup.',
    date: '2025-01-08',
    verified: false,
    helpful: 5,
  },
  // Rectangle Pro
  {
    id: 'r6',
    productId: '3',
    author: 'Pierre Dubois',
    rating: 5,
    title: 'Parfait pour le bureau',
    comment: 'Look professionnel et confortable toute la journée.',
    date: '2025-01-20',
    verified: true,
    helpful: 18,
  },
  {
    id: 'r7',
    productId: '3',
    author: 'Thomas Laurent',
    rating: 4,
    title: 'Bon produit',
    comment: 'Solides et élégantes. Satisfait de mon achat.',
    date: '2025-01-14',
    verified: true,
    helpful: 7,
  },
  // Œil-de-Chat Chic
  {
    id: 'r8',
    productId: '4',
    author: 'Emma Rousseau',
    rating: 5,
    title: 'Coup de cœur',
    comment: 'Le style vintage est exactement ce que je cherchais. Qualité irréprochable.',
    date: '2025-01-17',
    verified: true,
    helpful: 20,
  },
  {
    id: 'r9',
    productId: '4',
    author: 'Laura Petit',
    rating: 5,
    title: 'Superbes lunettes',
    comment: 'Très élégantes et originales. Je recommande vivement.',
    date: '2025-01-11',
    verified: true,
    helpful: 14,
  },
  {
    id: 'r10',
    productId: '4',
    author: 'Julie Roux',
    rating: 4,
    title: 'Très contente',
    comment: 'Beau design, peut-être un peu fragiles mais j\'en prends soin.',
    date: '2025-01-05',
    verified: true,
    helpful: 6,
  },
  // Add more reviews for other products...
  {
    id: 'r11',
    productId: '5',
    author: 'Marc Fontaine',
    rating: 5,
    title: 'Style parfait',
    comment: 'Ces lunettes rondes sont magnifiques et très confortables.',
    date: '2025-01-19',
    verified: true,
    helpful: 9,
  },
  {
    id: 'r12',
    productId: '6',
    author: 'Alice Simon',
    rating: 4,
    title: 'Bon achat',
    comment: 'Protection UV excellente et style moderne.',
    date: '2025-01-13',
    verified: true,
    helpful: 11,
  },
];

// Helper function to get reviews for a specific product
export const getProductReviews = (productId: string): Review[] => {
  return reviews.filter(review => review.productId === productId);
};

// Helper function to calculate average rating
export const getAverageRating = (productId: string): number => {
  const productReviews = getProductReviews(productId);
  if (productReviews.length === 0) return 0;

  const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / productReviews.length) * 10) / 10; // Round to 1 decimal
};
