import { Skeleton } from '@/components/ui/skeleton';

export const ProductCardSkeleton = () => {
  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all hover:shadow-xl">
      {/* Image Skeleton */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Brand */}
        <Skeleton className="h-4 w-20" />

        {/* Title */}
        <Skeleton className="h-5 w-full" />

        {/* Price */}
        <Skeleton className="h-6 w-24" />

        {/* Button */}
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
