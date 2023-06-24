import { ReactNode } from "react";
import getCurrentUser from "../actions/getCurrentUser";
import DeskTopSideBar from "./DesktopFooter";
import MobileFooter from "./MobileFooter";

type Props = {
  children: ReactNode;
};

export default async function SideBar({ children }: Props) {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
      <DeskTopSideBar currentUser={currentUser!} />
      <MobileFooter currentUser={currentUser!} />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}
