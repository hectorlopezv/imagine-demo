import { ReactNode, useState } from "react";

import EmpresaList from "./components/EmpresasList";
import getEmpresas from "../actions/getEmpresas";
import SideBar from "../components/SideBar";

type Props = {
  children: ReactNode;
};

export default async function UsersLayout({ children }: Props) {
  const users = await getEmpresas();

  return (
    <SideBar>
      <EmpresaList items={users} />
      <div className="h-full">{children}</div>
    </SideBar>
  );
}
