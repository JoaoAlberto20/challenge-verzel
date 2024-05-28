/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `cars` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cars" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cars_slug_key" ON "cars"("slug");
