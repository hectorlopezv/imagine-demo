import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

export default async function getProducts(nombreEmpresa: string) {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.producto.findMany({
      where: {
        empresa: {
          nombre: nombreEmpresa.replace("%20", " "),
        },
      },
    });
    return users;
  } catch (error) {
    return [];
  }
}
