/*
  Warnings:

  - Added the required column `color` to the `wardrobe_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wardrobeCategory` to the `wardrobe_item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WardrobeCategory" AS ENUM ('TOP', 'BOTTOM', 'DRESS', 'OUTERWEAR', 'ACCESSORY');

-- AlterTable
ALTER TABLE "wardrobe_item" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "wardrobeCategory" "WardrobeCategory" NOT NULL;
