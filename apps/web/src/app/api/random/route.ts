import { getEmbedding, saveEmbedding } from "@/app/functions/vectorizeDB";
import prisma from "@lewi/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const allWardrobeItems = await prisma.wardrobe_item.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            color: true,
            wardrobeCategory: true,
        }
    });

    console.log(`[random/route] Processing ${allWardrobeItems.length} wardrobe items`);

    let successCount = 0;
    let failedCount = 0;

    for (const item of allWardrobeItems) {
        try {
            const embeddingInput = {
                name: item.name,
                description: item.description,
                colors: item.color,
                type: item.wardrobeCategory.toLowerCase(),
            };

            const embedding = await getEmbedding(embeddingInput);
            
            if (embedding.length > 0) {
                await saveEmbedding(embedding, item.id);
                successCount++;
                console.log(`[random/route] ✓ Successfully processed: ${item.name} (${item.id})`);
            } else {
                failedCount++;
                console.log(`[random/route] ✗ Failed to generate embedding for: ${item.name} (${item.id})`);
            }
        } catch (error) {
            failedCount++;
            console.error(`[random/route] ✗ Error processing item ${item.name} (${item.id}):`, error);
        }
    }

    console.log(`[random/route] Completed: ${successCount} succeeded, ${failedCount} failed`);

    return NextResponse.json({ 
        success: true, 
        total: allWardrobeItems.length,
        succeeded: successCount,
        failed: failedCount
    }, { status: 200 });
}