import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import path from "path";

export async function nanoBanana() {

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.warn("Warning: GOOGLE_API_KEY not found in environment variables. Authentication may fail.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // In Next.js, process.cwd() is usually the project root (e.g. apps/web or the monorepo root)
  // We need to handle both cases or debug where we are
  console.log("Current working directory:", process.cwd());
  
  let imagePath = path.join(process.cwd(), "src/app/functions/image.png");
  
  if (!fs.existsSync(imagePath)) {
     // Try alternative path if running from monorepo root
     imagePath = path.join(process.cwd(), "apps/web/src/app/functions/image.png");
  }

  if (!fs.existsSync(imagePath)) {
      console.error(`Image not found at: ${imagePath}`);
      throw new Error(`Image file not found. Searched in ${process.cwd()} and subdirectories.`);
  }

  const imageData = fs.readFileSync(imagePath);
  const base64Image = imageData.toString("base64");

  const prompt = [
    { text: "make me wear old money outfit that makes me look stylish and modern with serious vibes" },
    {
      inlineData: {
        mimeType: "image/png",
        data: base64Image,
      },
    },
  ];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: prompt,
    });
    const candidates = response.candidates;
    if (candidates) {
      for (const candidate of candidates) {
        if (candidate.content && candidate.content.parts) {
          for (const part of candidate.content.parts) {
            if (part.text) {
              console.log(part.text);
            } else if (part.inlineData) {
              const imageData = part.inlineData.data;
              if (imageData) {
                // Instead of saving to file system which might be read-only in some envs,
                // return the base64 data
                return `data:${part.inlineData.mimeType};base64,${imageData}`;
              }
            }
          }
        }
      }
    }
  } catch (error: any) {
      if (error.status === 429 || (error.message && error.message.includes("429"))) {
          console.warn("Gemini API quota exceeded (429). Returning null/fallback.");
          return null;
      }
      throw error;
  }

  return null;
}
