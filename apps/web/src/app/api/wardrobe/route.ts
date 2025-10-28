import { auth } from "@lewi/auth";
import prisma from "@lewi/db";
import { NextRequest, NextResponse } from "next/server";
import { WardrobeCategory } from "../../../../../../packages/db/prisma/generated/client";

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

  const { imageUrl } = await request.json();

  const wardrobeItem = await prisma.wardrobe_item.create({
    data: {
      userId: session.user.id,
      imageUrl,
      color: "white",
      wardrobeCategory: WardrobeCategory.TOP,
      name: "New Item",
      description: "New Item Description",
    }
  });

  return NextResponse.json({ wardrobeItem: wardrobeItem }, { status: 200 });
}