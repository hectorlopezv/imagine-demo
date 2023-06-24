import getEmpresa from "@/app/actions/getEmprea";
import EditEmpresa from "@/app/components/EditEmpresa";
import { Empresa } from "@prisma/client";
import { get } from "http";

type Props = {
  nombreEmpresa: string;
};

export default async function ProductListHeader({ nombreEmpresa }: Props) {
  console.log("este es", nombreEmpresa);
  const data = await getEmpresa(nombreEmpresa);
  const nombre = nombreEmpresa.replace("%20", " ");
  return (
    <>
      <EditEmpresa nombreEmpresa={nombre} data={data as Empresa} />
    </>
  );
}
