import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { useCompare } from '@/contexts/CompareContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GitCompare, X, ShoppingCart, ArrowLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Compare = () => {
  const { items, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success(`${product.name} ajouté au panier`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center space-y-6 px-4">
            <GitCompare className="w-20 h-20 mx-auto text-muted-foreground/50" />
            <div>
              <h2 className="text-3xl font-bold mb-3">Aucun produit à comparer</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Ajoutez des produits à la comparaison pour voir leurs caractéristiques côte à côte
              </p>
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/shop">
                <Button size="lg" className="gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Parcourir la boutique
                </Button>
              </Link>
              <Link to="/">
                <Button size="lg" variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <PageBreadcrumb items={[{ label: 'Comparaison' }]} />

          {/* Header */}
          <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <GitCompare className="w-8 h-8 text-primary" />
                Comparaison de Produits
              </h1>
              <p className="text-muted-foreground">
                Comparez jusqu'à 3 produits pour trouver celui qui vous convient le mieux
              </p>
            </div>
            <Button
              variant="outline"
              onClick={clearCompare}
              className="gap-2 text-destructive hover:text-destructive"
            >
              <X className="w-4 h-4" />
              Tout effacer
            </Button>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Product Images & Names */}
              <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}>
                <div className="font-semibold text-lg self-end pb-4">Produits</div>
                {items.map((product) => (
                  <div key={product.id} className="gradient-card rounded-lg p-4 shadow-card relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 text-destructive hover:text-destructive z-10"
                      onClick={() => removeFromCompare(product.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover rounded-md mb-3"
                    />
                    <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{product.brand}</p>
                    <p className="text-lg font-bold text-accent mb-3">
                      {product.price.toLocaleString('fr-FR')} FCFA
                    </p>
                    <Button
                      size="sm"
                      className="w-full gap-2"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Ajouter au panier
                    </Button>
                  </div>
                ))}
              </div>

              {/* Price Comparison */}
              <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}>
                <div className="font-medium py-4 border-t">Prix</div>
                {items.map((product) => (
                  <div key={product.id} className="py-4 border-t text-center">
                    <span className="text-xl font-bold text-accent">
                      {product.price.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                ))}
              </div>

              {/* Category */}
              <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}>
                <div className="font-medium py-4 border-t">Catégorie</div>
                {items.map((product) => (
                  <div key={product.id} className="py-4 border-t text-center">
                    <Badge variant="secondary" className="capitalize">
                      {product.category === 'optical' ? 'Lunettes de vue' : 'Lunettes de soleil'}
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Gender */}
              <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}>
                <div className="font-medium py-4 border-t">Genre</div>
                {items.map((product) => (
                  <div key={product.id} className="py-4 border-t text-center capitalize">
                    {product.gender === 'men' ? 'Homme' : product.gender === 'women' ? 'Femme' : 'Unisexe'}
                  </div>
                ))}
              </div>

              {/* Frame Shape */}
              <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}>
                <div className="font-medium py-4 border-t">Forme</div>
                {items.map((product) => (
                  <div key={product.id} className="py-4 border-t text-center">
                    {product.frameShape}
                  </div>
                ))}
              </div>

              {/* Material */}
              <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}>
                <div className="font-medium py-4 border-t">Matériau</div>
                {items.map((product) => (
                  <div key={product.id} className="py-4 border-t text-center">
                    {product.material}
                  </div>
                ))}
              </div>

              {/* Color */}
              <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}>
                <div className="font-medium py-4 border-t">Couleur</div>
                {items.map((product) => (
                  <div key={product.id} className="py-4 border-t text-center">
                    {product.color}
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}>
                <div className="font-medium py-4 border-t">Caractéristiques</div>
                {items.map((product) => (
                  <div key={product.id} className="py-4 border-t">
                    <ul className="space-y-1 text-sm">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Stock */}
              <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}>
                <div className="font-medium py-4 border-t">Disponibilité</div>
                {items.map((product) => (
                  <div key={product.id} className="py-4 border-t text-center">
                    {product.inStock !== false ? (
                      <Badge className="bg-green-500">En stock</Badge>
                    ) : (
                      <Badge variant="destructive">Rupture de stock</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center gradient-card rounded-lg p-8 shadow-card">
            <h3 className="text-2xl font-bold mb-4">Besoin d'aide pour choisir ?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Notre équipe d'experts est là pour vous conseiller et vous aider à trouver la paire parfaite
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/contact">
                <Button size="lg" variant="default">
                  Contactez-nous
                </Button>
              </Link>
              <Link to="/shop">
                <Button size="lg" variant="outline">
                  Voir plus de produits
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Compare;
