import { getRecommendationEmbedding, getRecommendationStructured } from "@/app/functions/recommendationengine";
import { auth } from "@lewi/auth";
import prisma from "@lewi/db";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const userPrompt = "I'm going to the gym today and need an outfit recommendation. Please suggest an outfit consisting of one top,one bottom, and one shoes that are comfortable, sporty, and suitable for a workout. The recommended items should have attributes such as breathable fabric, flexibility, and gym-appropriate style. Prioritize items with colors and designs that fit athletic activities. The outfit should be cohesive and user-specific";
        const session = await auth.api.getSession({
            headers: request.headers,
          });
          if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
          }

        const recommendationStructuredText = await getRecommendationStructured(userPrompt);
        
        if (!recommendationStructuredText) {
            return NextResponse.json(
                { error: "Failed to generate recommendation structure" },
                { status: 500 }
            );
        }

        const recommendationEmbedding = await getRecommendationEmbedding(JSON.stringify(recommendationStructuredText));

        if (!recommendationEmbedding || recommendationEmbedding.length === 0) {
            return NextResponse.json(
                { error: "Failed to generate recommendation embedding" },
                { status: 500 }
            );
        }

        // const embeddingString = `[${recommendationEmbedding.join(',')}]`;

        const similarItems = await prisma.$queryRawUnsafe(
            `
            SELECT 
              name,
              description,
              "imageUrl",
              "userId",
              "createdAt",
              "updatedAt",
              color,
              "wardrobeCategory",
              embedding::text AS embedding,
              embedding <-> $1::vector AS distance
            FROM wardrobe_item
            WHERE "userId" = $2
            ORDER BY embedding <-> $1::vector
            LIMIT 3;
            `,
            recommendationEmbedding,
            session.user.id
          );
          

        return NextResponse.json({
similarItems : similarItems 
        }, { status: 200 });
    } catch (error) {
        console.error("[random/route] Error during recommendation process:", error);
        return NextResponse.json(
            { error: "Failed to process recommendation" },
            { status: 500 }
        );
    }
}

