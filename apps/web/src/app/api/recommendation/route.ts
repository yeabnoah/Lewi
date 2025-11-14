import { NextRequest, NextResponse } from "next/server";

import { getRecommendationEmbedding } from "@/app/functions/recommendationengine";

type RecommendationRequestBody = {
  prompt?: string;
};

export async function POST(request: NextRequest) {
  try {
    const { prompt }: RecommendationRequestBody = await request.json();

    if (typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "A non-empty 'prompt' string is required." },
        { status: 400 },
      );
    }

    const embedding = await getRecommendationEmbedding(prompt);

    return NextResponse.json(
      {
        embedding,
        dimensions: embedding.length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[api/recommendation] Failed to generate embedding", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate recommendation embedding.",
      },
      { status: 500 },
    );
  }
}

