import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useRecentlyViewed } from '@/contexts/RecentlyViewedContext';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

interface RecentlyViewedProps {
  maxItems?: number;
  className?: string;
}

export const RecentlyViewed = ({ maxItems = 4, className }: RecentlyViewedProps) => {
  const { items, clearRecentlyViewed } = useRecentlyViewed();

  if (items.length === 0) {
    return null;
  }

  const displayItems = items.slice(0, maxItems);

  return (
    <section className={className}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Récemment Consultés</h2>
        </div>
        <div className="flex gap-2">
          {items.length > maxItems && (
            <Link to="/shop">
              <Button variant="outline" size="sm">
                Voir tout
              </Button>
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearRecentlyViewed}
            className="text-muted-foreground"
          >
            Effacer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayItems.map((product, index) => (
          <div
            key={product.id}
            className="animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
