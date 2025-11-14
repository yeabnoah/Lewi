"use server";
import prisma from "@lewi/db";
import type { wardrobeItemInterface } from "../api/gemini-analyze/route";
export const vectorizeDB = async (input: wardrobeItemInterface) => {

};
const HF_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

const model = `https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction`


export async function getEmbedding(fetchedWardrobe: wardrobeItemInterface): Promise<number[]> {
    try {
        console.log(`[getEmbedding] Generating embedding for: ${fetchedWardrobe.name}`);
        const textInput = `${fetchedWardrobe.name}. ${fetchedWardrobe.description || ''} Color: ${fetchedWardrobe.colors || ''}. Type: ${fetchedWardrobe.type || ''}`.trim();
        
        const response = await fetch(model, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.HF_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: textInput }),
        });

        if (!response.ok) {
            console.error(`[getEmbedding] API error: ${response.status} ${response.statusText}`);
            return [];
        }

        const data = await response.json();
        let embedding: number[] = [];
        
        if (Array.isArray(data)) {
            if (Array.isArray(data[0])) {
                embedding = data[0] as number[];
            } else if (typeof data[0] === 'number') {
                embedding = data as number[];
            }
        }
        
        if (embedding.length > 0) {
            console.log(`[getEmbedding] ✓ Successfully generated embedding (${embedding.length} dimensions) for: ${fetchedWardrobe.name}`);
            return embedding;
        } else {
            console.error(`[getEmbedding] ✗ Unexpected embedding response for: ${fetchedWardrobe.name}`, data);
            return [];
        }
    } catch (error) {
        console.error(`[getEmbedding] ✗ Error getting embedding for: ${fetchedWardrobe.name}`, error);
        return [];
    }
}

  export async function saveEmbedding(vector: number[], wardrobeItemId: string) {
    try {
        console.log(`[saveEmbedding] Saving embedding to DB for item: ${wardrobeItemId}`);
        const vectorString = `[${vector.join(',')}]`;
        await prisma.$executeRawUnsafe(
            `UPDATE "wardrobe_item" SET embedding = $1::vector WHERE id = $2`,
            vectorString,
            wardrobeItemId
        );
        console.log(`[saveEmbedding] ✓ Successfully saved embedding to DB for item: ${wardrobeItemId}`);
    } catch (error) {
        console.error(`[saveEmbedding] ✗ Failed to save embedding to DB for item: ${wardrobeItemId}`, error);
        throw error;
    }
  }


