"use client";

import LoadingModal from "@/app/components/LoadingModal";
import { Empresa, Producto } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  data: Producto;
  openModal: any;
};

export default function ProductoBox({ data, openModal }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { nombreEmpresa } = useParams();

  return (
    <>
      {loading && <LoadingModal />}
      <div
        className="w-full relative flex items-center space-x-3 bg-white p-3
  hover:bg-neutral-100 rounded-lg transition cursor-pointer"
        onClick={()=>openModal(data)}
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
