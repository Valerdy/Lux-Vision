const { Pool } = require('pg');
require('dotenv').config();

console.log('\n🔍 DIAGNOSTIC COMPLET LUX-VISION\n');
console.log('='.repeat(50));

// 1. Vérification des variables d'environnement
console.log('\n1️⃣  VARIABLES D\'ENVIRONNEMENT:');
console.log('   DB_HOST:', process.env.DB_HOST || 'localhost');
console.log('   DB_PORT:', process.env.DB_PORT || '5432');
console.log('   DB_USER:', process.env.DB_USER || 'postgres');
console.log('   DB_PASSWORD:', process.env.DB_PASSWORD ? '***' + process.env.DB_PASSWORD.slice(-3) : 'NON DÉFINI');
console.log('   DB_NAME:', process.env.DB_NAME || 'Luxvision_db');
console.log('   NODE_ENV:', process.env.NODE_ENV || 'development');

// 2. Test de connexion PostgreSQL
console.log('\n2️⃣  TEST CONNEXION POSTGRESQL:');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'Luxvision_db',
  connectionTimeoutMillis: 5000,
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('   ✅ Connexion PostgreSQL réussie!');

    // 3. Vérification de la base de données
    console.log('\n3️⃣  VÉRIFICATION BASE DE DONNÉES:');

    // Liste des tables
    const tablesResult = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    console.log('   Tables trouvées:', tablesResult.rows.length);
    tablesResult.rows.forEach(row => {
      console.log('     -', row.table_name);
    });

    // 4. Vérification du schéma products
    console.log('\n4️⃣  SCHÉMA TABLE PRODUCTS:');
    const schemaResult = await client.query(`
      SELECT column_name, data_type, character_maximum_length
      FROM information_schema.columns
      WHERE table_name = 'products'
      ORDER BY ordinal_position
    `);

    if (schemaResult.rows.length === 0) {
      console.log('   ❌ Table products n\'existe pas!');
      console.log('   → Exécutez: npm run migrate');
    } else {
      schemaResult.rows.forEach(row => {
        const length = row.character_maximum_length ? `(${row.character_maximum_length})` : '';
        console.log(`     - ${row.column_name}: ${row.data_type}${length}`);
      });

      // Vérifier le type de la colonne id
      const idColumn = schemaResult.rows.find(r => r.column_name === 'id');
      if (idColumn) {
        if (idColumn.data_type === 'uuid') {
          console.log('\n   ⚠️  ATTENTION: La colonne id est de type UUID!');
          console.log('   → Il faut recréer la base de données avec VARCHAR');
          console.log('   → Voir les instructions dans la console');
        } else if (idColumn.data_type === 'character varying') {
          console.log('\n   ✅ Type de colonne id correct: VARCHAR');
        }
      }
    }

    // 5. Comptage des produits
    console.log('\n5️⃣  DONNÉES DANS LA BASE:');

    const productsCount = await client.query('SELECT COUNT(*) as count FROM products');
    console.log('   Produits:', productsCount.rows[0].count);

    if (parseInt(productsCount.rows[0].count) === 0) {
      console.log('   ❌ Aucun produit dans la base!');
      console.log('   → Exécutez: npm run seed');
    } else {
      // Afficher les 3 premiers produits
      const sampleProducts = await client.query('SELECT id, name, brand, price FROM products LIMIT 3');
      console.log('\n   Exemples de produits:');
      sampleProducts.rows.forEach(p => {
        console.log(`     - ID: ${p.id} | ${p.name} (${p.brand}) - ${p.price} FCFA`);
      });
    }

    const usersCount = await client.query('SELECT COUNT(*) as count FROM users');
    console.log('\n   Utilisateurs:', usersCount.rows[0].count);

    const cartCount = await client.query('SELECT COUNT(*) as count FROM cart');
    console.log('   Items panier:', cartCount.rows[0].count);

    const wishlistCount = await client.query('SELECT COUNT(*) as count FROM wishlist');
    console.log('   Items favoris:', wishlistCount.rows[0].count);

    const ordersCount = await client.query('SELECT COUNT(*) as count FROM orders');
    console.log('   Commandes:', ordersCount.rows[0].count);

    const reviewsCount = await client.query('SELECT COUNT(*) as count FROM reviews');
    console.log('   Avis:', reviewsCount.rows[0].count);

    // 6. Test d'une requête simple
    console.log('\n6️⃣  TEST REQUÊTE API:');
    try {
      const testQuery = await client.query('SELECT * FROM products WHERE id = $1', ['1']);
      if (testQuery.rows.length > 0) {
        console.log('   ✅ Requête getProduct(id="1") fonctionne!');
        console.log('   Produit trouvé:', testQuery.rows[0].name);
      } else {
        console.log('   ⚠️  Produit avec id="1" non trouvé');
        console.log('   → Vérifiez que le seed a bien été exécuté');
      }
    } catch (err) {
      console.log('   ❌ Erreur lors de la requête:', err.message);
    }

    client.release();

    console.log('\n' + '='.repeat(50));
    console.log('✅ DIAGNOSTIC TERMINÉ\n');

  } catch (error) {
    console.log('   ❌ Erreur de connexion:', error.message);
    console.log('\n💡 SOLUTIONS POSSIBLES:');
    console.log('   1. Vérifiez que PostgreSQL est démarré');
    console.log('   2. Vérifiez les identifiants dans backend/.env');
    console.log('   3. Vérifiez que la base Luxvision_db existe');
    console.log('   4. Si PostgreSQL est sur Windows, exécutez ce script sur Windows');
    console.log('\n' + '='.repeat(50));
  } finally {
    await pool.end();
    process.exit(0);
  }
}

testConnection();
