# LuxVision Backend API

API REST Node.js/Express pour la plateforme e-commerce LuxVision.

## Installation Rapide

```bash
# Installer les dépendances
npm install

# Configurer .env (voir .env.example)
cp .env.example .env
# Éditer .env avec vos informations PostgreSQL

# Créer les tables
npm run migrate

# Ajouter les données de test (admin + 24 produits)
npm run seed

# Démarrer le serveur
npm run dev
```

## Configuration PostgreSQL

Assurez-vous que PostgreSQL est installé et en cours d'exécution :

```sql
CREATE DATABASE Luxvision_db;
```

Mettez à jour le fichier `.env` avec vos identifiants :

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=Luxvision_db
```

## Scripts

- `npm run dev` - Démarrer en mode développement (nodemon)
- `npm start` - Démarrer en production
- `npm run migrate` - Créer les tables
- `npm run seed` - Ajouter les données de test

## API Endpoints

### Authentification
- `POST /api/v1/auth/register` - Inscription
- `POST /api/v1/auth/login` - Connexion
- `GET /api/v1/auth/me` - Profil (protégé)

### Produits
- `GET /api/v1/products` - Liste produits (avec filtres)
- `GET /api/v1/products/:id` - Détail produit

### Panier & Wishlist
- `GET /api/v1/users/cart` - Mon panier (protégé)
- `POST /api/v1/users/cart` - Ajouter au panier (protégé)
- `GET /api/v1/users/wishlist` - Ma wishlist (protégé)

## Compte Admin

Après le seed :
- Email: admin@luxvision.cg
- Mot de passe: Admin@123

## Port

Le serveur démarre sur le port 5000 par défaut.
