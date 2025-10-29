import { auth } from "@lewi/auth";
import prisma from "@lewi/db";
import { NextRequest, NextResponse } from "next/server";
import { WardrobeCategory } from "../../../../../../packages/db/prisma/generated/client";

// Map API type strings to WardrobeCategory enum
function mapTypeToCategory(type: string): WardrobeCategory {
  const normalizedType = type.toLowerCase().trim();
  
  switch (normalizedType) {
    case "tops":
      return WardrobeCategory.TOP;
    case "bottoms":
      return WardrobeCategory.BOTTOM;
    case "dresses":
      return WardrobeCategory.DRESS;
    case "outerwear":
      return WardrobeCategory.OUTERWEAR;
    case "accessories":
      return WardrobeCategory.ACCESSORY;
    default:
      // Default to TOP if type doesn't match
      return WardrobeCategory.TOP;
  }
}

export async function GET(request: NextRequest) { 
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } 

  const wardrobe = await prisma.wardrobe_item.findMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json({ wardrobe: wardrobe }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { imageUrl, name, description, colors, type } = await request.json();

  // Validate required fields
  if (!imageUrl) {
    return NextResponse.json({ error: "imageUrl is required" }, { status: 400 });
  }

  // Use analyzed data if provided, otherwise use defaults
  const wardrobeItem = await prisma.wardrobe_item.create({
    data: {
      userId: session.user.id,
      imageUrl,
      name: name || "New Item",
      description: description || "New Item Description",
      color: colors || "white",
      wardrobeCategory: type ? mapTypeToCategory(type) : WardrobeCategory.TOP,
    }
  });

  return NextResponse.json({ wardrobeItem: wardrobeItem }, { status: 200 });
}