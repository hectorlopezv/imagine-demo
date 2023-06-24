import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

export default async function getEmpresas() {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.empresa.findMany({
      where: {
        user: {
          email: session.user.email,
        },
      },
    });
    return users;
  } catch (error) {
    return [];
  }
}
