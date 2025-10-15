-- CreateTable
CREATE TABLE "wardrobe_item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "outfit_suggestionsId" TEXT,

    CONSTRAINT "wardrobe_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outfit_suggestions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "outfit_suggestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "style_request" (
    "id" TEXT NOT NULL,
    "requestDescription" TEXT NOT NULL,
    "style_request_type" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "style_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "virtual_tryon" (
    "id" TEXT NOT NULL,
    "userImageUrl" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "outfitImageUrl" TEXT NOT NULL,
    "generatedImageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "virtual_tryon_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wardrobe_item" ADD CONSTRAINT "wardrobe_item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wardrobe_item" ADD CONSTRAINT "wardrobe_item_outfit_suggestionsId_fkey" FOREIGN KEY ("outfit_suggestionsId") REFERENCES "outfit_suggestions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outfit_suggestions" ADD CONSTRAINT "outfit_suggestions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "style_request" ADD CONSTRAINT "style_request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "virtual_tryon" ADD CONSTRAINT "virtual_tryon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
