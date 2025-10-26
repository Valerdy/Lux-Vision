import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { VALIDATION } from '@/lib/constants';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Veuillez entrer votre adresse email');
      return;
    }

    if (!VALIDATION.EMAIL_REGEX.test(email)) {
      toast.error('Veuillez entrer une adresse email valide');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      toast.success('Merci ! Vous êtes inscrit à notre newsletter');
      setEmail('');

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg p-6 md:p-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
          <Mail className="w-6 h-6 text-primary" />
        </div>

        {/* Title & Description */}
        <h3 className="text-2xl font-bold mb-2">Restez Informé</h3>
        <p className="text-muted-foreground mb-6">
          Inscrivez-vous à notre newsletter pour recevoir nos dernières offres, nouveautés et
          conseils exclusifs directement dans votre boîte mail.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              disabled={isSubmitting || isSubscribed}
              aria-label="Email pour la newsletter"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || isSubscribed}
            className="px-8"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Envoi...
              </>
            ) : isSubscribed ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Inscrit !
              </>
            ) : (
              "S'inscrire"
            )}
          </Button>
        </form>

        {/* Privacy Note */}
        <p className="text-xs text-muted-foreground mt-4">
          En vous inscrivant, vous acceptez de recevoir nos communications marketing.
          Vous pouvez vous désabonner à tout moment.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
