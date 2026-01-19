# Coolinarika Recipe App

A modern recipe management application built with Next.js 16, React 19, Prisma ORM, and PostgreSQL. This project demonstrates a full-stack implementation with CRUD operations, seed data, and a clean architecture pattern.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **pnpm** (recommended) or npm
- **PostgreSQL** database (local or cloud-hosted like [Neon](https://neon.tech))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/slavensaka/enterwell_cooli.git
   cd enterwell_cooli
   ```

2. **Install dependencies**
   Make sure you have **pnpm** installed globally before proceeding.
   ```
   npm install -g pnpm
   pnpm --version
   ```
   then 
   ```bash
   pnpm install --loglevel info
   ```

3. **Configure environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and set your postgress database connection:
   
   ```env
   DB_USER=example
   DB_HOST=localhost
   DB_NAME=example
   DB_PASSWORD=example
   DB_PORT=5432
   
   DATABASE_URL="postgresql://DB_USER:DB_PASSWORD@DB_HOST:5432/DB_NAME?sslmode=require"

   # CDN Configuration
   NEXT_PUBLIC_CDN_BASE_URL=http://localhost:3000
   ```
   - `DB_USER`, `DB_PASSWORD`, `DB_HOST`, and `DB_NAME` are the environment variables used to construct the `DATABASE_URL` for PostgreSQL.

4. **Set up the database**
   
   Run Prisma migrations to create the database schema:
   ```bash
   npx prisma migrate deploy
   ```

5. **Seed the database with sample data**
   ```bash
   pnpm db:seed
   ```

6. **Start the development server**
   ```bash
   pnpm dev
   ```

7. **Open the application**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (routes)/          # Application routes
│   │   ├── page.tsx       # Home page (/)
│   │   ├── recepti/       # Recipes list (/recepti)
│   │   └── recept/[slug]/ # Recipe detail (/recept/:slug)
│   └── api/               # API routes
│       └── recipes/       # Recipe CRUD endpoints
├── components/            # Shared React components
├── views/                 # Page-specific view components
├── models/                # TypeScript models and DTOs
├── repositories/          # Data access layer
├── mappers/               # Data transformation utilities
├── helpers/               # Utility functions
├── services/              # Business logic services
├── prisma/                # Database schema and migrations
│   ├── schema.prisma      # Prisma schema definition
│   ├── seed.ts            # Database seed script
│   └── migrations/        # Migration history
├── public/                # Static assets
│   └── cdn/recipes/       # Recipe images
└── tests/                 # Test files
    ├── unit/              # Unit tests (Jest)
    ├── component/         # Component tests (Playwright)
    └── integration/       # E2E tests (Playwright)
```

---

## 🗄️ Database Setup

### Using Neon (Recommended for Cloud)

1. Create a free account at [neon.tech](https://neon.tech)
2. Create a new project and database
3. Copy the connection string to your `.env.local`

### Using Local PostgreSQL

1. Install PostgreSQL locally
2. Create a new database:
   ```sql
   CREATE DATABASE coolinarika;
   ```
3. Update `.env.local` with your local connection string:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/coolinarika"
   ```

### Database Commands

| Command | Description |
|---------|-------------|
| `npx prisma migrate dev` | Create and apply migrations (development) |
| `npx prisma migrate deploy` | Apply migrations (production) |
| `npx prisma db push` | Push schema changes without migrations |
| `npx prisma studio` | Open Prisma Studio GUI |
| `pnpm db:seed` | Seed database with sample recipes |
| `npx prisma generate` | Regenerate Prisma Client |

---

## 🔧 Development

### Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run all tests |
| `pnpm test:unit` | Run unit tests (Jest) |
| `pnpm test:component` | Run component tests (Playwright) |
| `pnpm test:e2e` | Run E2E tests (Playwright) |
| `pnpm storybook` | Start Storybook |
| `pnpm db:seed` | Seed database |

### Code Architecture

This project follows the **Enterwell React Architecture** pattern:

- **Views** - Page components that render UI
- **ViewModels** - State management for views (MobX)
- **Repositories** - Data access layer (Prisma)
- **Mappers** - Transform database entities to DTOs
- **Models** - TypeScript interfaces and classes
- **Services** - Reusable business logic

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/recipes` | List all recipes |
| POST | `/api/recipes` | Create a new recipe |
| GET | `/api/recipes/[id]` | Get recipe by ID |
| PUT | `/api/recipes/[id]` | Update recipe |
| DELETE | `/api/recipes/[id]` | Delete recipe |

---

## 🧪 Testing

### Unit Tests (Jest)
```bash
pnpm test:unit
```

### Component Tests (Playwright)
```bash
pnpm test:component
# or with UI
pnpm test:component-open
```

### E2E Tests (Playwright)
```bash
pnpm test:e2e
# or with UI
pnpm test:e2e-open
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `DATABASE_URL` - Your PostgreSQL connection string
4. Deploy!

### Manual Deployment

1. Build the application:
   ```bash
   pnpm build
   ```

2. Run database migrations:
   ```bash
   npx prisma migrate deploy
   ```

3. Start the production server:
   ```bash
   pnpm start
   ```

### Environment Variables for Production

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXT_PUBLIC_CDN_BASE_URL` | CDN base URL for images | No |

---

## 📝 Important Notes for Developers

### Before You Start

1. **Database Connection**: Ensure your PostgreSQL database is running and accessible
2. **Environment Variables**: Never commit `.env.local` to version control
3. **Prisma Client**: Run `npx prisma generate` after pulling changes that modify `schema.prisma`
4. **Migrations**: Always create migrations for schema changes in development with `npx prisma migrate dev`

### Tech Stack

#### Core Framework
| Technology | Version | Description |
|------------|---------|-------------|
| [Next.js](https://nextjs.org/) | 16.1.0 | React framework with App Router |
| [React](https://react.dev/) | 19.0.0 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.7.3 | Type safety |

#### Database & ORM
| Technology | Version | Description |
|------------|---------|-------------|
| [Prisma](https://www.prisma.io/) | 7.2.0 | Next-generation ORM |
| [PostgreSQL](https://www.postgresql.org/) | - | Relational database |
| [@prisma/adapter-pg](https://www.prisma.io/docs/orm/overview/databases/postgresql) | 7.2.0 | PostgreSQL driver adapter |
| [pg](https://node-postgres.com/) | 8.17.1 | PostgreSQL client for Node.js |

#### UI & Styling
| Technology | Version | Description |
|------------|---------|-------------|
| [MUI (Material-UI)](https://mui.com/) | 7.3.6 | React component library |
| [@mui/icons-material](https://mui.com/material-ui/material-icons/) | 7.3.6 | Material Design icons |
| [Emotion](https://emotion.sh/) | 11.14.0 | CSS-in-JS library |
| [Sass](https://sass-lang.com/) | 1.83.1 | CSS preprocessor |
| [clsx](https://github.com/lukeed/clsx) | 2.1.1 | Utility for constructing className strings |

#### State Management
| Technology | Version | Description |
|------------|---------|-------------|
| [MobX](https://mobx.js.org/) | 6.13.5 | State management library |
| [mobx-react-lite](https://github.com/mobxjs/mobx-react-lite) | 4.1.1 | React bindings for MobX |

#### Data Fetching & Validation
| Technology | Version | Description |
|------------|---------|-------------|
| [Axios](https://axios-http.com/) | 1.7.9 | HTTP client |
| [Zod](https://zod.dev/) | 4.3.5 | TypeScript-first schema validation |

#### Testing
| Technology | Version | Description |
|------------|---------|-------------|
| [Jest](https://jestjs.io/) | 29.7.0 | Unit testing framework |
| [Playwright](https://playwright.dev/) | 1.57.0 | E2E and component testing |
| [@playwright/experimental-ct-react](https://playwright.dev/docs/test-components) | 1.57.0 | Component testing for React |

#### Development Tools
| Technology | Version | Description |
|------------|---------|-------------|
| [Storybook](https://storybook.js.org/) | 10.1.11 | UI component explorer |
| [ESLint](https://eslint.org/) | 9.17.0 | Code linting |
| [Webpack](https://webpack.js.org/) | 5.97.1 | Module bundler |
| [dotenv](https://github.com/motdotla/dotenv) | 17.2.3 | Environment variable management |
| [tsx](https://github.com/esbuild-kit/tsx) | 4.21.0 | TypeScript execution |

#### Other Utilities
| Technology | Version | Description |
|------------|---------|-------------|
| [react-hot-toast](https://react-hot-toast.com/) | 2.4.1 | Toast notifications |
| [vanilla-cookieconsent](https://cookieconsent.orestbida.com/) | - | Cookie consent management |
| [pixelmatch](https://github.com/mapbox/pixelmatch) | 5.3.0 | Image comparison |
| [pngjs](https://github.com/lukeapage/pngjs) | 7.0.0 | PNG encoder/decoder |

### Data Model

The application manages recipes with the following structure:

- **Recipe** - Main entity with name, slug, intro, difficulty, prep/cook time, etc.
- **Ingredient** - Recipe ingredients with quantity, unit, and name
- **PreparationStep** - Step-by-step cooking instructions

### CRUD Operations

All CRUD operations persist to the PostgreSQL database:

- **Create**: POST to `/api/recipes` with recipe data
- **Read**: GET from `/api/recipes` or `/api/recipes/[id]`
- **Update**: PUT to `/api/recipes/[id]` with updated data
- **Delete**: DELETE to `/api/recipes/[id]`

### Seed Data

The seed script (`prisma/seed.ts`) creates 5 sample Croatian recipes:
- Žabe na dalmatinski način
- Tradicionalna sarma
- Čokoladna torta
- Pizza Margarita
- Gulaš od divljači

Run `pnpm db:seed` to populate the database with sample data.

### CDN Simulation (Local Development)

This project includes a **simulated CDN** for serving recipe images locally, eliminating the need for an external CDN service during development.

#### How It Works

1. **Local Storage**: Recipe images are stored in `/public/cdn/recipes/` directory
   ```
   public/cdn/recipes/
   ├── cokoladna-torta/
   │   └── cokoladna_torta.webp
   ├── gulas-od-divljaci/
   │   └── gulas.jpeg
   ├── pizza-margarita/
   │   └── pizza.webp
   └── ...
   ```

2. **API Route**: The `/api/cdn/[...path]` route serves files from the public directory
   - Endpoint: `GET /api/cdn/recipes/{slug}/{filename}`
   - Example: `/api/cdn/recipes/pizza-margarita/pizza.webp`

3. **CDN Headers**: The API simulates CDN behavior with appropriate cache headers:
   ```
   Cache-Control: public, max-age=31536000, immutable
   CDN-Cache-Status: HIT
   X-CDN-Provider: FakeCDN-Simulation
   ```

4. **Security**: Directory traversal attacks are prevented by validating paths

#### Database Integration

Recipe images are referenced in the database via the `cdnPath` field:
```typescript
// In prisma/seed.ts
cdnPath: '/cdn/recipes/pizza-margarita/pizza.webp'
```

The `CdnUtils` helper class converts these paths to full URLs:
```typescript
import { CdnUtils } from '@/helpers/CdnUtils';

// Convert cdnPath to full URL
const imageUrl = CdnUtils.getImageUrl(recipe.cdnPath);
// Result: "http://localhost:3000/api/cdn/recipes/pizza-margarita/pizza.webp"
```

#### Adding New Recipe Images

1. Create a folder in `/public/cdn/recipes/{recipe-slug}/`
2. Add your image file (supports: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.svg`)
3. Reference it in the database with `cdnPath: '/cdn/recipes/{recipe-slug}/{filename}'`

#### Production Considerations

For production, you can:
- Continue using the local CDN simulation (works on Vercel)
- Replace with a real CDN (Cloudinary, AWS CloudFront, etc.) by updating `CdnUtils`
- Set `NEXT_PUBLIC_CDN_BASE_URL` environment variable to point to your CDN

---

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run tests: `pnpm test`
4. Run linting: `pnpm lint`
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Neon PostgreSQL](https://neon.tech/docs)
- [Enterwell React Starter](https://github.com/Enterwell/react-starter)
