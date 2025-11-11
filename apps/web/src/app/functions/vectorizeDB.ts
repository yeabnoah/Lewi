"use server";
import prisma from "@lewi/db";
import type { wardrobeItemInterface } from "../api/gemini-analyze/route";
export const vectorizeDB = async (input: wardrobeItemInterface) => {

};
const HF_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

const model = `https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction`


export async function getEmbedding(fetchedWardrobe: wardrobeItemInterface): Promise<number[]> {
    try {
    const response = await fetch(model, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: JSON.stringify(fetchedWardrobe) }),
    });
  
        const data = await response.json();
        // data is nested: [[...vector]]
        if (Array.isArray(data) && Array.isArray(data[0])) {
            return data[0] as number[];
          } else {
            console.error("Unexpected embedding response:", data);
            return [];
          }
    } catch (error) {
        console.error("Error getting embedding:", error);
        return [];
    }
  }
  
  // Save embedding in Supabase/Postgres
  export async function saveEmbedding(vector: number[], wardrobeItemId: string) {
    await prisma.$executeRaw`
      UPDATE "wardrobe_item"
      SET embedding = ${vector}::vector
      WHERE id = ${wardrobeItemId}
    `;
  }


