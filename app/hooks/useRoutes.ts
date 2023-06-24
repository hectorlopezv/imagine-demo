import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat, HiUsers } from "react-icons/hi";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { signOut } from "next-auth/react";

const useRoutes = () => {
  const pathName = usePathname();
  const routes = useMemo(
    () => [
      {
        label: "Empresas",
        href: "/empresas",
        icon: HiUsers,
        active: pathName === "/empresas",
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => signOut(),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathName]
  );

  return routes;
};

export default useRoutes;
