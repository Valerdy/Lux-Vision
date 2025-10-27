import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { useWishlist } from '@/contexts/WishlistContext';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const Wishlist = () => {
  const { items, clearWishlist, totalItems } = useWishlist();
  const { addToCart } = useCart();

  const handleAddAllToCart = () => {
    if (items.length === 0) return;

    items.forEach(product => {
      addToCart(product);
    });

    toast.success(`${items.length} produit${items.length > 1 ? 's' : ''} ajouté${items.length > 1 ? 's' : ''} au panier`);
  };

  const totalValue = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <PageBreadcrumb items={[{ label: 'Favoris' }]} />

          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                  <Heart className="w-8 h-8 text-red-500 fill-current" />
                  Mes Favoris
                </h1>
                <p className="text-muted-foreground">
                  {totalItems > 0 ? (
                    <>
                      Vous avez {totalItems} article{totalItems > 1 ? 's' : ''} dans vos favoris
                    </>
                  ) : (
                    'Votre liste de favoris est vide'
                  )}
                </p>
              </div>

              {totalItems > 0 && (
                <div className="flex gap-3 flex-wrap">
                  <Button
                    onClick={handleAddAllToCart}
                    size="lg"
                    className="gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Tout ajouter au panier
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="lg"
                        className="gap-2 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-5 h-5" />
                        Tout supprimer
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Vider les favoris ?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Êtes-vous sûr de vouloir supprimer tous les articles de votre liste de favoris ?
                          Cette action est irréversible.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={clearWishlist}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          Supprimer tout
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          {totalItems > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-slide-down">
              <div className="gradient-card rounded-lg p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Articles</p>
                    <p className="text-3xl font-bold">{totalItems}</p>
                  </div>
                  <Heart className="w-12 h-12 text-red-500/20" />
                </div>
              </div>

              <div className="gradient-card rounded-lg p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Valeur Totale</p>
                    <p className="text-3xl font-bold">
                      {totalValue.toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>
                  <ShoppingCart className="w-12 h-12 text-primary/20" />
                </div>
              </div>

              <div className="gradient-card rounded-lg p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Prix Moyen</p>
                    <p className="text-3xl font-bold">
                      {Math.round(totalValue / totalItems).toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-accent">~</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 gradient-card rounded-lg shadow-card animate-fade-in">
              <Heart className="w-24 h-24 mx-auto mb-6 text-muted-foreground/30" />
              <h2 className="text-2xl font-bold mb-3">Votre liste de favoris est vide</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Explorez notre collection et ajoutez vos lunettes préférées à votre liste de favoris
                en cliquant sur l'icône cœur.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/shop">
                  <Button size="lg" className="gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Découvrir la boutique
                  </Button>
                </Link>
                <Link to="/">
                  <Button size="lg" variant="outline">
                    Retour à l'accueil
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Additional Info */}
          {totalItems > 0 && (
            <div className="mt-12 gradient-card rounded-lg p-8 shadow-card animate-fade-in">
              <h3 className="text-xl font-bold mb-4">💡 Le saviez-vous ?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    Sauvegardez vos préférences
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Vos favoris sont automatiquement sauvegardés sur cet appareil pour que vous
                    puissiez y revenir à tout moment.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-primary" />
                    Achat facilité
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Ajoutez tous vos articles favoris au panier en un seul clic pour gagner du temps
                    lors de votre commande.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
