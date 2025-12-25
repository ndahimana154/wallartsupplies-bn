import dotenv from 'dotenv';
import connectDB from '../config/db';
import { hashPassword } from '../../helpers/authHelpers';
import { Categories, Products, ProductViews, User } from '../models';
dotenv.config();


async function seed() {
  try {
    await connectDB();
    console.log('DB connected for seeding');

    const testEmail = process.env.SEED_USER_EMAIL || 'test@example.com';
    const testName = process.env.SEED_USER_NAME || 'Test User';
    const testPasswordPlain = process.env.SEED_USER_PASSWORD || 'password123';
    const hashed = await hashPassword(testPasswordPlain);

    let user;
    try {
      const result = await User.findOrCreate({
        where: { email: testEmail },
        defaults: { email: testEmail, names: testName, password: hashed }
      });
      user = result[0];
      console.log('Seeded user:', user.email);
    } catch (err) {
      console.error('Failed to create/find seed user:', err);
      throw err;
    }

    const categoriesData = [
      { slug: 'frames', name: 'Frames', image: '/images/categories/frames.jpg' },
      { slug: 'posters', name: 'Posters', image: '/images/categories/posters.jpg' }
    ];

    const createdCategories = [] as any[];
    for (const c of categoriesData) {
      const [category] = await Categories.findOrCreate({ where: { slug: c.slug }, defaults: c });
      createdCategories.push(category);
    }
    console.log('Seeded categories:', createdCategories.map(c => c.slug).join(', '));

    const productsData = [
      {
        slug: 'black-modern-frame',
        name: 'Black Modern Frame',
        price: 25000,
        moq: 1,
        description: 'Sleek black frame perfect for modern home decor.',
        images: ['/images/products/black-frame-1.jpg'],
        customAttr: [],
        categoryId: createdCategories[0].id,
        status: true
      },
      {
        slug: 'wooden-brown-frame',
        name: 'Wooden Brown Frame',
        price: 35000,
        moq: 1,
        description: 'Handcrafted wooden frame for warm & natural design style.',
        images: ['/images/products/wooden-frame-1.jpg'],
        customAttr: [],
        categoryId: createdCategories[0].id,
        status: true
      },
      {
        slug: 'custom-poster-design',
        name: 'Custom Poster Design',
        price: 50000,
        moq: 1,
        description: 'Fully customized digital poster based on customer request.',
        images: ['/images/products/poster-1.jpg'],
        customAttr: [],
        categoryId: createdCategories[1].id,
        status: true
      }
    ];

    const createdProducts = [] as any[];
    for (const p of productsData) {
      const [product] = await Products.findOrCreate({ where: { slug: p.slug }, defaults: p });
      createdProducts.push(product);
    }
    console.log('Seeded products:', createdProducts.map(p => p.slug).join(', '));

    // Seed some product view events for stats
    for (const product of createdProducts) {
      // create a few views over the last 7 days
      for (let i = 0; i < 5; i++) {
        const daysAgo = Math.floor(Math.random() * 7);
        const viewedAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000 - i * 60000);
        await ProductViews.create({ productId: product.id, userId: user.id, ipAddress: '127.0.0.1', viewedAt });
      }
      // increment the product.views counter to reflect seeded views
      try {
        await product.increment('views', { by: 5 });
      } catch (err) {
        console.error('Failed to increment views for product', product.id, err);
      }
    }

    console.log('Seeding complete.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
