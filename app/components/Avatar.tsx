import { Empresa } from "@prisma/client";
import Image from "next/image";

type Props = {
  empresa: Empresa;
};

export default function Avatar({ empresa }: Props) {
  return (
    <div className="relative">
      <div
        className="relative inline-block rounded-full overflow-hidden
      h-9 w-9 md:h-11 md:w-11"
      >
        <Image src={"/images/placeholder.jpg"} fill alt="Avatar" />
      </div>
    </div>
  );
}
