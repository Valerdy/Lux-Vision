@echo off
chcp 65001 >nul
echo.
echo ╔════════════════════════════════════════════════════╗
echo ║   SETUP AUTOMATIQUE LUX-VISION (Windows)          ║
echo ╚════════════════════════════════════════════════════╝
echo.

echo [1/6] Vérification de Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js n'est pas installé!
    echo Téléchargez-le sur: https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js détecté

echo.
echo [2/6] Installation des dépendances backend...
call npm install
if errorlevel 1 (
    echo ❌ Erreur lors de l'installation des dépendances
    pause
    exit /b 1
)
echo ✅ Dépendances installées

echo.
echo [3/6] Vérification du fichier .env...
if not exist .env (
    echo ⚠️  Fichier .env manquant, copie depuis .env.example...
    copy .env.example .env
    echo.
    echo ⚠️  IMPORTANT: Éditez backend/.env et mettez votre mot de passe PostgreSQL
    echo    Ligne à modifier: DB_PASSWORD=VotreMotDePasse
    echo.
    pause
)
echo ✅ Fichier .env présent

echo.
echo [4/6] Diagnostic de la connexion PostgreSQL...
node diagnostic.js
if errorlevel 1 (
    echo.
    echo ❌ La connexion à PostgreSQL a échoué
    echo.
    echo 💡 Vérifiez:
    echo    1. PostgreSQL est bien démarré
    echo    2. Le mot de passe dans backend/.env est correct
    echo    3. La base Luxvision_db existe dans pgAdmin4
    echo.
    pause
    exit /b 1
)

echo.
echo [5/6] Migration de la base de données...
call npm run migrate
if errorlevel 1 (
    echo ❌ Erreur lors de la migration
    pause
    exit /b 1
)
echo ✅ Migration réussie

echo.
echo [6/6] Peuplement de la base de données...
call npm run seed
if errorlevel 1 (
    echo ❌ Erreur lors du seeding
    pause
    exit /b 1
)
echo ✅ Seed réussi

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║   ✅ SETUP TERMINÉ AVEC SUCCÈS!                    ║
echo ╚════════════════════════════════════════════════════╝
echo.
echo Pour démarrer l'application:
echo   1. Dans ce terminal: npm run dev
echo   2. Dans un nouveau terminal: cd .. ^&^& npm run dev
echo.
pause
