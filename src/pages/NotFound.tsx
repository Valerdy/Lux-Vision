import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Search, ShoppingBag, ArrowLeft, Glasses } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const suggestedLinks = [
    { to: "/", label: "Accueil", icon: Home },
    { to: "/shop", label: "Boutique", icon: ShoppingBag },
    { to: "/about", label: "À Propos", icon: Glasses },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Illustration */}
            <div className="mb-8 animate-fade-in">
              <div className="relative inline-block">
                <h1 className="text-[120px] md:text-[180px] font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-none">
                  404
                </h1>
                <Glasses className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-32 md:h-32 text-primary/20 animate-pulse" />
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-8 animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Oups ! Page introuvable
              </h2>
              <p className="text-lg text-muted-foreground mb-2">
                La page que vous recherchez n'existe pas ou a été déplacée.
              </p>
              <p className="text-sm text-muted-foreground">
                URL tentée : <code className="px-2 py-1 bg-muted rounded text-xs">{location.pathname}</code>
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Rechercher des lunettes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" variant="default">
                  Rechercher
                </Button>
              </form>
            </div>

            {/* Quick Links */}
            <div className="mb-10 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <p className="text-sm text-muted-foreground mb-4">
                Ou explorez ces pages populaires :
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {suggestedLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link key={link.to} to={link.to}>
                      <Button variant="outline" className="gap-2">
                        <Icon className="w-4 h-4" />
                        {link.label}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Back Button */}
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button
                onClick={() => navigate(-1)}
                variant="ghost"
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour à la page précédente
              </Button>
            </div>

            {/* Decorative Elements */}
            <div className="mt-16 opacity-20">
              <div className="flex justify-center gap-4">
                <Glasses className="w-12 h-12 text-primary animate-bounce" style={{ animationDelay: '0s' }} />
                <Glasses className="w-12 h-12 text-accent animate-bounce" style={{ animationDelay: '0.1s' }} />
                <Glasses className="w-12 h-12 text-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
