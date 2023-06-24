type Product = {
  name: string;
  quantity: string;
  price: string;
  description: string;
};
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    username?: string | null;
    image?: string | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      admin: boolean;
    };
  }
  interface User extends DefaultUser {
    admin: boolean;
    // Add any additional custom fields or overrides you need
  }
}
