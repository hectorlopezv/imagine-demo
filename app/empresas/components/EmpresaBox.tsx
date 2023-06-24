"use client";

import LoadingModal from "@/app/components/LoadingModal";
import { Empresa } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  data: Empresa;
};

export default function EmpresaBox({ data }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    console.log("data.nombre", data.nombre);
    router.push(`/empresas/${data.nombre.replace("%20", " ")}`);
  };
  return (
    <>
      {loading && <LoadingModal />}
      <div
        className="w-full relative flex items-center space-x-3 bg-white p-3
  hover:bg-neutral-100 rounded-lg transition cursor-pointer"
        onClick={handleClick}
      >
        {/* <Avatar user={data} /> */}
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">{data.nombre}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
