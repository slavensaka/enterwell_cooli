import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Load environment variables from .env.local
config({ path: '.env.local' });

// Create PostgreSQL connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// Initialize Prisma Client with adapter
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing recipes
  await prisma.recipe.deleteMany({});
  console.log('🗑️  Cleared existing recipes');

  // Create 5 test recipes
  const recipes = [
    {
      slug: 'tradicionalna-sarma',
      name: 'Tradicionalna sarma'
    },
    {
      slug: 'cokoladna-torta',
      name: 'Čokoladna torta'
    },
    {
      slug: 'peka-od-hobotnice',
      name: 'Peka od hobotnice'
    },
    {
      slug: 'pizza-margarita',
      name: 'Pizza Margarita'
    },
    {
      slug: 'gulas-od-divljaci',
      name: 'Gulaš od divljači'
    }
  ];

  for (const recipe of recipes) {
    await prisma.recipe.create({
      data: recipe
    });
    console.log(`✅ Created recipe: ${recipe.name}`);
  }

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
