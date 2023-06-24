"use client";
import { User } from "@prisma/client";
import axios from "axios";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  currentUser?: User;
};

export default function AddProducto({ currentUser, onClose, isOpen }: Props) {
  const router = useRouter();
  console.log("router", router);
  const [isloading, setIsloading] = useState(false);
  const { nombreEmpresa } = useParams();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      nombre: "",
      cantidad: 0,
      precio: "",
      descripcion: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsloading(true);
    axios
      .post("/api/producto", { ...data, nombreEmpresa: nombreEmpresa })
      .then((res) => {
        router.refresh();
        onClose();
        toast.success("Profile updated successfully");
      })
      .finally(() => {
        setIsloading(false);
      })
      .catch((err) => {
        toast.error("Something went wrong, please try again later");
      });
  };
  return (
    <Modal isOpen={isOpen!} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isloading}
                label="Nombre"
                id="nombre"
                errors={errors}
                required
                register={register}
              />
            </div>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isloading}
                label="Cantidad"
                id="cantidad"
                errors={errors}
                required
                register={register}
              />
            </div>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isloading}
                label="Precio"
                id="precio"
                errors={errors}
                required
                register={register}
              />
            </div>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isloading}
                label="Descripcion"
                id="descripcion"
                errors={errors}
                required
                register={register}
              />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button disabled={isloading} secondary onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isloading} type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
