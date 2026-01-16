'use client';

import { Box, Grid, Card, CardContent, Typography, Container } from '@mui/material';
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

        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card>
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
            </Grid>
          ))}
        </Grid>

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
