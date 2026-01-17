'use client';

import React from 'react';
import Image from 'next/image';
import { RecipeDTO } from '@/models/Recipe';
import styles from './RecipeDetailView.module.scss';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import EqualizerIcon from '@mui/icons-material/Equalizer'; // Signal/Difficulty

type Props = {
    recipe: RecipeDTO;
};

export default function RecipeDetailView({ recipe }: Props) {
    // Safe date formatting
    const formattedDate = new Date(recipe.createdAt).toLocaleDateString('hr-HR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const getImageUrl = (cdnPath: string | null) => {
        if (cdnPath) {
            return `${process.env.NEXT_PUBLIC_CDN_BASE_URL || ''}${cdnPath}`;
        }
        return 'https://via.placeholder.com/600x400.jpg?text=No+Image';
    };

    return (
        <div className={styles.container}>
            {/* Breadcrumbs Placeholder - could be a separate component */}
            <div className={styles.breadcrumbs}>
                <span>Coolinarika</span> / <span>Recepti</span> / <span>{recipe.name}</span>
            </div>

            <div className={styles.grid}>

                {/* LEFT COLUMN: Main Content */}
                <div className={styles.mainContent}>

                    <header className={styles.heroSection}>
                        <h1 className={styles.title}>{recipe.name}</h1>

                        {recipe.intro && (
                            <p className={styles.intro}>{recipe.intro}</p>
                        )}

                        <div className={styles.authorBlock}>
                            <span>AUTOR:</span>
                            <span className={styles.authorName}>{recipe.authorUsername || 'Coolinarika'}</span>
                            <span className={styles.date}>{formattedDate}</span>
                        </div>
                    </header>

                    {/* Main Recipe Image */}
                    <div className={styles.mainImageWrapper}>
                        {/* Using a placeholder if mainImageUrl is null, or next/image */}
                        <Image
                            src={recipe.mainImageUrl || '/images/placeholder-recipe.jpg'}
                            alt={recipe.name}
                            fill // Use fill for responsive aspect ratio container
                            priority
                        />
                    </div>

                    {/* Meta Bar: Time, Servings, Difficulty */}
                    <div className={styles.metaBar}>
                        {recipe.prepTime && (
                            <div className={styles.metaItem}>
                                <AccessTimeIcon className={styles.icon} />
                                <span className={styles.label}>Priprema</span>
                                <span className={styles.value}>{recipe.prepTime} min</span>
                            </div>
                        )}

                        {recipe.servings && (
                            <div className={styles.metaItem}>
                                <RestaurantIcon className={styles.icon} />
                                <span className={styles.label}>Osoba</span>
                                <span className={styles.value}>{recipe.servings}</span>
                            </div>
                        )}

                        {recipe.difficulty && (
                            <div className={styles.metaItem}>
                                <EqualizerIcon className={styles.icon} />
                                <span className={styles.label}>Težina</span>
                                <span className={styles.value}>{recipe.difficulty}</span>
                            </div>
                        )}
                    </div>

                    {/* Preparation Steps */}
                    <div className={styles.stepsContainer}>
                        <h2 className={styles.sectionTitle}>Priprema</h2>

                        {recipe.preparationSteps && recipe.preparationSteps.length > 0 ? (
                            recipe.preparationSteps.map((step, index) => (
                                <div key={step.id || index} className={styles.step}>
                                    <div className={styles.stepNumber}>{index + 1}.</div>
                                    <div className={styles.stepContent}>
                                        <p>{step.description}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Nema opisa pripreme za ovaj recept.</p>
                        )}
                    </div>

                    {/* Tips Section (Optional) */}
                    {recipe.tips && (
                        <div className={styles.stepsContainer}>
                            <h2 className={styles.sectionTitle}>Savjet</h2>
                            <p className={styles.bodyText}>{recipe.tips}</p>
                        </div>
                    )}

                </div>

                {/* RIGHT COLUMN: Sidebar (Ingredients) */}
                <aside className={styles.sidebar}>
                    <div className={styles.ingredientsCard}>
                        <h3 className={styles.ingredientsTitle}>Sastojci</h3>

                        <ul className={styles.ingredientsList}>
                            {recipe.ingredients && recipe.ingredients.map((ing, index) => (
                                <li key={ing.id || index}>
                                    <span className={styles.ingredientName}>{ing.name}</span>
                                    <span className={styles.ingredientAmount}>
                                        {ing.quantity} {ing.unit}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

            </div>
        </div>
    );
}
