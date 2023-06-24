import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import Image from "next/image";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { CldUploadButton } from "next-cloudinary";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  currentUser?: User;
};

export default function AddEmpresa({ currentUser, onClose, isOpen }: Props) {
  const router = useRouter();
  const [isloading, setIsloading] = useState(false);

  const {
    formState: { errors },
    register,
    setValue,
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      nombre: "",
      direccion: "",
      nit: "",
      telefono: "",
    },
  });

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsloading(true);
    axios
      .post("/api/empresa", data)
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
