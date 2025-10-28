import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function explainImageFromUrl(imageUrl) {
  try {
    const res = await fetch(imageUrl);
    const arrayBuffer = await res.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-pro-vision" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: { mimeType: "image/jpeg", data: base64 },
            },
            {
              text: "Explain this image in detail.",
            },
          ],
        },
      ],
    });

    console.log(result.response.text());
  } catch (error) {
    console.error("Error analyzing image:", error);
  }
}

const testUrl =
  "https://iqbkplmiijyoybbrksyo.supabase.co/storage/v1/object/public/lewi-bucket/uploads/1761666572032.jpg";
explainImageFromUrl(testUrl);
