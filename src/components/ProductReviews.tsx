import { useState } from 'react';
import { Star, ThumbsUp, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/StarRating';
import { Review, getProductReviews, getAverageRating } from '@/data/reviews';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProductReviewsProps {
  productId: string;
}

export const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const reviews = getProductReviews(productId);
  const averageRating = getAverageRating(productId);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    author: '',
  });

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: reviews.length > 0
      ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100
      : 0,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newReview.author || !newReview.title || !newReview.comment) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    toast.success('Merci pour votre avis ! Il sera publié après modération.');
    setShowForm(false);
    setNewReview({ rating: 5, title: '', comment: '', author: '' });
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
              <div className="text-5xl font-bold">{averageRating.toFixed(1)}</div>
              <div>
                <StarRating rating={averageRating} size="lg" />
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
          <Button
            onClick={() => setShowForm(!showForm)}
            variant={showForm ? 'outline' : 'default'}
            className="w-full md:w-auto"
          >
            {showForm ? 'Annuler' : 'Écrire un avis'}
          </Button>
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
              <Label htmlFor="author">Votre nom *</Label>
              <Input
                id="author"
                value={newReview.author}
                onChange={e => setNewReview(prev => ({ ...prev, author: e.target.value }))}
                placeholder="Nom complet"
                required
              />
            </div>

            <div>
              <Label htmlFor="title">Titre de l'avis *</Label>
              <Input
                id="title"
                value={newReview.title}
                onChange={e => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Résumez votre expérience"
                required
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
              />
            </div>

            <Button type="submit" className="w-full">
              Soumettre mon avis
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
                  {new Date(review.date).toLocaleDateString('fr-FR')}
                </span>
              </div>

              <p className="text-muted-foreground mb-3">{review.comment}</p>

              <div className="flex items-center justify-between pt-3 border-t">
                <p className="text-sm font-medium">{review.author}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-muted-foreground hover:text-foreground"
                >
                  <ThumbsUp className="w-4 h-4" />
                  Utile ({review.helpful})
                </Button>
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
