# 🚀 LuxVision Backend API

Backend REST API pour la plateforme e-commerce Lux-Vision, construite avec Node.js, Express et PostgreSQL.

## 📋 Prérequis

- Node.js >= 14.x
- PostgreSQL >= 12.x (déjà installé et démarré)
- npm ou yarn

## 🛠️ Installation

### 1. Installer les dépendances

```bash
cd backend
npm install
```

### 2. Configuration de la base de données

La base de données `Luxvision_db` est déjà créée dans PostgreSQL.

**Vérifiez vos identifiants dans `.env` :**
- `DB_USER=postgres`
- `DB_PASSWORD=votre_mot_de_passe`
- `DB_NAME=Luxvision_db`

### 3. Exécuter les migrations

Créer toutes les tables dans la base de données :

```bash
npm run migrate
```

### 4. Insérer les données initiales (seed)

Ajouter les produits et l'utilisateur admin :

```bash
npm run seed
```

**Identifiants admin créés :**
- Email: `admin@luxvision.cg`
- Mot de passe: `Admin@123`

### 5. Démarrer le serveur

**Mode développement (avec nodemon) :**
```bash
npm run dev
```

**Mode production :**
```bash
npm start
```

Le serveur démarrera sur `http://localhost:5000`

## 📚 API Endpoints

### Authentication (`/api/v1/auth`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Inscription utilisateur | Public |
| POST | `/login` | Connexion utilisateur | Public |
| GET | `/me` | Obtenir profil utilisateur | Private |
| PUT | `/updateprofile` | Mettre à jour profil | Private |
| PUT | `/updatepassword` | Changer mot de passe | Private |

### Products (`/api/v1/products`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Liste tous les produits (avec filtres) | Public |
| GET | `/stats` | Statistiques produits | Public |
| GET | `/:id` | Détails d'un produit | Public |
| POST | `/` | Créer un produit | Admin |
| PUT | `/:id` | Modifier un produit | Admin |
| DELETE | `/:id` | Supprimer un produit | Admin |

**Filtres disponibles (query params) :**
- `page` : Numéro de page (défaut: 1)
- `limit` : Résultats par page (défaut: 12)
- `category` : optical ou sunglasses
- `gender` : men, women, unisex
- `brand` : Nom de marque
- `minPrice` : Prix minimum
- `maxPrice` : Prix maximum
- `search` : Recherche textuelle
- `sortBy` : Tri (created_at, price, name, brand)
- `sortOrder` : ASC ou DESC

### Reviews (`/api/v1/reviews`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/product/:productId` | Avis d'un produit | Public |
| POST | `/` | Créer un avis | Private |
| PUT | `/:id` | Modifier son avis | Private |
| DELETE | `/:id` | Supprimer son avis | Private |

### Orders (`/api/v1/orders`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Mes commandes | Private |
| GET | `/:id` | Détails commande | Private |
| POST | `/` | Créer commande | Private |
| PUT | `/:id/status` | Mettre à jour statut | Admin |

### Users (`/api/v1/users`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/wishlist` | Ma liste de souhaits | Private |
| POST | `/wishlist` | Ajouter aux favoris | Private |
| DELETE | `/wishlist/:productId` | Retirer des favoris | Private |
| GET | `/cart` | Mon panier | Private |
| POST | `/cart` | Ajouter au panier | Private |
| PUT | `/cart/:id` | Modifier quantité | Private |
| DELETE | `/cart/:id` | Retirer du panier | Private |
| DELETE | `/cart` | Vider le panier | Private |

## 🔐 Authentication

L'API utilise JWT (JSON Web Tokens) pour l'authentification.

**Format du header :**
```
Authorization: Bearer <token>
```

**Exemple de requête :**
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
     http://localhost:5000/api/v1/auth/me
```

## 📊 Structure de la base de données

- `users` - Utilisateurs et admins
- `products` - Catalogue de produits
- `reviews` - Avis clients
- `orders` - Commandes
- `order_items` - Articles des commandes
- `wishlist` - Liste de souhaits
- `cart` - Panier d'achats

## 🧪 Tester l'API

### Avec cURL

**S'inscrire :**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123",
    "firstName": "Test",
    "lastName": "User",
    "phone": "+242 06 000 0000"
  }'
```

**Se connecter :**
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123"
  }'
```

**Obtenir les produits :**
```bash
curl http://localhost:5000/api/v1/products
```

### Avec Postman

1. Importer la collection Postman (si disponible)
2. Configurer l'environnement avec `BASE_URL=http://localhost:5000`
3. Tester les endpoints

## 🛡️ Sécurité

- **Helmet** : Headers de sécurité HTTP
- **CORS** : Configured pour le frontend
- **Rate Limiting** : 100 requêtes par 15 minutes
- **Bcrypt** : Hachage des mots de passe (10 rounds)
- **JWT** : Tokens d'authentification sécurisés
- **SQL Injection** : Protection via parameterized queries

## 📝 Variables d'environnement

Voir `.env.example` pour la liste complète des variables.

## 🚨 Troubleshooting

### Erreur de connexion PostgreSQL

```
❌ Unexpected error on idle client
```

**Solution :**
1. Vérifier que PostgreSQL est démarré
2. Vérifier les credentials dans `.env`
3. Vérifier que la base `Luxvision_db` existe

### Port déjà utilisé

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution :**
Changer le port dans `.env` :
```
PORT=5001
```

### Migration échoue

**Solution :**
```bash
# Se connecter à PostgreSQL
psql -U postgres

# Supprimer la base
DROP DATABASE IF EXISTS Luxvision_db;

# Recréer
CREATE DATABASE Luxvision_db;

# Quitter
\q

# Relancer la migration
npm run migrate
```

## 📦 Scripts disponibles

```json
{
  "start": "node src/server.js",          // Démarrer en production
  "dev": "nodemon src/server.js",         // Démarrer en dev
  "migrate": "node src/scripts/migrate.js", // Créer les tables
  "seed": "node src/scripts/seed.js"      // Insérer données
}
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

MIT License - voir LICENSE pour plus de détails

## 👨‍💻 Support

Pour toute question ou problème :
- Email : support@luxvision.cg
- GitHub Issues : [Créer un ticket](https://github.com/votre-repo/issues)
