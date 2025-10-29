# 🔧 GUIDE DE DÉPANNAGE LUX-VISION

## 🎯 Problèmes Signalés

1. ❌ Impossible de voir les détails d'un produit
2. ❌ Le panier/favoris ne s'enregistre pas dans la base de données

## 📋 DIAGNOSTIC EN 3 ÉTAPES

### ÉTAPE 1 : Exécuter le Script de Diagnostic

**Sur Windows (dans PowerShell ou CMD) :**

```bash
cd chemin\vers\Lux-Vision\backend
node diagnostic.js
```

Ce script va vérifier :
- ✅ Les variables d'environnement
- ✅ La connexion PostgreSQL
- ✅ L'existence des tables
- ✅ Le type de la colonne `id` (doit être VARCHAR, pas UUID)
- ✅ Le nombre de produits dans la BDD

**Résultat attendu :**
```
✅ Connexion PostgreSQL réussie!
✅ Type de colonne id correct: VARCHAR
   Produits: 24
```

---

### ÉTAPE 2 : Identifier le Problème

#### ❌ Si : "Erreur de connexion: connect ECONNREFUSED"

**Problème** : PostgreSQL n'est pas accessible

**Solutions** :

1. **Vérifier que PostgreSQL est démarré**
   - Ouvrir pgAdmin 4
   - Se connecter au serveur
   - Si erreur → Démarrer PostgreSQL via "Services Windows"

2. **Vérifier le mot de passe dans `.env`**
   ```bash
   cd backend
   notepad .env
   ```

   Ligne 10, mettre votre vrai mot de passe PostgreSQL :
   ```env
   DB_PASSWORD=VotreMotDePassePostgreSQL
   ```

3. **Vérifier que la base existe**
   - Dans pgAdmin 4, vérifier que `Luxvision_db` existe
   - Si non, créer la base :
     - Click droit sur "Databases"
     - Create → Database
     - Name: `Luxvision_db`
     - Owner: `postgres`

---

#### ⚠️ Si : "La colonne id est de type UUID!"

**Problème** : Les tables ont été créées avec l'ancien schéma

**Solution** : Recréer la base de données

1. **Dans pgAdmin 4** :
   - Click droit sur `Luxvision_db`
   - Delete/Drop Database
   - Confirmer

   - Click droit sur "Databases"
   - Create → Database
   - Name: `Luxvision_db`
   - Owner: `postgres`
   - Save

2. **Exécuter le setup automatique** :
   ```bash
   cd backend
   setup-windows.bat
   ```

---

#### ❌ Si : "Aucun produit dans la base!"

**Problème** : La base n'a pas été peuplée

**Solution** :
```bash
cd backend
npm run seed
```

---

### ÉTAPE 3 : Setup Automatique (Recommandé)

**Exécuter le script de setup complet :**

```bash
cd backend
setup-windows.bat
```

Ce script fait TOUT automatiquement :
1. ✅ Installe les dépendances
2. ✅ Vérifie la connexion PostgreSQL
3. ✅ Migre la base de données
4. ✅ Peuple avec les 24 produits

---

## 🚀 DÉMARRAGE DE L'APPLICATION

### Terminal 1 : Backend

```bash
cd backend
npm run dev
```

**Attendez de voir :**
```
🚀 Server running on port 5000
📍 Environment: development
🔗 Frontend URL: http://localhost:8080
```

**NE FERMEZ PAS CE TERMINAL !**

---

### Terminal 2 : Frontend

**Ouvrir un NOUVEAU terminal** :

```bash
cd chemin\vers\Lux-Vision
npm run dev
```

**Attendez de voir :**
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### Ouvrir dans le navigateur

**URL** : `http://localhost:5173` (ou le port indiqué)

---

## ✅ TESTS À EFFECTUER

### Test 1 : Backend fonctionne

**Dans un navigateur :**
```
http://localhost:5000/health
```

**Devrait afficher :**
```json
{"status":"ok","message":"LuxVision API is running"}
```

---

### Test 2 : Produits chargés

**URL :**
```
http://localhost:5000/api/v1/products?limit=3
```

