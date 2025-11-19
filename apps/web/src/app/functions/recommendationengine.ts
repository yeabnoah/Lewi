"use server";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import dotenv from "dotenv";
dotenv.config();

const model = `https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction`



const StyleSchema = z.object({
  style: z.array(z.string()),
  colors: z.array(z.string()),
  vibe: z.array(z.string()),
  occasion: z.string().nullable(),
  constraints: z.array(z.string())
});

type StyleOutput = z.infer<typeof StyleSchema>;

const structuredOutputParser = StructuredOutputParser.fromZodSchema(StyleSchema);


const formatInstructions = structuredOutputParser.getFormatInstructions();

const escapedFormatInstructions = formatInstructions.replace(/\{/g, "{{").replace(/\}/g, "}}");

const humanMessageTemplate = "here is the User preference outfit: {userPrompt}\n\nReturn JSON matching this schema:\n" + escapedFormatInstructions;

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful and accurate fashion stylist assistant. Return JSON that matches the provided Zod schema exactly. No extra text."
  ],
  [
    "human",
    humanMessageTemplate
  ]
]);

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0.7,
});

const chain = prompt.pipe(llm).pipe(structuredOutputParser);


// ****************************************************************************************************************

export async function getRecommendationStructured(userPrompt: string): Promise<StyleOutput | null> {
  try {
    return await chain.invoke({ userPrompt }) as StyleOutput;
  } catch (err) {
    console.error("Failed to parse LLM output into Zod schema:", err);
    if (err instanceof Error) {
      console.error("Error details:", err.message);
      // If it's a model not found error, suggest alternative
      if (err.message.includes("404") || err.message.includes("not found")) {
        console.error("Model may not be available. Try using 'gemini-pro' or 'gemini-1.5-pro' instead.");
      }
    }
    return null;
  }
}

export async function getRecommendationEmbedding(userPrompt: string): Promise<number[]> {
    try {
        console.log(`[getEmbedding] Generating embedding for: ${userPrompt}`);
        const textInput = `${userPrompt}`.trim();
        
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
        
        console.log(`[getEmbedding] ✓ Successfully generated embedding (${embedding.length} dimensions) for: ${userPrompt}`);
        return embedding;
    } catch (error) {
        console.error(`[getEmbedding] ✗ Error getting embedding for: ${userPrompt}`, error);
        return [];
    }
}