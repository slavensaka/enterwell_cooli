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

  // Clear existing data (cascade will delete ingredients and steps)
  await prisma.recipe.deleteMany({});
  console.log('🗑️  Cleared existing recipes');

  // Recipe 1: Žabe na dalmatinski način
  const recipe1 = await prisma.recipe.create({
    data: {
      slug: 'zabe-na-dalmatinski',
      name: 'Žabe na dalmatinski način',
      intro: 'Tradicionalni dalmatinski recept sa žabama, idealan uz palentu',
      authorUsername: 'loveangels',
      mainImageUrl:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=450&fit=crop',
      servingSuggestion: 'Poslužiti uz palentu (250g palenta / 1L vode)',
      tips: 'Važno je dobro ocediti žabe prije kuhanja i ne prekuhati ih jer postaju žilave.',
      difficulty: 'MEDIUM',
      servings: 4,
      prepTime: 20,
      cookTime: 40,
      cookingMethod: 'Kuhanje',
      mealType: 'Glavno jelo',
      season: 'Ljeto',
      occasion: 'Svakodnevno',
      region: 'Hrvatska',

      ingredients: {
        create: [
          { quantity: '18', unit: 'kom', name: 'Žabe', order: 1 },
          { quantity: '3', unit: 'režnja', name: 'Bijeli luk', order: 2 },
          {
            quantity: '2',
            unit: 'kašike',
            name: 'Ekstra djevičansko maslinovo ulje',
            order: 3
          },
          { quantity: '1', unit: 'kašika', name: 'Ljuta paprika', order: 4 },
          { quantity: '100', unit: 'ml', name: 'Bijelo vino', order: 5 },
          { quantity: '2', unit: 'kašike', name: 'Rajčica pire', order: 6 },
          { quantity: '1', unit: 'kašika', name: 'Rajčica koncentrat', order: 7 },
          { quantity: '', unit: '', name: 'Sol i papar po ukusu', order: 8 },
          { quantity: '', unit: '', name: 'Svježi peršin za posluživanje', order: 9 }
        ]
      },

      preparationSteps: {
        create: [
          {
            stepNumber: 1,
            description:
              'Zagrijati maslinovo ulje u većoj tavi, dodati sitno sjeckani bijeli luk i ljutu papriku te propržiti par sekundi.'
          },
          {
            stepNumber: 2,
            description:
              'Dodati ocjeđene žabe i kratkotrajno propržiti sa svih strana na jačoj vatri, oko 5 minuta.'
          },
          {
            stepNumber: 3,
            description:
              'Zaliti bijelim vinom i pustiti da alkohol ispari, oko 2-3 minute.'
          },
          {
            stepNumber: 4,
            description:
              'Dodati rajčica pire, koncentrat i začine. Smanjiti vatru i kuhati poklopljeno 30-40 minuta.'
          },
          {
            stepNumber: 5,
            description:
              'Po potrebi dodati malo tople vode ako je umak pregust. Umak treba biti gust i aromatičan.'
          },
          {
            stepNumber: 6,
            description:
              'Poslužiti uz kuhanu palentu, posuti svježim peršinom.'
          }
        ]
      }
    }
  });
  console.log(`✅ Created recipe: ${recipe1.name}`);

  // Recipe 2: Tradicionalna sarma
  const recipe2 = await prisma.recipe.create({
    data: {
      slug: 'tradicionalna-sarma',
      name: 'Tradicionalna sarma',
      intro: 'Klasični recept za sarmu kakvu su naše bake pravile',
      authorUsername: 'sunny_side_up',
      mainImageUrl:
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=450&fit=crop',
      servingSuggestion: 'Poslužiti toplu sa kiselim vrhnjem',
      tips: 'Sarma je bolja ako odstoji dan-dva, tako da slobodno napravite dan prije.',
      difficulty: 'HARD',
      servings: 6,
      prepTime: 90,
      cookTime: 180,
      cookingMethod: 'Kuhanje',
      mealType: 'Glavno jelo',
      season: 'Zima',
      occasion: 'Blagdan',
      region: 'Hrvatska',

      ingredients: {
        create: [
          { quantity: '1', unit: 'kg', name: 'Kiseli kupus', order: 1 },
          { quantity: '500', unit: 'g', name: 'Mljeveno meso (pola svinjskog, pola goveđeg)', order: 2 },
          { quantity: '200', unit: 'g', name: 'Riža', order: 3 },
          { quantity: '2', unit: 'kom', name: 'Luk', order: 4 },
          { quantity: '3', unit: 'režnja', name: 'Bijeli luk', order: 5 },
          { quantity: '1', unit: 'kašika', name: 'Slatka paprika', order: 6 },
          { quantity: '500', unit: 'g', name: 'Dimljena rebra', order: 7 },
          { quantity: '', unit: '', name: 'Sol, papar, lovorov list', order: 8 }
        ]
      },

      preparationSteps: {
        create: [
          {
            stepNumber: 1,
            description: 'Kiseli kupus isperite i odvojite cele listove za punjenje.'
          },
          {
            stepNumber: 2,
            description: 'Izmiješajte mljeveno meso sa rižom, sitno sjeckanim lukom, češnjakom, paprikom i začinima.'
          },
          {
            stepNumber: 3,
            description: 'Na svaki list kupusa stavite kašiku smjese i zarolajte čvrsto.'
          },
          {
            stepNumber: 4,
            description: 'Na dno lonca stavite dimljena rebra i sitno narezane listove kupusa.'
          },
          {
            stepNumber: 5,
            description: 'Poredajte sarme u lonac, dodajte lovorov list i zalijte vodom da prekrije sarme.'
          },
          {
            stepNumber: 6,
            description: 'Kuhajte na laganoj vatri 3 sata, povremeno dolivajući vodu.'
          }
        ]
      }
    }
  });
  console.log(`✅ Created recipe: ${recipe2.name}`);

  // Recipe 3: Čokoladna torta
  const recipe3 = await prisma.recipe.create({
    data: {
      slug: 'cokoladna-torta',
      name: 'Čokoladna torta',
      intro: 'Bogata i sočna čokoladna torta',
      authorUsername: 'ljubicica71',
      mainImageUrl:
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=450&fit=crop',
      servingSuggestion: 'Ukrasite svježim bobičastim voćem',
      tips: 'Tortu čuvati u hladnjaku i poslužiti na sobnoj temperaturi.',
      difficulty: 'MEDIUM',
      servings: 8,
      prepTime: 30,
      cookTime: 35,
      cookingMethod: 'Pečenje',
      mealType: 'Desert',
      season: null,
      occasion: 'Proslava',
      region: null,

      ingredients: {
        create: [
          { quantity: '200', unit: 'g', name: 'Tamna čokolada', order: 1 },
          { quantity: '150', unit: 'g', name: 'Maslac', order: 2 },
          { quantity: '4', unit: 'kom', name: 'Jaja', order: 3 },
          { quantity: '150', unit: 'g', name: 'Šećer', order: 4 },
          { quantity: '100', unit: 'g', name: 'Brašno', order: 5 },
          { quantity: '2', unit: 'kašike', name: 'Kakao prah', order: 6 }
        ]
      },

      preparationSteps: {
        create: [
          {
            stepNumber: 1,
            description: 'Otopite čokoladu sa maslacem na pari.'
          },
          {
            stepNumber: 2,
            description: 'Umutite jaja sa šećerom dok ne postanu penasta.'
          },
          {
            stepNumber: 3,
            description: 'Dodajte otopljenu čokoladu u jaja i pažljivo promiješajte.'
          },
          {
            stepNumber: 4,
            description: 'Umiješajte prosijano brašno i kakao.'
          },
          {
            stepNumber: 5,
            description: 'Pecite na 180°C oko 35 minuta.'
          }
        ]
      }
    }
  });
  console.log(`✅ Created recipe: ${recipe3.name}`);

  // Recipe 4: Pizza Margarita
  const recipe4 = await prisma.recipe.create({
    data: {
      slug: 'pizza-margarita',
      name: 'Pizza Margarita',
      intro: 'Klasična talijanska pizza',
      authorUsername: 'coolinari_pro',
      mainImageUrl:
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=450&fit=crop',
      servingSuggestion: 'Poslužiti vrućу sa svježim bosiljkom',
      tips: 'Pećnicu zagrijati na maksimum, idealno 250°C.',
      difficulty: 'EASY',
      servings: 2,
      prepTime: 20,
      cookTime: 12,
      cookingMethod: 'Pečenje',
      mealType: 'Glavno jelo',
      season: null,
      occasion: 'Svakodnevno',
      region: 'Italija',

      ingredients: {
        create: [
          { quantity: '300', unit: 'g', name: 'Brašno', order: 1 },
          { quantity: '7', unit: 'g', name: 'Kvasac', order: 2 },
          { quantity: '200', unit: 'ml', name: 'Mlaka voda', order: 3 },
          { quantity: '200', unit: 'g', name: 'Rajčica pelat', order: 4 },
          { quantity: '200', unit: 'g', name: 'Mozzarella', order: 5 },
          { quantity: '', unit: '', name: 'Svježi bosiljak', order: 6 },
          { quantity: '2', unit: 'kašike', name: 'Maslinovo ulje', order: 7 }
        ]
      },

      preparationSteps: {
        create: [
          {
            stepNumber: 1,
            description: 'Zamijesite tijesto od brašna, kvasca, vode, soli i ulja. Ostavite da naraste 1 sat.'
          },
          {
            stepNumber: 2,
            description: 'Razvucite tijesto u krug debljine 5mm.'
          },
          {
            stepNumber: 3,
            description: 'Namažite rajčicom i dodajte narezanu mozzarellu.'
          },
          {
            stepNumber: 4,
            description: 'Pecite 10-12 minuta na 250°C.'
          },
          {
            stepNumber: 5,
            description: 'Dodajte svježi bosiljak prije posluživanja.'
          }
        ]
      }
    }
  });
  console.log(`✅ Created recipe: ${recipe4.name}`);

  // Recipe 5: Gulaš od divljači
  const recipe5 = await prisma.recipe.create({
    data: {
      slug: 'gulas-od-divljaci',
      name: 'Gulaš od divljači',
      intro: 'Aromatičan gulaš od srnetine',
      authorUsername: 'chef_master',
      mainImageUrl:
        'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=450&fit=crop',
      servingSuggestion: 'Poslužiti sa domaćim njokama ili krumpirom',
      tips: 'Meso prethodno možete marinirati preko noći u crnom vinu sa začinskim travama.',
      difficulty: 'MEDIUM',
      servings: 4,
      prepTime: 30,
      cookTime: 120,
      cookingMethod: 'Kuhanje',
      mealType: 'Glavno jelo',
      season: 'Jesen',
      occasion: 'Svečano',
      region: 'Hrvatska',

      ingredients: {
        create: [
          { quantity: '800', unit: 'g', name: 'Srnetina (ili jelenja)', order: 1 },
          { quantity: '3', unit: 'kom', name: 'Luk', order: 2 },
          { quantity: '2', unit: 'kašike', name: 'Slatka paprika', order: 3 },
          { quantity: '2', unit: 'kašike', name: 'Rajčica pire', order: 4 },
          { quantity: '200', unit: 'ml', name: 'Crno vino', order: 5 },
          { quantity: '3', unit: 'režnja', name: 'Bijeli luk', order: 6 },
          { quantity: '', unit: '', name: 'Lovorov list, timijan, klinčići', order: 7 },
          { quantity: '', unit: '', name: 'Sol, papar', order: 8 }
        ]
      },

      preparationSteps: {
        create: [
          {
            stepNumber: 1,
            description: 'Meso narežite na kockice i dobro očistite od opni.'
          },
          {
            stepNumber: 2,
            description: 'Propržite luk na masnoći dok ne postane staklast, dodajte bijeli luk.'
          },
          {
            stepNumber: 3,
            description: 'Dodajte meso i pržite dok ne porumeni sa svih strana.'
          },
          {
            stepNumber: 4,
            description: 'Dodajte papriku, rajčicu, vino i začine. Zalijte vodom da prekrije meso.'
          },
          {
            stepNumber: 5,
            description: 'Kuhajte poklopljeno na laganoj vatri 2 sata ili dok meso ne omekša.'
          },
          {
            stepNumber: 6,
            description: 'Umak po potrebi zgustite ili razrijedite. Začinite po ukusu.'
          }
        ]
      }
    }
  });
  console.log(`✅ Created recipe: ${recipe5.name}`);

  console.log('🎉 Seed completed successfully! Created 5 recipes with ingredients and preparation steps.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
