import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

export const StarRating = ({
  rating,
  totalStars = 5,
  size = 'md',
  showNumber = false,
  className,
}: StarRatingProps) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    const filled = i <= Math.floor(rating);
    const partial = i === Math.ceil(rating) && rating % 1 !== 0;

    stars.push(
      <div key={i} className="relative">
        <Star
          className={cn(
            sizeClasses[size],
            'text-yellow-400',
            filled || partial ? 'fill-yellow-400' : 'fill-none'
          )}
        />
        {partial && (
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: `${(rating % 1) * 100}%` }}
          >
            <Star
              className={cn(sizeClasses[size], 'text-yellow-400 fill-yellow-400')}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {stars}
      {showNumber && (
        <span className="text-sm text-muted-foreground ml-1">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
};

export default StarRating;
