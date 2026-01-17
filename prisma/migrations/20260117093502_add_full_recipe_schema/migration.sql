/*
  Warnings:

  - Added the required column `authorUsername` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "authorId" TEXT,
ADD COLUMN     "authorUsername" TEXT NOT NULL,
ADD COLUMN     "cookTime" INTEGER,
ADD COLUMN     "cookingMethod" TEXT,
ADD COLUMN     "difficulty" "DifficultyLevel",
ADD COLUMN     "intro" TEXT,
ADD COLUMN     "mainImageUrl" TEXT,
ADD COLUMN     "mealType" TEXT,
ADD COLUMN     "occasion" TEXT,
ADD COLUMN     "prepTime" INTEGER,
ADD COLUMN     "region" TEXT,
ADD COLUMN     "season" TEXT,
ADD COLUMN     "servingSuggestion" TEXT,
ADD COLUMN     "servings" INTEGER,
ADD COLUMN     "tips" TEXT;

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "unit" TEXT,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreparationStep" (
    "id" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "PreparationStep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Ingredient_recipeId_idx" ON "Ingredient"("recipeId");

-- CreateIndex
CREATE INDEX "PreparationStep_recipeId_idx" ON "PreparationStep"("recipeId");

-- CreateIndex
CREATE INDEX "PreparationStep_recipeId_stepNumber_idx" ON "PreparationStep"("recipeId", "stepNumber");

-- CreateIndex
CREATE INDEX "Recipe_authorUsername_idx" ON "Recipe"("authorUsername");

-- CreateIndex
CREATE INDEX "Recipe_createdAt_idx" ON "Recipe"("createdAt");

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreparationStep" ADD CONSTRAINT "PreparationStep_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
