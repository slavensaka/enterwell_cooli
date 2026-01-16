'use client';

import { Box, Card, CardContent, Typography, Container } from '@mui/material';
import { RecipeDTO } from '@/models/Recipe';

type RecipesViewProps = {
  recipes: RecipeDTO[];
};

/**
 * Recipes view component - displays a grid of recipes.
 * This is a client component for UI rendering only.
 */
export function RecipesView({ recipes }: RecipesViewProps) {
  return (
    <Container>
      <Box py={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Recepti
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: 3
          }}
        >
          {recipes.map((recipe) => (
            <Card key={recipe.id}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {recipe.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Slug: {recipe.slug}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Created: {new Date(recipe.createdAt).toLocaleDateString('hr-HR')}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {recipes.length === 0 && (
          <Box py={4}>
            <Typography variant="body1" color="text.secondary">
              No recipes found.
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}
