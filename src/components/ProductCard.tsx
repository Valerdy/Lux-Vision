import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Tag } from 'lucide-react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} ajouté au panier`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="gradient-card rounded-lg overflow-hidden shadow-card hover-lift relative">
        {/* Discount Badge */}
        {product.discount && (
          <Badge
            className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg"
          >
            <Tag className="w-3 h-3 mr-1" />
            -{product.discount}%
          </Badge>
        )}

        {/* Wishlist Button */}
        <Button
          size="icon"
          variant="ghost"
          onClick={handleToggleWishlist}
          className={cn(
            'absolute top-2 right-2 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all',
            inWishlist && 'text-red-500 hover:text-red-600'
          )}
          aria-label={inWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <Heart
            className={cn('w-4 h-4', inWishlist && 'fill-current')}
          />
        </Button>

        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-smooth group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <div className="p-4 space-y-3">
          <div>
            <p className="text-xs text-muted-foreground font-medium">{product.brand}</p>
            <h3 className="font-semibold text-foreground group-hover:text-accent transition-smooth">
              {product.name}
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {product.discount ? (
                <>
                  <p className="text-lg font-bold text-accent">
                    {discountedPrice.toLocaleString('fr-FR')} FCFA
                  </p>
                  <p className="text-xs text-muted-foreground line-through">
                    {product.price.toLocaleString('fr-FR')} FCFA
                  </p>
                </>
              ) : (
                <p className="text-lg font-bold text-accent">
                  {product.price.toLocaleString('fr-FR')} FCFA
                </p>
              )}
            </div>
            <Button
              size="icon"
              variant="secondary"
              onClick={handleAddToCart}
              className="opacity-0 group-hover:opacity-100 transition-smooth"
              aria-label="Ajouter au panier"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-2 text-xs">
            <span className="px-2 py-1 bg-muted rounded-md text-muted-foreground capitalize">
              {product.category === 'optical' ? 'Vue' : 'Soleil'}
            </span>
            <span className="px-2 py-1 bg-muted rounded-md text-muted-foreground capitalize">
              {product.gender === 'men' ? 'Homme' : product.gender === 'women' ? 'Femme' : 'Unisexe'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
