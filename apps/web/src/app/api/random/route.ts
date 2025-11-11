import { getEmbedding } from "@/app/functions/vectorizeDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    // const session = await auth.api.getSession({
    //     headers: request.headers,
    // });
    // if (!session?.user) {
    //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    const embedding = await getEmbedding({
        name: "Random Item",
        description: "Random Item Description",
        colors: "Random Colors",
        type: "Random Type",
    }   );
    console.log(embedding); 
    // await saveEmbedding(embedding, "18e41c49-d6dc-4946-86d5-49abefbc82c3");
    return NextResponse.json({ success: true, embedding: embedding }, { status: 200 });
}