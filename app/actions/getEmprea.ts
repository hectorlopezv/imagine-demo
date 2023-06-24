import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

export default async function getEmpresa(nombreEmpresa: string) {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.empresa.findFirst({
      where: {
        nombre: nombreEmpresa,
      },
    });
    return users;
  } catch (error) {
    return [];
  }
}
