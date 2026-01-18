import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_gpYfQ9dT4uzR@ep-steep-forest-ag6juy0m-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function checkNeon() {
  const recipes = await prisma.recipe.findMany({
    select: { name: true, category: true }
  });

  console.log('Recepti u Neon bazi:');
  recipes.forEach(r => console.log(`${r.name}: ${r.category}`));

  await prisma.$disconnect();
}

checkNeon();