**Devrait afficher :**
```json
{
  "status": "success",
  "data": {
    "products": [
      {
        "id": "1",
        "name": "Classique Rond",
        ...
      }
    ]
  }
}
```

---

### Test 3 : Détail d'un produit (Backend)

**URL :**
```
http://localhost:5000/api/v1/products/1
```

**Devrait afficher :**
```json
{
  "status": "success",
  "data": {
    "product": {
      "id": "1",
      "name": "Classique Rond",
      ...
    }
  }
}
```

---

### Test 4 : Frontend - Boutique

1. Aller sur `http://localhost:5173/shop`
2. ✅ Devrait afficher 24 produits

---

### Test 5 : Frontend - Détail produit

1. Cliquer sur n'importe quel produit
2. ✅ Devrait afficher la page de détails
3. ✅ L'URL devrait être `/product/1`, `/product/2`, etc.

---

### Test 6 : Panier (nécessite authentification)

1. S'inscrire : `/auth`
2. Ajouter un produit au panier
3. Vérifier dans pgAdmin 4 :
   ```sql
   SELECT * FROM cart;
   ```
4. ✅ Devrait voir le produit

---

### Test 7 : Favoris (nécessite authentification)

1. Se connecter
2. Ajouter un produit aux favoris (icône cœur)
3. Vérifier dans pgAdmin 4 :
   ```sql
   SELECT * FROM wishlist;
   ```
4. ✅ Devrait voir le produit

---

## 🐛 ERREURS COURANTES

### Erreur : "Port 5000 already in use"

**Cause** : Un autre processus utilise le port 5000

**Solution 1** : Trouver et arrêter le processus
```bash
# Windows PowerShell (en mode Administrateur)
netstat -ano | findstr :5000
taskkill /PID <PID_trouvé> /F
```

**Solution 2** : Changer le port dans `backend/.env`
```env
PORT=5001
```

---

### Erreur : "EADDRINUSE" sur le frontend

**Cause** : Port déjà utilisé (souvent 5173)

**Solution** : Vite va automatiquement choisir un autre port (5174, 5175, etc.)

---

### Erreur : "Cannot find module 'pg'"

**Cause** : Dépendances backend pas installées

**Solution** :
```bash
cd backend
npm install
```

---

### Erreur : "relation 'products' does not exist"

**Cause** : La base de données n'a pas été migrée

**Solution** :
```bash
cd backend
npm run migrate
npm run seed
```

---

### Panier/Favoris ne se sauvegardent pas

**Vérifications** :

1. **Êtes-vous connecté ?**
   - Le panier/favoris ne se synchronise avec la BDD **que si vous êtes connecté**
   - Si non connecté, c'est stocké uniquement en localStorage

2. **Le backend tourne-t-il ?**
   ```
   http://localhost:5000/health
   ```

3. **Vérifier les logs du backend**
   - Dans le terminal où tourne `npm run dev`
   - Chercher des erreurs

4. **Tester l'API directement** (nécessite d'être connecté)
   - Voir les instructions ci-dessus pour les tests

---

## 📞 AIDE SUPPLÉMENTAIRE

Si le problème persiste après avoir suivi ce guide :

1. **Exécuter le diagnostic** :
   ```bash
   cd backend
   node diagnostic.js
   ```

2. **Copier TOUTE la sortie du diagnostic**

3. **Me fournir également** :
   - La sortie du diagnostic
   - Les logs du terminal backend
   - L'erreur exacte que tu vois dans le navigateur (F12 → Console)

---

## 🎯 RÉSUMÉ RAPIDE

**Si rien ne fonctionne, faire dans cet ordre :**

```bash
# 1. Diagnostic
cd backend
node diagnostic.js

# 2. Si la BDD existe mais est vide/incorrecte
# → Dans pgAdmin: Supprimer Luxvision_db puis la recréer

# 3. Setup automatique
setup-windows.bat

# 4. Démarrer backend
npm run dev

# 5. Dans un NOUVEAU terminal, démarrer frontend
cd ..
npm run dev
```

**C'EST TOUT !** 🚀
