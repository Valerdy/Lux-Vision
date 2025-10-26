import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle, Package, CreditCard, Truck, Shield, RefreshCw } from 'lucide-react';

const faqData = [
  {
    category: 'Commandes & Livraison',
    icon: Package,
    questions: [
      {
        q: 'Quels sont les délais de livraison ?',
        a: 'Nous proposons deux options de livraison : Standard (3-5 jours ouvrés) et Express (1-2 jours ouvrés). La livraison est gratuite pour toute commande supérieure à 100€.',
      },
      {
        q: 'Comment puis-je suivre ma commande ?',
        a: 'Une fois votre commande expédiée, vous recevrez un email avec un numéro de suivi. Vous pourrez suivre votre colis en temps réel sur notre site ou directement sur le site du transporteur.',
      },
      {
        q: 'Livrez-vous à l\'international ?',
        a: 'Oui, nous livrons dans toute l\'Europe et dans plusieurs pays à travers le monde. Les frais de livraison et délais varient selon la destination.',
      },
    ],
  },
  {
    category: 'Paiement & Sécurité',
    icon: CreditCard,
    questions: [
      {
        q: 'Quels modes de paiement acceptez-vous ?',
        a: 'Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), PayPal, et le paiement en 3 ou 4 fois sans frais via notre partenaire de paiement.',
      },
      {
        q: 'Mes informations de paiement sont-elles sécurisées ?',
        a: 'Absolument. Nous utilisons le protocole SSL pour crypter toutes les données de paiement. Nous ne stockons jamais vos informations bancaires sur nos serveurs.',
      },
      {
        q: 'Puis-je modifier ma commande après validation ?',
        a: 'Vous pouvez modifier votre commande dans les 2 heures suivant la validation. Passé ce délai, contactez notre service client qui fera son possible pour vous aider.',
      },
    ],
  },
  {
    category: 'Retours & Remboursements',
    icon: RefreshCw,
    questions: [
      {
        q: 'Quelle est votre politique de retour ?',
        a: 'Vous disposez de 30 jours pour retourner tout article qui ne vous convient pas. Les produits doivent être dans leur état d\'origine avec tous les accessoires et emballages.',
      },
      {
        q: 'Comment effectuer un retour ?',
        a: 'Connectez-vous à votre compte, accédez à votre commande et sélectionnez "Retourner un article". Suivez les instructions pour générer votre étiquette de retour gratuite.',
      },
      {
        q: 'Quand serais-je remboursé ?',
        a: 'Le remboursement est effectué dans un délai de 5 à 10 jours ouvrés après réception de votre retour. Vous recevrez un email de confirmation une fois le remboursement traité.',
      },
    ],
  },
  {
    category: 'Produits & Garantie',
    icon: Shield,
    questions: [
      {
        q: 'Vos lunettes sont-elles authentiques ?',
        a: 'Oui, tous nos produits sont 100% authentiques et proviennent directement des fabricants officiels. Chaque paire est livrée avec son certificat d\'authenticité.',
      },
      {
        q: 'Quelle garantie offrez-vous ?',
        a: 'Toutes nos lunettes bénéficient d\'une garantie de 2 ans contre les défauts de fabrication. La garantie couvre les défauts de matériaux et de fabrication, mais pas l\'usure normale.',
      },
      {
        q: 'Puis-je faire monter mes verres correcteurs ?',
        a: 'Oui, nous proposons un service de montage de verres sur mesure. Contactez notre service client avec votre ordonnance pour obtenir un devis personnalisé.',
      },
    ],
  },
  {
    category: 'Compte & Service Client',
    icon: HelpCircle,
    questions: [
      {
        q: 'Comment créer un compte ?',
        a: 'Cliquez sur "Connexion" en haut de page, puis sur "Créer un compte". Remplissez le formulaire avec vos informations. Vous pouvez aussi créer un compte lors de votre première commande.',
      },
      {
        q: 'J\'ai oublié mon mot de passe, que faire ?',
        a: 'Cliquez sur "Mot de passe oublié ?" sur la page de connexion. Entrez votre adresse email et vous recevrez un lien pour réinitialiser votre mot de passe.',
      },
      {
        q: 'Comment contacter le service client ?',
        a: 'Vous pouvez nous contacter par email à support@lux-vision.com, par téléphone au +33 1 23 45 67 89 (du lundi au vendredi de 9h à 18h), ou via notre formulaire de contact.',
      },
    ],
  },
  {
    category: 'Livraison & Expédition',
    icon: Truck,
    questions: [
      {
        q: 'Comment sont emballés les produits ?',
        a: 'Chaque paire de lunettes est soigneusement emballée dans son étui d\'origine, puis placée dans un emballage sécurisé pour garantir une livraison en parfait état.',
      },
      {
        q: 'Que faire si mon colis est endommagé ?',
        a: 'Contactez immédiatement notre service client avec des photos du colis endommagé. Nous organiserons un remplacement ou un remboursement dans les plus brefs délais.',
      },
      {
        q: 'Puis-je modifier l\'adresse de livraison ?',
        a: 'Vous pouvez modifier l\'adresse de livraison jusqu\'à l\'expédition de votre commande. Une fois expédiée, contactez le transporteur directement avec votre numéro de suivi.',
      },
    ],
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Questions Fréquentes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trouvez rapidement des réponses à vos questions. Si vous ne trouvez pas ce que vous cherchez, n'hésitez pas à nous contacter.
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="max-w-4xl mx-auto space-y-8">
          {faqData.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">{section.category}</h2>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    {section.questions.map((item, qIndex) => (
                      <AccordionItem key={qIndex} value={`item-${index}-${qIndex}`}>
                        <AccordionTrigger className="text-left hover:no-underline">
                          <span className="font-semibold">{item.q}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact CTA */}
        <Card className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <HelpCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-2">Vous ne trouvez pas votre réponse ?</h3>
            <p className="text-muted-foreground mb-6">
              Notre équipe de support est là pour vous aider du lundi au vendredi de 9h à 18h.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
              >
                Nous Contacter
              </a>
              <a
                href="mailto:support@lux-vision.com"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-semibold"
              >
                Envoyer un Email
              </a>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
