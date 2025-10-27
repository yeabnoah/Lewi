import { auth } from "@lewi/auth";
import prisma from "@lewi/db";


export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  return new Response(JSON.stringify({
    id: user?.id,
    name: user?.name,
    email: user?.email,
    profilePicture: user?.image,
    createdAt: user?.createdAt,
  }));
}