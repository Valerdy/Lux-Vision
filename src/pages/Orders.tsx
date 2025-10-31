import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ordersAPI } from '@/services/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Navigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Order {
  id: string;
  order_number: string;
  status: string;
  subtotal: number;
  tax: number;
  shipping_cost: number;
  total: number;
  created_at: string;
  payment_method: string;
}

const Orders = () => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await ordersAPI.getAll();
        if (response.status === 'success') {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  // Redirect to auth if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
      case 'processing':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
      case 'shipped':
        return 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20';
      case 'delivered':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'processing':
        return 'En traitement';
      case 'shipped':
        return 'Expédiée';
      case 'delivered':
        return 'Livrée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumb */}
          <PageBreadcrumb items={[{ label: 'Mes Commandes' }]} />

          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-primary" />
              Mes Commandes
            </h1>
            <p className="text-muted-foreground">
              Suivez l'état de vos commandes et consultez l'historique
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Chargement de vos commandes...</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && orders.length === 0 && (
            <Card className="text-center py-12">
              <CardContent className="pt-6">
                <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                <h2 className="text-2xl font-bold mb-2">Aucune commande</h2>
                <p className="text-muted-foreground mb-6">
                  Vous n'avez pas encore passé de commande
                </p>
                <Link to="/shop">
                  <Button size="lg">Découvrir la boutique</Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Orders List */}
          {!isLoading && orders.length > 0 && (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <Card
                  key={order.id}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          Commande #{order.order_number}
                        </CardTitle>
                        <CardDescription>
                          Passée le{' '}
                          {format(new Date(order.created_at), "d MMMM yyyy 'à' HH:mm", {
                            locale: fr,
                          })}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{getStatusLabel(order.status)}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Sous-total</p>
                        <p className="font-semibold">
                          {order.subtotal.toLocaleString('fr-FR')} FCFA
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">TVA (18%)</p>
                        <p className="font-semibold">
                          {order.tax.toLocaleString('fr-FR')} FCFA
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Livraison</p>
                        <p className="font-semibold text-accent">
                          {order.shipping_cost === 0 ? 'Gratuite' : `${order.shipping_cost.toLocaleString('fr-FR')} FCFA`}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total</p>
                        <p className="text-xl font-bold text-accent">
                          {order.total.toLocaleString('fr-FR')} FCFA
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Paiement: </span>
                        <span className="font-medium capitalize">
                          {order.payment_method === 'card' ? 'Carte bancaire' :
                           order.payment_method === 'mobile' ? 'Mobile Money' :
                           order.payment_method}
                        </span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/orders/${order.id}`}>Voir les détails</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
