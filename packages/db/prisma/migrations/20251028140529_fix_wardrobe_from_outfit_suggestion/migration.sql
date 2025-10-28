/*
  Warnings:

  - You are about to drop the column `outfit_suggestionsId` on the `wardrobe_item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."wardrobe_item" DROP CONSTRAINT "wardrobe_item_outfit_suggestionsId_fkey";

-- AlterTable
ALTER TABLE "wardrobe_item" DROP COLUMN "outfit_suggestionsId";
