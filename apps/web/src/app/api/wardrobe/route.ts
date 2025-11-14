import { getEmbedding, saveEmbedding } from "@/app/functions/vectorizeDB";
import { auth } from "@lewi/auth";
import prisma from "@lewi/db";
import { NextRequest, NextResponse } from "next/server";
import { WardrobeCategory } from "../../../../../../packages/db/prisma/generated/enums";

function mapTypeToCategory(type: string): WardrobeCategory {
  const normalizedType = type.toLowerCase().trim();
  
  switch (normalizedType) {
    case "tops":
    case "top":
      return WardrobeCategory.TOP;
    case "bottoms":
    case "bottom":
      return WardrobeCategory.BOTTOM;
    case "dresses":
    case "dress":
      return WardrobeCategory.DRESS;
    case "outerwear":
      return WardrobeCategory.OUTERWEAR;
    case "accessories":
    case "accessory":
      return WardrobeCategory.ACCESSORY;
    case "shoes":
    case "shoe":
      return WardrobeCategory.SHOES;
    default:
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

  if (!imageUrl) {
    return NextResponse.json({ error: "imageUrl is required" }, { status: 400 });
  }
  
  // Ensure type is properly converted to enum
  const category: WardrobeCategory = type ? mapTypeToCategory(type) : WardrobeCategory.TOP;
  
  const wardrobeItem = await prisma.wardrobe_item.create({
    data: {
      userId: session.user.id,
      imageUrl,
      name: name || "New Item",
      description: description || "New Item Description",
      color: colors || "white",
      wardrobeCategory: category,
    }
  });


  const vectorizedOutput = await getEmbedding({
    name : name,
    description : description,
    colors : colors,
    type : type
  });

  if (vectorizedOutput.length > 0) {
    await saveEmbedding(vectorizedOutput, wardrobeItem.id);
  }

  return NextResponse.json({ wardrobeItem: wardrobeItem }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();
  await prisma.wardrobe_item.delete({ where: { id: id } });
  return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });
}

