"use client";
import { Empresa, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import Image from "next/image";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { CldUploadButton } from "next-cloudinary";
import { AiFillEdit } from "react-icons/ai";
import { useSession } from "next-auth/react";

type Props = {
  data: Empresa;
  nombreEmpresa: string;
};

export default function EditEmpresa({ data, nombreEmpresa }: Props) {
  const router = useRouter();
  const [isloading, setIsloading] = useState(false);
  const [openEditEmpresModal, setOpenEditEmpresModal] = useState(false);
  const session: any = useSession();
  const {
    formState: { errors },
    register,
    setValue,
    reset,
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      nombre: "",
      direccion: "",
      nit: "",
      telefono: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (dataForm) => {
    setIsloading(true);
    axios
      .put("/api/empresa", { oldData: { ...data }, newData: { ...dataForm } })
      .then((res) => {
        router.push(`/empresas/${dataForm.nombre.replace("%20", " ")}`);
        router.refresh();
        setOpenEditEmpresModal(false);
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
      direccion: data?.direccion,
      nit: data?.nit,
      telefono: data?.telefono,
    };
    console.log("defaultValues", defaultValues);
    reset({ ...defaultValues });
  }, [data]);
  console.log("session", session);
  return (
    <>
      <div>{nombreEmpresa}</div>
      {session?.data?.admin ? (
        <AiFillEdit
          className="text-2xl text-neutral-500 cursor-pointer"
          onClick={() => {
            setOpenEditEmpresModal(true);
          }}
        />
      ) : null}

      <Modal
        isOpen={openEditEmpresModal!}
        onClose={() => setOpenEditEmpresModal(false)}
      >
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
                  label="Direccion"
                  id="direccion"
                  errors={errors}
                  required
                  register={register}
                />
              </div>
              <div className="mt-10 flex flex-col gap-y-8">
                <Input
                  disabled={isloading}
                  label="Nit"
                  id="nit"
                  errors={errors}
                  required
                  register={register}
                />
              </div>
              <div className="mt-10 flex flex-col gap-y-8">
                <Input
                  disabled={isloading}
                  label="Telefono"
                  id="telefono"
                  errors={errors}
                  required
                  register={register}
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Button
                disabled={isloading}
                secondary
                onClick={() => setOpenEditEmpresModal(false)}
              >
                Cancel
              </Button>
              <Button disabled={isloading} type="submit">
                Save
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
