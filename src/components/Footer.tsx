import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Glasses } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Newsletter from './Newsletter';
import { SOCIAL_LINKS, CONTACT } from '@/lib/constants';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="mb-12">
          <Newsletter />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold hover:text-accent transition-smooth">
              <Glasses className="w-6 h-6 text-accent" />
              <span>LuxVision</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Lunetterie premium pour le style de vie moderne. Des montures de qualité exceptionnelle
              avec un service client dédié.
            </p>
            <div className="flex gap-3">
              <a href={SOCIAL_LINKS.FACEBOOK} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Button variant="ghost" size="icon" className="hover:text-accent">
                  <Facebook className="w-5 h-5" />
                </Button>
              </a>
              <a href={SOCIAL_LINKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Button variant="ghost" size="icon" className="hover:text-accent">
                  <Instagram className="w-5 h-5" />
                </Button>
              </a>
              <a href={SOCIAL_LINKS.TWITTER} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Button variant="ghost" size="icon" className="hover:text-accent">
                  <Twitter className="w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-accent transition-smooth">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-sm text-muted-foreground hover:text-accent transition-smooth">
                  Boutique
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-accent transition-smooth">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-accent transition-smooth">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-sm text-muted-foreground hover:text-accent transition-smooth">
                  Mes Favoris
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-sm text-muted-foreground hover:text-accent transition-smooth">
                  Mon Compte
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Service Client</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-accent transition-smooth">
                  Questions Fréquentes (FAQ)
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-muted-foreground hover:text-accent transition-smooth">
                  Livraison & Retours
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-sm text-muted-foreground hover:text-accent transition-smooth">
                  Guide des Tailles
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-accent transition-smooth">
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-accent transition-smooth">
                  Conditions Générales
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contactez-nous</h3>
            <div className="space-y-3">
              <a
                href={`mailto:${CONTACT.EMAIL}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-smooth"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>{CONTACT.EMAIL}</span>
              </a>
              <a
                href={`tel:${CONTACT.PHONE.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-smooth"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{CONTACT.PHONE}</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{CONTACT.ADDRESS}</span>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-xs text-muted-foreground">
                Horaires d'ouverture<br />
                Lun - Ven: 9h00 - 18h00<br />
                Sam: 10h00 - 16h00
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 LuxVision. Tous droits réservés.</p>
            <div className="flex gap-4 flex-wrap justify-center">
              <Link to="/privacy" className="hover:text-accent transition-smooth">
                Confidentialité
              </Link>
              <Link to="/terms" className="hover:text-accent transition-smooth">
                Conditions
              </Link>
              <Link to="/cookies" className="hover:text-accent transition-smooth">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
