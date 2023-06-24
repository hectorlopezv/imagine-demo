"use client";
import { Empresa, Producto } from "@prisma/client";
import { AiOutlinePlus } from "react-icons/ai";
import AddEmpresa from "@/app/components/AddEmpresa";
import { useState } from "react";
import ProductoBox from "./ProductoBox";
import AddProducto from "@/app/components/AddProducto";
import ProductModal from "@/app/components/ProductModal";
import { useSession } from "next-auth/react";
type Props = {
  products: Producto[];
};

export default function ProductoList({ products }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [openProductModal, setopenProductModal] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  const openModalHandler = (data: Producto) => {
    console.log("data", data);
    setSelectedProduct(data);
    setopenProductModal(true);
  };
  const session: any = useSession();
  return (
    <aside className="border-r border-gray-200 w-full">
      <div className="px-5">
        <div className="flex-col">
          <div className=" mt-4 mb-4 flex justify-between items-center">
            <div className="text-sm text-neutral-500">Mis Productos</div>
            {session?.data?.admin ? (
              <AiOutlinePlus
                className="text-2xl text-neutral-500 cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
            ) : null}
          </div>
          <AddProducto isOpen={isOpen} onClose={onClose} />
          {products.map((item) => (
            <ProductoBox
              key={item.id}
              data={item}
              openModal={openModalHandler}
            />
          ))}
          <ProductModal
            data={selectedProduct as Producto}
            isOpen={openProductModal}
            onClose={() => setopenProductModal(false)}
          />
        </div>
      </div>
    </aside>
  );
}
