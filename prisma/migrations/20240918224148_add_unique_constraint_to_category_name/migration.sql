/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "description" SET DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
