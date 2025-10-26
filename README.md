# 👓 Lux-Vision - Premium Eyewear E-Commerce Platform

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-purple.svg)](https://vitejs.dev/)

Une plateforme e-commerce moderne et élégante spécialisée dans la vente de lunettes de vue et de soleil, développée avec React, TypeScript et Tailwind CSS.

![Lux-Vision Banner](./src/assets/hero-eyewear.jpg)

## ✨ Fonctionnalités

### 🛍️ E-Commerce
- **Catalogue de produits** avec filtres et recherche
- **Panier d'achat** persistant (localStorage)
- **Pages produits détaillées** avec galerie d'images
- **Processus de checkout** complet
- **Système de wishlist/favoris**
- **Comparateur de produits**

### 🎨 Interface Utilisateur
- **Design responsive** adapté à tous les écrans
- **Composants UI modernes** avec shadcn-ui
- **Animations fluides** et transitions
- **Mode sombre/clair** (à venir)
- **Accessibilité WCAG 2.1**

### 🔐 Authentification
- **Inscription/Connexion** utilisateur
- **Gestion de profil**
- **Récupération de mot de passe**

### 📱 Pages
- 🏠 **Accueil** - Page d'accueil attrayante
- 🛒 **Boutique** - Catalogue complet avec filtres
- 📦 **Détail Produit** - Informations détaillées
- 🛍️ **Panier** - Gestion du panier
- 💳 **Checkout** - Processus d'achat
- 👤 **Authentification** - Connexion/Inscription
- ℹ️ **À propos** - Information sur la marque
- 📞 **Contact** - Formulaire de contact
- ❓ **FAQ** - Questions fréquentes

## 🚀 Installation

### Prérequis
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 ou **yarn** >= 1.22.0

### Étapes d'installation

```bash
# 1. Cloner le repository
git clone https://github.com/Valerdy/Lux-Vision.git

# 2. Naviguer dans le dossier
cd Lux-Vision

# 3. Installer les dépendances
npm install
# ou
yarn install

# 4. Créer un fichier .env à partir de .env.example
cp .env.example .env

# 5. Démarrer le serveur de développement
npm run dev
# ou
yarn dev
```

L'application sera accessible sur `http://localhost:5173`

## 📦 Scripts Disponibles

```bash
# Développement
npm run dev          # Démarre le serveur de développement

# Build
npm run build        # Build de production
npm run build:dev    # Build de développement

# Qualité du code
npm run lint         # Vérifie le code avec ESLint

# Preview
npm run preview      # Preview du build de production
```

## 🛠️ Technologies Utilisées

### Core
- **[React](https://reactjs.org/)** 18.3.1 - Bibliothèque UI
- **[TypeScript](https://www.typescriptlang.org/)** 5.8.3 - Typage statique
- **[Vite](https://vitejs.dev/)** 5.4.19 - Build tool ultra-rapide

### UI & Styling
- **[Tailwind CSS](https://tailwindcss.com/)** 3.4.17 - Framework CSS utility-first
- **[shadcn-ui](https://ui.shadcn.com/)** - Composants UI réutilisables
- **[Radix UI](https://www.radix-ui.com/)** - Primitives UI accessibles
- **[Lucide React](https://lucide.dev/)** - Icônes modernes

### State Management & Data
- **[React Query](https://tanstack.com/query/latest)** - Gestion du cache et des requêtes
- **[React Hook Form](https://react-hook-form.com/)** - Gestion des formulaires
- **[Zod](https://zod.dev/)** - Validation des schémas

### Routing
- **[React Router](https://reactrouter.com/)** 6.30.1 - Routing côté client

### Autres
- **[date-fns](https://date-fns.org/)** - Manipulation de dates
- **[Sonner](https://sonner.emilkowal.ski/)** - Notifications toast

## 📁 Structure du Projet

```
Lux-Vision/
├── public/              # Assets statiques
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── assets/         # Images et médias
│   ├── components/     # Composants réutilisables
│   │   ├── ui/        # Composants shadcn-ui
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   └── ProductFilter.tsx
│   ├── contexts/      # Contexts React (State global)
│   │   └── CartContext.tsx
│   ├── data/          # Données statiques
│   │   └── products.ts
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Utilitaires et helpers
│   ├── pages/         # Pages de l'application
│   │   ├── Index.tsx
│   │   ├── Shop.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   ├── Auth.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx        # Composant principal
│   ├── main.tsx       # Point d'entrée
│   └── index.css      # Styles globaux
├── .env.example       # Variables d'environnement exemple
├── .gitignore
├── components.json    # Configuration shadcn-ui
├── eslint.config.js   # Configuration ESLint
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts # Configuration Tailwind
├── tsconfig.json      # Configuration TypeScript
└── vite.config.ts     # Configuration Vite
```

## 🎨 Personnalisation

### Thème Tailwind
Modifiez `tailwind.config.ts` pour personnaliser les couleurs, les fonts, etc.

### Composants shadcn-ui
Ajoutez de nouveaux composants avec :
```bash
npx shadcn-ui@latest add [component-name]
```

## 🌍 Variables d'Environnement

Créez un fichier `.env` à la racine du projet :

```env
# API Configuration (à venir)
VITE_API_URL=http://localhost:3000/api

# App Configuration
VITE_APP_NAME=Lux-Vision
VITE_APP_URL=http://localhost:5173

# Feature Flags
VITE_ENABLE_ANALYTICS=false
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. Fork le projet
2. Créez votre branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Roadmap

- [ ] Intégration backend (API REST)
- [ ] Système de paiement (Stripe/PayPal)
- [ ] Authentification JWT
- [ ] Base de données (PostgreSQL)
- [ ] Gestion des stocks
- [ ] Système d'avis clients
- [ ] Mode sombre
- [ ] PWA (Progressive Web App)
- [ ] Tests unitaires et E2E
- [ ] Multilingue (i18n)
- [ ] Analytics et monitoring

## 📄 License

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Auteurs

- **Valerdy** - [GitHub](https://github.com/Valerdy)

## 🙏 Remerciements

- [shadcn-ui](https://ui.shadcn.com/) pour les magnifiques composants
- [Radix UI](https://www.radix-ui.com/) pour les primitives accessibles
- [Lucide](https://lucide.dev/) pour les icônes
- La communauté React et TypeScript

## 📞 Support

Pour toute question ou support :
- 📧 Email : support@lux-vision.com
- 🐛 Issues : [GitHub Issues](https://github.com/Valerdy/Lux-Vision/issues)
- 📖 Documentation : [Wiki](https://github.com/Valerdy/Lux-Vision/wiki)

---

Fait avec ❤️ par l'équipe Lux-Vision
