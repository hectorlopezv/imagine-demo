import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const { nombre, cantidad, precio, descripcion, nombreEmpresa } =
      await request.json();
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const empresa = await prisma.empresa.findFirst({
      where: {
        nombre: nombreEmpresa,
      },
    });
    const deletedConversation = await prisma.producto.create({
      data: {
        nombre,
        cantidad,
        precio,
        descripcion,
        empresa: {
          connect: {
            id: empresa?.id,
          },
        },
      },
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    console.log(error, "ERROR_CONVERSATION_DELETE");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { nombreEmpresa } = await request.json();
    console.log("nombreEmpresa", nombreEmpresa);
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const producto = await prisma.producto.findFirst({
      where: {
        nombre: nombreEmpresa,
      },
    });

    return NextResponse.json(producto);
  } catch (error) {
    console.log(error, "ERROR_CONVERSATION_DELETE");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
export async function PUT(request: Request) {
  try {
    const { id, oldData, newData } = await request.json();
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deletedConversation = await prisma.producto.update({
      data: {
        nombre: newData.nombre,
        cantidad: newData.cantidad,
        precio: newData.precio,
        descripcion: newData.descripcion,
      },
      where: {
        nombre: oldData.nombre,
      },
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    console.log(error, "ERROR_CONVERSATION_DELETE");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
