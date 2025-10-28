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

    // Seed products (all 24 products from frontend)
    const products = [
      {
        id: '1',
        name: 'Classique Rond',
        brand: 'LuxVision',
        description: 'Monture ronde intemporelle qui allie charme vintage et sophistication moderne.',
        price: 95000,
        discount: 0,
        category: 'optical',
        gender: 'unisex',
        frame_shape: 'Rond',
        material: 'Acétate',
        color: 'Écaille',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600',
          'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&fit=crop',
          'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&crop=center'
        ]),
        features: JSON.stringify([
          'Acétate léger',
          'Charnières à ressort',
          'Revêtement anti-reflet',
          'Protection UV'
        ])
      },
      {
        id: '2',
        name: 'Aviateur Pro',
        brand: 'SkyLine',
        description: 'Lunettes de soleil aviateur iconiques avec verres polarisés premium pour une protection ultime.',
        price: 125000,
        discount: 0,
        category: 'sunglasses',
        gender: 'unisex',
        frame_shape: 'Aviateur',
        material: 'Métal',
        color: 'Or',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600',
          'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600',
          'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600'
        ]),
        features: JSON.stringify([
          'Verres polarisés',
          'Monture métallique',
          'Protection UV 100%',
          'Plaquettes nasales ajustables'
        ])
      },
      {
        id: '3',
        name: 'Œil de Chat Élégance',
        brand: 'Femme Chic',
        description: 'Montures œil de chat sophistiquées qui ajoutent une touche de glamour à tous vos looks.',
        price: 105000,
        discount: 0,
        category: 'optical',
        gender: 'women',
        frame_shape: 'Œil de Chat',
        material: 'Acétate',
        color: 'Noir',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
          'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600',
          'https://images.unsplash.com/photo-1578071439886-6e95cf2ea5c4?w=600'
        ]),
        features: JSON.stringify([
          'Acétate fait main',
          'Branches flexibles',
          'Résistant aux rayures',
          'Filtre lumière bleue'
        ])
      },
      {
        id: '4',
        name: 'Carré Urbain',
        brand: 'ModernEdge',
        description: 'Montures carrées contemporaines parfaites pour le professionnel moderne.',
        price: 85000,
        discount: 0,
        category: 'optical',
        gender: 'men',
        frame_shape: 'Carré',
        material: 'Titane',
        color: 'Noir Mat',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=600',
          'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600',
          'https://images.unsplash.com/photo-1516509453726-fd2bb40bc165?w=600'
        ]),
        features: JSON.stringify([
          'Monture en titane',
          'Ajustement personnalisable',
          'Revêtement anti-éblouissement',
          'Design ultra-léger'
        ])
      },
      {
        id: '5',
        name: 'Wayfarer Rétro',
        brand: 'Vintage Soul',
        description: 'Style wayfarer classique avec une touche moderne pour les passionnés de tendances.',
        price: 90000,
        discount: 0,
        category: 'sunglasses',
        gender: 'unisex',
        frame_shape: 'Wayfarer',
        material: 'Acétate',
        color: 'Écaille Marron',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600',
          'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600',
          'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600'
        ]),
        features: JSON.stringify([
          'Verres polarisés',
          'Monture en acétate',
          'Protection UV400',
          'Design iconique'
        ])
      },
      {
        id: '6',
        name: 'Bouclier Sport',
        brand: 'ActiveVision',
        description: 'Lunettes de soleil haute performance conçues pour les modes de vie actifs.',
        price: 115000,
        discount: 0,
        category: 'sunglasses',
        gender: 'unisex',
        frame_shape: 'Bouclier',
        material: 'TR90',
        color: 'Gris Mat',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600',
          'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600',
          'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=600'
        ]),
        features: JSON.stringify([
          'Résistant aux chocs',
          'Design enveloppant',
          'Revêtement anti-buée',
          'Grip caoutchouté'
        ])
      },
      {
        id: '7',
        name: 'Oversize Glamour',
        brand: 'Diva',
        description: 'Lunettes de soleil oversize audacieuses qui attirent tous les regards.',
        price: 110000,
        discount: 0,
        category: 'sunglasses',
        gender: 'women',
        frame_shape: 'Oversize',
        material: 'Acétate',
        color: 'Bordeaux',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600',
          'https://images.unsplash.com/photo-1578071439886-6e95cf2ea5c4?w=600',
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600'
        ]),
        features: JSON.stringify([
          'Verres dégradés',
          'Grande couverture',
          'Accents métalliques',
          'Style designer'
        ])
      },
      {
        id: '8',
        name: 'Fil Minimaliste',
        brand: 'Essence',
        description: 'Montures filaires ultra-légères pour ceux qui préfèrent l\'élégance discrète.',
        price: 75000,
        discount: 0,
        category: 'optical',
        gender: 'unisex',
        frame_shape: 'Ovale',
        material: 'Métal',
        color: 'Argent',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600',
          'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&fit=crop',
          'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&crop=center'
        ]),
        features: JSON.stringify([
          'Monture fil ultra-fine',
          'Métal à mémoire',
          'Sensation imperceptible',
          'Plaquettes nasales ajustables'
        ])
      },
      {
        id: '9',
        name: 'Pilote Classique',
        brand: 'AeroStyle',
        description: 'Style pilote authentique inspiré des aviateurs militaires, symbole de virilité.',
        price: 135000,
        discount: 0,
        category: 'sunglasses',
        gender: 'men',
        frame_shape: 'Aviateur',
        material: 'Acier Inoxydable',
        color: 'Argent Chromé',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600',
          'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600',
          'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600'
        ]),
        features: JSON.stringify([
          'Verres miroir',
          'Monture double pont',
          'Protection UV maximale',
          'Étui rigide inclus'
        ])
      },
      {
        id: '10',
        name: 'Papillon Luxe',
        brand: 'Élite Paris',
        description: 'Lunettes papillon luxueuses ornées de détails raffinés pour une allure exceptionnelle.',
        price: 145000,
        discount: 10,
        category: 'sunglasses',
        gender: 'women',
        frame_shape: 'Papillon',
        material: 'Acétate Premium',
        color: 'Bleu Nacré',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600',
          'https://images.unsplash.com/photo-1606509237715-84f90e5a1f66?w=600',
          'https://images.unsplash.com/photo-1578071439886-6e95cf2ea5c4?w=600'
        ]),
        features: JSON.stringify([
          'Cristaux Swarovski',
          'Verres dégradés haute qualité',
          'Design italien',
          'Édition limitée'
        ])
      },
      {
        id: '11',
        name: 'Rectangle Pro',
        brand: 'TechVision',
        description: 'Monture rectangulaire professionnelle avec protection lumière bleue intégrée.',
        price: 98000,
        discount: 0,
        category: 'optical',
        gender: 'men',
        frame_shape: 'Rectangle',
        material: 'TR90',
        color: 'Bleu Marine',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=600',
          'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600',
          'https://images.unsplash.com/photo-1516509453726-fd2bb40bc165?w=600'
        ]),
        features: JSON.stringify([
          'Filtre anti-lumière bleue',
          'Finition mate',
          'Charnières renforcées',
          'Compatible verres progressifs'
        ])
      },
      {
        id: '12',
        name: 'Vintage Rond',
        brand: 'Rétro Chic',
        description: 'Inspiration années 70 avec des montures rondes intemporelles et authentiques.',
        price: 88000,
        discount: 0,
        category: 'optical',
        gender: 'unisex',
        frame_shape: 'Rond',
        material: 'Métal Doré',
        color: 'Or Vintage',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600',
          'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600',
          'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&fit=crop'
        ]),
        features: JSON.stringify([
          'Design rétro',
          'Monture légère',
          'Verres anti-rayures',
          'Fabriqué en France'
        ])
      },
      {
        id: '13',
        name: 'Sport Dynamique',
        brand: 'ActivePro',
        description: 'Conçues pour les athlètes exigeants, avec technologie anti-glisse brevetée.',
        price: 128000,
        discount: 0,
        category: 'sunglasses',
        gender: 'unisex',
        frame_shape: 'Sport',
        material: 'Polycarbonate',
        color: 'Rouge Racing',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600',
          'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600',
          'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=600'
        ]),
        features: JSON.stringify([
          'Verres photochromiques',
          'Ventilation intégrée',
          'Ajustement sécurisé',
          'Résistant à l\'eau'
        ])
      },
      {
        id: '14',
        name: 'Chic Parisien',
        brand: 'Paris Mode',
        description: 'Élégance parisienne incarnée dans des montures raffinées et sophistiquées.',
        price: 118000,
        discount: 0,
        category: 'optical',
        gender: 'women',
        frame_shape: 'Rectangle',
        material: 'Acétate',
        color: 'Noir Brillant',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
          'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600',
          'https://images.unsplash.com/photo-1578071439886-6e95cf2ea5c4?w=600'
        ]),
        features: JSON.stringify([
          'Design français',
          'Acétate haute qualité',
          'Finition brillante',
          'Étui en cuir offert'
        ])
      },
      {
        id: '15',
        name: 'Géométrique Moderne',
        brand: 'Avant-Garde',
        description: 'Design géométrique audacieux pour les amateurs d\'avant-garde et de modernité.',
        price: 132000,
        discount: 0,
        category: 'sunglasses',
        gender: 'unisex',
        frame_shape: 'Géométrique',
        material: 'Titane',
        color: 'Graphite',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600',
          'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600',
          'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=600'
        ]),
        features: JSON.stringify([
          'Forme unique',
          'Verres miroir',
          'Branches ajustables',
          'Collection designer'
        ])
      },
      {
        id: '16',
        name: 'Business Executive',
        brand: 'Executive Line',
        description: 'Montures premium pour cadres dirigeants, alliant élégance et professionnalisme.',
        price: 155000,
        discount: 15,
        category: 'optical',
        gender: 'men',
        frame_shape: 'Rectangle',
        material: 'Titane Pur',
        color: 'Gris Anthracite',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=600',
          'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600',
          'https://images.unsplash.com/photo-1516509453726-fd2bb40bc165?w=600'
        ]),
        features: JSON.stringify([
          'Titane pur',
          'Design sobre',
          'Finition premium',
          'Garantie 5 ans'
        ])
      },
      {
        id: '17',
        name: 'Bohème Soleil',
        brand: 'Boho Style',
        description: 'Style bohème chic avec détails artisanaux pour un look estival décontracté.',
        price: 92000,
        discount: 0,
        category: 'sunglasses',
        gender: 'women',
        frame_shape: 'Rond',
        material: 'Bois Recyclé',
        color: 'Marron Naturel',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600',
          'https://images.unsplash.com/photo-1578071439886-6e95cf2ea5c4?w=600',
          'https://images.unsplash.com/photo-1606509237715-84f90e5a1f66?w=600'
        ]),
        features: JSON.stringify([
          'Détails gravés',
          'Verres teintés',
          'Inspiré de la nature',
          'Éco-responsable'
        ])
      },
      {
        id: '18',
        name: 'Tech Smart',
        brand: 'FutureTech',
        description: 'Lunettes intelligentes avec protection lumière bleue avancée et technologie anti-fatigue.',
        price: 198000,
        discount: 0,
        category: 'optical',
        gender: 'unisex',
        frame_shape: 'Rectangle',
        material: 'Fibre de Carbone',
        color: 'Noir Carbone',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=600',
          'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600',
          'https://images.unsplash.com/photo-1516509453726-fd2bb40bc165?w=600'
        ]),
        features: JSON.stringify([
          'Filtre lumière bleue premium',
          'Revêtement hydrophobe',
          'Anti-buée permanent',
          'Technologie NASA'
        ])
      },
      {
        id: '19',
        name: 'Clubmaster Original',
        brand: 'Heritage',
        description: 'Style clubmaster intemporel, symbole de sophistication depuis les années 50.',
        price: 108000,
        discount: 0,
        category: 'sunglasses',
        gender: 'unisex',
        frame_shape: 'Clubmaster',
        material: 'Acétate et Métal',
        color: 'Écaille Havane',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600',
          'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600',
          'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600'
        ]),
        features: JSON.stringify([
          'Design iconique',
          'Pont métallique',
          'Verres G-15',
          'Fabriqué à la main'
        ])
      },
      {
        id: '20',
        name: 'Féline Chic',
        brand: 'Féline',
        description: 'Montures félines délicates qui subliment votre regard avec grâce et élégance.',
        price: 115000,
        discount: 0,
        category: 'optical',
        gender: 'women',
        frame_shape: 'Œil de Chat',
        material: 'Acétate',
        color: 'Rose Poudré',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
          'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600',
          'https://images.unsplash.com/photo-1578071439886-6e95cf2ea5c4?w=600'
        ]),
        features: JSON.stringify([
          'Forme allongée',
          'Détails dorés',
          'Acétate italien',
          'Branches fines'
        ])
      },
      {
        id: '21',
        name: 'Urban Explorer',
        brand: 'CityLife',
        description: 'Pour l\'explorateur urbain moderne qui recherche style et protection au quotidien.',
        price: 102000,
        discount: 0,
        category: 'sunglasses',
        gender: 'men',
        frame_shape: 'Carré',
        material: 'TR90',
        color: 'Vert Militaire',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600',
          'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600',
          'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600'
        ]),
        features: JSON.stringify([
          'Verres polarisés HD',
          'Monture flexible',
          'Protection latérale',
          'Style décontracté'
        ])
      },
      {
        id: '22',
        name: 'Crystal Clear',
        brand: 'Transparent',
        description: 'Montures transparentes tendance pour un look contemporain et épuré.',
        price: 79000,
        discount: 0,
        category: 'optical',
        gender: 'unisex',
        frame_shape: 'Rond',
        material: 'Acétate',
        color: 'Transparent Crystal',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600',
          'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600',
          'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&fit=crop'
        ]),
        features: JSON.stringify([
          'Acétate transparent',
          'Ultra-léger',
          'Design minimaliste',
          'Unisexe moderne'
        ])
      },
      {
        id: '23',
        name: 'Glamour Nuit',
        brand: 'NightLife',
        description: 'Glamour nocturne avec des verres teintés parfaits pour vos sorties en soirée.',
        price: 142000,
        discount: 20,
        category: 'sunglasses',
        gender: 'women',
        frame_shape: 'Oversize',
        material: 'Acétate',
        color: 'Noir avec Strass',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600',
          'https://images.unsplash.com/photo-1578071439886-6e95cf2ea5c4?w=600',
          'https://images.unsplash.com/photo-1606509237715-84f90e5a1f66?w=600'
        ]),
        features: JSON.stringify([
          'Verres teintés roses',
          'Strass décoratifs',
          'Forme oversized',
          'Look VIP'
        ])
      },
      {
        id: '24',
        name: 'Professor Classic',
        brand: 'Academia',
        description: 'Style académique intemporel, parfait pour les intellectuels et professionnels.',
        price: 86000,
        discount: 0,
        category: 'optical',
        gender: 'men',
        frame_shape: 'Rond',
        material: 'Acétate',
        color: 'Écaille Foncée',
        stock_quantity: 50,
        in_stock: true,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600',
          'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=600',
          'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600'
        ]),
        features: JSON.stringify([
          'Monture classique',
          'Pont keyhole',
          'Branches confortables',
          'Look distingué'
        ])
      }
    ];

    for (const product of products) {
      await client.query(`
        INSERT INTO products (
          id, name, brand, description, price, discount, category, gender,
          frame_shape, material, color, stock_quantity, in_stock, images, features
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        ON CONFLICT (id) DO NOTHING
      `, [
        product.id, product.name, product.brand, product.description, product.price,
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
