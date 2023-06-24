"use client";

import { User } from "@prisma/client";
import MobileItem from "./MobileItem";
import useRoutes from "../hooks/useRoutes";

type Props = { currentUser: User };

export default function MobileFooter({}: Props) {
  const routes = useRoutes();

  return (
    <div
      className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white
    border-t-[1px] lg:hidden"
    >
      {routes.map((item) => (
        <MobileItem
          key={item.label}
          href={item.href}
          label={item.label}
          icon={item.icon}
          active={item.active}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
}
