import { nanoBanana } from "@/app/functions/nanoBanana";
import { getRecommendationEmbedding, getRecommendationStructured } from "@/app/functions/recommendationengine";
import { supabaseClient } from "@/lib/supabaseClient";
import { auth } from "@lewi/auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        // A more comprehensive and context-rich prompt for stronger embeddings and improved similarity search
        const userPrompt = `i want you to go recommend me a gym outfit that makes me look jacked and show my muscles also modern`;
        const session = await auth.api.getSession({
            headers: request.headers,
          });
          if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
          }

        const recommendationStructuredText = await getRecommendationStructured(userPrompt);

        // **** by now ===> i have now have a sturctured text that i can give to the image generation to generate outfit
        
        if (!recommendationStructuredText) {
            return NextResponse.json(
                { error: "Failed to generate recommendation structure" },
                { status: 500 }
            );
        }

        const recommendationEmbedding = await getRecommendationEmbedding(JSON.stringify(userPrompt));

        if (!recommendationEmbedding || recommendationEmbedding.length === 0) {
            return NextResponse.json(
                { error: "Failed to generate recommendation embedding" },
                { status: 500 }
            );
        }

        // const embeddingString = `[${recommendationEmbedding.join(',')}]`;

const supabase = supabaseClient;

const { data: documents, error: supabaseError } = await supabase.rpc('match_wardrobe_item', {
    query_embedding: recommendationEmbedding,
    match_threshold: 0, // choose an appropriate threshold for your data
    match_count: 8, // choose the number of matches
  });

if (supabaseError) {
    throw new Error(`Supabase RPC error: ${supabaseError.message}`);
}


  console.log("documents", documents);


        return NextResponse.json({
similarItems : documents
        }, { status: 200 });
    } catch (error) {
        console.error("[random/route] Error during recommendation process:", error);
        return NextResponse.json(
            { error : error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}



export async function GET(request: NextRequest) {
    // const embeddedResult  = await getRecommendationEmbedding("I'm going to the gym today and need an outfit recommendation. Please suggest an outfit consisting of one top,one bottom, and one shoes that are comfortable, sporty, and suitable for a workout. The recommended items should have attributes such as breathable fabric, flexibility, and gym-appropriate style. Prioritize items with colors and designs that fit athletic activities. The outfit should be cohesive and user-specific");

    // console.log("embeddedResult", embeddedResult);
    // return NextResponse.json({ data : embeddedResult }, { status: 200 });

    const nanoBananaResult = await nanoBanana();
    console.log("nanoBanana", nanoBananaResult);
    return NextResponse.json({ data : nanoBananaResult }, { status: 200 });
}


