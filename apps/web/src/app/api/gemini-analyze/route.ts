import { NextRequest, NextResponse } from "next/server";
import { HumanMessage } from '@langchain/core/messages';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { vectorizeDB } from "@/app/functions/vectorizeDB";

export interface wardrobeItemInterface {
  name: string;
  description: string;
  colors: string;
  type: string;
}

export async function POST(request: NextRequest) {
  try {
    const { imageBase64 } = await request.json();

    console.log('Received request to analyze image');
    console.log('Image base64 length:', imageBase64?.length);

    // const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const API_KEY = process.env.GOOGLE_API_KEY;
    
    console.log('API key present:', !!API_KEY);
    console.log('API Key length:', API_KEY?.length);
    
    if (!API_KEY) {
      console.error('API key not configured');
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const structuredPrompt = `You are a fashion expert and a JSON API. Analyze this cloth image and return a JSON object with exactly this structure:

{
  "name": "a concise name identifying the cloth",
  "description": "a detailed description of the cloth content",
  "colors": "one dominant color of the cloth",
  "type": "the type of the cloth "tops", "bottoms", "dresses", "outerwear", "accessories""
}

CRITICAL: Return ONLY the raw JSON object. No markdown, no backticks, no code blocks, no explanations, no additional text whatsoever. Just the pure JSON object.`;

    // Use LangChain for better error handling
    const vision = new ChatGoogleGenerativeAI({
      model: 'gemini-2.0-flash',
      apiVersion: "v1",
      apiKey: API_KEY,
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    });

    const contents = [
      new HumanMessage({
        content: [
          {
            type: 'text',
            text: structuredPrompt,
          },
          {
            type: 'image_url',
            image_url: `data:image/jpeg;base64,${imageBase64}`,
          },
        ],
      }),
    ];

    console.log('Calling LangChain vision model...');
    const response = await vision.invoke(contents);
    const text = response.content as string;

    // Extract JSON from the response
    let cleanedText = text.trim();
    
    // Remove markdown code blocks if present
    if (cleanedText.includes('```json')) {
      cleanedText = cleanedText.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    } else if (cleanedText.includes('```')) {
      cleanedText = cleanedText.replace(/```\s*/g, '');
    }
    
    // Try to find JSON object in the text
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanedText = jsonMatch[0];
    }

    const jsonResponse: wardrobeItemInterface = JSON.parse(cleanedText);

    // Validate structure
    if (!jsonResponse.name || !jsonResponse.description || !jsonResponse.colors || !jsonResponse.type) {
      return NextResponse.json(
        { error: 'Invalid response format' },
        { status: 500 }
      );
    }

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('Error analyzing image:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}

