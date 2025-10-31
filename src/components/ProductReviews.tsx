import { useState, useEffect } from 'react';
import { Star, ThumbsUp, BadgeCheck, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/StarRating';
import { reviewsAPI } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Review {
  id: string;
  productId: string;
  userId: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
}

interface ProductReviewsProps {
  productId: string;
}

export const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const { isAuthenticated, user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
  });

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const response = await reviewsAPI.getByProduct(productId);
        if (response.status === 'success') {
          setReviews(response.data.reviews || []);
          setAverageRating(response.data.averageRating || 0);
        }
      } catch (error: any) {
        console.error('Error fetching reviews:', error);
        // Set defaults if API fails
        setReviews([]);
        setAverageRating(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: reviews.length > 0
      ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100
      : 0,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Vous devez être connecté pour laisser un avis');
      return;
    }

    if (!newReview.title || !newReview.comment) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await reviewsAPI.create({
        productId,
        rating: newReview.rating,
        title: newReview.title,
        comment: newReview.comment,
      });

      if (response.status === 'success') {
        toast.success('Merci pour votre avis !');
        setShowForm(false);
        setNewReview({ rating: 5, title: '', comment: '' });

        // Refresh reviews
        const reviewsResponse = await reviewsAPI.getByProduct(productId);
        if (reviewsResponse.status === 'success') {
          setReviews(reviewsResponse.data.reviews || []);
          setAverageRating(reviewsResponse.data.averageRating || 0);
        }
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erreur lors de l\'ajout de l\'avis';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
      return;
    }

    try {
      const response = await reviewsAPI.delete(reviewId);
      if (response.status === 'success') {
        toast.success('Avis supprimé avec succès');

        // Refresh reviews
        const reviewsResponse = await reviewsAPI.getByProduct(productId);
        if (reviewsResponse.status === 'success') {
          setReviews(reviewsResponse.data.reviews || []);
          setAverageRating(reviewsResponse.data.averageRating || 0);
        }
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erreur lors de la suppression de l\'avis';
      toast.error(message);
    }
  };

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <Card className="p-6">
        <h3 className="text-2xl font-bold mb-6">Avis Clients</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <div className="text-5xl font-bold">{(averageRating || 0).toFixed(1)}</div>
              <div>
                <StarRating rating={averageRating || 0} size="lg" />
                <p className="text-sm text-muted-foreground mt-1">
                  Basé sur {reviews.length} avis
                </p>
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ star, count, percentage }) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm w-8">{star} <Star className="inline w-3 h-3 fill-yellow-400 text-yellow-400" /></span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review Button */}
        <div className="mt-6">
          {isAuthenticated ? (
            <Button
              onClick={() => setShowForm(!showForm)}
              variant={showForm ? 'outline' : 'default'}
              className="w-full md:w-auto"
            >
              {showForm ? 'Annuler' : 'Écrire un avis'}
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">
              Veuillez vous connecter pour laisser un avis
            </p>
          )}
        </div>
      </Card>

      {/* Review Form */}
      {showForm && (
        <Card className="p-6 animate-slide-down">
          <h4 className="text-xl font-bold mb-4">Donnez votre avis</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Votre note *</Label>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={cn(
                        'w-8 h-8 text-yellow-400',
                        rating <= newReview.rating ? 'fill-yellow-400' : 'fill-none'
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="title">Titre de l'avis *</Label>
              <Input
                id="title"
                value={newReview.title}
                onChange={e => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Résumez votre expérience"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <Label htmlFor="comment">Votre avis *</Label>
              <Textarea
                id="comment"
                value={newReview.comment}
                onChange={e => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="Partagez votre expérience avec ce produit..."
                rows={5}
                required
                disabled={isSubmitting}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Envoi en cours...' : 'Soumettre mon avis'}
            </Button>
          </form>
        </Card>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={review.rating} size="sm" />
                    {review.verified && (
                      <Badge variant="secondary" className="text-xs gap-1">
                        <BadgeCheck className="w-3 h-3" />
                        Achat vérifié
                      </Badge>
                    )}
                  </div>
                  <h5 className="font-semibold text-lg">{review.title}</h5>
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {new Date(review.date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>

              <p className="text-muted-foreground mb-3">{review.comment}</p>

              <div className="flex items-center justify-between pt-3 border-t">
                <p className="text-sm font-medium">{review.author}</p>
                <div className="flex items-center gap-2">
                  {user && user.id === review.userId && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(review.id)}
                      className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                      Supprimer
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Utile ({review.helpful})
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Star className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
          <h4 className="text-xl font-semibold mb-2">Aucun avis pour le moment</h4>
          <p className="text-muted-foreground mb-6">
            Soyez le premier à donner votre avis sur ce produit
          </p>
          <Button onClick={() => setShowForm(true)}>
            Écrire le premier avis
          </Button>
        </Card>
      )}
    </div>
  );
};

export default ProductReviews;
