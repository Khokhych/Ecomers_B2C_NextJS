/*
  Warnings:

  - You are about to drop the column `Banner` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `cratedAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `slag` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "product_slag_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Banner",
DROP COLUMN "cratedAt",
DROP COLUMN "image",
DROP COLUMN "slag",
ADD COLUMN     "banner" TEXT,
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "product_slug_idx" ON "Product"("slug");
