'use client';

import Link from 'next/link';
import Image from 'next/image';
import { RecipeDTO, DifficultyLevel, RecipeCategory } from '@/models/Recipe';
import styles from './RecipesView.module.scss';

type RecipesViewProps = {
  recipes: RecipeDTO[];
};

/**
 * Formatira vrijeme pripreme u čitljiv format
 */
function formatPrepTime(minutes: number | null): string {
  if (!minutes) return '';
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours} h ${mins} min` : `${hours} h`;
}

/**
 * Prevodi težinu pripreme na hrvatski
 */
function getDifficultyLabel(difficulty: DifficultyLevel | null): string {
  switch (difficulty) {
    case DifficultyLevel.EASY:
      return 'Jednostavno';
    case DifficultyLevel.MEDIUM:
      return 'Srednje zahtjevno';
    case DifficultyLevel.HARD:
      return 'Složeno';
    default:
      return '';
  }
}

/**
 * Prevodi kategoriju na hrvatski
 */
function getCategoryLabel(category: RecipeCategory): string {
  const labels: Record<RecipeCategory, string> = {
    [RecipeCategory.GLAVNA_JELA]: 'Glavna jela',
    [RecipeCategory.DESERTI]: 'Deserti',
    [RecipeCategory.KRUH_I_PECIVA]: 'Kruh i peciva',
    [RecipeCategory.PREDJELA]: 'Predjela',
    [RecipeCategory.JUHE]: 'Juhe',
    [RecipeCategory.SALATE]: 'Salate',
    [RecipeCategory.PICA]: 'Pića',
    [RecipeCategory.SOKOVI_I_NAPICI]: 'Sokovi i napici',
    [RecipeCategory.PRILOZI]: 'Prilozi',
    [RecipeCategory.UMACI]: 'Umaci',
  };
  return labels[category] || category;
}

/**
 * Recipes view component - displays a grid of recipe cards.
 */
export function RecipesView({ recipes }: RecipesViewProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.badge}>RECEPTI</span>
        <h1 className={styles.title}>Najnoviji recepti</h1>
        <p className={styles.description}>
          Najsvježije recepture, svježe iz pećnice. Ako ti je važno da saznaš 
          koji su se recepti upravo pojavili na Coolinarici, ovo je sekcija za tebe.
        </p>
      </header>

      {recipes.length > 0 ? (
        <div className={styles.grid}>
          {recipes.map((recipe) => (
            <article key={recipe.id} className={styles.card}>
              <Link href={`/recept/${recipe.slug}`} className={styles.imageLink}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={recipe.mainImageUrl || '/images/placeholder-recipe.jpg'}
                    alt={recipe.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
              </Link>
              <div className={styles.cardContent}>
                <span className={styles.author}>{recipe.authorUsername}</span>
                <h2 className={styles.recipeName}>
                  <Link href={`/recept/${recipe.slug}`}>{recipe.name}</Link>
                </h2>
                
                {recipe.intro && (
                  <p className={styles.intro}>{recipe.intro}</p>
                )}
                
                <div className={styles.meta}>
                  {recipe.prepTime && (
                    <span className={styles.metaItem}>
                      <span className={styles.metaIcon}>⏱</span>
                      {formatPrepTime(recipe.prepTime)}
                    </span>
                  )}
                  {recipe.difficulty && (
                    <span className={styles.metaItem}>
                      <span className={styles.metaIcon}>📊</span>
                      {getDifficultyLabel(recipe.difficulty)}
                    </span>
                  )}
                  <span className={styles.metaItem}>
                    <span className={styles.metaIcon}>🍽</span>
                    {getCategoryLabel(recipe.category)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>Nema pronađenih recepata.</p>
        </div>
      )}
    </div>
  );
}
