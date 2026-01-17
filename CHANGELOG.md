# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- PostgreSQL database setup with Prisma 7.2.0 ORM
- Recipe management system with grid view
- Recipe domain model with DTO for server-client communication
- RecipeMapper for data transformations
- RecipeRepository with CRUD operations
- RecipesView component with CSS Grid responsive layout
- /recepti route displaying recipe list
- Database seed script with 5 Croatian recipes
- Webpack configuration to resolve Turbopack issues
- mini-css-extract-plugin for CSS module compilation in webpack mode
- Prisma generate postinstall hook for automatic client generation
- Full Recipe schema with ingredients and steps - Ingredient and PreparationStep models with 1:N relations, extended Recipe with Coolinarika fields

### Changed
- Configure Next.js to use webpack instead of Turbopack for development
- Setup connection pooling with PostgreSQL adapter
- Migrate from Material-UI Grid to native CSS Grid for better compatibility
- Update pnpm lockfile for production deployment

### Fixed
- CSS Grid layout compatibility with Material-UI v7
- Webpack CSS module compilation for local development
- Vercel deployment build issues with frozen lockfile

## [1.0.0] - 2020-06-24
