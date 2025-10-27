const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  const client = await pool.connect();

  try {
    console.log('🌱 Starting database seeding...');

    // Seed admin user
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    await client.query(`
      INSERT INTO users (email, password, first_name, last_name, phone, role, is_verified)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (email) DO NOTHING
    `, [
      'admin@luxvision.cg',
      hashedPassword,
      'Admin',
      'LuxVision',
      '+242 06 123 4567',
      'admin',
      true
    ]);

    // Seed products (from frontend data)
    const products = [
      {
        name: 'Pilote Classique',
        brand: 'Ray-Ban',
        description: 'Lunettes de soleil iconiques avec monture métallique et verres teintés. Le style intemporel qui convient à tous.',
        price: 85000,
        discount: 0,
        category: 'sunglasses',
        gender: 'unisex',
        frame_shape: 'Pilote',
        material: 'Métal',
        color: 'Or/Vert',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
          'https://images.unsplash.com/photo-1511499767150-a48a237f0083',
          'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a'
        ]),
        features: JSON.stringify([
          'Protection UV 100%',
          'Monture légère en métal',
          'Verres polarisés',
          'Étui inclus'
        ])
      },
      {
        name: 'Papillon Luxe',
        brand: 'Gucci',
        description: 'Monture papillon élégante avec détails dorés. Parfaite pour un look sophistiqué et féminin.',
        price: 120000,
        discount: 10,
        category: 'optical',
        gender: 'women',
        frame_shape: 'Papillon',
        material: 'Acétate',
        color: 'Noir/Or',
        stock_quantity: 30,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1574258495973-f010dfbb5371',
          'https://images.unsplash.com/photo-1577803645773-f96470509666',
          'https://images.unsplash.com/photo-1606509237715-84f90e5a1f66'
        ]),
        features: JSON.stringify([
          'Design italien',
          'Monture en acétate premium',
          'Détails en or 24 carats',
          'Charnières flexibles'
        ])
      },
      {
        name: 'Rectangle Pro',
        brand: 'Oakley',
        description: 'Monture rectangulaire professionnelle, idéale pour le travail. Confort optimal pour une utilisation prolongée.',
        price: 65000,
        discount: 0,
        category: 'optical',
        gender: 'men',
        frame_shape: 'Rectangle',
        material: 'TR90',
        color: 'Noir Mat',
        stock_quantity: 45,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1509695507497-903c140c43b0',
          'https://images.unsplash.com/photo-1556306535-0f09a537f0a3',
          'https://images.unsplash.com/photo-1516509453726-fd2bb40bc165'
        ]),
        features: JSON.stringify([
          'Matériau ultra-léger',
          'Résistant aux chocs',
          'Anti-rayures',
          'Ajustement ergonomique'
        ])
      },
      {
        name: 'Œil-de-Chat Chic',
        brand: 'Prada',
        description: 'Style vintage revisité avec une touche moderne. Ces lunettes ajoutent une élégance instantanée à votre look.',
        price: 95000,
        discount: 15,
        category: 'sunglasses',
        gender: 'women',
        frame_shape: 'Œil-de-chat',
        material: 'Acétate',
        color: 'Bordeaux',
        stock_quantity: 25,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
          'https://images.unsplash.com/photo-1578071439886-6e95cf2ea5c4',
          'https://images.unsplash.com/photo-1577803645773-f96470509666'
        ]),
        features: JSON.stringify([
          'Style rétro-chic',
          'Verres dégradés',
          'Protection UV 400',
          'Made in Italy'
        ])
      },
      {
        name: 'Ronde Vintage',
        brand: 'Persol',
        description: 'Lunettes rondes inspirées des années 60. Un classique intemporel qui ne se démode jamais.',
        price: 78000,
        discount: 0,
        category: 'optical',
        gender: 'unisex',
        frame_shape: 'Ronde',
        material: 'Métal',
        color: 'Argent',
        stock_quantity: 35,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1574258495973-f010dfbb5371',
          'https://images.unsplash.com/photo-1511499767150-a48a237f0083',
          'https://images.unsplash.com/photo-1577803645773-f96470509666'
        ]),
        features: JSON.stringify([
          'Design iconique',
          'Monture flexible',
          'Finition antique',
          'Verres CR-39'
        ])
      },
      {
        name: 'Sport Moderne',
        brand: 'Nike',
        description: 'Lunettes de soleil sportives avec technologie anti-reflet. Parfaites pour vos activités en plein air.',
        price: 55000,
        discount: 20,
        category: 'sunglasses',
        gender: 'men',
        frame_shape: 'Wrap',
        material: 'Nylon',
        color: 'Noir/Rouge',
        stock_quantity: 60,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
          'https://images.unsplash.com/photo-1509695507497-903c140c43b0',
          'https://images.unsplash.com/photo-1516509453726-fd2bb40bc165'
        ]),
        features: JSON.stringify([
          'Grip anti-dérapant',
          'Verres incassables',
          'Ventilation optimisée',
          'Résistant à la sueur'
        ])
      }
    ];

    for (const product of products) {
      await client.query(`
        INSERT INTO products (
          name, brand, description, price, discount, category, gender,
          frame_shape, material, color, stock_quantity, in_stock, images, features
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        ON CONFLICT DO NOTHING
      `, [
        product.name, product.brand, product.description, product.price,
        product.discount, product.category, product.gender, product.frame_shape,
        product.material, product.color, product.stock_quantity, product.in_stock,
        product.images, product.features
      ]);
    }

    console.log('✅ Seeded admin user');
    console.log(`✅ Seeded ${products.length} products`);
    console.log('🎉 Seeding completed successfully!');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
};

// Run seeding
seedData()
  .then(() => {
    console.log('🎉 All data seeded successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
