"use client";
import { Empresa } from "@prisma/client";
import EmpresaBox from "./EmpresaBox";
import { AiOutlinePlus } from "react-icons/ai";
import AddEmpresa from "@/app/components/AddEmpresa";
import { useState } from "react";
type Props = {
  items: Empresa[];
};

export default function EmpresaList({ items }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <aside
      className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80
    lg:block overflow-y-auto border-r border-gray-200 block w-full left-0"
    >
      <div className="px-5">
        <div className="flex-col">
          <div className="text-2xl font-bold text-neutral-800 py-4">
            Empresas
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-neutral-500">Mis empresas</div>
            <AiOutlinePlus
              className="text-2xl text-neutral-500 cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          </div>
        </div>
        <AddEmpresa isOpen={isOpen} onClose={onClose} />
        {items.map((item) => (
          <EmpresaBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
}
