# ⚡ SETUP RAPIDE - LUX VISION

## 🎯 Tu ne peux pas voir les détails des produits ?

**CAUSE** : Le backend ne communique pas avec PostgreSQL

**SOLUTION EN 4 ÉTAPES** :

---

## ✅ ÉTAPE 1 : Vérifier PostgreSQL (sur Windows)

1. Ouvrir **pgAdmin 4**
2. Se connecter au serveur PostgreSQL
3. Vérifier que la base **`Luxvision_db`** existe
4. Si elle n'existe pas :
   - Click droit sur "Databases"
   - Create → Database
   - Name: `Luxvision_db`
   - Owner: `postgres`
   - Save

---

## ✅ ÉTAPE 2 : Configurer le mot de passe

**Ouvrir** : `backend/.env`

**Modifier la ligne 10** :
```env
DB_PASSWORD=VotreMotDePassePostgreSQL
```

Remplace par le **vrai** mot de passe de ton PostgreSQL.

**Sauvegarder** le fichier.

---

## ✅ ÉTAPE 3 : Setup Automatique (sur Windows)

**Ouvrir PowerShell ou CMD dans le projet** :

```bash
cd backend
setup-windows.bat
```

Ce script va :
- ✅ Installer les dépendances
- ✅ Tester la connexion PostgreSQL
- ✅ Créer les tables
- ✅ Ajouter les 24 produits
- ✅ Créer le compte admin

**Attendre que le script termine.**

---

## ✅ ÉTAPE 4 : Démarrer l'Application

### Terminal 1 - Backend :

```bash
cd backend
npm run dev
```

**Attendre de voir** :
```
🚀 Server running on port 5000
```

**☝️ NE PAS FERMER CE TERMINAL**

---

### Terminal 2 - Frontend :

**Ouvrir un NOUVEAU terminal** :

```bash
npm run dev
```

**Ouvrir le navigateur** : http://localhost:5173

---

## ✅ TESTER

### Test 1 : Backend fonctionne
```
http://localhost:5000/health
```
✅ Devrait afficher : `{"status":"ok"}`

### Test 2 : Voir les produits
```
http://localhost:5000/api/v1/products/1
```
✅ Devrait afficher le produit "Classique Rond"

### Test 3 : Frontend
1. Aller sur `/shop`
2. Cliquer sur un produit
3. ✅ Devrait afficher les détails

---

## 🐛 SI ÇA NE FONCTIONNE PAS

### Diagnostic :
```bash
cd backend
node diagnostic.js
```

Ce script va te dire exactement ce qui ne va pas.

---

## 📚 POUR PLUS DE DÉTAILS

Voir : **`GUIDE-DEPANNAGE.md`** (guide complet avec toutes les solutions)

---

## 🔑 COMPTE ADMIN

Après le setup, tu peux te connecter avec :
- **Email** : admin@luxvision.cg
- **Mot de passe** : Admin@123

---

## 📞 BESOIN D'AIDE ?

1. Exécuter `node diagnostic.js` dans `backend/`
2. Me copier toute la sortie
3. Me dire exactement quelle erreur tu vois dans le navigateur (F12 → Console)
