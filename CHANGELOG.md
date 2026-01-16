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
- RecipesView component with Material-UI responsive grid
- /recepti route displaying recipe list
- Database seed script with 5 Croatian recipes
- Webpack configuration to resolve Turbopack issues

### Changed
- Configure Next.js to use webpack instead of Turbopack for development
- Setup connection pooling with PostgreSQL adapter

## [1.0.0] - 2020-06-24
