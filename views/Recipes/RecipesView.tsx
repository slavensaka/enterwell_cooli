'use client';

import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';
import Image from 'next/image';
import { RecipeDTO } from '@/models/Recipe';
import styles from './RecipesView.module.scss';

type RecipesViewProps = {
  recipes: RecipeDTO[];
};

// Placeholder images from Unsplash
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=450&fit=crop', // salad
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=450&fit=crop', // burger
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=450&fit=crop', // pizza
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=450&fit=crop', // pancakes
  'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=450&fit=crop', // pasta
];

// Placeholder usernames (hardcoded like on Coolinarika)
const PLACEHOLDER_USERNAMES = [
  'loveangels',
  'sunny_side_up',
  'ljubicica71',
  'coolinari_pro',
  'chef_master'
];

/**
 * Recipes view component - displays a grid of recipes with Coolinarika-inspired design.
 * This is a client component for UI rendering only.
 */
export function RecipesView({ recipes }: RecipesViewProps) {
  const getPlaceholderImage = (index: number) => {
    return PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length];
  };

  const getPlaceholderUsername = (index: number) => {
    return PLACEHOLDER_USERNAMES[index % PLACEHOLDER_USERNAMES.length];
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.badge}>RECEPTI</div>
        <h1 className={styles.title}>Najnoviji recepti</h1>
        <p className={styles.description}>
          ~~~ Najsvježije recepture, svježe iz pećnice. Ako ti je važno da saznaš koji su se recepti upravo pojavili na Coolinarici, ovo je sekcija za tebe.
        </p>
      </div>

      {/* Recipes Grid */}
      {recipes.length > 0 ? (
        <div className={styles.grid}>
          {recipes.map((recipe, index) => (
            <div key={recipe.id} className={styles.card}>
              {/* Recipe Image with Favorite Button */}
              <div className={styles.imageWrapper}>
                <Link href={`/recept/${recipe.slug}`}>
                  <Image
                    src={recipe.mainImageUrl || getPlaceholderImage(index)}
                    alt={recipe.name}
                    width={600}
                    height={450}
                    unoptimized
                  />
                </Link>
                <IconButton
                  className={styles.favoriteButton}
                  aria-label="add to favorites"
                >
                  <FavoriteIcon />
                </IconButton>
              </div>

              {/* Recipe Info */}
              <div className={styles.cardContent}>
                <div className={styles.username}>
                  {recipe.authorUsername}
                </div>
                <h2 className={styles.recipeName}>
                  <Link href={`/recept/${recipe.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {recipe.name}
                  </Link>
                </h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>No recipes found.</p>
        </div>
      )}
    </div>
  );
}
