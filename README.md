# 👓 LuxVision - Boutique de Lunettes Premium

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue.svg)](https://www.postgresql.org/)

Application e-commerce moderne pour la vente de lunettes et lunettes de soleil premium à Pointe-Noire, Congo-Brazzaville.

![Lux-Vision Banner](./src/assets/hero-eyewear.jpg)

## 🚀 Technologies

### Frontend
- **React 18.3.1** avec TypeScript
- **Vite** - Build tool moderne et rapide
- **Tailwind CSS** - Styling moderne et responsive
- **shadcn/ui** - Composants UI de haute qualité
- **React Router** - Navigation côté client
- **Axios** - Client HTTP pour les appels API
- **Sonner** - Notifications toast élégantes
- **Lucide React** - Icônes modernes

### Backend
- **Node.js** avec **Express.js**
- **PostgreSQL** - Base de données relationnelle
- **JWT** - Authentification sécurisée
- **bcryptjs** - Hashage des mots de passe
- **Helmet** - Sécurité HTTP headers
- **CORS** - Configuration cross-origin
- **Express Rate Limit** - Protection contre les abus
- **Morgan** - Logging HTTP

## 📋 Prérequis

- **Node.js** 18+ et npm/yarn
- **PostgreSQL** 14+ (pgAdmin 4 recommandé)
- **Git** pour le versioning

## 🛠️ Installation

### 1. Cloner le repository

\`\`\`bash
git clone https://github.com/Valerdy/Lux-Vision.git
cd Lux-Vision
\`\`\`

### 2. Configuration de la Base de Données PostgreSQL

#### a. Créer la base de données

Ouvrez pgAdmin 4 ou utilisez psql :

\`\`\`sql
CREATE DATABASE luxvision_db;
\`\`\`

#### b. Configuration des variables d'environnement backend

\`\`\`bash
cd backend
cp .env.example .env
\`\`\`

Éditez le fichier `.env` avec vos informations PostgreSQL :

\`\`\`env
NODE_ENV=development
PORT=5000
API_VERSION=v1

# PostgreSQL Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe
DB_NAME=Luxvision_db

# JWT Configuration
JWT_SECRET=votre_secret_jwt_tres_securise_changez_ceci_en_production
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
\`\`\`

#### c. Installer les dépendances backend

\`\`\`bash
npm install
\`\`\`

#### d. Exécuter les migrations

\`\`\`bash
npm run migrate
\`\`\`

Cette commande créera toutes les tables nécessaires :
- \`users\` - Utilisateurs et administrateurs
- \`products\` - Catalogue de produits
- \`reviews\` - Avis clients
- \`orders\` - Commandes
- \`order_items\` - Détails des commandes
- \`wishlist\` - Liste de souhaits
- \`cart\` - Panier d'achat

#### e. Seed la base de données (optionnel)

\`\`\`bash
npm run seed
\`\`\`

Cela créera :
- 1 utilisateur admin : **admin@luxvision.cg** / **Admin@123**
- 6 produits de démonstration

### 3. Configuration du Frontend

#### a. Configuration des variables d'environnement

Depuis la racine du projet :

\`\`\`bash
# Déjà créé, vérifiez le contenu
cat .env
\`\`\`

Contenu du fichier \`.env\` :

\`\`\`env
VITE_API_URL=http://localhost:5000/api/v1
\`\`\`

#### b. Installer les dépendances frontend

\`\`\`bash
# Depuis la racine du projet
npm install
\`\`\`

## 🚀 Démarrage de l'Application

### Démarrer le Backend

\`\`\`bash
cd backend
npm run dev
\`\`\`

Le backend démarre sur **http://localhost:5000**

### Démarrer le Frontend

Dans un nouveau terminal, depuis la racine du projet :

\`\`\`bash
npm run dev
\`\`\`

Le frontend démarre sur **http://localhost:5173**

## 🔑 Comptes de Test

Après le seed de la base de données :

### Compte Admin
- **Email**: admin@luxvision.cg
- **Mot de passe**: Admin@123

Vous pouvez créer de nouveaux comptes clients via la page d'inscription.

## 📁 Structure du Projet

\`\`\`
Lux-Vision/
├── backend/                    # Backend Node.js/Express
│   ├── src/
│   │   ├── config/            # Configuration (DB, etc.)
│   │   ├── controllers/       # Logique métier
│   │   ├── middleware/        # Middleware (auth, etc.)
│   │   ├── routes/            # Définition des routes API
│   │   ├── scripts/           # Scripts de migration et seed
│   │   └── server.js          # Point d'entrée
│   ├── .env                   # Variables d'environnement
│   ├── .env.example           # Exemple de configuration
│   ├── package.json
│   └── README.md              # Documentation backend
│
├── src/                        # Frontend React
│   ├── assets/                # Images et ressources
│   ├── components/            # Composants réutilisables
│   ├── contexts/              # Context API (Auth, Cart, etc.)
│   ├── data/                  # Données statiques
│   ├── hooks/                 # Hooks personnalisés
│   ├── lib/                   # Utilitaires
│   ├── pages/                 # Pages de l'application
│   ├── services/              # Services API
│   └── App.tsx                # Composant racine
│
├── .env                        # Variables d'environnement frontend
├── package.json
└── README.md                   # Ce fichier
\`\`\`

## 🔌 API Endpoints

### Authentification

\`\`\`
POST   /api/v1/auth/register     - Inscription
POST   /api/v1/auth/login        - Connexion
GET    /api/v1/auth/me           - Profil utilisateur
PUT    /api/v1/auth/updateprofile - Mise à jour profil
PUT    /api/v1/auth/updatepassword - Changement de mot de passe
\`\`\`

### Produits

\`\`\`
GET    /api/v1/products           - Liste des produits (avec filtres)
GET    /api/v1/products/stats     - Statistiques produits
GET    /api/v1/products/:id       - Détails d'un produit
POST   /api/v1/products           - Créer un produit (Admin)
PUT    /api/v1/products/:id       - Modifier un produit (Admin)
DELETE /api/v1/products/:id       - Supprimer un produit (Admin)
\`\`\`

### Panier

\`\`\`
GET    /api/v1/users/cart         - Récupérer le panier
POST   /api/v1/users/cart         - Ajouter au panier
PUT    /api/v1/users/cart/:id     - Modifier quantité
DELETE /api/v1/users/cart/:id     - Retirer du panier
DELETE /api/v1/users/cart         - Vider le panier
\`\`\`

### Liste de Souhaits

\`\`\`
GET    /api/v1/users/wishlist          - Récupérer la wishlist
POST   /api/v1/users/wishlist          - Ajouter à la wishlist
DELETE /api/v1/users/wishlist/:id      - Retirer de la wishlist
\`\`\`

### Avis

\`\`\`
GET    /api/v1/reviews/product/:id     - Avis d'un produit
POST   /api/v1/reviews                 - Créer un avis
PUT    /api/v1/reviews/:id             - Modifier son avis
DELETE /api/v1/reviews/:id             - Supprimer son avis
\`\`\`

### Commandes

\`\`\`
GET    /api/v1/orders                  - Mes commandes
GET    /api/v1/orders/:id              - Détails d'une commande
POST   /api/v1/orders                  - Créer une commande
PUT    /api/v1/orders/:id/status       - Modifier statut (Admin)
\`\`\`

## ✨ Fonctionnalités

### Côté Utilisateur

- ✅ Navigation et recherche de produits
- ✅ Filtres avancés (catégorie, genre, marque, prix)
- ✅ Tri des produits
- ✅ Détails produit avec galerie d'images
- ✅ Système d'avis et de notation
- ✅ Panier d'achat avec gestion des quantités
- ✅ Liste de souhaits (favoris)
- ✅ Comparaison de produits (jusqu'à 3)
- ✅ Historique de navigation (produits récemment vus)
- ✅ Authentification sécurisée (JWT)
- ✅ Profil utilisateur
- ✅ Gestion des commandes
- ✅ Mode sombre/clair
- ✅ Design responsive
- ✅ Breadcrumb navigation
- ✅ Animations et transitions fluides
- ✅ Skeleton loaders
- ✅ Notifications toast

### Côté Admin

- ✅ Gestion des produits (CRUD)
- ✅ Gestion du statut des commandes
- ✅ Accès aux statistiques

## 🔒 Sécurité

- Hash des mots de passe avec bcrypt
- Authentification JWT
- Headers de sécurité avec Helmet
- Validation des entrées
- Rate limiting pour protéger contre les abus
- Requêtes SQL paramétrées pour prévenir les injections SQL
- CORS configuré pour autoriser uniquement le frontend

## 📝 Scripts Disponibles

### Frontend (racine du projet)

\`\`\`bash
npm run dev          # Démarrer le serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualiser le build de production
npm run lint         # Linter le code
\`\`\`

### Backend (dossier backend/)

\`\`\`bash
npm run dev          # Démarrer avec nodemon (auto-reload)
npm start            # Démarrer en production
npm run migrate      # Exécuter les migrations
npm run seed         # Seed la base de données
\`\`\`

## 🐛 Dépannage

### Problème de connexion à la base de données

1. Vérifiez que PostgreSQL est démarré
2. Vérifiez les identifiants dans \`backend/.env\`
3. Assurez-vous que la base \`Luxvision_db\` existe
4. Vérifiez les permissions de l'utilisateur PostgreSQL

### Erreur CORS

Vérifiez que \`FRONTEND_URL\` dans \`backend/.env\` correspond à l'URL de votre frontend.

### Port déjà utilisé

Si le port 5000 (backend) ou 5173 (frontend) est occupé :
- Backend : Changez \`PORT\` dans \`backend/.env\`
- Frontend : Vite choisira automatiquement un autre port

### Erreur 401 (Unauthorized)

1. Vérifiez que vous êtes connecté
2. Le token JWT peut avoir expiré (reconnectez-vous)
3. Vérifiez que \`JWT_SECRET\` est bien configuré

## 🚢 Déploiement

### Backend

1. Configurer PostgreSQL en production
2. Mettre à jour les variables d'environnement
3. Exécuter les migrations : \`npm run migrate\`
4. Démarrer le serveur : \`npm start\`

Plateformes recommandées :
- **Render** (https://render.com)
- **Railway** (https://railway.app)
- **Heroku** (https://heroku.com)

### Frontend

1. Build de production : \`npm run build\`
2. Déployer le dossier \`dist/\`

Plateformes recommandées :
- **Vercel** (https://vercel.com)
- **Netlify** (https://netlify.com)
- **Cloudflare Pages** (https://pages.cloudflare.com)

## 📞 Contact

Pour toute question ou support :
- Email : valerdy@luxvision.cg
- Localisation : Pointe-Noire, Congo-Brazzaville

## 📄 Licence

Ce projet est sous licence privée. Tous droits réservés.

---

Développé avec ❤️ par Valerdy pour LuxVision
