"use client";
import { Producto, User } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import Image from "next/image";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { CldUploadButton } from "next-cloudinary";
import { useSession } from "next-auth/react";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  data?: Producto;
};

export default function ProductModal({ data, onClose, isOpen }: Props) {
  console.log("data modal producto", data);
  const router = useRouter();
  const [isloading, setIsloading] = useState(false);
  const { nombreEmpresa } = useParams();
  const session: any = useSession();
  const {
    formState: { errors },
    register,
    setValue,
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      nombre: "",
      precio: "",
      descripcion: "",
      cantidad: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (dataForm) => {
    console.log("dataForm", dataForm);
    setIsloading(true);
    axios
      .put("/api/producto", {
        oldData: { ...data },
        newData: { ...dataForm },
        id: data?.id,
        nombreEmpresa,
      })
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

  useEffect(() => {
    let defaultValues = {
      nombre: data?.nombre,
      precio: data?.precio,
      descripcion: data?.descripcion,
      cantidad: data?.cantidad,
    };
    console.log("defaultValues", defaultValues);
    reset({ ...defaultValues });
  }, [data]);
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
          </div>
          {session?.data?.admin ? (
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Button disabled={isloading} secondary onClick={onClose}>
                Cancel
              </Button>
              <Button disabled={isloading} type="submit">
                Save
              </Button>
            </div>
          ) : null}
        </div>
      </form>
    </Modal>
  );
}
